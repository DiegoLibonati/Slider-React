import { ReviewProps } from "../entities/entities";

export const Review = ({
  image,
  name,
  title,
  quote,
  className,
}: ReviewProps): JSX.Element => {
  return (
    <article className={className}>
      <img src={image} alt={name}></img>

      <h3>{name}</h3>
      <h4>{title}</h4>
      <p>{quote}</p>
    </article>
  );
};
