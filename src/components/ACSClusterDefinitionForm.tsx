import hljs from "highlight.js";
import { JSONSchema6 } from "json-schema";
import React from "react";
import Form from "react-jsonschema-form";
import { Util } from "../shared/Util";
import { IClusterDefinition } from "../types";

/**
 * JSON Schema generated via TypeScript typings conversion of IClusterDefinition
 * Manual alterations done
 *
 * @see https://github.com/YousefED/typescript-json-schema
 * @example typescript-json-schema tsconfig.json IClusterDefinition
 */
const k8sSchema: JSONSchema6 = {
  $schema: "http://json-schema.org/draft-06/schema#",
  definitions: {
    IAADProfile: {
      description: "AADProfile specifies attributes for AAD integration",
      properties: {
        adminGroupID: {
          type: "string",
        },
        clientAppID: {
          type: "string",
        },
        serverAppID: {
          type: "string",
        },
        tenantID: {
          type: "string",
        },
      },
      type: "object",
    },
    IAgentPoolProfile: {
      description: "AgentPoolProfile represents an agent pool definition",
      properties: {
        availabilityProfile: {
          type: "string",
        },
        count: {
          type: "number",
        },
        diskSizesGB: {
          items: {
            type: "number",
          },
          type: "array",
        },
        distro: {
          description: "Distro represents Linux distro to use for Linux VMs",
          type: "string",
        },
        dnsPrefix: {
          type: "string",
        },
        extensions: {
          items: {
            $ref: "#/definitions/IExtension",
          },
          type: "array",
        },
        fqdn: {
          type: "string",
        },
        ipAddressCount: {
          type: "number",
        },
        kubernetesConfig: {
          $ref: "#/definitions/IKubernetesConfig",
          description:
            "KubernetesConfig contains the Kubernetes config structure, containing\nKubernetes specific configuration",
        },
        name: {
          type: "string",
        },
        osDiskSizeGB: {
          type: "number",
        },
        osType: {
          description: "OSType represents OS types of agents",
          type: "string",
        },
        ports: {
          items: {
            type: "number",
          },
          type: "array",
        },
        preProvisionExtension: {
          $ref: "#/definitions/IExtension",
          description:
            "Extension represents an extension definition in the master or agentPoolProfile",
        },
        storageProfile: {
          type: "string",
        },
        subnet: {
          type: "string",
        },
        vmSize: {
          type: "string",
        },
        vnetSubnetID: {
          type: "string",
        },
      },
      type: "object",
    },
    ICertificateProfile: {
      description:
        'CertificateProfile represents the definition of the master cluster\nThe JSON parameters could be either a plain text, or referenced to a secret in a keyvault.\nIn the latter case, the format of the parameter\'s value should be\n"/subscriptions/<SUB_ID>/resourceGroups/<RG_NAME>/providers/Microsoft.KeyVault/vaults/<KV_NAME>/secrets/<NAME>[/<VERSION>]"\nwhere:\n    <SUB_ID> is the subscription ID of the keyvault\n    <RG_NAME> is the resource group of the keyvault\n    <KV_NAME> is the name of the keyvault\n    <NAME> is the name of the secret\n    <VERSION> (optional) is the version of the secret (default: the latest version)',
      properties: {
        apiServerCertificate: {
          type: "string",
        },
        apiServerPrivateKey: {
          type: "string",
        },
        caCertificate: {
          type: "string",
        },
        caPrivateKey: {
          type: "string",
        },
        clientCertificate: {
          type: "string",
        },
        clientPrivateKey: {
          type: "string",
        },
        etcdClientCertificate: {
          type: "string",
        },
        etcdClientPrivateKey: {
          type: "string",
        },
        etcdPeerCertificates: {
          items: {
            type: "string",
          },
          type: "array",
        },
        etcdPeerPrivateKeys: {
          items: {
            type: "string",
          },
          type: "array",
        },
        etcdServerCertificate: {
          type: "string",
        },
        etcdServerPrivateKey: {
          type: "string",
        },
        kubeConfigCertificate: {
          type: "string",
        },
        kubeConfigPrivateKey: {
          type: "string",
        },
      },
      type: "object",
    },
    IDcosConfig: {
      description: "DcosConfig Configuration for DC/OS",
      properties: {
        dcosBootstrapURL: {
          type: "string",
        },
        dcosWindowsBootstrapURL: {
          type: "string",
        },
      },
      type: "object",
    },
    IExtension: {
      description: "Extension represents an extension definition in the master or agentPoolProfile",
      properties: {
        name: {
          type: "string",
        },
        singleOrAll: {
          type: "string",
        },
        template: {
          type: "string",
        },
      },
      type: "object",
    },
    IExtensionProfile: {
      description: "ExtensionProfile represents an extension definition",
      properties: {
        extensionParameters: {
          type: "string",
        },
        name: {
          type: "string",
        },
        parametersKeyvaultSecretRef: {
          $ref: "#/definitions/IKeyvaultSecretRef",
          description:
            "KeyvaultSecretRef is a reference to a secret in a keyvault.\nThe format of 'VaultID' value should be\n\"/subscriptions/<SUB_ID>/resourceGroups/<RG_NAME>/providers/Microsoft.KeyVault/vaults/<KV_NAME>\"\nwhere:\n    <SUB_ID> is the subscription ID of the keyvault\n    <RG_NAME> is the resource group of the keyvault\n    <KV_NAME> is the name of the keyvault\nThe 'SecretName' is the name of the secret in the keyvault\nThe 'SecretVersion' (optional) is the version of the secret (default: the latest version)",
        },
        rootURL: {
          type: "string",
        },
        script: {
          type: "string",
        },
        urlQuery: {
          type: "string",
        },
        version: {
          type: "string",
        },
      },
      type: "object",
    },
    IKeyVaultCertificate: {
      properties: {
        certificateStore: {
          type: "string",
        },
        certificateUrl: {
          type: "string",
        },
      },
      type: "object",
    },
    IKeyVaultID: {
      description: "KeyVaultID specifies a key vault",
      properties: {
        id: {
          type: "string",
        },
      },
      type: "object",
    },
    IKeyVaultSecrets: {
      description:
        "KeyVaultSecrets specifies certificates to install on the pool\nof machines from a given key vault\nthe key vault specified must have been granted read permissions to CRP",
      properties: {
        sourceVault: {
          $ref: "#/definitions/IKeyVaultID",
          description: "KeyVaultID specifies a key vault",
        },
        vaultCertificates: {
          items: {
            $ref: "#/definitions/IKeyVaultCertificate",
          },
          type: "array",
        },
      },
      type: "object",
    },
    IKeyvaultSecretRef: {
      description:
        "KeyvaultSecretRef is a reference to a secret in a keyvault.\nThe format of 'VaultID' value should be\n\"/subscriptions/<SUB_ID>/resourceGroups/<RG_NAME>/providers/Microsoft.KeyVault/vaults/<KV_NAME>\"\nwhere:\n    <SUB_ID> is the subscription ID of the keyvault\n    <RG_NAME> is the resource group of the keyvault\n    <KV_NAME> is the name of the keyvault\nThe 'SecretName' is the name of the secret in the keyvault\nThe 'SecretVersion' (optional) is the version of the secret (default: the latest version)",
      properties: {
        secretName: {
          type: "string",
        },
        vaultID: {
          type: "string",
        },
        version: {
          type: "string",
        },
      },
      type: "object",
    },
    IKubernetesAddon: {
      description:
        "KubernetesAddon defines a list of addons w/ configuration to include with the cluster deployment",
      properties: {
        containers: {
          items: {
            $ref: "#/definitions/IKubernetesContainerSpec",
          },
          type: "array",
        },
        enabled: {
          type: "boolean",
        },
        name: {
          enum: ["kubernetes-dashboard", "rescheduler", "tiller"],
          type: "string",
        },
      },
      type: "object",
    },
    IKubernetesConfig: {
      description:
        "KubernetesConfig contains the Kubernetes config structure, containing\nKubernetes specific configuration",
      properties: {
        addons: {
          items: {
            $ref: "#/definitions/IKubernetesAddon",
          },
          type: "array",
        },
        apiServerConfig: {
          properties: {
            "--admission-control": {
              type: "string",
            },
            "--audit-log-maxage": {
              type: "string",
            },
            "--audit-log-maxbackup": {
              type: "string",
            },
            "--audit-log-maxsize": {
              type: "string",
            },
            "--authorization-mode": {
              type: "string",
            },
            "--feature-gates": {
              type: "string",
            },
            "--oidc-client-id": {
              type: "string",
            },
            "--oidc-groups-claim": {
              type: "string",
            },
            "--oidc-issuer-url": {
              type: "string",
            },
            "--oidc-username-claim": {
              type: "string",
            },
          },
          type: "object",
        },
        cloudControllerManagerConfig: {
          properties: {
            "--route-reconciliation-period": {
              type: "string",
            },
          },
          type: "object",
        },
        cloudProviderBackoff: {
          type: "boolean",
        },
        cloudProviderBackoffDuration: {
          type: "number",
        },
        cloudProviderBackoffExponent: {
          type: "number",
        },
        cloudProviderBackoffJitter: {
          type: "number",
        },
        cloudProviderBackoffRetries: {
          type: "number",
        },
        cloudProviderRateLimit: {
          type: "boolean",
        },
        cloudProviderRateLimitBucket: {
          type: "number",
        },
        cloudProviderRateLimitQPS: {
          type: "number",
        },
        clusterSubnet: {
          type: "string",
        },
        containerRuntime: {
          type: "string",
        },
        controllerManagerConfig: {
          properties: {
            "--feature-gates": {
              type: "string",
            },
            "--node-monitor-grace-period": {
              type: "string",
            },
            "--pod-eviction-timeout": {
              type: "string",
            },
            "--route-reconciliation-period": {
              type: "string",
            },
            "--terminated-pod-gc-threshold": {
              type: "string",
            },
          },
          type: "object",
        },
        customCcmImage: {
          type: "string",
        },
        customHyperkubeImage: {
          type: "string",
        },
        dnsServiceIP: {
          type: "string",
        },
        dockerBridgeSubnet: {
          type: "string",
        },
        dockerEngineVersion: {
          type: "string",
        },
        enableAggregatedAPIs: {
          type: "boolean",
        },
        enableDataEncryptionAtRest: {
          type: "boolean",
        },
        enablePodSecurityPolicy: {
          type: "boolean",
        },
        enableRbac: {
          type: "boolean",
        },
        enableSecureKubelet: {
          type: "boolean",
        },
        etcdDiskSizeGB: {
          type: "string",
        },
        etcdVersion: {
          type: "string",
        },
        gchighthreshold: {
          type: "number",
        },
        gclowthreshold: {
          type: "number",
        },
        kubeletConfig: {
          properties: {
            "--azure-container-registry-config": {
              type: "string",
            },
            "--cloud-config": {
              type: "string",
            },
            "--cloud-provider": {
              type: "string",
            },
            "--cluster-domain": {
              type: "string",
            },
            "--eviction-hard": {
              type: "string",
            },
            "--feature-gates": {
              type: "string",
            },
            "--image-gc-high-threshold": {
              type: "string",
            },
            "--image-gc-low-threshold": {
              type: "string",
            },
            "--max-pods": {
              type: "string",
            },
            "--node-status-update-frequency": {
              type: "string",
            },
            "--non-masquerade-cidr": {
              type: "string",
            },
            "--pod-infra-container-image": {
              type: "string",
            },
          },
          type: "object",
        },
        kubernetesImageBase: {
          type: "string",
        },
        maxPods: {
          type: "number",
        },
        networkPolicy: {
          type: "string",
        },
        serviceCidr: {
          type: "string",
        },
        useCloudControllerManager: {
          type: "boolean",
        },
        useInstanceMetadata: {
          type: "boolean",
        },
        useManagedIdentity: {
          type: "boolean",
        },
      },
      type: "object",
    },
    IKubernetesContainerSpec: {
      description: "KubernetesContainerSpec defines configuration for a container spec",
      properties: {
        cpuLimits: {
          type: "string",
        },
        cpuRequests: {
          type: "string",
        },
        image: {
          type: "string",
        },
        memoryLimits: {
          type: "string",
        },
        memoryRequests: {
          type: "string",
        },
        name: {
          type: "string",
        },
      },
      type: "object",
    },
    ILinuxProfile: {
      description: "LinuxProfile represents the linux parameters passed to the cluster",
      properties: {
        adminUsername: {
          type: "string",
        },
        scriptroot: {
          type: "string",
        },
        secrets: {
          items: {
            $ref: "#/definitions/IKeyVaultSecrets",
          },
          type: "array",
        },
        ssh: {
          properties: {
            publicKeys: {
              items: {
                properties: {
                  keyData: {
                    type: "string",
                  },
                },
                type: "object",
              },
              type: "array",
            },
          },
          type: "object",
        },
      },
      type: "object",
    },
    IMasterProfile: {
      description: "MasterProfile represents the definition of the master cluster",
      properties: {
        HTTPSourceAddressPrefix: {
          type: "string",
        },
        count: {
          type: "number",
        },
        distro: {
          description: "Distro represents Linux distro to use for Linux VMs",
          type: "string",
        },
        dnsPrefix: {
          type: "string",
        },
        extensions: {
          items: {
            $ref: "#/definitions/IExtension",
          },
          type: "array",
        },
        firstConsecutiveStaticIP: {
          type: "string",
        },
        fqdn: {
          type: "string",
        },
        ipAddressCount: {
          type: "number",
        },
        kubernetesConfig: {
          $ref: "#/definitions/IKubernetesConfig",
          description:
            "KubernetesConfig contains the Kubernetes config structure, containing\nKubernetes specific configuration",
        },
        oauthEnabled: {
          type: "boolean",
        },
        osDiskSizeGB: {
          type: "number",
        },
        preProvisionExtension: {
          $ref: "#/definitions/IExtension",
          description:
            "Extension represents an extension definition in the master or agentPoolProfile",
        },
        storageProfile: {
          type: "string",
        },
        subnet: {
          type: "string",
        },
        vmSize: {
          type: "string",
        },
        vnetCidr: {
          type: "string",
        },
        vnetSubnetID: {
          type: "string",
        },
      },
      type: "object",
    },
    IOrchestratorProfile: {
      description: "OrchestratorProfile contains Orchestrator properties",
      properties: {
        dcosConfig: {
          $ref: "#/definitions/IDcosConfig",
          description: "DcosConfig Configuration for DC/OS",
        },
        kubernetesConfig: {
          $ref: "#/definitions/IKubernetesConfig",
          description:
            "KubernetesConfig contains the Kubernetes config structure, containing\nKubernetes specific configuration",
        },
        orchestratorRelease: {
          type: "string",
        },
        orchestratorType: {
          type: "string",
        },
        orchestratorVersion: {
          type: "string",
        },
      },
      type: "object",
    },
    IProperties: {
      description: "Properties represents the ACS cluster definition",
      properties: {
        aadProfile: {
          $ref: "#/definitions/IAADProfile",
          description: "AADProfile specifies attributes for AAD integration",
        },
        agentPoolProfiles: {
          items: {
            $ref: "#/definitions/IAgentPoolProfile",
          },
          type: "array",
        },
        certificateProfile: {
          $ref: "#/definitions/ICertificateProfile",
          description:
            'CertificateProfile represents the definition of the master cluster\nThe JSON parameters could be either a plain text, or referenced to a secret in a keyvault.\nIn the latter case, the format of the parameter\'s value should be\n"/subscriptions/<SUB_ID>/resourceGroups/<RG_NAME>/providers/Microsoft.KeyVault/vaults/<KV_NAME>/secrets/<NAME>[/<VERSION>]"\nwhere:\n    <SUB_ID> is the subscription ID of the keyvault\n    <RG_NAME> is the resource group of the keyvault\n    <KV_NAME> is the name of the keyvault\n    <NAME> is the name of the secret\n    <VERSION> (optional) is the version of the secret (default: the latest version)',
        },
        extensionProfiles: {
          items: {
            $ref: "#/definitions/IExtensionProfile",
          },
          type: "array",
        },
        linuxProfile: {
          $ref: "#/definitions/ILinuxProfile",
        },
        masterProfile: {
          $ref: "#/definitions/IMasterProfile",
        },
        orchestratorProfile: {
          $ref: "#/definitions/IOrchestratorProfile",
        },
        provisioningState: {
          description:
            "ProvisioningState represents the current state of container service resource.",
          type: "string",
        },
        servicePrincipalProfile: {
          $ref: "#/definitions/IServicePrincipalProfile",
          description:
            "ServicePrincipalProfile contains the client and secret used by the cluster for Azure Resource CRUD\nThe 'Secret' and 'KeyvaultSecretRef' parameters are mutually exclusive\nThe 'Secret' parameter should be a secret in plain text.\nThe 'KeyvaultSecretRef' parameter is a reference to a secret in a keyvault.",
        },
        windowsProfile: {
          $ref: "#/definitions/IWindowsProfile",
          description: "WindowsProfile represents the windows parameters passed to the cluster",
        },
      },
      type: "object",
    },
    IServicePrincipalProfile: {
      description:
        "ServicePrincipalProfile contains the client and secret used by the cluster for Azure Resource CRUD\nThe 'Secret' and 'KeyvaultSecretRef' parameters are mutually exclusive\nThe 'Secret' parameter should be a secret in plain text.\nThe 'KeyvaultSecretRef' parameter is a reference to a secret in a keyvault.",
      properties: {
        clientId: {
          type: "string",
        },
        keyvaultSecretRef: {
          $ref: "#/definitions/IKeyvaultSecretRef",
          description:
            "KeyvaultSecretRef is a reference to a secret in a keyvault.\nThe format of 'VaultID' value should be\n\"/subscriptions/<SUB_ID>/resourceGroups/<RG_NAME>/providers/Microsoft.KeyVault/vaults/<KV_NAME>\"\nwhere:\n    <SUB_ID> is the subscription ID of the keyvault\n    <RG_NAME> is the resource group of the keyvault\n    <KV_NAME> is the name of the keyvault\nThe 'SecretName' is the name of the secret in the keyvault\nThe 'SecretVersion' (optional) is the version of the secret (default: the latest version)",
        },
        secret: {
          type: "string",
        },
      },
      type: "object",
    },
    IWindowsProfile: {
      description: "WindowsProfile represents the windows parameters passed to the cluster",
      properties: {
        WindowsImageSourceUrl: {
          type: "string",
        },
        adminPassword: {
          type: "string",
        },
        adminUsername: {
          type: "string",
        },
        imageVersion: {
          type: "string",
        },
        secrets: {
          items: {
            $ref: "#/definitions/IKeyVaultSecrets",
          },
          type: "array",
        },
      },
      type: "object",
    },
  },
  description: "ACS-Engine Cluster Definition Model",
  properties: {
    apiVersion: {
      default: "vlabs",
      description: "ACS-Engine API Version",
      type: "string",
    },
    properties: {
      $ref: "#/definitions/IProperties",
    },
  },
  type: "object",
};

interface IACSClusterDefinitionFormJSON {
  clusterDefinition: IClusterDefinition;
}

export const ACSClusterDefinitionFormJSON = (props: IACSClusterDefinitionFormJSON) => {
  const { clusterDefinition } = props;
  const cleaned = Util.removeEmptyObjects(clusterDefinition);

  return (
    <div className="JSON">
      <h3>JSON</h3>
      <pre>
        <code
          dangerouslySetInnerHTML={{
            __html: hljs.highlight("json", JSON.stringify(cleaned, null, 2)).value,
          }}
        />
      </pre>
    </div>
  );
};

interface IACSClusterDefinitionForm {
  clusterDefinition: IClusterDefinition;
  update: (clusterDefn: IClusterDefinition) => Promise<any>;
}

class ClusterModelForm extends Form<IClusterDefinition> {}
export const ACSClusterDefinitionForm = (props: IACSClusterDefinitionForm) => {
  const { clusterDefinition, update } = props;

  return (
    <div className="ACSClusterDefinitionForm">
      <h3>ACS-Engine API Model</h3>
      <ClusterModelForm
        schema={k8sSchema}
        formData={clusterDefinition}
        onChange={({ formData }) => {
          const clean = JSON.parse(JSON.stringify(formData));
          update(clean);
        }}
      />
    </div>
  );
};
