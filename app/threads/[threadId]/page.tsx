"use client";

import { useEffect, useState, useMemo } from "react";
import ThreadCard from "@/components/thread/ThreadCard";
import CommentsList from "@/components/thread/CommentsList";
import CommentComposer from "@/components/thread/CommentComposer";
import { apiFetch, buildUrl } from "@/lib/api/http";
import { createReply } from "@/lib/api/replies";
import {
  voteThread as apiVoteThread,
  voteReply as apiVoteReply,
} from "@/lib/api/votes";
import { getUserMap } from "@/lib/api/users";

import type { ThreadDTO, ReplyDTO, User } from "@/lib/types";
import { ForumHeader } from "@/components/forum/ForumHeader";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";

export default function Page() {
  const params = useParams<{ courseId: string; threadId: string }>();
  const router = useRouter();

  const courseId = params.courseId;
  const id = Number(params.threadId);

  const [searchQuery, setSearchQuery] = useState("");
  const [thread, setThread] = useState<ThreadDTO | null>(null);
  const [replies, setReplies] = useState<ReplyDTO[]>([]);
  const [users, setUsers] = useState<Record<string, User>>({});

  async function load() {
    const t = await apiFetch<ThreadDTO>(buildUrl(`/threads/${id}`));
    const r = await apiFetch<ReplyDTO[]>(
      buildUrl("/replies", { threadId: id })
    );
    const um = await getUserMap();
    setThread(t);
    setReplies(r);
    setUsers(um);
  }

  useEffect(() => {
    if (id) load();
  }, [id]);

  const commentsCount = useMemo(() => replies.length, [replies]);

  // votes
  async function voteThread(delta: 1 | -1) {
    if (!thread) return;
    const updated = await apiVoteThread(thread.id, delta);
    setThread(updated);
  }

  async function voteReply(replyId: number, delta: 1 | -1) {
    const updated = await apiVoteReply(replyId, delta);
    setReplies((prev) => prev.map((r) => (r.id === replyId ? updated : r)));
  }

  // accept reply
  async function acceptReply(replyId: number) {
    if (!thread) return;
    await apiFetch(buildUrl(`/threads/${thread.id}/accept/${replyId}`), {
      method: "POST",
    });
    await load();
  }

  // create top-level comment
  async function postTopLevel(text: string) {
    if (!thread) return;
    await createReply({
      threadId: id,
      parentId: null,
      authorId: "u1", // TODO: replace with actual logged-in user
      body: text,
    });
    await load();
  }

  // nested reply
  async function postChild(parentId: number, text: string) {
    if (!thread) return;
    await createReply({
      threadId: id,
      parentId,
      authorId: "u1",
      body: text,
    });
    await load();
  }

  // delete reply
  async function removeReply(replyId: number) {
    await apiFetch(buildUrl(`/replies/${replyId}`), { method: "DELETE" });
    setReplies((p) => p.filter((x) => x.id !== replyId));
  }

  if (!thread) {
    return <div className="max-w-4xl mx-auto p-6">Loading…</div>;
  }

  return (
    <div>
      <ForumHeader courseId={courseId} onSearch={setSearchQuery} />

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Back button */}
        <Button
          onClick={() => router.back()}
          className="bg-purple-500 hover:bg-purple-600 cursor-pointer flex items-center gap-2"
        >
          <ArrowLeft /> Back
        </Button>

        {/* Post card */}
        <ThreadCard
          thread={thread}
          onVote={voteThread}
          commentsCount={commentsCount}
        />

        {/* Comments & replies */}
        <CommentsList
          replies={replies}
          thread={thread}
          onVote={voteReply}
          onAccept={acceptReply}
          onReply={postChild}
          onDelete={removeReply}
          users={users}
        />

        {/* Composer */}
        {!thread.status?.locked && <CommentComposer onPost={postTopLevel} />}
        <BottomNav courseId="c1" />
      </div>
    </div>
  );
}
