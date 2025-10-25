'use client';

import * as React from 'react';
import { clsx } from 'clsx';
import Link from 'next/link';

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ className, showBackButton = false, onBackClick, children, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={clsx(
          'fixed top-0 left-0 right-0 z-50',
          'h-20 md:h-24',
          'bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)]',
          'flex items-center justify-between',
          'px-4 md:px-6',
          className
        )}
        {...props}
      >
        {/* Left: Back Button or Logo */}
        <div className="flex items-center gap-4">
          {showBackButton ? (
            <button
              onClick={onBackClick}
              className="min-w-[60px] min-h-[60px] rounded-full bg-[var(--color-gray-200)] hover:bg-[var(--color-gray-300)] active:scale-95 transition-all flex items-center justify-center"
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
          ) : (
            <Link
              href="/"
              className="text-[32px] md:text-[40px] font-black text-[var(--color-primary-500)] hover:scale-105 transition-transform"
            >
              KidsCoding
            </Link>
          )}
        </div>

        {/* Center: Custom Content */}
        {children && (
          <div className="flex-1 flex items-center justify-center">
            {children}
          </div>
        )}

        {/* Right: Settings Button */}
        <button
          className="min-w-[60px] min-h-[60px] rounded-full bg-[var(--color-gray-200)] hover:bg-[var(--color-gray-300)] active:scale-95 transition-all flex items-center justify-center"
          aria-label="設定"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v6m0 6v6m0-18l-3 1.5M12 7L9 8.5M12 13l-3 1.5m6-6l3 1.5M12 13l3 1.5M12 19l3 1.5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
          </svg>
        </button>
      </header>
    );
  }
);

Header.displayName = 'Header';
