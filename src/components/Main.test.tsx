import { screen, render, within } from "@testing-library/react";
import user from "@testing-library/user-event";

import { act } from "react";

import { Main } from "./Main";

import { PEOPLE_MOCK } from "../tests/constants/constants";

jest.mock("../constants/data.ts", () => ({
  get people() {
    return PEOPLE_MOCK;
  },
}));

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<Main />);

  return {
    container: container,
  };
};

test("It must render the title of the APP, the left and right buttons. In addition to the current Review with its respective class.", () => {
  renderComponent();

  const currentReview = PEOPLE_MOCK[0];

  const titleApp = screen.getByRole("heading", { name: /reviews/i });
  const buttonLeft = screen.getByRole("button", { name: /prev review/i });
  const buttonRight = screen.getByRole("button", { name: /next review/i });

  expect(titleApp).toBeInTheDocument();
  expect(buttonLeft).toBeInTheDocument();
  expect(buttonRight).toBeInTheDocument();

  const articles = screen.getAllByRole("article");
  const reviewContainer = articles.find((article) =>
    article.classList.contains("person_container")
  );

  expect(reviewContainer).toBeInTheDocument();
  expect(reviewContainer).toHaveClass(`person_container activeSlide`);

  const imgReview = within(reviewContainer!).getByRole("img");
  const nameReview = within(reviewContainer!).getByRole("heading", {
    name: currentReview.name,
  });
  const titleReview = within(reviewContainer!).getByRole("heading", {
    name: currentReview.title,
  });
  const quoteReview = within(reviewContainer!).getByText(currentReview.quote);

  expect(imgReview).toBeInTheDocument();
  expect(imgReview).toHaveAttribute("src", currentReview.image);
  expect(imgReview).toHaveAttribute("alt", currentReview.name);
  expect(nameReview).toBeInTheDocument();
  expect(titleReview).toBeInTheDocument();
  expect(quoteReview).toBeInTheDocument();
});

test("It should render the following review when the Right button is clicked.", async () => {
  renderComponent();

  const buttonRight = screen.getByRole("button", { name: /next review/i });

  expect(buttonRight).toBeInTheDocument();

  const articles = screen.getAllByRole("article");
  const reviewContainers = articles.filter((article) =>
    article.classList.contains("person_container")
  );

  expect(reviewContainers).toHaveLength(PEOPLE_MOCK.length);

  const reviewContainerCurrent = reviewContainers[0];
  const reviewContainerNext = reviewContainers[1];

  expect(reviewContainerCurrent).toBeInTheDocument();
  expect(reviewContainerCurrent).toHaveClass(`person_container activeSlide`);

  expect(reviewContainerNext).toBeInTheDocument();
  expect(reviewContainerNext).toHaveClass(`person_container nextSlide`);

  await user.click(buttonRight);

  expect(reviewContainerCurrent).toBeInTheDocument();
  expect(reviewContainerCurrent).toHaveClass(`person_container lastSlide`);

  expect(reviewContainerNext).toBeInTheDocument();
  expect(reviewContainerNext).toHaveClass(`person_container activeSlide`);
});

test("It should render the previous review when the Left button is clicked.", async () => {
  renderComponent();

  const buttonLeft = screen.getByRole("button", { name: /prev review/i });

  expect(buttonLeft).toBeInTheDocument();

  const articles = screen.getAllByRole("article");
  const reviewContainers = articles.filter((article) =>
    article.classList.contains("person_container")
  );

  expect(reviewContainers).toHaveLength(PEOPLE_MOCK.length);

  const reviewContainerCurrent = reviewContainers[0];
  const reviewContainerPrev = reviewContainers[reviewContainers.length - 1];

  expect(reviewContainerCurrent).toBeInTheDocument();
  expect(reviewContainerCurrent).toHaveClass(`person_container activeSlide`);

  expect(reviewContainerPrev).toBeInTheDocument();
  expect(reviewContainerPrev).toHaveClass(`person_container lastSlide`);

  await user.click(buttonLeft);

  expect(reviewContainerCurrent).toBeInTheDocument();
  expect(reviewContainerCurrent).toHaveClass(`person_container nextSlide`);

  expect(reviewContainerPrev).toBeInTheDocument();
  expect(reviewContainerPrev).toHaveClass(`person_container activeSlide`);
});

test("It should render the next review after 3 seconds.", async () => {
  jest.useFakeTimers();

  renderComponent();

  const articles = screen.getAllByRole("article");
  const reviewContainers = articles.filter((article) =>
    article.classList.contains("person_container")
  );

  expect(reviewContainers).toHaveLength(PEOPLE_MOCK.length);

  const reviewContainerCurrent = reviewContainers[0];
  const reviewContainerNext = reviewContainers[1];

  expect(reviewContainerCurrent).toBeInTheDocument();
  expect(reviewContainerCurrent).toHaveClass(`person_container activeSlide`);

  expect(reviewContainerNext).toBeInTheDocument();
  expect(reviewContainerNext).toHaveClass(`person_container nextSlide`);

  act(() => {
    jest.advanceTimersByTime(3000);
  });

  expect(reviewContainerCurrent).toBeInTheDocument();
  expect(reviewContainerCurrent).toHaveClass(`person_container lastSlide`);

  expect(reviewContainerNext).toBeInTheDocument();
  expect(reviewContainerNext).toHaveClass(`person_container activeSlide`);

  jest.useRealTimers();
});
