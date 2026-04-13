import { Skeleton } from "@/components/ui/skeleton";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { CartProvider } from "./context/CartContext";

// Lazy load pages for performance
const ShopPage = lazy(() =>
  import("./pages/ShopPage").then((m) => ({ default: m.ShopPage })),
);
const ProductDetailPage = lazy(() =>
  import("./pages/ProductDetailPage").then((m) => ({
    default: m.ProductDetailPage,
  })),
);
const CartPage = lazy(() =>
  import("./pages/CartPage").then((m) => ({ default: m.CartPage })),
);
const CheckoutPage = lazy(() =>
  import("./pages/CheckoutPage").then((m) => ({ default: m.CheckoutPage })),
);
const GuidesPage = lazy(() =>
  import("./pages/GuidesPage").then((m) => ({ default: m.GuidesPage })),
);
const GuideArticlePage = lazy(() =>
  import("./pages/GuideArticlePage").then((m) => ({
    default: m.GuideArticlePage,
  })),
);
const SubscriptionPage = lazy(() =>
  import("./pages/SubscriptionPage").then((m) => ({
    default: m.SubscriptionPage,
  })),
);

function PageFallback() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-4">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <Skeleton key={n} className="h-72 rounded-lg" />
        ))}
      </div>
    </div>
  );
}

// Root route
const rootRoute = createRootRoute({
  component: () => (
    <CartProvider>
      <Outlet />
    </CartProvider>
  ),
});

// Routes
const shopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  validateSearch: (search: Record<string, unknown>) => ({
    category: typeof search.category === "string" ? search.category : undefined,
    sort: typeof search.sort === "string" ? search.sort : "byRating",
    q: typeof search.q === "string" ? search.q : "",
  }),
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <ShopPage />
    </Suspense>
  ),
});

const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products/$id",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <ProductDetailPage />
    </Suspense>
  ),
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <CartPage />
    </Suspense>
  ),
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <CheckoutPage />
    </Suspense>
  ),
});

const guidesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/guides",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <GuidesPage />
    </Suspense>
  ),
});

const guideArticleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/guides/$id",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <GuideArticlePage />
    </Suspense>
  ),
});

const subscribeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/subscribe",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <SubscriptionPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  shopRoute,
  productDetailRoute,
  cartRoute,
  checkoutRoute,
  guidesRoute,
  guideArticleRoute,
  subscribeRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
