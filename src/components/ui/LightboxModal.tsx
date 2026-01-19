import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: Array<{
    id: number;
    title: string;
    category: string;
    description?: string;
    duration?: string;
    result?: string;
    image: string;
    isBeforeAfter?: boolean;
  }>;
  currentIndex: number;
  onNavigate: (index: number) => void;
}

const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
}) => {
  const [zoom, setZoom] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentImage = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          handlePrev();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case '+':
        case '=':
          setZoom(prev => Math.min(prev + 0.25, 3));
          break;
        case '-':
          setZoom(prev => Math.max(prev - 0.25, 0.5));
          break;
        case '0':
          setZoom(1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setZoom(1);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        onNavigate(currentIndex - 1);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        onNavigate(currentIndex + 1);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => setZoom(1);

  if (!isOpen || !currentImage) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation buttons */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {currentIndex < images.length - 1 && (
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Zoom controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-black/50 rounded-full p-2">
        <button
          onClick={handleZoomOut}
          className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleResetZoom}
          className="px-3 py-2 text-white/70 hover:text-white text-sm font-mono"
        >
          {Math.round(zoom * 100)}%
        </button>
        <button
          onClick={handleZoomIn}
          className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
      </div>

      {/* Main image */}
      <div
        className={`relative max-w-[90vw] max-h-[90vh] transition-all duration-300 ${
          isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
        style={{
          transform: `scale(${zoom})`,
          cursor: zoom > 1 ? 'grab' : 'default',
        }}
      >
        <OptimizedImage
          src={currentImage.image}
          alt={`${currentImage.title} - ${currentImage.category}`}
          className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
          quality={95}
          priority
        />
      </div>

      {/* Image info overlay */}
      <div className="absolute bottom-20 left-4 right-4 z-10">
        <div className="bg-black/70 backdrop-blur-sm rounded-lg p-6 text-white max-w-2xl">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-2xl font-display font-medium">{currentImage.title}</h3>
            {currentImage.isBeforeAfter && (
              <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-400/50 rounded-full text-xs font-medium text-emerald-300">
                Before/After
              </span>
            )}
          </div>
          <p className="text-sm text-white/80 uppercase tracking-wider font-medium mb-3">{currentImage.category}</p>

          {currentImage.description && (
            <p className="text-white/90 mb-4 leading-relaxed">{currentImage.description}</p>
          )}

          <div className="flex items-center gap-6 text-sm">
            {currentImage.duration && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <span className="text-white/80">Duration: <span className="text-white font-medium">{currentImage.duration}</span></span>
              </div>
            )}
            {currentImage.result && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-white/80">Result: <span className="text-white font-medium">{currentImage.result}</span></span>
              </div>
            )}
          </div>

          <div className="mt-4 text-xs text-white/50 border-t border-white/20 pt-3">
            {currentIndex + 1} of {images.length} • Click outside or press ESC to close
          </div>
        </div>
      </div>
    </div>
  );
};

export default LightboxModal;