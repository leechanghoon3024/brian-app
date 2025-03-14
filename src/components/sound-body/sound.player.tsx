import { Html, OrbitControls, useGLTF } from '@react-three/drei';
import { useCameraLogger } from '@/lib/hooks/use.camera.logged';
import { useEffect, useState } from 'react';
import { Euler, Vector3 } from 'three';
import { ButtonBody } from '@/components/sound-body/button.body';
import { ScreenBase } from '@/components/screen/screen.base';
import { useThree } from '@react-three/fiber';
import { useSiteStore } from '@/lib/state/site.state';

export const SoundPlayer = () => {
    const { isIos } = useSiteStore();
    useCameraLogger();
    return (
        <>
            <IpodModel />
            {!isIos && <OrbitControls />}
        </>
    );
};

const IpodModel = () => {
    const { isIos } = useSiteStore();
    const { scene, nodes } = useGLTF('/models/ipod.glb'); // GLB 파일 로드
    const { gl: renderer } = useThree();
    const fix = isIos && renderer.getPixelRatio();
    const iosPosition =
        fix === 1
            ? new Vector3(0.6814, 2, 0.058721691370010376)
            : new Vector3(0.6814, 0.98, 0.058721691370010376);
    const [screenProps] = useState({
        position: iosPosition,
        rotation: new Euler(Math.PI, 1.6, Math.PI),
        scale: new Vector3(0.2, 0.18, 0.4)
    });
    // const [menuProps] = useState({
    //     position: new Vector3(0.69, 0.45, 0.058721691370010376),
    //     rotation: new Euler(Math.PI, 1.6, Math.PI),
    //     scale: new Vector3(0.2, 0.18, 0.4)
    // });
    // const [screenProps] = useState({
    //     position: new Vector3(0.6814, 1.18, 0.648721691370010376),
    //     rotation: new Euler(Math.PI, 1.6, Math.PI),
    //     scale: new Vector3(0.2, 0.18, 0.4)
    // });
    const [menuProps] = useState({
        position: new Vector3(0.69, 0.45, 0.058721691370010376),
        rotation: new Euler(Math.PI, 1.6, Math.PI),
        scale: new Vector3(0.2, 0.18, 0.4)
    });
    useEffect(() => {
        const screenMesh = nodes?.art;
        if (screenMesh) {
            screenMesh.visible = false; // 기존 GLB 화면 숨김
        }
    }, [scene, nodes]);

    return (
        <group position={[0, -0.8, -0.15]}>
            {Object.entries(nodes).map(([key, node]: [string, any]) => {
                return <primitive key={key} object={node} />;
            })}
            <Html
                position={screenProps.position.toArray()}
                rotation={screenProps.rotation.toArray()}
                scale={screenProps.scale.toArray()}
                occlude
                transform={true}
            >
                <div className="w-[150px] h-[100px] bg-black flex items-center justify-center text-white text-[16px] rounded-[10px] overflow-hidden">
                    <ScreenBase />
                </div>
            </Html>
            <Html
                position={menuProps.position.toArray()}
                rotation={menuProps.rotation.toArray()}
                scale={menuProps.scale.toArray()}
                transform
                occlude
            >
                <div className="w-[120px] h-[120px] flex items-center justify-center text-white text-[16px] rounded-[10px] overflow-hidden">
                    <ButtonBody />
                </div>
            </Html>
        </group>
    );
};
