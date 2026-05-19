import type { RatingDistribution as DistType } from "@/types";
import { cn } from "@/lib/utils";

interface RatingDistributionProps {
  distribution: DistType;
  compact?: boolean;
  className?: string;
}

export function RatingDistribution({
  distribution,
  compact = false,
  className,
}: RatingDistributionProps) {
  const total = Object.values(distribution).reduce((a, b) => a + b, 0);
  const stars = [5, 4, 3, 2, 1] as const;

  if (total === 0) {
    return (
      <p className="text-sm text-muted-foreground">No ratings yet. Be the first brave soul.</p>
    );
  }

  if (compact) {
    return (
      <div className={cn("flex h-1.5 w-full overflow-hidden rounded-full", className)}>
        {stars.map((star) => {
          const pct = (distribution[star] / total) * 100;
          if (pct === 0) return null;
          const colors: Record<number, string> = {
            5: "bg-emerald-500",
            4: "bg-lime-500",
            3: "bg-amber-400",
            2: "bg-orange-400",
            1: "bg-red-500",
          };
          return (
            <div
              key={star}
              style={{ width: `${pct}%` }}
              className={colors[star]}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      {stars.map((star) => {
        const count = distribution[star];
        const pct = total > 0 ? (count / total) * 100 : 0;
        return (
          <div key={star} className="flex items-center gap-2 text-sm">
            <span className="w-3 text-muted-foreground">{star}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-violet-500 transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="w-10 text-right text-xs text-muted-foreground">
              {Math.round(pct)}%
            </span>
          </div>
        );
      })}
    </div>
  );
}
