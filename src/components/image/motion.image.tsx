import { motion } from 'framer-motion';
import Image from 'next/image';
import { ComponentProps } from 'react';
const MotionWrapperImage = motion(Image);

export const MotionImage = (props: ComponentProps<typeof MotionWrapperImage>) => {
    return <MotionWrapperImage {...props} />;
};
