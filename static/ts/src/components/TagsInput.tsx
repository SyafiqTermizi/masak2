import * as React from "react";
import { useState } from "react";

import { Tag } from "@syafiqtermizi/masak2-store/lib/tags";

interface Props {
  tags: Tag[];
  setTags: (tag: Tag[]) => void;
}

export const TagsInput: React.FC<Props> = ({ tags, setTags }) => {
  const [tag, setTag] = useState("");

  return (
    <>
      <div className="mb-3">
        {tags.map((t) => (
          <span
            key={t.name}
            className="badge rounded-pill bg-secondary mr-2"
            onClick={() => {
              const tempTags = [...tags];
              tempTags.splice(tempTags.indexOf(t), 1);
              setTags(tempTags);
            }}
          >
            {t.name}
          </span>
        ))}
      </div>
      <div className="mb-3">
        <label htmlFor="tags">Tags</label>
        <input
          type="text"
          name="tags"
          className="form-control"
          placeholder="Add a tag (press enter when done)"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (tags.find((t) => t.name === tag)) {
                return;
              }
              const tempTags = [...tags];
              tempTags.push({ name: tag, image: "" });
              setTags(tempTags);
              setTag("");
            }
          }}
        />
      </div>
    </>
  );
};
