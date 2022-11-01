# Slider-App-Page

## Getting Started

1. Clone the repository
2. Join to the correct path of the clone
3. Install node_modules with npm install
4. Use npm start to run the app page

## Description

I made a web application that simulates or tries to reproduce a section of Reviews in the form of Slider where each review will show a photo, a name, a role and a description. It will also have an automatic slide in case the user does not use the buttons, and a manual slide in case the user wants to use the next or prev buttons.

## Feel free to edit my code

From helpers/data.js we get all the reviews

```
export const people = [
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

Automatic slide with useEffect using a index state.

```
useEffect(() => {
const interval = setInterval(() => {
    setIndex(index + 1);
}, 3000);

return () => clearInterval(interval);
}, [index]);
```

Manual slide with functions using a index state.

```
const handlePrevBtn = () => {
    setIndex(index - 1);
};

const handleNextBtn = () => {
    setIndex(index + 1);
};
```

And checking with other useEffect checking that the index is always correct so that the application does not break and does not use an index that does not exist.

```
useEffect(() => {
    if (index < 0) {
        setIndex(person.length - 1);
    }

    if (index > person.length - 1) {
        setIndex(0);
    }
}, [index, person]);
```

## Technologies used

1. React JS
2. CSS3

## Galery

![Slider-App-Page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/React/Imagenes/sliderreact-0.jpg)

![Slider-App-Page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/React/Imagenes/sliderreact-1.jpg)

![Slider-App-Page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/React/Imagenes/sliderreact-2.jpg)

![Slider-App-Page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/React/Imagenes/sliderreact-3.jpg)

## Portfolio Link

`https://diegolibonati.github.io/DiegoLibonatiWeb/#/projects?q=Slider%20app%20page`

## Video
