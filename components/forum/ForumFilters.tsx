"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, Tag, X } from "lucide-react";
import type { SortOption, FilterOption, Tag as TagType } from "@/lib/types";

interface ForumFiltersProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  filterBy: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  availableTags: TagType[];
  totalThreads: number;
}

export function ForumFilters({
  sortBy,
  onSortChange,
  filterBy,
  onFilterChange,
  selectedTags,
  onTagsChange,
  availableTags,
  totalThreads,
}: ForumFiltersProps) {
  const handleTagToggle = (tagName: string) => {
    if (selectedTags.includes(tagName))
      onTagsChange(selectedTags.filter((t) => t !== tagName));
    else onTagsChange([...selectedTags, tagName]);
  };

  const clearAllFilters = () => {
    onFilterChange("all");
    onTagsChange([]);
  };

  const hasActiveFilters = filterBy !== "all" || selectedTags.length > 0;

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center ">
          <Select
            value={filterBy}
            onValueChange={(value: FilterOption) => onFilterChange(value)}
          >
            <SelectTrigger className="w-full sm:w-40">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All discussions</SelectItem>
              <SelectItem value="pinned">Pinned</SelectItem>
              <SelectItem value="unanswered">Unanswered</SelectItem>
              <SelectItem value="answered">Answered</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full sm:w-auto bg-transparent"
              >
                <Tag className="mr-2 h-4 w-4" />
                Tags
                {selectedTags.length > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-2 h-5 w-5 rounded-full p-0 text-xs"
                  >
                    {selectedTags.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter by tags</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {availableTags.map((tag) => (
                <DropdownMenuCheckboxItem
                  key={tag.id}
                  checked={selectedTags.includes(tag.name)}
                  onCheckedChange={() => handleTagToggle(tag.name)}
                >
                  {tag.name}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Select
            value={sortBy}
            onValueChange={(value: SortOption) => onSortChange(value)}
          >
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="most-active">Most active</SelectItem>
              <SelectItem value="top-voted">Top voted</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* <div className="flex items-center gap-4">
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="mr-1 h-3 w-3" />
            Clear filters
          </Button>
        )}
      </div> */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground">Active tags:</span>
          {selectedTags.map((name) => (
            <Badge
              key={name}
              variant="secondary"
              className="cursor-pointer hover:opacity-80"
              onClick={() => handleTagToggle(name)}
            >
              {name}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          ))}
        </div>
      )}{" "}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllFilters}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="mr-1 h-3 w-3" />
          Clear filters
        </Button>
      )}
      <div className="text-sm text-muted-foreground flex justify-end">
        {totalThreads} {totalThreads === 1 ? "discussion" : "discussions"}
      </div>
    </div>
  );
}
