const fs = require("fs");
const { Parser, Game, Score, gamePlayFnc } = require("./index");

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
    const result = new Game().play(
      parsedCardsObject.player1,
      parsedCardsObject.player2
    );

    expect(result.winnerCards).toEqual([3, 2, 10, 6, 8, 5, 9, 4, 7, 1]);
  });

  it("should be able to calculate score", () => {
    const parsedCardsObject = new Parser().parse(exampleInputString);
    const gamePlayResult = new Game().play(
      parsedCardsObject.player1,
      parsedCardsObject.player2
    );

    const score = new Score(gamePlayResult.winnerCards).calculateScore();

    expect(score).toBe(306);
  });

  it("should be able to play recursive combat", () => {
    const parsedCardsObject = new Parser().parse(exampleInputString);
    const gamePlayResult = new Game().playRecursive(
      parsedCardsObject.player1,
      parsedCardsObject.player2
    );
    expect(gamePlayResult.winnerCards).toEqual([7, 5, 6, 2, 4, 1, 10, 8, 9, 3]);
  });

  it("should be able to play on loop input", () => {
    const loopInputString = fs.readFileSync(`${__dirname}/loop.txt`).toString();
    const parsedCardsObject = new Parser().parse(loopInputString);
    const gamePlayResult = gamePlayFnc(
      parsedCardsObject.player1,
      parsedCardsObject.player2
    );
    const score = new Score(gamePlayResult.winnerCards).calculateScore();
    expect(score).toBe(105);
  });
  it("should be able to play on real input", () => {
    const realInputString = fs
      .readFileSync(`${__dirname}/input.txt`)
      .toString();
    const parsedCardsObject = new Parser().parse(realInputString);
    const gamePlayResult = new Game().playRecursive(
      parsedCardsObject.player1,
      parsedCardsObject.player2
    );
    const score = new Score(gamePlayResult.winnerCards).calculateScore();
    expect(score).toBe(31120);
  });
});
