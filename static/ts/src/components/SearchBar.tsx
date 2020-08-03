import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface Props {
  handleInput: (searchTerm: string) => void;
  handleSearch: () => void;
}

export const SearchBar: React.FC<Props> = ({ handleInput, handleSearch }) => (
  <div className="input-group mb-3 search-bar">
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
      onClick={handleSearch}
    >
      <FontAwesomeIcon icon={faSearch} />
    </button>
  </div>
);
