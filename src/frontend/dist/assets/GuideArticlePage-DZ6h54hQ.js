import { b as useParams, j as jsxRuntimeExports, S as Skeleton, L as Link } from "./index-BrmIA-SK.js";
import { d as createLucideIcon, L as Layout, b as BookOpen, a as Button, B as Badge } from "./Layout-DGc-UyHY.js";
import { S as Separator } from "./separator-DdAPHIV_.js";
import { P as ProductCard } from "./ProductCard-DyjFD5f-.js";
import { f as useGuideArticle, M as MOCK_PRODUCTS, g as getGuideTagLabel } from "./useBackend-C4FxJ3vZ.js";
import { A as ArrowLeft } from "./arrow-left-DK4PSKg8.js";
import { m as motion } from "./proxy-CoeVpKA6.js";
import { C as Clock } from "./clock-BgurLkQK.js";
import "./card-CZWIEjsJ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
function renderBold(text) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  const result = [];
  for (let k = 0; k < parts.length; k++) {
    if (k % 2 === 1) {
      result.push(/* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: parts[k] }, parts[k]));
    } else if (parts[k]) {
      result.push(parts[k]);
    }
  }
  return result;
}
function renderContent(content) {
  const paragraphs = content.split("\n\n").filter(Boolean);
  const elements = [];
  for (const para of paragraphs) {
    const trimmed = para.trim();
    const paraKey = trimmed.slice(0, 40);
    if (/^\d+\./.test(trimmed)) {
      const lines = trimmed.split("\n").filter(Boolean);
      elements.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "ol",
          {
            className: "list-decimal list-inside space-y-2 my-4",
            children: lines.map((line) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "li",
              {
                className: "text-lg text-foreground font-body leading-relaxed",
                children: renderBold(line.replace(/^\d+\.\s*/, ""))
              },
              line.slice(0, 40)
            ))
          },
          `ol-${paraKey}`
        )
      );
      continue;
    }
    if (trimmed.startsWith("- ")) {
      const lines = trimmed.split("\n").filter((l) => l.trim().startsWith("- "));
      elements.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "ul",
          {
            className: "list-disc list-inside space-y-2 my-4",
            children: lines.map((line) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "li",
              {
                className: "text-lg text-foreground font-body leading-relaxed",
                children: renderBold(line.replace(/^-\s*/, ""))
              },
              line.slice(0, 40)
            ))
          },
          `ul-${paraKey}`
        )
      );
      continue;
    }
    if (trimmed.startsWith("**") && trimmed.endsWith("**") && trimmed.indexOf("**", 2) === trimmed.length - 2) {
      elements.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h3",
          {
            className: "font-display text-xl font-bold text-foreground mt-6 mb-2",
            children: trimmed.replace(/\*\*/g, "")
          },
          `h3-${paraKey}`
        )
      );
      continue;
    }
    elements.push(
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-lg text-foreground font-body leading-relaxed my-3",
          children: renderBold(trimmed)
        },
        `p-${paraKey}`
      )
    );
  }
  return elements;
}
function GuideArticlePage() {
  const { id } = useParams({ from: "/guides/$id" });
  const articleId = BigInt(id);
  const { data: article, isLoading } = useGuideArticle(articleId);
  const relatedProducts = article ? MOCK_PRODUCTS.filter((p) => article.relatedProductIds.includes(p.id)) : [];
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-3xl space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-32" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full rounded-xl" })
    ] }) });
  }
  if (!article) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 48, className: "text-muted-foreground mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-3", children: "Article Not Found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/guides", children: "Back to Guides" }) })
    ] }) });
  }
  const date = new Date(Number(article.publishDate));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 pt-6 pb-2 max-w-3xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/guides",
        className: "flex items-center gap-1.5 text-base text-muted-foreground hover:text-primary transition-colors font-body w-fit",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 16 }),
          "Back to Guides"
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-10 max-w-3xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: article.tags.map((tag) => {
            const key = Object.keys(tag)[0];
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "font-body text-sm px-3 py-1 bg-accent/20 text-accent-foreground border-accent/30",
                children: getGuideTagLabel(tag)
              },
              key
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4", children: article.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4 text-base text-muted-foreground font-body", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 16 }),
              article.author
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 16 }),
              Number(article.readTime),
              " min read"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric"
            }) })
          ] })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-10 max-w-3xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.article,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.5, delay: 0.15 },
        children: renderContent(article.content)
      }
    ) }),
    relatedProducts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "Recommended Products" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-muted-foreground font-body mb-6", children: "Products mentioned or recommended in this guide." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: relatedProducts.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p }, p.id.toString())) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background border-t border-border py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 text-center max-w-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-bold text-foreground mb-3", children: "Explore More Guides" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-muted-foreground font-body mb-5", children: "We have more expert hair care guides for silver and mature hair." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "lg",
          variant: "outline",
          className: "text-base font-body",
          asChild: true,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/guides", "data-ocid": "article-back-to-guides", children: "All Hair Care Guides" })
        }
      )
    ] }) })
  ] }) });
}
export {
  GuideArticlePage
};
