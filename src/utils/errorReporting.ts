// Error reporting utility for production monitoring
export const reportError = async (error: Error, errorInfo?: { componentStack?: string | null }) => {
  // In development, just log to console
  if (process.env['NODE_ENV'] === 'development') {
    console.error('Error reported:', {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo?.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    });
    return;
  }

  // In production, send to error reporting service
  try {
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo?.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      userId: localStorage.getItem('userId'), // If you track users
    };

    // Send to your error reporting service
    // Example: Sentry, LogRocket, Bugsnag, etc.
    console.error('Production error:', errorData);

    // Uncomment and configure one of these services:

    // Sentry
    // Sentry.captureException(error, { contexts: { react: errorInfo } });

    // LogRocket
    // LogRocket.captureException(error, { tags: { componentStack: errorInfo?.componentStack } });

    // Custom API endpoint
    // await fetch('/api/errors', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(errorData),
    // });

  } catch (reportingError) {
    // Don't let error reporting break the app
    console.error('Failed to report error:', reportingError);
  }
};

// Performance monitoring helper
export const reportPerformance = (metric: string, value: number) => {
  if (process.env['NODE_ENV'] === 'development') {
    console.log(`Performance: ${metric} = ${value}ms`);
    return;
  }

  // In production, send to analytics/monitoring service
  try {
    // Example: Google Analytics, Mixpanel, etc.
    if (typeof gtag !== 'undefined') {
      gtag('event', 'performance_metric', {
        event_category: 'performance',
        event_label: metric,
        value: Math.round(value),
      });
    }
  } catch (error) {
    console.error('Failed to report performance metric:', error);
  }
};