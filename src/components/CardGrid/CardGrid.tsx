import { useCallback } from "react";
import Card, { MemoryCard } from "../Card";
import "./CardGrid.css";

interface CardGridProps {
  cards: MemoryCard[];
  setCards: React.Dispatch<React.SetStateAction<MemoryCard[]>>;
}

const flipCard = (cards: MemoryCard[], id: number, flippedState: boolean) => {
  return cards.map((card) =>
    card.id === id ? { ...card, flipped: flippedState } : card
  );
};

const getFlippedCards = (cards: MemoryCard[]) => {
  return cards.filter((card) => card.flipped && !card.matched);
};

const checkForMatch = (firstCard: MemoryCard, secondCard: MemoryCard) => {
  return firstCard.image.alt === secondCard.image.alt;
};

const resetNonMatchingCards = (
  firstCard: MemoryCard,
  secondCard: MemoryCard,
  setCards: React.Dispatch<React.SetStateAction<MemoryCard[]>>
) => {
  setTimeout(() => {
    setCards((prevCards) => {
      const updatedCards = flipCard(prevCards, firstCard.id, false);
      return flipCard(updatedCards, secondCard.id, false);
    });
  }, 800);
};

const CardGrid = ({ cards, setCards }: CardGridProps) => {
  const handleFlip = useCallback(
    (id: number) => {
      const flippedCards = getFlippedCards(cards);

      if (flippedCards.length === 2) return;

      setCards((prevCards) => {
        const updatedCards = flipCard(prevCards, id, true);

        const updatedFlipped = getFlippedCards(updatedCards);

        if (updatedFlipped.length === 2) {
          const [firstCard, secondCard] = updatedFlipped;

          if (checkForMatch(firstCard, secondCard)) {
            return updatedCards.map((card) =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, matched: true }
                : card
            );
          } else {
            resetNonMatchingCards(firstCard, secondCard, setCards);
          }
        }

        return updatedCards;
      });
    },
    [cards, setCards]
  );

  return (
    <div className="card-grid">
      {cards.map((card) => (
        <Card
          key={card.id}
          {...card}
          onClick={() => handleFlip(card.id)}
          isFlipped={card.flipped}
        />
      ))}
    </div>
  );
};

export default CardGrid;
