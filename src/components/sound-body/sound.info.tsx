import { MarqueeText } from '@/components/text/marquee.text';
import { BASE_FONT_XS } from '@/styles/text.styles';
import { useAudioStore } from '@/lib/state/audio.state';
import Image from 'next/image';

export const SoundInfo = () => {
    const { currentAudioIndex, audioList } = useAudioStore();
    const audioInfo = audioList[currentAudioIndex];

    return (
        <div className="grid grid-cols-[30%_70%] items-center w-full mb-1">
            <div className="w-full aspect-square bg-gray-600 rounded-md relative overflow-hidden">
                {audioInfo && (
                    <Image
                        src={audioInfo.image}
                        alt={`${audioInfo.title}`}
                        loading={'lazy'}
                        fill={true}
                    />
                )}
            </div>
            <div className="ml-2 overflow-hidden">
                <MarqueeText text={`${audioInfo?.title ?? ''}`} className={BASE_FONT_XS} />
                <MarqueeText text={`${audioInfo?.artist ?? ''}`} className={BASE_FONT_XS} />
            </div>
        </div>
    );
};
