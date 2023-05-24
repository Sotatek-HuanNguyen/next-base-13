import { Author } from '@/types/comments';

export interface Comment {
  approvalStatus: any;
  author: any;
  blockReason: any;
  blocked: boolean;
  blockedThread: boolean;
  children: [];
  content: string;
  createdAt: string;
  gotThread: boolean;
  id: number;
  removed: any;
  updatedAt: string;
}

export interface CommentRequest {
  id: string | number;
  content: string;
  author: Author;
}

export interface CommentResponse {
  id: number;
  content: string;
  blocked: boolean;
  blockedThread: boolean;
  blockReason: any;
  removed: any;
  approvalStatus: any;
  related: string;
  createdAt: string;
  updatedAt: string;
  threadOf: any;
  author: any;
}

export interface ReportRequest {
  postId: string;
  commentId: string;
  report: string;
}

export interface ReportResponse {
  content: string;
  createdAt: string;
  id: number;
  reason: string;
  related: any;
  resolved: boolean;
  updatedAt: string;
}
