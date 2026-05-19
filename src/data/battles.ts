import type { Battle } from "@/types";

export const battles: Battle[] = [
  {
    id: "b1",
    leftItem: { title: "Coffee", color: "#78350f", emoji: "☕" },
    rightItem: { title: "Tea", color: "#166534", emoji: "🍵" },
    leftVotes: 12450,
    rightVotes: 9823,
  },
  {
    id: "b2",
    leftItem: { title: "iPhone", slug: "iphone-15-pro", color: "#6366f1", emoji: "📱" },
    rightItem: { title: "Android", color: "#22c55e", emoji: "🤖" },
    leftVotes: 8921,
    rightVotes: 9102,
  },
  {
    id: "b3",
    leftItem: { title: "Netflix", color: "#dc2626", emoji: "🎬" },
    rightItem: { title: "YouTube", color: "#ef4444", emoji: "▶️" },
    leftVotes: 7234,
    rightVotes: 8456,
  },
  {
    id: "b4",
    leftItem: { title: "Summer", color: "#f59e0b", emoji: "☀️" },
    rightItem: { title: "Winter", slug: "winter-vacation", color: "#3b82f6", emoji: "❄️" },
    leftVotes: 11200,
    rightVotes: 10890,
  },
  {
    id: "b5",
    leftItem: { title: "Working from home", color: "#8b5cf6", emoji: "🏠" },
    rightItem: { title: "Office", color: "#64748b", emoji: "🏢" },
    leftVotes: 15600,
    rightVotes: 8900,
  },
  {
    id: "b6",
    leftItem: { title: "Pizza", slug: "pineapple-pizza", color: "#f97316", emoji: "🍕" },
    rightItem: { title: "Sushi", slug: "sushi", color: "#ef4444", emoji: "🍣" },
    leftVotes: 9800,
    rightVotes: 10200,
  },
  {
    id: "b7",
    leftItem: { title: "MacBook", slug: "macbook-air-m4", color: "#94a3b8", emoji: "💻" },
    rightItem: { title: "Windows laptop", color: "#0ea5e9", emoji: "🖥️" },
    leftVotes: 13400,
    rightVotes: 12100,
  },
];
