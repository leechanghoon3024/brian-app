'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Environment, OrbitControls } from '@react-three/drei';
import { DoubleSide, Group, NormalBlending, Shape } from 'three';

const HouseAndCircle = () => {
    const groupRef = useRef<Group>(null);

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.01;
        }
    });

    return (
        <group ref={groupRef} rotation={[0, 0, Math.PI / 5]} scale={[1.5, 1.5, 1.5]}>
            <mesh position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 5]}>
                <extrudeGeometry
                    args={[createPentagonShape(), { depth: 0.2, bevelEnabled: false }]}
                />
                <meshPhysicalMaterial
                    color="#FFC107"
                    transparent={true}
                    opacity={0.7}
                    transmission={0.15}
                    roughness={0.4}
                    clearcoat={0.2}
                    clearcoatRoughness={0.3}
                    side={DoubleSide} // ✅
                />
            </mesh>
            <mesh position={[0.3, -0.25, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.4, 0.4, 0.1, 32]} />
                <meshPhysicalMaterial
                    color="#673AB7"
                    depthWrite={true}
                    clearcoat={0.2}
                    side={DoubleSide}
                />
            </mesh>
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 3, 5]} intensity={1} />
        </group>
    );
};

const createPentagonShape = () => {
    const shape = new Shape();
    shape.moveTo(-0.5, 0);
    shape.lineTo(0.5, 0);
    shape.lineTo(0.5, 0.6);
    shape.lineTo(0, 1);
    shape.lineTo(-0.5, 0.6);
    shape.closePath();
    return shape;
};

export const NSpaceLogo = () => {
    return (
        <Canvas className="w-full h-screen">
            <OrbitControls />
            <HouseAndCircle />
            <Environment path="/images/sunset/" files={'venice_sunset_1k.hdr'} />
        </Canvas>
    );
};
