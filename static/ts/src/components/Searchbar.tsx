import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface Props {
  localSearchTerm: string;
  stateSearchTerm: string;
  setSearchTerm: (param: string) => void;
  handleSearch: () => void;
  clearSearchTerm: () => void;
}

export const SearchBar: React.FC<Props> = ({
  localSearchTerm,
  stateSearchTerm,
  setSearchTerm,
  handleSearch,
  clearSearchTerm,
}) => (
  <div className="row mt-5 mb-3 px-2">
    <div className="input-group mb-3 search-bar">
      <input
        type="text"
        className="form-control"
        placeholder="Search Recipes or ingredients"
        value={localSearchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <button
        data-testid="search-button"
        className="btn btn-outline-secondary"
        type="button"
        id="button-addon2"
        onClick={() => {
          if (stateSearchTerm) {
            clearSearchTerm();
          } else {
            handleSearch();
          }
        }}
      >
        {stateSearchTerm ? (
          <b>Clear filter</b>
        ) : (
          <FontAwesomeIcon icon={faSearch} />
        )}
      </button>
    </div>
  </div>
);
