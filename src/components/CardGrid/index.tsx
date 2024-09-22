import { useCallback, useEffect } from "react";
import Card, { MemoryCard } from "../Card";
import "./CardGrid.css";

const flipCard = (cards: MemoryCard[], id: number, flippedState: boolean) => {
  return cards.map((card) =>
    card.id === id ? { ...card, flipped: flippedState } : card
  );
};

const getFlippedCards = (cards: MemoryCard[]) => {
  return cards.filter((card) => card.flipped && !card.matched);
};

const checkMatch = (firstCard: MemoryCard, secondCard: MemoryCard) => {
  return firstCard.image.alt === secondCard.image.alt;
};

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

export type SetCards = React.Dispatch<React.SetStateAction<MemoryCard[]>>;
export type SetMoves = React.Dispatch<React.SetStateAction<number>>;

interface CardGridProps {
  cards: MemoryCard[];
  setCards: SetCards;
  moves: number;
  setMoves: SetMoves;
  handleStartGame: () => void;
}

const CardGrid = ({
  cards,
  setCards,
  moves,
  setMoves,
  handleStartGame,
}: CardGridProps) => {
  useEffect(() => {
    if (moves === 1) {
      handleStartGame();
    }
  }, [moves, handleStartGame]);

  const handleFlip = useCallback(
    (id: number) => {
      const flippedCards = getFlippedCards(cards);

      if (flippedCards.length === 2) return;

      setCards((prevCards) => {
        const updatedCards = flipCard(prevCards, id, true);
        const updatedFlipped = getFlippedCards(updatedCards);

        if (updatedFlipped.length === 2) {
          const [firstCard, secondCard] = updatedFlipped;

          if (checkMatch(firstCard, secondCard)) {
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

      setMoves((prevMoves) => prevMoves + 1);
    },
    [cards, setCards, setMoves]
  );

  return (
    <div className="card-grid">
      {cards.map((card) => (
        <Card
          key={card.id}
          {...card}
          onClick={() => handleFlip(card.id)}
          isFlipped={card.flipped}
          isMatched={card.matched}
        />
      ))}
    </div>
  );
};

export default CardGrid;
