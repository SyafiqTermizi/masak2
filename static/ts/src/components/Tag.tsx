import * as React from "react";

interface Props {
  tag: string;
}

export const Tag: React.FC<Props> = ({ tag }) => (
  <a href="#" className="tags-item mx-2 mt-2 btn btn-outline-dark btn-sm">
    {tag}
  </a>
);
