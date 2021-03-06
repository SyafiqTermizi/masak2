import * as React from "react";
import { AxiosInstance } from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import axios from "../axiosConfig";

interface Props {
  savedRecipes: number[];
  recipeId: number;
  addSavedRecipe: (
    axios: AxiosInstance,
    userId: number,
    recipeId: number
  ) => void;
  removeSavedRecipe: (
    axios: AxiosInstance,
    userId: number,
    recipeId: number
  ) => void;
}

export const SaveRecipeButton: React.FC<Props> = ({
  savedRecipes,
  recipeId,
  addSavedRecipe,
  removeSavedRecipe,
}) => {
  const handleClick = savedRecipes.includes(recipeId)
    ? removeSavedRecipe
    : addSavedRecipe;

  return (
    <button
      data-testid="save-button"
      className={`btn btn-sm ${
        savedRecipes.includes(recipeId)
          ? "btn-custom-pink"
          : "btn-custom-outline-pink"
      }`}
      disabled={!window.user.isAuthenticated}
      onClick={() => {
        if (window.user.userId) {
          handleClick(axios, parseInt(window.user.userId), recipeId);
        }
        return;
      }}
    >
      <FontAwesomeIcon icon={faHeart} /> Save
    </button>
  );
};
