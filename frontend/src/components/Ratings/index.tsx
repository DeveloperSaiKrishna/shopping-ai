const Ratings = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center gap-1 text-yellow-400 text-sm">
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <span key={i}>★</span>
        ))}

      {hasHalfStar && <span>☆</span>}

      <span className="text-gray-500 text-xs ml-1">({rating})</span>
    </div>
  );
};

export default Ratings;
