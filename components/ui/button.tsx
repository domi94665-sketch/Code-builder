'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/cn';

type ButtonVariant = 'primary' | 'outline' | 'ghost';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-brand-accent text-white hover:bg-indigo-500',
  outline: 'border border-brand-accent text-brand-accent hover:bg-brand-subtle',
  ghost: 'text-brand-accent hover:bg-brand-subtle'
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(
          'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2',
          variantClasses[variant],
          className
        )}
        ref={ref as any}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
