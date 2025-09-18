// Text highlighting utilities for skill matching

export interface HighlightOptions {
  className?: string;
  caseSensitive?: boolean;
  wholeWords?: boolean;
}

/**
 * Highlights matching text within a string
 */
export const highlightText = (
  text: string, 
  searchTerms: string[], 
  options: HighlightOptions = {}
): string => {
  if (!searchTerms.length || !text) return text;

  const {
    className = 'highlight',
    caseSensitive = false,
    wholeWords = false
  } = options;

  let highlightedText = text;

  searchTerms.forEach(term => {
    if (!term.trim()) return;

    const flags = caseSensitive ? 'g' : 'gi';
    const pattern = wholeWords 
      ? new RegExp(`\\b(${escapeRegExp(term)})\\b`, flags)
      : new RegExp(`(${escapeRegExp(term)})`, flags);

    highlightedText = highlightedText.replace(
      pattern, 
      `<mark class="${className}">$1</mark>`
    );
  });

  return highlightedText;
};

/**
 * Escape special regex characters
 */
const escapeRegExp = (string: string): string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * Extract skills that match a specific category
 */
export const getMatchingSkills = (
  skills: string[], 
  category: string, 
  skillToCategoryMap: Record<string, string>
): string[] => {
  return skills.filter(skill => skillToCategoryMap[skill] === category);
};