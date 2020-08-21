import * as React from "react";
import { useEffect } from "react";

import { connect } from "react-redux";

import { useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { StateTree } from "@syafiqtermizi/masak2-store";

import { Step } from "@syafiqtermizi/masak2-store/lib/steps";
import { Media } from "@syafiqtermizi/masak2-store/lib/medias";
import { retrieveRecipe } from "@syafiqtermizi/masak2-store/lib/recipes";
import { retrieveSavedRecipes } from "@syafiqtermizi/masak2-store/lib/savedRecipes";
import {
  Ingredient,
  toggleIngredient,
} from "@syafiqtermizi/masak2-store/lib/ingredients";

import axios from "../axiosConfig";
import { Difficulty } from "../components/Difficulty";
import { GroupsIngredients } from "../components/GroupsIngredients";
import { Steps } from "../components/Steps";

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
  retrieveSavedRecipes: (userId: number) => void;
}

interface PropsFromState {
  getRecipe: (id: string) => Recipe;
  savedRecipes: number[];
}
interface Props extends PropsFromState, PropsFromDispatch {}

export const Detail: React.FC<Props> = ({
  getRecipe,
  savedRecipes,
  retrieveRecipe,
  toggleIngredient,
  retrieveSavedRecipes,
}) => {
  const { id } = useParams();
  let recipe = getRecipe(id);

  useEffect(() => {
    if (!recipe.name) {
      retrieveRecipe(parseInt(id)).then(() => (recipe = getRecipe(id)));
    }
    if (window.user.userId) {
      retrieveSavedRecipes(parseInt(window.user.userId));
    }
  }, []);

  return (
    <>
      <div className="row mt-5 justify-content-md-center">
        <div className="col-md-8 col-sm-12">
          <h3 data-testid="title">
            <b>{recipe?.name}</b>
          </h3>
          <div className="detail-title">
            <div>
              {recipe.difficulty && (
                <Difficulty difficultyNumber={recipe.difficulty} />
              )}{" "}
              <b>.</b> By {recipe.created_by}
            </div>
            <button
              className={`btn btn-sm ${
                savedRecipes.includes(recipe.id)
                  ? "btn-custom-danger"
                  : "btn-light"
              }`}
              disabled={!window.user.isAuthenticated}
              onClick={() => {
                if (!window.user.isAuthenticated) return;
                axios
                  .put(`/savedrecipes/${window.user.userId}`, {
                    recipe_id: recipe.id,
                  })
                  .then((res) => console.log(res))
                  .catch((err) => console.log(err.response.data));
              }}
            >
              <FontAwesomeIcon icon={faHeart} /> Save
            </button>
          </div>
        </div>
      </div>
      <div className="row mt-3 justify-content-md-center">
        <div className="col-md-8 col-sm-12">
          {recipe.medias.length > 0 && (
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
      <GroupsIngredients
        groups={recipe.groups}
        toggleIngredient={toggleIngredient}
      />
      <Steps steps={recipe.steps} />
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
  savedRecipes: state.savedRecipes.recipes,
});

const mapDispatchToProps = {
  retrieveRecipe,
  toggleIngredient,
  retrieveSavedRecipes,
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
