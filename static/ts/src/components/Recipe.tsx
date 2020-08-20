import * as React from "react";
import { Link } from "react-router-dom";
import { Media } from "@syafiqtermizi/masak2-store/lib/medias";

import { Difficulty } from "./Difficulty";

interface Props {
  id: number;
  name: string;
  description: string;
  difficulty: number;
  medias: Media[];
}

export const Recipe: React.FC<Props> = ({
  id,
  name,
  medias,
  description,
  difficulty,
}) => (
  <div data-testid="recipe" className="recipes-item">
    <Link role="link" to={`/detail/${id}`}>
      <div className="card">
        {medias.length >= 1 && (
          <img src={medias[0].media} alt={name} height="150px" />
        )}
        <span style={{ marginTop: "5px" }}>
          <Difficulty difficultyNumber={difficulty} />
        </span>
        <h6 data-testid="title" className="card-title">
          <b>{name}</b>
        </h6>
        <h6 data-testid="description">{description.slice(0, 35)}...</h6>
      </div>
    </Link>
  </div>
);
