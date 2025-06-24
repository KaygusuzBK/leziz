import React from 'react';
import clsx from 'clsx';

export type LoaderProps = {
  size?: number;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const Loader = ({ size = 24, className, ...rest }: LoaderProps) => (
  <div
    className={clsx('inline-block animate-spin', className)}
    style={{ width: size, height: size }}
    {...rest}
  >
    <svg
      className="w-full h-full text-accent"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
  </div>
);

export default Loader; 