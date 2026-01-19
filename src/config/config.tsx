// Using Lucide React icons
import { SiteConfig } from '../types/types';

export const siteConfig: SiteConfig = {
  name: 'Lumina Dental',
  shortName: 'Lumina',
  description: 'Advanced Family & Cosmetic Dentistry',
  email: 'care@luminadental.com',
  location: '123 Wellness Blvd, Suite 100',
  nav: [
    { label: 'Our Journey', href: '#workflows' },
    { label: 'Smile Gallery', href: '#results' },
    { label: 'Credentials', href: '#credentials' },
    { label: 'Reviews', href: '#reviews' },
  ],
  socials: [
    { platform: 'Phone', url: 'tel:555-123-4567' },
    { platform: 'Email', url: 'mailto:care@luminadental.com' },
  ],
  hero: {
    status: {
      label: 'Next Availability',
      value: 'Today at 2:00 PM',
    },
    headline: {
      prefix: 'Modern Dentistry.',
      highlight: 'Timeless Smiles.',
    },
    subheadline:
      'Experience pain-free, state-of-the-art dental care designed around your comfort and confidence.',
    description:
      'From routine hygiene to complex cosmetic reconstruction, we combine advanced technology with compassionate care.',
  },
  metrics: [
    {
      id: 1,
      label: 'Patients Treated',
      value: 12500,
      prefix: '+',
    },
    {
      id: 2,
      label: 'Years Experience',
      value: 15,
      prefix: '',
      suffix: '+',
    },
    {
      id: 3,
      label: '5-Star Reviews',
      value: 480,
      prefix: '',
    },
  ],
  workflow: {
    title: 'The Patient',
    subtitle: 'Experience',
    steps: [
      {
        id: 1,
        title: 'Digital Consultation',
        description:
          'Your journey begins with a comprehensive 3D scan and digital assessment. No uncomfortable molds, just precision diagnostics.',
        details: ['3D Cone Beam Imaging', 'Digital Smile Design', 'Insurance Verification'],
        image:
          'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1600&auto=format&fit=crop',
        accentColor: 'text-teal-500',
        monoText: 'DIAGNOSTICS INITIALIZED',
      },
      {
        id: 2,
        title: 'Comfort-First Treatment',
        description:
          'Relax in our noise-canceling suites while we perform your treatment using minimally invasive laser technology.',
        details: ['Sedation Options', 'Laser Dentistry', 'Noise-Canceling Headphones'],
        image:
          'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1600&auto=format&fit=crop',
        accentColor: 'text-blue-500',
        monoText: 'COMFORT PROTOCOLS ACTIVE',
      },
      {
        id: 3,
        title: 'Aftercare & Glow',
        description:
          'Leave with a brighter smile and a personalized digital care plan directly to your phone. We track your healing remotely.',
        details: ['Digital Care Plan', '24/7 Virtual Support', 'Whitening Take-Home Kit'],
        image:
          'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1600&auto=format&fit=crop',
        accentColor: 'text-indigo-500',
        monoText: 'SMILE OPTIMIZED',
      },
    ],
  },
  caseStudies: {
    title: 'Smile Gallery',
    subtitle: 'Real Results / Real Patients',
    items: [
      {
        id: 1,
        title: 'Invisalign Correction',
        category: 'ORTHODONTICS',
        image:
          'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1600&auto=format&fit=crop',
        span: 'full',
      },
      {
        id: 2,
        title: 'Porcelain Veneers',
        category: 'COSMETIC',
        image:
          'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=1600&auto=format&fit=crop',
        span: 'third',
      },
      {
        id: 3,
        title: 'Full Arch Implant',
        category: 'RESTORATIVE',
        image:
          'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=1600&auto=format&fit=crop',
        span: 'third',
      },
      {
        id: 4,
        title: 'Laser Whitening',
        category: 'HYGIENE',
        image:
          'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=1600&auto=format&fit=crop',
        span: 'third',
      },
      {
        id: 5,
        title: 'Smile Makeover',
        category: 'COMPLETE CARE',
        image:
          'https://images.unsplash.com/photo-1606811835619-0cd1f4d1c1c4?q=80&w=1600&auto=format&fit=crop',
        span: 'full',
      },
    ],
  },
  testimonials: {
    title: 'Patient',
    highlight: 'Stories',
    items: [
      {
        id: 1,
        quote:
          'I used to be terrified of the dentist. Lumina changed everything. The laser treatment was painless, and the staff is incredibly kind.',
        author: 'Sarah Jenkins',
        role: 'Patient since 2021',
      },
      {
        id: 2,
        quote:
          'The digital scanning technology is amazing. No more goopy molds! My Invisalign trays fit perfectly from day one.',
        author: 'Michael Ross',
        role: 'Invisalign Patient',
      },
      {
        id: 3,
        quote:
          "Dr. Evans is an artist. My veneers look so natural, I can't stop smiling. Best investment I've ever made.",
        author: 'Elena R.',
        role: 'Cosmetic Patient',
      },
    ],
  },
  cta: {
    headline: 'Your Best Smile',
    highlight: 'Starts Here.',
    description: 'Schedule your comprehensive exam today and experience the future of dentistry.',
    buttonText: 'Book Appointment',
  },
  contact: {
    title: 'Request Appointment',
    description:
      'Fill out the form below to request a time. Our coordinators will contact you within 2 hours to confirm.',
  },
};
