export interface WhatsAppPayload {
  workId: number | string;
  companyName: string;
  technicianName: string;
  token: string;
  supervisorPhone?: string | null;
}

export class WhatsAppDeliveryService {
  static formatApprovalMessage(payload: WhatsAppPayload): string {
    const baseUrl = typeof window !== 'undefined' && window.location?.origin
      ? window.location.origin
      : 'https://portal.fieldservice.com';
    const approvalUrl = `${baseUrl}/approve/${encodeURIComponent(payload.token)}`;

    return [
      `*Supervisor Approval Required*`,
      ``,
      `Work ID: #${payload.workId}`,
      `Company: ${payload.companyName}`,
      `Technician: ${payload.technicianName}`,
      ``,
      `Please review the completed work evidence and provide your sign-off:`,
      `${approvalUrl}`
    ].join('\n');
  }

  static getDirectShareUrl(phone: string | null | undefined, text: string): string {
    const cleanPhone = phone ? phone.replace(/[^0-9]/g, '') : '';
    const encodedText = encodeURIComponent(text);
    if (cleanPhone) {
      return `https://wa.me/${cleanPhone}?text=${encodedText}`;
    }
    return `https://wa.me/?text=${encodedText}`;
  }

  static async copyText(text: string): Promise<boolean> {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
      if (typeof document !== 'undefined') {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        textArea.remove();
        return successful;
      }
      return false;
    } catch {
      return false;
    }
  }
}
