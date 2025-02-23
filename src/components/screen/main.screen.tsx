'use client';

import { ScreenContainer } from '@/components/screen/screen.container';
import { ScreenBg } from '@/components/screen/screen.style';
import { useAudioWorklet } from '@/lib/audio/use.audio.worklet';
import { SoundProgress } from '@/components/sound-body/sound.progress';
import { SoundInfo } from '@/components/sound-body/sound.info';
import { FaPlay, FaPause } from 'react-icons/fa';
import { useAudioStore } from '@/lib/state/audio.state';
import { MenuBody } from '@/components/menu/menu.body';
export const MainScreen = () => {
    const { audioElement, canvasElement } = useAudioWorklet();
    const { isPlay } = useAudioStore();

    return (
        <>
            <ScreenContainer className={`${ScreenBg}`}>
                <div className="relative w-full h-full  p-[4px] rounded-lg flex flex-col items-center shadow-lg">
                    <div className="flex items-center justify-between w-full ">
                        <p className="text-xs" />
                        <div className="flex items-center">
                            {isPlay ? (
                                <FaPlay className="text-xxs font-dnf mr-[2px]" />
                            ) : (
                                <FaPause className="text-xxs font-dnf mr-[2px]" />
                            )}
                            <p className="text-xxs font-dnf">100%</p>
                        </div>
                    </div>
                    {/* 앨범 정보 */}
                    <SoundInfo />
                    <audio ref={audioElement} style={{ display: 'none' }} />
                    <SoundProgress />
                    <div className="grid grid-cols-[30%_70%] pb-1 w-full">
                        <div className={'w-full h-[18px] relative flex justify-center'}>
                            <img
                                src={'/images/hamster/hamster.gif'}
                                alt={'/images/hamster/hamster.gif'}
                                width={'25px'}
                                height={'18px'}
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                        <div>
                            <canvas ref={canvasElement} width={100} height={20} />
                        </div>
                    </div>
                </div>
            </ScreenContainer>
            <MenuBody />
        </>
    );
};
