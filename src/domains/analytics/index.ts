// Main analytics exports

// Client and configuration
export { getAnalytics, initializeAnalytics, analyticsConfig, safeTrack, safeIdentify, safePageView } from './client';

// Event types and names
export { EVENT_NAMES } from './events';
export type { NavigationEvent, RecommendationEvent, SessionEvent, ButtonEvent, EventName } from './events';

// Hooks
export { usePageTracking } from './hooks/usePageTracking';
export { useGlobalButtonTracking } from './hooks/useGlobalButtonTracking';
export { useAnalytics } from './hooks/useAnalytics';

// Utilities
export { getUserTraits, getSessionProperties } from './utils/userTraits';
export type { UserTraits } from './utils/userTraits';
export {
  trackNavigationEvent,
  trackRecommendationEvent,
  trackPageView,
  trackSessionStart,
  trackSessionEnd,
  trackScrollDepth,
} from './utils/eventHelpers';