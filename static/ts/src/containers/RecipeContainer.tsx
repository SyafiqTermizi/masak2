import * as React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { StateTree } from "@syafiqtermizi/masak2-store";
import { MediaState } from "@syafiqtermizi/masak2-store/lib/medias";
import {
  retrieveRecipes,
  RecipeState,
} from "@syafiqtermizi/masak2-store/lib/recipes";

import { Recipe } from "../components/Recipe";

interface Props {
  recipes: RecipeState;
  medias: MediaState;
  retrieveRecipes: () => void;
}

export const RecipeContainer: React.FC<Props> = ({
  recipes,
  medias,
  retrieveRecipes,
}) => {
  useEffect(() => {
    retrieveRecipes();
  }, []);

  const elem = Object.keys(recipes).map((id) => {
    const recipe = recipes[id];
    const recipeMedias = recipe.medias.map((id) => medias[id]);

    return (
      recipe.name && (
        <Recipe
          key={id}
          id={recipe.id}
          name={recipe.name}
          description={recipe.description}
          difficulty={recipe.difficulty}
          medias={recipeMedias}
        />
      )
    );
  });

  return <div className="row mt-3 recipes-container">{elem}</div>;
};

const mapStateToProps = (state: StateTree) => ({
  recipes: state.recipe,
  medias: state.media,
});

const mapDispatchToProps = {
  retrieveRecipes,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeContainer);
