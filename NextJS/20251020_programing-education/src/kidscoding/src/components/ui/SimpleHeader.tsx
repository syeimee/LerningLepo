'use client';

import * as React from 'react';
import { useState, useRef } from 'react';
import { clsx } from 'clsx';
import Link from 'next/link';

export interface SimpleHeaderProps extends React.HTMLAttributes<HTMLElement> {
  showBackButton?: boolean;
  onBackClick?: () => void;
  rightButton?: React.ReactNode;
}

export const SimpleHeader = React.forwardRef<HTMLElement, SimpleHeaderProps>(
  ({ className, showBackButton = false, onBackClick, rightButton, ...props }, ref) => {
    const [showParentMenu, setShowParentMenu] = useState(false);
    const pressTimer = useRef<NodeJS.Timeout | null>(null);

    const handleLogoMouseDown = () => {
      // Long press: 1 second
      pressTimer.current = setTimeout(() => {
        setShowParentMenu(true);
      }, 1000);
    };

    const handleLogoMouseUp = () => {
      if (pressTimer.current) {
        clearTimeout(pressTimer.current);
      }
    };

    const handleLogoClick = () => {
      if (pressTimer.current) {
        clearTimeout(pressTimer.current);
      }
    };

    return (
      <>
        <header
          ref={ref}
          className={clsx(
            'fixed top-0 left-0 right-0 z-50',
            'h-16 md:h-20',
            'bg-white/80 backdrop-blur-sm',
            'flex items-center justify-center',
            'px-4',
            className
          )}
          {...props}
        >
          {/* Back Button (if needed) */}
          {showBackButton && (
            <button
              onClick={onBackClick}
              className="absolute left-4 min-w-[60px] min-h-[60px] rounded-full bg-[var(--color-gray-200)] hover:bg-[var(--color-gray-300)] active:scale-95 transition-all flex items-center justify-center"
              aria-label="戻る"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Simple Logo - Long press for parent menu */}
          <Link
            href="/"
            className="text-[28px] md:text-[36px] font-black text-[var(--color-primary-500)] select-none"
            onMouseDown={handleLogoMouseDown}
            onMouseUp={handleLogoMouseUp}
            onMouseLeave={handleLogoMouseUp}
            onTouchStart={handleLogoMouseDown}
            onTouchEnd={handleLogoMouseUp}
            onClick={handleLogoClick}
          >
            KidsCoding
          </Link>

          {/* Right Button (if provided) */}
          {rightButton && (
            <div className="absolute right-4">
              {rightButton}
            </div>
          )}
        </header>

        {/* Parent Menu Modal */}
        {showParentMenu && (
          <div
            className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center"
            onClick={() => setShowParentMenu(false)}
          >
            <div
              className="bg-white rounded-[32px] p-8 max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-[32px] font-bold text-[var(--color-gray-800)] mb-6 text-center">
                保護者メニュー
              </h2>

              <div className="space-y-4">
                <button className="w-full min-h-[80px] bg-[var(--color-primary-500)] text-white rounded-2xl text-[24px] font-bold hover:bg-[var(--color-primary-600)] active:scale-95 transition-all">
                  進捗を見る
                </button>

                <button className="w-full min-h-[80px] bg-[var(--color-gray-600)] text-white rounded-2xl text-[24px] font-bold hover:bg-[var(--color-gray-700)] active:scale-95 transition-all">
                  設定
                </button>

                <button
                  onClick={() => setShowParentMenu(false)}
                  className="w-full min-h-[80px] bg-[var(--color-gray-200)] text-[var(--color-gray-800)] rounded-2xl text-[24px] font-bold hover:bg-[var(--color-gray-300)] active:scale-95 transition-all"
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
);

SimpleHeader.displayName = 'SimpleHeader';
