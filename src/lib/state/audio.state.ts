import { create } from 'zustand';
import { RefObject } from 'react';
import { AudioContextType, AudioRefType, CanvasRefType, WorkerRefType } from '@/types/audio.types';
import { VisualModeType } from '@/types/visual.type';
import { VISUAL_INIT_MODE } from '@/const/init.const';
import { AUDIO_LIST_TYPE } from '@/mock/audio.list';
import { OptionList } from '@/mock/option.list';

interface AudioStore {
    // GET
    audioElement: RefObject<AudioRefType>;
    canvasElement: RefObject<CanvasRefType>;
    audioContext: AudioContextType;
    audioWorker: WorkerRefType;
    offscreenCanvas: OffscreenCanvas | null;
    visualType: VisualModeType;
    isPlay: boolean;
    audioList: AUDIO_LIST_TYPE[];
    currentAudioIndex: number;
    selectAudioIndex: number; // 메뉴 선택용
    selectOptionIndex: number; // 옵션 선택용
    // SET
    setAudioContext: (ctx: AudioContextType) => void;
    setAudioWorker: (worker: WorkerRefType) => void;
    setOffscreenCanvas: (canvas: OffscreenCanvas | null) => void;
    setVisualType: (visual: VisualModeType) => void;
    setTogglePlay: (playState?: string) => void;
    audioPlayBack: () => void;
    setAudioList: (list: AUDIO_LIST_TYPE[]) => void;
    playAudioAtIndex: (index: number) => void;
    changeVisualAtIndex: (index: number) => void;
    setSelectAudioIndex: (direction: 'up' | 'down') => void;
    setSelectOptionIndex: (direction: 'up' | 'down') => void;
    nextAudio: () => void;
    prevAudio: () => void;
}

export const useAudioStore = create<AudioStore>((set, get) => ({
    audioElement: { current: null } as RefObject<AudioRefType>,
    canvasElement: { current: null } as RefObject<CanvasRefType>,
    audioContext: null,
    audioWorker: null,
    offscreenCanvas: null,
    visualType: VISUAL_INIT_MODE,
    isPlay: false,
    audioList: [],
    currentAudioIndex: 0,
    selectAudioIndex: 0,
    selectOptionIndex: 0,
    setAudioContext: (ctx) => set({ audioContext: ctx }),
    setAudioWorker: (worker) => set({ audioWorker: worker }),
    setOffscreenCanvas: (canvas) => set({ offscreenCanvas: canvas }),
    setSelectAudioIndex: (direction: 'up' | 'down') =>
        set((state) => {
            const listLength = state.audioList.length;
            let newIndex = state.selectAudioIndex;

            if (direction === 'up') {
                newIndex = (newIndex + 1) % listLength;
            } else if (direction === 'down') {
                newIndex = newIndex - 1;
                if (newIndex < 0) {
                    newIndex = listLength - 1;
                }
            }
            return { selectAudioIndex: newIndex };
        }),
    setSelectOptionIndex: (direction: 'up' | 'down') =>
        set((state) => {
            const listLength = OptionList.length;
            let newIndex = state.selectOptionIndex;
            if (direction === 'up') {
                newIndex = (newIndex + 1) % listLength;
            } else if (direction === 'down') {
                newIndex = newIndex - 1;
                if (newIndex < 0) {
                    newIndex = listLength - 1;
                }
            }
            return { selectOptionIndex: newIndex };
        }),
    setVisualType: (visual) => {
        set({ visualType: visual });
        const { audioWorker } = get();
        if (audioWorker) {
            audioWorker.postMessage({ type: 'VISUALIZATION_MODE', mode: visual });
        }
    },
    setTogglePlay: (playState) => {
        const { isPlay } = get();
        if (playState) {
            set({ isPlay: playState === 'play' });
        } else {
            set({ isPlay: !isPlay });
        }
    },
    audioPlayBack: () => {
        const { audioElement } = get();
        const audio = audioElement.current;
        if (!audio) return;
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    },
    setAudioList: (list: AUDIO_LIST_TYPE[]) => set({ audioList: list, currentAudioIndex: 0 }),
    playAudioAtIndex: (index: number) => {
        const { audioElement, audioList } = get();
        const audio = audioElement.current;
        if (!audio || audioList.length === 0) return;
        if (index < 0 || index >= audioList.length) return;
        audio.src = audioList[index]?.src;
        audio.play();
        set({ currentAudioIndex: index, isPlay: true });
    },
    changeVisualAtIndex: (index: number) => {
        const visualList = OptionList;
        const selectVisual = visualList[index];
        if (!selectVisual) return;
        const { audioWorker } = get();
        if (audioWorker) {
            set({ visualType: selectVisual.src as VisualModeType });
            audioWorker.postMessage({ type: 'VISUALIZATION_MODE', mode: selectVisual.src });
        }
    },
    nextAudio: () => {
        const { currentAudioIndex, audioList, playAudioAtIndex } = get();
        if (currentAudioIndex < audioList.length - 1) {
            playAudioAtIndex(currentAudioIndex + 1);
            set({ selectAudioIndex: currentAudioIndex + 1 });
        } else {
            playAudioAtIndex(0);
            set({ selectAudioIndex: 0 });
        }
    },
    prevAudio: () => {
        const { currentAudioIndex, playAudioAtIndex, audioList } = get();
        if (audioList.length === 0) return;
        if (currentAudioIndex > 0) {
            playAudioAtIndex(currentAudioIndex - 1);
            set({ selectAudioIndex: currentAudioIndex - 1 });
        } else {
            // 맨 앞이면 마지막으로
            playAudioAtIndex(audioList.length - 1);
            set({ selectAudioIndex: audioList.length - 1 });
        }
    }
}));
