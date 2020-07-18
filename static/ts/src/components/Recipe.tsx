import * as React from "react";
import { Link } from "react-router-dom";
import { Media } from "@syafiqtermizi/masak2-store/lib/medias";

interface Props {
  id: number;
  name: string;
  medias: Media[];
}

export const Recipe: React.FC<Props> = ({ id, name, medias }) => (
  <div className="recipe-item">
    <Link role="link" to={`/detail/${id}`}>
      <div className="card">
        {medias.length >= 1 && (
          <img src={medias[0].media} alt={name} height="300px" />
        )}
        <div className="card-body">
          <h5 data-testid="title" className="card-title">
            {name}
          </h5>
          <p className="card-text"></p>
        </div>
      </div>
    </Link>
  </div>
);
