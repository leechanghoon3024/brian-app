import { useScreenStore } from '@/lib/state/player.state';
import { useAudioStore } from '@/lib/state/audio.state';

export const useButtonProgress = () => {
    const { currentScreen, setScreen, menuScreen, setMenu } = useScreenStore();
    const {
        audioPlayBack,
        nextAudio,
        prevAudio,
        setSelectAudioIndex,
        playAudioAtIndex,
        selectAudioIndex,
        setSelectOptionIndex
    } = useAudioStore();
    console.log('menuScreen', menuScreen);

    const handleCenterProgress = () => {
        if (currentScreen === 'init') {
            setScreen('loading');
        }
        if (currentScreen === 'music') {
            if (menuScreen === 'init') {
                setMenu('musicList');
            }
            if (menuScreen === 'musicList' || menuScreen === 'options') {
                setMenu('init');
            }
        }
    };

    const handleTopProgress = () => {
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
        if (currentScreen === 'music') {
            if (menuScreen === 'init') {
                audioPlayBack();
            }
            if (menuScreen === 'musicList') {
                playAudioAtIndex(selectAudioIndex);
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
