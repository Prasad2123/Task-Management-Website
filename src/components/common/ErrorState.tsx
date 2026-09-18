import React from 'react';
import { AlertTriangle, Home, RefreshCw, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  status?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Approval Link Invalid or Expired',
  message,
  onRetry,
  status
}) => {
  const isExpired = status === 'EXPIRED' || message.toLowerCase().includes('expired');

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-lg p-6 sm:p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
          {title}
        </h2>

        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          {message}
        </p>

        {isExpired && (
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 text-left mb-6 flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              For security, Supervisor approval tokens automatically expire after 7 days. Please request the Client POC to re-issue a link if review is still pending.
            </span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {onRetry && (
            <button
              onClick={onRetry}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          )}

          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200 transition-colors"
          >
            <Home className="w-4 h-4" />
            Portal Home
          </Link>
        </div>
      </div>
    </div>
  );
};
