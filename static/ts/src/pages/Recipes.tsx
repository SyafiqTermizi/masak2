import * as React from "react";

import TagsContainer from "../containers/TagsContainer";
import SearchContainer from "../containers/SearchContainer";
import RecipeContainer from "../containers/RecipeContainer";

export const Recipes: React.FC = () => {
  return (
    <>
      <SearchContainer />
      <TagsContainer />
      <RecipeContainer />
    </>
  );
};
