import arya from "./assets/arya.png";
import cersei from "./assets/cersei.png";
import daenerys from "./assets/daenerys.png";
import jaime from "./assets/jaime.png";
import jon from "./assets/jon.png";
import sansa from "./assets/sansa.png";
import tyrion from "./assets/tyrion.png";
import walker from "./assets/walker.png";

export interface Image {
  src: string;
  alt: string;
}

export const images: Image[] = [
  {
    src: arya,
    alt: "Arya Stark",
  },
  {
    src: cersei,
    alt: "Cersei Lannister",
  },
  {
    src: daenerys,
    alt: "Daenerys Targaryen",
  },

  {
    src: jaime,
    alt: "Jaime Lannister",
  },
  {
    src: jon,
    alt: "Jon Snow",
  },
  {
    src: sansa,
    alt: "Sansa Stark",
  },

  {
    src: tyrion,
    alt: "Tyrion Lannister",
  },

  {
    src: walker,
    alt: "White Walker",
  },
];
