import './style.css'
import * as THREE from "three";
import * as dat from "lil-gui";

//UIデバックの実装
const gui = new dat.GUI();

//キャンバスの取得
const canvas = document.querySelector(".webgl");

//シーン
const scene = new THREE.Scene();

//サイズ設定
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}


//カメラ
const camera = new THREE.PerspectiveCamera(
  35,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 6;
scene.add(camera);

//レンダラー
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);

//テクスチャ
const textureMonster = new THREE.TextureLoader().load("./textures/monsterBall.jpg")
const textureMaster = new THREE.TextureLoader().load("./textures/masterBall.jpg")
const textureSafari = new THREE.TextureLoader().load("./textures/safariBall.jpg")


//オブジェクトの作成（マテリアル）
const materialMonster = new THREE.MeshStandardMaterial();
materialMonster.roughness = 0.34;
materialMonster.metalness = 0.64; //金属感
materialMonster.side = THREE.DoubleSide;
materialMonster.map = textureMonster;

const materialMaster = new THREE.MeshStandardMaterial();
materialMaster.roughness = 0.34;
materialMaster.metalness = 0.64; //金属感
materialMaster.side = THREE.DoubleSide;
materialMaster.map = textureMaster;

const materialSafari = new THREE.MeshStandardMaterial();
materialSafari.roughness = 0.34;
materialSafari.metalness = 0.64; //金属感
materialSafari.side = THREE.DoubleSide;
materialSafari.map = textureSafari;

gui.addColor(materialMonster,"color");
gui.addColor(materialMaster,"color");
gui.addColor(materialSafari,"color");
gui.add(materialMonster,"metalness").min(0).max(1).step(0.001);
gui.add(materialMaster,"metalness").min(0).max(1).step(0.001);
gui.add(materialSafari,"metalness").min(0).max(1).step(0.001);
gui.add(materialMonster,"roughness").min(0).max(1).step(0.001);
gui.add(materialMaster,"roughness").min(0).max(1).step(0.001);
gui.add(materialSafari,"roughness").min(0).max(1).step(0.001);

//メッシュ
const meshMonster = new THREE.Mesh(new THREE.SphereGeometry(0.7,16,16), materialMonster);
const meshMaster = new THREE.Mesh(new THREE.SphereGeometry(0.7,16,16), materialMaster);
const meshSafari = new THREE.Mesh(new THREE.SphereGeometry(0.7,16,16), materialSafari);

//回転用に配置
meshMonster.position.set(2, 0, 0);
meshMaster.position.set(2, 0, 0);
meshSafari .position.set(2, 0, -6);



scene.add(meshMaster,meshMonster,meshSafari);
const meshes =[meshMaster,meshMonster,meshSafari];

//パーティクル追加
const particleGeometory = new THREE.BufferGeometry();
const particleCount = 700;

const positionArray = new Float32Array(particleCount *3);
//ライトを追加
const ambientLight = new THREE.AmbientLight(0xfffffff,0.7);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight("#ffffff", 4);
directionalLight.position.set(0.5, 1, 0);
scene.add(directionalLight);
//ブラウザのリサイズ操作
window.addEventListener("resize", () => {
  //サイズをアップデート
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  //カメラアップデート
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  //レンダラーのアップデート
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(window.devicePixelRatio);
})

//ホイールの実装
let speed = 0;
let rotation = 0;
window.addEventListener("wheel",(event) => {
  speed += event.deltaY*0.0002;
})

function rot() {
  rotation += speed;
  speed *= 0.93;
  //ジオメトリ全体回転させる。
  meshMonster.position.x = 2 + 3.8 * Math.cos(rotation);
  meshMonster.position.z = -3 + 3.8 * Math.sin(rotation);

  meshMaster.position.x = 2 + 3.8 * Math.cos(rotation+Math.PI/2);
  meshMaster.position.z = -3 + 3.8 * Math.sin(rotation+Math.PI/2);

  meshSafari.position.x = 2 + 3.8 * Math.cos(rotation+3*(Math.PI));
  meshSafari.position.z = -3 + 3.8 * Math.sin(rotation+3*(Math.PI));



  window.requestAnimationFrame(rot);
}


rot();

//カーソルの位置を取得
const cursor ={};
cursor.x = 0;
cursor.y = 0;

window.addEventListener("mousemove",(event) => {
  cursor.x = event.clientX / sizes.width -0.5;
  cursor.y = event.clientY / sizes.height -0.5;
})



//アニメーション
const clock = new THREE.Clock();//デバイス間での動くたいみんぐ考慮

const animate = () => {
  renderer.render(scene, camera);
  let getDeltaTime = clock.getDelta();

  //meshを回転させる
  for(const mesh of meshes){
    mesh.rotation.x += 0.1 * getDeltaTime;
    mesh.rotation.y += 0.12* getDeltaTime;
  }

//カメラの制御
// camera.position.x += cursor.x * getDeltaTime *3;
// camera.position.y += -cursor.y * getDeltaTime *3;

  window.requestAnimationFrame(animate);
};

animate();





