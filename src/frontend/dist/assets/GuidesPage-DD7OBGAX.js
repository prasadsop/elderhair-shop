import { r as reactExports, j as jsxRuntimeExports, S as Skeleton, L as Link } from "./index-BrmIA-SK.js";
import { L as Layout, B as Badge, a as Button, b as BookOpen } from "./Layout-DGc-UyHY.js";
import { e as useGuideArticles, g as getGuideTagLabel } from "./useBackend-C4FxJ3vZ.js";
import { m as motion } from "./proxy-CoeVpKA6.js";
import { S as Sparkles } from "./sparkles-_xxA7JUv.js";
import { C as Clock } from "./clock-BgurLkQK.js";
import { A as ArrowRight } from "./arrow-right-BqC0X93_.js";
const TAG_FILTERS = [
  {
    label: "Grey Hair",
    value: { greyHair: null },
    color: "bg-primary/10 text-primary border-primary/20"
  },
  {
    label: "Thinning Hair",
    value: { thinning: null },
    color: "bg-accent/20 text-accent-foreground border-accent/30"
  },
  {
    label: "Scalp Care",
    value: { scalpCare: null },
    color: "bg-accent/15 text-accent-foreground border-accent/25"
  },
  {
    label: "Styling",
    value: { styling: null },
    color: "bg-secondary text-secondary-foreground border-border"
  }
];
function ArticleCard({
  article,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.4, delay: index * 0.08 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/guides/$id",
          params: { id: article.id.toString() },
          className: "group block bg-card border border-border rounded-xl p-6 hover:shadow-elevated transition-smooth",
          "data-ocid": "guide-article-card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-3", children: article.tags.slice(0, 2).map((tag) => {
              const key = Object.keys(tag)[0];
              const tagFilter = TAG_FILTERS.find(
                (t) => Object.keys(t.value)[0] === key
              );
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: `font-body text-sm ${(tagFilter == null ? void 0 : tagFilter.color) ?? ""}`,
                  children: getGuideTagLabel(tag)
                },
                key
              );
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug mb-2", children: article.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-muted-foreground font-body leading-relaxed line-clamp-2 mb-4", children: article.content.split("\n")[0].replace(/\*\*/g, "") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-sm text-muted-foreground font-body", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: article.author }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 14 }),
                  Number(article.readTime),
                  " min read"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-body text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-smooth", children: [
                "Read more ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
              ] })
            ] })
          ]
        }
      )
    }
  );
}
function GuidesPage() {
  const [activeTag, setActiveTag] = reactExports.useState();
  const { data: articles, isLoading } = useGuideArticles(activeTag);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-12 lg:py-16 text-center max-w-3xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-accent/20 text-accent-foreground border-accent/30 mb-4 font-body text-sm px-3 py-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 14, className: "mr-1.5" }),
            "Expert Hair Care Knowledge"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4", children: [
            "Hair Care Guide for",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Mature & Silver Hair" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground font-body leading-relaxed max-w-xl mx-auto", children: "Free, expert-written guides covering everything you need to know about caring for grey, white, and thinning hair — written specifically for older adults." })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-body text-muted-foreground font-medium", children: "Filter by topic:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: !activeTag ? "default" : "outline",
          size: "sm",
          className: "text-base font-body",
          onClick: () => setActiveTag(void 0),
          "data-ocid": "guide-filter-all",
          children: "All Topics"
        }
      ),
      TAG_FILTERS.map((tag) => {
        const key = Object.keys(tag.value)[0];
        const isActive = activeTag && Object.keys(activeTag)[0] === key;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: isActive ? "default" : "outline",
            size: "sm",
            className: "text-base font-body",
            onClick: () => setActiveTag(isActive ? void 0 : tag.value),
            "data-ocid": `guide-filter-${key}`,
            children: tag.label
          },
          key
        );
      })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [1, 2, 3, 4].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 rounded-xl" }, n)) }) : articles && articles.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: articles.map((article, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      ArticleCard,
      {
        article,
        index: i
      },
      article.id.toString()
    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", "data-ocid": "guides-empty-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        BookOpen,
        {
          size: 48,
          className: "text-muted-foreground mx-auto mb-4"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold text-foreground mb-2", children: "No guides found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setActiveTag(void 0), children: "Clear Filter" })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 border-t border-border py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground mb-3", children: "Ready to Shop?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground font-body mb-6 max-w-xl mx-auto", children: "Browse our curated range of gentle hair care products, all selected for mature and silver hair." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", className: "text-base font-body", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/",
          search: { category: void 0, sort: "byRating", q: "" },
          "data-ocid": "guides-shop-cta",
          children: "Shop All Products"
        }
      ) })
    ] }) })
  ] });
}
export {
  GuidesPage
};
