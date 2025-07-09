import * as THREE from 'three';

/**
 * シーンの初期化
 * @returns THREE.Scene
 */
export const initScene = ():THREE.Scene =>{
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(`white`);
    
    return scene;
}