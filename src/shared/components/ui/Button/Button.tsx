import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'filter' | 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
  className?: string;
}

/**
 * Button component with consistent styling across the application
 *
 * Variants:
 * - filter: Category filter buttons with active state
 * - primary: Primary action buttons
 * - secondary: Secondary action buttons
 * - ghost: Minimal ghost buttons
 *
 * Sizes:
 * - sm: Small (0.625rem padding)
 * - md: Medium (0.75rem padding)
 * - lg: Large (1rem padding)
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'secondary',
  size = 'md',
  active = false,
  className = '',
  type = 'button',
  ...props
}) => {
  const variantClass = styles[`button${variant.charAt(0).toUpperCase() + variant.slice(1)}`];
  const sizeClass = styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}`];
  const activeClass = active ? styles.active : '';

  return (
    <button
      type={type}
      className={`${styles.button} ${variantClass} ${sizeClass} ${activeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
