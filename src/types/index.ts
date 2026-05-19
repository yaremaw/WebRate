export type Category =
  | "Movies & Shows"
  | "Food & Drinks"
  | "Places"
  | "Products"
  | "Apps & Websites"
  | "Music"
  | "Games"
  | "Life"
  | "Work & Study"
  | "Random";

export interface RatingDistribution {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}

export interface ItemDimensions {
  taste?: number;
  looks?: number;
  price?: number;
  usefulness?: number;
  overrated?: number;
  fun?: number;
  beauty?: number;
  trust?: number;
  chaos?: number;
}

export interface Review {
  id: string;
  userName: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
  helpfulCount: number;
  funnyCount: number;
}

export interface RateItem {
  id: string;
  title: string;
  slug: string;
  category: Category;
  description: string;
  image?: string;
  color?: string;
  averageRating: number;
  ratingCount: number;
  tags: string[];
  controversyScore: number;
  ratingDistribution: RatingDistribution;
  dimensions?: ItemDimensions;
  reviews: Review[];
  positiveQuote?: string;
  negativeQuote?: string;
  createdAt: string;
}

export interface Collection {
  id: string;
  title: string;
  slug: string;
  description: string;
  creator: string;
  creatorUsername: string;
  itemIds: string[];
  tags: string[];
  coverColors?: string[];
}

export interface Battle {
  id: string;
  leftItem: { title: string; slug?: string; color: string; emoji?: string };
  rightItem: { title: string; slug?: string; color: string; emoji?: string };
  leftVotes: number;
  rightVotes: number;
}

export interface UserStats {
  totalRatings: number;
  collections: number;
  averageRatingGiven: number;
  mostRatedCategory: string;
}

export interface UserRating {
  itemId: string;
  itemTitle: string;
  itemSlug: string;
  rating: number;
  date: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  stats: UserStats;
  tasteIdentity: string;
  tasteDescription: string;
  recentRatings: UserRating[];
  topRatedItemIds: string[];
  lowestRatedItemIds: string[];
  favoriteCategories: string[];
  controversialOpinion: { itemTitle: string; rating: number; text: string };
  collectionIds: string[];
}

export type SortOption =
  | "trending"
  | "top-rated"
  | "controversial"
  | "newest"
  | "most-rated";

export interface CreatedItem extends RateItem {
  visibility: "public" | "friends" | "private";
  ratingType: "simple" | "criteria" | "reactions";
}
