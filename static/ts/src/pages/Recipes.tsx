import * as React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { StateTree } from "@syafiqtermizi/masak2-store";
import {
  retrieveRecipe,
  RecipeState,
} from "@syafiqtermizi/masak2-store/lib/recipes";

interface Props {
  recipes: RecipeState;
  retrieveRecipe: () => any;
}

const Recipes: React.FC<Props> = ({ recipes, retrieveRecipe }) => {
  useEffect(() => {
    retrieveRecipe();
  }, []);
  return (
    <div>
      <h1>hello world</h1>
    </div>
  );
};

const mapStateToProps = (state: StateTree) => ({
  recipes: state.recipe,
});

const mapDispatchToProps = {
  retrieveRecipe,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
