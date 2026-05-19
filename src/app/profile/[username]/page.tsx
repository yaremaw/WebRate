import Link from "next/link";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { TasteIdentityCard } from "@/components/TasteIdentityCard";
import { CollectionCard } from "@/components/CollectionCard";
import { RatingCard } from "@/components/RatingCard";
import { TagPill } from "@/components/TagPill";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getUserByUsername } from "@/data/users";
import { items } from "@/data/items";
import { collections } from "@/data/collections";

interface PageProps {
  params: Promise<{ username: string }>;
}

export default async function ProfilePage({ params }: PageProps) {
  const { username } = await params;
  const user = getUserByUsername(username);

  if (!user) {
    notFound();
  }

  const topItems = user.topRatedItemIds
    .map((id) => items.find((i) => i.id === id))
    .filter(Boolean);
  const lowItems = user.lowestRatedItemIds
    .map((id) => items.find((i) => i.id === id))
    .filter(Boolean);
  const userCollections = user.collectionIds
    .map((id) => collections.find((c) => c.id === id))
    .filter(Boolean);

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Profile header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <Avatar className="h-24 w-24">
            <AvatarFallback className="bg-violet-100 text-2xl font-bold text-violet-700 dark:bg-violet-950 dark:text-violet-300">
              {user.avatar}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">@{user.username}</p>
            <p className="mt-3 max-w-lg text-muted-foreground leading-relaxed">{user.bio}</p>
            <div className="mt-4 flex flex-wrap gap-6 text-sm">
              <div>
                <span className="font-bold text-lg">{user.stats.totalRatings}</span>
                <span className="ml-1 text-muted-foreground">ratings</span>
              </div>
              <div>
                <span className="font-bold text-lg">{user.stats.collections}</span>
                <span className="ml-1 text-muted-foreground">collections</span>
              </div>
              <div>
                <span className="font-bold text-lg flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  {user.stats.averageRatingGiven.toFixed(1)}
                </span>
                <span className="ml-1 text-muted-foreground">avg given</span>
              </div>
              <div>
                <span className="font-bold text-lg">{user.stats.mostRatedCategory}</span>
                <span className="ml-1 text-muted-foreground">top category</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <TasteIdentityCard
            identity={user.tasteIdentity}
            description={user.tasteDescription}
          />
        </div>

        {/* Controversial opinion */}
        <section className="mt-12 rounded-2xl border border-orange-200 bg-orange-50/50 p-6 dark:border-orange-900 dark:bg-orange-950/20">
          <h2 className="font-semibold text-orange-700 dark:text-orange-400">
            Most controversial opinion
          </h2>
          <p className="mt-2">
            Rated <strong>{user.controversialOpinion.itemTitle}</strong>{" "}
            {user.controversialOpinion.rating}/5
          </p>
          <p className="mt-1 text-muted-foreground italic">
            &ldquo;{user.controversialOpinion.text}&rdquo;
          </p>
        </section>

        {/* Favorite categories */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">Favorite categories</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {user.favoriteCategories.map((cat) => (
              <TagPill key={cat} label={cat} variant="accent" />
            ))}
          </div>
        </section>

        {/* Top rated */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">Top-rated items</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topItems.map((item) => item && <RatingCard key={item.id} item={item} />)}
          </div>
        </section>

        {/* Lowest rated */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">Lowest-rated items</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {lowItems.map((item) => item && <RatingCard key={item.id} item={item} />)}
          </div>
        </section>

        {/* Recent ratings */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">Recent ratings</h2>
          <div className="mt-4 divide-y divide-border rounded-xl border border-border">
            {user.recentRatings.map((r) => (
              <Link
                key={r.itemId + r.date}
                href={`/items/${r.itemSlug}`}
                className="flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors"
              >
                <span className="font-medium">{r.itemTitle}</span>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">{r.rating}</span>
                  <span className="text-xs text-muted-foreground">{r.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Collections */}
        <section className="mt-12 pb-8">
          <h2 className="text-xl font-bold">Collections</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {userCollections.map((col) => col && <CollectionCard key={col.id} collection={col} />)}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
