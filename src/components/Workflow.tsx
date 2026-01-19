import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Stethoscope, Activity, Heart } from 'lucide-react';
import OptimizedImage from './ui/OptimizedImage';
import { siteConfig } from '../config/config';

const Workflow: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const { workflow } = siteConfig;

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && activeStep < workflow.steps.length) {
      setActiveStep(prev => prev + 1);
    }
    if (isRightSwipe && activeStep > 1) {
      setActiveStep(prev => prev - 1);
    }
  };

  // Map workflow step icons to Lucide React components
  const getWorkflowIcon = (iconName: string) => {
    switch (iconName) {
      case 'consultation':
        return Stethoscope;
      case 'treatment':
        return Activity;
      case 'aftercare':
        return Heart;
      default:
        return Stethoscope; // fallback
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const stepElements = document.querySelectorAll('.workflow-step-content');
      stepElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
          const stepId = Number(el.getAttribute('data-step'));
          if (stepId) setActiveStep(stepId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id='workflows'
      ref={sectionRef}
      className='z-10 border-b border-slate-200 bg-white relative'
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl'>
        <div className='flex flex-col lg:flex-row'>
          {/* Sticky Left Side */}
          <div className='lg:w-1/2 lg:h-screen sticky top-0 flex flex-col justify-center py-12 lg:py-0 pr-0 lg:pr-20 lg:border-r border-slate-200'>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className='text-5xl md:text-6xl uppercase mb-8 lg:mb-8 text-slate-900 tracking-tighter font-display font-bold'
            >
              {workflow.title}
              <br />
              <span className='text-teal-600'>{workflow.subtitle}</span>
            </motion.h2>

            {/* Steps Navigation */}
            <div className='space-y-6 relative mb-12 hidden lg:block'>
              {workflow.steps.map((step: any) => (
                <div
                  key={step.id}
                  className='step-trigger group cursor-pointer flex items-center gap-6'
                  onClick={() => {
                    document
                      .querySelector(`[data-step="${step.id}"]`)
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <div className='h-12 w-[2px] bg-slate-200 relative overflow-hidden'>
                    <motion.div
                      className='absolute top-0 left-0 w-full h-full bg-teal-600'
                      initial={false}
                      animate={{ height: activeStep === step.id ? '100%' : '0%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div>
                    <h3
                      className={`text-xl uppercase tracking-widest font-display transition-colors duration-300 ${activeStep === step.id ? 'text-slate-900 font-bold' : 'text-slate-400'}`}
                    >
                      0{step.id} / {step.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Dynamic Visual Display */}
            <div className='w-full aspect-video bg-slate-100 border border-slate-200 relative overflow-hidden rounded-2xl hidden lg:block shadow-xl shadow-slate-200/50'>
              {workflow.steps.map((step: any) => (
                <motion.div
                  key={step.id}
                  className='absolute inset-0 flex items-center justify-center bg-white'
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{
                    opacity: activeStep === step.id ? 1 : 0,
                    scale: activeStep === step.id ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <OptimizedImage
                    src={step.image}
                    alt={`${step.title} - ${step.description}`}
                    className='absolute inset-0 w-full h-full object-cover'
                    priority={step.id === 1} // Prioritize first step image
                  />
                  {/* Gradient overlay for text readability */}
                  <div className='absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent'></div>

                  <div className='relative z-10 text-center'>
                    {React.createElement(
                      getWorkflowIcon(
                        step.id === 1 ? 'consultation' : step.id === 2 ? 'treatment' : 'aftercare',
                      ),
                      {
                        className: 'mx-auto text-4xl text-white mb-2 drop-shadow-lg',
                        size: 48,
                      },
                    )}
                    <div
                      className={
                        'text-xs font-mono font-bold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white tracking-widest'
                      }
                    >
                      {step.monoText}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Scrolling Right Side */}
          <div className='lg:w-1/2'>
            <div className='h-[20vh] hidden lg:block' />

            {workflow.steps.map(step => (
              <div
                key={step.id}
                data-step={step.id}
                className='workflow-step-content min-h-[60vh] sm:min-h-[50vh] lg:min-h-[80vh] flex flex-col justify-center px-4 sm:px-8 lg:px-20 py-12 lg:py-20 border-b border-slate-100 last:border-0'
              >
                <span className='text-6xl text-slate-100 font-bold mb-6 font-display'>
                  0{step.id}
                </span>
                <h3 className='text-3xl text-slate-900 mb-6 font-display tracking-tight font-bold'>
                  {step.title}
                </h3>

                {/* Mobile Image Fallback */}
                <div className='w-full aspect-video bg-slate-100 border border-slate-200 relative overflow-hidden rounded-xl mb-8 block lg:hidden shadow-lg'>
                  <OptimizedImage
                    src={step.image}
                    alt={`${step.title} mobile view`}
                    className='absolute inset-0 w-full h-full object-cover'
                  />
                  <div className='absolute inset-0 bg-black/30'></div>
                  <div className='absolute inset-0 flex items-center justify-center z-10'>
                    {React.createElement(
                      getWorkflowIcon(
                        step.id === 1 ? 'consultation' : step.id === 2 ? 'treatment' : 'aftercare',
                      ),
                      {
                        className: 'text-white',
                        size: 40,
                      },
                    )}
                  </div>
                </div>

                <p className='text-slate-600 leading-relaxed mb-8 font-sans text-lg'>
                  {step.description}
                </p>

                <ul className='space-y-4 font-sans text-sm text-slate-500 font-medium'>
                  {step.details.map((detail: string, idx: number) => (
                    <li key={idx} className='flex items-center gap-3'>
                      <CheckCircle className={'w-5 h-5 text-teal-500'} />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workflow;
