"use client";
import { ArrowUp, ArrowDown } from "lucide-react";

export default function VoteBar({
  score,
  onUp,
  onDown,
  compact = false,
}: {
  score: number;
  onUp: () => void;
  onDown: () => void;
  compact?: boolean;
}) {
  return (
    <div
      className={
        compact
          ? "mt-2 flex flex-col items-center"
          : "flex flex-col items-center  py-3 "
      }
    >
      <button
        onClick={onUp}
        className="rounded-md p-1 hover:bg-gray-50"
        aria-label="Upvote"
      >
        <ArrowUp className={compact ? "h-4 w-4" : "h-5 w-5"} />
      </button>
      <div
        className={`my-1 font-semibold text-gray-900 leading-none ${
          compact ? "text-sm" : "text-base"
        }`}
      >
        {score}
      </div>
      <button
        onClick={onDown}
        className="rounded-md p-1 hover:bg-gray-50"
        aria-label="Downvote"
      >
        <ArrowDown className={compact ? "h-4 w-4" : "h-5 w-5"} />
      </button>
    </div>
  );
}
