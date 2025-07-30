import { createContext } from 'react';
import { Analytics } from '@segment/analytics-next';

export interface AnalyticsContextType {
  analytics: Analytics | null;
  isReady: boolean;
}

export const AnalyticsContext = createContext<AnalyticsContextType>({
  analytics: null,
  isReady: false,
});