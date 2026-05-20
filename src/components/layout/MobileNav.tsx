"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

const links = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/battles", label: "Battles" },
  { href: "/collections", label: "Collections" },
  { href: "/create", label: "Create" },
  { href: "/profile/nazar_rates", label: "Profile" },
];

export function MobileNav({ open, onClose }: MobileNavProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 md:hidden"
            onClick={onClose}
          />
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 flex h-full w-72 flex-col bg-background shadow-xl md:hidden"
          >
            <div className="flex items-center justify-between border-b border-border p-4">
              <span className="font-bold text-lg">Rateverse</span>
              <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close menu">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex flex-1 flex-col gap-1 p-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="rounded-lg px-4 py-3 text-base font-medium hover:bg-muted"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="border-t border-border p-4">
              <Link
                href="/create"
                onClick={onClose}
                className={cn(
                  buttonVariants({ size: "default" }),
                  "w-full bg-violet-600 text-white hover:bg-violet-700"
                )}
              >
                Start rating
              </Link>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
