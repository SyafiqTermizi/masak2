import * as React from "react";
import { Media } from "@syafiqtermizi/masak2-store/lib/medias";

interface Props {
  id: number;
  name: string;
  description: string;
  rating: number;
  difficulty: number;
  created_by: string;
  medias: Media[];
}

export const Recipe: React.FC<Props> = ({
  id,
  name,
  description,
  rating,
  difficulty,
  created_by,
  medias,
}) => (
  <div className="recipe-item">
    <div className="card">
      {medias.length >= 1 && (
        <img src={medias[0].media} alt={name} height="300px" />
      )}
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text"></p>
      </div>
    </div>
  </div>
);
