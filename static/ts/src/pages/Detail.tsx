import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export interface Media {
  id: number;
  media_type: string;
  media: string;
  recipe: number;
}

export interface Ingredient {
  id: number;
  name: string;
  unit: string;
  note: string;
  group: number;
  amount: string;
}

export interface Group {
  id: number;
  name: string;
  recipe: number;
  ingredients: Ingredient[];
}

export interface Step {
  id: number;
  step: string;
  recipe: number;
}
export interface Recipe {
  id: number;
  name: string;
  description: string;
  difficulty: number;
  created_by: string;
  medias: Media[];
  groups: Group[];
  steps: Step[];
}

export const Detail: React.FC = () => {
  const [recipe, setRecipe] = useState<Recipe | undefined>();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/recipes/2")
      .then((res) => setRecipe(res.data));
  }, []);
  return (
    <>
      <div className="row mt-5 justify-content-md-center">
        <div className="col-6">
          <img
            src={recipe?.medias[0].media}
            alt={recipe?.name}
            width="100%"
            height="300px"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      <div className="row mt-5 justify-content-md-center">
        <div className="col-6">
          <h3>{recipe?.name}</h3>
          <h6>{recipe?.description}</h6>
        </div>
      </div>
      <div className="row mt-5 justify-content-md-center">
        <div className="col-6">
          <ul>
            {recipe?.groups.map((group) =>
              group.ingredients.map((ingredient) => (
                <li key={ingredient.id}>
                  {ingredient.amount} {ingredient.unit} {ingredient.name}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
      <div className="row mt-5 justify-content-md-center">
        <div className="col-6">
          <ul>
            {recipe?.steps.map((step) => (
              <li key={step.id}>{step.step}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
