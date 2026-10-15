import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import type * as stream from "effect/Stream";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "DevOps Agent",
  serviceShapeName: "DevOpsAgent",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "aidevops" });
const ver = /*@__PURE__*/ T.ServiceVersion("2026-01-01");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
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
        return err("Invalid Configuration: FIPS and custom endpoint are not supported");
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
  '{"url":"https://aidevops.{R}.api.aws","properties":{},"headers":{}}',
  [
    "cn-north-1",
    "cn-northwest-1",
    "aws-cn-global",
    "us-iso-east-1",
    "us-iso-west-1",
    "aws-iso-global",
    "us-isob-east-1",
    "aws-iso-b-global",
    "aws-iso-f-global",
    "us-isof-east-1",
    "us-isof-south-1",
    "eusc-de-east-1",
  ],
);

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ContentSizeExceededException
  extends /*@__PURE__*/ S.TaggedError<ContentSizeExceededException>()(
    "ContentSizeExceededException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(413),
  ).pipe(C.withBadRequestError) {}
export class IdentityCenterServiceException
  extends /*@__PURE__*/ S.TaggedError<IdentityCenterServiceException>()(
    "IdentityCenterServiceException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      underlyingErrorCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()(
    "InvalidParameterException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(429), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()("ValidationException", {
    message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
    fieldList: /*@__PURE__*/ S.optional(
      /*@__PURE__*/ S.suspend(() => __S(2881, __c90, 1)).annotate({
        identifier: "ValidationExceptionFieldList",
      }),
    ),
  }) {}
export type AgentSpaceId = string;
export type ServiceId = string;
export type SourceAccountType = "source" | (string & {});
export type RoleArn = string;
export type ValidationStatus = "valid" | "invalid" | "pending-confirmation" | (string & {});
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
export interface SlackBidirectionalConfiguration {
  roleArn: string;
  enabled?: boolean;
}
export interface SlackConfiguration {
  workspaceId: string;
  workspaceName: string;
  transmissionTarget: SlackTransmissionTarget;
  bidirectional?: SlackBidirectionalConfiguration;
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
export type ToolClassification = "READ_ONLY" | "MUTATIVE" | "DESTRUCTIVE" | (string & {});
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
export type TriggerEvent = "PULL_REQUEST_READY_FOR_REVIEW" | "PULL_REQUEST_DRAFT" | (string & {});
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
export type AssociationCapabilities = { [key in CapabilityType]?: CapabilityConfiguration };
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
export type WebhookType = "hmac" | "apikey" | "gitlab" | "pagerduty" | (string & {});
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
export type AgentSpacePreferences = { [key in AgentSpacePreferenceKey]?: boolean };
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
export type AssetFileBody = { bytes: Uint8Array; text?: never } | { bytes?: never; text: string };
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
export type Priority = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "MINIMAL" | (string & {});
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
export type PrivateConnectionType = "SELF_MANAGED" | "SERVICE_MANAGED" | (string & {});
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
export type CustomHeaders = { [key: string]: string | redacted.Redacted<string> | undefined };
export interface RegisteredMCPServerSigV4Details {
  name: string;
  endpoint: string;
  description?: string | redacted.Redacted<string>;
  region: string;
  service: string;
  roleArn: string;
  mcpRoleArn?: string;
  customHeaders?: { [key: string]: string | redacted.Redacted<string> | undefined };
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
export type ExchangeParameters = { [key: string]: string | redacted.Redacted<string> | undefined };
export type ClientSecret = string | redacted.Redacted<string>;
export interface DynatraceOAuthClientCredentialsConfig {
  clientName?: string;
  clientId: string | redacted.Redacted<string>;
  exchangeParameters?: { [key: string]: string | redacted.Redacted<string> | undefined };
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
  exchangeParameters?: { [key: string]: string | redacted.Redacted<string> | undefined };
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
  exchangeParameters?: { [key: string]: string | redacted.Redacted<string> | undefined };
  clientSecret: string | redacted.Redacted<string>;
  exchangeUrl: string;
  scopes?: string[];
}
export interface MCPServerOAuth3LOConfig {
  clientName?: string;
  clientId: string | redacted.Redacted<string>;
  exchangeParameters?: { [key: string]: string | redacted.Redacted<string> | undefined };
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
export type NewRelicServiceAuthorizationConfig = { apiKey: NewRelicApiKeyConfig };
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
  exchangeParameters?: { [key: string]: string | redacted.Redacted<string> | undefined };
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
  customHeaders?: { [key: string]: string | redacted.Redacted<string> | undefined };
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
  exchangeParameters?: { [key: string]: string | redacted.Redacted<string> | undefined };
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
  | { apiKey: RemoteAgentAPIKeyConfig; oAuthClientCredentials?: never; bearerToken?: never }
  | {
      apiKey?: never;
      oAuthClientCredentials: RemoteAgentOAuthClientCredentialsConfig;
      bearerToken?: never;
    }
  | { apiKey?: never; oAuthClientCredentials?: never; bearerToken: RemoteAgentBearerTokenConfig };
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
export type AdditionalServiceRegistrationStep = { oauth: OAuthAdditionalStepDetails };
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
  input: __S(0, __c0, 0) as any as S.Schema<AssociateServiceInput>,
  output: __S(161, __c5, 1) as any as S.Schema<AssociateServiceOutput>,
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
}));

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
  input: __S(192, __c6, 0) as any as S.Schema<CreateAgentSpaceInput>,
  output: __S(256, __c8, 0) as any as S.Schema<CreateAgentSpaceOutput>,
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
}));

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
  input: __S(320, __c10, 0) as any as S.Schema<CreateAssetRequest>,
  output: __S(416, __c13, 0) as any as S.Schema<CreateAssetResponse>,
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
}));

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
  input: __S(512, __c16, 0) as any as S.Schema<CreateAssetFileRequest>,
  output: __S(545, __c17, 1) as any as S.Schema<CreateAssetFileResponse>,
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
}));

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
  input: __S(576, __c18, 0) as any as S.Schema<CreateBacklogTaskRequest>,
  output: __S(640, __c20, 0) as any as S.Schema<CreateBacklogTaskResponse>,
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
}));

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
  input: __S(672, __c21, 0) as any as S.Schema<CreateChatRequest>,
  output: __S(673, __c21, 1) as any as S.Schema<CreateChatResponse>,
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
}));

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
  input: __S(707, __c22, 3) as any as S.Schema<CreatePrivateConnectionInput>,
  output: __S(736, __c23, 0) as any as S.Schema<CreatePrivateConnectionOutput>,
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
}));

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
  input: __S(768, __c24, 0) as any as S.Schema<CreateTriggerRequest>,
  output: __S(832, __c26, 0) as any as S.Schema<CreateTriggerResponse>,
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
}));

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
  input: __S(864, __c27, 0) as any as S.Schema<DeleteAgentSpaceInput>,
  output: __S(64, __c2, 0) as any as S.Schema<DeleteAgentSpaceOutput>,
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
}));

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
  input: __S(896, __c28, 0) as any as S.Schema<DeleteAssetRequest>,
  output: __S(64, __c2, 0) as any as S.Schema<DeleteAssetResponse>,
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
}));

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
  input: __S(928, __c29, 0) as any as S.Schema<DeleteAssetFileRequest>,
  output: __S(64, __c2, 0) as any as S.Schema<DeleteAssetFileResponse>,
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
}));

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
  input: __S(960, __c30, 0) as any as S.Schema<DeletePrivateConnectionInput>,
  output: __S(961, __c30, 1) as any as S.Schema<DeletePrivateConnectionOutput>,
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
}));

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
  input: __S(992, __c31, 0) as any as S.Schema<DeleteTriggerRequest>,
  output: __S(64, __c2, 0) as any as S.Schema<DeleteTriggerResponse>,
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
}));

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
  input: __S(1024, __c32, 0) as any as S.Schema<DeregisterServiceInput>,
  output: __S(64, __c2, 0) as any as S.Schema<DeregisterServiceOutput>,
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
}));

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
  input: __S(1056, __c33, 0) as any as S.Schema<DescribePrivateConnectionInput>,
  output: __S(736, __c23, 0) as any as S.Schema<DescribePrivateConnectionOutput>,
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
}));

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
  input: __S(1088, __c34, 0) as any as S.Schema<DisableOperatorAppInput>,
  output: __S(64, __c2, 0) as any as S.Schema<DisableOperatorAppResponse>,
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
}));

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
  input: __S(1120, __c35, 0) as any as S.Schema<DisassociateServiceInput>,
  output: __S(64, __c2, 0) as any as S.Schema<DisassociateServiceOutput>,
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
}));

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
  input: __S(1152, __c36, 0) as any as S.Schema<EnableOperatorAppInput>,
  output: __S(1153, __c36, 1) as any as S.Schema<EnableOperatorAppOutput>,
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
}));

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
  input: __S(1248, __c39, 0) as any as S.Schema<GetAccountUsageInput>,
  output: __S(1250, __c39, 2) as any as S.Schema<GetAccountUsageOutput>,
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
}));

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
  input: __S(1280, __c40, 0) as any as S.Schema<GetAgentSpaceInput>,
  output: __S(256, __c8, 0) as any as S.Schema<GetAgentSpaceOutput>,
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
}));

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
  input: __S(1312, __c41, 0) as any as S.Schema<GetAssetRequest>,
  output: __S(416, __c13, 0) as any as S.Schema<GetAssetResponse>,
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
}));

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
  input: __S(1344, __c42, 0) as any as S.Schema<GetAssetContentRequest>,
  output: __S(1345, __c42, 1) as any as S.Schema<GetAssetContentResponse>,
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
}));

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
  input: __S(1376, __c43, 0) as any as S.Schema<GetAssetFileRequest>,
  output: __S(545, __c17, 1) as any as S.Schema<GetAssetFileResponse>,
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
}));

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
  input: __S(1408, __c44, 0) as any as S.Schema<GetAssociationInput>,
  output: __S(1409, __c44, 1) as any as S.Schema<GetAssociationOutput>,
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
}));

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
  input: __S(1440, __c45, 0) as any as S.Schema<GetBacklogTaskRequest>,
  output: __S(640, __c20, 0) as any as S.Schema<GetBacklogTaskResponse>,
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
}));

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
  input: __S(1472, __c46, 0) as any as S.Schema<GetOperatorAppInput>,
  output: __S(1473, __c46, 1) as any as S.Schema<GetOperatorAppOutput>,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOperatorApp",
  endpointHostPrefix: "cp.",
}));

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
  input: __S(1504, __c47, 0) as any as S.Schema<GetRecommendationRequest>,
  output: __S(1568, __c49, 0) as any as S.Schema<GetRecommendationResponse>,
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
}));

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
  input: __S(1600, __c50, 0) as any as S.Schema<GetServiceInput>,
  output: __S(1601, __c50, 1) as any as S.Schema<GetServiceOutput>,
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
}));

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
  input: __S(1696, __c53, 0) as any as S.Schema<GetTriggerRequest>,
  output: __S(832, __c26, 0) as any as S.Schema<GetTriggerResponse>,
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
}));

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
  input: __S(1728, __c54, 0) as any as S.Schema<ListAgentSpacesInput>,
  output: __S(1730, __c54, 2) as any as S.Schema<ListAgentSpacesOutput>,
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
  input: __S(1760, __c55, 0) as any as S.Schema<ListAssetFilesRequest>,
  output: __S(1763, __c55, 3) as any as S.Schema<ListAssetFilesResponse>,
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
  input: __S(1792, __c56, 0) as any as S.Schema<ListAssetsRequest>,
  output: __S(1794, __c56, 2) as any as S.Schema<ListAssetsResponse>,
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
  input: __S(1824, __c57, 0) as any as S.Schema<ListAssetTypesRequest>,
  output: __S(1827, __c57, 3) as any as S.Schema<ListAssetTypesResponse>,
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
  input: __S(1856, __c58, 0) as any as S.Schema<ListAssetVersionsRequest>,
  output: __S(1859, __c58, 3) as any as S.Schema<ListAssetVersionsResponse>,
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
  input: __S(1888, __c59, 0) as any as S.Schema<ListAssociationsInput>,
  output: __S(1890, __c59, 2) as any as S.Schema<ListAssociationsOutput>,
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
  input: __S(1921, __c60, 1) as any as S.Schema<ListBacklogTasksRequest>,
  output: __S(1923, __c60, 3) as any as S.Schema<ListBacklogTasksResponse>,
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
  input: __S(1952, __c61, 0) as any as S.Schema<ListChatsRequest>,
  output: __S(1955, __c61, 3) as any as S.Schema<ListChatsResponse>,
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
}));

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
  input: __S(1984, __c62, 0) as any as S.Schema<ListExecutionsRequest>,
  output: __S(1987, __c62, 3) as any as S.Schema<ListExecutionsResponse>,
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
  input: __S(2016, __c63, 0) as any as S.Schema<ListGoalsRequest>,
  output: __S(2018, __c63, 2) as any as S.Schema<ListGoalsResponse>,
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
  input: __S(2080, __c65, 0) as any as S.Schema<ListJournalRecordsRequest>,
  output: __S(2084, __c65, 4) as any as S.Schema<ListJournalRecordsResponse>,
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
  input: __S(2112, __c66, 0) as any as S.Schema<ListPendingMessagesRequest>,
  output: __S(2120, __c66, 8) as any as S.Schema<ListPendingMessagesResponse>,
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
}));

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
  input: __S(2144, __c67, 0) as any as S.Schema<ListPrivateConnectionsInput>,
  output: __S(2146, __c67, 2) as any as S.Schema<ListPrivateConnectionsOutput>,
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
}));

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
  input: __S(2208, __c69, 0) as any as S.Schema<ListRecommendationsRequest>,
  output: __S(2210, __c69, 2) as any as S.Schema<ListRecommendationsResponse>,
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
}));

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
  input: __S(2240, __c70, 0) as any as S.Schema<ListServicesInput>,
  output: __S(2242, __c70, 2) as any as S.Schema<ListServicesOutput>,
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
  input: __S(2272, __c71, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(2273, __c71, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
}));

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
  input: __S(2304, __c72, 0) as any as S.Schema<ListTriggersRequest>,
  output: __S(2306, __c72, 2) as any as S.Schema<ListTriggersResponse>,
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
  input: __S(2336, __c73, 0) as any as S.Schema<ListWebhooksInput>,
  output: __S(2339, __c73, 3) as any as S.Schema<ListWebhooksOutput>,
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
}));

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
  input: __S(2394, __c74, 26) as any as S.Schema<RegisterServiceInput>,
  output: __S(2397, __c74, 29) as any as S.Schema<RegisterServiceOutput>,
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
}));

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
  input: __S(2402, __c75, 2) as any as S.Schema<SendMessageRequest>,
  output: __S(2415, __c75, 15) as any as S.Schema<SendMessageResponse>,
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
}));

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
  input: __S(2432, __c76, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(64, __c2, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(2464, __c77, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(64, __c2, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

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
  input: __S(2496, __c78, 0) as any as S.Schema<UpdateAgentSpaceInput>,
  output: __S(2497, __c78, 1) as any as S.Schema<UpdateAgentSpaceOutput>,
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
}));

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
  input: __S(2529, __c79, 1) as any as S.Schema<UpdateApprovalActionRequest>,
  output: __S(2530, __c79, 2) as any as S.Schema<UpdateApprovalActionResponse>,
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
}));

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
  input: __S(2560, __c80, 0) as any as S.Schema<UpdateAssetRequest>,
  output: __S(416, __c13, 0) as any as S.Schema<UpdateAssetResponse>,
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
}));

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
  input: __S(2592, __c81, 0) as any as S.Schema<UpdateAssetFileRequest>,
  output: __S(545, __c17, 1) as any as S.Schema<UpdateAssetFileResponse>,
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
}));

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
  input: __S(2624, __c82, 0) as any as S.Schema<UpdateAssociationInput>,
  output: __S(161, __c5, 1) as any as S.Schema<UpdateAssociationOutput>,
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
}));

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
  input: __S(2656, __c83, 0) as any as S.Schema<UpdateBacklogTaskRequest>,
  output: __S(640, __c20, 0) as any as S.Schema<UpdateBacklogTaskResponse>,
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
}));

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
  input: __S(2689, __c84, 1) as any as S.Schema<UpdateGoalRequest>,
  output: __S(2690, __c84, 2) as any as S.Schema<UpdateGoalResponse>,
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
}));

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
  input: __S(2720, __c85, 0) as any as S.Schema<UpdateOperatorAppIdpConfigInput>,
  output: __S(2721, __c85, 1) as any as S.Schema<UpdateOperatorAppIdpConfigOutput>,
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
}));

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
  input: __S(2752, __c86, 0) as any as S.Schema<UpdatePrivateConnectionCertificateInput>,
  output: __S(2176, __c68, 0) as any as S.Schema<UpdatePrivateConnectionCertificateOutput>,
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
}));

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
  input: __S(2784, __c87, 0) as any as S.Schema<UpdateRecommendationRequest>,
  output: __S(1568, __c49, 0) as any as S.Schema<UpdateRecommendationResponse>,
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
}));

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
  input: __S(2816, __c88, 0) as any as S.Schema<UpdateTriggerRequest>,
  output: __S(832, __c26, 0) as any as S.Schema<UpdateTriggerResponse>,
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
}));

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
  input: __S(2848, __c89, 0) as any as S.Schema<ValidateAwsAssociationsInput>,
  output: __S(64, __c2, 0) as any as S.Schema<ValidateAwsAssociationsOutput>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          serviceId: S.String,
          configuration: __S(147, __c4, 19),
          capabilities: S.optional(__S(152, __c4, 24)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/agentspaces/{agentSpaceId}/associations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateServiceInput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "MCPServerSplunkConfiguration" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accountId: S.String,
          accountType: S.String,
          assumableRoleArn: S.String,
          externalId: S.optional(S.String),
          agentElevatedRoleArn: S.optional(S.String),
          agentElevatedRoleArnStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "SourceAwsConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          assumableRoleArn: S.String,
          accountId: S.String,
          accountType: S.String,
          agentElevatedRoleArn: S.optional(S.String),
          agentElevatedRoleArnStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "AWSConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          repoName: S.String,
          repoId: S.String,
          owner: S.String,
          ownerType: S.String,
          instanceIdentifier: S.optional(S.String),
          runtimeRoleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "GitHubConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({ channelName: S.optional(S.String), channelId: S.String }),
      ).annotate({ identifier: "SlackChannel" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          opsOncallTarget: __S(131, __c4, 3),
          opsSRETarget: S.optional(__S(131, __c4, 3)),
        }),
      ).annotate({ identifier: "SlackTransmissionTarget" });
    case 5:
      return S.suspend(() =>
        S.Struct({ roleArn: S.String, enabled: S.optional(S.Boolean) }),
      ).annotate({ identifier: "SlackBidirectionalConfiguration" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String,
          workspaceName: S.String,
          transmissionTarget: __S(132, __c4, 4),
          bidirectional: S.optional(__S(133, __c4, 5)),
        }),
      ).annotate({ identifier: "SlackConfiguration" });
    case 7:
      return S.suspend(() =>
        S.Struct({ envId: S.String, resources: S.optional(__S(32, __c1, 0)) }),
      ).annotate({ identifier: "DynatraceConfiguration" });
    case 8:
      return S.suspend(() =>
        S.Struct({ instanceId: S.optional(S.String), authScopes: S.optional(__S(32, __c1, 0)) }),
      ).annotate({ identifier: "ServiceNowConfiguration" });
    case 9:
      return S.suspend(() => S.Struct({ accountId: S.String, endpoint: S.String })).annotate({
        identifier: "MCPServerNewRelicConfiguration",
      });
    case 10:
      return S.suspend(() =>
        S.Struct({ name: S.String, toolClassification: S.optional(S.String) }),
      ).annotate({ identifier: "MCPToolDetail" });
    case 11:
      return S.Array(__S(138, __c4, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({ enabledElevatedTools: S.optional(__S(139, __c4, 11)) }),
      ).annotate({ identifier: "MCPServerDatadogConfiguration" });
    case 13:
      return S.suspend(() =>
        S.Struct({ tools: __S(32, __c1, 0), toolDetails: S.optional(__S(139, __c4, 11)) }),
      ).annotate({ identifier: "MCPServerConfiguration" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          projectId: S.String,
          projectPath: S.String,
          instanceIdentifier: S.optional(S.String),
          runtimeRoleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "GitLabConfiguration" });
    case 15:
      return S.suspend(() => S.Struct({ subscriptionId: S.String })).annotate({
        identifier: "AzureConfiguration",
      });
    case 16:
      return S.suspend(() =>
        S.Struct({ organizationName: S.String, projectId: S.String, projectName: S.String }),
      ).annotate({ identifier: "AzureDevOpsConfiguration" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          endpoint: S.String,
          organizationId: S.optional(S.String),
          tools: S.optional(__S(32, __c1, 0)),
          enabledElevatedTools: S.optional(__S(139, __c4, 11)),
        }),
      ).annotate({ identifier: "MCPServerGrafanaConfiguration" });
    case 18:
      return S.suspend(() =>
        S.Struct({ services: __S(32, __c1, 0), customerEmail: SensitiveString }),
      ).annotate({ identifier: "PagerDutyConfiguration" });
    case 19:
      return S.Union([
        /*@__PURE__*/ S.Struct({ sourceAws: __S(128, __c4, 0) }),
        /*@__PURE__*/ S.Struct({ aws: __S(129, __c4, 1) }),
        /*@__PURE__*/ S.Struct({ github: __S(130, __c4, 2) }),
        /*@__PURE__*/ S.Struct({ slack: __S(134, __c4, 6) }),
        /*@__PURE__*/ S.Struct({ dynatrace: __S(135, __c4, 7) }),
        /*@__PURE__*/ S.Struct({ servicenow: __S(136, __c4, 8) }),
        /*@__PURE__*/ S.Struct({ mcpservernewrelic: __S(137, __c4, 9) }),
        /*@__PURE__*/ S.Struct({ mcpserverdatadog: __S(140, __c4, 12) }),
        /*@__PURE__*/ S.Struct({ mcpserver: __S(141, __c4, 13) }),
        /*@__PURE__*/ S.Struct({ gitlab: __S(142, __c4, 14) }),
        /*@__PURE__*/ S.Struct({ mcpserversplunk: __S(64, __c2, 0) }),
        /*@__PURE__*/ S.Struct({ eventChannel: __S(64, __c2, 0) }),
        /*@__PURE__*/ S.Struct({ azure: __S(143, __c4, 15) }),
        /*@__PURE__*/ S.Struct({ azuredevops: __S(144, __c4, 16) }),
        /*@__PURE__*/ S.Struct({ mcpservergrafana: __S(145, __c4, 17) }),
        /*@__PURE__*/ S.Struct({ pagerduty: __S(146, __c4, 18) }),
        /*@__PURE__*/ S.Struct({ mcpserversigv4: __S(141, __c4, 13) }),
        /*@__PURE__*/ S.Struct({ remoteagent: __S(64, __c2, 0) }),
        /*@__PURE__*/ S.Struct({ remoteagentsigv4: __S(64, __c2, 0) }),
      ]);
    case 20:
      return S.suspend(() => S.Struct({ patterns: __S(32, __c1, 0) })).annotate({
        identifier: "PatternFilter",
      });
    case 21:
      return S.suspend(() =>
        S.Struct({
          events: S.optional(__S(96, __c3, 0)),
          targetBranches: S.optional(__S(148, __c4, 20)),
        }),
      ).annotate({ identifier: "TriggerFilterGroup" });
    case 22:
      return S.Array(__S(149, __c4, 21));
    case 23:
      return S.suspend(() =>
        S.Struct({
          enabled: S.optional(S.Boolean),
          triggerFilterGroups: S.optional(__S(150, __c4, 22)),
        }),
      ).annotate({ identifier: "CapabilityConfiguration" });
    case 24:
      return S.Record(S.String, /*@__PURE__*/ __S(151, __c4, 23).pipe(S.optional));
    case 25:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          status: S.optional(S.String),
          associationId: S.String,
          serviceId: S.String,
          configuration: __S(147, __c4, 19),
          capabilities: S.optional(__S(152, __c4, 24)),
        }),
      ).annotate({ identifier: "Association" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          webhookUrl: S.optional(S.String),
          webhookId: S.optional(S.String),
          webhookType: S.optional(S.String),
          webhookSecret: S.optional(SensitiveString),
          apiKey: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "GenericWebhook" });
    case 1:
      return S.suspend(() =>
        S.Struct({ association: __S(153, __c4, 25), webhook: S.optional(__S(160, __c5, 0)) }),
      ).annotate({ identifier: "AssociateServiceOutput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(SensitiveString),
          locale: S.optional(S.String),
          kmsKeyArn: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(224, __c7, 0)),
          preferences: S.optional(__S(288, __c9, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v1/agentspaces" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateAgentSpaceInput" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ agentSpace: __S(289, __c9, 1), tags: S.optional(__S(224, __c7, 0)) }),
      ).annotate({ identifier: "CreateAgentSpaceOutput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.Boolean.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(SensitiveString),
          locale: S.optional(S.String),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          kmsKeyArn: S.optional(S.String),
          agentSpaceId: S.String,
          preferences: S.optional(__S(288, __c9, 0)),
        }),
      ).annotate({ identifier: "AgentSpace" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          assetType: S.String,
          metadata: S.optional(S.Any),
          content: __S(482, __c15, 2),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/asset/agent-space/{agentSpaceId}/assets" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAssetRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ bytes: T.Blob }),
        /*@__PURE__*/ S.Struct({ text: S.String }),
      ]);
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assetId: S.String,
          assetType: S.String,
          metadata: S.Any,
          version: S.Number,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "Asset" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ asset: __S(384, __c12, 0) })).annotate({
        identifier: "CreateAssetResponse",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ zipFile: T.Blob })).annotate({
        identifier: "AssetZipContent",
      });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ path: S.String, body: __S(352, __c11, 0), metadata: S.optional(S.Any) }),
      ).annotate({ identifier: "AssetFileContent" });
    case 1:
      return S.suspend(() => S.Struct({ url: S.String })).annotate({
        identifier: "AssetSourceUrlContent",
      });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ file: __S(480, __c15, 0) }),
        /*@__PURE__*/ S.Struct({ zip: __S(448, __c14, 0) }),
        /*@__PURE__*/ S.Struct({ sourceUrl: __S(481, __c15, 1) }),
      ]);
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          assetId: S.String.pipe(T.HttpLabel("assetId")),
          path: S.String.pipe(T.HttpLabel("path")),
          content: __S(352, __c11, 0),
          metadata: S.optional(S.Any),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/asset/agent-space/{agentSpaceId}/assets/{assetId}/files/{path+}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAssetFileRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          path: S.String,
          content: __S(352, __c11, 0),
          metadata: S.optional(S.Any),
          version: S.Number,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "AssetFile" });
    case 1:
      return S.suspend(() => S.Struct({ file: __S(544, __c17, 0) })).annotate({
        identifier: "CreateAssetFileResponse",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          reference: S.optional(__S(608, __c19, 0)),
          taskType: S.String,
          title: S.String,
          description: S.optional(S.String),
          priority: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/backlog/agent-space/{agentSpaceId}/tasks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateBacklogTaskRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          system: S.String,
          title: S.optional(S.String),
          referenceId: S.String,
          referenceUrl: S.String,
          associationId: S.String,
        }),
      ).annotate({ identifier: "ReferenceInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String,
          taskId: S.String,
          executionId: S.optional(S.String),
          title: S.String,
          description: S.optional(S.String),
          reference: S.optional(__S(608, __c19, 0)),
          taskType: S.String,
          priority: S.String,
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          version: S.Number,
          supportMetadata: S.optional(S.Any),
          metadata: S.optional(S.Any),
          primaryTaskId: S.optional(S.String),
          statusReason: S.optional(S.String),
          hasLinkedTasks: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "Task" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ task: __S(609, __c19, 1) })).annotate({
        identifier: "CreateBacklogTaskResponse",
      });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          userId: S.optional(S.String).pipe(T.HttpQuery("userId")),
          userType: S.optional(S.String).pipe(T.HttpQuery("userType")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/agents/agent-space/{agentSpaceId}/chat/create" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateChatRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          executionId: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "CreateChatResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          hostAddress: S.String,
          vpcId: S.String,
          subnetIds: __S(32, __c1, 0),
          securityGroupIds: S.optional(__S(32, __c1, 0)),
          ipAddressType: S.optional(S.String),
          ipv4AddressesPerEni: S.optional(S.Number),
          portRanges: S.optional(__S(32, __c1, 0)),
          certificate: S.optional(S.String),
          dnsResolution: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServiceManagedInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ resourceConfigurationId: S.String, certificate: S.optional(S.String) }),
      ).annotate({ identifier: "SelfManagedInput" });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ serviceManaged: __S(704, __c22, 0) }),
        /*@__PURE__*/ S.Struct({ selfManaged: __S(705, __c22, 1) }),
      ]);
    case 3:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          mode: __S(706, __c22, 2),
          tags: S.optional(__S(224, __c7, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/private-connections" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreatePrivateConnectionInput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          type: S.String,
          resourceGatewayId: S.optional(S.String),
          hostAddress: S.optional(S.String),
          vpcId: S.optional(S.String),
          resourceConfigurationId: S.optional(S.String),
          status: S.String,
          certificateExpiryTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          dnsResolution: S.optional(S.String),
          failureMessage: S.optional(S.String),
          tags: S.optional(__S(224, __c7, 0)),
        }),
      ).annotate({ identifier: "CreatePrivateConnectionOutput" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          type: S.String,
          condition: __S(801, __c25, 1),
          action: S.Any,
          status: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/trigger/agent-space/{agentSpaceId}/triggers" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateTriggerRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ expression: S.String })).annotate({
        identifier: "ScheduleCondition",
      });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ schedule: __S(800, __c25, 0) })]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          triggerId: S.String,
          agentSpaceId: S.String,
          type: S.String,
          condition: __S(801, __c25, 1),
          action: S.Any,
          status: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "Trigger" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ trigger: __S(802, __c25, 2) })).annotate({
        identifier: "CreateTriggerResponse",
      });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/agentspaces/{agentSpaceId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAgentSpaceInput" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          assetId: S.String.pipe(T.HttpLabel("assetId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/asset/agent-space/{agentSpaceId}/assets/{assetId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAssetRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          assetId: S.String.pipe(T.HttpLabel("assetId")),
          path: S.String.pipe(T.HttpLabel("path")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/asset/agent-space/{agentSpaceId}/assets/{assetId}/files/{path+}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAssetFileRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/private-connections/{name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePrivateConnectionInput" });
    case 1:
      return S.suspend(() => S.Struct({ name: S.String, status: S.String })).annotate({
        identifier: "DeletePrivateConnectionOutput",
      });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          triggerId: S.String.pipe(T.HttpLabel("triggerId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/trigger/agent-space/{agentSpaceId}/triggers/{triggerId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTriggerRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ serviceId: S.String.pipe(T.HttpLabel("serviceId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/services/{serviceId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeregisterServiceInput" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/private-connections/{name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribePrivateConnectionInput" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          authFlow: S.optional(S.String).pipe(T.HttpHeader("x-amzn-app-auth-flow")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/agentspaces/{agentSpaceId}/operator" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisableOperatorAppInput" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          associationId: S.String.pipe(T.HttpLabel("associationId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v1/agentspaces/{agentSpaceId}/associations/{associationId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateServiceInput" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          authFlow: S.String,
          operatorAppRoleArn: S.String,
          idcInstanceArn: S.optional(S.String),
          issuerUrl: S.optional(S.String),
          idpClientId: S.optional(S.String),
          idpClientSecret: S.optional(SensitiveString),
          provider: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/agentspaces/{agentSpaceId}/operator" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "EnableOperatorAppInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String,
          operatorAppUrl: S.optional(S.String),
          iam: S.optional(__S(1184, __c37, 0)),
          idc: S.optional(__S(1185, __c37, 1)),
          idp: S.optional(__S(1216, __c38, 0)),
        }),
      ).annotate({ identifier: "EnableOperatorAppOutput" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          operatorAppRoleArn: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "IamAuthConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          operatorAppRoleArn: S.String,
          idcInstanceArn: S.String,
          idcApplicationArn: S.optional(S.String),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "IdcAuthConfiguration" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          issuerUrl: S.String,
          clientId: S.String,
          operatorAppRoleArn: S.String,
          provider: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "IdpAuthConfiguration" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "GET", uri: "/usage/account" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAccountUsageInput" });
    case 1:
      return S.suspend(() => S.Struct({ limit: S.Number, usage: S.Number })).annotate({
        identifier: "UsageMetric",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          monthlyAccountInvestigationHours: S.optional(__S(1249, __c39, 1)),
          monthlyAccountEvaluationHours: S.optional(__S(1249, __c39, 1)),
          monthlyAccountSystemLearningHours: S.optional(__S(1249, __c39, 1)),
          monthlyAccountOnDemandHours: S.optional(__S(1249, __c39, 1)),
          usagePeriodStartTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          usagePeriodEndTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "GetAccountUsageOutput" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/agentspaces/{agentSpaceId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAgentSpaceInput" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          assetId: S.String.pipe(T.HttpLabel("assetId")),
          assetVersion: S.optional(S.Number).pipe(T.HttpQuery("assetVersion")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/asset/agent-space/{agentSpaceId}/assets/{assetId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAssetRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          assetId: S.String.pipe(T.HttpLabel("assetId")),
          assetVersion: S.optional(S.Number).pipe(T.HttpQuery("assetVersion")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/asset/agent-space/{agentSpaceId}/assets/{assetId}/content",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAssetContentRequest" });
    case 1:
      return S.suspend(() => S.Struct({ content: __S(448, __c14, 0), version: S.Number })).annotate(
        { identifier: "GetAssetContentResponse" },
      );
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          assetId: S.String.pipe(T.HttpLabel("assetId")),
          path: S.String.pipe(T.HttpLabel("path")),
          assetVersion: S.optional(S.Number).pipe(T.HttpQuery("assetVersion")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/asset/agent-space/{agentSpaceId}/assets/{assetId}/files/{path+}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAssetFileRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          associationId: S.String.pipe(T.HttpLabel("associationId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v1/agentspaces/{agentSpaceId}/associations/{associationId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAssociationInput" });
    case 1:
      return S.suspend(() => S.Struct({ association: __S(153, __c4, 25) })).annotate({
        identifier: "GetAssociationOutput",
      });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          taskId: S.String.pipe(T.HttpLabel("taskId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/backlog/agent-space/{agentSpaceId}/tasks/{taskId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBacklogTaskRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/agentspaces/{agentSpaceId}/operator" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetOperatorAppInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          operatorAppUrl: S.optional(S.String),
          iam: S.optional(__S(1184, __c37, 0)),
          idc: S.optional(__S(1185, __c37, 1)),
          idp: S.optional(__S(1216, __c38, 0)),
        }),
      ).annotate({ identifier: "GetOperatorAppOutput" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          recommendationId: S.String.pipe(T.HttpLabel("recommendationId")),
          recommendationVersion: S.optional(S.Number).pipe(T.HttpQuery("recommendationVersion")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/backlog/agent-space/{agentSpaceId}/recommendations/{recommendationId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRecommendationRequest" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ summary: S.String, spec: S.optional(S.String) })).annotate({
        identifier: "RecommendationContent",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          agentSpaceArn: S.String,
          recommendationId: S.String,
          taskId: S.String,
          goalId: S.optional(S.String),
          title: S.String,
          content: __S(1536, __c48, 0),
          status: S.String,
          priority: S.String,
          goalVersion: S.optional(S.Number),
          additionalContext: S.optional(S.String),
          rankPosition: S.optional(S.Number),
          rankedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          version: S.Number,
        }),
      ).annotate({ identifier: "Recommendation" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ recommendation: __S(1537, __c48, 1) })).annotate({
        identifier: "GetRecommendationResponse",
      });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ serviceId: S.String.pipe(T.HttpLabel("serviceId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/services/{serviceId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetServiceInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ service: __S(1646, __c51, 14), tags: S.optional(__S(224, __c7, 0)) }),
      ).annotate({ identifier: "GetServiceOutput" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.Any);
    case 1:
      return S.suspend(() =>
        S.Struct({ owner: S.String, ownerType: S.String, targetUrl: S.optional(S.String) }),
      ).annotate({ identifier: "RegisteredGithubServiceDetails" });
    case 2:
      return S.suspend(() => S.Struct({ teamId: S.String, teamName: S.String })).annotate({
        identifier: "RegisteredSlackServiceDetails",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          endpoint: S.String,
          authorizationMethod: S.String,
          description: S.optional(SensitiveString),
          apiKeyHeader: S.optional(S.String),
        }),
      ).annotate({ identifier: "RegisteredMCPServerDetails" });
    case 4:
      return S.suspend(() => S.Struct({ instanceUrl: S.optional(S.String) })).annotate({
        identifier: "RegisteredServiceNowDetails",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({ targetUrl: S.String, tokenType: S.String, groupId: S.optional(S.String) }),
      ).annotate({ identifier: "RegisteredGitLabServiceDetails" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          accountId: S.String,
          region: S.String,
          description: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "RegisteredNewRelicDetails" });
    case 7:
      return S.suspend(() => S.Struct({ organizationName: S.String })).annotate({
        identifier: "RegisteredAzureDevOpsServiceDetails",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({ endpoint: S.String, authorizationMethod: S.String }),
      ).annotate({ identifier: "RegisteredGrafanaServerDetails" });
    case 9:
      return S.suspend(() => S.Struct({ scopes: __S(32, __c1, 0) })).annotate({
        identifier: "RegisteredPagerDutyDetails",
      });
    case 10:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          endpoint: S.String,
          description: S.optional(SensitiveString),
          region: S.String,
          service: S.String,
          roleArn: S.String,
          mcpRoleArn: S.optional(S.String),
          customHeaders: S.optional(__S(1665, __c52, 1)),
        }),
      ).annotate({ identifier: "RegisteredMCPServerSigV4Details" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          endpoint: S.String,
          description: S.optional(SensitiveString),
          authorizationMethod: S.String,
          apiKeyHeader: S.optional(S.String),
        }),
      ).annotate({ identifier: "RegisteredRemoteAgentDetails" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          endpoint: S.String,
          description: S.optional(SensitiveString),
          region: S.String,
          service: S.String,
          roleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "RegisteredRemoteAgentSigV4Details" });
    case 13:
      return S.Union([
        /*@__PURE__*/ S.Struct({ github: __S(1633, __c51, 1) }),
        /*@__PURE__*/ S.Struct({ slack: __S(1634, __c51, 2) }),
        /*@__PURE__*/ S.Struct({ mcpserverdatadog: __S(1635, __c51, 3) }),
        /*@__PURE__*/ S.Struct({ mcpserver: __S(1635, __c51, 3) }),
        /*@__PURE__*/ S.Struct({ servicenow: __S(1636, __c51, 4) }),
        /*@__PURE__*/ S.Struct({ gitlab: __S(1637, __c51, 5) }),
        /*@__PURE__*/ S.Struct({ mcpserversplunk: __S(1635, __c51, 3) }),
        /*@__PURE__*/ S.Struct({ mcpservernewrelic: __S(1638, __c51, 6) }),
        /*@__PURE__*/ S.Struct({ azuredevops: __S(1639, __c51, 7) }),
        /*@__PURE__*/ S.Struct({ azureidentity: __S(1664, __c52, 0) }),
        /*@__PURE__*/ S.Struct({ mcpservergrafana: __S(1640, __c51, 8) }),
        /*@__PURE__*/ S.Struct({ pagerduty: __S(1641, __c51, 9) }),
        /*@__PURE__*/ S.Struct({ mcpserversigv4: __S(1642, __c51, 10) }),
        /*@__PURE__*/ S.Struct({ remoteagent: __S(1643, __c51, 11) }),
        /*@__PURE__*/ S.Struct({ remoteagentsigv4: __S(1644, __c51, 12) }),
      ]);
    case 14:
      return S.suspend(() =>
        S.Struct({
          serviceId: S.String,
          serviceType: S.String,
          name: S.optional(S.String),
          accessibleResources: S.optional(__S(1632, __c51, 0)),
          additionalServiceDetails: S.optional(__S(1645, __c51, 13)),
          kmsKeyArn: S.optional(S.String),
          privateConnectionName: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "RegisteredService" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tenantId: S.String,
          clientId: S.String,
          webIdentityRoleArn: S.String,
          webIdentityTokenAudiences: __S(32, __c1, 0),
        }),
      ).annotate({ identifier: "RegisteredAzureIdentityDetails" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ SensitiveString.pipe(S.optional));
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          triggerId: S.String.pipe(T.HttpLabel("triggerId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/trigger/agent-space/{agentSpaceId}/triggers/{triggerId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTriggerRequest" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/agentspaces/list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAgentSpacesInput" });
    case 1:
      return S.Array(__S(289, __c9, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), agentSpaces: __S(1729, __c54, 1) }),
      ).annotate({ identifier: "ListAgentSpacesOutput" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          assetId: S.String.pipe(T.HttpLabel("assetId")),
          assetVersion: S.optional(S.Number).pipe(T.HttpQuery("assetVersion")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/asset/agent-space/{agentSpaceId}/assets/{assetId}/files",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAssetFilesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          path: S.String,
          metadata: S.optional(S.Any),
          version: S.Number,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "AssetFileSummary" });
    case 2:
      return S.Array(__S(1761, __c55, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(1762, __c55, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAssetFilesResponse" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          assetType: S.optional(S.String).pipe(T.HttpQuery("assetType")),
          updatedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("updatedAfter"),
          ),
          updatedBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("updatedBefore"),
          ),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/asset/agent-space/{agentSpaceId}/assets" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAssetsRequest" });
    case 1:
      return S.Array(__S(384, __c12, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ items: __S(1793, __c56, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAssetsResponse" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/asset/types" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListAssetTypesRequest" });
    case 1:
      return S.suspend(() => S.Struct({ assetType: S.String, description: S.String })).annotate({
        identifier: "AssetTypeSummary",
      });
    case 2:
      return S.Array(__S(1825, __c57, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(1826, __c57, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAssetTypesResponse" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          assetId: S.String.pipe(T.HttpLabel("assetId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/asset/agent-space/{agentSpaceId}/assets/{assetId}/versions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAssetVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          version: S.Number,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "AssetVersionMetadata" });
    case 2:
      return S.Array(__S(1857, __c58, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(1858, __c58, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAssetVersionsResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          filterServiceTypes: S.optional(S.String).pipe(T.HttpQuery("filterServiceTypes")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/agentspaces/{agentSpaceId}/associations/list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAssociationsInput" });
    case 1:
      return S.Array(__S(153, __c4, 25));
    case 2:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), associations: __S(1889, __c59, 1) }),
      ).annotate({ identifier: "ListAssociationsOutput" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          createdAfter: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          createdBefore: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          priority: S.optional(__S(96, __c3, 0)),
          status: S.optional(__S(96, __c3, 0)),
          taskType: S.optional(__S(96, __c3, 0)),
          primaryTaskId: S.optional(S.String),
        }),
      ).annotate({ identifier: "TaskFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          filter: S.optional(__S(1920, __c60, 0)),
          limit: S.optional(S.Number),
          nextToken: S.optional(S.String),
          sortField: S.optional(S.String),
          order: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/backlog/agent-space/{agentSpaceId}/tasks/list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListBacklogTasksRequest" });
    case 2:
      return S.Array(__S(609, __c19, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ tasks: __S(1922, __c60, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListBacklogTasksResponse" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          userId: S.optional(S.String).pipe(T.HttpQuery("userId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/agents/agent-space/{agentSpaceId}/chat/list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListChatsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          executionId: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          summary: S.optional(S.String),
        }),
      ).annotate({ identifier: "ChatExecution" });
    case 2:
      return S.Array(__S(1953, __c61, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ executions: __S(1954, __c61, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListChatsResponse" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          taskId: S.String,
          limit: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/journal/agent-space/{agentSpaceId}/executions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListExecutionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String,
          executionId: S.String,
          parentExecutionId: S.optional(S.String),
          agentSubTask: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          executionStatus: S.String,
          agentType: S.optional(S.String),
          uid: S.optional(S.String),
        }),
      ).annotate({ identifier: "Execution" });
    case 2:
      return S.Array(__S(1985, __c62, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ executions: __S(1986, __c62, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListExecutionsResponse" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          status: S.optional(S.String),
          goalType: S.optional(S.String),
          limit: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/backlog/agent-space/{agentSpaceId}/goals/list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListGoalsRequest" });
    case 1:
      return S.Array(__S(2050, __c64, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({ goals: __S(2017, __c63, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListGoalsResponse" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ description: S.String, objectives: S.String })).annotate({
        identifier: "GoalContent",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ state: S.String, expression: S.optional(S.String) }),
      ).annotate({ identifier: "GoalSchedule" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          agentSpaceArn: S.String,
          goalId: S.String,
          title: S.String,
          content: __S(2048, __c64, 0),
          status: S.String,
          goalType: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastEvaluatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastTaskId: S.optional(S.String),
          lastSuccessfulTaskId: S.optional(S.String),
          version: S.Number,
          evaluationSchedule: S.optional(__S(2049, __c64, 1)),
        }),
      ).annotate({ identifier: "Goal" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          executionId: S.String,
          limit: S.optional(S.Number),
          nextToken: S.optional(S.String),
          recordType: S.optional(S.String),
          order: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/journal/agent-space/{agentSpaceId}/journalRecords" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListJournalRecordsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ userId: S.String, userType: S.String })).annotate({
        identifier: "UserReference",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String,
          executionId: S.String,
          recordId: S.String,
          content: S.Any,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          recordType: S.String,
          userReference: S.optional(__S(2081, __c65, 1)),
        }),
      ).annotate({ identifier: "JournalRecord" });
    case 3:
      return S.Array(__S(2082, __c65, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ records: __S(2083, __c65, 3), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListJournalRecordsResponse" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          executionId: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/agents/agent-space/{agentSpaceId}/pendingMessages" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPendingMessagesRequest" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ text: S.String }),
        /*@__PURE__*/ S.Struct({ toolResult: S.Any }),
      ]);
    case 2:
      return S.Array(__S(2113, __c66, 1));
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ text: S.String }),
        /*@__PURE__*/ S.Struct({ toolUse: S.Any }),
      ]);
    case 4:
      return S.Array(__S(2115, __c66, 3));
    case 5:
      return S.Union([
        /*@__PURE__*/ S.Struct({ userMessage: __S(2114, __c66, 2) }),
        /*@__PURE__*/ S.Struct({ assistantMessage: __S(2116, __c66, 4) }),
      ]);
    case 6:
      return S.suspend(() =>
        S.Struct({ messageId: S.String, message: __S(2117, __c66, 5) }),
      ).annotate({ identifier: "PendingMessage" });
    case 7:
      return S.Array(__S(2118, __c66, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String,
          executionId: S.String,
          messages: __S(2119, __c66, 7),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "ListPendingMessagesResponse" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/private-connections" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPrivateConnectionsInput" });
    case 1:
      return S.Array(__S(2176, __c68, 0));
    case 2:
      return S.suspend(() => S.Struct({ privateConnections: __S(2145, __c67, 1) })).annotate({
        identifier: "ListPrivateConnectionsOutput",
      });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          type: S.String,
          resourceGatewayId: S.optional(S.String),
          hostAddress: S.optional(S.String),
          vpcId: S.optional(S.String),
          resourceConfigurationId: S.optional(S.String),
          status: S.String,
          certificateExpiryTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          dnsResolution: S.optional(S.String),
          failureMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "PrivateConnectionSummary" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          taskId: S.optional(S.String),
          goalId: S.optional(S.String),
          status: S.optional(S.String),
          priority: S.optional(S.String),
          limit: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/backlog/agent-space/{agentSpaceId}/recommendations/list",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRecommendationsRequest" });
    case 1:
      return S.Array(__S(1537, __c48, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({ recommendations: __S(2209, __c69, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRecommendationsResponse" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          filterServiceType: S.optional(S.String).pipe(T.HttpQuery("filterServiceType")),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v1/services/list" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListServicesInput" });
    case 1:
      return S.Array(__S(1646, __c51, 14));
    case 2:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), services: __S(2241, __c70, 1) }),
      ).annotate({ identifier: "ListServicesOutput" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: __S(224, __c7, 0) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/trigger/agent-space/{agentSpaceId}/triggers" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTriggersRequest" });
    case 1:
      return S.Array(__S(802, __c25, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({ items: __S(2305, __c72, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTriggersResponse" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          associationId: S.String.pipe(T.HttpLabel("associationId")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/v1/agentspaces/{agentSpaceId}/associations/{associationId}/webhooks/list",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListWebhooksInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ webhookUrl: S.String, webhookType: S.optional(S.String), webhookId: S.String }),
      ).annotate({ identifier: "Webhook" });
    case 2:
      return S.Array(__S(2337, __c73, 1));
    case 3:
      return S.suspend(() => S.Struct({ webhooks: __S(2338, __c73, 2) })).annotate({
        identifier: "ListWebhooksOutput",
      });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientName: S.optional(S.String),
          clientId: SensitiveString,
          exchangeParameters: S.optional(__S(1665, __c52, 1)),
          clientSecret: SensitiveString,
        }),
      ).annotate({ identifier: "DynatraceOAuthClientCredentialsConfig" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ oAuthClientCredentials: __S(2368, __c74, 0) })]);
    case 2:
      return S.suspend(() =>
        S.Struct({ accountUrn: S.String, authorizationConfig: S.optional(__S(2369, __c74, 1)) }),
      ).annotate({ identifier: "DynatraceServiceDetails" });
    case 3:
      return S.suspend(() =>
        S.Struct({ instanceUrl: S.String, authorizationConfig: S.optional(__S(2369, __c74, 1)) }),
      ).annotate({ identifier: "ServiceNowServiceDetails" });
    case 4:
      return S.suspend(() => S.Struct({ returnToEndpoint: S.String })).annotate({
        identifier: "MCPServerAuthorizationDiscoveryConfig",
      });
    case 5:
      return S.Union([/*@__PURE__*/ S.Struct({ authorizationDiscovery: __S(2372, __c74, 4) })]);
    case 6:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          endpoint: S.String,
          description: S.optional(SensitiveString),
          authorizationConfig: __S(2373, __c74, 5),
        }),
      ).annotate({ identifier: "DatadogServiceDetails" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          clientName: S.optional(S.String),
          clientId: SensitiveString,
          exchangeParameters: S.optional(__S(1665, __c52, 1)),
          clientSecret: SensitiveString,
          exchangeUrl: S.String,
          scopes: S.optional(__S(32, __c1, 0)),
        }),
      ).annotate({ identifier: "MCPServerOAuthClientCredentialsConfig" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          clientName: S.optional(S.String),
          clientId: SensitiveString,
          exchangeParameters: S.optional(__S(1665, __c52, 1)),
          returnToEndpoint: S.String,
          authorizationUrl: S.String,
          exchangeUrl: S.String,
          clientSecret: S.optional(SensitiveString),
          supportCodeChallenge: S.optional(S.Boolean),
          scopes: S.optional(__S(32, __c1, 0)),
        }),
      ).annotate({ identifier: "MCPServerOAuth3LOConfig" });
    case 9:
      return S.suspend(() =>
        S.Struct({ apiKeyName: S.String, apiKeyValue: SensitiveString, apiKeyHeader: S.String }),
      ).annotate({ identifier: "MCPServerAPIKeyConfig" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          tokenName: S.String,
          tokenValue: SensitiveString,
          authorizationHeader: S.optional(S.String),
        }),
      ).annotate({ identifier: "MCPServerBearerTokenConfig" });
    case 11:
      return S.Union([
        /*@__PURE__*/ S.Struct({ oAuthClientCredentials: __S(2375, __c74, 7) }),
        /*@__PURE__*/ S.Struct({ oAuth3LO: __S(2376, __c74, 8) }),
        /*@__PURE__*/ S.Struct({ apiKey: __S(2377, __c74, 9) }),
        /*@__PURE__*/ S.Struct({ bearerToken: __S(2378, __c74, 10) }),
        /*@__PURE__*/ S.Struct({ authorizationDiscovery: __S(2372, __c74, 4) }),
      ]);
    case 12:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          endpoint: S.String,
          description: S.optional(SensitiveString),
          authorizationConfig: __S(2379, __c74, 11),
        }),
      ).annotate({ identifier: "MCPServerDetails" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          targetUrl: S.String,
          tokenType: S.String,
          tokenValue: SensitiveString,
          groupId: S.optional(S.String),
        }),
      ).annotate({ identifier: "GitLabDetails" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          apiKey: SensitiveString,
          accountId: S.String,
          region: S.String,
          applicationIds: S.optional(__S(32, __c1, 0)),
          entityGuids: S.optional(__S(32, __c1, 0)),
          alertPolicyIds: S.optional(__S(32, __c1, 0)),
        }),
      ).annotate({ identifier: "NewRelicApiKeyConfig" });
    case 15:
      return S.Union([/*@__PURE__*/ S.Struct({ apiKey: __S(2382, __c74, 14) })]);
    case 16:
      return S.suspend(() => S.Struct({ authorizationConfig: __S(2383, __c74, 15) })).annotate({
        identifier: "NewRelicServiceDetails",
      });
    case 17:
      return S.suspend(() => S.Struct({ type: S.optional(S.String) })).annotate({
        identifier: "EventChannelDetails",
      });
    case 18:
      return S.suspend(() =>
        S.Struct({ scopes: __S(32, __c1, 0), authorizationConfig: __S(2369, __c74, 1) }),
      ).annotate({ identifier: "PagerDutyDetails" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          region: S.String,
          service: S.String,
          roleArn: S.optional(S.String),
          mcpRoleArn: S.optional(S.String),
          customHeaders: S.optional(__S(1665, __c52, 1)),
        }),
      ).annotate({ identifier: "MCPServerSigV4AuthorizationConfig" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          endpoint: S.String,
          description: S.optional(SensitiveString),
          authorizationConfig: __S(2387, __c74, 19),
        }),
      ).annotate({ identifier: "MCPServerSigV4ServiceDetails" });
    case 21:
      return S.Union([
        /*@__PURE__*/ S.Struct({ apiKey: __S(2377, __c74, 9) }),
        /*@__PURE__*/ S.Struct({ oAuthClientCredentials: __S(2375, __c74, 7) }),
        /*@__PURE__*/ S.Struct({ bearerToken: __S(2378, __c74, 10) }),
      ]);
    case 22:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          endpoint: S.String,
          description: S.optional(SensitiveString),
          authorizationConfig: __S(2389, __c74, 21),
        }),
      ).annotate({ identifier: "RemoteAgentServiceDetails" });
    case 23:
      return S.suspend(() =>
        S.Struct({ region: S.String, service: S.String, roleArn: S.optional(S.String) }),
      ).annotate({ identifier: "RemoteAgentSigV4AuthorizationConfig" });
    case 24:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          endpoint: S.String,
          description: S.optional(SensitiveString),
          authorizationConfig: __S(2391, __c74, 23),
        }),
      ).annotate({ identifier: "RemoteAgentSigV4ServiceDetails" });
    case 25:
      return S.Union([
        /*@__PURE__*/ S.Struct({ dynatrace: __S(2370, __c74, 2) }),
        /*@__PURE__*/ S.Struct({ servicenow: __S(2371, __c74, 3) }),
        /*@__PURE__*/ S.Struct({ mcpserverdatadog: __S(2374, __c74, 6) }),
        /*@__PURE__*/ S.Struct({ mcpserver: __S(2380, __c74, 12) }),
        /*@__PURE__*/ S.Struct({ gitlab: __S(2381, __c74, 13) }),
        /*@__PURE__*/ S.Struct({ mcpserversplunk: __S(2380, __c74, 12) }),
        /*@__PURE__*/ S.Struct({ mcpservernewrelic: __S(2384, __c74, 16) }),
        /*@__PURE__*/ S.Struct({ eventChannel: __S(2385, __c74, 17) }),
        /*@__PURE__*/ S.Struct({ mcpservergrafana: __S(2380, __c74, 12) }),
        /*@__PURE__*/ S.Struct({ pagerduty: __S(2386, __c74, 18) }),
        /*@__PURE__*/ S.Struct({ azureidentity: __S(1664, __c52, 0) }),
        /*@__PURE__*/ S.Struct({ mcpserversigv4: __S(2388, __c74, 20) }),
        /*@__PURE__*/ S.Struct({ remoteagent: __S(2390, __c74, 22) }),
        /*@__PURE__*/ S.Struct({ remoteagentsigv4: __S(2392, __c74, 24) }),
      ]);
    case 26:
      return S.suspend(() =>
        S.Struct({
          service: S.String.pipe(T.HttpLabel("service")),
          serviceDetails: __S(2393, __c74, 25),
          kmsKeyArn: S.optional(S.String),
          privateConnectionName: S.optional(S.String),
          targetUrlPrivateConnectionName: S.optional(S.String),
          exchangeUrlPrivateConnectionName: S.optional(S.String),
          name: S.optional(S.String),
          tags: S.optional(__S(224, __c7, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/register/{service}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RegisterServiceInput" });
    case 27:
      return S.suspend(() => S.Struct({ authorizationUrl: S.String })).annotate({
        identifier: "OAuthAdditionalStepDetails",
      });
    case 28:
      return S.Union([/*@__PURE__*/ S.Struct({ oauth: __S(2395, __c74, 27) })]);
    case 29:
      return S.suspend(() =>
        S.Struct({
          serviceId: S.optional(S.String),
          additionalStep: S.optional(__S(2396, __c74, 28)),
          kmsKeyArn: S.optional(S.String),
          tags: S.optional(__S(224, __c7, 0)),
        }),
      ).annotate({ identifier: "RegisterServiceOutput" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          toolUseId: S.optional(S.String),
          interruptId: S.optional(S.String),
          approvalId: S.optional(S.String),
          buttonText: S.optional(S.String),
          action: S.optional(S.String),
        }),
      ).annotate({ identifier: "ApprovalAction" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          currentPage: S.optional(S.String),
          lastMessage: S.optional(S.String),
          userActionResponse: S.optional(S.String),
          approvalAction: S.optional(__S(2400, __c75, 0)),
        }),
      ).annotate({ identifier: "SendMessageContext" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          executionId: S.String,
          content: S.String,
          context: S.optional(__S(2401, __c75, 1)),
          userId: S.optional(S.String),
          assetIds: S.optional(__S(32, __c1, 0)),
          modelTier: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/agents/agent-space/{agentSpaceId}/chat/sendMessage" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SendMessageRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({ responseId: S.optional(S.String), sequenceNumber: S.optional(S.Number) }),
      ).annotate({ identifier: "SendMessageResponseCreatedEvent" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          inputTokens: S.optional(S.Number),
          outputTokens: S.optional(S.Number),
          totalTokens: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SendMessageUsageInfo" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          responseId: S.optional(S.String),
          usage: S.optional(__S(2404, __c75, 4)),
          sequenceNumber: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SendMessageResponseCompletedEvent" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          responseId: S.optional(S.String),
          errorCode: S.optional(S.String),
          errorMessage: S.optional(S.String),
          sequenceNumber: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SendMessageResponseFailedEvent" });
    case 7:
      return S.suspend(() =>
        S.Struct({ content: S.optional(S.String), sequenceNumber: S.optional(S.Number) }),
      ).annotate({ identifier: "SendMessageSummaryEvent" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          index: S.optional(S.Number),
          type: S.optional(S.String),
          id: S.optional(S.String),
          parentId: S.optional(S.String),
          sequenceNumber: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SendMessageContentBlockStartEvent" });
    case 9:
      return S.suspend(() => S.Struct({ text: S.optional(S.String) })).annotate({
        identifier: "SendMessageTextDelta",
      });
    case 10:
      return S.suspend(() => S.Struct({ partialJson: S.optional(S.String) })).annotate({
        identifier: "SendMessageJsonDelta",
      });
    case 11:
      return S.Union([
        /*@__PURE__*/ S.Struct({ textDelta: __S(2409, __c75, 9) }),
        /*@__PURE__*/ S.Struct({ jsonDelta: __S(2410, __c75, 10) }),
      ]);
    case 12:
      return S.suspend(() =>
        S.Struct({
          index: S.optional(S.Number),
          delta: S.optional(__S(2411, __c75, 11)),
          sequenceNumber: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SendMessageContentBlockDeltaEvent" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          index: S.optional(S.Number),
          type: S.optional(S.String),
          text: S.optional(S.String),
          last: S.optional(S.Boolean),
          sequenceNumber: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SendMessageContentBlockStopEvent" });
    case 14:
      return T.EventStream(
        /*@__PURE__*/ S.Union([
          /*@__PURE__*/ S.Struct({ responseCreated: __S(2403, __c75, 3) }),
          /*@__PURE__*/ S.Struct({ responseInProgress: __S(2403, __c75, 3) }),
          /*@__PURE__*/ S.Struct({ responseCompleted: __S(2405, __c75, 5) }),
          /*@__PURE__*/ S.Struct({ responseFailed: __S(2406, __c75, 6) }),
          /*@__PURE__*/ S.Struct({ summary: __S(2407, __c75, 7) }),
          /*@__PURE__*/ S.Struct({ heartbeat: __S(64, __c2, 0) }),
          /*@__PURE__*/ S.Struct({ contentBlockStart: __S(2408, __c75, 8) }),
          /*@__PURE__*/ S.Struct({ contentBlockDelta: __S(2412, __c75, 12) }),
          /*@__PURE__*/ S.Struct({ contentBlockStop: __S(2413, __c75, 13) }),
        ]),
      );
    case 15:
      return S.suspend(() =>
        S.Struct({ events: __S(2414, __c75, 14).pipe(T.HttpPayload()) }),
      ).annotate({ identifier: "SendMessageResponse" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(224, __c7, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(32, __c1, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          name: S.optional(S.String),
          description: S.optional(SensitiveString),
          locale: S.optional(S.String),
          preferences: S.optional(__S(288, __c9, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/v1/agentspaces/{agentSpaceId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAgentSpaceInput" });
    case 1:
      return S.suspend(() => S.Struct({ agentSpace: __S(289, __c9, 1) })).annotate({
        identifier: "UpdateAgentSpaceOutput",
      });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ tool: S.String, argumentPins: __S(224, __c7, 0) }),
      ).annotate({ identifier: "ApprovalPattern" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          approvalId: S.String.pipe(T.HttpLabel("approvalId")),
          action: S.String,
          finalPattern: S.optional(__S(2528, __c79, 0)),
          reason: S.optional(S.String),
          ttlSeconds: S.optional(S.Number),
          singleUse: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/agents/agent-space/{agentSpaceId}/approvals/{approvalId}/update-action",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateApprovalActionRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          approvalId: S.String,
          status: S.String,
          expiresAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "UpdateApprovalActionResponse" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          assetId: S.String.pipe(T.HttpLabel("assetId")),
          metadata: S.optional(S.Any),
          content: S.optional(__S(482, __c15, 2)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/asset/agent-space/{agentSpaceId}/assets/{assetId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAssetRequest" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          assetId: S.String.pipe(T.HttpLabel("assetId")),
          path: S.String.pipe(T.HttpLabel("path")),
          content: S.optional(__S(352, __c11, 0)),
          metadata: S.optional(S.Any),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/asset/agent-space/{agentSpaceId}/assets/{assetId}/files/{path+}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAssetFileRequest" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          associationId: S.String.pipe(T.HttpLabel("associationId")),
          configuration: __S(147, __c4, 19),
          capabilities: S.optional(__S(152, __c4, 24)),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/v1/agentspaces/{agentSpaceId}/associations/{associationId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAssociationInput" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          taskId: S.String.pipe(T.HttpLabel("taskId")),
          taskStatus: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/backlog/agent-space/{agentSpaceId}/tasks/{taskId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateBacklogTaskRequest" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ state: S.String })).annotate({
        identifier: "GoalScheduleInput",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          goalId: S.String.pipe(T.HttpLabel("goalId")),
          evaluationSchedule: S.optional(__S(2688, __c84, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/backlog/agent-space/{agentSpaceId}/goals/{goalId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateGoalRequest" });
    case 2:
      return S.suspend(() => S.Struct({ goal: __S(2050, __c64, 2) })).annotate({
        identifier: "UpdateGoalResponse",
      });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          idpClientSecret: S.optional(SensitiveString),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/v1/agentspaces/{agentSpaceId}/operator/idp" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateOperatorAppIdpConfigInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ agentSpaceId: S.String, idp: __S(1216, __c38, 0) }),
      ).annotate({ identifier: "UpdateOperatorAppIdpConfigOutput" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String.pipe(T.HttpLabel("name")), certificate: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/private-connections/{name}/certificate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdatePrivateConnectionCertificateInput" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          recommendationId: S.String.pipe(T.HttpLabel("recommendationId")),
          status: S.optional(S.String),
          additionalContext: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/backlog/agent-space/{agentSpaceId}/recommendations/{recommendationId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRecommendationRequest" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")),
          triggerId: S.String.pipe(T.HttpLabel("triggerId")),
          status: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/trigger/agent-space/{agentSpaceId}/triggers/{triggerId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateTriggerRequest" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ agentSpaceId: S.String.pipe(T.HttpLabel("agentSpaceId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/agentspaces/{agentSpaceId}/associations/validate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ValidateAwsAssociationsInput" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ path: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(2880, __c90, 0));
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
