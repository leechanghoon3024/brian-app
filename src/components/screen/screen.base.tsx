import { motion, AnimatePresence } from 'framer-motion';
import { useScreenStore } from '@/lib/state/player.state';
import { useEffect } from 'react';
import { InitScreen } from '@/components/screen/init.screen';
import { LoadingScreen } from '@/components/screen/loading.screen';
import { MainScreen } from '@/components/screen/main.screen';
import { screenDefault } from '@/styles/screen.styles';

export const ScreenBase = () => {
    const { currentScreen, setScreen } = useScreenStore();

    // 로딩 화면에서 자동으로 음악 화면으로 이동

    const handleScreenSwitch = () => {
        switch (currentScreen) {
            case 'loading':
                return <LoadingScreen />;
            case 'init':
                return <InitScreen />;
            case 'music':
                return <MainScreen />;
            default:
                return <InitScreen />;
        }
    };

    return (
        <div className="relative w-full h-full overflow-hidden rounded-lg">
            <AnimatePresence mode="wait">
                <motion.div
                    key="init"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className={screenDefault}
                >
                    {handleScreenSwitch()}
                </motion.div>

                {/*{currentScreen === 'init' ||*/}
                {/*currentScreen === 'loading' ||*/}
                {/*currentScreen === 'music' ? (*/}
                {/*    <motion.div*/}
                {/*        key="init"*/}
                {/*        initial={{ opacity: 0 }}*/}
                {/*        animate={{ opacity: 1 }}*/}
                {/*        exit={{ opacity: 0 }}*/}
                {/*        transition={{ duration: 1 }}*/}
                {/*        className={screenDefault}*/}
                {/*    >*/}
                {/*        {handleScreenSwitch()}*/}
                {/*    </motion.div>*/}
                {/*) : (*/}

                {/*)}*/}
            </AnimatePresence>
        </div>
    );
};
