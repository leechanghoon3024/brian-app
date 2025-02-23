import { useScreenStore } from '@/lib/state/player.state';
import { useAudioStore } from '@/lib/state/audio.state';
import { useState } from 'react';

export const useButtonProgress = () => {
    const { currentScreen, setScreen, menuScreen, setMenu } = useScreenStore();
    const [audio] = useState(new Audio('/audio/clickDown.wav'));
    const handlePlaySound = () => {
        if (audio) {
            audio.volume = 1;
            audio.currentTime = 0;
            audio.play().catch((err) => {
                console.warn('Failed to play sound:', err);
            });
        }
    };
    const {
        audioPlayBack,
        nextAudio,
        prevAudio,
        setSelectAudioIndex,
        playAudioAtIndex,
        selectAudioIndex,
        setSelectOptionIndex,
        changeVisualAtIndex,
        selectOptionIndex
    } = useAudioStore();

    const handleCenterProgress = () => {
        handlePlaySound();
        if (currentScreen === 'init') {
            setScreen('loading');
        }
        if (currentScreen === 'music') {
            if (menuScreen === 'init') {
                setMenu('musicList');
            }
            if (menuScreen === 'musicList') {
                setMenu('init');
            }
            if (menuScreen === 'options') {
                changeVisualAtIndex(selectOptionIndex);
                setMenu('init');
            }
        }
    };

    const handleTopProgress = () => {
        handlePlaySound();
        if (currentScreen === 'init') {
            setScreen('loading');
        }
        if (currentScreen === 'music') {
            if (menuScreen === 'init' || menuScreen === 'musicList') {
                setMenu('options');
            }
            if (menuScreen === 'options') {
                setMenu('init');
            }
        }
    };

    const handleLeftProgress = () => {
        handlePlaySound();
        if (currentScreen === 'init') {
            setScreen('loading');
        }
        if (currentScreen === 'music') {
            if (menuScreen === 'init') {
                prevAudio();
            }
            if (menuScreen === 'musicList') {
                setSelectAudioIndex('down');
            }
            if (menuScreen === 'options') {
                setSelectOptionIndex('down');
            }
        }
    };

    const handleRightProgress = () => {
        handlePlaySound();
        if (currentScreen === 'init') {
        }
        if (currentScreen === 'music') {
            if (currentScreen === 'music') {
                if (menuScreen === 'init') {
                    nextAudio();
                }
                if (menuScreen === 'musicList') {
                    setSelectAudioIndex('up');
                }
                if (menuScreen === 'options') {
                    setSelectOptionIndex('up');
                }
            }
        }
    };

    const handleBottomProgress = () => {
        handlePlaySound();
        if (currentScreen === 'music') {
            if (menuScreen === 'init') {
                audioPlayBack();
            }
            if (menuScreen === 'musicList') {
                playAudioAtIndex(selectAudioIndex);
                setMenu('init');
            }
            if (menuScreen === 'options') {
                changeVisualAtIndex(selectOptionIndex);
                setMenu('init');
            }
        }
    };

    return {
        handleCenterProgress,
        handleBottomProgress,
        handleTopProgress,
        handleLeftProgress,
        handleRightProgress
    };
};
