"use client";

import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  value?: number;
  onChange?: (value: number) => void;
  size?: "sm" | "md" | "lg";
  readonly?: boolean;
  showValue?: boolean;
}

const sizes = {
  sm: "h-3.5 w-3.5",
  md: "h-5 w-5",
  lg: "h-7 w-7",
};

export function RatingStars({
  value = 0,
  onChange,
  size = "md",
  readonly = false,
  showValue = false,
}: RatingStarsProps) {
  const [hover, setHover] = React.useState(0);
  const display = hover || value;

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={readonly}
            className={cn(
              "transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded",
              !readonly && "hover:scale-110 cursor-pointer",
              readonly && "cursor-default"
            )}
            onMouseEnter={() => !readonly && setHover(star)}
            onMouseLeave={() => !readonly && setHover(0)}
            onClick={() => !readonly && onChange?.(star)}
            aria-label={`Rate ${star} stars`}
          >
            <Star
              className={cn(
                sizes[size],
                "transition-colors",
                star <= display
                  ? "fill-amber-400 text-amber-400"
                  : "fill-transparent text-muted-foreground/40"
              )}
            />
          </button>
        ))}
      </div>
      {showValue && value > 0 && (
        <span className="ml-1.5 text-sm font-semibold text-foreground">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
}
