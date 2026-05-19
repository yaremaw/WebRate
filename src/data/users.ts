import type { User } from "@/types";

export const sampleUser: User = {
  id: "u1",
  name: "Nazar",
  username: "nazar_rates",
  avatar: "NZ",
  bio: "I rate things with suspicious seriousness.",
  stats: {
    totalRatings: 128,
    collections: 14,
    averageRatingGiven: 3.7,
    mostRatedCategory: "Tech",
  },
  tasteIdentity: "Harsh but Fair",
  tasteDescription:
    "You give credit where it's due, but you're not handing out five stars like confetti. Your reviews make people think twice.",
  recentRatings: [
    { itemId: "9", itemTitle: "MacBook Air M4", itemSlug: "macbook-air-m4", rating: 5, date: "2024-11-05" },
    { itemId: "1", itemTitle: "Pineapple Pizza", itemSlug: "pineapple-pizza", rating: 4, date: "2024-11-03" },
    { itemId: "5", itemTitle: "TikTok", itemSlug: "tiktok", rating: 2, date: "2024-11-01" },
    { itemId: "4", itemTitle: "Crocs", itemSlug: "crocs", rating: 3, date: "2024-10-28" },
    { itemId: "6", itemTitle: "Cold Showers", itemSlug: "cold-showers", rating: 4, date: "2024-10-25" },
  ],
  topRatedItemIds: ["9", "13", "7", "14"],
  lowestRatedItemIds: ["8", "11", "5"],
  favoriteCategories: ["Tech", "Food & Drinks", "Life"],
  controversialOpinion: {
    itemTitle: "Pineapple Pizza",
    rating: 4,
    text: "It's good and I'm tired of pretending it's not.",
  },
  collectionIds: ["c1", "c5"],
};

export function getUserByUsername(username: string): User | undefined {
  if (username === "nazar_rates") return sampleUser;
  return undefined;
}
