import * as React from "react";

interface Props {
  tag: string;
  selectedTag: string;
  setTag: (tagName: string) => void;
}

export const Tag: React.FC<Props> = ({ tag, selectedTag, setTag }) => {
  const buttonClass =
    tag === selectedTag
      ? "tags-item mx-2 mt-2 btn btn-dark btn-sm"
      : "tags-item mx-2 mt-2 btn btn-outline-dark btn-sm";

  return (
    <button
      data-testid="tag"
      className={buttonClass}
      onClick={() => {
        tag === selectedTag ? setTag("") : setTag(tag);
      }}
    >
      {tag}
    </button>
  );
};
