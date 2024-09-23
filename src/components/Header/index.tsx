import "./header.css";

interface HeaderProps {
  onReset: () => void;
}

const Header = ({ onReset }: HeaderProps) => {
  return (
    <header className="header">
      <div className="logo">
        <h1>Match of Thrones</h1>
      </div>
      <button className="reset-button" onClick={onReset}>
        Reset Game
      </button>
    </header>
  );
};

export default Header;
