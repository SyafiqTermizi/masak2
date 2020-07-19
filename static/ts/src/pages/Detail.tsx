import * as React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { StateTree } from "@syafiqtermizi/masak2-store";
import { Step } from "@syafiqtermizi/masak2-store/lib/steps";
import { Media } from "@syafiqtermizi/masak2-store/lib/medias";
import { retrieveRecipe } from "@syafiqtermizi/masak2-store/lib/recipes";
import { Ingredient } from "@syafiqtermizi/masak2-store/lib/ingredients";

interface Recipe {
  id: number;
  name: string;
  description: string;
  rating: number;
  difficulty: number;
  created_by: string;
  medias: Media[];
  steps: Step[];
  groups: {
    id: number;
    name: string;
    recipe: number;
    ingredients: Ingredient[];
  }[];
}

interface PropsFromDispatch {
  retrieveRecipe: (id: number) => any;
}

interface PropsFromState {
  getRecipe: (id: string) => Recipe;
}
interface Props extends PropsFromState, PropsFromDispatch {}

export const Detail: React.FC<Props> = ({ getRecipe, retrieveRecipe }) => {
  const { id } = useParams();
  let recipe = getRecipe(id);
  if (!recipe.name) {
    retrieveRecipe(parseInt(id)).then(() => (recipe = getRecipe(id)));
  }

  return (
    <>
      <div className="row mt-5 justify-content-md-center">
        <div className="col-6">
          {recipe && recipe.medias.length > 0 && (
            <img
              src={recipe?.medias[0].media}
              alt={recipe?.name}
              width="100%"
              height="300px"
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
      </div>
      <div className="row mt-5 justify-content-md-center">
        <div className="col-6">
          <h3 data-testid="title">{recipe?.name}</h3>
          <h6 data-testid="description">{recipe?.description}</h6>
        </div>
      </div>
      <div className="row mt-5 justify-content-md-center">
        <div className="col-6">
          <ul>
            {recipe?.groups.map((group) =>
              group.ingredients.map((ingredient) => (
                <li key={ingredient.id}>
                  {ingredient.amount} {ingredient.unit} {ingredient.name}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
      <div className="row mt-5 justify-content-md-center">
        <div className="col-6">
          <ul>
            {recipe?.steps.map((step) => (
              <li key={step.id}>{step.step}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: StateTree): PropsFromState => ({
  getRecipe: (id: string) => ({
    ...state.recipe[id],
    medias: Object.values(state.media).filter(
      (media) => media.recipe === parseInt(id)
    ),
    groups: Object.values(state.group)
      .filter((group) => group.recipe === parseInt(id))
      .map((group) => ({
        ...group,
        ingredients: Object.values(state.ingredient).filter(
          (ingredient) => ingredient.group === group.id
        ),
      })),
    steps: Object.values(state.step).filter(
      (step) => step.recipe === parseInt(id)
    ),
  }),
});

const mapDispatchToProps = {
  retrieveRecipe,
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
