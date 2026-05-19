"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Plus, FolderOpen, Tag } from "lucide-react";
import { searchAll, hasExactMatch } from "@/lib/search";
import type { SearchResult } from "@/lib/search";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
}

export function SearchBar({
  className,
  placeholder = "Search anything to rate...",
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    if (value.trim().length >= 1) {
      setResults(searchAll(value));
      setOpen(true);
    } else {
      setResults([]);
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && query.trim()) {
      setOpen(false);
      router.push(`/explore?q=${encodeURIComponent(query)}`);
    }
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const iconForType = (type: SearchResult["type"]) => {
    switch (type) {
      case "item":
        return <Search className="h-4 w-4 text-violet-500" />;
      case "category":
        return <Tag className="h-4 w-4 text-violet-500" />;
      case "collection":
        return <FolderOpen className="h-4 w-4 text-violet-500" />;
    }
  };

  return (
    <div ref={containerRef} className={cn("relative w-full max-w-md", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => {
            if (query.trim()) setOpen(true);
          }}
          onKeyDown={handleKeyDown}
          className="pl-9 pr-4 h-10 rounded-full bg-muted/50 border-transparent focus-visible:bg-background focus-visible:border-border"
          aria-label="Search"
          aria-expanded={open}
          aria-haspopup="listbox"
        />
      </div>

      {open && query.trim() && (
        <div className="absolute top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-border bg-popover shadow-lg">
          {results.length > 0 ? (
            <ul role="listbox" className="max-h-72 overflow-y-auto py-2">
              {results.map((result) => (
                <li key={`${result.type}-${result.id}`}>
                  <Link
                    href={result.href}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {iconForType(result.type)}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{result.title}</p>
                      {result.subtitle && (
                        <p className="truncate text-xs text-muted-foreground">
                          {result.subtitle}
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-3 text-sm text-muted-foreground">No results found</p>
          )}
          {!hasExactMatch(query) && (
            <Link
              href={`/create?name=${encodeURIComponent(query)}`}
              className="flex items-center gap-2 border-t border-border px-4 py-3 text-sm font-medium text-violet-600 hover:bg-muted dark:text-violet-400"
              onClick={() => setOpen(false)}
            >
              <Plus className="h-4 w-4" />
              Create new item: &quot;{query}&quot;
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
