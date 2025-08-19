import { apiFetch, buildUrl } from "./http";

export async function voteThread(id: number, delta: 1 | -1) {
  return apiFetch(buildUrl(`/vote/threads/${id}`), {
    method: "POST",
    body: JSON.stringify({ vote: delta }),
  });
}

export async function voteReply(id: number, delta: 1 | -1) {
  return apiFetch(buildUrl(`/vote/replies/${id}`), {
    method: "POST",
    body: JSON.stringify({ vote: delta }),
  });
}
