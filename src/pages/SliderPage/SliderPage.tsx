import { useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import type { JSX } from "react";

import Review from "@/components/Review/Review";

import persons from "@/constants/persons";

import "@/pages/SliderPage/SliderPage.css";

const SliderPage = (): JSX.Element => {
  const [person] = useState(persons);
  const [index, setIndex] = useState(0);

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

    return (): void => {
      clearInterval(interval);
    };
  }, [index]);

  return (
    <main className="main-app" aria-label="Reviews slider">
      <section className="header-app" aria-hidden="true">
        <article className="header-app__content">
          <h2 className="header-app__title">Reviews</h2>
        </article>
      </section>

      <section
        className="reviews"
        aria-label="Reviews carousel"
        aria-roledescription="carousel"
        role="region"
      >
        <button
          onClick={(e) => {
            handlePrevBtn(e);
          }}
          aria-label="Previous review"
          className="reviews__btn-prev"
        >
          <BsChevronLeft aria-hidden="true" className="reviews__btn-prev-icon" />
        </button>

        {person.map((p, pIndex) => {
          let position = "review--next-slide";

          if (pIndex === index) {
            position = "review--active-slide";
          }

          if (pIndex === index - 1 || (index === 0 && pIndex === person.length - 1)) {
            position = "review--last-slide";
          }

          return (
            <Review
              key={p.id}
              className={position}
              image={p.image}
              isActive={pIndex === index}
              name={p.name}
              quote={p.quote}
              title={p.title}
            />
          );
        })}

        <button
          onClick={(e) => {
            handleNextBtn(e);
          }}
          aria-label="Next review"
          className="reviews__btn-next"
        >
          <BsChevronRight aria-hidden="true" className="reviews__btn-next-icon" />
        </button>
      </section>
    </main>
  );
};

export default SliderPage;
