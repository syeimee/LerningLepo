import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';

const cardVariants = cva(
  'bg-white rounded-[32px] transition-all',
  {
    variants: {
      variant: {
        default: 'shadow-[0_4px_16px_rgba(0,0,0,0.08)]',
        elevated: 'shadow-[0_8px_32px_rgba(0,0,0,0.12)]',
        stage: 'border-[6px] border-[var(--color-gray-200)] hover:border-[var(--color-primary-500)] hover:-translate-y-1',
        completed: 'border-[6px] border-[var(--color-secondary-500)]',
      },
      padding: {
        none: 'p-0',
        small: 'p-4',
        default: 'p-6',
        large: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'default',
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(cardVariants({ variant, padding }), className)}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx('flex flex-col space-y-1.5', className)}
    {...props}
  />
));

CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={clsx('text-[40px] font-bold leading-none tracking-tight', className)}
    {...props}
  />
));

CardTitle.displayName = 'CardTitle';

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={clsx('pt-0', className)} {...props} />
));

CardContent.displayName = 'CardContent';
