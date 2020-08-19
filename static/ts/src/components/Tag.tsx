import * as React from "react";

interface Props {
  tag: string;
  handleClick: (tagName: string) => void;
}

export const Tag: React.FC<Props> = ({ tag, handleClick }) => (
  <a
    data-testid="tag"
    href="#"
    className="tags-item mx-2 mt-2 btn btn-outline-dark btn-sm"
    onClick={() => {
      console.log("h");
      handleClick(tag);
    }}
  >
    {tag}
  </a>
);
