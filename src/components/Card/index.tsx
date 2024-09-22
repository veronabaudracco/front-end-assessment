import "./Card.css";
import got from "../../assets/got.png";
import { Image } from "../../utils";

export interface MemoryCard {
  id: number;
  image: Image;
  flipped: boolean;
  matched: boolean;
}

interface CardProps extends MemoryCard {
  isFlipped: boolean;
  onClick: (id: number) => void;
}

const Card = (props: CardProps) => {
  const { id, image, isFlipped, onClick } = props;

  return (
    <div
      className={`card ${isFlipped ? "flipped" : ""}`}
      onClick={() => onClick(id)}
    >
      <div className="card-inner">
        <div className="card-front">
          <img src={got} alt={image.alt} className="card-image" />
        </div>
        <div className="card-back">
          <img src={image.src} alt="back" className="card-image" />
        </div>
      </div>
    </div>
  );
};

export default Card;
