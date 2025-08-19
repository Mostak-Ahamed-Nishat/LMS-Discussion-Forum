"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare, Pin } from "lucide-react";
import Link from "next/link";
import { VoteButtons } from "./VoteButtons";
import type { ThreadVM, User } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ThreadCardProps {
  thread: ThreadVM;
  author?: User;
}

function excerpt(text: string, max = 140) {
  const t = text?.replace(/\s+/g, " ").trim() || "";
  return t.length > max ? t.slice(0, max - 1) + "…" : t;
}

export function ThreadCard({ thread, author }: ThreadCardProps) {
  return (
    <Card className="border-border bg-white shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Left: vote rail */}
          <div className="pt-1">
            <VoteButtons
              targetId={thread.id}
              targetType="thread"
              votes={thread.votes}
              userVote={null}
              size="sm"
              className="flex-shrink-0"
            />
          </div>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Top row: Pinned pill + title/excerpt */}
            <div className="flex items-start gap-3">
              {thread.isPinned && (
                <Badge
                  variant="secondary"
                  className="bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-md text-[12px] flex items-center gap-1"
                >
                  <Pin className="h-3 w-3" />
                  Pinned
                </Badge>
              )}

              <div className="sr-only">status</div>
            </div>

            <Link href={`/threads/${thread.id}`} className="block group mt-1">
              <h3 className="font-heading text-[22px] leading-7 font-semibold text-slate-900 group-hover:text-primary transition-colors">
                {thread.title}
              </h3>
              <p className="text-[15px] text-slate-600 mt-2">
                {excerpt(thread.content)}
              </p>
            </Link>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              {thread.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className={cn(
                    "text-[12px] font-medium px-2.5 py-1 rounded-full",
                    "bg-violet-50 text-violet-700 border border-violet-100"
                  )}
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Footer: author + meta */}
            <div className="mt-5 flex items-center justify-between">
              {/* author */}
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={author?.avatarUrl || "/placeholder.svg"}
                    alt={author?.name}
                  />
                  <AvatarFallback className="text-xs">
                    {author?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || "?"}
                  </AvatarFallback>
                </Avatar>

                <div className="leading-tight">
                  <div className="text-[14px] font-medium text-slate-800">
                    {author?.name || "Unknown"}
                  </div>
                  <div className="text-[12px] text-slate-500">
                    {formatDistanceToNow(new Date(thread.createdAt), {
                      addSuffix: true,
                    })}
                  </div>
                </div>
              </div>

              {/* right */}
              <div className="flex items-center gap-6 text-[14px] text-slate-600">
                <div className="flex items-center gap-1.5">
                  <MessageSquare className="h-4 w-4" />
                  <span>{thread.replyCount} replies</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                  <span>
                    Active{" "}
                    {formatDistanceToNow(new Date(thread.lastActivity), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
