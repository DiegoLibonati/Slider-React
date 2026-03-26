import { ReviewProps } from "@/types/props";

import "@/components/Review/Review.css";

const Review = ({ image, name, title, quote, className, isActive }: ReviewProps) => {
  return (
    <article
      className={`review ${className}`}
      aria-hidden={!isActive}
      aria-label={`Review by ${name}`}
      role="group"
    >
      <img src={image} alt={`Photo of ${name}`} className="review__img" />

      <h3 className="review__name">{name}</h3>
      <h4 className="review__title">{title}</h4>
      <p className="review__quote">{quote}</p>
    </article>
  );
};

export default Review;
