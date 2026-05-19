"use client";

import { useState } from "react";
import { ThumbsUp, Smile } from "lucide-react";
import type { Review } from "@/types";
import { RatingStars } from "@/components/RatingStars";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const [helpful, setHelpful] = useState(review.helpfulCount);
  const [funny, setFunny] = useState(review.funnyCount);
  const [votedHelpful, setVotedHelpful] = useState(false);
  const [votedFunny, setVotedFunny] = useState(false);

  return (
    <article className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-start gap-3">
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
            {review.avatar}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold">{review.userName}</span>
            <RatingStars value={review.rating} readonly size="sm" />
            <span className="text-xs text-muted-foreground">{review.date}</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed">{review.text}</p>
          <div className="mt-3 flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className={cn("h-8 gap-1.5 text-xs", votedHelpful && "text-violet-600")}
              onClick={() => {
                if (!votedHelpful) {
                  setHelpful((h) => h + 1);
                  setVotedHelpful(true);
                }
              }}
            >
              <ThumbsUp className="h-3.5 w-3.5" />
              Helpful ({helpful})
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn("h-8 gap-1.5 text-xs", votedFunny && "text-amber-600")}
              onClick={() => {
                if (!votedFunny) {
                  setFunny((f) => f + 1);
                  setVotedFunny(true);
                }
              }}
            >
              <Smile className="h-3.5 w-3.5" />
              Funny ({funny})
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
