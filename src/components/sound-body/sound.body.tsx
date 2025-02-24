'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { SoundPlayer } from '@/components/sound-body/sound.player';
import { Vector3 } from 'three';
import { useScreenStore } from '@/lib/state/player.state';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Environment } from '@react-three/drei';
import { CanvasWrapper } from '@isaac_ua/drei-html-fix';

const CameraAnimation = () => {
    const { camera } = useThree();
    const animationComplete = useRef(false); // 애니메이션 완료 여부 저장
    const finalPosition = new Vector3(9.3402, -2.7404, -1.492);
    // const [targetPosition, setTargetPosition] = useState(new Vector3(9.1322, 3.3111, 1.9534));

    useFrame(() => {
        if (!animationComplete.current) {
            const distance = camera.position.distanceTo(finalPosition);
            if (distance > 0.01) {
                camera.position.lerp(finalPosition, 0.05);
                camera.lookAt(0, 0, 0);
            } else {
                animationComplete.current = true;
            }
        }
    });

    return null;
};

export const SoundBody = () => {
    const { isOpen } = useScreenStore();
    const initFov = 18;
    const initZoom = 1;
    const [targetPosition] = useState(new Vector3(9.1322, 3.3111, 1.9534));
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                setHasAnimated(true);
            }, 1000);
        }
    }, [isOpen]);
    return (
        <motion.div
            className="w-full h-full absolute"
            style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
        >
            <CanvasWrapper>
                <Canvas
                    className="w-full h-full"
                    camera={{ position: targetPosition, fov: initFov, zoom: initZoom }}
                >
                    {hasAnimated && <CameraAnimation />}
                    <ambientLight intensity={0.8} />
                    <pointLight position={[5, 5, 5]} intensity={1.5} />
                    <SoundPlayer />
                    <Environment path="/images/sunset/" files={'venice_sunset_1k.hdr'} />
                    <directionalLight
                        position={[0, 10, -10]} // 북쪽
                        intensity={0.5}
                        castShadow
                    />
                </Canvas>
            </CanvasWrapper>
        </motion.div>
    );
};
