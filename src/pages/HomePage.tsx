import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppHeader } from '@/components/common/AppHeader';
import { ShieldCheck, ArrowRight, Lock, Key, Smartphone, HelpCircle, CheckCircle2 } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleOpen = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim()) {
      navigate(`/approve/${encodeURIComponent(token.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16 flex flex-col justify-between">
      <div>
        <AppHeader />

        <main className="max-w-xl mx-auto px-4 py-8 sm:py-12 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md">
              <ShieldCheck className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block mb-1">
                Enterprise Approval Gateway
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                Site Supervisor Web Sign-Off
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed max-w-md mx-auto">
                Welcome to the Field Service Management Web Portal. Supervisors review comprehensive task checklists, GPS geotags, and photographic proof securely through one-time links delivered via WhatsApp.
              </p>
            </div>

            <form onSubmit={handleOpen} className="space-y-3 pt-2 text-left">
              <div>
                <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider mb-1.5">
                  Enter Secure Approval Token:
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Paste the token from your WhatsApp message"
                    className="w-full text-sm pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!token.trim()}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <span>Access Work Review</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left space-y-2.5 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Zero app installation required. Opens directly from WhatsApp on mobile phones.</span>
              </div>
              <div className="flex items-start gap-2">
                <Lock className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>Single-use, cryptographically verified tokens that expire automatically after 7 days.</span>
              </div>
              <div className="flex items-start gap-2">
                <Smartphone className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>Instant interactive review of high-res photos, task checklists, and audit history.</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/test"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-white px-3.5 py-2 rounded-full border border-slate-200 shadow-2xs transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Launch QA / Development Test Portal →</span>
            </Link>
          </div>
        </main>
      </div>

      <footer className="text-center text-xs text-slate-400 py-4">
        Field Service Management System • Asia/Kolkata Timezone
      </footer>
    </div>
  );
};
