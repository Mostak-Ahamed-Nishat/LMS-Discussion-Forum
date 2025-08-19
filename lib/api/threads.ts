import { apiFetch, buildUrl } from "./http";
import type {
  ThreadDTO,
  ThreadVM,
  ReplyDTO,
  SortOption,
  FilterOption,
} from "@/lib/types";

/** Transform DTO */
export function toThreadVM(dto: ThreadDTO): ThreadVM {
  const votes = (dto.upvotes || 0) - (dto.downvotes || 0);
  const replyCount = dto.replies?.length ?? 0;
  const lastReplyAt =
    dto.replies?.reduce((max, r) => {
      const t = new Date(r.createdAt).getTime();
      return t > max ? t : max;
    }, 0) ?? 0;
  const lastActivity = new Date(
    Math.max(new Date(dto.updatedAt).getTime(), lastReplyAt)
  ).toISOString();

  return {
    id: dto.id,
    title: dto.title,
    content: dto.body,
    authorId: dto.authorId,
    courseId: dto.courseId,
    tags: dto.tags,
    category: "",
    isPinned: dto.status?.pinned ?? false,
    isLocked: dto.status?.locked ?? false,
    hasAcceptedAnswer: !!dto.status?.acceptedAnswerId,
    votes,
    replyCount,
    lastActivity,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
}

export interface ListThreadsParams {
  courseId: string;
  q?: string;
  page?: number;
  limit?: number;
  sortBy?: SortOption;
  filterBy?: FilterOption;
  tags?: string[]; // multi-select
}

/** Fetch threads*/
export async function listThreads(
  params: ListThreadsParams
): Promise<ThreadDTO[]> {
  const { courseId, q } = params;

  const url = buildUrl("/threads", {
    courseId,
    q,
    _embed: "replies",
    _sort: "createdAt",
    _order: "desc",
    _page: params.page,
    _limit: params.limit,
  });
  return apiFetch<ThreadDTO[]>(url);
}

export type CreateThreadPayload = Pick<
  ThreadDTO,
  "courseId" | "authorId" | "title" | "body" | "tags"
> &
  Partial<ThreadDTO>;

export async function createThread(
  payload: CreateThreadPayload
): Promise<ThreadDTO> {
  return apiFetch(buildUrl("/threads"), {
    method: "POST",
    body: JSON.stringify({
      status: { pinned: false, locked: false, acceptedAnswerId: null },
      upvotes: 0,
      downvotes: 0,
      ...payload,
    }),
  });
}

export async function updateThread(
  id: number,
  patch: Partial<ThreadDTO>
): Promise<ThreadDTO> {
  return apiFetch(buildUrl(`/threads/${id}`), {
    method: "PATCH",
    body: JSON.stringify(patch),
  });
}

export async function deleteThread(id: number): Promise<void> {
  await apiFetch(buildUrl(`/threads/${id}`), { method: "DELETE" });
}

/** tags for a course */
export function deriveCourseTags(threads: ThreadDTO[]): string[] {
  const set = new Set<string>();
  threads.forEach((t) => t.tags?.forEach((tag) => set.add(tag)));
  return Array.from(set).sort();
}

/** filter and sort */
export function filterSortThreads(
  vms: ThreadVM[],
  opts: {
    q?: string;
    filterBy?: FilterOption;
    tags?: string[];
    sortBy?: SortOption;
  }
) {
  const { q, filterBy = "all", tags = [], sortBy = "newest" } = opts;
  let arr = [...vms];

  if (q?.trim()) {
    const s = q.toLowerCase();
    arr = arr.filter(
      (t) =>
        t.title.toLowerCase().includes(s) || t.content.toLowerCase().includes(s)
    );
  }

  if (filterBy !== "all") {
    arr = arr.filter((t) => {
      if (filterBy === "pinned") return t.isPinned;
      if (filterBy === "unanswered") return !t.hasAcceptedAnswer;
      if (filterBy === "answered") return t.hasAcceptedAnswer;
      return true;
    });
  }

  if (tags.length) {
    arr = arr.filter((t) => tags.some((tag) => t.tags.includes(tag)));
  }

  arr.sort((a, b) => {
    if (sortBy === "newest")
      return +new Date(b.createdAt) - +new Date(a.createdAt);
    if (sortBy === "oldest")
      return +new Date(a.createdAt) - +new Date(b.createdAt);
    if (sortBy === "most-active")
      return +new Date(b.lastActivity) - +new Date(a.lastActivity);
    if (sortBy === "top-voted") return b.votes - a.votes;
    return 0;
  });

  return arr;
}
