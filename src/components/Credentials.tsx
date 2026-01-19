import React from 'react';
import { Award, Building2, Download } from 'lucide-react';
import Section from './ui/Section';

const Credentials: React.FC = () => {
  const credentials = [
    {
      id: 1,
      title: 'Board Certification',
      description: 'American Board of Dental Surgery Certification',
      fileName: 'board-certification.pdf',
      size: '2.4 MB',
      icon: 'certificate',
    },
    {
      id: 2,
      title: 'Professional Licenses',
      description: 'State Dental Practice Licenses & Permits',
      fileName: 'professional-licenses.pdf',
      size: '1.8 MB',
      icon: 'clinic',
    },
    {
      id: 3,
      title: 'Continuing Education',
      description: 'Advanced Training & Certification Records',
      fileName: 'continuing-education.pdf',
      size: '3.2 MB',
      icon: 'certificate',
    },
  ];

  // Map credential icons to Lucide React components
  const getCredentialIcon = (iconName: string) => {
    switch (iconName) {
      case 'certificate':
        return Award;
      case 'clinic':
        return Building2;
      case 'download':
        return Download;
      default:
        return Award; // fallback
    }
  };

  const handleDownload = (_fileName: string) => {
    // In a real implementation, this would call an API endpoint
    // For now, show a placeholder message
    // TODO: Implement actual PDF download functionality with backend integration
    // This will allow patients to download our credentials and qualifications
  };

  return (
    <Section id='credentials' className='bg-slate-50'>
      <div className='text-center mb-12'>
        <h2 className='text-3xl font-bold text-slate-900 mb-4 font-display'>
          Our <span className='text-teal-600'>Credentials</span>
        </h2>
        <p className='text-lg text-slate-600 max-w-2xl mx-auto font-sans'>
          Download our professional qualifications, certifications, and licenses. Transparency in
          healthcare is our commitment to you.
        </p>
      </div>

      <div className='grid md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
        {credentials.map(credential => (
          <div
            key={credential.id}
            className='bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-teal-200 transition-all duration-300 group'
          >
            <div className='flex items-center justify-center w-12 h-12 bg-teal-50 rounded-lg mb-4 group-hover:bg-teal-100 transition-colors'>
              {React.createElement(getCredentialIcon(credential.icon), { size: 24 })}
            </div>

            <h3 className='text-lg font-semibold text-slate-900 mb-2 font-display'>
              {credential.title}
            </h3>

            <p className='text-sm text-slate-600 mb-4 font-sans'>{credential.description}</p>

            <div className='flex items-center justify-between text-xs text-slate-500 mb-4'>
              <span>{credential.fileName}</span>
              <span>{credential.size}</span>
            </div>

            <button
              onClick={() => handleDownload(credential.fileName)}
              className='w-full flex items-center justify-center gap-2 bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors font-medium min-h-[44px]'
            >
              <Download size={16} />
              Download PDF
            </button>
          </div>
        ))}
      </div>

      <div className='text-center mt-8'>
        <p className='text-sm text-slate-500 font-sans'>
          These documents are updated regularly. Last updated: January 2026
        </p>
      </div>
    </Section>
  );
};

export default Credentials;
