import * as React from "react";
import { Tag as iTag } from "@syafiqtermizi/masak2-store/lib/tags";

import { Tag } from "./Tag";

interface Props {
  tags: iTag[];
}

export const TagsContainer: React.FC<Props> = ({ tags }) => (
  <div className="tags-container">
    {tags.map((tag) => (
      <Tag key={tag.name} tag={tag.name} />
    ))}
  </div>
);
