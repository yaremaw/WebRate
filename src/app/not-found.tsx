import Link from "next/link";
import { AppLayout } from "@/components/layout/AppLayout";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <AppLayout>
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="mt-4 text-muted-foreground">
          This page doesn&apos;t exist. Maybe it was overrated and removed.
        </p>
        <Link
          href="/"
          className={cn(buttonVariants(), "mt-8 bg-violet-600 text-white hover:bg-violet-700")}
        >
          Back home
        </Link>
      </div>
    </AppLayout>
  );
}
