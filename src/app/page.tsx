"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { RatingCard } from "@/components/RatingCard";
import { DebateCard } from "@/components/DebateCard";
import { CollectionCard } from "@/components/CollectionCard";
import { DailyPromptCard } from "@/components/DailyPromptCard";
import { CategoryPill } from "@/components/CategoryPill";
import { TagPill } from "@/components/TagPill";
import { Button } from "@/components/ui/button";
import { getTrendingItems, getControversialItems, items } from "@/data/items";
import { collections } from "@/data/collections";
import { categories } from "@/data/categories";

const heroCards = [
  {
    title: "Pineapple Pizza",
    rating: 3.1,
    tag: "controversial",
    color: "#f97316",
    slug: "pineapple-pizza",
  },
  {
    title: "MacBook Air M4",
    rating: 4.7,
    tag: "tech",
    color: "#94a3b8",
    slug: "macbook-air-m4",
  },
  {
    title: "Sleeping with Socks",
    rating: 2.4,
    tag: "hot debate",
    color: "#8b5cf6",
    slug: "sleeping-with-socks",
  },
];

export default function HomePage() {
  const trending = getTrendingItems(6);
  const debates = getControversialItems(3);
  const featuredCollections = collections.slice(0, 5);

  return (
    <AppLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50/80 via-background to-indigo-50/50 dark:from-violet-950/20 dark:via-background dark:to-indigo-950/10" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm font-medium text-violet-600 dark:text-violet-400">
                Your opinion finally has a dashboard.
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Rate anything.
                <br />
                <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  Compare everything.
                </span>
              </h1>
              <p className="mt-4 max-w-lg text-lg text-muted-foreground leading-relaxed">
                Movies, food, places, apps, habits, gadgets, memes, cities, and the
                strange little things people secretly have opinions about.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" className="bg-violet-600 hover:bg-violet-700" asChild>
                  <Link href="/create">
                    Start rating
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/explore">Explore trending</Link>
                </Button>
              </div>
            </motion.div>

            <div className="relative hidden h-80 lg:block">
              {heroCards.map((card, i) => (
                <motion.div
                  key={card.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                  className="absolute w-52 rounded-2xl border border-border bg-card p-4 shadow-lg"
                  style={{
                    top: i * 60,
                    left: i * 80,
                    rotate: i === 0 ? -6 : i === 1 ? 3 : -3,
                    zIndex: 3 - i,
                  }}
                >
                  <div
                    className="mb-3 h-16 rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, ${card.color}33, ${card.color}66)`,
                    }}
                  />
                  <h3 className="font-semibold text-sm">{card.title}</h3>
                  <div className="mt-2 flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold">{card.rating}</span>
                    <span className="text-muted-foreground text-sm">/ 5</span>
                  </div>
                  <TagPill
                    label={card.tag}
                    variant={card.tag === "controversial" ? "controversial" : "accent"}
                    className="mt-2"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Daily prompt + trending */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <DailyPromptCard />
          </div>
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Trending now</h2>
              <Link
                href="/explore"
                className="text-sm font-medium text-violet-600 hover:underline dark:text-violet-400"
              >
                View all
              </Link>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {trending.slice(0, 4).map((item) => (
                <RatingCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hot debates */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Hot debates</h2>
          <p className="mt-1 text-muted-foreground">
            This one divides the room.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {debates.map((item) => (
              <DebateCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold">How it works</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {[
            { step: "1", title: "Pick anything", desc: "Search or create something worth judging." },
            { step: "2", title: "Rate it your way", desc: "Stars, dimensions, or a quick hot take." },
            { step: "3", title: "Compare with everyone", desc: "See distributions, debates, and taste profiles." },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-2xl border border-border bg-card p-6 text-center"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-700 font-bold dark:bg-violet-950 dark:text-violet-300">
                {item.step}
              </span>
              <h3 className="mt-4 font-semibold text-lg">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Popular categories</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <CategoryPill
                key={cat.name}
                label={`${cat.emoji} ${cat.name}`}
                href={`/explore?category=${encodeURIComponent(cat.name)}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Collections people are making</h2>
          <Link
            href="/collections"
            className="text-sm font-medium text-violet-600 hover:underline dark:text-violet-400"
          >
            Browse all
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCollections.map((col) => (
            <CollectionCard key={col.id} collection={col} />
          ))}
        </div>
      </section>

      {/* More trending grid */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold">More to rate</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.slice(0, 8).map((item) => (
            <RatingCard key={item.id} item={item} showDistribution />
          ))}
        </div>
      </section>
    </AppLayout>
  );
}
