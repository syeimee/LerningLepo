// 最初のバージョン
"use client";
import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import TWEEN from "@tweenjs/tween.js";

// Props の型定義
interface CubeProps {
  position: THREE.Vector3;
  size: number;
  color: string;
  duration: number;
  stopRate: number;
}

const Cube: React.FC<CubeProps> = ({ position, size, color, duration, stopRate }) => {
  const cubeRef = useRef<THREE.Mesh>(null!);
  const animating = useRef(false);
  const cubeHalf = size / 2;

  useFrame(() => {
    TWEEN.update();
    if (Math.random() < stopRate || animating.current) return;

    const cube = cubeRef.current;
    const originPos = cube.position.clone();
    const originQuat = cube.quaternion.clone();
    const moveAxis: "x" | "z" = Math.random() > 0.5 ? "x" : "z";
    const moveOffset = Math.random() > 0.5 ? -1 : 1;

    // 移動方向に対する回転軸を求める
    const normalUnit = 1;
    const axis = new THREE.Vector3();
    const rotAxis: "x" | "z" = moveAxis === "x" ? "z" : "x";
    axis[rotAxis] = normalUnit;

    const nextr = originPos.clone().add(axis); // Cubeの中心から、求めたい方向に1移動した座標を算出

    // world座標をlocalの座標に変換
    const rotVec = cube.worldToLocal(nextr.clone()).normalize(); // 正規化

    // rot_vecからlocal軸(x, y, z)を取得
    let localRotAxis: "x" | "y" | "z" = 'x';
    if (Math.abs(rotVec.x) === normalUnit) localRotAxis = 'x';
    else if (Math.abs(rotVec.y) === normalUnit) localRotAxis = 'y';
    else if (Math.abs(rotVec.z) === normalUnit) localRotAxis = 'z';
    
    // axisを設定
    const rotationAxis = new THREE.Vector3();
    rotationAxis[localRotAxis] = normalUnit;

    // Determine rotation direction
    const axisDir = rotVec[localRotAxis];
    let rotDir = 1;
    if (
      (moveAxis === 'x' && ((axisDir > 0 && moveOffset > 0) || (axisDir < 0 && moveOffset < 0))) ||
      (moveAxis === 'z' && ((axisDir > 0 && moveOffset < 0) || (axisDir < 0 && moveOffset > 0)))
    ) {
      rotDir = -rotDir;
    }

    const tween = new TWEEN.Tween({ x: 0 })
      .to({ x: 1 }, duration)
      .easing(TWEEN.Easing.Linear.None)
      .onStart(() => {
        animating.current = true;
      })
      .onUpdate(({ x }) => {
        const radius = cubeHalf * Math.sqrt(2);
        const angle = 45 + 90 * x;
        const rad = (angle * Math.PI) / 180;

        // Update rad with rotation direction
        const height = Math.sin(rad) * radius - cubeHalf;
        const move = (cubeHalf - Math.cos(rad) * radius) * moveOffset;

        cube.position[moveAxis] = originPos[moveAxis] + move;
        cube.position.y = originPos.y + height;

        const newQuat = originQuat.clone();
        const targetQuat = new THREE.Quaternion();
        targetQuat.setFromAxisAngle(rotationAxis, (Math.PI / 2) * x * rotDir); // Apply rotDir
        newQuat.multiply(targetQuat);
        cube.quaternion.copy(newQuat);
      })
      .onComplete(() => {
        animating.current = false;
      });

    tween.start();
  });

  return (
    <mesh ref={cubeRef} position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshLambertMaterial color={color} />
    </mesh>
  );
};

const Scene: React.FC = () => {
  const cubeSize = 2;
  const cubeCount = 20;
  const gridCount = 15;
  const duration = 1000;
  const stopRate = 0.99;

  const gridSize = gridCount * cubeSize;
  const cubes = useMemo(() => {
    const cubeArray = [];
    for (let i = 0; i < cubeCount; i++) {
      const position = new THREE.Vector3(
        Math.floor(Math.random() * gridCount) * cubeSize - gridSize / 2 + cubeSize / 2,
        cubeSize / 2,
        Math.floor(Math.random() * gridCount) * cubeSize - gridSize / 2 + cubeSize / 2
      );
      const colors = ["#E9546B", "#00A95F", "#187FC4", "#FFA500", "#9932CC"];
      cubeArray.push({ 
        position, 
        size: cubeSize, 
        color: colors[Math.floor(Math.random() * colors.length)], 
        duration, 
        stopRate 
      });
    }
    return cubeArray;
  }, [cubeCount, gridCount, cubeSize, duration, stopRate]);

  return (
    <>
      {cubes.map((cubeProps, index) => (
        <Cube
          key={index}
          position={cubeProps.position}
          size={cubeProps.size}
          color={cubeProps.color}
          duration={cubeProps.duration}
          stopRate={cubeProps.stopRate}
        />
      ))}
    </>
  );
};

const RollingCube: React.FC = () => {
  useEffect(() => {
    return () => TWEEN.removeAll();
  }, []);

  return (
    <div style={{ width: '50vw', height: '75vh' }}>
      <Canvas 
        camera={{ position: [0, 30, 50], fov: 60 }}
        gl={{ antialias: true }}
      >
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={0.8} />
        <directionalLight position={[-10, -10, -10]} intensity={0.8} />
        <Scene />
      </Canvas>
    </div>
  );
};

export default RollingCube;
