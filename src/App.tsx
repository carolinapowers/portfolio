import { useEffect } from 'react';
import { Layout } from './domains/layout/component';
import { AnalyticsProvider } from './shared/components/layout/AnalyticsWrapper';
import { safeIdentify, trackSessionStart } from './domains/analytics';
import { getUserTraits, getSessionProperties } from './domains/analytics/utils/userTraits';
import { useGlobalButtonTracking } from './domains/analytics/hooks/useGlobalButtonTracking';
import './styles/globals.css';

function AppContent() {
  // Enable global button click tracking
  useGlobalButtonTracking();

  useEffect(() => {
    // Initialize user traits and session tracking
    const userTraits = getUserTraits();
    const sessionProperties = getSessionProperties();
    
    // Identify anonymous user with traits
    safeIdentify(undefined, {
      ...userTraits,
      ...sessionProperties,
    });
    
    // Track session start
    trackSessionStart();
  }, []);

  return <Layout />;
}

function App() {
  return (
    <AnalyticsProvider>
      <AppContent />
    </AnalyticsProvider>
  );
}

export default App;
