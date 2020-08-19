export const textToIngredient = (text: string) => {
  const ingredientArray = text.split("\n");
  const ingredients = ingredientArray.map((ingredient) => ({
    name: ingredient,
    amount: "",
    note: "",
  }));
  return [
    {
      name: "",
      ingredients: ingredients,
    },
  ];
};

export const textToStep = (text: string) => {
  const stepArray = text.split("\n");
  const steps = stepArray.map((step) => ({
    step,
  }));
  return steps;
};

export const numberToDifficulty = (num: number): string => {
  const rate: { [idx: string]: string } = {
    "1": "Easy",
    "2": "Intermediate",
    "3": "Hard",
  };
  return rate[num.toString()];
};

export const numberToColor = (num: number): string => {
  const rate: { [idx: string]: string } = {
    "1": "bg-success",
    "2": "bg-warning",
    "3": "bg-danger",
  };
  return rate[num.toString()];
};
