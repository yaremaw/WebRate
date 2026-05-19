"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
import { RatingCard } from "@/components/RatingCard";
import { CategoryPill } from "@/components/CategoryPill";
import { EmptyState } from "@/components/EmptyState";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { items } from "@/data/items";
import { categories } from "@/data/categories";
import type { Category, SortOption } from "@/types";
import { Search } from "lucide-react";

function ExploreContent() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(() => searchParams.get("q") ?? "");
  const [category, setCategory] = useState<Category | "all">(
    () => (searchParams.get("category") as Category) || "all"
  );
  const [sort, setSort] = useState<SortOption>("trending");
  const [minRating, setMinRating] = useState(0);
  const [onlyControversial, setOnlyControversial] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | "all">("all");

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    items.forEach((i) => i.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, []);

  const filtered = useMemo(() => {
    let result = [...items];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (category !== "all") {
      result = result.filter((i) => i.category === category);
    }

    if (minRating > 0) {
      result = result.filter((i) => i.averageRating >= minRating);
    }

    if (onlyControversial) {
      result = result.filter((i) => i.controversyScore >= 60);
    }

    if (selectedTag !== "all") {
      result = result.filter((i) => i.tags.includes(selectedTag));
    }

    switch (sort) {
      case "top-rated":
        result.sort((a, b) => b.averageRating - a.averageRating);
        break;
      case "controversial":
        result.sort((a, b) => b.controversyScore - a.controversyScore);
        break;
      case "newest":
        result.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "most-rated":
        result.sort((a, b) => b.ratingCount - a.ratingCount);
        break;
      default:
        result.sort((a, b) => b.ratingCount * b.averageRating - a.ratingCount * a.averageRating);
    }

    return result;
  }, [search, category, sort, minRating, onlyControversial, selectedTag]);

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Explore ratings</h1>
        <p className="mt-1 text-muted-foreground">
          People have opinions. Some of them are even useful.
        </p>

        <div className="mt-8 flex flex-col gap-6 lg:flex-row">
          {/* Filters sidebar */}
          <aside className="w-full shrink-0 space-y-6 lg:w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Sort by
              </Label>
              <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trending">Trending</SelectItem>
                  <SelectItem value="top-rated">Top rated</SelectItem>
                  <SelectItem value="controversial">Most controversial</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="most-rated">Most rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Min rating
              </Label>
              <Select
                value={String(minRating)}
                onValueChange={(v) => setMinRating(Number(v))}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Any</SelectItem>
                  <SelectItem value="2">2+ stars</SelectItem>
                  <SelectItem value="3">3+ stars</SelectItem>
                  <SelectItem value="4">4+ stars</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="controversial">Only controversial</Label>
              <Switch
                id="controversial"
                checked={onlyControversial}
                onCheckedChange={setOnlyControversial}
              />
            </div>

            <div>
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Tags
              </Label>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <CategoryPill
                  label="All"
                  active={selectedTag === "all"}
                  onClick={() => setSelectedTag("all")}
                />
                {allTags.map((tag) => (
                  <CategoryPill
                    key={tag}
                    label={tag}
                    active={selectedTag === tag}
                    onClick={() => setSelectedTag(tag)}
                  />
                ))}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 overflow-x-auto pb-4">
              <CategoryPill
                label="All"
                active={category === "all"}
                onClick={() => setCategory("all")}
              />
              {categories.map((cat) => (
                <CategoryPill
                  key={cat.name}
                  label={cat.name}
                  active={category === cat.name}
                  onClick={() => setCategory(cat.name)}
                />
              ))}
            </div>

            <p className="mb-4 text-sm text-muted-foreground">
              {filtered.length} item{filtered.length !== 1 ? "s" : ""}
            </p>

            {filtered.length === 0 ? (
              <EmptyState
                title="Nothing here yet"
                description="Try loosening your filters or create something new to judge."
                actionLabel="Create item"
                actionHref="/create"
              />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((item) => (
                  <RatingCard key={item.id} item={item} showDistribution />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <ExploreContent />
    </Suspense>
  );
}
