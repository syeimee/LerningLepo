import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';

const buttonVariants = cva(
  'rounded-2xl font-bold transition-all active:scale-95 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'text-white shadow-[0_8px_16px_rgba(33,150,243,0.3)] hover:shadow-[0_12px_24px_rgba(33,150,243,0.4)] hover:-translate-y-0.5',
        secondary: 'text-white shadow-[0_8px_16px_rgba(139,195,74,0.3)] hover:shadow-[0_12px_24px_rgba(139,195,74,0.4)] hover:-translate-y-0.5',
        outline: 'bg-transparent border-4',
        ghost: 'bg-transparent hover:bg-opacity-10',
      },
      size: {
        default: 'min-w-[96px] min-h-[96px] text-[32px] px-6',
        large: 'min-w-[120px] min-h-[120px] text-[40px] px-8',
        small: 'min-w-[80px] min-h-[80px] text-[24px] px-4',
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        className: 'bg-[var(--color-primary-500)] hover:bg-[var(--color-primary-600)]',
      },
      {
        variant: 'secondary',
        className: 'bg-[var(--color-secondary-500)] hover:bg-[var(--color-secondary-600)]',
      },
      {
        variant: 'outline',
        className: 'border-[var(--color-primary-500)] text-[var(--color-primary-500)] hover:bg-[var(--color-primary-50)]',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  soundEffect?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, soundEffect, onClick, children, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Play sound effect if provided
      if (soundEffect) {
        const audio = new Audio(soundEffect);
        audio.play().catch(console.error);
      }
      onClick?.(e);
    };

    return (
      <button
        className={clsx(buttonVariants({ variant, size }), className)}
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
