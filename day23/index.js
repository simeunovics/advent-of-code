class Game {
  cups = null;
  currentCup = null;
  constructor(input) {
    this.cups = input.split("").map((n) => Number.parseInt(n, 10));
    this.currentCup = this.cups[0];
  }
  playMove() {
    return 0;
  }

  // get cups() {
  //   return [];
  // }

  // get currentCup() {
  //   return 0;
  // }
}

module.exports = { Game };
