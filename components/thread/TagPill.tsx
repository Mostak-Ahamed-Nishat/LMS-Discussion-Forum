"use client";
import { Tag } from "lucide-react";

export function TagPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700">
      <Tag className="h-3.5 w-3.5 opacity-70" />
      {label}
    </span>
  );
}
