import { ReviewProps } from "@/types/props";

import "@/components/Review/Review.css";

const Review = ({ image, name, title, quote, className }: ReviewProps) => {
  return (
    <article className={`review ${className}`}>
      <img src={image} alt={name} className="review__img"></img>

      <h3 className="review__name">{name}</h3>
      <h4 className="review__title">{title}</h4>
      <p className="review__quote">{quote}</p>
    </article>
  );
};

export default Review;
