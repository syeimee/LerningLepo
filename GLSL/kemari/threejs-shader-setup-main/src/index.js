import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

const sphereGeometry = new THREE.SphereGeometry(0.5, 64, 64);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x888888 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

const hairCount = 1000; // 毛の本数
const hairGeometry = new THREE.CylinderGeometry(0.02, 0.01, 0.2, 8); // 毛のジオメトリ
const hairMaterial = new THREE.MeshBasicMaterial({ color: 0x654321 }); // 毛の色

for (let i = 0; i < hairCount; i++) {
    const hairMesh = new THREE.Mesh(hairGeometry, hairMaterial);

    // ランダムな方向を生成
    const theta = Math.random() * Math.PI * 2; // ランダムな角度
    const phi = Math.acos(Math.random() * 2 - 1); // ランダムな高さ

    // スフィアの表面上の位置を計算
    const x = 0.5 * Math.sin(phi) * Math.cos(theta);
    const y = 0.5 * Math.sin(phi) * Math.sin(theta);
    const z = 0.5 * Math.cos(phi);

    hairMesh.position.set(x, y, z);

    // ランダムな向きを設定
    const randomOffset = Math.random() * Math.PI * 2; // ランダムなオフセット
    hairMesh.rotation.x = randomOffset;
    hairMesh.rotation.y = randomOffset;

    // スフィアの中心を向かせる
    hairMesh.lookAt(sphere.position); // スフィアの中心を向く

    scene.add(hairMesh);
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(1, 1, 2);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();

const animate = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
};

animate();
