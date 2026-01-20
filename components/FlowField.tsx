import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';

const HairStrands = () => {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const { viewport, mouse } = useThree();
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const noise3D = useMemo(() => createNoise3D(), []);

    // Grid configuration
    const COLS = 40;
    const ROWS = 20;
    const COUNT = COLS * ROWS;
    
    // Geometry: Thin long cylinder (hair strand)
    const geometry = useMemo(() => {
        const geo = new THREE.CylinderGeometry(0.02, 0.05, 1.5, 4);
        geo.translate(0, 0.75, 0); // Pivot at base
        return geo;
    }, []);

    const material = useMemo(() => new THREE.MeshStandardMaterial({
        color: '#1F0B05', // Dark brown/black hair
        roughness: 0.6,
        metalness: 0.1,
    }), []);

    useFrame((state) => {
        if (!meshRef.current) return;
        
        const time = state.clock.getElapsedTime();
        const mx = (mouse.x * viewport.width) / 2;
        const my = (mouse.y * viewport.height) / 2;

        let i = 0;
        // Spacing to cover viewport plus some overflow
        const spaceX = viewport.width / COLS;
        const spaceY = viewport.height / ROWS;

        for (let x = 0; x < COLS; x++) {
            for (let y = 0; y < ROWS; y++) {
                // Calculate position centered in viewport
                const px = (x - COLS / 2) * spaceX * 1.2;
                const py = (y - ROWS / 2) * spaceY * 1.2;
                
                dummy.position.set(px, py, 0);

                // Noise field rotation
                const n = noise3D(px * 0.15, py * 0.15, time * 0.2);
                
                // Interaction: Point away from mouse
                const dx = px - mx;
                const dy = py - my;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                // Base rotation from noise
                let rotZ = n * 0.5; // Swaying
                let rotX = n * 0.3; // Leaning

                // Mouse influence (Combing effect)
                if (dist < 8) {
                    const force = (8 - dist) / 8;
                    const angle = Math.atan2(dy, dx);
                    // Blend noise rotation with mouse repulsion angle
                    rotZ = THREE.MathUtils.lerp(rotZ, angle - Math.PI / 2, force * 0.8);
                    rotX += force; // Lean forward
                }

                dummy.rotation.set(rotX, 0, rotZ);
                
                // Scale variation
                const scale = 1 + n * 0.2;
                dummy.scale.setScalar(scale);

                dummy.updateMatrix();
                meshRef.current.setMatrixAt(i, dummy.matrix);
                i++;
            }
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]} geometry={geometry} material={material} />
    );
};

export const FlowField = () => {
    return (
        <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, 15], fov: 45 }} dpr={[1, 2]}>
                {/* HERO SECTION BACKGROUND COLOR (Orange) */}
                <color attach="background" args={['#FF6600']} />
                
                <ambientLight intensity={1.5} />
                <directionalLight position={[10, 10, 10]} intensity={2} />
                
                <HairStrands />
            </Canvas>
        </div>
    );
};