import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";
import type { ReviewProps } from "@/types/props";

import Review from "@/components/Review/Review";

const renderComponent = (props: Partial<ReviewProps> = {}): RenderResult => {
  const defaultProps: ReviewProps = {
    image: "test-image.jpg",
    name: "John Doe",
    title: "Software Engineer",
    quote: "A great quote here",
    className: "review--active-slide",
    isActive: true,
    ...props,
  };
  return render(<Review {...defaultProps} />);
};

describe("Review", () => {
  describe("rendering", () => {
    it("should render with the provided name", () => {
      renderComponent({ name: "Jane Smith" });
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });

    it("should render with the provided title", () => {
      renderComponent({ title: "Product Manager" });
      expect(screen.getByText("Product Manager")).toBeInTheDocument();
    });

    it("should render with the provided quote", () => {
      renderComponent({ quote: "This is my quote" });
      expect(screen.getByText("This is my quote")).toBeInTheDocument();
    });

    it("should render the image with the correct src and alt", () => {
      renderComponent({ image: "avatar.jpg", name: "Alice" });
      const img = screen.getByAltText("Photo of Alice");
      expect(img).toHaveAttribute("src", "avatar.jpg");
    });

    it("should apply the review base class and the provided className", () => {
      renderComponent({ className: "review--active-slide" });
      const article = screen.getByRole("group", { hidden: true });
      expect(article).toHaveClass("review");
      expect(article).toHaveClass("review--active-slide");
    });

    it("should render the aria-label with the person's name", () => {
      renderComponent({ name: "Bob" });
      expect(
        screen.getByRole("group", { name: "Review by Bob", hidden: true })
      ).toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("should set aria-hidden to false when isActive is true", () => {
      renderComponent({ isActive: true });
      expect(screen.getByRole("group", { hidden: true })).toHaveAttribute("aria-hidden", "false");
    });

    it("should set aria-hidden to true when isActive is false", () => {
      renderComponent({ isActive: false });
      expect(screen.getByRole("group", { hidden: true })).toHaveAttribute("aria-hidden", "true");
    });

    it("should set aria-hidden to true when isActive is not provided", () => {
      render(
        <Review
          image="test-image.jpg"
          name="John Doe"
          title="Software Engineer"
          quote="A great quote here"
          className="review--active-slide"
        />
      );
      expect(screen.getByRole("group", { hidden: true })).toHaveAttribute("aria-hidden", "true");
    });
  });
});
