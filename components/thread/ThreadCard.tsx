"use client";

import { CheckCircle2, Lock, Pin, MessageSquare, User } from "lucide-react";
import VoteBar from "./VoteBar";
import { timeAgo } from "@/lib/timeAgo"; // if you keep timeAgo under lib/api; else adjust import
import type { ThreadDTO } from "@/lib/types";

export default function ThreadCard({
  thread,
  onVote,
  commentsCount,
}: {
  thread: ThreadDTO;
  onVote: (delta: 1 | -1) => void;
  commentsCount: number;
}) {
  const score = (thread.upvotes ?? 0) - (thread.downvotes ?? 0);

  return (
    <article className="rounded-md bg-white shadow p-6">
      <div className="grid grid-cols-[48px_1fr_auto] gap-4">
        {/* Left vertical vote bar */}
        <VoteBar
          score={score}
          onUp={() => onVote(1)}
          onDown={() => onVote(-1)}
        />

        <div>
          {/* Badges row */}
          <div className="flex items-start justify-between">
            <div className="flex flex-wrap items-center gap-2 text-[11px]">
              {thread.status?.pinned && (
                <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-gray-700">
                  <Pin className="mr-1 h-3.5 w-3.5" /> Pinned
                </span>
              )}
              {thread.status?.locked && (
                <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-gray-700">
                  <Lock className="mr-1 h-3.5 w-3.5" /> Locked
                </span>
              )}
              {thread.status?.acceptedAnswerId && (
                <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-gray-700">
                  <CheckCircle2 className="mr-1 h-3.5 w-3.5 text-green-600" />
                  Answer accepted
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <h1 className="mt-2 text-2xl font-semibold text-gray-900">
            {thread.title}
          </h1>

          {/* Meta */}
          <div className="mt-2 text-sm text-gray-600">
            <span className="inline-flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                <User className="h-4 w-4 text-white" />
              </span>
              <span className="font-medium text-gray-900">
                {thread.authorId}
              </span>
              <span>• {timeAgo(thread.createdAt)}</span>
              <span className="inline-flex items-center gap-1">
                <span className="mx-2">•</span>
                <MessageSquare className="h-4 w-4" />
                {commentsCount} comments
              </span>
            </span>
          </div>

          {/* Body */}
          {!!thread.body && (
            <div className="mt-4 text-gray-900 whitespace-pre-wrap">
              {thread.body}
            </div>
          )}

          {/* Tags */}
          {!!thread.tags?.length && (
            <div className="mt-4 flex flex-wrap gap-2">
              {thread.tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right spacer for balance */}
        <div />
      </div>
    </article>
  );
}
