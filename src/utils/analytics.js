import ReactGA from 'react-ga4';

// Initialize GA4 with environment variable
export const initGA = () => {
  const TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID;
  
  if (!TRACKING_ID) {
    console.warn('Google Analytics tracking ID not found in environment variables');
    return;
  }

  try {
    ReactGA.initialize(TRACKING_ID, {
      gaOptions: {
        siteSpeedSampleRate: 100,
        anonymizeIp: true,
        cookieFlags: 'SameSite=Strict;Secure'
      }
    });
  } catch (error) {
    console.error('Error initializing Google Analytics:', error);
  }
};

// Tracking page views...
export const logPageView = () => {
  try {
    ReactGA.send({ 
      hitType: 'pageview', 
      page: window.location.pathname + window.location.search 
    });
  } catch (error) {
    console.error('Error logging page view:', error);
  }
};

// tracking specific events...
export const logEvent = (category, action, label = null) => {
  try {
    ReactGA.event({
      category,
      action,
      label
    });
  } catch (error) {
    console.error('Error logging event:', error);
  }
};