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
            initial={{ x: '100%' }} // 오른쪽에서 시작
            animate={{ x: 0 }} // 중앙으로 이동
            exit={{ x: '-100%' }} // 왼쪽으로 사라짐
            transition={{ duration: 0.5 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
