import { useCallback, useEffect } from "react";
import Card, { MemoryCard } from "../card";
import "./CardGrid.css";
import { flipCard, getFlippedCards, matchCards } from "../../utils";

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

      // Only allow two cards to be flipped at a time
      if (flippedCards.length === 2) return;

      setCards((prevCards) => {
        const updatedCards = flipCard(prevCards, id, true);

        const updatedFlipped = getFlippedCards(updatedCards);

        // To check for a match we need to have two flipped cards
        if (updatedFlipped.length === 2) {
          const [firstCard, secondCard] = updatedFlipped;

          const isMatch = firstCard.image.src === secondCard.image.src;

          if (isMatch) {
            // If the cards match, update the cards to be matched
            return matchCards(updatedCards, firstCard.id, secondCard.id);
          } else {
            // If the cards don't match, reset the cards to their original state
            setTimeout(() => {
              setCards((prevCards) => {
                const updatedCards = flipCard(prevCards, firstCard.id, false);
                return flipCard(updatedCards, secondCard.id, false);
              });
            }, 800);
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
