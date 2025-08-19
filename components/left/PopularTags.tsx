"use client";
import {
  Code2,
  DollarSign,
  PenTool,
  Lightbulb,
  BookOpen,
  RefreshCcw,
} from "lucide-react";

interface Tag {
  id: string;
  label: string;
  count: number;
  extra?: string; // like "Trending", "Trending in Bangladesh"
  icon: React.ReactNode;
}

export function PopularTags() {
  const tags: Tag[] = [
    {
      id: "1",
      label: "javascript",
      count: 82645,
      extra: "Posted by this tag",
      icon: <Code2 className="h-5 w-5 text-orange-400" />,
    },
    {
      id: "2",
      label: "bitcoin",
      count: 65523,
      extra: "Trending",
      icon: <DollarSign className="h-5 w-5 text-red-500" />,
    },
    {
      id: "3",
      label: "design",
      count: 51354,
      extra: "Trending in Bangladesh",
      icon: <PenTool className="h-5 w-5 text-blue-500" />,
    },
    {
      id: "4",
      label: "innovation",
      count: 48029,
      extra: "Posted by this tag",
      icon: <Lightbulb className="h-5 w-5 text-yellow-600" />,
    },
    {
      id: "5",
      label: "tutorial",
      count: 51354,
      extra: "Trending in Bangladesh",
      icon: <BookOpen className="h-5 w-5 text-green-500" />,
    },
    {
      id: "6",
      label: "busieness",
      count: 82645,
      extra: "Posted by this tag",
      icon: <RefreshCcw className="h-5 w-5 text-purple-500" />,
    },
  ];

  return (
    <div className="bg-orange-50 rounded-xl shadow p-4 space-y-3">
      <h2 className="font-semibold text-gray-900 mb-2">Popular Tags</h2>
      <div className="space-y-3">
        {tags.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-50 cursor-pointer transition"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gray-100">
              {t.icon}
            </div>
            <div>
              <div className="font-medium text-gray-800">#{t.label}</div>
              <p className="text-sm text-gray-500">
                {t.count.toLocaleString()} • {t.extra}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
