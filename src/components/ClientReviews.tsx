"use client";

import { useSyncExternalStore } from "react";
import type { Review } from "@/types";
import { ReviewCard } from "@/components/ReviewCard";
import { getStoredReviews } from "@/lib/storage";

interface ClientReviewsProps {
  slug: string;
  baseReviews: Review[];
}

function getReviewsSnapshot(slug: string, baseReviews: Review[]): Review[] {
  const stored = getStoredReviews(slug);
  return stored.length > 0 ? [...stored, ...baseReviews] : baseReviews;
}

export function ClientReviews({ slug, baseReviews }: ClientReviewsProps) {
  const reviews = useSyncExternalStore(
    () => () => {},
    () => getReviewsSnapshot(slug, baseReviews),
    () => baseReviews
  );

  if (reviews.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">
        No ratings yet. Be the first brave soul.
      </p>
    );
  }

  return (
    <>
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </>
  );
}
