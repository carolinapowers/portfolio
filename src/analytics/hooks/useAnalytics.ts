import { useContext } from 'react';
import { AnalyticsContext } from '../context/AnalyticsContext';

export const useAnalytics = () => useContext(AnalyticsContext);