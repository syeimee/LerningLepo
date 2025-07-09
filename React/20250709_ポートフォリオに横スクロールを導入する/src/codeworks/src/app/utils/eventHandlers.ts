import { SLIDE_CONFIG } from "@/constants/common/slideConfig";
import * as THREE from 'three';

export interface EventHandlerParams {
  getTargetPosition: () => number;
  setTargetPosition: (v: number) => void;
  setDistortionFactor: (v: number) => void;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
}

export const createEventHandlers = ({
  getTargetPosition,
  setTargetPosition,
  setDistortionFactor,
  camera,
  renderer
}: EventHandlerParams) => {
  let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
  let touchStartX = 0;
  let touchLastX = 0;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setTargetPosition(getTargetPosition() + SLIDE_CONFIG.unit);
      setDistortionFactor(0.3);
    } else if (e.key === 'ArrowRight') {
      setTargetPosition(getTargetPosition() - SLIDE_CONFIG.unit);
      setDistortionFactor(0.3);
    }
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * SLIDE_CONFIG.wheelSensitivity;
    const distortion = Math.abs(e.deltaY) * 0.001;
    setTargetPosition(getTargetPosition() - delta);
    setDistortionFactor(distortion);

    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {}, 150);
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX = e.touches[0].clientX;
    touchLastX = touchStartX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    const touchX = e.touches[0].clientX;
    const deltaX = touchX - touchLastX;
    touchLastX = touchX;
    setTargetPosition(getTargetPosition() - deltaX * SLIDE_CONFIG.touchSensitivity);
    setDistortionFactor(Math.abs(deltaX) * 0.01);
  };

  const handleTouchEnd = () => {
    const velocity = (touchLastX - touchStartX) * 0.005;
    if (Math.abs(velocity) > 0.5) {
      setDistortionFactor(Math.abs(velocity) * 0.3);
    }
  };

  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  return {
    handleKeyDown,
    handleWheel,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleResize,
  };
};
