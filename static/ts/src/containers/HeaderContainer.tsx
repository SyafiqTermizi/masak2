import * as React from "react";
import { useEffect } from "react";
import { AxiosInstance } from "axios";
import { connect } from "react-redux";
import { StateTree } from "@syafiqtermizi/masak2-store";
import { Media } from "@syafiqtermizi/masak2-store/lib/medias";
import { retrieveRecipe } from "@syafiqtermizi/masak2-store/lib/recipes";
import {
  retrieveSavedRecipes,
  addSavedRecipe,
  removeSavedRecipe,
} from "@syafiqtermizi/masak2-store/lib/savedRecipes";

import { DetailHeader } from "../components/DetailHeader";
import { SingleImage } from "../components/SingleImage";

interface PropsFromState {
  getRecipe: (
    recipeId: number
  ) => {
    id: number;
    name: string;
    description: string;
    rating: number;
    difficulty: number;
    created_by: string;
    medias: Media[];
  };
  savedRecipes: number[];
}

interface PropFromDispatch {
  addSavedRecipe: (
    axiosParam: AxiosInstance,
    userId: number,
    recipeId: number
  ) => void;
  removeSavedRecipe: (
    axiosParam: AxiosInstance,
    userId: number,
    recipeId: number
  ) => void;
  retrieveRecipe: (recipeId: number) => any;
  retrieveSavedRecipes: (userId: number) => void;
}

interface PropFromParent {
  recipeId: number;
}

interface Props extends PropsFromState, PropFromDispatch, PropFromParent {}

export const HeaderContainer: React.FC<Props> = ({
  getRecipe,
  savedRecipes,
  recipeId,
  addSavedRecipe,
  removeSavedRecipe,
  retrieveRecipe,
  retrieveSavedRecipes,
}) => {
  let recipe = getRecipe(recipeId);

  useEffect(() => {
    if (!recipe.name) {
      retrieveRecipe(recipeId).then(() => (recipe = getRecipe(recipeId)));
    }
    if (window.user.userId) {
      retrieveSavedRecipes(parseInt(window.user.userId));
    }
  }, []);

  return (
    <DetailHeader
      name={recipe.name}
      difficulty={recipe.difficulty}
      created_by={recipe.created_by}
      savedRecipes={savedRecipes}
      id={recipe.id}
      description={recipe.description}
      addSavedRecipe={addSavedRecipe}
      removeSavedRecipe={removeSavedRecipe}
    >
      {recipe.medias.length > 0 && (
        <SingleImage
          mediaUrl={recipe.medias[0].media}
          altName={recipe.name}
          width="100%"
          height="400px"
        />
      )}
    </DetailHeader>
  );
};

const mapStateToProps = (state: StateTree) => ({
  getRecipe: (recipeId: number) => ({
    ...state.recipe[recipeId],
    medias: Object.values(state.media).filter(
      (media) => media.recipe === recipeId
    ),
  }),
  savedRecipes: state.savedRecipes.recipes,
});

const mapDispatchToProps = {
  addSavedRecipe,
  retrieveRecipe,
  retrieveSavedRecipes,
  removeSavedRecipe,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
