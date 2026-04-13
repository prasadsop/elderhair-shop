# Design Brief

**Purpose**: E-commerce shop for elderly hair care products addressing grey/white hair, thinning, and sensitive scalp concerns. Warm, trustworthy, calming visual language prioritizes readability and accessibility above all design embellishment.

| Attribute | Value |
|-----------|-------|
| **Theme** | Light (warm minimalism) |
| **Aesthetic** | Warm, accessible, refined minimalism |
| **Primary Font** | Figtree (display, warm & approachable) |
| **Body Font** | Lora (serif, highly readable at 18-20px) |
| **Accent Usage** | Sparingly for CTAs, highlights, and status indicators |
| **Layout Approach** | Card-based product grid, generous whitespace, clear hierarchy |
| **Baseline Type Size** | 18px body, 32px+ headers |

## Palette (Light)

| Token | OKLCH | Usage |
|-------|-------|-------|
| **Background** | 0.96 0.02 75 | Page background, warm cream-beige |
| **Foreground** | 0.25 0.01 40 | Body text, warm deep brown |
| **Card** | 0.98 0.01 80 | Product cards, slightly warmer than background |
| **Primary** | 0.62 0.18 42 | CTAs, buttons, warm terracotta-brown |
| **Accent** | 0.68 0.12 145 | Highlights, new badges, muted sage green |
| **Muted** | 0.92 0.02 70 | Secondary text, borders, subtle warm grey |
| **Border** | 0.88 0.02 75 | Dividers, card edges, soft warm line |

## Palette (Dark)

| Token | OKLCH | Usage |
|-------|-------|-------|
| **Background** | 0.15 0.01 40 | Dark warm brown base |
| **Foreground** | 0.92 0.02 70 | Light text, warm cream |
| **Card** | 0.22 0.01 40 | Elevated surface in dark mode |
| **Primary** | 0.65 0.16 38 | Buttons, lighter terracotta |
| **Accent** | 0.72 0.1 150 | Highlights, brighter sage |

## Structural Zones

| Zone | Background | Border | Treatment |
|------|-----------|--------|-----------|
| **Header/Navigation** | `bg-card` with `border-b border-border` | Soft warm line | Logo left, search center, cart right |
| **Hero** | `bg-background` | None | Large, welcoming imagery of silver-haired customers (generated) |
| **Product Grid** | `bg-background` | None | Alternating `bg-card` product cards in 2-3 column responsive grid |
| **Product Card** | `bg-card` | `border border-border` | Soft rounded corners (12px), `shadow-subtle`, product image 60%, details 40% |
| **CTA Section** | `bg-muted/20` with `border-t border-border` | Top border | Newsletter signup, "Learn More" buttons |
| **Footer** | `bg-muted/40` with `border-t border-border` | Top border | Simple links, contact info, accessibility statement |

## Component Patterns

- **Buttons**: Primary `bg-primary text-primary-foreground`, secondary `bg-muted text-muted-foreground`, all with `rounded-lg`
- **Cards**: `bg-card border border-border rounded-lg shadow-subtle` with 20px padding
- **Inputs**: `bg-input text-foreground border border-border rounded-md` with 16px+ font for touch targets
- **Badges**: `bg-accent text-accent-foreground rounded-full px-3 py-1` for product tags (New, Sale, Bestseller)
- **Product Images**: 1:1 aspect ratio, fill available card width, alt text mandatory

## Motion & Microinteraction

- **Hover**: Button outline increases opacity, card shadow elevates to `shadow-elevated`, `transition-smooth` applied globally
- **Focus**: Ring thickness 2px using `--ring` color, visible on all interactive elements
- **Entrance**: Cards fade in staggered on load (0.1s offset between items), hero imagery fade-in on scroll

## Constraints & Accessibility

- **Minimum font size**: 18px for body text (WCAG AAA for elderly users)
- **Minimum contrast**: 7:1 foreground on background (exceeds AA)
- **Touch target**: Buttons and inputs minimum 44px height for elderly hands
- **Line height**: 1.6+ for body text, 1.4+ for headers
- **Spacing**: 32px+ between major sections, 16px+ between components
- **No autoplay**: Media (if used) never autoplays; always requires explicit interaction
- **Focus indicators**: Always visible, never hidden

## Signature Detail

Large, warm typography anchors the experience. Headers breathe with 1.4 line-height; body text at 18px with 1.6 line-height prevents cognitive load. Warm terracotta accents on CTAs signal care and safety. Muted sage green reserves for "sale" or "new" badges creates gentle visual interest without distraction. No animations distract from content; motion is utilitarian (hover feedback, entrance fades). Product cards inherit the philosophy: ample whitespace around image and description, clear pricing in warm brown weight-700 text.

