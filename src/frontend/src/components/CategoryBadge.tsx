import { Badge } from "@/components/ui/badge";
import { type ProductCategory, getCategoryLabel } from "../types";

interface CategoryBadgeProps {
  category: ProductCategory;
  size?: "sm" | "md";
}

const categoryColors: Record<string, string> = {
  shampoosAndConditioners:
    "bg-accent/20 text-accent-foreground border-accent/30",
  treatmentsAndSerums: "bg-primary/10 text-primary border-primary/20",
  stylingTools: "bg-secondary text-secondary-foreground border-border",
  scalpCare: "bg-accent/15 text-accent-foreground border-accent/25",
};

function getCategoryKey(category: ProductCategory): string {
  return Object.keys(category)[0] ?? "";
}

export function CategoryBadge({ category, size = "sm" }: CategoryBadgeProps) {
  const key = getCategoryKey(category);
  const colorClass =
    categoryColors[key] ?? "bg-muted text-muted-foreground border-border";

  return (
    <Badge
      variant="outline"
      className={`font-body font-medium border ${colorClass} ${size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1"}`}
    >
      {getCategoryLabel(category)}
    </Badge>
  );
}
