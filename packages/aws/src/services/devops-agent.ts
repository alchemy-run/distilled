import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import type * as stream from "effect/Stream";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { restJson1Protocol } from "../protocols/rest-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "DevOps Agent",
  target: "DevOpsAgent",
  version: "2026-01-01",
  sigv4: "aidevops",
  protocol: restJson1Protocol,
  rules: (p, _) => {
    const { UseFIPS = false, Endpoint, Region } = p;
    const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
      type: "endpoint" as const,
      endpoint: { url: u as string, properties: p, headers: h },
    });
    const err = (m: unknown): T.EndpointResolverResult => ({
      type: "error" as const,
      message: m as string,
    });
    if (Endpoint != null) {
      if (UseFIPS === true) {
        return err(
          "Invalid Configuration: FIPS and custom endpoint are not supported",
        );
      }
      return e(Endpoint);
    }
    if (Region != null) {
      {
        const PartitionResult = _.partition(Region);
        if (PartitionResult != null && PartitionResult !== false) {
          if (UseFIPS === true) {
            return e(
              `https://aidevops-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return e(
            `https://aidevops.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
  })<{ readonly message: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message: string }> {}
export class ContentSizeExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ContentSizeExceededException",
    ["BadRequestError"],
    { status: 413 },
  )<{ readonly message: string }> {}
export class IdentityCenterServiceException
  extends /*@__PURE__*/ TE.TaggedError(
    "IdentityCenterServiceException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string; readonly underlyingErrorCode?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class InvalidParameterException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429 },
  )<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError("ValidationException")<{
    readonly message: string;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
export type AgentSpaceId = string;
export type ServiceId = string;
export type SourceAccountType = "source" | (string & {});
export type RoleArn = string;
export type ValidationStatus =
  | "valid"
  | "invalid"
  | "pending-confirmation"
  | (string & {});
export interface SourceAwsConfiguration {
  accountId: string;
  accountType: SourceAccountType;
  assumableRoleArn: string;
  externalId?: string;
  agentElevatedRoleArn?: string;
  agentElevatedRoleArnStatus?: ValidationStatus;
}
export type MonitorAccountType = "monitor" | (string & {});
export interface AWSConfiguration {
  assumableRoleArn: string;
  accountId: string;
  accountType: MonitorAccountType;
  agentElevatedRoleArn?: string;
  agentElevatedRoleArnStatus?: ValidationStatus;
}
export type GithubRepoOwnerType = "organization" | "user" | (string & {});
export interface GitHubConfiguration {
  repoName: string;
  repoId: string;
  owner: string;
  ownerType: GithubRepoOwnerType;
  instanceIdentifier?: string;
  runtimeRoleArn?: string;
}
export interface SlackChannel {
  channelName?: string;
  channelId: string;
}
export interface SlackTransmissionTarget {
  opsOncallTarget: SlackChannel;
  opsSRETarget?: SlackChannel;
}
export interface SlackConfiguration {
  workspaceId: string;
  workspaceName: string;
  transmissionTarget: SlackTransmissionTarget;
}
export type DynatraceResourceList = string[];
export interface DynatraceConfiguration {
  envId: string;
  resources?: string[];
}
export type ServiceNowAuthenticationScopeList = string[];
export interface ServiceNowConfiguration {
  instanceId?: string;
  authScopes?: string[];
}
export interface MCPServerNewRelicConfiguration {
  accountId: string;
  endpoint: string;
}
export type ToolClassification =
  | "READ_ONLY"
  | "MUTATIVE"
  | "DESTRUCTIVE"
  | (string & {});
export interface MCPToolDetail {
  name: string;
  toolClassification?: ToolClassification;
}
export type MCPToolDetailsList = MCPToolDetail[];
export interface MCPServerDatadogConfiguration {
  enabledElevatedTools?: MCPToolDetail[];
}
export type MCPToolsList = string[];
export interface MCPServerConfiguration {
  tools: string[];
  toolDetails?: MCPToolDetail[];
}
export interface GitLabConfiguration {
  projectId: string;
  projectPath: string;
  instanceIdentifier?: string;
  runtimeRoleArn?: string;
}
export interface MCPServerSplunkConfiguration {}
export interface EventChannelConfiguration {}
export interface AzureConfiguration {
  subscriptionId: string;
}
export interface AzureDevOpsConfiguration {
  organizationName: string;
  projectId: string;
  projectName: string;
}
export interface MCPServerGrafanaConfiguration {
  endpoint: string;
  organizationId?: string;
  tools?: string[];
  enabledElevatedTools?: MCPToolDetail[];
}
export type PagerDutyServicesList = string[];
export type EmailAddress = string | redacted.Redacted<string>;
export interface PagerDutyConfiguration {
  services: string[];
  customerEmail: string | redacted.Redacted<string>;
}
export interface MCPServerSigV4Configuration {
  tools: string[];
  toolDetails?: MCPToolDetail[];
}
export interface RemoteAgentConfiguration {}
export interface RemoteAgentSigV4Configuration {}
export type ServiceConfiguration =
  | {
      sourceAws: SourceAwsConfiguration;
      aws?: never;
      github?: never;
      slack?: never;
      dynatrace?: never;
      servicenow?: never;
      mcpservernewrelic?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      eventChannel?: never;
      azure?: never;
      azuredevops?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      sourceAws?: never;
      aws: AWSConfiguration;
      github?: never;
      slack?: never;
      dynatrace?: never;
      servicenow?: never;
      mcpservernewrelic?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      eventChannel?: never;
      azure?: never;
      azuredevops?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      sourceAws?: never;
      aws?: never;
      github: GitHubConfiguration;
      slack?: never;
      dynatrace?: never;
      servicenow?: never;
      mcpservernewrelic?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      eventChannel?: never;
      azure?: never;
      azuredevops?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      sourceAws?: never;
      aws?: never;
      github?: never;
      slack: SlackConfiguration;
      dynatrace?: never;
      servicenow?: never;
      mcpservernewrelic?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      eventChannel?: never;
      azure?: never;
      azuredevops?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      sourceAws?: never;
      aws?: never;
      github?: never;
      slack?: never;
      dynatrace: DynatraceConfiguration;
      servicenow?: never;
      mcpservernewrelic?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      eventChannel?: never;
      azure?: never;
      azuredevops?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      sourceAws?: never;
      aws?: never;
      github?: never;
      slack?: never;
      dynatrace?: never;
      servicenow: ServiceNowConfiguration;
      mcpservernewrelic?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      eventChannel?: never;
      azure?: never;
      azuredevops?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      sourceAws?: never;
      aws?: never;
      github?: never;
      slack?: never;
      dynatrace?: never;
      servicenow?: never;
      mcpservernewrelic: MCPServerNewRelicConfiguration;
      mcpserverdatadog?: never;
      mcpserver?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      eventChannel?: never;
      azure?: never;
      azuredevops?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      sourceAws?: never;
      aws?: never;
      github?: never;
      slack?: never;
      dynatrace?: never;
      servicenow?: never;
      mcpservernewrelic?: never;
      mcpserverdatadog: MCPServerDatadogConfiguration;
      mcpserver?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      eventChannel?: never;
      azure?: never;
      azuredevops?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      sourceAws?: never;
      aws?: never;
      github?: never;
      slack?: never;
      dynatrace?: never;
      servicenow?: never;
      mcpservernewrelic?: never;
      mcpserverdatadog?: never;
      mcpserver: MCPServerConfiguration;
      gitlab?: never;
      mcpserversplunk?: never;
      eventChannel?: never;
      azure?: never;
      azuredevops?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      sourceAws?: never;
      aws?: never;
      github?: never;
      slack?: never;
      dynatrace?: never;
      servicenow?: never;
      mcpservernewrelic?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      gitlab: GitLabConfiguration;
      mcpserversplunk?: never;
      eventChannel?: never;
      azure?: never;
      azuredevops?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      sourceAws?: never;
      aws?: never;
      github?: never;
      slack?: never;
      dynatrace?: never;
      servicenow?: never;
      mcpservernewrelic?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      gitlab?: never;
      mcpserversplunk: MCPServerSplunkConfiguration;
      eventChannel?: never;
      azure?: never;
      azuredevops?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      sourceAws?: never;
      aws?: never;
      github?: never;
      slack?: never;
      dynatrace?: never;
      servicenow?: never;
      mcpservernewrelic?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      eventChannel: EventChannelConfiguration;
      azure?: never;
      azuredevops?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      sourceAws?: never;
      aws?: never;
      github?: never;
      slack?: never;
      dynatrace?: never;
      servicenow?: never;
      mcpservernewrelic?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      eventChannel?: never;
      azure: AzureConfiguration;
      azuredevops?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      sourceAws?: never;
      aws?: never;
      github?: never;
      slack?: never;
      dynatrace?: never;
      servicenow?: never;
      mcpservernewrelic?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      eventChannel?: never;
      azure?: never;
      azuredevops: AzureDevOpsConfiguration;
      mcpservergrafana?: never;
      pagerduty?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      sourceAws?: never;
      aws?: never;
      github?: never;
      slack?: never;
      dynatrace?: never;
      servicenow?: never;
      mcpservernewrelic?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      eventChannel?: never;
      azure?: never;
      azuredevops?: never;
      mcpservergrafana: MCPServerGrafanaConfiguration;
      pagerduty?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      sourceAws?: never;
      aws?: never;
      github?: never;
      slack?: never;
      dynatrace?: never;
      servicenow?: never;
      mcpservernewrelic?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      eventChannel?: never;
      azure?: never;
      azuredevops?: never;
      mcpservergrafana?: never;
      pagerduty: PagerDutyConfiguration;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      sourceAws?: never;
      aws?: never;
      github?: never;
      slack?: never;
      dynatrace?: never;
      servicenow?: never;
      mcpservernewrelic?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      eventChannel?: never;
      azure?: never;
      azuredevops?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      mcpserversigv4: MCPServerSigV4Configuration;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      sourceAws?: never;
      aws?: never;
      github?: never;
      slack?: never;
      dynatrace?: never;
      servicenow?: never;
      mcpservernewrelic?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      eventChannel?: never;
      azure?: never;
      azuredevops?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      mcpserversigv4?: never;
      remoteagent: RemoteAgentConfiguration;
      remoteagentsigv4?: never;
    }
  | {
      sourceAws?: never;
      aws?: never;
      github?: never;
      slack?: never;
      dynatrace?: never;
      servicenow?: never;
      mcpservernewrelic?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      eventChannel?: never;
      azure?: never;
      azuredevops?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4: RemoteAgentSigV4Configuration;
    };
export type CapabilityType =
  | "RELEASE_READINESS_REVIEW"
  | "RELEASE_READINESS_REVIEW_AUTOMATED_TESTING"
  | (string & {});
export type TriggerEvent =
  | "PULL_REQUEST_READY_FOR_REVIEW"
  | "PULL_REQUEST_DRAFT"
  | (string & {});
export type TriggerEventList = TriggerEvent[];
export type TriggerRegexPattern = string;
export type TriggerRegexPatternList = string[];
export interface PatternFilter {
  patterns: string[];
}
export interface TriggerFilterGroup {
  events?: TriggerEvent[];
  targetBranches?: PatternFilter;
}
export type TriggerFilterGroups = TriggerFilterGroup[];
export interface CapabilityConfiguration {
  enabled?: boolean;
  triggerFilterGroups?: TriggerFilterGroup[];
}
export type AssociationCapabilities = {
  [key in CapabilityType]?: CapabilityConfiguration;
};
export interface AssociateServiceInput {
  agentSpaceId: string;
  serviceId: string;
  configuration: ServiceConfiguration;
  capabilities?: { [key: string]: CapabilityConfiguration | undefined };
}
export type AssociationId = string;
export interface Association {
  agentSpaceId: string;
  createdAt: Date;
  updatedAt: Date;
  status?: ValidationStatus;
  associationId: string;
  serviceId: string;
  configuration: ServiceConfiguration;
  capabilities?: { [key: string]: CapabilityConfiguration | undefined };
}
export type WebhookType =
  | "hmac"
  | "apikey"
  | "gitlab"
  | "pagerduty"
  | (string & {});
export type WebhookSecret = string | redacted.Redacted<string>;
export type ApiKeyValue = string | redacted.Redacted<string>;
export interface GenericWebhook {
  webhookUrl?: string;
  webhookId?: string;
  webhookType?: WebhookType;
  webhookSecret?: string | redacted.Redacted<string>;
  apiKey?: string | redacted.Redacted<string>;
}
export interface AssociateServiceOutput {
  association: Association;
  webhook?: GenericWebhook;
}
export type AgentSpaceName = string;
export type Description = string | redacted.Redacted<string>;
export type Locale = string;
export type KmsKeyArn = string;
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export type AgentSpacePreferenceKey = "elevatedActionsEnabled" | (string & {});
export type AgentSpacePreferences = {
  [key in AgentSpacePreferenceKey]?: boolean;
};
export interface CreateAgentSpaceInput {
  name: string;
  description?: string | redacted.Redacted<string>;
  locale?: string;
  kmsKeyArn?: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
  preferences?: { [key: string]: boolean | undefined };
}
export interface AgentSpace {
  name: string;
  description?: string | redacted.Redacted<string>;
  locale?: string;
  createdAt: Date;
  updatedAt: Date;
  kmsKeyArn?: string;
  agentSpaceId: string;
  preferences?: { [key: string]: boolean | undefined };
}
export interface CreateAgentSpaceOutput {
  agentSpace: AgentSpace;
  tags?: { [key: string]: string | undefined };
}
export type AgentSpaceIdentifier = string;
export type AssetType = string;
export type AssetFilePath = string;
export type AssetFileBytes = Uint8Array;
export type AssetFileText = string;
export type AssetFileBody =
  | { bytes: Uint8Array; text?: never }
  | { bytes?: never; text: string };
export interface AssetFileContent {
  path: string;
  body: AssetFileBody;
  metadata?: any;
}
export type AssetZipBytes = Uint8Array;
export interface AssetZipContent {
  zipFile: Uint8Array;
}
export type AssetContentUrl = string;
export interface AssetSourceUrlContent {
  url: string;
}
export type AssetContent =
  | { file: AssetFileContent; zip?: never; sourceUrl?: never }
  | { file?: never; zip: AssetZipContent; sourceUrl?: never }
  | { file?: never; zip?: never; sourceUrl: AssetSourceUrlContent };
export interface CreateAssetRequest {
  agentSpaceId: string;
  assetType: string;
  metadata?: any;
  content: AssetContent;
  clientToken?: string;
}
export type ResourceId = string;
export interface Asset {
  assetId: string;
  assetType: string;
  metadata: any;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface CreateAssetResponse {
  asset: Asset;
}
export interface CreateAssetFileRequest {
  agentSpaceId: string;
  assetId: string;
  path: string;
  content: AssetFileBody;
  metadata?: any;
  clientToken?: string;
}
export interface AssetFile {
  path: string;
  content: AssetFileBody;
  metadata?: any;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface CreateAssetFileResponse {
  file: AssetFile;
}
export interface ReferenceInput {
  system: string;
  title?: string;
  referenceId: string;
  referenceUrl: string;
  associationId: string;
}
export type TaskType =
  | "INVESTIGATION"
  | "EVALUATION"
  | "RELEASE_READINESS_REVIEW"
  | "RELEASE_TESTING"
  | (string & {});
export type BacklogTaskTitle = string;
export type BacklogTaskDescription = string;
export type Priority =
  | "CRITICAL"
  | "HIGH"
  | "MEDIUM"
  | "LOW"
  | "MINIMAL"
  | (string & {});
export interface CreateBacklogTaskRequest {
  agentSpaceId: string;
  reference?: ReferenceInput;
  taskType: TaskType;
  title: string;
  description?: string;
  priority: Priority;
  clientToken?: string;
}
export interface ReferenceOutput {
  system: string;
  title?: string;
  referenceId: string;
  referenceUrl: string;
  associationId: string;
}
export type TaskStatus =
  | "PENDING_TRIAGE"
  | "LINKED"
  | "PENDING_START"
  | "IN_PROGRESS"
  | "PENDING_CUSTOMER_APPROVAL"
  | "COMPLETED"
  | "FAILED"
  | "TIMED_OUT"
  | "CANCELED"
  | "SKIPPED"
  | "WAITING"
  | (string & {});
export type BackLogTimestamp = Date;
export interface Task {
  agentSpaceId: string;
  taskId: string;
  executionId?: string;
  title: string;
  description?: string;
  reference?: ReferenceOutput;
  taskType: TaskType;
  priority: Priority;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
  version: number;
  supportMetadata?: any;
  metadata?: any;
  primaryTaskId?: string;
  statusReason?: string;
  hasLinkedTasks?: boolean;
}
export interface CreateBacklogTaskResponse {
  task: Task;
}
export type UserType = "IAM" | "IDC" | "IDP" | (string & {});
export interface CreateChatRequest {
  agentSpaceId: string;
  userId?: string;
  userType?: UserType;
}
export interface CreateChatResponse {
  executionId: string;
  createdAt: Date;
}
export type PrivateConnectionName = string;
export type IpAddressOrDnsName = string;
export type VpcId = string;
export type SubnetId = string;
export type ListOfSubnetIds = string[];
export type SecurityGroupId = string;
export type ListOfSecurityGroupIds = string[];
export type IpAddressType = "IPV4" | "IPV6" | "DUAL_STACK" | (string & {});
export type MaxIpv4AddressesPerEni = number;
export type PortRange = string;
export type PortRanges = string[];
export type CertificateString = string;
export type ResourceConfigDnsResolution = "PUBLIC" | "IN_VPC" | (string & {});
export interface ServiceManagedInput {
  hostAddress: string;
  vpcId: string;
  subnetIds: string[];
  securityGroupIds?: string[];
  ipAddressType?: IpAddressType;
  ipv4AddressesPerEni?: number;
  portRanges?: string[];
  certificate?: string;
  dnsResolution?: ResourceConfigDnsResolution;
}
export type ResourceConfigurationArn = string;
export interface SelfManagedInput {
  resourceConfigurationId: string;
  certificate?: string;
}
export type PrivateConnectionMode =
  | { serviceManaged: ServiceManagedInput; selfManaged?: never }
  | { serviceManaged?: never; selfManaged: SelfManagedInput };
export interface CreatePrivateConnectionInput {
  name: string;
  mode: PrivateConnectionMode;
  tags?: { [key: string]: string | undefined };
}
export type PrivateConnectionType =
  | "SELF_MANAGED"
  | "SERVICE_MANAGED"
  | (string & {});
export type ResourceGatewayArn = string;
export type PrivateConnectionStatus =
  | "ACTIVE"
  | "CREATE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "DELETE_IN_PROGRESS"
  | "DELETE_FAILED"
  | (string & {});
export type FailureMessage = string;
export interface CreatePrivateConnectionOutput {
  name: string;
  type: PrivateConnectionType;
  resourceGatewayId?: string;
  hostAddress?: string;
  vpcId?: string;
  resourceConfigurationId?: string;
  status: PrivateConnectionStatus;
  certificateExpiryTime?: Date;
  dnsResolution?: ResourceConfigDnsResolution;
  failureMessage?: string;
  tags?: { [key: string]: string | undefined };
}
export type TriggerType = string;
export type ScheduleExpression = string;
export interface ScheduleCondition {
  expression: string;
}
export type TriggerCondition = { schedule: ScheduleCondition };
export type TriggerAction = unknown;
export type TriggerStatus = string;
export interface CreateTriggerRequest {
  agentSpaceId: string;
  type: string;
  condition: TriggerCondition;
  action: any;
  status?: string;
  clientToken?: string;
}
export interface Trigger {
  triggerId: string;
  agentSpaceId: string;
  type: string;
  condition: TriggerCondition;
  action: any;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface CreateTriggerResponse {
  trigger: Trigger;
}
export interface DeleteAgentSpaceInput {
  agentSpaceId: string;
}
export interface DeleteAgentSpaceOutput {}
export interface DeleteAssetRequest {
  agentSpaceId: string;
  assetId: string;
}
export interface DeleteAssetResponse {}
export interface DeleteAssetFileRequest {
  agentSpaceId: string;
  assetId: string;
  path: string;
}
export interface DeleteAssetFileResponse {}
export interface DeletePrivateConnectionInput {
  name: string;
}
export interface DeletePrivateConnectionOutput {
  name: string;
  status: PrivateConnectionStatus;
}
export interface DeleteTriggerRequest {
  agentSpaceId: string;
  triggerId: string;
}
export interface DeleteTriggerResponse {}
export interface DeregisterServiceInput {
  serviceId: string;
}
export interface DeregisterServiceOutput {}
export interface DescribePrivateConnectionInput {
  name: string;
}
export interface DescribePrivateConnectionOutput {
  name: string;
  type: PrivateConnectionType;
  resourceGatewayId?: string;
  hostAddress?: string;
  vpcId?: string;
  resourceConfigurationId?: string;
  status: PrivateConnectionStatus;
  certificateExpiryTime?: Date;
  dnsResolution?: ResourceConfigDnsResolution;
  failureMessage?: string;
  tags?: { [key: string]: string | undefined };
}
export type AuthFlow = "iam" | "idc" | "idp" | (string & {});
export interface DisableOperatorAppInput {
  agentSpaceId: string;
  authFlow?: AuthFlow;
}
export interface DisableOperatorAppResponse {}
export interface DisassociateServiceInput {
  agentSpaceId: string;
  associationId: string;
}
export interface DisassociateServiceOutput {}
export type IdpClientId = string;
export type IdpClientSecret = string | redacted.Redacted<string>;
export interface EnableOperatorAppInput {
  agentSpaceId: string;
  authFlow: AuthFlow;
  operatorAppRoleArn: string;
  idcInstanceArn?: string;
  issuerUrl?: string;
  idpClientId?: string;
  idpClientSecret?: string | redacted.Redacted<string>;
  provider?: string;
}
export type OperatorAppUrl = string;
export interface IamAuthConfiguration {
  operatorAppRoleArn: string;
  createdAt: Date;
  updatedAt?: Date;
}
export interface IdcAuthConfiguration {
  operatorAppRoleArn: string;
  idcInstanceArn: string;
  idcApplicationArn?: string;
  createdAt: Date;
  updatedAt?: Date;
}
export interface IdpAuthConfiguration {
  issuerUrl: string;
  clientId: string;
  operatorAppRoleArn: string;
  provider: string;
  createdAt: Date;
  updatedAt?: Date;
}
export interface EnableOperatorAppOutput {
  agentSpaceId: string;
  operatorAppUrl?: string;
  iam?: IamAuthConfiguration;
  idc?: IdcAuthConfiguration;
  idp?: IdpAuthConfiguration;
}
export interface GetAccountUsageInput {}
export interface UsageMetric {
  limit: number;
  usage: number;
}
export interface GetAccountUsageOutput {
  monthlyAccountInvestigationHours?: UsageMetric;
  monthlyAccountEvaluationHours?: UsageMetric;
  monthlyAccountSystemLearningHours?: UsageMetric;
  monthlyAccountOnDemandHours?: UsageMetric;
  usagePeriodStartTime: Date;
  usagePeriodEndTime: Date;
}
export interface GetAgentSpaceInput {
  agentSpaceId: string;
}
export interface GetAgentSpaceOutput {
  agentSpace: AgentSpace;
  tags?: { [key: string]: string | undefined };
}
export interface GetAssetRequest {
  agentSpaceId: string;
  assetId: string;
  assetVersion?: number;
}
export interface GetAssetResponse {
  asset: Asset;
}
export interface GetAssetContentRequest {
  agentSpaceId: string;
  assetId: string;
  assetVersion?: number;
}
export interface GetAssetContentResponse {
  content: AssetZipContent;
  version: number;
}
export interface GetAssetFileRequest {
  agentSpaceId: string;
  assetId: string;
  path: string;
  assetVersion?: number;
}
export interface GetAssetFileResponse {
  file: AssetFile;
}
export interface GetAssociationInput {
  agentSpaceId: string;
  associationId: string;
}
export interface GetAssociationOutput {
  association: Association;
}
export interface GetBacklogTaskRequest {
  agentSpaceId: string;
  taskId: string;
}
export interface GetBacklogTaskResponse {
  task: Task;
}
export interface GetOperatorAppInput {
  agentSpaceId: string;
}
export interface GetOperatorAppOutput {
  operatorAppUrl?: string;
  iam?: IamAuthConfiguration;
  idc?: IdcAuthConfiguration;
  idp?: IdpAuthConfiguration;
}
export interface GetRecommendationRequest {
  agentSpaceId: string;
  recommendationId: string;
  recommendationVersion?: number;
}
export interface RecommendationContent {
  summary: string;
  spec?: string;
}
export type RecommendationStatus =
  | "PROPOSED"
  | "ACCEPTED"
  | "REJECTED"
  | "CLOSED"
  | "COMPLETED"
  | "UPDATE_IN_PROGRESS"
  | (string & {});
export type RecommendationPriority = "HIGH" | "MEDIUM" | "LOW" | (string & {});
export interface Recommendation {
  agentSpaceArn: string;
  recommendationId: string;
  taskId: string;
  goalId?: string;
  title: string;
  content: RecommendationContent;
  status: RecommendationStatus;
  priority: RecommendationPriority;
  goalVersion?: number;
  additionalContext?: string;
  rankPosition?: number;
  rankedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}
export interface GetRecommendationResponse {
  recommendation: Recommendation;
}
export interface GetServiceInput {
  serviceId: string;
}
export type Service =
  | "github"
  | "slack"
  | "azure"
  | "azuredevops"
  | "dynatrace"
  | "servicenow"
  | "pagerduty"
  | "gitlab"
  | "eventChannel"
  | "mcpservernewrelic"
  | "mcpservergrafana"
  | "mcpserverdatadog"
  | "mcpserver"
  | "mcpserversplunk"
  | "azureidentity"
  | "mcpserversigv4"
  | "remoteagent"
  | "remoteagentsigv4"
  | (string & {});
export type ServiceName = string;
export type DocumentList = any[];
export interface RegisteredGithubServiceDetails {
  owner: string;
  ownerType: GithubRepoOwnerType;
  targetUrl?: string;
}
export interface RegisteredSlackServiceDetails {
  teamId: string;
  teamName: string;
}
export type MCPServerAuthorizationMethod =
  | "oauth-client-credentials"
  | "oauth-3lo"
  | "api-key"
  | "bearer-token"
  | (string & {});
export interface RegisteredMCPServerDetails {
  name: string;
  endpoint: string;
  authorizationMethod: MCPServerAuthorizationMethod;
  description?: string | redacted.Redacted<string>;
  apiKeyHeader?: string;
}
export type ServiceNowInstanceUrl = string;
export interface RegisteredServiceNowDetails {
  instanceUrl?: string;
}
export type GitLabTokenType = "personal" | "group" | (string & {});
export interface RegisteredGitLabServiceDetails {
  targetUrl: string;
  tokenType: GitLabTokenType;
  groupId?: string;
}
export type NewRelicRegion = "US" | "EU" | "JP" | (string & {});
export interface RegisteredNewRelicDetails {
  accountId: string;
  region: NewRelicRegion;
  description?: string | redacted.Redacted<string>;
}
export interface RegisteredAzureDevOpsServiceDetails {
  organizationName: string;
}
export type Guid = string;
export type WebIdentityTokenAudienceList = string[];
export interface RegisteredAzureIdentityDetails {
  tenantId: string;
  clientId: string;
  webIdentityRoleArn: string;
  webIdentityTokenAudiences: string[];
}
export type MCPServerEndpoint = string;
export interface RegisteredGrafanaServerDetails {
  endpoint: string;
  authorizationMethod: MCPServerAuthorizationMethod;
}
export type PagerDutyScopesList = string[];
export interface RegisteredPagerDutyDetails {
  scopes: string[];
}
export type MCPServerName = string;
export type SigV4Region = string;
export type CustomHeaderName = string;
export type CustomHeaderValue = string | redacted.Redacted<string>;
export type CustomHeaders = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export interface RegisteredMCPServerSigV4Details {
  name: string;
  endpoint: string;
  description?: string | redacted.Redacted<string>;
  region: string;
  service: string;
  roleArn: string;
  mcpRoleArn?: string;
  customHeaders?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
}
export type RemoteAgentName = string;
export type RemoteAgentEndpoint = string;
export type RemoteAgentAuthorizationMethod =
  | "oauth-client-credentials"
  | "api-key"
  | "bearer-token"
  | (string & {});
export interface RegisteredRemoteAgentDetails {
  name: string;
  endpoint: string;
  description?: string | redacted.Redacted<string>;
  authorizationMethod: RemoteAgentAuthorizationMethod;
  apiKeyHeader?: string;
}
export interface RegisteredRemoteAgentSigV4Details {
  name: string;
  endpoint: string;
  description?: string | redacted.Redacted<string>;
  region: string;
  service: string;
  roleArn?: string;
}
export type AdditionalServiceDetails =
  | {
      github: RegisteredGithubServiceDetails;
      slack?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      servicenow?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      mcpservernewrelic?: never;
      azuredevops?: never;
      azureidentity?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      github?: never;
      slack: RegisteredSlackServiceDetails;
      mcpserverdatadog?: never;
      mcpserver?: never;
      servicenow?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      mcpservernewrelic?: never;
      azuredevops?: never;
      azureidentity?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      github?: never;
      slack?: never;
      mcpserverdatadog: RegisteredMCPServerDetails;
      mcpserver?: never;
      servicenow?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      mcpservernewrelic?: never;
      azuredevops?: never;
      azureidentity?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      github?: never;
      slack?: never;
      mcpserverdatadog?: never;
      mcpserver: RegisteredMCPServerDetails;
      servicenow?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      mcpservernewrelic?: never;
      azuredevops?: never;
      azureidentity?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      github?: never;
      slack?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      servicenow: RegisteredServiceNowDetails;
      gitlab?: never;
      mcpserversplunk?: never;
      mcpservernewrelic?: never;
      azuredevops?: never;
      azureidentity?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      github?: never;
      slack?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      servicenow?: never;
      gitlab: RegisteredGitLabServiceDetails;
      mcpserversplunk?: never;
      mcpservernewrelic?: never;
      azuredevops?: never;
      azureidentity?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      github?: never;
      slack?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      servicenow?: never;
      gitlab?: never;
      mcpserversplunk: RegisteredMCPServerDetails;
      mcpservernewrelic?: never;
      azuredevops?: never;
      azureidentity?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      github?: never;
      slack?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      servicenow?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      mcpservernewrelic: RegisteredNewRelicDetails;
      azuredevops?: never;
      azureidentity?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      github?: never;
      slack?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      servicenow?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      mcpservernewrelic?: never;
      azuredevops: RegisteredAzureDevOpsServiceDetails;
      azureidentity?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      github?: never;
      slack?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      servicenow?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      mcpservernewrelic?: never;
      azuredevops?: never;
      azureidentity: RegisteredAzureIdentityDetails;
      mcpservergrafana?: never;
      pagerduty?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      github?: never;
      slack?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      servicenow?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      mcpservernewrelic?: never;
      azuredevops?: never;
      azureidentity?: never;
      mcpservergrafana: RegisteredGrafanaServerDetails;
      pagerduty?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      github?: never;
      slack?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      servicenow?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      mcpservernewrelic?: never;
      azuredevops?: never;
      azureidentity?: never;
      mcpservergrafana?: never;
      pagerduty: RegisteredPagerDutyDetails;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      github?: never;
      slack?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      servicenow?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      mcpservernewrelic?: never;
      azuredevops?: never;
      azureidentity?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      mcpserversigv4: RegisteredMCPServerSigV4Details;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      github?: never;
      slack?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      servicenow?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      mcpservernewrelic?: never;
      azuredevops?: never;
      azureidentity?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      mcpserversigv4?: never;
      remoteagent: RegisteredRemoteAgentDetails;
      remoteagentsigv4?: never;
    }
  | {
      github?: never;
      slack?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      servicenow?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      mcpservernewrelic?: never;
      azuredevops?: never;
      azureidentity?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4: RegisteredRemoteAgentSigV4Details;
    };
export interface RegisteredService {
  serviceId: string;
  serviceType: Service;
  name?: string;
  accessibleResources?: any[];
  additionalServiceDetails?: AdditionalServiceDetails;
  kmsKeyArn?: string;
  privateConnectionName?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface GetServiceOutput {
  service: RegisteredService & { createdAt: Date; updatedAt: Date };
  tags?: { [key: string]: string | undefined };
}
export interface GetTriggerRequest {
  agentSpaceId: string;
  triggerId: string;
}
export interface GetTriggerResponse {
  trigger: Trigger;
}
export type NextToken = string;
export interface ListAgentSpacesInput {
  maxResults?: number;
  nextToken?: string;
}
export type AgentSpaceList = AgentSpace[];
export interface ListAgentSpacesOutput {
  nextToken?: string;
  agentSpaces: AgentSpace[];
}
export interface ListAssetFilesRequest {
  agentSpaceId: string;
  assetId: string;
  assetVersion?: number;
  nextToken?: string;
  maxResults?: number;
}
export interface AssetFileSummary {
  path: string;
  metadata?: any;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}
export type AssetFileSummaryList = AssetFileSummary[];
export interface ListAssetFilesResponse {
  items: AssetFileSummary[];
  nextToken?: string;
}
export interface ListAssetsRequest {
  agentSpaceId: string;
  assetType?: string;
  updatedAfter?: Date;
  updatedBefore?: Date;
  nextToken?: string;
  maxResults?: number;
}
export type AssetList = Asset[];
export interface ListAssetsResponse {
  items: Asset[];
  nextToken?: string;
}
export interface ListAssetTypesRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface AssetTypeSummary {
  assetType: string;
  description: string;
}
export type AssetTypeList = AssetTypeSummary[];
export interface ListAssetTypesResponse {
  items: AssetTypeSummary[];
  nextToken?: string;
}
export interface ListAssetVersionsRequest {
  agentSpaceId: string;
  assetId: string;
  maxResults?: number;
  nextToken?: string;
}
export interface AssetVersionMetadata {
  version: number;
  createdAt: Date;
  updatedAt: Date;
}
export type AssetVersionMetadataList = AssetVersionMetadata[];
export interface ListAssetVersionsResponse {
  items: AssetVersionMetadata[];
  nextToken?: string;
}
export interface ListAssociationsInput {
  agentSpaceId: string;
  maxResults?: number;
  nextToken?: string;
  filterServiceTypes?: string;
}
export type AssociationsList = Association[];
export interface ListAssociationsOutput {
  nextToken?: string;
  associations: Association[];
}
export type PriorityList = Priority[];
export type TaskStatusList = TaskStatus[];
export type TaskTypeList = TaskType[];
export interface TaskFilter {
  createdAfter?: Date;
  createdBefore?: Date;
  priority?: Priority[];
  status?: TaskStatus[];
  taskType?: TaskType[];
  primaryTaskId?: string;
}
export type TaskSortField = "CREATED_AT" | "PRIORITY" | (string & {});
export type TaskSortOrder = "ASC" | "DESC" | (string & {});
export interface ListBacklogTasksRequest {
  agentSpaceId: string;
  filter?: TaskFilter;
  limit?: number;
  nextToken?: string;
  sortField?: TaskSortField;
  order?: TaskSortOrder;
}
export type TaskList = Task[];
export interface ListBacklogTasksResponse {
  tasks: Task[];
  nextToken?: string;
}
export interface ListChatsRequest {
  agentSpaceId: string;
  userId?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ChatExecution {
  executionId: string;
  createdAt: Date;
  updatedAt?: Date;
  summary?: string;
}
export type ChatExecutionList = ChatExecution[];
export interface ListChatsResponse {
  executions: ChatExecution[];
  nextToken?: string;
}
export interface ListExecutionsRequest {
  agentSpaceId: string;
  taskId: string;
  limit?: number;
  nextToken?: string;
}
export type JournalTimestamp = Date;
export type ExecutionStatus =
  | "FAILED"
  | "RUNNING"
  | "STOPPED"
  | "CANCELED"
  | "TIMED_OUT"
  | "WAITING"
  | (string & {});
export interface Execution {
  agentSpaceId: string;
  executionId: string;
  parentExecutionId?: string;
  agentSubTask: string;
  createdAt: Date;
  updatedAt: Date;
  executionStatus: ExecutionStatus;
  agentType?: string;
  uid?: string;
}
export type ExecutionList = Execution[];
export interface ListExecutionsResponse {
  executions: Execution[];
  nextToken?: string;
}
export type GoalStatus = "ACTIVE" | "PAUSED" | "COMPLETE" | (string & {});
export type GoalType = "CUSTOMER_DEFINED" | "ONCALL_REPORT" | (string & {});
export interface ListGoalsRequest {
  agentSpaceId: string;
  status?: GoalStatus;
  goalType?: GoalType;
  limit?: number;
  nextToken?: string;
}
export interface GoalContent {
  description: string;
  objectives: string;
}
export type SchedulerState = "ENABLED" | "DISABLED" | (string & {});
export interface GoalSchedule {
  state: SchedulerState;
  expression?: string;
}
export interface Goal {
  agentSpaceArn: string;
  goalId: string;
  title: string;
  content: GoalContent;
  status: GoalStatus;
  goalType: GoalType;
  createdAt: Date;
  updatedAt: Date;
  lastEvaluatedAt?: Date;
  lastTaskId?: string;
  lastSuccessfulTaskId?: string;
  version: number;
  evaluationSchedule?: GoalSchedule;
}
export type GoalList = Goal[];
export interface ListGoalsResponse {
  goals: Goal[];
  nextToken?: string;
}
export type OrderType = "ASC" | "DESC" | (string & {});
export interface ListJournalRecordsRequest {
  agentSpaceId: string;
  executionId: string;
  limit?: number;
  nextToken?: string;
  recordType?: string;
  order?: OrderType;
}
export interface UserReference {
  userId: string;
  userType: UserType;
}
export interface JournalRecord {
  agentSpaceId: string;
  executionId: string;
  recordId: string;
  content: any;
  createdAt: Date;
  recordType: string;
  userReference?: UserReference;
}
export type JournalRecordList = JournalRecord[];
export interface ListJournalRecordsResponse {
  records: JournalRecord[];
  nextToken?: string;
}
export interface ListPendingMessagesRequest {
  agentSpaceId: string;
  executionId: string;
}
export type UserMessageBlock =
  | { text: string; toolResult?: never }
  | { text?: never; toolResult: any };
export type UserMessage = UserMessageBlock[];
export type AssistantMessageBlock =
  | { text: string; toolUse?: never }
  | { text?: never; toolUse: any };
export type AssistantMessage = AssistantMessageBlock[];
export type Message =
  | { userMessage: UserMessageBlock[]; assistantMessage?: never }
  | { userMessage?: never; assistantMessage: AssistantMessageBlock[] };
export interface PendingMessage {
  messageId: string;
  message: Message;
}
export type PendingMessages = PendingMessage[];
export interface ListPendingMessagesResponse {
  agentSpaceId: string;
  executionId: string;
  messages: PendingMessage[];
  createdAt: Date;
}
export interface ListPrivateConnectionsInput {}
export interface PrivateConnectionSummary {
  name: string;
  type: PrivateConnectionType;
  resourceGatewayId?: string;
  hostAddress?: string;
  vpcId?: string;
  resourceConfigurationId?: string;
  status: PrivateConnectionStatus;
  certificateExpiryTime?: Date;
  dnsResolution?: ResourceConfigDnsResolution;
  failureMessage?: string;
}
export type PrivateConnectionSummaryList = PrivateConnectionSummary[];
export interface ListPrivateConnectionsOutput {
  privateConnections: PrivateConnectionSummary[];
}
export interface ListRecommendationsRequest {
  agentSpaceId: string;
  taskId?: string;
  goalId?: string;
  status?: RecommendationStatus;
  priority?: RecommendationPriority;
  limit?: number;
  nextToken?: string;
}
export type RecommendationList = Recommendation[];
export interface ListRecommendationsResponse {
  recommendations: Recommendation[];
  nextToken?: string;
}
export interface ListServicesInput {
  maxResults?: number;
  nextToken?: string;
  filterServiceType?: Service;
}
export type RegisteredServicesList = RegisteredService[];
export interface ListServicesOutput {
  nextToken?: string;
  services: (RegisteredService & { createdAt: Date; updatedAt: Date })[];
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags: { [key: string]: string | undefined };
}
export interface ListTriggersRequest {
  agentSpaceId: string;
  status?: string;
  nextToken?: string;
  maxResults?: number;
}
export type TriggerList = Trigger[];
export interface ListTriggersResponse {
  items: Trigger[];
  nextToken?: string;
}
export interface ListWebhooksInput {
  agentSpaceId: string;
  associationId: string;
}
export interface Webhook {
  webhookUrl: string;
  webhookType?: WebhookType;
  webhookId: string;
}
export type WebhooksList = Webhook[];
export interface ListWebhooksOutput {
  webhooks: Webhook[];
}
export type PostRegisterServiceSupportedService =
  | "dynatrace"
  | "servicenow"
  | "pagerduty"
  | "gitlab"
  | "eventChannel"
  | "mcpservernewrelic"
  | "mcpservergrafana"
  | "mcpserverdatadog"
  | "mcpserver"
  | "mcpserversplunk"
  | "azureidentity"
  | "mcpserversigv4"
  | "remoteagent"
  | "remoteagentsigv4"
  | (string & {});
export type ClientId = string | redacted.Redacted<string>;
export type ExchangeParameterValue = string | redacted.Redacted<string>;
export type ExchangeParameters = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export type ClientSecret = string | redacted.Redacted<string>;
export interface DynatraceOAuthClientCredentialsConfig {
  clientName?: string;
  clientId: string | redacted.Redacted<string>;
  exchangeParameters?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  clientSecret: string | redacted.Redacted<string>;
}
export type DynatraceServiceAuthorizationConfig = {
  oAuthClientCredentials: DynatraceOAuthClientCredentialsConfig;
};
export interface DynatraceServiceDetails {
  accountUrn: string;
  authorizationConfig?: DynatraceServiceAuthorizationConfig;
}
export interface ServiceNowOAuthClientCredentialsConfig {
  clientName?: string;
  clientId: string | redacted.Redacted<string>;
  exchangeParameters?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  clientSecret: string | redacted.Redacted<string>;
}
export type ServiceNowServiceAuthorizationConfig = {
  oAuthClientCredentials: ServiceNowOAuthClientCredentialsConfig;
};
export interface ServiceNowServiceDetails {
  instanceUrl: string;
  authorizationConfig?: ServiceNowServiceAuthorizationConfig;
}
export interface MCPServerAuthorizationDiscoveryConfig {
  returnToEndpoint: string;
}
export type DatadogAuthorizationConfig = {
  authorizationDiscovery: MCPServerAuthorizationDiscoveryConfig;
};
export interface DatadogServiceDetails {
  name: string;
  endpoint: string;
  description?: string | redacted.Redacted<string>;
  authorizationConfig: DatadogAuthorizationConfig;
}
export type OAuthScope = string;
export type Scopes = string[];
export interface MCPServerOAuthClientCredentialsConfig {
  clientName?: string;
  clientId: string | redacted.Redacted<string>;
  exchangeParameters?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  clientSecret: string | redacted.Redacted<string>;
  exchangeUrl: string;
  scopes?: string[];
}
export interface MCPServerOAuth3LOConfig {
  clientName?: string;
  clientId: string | redacted.Redacted<string>;
  exchangeParameters?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  returnToEndpoint: string;
  authorizationUrl: string;
  exchangeUrl: string;
  clientSecret?: string | redacted.Redacted<string>;
  supportCodeChallenge?: boolean;
  scopes?: string[];
}
export interface MCPServerAPIKeyConfig {
  apiKeyName: string;
  apiKeyValue: string | redacted.Redacted<string>;
  apiKeyHeader: string;
}
export type TokenValue = string | redacted.Redacted<string>;
export interface MCPServerBearerTokenConfig {
  tokenName: string;
  tokenValue: string | redacted.Redacted<string>;
  authorizationHeader?: string;
}
export type MCPServerAuthorizationConfig =
  | {
      oAuthClientCredentials: MCPServerOAuthClientCredentialsConfig;
      oAuth3LO?: never;
      apiKey?: never;
      bearerToken?: never;
      authorizationDiscovery?: never;
    }
  | {
      oAuthClientCredentials?: never;
      oAuth3LO: MCPServerOAuth3LOConfig;
      apiKey?: never;
      bearerToken?: never;
      authorizationDiscovery?: never;
    }
  | {
      oAuthClientCredentials?: never;
      oAuth3LO?: never;
      apiKey: MCPServerAPIKeyConfig;
      bearerToken?: never;
      authorizationDiscovery?: never;
    }
  | {
      oAuthClientCredentials?: never;
      oAuth3LO?: never;
      apiKey?: never;
      bearerToken: MCPServerBearerTokenConfig;
      authorizationDiscovery?: never;
    }
  | {
      oAuthClientCredentials?: never;
      oAuth3LO?: never;
      apiKey?: never;
      bearerToken?: never;
      authorizationDiscovery: MCPServerAuthorizationDiscoveryConfig;
    };
export interface MCPServerDetails {
  name: string;
  endpoint: string;
  description?: string | redacted.Redacted<string>;
  authorizationConfig: MCPServerAuthorizationConfig;
}
export type GitLabTokenValue = string | redacted.Redacted<string>;
export interface GitLabDetails {
  targetUrl: string;
  tokenType: GitLabTokenType;
  tokenValue: string | redacted.Redacted<string>;
  groupId?: string;
}
export type NewRelicApiKey = string | redacted.Redacted<string>;
export type NewRelicApplicationIds = string[];
export type NewRelicEntityGuids = string[];
export type NewRelicAlertPolicyIds = string[];
export interface NewRelicApiKeyConfig {
  apiKey: string | redacted.Redacted<string>;
  accountId: string;
  region: NewRelicRegion;
  applicationIds?: string[];
  entityGuids?: string[];
  alertPolicyIds?: string[];
}
export type NewRelicServiceAuthorizationConfig = {
  apiKey: NewRelicApiKeyConfig;
};
export interface NewRelicServiceDetails {
  authorizationConfig: NewRelicServiceAuthorizationConfig;
}
export type EventChannelType = "webhook" | (string & {});
export interface EventChannelDetails {
  type?: EventChannelType;
}
export interface GrafanaServiceDetails {
  name: string;
  endpoint: string;
  description?: string | redacted.Redacted<string>;
  authorizationConfig: MCPServerAuthorizationConfig;
}
export type PagerDutyScopes = string[];
export interface PagerDutyOAuthClientCredentialsConfig {
  clientName?: string;
  clientId: string | redacted.Redacted<string>;
  exchangeParameters?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  clientSecret: string | redacted.Redacted<string>;
}
export type PagerDutyAuthorizationConfig = {
  oAuthClientCredentials: PagerDutyOAuthClientCredentialsConfig;
};
export interface PagerDutyDetails {
  scopes: string[];
  authorizationConfig: PagerDutyAuthorizationConfig;
}
export interface MCPServerSigV4AuthorizationConfig {
  region: string;
  service: string;
  roleArn?: string;
  mcpRoleArn?: string;
  customHeaders?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
}
export interface MCPServerSigV4ServiceDetails {
  name: string;
  endpoint: string;
  description?: string | redacted.Redacted<string>;
  authorizationConfig: MCPServerSigV4AuthorizationConfig;
}
export interface RemoteAgentAPIKeyConfig {
  apiKeyName: string;
  apiKeyValue: string | redacted.Redacted<string>;
  apiKeyHeader: string;
}
export interface RemoteAgentOAuthClientCredentialsConfig {
  clientName?: string;
  clientId: string | redacted.Redacted<string>;
  exchangeParameters?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  clientSecret: string | redacted.Redacted<string>;
  exchangeUrl: string;
  scopes?: string[];
}
export interface RemoteAgentBearerTokenConfig {
  tokenName: string;
  tokenValue: string | redacted.Redacted<string>;
  authorizationHeader?: string;
}
export type RemoteAgentAuthorizationConfig =
  | {
      apiKey: RemoteAgentAPIKeyConfig;
      oAuthClientCredentials?: never;
      bearerToken?: never;
    }
  | {
      apiKey?: never;
      oAuthClientCredentials: RemoteAgentOAuthClientCredentialsConfig;
      bearerToken?: never;
    }
  | {
      apiKey?: never;
      oAuthClientCredentials?: never;
      bearerToken: RemoteAgentBearerTokenConfig;
    };
export interface RemoteAgentServiceDetails {
  name: string;
  endpoint: string;
  description?: string | redacted.Redacted<string>;
  authorizationConfig: RemoteAgentAuthorizationConfig;
}
export interface RemoteAgentSigV4AuthorizationConfig {
  region: string;
  service: string;
  roleArn?: string;
}
export interface RemoteAgentSigV4ServiceDetails {
  name: string;
  endpoint: string;
  description?: string | redacted.Redacted<string>;
  authorizationConfig: RemoteAgentSigV4AuthorizationConfig;
}
export type ServiceDetails =
  | {
      dynatrace: DynatraceServiceDetails;
      servicenow?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      mcpservernewrelic?: never;
      eventChannel?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      azureidentity?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      dynatrace?: never;
      servicenow: ServiceNowServiceDetails;
      mcpserverdatadog?: never;
      mcpserver?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      mcpservernewrelic?: never;
      eventChannel?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      azureidentity?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      dynatrace?: never;
      servicenow?: never;
      mcpserverdatadog: DatadogServiceDetails;
      mcpserver?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      mcpservernewrelic?: never;
      eventChannel?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      azureidentity?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      dynatrace?: never;
      servicenow?: never;
      mcpserverdatadog?: never;
      mcpserver: MCPServerDetails;
      gitlab?: never;
      mcpserversplunk?: never;
      mcpservernewrelic?: never;
      eventChannel?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      azureidentity?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      dynatrace?: never;
      servicenow?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      gitlab: GitLabDetails;
      mcpserversplunk?: never;
      mcpservernewrelic?: never;
      eventChannel?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      azureidentity?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      dynatrace?: never;
      servicenow?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      gitlab?: never;
      mcpserversplunk: MCPServerDetails;
      mcpservernewrelic?: never;
      eventChannel?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      azureidentity?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      dynatrace?: never;
      servicenow?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      mcpservernewrelic: NewRelicServiceDetails;
      eventChannel?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      azureidentity?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      dynatrace?: never;
      servicenow?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      mcpservernewrelic?: never;
      eventChannel: EventChannelDetails;
      mcpservergrafana?: never;
      pagerduty?: never;
      azureidentity?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      dynatrace?: never;
      servicenow?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      mcpservernewrelic?: never;
      eventChannel?: never;
      mcpservergrafana: GrafanaServiceDetails;
      pagerduty?: never;
      azureidentity?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      dynatrace?: never;
      servicenow?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      mcpservernewrelic?: never;
      eventChannel?: never;
      mcpservergrafana?: never;
      pagerduty: PagerDutyDetails;
      azureidentity?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      dynatrace?: never;
      servicenow?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      mcpservernewrelic?: never;
      eventChannel?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      azureidentity: RegisteredAzureIdentityDetails;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      dynatrace?: never;
      servicenow?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      mcpservernewrelic?: never;
      eventChannel?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      azureidentity?: never;
      mcpserversigv4: MCPServerSigV4ServiceDetails;
      remoteagent?: never;
      remoteagentsigv4?: never;
    }
  | {
      dynatrace?: never;
      servicenow?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      mcpservernewrelic?: never;
      eventChannel?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      azureidentity?: never;
      mcpserversigv4?: never;
      remoteagent: RemoteAgentServiceDetails;
      remoteagentsigv4?: never;
    }
  | {
      dynatrace?: never;
      servicenow?: never;
      mcpserverdatadog?: never;
      mcpserver?: never;
      gitlab?: never;
      mcpserversplunk?: never;
      mcpservernewrelic?: never;
      eventChannel?: never;
      mcpservergrafana?: never;
      pagerduty?: never;
      azureidentity?: never;
      mcpserversigv4?: never;
      remoteagent?: never;
      remoteagentsigv4: RemoteAgentSigV4ServiceDetails;
    };
export interface RegisterServiceInput {
  service: PostRegisterServiceSupportedService;
  serviceDetails: ServiceDetails;
  kmsKeyArn?: string;
  privateConnectionName?: string;
  targetUrlPrivateConnectionName?: string;
  exchangeUrlPrivateConnectionName?: string;
  name?: string;
  tags?: { [key: string]: string | undefined };
}
export interface OAuthAdditionalStepDetails {
  authorizationUrl: string;
}
export type AdditionalServiceRegistrationStep = {
  oauth: OAuthAdditionalStepDetails;
};
export interface RegisterServiceOutput {
  serviceId?: string;
  additionalStep?: AdditionalServiceRegistrationStep;
  kmsKeyArn?: string;
  tags?: { [key: string]: string | undefined };
}
export type ChatExecutionId = string;
export type MessageContent = string;
export type ToolUseId = string;
export type InterruptId = string;
export type ApprovalId = string;
export type ButtonText = string;
export type ApprovalActionType = "APPROVED" | "REJECTED" | (string & {});
export interface ApprovalAction {
  toolUseId?: string;
  interruptId?: string;
  approvalId?: string;
  buttonText?: string;
  action?: ApprovalActionType;
}
export interface SendMessageContext {
  currentPage?: string;
  lastMessage?: string;
  userActionResponse?: string;
  approvalAction?: ApprovalAction;
}
export type AssetIdList = string[];
export interface SendMessageRequest {
  agentSpaceId: string;
  executionId: string;
  content: string;
  context?: SendMessageContext;
  userId?: string;
  assetIds?: string[];
  modelTier?: string;
}
export interface SendMessageResponseCreatedEvent {
  responseId?: string;
  sequenceNumber?: number;
}
export interface SendMessageResponseInProgressEvent {
  responseId?: string;
  sequenceNumber?: number;
}
export interface SendMessageUsageInfo {
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
}
export interface SendMessageResponseCompletedEvent {
  responseId?: string;
  usage?: SendMessageUsageInfo;
  sequenceNumber?: number;
}
export interface SendMessageResponseFailedEvent {
  responseId?: string;
  errorCode?: string;
  errorMessage?: string;
  sequenceNumber?: number;
}
export interface SendMessageSummaryEvent {
  content?: string;
  sequenceNumber?: number;
}
export interface SendMessageHeartbeatEvent {}
export interface SendMessageContentBlockStartEvent {
  index?: number;
  type?: string;
  id?: string;
  parentId?: string;
  sequenceNumber?: number;
}
export interface SendMessageTextDelta {
  text?: string;
}
export interface SendMessageJsonDelta {
  partialJson?: string;
}
export type SendMessageContentBlockDelta =
  | { textDelta: SendMessageTextDelta; jsonDelta?: never }
  | { textDelta?: never; jsonDelta: SendMessageJsonDelta };
export interface SendMessageContentBlockDeltaEvent {
  index?: number;
  delta?: SendMessageContentBlockDelta;
  sequenceNumber?: number;
}
export interface SendMessageContentBlockStopEvent {
  index?: number;
  type?: string;
  text?: string;
  last?: boolean;
  sequenceNumber?: number;
}
export type SendMessageEvents =
  | {
      responseCreated: SendMessageResponseCreatedEvent;
      responseInProgress?: never;
      responseCompleted?: never;
      responseFailed?: never;
      summary?: never;
      heartbeat?: never;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop?: never;
    }
  | {
      responseCreated?: never;
      responseInProgress: SendMessageResponseInProgressEvent;
      responseCompleted?: never;
      responseFailed?: never;
      summary?: never;
      heartbeat?: never;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop?: never;
    }
  | {
      responseCreated?: never;
      responseInProgress?: never;
      responseCompleted: SendMessageResponseCompletedEvent;
      responseFailed?: never;
      summary?: never;
      heartbeat?: never;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop?: never;
    }
  | {
      responseCreated?: never;
      responseInProgress?: never;
      responseCompleted?: never;
      responseFailed: SendMessageResponseFailedEvent;
      summary?: never;
      heartbeat?: never;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop?: never;
    }
  | {
      responseCreated?: never;
      responseInProgress?: never;
      responseCompleted?: never;
      responseFailed?: never;
      summary: SendMessageSummaryEvent;
      heartbeat?: never;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop?: never;
    }
  | {
      responseCreated?: never;
      responseInProgress?: never;
      responseCompleted?: never;
      responseFailed?: never;
      summary?: never;
      heartbeat: SendMessageHeartbeatEvent;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop?: never;
    }
  | {
      responseCreated?: never;
      responseInProgress?: never;
      responseCompleted?: never;
      responseFailed?: never;
      summary?: never;
      heartbeat?: never;
      contentBlockStart: SendMessageContentBlockStartEvent;
      contentBlockDelta?: never;
      contentBlockStop?: never;
    }
  | {
      responseCreated?: never;
      responseInProgress?: never;
      responseCompleted?: never;
      responseFailed?: never;
      summary?: never;
      heartbeat?: never;
      contentBlockStart?: never;
      contentBlockDelta: SendMessageContentBlockDeltaEvent;
      contentBlockStop?: never;
    }
  | {
      responseCreated?: never;
      responseInProgress?: never;
      responseCompleted?: never;
      responseFailed?: never;
      summary?: never;
      heartbeat?: never;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop: SendMessageContentBlockStopEvent;
    };
export interface SendMessageResponse {
  events: stream.Stream<SendMessageEvents, Error, never>;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateAgentSpaceInput {
  agentSpaceId: string;
  name?: string;
  description?: string | redacted.Redacted<string>;
  locale?: string;
  preferences?: { [key: string]: boolean | undefined };
}
export interface UpdateAgentSpaceOutput {
  agentSpace: AgentSpace;
}
export type ToolIdentifier = string;
export type ApprovalPinKey = string;
export type ApprovalPinValue = string;
export type ApprovalArgumentPins = { [key: string]: string | undefined };
export interface ApprovalPattern {
  tool: string;
  argumentPins: { [key: string]: string | undefined };
}
export type ApprovalReason = string;
export interface UpdateApprovalActionRequest {
  agentSpaceId: string;
  approvalId: string;
  action: ApprovalActionType;
  finalPattern?: ApprovalPattern;
  reason?: string;
  ttlSeconds?: number;
  singleUse?: boolean;
}
export type ApprovalStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "REVOKED"
  | "REDEEMED"
  | (string & {});
export interface UpdateApprovalActionResponse {
  approvalId: string;
  status: ApprovalStatus;
  expiresAt?: Date;
}
export interface UpdateAssetRequest {
  agentSpaceId: string;
  assetId: string;
  metadata?: any;
  content?: AssetContent;
  clientToken?: string;
}
export interface UpdateAssetResponse {
  asset: Asset;
}
export interface UpdateAssetFileRequest {
  agentSpaceId: string;
  assetId: string;
  path: string;
  content?: AssetFileBody;
  metadata?: any;
  clientToken?: string;
}
export interface UpdateAssetFileResponse {
  file: AssetFile;
}
export interface UpdateAssociationInput {
  agentSpaceId: string;
  associationId: string;
  configuration: ServiceConfiguration;
  capabilities?: { [key: string]: CapabilityConfiguration | undefined };
}
export interface UpdateAssociationOutput {
  association: Association;
  webhook?: GenericWebhook;
}
export interface UpdateBacklogTaskRequest {
  agentSpaceId: string;
  taskId: string;
  taskStatus?: TaskStatus;
  clientToken?: string;
}
export interface UpdateBacklogTaskResponse {
  task: Task;
}
export interface GoalScheduleInput {
  state: SchedulerState;
}
export interface UpdateGoalRequest {
  agentSpaceId: string;
  goalId: string;
  evaluationSchedule?: GoalScheduleInput;
  clientToken?: string;
}
export interface UpdateGoalResponse {
  goal: Goal;
}
export interface UpdateOperatorAppIdpConfigInput {
  agentSpaceId: string;
  idpClientSecret?: string | redacted.Redacted<string>;
}
export interface UpdateOperatorAppIdpConfigOutput {
  agentSpaceId: string;
  idp: IdpAuthConfiguration;
}
export interface UpdatePrivateConnectionCertificateInput {
  name: string;
  certificate: string;
}
export interface UpdatePrivateConnectionCertificateOutput {
  name: string;
  type: PrivateConnectionType;
  resourceGatewayId?: string;
  hostAddress?: string;
  vpcId?: string;
  resourceConfigurationId?: string;
  status: PrivateConnectionStatus;
  certificateExpiryTime?: Date;
  dnsResolution?: ResourceConfigDnsResolution;
  failureMessage?: string;
}
export interface UpdateRecommendationRequest {
  agentSpaceId: string;
  recommendationId: string;
  status?: RecommendationStatus;
  additionalContext?: string;
  clientToken?: string;
}
export interface UpdateRecommendationResponse {
  recommendation: Recommendation;
}
export interface UpdateTriggerRequest {
  agentSpaceId: string;
  triggerId: string;
  status?: string;
  clientToken?: string;
}
export interface UpdateTriggerResponse {
  trigger: Trigger;
}
export interface ValidateAwsAssociationsInput {
  agentSpaceId: string;
}
export interface ValidateAwsAssociationsOutput {}
export interface ValidationExceptionField {
  path: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type AssociateServiceError =
  | ConflictException
  | InternalServerException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds a specific service association to an AgentSpace. It overwrites the existing association of the same service. Returns 201 Created on success.
 */
export const associateService: API.OperationMethod<
  AssociateServiceInput,
  AssociateServiceOutput,
  AssociateServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/agentspaces/{agentSpaceId}/associations",
    input: {
      agentSpaceId: 0,
      serviceId: 0,
      configuration: i_ServiceConfiguration,
      capabilities: D.map(i_CapabilityConfiguration),
    },
    output: { association: o_Association, webhook: o_GenericWebhook },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateService",
  endpointHostPrefix: "cp.",
})) as any;

export type CreateAgentSpaceError =
  | ConflictException
  | InternalServerException
  | InvalidParameterException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new AgentSpace with the specified name and description. Duplicate space names are allowed.
 */
export const createAgentSpace: API.OperationMethod<
  CreateAgentSpaceInput,
  CreateAgentSpaceOutput,
  CreateAgentSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/agentspaces",
    input: {
      name: 0,
      description: 0,
      locale: 0,
      kmsKeyArn: 0,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
      preferences: 0,
    },
    output: { agentSpace: o_AgentSpace },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    InvalidParameterException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAgentSpace",
  endpointHostPrefix: "cp.",
})) as any;

export type CreateAssetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new asset in the specified agent space
 */
export const createAsset: API.OperationMethod<
  CreateAssetRequest,
  CreateAssetResponse,
  CreateAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /asset/agent-space/{agentSpaceId}/assets",
    input: {
      agentSpaceId: 0,
      assetType: 0,
      metadata: 0,
      content: i_AssetContent,
      clientToken: D.m({ idempotency: true }),
    },
    output: { asset: o_Asset },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAsset",
  endpointHostPrefix: "dp.",
})) as any;

export type CreateAssetFileError =
  | AccessDeniedException
  | ConflictException
  | ContentSizeExceededException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a file in an asset
 */
export const createAssetFile: API.OperationMethod<
  CreateAssetFileRequest,
  CreateAssetFileResponse,
  CreateAssetFileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /asset/agent-space/{agentSpaceId}/assets/{assetId}/files/{path+}",
    input: {
      agentSpaceId: 0,
      assetId: 0,
      path: 0,
      content: i_AssetFileBody,
      metadata: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { file: o_AssetFile },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ContentSizeExceededException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAssetFile",
  endpointHostPrefix: "dp.",
})) as any;

export type CreateBacklogTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new backlog task in the specified agent space
 */
export const createBacklogTask: API.OperationMethod<
  CreateBacklogTaskRequest,
  CreateBacklogTaskResponse,
  CreateBacklogTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /backlog/agent-space/{agentSpaceId}/tasks",
    input: {
      agentSpaceId: 0,
      reference: {
        system: 0,
        title: 0,
        referenceId: 0,
        referenceUrl: 0,
        associationId: 0,
      },
      taskType: 0,
      title: 0,
      description: 0,
      priority: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { task: o_Task },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBacklogTask",
  endpointHostPrefix: "dp.",
})) as any;

export type CreateChatError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new chat execution in the specified agent space
 */
export const createChat: API.OperationMethod<
  CreateChatRequest,
  CreateChatResponse,
  CreateChatError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /agents/agent-space/{agentSpaceId}/chat/create",
    input: {
      agentSpaceId: 0,
      userId: D.m({ query: "userId" }),
      userType: D.m({ query: "userType" }),
    },
    output: { createdAt: D.ts },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateChat",
  endpointHostPrefix: "dp.",
})) as any;

export type CreatePrivateConnectionError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a Private Connection to a target resource.
 */
export const createPrivateConnection: API.OperationMethod<
  CreatePrivateConnectionInput,
  CreatePrivateConnectionOutput,
  CreatePrivateConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/private-connections",
    input: {
      name: 0,
      mode: {
        serviceManaged: {
          hostAddress: 0,
          vpcId: 0,
          subnetIds: 0,
          securityGroupIds: 0,
          ipAddressType: 0,
          ipv4AddressesPerEni: 0,
          portRanges: 0,
          certificate: 0,
          dnsResolution: 0,
        },
        selfManaged: { resourceConfigurationId: 0, certificate: 0 },
      },
      tags: 0,
    },
    output: { certificateExpiryTime: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePrivateConnection",
  endpointHostPrefix: "cp.",
})) as any;

export type CreateTriggerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Trigger in the specified agent space
 */
export const createTrigger: API.OperationMethod<
  CreateTriggerRequest,
  CreateTriggerResponse,
  CreateTriggerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /trigger/agent-space/{agentSpaceId}/triggers",
    input: {
      agentSpaceId: 0,
      type: 0,
      condition: { schedule: { expression: 0 } },
      action: 0,
      status: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { trigger: o_Trigger },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTrigger",
  endpointHostPrefix: "dp.",
})) as any;

export type DeleteAgentSpaceError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an AgentSpace. This operation is idempotent and returns a 204 No Content response on success.
 */
export const deleteAgentSpace: API.OperationMethod<
  DeleteAgentSpaceInput,
  DeleteAgentSpaceOutput,
  DeleteAgentSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/agentspaces/{agentSpaceId}",
    input: { agentSpaceId: 0 },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAgentSpace",
  endpointHostPrefix: "cp.",
})) as any;

export type DeleteAssetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an asset and all its files from the specified agent space
 */
export const deleteAsset: API.OperationMethod<
  DeleteAssetRequest,
  DeleteAssetResponse,
  DeleteAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /asset/agent-space/{agentSpaceId}/assets/{assetId}",
    input: { agentSpaceId: 0, assetId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAsset",
  endpointHostPrefix: "dp.",
})) as any;

export type DeleteAssetFileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a file from an asset
 */
export const deleteAssetFile: API.OperationMethod<
  DeleteAssetFileRequest,
  DeleteAssetFileResponse,
  DeleteAssetFileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /asset/agent-space/{agentSpaceId}/assets/{assetId}/files/{path+}",
    input: { agentSpaceId: 0, assetId: 0, path: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAssetFile",
  endpointHostPrefix: "dp.",
})) as any;

export type DeletePrivateConnectionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a Private Connection. The deletion is asynchronous and returns DELETE_IN_PROGRESS status.
 */
export const deletePrivateConnection: API.OperationMethod<
  DeletePrivateConnectionInput,
  DeletePrivateConnectionOutput,
  DeletePrivateConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/private-connections/{name}",
    input: { name: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePrivateConnection",
  endpointHostPrefix: "cp.",
})) as any;

export type DeleteTriggerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a Trigger from the specified agent space
 */
export const deleteTrigger: API.OperationMethod<
  DeleteTriggerRequest,
  DeleteTriggerResponse,
  DeleteTriggerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /trigger/agent-space/{agentSpaceId}/triggers/{triggerId}",
    input: { agentSpaceId: 0, triggerId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTrigger",
  endpointHostPrefix: "dp.",
})) as any;

export type DeregisterServiceError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deregister a service
 */
export const deregisterService: API.OperationMethod<
  DeregisterServiceInput,
  DeregisterServiceOutput,
  DeregisterServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/services/{serviceId}",
    input: { serviceId: 0 },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterService",
  endpointHostPrefix: "cp.",
})) as any;

export type DescribePrivateConnectionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details of an existing Private Connection.
 */
export const describePrivateConnection: API.OperationMethod<
  DescribePrivateConnectionInput,
  DescribePrivateConnectionOutput,
  DescribePrivateConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/private-connections/{name}",
    input: { name: 0 },
    output: { certificateExpiryTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePrivateConnection",
  endpointHostPrefix: "cp.",
})) as any;

export type DisableOperatorAppError =
  | IdentityCenterServiceException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disable the Operator App for the specified AgentSpace
 */
export const disableOperatorApp: API.OperationMethod<
  DisableOperatorAppInput,
  DisableOperatorAppResponse,
  DisableOperatorAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/agentspaces/{agentSpaceId}/operator",
    input: {
      agentSpaceId: 0,
      authFlow: D.m({ header: "x-amzn-app-auth-flow" }),
    },
  },
  errors: [
    IdentityCenterServiceException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableOperatorApp",
  endpointHostPrefix: "cp.",
})) as any;

export type DisassociateServiceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a specific service association from an AgentSpace. This operation is idempotent and returns a 204 No Content response on success.
 */
export const disassociateService: API.OperationMethod<
  DisassociateServiceInput,
  DisassociateServiceOutput,
  DisassociateServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/agentspaces/{agentSpaceId}/associations/{associationId}",
    input: { agentSpaceId: 0, associationId: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateService",
  endpointHostPrefix: "cp.",
})) as any;

export type EnableOperatorAppError =
  | IdentityCenterServiceException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enable the Operator App to access the given AgentSpace
 */
export const enableOperatorApp: API.OperationMethod<
  EnableOperatorAppInput,
  EnableOperatorAppOutput,
  EnableOperatorAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/agentspaces/{agentSpaceId}/operator",
    input: {
      agentSpaceId: 0,
      authFlow: 0,
      operatorAppRoleArn: 0,
      idcInstanceArn: 0,
      issuerUrl: 0,
      idpClientId: 0,
      idpClientSecret: 0,
      provider: 0,
    },
    output: {
      iam: o_IamAuthConfiguration,
      idc: o_IdcAuthConfiguration,
      idp: o_IdpAuthConfiguration,
    },
    body: true,
  },
  errors: [
    IdentityCenterServiceException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableOperatorApp",
  endpointHostPrefix: "cp.",
})) as any;

export type GetAccountUsageError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves monthly account usage metrics and limits for the AWS account.
 */
export const getAccountUsage: API.OperationMethod<
  GetAccountUsageInput,
  GetAccountUsageOutput,
  GetAccountUsageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /usage/account",
    input: {},
    output: { usagePeriodStartTime: D.ts, usagePeriodEndTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountUsage",
  endpointHostPrefix: "dp.",
})) as any;

export type GetAgentSpaceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific AgentSpace.
 */
export const getAgentSpace: API.OperationMethod<
  GetAgentSpaceInput,
  GetAgentSpaceOutput,
  GetAgentSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/agentspaces/{agentSpaceId}",
    input: { agentSpaceId: 0 },
    output: { agentSpace: o_AgentSpace },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgentSpace",
  endpointHostPrefix: "cp.",
})) as any;

export type GetAssetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets an asset from the specified agent space
 */
export const getAsset: API.OperationMethod<
  GetAssetRequest,
  GetAssetResponse,
  GetAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /asset/agent-space/{agentSpaceId}/assets/{assetId}",
    input: {
      agentSpaceId: 0,
      assetId: 0,
      assetVersion: D.m({ query: "assetVersion" }),
    },
    output: { asset: o_Asset },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAsset",
  endpointHostPrefix: "dp.",
})) as any;

export type GetAssetContentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets an asset's content as a zip bundle
 */
export const getAssetContent: API.OperationMethod<
  GetAssetContentRequest,
  GetAssetContentResponse,
  GetAssetContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /asset/agent-space/{agentSpaceId}/assets/{assetId}/content",
    input: {
      agentSpaceId: 0,
      assetId: 0,
      assetVersion: D.m({ query: "assetVersion" }),
    },
    output: { content: { zipFile: D.blob } },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssetContent",
  endpointHostPrefix: "dp.",
})) as any;

export type GetAssetFileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a file from an asset
 */
export const getAssetFile: API.OperationMethod<
  GetAssetFileRequest,
  GetAssetFileResponse,
  GetAssetFileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /asset/agent-space/{agentSpaceId}/assets/{assetId}/files/{path+}",
    input: {
      agentSpaceId: 0,
      assetId: 0,
      path: 0,
      assetVersion: D.m({ query: "assetVersion" }),
    },
    output: { file: o_AssetFile },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssetFile",
  endpointHostPrefix: "dp.",
})) as any;

export type GetAssociationError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves given associations configured for a specific AgentSpace.
 */
export const getAssociation: API.OperationMethod<
  GetAssociationInput,
  GetAssociationOutput,
  GetAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/agentspaces/{agentSpaceId}/associations/{associationId}",
    input: { agentSpaceId: 0, associationId: 0 },
    output: { association: o_Association },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssociation",
  endpointHostPrefix: "cp.",
})) as any;

export type GetBacklogTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a backlog task for the specified agent space and task id
 */
export const getBacklogTask: API.OperationMethod<
  GetBacklogTaskRequest,
  GetBacklogTaskResponse,
  GetBacklogTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /backlog/agent-space/{agentSpaceId}/tasks/{taskId}",
    input: { agentSpaceId: 0, taskId: 0 },
    output: { task: o_Task },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBacklogTask",
  endpointHostPrefix: "dp.",
})) as any;

export type GetOperatorAppError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the full auth configuration of operator including any enabled auth flow
 */
export const getOperatorApp: API.OperationMethod<
  GetOperatorAppInput,
  GetOperatorAppOutput,
  GetOperatorAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/agentspaces/{agentSpaceId}/operator",
    input: { agentSpaceId: 0 },
    output: {
      iam: o_IamAuthConfiguration,
      idc: o_IdcAuthConfiguration,
      idp: o_IdpAuthConfiguration,
    },
  },
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOperatorApp",
  endpointHostPrefix: "cp.",
})) as any;

export type GetRecommendationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a specific recommendation by its ID
 */
export const getRecommendation: API.OperationMethod<
  GetRecommendationRequest,
  GetRecommendationResponse,
  GetRecommendationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /backlog/agent-space/{agentSpaceId}/recommendations/{recommendationId}",
    input: {
      agentSpaceId: 0,
      recommendationId: 0,
      recommendationVersion: D.m({ query: "recommendationVersion" }),
    },
    output: { recommendation: o_Recommendation },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecommendation",
  endpointHostPrefix: "dp.",
})) as any;

export type GetServiceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves given service by it's unique identifier
 */
export const getService: API.OperationMethod<
  GetServiceInput,
  GetServiceOutput,
  GetServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/services/{serviceId}",
    input: { serviceId: 0 },
    output: { service: o_RegisteredService },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetService",
  endpointHostPrefix: "cp.",
})) as any;

export type GetTriggerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a Trigger from the specified agent space
 */
export const getTrigger: API.OperationMethod<
  GetTriggerRequest,
  GetTriggerResponse,
  GetTriggerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /trigger/agent-space/{agentSpaceId}/triggers/{triggerId}",
    input: { agentSpaceId: 0, triggerId: 0 },
    output: { trigger: o_Trigger },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrigger",
  endpointHostPrefix: "dp.",
})) as any;

export type ListAgentSpacesError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all AgentSpaces with optional pagination.
 */
export const listAgentSpaces: API.PaginatedOperationMethod<
  ListAgentSpacesInput,
  ListAgentSpacesOutput,
  ListAgentSpacesError,
  Credentials | HttpClient.HttpClient,
  AgentSpace
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/agentspaces/list",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { agentSpaces: D.list(o_AgentSpace) },
  },
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgentSpaces",
  endpointHostPrefix: "cp.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "agentSpaces",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssetFilesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists files in an asset
 */
export const listAssetFiles: API.PaginatedOperationMethod<
  ListAssetFilesRequest,
  ListAssetFilesResponse,
  ListAssetFilesError,
  Credentials | HttpClient.HttpClient,
  AssetFileSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /asset/agent-space/{agentSpaceId}/assets/{assetId}/files",
    input: {
      agentSpaceId: 0,
      assetId: 0,
      assetVersion: D.m({ query: "assetVersion" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { items: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssetFiles",
  endpointHostPrefix: "dp.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssetsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists assets in the specified agent space
 */
export const listAssets: API.PaginatedOperationMethod<
  ListAssetsRequest,
  ListAssetsResponse,
  ListAssetsError,
  Credentials | HttpClient.HttpClient,
  Asset
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /asset/agent-space/{agentSpaceId}/assets",
    input: {
      agentSpaceId: 0,
      assetType: D.m({ query: "assetType" }),
      updatedAfter: D.m({
        query: "updatedAfter",
        shape: D.tsAs("epoch-seconds"),
      }),
      updatedBefore: D.m({
        query: "updatedBefore",
        shape: D.tsAs("epoch-seconds"),
      }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { items: D.list(o_Asset) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssets",
  endpointHostPrefix: "dp.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssetTypesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the supported asset types
 */
export const listAssetTypes: API.PaginatedOperationMethod<
  ListAssetTypesRequest,
  ListAssetTypesResponse,
  ListAssetTypesError,
  Credentials | HttpClient.HttpClient,
  AssetTypeSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /asset/types",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssetTypes",
  endpointHostPrefix: "dp.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssetVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists versions of an asset in the specified agent space
 */
export const listAssetVersions: API.PaginatedOperationMethod<
  ListAssetVersionsRequest,
  ListAssetVersionsResponse,
  ListAssetVersionsError,
  Credentials | HttpClient.HttpClient,
  AssetVersionMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /asset/agent-space/{agentSpaceId}/assets/{assetId}/versions",
    input: {
      agentSpaceId: 0,
      assetId: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { items: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssetVersions",
  endpointHostPrefix: "dp.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssociationsError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all associations for given AgentSpace
 */
export const listAssociations: API.PaginatedOperationMethod<
  ListAssociationsInput,
  ListAssociationsOutput,
  ListAssociationsError,
  Credentials | HttpClient.HttpClient,
  Association
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/agentspaces/{agentSpaceId}/associations/list",
    input: {
      agentSpaceId: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      filterServiceTypes: D.m({ query: "filterServiceTypes" }),
    },
    output: { associations: D.list(o_Association) },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssociations",
  endpointHostPrefix: "cp.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "associations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBacklogTasksError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists backlog tasks in the specified agent space with optional filtering and sorting
 */
export const listBacklogTasks: API.PaginatedOperationMethod<
  ListBacklogTasksRequest,
  ListBacklogTasksResponse,
  ListBacklogTasksError,
  Credentials | HttpClient.HttpClient,
  Task
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /backlog/agent-space/{agentSpaceId}/tasks/list",
    input: {
      agentSpaceId: 0,
      filter: {
        createdAfter: D.tsAs("date-time"),
        createdBefore: D.tsAs("date-time"),
        priority: 0,
        status: 0,
        taskType: 0,
        primaryTaskId: 0,
      },
      limit: 0,
      nextToken: 0,
      sortField: 0,
      order: 0,
    },
    output: { tasks: D.list(o_Task) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBacklogTasks",
  endpointHostPrefix: "dp.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tasks",
    pageSize: "limit",
  } as const,
})) as any;

export type ListChatsError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a paginated list of the user's recent chat executions
 */
export const listChats: API.OperationMethod<
  ListChatsRequest,
  ListChatsResponse,
  ListChatsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /agents/agent-space/{agentSpaceId}/chat/list",
    input: {
      agentSpaceId: 0,
      userId: D.m({ query: "userId" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { executions: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListChats",
  endpointHostPrefix: "dp.",
})) as any;

export type ListExecutionsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List executions
 */
export const listExecutions: API.PaginatedOperationMethod<
  ListExecutionsRequest,
  ListExecutionsResponse,
  ListExecutionsError,
  Credentials | HttpClient.HttpClient,
  Execution
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /journal/agent-space/{agentSpaceId}/executions",
    input: { agentSpaceId: 0, taskId: 0, limit: 0, nextToken: 0 },
    output: { executions: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExecutions",
  endpointHostPrefix: "dp.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "executions",
    pageSize: "limit",
  } as const,
})) as any;

export type ListGoalsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists goals in the specified agent space with optional filtering
 */
export const listGoals: API.PaginatedOperationMethod<
  ListGoalsRequest,
  ListGoalsResponse,
  ListGoalsError,
  Credentials | HttpClient.HttpClient,
  Goal
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /backlog/agent-space/{agentSpaceId}/goals/list",
    input: { agentSpaceId: 0, status: 0, goalType: 0, limit: 0, nextToken: 0 },
    output: { goals: D.list(o_Goal) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGoals",
  endpointHostPrefix: "dp.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "goals",
    pageSize: "limit",
  } as const,
})) as any;

export type ListJournalRecordsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List journal records for a specific execution
 */
export const listJournalRecords: API.PaginatedOperationMethod<
  ListJournalRecordsRequest,
  ListJournalRecordsResponse,
  ListJournalRecordsError,
  Credentials | HttpClient.HttpClient,
  JournalRecord
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /journal/agent-space/{agentSpaceId}/journalRecords",
    input: {
      agentSpaceId: 0,
      executionId: 0,
      limit: 0,
      nextToken: 0,
      recordType: 0,
      order: 0,
    },
    output: { records: D.list({ createdAt: D.ts }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJournalRecords",
  endpointHostPrefix: "dp.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "records",
    pageSize: "limit",
  } as const,
})) as any;

export type ListPendingMessagesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List pending messages for a specific execution.
 */
export const listPendingMessages: API.OperationMethod<
  ListPendingMessagesRequest,
  ListPendingMessagesResponse,
  ListPendingMessagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /agents/agent-space/{agentSpaceId}/pendingMessages",
    input: { agentSpaceId: 0, executionId: 0 },
    output: { createdAt: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPendingMessages",
  endpointHostPrefix: "dp.",
})) as any;

export type ListPrivateConnectionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all Private Connections in the caller's account.
 */
export const listPrivateConnections: API.OperationMethod<
  ListPrivateConnectionsInput,
  ListPrivateConnectionsOutput,
  ListPrivateConnectionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/private-connections",
    input: {},
    output: { privateConnections: D.list({ certificateExpiryTime: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPrivateConnections",
  endpointHostPrefix: "cp.",
})) as any;

export type ListRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists recommendations for the specified agent space
 */
export const listRecommendations: API.OperationMethod<
  ListRecommendationsRequest,
  ListRecommendationsResponse,
  ListRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /backlog/agent-space/{agentSpaceId}/recommendations/list",
    input: {
      agentSpaceId: 0,
      taskId: 0,
      goalId: 0,
      status: 0,
      priority: 0,
      limit: 0,
      nextToken: 0,
    },
    output: { recommendations: D.list(o_Recommendation) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecommendations",
  endpointHostPrefix: "dp.",
})) as any;

export type ListServicesError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List a list of registered service on the account level.
 */
export const listServices: API.PaginatedOperationMethod<
  ListServicesInput,
  ListServicesOutput,
  ListServicesError,
  Credentials | HttpClient.HttpClient,
  RegisteredService
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/services/list",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      filterServiceType: D.m({ query: "filterServiceType" }),
    },
    output: { services: D.list(o_RegisteredService) },
  },
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServices",
  endpointHostPrefix: "cp.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "services",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists tags for the specified AWS DevOps Agent resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  endpointHostPrefix: "cp.",
})) as any;

export type ListTriggersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists Triggers in the specified agent space
 */
export const listTriggers: API.PaginatedOperationMethod<
  ListTriggersRequest,
  ListTriggersResponse,
  ListTriggersError,
  Credentials | HttpClient.HttpClient,
  Trigger
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /trigger/agent-space/{agentSpaceId}/triggers",
    input: {
      agentSpaceId: 0,
      status: D.m({ query: "status" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { items: D.list(o_Trigger) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTriggers",
  endpointHostPrefix: "dp.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWebhooksError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all webhooks for given Association
 */
export const listWebhooks: API.OperationMethod<
  ListWebhooksInput,
  ListWebhooksOutput,
  ListWebhooksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/agentspaces/{agentSpaceId}/associations/{associationId}/webhooks/list",
    input: { agentSpaceId: 0, associationId: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWebhooks",
  endpointHostPrefix: "cp.",
})) as any;

export type RegisterServiceError =
  | InternalServerException
  | InvalidParameterException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * This operation registers the specified service
 */
export const registerService: API.OperationMethod<
  RegisterServiceInput,
  RegisterServiceOutput,
  RegisterServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/register/{service}",
    input: {
      service: 0,
      serviceDetails: {
        dynatrace: {
          accountUrn: 0,
          authorizationConfig: {
            oAuthClientCredentials: {
              clientName: 0,
              clientId: 0,
              exchangeParameters: 0,
              clientSecret: 0,
            },
          },
        },
        servicenow: {
          instanceUrl: 0,
          authorizationConfig: {
            oAuthClientCredentials: {
              clientName: 0,
              clientId: 0,
              exchangeParameters: 0,
              clientSecret: 0,
            },
          },
        },
        mcpserverdatadog: {
          name: 0,
          endpoint: 0,
          description: 0,
          authorizationConfig: {
            authorizationDiscovery: i_MCPServerAuthorizationDiscoveryConfig,
          },
        },
        mcpserver: i_MCPServerDetails,
        gitlab: { targetUrl: 0, tokenType: 0, tokenValue: 0, groupId: 0 },
        mcpserversplunk: i_MCPServerDetails,
        mcpservernewrelic: {
          authorizationConfig: {
            apiKey: {
              apiKey: 0,
              accountId: 0,
              region: 0,
              applicationIds: 0,
              entityGuids: 0,
              alertPolicyIds: 0,
            },
          },
        },
        eventChannel: { type: 0 },
        mcpservergrafana: {
          name: 0,
          endpoint: 0,
          description: 0,
          authorizationConfig: i_MCPServerAuthorizationConfig,
        },
        pagerduty: {
          scopes: 0,
          authorizationConfig: {
            oAuthClientCredentials: {
              clientName: 0,
              clientId: 0,
              exchangeParameters: 0,
              clientSecret: 0,
            },
          },
        },
        azureidentity: {
          tenantId: 0,
          clientId: 0,
          webIdentityRoleArn: 0,
          webIdentityTokenAudiences: 0,
        },
        mcpserversigv4: {
          name: 0,
          endpoint: 0,
          description: 0,
          authorizationConfig: {
            region: 0,
            service: 0,
            roleArn: 0,
            mcpRoleArn: 0,
            customHeaders: 0,
          },
        },
        remoteagent: {
          name: 0,
          endpoint: 0,
          description: 0,
          authorizationConfig: {
            apiKey: { apiKeyName: 0, apiKeyValue: 0, apiKeyHeader: 0 },
            oAuthClientCredentials: {
              clientName: 0,
              clientId: 0,
              exchangeParameters: 0,
              clientSecret: 0,
              exchangeUrl: 0,
              scopes: 0,
            },
            bearerToken: {
              tokenName: 0,
              tokenValue: 0,
              authorizationHeader: 0,
            },
          },
        },
        remoteagentsigv4: {
          name: 0,
          endpoint: 0,
          description: 0,
          authorizationConfig: { region: 0, service: 0, roleArn: 0 },
        },
      },
      kmsKeyArn: 0,
      privateConnectionName: 0,
      targetUrlPrivateConnectionName: 0,
      exchangeUrlPrivateConnectionName: 0,
      name: 0,
      tags: 0,
    },
    body: true,
  },
  errors: [
    InternalServerException,
    InvalidParameterException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterService",
  endpointHostPrefix: "cp.",
})) as any;

export type SendMessageError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends a chat message and streams the response for the specified agent space execution
 */
export const sendMessage: API.OperationMethod<
  SendMessageRequest,
  SendMessageResponse,
  SendMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /agents/agent-space/{agentSpaceId}/chat/sendMessage",
    input: {
      agentSpaceId: 0,
      executionId: 0,
      content: 0,
      context: {
        currentPage: 0,
        lastMessage: 0,
        userActionResponse: 0,
        approvalAction: {
          toolUseId: 0,
          interruptId: 0,
          approvalId: 0,
          buttonText: 0,
          action: 0,
        },
      },
      userId: 0,
      assetIds: 0,
      modelTier: 0,
    },
    output: {
      events: D.m({
        payload: true,
        shape: D.events({
          responseCreated: 0,
          responseInProgress: 0,
          responseCompleted: 0,
          responseFailed: 0,
          summary: 0,
          heartbeat: 0,
          contentBlockStart: 0,
          contentBlockDelta: 0,
          contentBlockStop: 0,
        }),
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendMessage",
  endpointHostPrefix: "dp.",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Adds or overwrites tags for the specified AWS DevOps Agent resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  endpointHostPrefix: "cp.",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from the specified AWS DevOps Agent resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  endpointHostPrefix: "cp.",
})) as any;

export type UpdateAgentSpaceError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the information of an existing AgentSpace.
 */
export const updateAgentSpace: API.OperationMethod<
  UpdateAgentSpaceInput,
  UpdateAgentSpaceOutput,
  UpdateAgentSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /v1/agentspaces/{agentSpaceId}",
    input: {
      agentSpaceId: 0,
      name: 0,
      description: 0,
      locale: 0,
      preferences: 0,
    },
    output: { agentSpace: o_AgentSpace },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAgentSpace",
  endpointHostPrefix: "cp.",
})) as any;

export type UpdateApprovalActionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an approval request with the terminal decision (APPROVED or REJECTED). A single operation handles both verbs via the action enum.
 */
export const updateApprovalAction: API.OperationMethod<
  UpdateApprovalActionRequest,
  UpdateApprovalActionResponse,
  UpdateApprovalActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /agents/agent-space/{agentSpaceId}/approvals/{approvalId}/update-action",
    input: {
      agentSpaceId: 0,
      approvalId: 0,
      action: 0,
      finalPattern: { tool: 0, argumentPins: 0 },
      reason: 0,
      ttlSeconds: 0,
      singleUse: 0,
    },
    output: { expiresAt: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApprovalAction",
  endpointHostPrefix: "dp.",
})) as any;

export type UpdateAssetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an asset in the specified agent space
 */
export const updateAsset: API.OperationMethod<
  UpdateAssetRequest,
  UpdateAssetResponse,
  UpdateAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /asset/agent-space/{agentSpaceId}/assets/{assetId}",
    input: {
      agentSpaceId: 0,
      assetId: 0,
      metadata: 0,
      content: i_AssetContent,
      clientToken: D.m({ idempotency: true }),
    },
    output: { asset: o_Asset },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAsset",
  endpointHostPrefix: "dp.",
})) as any;

export type UpdateAssetFileError =
  | AccessDeniedException
  | ConflictException
  | ContentSizeExceededException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a file in an asset
 */
export const updateAssetFile: API.OperationMethod<
  UpdateAssetFileRequest,
  UpdateAssetFileResponse,
  UpdateAssetFileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /asset/agent-space/{agentSpaceId}/assets/{assetId}/files/{path+}",
    input: {
      agentSpaceId: 0,
      assetId: 0,
      path: 0,
      content: i_AssetFileBody,
      metadata: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { file: o_AssetFile },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ContentSizeExceededException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAssetFile",
  endpointHostPrefix: "dp.",
})) as any;

export type UpdateAssociationError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Partially updates the configuration of an existing service association for an AgentSpace. Present fields are fully replaced; absent fields are left unchanged. Returns 200 OK on success.
 */
export const updateAssociation: API.OperationMethod<
  UpdateAssociationInput,
  UpdateAssociationOutput,
  UpdateAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /v1/agentspaces/{agentSpaceId}/associations/{associationId}",
    input: {
      agentSpaceId: 0,
      associationId: 0,
      configuration: i_ServiceConfiguration,
      capabilities: D.map(i_CapabilityConfiguration),
    },
    output: { association: o_Association, webhook: o_GenericWebhook },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAssociation",
  endpointHostPrefix: "cp.",
})) as any;

export type UpdateBacklogTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update an existing backlog task.
 */
export const updateBacklogTask: API.OperationMethod<
  UpdateBacklogTaskRequest,
  UpdateBacklogTaskResponse,
  UpdateBacklogTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /backlog/agent-space/{agentSpaceId}/tasks/{taskId}",
    input: {
      agentSpaceId: 0,
      taskId: 0,
      taskStatus: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { task: o_Task },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBacklogTask",
  endpointHostPrefix: "dp.",
})) as any;

export type UpdateGoalError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update an existing goal
 */
export const updateGoal: API.OperationMethod<
  UpdateGoalRequest,
  UpdateGoalResponse,
  UpdateGoalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /backlog/agent-space/{agentSpaceId}/goals/{goalId}",
    input: {
      agentSpaceId: 0,
      goalId: 0,
      evaluationSchedule: { state: 0 },
      clientToken: D.m({ idempotency: true }),
    },
    output: { goal: o_Goal },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGoal",
  endpointHostPrefix: "dp.",
})) as any;

export type UpdateOperatorAppIdpConfigError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the external Identity Provider configuration for the Operator App
 */
export const updateOperatorAppIdpConfig: API.OperationMethod<
  UpdateOperatorAppIdpConfigInput,
  UpdateOperatorAppIdpConfigOutput,
  UpdateOperatorAppIdpConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /v1/agentspaces/{agentSpaceId}/operator/idp",
    input: { agentSpaceId: 0, idpClientSecret: 0 },
    output: { idp: o_IdpAuthConfiguration },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateOperatorAppIdpConfig",
  endpointHostPrefix: "cp.",
})) as any;

export type UpdatePrivateConnectionCertificateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the certificate associated with a Private Connection.
 */
export const updatePrivateConnectionCertificate: API.OperationMethod<
  UpdatePrivateConnectionCertificateInput,
  UpdatePrivateConnectionCertificateOutput,
  UpdatePrivateConnectionCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/private-connections/{name}/certificate",
    input: { name: 0, certificate: 0 },
    output: { certificateExpiryTime: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePrivateConnectionCertificate",
  endpointHostPrefix: "cp.",
})) as any;

export type UpdateRecommendationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing recommendation with new content, status, or metadata
 */
export const updateRecommendation: API.OperationMethod<
  UpdateRecommendationRequest,
  UpdateRecommendationResponse,
  UpdateRecommendationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /backlog/agent-space/{agentSpaceId}/recommendations/{recommendationId}",
    input: {
      agentSpaceId: 0,
      recommendationId: 0,
      status: 0,
      additionalContext: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { recommendation: o_Recommendation },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRecommendation",
  endpointHostPrefix: "dp.",
})) as any;

export type UpdateTriggerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the status of an existing Trigger
 */
export const updateTrigger: API.OperationMethod<
  UpdateTriggerRequest,
  UpdateTriggerResponse,
  UpdateTriggerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /trigger/agent-space/{agentSpaceId}/triggers/{triggerId}",
    input: {
      agentSpaceId: 0,
      triggerId: 0,
      status: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { trigger: o_Trigger },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTrigger",
  endpointHostPrefix: "dp.",
})) as any;

export type ValidateAwsAssociationsError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Validates an aws association and set status and returns a 204 No Content response on success.
 */
export const validateAwsAssociations: API.OperationMethod<
  ValidateAwsAssociationsInput,
  ValidateAwsAssociationsOutput,
  ValidateAwsAssociationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/agentspaces/{agentSpaceId}/associations/validate",
    input: { agentSpaceId: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ValidateAwsAssociations",
  endpointHostPrefix: "cp.",
})) as any;

const i_AssetContent: D.LazyStruct = () => ({
  file: { path: 0, body: i_AssetFileBody, metadata: 0 },
  zip: { zipFile: 0 },
  sourceUrl: { url: 0 },
});
const i_AssetFileBody: D.LazyStruct = () => ({ bytes: 0, text: 0 });
const i_CapabilityConfiguration: D.LazyStruct = () => ({
  enabled: 0,
  triggerFilterGroups: D.list({ events: 0, targetBranches: { patterns: 0 } }),
});
const i_MCPServerAuthorizationConfig: D.LazyStruct = () => ({
  oAuthClientCredentials: {
    clientName: 0,
    clientId: 0,
    exchangeParameters: 0,
    clientSecret: 0,
    exchangeUrl: 0,
    scopes: 0,
  },
  oAuth3LO: {
    clientName: 0,
    clientId: 0,
    exchangeParameters: 0,
    returnToEndpoint: 0,
    authorizationUrl: 0,
    exchangeUrl: 0,
    clientSecret: 0,
    supportCodeChallenge: 0,
    scopes: 0,
  },
  apiKey: { apiKeyName: 0, apiKeyValue: 0, apiKeyHeader: 0 },
  bearerToken: { tokenName: 0, tokenValue: 0, authorizationHeader: 0 },
  authorizationDiscovery: i_MCPServerAuthorizationDiscoveryConfig,
});
const i_MCPServerAuthorizationDiscoveryConfig: D.LazyStruct = () => ({
  returnToEndpoint: 0,
});
const i_MCPServerDetails: D.LazyStruct = () => ({
  name: 0,
  endpoint: 0,
  description: 0,
  authorizationConfig: i_MCPServerAuthorizationConfig,
});
const i_ServiceConfiguration: D.LazyStruct = () => ({
  sourceAws: {
    accountId: 0,
    accountType: 0,
    assumableRoleArn: 0,
    externalId: 0,
    agentElevatedRoleArn: 0,
    agentElevatedRoleArnStatus: 0,
  },
  aws: {
    assumableRoleArn: 0,
    accountId: 0,
    accountType: 0,
    agentElevatedRoleArn: 0,
    agentElevatedRoleArnStatus: 0,
  },
  github: {
    repoName: 0,
    repoId: 0,
    owner: 0,
    ownerType: 0,
    instanceIdentifier: 0,
    runtimeRoleArn: 0,
  },
  slack: {
    workspaceId: 0,
    workspaceName: 0,
    transmissionTarget: {
      opsOncallTarget: i_SlackChannel,
      opsSRETarget: i_SlackChannel,
    },
  },
  dynatrace: { envId: 0, resources: 0 },
  servicenow: { instanceId: 0, authScopes: 0 },
  mcpservernewrelic: { accountId: 0, endpoint: 0 },
  mcpserverdatadog: { enabledElevatedTools: D.list(i_MCPToolDetail) },
  mcpserver: { tools: 0, toolDetails: D.list(i_MCPToolDetail) },
  gitlab: {
    projectId: 0,
    projectPath: 0,
    instanceIdentifier: 0,
    runtimeRoleArn: 0,
  },
  mcpserversplunk: {},
  eventChannel: {},
  azure: { subscriptionId: 0 },
  azuredevops: { organizationName: 0, projectId: 0, projectName: 0 },
  mcpservergrafana: {
    endpoint: 0,
    organizationId: 0,
    tools: 0,
    enabledElevatedTools: D.list(i_MCPToolDetail),
  },
  pagerduty: { services: 0, customerEmail: 0 },
  mcpserversigv4: { tools: 0, toolDetails: D.list(i_MCPToolDetail) },
  remoteagent: {},
  remoteagentsigv4: {},
});
const o_AgentSpace: D.LazyStruct = () => ({
  description: D.secret,
  createdAt: D.ts,
  updatedAt: D.ts,
});
const o_Asset: D.LazyStruct = () => ({ createdAt: D.ts, updatedAt: D.ts });
const o_AssetFile: D.LazyStruct = () => ({
  content: { bytes: D.blob },
  createdAt: D.ts,
  updatedAt: D.ts,
});
const o_Association: D.LazyStruct = () => ({
  createdAt: D.ts,
  updatedAt: D.ts,
  configuration: { pagerduty: { customerEmail: D.secret } },
});
const o_GenericWebhook: D.LazyStruct = () => ({
  webhookSecret: D.secret,
  apiKey: D.secret,
});
const o_Goal: D.LazyStruct = () => ({
  createdAt: D.ts,
  updatedAt: D.ts,
  lastEvaluatedAt: D.ts,
});
const o_IamAuthConfiguration: D.LazyStruct = () => ({
  createdAt: D.ts,
  updatedAt: D.ts,
});
const o_IdcAuthConfiguration: D.LazyStruct = () => ({
  createdAt: D.ts,
  updatedAt: D.ts,
});
const o_IdpAuthConfiguration: D.LazyStruct = () => ({
  createdAt: D.ts,
  updatedAt: D.ts,
});
const o_Recommendation: D.LazyStruct = () => ({
  rankedAt: D.ts,
  createdAt: D.ts,
  updatedAt: D.ts,
});
const o_RegisteredService: D.LazyStruct = () => ({
  additionalServiceDetails: {
    mcpserverdatadog: o_RegisteredMCPServerDetails,
    mcpserver: o_RegisteredMCPServerDetails,
    mcpserversplunk: o_RegisteredMCPServerDetails,
    mcpservernewrelic: { description: D.secret },
    mcpserversigv4: { description: D.secret, customHeaders: D.map(D.secret) },
    remoteagent: { description: D.secret },
    remoteagentsigv4: { description: D.secret },
  },
  createdAt: D.ts,
  updatedAt: D.ts,
});
const o_Task: D.LazyStruct = () => ({ createdAt: D.ts, updatedAt: D.ts });
const o_Trigger: D.LazyStruct = () => ({ createdAt: D.ts, updatedAt: D.ts });
const i_MCPToolDetail: D.LazyStruct = () => ({
  name: 0,
  toolClassification: 0,
});
const i_SlackChannel: D.LazyStruct = () => ({ channelName: 0, channelId: 0 });
const o_RegisteredMCPServerDetails: D.LazyStruct = () => ({
  description: D.secret,
});
