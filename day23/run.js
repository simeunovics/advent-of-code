const { Game, GameTwo } = require("./index");
const { Node, List } = require("./LinkedList");
// const game = new Game("219748365");
// game.play(100);

function testLinkedList() {
  const exampleArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const list = new List();
  exampleArray.forEach((n) => list.add(new Node(n)));

  console.log(list.toArray().join(","));
  console.log(exampleArray.join(","));
  console.log(list.findNode(3).value);

  const yanked = list.yankThree(3);
  console.log(yanked.join(","));
  console.log(list.toArray().join(","));

  list.mergeThree(3, yanked);
  console.log(list.toArray().join(","));
}

const input = 1000000;
const game = new GameTwo("219748365", input);
// console.log(game.dump());
console.time("s");
game.playMoves(input * 10);
console.timeEnd("s");
// console.log(game.dump());
console.log(game.getResult());
