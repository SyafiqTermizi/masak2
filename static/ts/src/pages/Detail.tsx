import * as React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { StateTree } from "@syafiqtermizi/masak2-store";
import { StepState } from "@syafiqtermizi/masak2-store/lib/steps";
import { MediaState } from "@syafiqtermizi/masak2-store/lib/medias";
import { GroupState } from "@syafiqtermizi/masak2-store/lib/groups";
import { RecipeState } from "@syafiqtermizi/masak2-store/lib/recipes";
import { IngredientState } from "@syafiqtermizi/masak2-store/lib/ingredients";

interface Props {
  recipes: RecipeState;
  medias: MediaState;
  groups: GroupState;
  ingredients: IngredientState;
  steps: StepState;
}

const Detail: React.FC<Props> = ({
  recipes,
  medias,
  groups,
  ingredients,
  steps,
}) => {
  const { id } = useParams();
  const localRecipes = recipes[id];
  const localMedias = Object.values(medias).filter(
    (media) => media.recipe === parseInt(id)
  );

  const localGroups = Object.values(groups).filter(
    (group) => group.recipe === parseInt(id)
  );

  const localGroupsIngredient = localGroups.map((group) => ({
    ...group,
    ingredients: Object.values(ingredients).filter(
      (ingredient) => ingredient.group === group.id
    ),
  }));

  const localSteps = Object.values(steps).filter(
    (step) => step.recipe === parseInt(id)
  );

  const recipe = {
    ...localRecipes,
    medias: localMedias,
    groups: localGroupsIngredient,
    steps: localSteps,
  };

  return (
    <>
      <div className="row mt-5 justify-content-md-center">
        <div className="col-6">
          <img
            src={recipe?.medias[0].media}
            alt={recipe?.name}
            width="100%"
            height="300px"
            style={{ objectFit: "cover" }}
          />
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
  recipes: state.recipe,
  medias: state.media,
  groups: state.group,
  ingredients: state.ingredient,
  steps: state.step,
});

export default connect(mapStateToProps)(Detail);
