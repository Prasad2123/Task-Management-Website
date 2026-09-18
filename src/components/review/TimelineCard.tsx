import React from 'react';
import type { TimelineEvent } from '@/types/approval';
import { formatToIndiaTime } from '@/lib/dateUtils';
import { Navigation } from 'lucide-react';

interface TimelineCardProps {
  events?: TimelineEvent[];
}

export const TimelineCard: React.FC<TimelineCardProps> = ({ events = [] }) => {
  return (
    <section className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
      <div className="border-b border-slate-100 pb-2.5 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold text-indigo-600 tracking-wider uppercase block">
            Section 6 • Authoritative Audit Trail
          </span>
          <h3 className="text-base font-bold text-slate-900 mt-0.5">
            Activity Timeline
          </h3>
        </div>
        <span className="text-xs text-slate-500 font-medium">Asia/Kolkata (IST)</span>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-6 text-slate-500 text-sm italic">
          No activity logs recorded yet.
        </div>
      ) : (
        <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {events.map((ev, idx) => {
            const isPoc = ev.event_type.includes('POC');
            const isSup = ev.event_type.includes('SUPERVISOR');
            const isWork = ev.event_type.includes('WORK');

            let dotColor = 'bg-slate-400';
            if (isPoc) dotColor = 'bg-emerald-600';
            else if (isSup) dotColor = 'bg-indigo-600';
            else if (isWork) dotColor = 'bg-blue-600';

            return (
              <div key={ev.id || idx} className="relative group">
                <div className={`absolute -left-6 top-1.5 w-4 h-4 rounded-full border-2 border-white shadow-xs ${dotColor}`} />

                <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {ev.event_type.replace(/_/g, ' ')}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      {formatToIndiaTime(ev.event_timestamp)}
                    </span>
                  </div>

                  <p className="text-sm text-slate-800 font-medium leading-snug">
                    {ev.description}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                    <span>Actor: {ev.performer_name || 'System'}</span>
                    {ev.latitude != null && (
                      <span className="flex items-center gap-0.5">
                        <Navigation className="w-3 h-3 text-slate-400" />
                        GPS Logged
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
