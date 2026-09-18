import React, { useState, useEffect } from 'react';
import type { PhotoEvidence } from '@/types/approval';
import { getFreshPhotoSignedUrl } from '@/services/approvalService';
import { PhotoLightbox } from './PhotoLightbox';
import { formatToIndiaTime } from '@/lib/dateUtils';
import { formatCoordinates, formatAccuracy } from '@/lib/geoUtils';
import { Camera, Navigation, ZoomIn, Image as ImageIcon, AlertCircle } from 'lucide-react';

interface PhotoEvidenceGalleryProps {
  photos?: PhotoEvidence[];
}

export const PhotoEvidenceGallery: React.FC<PhotoEvidenceGalleryProps> = ({ photos = [] }) => {
  const [photoUrls, setPhotoUrls] = useState<Record<string | number, string>>({});
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loadingMap, setLoadingMap] = useState<Record<string | number, boolean>>({});

  useEffect(() => {
    let isMounted = true;

    async function loadUrls() {
      const urls: Record<string | number, string> = {};
      const loading: Record<string | number, boolean> = {};

      for (const p of photos) {
        if (p.photo_url && p.photo_url.startsWith('http')) {
          urls[p.id] = p.photo_url;
        } else if (p.storage_reference) {
          loading[p.id] = true;
        }
      }

      setLoadingMap(loading);

      for (const p of photos) {
        if (p.storage_reference && !urls[p.id]) {
          try {
            const signed = await getFreshPhotoSignedUrl(p.storage_reference);
            if (signed && isMounted) {
              urls[p.id] = signed;
            }
          } catch (e) {
            console.warn('Failed to sign photo:', p.id, e);
          } finally {
            if (isMounted) {
              setLoadingMap(prev => ({ ...prev, [p.id]: false }));
            }
          }
        }
      }

      if (isMounted) {
        setPhotoUrls(urls);
      }
    }

    loadUrls();
    return () => {
      isMounted = false;
    };
  }, [photos]);

  return (
    <section className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <span className="text-[11px] font-bold text-indigo-600 tracking-wider uppercase block">
            Section 7 • Visual & Photographic Verification
          </span>
          <h3 className="text-base font-bold text-slate-900 mt-0.5">
            Photo Evidence
          </h3>
        </div>

        <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
          {photos.length} Captured
        </span>
      </div>

      {photos.length === 0 ? (
        <div className="bg-slate-50 rounded-xl p-8 text-center text-slate-500 space-y-2">
          <Camera className="w-8 h-8 text-slate-400 mx-auto" />
          <span className="text-sm font-semibold text-slate-700 block">
            No Photographic Evidence Uploaded
          </span>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No visual proof was submitted for this work order before final sign-off.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {photos.map((photo, index) => {
            const url = photoUrls[photo.id] || photo.photo_url;
            const isLoading = loadingMap[photo.id];

            return (
              <div
                key={photo.id || index}
                onClick={() => setLightboxIndex(index)}
                className="group relative bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden cursor-pointer hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-4/3 bg-slate-900/5 flex items-center justify-center overflow-hidden">
                  {url ? (
                    <img
                      src={url}
                      alt={photo.title || 'Work photo'}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    />
                  ) : isLoading ? (
                    <div className="flex flex-col items-center justify-center text-slate-400 text-xs gap-1.5 animate-pulse">
                      <ImageIcon className="w-8 h-8 opacity-40" />
                      <span>Loading private photo...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-400 text-xs gap-1.5 p-4 text-center">
                      <AlertCircle className="w-6 h-6 text-amber-500" />
                      <span>Photo preview unavailable</span>
                    </div>
                  )}

                  <span className="absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white uppercase tracking-wider shadow-xs">
                    {photo.category.replace(/_/g, ' ')}
                  </span>

                  <div className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-3 space-y-1 bg-white border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 truncate">
                      {photo.title || `Evidence #${photo.id}`}
                    </span>
                    <span className="text-[11px] text-slate-500 shrink-0">
                      {formatToIndiaTime(photo.created_at)}
                    </span>
                  </div>

                  {photo.caption && (
                    <p className="text-xs text-slate-600 line-clamp-1 italic">
                      "{photo.caption}"
                    </p>
                  )}

                  {(photo.latitude != null || photo.accuracy_meters != null) && (
                    <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500 font-medium border-t border-slate-50">
                      <Navigation className="w-3 h-3 text-indigo-500 shrink-0" />
                      <span className="truncate">{formatCoordinates(photo.latitude, photo.longitude)}</span>
                      {photo.accuracy_meters != null && (
                        <span className="text-slate-400 shrink-0">({formatAccuracy(photo.accuracy_meters)})</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <PhotoLightbox
        photos={photos}
        selectedIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={setLightboxIndex}
        photoUrls={photoUrls}
      />
    </section>
  );
};
