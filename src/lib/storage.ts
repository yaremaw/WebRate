import type { CreatedItem, Review } from "@/types";

const CREATED_ITEMS_KEY = "rateverse_created_items";
const USER_RATINGS_KEY = "rateverse_user_ratings";
const BATTLE_VOTES_KEY = "rateverse_battle_votes";
const DAILY_PROMPT_KEY = "rateverse_daily_prompt";

export function getCreatedItems(): CreatedItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CREATED_ITEMS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCreatedItem(item: CreatedItem): void {
  const items = getCreatedItems();
  items.unshift(item);
  localStorage.setItem(CREATED_ITEMS_KEY, JSON.stringify(items));
}

export interface StoredRating {
  itemSlug: string;
  rating: number;
  review?: string;
  anonymous?: boolean;
  dimensions?: Record<string, number>;
  date: string;
}

export function getUserRatings(): StoredRating[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(USER_RATINGS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveUserRating(rating: StoredRating): void {
  const ratings = getUserRatings().filter((r) => r.itemSlug !== rating.itemSlug);
  ratings.unshift(rating);
  localStorage.setItem(USER_RATINGS_KEY, JSON.stringify(ratings));
}

export function getBattleVotes(): Record<string, "left" | "right"> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(BATTLE_VOTES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveBattleVote(battleId: string, side: "left" | "right"): void {
  const votes = getBattleVotes();
  votes[battleId] = side;
  localStorage.setItem(BATTLE_VOTES_KEY, JSON.stringify(votes));
}

export function getDailyPromptRating(): number | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(DAILY_PROMPT_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    const today = new Date().toDateString();
    if (data.date === today) return data.rating;
    return null;
  } catch {
    return null;
  }
}

export function saveDailyPromptRating(rating: number): void {
  localStorage.setItem(
    DAILY_PROMPT_KEY,
    JSON.stringify({ rating, date: new Date().toDateString() })
  );
}

export function getStoredReviews(itemSlug: string): Review[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(`rateverse_reviews_${itemSlug}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveStoredReview(itemSlug: string, review: Review): void {
  const reviews = getStoredReviews(itemSlug);
  reviews.unshift(review);
  localStorage.setItem(`rateverse_reviews_${itemSlug}`, JSON.stringify(reviews));
}
