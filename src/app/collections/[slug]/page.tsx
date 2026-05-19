import Link from "next/link";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { TagPill } from "@/components/TagPill";
import { getCollectionBySlug } from "@/data/collections";
import { items } from "@/data/items";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { collections } = await import("@/data/collections");
  return collections.map((c) => ({ slug: c.slug }));
}

export default async function CollectionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const collectionItems = collection.itemIds
    .map((id, index) => {
      const item = items.find((i) => i.id === id);
      return item ? { ...item, rank: index + 1 } : null;
    })
    .filter(Boolean);

  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">
          by{" "}
          <Link
            href={`/profile/${collection.creatorUsername}`}
            className="font-medium text-violet-600 hover:underline dark:text-violet-400"
          >
            {collection.creator}
          </Link>
        </p>
        <h1 className="mt-1 text-3xl font-bold">{collection.title}</h1>
        <p className="mt-3 text-muted-foreground leading-relaxed">{collection.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {collection.tags.map((tag) => (
            <TagPill key={tag} label={tag} variant="accent" />
          ))}
        </div>

        <div className="mt-10 space-y-4">
          {collectionItems.length === 0 ? (
            <p className="text-muted-foreground text-sm">This collection is still growing.</p>
          ) : (
            collectionItems.map((item) => (
              <Link
                key={item!.id}
                href={`/items/${item!.slug}`}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 hover:shadow-md transition-shadow"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700 font-bold dark:bg-violet-950 dark:text-violet-300">
                  {item!.rank}
                </span>
                <div
                  className="h-14 w-14 shrink-0 rounded-lg"
                  style={{
                    background: item!.color
                      ? `linear-gradient(135deg, ${item!.color}44, ${item!.color}88)`
                      : "#e2e8f0",
                  }}
                />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{item!.title}</p>
                  <p className="text-sm text-muted-foreground">{item!.category}</p>
                  <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                    {item!.description}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold">{item!.averageRating.toFixed(1)}</span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </AppLayout>
  );
}
