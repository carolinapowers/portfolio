import { useMemo } from 'react';
import { highlightText } from '../utils/textHighlighting';
import { SKILL_TO_CATEGORY_MAP } from '../data/skills';
import styles from '../utils/textHighlighting.module.css';

export interface UseSkillHighlightingProps {
  text: string;
  skills: string[];
  activeFilters: Array<{ keywords: string[]; type: string }>;
}

export const useSkillHighlighting = ({
  text,
  skills,
  activeFilters
}: UseSkillHighlightingProps) => {
  const highlightedText = useMemo(() => {
    const skillFilters = activeFilters.filter(filter => filter.type === 'skill');
    
    if (skillFilters.length === 0) {
      return text;
    }

    // Get all skills that should be highlighted based on active filters
    const skillsToHighlight = skills.filter(skillName => {
      const skillCategory = SKILL_TO_CATEGORY_MAP[skillName];
      return skillFilters.some(filter => 
        filter.keywords.includes(skillCategory)
      );
    });

    if (skillsToHighlight.length === 0) {
      return text;
    }

    return highlightText(text, skillsToHighlight, {
      className: styles.skillHighlight,
      caseSensitive: false,
      wholeWords: true
    });
  }, [text, skills, activeFilters]);

  return highlightedText;
};