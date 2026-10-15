import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const ns = /*@__PURE__*/ T.XmlNamespace("http://events.amazonaws.com/doc/2015-10-07");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "CloudWatch Events",
  serviceShapeName: "AWSEvents",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "events" });
const ver = /*@__PURE__*/ T.ServiceVersion("2015-10-07");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
const rules = /*@__PURE__*/ T.EndpointResolver((p, _) => {
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
      return err("Invalid Configuration: FIPS and custom endpoint are not supported");
    }
    if (UseDualStack === true) {
      return err("Invalid Configuration: Dualstack and custom endpoint are not supported");
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
            return e(`https://events-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://events.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://events.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://events.{R}.{D}","properties":{},"headers":{}}');

export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class IllegalStatusException
  extends /*@__PURE__*/ S.TaggedError<IllegalStatusException>()("IllegalStatusException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InternalException
  extends /*@__PURE__*/ S.TaggedError<InternalException>()("InternalException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidEventPatternException
  extends /*@__PURE__*/ S.TaggedError<InvalidEventPatternException>()(
    "InvalidEventPatternException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidStateException
  extends /*@__PURE__*/ S.TaggedError<InvalidStateException>()("InvalidStateException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()("LimitExceededException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ManagedRuleException
  extends /*@__PURE__*/ S.TaggedError<ManagedRuleException>()("ManagedRuleException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class OperationDisabledException
  extends /*@__PURE__*/ S.TaggedError<OperationDisabledException>()("OperationDisabledException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class PolicyLengthExceededException
  extends /*@__PURE__*/ S.TaggedError<PolicyLengthExceededException>()(
    "PolicyLengthExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ResourceAlreadyExistsException>()(
    "ResourceAlreadyExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withAlreadyExistsError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()("ResourceNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
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
export type ConnectionQueryStringParametersList = ConnectionQueryStringParameter[];
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
export type PlacementConstraintType = "distinctInstance" | "memberOf" | (string & {});
export type PlacementConstraintExpression = string;
export interface PlacementConstraint {
  type?: PlacementConstraintType;
  expression?: string;
}
export type PlacementConstraints = PlacementConstraint[];
export type PlacementStrategyType = "random" | "spread" | "binpack" | (string & {});
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
  input: __S(0, __c0, 0) as any as S.Schema<ActivateEventSourceRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<ActivateEventSourceResponse>,
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
}));

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
  input: __S(64, __c2, 0) as any as S.Schema<CancelReplayRequest>,
  output: __S(65, __c2, 1) as any as S.Schema<CancelReplayResponse>,
  errors: [
    ConcurrentModificationException,
    IllegalStatusException,
    InternalException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelReplay",
}));

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
  input: __S(96, __c3, 0) as any as S.Schema<CreateApiDestinationRequest>,
  output: __S(128, __c4, 0) as any as S.Schema<CreateApiDestinationResponse>,
  errors: [
    InternalException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApiDestination",
}));

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
  input: __S(160, __c5, 0) as any as S.Schema<CreateArchiveRequest>,
  output: __S(192, __c6, 0) as any as S.Schema<CreateArchiveResponse>,
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
}));

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
  input: __S(229, __c7, 5) as any as S.Schema<CreateConnectionRequest>,
  output: __S(230, __c7, 6) as any as S.Schema<CreateConnectionResponse>,
  errors: [InternalException, LimitExceededException, ResourceAlreadyExistsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnection",
}));

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
  input: __S(288, __c9, 0) as any as S.Schema<CreateEventBusRequest>,
  output: __S(289, __c9, 1) as any as S.Schema<CreateEventBusResponse>,
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
}));

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
  input: __S(352, __c11, 0) as any as S.Schema<CreatePartnerEventSourceRequest>,
  output: __S(353, __c11, 1) as any as S.Schema<CreatePartnerEventSourceResponse>,
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
}));

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
  input: __S(384, __c12, 0) as any as S.Schema<DeactivateEventSourceRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<DeactivateEventSourceResponse>,
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
}));

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
  input: __S(416, __c13, 0) as any as S.Schema<DeauthorizeConnectionRequest>,
  output: __S(448, __c14, 0) as any as S.Schema<DeauthorizeConnectionResponse>,
  errors: [ConcurrentModificationException, InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeauthorizeConnection",
}));

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
  input: __S(480, __c15, 0) as any as S.Schema<DeleteApiDestinationRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<DeleteApiDestinationResponse>,
  errors: [ConcurrentModificationException, InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApiDestination",
}));

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
  input: __S(512, __c16, 0) as any as S.Schema<DeleteArchiveRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<DeleteArchiveResponse>,
  errors: [ConcurrentModificationException, InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteArchive",
}));

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
  input: __S(544, __c17, 0) as any as S.Schema<DeleteConnectionRequest>,
  output: __S(448, __c14, 0) as any as S.Schema<DeleteConnectionResponse>,
  errors: [ConcurrentModificationException, InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnection",
}));

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
  input: __S(576, __c18, 0) as any as S.Schema<DeleteEventBusRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<DeleteEventBusResponse>,
  errors: [ConcurrentModificationException, InternalException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventBus",
}));

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
  input: __S(608, __c19, 0) as any as S.Schema<DeletePartnerEventSourceRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<DeletePartnerEventSourceResponse>,
  errors: [ConcurrentModificationException, InternalException, OperationDisabledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePartnerEventSource",
}));

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
  input: __S(640, __c20, 0) as any as S.Schema<DeleteRuleRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<DeleteRuleResponse>,
  errors: [
    ConcurrentModificationException,
    InternalException,
    ManagedRuleException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRule",
}));

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
  input: __S(672, __c21, 0) as any as S.Schema<DescribeApiDestinationRequest>,
  output: __S(673, __c21, 1) as any as S.Schema<DescribeApiDestinationResponse>,
  errors: [InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApiDestination",
}));

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
  input: __S(704, __c22, 0) as any as S.Schema<DescribeArchiveRequest>,
  output: __S(705, __c22, 1) as any as S.Schema<DescribeArchiveResponse>,
  errors: [InternalException, ResourceAlreadyExistsException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeArchive",
}));

export type DescribeConnectionError = InternalException | ResourceNotFoundException | CommonErrors;
/**
 * Retrieves details about a connection.
 */
export const describeConnection: API.OperationMethod<
  DescribeConnectionRequest,
  DescribeConnectionResponse,
  DescribeConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c23, 0) as any as S.Schema<DescribeConnectionRequest>,
  output: __S(742, __c23, 6) as any as S.Schema<DescribeConnectionResponse>,
  errors: [InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConnection",
}));

export type DescribeEventBusError = InternalException | ResourceNotFoundException | CommonErrors;
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
  input: __S(768, __c24, 0) as any as S.Schema<DescribeEventBusRequest>,
  output: __S(769, __c24, 1) as any as S.Schema<DescribeEventBusResponse>,
  errors: [InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEventBus",
}));

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
  input: __S(800, __c25, 0) as any as S.Schema<DescribeEventSourceRequest>,
  output: __S(801, __c25, 1) as any as S.Schema<DescribeEventSourceResponse>,
  errors: [InternalException, OperationDisabledException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEventSource",
}));

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
  input: __S(832, __c26, 0) as any as S.Schema<DescribePartnerEventSourceRequest>,
  output: __S(833, __c26, 1) as any as S.Schema<DescribePartnerEventSourceResponse>,
  errors: [InternalException, OperationDisabledException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePartnerEventSource",
}));

export type DescribeReplayError = InternalException | ResourceNotFoundException | CommonErrors;
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
  input: __S(864, __c27, 0) as any as S.Schema<DescribeReplayRequest>,
  output: __S(865, __c27, 1) as any as S.Schema<DescribeReplayResponse>,
  errors: [InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReplay",
}));

export type DescribeRuleError = InternalException | ResourceNotFoundException | CommonErrors;
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
  input: __S(960, __c30, 0) as any as S.Schema<DescribeRuleRequest>,
  output: __S(961, __c30, 1) as any as S.Schema<DescribeRuleResponse>,
  errors: [InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRule",
}));

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
  input: __S(992, __c31, 0) as any as S.Schema<DisableRuleRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<DisableRuleResponse>,
  errors: [
    ConcurrentModificationException,
    InternalException,
    ManagedRuleException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableRule",
}));

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
  input: __S(1024, __c32, 0) as any as S.Schema<EnableRuleRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<EnableRuleResponse>,
  errors: [
    ConcurrentModificationException,
    InternalException,
    ManagedRuleException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableRule",
}));

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
  input: __S(1056, __c33, 0) as any as S.Schema<ListApiDestinationsRequest>,
  output: __S(1059, __c33, 3) as any as S.Schema<ListApiDestinationsResponse>,
  errors: [InternalException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApiDestinations",
}));

export type ListArchivesError = InternalException | ResourceNotFoundException | CommonErrors;
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
  input: __S(1088, __c34, 0) as any as S.Schema<ListArchivesRequest>,
  output: __S(1091, __c34, 3) as any as S.Schema<ListArchivesResponse>,
  errors: [InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListArchives",
}));

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
  input: __S(1120, __c35, 0) as any as S.Schema<ListConnectionsRequest>,
  output: __S(1123, __c35, 3) as any as S.Schema<ListConnectionsResponse>,
  errors: [InternalException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnections",
}));

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
  input: __S(1152, __c36, 0) as any as S.Schema<ListEventBusesRequest>,
  output: __S(1155, __c36, 3) as any as S.Schema<ListEventBusesResponse>,
  errors: [InternalException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEventBuses",
}));

export type ListEventSourcesError = InternalException | OperationDisabledException | CommonErrors;
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
  input: __S(1184, __c37, 0) as any as S.Schema<ListEventSourcesRequest>,
  output: __S(1187, __c37, 3) as any as S.Schema<ListEventSourcesResponse>,
  errors: [InternalException, OperationDisabledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEventSources",
}));

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
  input: __S(1216, __c38, 0) as any as S.Schema<ListPartnerEventSourceAccountsRequest>,
  output: __S(1219, __c38, 3) as any as S.Schema<ListPartnerEventSourceAccountsResponse>,
  errors: [InternalException, OperationDisabledException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPartnerEventSourceAccounts",
}));

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
  input: __S(1248, __c39, 0) as any as S.Schema<ListPartnerEventSourcesRequest>,
  output: __S(1251, __c39, 3) as any as S.Schema<ListPartnerEventSourcesResponse>,
  errors: [InternalException, OperationDisabledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPartnerEventSources",
}));

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
  input: __S(1280, __c40, 0) as any as S.Schema<ListReplaysRequest>,
  output: __S(1283, __c40, 3) as any as S.Schema<ListReplaysResponse>,
  errors: [InternalException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReplays",
}));

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
  input: __S(1312, __c41, 0) as any as S.Schema<ListRuleNamesByTargetRequest>,
  output: __S(1313, __c41, 1) as any as S.Schema<ListRuleNamesByTargetResponse>,
  errors: [InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRuleNamesByTarget",
}));

export type ListRulesError = InternalException | ResourceNotFoundException | CommonErrors;
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
  input: __S(1344, __c42, 0) as any as S.Schema<ListRulesRequest>,
  output: __S(1347, __c42, 3) as any as S.Schema<ListRulesResponse>,
  errors: [InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRules",
}));

export type ListTagsForResourceError = InternalException | ResourceNotFoundException | CommonErrors;
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
  input: __S(1376, __c43, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(1377, __c43, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListTargetsByRuleError = InternalException | ResourceNotFoundException | CommonErrors;
/**
 * Lists the targets assigned to the specified rule.
 */
export const listTargetsByRule: API.OperationMethod<
  ListTargetsByRuleRequest,
  ListTargetsByRuleResponse,
  ListTargetsByRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1408, __c44, 0) as any as S.Schema<ListTargetsByRuleRequest>,
  output: __S(1409, __c44, 1) as any as S.Schema<ListTargetsByRuleResponse>,
  errors: [InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTargetsByRule",
}));

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
  input: __S(1474, __c46, 2) as any as S.Schema<PutEventsRequest>,
  output: __S(1506, __c47, 2) as any as S.Schema<PutEventsResponse>,
  errors: [InternalException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEvents",
}));

export type PutPartnerEventsError = InternalException | OperationDisabledException | CommonErrors;
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
  input: __S(1538, __c48, 2) as any as S.Schema<PutPartnerEventsRequest>,
  output: __S(1506, __c47, 2) as any as S.Schema<PutPartnerEventsResponse>,
  errors: [InternalException, OperationDisabledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutPartnerEvents",
}));

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
  input: __S(1569, __c49, 1) as any as S.Schema<PutPermissionRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<PutPermissionResponse>,
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
}));

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
  input: __S(1600, __c50, 0) as any as S.Schema<PutRuleRequest>,
  output: __S(1601, __c50, 1) as any as S.Schema<PutRuleResponse>,
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
}));

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
  input: __S(1632, __c51, 0) as any as S.Schema<PutTargetsRequest>,
  output: __S(1666, __c52, 2) as any as S.Schema<PutTargetsResponse>,
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
}));

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
  input: __S(1696, __c53, 0) as any as S.Schema<RemovePermissionRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<RemovePermissionResponse>,
  errors: [
    ConcurrentModificationException,
    InternalException,
    OperationDisabledException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemovePermission",
}));

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
  input: __S(1728, __c54, 0) as any as S.Schema<RemoveTargetsRequest>,
  output: __S(1666, __c52, 2) as any as S.Schema<RemoveTargetsResponse>,
  errors: [
    ConcurrentModificationException,
    InternalException,
    ManagedRuleException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTargets",
}));

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
  input: __S(1760, __c55, 0) as any as S.Schema<StartReplayRequest>,
  output: __S(1761, __c55, 1) as any as S.Schema<StartReplayResponse>,
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
}));

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
  input: __S(1792, __c56, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    ConcurrentModificationException,
    InternalException,
    ManagedRuleException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type TestEventPatternError = InternalException | InvalidEventPatternException | CommonErrors;
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
  input: __S(1824, __c57, 0) as any as S.Schema<TestEventPatternRequest>,
  output: __S(1825, __c57, 1) as any as S.Schema<TestEventPatternResponse>,
  errors: [InternalException, InvalidEventPatternException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestEventPattern",
}));

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
  input: __S(1856, __c58, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    ConcurrentModificationException,
    InternalException,
    ManagedRuleException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(1888, __c59, 0) as any as S.Schema<UpdateApiDestinationRequest>,
  output: __S(128, __c4, 0) as any as S.Schema<UpdateApiDestinationResponse>,
  errors: [
    ConcurrentModificationException,
    InternalException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApiDestination",
}));

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
  input: __S(1920, __c60, 0) as any as S.Schema<UpdateArchiveRequest>,
  output: __S(192, __c6, 0) as any as S.Schema<UpdateArchiveResponse>,
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
}));

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
  input: __S(1957, __c61, 5) as any as S.Schema<UpdateConnectionRequest>,
  output: __S(448, __c14, 0) as any as S.Schema<UpdateConnectionResponse>,
  errors: [
    ConcurrentModificationException,
    InternalException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnection",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ActivateEventSourceRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "ActivateEventSourceResponse",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ReplayName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelReplayRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ReplayArn: S.optional(S.String),
          State: S.optional(S.String),
          StateReason: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CancelReplayResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          ConnectionArn: S.String,
          InvocationEndpoint: S.String,
          HttpMethod: S.String,
          InvocationRateLimitPerSecond: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateApiDestinationRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiDestinationArn: S.optional(S.String),
          ApiDestinationState: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(ns),
      ).annotate({ identifier: "CreateApiDestinationResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ArchiveName: S.String,
          EventSourceArn: S.String,
          Description: S.optional(S.String),
          EventPattern: S.optional(S.String),
          RetentionDays: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateArchiveRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ArchiveArn: S.optional(S.String),
          State: S.optional(S.String),
          StateReason: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(ns),
      ).annotate({ identifier: "CreateArchiveResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Username: S.String, Password: SensitiveString })).annotate({
        identifier: "CreateConnectionBasicAuthRequestParameters",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ ClientID: S.String, ClientSecret: SensitiveString }),
      ).annotate({ identifier: "CreateConnectionOAuthClientRequestParameters" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ClientParameters: __S(225, __c7, 1),
          AuthorizationEndpoint: S.String,
          HttpMethod: S.String,
          OAuthHttpParameters: S.optional(__S(258, __c8, 2)),
        }),
      ).annotate({ identifier: "CreateConnectionOAuthRequestParameters" });
    case 3:
      return S.suspend(() =>
        S.Struct({ ApiKeyName: S.String, ApiKeyValue: SensitiveString }),
      ).annotate({ identifier: "CreateConnectionApiKeyAuthRequestParameters" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          BasicAuthParameters: S.optional(__S(224, __c7, 0)),
          OAuthParameters: S.optional(__S(226, __c7, 2)),
          ApiKeyAuthParameters: S.optional(__S(227, __c7, 3)),
          InvocationHttpParameters: S.optional(__S(258, __c8, 2)),
        }),
      ).annotate({ identifier: "CreateConnectionAuthRequestParameters" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          AuthorizationType: S.String,
          AuthParameters: __S(228, __c7, 4),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateConnectionRequest" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          ConnectionArn: S.optional(S.String),
          ConnectionState: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(ns),
      ).annotate({ identifier: "CreateConnectionResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Key: S.optional(S.String),
          Value: S.optional(SensitiveString),
          IsValueSecret: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ConnectionHeaderParameter" });
    case 1:
      return S.Array(__S(256, __c8, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          HeaderParameters: S.optional(__S(257, __c8, 1)),
          QueryStringParameters: S.optional(__S(257, __c8, 1)),
          BodyParameters: S.optional(__S(257, __c8, 1)),
        }),
      ).annotate({ identifier: "ConnectionHttpParameters" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          EventSourceName: S.optional(S.String),
          Tags: S.optional(__S(321, __c10, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateEventBusRequest" });
    case 1:
      return S.suspend(() => S.Struct({ EventBusArn: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "CreateEventBusResponse",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(320, __c10, 0));
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Account: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreatePartnerEventSourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ EventSourceArn: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "CreatePartnerEventSourceResponse",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeactivateEventSourceRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeauthorizeConnectionRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConnectionArn: S.optional(S.String),
          ConnectionState: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastAuthorizedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(ns),
      ).annotate({ identifier: "DeauthorizeConnectionResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteApiDestinationRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ArchiveName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteArchiveRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteConnectionRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteEventBusRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Account: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeletePartnerEventSourceRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          EventBusName: S.optional(S.String),
          Force: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteRuleRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeApiDestinationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ApiDestinationArn: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          ApiDestinationState: S.optional(S.String),
          ConnectionArn: S.optional(S.String),
          InvocationEndpoint: S.optional(S.String),
          HttpMethod: S.optional(S.String),
          InvocationRateLimitPerSecond: S.optional(S.Number),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeApiDestinationResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ArchiveName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeArchiveRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ArchiveArn: S.optional(S.String),
          ArchiveName: S.optional(S.String),
          EventSourceArn: S.optional(S.String),
          Description: S.optional(S.String),
          EventPattern: S.optional(S.String),
          State: S.optional(S.String),
          StateReason: S.optional(S.String),
          RetentionDays: S.optional(S.Number),
          SizeBytes: S.optional(S.Number),
          EventCount: S.optional(S.Number),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeArchiveResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeConnectionRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Username: S.optional(S.String) })).annotate({
        identifier: "ConnectionBasicAuthResponseParameters",
      });
    case 2:
      return S.suspend(() => S.Struct({ ClientID: S.optional(S.String) })).annotate({
        identifier: "ConnectionOAuthClientResponseParameters",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ClientParameters: S.optional(__S(738, __c23, 2)),
          AuthorizationEndpoint: S.optional(S.String),
          HttpMethod: S.optional(S.String),
          OAuthHttpParameters: S.optional(__S(258, __c8, 2)),
        }),
      ).annotate({ identifier: "ConnectionOAuthResponseParameters" });
    case 4:
      return S.suspend(() => S.Struct({ ApiKeyName: S.optional(S.String) })).annotate({
        identifier: "ConnectionApiKeyAuthResponseParameters",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          BasicAuthParameters: S.optional(__S(737, __c23, 1)),
          OAuthParameters: S.optional(__S(739, __c23, 3)),
          ApiKeyAuthParameters: S.optional(__S(740, __c23, 4)),
          InvocationHttpParameters: S.optional(__S(258, __c8, 2)),
        }),
      ).annotate({ identifier: "ConnectionAuthResponseParameters" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          ConnectionArn: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          ConnectionState: S.optional(S.String),
          StateReason: S.optional(S.String),
          AuthorizationType: S.optional(S.String),
          SecretArn: S.optional(S.String),
          AuthParameters: S.optional(__S(741, __c23, 5)),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastAuthorizedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeConnectionResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeEventBusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Arn: S.optional(S.String),
          Policy: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeEventBusResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeEventSourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CreatedBy: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ExpirationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Name: S.optional(S.String),
          State: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeEventSourceResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribePartnerEventSourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Arn: S.optional(S.String), Name: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "DescribePartnerEventSourceResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ReplayName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeReplayRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ReplayName: S.optional(S.String),
          ReplayArn: S.optional(S.String),
          Description: S.optional(S.String),
          State: S.optional(S.String),
          StateReason: S.optional(S.String),
          EventSourceArn: S.optional(S.String),
          Destination: S.optional(__S(928, __c29, 0)),
          EventStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EventEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EventLastReplayedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ReplayStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ReplayEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeReplayResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String, FilterArns: S.optional(__S(896, __c28, 0)) }),
      ).annotate({ identifier: "ReplayDestination" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, EventBusName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeRuleRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Arn: S.optional(S.String),
          EventPattern: S.optional(S.String),
          ScheduleExpression: S.optional(S.String),
          State: S.optional(S.String),
          Description: S.optional(S.String),
          RoleArn: S.optional(S.String),
          ManagedBy: S.optional(S.String),
          EventBusName: S.optional(S.String),
          CreatedBy: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeRuleResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, EventBusName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisableRuleRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, EventBusName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "EnableRuleRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NamePrefix: S.optional(S.String),
          ConnectionArn: S.optional(S.String),
          NextToken: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListApiDestinationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ApiDestinationArn: S.optional(S.String),
          Name: S.optional(S.String),
          ApiDestinationState: S.optional(S.String),
          ConnectionArn: S.optional(S.String),
          InvocationEndpoint: S.optional(S.String),
          HttpMethod: S.optional(S.String),
          InvocationRateLimitPerSecond: S.optional(S.Number),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ApiDestination" });
    case 2:
      return S.Array(__S(1057, __c33, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ApiDestinations: S.optional(__S(1058, __c33, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListApiDestinationsResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NamePrefix: S.optional(S.String),
          EventSourceArn: S.optional(S.String),
          State: S.optional(S.String),
          NextToken: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListArchivesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ArchiveName: S.optional(S.String),
          EventSourceArn: S.optional(S.String),
          State: S.optional(S.String),
          StateReason: S.optional(S.String),
          RetentionDays: S.optional(S.Number),
          SizeBytes: S.optional(S.Number),
          EventCount: S.optional(S.Number),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Archive" });
    case 2:
      return S.Array(__S(1089, __c34, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Archives: S.optional(__S(1090, __c34, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListArchivesResponse" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NamePrefix: S.optional(S.String),
          ConnectionState: S.optional(S.String),
          NextToken: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListConnectionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConnectionArn: S.optional(S.String),
          Name: S.optional(S.String),
          ConnectionState: S.optional(S.String),
          StateReason: S.optional(S.String),
          AuthorizationType: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastAuthorizedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Connection" });
    case 2:
      return S.Array(__S(1121, __c35, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Connections: S.optional(__S(1122, __c35, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListConnectionsResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NamePrefix: S.optional(S.String),
          NextToken: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListEventBusesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Arn: S.optional(S.String),
          Policy: S.optional(S.String),
        }),
      ).annotate({ identifier: "EventBus" });
    case 2:
      return S.Array(__S(1153, __c36, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          EventBuses: S.optional(__S(1154, __c36, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListEventBusesResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NamePrefix: S.optional(S.String),
          NextToken: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListEventSourcesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CreatedBy: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ExpirationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Name: S.optional(S.String),
          State: S.optional(S.String),
        }),
      ).annotate({ identifier: "EventSource" });
    case 2:
      return S.Array(__S(1185, __c37, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          EventSources: S.optional(__S(1186, __c37, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListEventSourcesResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EventSourceName: S.String,
          NextToken: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListPartnerEventSourceAccountsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Account: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ExpirationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          State: S.optional(S.String),
        }),
      ).annotate({ identifier: "PartnerEventSourceAccount" });
    case 2:
      return S.Array(__S(1217, __c38, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          PartnerEventSourceAccounts: S.optional(__S(1218, __c38, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListPartnerEventSourceAccountsResponse" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NamePrefix: S.String,
          NextToken: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListPartnerEventSourcesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Arn: S.optional(S.String), Name: S.optional(S.String) }),
      ).annotate({ identifier: "PartnerEventSource" });
    case 2:
      return S.Array(__S(1249, __c39, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          PartnerEventSources: S.optional(__S(1250, __c39, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListPartnerEventSourcesResponse" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NamePrefix: S.optional(S.String),
          State: S.optional(S.String),
          EventSourceArn: S.optional(S.String),
          NextToken: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListReplaysRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ReplayName: S.optional(S.String),
          EventSourceArn: S.optional(S.String),
          State: S.optional(S.String),
          StateReason: S.optional(S.String),
          EventStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EventEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EventLastReplayedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ReplayStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ReplayEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Replay" });
    case 2:
      return S.Array(__S(1281, __c40, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Replays: S.optional(__S(1282, __c40, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListReplaysResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TargetArn: S.String,
          EventBusName: S.optional(S.String),
          NextToken: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListRuleNamesByTargetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RuleNames: S.optional(__S(896, __c28, 0)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListRuleNamesByTargetResponse" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NamePrefix: S.optional(S.String),
          EventBusName: S.optional(S.String),
          NextToken: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListRulesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Arn: S.optional(S.String),
          EventPattern: S.optional(S.String),
          State: S.optional(S.String),
          Description: S.optional(S.String),
          ScheduleExpression: S.optional(S.String),
          RoleArn: S.optional(S.String),
          ManagedBy: S.optional(S.String),
          EventBusName: S.optional(S.String),
        }),
      ).annotate({ identifier: "Rule" });
    case 2:
      return S.Array(__S(1345, __c42, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Rules: S.optional(__S(1346, __c42, 2)), NextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListRulesResponse" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(321, __c10, 1)) }).pipe(ns)).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Rule: S.String,
          EventBusName: S.optional(S.String),
          NextToken: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTargetsByRuleRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Targets: S.optional(__S(1467, __c45, 27)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListTargetsByRuleResponse" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({ InputPathsMap: S.optional(__S(1440, __c45, 0)), InputTemplate: S.String }),
      ).annotate({ identifier: "InputTransformer" });
    case 2:
      return S.suspend(() => S.Struct({ PartitionKeyPath: S.String })).annotate({
        identifier: "KinesisParameters",
      });
    case 3:
      return S.suspend(() => S.Struct({ Key: S.String, Values: __S(896, __c28, 0) })).annotate({
        identifier: "RunCommandTarget",
      });
    case 4:
      return S.Array(__S(1443, __c45, 3));
    case 5:
      return S.suspend(() => S.Struct({ RunCommandTargets: __S(1444, __c45, 4) })).annotate({
        identifier: "RunCommandParameters",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Subnets: __S(896, __c28, 0),
          SecurityGroups: S.optional(__S(896, __c28, 0)),
          AssignPublicIp: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsVpcConfiguration" });
    case 7:
      return S.suspend(() =>
        S.Struct({ awsvpcConfiguration: S.optional(__S(1446, __c45, 6)) }),
      ).annotate({ identifier: "NetworkConfiguration" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          capacityProvider: S.String,
          weight: S.optional(S.Number),
          base: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CapacityProviderStrategyItem" });
    case 9:
      return S.Array(__S(1448, __c45, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({ type: S.optional(S.String), expression: S.optional(S.String) }),
      ).annotate({ identifier: "PlacementConstraint" });
    case 11:
      return S.Array(__S(1450, __c45, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({ type: S.optional(S.String), field: S.optional(S.String) }),
      ).annotate({ identifier: "PlacementStrategy" });
    case 13:
      return S.Array(__S(1452, __c45, 12));
    case 14:
      return S.suspend(() =>
        S.Struct({
          TaskDefinitionArn: S.String,
          TaskCount: S.optional(S.Number),
          LaunchType: S.optional(S.String),
          NetworkConfiguration: S.optional(__S(1447, __c45, 7)),
          PlatformVersion: S.optional(S.String),
          Group: S.optional(S.String),
          CapacityProviderStrategy: S.optional(__S(1449, __c45, 9)),
          EnableECSManagedTags: S.optional(S.Boolean),
          EnableExecuteCommand: S.optional(S.Boolean),
          PlacementConstraints: S.optional(__S(1451, __c45, 11)),
          PlacementStrategy: S.optional(__S(1453, __c45, 13)),
          PropagateTags: S.optional(S.String),
          ReferenceId: S.optional(S.String),
          Tags: S.optional(__S(321, __c10, 1)),
        }),
      ).annotate({ identifier: "EcsParameters" });
    case 15:
      return S.suspend(() => S.Struct({ Size: S.optional(S.Number) })).annotate({
        identifier: "BatchArrayProperties",
      });
    case 16:
      return S.suspend(() => S.Struct({ Attempts: S.optional(S.Number) })).annotate({
        identifier: "BatchRetryStrategy",
      });
    case 17:
      return S.suspend(() =>
        S.Struct({
          JobDefinition: S.String,
          JobName: S.String,
          ArrayProperties: S.optional(__S(1455, __c45, 15)),
          RetryStrategy: S.optional(__S(1456, __c45, 16)),
        }),
      ).annotate({ identifier: "BatchParameters" });
    case 18:
      return S.suspend(() => S.Struct({ MessageGroupId: S.optional(S.String) })).annotate({
        identifier: "SqsParameters",
      });
    case 19:
      return S.suspend(() =>
        S.Struct({
          PathParameterValues: S.optional(__S(896, __c28, 0)),
          HeaderParameters: S.optional(__S(1440, __c45, 0)),
          QueryStringParameters: S.optional(__S(1440, __c45, 0)),
        }),
      ).annotate({ identifier: "HttpParameters" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          SecretManagerArn: S.optional(S.String),
          Database: S.String,
          DbUser: S.optional(S.String),
          Sql: S.String,
          StatementName: S.optional(S.String),
          WithEvent: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "RedshiftDataParameters" });
    case 21:
      return S.suspend(() => S.Struct({ Name: S.String, Value: S.String })).annotate({
        identifier: "SageMakerPipelineParameter",
      });
    case 22:
      return S.Array(__S(1461, __c45, 21));
    case 23:
      return S.suspend(() =>
        S.Struct({ PipelineParameterList: S.optional(__S(1462, __c45, 22)) }),
      ).annotate({ identifier: "SageMakerPipelineParameters" });
    case 24:
      return S.suspend(() => S.Struct({ Arn: S.optional(S.String) })).annotate({
        identifier: "DeadLetterConfig",
      });
    case 25:
      return S.suspend(() =>
        S.Struct({
          MaximumRetryAttempts: S.optional(S.Number),
          MaximumEventAgeInSeconds: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RetryPolicy" });
    case 26:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Arn: S.String,
          RoleArn: S.optional(S.String),
          Input: S.optional(S.String),
          InputPath: S.optional(S.String),
          InputTransformer: S.optional(__S(1441, __c45, 1)),
          KinesisParameters: S.optional(__S(1442, __c45, 2)),
          RunCommandParameters: S.optional(__S(1445, __c45, 5)),
          EcsParameters: S.optional(__S(1454, __c45, 14)),
          BatchParameters: S.optional(__S(1457, __c45, 17)),
          SqsParameters: S.optional(__S(1458, __c45, 18)),
          HttpParameters: S.optional(__S(1459, __c45, 19)),
          RedshiftDataParameters: S.optional(__S(1460, __c45, 20)),
          SageMakerPipelineParameters: S.optional(__S(1463, __c45, 23)),
          DeadLetterConfig: S.optional(__S(1464, __c45, 24)),
          RetryPolicy: S.optional(__S(1465, __c45, 25)),
        }),
      ).annotate({ identifier: "Target" });
    case 27:
      return S.Array(__S(1466, __c45, 26));
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Time: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Source: S.optional(S.String),
          Resources: S.optional(__S(896, __c28, 0)),
          DetailType: S.optional(S.String),
          Detail: S.optional(S.String),
          EventBusName: S.optional(S.String),
          TraceHeader: S.optional(S.String),
        }),
      ).annotate({ identifier: "PutEventsRequestEntry" });
    case 1:
      return S.Array(__S(1472, __c46, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Entries: __S(1473, __c46, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutEventsRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EventId: S.optional(S.String),
          ErrorCode: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "PutEventsResultEntry" });
    case 1:
      return S.Array(__S(1504, __c47, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          FailedEntryCount: S.optional(S.Number),
          Entries: S.optional(__S(1505, __c47, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "PutEventsResponse" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Time: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Source: S.optional(S.String),
          Resources: S.optional(__S(896, __c28, 0)),
          DetailType: S.optional(S.String),
          Detail: S.optional(S.String),
        }),
      ).annotate({ identifier: "PutPartnerEventsRequestEntry" });
    case 1:
      return S.Array(__S(1536, __c48, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Entries: __S(1537, __c48, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutPartnerEventsRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Type: S.String, Key: S.String, Value: S.String })).annotate(
        { identifier: "Condition" },
      );
    case 1:
      return S.suspend(() =>
        S.Struct({
          EventBusName: S.optional(S.String),
          Action: S.optional(S.String),
          Principal: S.optional(S.String),
          StatementId: S.optional(S.String),
          Condition: S.optional(__S(1568, __c49, 0)),
          Policy: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutPermissionRequest" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          ScheduleExpression: S.optional(S.String),
          EventPattern: S.optional(S.String),
          State: S.optional(S.String),
          Description: S.optional(S.String),
          RoleArn: S.optional(S.String),
          Tags: S.optional(__S(321, __c10, 1)),
          EventBusName: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutRuleRequest" });
    case 1:
      return S.suspend(() => S.Struct({ RuleArn: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "PutRuleResponse",
      });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Rule: S.String,
          EventBusName: S.optional(S.String),
          Targets: __S(1467, __c45, 27),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutTargetsRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TargetId: S.optional(S.String),
          ErrorCode: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "PutTargetsResultEntry" });
    case 1:
      return S.Array(__S(1664, __c52, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          FailedEntryCount: S.optional(S.Number),
          FailedEntries: S.optional(__S(1665, __c52, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "PutTargetsResponse" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StatementId: S.optional(S.String),
          RemoveAllPermissions: S.optional(S.Boolean),
          EventBusName: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RemovePermissionRequest" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Rule: S.String,
          EventBusName: S.optional(S.String),
          Ids: __S(896, __c28, 0),
          Force: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RemoveTargetsRequest" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReplayName: S.String,
          Description: S.optional(S.String),
          EventSourceArn: S.String,
          EventStartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          EventEndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Destination: __S(928, __c29, 0),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartReplayRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ReplayArn: S.optional(S.String),
          State: S.optional(S.String),
          StateReason: S.optional(S.String),
          ReplayStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(ns),
      ).annotate({ identifier: "StartReplayResponse" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, Tags: __S(321, __c10, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EventPattern: S.String, Event: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TestEventPatternRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Result: S.optional(S.Boolean) }).pipe(ns)).annotate({
        identifier: "TestEventPatternResponse",
      });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, TagKeys: __S(896, __c28, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          ConnectionArn: S.optional(S.String),
          InvocationEndpoint: S.optional(S.String),
          HttpMethod: S.optional(S.String),
          InvocationRateLimitPerSecond: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateApiDestinationRequest" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ArchiveName: S.String,
          Description: S.optional(S.String),
          EventPattern: S.optional(S.String),
          RetentionDays: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateArchiveRequest" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Username: S.optional(S.String), Password: S.optional(SensitiveString) }),
      ).annotate({ identifier: "UpdateConnectionBasicAuthRequestParameters" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ClientID: S.optional(S.String), ClientSecret: S.optional(SensitiveString) }),
      ).annotate({ identifier: "UpdateConnectionOAuthClientRequestParameters" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ClientParameters: S.optional(__S(1953, __c61, 1)),
          AuthorizationEndpoint: S.optional(S.String),
          HttpMethod: S.optional(S.String),
          OAuthHttpParameters: S.optional(__S(258, __c8, 2)),
        }),
      ).annotate({ identifier: "UpdateConnectionOAuthRequestParameters" });
    case 3:
      return S.suspend(() =>
        S.Struct({ ApiKeyName: S.optional(S.String), ApiKeyValue: S.optional(SensitiveString) }),
      ).annotate({ identifier: "UpdateConnectionApiKeyAuthRequestParameters" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          BasicAuthParameters: S.optional(__S(1952, __c61, 0)),
          OAuthParameters: S.optional(__S(1954, __c61, 2)),
          ApiKeyAuthParameters: S.optional(__S(1955, __c61, 3)),
          InvocationHttpParameters: S.optional(__S(258, __c8, 2)),
        }),
      ).annotate({ identifier: "UpdateConnectionAuthRequestParameters" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          AuthorizationType: S.optional(S.String),
          AuthParameters: S.optional(__S(1956, __c61, 4)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateConnectionRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
