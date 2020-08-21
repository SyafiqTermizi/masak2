import * as React from "react";
import { useParams } from "react-router-dom";

import StepContainer from "../containers/StepContainer";
import IngredientContainer from "../containers/IngredientsContainer";
import HeaderContainer from "../containers/HeaderContainer";
import { DetailContainer } from "../components/DetailContainer";

export const Detail: React.FC = () => {
  const { id } = useParams();

  return (
    <>
      <HeaderContainer recipeId={parseInt(id)} />
      <IngredientContainer recipeId={parseInt(id)} />
      <StepContainer recipeId={parseInt(id)} />
      <DetailContainer marginTopClass="mt-3" extraClass="pb-5">
        <button type="button" className="btn btn-block btn-outline-dark">
          I made it!
        </button>
      </DetailContainer>
    </>
  );
};
