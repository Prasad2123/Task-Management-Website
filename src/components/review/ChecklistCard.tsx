import React from 'react';
import type { ChecklistItem } from '@/types/approval';
import { formatToIndiaTime } from '@/lib/dateUtils';
import { CheckCircle, Clock } from 'lucide-react';

interface ChecklistCardProps {
  items?: ChecklistItem[];
}

export const ChecklistCard: React.FC<ChecklistCardProps> = ({ items = [] }) => {
  const completedCount = items.filter(i => i.is_completed).length;
  const totalCount = items.length;

  return (
    <section className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <span className="text-[11px] font-bold text-indigo-600 tracking-wider uppercase block">
            Section 4 • Task Execution Snapshot
          </span>
          <h3 className="text-base font-bold text-slate-900 mt-0.5">
            Work Checklist
          </h3>
        </div>

        <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
          {completedCount} / {totalCount} Completed
        </span>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-6 text-slate-500 text-sm italic">
          No predefined checklist items configured for this work order.
        </div>
      ) : (
        <div className="space-y-2.5">
          {items.map((item, idx) => (
            <div
              key={item.id || idx}
              className={`p-3 rounded-xl border flex items-start justify-between gap-3 transition-colors ${
                item.is_completed
                  ? 'bg-emerald-50/30 border-emerald-100'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-start gap-2.5 flex-1">
                <div className="mt-0.5">
                  {item.is_completed ? (
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </div>
                <div>
                  <span className="text-sm font-semibold text-slate-900 block leading-tight">
                    {item.task_label || item.title}
                  </span>
                  {item.description && item.description !== item.title && (
                    <p className="text-xs text-slate-600 mt-0.5">{item.description}</p>
                  )}
                  {item.completed_at && (
                    <span className="text-[11px] text-slate-500 block mt-1">
                      Done at: {formatToIndiaTime(item.completed_at)}
                      {item.completed_by_name && ` by ${item.completed_by_name}`}
                    </span>
                  )}
                </div>
              </div>

              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0 ${
                  item.is_completed
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {item.is_completed ? 'DONE' : 'PENDING'}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
