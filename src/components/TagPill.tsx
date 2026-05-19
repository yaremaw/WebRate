import { cn } from "@/lib/utils";

interface TagPillProps {
  label: string;
  variant?: "default" | "controversial" | "accent";
  className?: string;
}

export function TagPill({ label, variant = "default", className }: TagPillProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        variant === "controversial" &&
          "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
        variant === "accent" &&
          "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
        variant === "default" && "bg-muted text-muted-foreground",
        className
      )}
    >
      {label}
    </span>
  );
}
