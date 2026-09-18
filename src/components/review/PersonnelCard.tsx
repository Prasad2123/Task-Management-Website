import React from 'react';
import type { Personnel } from '@/types/approval';
import { UserCheck, Shield, Phone, Mail, Wrench } from 'lucide-react';

interface PersonnelCardProps {
  personnel?: Personnel;
}

export const PersonnelCard: React.FC<PersonnelCardProps> = ({ personnel }) => {
  if (!personnel) return null;

  return (
    <section className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3.5">
      <div className="border-b border-slate-100 pb-2.5">
        <span className="text-[11px] font-bold text-indigo-600 tracking-wider uppercase block">
          Section 2 • Operational Personnel
        </span>
        <h3 className="text-sm font-bold text-slate-900 mt-0.5">
          Assigned Stakeholders
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100 space-y-1">
          <div className="flex items-center gap-1.5 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-1">
            <Wrench className="w-3.5 h-3.5" />
            <span>Service Boy</span>
          </div>
          <div className="font-semibold text-slate-900 text-sm truncate">
            {personnel.service_boy?.name || 'Assigned Technician'}
          </div>
          {personnel.service_boy?.phone && (
            <a
              href={`tel:${personnel.service_boy.phone}`}
              className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-indigo-600 font-medium"
            >
              <Phone className="w-3 h-3 text-slate-400" />
              <span>{personnel.service_boy.phone}</span>
            </a>
          )}
          {personnel.service_boy?.email && (
            <div className="flex items-center gap-1 text-xs text-slate-500 truncate">
              <Mail className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="truncate">{personnel.service_boy.email}</span>
            </div>
          )}
        </div>

        <div className="bg-emerald-50/40 p-3 rounded-xl border border-emerald-100 space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Client POC</span>
          </div>
          <div className="font-semibold text-slate-900 text-sm truncate">
            {personnel.poc?.name || 'Facility Representative'}
          </div>
          {personnel.poc?.phone && (
            <a
              href={`tel:${personnel.poc.phone}`}
              className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-emerald-700 font-medium"
            >
              <Phone className="w-3 h-3 text-slate-400" />
              <span>{personnel.poc.phone}</span>
            </a>
          )}
          {personnel.poc?.email && (
            <div className="flex items-center gap-1 text-xs text-slate-500 truncate">
              <Mail className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="truncate">{personnel.poc.email}</span>
            </div>
          )}
        </div>

        <div className="bg-indigo-50/40 p-3 rounded-xl border border-indigo-100 space-y-1">
          <div className="flex items-center gap-1.5 text-indigo-800 text-xs font-bold uppercase tracking-wider mb-1">
            <Shield className="w-3.5 h-3.5" />
            <span>Site Supervisor</span>
          </div>
          <div className="font-semibold text-slate-900 text-sm truncate">
            {personnel.supervisor?.name || 'Reviewing Supervisor'}
          </div>
          {personnel.supervisor?.phone && (
            <a
              href={`tel:${personnel.supervisor.phone}`}
              className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-indigo-700 font-medium"
            >
              <Phone className="w-3 h-3 text-slate-400" />
              <span>{personnel.supervisor.phone}</span>
            </a>
          )}
          {personnel.supervisor?.email && (
            <div className="flex items-center gap-1 text-xs text-slate-500 truncate">
              <Mail className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="truncate">{personnel.supervisor.email}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
