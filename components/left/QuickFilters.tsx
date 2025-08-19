"use client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Star, Users } from "lucide-react";

export function QuickFilters({ courseId }: { courseId: string }) {
  return (
    <div className="bg-purple-50 rounded-xl shadow p-4 space-y-3">
      {/* Newest and Recent */}
      <Link
        href={`/courses/${courseId}/forum?sort=newest`}
        className="flex items-start gap-3 rounded-lg p-3 hover:bg-gray-50 transition"
      >
        <Sparkles className="h-5 w-5 text-green-500 mt-0.5" />
        <div className="flex-1">
          <div className="flex items-center font-medium text-gray-900">
            Newest and Recent
            <Badge className="ml-2 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-md">
              New
            </Badge>
          </div>
          <p className="text-sm text-gray-500">Find the latest update</p>
        </div>
      </Link>

      {/* Popular of the day */}
      <Link
        href={`/courses/${courseId}/forum?sort=top`}
        className="flex items-start gap-3 rounded-lg p-3 hover:bg-gray-50 transition"
      >
        <Star className="h-5 w-5 text-yellow-500 mt-0.5" />
        <div className="flex-1">
          <div className="font-medium text-gray-900">Popular of the day</div>
          <p className="text-sm text-gray-500">
            Shots featured today by curators
          </p>
        </div>
      </Link>

      {/* Following */}
      <Link
        href={`/courses/${courseId}/forum?filter=following`}
        className="flex items-start gap-3 rounded-lg p-3 hover:bg-gray-50 transition"
      >
        <Users className="h-5 w-5 text-orange-500 mt-0.5" />
        <div className="flex-1">
          <div className="flex items-center font-medium text-gray-900">
            Following
            <Badge className="ml-2 bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-md">
              24
            </Badge>
          </div>
          <p className="text-sm text-gray-500">
            Explore from your favorite person
          </p>
        </div>
      </Link>
    </div>
  );
}
