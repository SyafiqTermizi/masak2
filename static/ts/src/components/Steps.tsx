import * as React from "react";
import { Step } from "@syafiqtermizi/masak2-store/lib/steps";

import { DetailContainer } from "./DetailContainer";

interface Props {
  steps: Step[];
}

export const Steps: React.FC<Props> = ({ steps }) => (
  <DetailContainer marginTopClass="mt-3" extraClass="detail-list">
    <h4>Directions</h4>
    <ul>
      {steps.map((step) => (
        <li data-testid="step" key={step.id}>
          {step.step}
        </li>
      ))}
    </ul>
  </DetailContainer>
);
