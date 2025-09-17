import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useGlobalButtonTracking } from './useGlobalButtonTracking';
import * as client from '../client';

// Mock the analytics client
vi.mock('../client', () => ({
  safeTrack: vi.fn(),
}));

describe('useGlobalButtonTracking', () => {
  const mockSafeTrack = vi.mocked(client.safeTrack);

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should debounce rapid clicks', () => {
    renderHook(() => useGlobalButtonTracking());

    const button = document.createElement('button');
    button.textContent = 'Test Button';
    document.body.appendChild(button);

    // Simulate rapid clicks
    button.click();
    button.click();
    button.click();

    // Only first click should be tracked due to debouncing
    expect(mockSafeTrack).toHaveBeenCalledTimes(1);
    
    // Advance time past debounce delay
    vi.advanceTimersByTime(150);
    
    // Now another click should be tracked
    button.click();
    expect(mockSafeTrack).toHaveBeenCalledTimes(2);

    document.body.removeChild(button);
  });

  it('should track button clicks with correct properties', () => {
    renderHook(() => useGlobalButtonTracking());

    const button = document.createElement('button');
    button.textContent = 'AI Assistant';
    button.className = 'ai-button';
    button.id = 'ai-btn';
    document.body.appendChild(button);

    button.click();

    expect(mockSafeTrack).toHaveBeenCalledWith('button_clicked', {
      buttonText: 'AI Assistant',
      buttonType: 'ai',
      section: 'unknown',
      action: 'ai_interact',
      url: undefined,
      external: false,
      timestamp: expect.any(Number),
      currentPage: '/',
      elementId: 'ai-btn',
      elementClass: 'ai-button',
    });

    document.body.removeChild(button);
  });

  it('should handle link clicks correctly', () => {
    renderHook(() => useGlobalButtonTracking());

    const link = document.createElement('a');
    link.href = 'https://github.com/test';
    link.textContent = 'GitHub';
    link.target = '_blank';
    document.body.appendChild(link);

    link.click();

    expect(mockSafeTrack).toHaveBeenCalledWith('button_clicked', {
      buttonText: 'GitHub',
      buttonType: 'social',
      section: 'unknown',
      action: 'view_code',
      url: 'https://github.com/test',
      external: true,
      timestamp: expect.any(Number),
      currentPage: '/',
      elementId: undefined,
      elementClass: undefined,
    });

    document.body.removeChild(link);
  });
});