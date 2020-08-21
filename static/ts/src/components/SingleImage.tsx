import * as React from "react";

import { DetailContainer } from "./DetailContainer";

interface Props {
  mediaUrl: string;
  altName: string;
  width: string;
  height: string;
}

export const SingleImage: React.FC<Props> = ({
  mediaUrl,
  altName,
  width,
  height,
}) => (
  <DetailContainer marginTopClass="mt-3">
    <img
      data-testid="single-image"
      src={mediaUrl}
      alt={altName}
      width={width}
      height={height}
      className="detail-image"
    />
  </DetailContainer>
);
