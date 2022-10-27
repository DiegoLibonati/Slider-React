import React from "react";

export const Review = ({ image, name, title, quote, clas }) => {
  return (
    <article className={clas}>
      <img src={image} alt={name}></img>

      <h3>{name}</h3>
      <h4>{title}</h4>
      <p>{quote}</p>
    </article>
  );
};
