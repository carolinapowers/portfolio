import { useEffect } from 'react';
import { Layout } from './Layout/Layout';
import { AnalyticsProvider } from './components/AnalyticsWrapper';
import { useGlobalButtonTracking } from './analytics/hooks/useGlobalButtonTracking';
import { safeIdentify, trackSessionStart } from './analytics';
import { getUserTraits, getSessionProperties } from './analytics/utils/userTraits';
import './styles/globals.css';

function AppContent() {
  // Initialize analytics on app start
  useEffect(() => {
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

  // Enable global button tracking
  useGlobalButtonTracking();

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
