import * as React from "react";
import { connect } from "react-redux";
import { StateTree } from "@syafiqtermizi/masak2-store";
import {
  Ingredient,
  toggleIngredient,
} from "@syafiqtermizi/masak2-store/lib/ingredients";

import { GroupsIngredients } from "../components/GroupsIngredients";

interface GroupIngredient {
  id: number;
  name: string;
  recipe: number;
  ingredients: Ingredient[];
}

interface PropFromState {
  getGroups: (recipeId: number) => GroupIngredient[];
}

interface PropsFormDispatch {
  toggleIngredient: (ingredientId: number) => void;
}

interface PropFromParent {
  recipeId: number;
}

interface Props extends PropFromState, PropsFormDispatch, PropFromParent {}

export const IngredientContainer: React.FC<Props> = ({
  getGroups,
  recipeId,
  toggleIngredient,
}) => {
  const groups = getGroups(recipeId);
  return (
    <GroupsIngredients groups={groups} toggleIngredient={toggleIngredient} />
  );
};

const mapStateToProps = (state: StateTree) => ({
  getGroups: (recipeId: number) =>
    Object.values(state.group)
      .filter((group) => group.recipe === recipeId)
      .map((group) => ({
        ...group,
        ingredients: Object.values(state.ingredient).filter(
          (ingredient) => ingredient.group === group.id
        ),
      })),
});

const mapDispatchToProps = {
  toggleIngredient,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IngredientContainer);
