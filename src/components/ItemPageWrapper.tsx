"use client";

import { useSyncExternalStore } from "react";
import { notFound } from "next/navigation";
import { ItemDetailClient } from "@/components/ItemDetailClient";
import { getItemBySlug } from "@/data/items";
import { getCreatedItems } from "@/lib/storage";
import type { RateItem } from "@/types";

interface ItemPageWrapperProps {
  slug: string;
}

function resolveItem(slug: string): RateItem | null {
  const mockItem = getItemBySlug(slug);
  if (mockItem) return mockItem;
  if (typeof window === "undefined") return null;
  return getCreatedItems().find((i) => i.slug === slug) ?? null;
}

function subscribe() {
  return () => {};
}

export function ItemPageWrapper({ slug }: ItemPageWrapperProps) {
  const item = useSyncExternalStore(
    subscribe,
    () => resolveItem(slug),
    () => getItemBySlug(slug)
  );

  if (!item) {
    notFound();
  }

  return <ItemDetailClient item={item} />;
}
