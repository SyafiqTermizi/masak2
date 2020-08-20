import * as React from "react";

import { numberToDifficulty, numberToColor } from "../utils";

interface Props {
  difficultyNumber: number;
}

export const Difficulty: React.FC<Props> = ({ difficultyNumber }) => (
  <span
    data-testid="difficulty"
    className={`badge rounded-pill ${numberToColor(difficultyNumber)}`}
  >
    {numberToDifficulty(difficultyNumber)}
  </span>
);
