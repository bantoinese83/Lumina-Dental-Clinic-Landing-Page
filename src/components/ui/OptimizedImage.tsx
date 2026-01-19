import React, { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean; // For above-the-fold images
  quality?: number;
  placeholder?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  quality = 80,
  placeholder,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate responsive image URLs
  const generateResponsiveSrc = (baseSrc: string, quality: number) => {
    if (baseSrc.includes('unsplash.com')) {
      // Convert Unsplash URLs to WebP with optimization
      return baseSrc.replace('auto=format', 'fm=webp').replace(/q=\d+/, `q=${quality}`);
    }
    return baseSrc;
  };

  const optimizedSrc = generateResponsiveSrc(src, quality);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return; // Don't lazy load priority images

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters viewport
        threshold: 0.1,
      },
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  // Fallback for broken images
  const fallbackSrc = placeholder;

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }} ref={imgRef}>
      {/* Loading skeleton */}
      {!isLoaded && !hasError && (
        <div className='absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center'>
          <div className='w-8 h-8 border-2 border-slate-300 border-t-slate-400 rounded-full animate-spin'></div>
        </div>
      )}

      {/* Main image */}
      {isInView && (
        <img
          src={hasError ? fallbackSrc : optimizedSrc}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding='async'
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          // SEO and accessibility attributes
          itemProp='image'
          role='img'
        />
      )}

      {/* Blur placeholder while loading */}
      {!isLoaded && !hasError && isInView && (
        <img
          src={optimizedSrc}
          alt=''
          width={width}
          height={height}
          className='absolute inset-0 w-full h-full object-cover blur-sm scale-110 opacity-50'
          aria-hidden='true'
          style={{ filter: 'blur(10px)' }}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
