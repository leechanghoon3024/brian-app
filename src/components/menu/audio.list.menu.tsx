import { useRef, useEffect, useState } from 'react';
import { MarqueeText } from '@/components/text/marquee.text';
import { BASE_FONT_XS } from '@/styles/text.styles';
import { ScreenBg } from '@/components/screen/screen.style';
import { useAudioStore } from '@/lib/state/audio.state';

export const AudioListMenu = () => {
    const { audioList, currentAudioIndex, selectAudioIndex } = useAudioStore();
    const selectItem = selectAudioIndex;

    const containerRef = useRef<HTMLDivElement>(null);
    const selectedRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (selectedRef.current) {
            selectedRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }
    }, [selectItem]);

    return (
        <div
            ref={containerRef}
            className={`w-full h-full overflow-auto p-2 scrollbar-hide ${ScreenBg}`}
        >
            {audioList.map((v, i) => (
                <div
                    key={v.title}
                    ref={i === selectItem ? selectedRef : null}
                    className={`w-full p-0.5 rounded-md ${
                        i === selectItem
                            ? 'bg-white/30 backdrop-blur-md shadow-[0px_0px_10px_rgba(255,255,255,0.3)]'
                            : ''
                    }`}
                >
                    <MarqueeText
                        className={`${BASE_FONT_XS} ${i === selectItem ? 'text-[#39bdd6]' : ''}`}
                        text={`${v.title} - ${v.artist}`}
                        disabled={i !== selectItem}
                    />
                </div>
            ))}
        </div>
    );
};
