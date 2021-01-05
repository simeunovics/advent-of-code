const { Node, List } = require("./LinkedList");
class Game {
  cups = [];
  currentCup = null;
  destinationCup = 0;
  maxCup = 0;
  minCup = 0;
  selectedCups = [];
  constructor(input) {
    this.cups = input.split("").map((n) => Number.parseInt(n, 10));
    this.currentCup = this.cups[0];
    this.maxCup = this.cups.slice().sort().reverse()[0];
    this.minCup = this.cups.slice().sort()[0];
    this.selectedCups = [];
  }
  get currentCupIndex() {
    return this.cups.indexOf(this.currentCup);
  }
  get destinationCupIndex() {
    return this.cups.indexOf(this.destinationCup);
  }
  reBallance(pivotIndex) {
    const leftHandSideItemsList = this.cups.splice(0, pivotIndex);
    this.cups.push(...leftHandSideItemsList);
  }
  play(moves) {
    for (let i = 1; i <= moves; i++) {
      // Select Cups
      this.selectedCups = this.cups.splice(this.currentCupIndex + 1, 3);

      // Find destination cup
      this.destinationCup = this.currentCup - 1;
      while (true) {
        if (this.destinationCup < this.minCup) {
          this.destinationCup = this.maxCup;
        }
        if (!this.selectedCups.includes(this.destinationCup)) {
          break;
        }
        this.destinationCup--;
      }

      // Insert 3 cups in destination cup place
      this.reBallance(this.destinationCupIndex);
      this.cups.splice(this.destinationCupIndex + 1, 0, ...this.selectedCups);

      // Pick new current cup
      this.reBallance(this.currentCupIndex);
      this.currentCup = this.cups[this.currentCupIndex + 1];
    }
  }

  getResult() {
    const startIndex = this.cups.indexOf(1);
    const cupsCopyArray = [...this.cups];
    const leftHandSideItemsArray = cupsCopyArray.splice(0, startIndex);
    cupsCopyArray.push(...leftHandSideItemsArray);
    const [first, ...result] = cupsCopyArray;
    return result.join("");
  }
}

class GameTwo {
  list = null;
  currentCup = null;
  size = null;

  constructor(inputString, sizeNumber) {
    this.list = new List();
    this.size = sizeNumber;
    const parsedInputArray = inputString.split("").map((n) => parseInt(n));
    const inputArray = Array(sizeNumber)
      .fill(0)
      .map((_, n) => n + 1);
    inputArray.splice(0, parsedInputArray.length, ...parsedInputArray);

    inputArray.forEach((n) => this.list.add(new Node(n)));
    this.currentCup = inputArray[0];
  }

  playMoves(moves) {
    for (let i = 0; i < moves; i++) this.playMove();
  }

  playMove() {
    const threeCups = this.list.yankThree(this.currentCup);

    // Find destination cup
    let destinationCup = this.currentCup - 1;
    while (true) {
      // 1 is presumed to be min cup
      if (destinationCup < 1) destinationCup = this.size;
      if (!threeCups.includes(destinationCup)) break;
      destinationCup--;
    }
    this.list.mergeThree(destinationCup, threeCups);
    this.currentCup = this.list.findNode(this.currentCup).next.value;
  }

  dump() {
    return this.list.toArray();
  }

  getResult() {
    const cupWithNumberOne = this.list.findNode(1);
    const first = cupWithNumberOne.next;
    const second = cupWithNumberOne.next.next;

    return first.value * second.value;
  }
}

module.exports = { Game, GameTwo };
