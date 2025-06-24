import React from 'react';
import clsx from 'clsx';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'accent' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
};

const base = 'inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};
const variants = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  accent: 'bg-accent text-accent-foreground hover:bg-accent/80',
  danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
  ghost: 'bg-transparent text-primary hover:bg-accent/10',
  outline: 'border-2 border-border bg-transparent text-foreground hover:bg-accent/10 hover:border-accent',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, variant = 'primary', size = 'md', loading, disabled, fullWidth, icon, className, ...rest },
    ref
  ) => (
    <button
      ref={ref}
      className={clsx(
        base,
        sizes[size],
        variants[variant],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <span className="mr-2"><span className="loader border-2 border-t-2 border-t-white border-white/30 rounded-full w-4 h-4 inline-block animate-spin" /></span>
      ) : icon ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      {children}
    </button>
  )
);
Button.displayName = 'Button';

export default Button; 