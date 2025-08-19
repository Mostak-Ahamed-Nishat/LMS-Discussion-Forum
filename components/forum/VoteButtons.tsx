"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { voteThread, voteReply } from "@/lib/api/votes";
import { toast } from "sonner";

interface VoteButtonsProps {
  targetId: number;
  targetType: "thread" | "reply";
  votes: number;
  userVote?: "up" | "down" | null;
  onVote?: (type: "up" | "down", votes: number) => void;
  className?: string;
  size?: "sm" | "default";
}

export function VoteButtons({
  targetId,
  targetType,
  votes: initialVotes,
  userVote: initialUserVote = null,
  onVote,
  className,
  size = "default",
}: VoteButtonsProps) {
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState<"up" | "down" | null>(
    initialUserVote
  );
  const [isLoading, setIsLoading] = useState(false);

  const buttonSize = size === "sm" ? "h-6 w-6" : "h-8 w-8";
  const iconSize = size === "sm" ? "h-3 w-3" : "h-4 w-4";

  async function handleVote(type: "up" | "down") {
    if (isLoading) return;
    setIsLoading(true);

    const wasVoted = userVote === type;
    const newUserVote = wasVoted ? null : type;
    const delta = wasVoted
      ? type === "up"
        ? -1
        : +1
      : userVote
      ? type === "up"
        ? +2
        : -2
      : type === "up"
      ? +1
      : -1;

    // optimistic
    setUserVote(newUserVote);
    setVotes((v) => v + delta);

    try {
      if (targetType === "thread")
        await voteThread(targetId, type === "up" ? 1 : -1);
      else await voteReply(targetId, type === "up" ? 1 : -1);

      onVote?.(type, votes + delta);
    } catch (e) {
      // revert
      setUserVote(userVote);
      setVotes(initialVotes);
      toast("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          buttonSize,
          "p-0 hover:bg-green-50 hover:text-green-600",
          userVote === "up" && "bg-green-50 text-green-600"
        )}
        onClick={() => handleVote("up")}
        disabled={isLoading}
      >
        <ChevronUp className={iconSize} />
      </Button>

      <span
        className={cn(
          "text-sm font-medium tabular-nums",
          votes > 0 && "text-green-600",
          votes < 0 && "text-red-600",
          votes === 0 && "text-muted-foreground"
        )}
      >
        {votes}
      </span>

      <Button
        variant="ghost"
        size="sm"
        className={cn(
          buttonSize,
          "p-0 hover:bg-red-50 hover:text-red-600",
          userVote === "down" && "bg-red-50 text-red-600"
        )}
        onClick={() => handleVote("down")}
        disabled={isLoading}
      >
        <ChevronDown className={iconSize} />
      </Button>
    </div>
  );
}
