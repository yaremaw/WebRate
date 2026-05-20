"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { RateItem } from "@/types";
import { RatingDistribution } from "@/components/RatingDistribution";
import { TagPill } from "@/components/TagPill";
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
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className={cn("h-full", className)}
    >
      <Link
        href={`/items/${item.slug}`}
        className={cn(
          "group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card/95",
          "shadow-sm transition-all hover:border-violet-300/50 hover:shadow-lg hover:shadow-violet-500/10",
          "dark:hover:border-violet-700/40"
        )}
      >
        <div
          className="relative h-40 w-full overflow-hidden"
          style={{
            background: item.color
              ? `linear-gradient(145deg, ${item.color}18 0%, ${item.color}45 50%, ${item.color}22 100%)`
              : "linear-gradient(145deg, #f1f5f9, #e2e8f0)",
          }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center text-5xl font-black opacity-[0.12]"
            style={{ color: item.color ?? "#64748b" }}
          >
            {item.title.charAt(0)}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
          {isControversial && (
            <div className="absolute right-3 top-3 z-10">
              <TagPill label="controversial" variant="controversial" />
            </div>
          )}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-background/90 px-2.5 py-1 shadow-sm backdrop-blur-sm">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-sm font-bold">{item.averageRating.toFixed(1)}</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-400">
            {item.category}
          </p>
          <h3 className="mt-1 font-semibold leading-snug group-hover:text-violet-600 dark:group-hover:text-violet-400">
            {item.title}
          </h3>
          <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">
            {item.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-1">
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
          <span className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-violet-600 px-3 py-2 text-sm font-medium text-white transition-colors group-hover:bg-violet-700">
            Rate this
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
