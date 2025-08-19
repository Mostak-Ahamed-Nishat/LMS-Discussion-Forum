import { apiFetch, buildUrl } from "./http";
import type { User } from "@/lib/types";

export async function getUsers(): Promise<User[]> {
  return apiFetch(buildUrl("/users"));
}

export async function getUserMap(): Promise<Record<string, User>> {
  const list = await getUsers();
  return Object.fromEntries(list.map((u) => [u.id, u]));
}
