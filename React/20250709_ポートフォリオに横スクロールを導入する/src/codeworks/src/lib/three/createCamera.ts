import * as THREE from 'three';

/**
 * Three.jsの遠近法カメラを作成する関数
 * @returns THREE.PerspectiveCamera
 */
export const createCamera = (): THREE.PerspectiveCamera =>{
    // 1. 遠近法カメラを生成（視野角45度、アスペクト比は画面サイズ、描画範囲0.1〜100）
    const camera = new THREE.PerspectiveCamera(
      45,// 視野角（度数、カメラの上下の広がり）
      window.innerWidth / window.innerHeight,// アスペクト比（画面の横幅÷縦幅）
      0.1,// カメラから描画できる最も近い距離
      100 // カメラから描画できる最も遠い距離
    );
    // 2. カメラをz=5の位置に配置（シーン全体が見やすい位）
    camera.position.z = 5;
    
    // 3. カメラを返す
    return camera;
}