import { render, screen } from '@testing-library/react';
import { SkillTags } from './Tags';
import type { Recommendation } from '../../../../../data/recommendations';
import type { SkillCategory } from '../../../../../data/skills';

// Mock recommendation with diverse skills across actual categories from the system
const mockRecommendationWithCategorizedSkills: Recommendation = {
  id: '1',
  name: 'Test User',
  title: 'Senior Engineer',
  company: 'TechCorp',
  avatar: 'TU',
  summary: 'Excellent engineer with diverse skills',
  content: 'Test content for recommendation',
  skills: [
    // Engineering skills
    'React', 'TypeScript', 'CSS', 'JavaScript', 'Node.js', 'GraphQL', 'Testing',
    // Process skills
    'Proactive Mindset', 'Documentation Excellence', 'Process Improvement',
    // Leadership skills
    'Team Leadership', 'Initiative', 'Developer Experience',
    // Collaboration skills
    'Collaboration', 'Supportive Leadership',
    // Delivery skills
    'Delivery & Quality', 'Proactive Initiative',
    // Learning skills
    'Growth & Learning', 'Onboarding Excellence',
  ],
  date: '2024-01-15',
  relationship: 'Colleague',
};

describe('SkillTags Component', () => {
  describe('Default State (No Active Categories)', () => {
    it('displays at least 6 skills with category diversity', () => {
      render(<SkillTags recommendation={mockRecommendationWithCategorizedSkills} />);

      // Should show at least 6 skills
      const skillElements = screen.getAllByText(/^(?!$).+/);
      expect(skillElements.length).toBeGreaterThanOrEqual(6);

      // Should include React (first engineering skill)
      expect(screen.getByText('React')).toBeInTheDocument();
    });

    it('does not apply active class to any skills when no active categories', () => {
      const { container } = render(
        <SkillTags recommendation={mockRecommendationWithCategorizedSkills} />
      );

      const skillElements = container.querySelectorAll('span[class*="skill"]');
      skillElements.forEach(element => {
        expect(element.className).not.toContain('active');
      });
    });
  });

  describe('Filtered State (Active Categories)', () => {
    it('shows ALL skills from active categories when filter is applied', () => {
      const activeCategories: SkillCategory[] = ['engineering'];

      render(
        <SkillTags
          recommendation={mockRecommendationWithCategorizedSkills}
          activeSkillCategories={activeCategories}
        />
      );

      // Should show ALL engineering skills
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('CSS')).toBeInTheDocument();
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
      expect(screen.getByText('Node.js')).toBeInTheDocument();
      expect(screen.getByText('GraphQL')).toBeInTheDocument();
      expect(screen.getByText('Testing')).toBeInTheDocument();

      // Should also show first skill from other categories
      expect(screen.getByText('Proactive Mindset')).toBeInTheDocument();
    });

    it('applies active class only to first skill of each active category', () => {
      const activeCategories: SkillCategory[] = ['engineering'];

      render(
        <SkillTags
          recommendation={mockRecommendationWithCategorizedSkills}
          activeSkillCategories={activeCategories}
        />
      );

      // First engineering skill should have active class
      const reactSkill = screen.getByText('React');
      expect(reactSkill.className).toContain('active');

      // Other engineering skills should NOT have active class
      const typescriptSkill = screen.getByText('TypeScript');
      expect(typescriptSkill.className).not.toContain('active');

      // Skills from non-active categories should NOT have active class
      const proactiveMindsetSkill = screen.getByText('Proactive Mindset');
      expect(proactiveMindsetSkill.className).not.toContain('active');
    });

    it('handles multiple active categories', () => {
      const activeCategories: SkillCategory[] = ['engineering', 'process'];

      render(
        <SkillTags
          recommendation={mockRecommendationWithCategorizedSkills}
          activeSkillCategories={activeCategories}
        />
      );

      // Should show ALL engineering skills
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();

      // Should show ALL process skills (Process Improvement is the only process skill)
      expect(screen.getByText('Process Improvement')).toBeInTheDocument();

      // Should show first skill from other categories
      expect(screen.getByText('Proactive Mindset')).toBeInTheDocument(); // This is delivery category

      // First skill from each active category should have active class
      const reactSkill = screen.getByText('React');
      expect(reactSkill.className).toContain('active');

      const processImprovementSkill = screen.getByText('Process Improvement');
      expect(processImprovementSkill.className).toContain('active');

      // Other skills should not have active class
      const typescriptSkill = screen.getByText('TypeScript');
      expect(typescriptSkill.className).not.toContain('active');

      // Skills from non-active categories should not have active class
      const proactiveMindsetSkill = screen.getByText('Proactive Mindset');
      expect(proactiveMindsetSkill.className).not.toContain('active');
    });

    it('shows ALL skills when all available categories are active', () => {
      const allCategories: SkillCategory[] = [
        'engineering', 'process', 'leadership', 'collaboration', 'delivery', 'learning'
      ];

      render(
        <SkillTags
          recommendation={mockRecommendationWithCategorizedSkills}
          activeSkillCategories={allCategories}
        />
      );

      // Should show ALL skills since all categories are active
      mockRecommendationWithCategorizedSkills.skills.forEach(skill => {
        expect(screen.getByText(skill)).toBeInTheDocument();
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles skills without defined category (fallback to delivery)', () => {
      const recommendationWithUnmappedSkills: Recommendation = {
        ...mockRecommendationWithCategorizedSkills,
        skills: ['React', 'UnmappedSkill1', 'Team Leadership']
      };

      render(<SkillTags recommendation={recommendationWithUnmappedSkills} />);

      // All skills should be displayed
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('UnmappedSkill1')).toBeInTheDocument();
      expect(screen.getByText('Team Leadership')).toBeInTheDocument();
    });

    it('maintains skill order consistency', () => {
      const { rerender } = render(
        <SkillTags recommendation={mockRecommendationWithCategorizedSkills} />
      );

      const firstRenderText = screen.getByText('React').parentElement?.textContent;

      // Rerender with same props
      rerender(
        <SkillTags recommendation={mockRecommendationWithCategorizedSkills} />
      );

      const secondRenderText = screen.getByText('React').parentElement?.textContent;

      // Skills should be in same order
      expect(firstRenderText).toBe(secondRenderText);
    });
  });
});