import { j as jsxRuntimeExports, d as useCart, L as Link } from "./index-BrmIA-SK.js";
import { B as Badge, a as Button, S as ShoppingCart } from "./Layout-DGc-UyHY.js";
import { S as Star, C as Card, a as CardContent } from "./card-CZWIEjsJ.js";
import { h as getCategoryLabel } from "./useBackend-C4FxJ3vZ.js";
const categoryColors = {
  shampoosAndConditioners: "bg-accent/20 text-accent-foreground border-accent/30",
  treatmentsAndSerums: "bg-primary/10 text-primary border-primary/20",
  stylingTools: "bg-secondary text-secondary-foreground border-border",
  scalpCare: "bg-accent/15 text-accent-foreground border-accent/25"
};
function getCategoryKey(category) {
  return Object.keys(category)[0] ?? "";
}
function CategoryBadge({ category, size = "sm" }) {
  const key = getCategoryKey(category);
  const colorClass = categoryColors[key] ?? "bg-muted text-muted-foreground border-border";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      variant: "outline",
      className: `font-body font-medium border ${colorClass} ${size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1"}`,
      children: getCategoryLabel(category)
    }
  );
}
const sizeClasses = {
  sm: "w-3.5 h-3.5",
  md: "w-5 h-5",
  lg: "w-6 h-6"
};
function StarRating({
  rating,
  maxStars = 5,
  size = "md",
  interactive = false,
  onRate
}) {
  const starSize = sizeClasses[size];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex items-center gap-0.5",
      role: interactive ? "radiogroup" : "img",
      "aria-label": `Rating: ${rating} out of ${maxStars} stars`,
      children: Array.from({ length: maxStars }, (_, i) => {
        const filled = i < Math.floor(rating);
        const partial = !filled && i < rating;
        const starValue = i + 1;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => interactive && (onRate == null ? void 0 : onRate(starValue)),
            disabled: !interactive,
            className: [
              "relative focus:outline-none",
              interactive ? "cursor-pointer hover:scale-110 transition-smooth focus-visible:ring-2 focus-visible:ring-ring rounded" : "cursor-default pointer-events-none"
            ].join(" "),
            "aria-label": interactive ? `Rate ${starValue} stars` : void 0,
            role: interactive ? "radio" : void 0,
            "aria-checked": interactive ? starValue === Math.round(rating) : void 0,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Star,
                {
                  className: `${starSize} text-muted-foreground/30 fill-muted-foreground/10`
                }
              ),
              (filled || partial) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 overflow-hidden",
                  style: {
                    width: filled ? "100%" : `${(rating - Math.floor(rating)) * 100}%`
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: `${starSize} text-primary fill-primary` })
                }
              )
            ]
          },
          `star-${starValue}`
        );
      })
    }
  );
}
const STOCK_STYLES = {
  inStock: "text-accent-foreground bg-accent/20",
  lowStock: "text-amber-700 bg-amber-50",
  outOfStock: "text-destructive bg-destructive/10"
};
const STOCK_LABELS = {
  inStock: "In Stock",
  lowStock: "Low Stock",
  outOfStock: "Out of Stock"
};
function getStockKey(product) {
  if ("inStock" in product.stockStatus) return "inStock";
  if ("lowStock" in product.stockStatus) return "lowStock";
  return "outOfStock";
}
function ProductCard({ product }) {
  const { addItem } = useCart();
  const stockKey = getStockKey(product);
  const isAvailable = stockKey !== "outOfStock";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "group overflow-hidden border border-border bg-card hover:shadow-elevated transition-smooth flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/products/$id",
        params: { id: product.id.toString() },
        className: "block overflow-hidden bg-muted aspect-[4/3]",
        "data-ocid": "product-card-image",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: product.imageUrl,
            alt: product.name,
            className: "w-full h-full object-cover group-hover:scale-105 transition-smooth",
            onError: (e) => {
              e.target.src = "/assets/images/placeholder.svg";
            }
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col flex-1 p-4 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryBadge, { category: product.category }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `text-xs font-body font-medium px-2 py-0.5 rounded-full ${STOCK_STYLES[stockKey]}`,
            children: STOCK_LABELS[stockKey]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body uppercase tracking-wide truncate", children: product.brand }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/products/$id",
            params: { id: product.id.toString() },
            className: "block font-display text-base font-semibold text-foreground hover:text-primary transition-colors leading-snug line-clamp-2 mt-0.5",
            "data-ocid": "product-card-name",
            children: product.name
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body leading-relaxed line-clamp-2 flex-1", children: product.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: product.rating, size: "sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground font-body", children: [
          "(",
          Number(product.reviewCount),
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 mt-1 pt-2 border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-xl font-bold text-foreground", children: [
          "$",
          product.price.toFixed(2)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            onClick: () => addItem(product),
            disabled: !isAvailable,
            className: "flex items-center gap-1.5 text-sm",
            "data-ocid": "product-card-add-to-cart",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { size: 15 }),
              "Add to Cart"
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  CategoryBadge as C,
  ProductCard as P,
  StarRating as S
};
