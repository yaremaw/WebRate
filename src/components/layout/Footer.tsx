import Link from "next/link";

const links = [
  { href: "/explore", label: "Explore" },
  { href: "/battles", label: "Battles" },
  { href: "/collections", label: "Collections" },
  { href: "/create", label: "Create" },
  { href: "/profile/nazar_rates", label: "Profile" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-sm font-bold text-white">
                R
              </span>
              <span className="font-bold text-lg">Rateverse</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Rate anything. Compare everything. Your opinion finally has a dashboard.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm">Explore</h4>
            <ul className="mt-3 space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm">About</h4>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              People have opinions. Some of them are even useful. Rateverse is where
              those opinions finally get organized.
            </p>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Rateverse. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
