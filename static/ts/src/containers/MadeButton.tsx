import * as React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { AxiosInstance } from "axios";
import { StateTree } from "@syafiqtermizi/masak2-store/lib/index";
import {
  retrieveMadeRecipes,
  addMadeRecipe,
  removeMadeRecipe,
} from "@syafiqtermizi/masak2-store/lib/madeRecipes";

import axios from "../axiosConfig";
import { DetailContainer } from "../components/DetailContainer";

interface PropsFromState {
  madeRecipes: number[];
}

interface PropFromDispatch {
  addMadeRecipe: (
    axiosParam: AxiosInstance,
    userId: number,
    recipeId: number
  ) => void;
  removeMadeRecipe: (
    axiosParam: AxiosInstance,
    userId: number,
    recipeId: number
  ) => void;
  retrieveMadeRecipes: (userId: number) => void;
}

interface PropFromParent {
  recipeId: number;
}

interface Props extends PropsFromState, PropFromDispatch, PropFromParent {}

export const MadeButton: React.FC<Props> = ({
  madeRecipes,
  addMadeRecipe,
  removeMadeRecipe,
  retrieveMadeRecipes,
  recipeId,
}) => {
  useEffect(() => {
    if (window.user.userId) {
      retrieveMadeRecipes(parseInt(window.user.userId));
    }
  }, []);
  const className = madeRecipes.includes(recipeId)
    ? "btn btn-block btn-dark"
    : "btn btn-block btn-outline-dark";

  const handleClick = madeRecipes.includes(recipeId)
    ? removeMadeRecipe
    : addMadeRecipe;

  return (
    <DetailContainer marginTopClass="mt-3" extraClass="pb-5">
      <button
        type="button"
        className={className}
        onClick={() => {
          if (window.user.userId) {
            handleClick(axios, parseInt(window.user.userId), recipeId);
          }
        }}
      >
        I made it!
      </button>
    </DetailContainer>
  );
};

const mapStateToProps = (state: StateTree) => ({
  madeRecipes: state.madeRecipes.recipes,
});

const mapDispatchToProps = {
  retrieveMadeRecipes,
  addMadeRecipe,
  removeMadeRecipe,
};

export default connect(mapStateToProps, mapDispatchToProps)(MadeButton);
