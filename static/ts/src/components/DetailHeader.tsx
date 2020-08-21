import * as React from "react";
import { AxiosInstance } from "axios";

import { Difficulty } from "./Difficulty";
import { DetailContainer } from "./DetailContainer";
import { SaveRecipeButton } from "../components/SaveRecipeButton";

interface Props {
  name: string;
  difficulty: number;
  created_by: string;
  savedRecipes: number[];
  id: number;
  description: string;
  addSavedRecipe: (
    axios: AxiosInstance,
    userId: number,
    recipeId: number
  ) => void;
}

export const DetailHeader: React.FC<Props> = ({
  name,
  difficulty,
  created_by,
  savedRecipes,
  id,
  description,
  children,
  addSavedRecipe,
}) => (
  <>
    <DetailContainer marginTopClass="mt-5">
      <h3 data-testid="title">
        <b>{name}</b>
      </h3>
      <div className="detail-title">
        <div>
          <Difficulty difficultyNumber={difficulty} /> <b>.</b> By {created_by}
        </div>
        <SaveRecipeButton
          savedRecipes={savedRecipes}
          recipeId={id}
          addSavedRecipe={addSavedRecipe}
        />
      </div>
    </DetailContainer>
    {children}
    <DetailContainer marginTopClass="mt-3">
      <h6 data-testid="description">
        <b>{description}</b>
      </h6>
      <hr />
    </DetailContainer>
  </>
);
