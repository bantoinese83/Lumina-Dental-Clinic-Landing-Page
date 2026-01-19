/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Button from './Button';
import { reportError } from '../../utils/errorReporting';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // @ts-ignore - TypeScript override modifier issues
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Report error using our error reporting utility
    reportError(error, {
      componentStack: errorInfo.componentStack || null
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>

            <h1 className="text-2xl font-bold text-slate-900 mb-4 font-display">
              Something went wrong
            </h1>

            <p className="text-slate-600 mb-6 font-sans">
              We encountered an unexpected error. Our team has been notified and is working to fix this issue.
            </p>

            <div className="space-y-3">
              <Button onClick={this.handleRetry} variant="primary" className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>

              <Button onClick={this.handleGoHome} variant="link" className="w-full">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </div>

            {process.env['NODE_ENV'] === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-slate-500 hover:text-slate-700 font-sans">
                  Error Details (Development Only)
                </summary>
                <div className="mt-2 p-3 bg-slate-50 rounded-lg text-xs font-mono text-slate-700 overflow-auto max-h-32">
                  <div className="font-semibold mb-1">Error:</div>
                  <div className="mb-2">{this.state.error.message}</div>
                  {this.state.errorInfo && (
                    <>
                      <div className="font-semibold mb-1">Component Stack:</div>
                      <pre className="whitespace-pre-wrap">{this.state.errorInfo.componentStack}</pre>
                    </>
                  )}
                </div>
              </details>
            )}

            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-xs text-slate-500 font-sans">
                If this problem persists, please contact our support team.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;