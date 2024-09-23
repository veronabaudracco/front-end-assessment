import { useEffect, useState } from "react";
import "./App.css";
import { MemoryCard } from "./components/Card";
import GameBoard from "./components/GameBoard";
import Header from "./components/Header";
import { getCardsData } from "./utils";

const App = () => {
  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
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
    let interval: NodeJS.Timeout;

    // Start the timer if the game has started
    if (hasStarted) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [hasStarted]);

  useEffect(() => {
    // The user has won if all the cards are matched and the game has started
    if (hasStarted && memoryCards.every((card) => card.matched)) {
      setHasWon(true);
      setHasStarted(false);
    }
  }, [memoryCards, hasStarted]);

  const handleResetGame = () => {
    setMemoryCards(initialCards);
    setMoves(0);
    setTimer(0);
    setHasStarted(false);
    setHasWon(false);
  };

  const handleStartGame = () => {
    setHasStarted(true);
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
