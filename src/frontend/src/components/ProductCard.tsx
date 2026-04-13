import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import type { Product } from "../types";
import { CategoryBadge } from "./CategoryBadge";
import { StarRating } from "./StarRating";

interface ProductCardProps {
  product: Product;
}

const STOCK_STYLES = {
  inStock: "text-accent-foreground bg-accent/20",
  lowStock: "text-amber-700 bg-amber-50",
  outOfStock: "text-destructive bg-destructive/10",
};

const STOCK_LABELS = {
  inStock: "In Stock",
  lowStock: "Low Stock",
  outOfStock: "Out of Stock",
};

function getStockKey(product: Product): keyof typeof STOCK_LABELS {
  if ("inStock" in product.stockStatus) return "inStock";
  if ("lowStock" in product.stockStatus) return "lowStock";
  return "outOfStock";
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const stockKey = getStockKey(product);
  const isAvailable = stockKey !== "outOfStock";

  return (
    <Card className="group overflow-hidden border border-border bg-card hover:shadow-elevated transition-smooth flex flex-col h-full">
      {/* Image */}
      <Link
        to="/products/$id"
        params={{ id: product.id.toString() }}
        className="block overflow-hidden bg-muted aspect-[4/3]"
        data-ocid="product-card-image"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/assets/images/placeholder.svg";
          }}
        />
      </Link>

      <CardContent className="flex flex-col flex-1 p-4 gap-2">
        {/* Category + Stock */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <CategoryBadge category={product.category} />
          <span
            className={`text-xs font-body font-medium px-2 py-0.5 rounded-full ${STOCK_STYLES[stockKey]}`}
          >
            {STOCK_LABELS[stockKey]}
          </span>
        </div>

        {/* Brand + Name */}
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground font-body uppercase tracking-wide truncate">
            {product.brand}
          </p>
          <Link
            to="/products/$id"
            params={{ id: product.id.toString() }}
            className="block font-display text-base font-semibold text-foreground hover:text-primary transition-colors leading-snug line-clamp-2 mt-0.5"
            data-ocid="product-card-name"
          >
            {product.name}
          </Link>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground font-body leading-relaxed line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <StarRating rating={product.rating} size="sm" />
          <span className="text-sm text-muted-foreground font-body">
            ({Number(product.reviewCount)})
          </span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between gap-3 mt-1 pt-2 border-t border-border">
          <span className="font-display text-xl font-bold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          <Button
            size="sm"
            onClick={() => addItem(product)}
            disabled={!isAvailable}
            className="flex items-center gap-1.5 text-sm"
            data-ocid="product-card-add-to-cart"
          >
            <ShoppingCart size={15} />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
