"use client";
import { BookOpen, FileText, Link as LinkIcon } from "lucide-react";

type Resource = {
  id: string | number;
  title: string;
  author: string;
  type?: "article" | "book" | "link" | string;
};

export function ResourcesList({ items }: { items: Resource[] }) {
  const typeIcon = (t?: string) => {
    if (!t) return <BookOpen className="h-5 w-5 text-blue-500" />;
    if (t === "article")
      return <FileText className="h-5 w-5 text-emerald-600" />;
    if (t === "link") return <LinkIcon className="h-5 w-5 text-purple-500" />;
    return <BookOpen className="h-5 w-5 text-blue-500" />;
  };

  return (
    <div className="bg-blue-50 rounded-xl shadow p-4">
      <h2 className="font-semibold text-gray-900 mb-3">Resources</h2>
      <ul className="space-y-2">
        {items.map((x) => (
          <li
            key={x.id}
            className="flex items-start gap-3 rounded-lg p-3 hover:bg-gray-50 transition cursor-pointer"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gray-100">
              {typeIcon(x.type)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-900 truncate">
                {x.title}
              </div>
              <p className="text-sm text-gray-500">by {x.author}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
