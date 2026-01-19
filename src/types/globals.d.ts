// Global type declarations
declare global {
  function gtag(command: 'config' | 'event', targetId: string, config?: Record<string, any>): void;

  interface Window {
    gtag?: typeof gtag;
  }

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      ANALYZE?: string;
    }
  }
}

export {};
