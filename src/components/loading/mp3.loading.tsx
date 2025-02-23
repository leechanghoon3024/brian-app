'use client';
import LiquidSvg from '@/assets/svg/liquid.svg';
import { zIndexTop } from '@/styles/screen.styles';
import { BASE_FONT_3XL, BASE_FONT_4XL } from '@/styles/text.styles';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useScreenStore } from '@/lib/state/player.state';

export const Mp3Loading = () => {
    const { isOpen, setOpen } = useScreenStore();
    const [isLoading, setIsLoading] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);

    const handleClick = () => {
        setIsLoading(true);
        setTimeout(() => {
            setOpen();
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        }, 2000);
    };

    return (
        <motion.div
            className="w-full h-full absolute flex justify-center items-center"
            style={{ zIndex: zIndexTop, pointerEvents: isOpen ? 'none' : 'auto' }}
            initial={{ clipPath: 'circle(0% at 50% 50%)', opacity: 0 }}
            animate={{
                clipPath: 'circle(100% at 50% 50%)',
                opacity: isOpen ? 0 : 1
            }}
            transition={{ duration: 1, ease: 'easeOut' }}
        >
            <div className="max-w-[500px] max-h-[500px] w-full h-full relative flex justify-center items-center svg-repaint">
                <LiquidSvg />
                <div className="absolute w-full h-full flex flex-col justify-center items-center">
                    <p className={'text-4xl font-dnf text-white'}>HAMP3</p>
                    {!isLoading && (
                        <motion.button
                            className={BASE_FONT_3XL}
                            onClick={handleClick}
                            initial={{ opacity: 1 }}
                            animate={{ opacity: isLoading ? 0 : 1 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                        >
                            View
                        </motion.button>
                    )}
                    {isLoading && (
                        <motion.div
                            className="w-48 h-2 bg-gray-300 rounded-full mt-[28px] relative overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                        >
                            <motion.div
                                className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#37A3B5] to-[#1D7A8C]"
                                initial={{ width: '0%' }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 2, ease: 'easeInOut' }}
                            />
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};
