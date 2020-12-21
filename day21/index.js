const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();

class Parser {
  constructor(inputString) {
    this.inputString = inputString;
  }
  parse() {
    const foods = this.inputString
      .trim()
      .split("\n")
      .map((s) => s.trim());

    const foodList = foods.map((food) => {
      const [ingredients, allergies] = food.split("(");
      const parsedAllergies = allergies
        .trim()
        .replace("contains", "")
        .replace(")", "")
        .split(", ")
        .map((s) => s.trim());
      const parsedIngredients = ingredients
        .trim()
        .split(" ")
        .map((s) => s.trim());
      return { ingredients: parsedIngredients, allergies: parsedAllergies };
    });

    return foodList;
  }
}

class Analyzer {}
module.exports.Parser = Parser;
