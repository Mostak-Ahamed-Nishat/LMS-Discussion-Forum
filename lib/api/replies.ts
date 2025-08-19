import { apiFetch, buildUrl } from "./http";
import type { ReplyDTO } from "@/lib/types";

export async function listRepliesByThread(
  threadId: number
): Promise<ReplyDTO[]> {
  return apiFetch(buildUrl("/replies", { threadId }));
}

export interface CreateReplyPayload {
  threadId: number;
  parentId: number | null;
  authorId: string;
  body: string;
}

export async function createReply(
  payload: CreateReplyPayload
): Promise<ReplyDTO> {
  return apiFetch(buildUrl("/replies"), {
    method: "POST",
    body: JSON.stringify({
      upvotes: 0,
      downvotes: 0,
      accepted: false,
      ...payload,
    }),
  });
}

/** Accept answer */
export async function acceptAnswer(
  threadId: number,
  replyId: number
): Promise<{ ok: true; threadId: number; replyId: number }> {
  return apiFetch(buildUrl(`/threads/${threadId}/accept/${replyId}`), {
    method: "POST",
  });
}
