import * as React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import { StateTree } from "@syafiqtermizi/masak2-store";
import { Step } from "@syafiqtermizi/masak2-store/lib/steps";
import { Media } from "@syafiqtermizi/masak2-store/lib/medias";
import { retrieveRecipe } from "@syafiqtermizi/masak2-store/lib/recipes";
import {
  Ingredient,
  toggleIngredient,
} from "@syafiqtermizi/masak2-store/lib/ingredients";

import { numberToDifficulty, numberToColor } from "../utils";

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
  toggleIngredient: (id: number) => void;
}

interface PropsFromState {
  getRecipe: (id: string) => Recipe;
}
interface Props extends PropsFromState, PropsFromDispatch {}

export const Detail: React.FC<Props> = ({
  getRecipe,
  retrieveRecipe,
  toggleIngredient,
}) => {
  const { id } = useParams();
  let recipe = getRecipe(id);
  if (!recipe.name) {
    retrieveRecipe(parseInt(id)).then(() => (recipe = getRecipe(id)));
  }

  return (
    <>
      <div className="row mt-5 justify-content-md-center">
        <div className="col-md-8 col-sm-12">
          <h3 data-testid="title">
            <b>{recipe?.name}</b>
          </h3>
          <div className="detail-title">
            <div>
              <span
                className={`badge rounded-pill ${numberToColor(
                  recipe.difficulty
                )}`}
              >
                {numberToDifficulty(recipe.difficulty)}
              </span>{" "}
              <b>.</b> By {recipe.created_by}
            </div>
            <div className="btn btn-sm btn-light">
              <FontAwesomeIcon icon={faHeart} /> Save
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3 justify-content-md-center">
        <div className="col-md-8 col-sm-12">
          {recipe && recipe.medias.length > 0 && (
            <img
              src={recipe?.medias[0].media}
              alt={recipe?.name}
              width="100%"
              height="400px"
              className="detail-image"
            />
          )}
        </div>
      </div>
      <div className="row justify-content-md-center mt-3">
        <div className="col-md-8 col-sm-12">
          <h6 data-testid="description">
            <b>{recipe?.description}</b>
          </h6>
          <hr />
        </div>
      </div>
      <div className="row mt-3 justify-content-md-center detail-list">
        <div className="col-md-8 col-sm-12">
          <h4>Ingredients</h4>
          <ul>
            {recipe?.groups.map((group) =>
              group.ingredients.map((ingredient) => (
                <li
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
      <div className="row mt-3 justify-content-md-center detail-list">
        <div className="col-md-8 col-sm-12">
          <h4>Directions</h4>
          <ul>
            {recipe?.steps.map((step) => (
              <li key={step.id}>{step.step}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="row mt-3 pb-5 justify-content-md-center">
        <div className="col-md-8 col-sm-12">
          <button type="button" className="btn btn-block btn-outline-dark">
            I made it!
          </button>
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
  toggleIngredient,
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
