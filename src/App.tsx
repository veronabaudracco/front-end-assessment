import { useEffect, useState } from "react";
import "./App.css";
import CardGrid from "./components/CardGrid/CardGrid";
import Header from "./components/Header";
import { MemoryCard } from "./components/Card";
import getCardsData from "./utils";

const App = () => {
  const [cards, setCards] = useState<MemoryCard[]>([]);

  const initialCards = getCardsData().map((card) => ({
    ...card,
    flipped: false,
    matched: false,
  }));

  useEffect(() => {
    setCards(initialCards);
  }, []);

  const handleResetGame = () => {
    setCards(initialCards);
  };

  return (
    <>
      <Header onReset={handleResetGame} />
      <CardGrid cards={cards} setCards={setCards} />
    </>
  );
};

export default App;
