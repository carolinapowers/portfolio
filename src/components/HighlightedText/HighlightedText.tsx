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
  
  // Use word boundaries for better matching
  const pattern = new RegExp(`(${escapedTerms.join('|')})`, 'gi');
  
  // Split and keep the separators (matched terms)
  const parts = text.split(pattern);
  
  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (!part) return null;
        
        // Check if this part matches any of our highlight terms (case-insensitive)
        const isHighlighted = highlightTerms.some(term => 
          term && part.toLowerCase() === term.toLowerCase()
        );
        
        if (isHighlighted) {
          return (
            <mark key={index} className={styles.highlight}>
              {part}
            </mark>
          );
        }
        
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </span>
  );
};