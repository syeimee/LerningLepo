// import * as THREE from 'three';
import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';

/**
 * レンダラーの定義
 */
const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,//ギザギザを減らす
    preserveDrawingBuffer: true,//キャンパスの内容を保存
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * シーンを定義
 */
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xe3e3db);

/**
 * カメラを定義
 */
const camera = new THREE.PerspectiveCamera(
    45, //視野角
    window.innerWidth / window.innerHeight,//アスペクト比
    0.1,//みることが出来る最小単位
    100//みることが出来る最大単位
);
camera.position.z = 5; //カメラをz軸の5の位置に置く（手前に引いて全体を見る）

/**
 * 動作設定
 */
const settings = {
    wheelSensitivity: 0.01,//ホイールを動かす速さ
    touchSensitivity: 0.01,//スワイプで動かす速さ
    momentumMultipleier: 2,//スワイプ後の感性の速さ
    smoothing: 0.1,//スライドの動きの滑らかさ
    slideLerp: 0.075,//スライド位置の補完速度
    distortionDecay: 0.95,//歪みの減衰率
    maxDistortion: 2.5,//最大の歪みの強さ
    distortionSensitivity: 0.15,//速さに応じた歪みの増加感度
    distortionSmoothing: 0.075,//歪みの補完
};

/**
 * スライド定義
 */
const slideWidth = 3.0;
const slideHeight = 1.5;
const gap = 0.1;
const slideCount = 5;
const imageCount = 5;
const totalWidth = slideCount * (slideWidth + gap);
const slideUnit = slideWidth + gap;
const slides = [];

/**
 * 状態変数
 */
let currentPosition = 0;
let targetPosition = 0;
let isScrolling = false;
let autoScrollSpeed = 0;
let lastTime = 0;
let touchStartX = 0;
let touchLastX = 0;
let prevPosition = 0;

let currentDistortionFactor = 0;
let targetDistortionFactor = 0;
let peakVelocity = 0;
let velocityHistory = [0, 0, 0, 0, 0];

const correntImageColor = (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
};

/**
 * 一枚のスライドを作成するための関数
 * 
 */
const createSlide = (index) => {
    // 1. スライドの形状（横幅×高さの板）を作成
    //    最後の2つの数値は、分割数（歪ませるために細かく分割）
    const geometry = new THREE.PlaneGeometry(slideWidth, slideHeight, 32, 16);

    // 2. 最初はカラフルな色で塗っておく（画像読み込み前のプレースホルダー）
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FF8C33"];
    const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(colors[index % colors.length]),// indexに応じた色
        side: THREE.DoubleSide,// 表と裏の両面を表示（裏返っても見えるように）
    });
    // 3. 形状とマテリアルを合体させて、1つの描画可能なオブジェクト（メッシュ）に
    const mesh = new THREE.Mesh(geometry, material);

    // 4. 横方向にスライドを並べるために、X座標をずらす
    mesh.position.x = index * (slideWidth + gap);// 1枚ごとに少し空ける

    // 5. スライドの歪み処理用に、元の頂点データを保存
    mesh.userData = {
        originalVertices: [...geometry.attributes.position.array],// 元の位置をコピー
        index,// インデックス番号（後で識別用に使える）
    };

    // 6. 画像のファイル名を決定（例：image1.jpg ～ image5.jpg）
    const imageIndex = (index % imageCount) + 1;
    const imagePath = `./image${imageIndex}.jpg`;

    // 7. テクスチャ（画像）を貼り付ける処理
    new THREE.TextureLoader().load(
        imagePath,

        //成功時の処理
        (texture) => {
            //色が正しく見えるように
            correntImageColor(texture);

            //マテリアルに画像を貼り付け
            material.map = texture;

            //色を白に戻す
            material.color.set(0xffffff);

            //マテリアルを更新するフラグ
            material.needsUpdate = true;

            //アスペクト比を保持して画像を正しくフィットさせる
            const imgAspect = texture.image.width / texture.image.height;//画像のアスペクト比
            const slideAspect = slideWidth / slideHeight;//スライドのアスペクト比

            //画像が横長だったらY軸方向に縮小
            if (imgAspect > slideAspect) {
                mesh.scale.y = slideAspect / imgAspect;
            //画像が縦長だったらX軸方向に縮小
            } else {
                mesh.scale.x = imgAspect / slideAspect;
            }
        },

        //読み込む中はなにもしない
        undefined,

        //読み込みエラーの警告
        (error) => {
            console.warn("Couldn't load image:", error);
        }
    );

    // 8.シーンにadd
    scene.add(mesh);

    // 9.スライド定義の配列slidesに追加
    slides.push(mesh);
};

//スライドの枚数分ループ
for (let i = 0; i < slideCount; i++) {
    createSlide(i);
}

//スライドを中央揃えにする（全長の半分の位置にスライドが来る）
slides.forEach((slide) => {
    slide.position.x -= totalWidth / 2;
    slide.userData.targetX = slide.position.x;
    slide.userData.currentX = slide.position.x;
});


/**
 * スライドの中央部を湾曲させる処理
 */
const updateCurve = (mesh, worldPositionX, distortionFactor) => {
    // 1. 湾曲の中心座標（画面中央を基準にするために (0, 0) を指定）
    const distortionCenter = new THREE.Vector2(0, 0);

    // 2. 湾曲の影響範囲（この半径内の頂点だけが湾曲する）
    const distortionRadius = 2.0;

    // 3. distortionFactor（動きの強さ）に応じて最大湾曲量を計算
    const maxCurvature = settings.maxDistortion * distortionFactor;

    // 4. スライドのジオメトリ情報を取得
    const positionAttribute = mesh.geometry.attributes.position;

    // 5. スライド生成時に保存しておいた「元の頂点位置」を取得
    const originalVertices = mesh.userData.originalVertices;

    // 6. 頂点ごとにループして湾曲処理を適用
    for (let i = 0; i < positionAttribute.count; i++) {

        // 6-1. 頂点のX座標（元の状態）
        const x = originalVertices[i * 3];

        // 6-2. 頂点のY座標（元の状態）
        const y = originalVertices[i * 3 + 1];

        // 6-3. 頂点のワールド座標Xを計算（スライド全体の位置 + 頂点のローカル位置
        const vertexWorldPosition = worldPositionX + x;

        // 6-4. 頂点が湾曲中心からどれだけ離れているかを計算
        const distFromCenter = Math.sqrt(
            Math.pow(vertexWorldPosition - distortionCenter.x, 2) +
            Math.pow(y - distortionCenter.y, 2)
        );

        // 6-5. 湾曲強度を決定（中心に近いほど強く湾曲、遠いと弱くなる）
        const distortionStrength = Math.max(
            0,
            1 - distFromCenter / distortionRadius
        );

        // 6-6. 湾曲量（Z方向の変形量）を計算（sinカーブを使ってなめらかに）
        const curveZ =
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

/**
 * イベントリスナー
 */
//1. キーボード操作：左右矢印キーでスライド移動
window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        // 左キー：左へ1スライド分移動
        targetPosition += slideUnit;
        // 歪みを一時的に大きくする
        targetDistortionFactor = Math.min(1.0, targetDistortionFactor + 0.3);
    } else if (e.key === "ArrowRight") {
        // 右キー：右へ1スライド分移動
        targetPosition -= slideUnit;
        // 歪みを一時的に大きくする
        targetDistortionFactor = Math.min(1.0, targetDistortionFactor + 0.3);
    }
});

//2. マウスホイール操作：スクロールでスライド移動＋歪み効果
window.addEventListener("wheel",(e) => {
        e.preventDefault();// スクロールのデフォルト動作を止める（ページスクロールなど）

        // スクロール量に応じた歪みの強さ（加算）
        const wheelStrength = Math.abs(e.deltaY) * 0.001;
        targetDistortionFactor = Math.min(
            1.0,
            targetDistortionFactor + wheelStrength
        );

        // スライドの移動（スクロールの方向で前後に動く
        targetPosition -= e.deltaY * settings.wheelSensitivity;
        isScrolling = true;

        // 惰性スクロールの初速（放した後にゆっくり止まる）
        autoScrollSpeed =
            Math.min(Math.abs(e.deltaY) * 0.0005, 0.05) * Math.sign(e.deltaY);

        // スクロール停止の判定用タイマー（150ms何もなければ停止とみなす）
        clearTimeout(window.scrollTimeout);
        window.scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 150);
    },
    { passive: false }
);

//3. タッチスタート：指を置いた瞬間の位置を記録
window.addEventListener("touchstart",(e) => {
        touchStartX = e.touches[0].clientX;// 開始位置を記録
        touchLastX = touchStartX;
        isScrolling = false;
    },
    { passive: false }
);

//4. タッチ移動：スライド移動と歪み
window.addEventListener("touchmove",(e) => {
        e.preventDefault();// スクロールを無効にする（スマホでページが動かないように
        const touchX = e.touches[0].clientX;
        const deltaX = touchX - touchLastX;
        touchLastX = touchX;

        // 指の速さに応じた歪み強度を設定
        const touchStrength = Math.abs(deltaX) * 0.02;
        targetDistortionFactor = Math.min(
            1.0,
            targetDistortionFactor + touchStrength
        );

        // 指の移動量に応じてスライドの移動
        targetPosition -= deltaX * settings.touchSensitivity;
        isScrolling = true;
    },
    { passive: false }
);

//5. タッチ終了：勢いを惰性としてスライドを続ける処理
window.addEventListener("touchend", () => {
    const velocity = (touchLastX - touchStartX) * 0.005;
    if (Math.abs(velocity) > 0.5) {
        // 惰性スクロールの速度を計算
        autoScrollSpeed = -velocity * settings.momentumMultipleier * 0.05;

        // 指の勢いに応じて歪みも強める
        targetDistortionFactor = Math.min(
            1.0,
            Math.abs(velocity) * 3 * settings.distortionSensitivity
        );

        isScrolling = true;

        // 惰性終了のタイマー（800ms後にisScrollingをfalseに戻す）
        setTimeout(() => {
            isScrolling = false;
        }, 800);
    }
});

//6. ウィンドウリサイズ時：カメラとレンダラーのサイズを更新
window.addEventListener("resize", () => {
    // カメラのアスペクト比を更新（縦横比が変わるため）
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // レンダラーのサイズも再設定
    renderer.setSize(window.innerWidth, window.innerHeight);
});

/**
 * アニメーションの実行
 *  
 */
const animate = (time) => {
    // 1. 次のフレームで再びこの関数を呼び出す（ループ処理）
    requestAnimationFrame(animate); 

    // 2. 前のフレームからの経過秒数（秒）
    const deltaTime = lastTime ? (time - lastTime) / 1000 : 0.016;

    // 3. 今の時刻を記録（次回のdeltaTime計算用）
    lastTime = time; 

    // 4. 前の位置を記録
    const prevPos = currentPosition; 

    // 5. 現在位置を目標位置に向かって少しずつ補間（スムーズな動きに）
    currentPosition += (targetPosition - currentPosition) * settings.smoothing;

    // 6. 現在の速度（＝フレーム間の移動距離 ÷ 時間）を計算
    const currentVelocity = Math.abs(currentPosition - prevPos) / deltaTime;

    // 7. 速度の履歴を更新（最新の速度を追加、古いのを削除）
    velocityHistory.push(currentVelocity);
    velocityHistory.shift();

    // 8. 平均速度を計算（滑らかさを保つため）
    const avgVelocity =
        velocityHistory.reduce((sum, val) => sum + val, 0) / velocityHistory.length;

    // 9. 平均速度が今までの最大速度を超えたら更新
    if (avgVelocity > peakVelocity) {
        peakVelocity = avgVelocity;
    }

    // 10. 減速しているか判定（加速→停止の途中かどうか）
    const velocityRatio = avgVelocity / (peakVelocity + 0.001);
    const isDecelerating = velocityRatio < 0.7 && peakVelocity > 0.5;

    // 11. 最大速度を少しずつ減衰させる（時間経過でリセットしていく）
    peakVelocity *= 0.99;

    // 12. 移動速度に応じた歪みの強さを計算（0〜1の範囲）
    const movementDistortion = Math.min(1.0, currentVelocity * 0.1);
    if (currentVelocity > 0.05) {
        targetDistortionFactor = Math.max(
            targetDistortionFactor,
            movementDistortion
        );
    }

    // 13. 減速中または停止に近づいている場合、歪みを徐々に弱める
    if (isDecelerating || avgVelocity < 0.2) {
        const decayRate = isDecelerating
            ? settings.distortionDecay
            : settings.distortionDecay * 0.9;
        targetDistortionFactor *= decayRate;
    }

    // 14. 実際に適用する歪み量を少しずつ補間してスムーズに変化させる
    currentDistortionFactor +=
        (targetDistortionFactor - currentDistortionFactor) *
        settings.distortionSmoothing;

    // 15. 全スライドの位置とカーブ（歪み）を更新
    slides.forEach((slide, i) => {
        // a. 各スライドの位置を現在のスクロール位置に応じて計算
        let baseX = i * slideUnit - currentPosition;

        // b. スライドが画面の外に出てもループ表示させる（ラップ処理）
        baseX = ((baseX % totalWidth) + totalWidth) % totalWidth;
        if (baseX > totalWidth / 2) {
            baseX -= totalWidth;
        }

        // c. 位置のラップ処理が必要かどうかを判定
        const isWrapping = Math.abs(baseX - slide.userData.targetX) > slideWidth * 2;
        if (isWrapping) {
            slide.userData.currentX = baseX;
        }

        // d. 目標位置に向かってスライドをなめらかに移動させる
        slide.userData.targetX = baseX;
        slide.userData.currentX +=
            (slide.userData.targetX - slide.userData.currentX) * settings.slideLerp;

        // e. スライドが表示範囲内であれば、位置とカーブ（歪み）を更新
        const wrapThreshold = totalWidth / 2 + slideWidth;
        if (Math.abs(slide.userData.currentX) < wrapThreshold * 1.5) {
            slide.position.x = slide.userData.currentX;
            updateCurve(slide, slide.position.x, currentDistortionFactor);
        }
    });

    // 16. 画面を描画（レンダリング）する
    renderer.render(scene, camera);
};

animate();
