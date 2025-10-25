'use client';

import { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { Group } from 'three';
import type { CharacterPosition } from '@/types/character';

interface DogCharacterProps {
  position?: CharacterPosition;
  rotation?: number;
  animation?: 'idle' | 'walk' | 'celebrate' | 'sad';
}

export function DogCharacter({
  position = { x: 0, y: 0, z: 0 },
  rotation = 0,
  animation = 'idle'
}: DogCharacterProps) {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF('/models/dog/scene.gltf');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions && actions[animation]) {
      actions[animation]?.reset().fadeIn(0.5).play();
      return () => {
        actions[animation]?.fadeOut(0.5);
      };
    }
  }, [animation, actions]);

  return (
    <group
      ref={group}
      position={[position.x, position.y, position.z]}
      rotation={[0, rotation, 0]}
      scale={[1, 1, 1]}
    >
      <primitive object={scene.clone()} />
    </group>
  );
}

// Preload the model
useGLTF.preload('/models/dog/scene.gltf');
