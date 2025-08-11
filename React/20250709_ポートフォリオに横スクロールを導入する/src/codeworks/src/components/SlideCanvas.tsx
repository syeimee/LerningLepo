'use client'
import { SLIDE_CONFIG } from '@/constants/common/slideConfig';
import { createCamera } from '@/lib/three/createCamera';
import { createSlides } from '@/lib/three/createSlides';
import { initRenderer } from '@/lib/three/initRenderer';
import { initScene } from '@/lib/three/initScene';
import { updateCurve } from '@/lib/three/updateCurve';
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';


const SLIDE_COUNT = 5;
const SLIDE_WIDTH = 3.0;
const SLIDE_HEIGHT = 1.5;
const GAP = 0.1;
const TOTAL_WIDTH = SLIDE_COUNT * (SLIDE_WIDTH + GAP);
const SLIDE_UNIT = SLIDE_WIDTH + GAP;

type SlideCanvasProps = {
  onSlideClick?: (index: number) => void;
  currentIdx: number
  setCurrentIdx: (index: number) => void
};
export const SlideCanvas: React.FC<SlideCanvasProps> = ({ onSlideClick, currentIdx, setCurrentIdx }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetPositionRef = useRef(0);
  const targetDistortionFactorRef = useRef(0);

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

    /**
     * イベントリスナー(ここはeventHandlers.tsに切り出したい)
     */
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

    //モーダル関係　ここから
    // --- Raycasterでスライドクリック検出 ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (event: MouseEvent) => {
      if (!camera) return;

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(slides);

      if (intersects.length > 0 && onSlideClick) {
        const clickedSlide = intersects[0].object;
        const index = clickedSlide.userData.index;
        onSlideClick(index);
      }
    };

    canvasRef.current.addEventListener('click', handleClick);

    //モーダル関係　ここまで


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

      currentPosition += (targetPositionRef.current - currentPosition) * SLIDE_CONFIG.smoothing;

      // 5. 現在位置を目標位置に向かって少しずつ補間（スムーズな動きに）
      currentPosition += (targetPosition - currentPosition) * SLIDE_CONFIG.smoothing;


      let rawIndex = Math.round(currentPosition / SLIDE_CONFIG.unit);
      let normalizedIndex = (rawIndex % SLIDE_CONFIG.slideCount + SLIDE_CONFIG.slideCount) % SLIDE_CONFIG.slideCount;

      setCurrentIdx(normalizedIndex + 1);

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

  const handlePrev = () => {
    targetPositionRef.current -= SLIDE_CONFIG.unit * 2;
    targetDistortionFactorRef.current = Math.min(1.0, targetDistortionFactorRef.current + 0.3);

  };

  const handleNext = () => {
    targetPositionRef.current += SLIDE_CONFIG.unit * 2;
    targetDistortionFactorRef.current = Math.min(1.0, targetDistortionFactorRef.current + 0.3);

  };
  return (
    <div
      style={{
        width: '100vw',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
        position: 'relative',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />

      <p
        className="absolute bottom-5 flex items-center justify-center text-xl tracking-wide text-black gap-2"
      >
        <button onClick={handlePrev}>
          <ChevronLeftIcon className="w-5 h-5" />
        </button>        <span className="tabular-nums">
          {String(currentIdx).padStart(2, '0')} / {String(SLIDE_CONFIG.slideCount).padStart(2, '0')}
        </span>
        <button onClick={handleNext}>
          <ChevronRightIcon className="w-5 h-5" />
        </button>      
      </p>
    </div>
  );



};