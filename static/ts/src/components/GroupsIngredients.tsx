import * as React from "react";

import { Ingredient } from "@syafiqtermizi/masak2-store/lib/ingredients";

interface Group {
  id: number;
  name: string;
  recipe: number;
  ingredients: Ingredient[];
}

interface Props {
  groups: Group[];
  toggleIngredient: (id: number) => void;
}

export const GroupsIngredients: React.FC<Props> = ({
  groups,
  toggleIngredient,
}) => {
  return (
    <div className="row mt-3 justify-content-md-center detail-list">
      <div className="col-md-8 col-sm-12">
        <h4>Ingredients</h4>
        <ul>
          {groups.map((group) =>
            group.ingredients.map((ingredient) => (
              <li
                data-testid="ingredient"
                className={ingredient.isDone ? "ingredient-done" : ""}
                key={ingredient.id}
                onClick={() => toggleIngredient(ingredient.id)}
              >
                {ingredient.amount} {ingredient.unit} {ingredient.name}
              </li>
            ))
          )}
        </ul>
        <hr />
      </div>
    </div>
  );
};
