import arya from "./assets/arya.png";
import cersei from "./assets/cersei.png";
import daenerys from "./assets/daenerys.png";
import jaime from "./assets/jaime.png";
import jon from "./assets/jon.png";
import sansa from "./assets/sansa.png";
import tyrion from "./assets/tyrion.png";
import walker from "./assets/walker.png";
import { MemoryCard } from "./components/card";
import { SetCards } from "./components/cardGrid";

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

/**
 * Shuffle the array of cards.
 * @param array {MemoryCard[]} - Array of MemoryCard objects
 * @returns {MemoryCard[]} - Shuffled array of MemoryCard objects
 */
const shuffle = (array: MemoryCard[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

/**
 * Generate an array of MemoryCard objects.
 * @returns {MemoryCard[]} - Array of MemoryCard objects
 */
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

/**
 * Flips a card based on the id and the flipped state.
 * @param cards
 * @param id
 * @param flippedState
 * @returns MemoryCard[]
 */
const flipCard = (cards: MemoryCard[], id: number, flippedState: boolean) => {
  return cards.map((card) =>
    card.id === id ? { ...card, flipped: flippedState } : card
  );
};

/**
 * Returns the array of cards that are currently flipped and not matched.
 * @param cards
 * @returns MemoryCard[]
 */
const getFlippedCards = (cards: MemoryCard[]) => {
  return cards.filter((card) => card.flipped && !card.matched);
};

/**
 * Resets the non-matching cards to their original state.
 * @param firstCard
 * @param secondCard
 * @param setCards
 */
const resetNonMatchingCards = (
  firstCard: MemoryCard,
  secondCard: MemoryCard,
  setCards: SetCards
) => {
  setTimeout(() => {
    setCards((prevCards) => {
      const updatedCards = flipCard(prevCards, firstCard.id, false);
      return flipCard(updatedCards, secondCard.id, false);
    });
  }, 800);
};

export {
  getCardsData,
  flipCard,
  getFlippedCards,
  resetNonMatchingCards,
  shuffle,
};
