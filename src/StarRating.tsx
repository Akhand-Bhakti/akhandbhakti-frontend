import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number; // e.g. 4.3
  totalReviews?: number;
}

export default function StarRating({ rating, totalReviews }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  return (
    <div className="flex items-center gap-1 text-yellow-500 text-sm">
      {[...Array(5)].map((_, index) => {
        if (index < fullStars) {
          return <Star key={index} size={14} fill="currentColor" />;
        }

        if (index === fullStars && hasHalfStar) {
          return (
            <Star
              key={index}
              size={14}
              fill="currentColor"
              className="opacity-50"
            />
          );
        }

        return <Star key={index} size={14} />;
      })}

      {totalReviews !== undefined && (
        <span className="ml-1 text-gray-500">({totalReviews})</span>
      )}
    </div>
  );
}
