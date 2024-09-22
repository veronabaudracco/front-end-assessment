import arya from "./assets/arya.png";
import cersei from "./assets/cersei.png";
import daenerys from "./assets/daenerys.png";
import jaime from "./assets/jaime.png";
import jon from "./assets/jon.png";
import sansa from "./assets/sansa.png";
import tyrion from "./assets/tyrion.png";
import walker from "./assets/walker.png";
import { MemoryCard } from "./components/Card";

export interface Image {
  src: string;
  alt: string;
}

export const images: Image[] = [
  {
    src: arya,
    alt: "Arya Stark",
  },
  {
    src: cersei,
    alt: "Cersei Lannister",
  },
  {
    src: daenerys,
    alt: "Daenerys Targaryen",
  },

  {
    src: jaime,
    alt: "Jaime Lannister",
  },
  {
    src: jon,
    alt: "Jon Snow",
  },
  {
    src: sansa,
    alt: "Sansa Stark",
  },

  {
    src: tyrion,
    alt: "Tyrion Lannister",
  },

  {
    src: walker,
    alt: "White Walker",
  },
];

const shuffle = (array: MemoryCard[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getCardsData = () => {
  const cards: MemoryCard[] = [];

  images.forEach((image) => {
    const commonProps = {
      image: {
        ...image,
      },
      matched: false,
      flipped: false,
    };

    cards.push({ id: Math.random(), ...commonProps });
    cards.push({ id: Math.random(), ...commonProps });
  });

  const shuffledCards = shuffle(cards);

  return shuffledCards;
};

export default getCardsData;
