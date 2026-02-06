import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article';
  variant?: 'default' | 'purple';
  role?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  icon?: React.ReactNode;
}

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Card component with consistent styling matching the Recommendations section
 *
 * Uses the same design tokens:
 * - Background: var(--color-background)
 * - Border: 1px solid var(--color-border)
 * - Border radius: var(--border-radius-lg)
 * - Padding: var(--spacing-md)
 * - Shadow: var(--shadow-sm)
 */
export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  as: Component = 'div',
  variant = 'default',
  ...ariaProps
}) => {
  const variantClass = variant === 'purple' ? styles.cardPurple : '';

  return (
    <Component
      className={`${styles.card} ${variantClass} ${className}`}
      {...ariaProps}
    >
      {children}
    </Component>
  );
};

/**
 * CardHeader - Container for card title and description
 */
export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`${styles.cardHeader} ${className}`}>{children}</div>
  );
};

/**
 * CardTitle - Standardized card title with optional icon
 * Font size: var(--font-size-base), Font weight: 600
 */
export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className = '',
  id,
  icon,
}) => {
  return (
    <h2 id={id} className={`${styles.cardTitle} ${className}`}>
      {icon && <span className={styles.cardIcon}>{icon}</span>}
      {children}
    </h2>
  );
};

/**
 * CardDescription - Standardized card description text
 * Font size: var(--font-size-xs), Color: var(--color-text-secondary)
 */
export const CardDescription: React.FC<CardDescriptionProps> = ({
  children,
  className = '',
}) => {
  return (
    <p className={`${styles.cardDescription} ${className}`}>{children}</p>
  );
};
