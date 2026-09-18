import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApprovalData } from '@/hooks/useApprovalData';
import { useApprovalDecision } from '@/hooks/useApprovalDecision';
import { AppHeader } from '@/components/common/AppHeader';
import { StatusBadge } from '@/components/common/StatusBadge';
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton';
import { ErrorState } from '@/components/common/ErrorState';
import { WorkLocationCard } from '@/components/review/WorkLocationCard';
import { PersonnelCard } from '@/components/review/PersonnelCard';
import { PocApprovalCard } from '@/components/review/PocApprovalCard';
import { ChecklistCard } from '@/components/review/ChecklistCard';
import { AdditionalWorkCard } from '@/components/review/AdditionalWorkCard';
import { TimelineCard } from '@/components/review/TimelineCard';
import { PhotoEvidenceGallery } from '@/components/review/PhotoEvidenceGallery';
import { SwipeToApprove } from '@/components/review/SwipeToApprove';
import { RejectDialog } from '@/components/review/RejectDialog';
import { ShieldCheck, XCircle, AlertTriangle } from 'lucide-react';

export const ReviewPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const { data, isLoading, error, refetch } = useApprovalData(token);
  const { mutateAsync: decide, isPending } = useApprovalDecision();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <AppHeader />
        <LoadingSkeleton />
      </div>
    );
  }

  if (error || !data || !data.valid) {
    if (data?.status === 'APPROVED') {
      navigate(`/approve/${token}/success`, { replace: true });
      return null;
    }
    if (data?.status === 'REJECTED') {
      navigate(`/approve/${token}/rejected`, { replace: true });
      return null;
    }

    return (
      <div className="min-h-screen bg-slate-50">
        <AppHeader />
        <ErrorState
          title={data?.status === 'EXPIRED' ? 'Approval Token Expired' : 'Invalid Approval Link'}
          message={data?.error || error?.message || 'Unable to authenticate this approval link.'}
          onRetry={() => refetch()}
          status={data?.status}
        />
      </div>
    );
  }

  const work = data.work || {
    id: data.work_id || 0,
    title: data.title || 'Work Order',
    company_name: data.company_name || 'Client',
    address: 'Site location on file',
    scheduled_date: '—',
    start_time: null,
    completed_time: null,
    duration_minutes: null,
    notes: null,
    latitude: null,
    longitude: null,
    allowed_radius_meters: 150,
    location_verified: null,
    distance_from_work_meters: null
  };

  const handleApprove = async () => {
    if (!token) return;
    setActionError(null);
    try {
      await decide({ token, decision: 'APPROVED' });
      navigate(`/approve/${token}/success`);
    } catch (err: any) {
      setActionError(err.message || 'Approval could not be recorded. Please try again.');
      throw err;
    }
  };

  const handleReject = async (reason: string) => {
    if (!token) return;
    setActionError(null);
    try {
      await decide({ token, decision: 'REJECTED', reason });
      setIsRejectOpen(false);
      navigate(`/approve/${token}/rejected`);
    } catch (err: any) {
      setActionError(err.message || 'Rejection could not be recorded. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-36 text-slate-900">
      <AppHeader
        workId={work.id}
        companyName={work.company_name}
        statusBadge={<StatusBadge status={data.status || 'POC_APPROVED'} size="sm" />}
      />

      <main className="max-w-3xl mx-auto px-4 py-5 space-y-5">
        <div className="bg-indigo-600 rounded-2xl p-4 text-white shadow-md flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-200 block">
                Authoritative Action Required
              </span>
              <h1 className="text-sm sm:text-base font-bold leading-tight">
                Site Supervisor Final Sign-Off
              </h1>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-white text-indigo-700 shrink-0">
            READY FOR DECISION
          </span>
        </div>

        {actionError && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 text-xs text-rose-700 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{actionError}</span>
          </div>
        )}

        <WorkLocationCard work={work} />
        <PersonnelCard personnel={data.personnel} />
        <PocApprovalCard pocApproval={data.poc_approval} pocUser={data.personnel?.poc} />
        <ChecklistCard items={data.checklist} />
        <AdditionalWorkCard items={data.additional_works} />
        <TimelineCard events={data.timeline} />
        <PhotoEvidenceGallery photos={data.photos} />
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 shadow-xl">
        <div className="max-w-xl mx-auto space-y-2.5">
          <SwipeToApprove
            onApprove={handleApprove}
            isLoading={isPending}
            disabled={isPending}
          />

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setIsRejectOpen(true)}
              disabled={isPending}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 py-1 px-3 rounded-lg hover:bg-rose-50 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Reject Work Order</span>
            </button>
          </div>
        </div>
      </footer>

      <RejectDialog
        isOpen={isRejectOpen}
        onClose={() => setIsRejectOpen(false)}
        onConfirm={handleReject}
        isLoading={isPending}
      />
    </div>
  );
};
