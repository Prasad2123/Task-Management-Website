import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApprovalData } from '@/hooks/useApprovalData';
import { AppHeader } from '@/components/common/AppHeader';
import { formatToIndiaTime } from '@/lib/dateUtils';
import { CheckCircle2, ShieldCheck, Home, Calendar, Globe, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const SuccessPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const { data } = useApprovalData(token);

  useEffect(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  const work = data?.work || {
    id: data?.work_id || 0,
    title: data?.title || 'Work Order',
    company_name: data?.company_name || 'Client'
  };

  const decidedTime = data?.decided_at || new Date().toISOString();

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <AppHeader workId={work.id} companyName={work.company_name} />

      <main className="max-w-md mx-auto px-4 py-10 text-center animate-in fade-in duration-300">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-5">
          <div className="w-20 h-20 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase block">
              Approval Certified
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Work Order Approved!
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              Your authoritative approval has been recorded in the Supabase backend. The technician and client have been notified.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left space-y-2.5 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
              <span className="text-slate-500 font-medium">Work Order</span>
              <span className="font-bold text-slate-900">#{work.id} • {work.title}</span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
              <span className="text-slate-500 font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Approved At (IST)
              </span>
              <span className="font-bold text-slate-900">
                {formatToIndiaTime(decidedTime)}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
              <span className="text-slate-500 font-medium flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                Approval Method
              </span>
              <span className="font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Web
              </span>
            </div>

            <div className="flex items-center justify-between pt-0.5">
              <span className="text-slate-500 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                Audit Trail
              </span>
              <span className="font-medium text-slate-700">Logged & Timestamped</span>
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <Link
              to={`/approve/${token}`}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm"
            >
              <span>View Submitted Summary</span>
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
