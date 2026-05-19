"use client";

import { useState } from "react";
import { toast } from "sonner";
import { getDailyPromptRating, saveDailyPromptRating } from "@/lib/storage";
import { RatingStars } from "@/components/RatingStars";
import { Zap } from "lucide-react";

const options = [
  { stars: 1, label: "barely loaded" },
  { stars: 2, label: "operating with friction" },
  { stars: 3, label: "acceptable human mode" },
  { stars: 4, label: "surprisingly alive" },
  { stars: 5, label: "dangerous productivity" },
];

export function DailyPromptCard() {
  const [rating, setRating] = useState(() => getDailyPromptRating() ?? 0);
  const [submitted, setSubmitted] = useState(() => getDailyPromptRating() !== null);

  const handleRate = (value: number) => {
    setRating(value);
    saveDailyPromptRating(value);
    setSubmitted(true);
    toast.success("Your energy level was logged.");
  };

  return (
    <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50 p-6 dark:border-violet-900 dark:from-violet-950/40 dark:to-indigo-950/40">
      <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400">
        <Zap className="h-4 w-4" />
        <span className="text-xs font-semibold uppercase tracking-wider">
          Today&apos;s prompt
        </span>
      </div>
      <h3 className="mt-2 text-lg font-bold">Rate your current energy level</h3>
      <div className="mt-4">
        <RatingStars value={rating} onChange={handleRate} size="lg" />
      </div>
      <ul className="mt-4 space-y-1.5">
        {options.map((opt) => (
          <li
            key={opt.stars}
            className={`text-sm ${
              rating === opt.stars
                ? "font-medium text-violet-700 dark:text-violet-300"
                : "text-muted-foreground"
            }`}
          >
            {opt.stars} star{opt.stars > 1 ? "s" : ""}: {opt.label}
          </li>
        ))}
      </ul>
      {submitted && (
        <p className="mt-3 text-sm text-violet-600 dark:text-violet-400">
          Logged for today. Come back tomorrow.
        </p>
      )}
    </div>
  );
}
