// Modern Segment analytics using @segment/analytics-next
import { AnalyticsBrowser, Analytics } from '@segment/analytics-next';

let analyticsInstance: Analytics | null = null;

// Configuration for different environments
const isDevelopment = import.meta.env.DEV;
const writeKey = import.meta.env.VITE_SEGMENT_WRITE_KEY;

// Analytics configuration
export const analyticsConfig = {
  enabled: !!writeKey,
  debug: isDevelopment,
  writeKey,
  environment: isDevelopment ? 'development' : 'production',
};

// Initialize analytics instance
export const initializeAnalytics = async (): Promise<Analytics | null> => {
  if (!writeKey) {
    if (analyticsConfig.debug) {
      console.log('[Analytics] No write key provided, analytics disabled');
    }
    return null;
  }

  if (analyticsInstance) {
    return analyticsInstance;
  }

  try {
    const [analytics] = await AnalyticsBrowser.load({
      writeKey,
    });

    analyticsInstance = analytics;
    
    if (analyticsConfig.debug) {
      console.log('[Analytics] Initialized successfully');
    }

    return analytics;
  } catch (error) {
    console.error('[Analytics] Failed to initialize:', error);
    return null;
  }
};

// Get current analytics instance
export const getAnalytics = (): Analytics | null => analyticsInstance;

// Helper function to safely track events
export const safeTrack = (eventName: string, properties?: Record<string, unknown>) => {
  const analytics = getAnalytics();
  
  if (!analytics || !analyticsConfig.enabled) {
    if (analyticsConfig.debug) {
      console.log('[Analytics] Tracking disabled:', eventName);
    }
    return;
  }

  try {
    analytics.track(eventName, properties);
    
    if (analyticsConfig.debug) {
      console.log('[Analytics] Event tracked:', eventName);
    }
  } catch (error) {
    console.error('[Analytics] Error tracking event:', error);
  }
};

// Helper function to safely identify users
export const safeIdentify = (userId?: string, traits?: Record<string, unknown>) => {
  const analytics = getAnalytics();
  
  if (!analytics || !analyticsConfig.enabled) {
    if (analyticsConfig.debug) {
      console.log('[Analytics] Identify disabled');
    }
    return;
  }

  try {
    if (userId && traits) {
      analytics.identify(userId, traits);
    } else if (userId) {
      analytics.identify(userId);
    } else if (traits) {
      analytics.identify(traits);
    } else {
      analytics.identify();
    }
    
    if (analyticsConfig.debug) {
      console.log('[Analytics] User identified');
    }
  } catch (error) {
    console.error('[Analytics] Error identifying user:', error);
  }
};

// Helper function to safely track page views
export const safePageView = (name?: string, properties?: Record<string, unknown>) => {
  const analytics = getAnalytics();
  
  if (!analytics || !analyticsConfig.enabled) {
    if (analyticsConfig.debug) {
      console.log('[Analytics] Page view disabled');
    }
    return;
  }

  try {
    analytics.page(name, properties);
    
    if (analyticsConfig.debug) {
      console.log('[Analytics] Page view tracked:', name);
    }
  } catch (error) {
    console.error('[Analytics] Error tracking page view:', error);
  }
};