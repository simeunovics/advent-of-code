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
  constructor(player1CardsList, player2CardsList) {
    this.player1CardsList = player1CardsList;
    this.player2CardsList = player2CardsList;
  }

  play() {
    const player1Cards = [...this.player1CardsList];
    const player2Cards = [...this.player2CardsList];
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
