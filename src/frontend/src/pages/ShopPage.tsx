import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { BookOpen, Leaf, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Layout } from "../components/Layout";
import { ProductCard } from "../components/ProductCard";
import { useProducts } from "../hooks/useBackend";
import type { ProductCategory, SortOrder } from "../types";

const CATEGORIES: { label: string; key: string; value: ProductCategory }[] = [
  {
    label: "Shampoos & Conditioners",
    key: "shampoosAndConditioners",
    value: { shampoosAndConditioners: null },
  },
  {
    label: "Treatments & Serums",
    key: "treatmentsAndSerums",
    value: { treatmentsAndSerums: null },
  },
  { label: "Scalp Care", key: "scalpCare", value: { scalpCare: null } },
  {
    label: "Styling Tools",
    key: "stylingTools",
    value: { stylingTools: null },
  },
];

const SORT_OPTIONS: { label: string; value: SortOrder }[] = [
  { label: "By Rating", value: { byRating: null } },
  { label: "By Price", value: { byPrice: null } },
  { label: "Most Popular", value: { byPopularity: null } },
];

export function ShopPage() {
  const navigate = useNavigate({ from: "/" });
  const {
    category: categoryKey,
    sort: sortKey,
    q: searchTerm,
  } = useSearch({ from: "/" });

  const selectedCategory: ProductCategory | undefined = categoryKey
    ? (CATEGORIES.find((c) => c.key === categoryKey)?.value ?? undefined)
    : undefined;

  const selectedSort: SortOrder = SORT_OPTIONS.find(
    (o) => Object.keys(o.value)[0] === sortKey,
  )?.value ?? { byRating: null };

  const setCategory = (cat: ProductCategory | undefined) => {
    const key = cat ? Object.keys(cat)[0] : undefined;
    void navigate({ search: (prev) => ({ ...prev, category: key }) });
  };

  const setSort = (sort: SortOrder) => {
    void navigate({
      search: (prev) => ({ ...prev, sort: Object.keys(sort)[0] }),
    });
  };

  const setSearchTerm = (q: string) => {
    void navigate({ search: (prev) => ({ ...prev, q }) });
  };

  const { data: products, isLoading } = useProducts({
    category: selectedCategory,
    sortOrder: selectedSort,
    searchTerm: searchTerm || undefined,
  });

  return (
    <Layout onSearch={setSearchTerm} searchValue={searchTerm}>
      {/* Hero section */}
      <section className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-10 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="bg-accent/20 text-accent-foreground border-accent/30 mb-4 font-body text-sm px-3 py-1">
                <Sparkles size={14} className="mr-1.5" />
                Gentle Care for Silver Hair
              </Badge>
              <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
                Care for Your
                <br />
                <span className="text-primary">Silver Crowns</span>
              </h1>
              <p className="text-lg text-muted-foreground font-body leading-relaxed mb-6 max-w-lg">
                Expertly formulated hair care for mature hair. Every product is
                chosen for gentle ingredients, proven results, and ease of use.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="text-base font-body"
                  onClick={() =>
                    document
                      .getElementById("products-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  data-ocid="hero-cta-shop"
                >
                  Explore Products
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base font-body"
                  asChild
                >
                  <Link to="/guides" data-ocid="hero-cta-guides">
                    <BookOpen size={18} className="mr-2" />
                    Hair Care Guide
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="hidden lg:block"
            >
              <img
                src="/assets/generated/hero-elderly-haircare.dim_1200x800.jpg"
                alt="Elderly couple enjoying hair care products together"
                className="w-full rounded-2xl shadow-elevated object-cover aspect-[4/3]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="bg-muted/40 border-b border-border">
        <div className="container mx-auto px-4 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {[
              {
                icon: <Leaf size={20} />,
                title: "Gentle Ingredients",
                desc: "No harsh sulfates or parabens",
              },
              {
                icon: <Sparkles size={20} />,
                title: "Expert Curated",
                desc: "Chosen by hair care specialists",
              },
              {
                icon: <BookOpen size={20} />,
                title: "Free Guides",
                desc: "Detailed hair care education",
              },
            ].map((feat) => (
              <div
                key={feat.title}
                className="flex items-center gap-3 sm:flex-col sm:gap-2 px-4"
              >
                <div className="text-primary shrink-0">{feat.icon}</div>
                <div className="text-left sm:text-center">
                  <p className="font-display font-semibold text-foreground text-base">
                    {feat.title}
                  </p>
                  <p className="text-sm text-muted-foreground font-body">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products section */}
      <section id="products-section" className="bg-background py-10">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h2 className="font-display text-2xl font-bold text-foreground">
              All Products
            </h2>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground font-body">
                Sort:
              </span>
              {SORT_OPTIONS.map((opt) => {
                const key = Object.keys(opt.value)[0];
                const selectedKey = selectedSort
                  ? Object.keys(selectedSort)[0]
                  : "";
                return (
                  <Button
                    key={key}
                    variant={selectedKey === key ? "default" : "outline"}
                    size="sm"
                    className="text-sm font-body"
                    onClick={() => setSort(opt.value)}
                    data-ocid={`sort-${key}`}
                  >
                    {opt.label}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Button
              variant={!selectedCategory ? "default" : "outline"}
              size="sm"
              className="text-sm font-body"
              onClick={() => setCategory(undefined)}
              data-ocid="filter-all"
            >
              All Categories
            </Button>
            {CATEGORIES.map((cat) => {
              const isSelected =
                selectedCategory && cat.key in selectedCategory;
              return (
                <Button
                  key={cat.key}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  className="text-sm font-body"
                  onClick={() =>
                    setCategory(isSelected ? undefined : cat.value)
                  }
                  data-ocid={`filter-${cat.key}`}
                >
                  {cat.label}
                </Button>
              );
            })}
          </div>

          {/* Product grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <Skeleton key={n} className="h-96 rounded-lg" />
              ))}
            </div>
          ) : products && products.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.07 } },
              }}
            >
              {products.map((product) => (
                <motion.div
                  key={product.id.toString()}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.4 },
                    },
                  }}
                  data-ocid="product-list-item"
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20" data-ocid="products-empty-state">
              <Leaf size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                No products found
              </h3>
              <p className="text-base text-muted-foreground font-body mb-4">
                Try adjusting your search or filter.
              </p>
              <Button
                onClick={() => {
                  setCategory(undefined);
                  setSearchTerm("");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Guide CTA */}
      <section className="bg-muted/30 border-t border-border py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">
              Not Sure Where to Start?
            </h2>
            <p className="text-lg text-muted-foreground font-body mb-6 max-w-xl mx-auto">
              Read our free hair care guides — written by experts specifically
              for grey, silver, and thinning hair.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="text-base font-body"
              asChild
            >
              <Link to="/guides" data-ocid="bottom-cta-guides">
                <BookOpen size={18} className="mr-2" />
                Explore Hair Care Guides
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
