// Utility functions for collecting user traits and context

export interface UserTraits {
  deviceType: 'mobile' | 'tablet' | 'desktop';
  browserName: string;
  browserVersion: string;
  operatingSystem: string;
  screenResolution: string;
  viewportSize: string;
  timezone: string;
  language: string;
  referrer?: string;
  userAgent: string;
}

export const getUserTraits = (): UserTraits => {
  const userAgent = navigator.userAgent;
  
  // Detect device type based on screen width and user agent
  const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024 && /tablet|ipad/i.test(userAgent)) return 'tablet';
    return 'desktop';
  };

  // Extract browser information
  const getBrowserInfo = () => {
    let browserName = 'Unknown';
    let browserVersion = 'Unknown';

    if (userAgent.includes('Chrome') && !userAgent.includes('Edge')) {
      browserName = 'Chrome';
      const match = userAgent.match(/Chrome\/([0-9.]+)/);
      browserVersion = match ? match[1] : 'Unknown';
    } else if (userAgent.includes('Firefox')) {
      browserName = 'Firefox';
      const match = userAgent.match(/Firefox\/([0-9.]+)/);
      browserVersion = match ? match[1] : 'Unknown';
    } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
      browserName = 'Safari';
      const match = userAgent.match(/Version\/([0-9.]+)/);
      browserVersion = match ? match[1] : 'Unknown';
    } else if (userAgent.includes('Edge')) {
      browserName = 'Edge';
      const match = userAgent.match(/Edge\/([0-9.]+)/);
      browserVersion = match ? match[1] : 'Unknown';
    }

    return { browserName, browserVersion };
  };

  // Detect operating system
  const getOperatingSystem = (): string => {
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac OS X')) return 'macOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS';
    if (userAgent.includes('Android')) return 'Android';
    return 'Unknown';
  };

  const { browserName, browserVersion } = getBrowserInfo();

  return {
    deviceType: getDeviceType(),
    browserName,
    browserVersion,
    operatingSystem: getOperatingSystem(),
    screenResolution: `${screen.width}x${screen.height}`,
    viewportSize: `${window.innerWidth}x${window.innerHeight}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language,
    referrer: document.referrer || undefined,
    userAgent,
  };
};

export const getSessionProperties = () => {
  const sessionStart = Date.now();
  const sessionId = `session_${sessionStart}_${Math.random().toString(36).substr(2, 9)}`;
  
  return {
    sessionId,
    sessionStart,
    url: window.location.href,
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
    title: document.title,
  };
};