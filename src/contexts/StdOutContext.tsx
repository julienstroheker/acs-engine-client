import * as React from "react";

export type outable = (value: string) => Promise<any>;

interface IProps {
  onMount?: () => Promise<any>;
}

interface IState {
  log: outable;
  stdout: string;
  update: outable;
}

export class StdOutContext extends React.Component<IProps, IState> {
  private static Context = React.createContext<IState>();

  public static get Consumer() {
    return this.Context.Consumer as React.Consumer<IState>;
  }

  public state: IState = {
    log: async (out: string) =>
      new Promise(resolve => {
        const time = new Date().toLocaleTimeString();
        const withNewLine: string = !!out.match(/\n$/) ? out : out + "\n";
        const stdout: string = this.state.stdout + time + ": " + withNewLine;
        this.setState({ ...this.state, stdout }, () => resolve(this.state.stdout));
      }),
    stdout: "",
    update: async (stdout: string) =>
      new Promise(resolve => this.setState({ ...this.state, stdout }, () => resolve(stdout))),
  };

  public render() {
    const { Provider } = StdOutContext.Context;
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}
