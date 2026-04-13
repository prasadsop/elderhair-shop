import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Clock, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Layout } from "../components/Layout";
import { useGuideArticles } from "../hooks/useBackend";
import { type GuideArticle, type GuideTag, getGuideTagLabel } from "../types";

const TAG_FILTERS: { label: string; value: GuideTag; color: string }[] = [
  {
    label: "Grey Hair",
    value: { greyHair: null },
    color: "bg-primary/10 text-primary border-primary/20",
  },
  {
    label: "Thinning Hair",
    value: { thinning: null },
    color: "bg-accent/20 text-accent-foreground border-accent/30",
  },
  {
    label: "Scalp Care",
    value: { scalpCare: null },
    color: "bg-accent/15 text-accent-foreground border-accent/25",
  },
  {
    label: "Styling",
    value: { styling: null },
    color: "bg-secondary text-secondary-foreground border-border",
  },
];

function ArticleCard({
  article,
  index,
}: { article: GuideArticle; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        to="/guides/$id"
        params={{ id: article.id.toString() }}
        className="group block bg-card border border-border rounded-xl p-6 hover:shadow-elevated transition-smooth"
        data-ocid="guide-article-card"
      >
        <div className="flex flex-wrap gap-2 mb-3">
          {article.tags.slice(0, 2).map((tag) => {
            const key = Object.keys(tag)[0];
            const tagFilter = TAG_FILTERS.find(
              (t) => Object.keys(t.value)[0] === key,
            );
            return (
              <Badge
                key={key}
                variant="outline"
                className={`font-body text-sm ${tagFilter?.color ?? ""}`}
              >
                {getGuideTagLabel(tag)}
              </Badge>
            );
          })}
        </div>
        <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug mb-2">
          {article.title}
        </h3>
        <p className="text-base text-muted-foreground font-body leading-relaxed line-clamp-2 mb-4">
          {article.content.split("\n")[0].replace(/\*\*/g, "")}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground font-body">
            <span>{article.author}</span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {Number(article.readTime)} min read
            </span>
          </div>
          <span className="text-primary font-body text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-smooth">
            Read more <ArrowRight size={14} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export function GuidesPage() {
  const [activeTag, setActiveTag] = useState<GuideTag | undefined>();
  const { data: articles, isLoading } = useGuideArticles(activeTag);

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-12 lg:py-16 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="bg-accent/20 text-accent-foreground border-accent/30 mb-4 font-body text-sm px-3 py-1">
              <Sparkles size={14} className="mr-1.5" />
              Expert Hair Care Knowledge
            </Badge>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
              Hair Care Guide for
              <br />
              <span className="text-primary">Mature & Silver Hair</span>
            </h1>
            <p className="text-lg text-muted-foreground font-body leading-relaxed max-w-xl mx-auto">
              Free, expert-written guides covering everything you need to know
              about caring for grey, white, and thinning hair — written
              specifically for older adults.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter by topic */}
      <section className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-base font-body text-muted-foreground font-medium">
              Filter by topic:
            </span>
            <Button
              variant={!activeTag ? "default" : "outline"}
              size="sm"
              className="text-base font-body"
              onClick={() => setActiveTag(undefined)}
              data-ocid="guide-filter-all"
            >
              All Topics
            </Button>
            {TAG_FILTERS.map((tag) => {
              const key = Object.keys(tag.value)[0];
              const isActive = activeTag && Object.keys(activeTag)[0] === key;
              return (
                <Button
                  key={key}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  className="text-base font-body"
                  onClick={() => setActiveTag(isActive ? undefined : tag.value)}
                  data-ocid={`guide-filter-${key}`}
                >
                  {tag.label}
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="bg-background py-10">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((n) => (
                <Skeleton key={n} className="h-48 rounded-xl" />
              ))}
            </div>
          ) : articles && articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((article, i) => (
                <ArticleCard
                  key={article.id.toString()}
                  article={article}
                  index={i}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16" data-ocid="guides-empty-state">
              <BookOpen
                size={48}
                className="text-muted-foreground mx-auto mb-4"
              />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                No guides found
              </h3>
              <Button variant="outline" onClick={() => setActiveTag(undefined)}>
                Clear Filter
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Shop CTA */}
      <section className="bg-muted/30 border-t border-border py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-3">
            Ready to Shop?
          </h2>
          <p className="text-lg text-muted-foreground font-body mb-6 max-w-xl mx-auto">
            Browse our curated range of gentle hair care products, all selected
            for mature and silver hair.
          </p>
          <Button size="lg" className="text-base font-body" asChild>
            <Link
              to="/"
              search={{ category: undefined, sort: "byRating", q: "" }}
              data-ocid="guides-shop-cta"
            >
              Shop All Products
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
