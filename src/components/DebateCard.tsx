import Link from "next/link";
import type { RateItem } from "@/types";
import { RatingDistribution } from "@/components/RatingDistribution";
import { Button } from "@/components/ui/button";

interface DebateCardProps {
  item: RateItem;
}

export function DebateCard({ item }: DebateCardProps) {
  return (
    <article className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <Link href={`/items/${item.slug}`}>
        <h3 className="font-semibold text-lg hover:text-violet-600 dark:hover:text-violet-400">
          {item.title}
        </h3>
      </Link>
      <p className="mt-1 text-sm text-orange-600 dark:text-orange-400 font-medium">
        People disagree strongly
      </p>
      <div className="mt-4">
        <RatingDistribution distribution={item.ratingDistribution} compact />
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {item.positiveQuote && (
          <blockquote className="rounded-lg bg-emerald-50 px-3 py-2 text-sm dark:bg-emerald-950/30">
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              +
            </span>{" "}
            {item.positiveQuote}
          </blockquote>
        )}
        {item.negativeQuote && (
          <blockquote className="rounded-lg bg-red-50 px-3 py-2 text-sm dark:bg-red-950/30">
            <span className="text-xs font-semibold text-red-600 dark:text-red-400">−</span>{" "}
            {item.negativeQuote}
          </blockquote>
        )}
      </div>
      <Button asChild variant="outline" size="sm" className="mt-4">
        <Link href={`/items/${item.slug}`}>See the debate</Link>
      </Button>
    </article>
  );
}
