import * as THREE from "./build/three.module.js";
import { OrbitControls } from "./jsm/controls/OrbitControls.js";//マウス操作用module
import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.19/+esm';//lil.GUI

let scene, camera, renderer, pointLight, controls;//  グローバル変数

window.addEventListener("load",init);
const gui = new GUI();
console.log(gui);


function init() {
    //シーンの追加
    scene = new THREE.Scene();

    //カメラの追加
    camera = new THREE.PerspectiveCamera(
        50,//視野角
        window.innerWidth / window.innerHeight,//アスペクト比（画面内側）
        0.1,//開始距離
        1000//終了距離
    );
    camera.position.set(0, 0, 500);//カメラの位置をz方向に移動

    //レンダラーの追加
    renderer = new THREE.WebGLRenderer({ alpha: true });//alphaは透明度
    renderer.setSize(window.innerWidth, window.innerHeight);//画面全体表示
    renderer.setPixelRatio(window.devicePixelRatio);//テクスチャの画質を改善
    document.body.appendChild(renderer.domElement);//dom追加

    //テクスチャを追加
    let textures = new THREE.TextureLoader().load("./textures/monsterBall.jpg")
    //ジオメトリを作成
    let ballGeometry = new THREE.SphereGeometry(100, 64, 32);//radius widthSegment heightSegment
    let planeGeometry = new THREE.PlaneGeometry(500,500);
    //マテリアルを作成
    let ballMaterial = new THREE.MeshPhysicalMaterial({ map: textures });


    //メッシュ=ジオメトリ＋マテリアル
    let ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
    let planeMesh = new THREE.Mesh(planeGeometry);
    ballMesh.rotation.y = 1.5 * Math.PI;  // 90度回転することで画像の位置を制御 
    planeMesh.rotation.x = -Math.PI*0.5;
    planeMesh.position.y = -100;
    scene.add(ballMesh,planeMesh);//シーンにのせる

    //平行光源を追加
    let directionalLight = new THREE.DirectionalLight(0xffffff, 3);//色、強さ
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    //ポイント光源追加
    pointLight = new THREE.PointLight(0xffffff, 100000);
    pointLight.decay = 1;
    pointLight.power = 10000;
    pointLight.position.set(-200, -200, -200);
    scene.add(pointLight);

    let pointLightHelper = new THREE.PointLightHelper(pointLight, 30);//ポイント光源の位置を調べる
    scene.add(pointLightHelper);

    //マウス操作
    controls = new OrbitControls(camera, renderer.domElement);

    window.addEventListener("resize",onWindowResize);//リサイズ対応
    animate();
    

    //guiデバック設定
    const positionFolder = gui.addFolder("position")//フォルダ名
    positionFolder
        .add(ballMesh.position,"x")
        .min(-3).max(3).step(0.01)
        .name("transformX");
    positionFolder
        .add(ballMesh.rotation,"y")
        .min(0)
        .max(4*Math.PI)
        .step(Math.PI/180)
        .name("rotationY");
    positionFolder
        .add(planeMesh.position,"y")
        .min(-100)
        .max(100)
        .step(0.01)
        .name("transformY");

    gui.add(ballMesh,"visible").name("ballMesh vis");
    gui.add(planeMesh,"visible").name("planeMesh vis");
    
    

}

//ブラウザのリサイズに対応
function onWindowResize(){
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();//リサイズ後に更新させる処理
}




function animate() {
    pointLight.position.set(
        200 * Math.sin(Date.now() / 500),
        200 * Math.sin(Date.now() / 1000),
        200 * Math.cos(Date.now() / 500),
    );
    //フレーム単位でレンダリング
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}






