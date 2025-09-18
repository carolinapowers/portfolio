import React from 'react';
import styles from './HighlightedText.module.css';

interface HighlightedTextProps {
  text: string;
  highlightTerms: string[];
  className?: string;
}

export const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  highlightTerms,
  className = ''
}) => {
  if (!highlightTerms.length || !text) {
    return <span className={className}>{text}</span>;
  }

  // Create a regex pattern from all terms to highlight
  const escapedTerms = highlightTerms
    .filter(term => term && term.length > 0)
    .map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

  if (escapedTerms.length === 0) {
    return <span className={className}>{text}</span>;
  }

  // Use word boundaries for complete word matching
  const pattern = new RegExp(`\\b(${escapedTerms.join('|')})\\b`, 'gi');

  // Split and keep the separators (matched terms)
  const parts = text.split(pattern);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (!part) return null;

        // Check if this part matches any of our highlight terms (case-insensitive)
        // Use word boundary test to ensure it's a complete word match
        const isHighlighted = highlightTerms.some(term => {
          if (!term) return false;
          const wordBoundaryPattern = new RegExp(`^${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i');
          return wordBoundaryPattern.test(part);
        });

        if (isHighlighted) {
          return (
            <mark key={`highlight-${part}-${parts.slice(0, index).join('')}`} className={styles.highlight}>
              {part}
            </mark>
          );
        }

        return <React.Fragment key={`text-${part}-${parts.slice(0, index).join('')}`}>{part}</React.Fragment>;
      })}
    </span>
  );
};