import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "CloudWatch Events",
  target: "AWSEvents",
  version: "2015-10-07",
  sigv4: "events",
  protocol: awsJson1_1Protocol,
  xmlns: "http://events.amazonaws.com/doc/2015-10-07",
  rules: (p, _) => {
    const { Region, UseDualStack = false, UseFIPS = false, Endpoint } = p;
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
      if (UseDualStack === true) {
        return err(
          "Invalid Configuration: Dualstack and custom endpoint are not supported",
        );
      }
      return e(Endpoint);
    }
    if (Region != null) {
      {
        const PartitionResult = _.partition(Region);
        if (PartitionResult != null && PartitionResult !== false) {
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              return e(
                `https://events-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (Region === "us-gov-east-1") {
                return e("https://events.us-gov-east-1.amazonaws.com");
              }
              if (Region === "us-gov-west-1") {
                return e("https://events.us-gov-west-1.amazonaws.com");
              }
              return e(
                `https://events-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://events.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://events.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ConcurrentModificationException
  extends /*@__PURE__*/ TE.TaggedError("ConcurrentModificationException")<{
    readonly message?: string;
  }> {}
export class IllegalStatusException
  extends /*@__PURE__*/ TE.TaggedError("IllegalStatusException")<{
    readonly message?: string;
  }> {}
export class InternalException
  extends /*@__PURE__*/ TE.TaggedError("InternalException")<{
    readonly message?: string;
  }> {}
export class InvalidEventPatternException
  extends /*@__PURE__*/ TE.TaggedError("InvalidEventPatternException")<{
    readonly message?: string;
  }> {}
export class InvalidStateException
  extends /*@__PURE__*/ TE.TaggedError("InvalidStateException")<{
    readonly message?: string;
  }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("LimitExceededException")<{
    readonly message?: string;
  }> {}
export class ManagedRuleException
  extends /*@__PURE__*/ TE.TaggedError("ManagedRuleException")<{
    readonly message?: string;
  }> {}
export class OperationDisabledException
  extends /*@__PURE__*/ TE.TaggedError("OperationDisabledException")<{
    readonly message?: string;
  }> {}
export class PolicyLengthExceededException
  extends /*@__PURE__*/ TE.TaggedError("PolicyLengthExceededException")<{
    readonly message?: string;
  }> {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError("ResourceAlreadyExistsException", [
    "AlreadyExistsError",
  ])<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ResourceNotFoundException")<{
    readonly message?: string;
  }> {}
export type EventSourceName = string;
export interface ActivateEventSourceRequest {
  Name: string;
}
export interface ActivateEventSourceResponse {}
export type ReplayName = string;
export interface CancelReplayRequest {
  ReplayName: string;
}
export type ReplayArn = string;
export type ReplayState =
  | "STARTING"
  | "RUNNING"
  | "CANCELLING"
  | "COMPLETED"
  | "CANCELLED"
  | "FAILED"
  | (string & {});
export type ReplayStateReason = string;
export interface CancelReplayResponse {
  ReplayArn?: string;
  State?: ReplayState;
  StateReason?: string;
}
export type ApiDestinationName = string;
export type ApiDestinationDescription = string;
export type ConnectionArn = string;
export type HttpsEndpoint = string;
export type ApiDestinationHttpMethod =
  | "POST"
  | "GET"
  | "HEAD"
  | "OPTIONS"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | (string & {});
export type ApiDestinationInvocationRateLimitPerSecond = number;
export interface CreateApiDestinationRequest {
  Name: string;
  Description?: string;
  ConnectionArn: string;
  InvocationEndpoint: string;
  HttpMethod: ApiDestinationHttpMethod;
  InvocationRateLimitPerSecond?: number;
}
export type ApiDestinationArn = string;
export type ApiDestinationState = "ACTIVE" | "INACTIVE" | (string & {});
export interface CreateApiDestinationResponse {
  ApiDestinationArn?: string;
  ApiDestinationState?: ApiDestinationState;
  CreationTime?: Date;
  LastModifiedTime?: Date;
}
export type ArchiveName = string;
export type Arn = string;
export type ArchiveDescription = string;
export type EventPattern = string;
export type RetentionDays = number;
export interface CreateArchiveRequest {
  ArchiveName: string;
  EventSourceArn: string;
  Description?: string;
  EventPattern?: string;
  RetentionDays?: number;
}
export type ArchiveArn = string;
export type ArchiveState =
  | "ENABLED"
  | "DISABLED"
  | "CREATING"
  | "UPDATING"
  | "CREATE_FAILED"
  | "UPDATE_FAILED"
  | (string & {});
export type ArchiveStateReason = string;
export interface CreateArchiveResponse {
  ArchiveArn?: string;
  State?: ArchiveState;
  StateReason?: string;
  CreationTime?: Date;
}
export type ConnectionName = string;
export type ConnectionDescription = string;
export type ConnectionAuthorizationType =
  | "BASIC"
  | "OAUTH_CLIENT_CREDENTIALS"
  | "API_KEY"
  | (string & {});
export type AuthHeaderParameters = string;
export type AuthHeaderParametersSensitive = string | redacted.Redacted<string>;
export interface CreateConnectionBasicAuthRequestParameters {
  Username: string;
  Password: string | redacted.Redacted<string>;
}
export interface CreateConnectionOAuthClientRequestParameters {
  ClientID: string;
  ClientSecret: string | redacted.Redacted<string>;
}
export type ConnectionOAuthHttpMethod = "GET" | "POST" | "PUT" | (string & {});
export type HeaderKey = string;
export type HeaderValueSensitive = string | redacted.Redacted<string>;
export interface ConnectionHeaderParameter {
  Key?: string;
  Value?: string | redacted.Redacted<string>;
  IsValueSecret?: boolean;
}
export type ConnectionHeaderParametersList = ConnectionHeaderParameter[];
export type QueryStringKey = string;
export type QueryStringValueSensitive = string | redacted.Redacted<string>;
export interface ConnectionQueryStringParameter {
  Key?: string;
  Value?: string | redacted.Redacted<string>;
  IsValueSecret?: boolean;
}
export type ConnectionQueryStringParametersList =
  ConnectionQueryStringParameter[];
export type SensitiveString = string | redacted.Redacted<string>;
export interface ConnectionBodyParameter {
  Key?: string;
  Value?: string | redacted.Redacted<string>;
  IsValueSecret?: boolean;
}
export type ConnectionBodyParametersList = ConnectionBodyParameter[];
export interface ConnectionHttpParameters {
  HeaderParameters?: ConnectionHeaderParameter[];
  QueryStringParameters?: ConnectionQueryStringParameter[];
  BodyParameters?: ConnectionBodyParameter[];
}
export interface CreateConnectionOAuthRequestParameters {
  ClientParameters: CreateConnectionOAuthClientRequestParameters;
  AuthorizationEndpoint: string;
  HttpMethod: ConnectionOAuthHttpMethod;
  OAuthHttpParameters?: ConnectionHttpParameters;
}
export interface CreateConnectionApiKeyAuthRequestParameters {
  ApiKeyName: string;
  ApiKeyValue: string | redacted.Redacted<string>;
}
export interface CreateConnectionAuthRequestParameters {
  BasicAuthParameters?: CreateConnectionBasicAuthRequestParameters;
  OAuthParameters?: CreateConnectionOAuthRequestParameters;
  ApiKeyAuthParameters?: CreateConnectionApiKeyAuthRequestParameters;
  InvocationHttpParameters?: ConnectionHttpParameters;
}
export interface CreateConnectionRequest {
  Name: string;
  Description?: string;
  AuthorizationType: ConnectionAuthorizationType;
  AuthParameters: CreateConnectionAuthRequestParameters;
}
export type ConnectionState =
  | "CREATING"
  | "UPDATING"
  | "DELETING"
  | "AUTHORIZED"
  | "DEAUTHORIZED"
  | "AUTHORIZING"
  | "DEAUTHORIZING"
  | (string & {});
export interface CreateConnectionResponse {
  ConnectionArn?: string;
  ConnectionState?: ConnectionState;
  CreationTime?: Date;
  LastModifiedTime?: Date;
}
export type EventBusName = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface CreateEventBusRequest {
  Name: string;
  EventSourceName?: string;
  Tags?: Tag[];
}
export interface CreateEventBusResponse {
  EventBusArn?: string;
}
export type AccountId = string;
export interface CreatePartnerEventSourceRequest {
  Name: string;
  Account: string;
}
export interface CreatePartnerEventSourceResponse {
  EventSourceArn?: string;
}
export interface DeactivateEventSourceRequest {
  Name: string;
}
export interface DeactivateEventSourceResponse {}
export interface DeauthorizeConnectionRequest {
  Name: string;
}
export interface DeauthorizeConnectionResponse {
  ConnectionArn?: string;
  ConnectionState?: ConnectionState;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  LastAuthorizedTime?: Date;
}
export interface DeleteApiDestinationRequest {
  Name: string;
}
export interface DeleteApiDestinationResponse {}
export interface DeleteArchiveRequest {
  ArchiveName: string;
}
export interface DeleteArchiveResponse {}
export interface DeleteConnectionRequest {
  Name: string;
}
export interface DeleteConnectionResponse {
  ConnectionArn?: string;
  ConnectionState?: ConnectionState;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  LastAuthorizedTime?: Date;
}
export interface DeleteEventBusRequest {
  Name: string;
}
export interface DeleteEventBusResponse {}
export interface DeletePartnerEventSourceRequest {
  Name: string;
  Account: string;
}
export interface DeletePartnerEventSourceResponse {}
export type RuleName = string;
export type EventBusNameOrArn = string;
export interface DeleteRuleRequest {
  Name: string;
  EventBusName?: string;
  Force?: boolean;
}
export interface DeleteRuleResponse {}
export interface DescribeApiDestinationRequest {
  Name: string;
}
export interface DescribeApiDestinationResponse {
  ApiDestinationArn?: string;
  Name?: string;
  Description?: string;
  ApiDestinationState?: ApiDestinationState;
  ConnectionArn?: string;
  InvocationEndpoint?: string;
  HttpMethod?: ApiDestinationHttpMethod;
  InvocationRateLimitPerSecond?: number;
  CreationTime?: Date;
  LastModifiedTime?: Date;
}
export interface DescribeArchiveRequest {
  ArchiveName: string;
}
export interface DescribeArchiveResponse {
  ArchiveArn?: string;
  ArchiveName?: string;
  EventSourceArn?: string;
  Description?: string;
  EventPattern?: string;
  State?: ArchiveState;
  StateReason?: string;
  RetentionDays?: number;
  SizeBytes?: number;
  EventCount?: number;
  CreationTime?: Date;
}
export interface DescribeConnectionRequest {
  Name: string;
}
export type ConnectionStateReason = string;
export type SecretsManagerSecretArn = string;
export interface ConnectionBasicAuthResponseParameters {
  Username?: string;
}
export interface ConnectionOAuthClientResponseParameters {
  ClientID?: string;
}
export interface ConnectionOAuthResponseParameters {
  ClientParameters?: ConnectionOAuthClientResponseParameters;
  AuthorizationEndpoint?: string;
  HttpMethod?: ConnectionOAuthHttpMethod;
  OAuthHttpParameters?: ConnectionHttpParameters;
}
export interface ConnectionApiKeyAuthResponseParameters {
  ApiKeyName?: string;
}
export interface ConnectionAuthResponseParameters {
  BasicAuthParameters?: ConnectionBasicAuthResponseParameters;
  OAuthParameters?: ConnectionOAuthResponseParameters;
  ApiKeyAuthParameters?: ConnectionApiKeyAuthResponseParameters;
  InvocationHttpParameters?: ConnectionHttpParameters;
}
export interface DescribeConnectionResponse {
  ConnectionArn?: string;
  Name?: string;
  Description?: string;
  ConnectionState?: ConnectionState;
  StateReason?: string;
  AuthorizationType?: ConnectionAuthorizationType;
  SecretArn?: string;
  AuthParameters?: ConnectionAuthResponseParameters;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  LastAuthorizedTime?: Date;
}
export interface DescribeEventBusRequest {
  Name?: string;
}
export interface DescribeEventBusResponse {
  Name?: string;
  Arn?: string;
  Policy?: string;
}
export interface DescribeEventSourceRequest {
  Name: string;
}
export type EventSourceState = "PENDING" | "ACTIVE" | "DELETED" | (string & {});
export interface DescribeEventSourceResponse {
  Arn?: string;
  CreatedBy?: string;
  CreationTime?: Date;
  ExpirationTime?: Date;
  Name?: string;
  State?: EventSourceState;
}
export interface DescribePartnerEventSourceRequest {
  Name: string;
}
export interface DescribePartnerEventSourceResponse {
  Arn?: string;
  Name?: string;
}
export interface DescribeReplayRequest {
  ReplayName: string;
}
export type ReplayDescription = string;
export type ReplayDestinationFilters = string[];
export interface ReplayDestination {
  Arn: string;
  FilterArns?: string[];
}
export interface DescribeReplayResponse {
  ReplayName?: string;
  ReplayArn?: string;
  Description?: string;
  State?: ReplayState;
  StateReason?: string;
  EventSourceArn?: string;
  Destination?: ReplayDestination;
  EventStartTime?: Date;
  EventEndTime?: Date;
  EventLastReplayedTime?: Date;
  ReplayStartTime?: Date;
  ReplayEndTime?: Date;
}
export interface DescribeRuleRequest {
  Name: string;
  EventBusName?: string;
}
export type RuleArn = string;
export type ScheduleExpression = string;
export type RuleState = "ENABLED" | "DISABLED" | (string & {});
export type RuleDescription = string;
export type RoleArn = string;
export type ManagedBy = string;
export type CreatedBy = string;
export interface DescribeRuleResponse {
  Name?: string;
  Arn?: string;
  EventPattern?: string;
  ScheduleExpression?: string;
  State?: RuleState;
  Description?: string;
  RoleArn?: string;
  ManagedBy?: string;
  EventBusName?: string;
  CreatedBy?: string;
}
export interface DisableRuleRequest {
  Name: string;
  EventBusName?: string;
}
export interface DisableRuleResponse {}
export interface EnableRuleRequest {
  Name: string;
  EventBusName?: string;
}
export interface EnableRuleResponse {}
export type NextToken = string;
export type LimitMax100 = number;
export interface ListApiDestinationsRequest {
  NamePrefix?: string;
  ConnectionArn?: string;
  NextToken?: string;
  Limit?: number;
}
export interface ApiDestination {
  ApiDestinationArn?: string;
  Name?: string;
  ApiDestinationState?: ApiDestinationState;
  ConnectionArn?: string;
  InvocationEndpoint?: string;
  HttpMethod?: ApiDestinationHttpMethod;
  InvocationRateLimitPerSecond?: number;
  CreationTime?: Date;
  LastModifiedTime?: Date;
}
export type ApiDestinationResponseList = ApiDestination[];
export interface ListApiDestinationsResponse {
  ApiDestinations?: ApiDestination[];
  NextToken?: string;
}
export interface ListArchivesRequest {
  NamePrefix?: string;
  EventSourceArn?: string;
  State?: ArchiveState;
  NextToken?: string;
  Limit?: number;
}
export interface Archive {
  ArchiveName?: string;
  EventSourceArn?: string;
  State?: ArchiveState;
  StateReason?: string;
  RetentionDays?: number;
  SizeBytes?: number;
  EventCount?: number;
  CreationTime?: Date;
}
export type ArchiveResponseList = Archive[];
export interface ListArchivesResponse {
  Archives?: Archive[];
  NextToken?: string;
}
export interface ListConnectionsRequest {
  NamePrefix?: string;
  ConnectionState?: ConnectionState;
  NextToken?: string;
  Limit?: number;
}
export interface Connection {
  ConnectionArn?: string;
  Name?: string;
  ConnectionState?: ConnectionState;
  StateReason?: string;
  AuthorizationType?: ConnectionAuthorizationType;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  LastAuthorizedTime?: Date;
}
export type ConnectionResponseList = Connection[];
export interface ListConnectionsResponse {
  Connections?: Connection[];
  NextToken?: string;
}
export interface ListEventBusesRequest {
  NamePrefix?: string;
  NextToken?: string;
  Limit?: number;
}
export interface EventBus {
  Name?: string;
  Arn?: string;
  Policy?: string;
}
export type EventBusList = EventBus[];
export interface ListEventBusesResponse {
  EventBuses?: EventBus[];
  NextToken?: string;
}
export type EventSourceNamePrefix = string;
export interface ListEventSourcesRequest {
  NamePrefix?: string;
  NextToken?: string;
  Limit?: number;
}
export interface EventSource {
  Arn?: string;
  CreatedBy?: string;
  CreationTime?: Date;
  ExpirationTime?: Date;
  Name?: string;
  State?: EventSourceState;
}
export type EventSourceList = EventSource[];
export interface ListEventSourcesResponse {
  EventSources?: EventSource[];
  NextToken?: string;
}
export interface ListPartnerEventSourceAccountsRequest {
  EventSourceName: string;
  NextToken?: string;
  Limit?: number;
}
export interface PartnerEventSourceAccount {
  Account?: string;
  CreationTime?: Date;
  ExpirationTime?: Date;
  State?: EventSourceState;
}
export type PartnerEventSourceAccountList = PartnerEventSourceAccount[];
export interface ListPartnerEventSourceAccountsResponse {
  PartnerEventSourceAccounts?: PartnerEventSourceAccount[];
  NextToken?: string;
}
export type PartnerEventSourceNamePrefix = string;
export interface ListPartnerEventSourcesRequest {
  NamePrefix: string;
  NextToken?: string;
  Limit?: number;
}
export interface PartnerEventSource {
  Arn?: string;
  Name?: string;
}
export type PartnerEventSourceList = PartnerEventSource[];
export interface ListPartnerEventSourcesResponse {
  PartnerEventSources?: PartnerEventSource[];
  NextToken?: string;
}
export interface ListReplaysRequest {
  NamePrefix?: string;
  State?: ReplayState;
  EventSourceArn?: string;
  NextToken?: string;
  Limit?: number;
}
export interface Replay {
  ReplayName?: string;
  EventSourceArn?: string;
  State?: ReplayState;
  StateReason?: string;
  EventStartTime?: Date;
  EventEndTime?: Date;
  EventLastReplayedTime?: Date;
  ReplayStartTime?: Date;
  ReplayEndTime?: Date;
}
export type ReplayList = Replay[];
export interface ListReplaysResponse {
  Replays?: Replay[];
  NextToken?: string;
}
export type TargetArn = string;
export interface ListRuleNamesByTargetRequest {
  TargetArn: string;
  EventBusName?: string;
  NextToken?: string;
  Limit?: number;
}
export type RuleNameList = string[];
export interface ListRuleNamesByTargetResponse {
  RuleNames?: string[];
  NextToken?: string;
}
export interface ListRulesRequest {
  NamePrefix?: string;
  EventBusName?: string;
  NextToken?: string;
  Limit?: number;
}
export interface Rule {
  Name?: string;
  Arn?: string;
  EventPattern?: string;
  State?: RuleState;
  Description?: string;
  ScheduleExpression?: string;
  RoleArn?: string;
  ManagedBy?: string;
  EventBusName?: string;
}
export type RuleResponseList = Rule[];
export interface ListRulesResponse {
  Rules?: Rule[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export interface ListTargetsByRuleRequest {
  Rule: string;
  EventBusName?: string;
  NextToken?: string;
  Limit?: number;
}
export type TargetId = string;
export type TargetInput = string;
export type TargetInputPath = string;
export type InputTransformerPathKey = string;
export type TransformerPaths = { [key: string]: string | undefined };
export type TransformerInput = string;
export interface InputTransformer {
  InputPathsMap?: { [key: string]: string | undefined };
  InputTemplate: string;
}
export type TargetPartitionKeyPath = string;
export interface KinesisParameters {
  PartitionKeyPath: string;
}
export type RunCommandTargetKey = string;
export type RunCommandTargetValue = string;
export type RunCommandTargetValues = string[];
export interface RunCommandTarget {
  Key: string;
  Values: string[];
}
export type RunCommandTargets = RunCommandTarget[];
export interface RunCommandParameters {
  RunCommandTargets: RunCommandTarget[];
}
export type LimitMin1 = number;
export type LaunchType = "EC2" | "FARGATE" | "EXTERNAL" | (string & {});
export type StringList = string[];
export type AssignPublicIp = "ENABLED" | "DISABLED" | (string & {});
export interface AwsVpcConfiguration {
  Subnets: string[];
  SecurityGroups?: string[];
  AssignPublicIp?: AssignPublicIp;
}
export interface NetworkConfiguration {
  awsvpcConfiguration?: AwsVpcConfiguration;
}
export type CapacityProvider = string;
export type CapacityProviderStrategyItemWeight = number;
export type CapacityProviderStrategyItemBase = number;
export interface CapacityProviderStrategyItem {
  capacityProvider: string;
  weight?: number;
  base?: number;
}
export type CapacityProviderStrategy = CapacityProviderStrategyItem[];
export type PlacementConstraintType =
  | "distinctInstance"
  | "memberOf"
  | (string & {});
export type PlacementConstraintExpression = string;
export interface PlacementConstraint {
  type?: PlacementConstraintType;
  expression?: string;
}
export type PlacementConstraints = PlacementConstraint[];
export type PlacementStrategyType =
  | "random"
  | "spread"
  | "binpack"
  | (string & {});
export type PlacementStrategyField = string;
export interface PlacementStrategy {
  type?: PlacementStrategyType;
  field?: string;
}
export type PlacementStrategies = PlacementStrategy[];
export type PropagateTags = "TASK_DEFINITION" | (string & {});
export type ReferenceId = string;
export interface EcsParameters {
  TaskDefinitionArn: string;
  TaskCount?: number;
  LaunchType?: LaunchType;
  NetworkConfiguration?: NetworkConfiguration;
  PlatformVersion?: string;
  Group?: string;
  CapacityProviderStrategy?: CapacityProviderStrategyItem[];
  EnableECSManagedTags?: boolean;
  EnableExecuteCommand?: boolean;
  PlacementConstraints?: PlacementConstraint[];
  PlacementStrategy?: PlacementStrategy[];
  PropagateTags?: PropagateTags;
  ReferenceId?: string;
  Tags?: Tag[];
}
export interface BatchArrayProperties {
  Size?: number;
}
export interface BatchRetryStrategy {
  Attempts?: number;
}
export interface BatchParameters {
  JobDefinition: string;
  JobName: string;
  ArrayProperties?: BatchArrayProperties;
  RetryStrategy?: BatchRetryStrategy;
}
export type MessageGroupId = string;
export interface SqsParameters {
  MessageGroupId?: string;
}
export type PathParameter = string;
export type PathParameterList = string[];
export type HeaderValue = string;
export type HeaderParametersMap = { [key: string]: string | undefined };
export type QueryStringValue = string;
export type QueryStringParametersMap = { [key: string]: string | undefined };
export interface HttpParameters {
  PathParameterValues?: string[];
  HeaderParameters?: { [key: string]: string | undefined };
  QueryStringParameters?: { [key: string]: string | undefined };
}
export type RedshiftSecretManagerArn = string;
export type Database = string;
export type DbUser = string;
export type Sql = string;
export type StatementName = string;
export interface RedshiftDataParameters {
  SecretManagerArn?: string;
  Database: string;
  DbUser?: string;
  Sql: string;
  StatementName?: string;
  WithEvent?: boolean;
}
export type SageMakerPipelineParameterName = string;
export type SageMakerPipelineParameterValue = string;
export interface SageMakerPipelineParameter {
  Name: string;
  Value: string;
}
export type SageMakerPipelineParameterList = SageMakerPipelineParameter[];
export interface SageMakerPipelineParameters {
  PipelineParameterList?: SageMakerPipelineParameter[];
}
export type ResourceArn = string;
export interface DeadLetterConfig {
  Arn?: string;
}
export type MaximumRetryAttempts = number;
export type MaximumEventAgeInSeconds = number;
export interface RetryPolicy {
  MaximumRetryAttempts?: number;
  MaximumEventAgeInSeconds?: number;
}
export interface Target {
  Id: string;
  Arn: string;
  RoleArn?: string;
  Input?: string;
  InputPath?: string;
  InputTransformer?: InputTransformer;
  KinesisParameters?: KinesisParameters;
  RunCommandParameters?: RunCommandParameters;
  EcsParameters?: EcsParameters;
  BatchParameters?: BatchParameters;
  SqsParameters?: SqsParameters;
  HttpParameters?: HttpParameters;
  RedshiftDataParameters?: RedshiftDataParameters;
  SageMakerPipelineParameters?: SageMakerPipelineParameters;
  DeadLetterConfig?: DeadLetterConfig;
  RetryPolicy?: RetryPolicy;
}
export type TargetList = Target[];
export interface ListTargetsByRuleResponse {
  Targets?: Target[];
  NextToken?: string;
}
export type EventTime = Date;
export type EventResource = string;
export type EventResourceList = string[];
export type NonPartnerEventBusNameOrArn = string;
export type TraceHeader = string;
export interface PutEventsRequestEntry {
  Time?: Date;
  Source?: string;
  Resources?: string[];
  DetailType?: string;
  Detail?: string;
  EventBusName?: string;
  TraceHeader?: string;
}
export type PutEventsRequestEntryList = PutEventsRequestEntry[];
export interface PutEventsRequest {
  Entries: PutEventsRequestEntry[];
}
export type EventId = string;
export type ErrorCode = string;
export type ErrorMessage = string;
export interface PutEventsResultEntry {
  EventId?: string;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export type PutEventsResultEntryList = PutEventsResultEntry[];
export interface PutEventsResponse {
  FailedEntryCount?: number;
  Entries?: PutEventsResultEntry[];
}
export interface PutPartnerEventsRequestEntry {
  Time?: Date;
  Source?: string;
  Resources?: string[];
  DetailType?: string;
  Detail?: string;
}
export type PutPartnerEventsRequestEntryList = PutPartnerEventsRequestEntry[];
export interface PutPartnerEventsRequest {
  Entries: PutPartnerEventsRequestEntry[];
}
export interface PutPartnerEventsResultEntry {
  EventId?: string;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export type PutPartnerEventsResultEntryList = PutPartnerEventsResultEntry[];
export interface PutPartnerEventsResponse {
  FailedEntryCount?: number;
  Entries?: PutPartnerEventsResultEntry[];
}
export type NonPartnerEventBusName = string;
export type Action = string;
export type Principal = string;
export type StatementId = string;
export interface Condition {
  Type: string;
  Key: string;
  Value: string;
}
export interface PutPermissionRequest {
  EventBusName?: string;
  Action?: string;
  Principal?: string;
  StatementId?: string;
  Condition?: Condition;
  Policy?: string;
}
export interface PutPermissionResponse {}
export interface PutRuleRequest {
  Name: string;
  ScheduleExpression?: string;
  EventPattern?: string;
  State?: RuleState;
  Description?: string;
  RoleArn?: string;
  Tags?: Tag[];
  EventBusName?: string;
}
export interface PutRuleResponse {
  RuleArn?: string;
}
export interface PutTargetsRequest {
  Rule: string;
  EventBusName?: string;
  Targets: Target[];
}
export interface PutTargetsResultEntry {
  TargetId?: string;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export type PutTargetsResultEntryList = PutTargetsResultEntry[];
export interface PutTargetsResponse {
  FailedEntryCount?: number;
  FailedEntries?: PutTargetsResultEntry[];
}
export interface RemovePermissionRequest {
  StatementId?: string;
  RemoveAllPermissions?: boolean;
  EventBusName?: string;
}
export interface RemovePermissionResponse {}
export type TargetIdList = string[];
export interface RemoveTargetsRequest {
  Rule: string;
  EventBusName?: string;
  Ids: string[];
  Force?: boolean;
}
export interface RemoveTargetsResultEntry {
  TargetId?: string;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export type RemoveTargetsResultEntryList = RemoveTargetsResultEntry[];
export interface RemoveTargetsResponse {
  FailedEntryCount?: number;
  FailedEntries?: RemoveTargetsResultEntry[];
}
export interface StartReplayRequest {
  ReplayName: string;
  Description?: string;
  EventSourceArn: string;
  EventStartTime: Date;
  EventEndTime: Date;
  Destination: ReplayDestination;
}
export interface StartReplayResponse {
  ReplayArn?: string;
  State?: ReplayState;
  StateReason?: string;
  ReplayStartTime?: Date;
}
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export interface TestEventPatternRequest {
  EventPattern: string;
  Event: string;
}
export interface TestEventPatternResponse {
  Result?: boolean;
}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceARN: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateApiDestinationRequest {
  Name: string;
  Description?: string;
  ConnectionArn?: string;
  InvocationEndpoint?: string;
  HttpMethod?: ApiDestinationHttpMethod;
  InvocationRateLimitPerSecond?: number;
}
export interface UpdateApiDestinationResponse {
  ApiDestinationArn?: string;
  ApiDestinationState?: ApiDestinationState;
  CreationTime?: Date;
  LastModifiedTime?: Date;
}
export interface UpdateArchiveRequest {
  ArchiveName: string;
  Description?: string;
  EventPattern?: string;
  RetentionDays?: number;
}
export interface UpdateArchiveResponse {
  ArchiveArn?: string;
  State?: ArchiveState;
  StateReason?: string;
  CreationTime?: Date;
}
export interface UpdateConnectionBasicAuthRequestParameters {
  Username?: string;
  Password?: string | redacted.Redacted<string>;
}
export interface UpdateConnectionOAuthClientRequestParameters {
  ClientID?: string;
  ClientSecret?: string | redacted.Redacted<string>;
}
export interface UpdateConnectionOAuthRequestParameters {
  ClientParameters?: UpdateConnectionOAuthClientRequestParameters;
  AuthorizationEndpoint?: string;
  HttpMethod?: ConnectionOAuthHttpMethod;
  OAuthHttpParameters?: ConnectionHttpParameters;
}
export interface UpdateConnectionApiKeyAuthRequestParameters {
  ApiKeyName?: string;
  ApiKeyValue?: string | redacted.Redacted<string>;
}
export interface UpdateConnectionAuthRequestParameters {
  BasicAuthParameters?: UpdateConnectionBasicAuthRequestParameters;
  OAuthParameters?: UpdateConnectionOAuthRequestParameters;
  ApiKeyAuthParameters?: UpdateConnectionApiKeyAuthRequestParameters;
  InvocationHttpParameters?: ConnectionHttpParameters;
}
export interface UpdateConnectionRequest {
  Name: string;
  Description?: string;
  AuthorizationType?: ConnectionAuthorizationType;
  AuthParameters?: UpdateConnectionAuthRequestParameters;
}
export interface UpdateConnectionResponse {
  ConnectionArn?: string;
  ConnectionState?: ConnectionState;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  LastAuthorizedTime?: Date;
}
export type ActivateEventSourceError =
  | ConcurrentModificationException
  | InternalException
  | InvalidStateException
  | OperationDisabledException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Activates a partner event source that has been deactivated. Once activated, your matching
 * event bus will start receiving events from the event source.
 */
export const activateEventSource: API.OperationMethod<
  ActivateEventSourceRequest,
  ActivateEventSourceResponse,
  ActivateEventSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [
    ConcurrentModificationException,
    InternalException,
    InvalidStateException,
    OperationDisabledException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ActivateEventSource",
})) as any;

export type CancelReplayError =
  | ConcurrentModificationException
  | IllegalStatusException
  | InternalException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Cancels the specified replay.
 */
export const cancelReplay: API.OperationMethod<
  CancelReplayRequest,
  CancelReplayResponse,
  CancelReplayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ReplayName: 0 } },
  errors: [
    ConcurrentModificationException,
    IllegalStatusException,
    InternalException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelReplay",
})) as any;

export type CreateApiDestinationError =
  | InternalException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates an API destination, which is an HTTP invocation endpoint configured as a target
 * for events.
 */
export const createApiDestination: API.OperationMethod<
  CreateApiDestinationRequest,
  CreateApiDestinationResponse,
  CreateApiDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Description: 0,
      ConnectionArn: 0,
      InvocationEndpoint: 0,
      HttpMethod: 0,
      InvocationRateLimitPerSecond: 0,
    },
    output: { CreationTime: D.ts, LastModifiedTime: D.ts },
  },
  errors: [
    InternalException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApiDestination",
})) as any;

export type CreateArchiveError =
  | ConcurrentModificationException
  | InternalException
  | InvalidEventPatternException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates an archive of events with the specified settings. When you create an archive,
 * incoming events might not immediately start being sent to the archive. Allow a short period of
 * time for changes to take effect. If you do not specify a pattern to filter events sent to the
 * archive, all events are sent to the archive except replayed events. Replayed events are not
 * sent to an archive.
 */
export const createArchive: API.OperationMethod<
  CreateArchiveRequest,
  CreateArchiveResponse,
  CreateArchiveError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ArchiveName: 0,
      EventSourceArn: 0,
      Description: 0,
      EventPattern: 0,
      RetentionDays: 0,
    },
    output: { CreationTime: D.ts },
  },
  errors: [
    ConcurrentModificationException,
    InternalException,
    InvalidEventPatternException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateArchive",
})) as any;

export type CreateConnectionError =
  | InternalException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | CommonErrors;
/**
 * Creates a connection. A connection defines the authorization type and credentials to use
 * for authorization with an API destination HTTP endpoint.
 */
export const createConnection: API.OperationMethod<
  CreateConnectionRequest,
  CreateConnectionResponse,
  CreateConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Description: 0,
      AuthorizationType: 0,
      AuthParameters: {
        BasicAuthParameters: { Username: 0, Password: 0 },
        OAuthParameters: {
          ClientParameters: { ClientID: 0, ClientSecret: 0 },
          AuthorizationEndpoint: 0,
          HttpMethod: 0,
          OAuthHttpParameters: i_ConnectionHttpParameters,
        },
        ApiKeyAuthParameters: { ApiKeyName: 0, ApiKeyValue: 0 },
        InvocationHttpParameters: i_ConnectionHttpParameters,
      },
    },
    output: { CreationTime: D.ts, LastModifiedTime: D.ts },
  },
  errors: [
    InternalException,
    LimitExceededException,
    ResourceAlreadyExistsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnection",
})) as any;

export type CreateEventBusError =
  | ConcurrentModificationException
  | InternalException
  | InvalidStateException
  | LimitExceededException
  | OperationDisabledException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a new event bus within your account. This can be a custom event bus which you can
 * use to receive events from your custom applications and services, or it can be a partner event
 * bus which can be matched to a partner event source.
 */
export const createEventBus: API.OperationMethod<
  CreateEventBusRequest,
  CreateEventBusResponse,
  CreateEventBusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, EventSourceName: 0, Tags: D.list(i_Tag) },
  },
  errors: [
    ConcurrentModificationException,
    InternalException,
    InvalidStateException,
    LimitExceededException,
    OperationDisabledException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEventBus",
})) as any;

export type CreatePartnerEventSourceError =
  | ConcurrentModificationException
  | InternalException
  | LimitExceededException
  | OperationDisabledException
  | ResourceAlreadyExistsException
  | CommonErrors;
/**
 * Called by an SaaS partner to create a partner event source. This operation is not used by
 * Amazon Web Services customers.
 *
 * Each partner event source can be used by one Amazon Web Services account to create a matching partner
 * event bus in that Amazon Web Services account. A SaaS partner must create one partner event source for each
 * Amazon Web Services account that wants to receive those event types.
 *
 * A partner event source creates events based on resources within the SaaS partner's service
 * or application.
 *
 * An Amazon Web Services account that creates a partner event bus that matches the partner event source can
 * use that event bus to receive events from the partner, and then process them using Amazon Web Services Events
 * rules and targets.
 *
 * Partner event source names follow this format:
 *
 * *partner_name*\/*event_namespace*\/*event_name*
 *
 * *partner_name* is determined during partner registration and identifies
 * the partner to Amazon Web Services customers. *event_namespace* is determined by the
 * partner and is a way for the partner to categorize their events.
 * *event_name* is determined by the partner, and should uniquely identify
 * an event-generating resource within the partner system. The combination of
 * *event_namespace* and *event_name* should help Amazon Web Services
 * customers decide whether to create an event bus to receive these events.
 */
export const createPartnerEventSource: API.OperationMethod<
  CreatePartnerEventSourceRequest,
  CreatePartnerEventSourceResponse,
  CreatePartnerEventSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0, Account: 0 } },
  errors: [
    ConcurrentModificationException,
    InternalException,
    LimitExceededException,
    OperationDisabledException,
    ResourceAlreadyExistsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePartnerEventSource",
})) as any;

export type DeactivateEventSourceError =
  | ConcurrentModificationException
  | InternalException
  | InvalidStateException
  | OperationDisabledException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * You can use this operation to temporarily stop receiving events from the specified partner
 * event source. The matching event bus is not deleted.
 *
 * When you deactivate a partner event source, the source goes into PENDING state. If it
 * remains in PENDING state for more than two weeks, it is deleted.
 *
 * To activate a deactivated partner event source, use ActivateEventSource.
 */
export const deactivateEventSource: API.OperationMethod<
  DeactivateEventSourceRequest,
  DeactivateEventSourceResponse,
  DeactivateEventSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [
    ConcurrentModificationException,
    InternalException,
    InvalidStateException,
    OperationDisabledException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeactivateEventSource",
})) as any;

export type DeauthorizeConnectionError =
  | ConcurrentModificationException
  | InternalException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes all authorization parameters from the connection. This lets you remove the secret
 * from the connection so you can reuse it without having to create a new connection.
 */
export const deauthorizeConnection: API.OperationMethod<
  DeauthorizeConnectionRequest,
  DeauthorizeConnectionResponse,
  DeauthorizeConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0 },
    output: {
      CreationTime: D.ts,
      LastModifiedTime: D.ts,
      LastAuthorizedTime: D.ts,
    },
  },
  errors: [
    ConcurrentModificationException,
    InternalException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeauthorizeConnection",
})) as any;

export type DeleteApiDestinationError =
  | ConcurrentModificationException
  | InternalException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified API destination.
 */
export const deleteApiDestination: API.OperationMethod<
  DeleteApiDestinationRequest,
  DeleteApiDestinationResponse,
  DeleteApiDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [
    ConcurrentModificationException,
    InternalException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApiDestination",
})) as any;

export type DeleteArchiveError =
  | ConcurrentModificationException
  | InternalException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified archive.
 */
export const deleteArchive: API.OperationMethod<
  DeleteArchiveRequest,
  DeleteArchiveResponse,
  DeleteArchiveError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ArchiveName: 0 } },
  errors: [
    ConcurrentModificationException,
    InternalException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteArchive",
})) as any;

export type DeleteConnectionError =
  | ConcurrentModificationException
  | InternalException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a connection.
 */
export const deleteConnection: API.OperationMethod<
  DeleteConnectionRequest,
  DeleteConnectionResponse,
  DeleteConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0 },
    output: {
      CreationTime: D.ts,
      LastModifiedTime: D.ts,
      LastAuthorizedTime: D.ts,
    },
  },
  errors: [
    ConcurrentModificationException,
    InternalException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnection",
})) as any;

export type DeleteEventBusError =
  | ConcurrentModificationException
  | InternalException
  | CommonErrors;
/**
 * Deletes the specified custom event bus or partner event bus. All rules associated with
 * this event bus need to be deleted. You can't delete your account's default event bus.
 */
export const deleteEventBus: API.OperationMethod<
  DeleteEventBusRequest,
  DeleteEventBusResponse,
  DeleteEventBusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [ConcurrentModificationException, InternalException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventBus",
})) as any;

export type DeletePartnerEventSourceError =
  | ConcurrentModificationException
  | InternalException
  | OperationDisabledException
  | CommonErrors;
/**
 * This operation is used by SaaS partners to delete a partner event source. This operation
 * is not used by Amazon Web Services customers.
 *
 * When you delete an event source, the status of the corresponding partner event bus in the
 * Amazon Web Services customer account becomes DELETED.
 */
export const deletePartnerEventSource: API.OperationMethod<
  DeletePartnerEventSourceRequest,
  DeletePartnerEventSourceResponse,
  DeletePartnerEventSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0, Account: 0 } },
  errors: [
    ConcurrentModificationException,
    InternalException,
    OperationDisabledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePartnerEventSource",
})) as any;

export type DeleteRuleError =
  | ConcurrentModificationException
  | InternalException
  | ManagedRuleException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified rule.
 *
 * Before you can delete the rule, you must remove all targets, using RemoveTargets.
 *
 * When you delete a rule, incoming events might continue to match to the deleted rule. Allow
 * a short period of time for changes to take effect.
 *
 * If you call delete rule multiple times for the same rule, all calls will succeed. When you
 * call delete rule for a non-existent custom eventbus, `ResourceNotFoundException` is
 * returned.
 *
 * Managed rules are rules created and managed by another Amazon Web Services service on your behalf. These
 * rules are created by those other Amazon Web Services services to support functionality in those services. You
 * can delete these rules using the `Force` option, but you should do so only if you
 * are sure the other service is not still using that rule.
 */
export const deleteRule: API.OperationMethod<
  DeleteRuleRequest,
  DeleteRuleResponse,
  DeleteRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0, EventBusName: 0, Force: 0 } },
  errors: [
    ConcurrentModificationException,
    InternalException,
    ManagedRuleException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRule",
})) as any;

export type DescribeApiDestinationError =
  | InternalException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves details about an API destination.
 */
export const describeApiDestination: API.OperationMethod<
  DescribeApiDestinationRequest,
  DescribeApiDestinationResponse,
  DescribeApiDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0 },
    output: { CreationTime: D.ts, LastModifiedTime: D.ts },
  },
  errors: [InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApiDestination",
})) as any;

export type DescribeArchiveError =
  | InternalException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves details about an archive.
 */
export const describeArchive: API.OperationMethod<
  DescribeArchiveRequest,
  DescribeArchiveResponse,
  DescribeArchiveError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ArchiveName: 0 },
    output: { CreationTime: D.ts },
  },
  errors: [
    InternalException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeArchive",
})) as any;

export type DescribeConnectionError =
  | InternalException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves details about a connection.
 */
export const describeConnection: API.OperationMethod<
  DescribeConnectionRequest,
  DescribeConnectionResponse,
  DescribeConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0 },
    output: {
      AuthParameters: {
        OAuthParameters: { OAuthHttpParameters: o_ConnectionHttpParameters },
        InvocationHttpParameters: o_ConnectionHttpParameters,
      },
      CreationTime: D.ts,
      LastModifiedTime: D.ts,
      LastAuthorizedTime: D.ts,
    },
  },
  errors: [InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConnection",
})) as any;

export type DescribeEventBusError =
  | InternalException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Displays details about an event bus in your account. This can include the external Amazon Web Services
 * accounts that are permitted to write events to your default event bus, and the associated
 * policy. For custom event buses and partner event buses, it displays the name, ARN, policy,
 * state, and creation time.
 *
 * To enable your account to receive events from other accounts on its default event bus,
 * use PutPermission.
 *
 * For more information about partner event buses, see CreateEventBus.
 */
export const describeEventBus: API.OperationMethod<
  DescribeEventBusRequest,
  DescribeEventBusResponse,
  DescribeEventBusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEventBus",
})) as any;

export type DescribeEventSourceError =
  | InternalException
  | OperationDisabledException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * This operation lists details about a partner event source that is shared with your
 * account.
 */
export const describeEventSource: API.OperationMethod<
  DescribeEventSourceRequest,
  DescribeEventSourceResponse,
  DescribeEventSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0 },
    output: { CreationTime: D.ts, ExpirationTime: D.ts },
  },
  errors: [
    InternalException,
    OperationDisabledException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEventSource",
})) as any;

export type DescribePartnerEventSourceError =
  | InternalException
  | OperationDisabledException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * An SaaS partner can use this operation to list details about a partner event source that
 * they have created. Amazon Web Services customers do not use this operation. Instead, Amazon Web Services customers can use DescribeEventSource
 * to see details about a partner event source that is
 * shared with them.
 */
export const describePartnerEventSource: API.OperationMethod<
  DescribePartnerEventSourceRequest,
  DescribePartnerEventSourceResponse,
  DescribePartnerEventSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [
    InternalException,
    OperationDisabledException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePartnerEventSource",
})) as any;

export type DescribeReplayError =
  | InternalException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves details about a replay. Use `DescribeReplay` to determine the
 * progress of a running replay. A replay processes events to replay based on the time in the
 * event, and replays them using 1 minute intervals. If you use `StartReplay` and
 * specify an `EventStartTime` and an `EventEndTime` that covers a 20
 * minute time range, the events are replayed from the first minute of that 20 minute range
 * first. Then the events from the second minute are replayed. You can use
 * `DescribeReplay` to determine the progress of a replay. The value returned for
 * `EventLastReplayedTime` indicates the time within the specified time range
 * associated with the last event replayed.
 */
export const describeReplay: API.OperationMethod<
  DescribeReplayRequest,
  DescribeReplayResponse,
  DescribeReplayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ReplayName: 0 },
    output: {
      EventStartTime: D.ts,
      EventEndTime: D.ts,
      EventLastReplayedTime: D.ts,
      ReplayStartTime: D.ts,
      ReplayEndTime: D.ts,
    },
  },
  errors: [InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReplay",
})) as any;

export type DescribeRuleError =
  | InternalException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the specified rule.
 *
 * DescribeRule does not list the targets of a rule. To see the targets associated with a
 * rule, use ListTargetsByRule.
 */
export const describeRule: API.OperationMethod<
  DescribeRuleRequest,
  DescribeRuleResponse,
  DescribeRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0, EventBusName: 0 } },
  errors: [InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRule",
})) as any;

export type DisableRuleError =
  | ConcurrentModificationException
  | InternalException
  | ManagedRuleException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disables the specified rule. A disabled rule won't match any events, and won't
 * self-trigger if it has a schedule expression.
 *
 * When you disable a rule, incoming events might continue to match to the disabled rule.
 * Allow a short period of time for changes to take effect.
 */
export const disableRule: API.OperationMethod<
  DisableRuleRequest,
  DisableRuleResponse,
  DisableRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0, EventBusName: 0 } },
  errors: [
    ConcurrentModificationException,
    InternalException,
    ManagedRuleException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableRule",
})) as any;

export type EnableRuleError =
  | ConcurrentModificationException
  | InternalException
  | ManagedRuleException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Enables the specified rule. If the rule does not exist, the operation fails.
 *
 * When you enable a rule, incoming events might not immediately start matching to a newly
 * enabled rule. Allow a short period of time for changes to take effect.
 */
export const enableRule: API.OperationMethod<
  EnableRuleRequest,
  EnableRuleResponse,
  EnableRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0, EventBusName: 0 } },
  errors: [
    ConcurrentModificationException,
    InternalException,
    ManagedRuleException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableRule",
})) as any;

export type ListApiDestinationsError = InternalException | CommonErrors;
/**
 * Retrieves a list of API destination in the account in the current Region.
 */
export const listApiDestinations: API.OperationMethod<
  ListApiDestinationsRequest,
  ListApiDestinationsResponse,
  ListApiDestinationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { NamePrefix: 0, ConnectionArn: 0, NextToken: 0, Limit: 0 },
    output: {
      ApiDestinations: D.list({ CreationTime: D.ts, LastModifiedTime: D.ts }),
    },
  },
  errors: [InternalException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApiDestinations",
})) as any;

export type ListArchivesError =
  | InternalException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists your archives. You can either list all the archives or you can provide a prefix to
 * match to the archive names. Filter parameters are exclusive.
 */
export const listArchives: API.OperationMethod<
  ListArchivesRequest,
  ListArchivesResponse,
  ListArchivesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      NamePrefix: 0,
      EventSourceArn: 0,
      State: 0,
      NextToken: 0,
      Limit: 0,
    },
    output: { Archives: D.list({ CreationTime: D.ts }) },
  },
  errors: [InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListArchives",
})) as any;

export type ListConnectionsError = InternalException | CommonErrors;
/**
 * Retrieves a list of connections from the account.
 */
export const listConnections: API.OperationMethod<
  ListConnectionsRequest,
  ListConnectionsResponse,
  ListConnectionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { NamePrefix: 0, ConnectionState: 0, NextToken: 0, Limit: 0 },
    output: {
      Connections: D.list({
        CreationTime: D.ts,
        LastModifiedTime: D.ts,
        LastAuthorizedTime: D.ts,
      }),
    },
  },
  errors: [InternalException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnections",
})) as any;

export type ListEventBusesError = InternalException | CommonErrors;
/**
 * Lists all the event buses in your account, including the default event bus, custom event
 * buses, and partner event buses.
 */
export const listEventBuses: API.OperationMethod<
  ListEventBusesRequest,
  ListEventBusesResponse,
  ListEventBusesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { NamePrefix: 0, NextToken: 0, Limit: 0 },
  },
  errors: [InternalException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEventBuses",
})) as any;

export type ListEventSourcesError =
  | InternalException
  | OperationDisabledException
  | CommonErrors;
/**
 * You can use this to see all the partner event sources that have been shared with your Amazon Web Services
 * account. For more information about partner event sources, see CreateEventBus.
 */
export const listEventSources: API.OperationMethod<
  ListEventSourcesRequest,
  ListEventSourcesResponse,
  ListEventSourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { NamePrefix: 0, NextToken: 0, Limit: 0 },
    output: {
      EventSources: D.list({ CreationTime: D.ts, ExpirationTime: D.ts }),
    },
  },
  errors: [InternalException, OperationDisabledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEventSources",
})) as any;

export type ListPartnerEventSourceAccountsError =
  | InternalException
  | OperationDisabledException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * An SaaS partner can use this operation to display the Amazon Web Services account ID that a particular
 * partner event source name is associated with. This operation is not used by Amazon Web Services
 * customers.
 */
export const listPartnerEventSourceAccounts: API.OperationMethod<
  ListPartnerEventSourceAccountsRequest,
  ListPartnerEventSourceAccountsResponse,
  ListPartnerEventSourceAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { EventSourceName: 0, NextToken: 0, Limit: 0 },
    output: {
      PartnerEventSourceAccounts: D.list({
        CreationTime: D.ts,
        ExpirationTime: D.ts,
      }),
    },
  },
  errors: [
    InternalException,
    OperationDisabledException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPartnerEventSourceAccounts",
})) as any;

export type ListPartnerEventSourcesError =
  | InternalException
  | OperationDisabledException
  | CommonErrors;
/**
 * An SaaS partner can use this operation to list all the partner event source names that
 * they have created. This operation is not used by Amazon Web Services customers.
 */
export const listPartnerEventSources: API.OperationMethod<
  ListPartnerEventSourcesRequest,
  ListPartnerEventSourcesResponse,
  ListPartnerEventSourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { NamePrefix: 0, NextToken: 0, Limit: 0 },
  },
  errors: [InternalException, OperationDisabledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPartnerEventSources",
})) as any;

export type ListReplaysError = InternalException | CommonErrors;
/**
 * Lists your replays. You can either list all the replays or you can provide a prefix to
 * match to the replay names. Filter parameters are exclusive.
 */
export const listReplays: API.OperationMethod<
  ListReplaysRequest,
  ListReplaysResponse,
  ListReplaysError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      NamePrefix: 0,
      State: 0,
      EventSourceArn: 0,
      NextToken: 0,
      Limit: 0,
    },
    output: {
      Replays: D.list({
        EventStartTime: D.ts,
        EventEndTime: D.ts,
        EventLastReplayedTime: D.ts,
        ReplayStartTime: D.ts,
        ReplayEndTime: D.ts,
      }),
    },
  },
  errors: [InternalException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReplays",
})) as any;

export type ListRuleNamesByTargetError =
  | InternalException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the rules for the specified target. You can see which of the rules in Amazon
 * EventBridge can invoke a specific target in your account.
 */
export const listRuleNamesByTarget: API.OperationMethod<
  ListRuleNamesByTargetRequest,
  ListRuleNamesByTargetResponse,
  ListRuleNamesByTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TargetArn: 0, EventBusName: 0, NextToken: 0, Limit: 0 },
  },
  errors: [InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRuleNamesByTarget",
})) as any;

export type ListRulesError =
  | InternalException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists your Amazon EventBridge rules. You can either list all the rules or you can provide
 * a prefix to match to the rule names.
 *
 * ListRules does not list the targets of a rule. To see the targets associated with a rule,
 * use ListTargetsByRule.
 */
export const listRules: API.OperationMethod<
  ListRulesRequest,
  ListRulesResponse,
  ListRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { NamePrefix: 0, EventBusName: 0, NextToken: 0, Limit: 0 },
  },
  errors: [InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRules",
})) as any;

export type ListTagsForResourceError =
  | InternalException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Displays the tags associated with an EventBridge resource. In EventBridge, rules and event
 * buses can be tagged.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0 } },
  errors: [InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListTargetsByRuleError =
  | InternalException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the targets assigned to the specified rule.
 */
export const listTargetsByRule: API.OperationMethod<
  ListTargetsByRuleRequest,
  ListTargetsByRuleResponse,
  ListTargetsByRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Rule: 0, EventBusName: 0, NextToken: 0, Limit: 0 },
  },
  errors: [InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTargetsByRule",
})) as any;

export type PutEventsError = InternalException | CommonErrors;
/**
 * Sends custom events to Amazon EventBridge so that they can be matched to rules.
 */
export const putEvents: API.OperationMethod<
  PutEventsRequest,
  PutEventsResponse,
  PutEventsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Entries: D.list({
        Time: 0,
        Source: 0,
        Resources: 0,
        DetailType: 0,
        Detail: 0,
        EventBusName: 0,
        TraceHeader: 0,
      }),
    },
  },
  errors: [InternalException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEvents",
})) as any;

export type PutPartnerEventsError =
  | InternalException
  | OperationDisabledException
  | CommonErrors;
/**
 * This is used by SaaS partners to write events to a customer's partner event bus. Amazon Web Services
 * customers do not use this operation.
 */
export const putPartnerEvents: API.OperationMethod<
  PutPartnerEventsRequest,
  PutPartnerEventsResponse,
  PutPartnerEventsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Entries: D.list({
        Time: 0,
        Source: 0,
        Resources: 0,
        DetailType: 0,
        Detail: 0,
      }),
    },
  },
  errors: [InternalException, OperationDisabledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutPartnerEvents",
})) as any;

export type PutPermissionError =
  | ConcurrentModificationException
  | InternalException
  | OperationDisabledException
  | PolicyLengthExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Running `PutPermission` permits the specified Amazon Web Services account or Amazon Web Services organization
 * to put events to the specified *event bus*. Amazon EventBridge (CloudWatch
 * Events) rules in your account are triggered by these events arriving to an event bus in your
 * account.
 *
 * For another account to send events to your account, that external account must have an
 * EventBridge rule with your account's event bus as a target.
 *
 * To enable multiple Amazon Web Services accounts to put events to your event bus, run
 * `PutPermission` once for each of these accounts. Or, if all the accounts are
 * members of the same Amazon Web Services organization, you can run `PutPermission` once specifying
 * `Principal` as "*" and specifying the Amazon Web Services organization ID in
 * `Condition`, to grant permissions to all accounts in that organization.
 *
 * If you grant permissions using an organization, then accounts in that organization must
 * specify a `RoleArn` with proper permissions when they use `PutTarget` to
 * add your account's event bus as a target. For more information, see Sending and
 * Receiving Events Between Amazon Web Services Accounts in the Amazon EventBridge User
 * Guide.
 *
 * The permission policy on the event bus cannot exceed 10 KB in size.
 */
export const putPermission: API.OperationMethod<
  PutPermissionRequest,
  PutPermissionResponse,
  PutPermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      EventBusName: 0,
      Action: 0,
      Principal: 0,
      StatementId: 0,
      Condition: { Type: 0, Key: 0, Value: 0 },
      Policy: 0,
    },
  },
  errors: [
    ConcurrentModificationException,
    InternalException,
    OperationDisabledException,
    PolicyLengthExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutPermission",
})) as any;

export type PutRuleError =
  | ConcurrentModificationException
  | InternalException
  | InvalidEventPatternException
  | LimitExceededException
  | ManagedRuleException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates or updates the specified rule. Rules are enabled by default, or based on value of
 * the state. You can disable a rule using DisableRule.
 *
 * A single rule watches for events from a single event bus. Events generated by Amazon Web Services services
 * go to your account's default event bus. Events generated by SaaS partner services or
 * applications go to the matching partner event bus. If you have custom applications or
 * services, you can specify whether their events go to your default event bus or a custom event
 * bus that you have created. For more information, see CreateEventBus.
 *
 * If you are updating an existing rule, the rule is replaced with what you specify in this
 * `PutRule` command. If you omit arguments in `PutRule`, the old values
 * for those arguments are not kept. Instead, they are replaced with null values.
 *
 * When you create or update a rule, incoming events might not immediately start matching to
 * new or updated rules. Allow a short period of time for changes to take effect.
 *
 * A rule must contain at least an EventPattern or ScheduleExpression. Rules with
 * EventPatterns are triggered when a matching event is observed. Rules with ScheduleExpressions
 * self-trigger based on the given schedule. A rule can have both an EventPattern and a
 * ScheduleExpression, in which case the rule triggers on matching events as well as on a
 * schedule.
 *
 * When you initially create a rule, you can optionally assign one or more tags to the rule.
 * Tags can help you organize and categorize your resources. You can also use them to scope user
 * permissions, by granting a user permission to access or change only rules with certain tag
 * values. To use the `PutRule` operation and assign tags, you must have both the
 * `events:PutRule` and `events:TagResource` permissions.
 *
 * If you are updating an existing rule, any tags you specify in the `PutRule`
 * operation are ignored. To update the tags of an existing rule, use TagResource and UntagResource.
 *
 * Most services in Amazon Web Services treat : or / as the same character in Amazon Resource Names (ARNs).
 * However, EventBridge uses an exact match in event patterns and rules. Be sure to use the
 * correct ARN characters when creating event patterns so that they match the ARN syntax in the
 * event you want to match.
 *
 * In EventBridge, it is possible to create rules that lead to infinite loops, where a rule
 * is fired repeatedly. For example, a rule might detect that ACLs have changed on an S3 bucket,
 * and trigger software to change them to the desired state. If the rule is not written
 * carefully, the subsequent change to the ACLs fires the rule again, creating an infinite
 * loop.
 *
 * To prevent this, write the rules so that the triggered actions do not re-fire the same
 * rule. For example, your rule could fire only if ACLs are found to be in a bad state, instead
 * of after any change.
 *
 * An infinite loop can quickly cause higher than expected charges. We recommend that you use
 * budgeting, which alerts you when charges exceed your specified limit. For more information,
 * see Managing Your Costs with
 * Budgets.
 */
export const putRule: API.OperationMethod<
  PutRuleRequest,
  PutRuleResponse,
  PutRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      ScheduleExpression: 0,
      EventPattern: 0,
      State: 0,
      Description: 0,
      RoleArn: 0,
      Tags: D.list(i_Tag),
      EventBusName: 0,
    },
  },
  errors: [
    ConcurrentModificationException,
    InternalException,
    InvalidEventPatternException,
    LimitExceededException,
    ManagedRuleException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRule",
})) as any;

export type PutTargetsError =
  | ConcurrentModificationException
  | InternalException
  | LimitExceededException
  | ManagedRuleException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds the specified targets to the specified rule, or updates the targets if they are
 * already associated with the rule.
 *
 * Targets are the resources that are invoked when a rule is triggered.
 *
 * You can configure the following as targets for Events:
 *
 * - API
 * destination
 *
 * - Amazon API Gateway REST API endpoints
 *
 * - API Gateway
 *
 * - Batch job queue
 *
 * - CloudWatch Logs group
 *
 * - CodeBuild project
 *
 * - CodePipeline
 *
 * - Amazon EC2 `CreateSnapshot` API call
 *
 * - Amazon EC2 `RebootInstances` API call
 *
 * - Amazon EC2 `StopInstances` API call
 *
 * - Amazon EC2 `TerminateInstances` API call
 *
 * - Amazon ECS tasks
 *
 * - Event bus in a different Amazon Web Services account or Region.
 *
 * You can use an event bus in the US East (N. Virginia) us-east-1, US West (Oregon)
 * us-west-2, or Europe (Ireland) eu-west-1 Regions as a target for a rule.
 *
 * - Firehose delivery stream (Firehose)
 *
 * - Inspector assessment template (Amazon Inspector)
 *
 * - Kinesis stream (Kinesis Data Stream)
 *
 * - Lambda function
 *
 * - Redshift clusters (Data API statement execution)
 *
 * - Amazon SNS topic
 *
 * - Amazon SQS queues (includes FIFO queues
 *
 * - SSM Automation
 *
 * - SSM OpsItem
 *
 * - SSM Run Command
 *
 * - Step Functions state machines
 *
 * Creating rules with built-in targets is supported only in the Amazon Web Services Management Console. The
 * built-in targets are `EC2 CreateSnapshot API call`, EC2 RebootInstances API
 * call, `EC2 StopInstances API call`, and EC2 TerminateInstances API
 * call.
 *
 * For some target types, `PutTargets` provides target-specific parameters. If the
 * target is a Kinesis data stream, you can optionally specify which shard the event goes to by
 * using the `KinesisParameters` argument. To invoke a command on multiple EC2
 * instances with one rule, you can use the `RunCommandParameters` field.
 *
 * To be able to make API calls against the resources that you own, Amazon EventBridge
 * needs the appropriate permissions. For Lambda and Amazon SNS
 * resources, EventBridge relies on resource-based policies. For EC2 instances, Kinesis Data Streams,
 * Step Functions state machines and API Gateway REST APIs, EventBridge relies on
 * IAM roles that you specify in the `RoleARN` argument in `PutTargets`.
 * For more information, see Authentication
 * and Access Control in the *Amazon EventBridge User Guide*.
 *
 * If another Amazon Web Services account is in the same region and has granted you permission (using
 * `PutPermission`), you can send events to that account. Set that account's event
 * bus as a target of the rules in your account. To send the matched events to the other account,
 * specify that account's event bus as the `Arn` value when you run
 * `PutTargets`. If your account sends events to another account, your account is
 * charged for each sent event. Each event sent to another account is charged as a custom event.
 * The account receiving the event is not charged. For more information, see Amazon EventBridge
 * Pricing.
 *
 * `Input`, `InputPath`, and `InputTransformer` are not
 * available with `PutTarget` if the target is an event bus of a different Amazon Web Services
 * account.
 *
 * If you are setting the event bus of another account as the target, and that account
 * granted permission to your account through an organization instead of directly by the account
 * ID, then you must specify a `RoleArn` with proper permissions in the
 * `Target` structure. For more information, see Sending and
 * Receiving Events Between Amazon Web Services Accounts in the Amazon EventBridge User
 * Guide.
 *
 * For more information about enabling cross-account events, see PutPermission.
 *
 * **Input**, **InputPath**, and
 * **InputTransformer** are mutually exclusive and optional
 * parameters of a target. When a rule is triggered due to a matched event:
 *
 * - If none of the following arguments are specified for a target, then the entire event
 * is passed to the target in JSON format (unless the target is Amazon EC2 Run Command or
 * Amazon ECS task, in which case nothing from the event is passed to the target).
 *
 * - If **Input** is specified in the form of valid JSON, then
 * the matched event is overridden with this constant.
 *
 * - If **InputPath** is specified in the form of JSONPath
 * (for example, `$.detail`), then only the part of the event specified in the
 * path is passed to the target (for example, only the detail part of the event is
 * passed).
 *
 * - If **InputTransformer** is specified, then one or more
 * specified JSONPaths are extracted from the event and used as values in a template that you
 * specify as the input to the target.
 *
 * When you specify `InputPath` or `InputTransformer`, you must use
 * JSON dot notation, not bracket notation.
 *
 * When you add targets to a rule and the associated rule triggers soon after, new or updated
 * targets might not be immediately invoked. Allow a short period of time for changes to take
 * effect.
 *
 * This action can partially fail if too many requests are made at the same time. If that
 * happens, `FailedEntryCount` is non-zero in the response and each entry in
 * `FailedEntries` provides the ID of the failed target and the error code.
 */
export const putTargets: API.OperationMethod<
  PutTargetsRequest,
  PutTargetsResponse,
  PutTargetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Rule: 0,
      EventBusName: 0,
      Targets: D.list({
        Id: 0,
        Arn: 0,
        RoleArn: 0,
        Input: 0,
        InputPath: 0,
        InputTransformer: { InputPathsMap: 0, InputTemplate: 0 },
        KinesisParameters: { PartitionKeyPath: 0 },
        RunCommandParameters: {
          RunCommandTargets: D.list({ Key: 0, Values: 0 }),
        },
        EcsParameters: {
          TaskDefinitionArn: 0,
          TaskCount: 0,
          LaunchType: 0,
          NetworkConfiguration: {
            awsvpcConfiguration: {
              Subnets: 0,
              SecurityGroups: 0,
              AssignPublicIp: 0,
            },
          },
          PlatformVersion: 0,
          Group: 0,
          CapacityProviderStrategy: D.list({
            capacityProvider: 0,
            weight: 0,
            base: 0,
          }),
          EnableECSManagedTags: 0,
          EnableExecuteCommand: 0,
          PlacementConstraints: D.list({ type: 0, expression: 0 }),
          PlacementStrategy: D.list({ type: 0, field: 0 }),
          PropagateTags: 0,
          ReferenceId: 0,
          Tags: D.list(i_Tag),
        },
        BatchParameters: {
          JobDefinition: 0,
          JobName: 0,
          ArrayProperties: { Size: 0 },
          RetryStrategy: { Attempts: 0 },
        },
        SqsParameters: { MessageGroupId: 0 },
        HttpParameters: {
          PathParameterValues: 0,
          HeaderParameters: 0,
          QueryStringParameters: 0,
        },
        RedshiftDataParameters: {
          SecretManagerArn: 0,
          Database: 0,
          DbUser: 0,
          Sql: 0,
          StatementName: 0,
          WithEvent: 0,
        },
        SageMakerPipelineParameters: {
          PipelineParameterList: D.list({ Name: 0, Value: 0 }),
        },
        DeadLetterConfig: { Arn: 0 },
        RetryPolicy: { MaximumRetryAttempts: 0, MaximumEventAgeInSeconds: 0 },
      }),
    },
  },
  errors: [
    ConcurrentModificationException,
    InternalException,
    LimitExceededException,
    ManagedRuleException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutTargets",
})) as any;

export type RemovePermissionError =
  | ConcurrentModificationException
  | InternalException
  | OperationDisabledException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Revokes the permission of another Amazon Web Services account to be able to put events to the specified
 * event bus. Specify the account to revoke by the `StatementId` value that you
 * associated with the account when you granted it permission with `PutPermission`.
 * You can find the `StatementId` by using DescribeEventBus.
 */
export const removePermission: API.OperationMethod<
  RemovePermissionRequest,
  RemovePermissionResponse,
  RemovePermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { StatementId: 0, RemoveAllPermissions: 0, EventBusName: 0 },
  },
  errors: [
    ConcurrentModificationException,
    InternalException,
    OperationDisabledException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemovePermission",
})) as any;

export type RemoveTargetsError =
  | ConcurrentModificationException
  | InternalException
  | ManagedRuleException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes the specified targets from the specified rule. When the rule is triggered, those
 * targets are no longer be invoked.
 *
 * When you remove a target, when the associated rule triggers, removed targets might
 * continue to be invoked. Allow a short period of time for changes to take effect.
 *
 * This action can partially fail if too many requests are made at the same time. If that
 * happens, `FailedEntryCount` is non-zero in the response and each entry in
 * `FailedEntries` provides the ID of the failed target and the error code.
 */
export const removeTargets: API.OperationMethod<
  RemoveTargetsRequest,
  RemoveTargetsResponse,
  RemoveTargetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Rule: 0, EventBusName: 0, Ids: 0, Force: 0 },
  },
  errors: [
    ConcurrentModificationException,
    InternalException,
    ManagedRuleException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTargets",
})) as any;

export type StartReplayError =
  | InternalException
  | InvalidEventPatternException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Starts the specified replay. Events are not necessarily replayed in the exact same order
 * that they were added to the archive. A replay processes events to replay based on the time in
 * the event, and replays them using 1 minute intervals. If you specify an
 * `EventStartTime` and an `EventEndTime` that covers a 20 minute time
 * range, the events are replayed from the first minute of that 20 minute range first. Then the
 * events from the second minute are replayed. You can use `DescribeReplay` to
 * determine the progress of a replay. The value returned for `EventLastReplayedTime`
 * indicates the time within the specified time range associated with the last event
 * replayed.
 */
export const startReplay: API.OperationMethod<
  StartReplayRequest,
  StartReplayResponse,
  StartReplayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ReplayName: 0,
      Description: 0,
      EventSourceArn: 0,
      EventStartTime: 0,
      EventEndTime: 0,
      Destination: { Arn: 0, FilterArns: 0 },
    },
    output: { ReplayStartTime: D.ts },
  },
  errors: [
    InternalException,
    InvalidEventPatternException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartReplay",
})) as any;

export type TagResourceError =
  | ConcurrentModificationException
  | InternalException
  | ManagedRuleException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Assigns one or more tags (key-value pairs) to the specified EventBridge resource. Tags can
 * help you organize and categorize your resources. You can also use them to scope user
 * permissions by granting a user permission to access or change only resources with certain tag
 * values. In EventBridge, rules and event buses can be tagged.
 *
 * Tags don't have any semantic meaning to Amazon Web Services and are interpreted strictly as strings of
 * characters.
 *
 * You can use the `TagResource` action with a resource that already has tags. If
 * you specify a new tag key, this tag is appended to the list of tags associated with the
 * resource. If you specify a tag key that is already associated with the resource, the new tag
 * value that you specify replaces the previous value for that tag.
 *
 * You can associate as many as 50 tags with a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0, Tags: D.list(i_Tag) } },
  errors: [
    ConcurrentModificationException,
    InternalException,
    ManagedRuleException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type TestEventPatternError =
  | InternalException
  | InvalidEventPatternException
  | CommonErrors;
/**
 * Tests whether the specified event pattern matches the provided event.
 *
 * Most services in Amazon Web Services treat : or / as the same character in Amazon Resource Names (ARNs).
 * However, EventBridge uses an exact match in event patterns and rules. Be sure to use the
 * correct ARN characters when creating event patterns so that they match the ARN syntax in the
 * event you want to match.
 */
export const testEventPattern: API.OperationMethod<
  TestEventPatternRequest,
  TestEventPatternResponse,
  TestEventPatternError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { EventPattern: 0, Event: 0 } },
  errors: [InternalException, InvalidEventPatternException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestEventPattern",
})) as any;

export type UntagResourceError =
  | ConcurrentModificationException
  | InternalException
  | ManagedRuleException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes one or more tags from the specified EventBridge resource. In Amazon EventBridge
 * (CloudWatch Events), rules and event buses can be tagged.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0, TagKeys: 0 } },
  errors: [
    ConcurrentModificationException,
    InternalException,
    ManagedRuleException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateApiDestinationError =
  | ConcurrentModificationException
  | InternalException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates an API destination.
 */
export const updateApiDestination: API.OperationMethod<
  UpdateApiDestinationRequest,
  UpdateApiDestinationResponse,
  UpdateApiDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Description: 0,
      ConnectionArn: 0,
      InvocationEndpoint: 0,
      HttpMethod: 0,
      InvocationRateLimitPerSecond: 0,
    },
    output: { CreationTime: D.ts, LastModifiedTime: D.ts },
  },
  errors: [
    ConcurrentModificationException,
    InternalException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApiDestination",
})) as any;

export type UpdateArchiveError =
  | ConcurrentModificationException
  | InternalException
  | InvalidEventPatternException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the specified archive.
 */
export const updateArchive: API.OperationMethod<
  UpdateArchiveRequest,
  UpdateArchiveResponse,
  UpdateArchiveError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ArchiveName: 0,
      Description: 0,
      EventPattern: 0,
      RetentionDays: 0,
    },
    output: { CreationTime: D.ts },
  },
  errors: [
    ConcurrentModificationException,
    InternalException,
    InvalidEventPatternException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateArchive",
})) as any;

export type UpdateConnectionError =
  | ConcurrentModificationException
  | InternalException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates settings for a connection.
 */
export const updateConnection: API.OperationMethod<
  UpdateConnectionRequest,
  UpdateConnectionResponse,
  UpdateConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Description: 0,
      AuthorizationType: 0,
      AuthParameters: {
        BasicAuthParameters: { Username: 0, Password: 0 },
        OAuthParameters: {
          ClientParameters: { ClientID: 0, ClientSecret: 0 },
          AuthorizationEndpoint: 0,
          HttpMethod: 0,
          OAuthHttpParameters: i_ConnectionHttpParameters,
        },
        ApiKeyAuthParameters: { ApiKeyName: 0, ApiKeyValue: 0 },
        InvocationHttpParameters: i_ConnectionHttpParameters,
      },
    },
    output: {
      CreationTime: D.ts,
      LastModifiedTime: D.ts,
      LastAuthorizedTime: D.ts,
    },
  },
  errors: [
    ConcurrentModificationException,
    InternalException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnection",
})) as any;

const i_ConnectionHttpParameters: D.LazyStruct = () => ({
  HeaderParameters: D.list({ Key: 0, Value: 0, IsValueSecret: 0 }),
  QueryStringParameters: D.list({ Key: 0, Value: 0, IsValueSecret: 0 }),
  BodyParameters: D.list({ Key: 0, Value: 0, IsValueSecret: 0 }),
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_ConnectionHttpParameters: D.LazyStruct = () => ({
  HeaderParameters: D.list({ Value: D.secret }),
  QueryStringParameters: D.list({ Value: D.secret }),
  BodyParameters: D.list({ Value: D.secret }),
});
