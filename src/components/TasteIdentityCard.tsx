import { Sparkles } from "lucide-react";

interface TasteIdentityCardProps {
  identity: string;
  description: string;
}

export function TasteIdentityCard({ identity, description }: TasteIdentityCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50 p-6 dark:border-violet-900 dark:from-violet-950/50 dark:to-indigo-950/50">
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-violet-200/50 dark:bg-violet-800/30" />
      <div className="relative">
        <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400">
          <Sparkles className="h-4 w-4" />
          <span className="text-xs font-semibold uppercase tracking-wider">
            Taste identity
          </span>
        </div>
        <h3 className="mt-2 text-2xl font-bold">{identity}</h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
