import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface IScreenWrapper {
    children: ReactNode;
    className?: string;
}
export const MotionWrapper = ({ children, className }: IScreenWrapper) => {
    return (
        <motion.div
            key="init"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
