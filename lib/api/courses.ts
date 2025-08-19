import { apiFetch, buildUrl } from "./http";
import type { Course } from "@/lib/types";

export async function getCourses(): Promise<Course[]> {
  return apiFetch(buildUrl("/courses"));
}

export async function getCourse(courseId: string): Promise<Course | null> {
  const data = await apiFetch<Course[]>(buildUrl("/courses", { id: courseId }));
  return data[0] ?? null;
}
