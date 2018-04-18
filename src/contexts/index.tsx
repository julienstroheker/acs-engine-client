import * as React from "react";
import { ClusterDefinitionContext } from "./ClusterDefinitionContext";
import { StdOutContext } from "./StdOutContext";

export class Context extends React.PureComponent {
  public render() {
    return (
      <div className="Context">
        <ClusterDefinitionContext>
          <StdOutContext>{this.props.children}</StdOutContext>
        </ClusterDefinitionContext>
      </div>
    );
  }
}
