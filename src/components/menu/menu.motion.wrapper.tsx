import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useScreenStore } from '@/lib/state/player.state';

interface IScreenWrapper {
    children: ReactNode;
    className?: string;
    keyName?: string;
}
export const MenuMotionWrapper = ({ children, className, keyName }: IScreenWrapper) => {
    return (
        <motion.div
            key={keyName}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.5 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
