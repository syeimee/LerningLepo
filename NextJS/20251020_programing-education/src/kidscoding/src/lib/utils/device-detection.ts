/**
 * Device detection utilities for performance optimization
 * Especially important for Amazon Fire Tablet support
 */

export type PerformanceLevel = 'high' | 'medium' | 'low';

/**
 * Detect if the device is an Amazon Fire Tablet
 */
export function isFireTablet(): boolean {
  if (typeof window === 'undefined') return false;

  const ua = navigator.userAgent.toLowerCase();
  return ua.includes('silk') || ua.includes('kindle fire');
}

/**
 * Get device performance level for rendering optimization
 * - high: Desktop, high-end tablets (shadows, antialiasing, high resolution)
 * - medium: Standard tablets (shadows, antialiasing, standard resolution)
 * - low: Fire tablets, low-end devices (no shadows, no antialiasing, low resolution)
 */
export function getDevicePerformanceLevel(): PerformanceLevel {
  if (typeof window === 'undefined') return 'high';

  const ua = navigator.userAgent.toLowerCase();

  // Fire tablets = low performance mode
  if (isFireTablet()) {
    return 'low';
  }

  // Check if mobile/tablet
  const isMobile = /mobile|tablet|android|ipad/i.test(ua);

  // Check available RAM (if supported)
  const deviceMemory = (navigator as { deviceMemory?: number }).deviceMemory;
  const hasHighRAM = deviceMemory && deviceMemory >= 4;

  // Mobile/tablet without high RAM = medium
  if (isMobile && !hasHighRAM) {
    return 'medium';
  }

  // Desktop or high-end mobile = high
  return 'high';
}

/**
 * Get rendering settings based on performance level
 */
export function getRenderingSettings(performanceLevel: PerformanceLevel) {
  const settings = {
    high: {
      shadows: true,
      antialias: true,
      pixelRatio: typeof window !== 'undefined'
        ? Math.min(window.devicePixelRatio, 2)
        : 1,
      toneMapping: true,
      environmentMap: true,
    },
    medium: {
      shadows: true,
      antialias: true,
      pixelRatio: 1,
      toneMapping: false,
      environmentMap: false,
    },
    low: {
      shadows: false,        // Fire tablets: disable shadows
      antialias: false,      // Fire tablets: disable antialiasing
      pixelRatio: 1,         // Fire tablets: lower resolution
      toneMapping: false,
      environmentMap: false,
    },
  };

  return settings[performanceLevel];
}

/**
 * Initialize Fire Tablet specific optimizations
 */
export function initFireTabletOptimizations(): void {
  if (!isFireTablet()) return;

  // Optimize touch events for better performance
  if (typeof document !== 'undefined') {
    document.addEventListener('touchstart', () => {}, { passive: true });
    document.addEventListener('touchmove', () => {}, { passive: true });
  }

  // Disable smooth scrolling for better performance
  if (typeof document !== 'undefined') {
    document.documentElement.style.scrollBehavior = 'auto';
  }

  // Optimize viewport settings
  if (typeof document !== 'undefined') {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute(
        'content',
        'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
      );
    }
  }

  console.log('🔥 Fire Tablet optimizations enabled');
}
