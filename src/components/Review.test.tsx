import { screen, render } from "@testing-library/react";

import { Review } from "./Review";

type RenderComponent = {
  props: {
    image: string;
    name: string;
    title: string;
    quote: string;
    className?: string;
  };
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props = {
    image: "image.png",
    name: "name123",
    title: "title123",
    quote: "quote123",
    className: "wep",
  };

  const { container } = render(
    <Review
      image={props.image}
      name={props.name}
      quote={props.quote}
      title={props.title}
      className={props.className}
    />
  );

  return {
    container: container,
    props: props,
  };
};

test("It must render the component with the entered props.", () => {
  const { props } = renderComponent();

  const article = screen.getByRole("article");
  const img = screen.getByRole("img");
  const headingName = screen.getByRole("heading", { name: props.name });
  const headingTitle = screen.getByRole("heading", { name: props.title });
  const quote = screen.getByText(props.quote);

  expect(article).toBeInTheDocument();
  expect(article).toHaveClass(`person_container ${props.className}`);
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute("src", props.image);
  expect(img).toHaveAttribute("alt", props.name);
  expect(headingName).toBeInTheDocument();
  expect(headingTitle).toBeInTheDocument();
  expect(quote).toBeInTheDocument();
});
