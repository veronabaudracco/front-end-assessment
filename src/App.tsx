import { useEffect, useState } from "react";
import "./App.css";
import { MemoryCard } from "./components/card";
import GameBoard from "./components/gameBoard";
import Header from "./components/header";
import getCardsData from "./utils";

const App = () => {
  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  const initialCards = getCardsData().map((card) => ({
    ...card,
    flipped: false,
    matched: false,
  }));

  useEffect(() => {
    setMemoryCards(initialCards);
  }, []);

  useEffect(() => {
    let interval: number;

    if (isActive) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (isActive && memoryCards.every((card) => card.matched)) {
      setHasWon(true);
      setIsActive(false);
    }
  }, [memoryCards, isActive]);

  const handleResetGame = () => {
    setMemoryCards(initialCards);
    setMoves(0);
    setTimer(0);
    setIsActive(false);
    setHasWon(false);
  };

  const handleStartGame = () => {
    setIsActive(true);
  };

  return (
    <>
      <Header onReset={handleResetGame} />
      <GameBoard
        cards={memoryCards}
        setCards={setMemoryCards}
        moves={moves}
        setMoves={setMoves}
        timer={timer}
        handleStartGame={handleStartGame}
        hasWon={hasWon}
      />
    </>
  );
};

export default App;
