import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-5 animate-pulse">
      <div className="h-24 bg-slate-100 rounded-2xl border border-slate-200" />

      <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-4 shadow-2xs">
        <div className="h-5 w-40 bg-slate-200 rounded" />
        <div className="space-y-2">
          <div className="h-4 w-3/4 bg-slate-100 rounded" />
          <div className="h-4 w-1/2 bg-slate-100 rounded" />
        </div>
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="h-14 bg-slate-100 rounded-lg" />
          <div className="h-14 bg-slate-100 rounded-lg" />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-3 shadow-2xs">
        <div className="h-5 w-32 bg-slate-200 rounded" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="h-20 bg-slate-100 rounded-xl" />
          <div className="h-20 bg-slate-100 rounded-xl" />
          <div className="h-20 bg-slate-100 rounded-xl" />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-3 shadow-2xs">
        <div className="h-5 w-48 bg-slate-200 rounded" />
        <div className="space-y-2">
          <div className="h-12 bg-slate-100 rounded-lg" />
          <div className="h-12 bg-slate-100 rounded-lg" />
          <div className="h-12 bg-slate-100 rounded-lg" />
        </div>
      </div>
    </div>
  );
};
