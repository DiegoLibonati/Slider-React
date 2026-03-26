import { Person } from "@/types/app";

export const mockPersons: Person[] = [
  { id: 1, image: "img-1.jpg", name: "maria ferguson", title: "office manager", quote: "Quote 1" },
  { id: 2, image: "img-2.jpg", name: "john doe", title: "regular guy", quote: "Quote 2" },
  { id: 3, image: "img-3.jpg", name: "peter smith", title: "product designer", quote: "Quote 3" },
  { id: 4, image: "img-4.jpg", name: "susan andersen", title: "the boss", quote: "Quote 4" },
];

export const mockPerson = mockPersons[0]!;
