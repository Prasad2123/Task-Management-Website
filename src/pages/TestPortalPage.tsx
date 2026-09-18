import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { AppHeader } from '@/components/common/AppHeader';
import { WhatsAppShareModal } from '@/components/tester/WhatsAppShareModal';
import { formatToIndiaTime } from '@/lib/dateUtils';
import type { WhatsAppPayload } from '@/services/whatsappService';
import { ShieldCheck, RefreshCw, Key, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PendingRequestRow {
  id: number;
  work_id: number;
  work_title: string;
  status: string;
  created_at: string;
}

export const TestPortalPage: React.FC = () => {
  const [tokenInput, setTokenInput] = useState('');
  const [requests, setRequests] = useState<PendingRequestRow[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [activePayload, setActivePayload] = useState<WhatsAppPayload | null>(null);

  const fetchActiveRequests = async () => {
    setLoadingRequests(true);
    try {
      const { data, error } = await supabase
        .from('supervisor_web_approval_requests')
        .select('id, work_id, status, created_at')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      const formatted: PendingRequestRow[] = (data || []).map((row: any) => ({
        id: row.id,
        work_id: row.work_id,
        work_title: `Work Order #${row.work_id}`,
        status: row.status,
        created_at: row.created_at
      }));

      setRequests(formatted);
    } catch (err) {
      console.warn('Could not query supervisor_web_approval_requests directly (RLS active):', err);
    } finally {
      setLoadingRequests(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-16 text-slate-900">
      <AppHeader />

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Development & QA Testing Harness</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Supervisor Web Approval Tester
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Test the token authentication flow, simulate WhatsApp sharing, inspect work evidence payloads, and verify single-use state machines.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm uppercase tracking-wider">
            <Key className="w-4 h-4" />
            <span>Open by Token</span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 block">
              Raw Approval Token (Hex / UUID string):
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value.trim())}
                placeholder="e.g. 4a8f9c02d7e1b364..."
                className="flex-1 text-sm p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono"
              />
              <Link
                to={tokenInput ? `/approve/${tokenInput}` : '#'}
                onClick={(e) => {
                  if (!tokenInput) e.preventDefault();
                }}
                className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  tokenInput
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Launch Review</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2 text-xs text-slate-500">
            <span className="font-medium text-slate-700">Quick Test Actions:</span>
            <button
              type="button"
              onClick={() => setTokenInput('invalid-mock-token-12345')}
              className="px-2 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            >
              Test Invalid Token
            </button>
            <button
              type="button"
              onClick={() => setTokenInput('expired-token-demo')}
              className="px-2 py-1 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-800 transition-colors border border-amber-200 cursor-pointer"
            >
              Test Expired Token
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm uppercase tracking-wider">
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Message Generator</span>
            </div>
            <button
              onClick={() =>
                setActivePayload({
                  workId: 105,
                  companyName: 'ABC Manufacturing Ltd',
                  technicianName: 'Rahul Patil',
                  token: tokenInput || 'demo-approval-token-xyz',
                  supervisorPhone: '+919876543210'
                })
              }
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors cursor-pointer"
            >
              Simulate Message
            </button>
          </div>

          <p className="text-xs text-slate-600">
            Generates the formatted WhatsApp text sent to the Supervisor with the encrypted HTTPS approval link.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-sm font-bold text-slate-900">
              Recent Approval Requests in Database
            </span>
            <button
              onClick={fetchActiveRequests}
              disabled={loadingRequests}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingRequests ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>

          {requests.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs space-y-2">
              <p>Click Refresh to query recent requests, or approve a work order from the POC Android app to trigger a live request.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {requests.map((r) => (
                <div key={r.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">Work #{r.work_id}</span>
                    <span className="text-slate-500">Created: {formatToIndiaTime(r.created_at)}</span>
                  </div>
                  <span className="font-bold px-2 py-0.5 rounded uppercase text-[10px] bg-indigo-100 text-indigo-800">
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {activePayload && (
        <WhatsAppShareModal
          isOpen={Boolean(activePayload)}
          onClose={() => setActivePayload(null)}
          payload={activePayload}
        />
      )}
    </div>
  );
};
