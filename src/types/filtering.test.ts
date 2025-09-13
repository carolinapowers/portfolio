import { describe, it, expect } from 'vitest';
import {
  isSkillFilter,
  isCompanyFilter,
  isRoleFilter,
  isDateRangeFilter,
  type SkillFilter,
  type CompanyFilter,
  type RoleFilter,
  type DateRangeFilter,
  type Filter
} from './filtering';

describe('Filter Type Guards', () => {
  const skillFilter: SkillFilter = {
    id: 'skill-1',
    type: 'skill',
    label: 'Technical Skills',
    category: 'frontend',
    keywords: ['React', 'TypeScript'],
    priority: 'high'
  };

  const companyFilter: CompanyFilter = {
    id: 'company-1',
    type: 'company',
    label: 'Tech Companies',
    companies: ['TechCorp', 'InnovateLab']
  };

  const roleFilter: RoleFilter = {
    id: 'role-1',
    type: 'role',
    label: 'Engineering Roles',
    roles: ['Engineer', 'Developer']
  };

  const dateRangeFilter: DateRangeFilter = {
    id: 'date-1',
    type: 'dateRange',
    label: 'Recent Recommendations',
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-12-31')
  };

  describe('isSkillFilter', () => {
    it('should return true for skill filter', () => {
      expect(isSkillFilter(skillFilter)).toBe(true);
    });

    it('should return false for non-skill filters', () => {
      expect(isSkillFilter(companyFilter)).toBe(false);
      expect(isSkillFilter(roleFilter)).toBe(false);
      expect(isSkillFilter(dateRangeFilter)).toBe(false);
    });

    it('should provide correct type narrowing', () => {
      if (isSkillFilter(skillFilter)) {
        expect(skillFilter.category).toBe('frontend');
        expect(skillFilter.keywords).toEqual(['React', 'TypeScript']);
        expect(skillFilter.priority).toBe('high');
      }
    });
  });

  describe('isCompanyFilter', () => {
    it('should return true for company filter', () => {
      expect(isCompanyFilter(companyFilter)).toBe(true);
    });

    it('should return false for non-company filters', () => {
      expect(isCompanyFilter(skillFilter)).toBe(false);
      expect(isCompanyFilter(roleFilter)).toBe(false);
      expect(isCompanyFilter(dateRangeFilter)).toBe(false);
    });

    it('should provide correct type narrowing', () => {
      if (isCompanyFilter(companyFilter)) {
        expect(companyFilter.companies).toEqual(['TechCorp', 'InnovateLab']);
      }
    });
  });

  describe('isRoleFilter', () => {
    it('should return true for role filter', () => {
      expect(isRoleFilter(roleFilter)).toBe(true);
    });

    it('should return false for non-role filters', () => {
      expect(isRoleFilter(skillFilter)).toBe(false);
      expect(isRoleFilter(companyFilter)).toBe(false);
      expect(isRoleFilter(dateRangeFilter)).toBe(false);
    });

    it('should provide correct type narrowing', () => {
      if (isRoleFilter(roleFilter)) {
        expect(roleFilter.roles).toEqual(['Engineer', 'Developer']);
      }
    });
  });

  describe('isDateRangeFilter', () => {
    it('should return true for date range filter', () => {
      expect(isDateRangeFilter(dateRangeFilter)).toBe(true);
    });

    it('should return false for non-date-range filters', () => {
      expect(isDateRangeFilter(skillFilter)).toBe(false);
      expect(isDateRangeFilter(companyFilter)).toBe(false);
      expect(isDateRangeFilter(roleFilter)).toBe(false);
    });

    it('should provide correct type narrowing', () => {
      if (isDateRangeFilter(dateRangeFilter)) {
        expect(dateRangeFilter.startDate).toBeInstanceOf(Date);
        expect(dateRangeFilter.endDate).toBeInstanceOf(Date);
      }
    });
  });

  describe('Type Guard Edge Cases', () => {
    it('should handle malformed objects gracefully', () => {
      const malformedObject = { type: 'skill' } as Filter;
      expect(isSkillFilter(malformedObject)).toBe(true);
      expect(isCompanyFilter(malformedObject)).toBe(false);
    });

    it('should handle null and undefined', () => {
      expect(isSkillFilter(null)).toBe(false);
      expect(isSkillFilter(undefined)).toBe(false);
    });

    it('should handle objects with wrong type property', () => {
      const wrongType = { type: 'unknown' } as unknown as Filter;
      expect(isSkillFilter(wrongType)).toBe(false);
      expect(isCompanyFilter(wrongType)).toBe(false);
      expect(isRoleFilter(wrongType)).toBe(false);
      expect(isDateRangeFilter(wrongType)).toBe(false);
    });
  });
});