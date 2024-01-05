// ##### TYPES #####
export type Person = {
  id: number;
  image: string;
  name: string;
  title: string;
  quote: string;
};

// ##### INTERFACES #####
export interface ReviewProps {
  image: string;
  name: string;
  title: string;
  quote: string;
  className: string;
}
