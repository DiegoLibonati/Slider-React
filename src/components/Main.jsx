import React from "react";
import { people } from "../helpers/data.js";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Review } from "./Review.jsx";
import { useState } from "react";
import { useEffect } from "react";

export const Main = () => {
  const [person] = useState(people);
  const [index, setIndex] = useState(0);

  const handlePrevBtn = () => {
    setIndex(index - 1);
  };

  const handleNextBtn = () => {
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
    <>
      <main className="main_container">
        <section className="title_container">
          <article className="title_container_center">
            <h2>Reviews</h2>
          </article>
        </section>

        <section className="persons_container">
          <button onClick={() => handlePrevBtn()}>
            <BsChevronLeft id="btn"></BsChevronLeft>
          </button>

          {person.map((one, oneIndex) => {
            let position = "person_container nextSlide";

            if (oneIndex === index) {
              position = "person_container activeSlide";
            }

            if (
              oneIndex === index - 1 ||
              (index === 0 && oneIndex === person.length - 1)
            ) {
              position = "person_container lastSlide";
            }

            return <Review key={one.id} {...one} clas={position}></Review>;
          })}

          <button onClick={() => handleNextBtn()}>
            <BsChevronRight id="btn"></BsChevronRight>
          </button>
        </section>
      </main>
    </>
  );
};
