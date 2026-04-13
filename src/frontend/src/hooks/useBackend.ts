import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  type GuideArticle,
  type GuideTag,
  MOCK_GUIDES,
  MOCK_PRODUCTS,
  type Product,
  type ProductFilter,
  type Review,
} from "../types";

// Since backend has no methods yet, we use mock data
// When backend is wired up, replace these with actor calls via useActor

export function useProducts(filter?: ProductFilter) {
  return useQuery<Product[]>({
    queryKey: ["products", filter],
    queryFn: async () => {
      // Simulate network delay
      await new Promise((r) => setTimeout(r, 300));
      let products = [...MOCK_PRODUCTS];

      if (filter?.searchTerm) {
        const term = filter.searchTerm.toLowerCase();
        products = products.filter(
          (p) =>
            p.name.toLowerCase().includes(term) ||
            p.brand.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term),
        );
      }

      if (filter?.category) {
        const catKey = Object.keys(filter.category)[0];
        products = products.filter((p) => catKey in p.category);
      }

      if (filter?.sortOrder) {
        if ("byPrice" in filter.sortOrder) {
          products.sort((a, b) => a.price - b.price);
        } else if ("byRating" in filter.sortOrder) {
          products.sort((a, b) => b.rating - a.rating);
        } else if ("byPopularity" in filter.sortOrder) {
          products.sort((a, b) => Number(b.reviewCount - a.reviewCount));
        }
      }

      return products;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useProduct(id: bigint | undefined) {
  return useQuery<Product | null>({
    queryKey: ["product", id?.toString()],
    queryFn: async () => {
      if (!id) return null;
      await new Promise((r) => setTimeout(r, 200));
      return MOCK_PRODUCTS.find((p) => p.id === id) ?? null;
    },
    enabled: id !== undefined,
    staleTime: 1000 * 60 * 5,
  });
}

export function useRelatedProducts(productId: bigint | undefined, limit = 3) {
  return useQuery<Product[]>({
    queryKey: ["relatedProducts", productId?.toString(), limit],
    queryFn: async () => {
      if (!productId) return [];
      await new Promise((r) => setTimeout(r, 200));
      const product = MOCK_PRODUCTS.find((p) => p.id === productId);
      if (!product) return [];
      return MOCK_PRODUCTS.filter(
        (p) =>
          p.id !== productId &&
          Object.keys(p.category)[0] === Object.keys(product.category)[0],
      ).slice(0, limit);
    },
    enabled: productId !== undefined,
    staleTime: 1000 * 60 * 5,
  });
}

export function useProductReviews(productId: bigint | undefined) {
  return useQuery<Review[]>({
    queryKey: ["reviews", productId?.toString()],
    queryFn: async () => {
      if (!productId) return [];
      await new Promise((r) => setTimeout(r, 200));
      // Mock reviews
      return [
        {
          id: BigInt(1),
          productId,
          authorName: "Margaret H.",
          rating: 5,
          content:
            "Finally a product that brightens my grey hair without making it brittle. I've been using this for 3 months and my hair feels so much healthier!",
          date: BigInt(Date.now() - 10 * 24 * 60 * 60 * 1000),
        },
        {
          id: BigInt(2),
          productId,
          authorName: "Dorothy K.",
          rating: 4,
          content:
            "Lovely scent and my hair feels soft after every wash. I noticed less yellowing in my silver strands within the first two weeks.",
          date: BigInt(Date.now() - 25 * 24 * 60 * 60 * 1000),
        },
        {
          id: BigInt(3),
          productId,
          authorName: "Robert S.",
          rating: 5,
          content:
            "My wife recommended this to me and I'm very happy with the results. My scalp feels healthy and my hair has more volume.",
          date: BigInt(Date.now() - 40 * 24 * 60 * 60 * 1000),
        },
      ];
    },
    enabled: productId !== undefined,
    staleTime: 1000 * 60 * 5,
  });
}

export function useSubmitReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      productId: bigint;
      authorName: string;
      rating: number;
      content: string;
    }): Promise<Review> => {
      await new Promise((r) => setTimeout(r, 500));
      return {
        id: BigInt(Math.floor(Math.random() * 10000)),
        productId: data.productId,
        authorName: data.authorName,
        rating: data.rating,
        content: data.content,
        date: BigInt(Date.now()),
      };
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", variables.productId.toString()],
      });
    },
  });
}

export function useGuideArticles(tag?: GuideTag) {
  return useQuery<GuideArticle[]>({
    queryKey: ["guides", tag ? Object.keys(tag)[0] : "all"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      if (!tag) return MOCK_GUIDES;
      const tagKey = Object.keys(tag)[0];
      return MOCK_GUIDES.filter((g) => g.tags.some((t) => tagKey in t));
    },
    staleTime: 1000 * 60 * 10,
  });
}

export function useGuideArticle(id: bigint | undefined) {
  return useQuery<GuideArticle | null>({
    queryKey: ["guide", id?.toString()],
    queryFn: async () => {
      if (!id) return null;
      await new Promise((r) => setTimeout(r, 200));
      return MOCK_GUIDES.find((g) => g.id === id) ?? null;
    },
    enabled: id !== undefined,
    staleTime: 1000 * 60 * 10,
  });
}
