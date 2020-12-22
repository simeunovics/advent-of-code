const fs = require("fs");
const { Parser, Game, Score } = require("./index");

describe("day22 Test Case", () => {
  const exampleInputString = fs
    .readFileSync(`${__dirname}/example.txt`)
    .toString();

  it("should be able to parse cards", () => {
    const parsedCardsObject = new Parser().parse(exampleInputString);

    expect(parsedCardsObject.player1).toEqual([9, 2, 6, 3, 1]);
    expect(parsedCardsObject.player2).toEqual([5, 8, 4, 7, 10]);
  });

  it("should be able to play the game", () => {
    const parsedCardsObject = new Parser().parse(exampleInputString);
    const game = new Game(parsedCardsObject.player1, parsedCardsObject.player2);
    const result = game.play();

    expect(result.winnerCards).toEqual([3, 2, 10, 6, 8, 5, 9, 4, 7, 1]);
  });

  it("should be able to calculate score", () => {
    const parsedCardsObject = new Parser().parse(exampleInputString);
    const game = new Game(parsedCardsObject.player1, parsedCardsObject.player2);
    const gamePlayResult = game.play();

    const score = new Score(gamePlayResult.winnerCards).calculateScore();

    expect(score).toBe(306);
  });
});
