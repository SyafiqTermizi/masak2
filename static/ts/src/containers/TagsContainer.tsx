import * as React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { StateTree } from "@syafiqtermizi/masak2-store";

import {
  Tag as iTag,
  selectTag,
  retrieveTags,
} from "@syafiqtermizi/masak2-store/lib/tags";

import { Tag } from "../components/Tag";

interface Props {
  tags: iTag[];
  retrieveTags: () => void;
  selectTag: (tagName: string) => void;
}

export const TagsContainer: React.FC<Props> = ({
  tags,
  selectTag,
  retrieveTags,
}) => {
  useEffect(() => {
    retrieveTags();
  }, []);

  return (
    <div className="tags-container">
      {tags.map((tag) => (
        <Tag key={tag.name} tag={tag.name} handleClick={selectTag} />
      ))}
    </div>
  );
};

const mapStateToProps = (state: StateTree) => ({
  tags: state.tag.tags,
});

const mapDispatchToProps = {
  selectTag,
  retrieveTags,
};

export default connect(mapStateToProps, mapDispatchToProps)(TagsContainer);
