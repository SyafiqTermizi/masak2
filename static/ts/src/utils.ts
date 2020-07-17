export const textToIngredient = (text: string) => {
  const ingredientArray = text.split("\n");
  const ingredients = ingredientArray.map((ingredient) => ({
    name: ingredient,
    amount: "",
    note: "",
  }));
  return JSON.stringify([
    {
      name: "",
      ingredients: ingredients,
    },
  ]);
};

export const textToStep = (text: string) => {
  const stepArray = text.split("\n");
  const steps = stepArray.map((step) => ({
    step,
  }));
  return JSON.stringify(steps);
};
