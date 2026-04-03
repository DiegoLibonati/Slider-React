import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SliderPage from "@/pages/SliderPage/SliderPage";

type RenderPage = {
  container: HTMLElement;
};

const renderPage = (): RenderPage => {
  const { container } = render(<SliderPage />);
  return { container };
};

describe("SliderPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the main landmark with the correct aria-label", () => {
    renderPage();
    expect(screen.getByRole("main", { name: "Reviews slider" })).toBeInTheDocument();
  });

  it("should render the carousel region with the correct aria-label", () => {
    renderPage();
    expect(screen.getByRole("region", { name: "Reviews carousel" })).toBeInTheDocument();
  });

  it("should render the 'Previous review' button", () => {
    renderPage();
    expect(screen.getByRole("button", { name: "Previous review" })).toBeInTheDocument();
  });

  it("should render the 'Next review' button", () => {
    renderPage();
    expect(screen.getByRole("button", { name: "Next review" })).toBeInTheDocument();
  });

  it("should show the first person as the active slide on initial render", () => {
    renderPage();
    expect(screen.getByRole("group")).toHaveAttribute("aria-label", "Review by maria ferguson");
  });

  it("should show the next person after clicking 'Next review'", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: "Next review" }));

    expect(screen.getByRole("group")).toHaveAttribute("aria-label", "Review by john doe");
  });

  it("should wrap to the last person after clicking 'Previous review' from the first slide", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: "Previous review" }));

    expect(
      await screen.findByRole("group", { name: "Review by susan andersen" })
    ).toBeInTheDocument();
  });

  it("should wrap back to the first person after clicking 'Next review' past the last slide", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: "Next review" }));
    await user.click(screen.getByRole("button", { name: "Next review" }));
    await user.click(screen.getByRole("button", { name: "Next review" }));
    await user.click(screen.getByRole("button", { name: "Next review" }));

    expect(
      await screen.findByRole("group", { name: "Review by maria ferguson" })
    ).toBeInTheDocument();
  });

  it("should auto-advance to the next slide after 3 seconds", async () => {
    renderPage();

    expect(screen.getByRole("group")).toHaveAttribute("aria-label", "Review by maria ferguson");

    expect(
      await screen.findByRole("group", { name: "Review by john doe" }, { timeout: 5000 })
    ).toBeInTheDocument();
  }, 8000);
});
