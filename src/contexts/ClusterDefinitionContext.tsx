import * as React from "react";
import { IClusterDefinition } from "../types";

export interface IClusterDefinitionContextState {
  // clusterDefinition: Map<string, string | IProperties>;
  clusterDefinition: IClusterDefinition;
  update: (clusterDefinition: IClusterDefinition) => Promise<any>;
}

export class ClusterDefinitionContext extends React.Component<any, IClusterDefinitionContextState> {
  private static defaultState: IClusterDefinitionContextState = {
    // tslint:disable
    clusterDefinition: {
      apiVersion: "vlabs",
      properties: {
        orchestratorProfile: {
          orchestratorType: "Kubernetes",
          orchestratorRelease: "1.9",
          kubernetesConfig: {
            apiServerConfig: {
              "--admission-control":
                "NamespaceLifecycle,LimitRanger,ServiceAccount,DefaultStorageClass,DenyEscalatingExec,Initializers,MutatingAdmissionWebhook,ValidatingAdmissionWebhook,ResourceQuota",
              "--runtime-config": "admissionregistration.k8s.io/v1alpha1",
            },
          },
        },
        masterProfile: {
          count: 1,
          dnsPrefix: "",
          vmSize: "Standard_DS2_v2",
        },
        agentPoolProfiles: [
          {
            name: "agentpool1",
            count: 2,
            vmSize: "Standard_DS2_v2",
            availabilityProfile: "AvailabilitySet",
          },
        ],
        linuxProfile: {
          adminUsername: "azureuser",
          ssh: {
            publicKeys: [
              {
                keyData: "",
              },
            ],
          },
        },
        servicePrincipalProfile: {
          clientId: "",
          secret: "",
        },
      },
    },
    // tslint:enable
    update: () => Promise.reject(new Error("update() not set in react instance state")),
  };

  private static _context: React.Context<IClusterDefinitionContextState>;

  private static get Context() {
    if (!this._context) {
      this._context = React.createContext<IClusterDefinitionContextState>(this.defaultState);
    }
    return this._context;
  }

  public static get Consumer(): React.Consumer<IClusterDefinitionContextState> {
    // DANGEROUS: assume that top App is contains the top level provider
    return this.Context.Consumer as React.Consumer<IClusterDefinitionContextState>;
  }

  public state: IClusterDefinitionContextState = {
    ...ClusterDefinitionContext.defaultState,
    update: async clusterDefinition => {
      console.log(clusterDefinition);
      return new Promise(resolve =>
        this.setState({ clusterDefinition }, () => resolve(clusterDefinition)),
      );
    },
  };

  public render() {
    const { Provider } = ClusterDefinitionContext.Context;
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}
