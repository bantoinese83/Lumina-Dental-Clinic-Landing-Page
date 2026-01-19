import React from 'react';
import { motion } from 'framer-motion';
import Reveal from './ui/Reveal';
import Counter from './ui/Counter';
import Badge from './ui/Badge';
import TiltCard from './ui/TiltCard';
import DentistryIcon from './ui/DentistryIcon';
import { siteConfig } from '../config/config';

const Hero: React.FC = () => {
  const { hero, metrics } = siteConfig;

  return (
    <section className='relative pt-40 pb-20 md:pt-52 md:pb-32 overflow-hidden z-10 perspective-1000'>
      <div className='container mx-auto px-4 relative max-w-7xl'>
        <div className='flex flex-col text-center mb-24 relative space-y-0 items-center justify-center'>
          {/* Decorative Side Label */}
          <div className='absolute -left-4 md:left-20 top-0 flex flex-col gap-2 opacity-50 hidden lg:flex'>
            <Reveal delay={0.5}>
              <span className='text-[10px] uppercase tracking-widest text-teal-600 font-sans font-semibold'>
                Est. 2008
              </span>
              <div className='w-px h-12 bg-gradient-to-b to-transparent from-teal-500 mx-auto'></div>
            </Reveal>
          </div>

          {/* Main Title */}
          <div className='flex flex-col z-10 w-full items-center justify-center'>
            <h1 className='uppercase leading-[0.9] flex flex-wrap justify-center gap-x-4 md:text-8xl md:gap-x-6 text-5xl font-bold text-slate-900 tracking-tighter mt-8 mb-4'>
              <Reveal delay={0.2}>
                <motion.span
                  className='tracking-tighter font-display inline-block text-slate-800'
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                >
                  {hero.headline.prefix}
                </motion.span>
              </Reveal>
              <Reveal delay={0.3}>
                <motion.span
                  className='text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 font-display inline-block'
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 0.5 }}
                >
                  {hero.headline.highlight}
                </motion.span>
              </Reveal>
            </h1>
          </div>

          <div className='flex flex-col md:flex-row md:mt-8 md:mb-12 z-10 w-full mt-6 mb-8 gap-x-6 gap-y-6 items-center justify-center'>
            {/* Status Button with Border Beam */}
            <Reveal delay={0.5}>
              <motion.div
                className='group relative cursor-pointer'
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                {/* Border effect */}
                <div className='absolute inset-0 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 p-[1px] opacity-20 group-hover:opacity-100 transition-opacity'></div>

                <div className='relative bg-white flex group-hover:shadow-lg transition-all md:h-16 h-12 z-10 rounded-full px-2 items-center gap-4 pr-6'>
                  <div className='ml-1 md:w-10 md:h-10 w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center'>
                    <DentistryIcon name={hero.status.icon} size={18} />
                  </div>
                  <div className='flex flex-col text-left'>
                    <span className='text-[10px] uppercase tracking-widest text-teal-600/80 font-sans font-bold'>
                      {hero.status.label}
                    </span>
                    <span className='text-xs md:text-sm leading-none text-slate-800 font-sans font-medium'>
                      {hero.status.value}
                    </span>
                  </div>
                </div>
              </motion.div>
            </Reveal>

            <Reveal delay={0.4}>
              <h2 className='text-lg text-slate-500 tracking-tight font-sans md:text-2xl max-w-xl text-center md:text-left font-light'>
                {hero.subheadline}
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.6}>
            <div className='leading-relaxed md:text-lg text-sm text-slate-400 font-sans text-center max-w-lg mx-auto'>
              {hero.description}
            </div>
          </Reveal>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto perspective-1000'>
          {metrics.map((metric: any, index: number) => (
            <Reveal key={metric.id} delay={0.2 + index * 0.1} width='100%'>
              <TiltCard className='h-full'>
                <div className='bg-white border border-slate-200 p-8 flex flex-col justify-between min-h-[200px] relative group hover:shadow-xl hover:shadow-teal-100/50 hover:border-teal-200 transition-all duration-300 h-full rounded-2xl'>
                  <div className='absolute top-4 right-4 text-xs text-slate-300 font-sans transform translate-z-10'>
                    {/* 0{metric.id} */}
                  </div>
                  <div className='flex justify-between items-start'>
                    <DentistryIcon
                      name={metric.icon}
                      className={`text-2xl ${index === 0 ? 'text-teal-500' : 'text-slate-400'}`}
                      size={32}
                    />
                    {index === 0 && <Badge variant='glow'>Verified</Badge>}
                  </div>
                  <div className='mt-8'>
                    <div className='text-4xl text-slate-900 mb-1 tracking-tighter font-display font-medium translate-z-20'>
                      <Counter value={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
                    </div>
                    <h3 className='text-xs uppercase tracking-widest text-slate-500 font-sans font-semibold'>
                      {metric.label}
                    </h3>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
