import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApprovalData } from '@/hooks/useApprovalData';
import { AppHeader } from '@/components/common/AppHeader';
import { formatToIndiaTime } from '@/lib/dateUtils';
import { XCircle, AlertTriangle, Home, ArrowRight, Calendar } from 'lucide-react';

export const RejectedPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const { data } = useApprovalData(token);

  const work = data?.work || {
    id: data?.work_id || 0,
    title: data?.title || 'Work Order',
    company_name: data?.company_name || 'Client'
  };

  const decidedTime = data?.decided_at || new Date().toISOString();
  const reason = data?.rejection_reason || 'Revisions requested by Site Supervisor.';

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <AppHeader workId={work.id} companyName={work.company_name} />

      <main className="max-w-md mx-auto px-4 py-10 text-center animate-in fade-in duration-300">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-5">
          <div className="w-20 h-20 rounded-3xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto shadow-inner">
            <XCircle className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-rose-700 tracking-wider uppercase block">
              Decision Recorded
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Work Order Rejected
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              The work order has been returned to the service technician for required corrections.
            </p>
          </div>

          <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100 text-left space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Supervisor Feedback Reason:</span>
            </div>
            <p className="text-xs text-slate-800 font-medium italic pl-5 leading-relaxed">
              "{reason}"
            </p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs text-left space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Work Order</span>
              <span className="font-bold text-slate-900">#{work.id} • {work.title}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Rejected At
              </span>
              <span className="font-bold text-slate-900">
                {formatToIndiaTime(decidedTime)}
              </span>
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <Link
              to={`/approve/${token}`}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm"
            >
              <span>View Review Summary</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/"
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Portal Home</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
