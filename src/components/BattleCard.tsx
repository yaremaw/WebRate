"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BattleCardProps {
  title: string;
  color: string;
  emoji?: string;
  selected?: boolean;
  winner?: boolean;
  percentage?: number;
  onClick?: () => void;
  disabled?: boolean;
}

export function BattleCard({
  title,
  color,
  emoji,
  selected,
  winner,
  percentage,
  onClick,
  disabled,
}: BattleCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative flex flex-col items-center justify-center rounded-2xl border-2 p-8 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500",
        "min-h-[200px] w-full",
        selected
          ? "border-violet-500 shadow-lg shadow-violet-500/20"
          : "border-border hover:border-violet-300 hover:shadow-md",
        disabled && "cursor-default",
        !disabled && "cursor-pointer"
      )}
      style={{
        background: `linear-gradient(135deg, ${color}15, ${color}35)`,
      }}
    >
      {emoji && <span className="text-5xl">{emoji}</span>}
      <h3 className="mt-4 text-xl font-bold">{title}</h3>
      {percentage !== undefined && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "mt-2 text-3xl font-bold",
            winner ? "text-violet-600" : "text-muted-foreground"
          )}
        >
          {percentage}%
        </motion.p>
      )}
    </button>
  );
}
