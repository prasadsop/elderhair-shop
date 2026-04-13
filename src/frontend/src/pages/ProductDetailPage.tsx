import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { CategoryBadge } from "../components/CategoryBadge";
import { Layout } from "../components/Layout";
import { ProductCard } from "../components/ProductCard";
import { StarRating } from "../components/StarRating";
import { useCart } from "../context/CartContext";
import {
  useProduct,
  useProductReviews,
  useRelatedProducts,
  useSubmitReview,
} from "../hooks/useBackend";
import type { Review } from "../types";

function ReviewCard({ review }: { review: Review }) {
  const date = new Date(Number(review.date));
  return (
    <div className="bg-muted/30 rounded-xl p-5 border border-border">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-display font-semibold text-foreground text-base">
            {review.authorName}
          </p>
          <p className="text-sm text-muted-foreground font-body">
            {date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <StarRating rating={review.rating} size="sm" />
      </div>
      <p className="text-base text-foreground font-body leading-relaxed mt-2">
        {review.content}
      </p>
    </div>
  );
}

export function ProductDetailPage() {
  const { id } = useParams({ from: "/products/$id" });
  const productId = BigInt(id);
  const { data: product, isLoading } = useProduct(productId);
  const { data: reviews } = useProductReviews(productId);
  const { data: related } = useRelatedProducts(productId, 3);
  const { addItem } = useCart();
  const submitReview = useSubmitReview();

  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewContent, setReviewContent] = useState("");
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product);
    setAdded(true);
    toast.success(`${product.name} added to cart!`);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewContent.trim()) return;
    await submitReview.mutateAsync({
      productId,
      authorName: reviewName,
      rating: reviewRating,
      content: reviewContent,
    });
    toast.success("Thank you for your review!");
    setReviewName("");
    setReviewContent("");
    setReviewRating(5);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-10 space-y-6">
          <Skeleton className="h-8 w-32" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <Skeleton className="aspect-square rounded-2xl" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-3">
            Product Not Found
          </h2>
          <p className="text-muted-foreground font-body mb-6">
            This product may no longer be available.
          </p>
          <Button asChild>
            <Link
              to="/"
              search={{ category: undefined, sort: "byRating", q: "" }}
            >
              Back to Shop
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const isOutOfStock = "outOfStock" in product.stockStatus;

  return (
    <Layout>
      <div className="bg-background">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 pt-6 pb-2">
          <Link
            to="/"
            search={{ category: undefined, sort: "byRating", q: "" }}
            className="flex items-center gap-1.5 text-base text-muted-foreground hover:text-primary transition-colors font-body w-fit"
          >
            <ArrowLeft size={16} />
            Back to Shop
          </Link>
        </div>

        {/* Main product info */}
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-muted/30 rounded-2xl overflow-hidden border border-border"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full aspect-square object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/assets/images/placeholder.svg";
                }}
              />
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="space-y-5"
            >
              <div>
                <p className="text-sm text-muted-foreground font-body uppercase tracking-wide mb-1">
                  {product.brand}
                </p>
                <h1 className="font-display text-3xl font-bold text-foreground leading-tight">
                  {product.name}
                </h1>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <CategoryBadge category={product.category} size="md" />
                <div className="flex items-center gap-2">
                  <StarRating rating={product.rating} size="md" />
                  <span className="text-base text-muted-foreground font-body">
                    ({Number(product.reviewCount)} reviews)
                  </span>
                </div>
              </div>

              <p className="text-lg text-foreground font-body leading-relaxed">
                {product.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="font-display text-4xl font-bold text-foreground">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground font-body">
                  {product.size}
                </span>
              </div>

              <Button
                size="lg"
                className="w-full text-lg font-body"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                data-ocid="product-detail-add-to-cart"
              >
                {added ? (
                  <>
                    <CheckCircle size={20} className="mr-2" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} className="mr-2" />
                    {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                  </>
                )}
              </Button>

              {/* Key ingredients */}
              {product.keyIngredients.length > 0 && (
                <div>
                  <h3 className="font-display font-semibold text-foreground text-lg mb-2">
                    Key Ingredients
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.keyIngredients.map((ing) => (
                      <Badge
                        key={ing}
                        variant="outline"
                        className="font-body text-sm px-3 py-1"
                      >
                        {ing}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits */}
              {product.benefits.length > 0 && (
                <div>
                  <h3 className="font-display font-semibold text-foreground text-lg mb-2">
                    Benefits
                  </h3>
                  <ul className="space-y-1">
                    {product.benefits.map((b) => (
                      <li
                        key={b}
                        className="flex items-center gap-2 text-base text-foreground font-body"
                      >
                        <CheckCircle
                          size={16}
                          className="text-accent shrink-0"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Suitable for */}
              {product.suitableFor.length > 0 && (
                <div>
                  <h3 className="font-display font-semibold text-foreground text-lg mb-2">
                    Suitable For
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.suitableFor.map((s) => (
                      <Badge
                        key={s}
                        className="bg-accent/20 text-accent-foreground border-accent/30 font-body text-sm"
                      >
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        <Separator className="my-2" />

        {/* Reviews */}
        <section className="container mx-auto px-4 py-10">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            Customer Reviews
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Existing reviews */}
            <div className="space-y-4">
              {reviews && reviews.length > 0 ? (
                reviews.map((r) => (
                  <ReviewCard key={r.id.toString()} review={r} />
                ))
              ) : (
                <p className="text-muted-foreground font-body text-base">
                  No reviews yet. Be the first!
                </p>
              )}
            </div>

            {/* Submit review */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-display text-xl font-semibold text-foreground mb-5">
                Write a Review
              </h3>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-base font-body" htmlFor="review-name">
                    Your Name
                  </Label>
                  <Input
                    id="review-name"
                    className="text-base font-body h-11"
                    placeholder="e.g. Margaret H."
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    data-ocid="review-name-input"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-base font-body">Your Rating</Label>
                  <StarRating
                    rating={reviewRating}
                    size="lg"
                    interactive
                    onRate={setReviewRating}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    className="text-base font-body"
                    htmlFor="review-content"
                  >
                    Your Review
                  </Label>
                  <Textarea
                    id="review-content"
                    className="text-base font-body min-h-28 resize-none"
                    placeholder="Share your experience with this product..."
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                    data-ocid="review-content-input"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full text-base font-body"
                  disabled={submitReview.isPending}
                  data-ocid="review-submit"
                >
                  {submitReview.isPending ? "Submitting..." : "Submit Review"}
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* Related products */}
        {related && related.length > 0 && (
          <section className="bg-muted/30 border-t border-border py-10">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                You May Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((p) => (
                  <ProductCard key={p.id.toString()} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
