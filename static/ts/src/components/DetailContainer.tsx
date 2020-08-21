import * as React from "react";

interface Props {
  marginTopClass: string;
  extraClass?: string;
}

export const DetailContainer: React.FC<Props> = ({
  marginTopClass,
  extraClass,
  children,
}) => (
  <div
    data-testid="detail-container"
    className={`row ${marginTopClass} justify-content-md-center ${extraClass}`}
  >
    <div className="col-md-8 col-sm-12">{children}</div>
  </div>
);
