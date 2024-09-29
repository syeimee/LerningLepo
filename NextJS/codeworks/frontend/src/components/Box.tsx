"use client";

import * as THREE from 'three';
import { useRef, useMemo, useLayoutEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { CameraControls } from '@react-three/drei';

const MorphingShapes = ({ length = 10000, size = [0.15, 0.15, 0.15], ...props }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [morphProgress, setMorphProgress] = useState(0);
  const [morphDirection, setMorphDirection] = useState(1);

  const [positions, colors, spherePositions] = useMemo(() => {
    const positions = new Float32Array(length * 3);
    const colors = new Float32Array(length * 3);
    const spherePositions = new Float32Array(length * 3);
    const radius = 5;
    for (let i = 0; i < length; i++) {
      positions.set([Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5], i * 3);
      colors.set([Math.random(), Math.random(), Math.random()], i * 3);
      
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      spherePositions.set([
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      ], i * 3);
    }
    return [positions, colors, spherePositions];
  }, [length]);

  useLayoutEffect(() => {
    if (meshRef.current) {
      const dummy = new THREE.Object3D();
      for (let i = 0; i < length; i++) {
        dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
      meshRef.current.geometry.setAttribute('color', new THREE.InstancedBufferAttribute(colors, 3));
    }
  }, [length, positions, colors]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
      groupRef.current.rotation.x += 0.005;
    }

    setMorphProgress((prev) => {
      const newProgress = prev + delta * 0.5 * morphDirection;
      if (newProgress > 1 || newProgress < 0) {
        setMorphDirection((prev) => -prev);
        return prev;
      }
      return newProgress;
    });

    if (meshRef.current) {
      const dummy = new THREE.Object3D();
      for (let i = 0; i < length; i++) {
        const x = THREE.MathUtils.lerp(positions[i * 3], spherePositions[i * 3], morphProgress);
        const y = THREE.MathUtils.lerp(positions[i * 3 + 1], spherePositions[i * 3 + 1], morphProgress);
        const z = THREE.MathUtils.lerp(positions[i * 3 + 2], spherePositions[i * 3 + 2], morphProgress);
        dummy.position.set(x, y, z);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} {...props}>
      <instancedMesh ref={meshRef} args={[new THREE.BoxGeometry(...size), new THREE.MeshPhongMaterial({ vertexColors: true }), length]} />
      <lineSegments ref={edgesRef}>
        <edgesGeometry args={[new THREE.BoxGeometry(...size)]} />
        <lineBasicMaterial color="black" />
      </lineSegments>
    </group>
  );
};

const CameraAnimation = () => {
  const { camera } = useThree();
  const controlsRef = useRef<CameraControls>(null);
  const originalPosition = new THREE.Vector3(0, 0, 12);
  const zoomedPosition = new THREE.Vector3(0, 0, 2);
  const animationDuration = 6;
  const progress = useRef(0);
  const direction = useRef(1);

  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  useFrame((_, delta) => {
    if (controlsRef.current) {
      progress.current += delta * direction.current / animationDuration;
      if (progress.current >= 1 || progress.current <= 0) {
        direction.current *= -1;
      }

      const easedProgress = easeInOutCubic(progress.current);
      const targetPosition = new THREE.Vector3().lerpVectors(originalPosition, zoomedPosition, easedProgress);
      const newPosition = new THREE.Vector3().lerpVectors(camera.position, targetPosition, 0.05);
      controlsRef.current.setLookAt(newPosition.x, newPosition.y, newPosition.z, 0, 0, 0, true);
    }
  });

  return <CameraControls ref={controlsRef} />;
};

const Scene = () => {
  return (
    <div style={{ width: '100%', height: '85vh' }}>
      <Canvas camera={{ position: [0, 0, 12] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <MorphingShapes />
        <CameraAnimation />
      </Canvas>
    </div>
  );
};

export default Scene;