// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
import { AppBar, Button, Grid, Toolbar } from "material-ui";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  ACSClusterDefinitionForm,
  ACSClusterDefinitionFormJSON,
} from "./components/ACSClusterDefinitionForm";
import { StdOut } from "./components/StdOut";
import { Context } from "./contexts";
import { ClusterDefinitionContext } from "./contexts/ClusterDefinitionContext";
import { outable, StdOutContext } from "./contexts/StdOutContext";
import { ACSEngine } from "./shared/ACSEngine";

class App extends React.PureComponent {
  private checkAcsEngineButtonRef = React.createRef<HTMLButtonElement>();

  public componentDidMount() {
    this.checkAcsEngineButtonRef.current!.click();
  }

  public render() {
    return (
      <div className="App">
        <Context>
          <AppBar position="static">
            <Toolbar>ACS-Engine Client</Toolbar>
          </AppBar>
          <Grid container style={{ padding: "1em" }}>
            <Grid item>
              <StdOutContext.Consumer>
                {state => (
                  <Grid container spacing={8}>
                    <Grid item>
                      <span
                        ref={this.checkAcsEngineButtonRef}
                        onClick={this.checkACSEngine(state.log)}
                      >
                        <Button variant="raised" color="primary">
                          Check for ACS-Engine
                        </Button>
                      </span>
                    </Grid>
                    <Grid item>
                      <Button variant="raised" onClick={this.callACSEngine(state.log)}>
                        Run ACS Engine
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="raised"
                        color="secondary"
                        onClick={this.clearStdOut(state.update)}
                      >
                        Clear stdout
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </StdOutContext.Consumer>
            </Grid>
            <Grid container spacing={16}>
              <ClusterDefinitionContext.Consumer>
                {state => {
                  const clusterDefinition = {
                    apiVersion: state.clusterDefinition.apiVersion,
                    properties: state.clusterDefinition.properties,
                  };
                  return [
                    <Grid item md={4} key="form">
                      <ACSClusterDefinitionForm
                        clusterDefinition={clusterDefinition}
                        update={state.update}
                      />
                    </Grid>,
                    <Grid item md={4} key="json">
                      <ACSClusterDefinitionFormJSON clusterDefinition={clusterDefinition} />
                    </Grid>,
                  ];
                }}
              </ClusterDefinitionContext.Consumer>
              <StdOutContext.Consumer>
                {state => (
                  <Grid item md={4}>
                    <StdOut stdout={state.stdout} />
                  </Grid>
                )}
              </StdOutContext.Consumer>
            </Grid>
          </Grid>
        </Context>
      </div>
    );
  }

  private clearStdOut = (update: outable) => async () => {
    return update("");
  };

  private checkACSEngine = (log: outable) => async () => {
    await log(`Checking for 'acs-engine' in ${ACSEngine.getACSEnginePath()}`);
    const isInstalled = await ACSEngine.acsIsInstalled();
    await log(`Packaged acs-engine executable by electron process: ${isInstalled}\n`);
    if (isInstalled) {
      const version = await ACSEngine.getVersion();
      await log(`ACS Engine Version: ${version}`);
    } else {
      await log(
        `Error: acs-engine binary either not in project /lib folder or is not executable by electron process.`,
      );
    }
  };

  private callACSEngine = (log: outable) => async () => {
    const stdout = await ACSEngine.call();
    return log(stdout);
  };
}

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
