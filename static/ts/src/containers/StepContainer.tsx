import * as React from "react";
import { connect } from "react-redux";
import { StateTree } from "@syafiqtermizi/masak2-store";
import { Step } from "@syafiqtermizi/masak2-store/lib/steps";

import { Steps } from "../components/Steps";

interface PropsFromState {
  getSteps: (recipeId: number) => Step[];
}

interface PropsFromParent {
  recipeId: number;
}

interface Props extends PropsFromState, PropsFromParent {}

export const StepContainer: React.FC<Props> = ({ getSteps, recipeId }) => {
  const steps = getSteps(recipeId);
  return <Steps steps={steps} />;
};

const mapStateToProps = (state: StateTree) => ({
  getSteps: (recipeId: number) =>
    Object.values(state.step).filter((step) => step.recipe === recipeId),
});

export default connect(mapStateToProps)(StepContainer);
