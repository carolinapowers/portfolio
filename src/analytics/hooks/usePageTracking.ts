import { useEffect, useRef } from 'react';
import { safePageView } from '../client';
import { trackPageView, trackScrollDepth } from '../utils/eventHelpers';

interface UsePageTrackingOptions {
  pageName: string;
  trackScrollDepth?: boolean;
  scrollDepthThresholds?: number[];
}

export const usePageTracking = ({ 
  pageName, 
  trackScrollDepth: enableScrollTracking = true,
  scrollDepthThresholds = [25, 50, 75, 90, 100]
}: UsePageTrackingOptions) => {
  const pageStartTime = useRef<number>(Date.now());
  const maxScrollDepth = useRef<number>(0);
  const trackedScrollMilestones = useRef<Set<number>>(new Set());

  // Track page view on mount
  useEffect(() => {
    pageStartTime.current = Date.now();
    safePageView(pageName, {
      timestamp: pageStartTime.current,
    });
    trackPageView(pageName);
  }, [pageName]);

  // Track scroll depth if enabled
  useEffect(() => {
    if (!enableScrollTracking) return;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.min((scrollTop / documentHeight) * 100, 100);

      // Update max scroll depth
      if (scrollPercentage > maxScrollDepth.current) {
        maxScrollDepth.current = scrollPercentage;
      }

      // Track scroll milestones
      scrollDepthThresholds.forEach(threshold => {
        if (
          scrollPercentage >= threshold && 
          !trackedScrollMilestones.current.has(threshold)
        ) {
          trackedScrollMilestones.current.add(threshold);
          trackScrollDepth(threshold, pageName);
        }
      });
    };

    // Throttle scroll events
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [enableScrollTracking, pageName, scrollDepthThresholds]);

  // Track time spent on page when component unmounts
  useEffect(() => {
    return () => {
      const timeSpent = Date.now() - pageStartTime.current;
      
      // Track time spent if user was on page for more than 5 seconds
      if (timeSpent > 5000) {
        trackPageView(`${pageName}_time_spent`, {
          timeSpent,
          maxScrollDepth: maxScrollDepth.current,
        });
      }
    };
  }, [pageName]);

  return {
    maxScrollDepth: maxScrollDepth.current,
    timeSpent: Date.now() - pageStartTime.current,
  };
};