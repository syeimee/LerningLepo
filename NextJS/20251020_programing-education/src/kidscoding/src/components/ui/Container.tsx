import * as React from 'react';
import { clsx } from 'clsx';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const maxWidthClasses = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-[1200px]',
  full: 'max-w-full',
};

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, maxWidth = 'xl', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'mx-auto px-4 md:px-6 lg:px-8',
          maxWidthClasses[maxWidth],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';
