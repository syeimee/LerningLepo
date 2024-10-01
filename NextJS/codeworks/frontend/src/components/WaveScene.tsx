'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useMemo, useRef } from 'react';
import { Color, ShaderMaterial, Mesh, DoubleSide, Vector2} from 'three'; // BoxBufferGeometryを追加

import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

// import jpFlag from '@/components/textures/jp-flag.png'

const Box = () => {
  // Mesh型を指定してuseRefを定義
  const mesh = useRef<Mesh>(null);
  // const flagTexture = useLoader(TextureLoader, jpFlag as unknown as string); // テクスチャを読み込む
  const material = useMemo(() => {
    return new ShaderMaterial({
      vertexShader: vertexShader, 
      fragmentShader: fragmentShader,
      // transparent: true, //透明度を有効
      side: DoubleSide, //裏側まで着色
      uniforms: {
        uFrequency: { value: new Vector2(5, 10) }, // 位相のグローバル変数
        uColor: { value: new Color("pink") }, // ユニフォームの追加
        uTime: {value: 0}, //時間のグローバル変数
        // uTexture:{value: flagTexture} //テクスチャのグローバル変数
      },
    });
  }, []);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={mesh} material={material}>
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
};

const App = () => {
  return (
    <Canvas 
      camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Suspense >
        <Box />
      </Suspense>    
</Canvas>
  );
};

export default App;
