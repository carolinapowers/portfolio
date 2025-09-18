import { describe, it, expect } from 'vitest';
import { analyticsConfig } from './client';

describe('Analytics Client', () => {
  describe('Configuration', () => {
    it('should have correct configuration structure', () => {
      expect(analyticsConfig).toHaveProperty('enabled');
      expect(analyticsConfig).toHaveProperty('debug');
      expect(analyticsConfig).toHaveProperty('writeKey');
      expect(analyticsConfig).toHaveProperty('environment');
    });

    it('should handle environment configuration correctly', () => {
      expect(typeof analyticsConfig.enabled).toBe('boolean');
      expect(typeof analyticsConfig.debug).toBe('boolean');
      expect(['development', 'production']).toContain(analyticsConfig.environment);
    });
  });
});