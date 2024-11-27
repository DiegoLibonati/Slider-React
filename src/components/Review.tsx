interface ReviewProps {
  image: string;
  name: string;
  title: string;
  quote: string;
  className?: string;
}

export const Review = ({
  image,
  name,
  title,
  quote,
  className,
}: ReviewProps): JSX.Element => {
  return (
    <article className={`person_container ${className}`}>
      <img src={image} alt={name}></img>

      <h3>{name}</h3>
      <h4>{title}</h4>
      <p>{quote}</p>
    </article>
  );
};
