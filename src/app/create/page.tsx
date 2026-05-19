import { Suspense } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { CreateItemForm } from "@/components/CreateItemForm";

export default function CreatePage() {
  return (
    <AppLayout>
      <div className="mx-auto max-w-xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Create something new to judge</h1>
        <p className="mt-2 text-muted-foreground">
          Add anything to Rateverse. If it exists, someone has an opinion about it.
        </p>
        <div className="mt-8 rounded-2xl border border-border bg-card p-6">
          <Suspense fallback={<p className="text-muted-foreground">Loading form...</p>}>
            <CreateItemForm />
          </Suspense>
        </div>
      </div>
    </AppLayout>
  );
}
