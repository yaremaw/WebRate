"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Share2, Bookmark, Star } from "lucide-react";
import type { RateItem, Review } from "@/types";
import { RatingStars } from "@/components/RatingStars";
import { RatingDistribution } from "@/components/RatingDistribution";
import { ClientReviews } from "@/components/ClientReviews";
import { RatingCard } from "@/components/RatingCard";
import { TagPill } from "@/components/TagPill";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { saveUserRating, saveStoredReview } from "@/lib/storage";
import { getRelatedItems } from "@/data/items";

interface ItemDetailClientProps {
  item: RateItem;
}

const dimensionLabels: Record<string, string> = {
  taste: "Taste",
  looks: "Looks",
  price: "Price",
  usefulness: "Usefulness",
  overrated: "Overrated score",
  fun: "Fun",
  beauty: "Beauty",
  trust: "Trust",
  chaos: "Chaos",
};

export function ItemDetailClient({ item }: ItemDetailClientProps) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [reviewsKey, setReviewsKey] = useState(0);
  const [dimensions, setDimensions] = useState<Record<string, number>>({});

  const related = getRelatedItems(item, 3);
  const topReaction =
    item.tags.find((t) => ["controversial", "debate", "hot debate"].includes(t)) ??
    item.tags[0] ??
    "mixed feelings";

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error("Pick a star rating first.");
      return;
    }
    saveUserRating({
      itemSlug: item.slug,
      rating,
      review: reviewText,
      anonymous,
      dimensions,
      date: new Date().toISOString(),
    });
    if (reviewText.trim()) {
      const newReview: Review = {
        id: `local-${Date.now()}`,
        userName: anonymous ? "Anonymous" : "You",
        avatar: anonymous ? "?" : "YO",
        rating,
        text: reviewText.trim(),
        date: new Date().toISOString().split("T")[0],
        helpfulCount: 0,
        funnyCount: 0,
      };
      saveStoredReview(item.slug, newReview);
      setReviewsKey((k) => k + 1);
    }
    toast.success("Your rating was saved.");
    setReviewText("");
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard.");
    } catch {
      toast.success("Share link ready.");
    }
  };

  const handleAddToCollection = () => {
    toast.success("Added to your collection draft.");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top section */}
      <div className="grid gap-8 lg:grid-cols-2">
        <div
          className="aspect-video rounded-2xl lg:aspect-square"
          style={{
            background: item.color
              ? `linear-gradient(135deg, ${item.color}33, ${item.color}88)`
              : undefined,
          }}
        />
        <div>
          <p className="text-sm font-medium text-violet-600 dark:text-violet-400">
            {item.category}
          </p>
          <h1 className="mt-1 text-3xl font-bold sm:text-4xl">{item.title}</h1>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-xl bg-amber-50 px-3 py-1.5 dark:bg-amber-950/50">
              <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              <span className="text-2xl font-bold">{item.averageRating.toFixed(1)}</span>
            </div>
            <span className="text-muted-foreground">
              {item.ratingCount.toLocaleString()} ratings
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <TagPill
                key={tag}
                label={tag}
                variant={tag.includes("controversial") || tag.includes("debate") ? "controversial" : "default"}
              />
            ))}
          </div>
          <p className="mt-4 text-muted-foreground leading-relaxed">{item.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button className="bg-violet-600 hover:bg-violet-700" onClick={() => document.getElementById("rate-section")?.scrollIntoView({ behavior: "smooth" })}>
              Rate this
            </Button>
            <Button variant="outline" onClick={handleAddToCollection}>
              <Bookmark className="mr-2 h-4 w-4" />
              Add to collection
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {/* Rating form */}
        <div id="rate-section" className="lg:col-span-2 space-y-8">
          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-xl font-bold">Add your verdict</h2>
            <div className="mt-4">
              <RatingStars value={rating} onChange={setRating} size="lg" />
            </div>

            {item.dimensions && Object.keys(item.dimensions).length > 0 && (
              <div className="mt-6 space-y-4">
                <p className="text-sm font-medium text-muted-foreground">Rate by dimension</p>
                {Object.keys(item.dimensions).map((key) => (
                  <div key={key}>
                    <Label className="text-sm">{dimensionLabels[key] ?? key}</Label>
                    <RatingStars
                      value={dimensions[key] ?? 0}
                      onChange={(v) => setDimensions((d) => ({ ...d, [key]: v }))}
                      size="sm"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 space-y-2">
              <Label htmlFor="review">Short review (optional)</Label>
              <Textarea
                id="review"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Say something useful. Or funny. Ideally both."
                rows={3}
              />
            </div>

            <div className="mt-4 flex items-center gap-2">
              <Switch id="anonymous" checked={anonymous} onCheckedChange={setAnonymous} />
              <Label htmlFor="anonymous" className="text-sm">
                Rate anonymously
              </Label>
            </div>

            <Button
              className="mt-6 bg-violet-600 hover:bg-violet-700"
              onClick={handleSubmit}
            >
              Submit rating
            </Button>
          </section>

          {/* Reviews */}
          <section>
            <h2 className="text-xl font-bold">Reviews</h2>
            <div className="mt-4 space-y-4">
              <ClientReviews
                key={reviewsKey}
                slug={item.slug}
                baseReviews={item.reviews}
              />
            </div>
          </section>
        </div>

        {/* Summary sidebar */}
        <aside className="space-y-6">
          <section className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-semibold">Rating summary</h3>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-bold">{item.averageRating.toFixed(1)}</span>
              <span className="text-muted-foreground">/ 5</span>
            </div>
            <div className="mt-4">
              <RatingDistribution distribution={item.ratingDistribution} />
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <p>
                <span className="text-muted-foreground">Most common reaction:</span>{" "}
                <span className="font-medium">{topReaction}</span>
              </p>
              <p>
                <span className="text-muted-foreground">Controversy score:</span>{" "}
                <span className="font-medium">{item.controversyScore}/100</span>
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-semibold">People who rated this highly also liked</h3>
            <div className="mt-4 space-y-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/items/${r.slug}`}
                  className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted transition-colors"
                >
                  <div
                    className="h-10 w-10 rounded-lg shrink-0"
                    style={{
                      background: r.color
                        ? `linear-gradient(135deg, ${r.color}44, ${r.color}88)`
                        : "#e2e8f0",
                    }}
                  />
                  <div className="min-w-0">
                    <p className="truncate font-medium text-sm">{r.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {r.averageRating.toFixed(1)} · {r.category}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </div>

      {/* Related cards */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold">Related items</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <RatingCard key={r.id} item={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
