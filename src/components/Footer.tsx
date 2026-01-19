import React from 'react';
import Reveal from './ui/Reveal';
import Section from './ui/Section';
import DentistryIcon from './ui/DentistryIcon';
import { siteConfig } from '../config/config';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Services',
      links: [
        { label: 'Family Dentistry', href: '#workflows' },
        { label: 'Cosmetic Dentistry', href: '#results' },
        { label: 'Emergency Care', href: '#contact' },
        { label: 'Preventive Care', href: '#credentials' },
      ],
    },
    {
      title: 'Patient Resources',
      links: [
        { label: 'Patient Forms', href: '#' },
        { label: 'Insurance Info', href: '#' },
        { label: 'Payment Options', href: '#' },
        { label: 'Patient Portal', href: '#' },
      ],
    },
    {
      title: 'About Us',
      links: [
        { label: 'Our Team', href: '#' },
        { label: 'Our Technology', href: '#credentials' },
        { label: 'Patient Reviews', href: '#reviews' },
        { label: 'Careers', href: '#' },
      ],
    },
  ];

  return (
    <footer className='bg-white relative z-10'>
      {/* Emergency Banner */}
      <div className='bg-gradient-to-r from-red-50 to-red-100 border-b border-red-200'>
        <div className='container mx-auto px-4 max-w-7xl py-4'>
          <Reveal width='100%'>
            <div className='flex items-center justify-center gap-3 text-sm font-medium text-red-700'>
              <DentistryIcon name='clinic' size={20} className='text-red-500' />
              <span>Emergency Dental Care Available 24/7 - Call (555) 123-4567</span>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Main Footer Content */}
      <Section className='py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16'>
          {/* Brand Section */}
          <div className='lg:col-span-1'>
            <Reveal width='100%'>
              <div className='flex items-center gap-3 mb-6'>
                <div className='w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/25'>
                  <DentistryIcon name='clinic' size={32} className='text-white' />
                </div>
                <div>
                  <h3 className='text-xl font-bold font-display text-slate-900 uppercase tracking-tight'>
                    {siteConfig.name}
                  </h3>
                  <p className='text-xs text-slate-500 uppercase tracking-widest font-medium'>
                    {siteConfig.shortName}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal width='100%' delay={0.1}>
              <p className='text-slate-600 text-sm leading-relaxed mb-8 font-sans'>
                {siteConfig.description}. Experience compassionate, state-of-the-art dental care in
                a comfortable, welcoming environment designed around your comfort and confidence.
              </p>
            </Reveal>

            <Reveal width='100%' delay={0.2}>
              <div className='space-y-4'>
                <div className='flex items-center gap-4 text-sm text-slate-600'>
                  <DentistryIcon name='location' size={20} className='text-teal-500' />
                  <span className='font-sans'>{siteConfig.location}</span>
                </div>
                <div className='flex items-center gap-4 text-sm text-slate-600'>
                  <DentistryIcon name='phone' size={20} className='text-teal-500' />
                  <span className='font-sans'>(555) 123-4567</span>
                </div>
                <div className='flex items-center gap-4 text-sm text-slate-600'>
                  <DentistryIcon name='email' size={20} className='text-teal-500' />
                  <span className='font-sans'>{siteConfig.email}</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={section.title} className='lg:col-span-1'>
              <Reveal width='100%' delay={0.1 * (index + 1)}>
                <h4 className='text-sm font-bold text-slate-900 mb-6 font-display uppercase tracking-widest'>
                  {section.title}
                </h4>
                <ul className='space-y-4'>
                  {section.links.map((link, linkIndex) => (
                    <li key={link.label}>
                      <Reveal width='100%' delay={0.1 * (index + 1) + 0.05 * linkIndex}>
                        <a
                          href={link.href}
                          className='text-slate-600 hover:text-teal-600 transition-colors text-sm font-sans font-medium group flex items-center gap-2'
                        >
                          <span className='w-1 h-1 bg-slate-300 group-hover:bg-teal-500 rounded-full transition-colors'></span>
                          {link.label}
                        </a>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Reveal width='100%'>
          <div className='bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-8 mb-16 border border-slate-200 shadow-sm'>
            <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
              <div className='flex-1'>
                <div className='flex items-center gap-3 mb-3'>
                  <div className='w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center'>
                    <DentistryIcon name='email' size={20} className='text-white' />
                  </div>
                  <h4 className='text-lg font-bold text-slate-900 font-display uppercase tracking-tight'>
                    Stay Connected
                  </h4>
                </div>
                <p className='text-slate-600 text-sm font-sans leading-relaxed'>
                  Get oral health tips, appointment reminders, and clinic updates delivered to your
                  inbox.
                </p>
              </div>
              <div className='flex flex-col sm:flex-row gap-3 w-full md:w-auto md:min-w-[300px]'>
                <input
                  type='email'
                  placeholder='Enter your email address'
                  className='flex-1 px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm font-sans shadow-sm'
                />
                <button className='px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white rounded-lg transition-all duration-200 font-medium text-sm font-sans shadow-sm hover:shadow-md whitespace-nowrap'>
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Bottom Section */}
        <div className='border-t border-slate-200 pt-12'>
          <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8'>
            <Reveal width='100%'>
              <div className='flex flex-col sm:flex-row items-center gap-6 text-sm text-slate-500'>
                <p className='font-sans font-medium'>
                  © {currentYear} {siteConfig.name}. All Rights Reserved.
                </p>
                <div className='flex gap-6'>
                  <a
                    href='#'
                    className='hover:text-teal-600 transition-colors font-sans font-medium'
                  >
                    Privacy Policy
                  </a>
                  <a
                    href='#'
                    className='hover:text-teal-600 transition-colors font-sans font-medium'
                  >
                    Terms of Service
                  </a>
                  <a
                    href='#'
                    className='hover:text-teal-600 transition-colors font-sans font-medium'
                  >
                    HIPAA Notice
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Social Links */}
            <Reveal width='100%' delay={0.1}>
              <div className='flex items-center gap-3'>
                {siteConfig.socials.map((social: any) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    className='w-12 h-12 bg-white hover:bg-gradient-to-br hover:from-teal-500 hover:to-blue-600 border border-slate-200 hover:border-transparent rounded-xl flex items-center justify-center transition-all duration-200 group shadow-sm hover:shadow-md'
                    aria-label={social.platform}
                  >
                    <DentistryIcon
                      name={social.icon}
                      size={24}
                      className='text-slate-500 group-hover:text-white transition-colors'
                    />
                  </a>
                ))}

                {/* Additional Social Links */}
                <a
                  href='#'
                  className='w-12 h-12 bg-white hover:bg-blue-600 border border-slate-200 hover:border-transparent rounded-xl flex items-center justify-center transition-all duration-200 group shadow-sm hover:shadow-md'
                  aria-label='Facebook'
                >
                  <DentistryIcon
                    name='clinic'
                    size={24}
                    className='text-slate-500 group-hover:text-white transition-colors'
                  />
                </a>
                <a
                  href='#'
                  className='w-12 h-12 bg-white hover:bg-pink-600 border border-slate-200 hover:border-transparent rounded-xl flex items-center justify-center transition-all duration-200 group shadow-sm hover:shadow-md'
                  aria-label='Instagram'
                >
                  <DentistryIcon
                    name='smile'
                    size={24}
                    className='text-slate-500 group-hover:text-white transition-colors'
                  />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Accreditation and Certifications */}
          <Reveal width='100%' delay={0.2}>
            <div className='mt-8 pt-8 border-t border-slate-200'>
              <div className='flex flex-col sm:flex-row items-center justify-center gap-8 text-xs text-slate-500 uppercase tracking-widest font-medium'>
                <div className='flex items-center gap-3'>
                  <DentistryIcon name='certificate' size={20} className='text-teal-500' />
                  <span className='font-sans'>ADA Accredited Practice</span>
                </div>
                <div className='flex items-center gap-3'>
                  <DentistryIcon name='shield' size={20} className='text-teal-500' />
                  <span className='font-sans'>HIPAA Compliant</span>
                </div>
                <div className='flex items-center gap-3'>
                  <DentistryIcon name='award' size={20} className='text-teal-500' />
                  <span className='font-sans'>Member of Local Dental Association</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </footer>
  );
};

export default Footer;
