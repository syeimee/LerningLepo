// import { Canvas } from '@react-three/fiber'
// import { OrthographicCamera } from '@react-three/drei'

// import vertexShader from '@/shaders/vertexShader';
// import fragmentShader from '@/shaders/fragmentShader';

// const Plane: React.FC = () => {
//   return (
//     <>
//       <mesh>
//         <planeGeometry args={[2, 2]} />
//         <shaderMaterial
//           vertexShader={vertexShader}
//           fragmentShader={fragmentShader}
//         />
//       </mesh>
//     </>
//   )
// }

// const WaveScene = () => {
//   return (
//     <div style={{ width: '100%', height: '100vh' }}>
//       <Canvas>
//         <ambientLight />
//         <Plane />
//         <OrthographicCamera position={[-0.5, 0.5, 0.5]} near={0.1} far={10} />
//       </Canvas>
//     </div>
//   )
// }

// export default WaveScene