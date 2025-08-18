import React from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa';

const StarRating: React.FC<{ rating: number; className?: string }> = ({
    rating,
    className,
}) => (
    <div className={`flex items-center gap-1 ${className}`}>
        {[...Array(5)].map((_, i) =>
            i < Math.floor(rating) ? (
                <FaStar key={i} className="text-yellow-400" />
            ) : (
                <FaRegStar key={i} className="text-gray-300" />
            )
        )}
    </div>
);

export default StarRating
