'use client';

import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

export const useCameraLogger = () => {
    const { camera } = useThree();

    useEffect(() => {
        const logCameraInfo = () => {
            console.log('Camera Position:', camera.position);
            // console.log('Camera FOV:', camera.fov);
            console.log('Camera Zoom:', camera.zoom);
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'z') {
                // 'L' 키를 누르면 카메라 정보 출력
                logCameraInfo();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [camera]);
};
