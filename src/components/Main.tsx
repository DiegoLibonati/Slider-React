import { people } from "../helpers/data.ts";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Review } from "./Review.tsx";
import { useState } from "react";
import { useEffect } from "react";
import { Person } from "../entities/entities";

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
        <button onClick={(e) => handlePrevBtn(e)}>
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

          return <Review key={one.id} {...one} className={position}></Review>;
        })}

        <button onClick={(e) => handleNextBtn(e)}>
          <BsChevronRight id="btn"></BsChevronRight>
        </button>
      </section>
    </main>
  );
};
