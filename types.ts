
export enum AppView {
  NEW_PRODUCT = 'NEW_PRODUCT',
  IMPORT = 'IMPORT',
  PRODUCTS = 'PRODUCTS',
  SUPPLIERS = 'SUPPLIERS',
  REPORTS = 'REPORTS',
  CHATS = 'CHATS'
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
