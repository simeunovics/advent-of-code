const { Parser } = require("./index");
const fs = require("fs");
describe("main test case", () => {
  const exampleString = fs.readFileSync("./example.txt").toString();

  it("should be able to parse file", () => {
    const exampleString = fs.readFileSync("./example.txt").toString();

    const foods = new Parser(exampleString).parse();

    expect(foods.length).toBe(4);
    expect(foods[0].ingredients).toEqual(["mxmxvkd", "kfcds", "sqjhc", "nhms"]);
    expect(foods[1].ingredients).toEqual(["trh", "fvjkl", "sbzzf", "mxmxvkd"]);
    expect(foods[2].ingredients).toEqual(["sqjhc", "fvjkl"]);
    expect(foods[3].ingredients).toEqual(["sqjhc", "mxmxvkd", "sbzzf"]);
  });
  it("should be able to analyze food", () => {
    const food = new Parser(exampleString).parse();

    const safeIngredientsList = new Analyzer().listSafeIngreedians(food);
    except(safeIngredientsList).to;
  });
});
