
export enum AppView {
  NEW_PRODUCT = 'NEW_PRODUCT',
  IMPORT = 'IMPORT',
  PRODUCTS = 'PRODUCTS',
  SUPPLIERS = 'SUPPLIERS',
  ADMIN_SUPPLIERS = 'ADMIN_SUPPLIERS',
  TRACKING = 'TRACKING',
  CHATS = 'CHATS',
  DOCUMENTATION = 'DOCUMENTATION'
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
