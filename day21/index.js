const fs = require("fs");
const _ = require("lodash");
const input = fs.readFileSync(__dirname + "/input.txt").toString();

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

class Analyzer {
  listSafeIngredients(foodList) {
    const candidatesMap = new Map();
    for (const foodObject of foodList) {
      for (const allergenString of foodObject.allergies) {
        if (!candidatesMap.has(allergenString))
          candidatesMap.set(allergenString, []);
        candidatesMap.get(allergenString).push(foodObject.ingredients);
      }
    }

    const allergenSuspectsMap = new Map();
    candidatesMap.forEach((allIngredientsLists, allergenString) => {
      allergenSuspectsMap.set(
        allergenString,
        _.intersection(...allIngredientsLists)
      );
    });

    const discoveredAllergensMap = new Map();
    discoveredAllergensMap.set("allergens", new Set());
    discoveredAllergensMap.set("ingredients", new Set());
    while (
      allergenSuspectsMap.size > discoveredAllergensMap.get("allergens").size
    ) {
      allergenSuspectsMap.forEach(
        (possibleAllergenIngredientsList, allergenString) => {
          const remainingIngredientsList = possibleAllergenIngredientsList.filter(
            (s) => !discoveredAllergensMap.get("ingredients").has(s)
          );
          if (remainingIngredientsList.length === 1) {
            discoveredAllergensMap
              .get("ingredients")
              .add(remainingIngredientsList[0]);
            discoveredAllergensMap.get("allergens").add(allergenString);
          }
        }
      );
    }

    const safeIngredientsList = foodList
      .flatMap((f) => f.ingredients)
      .filter((s) => !discoveredAllergensMap.get("ingredients").has(s));

    return safeIngredientsList;
  }
}
module.exports = { Analyzer, Parser };
