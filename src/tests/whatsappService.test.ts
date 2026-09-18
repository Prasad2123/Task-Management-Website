import { describe, it, expect } from 'vitest';
import { WhatsAppDeliveryService } from '@/services/whatsappService';

describe('WhatsApp Delivery Service', () => {
  it('generates complete WhatsApp notification text with secure link', () => {
    const payload = {
      workId: 105,
      companyName: 'ABC Chemicals Pvt Ltd',
      technicianName: 'Rahul Patil',
      token: '4a8f9c02d7e1b364821a',
      supervisorPhone: '+919876543210'
    };

    const message = WhatsAppDeliveryService.formatApprovalMessage(payload);

    expect(message).toContain('*Supervisor Approval Required*');
    expect(message).toContain('Work ID: #105');
    expect(message).toContain('Company: ABC Chemicals Pvt Ltd');
    expect(message).toContain('Technician: Rahul Patil');
    expect(message).toContain('/approve/4a8f9c02d7e1b364821a');
  });

  it('formats direct WhatsApp URL with phone and message payload', () => {
    const phone = '+91 98765-43210';
    const text = 'Hello Test';
    const shareUrl = WhatsAppDeliveryService.getDirectShareUrl(phone, text);

    expect(shareUrl).toContain('https://wa.me/919876543210?text=Hello%20Test');
  });
});
