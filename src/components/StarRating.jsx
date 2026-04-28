import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import './StarRating.css';

export default function StarRating({ stars = 0, maxStars = 3, size = 24, animated = false }) {
  return (
    <div className="star-rating">
      {Array.from({ length: maxStars }, (_, i) => (
        <motion.div
          key={i}
          className={`star-rating__star ${i < stars ? 'star-rating__star--filled' : ''}`}
          initial={animated ? { scale: 0, rotate: -30 } : false}
          animate={animated && i < stars ? { scale: 1, rotate: 0 } : {}}
          transition={{ delay: i * 0.2, type: 'spring', stiffness: 300 }}
        >
          <Star size={size} fill={i < stars ? 'currentColor' : 'none'} />
        </motion.div>
      ))}
    </div>
  );
}
