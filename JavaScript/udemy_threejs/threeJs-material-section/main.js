import * as THREE from "./build/three.module.js";
import { OrbitControls } from "./controls/OrbitControls.js";

let scene, camera, renderer, pointLight, controls,sphere,sphereMaster,sphereSafari;

window.addEventListener("load", init);

function init() {
  //シーン
  scene = new THREE.Scene();

  //カメラ
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(1, 1, 2);

  //レンダラー
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  document.body.appendChild(renderer.domElement);

  /**
   * マテリアルセクション
   */
  //ジオメトリ
  const sphereGeometory = new THREE.SphereGeometry(0.5,16,16);
  const sphereGeometoryMaster = new THREE.SphereGeometry(0.5,16,16);
  const sphereGeometorySafari = new THREE.SphereGeometry(0.5,16,16);


  //テクスチャ
  const texture = new THREE.TextureLoader().load("./textures/monsterBall.jpg")
  const textureMaster = new THREE.TextureLoader().load("./textures/masterBall.jpg")
  const textureSafari = new THREE.TextureLoader().load("./textures/safariBall.jpg")

  //マテリアル（MeshBasicMaterial）
  // const material = new THREE.MeshBasicMaterial();
  // material.map = texture;
  // material.color.set("yellow"); //colorはクラスなので、set関数を呼び出す必要がある　material.color =  にしない
  // material.wireframe = true;
  // material.side = THREE.DoubleSide;//plateの裏側を見るためのプロパティ
  // material.opacity = 0.5;
  // material.transparent = true;//opacityを有効にする

  //マテリアル（MeshNormalMaterial)
    // const material = new THREE.MeshNormalMaterial();
    // material.flatShading = true;

  //マテリアル（MeshStandardMaterial)
    const material = new THREE.MeshStandardMaterial();
    material.roughness = 0.34;
    material.metalness = 0.64; //金属感
    material.side = THREE.DoubleSide;
    material.map = texture;

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

  //マテリアル（MeshPhongMaterial)

    // const  material = new THREE.MeshPhongMaterial();
    // material.shininess = 100000;
    // material.specular  = new THREE.Color("blue");



  //ライトの追加
  const ambientLight = new THREE.AmbientLight(0xfffffff,0.7);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xfffffff,1);
  pointLight.position.set(1,2,3);
  scene.add(pointLight);

  const pointLightHelper = new THREE.PointLightHelper(pointLight,1);
  scene.add(pointLightHelper);




  //メッシュ化
  sphere = new THREE.Mesh(sphereGeometory,material);
  sphereMaster = new THREE.Mesh(sphereGeometoryMaster,materialMaster);
  sphereSafari = new THREE.Mesh(sphereGeometorySafari,materialSafari);
  scene.add(sphere,sphereMaster,sphereSafari); //addを忘れずに


  sphere.position.x = -1.5;
  sphereMaster.position.x = 1.5;

  //マウス操作
  const controls = new OrbitControls(camera, renderer.domElement);

  window.addEventListener("resize", onWindowResize);

  animate();
}

const clock = new THREE.Clock()
function animate() {
  const elapsedTime = clock.getElapsedTime();

  //オブジェクトを回転させる
  sphere.rotation.x = elapsedTime;
  sphereMaster.rotation.x = elapsedTime;
  sphereSafari.rotation.x = elapsedTime;

  sphere.rotation.y = elapsedTime;
  sphereMaster.rotation.y = elapsedTime;
  sphereSafari.rotation.y = elapsedTime;

  //レンダリング
  renderer.render(scene, camera);
  requestAnimationFrame(animate);

  
}

//ブラウザのリサイズに対応
function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}
