import { AnimatePresence, motion } from 'framer-motion';
import { useScreenStore } from '@/lib/state/player.state';
import { AudioListMenu } from '@/components/menu/audio.list.menu';
import { InitMenu } from '@/components/menu/init.menu';
import { screenDefault } from '@/styles/screen.styles';
import { OptionListMenu } from '@/components/menu/option.list.menu';

export const MenuBody = () => {
    const { menuScreen } = useScreenStore();

    const handleMenuSwitch = () => {
        switch (menuScreen) {
            case 'init':
                return <InitMenu />;
            case 'musicList':
                return <AudioListMenu />;
            case 'options':
                return <OptionListMenu />;
            default:
                return null;
        }
    };

    return (
        <AnimatePresence mode="wait">
            {menuScreen && (
                <motion.div
                    key={menuScreen}
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '-100%' }}
                    transition={{ duration: 0.3 }}
                    className={`${screenDefault}`}
                >
                    {handleMenuSwitch()}
                </motion.div>
            )}
        </AnimatePresence>
    );
};
