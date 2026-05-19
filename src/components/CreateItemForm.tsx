"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import type { Category, CreatedItem } from "@/types";
import { categories } from "@/data/categories";
import { saveCreatedItem } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const emptyDist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

export function CreateItemForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState(() => searchParams.get("name") ?? "");
  const [category, setCategory] = useState<Category | "">("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState("");
  const [ratingType, setRatingType] = useState<"simple" | "criteria" | "reactions">("simple");
  const [visibility, setVisibility] = useState<"public" | "friends" | "private">("public");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Item name is required";
    if (!category) e.category = "Category is required";
    if (description.length > 240) e.description = "Description must be 240 characters or less";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const slug = slugify(name) + "-" + Date.now().toString(36);
    const tagList = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const item: CreatedItem = {
      id: `created-${Date.now()}`,
      title: name.trim(),
      slug,
      category: category as Category,
      description: description.trim(),
      image: imageUrl || undefined,
      color: "#8b5cf6",
      averageRating: 0,
      ratingCount: 0,
      tags: tagList,
      controversyScore: 0,
      ratingDistribution: emptyDist,
      reviews: [],
      createdAt: new Date().toISOString().split("T")[0],
      visibility,
      ratingType,
    };

    saveCreatedItem(item);
    toast.success("Your item was created. Time to judge it.");
    setLoading(false);
    router.push(`/items/${slug}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Item name *</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="What are we rating?"
          className={errors.name ? "border-destructive" : ""}
        />
        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category *</Label>
        <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
          <SelectTrigger className={errors.category ? "border-destructive" : ""}>
            <SelectValue placeholder="Pick a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c.name} value={c.name}>
                {c.emoji} {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && <p className="text-xs text-destructive">{errors.category}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">
          Short description
          <span className="ml-2 text-muted-foreground font-normal">
            ({description.length}/240)
          </span>
        </Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Give people context. Keep it short and spicy."
          rows={3}
          maxLength={240}
          className={errors.description ? "border-destructive" : ""}
        />
        {errors.description && (
          <p className="text-xs text-destructive">{errors.description}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image URL (optional)</Label>
        <Input
          id="image"
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags (comma separated)</Label>
        <Input
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="funny, debate, tech"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Rating type</Label>
          <Select
            value={ratingType}
            onValueChange={(v) => setRatingType(v as typeof ratingType)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="simple">Simple 5-star</SelectItem>
              <SelectItem value="criteria">Criteria-based</SelectItem>
              <SelectItem value="reactions">Funny reactions</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Visibility</Label>
          <Select
            value={visibility}
            onValueChange={(v) => setVisibility(v as typeof visibility)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="friends">Friends only</SelectItem>
              <SelectItem value="private">Private draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-violet-600 hover:bg-violet-700"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create something new to judge"}
      </Button>
    </form>
  );
}
