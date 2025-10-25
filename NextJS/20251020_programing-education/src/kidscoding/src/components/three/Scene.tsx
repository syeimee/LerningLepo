'use client';

import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Grid } from '@react-three/drei';
import { DogCharacter } from './DogCharacter';
import { getDevicePerformanceLevel, getRenderingSettings } from '@/lib/utils/device-detection';
import type { CharacterPosition } from '@/types/character';

interface SceneProps {
  characterPosition?: CharacterPosition;
  characterRotation?: number;
  characterAnimation?: 'idle' | 'walk' | 'celebrate' | 'sad';
  goalPosition?: CharacterPosition;
}

export function Scene({
  characterPosition = { x: 0, y: 0, z: 0 },
  characterRotation = 0,
  characterAnimation = 'idle',
  goalPosition = { x: 3, y: 0, z: 0 }
}: SceneProps) {
  const [renderSettings, setRenderSettings] = useState({
    shadows: true,
    antialias: true,
    pixelRatio: 1
  });

  useEffect(() => {
    const performanceLevel = getDevicePerformanceLevel();
    const settings = getRenderingSettings(performanceLevel);
    setRenderSettings(settings);
  }, []);

  return (
    <div className="w-full h-full">
      <Canvas
        shadows={renderSettings.shadows}
        gl={{
          antialias: renderSettings.antialias,
          alpha: true,
        }}
        dpr={renderSettings.pixelRatio}
        camera={{
          position: [0, 10, 0],
          fov: 50,
          near: 0.1,
          far: 100,
          up: [0, 0, 1]
        }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={0.8}
            castShadow={renderSettings.shadows}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <hemisphereLight intensity={0.3} groundColor="#8BC34A" />

          {/* Grid floor */}
          <Grid
            args={[10, 10]}
            cellSize={1}
            cellThickness={1}
            cellColor="#E0E0E0"
            sectionSize={5}
            sectionThickness={1.5}
            sectionColor="#BDBDBD"
            fadeDistance={25}
            fadeStrength={1}
            followCamera={false}
            infiniteGrid={false}
          />

          {/* Character position highlight */}
          <mesh
            position={[characterPosition.x, 0.01, characterPosition.z]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[0.9, 0.9]} />
            <meshStandardMaterial
              color="#FFD54F"
              emissive="#FFD54F"
              emissiveIntensity={0.8}
              transparent
              opacity={0.7}
            />
          </mesh>

          {/* Character */}
          <DogCharacter
            position={characterPosition}
            rotation={characterRotation}
            animation={characterAnimation}
          />

          {/* Goal indicator */}
          <mesh position={[goalPosition.x, 0.5, goalPosition.z]}>
            <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
            <meshStandardMaterial
              color="#4CAF50"
              emissive="#4CAF50"
              emissiveIntensity={0.5}
              metalness={0.3}
              roughness={0.7}
            />
          </mesh>

          {/* Camera controls - top-down view, limited rotation */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2 - 0.1}
            minPolarAngle={Math.PI / 2 - 0.1}
            minDistance={8}
            maxDistance={15}
            target={[0, 0, 0]}
            autoRotate={false}
          />

          {/* Environment for better lighting */}
          {renderSettings.shadows && (
            <Environment preset="sunset" />
          )}
        </Suspense>
      </Canvas>

      {/* Loading indicator overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Suspense fallback={
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg">
            <div className="text-[32px] mb-2">🐶</div>
            <div className="text-[20px] font-bold text-[var(--color-gray-600)]">
              よみこみちゅう...
            </div>
          </div>
        } />
      </div>
    </div>
  );
}
