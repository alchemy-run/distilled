import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const ns = /*@__PURE__*/ T.XmlNamespace("http://eventsv2.amazonaws.com/doc/2025-05-15");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "EventBridgeV2",
  serviceShapeName: "AWSEventsV2",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "events" });
const ver = /*@__PURE__*/ T.ServiceVersion("2025-05-15");
const proto = /*@__PURE__*/ T.SmithyProtocolsRpcv2Cbor();
const rules = /*@__PURE__*/ T.EndpointResolver((p, _) => {
  const {
    Region,
    Endpoint,
    UseFIPS = false,
    UseDualStack = false,
    AccountId,
    EventBusArn,
    AccountIdEndpointMode,
  } = p;
  const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
    type: "endpoint" as const,
    endpoint: { url: u as string, properties: p, headers: h },
  });
  const err = (m: unknown): T.EndpointResolverResult => ({
    type: "error" as const,
    message: m as string,
  });
  const _p0 = () => ({ metricValues: ["O"] });
  if (Endpoint != null) {
    if (UseFIPS === true) {
      return err("Invalid Configuration: FIPS and custom endpoint are not supported");
    }
    if (UseDualStack === true) {
      return err("Invalid Configuration: Dualstack and custom endpoint are not supported");
    }
    return e(Endpoint);
  }
  {
    const PartitionResult = _.partition(Region);
    if (PartitionResult != null && PartitionResult !== false) {
      {
        const ParsedBusArn = _.parseArn(EventBusArn);
        if (
          AccountIdEndpointMode != null &&
          !(AccountIdEndpointMode === "disabled") &&
          EventBusArn != null &&
          ParsedBusArn != null &&
          ParsedBusArn !== false &&
          _.getAttr(ParsedBusArn, "service") === "events" &&
          _.isValidHostLabel(_.getAttr(ParsedBusArn, "accountId"), false)
        ) {
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              return e(
                `https://${_.getAttr(ParsedBusArn, "accountId")}.eventsv2-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                _p0(),
                {},
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (true === _.getAttr(PartitionResult, "supportsFIPS")) {
              return e(
                `https://${_.getAttr(ParsedBusArn, "accountId")}.eventsv2-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                _p0(),
                {},
              );
            }
            return err("FIPS is enabled but this partition does not support FIPS");
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://${_.getAttr(ParsedBusArn, "accountId")}.eventsv2.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                _p0(),
                {},
              );
            }
            return err("DualStack is enabled but this partition does not support DualStack");
          }
          return e(
            `https://${_.getAttr(ParsedBusArn, "accountId")}.eventsv2.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            _p0(),
            {},
          );
        }
      }
      if (
        AccountIdEndpointMode != null &&
        !(AccountIdEndpointMode === "disabled") &&
        AccountId != null
      ) {
        if (_.isValidHostLabel(AccountId, false)) {
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              return e(
                `https://${AccountId}.eventsv2-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                _p0(),
                {},
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (true === _.getAttr(PartitionResult, "supportsFIPS")) {
              return e(
                `https://${AccountId}.eventsv2-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                _p0(),
                {},
              );
            }
            return err("FIPS is enabled but this partition does not support FIPS");
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://${AccountId}.eventsv2.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                _p0(),
                {},
              );
            }
            return err("DualStack is enabled but this partition does not support DualStack");
          }
          return e(
            `https://${AccountId}.eventsv2.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            _p0(),
            {},
          );
        }
        return err("Credentials-sourced account ID parameter is invalid");
      }
      if (AccountIdEndpointMode != null && AccountIdEndpointMode === "required") {
        return err(
          "AccountIdEndpointMode is required but no AccountID was provided or able to be loaded",
        );
      }
      if (UseFIPS === true && UseDualStack === true) {
        if (
          true === _.getAttr(PartitionResult, "supportsFIPS") &&
          true === _.getAttr(PartitionResult, "supportsDualStack")
        ) {
          return e(
            `https://eventsv2-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        return err(
          "FIPS and DualStack are enabled, but this partition does not support one or both",
        );
      }
      if (UseFIPS === true) {
        if (true === _.getAttr(PartitionResult, "supportsFIPS")) {
          return e(`https://eventsv2-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
        }
        return err("FIPS is enabled but this partition does not support FIPS");
      }
      if (UseDualStack === true) {
        if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
          return e(
            `https://eventsv2.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        return err("DualStack is enabled but this partition does not support DualStack");
      }
      return e(`https://eventsv2.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
    }
  }
  return err("No matching endpoint rule");
}, '{"url":"https://eventsv2.{R}.{D}","properties":{},"headers":{}}');

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "EventBridgeV2",
  service: "EventBridgeV2",
  templates: false,
  propagate: TxXray.propagate,
} as const;

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(409), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withConflictError, C.withRetryableError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class IdempotentParameterMismatchException
  extends /*@__PURE__*/ S.TaggedError<IdempotentParameterMismatchException>()(
    "IdempotentParameterMismatchException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalException
  extends /*@__PURE__*/ S.TaggedError<InternalException>()(
    "InternalException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class InvalidInputException
  extends /*@__PURE__*/ S.TaggedError<InvalidInputException>()(
    "InvalidInputException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidStateException
  extends /*@__PURE__*/ S.TaggedError<InvalidStateException>()(
    "InvalidStateException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withThrottlingError, C.withRetryableError) {}
export class PolicyLengthExceededException
  extends /*@__PURE__*/ S.TaggedError<PolicyLengthExceededException>()(
    "PolicyLengthExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class PublicPolicyException
  extends /*@__PURE__*/ S.TaggedError<PublicPolicyException>()(
    "PublicPolicyException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ResourceAlreadyExistsException>()(
    "ResourceAlreadyExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class SchemaRegistryUnavailableException
  extends /*@__PURE__*/ S.TaggedError<SchemaRegistryUnavailableException>()(
    "SchemaRegistryUnavailableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(400), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withBadRequestError, C.withRetryableError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export type EventBusName = string;
export type Description = string;
export type KmsKeyIdentifier = string;
export interface EncryptionConfiguration {
  KmsKeyIdentifier?: string | undefined;
}
export type RetentionPeriodInDays = number;
export interface StorageConfiguration {
  RetentionPeriodInDays?: number | undefined;
}
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export type ClientToken = string;
export interface CreateEventBusRequest {
  Name: string;
  Description?: string | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
  StorageConfiguration?: StorageConfiguration | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
  ClientToken?: string | undefined;
}
export type EventBusArn = string;
export interface StorageConfigurationOutput {
  RetentionPeriodInDays?: number | undefined;
  RetentionWindowStartTime?: Date | undefined;
}
export type BusState =
  | "CREATING"
  | "CREATE_FAILED"
  | "UPDATING"
  | "UPDATE_FAILED"
  | "DELETING"
  | "ACTIVE"
  | "DELETE_FAILED"
  | (string & {});
export type StateReason = string;
export interface CreateEventBusResponse {
  EventBusArn?: string | undefined;
  Name?: string | undefined;
  Description?: string | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
  StorageConfiguration?: StorageConfigurationOutput | undefined;
  State?: BusState | undefined;
  StateReason?: string | undefined;
  CreationTime?: Date | undefined;
}
export type EventSourceName = string;
export type AwsServiceSource = string;
export type EventPattern = string | redacted.Redacted<string>;
export type DeadLetterQueueArn = string;
export interface OnFailureConfiguration {
  Arn?: string | undefined;
}
export interface AwsServiceEventsSourceConfiguration {
  AwsService: string;
  Pattern?: string | redacted.Redacted<string> | undefined;
  OnFailureConfiguration?: OnFailureConfiguration | undefined;
}
export type PartnerEventSourceArn = string;
export interface PartnerEventsSourceConfiguration {
  PartnerEventSourceArn: string;
  Pattern?: string | redacted.Redacted<string> | undefined;
  PartnerBusKmsKeyIdentifier?: string | undefined;
  OnFailureConfiguration?: OnFailureConfiguration | undefined;
}
export type WebhookHeaderName = string;
export type WebhookSecretValue = string | redacted.Redacted<string>;
export interface WebhookStaticTokenAuthConfiguration {
  TokenHttpHeader: string;
  SecretValue?: string | redacted.Redacted<string> | undefined;
}
export type WebhookUsername = string;
export interface WebhookBasicHttpAuthConfiguration {
  Username?: string | undefined;
  Password?: string | redacted.Redacted<string> | undefined;
}
export type WebhookHmacAlgorithm = "SHA256" | "SHA1" | (string & {});
export type WebhookHmacEncoding = "HEX" | "BASE64" | (string & {});
export type WebhookSignaturePrefix = string;
export type WebhookDelimiter = string;
export type WebhookTimestampPrefix = string;
export type WebhookTimestampToleranceInSeconds = number;
export type WebhookSignedMessageComposition =
  | "BODY"
  | "TIMESTAMP_DOT_BODY"
  | "MESSAGE_ID_DOT_TIMESTAMP_DOT_BODY"
  | (string & {});
export type WebhookSecretEncoding = "RAW" | "BASE64" | (string & {});
export interface WebhookHmacAuthConfiguration {
  Algorithm: WebhookHmacAlgorithm;
  Encoding: WebhookHmacEncoding;
  SignatureHttpHeader: string;
  SignaturePrefix?: string | undefined;
  Delimiter?: string | undefined;
  TimestampHttpHeader?: string | undefined;
  TimestampPrefix?: string | undefined;
  TimestampToleranceInSeconds?: number | undefined;
  MessageIdHttpHeader?: string | undefined;
  SignedMessageComposition: WebhookSignedMessageComposition;
  SecretValue?: string | redacted.Redacted<string> | undefined;
  SecretEncoding?: WebhookSecretEncoding | undefined;
}
export type WebhookAuthConfiguration =
  | {
      StaticTokenAuthConfiguration: WebhookStaticTokenAuthConfiguration;
      BasicHttpAuthConfiguration?: undefined;
      HmacAuthConfiguration?: undefined;
    }
  | {
      StaticTokenAuthConfiguration?: undefined;
      BasicHttpAuthConfiguration: WebhookBasicHttpAuthConfiguration;
      HmacAuthConfiguration?: undefined;
    }
  | {
      StaticTokenAuthConfiguration?: undefined;
      BasicHttpAuthConfiguration?: undefined;
      HmacAuthConfiguration: WebhookHmacAuthConfiguration;
    };
export type RoleArn = string;
export type WebhookMetadataHttpHeaderName = string;
export type WebhookMetadataHttpHeaderList = string[];
export type WebhookDeduplicationType = "CONTENT_BASED" | (string & {});
export interface WebhookDeduplicationConfiguration {
  DeduplicationType: WebhookDeduplicationType;
}
export type LogLevel = "OFF" | "ERROR" | "INFO" | (string & {});
export type IncludePayload = "FULL" | "ON_ERROR_ONLY" | (string & {});
export interface LogConfiguration {
  Level?: LogLevel | undefined;
  IncludePayload?: IncludePayload | undefined;
}
export interface WebhookEventsSourceConfiguration {
  AuthConfiguration: WebhookAuthConfiguration;
  KmsKeyIdentifier?: string | undefined;
  RoleArn: string;
  MetadataHttpHeaders?: string[] | undefined;
  DeduplicationConfiguration?: WebhookDeduplicationConfiguration | undefined;
  LogConfiguration?: LogConfiguration | undefined;
}
export type EventSourceConfiguration =
  | {
      AwsServiceEventsConfiguration: AwsServiceEventsSourceConfiguration;
      PartnerEventsConfiguration?: undefined;
      WebhookEventsConfiguration?: undefined;
    }
  | {
      AwsServiceEventsConfiguration?: undefined;
      PartnerEventsConfiguration: PartnerEventsSourceConfiguration;
      WebhookEventsConfiguration?: undefined;
    }
  | {
      AwsServiceEventsConfiguration?: undefined;
      PartnerEventsConfiguration?: undefined;
      WebhookEventsConfiguration: WebhookEventsSourceConfiguration;
    };
export interface CreateEventSourceRequest {
  Name: string;
  EventBusArn: string;
  Configuration: EventSourceConfiguration;
  Description?: string | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
  ClientToken?: string | undefined;
}
export type EventSourceArn = string;
export type EventSourceState =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "CREATE_FAILED"
  | "UPDATE_FAILED"
  | "DELETING"
  | "DELETE_FAILED"
  | (string & {});
export type WebhookUrl = string | redacted.Redacted<string>;
export type WebhookSecretArn = string;
export interface WebhookDetails {
  WebhookUrl?: string | redacted.Redacted<string> | undefined;
  SecretArn?: string | undefined;
}
export interface EventSourceDetails {
  WebhookDetails?: WebhookDetails | undefined;
}
export interface CreateEventSourceResponse {
  EventSourceArn?: string | undefined;
  Name?: string | undefined;
  EventBusArn?: string | undefined;
  State?: EventSourceState | undefined;
  EventSourceDetails?: EventSourceDetails | undefined;
  CreationTime?: Date | undefined;
}
export type SubscriberName = string;
export type InvocationType = "EVENT" | "REQUEST_RESPONSE" | (string & {});
export interface LambdaParameters {
  InvocationType?: InvocationType | undefined;
  Qualifier?: string | undefined;
  DurableExecutionName?: string | undefined;
  TenantId?: string | undefined;
  InvocationTimeoutSeconds?: string | undefined;
}
export type MessageAttributeName = string;
export interface SqsMessageAttributeValue {
  DataType?: string | undefined;
  StringValue?: string | undefined;
  BinaryValue?: string | undefined;
}
export type SqsMessageAttributeMap = { [key: string]: SqsMessageAttributeValue | undefined };
export interface SqsParameters {
  MessageGroupId?: string | undefined;
  MessageDeduplicationId?: string | undefined;
  DelaySeconds?: string | undefined;
  MessageAttributes?: { [key: string]: SqsMessageAttributeValue | undefined } | undefined;
  MessageSystemAttributes?: { [key: string]: SqsMessageAttributeValue | undefined } | undefined;
}
export interface SnsMessageAttributeValue {
  DataType?: string | undefined;
  StringValue?: string | undefined;
  BinaryValue?: string | undefined;
}
export type SnsMessageAttributeMap = { [key: string]: SnsMessageAttributeValue | undefined };
export interface SnsParameters {
  MessageGroupId?: string | undefined;
  MessageDeduplicationId?: string | undefined;
  Subject?: string | undefined;
  MessageStructure?: string | undefined;
  MessageAttributes?: { [key: string]: SnsMessageAttributeValue | undefined } | undefined;
}
export interface KinesisParameters {
  PartitionKey?: string | undefined;
  ExplicitHashKey?: string | undefined;
}
export interface StepFunctionsParameters {
  InvocationType?: InvocationType | undefined;
  Name?: string | undefined;
  TraceHeader?: string | undefined;
  InvocationTimeoutSeconds?: string | undefined;
}
export type PathParameter = string;
export type PathParameterList = string[];
export type HeaderKey = string;
export type HeaderValue = string;
export type HeaderParametersMap = { [key: string]: string | undefined };
export type QueryStringKey = string;
export type QueryStringValue = string;
export type QueryStringParametersMap = { [key: string]: string | undefined };
export interface HttpParameters {
  PathParameterValues?: string[] | undefined;
  HeaderParameters?: { [key: string]: string | undefined } | undefined;
  QueryStringParameters?: { [key: string]: string | undefined } | undefined;
  InvocationTimeoutSeconds?: string | undefined;
}
export type UniversalTargetInput = string;
export interface UniversalTargetParameters {
  Input: string;
  InvocationTimeoutSeconds?: string | undefined;
}
export type EventBusV2MetadataMap = { [key: string]: string | undefined };
export interface EventBusV2SystemMetadata {
  EventGroupId?: string | undefined;
  DeduplicationId?: string | undefined;
}
export type DeduplicationType = "CONTENT_BASED" | (string & {});
export interface DeduplicationConfiguration {
  DeduplicationType: DeduplicationType;
}
export interface EventBusV2Parameters {
  Metadata?: { [key: string]: string | undefined } | undefined;
  SystemMetadata?: EventBusV2SystemMetadata | undefined;
  DeduplicationConfiguration?: DeduplicationConfiguration | undefined;
}
export type MskTopicName = string;
export type MskCompression = "NONE" | "GZIP" | "SNAPPY" | "LZ4" | "ZSTD" | (string & {});
export type MskAcks = "ALL" | "LEADER" | (string & {});
export interface MskHeader {
  Key: string;
  Value?: string | undefined;
}
export type MskHeaderList = MskHeader[];
export type MskClientId = string;
export type MskConnectivity = "PUBLIC" | "PRIVATE" | (string & {});
export interface MskParameters {
  TopicName: string;
  Compression?: MskCompression | undefined;
  Acks?: MskAcks | undefined;
  PartitionKey?: string | undefined;
  Headers?: MskHeader[] | undefined;
  ClientId?: string | undefined;
  Connectivity: MskConnectivity;
}
export type TargetResourceArn = string;
export interface InvokeConfiguration {
  RoleArn: string;
  LambdaParameters?: LambdaParameters | undefined;
  SqsParameters?: SqsParameters | undefined;
  SnsParameters?: SnsParameters | undefined;
  KinesisParameters?: KinesisParameters | undefined;
  StepFunctionsParameters?: StepFunctionsParameters | undefined;
  HttpParameters?: HttpParameters | undefined;
  UniversalTargetParameters?: UniversalTargetParameters | undefined;
  EventBusV2Parameters?: EventBusV2Parameters | undefined;
  MskParameters?: MskParameters | undefined;
  TargetArn: string;
}
export type FilterLanguage = "EVENT_BRIDGE_PATTERN" | (string & {});
export type FilterScope = "DATA" | "METADATA" | "SYSTEM_METADATA" | (string & {});
export interface Filter {
  Pattern: string | redacted.Redacted<string>;
  Scope: FilterScope;
}
export type FilterList = Filter[];
export interface FilterConfiguration {
  Language?: FilterLanguage | undefined;
  Filters?: Filter[] | undefined;
}
export type OrderingType = "FIFO" | "UNORDERED" | (string & {});
export type StartingPosition = "LATEST" | "POINT_IN_TIME" | (string & {});
export type PointType = "HORIZON" | "TIMESTAMP" | (string & {});
export interface PointInTimeConfiguration {
  PointType: PointType;
  StartingPoint?: Date | undefined;
  EndPoint?: Date | undefined;
}
export interface BatchConfiguration {
  MaxBatchSize?: number | undefined;
  MaxBatchWindowInSeconds?: number | undefined;
}
export type TransformerType = "RAW" | "WITH_METADATA" | "JSONATA" | (string & {});
export interface JsonataConfiguration {
  Expression: string;
}
export interface Transformer {
  Type?: TransformerType | undefined;
  JsonataConfiguration?: JsonataConfiguration | undefined;
}
export type RetryStrategy = "ALL" | (string & {});
export interface RetryPolicy {
  MaxRetryAttempts?: number | undefined;
  MaxEventAgeInSeconds?: number | undefined;
  RetryStrategy?: RetryStrategy | undefined;
}
export type SubscriberState = "RUNNING" | "STOPPED" | (string & {});
export interface CreateSubscriberRequest {
  Name: string;
  EventBusArn: string;
  InvokeConfiguration: InvokeConfiguration;
  Description?: string | undefined;
  FilterConfiguration?: FilterConfiguration | undefined;
  Type?: OrderingType | undefined;
  StartingPosition?: StartingPosition | undefined;
  PointInTimeConfiguration?: PointInTimeConfiguration | undefined;
  BatchConfiguration?: BatchConfiguration | undefined;
  Transformer?: Transformer | undefined;
  RetryPolicy?: RetryPolicy | undefined;
  OnFailureConfiguration?: OnFailureConfiguration | undefined;
  LogConfiguration?: LogConfiguration | undefined;
  State?: SubscriberState | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
  ClientToken?: string | undefined;
}
export type SubscriberArn = string;
export type ConnectivityState = "PROVISIONING" | "PROVISION_FAILED" | "ACTIVE" | (string & {});
export type VpcConnectionArn = string;
export interface MskDetails {
  ConnectivityState?: ConnectivityState | undefined;
  StateReason?: string | undefined;
  VpcConnectionArn?: string | undefined;
}
export interface SubscriberDetails {
  MskDetails?: MskDetails | undefined;
}
export interface CreateSubscriberResponse {
  SubscriberArn?: string | undefined;
  Name?: string | undefined;
  EventBusArn?: string | undefined;
  Type?: OrderingType | undefined;
  StartingPosition?: StartingPosition | undefined;
  PointInTimeConfiguration?: PointInTimeConfiguration | undefined;
  State?: SubscriberState | undefined;
  CreationTime?: Date | undefined;
  SubscriberDetails?: SubscriberDetails | undefined;
}
export interface DeleteEventBusRequest {
  EventBusArn: string;
}
export interface DeleteEventBusResponse {}
export interface DeleteEventSourceRequest {
  EventSourceArn: string;
}
export interface DeleteEventSourceResponse {}
export type PolicyName = string;
export type PolicyRevisionId = string;
export interface DeleteResourcePolicyRequest {
  ResourceArn: string;
  PolicyName?: string | undefined;
  ExpectedRevisionId?: string | undefined;
}
export interface DeleteResourcePolicyResponse {
  RevisionId?: string | undefined;
}
export interface DeleteSubscriberRequest {
  SubscriberArn: string;
}
export interface DeleteSubscriberResponse {}
export interface DescribeEventBusRequest {
  EventBusArn: string;
}
export interface DescribeEventBusResponse {
  EventBusArn?: string | undefined;
  Name?: string | undefined;
  Description?: string | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
  StorageConfiguration?: StorageConfigurationOutput | undefined;
  CreationTime?: Date | undefined;
  LastModifiedTime?: Date | undefined;
  State?: BusState | undefined;
  StateReason?: string | undefined;
}
export interface DescribeEventSourceRequest {
  EventSourceArn: string;
}
export interface DescribeEventSourceResponse {
  EventSourceArn?: string | undefined;
  Name?: string | undefined;
  EventBusArn?: string | undefined;
  Configuration?: EventSourceConfiguration | undefined;
  Description?: string | undefined;
  State?: EventSourceState | undefined;
  Revoked?: boolean | undefined;
  EventSourceDetails?: EventSourceDetails | undefined;
  CreationTime?: Date | undefined;
  LastModifiedTime?: Date | undefined;
}
export interface DescribeSubscriberRequest {
  SubscriberArn: string;
}
export interface DescribeSubscriberResponse {
  SubscriberArn?: string | undefined;
  Name?: string | undefined;
  EventBusArn?: string | undefined;
  InvokeConfiguration?: InvokeConfiguration | undefined;
  Description?: string | undefined;
  FilterConfiguration?: FilterConfiguration | undefined;
  Type?: OrderingType | undefined;
  StartingPosition?: StartingPosition | undefined;
  PointInTimeConfiguration?: PointInTimeConfiguration | undefined;
  BatchConfiguration?: BatchConfiguration | undefined;
  Transformer?: Transformer | undefined;
  RetryPolicy?: RetryPolicy | undefined;
  OnFailureConfiguration?: OnFailureConfiguration | undefined;
  LogConfiguration?: LogConfiguration | undefined;
  State?: SubscriberState | undefined;
  Revoked?: boolean | undefined;
  CreationTime?: Date | undefined;
  LastModifiedTime?: Date | undefined;
  SubscriberDetails?: SubscriberDetails | undefined;
}
export interface GetResourcePolicyRequest {
  ResourceArn: string;
  PolicyName?: string | undefined;
}
export type PolicyDocument = string;
export interface GetResourcePolicyResponse {
  ResourceArn: string;
  PolicyDocument: string;
  PolicyName: string;
  RevisionId: string;
}
export type AccountId = string;
export type NextToken = string;
export type MaxResults = number;
export interface ListEventBusesRequest {
  NamePrefix?: string | undefined;
  EventBusAccountId?: string | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface EventBusSummary {
  Name?: string | undefined;
  EventBusArn?: string | undefined;
  Description?: string | undefined;
  CreationTime?: Date | undefined;
  LastModifiedTime?: Date | undefined;
  State?: BusState | undefined;
  StateReason?: string | undefined;
  EventBusAccountId?: string | undefined;
}
export type EventBusSummaryList = EventBusSummary[];
export interface ListEventBusesResponse {
  EventBuses?: EventBusSummary[] | undefined;
  NextToken?: string | undefined;
}
export interface ListEventSourcesRequest {
  EventBusArn?: string | undefined;
  NamePrefix?: string | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export type EventSourceType =
  | "AWS_SERVICE_EVENTS"
  | "PARTNER_EVENTS"
  | "WEBHOOK_EVENTS"
  | (string & {});
export interface EventSourceSummary {
  EventSourceArn?: string | undefined;
  Name?: string | undefined;
  EventBusArn?: string | undefined;
  Type?: EventSourceType | undefined;
  State?: EventSourceState | undefined;
  Revoked?: boolean | undefined;
  CreationTime?: Date | undefined;
  LastModifiedTime?: Date | undefined;
  EventSourceAccountId?: string | undefined;
}
export type EventSourceSummaryList = EventSourceSummary[];
export interface ListEventSourcesResponse {
  EventSources?: EventSourceSummary[] | undefined;
  NextToken?: string | undefined;
}
export interface ListResourcePoliciesRequest {
  ResourceArn: string;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface ResourcePolicySummary {
  PolicyName: string;
  RevisionId: string;
}
export type ResourcePolicySummaryList = ResourcePolicySummary[];
export interface ListResourcePoliciesResponse {
  PolicySummaries?: ResourcePolicySummary[] | undefined;
  NextToken?: string | undefined;
}
export interface ListSubscribersRequest {
  EventBusArn?: string | undefined;
  NamePrefix?: string | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface SubscriberSummary {
  SubscriberArn?: string | undefined;
  Name?: string | undefined;
  EventBusArn?: string | undefined;
  TargetArn?: string | undefined;
  Type?: OrderingType | undefined;
  Revoked?: boolean | undefined;
  State?: SubscriberState | undefined;
  CreationTime?: Date | undefined;
  LastModifiedTime?: Date | undefined;
  SubscriberAccountId?: string | undefined;
}
export type SubscriberSummaryList = SubscriberSummary[];
export interface ListSubscribersResponse {
  Subscribers?: SubscriberSummary[] | undefined;
  NextToken?: string | undefined;
}
export type TaggableResourceArn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined } | undefined;
}
export type Source = string;
export type DetailType = string;
export type EventDetail = string | redacted.Redacted<string>;
export type EventResource = string;
export type PutEventsResourceList = string[];
export type EventGroupId = string;
export type EventDeduplicationId = string;
export interface PutEventsSystemMetadata {
  EventGroupId?: string | undefined;
  DeduplicationId?: string | undefined;
}
export interface PutEventsRequestEntry {
  Source: string;
  DetailType: string;
  Detail?: string | redacted.Redacted<string> | undefined;
  Resources?: string[] | undefined;
  Time?: Date | undefined;
  SystemMetadata?: PutEventsSystemMetadata | undefined;
}
export type PutEventsRequestEntryList = PutEventsRequestEntry[];
export interface PutEventsRequest {
  EventBusArn: string;
  Entries: PutEventsRequestEntry[];
  DeduplicationConfiguration?: DeduplicationConfiguration | undefined;
}
export type EventId = string;
export type SequenceNumber = string;
export type SuccessCode = "PUBLISHED" | "DEDUPLICATED" | (string & {});
export type ErrorCode = string;
export type ErrorMessage = string;
export interface PutEventsResultEntry {
  EventId?: string | undefined;
  SequenceNumber?: string | undefined;
  SuccessCode?: SuccessCode | undefined;
  ErrorCode?: string | undefined;
  ErrorMessage?: string | undefined;
}
export type PutEventsResultEntryList = PutEventsResultEntry[];
export interface PutEventsResponse {
  FailedEntryCount?: number | undefined;
  Entries?: PutEventsResultEntry[] | undefined;
}
export type EventData = Uint8Array | redacted.Redacted<Uint8Array>;
export type EventMetadataKey = string;
export type EventMetadataValue = string | redacted.Redacted<string>;
export type EventMetadataMap = { [key: string]: string | redacted.Redacted<string> | undefined };
export type ContentType = string;
export interface PutRawEventsSystemMetadata {
  ContentType: string;
  DeduplicationId?: string | undefined;
  EventGroupId?: string | undefined;
}
export interface PutRawEventsRequestEntry {
  Data: Uint8Array | redacted.Redacted<Uint8Array>;
  Metadata?: { [key: string]: string | redacted.Redacted<string> | undefined } | undefined;
  SystemMetadata: PutRawEventsSystemMetadata;
}
export type PutRawEventsRequestEntryList = PutRawEventsRequestEntry[];
export type SchemaRegistryUri = string;
export type ConnectionArn = string;
export interface ConfluentPublicRegistryConfiguration {
  ConnectionArn: string;
}
export interface SchemaRegistryConfiguration {
  RegistryUri: string;
  ConfluentPublicRegistryConfiguration?: ConfluentPublicRegistryConfiguration | undefined;
}
export interface PutRawEventsRequest {
  EventBusArn: string;
  Entries: PutRawEventsRequestEntry[];
  SchemaRegistryConfiguration?: SchemaRegistryConfiguration | undefined;
  DeduplicationConfiguration?: DeduplicationConfiguration | undefined;
}
export interface PutRawEventsResultEntry {
  EventId?: string | undefined;
  SequenceNumber?: string | undefined;
  SuccessCode?: SuccessCode | undefined;
  ErrorCode?: string | undefined;
  ErrorMessage?: string | undefined;
}
export type PutRawEventsResultEntryList = PutRawEventsResultEntry[];
export interface PutRawEventsResponse {
  FailedEntryCount?: number | undefined;
  Entries?: PutRawEventsResultEntry[] | undefined;
}
export interface PutResourcePolicyRequest {
  ResourceArn: string;
  PolicyDocument: string;
  PolicyName?: string | undefined;
  ExpectedRevisionId?: string | undefined;
}
export interface PutResourcePolicyResponse {
  ResourceArn: string;
  PolicyName: string;
  RevisionId?: string | undefined;
}
export type RevocableResourceArn = string;
export interface RevokeResourceRequest {
  Arn: string;
}
export interface RevokeResourceResponse {
  Arn?: string | undefined;
}
export type WebhookEventSourceArn = string;
export type WebhookCredential =
  | {
      StaticTokenSecretValue: string | redacted.Redacted<string>;
      BasicHttpPassword?: undefined;
      HmacSecretValue?: undefined;
    }
  | {
      StaticTokenSecretValue?: undefined;
      BasicHttpPassword: string | redacted.Redacted<string>;
      HmacSecretValue?: undefined;
    }
  | {
      StaticTokenSecretValue?: undefined;
      BasicHttpPassword?: undefined;
      HmacSecretValue: string | redacted.Redacted<string>;
    };
export interface RotateWebhookCredentialsRequest {
  EventSourceArn: string;
  Credential?: WebhookCredential | undefined;
  ClientToken?: string | undefined;
}
export interface RotateWebhookCredentialsResponse {
  SecretArn: string;
}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateEventBusRequest {
  EventBusArn: string;
  Description?: string | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
  StorageConfiguration?: StorageConfiguration | undefined;
}
export interface UpdateEventBusResponse {
  EventBusArn?: string | undefined;
  Name?: string | undefined;
  Description?: string | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
  StorageConfiguration?: StorageConfigurationOutput | undefined;
  State?: BusState | undefined;
  StateReason?: string | undefined;
  LastModifiedTime?: Date | undefined;
}
export interface UpdateEventSourceRequest {
  EventSourceArn: string;
  Configuration?: EventSourceConfiguration | undefined;
  Description?: string | undefined;
}
export interface UpdateEventSourceResponse {
  EventSourceArn?: string | undefined;
  Name?: string | undefined;
  EventBusArn?: string | undefined;
  State?: EventSourceState | undefined;
  LastModifiedTime?: Date | undefined;
}
export type ResumePosition = "LAST_PROCESSED" | "LATEST" | (string & {});
export interface UpdateInvokeConfiguration {
  RoleArn: string;
  LambdaParameters?: LambdaParameters | undefined;
  SqsParameters?: SqsParameters | undefined;
  SnsParameters?: SnsParameters | undefined;
  KinesisParameters?: KinesisParameters | undefined;
  StepFunctionsParameters?: StepFunctionsParameters | undefined;
  HttpParameters?: HttpParameters | undefined;
  UniversalTargetParameters?: UniversalTargetParameters | undefined;
  EventBusV2Parameters?: EventBusV2Parameters | undefined;
  MskParameters?: MskParameters | undefined;
}
export interface UpdateSubscriberRequest {
  SubscriberArn: string;
  Description?: string | undefined;
  State?: SubscriberState | undefined;
  ResumePosition?: ResumePosition | undefined;
  InvokeConfiguration?: UpdateInvokeConfiguration | undefined;
  FilterConfiguration?: FilterConfiguration | undefined;
  BatchConfiguration?: BatchConfiguration | undefined;
  Transformer?: Transformer | undefined;
  RetryPolicy?: RetryPolicy | undefined;
  OnFailureConfiguration?: OnFailureConfiguration | undefined;
  LogConfiguration?: LogConfiguration | undefined;
}
export interface UpdateSubscriberResponse {
  SubscriberArn?: string | undefined;
  Name?: string | undefined;
  EventBusArn?: string | undefined;
  Type?: OrderingType | undefined;
  StartingPosition?: StartingPosition | undefined;
  PointInTimeConfiguration?: PointInTimeConfiguration | undefined;
  State?: SubscriberState | undefined;
  LastModifiedTime?: Date | undefined;
  SubscriberDetails?: SubscriberDetails | undefined;
}
export type CreateEventBusError =
  | ConcurrentModificationException
  | IdempotentParameterMismatchException
  | InvalidStateException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an event bus. Provisioning is asynchronous: the bus is returned in the CREATING state and transitions to ACTIVE when ready (see the EventBusActive waiter). Retries carrying the same ClientToken are idempotent.
 */
export const createEventBus: API.OperationMethod<
  CreateEventBusRequest & RegionInput,
  CreateEventBusResponse,
  CreateEventBusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateEventBusRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<CreateEventBusResponse>,
  errors: [
    ConcurrentModificationException,
    IdempotentParameterMismatchException,
    InvalidStateException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEventBus",
  telemetry: TELEMETRY,
  span: "CreateEventBus",
}));

export type CreateEventSourceError =
  | ConcurrentModificationException
  | IdempotentParameterMismatchException
  | InvalidStateException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an EventSource, which forwards events from an origin (an AWS service, a partner, or a third-party webhook provider) to an event bus. The event bus must be in the ACTIVE state. This operation is idempotent: retries that use the same ClientToken return the same result.
 */
export const createEventSource: API.OperationMethod<
  CreateEventSourceRequest & RegionInput,
  CreateEventSourceResponse,
  CreateEventSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c4, 0) as any as S.Schema<CreateEventSourceRequest>,
  output: __S(129, __c4, 1) as any as S.Schema<CreateEventSourceResponse>,
  errors: [
    ConcurrentModificationException,
    IdempotentParameterMismatchException,
    InvalidStateException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEventSource",
  telemetry: TELEMETRY,
  span: "CreateEventSource",
}));

export type CreateSubscriberError =
  | ConcurrentModificationException
  | IdempotentParameterMismatchException
  | InvalidStateException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a subscriber on an event bus, which delivers matching events to the configured target. The bus must be ACTIVE. Retries carrying the same ClientToken are idempotent. A subscriber that targets an Amazon MSK cluster provisions its connectivity asynchronously after this call returns and begins delivering when its ConnectivityState reaches ACTIVE (see the MskSubscriberActive waiter).
 */
export const createSubscriber: API.OperationMethod<
  CreateSubscriberRequest & RegionInput,
  CreateSubscriberResponse,
  CreateSubscriberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c10, 0) as any as S.Schema<CreateSubscriberRequest>,
  output: __S(321, __c10, 1) as any as S.Schema<CreateSubscriberResponse>,
  errors: [
    ConcurrentModificationException,
    IdempotentParameterMismatchException,
    InvalidStateException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSubscriber",
  telemetry: TELEMETRY,
  span: "CreateSubscriber",
}));

export type DeleteEventBusError =
  | ConcurrentModificationException
  | InvalidStateException
  | ResourceInUseException
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an event bus. Deletion is asynchronous: the bus moves to DELETING and disappears when complete (see the EventBusDeleted waiter). A bus with subscribers or event sources cannot be deleted.
 */
export const deleteEventBus: API.OperationMethod<
  DeleteEventBusRequest & RegionInput,
  DeleteEventBusResponse,
  DeleteEventBusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c14, 0) as any as S.Schema<DeleteEventBusRequest>,
  output: __S(480, __c15, 0) as any as S.Schema<DeleteEventBusResponse>,
  errors: [
    ConcurrentModificationException,
    InvalidStateException,
    ResourceInUseException,
    ResourceNotFoundException,
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventBus",
  telemetry: TELEMETRY,
  span: "DeleteEventBus",
}));

export type DeleteEventSourceError =
  | ConcurrentModificationException
  | InvalidStateException
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an EventSource. Forwarding from its origin stops.
 */
export const deleteEventSource: API.OperationMethod<
  DeleteEventSourceRequest & RegionInput,
  DeleteEventSourceResponse,
  DeleteEventSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c16, 0) as any as S.Schema<DeleteEventSourceRequest>,
  output: __S(480, __c15, 0) as any as S.Schema<DeleteEventSourceResponse>,
  errors: [
    ConcurrentModificationException,
    InvalidStateException,
    ResourceNotFoundException,
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventSource",
  telemetry: TELEMETRY,
  span: "DeleteEventSource",
}));

export type DeleteResourcePolicyError =
  | ConcurrentModificationException
  | ConflictException
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the named resource policy attached to an event bus.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest & RegionInput,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c17, 0) as any as S.Schema<DeleteResourcePolicyRequest>,
  output: __S(545, __c17, 1) as any as S.Schema<DeleteResourcePolicyResponse>,
  errors: [
    ConcurrentModificationException,
    ConflictException,
    ResourceNotFoundException,
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
  telemetry: TELEMETRY,
  span: "DeleteResourcePolicy",
}));

export type DeleteSubscriberError =
  | ConcurrentModificationException
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a subscriber. Events are no longer delivered to its target.
 */
export const deleteSubscriber: API.OperationMethod<
  DeleteSubscriberRequest & RegionInput,
  DeleteSubscriberResponse,
  DeleteSubscriberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c18, 0) as any as S.Schema<DeleteSubscriberRequest>,
  output: __S(480, __c15, 0) as any as S.Schema<DeleteSubscriberResponse>,
  errors: [
    ConcurrentModificationException,
    ResourceNotFoundException,
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSubscriber",
  telemetry: TELEMETRY,
  span: "DeleteSubscriber",
}));

export type DescribeEventBusError =
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the full configuration and lifecycle state of an event bus.
 */
export const describeEventBus: API.OperationMethod<
  DescribeEventBusRequest & RegionInput,
  DescribeEventBusResponse,
  DescribeEventBusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c19, 0) as any as S.Schema<DescribeEventBusRequest>,
  output: __S(609, __c19, 1) as any as S.Schema<DescribeEventBusResponse>,
  errors: [
    ResourceNotFoundException,
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEventBus",
  telemetry: TELEMETRY,
  span: "DescribeEventBus",
}));

export type DescribeEventSourceError =
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the full configuration and lifecycle state of an EventSource.
 */
export const describeEventSource: API.OperationMethod<
  DescribeEventSourceRequest & RegionInput,
  DescribeEventSourceResponse,
  DescribeEventSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c20, 0) as any as S.Schema<DescribeEventSourceRequest>,
  output: __S(641, __c20, 1) as any as S.Schema<DescribeEventSourceResponse>,
  errors: [
    ResourceNotFoundException,
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEventSource",
  telemetry: TELEMETRY,
  span: "DescribeEventSource",
}));

export type DescribeSubscriberError =
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the full configuration and state of a subscriber.
 */
export const describeSubscriber: API.OperationMethod<
  DescribeSubscriberRequest & RegionInput,
  DescribeSubscriberResponse,
  DescribeSubscriberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c21, 0) as any as S.Schema<DescribeSubscriberRequest>,
  output: __S(673, __c21, 1) as any as S.Schema<DescribeSubscriberResponse>,
  errors: [
    ResourceNotFoundException,
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSubscriber",
  telemetry: TELEMETRY,
  span: "DescribeSubscriber",
}));

export type GetResourcePolicyError =
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the named resource policy attached to an event bus. Fails with ResourceNotFoundException when the event bus or the named policy does not exist.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyRequest & RegionInput,
  GetResourcePolicyResponse,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c22, 0) as any as S.Schema<GetResourcePolicyRequest>,
  output: __S(705, __c22, 1) as any as S.Schema<GetResourcePolicyResponse>,
  errors: [
    ResourceNotFoundException,
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
  telemetry: TELEMETRY,
  span: "GetResourcePolicy",
}));

export type ListEventBusesError =
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the event buses visible to the caller: buses the account owns and buses shared with it through AWS RAM. Shared entries carry identity fields only (Name, EventBusArn, EventBusAccountId); owned entries carry every summary field. Set EventBusAccountId to scope the list to one owner account.
 */
export const listEventBuses: API.PaginatedOperationMethod<
  ListEventBusesRequest & RegionInput,
  ListEventBusesResponse,
  ListEventBusesError,
  Credentials | HttpClient.HttpClient,
  EventBusSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(736, __c23, 0) as any as S.Schema<ListEventBusesRequest>,
  output: __S(739, __c23, 3) as any as S.Schema<ListEventBusesResponse>,
  errors: [AccessDeniedException, InternalException, InvalidInputException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEventBuses",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EventBuses",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListEventBuses",
})) as any;

export type ListEventSourcesError =
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists EventSources as summaries. By default the list spans the EventSources the caller account owns; set EventBusArn to scope it to one bus. Use DescribeEventSource to retrieve full configuration.
 */
export const listEventSources: API.PaginatedOperationMethod<
  ListEventSourcesRequest & RegionInput,
  ListEventSourcesResponse,
  ListEventSourcesError,
  Credentials | HttpClient.HttpClient,
  EventSourceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(768, __c24, 0) as any as S.Schema<ListEventSourcesRequest>,
  output: __S(771, __c24, 3) as any as S.Schema<ListEventSourcesResponse>,
  errors: [
    ResourceNotFoundException,
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEventSources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EventSources",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListEventSources",
})) as any;

export type ListResourcePoliciesError =
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the resource policies attached to an event bus as summaries (policy name and revision ID). Use GetResourcePolicy to retrieve a policy document.
 */
export const listResourcePolicies: API.PaginatedOperationMethod<
  ListResourcePoliciesRequest & RegionInput,
  ListResourcePoliciesResponse,
  ListResourcePoliciesError,
  Credentials | HttpClient.HttpClient,
  ResourcePolicySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(800, __c25, 0) as any as S.Schema<ListResourcePoliciesRequest>,
  output: __S(803, __c25, 3) as any as S.Schema<ListResourcePoliciesResponse>,
  errors: [
    ResourceNotFoundException,
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourcePolicies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PolicySummaries",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListResourcePolicies",
})) as any;

export type ListSubscribersError =
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists subscribers as summaries. By default the list spans the subscribers the caller account owns across all buses; set EventBusArn to scope it to one bus. Use DescribeSubscriber to retrieve full configuration.
 */
export const listSubscribers: API.PaginatedOperationMethod<
  ListSubscribersRequest & RegionInput,
  ListSubscribersResponse,
  ListSubscribersError,
  Credentials | HttpClient.HttpClient,
  SubscriberSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(832, __c26, 0) as any as S.Schema<ListSubscribersRequest>,
  output: __S(835, __c26, 3) as any as S.Schema<ListSubscribersResponse>,
  errors: [
    ResourceNotFoundException,
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSubscribers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Subscribers",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListSubscribers",
})) as any;

export type ListTagsForResourceError =
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the tags on an event bus, subscriber, or event source.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest & RegionInput,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c27, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(865, __c27, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    ResourceNotFoundException,
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  telemetry: TELEMETRY,
  span: "ListTagsForResource",
}));

export type PutEventsError =
  | InternalException
  | InvalidStateException
  | ResourceNotFoundException
  | AccessDeniedException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Publishes events to an event bus.
 *
 * The total size of all event entries in a request must not exceed 1 MB (1,048,576 bytes). The limit applies to the request as a whole, not to individual entries. If you exceed the limit, the request fails with `InvalidInputException` and the service publishes none of the entries in the request.
 */
export const putEvents: API.OperationMethod<
  PutEventsRequest & RegionInput,
  PutEventsResponse,
  PutEventsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(898, __c28, 2) as any as S.Schema<PutEventsRequest>,
  output: __S(930, __c29, 2) as any as S.Schema<PutEventsResponse>,
  errors: [
    InternalException,
    InvalidStateException,
    ResourceNotFoundException,
    AccessDeniedException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEvents",
  telemetry: TELEMETRY,
  span: "PutEvents",
}));

export type PutRawEventsError =
  | InvalidStateException
  | ResourceNotFoundException
  | SchemaRegistryUnavailableException
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Publishes pre-shaped events to an event bus.
 *
 * The total size of all event entries in a request must not exceed 1 MB (1,048,576 bytes), including the `Data` payload and the keys and values of `Metadata` for each entry. The limit applies to the request as a whole, not to individual entries.
 *
 * If you exceed the limit, the request fails with `InvalidInputException`, and the service doesn't publish any of the entries in the request.
 */
export const putRawEvents: API.OperationMethod<
  PutRawEventsRequest & RegionInput,
  PutRawEventsResponse,
  PutRawEventsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(966, __c30, 6) as any as S.Schema<PutRawEventsRequest>,
  output: __S(930, __c29, 2) as any as S.Schema<PutRawEventsResponse>,
  errors: [
    InvalidStateException,
    ResourceNotFoundException,
    SchemaRegistryUnavailableException,
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRawEvents",
  telemetry: TELEMETRY,
  span: "PutRawEvents",
}));

export type PutResourcePolicyError =
  | ConcurrentModificationException
  | ConflictException
  | PolicyLengthExceededException
  | PublicPolicyException
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Attaches a named resource policy to an event bus -- the only resource type that supports policies; other resource ARNs are rejected. Each bus holds two named policies: "default" (customer-managed, full IAM policy language including Deny) and "AWS_RAM" (written exclusively by AWS Resource Access Manager to reflect resource shares). Both policies are evaluated on cross-account authorization; an explicit Deny in either overrides an Allow in the other. Operations that omit PolicyName target "default". A "default" policy that would grant public access is rejected with PublicPolicyException and is not attached; this check is always on and cannot be disabled.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest & RegionInput,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(992, __c31, 0) as any as S.Schema<PutResourcePolicyRequest>,
  output: __S(993, __c31, 1) as any as S.Schema<PutResourcePolicyResponse>,
  errors: [
    ConcurrentModificationException,
    ConflictException,
    PolicyLengthExceededException,
    PublicPolicyException,
    ResourceNotFoundException,
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
  telemetry: TELEMETRY,
  span: "PutResourcePolicy",
}));

export type RevokeResourceError =
  | ConcurrentModificationException
  | InvalidStateException
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Revokes a subscriber or an EventSource. The bus owner calls this to withdraw a misbehaving resource attached to their bus. Revocation is terminal: there is no operation that clears it. A revoked resource refuses mutating operations with InvalidStateException; delete stays available for cleanup.
 */
export const revokeResource: API.OperationMethod<
  RevokeResourceRequest & RegionInput,
  RevokeResourceResponse,
  RevokeResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1024, __c32, 0) as any as S.Schema<RevokeResourceRequest>,
  output: __S(1025, __c32, 1) as any as S.Schema<RevokeResourceResponse>,
  errors: [
    ConcurrentModificationException,
    InvalidStateException,
    ResourceNotFoundException,
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokeResource",
  telemetry: TELEMETRY,
  span: "RevokeResource",
}));

export type RotateWebhookCredentialsError =
  | ConcurrentModificationException
  | IdempotentParameterMismatchException
  | InvalidStateException
  | LimitExceededException
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Sets a new credential on a webhook EventSource. If you supply Credential, EventBridge uses that value. Otherwise, EventBridge generates one. For HTTP Basic authentication, only the password changes. The username does not change. EventBridge never returns the credential. To read a generated value, call secretsmanager:GetSecretValue on the secret that SecretArn identifies.
 *
 * You can rotate the credential of an EventSource in the ACTIVE, UPDATING, or UPDATE_FAILED state. For a revoked EventSource or an EventSource in any other state, EventBridge returns InvalidStateException. EventBridge also returns InvalidStateException if the secret of the EventSource is scheduled for deletion or has been deleted.
 *
 * If you rotate the credential of one EventSource too many times in 24 hours, EventBridge returns LimitExceededException. Retry later. The limit becomes available again automatically.
 *
 * If AWS Secrets Manager throttles the call, EventBridge returns ThrottlingException. Retry later.
 *
 * To use this operation, you must have the following permissions in your IAM policy:
 *
 * - secretsmanager:PutSecretValue on the secret of the EventSource
 *
 * - secretsmanager:GetSecretValue on the secret of the EventSource, for HTTP Basic authentication only
 *
 * - kms:GenerateDataKey and kms:Decrypt on the AWS KMS key that encrypts the secret
 *
 * The resource policy of the secret must not deny the secretsmanager actions.
 *
 * EventBridge accepts the new credential when this call returns. In rare cases, the new credential takes up to 2 minutes to reach every EventBridge endpoint.
 *
 * EventBridge also accepts the previous credential for 15 minutes after the rotation. The window ends at the CreatedDate of the AWSCURRENT secret version plus 15 minutes. Only the credential that the most recent rotation replaced stays valid. If you rotate again within 15 minutes, the older credential stops working immediately.
 *
 * A retry with the same ClientToken within 8 hours returns the same result and does not rotate again. A retry of a rotation that supplied a value can arrive after a later rotation completed. In that case, the retried value becomes the current credential, and the credential it replaces does not stay valid.
 */
export const rotateWebhookCredentials: API.OperationMethod<
  RotateWebhookCredentialsRequest & RegionInput,
  RotateWebhookCredentialsResponse,
  RotateWebhookCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1057, __c33, 1) as any as S.Schema<RotateWebhookCredentialsRequest>,
  output: __S(1058, __c33, 2) as any as S.Schema<RotateWebhookCredentialsResponse>,
  errors: [
    ConcurrentModificationException,
    IdempotentParameterMismatchException,
    InvalidStateException,
    LimitExceededException,
    ResourceNotFoundException,
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RotateWebhookCredentials",
  telemetry: TELEMETRY,
  span: "RotateWebhookCredentials",
}));

export type TagResourceError =
  | ConcurrentModificationException
  | InvalidStateException
  | LimitExceededException
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Adds or replaces tags on an event bus, subscriber, or event source.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest & RegionInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1088, __c34, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(480, __c15, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    ConcurrentModificationException,
    InvalidStateException,
    LimitExceededException,
    ResourceNotFoundException,
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  telemetry: TELEMETRY,
  span: "TagResource",
}));

export type UntagResourceError =
  | ConcurrentModificationException
  | InvalidStateException
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes tags from an event bus, subscriber, or event source.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest & RegionInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1120, __c35, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(480, __c15, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    ConcurrentModificationException,
    InvalidStateException,
    ResourceNotFoundException,
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  telemetry: TELEMETRY,
  span: "UntagResource",
}));

export type UpdateEventBusError =
  | ConcurrentModificationException
  | InvalidStateException
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates an event bus. The update is asynchronous: the bus moves to UPDATING and returns to ACTIVE when the change is applied. Fields omitted from the request are left unchanged.
 */
export const updateEventBus: API.OperationMethod<
  UpdateEventBusRequest & RegionInput,
  UpdateEventBusResponse,
  UpdateEventBusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1152, __c36, 0) as any as S.Schema<UpdateEventBusRequest>,
  output: __S(1153, __c36, 1) as any as S.Schema<UpdateEventBusResponse>,
  errors: [
    ConcurrentModificationException,
    InvalidStateException,
    ResourceNotFoundException,
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEventBus",
  telemetry: TELEMETRY,
  span: "UpdateEventBus",
}));

export type UpdateEventSourceError =
  | ConcurrentModificationException
  | InvalidStateException
  | LimitExceededException
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates an EventSource. Fields omitted from the request are left unchanged.
 */
export const updateEventSource: API.OperationMethod<
  UpdateEventSourceRequest & RegionInput,
  UpdateEventSourceResponse,
  UpdateEventSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1184, __c37, 0) as any as S.Schema<UpdateEventSourceRequest>,
  output: __S(1185, __c37, 1) as any as S.Schema<UpdateEventSourceResponse>,
  errors: [
    ConcurrentModificationException,
    InvalidStateException,
    LimitExceededException,
    ResourceNotFoundException,
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEventSource",
  telemetry: TELEMETRY,
  span: "UpdateEventSource",
}));

export type UpdateSubscriberError =
  | ConcurrentModificationException
  | InvalidStateException
  | LimitExceededException
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a subscriber. Fields omitted from the request are left unchanged. Changing an Amazon MSK subscriber's connectivity can re-provision it; when it does, the subscriber resumes delivering once its ConnectivityState returns to ACTIVE (see the MskSubscriberActive waiter).
 */
export const updateSubscriber: API.OperationMethod<
  UpdateSubscriberRequest & RegionInput,
  UpdateSubscriberResponse,
  UpdateSubscriberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1217, __c38, 1) as any as S.Schema<UpdateSubscriberRequest>,
  output: __S(1218, __c38, 2) as any as S.Schema<UpdateSubscriberResponse>,
  errors: [
    ConcurrentModificationException,
    InvalidStateException,
    LimitExceededException,
    ResourceNotFoundException,
    AccessDeniedException,
    InternalException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSubscriber",
  telemetry: TELEMETRY,
  span: "UpdateSubscriber",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          EncryptionConfiguration: S.optional(__S(64, __c2, 0)),
          StorageConfiguration: S.optional(__S(96, __c3, 0)),
          Tags: S.optional(__S(32, __c1, 0)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateEventBusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EventBusArn: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          EncryptionConfiguration: S.optional(__S(64, __c2, 0)),
          StorageConfiguration: S.optional(__S(65, __c2, 1)),
          State: S.optional(S.String),
          StateReason: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(ns),
      ).annotate({ identifier: "CreateEventBusResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ KmsKeyIdentifier: S.optional(S.String) })).annotate({
        identifier: "EncryptionConfiguration",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RetentionPeriodInDays: S.optional(S.Number),
          RetentionWindowStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "StorageConfigurationOutput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ RetentionPeriodInDays: S.optional(S.Number) })).annotate({
        identifier: "StorageConfiguration",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          EventBusArn: S.String.pipe(T.ContextParam("EventBusArn")),
          Configuration: __S(295, __c9, 7),
          Description: S.optional(S.String),
          Tags: S.optional(__S(32, __c1, 0)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateEventSourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EventSourceArn: S.optional(S.String),
          Name: S.optional(S.String),
          EventBusArn: S.optional(S.String),
          State: S.optional(S.String),
          EventSourceDetails: S.optional(__S(257, __c8, 1)),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(ns),
      ).annotate({ identifier: "CreateEventSourceResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ DeduplicationType: S.String })).annotate({
        identifier: "WebhookDeduplicationConfiguration",
      });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Arn: S.optional(S.String) })).annotate({
        identifier: "OnFailureConfiguration",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ Level: S.optional(S.String), IncludePayload: S.optional(S.String) }),
      ).annotate({ identifier: "LogConfiguration" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ WebhookUrl: S.optional(SensitiveString), SecretArn: S.optional(S.String) }),
      ).annotate({ identifier: "WebhookDetails" });
    case 1:
      return S.suspend(() => S.Struct({ WebhookDetails: S.optional(__S(256, __c8, 0)) })).annotate({
        identifier: "EventSourceDetails",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AwsService: S.String,
          Pattern: S.optional(SensitiveString),
          OnFailureConfiguration: S.optional(__S(224, __c7, 0)),
        }),
      ).annotate({ identifier: "AwsServiceEventsSourceConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PartnerEventSourceArn: S.String,
          Pattern: S.optional(SensitiveString),
          PartnerBusKmsKeyIdentifier: S.optional(S.String),
          OnFailureConfiguration: S.optional(__S(224, __c7, 0)),
        }),
      ).annotate({ identifier: "PartnerEventsSourceConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({ TokenHttpHeader: S.String, SecretValue: S.optional(SensitiveString) }),
      ).annotate({ identifier: "WebhookStaticTokenAuthConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({ Username: S.optional(S.String), Password: S.optional(SensitiveString) }),
      ).annotate({ identifier: "WebhookBasicHttpAuthConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Algorithm: S.String,
          Encoding: S.String,
          SignatureHttpHeader: S.String,
          SignaturePrefix: S.optional(S.String),
          Delimiter: S.optional(S.String),
          TimestampHttpHeader: S.optional(S.String),
          TimestampPrefix: S.optional(S.String),
          TimestampToleranceInSeconds: S.optional(S.Number),
          MessageIdHttpHeader: S.optional(S.String),
          SignedMessageComposition: S.String,
          SecretValue: S.optional(SensitiveString),
          SecretEncoding: S.optional(S.String),
        }),
      ).annotate({ identifier: "WebhookHmacAuthConfiguration" });
    case 5:
      return S.Union([
        /*@__PURE__*/ S.Struct({ StaticTokenAuthConfiguration: __S(290, __c9, 2) }),
        /*@__PURE__*/ S.Struct({ BasicHttpAuthConfiguration: __S(291, __c9, 3) }),
        /*@__PURE__*/ S.Struct({ HmacAuthConfiguration: __S(292, __c9, 4) }),
      ]);
    case 6:
      return S.suspend(() =>
        S.Struct({
          AuthConfiguration: __S(293, __c9, 5),
          KmsKeyIdentifier: S.optional(S.String),
          RoleArn: S.String,
          MetadataHttpHeaders: S.optional(__S(192, __c6, 0)),
          DeduplicationConfiguration: S.optional(__S(160, __c5, 0)),
          LogConfiguration: S.optional(__S(225, __c7, 1)),
        }),
      ).annotate({ identifier: "WebhookEventsSourceConfiguration" });
    case 7:
      return S.Union([
        /*@__PURE__*/ S.Struct({ AwsServiceEventsConfiguration: __S(288, __c9, 0) }),
        /*@__PURE__*/ S.Struct({ PartnerEventsConfiguration: __S(289, __c9, 1) }),
        /*@__PURE__*/ S.Struct({ WebhookEventsConfiguration: __S(294, __c9, 6) }),
      ]);
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          EventBusArn: S.String.pipe(T.ContextParam("EventBusArn")),
          InvokeConfiguration: __S(352, __c11, 0),
          Description: S.optional(S.String),
          FilterConfiguration: S.optional(__S(431, __c13, 15)),
          Type: S.optional(S.String),
          StartingPosition: S.optional(S.String),
          PointInTimeConfiguration: S.optional(__S(432, __c13, 16)),
          BatchConfiguration: S.optional(__S(433, __c13, 17)),
          Transformer: S.optional(__S(435, __c13, 19)),
          RetryPolicy: S.optional(__S(436, __c13, 20)),
          OnFailureConfiguration: S.optional(__S(224, __c7, 0)),
          LogConfiguration: S.optional(__S(225, __c7, 1)),
          State: S.optional(S.String),
          Tags: S.optional(__S(32, __c1, 0)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateSubscriberRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SubscriberArn: S.optional(S.String),
          Name: S.optional(S.String),
          EventBusArn: S.optional(S.String),
          Type: S.optional(S.String),
          StartingPosition: S.optional(S.String),
          PointInTimeConfiguration: S.optional(__S(432, __c13, 16)),
          State: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SubscriberDetails: S.optional(__S(438, __c13, 22)),
        }).pipe(ns),
      ).annotate({ identifier: "CreateSubscriberResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RoleArn: S.String,
          LambdaParameters: S.optional(__S(416, __c13, 0)),
          SqsParameters: S.optional(__S(419, __c13, 3)),
          SnsParameters: S.optional(__S(420, __c13, 4)),
          KinesisParameters: S.optional(__S(421, __c13, 5)),
          StepFunctionsParameters: S.optional(__S(422, __c13, 6)),
          HttpParameters: S.optional(__S(423, __c13, 7)),
          UniversalTargetParameters: S.optional(__S(424, __c13, 8)),
          EventBusV2Parameters: S.optional(__S(425, __c13, 9)),
          MskParameters: S.optional(__S(428, __c13, 12)),
          TargetArn: S.String,
        }),
      ).annotate({ identifier: "InvokeConfiguration" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EventGroupId: S.optional(S.String), DeduplicationId: S.optional(S.String) }),
      ).annotate({ identifier: "EventBusV2SystemMetadata" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InvocationType: S.optional(S.String),
          Qualifier: S.optional(S.String),
          DurableExecutionName: S.optional(S.String),
          TenantId: S.optional(S.String),
          InvocationTimeoutSeconds: S.optional(S.String),
        }),
      ).annotate({ identifier: "LambdaParameters" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DataType: S.optional(S.String),
          StringValue: S.optional(S.String),
          BinaryValue: S.optional(S.String),
        }),
      ).annotate({ identifier: "SqsMessageAttributeValue" });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(417, __c13, 1).pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({
          MessageGroupId: S.optional(S.String),
          MessageDeduplicationId: S.optional(S.String),
          DelaySeconds: S.optional(S.String),
          MessageAttributes: S.optional(__S(418, __c13, 2)),
          MessageSystemAttributes: S.optional(__S(418, __c13, 2)),
        }),
      ).annotate({ identifier: "SqsParameters" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          MessageGroupId: S.optional(S.String),
          MessageDeduplicationId: S.optional(S.String),
          Subject: S.optional(S.String),
          MessageStructure: S.optional(S.String),
          MessageAttributes: S.optional(__S(418, __c13, 2)),
        }),
      ).annotate({ identifier: "SnsParameters" });
    case 5:
      return S.suspend(() =>
        S.Struct({ PartitionKey: S.optional(S.String), ExplicitHashKey: S.optional(S.String) }),
      ).annotate({ identifier: "KinesisParameters" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          InvocationType: S.optional(S.String),
          Name: S.optional(S.String),
          TraceHeader: S.optional(S.String),
          InvocationTimeoutSeconds: S.optional(S.String),
        }),
      ).annotate({ identifier: "StepFunctionsParameters" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          PathParameterValues: S.optional(__S(192, __c6, 0)),
          HeaderParameters: S.optional(__S(32, __c1, 0)),
          QueryStringParameters: S.optional(__S(32, __c1, 0)),
          InvocationTimeoutSeconds: S.optional(S.String),
        }),
      ).annotate({ identifier: "HttpParameters" });
    case 8:
      return S.suspend(() =>
        S.Struct({ Input: S.String, InvocationTimeoutSeconds: S.optional(S.String) }),
      ).annotate({ identifier: "UniversalTargetParameters" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          Metadata: S.optional(__S(32, __c1, 0)),
          SystemMetadata: S.optional(__S(384, __c12, 0)),
          DeduplicationConfiguration: S.optional(__S(160, __c5, 0)),
        }),
      ).annotate({ identifier: "EventBusV2Parameters" });
    case 10:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.optional(S.String) })).annotate({
        identifier: "MskHeader",
      });
    case 11:
      return S.Array(__S(426, __c13, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          TopicName: S.String,
          Compression: S.optional(S.String),
          Acks: S.optional(S.String),
          PartitionKey: S.optional(S.String),
          Headers: S.optional(__S(427, __c13, 11)),
          ClientId: S.optional(S.String),
          Connectivity: S.String,
        }),
      ).annotate({ identifier: "MskParameters" });
    case 13:
      return S.suspend(() => S.Struct({ Pattern: SensitiveString, Scope: S.String })).annotate({
        identifier: "Filter",
      });
    case 14:
      return S.Array(__S(429, __c13, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({ Language: S.optional(S.String), Filters: S.optional(__S(430, __c13, 14)) }),
      ).annotate({ identifier: "FilterConfiguration" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          PointType: S.String,
          StartingPoint: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndPoint: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "PointInTimeConfiguration" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          MaxBatchSize: S.optional(S.Number),
          MaxBatchWindowInSeconds: S.optional(S.Number),
        }),
      ).annotate({ identifier: "BatchConfiguration" });
    case 18:
      return S.suspend(() => S.Struct({ Expression: S.String })).annotate({
        identifier: "JsonataConfiguration",
      });
    case 19:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          JsonataConfiguration: S.optional(__S(434, __c13, 18)),
        }),
      ).annotate({ identifier: "Transformer" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          MaxRetryAttempts: S.optional(S.Number),
          MaxEventAgeInSeconds: S.optional(S.Number),
          RetryStrategy: S.optional(S.String),
        }),
      ).annotate({ identifier: "RetryPolicy" });
    case 21:
      return S.suspend(() =>
        S.Struct({
          ConnectivityState: S.optional(S.String),
          StateReason: S.optional(S.String),
          VpcConnectionArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "MskDetails" });
    case 22:
      return S.suspend(() => S.Struct({ MskDetails: S.optional(__S(437, __c13, 21)) })).annotate({
        identifier: "SubscriberDetails",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EventBusArn: S.String.pipe(T.ContextParam("EventBusArn")) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteEventBusRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteEventBusResponse",
      });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EventSourceArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteEventSourceRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.ContextParam("EventBusArn")),
          PolicyName: S.optional(S.String),
          ExpectedRevisionId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteResourcePolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ RevisionId: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "DeleteResourcePolicyResponse",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SubscriberArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteSubscriberRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EventBusArn: S.String.pipe(T.ContextParam("EventBusArn")) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeEventBusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EventBusArn: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          EncryptionConfiguration: S.optional(__S(64, __c2, 0)),
          StorageConfiguration: S.optional(__S(65, __c2, 1)),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          State: S.optional(S.String),
          StateReason: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeEventBusResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EventSourceArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeEventSourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EventSourceArn: S.optional(S.String),
          Name: S.optional(S.String),
          EventBusArn: S.optional(S.String),
          Configuration: S.optional(__S(295, __c9, 7)),
          Description: S.optional(S.String),
          State: S.optional(S.String),
          Revoked: S.optional(S.Boolean),
          EventSourceDetails: S.optional(__S(257, __c8, 1)),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeEventSourceResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SubscriberArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeSubscriberRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SubscriberArn: S.optional(S.String),
          Name: S.optional(S.String),
          EventBusArn: S.optional(S.String),
          InvokeConfiguration: S.optional(__S(352, __c11, 0)),
          Description: S.optional(S.String),
          FilterConfiguration: S.optional(__S(431, __c13, 15)),
          Type: S.optional(S.String),
          StartingPosition: S.optional(S.String),
          PointInTimeConfiguration: S.optional(__S(432, __c13, 16)),
          BatchConfiguration: S.optional(__S(433, __c13, 17)),
          Transformer: S.optional(__S(435, __c13, 19)),
          RetryPolicy: S.optional(__S(436, __c13, 20)),
          OnFailureConfiguration: S.optional(__S(224, __c7, 0)),
          LogConfiguration: S.optional(__S(225, __c7, 1)),
          State: S.optional(S.String),
          Revoked: S.optional(S.Boolean),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SubscriberDetails: S.optional(__S(438, __c13, 22)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeSubscriberResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.ContextParam("EventBusArn")),
          PolicyName: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetResourcePolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String,
          PolicyDocument: S.String,
          PolicyName: S.String,
          RevisionId: S.String,
        }).pipe(ns),
      ).annotate({ identifier: "GetResourcePolicyResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NamePrefix: S.optional(S.String),
          EventBusAccountId: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListEventBusesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          EventBusArn: S.optional(S.String),
          Description: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          State: S.optional(S.String),
          StateReason: S.optional(S.String),
          EventBusAccountId: S.optional(S.String),
        }),
      ).annotate({ identifier: "EventBusSummary" });
    case 2:
      return S.Array(__S(737, __c23, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          EventBuses: S.optional(__S(738, __c23, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListEventBusesResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EventBusArn: S.optional(S.String).pipe(T.ContextParam("EventBusArn")),
          NamePrefix: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListEventSourcesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EventSourceArn: S.optional(S.String),
          Name: S.optional(S.String),
          EventBusArn: S.optional(S.String),
          Type: S.optional(S.String),
          State: S.optional(S.String),
          Revoked: S.optional(S.Boolean),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EventSourceAccountId: S.optional(S.String),
        }),
      ).annotate({ identifier: "EventSourceSummary" });
    case 2:
      return S.Array(__S(769, __c24, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          EventSources: S.optional(__S(770, __c24, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListEventSourcesResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.ContextParam("EventBusArn")),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListResourcePoliciesRequest" });
    case 1:
      return S.suspend(() => S.Struct({ PolicyName: S.String, RevisionId: S.String })).annotate({
        identifier: "ResourcePolicySummary",
      });
    case 2:
      return S.Array(__S(801, __c25, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          PolicySummaries: S.optional(__S(802, __c25, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListResourcePoliciesResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EventBusArn: S.optional(S.String).pipe(T.ContextParam("EventBusArn")),
          NamePrefix: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListSubscribersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SubscriberArn: S.optional(S.String),
          Name: S.optional(S.String),
          EventBusArn: S.optional(S.String),
          TargetArn: S.optional(S.String),
          Type: S.optional(S.String),
          Revoked: S.optional(S.Boolean),
          State: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SubscriberAccountId: S.optional(S.String),
        }),
      ).annotate({ identifier: "SubscriberSummary" });
    case 2:
      return S.Array(__S(833, __c26, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Subscribers: S.optional(__S(834, __c26, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListSubscribersResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(32, __c1, 0)) }).pipe(ns)).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Source: S.String,
          DetailType: S.String,
          Detail: S.optional(SensitiveString),
          Resources: S.optional(__S(192, __c6, 0)),
          Time: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SystemMetadata: S.optional(__S(384, __c12, 0)),
        }),
      ).annotate({ identifier: "PutEventsRequestEntry" });
    case 1:
      return S.Array(__S(896, __c28, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          EventBusArn: S.String.pipe(T.ContextParam("EventBusArn")),
          Entries: __S(897, __c28, 1),
          DeduplicationConfiguration: S.optional(__S(160, __c5, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutEventsRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EventId: S.optional(S.String),
          SequenceNumber: S.optional(S.String),
          SuccessCode: S.optional(S.String),
          ErrorCode: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "PutEventsResultEntry" });
    case 1:
      return S.Array(__S(928, __c29, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          FailedEntryCount: S.optional(S.Number),
          Entries: S.optional(__S(929, __c29, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "PutEventsResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ SensitiveString.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          ContentType: S.String,
          DeduplicationId: S.optional(S.String),
          EventGroupId: S.optional(S.String),
        }),
      ).annotate({ identifier: "PutRawEventsSystemMetadata" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Data: SensitiveBlob,
          Metadata: S.optional(__S(960, __c30, 0)),
          SystemMetadata: __S(961, __c30, 1),
        }),
      ).annotate({ identifier: "PutRawEventsRequestEntry" });
    case 3:
      return S.Array(__S(962, __c30, 2));
    case 4:
      return S.suspend(() => S.Struct({ ConnectionArn: S.String })).annotate({
        identifier: "ConfluentPublicRegistryConfiguration",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          RegistryUri: S.String,
          ConfluentPublicRegistryConfiguration: S.optional(__S(964, __c30, 4)),
        }),
      ).annotate({ identifier: "SchemaRegistryConfiguration" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          EventBusArn: S.String.pipe(T.ContextParam("EventBusArn")),
          Entries: __S(963, __c30, 3),
          SchemaRegistryConfiguration: S.optional(__S(965, __c30, 5)),
          DeduplicationConfiguration: S.optional(__S(160, __c5, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutRawEventsRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.ContextParam("EventBusArn")),
          PolicyDocument: S.String,
          PolicyName: S.optional(S.String),
          ExpectedRevisionId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutResourcePolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String,
          PolicyName: S.String,
          RevisionId: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "PutResourcePolicyResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RevokeResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Arn: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "RevokeResourceResponse",
      });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ StaticTokenSecretValue: SensitiveString }),
        /*@__PURE__*/ S.Struct({ BasicHttpPassword: SensitiveString }),
        /*@__PURE__*/ S.Struct({ HmacSecretValue: SensitiveString }),
      ]);
    case 1:
      return S.suspend(() =>
        S.Struct({
          EventSourceArn: S.String,
          Credential: S.optional(__S(1056, __c33, 0)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RotateWebhookCredentialsRequest" });
    case 2:
      return S.suspend(() => S.Struct({ SecretArn: S.String }).pipe(ns)).annotate({
        identifier: "RotateWebhookCredentialsResponse",
      });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, Tags: __S(32, __c1, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, TagKeys: __S(192, __c6, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EventBusArn: S.String.pipe(T.ContextParam("EventBusArn")),
          Description: S.optional(S.String),
          EncryptionConfiguration: S.optional(__S(64, __c2, 0)),
          StorageConfiguration: S.optional(__S(96, __c3, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateEventBusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EventBusArn: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          EncryptionConfiguration: S.optional(__S(64, __c2, 0)),
          StorageConfiguration: S.optional(__S(65, __c2, 1)),
          State: S.optional(S.String),
          StateReason: S.optional(S.String),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateEventBusResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EventSourceArn: S.String,
          Configuration: S.optional(__S(295, __c9, 7)),
          Description: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateEventSourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EventSourceArn: S.optional(S.String),
          Name: S.optional(S.String),
          EventBusArn: S.optional(S.String),
          State: S.optional(S.String),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateEventSourceResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RoleArn: S.String,
          LambdaParameters: S.optional(__S(416, __c13, 0)),
          SqsParameters: S.optional(__S(419, __c13, 3)),
          SnsParameters: S.optional(__S(420, __c13, 4)),
          KinesisParameters: S.optional(__S(421, __c13, 5)),
          StepFunctionsParameters: S.optional(__S(422, __c13, 6)),
          HttpParameters: S.optional(__S(423, __c13, 7)),
          UniversalTargetParameters: S.optional(__S(424, __c13, 8)),
          EventBusV2Parameters: S.optional(__S(425, __c13, 9)),
          MskParameters: S.optional(__S(428, __c13, 12)),
        }),
      ).annotate({ identifier: "UpdateInvokeConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SubscriberArn: S.String,
          Description: S.optional(S.String),
          State: S.optional(S.String),
          ResumePosition: S.optional(S.String),
          InvokeConfiguration: S.optional(__S(1216, __c38, 0)),
          FilterConfiguration: S.optional(__S(431, __c13, 15)),
          BatchConfiguration: S.optional(__S(433, __c13, 17)),
          Transformer: S.optional(__S(435, __c13, 19)),
          RetryPolicy: S.optional(__S(436, __c13, 20)),
          OnFailureConfiguration: S.optional(__S(224, __c7, 0)),
          LogConfiguration: S.optional(__S(225, __c7, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateSubscriberRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          SubscriberArn: S.optional(S.String),
          Name: S.optional(S.String),
          EventBusArn: S.optional(S.String),
          Type: S.optional(S.String),
          StartingPosition: S.optional(S.String),
          PointInTimeConfiguration: S.optional(__S(432, __c13, 16)),
          State: S.optional(S.String),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SubscriberDetails: S.optional(__S(438, __c13, 22)),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateSubscriberResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
