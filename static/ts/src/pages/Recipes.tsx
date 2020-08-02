import * as React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { StateTree } from "@syafiqtermizi/masak2-store";
import { MediaState } from "@syafiqtermizi/masak2-store/lib/medias";
import {
  retrieveRecipes,
  RecipeState,
  searchRecipe,
} from "@syafiqtermizi/masak2-store/lib/recipes";

import { SearchBar } from "../components/SearchBar";
import { Recipe } from "../components/Recipe";

interface Props {
  recipes: RecipeState;
  medias: MediaState;
  retrieveRecipes: () => any;
  searchRecipe: (searchTerm: string) => void;
}

export const Recipes: React.FC<Props> = ({
  recipes,
  medias,
  retrieveRecipes,
  searchRecipe,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm) {
      searchRecipe(searchTerm);
    }
  };

  useEffect(() => {
    if (Object.keys(recipes).length === 1) {
      retrieveRecipes();
    }
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
          medias={recipeMedias}
        />
      )
    );
  });

  return (
    <>
      <SearchBar handleInput={setSearchTerm} handleSearch={handleSearch} />
      <div className="row recipes-container">{elem}</div>
    </>
  );
};

const mapStateToProps = (state: StateTree) => ({
  recipes: state.recipe,
  medias: state.media,
});

const mapDispatchToProps = {
  retrieveRecipes,
  searchRecipe,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
