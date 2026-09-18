import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitSupervisorDecision } from '@/services/approvalService';
import type { ApprovalDecisionResponse } from '@/types/approval';

interface DecisionParams {
  token: string;
  decision: 'APPROVED' | 'REJECTED';
  reason?: string;
}

export function useApprovalDecision() {
  const queryClient = useQueryClient();

  return useMutation<ApprovalDecisionResponse, Error, DecisionParams>({
    mutationFn: async ({ token, decision, reason }) => {
      return await submitSupervisorDecision(token, decision, reason);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['approval-request', variables.token] });
    }
  });
}
