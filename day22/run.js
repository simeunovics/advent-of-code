const fs = require("fs");
const { Parser, Game, Score } = require("./index");

(function () {
  const input = fs.readFileSync(__dirname + "/input.txt").toString();
  const parsedCardsObject = new Parser().parse(input);
  const game = new Game(parsedCardsObject.player1, parsedCardsObject.player2);
  const gamePlayResult = game.play();
  const score = new Score(gamePlayResult.winnerCards).calculateScore();
  console.log(`This is the score: ${score}`);
})();
