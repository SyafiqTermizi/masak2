import * as React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { StateTree } from "@syafiqtermizi/masak2-store";
import { MediaState } from "@syafiqtermizi/masak2-store/lib/medias";
import {
  retrieveRecipe,
  RecipeState,
} from "@syafiqtermizi/masak2-store/lib/recipes";

import { Recipe } from "../components/Recipe";

import "./recipe.css";

interface Props {
  recipes: RecipeState;
  medias: MediaState;
  retrieveRecipe: () => any;
}

const Recipes: React.FC<Props> = ({ recipes, medias, retrieveRecipe }) => {
  useEffect(() => {
    retrieveRecipe();
  }, []);

  const elem = Object.keys(recipes).map((id) => {
    const recipe = recipes[id];
    const recipeMedias = recipe.medias.map((id) => medias[id]);

    return (
      <Recipe
        key={id}
        id={recipe.id}
        name={recipe.name}
        description={recipe.description}
        rating={recipe.rating}
        difficulty={recipe.difficulty}
        created_by={recipe.created_by}
        medias={recipeMedias}
      />
    );
  });

  return <div className="row mt-5 recipe-container">{elem}</div>;
};

const mapStateToProps = (state: StateTree) => ({
  recipes: state.recipe,
  medias: state.media,
});

const mapDispatchToProps = {
  retrieveRecipe,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
