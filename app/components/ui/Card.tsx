import React from 'react';
import clsx from 'clsx';

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export const Card = ({ children, className, ...rest }: CardProps) => (
  <div
    className={clsx(
      'bg-card border border-card rounded-xl shadow-sm p-4 transition-colors',
      className
    )}
    {...rest}
  >
    {children}
  </div>
);

export default Card; 