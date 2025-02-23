import { useAudioStore } from '@/lib/state/audio.state';
import { useEffect, useState } from 'react';
import { BASE_FONT_XXS } from '@/styles/text.styles';
import { formatTime } from '@/lib/utils/format.time';
import { getProgressPercent } from '@/lib/utils/process.utils';

export const SoundProgress = () => {
    const { audioElement, setTogglePlay, nextAudio } = useAudioStore();
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const audio = audioElement.current;
        if (!audio) return;
        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        const handleNextAudio = () => {
            nextAudio();
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('play', () => setTogglePlay('play'));
        audio.addEventListener('pause', () => setTogglePlay('pause'));
        audio.addEventListener('ended', () => handleNextAudio());
        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('play', () => setTogglePlay('play'));
            audio.removeEventListener('pause', () => setTogglePlay('pause'));
            audio.removeEventListener('ended', () => handleNextAudio());
        };
    }, [audioElement, setTogglePlay]);

    const percent = getProgressPercent(currentTime, duration);

    return (
        <div className="relative w-full flex-col">
            <div className="relative w-full h-1 bg-gray-500 rounded-full overflow-hidden">
                <div
                    className="glow bg-[#00ffcc] h-[3px] rounded-full transition-all duration-10000 ease-linear"
                    style={{ width: `${percent}%` }}
                />
            </div>
            <div className="w-full flex justify-between">
                <p className={BASE_FONT_XXS}>{formatTime(currentTime)}</p>
                <p className={BASE_FONT_XXS}>{formatTime(duration)}</p>
            </div>
        </div>
    );
};
