import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AppHeaderProps {
  workId?: number | string;
  companyName?: string;
  statusBadge?: React.ReactNode;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ workId, companyName, statusBadge }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 text-slate-900 hover:opacity-90 transition-opacity">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-wider text-indigo-600 block uppercase">
                Field Service Management
              </span>
              <span className="text-sm font-semibold text-slate-900 block leading-tight">
                Supervisor Web Approval
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {statusBadge}
          <div className="hidden sm:flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-50 border border-slate-200 px-2 py-1 rounded-md">
            <Lock className="w-3 h-3 text-emerald-600" />
            <span>Secure Web Link</span>
          </div>
        </div>
      </div>
      {(workId || companyName) && (
        <div className="bg-slate-50/80 border-t border-slate-100 px-4 py-1.5">
          <div className="max-w-3xl mx-auto flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-2 truncate">
              <span className="font-bold text-slate-900">Work #{workId}</span>
              {companyName && (
                <>
                  <span className="text-slate-300">•</span>
                  <span className="truncate text-slate-700 font-medium">{companyName}</span>
                </>
              )}
            </div>
            <span className="text-[11px] text-slate-500 shrink-0 font-medium">Asia/Kolkata (IST)</span>
          </div>
        </div>
      )}
    </header>
  );
};
