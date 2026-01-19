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
          <Section className='border-t border-slate-200 bg-white z-10'>
            <div className='text-center max-w-4xl mx-auto'>
              <Reveal width='100%'>
                <h2 className='md:text-8xl uppercase text-5xl font-light text-slate-900 tracking-tighter font-display mb-8'>
                  {cta.headline} <span className='text-teal-600 font-medium'>{cta.highlight}</span>
                </h2>
              </Reveal>
              <Reveal width='100%' delay={0.4}>
                <p className='text-xl text-slate-500 font-sans max-w-xl mx-auto mb-10'>
                  {cta.description}
                </p>
                <div>
                  <Button href='#contact' variant='glow'>
                    {cta.buttonText}
                  </Button>
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
