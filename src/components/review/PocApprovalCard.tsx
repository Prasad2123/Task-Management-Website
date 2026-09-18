import React from 'react';
import type { PocApproval, UserContact } from '@/types/approval';
import { formatToIndiaTime } from '@/lib/dateUtils';
import { ShieldCheck, CheckCircle2, Clock } from 'lucide-react';

interface PocApprovalCardProps {
  pocApproval?: PocApproval;
  pocUser?: UserContact;
}

export const PocApprovalCard: React.FC<PocApprovalCardProps> = ({ pocApproval, pocUser }) => {
  return (
    <section className="bg-gradient-to-r from-emerald-50 to-teal-50/60 rounded-2xl p-5 border border-emerald-200 shadow-2xs space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
              Section 3 • Client Verification Prerequisite
            </span>
            <h3 className="text-base font-bold text-slate-900 leading-tight">
              POC Approval Verified ✓
            </h3>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>FIRST-TIER APPROVED</span>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
        <div className="bg-white/80 p-3 rounded-xl border border-emerald-100">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block mb-0.5">
            Verified & Approved By
          </span>
          <span className="font-bold text-slate-900 block text-sm">
            {pocUser?.name || 'Client Point of Contact'}
          </span>
          <span className="text-emerald-700 font-medium">Client Representative</span>
        </div>

        <div className="bg-white/80 p-3 rounded-xl border border-emerald-100">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block mb-0.5 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Decision Timestamp</span>
          </span>
          <span className="font-bold text-slate-900 block text-sm">
            {formatToIndiaTime(pocApproval?.decided_at)}
          </span>
          <span className="text-slate-500 font-medium">Authoritative Server Record</span>
        </div>
      </div>
    </section>
  );
};
