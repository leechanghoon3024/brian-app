import { useState, useEffect, useRef } from 'react';
import { Marquee } from '@wethegit/react-marquee';
export const MarqueeText = ({
    text,
    className,
    disabled
}: {
    text: string;
    className?: string;
    disabled?: boolean;
}) => {
    const textRef = useRef<HTMLDivElement>(null);
    const [isOverflowing, setIsOverflowing] = useState(false);
    useEffect(() => {
        if (textRef.current) {
            const textElement = textRef.current;
            const parentWidth = textElement?.parentElement?.clientWidth || 0;
            const textWidth = textElement?.scrollWidth;
            setIsOverflowing(textWidth > parentWidth);
        }
    }, [text]);

    return (
        <div className="w-full overflow-hidden whitespace-nowrap flex">
            {isOverflowing ? (
                <Marquee className={`${className}`} speed={25} playing={!disabled}>
                    {`${text}`}&nbsp;&nbsp;
                </Marquee>
            ) : (
                <div ref={textRef} className={`inline-block ${className}`}>
                    {text}
                </div>
            )}
        </div>
    );
};
