// Performance monitoring utilities
export const initPerformanceMonitoring = () => {
  // Only run in production and if supported
  if (process.env['NODE_ENV'] !== 'production' || !window.performance) {
    return;
  }

  // Core Web Vitals monitoring (disabled for now due to type issues)
  // TODO: Re-enable when web-vitals types are properly resolved
  // import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
  //   getCLS(console.log);
  //   getFID(console.log);
  //   getFCP(console.log);
  //   getLCP(console.log);
  //   getTTFB(console.log);
  // }).catch(() => {
  //   // web-vitals not available, skip monitoring
  // });

  // Monitor long tasks
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) { // Tasks longer than 50ms
            console.warn('Long task detected:', {
              duration: entry.duration,
              startTime: entry.startTime,
              name: entry.name,
            });
          }
        }
      });
      observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      // Long tasks API not supported
    }
  }

  // Monitor navigation timing
  window.addEventListener('load', () => {
    setTimeout(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        const metrics = {
          dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
          tcpConnect: navigation.connectEnd - navigation.connectStart,
          serverResponse: navigation.responseStart - navigation.requestStart,
          pageLoad: navigation.loadEventEnd - navigation.startTime,
          domReady: navigation.domContentLoadedEventEnd - navigation.startTime,
        };

        console.log('Navigation timing:', metrics);

        // Send to analytics if available
        if (typeof gtag !== 'undefined') {
          gtag('event', 'page_load_metrics', {
            event_category: 'performance',
            custom_map: metrics,
          });
        }
      }
    }, 0);
  });

  // Monitor resource loading
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 1000) { // Resources taking more than 1 second
            console.warn('Slow resource:', {
              name: entry.name,
              duration: entry.duration,
              size: (entry as any).transferSize,
            });
          }
        }
      });
      observer.observe({ entryTypes: ['resource'] });
    } catch (e) {
      // Resource timing not fully supported
    }
  }
};

// Memory usage monitoring (Chrome only)
export const monitorMemoryUsage = () => {
  if ('memory' in performance) {
    const memInfo = (performance as any).memory;
    console.log('Memory usage:', {
      used: Math.round(memInfo.usedJSHeapSize / 1048576) + ' MB',
      total: Math.round(memInfo.totalJSHeapSize / 1048576) + ' MB',
      limit: Math.round(memInfo.jsHeapSizeLimit / 1048576) + ' MB',
    });
  }
};

// Network information
export const getNetworkInfo = () => {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    return {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData,
    };
  }
  return null;
};