import { RefObject, useEffect, useRef } from 'react';
import { installWorklet, loadWorklet } from '@/lib/utils/load.worklet';
import { AudioRefType, CanvasRefType } from '@/types/audio.types';
import audioWalker from '!!raw-loader!@/lib/audio/worklet/audio.worker';
import progressWalker from '!!raw-loader!@/lib/audio/worklet/process.worker';
import { useAudioStore } from '@/lib/state/audio.state';
import { AUDIO_LIST } from '@/mock/audio.list';

export const useAudioWorklet = (): {
    canvasElement: RefObject<CanvasRefType>;
    audioElement: RefObject<AudioRefType>;
} => {
    const {
        audioElement,
        canvasElement,
        audioContext,
        audioWorker,
        offscreenCanvas,
        setAudioContext,
        setAudioWorker,
        setOffscreenCanvas,
        setAudioList,
        playAudioAtIndex
    } = useAudioStore();

    const transferredRef = useRef(false);

    useEffect(() => {
        if (canvasElement.current && audioElement.current) {
            installWorker();
        }
        return () => {
            console.log('Cleaning up');
            // clean-up
        };
    }, [canvasElement, audioElement]);

    const installWorker = async () => {
        if (!audioElement.current || !canvasElement.current) return;

        let ctx = audioContext;
        if (!ctx) {
            ctx = new AudioContext();
            setAudioContext(ctx);
            if (ctx.state === 'suspended') {
                await ctx.resume();
            }
        }

        let offscreen: OffscreenCanvas;
        if (!transferredRef.current) {
            offscreen = canvasElement.current.transferControlToOffscreen();
            transferredRef.current = true;
            setOffscreenCanvas(offscreen);
        } else {
            offscreen = offscreenCanvas as OffscreenCanvas;
        }

        if (!audioWorker) {
            // AudioWorklet
            await installWorklet(audioWalker, ctx);
            const audioWorklet = new AudioWorkletNode(ctx, 'audio-worker');

            const worker = loadWorklet(progressWalker);
            worker?.postMessage({ type: 'INIT', canvas: offscreen }, [offscreen]);

            const analyser = ctx.createAnalyser();
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            analyser.fftSize = 8192;
            const source = ctx.createMediaElementSource(audioElement.current);
            // 1. AnalyserNode에 연결
            source.connect(analyser);
            // 2. AudioWorklet에 연결
            analyser.connect(audioWorklet);
            // 3. 최종 출력으로 연결
            audioWorklet.connect(ctx.destination);
            setAudioWorker(worker);

            /**
             * 오디오 리스트
             * TODO: 나중에 API로
             */
            setAudioList(AUDIO_LIST);
            playAudioAtIndex(0);

            const sendAudioData = () => {
                analyser.getByteFrequencyData(dataArray);
                worker?.postMessage({ type: 'AUDIO_DATA', data: dataArray });
                requestAnimationFrame(sendAudioData);
            };
            sendAudioData();
        }
    };
    return { audioElement, canvasElement };
};
