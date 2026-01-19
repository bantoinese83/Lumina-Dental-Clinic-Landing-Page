import React from 'react';
import Reveal from './ui/Reveal';
import Badge from './ui/Badge';
import Section from './ui/Section';
import OptimizedImage from './ui/OptimizedImage';
import { siteConfig } from '../config/config';
import Button from './ui/Button';
import { FileText } from 'lucide-react';

const CaseStudies: React.FC = () => {
  const { caseStudies } = siteConfig;
  const items = caseStudies.items;

  return (
    <Section id='results' className='bg-slate-50 text-slate-900 border-t border-slate-200'>
      <div className='flex flex-col md:flex-row justify-between items-end mb-12 pb-8 border-b border-slate-200'>
        <Reveal>
          <h2 className='text-5xl md:text-7xl uppercase mb-2 text-slate-900 tracking-tighter font-display font-light'>
            {caseStudies.title}
          </h2>
          <p className='text-xs uppercase tracking-widest text-teal-600 font-sans font-bold'>
            {caseStudies.subtitle}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          {/* Added Credential/Form Download */}
          <Button variant='link' icon={true} className='text-slate-500 hover:text-teal-600'>
            <FileText className='w-4 h-4 mr-2' />
            Download Patient Forms
          </Button>
        </Reveal>
      </div>

      {/* Mosaic Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 mb-20 items-stretch'>
        {/* Column 1 */}
        <div className='flex flex-col gap-1 h-full'>
          {items[0] && <ProjectCard project={items[0]} />}
        </div>

        {/* Column 2 */}
        <div className='flex flex-col gap-1 h-full aspect-[9/16] md:aspect-auto'>
          {items[1] && <ProjectCard project={items[1]} className='flex-1' />}
          {items[2] && <ProjectCard project={items[2]} className='flex-1' />}
          {items[3] && <ProjectCard project={items[3]} className='flex-1' />}
        </div>

        {/* Column 3 */}
        <div className='flex flex-col gap-1 h-full'>
          {items[4] && <ProjectCard project={items[4]} />}
        </div>
      </div>
    </Section>
  );
};

const ProjectCard = ({
  project,
  className = '',
}: {
  project: (typeof siteConfig.caseStudies.items)[0];
  className?: string;
}) => (
  <div
    className={`bg-white border border-slate-200 w-full relative group overflow-hidden ${className} ${project.span === 'full' ? 'aspect-[9/16]' : ''}`}
  >
    <div className='absolute top-4 right-4 z-20'>
      <Badge variant='outline'>{project.category}</Badge>
    </div>
    <OptimizedImage
      src={project.image}
      alt={`${project.title} - ${project.category} case study`}
      className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
    />
    {/* Gradient overlay on hover */}
    <div className='absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500'></div>

    <div className='absolute bottom-6 left-6 z-20 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500'>
      <h3 className='text-xl uppercase tracking-tight font-display text-white font-medium'>
        {project.title}
      </h3>
      <div className='h-0.5 w-8 bg-teal-400 mt-2'></div>
    </div>
  </div>
);

export default CaseStudies;
