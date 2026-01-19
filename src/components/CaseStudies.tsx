import React, { useState } from 'react';
import Reveal from './ui/Reveal';
import Badge from './ui/Badge';
import Section from './ui/Section';
import OptimizedImage from './ui/OptimizedImage';
import LightboxModal from './ui/LightboxModal';
import { siteConfig } from '../config/config';
import Button from './ui/Button';
import { FileText, Expand } from 'lucide-react';

const CaseStudies: React.FC = () => {
  const { caseStudies } = siteConfig;
  const allItems = caseStudies.items;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Get unique categories
  const categories = ['ALL', ...Array.from(new Set(allItems.map(item => item.category)))];

  // Filter items based on selected category
  const items = selectedCategory === 'ALL'
    ? allItems
    : allItems.filter(item => item.category === selectedCategory);

  const openLightbox = (filteredIndex: number) => {
    // Find the original index in the full array
    const originalItem = items[filteredIndex];
    const originalIndex = allItems.findIndex(item => item.id === originalItem.id);
    setCurrentImageIndex(originalIndex);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const navigateLightbox = (originalIndex: number) => {
    setCurrentImageIndex(originalIndex);
  };

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

      {/* Category Filter */}
      <div className='flex flex-wrap justify-center gap-2 mb-8'>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-bold rounded-full transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/25'
                : 'bg-white/80 text-slate-600 hover:bg-white hover:text-teal-600 border border-slate-200'
            }`}
          >
            {category === 'ALL' ? 'All Treatments' : category}
          </button>
        ))}
      </div>

      {/* Mosaic Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 mb-20 items-stretch'>
        {/* Column 1 */}
        <div className='flex flex-col gap-1 h-full'>
          {items[0] && <ProjectCard project={items[0]} index={0} onClick={openLightbox} />}
        </div>

        {/* Column 2 */}
        <div className='flex flex-col gap-1 h-full aspect-[9/16] md:aspect-auto'>
          {items[1] && <ProjectCard project={items[1]} index={1} onClick={openLightbox} className='flex-1' />}
          {items[2] && <ProjectCard project={items[2]} index={2} onClick={openLightbox} className='flex-1' />}
          {items[3] && <ProjectCard project={items[3]} index={3} onClick={openLightbox} className='flex-1' />}
        </div>

        {/* Column 3 */}
        <div className='flex flex-col gap-1 h-full'>
          {items[4] && <ProjectCard project={items[4]} index={4} onClick={openLightbox} />}
        </div>

        {/* Empty state when no items match filter */}
        {items.length === 0 && (
          <div className='col-span-full text-center py-16'>
            <p className='text-slate-500 text-lg'>No treatments found for this category.</p>
            <button
              onClick={() => setSelectedCategory('ALL')}
              className='mt-4 text-teal-600 hover:text-teal-700 font-medium'
            >
              Show all treatments
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        images={items}
        currentIndex={currentImageIndex}
        onNavigate={navigateLightbox}
      />
    </Section>
  );
};

const ProjectCard = ({
  project,
  className = '',
  index,
  onClick,
}: {
  project: (typeof siteConfig.caseStudies.items)[0];
  className?: string;
  index: number;
  onClick: (index: number) => void;
}) => (
  <div
    className={`bg-white border border-slate-200 w-full relative group overflow-hidden cursor-pointer focus-within:ring-2 focus-within:ring-teal-400 focus-within:ring-offset-2 ${className} ${project.span === 'full' ? 'aspect-[9/16]' : ''}`}
    onClick={() => onClick(index)}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick(index);
      }
    }}
    aria-label={`View ${project.title} - ${project.category} case study in full screen`}
  >
    {/* Expand icon */}
    <div className='absolute top-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300'>
      <div className='p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg'>
        <Expand className='w-4 h-4 text-slate-700' />
      </div>
    </div>

    <div className='absolute top-4 right-4 z-20 flex flex-col gap-2 items-end'>
      {project.isBeforeAfter && (
        <Badge variant='outline' className='bg-emerald-500/90 backdrop-blur-sm border-emerald-400 text-white text-xs px-2 py-1'>
          Before/After
        </Badge>
      )}
      <Badge variant='outline' className='bg-white/90 backdrop-blur-sm border-slate-300'>
        {project.category}
      </Badge>
    </div>

    <OptimizedImage
      src={project.image}
      alt={`${project.title} - ${project.category} case study`}
      className='absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out'
    />

    {/* Enhanced gradient overlay with multiple layers */}
    <div className='absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500'></div>
    <div className='absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700'></div>

    {/* Shine effect */}
    <div className='absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700'>
      <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out'></div>
    </div>

    <div className='absolute bottom-6 left-6 right-6 z-20 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100'>
      <h3 className='text-xl uppercase tracking-tight font-display text-white font-medium mb-2 leading-tight'>
        {project.title}
      </h3>
      <div className='h-0.5 w-12 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full'></div>
      <p className='text-xs text-white/80 mt-3 uppercase tracking-widest font-medium'>
        Click to view full size
      </p>
    </div>

    {/* Focus indicator */}
    <div className='absolute inset-0 ring-2 ring-teal-400 ring-offset-2 ring-offset-white opacity-0 focus-within:opacity-100 transition-opacity duration-200 pointer-events-none'></div>
  </div>
);

export default CaseStudies;
