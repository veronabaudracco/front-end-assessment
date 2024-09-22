import "./stats.css";

interface StatProps {
  title: string;
  value: number;
}

const Stat = ({ title, value }: StatProps) => {
  return (
    <div className="container">
      <h2 className="detail">{title}:</h2>
      <p>{value}</p>
    </div>
  );
};

interface GameStatsProps {
  moves: number;
  timer: number;
  hasWon: boolean;
}

const GameStats = ({ moves, timer, hasWon }: GameStatsProps) => {
  return (
    <div className="container">
      {hasWon && (
        <div className="win-message">Congratulations! You've won!</div>
      )}
      <Stat title="Moves" value={moves} />
      <Stat title="Timer" value={timer} />
    </div>
  );
};

export default GameStats;
