// Event helper utilities for consistent event tracking

import { safeTrack } from '../client';
import { EVENT_NAMES, type NavigationEvent, type RecommendationEvent } from '../events';


// Navigation event helpers
export const trackNavigationEvent = (eventData: NavigationEvent) => {
  safeTrack(EVENT_NAMES.NAVIGATION_SECTION_CHANGED, {
    ...eventData,
    timestamp: Date.now(),
    url: window.location.href,
    pathname: window.location.pathname,
  });
};

// Recommendation event helpers
export const trackRecommendationEvent = (eventData: RecommendationEvent) => {
  const eventName = eventData.action === 'view' 
    ? EVENT_NAMES.RECOMMENDATION_VIEWED 
    : EVENT_NAMES.RECOMMENDATION_SKILL_CLICKED;

  safeTrack(eventName, {
    ...eventData,
    timestamp: Date.now(),
    component: 'RecommendationCard',
  });
};

// Page view tracking helper
export const trackPageView = (pageName: string, additionalProperties?: Record<string, unknown>) => {
  safeTrack(EVENT_NAMES.PAGE_VIEWED, {
    page: pageName,
    url: window.location.href,
    pathname: window.location.pathname,
    title: document.title,
    timestamp: Date.now(),
    ...additionalProperties,
  });
};

// Session tracking helpers
export const trackSessionStart = () => {
  safeTrack(EVENT_NAMES.SESSION_STARTED, {
    timestamp: Date.now(),
    url: window.location.href,
    referrer: document.referrer,
  });
};

export const trackSessionEnd = (sessionDuration: number, interactionCount: number): void => {
  safeTrack(EVENT_NAMES.SESSION_ENDED, {
    duration: sessionDuration,
    interactionCount,
    timestamp: Date.now(),
  });
};

// Scroll depth tracking helper
export const trackScrollDepth = (depth: number, section?: string) => {
  // Only track significant scroll milestones
  const milestones = [25, 50, 75, 90, 100];
  if (milestones.includes(Math.floor(depth))) {
    safeTrack('scroll_depth', {
      depth: Math.floor(depth),
      section,
      timestamp: Date.now(),
    });
  }
};