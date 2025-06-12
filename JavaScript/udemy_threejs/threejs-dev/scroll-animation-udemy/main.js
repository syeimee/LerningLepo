import './style.css'
import * as THREE from "three"

// console.log(THREE);

//canvas
const canvas = document.querySelector("#webgl");

//シーン
const scene = new THREE.Scene();
//背景用のテクスチャ
const textureLoader = new THREE.TextureLoader();
const bgTexture = textureLoader.load("bg/bg.jpg");
scene.background = bgTexture;//背景に追加する場合はbaclgrounde

//サイズ
const sizes = {
  width: innerWidth,
  height: innerHeight
}
//カメラ
const camera = new THREE.PerspectiveCamera(
  75,//視野角
  sizes.width / sizes.height,//アスペクト比
  0.1,//near
  1000//far
)
//レンダラー
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);

//オブジェクト
const boxGeometory = new THREE.BoxGeometry(5, 5, 5, 10);
const boxMaterial = new THREE.MeshNormalMaterial();
const box = new THREE.Mesh(boxGeometory, boxMaterial);
box.position.set(0, 0.5, -15);//カメラに映すための位置調整
box.rotation.set(1, 1, 0);

const torusGeometory = new THREE.TorusGeometry(9, 2, 16, 100);
const torusMaterial = new THREE.MeshNormalMaterial();
const torus = new THREE.Mesh(torusGeometory, torusMaterial);
torus.position.set(0, 1, 10);


scene.add(box, torus);

//1次線形補間で滑らかに移動させる
function lerp(x, y, a) {
  return (1 - a) * x + a * y;
};
function scalePercent(start, end) {
  return ((scrollPercent - start) / (end - start))// 各アニメーション区間における位置を表す
};


//スクロールアニメーション
// イメージは、アニメーション用配列を用意する
// 画面のスクロール位置に応じて、配列を切り替える
const animationScripts = [];
animationScripts.push({
  start: 0,
  end: 40,
  function() {
    camera.lookAt(box.position);
    camera.position.set(0, 1, 10);
    box.position.z = lerp(-15, 2, scalePercent(0, 40));
    torus.position.z = lerp(10, -20, scalePercent(0, 40));
  },
});
animationScripts.push({
  start: 40,
  end: 60,
  function() {
    camera.lookAt(box.position);
    camera.position.set(0, 1, 10);
    box.rotation.z = lerp(1, Math.PI, scalePercent(40, 60));
  },
});
animationScripts.push({
  start: 60,
  end: 80,
  function() {
    camera.lookAt(box.position);
    camera.position.x = lerp(0, -15, scalePercent(60, 80));
    camera.position.y = lerp(1, 15, scalePercent(60, 80));
    camera.position.z = lerp(10, 25, scalePercent(60, 80));
  },
});
animationScripts.push({
  start: 80,
  end: 100,
  function() {
    camera.lookAt(box.position);
    box.rotation.x += 0.02;
    box.rotation.y += 0.02;
  },
});



//スクロール率に応じてアニメーションの挙動を変更
function playScrollAnimation() {
  animationScripts.forEach((animation) => {
    if (scrollPercent >= animation.start && scrollPercent <= animation.end) {
      animation.function();
    }
  });
};

//ブラウザのスクロール率を取得
let scrollPercent = 0;
document.body.onscroll = () => {
  //console.log("scroll");
  scrollPercent = Math.floor(document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100);
  console.log(scrollPercent);
}


//アニメーション
const animation = () => {
  window.requestAnimationFrame(animation);
  playScrollAnimation();
  renderer.render(scene, camera);
}

animation();