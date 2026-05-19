import { AppLayout } from "@/components/layout/AppLayout";
import { CollectionCard } from "@/components/CollectionCard";
import { collections } from "@/data/collections";

export default function CollectionsPage() {
  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Collections</h1>
        <p className="mt-2 text-muted-foreground">
          Curated lists, hot takes, and rankings people actually care about.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((col) => (
            <CollectionCard key={col.id} collection={col} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
