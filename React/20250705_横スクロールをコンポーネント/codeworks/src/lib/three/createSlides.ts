import { SLIDE_CONFIG } from '@/constants/common/slideConfig';
import * as THREE from 'three';

/**
 * 描画するスライドを作成するメソッド
 * @param scene THREE.Scene
 * @returns THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>[]
 */
export const createSlides = (
  scene: THREE.Scene
): THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>[] => {

  // 1. テクスチャの色を正しく補正する関数
  const correntImageColor = (texture: THREE.Texture): THREE.Texture => {
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  };

  // 2. スライド配列を用意
  const slides: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>[] = [];

  // 3. スライド数分ループ
  for (let i = 0; i < SLIDE_CONFIG.slideCount; i++) {
    // 4. スライドのジオメトリ（平面）を作成
    const geometry = new THREE.PlaneGeometry(
      SLIDE_CONFIG.slideWidth,
      SLIDE_CONFIG.slideHeight,
      32,
      16
    );

    // 5. スライドマテリアルを作成
    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
    });

    // 6. メッシュ（ジオメトリ＋マテリアル）を作成
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = i * SLIDE_CONFIG.unit;

    // 7. ユーザーデータに補間用の初期位置などを格納
    mesh.userData = {
      originalVertices: Array.from(geometry.attributes.position.array),
      index: i,
      targetX: 0,
      currentX: 0,
    };

    // 8. 画像ファイルのパスを決定
    const imageIndex = (i % SLIDE_CONFIG.imageCount) + 1;
    const imagePath = `/images/image${imageIndex}.jpg`;

    // 9. テクスチャを読み込み、成功時にマテリアルへ適用
    new THREE.TextureLoader().load(
      imagePath,

      // 10. 読み込み成功時の処理
      (texture) => {
        // 10-1. カラースペース補正
        correntImageColor(texture);

        // 10-2. マテリアルにテクスチャを設定
        material.map = texture;
        material.color.set(0xffffff); // 色を白に戻す
        material.needsUpdate = true;

        // 10-3. アスペクト比に応じてスライドの拡縮
        const imgAspect = texture.image.width / texture.image.height;
        const slideAspect =
          SLIDE_CONFIG.slideWidth / SLIDE_CONFIG.slideHeight;

        if (imgAspect > slideAspect) {
          mesh.scale.y = slideAspect / imgAspect; // 横長 → Y方向に縮小
        } else {
          mesh.scale.x = imgAspect / slideAspect; // 縦長 → X方向に縮小
        }
      },

      // 11. ローディング中（特に何もしない）
      undefined,

      // 12. 読み込み失敗時のログ
      (error) => {
        console.warn("Couldn't load image:", error);
      }
    );

    
    // 13. シーンにスライドを追加
    scene.add(mesh);
    slides.push(mesh);
  }

  // 14. スライドのX座標を中央揃えになるように調整
  slides.forEach((slide) => {
    slide.position.x -= SLIDE_CONFIG.totalWidth / 2;
    slide.userData.targetX = slide.position.x;
    slide.userData.currentX = slide.position.x;
  });

  // 15. 完成したスライド配列を返す
  return slides;
};
