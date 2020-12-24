const { Game } = require("./index");
describe("game loads various cups", () => {
  const cases = [
    ["1", [1], 1],
    ["123", [1, 2, 3], 1],
    ["389125467", [3, 8, 9, 1, 2, 5, 4, 6, 7], 3],
  ];

  test.each(cases)("when input is %p", (input, expected, currentCup) => {
    const game = new Game(input);
    expect(game.cups).toEqual(expected);
    expect(game.currentCup).toEqual(currentCup);
  });
});
