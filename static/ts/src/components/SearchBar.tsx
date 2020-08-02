import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface Props {
  handleInput: (searchTerm: string) => void;
  handleSearch: () => void;
}

export const SearchBar: React.FC<Props> = ({ handleInput, handleSearch }) => (
  <div className="row mt-5 mb-3 justify-content-md-center search-bar">
    <div className="col-12 mt-3 col-md-4">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search Recipes or ingredients"
          onChange={(e) => handleInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  </div>
);
