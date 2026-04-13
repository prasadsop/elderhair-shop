import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Clock, User } from "lucide-react";
import { motion } from "motion/react";
import type React from "react";
import { Layout } from "../components/Layout";
import { ProductCard } from "../components/ProductCard";
import { useGuideArticle } from "../hooks/useBackend";
import { MOCK_PRODUCTS, getGuideTagLabel } from "../types";

// Simple content renderer — avoids dangerouslySetInnerHTML
function renderBold(text: string): React.ReactNode {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  const result: React.ReactNode[] = [];
  for (let k = 0; k < parts.length; k++) {
    if (k % 2 === 1) {
      result.push(<strong key={parts[k]}>{parts[k]}</strong>);
    } else if (parts[k]) {
      result.push(parts[k]);
    }
  }
  return result;
}

function renderContent(content: string) {
  const paragraphs = content.split("\n\n").filter(Boolean);
  const elements: React.ReactNode[] = [];

  for (const para of paragraphs) {
    const trimmed = para.trim();
    const paraKey = trimmed.slice(0, 40);

    if (/^\d+\./.test(trimmed)) {
      const lines = trimmed.split("\n").filter(Boolean);
      elements.push(
        <ol
          key={`ol-${paraKey}`}
          className="list-decimal list-inside space-y-2 my-4"
        >
          {lines.map((line) => (
            <li
              key={line.slice(0, 40)}
              className="text-lg text-foreground font-body leading-relaxed"
            >
              {renderBold(line.replace(/^\d+\.\s*/, ""))}
            </li>
          ))}
        </ol>,
      );
      continue;
    }

    if (trimmed.startsWith("- ")) {
      const lines = trimmed
        .split("\n")
        .filter((l) => l.trim().startsWith("- "));
      elements.push(
        <ul
          key={`ul-${paraKey}`}
          className="list-disc list-inside space-y-2 my-4"
        >
          {lines.map((line) => (
            <li
              key={line.slice(0, 40)}
              className="text-lg text-foreground font-body leading-relaxed"
            >
              {renderBold(line.replace(/^-\s*/, ""))}
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    if (
      trimmed.startsWith("**") &&
      trimmed.endsWith("**") &&
      trimmed.indexOf("**", 2) === trimmed.length - 2
    ) {
      elements.push(
        <h3
          key={`h3-${paraKey}`}
          className="font-display text-xl font-bold text-foreground mt-6 mb-2"
        >
          {trimmed.replace(/\*\*/g, "")}
        </h3>,
      );
      continue;
    }

    elements.push(
      <p
        key={`p-${paraKey}`}
        className="text-lg text-foreground font-body leading-relaxed my-3"
      >
        {renderBold(trimmed)}
      </p>,
    );
  }

  return elements;
}

export function GuideArticlePage() {
  const { id } = useParams({ from: "/guides/$id" });
  const articleId = BigInt(id);
  const { data: article, isLoading } = useGuideArticle(articleId);

  const relatedProducts = article
    ? MOCK_PRODUCTS.filter((p) => article.relatedProductIds.includes(p.id))
    : [];

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-10 max-w-3xl space-y-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </Layout>
    );
  }

  if (!article) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <BookOpen size={48} className="text-muted-foreground mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold text-foreground mb-3">
            Article Not Found
          </h2>
          <Button asChild>
            <Link to="/guides">Back to Guides</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const date = new Date(Number(article.publishDate));

  return (
    <Layout>
      <div className="bg-background">
        {/* Back link */}
        <div className="container mx-auto px-4 pt-6 pb-2 max-w-3xl">
          <Link
            to="/guides"
            className="flex items-center gap-1.5 text-base text-muted-foreground hover:text-primary transition-colors font-body w-fit"
          >
            <ArrowLeft size={16} />
            Back to Guides
          </Link>
        </div>

        {/* Article header */}
        <div className="bg-card border-b border-border">
          <div className="container mx-auto px-4 py-10 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.map((tag) => {
                  const key = Object.keys(tag)[0];
                  return (
                    <Badge
                      key={key}
                      variant="outline"
                      className="font-body text-sm px-3 py-1 bg-accent/20 text-accent-foreground border-accent/30"
                    >
                      {getGuideTagLabel(tag)}
                    </Badge>
                  );
                })}
              </div>

              <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-base text-muted-foreground font-body">
                <span className="flex items-center gap-1.5">
                  <User size={16} />
                  {article.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={16} />
                  {Number(article.readTime)} min read
                </span>
                <span>
                  {date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Article body */}
        <div className="container mx-auto px-4 py-10 max-w-3xl">
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {renderContent(article.content)}
          </motion.article>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <>
            <Separator />
            <section className="bg-muted/30 py-10">
              <div className="container mx-auto px-4">
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  Recommended Products
                </h2>
                <p className="text-base text-muted-foreground font-body mb-6">
                  Products mentioned or recommended in this guide.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedProducts.map((p) => (
                    <ProductCard key={p.id.toString()} product={p} />
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* CTA */}
        <section className="bg-background border-t border-border py-10">
          <div className="container mx-auto px-4 text-center max-w-xl">
            <h3 className="font-display text-2xl font-bold text-foreground mb-3">
              Explore More Guides
            </h3>
            <p className="text-base text-muted-foreground font-body mb-5">
              We have more expert hair care guides for silver and mature hair.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="text-base font-body"
              asChild
            >
              <Link to="/guides" data-ocid="article-back-to-guides">
                All Hair Care Guides
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
}
