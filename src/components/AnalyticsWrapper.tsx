import React, { useEffect, useMemo } from 'react';
import { Analytics } from '@segment/analytics-next';
import { initializeAnalytics } from '../analytics/client';
import { AnalyticsContext } from '../analytics/context/AnalyticsContext';
import type { AnalyticsContextType } from '../analytics/context/AnalyticsContext';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({
  children,
}) => {
  const [analytics, setAnalytics] = React.useState<Analytics | null>(null);
  const [isReady, setIsReady] = React.useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const analyticsInstance = await initializeAnalytics();
        setAnalytics(analyticsInstance);
        setIsReady(true);
      } catch (error) {
        console.error('[Analytics] Initialization failed:', error);
        setIsReady(true); // Still set ready to prevent hanging
      }
    };

    init();
  }, []);

  const contextValue: AnalyticsContextType = useMemo(
    () => ({
      analytics,
      isReady,
    }),
    [analytics, isReady]
  );

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  );
};

// Legacy wrapper for backward compatibility
interface AnalyticsWrapperProps {
  writeKey: string;
  children: React.ReactNode;
}

export const AnalyticsWrapper: React.FC<AnalyticsWrapperProps> = ({
  children,
}) => {
  return <AnalyticsProvider>{children}</AnalyticsProvider>;
};