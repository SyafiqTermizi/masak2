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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSyncAlt } from "@fortawesome/free-solid-svg-icons";

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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isFiltered, setIsFiltered] = useState<Boolean>(false);

  const handleSearch = () => {
    if (searchTerm && !isFiltered) {
      searchRecipe(searchTerm);
      setIsFiltered(true);
    }
  };

  const clearFilter = () => {
    setSearchTerm("");
    setIsFiltered(false);
    retrieveRecipes();
  };

  useEffect(() => {
    if (
      Object.keys(recipes).length === 1 &&
      recipes[1] &&
      recipes[1].name === ""
    ) {
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
      <div className="row mt-5 mb-2">
        <div className="mt-1 col-6">
          {isFiltered ? (
            <h2>
              Recipes containing "{searchTerm}" &nbsp;
              <button className="btn btn-light" onClick={clearFilter}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </h2>
          ) : (
            <SearchBar
              handleInput={setSearchTerm}
              handleSearch={handleSearch}
            />
          )}
        </div>
        <div className="col-6 text-right">
          <button className="btn btn-light" onClick={clearFilter}>
            Refresh &nbsp;
            <FontAwesomeIcon icon={faSyncAlt} />
          </button>
        </div>
      </div>
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
