"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Collection } from "@/types";
import { items } from "@/data/items";
import { TagPill } from "@/components/TagPill";
import { Button } from "@/components/ui/button";

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
    <motion.article
      whileHover={{ y: -4 }}
      className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="grid h-28 grid-cols-2 gap-0.5 p-0.5">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-lg"
            style={{
              background: colors[i]
                ? `linear-gradient(135deg, ${colors[i]}44, ${colors[i]}88)`
                : "#e2e8f0",
            }}
          />
        ))}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold leading-tight">{collection.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {collection.description}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          by {collection.creator} · {collection.itemIds.length} items
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
          {collection.tags.slice(0, 2).map((tag) => (
            <TagPill key={tag} label={tag} variant="accent" />
          ))}
        </div>
        <Button asChild size="sm" variant="outline" className="mt-4 w-full">
          <Link href={`/collections/${collection.slug}`}>Open collection</Link>
        </Button>
      </div>
    </motion.article>
  );
}
