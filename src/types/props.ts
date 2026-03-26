interface DefaultProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ReviewProps extends DefaultProps {
  image: string;
  name: string;
  title: string;
  quote: string;
}
