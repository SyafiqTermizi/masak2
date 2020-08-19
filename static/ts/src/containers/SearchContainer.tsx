import * as React from "react";
import { connect } from "react-redux";
import { StateTree } from "@syafiqtermizi/masak2-store";

import {
  setSearchTerm,
  clearSearchTerm,
} from "@syafiqtermizi/masak2-store/lib/search";
import { retrieveRecipes } from "@syafiqtermizi/masak2-store/lib/recipes";

import { SearchBar } from "../components/Searchbar";

interface Props {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  clearSearchTerm: () => void;
  retrieveRecipes: () => void;
}

export const SearchContainer: React.FC<Props> = ({
  searchTerm,
  clearSearchTerm,
  setSearchTerm,
  retrieveRecipes,
}) => {
  const handleSearch = () => {
    if (searchTerm.length > 2) retrieveRecipes();
  };

  const clearSearch = () => {
    clearSearchTerm();
    retrieveRecipes();
  };

  return (
    <>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={() => handleSearch()}
        clearSearchTerm={() => clearSearch()}
      />
      {searchTerm && (
        <div className="row">
          <div className="col-12 mb-2">
            <h3>You are searching for "{searchTerm}"</h3>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state: StateTree) => ({
  searchTerm: state.search.searchTerm,
});

const mapDispatchToProps = {
  setSearchTerm,
  clearSearchTerm,
  retrieveRecipes,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
