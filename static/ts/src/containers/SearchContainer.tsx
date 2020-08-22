import * as React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { StateTree } from "@syafiqtermizi/masak2-store";

import {
  setSearchTerm as setStateSearchTerm,
  clearSearchTerm,
} from "@syafiqtermizi/masak2-store/lib/search";
import { retrieveRecipes } from "@syafiqtermizi/masak2-store/lib/recipes";

import { SearchBar } from "../components/Searchbar";

interface Props {
  stateSearchTerm: string;
  setStateSearchTerm: (searchTerm: string) => void;
  clearSearchTerm: () => void;
  retrieveRecipes: () => void;
}

export const SearchContainer: React.FC<Props> = ({
  stateSearchTerm,
  clearSearchTerm,
  setStateSearchTerm,
  retrieveRecipes,
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState("");

  const handleSearch = () => {
    if (localSearchTerm.length > 2) {
      setStateSearchTerm(localSearchTerm);
      retrieveRecipes();
    }
  };

  const clearSearch = () => {
    clearSearchTerm();
    setLocalSearchTerm("");
    retrieveRecipes();
  };

  return (
    <>
      <SearchBar
        stateSearchTerm={stateSearchTerm}
        localSearchTerm={localSearchTerm}
        setSearchTerm={setLocalSearchTerm}
        handleSearch={() => handleSearch()}
        clearSearchTerm={() => clearSearch()}
      />
      {stateSearchTerm && (
        <div data-testid="search-term" className="row">
          <div className="col-12 mb-2">
            <h3>You are searching for "{stateSearchTerm}"</h3>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state: StateTree) => ({
  stateSearchTerm: state.search.searchTerm,
});

const mapDispatchToProps = {
  setStateSearchTerm,
  clearSearchTerm,
  retrieveRecipes,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
