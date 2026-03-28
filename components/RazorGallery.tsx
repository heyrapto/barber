import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Environment, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// --- ERROR BOUNDARY FOR TEXTURE LOADING ---
interface TextureErrorBoundaryProps {
  children?: React.ReactNode;
  fallback: React.ReactNode;
}

interface TextureErrorBoundaryState {
  hasError: boolean;
}

class TextureErrorBoundary extends React.Component<TextureErrorBoundaryProps, TextureErrorBoundaryState> {
    state: TextureErrorBoundaryState = { hasError: false };
    readonly props: TextureErrorBoundaryProps;

    static getDerivedStateFromError(): TextureErrorBoundaryState { return { hasError: true }; }
    
    render() {
        if (this.state.hasError) return this.props.fallback;
        return this.props.children;
    }
}

// --- ROBUST IMAGE LOADER COMPONENT ---
const ImageFace = ({ url }: { url: string }) => {
    // useTexture is more robust than manual useLoader
    const texture = useTexture(url);
    return (
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} toneMapped={false} />
    );
};

// --- TRIANGULAR PRISM COMPONENT ---
interface PrismItemProps {
    url: string;
    title: string;
    index: number;
    position: [number, number, number];
}

const PrismItem: React.FC<PrismItemProps> = ({ 
    url, 
    title, 
    index,
    position 
}) => {
    const groupRef = useRef<THREE.Group>(null);
    const [hovered, setHover] = useState(false);
    
    // Geometry constants
    const WIDTH = 3.5;
    const HEIGHT = 5.0;
    const APOTHEM = 1.01; 

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        
        // Face 1 (Metal/Text) is at rotation 0.
        // Face 2 (Image) is at rotation -120 deg ( -2PI/3 ).
        const targetRotation = hovered ? -((Math.PI * 2) / 3) : 0;
        
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
            groupRef.current.rotation.y, 
            targetRotation, 
            delta * 5
        );
        
        // Gentle Float
        groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1 + index) * 0.1;
    });

    // Fallback material
    const loadingMaterial = new THREE.MeshBasicMaterial({ color: '#222' });

    return (
        <group 
            ref={groupRef} 
            position={position}
            onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }}
            onPointerOut={() => { setHover(false); document.body.style.cursor = 'auto'; }}
        >
            {/* FACE 1: METAL (Front at 0 deg) */}
            <mesh position={[0, 0, APOTHEM]}>
                <planeGeometry args={[WIDTH, HEIGHT]} />
                <meshStandardMaterial color="#333" roughness={0.4} metalness={0.9} />
                <group position={[0, 0, 0.05]}>
                    <Text 
                        fontSize={0.5} 
                        font="https://fonts.gstatic.com/s/oswald/v49/TK3iWkUHHAIjg752GT8G.woff"
                        color="#0055FF"
                        anchorX="center"
                        anchorY="middle"
                    >
                        {title}
                    </Text>
                     <Text 
                        position={[0, -0.4, 0]}
                        fontSize={0.15} 
                        font="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxM.woff"
                        color="#888"
                        anchorX="center"
                        anchorY="middle"
                        letterSpacing={0.1}
                    >
                        HOVER TO REVEAL
                    </Text>
                </group>
                {/* Border */}
                <mesh position={[0, 0, -0.01]}>
                    <planeGeometry args={[WIDTH + 0.1, HEIGHT + 0.1]} />
                    <meshBasicMaterial color="#0055FF" />
                </mesh>
            </mesh>

            {/* FACE 2: IMAGE (Rotated +120 around Y center) */}
            <group rotation={[0, (Math.PI * 2) / 3, 0]}>
                <mesh position={[0, 0, APOTHEM]}>
                    <planeGeometry args={[WIDTH, HEIGHT]} />
                    
                    <Suspense fallback={<primitive object={loadingMaterial} attach="material" />}>
                         <TextureErrorBoundary fallback={<primitive object={loadingMaterial} attach="material" />}>
                             <ImageFace url={url} />
                         </TextureErrorBoundary>
                    </Suspense>

                    {/* Glassy Overlay for Shine */}
                    <mesh position={[0,0,0.01]}>
                        <planeGeometry args={[WIDTH, HEIGHT]} />
                        <meshPhysicalMaterial 
                            transmission={0.2}
                            roughness={0} 
                            metalness={0.2} 
                            transparent 
                            opacity={0.2}
                        />
                    </mesh>
                </mesh>
            </group>

            {/* FACE 3: BACKING (Rotated +240 around Y center) */}
            <group rotation={[0, (Math.PI * 4) / 3, 0]}>
                <mesh position={[0, 0, APOTHEM]}>
                    <planeGeometry args={[WIDTH, HEIGHT]} />
                    <meshStandardMaterial color="#0055FF" roughness={0.8} />
                    <Text 
                        fontSize={1.2} 
                        font="https://fonts.gstatic.com/s/oswald/v49/TK3iWkUHHAIjg752GT8G.woff"
                        color="#FFFFFF"
                        anchorX="center"
                        anchorY="middle"
                        rotation={[0, 0, Math.PI/2]}
                        fillOpacity={0.1}
                    >
                        ANGIE
                    </Text>
                </mesh>
            </group>

            {/* Internal Core */}
            <mesh rotation={[0, Math.PI/2, 0]}>
                <cylinderGeometry args={[1.5, 1.5, HEIGHT, 3]} />
                <meshBasicMaterial color="#F8F9FA" />
            </mesh>
        </group>
    );
};

const GalleryScene = () => {
    const items = [
        { 
            url: "https://images.unsplash.com/photo-1536520002442-39764a41e987?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
            title: "PRECISION",
            pos: [-4, 0, 0]
        },
        { 
            url: "https://images.unsplash.com/photo-1621607512022-6aecc4fed814?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
            title: "CRAFT",
            pos: [0, 0, 0.5] 
        },
        { 
            url: "https://images.unsplash.com/photo-1605497787907-66a1ca8a11bb?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
            title: "RITUAL",
            pos: [4, 0, 0] 
        },
    ];

    return (
        <group>
            {items.map((item, i) => (
                <PrismItem 
                    key={i}
                    index={i}
                    url={item.url} 
                    title={item.title} 
                    position={item.pos as [number, number, number]} 
                />
            ))}
        </group>
    )
}

// --- LOADING FALLBACK ---
const Loader = () => (
    <Text color="#0055FF" fontSize={0.5} position={[0,0,0]}>
        LOADING PORTFOLIO...
    </Text>
);

export const RazorGallery = () => {
  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [0, 0, 12], fov: 35 }} dpr={[1, 2]}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1.0} color="white" />
        <pointLight position={[-10, 0, 10]} intensity={2.0} color="#0055FF" />
        
        <Suspense fallback={<Loader />}>
            <Environment preset="city" />
            <GalleryScene />
        </Suspense>
      </Canvas>
    </div>
  );
};