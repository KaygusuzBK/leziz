import React from 'react';
import clsx from 'clsx';

export type ChipProps = {
  children: React.ReactNode;
  onRemove?: () => void;
  color?: 'default' | 'accent' | 'danger';
  className?: string;
} & React.HTMLAttributes<HTMLSpanElement>;

export const Chip = ({ children, onRemove, color = 'default', className, ...rest }: ChipProps) => (
  <span
    className={clsx(
      'flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium shadow-sm animate-fade-in',
      color === 'accent' && 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300',
      color === 'danger' && 'bg-destructive text-destructive-foreground',
      color === 'default' && 'bg-card text-primary',
      className
    )}
    {...rest}
  >
    {children}
    {onRemove && (
      <button
        type="button"
        onClick={onRemove}
        className="ml-1 rounded-full hover:bg-orange-200 dark:hover:bg-orange-800 p-0.5 transition-colors"
        aria-label="Kaldır"
      >
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 8.586l3.536-3.535a1 1 0 111.415 1.414L11.414 10l3.535 3.536a1 1 0 01-1.414 1.415L10 11.414l-3.536 3.535a1 1 0 01-1.415-1.414L8.586 10 5.05 6.464A1 1 0 016.464 5.05L10 8.586z" clipRule="evenodd" />
        </svg>
      </button>
    )}
  </span>
);

export default Chip; 