import { screen, render, within } from "@testing-library/react";
import user from "@testing-library/user-event";

import { act } from "react";

import { Main } from "./Main";

import { mockPeople } from "../tests/jest.constants";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<Main />);

  return {
    container: container,
  };
};

jest.mock("../constants/data.ts", () => ({
  get people() {
    return mockPeople;
  },
}));

describe("Main.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the title of the APP, the left and right buttons. In addition to the current Review with its respective class.", () => {
      renderComponent();

      const currentReview = mockPeople[0];

      const titleApp = screen.getByRole("heading", { name: /reviews/i });
      const buttonLeft = screen.getByRole("button", { name: /prev review/i });
      const buttonRight = screen.getByRole("button", { name: /next review/i });

      expect(titleApp).toBeInTheDocument();
      expect(buttonLeft).toBeInTheDocument();
      expect(buttonRight).toBeInTheDocument();

      const articles = screen.getAllByRole("article");
      const reviewContainer = articles.find((article) =>
        article.classList.contains("person")
      );

      expect(reviewContainer).toBeInTheDocument();
      expect(reviewContainer).toHaveClass(`person activeSlide`);

      const imgReview = within(reviewContainer!).getByRole("img");
      const nameReview = within(reviewContainer!).getByRole("heading", {
        name: currentReview.name,
      });
      const titleReview = within(reviewContainer!).getByRole("heading", {
        name: currentReview.title,
      });
      const quoteReview = within(reviewContainer!).getByText(
        currentReview.quote
      );

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
        article.classList.contains("person")
      );

      expect(reviewContainers).toHaveLength(mockPeople.length);

      const reviewContainerCurrent = reviewContainers[0];
      const reviewContainerNext = reviewContainers[1];

      expect(reviewContainerCurrent).toBeInTheDocument();
      expect(reviewContainerCurrent).toHaveClass(`person activeSlide`);

      expect(reviewContainerNext).toBeInTheDocument();
      expect(reviewContainerNext).toHaveClass(`person nextSlide`);

      await user.click(buttonRight);

      expect(reviewContainerCurrent).toBeInTheDocument();
      expect(reviewContainerCurrent).toHaveClass(`person lastSlide`);

      expect(reviewContainerNext).toBeInTheDocument();
      expect(reviewContainerNext).toHaveClass(`person activeSlide`);
    });

    test("It should render the previous review when the Left button is clicked.", async () => {
      renderComponent();

      const buttonLeft = screen.getByRole("button", { name: /prev review/i });

      expect(buttonLeft).toBeInTheDocument();

      const articles = screen.getAllByRole("article");
      const reviewContainers = articles.filter((article) =>
        article.classList.contains("person")
      );

      expect(reviewContainers).toHaveLength(mockPeople.length);

      const reviewContainerCurrent = reviewContainers[0];
      const reviewContainerPrev = reviewContainers[reviewContainers.length - 1];

      expect(reviewContainerCurrent).toBeInTheDocument();
      expect(reviewContainerCurrent).toHaveClass(`person activeSlide`);

      expect(reviewContainerPrev).toBeInTheDocument();
      expect(reviewContainerPrev).toHaveClass(`person lastSlide`);

      await user.click(buttonLeft);

      expect(reviewContainerCurrent).toBeInTheDocument();
      expect(reviewContainerCurrent).toHaveClass(`person nextSlide`);

      expect(reviewContainerPrev).toBeInTheDocument();
      expect(reviewContainerPrev).toHaveClass(`person activeSlide`);
    });

    test("It should render the next review after 3 seconds.", async () => {
      jest.useFakeTimers();

      renderComponent();

      const articles = screen.getAllByRole("article");
      const reviewContainers = articles.filter((article) =>
        article.classList.contains("person")
      );

      expect(reviewContainers).toHaveLength(mockPeople.length);

      const reviewContainerCurrent = reviewContainers[0];
      const reviewContainerNext = reviewContainers[1];

      expect(reviewContainerCurrent).toBeInTheDocument();
      expect(reviewContainerCurrent).toHaveClass(`person activeSlide`);

      expect(reviewContainerNext).toBeInTheDocument();
      expect(reviewContainerNext).toHaveClass(`person nextSlide`);

      act(() => {
        jest.advanceTimersByTime(3000);
      });

      expect(reviewContainerCurrent).toBeInTheDocument();
      expect(reviewContainerCurrent).toHaveClass(`person lastSlide`);

      expect(reviewContainerNext).toBeInTheDocument();
      expect(reviewContainerNext).toHaveClass(`person activeSlide`);

      jest.useRealTimers();
    });
  });
});
