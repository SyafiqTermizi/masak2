import * as React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { StateTree } from "@syafiqtermizi/masak2-store";
import { Step } from "@syafiqtermizi/masak2-store/lib/steps";
import { Ingredient } from "@syafiqtermizi/masak2-store/lib/ingredients";
import { Media } from "@syafiqtermizi/masak2-store/lib/medias";

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

interface Props {
  getRecipe: (id: string) => Recipe;
}

const Detail: React.FC<Props> = ({ getRecipe }) => {
  const { id } = useParams();
  const recipe = getRecipe(id);

  return (
    <>
      <div className="row mt-5 justify-content-md-center">
        <div className="col-6">
          {recipe.medias.length > 0 && (
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
          <h3>{recipe?.name}</h3>
          <h6>{recipe?.description}</h6>
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

const mapStateToProps = (state: StateTree) => ({
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

export default connect(mapStateToProps)(Detail);
