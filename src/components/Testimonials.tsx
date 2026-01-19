import React from 'react';
import DentistryIcon from './ui/DentistryIcon';
import { siteConfig } from '../config/config';

const Testimonials: React.FC = () => {
  const { testimonials } = siteConfig;

  return (
    <section
      id='reviews'
      className='border-t border-slate-200 overflow-hidden z-10 pt-24 pb-24 relative bg-white'
    >
      <div className='container mx-auto px-4 max-w-7xl mb-12'>
        <h2 className='text-3xl md:text-5xl uppercase text-center text-slate-900 tracking-tighter font-display font-light'>
          {testimonials.title}{' '}
          <span className='text-teal-600 font-medium'>{testimonials.highlight}</span>
        </h2>
      </div>

      {/* Marquee Container */}
      <div className='w-full relative overflow-hidden py-10 mask-linear-fade'>
        <div className='absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none'></div>
        <div className='absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none'></div>

        <div className='flex w-max animate-marquee hover:[animation-play-state:paused]'>
          {/* Triplicate the list for infinite seamless loop */}
          {[...testimonials.items, ...testimonials.items, ...testimonials.items].map(
            (item, index) => (
              <div
                key={`${item.id}-${index}`}
                className='mx-4 w-[400px] border border-slate-200 p-8 bg-slate-50 shrink-0 hover:border-teal-200 hover:shadow-lg transition-all duration-300 group rounded-2xl'
              >
                <p className='text-sm leading-relaxed mb-6 text-slate-600 font-sans italic'>
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 flex items-center justify-center bg-white border border-slate-100 rounded-full group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors shadow-sm'>
                    <DentistryIcon
                      name={item.companyIcon}
                      className='text-slate-400 group-hover:text-teal-600'
                      size={20}
                    />
                  </div>
                  <div>
                    <div className='text-xs text-slate-900 uppercase font-bold font-sans'>
                      {item.author}
                    </div>
                    <div className='text-[10px] text-teal-600 uppercase font-sans font-semibold'>
                      {item.role}
                    </div>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
