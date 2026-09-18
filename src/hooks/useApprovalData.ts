import { useQuery } from '@tanstack/react-query';
import { verifyApprovalToken } from '@/services/approvalService';
import type { VerificationResult } from '@/types/approval';

export function useApprovalData(token: string | undefined) {
  return useQuery<VerificationResult, Error>({
    queryKey: ['approval-request', token],
    queryFn: async () => {
      if (!token) {
        return { valid: false, error: 'No token provided in URL' };
      }
      return await verifyApprovalToken(token);
    },
    enabled: Boolean(token),
    staleTime: 1000 * 60 * 2,
    retry: 1
  });
}
