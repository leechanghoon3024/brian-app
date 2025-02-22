'use client';

import { Canvas } from '@react-three/fiber';
import { SoundPlayer } from '@/components/sound-body/sound.player';
import { Vector3 } from 'three';

export const SoundBody = () => {
    const initPosition = new Vector3(6.67, 1.71, 0.09);
    const initFov = 20;
    const initZoom = 1;
    return (
        <Canvas
            className={'w-full h-full'}
            camera={{ position: initPosition, fov: initFov, zoom: initZoom }}
        >
            <ambientLight intensity={0.8} />
            <pointLight position={[5, 5, 5]} intensity={1.5} />
            <SoundPlayer />
        </Canvas>
    );
};
