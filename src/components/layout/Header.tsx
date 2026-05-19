"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/explore", label: "Explore" },
  { href: "/battles", label: "Battles" },
  { href: "/collections", label: "Collections" },
  { href: "/create", label: "Create" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-sm font-bold text-white">
              R
            </span>
            <span className="hidden font-bold text-lg sm:inline">Rateverse</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden flex-1 justify-center lg:flex">
            <SearchBar />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
              <Link href="/profile/nazar_rates">Sign in</Link>
            </Button>
            <Button
              size="sm"
              className="hidden bg-violet-600 hover:bg-violet-700 sm:inline-flex"
              asChild
            >
              <Link href="/create">Start rating</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="border-t border-border/60 px-4 py-2 lg:hidden">
          <SearchBar />
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
