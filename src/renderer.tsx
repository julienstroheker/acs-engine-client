// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button, Col, Container, Navbar, NavbarBrand, Row } from "reactstrap";

import {
  ACSClusterDefinitionForm,
  ACSClusterDefinitionFormJSON,
} from "./components/ACSClusterDefinitionForm";
import { StdOut } from "./components/StdOut";
import { Context } from "./contexts";
import { ClusterDefinitionContext } from "./contexts/ClusterDefinitionContext";
import { outable, StdOutContext } from "./contexts/StdOutContext";
import { ACSEngine } from "./shared/ACSEngine";
import { IProperties } from "./types";

class App extends React.PureComponent {
  private checkAcsEngineButtonRef = React.createRef<HTMLButtonElement>();

  public componentDidMount() {
    this.checkAcsEngineButtonRef.current!.click();
  }

  public render() {
    return (
      <div className="App">
        <Context>
          <Navbar color="dark" dark expand="md" style={{ marginBottom: "1em" }}>
            <NavbarBrand>
              <span style={{ color: "white" }}>ACS Engine Client</span>
            </NavbarBrand>
          </Navbar>
          <Container fluid>
            <Row>
              <StdOutContext.Consumer>
                {state => (
                  <Col>
                    <span
                      ref={this.checkAcsEngineButtonRef}
                      onClick={this.checkACSEngine(state.log)}
                    >
                      <Button color="primary">Check for ACS-Engine</Button>
                    </span>
                    <Button color="info" onClick={this.callACSEngine(state.log)}>
                      Run ACS Engine
                    </Button>
                    <Button color="secondary" onClick={this.clearStdOut(state.update)}>
                      Clear stdout
                    </Button>
                  </Col>
                )}
              </StdOutContext.Consumer>
            </Row>
            <Row>
              <ClusterDefinitionContext.Consumer>
                {state => {
                  const clusterDefinition = {
                    apiVersion: state.clusterDefinition.get("apiVersion") as string,
                    properties: state.clusterDefinition.get("properties") as IProperties,
                  };
                  return [
                    <Col md={4} key="form">
                      <ACSClusterDefinitionForm
                        clusterDefinition={clusterDefinition}
                        update={state.update}
                      />
                    </Col>,
                    <Col md={4} key="json">
                      <ACSClusterDefinitionFormJSON clusterDefinition={clusterDefinition} />
                    </Col>,
                  ];
                }}
              </ClusterDefinitionContext.Consumer>
              <StdOutContext.Consumer>
                {state => (
                  <Col md={4}>
                    <StdOut stdout={state.stdout} />
                  </Col>
                )}
              </StdOutContext.Consumer>
            </Row>
          </Container>
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
