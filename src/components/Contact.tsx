import React, { useState } from 'react';
import { Mail, MapPin, Smile } from 'lucide-react';
import Reveal from './ui/Reveal';
import Section from './ui/Section';
import Button from './ui/Button';
import { siteConfig } from '../config/config';

const Contact: React.FC = () => {
  const { contact } = siteConfig;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch(
        `${(import.meta as any).env?.VITE_API_BASE_URL ?? 'http://localhost:3001'}/api/contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );

      const data: { success: boolean; message: string } = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        throw new Error(data.message ?? 'Failed to send message');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id='contact' className='border-t border-slate-200 bg-slate-50'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto'>
        {/* Info */}
        <Reveal>
          <h3 className='text-3xl uppercase text-slate-900 mb-6 tracking-tighter font-display font-light'>
            {contact.title}
          </h3>
          <p className='text-sm text-slate-500 mb-8 leading-relaxed font-sans max-w-sm'>
            {contact.description}
          </p>
          <div className='space-y-4 font-sans text-sm'>
            <div className='flex items-center gap-4 text-slate-600 group cursor-pointer hover:text-teal-600 transition-colors'>
              <div className='w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-100'>
                <Mail size={20} />
              </div>
              <span className='font-medium'>{siteConfig.email}</span>
            </div>
            <div className='flex items-center gap-4 text-slate-600'>
              <div className='w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-100'>
                <MapPin size={20} />
              </div>
              <span className='font-medium'>{siteConfig.location}</span>
            </div>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={0.4}>
          <div className='bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100'>
            <form
              className='space-y-8'
              onSubmit={e => {
                e.preventDefault();
                void handleSubmit();
              }}
              role='form'
              aria-labelledby='contact-form-title'
              noValidate
            >
              <div className='group relative'>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className='outline-none focus:border-teal-500 transition-colors peer placeholder-transparent text-slate-800 font-sans bg-transparent w-full border-slate-200 border-b pt-3 pb-3 min-h-[44px]'
                  id='name'
                  placeholder='Name'
                  aria-describedby='name-error'
                  aria-invalid={formData.name.trim() === ''}
                  autoComplete='name'
                />
                <label
                  htmlFor='name'
                  className='absolute left-0 -top-3 text-[10px] text-slate-400 uppercase tracking-widest transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-teal-600 font-sans font-bold'
                >
                  Patient Name
                </label>
              </div>

              <div className='group relative'>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  id='email'
                  required
                  className='w-full bg-transparent border-b border-slate-200 py-3 text-slate-800 outline-none focus:border-teal-500 transition-colors font-sans peer placeholder-transparent min-h-[44px]'
                  placeholder='Email'
                  aria-describedby='email-error'
                  aria-invalid={!formData.email.includes('@')}
                  autoComplete='email'
                />
                <label
                  htmlFor='email'
                  className='absolute left-0 -top-3 text-[10px] text-slate-400 uppercase tracking-widest transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-teal-600 font-sans font-bold'
                >
                  Email Address
                </label>
              </div>

              <div className='group relative'>
                <input
                  type='tel'
                  name='phone'
                  value={formData.phone}
                  onChange={handleInputChange}
                  id='phone'
                  className='w-full bg-transparent border-b border-slate-200 py-3 text-slate-800 outline-none focus:border-teal-500 transition-colors font-sans peer placeholder-transparent min-h-[44px]'
                  placeholder='Phone'
                />
                <label
                  htmlFor='phone'
                  className='absolute left-0 -top-3 text-[10px] text-slate-400 uppercase tracking-widest transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-teal-600 font-sans font-bold'
                >
                  Phone Number
                </label>
              </div>

              <div className='group relative'>
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleInputChange}
                  id='message'
                  rows={3}
                  required
                  className='w-full bg-transparent border-b border-slate-200 py-3 text-slate-800 outline-none focus:border-teal-500 transition-colors font-sans peer placeholder-transparent resize-none min-h-[44px]'
                  placeholder='Details'
                ></textarea>
                <label
                  htmlFor='message'
                  className='absolute left-0 -top-3 text-[10px] text-slate-400 uppercase tracking-widest transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-teal-600 font-sans font-bold'
                >
                  Reason for Visit
                </label>
              </div>

              <div className='pt-2'>
                <Button
                  type='submit'
                  variant='primary'
                  icon={submitStatus === 'success' && !isSubmitting}
                  className='w-full'
                  disabled={isSubmitting}
                  loading={isSubmitting}
                >
                  {isSubmitting
                    ? 'Sending Message...'
                    : submitStatus === 'success'
                      ? 'Message Sent!'
                      : 'Request Appointment'}
                </Button>

                {submitStatus === 'success' && (
                  <div className='mt-4 p-3 bg-green-50 border border-green-200 rounded-lg'>
                    <div className='flex items-center gap-2 text-green-800'>
                      <Smile size={16} />
                      <span className='text-sm font-medium'>
                        Thank you! We&apos;ll contact you within 2 hours.
                      </span>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className='mt-4 p-3 bg-red-50 border border-red-200 rounded-lg'>
                    <div className='flex items-center gap-2 text-red-800'>
                      <span className='text-sm font-medium'>{errorMessage}</span>
                    </div>
                  </div>
                )}

                <p className='text-[10px] text-slate-400 mt-3 text-center'>
                  By submitting, you agree to our Privacy Policy. Data is secure (HIPAA compliant).
                </p>
              </div>
            </form>
          </div>
        </Reveal>
      </div>
    </Section>
  );
};

export default Contact;
