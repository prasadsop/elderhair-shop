import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useRouter } from "@tanstack/react-router";
import {
  BookOpen,
  Crown,
  Leaf,
  Menu,
  Search,
  ShoppingCart,
  X,
} from "lucide-react";
import { type ReactNode, useState } from "react";
import { useCart } from "../context/CartContext";

interface LayoutProps {
  children: ReactNode;
  onSearch?: (term: string) => void;
  searchValue?: string;
}

const SHOP_SEARCH_DEFAULTS = {
  category: undefined,
  sort: "byRating",
  q: "",
} as const;

export function Layout({ children, onSearch, searchValue = "" }: LayoutProps) {
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchValue);
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(localSearch);
    } else {
      router.navigate({
        to: "/",
        search: { ...SHOP_SEARCH_DEFAULTS, q: localSearch },
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-subtle">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link
              to="/"
              search={SHOP_SEARCH_DEFAULTS}
              className="flex items-center gap-2 shrink-0 mr-2"
            >
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                <Leaf size={18} className="text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <span className="font-display text-xl font-bold text-foreground leading-tight tracking-tight">
                  ElderHair
                </span>
                <p className="text-xs text-muted-foreground font-body -mt-0.5">
                  बुढाबुढीको कपाल हेरचाह
                </p>
              </div>
            </Link>

            {/* Search bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="flex-1 max-w-md hidden md:flex items-center gap-2"
            >
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  type="search"
                  placeholder="Search shampoos, serums, guides..."
                  className="pl-9 text-base h-10 font-body"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  data-ocid="header-search-input"
                />
              </div>
              <Button
                type="submit"
                variant="default"
                size="sm"
                className="shrink-0"
              >
                Search
              </Button>
            </form>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1 ml-auto">
              <Link
                to="/"
                search={SHOP_SEARCH_DEFAULTS}
                className="flex items-center gap-1.5 px-4 py-2 rounded-md text-base font-body font-medium text-foreground hover:bg-muted transition-colors duration-200 [&.active]:text-primary [&.active]:bg-muted"
                data-ocid="nav-shop"
              >
                Shop
              </Link>
              <Link
                to="/guides"
                className="flex items-center gap-1.5 px-4 py-2 rounded-md text-base font-body font-medium text-foreground hover:bg-muted transition-colors duration-200 [&.active]:text-primary [&.active]:bg-muted"
                data-ocid="nav-guides"
              >
                Hair Guide
              </Link>
              <Link
                to="/cart"
                className="relative flex items-center gap-1.5 px-4 py-2 rounded-md text-base font-body font-medium text-foreground hover:bg-muted transition-colors duration-200"
                data-ocid="nav-cart"
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground"
                    data-ocid="cart-badge"
                  >
                    {totalItems}
                  </Badge>
                )}
                <span>Cart</span>
              </Link>
              <Link to="/subscribe" data-ocid="nav-subscribe">
                <Button
                  size="sm"
                  className="ml-2 flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base px-5 h-10 shadow-subtle transition-smooth focus-visible-ring"
                  aria-label="Subscribe Now"
                >
                  <Crown size={16} />
                  Subscribe Now
                </Button>
              </Link>
            </nav>

            {/* Mobile menu */}
            <div className="flex md:hidden items-center gap-2 ml-auto">
              <Link to="/cart" className="relative p-2" data-ocid="mobile-cart">
                <ShoppingCart size={22} className="text-foreground" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-0.5 -right-0.5 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground">
                    {totalItems}
                  </Badge>
                )}
              </Link>
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Open menu">
                    {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-72 bg-card">
                  <div className="flex flex-col gap-2 mt-6">
                    <div className="mb-4">
                      <span className="font-display text-2xl font-bold text-foreground">
                        ElderHair
                      </span>
                      <p className="text-sm text-muted-foreground font-body">
                        बुढाबुढीको कपाल हेरचाह
                      </p>
                    </div>
                    <form
                      onSubmit={handleSearchSubmit}
                      className="flex gap-2 mb-4"
                    >
                      <Input
                        type="search"
                        placeholder="Search..."
                        className="text-base font-body"
                        value={localSearch}
                        onChange={(e) => setLocalSearch(e.target.value)}
                      />
                      <Button type="submit" size="sm">
                        Go
                      </Button>
                    </form>
                    <Link
                      to="/"
                      search={SHOP_SEARCH_DEFAULTS}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-body font-medium text-foreground hover:bg-muted transition-colors [&.active]:text-primary [&.active]:bg-muted"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Leaf size={18} />
                      Shop
                    </Link>
                    <Link
                      to="/guides"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-body font-medium text-foreground hover:bg-muted transition-colors [&.active]:text-primary [&.active]:bg-muted"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <BookOpen size={18} />
                      Hair Guide
                    </Link>
                    <Link
                      to="/cart"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-body font-medium text-foreground hover:bg-muted transition-colors [&.active]:text-primary [&.active]:bg-muted"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <ShoppingCart size={18} />
                      Cart
                    </Link>
                    <Link
                      to="/subscribe"
                      onClick={() => setMobileMenuOpen(false)}
                      data-ocid="mobile-nav-subscribe"
                    >
                      <Button
                        size="lg"
                        className="w-full mt-2 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg h-14 shadow-subtle transition-smooth focus-visible-ring"
                        aria-label="Subscribe Now"
                      >
                        <Crown size={20} />
                        Subscribe Now
                      </Button>
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 bg-background">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-auto">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Leaf size={16} className="text-primary-foreground" />
                </div>
                <span className="font-display text-xl font-bold text-foreground">
                  ElderHair
                </span>
              </div>
              <p className="text-base text-muted-foreground font-body leading-relaxed">
                Gentle, expert hair care designed for silver years. Because
                beautiful hair has no age limit.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h3 className="font-display text-base font-semibold text-foreground mb-3">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    search={SHOP_SEARCH_DEFAULTS}
                    className="text-base text-muted-foreground hover:text-primary transition-colors font-body"
                  >
                    Shop All Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/guides"
                    className="text-base text-muted-foreground hover:text-primary transition-colors font-body"
                  >
                    Hair Care Guide
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cart"
                    className="text-base text-muted-foreground hover:text-primary transition-colors font-body"
                  >
                    Shopping Cart
                  </Link>
                </li>
                <li>
                  <Link
                    to="/subscribe"
                    className="text-base text-primary hover:text-primary/80 transition-colors font-body font-semibold"
                  >
                    Subscribe Now
                  </Link>
                </li>
              </ul>
            </div>

            {/* Tagline */}
            <div>
              <h3 className="font-display text-base font-semibold text-foreground mb-3">
                Our Promise
              </h3>
              <p className="text-base text-muted-foreground font-body leading-relaxed">
                All products are carefully selected for mature hair needs —
                gentle formulas, trusted ingredients, and accessible guidance
                for every age.
              </p>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground font-body">
              © {new Date().getFullYear()}. Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "elderhair")}`}
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                caffeine.ai
              </a>
            </p>
            <p className="text-sm text-muted-foreground font-body">
              Crafted with care for our silver community ✨
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
