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
    className={`row ${marginTopClass} justify-content-md-center ${extraClass}`}
  >
    <div className="col-md-8 col-sm-12">{children}</div>
  </div>
);
