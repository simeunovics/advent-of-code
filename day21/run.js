const fs = require("fs");
const { Parser, Analyzer } = require("./index");

(function () {
  const input = fs.readFileSync(__dirname + "/input.txt").toString();
  const food = new Parser(input).parse();

  const safeIngredientsList = new Analyzer().listSafeIngredients(food)
    .safeIngredientsList;
  const allergenIngredientsList = new Analyzer().listSafeIngredients(food)
    .allergenIngredientsList;

  const result = allergenIngredientsList
    .sort((a, b) => {
      const A = a.allergen.toUpperCase();
      const B = b.allergen.toUpperCase();
      if (A > B) {
        return 1;
      }
      if (A < B) {
        return -1;
      }
      return 0;
    })
    .map((s) => s.ingredient)
    .join(",");
  console.log({ result });
  console.log(`Answer: ${safeIngredientsList.length}`);
})();

// main();
