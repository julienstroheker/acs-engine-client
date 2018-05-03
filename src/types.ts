/**
 * Typings for ACS-Engine based on the Go typings found in d5ec309 and cluster definition docs
 * @see https://raw.githubusercontent.com/Azure/acs-engine/master/pkg/api/vlabs/types.go
 * @see https://github.com/Azure/acs-engine/commit/d5ec309f5295903008c2a7a345d15991dd9d4e21
 * @see https://github.com/Azure/acs-engine/blob/master/docs/clusterdefinition.md
 *
 * @author Evan Louie <evan.louie@microsoft.com> (https://evanlouie.com)
 */

/**
 * AADProfile specifies attributes for AAD integration
 */
export interface IAADProfile {
  clientAppID?: string;
  serverAppID?: string;
  tenantID?: string;
  adminGroupID?: string;
}

/**
 * AgentPoolProfile represents an agent pool definition
 */
export interface IAgentPoolProfile {
  name: string;
  count: number;
  vmSize: string;
  osDiskSizeGB?: number;
  dnsPrefix?: string;
  osType?: OSType;
  ports?: number[];
  availabilityProfile?: string;
  storageProfile?: string;
  diskSizesGB?: number[];
  vnetSubnetID?: string;
  ipAddressCount?: number;
  distro?: Distro;
  kubernetesConfig?: IKubernetesConfig;
  subnet?: string;
  fqdn?: string;
  // customNodeLabels?: { [key: string]: string };
  preProvisionExtension?: IExtension;
  extensions?: IExtension[];
}

/**
 * CertificateProfile represents the definition of the master cluster
 * The JSON parameters could be either a plain text, or referenced to a secret in a keyvault.
 * In the latter case, the format of the parameter's value should be
 * "/subscriptions/<SUB_ID>/resourceGroups/<RG_NAME>/providers/Microsoft.KeyVault/vaults/<KV_NAME>/secrets/<NAME>[/<VERSION>]"
 * where:
 *    <SUB_ID> is the subscription ID of the keyvault
 *    <RG_NAME> is the resource group of the keyvault
 *    <KV_NAME> is the name of the keyvault
 *    <NAME> is the name of the secret
 *    <VERSION> (optional) is the version of the secret (default: the latest version)
 */
export interface ICertificateProfile {
  caCertificate?: string;
  caPrivateKey?: string;
  apiServerCertificate?: string;
  apiServerPrivateKey?: string;
  clientCertificate?: string;
  clientPrivateKey?: string;
  kubeConfigCertificate?: string;
  kubeConfigPrivateKey?: string;
  etcdServerCertificate?: string;
  etcdServerPrivateKey?: string;
  etcdClientCertificate?: string;
  etcdClientPrivateKey?: string;
  etcdPeerCertificates?: string[];
  etcdPeerPrivateKeys?: string[];
}

// /**
//  * ClassicAgentPoolProfileType represents types of classic profiles
//  */
// type ClassicAgentPoolProfileType = string;

/**
 * CloudProviderConfig contains the KubernetesConfig parameters specific to the Cloud Provider
 * TODO use this when strict JSON checking accommodates struct embedding
 */
export interface ICloudProviderConfig {
  cloudProviderBackoff?: boolean;
  cloudProviderBackoffRetries?: number;
  cloudProviderBackoffJitter?: number;
  cloudProviderBackoffDuration?: number;
  cloudProviderBackoffExponent?: number;
  cloudProviderRateLimit?: boolean;
  cloudProviderRateLimitQPS?: number;
  cloudProviderRateLimitBucket?: number;
}

/**
 * ContainerService complies with the ARM model of
 * resource definition in a JSON template.
 */
export interface IContainerService {
  id?: string;
  location?: string;
  name?: string;
  plan?: IResourcePurchasePlan;
  tags?: { [key: string]: string };
  type?: string;
  properties?: IProperties;
}

/**
 * DcosConfig Configuration for DC/OS
 */
export interface IDcosConfig {
  dcosBootstrapURL?: string;
  dcosWindowsBootstrapURL?: string;
}

/**
 * Distro represents Linux distro to use for Linux VMs
 */
type Distro = string;

/**
 * Extension represents an extension definition in the master or agentPoolProfile
 */
export interface IExtension {
  name?: string;
  singleOrAll?: string;
  template?: string;
}

/**
 * ExtensionProfile represents an extension definition
 */
export interface IExtensionProfile {
  name?: string;
  version?: string;
  extensionParameters?: string;
  parametersKeyvaultSecretRef?: IKeyvaultSecretRef;
  rootURL?: string;
  script?: string;
  urlQuery?: string;
}

export interface IKeyVaultCertificate {
  certificateUrl?: string;
  certificateStore?: string;
}

/**
 * KeyVaultID specifies a key vault
 */
export interface IKeyVaultID {
  id?: string;
}

/**
 * KeyVaultSecrets specifies certificates to install on the pool
 * of machines from a given key vault
 * the key vault specified must have been granted read permissions to CRP
 */
export interface IKeyVaultSecrets {
  sourceVault?: IKeyVaultID;
  vaultCertificates?: IKeyVaultCertificate[];
}

/**
 * KeyvaultSecretRef is a reference to a secret in a keyvault.
 * The format of 'VaultID' value should be
 * "/subscriptions/<SUB_ID>/resourceGroups/<RG_NAME>/providers/Microsoft.KeyVault/vaults/<KV_NAME>"
 * where:
 *    <SUB_ID> is the subscription ID of the keyvault
 *    <RG_NAME> is the resource group of the keyvault
 *    <KV_NAME> is the name of the keyvault
 * The 'SecretName' is the name of the secret in the keyvault
 * The 'SecretVersion' (optional) is the version of the secret (default: the latest version)
 */
export interface IKeyvaultSecretRef {
  vaultID: string;
  secretName: string;
  version?: string;
}

/**
 * KubernetesAddon defines a list of addons w/ configuration to include with the cluster deployment
 */
export interface IKubernetesAddon {
  name?: "tiller" | "kubernetes-dashboard" | "rescheduler";
  enabled?: boolean;
  containers?: IKubernetesContainerSpec[];
  // config?: { [key: string]: string };
}

/**
 * KubernetesConfig contains the Kubernetes config structure, containing
 * Kubernetes specific configuration
 */
export interface IKubernetesConfig {
  kubernetesImageBase?: string;
  clusterSubnet?: string;
  dnsServiceIP?: string;
  serviceCidr?: string;
  networkPolicy?: string;
  containerRuntime?: string;
  maxPods?: number;
  dockerBridgeSubnet?: string;
  useManagedIdentity?: boolean;
  customHyperkubeImage?: string;
  dockerEngineVersion?: string;
  customCcmImage?: string;
  useCloudControllerManager?: boolean;
  useInstanceMetadata?: boolean;
  enableRbac?: boolean;
  enableSecureKubelet?: boolean;
  enableAggregatedAPIs?: boolean;
  gchighthreshold?: number;
  gclowthreshold?: number;
  etcdVersion?: string;
  etcdDiskSizeGB?: string;
  enableDataEncryptionAtRest?: boolean;
  enablePodSecurityPolicy?: boolean;
  addons?: IKubernetesAddon[];
  kubeletConfig?: {
    "--azure-container-registry-config"?: string;
    "--cloud-config"?: string;
    "--cloud-provider"?: string;
    "--cluster-domain"?: string;
    "--eviction-hard"?: string;
    "--feature-gates"?: string;
    "--image-gc-high-threshold"?: string;
    "--image-gc-low-threshold"?: string;
    "--max-pods"?: string;
    "--node-status-update-frequency"?: string;
    "--non-masquerade-cidr"?: string;
    "--pod-infra-container-image"?: string;
  };
  controllerManagerConfig?: {
    "--feature-gates"?: string;
    "--node-monitor-grace-period"?: string;
    "--pod-eviction-timeout"?: string;
    "--route-reconciliation-period"?: string;
    "--terminated-pod-gc-threshold"?: string;
  };
  cloudControllerManagerConfig?: {
    "--route-reconciliation-period"?: string;
  };
  apiServerConfig?: {
    "--admission-control"?: string;
    "--audit-log-maxage"?: string;
    "--audit-log-maxbackup"?: string;
    "--audit-log-maxsize"?: string;
    "--authorization-mode"?: string;
    "--feature-gates"?: string;
    "--oidc-client-id"?: string;
    "--oidc-groups-claim"?: string;
    "--oidc-issuer-url"?: string;
    "--oidc-username-claim"?: string;
    "--runtime-config"?: string; // Not in docs but in examples
  };
  cloudProviderBackoff?: boolean;
  cloudProviderBackoffRetries?: number;
  cloudProviderBackoffJitter?: number;
  cloudProviderBackoffDuration?: number;
  cloudProviderBackoffExponent?: number;
  cloudProviderRateLimit?: boolean;
  cloudProviderRateLimitQPS?: number;
  cloudProviderRateLimitBucket?: number;
}

/**
 * KubernetesContainerSpec defines configuration for a container spec
 */
export interface IKubernetesContainerSpec {
  name?: string;
  image?: string;
  cpuRequests?: string;
  memoryRequests?: string;
  cpuLimits?: string;
  memoryLimits?: string;
}

/**
 * LinuxProfile represents the linux parameters passed to the cluster
 */
export interface ILinuxProfile {
  adminUsername: string;
  // ssh: Object; // Not sure what should be
  ssh: { publicKeys: Array<{ keyData: string }> };
  secrets?: IKeyVaultSecrets[];
  scriptroot?: string;
}

/**
 * MasterProfile represents the definition of the master cluster
 */
export interface IMasterProfile {
  count: number;
  dnsPrefix: string;
  vmSize: string;
  osDiskSizeGB?: number;
  vnetSubnetID?: string;
  vnetCidr?: string;
  firstConsecutiveStaticIP?: string;
  ipAddressCount?: number;
  storageProfile?: string;
  HTTPSourceAddressPrefix?: string;
  oauthEnabled?: boolean;
  preProvisionExtension?: IExtension;
  extensions?: IExtension[];
  distro?: Distro;
  kubernetesConfig?: IKubernetesConfig;
  subnet?: string;
  fqdn?: string;
}

/**
 * OSType represents OS types of agents
 *
 */
type OSType = string;

/**
 * OrchestratorProfile contains Orchestrator properties
 */
export interface IOrchestratorProfile {
  orchestratorType: string;
  orchestratorRelease?: string;
  orchestratorVersion?: string;
  kubernetesConfig?: IKubernetesConfig;
  dcosConfig?: IDcosConfig;
}

/**
 * Properties represents the ACS cluster definition
 */
export interface IProperties {
  provisioningState?: ProvisioningState;
  orchestratorProfile: IOrchestratorProfile;
  masterProfile: IMasterProfile;
  agentPoolProfiles: IAgentPoolProfile[];
  linuxProfile: ILinuxProfile;
  extensionProfiles?: IExtensionProfile[];
  windowsProfile?: IWindowsProfile;
  servicePrincipalProfile?: IServicePrincipalProfile;
  certificateProfile?: ICertificateProfile;
  aadProfile?: IAADProfile;
}

/**
 * ProvisioningState represents the current state of container service resource.
 */
type ProvisioningState = string;

/**
 * PublicKey represents an SSH key for LinuxProfile
 */
export interface IPublicKey {
  keyData?: string;
}

/**
 * ResourcePurchasePlan defines resource plan as required by ARM
 * for billing purposes.
 */
export interface IResourcePurchasePlan {
  name?: string;
  product?: string;
  promotionCode?: string;
  publisher?: string;
}

/**
 * ServicePrincipalProfile contains the client and secret used by the cluster for Azure Resource CRUD
 * The 'Secret' and 'KeyvaultSecretRef' parameters are mutually exclusive
 * The 'Secret' parameter should be a secret in plain text.
 * The 'KeyvaultSecretRef' parameter is a reference to a secret in a keyvault.
 */
export interface IServicePrincipalProfile {
  clientId?: string;
  secret?: string;
  keyvaultSecretRef?: IKeyvaultSecretRef;
}

/**
 * WindowsProfile represents the windows parameters passed to the cluster
 */
export interface IWindowsProfile {
  adminUsername?: string;
  adminPassword?: string;
  imageVersion?: string;
  WindowsImageSourceUrl?: string;
  secrets?: IKeyVaultSecrets[];
}

////////////////////////////////////////////////////////////////////////////////
// Custom Types
////////////////////////////////////////////////////////////////////////////////

/**
 * ACS-Engine Cluster Definition Model
 */
export interface IClusterDefinition {
  apiVersion: string;
  properties: IProperties;
}
