const _ = require("lodash");
class Parser {
  parse(inputString) {
    const [list1, list2] = inputString.trim().split("\n\n");
    const player1Cards = list1
      .trim()
      .split("\n")
      .filter((s) => !Number.isNaN(Number.parseInt(s, 10)))
      .map((s) => Number.parseInt(s, 10));
    const player2Cards = list2
      .trim()
      .split("\n")
      .filter((s) => !Number.isNaN(Number.parseInt(s, 10)))
      .map((s) => Number.parseInt(s, 10));

    return {
      player1: player1Cards,
      player2: player2Cards,
    };
  }
}

class Game {
  createHashKey(player1Cards, player2Cards) {
    return player1Cards.join(",") + "/" + player2Cards.join(",");
  }

  playRecursive(player1CardsList, player2CardsList, game = 1) {
    const player1Cards = player1CardsList;
    const player2Cards = player2CardsList;
    const rounds = new Set();
    let round = 0;

    while (true) {
      round++;
      // Before game starts if there was exactly the same game before player 1 wins
      const key = this.createHashKey(player1Cards, player2Cards);
      if (rounds.has(key)) {
        // console.log(`Short-curcit win: Game: ${game} Round: ${round}`);
        return {
          winner: "PLAYER1",
          player1Cards,
          player2Cards,
          winnerCards: [...player1Cards],
        };
      }
      rounds.add(key);

      game === 1 &&
        console.log(
          `Game: ${game}: Round: ${round}\n\t Player 1: ${player1Cards.join(
            ","
          )} \n\t Player 2: ${player2Cards.join(",")}`
        );
      if (player1Cards.length === 0 || player2Cards.length === 0) {
        // console.log(`WON: Game: ${game} Round: ${round}`);
        return {
          winner: player2Cards.length ? "PLAYER2" : "PLAYER1",
          winnerCards: [...(player2Cards.length ? player2Cards : player1Cards)],
          player1Cards,
          player2Cards,
          game,
          round,
        };
      }

      // winner keeps both cards
      // winners card is above looser card
      const player1Draw = player1Cards.shift();
      const player2Draw = player2Cards.shift();
      game === 1 &&
        console.log(
          `Game: ${game}: Round: ${round}\n\t Player 1: ${player1Draw} \n\t Player 2: ${player2Draw}`
        );

      /**
       * If both players have at least as many cards remaining in their deck
       * as the value of the card they just drew, the winner of the round
       * is determined by playing a new game of Recursive Combat.
       */
      // if (
      //   player1Draw <= player1Cards.length &&
      //   player2Draw <= player2Cards.length
      // ) {
      if (
        player1Cards.length >= player1Draw &&
        player2Cards.length >= player2Draw
      ) {
        game === 1 && console.log("Entering recursion");
        const winner = new Game().playRecursive(
          [...player1Cards.slice(0, player1Draw)],
          [...player2Cards.slice(0, player2Draw)],
          ++game
        );
        game === 1 && console.log("Done wih recursion");
        // const winner = this.playRecursive(

        // );
        // check who won that sub-game
        const isPlayer1SubGameWinner = winner.winner === "PLAYER1";
        if (isPlayer1SubGameWinner) {
          // player 1 is winner
          player1Cards.push(player1Draw, player2Draw);
        } else {
          // Player 2 is winner
          player2Cards.push(player2Draw, player1Draw);
        }
      } else {
        if (player1Draw > player2Draw) {
          // player 1 is winner
          player1Cards.push(player1Draw, player2Draw);
        } else {
          // Player 2 is winner
          player2Cards.push(player2Draw, player1Draw);
        }
      }
    }
  }

  play(player1Cards, player2Cards) {
    const rounds = [];

    while (player1Cards.length > 0 && player2Cards.length > 0) {
      // winner keeps both cards
      // winners card is above looser card
      const player1Draw = player1Cards.shift();
      const player2Draw = player2Cards.shift();
      if (player1Draw > player2Draw) {
        // player 1 is winner
        player1Cards.push(player1Draw);
        player1Cards.push(player2Draw);
      } else {
        // Player 2 is winner
        player2Cards.push(player2Draw);
        player2Cards.push(player1Draw);
      }
      rounds.push({
        player1Cards,
        player2Cards,
      });
    }

    return {
      player1Cards,
      player2Cards,
      rounds,
      winnerCards: player1Cards.length === 0 ? player2Cards : player1Cards,
    };
  }
}

class Score {
  constructor(winnerCards) {
    this.winnerCards = winnerCards;
  }

  calculateScore() {
    let sum = 0;
    const totalNumberOfCards = this.winnerCards.length;
    for (let i = totalNumberOfCards; i > 0; i--) {
      const card = this.winnerCards[totalNumberOfCards - i];
      sum += card * i;
    }

    return sum;
  }
}

module.exports = {
  Parser,
  Game,
  Score,
};
