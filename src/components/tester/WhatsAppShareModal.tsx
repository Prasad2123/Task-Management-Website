import React, { useState } from 'react';
import { WhatsAppDeliveryService, type WhatsAppPayload } from '@/services/whatsappService';
import { X, Copy, Check, MessageSquare, Send, ExternalLink } from 'lucide-react';

interface WhatsAppShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  payload: WhatsAppPayload;
}

export const WhatsAppShareModal: React.FC<WhatsAppShareModalProps> = ({
  isOpen,
  onClose,
  payload
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const messageText = WhatsAppDeliveryService.formatApprovalMessage(payload);
  const shareUrl = WhatsAppDeliveryService.getDirectShareUrl(payload.supervisorPhone, messageText);

  const handleCopy = async () => {
    const ok = await WhatsAppDeliveryService.copyText(messageText);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-600">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center border border-emerald-200">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                Delivery Layer Testing
              </span>
              <h3 className="font-bold text-base text-slate-900 leading-tight">
                WhatsApp Message Preview
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          In production, this payload is sent automatically to the Supervisor's WhatsApp via the delivery webhook. During testing, you can copy the text or launch WhatsApp directly.
        </p>

        <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed select-all">
          {messageText}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={handleCopy}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span>Copy Message Text</span>
              </>
            )}
          </button>

          <a
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-sm"
          >
            <Send className="w-4 h-4" />
            <span>Send via WhatsApp</span>
            <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
          </a>
        </div>
      </div>
    </div>
  );
};
