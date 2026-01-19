import React, { ReactNode, useEffect, useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [startY, setStartY] = useState(0);

  // Simple pull-to-refresh functionality for mobile
  useEffect(() => {
    let isPulling = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        setStartY(e.touches[0].clientY);
        isPulling = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isPulling && window.scrollY === 0) {
        const currentY = e.touches[0].clientY;
        const distance = Math.max(0, currentY - startY);
        if (distance > 0) {
          setPullDistance(Math.min(distance * 0.5, 80)); // Limit pull distance
          e.preventDefault();
        }
      }
    };

    const handleTouchEnd = () => {
      if (isPulling && pullDistance > 60) {
        setIsRefreshing(true);
        // Simulate refresh
        setTimeout(() => {
          setIsRefreshing(false);
          window.location.reload();
        }, 1000);
      }
      setPullDistance(0);
      isPulling = false;
    };

    // Only add listeners on mobile devices
    if (window.innerWidth < 768) {
      document.addEventListener('touchstart', handleTouchStart, { passive: false });
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [pullDistance, startY]);

  return (
    <div className='relative min-h-screen font-sans text-slate-600 bg-slate-50 overflow-x-hidden selection:bg-teal-500/20 selection:text-teal-900'>
      {/* Pull-to-refresh indicator for mobile */}
      {pullDistance > 0 && (
        <div
          className='fixed top-0 left-0 right-0 z-50 bg-teal-500 text-white text-center py-2 text-sm font-medium transition-transform duration-200'
          style={{ transform: `translateY(${Math.max(-100, pullDistance - 60)}%)` }}
        >
          {isRefreshing ? 'Refreshing...' : 'Pull to refresh'}
        </div>
      )}

      {/* Background Grid System - Subtle for Light Mode */}
      <div className='fixed inset-0 pointer-events-none z-0 flex justify-center opacity-40'>
        <div className='w-full h-full max-w-7xl flex justify-between px-4 sm:px-6 lg:px-8'>
          <div className='w-px h-full bg-slate-200'></div>
          <div className='w-px h-full bg-slate-200 hidden md:block'></div>
          <div className='w-px h-full bg-slate-200 hidden lg:block'></div>
          <div className='w-px h-full bg-slate-200'></div>
        </div>
      </div>

      {/* Ambient Glow - Adjusted for Medical/Clean vibe */}
      <div className='fixed top-0 left-0 w-full h-screen pointer-events-none z-0'>
        <div className='absolute top-[-10%] left-[10%] w-[50vw] h-[50vw] bg-teal-200/40 rounded-full blur-[100px] animate-pulse-slow' />
        <div className='absolute bottom-[-10%] right-[5%] w-[40vw] h-[40vw] bg-blue-200/40 rounded-full blur-[80px]' />
      </div>

      <main className='relative z-10'>{children}</main>
    </div>
  );
};

export default Layout;
