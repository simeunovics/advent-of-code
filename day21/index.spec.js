const { Parser, Analyzer } = require("./index");
const fs = require("fs");
describe("main test case", () => {
  const exampleString = fs.readFileSync(__dirname + "/example.txt").toString();

  it("should be able to parse file", () => {
    const foods = new Parser(exampleString).parse();

    expect(foods.length).toBe(4);
    expect(foods[0].ingredients).toEqual(["mxmxvkd", "kfcds", "sqjhc", "nhms"]);
    expect(foods[0].allergies).toEqual(["dairy", "fish"]);

    expect(foods[1].ingredients).toEqual(["trh", "fvjkl", "sbzzf", "mxmxvkd"]);
    expect(foods[1].allergies).toEqual(["dairy"]);

    expect(foods[2].ingredients).toEqual(["sqjhc", "fvjkl"]);
    expect(foods[2].allergies).toEqual(["soy"]);

    expect(foods[3].ingredients).toEqual(["sqjhc", "mxmxvkd", "sbzzf"]);
    expect(foods[3].allergies).toEqual(["fish"]);
  });
  it("should be able to analyze food", () => {
    const food = new Parser(exampleString).parse();

    const safeIngredientsList = new Analyzer().listSafeIngredients(food);
    expect(safeIngredientsList.filter((s) => s === "kfcds").length).toBe(1);
    expect(safeIngredientsList.filter((s) => s === "nhms").length).toBe(1);
    expect(safeIngredientsList.filter((s) => s === "sbzzf").length).toBe(2);
    expect(safeIngredientsList.filter((s) => s === "trh").length).toBe(1);
  });
});
