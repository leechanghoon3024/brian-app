import { ScreenContainer } from '@/components/screen/screen.container';
import { useEffect, useState } from 'react';
import { useScreenStore } from '@/lib/state/player.state';
import { ScreenBg } from '@/components/screen/screen.style';
import { motion } from 'framer-motion';
import { screenDefault } from '@/styles/screen.styles';
import { MotionWrapper } from '@/components/screen/motion.wrapper';

export const LoadingScreen = () => {
    const { currentScreen, setScreen } = useScreenStore();

    useEffect(() => {
        if (currentScreen === 'loading') {
            setTimeout(() => {
                setScreen('music');
            }, 4000);
        }
    }, []);

    return (
        <ScreenContainer className={`${ScreenBg} p-4`}>
            <div className="flex flex-col items-center">
                <p className="text-sm font-dnf">Loading...</p>
                <div className="w-full h-3 bg-white rounded-full mt-3 p-[2px]">
                    <div className="w-full h-full bg-transparent rounded-full flex items-center px-[1px]">
                        <motion.div
                            className="h-[70%] rounded-full bg-gradient-to-r from-[#37A3B5] to-[#1D7A8C]"
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 4, ease: 'linear' }} // 정확히 4초 동안 100%까지 증가
                        />
                    </div>
                </div>
            </div>
        </ScreenContainer>
    );
};
