import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer, Vignette, Noise } from '@react-three/postprocessing';
import { PerspectiveCamera, Environment, Sparkles } from '@react-three/drei';

export default function Scene3D({ children }) {
  return (
    <div className="absolute inset-0 -z-10 w-full h-full">
      <Canvas shadows gl={{ antialias: false, stencil: false, depth: true }}>
        <color attach="background" args={['#050505']} />
        
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#B22222" />
        <spotLight 
          position={[-5, 5, 5]} 
          angle={0.15} 
          penumbra={1} 
          intensity={2} 
          castShadow 
          color="#D1D5DB"
        />

        <Suspense fallback={null}>
          {children}
          <Environment preset="night" />
          <Sparkles 
            count={120} 
            scale={12} 
            size={1.5} 
            speed={0.4} 
            color="#B22222" 
            opacity={0.6} 
          />
        </Suspense>

        <EffectComposer disableNormalPass>
          <Bloom 
            luminanceThreshold={0.1} 
            mipmapBlur 
            intensity={1.5} 
            radius={0.4} 
          />
          <Noise opacity={0.06} />
          <Vignette eskil={false} offset={0.1} darkness={1.2} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
