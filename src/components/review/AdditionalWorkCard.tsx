import React from 'react';
import type { AdditionalWorkItem } from '@/types/approval';
import { formatToIndiaTime } from '@/lib/dateUtils';
import { PlusCircle, CheckCircle2 } from 'lucide-react';

interface AdditionalWorkCardProps {
  items?: AdditionalWorkItem[];
}

export const AdditionalWorkCard: React.FC<AdditionalWorkCardProps> = ({ items = [] }) => {
  const hasItems = items.length > 0;

  return (
    <section className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3.5">
      <div className="border-b border-slate-100 pb-2.5 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold text-indigo-600 tracking-wider uppercase block">
            Section 5 • Out-of-Scope Execution
          </span>
          <h3 className="text-base font-bold text-slate-900 mt-0.5">
            Additional Work Performed
          </h3>
        </div>

        {hasItems && (
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
            {items.length} Added
          </span>
        )}
      </div>

      {!hasItems ? (
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 text-center text-slate-500 space-y-1">
          <CheckCircle2 className="w-5 h-5 text-slate-400 mx-auto" />
          <span className="text-sm font-semibold text-slate-700 block">
            No Additional Work Reported
          </span>
          <p className="text-xs text-slate-500">
            Technician completed work within the assigned master scope without ad-hoc additions.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {items.map((item, idx) => (
            <div
              key={item.id || idx}
              className="bg-amber-50/30 border border-amber-200/70 p-3.5 rounded-xl space-y-1"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                  <PlusCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span>{item.task_label || 'Ad-Hoc Scope Item'}</span>
                </div>
                <span className="text-[11px] font-medium text-slate-500">
                  {formatToIndiaTime(item.created_at)}
                </span>
              </div>
              <p className="text-sm font-medium text-slate-800 pl-5">
                {item.description}
              </p>
              {item.created_by_name && (
                <span className="text-[11px] text-slate-500 pl-5 block">
                  Reported by: {item.created_by_name}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
