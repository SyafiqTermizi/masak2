import * as React from "react";
import { Link } from "react-router-dom";
import { Media } from "@syafiqtermizi/masak2-store/lib/medias";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface Props {
  id: number;
  name: string;
  description: string;
  medias: Media[];
}

export const Recipe: React.FC<Props> = ({ id, name, medias, description }) => (
  <div data-testid="recipe" className="recipes-item">
    <Link role="link" to={`/detail/${id}`}>
      <div className="card">
        {medias.length >= 1 && (
          <img src={medias[0].media} alt={name} height="150px" />
        )}
        <span>
          <FontAwesomeIcon style={{ marginTop: "10px" }} icon={faStar} />{" "}
          {(Math.random() * 4 + 1).toFixed(2)}
        </span>
        <h6 data-testid="title" className="card-title">
          <b>{name}</b>
        </h6>
        <h6 data-testid="description">{description.slice(0, 35)}...</h6>
      </div>
    </Link>
  </div>
);
