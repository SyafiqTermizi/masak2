import * as React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { StateTree } from "@syafiqtermizi/masak2-store";
import { MediaState } from "@syafiqtermizi/masak2-store/lib/medias";
import {
  setSearchTerm,
  clearSearchTerm,
} from "@syafiqtermizi/masak2-store/lib/search";
import {
  retrieveRecipes,
  RecipeState,
} from "@syafiqtermizi/masak2-store/lib/recipes";
import { retrieveTags, Tag } from "@syafiqtermizi/masak2-store/lib/tags";

import { TagsContainer } from "../components/TagsContainer";
import { Recipe } from "../components/Recipe";
import { SearchBar } from "../components/Searchbar";

interface Props {
  recipes: RecipeState;
  medias: MediaState;
  searchTerm: string;
  tags: Tag[];
  setSearchTerm: (searchTerm: string) => void;
  clearSearchTerm: () => void;
  retrieveRecipes: () => any;
  retrieveTags: () => void;
}

export const Recipes: React.FC<Props> = ({
  recipes,
  medias,
  searchTerm,
  tags,
  setSearchTerm,
  clearSearchTerm,
  retrieveRecipes,
  retrieveTags,
}) => {
  const handleSearch = () => {
    if (searchTerm.length > 2) retrieveRecipes();
  };
  const clearSearch = () => {
    clearSearchTerm();
    retrieveRecipes();
  };

  useEffect(() => {
    retrieveRecipes();
    if (tags.length === 0) {
      retrieveTags();
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
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={() => handleSearch()}
        clearSearchTerm={() => clearSearch()}
      />
      {searchTerm && (
        <div className="row">
          <div className="col-12 mb-2">
            <h3>You are searching for "{searchTerm}"</h3>
          </div>
        </div>
      )}
      <TagsContainer tags={tags} />
      <div className="row mt-3 recipes-container">{elem}</div>
    </>
  );
};

const mapStateToProps = (state: StateTree) => ({
  recipes: state.recipe,
  medias: state.media,
  searchTerm: state.search.searchTerm,
  tags: state.tag,
});

const mapDispatchToProps = {
  retrieveRecipes,
  setSearchTerm,
  clearSearchTerm,
  retrieveTags,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
