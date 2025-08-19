export const API_BASE = process.env.NEXT_PUBLIC_API ?? "http://localhost:4000";
export const api = (path: string) => `${API_BASE}${path}`;
