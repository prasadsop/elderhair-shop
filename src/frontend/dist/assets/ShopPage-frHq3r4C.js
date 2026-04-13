import { u as useNavigate, a as useSearch, j as jsxRuntimeExports, L as Link, S as Skeleton } from "./index-BrmIA-SK.js";
import { L as Layout, B as Badge, a as Button, b as BookOpen, c as Leaf } from "./Layout-DGc-UyHY.js";
import { P as ProductCard } from "./ProductCard-DyjFD5f-.js";
import { u as useProducts } from "./useBackend-C4FxJ3vZ.js";
import { m as motion } from "./proxy-CoeVpKA6.js";
import { S as Sparkles } from "./sparkles-_xxA7JUv.js";
import "./card-CZWIEjsJ.js";
const CATEGORIES = [
  {
    label: "Shampoos & Conditioners",
    key: "shampoosAndConditioners",
    value: { shampoosAndConditioners: null }
  },
  {
    label: "Treatments & Serums",
    key: "treatmentsAndSerums",
    value: { treatmentsAndSerums: null }
  },
  { label: "Scalp Care", key: "scalpCare", value: { scalpCare: null } },
  {
    label: "Styling Tools",
    key: "stylingTools",
    value: { stylingTools: null }
  }
];
const SORT_OPTIONS = [
  { label: "By Rating", value: { byRating: null } },
  { label: "By Price", value: { byPrice: null } },
  { label: "Most Popular", value: { byPopularity: null } }
];
function ShopPage() {
  var _a, _b;
  const navigate = useNavigate({ from: "/" });
  const {
    category: categoryKey,
    sort: sortKey,
    q: searchTerm
  } = useSearch({ from: "/" });
  const selectedCategory = categoryKey ? ((_a = CATEGORIES.find((c) => c.key === categoryKey)) == null ? void 0 : _a.value) ?? void 0 : void 0;
  const selectedSort = ((_b = SORT_OPTIONS.find(
    (o) => Object.keys(o.value)[0] === sortKey
  )) == null ? void 0 : _b.value) ?? { byRating: null };
  const setCategory = (cat) => {
    const key = cat ? Object.keys(cat)[0] : void 0;
    void navigate({ search: (prev) => ({ ...prev, category: key }) });
  };
  const setSort = (sort) => {
    void navigate({
      search: (prev) => ({ ...prev, sort: Object.keys(sort)[0] })
    });
  };
  const setSearchTerm = (q) => {
    void navigate({ search: (prev) => ({ ...prev, q }) });
  };
  const { data: products, isLoading } = useProducts({
    category: selectedCategory,
    sortOrder: selectedSort,
    searchTerm: searchTerm || void 0
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { onSearch: setSearchTerm, searchValue: searchTerm, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-10 lg:py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -24 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.5 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-accent/20 text-accent-foreground border-accent/30 mb-4 font-body text-sm px-3 py-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 14, className: "mr-1.5" }),
              "Gentle Care for Silver Hair"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4", children: [
              "Care for Your",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Silver Crowns" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground font-body leading-relaxed mb-6 max-w-lg", children: "Expertly formulated hair care for mature hair. Every product is chosen for gentle ingredients, proven results, and ease of use." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "lg",
                  className: "text-base font-body",
                  onClick: () => {
                    var _a2;
                    return (_a2 = document.getElementById("products-section")) == null ? void 0 : _a2.scrollIntoView({ behavior: "smooth" });
                  },
                  "data-ocid": "hero-cta-shop",
                  children: "Explore Products"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "lg",
                  className: "text-base font-body",
                  asChild: true,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/guides", "data-ocid": "hero-cta-guides", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 18, className: "mr-2" }),
                    "Hair Care Guide"
                  ] })
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.97 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.5, delay: 0.15 },
          className: "hidden lg:block",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/generated/hero-elderly-haircare.dim_1200x800.jpg",
              alt: "Elderly couple enjoying hair care products together",
              className: "w-full rounded-2xl shadow-elevated object-cover aspect-[4/3]"
            }
          )
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/40 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 text-center", children: [
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { size: 20 }),
        title: "Gentle Ingredients",
        desc: "No harsh sulfates or parabens"
      },
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 20 }),
        title: "Expert Curated",
        desc: "Chosen by hair care specialists"
      },
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 20 }),
        title: "Free Guides",
        desc: "Detailed hair care education"
      }
    ].map((feat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-3 sm:flex-col sm:gap-2 px-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-primary shrink-0", children: feat.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left sm:text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-base", children: feat.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body", children: feat.desc })
          ] })
        ]
      },
      feat.title
    )) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "products-section", className: "bg-background py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "All Products" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground font-body", children: "Sort:" }),
          SORT_OPTIONS.map((opt) => {
            const key = Object.keys(opt.value)[0];
            const selectedKey = selectedSort ? Object.keys(selectedSort)[0] : "";
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: selectedKey === key ? "default" : "outline",
                size: "sm",
                className: "text-sm font-body",
                onClick: () => setSort(opt.value),
                "data-ocid": `sort-${key}`,
                children: opt.label
              },
              key
            );
          })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: !selectedCategory ? "default" : "outline",
            size: "sm",
            className: "text-sm font-body",
            onClick: () => setCategory(void 0),
            "data-ocid": "filter-all",
            children: "All Categories"
          }
        ),
        CATEGORIES.map((cat) => {
          const isSelected = selectedCategory && cat.key in selectedCategory;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: isSelected ? "default" : "outline",
              size: "sm",
              className: "text-sm font-body",
              onClick: () => setCategory(isSelected ? void 0 : cat.value),
              "data-ocid": `filter-${cat.key}`,
              children: cat.label
            },
            cat.key
          );
        })
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: [1, 2, 3, 4, 5, 6].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-96 rounded-lg" }, n)) }) : products && products.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
          initial: "hidden",
          animate: "visible",
          variants: {
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } }
          },
          children: products.map((product) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              variants: {
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4 }
                }
              },
              "data-ocid": "product-list-item",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product })
            },
            product.id.toString()
          ))
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20", "data-ocid": "products-empty-state", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { size: 48, className: "text-muted-foreground mx-auto mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold text-foreground mb-2", children: "No products found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-muted-foreground font-body mb-4", children: "Try adjusting your search or filter." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: () => {
              setCategory(void 0);
              setSearchTerm("");
            },
            children: "Clear Filters"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 border-t border-border py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground mb-3", children: "Not Sure Where to Start?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground font-body mb-6 max-w-xl mx-auto", children: "Read our free hair care guides — written by experts specifically for grey, silver, and thinning hair." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "lg",
              variant: "outline",
              className: "text-base font-body",
              asChild: true,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/guides", "data-ocid": "bottom-cta-guides", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 18, className: "mr-2" }),
                "Explore Hair Care Guides"
              ] })
            }
          )
        ]
      }
    ) }) })
  ] });
}
export {
  ShopPage
};
