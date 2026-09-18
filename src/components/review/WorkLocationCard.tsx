import React from 'react';
import type { WorkDetails } from '@/types/approval';
import { formatToIndiaTime, formatDuration } from '@/lib/dateUtils';
import { formatCoordinates, formatDistance, getGoogleMapsUrl } from '@/lib/geoUtils';
import { MapPin, Calendar, Clock, Navigation, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';

interface WorkLocationCardProps {
  work: WorkDetails;
}

export const WorkLocationCard: React.FC<WorkLocationCardProps> = ({ work }) => {
  const mapsUrl = getGoogleMapsUrl(work.latitude, work.longitude);

  return (
    <section className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
      <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <span className="text-[11px] font-bold text-indigo-600 tracking-wider uppercase block">
            Section 1 • Work Location & Schedule
          </span>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mt-0.5">
            {work.title}
          </h2>
          <p className="text-sm font-medium text-slate-600 flex items-center gap-1.5 mt-0.5">
            <span>{work.company_name}</span>
          </p>
        </div>

        {work.location_verified != null && (
          <span className={work.location_verified
            ? 'inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200'
            : 'inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200'
          }>
            {work.location_verified ? (
              <>
                <CheckCircle className="w-3.5 h-3.5" />
                <span>GPS Verified</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Unverified GPS</span>
              </>
            )}
          </span>
        )}
      </div>

      <div className="flex items-start gap-2.5 text-sm text-slate-700 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
        <MapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <div className="flex-1">
          <span className="text-xs font-semibold text-slate-500 block uppercase tracking-wider mb-0.5">
            Site Address
          </span>
          <span className="font-medium text-slate-800 leading-relaxed block">
            {work.address || 'Address details on file'}
          </span>
        </div>
        {mapsUrl && (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-white px-2 py-1 rounded-md border border-slate-200 shadow-2xs shrink-0"
          >
            <span>Map</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-500 mb-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[11px] font-medium uppercase tracking-wider">Scheduled</span>
          </div>
          <span className="text-xs font-bold text-slate-900 block truncate">
            {work.scheduled_date || '—'}
          </span>
        </div>

        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-500 mb-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[11px] font-medium uppercase tracking-wider">Started</span>
          </div>
          <span className="text-xs font-bold text-slate-900 block truncate">
            {formatToIndiaTime(work.start_time)}
          </span>
        </div>

        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-500 mb-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[11px] font-medium uppercase tracking-wider">Completed</span>
          </div>
          <span className="text-xs font-bold text-slate-900 block truncate">
            {formatToIndiaTime(work.completed_time)}
          </span>
        </div>

        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-500 mb-1">
            <Navigation className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[11px] font-medium uppercase tracking-wider">Duration</span>
          </div>
          <span className="text-xs font-bold text-indigo-700 block truncate">
            {formatDuration(work.duration_minutes)}
          </span>
        </div>
      </div>

      {(work.latitude != null || work.allowed_radius_meters != null) && (
        <div className="bg-indigo-50/40 rounded-xl p-3 border border-indigo-100 text-xs flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-slate-700 font-medium">
            <Navigation className="w-3.5 h-3.5 text-indigo-600" />
            <span>Site GPS: {formatCoordinates(work.latitude, work.longitude)}</span>
          </div>

          <div className="flex items-center gap-3 text-slate-600 font-medium">
            {work.allowed_radius_meters != null && (
              <span>Allowed Radius: {formatDistance(work.allowed_radius_meters)}</span>
            )}
            {work.distance_from_work_meters != null && (
              <span>Variance: {formatDistance(work.distance_from_work_meters)}</span>
            )}
          </div>
        </div>
      )}

      {work.notes && (
        <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
          <span className="font-bold text-slate-700 block mb-0.5">Technician Operational Notes:</span>
          <p className="italic text-slate-600">"{work.notes}"</p>
        </div>
      )}
    </section>
  );
};
