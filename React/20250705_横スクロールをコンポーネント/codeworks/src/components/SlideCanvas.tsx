'use client'
import { SLIDE_CONFIG } from '@/constants/common/slideConfig';
import { createCamera } from '@/lib/three/createCamera';
import { createSlides } from '@/lib/three/createSlides';
import { initRenderer } from '@/lib/three/initRenderer';
import { initScene } from '@/lib/three/initScene';
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const SLIDE_COUNT = 5;
const SLIDE_WIDTH = 3.0;
const SLIDE_HEIGHT = 1.5;
const GAP = 0.1;
const TOTAL_WIDTH = SLIDE_COUNT * (SLIDE_WIDTH + GAP);
const SLIDE_UNIT = SLIDE_WIDTH + GAP;

export const SlideCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    //親要素の幅・高さに合わせる
    const parent = canvasRef.current ? canvasRef.current.parentElement : null;
    if (!canvasRef.current || !parent) return;
    const width = parent.clientWidth;
    const height = parent.clientHeight;

    //1 Threejsを初期化
    const renderer = initRenderer(canvasRef.current, width, height);

    //2 sceneを初期化
    const scene = initScene();

    //3 cameraを作成
    const camera = createCamera();

    //4 スライドを作成
    const slides = createSlides(scene);

    /**
     * スライドの中央部を湾曲させる処理
     */
    const updateCurve = (
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

    // --- 状態変数 ---
    let currentPosition = 0;
    let targetPosition = 0;
    let isScrolling = false;
    let autoScrollSpeed = 0;
    let lastTime = 0;
    let touchStartX = 0;
    let touchLastX = 0;
    let currentDistortionFactor = 0;
    let targetDistortionFactor = 0;
    let peakVelocity = 0;
    let velocityHistory = [0, 0, 0, 0, 0];
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

    // --- イベントリスナー登録 ---
    // 例: window.addEventListener('keydown', ...);
    /**
     * イベントリスナー
     */
    // --- イベントリスナー関数を定義 ---
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        targetPosition += SLIDE_CONFIG.unit;
        targetDistortionFactor = Math.min(1.0, targetDistortionFactor + 0.3);
      } else if (e.key === "ArrowRight") {
        targetPosition -= SLIDE_CONFIG.unit;
        targetDistortionFactor = Math.min(1.0, targetDistortionFactor + 0.3);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const wheelStrength = Math.abs(e.deltaY) * 0.001;
      targetDistortionFactor = Math.min(1.0, targetDistortionFactor + wheelStrength);
      targetPosition -= e.deltaY * SLIDE_CONFIG.wheelSensitivity;
      isScrolling = true;
      autoScrollSpeed = Math.min(Math.abs(e.deltaY) * 0.0005, 0.05) * Math.sign(e.deltaY);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 150);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchLastX = touchStartX;
      isScrolling = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touchX = e.touches[0].clientX;
      const deltaX = touchX - touchLastX;
      touchLastX = touchX;
      const touchStrength = Math.abs(deltaX) * 0.02;
      targetDistortionFactor = Math.min(1.0, targetDistortionFactor + touchStrength);
      targetPosition -= deltaX * SLIDE_CONFIG.touchSensitivity;
      isScrolling = true;
    };

    const handleTouchEnd = () => {
      const velocity = (touchLastX - touchStartX) * 0.005;
      if (Math.abs(velocity) > 0.5) {
        autoScrollSpeed = -velocity * SLIDE_CONFIG.momentumMultipleier * 0.05;
        targetDistortionFactor = Math.min(
          1.0,
          Math.abs(velocity) * 3 * SLIDE_CONFIG.distortionSensitivity
        );
        isScrolling = true;
        setTimeout(() => {
          isScrolling = false;
        }, 800);
      }
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // --- イベントリスナー登録 ---
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("resize", handleResize);


    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modalContent");
    const closeModalBtn = document.getElementById("closeModal");
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();



    // --- アニメーション ---
    const animate = (time: number) => {
      // 1. 次のフレームで再びこの関数を呼び出す（ループ処理）
      requestAnimationFrame(animate);

      // 2. 前のフレームからの経過秒数（秒）
      const deltaTime = lastTime ? (time - lastTime) / 1000 : 0.016;

      // 3. 今の時刻を記録（次回のdeltaTime計算用）
      lastTime = time;

      // 4. 前の位置を記録
      const prevPos = currentPosition;

      // 5. 現在位置を目標位置に向かって少しずつ補間（スムーズな動きに）
      currentPosition += (targetPosition - currentPosition) * SLIDE_CONFIG.smoothing;

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
          ? SLIDE_CONFIG.distortionDecay
          : SLIDE_CONFIG.distortionDecay * 0.9;
        targetDistortionFactor *= decayRate;
      }

      // 14. 実際に適用する歪み量を少しずつ補間してスムーズに変化させる
      currentDistortionFactor +=
        (targetDistortionFactor - currentDistortionFactor) *
        SLIDE_CONFIG.distortionSmoothing;

      // 15. 全スライドの位置とカーブ（歪み）を更新
      slides.forEach((slide, i) => {
        // a. 各スライドの位置を現在のスクロール位置に応じて計算
        let baseX = i * SLIDE_CONFIG.unit - currentPosition;

        // b. スライドが画面の外に出てもループ表示させる（ラップ処理）
        baseX = ((baseX % SLIDE_CONFIG.totalWidth) + SLIDE_CONFIG.totalWidth) % SLIDE_CONFIG.totalWidth;
        if (baseX > SLIDE_CONFIG.totalWidth / 2) {
          baseX -= SLIDE_CONFIG.totalWidth;
        }

        // c. 位置のラップ処理が必要かどうかを判定
        const isWrapping = Math.abs(baseX - slide.userData.targetX) > SLIDE_CONFIG.slideWidth * 2;
        if (isWrapping) {
          slide.userData.currentX = baseX;
        }

        // d. 目標位置に向かってスライドをなめらかに移動させる
        slide.userData.targetX = baseX;
        slide.userData.currentX +=
          (slide.userData.targetX - slide.userData.currentX) * SLIDE_CONFIG.slideLerp;

        // e. スライドが表示範囲内であれば、位置とカーブ（歪み）を更新
        const wrapThreshold = SLIDE_CONFIG.totalWidth / 2 + SLIDE_CONFIG.slideWidth;
        if (Math.abs(slide.userData.currentX) < wrapThreshold * 1.5) {
          slide.position.x = slide.userData.currentX;
          updateCurve(slide, slide.position.x, currentDistortionFactor);
        }
      });

      // 16. 画面を描画（レンダリング）する
      renderer.render(scene, camera);
    };
    animate(0);

    // --- クリーンアップ ---
    return () => {
      slides.forEach((slide) => {
        scene.remove(slide);
        if (slide.material instanceof THREE.Material) {
          slide.material.dispose();
        }
        if (slide.geometry instanceof THREE.BufferGeometry) {
          slide.geometry.dispose();
        }
      });
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100vw', height: '100vh', display: 'block' }} />;
};