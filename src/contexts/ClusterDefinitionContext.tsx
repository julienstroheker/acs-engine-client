import { Map } from "immutable";
import * as React from "react";
import { IProperties } from "../types";

interface IClusterDefinitionContextState {
  clusterDefinition: Map<string, string | IProperties>;
  update: (keyPath: string[], value: any) => Promise<any>;
}

export class ClusterDefinitionContext extends React.Component<any, IClusterDefinitionContextState> {
  private static Context = React.createContext<IClusterDefinitionContextState>();

  public static get Consumer(): React.Consumer<IClusterDefinitionContextState> {
    // DANGEROUS: assume that top App is contains the top level provider
    return this.Context.Consumer as React.Consumer<IClusterDefinitionContextState>;
  }

  public state: IClusterDefinitionContextState = {
    // tslint:disable
    clusterDefinition: Map({
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
    }),
    // tslint:enable
    update: async (keyPath: string[], value: any) => {
      console.log(keyPath, value);
      return new Promise(resolve =>
        this.setState(
          { clusterDefinition: this.state.clusterDefinition.setIn(keyPath, value) },
          () => resolve(value),
        ),
      );
    },
  };

  public render() {
    const { Provider } = ClusterDefinitionContext.Context;
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}
