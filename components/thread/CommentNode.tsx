"use client";

import { useState } from "react";
import { Trash2, User, CheckCircle2 } from "lucide-react";
import VoteBar from "./VoteBar";
import { timeAgo } from "@/lib/timeAgo";
import type { ReplyDTO, ThreadDTO } from "@/lib/types";

export default function CommentNode({
  node,
  children,
  thread,
  onVote,
  onAccept,
  onReply,
  onDelete,
  authorName,
}: {
  node: ReplyDTO;
  children: ReplyDTO[];
  thread: ThreadDTO;
  onVote: (replyId: number, delta: 1 | -1) => void;
  onAccept: (replyId: number) => void;
  onReply: (parentId: number, text: string) => void;
  onDelete: (replyId: number) => void;
  authorName: (id: string) => string;
}) {
  const [open, setOpen] = useState(true);
  const [replying, setReplying] = useState(false);
  const [text, setText] = useState("");

  const score = (node.upvotes ?? 0) - (node.downvotes ?? 0);

  return (
    <li className="grid grid-cols-[36px_1fr] gap-3">
      {/* compact vote rail */}
      <VoteBar
        compact
        score={score}
        onUp={() => onVote(node.id, 1)}
        onDown={() => onVote(node.id, -1)}
      />

      {/* comment card */}
      <div className="rounded-md bg-white shadow p-4">
        {/* header */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span className="inline-flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br bg-purple-600">
                <User className="h-3.5 w-3.5 text-white" />
              </span>
              <span className="font-medium text-gray-900">
                {authorName(node.authorId)}
              </span>
              <span className="text-xs">• {timeAgo(node.createdAt)}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onDelete(node.id)}
              className="rounded-md border px-2 py-1 text-xs hover:bg-gray-50"
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* body */}
        <div className="mt-2 text-sm text-gray-900 whitespace-pre-wrap">
          {node.body}
        </div>

        {/* actions */}
        <div className="mt-3 flex items-center gap-4 text-sm">
          <button
            onClick={() => setReplying((v) => !v)}
            className="rounded-md border px-2 py-1 hover:bg-gray-50"
          >
            Reply
          </button>
          <button className="text-gray-600" onClick={() => setOpen((o) => !o)}>
            {open ? "Hide replies" : `View ${children.length} replies`}
          </button>
        </div>

        {/* inline reply */}
        {replying && (
          <div className="mt-3">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write a reply…"
              className="w-full rounded-xl border px-3 py-2 text-sm"
            />
            <div className="mt-2 flex justify-end gap-2">
              <button
                onClick={() => setReplying(false)}
                className="rounded-lg border px-3 py-1.5 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const v = text.trim();
                  if (!v) return;
                  onReply(node.id, v);
                  setText("");
                  setReplying(false);
                  setOpen(true);
                }}
                className="rounded-lg bg-purple-500 px-3 py-1.5 text-white hover:opacity-90"
              >
                Post Reply
              </button>
            </div>
          </div>
        )}

        {/* children */}
        {open && children.length > 0 && (
          <ul className="mt-3 space-y-3 border-l pl-4">
            {children.map((cr) => (
              <li key={cr.id} className="rounded-sm bg-white shadow p-3">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                      <User className="h-3.5 w-3.5 text-white" />
                    </span>
                    <span className="text-sm font-semibold">
                      {authorName(cr.authorId)}
                    </span>
                    <span className="text-xs text-gray-600">
                      {timeAgo(cr.createdAt)}
                    </span>
                  </div>
                  <button
                    onClick={() => onDelete(cr.id)}
                    className="rounded-sm border px-2 py-1 text-xs hover:bg-gray-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                  {cr.body}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}
