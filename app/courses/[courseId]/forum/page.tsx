"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type {
  SortOption,
  FilterOption,
  ThreadVM,
  Tag as TagType,
} from "@/lib/types";
import { MessageSquare } from "lucide-react";
import { ForumHeader } from "@/components/forum/ForumHeader";
import { ThreadCard } from "@/components/forum/ThreadCard";
import { ForumFilters } from "@/components/forum/ForumFilters";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { EmptyState } from "@/components/EmptyState";
import { getCourse } from "@/lib/api/courses";
import { getUserMap } from "@/lib/api/users";
import {
  deriveCourseTags,
  filterSortThreads,
  listThreads,
  toThreadVM,
} from "@/lib/api/threads";
import { useParams } from "next/navigation";
import { QuickFilters } from "@/components/left/QuickFilters";
import { PopularTags } from "@/components/left/PopularTags";
import { MeetupsList } from "@/components/right/MeetupsList";
import { ResourcesList } from "@/components/right/ResourcesList";

import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";

interface ForumPageProps {
  params: { courseId: string };
}

export default function ForumPage({ params }: ForumPageProps) {
  const [threads, setThreads] = useState<ThreadVM[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const threadsPerPage = 10;

  const [courseTitle, setCourseTitle] = useState<string>("");
  const [usersById, setUsersById] = useState<Record<string, any>>({});
  const [availableTags, setAvailableTags] = useState<TagType[]>([]);
  const [meetups, setMeetups] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        // Load course title
        const course = await getCourse(params.courseId);
        setCourseTitle(course?.title || "Course");

        // Load threads
        const list = await listThreads({ courseId: params.courseId });
        const vms = list.map(toThreadVM);
        setThreads(vms);

        // Tags derived from threads
        const tags = deriveCourseTags(list).map<TagType>((name) => ({
          id: name,
          name,
        }));
        setAvailableTags(tags);

        // Users
        const uMap = await getUserMap();
        setUsersById(uMap);

        // Fetch meetups & resources (JSON server endpoints)
        const [meetupsRes, resourcesRes] = await Promise.all([
          fetch("http://localhost:4000/meetups").then((r) => r.json()),
          fetch("http://localhost:4000/resources").then((r) => r.json()),
        ]);
        setMeetups(meetupsRes);
        setResources(resourcesRes);
      } catch (e: any) {
        toast(e?.message || "Please check your JSON Server.");
      } finally {
        setLoading(false);
      }
    })();
  }, [params.courseId]);

  // Filter & sort client-side
  const filteredAndSorted = useMemo(() => {
    return filterSortThreads(threads, {
      q: searchQuery,
      filterBy,
      tags: selectedTags,
      sortBy,
    });
  }, [threads, searchQuery, filterBy, selectedTags, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSorted.length / threadsPerPage);
  const paginated = filteredAndSorted.slice(
    (currentPage - 1) * threadsPerPage,
    currentPage * threadsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterBy, selectedTags, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <ForumHeader courseId={params.courseId} onSearch={setSearchQuery} />

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT */}
          <aside className="hidden lg:block lg:col-span-3 space-y-4">
            <QuickFilters courseId={params.courseId} />
            <PopularTags />
          </aside>

          {/* CENTER */}
          <main className="col-span-12 lg:col-span-6">
            <ForumFilters
              sortBy={sortBy}
              onSortChange={setSortBy}
              filterBy={filterBy}
              onFilterChange={setFilterBy}
              selectedTags={selectedTags}
              onTagsChange={setSelectedTags}
              availableTags={availableTags}
              totalThreads={filteredAndSorted.length}
            />

            {loading ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner />
              </div>
            ) : paginated.length === 0 ? (
              <EmptyState
                icon={MessageSquare}
                title={
                  searchQuery || selectedTags.length > 0
                    ? "No threads found"
                    : "No discussions yet"
                }
                description={
                  searchQuery || selectedTags.length > 0
                    ? "Try adjusting your search or filters to find what you're looking for."
                    : "Be the first to start a discussion in this course forum."
                }
                action={
                  <Button asChild className="bg-primary hover:bg-primary/90">
                    <a href={`/courses/${params.courseId}/forum/new`}>
                      Start Discussion
                    </a>
                  </Button>
                }
              />
            ) : (
              <>
                <div className="space-y-4">
                  {paginated.map((t) => (
                    <ThreadCard
                      key={t.id}
                      thread={t}
                      author={usersById[t.authorId]}
                    />
                  ))}
                </div>

                {totalPages > 0 && (
                  <div className="mt-8 flex justify-center gap-2 mb-20">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>

                    <div className="flex items-center gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <Button
                            key={page}
                            // variant={
                            //   currentPage === page ? "default" : "outline"
                            // }

                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className={
                              currentPage === page
                                ? "bg-purple-400 hover:bg-primary/90"
                                : ""
                            }
                          >
                            {page}
                          </Button>
                        )
                      )}
                    </div>

                    <Button
                      variant="outline"
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </main>

          {/* RIGHT */}
          <aside className="hidden lg:block lg:col-span-3 space-y-4">
            <MeetupsList items={meetups} />
            <ResourcesList items={resources} />
          </aside>
        </div>
      </div>

      <BottomNav courseId={params.courseId} />
    </div>
  );
}
