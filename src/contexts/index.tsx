import * as React from "react";
import { ClusterDefinitionContext } from "./ClusterDefinitionContext";
import { StdOutContext } from "./StdOutContext";

export const Context = (props: React.Props<any>) => (
  <div className="Context">
    <ClusterDefinitionContext>
      <StdOutContext>{props.children}</StdOutContext>
    </ClusterDefinitionContext>
  </div>
);
