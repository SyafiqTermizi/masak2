import * as React from "react";
import { Tag as iTag, selectTag } from "@syafiqtermizi/masak2-store/lib/tags";

import { Tag } from "./Tag";

interface Props {
  tags: iTag[];
  selectTag: (tagName: string) => void;
}

export const TagsContainer: React.FC<Props> = ({ tags, selectTag }) => (
  <div className="tags-container">
    {tags.map((tag) => (
      <Tag key={tag.name} tag={tag.name} handleClick={selectTag} />
    ))}
  </div>
);
