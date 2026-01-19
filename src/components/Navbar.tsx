import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '../config/config';
import Button from './ui/Button';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside or on navigation
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMobileMenuOpen && !target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <nav
      className='fixed top-6 left-0 right-0 z-50 flex justify-center px-4 animate-[fadeIn_0.8s_ease-out_0.1s_both]'
      role='navigation'
      aria-label='Main navigation'
    >
      <div
        className={`flex w-full max-w-4xl transition-all duration-300 border border-slate-200 bg-white/80 pt-2 pr-2 pb-2 pl-4 shadow-xl shadow-slate-200/50 backdrop-blur-xl gap-x-1 gap-y-1 items-center justify-between rounded-full ${scrolled ? 'bg-white/90' : 'bg-white/80'}`}
      >
        <a
          href='#'
          className='font-bold text-lg tracking-tight text-slate-800 font-display'
          aria-label={`${siteConfig.name} - Go to homepage`}
        >
          {siteConfig.shortName}
          <span className='text-teal-600'>.</span>
        </a>

        <div className='hidden md:flex items-center gap-1'>
          {siteConfig.nav.slice(0, 2).map((link: any) => (
            <a
              key={link.href}
              href={link.href}
              className='hover:text-teal-600 px-4 py-2 text-xs tracking-wide uppercase transition-colors text-slate-500 font-sans font-medium'
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Center Logo/Icon */}
        <div className='hidden md:flex px-6 text-xl md:text-2xl text-slate-800 uppercase items-center gap-2 tracking-tighter font-display font-medium'>
          <div className='w-2 h-2 rounded-full bg-teal-500 animate-pulse shadow-[0_0_12px_rgba(13,148,136,0.8)]'></div>
          {siteConfig.name}
        </div>

        <div className='hidden md:flex items-center gap-1'>
          {siteConfig.nav.slice(2).map((link: any) => (
            <a
              key={link.href}
              href={link.href}
              className='hover:text-teal-600 px-4 py-2 text-xs tracking-wide uppercase transition-colors text-slate-500 font-sans font-medium'
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className='flex items-center gap-2'>
          <Button href='#contact' variant='primary' className='hidden sm:flex'>
            Book Now
          </Button>
          <Button
            variant='icon'
            className='md:hidden text-slate-500 hover:text-slate-900'
            aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} aria-hidden='true' /> : <Menu size={20} aria-hidden='true' />}
          </Button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className='mobile-menu-container fixed inset-0 top-20 z-40 md:hidden'>
            <div className='bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl mx-4 mt-4 shadow-2xl overflow-hidden'>
              <div className='flex flex-col py-6'>
                {/* Mobile Navigation Links */}
                <div className='space-y-1 px-4'>
                  {siteConfig.nav.map((link: any) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className='block py-4 px-4 text-slate-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors font-medium'
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>

                {/* Mobile CTA Button */}
                <div className='px-4 pt-4 border-t border-slate-100 mt-4'>
                  <Button
                    href='#contact'
                    variant='primary'
                    className='w-full justify-center'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
