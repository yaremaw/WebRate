"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { RateItem } from "@/types";
import { RatingDistribution } from "@/components/RatingDistribution";
import { TagPill } from "@/components/TagPill";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RatingCardProps {
  item: RateItem;
  showDistribution?: boolean;
  className?: string;
}

export function RatingCard({ item, showDistribution = false, className }: RatingCardProps) {
  const isControversial = item.controversyScore >= 70;

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md",
        className
      )}
    >
      <Link href={`/items/${item.slug}`} className="block">
        <div
          className="relative h-36 w-full"
          style={{
            background: item.color
              ? `linear-gradient(135deg, ${item.color}22, ${item.color}55)`
              : undefined,
          }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center text-4xl font-bold opacity-20"
            style={{ color: item.color }}
          >
            {item.title.charAt(0)}
          </div>
          {isControversial && (
            <div className="absolute right-3 top-3">
              <TagPill label="controversial" variant="controversial" />
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-medium text-violet-600 dark:text-violet-400">
                {item.category}
              </p>
              <h3 className="mt-0.5 font-semibold leading-tight group-hover:text-violet-600 dark:group-hover:text-violet-400">
                {item.title}
              </h3>
            </div>
            <div className="flex shrink-0 items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 dark:bg-amber-950/50">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="text-sm font-bold">{item.averageRating.toFixed(1)}</span>
            </div>
          </div>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {item.tags.slice(0, 3).map((tag) => (
              <TagPill key={tag} label={tag} />
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {item.ratingCount.toLocaleString()} ratings
          </p>
          {showDistribution && (
            <div className="mt-3">
              <RatingDistribution distribution={item.ratingDistribution} compact />
            </div>
          )}
        </div>
      </Link>
      <div className="border-t border-border px-4 py-3">
        <Button
          asChild
          size="sm"
          className="w-full bg-violet-600 hover:bg-violet-700"
        >
          <Link href={`/items/${item.slug}`}>Rate this</Link>
        </Button>
      </div>
    </motion.article>
  );
}
