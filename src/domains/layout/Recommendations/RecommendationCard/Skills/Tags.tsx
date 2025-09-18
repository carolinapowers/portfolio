import React, { useMemo } from 'react';


import styles from '../component.module.css';
import { getSkillCategory, type SkillCategory } from '../../../../../data/skills';
import type { Recommendation } from '../../../../../data/recommendations';

interface SkillTagsProps {
  recommendation: Recommendation;
  activeSkillCategories?: SkillCategory[];
  className?: string;
}

export const SkillTags: React.FC<SkillTagsProps> = ({
  recommendation,
  activeSkillCategories = [],
  className,
}) => {
  const hasActiveFilters = activeSkillCategories.length > 0;

  // Organize skills by category
  const skillsByCategory = useMemo(() => {
    return recommendation.skills.reduce(
      (acc, skill) => {
        const category = getSkillCategory(skill) || ('delivery' as SkillCategory);
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(skill);
        return acc;
      },
      {} as Record<SkillCategory, string[]>
    );
  }, [recommendation.skills]);

  // Determine which skills to display
  const displayedSkills = useMemo(() => {
    if (!hasActiveFilters) {
      // Default state: show at least 6 skills, prioritizing category diversity
      const skills: string[] = [];
      const minSkills = 6;

      // First, add one skill from each category to ensure diversity
      Object.values(skillsByCategory).forEach(categorySkills => {
        if (categorySkills[0]) {
          skills.push(categorySkills[0]);
        }
      });

      // If we have fewer than 6 skills, add more skills to reach at least 6
      if (skills.length < minSkills) {
        Object.values(skillsByCategory).forEach(categorySkills => {
          for (let i = 1; i < categorySkills.length && skills.length < minSkills; i++) {
            const skill = categorySkills[i];
            if (skill) {
              skills.push(skill);
            }
          }
        });
      }

      return skills;
    } else {
      // Filtered state: show skills based on active filters
      const availableCategories = Object.keys(skillsByCategory) as SkillCategory[];
      const allCategoriesActive = availableCategories.every(category =>
        activeSkillCategories.includes(category)
      );

      if (allCategoriesActive && availableCategories.length > 0) {
        // If all available categories are active, show ALL skills
        return recommendation.skills;
      } else {
        // Show all skills from active categories, first skill from others
        const skills: string[] = [];
        Object.entries(skillsByCategory).forEach(([category, categorySkills]) => {
          if (activeSkillCategories.includes(category as SkillCategory)) {
            // Show all skills from active categories
            skills.push(...categorySkills);
          } else {
            // Show only first skill from inactive categories
            if (categorySkills[0]) {
              skills.push(categorySkills[0]);
            }
          }
        });
        return skills;
      }
    }
  }, [skillsByCategory, hasActiveFilters, activeSkillCategories, recommendation.skills]);

  // Determine which skills should be highlighted (active)
  const activeSkills = useMemo(() => {
    if (!hasActiveFilters) {
      return [];
    }

    const active: string[] = [];
    Object.entries(skillsByCategory).forEach(([category, categorySkills]) => {
      if (activeSkillCategories.includes(category as SkillCategory)) {
        // First skill from each active category gets highlighted
        const firstSkill = categorySkills[0];
        if (firstSkill) {
          active.push(firstSkill);
        }
      }
    });
    return active;
  }, [skillsByCategory, hasActiveFilters, activeSkillCategories]);

  return (
    <div className={className || styles.skills}>
      {displayedSkills.map(skill => (
        <span
          key={skill}
          className={`${styles.skill} ${activeSkills.includes(skill) ? styles.active : ''}`}
        >
          {skill}
        </span>
      ))}
    </div>
  );
};
