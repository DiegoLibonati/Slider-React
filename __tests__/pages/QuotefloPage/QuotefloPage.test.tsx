import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";

import QuotefloPage from "@/pages/QuotefloPage/QuotefloPage";

import { mockPersons } from "@tests/__mocks__/persons.mock";

jest.mock("@/constants/persons", () => {
  const mockData = jest.requireActual("@tests/__mocks__/persons.mock");
  const { mockPersons: data } = mockData as { mockPersons: typeof mockPersons };
  return {
    __esModule: true,
    default: data,
  };
});

const renderPage = (): RenderResult => render(<QuotefloPage />);

const getReviewByName = (name: string): HTMLElement => {
  const review = screen
    .getAllByRole("group", { hidden: true })
    .find((el) => el.getAttribute("aria-label") === `Review by ${name}`);
  if (!review) throw new Error(`Review by ${name} not found`);
  return review;
};

describe("QuotefloPage", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("rendering", () => {
    it("should render the reviews carousel region", () => {
      renderPage();
      expect(screen.getByRole("region", { name: "Reviews carousel" })).toBeInTheDocument();
    });

    it("should render the previous review button", () => {
      renderPage();
      expect(screen.getByRole("button", { name: "Previous review" })).toBeInTheDocument();
    });

    it("should render the next review button", () => {
      renderPage();
      expect(screen.getByRole("button", { name: "Next review" })).toBeInTheDocument();
    });

    it("should render all reviews", () => {
      renderPage();
      expect(screen.getAllByRole("group", { hidden: true })).toHaveLength(mockPersons.length);
    });

    it("should render the first review as active by default", () => {
      renderPage();
      expect(
        screen.getByRole("group", {
          name: `Review by ${mockPersons[0]!.name}`,
          hidden: true,
        })
      ).toHaveAttribute("aria-hidden", "false");
    });

    it("should render other reviews as inactive by default", () => {
      renderPage();
      expect(getReviewByName(mockPersons[1]!.name)).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("behavior", () => {
    it("should navigate to the next review when the next button is clicked", async () => {
      const user = userEvent.setup({
        advanceTimers: jest.advanceTimersByTime,
      });
      renderPage();

      await user.click(screen.getByRole("button", { name: "Next review" }));

      expect(
        screen.getByRole("group", {
          name: `Review by ${mockPersons[1]!.name}`,
          hidden: true,
        })
      ).toHaveAttribute("aria-hidden", "false");
    });

    it("should navigate back to the previous review when the previous button is clicked", async () => {
      const user = userEvent.setup({
        advanceTimers: jest.advanceTimersByTime,
      });
      renderPage();

      await user.click(screen.getByRole("button", { name: "Next review" }));
      await user.click(screen.getByRole("button", { name: "Previous review" }));

      expect(
        screen.getByRole("group", {
          name: `Review by ${mockPersons[0]!.name}`,
          hidden: true,
        })
      ).toHaveAttribute("aria-hidden", "false");
    });

    it("should wrap to the last review when clicking previous on the first review", async () => {
      const user = userEvent.setup({
        advanceTimers: jest.advanceTimersByTime,
      });
      renderPage();

      await user.click(screen.getByRole("button", { name: "Previous review" }));

      const lastPerson = mockPersons[mockPersons.length - 1]!;
      await waitFor(() => {
        expect(
          screen.getByRole("group", {
            name: `Review by ${lastPerson.name}`,
            hidden: true,
          })
        ).toHaveAttribute("aria-hidden", "false");
      });
    });

    it("should wrap to the first review when clicking next on the last review", async () => {
      const user = userEvent.setup({
        advanceTimers: jest.advanceTimersByTime,
      });
      renderPage();

      for (const _ of mockPersons) {
        await user.click(screen.getByRole("button", { name: "Next review" }));
      }

      await waitFor(() => {
        expect(
          screen.getByRole("group", {
            name: `Review by ${mockPersons[0]!.name}`,
            hidden: true,
          })
        ).toHaveAttribute("aria-hidden", "false");
      });
    });

    it("should auto-advance to the next review after 3 seconds", () => {
      renderPage();

      act(() => {
        jest.advanceTimersByTime(3000);
      });

      expect(
        screen.getByRole("group", {
          name: `Review by ${mockPersons[1]!.name}`,
          hidden: true,
        })
      ).toHaveAttribute("aria-hidden", "false");
    });

    it("should apply the active-slide class to the current review", () => {
      renderPage();
      const activeReview = screen.getByRole("group", {
        name: `Review by ${mockPersons[0]!.name}`,
        hidden: true,
      });
      expect(activeReview).toHaveClass("review--active-slide");
    });

    it("should apply the last-slide class to the previous review", async () => {
      const user = userEvent.setup({
        advanceTimers: jest.advanceTimersByTime,
      });
      renderPage();

      await user.click(screen.getByRole("button", { name: "Next review" }));

      expect(getReviewByName(mockPersons[0]!.name)).toHaveClass("review--last-slide");
    });
  });
});
