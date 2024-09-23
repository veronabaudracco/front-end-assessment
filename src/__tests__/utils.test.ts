import {
  flipCard,
  getCardsData,
  getFlippedCards,
  resetNonMatchingCards,
  shuffle,
} from "../utils";
import { images } from "../constants";

jest.mock("../constants", () => ({
  images: [
    { src: "image1.png", alt: "Image 1" },
    { src: "image2.png", alt: "Image 2" },
    { src: "image3.png", alt: "Image 3" },
    { src: "image4.png", alt: "Image 4" },
    { src: "image5.png", alt: "Image 5" },
    { src: "image6.png", alt: "Image 6" },
  ],
}));

describe("shuffle", () => {
  it("should return an array of the same length after shuffling numbers", () => {
    const numbers = [1, 2, 3, 4, 5];
    const result = shuffle(numbers);
    expect(result).toHaveLength(numbers.length);
  });

  it("should contain the same items after shuffling numbers", () => {
    const numbers = [1, 2, 3, 4, 5];
    const result = shuffle(numbers);
    expect(result.sort()).toEqual(numbers.sort()); // Ensures the shuffled array contains the same numbers
  });

  it("should shuffle the array order of numbers", () => {
    const numbers = [1, 2, 3, 4, 5];
    const result = shuffle([...numbers]); // Use a copy of the array
    const isShuffled = result.some((num, index) => num !== numbers[index]);
    expect(isShuffled).toBe(true);
  });

  it("should return an array of the same length after shuffling strings", () => {
    const strings = ["a", "b", "c", "d", "e"];
    const result = shuffle(strings);
    expect(result).toHaveLength(strings.length);
  });

  it("should contain the same items after shuffling strings", () => {
    const strings = ["a", "b", "c", "d", "e"];
    const result = shuffle(strings);
    expect(result.sort()).toEqual(strings.sort()); // Ensures the shuffled array contains the same strings
  });

  it("should shuffle the array order of strings", () => {
    const strings = ["a", "b", "c", "d", "e"];
    const result = shuffle([...strings]); // Use a copy of the array
    const isShuffled = result.some((str, index) => str !== strings[index]);
    expect(isShuffled).toBe(true);
  });

  it("should return an array of the same length after shuffling objects", () => {
    const objects = [
      { id: 1, name: "Object 1" },
      { id: 2, name: "Object 2" },
      { id: 3, name: "Object 3" },
    ];
    const result = shuffle(objects);
    expect(result).toHaveLength(objects.length);
  });

  it("should contain the same items after shuffling objects", () => {
    const objects = [
      { id: 1, name: "Object 1" },
      { id: 2, name: "Object 2" },
      { id: 3, name: "Object 3" },
    ];
    const result = shuffle(objects);

    // Ensure all ids are present after shuffling
    const originalIds = objects.map((obj) => obj.id).sort();
    const shuffledIds = result.map((obj) => obj.id).sort();
    expect(shuffledIds).toEqual(originalIds);
  });

  it("should shuffle the array order of objects", () => {
    const objects = [
      { id: 1, name: "Object 1" },
      { id: 2, name: "Object 2" },
      { id: 3, name: "Object 3" },
    ];
    const result = shuffle([...objects]); // Use a copy of the array
    const isShuffled = result.some(
      (obj, index) => obj.id !== objects[index].id
    );
    expect(isShuffled).toBe(true);
  });
});

// Mocking the images array for testing

describe("getCardsData", () => {
  it("should return an array of MemoryCard objects", () => {
    const cards = getCardsData();

    // Expect the returned cards to be an array
    expect(Array.isArray(cards)).toBe(true);

    // Each card should have specific properties
    cards.forEach((card) => {
      expect(card).toHaveProperty("id");
      expect(card).toHaveProperty("image");
      expect(card).toHaveProperty("matched", false);
      expect(card).toHaveProperty("flipped", false);
    });
  });

  it("should return the correct number of cards", () => {
    const cards = getCardsData();

    // There should be 2 cards for each image (matched pair)
    expect(cards.length).toBe(images.length * 2);
  });

  it("should shuffle the cards", () => {
    const firstShuffle = getCardsData();
    const secondShuffle = getCardsData();

    // The arrays should not be in the same order
    expect(firstShuffle).not.toEqual(secondShuffle);
  });
});

describe("flipCard", () => {
  const cards = [
    {
      id: 1,
      image: images[0],
      matched: false,
      flipped: false,
    },
    {
      id: 2,
      image: images[1],
      matched: false,
      flipped: false,
    },
    {
      id: 3,
      image: images[2],
      matched: false,
      flipped: false,
    },
  ];

  it("should flip the card with the given id to the specified flipped state", () => {
    const updatedCards = flipCard(cards, 2, true);

    expect(updatedCards[1]).toEqual({
      id: 2,
      image: images[1],
      matched: false,
      flipped: true,
    });
  });

  it("should not change the flipped state of other cards", () => {
    const updatedCards = flipCard(cards, 2, true);

    expect(updatedCards[0]).toEqual({
      id: 1,
      image: images[0],
      matched: false,
      flipped: false,
    });
    expect(updatedCards[2]).toEqual({
      id: 3,
      image: images[2],
      matched: false,
      flipped: false,
    });
  });

  it("should return the same array if the id does not match any card", () => {
    const updatedCards = flipCard(cards, 999, true);

    expect(updatedCards).toEqual(cards);
  });

  it("should handle flipping back to false", () => {
    const updatedCards = flipCard(cards, 1, true);
    const flippedBackCards = flipCard(updatedCards, 1, false);

    expect(flippedBackCards[0]).toEqual({
      id: 1,
      image: images[0],
      matched: false,
      flipped: false,
    });
  });
});

jest.useFakeTimers();

describe("getFlippedCards", () => {
  const cards = [
    {
      id: 1,
      image: images[0],
      matched: false,
      flipped: true,
    },
    {
      id: 2,
      image: images[1],
      matched: true,
      flipped: true,
    },
    {
      id: 3,
      image: images[2],
      matched: false,
      flipped: false,
    },
    {
      id: 4,
      image: images[3],
      matched: false,
      flipped: true,
    },
    {
      id: 5,
      image: images[4],
      matched: false,
      flipped: false,
    },
  ];

  it("should return an array of flipped cards that are not matched", () => {
    const flippedCards = getFlippedCards(cards);

    expect(flippedCards).toEqual([
      {
        id: 1,
        image: images[0],
        matched: false,
        flipped: true,
      },
      {
        id: 4,
        image: images[3],
        matched: false,
        flipped: true,
      },
    ]);
  });

  it("should return an empty array if no cards are flipped and not matched", () => {
    const noFlippedCards = getFlippedCards([
      {
        id: 4,
        image: images[3],
        matched: true,
        flipped: false,
      },
      {
        id: 3,
        image: images[2],
        matched: true,
        flipped: true,
      },
    ]);

    expect(noFlippedCards).toEqual([]);
  });

  it("should return an empty array if all cards are matched", () => {
    const matchedCards = getFlippedCards([
      {
        id: 2,
        image: images[1],
        matched: true,
        flipped: true,
      },
      {
        id: 1,
        image: images[0],
        matched: true,
        flipped: false,
      },
    ]);

    expect(matchedCards).toEqual([]);
  });

  it("should handle the case of an empty array", () => {
    const emptyCards = getFlippedCards([]);

    expect(emptyCards).toEqual([]);
  });
});

jest.useFakeTimers();

describe("resetNonMatchingCards", () => {
  it("should reset non-matching cards to their original state", () => {
    const firstCard = {
      id: 1,
      image: images[0],
      matched: false,
      flipped: true,
    };
    const secondCard = {
      id: 2,
      image: images[1],
      matched: false,
      flipped: true,
    };

    const setCards = jest.fn((updateFn) => {
      const prevCards = [
        {
          id: 1,
          image: images[0],
          matched: false,
          flipped: true,
        },
        {
          id: 2,
          image: images[1],
          matched: false,
          flipped: true,
        },
        {
          id: 3,
          image: images[2],
          matched: false,
          flipped: false,
        },
      ];
      return updateFn(prevCards); // Ensure it returns the updated array
    });

    resetNonMatchingCards(firstCard, secondCard, setCards);

    jest.advanceTimersByTime(800);

    expect(setCards).toHaveBeenCalledTimes(1);

    const updatedCards = setCards.mock.calls[0][0](undefined); // Get the updated cards from the mock function
    expect(updatedCards).toEqual([
      {
        id: 1,
        image: images[0],
        matched: false,
        flipped: false,
      },
      {
        id: 2,
        image: images[1],
        matched: false,
        flipped: false,
      },
      {
        id: 3,
        image: images[2],
        matched: false,
        flipped: false,
      },
    ]);
  });

  it("should not modify cards if both cards are already non-flipped", () => {
    const firstCard = {
      id: 1,
      image: images[0],
      matched: false,
      flipped: false,
    };
    const secondCard = {
      id: 2,
      image: images[1],
      matched: false,
      flipped: false,
    };

    const setCards = jest.fn((updateFn) => {
      const prevCards = [
        {
          id: 1,
          image: images[0],
          matched: false,
          flipped: false,
        },
        {
          id: 2,
          image: images[1],
          matched: false,
          flipped: false,
        },
      ];
      return updateFn(prevCards); // Ensure it returns the updated array
    });

    resetNonMatchingCards(firstCard, secondCard, setCards);

    jest.advanceTimersByTime(800);

    expect(setCards).toHaveBeenCalledTimes(1);
    const updatedCards = setCards.mock.calls[0][0](undefined); // Get the updated cards from the mock function
    expect(updatedCards).toEqual([
      {
        id: 1,
        image: images[0],
        matched: false,
        flipped: false,
      },
      {
        id: 2,
        image: images[1],
        matched: false,
        flipped: false,
      },
    ]); // Expect no changes
  });
});
