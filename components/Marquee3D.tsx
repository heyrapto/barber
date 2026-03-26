import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { COLORS } from '../constants';

const CylinderText = ({ text, position, rotationSpeed = 0.5, color = COLORS.PRIMARY }: { text: string, position: [number, number, number], rotationSpeed?: number, color?: string }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Create a ring of text
  const count = 6;
  const radius = 3.5;

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        return (
          <group key={i} rotation={[0, angle, 0]}>
            <Text
              position={[0, 0, radius]}
              fontSize={1.2}
              font="https://fonts.gstatic.com/s/oswald/v49/TK3iWkUHHAIjg752GT8G.woff"
              color={color}
              anchorX="center"
              anchorY="middle"
            >
              {text}
            </Text>
          </group>
        )
      })}
    </group>
  );
};

const KineticScene = () => {
  return (
    <group>
      <CylinderText text="SECURE" position={[0, 1.5, 0]} rotationSpeed={0.4} color="#FF6600" />
      <CylinderText text="EST. 2016 • WARSAW" position={[0, 0, 0]} rotationSpeed={-0.4} color="#F5F5F5" />
      <CylinderText text="CYBER DEFENSE" position={[0, -1.5, 0]} rotationSpeed={0.4} color="#FF6600" />
    </group>
  )
}

export const Marquee3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 35 }}
        dpr={[1, 2]}
      >
        {/* Match the background color to Section 2 Right (#1F0B05) */}
        <color attach="background" args={['#1F0B05']} />

        <KineticScene />

        <ambientLight intensity={0.5} />
        <Environment preset="studio" />
        <fog attach="fog" args={['#1F0B05', 8, 20]} />
      </Canvas>
    </div>
  );
};