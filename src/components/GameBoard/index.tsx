import Confetti from "react-confetti";
import CardGrid, { SetCards, SetMoves } from "../CardGrid";
import { useEffect, useState } from "react";
import { MemoryCard } from "../Card";
import GameStats from "../GameStats";

interface GameBoardProps {
  cards: MemoryCard[];
  setCards: SetCards;
  moves: number;
  setMoves: SetMoves;
  handleStartGame: () => void;
  timer: number;
  hasWon: boolean;
}

const GameBoard = ({
  cards,
  setCards,
  moves,
  setMoves,
  handleStartGame,
  timer,
  hasWon,
}: GameBoardProps) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <>
      {hasWon && <Confetti width={windowWidth} height={windowHeight} />}
      <GameStats moves={moves} timer={timer} hasWon={hasWon} />
      <CardGrid
        cards={cards}
        setCards={setCards}
        moves={moves}
        setMoves={setMoves}
        handleStartGame={handleStartGame}
      />
    </>
  );
};

export default GameBoard;
