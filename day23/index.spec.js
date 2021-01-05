const { Game, GameTwo } = require("./index");
const { Node, LinkedList } = require("./LinkedList");
describe("game loads various cups", () => {
  const cases = [
    ["1", [1], 1, 1],
    ["123", [1, 2, 3], 1, 3],
    ["389125467", [3, 8, 9, 1, 2, 5, 4, 6, 7], 3, 9],
  ];

  test.each(cases)(
    "when input is %p",
    (input, expected, currentCup, maxCup) => {
      const game = new Game(input);
      expect(game.cups).toEqual(expected);
      expect(game.currentCup).toEqual(currentCup);
      expect(game.maxCup).toEqual(maxCup);
    }
  );
});

describe("game play", () => {
  test("it can play game with example input", () => {
    const game = new Game("389125467");
    game.play(10);
    expect(game.getResult()).toBe("92658374");
  });

  test("it can play game with example input part 2", () => {
    // const game = new GameTwo("389125467");
    // game.play(10000000);
    // expect(game.getResult()).toBe("149245887792");
  });
  test("it can play game with real input", () => {
    const game = new Game("219748365");
    game.play(100);
    expect(game.getResult()).toBe("35827964");
  });

  // test("it can build linked list", () => {
  //   const exampleArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  //   const list = new LinkedList();
  //   exampleArray.forEach((n) => list.add(new Node(n)));

  //   expect(list.toArray()).toEqual(exampleArray)
  // });
});
