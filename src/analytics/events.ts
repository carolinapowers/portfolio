// Event type definitions for Segment analytics tracking



export interface NavigationEvent {
  section: string;
  previousSection?: string;
  timeSpent: number;
  scrollDepth: number;
}

export interface RecommendationEvent {
  action: 'view' | 'skill_click' | 'filter' | 'sort';
  recommendationId?: string;
  skillTag?: string;
  filterType?: string;
  sortType?: string;
}

export interface SessionEvent {
  action: 'started' | 'ended';
  duration?: number;
  pagesViewed?: number;
  interactionCount?: number;
}

export interface ButtonEvent {
  buttonText: string;
  buttonType: 'button' | 'link' | 'submit' | 'ai' | 'action' | 'social' | 'demo';
  section: string;
  action: string;
  url?: string;
  external?: boolean;
  elementId?: string;
  elementClass?: string;
}

// Event names following consistent naming convention
export const EVENT_NAMES = {
  PAGE_VIEWED: 'page_viewed',
  RECOMMENDATION_VIEWED: 'recommendation_viewed',
  RECOMMENDATION_SKILL_CLICKED: 'recommendation_skill_clicked',
  NAVIGATION_SECTION_CHANGED: 'navigation_section_changed',
  SESSION_STARTED: 'session_started',
  SESSION_ENDED: 'session_ended',
  BUTTON_CLICKED: 'button_clicked',
} as const;

export type EventName = typeof EVENT_NAMES[keyof typeof EVENT_NAMES];