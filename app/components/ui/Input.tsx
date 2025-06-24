import React from 'react';
import clsx from 'clsx';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...rest }, ref) => (
    <div className="w-full">
      {label && <label className="block text-sm font-medium mb-2 text-primary">{label}</label>}
      <input
        ref={ref}
        className={clsx(
          'w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 bg-card text-primary border-card',
          error && 'border-destructive',
          className
        )}
        {...rest}
      />
      {error && <span className="text-xs text-destructive mt-1 block">{error}</span>}
    </div>
  )
);
Input.displayName = 'Input';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, ...rest }, ref) => (
    <div className="w-full">
      {label && <label className="block text-sm font-medium mb-2 text-primary">{label}</label>}
      <textarea
        ref={ref}
        className={clsx(
          'w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 bg-card text-primary border-card',
          error && 'border-destructive',
          className
        )}
        {...rest}
      />
      {error && <span className="text-xs text-destructive mt-1 block">{error}</span>}
    </div>
  )
);
Textarea.displayName = 'Textarea';

export default Input; 