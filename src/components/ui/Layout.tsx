import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='relative min-h-screen font-sans text-slate-600 bg-slate-50 overflow-x-hidden selection:bg-teal-500/20 selection:text-teal-900'>
      {/* Background Grid System - Subtle for Light Mode */}
      <div className='fixed inset-0 pointer-events-none z-0 flex justify-center opacity-40'>
        <div className='w-full h-full max-w-7xl flex justify-between px-4'>
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
