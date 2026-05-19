import { AppLayout } from "@/components/layout/AppLayout";
import { ItemPageWrapper } from "@/components/ItemPageWrapper";
import { items } from "@/data/items";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return items.map((item) => ({ slug: item.slug }));
}

export default async function ItemPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <AppLayout>
      <ItemPageWrapper slug={slug} />
    </AppLayout>
  );
}
