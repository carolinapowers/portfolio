import React from 'react';
import styles from './DisplayFlexItem.module.css';

interface DisplayFlexItemProps {
  children: React.ReactNode;
  flex?: string | number;
  grow?: number;
  shrink?: number;
  basis?: string;
  align?: 'auto' | 'start' | 'center' | 'end' | 'stretch';
  className?: string;
}

export const DisplayFlexItem: React.FC<DisplayFlexItemProps> = ({
  children,
  flex,
  grow,
  shrink,
  basis,
  align,
  className = '',
}) => {
  const style: React.CSSProperties = {};

  if (flex !== undefined) {
    style.flex = flex;
  } else {
    if (grow !== undefined) style.flexGrow = grow;
    if (shrink !== undefined) style.flexShrink = shrink;
    if (basis !== undefined) style.flexBasis = basis;
  }

  const classes = [
    styles.displayFlexItem,
    align && styles[`align-${align}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
};