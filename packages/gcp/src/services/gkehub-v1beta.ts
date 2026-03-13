// ==========================================================================
// GKE Hub API (gkehub v1beta)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "gkehub",
  version: "v1beta",
  rootUrl: "https://gkehub.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface IdentityServiceSimpleBindCredentials {
  /** Required. Input only. The password of the service account object/user. */
  password?: string;
  /** Output only. The encrypted password of the service account object/user. */
  encryptedPassword?: string;
  /** Required. The distinguished name(DN) of the service account object/user. */
  dn?: string;
}

export const IdentityServiceSimpleBindCredentials: Schema.Schema<IdentityServiceSimpleBindCredentials> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      password: Schema.optional(Schema.String),
      encryptedPassword: Schema.optional(Schema.String),
      dn: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "IdentityServiceSimpleBindCredentials",
  }) as any as Schema.Schema<IdentityServiceSimpleBindCredentials>;

export interface ConfigManagementPolicyControllerVersion {
  /** The gatekeeper image tag that is composed of ACM version, git tag, build number. */
  version?: string;
}

export const ConfigManagementPolicyControllerVersion: Schema.Schema<ConfigManagementPolicyControllerVersion> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      version: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ConfigManagementPolicyControllerVersion",
  }) as any as Schema.Schema<ConfigManagementPolicyControllerVersion>;

export interface ConfigManagementGatekeeperDeploymentState {
  /** Status of gatekeeper-audit deployment. */
  gatekeeperAudit?:
    | "DEPLOYMENT_STATE_UNSPECIFIED"
    | "NOT_INSTALLED"
    | "INSTALLED"
    | "ERROR"
    | "PENDING"
    | (string & {});
  /** Status of the pod serving the mutation webhook. */
  gatekeeperMutation?:
    | "DEPLOYMENT_STATE_UNSPECIFIED"
    | "NOT_INSTALLED"
    | "INSTALLED"
    | "ERROR"
    | "PENDING"
    | (string & {});
  /** Status of gatekeeper-controller-manager pod. */
  gatekeeperControllerManagerState?:
    | "DEPLOYMENT_STATE_UNSPECIFIED"
    | "NOT_INSTALLED"
    | "INSTALLED"
    | "ERROR"
    | "PENDING"
    | (string & {});
}

export const ConfigManagementGatekeeperDeploymentState: Schema.Schema<ConfigManagementGatekeeperDeploymentState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      gatekeeperAudit: Schema.optional(Schema.String),
      gatekeeperMutation: Schema.optional(Schema.String),
      gatekeeperControllerManagerState: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ConfigManagementGatekeeperDeploymentState",
  }) as any as Schema.Schema<ConfigManagementGatekeeperDeploymentState>;

export interface ConfigManagementPolicyControllerMigration {
  /** Stage of the migration. */
  stage?: "STAGE_UNSPECIFIED" | "ACM_MANAGED" | "POCO_MANAGED" | (string & {});
  /** Last time this membership spec was copied to PoCo feature. */
  copyTime?: string;
}

export const ConfigManagementPolicyControllerMigration: Schema.Schema<ConfigManagementPolicyControllerMigration> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      stage: Schema.optional(Schema.String),
      copyTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ConfigManagementPolicyControllerMigration",
  }) as any as Schema.Schema<ConfigManagementPolicyControllerMigration>;

export interface ConfigManagementPolicyControllerState {
  /** The version of Gatekeeper Policy Controller deployed. */
  version?: ConfigManagementPolicyControllerVersion;
  /** The state about the policy controller installation. */
  deploymentState?: ConfigManagementGatekeeperDeploymentState;
  /** Record state of ACM -> PoCo Hub migration for this feature. */
  migration?: ConfigManagementPolicyControllerMigration;
}

export const ConfigManagementPolicyControllerState: Schema.Schema<ConfigManagementPolicyControllerState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      version: Schema.optional(ConfigManagementPolicyControllerVersion),
      deploymentState: Schema.optional(
        ConfigManagementGatekeeperDeploymentState,
      ),
      migration: Schema.optional(ConfigManagementPolicyControllerMigration),
    }),
  ).annotate({
    identifier: "ConfigManagementPolicyControllerState",
  }) as any as Schema.Schema<ConfigManagementPolicyControllerState>;

export interface ConfigManagementHierarchyControllerConfig {
  /** Whether pod tree labels are enabled in this cluster. */
  enablePodTreeLabels?: boolean;
  /** Whether hierarchical resource quota is enabled in this cluster. */
  enableHierarchicalResourceQuota?: boolean;
  /** Whether Hierarchy Controller is enabled in this cluster. */
  enabled?: boolean;
}

export const ConfigManagementHierarchyControllerConfig: Schema.Schema<ConfigManagementHierarchyControllerConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      enablePodTreeLabels: Schema.optional(Schema.Boolean),
      enableHierarchicalResourceQuota: Schema.optional(Schema.Boolean),
      enabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "ConfigManagementHierarchyControllerConfig",
  }) as any as Schema.Schema<ConfigManagementHierarchyControllerConfig>;

export interface ConfigManagementOciConfig {
  /** Required. The OCI image repository URL for the package to sync from. e.g. `LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY_NAME/PACKAGE_NAME`. */
  syncRepo?: string;
  /** Optional. The Google Cloud Service Account Email used for auth when secret_type is `gcpserviceaccount`. */
  gcpServiceAccountEmail?: string;
  /** Required. Type of secret configured for access to the OCI repo. Must be one of `gcenode`, `gcpserviceaccount`, `k8sserviceaccount` or `none`. The validation of this is case-sensitive. */
  secretType?: string;
  /** Optional. Period in seconds between consecutive syncs. Default: 15. */
  syncWaitSecs?: string;
  /** Optional. The absolute path of the directory that contains the local resources. Default: the root directory of the image. */
  policyDir?: string;
}

export const ConfigManagementOciConfig: Schema.Schema<ConfigManagementOciConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      syncRepo: Schema.optional(Schema.String),
      gcpServiceAccountEmail: Schema.optional(Schema.String),
      secretType: Schema.optional(Schema.String),
      syncWaitSecs: Schema.optional(Schema.String),
      policyDir: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ConfigManagementOciConfig",
  }) as any as Schema.Schema<ConfigManagementOciConfig>;

export interface ConfigManagementGitConfig {
  /** Optional. Period in seconds between consecutive syncs. Default: 15. */
  syncWaitSecs?: string;
  /** Required. Type of secret configured for access to the Git repo. Must be one of `ssh`, `cookiefile`, `gcenode`, `token`, `gcpserviceaccount`, `githubapp` or `none`. The validation of this is case-sensitive. */
  secretType?: string;
  /** Optional. The path within the Git repository that represents the top level of the repo to sync. Default: the root directory of the repository. */
  policyDir?: string;
  /** Optional. URL for the HTTPS proxy to be used when communicating with the Git repo. Only specify when secret_type is `cookiefile`, `token`, or `none`. */
  httpsProxy?: string;
  /** Optional. Git revision (tag or hash) to check out. Default HEAD. */
  syncRev?: string;
  /** Required. The URL of the Git repository to use as the source of truth. */
  syncRepo?: string;
  /** Optional. The branch of the repository to sync from. Default: master. */
  syncBranch?: string;
  /** Optional. The Google Cloud Service Account Email used for auth when secret_type is `gcpserviceaccount`. */
  gcpServiceAccountEmail?: string;
}

export const ConfigManagementGitConfig: Schema.Schema<ConfigManagementGitConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      syncWaitSecs: Schema.optional(Schema.String),
      secretType: Schema.optional(Schema.String),
      policyDir: Schema.optional(Schema.String),
      httpsProxy: Schema.optional(Schema.String),
      syncRev: Schema.optional(Schema.String),
      syncRepo: Schema.optional(Schema.String),
      syncBranch: Schema.optional(Schema.String),
      gcpServiceAccountEmail: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ConfigManagementGitConfig",
  }) as any as Schema.Schema<ConfigManagementGitConfig>;

export interface ConfigManagementContainerOverride {
  /** Optional. The cpu limit of the container. Use the following CPU resource units: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#meaning-of-cpu. */
  cpuLimit?: string;
  /** Optional. The memory limit of the container. Use the following memory resource units: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#meaning-of-memory. */
  memoryLimit?: string;
  /** Required. The name of the container. */
  containerName?: string;
  /** Optional. The cpu request of the container. Use the following CPU resource units: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#meaning-of-cpu. */
  cpuRequest?: string;
  /** Optional. The memory request of the container. Use the following memory resource units: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#meaning-of-memory. */
  memoryRequest?: string;
}

export const ConfigManagementContainerOverride: Schema.Schema<ConfigManagementContainerOverride> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      cpuLimit: Schema.optional(Schema.String),
      memoryLimit: Schema.optional(Schema.String),
      containerName: Schema.optional(Schema.String),
      cpuRequest: Schema.optional(Schema.String),
      memoryRequest: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ConfigManagementContainerOverride",
  }) as any as Schema.Schema<ConfigManagementContainerOverride>;

export interface ConfigManagementDeploymentOverride {
  /** Required. The namespace of the deployment resource to be overridden. */
  deploymentNamespace?: string;
  /** Optional. The containers of the deployment resource to be overridden. */
  containers?: Array<ConfigManagementContainerOverride>;
  /** Required. The name of the deployment resource to be overridden. */
  deploymentName?: string;
}

export const ConfigManagementDeploymentOverride: Schema.Schema<ConfigManagementDeploymentOverride> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      deploymentNamespace: Schema.optional(Schema.String),
      containers: Schema.optional(
        Schema.Array(ConfigManagementContainerOverride),
      ),
      deploymentName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ConfigManagementDeploymentOverride",
  }) as any as Schema.Schema<ConfigManagementDeploymentOverride>;

export interface ConfigManagementConfigSync {
  /** Optional. Enables the installation of Config Sync. If set to true, the Feature will manage Config Sync resources, and apply the other ConfigSync fields if they exist. If set to false, the Feature will ignore all other ConfigSync fields and delete the Config Sync resources. If omitted, ConfigSync is considered enabled if the git or oci field is present. */
  enabled?: boolean;
  /** Optional. The Email of the Google Cloud Service Account (GSA) used for exporting Config Sync metrics to Cloud Monitoring and Cloud Monarch when Workload Identity is enabled. The GSA should have the Monitoring Metric Writer (roles/monitoring.metricWriter) IAM role. The Kubernetes ServiceAccount `default` in the namespace `config-management-monitoring` should be bound to the GSA. Deprecated: If Workload Identity Federation for GKE is enabled, Google Cloud Service Account is no longer needed for exporting Config Sync metrics: https://cloud.google.com/kubernetes-engine/enterprise/config-sync/docs/how-to/monitor-config-sync-cloud-monitoring#custom-monitoring. */
  metricsGcpServiceAccountEmail?: string;
  /** Optional. OCI repo configuration for the cluster */
  oci?: ConfigManagementOciConfig;
  /** Optional. Set to true to stop syncing configs for a single cluster. Default to false. */
  stopSyncing?: boolean;
  /** Optional. Specifies whether the Config Sync repo is in `hierarchical` or `unstructured` mode. Defaults to `hierarchical`. See https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/concepts/configs#organize-configs for an explanation. */
  sourceFormat?: string;
  /** Optional. Git repo configuration for the cluster. */
  git?: ConfigManagementGitConfig;
  /** Optional. Set to true to enable the Config Sync admission webhook to prevent drifts. If set to false, disables the Config Sync admission webhook and does not prevent drifts. Defaults to false. See https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/how-to/prevent-config-drift for details. */
  preventDrift?: boolean;
  /** Optional. Configuration for deployment overrides. Applies only to Config Sync deployments with containers that are not a root or namespace reconciler: `reconciler-manager`, `otel-collector`, `resource-group-controller-manager`, `admission-webhook`. To override a root or namespace reconciler, use the rootsync or reposync fields at https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/reference/rootsync-reposync-fields#override-resources instead. */
  deploymentOverrides?: Array<ConfigManagementDeploymentOverride>;
}

export const ConfigManagementConfigSync: Schema.Schema<ConfigManagementConfigSync> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      enabled: Schema.optional(Schema.Boolean),
      metricsGcpServiceAccountEmail: Schema.optional(Schema.String),
      oci: Schema.optional(ConfigManagementOciConfig),
      stopSyncing: Schema.optional(Schema.Boolean),
      sourceFormat: Schema.optional(Schema.String),
      git: Schema.optional(ConfigManagementGitConfig),
      preventDrift: Schema.optional(Schema.Boolean),
      deploymentOverrides: Schema.optional(
        Schema.Array(ConfigManagementDeploymentOverride),
      ),
    }),
  ).annotate({
    identifier: "ConfigManagementConfigSync",
  }) as any as Schema.Schema<ConfigManagementConfigSync>;

export interface ConfigManagementBinauthzConfig {
  /** Whether binauthz is enabled in this cluster. */
  enabled?: boolean;
}

export const ConfigManagementBinauthzConfig: Schema.Schema<ConfigManagementBinauthzConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      enabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "ConfigManagementBinauthzConfig",
  }) as any as Schema.Schema<ConfigManagementBinauthzConfig>;

export interface ConfigManagementPolicyControllerMonitoring {
  /** Specifies the list of backends Policy Controller will export to. An empty list would effectively disable metrics export. */
  backends?: Array<
    | "MONITORING_BACKEND_UNSPECIFIED"
    | "PROMETHEUS"
    | "CLOUD_MONITORING"
    | (string & {})
  >;
}

export const ConfigManagementPolicyControllerMonitoring: Schema.Schema<ConfigManagementPolicyControllerMonitoring> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      backends: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ConfigManagementPolicyControllerMonitoring",
  }) as any as Schema.Schema<ConfigManagementPolicyControllerMonitoring>;

export interface ConfigManagementPolicyController {
  /** Installs the default template library along with Policy Controller. */
  templateLibraryInstalled?: boolean;
  /** Monitoring specifies the configuration of monitoring. */
  monitoring?: ConfigManagementPolicyControllerMonitoring;
  /** Logs all denies and dry run failures. */
  logDeniesEnabled?: boolean;
  /** Sets the interval for Policy Controller Audit Scans (in seconds). When set to 0, this disables audit functionality altogether. */
  auditIntervalSeconds?: string;
  /** Enables the ability to use Constraint Templates that reference to objects other than the object currently being evaluated. */
  referentialRulesEnabled?: boolean;
  /** The set of namespaces that are excluded from Policy Controller checks. Namespaces do not need to currently exist on the cluster. */
  exemptableNamespaces?: Array<string>;
  /** Output only. Last time this membership spec was updated. */
  updateTime?: string;
  /** Enables the installation of Policy Controller. If false, the rest of PolicyController fields take no effect. */
  enabled?: boolean;
  /** Enable or disable mutation in policy controller. If true, mutation CRDs, webhook and controller deployment will be deployed to the cluster. */
  mutationEnabled?: boolean;
}

export const ConfigManagementPolicyController: Schema.Schema<ConfigManagementPolicyController> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      templateLibraryInstalled: Schema.optional(Schema.Boolean),
      monitoring: Schema.optional(ConfigManagementPolicyControllerMonitoring),
      logDeniesEnabled: Schema.optional(Schema.Boolean),
      auditIntervalSeconds: Schema.optional(Schema.String),
      referentialRulesEnabled: Schema.optional(Schema.Boolean),
      exemptableNamespaces: Schema.optional(Schema.Array(Schema.String)),
      updateTime: Schema.optional(Schema.String),
      enabled: Schema.optional(Schema.Boolean),
      mutationEnabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "ConfigManagementPolicyController",
  }) as any as Schema.Schema<ConfigManagementPolicyController>;

export interface ConfigManagementMembershipSpec {
  /** Optional. Deprecated: From version 1.21.0, automatic Feature management is unavailable, and Config Sync only supports manual upgrades. */
  management?:
    | "MANAGEMENT_UNSPECIFIED"
    | "MANAGEMENT_AUTOMATIC"
    | "MANAGEMENT_MANUAL"
    | (string & {});
  /** Optional. User-specified cluster name used by the Config Sync cluster-name-selector annotation or ClusterSelector object, for applying configs to only a subset of clusters. Read more about the cluster-name-selector annotation and ClusterSelector object at https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/how-to/cluster-scoped-objects#limiting-configs. Only set this field if a name different from the cluster's fleet membership name is used by the Config Sync cluster-name-selector annotation or ClusterSelector. */
  cluster?: string;
  /** Optional. Hierarchy Controller configuration for the cluster. Deprecated: Configuring Hierarchy Controller through the configmanagement feature is no longer recommended. Use https://github.com/kubernetes-sigs/hierarchical-namespaces instead. */
  hierarchyController?: ConfigManagementHierarchyControllerConfig;
  /** Optional. Config Sync configuration for the cluster. */
  configSync?: ConfigManagementConfigSync;
  /** Optional. Deprecated: Binauthz configuration will be ignored and should not be set. */
  binauthz?: ConfigManagementBinauthzConfig;
  /** Optional. Version of Config Sync to install. Defaults to the latest supported Config Sync version if the config_sync field is enabled. See supported versions at https://cloud.google.com/kubernetes-engine/config-sync/docs/get-support-config-sync#version_support_policy. */
  version?: string;
  /** Optional. Policy Controller configuration for the cluster. Deprecated: Configuring Policy Controller through the configmanagement feature is no longer recommended. Use the policycontroller feature instead. */
  policyController?: ConfigManagementPolicyController;
}

export const ConfigManagementMembershipSpec: Schema.Schema<ConfigManagementMembershipSpec> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      management: Schema.optional(Schema.String),
      cluster: Schema.optional(Schema.String),
      hierarchyController: Schema.optional(
        ConfigManagementHierarchyControllerConfig,
      ),
      configSync: Schema.optional(ConfigManagementConfigSync),
      binauthz: Schema.optional(ConfigManagementBinauthzConfig),
      version: Schema.optional(Schema.String),
      policyController: Schema.optional(ConfigManagementPolicyController),
    }),
  ).annotate({
    identifier: "ConfigManagementMembershipSpec",
  }) as any as Schema.Schema<ConfigManagementMembershipSpec>;

export interface ConfigManagementGroupVersionKind {
  /** Kubernetes Kind */
  kind?: string;
  /** Kubernetes Version */
  version?: string;
  /** Kubernetes Group */
  group?: string;
}

export const ConfigManagementGroupVersionKind: Schema.Schema<ConfigManagementGroupVersionKind> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      version: Schema.optional(Schema.String),
      group: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ConfigManagementGroupVersionKind",
  }) as any as Schema.Schema<ConfigManagementGroupVersionKind>;

export interface ConfigManagementErrorResource {
  /** Metadata name of the resource that is causing an error */
  resourceName?: string;
  /** Namespace of the resource that is causing an error */
  resourceNamespace?: string;
  /** Path in the git repo of the erroneous config */
  sourcePath?: string;
  /** Group/version/kind of the resource that is causing an error */
  resourceGvk?: ConfigManagementGroupVersionKind;
}

export const ConfigManagementErrorResource: Schema.Schema<ConfigManagementErrorResource> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resourceName: Schema.optional(Schema.String),
      resourceNamespace: Schema.optional(Schema.String),
      sourcePath: Schema.optional(Schema.String),
      resourceGvk: Schema.optional(ConfigManagementGroupVersionKind),
    }),
  ).annotate({
    identifier: "ConfigManagementErrorResource",
  }) as any as Schema.Schema<ConfigManagementErrorResource>;

export interface ConfigManagementSyncError {
  /** An ACM defined error code */
  code?: string;
  /** A list of config(s) associated with the error, if any */
  errorResources?: Array<ConfigManagementErrorResource>;
  /** A description of the error */
  errorMessage?: string;
}

export const ConfigManagementSyncError: Schema.Schema<ConfigManagementSyncError> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      code: Schema.optional(Schema.String),
      errorResources: Schema.optional(
        Schema.Array(ConfigManagementErrorResource),
      ),
      errorMessage: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ConfigManagementSyncError",
  }) as any as Schema.Schema<ConfigManagementSyncError>;

export interface ConfigManagementSyncState {
  /** A list of errors resulting from problematic configs. This list will be truncated after 100 errors, although it is unlikely for that many errors to simultaneously exist. */
  errors?: Array<ConfigManagementSyncError>;
  /** Deprecated: use last_sync_time instead. Timestamp of when ACM last successfully synced the repo The time format is specified in https://golang.org/pkg/time/#Time.String */
  lastSync?: string;
  /** Token indicating the state of the importer. */
  importToken?: string;
  /** Timestamp type of when ACM last successfully synced the repo */
  lastSyncTime?: string;
  /** Token indicating the state of the repo. */
  sourceToken?: string;
  /** Token indicating the state of the syncer. */
  syncToken?: string;
  /** Sync status code */
  code?:
    | "SYNC_CODE_UNSPECIFIED"
    | "SYNCED"
    | "PENDING"
    | "ERROR"
    | "NOT_CONFIGURED"
    | "NOT_INSTALLED"
    | "UNAUTHORIZED"
    | "UNREACHABLE"
    | (string & {});
}

export const ConfigManagementSyncState: Schema.Schema<ConfigManagementSyncState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      errors: Schema.optional(Schema.Array(ConfigManagementSyncError)),
      lastSync: Schema.optional(Schema.String),
      importToken: Schema.optional(Schema.String),
      lastSyncTime: Schema.optional(Schema.String),
      sourceToken: Schema.optional(Schema.String),
      syncToken: Schema.optional(Schema.String),
      code: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ConfigManagementSyncState",
  }) as any as Schema.Schema<ConfigManagementSyncState>;

export interface ConfigManagementConfigSyncError {
  /** A string representing the user facing error message */
  errorMessage?: string;
}

export const ConfigManagementConfigSyncError: Schema.Schema<ConfigManagementConfigSyncError> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      errorMessage: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ConfigManagementConfigSyncError",
  }) as any as Schema.Schema<ConfigManagementConfigSyncError>;

export interface ConfigManagementConfigSyncDeploymentState {
  /** Deployment state of reconciler-manager pod */
  reconcilerManager?:
    | "DEPLOYMENT_STATE_UNSPECIFIED"
    | "NOT_INSTALLED"
    | "INSTALLED"
    | "ERROR"
    | "PENDING"
    | (string & {});
  /** Deployment state of the syncer pod */
  syncer?:
    | "DEPLOYMENT_STATE_UNSPECIFIED"
    | "NOT_INSTALLED"
    | "INSTALLED"
    | "ERROR"
    | "PENDING"
    | (string & {});
  /** Deployment state of admission-webhook */
  admissionWebhook?:
    | "DEPLOYMENT_STATE_UNSPECIFIED"
    | "NOT_INSTALLED"
    | "INSTALLED"
    | "ERROR"
    | "PENDING"
    | (string & {});
  /** Deployment state of the importer pod */
  importer?:
    | "DEPLOYMENT_STATE_UNSPECIFIED"
    | "NOT_INSTALLED"
    | "INSTALLED"
    | "ERROR"
    | "PENDING"
    | (string & {});
  /** Deployment state of root-reconciler */
  rootReconciler?:
    | "DEPLOYMENT_STATE_UNSPECIFIED"
    | "NOT_INSTALLED"
    | "INSTALLED"
    | "ERROR"
    | "PENDING"
    | (string & {});
  /** Deployment state of the monitor pod */
  monitor?:
    | "DEPLOYMENT_STATE_UNSPECIFIED"
    | "NOT_INSTALLED"
    | "INSTALLED"
    | "ERROR"
    | "PENDING"
    | (string & {});
  /** Deployment state of resource-group-controller-manager */
  resourceGroupControllerManager?:
    | "DEPLOYMENT_STATE_UNSPECIFIED"
    | "NOT_INSTALLED"
    | "INSTALLED"
    | "ERROR"
    | "PENDING"
    | (string & {});
  /** Deployment state of otel-collector */
  otelCollector?:
    | "DEPLOYMENT_STATE_UNSPECIFIED"
    | "NOT_INSTALLED"
    | "INSTALLED"
    | "ERROR"
    | "PENDING"
    | (string & {});
  /** Deployment state of the git-sync pod */
  gitSync?:
    | "DEPLOYMENT_STATE_UNSPECIFIED"
    | "NOT_INSTALLED"
    | "INSTALLED"
    | "ERROR"
    | "PENDING"
    | (string & {});
}

export const ConfigManagementConfigSyncDeploymentState: Schema.Schema<ConfigManagementConfigSyncDeploymentState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      reconcilerManager: Schema.optional(Schema.String),
      syncer: Schema.optional(Schema.String),
      admissionWebhook: Schema.optional(Schema.String),
      importer: Schema.optional(Schema.String),
      rootReconciler: Schema.optional(Schema.String),
      monitor: Schema.optional(Schema.String),
      resourceGroupControllerManager: Schema.optional(Schema.String),
      otelCollector: Schema.optional(Schema.String),
      gitSync: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ConfigManagementConfigSyncDeploymentState",
  }) as any as Schema.Schema<ConfigManagementConfigSyncDeploymentState>;

export interface ConfigManagementConfigSyncVersion {
  /** Version of the deployed reconciler-manager pod */
  reconcilerManager?: string;
  /** Version of the deployed syncer pod */
  syncer?: string;
  /** Version of the deployed admission-webhook pod */
  admissionWebhook?: string;
  /** Version of the deployed importer pod */
  importer?: string;
  /** Version of the deployed reconciler container in root-reconciler pod */
  rootReconciler?: string;
  /** Version of the deployed monitor pod */
  monitor?: string;
  /** Version of the deployed resource-group-controller-manager pod */
  resourceGroupControllerManager?: string;
  /** Version of the deployed otel-collector pod */
  otelCollector?: string;
  /** Version of the deployed git-sync pod */
  gitSync?: string;
}

export const ConfigManagementConfigSyncVersion: Schema.Schema<ConfigManagementConfigSyncVersion> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      reconcilerManager: Schema.optional(Schema.String),
      syncer: Schema.optional(Schema.String),
      admissionWebhook: Schema.optional(Schema.String),
      importer: Schema.optional(Schema.String),
      rootReconciler: Schema.optional(Schema.String),
      monitor: Schema.optional(Schema.String),
      resourceGroupControllerManager: Schema.optional(Schema.String),
      otelCollector: Schema.optional(Schema.String),
      gitSync: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ConfigManagementConfigSyncVersion",
  }) as any as Schema.Schema<ConfigManagementConfigSyncVersion>;

export interface ConfigManagementConfigSyncState {
  /** Output only. The state of ConfigSync's process to sync configs to a cluster */
  syncState?: ConfigManagementSyncState;
  /** Output only. The number of RootSync and RepoSync CRs in the cluster. */
  crCount?: number;
  /** Output only. Errors pertaining to the installation of Config Sync. */
  errors?: Array<ConfigManagementConfigSyncError>;
  /** Output only. Information about the deployment of ConfigSync, including the version of the various Pods deployed */
  deploymentState?: ConfigManagementConfigSyncDeploymentState;
  /** Output only. The state of the RootSync CRD */
  rootsyncCrd?:
    | "CRD_STATE_UNSPECIFIED"
    | "NOT_INSTALLED"
    | "INSTALLED"
    | "TERMINATING"
    | "INSTALLING"
    | (string & {});
  /** Output only. Whether syncing resources to the cluster is stopped at the cluster level. */
  clusterLevelStopSyncingState?:
    | "STOP_SYNCING_STATE_UNSPECIFIED"
    | "NOT_STOPPED"
    | "PENDING"
    | "STOPPED"
    | (string & {});
  /** Output only. The version of ConfigSync deployed */
  version?: ConfigManagementConfigSyncVersion;
  /** Output only. The state of CS This field summarizes the other fields in this message. */
  state?:
    | "STATE_UNSPECIFIED"
    | "CONFIG_SYNC_NOT_INSTALLED"
    | "CONFIG_SYNC_INSTALLED"
    | "CONFIG_SYNC_ERROR"
    | "CONFIG_SYNC_PENDING"
    | (string & {});
  /** Output only. The state of the Reposync CRD */
  reposyncCrd?:
    | "CRD_STATE_UNSPECIFIED"
    | "NOT_INSTALLED"
    | "INSTALLED"
    | "TERMINATING"
    | "INSTALLING"
    | (string & {});
}

export const ConfigManagementConfigSyncState: Schema.Schema<ConfigManagementConfigSyncState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      syncState: Schema.optional(ConfigManagementSyncState),
      crCount: Schema.optional(Schema.Number),
      errors: Schema.optional(Schema.Array(ConfigManagementConfigSyncError)),
      deploymentState: Schema.optional(
        ConfigManagementConfigSyncDeploymentState,
      ),
      rootsyncCrd: Schema.optional(Schema.String),
      clusterLevelStopSyncingState: Schema.optional(Schema.String),
      version: Schema.optional(ConfigManagementConfigSyncVersion),
      state: Schema.optional(Schema.String),
      reposyncCrd: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ConfigManagementConfigSyncState",
  }) as any as Schema.Schema<ConfigManagementConfigSyncState>;

export interface ConfigManagementInstallError {
  /** A string representing the user facing error message */
  errorMessage?: string;
}

export const ConfigManagementInstallError: Schema.Schema<ConfigManagementInstallError> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      errorMessage: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ConfigManagementInstallError",
  }) as any as Schema.Schema<ConfigManagementInstallError>;

export interface ConfigManagementOperatorState {
  /** Install errors. */
  errors?: Array<ConfigManagementInstallError>;
  /** The semenatic version number of the operator */
  version?: string;
  /** The state of the Operator's deployment */
  deploymentState?:
    | "DEPLOYMENT_STATE_UNSPECIFIED"
    | "NOT_INSTALLED"
    | "INSTALLED"
    | "ERROR"
    | "PENDING"
    | (string & {});
}

export const ConfigManagementOperatorState: Schema.Schema<ConfigManagementOperatorState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      errors: Schema.optional(Schema.Array(ConfigManagementInstallError)),
      version: Schema.optional(Schema.String),
      deploymentState: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ConfigManagementOperatorState",
  }) as any as Schema.Schema<ConfigManagementOperatorState>;

export interface ConfigManagementBinauthzVersion {
  /** The version of the binauthz webhook. */
  webhookVersion?: string;
}

export const ConfigManagementBinauthzVersion: Schema.Schema<ConfigManagementBinauthzVersion> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      webhookVersion: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ConfigManagementBinauthzVersion",
  }) as any as Schema.Schema<ConfigManagementBinauthzVersion>;

export interface ConfigManagementBinauthzState {
  /** The version of binauthz that is installed. */
  version?: ConfigManagementBinauthzVersion;
  /** The state of the binauthz webhook. */
  webhook?:
    | "DEPLOYMENT_STATE_UNSPECIFIED"
    | "NOT_INSTALLED"
    | "INSTALLED"
    | "ERROR"
    | "PENDING"
    | (string & {});
}

export const ConfigManagementBinauthzState: Schema.Schema<ConfigManagementBinauthzState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      version: Schema.optional(ConfigManagementBinauthzVersion),
      webhook: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ConfigManagementBinauthzState",
  }) as any as Schema.Schema<ConfigManagementBinauthzState>;

export interface ConfigManagementHierarchyControllerVersion {
  /** Version for open source HNC */
  hnc?: string;
  /** Version for Hierarchy Controller extension */
  extension?: string;
}

export const ConfigManagementHierarchyControllerVersion: Schema.Schema<ConfigManagementHierarchyControllerVersion> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      hnc: Schema.optional(Schema.String),
      extension: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ConfigManagementHierarchyControllerVersion",
  }) as any as Schema.Schema<ConfigManagementHierarchyControllerVersion>;

export interface ConfigManagementHierarchyControllerDeploymentState {
  /** The deployment state for open source HNC (e.g. v0.7.0-hc.0) */
  hnc?:
    | "DEPLOYMENT_STATE_UNSPECIFIED"
    | "NOT_INSTALLED"
    | "INSTALLED"
    | "ERROR"
    | "PENDING"
    | (string & {});
  /** The deployment state for Hierarchy Controller extension (e.g. v0.7.0-hc.1) */
  extension?:
    | "DEPLOYMENT_STATE_UNSPECIFIED"
    | "NOT_INSTALLED"
    | "INSTALLED"
    | "ERROR"
    | "PENDING"
    | (string & {});
}

export const ConfigManagementHierarchyControllerDeploymentState: Schema.Schema<ConfigManagementHierarchyControllerDeploymentState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      hnc: Schema.optional(Schema.String),
      extension: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ConfigManagementHierarchyControllerDeploymentState",
  }) as any as Schema.Schema<ConfigManagementHierarchyControllerDeploymentState>;

export interface ConfigManagementHierarchyControllerState {
  /** The version for Hierarchy Controller */
  version?: ConfigManagementHierarchyControllerVersion;
  /** The deployment state for Hierarchy Controller */
  state?: ConfigManagementHierarchyControllerDeploymentState;
}

export const ConfigManagementHierarchyControllerState: Schema.Schema<ConfigManagementHierarchyControllerState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      version: Schema.optional(ConfigManagementHierarchyControllerVersion),
      state: Schema.optional(
        ConfigManagementHierarchyControllerDeploymentState,
      ),
    }),
  ).annotate({
    identifier: "ConfigManagementHierarchyControllerState",
  }) as any as Schema.Schema<ConfigManagementHierarchyControllerState>;

export interface ConfigManagementMembershipState {
  /** Output only. The Kubernetes API server version of the cluster. */
  kubernetesApiServerVersion?: string;
  /** Output only. PolicyController status */
  policyControllerState?: ConfigManagementPolicyControllerState;
  /** Output only. This field is set to the `cluster_name` field of the Membership Spec if it is not empty. Otherwise, it is set to the cluster's fleet membership name. */
  clusterName?: string;
  /** Output only. Membership configuration in the cluster. This represents the actual state in the cluster, while the MembershipSpec in the FeatureSpec represents the intended state */
  membershipSpec?: ConfigManagementMembershipSpec;
  /** Output only. Current sync status */
  configSyncState?: ConfigManagementConfigSyncState;
  /** Output only. Current install status of ACM's Operator */
  operatorState?: ConfigManagementOperatorState;
  /** Output only. Binauthz status */
  binauthzState?: ConfigManagementBinauthzState;
  /** Output only. Hierarchy Controller status */
  hierarchyControllerState?: ConfigManagementHierarchyControllerState;
}

export const ConfigManagementMembershipState: Schema.Schema<ConfigManagementMembershipState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kubernetesApiServerVersion: Schema.optional(Schema.String),
      policyControllerState: Schema.optional(
        ConfigManagementPolicyControllerState,
      ),
      clusterName: Schema.optional(Schema.String),
      membershipSpec: Schema.optional(ConfigManagementMembershipSpec),
      configSyncState: Schema.optional(ConfigManagementConfigSyncState),
      operatorState: Schema.optional(ConfigManagementOperatorState),
      binauthzState: Schema.optional(ConfigManagementBinauthzState),
      hierarchyControllerState: Schema.optional(
        ConfigManagementHierarchyControllerState,
      ),
    }),
  ).annotate({
    identifier: "ConfigManagementMembershipState",
  }) as any as Schema.Schema<ConfigManagementMembershipState>;

export interface ClusterUpgradeIgnoredMembership {
  /** Reason why the membership is ignored. */
  reason?: string;
  /** Time when the membership was first set to ignored. */
  ignoredTime?: string;
}

export const ClusterUpgradeIgnoredMembership: Schema.Schema<ClusterUpgradeIgnoredMembership> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      reason: Schema.optional(Schema.String),
      ignoredTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ClusterUpgradeIgnoredMembership",
  }) as any as Schema.Schema<ClusterUpgradeIgnoredMembership>;

export interface ClusterUpgradeGKEUpgradeFeatureCondition {
  /** Reason why the feature is in this status. */
  reason?: string;
  /** Type of the condition, for example, "ready". */
  type?: string;
  /** Status of the condition, one of True, False, Unknown. */
  status?: string;
  /** Last timestamp the condition was updated. */
  updateTime?: string;
}

export const ClusterUpgradeGKEUpgradeFeatureCondition: Schema.Schema<ClusterUpgradeGKEUpgradeFeatureCondition> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      reason: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      status: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ClusterUpgradeGKEUpgradeFeatureCondition",
  }) as any as Schema.Schema<ClusterUpgradeGKEUpgradeFeatureCondition>;

export interface ClusterUpgradeUpgradeStatus {
  /** Reason for this status. */
  reason?: string;
  /** Status code of the upgrade. */
  code?:
    | "CODE_UNSPECIFIED"
    | "INELIGIBLE"
    | "PENDING"
    | "IN_PROGRESS"
    | "SOAKING"
    | "FORCED_SOAKING"
    | "COMPLETE"
    | (string & {});
  /** Last timestamp the status was updated. */
  updateTime?: string;
}

export const ClusterUpgradeUpgradeStatus: Schema.Schema<ClusterUpgradeUpgradeStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      reason: Schema.optional(Schema.String),
      code: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ClusterUpgradeUpgradeStatus",
  }) as any as Schema.Schema<ClusterUpgradeUpgradeStatus>;

export interface ClusterUpgradeGKEUpgrade {
  /** Name of the upgrade, e.g., "k8s_control_plane". It should be a valid upgrade name. It must not exceet 99 characters. */
  name?: string;
  /** Version of the upgrade, e.g., "1.22.1-gke.100". It should be a valid version. It must not exceet 99 characters. */
  version?: string;
}

export const ClusterUpgradeGKEUpgrade: Schema.Schema<ClusterUpgradeGKEUpgrade> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      version: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ClusterUpgradeGKEUpgrade",
  }) as any as Schema.Schema<ClusterUpgradeGKEUpgrade>;

export interface ClusterUpgradeGKEUpgradeState {
  /** Status of the upgrade. */
  status?: ClusterUpgradeUpgradeStatus;
  /** Which upgrade to track the state. */
  upgrade?: ClusterUpgradeGKEUpgrade;
  /** Number of GKE clusters in each status code. */
  stats?: Record<string, string>;
}

export const ClusterUpgradeGKEUpgradeState: Schema.Schema<ClusterUpgradeGKEUpgradeState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      status: Schema.optional(ClusterUpgradeUpgradeStatus),
      upgrade: Schema.optional(ClusterUpgradeGKEUpgrade),
      stats: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({
    identifier: "ClusterUpgradeGKEUpgradeState",
  }) as any as Schema.Schema<ClusterUpgradeGKEUpgradeState>;

export interface ClusterUpgradeGKEUpgradeFeatureState {
  /** Current conditions of the feature. */
  conditions?: Array<ClusterUpgradeGKEUpgradeFeatureCondition>;
  /** Upgrade state. It will eventually replace `state`. */
  upgradeState?: Array<ClusterUpgradeGKEUpgradeState>;
}

export const ClusterUpgradeGKEUpgradeFeatureState: Schema.Schema<ClusterUpgradeGKEUpgradeFeatureState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      conditions: Schema.optional(
        Schema.Array(ClusterUpgradeGKEUpgradeFeatureCondition),
      ),
      upgradeState: Schema.optional(
        Schema.Array(ClusterUpgradeGKEUpgradeState),
      ),
    }),
  ).annotate({
    identifier: "ClusterUpgradeGKEUpgradeFeatureState",
  }) as any as Schema.Schema<ClusterUpgradeGKEUpgradeFeatureState>;

export interface ClusterUpgradeFleetState {
  /** This fleets whose upstream_fleets contain the current fleet. The fleet name should be either fleet project number or id. */
  downstreamFleets?: Array<string>;
  /** A list of memberships ignored by the feature. For example, manually upgraded clusters can be ignored if they are newer than the default versions of its release channel. The membership resource is in the format: `projects/{p}/locations/{l}/membership/{m}`. */
  ignored?: Record<string, ClusterUpgradeIgnoredMembership>;
  /** Feature state for GKE clusters. */
  gkeState?: ClusterUpgradeGKEUpgradeFeatureState;
}

export const ClusterUpgradeFleetState: Schema.Schema<ClusterUpgradeFleetState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      downstreamFleets: Schema.optional(Schema.Array(Schema.String)),
      ignored: Schema.optional(
        Schema.Record(Schema.String, ClusterUpgradeIgnoredMembership),
      ),
      gkeState: Schema.optional(ClusterUpgradeGKEUpgradeFeatureState),
    }),
  ).annotate({
    identifier: "ClusterUpgradeFleetState",
  }) as any as Schema.Schema<ClusterUpgradeFleetState>;

export interface Status {
  /** Code specifies AppDevExperienceFeature's subcomponent ready state. */
  code?: "CODE_UNSPECIFIED" | "OK" | "FAILED" | "UNKNOWN" | (string & {});
  /** Description is populated if Code is Failed, explaining why it has failed. */
  description?: string;
}

export const Status: Schema.Schema<Status> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      code: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface AppDevExperienceFeatureState {
  /** Status of subcomponent that detects configured Service Mesh resources. */
  networkingInstallSucceeded?: Status;
}

export const AppDevExperienceFeatureState: Schema.Schema<AppDevExperienceFeatureState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      networkingInstallSucceeded: Schema.optional(Status),
    }),
  ).annotate({
    identifier: "AppDevExperienceFeatureState",
  }) as any as Schema.Schema<AppDevExperienceFeatureState>;

export interface RBACRoleBindingActuationFeatureState {}

export const RBACRoleBindingActuationFeatureState: Schema.Schema<RBACRoleBindingActuationFeatureState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "RBACRoleBindingActuationFeatureState",
  }) as any as Schema.Schema<RBACRoleBindingActuationFeatureState>;

export interface FeatureState {
  /** The time this status and any related Feature-specific details were updated. */
  updateTime?: string;
  /** The high-level, machine-readable status of this Feature. */
  code?: "CODE_UNSPECIFIED" | "OK" | "WARNING" | "ERROR" | (string & {});
  /** A human-readable description of the current status. */
  description?: string;
}

export const FeatureState: Schema.Schema<FeatureState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      updateTime: Schema.optional(Schema.String),
      code: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "FeatureState",
  }) as any as Schema.Schema<FeatureState>;

export interface FleetObservabilityFeatureError {
  /** The code of the error. */
  code?: string;
  /** A human-readable description of the current status. */
  description?: string;
}

export const FleetObservabilityFeatureError: Schema.Schema<FleetObservabilityFeatureError> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      code: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "FleetObservabilityFeatureError",
  }) as any as Schema.Schema<FleetObservabilityFeatureError>;

export interface FleetObservabilityFleetObservabilityBaseFeatureState {
  /** Errors after reconciling the monitoring and logging feature if the code is not OK. */
  errors?: Array<FleetObservabilityFeatureError>;
  /** The high-level, machine-readable status of this Feature. */
  code?: "CODE_UNSPECIFIED" | "OK" | "ERROR" | (string & {});
}

export const FleetObservabilityFleetObservabilityBaseFeatureState: Schema.Schema<FleetObservabilityFleetObservabilityBaseFeatureState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      errors: Schema.optional(Schema.Array(FleetObservabilityFeatureError)),
      code: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "FleetObservabilityFleetObservabilityBaseFeatureState",
  }) as any as Schema.Schema<FleetObservabilityFleetObservabilityBaseFeatureState>;

export interface FleetObservabilityFleetObservabilityMonitoringState {
  /** The base feature state of fleet monitoring feature. */
  state?: FleetObservabilityFleetObservabilityBaseFeatureState;
}

export const FleetObservabilityFleetObservabilityMonitoringState: Schema.Schema<FleetObservabilityFleetObservabilityMonitoringState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      state: Schema.optional(
        FleetObservabilityFleetObservabilityBaseFeatureState,
      ),
    }),
  ).annotate({
    identifier: "FleetObservabilityFleetObservabilityMonitoringState",
  }) as any as Schema.Schema<FleetObservabilityFleetObservabilityMonitoringState>;

export interface FleetObservabilityFleetObservabilityLoggingState {
  /** The base feature state of fleet scope log. */
  scopeLog?: FleetObservabilityFleetObservabilityBaseFeatureState;
  /** The base feature state of fleet default log. */
  defaultLog?: FleetObservabilityFleetObservabilityBaseFeatureState;
}

export const FleetObservabilityFleetObservabilityLoggingState: Schema.Schema<FleetObservabilityFleetObservabilityLoggingState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      scopeLog: Schema.optional(
        FleetObservabilityFleetObservabilityBaseFeatureState,
      ),
      defaultLog: Schema.optional(
        FleetObservabilityFleetObservabilityBaseFeatureState,
      ),
    }),
  ).annotate({
    identifier: "FleetObservabilityFleetObservabilityLoggingState",
  }) as any as Schema.Schema<FleetObservabilityFleetObservabilityLoggingState>;

export interface FleetObservabilityFeatureState {
  /** The feature state of fleet monitoring. */
  monitoring?: FleetObservabilityFleetObservabilityMonitoringState;
  /** The feature state of default logging. */
  logging?: FleetObservabilityFleetObservabilityLoggingState;
}

export const FleetObservabilityFeatureState: Schema.Schema<FleetObservabilityFeatureState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      monitoring: Schema.optional(
        FleetObservabilityFleetObservabilityMonitoringState,
      ),
      logging: Schema.optional(
        FleetObservabilityFleetObservabilityLoggingState,
      ),
    }),
  ).annotate({
    identifier: "FleetObservabilityFeatureState",
  }) as any as Schema.Schema<FleetObservabilityFeatureState>;

export interface WorkloadIdentityNamespaceStateDetail {
  /** The state of the IAM namespace. */
  code?:
    | "NAMESPACE_STATE_UNSPECIFIED"
    | "NAMESPACE_STATE_OK"
    | "NAMESPACE_STATE_ERROR"
    | (string & {});
  /** A human-readable description of the current state or returned error. */
  description?: string;
}

export const WorkloadIdentityNamespaceStateDetail: Schema.Schema<WorkloadIdentityNamespaceStateDetail> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      code: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "WorkloadIdentityNamespaceStateDetail",
  }) as any as Schema.Schema<WorkloadIdentityNamespaceStateDetail>;

export interface WorkloadIdentityWorkloadIdentityPoolStateDetail {
  /** The state of the Workload Identity Pool. */
  code?:
    | "WORKLOAD_IDENTITY_POOL_STATE_UNSPECIFIED"
    | "WORKLOAD_IDENTITY_POOL_STATE_OK"
    | "WORKLOAD_IDENTITY_POOL_STATE_ERROR"
    | (string & {});
  /** A human-readable description of the current state or returned error. */
  description?: string;
}

export const WorkloadIdentityWorkloadIdentityPoolStateDetail: Schema.Schema<WorkloadIdentityWorkloadIdentityPoolStateDetail> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      code: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "WorkloadIdentityWorkloadIdentityPoolStateDetail",
  }) as any as Schema.Schema<WorkloadIdentityWorkloadIdentityPoolStateDetail>;

export interface WorkloadIdentityFeatureState {
  /** The full name of the svc.id.goog pool for the fleet. */
  workloadIdentityPool?: string;
  /** The full name of the scope-tenancy pool for the fleet. */
  scopeTenancyWorkloadIdentityPool?: string;
  /** The state of the IAM namespaces for the fleet. */
  namespaceStateDetails?: Record<string, WorkloadIdentityNamespaceStateDetail>;
  /** Deprecated, this field will be erased after code is changed to use the new field. */
  namespaceStates?: Record<
    string,
    | "NAMESPACE_STATE_UNSPECIFIED"
    | "NAMESPACE_STATE_OK"
    | "NAMESPACE_STATE_ERROR"
    | (string & {})
  >;
  /** The state of the Workload Identity Pools for the fleet. */
  workloadIdentityPoolStateDetails?: Record<
    string,
    WorkloadIdentityWorkloadIdentityPoolStateDetail
  >;
}

export const WorkloadIdentityFeatureState: Schema.Schema<WorkloadIdentityFeatureState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      workloadIdentityPool: Schema.optional(Schema.String),
      scopeTenancyWorkloadIdentityPool: Schema.optional(Schema.String),
      namespaceStateDetails: Schema.optional(
        Schema.Record(Schema.String, WorkloadIdentityNamespaceStateDetail),
      ),
      namespaceStates: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      workloadIdentityPoolStateDetails: Schema.optional(
        Schema.Record(
          Schema.String,
          WorkloadIdentityWorkloadIdentityPoolStateDetail,
        ),
      ),
    }),
  ).annotate({
    identifier: "WorkloadIdentityFeatureState",
  }) as any as Schema.Schema<WorkloadIdentityFeatureState>;

export interface CommonFeatureState {
  /** Appdevexperience specific state. */
  appdevexperience?: AppDevExperienceFeatureState;
  /** RBAC Role Binding Actuation feature state */
  rbacrolebindingactuation?: RBACRoleBindingActuationFeatureState;
  /** Output only. The "running state" of the Feature in this Fleet. */
  state?: FeatureState;
  /** ClusterUpgrade fleet-level state. */
  clusterupgrade?: ClusterUpgradeFleetState;
  /** FleetObservability feature state. */
  fleetobservability?: FleetObservabilityFeatureState;
  /** WorkloadIdentity fleet-level state. */
  workloadidentity?: WorkloadIdentityFeatureState;
}

export const CommonFeatureState: Schema.Schema<CommonFeatureState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      appdevexperience: Schema.optional(AppDevExperienceFeatureState),
      rbacrolebindingactuation: Schema.optional(
        RBACRoleBindingActuationFeatureState,
      ),
      state: Schema.optional(FeatureState),
      clusterupgrade: Schema.optional(ClusterUpgradeFleetState),
      fleetobservability: Schema.optional(FleetObservabilityFeatureState),
      workloadidentity: Schema.optional(WorkloadIdentityFeatureState),
    }),
  ).annotate({
    identifier: "CommonFeatureState",
  }) as any as Schema.Schema<CommonFeatureState>;

export interface IdentityServiceOidcConfig {
  /** URI for the OIDC provider. This should point to the level below .well-known/openid-configuration. */
  issuerUri?: string;
  /** Claim in OIDC ID token that holds username. */
  userClaim?: string;
  /** Claim in OIDC ID token that holds group information. */
  groupsClaim?: string;
  /** Registered redirect uri to redirect users going through OAuth flow using kubectl plugin. */
  kubectlRedirectUri?: string;
  /** Flag to denote if reverse proxy is used to connect to auth provider. This flag should be set to true when provider is not reachable by Google Cloud Console. */
  deployCloudConsoleProxy?: boolean;
  /** Prefix to prepend to group name. */
  groupPrefix?: string;
  /** Enable access token. */
  enableAccessToken?: boolean;
  /** Comma-separated list of key-value pairs. */
  extraParams?: string;
  /** Input only. Unencrypted OIDC client secret will be passed to the GKE Hub CLH. */
  clientSecret?: string;
  /** Comma-separated list of identifiers. */
  scopes?: string;
  /** ID for OIDC client application. */
  clientId?: string;
  /** Output only. Encrypted OIDC Client secret */
  encryptedClientSecret?: string;
  /** Prefix to prepend to user name. */
  userPrefix?: string;
  /** PEM-encoded CA for OIDC provider. */
  certificateAuthorityData?: string;
}

export const IdentityServiceOidcConfig: Schema.Schema<IdentityServiceOidcConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      issuerUri: Schema.optional(Schema.String),
      userClaim: Schema.optional(Schema.String),
      groupsClaim: Schema.optional(Schema.String),
      kubectlRedirectUri: Schema.optional(Schema.String),
      deployCloudConsoleProxy: Schema.optional(Schema.Boolean),
      groupPrefix: Schema.optional(Schema.String),
      enableAccessToken: Schema.optional(Schema.Boolean),
      extraParams: Schema.optional(Schema.String),
      clientSecret: Schema.optional(Schema.String),
      scopes: Schema.optional(Schema.String),
      clientId: Schema.optional(Schema.String),
      encryptedClientSecret: Schema.optional(Schema.String),
      userPrefix: Schema.optional(Schema.String),
      certificateAuthorityData: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "IdentityServiceOidcConfig",
  }) as any as Schema.Schema<IdentityServiceOidcConfig>;

export interface IdentityServiceAzureADConfig {
  /** ID for the registered client application that makes authentication requests to the Azure AD identity provider. */
  clientId?: string;
  /** Output only. Encrypted AzureAD client secret. */
  encryptedClientSecret?: string;
  /** The redirect URL that kubectl uses for authorization. */
  kubectlRedirectUri?: string;
  /** Kind of Azure AD account to be authenticated. Supported values are or for accounts belonging to a specific tenant. */
  tenant?: string;
  /** Input only. Unencrypted AzureAD client secret will be passed to the GKE Hub CLH. */
  clientSecret?: string;
  /** Optional. Claim in the AzureAD ID Token that holds the user details. */
  userClaim?: string;
  /** Optional. Format of the AzureAD groups that the client wants for auth. */
  groupFormat?: string;
}

export const IdentityServiceAzureADConfig: Schema.Schema<IdentityServiceAzureADConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      clientId: Schema.optional(Schema.String),
      encryptedClientSecret: Schema.optional(Schema.String),
      kubectlRedirectUri: Schema.optional(Schema.String),
      tenant: Schema.optional(Schema.String),
      clientSecret: Schema.optional(Schema.String),
      userClaim: Schema.optional(Schema.String),
      groupFormat: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "IdentityServiceAzureADConfig",
  }) as any as Schema.Schema<IdentityServiceAzureADConfig>;

export interface IdentityServiceGoogleConfig {
  /** Disable automatic configuration of Google Plugin on supported platforms. */
  disable?: boolean;
}

export const IdentityServiceGoogleConfig: Schema.Schema<IdentityServiceGoogleConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      disable: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "IdentityServiceGoogleConfig",
  }) as any as Schema.Schema<IdentityServiceGoogleConfig>;

export interface IdentityServiceSamlConfig {
  /** Required. The list of IdP certificates to validate the SAML response against. */
  identityProviderCertificates?: Array<string>;
  /** Optional. The SAML attribute to read username from. If unspecified, the username will be read from the NameID element of the assertion in SAML response. This value is expected to be a string and will be passed along as-is (with the option of being prefixed by the `user_prefix`). */
  userAttribute?: string;
  /** Optional. Prefix to prepend to group name. */
  groupPrefix?: string;
  /** Required. The URI where the SAML IdP exposes the SSO service. */
  identityProviderSsoUri?: string;
  /** Required. The entity ID of the SAML IdP. */
  identityProviderId?: string;
  /** Optional. The SAML attribute to read groups from. This value is expected to be a string and will be passed along as-is (with the option of being prefixed by the `group_prefix`). */
  groupsAttribute?: string;
  /** Optional. Prefix to prepend to user name. */
  userPrefix?: string;
  /** Optional. The mapping of additional user attributes like nickname, birthday and address etc.. `key` is the name of this additional attribute. `value` is a string presenting as CEL(common expression language, go/cel) used for getting the value from the resources. Take nickname as an example, in this case, `key` is "attribute.nickname" and `value` is "assertion.nickname". */
  attributeMapping?: Record<string, string>;
}

export const IdentityServiceSamlConfig: Schema.Schema<IdentityServiceSamlConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      identityProviderCertificates: Schema.optional(
        Schema.Array(Schema.String),
      ),
      userAttribute: Schema.optional(Schema.String),
      groupPrefix: Schema.optional(Schema.String),
      identityProviderSsoUri: Schema.optional(Schema.String),
      identityProviderId: Schema.optional(Schema.String),
      groupsAttribute: Schema.optional(Schema.String),
      userPrefix: Schema.optional(Schema.String),
      attributeMapping: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
    }),
  ).annotate({
    identifier: "IdentityServiceSamlConfig",
  }) as any as Schema.Schema<IdentityServiceSamlConfig>;

export interface IdentityServiceUserConfig {
  /** Required. The location of the subtree in the LDAP directory to search for user entries. */
  baseDn?: string;
  /** Optional. The name of the attribute which matches against the input username. This is used to find the user in the LDAP database e.g. "(=)" and is combined with the optional filter field. This defaults to "userPrincipalName". */
  loginAttribute?: string;
  /** Optional. Determines which attribute to use as the user's identity after they are authenticated. This is distinct from the loginAttribute field to allow users to login with a username, but then have their actual identifier be an email address or full Distinguished Name (DN). For example, setting loginAttribute to "sAMAccountName" and identifierAttribute to "userPrincipalName" would allow a user to login as "bsmith", but actual RBAC policies for the user would be written as "bsmith@example.com". Using "userPrincipalName" is recommended since this will be unique for each user. This defaults to "userPrincipalName". */
  idAttribute?: string;
  /** Optional. Filter to apply when searching for the user. This can be used to further restrict the user accounts which are allowed to login. This defaults to "(objectClass=User)". */
  filter?: string;
}

export const IdentityServiceUserConfig: Schema.Schema<IdentityServiceUserConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      baseDn: Schema.optional(Schema.String),
      loginAttribute: Schema.optional(Schema.String),
      idAttribute: Schema.optional(Schema.String),
      filter: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "IdentityServiceUserConfig",
  }) as any as Schema.Schema<IdentityServiceUserConfig>;

export interface IdentityServiceServerConfig {
  /** Optional. Defines the connection type to communicate with the LDAP server. If `starttls` or `ldaps` is specified, the certificate_authority_data should not be empty. */
  connectionType?: string;
  /** Optional. Contains a Base64 encoded, PEM formatted certificate authority certificate for the LDAP server. This must be provided for the "ldaps" and "startTLS" connections. */
  certificateAuthorityData?: string;
  /** Required. Defines the hostname or IP of the LDAP server. Port is optional and will default to 389, if unspecified. For example, "ldap.server.example" or "10.10.10.10:389". */
  host?: string;
}

export const IdentityServiceServerConfig: Schema.Schema<IdentityServiceServerConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      connectionType: Schema.optional(Schema.String),
      certificateAuthorityData: Schema.optional(Schema.String),
      host: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "IdentityServiceServerConfig",
  }) as any as Schema.Schema<IdentityServiceServerConfig>;

export interface IdentityServiceGroupConfig {
  /** Optional. Optional filter to be used when searching for groups a user belongs to. This can be used to explicitly match only certain groups in order to reduce the amount of groups returned for each user. This defaults to "(objectClass=Group)". */
  filter?: string;
  /** Required. The location of the subtree in the LDAP directory to search for group entries. */
  baseDn?: string;
  /** Optional. The identifying name of each group a user belongs to. For example, if this is set to "distinguishedName" then RBACs and other group expectations should be written as full DNs. This defaults to "distinguishedName". */
  idAttribute?: string;
}

export const IdentityServiceGroupConfig: Schema.Schema<IdentityServiceGroupConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      filter: Schema.optional(Schema.String),
      baseDn: Schema.optional(Schema.String),
      idAttribute: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "IdentityServiceGroupConfig",
  }) as any as Schema.Schema<IdentityServiceGroupConfig>;

export interface IdentityServiceServiceAccountConfig {
  /** Credentials for basic auth. */
  simpleBindCredentials?: IdentityServiceSimpleBindCredentials;
}

export const IdentityServiceServiceAccountConfig: Schema.Schema<IdentityServiceServiceAccountConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      simpleBindCredentials: Schema.optional(
        IdentityServiceSimpleBindCredentials,
      ),
    }),
  ).annotate({
    identifier: "IdentityServiceServiceAccountConfig",
  }) as any as Schema.Schema<IdentityServiceServiceAccountConfig>;

export interface IdentityServiceLdapConfig {
  /** Required. Defines where users exist in the LDAP directory. */
  user?: IdentityServiceUserConfig;
  /** Required. Server settings for the external LDAP server. */
  server?: IdentityServiceServerConfig;
  /** Optional. Contains the properties for locating and authenticating groups in the directory. */
  group?: IdentityServiceGroupConfig;
  /** Required. Contains the credentials of the service account which is authorized to perform the LDAP search in the directory. The credentials can be supplied by the combination of the DN and password or the client certificate. */
  serviceAccount?: IdentityServiceServiceAccountConfig;
}

export const IdentityServiceLdapConfig: Schema.Schema<IdentityServiceLdapConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      user: Schema.optional(IdentityServiceUserConfig),
      server: Schema.optional(IdentityServiceServerConfig),
      group: Schema.optional(IdentityServiceGroupConfig),
      serviceAccount: Schema.optional(IdentityServiceServiceAccountConfig),
    }),
  ).annotate({
    identifier: "IdentityServiceLdapConfig",
  }) as any as Schema.Schema<IdentityServiceLdapConfig>;

export interface IdentityServiceAuthMethod {
  /** OIDC specific configuration. */
  oidcConfig?: IdentityServiceOidcConfig;
  /** AzureAD specific Configuration. */
  azureadConfig?: IdentityServiceAzureADConfig;
  /** Identifier for auth config. */
  name?: string;
  /** GoogleConfig specific configuration. */
  googleConfig?: IdentityServiceGoogleConfig;
  /** Proxy server address to use for auth method. */
  proxy?: string;
  /** SAML specific configuration. */
  samlConfig?: IdentityServiceSamlConfig;
  /** LDAP specific configuration. */
  ldapConfig?: IdentityServiceLdapConfig;
}

export const IdentityServiceAuthMethod: Schema.Schema<IdentityServiceAuthMethod> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      oidcConfig: Schema.optional(IdentityServiceOidcConfig),
      azureadConfig: Schema.optional(IdentityServiceAzureADConfig),
      name: Schema.optional(Schema.String),
      googleConfig: Schema.optional(IdentityServiceGoogleConfig),
      proxy: Schema.optional(Schema.String),
      samlConfig: Schema.optional(IdentityServiceSamlConfig),
      ldapConfig: Schema.optional(IdentityServiceLdapConfig),
    }),
  ).annotate({
    identifier: "IdentityServiceAuthMethod",
  }) as any as Schema.Schema<IdentityServiceAuthMethod>;

export interface IdentityServiceDiagnosticInterface {
  /** Determines whether to enable the diagnostic interface. */
  enabled?: boolean;
  /** Determines the expiration time of the diagnostic interface enablement. When reached, requests to the interface would be automatically rejected. */
  expirationTime?: string;
}

export const IdentityServiceDiagnosticInterface: Schema.Schema<IdentityServiceDiagnosticInterface> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      enabled: Schema.optional(Schema.Boolean),
      expirationTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "IdentityServiceDiagnosticInterface",
  }) as any as Schema.Schema<IdentityServiceDiagnosticInterface>;

export interface IdentityServiceIdentityServiceOptions {
  /** Determines the lifespan of STS tokens issued by Anthos Identity Service. */
  sessionDuration?: string;
  /** Configuration options for the AIS diagnostic interface. */
  diagnosticInterface?: IdentityServiceDiagnosticInterface;
}

export const IdentityServiceIdentityServiceOptions: Schema.Schema<IdentityServiceIdentityServiceOptions> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sessionDuration: Schema.optional(Schema.String),
      diagnosticInterface: Schema.optional(IdentityServiceDiagnosticInterface),
    }),
  ).annotate({
    identifier: "IdentityServiceIdentityServiceOptions",
  }) as any as Schema.Schema<IdentityServiceIdentityServiceOptions>;

export interface IdentityServiceMembershipSpec {
  /** A member may support multiple auth methods. */
  authMethods?: Array<IdentityServiceAuthMethod>;
  /** Optional. non-protocol-related configuration options. */
  identityServiceOptions?: IdentityServiceIdentityServiceOptions;
}

export const IdentityServiceMembershipSpec: Schema.Schema<IdentityServiceMembershipSpec> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      authMethods: Schema.optional(Schema.Array(IdentityServiceAuthMethod)),
      identityServiceOptions: Schema.optional(
        IdentityServiceIdentityServiceOptions,
      ),
    }),
  ).annotate({
    identifier: "IdentityServiceMembershipSpec",
  }) as any as Schema.Schema<IdentityServiceMembershipSpec>;

export interface FleetObservabilityMembershipSpec {}

export const FleetObservabilityMembershipSpec: Schema.Schema<FleetObservabilityMembershipSpec> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "FleetObservabilityMembershipSpec",
  }) as any as Schema.Schema<FleetObservabilityMembershipSpec>;

export interface Origin {
  /** Type specifies which type of origin is set. */
  type?:
    | "TYPE_UNSPECIFIED"
    | "FLEET"
    | "FLEET_OUT_OF_SYNC"
    | "USER"
    | (string & {});
}

export const Origin: Schema.Schema<Origin> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Origin" }) as any as Schema.Schema<Origin>;

export interface MembershipSpec {
  /** Version of the cloud build software on the cluster. */
  version?: string;
  /** Whether it is allowed to run the privileged builds on the cluster or not. */
  securityPolicy?:
    | "SECURITY_POLICY_UNSPECIFIED"
    | "NON_PRIVILEGED"
    | "PRIVILEGED"
    | (string & {});
}

export const MembershipSpec: Schema.Schema<MembershipSpec> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      version: Schema.optional(Schema.String),
      securityPolicy: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "MembershipSpec",
  }) as any as Schema.Schema<MembershipSpec>;

export interface ServiceMeshMembershipSpec {
  /** Optional. Specifies the API that will be used for configuring the mesh workloads. */
  configApi?:
    | "CONFIG_API_UNSPECIFIED"
    | "CONFIG_API_ISTIO"
    | "CONFIG_API_GATEWAY"
    | (string & {});
  /** Deprecated: use `management` instead Enables automatic control plane management. */
  controlPlane?:
    | "CONTROL_PLANE_MANAGEMENT_UNSPECIFIED"
    | "AUTOMATIC"
    | "MANUAL"
    | (string & {});
  /** Optional. Enables automatic Service Mesh management. */
  management?:
    | "MANAGEMENT_UNSPECIFIED"
    | "MANAGEMENT_AUTOMATIC"
    | "MANAGEMENT_MANUAL"
    | "MANAGEMENT_NOT_INSTALLED"
    | (string & {});
}

export const ServiceMeshMembershipSpec: Schema.Schema<ServiceMeshMembershipSpec> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      configApi: Schema.optional(Schema.String),
      controlPlane: Schema.optional(Schema.String),
      management: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ServiceMeshMembershipSpec",
  }) as any as Schema.Schema<ServiceMeshMembershipSpec>;

export interface PolicyControllerBundleInstallSpec {
  /** The set of namespaces to be exempted from the bundle. */
  exemptedNamespaces?: Array<string>;
}

export const PolicyControllerBundleInstallSpec: Schema.Schema<PolicyControllerBundleInstallSpec> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      exemptedNamespaces: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "PolicyControllerBundleInstallSpec",
  }) as any as Schema.Schema<PolicyControllerBundleInstallSpec>;

export interface PolicyControllerTemplateLibraryConfig {
  /** Configures the manner in which the template library is installed on the cluster. */
  installation?:
    | "INSTALLATION_UNSPECIFIED"
    | "NOT_INSTALLED"
    | "ALL"
    | (string & {});
}

export const PolicyControllerTemplateLibraryConfig: Schema.Schema<PolicyControllerTemplateLibraryConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      installation: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PolicyControllerTemplateLibraryConfig",
  }) as any as Schema.Schema<PolicyControllerTemplateLibraryConfig>;

export interface PolicyControllerPolicyContentSpec {
  /** map of bundle name to BundleInstallSpec. The bundle name maps to the `bundleName` key in the `policycontroller.gke.io/constraintData` annotation on a constraint. */
  bundles?: Record<string, PolicyControllerBundleInstallSpec>;
  /** Configures the installation of the Template Library. */
  templateLibrary?: PolicyControllerTemplateLibraryConfig;
}

export const PolicyControllerPolicyContentSpec: Schema.Schema<PolicyControllerPolicyContentSpec> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      bundles: Schema.optional(
        Schema.Record(Schema.String, PolicyControllerBundleInstallSpec),
      ),
      templateLibrary: Schema.optional(PolicyControllerTemplateLibraryConfig),
    }),
  ).annotate({
    identifier: "PolicyControllerPolicyContentSpec",
  }) as any as Schema.Schema<PolicyControllerPolicyContentSpec>;

export interface PolicyControllerResourceList {
  /** Memory requirement expressed in Kubernetes resource units. */
  memory?: string;
  /** CPU requirement expressed in Kubernetes resource units. */
  cpu?: string;
}

export const PolicyControllerResourceList: Schema.Schema<PolicyControllerResourceList> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      memory: Schema.optional(Schema.String),
      cpu: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PolicyControllerResourceList",
  }) as any as Schema.Schema<PolicyControllerResourceList>;

export interface PolicyControllerResourceRequirements {
  /** Requests describes the amount of compute resources reserved for the container by the kube-scheduler. */
  requests?: PolicyControllerResourceList;
  /** Limits describes the maximum amount of compute resources allowed for use by the running container. */
  limits?: PolicyControllerResourceList;
}

export const PolicyControllerResourceRequirements: Schema.Schema<PolicyControllerResourceRequirements> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      requests: Schema.optional(PolicyControllerResourceList),
      limits: Schema.optional(PolicyControllerResourceList),
    }),
  ).annotate({
    identifier: "PolicyControllerResourceRequirements",
  }) as any as Schema.Schema<PolicyControllerResourceRequirements>;

export interface PolicyControllerToleration {
  /** Matches a taint operator. */
  operator?: string;
  /** Matches a taint value. */
  value?: string;
  /** Matches a taint effect. */
  effect?: string;
  /** Matches a taint key (not necessarily unique). */
  key?: string;
}

export const PolicyControllerToleration: Schema.Schema<PolicyControllerToleration> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      operator: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
      effect: Schema.optional(Schema.String),
      key: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PolicyControllerToleration",
  }) as any as Schema.Schema<PolicyControllerToleration>;

export interface PolicyControllerPolicyControllerDeploymentConfig {
  /** Pod replica count. */
  replicaCount?: string;
  /** Container resource requirements. */
  containerResources?: PolicyControllerResourceRequirements;
  /** Pod tolerations of node taints. */
  podTolerations?: Array<PolicyControllerToleration>;
  /** Pod anti-affinity enablement. Deprecated: use `pod_affinity` instead. */
  podAntiAffinity?: boolean;
  /** Pod affinity configuration. */
  podAffinity?:
    | "AFFINITY_UNSPECIFIED"
    | "NO_AFFINITY"
    | "ANTI_AFFINITY"
    | (string & {});
}

export const PolicyControllerPolicyControllerDeploymentConfig: Schema.Schema<PolicyControllerPolicyControllerDeploymentConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      replicaCount: Schema.optional(Schema.String),
      containerResources: Schema.optional(PolicyControllerResourceRequirements),
      podTolerations: Schema.optional(Schema.Array(PolicyControllerToleration)),
      podAntiAffinity: Schema.optional(Schema.Boolean),
      podAffinity: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PolicyControllerPolicyControllerDeploymentConfig",
  }) as any as Schema.Schema<PolicyControllerPolicyControllerDeploymentConfig>;

export interface PolicyControllerMonitoringConfig {
  /** Specifies the list of backends Policy Controller will export to. An empty list would effectively disable metrics export. */
  backends?: Array<
    | "MONITORING_BACKEND_UNSPECIFIED"
    | "PROMETHEUS"
    | "CLOUD_MONITORING"
    | (string & {})
  >;
}

export const PolicyControllerMonitoringConfig: Schema.Schema<PolicyControllerMonitoringConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      backends: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "PolicyControllerMonitoringConfig",
  }) as any as Schema.Schema<PolicyControllerMonitoringConfig>;

export interface PolicyControllerHubConfig {
  /** Enables the ability to use Constraint Templates that reference to objects other than the object currently being evaluated. */
  referentialRulesEnabled?: boolean;
  /** Sets the interval for Policy Controller Audit Scans (in seconds). When set to 0, this disables audit functionality altogether. */
  auditIntervalSeconds?: string;
  /** The set of namespaces that are excluded from Policy Controller checks. Namespaces do not need to currently exist on the cluster. */
  exemptableNamespaces?: Array<string>;
  /** Specifies the desired policy content on the cluster */
  policyContent?: PolicyControllerPolicyContentSpec;
  /** Enables the ability to mutate resources using Policy Controller. */
  mutationEnabled?: boolean;
  /** Map of deployment configs to deployments ("admission", "audit", "mutation'). */
  deploymentConfigs?: Record<
    string,
    PolicyControllerPolicyControllerDeploymentConfig
  >;
  /** The install_spec represents the intended state specified by the latest request that mutated install_spec in the feature spec, not the lifecycle state of the feature observed by the Hub feature controller that is reported in the feature state. */
  installSpec?:
    | "INSTALL_SPEC_UNSPECIFIED"
    | "INSTALL_SPEC_NOT_INSTALLED"
    | "INSTALL_SPEC_ENABLED"
    | "INSTALL_SPEC_SUSPENDED"
    | "INSTALL_SPEC_DETACHED"
    | (string & {});
  /** The maximum number of audit violations to be stored in a constraint. If not set, the internal default (currently 20) will be used. */
  constraintViolationLimit?: string;
  /** Monitoring specifies the configuration of monitoring. */
  monitoring?: PolicyControllerMonitoringConfig;
  /** Logs all denies and dry run failures. */
  logDeniesEnabled?: boolean;
}

export const PolicyControllerHubConfig: Schema.Schema<PolicyControllerHubConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      referentialRulesEnabled: Schema.optional(Schema.Boolean),
      auditIntervalSeconds: Schema.optional(Schema.String),
      exemptableNamespaces: Schema.optional(Schema.Array(Schema.String)),
      policyContent: Schema.optional(PolicyControllerPolicyContentSpec),
      mutationEnabled: Schema.optional(Schema.Boolean),
      deploymentConfigs: Schema.optional(
        Schema.Record(
          Schema.String,
          PolicyControllerPolicyControllerDeploymentConfig,
        ),
      ),
      installSpec: Schema.optional(Schema.String),
      constraintViolationLimit: Schema.optional(Schema.String),
      monitoring: Schema.optional(PolicyControllerMonitoringConfig),
      logDeniesEnabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "PolicyControllerHubConfig",
  }) as any as Schema.Schema<PolicyControllerHubConfig>;

export interface PolicyControllerMembershipSpec {
  /** Version of Policy Controller installed. */
  version?: string;
  /** Policy Controller configuration for the cluster. */
  policyControllerHubConfig?: PolicyControllerHubConfig;
}

export const PolicyControllerMembershipSpec: Schema.Schema<PolicyControllerMembershipSpec> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      version: Schema.optional(Schema.String),
      policyControllerHubConfig: Schema.optional(PolicyControllerHubConfig),
    }),
  ).annotate({
    identifier: "PolicyControllerMembershipSpec",
  }) as any as Schema.Schema<PolicyControllerMembershipSpec>;

export interface MembershipFeatureSpec {
  /** Identity Service-specific spec. */
  identityservice?: IdentityServiceMembershipSpec;
  /** Fleet observability membership spec */
  fleetobservability?: FleetObservabilityMembershipSpec;
  /** Config Management-specific spec. */
  configmanagement?: ConfigManagementMembershipSpec;
  /** Whether this per-Membership spec was inherited from a fleet-level default. This field can be updated by users by either overriding a Membership config (updated to USER implicitly) or setting to FLEET explicitly. */
  origin?: Origin;
  /** Cloud Build-specific spec */
  cloudbuild?: MembershipSpec;
  /** Anthos Service Mesh-specific spec */
  mesh?: ServiceMeshMembershipSpec;
  /** Policy Controller spec. */
  policycontroller?: PolicyControllerMembershipSpec;
}

export const MembershipFeatureSpec: Schema.Schema<MembershipFeatureSpec> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      identityservice: Schema.optional(IdentityServiceMembershipSpec),
      fleetobservability: Schema.optional(FleetObservabilityMembershipSpec),
      configmanagement: Schema.optional(ConfigManagementMembershipSpec),
      origin: Schema.optional(Origin),
      cloudbuild: Schema.optional(MembershipSpec),
      mesh: Schema.optional(ServiceMeshMembershipSpec),
      policycontroller: Schema.optional(PolicyControllerMembershipSpec),
    }),
  ).annotate({
    identifier: "MembershipFeatureSpec",
  }) as any as Schema.Schema<MembershipFeatureSpec>;

export interface ClusterUpgradePostConditions {
  /** Required. Amount of time to "soak" after a rollout has been finished before marking it COMPLETE. Cannot exceed 30 days. Required. */
  soaking?: string;
}

export const ClusterUpgradePostConditions: Schema.Schema<ClusterUpgradePostConditions> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      soaking: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ClusterUpgradePostConditions",
  }) as any as Schema.Schema<ClusterUpgradePostConditions>;

export interface ClusterUpgradeGKEUpgradeOverride {
  /** Required. Which upgrade to override. Required. */
  upgrade?: ClusterUpgradeGKEUpgrade;
  /** Required. Post conditions to override for the specified upgrade (name + version). Required. */
  postConditions?: ClusterUpgradePostConditions;
}

export const ClusterUpgradeGKEUpgradeOverride: Schema.Schema<ClusterUpgradeGKEUpgradeOverride> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      upgrade: Schema.optional(ClusterUpgradeGKEUpgrade),
      postConditions: Schema.optional(ClusterUpgradePostConditions),
    }),
  ).annotate({
    identifier: "ClusterUpgradeGKEUpgradeOverride",
  }) as any as Schema.Schema<ClusterUpgradeGKEUpgradeOverride>;

export interface ClusterUpgradeFleetSpec {
  /** This fleet consumes upgrades that have COMPLETE status code in the upstream fleets. See UpgradeStatus.Code for code definitions. The fleet name should be either fleet project number or id. This is defined as repeated for future proof reasons. Initial implementation will enforce at most one upstream fleet. */
  upstreamFleets?: Array<string>;
  /** Allow users to override some properties of each GKE upgrade. */
  gkeUpgradeOverrides?: Array<ClusterUpgradeGKEUpgradeOverride>;
  /** Required. Post conditions to evaluate to mark an upgrade COMPLETE. Required. */
  postConditions?: ClusterUpgradePostConditions;
}

export const ClusterUpgradeFleetSpec: Schema.Schema<ClusterUpgradeFleetSpec> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      upstreamFleets: Schema.optional(Schema.Array(Schema.String)),
      gkeUpgradeOverrides: Schema.optional(
        Schema.Array(ClusterUpgradeGKEUpgradeOverride),
      ),
      postConditions: Schema.optional(ClusterUpgradePostConditions),
    }),
  ).annotate({
    identifier: "ClusterUpgradeFleetSpec",
  }) as any as Schema.Schema<ClusterUpgradeFleetSpec>;

export interface AppDevExperienceFeatureSpec {}

export const AppDevExperienceFeatureSpec: Schema.Schema<AppDevExperienceFeatureSpec> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "AppDevExperienceFeatureSpec",
  }) as any as Schema.Schema<AppDevExperienceFeatureSpec>;

export interface RBACRoleBindingActuationFeatureSpec {
  /** The list of allowed custom roles (ClusterRoles). If a ClusterRole is not part of this list, it cannot be used in a Scope RBACRoleBinding. If a ClusterRole in this list is in use, it cannot be removed from the list. */
  allowedCustomRoles?: Array<string>;
}

export const RBACRoleBindingActuationFeatureSpec: Schema.Schema<RBACRoleBindingActuationFeatureSpec> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      allowedCustomRoles: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "RBACRoleBindingActuationFeatureSpec",
  }) as any as Schema.Schema<RBACRoleBindingActuationFeatureSpec>;

export interface DataplaneV2FeatureSpec {
  /** Enable dataplane-v2 based encryption for multiple clusters. */
  enableEncryption?: boolean;
}

export const DataplaneV2FeatureSpec: Schema.Schema<DataplaneV2FeatureSpec> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      enableEncryption: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "DataplaneV2FeatureSpec",
  }) as any as Schema.Schema<DataplaneV2FeatureSpec>;

export interface MultiClusterIngressFeatureSpec {
  /** Deprecated: This field will be ignored and should not be set. Customer's billing structure. */
  billing?:
    | "BILLING_UNSPECIFIED"
    | "PAY_AS_YOU_GO"
    | "ANTHOS_LICENSE"
    | (string & {});
  /** Fully-qualified Membership name which hosts the MultiClusterIngress CRD. Example: `projects/foo-proj/locations/global/memberships/bar` */
  configMembership?: string;
}

export const MultiClusterIngressFeatureSpec: Schema.Schema<MultiClusterIngressFeatureSpec> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      billing: Schema.optional(Schema.String),
      configMembership: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "MultiClusterIngressFeatureSpec",
  }) as any as Schema.Schema<MultiClusterIngressFeatureSpec>;

export interface WorkloadIdentityFeatureSpec {
  /** Pool to be used for Workload Identity. This pool in trust-domain mode is used with Fleet Tenancy, so that sameness can be enforced. ex: projects/example/locations/global/workloadidentitypools/custompool */
  scopeTenancyPool?: string;
}

export const WorkloadIdentityFeatureSpec: Schema.Schema<WorkloadIdentityFeatureSpec> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      scopeTenancyPool: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "WorkloadIdentityFeatureSpec",
  }) as any as Schema.Schema<WorkloadIdentityFeatureSpec>;

export interface FleetObservabilityRoutingConfig {
  /** mode configures the logs routing mode. */
  mode?: "MODE_UNSPECIFIED" | "COPY" | "MOVE" | (string & {});
}

export const FleetObservabilityRoutingConfig: Schema.Schema<FleetObservabilityRoutingConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      mode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "FleetObservabilityRoutingConfig",
  }) as any as Schema.Schema<FleetObservabilityRoutingConfig>;

export interface FleetObservabilityLoggingConfig {
  /** Specified if applying the default routing config to logs not specified in other configs. */
  defaultConfig?: FleetObservabilityRoutingConfig;
  /** Specified if applying the routing config to all logs for all fleet scopes. */
  fleetScopeLogsConfig?: FleetObservabilityRoutingConfig;
}

export const FleetObservabilityLoggingConfig: Schema.Schema<FleetObservabilityLoggingConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      defaultConfig: Schema.optional(FleetObservabilityRoutingConfig),
      fleetScopeLogsConfig: Schema.optional(FleetObservabilityRoutingConfig),
    }),
  ).annotate({
    identifier: "FleetObservabilityLoggingConfig",
  }) as any as Schema.Schema<FleetObservabilityLoggingConfig>;

export interface FleetObservabilityFeatureSpec {
  /** Specified if fleet logging feature is enabled for the entire fleet. If UNSPECIFIED, fleet logging feature is disabled for the entire fleet. */
  loggingConfig?: FleetObservabilityLoggingConfig;
}

export const FleetObservabilityFeatureSpec: Schema.Schema<FleetObservabilityFeatureSpec> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      loggingConfig: Schema.optional(FleetObservabilityLoggingConfig),
    }),
  ).annotate({
    identifier: "FleetObservabilityFeatureSpec",
  }) as any as Schema.Schema<FleetObservabilityFeatureSpec>;

export interface CommonFeatureSpec {
  /** ClusterUpgrade (fleet-based) feature spec. */
  clusterupgrade?: ClusterUpgradeFleetSpec;
  /** Appdevexperience specific spec. */
  appdevexperience?: AppDevExperienceFeatureSpec;
  /** RBAC Role Binding Actuation feature spec */
  rbacrolebindingactuation?: RBACRoleBindingActuationFeatureSpec;
  /** DataplaneV2 feature spec. */
  dataplanev2?: DataplaneV2FeatureSpec;
  /** Multicluster Ingress-specific spec. */
  multiclusteringress?: MultiClusterIngressFeatureSpec;
  /** Workload Identity feature spec. */
  workloadidentity?: WorkloadIdentityFeatureSpec;
  /** FleetObservability feature spec. */
  fleetobservability?: FleetObservabilityFeatureSpec;
}

export const CommonFeatureSpec: Schema.Schema<CommonFeatureSpec> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      clusterupgrade: Schema.optional(ClusterUpgradeFleetSpec),
      appdevexperience: Schema.optional(AppDevExperienceFeatureSpec),
      rbacrolebindingactuation: Schema.optional(
        RBACRoleBindingActuationFeatureSpec,
      ),
      dataplanev2: Schema.optional(DataplaneV2FeatureSpec),
      multiclusteringress: Schema.optional(MultiClusterIngressFeatureSpec),
      workloadidentity: Schema.optional(WorkloadIdentityFeatureSpec),
      fleetobservability: Schema.optional(FleetObservabilityFeatureSpec),
    }),
  ).annotate({
    identifier: "CommonFeatureSpec",
  }) as any as Schema.Schema<CommonFeatureSpec>;

export interface ServiceMeshStatusDetails {
  /** A machine-readable code that further describes a broad status. */
  code?: string;
  /** Human-readable explanation of code. */
  details?: string;
}

export const ServiceMeshStatusDetails: Schema.Schema<ServiceMeshStatusDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      code: Schema.optional(Schema.String),
      details: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ServiceMeshStatusDetails",
  }) as any as Schema.Schema<ServiceMeshStatusDetails>;

export interface ServiceMeshControlPlaneManagement {
  /** LifecycleState of control plane management. */
  state?:
    | "LIFECYCLE_STATE_UNSPECIFIED"
    | "DISABLED"
    | "FAILED_PRECONDITION"
    | "PROVISIONING"
    | "ACTIVE"
    | "STALLED"
    | "NEEDS_ATTENTION"
    | "DEGRADED"
    | "DEPROVISIONING"
    | (string & {});
  /** Output only. Implementation of managed control plane. */
  implementation?:
    | "IMPLEMENTATION_UNSPECIFIED"
    | "ISTIOD"
    | "TRAFFIC_DIRECTOR"
    | "UPDATING"
    | (string & {});
  /** Explanation of state. */
  details?: Array<ServiceMeshStatusDetails>;
}

export const ServiceMeshControlPlaneManagement: Schema.Schema<ServiceMeshControlPlaneManagement> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      state: Schema.optional(Schema.String),
      implementation: Schema.optional(Schema.String),
      details: Schema.optional(Schema.Array(ServiceMeshStatusDetails)),
    }),
  ).annotate({
    identifier: "ServiceMeshControlPlaneManagement",
  }) as any as Schema.Schema<ServiceMeshControlPlaneManagement>;

export interface ServiceMeshDataPlaneManagement {
  /** Lifecycle status of data plane management. */
  state?:
    | "LIFECYCLE_STATE_UNSPECIFIED"
    | "DISABLED"
    | "FAILED_PRECONDITION"
    | "PROVISIONING"
    | "ACTIVE"
    | "STALLED"
    | "NEEDS_ATTENTION"
    | "DEGRADED"
    | "DEPROVISIONING"
    | (string & {});
  /** Explanation of the status. */
  details?: Array<ServiceMeshStatusDetails>;
}

export const ServiceMeshDataPlaneManagement: Schema.Schema<ServiceMeshDataPlaneManagement> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      state: Schema.optional(Schema.String),
      details: Schema.optional(Schema.Array(ServiceMeshStatusDetails)),
    }),
  ).annotate({
    identifier: "ServiceMeshDataPlaneManagement",
  }) as any as Schema.Schema<ServiceMeshDataPlaneManagement>;

export interface ServiceMeshCondition {
  /** Links contains actionable information. */
  documentationLink?: string;
  /** Unique identifier of the condition which describes the condition recognizable to the user. */
  code?:
    | "CODE_UNSPECIFIED"
    | "MESH_IAM_PERMISSION_DENIED"
    | "MESH_IAM_CROSS_PROJECT_PERMISSION_DENIED"
    | "CNI_CONFIG_UNSUPPORTED"
    | "GKE_SANDBOX_UNSUPPORTED"
    | "NODEPOOL_WORKLOAD_IDENTITY_FEDERATION_REQUIRED"
    | "CNI_INSTALLATION_FAILED"
    | "CNI_POD_UNSCHEDULABLE"
    | "CLUSTER_HAS_ZERO_NODES"
    | "CANONICAL_SERVICE_ERROR"
    | "UNSUPPORTED_MULTIPLE_CONTROL_PLANES"
    | "VPCSC_GA_SUPPORTED"
    | "DEPRECATED_SPEC_CONTROL_PLANE_MANAGEMENT"
    | "DEPRECATED_SPEC_CONTROL_PLANE_MANAGEMENT_SAFE"
    | "CONFIG_APPLY_INTERNAL_ERROR"
    | "CONFIG_VALIDATION_ERROR"
    | "CONFIG_VALIDATION_WARNING"
    | "QUOTA_EXCEEDED_BACKEND_SERVICES"
    | "QUOTA_EXCEEDED_HEALTH_CHECKS"
    | "QUOTA_EXCEEDED_HTTP_ROUTES"
    | "QUOTA_EXCEEDED_TCP_ROUTES"
    | "QUOTA_EXCEEDED_TLS_ROUTES"
    | "QUOTA_EXCEEDED_TRAFFIC_POLICIES"
    | "QUOTA_EXCEEDED_ENDPOINT_POLICIES"
    | "QUOTA_EXCEEDED_GATEWAYS"
    | "QUOTA_EXCEEDED_MESHES"
    | "QUOTA_EXCEEDED_SERVER_TLS_POLICIES"
    | "QUOTA_EXCEEDED_CLIENT_TLS_POLICIES"
    | "QUOTA_EXCEEDED_SERVICE_LB_POLICIES"
    | "QUOTA_EXCEEDED_HTTP_FILTERS"
    | "QUOTA_EXCEEDED_TCP_FILTERS"
    | "QUOTA_EXCEEDED_NETWORK_ENDPOINT_GROUPS"
    | "CONFIG_APPLY_BLOCKED"
    | "LEGACY_MC_SECRETS"
    | "WORKLOAD_IDENTITY_REQUIRED"
    | "NON_STANDARD_BINARY_USAGE"
    | "UNSUPPORTED_GATEWAY_CLASS"
    | "MANAGED_CNI_NOT_ENABLED"
    | "MODERNIZATION_SCHEDULED"
    | "MODERNIZATION_IN_PROGRESS"
    | "MODERNIZATION_COMPLETED"
    | "MODERNIZATION_ABORTED"
    | "MODERNIZATION_PREPARING"
    | "MODERNIZATION_STALLED"
    | "MODERNIZATION_PREPARED"
    | "MODERNIZATION_MIGRATING_WORKLOADS"
    | "MODERNIZATION_ROLLING_BACK_CLUSTER"
    | "MODERNIZATION_WILL_BE_SCHEDULED"
    | "MODERNIZATION_MANUAL"
    | "MODERNIZATION_ELIGIBLE"
    | "MODERNIZATION_MODERNIZING"
    | "MODERNIZATION_MODERNIZED_SOAKING"
    | "MODERNIZATION_FINALIZED"
    | "MODERNIZATION_ROLLING_BACK_FLEET"
    | (string & {});
  /** A short summary about the issue. */
  details?: string;
  /** Severity level of the condition. */
  severity?:
    | "SEVERITY_UNSPECIFIED"
    | "ERROR"
    | "WARNING"
    | "INFO"
    | (string & {});
}

export const ServiceMeshCondition: Schema.Schema<ServiceMeshCondition> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      documentationLink: Schema.optional(Schema.String),
      code: Schema.optional(Schema.String),
      details: Schema.optional(Schema.String),
      severity: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ServiceMeshCondition",
  }) as any as Schema.Schema<ServiceMeshCondition>;

export interface ServiceMeshMembershipState {
  /** Output only. Status of control plane management */
  controlPlaneManagement?: ServiceMeshControlPlaneManagement;
  /** Output only. Status of data plane management. */
  dataPlaneManagement?: ServiceMeshDataPlaneManagement;
  /** Output only. List of conditions reported for this membership. */
  conditions?: Array<ServiceMeshCondition>;
}

export const ServiceMeshMembershipState: Schema.Schema<ServiceMeshMembershipState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      controlPlaneManagement: Schema.optional(
        ServiceMeshControlPlaneManagement,
      ),
      dataPlaneManagement: Schema.optional(ServiceMeshDataPlaneManagement),
      conditions: Schema.optional(Schema.Array(ServiceMeshCondition)),
    }),
  ).annotate({
    identifier: "ServiceMeshMembershipState",
  }) as any as Schema.Schema<ServiceMeshMembershipState>;

export interface IdentityServiceMembershipState {
  /** Installed AIS version. This is the AIS version installed on this member. The values makes sense iff state is OK. */
  installedVersion?: string;
  /** Deployment state on this member */
  state?: "DEPLOYMENT_STATE_UNSPECIFIED" | "OK" | "ERROR" | (string & {});
  /** The reason of the failure. */
  failureReason?: string;
  /** Last reconciled membership configuration */
  memberConfig?: IdentityServiceMembershipSpec;
}

export const IdentityServiceMembershipState: Schema.Schema<IdentityServiceMembershipState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      installedVersion: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      failureReason: Schema.optional(Schema.String),
      memberConfig: Schema.optional(IdentityServiceMembershipSpec),
    }),
  ).annotate({
    identifier: "IdentityServiceMembershipState",
  }) as any as Schema.Schema<IdentityServiceMembershipState>;

export interface FleetObservabilityMembershipState {}

export const FleetObservabilityMembershipState: Schema.Schema<FleetObservabilityMembershipState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "FleetObservabilityMembershipState",
  }) as any as Schema.Schema<FleetObservabilityMembershipState>;

export interface PolicyControllerOnClusterState {
  /** The lifecycle state of this component. */
  state?:
    | "LIFECYCLE_STATE_UNSPECIFIED"
    | "NOT_INSTALLED"
    | "INSTALLING"
    | "ACTIVE"
    | "UPDATING"
    | "DECOMMISSIONING"
    | "CLUSTER_ERROR"
    | "HUB_ERROR"
    | "SUSPENDED"
    | "DETACHED"
    | (string & {});
  /** Surface potential errors or information logs. */
  details?: string;
}

export const PolicyControllerOnClusterState: Schema.Schema<PolicyControllerOnClusterState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      state: Schema.optional(Schema.String),
      details: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PolicyControllerOnClusterState",
  }) as any as Schema.Schema<PolicyControllerOnClusterState>;

export interface PolicyControllerPolicyContentState {
  /** The state of the any bundles included in the chosen version of the manifest */
  bundleStates?: Record<string, PolicyControllerOnClusterState>;
  /** The state of the template library */
  templateLibraryState?: PolicyControllerOnClusterState;
  /** The state of the referential data sync configuration. This could represent the state of either the syncSet object(s) or the config object, depending on the version of PoCo configured by the user. */
  referentialSyncConfigState?: PolicyControllerOnClusterState;
}

export const PolicyControllerPolicyContentState: Schema.Schema<PolicyControllerPolicyContentState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      bundleStates: Schema.optional(
        Schema.Record(Schema.String, PolicyControllerOnClusterState),
      ),
      templateLibraryState: Schema.optional(PolicyControllerOnClusterState),
      referentialSyncConfigState: Schema.optional(
        PolicyControllerOnClusterState,
      ),
    }),
  ).annotate({
    identifier: "PolicyControllerPolicyContentState",
  }) as any as Schema.Schema<PolicyControllerPolicyContentState>;

export interface PolicyControllerMembershipState {
  /** The overall Policy Controller lifecycle state observed by the Hub Feature controller. */
  state?:
    | "LIFECYCLE_STATE_UNSPECIFIED"
    | "NOT_INSTALLED"
    | "INSTALLING"
    | "ACTIVE"
    | "UPDATING"
    | "DECOMMISSIONING"
    | "CLUSTER_ERROR"
    | "HUB_ERROR"
    | "SUSPENDED"
    | "DETACHED"
    | (string & {});
  /** Currently these include (also serving as map keys): 1. "admission" 2. "audit" 3. "mutation" */
  componentStates?: Record<string, PolicyControllerOnClusterState>;
  /** The overall content state observed by the Hub Feature controller. */
  policyContentState?: PolicyControllerPolicyContentState;
}

export const PolicyControllerMembershipState: Schema.Schema<PolicyControllerMembershipState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      state: Schema.optional(Schema.String),
      componentStates: Schema.optional(
        Schema.Record(Schema.String, PolicyControllerOnClusterState),
      ),
      policyContentState: Schema.optional(PolicyControllerPolicyContentState),
    }),
  ).annotate({
    identifier: "PolicyControllerMembershipState",
  }) as any as Schema.Schema<PolicyControllerMembershipState>;

export interface MeteringMembershipState {
  /** The vCPUs capacity in the cluster according to the most recent measurement (1/1000 precision). */
  preciseLastMeasuredClusterVcpuCapacity?: number;
  /** The time stamp of the most recent measurement of the number of vCPUs in the cluster. */
  lastMeasurementTime?: string;
}

export const MeteringMembershipState: Schema.Schema<MeteringMembershipState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      preciseLastMeasuredClusterVcpuCapacity: Schema.optional(Schema.Number),
      lastMeasurementTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "MeteringMembershipState",
  }) as any as Schema.Schema<MeteringMembershipState>;

export interface WorkloadIdentityIdentityProviderStateDetail {
  /** The state of the Identity Provider. */
  code?:
    | "IDENTITY_PROVIDER_STATE_UNSPECIFIED"
    | "IDENTITY_PROVIDER_STATE_OK"
    | "IDENTITY_PROVIDER_STATE_ERROR"
    | (string & {});
  /** A human-readable description of the current state or returned error. */
  description?: string;
}

export const WorkloadIdentityIdentityProviderStateDetail: Schema.Schema<WorkloadIdentityIdentityProviderStateDetail> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      code: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "WorkloadIdentityIdentityProviderStateDetail",
  }) as any as Schema.Schema<WorkloadIdentityIdentityProviderStateDetail>;

export interface WorkloadIdentityMembershipState {
  /** Deprecated, this field will be erased after code is changed to use the new field. */
  description?: string;
  /** The state of the Identity Providers corresponding to the membership. */
  identityProviderStateDetails?: Record<
    string,
    WorkloadIdentityIdentityProviderStateDetail
  >;
}

export const WorkloadIdentityMembershipState: Schema.Schema<WorkloadIdentityMembershipState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      description: Schema.optional(Schema.String),
      identityProviderStateDetails: Schema.optional(
        Schema.Record(
          Schema.String,
          WorkloadIdentityIdentityProviderStateDetail,
        ),
      ),
    }),
  ).annotate({
    identifier: "WorkloadIdentityMembershipState",
  }) as any as Schema.Schema<WorkloadIdentityMembershipState>;

export interface ClusterUpgradeMembershipGKEUpgradeState {
  /** Status of the upgrade. */
  status?: ClusterUpgradeUpgradeStatus;
  /** Which upgrade to track the state. */
  upgrade?: ClusterUpgradeGKEUpgrade;
}

export const ClusterUpgradeMembershipGKEUpgradeState: Schema.Schema<ClusterUpgradeMembershipGKEUpgradeState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      status: Schema.optional(ClusterUpgradeUpgradeStatus),
      upgrade: Schema.optional(ClusterUpgradeGKEUpgrade),
    }),
  ).annotate({
    identifier: "ClusterUpgradeMembershipGKEUpgradeState",
  }) as any as Schema.Schema<ClusterUpgradeMembershipGKEUpgradeState>;

export interface ClusterUpgradeMembershipState {
  /** Whether this membership is ignored by the feature. For example, manually upgraded clusters can be ignored if they are newer than the default versions of its release channel. */
  ignored?: ClusterUpgradeIgnoredMembership;
  /** Actual upgrade state against desired. */
  upgrades?: Array<ClusterUpgradeMembershipGKEUpgradeState>;
}

export const ClusterUpgradeMembershipState: Schema.Schema<ClusterUpgradeMembershipState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      ignored: Schema.optional(ClusterUpgradeIgnoredMembership),
      upgrades: Schema.optional(
        Schema.Array(ClusterUpgradeMembershipGKEUpgradeState),
      ),
    }),
  ).annotate({
    identifier: "ClusterUpgradeMembershipState",
  }) as any as Schema.Schema<ClusterUpgradeMembershipState>;

export interface MembershipFeatureState {
  /** Service Mesh-specific state. */
  servicemesh?: ServiceMeshMembershipState;
  /** Identity Service-specific state. */
  identityservice?: IdentityServiceMembershipState;
  /** Fleet observability membership state. */
  fleetobservability?: FleetObservabilityMembershipState;
  /** Policycontroller-specific state. */
  policycontroller?: PolicyControllerMembershipState;
  /** Appdevexperience specific state. */
  appdevexperience?: AppDevExperienceFeatureState;
  /** Metering-specific state. */
  metering?: MeteringMembershipState;
  /** Workload Identity membership specific state. */
  workloadidentity?: WorkloadIdentityMembershipState;
  /** ClusterUpgrade state. */
  clusterupgrade?: ClusterUpgradeMembershipState;
  /** Config Management-specific state. */
  configmanagement?: ConfigManagementMembershipState;
  /** The high-level state of this Feature for a single membership. */
  state?: FeatureState;
}

export const MembershipFeatureState: Schema.Schema<MembershipFeatureState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      servicemesh: Schema.optional(ServiceMeshMembershipState),
      identityservice: Schema.optional(IdentityServiceMembershipState),
      fleetobservability: Schema.optional(FleetObservabilityMembershipState),
      policycontroller: Schema.optional(PolicyControllerMembershipState),
      appdevexperience: Schema.optional(AppDevExperienceFeatureState),
      metering: Schema.optional(MeteringMembershipState),
      workloadidentity: Schema.optional(WorkloadIdentityMembershipState),
      clusterupgrade: Schema.optional(ClusterUpgradeMembershipState),
      configmanagement: Schema.optional(ConfigManagementMembershipState),
      state: Schema.optional(FeatureState),
    }),
  ).annotate({
    identifier: "MembershipFeatureState",
  }) as any as Schema.Schema<MembershipFeatureState>;

export interface ScopeFeatureState {
  /** Output only. The "running state" of the Feature in this Scope. */
  state?: FeatureState;
}

export const ScopeFeatureState: Schema.Schema<ScopeFeatureState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      state: Schema.optional(FeatureState),
    }),
  ).annotate({
    identifier: "ScopeFeatureState",
  }) as any as Schema.Schema<ScopeFeatureState>;

export interface ScopeFeatureSpec {}

export const ScopeFeatureSpec: Schema.Schema<ScopeFeatureSpec> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "ScopeFeatureSpec",
  }) as any as Schema.Schema<ScopeFeatureSpec>;

export interface CommonFleetDefaultMemberConfigSpec {
  /** Anthos Service Mesh-specific spec */
  mesh?: ServiceMeshMembershipSpec;
  /** Policy Controller spec. */
  policycontroller?: PolicyControllerMembershipSpec;
  /** Config Management-specific spec. */
  configmanagement?: ConfigManagementMembershipSpec;
  /** Identity Service-specific spec. */
  identityservice?: IdentityServiceMembershipSpec;
}

export const CommonFleetDefaultMemberConfigSpec: Schema.Schema<CommonFleetDefaultMemberConfigSpec> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      mesh: Schema.optional(ServiceMeshMembershipSpec),
      policycontroller: Schema.optional(PolicyControllerMembershipSpec),
      configmanagement: Schema.optional(ConfigManagementMembershipSpec),
      identityservice: Schema.optional(IdentityServiceMembershipSpec),
    }),
  ).annotate({
    identifier: "CommonFleetDefaultMemberConfigSpec",
  }) as any as Schema.Schema<CommonFleetDefaultMemberConfigSpec>;

export interface FeatureResourceState {
  /** The current state of the Feature resource in the Hub API. */
  state?:
    | "STATE_UNSPECIFIED"
    | "ENABLING"
    | "ACTIVE"
    | "DISABLING"
    | "UPDATING"
    | "SERVICE_UPDATING"
    | (string & {});
}

export const FeatureResourceState: Schema.Schema<FeatureResourceState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      state: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "FeatureResourceState",
  }) as any as Schema.Schema<FeatureResourceState>;

export interface Feature {
  /** Output only. The Fleet-wide Feature state. */
  state?: CommonFeatureState;
  /** Optional. Membership-specific configuration for this Feature. If this Feature does not support any per-Membership configuration, this field may be unused. The keys indicate which Membership the configuration is for, in the form: `projects/{p}/locations/{l}/memberships/{m}` Where {p} is the project, {l} is a valid location and {m} is a valid Membership in this project at that location. {p} WILL match the Feature's project. {p} will always be returned as the project number, but the project ID is also accepted during input. If the same Membership is specified in the map twice (using the project ID form, and the project number form), exactly ONE of the entries will be saved, with no guarantees as to which. For this reason, it is recommended the same format be used for all entries when mutating a Feature. */
  membershipSpecs?: Record<string, MembershipFeatureSpec>;
  /** Output only. When the Feature resource was last updated. */
  updateTime?: string;
  /** Output only. The full, unique name of this Feature resource in the format `projects/* /locations/* /features/*`. */
  name?: string;
  /** Optional. Fleet-wide Feature configuration. If this Feature does not support any Fleet-wide configuration, this field may be unused. */
  spec?: CommonFeatureSpec;
  /** Output only. Membership-specific Feature status. If this Feature does report any per-Membership status, this field may be unused. The keys indicate which Membership the state is for, in the form: `projects/{p}/locations/{l}/memberships/{m}` Where {p} is the project number, {l} is a valid location and {m} is a valid Membership in this project at that location. {p} MUST match the Feature's project number. */
  membershipStates?: Record<string, MembershipFeatureState>;
  /** Output only. When the Feature resource was created. */
  createTime?: string;
  /** Output only. Scope-specific Feature status. If this Feature does report any per-Scope status, this field may be unused. The keys indicate which Scope the state is for, in the form: `projects/{p}/locations/global/scopes/{s}` Where {p} is the project, {s} is a valid Scope in this project. {p} WILL match the Feature's project. */
  scopeStates?: Record<string, ScopeFeatureState>;
  /** Labels for this Feature. */
  labels?: Record<string, string>;
  /** Optional. Scope-specific configuration for this Feature. If this Feature does not support any per-Scope configuration, this field may be unused. The keys indicate which Scope the configuration is for, in the form: `projects/{p}/locations/global/scopes/{s}` Where {p} is the project, {s} is a valid Scope in this project. {p} WILL match the Feature's project. {p} will always be returned as the project number, but the project ID is also accepted during input. If the same Scope is specified in the map twice (using the project ID form, and the project number form), exactly ONE of the entries will be saved, with no guarantees as to which. For this reason, it is recommended the same format be used for all entries when mutating a Feature. */
  scopeSpecs?: Record<string, ScopeFeatureSpec>;
  /** Optional. Feature configuration applicable to all memberships of the fleet. */
  fleetDefaultMemberConfig?: CommonFleetDefaultMemberConfigSpec;
  /** Output only. State of the Feature resource itself. */
  resourceState?: FeatureResourceState;
  /** Output only. List of locations that could not be reached while fetching this feature. */
  unreachable?: Array<string>;
  /** Output only. When the Feature resource was deleted. */
  deleteTime?: string;
}

export const Feature: Schema.Schema<Feature> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      state: Schema.optional(CommonFeatureState),
      membershipSpecs: Schema.optional(
        Schema.Record(Schema.String, MembershipFeatureSpec),
      ),
      updateTime: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      spec: Schema.optional(CommonFeatureSpec),
      membershipStates: Schema.optional(
        Schema.Record(Schema.String, MembershipFeatureState),
      ),
      createTime: Schema.optional(Schema.String),
      scopeStates: Schema.optional(
        Schema.Record(Schema.String, ScopeFeatureState),
      ),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      scopeSpecs: Schema.optional(
        Schema.Record(Schema.String, ScopeFeatureSpec),
      ),
      fleetDefaultMemberConfig: Schema.optional(
        CommonFleetDefaultMemberConfigSpec,
      ),
      resourceState: Schema.optional(FeatureResourceState),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      deleteTime: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Feature" }) as any as Schema.Schema<Feature>;

export interface VersionUpgrade {
  /** Optional. Type of version upgrade specifies which component should be upgraded. */
  type?:
    | "TYPE_UNSPECIFIED"
    | "TYPE_CONTROL_PLANE"
    | "TYPE_NODE_POOL"
    | (string & {});
  /** Optional. Desired version of the component. */
  desiredVersion?: string;
}

export const VersionUpgrade: Schema.Schema<VersionUpgrade> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      desiredVersion: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VersionUpgrade",
  }) as any as Schema.Schema<VersionUpgrade>;

export interface RolloutStage {
  /** Output only. The state of the wave. */
  state?:
    | "STATE_UNSPECIFIED"
    | "PENDING"
    | "RUNNING"
    | "SOAKING"
    | "COMPLETED"
    | "FORCED_SOAKING"
    | (string & {});
  /** Optional. Output only. The time at which the wave ended. */
  endTime?: string;
  /** Optional. Duration to soak after this wave before starting the next wave. */
  soakDuration?: string;
  /** Output only. The wave number to which this status applies. */
  stageNumber?: number;
  /** Optional. Output only. The time at which the wave started. */
  startTime?: string;
}

export const RolloutStage: Schema.Schema<RolloutStage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      state: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      soakDuration: Schema.optional(Schema.String),
      stageNumber: Schema.optional(Schema.Number),
      startTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RolloutStage",
  }) as any as Schema.Schema<RolloutStage>;

export interface RolloutTarget {
  /** Optional. Output only. The resource link of the Cluster resource upgraded in this Rollout. It is formatted as: `//{api_service}/projects/{project_number}/locations/{location}/clusters/{cluster_name}`. . */
  cluster?: string;
  /** Output only. The high-level, machine-readable status of this Rollout for the target. */
  state?:
    | "STATE_UNSPECIFIED"
    | "PENDING"
    | "RUNNING"
    | "FAILED"
    | "SUCCEEDED"
    | "PAUSED"
    | "REMOVED"
    | "INELIGIBLE"
    | (string & {});
  /** Optional. Output only. The resource link of the NodePool resource upgraded in this Rollout. It is formatted as: `//{api_service}/projects/{project_number}/locations/{location}/clusters/{cluster_name}/nodePools/{node_pool_name}`. */
  nodePool?: string;
  /** Optional. Output only. A human-readable description of the current status. */
  reason?: string;
  /** Optional. Output only. The operation resource name performing the mutation. */
  operation?: string;
}

export const RolloutTarget: Schema.Schema<RolloutTarget> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      cluster: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      nodePool: Schema.optional(Schema.String),
      reason: Schema.optional(Schema.String),
      operation: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RolloutTarget",
  }) as any as Schema.Schema<RolloutTarget>;

export interface RolloutMembershipState {
  /** Output only. The stage assignment of this cluster in this rollout. */
  stageAssignment?: number;
  /** Output only. The targets of the rollout - clusters or node pools that are being upgraded. All targets belongs to the same cluster, identified by the membership name (key of membership_states map). */
  targets?: Array<RolloutTarget>;
  /** Optional. Output only. The time this status and any related Rollout-specific details for the membership were updated. */
  lastUpdateTime?: string;
}

export const RolloutMembershipState: Schema.Schema<RolloutMembershipState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      stageAssignment: Schema.optional(Schema.Number),
      targets: Schema.optional(Schema.Array(RolloutTarget)),
      lastUpdateTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RolloutMembershipState",
  }) as any as Schema.Schema<RolloutMembershipState>;

export interface Rollout {
  /** Output only. The timestamp at which the Rollout was completed. */
  completeTime?: string;
  /** Output only. A human-readable description explaining the reason for the current state. */
  stateReason?: string;
  /** Optional. Config for version upgrade of clusters. */
  versionUpgrade?: VersionUpgrade;
  /** Output only. etag of the Rollout Ex. abc1234 */
  etag?: string;
  /** Output only. The stages of the Rollout. */
  stages?: Array<RolloutStage>;
  /** Output only. Google-generated UUID for this resource. This is unique across all Rollout resources. If a Rollout resource is deleted and another resource with the same name is created, it gets a different uid. */
  uid?: string;
  /** Output only. The timestamp at the Rollout was deleted. */
  deleteTime?: string;
  /** Output only. States of upgrading control plane or node pool targets of a single cluster (GKE Hub membership) that's part of this Rollout. The key is the membership name of the cluster. The value is the state of the cluster. */
  membershipStates?: Record<string, RolloutMembershipState>;
  /** Output only. The timestamp at which the Rollout was created. */
  createTime?: string;
  /** Optional. Human readable display name of the Rollout. */
  displayName?: string;
  /** Optional. Labels for this Rollout. */
  labels?: Record<string, string>;
  /** Output only. State specifies various states of the Rollout. */
  state?:
    | "STATE_UNSPECIFIED"
    | "RUNNING"
    | "PAUSED"
    | "CANCELLED"
    | "COMPLETED"
    | (string & {});
  /** Optional. Immutable. The full, unique resource name of the rollout sequence that initiatied this Rollout. In the format of `projects/{project}/locations/global/rolloutSequences/{rollout_sequence}`. */
  rolloutSequence?: string;
  /** Output only. The timestamp at which the Rollout was last updated. */
  updateTime?: string;
  /** Identifier. The full, unique resource name of this Rollout in the format of `projects/{project}/locations/global/rollouts/{rollout}`. */
  name?: string;
}

export const Rollout: Schema.Schema<Rollout> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      completeTime: Schema.optional(Schema.String),
      stateReason: Schema.optional(Schema.String),
      versionUpgrade: Schema.optional(VersionUpgrade),
      etag: Schema.optional(Schema.String),
      stages: Schema.optional(Schema.Array(RolloutStage)),
      uid: Schema.optional(Schema.String),
      deleteTime: Schema.optional(Schema.String),
      membershipStates: Schema.optional(
        Schema.Record(Schema.String, RolloutMembershipState),
      ),
      createTime: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      state: Schema.optional(Schema.String),
      rolloutSequence: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Rollout" }) as any as Schema.Schema<Rollout>;

export interface ListFeaturesResponse {
  /** The list of matching Features */
  resources?: Array<Feature>;
  /** A token to request the next page of resources from the `ListFeatures` method. The value of an empty string means that there are no more resources to return. */
  nextPageToken?: string;
}

export const ListFeaturesResponse: Schema.Schema<ListFeaturesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resources: Schema.optional(Schema.Array(Feature)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListFeaturesResponse",
  }) as any as Schema.Schema<ListFeaturesResponse>;

export interface AuditLogConfig {
  /** The log type that this config enables. */
  logType?:
    | "LOG_TYPE_UNSPECIFIED"
    | "ADMIN_READ"
    | "DATA_WRITE"
    | "DATA_READ"
    | (string & {});
  /** Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. */
  exemptedMembers?: Array<string>;
}

export const AuditLogConfig: Schema.Schema<AuditLogConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      logType: Schema.optional(Schema.String),
      exemptedMembers: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "AuditLogConfig",
  }) as any as Schema.Schema<AuditLogConfig>;

export interface AuditConfig {
  /** Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. */
  service?: string;
  /** The configuration for logging of each type of permission. */
  auditLogConfigs?: Array<AuditLogConfig>;
}

export const AuditConfig: Schema.Schema<AuditConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      service: Schema.optional(Schema.String),
      auditLogConfigs: Schema.optional(Schema.Array(AuditLogConfig)),
    }),
  ).annotate({
    identifier: "AuditConfig",
  }) as any as Schema.Schema<AuditConfig>;

export interface Expr {
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
}

export const Expr: Schema.Schema<Expr> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      description: Schema.optional(Schema.String),
      location: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      expression: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface Binding {
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: Expr;
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
}

export const Binding: Schema.Schema<Binding> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      condition: Schema.optional(Expr),
      role: Schema.optional(Schema.String),
      members: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({ identifier: "Binding" }) as any as Schema.Schema<Binding>;

export interface Policy {
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<AuditConfig>;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
}

export const Policy: Schema.Schema<Policy> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      etag: Schema.optional(Schema.String),
      version: Schema.optional(Schema.Number),
      auditConfigs: Schema.optional(Schema.Array(AuditConfig)),
      bindings: Schema.optional(Schema.Array(Binding)),
    }),
  ).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface ClusterSelector {
  /** Required. A valid CEL (Common Expression Language) expression which evaluates `resource.labels`. */
  labelSelector?: string;
}

export const ClusterSelector: Schema.Schema<ClusterSelector> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      labelSelector: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ClusterSelector",
  }) as any as Schema.Schema<ClusterSelector>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      permissions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "TestIamPermissionsRequest",
  }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
  /** OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` */
  updateMask?: string;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      policy: Schema.optional(Policy),
      updateMask: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SetIamPolicyRequest",
  }) as any as Schema.Schema<SetIamPolicyRequest>;

export interface GoogleRpcStatus {
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const GoogleRpcStatus: Schema.Schema<GoogleRpcStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      message: Schema.optional(Schema.String),
      code: Schema.optional(Schema.Number),
      details: Schema.optional(
        Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
      ),
    }),
  ).annotate({
    identifier: "GoogleRpcStatus",
  }) as any as Schema.Schema<GoogleRpcStatus>;

export interface Stage {
  /** Optional. Soak time after upgrading all the clusters in the stage. */
  soakDuration?: string;
  /** Required. List of Fleet projects to select the clusters from. Expected format: projects/{project} */
  fleetProjects?: Array<string>;
  /** Optional. Filter members of fleets (above) to a subset of clusters. If not specified, all clusters in the fleets are selected. */
  clusterSelector?: ClusterSelector;
}

export const Stage: Schema.Schema<Stage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      soakDuration: Schema.optional(Schema.String),
      fleetProjects: Schema.optional(Schema.Array(Schema.String)),
      clusterSelector: Schema.optional(ClusterSelector),
    }),
  ).annotate({ identifier: "Stage" }) as any as Schema.Schema<Stage>;

export interface RolloutSequenceState {
  /** Output only. Lifecycle state of the Rollout Sequence. */
  lifecycleState?:
    | "LIFECYCLE_STATE_UNSPECIFIED"
    | "LIFECYCLE_STATE_ACTIVE"
    | "LIFECYCLE_STATE_WARNING"
    | "LIFECYCLE_STATE_ERROR"
    | (string & {});
  /** Output only. StateReason represents the reason for the Rollout Sequence state. */
  stateReasons?: Array<
    | "STATE_REASON_UNSPECIFIED"
    | "FLEET_FEATURE_DELETED_ERROR"
    | "FLEET_DELETED_ERROR"
    | "EMPTY_STAGE_WARNING"
    | "MIXED_RELEASE_CHANNELS_WARNING"
    | "INTERNAL_ERROR"
    | (string & {})
  >;
}

export const RolloutSequenceState: Schema.Schema<RolloutSequenceState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      lifecycleState: Schema.optional(Schema.String),
      stateReasons: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "RolloutSequenceState",
  }) as any as Schema.Schema<RolloutSequenceState>;

export interface RolloutSequence {
  /** Optional. Human readable display name of the Rollout Sequence. */
  displayName?: string;
  /** Optional. Labels for this Rollout Sequence. */
  labels?: Record<string, string>;
  /** Output only. The timestamp at which the Rollout Sequence was created. */
  createTime?: string;
  /** Output only. The timestamp at which the Rollout Sequence was last updated. */
  updateTime?: string;
  /** Identifier. Name of the rollout sequence in the format of: projects/{PROJECT_ID}/locations/global/rolloutSequences/{NAME} */
  name?: string;
  /** Output only. Google-generated UUID for this resource. This is unique across all Rollout Sequence resources. If a Rollout Sequence resource is deleted and another resource with the same name is created, it gets a different uid. */
  uid?: string;
  /** Output only. The timestamp at the Rollout Sequence was deleted. */
  deleteTime?: string;
  /** Output only. etag of the Rollout Sequence Ex. abc1234 */
  etag?: string;
  /** Required. Ordered list of stages that constitutes this Rollout. */
  stages?: Array<Stage>;
  /** Output only. State of the Rollout Sequence as a whole. */
  state?: RolloutSequenceState;
}

export const RolloutSequence: Schema.Schema<RolloutSequence> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      createTime: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      uid: Schema.optional(Schema.String),
      deleteTime: Schema.optional(Schema.String),
      etag: Schema.optional(Schema.String),
      stages: Schema.optional(Schema.Array(Stage)),
      state: Schema.optional(RolloutSequenceState),
    }),
  ).annotate({
    identifier: "RolloutSequence",
  }) as any as Schema.Schema<RolloutSequence>;

export interface ListRolloutSequencesResponse {
  /** The rollout sequences from the specified parent resource. */
  rolloutSequences?: Array<RolloutSequence>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListRolloutSequencesResponse: Schema.Schema<ListRolloutSequencesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      rolloutSequences: Schema.optional(Schema.Array(RolloutSequence)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListRolloutSequencesResponse",
  }) as any as Schema.Schema<ListRolloutSequencesResponse>;

export interface ComplianceStandard {
  /** Name of the compliance standard. */
  standard?: string;
}

export const ComplianceStandard: Schema.Schema<ComplianceStandard> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      standard: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ComplianceStandard",
  }) as any as Schema.Schema<ComplianceStandard>;

export interface TypeMeta {
  /** Kind of the resource (e.g. Deployment). */
  kind?: string;
  /** APIVersion of the resource (e.g. v1). */
  apiVersion?: string;
}

export const TypeMeta: Schema.Schema<TypeMeta> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      apiVersion: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "TypeMeta" }) as any as Schema.Schema<TypeMeta>;

export interface ConnectAgentResource {
  /** YAML manifest of the resource. */
  manifest?: string;
  /** Kubernetes type of the resource. */
  type?: TypeMeta;
}

export const ConnectAgentResource: Schema.Schema<ConnectAgentResource> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      manifest: Schema.optional(Schema.String),
      type: Schema.optional(TypeMeta),
    }),
  ).annotate({
    identifier: "ConnectAgentResource",
  }) as any as Schema.Schema<ConnectAgentResource>;

export interface GenerateConnectManifestResponse {
  /** The ordered list of Kubernetes resources that need to be applied to the cluster for GKE Connect agent installation/upgrade. */
  manifest?: Array<ConnectAgentResource>;
}

export const GenerateConnectManifestResponse: Schema.Schema<GenerateConnectManifestResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      manifest: Schema.optional(Schema.Array(ConnectAgentResource)),
    }),
  ).annotate({
    identifier: "GenerateConnectManifestResponse",
  }) as any as Schema.Schema<GenerateConnectManifestResponse>;

export interface OperationMetadata {
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusDetail?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have google.longrunning.Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  cancelRequested?: boolean;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      apiVersion: Schema.optional(Schema.String),
      target: Schema.optional(Schema.String),
      verb: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      statusDetail: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      cancelRequested: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "OperationMetadata",
  }) as any as Schema.Schema<OperationMetadata>;

export interface MembershipBindingLifecycleState {
  /** Output only. The current state of the MembershipBinding resource. */
  code?:
    | "CODE_UNSPECIFIED"
    | "CREATING"
    | "READY"
    | "DELETING"
    | "UPDATING"
    | (string & {});
}

export const MembershipBindingLifecycleState: Schema.Schema<MembershipBindingLifecycleState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      code: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "MembershipBindingLifecycleState",
  }) as any as Schema.Schema<MembershipBindingLifecycleState>;

export interface MembershipBinding {
  /** A Scope resource name in the format `projects/* /locations/* /scopes/*`. */
  scope?: string;
  /** Optional. Labels for this MembershipBinding. */
  labels?: Record<string, string>;
  /** Output only. When the membership binding was last updated. */
  updateTime?: string;
  /** The resource name for the membershipbinding itself `projects/{project}/locations/{location}/memberships/{membership}/bindings/{membershipbinding}` */
  name?: string;
  /** Output only. Google-generated UUID for this resource. This is unique across all membershipbinding resources. If a membershipbinding resource is deleted and another resource with the same name is created, it gets a different uid. */
  uid?: string;
  /** Output only. When the membership binding was deleted. */
  deleteTime?: string;
  /** Output only. State of the membership binding resource. */
  state?: MembershipBindingLifecycleState;
  /** Output only. When the membership binding was created. */
  createTime?: string;
}

export const MembershipBinding: Schema.Schema<MembershipBinding> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      scope: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      updateTime: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      uid: Schema.optional(Schema.String),
      deleteTime: Schema.optional(Schema.String),
      state: Schema.optional(MembershipBindingLifecycleState),
      createTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "MembershipBinding",
  }) as any as Schema.Schema<MembershipBinding>;

export interface Authority {
  /** Optional. Output only. The name of the scope-tenancy workload identity pool. This pool is set in the fleet-level feature. */
  scopeTenancyWorkloadIdentityPool?: string;
  /** Output only. The name of the workload identity pool in which `issuer` will be recognized. There is a single Workload Identity Pool per Hub that is shared between all Memberships that belong to that Hub. For a Hub hosted in {PROJECT_ID}, the workload pool format is `{PROJECT_ID}.hub.id.goog`, although this is subject to change in newer versions of this API. */
  workloadIdentityPool?: string;
  /** Optional. OIDC verification keys for this Membership in JWKS format (RFC 7517). When this field is set, OIDC discovery will NOT be performed on `issuer`, and instead OIDC tokens will be validated using this field. */
  oidcJwks?: string;
  /** Optional. A JSON Web Token (JWT) issuer URI. `issuer` must start with `https://` and be a valid URL with length <2000 characters, it must use `location` rather than `zone` for GKE clusters. If set, then Google will allow valid OIDC tokens from this issuer to authenticate within the workload_identity_pool. OIDC discovery will be performed on this URI to validate tokens from the issuer. Clearing `issuer` disables Workload Identity. `issuer` cannot be directly modified; it must be cleared (and Workload Identity disabled) before using a new issuer (and re-enabling Workload Identity). */
  issuer?: string;
  /** Output only. An identity provider that reflects the `issuer` in the workload identity pool. */
  identityProvider?: string;
  /** Optional. Output only. The identity provider for the scope-tenancy workload identity pool. */
  scopeTenancyIdentityProvider?: string;
}

export const Authority: Schema.Schema<Authority> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      scopeTenancyWorkloadIdentityPool: Schema.optional(Schema.String),
      workloadIdentityPool: Schema.optional(Schema.String),
      oidcJwks: Schema.optional(Schema.String),
      issuer: Schema.optional(Schema.String),
      identityProvider: Schema.optional(Schema.String),
      scopeTenancyIdentityProvider: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Authority" }) as any as Schema.Schema<Authority>;

export interface EdgeCluster {
  /** Immutable. Self-link of the Google Cloud resource for the Edge Cluster. For example: //edgecontainer.googleapis.com/projects/my-project/locations/us-west1-a/clusters/my-cluster */
  resourceLink?: string;
}

export const EdgeCluster: Schema.Schema<EdgeCluster> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resourceLink: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EdgeCluster",
  }) as any as Schema.Schema<EdgeCluster>;

export interface ListMembershipBindingsResponse {
  /** The list of membership_bindings */
  membershipBindings?: Array<MembershipBinding>;
  /** A token to request the next page of resources from the `ListMembershipBindings` method. The value of an empty string means that there are no more resources to return. */
  nextPageToken?: string;
  /** List of locations that could not be reached while fetching this list. */
  unreachable?: Array<string>;
}

export const ListMembershipBindingsResponse: Schema.Schema<ListMembershipBindingsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      membershipBindings: Schema.optional(Schema.Array(MembershipBinding)),
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListMembershipBindingsResponse",
  }) as any as Schema.Schema<ListMembershipBindingsResponse>;

export interface CancelOperationRequest {}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "CancelOperationRequest",
  }) as any as Schema.Schema<CancelOperationRequest>;

export interface Role {
  /** predefined_role is the Kubernetes default role to use */
  predefinedRole?:
    | "UNKNOWN"
    | "ADMIN"
    | "EDIT"
    | "VIEW"
    | "ANTHOS_SUPPORT"
    | (string & {});
  /** Optional. custom_role is the name of a custom KubernetesClusterRole to use. */
  customRole?: string;
}

export const Role: Schema.Schema<Role> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      predefinedRole: Schema.optional(Schema.String),
      customRole: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Role" }) as any as Schema.Schema<Role>;

export interface RBACRoleBindingLifecycleState {
  /** Output only. The current state of the rbacrolebinding resource. */
  code?:
    | "CODE_UNSPECIFIED"
    | "CREATING"
    | "READY"
    | "DELETING"
    | "UPDATING"
    | (string & {});
}

export const RBACRoleBindingLifecycleState: Schema.Schema<RBACRoleBindingLifecycleState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      code: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RBACRoleBindingLifecycleState",
  }) as any as Schema.Schema<RBACRoleBindingLifecycleState>;

export interface RBACRoleBinding {
  /** Output only. When the rbacrolebinding was created. */
  createTime?: string;
  /** Required. Role to bind to the principal */
  role?: Role;
  /** Optional. Labels for this RBACRolebinding. */
  labels?: Record<string, string>;
  /** Output only. State of the rbacrolebinding resource. */
  state?: RBACRoleBindingLifecycleState;
  /** user is the name of the user as seen by the kubernetes cluster, example "alice" or "alice@domain.tld" */
  user?: string;
  /** Output only. When the rbacrolebinding was last updated. */
  updateTime?: string;
  /** group is the group, as seen by the kubernetes cluster. */
  group?: string;
  /** The resource name for the rbacrolebinding `projects/{project}/locations/{location}/scopes/{scope}/rbacrolebindings/{rbacrolebinding}` or `projects/{project}/locations/{location}/memberships/{membership}/rbacrolebindings/{rbacrolebinding}` */
  name?: string;
  /** Output only. Google-generated UUID for this resource. This is unique across all rbacrolebinding resources. If a rbacrolebinding resource is deleted and another resource with the same name is created, it gets a different uid. */
  uid?: string;
  /** Output only. When the rbacrolebinding was deleted. */
  deleteTime?: string;
}

export const RBACRoleBinding: Schema.Schema<RBACRoleBinding> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      createTime: Schema.optional(Schema.String),
      role: Schema.optional(Role),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      state: Schema.optional(RBACRoleBindingLifecycleState),
      user: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      group: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      uid: Schema.optional(Schema.String),
      deleteTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RBACRoleBinding",
  }) as any as Schema.Schema<RBACRoleBinding>;

export interface ListMembershipRBACRoleBindingsResponse {
  /** A token to request the next page of resources from the `ListMembershipRBACRoleBindings` method. The value of an empty string means that there are no more resources to return. */
  nextPageToken?: string;
  /** List of locations that could not be reached while fetching this list. */
  unreachable?: Array<string>;
  /** The list of Membership RBACRoleBindings. */
  rbacrolebindings?: Array<RBACRoleBinding>;
}

export const ListMembershipRBACRoleBindingsResponse: Schema.Schema<ListMembershipRBACRoleBindingsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      rbacrolebindings: Schema.optional(Schema.Array(RBACRoleBinding)),
    }),
  ).annotate({
    identifier: "ListMembershipRBACRoleBindingsResponse",
  }) as any as Schema.Schema<ListMembershipRBACRoleBindingsResponse>;

export interface Location {
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
}

export const Location: Schema.Schema<Location> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      locationId: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface ListLocationsResponse {
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** A list of locations that matches the specified filter in the request. */
  locations?: Array<Location>;
}

export const ListLocationsResponse: Schema.Schema<ListLocationsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      locations: Schema.optional(Schema.Array(Location)),
    }),
  ).annotate({
    identifier: "ListLocationsResponse",
  }) as any as Schema.Schema<ListLocationsResponse>;

export interface MembershipState {
  /** Output only. The current state of the Membership resource. */
  code?:
    | "CODE_UNSPECIFIED"
    | "CREATING"
    | "READY"
    | "DELETING"
    | "UPDATING"
    | "SERVICE_UPDATING"
    | (string & {});
}

export const MembershipState: Schema.Schema<MembershipState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      code: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "MembershipState",
  }) as any as Schema.Schema<MembershipState>;

export interface ResourceOptions {
  /** Optional. Use `apiextensions/v1beta1` instead of `apiextensions/v1` for CustomResourceDefinition resources. This option should be set for clusters with Kubernetes apiserver versions <1.16. */
  v1beta1Crd?: boolean;
  /** Optional. The Connect agent version to use for connect_resources. Defaults to the latest GKE Connect version. The version must be a currently supported version, obsolete versions will be rejected. */
  connectVersion?: string;
  /** Optional. Major and minor version of the Kubernetes cluster. This is only used to determine which version to use for the CustomResourceDefinition resources, `apiextensions/v1beta1` or`apiextensions/v1`. */
  k8sVersion?: string;
  /** Optional. Git version of the Kubernetes cluster. This is only used to gate the Connect Agent migration to svc.id.goog on GDC-SO 1.33.100 patch and above. */
  k8sGitVersion?: string;
}

export const ResourceOptions: Schema.Schema<ResourceOptions> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      v1beta1Crd: Schema.optional(Schema.Boolean),
      connectVersion: Schema.optional(Schema.String),
      k8sVersion: Schema.optional(Schema.String),
      k8sGitVersion: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ResourceOptions",
  }) as any as Schema.Schema<ResourceOptions>;

export interface ResourceManifest {
  /** Output only. YAML manifest of the resource. */
  manifest?: string;
  /** Output only. Whether the resource provided in the manifest is `cluster_scoped`. If unset, the manifest is assumed to be namespace scoped. This field is used for REST mapping when applying the resource in a cluster. */
  clusterScoped?: boolean;
}

export const ResourceManifest: Schema.Schema<ResourceManifest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      manifest: Schema.optional(Schema.String),
      clusterScoped: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "ResourceManifest",
  }) as any as Schema.Schema<ResourceManifest>;

export interface KubernetesResource {
  /** Optional. Options for Kubernetes resource generation. */
  resourceOptions?: ResourceOptions;
  /** Input only. The YAML representation of the Membership CR. This field is ignored for GKE clusters where Hub can read the CR directly. Callers should provide the CR that is currently present in the cluster during CreateMembership or UpdateMembership, or leave this field empty if none exists. The CR manifest is used to validate the cluster has not been registered with another Membership. */
  membershipCrManifest?: string;
  /** Output only. Additional Kubernetes resources that need to be applied to the cluster after Membership creation, and after every update. This field is only populated in the Membership returned from a successful long-running operation from CreateMembership or UpdateMembership. It is not populated during normal GetMembership or ListMemberships requests. To get the resource manifest after the initial registration, the caller should make a UpdateMembership call with an empty field mask. */
  membershipResources?: Array<ResourceManifest>;
  /** Output only. The Kubernetes resources for installing the GKE Connect agent This field is only populated in the Membership returned from a successful long-running operation from CreateMembership or UpdateMembership. It is not populated during normal GetMembership or ListMemberships requests. To get the resource manifest after the initial registration, the caller should make a UpdateMembership call with an empty field mask. */
  connectResources?: Array<ResourceManifest>;
}

export const KubernetesResource: Schema.Schema<KubernetesResource> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resourceOptions: Schema.optional(ResourceOptions),
      membershipCrManifest: Schema.optional(Schema.String),
      membershipResources: Schema.optional(Schema.Array(ResourceManifest)),
      connectResources: Schema.optional(Schema.Array(ResourceManifest)),
    }),
  ).annotate({
    identifier: "KubernetesResource",
  }) as any as Schema.Schema<KubernetesResource>;

export interface MultiCloudCluster {
  /** Immutable. Self-link of the Google Cloud resource for the GKE Multi-Cloud cluster. For example: //gkemulticloud.googleapis.com/projects/my-project/locations/us-west1-a/awsClusters/my-cluster //gkemulticloud.googleapis.com/projects/my-project/locations/us-west1-a/azureClusters/my-cluster //gkemulticloud.googleapis.com/projects/my-project/locations/us-west1-a/attachedClusters/my-cluster */
  resourceLink?: string;
  /** Output only. If cluster_missing is set then it denotes that API(gkemulticloud.googleapis.com) resource for this GKE Multi-Cloud cluster no longer exists. */
  clusterMissing?: boolean;
}

export const MultiCloudCluster: Schema.Schema<MultiCloudCluster> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resourceLink: Schema.optional(Schema.String),
      clusterMissing: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "MultiCloudCluster",
  }) as any as Schema.Schema<MultiCloudCluster>;

export interface GkeCluster {
  /** Output only. If cluster_missing is set then it denotes that the GKE cluster no longer exists in the GKE Control Plane. */
  clusterMissing?: boolean;
  /** Immutable. Self-link of the Google Cloud resource for the GKE cluster. For example: //container.googleapis.com/projects/my-project/locations/us-west1-a/clusters/my-cluster Zonal clusters are also supported. */
  resourceLink?: string;
}

export const GkeCluster: Schema.Schema<GkeCluster> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      clusterMissing: Schema.optional(Schema.Boolean),
      resourceLink: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "GkeCluster" }) as any as Schema.Schema<GkeCluster>;

export interface OnPremCluster {
  /** Immutable. Self-link of the Google Cloud resource for the GKE On-Prem cluster. For example: //gkeonprem.googleapis.com/projects/my-project/locations/us-west1-a/vmwareClusters/my-cluster //gkeonprem.googleapis.com/projects/my-project/locations/us-west1-a/bareMetalClusters/my-cluster */
  resourceLink?: string;
  /** Output only. If cluster_missing is set then it denotes that API(gkeonprem.googleapis.com) resource for this GKE On-Prem cluster no longer exists. */
  clusterMissing?: boolean;
  /** Immutable. Whether the cluster is an admin cluster. */
  adminCluster?: boolean;
  /** Immutable. The on prem cluster's type. */
  clusterType?:
    | "CLUSTERTYPE_UNSPECIFIED"
    | "BOOTSTRAP"
    | "HYBRID"
    | "STANDALONE"
    | "USER"
    | (string & {});
}

export const OnPremCluster: Schema.Schema<OnPremCluster> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resourceLink: Schema.optional(Schema.String),
      clusterMissing: Schema.optional(Schema.Boolean),
      adminCluster: Schema.optional(Schema.Boolean),
      clusterType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OnPremCluster",
  }) as any as Schema.Schema<OnPremCluster>;

export interface ApplianceCluster {
  /** Immutable. Self-link of the Google Cloud resource for the Appliance Cluster. For example: //transferappliance.googleapis.com/projects/my-project/locations/us-west1-a/appliances/my-appliance */
  resourceLink?: string;
}

export const ApplianceCluster: Schema.Schema<ApplianceCluster> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resourceLink: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ApplianceCluster",
  }) as any as Schema.Schema<ApplianceCluster>;

export interface KubernetesMetadata {
  /** Output only. Kubernetes API server version string as reported by `/version`. */
  kubernetesApiServerVersion?: string;
  /** Output only. Node providerID as reported by the first node in the list of nodes on the Kubernetes endpoint. On Kubernetes platforms that support zero-node clusters (like GKE on Google Cloud), the node_count will be zero and the node_provider_id will be empty. */
  nodeProviderId?: string;
  /** Output only. Node count as reported by Kubernetes nodes resources. */
  nodeCount?: number;
  /** Output only. vCPU count as reported by Kubernetes nodes resources. */
  vcpuCount?: number;
  /** Output only. The total memory capacity as reported by the sum of all Kubernetes nodes resources, defined in MB. */
  memoryMb?: number;
  /** Output only. The time at which these details were last updated. This update_time is different from the Membership-level update_time since EndpointDetails are updated internally for API consumers. */
  updateTime?: string;
}

export const KubernetesMetadata: Schema.Schema<KubernetesMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kubernetesApiServerVersion: Schema.optional(Schema.String),
      nodeProviderId: Schema.optional(Schema.String),
      nodeCount: Schema.optional(Schema.Number),
      vcpuCount: Schema.optional(Schema.Number),
      memoryMb: Schema.optional(Schema.Number),
      updateTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "KubernetesMetadata",
  }) as any as Schema.Schema<KubernetesMetadata>;

export interface MembershipEndpoint {
  /** Optional. Specific information for a Google Edge cluster. */
  edgeCluster?: EdgeCluster;
  /** Optional. The in-cluster Kubernetes Resources that should be applied for a correctly registered cluster, in the steady state. These resources: * Ensure that the cluster is exclusively registered to one and only one Hub Membership. * Propagate Workload Pool Information available in the Membership Authority field. * Ensure proper initial configuration of default Hub Features. */
  kubernetesResource?: KubernetesResource;
  /** Optional. Specific information for a GKE Multi-Cloud cluster. */
  multiCloudCluster?: MultiCloudCluster;
  /** Optional. Specific information for a GKE on Google Cloud cluster. */
  gkeCluster?: GkeCluster;
  /** Optional. Specific information for a GKE On-Prem cluster. An onprem user-cluster who has no resourceLink is not allowed to use this field, it should have a nil "type" instead. */
  onPremCluster?: OnPremCluster;
  /** Optional. Specific information for a GDC Edge Appliance cluster. */
  applianceCluster?: ApplianceCluster;
  /** Output only. Useful Kubernetes-specific metadata. */
  kubernetesMetadata?: KubernetesMetadata;
  /** Output only. Whether the lifecycle of this membership is managed by a google cluster platform service. */
  googleManaged?: boolean;
}

export const MembershipEndpoint: Schema.Schema<MembershipEndpoint> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      edgeCluster: Schema.optional(EdgeCluster),
      kubernetesResource: Schema.optional(KubernetesResource),
      multiCloudCluster: Schema.optional(MultiCloudCluster),
      gkeCluster: Schema.optional(GkeCluster),
      onPremCluster: Schema.optional(OnPremCluster),
      applianceCluster: Schema.optional(ApplianceCluster),
      kubernetesMetadata: Schema.optional(KubernetesMetadata),
      googleManaged: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "MembershipEndpoint",
  }) as any as Schema.Schema<MembershipEndpoint>;

export interface MonitoringConfig {
  /** Optional. Kubernetes system metrics, if available, are written to this prefix. This defaults to kubernetes.io for GKE, and kubernetes.io/anthos for Anthos eventually. Noted: Anthos MultiCloud will have kubernetes.io prefix today but will migration to be under kubernetes.io/anthos. */
  kubernetesMetricsPrefix?: string;
  /** Optional. Project used to report Metrics */
  projectId?: string;
  /** Optional. Location used to report Metrics */
  location?: string;
  /** Optional. Cluster name used to report metrics. For Anthos on VMWare/Baremetal/MultiCloud clusters, it would be in format {cluster_type}/{cluster_name}, e.g., "awsClusters/cluster_1". */
  cluster?: string;
  /** Optional. For GKE and Multicloud clusters, this is the UUID of the cluster resource. For VMWare and Baremetal clusters, this is the kube-system UID. */
  clusterHash?: string;
}

export const MonitoringConfig: Schema.Schema<MonitoringConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kubernetesMetricsPrefix: Schema.optional(Schema.String),
      projectId: Schema.optional(Schema.String),
      location: Schema.optional(Schema.String),
      cluster: Schema.optional(Schema.String),
      clusterHash: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "MonitoringConfig",
  }) as any as Schema.Schema<MonitoringConfig>;

export interface Membership {
  /** Output only. The type of the membership. */
  membershipType?:
    | "MEMBERSHIP_TYPE_UNSPECIFIED"
    | "LIGHTWEIGHT"
    | (string & {});
  /** Optional. Endpoint information to reach this member. */
  endpoint?: MembershipEndpoint;
  /** Output only. For clusters using Connect, the timestamp of the most recent connection established with Google Cloud. This time is updated every several minutes, not continuously. For clusters that do not use GKE Connect, or that have never connected successfully, this field will be unset. */
  lastConnectionTime?: string;
  /** Optional. The monitoring config information for this membership. */
  monitoringConfig?: MonitoringConfig;
  /** Optional. How to identify workloads from this Membership. See the documentation on Workload Identity for more details: https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity */
  authority?: Authority;
  /** Output only. When the Membership was deleted. */
  deleteTime?: string;
  /** Output only. When the Membership was created. */
  createTime?: string;
  /** Output only. Google-generated UUID for this resource. This is unique across all Membership resources. If a Membership resource is deleted and another resource with the same name is created, it gets a different unique_id. */
  uniqueId?: string;
  /** Optional. Labels for this membership. These labels are not leveraged by multi-cluster features, instead, we prefer cluster labels, which can be set on GKE cluster or other cluster types. */
  labels?: Record<string, string>;
  /** Output only. The tier of the cluster. */
  clusterTier?:
    | "CLUSTER_TIER_UNSPECIFIED"
    | "STANDARD"
    | "ENTERPRISE"
    | (string & {});
  /** Optional. An externally-generated and managed ID for this Membership. This ID may be modified after creation, but this is not recommended. The ID must match the regex: `a-zA-Z0-9*` If this Membership represents a Kubernetes cluster, this value should be set to the UID of the `kube-system` namespace object. */
  externalId?: string;
  /** Output only. Description of this membership, limited to 63 characters. Must match the regex: `a-zA-Z0-9*` This field is present for legacy purposes. */
  description?: string;
  /** Output only. State of the Membership resource. */
  state?: MembershipState;
  /** Output only. When the Membership was last updated. */
  updateTime?: string;
  /** Output only. The full, unique name of this Membership resource in the format `projects/* /locations/* /memberships/{membership_id}`, set during creation. `membership_id` must be a valid RFC 1123 compliant DNS label: 1. At most 63 characters in length 2. It must consist of lower case alphanumeric characters or `-` 3. It must start and end with an alphanumeric character Which can be expressed as the regex: `[a-z0-9]([-a-z0-9]*[a-z0-9])?`, with a maximum length of 63 characters. */
  name?: string;
}

export const Membership: Schema.Schema<Membership> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      membershipType: Schema.optional(Schema.String),
      endpoint: Schema.optional(MembershipEndpoint),
      lastConnectionTime: Schema.optional(Schema.String),
      monitoringConfig: Schema.optional(MonitoringConfig),
      authority: Schema.optional(Authority),
      deleteTime: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      uniqueId: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      clusterTier: Schema.optional(Schema.String),
      externalId: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      state: Schema.optional(MembershipState),
      updateTime: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Membership" }) as any as Schema.Schema<Membership>;

export interface CompliancePostureConfig {
  /** Defines the enablement mode for Compliance Posture. */
  mode?: "MODE_UNSPECIFIED" | "DISABLED" | "ENABLED" | (string & {});
  /** List of enabled compliance standards. */
  complianceStandards?: Array<ComplianceStandard>;
}

export const CompliancePostureConfig: Schema.Schema<CompliancePostureConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      mode: Schema.optional(Schema.String),
      complianceStandards: Schema.optional(Schema.Array(ComplianceStandard)),
    }),
  ).annotate({
    identifier: "CompliancePostureConfig",
  }) as any as Schema.Schema<CompliancePostureConfig>;

export interface NamespaceLifecycleState {
  /** Output only. The current state of the Namespace resource. */
  code?:
    | "CODE_UNSPECIFIED"
    | "CREATING"
    | "READY"
    | "DELETING"
    | "UPDATING"
    | (string & {});
}

export const NamespaceLifecycleState: Schema.Schema<NamespaceLifecycleState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      code: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "NamespaceLifecycleState",
  }) as any as Schema.Schema<NamespaceLifecycleState>;

export interface Namespace {
  /** Required. Scope associated with the namespace */
  scope?: string;
  /** Output only. When the namespace was last updated. */
  updateTime?: string;
  /** Optional. Namespace-level cluster namespace labels. These labels are applied to the related namespace of the member clusters bound to the parent Scope. Scope-level labels (`namespace_labels` in the Fleet Scope resource) take precedence over Namespace-level labels if they share a key. Keys and values must be Kubernetes-conformant. */
  namespaceLabels?: Record<string, string>;
  /** The resource name for the namespace `projects/{project}/locations/{location}/namespaces/{namespace}` */
  name?: string;
  /** Output only. Google-generated UUID for this resource. This is unique across all namespace resources. If a namespace resource is deleted and another resource with the same name is created, it gets a different uid. */
  uid?: string;
  /** Output only. When the namespace was deleted. */
  deleteTime?: string;
  /** Output only. State of the namespace resource. */
  state?: NamespaceLifecycleState;
  /** Optional. Labels for this Namespace. */
  labels?: Record<string, string>;
  /** Output only. When the namespace was created. */
  createTime?: string;
}

export const Namespace: Schema.Schema<Namespace> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      scope: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      namespaceLabels: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      name: Schema.optional(Schema.String),
      uid: Schema.optional(Schema.String),
      deleteTime: Schema.optional(Schema.String),
      state: Schema.optional(NamespaceLifecycleState),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      createTime: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Namespace" }) as any as Schema.Schema<Namespace>;

export interface ScopeLifecycleState {
  /** Output only. The current state of the scope resource. */
  code?:
    | "CODE_UNSPECIFIED"
    | "CREATING"
    | "READY"
    | "DELETING"
    | "UPDATING"
    | (string & {});
}

export const ScopeLifecycleState: Schema.Schema<ScopeLifecycleState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      code: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ScopeLifecycleState",
  }) as any as Schema.Schema<ScopeLifecycleState>;

export interface Scope {
  /** Optional. Labels for this Scope. */
  labels?: Record<string, string>;
  /** Output only. When the scope was last updated. */
  updateTime?: string;
  /** Optional. Scope-level cluster namespace labels. For the member clusters bound to the Scope, these labels are applied to each namespace under the Scope. Scope-level labels take precedence over Namespace-level labels (`namespace_labels` in the Fleet Namespace resource) if they share a key. Keys and values must be Kubernetes-conformant. */
  namespaceLabels?: Record<string, string>;
  /** The resource name for the scope `projects/{project}/locations/{location}/scopes/{scope}` */
  name?: string;
  /** Output only. Google-generated UUID for this resource. This is unique across all scope resources. If a scope resource is deleted and another resource with the same name is created, it gets a different uid. */
  uid?: string;
  /** Output only. When the scope was deleted. */
  deleteTime?: string;
  /** Output only. State of the scope resource. */
  state?: ScopeLifecycleState;
  /** Output only. When the scope was created. */
  createTime?: string;
}

export const Scope: Schema.Schema<Scope> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      updateTime: Schema.optional(Schema.String),
      namespaceLabels: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      name: Schema.optional(Schema.String),
      uid: Schema.optional(Schema.String),
      deleteTime: Schema.optional(Schema.String),
      state: Schema.optional(ScopeLifecycleState),
      createTime: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Scope" }) as any as Schema.Schema<Scope>;

export interface ListPermittedScopesResponse {
  /** The list of permitted Scopes */
  scopes?: Array<Scope>;
  /** A token to request the next page of resources from the `ListPermittedScopes` method. The value of an empty string means that there are no more resources to return. */
  nextPageToken?: string;
}

export const ListPermittedScopesResponse: Schema.Schema<ListPermittedScopesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      scopes: Schema.optional(Schema.Array(Scope)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListPermittedScopesResponse",
  }) as any as Schema.Schema<ListPermittedScopesResponse>;

export interface ListMembershipsResponse {
  /** The list of matching Memberships. */
  resources?: Array<Membership>;
  /** A token to request the next page of resources from the `ListMemberships` method. The value of an empty string means that there are no more resources to return. */
  nextPageToken?: string;
  /** List of locations that could not be reached while fetching this list. */
  unreachable?: Array<string>;
}

export const ListMembershipsResponse: Schema.Schema<ListMembershipsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resources: Schema.optional(Schema.Array(Membership)),
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListMembershipsResponse",
  }) as any as Schema.Schema<ListMembershipsResponse>;

export interface ListBoundMembershipsResponse {
  /** List of locations that could not be reached while fetching this list. */
  unreachable?: Array<string>;
  /** The list of Memberships bound to the given Scope. */
  memberships?: Array<Membership>;
  /** A token to request the next page of resources from the `ListBoundMemberships` method. The value of an empty string means that there are no more resources to return. */
  nextPageToken?: string;
}

export const ListBoundMembershipsResponse: Schema.Schema<ListBoundMembershipsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      memberships: Schema.optional(Schema.Array(Membership)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListBoundMembershipsResponse",
  }) as any as Schema.Schema<ListBoundMembershipsResponse>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "Empty",
  }) as any as Schema.Schema<Empty>;

export interface SecurityPostureConfig {
  /** Sets which mode to use for vulnerability scanning. */
  vulnerabilityMode?:
    | "VULNERABILITY_MODE_UNSPECIFIED"
    | "VULNERABILITY_DISABLED"
    | "VULNERABILITY_BASIC"
    | "VULNERABILITY_ENTERPRISE"
    | (string & {});
  /** Sets which mode to use for Security Posture features. */
  mode?:
    | "MODE_UNSPECIFIED"
    | "DISABLED"
    | "BASIC"
    | "ENTERPRISE"
    | (string & {});
}

export const SecurityPostureConfig: Schema.Schema<SecurityPostureConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      vulnerabilityMode: Schema.optional(Schema.String),
      mode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SecurityPostureConfig",
  }) as any as Schema.Schema<SecurityPostureConfig>;

export interface PolicyBinding {
  /** The relative resource name of the binauthz platform policy to audit. GKE platform policies have the following format: `projects/{project_number}/platforms/gke/policies/{policy_id}`. */
  name?: string;
}

export const PolicyBinding: Schema.Schema<PolicyBinding> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PolicyBinding",
  }) as any as Schema.Schema<PolicyBinding>;

export interface BinaryAuthorizationConfig {
  /** Optional. Mode of operation for binauthz policy evaluation. */
  evaluationMode?:
    | "EVALUATION_MODE_UNSPECIFIED"
    | "DISABLED"
    | "POLICY_BINDINGS"
    | (string & {});
  /** Optional. Binauthz policies that apply to this cluster. */
  policyBindings?: Array<PolicyBinding>;
}

export const BinaryAuthorizationConfig: Schema.Schema<BinaryAuthorizationConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      evaluationMode: Schema.optional(Schema.String),
      policyBindings: Schema.optional(Schema.Array(PolicyBinding)),
    }),
  ).annotate({
    identifier: "BinaryAuthorizationConfig",
  }) as any as Schema.Schema<BinaryAuthorizationConfig>;

export interface DefaultClusterConfig {
  /** Optional. Enable/Disable Security Posture features for the cluster. */
  securityPostureConfig?: SecurityPostureConfig;
  /** Optional. Enable/Disable binary authorization features for the cluster. */
  binaryAuthorizationConfig?: BinaryAuthorizationConfig;
  /** Optional. Deprecated: Compliance Posture is no longer supported. For more details, see https://cloud.google.com/kubernetes-engine/docs/deprecations/posture-management-deprecation. Enable/Disable Compliance Posture features for the cluster. Note that on UpdateFleet, only full replacement of this field is allowed. Users are not allowed for partial updates through field mask. */
  compliancePostureConfig?: CompliancePostureConfig;
}

export const DefaultClusterConfig: Schema.Schema<DefaultClusterConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      securityPostureConfig: Schema.optional(SecurityPostureConfig),
      binaryAuthorizationConfig: Schema.optional(BinaryAuthorizationConfig),
      compliancePostureConfig: Schema.optional(CompliancePostureConfig),
    }),
  ).annotate({
    identifier: "DefaultClusterConfig",
  }) as any as Schema.Schema<DefaultClusterConfig>;

export interface Operation {
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: GoogleRpcStatus;
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      done: Schema.optional(Schema.Boolean),
      error: Schema.optional(GoogleRpcStatus),
      name: Schema.optional(Schema.String),
      response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface FleetLifecycleState {
  /** Output only. The current state of the Fleet resource. */
  code?:
    | "CODE_UNSPECIFIED"
    | "CREATING"
    | "READY"
    | "DELETING"
    | "UPDATING"
    | (string & {});
}

export const FleetLifecycleState: Schema.Schema<FleetLifecycleState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      code: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "FleetLifecycleState",
  }) as any as Schema.Schema<FleetLifecycleState>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      permissions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "TestIamPermissionsResponse",
  }) as any as Schema.Schema<TestIamPermissionsResponse>;

export interface Fleet {
  /** Output only. The full, unique resource name of this fleet in the format of `projects/{project}/locations/{location}/fleets/{fleet}`. Each Google Cloud project can have at most one fleet resource, named "default". */
  name?: string;
  /** Output only. When the Fleet was deleted. */
  deleteTime?: string;
  /** Output only. Google-generated UUID for this resource. This is unique across all Fleet resources. If a Fleet resource is deleted and another resource with the same name is created, it gets a different uid. */
  uid?: string;
  /** Output only. When the Fleet was last updated. */
  updateTime?: string;
  /** Output only. State of the namespace resource. */
  state?: FleetLifecycleState;
  /** Optional. A user-assigned display name of the Fleet. When present, it must be between 4 to 30 characters. Allowed characters are: lowercase and uppercase letters, numbers, hyphen, single-quote, double-quote, space, and exclamation point. Example: `Production Fleet` */
  displayName?: string;
  /** Optional. Labels for this Fleet. */
  labels?: Record<string, string>;
  /** Optional. The default cluster configurations to apply across the fleet. */
  defaultClusterConfig?: DefaultClusterConfig;
  /** Output only. When the Fleet was created. */
  createTime?: string;
}

export const Fleet: Schema.Schema<Fleet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      deleteTime: Schema.optional(Schema.String),
      uid: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      state: Schema.optional(FleetLifecycleState),
      displayName: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      defaultClusterConfig: Schema.optional(DefaultClusterConfig),
      createTime: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Fleet" }) as any as Schema.Schema<Fleet>;

export interface ListScopesResponse {
  /** The list of Scopes */
  scopes?: Array<Scope>;
  /** A token to request the next page of resources from the `ListScopes` method. The value of an empty string means that there are no more resources to return. */
  nextPageToken?: string;
}

export const ListScopesResponse: Schema.Schema<ListScopesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      scopes: Schema.optional(Schema.Array(Scope)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListScopesResponse",
  }) as any as Schema.Schema<ListScopesResponse>;

export interface ListScopeNamespacesResponse {
  /** The list of fleet namespaces */
  scopeNamespaces?: Array<Namespace>;
  /** A token to request the next page of resources from the `ListNamespaces` method. The value of an empty string means that there are no more resources to return. */
  nextPageToken?: string;
}

export const ListScopeNamespacesResponse: Schema.Schema<ListScopeNamespacesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      scopeNamespaces: Schema.optional(Schema.Array(Namespace)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListScopeNamespacesResponse",
  }) as any as Schema.Schema<ListScopeNamespacesResponse>;

export interface ListScopeRBACRoleBindingsResponse {
  /** The list of Scope RBACRoleBindings. */
  rbacrolebindings?: Array<RBACRoleBinding>;
  /** A token to request the next page of resources from the `ListScopeRBACRoleBindings` method. The value of an empty string means that there are no more resources to return. */
  nextPageToken?: string;
}

export const ListScopeRBACRoleBindingsResponse: Schema.Schema<ListScopeRBACRoleBindingsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      rbacrolebindings: Schema.optional(Schema.Array(RBACRoleBinding)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListScopeRBACRoleBindingsResponse",
  }) as any as Schema.Schema<ListScopeRBACRoleBindingsResponse>;

export interface ListOperationsResponse {
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      operations: Schema.optional(Schema.Array(Operation)),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListOperationsResponse",
  }) as any as Schema.Schema<ListOperationsResponse>;

export interface ListFleetsResponse {
  /** The list of matching fleets. */
  fleets?: Array<Fleet>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. The token is only valid for 1h. */
  nextPageToken?: string;
}

export const ListFleetsResponse: Schema.Schema<ListFleetsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fleets: Schema.optional(Schema.Array(Fleet)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListFleetsResponse",
  }) as any as Schema.Schema<ListFleetsResponse>;

export interface ListRolloutsResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** The rollouts from the specified parent resource. */
  rollouts?: Array<Rollout>;
}

export const ListRolloutsResponse: Schema.Schema<ListRolloutsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      rollouts: Schema.optional(Schema.Array(Rollout)),
    }),
  ).annotate({
    identifier: "ListRolloutsResponse",
  }) as any as Schema.Schema<ListRolloutsResponse>;

export interface GenerateMembershipRBACRoleBindingYAMLResponse {
  /** a yaml text blob including the RBAC policies. */
  roleBindingsYaml?: string;
}

export const GenerateMembershipRBACRoleBindingYAMLResponse: Schema.Schema<GenerateMembershipRBACRoleBindingYAMLResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      roleBindingsYaml: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GenerateMembershipRBACRoleBindingYAMLResponse",
  }) as any as Schema.Schema<GenerateMembershipRBACRoleBindingYAMLResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetProjectsLocationsRequest {
  /** Resource name for the location. */
  name: string;
}

export const GetProjectsLocationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsRequest>;

export type GetProjectsLocationsResponse = Location;
export const GetProjectsLocationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Location;

export type GetProjectsLocationsError = DefaultErrors;

/** Gets information about a location. */
export const getProjectsLocations: API.OperationMethod<
  GetProjectsLocationsRequest,
  GetProjectsLocationsResponse,
  GetProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsRequest,
  output: GetProjectsLocationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsRequest {
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
}

export const ListProjectsLocationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("extraLocationTypes"),
    ),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({ method: "GET", path: "v1beta/projects/{projectsId}/locations" }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = ListLocationsResponse;
export const ListProjectsLocationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListLocationsResponse;

export type ListProjectsLocationsError = DefaultErrors;

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export const listProjectsLocations: API.PaginatedOperationMethod<
  ListProjectsLocationsRequest,
  ListProjectsLocationsResponse,
  ListProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsRequest,
  output: ListProjectsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListMembershipsProjectsLocationsScopesRequest {
  /** Optional. When requesting a 'page' of resources, `page_size` specifies number of resources to return. If unspecified or set to 0, all resources will be returned. Pagination is currently not supported; therefore, setting this field does not have any impact for now. */
  pageSize?: number;
  /** Required. Name of the Scope, in the format `projects/* /locations/global/scopes/*`, to which the Memberships are bound. */
  scopeName: string;
  /** Optional. Lists Memberships that match the filter expression, following the syntax outlined in https://google.aip.dev/160. Currently, filtering can be done only based on Memberships's `name`, `labels`, `create_time`, `update_time`, and `unique_id`. */
  filter?: string;
  /** Optional. Token returned by previous call to `ListBoundMemberships` which specifies the position in the list from where to continue listing the resources. */
  pageToken?: string;
}

export const ListMembershipsProjectsLocationsScopesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    scopeName: Schema.String.pipe(T.HttpPath("scopeName")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/scopes/{scopesId}:listMemberships",
    }),
    svc,
  ) as unknown as Schema.Schema<ListMembershipsProjectsLocationsScopesRequest>;

export type ListMembershipsProjectsLocationsScopesResponse =
  ListBoundMembershipsResponse;
export const ListMembershipsProjectsLocationsScopesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListBoundMembershipsResponse;

export type ListMembershipsProjectsLocationsScopesError = DefaultErrors;

/** Lists Memberships bound to a Scope. The response includes relevant Memberships from all regions. */
export const listMembershipsProjectsLocationsScopes: API.PaginatedOperationMethod<
  ListMembershipsProjectsLocationsScopesRequest,
  ListMembershipsProjectsLocationsScopesResponse,
  ListMembershipsProjectsLocationsScopesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListMembershipsProjectsLocationsScopesRequest,
  output: ListMembershipsProjectsLocationsScopesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetIamPolicyProjectsLocationsScopesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsScopesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(
      T.HttpQuery("options.requestedPolicyVersion"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/scopes/{scopesId}:getIamPolicy",
    }),
    svc,
  ) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsScopesRequest>;

export type GetIamPolicyProjectsLocationsScopesResponse = Policy;
export const GetIamPolicyProjectsLocationsScopesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type GetIamPolicyProjectsLocationsScopesError = DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsScopes: API.OperationMethod<
  GetIamPolicyProjectsLocationsScopesRequest,
  GetIamPolicyProjectsLocationsScopesResponse,
  GetIamPolicyProjectsLocationsScopesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetIamPolicyProjectsLocationsScopesRequest,
  output: GetIamPolicyProjectsLocationsScopesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsScopesRequest {
  /** Required. The Scope resource name in the format `projects/* /locations/* /scopes/*`. */
  name: string;
}

export const DeleteProjectsLocationsScopesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/scopes/{scopesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsScopesRequest>;

export type DeleteProjectsLocationsScopesResponse = Operation;
export const DeleteProjectsLocationsScopesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteProjectsLocationsScopesError = DefaultErrors;

/** Deletes a Scope. */
export const deleteProjectsLocationsScopes: API.OperationMethod<
  DeleteProjectsLocationsScopesRequest,
  DeleteProjectsLocationsScopesResponse,
  DeleteProjectsLocationsScopesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsScopesRequest,
  output: DeleteProjectsLocationsScopesResponse,
  errors: [],
}));

export interface ListProjectsLocationsScopesRequest {
  /** Required. The parent (project and location) where the Scope will be listed. Specified in the format `projects/* /locations/*`. */
  parent: string;
  /** Optional. When requesting a 'page' of resources, `page_size` specifies number of resources to return. If unspecified or set to 0, all resources will be returned. */
  pageSize?: number;
  /** Optional. Token returned by previous call to `ListScopes` which specifies the position in the list from where to continue listing the resources. */
  pageToken?: string;
}

export const ListProjectsLocationsScopesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/scopes",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsScopesRequest>;

export type ListProjectsLocationsScopesResponse = ListScopesResponse;
export const ListProjectsLocationsScopesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListScopesResponse;

export type ListProjectsLocationsScopesError = DefaultErrors;

/** Lists Scopes. */
export const listProjectsLocationsScopes: API.PaginatedOperationMethod<
  ListProjectsLocationsScopesRequest,
  ListProjectsLocationsScopesResponse,
  ListProjectsLocationsScopesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsScopesRequest,
  output: ListProjectsLocationsScopesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsScopesRequest {
  /** Required. The Scope resource name in the format `projects/* /locations/* /scopes/*`. */
  name: string;
}

export const GetProjectsLocationsScopesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/scopes/{scopesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsScopesRequest>;

export type GetProjectsLocationsScopesResponse = Scope;
export const GetProjectsLocationsScopesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Scope;

export type GetProjectsLocationsScopesError = DefaultErrors;

/** Returns the details of a Scope. */
export const getProjectsLocationsScopes: API.OperationMethod<
  GetProjectsLocationsScopesRequest,
  GetProjectsLocationsScopesResponse,
  GetProjectsLocationsScopesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsScopesRequest,
  output: GetProjectsLocationsScopesResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsScopesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsScopesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/scopes/{scopesId}:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsScopesRequest>;

export type TestIamPermissionsProjectsLocationsScopesResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsScopesResponse =
  /*@__PURE__*/ /*#__PURE__*/ TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsScopesError = DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsScopes: API.OperationMethod<
  TestIamPermissionsProjectsLocationsScopesRequest,
  TestIamPermissionsProjectsLocationsScopesResponse,
  TestIamPermissionsProjectsLocationsScopesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TestIamPermissionsProjectsLocationsScopesRequest,
  output: TestIamPermissionsProjectsLocationsScopesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsScopesRequest {
  /** Required. The parent (project and location) where the Scope will be created. Specified in the format `projects/* /locations/*`. */
  parent: string;
  /** Required. Client chosen ID for the Scope. `scope_id` must be a ???? */
  scopeId?: string;
  /** Request body */
  body?: Scope;
}

export const CreateProjectsLocationsScopesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    scopeId: Schema.optional(Schema.String).pipe(T.HttpQuery("scopeId")),
    body: Schema.optional(Scope).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/scopes",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsScopesRequest>;

export type CreateProjectsLocationsScopesResponse = Operation;
export const CreateProjectsLocationsScopesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsLocationsScopesError = DefaultErrors;

/** Creates a Scope. */
export const createProjectsLocationsScopes: API.OperationMethod<
  CreateProjectsLocationsScopesRequest,
  CreateProjectsLocationsScopesResponse,
  CreateProjectsLocationsScopesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsScopesRequest,
  output: CreateProjectsLocationsScopesResponse,
  errors: [],
}));

export interface ListPermittedProjectsLocationsScopesRequest {
  /** Required. The parent (project and location) where the Scope will be listed. Specified in the format `projects/* /locations/*`. */
  parent: string;
  /** Optional. When requesting a 'page' of resources, `page_size` specifies number of resources to return. If unspecified or set to 0, all resources will be returned. */
  pageSize?: number;
  /** Optional. Token returned by previous call to `ListPermittedScopes` which specifies the position in the list from where to continue listing the resources. */
  pageToken?: string;
}

export const ListPermittedProjectsLocationsScopesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/scopes:listPermitted",
    }),
    svc,
  ) as unknown as Schema.Schema<ListPermittedProjectsLocationsScopesRequest>;

export type ListPermittedProjectsLocationsScopesResponse =
  ListPermittedScopesResponse;
export const ListPermittedProjectsLocationsScopesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListPermittedScopesResponse;

export type ListPermittedProjectsLocationsScopesError = DefaultErrors;

/** Lists permitted Scopes. */
export const listPermittedProjectsLocationsScopes: API.PaginatedOperationMethod<
  ListPermittedProjectsLocationsScopesRequest,
  ListPermittedProjectsLocationsScopesResponse,
  ListPermittedProjectsLocationsScopesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPermittedProjectsLocationsScopesRequest,
  output: ListPermittedProjectsLocationsScopesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface SetIamPolicyProjectsLocationsScopesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsScopesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/scopes/{scopesId}:setIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsScopesRequest>;

export type SetIamPolicyProjectsLocationsScopesResponse = Policy;
export const SetIamPolicyProjectsLocationsScopesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type SetIamPolicyProjectsLocationsScopesError = DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsScopes: API.OperationMethod<
  SetIamPolicyProjectsLocationsScopesRequest,
  SetIamPolicyProjectsLocationsScopesResponse,
  SetIamPolicyProjectsLocationsScopesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SetIamPolicyProjectsLocationsScopesRequest,
  output: SetIamPolicyProjectsLocationsScopesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsScopesRequest {
  /** Required. The fields to be updated. */
  updateMask?: string;
  /** The resource name for the scope `projects/{project}/locations/{location}/scopes/{scope}` */
  name: string;
  /** Request body */
  body?: Scope;
}

export const PatchProjectsLocationsScopesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(Scope).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/scopes/{scopesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsScopesRequest>;

export type PatchProjectsLocationsScopesResponse = Operation;
export const PatchProjectsLocationsScopesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type PatchProjectsLocationsScopesError = DefaultErrors;

/** Updates a scopes. */
export const patchProjectsLocationsScopes: API.OperationMethod<
  PatchProjectsLocationsScopesRequest,
  PatchProjectsLocationsScopesResponse,
  PatchProjectsLocationsScopesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsScopesRequest,
  output: PatchProjectsLocationsScopesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsScopesRbacrolebindingsRequest {
  /** Required. The parent (project and location) where the RBACRoleBinding will be created. Specified in the format `projects/* /locations/* /scopes/*`. */
  parent: string;
  /** Required. Client chosen ID for the RBACRoleBinding. `rbacrolebinding_id` must be a valid RFC 1123 compliant DNS label: 1. At most 63 characters in length 2. It must consist of lower case alphanumeric characters or `-` 3. It must start and end with an alphanumeric character Which can be expressed as the regex: `[a-z0-9]([-a-z0-9]*[a-z0-9])?`, with a maximum length of 63 characters. */
  rbacrolebindingId?: string;
  /** Request body */
  body?: RBACRoleBinding;
}

export const CreateProjectsLocationsScopesRbacrolebindingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    rbacrolebindingId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("rbacrolebindingId"),
    ),
    body: Schema.optional(RBACRoleBinding).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/scopes/{scopesId}/rbacrolebindings",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsScopesRbacrolebindingsRequest>;

export type CreateProjectsLocationsScopesRbacrolebindingsResponse = Operation;
export const CreateProjectsLocationsScopesRbacrolebindingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsLocationsScopesRbacrolebindingsError = DefaultErrors;

/** Creates a Scope RBACRoleBinding. */
export const createProjectsLocationsScopesRbacrolebindings: API.OperationMethod<
  CreateProjectsLocationsScopesRbacrolebindingsRequest,
  CreateProjectsLocationsScopesRbacrolebindingsResponse,
  CreateProjectsLocationsScopesRbacrolebindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsScopesRbacrolebindingsRequest,
  output: CreateProjectsLocationsScopesRbacrolebindingsResponse,
  errors: [],
}));

export interface GetProjectsLocationsScopesRbacrolebindingsRequest {
  /** Required. The RBACRoleBinding resource name in the format `projects/* /locations/* /scopes/* /rbacrolebindings/*`. */
  name: string;
}

export const GetProjectsLocationsScopesRbacrolebindingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/scopes/{scopesId}/rbacrolebindings/{rbacrolebindingsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsScopesRbacrolebindingsRequest>;

export type GetProjectsLocationsScopesRbacrolebindingsResponse =
  RBACRoleBinding;
export const GetProjectsLocationsScopesRbacrolebindingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ RBACRoleBinding;

export type GetProjectsLocationsScopesRbacrolebindingsError = DefaultErrors;

/** Returns the details of a Scope RBACRoleBinding. */
export const getProjectsLocationsScopesRbacrolebindings: API.OperationMethod<
  GetProjectsLocationsScopesRbacrolebindingsRequest,
  GetProjectsLocationsScopesRbacrolebindingsResponse,
  GetProjectsLocationsScopesRbacrolebindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsScopesRbacrolebindingsRequest,
  output: GetProjectsLocationsScopesRbacrolebindingsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsScopesRbacrolebindingsRequest {
  /** Required. The RBACRoleBinding resource name in the format `projects/* /locations/* /scopes/* /rbacrolebindings/*`. */
  name: string;
}

export const DeleteProjectsLocationsScopesRbacrolebindingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/scopes/{scopesId}/rbacrolebindings/{rbacrolebindingsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsScopesRbacrolebindingsRequest>;

export type DeleteProjectsLocationsScopesRbacrolebindingsResponse = Operation;
export const DeleteProjectsLocationsScopesRbacrolebindingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteProjectsLocationsScopesRbacrolebindingsError = DefaultErrors;

/** Deletes a Scope RBACRoleBinding. */
export const deleteProjectsLocationsScopesRbacrolebindings: API.OperationMethod<
  DeleteProjectsLocationsScopesRbacrolebindingsRequest,
  DeleteProjectsLocationsScopesRbacrolebindingsResponse,
  DeleteProjectsLocationsScopesRbacrolebindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsScopesRbacrolebindingsRequest,
  output: DeleteProjectsLocationsScopesRbacrolebindingsResponse,
  errors: [],
}));

export interface ListProjectsLocationsScopesRbacrolebindingsRequest {
  /** Optional. Token returned by previous call to `ListScopeRBACRoleBindings` which specifies the position in the list from where to continue listing the resources. */
  pageToken?: string;
  /** Required. The parent (project and location) where the Features will be listed. Specified in the format `projects/* /locations/* /scopes/*`. */
  parent: string;
  /** Optional. When requesting a 'page' of resources, `page_size` specifies number of resources to return. If unspecified or set to 0, all resources will be returned. */
  pageSize?: number;
}

export const ListProjectsLocationsScopesRbacrolebindingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/scopes/{scopesId}/rbacrolebindings",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsScopesRbacrolebindingsRequest>;

export type ListProjectsLocationsScopesRbacrolebindingsResponse =
  ListScopeRBACRoleBindingsResponse;
export const ListProjectsLocationsScopesRbacrolebindingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListScopeRBACRoleBindingsResponse;

export type ListProjectsLocationsScopesRbacrolebindingsError = DefaultErrors;

/** Lists all Scope RBACRoleBindings. */
export const listProjectsLocationsScopesRbacrolebindings: API.PaginatedOperationMethod<
  ListProjectsLocationsScopesRbacrolebindingsRequest,
  ListProjectsLocationsScopesRbacrolebindingsResponse,
  ListProjectsLocationsScopesRbacrolebindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsScopesRbacrolebindingsRequest,
  output: ListProjectsLocationsScopesRbacrolebindingsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchProjectsLocationsScopesRbacrolebindingsRequest {
  /** Required. The fields to be updated. */
  updateMask?: string;
  /** The resource name for the rbacrolebinding `projects/{project}/locations/{location}/scopes/{scope}/rbacrolebindings/{rbacrolebinding}` or `projects/{project}/locations/{location}/memberships/{membership}/rbacrolebindings/{rbacrolebinding}` */
  name: string;
  /** Request body */
  body?: RBACRoleBinding;
}

export const PatchProjectsLocationsScopesRbacrolebindingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(RBACRoleBinding).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/scopes/{scopesId}/rbacrolebindings/{rbacrolebindingsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsScopesRbacrolebindingsRequest>;

export type PatchProjectsLocationsScopesRbacrolebindingsResponse = Operation;
export const PatchProjectsLocationsScopesRbacrolebindingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type PatchProjectsLocationsScopesRbacrolebindingsError = DefaultErrors;

/** Updates a Scope RBACRoleBinding. */
export const patchProjectsLocationsScopesRbacrolebindings: API.OperationMethod<
  PatchProjectsLocationsScopesRbacrolebindingsRequest,
  PatchProjectsLocationsScopesRbacrolebindingsResponse,
  PatchProjectsLocationsScopesRbacrolebindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsScopesRbacrolebindingsRequest,
  output: PatchProjectsLocationsScopesRbacrolebindingsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsScopesNamespacesRequest {
  /** The resource name for the namespace `projects/{project}/locations/{location}/namespaces/{namespace}` */
  name: string;
  /** Required. The fields to be updated. */
  updateMask?: string;
  /** Request body */
  body?: Namespace;
}

export const PatchProjectsLocationsScopesNamespacesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(Namespace).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/scopes/{scopesId}/namespaces/{namespacesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsScopesNamespacesRequest>;

export type PatchProjectsLocationsScopesNamespacesResponse = Operation;
export const PatchProjectsLocationsScopesNamespacesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type PatchProjectsLocationsScopesNamespacesError = DefaultErrors;

/** Updates a fleet namespace. */
export const patchProjectsLocationsScopesNamespaces: API.OperationMethod<
  PatchProjectsLocationsScopesNamespacesRequest,
  PatchProjectsLocationsScopesNamespacesResponse,
  PatchProjectsLocationsScopesNamespacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsScopesNamespacesRequest,
  output: PatchProjectsLocationsScopesNamespacesResponse,
  errors: [],
}));

export interface GetProjectsLocationsScopesNamespacesRequest {
  /** Required. The Namespace resource name in the format `projects/* /locations/* /scopes/* /namespaces/*`. */
  name: string;
}

export const GetProjectsLocationsScopesNamespacesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/scopes/{scopesId}/namespaces/{namespacesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsScopesNamespacesRequest>;

export type GetProjectsLocationsScopesNamespacesResponse = Namespace;
export const GetProjectsLocationsScopesNamespacesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Namespace;

export type GetProjectsLocationsScopesNamespacesError = DefaultErrors;

/** Returns the details of a fleet namespace. */
export const getProjectsLocationsScopesNamespaces: API.OperationMethod<
  GetProjectsLocationsScopesNamespacesRequest,
  GetProjectsLocationsScopesNamespacesResponse,
  GetProjectsLocationsScopesNamespacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsScopesNamespacesRequest,
  output: GetProjectsLocationsScopesNamespacesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsScopesNamespacesRequest {
  /** Required. The Namespace resource name in the format `projects/* /locations/* /scopes/* /namespaces/*`. */
  name: string;
}

export const DeleteProjectsLocationsScopesNamespacesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/scopes/{scopesId}/namespaces/{namespacesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsScopesNamespacesRequest>;

export type DeleteProjectsLocationsScopesNamespacesResponse = Operation;
export const DeleteProjectsLocationsScopesNamespacesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteProjectsLocationsScopesNamespacesError = DefaultErrors;

/** Deletes a fleet namespace. */
export const deleteProjectsLocationsScopesNamespaces: API.OperationMethod<
  DeleteProjectsLocationsScopesNamespacesRequest,
  DeleteProjectsLocationsScopesNamespacesResponse,
  DeleteProjectsLocationsScopesNamespacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsScopesNamespacesRequest,
  output: DeleteProjectsLocationsScopesNamespacesResponse,
  errors: [],
}));

export interface ListProjectsLocationsScopesNamespacesRequest {
  /** Optional. When requesting a 'page' of resources, `page_size` specifies number of resources to return. If unspecified or set to 0, all resources will be returned. */
  pageSize?: number;
  /** Required. The parent (project and location) where the Features will be listed. Specified in the format `projects/* /locations/* /scopes/*`. */
  parent: string;
  /** Optional. Token returned by previous call to `ListFeatures` which specifies the position in the list from where to continue listing the resources. */
  pageToken?: string;
}

export const ListProjectsLocationsScopesNamespacesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/scopes/{scopesId}/namespaces",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsScopesNamespacesRequest>;

export type ListProjectsLocationsScopesNamespacesResponse =
  ListScopeNamespacesResponse;
export const ListProjectsLocationsScopesNamespacesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListScopeNamespacesResponse;

export type ListProjectsLocationsScopesNamespacesError = DefaultErrors;

/** Lists fleet namespaces. */
export const listProjectsLocationsScopesNamespaces: API.PaginatedOperationMethod<
  ListProjectsLocationsScopesNamespacesRequest,
  ListProjectsLocationsScopesNamespacesResponse,
  ListProjectsLocationsScopesNamespacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsScopesNamespacesRequest,
  output: ListProjectsLocationsScopesNamespacesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsLocationsScopesNamespacesRequest {
  /** Required. The parent (project and location) where the Namespace will be created. Specified in the format `projects/* /locations/* /scopes/*`. */
  parent: string;
  /** Required. Client chosen ID for the Namespace. `namespace_id` must be a valid RFC 1123 compliant DNS label: 1. At most 63 characters in length 2. It must consist of lower case alphanumeric characters or `-` 3. It must start and end with an alphanumeric character Which can be expressed as the regex: `[a-z0-9]([-a-z0-9]*[a-z0-9])?`, with a maximum length of 63 characters. */
  scopeNamespaceId?: string;
  /** Request body */
  body?: Namespace;
}

export const CreateProjectsLocationsScopesNamespacesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    scopeNamespaceId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("scopeNamespaceId"),
    ),
    body: Schema.optional(Namespace).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/scopes/{scopesId}/namespaces",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsScopesNamespacesRequest>;

export type CreateProjectsLocationsScopesNamespacesResponse = Operation;
export const CreateProjectsLocationsScopesNamespacesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsLocationsScopesNamespacesError = DefaultErrors;

/** Creates a fleet namespace. */
export const createProjectsLocationsScopesNamespaces: API.OperationMethod<
  CreateProjectsLocationsScopesNamespacesRequest,
  CreateProjectsLocationsScopesNamespacesResponse,
  CreateProjectsLocationsScopesNamespacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsScopesNamespacesRequest,
  output: CreateProjectsLocationsScopesNamespacesResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsMembershipsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsMembershipsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/memberships/{membershipsId}:setIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsMembershipsRequest>;

export type SetIamPolicyProjectsLocationsMembershipsResponse = Policy;
export const SetIamPolicyProjectsLocationsMembershipsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type SetIamPolicyProjectsLocationsMembershipsError = DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsMemberships: API.OperationMethod<
  SetIamPolicyProjectsLocationsMembershipsRequest,
  SetIamPolicyProjectsLocationsMembershipsResponse,
  SetIamPolicyProjectsLocationsMembershipsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SetIamPolicyProjectsLocationsMembershipsRequest,
  output: SetIamPolicyProjectsLocationsMembershipsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsMembershipsRequest {
  /** Required. The Membership resource name in the format `projects/* /locations/* /memberships/*`. */
  name: string;
  /** Required. Mask of fields to update. */
  updateMask?: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Membership;
}

export const PatchProjectsLocationsMembershipsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    body: Schema.optional(Membership).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/memberships/{membershipsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsMembershipsRequest>;

export type PatchProjectsLocationsMembershipsResponse = Operation;
export const PatchProjectsLocationsMembershipsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type PatchProjectsLocationsMembershipsError = DefaultErrors;

/** Updates an existing Membership. */
export const patchProjectsLocationsMemberships: API.OperationMethod<
  PatchProjectsLocationsMembershipsRequest,
  PatchProjectsLocationsMembershipsResponse,
  PatchProjectsLocationsMembershipsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsMembershipsRequest,
  output: PatchProjectsLocationsMembershipsResponse,
  errors: [],
}));

export interface GenerateConnectManifestProjectsLocationsMembershipsRequest {
  /** Optional. Namespace for GKE Connect agent resources. Defaults to `gke-connect`. The Connect Agent is authorized automatically when run in the default namespace. Otherwise, explicit authorization must be granted with an additional IAM binding. */
  namespace?: string;
  /** Required. The Membership resource name the Agent will associate with, in the format `projects/* /locations/* /memberships/*`. */
  name: string;
  /** Optional. The registry to fetch the connect agent image from. Defaults to gcr.io/gkeconnect. */
  registry?: string;
  /** Optional. URI of a proxy if connectivity from the agent to gkeconnect.googleapis.com requires the use of a proxy. Format must be in the form `http(s)://{proxy_address}`, depending on the HTTP/HTTPS protocol supported by the proxy. This will direct the connect agent's outbound traffic through a HTTP(S) proxy. */
  proxy?: string;
  /** Optional. The Connect agent version to use. Defaults to the most current version. */
  version?: string;
  /** Optional. If true, generate the resources for upgrade only. Some resources generated only for installation (e.g. secrets) will be excluded. */
  isUpgrade?: boolean;
  /** Optional. The image pull secret content for the registry, if not public. */
  imagePullSecretContent?: string;
}

export const GenerateConnectManifestProjectsLocationsMembershipsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    namespace: Schema.optional(Schema.String).pipe(T.HttpQuery("namespace")),
    name: Schema.String.pipe(T.HttpPath("name")),
    registry: Schema.optional(Schema.String).pipe(T.HttpQuery("registry")),
    proxy: Schema.optional(Schema.String).pipe(T.HttpQuery("proxy")),
    version: Schema.optional(Schema.String).pipe(T.HttpQuery("version")),
    isUpgrade: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("isUpgrade")),
    imagePullSecretContent: Schema.optional(Schema.String).pipe(
      T.HttpQuery("imagePullSecretContent"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/memberships/{membershipsId}:generateConnectManifest",
    }),
    svc,
  ) as unknown as Schema.Schema<GenerateConnectManifestProjectsLocationsMembershipsRequest>;

export type GenerateConnectManifestProjectsLocationsMembershipsResponse =
  GenerateConnectManifestResponse;
export const GenerateConnectManifestProjectsLocationsMembershipsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GenerateConnectManifestResponse;

export type GenerateConnectManifestProjectsLocationsMembershipsError =
  DefaultErrors;

/** Generates the manifest for deployment of the GKE connect agent. **This method is used internally by Google-provided libraries.** Most clients should not need to call this method directly. */
export const generateConnectManifestProjectsLocationsMemberships: API.OperationMethod<
  GenerateConnectManifestProjectsLocationsMembershipsRequest,
  GenerateConnectManifestProjectsLocationsMembershipsResponse,
  GenerateConnectManifestProjectsLocationsMembershipsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GenerateConnectManifestProjectsLocationsMembershipsRequest,
  output: GenerateConnectManifestProjectsLocationsMembershipsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsMembershipsRequest {
  /** Required. Client chosen ID for the membership. `membership_id` must be a valid RFC 1123 compliant DNS label: 1. At most 63 characters in length 2. It must consist of lower case alphanumeric characters or `-` 3. It must start and end with an alphanumeric character Which can be expressed as the regex: `[a-z0-9]([-a-z0-9]*[a-z0-9])?`, with a maximum length of 63 characters. */
  membershipId?: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The parent (project and location) where the Memberships will be created. Specified in the format `projects/* /locations/*`. */
  parent: string;
  /** Request body */
  body?: Membership;
}

export const CreateProjectsLocationsMembershipsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    membershipId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("membershipId"),
    ),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(Membership).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/memberships",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsMembershipsRequest>;

export type CreateProjectsLocationsMembershipsResponse = Operation;
export const CreateProjectsLocationsMembershipsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsLocationsMembershipsError = DefaultErrors;

/** Creates a new Membership. **This is currently only supported for GKE clusters on Google Cloud**. To register other clusters, follow the instructions at https://cloud.google.com/anthos/multicluster-management/connect/registering-a-cluster. */
export const createProjectsLocationsMemberships: API.OperationMethod<
  CreateProjectsLocationsMembershipsRequest,
  CreateProjectsLocationsMembershipsResponse,
  CreateProjectsLocationsMembershipsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsMembershipsRequest,
  output: CreateProjectsLocationsMembershipsResponse,
  errors: [],
}));

export interface GetProjectsLocationsMembershipsRequest {
  /** Required. The Membership resource name in the format `projects/* /locations/* /memberships/*`. */
  name: string;
}

export const GetProjectsLocationsMembershipsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/memberships/{membershipsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsMembershipsRequest>;

export type GetProjectsLocationsMembershipsResponse = Membership;
export const GetProjectsLocationsMembershipsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Membership;

export type GetProjectsLocationsMembershipsError = DefaultErrors;

/** Gets the details of a Membership. */
export const getProjectsLocationsMemberships: API.OperationMethod<
  GetProjectsLocationsMembershipsRequest,
  GetProjectsLocationsMembershipsResponse,
  GetProjectsLocationsMembershipsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsMembershipsRequest,
  output: GetProjectsLocationsMembershipsResponse,
  errors: [],
}));

export interface ListProjectsLocationsMembershipsRequest {
  /** Required. The parent (project and location) where the Memberships will be listed. Specified in the format `projects/* /locations/*`. `projects/* /locations/-` list memberships in all the regions. */
  parent: string;
  /** Optional. Lists Memberships that match the filter expression, following the syntax outlined in https://google.aip.dev/160. Examples: - Name is `bar` in project `foo-proj` and location `global`: name = "projects/foo-proj/locations/global/membership/bar" - Memberships that have a label called `foo`: labels.foo:* - Memberships that have a label called `foo` whose value is `bar`: labels.foo = bar - Memberships in the CREATING state: state = CREATING */
  filter?: string;
  /** Optional. When requesting a 'page' of resources, `page_size` specifies number of resources to return. If unspecified or set to 0, all resources will be returned. */
  pageSize?: number;
  /** Optional. Token returned by previous call to `ListMemberships` which specifies the position in the list from where to continue listing the resources. */
  pageToken?: string;
  /** Optional. One or more fields to compare and use to sort the output. See https://google.aip.dev/132#ordering. */
  orderBy?: string;
}

export const ListProjectsLocationsMembershipsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/memberships",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsMembershipsRequest>;

export type ListProjectsLocationsMembershipsResponse = ListMembershipsResponse;
export const ListProjectsLocationsMembershipsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListMembershipsResponse;

export type ListProjectsLocationsMembershipsError = DefaultErrors;

/** Lists Memberships in a given project and location. */
export const listProjectsLocationsMemberships: API.PaginatedOperationMethod<
  ListProjectsLocationsMembershipsRequest,
  ListProjectsLocationsMembershipsResponse,
  ListProjectsLocationsMembershipsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsMembershipsRequest,
  output: ListProjectsLocationsMembershipsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsMembershipsRequest {
  /** Required. The Membership resource name in the format `projects/* /locations/* /memberships/*`. */
  name: string;
  /** Optional. If set to true, any subresource from this Membership will also be deleted. Otherwise, the request will only work if the Membership has no subresource. */
  force?: boolean;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsMembershipsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/memberships/{membershipsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsMembershipsRequest>;

export type DeleteProjectsLocationsMembershipsResponse = Operation;
export const DeleteProjectsLocationsMembershipsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteProjectsLocationsMembershipsError = DefaultErrors;

/** Removes a Membership. **This is currently only supported for GKE clusters on Google Cloud**. To unregister other clusters, follow the instructions at https://cloud.google.com/anthos/multicluster-management/connect/unregistering-a-cluster. */
export const deleteProjectsLocationsMemberships: API.OperationMethod<
  DeleteProjectsLocationsMembershipsRequest,
  DeleteProjectsLocationsMembershipsResponse,
  DeleteProjectsLocationsMembershipsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsMembershipsRequest,
  output: DeleteProjectsLocationsMembershipsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsMembershipsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsMembershipsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/memberships/{membershipsId}:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsMembershipsRequest>;

export type TestIamPermissionsProjectsLocationsMembershipsResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsMembershipsResponse =
  /*@__PURE__*/ /*#__PURE__*/ TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsMembershipsError = DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsMemberships: API.OperationMethod<
  TestIamPermissionsProjectsLocationsMembershipsRequest,
  TestIamPermissionsProjectsLocationsMembershipsResponse,
  TestIamPermissionsProjectsLocationsMembershipsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TestIamPermissionsProjectsLocationsMembershipsRequest,
  output: TestIamPermissionsProjectsLocationsMembershipsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsMembershipsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsMembershipsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(
      T.HttpQuery("options.requestedPolicyVersion"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/memberships/{membershipsId}:getIamPolicy",
    }),
    svc,
  ) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsMembershipsRequest>;

export type GetIamPolicyProjectsLocationsMembershipsResponse = Policy;
export const GetIamPolicyProjectsLocationsMembershipsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type GetIamPolicyProjectsLocationsMembershipsError = DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsMemberships: API.OperationMethod<
  GetIamPolicyProjectsLocationsMembershipsRequest,
  GetIamPolicyProjectsLocationsMembershipsResponse,
  GetIamPolicyProjectsLocationsMembershipsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetIamPolicyProjectsLocationsMembershipsRequest,
  output: GetIamPolicyProjectsLocationsMembershipsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsMembershipsRbacrolebindingsRequest {
  /** The resource name for the rbacrolebinding `projects/{project}/locations/{location}/scopes/{scope}/rbacrolebindings/{rbacrolebinding}` or `projects/{project}/locations/{location}/memberships/{membership}/rbacrolebindings/{rbacrolebinding}` */
  name: string;
  /** Required. The fields to be updated. */
  updateMask?: string;
  /** Request body */
  body?: RBACRoleBinding;
}

export const PatchProjectsLocationsMembershipsRbacrolebindingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(RBACRoleBinding).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/memberships/{membershipsId}/rbacrolebindings/{rbacrolebindingsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsMembershipsRbacrolebindingsRequest>;

export type PatchProjectsLocationsMembershipsRbacrolebindingsResponse =
  Operation;
export const PatchProjectsLocationsMembershipsRbacrolebindingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type PatchProjectsLocationsMembershipsRbacrolebindingsError =
  DefaultErrors;

/** Updates a Membership RBACRoleBinding. */
export const patchProjectsLocationsMembershipsRbacrolebindings: API.OperationMethod<
  PatchProjectsLocationsMembershipsRbacrolebindingsRequest,
  PatchProjectsLocationsMembershipsRbacrolebindingsResponse,
  PatchProjectsLocationsMembershipsRbacrolebindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsMembershipsRbacrolebindingsRequest,
  output: PatchProjectsLocationsMembershipsRbacrolebindingsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsMembershipsRbacrolebindingsRequest {
  /** Required. The RBACRoleBinding resource name in the format `projects/* /locations/* /memberships/* /rbacrolebindings/*`. */
  name: string;
}

export const DeleteProjectsLocationsMembershipsRbacrolebindingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/memberships/{membershipsId}/rbacrolebindings/{rbacrolebindingsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsMembershipsRbacrolebindingsRequest>;

export type DeleteProjectsLocationsMembershipsRbacrolebindingsResponse =
  Operation;
export const DeleteProjectsLocationsMembershipsRbacrolebindingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteProjectsLocationsMembershipsRbacrolebindingsError =
  DefaultErrors;

/** Deletes a Membership RBACRoleBinding. */
export const deleteProjectsLocationsMembershipsRbacrolebindings: API.OperationMethod<
  DeleteProjectsLocationsMembershipsRbacrolebindingsRequest,
  DeleteProjectsLocationsMembershipsRbacrolebindingsResponse,
  DeleteProjectsLocationsMembershipsRbacrolebindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsMembershipsRbacrolebindingsRequest,
  output: DeleteProjectsLocationsMembershipsRbacrolebindingsResponse,
  errors: [],
}));

export interface ListProjectsLocationsMembershipsRbacrolebindingsRequest {
  /** Optional. Token returned by previous call to `ListMembershipRBACRoleBindings` which specifies the position in the list from where to continue listing the resources. */
  pageToken?: string;
  /** Optional. When requesting a 'page' of resources, `page_size` specifies number of resources to return. If unspecified or set to 0, all resources will be returned. */
  pageSize?: number;
  /** Required. The parent (project and location) where the Features will be listed. Specified in the format `projects/* /locations/* /memberships/*`. */
  parent: string;
}

export const ListProjectsLocationsMembershipsRbacrolebindingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/memberships/{membershipsId}/rbacrolebindings",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsMembershipsRbacrolebindingsRequest>;

export type ListProjectsLocationsMembershipsRbacrolebindingsResponse =
  ListMembershipRBACRoleBindingsResponse;
export const ListProjectsLocationsMembershipsRbacrolebindingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListMembershipRBACRoleBindingsResponse;

export type ListProjectsLocationsMembershipsRbacrolebindingsError =
  DefaultErrors;

/** Lists all Membership RBACRoleBindings. */
export const listProjectsLocationsMembershipsRbacrolebindings: API.PaginatedOperationMethod<
  ListProjectsLocationsMembershipsRbacrolebindingsRequest,
  ListProjectsLocationsMembershipsRbacrolebindingsResponse,
  ListProjectsLocationsMembershipsRbacrolebindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsMembershipsRbacrolebindingsRequest,
  output: ListProjectsLocationsMembershipsRbacrolebindingsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsMembershipsRbacrolebindingsRequest {
  /** Required. The RBACRoleBinding resource name in the format `projects/* /locations/* /memberships/* /rbacrolebindings/*`. */
  name: string;
}

export const GetProjectsLocationsMembershipsRbacrolebindingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/memberships/{membershipsId}/rbacrolebindings/{rbacrolebindingsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsMembershipsRbacrolebindingsRequest>;

export type GetProjectsLocationsMembershipsRbacrolebindingsResponse =
  RBACRoleBinding;
export const GetProjectsLocationsMembershipsRbacrolebindingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ RBACRoleBinding;

export type GetProjectsLocationsMembershipsRbacrolebindingsError =
  DefaultErrors;

/** Returns the details of a Membership RBACRoleBinding. */
export const getProjectsLocationsMembershipsRbacrolebindings: API.OperationMethod<
  GetProjectsLocationsMembershipsRbacrolebindingsRequest,
  GetProjectsLocationsMembershipsRbacrolebindingsResponse,
  GetProjectsLocationsMembershipsRbacrolebindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsMembershipsRbacrolebindingsRequest,
  output: GetProjectsLocationsMembershipsRbacrolebindingsResponse,
  errors: [],
}));

export interface GenerateMembershipRBACRoleBindingYAMLProjectsLocationsMembershipsRbacrolebindingsRequest {
  /** Required. The parent (project and location) where the RBACRoleBinding will be created. Specified in the format `projects/* /locations/* /memberships/*`. */
  parent: string;
  /** Required. Client chosen ID for the RBACRoleBinding. `rbacrolebinding_id` must be a valid RFC 1123 compliant DNS label: 1. At most 63 characters in length 2. It must consist of lower case alphanumeric characters or `-` 3. It must start and end with an alphanumeric character Which can be expressed as the regex: `[a-z0-9]([-a-z0-9]*[a-z0-9])?`, with a maximum length of 63 characters. */
  rbacrolebindingId?: string;
  /** Request body */
  body?: RBACRoleBinding;
}

export const GenerateMembershipRBACRoleBindingYAMLProjectsLocationsMembershipsRbacrolebindingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    rbacrolebindingId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("rbacrolebindingId"),
    ),
    body: Schema.optional(RBACRoleBinding).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/memberships/{membershipsId}/rbacrolebindings:generateMembershipRBACRoleBindingYAML",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<GenerateMembershipRBACRoleBindingYAMLProjectsLocationsMembershipsRbacrolebindingsRequest>;

export type GenerateMembershipRBACRoleBindingYAMLProjectsLocationsMembershipsRbacrolebindingsResponse =
  GenerateMembershipRBACRoleBindingYAMLResponse;
export const GenerateMembershipRBACRoleBindingYAMLProjectsLocationsMembershipsRbacrolebindingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GenerateMembershipRBACRoleBindingYAMLResponse;

export type GenerateMembershipRBACRoleBindingYAMLProjectsLocationsMembershipsRbacrolebindingsError =
  DefaultErrors;

/** Generates a YAML of the RBAC policies for the specified RoleBinding and its associated impersonation resources. */
export const generateMembershipRBACRoleBindingYAMLProjectsLocationsMembershipsRbacrolebindings: API.OperationMethod<
  GenerateMembershipRBACRoleBindingYAMLProjectsLocationsMembershipsRbacrolebindingsRequest,
  GenerateMembershipRBACRoleBindingYAMLProjectsLocationsMembershipsRbacrolebindingsResponse,
  GenerateMembershipRBACRoleBindingYAMLProjectsLocationsMembershipsRbacrolebindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input:
    GenerateMembershipRBACRoleBindingYAMLProjectsLocationsMembershipsRbacrolebindingsRequest,
  output:
    GenerateMembershipRBACRoleBindingYAMLProjectsLocationsMembershipsRbacrolebindingsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsMembershipsRbacrolebindingsRequest {
  /** Required. The parent (project and location) where the RBACRoleBinding will be created. Specified in the format `projects/* /locations/* /memberships/*`. */
  parent: string;
  /** Required. Client chosen ID for the RBACRoleBinding. `rbacrolebinding_id` must be a valid RFC 1123 compliant DNS label: 1. At most 63 characters in length 2. It must consist of lower case alphanumeric characters or `-` 3. It must start and end with an alphanumeric character Which can be expressed as the regex: `[a-z0-9]([-a-z0-9]*[a-z0-9])?`, with a maximum length of 63 characters. */
  rbacrolebindingId?: string;
  /** Request body */
  body?: RBACRoleBinding;
}

export const CreateProjectsLocationsMembershipsRbacrolebindingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    rbacrolebindingId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("rbacrolebindingId"),
    ),
    body: Schema.optional(RBACRoleBinding).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/memberships/{membershipsId}/rbacrolebindings",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsMembershipsRbacrolebindingsRequest>;

export type CreateProjectsLocationsMembershipsRbacrolebindingsResponse =
  Operation;
export const CreateProjectsLocationsMembershipsRbacrolebindingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsLocationsMembershipsRbacrolebindingsError =
  DefaultErrors;

/** Creates a Membership RBACRoleBinding. */
export const createProjectsLocationsMembershipsRbacrolebindings: API.OperationMethod<
  CreateProjectsLocationsMembershipsRbacrolebindingsRequest,
  CreateProjectsLocationsMembershipsRbacrolebindingsResponse,
  CreateProjectsLocationsMembershipsRbacrolebindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsMembershipsRbacrolebindingsRequest,
  output: CreateProjectsLocationsMembershipsRbacrolebindingsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsMembershipsBindingsRequest {
  /** Required. The parent (project and location) where the MembershipBinding will be created. Specified in the format `projects/* /locations/* /memberships/*`. */
  parent: string;
  /** Required. The ID to use for the MembershipBinding. */
  membershipBindingId?: string;
  /** Request body */
  body?: MembershipBinding;
}

export const CreateProjectsLocationsMembershipsBindingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    membershipBindingId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("membershipBindingId"),
    ),
    body: Schema.optional(MembershipBinding).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/memberships/{membershipsId}/bindings",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsMembershipsBindingsRequest>;

export type CreateProjectsLocationsMembershipsBindingsResponse = Operation;
export const CreateProjectsLocationsMembershipsBindingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsLocationsMembershipsBindingsError = DefaultErrors;

/** Creates a MembershipBinding. */
export const createProjectsLocationsMembershipsBindings: API.OperationMethod<
  CreateProjectsLocationsMembershipsBindingsRequest,
  CreateProjectsLocationsMembershipsBindingsResponse,
  CreateProjectsLocationsMembershipsBindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsMembershipsBindingsRequest,
  output: CreateProjectsLocationsMembershipsBindingsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsMembershipsBindingsRequest {
  /** Required. The MembershipBinding resource name in the format `projects/* /locations/* /memberships/* /bindings/*`. */
  name: string;
}

export const DeleteProjectsLocationsMembershipsBindingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/memberships/{membershipsId}/bindings/{bindingsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsMembershipsBindingsRequest>;

export type DeleteProjectsLocationsMembershipsBindingsResponse = Operation;
export const DeleteProjectsLocationsMembershipsBindingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteProjectsLocationsMembershipsBindingsError = DefaultErrors;

/** Deletes a MembershipBinding. */
export const deleteProjectsLocationsMembershipsBindings: API.OperationMethod<
  DeleteProjectsLocationsMembershipsBindingsRequest,
  DeleteProjectsLocationsMembershipsBindingsResponse,
  DeleteProjectsLocationsMembershipsBindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsMembershipsBindingsRequest,
  output: DeleteProjectsLocationsMembershipsBindingsResponse,
  errors: [],
}));

export interface ListProjectsLocationsMembershipsBindingsRequest {
  /** Optional. When requesting a 'page' of resources, `page_size` specifies number of resources to return. If unspecified or set to 0, all resources will be returned. */
  pageSize?: number;
  /** Required. The parent Membership for which the MembershipBindings will be listed. Specified in the format `projects/* /locations/* /memberships/*`. */
  parent: string;
  /** Optional. Lists MembershipBindings that match the filter expression, following the syntax outlined in https://google.aip.dev/160. */
  filter?: string;
  /** Optional. Token returned by previous call to `ListMembershipBindings` which specifies the position in the list from where to continue listing the resources. */
  pageToken?: string;
}

export const ListProjectsLocationsMembershipsBindingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/memberships/{membershipsId}/bindings",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsMembershipsBindingsRequest>;

export type ListProjectsLocationsMembershipsBindingsResponse =
  ListMembershipBindingsResponse;
export const ListProjectsLocationsMembershipsBindingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListMembershipBindingsResponse;

export type ListProjectsLocationsMembershipsBindingsError = DefaultErrors;

/** Lists MembershipBindings. */
export const listProjectsLocationsMembershipsBindings: API.PaginatedOperationMethod<
  ListProjectsLocationsMembershipsBindingsRequest,
  ListProjectsLocationsMembershipsBindingsResponse,
  ListProjectsLocationsMembershipsBindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsMembershipsBindingsRequest,
  output: ListProjectsLocationsMembershipsBindingsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsMembershipsBindingsRequest {
  /** Required. The MembershipBinding resource name in the format `projects/* /locations/* /memberships/* /bindings/*`. */
  name: string;
}

export const GetProjectsLocationsMembershipsBindingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/memberships/{membershipsId}/bindings/{bindingsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsMembershipsBindingsRequest>;

export type GetProjectsLocationsMembershipsBindingsResponse = MembershipBinding;
export const GetProjectsLocationsMembershipsBindingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ MembershipBinding;

export type GetProjectsLocationsMembershipsBindingsError = DefaultErrors;

/** Returns the details of a MembershipBinding. */
export const getProjectsLocationsMembershipsBindings: API.OperationMethod<
  GetProjectsLocationsMembershipsBindingsRequest,
  GetProjectsLocationsMembershipsBindingsResponse,
  GetProjectsLocationsMembershipsBindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsMembershipsBindingsRequest,
  output: GetProjectsLocationsMembershipsBindingsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsMembershipsBindingsRequest {
  /** The resource name for the membershipbinding itself `projects/{project}/locations/{location}/memberships/{membership}/bindings/{membershipbinding}` */
  name: string;
  /** Required. The fields to be updated. */
  updateMask?: string;
  /** Request body */
  body?: MembershipBinding;
}

export const PatchProjectsLocationsMembershipsBindingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(MembershipBinding).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/memberships/{membershipsId}/bindings/{bindingsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsMembershipsBindingsRequest>;

export type PatchProjectsLocationsMembershipsBindingsResponse = Operation;
export const PatchProjectsLocationsMembershipsBindingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type PatchProjectsLocationsMembershipsBindingsError = DefaultErrors;

/** Updates a MembershipBinding. */
export const patchProjectsLocationsMembershipsBindings: API.OperationMethod<
  PatchProjectsLocationsMembershipsBindingsRequest,
  PatchProjectsLocationsMembershipsBindingsResponse,
  PatchProjectsLocationsMembershipsBindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsMembershipsBindingsRequest,
  output: PatchProjectsLocationsMembershipsBindingsResponse,
  errors: [],
}));

export interface ListProjectsLocationsOperationsRequest {
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list filter. */
  filter?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
  /** The standard list page token. */
  pageToken?: string;
  /** The name of the operation's parent resource. */
  name: string;
}

export const ListProjectsLocationsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("returnPartialSuccess"),
    ),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/operations",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse = ListOperationsResponse;
export const ListProjectsLocationsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListOperationsResponse;

export type ListProjectsLocationsOperationsError = DefaultErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export const listProjectsLocationsOperations: API.PaginatedOperationMethod<
  ListProjectsLocationsOperationsRequest,
  ListProjectsLocationsOperationsResponse,
  ListProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsOperationsRequest,
  output: ListProjectsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsLocationsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsOperationsRequest>;

export type DeleteProjectsLocationsOperationsResponse = Empty;
export const DeleteProjectsLocationsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsLocationsOperationsError = DefaultErrors;

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export const deleteProjectsLocationsOperations: API.OperationMethod<
  DeleteProjectsLocationsOperationsRequest,
  DeleteProjectsLocationsOperationsResponse,
  DeleteProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsOperationsRequest,
  output: DeleteProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface GetProjectsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = Operation;
export const GetProjectsLocationsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type GetProjectsLocationsOperationsError = DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsLocationsOperations: API.OperationMethod<
  GetProjectsLocationsOperationsRequest,
  GetProjectsLocationsOperationsResponse,
  GetProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface CancelProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelProjectsLocationsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CancelProjectsLocationsOperationsRequest>;

export type CancelProjectsLocationsOperationsResponse = Empty;
export const CancelProjectsLocationsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type CancelProjectsLocationsOperationsError = DefaultErrors;

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export const cancelProjectsLocationsOperations: API.OperationMethod<
  CancelProjectsLocationsOperationsRequest,
  CancelProjectsLocationsOperationsResponse,
  CancelProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsFeaturesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsFeaturesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(
      T.HttpQuery("options.requestedPolicyVersion"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/features/{featuresId}:getIamPolicy",
    }),
    svc,
  ) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsFeaturesRequest>;

export type GetIamPolicyProjectsLocationsFeaturesResponse = Policy;
export const GetIamPolicyProjectsLocationsFeaturesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type GetIamPolicyProjectsLocationsFeaturesError = DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsFeatures: API.OperationMethod<
  GetIamPolicyProjectsLocationsFeaturesRequest,
  GetIamPolicyProjectsLocationsFeaturesResponse,
  GetIamPolicyProjectsLocationsFeaturesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetIamPolicyProjectsLocationsFeaturesRequest,
  output: GetIamPolicyProjectsLocationsFeaturesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsFeaturesRequest {
  /** The ID of the feature to create. */
  featureId?: string;
  /** A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The parent (project and location) where the Feature will be created. Specified in the format `projects/* /locations/*`. */
  parent: string;
  /** Request body */
  body?: Feature;
}

export const CreateProjectsLocationsFeaturesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    featureId: Schema.optional(Schema.String).pipe(T.HttpQuery("featureId")),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(Feature).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/features",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsFeaturesRequest>;

export type CreateProjectsLocationsFeaturesResponse = Operation;
export const CreateProjectsLocationsFeaturesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsLocationsFeaturesError = DefaultErrors;

/** Adds a new Feature. */
export const createProjectsLocationsFeatures: API.OperationMethod<
  CreateProjectsLocationsFeaturesRequest,
  CreateProjectsLocationsFeaturesResponse,
  CreateProjectsLocationsFeaturesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsFeaturesRequest,
  output: CreateProjectsLocationsFeaturesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsFeaturesRequest {
  /** Required. The Feature resource name in the format `projects/* /locations/* /features/*`. */
  name: string;
  /** Mask of fields to update. */
  updateMask?: string;
  /** A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Feature;
}

export const PatchProjectsLocationsFeaturesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    body: Schema.optional(Feature).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/features/{featuresId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsFeaturesRequest>;

export type PatchProjectsLocationsFeaturesResponse = Operation;
export const PatchProjectsLocationsFeaturesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type PatchProjectsLocationsFeaturesError = DefaultErrors;

/** Updates an existing Feature. */
export const patchProjectsLocationsFeatures: API.OperationMethod<
  PatchProjectsLocationsFeaturesRequest,
  PatchProjectsLocationsFeaturesResponse,
  PatchProjectsLocationsFeaturesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsFeaturesRequest,
  output: PatchProjectsLocationsFeaturesResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsFeaturesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsFeaturesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/features/{featuresId}:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsFeaturesRequest>;

export type TestIamPermissionsProjectsLocationsFeaturesResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsFeaturesResponse =
  /*@__PURE__*/ /*#__PURE__*/ TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsFeaturesError = DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsFeatures: API.OperationMethod<
  TestIamPermissionsProjectsLocationsFeaturesRequest,
  TestIamPermissionsProjectsLocationsFeaturesResponse,
  TestIamPermissionsProjectsLocationsFeaturesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TestIamPermissionsProjectsLocationsFeaturesRequest,
  output: TestIamPermissionsProjectsLocationsFeaturesResponse,
  errors: [],
}));

export interface GetProjectsLocationsFeaturesRequest {
  /** Required. The Feature resource name in the format `projects/* /locations/* /features/*` */
  name: string;
  /** Optional. If set to true, the response will return partial results when some regions are unreachable and the unreachable field in Feature proto will be populated. If set to false, the request will fail when some regions are unreachable. */
  returnPartialSuccess?: boolean;
}

export const GetProjectsLocationsFeaturesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("returnPartialSuccess"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/features/{featuresId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsFeaturesRequest>;

export type GetProjectsLocationsFeaturesResponse = Feature;
export const GetProjectsLocationsFeaturesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Feature;

export type GetProjectsLocationsFeaturesError = DefaultErrors;

/** Gets details of a single Feature. */
export const getProjectsLocationsFeatures: API.OperationMethod<
  GetProjectsLocationsFeaturesRequest,
  GetProjectsLocationsFeaturesResponse,
  GetProjectsLocationsFeaturesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsFeaturesRequest,
  output: GetProjectsLocationsFeaturesResponse,
  errors: [],
}));

export interface ListProjectsLocationsFeaturesRequest {
  /** One or more fields to compare and use to sort the output. See https://google.aip.dev/132#ordering. */
  orderBy?: string;
  /** Token returned by previous call to `ListFeatures` which specifies the position in the list from where to continue listing the resources. */
  pageToken?: string;
  /** Required. The parent (project and location) where the Features will be listed. Specified in the format `projects/* /locations/*`. */
  parent: string;
  /** Lists Features that match the filter expression, following the syntax outlined in https://google.aip.dev/160. Examples: - Feature with the name "servicemesh" in project "foo-proj": name = "projects/foo-proj/locations/global/features/servicemesh" - Features that have a label called `foo`: labels.foo:* - Features that have a label called `foo` whose value is `bar`: labels.foo = bar */
  filter?: string;
  /** Optional. If set to true, the response will return partial results when some regions are unreachable and the unreachable field in Feature proto will be populated. If set to false, the request will fail when some regions are unreachable. */
  returnPartialSuccess?: boolean;
  /** When requesting a 'page' of resources, `page_size` specifies number of resources to return. If unspecified or set to 0, all resources will be returned. */
  pageSize?: number;
}

export const ListProjectsLocationsFeaturesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("returnPartialSuccess"),
    ),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/features",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsFeaturesRequest>;

export type ListProjectsLocationsFeaturesResponse = ListFeaturesResponse;
export const ListProjectsLocationsFeaturesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListFeaturesResponse;

export type ListProjectsLocationsFeaturesError = DefaultErrors;

/** Lists Features in a given project and location. */
export const listProjectsLocationsFeatures: API.PaginatedOperationMethod<
  ListProjectsLocationsFeaturesRequest,
  ListProjectsLocationsFeaturesResponse,
  ListProjectsLocationsFeaturesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsFeaturesRequest,
  output: ListProjectsLocationsFeaturesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsFeaturesRequest {
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The Feature resource name in the format `projects/* /locations/* /features/*`. */
  name: string;
  /** If set to true, the delete will ignore any outstanding resources for this Feature (that is, `FeatureState.has_resources` is set to true). These resources will NOT be cleaned up or modified in any way. */
  force?: boolean;
}

export const DeleteProjectsLocationsFeaturesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    name: Schema.String.pipe(T.HttpPath("name")),
    force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/features/{featuresId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsFeaturesRequest>;

export type DeleteProjectsLocationsFeaturesResponse = Operation;
export const DeleteProjectsLocationsFeaturesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteProjectsLocationsFeaturesError = DefaultErrors;

/** Removes a Feature. */
export const deleteProjectsLocationsFeatures: API.OperationMethod<
  DeleteProjectsLocationsFeaturesRequest,
  DeleteProjectsLocationsFeaturesResponse,
  DeleteProjectsLocationsFeaturesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsFeaturesRequest,
  output: DeleteProjectsLocationsFeaturesResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsFeaturesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsFeaturesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/features/{featuresId}:setIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsFeaturesRequest>;

export type SetIamPolicyProjectsLocationsFeaturesResponse = Policy;
export const SetIamPolicyProjectsLocationsFeaturesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type SetIamPolicyProjectsLocationsFeaturesError = DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsFeatures: API.OperationMethod<
  SetIamPolicyProjectsLocationsFeaturesRequest,
  SetIamPolicyProjectsLocationsFeaturesResponse,
  SetIamPolicyProjectsLocationsFeaturesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SetIamPolicyProjectsLocationsFeaturesRequest,
  output: SetIamPolicyProjectsLocationsFeaturesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsFleetsRequest {
  /** Required. The parent (project and location) where the Fleet will be created. Specified in the format `projects/* /locations/*`. */
  parent: string;
  /** Request body */
  body?: Fleet;
}

export const CreateProjectsLocationsFleetsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(Fleet).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/fleets",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsFleetsRequest>;

export type CreateProjectsLocationsFleetsResponse = Operation;
export const CreateProjectsLocationsFleetsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsLocationsFleetsError = DefaultErrors;

/** Creates a fleet. */
export const createProjectsLocationsFleets: API.OperationMethod<
  CreateProjectsLocationsFleetsRequest,
  CreateProjectsLocationsFleetsResponse,
  CreateProjectsLocationsFleetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsFleetsRequest,
  output: CreateProjectsLocationsFleetsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsFleetsRequest {
  /** Required. The fields to be updated; */
  updateMask?: string;
  /** Output only. The full, unique resource name of this fleet in the format of `projects/{project}/locations/{location}/fleets/{fleet}`. Each Google Cloud project can have at most one fleet resource, named "default". */
  name: string;
  /** Request body */
  body?: Fleet;
}

export const PatchProjectsLocationsFleetsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(Fleet).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/fleets/{fleetsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsFleetsRequest>;

export type PatchProjectsLocationsFleetsResponse = Operation;
export const PatchProjectsLocationsFleetsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type PatchProjectsLocationsFleetsError = DefaultErrors;

/** Updates a fleet. */
export const patchProjectsLocationsFleets: API.OperationMethod<
  PatchProjectsLocationsFleetsRequest,
  PatchProjectsLocationsFleetsResponse,
  PatchProjectsLocationsFleetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsFleetsRequest,
  output: PatchProjectsLocationsFleetsResponse,
  errors: [],
}));

export interface GetProjectsLocationsFleetsRequest {
  /** Required. The Fleet resource name in the format `projects/* /locations/* /fleets/*`. */
  name: string;
}

export const GetProjectsLocationsFleetsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/fleets/{fleetsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsFleetsRequest>;

export type GetProjectsLocationsFleetsResponse = Fleet;
export const GetProjectsLocationsFleetsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Fleet;

export type GetProjectsLocationsFleetsError = DefaultErrors;

/** Returns the details of a fleet. */
export const getProjectsLocationsFleets: API.OperationMethod<
  GetProjectsLocationsFleetsRequest,
  GetProjectsLocationsFleetsResponse,
  GetProjectsLocationsFleetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsFleetsRequest,
  output: GetProjectsLocationsFleetsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsFleetsRequest {
  /** Required. The Fleet resource name in the format `projects/* /locations/* /fleets/*`. */
  name: string;
}

export const DeleteProjectsLocationsFleetsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/fleets/{fleetsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsFleetsRequest>;

export type DeleteProjectsLocationsFleetsResponse = Operation;
export const DeleteProjectsLocationsFleetsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteProjectsLocationsFleetsError = DefaultErrors;

/** Removes a Fleet. There must be no memberships remaining in the Fleet. */
export const deleteProjectsLocationsFleets: API.OperationMethod<
  DeleteProjectsLocationsFleetsRequest,
  DeleteProjectsLocationsFleetsResponse,
  DeleteProjectsLocationsFleetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsFleetsRequest,
  output: DeleteProjectsLocationsFleetsResponse,
  errors: [],
}));

export interface ListProjectsLocationsFleetsRequest {
  /** Required. The organization or project to list for Fleets under, in the format `organizations/* /locations/*` or `projects/* /locations/*`. */
  parent: string;
  /** Optional. The maximum number of fleets to return. The service may return fewer than this value. If unspecified, at most 200 fleets will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListFleets` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListFleets` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsFleetsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/fleets",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsFleetsRequest>;

export type ListProjectsLocationsFleetsResponse = ListFleetsResponse;
export const ListProjectsLocationsFleetsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListFleetsResponse;

export type ListProjectsLocationsFleetsError = DefaultErrors;

/** Returns all fleets within an organization or a project that the caller has access to. */
export const listProjectsLocationsFleets: API.PaginatedOperationMethod<
  ListProjectsLocationsFleetsRequest,
  ListProjectsLocationsFleetsResponse,
  ListProjectsLocationsFleetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsFleetsRequest,
  output: ListProjectsLocationsFleetsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListProjectsLocationsRolloutsRequest {
  /** The maximum number of rollout to return. The service may return fewer than this value. If unspecified, at most 50 rollouts will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Required. The parent, which owns this collection of rollout. Format: projects/{project}/locations/{location} */
  parent: string;
  /** Optional. Lists Rollouts that match the filter expression, following the syntax outlined in https://google.aip.dev/160. */
  filter?: string;
  /** A page token, received from a previous `ListRollouts` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListRollouts` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsRolloutsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/rollouts",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsRolloutsRequest>;

export type ListProjectsLocationsRolloutsResponse = ListRolloutsResponse;
export const ListProjectsLocationsRolloutsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListRolloutsResponse;

export type ListProjectsLocationsRolloutsError = DefaultErrors;

/** Retrieve the list of all rollouts. */
export const listProjectsLocationsRollouts: API.PaginatedOperationMethod<
  ListProjectsLocationsRolloutsRequest,
  ListProjectsLocationsRolloutsResponse,
  ListProjectsLocationsRolloutsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsRolloutsRequest,
  output: ListProjectsLocationsRolloutsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsRolloutsRequest {
  /** Required. The name of the rollout to retrieve. projects/{project}/locations/{location}/rollouts/{rollout} */
  name: string;
}

export const GetProjectsLocationsRolloutsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/rollouts/{rolloutsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsRolloutsRequest>;

export type GetProjectsLocationsRolloutsResponse = Rollout;
export const GetProjectsLocationsRolloutsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Rollout;

export type GetProjectsLocationsRolloutsError = DefaultErrors;

/** Retrieve a single rollout. */
export const getProjectsLocationsRollouts: API.OperationMethod<
  GetProjectsLocationsRolloutsRequest,
  GetProjectsLocationsRolloutsResponse,
  GetProjectsLocationsRolloutsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsRolloutsRequest,
  output: GetProjectsLocationsRolloutsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsRolloutSequencesRequest {
  /** Required. The parent resource where this rollout sequence will be created. projects/{project}/locations/{location} */
  parent: string;
  /** Required. User provided identifier that is used as part of the resource name; must conform to RFC-1034 and additionally restrict to lower-cased letters. This comes out roughly to: /^a-z+[a-z0-9]$/ */
  rolloutSequenceId?: string;
  /** Request body */
  body?: RolloutSequence;
}

export const CreateProjectsLocationsRolloutSequencesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    rolloutSequenceId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("rolloutSequenceId"),
    ),
    body: Schema.optional(RolloutSequence).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/rolloutSequences",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsRolloutSequencesRequest>;

export type CreateProjectsLocationsRolloutSequencesResponse = Operation;
export const CreateProjectsLocationsRolloutSequencesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsLocationsRolloutSequencesError = DefaultErrors;

/** Create a new rollout sequence resource. */
export const createProjectsLocationsRolloutSequences: API.OperationMethod<
  CreateProjectsLocationsRolloutSequencesRequest,
  CreateProjectsLocationsRolloutSequencesResponse,
  CreateProjectsLocationsRolloutSequencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsRolloutSequencesRequest,
  output: CreateProjectsLocationsRolloutSequencesResponse,
  errors: [],
}));

export interface ListProjectsLocationsRolloutSequencesRequest {
  /** Optional. A page token, received from a previous `ListRolloutSequences` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListRolloutSequences` must match the call that provided the page token. */
  pageToken?: string;
  /** Required. The parent, which owns this collection of rollout sequences. Format: projects/{project}/locations/{location} */
  parent: string;
  /** Optional. Lists Rollout Sequences that match the filter expression, following the syntax outlined in https://google.aip.dev/160. */
  filter?: string;
  /** Optional. The maximum number of rollout sequences to return. The service may return fewer than this value. If unspecified, at most 50 rollout sequences will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
}

export const ListProjectsLocationsRolloutSequencesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/rolloutSequences",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsRolloutSequencesRequest>;

export type ListProjectsLocationsRolloutSequencesResponse =
  ListRolloutSequencesResponse;
export const ListProjectsLocationsRolloutSequencesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListRolloutSequencesResponse;

export type ListProjectsLocationsRolloutSequencesError = DefaultErrors;

/** Retrieve the list of all rollout sequences. */
export const listProjectsLocationsRolloutSequences: API.PaginatedOperationMethod<
  ListProjectsLocationsRolloutSequencesRequest,
  ListProjectsLocationsRolloutSequencesResponse,
  ListProjectsLocationsRolloutSequencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsRolloutSequencesRequest,
  output: ListProjectsLocationsRolloutSequencesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsRolloutSequencesRequest {
  /** Required. The name of the rollout sequence to delete. projects/{project}/locations/{location}/rolloutSequences/{rollout_sequence} */
  name: string;
}

export const DeleteProjectsLocationsRolloutSequencesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/rolloutSequences/{rolloutSequencesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsRolloutSequencesRequest>;

export type DeleteProjectsLocationsRolloutSequencesResponse = Operation;
export const DeleteProjectsLocationsRolloutSequencesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteProjectsLocationsRolloutSequencesError = DefaultErrors;

/** Remove a RolloutSequence. */
export const deleteProjectsLocationsRolloutSequences: API.OperationMethod<
  DeleteProjectsLocationsRolloutSequencesRequest,
  DeleteProjectsLocationsRolloutSequencesResponse,
  DeleteProjectsLocationsRolloutSequencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsRolloutSequencesRequest,
  output: DeleteProjectsLocationsRolloutSequencesResponse,
  errors: [],
}));

export interface GetProjectsLocationsRolloutSequencesRequest {
  /** Required. The name of the rollout sequence to retrieve. projects/{project}/locations/{location}/rolloutSequences/{rollout_sequence} */
  name: string;
}

export const GetProjectsLocationsRolloutSequencesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/rolloutSequences/{rolloutSequencesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsRolloutSequencesRequest>;

export type GetProjectsLocationsRolloutSequencesResponse = RolloutSequence;
export const GetProjectsLocationsRolloutSequencesResponse =
  /*@__PURE__*/ /*#__PURE__*/ RolloutSequence;

export type GetProjectsLocationsRolloutSequencesError = DefaultErrors;

/** Retrieve a single rollout sequence. */
export const getProjectsLocationsRolloutSequences: API.OperationMethod<
  GetProjectsLocationsRolloutSequencesRequest,
  GetProjectsLocationsRolloutSequencesResponse,
  GetProjectsLocationsRolloutSequencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsRolloutSequencesRequest,
  output: GetProjectsLocationsRolloutSequencesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsRolloutSequencesRequest {
  /** Identifier. Name of the rollout sequence in the format of: projects/{PROJECT_ID}/locations/global/rolloutSequences/{NAME} */
  name: string;
  /** Optional. The list of fields to update. */
  updateMask?: string;
  /** Request body */
  body?: RolloutSequence;
}

export const PatchProjectsLocationsRolloutSequencesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(RolloutSequence).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/rolloutSequences/{rolloutSequencesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsRolloutSequencesRequest>;

export type PatchProjectsLocationsRolloutSequencesResponse = Operation;
export const PatchProjectsLocationsRolloutSequencesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type PatchProjectsLocationsRolloutSequencesError = DefaultErrors;

/** Update a rollout sequence. */
export const patchProjectsLocationsRolloutSequences: API.OperationMethod<
  PatchProjectsLocationsRolloutSequencesRequest,
  PatchProjectsLocationsRolloutSequencesResponse,
  PatchProjectsLocationsRolloutSequencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsRolloutSequencesRequest,
  output: PatchProjectsLocationsRolloutSequencesResponse,
  errors: [],
}));

export interface ListOrganizationsLocationsFleetsRequest {
  /** Optional. A page token, received from a previous `ListFleets` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListFleets` must match the call that provided the page token. */
  pageToken?: string;
  /** Required. The organization or project to list for Fleets under, in the format `organizations/* /locations/*` or `projects/* /locations/*`. */
  parent: string;
  /** Optional. The maximum number of fleets to return. The service may return fewer than this value. If unspecified, at most 200 fleets will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
}

export const ListOrganizationsLocationsFleetsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/organizations/{organizationsId}/locations/{locationsId}/fleets",
    }),
    svc,
  ) as unknown as Schema.Schema<ListOrganizationsLocationsFleetsRequest>;

export type ListOrganizationsLocationsFleetsResponse = ListFleetsResponse;
export const ListOrganizationsLocationsFleetsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListFleetsResponse;

export type ListOrganizationsLocationsFleetsError = DefaultErrors;

/** Returns all fleets within an organization or a project that the caller has access to. */
export const listOrganizationsLocationsFleets: API.PaginatedOperationMethod<
  ListOrganizationsLocationsFleetsRequest,
  ListOrganizationsLocationsFleetsResponse,
  ListOrganizationsLocationsFleetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListOrganizationsLocationsFleetsRequest,
  output: ListOrganizationsLocationsFleetsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));
