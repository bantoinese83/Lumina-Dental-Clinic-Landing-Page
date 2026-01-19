import React from 'react';
import Layout from './components/ui/Layout';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Workflow from './components/Workflow';
import CaseStudies from './components/CaseStudies';
import Testimonials from './components/Testimonials';
import Credentials from './components/Credentials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Reveal from './components/ui/Reveal';
import Button from './components/ui/Button';
import Section from './components/ui/Section';
import ErrorBoundary from './components/ui/ErrorBoundary';
import { Flame, Gem } from 'lucide-react';
import { siteConfig } from './config/config';

const App: React.FC = () => {
  const { cta } = siteConfig;

  return (
    <ErrorBoundary>
      <Layout>
        <header role='banner'>
          <Navbar />
        </header>

        <main role='main'>
          <Hero />

          {/* Scroll Text Divider */}
          <Section
            noPadding
            className='border-y border-slate-200 overflow-hidden bg-slate-50 py-32'
          >
            <Reveal width='100%'>
              <div className='max-w-6xl mx-auto text-center leading-tight'>
                <h2 className='text-3xl md:text-5xl tracking-tight uppercase leading-[1.3] font-semibold text-slate-900 font-display'>
                  Dentistry Designed <br />
                  <span className='text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500'>
                    Around Your Life.
                  </span>
                </h2>
              </div>
            </Reveal>
          </Section>

          <Workflow />
          <CaseStudies />
          <Credentials />
          <Testimonials />

          {/* CTA Section */}
          <Section className='border-t border-slate-200 bg-gradient-to-br from-slate-50 to-white z-10 relative overflow-hidden'>
            {/* Background decoration */}
            <div className='absolute top-0 right-0 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl -translate-y-48 translate-x-48'></div>
            <div className='absolute bottom-0 left-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl translate-y-48 -translate-x-48'></div>

            <div className='text-center max-w-4xl mx-auto relative z-10'>
              <Reveal width='100%'>
                <h2 className='md:text-8xl uppercase text-5xl font-light text-slate-900 tracking-tighter font-display mb-8'>
                  {cta.headline} <span className='text-teal-600 font-medium'>{cta.highlight}</span>
                </h2>
              </Reveal>

              {/* Social Proof */}
              <Reveal width='100%' delay={0.2}>
                <div className='flex flex-wrap justify-center gap-6 mb-8'>
                  <div className='flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full px-4 py-2 shadow-sm hover-lift transition-all duration-300 animate-fade-in-scale'>
                    <div className='text-yellow-500 text-lg animate-bounce-gentle'>★★★★★</div>
                    <span className='text-sm font-semibold text-slate-700'>4.8/5 Rating</span>
                  </div>
                  <div className='flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full px-4 py-2 shadow-sm hover-lift transition-all duration-300 animate-fade-in-scale'>
                    <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                    <span className='text-sm font-semibold text-slate-700'>480+ Happy Patients</span>
                  </div>
                  <div className='flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full px-4 py-2 shadow-sm hover-lift transition-all duration-300 animate-fade-in-scale'>
                    <div className='w-2 h-2 bg-teal-500 rounded-full animate-glow-pulse'></div>
                    <span className='text-sm font-semibold text-slate-700'>Next Available: Today</span>
                  </div>
                </div>
              </Reveal>

              <Reveal width='100%' delay={0.4}>
                <p className='text-xl text-slate-500 font-sans max-w-xl mx-auto mb-4'>
                  {cta.description}
                </p>
                <p className='text-sm text-slate-400 font-sans mb-8'>
                  ⚡ <strong>Limited spots available this week</strong> • Book now to secure your preferred time
                </p>
                <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                  <Button href='#contact' variant='glow' className='text-lg px-8 py-4 shimmer hover-lift'>
                    {cta.buttonText}
                  </Button>
                  <Button href='tel:555-123-4567' variant='primary' className='text-lg px-8 py-4 hover-lift btn-micro'>
                    📞 Call (555) 123-4567
                  </Button>
                </div>
              </Reveal>

              {/* Urgency indicator */}
              <Reveal width='100%' delay={0.6}>
                <div className='mt-12 pt-8 border-t border-slate-200'>
                  <div className='flex items-center justify-center gap-4 text-sm text-slate-500'>
                    <div className='flex items-center gap-2'>
                      <div className='w-2 h-2 bg-red-500 rounded-full animate-pulse'></div>
                      <span><Flame className='w-4 h-4 inline mr-2 text-orange-500' /> Only 3 appointments left this week</span>
                    </div>
                    <div className='hidden sm:block w-px h-4 bg-slate-300'></div>
                    <div className='hidden sm:flex items-center gap-2'>
                      <span><Gem className='w-4 h-4 inline mr-2 text-blue-500' /> Free consultation for new patients</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </Section>

          <Contact />
        </main>

        <footer role='contentinfo'>
          <Footer />
        </footer>
      </Layout>
    </ErrorBoundary>
  );
};

export default App;
