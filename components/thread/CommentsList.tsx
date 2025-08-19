"use client";

import CommentNode from "./CommentNode";
import type { ReplyDTO, ThreadDTO, User } from "@/lib/types";

export default function CommentsList({
  replies,
  thread,
  onVote,
  onAccept,
  onReply,
  onDelete,
  users,
}: {
  replies: ReplyDTO[];
  thread: ThreadDTO;
  onVote: (replyId: number, delta: 1 | -1) => void;
  onAccept: (replyId: number) => void;
  onReply: (parentId: number, text: string) => void;
  onDelete: (replyId: number) => void;
  users: Record<string, User>;
}) {
  const top = replies.filter(
    (r) => r.parentId == null || r.parentId === thread.id
  );
  const childrenOf = (pid: number) => replies.filter((r) => r.parentId === pid);
  const authorName = (id: string) => users[id]?.name || id;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">
        Comments ({replies.length})
      </h2>
      <ul className="space-y-4">
        {top.map((r) => (
          <CommentNode
            key={r.id}
            node={r}
            children={childrenOf(r.id)}
            thread={thread}
            onVote={onVote}
            onAccept={onAccept}
            onReply={onReply}
            onDelete={onDelete}
            authorName={authorName}
          />
        ))}
      </ul>
    </section>
  );
}
