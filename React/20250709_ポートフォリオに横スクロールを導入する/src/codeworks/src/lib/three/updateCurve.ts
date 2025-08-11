import { SLIDE_CONFIG } from '@/constants/common/slideConfig';
import * as THREE from 'three';
/**
 * スライドの中央部を湾曲させる処理
 */
export const updateCurve = (
    mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>,
    worldPositionX: number,
    distortionFactor: number
): void => {
    // 1. 湾曲の中心座標（画面中央を基準にするために (0, 0) を指定）
    const distortionCenter: THREE.Vector2 = new THREE.Vector2(0, 0);

    // 2. 湾曲の影響範囲（この半径内の頂点だけが湾曲する）
    const distortionRadius: number = 2.0;

    // 3. distortionFactor（動きの強さ）に応じて最大湾曲量を計算
    const maxCurvature: number = SLIDE_CONFIG.maxDistortion * distortionFactor;

    // 4. スライドのジオメトリ情報を取得
    const positionAttribute: THREE.BufferAttribute = mesh.geometry.attributes.position as THREE.BufferAttribute;

    // 5. スライド生成時に保存しておいた「元の頂点位置」を取得
    const originalVertices: number[] = mesh.userData.originalVertices as number[];

    // 6. 頂点ごとにループして湾曲処理を適用
    for (let i = 0; i < positionAttribute.count; i++) {

        // 6-1. 頂点のX座標（元の状態）
        const x: number = originalVertices[i * 3];

        // 6-2. 頂点のY座標（元の状態）
        const y: number = originalVertices[i * 3 + 1];

        // 6-3. 頂点のワールド座標Xを計算（スライド全体の位置 + 頂点のローカル位置
        const vertexWorldPosition: number = worldPositionX + x;

        // 6-4. 頂点が湾曲中心からどれだけ離れているかを計算
        const distFromCenter: number = Math.sqrt(
            Math.pow(vertexWorldPosition - distortionCenter.x, 2) +
            Math.pow(y - distortionCenter.y, 2)
        );

        // 6-5. 湾曲強度を決定（中心に近いほど強く湾曲、遠いと弱くなる）
        const distortionStrength: number = Math.max(
            0,
            1 - distFromCenter / distortionRadius
        );

        // 6-6. 湾曲量（Z方向の変形量）を計算（sinカーブを使ってなめらかに）
        const curveZ: number =
            Math.pow(Math.sin((distortionStrength * Math.PI) / 2), 1.5) *
            maxCurvature;

        // 6-7. Z座標に湾曲を適用
        positionAttribute.setZ(i, curveZ);
    }

    // 7. 頂点情報を更新したことをThree.jsに伝える（描画を反映させる）
    positionAttribute.needsUpdate = true;

    // 8. 法線ベクトルを再計算（光の反射など見た目に必要な処理）
    mesh.geometry.computeVertexNormals();
};
