import Link from "next/link";
import { cn } from "@/lib/utils";

interface CategoryPillProps {
  label: string;
  href?: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function CategoryPill({
  label,
  href,
  active,
  onClick,
  className,
}: CategoryPillProps) {
  const classes = cn(
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
    active
      ? "bg-violet-600 text-white"
      : "bg-muted text-muted-foreground hover:bg-violet-100 hover:text-violet-700 dark:hover:bg-violet-950 dark:hover:text-violet-300",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {label}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {label}
    </button>
  );
}
