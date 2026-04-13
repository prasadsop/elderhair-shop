export type ProductCategory =
  | { shampoosAndConditioners: null }
  | { treatmentsAndSerums: null }
  | { stylingTools: null }
  | { scalpCare: null };

export type StockStatus =
  | { inStock: null }
  | { lowStock: null }
  | { outOfStock: null };

export type SortOrder =
  | { byPrice: null }
  | { byPopularity: null }
  | { byRating: null }
  | { byNewest: null };

export type GuideTag =
  | { greyHair: null }
  | { thinning: null }
  | { scalpCare: null }
  | { styling: null }
  | { products: null };

export interface Product {
  id: bigint;
  name: string;
  brand: string;
  price: number;
  category: ProductCategory;
  description: string;
  imageUrl: string;
  rating: number;
  reviewCount: bigint;
  stockStatus: StockStatus;
  keyIngredients: string[];
  benefits: string[];
  suitableFor: string[];
  size: string;
  tags: string[];
  createdAt: bigint;
}

export interface Review {
  id: bigint;
  productId: bigint;
  authorName: string;
  rating: number;
  content: string;
  date: bigint;
}

export interface GuideArticle {
  id: bigint;
  title: string;
  author: string;
  publishDate: bigint;
  readTime: bigint;
  content: string;
  tags: GuideTag[];
  relatedProductIds: bigint[];
}

export interface ProductFilter {
  category?: ProductCategory;
  searchTerm?: string;
  sortOrder?: SortOrder;
}

// Cart types
export interface CartItem {
  product: Product;
  quantity: number;
}

// Helper functions
export function getCategoryLabel(category: ProductCategory): string {
  if ("shampoosAndConditioners" in category) return "Shampoos & Conditioners";
  if ("treatmentsAndSerums" in category) return "Treatments & Serums";
  if ("stylingTools" in category) return "Styling Tools";
  if ("scalpCare" in category) return "Scalp Care";
  return "Unknown";
}

export function getCategoryKey(category: ProductCategory): string {
  if ("shampoosAndConditioners" in category) return "shampoosAndConditioners";
  if ("treatmentsAndSerums" in category) return "treatmentsAndSerums";
  if ("stylingTools" in category) return "stylingTools";
  if ("scalpCare" in category) return "scalpCare";
  return "";
}

export function getStockLabel(status: StockStatus): string {
  if ("inStock" in status) return "In Stock";
  if ("lowStock" in status) return "Low Stock";
  if ("outOfStock" in status) return "Out of Stock";
  return "Unknown";
}

export function getGuideTagLabel(tag: GuideTag): string {
  if ("greyHair" in tag) return "Grey Hair";
  if ("thinning" in tag) return "Thinning Hair";
  if ("scalpCare" in tag) return "Scalp Care";
  if ("styling" in tag) return "Styling";
  if ("products" in tag) return "Products";
  return "Unknown";
}

// Mock products for frontend display (since backend is empty)
export const MOCK_PRODUCTS: Product[] = [
  {
    id: BigInt(1),
    name: "Silver Shine Shampoo",
    brand: "GoldenYears",
    price: 24.99,
    category: { shampoosAndConditioners: null },
    description:
      "Hydrating shampoo specially formulated for silver and grey hair. Enhances natural shimmer while nourishing dry strands.",
    imageUrl: "/assets/generated/product-shampoo.dim_600x600.jpg",
    rating: 4.8,
    reviewCount: BigInt(124),
    stockStatus: { inStock: null },
    keyIngredients: ["Argan Oil", "Keratin", "Violet Pigments", "Aloe Vera"],
    benefits: [
      "Brightens grey hair",
      "Reduces yellowing",
      "Deep hydration",
      "Strengthens strands",
    ],
    suitableFor: ["Grey hair", "Silver hair", "Dry hair"],
    size: "250ml",
    tags: ["grey-hair", "hydrating", "brightening"],
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(2),
    name: "Silk Nourish Conditioner",
    brand: "GoldenYears",
    price: 26.5,
    category: { shampoosAndConditioners: null },
    description:
      "Rich, creamy conditioner that restores moisture and softness to mature, thinning hair without weighing it down.",
    imageUrl: "/assets/generated/product-conditioner.dim_600x600.jpg",
    rating: 4.7,
    reviewCount: BigInt(98),
    stockStatus: { inStock: null },
    keyIngredients: ["Silk Proteins", "Coconut Oil", "Vitamin E", "Chamomile"],
    benefits: [
      "Intense moisture",
      "Reduces breakage",
      "Adds softness",
      "Detangles gently",
    ],
    suitableFor: ["Thinning hair", "Fine hair", "Mature hair"],
    size: "250ml",
    tags: ["thinning-hair", "moisturizing", "gentle"],
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(3),
    name: "Root Fortifying Serum",
    brand: "VitaScalp",
    price: 32.0,
    category: { treatmentsAndSerums: null },
    description:
      "Concentrated scalp serum that stimulates follicles and strengthens hair roots. Clinically tested for mature scalp health.",
    imageUrl: "/assets/generated/product-serum.dim_600x600.jpg",
    rating: 4.9,
    reviewCount: BigInt(76),
    stockStatus: { inStock: null },
    keyIngredients: [
      "Biotin",
      "Caffeine Extract",
      "Rosemary Oil",
      "Niacinamide",
    ],
    benefits: [
      "Stimulates growth",
      "Strengthens roots",
      "Reduces hair fall",
      "Nourishes scalp",
    ],
    suitableFor: ["Thinning hair", "Hair loss", "Sensitive scalp"],
    size: "50ml",
    tags: ["thinning-hair", "scalp-care", "growth"],
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(4),
    name: "Gentle Detangling Brush",
    brand: "SilverComfort",
    price: 18.99,
    category: { stylingTools: null },
    description:
      "Wide-tooth brush with flexible bristles that glide through hair without pulling or breaking. Ergonomic handle for easy grip.",
    imageUrl: "/assets/generated/product-brush.dim_600x600.jpg",
    rating: 4.6,
    reviewCount: BigInt(211),
    stockStatus: { inStock: null },
    keyIngredients: [],
    benefits: [
      "Reduces breakage",
      "Gentle on scalp",
      "Easy grip handle",
      "Suitable for wet hair",
    ],
    suitableFor: ["All hair types", "Sensitive scalp", "Elderly users"],
    size: "Standard",
    tags: ["styling-tools", "gentle", "detangling"],
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(5),
    name: "Calming Scalp Mask",
    brand: "PureHerbs",
    price: 28.0,
    category: { scalpCare: null },
    description:
      "Soothing weekly scalp treatment with natural botanicals that calm irritation, reduce dryness, and restore balance.",
    imageUrl: "/assets/generated/product-mask.dim_600x600.jpg",
    rating: 4.5,
    reviewCount: BigInt(63),
    stockStatus: { lowStock: null },
    keyIngredients: [
      "Tea Tree Oil",
      "Peppermint",
      "Salicylic Acid",
      "Aloe Vera",
    ],
    benefits: [
      "Soothes irritation",
      "Reduces flaking",
      "Balances scalp",
      "Refreshes roots",
    ],
    suitableFor: ["Sensitive scalp", "Dry scalp", "Itchy scalp"],
    size: "150ml",
    tags: ["scalp-care", "soothing", "weekly-treatment"],
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(6),
    name: "Smooth Levain Serum",
    brand: "GoldenYears",
    price: 35.0,
    category: { treatmentsAndSerums: null },
    description:
      "Leave-in finishing serum that tames frizz, adds luminous shine, and protects grey hair from environmental damage.",
    imageUrl: "/assets/generated/product-serum2.dim_600x600.jpg",
    rating: 4.7,
    reviewCount: BigInt(89),
    stockStatus: { inStock: null },
    keyIngredients: [
      "Moringa Oil",
      "UV Filters",
      "Hyaluronic Acid",
      "Pearl Extract",
    ],
    benefits: [
      "Controls frizz",
      "Adds shine",
      "UV protection",
      "Lightweight formula",
    ],
    suitableFor: ["Grey hair", "Frizzy hair", "All hair types"],
    size: "75ml",
    tags: ["grey-hair", "shine", "frizz-control"],
    createdAt: BigInt(Date.now()),
  },
];

export const MOCK_GUIDES: GuideArticle[] = [
  {
    id: BigInt(1),
    title: "Caring for Grey & Silver Hair: A Complete Guide",
    author: "Dr. Priya Sharma",
    publishDate: BigInt(Date.now() - 7 * 24 * 60 * 60 * 1000),
    readTime: BigInt(8),
    content: `Grey and silver hair is beautiful, but it requires specific care. As hair loses its pigment, it also changes in texture — often becoming coarser, drier, and more prone to yellowing.

**Why Grey Hair Needs Special Care**

When hair goes grey, the melanin that once protected and colored each strand disappears. This makes grey hair more porous, meaning it absorbs moisture (and pollution) more easily — but also loses it faster.

**Daily Care Routine**

1. **Wash gently**: Use a sulfate-free shampoo 2-3 times per week. Over-washing strips natural oils your scalp needs.
2. **Condition every wash**: Grey hair needs consistent moisture. Apply conditioner from mid-shaft to ends.
3. **Weekly deep treatment**: A hydrating hair mask once a week can make a significant difference in texture and shine.
4. **Protect from heat**: If you use heat tools, always use a heat protectant spray first.

**Preventing Yellowing**

Yellow tones in grey hair come from mineral buildup, smoke, pollution, and product residue. Use a purple or blue-tinted shampoo once a week to neutralize brassiness and keep your silver bright.

**Products We Recommend**

Our Silver Shine Shampoo is formulated with gentle violet pigments to counteract yellowing, while the Smooth Levain Serum adds the luminous finish grey hair deserves.`,
    tags: [{ greyHair: null }, { styling: null }],
    relatedProductIds: [BigInt(1), BigInt(6)],
  },
  {
    id: BigInt(2),
    title: "Managing Thinning Hair: Natural Solutions That Work",
    author: "Rajesh Poudel, Trichologist",
    publishDate: BigInt(Date.now() - 14 * 24 * 60 * 60 * 1000),
    readTime: BigInt(10),
    content: `Hair thinning is one of the most common concerns for people over 60. While genetics play a role, nutrition, stress, and hair care habits significantly impact hair density.

**Understanding Hair Thinning in Later Life**

As we age, hair follicles shrink and the growth cycle shortens. Each hair strand becomes finer, and the scalp may show through more. This is completely natural — but there are many ways to support healthy hair growth and volume.

**Nutritional Support**

Hair is made of protein (keratin). Ensure your diet includes:
- **Biotin-rich foods**: Eggs, nuts, seeds, and sweet potatoes
- **Iron**: Leafy greens, lentils, lean meat
- **Omega-3 fatty acids**: Oily fish, walnuts, flaxseeds
- **Vitamin D**: Sunlight exposure and fortified foods

**Hair Care Practices**

1. **Gentle handling**: Wet hair is fragile. Use wide-tooth combs and detangling brushes.
2. **Avoid tight styles**: Ponytails and braids that pull at the roots can cause traction alopecia.
3. **Scalp massage**: 5 minutes daily of gentle scalp massage increases blood flow to follicles.
4. **Targeted serums**: Look for products with biotin, caffeine, and rosemary oil.

**What to Avoid**

- Harsh chemical treatments (perms, relaxers)
- Very hot water when washing
- Rough towel drying — pat gently instead`,
    tags: [{ thinning: null }, { scalpCare: null }, { products: null }],
    relatedProductIds: [BigInt(2), BigInt(3), BigInt(4)],
  },
  {
    id: BigInt(3),
    title: "Scalp Health: The Foundation of Beautiful Hair",
    author: "Dr. Meera Gurung",
    publishDate: BigInt(Date.now() - 21 * 24 * 60 * 60 * 1000),
    readTime: BigInt(7),
    content: `A healthy scalp is the foundation of healthy hair. Yet many people focus only on the hair itself, neglecting the skin it grows from.

**Common Scalp Issues in Mature Adults**

As we age, scalp skin becomes thinner and oil production decreases. This can lead to:
- **Dry, itchy scalp**: Reduced sebum production
- **Sensitivity**: Thinner skin reacts more to products
- **Dandruff**: Can worsen with hormonal changes
- **Psoriasis**: Often becomes more pronounced with age

**Building a Scalp Care Routine**

**Step 1: Cleanse gently**
Choose a mild, pH-balanced shampoo. Look for labels that say "sensitive scalp" or "gentle formula." Avoid anything with sulfates (SLS/SLES) if your scalp is dry or irritated.

**Step 2: Weekly scalp treatment**
Apply a targeted scalp mask or oil treatment once a week. Leave it on for 20-30 minutes before washing. Our Calming Scalp Mask uses tea tree and peppermint to soothe while restoring balance.

**Step 3: Hydrate from within**
Drink at least 8 glasses of water daily. A hydrated body means a hydrated scalp.

**Step 4: Professional check-ins**
If you experience persistent itching, redness, or unusual hair loss, visit a dermatologist. Scalp conditions are very treatable when caught early.`,
    tags: [{ scalpCare: null }, { thinning: null }],
    relatedProductIds: [BigInt(5), BigInt(3)],
  },
  {
    id: BigInt(4),
    title: "Gentle Styling Tips for Mature Hair",
    author: "Sunita Thapa, Stylist",
    publishDate: BigInt(Date.now() - 28 * 24 * 60 * 60 * 1000),
    readTime: BigInt(6),
    content: `Styling mature hair requires a gentle touch and the right techniques. The goal is to look and feel beautiful without causing damage or stress to fragile strands.

**Embracing Your Natural Texture**

Many women in their 60s and 70s find that embracing their natural texture — whether wavy, curly, or straight — is both liberating and practical. Working with your hair's natural movement reduces the need for heat styling.

**Low-Heat Styling Techniques**

1. **Air drying**: Let hair dry naturally whenever possible. Use a microfiber towel to absorb excess water gently.
2. **Diffusing**: If you prefer volume, use a diffuser attachment on low heat instead of a direct blast.
3. **Flexi rods or foam rollers**: Create soft waves overnight without any heat.

**Protective Styles**

Soft updos, loose braids, and gentle twists protect hair ends from friction and environmental damage. Avoid styles that pull tightly at the hairline.

**Product Layering for Volume**

For fine or thinning hair, less is more. Start with a volumizing mousse on damp hair at the roots, then a light-hold finishing spray. Avoid heavy creams or oils near the roots — save those for the ends.

**Cutting Advice**

Regular trims every 6-8 weeks prevent split ends from traveling up the shaft. Ask your stylist for layers that add movement without removing too much volume.`,
    tags: [{ styling: null }, { thinning: null }],
    relatedProductIds: [BigInt(4), BigInt(6)],
  },
];
