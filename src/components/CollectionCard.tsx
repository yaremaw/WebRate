"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Collection } from "@/types";
import { items } from "@/data/items";
import { TagPill } from "@/components/TagPill";
import { cn } from "@/lib/utils";

interface CollectionCardProps {
  collection: Collection;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  const collectionItems = collection.itemIds
    .map((id) => items.find((i) => i.id === id))
    .filter(Boolean)
    .slice(0, 4);

  const colors =
    collection.coverColors ??
    collectionItems.map((i) => i?.color ?? "#94a3b8");

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Link
        href={`/collections/${collection.slug}`}
        className={cn(
          "group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card",
          "shadow-sm transition-all hover:border-violet-300/60 hover:shadow-lg hover:shadow-violet-500/10",
          "dark:hover:border-violet-700/50"
        )}
      >
        <div className="grid h-32 grid-cols-2 gap-1 p-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-lg transition-transform group-hover:scale-[1.02]"
              style={{
                background: colors[i]
                  ? `linear-gradient(135deg, ${colors[i]}55, ${colors[i]}99)`
                  : "linear-gradient(135deg, #e2e8f0, #cbd5e1)",
              }}
            />
          ))}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-semibold leading-tight group-hover:text-violet-600 dark:group-hover:text-violet-400">
            {collection.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
            {collection.description}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            by {collection.creator} · {collection.itemIds.length} items
          </p>
          <div className="mt-3 flex flex-wrap gap-1">
            {collection.tags.slice(0, 2).map((tag) => (
              <TagPill key={tag} label={tag} variant="accent" />
            ))}
          </div>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-violet-600 dark:text-violet-400">
            Open collection
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
