# Slider-App-Page

## Getting Started

1. Clone the repository
2. Join to the correct path of the clone
3. Install node_modules with npm install
4. Use npm start to run the app page

## Description

I made a web application that simulates or tries to reproduce a section of Reviews in the form of Slider where each review will show a photo, a name, a role and a description. It will also have an automatic slide in case the user does not use the buttons, and a manual slide in case the user wants to use the next or prev buttons.

## Technologies used

1. React JS
2. Typescript
3. CSS3

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/61`](https://www.diegolibonati.com.ar/#/project/61)

## Video

https://user-images.githubusercontent.com/99032604/199142956-0476af19-ec83-4a43-8621-aa69df8e65cf.mp4

## Documentation

In the `helpers/data.ts` file we are going to get all the information about the persons:

```
import { Person } from "../entities/entities";

export const people: Person[] = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959131/person-2_ipcjws.jpg",
    name: "maria ferguson",
    title: "office manager",
    quote:
      "Fingerstache umami squid, kinfolk subway tile selvage tumblr man braid viral kombucha gentrify fanny pack raclette pok pok mustache.",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg",
    name: "john doe",
    title: "regular guy",
    quote:
      "Gastropub sustainable tousled prism occupy. Viral XOXO roof party brunch actually, chambray listicle microdosing put a bird on it paleo subway tile squid umami.",
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959121/person-1_aufeoq.jpg",
    name: "peter smith",
    title: "product designer",
    quote:
      "Drinking vinegar polaroid street art echo park, actually semiotics next level butcher master cleanse hammock flexitarian ethical paleo.",
  },
  {
    id: 4,
    image:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883334/person-1_rfzshl.jpg",
    name: "susan andersen",
    title: "the boss",
    quote:
      "Marfa af yr 3 wolf moon kogi, readymade distillery asymmetrical seitan kale chips fingerstache cloud bread mustache twee messenger bag. ",
  },
];
```

In the `Main.tsx` component we are going to have a state called `person` that will contain all the information of the persons. In the `index` state we will store the position of the `person` array to show the index of that array. In `handlePrevBtn()` it will be executed when clicked and will subtract 1 to that index, in `handleNextBtn()` we will add 1 to that index. Then we have a useEffect that will check every time the `index and person` changes to see if the index we are trying to access exists. Finally there is another useEffect that works as an Automatic Slider, every 3000 seconds a value will be added to the index every time that index changes it will enter this useEffect:

```
const [person] = useState<Person[]>(people);
const [index, setIndex] = useState<number>(0);

const handlePrevBtn: React.MouseEventHandler<HTMLButtonElement> = () => {
  setIndex(index - 1);
};

const handleNextBtn: React.MouseEventHandler<HTMLButtonElement> = () => {
  setIndex(index + 1);
};

useEffect(() => {
  if (index < 0) {
    setIndex(person.length - 1);
  }

  if (index > person.length - 1) {
    setIndex(0);
  }
}, [index, person]);

useEffect(() => {
  const interval = setInterval(() => {
    setIndex(index + 1);
  }, 3000);

  return () => clearInterval(interval);
}, [index]);
```
