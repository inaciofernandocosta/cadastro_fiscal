
export enum AppView {
  NEW_PRODUCT = 'NEW_PRODUCT',
  IMPORT = 'IMPORT',
  PRODUCTS = 'PRODUCTS',
  SUPPLIERS = 'SUPPLIERS',
  ADMIN_SUPPLIERS = 'ADMIN_SUPPLIERS',
  TRACKING = 'TRACKING',
  CHATS = 'CHATS',
  DOCUMENTATION = 'DOCUMENTATION',
  FEEDBACK = 'FEEDBACK',
  ADMIN = 'ADMIN'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface ImportJob {
  id: string;
  fileName: string;
  totalSkus: number;
  date: string;
  progress: number;
  status: 'Processing' | 'Synced' | 'Queued' | 'Error';
  statusText?: string;
}

// ==========================================
// Tipos do Sistema de Feedback
// ==========================================

export type FeedbackCategory =
  | 'sugestao_melhoria'
  | 'bug_report'
  | 'assinatura'
  | 'dados_desaparecidos'
  | 'sincronizacao'
  | 'nova_versao'
  | 'outros_bugs'
  | 'outro';

export type FeedbackStatus =
  | 'pending'
  | 'in_progress'
  | 'awaiting_user'
  | 'resolved'
  | 'closed';

export type FeedbackPriority = 'low' | 'medium' | 'high' | 'critical';

export interface ThreadMessage {
  id: string;
  from: 'user' | 'admin';
  content: string;
  timestamp: string;
  author_name?: string;
}

export interface UserFeedback {
  id: string;
  user_id: string;
  user_email: string;
  user_name: string;
  category: FeedbackCategory;
  subject: string;
  description: string;
  status: FeedbackStatus;
  priority?: FeedbackPriority;
  attachment_url?: string;
  thread_messages: ThreadMessage[];
  last_message_at?: string;
  last_message_from?: 'user' | 'admin';
  last_admin_reply?: string;
  clickup_task_id?: string;
  clickup_task_url?: string;
  ai_analysis?: any;
  ai_analyzed_at?: string;
  tags?: string[];
  assigned_to?: string;
  assigned_at?: string;
  admin_notes?: string;
  sla_due_at?: string;
  sla_breached?: boolean;
  first_response_at?: string;
  resolved_at?: string;
  resolution_time_hours?: number;
  created_at: string;
  updated_at: string;
}

export interface FeedbackCategoryConfig {
  id: FeedbackCategory;
  label: string;
  icon: string;
  color: string;
  defaultSubject: string;
}

export interface FeedbackFormData {
  category: FeedbackCategory;
  subject: string;
  description: string;
  attachment?: File;
}
