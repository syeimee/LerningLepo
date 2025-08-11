import * as THREE from 'three';

/**
 * Three.jsの初期化メソッド
 * @param canvas TMLCanvasElement
 * @param width number
 * @param height number
 * @returns THREE.WebGLRenderer
 */
export const initRenderer = (canvas: HTMLCanvasElement, width:number, height:number): THREE.WebGLRenderer => {
    // 1. Three.jsのWebGLレンダラーを作成（canvas要素を指定）
    const renderer = new THREE.WebGLRenderer({
        canvas,                // 描画先のcanvas
        antialias: true,       // ギザギザを減らす
        preserveDrawingBuffer: true, // 描画内容を保持（スクショ用途など。不要ならfalseでOK）
    });

    // 2. ディスプレイの解像度に合わせてピクセル比を設定（高解像度対応）
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 3. ウィンドウサイズに合わせてレンダラーのサイズを設定
    renderer.setSize(width, height);

    // 4. 作成したrendererを返す
    return renderer;
}