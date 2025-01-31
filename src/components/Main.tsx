import { useState, useEffect } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import { Person } from "../entities/entities";

import { Review } from "./Review.tsx";

import { people } from "../constants/data.ts";

export const Main = (): JSX.Element => {
  const [person] = useState<Person[]>(people);
  const [index, setIndex] = useState<number>(0);

  const handlePrevBtn: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIndex(index - 1);
  };

  const handleNextBtn: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIndex(index + 1);
  };

  useEffect(() => {
    if (index < 0) {
      setIndex(person.length - 1);
    }

    if (index > person.length - 1) {
      setIndex(0);
    }
  }, [index, person]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(index + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <main className="main-app">
      <section className="header-app">
        <article className="header-app__content">
          <h2 className="header-app__title">Reviews</h2>
        </article>
      </section>

      <section className="reviews">
        <button
          onClick={(e) => handlePrevBtn(e)}
          aria-label="prev review"
          className="reviews__btn-prev"
        >
          <BsChevronLeft
            id="btn"
            className="reviews__btn-prev-icon"
          ></BsChevronLeft>
        </button>

        {person.map((p, pIndex) => {
          let position = "review--next-slide";

          if (pIndex === index) {
            position = "review--active-slide";
          }

          if (
            pIndex === index - 1 ||
            (index === 0 && pIndex === person.length - 1)
          ) {
            position = "review--last-slide";
          }

          return (
            <Review
              key={p.id}
              className={position}
              image={p.image}
              name={p.name}
              quote={p.quote}
              title={p.title}
            ></Review>
          );
        })}

        <button
          onClick={(e) => handleNextBtn(e)}
          aria-label="next review"
          className="reviews__btn-next"
        >
          <BsChevronRight
            id="btn"
            className="reviews__btn-next-icon"
          ></BsChevronRight>
        </button>
      </section>
    </main>
  );
};
