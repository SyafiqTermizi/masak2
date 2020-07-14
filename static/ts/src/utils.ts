export const textToIngredient = (text: string) => {
  const ingredientArray = text.split("\n");
  const ingredients = ingredientArray.map((ingredient) => ({
    name: ingredient,
    unit: "",
    amount: "",
    note: "",
  }));
  return JSON.stringify(ingredients);
};

export const textToStep = (text: string) => {
  const stepArray = text.split("\n");
  const steps = stepArray.map((step) => ({
    step,
  }));
  return JSON.stringify(steps);
};
