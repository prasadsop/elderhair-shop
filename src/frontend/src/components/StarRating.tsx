import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onRate?: (rating: number) => void;
}

const sizeClasses = {
  sm: "w-3.5 h-3.5",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

export function StarRating({
  rating,
  maxStars = 5,
  size = "md",
  interactive = false,
  onRate,
}: StarRatingProps) {
  const starSize = sizeClasses[size];

  return (
    <div
      className="flex items-center gap-0.5"
      role={interactive ? "radiogroup" : "img"}
      aria-label={`Rating: ${rating} out of ${maxStars} stars`}
    >
      {Array.from({ length: maxStars }, (_, i) => {
        const filled = i < Math.floor(rating);
        const partial = !filled && i < rating;
        const starValue = i + 1;

        return (
          <button
            key={`star-${starValue}`}
            type="button"
            onClick={() => interactive && onRate?.(starValue)}
            disabled={!interactive}
            className={[
              "relative focus:outline-none",
              interactive
                ? "cursor-pointer hover:scale-110 transition-smooth focus-visible:ring-2 focus-visible:ring-ring rounded"
                : "cursor-default pointer-events-none",
            ].join(" ")}
            aria-label={interactive ? `Rate ${starValue} stars` : undefined}
            role={interactive ? "radio" : undefined}
            aria-checked={
              interactive ? starValue === Math.round(rating) : undefined
            }
          >
            {/* Background star (unfilled) */}
            <Star
              className={`${starSize} text-muted-foreground/30 fill-muted-foreground/10`}
            />
            {/* Filled star overlay */}
            {(filled || partial) && (
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  width: filled
                    ? "100%"
                    : `${(rating - Math.floor(rating)) * 100}%`,
                }}
              >
                <Star className={`${starSize} text-primary fill-primary`} />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
