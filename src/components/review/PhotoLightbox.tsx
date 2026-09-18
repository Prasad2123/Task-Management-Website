import React, { useEffect } from 'react';
import type { PhotoEvidence } from '@/types/approval';
import { formatToIndiaTime } from '@/lib/dateUtils';
import { formatCoordinates, formatAccuracy } from '@/lib/geoUtils';
import { X, Navigation, Calendar, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface PhotoLightboxProps {
  photos: PhotoEvidence[];
  selectedIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
  photoUrls: Record<string | number, string>;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photos,
  selectedIndex,
  onClose,
  onSelectIndex,
  photoUrls
}) => {
  const isOpen = selectedIndex != null && selectedIndex >= 0 && selectedIndex < photos.length;

  useEffect(() => {
    if (!isOpen || selectedIndex == null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && selectedIndex > 0) onSelectIndex(selectedIndex - 1);
      if (e.key === 'ArrowRight' && selectedIndex < photos.length - 1) onSelectIndex(selectedIndex + 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, photos.length, onClose, onSelectIndex]);

  if (!isOpen || selectedIndex == null) {
    return null;
  }

  const currentPhoto = photos[selectedIndex];
  const currentUrl = photoUrls[currentPhoto.id] || currentPhoto.photo_url;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 select-none animate-in fade-in duration-200">
      <div className="flex items-center justify-between text-white z-10">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/20 uppercase tracking-wider">
            {currentPhoto.category.replace(/_/g, ' ')}
          </span>
          <span className="text-xs text-white/70 font-medium">
            {selectedIndex + 1} of {photos.length}
          </span>
        </div>

        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          title="Close (Esc)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        {selectedIndex > 0 && (
          <button
            onClick={() => onSelectIndex(selectedIndex - 1)}
            className="absolute left-2 sm:left-4 z-10 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors shadow-lg border border-white/10 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {currentUrl ? (
          <img
            src={currentUrl}
            alt={currentPhoto.title || 'Work Evidence Photo'}
            className="max-h-[72vh] max-w-[92vw] object-contain rounded-xl shadow-2xl transition-transform duration-200"
          />
        ) : (
          <div className="w-64 h-64 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-white/50 space-y-2">
            <ImageIcon className="w-12 h-12 text-white/30" />
            <span className="text-xs">Loading or signed URL unavailable</span>
          </div>
        )}

        {selectedIndex < photos.length - 1 && (
          <button
            onClick={() => onSelectIndex(selectedIndex + 1)}
            className="absolute right-2 sm:right-4 z-10 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors shadow-lg border border-white/10 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      <div className="bg-black/60 border border-white/10 rounded-2xl p-4 text-white max-w-2xl mx-auto w-full space-y-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="font-bold text-sm sm:text-base leading-snug">
              {currentPhoto.title || `Evidence #${currentPhoto.id}`}
            </h4>
            {currentPhoto.caption && (
              <p className="text-xs text-white/80 mt-0.5">{currentPhoto.caption}</p>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/70 shrink-0">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatToIndiaTime(currentPhoto.created_at)}</span>
          </div>
        </div>

        {(currentPhoto.latitude != null || currentPhoto.accuracy_meters != null) && (
          <div className="flex items-center gap-3 pt-2 border-t border-white/10 text-xs text-emerald-400 font-medium">
            <div className="flex items-center gap-1">
              <Navigation className="w-3.5 h-3.5" />
              <span>GPS: {formatCoordinates(currentPhoto.latitude, currentPhoto.longitude)}</span>
            </div>
            {currentPhoto.accuracy_meters != null && (
              <span className="text-white/60">Accuracy: {formatAccuracy(currentPhoto.accuracy_meters)}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
