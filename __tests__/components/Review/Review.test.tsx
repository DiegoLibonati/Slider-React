import { render, screen } from "@testing-library/react";

import type { ReviewProps } from "@/types/props";

import Review from "@/components/Review/Review";

import { mockPerson } from "@tests/__mocks__/persons.mock";

interface RenderComponent {
  container: HTMLElement;
  props: ReviewProps;
}

const renderComponent = (overrides?: Partial<ReviewProps>): RenderComponent => {
  const props: ReviewProps = {
    image: mockPerson.image,
    name: mockPerson.name,
    title: mockPerson.title,
    quote: mockPerson.quote,
    className: "review--active-slide",
    isActive: true,
    ...overrides,
  };

  const { container } = render(<Review {...props} />);
  return { container, props };
};

describe("Review", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render an article with role='group'", () => {
    renderComponent();
    expect(screen.getByRole("group")).toBeInTheDocument();
  });

  it("should render with aria-label containing the reviewer name", () => {
    renderComponent();
    expect(screen.getByRole("group")).toHaveAttribute("aria-label", `Review by ${mockPerson.name}`);
  });

  it("should apply the base review class and the provided className", () => {
    renderComponent({ className: "review--next-slide" });
    expect(screen.getByRole("group", { hidden: true })).toHaveClass("review", "review--next-slide");
  });

  it("should set aria-hidden to false when isActive is true", () => {
    renderComponent({ isActive: true });
    expect(screen.getByRole("group")).toHaveAttribute("aria-hidden", "false");
  });

  it("should set aria-hidden to true when isActive is false", () => {
    renderComponent({ isActive: false });
    expect(screen.getByRole("group", { hidden: true })).toHaveAttribute("aria-hidden", "true");
  });

  it("should render the reviewer image with accessible alt text", () => {
    renderComponent();
    expect(screen.getByRole("img")).toHaveAttribute("alt", `Photo of ${mockPerson.name}`);
  });

  it("should render the reviewer name as an h3 heading", () => {
    renderComponent();
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(mockPerson.name);
  });

  it("should render the reviewer title as an h4 heading", () => {
    renderComponent();
    expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(mockPerson.title);
  });

  it("should render the reviewer quote", () => {
    renderComponent();
    expect(screen.getByText(mockPerson.quote)).toBeInTheDocument();
  });
});
