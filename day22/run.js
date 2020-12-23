const fs = require("fs");
const { Parser, Game, Score } = require("./index");

(function () {
  const input = fs.readFileSync(__dirname + "/input.txt").toString();
  // const input = fs.readFileSync(__dirname + "/example.txt").toString();
  const parsedCardsObject = new Parser().parse(input);
  const gamePlayResult = new Game().playRecursive(
    parsedCardsObject.player1,
    parsedCardsObject.player2
  );
  console.log({ gamePlayResult });
  const score = new Score(gamePlayResult.winnerCards).calculateScore();
  console.log(`This is the score: ${score}`);
})();
