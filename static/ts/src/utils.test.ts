import { numberToColor, numberToDifficulty } from "./utils";

test("numberToDifficulty should return correct difficulty", () => {
  expect(numberToDifficulty(1)).toBe("Easy");
  expect(numberToDifficulty(2)).toBe("Intermediate");
  expect(numberToDifficulty(3)).toBe("Hard");

  // number other than 1, 2, or 3 should return undefined
  expect(numberToDifficulty(123)).toBe(undefined);
});

test("numberToDinumberToColorfficulty should return correct className", () => {
  expect(numberToColor(1)).toBe("bg-success");
  expect(numberToColor(2)).toBe("bg-warning");
  expect(numberToColor(3)).toBe("bg-danger");

  // number other than 1, 2, or 3 should return undefined
  expect(numberToColor(456)).toBe(undefined);
});
