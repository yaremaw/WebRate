"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { BattleCard } from "@/components/BattleCard";
import { Button } from "@/components/ui/button";
import { battles } from "@/data/battles";
import { getBattleVotes, saveBattleVote } from "@/lib/storage";
import type { Battle } from "@/types";

export default function BattlesPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [localVotes, setLocalVotes] = useState<Record<string, "left" | "right">>(
    () => (typeof window !== "undefined" ? getBattleVotes() : {})
  );

  const battle: Battle = battles[currentIndex];
  const voted = localVotes[battle.id] ?? null;

  const totalVotes = battle.leftVotes + battle.rightVotes + (voted ? 1 : 0);
  const leftExtra = voted === "left" ? 1 : 0;
  const leftPct = Math.round(
    ((battle.leftVotes + leftExtra) / (totalVotes || 1)) * 100
  );
  const rightPct = 100 - leftPct;

  const handleVote = (side: "left" | "right") => {
    if (voted) return;
    saveBattleVote(battle.id, side);
    setLocalVotes((prev) => ({ ...prev, [battle.id]: side }));
  };

  const nextBattle = () => {
    setCurrentIndex((i) => (i + 1) % battles.length);
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Rate Battle</h1>
          <p className="mt-2 text-muted-foreground">
            Pick the better one. No essays required.
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={battle.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-10"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <BattleCard
                title={battle.leftItem.title}
                color={battle.leftItem.color}
                emoji={battle.leftItem.emoji}
                selected={voted === "left"}
                winner={voted !== null && leftPct >= rightPct}
                percentage={voted ? leftPct : undefined}
                onClick={() => handleVote("left")}
                disabled={voted !== null}
              />
              <div className="flex items-center justify-center sm:absolute sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:z-10 hidden sm:flex">
                <span className="rounded-full bg-background border border-border px-4 py-2 text-sm font-bold shadow-md">
                  VS
                </span>
              </div>
              <BattleCard
                title={battle.rightItem.title}
                color={battle.rightItem.color}
                emoji={battle.rightItem.emoji}
                selected={voted === "right"}
                winner={voted !== null && rightPct > leftPct}
                percentage={voted ? rightPct : undefined}
                onClick={() => handleVote("right")}
                disabled={voted !== null}
              />
            </div>

            {voted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 text-center"
              >
                <p className="text-muted-foreground">
                  {totalVotes.toLocaleString()} total votes
                </p>
                <Button
                  className="mt-4 bg-violet-600 hover:bg-violet-700"
                  onClick={nextBattle}
                >
                  Next battle
                </Button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Battle {currentIndex + 1} of {battles.length}
        </p>
      </div>
    </AppLayout>
  );
}
