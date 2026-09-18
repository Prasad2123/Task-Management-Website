export type ApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED' | 'REVOKED';

export interface WorkDetails {
  id: number;
  title: string;
  company_name: string;
  address: string;
  scheduled_date: string;
  start_time: string | null;
  completed_time: string | null;
  duration_minutes: number | null;
  notes: string | null;
  latitude: number | null;
  longitude: number | null;
  allowed_radius_meters: number | null;
  location_verified: boolean | null;
  distance_from_work_meters: number | null;
}

export interface UserContact {
  id: number;
  name: string;
  phone: string | null;
  email: string | null;
}

export interface Personnel {
  service_boy: UserContact;
  poc: UserContact;
  supervisor: UserContact;
}

export interface PocApproval {
  status: string;
  decided_at: string;
  rejection_reason: string | null;
}

export interface ChecklistItem {
  id: string | number;
  title: string;
  description: string;
  is_completed: boolean;
  completed_at: string | null;
  completed_by_name: string | null;
  task_label?: string | null;
  display_order?: number;
}

export interface AdditionalWorkItem {
  id: string | number;
  description: string;
  task_label: string | null;
  created_at: string;
  created_by_name: string;
}

export interface TimelineEvent {
  id: string | number;
  event_type: string;
  description: string;
  event_timestamp: string;
  performer_name: string;
  latitude: number | null;
  longitude: number | null;
  accuracy_meters: number | null;
}

export interface PhotoEvidence {
  id: string | number;
  title: string;
  category: string;
  caption: string | null;
  storage_reference: string | null;
  photo_url: string | null;
  created_at: string;
  file_size?: number | null;
  latitude?: number | null;
  longitude?: number | null;
  accuracy_meters?: number | null;
}

export interface VerificationResult {
  valid: boolean;
  error?: string;
  status?: ApprovalStatus;
  expires_at?: string;
  work?: WorkDetails;
  personnel?: Personnel;
  poc_approval?: PocApproval;
  checklist?: ChecklistItem[];
  additional_works?: AdditionalWorkItem[];
  timeline?: TimelineEvent[];
  photos?: PhotoEvidence[];
  work_id?: number;
  title?: string;
  company_name?: string;
  decided_at?: string;
  rejection_reason?: string | null;
}

export interface ApprovalDecisionResponse {
  success: boolean;
  decision: 'APPROVED' | 'REJECTED';
  decided_at: string;
  error?: string;
}
