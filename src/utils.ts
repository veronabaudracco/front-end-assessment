import { MemoryCard } from "./components/Card";
import { images } from "./constants";

/**
 * Shuffle an array of any type.
 * @param array {T[]}
 * @returns {T[]}
 */
const shuffle = <T>(array: T[]): T[] => {
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
 * Marks two cards as matched based on their IDs.
 * @param cards - The array of MemoryCard objects
 * @param firstCard - The first card to mark as matched
 * @param secondCard - The second card to mark as matched
 * @returns MemoryCard[] - The updated array of MemoryCard objects
 */
const matchCards = (
  cards: MemoryCard[],
  firstCardId: MemoryCard["id"],
  secondCardId: MemoryCard["id"]
): MemoryCard[] => {
  return cards.map((card) =>
    card.id === firstCardId || card.id === secondCardId
      ? { ...card, matched: true }
      : card
  );
};
export { getCardsData, flipCard, getFlippedCards, matchCards, shuffle };
