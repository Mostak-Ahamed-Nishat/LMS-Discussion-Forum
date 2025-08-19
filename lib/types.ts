export type ID = string | number;

/** USERS */
export interface User {
  id: string;
  name: string;
  role: "student" | "instructor" | "admin";
  avatarUrl?: string;
}

/** COURSES */
export interface Course {
  id: string;
  title: string;
  description: string;
}

/** THREADS */
export interface ThreadDTO {
  id: number;
  courseId: string;
  authorId: string;
  title: string;
  body: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  status: {
    pinned: boolean;
    locked: boolean;
    acceptedAnswerId: number | null;
  };
  upvotes: number;
  downvotes: number;
  replies?: ReplyDTO[];
}

/** REPLIES  */
export interface ReplyDTO {
  id: number;
  threadId: number;
  parentId: number | null;
  authorId: string;
  body: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  accepted: boolean;
}

/** VIEW MODEL */
export interface ThreadVM {
  id: number;
  title: string;
  content: string;
  authorId: string;
  courseId: string;
  tags: string[];
  category?: string;
  isPinned: boolean;
  isLocked: boolean;
  hasAcceptedAnswer: boolean;
  votes: number;
  replyCount: number;
  lastActivity: string;
  createdAt: string;
  updatedAt: string;
}

export type SortOption = "newest" | "oldest" | "most-active" | "top-voted";
export type FilterOption = "all" | "pinned" | "unanswered" | "answered";

/** Tag type for filter dropdown */
export interface Tag {
  id: string;
  name: string;
  color?: string;
}
