import React from 'react';
import styles from './DisplayFlex.module.css';

interface DisplayFlexProps {
  children: React.ReactNode;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  direction?: 'row' | 'column';
  wrap?: boolean;
  className?: string;
}

export const DisplayFlex: React.FC<DisplayFlexProps> = ({
  children,
  gap = 'md',
  align = 'center',
  justify = 'start',
  direction = 'row',
  wrap = false,
  className = '',
}) => {
  const classes = [
    styles.displayFlex,
    styles[`gap-${gap}`],
    styles[`align-${align}`],
    styles[`justify-${justify}`],
    styles[`direction-${direction}`],
    wrap && styles.wrap,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classes}>{children}</div>;
};