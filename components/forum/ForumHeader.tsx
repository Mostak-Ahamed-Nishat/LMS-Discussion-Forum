"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Plus, Search } from "lucide-react";
import Link from "next/link";

interface ForumHeaderProps {
  courseId: string;
  onSearch?: (query: string) => void;
}

export function ForumHeader({ courseId, onSearch }: ForumHeaderProps) {
  return (
    <div className="border-b bg-card/50 px-6 py-4">
      <div className="mx-auto max-w-7xl">
        {/* <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"> */}
        <div className="flex gap-4 justify-between">
          <Link href={`/`}>
            <div className="flex items-center hover:cursor-pointer">
              <MessageCircle className="text-purple-600" />
              <h1 className="font-heading text-2xl font-bold text-foreground">
                LMS
              </h1>
            </div>
          </Link>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search discussions..."
                className="pl-10 sm:w-64"
                onChange={(e) => onSearch?.(e.target.value)}
              />
            </div>

            <Button
              asChild
              className="bg-purple-500 hover:bg-purple-700 hidden md:flex"
            >
              <Link href={`/courses/${courseId}/forum/new`}>
                <Plus className="mr-2 h-4 w-4" />
                Create Post
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
