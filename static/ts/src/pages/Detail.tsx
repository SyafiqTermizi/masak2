import * as React from "react";
import { useParams } from "react-router-dom";

import StepContainer from "../containers/StepContainer";
import IngredientContainer from "../containers/IngredientsContainer";
import HeaderContainer from "../containers/HeaderContainer";
import MadeButton from "../containers/MadeButton";

const Detail: React.FC = () => {
  const { id } = useParams();

  return (
    <>
      <HeaderContainer recipeId={parseInt(id)} />
      <IngredientContainer recipeId={parseInt(id)} />
      <StepContainer recipeId={parseInt(id)} />
      <MadeButton recipeId={parseInt(id)} />
    </>
  );
};

export default Detail;
