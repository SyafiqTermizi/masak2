import * as React from "react";
import { useEffect } from "react";

import { AxiosInstance } from "axios";

import { connect } from "react-redux";

import { useParams } from "react-router-dom";

import { StateTree } from "@syafiqtermizi/masak2-store";

import { Step } from "@syafiqtermizi/masak2-store/lib/steps";
import { Media } from "@syafiqtermizi/masak2-store/lib/medias";
import { retrieveRecipe } from "@syafiqtermizi/masak2-store/lib/recipes";
import {
  retrieveSavedRecipes,
  addSavedRecipe,
} from "@syafiqtermizi/masak2-store/lib/savedRecipes";
import {
  Ingredient,
  toggleIngredient,
} from "@syafiqtermizi/masak2-store/lib/ingredients";

import { Steps } from "../components/Steps";
import { Difficulty } from "../components/Difficulty";
import { SaveRecipeButton } from "../components/SaveRecipeButton";
import { DetailContainer } from "../components/DetailContainer";
import { GroupsIngredients } from "../components/GroupsIngredients";

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
  addSavedRecipe: (
    axios: AxiosInstance,
    userId: number,
    recipeId: number
  ) => void;
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
  addSavedRecipe,
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
      <DetailContainer marginTopClass="mt-5">
        <h3 data-testid="title">
          <b>{recipe?.name}</b>
        </h3>
        <div className="detail-title">
          <div>
            <Difficulty difficultyNumber={recipe.difficulty} /> <b>.</b> By{" "}
            {recipe.created_by}
          </div>
          <SaveRecipeButton
            savedRecipes={savedRecipes}
            recipeId={recipe.id}
            addSavedRecipe={addSavedRecipe}
          />
        </div>
      </DetailContainer>
      <DetailContainer marginTopClass="mt-3">
        {recipe.medias.length > 0 && (
          <img
            src={recipe.medias[0].media}
            alt={recipe.name}
            width="100%"
            height="400px"
            className="detail-image"
          />
        )}
      </DetailContainer>
      <DetailContainer marginTopClass="mt-3">
        <h6 data-testid="description">
          <b>{recipe.description}</b>
        </h6>
        <hr />
      </DetailContainer>
      <GroupsIngredients
        groups={recipe.groups}
        toggleIngredient={toggleIngredient}
      />
      <Steps steps={recipe.steps} />
      <DetailContainer marginTopClass="mt-3" extraClass="pb-5">
        <button type="button" className="btn btn-block btn-outline-dark">
          I made it!
        </button>
      </DetailContainer>
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
  addSavedRecipe,
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
