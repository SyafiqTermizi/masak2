import * as React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { StateTree } from "@syafiqtermizi/masak2-store";

import {
  Tag as iTag,
  selectTag,
  retrieveTags,
} from "@syafiqtermizi/masak2-store/lib/tags";

import { retrieveRecipes } from "@syafiqtermizi/masak2-store/lib/recipes";

import { Tag } from "../components/Tag";

interface Props {
  tags: iTag[];
  selectedTag: string;
  retrieveTags: () => void;
  selectTag: (tagName: string) => void;
  retrieveRecipes: () => void;
}

export const TagsContainer: React.FC<Props> = ({
  tags,
  selectedTag,
  selectTag,
  retrieveTags,
  retrieveRecipes,
}) => {
  useEffect(() => {
    retrieveTags();
  }, []);

  const filterRecipe = (tag: string) => {
    selectTag(tag);
    retrieveRecipes();
  };

  return (
    <div className="tags-container">
      {tags.map((tag) => (
        <Tag
          key={tag.name}
          tag={tag.name}
          selectedTag={selectedTag}
          setTag={filterRecipe}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state: StateTree) => ({
  tags: state.tag.tags,
  selectedTag: state.tag.selectedTagName,
});

const mapDispatchToProps = {
  selectTag,
  retrieveTags,
  retrieveRecipes,
};

export default connect(mapStateToProps, mapDispatchToProps)(TagsContainer);
