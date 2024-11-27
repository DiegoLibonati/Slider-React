import { useState, useEffect } from "react";

import { Person } from "../entities/entities";

import { Review } from "./Review.tsx";

import { people } from "../constants/data.ts";

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

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
    <main className="main_container">
      <section className="title_container">
        <article className="title_container_center">
          <h2>Reviews</h2>
        </article>
      </section>

      <section className="persons_container">
        <button onClick={(e) => handlePrevBtn(e)} aria-label="prev review">
          <BsChevronLeft id="btn"></BsChevronLeft>
        </button>

        {person.map((p, pIndex) => {
          let position = "nextSlide";

          if (pIndex === index) {
            position = "activeSlide";
          }

          if (
            pIndex === index - 1 ||
            (index === 0 && pIndex === person.length - 1)
          ) {
            position = "lastSlide";
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

        <button onClick={(e) => handleNextBtn(e)} aria-label="next review">
          <BsChevronRight id="btn"></BsChevronRight>
        </button>
      </section>
    </main>
  );
};
