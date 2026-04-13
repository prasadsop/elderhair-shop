import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface SubscriberPublic {
    status: SubscriptionStatus;
    startedAt: bigint;
    planId: string;
    stripeSubscriptionId: string;
    userId: Principal;
    stripeCustomerId: string;
}
export interface Product {
    id: bigint;
    stockStatus: StockStatus;
    name: string;
    createdAt: bigint;
    size: string;
    tags: Array<string>;
    description: string;
    imageUrl: string;
    suitableFor: Array<string>;
    category: ProductCategory;
    benefits: Array<string>;
    brand: string;
    rating: number;
    price: number;
    keyIngredients: Array<string>;
    reviewCount: bigint;
}
export interface GuideArticle {
    id: bigint;
    title: string;
    content: string;
    publishDate: bigint;
    tags: Array<GuideTag>;
    author: string;
    readTime: bigint;
    relatedProductIds: Array<bigint>;
}
export interface SubscriptionPlan {
    id: string;
    features: Array<string>;
    interval: string;
    name: string;
    description: string;
    currency: string;
    price: number;
}
export interface ProductFilter {
    sortOrder?: SortOrder;
    searchTerm?: string;
    category?: ProductCategory;
}
export interface Review {
    id: bigint;
    content: string;
    date: bigint;
    authorName: string;
    productId: bigint;
    rating: number;
}
export enum GuideTag {
    styling = "styling",
    thinning = "thinning",
    scalpCare = "scalpCare",
    greyHair = "greyHair",
    products = "products"
}
export enum ProductCategory {
    scalpCare = "scalpCare",
    shampoosAndConditioners = "shampoosAndConditioners",
    treatmentsAndSerums = "treatmentsAndSerums",
    stylingTools = "stylingTools"
}
export enum SortOrder {
    byNewest = "byNewest",
    byRating = "byRating",
    byPrice = "byPrice",
    byPopularity = "byPopularity"
}
export enum StockStatus {
    inStock = "inStock",
    outOfStock = "outOfStock",
    lowStock = "lowStock"
}
export enum SubscriptionStatus {
    active = "active",
    cancelled = "cancelled",
    inactive = "inactive"
}
export interface backendInterface {
    cancelMySubscription(): Promise<boolean>;
    createGuideArticle(title: string, author: string, readTime: bigint, content: string, tags: Array<GuideTag>, relatedProductIds: Array<bigint>): Promise<GuideArticle>;
    createProduct(name: string, brand: string, price: number, category: ProductCategory, description: string, imageUrl: string, stockStatus: StockStatus, keyIngredients: Array<string>, benefits: Array<string>, suitableFor: Array<string>, size: string, tags: Array<string>): Promise<Product>;
    getGuideArticle(id: bigint): Promise<GuideArticle | null>;
    getMySubscription(): Promise<SubscriberPublic | null>;
    getProduct(id: bigint): Promise<Product | null>;
    getProductReviews(productId: bigint): Promise<Array<Review>>;
    getRelatedProducts(productId: bigint, limit: bigint): Promise<Array<Product>>;
    getSubscriptionPlan(planId: string): Promise<SubscriptionPlan | null>;
    isSubscribed(): Promise<boolean>;
    listGuideArticles(tag: GuideTag | null): Promise<Array<GuideArticle>>;
    listProducts(filter: ProductFilter): Promise<Array<Product>>;
    listSubscriptionPlans(): Promise<Array<SubscriptionPlan>>;
    recordSubscription(planId: string, stripeCustomerId: string, stripeSubscriptionId: string): Promise<SubscriberPublic>;
    submitReview(productId: bigint, authorName: string, rating: number, content: string): Promise<Review>;
}
