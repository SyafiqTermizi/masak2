import * as React from "react";
import * as ReactDom from "react-dom";

export const Hello: React.FC = () => <h1>Hello World</h1>;

ReactDom.render(<Hello />, document.getElementById("root"));
