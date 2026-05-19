import { collections } from "@/data/collections";
import { items } from "@/data/items";
import type { Category, Collection, RateItem } from "@/types";

export interface SearchResult {
  type: "item" | "category" | "collection";
  id: string;
  title: string;
  subtitle?: string;
  href: string;
}

const categories: Category[] = [
  "Movies & Shows",
  "Food & Drinks",
  "Places",
  "Products",
  "Apps & Websites",
  "Music",
  "Games",
  "Life",
  "Work & Study",
  "Random",
];

export function searchAll(query: string): SearchResult[] {
  if (!query.trim()) return [];

  const q = query.toLowerCase();
  const results: SearchResult[] = [];

  items.forEach((item: RateItem) => {
    if (
      item.title.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q)) ||
      item.category.toLowerCase().includes(q)
    ) {
      results.push({
        type: "item",
        id: item.id,
        title: item.title,
        subtitle: item.category,
        href: `/items/${item.slug}`,
      });
    }
  });

  categories.forEach((cat) => {
    if (cat.toLowerCase().includes(q)) {
      results.push({
        type: "category",
        id: cat,
        title: cat,
        subtitle: "Category",
        href: `/explore?category=${encodeURIComponent(cat)}`,
      });
    }
  });

  collections.forEach((col: Collection) => {
    if (
      col.title.toLowerCase().includes(q) ||
      col.tags.some((t) => t.toLowerCase().includes(q))
    ) {
      results.push({
        type: "collection",
        id: col.id,
        title: col.title,
        subtitle: `Collection by ${col.creator}`,
        href: `/collections/${col.slug}`,
      });
    }
  });

  return results.slice(0, 8);
}

export function hasExactMatch(query: string): boolean {
  const q = query.toLowerCase().trim();
  return items.some((item) => item.title.toLowerCase() === q);
}
