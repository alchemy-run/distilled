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
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "SecurityLake",
  serviceShapeName: "SecurityLake",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "securitylake" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-05-10");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
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
              `https://securitylake-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://securitylake-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://securitylake.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://securitylake.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://securitylake.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      errorCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceName: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceName: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      serviceCode: /*@__PURE__*/ S.optional(S.String),
      quotaCode: /*@__PURE__*/ S.optional(S.String),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()("UnauthorizedException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withAuthError) {}
export type AwsAccountId = string;
export type AccountList = string[];
export type Region = string;
export type RegionList = string[];
export type AwsLogSourceName =
  | "ROUTE53"
  | "VPC_FLOW"
  | "SH_FINDINGS"
  | "CLOUD_TRAIL_MGMT"
  | "LAMBDA_EXECUTION"
  | "S3_DATA"
  | "EKS_AUDIT"
  | "WAF"
  | (string & {});
export type AwsLogSourceVersion = string;
export interface AwsLogSourceConfiguration {
  accounts?: string[];
  regions: string[];
  sourceName: AwsLogSourceName;
  sourceVersion?: string;
}
export type AwsLogSourceConfigurationList = AwsLogSourceConfiguration[];
export interface CreateAwsLogSourceRequest {
  sources: AwsLogSourceConfiguration[];
}
export interface CreateAwsLogSourceResponse {
  failed?: string[];
}
export type CustomLogSourceName = string;
export type CustomLogSourceVersion = string;
export type OcsfEventClass = string;
export type OcsfEventClassList = string[];
export type RoleArn = string;
export interface CustomLogSourceCrawlerConfiguration {
  roleArn: string;
}
export type AwsPrincipal = string;
export type ExternalId = string;
export interface AwsIdentity {
  principal: string;
  externalId: string;
}
export interface CustomLogSourceConfiguration {
  crawlerConfiguration: CustomLogSourceCrawlerConfiguration;
  providerIdentity: AwsIdentity;
}
export interface CreateCustomLogSourceRequest {
  sourceName: string;
  sourceVersion?: string;
  eventClasses?: string[];
  configuration: CustomLogSourceConfiguration;
}
export type S3URI = string;
export interface CustomLogSourceProvider {
  roleArn?: string;
  location?: string;
}
export type AmazonResourceName = string;
export interface CustomLogSourceAttributes {
  crawlerArn?: string;
  databaseArn?: string;
  tableArn?: string;
}
export interface CustomLogSourceResource {
  sourceName?: string;
  sourceVersion?: string;
  provider?: CustomLogSourceProvider;
  attributes?: CustomLogSourceAttributes;
}
export interface CreateCustomLogSourceResponse {
  source?: CustomLogSourceResource;
}
export interface DataLakeEncryptionConfiguration {
  kmsKeyId?: string;
}
export interface DataLakeLifecycleExpiration {
  days?: number;
}
export type DataLakeStorageClass = string;
export interface DataLakeLifecycleTransition {
  storageClass?: string;
  days?: number;
}
export type DataLakeLifecycleTransitionList = DataLakeLifecycleTransition[];
export interface DataLakeLifecycleConfiguration {
  expiration?: DataLakeLifecycleExpiration;
  transitions?: DataLakeLifecycleTransition[];
}
export interface DataLakeReplicationConfiguration {
  regions?: string[];
  roleArn?: string;
}
export interface DataLakeConfiguration {
  region: string;
  encryptionConfiguration?: DataLakeEncryptionConfiguration;
  lifecycleConfiguration?: DataLakeLifecycleConfiguration;
  replicationConfiguration?: DataLakeReplicationConfiguration;
}
export type DataLakeConfigurationList = DataLakeConfiguration[];
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key: string;
  value: string;
}
export type TagList = Tag[];
export interface CreateDataLakeRequest {
  configurations: DataLakeConfiguration[];
  metaStoreManagerRoleArn: string;
  tags?: Tag[];
}
export type S3BucketArn = string;
export type DataLakeStatus = "INITIALIZED" | "PENDING" | "COMPLETED" | "FAILED" | (string & {});
export interface DataLakeUpdateException {
  reason?: string;
  code?: string;
}
export interface DataLakeUpdateStatus {
  requestId?: string;
  status?: DataLakeStatus;
  exception?: DataLakeUpdateException;
}
export interface DataLakeResource {
  dataLakeArn: string;
  region: string;
  s3BucketArn?: string;
  encryptionConfiguration?: DataLakeEncryptionConfiguration;
  lifecycleConfiguration?: DataLakeLifecycleConfiguration;
  replicationConfiguration?: DataLakeReplicationConfiguration;
  createStatus?: DataLakeStatus;
  updateStatus?: DataLakeUpdateStatus;
}
export type DataLakeResourceList = DataLakeResource[];
export interface CreateDataLakeResponse {
  dataLakes?: DataLakeResource[];
}
export type SubscriptionProtocol = string;
export type SafeString = string;
export interface CreateDataLakeExceptionSubscriptionRequest {
  subscriptionProtocol: string;
  notificationEndpoint: string;
  exceptionTimeToLive?: number;
}
export interface CreateDataLakeExceptionSubscriptionResponse {}
export interface AwsLogSourceResource {
  sourceName?: AwsLogSourceName;
  sourceVersion?: string;
}
export type AwsLogSourceResourceList = AwsLogSourceResource[];
export interface DataLakeAutoEnableNewAccountConfiguration {
  region: string;
  sources: AwsLogSourceResource[];
}
export type DataLakeAutoEnableNewAccountConfigurationList =
  DataLakeAutoEnableNewAccountConfiguration[];
export interface CreateDataLakeOrganizationConfigurationRequest {
  autoEnableNewAccount?: DataLakeAutoEnableNewAccountConfiguration[];
}
export interface CreateDataLakeOrganizationConfigurationResponse {}
export type DescriptionString = string;
export type LogSourceResource =
  | { awsLogSource: AwsLogSourceResource; customLogSource?: never }
  | { awsLogSource?: never; customLogSource: CustomLogSourceResource };
export type LogSourceResourceList = LogSourceResource[];
export type AccessType = "LAKEFORMATION" | "S3" | (string & {});
export type AccessTypeList = AccessType[];
export interface CreateSubscriberRequest {
  subscriberIdentity: AwsIdentity;
  subscriberName: string;
  subscriberDescription?: string;
  sources: LogSourceResource[];
  accessTypes?: AccessType[];
  tags?: Tag[];
}
export type UUID = string;
export type SubscriberStatus = "ACTIVE" | "DEACTIVATED" | "PENDING" | "READY" | (string & {});
export type ResourceShareArn = string;
export type ResourceShareName = string;
export interface SubscriberResource {
  subscriberId: string;
  subscriberArn: string;
  subscriberIdentity: AwsIdentity;
  subscriberName: string;
  subscriberDescription?: string;
  sources: LogSourceResource[];
  accessTypes?: AccessType[];
  roleArn?: string;
  s3BucketArn?: string;
  subscriberEndpoint?: string;
  subscriberStatus?: SubscriberStatus;
  resourceShareArn?: string;
  resourceShareName?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface CreateSubscriberResponse {
  subscriber?: SubscriberResource;
}
export interface SqsNotificationConfiguration {}
export type HttpMethod = "POST" | "PUT" | (string & {});
export interface HttpsNotificationConfiguration {
  endpoint: string;
  authorizationApiKeyName?: string;
  authorizationApiKeyValue?: string | redacted.Redacted<string>;
  httpMethod?: HttpMethod;
  targetRoleArn: string;
}
export type NotificationConfiguration =
  | {
      sqsNotificationConfiguration: SqsNotificationConfiguration;
      httpsNotificationConfiguration?: never;
    }
  | {
      sqsNotificationConfiguration?: never;
      httpsNotificationConfiguration: HttpsNotificationConfiguration;
    };
export interface CreateSubscriberNotificationRequest {
  subscriberId: string;
  configuration: NotificationConfiguration;
}
export interface CreateSubscriberNotificationResponse {
  subscriberEndpoint?: string;
}
export interface DeleteAwsLogSourceRequest {
  sources: AwsLogSourceConfiguration[];
}
export interface DeleteAwsLogSourceResponse {
  failed?: string[];
}
export interface DeleteCustomLogSourceRequest {
  sourceName: string;
  sourceVersion?: string;
}
export interface DeleteCustomLogSourceResponse {}
export interface DeleteDataLakeRequest {
  regions: string[];
}
export interface DeleteDataLakeResponse {}
export interface DeleteDataLakeExceptionSubscriptionRequest {}
export interface DeleteDataLakeExceptionSubscriptionResponse {}
export interface DeleteDataLakeOrganizationConfigurationRequest {
  autoEnableNewAccount?: DataLakeAutoEnableNewAccountConfiguration[];
}
export interface DeleteDataLakeOrganizationConfigurationResponse {}
export interface DeleteSubscriberRequest {
  subscriberId: string;
}
export interface DeleteSubscriberResponse {}
export interface DeleteSubscriberNotificationRequest {
  subscriberId: string;
}
export interface DeleteSubscriberNotificationResponse {}
export interface DeregisterDataLakeDelegatedAdministratorRequest {}
export interface DeregisterDataLakeDelegatedAdministratorResponse {}
export interface GetDataLakeExceptionSubscriptionRequest {}
export interface GetDataLakeExceptionSubscriptionResponse {
  subscriptionProtocol?: string;
  notificationEndpoint?: string;
  exceptionTimeToLive?: number;
}
export interface GetDataLakeOrganizationConfigurationRequest {}
export interface GetDataLakeOrganizationConfigurationResponse {
  autoEnableNewAccount?: DataLakeAutoEnableNewAccountConfiguration[];
}
export type MaxResults = number;
export type NextToken = string;
export interface GetDataLakeSourcesRequest {
  accounts?: string[];
  maxResults?: number;
  nextToken?: string;
}
export type SourceCollectionStatus =
  | "COLLECTING"
  | "MISCONFIGURED"
  | "NOT_COLLECTING"
  | (string & {});
export interface DataLakeSourceStatus {
  resource?: string;
  status?: SourceCollectionStatus;
}
export type DataLakeSourceStatusList = DataLakeSourceStatus[];
export interface DataLakeSource {
  account?: string;
  sourceName?: string;
  eventClasses?: string[];
  sourceStatuses?: DataLakeSourceStatus[];
}
export type DataLakeSourceList = DataLakeSource[];
export interface GetDataLakeSourcesResponse {
  dataLakeArn?: string;
  dataLakeSources?: DataLakeSource[];
  nextToken?: string;
}
export interface GetSubscriberRequest {
  subscriberId: string;
}
export interface GetSubscriberResponse {
  subscriber?: SubscriberResource;
}
export interface ListDataLakeExceptionsRequest {
  regions?: string[];
  maxResults?: number;
  nextToken?: string;
}
export interface DataLakeException {
  region?: string;
  exception?: string;
  remediation?: string;
  timestamp?: Date;
}
export type DataLakeExceptionList = DataLakeException[];
export interface ListDataLakeExceptionsResponse {
  exceptions?: DataLakeException[];
  nextToken?: string;
}
export interface ListDataLakesRequest {
  regions?: string[];
}
export interface ListDataLakesResponse {
  dataLakes?: DataLakeResource[];
}
export interface ListLogSourcesRequest {
  accounts?: string[];
  regions?: string[];
  sources?: LogSourceResource[];
  maxResults?: number;
  nextToken?: string;
}
export interface LogSource {
  account?: string;
  region?: string;
  sources?: LogSourceResource[];
}
export type LogSourceList = LogSource[];
export interface ListLogSourcesResponse {
  sources?: LogSource[];
  nextToken?: string;
}
export interface ListSubscribersRequest {
  nextToken?: string;
  maxResults?: number;
}
export type SubscriberResourceList = SubscriberResource[];
export interface ListSubscribersResponse {
  subscribers?: SubscriberResource[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: Tag[];
}
export interface RegisterDataLakeDelegatedAdministratorRequest {
  accountId: string;
}
export interface RegisterDataLakeDelegatedAdministratorResponse {}
export interface TagResourceRequest {
  resourceArn: string;
  tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateDataLakeRequest {
  configurations: DataLakeConfiguration[];
  metaStoreManagerRoleArn?: string;
}
export interface UpdateDataLakeResponse {
  dataLakes?: DataLakeResource[];
}
export interface UpdateDataLakeExceptionSubscriptionRequest {
  subscriptionProtocol: string;
  notificationEndpoint: string;
  exceptionTimeToLive?: number;
}
export interface UpdateDataLakeExceptionSubscriptionResponse {}
export interface UpdateSubscriberRequest {
  subscriberId: string;
  subscriberIdentity?: AwsIdentity;
  subscriberName?: string;
  subscriberDescription?: string;
  sources?: LogSourceResource[];
}
export interface UpdateSubscriberResponse {
  subscriber?: SubscriberResource;
}
export interface UpdateSubscriberNotificationRequest {
  subscriberId: string;
  configuration: NotificationConfiguration;
}
export interface UpdateSubscriberNotificationResponse {
  subscriberEndpoint?: string;
}
export type CreateAwsLogSourceError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Adds a natively supported Amazon Web Services service as an Amazon Security Lake source. Enables
 * source types for member accounts in required Amazon Web Services Regions, based on the
 * parameters you specify. You can choose any source type in any Region for either accounts
 * that are part of a trusted organization or standalone accounts. Once you add an Amazon Web Services service as a source, Security Lake starts collecting logs and events from it.
 *
 * You can use this API only to enable natively supported Amazon Web Services services as a
 * source. Use `CreateCustomLogSource` to enable data collection from a custom
 * source.
 */
export const createAwsLogSource: API.OperationMethod<
  CreateAwsLogSourceRequest,
  CreateAwsLogSourceResponse,
  CreateAwsLogSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(560, __c35, 0) as any as S.Schema<CreateAwsLogSourceRequest>,
  output: __S(578, __c36, 2) as any as S.Schema<CreateAwsLogSourceResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAwsLogSource",
}));

export type CreateCustomLogSourceError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Adds a third-party custom source in Amazon Security Lake, from the Amazon Web Services Region
 * where you want to create a custom source. Security Lake can collect logs and events from
 * third-party custom sources. After creating the appropriate IAM role to
 * invoke Glue crawler, use this API to add a custom source name in Security Lake. This
 * operation creates a partition in the Amazon S3 bucket for Security Lake as the target
 * location for log files from the custom source. In addition, this operation also creates an
 * associated Glue table and an Glue crawler.
 */
export const createCustomLogSource: API.OperationMethod<
  CreateCustomLogSourceRequest,
  CreateCustomLogSourceResponse,
  CreateCustomLogSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(610, __c38, 2) as any as S.Schema<CreateCustomLogSourceRequest>,
  output: __S(611, __c38, 3) as any as S.Schema<CreateCustomLogSourceResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomLogSource",
}));

export type CreateDataLakeError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Initializes an Amazon Security Lake instance with the provided (or default) configuration. You
 * can enable Security Lake in Amazon Web Services Regions with customized settings before enabling
 * log collection in Regions. To specify particular Regions, configure these Regions using the
 * `configurations` parameter. If you have already enabled Security Lake in a Region
 * when you call this command, the command will update the Region if you provide new
 * configuration parameters. If you have not already enabled Security Lake in the Region when you
 * call this API, it will set up the data lake in the Region with the specified
 * configurations.
 *
 * When you enable Security Lake, it starts ingesting security data after the
 * `CreateAwsLogSource` call and after you create subscribers using the `CreateSubscriber` API. This includes ingesting security data from
 * sources, storing data, and making data accessible to subscribers. Security Lake also enables
 * all the existing settings and resources that it stores or maintains for your Amazon Web Services account in the current Region, including security log and event data. For
 * more information, see the Amazon Security Lake User
 * Guide.
 */
export const createDataLake: API.OperationMethod<
  CreateDataLakeRequest,
  CreateDataLakeResponse,
  CreateDataLakeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(656, __c41, 0) as any as S.Schema<CreateDataLakeRequest>,
  output: __S(698, __c43, 10) as any as S.Schema<CreateDataLakeResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataLake",
}));

export type CreateDataLakeExceptionSubscriptionError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates the specified notification subscription in Amazon Security Lake for the organization
 * you specify. The notification subscription is created for exceptions that cannot be resolved by Security Lake automatically.
 */
export const createDataLakeExceptionSubscription: API.OperationMethod<
  CreateDataLakeExceptionSubscriptionRequest,
  CreateDataLakeExceptionSubscriptionResponse,
  CreateDataLakeExceptionSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateDataLakeExceptionSubscriptionRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<CreateDataLakeExceptionSubscriptionResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataLakeExceptionSubscription",
}));

export type CreateDataLakeOrganizationConfigurationError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Automatically enables Amazon Security Lake for new member accounts in your organization.
 * Security Lake is not automatically enabled for any existing member accounts in your
 * organization.
 *
 * This operation merges the new data lake organization configuration with the existing configuration for Security Lake in your organization. If you want to create a new data lake organization configuration, you must delete the existing one using DeleteDataLakeOrganizationConfiguration.
 */
export const createDataLakeOrganizationConfiguration: API.OperationMethod<
  CreateDataLakeOrganizationConfigurationRequest,
  CreateDataLakeOrganizationConfigurationResponse,
  CreateDataLakeOrganizationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c2, 0) as any as S.Schema<CreateDataLakeOrganizationConfigurationRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<CreateDataLakeOrganizationConfigurationResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataLakeOrganizationConfiguration",
}));

export type CreateSubscriberError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a subscriber for accounts that are already enabled in Amazon Security Lake. You can
 * create a subscriber with access to data in the current Amazon Web Services Region.
 */
export const createSubscriber: API.OperationMethod<
  CreateSubscriberRequest,
  CreateSubscriberResponse,
  CreateSubscriberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<CreateSubscriberRequest>,
  output: __S(128, __c8, 0) as any as S.Schema<CreateSubscriberResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSubscriber",
}));

export type CreateSubscriberNotificationError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Notifies the subscriber when new data is written to the data lake for the sources that
 * the subscriber consumes in Security Lake. You can create only one subscriber notification per
 * subscriber.
 */
export const createSubscriberNotification: API.OperationMethod<
  CreateSubscriberNotificationRequest,
  CreateSubscriberNotificationResponse,
  CreateSubscriberNotificationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<CreateSubscriberNotificationRequest>,
  output: __S(162, __c10, 2) as any as S.Schema<CreateSubscriberNotificationResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSubscriberNotification",
}));

export type DeleteAwsLogSourceError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Removes a natively supported Amazon Web Services service as an Amazon Security Lake source. You
 * can remove a source for one or more Regions. When you remove the source, Security Lake stops
 * collecting data from that source in the specified Regions and accounts, and subscribers can
 * no longer consume new data from the source. However, subscribers can still consume data
 * that Security Lake collected from the source before removal.
 *
 * You can choose any source type in any Amazon Web Services Region for either accounts that
 * are part of a trusted organization or standalone accounts.
 */
export const deleteAwsLogSource: API.OperationMethod<
  DeleteAwsLogSourceRequest,
  DeleteAwsLogSourceResponse,
  DeleteAwsLogSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<DeleteAwsLogSourceRequest>,
  output: __S(578, __c36, 2) as any as S.Schema<DeleteAwsLogSourceResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAwsLogSource",
}));

export type DeleteCustomLogSourceError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Removes a custom log source from Amazon Security Lake, to stop sending data from the custom
 * source to Security Lake.
 */
export const deleteCustomLogSource: API.OperationMethod<
  DeleteCustomLogSourceRequest,
  DeleteCustomLogSourceResponse,
  DeleteCustomLogSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<DeleteCustomLogSourceRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteCustomLogSourceResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomLogSource",
}));

export type DeleteDataLakeError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * When you disable Amazon Security Lake from your account, Security Lake is disabled in all Amazon Web Services Regions and it stops collecting data from your sources. Also, this API
 * automatically takes steps to remove the account from Security Lake. However, Security Lake retains
 * all of your existing settings and the resources that it created in your Amazon Web Services
 * account in the current Amazon Web Services Region.
 *
 * The `DeleteDataLake` operation does not delete the data that is stored in
 * your Amazon S3 bucket, which is owned by your Amazon Web Services account. For more
 * information, see the Amazon Security Lake User
 * Guide.
 */
export const deleteDataLake: API.OperationMethod<
  DeleteDataLakeRequest,
  DeleteDataLakeResponse,
  DeleteDataLakeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<DeleteDataLakeRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteDataLakeResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataLake",
}));

export type DeleteDataLakeExceptionSubscriptionError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes the specified notification subscription in Amazon Security Lake for the organization
 * you specify.
 */
export const deleteDataLakeExceptionSubscription: API.OperationMethod<
  DeleteDataLakeExceptionSubscriptionRequest,
  DeleteDataLakeExceptionSubscriptionResponse,
  DeleteDataLakeExceptionSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<DeleteDataLakeExceptionSubscriptionRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteDataLakeExceptionSubscriptionResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataLakeExceptionSubscription",
}));

export type DeleteDataLakeOrganizationConfigurationError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Turns off automatic enablement of Amazon Security Lake for member accounts that are added to an organization in Organizations. Only the delegated
 * Security Lake administrator for an organization can perform this operation. If the delegated Security Lake administrator performs this operation, new member
 * accounts won't automatically contribute data to the data lake.
 */
export const deleteDataLakeOrganizationConfiguration: API.OperationMethod<
  DeleteDataLakeOrganizationConfigurationRequest,
  DeleteDataLakeOrganizationConfigurationResponse,
  DeleteDataLakeOrganizationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<DeleteDataLakeOrganizationConfigurationRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteDataLakeOrganizationConfigurationResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataLakeOrganizationConfiguration",
}));

export type DeleteSubscriberError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes the subscription permission and all notification settings for accounts that are
 * already enabled in Amazon Security Lake. When you run `DeleteSubscriber`, the
 * subscriber will no longer consume data from Security Lake and the subscriber is removed. This
 * operation deletes the subscriber and removes access to data in the current Amazon Web Services Region.
 */
export const deleteSubscriber: API.OperationMethod<
  DeleteSubscriberRequest,
  DeleteSubscriberResponse,
  DeleteSubscriberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<DeleteSubscriberRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteSubscriberResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSubscriber",
}));

export type DeleteSubscriberNotificationError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes the specified subscription notification in Amazon Security Lake for the organization
 * you specify.
 */
export const deleteSubscriberNotification: API.OperationMethod<
  DeleteSubscriberNotificationRequest,
  DeleteSubscriberNotificationResponse,
  DeleteSubscriberNotificationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<DeleteSubscriberNotificationRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteSubscriberNotificationResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSubscriberNotification",
}));

export type DeregisterDataLakeDelegatedAdministratorError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the Amazon Security Lake delegated administrator account for the organization. This API
 * can only be called by the organization management account. The organization management
 * account cannot be the delegated administrator account.
 */
export const deregisterDataLakeDelegatedAdministrator: API.OperationMethod<
  DeregisterDataLakeDelegatedAdministratorRequest,
  DeregisterDataLakeDelegatedAdministratorResponse,
  DeregisterDataLakeDelegatedAdministratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<DeregisterDataLakeDelegatedAdministratorRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeregisterDataLakeDelegatedAdministratorResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterDataLakeDelegatedAdministrator",
}));

export type GetDataLakeExceptionSubscriptionError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves the protocol and endpoint that were provided when subscribing to Amazon SNS topics for exception notifications.
 */
export const getDataLakeExceptionSubscription: API.OperationMethod<
  GetDataLakeExceptionSubscriptionRequest,
  GetDataLakeExceptionSubscriptionResponse,
  GetDataLakeExceptionSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<GetDataLakeExceptionSubscriptionRequest>,
  output: __S(305, __c19, 1) as any as S.Schema<GetDataLakeExceptionSubscriptionResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataLakeExceptionSubscription",
}));

export type GetDataLakeOrganizationConfigurationError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the configuration that will be automatically set up for accounts added to the
 * organization after the organization has onboarded to Amazon Security Lake. This API does not take
 * input parameters.
 */
export const getDataLakeOrganizationConfiguration: API.OperationMethod<
  GetDataLakeOrganizationConfigurationRequest,
  GetDataLakeOrganizationConfigurationResponse,
  GetDataLakeOrganizationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<GetDataLakeOrganizationConfigurationRequest>,
  output: __S(321, __c20, 1) as any as S.Schema<GetDataLakeOrganizationConfigurationResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataLakeOrganizationConfiguration",
}));

export type GetDataLakeSourcesError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves a snapshot of the current Region, including whether Amazon Security Lake is enabled
 * for those accounts and which sources Security Lake is collecting data from.
 */
export const getDataLakeSources: API.PaginatedOperationMethod<
  GetDataLakeSourcesRequest,
  GetDataLakeSourcesResponse,
  GetDataLakeSourcesError,
  Credentials | HttpClient.HttpClient,
  DataLakeSource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<GetDataLakeSourcesRequest>,
  output: __S(341, __c21, 5) as any as S.Schema<GetDataLakeSourcesResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataLakeSources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dataLakeSources",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetSubscriberError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves the subscription information for the specified subscription ID. You can get
 * information about a specific subscriber.
 */
export const getSubscriber: API.OperationMethod<
  GetSubscriberRequest,
  GetSubscriberResponse,
  GetSubscriberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<GetSubscriberRequest>,
  output: __S(128, __c8, 0) as any as S.Schema<GetSubscriberResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSubscriber",
}));

export type ListDataLakeExceptionsError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the Amazon Security Lake exceptions that you can use to find the source of problems and
 * fix them.
 */
export const listDataLakeExceptions: API.PaginatedOperationMethod<
  ListDataLakeExceptionsRequest,
  ListDataLakeExceptionsResponse,
  ListDataLakeExceptionsError,
  Credentials | HttpClient.HttpClient,
  DataLakeException
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<ListDataLakeExceptionsRequest>,
  output: __S(371, __c23, 3) as any as S.Schema<ListDataLakeExceptionsResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataLakeExceptions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "exceptions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataLakesError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves the Amazon Security Lake configuration object for the specified Amazon Web Services Regions. You can use this operation to determine whether
 * Security Lake is enabled for a Region.
 */
export const listDataLakes: API.OperationMethod<
  ListDataLakesRequest,
  ListDataLakesResponse,
  ListDataLakesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<ListDataLakesRequest>,
  output: __S(698, __c43, 10) as any as S.Schema<ListDataLakesResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataLakes",
}));

export type ListLogSourcesError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves the log sources.
 */
export const listLogSources: API.PaginatedOperationMethod<
  ListLogSourcesRequest,
  ListLogSourcesResponse,
  ListLogSourcesError,
  Credentials | HttpClient.HttpClient,
  LogSource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<ListLogSourcesRequest>,
  output: __S(403, __c25, 3) as any as S.Schema<ListLogSourcesResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLogSources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "sources",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSubscribersError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists all subscribers for the specific Amazon Security Lake account ID. You can retrieve a list
 * of subscriptions associated with a specific organization or Amazon Web Services account.
 */
export const listSubscribers: API.PaginatedOperationMethod<
  ListSubscribersRequest,
  ListSubscribersResponse,
  ListSubscribersError,
  Credentials | HttpClient.HttpClient,
  SubscriberResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(416, __c26, 0) as any as S.Schema<ListSubscribersRequest>,
  output: __S(418, __c26, 2) as any as S.Schema<ListSubscribersResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSubscribers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "subscribers",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves the tags (keys and values) that are associated with an Amazon Security Lake resource: a subscriber, or the data lake configuration for
 * your Amazon Web Services account in a particular Amazon Web Services Region.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(433, __c27, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type RegisterDataLakeDelegatedAdministratorError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Designates the Amazon Security Lake delegated administrator account for the organization. This
 * API can only be called by the organization management account. The organization management
 * account cannot be the delegated administrator account.
 */
export const registerDataLakeDelegatedAdministrator: API.OperationMethod<
  RegisterDataLakeDelegatedAdministratorRequest,
  RegisterDataLakeDelegatedAdministratorResponse,
  RegisterDataLakeDelegatedAdministratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<RegisterDataLakeDelegatedAdministratorRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<RegisterDataLakeDelegatedAdministratorResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterDataLakeDelegatedAdministrator",
}));

export type TagResourceError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Adds or updates one or more tags that are associated with an Amazon Security Lake resource: a subscriber, or the data lake configuration for your
 * Amazon Web Services account in a particular Amazon Web Services Region. A *tag* is a label that you can define and associate with
 * Amazon Web Services resources. Each tag consists of a required *tag key* and an associated *tag value*. A
 * *tag key* is a general label that acts as a category for a more specific tag value. A *tag value* acts as a
 * descriptor for a tag key. Tags can help you identify, categorize, and manage resources in different ways, such as by owner, environment, or other
 * criteria. For more information, see
 * Tagging Amazon Security Lake resources in the
 * *Amazon Security Lake User Guide*.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Removes one or more tags (keys and values) from an Amazon Security Lake resource: a subscriber, or the data lake configuration for your
 * Amazon Web Services account in a particular Amazon Web Services Region.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateDataLakeError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * You can use `UpdateDataLake` to specify where to store your security data, how it should
 * be encrypted at rest and for how long. You can add a Rollup
 * Region to consolidate data from multiple Amazon Web Services Regions, replace
 * default encryption (SSE-S3) with Customer Manged Key,
 * or specify transition and expiration actions through storage Lifecycle management. The `UpdateDataLake` API works as an "upsert" operation that performs an insert if the specified item or record does not exist, or an update if it
 * already exists. Security Lake securely stores your data at rest using Amazon Web Services encryption solutions. For more details, see Data protection in Amazon Security Lake.
 *
 * For example, omitting the key `encryptionConfiguration` from a Region that is
 * included in an update call that currently uses KMS will leave that Region's KMS key in
 * place, but specifying `encryptionConfiguration: {kmsKeyId: 'S3_MANAGED_KEY'}`
 * for that same Region will reset the key to `S3-managed`.
 *
 * For more details about lifecycle management and how to update retention settings for one or more Regions after enabling Security Lake, see the Amazon Security Lake User Guide.
 */
export const updateDataLake: API.OperationMethod<
  UpdateDataLakeRequest,
  UpdateDataLakeResponse,
  UpdateDataLakeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<UpdateDataLakeRequest>,
  output: __S(698, __c43, 10) as any as S.Schema<UpdateDataLakeResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataLake",
}));

export type UpdateDataLakeExceptionSubscriptionError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates the specified notification subscription in Amazon Security Lake for the organization
 * you specify.
 */
export const updateDataLakeExceptionSubscription: API.OperationMethod<
  UpdateDataLakeExceptionSubscriptionRequest,
  UpdateDataLakeExceptionSubscriptionResponse,
  UpdateDataLakeExceptionSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c32, 0) as any as S.Schema<UpdateDataLakeExceptionSubscriptionRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<UpdateDataLakeExceptionSubscriptionResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataLakeExceptionSubscription",
}));

export type UpdateSubscriberError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates an existing subscription for the given Amazon Security Lake account ID. You can update
 * a subscriber by changing the sources that the subscriber consumes data from.
 */
export const updateSubscriber: API.OperationMethod<
  UpdateSubscriberRequest,
  UpdateSubscriberResponse,
  UpdateSubscriberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(528, __c33, 0) as any as S.Schema<UpdateSubscriberRequest>,
  output: __S(128, __c8, 0) as any as S.Schema<UpdateSubscriberResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSubscriber",
}));

export type UpdateSubscriberNotificationError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates an existing notification method for the subscription (SQS or HTTPs endpoint) or
 * switches the notification subscription endpoint for a subscriber.
 */
export const updateSubscriberNotification: API.OperationMethod<
  UpdateSubscriberNotificationRequest,
  UpdateSubscriberNotificationResponse,
  UpdateSubscriberNotificationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c34, 0) as any as S.Schema<UpdateSubscriberNotificationRequest>,
  output: __S(162, __c10, 2) as any as S.Schema<UpdateSubscriberNotificationResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSubscriberNotification",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          subscriptionProtocol: S.String,
          notificationEndpoint: S.String,
          exceptionTimeToLive: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/datalake/exceptions/subscription" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDataLakeExceptionSubscriptionRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "CreateDataLakeExceptionSubscriptionResponse",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ autoEnableNewAccount: S.optional(__S(66, __c4, 2)) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/datalake/organization/configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDataLakeOrganizationConfigurationRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ sourceName: S.optional(S.String), sourceVersion: S.optional(S.String) }),
      ).annotate({ identifier: "AwsLogSourceResource" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(48, __c3, 0));
    case 1:
      return S.suspend(() => S.Struct({ region: S.String, sources: __S(64, __c4, 0) })).annotate({
        identifier: "DataLakeAutoEnableNewAccountConfiguration",
      });
    case 2:
      return S.Array(__S(65, __c4, 1));
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          subscriberIdentity: __S(640, __c40, 0),
          subscriberName: S.String,
          subscriberDescription: S.optional(S.String),
          sources: __S(97, __c6, 1),
          accessTypes: S.optional(__S(112, __c7, 0)),
          tags: S.optional(__S(673, __c42, 1)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v1/subscribers" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateSubscriberRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ awsLogSource: __S(48, __c3, 0) }),
        /*@__PURE__*/ S.Struct({ customLogSource: __S(626, __c39, 2) }),
      ]);
    case 1:
      return S.Array(__S(96, __c6, 0));
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          subscriberId: S.String,
          subscriberArn: S.String,
          subscriberIdentity: __S(640, __c40, 0),
          subscriberName: S.String,
          subscriberDescription: S.optional(S.String),
          sources: __S(97, __c6, 1),
          accessTypes: S.optional(__S(112, __c7, 0)),
          roleArn: S.optional(S.String),
          s3BucketArn: S.optional(S.String),
          subscriberEndpoint: S.optional(S.String),
          subscriberStatus: S.optional(S.String),
          resourceShareArn: S.optional(S.String),
          resourceShareName: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "SubscriberResource" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ subscriber: S.optional(__S(113, __c7, 1)) })).annotate({
        identifier: "CreateSubscriberResponse",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          subscriberId: S.String.pipe(T.HttpLabel("subscriberId")),
          configuration: __S(161, __c10, 1),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/subscribers/{subscriberId}/notification" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateSubscriberNotificationRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          endpoint: S.String,
          authorizationApiKeyName: S.optional(S.String),
          authorizationApiKeyValue: S.optional(SensitiveString),
          httpMethod: S.optional(S.String),
          targetRoleArn: S.String,
        }),
      ).annotate({ identifier: "HttpsNotificationConfiguration" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ sqsNotificationConfiguration: __S(16, __c1, 0) }),
        /*@__PURE__*/ S.Struct({ httpsNotificationConfiguration: __S(160, __c10, 0) }),
      ]);
    case 2:
      return S.suspend(() => S.Struct({ subscriberEndpoint: S.optional(S.String) })).annotate({
        identifier: "CreateSubscriberNotificationResponse",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ sources: __S(577, __c36, 1) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/datalake/logsources/aws/delete" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAwsLogSourceRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sourceName: S.String.pipe(T.HttpLabel("sourceName")),
          sourceVersion: S.optional(S.String).pipe(T.HttpQuery("sourceVersion")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/datalake/logsources/custom/{sourceName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCustomLogSourceRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ regions: __S(592, __c37, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/datalake/delete" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDataLakeRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/datalake/exceptions/subscription" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDataLakeExceptionSubscriptionRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ autoEnableNewAccount: S.optional(__S(66, __c4, 2)) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/datalake/organization/configuration/delete" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDataLakeOrganizationConfigurationRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ subscriberId: S.String.pipe(T.HttpLabel("subscriberId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/subscribers/{subscriberId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSubscriberRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ subscriberId: S.String.pipe(T.HttpLabel("subscriberId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/subscribers/{subscriberId}/notification" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSubscriberNotificationRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/datalake/delegate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeregisterDataLakeDelegatedAdministratorRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/datalake/exceptions/subscription" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDataLakeExceptionSubscriptionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          subscriptionProtocol: S.optional(S.String),
          notificationEndpoint: S.optional(S.String),
          exceptionTimeToLive: S.optional(S.Number),
        }),
      ).annotate({ identifier: "GetDataLakeExceptionSubscriptionResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/datalake/organization/configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDataLakeOrganizationConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ autoEnableNewAccount: S.optional(__S(66, __c4, 2)) }),
      ).annotate({ identifier: "GetDataLakeOrganizationConfigurationResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accounts: S.optional(__S(592, __c37, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/datalake/sources" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDataLakeSourcesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ resource: S.optional(S.String), status: S.optional(S.String) }),
      ).annotate({ identifier: "DataLakeSourceStatus" });
    case 2:
      return S.Array(__S(337, __c21, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          account: S.optional(S.String),
          sourceName: S.optional(S.String),
          eventClasses: S.optional(__S(592, __c37, 0)),
          sourceStatuses: S.optional(__S(338, __c21, 2)),
        }),
      ).annotate({ identifier: "DataLakeSource" });
    case 4:
      return S.Array(__S(339, __c21, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          dataLakeArn: S.optional(S.String),
          dataLakeSources: S.optional(__S(340, __c21, 4)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetDataLakeSourcesResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ subscriberId: S.String.pipe(T.HttpLabel("subscriberId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/subscribers/{subscriberId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSubscriberRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          regions: S.optional(__S(592, __c37, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/datalake/exceptions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDataLakeExceptionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          region: S.optional(S.String),
          exception: S.optional(S.String),
          remediation: S.optional(S.String),
          timestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "DataLakeException" });
    case 2:
      return S.Array(__S(369, __c23, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ exceptions: S.optional(__S(370, __c23, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDataLakeExceptionsResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ regions: S.optional(__S(592, __c37, 0)).pipe(T.HttpQuery("regions")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/datalakes" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListDataLakesRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accounts: S.optional(__S(592, __c37, 0)),
          regions: S.optional(__S(592, __c37, 0)),
          sources: S.optional(__S(97, __c6, 1)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/datalake/logsources/list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListLogSourcesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          account: S.optional(S.String),
          region: S.optional(S.String),
          sources: S.optional(__S(97, __c6, 1)),
        }),
      ).annotate({ identifier: "LogSource" });
    case 2:
      return S.Array(__S(401, __c25, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ sources: S.optional(__S(402, __c25, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListLogSourcesResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/subscribers" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListSubscribersRequest" });
    case 1:
      return S.Array(__S(113, __c7, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({ subscribers: S.optional(__S(417, __c26, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSubscribersResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(673, __c42, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ accountId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/datalake/delegate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RegisterDataLakeDelegatedAdministratorRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(673, __c42, 1),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/tags/{resourceArn}" }),
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
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(592, __c37, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/tags/{resourceArn}" }),
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
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          configurations: __S(705, __c44, 1),
          metaStoreManagerRoleArn: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/v1/datalake" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateDataLakeRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          subscriptionProtocol: S.String,
          notificationEndpoint: S.String,
          exceptionTimeToLive: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v1/datalake/exceptions/subscription" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDataLakeExceptionSubscriptionRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          subscriberId: S.String.pipe(T.HttpLabel("subscriberId")),
          subscriberIdentity: S.optional(__S(640, __c40, 0)),
          subscriberName: S.optional(S.String),
          subscriberDescription: S.optional(S.String),
          sources: S.optional(__S(97, __c6, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v1/subscribers/{subscriberId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateSubscriberRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          subscriberId: S.String.pipe(T.HttpLabel("subscriberId")),
          configuration: __S(161, __c10, 1),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v1/subscribers/{subscriberId}/notification" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateSubscriberNotificationRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ sources: __S(577, __c36, 1) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/datalake/logsources/aws" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAwsLogSourceRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accounts: S.optional(__S(592, __c37, 0)),
          regions: __S(592, __c37, 0),
          sourceName: S.String,
          sourceVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsLogSourceConfiguration" });
    case 1:
      return S.Array(__S(576, __c36, 0));
    case 2:
      return S.suspend(() => S.Struct({ failed: S.optional(__S(592, __c37, 0)) })).annotate({
        identifier: "CreateAwsLogSourceResponse",
      });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ roleArn: S.String })).annotate({
        identifier: "CustomLogSourceCrawlerConfiguration",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          crawlerConfiguration: __S(608, __c38, 0),
          providerIdentity: __S(640, __c40, 0),
        }),
      ).annotate({ identifier: "CustomLogSourceConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          sourceName: S.String,
          sourceVersion: S.optional(S.String),
          eventClasses: S.optional(__S(592, __c37, 0)),
          configuration: __S(609, __c38, 1),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/datalake/logsources/custom" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateCustomLogSourceRequest" });
    case 3:
      return S.suspend(() => S.Struct({ source: S.optional(__S(626, __c39, 2)) })).annotate({
        identifier: "CreateCustomLogSourceResponse",
      });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ roleArn: S.optional(S.String), location: S.optional(S.String) }),
      ).annotate({ identifier: "CustomLogSourceProvider" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          crawlerArn: S.optional(S.String),
          databaseArn: S.optional(S.String),
          tableArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "CustomLogSourceAttributes" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          sourceName: S.optional(S.String),
          sourceVersion: S.optional(S.String),
          provider: S.optional(__S(624, __c39, 0)),
          attributes: S.optional(__S(625, __c39, 1)),
        }),
      ).annotate({ identifier: "CustomLogSourceResource" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ principal: S.String, externalId: S.String })).annotate({
        identifier: "AwsIdentity",
      });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          configurations: __S(705, __c44, 1),
          metaStoreManagerRoleArn: S.String,
          tags: S.optional(__S(673, __c42, 1)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v1/datalake" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateDataLakeRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(672, __c42, 0));
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ kmsKeyId: S.optional(S.String) })).annotate({
        identifier: "DataLakeEncryptionConfiguration",
      });
    case 1:
      return S.suspend(() => S.Struct({ days: S.optional(S.Number) })).annotate({
        identifier: "DataLakeLifecycleExpiration",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({ storageClass: S.optional(S.String), days: S.optional(S.Number) }),
      ).annotate({ identifier: "DataLakeLifecycleTransition" });
    case 3:
      return S.Array(__S(690, __c43, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          expiration: S.optional(__S(689, __c43, 1)),
          transitions: S.optional(__S(691, __c43, 3)),
        }),
      ).annotate({ identifier: "DataLakeLifecycleConfiguration" });
    case 5:
      return S.suspend(() =>
        S.Struct({ regions: S.optional(__S(592, __c37, 0)), roleArn: S.optional(S.String) }),
      ).annotate({ identifier: "DataLakeReplicationConfiguration" });
    case 6:
      return S.suspend(() =>
        S.Struct({ reason: S.optional(S.String), code: S.optional(S.String) }),
      ).annotate({ identifier: "DataLakeUpdateException" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          status: S.optional(S.String),
          exception: S.optional(__S(694, __c43, 6)),
        }),
      ).annotate({ identifier: "DataLakeUpdateStatus" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          dataLakeArn: S.String,
          region: S.String,
          s3BucketArn: S.optional(S.String),
          encryptionConfiguration: S.optional(__S(688, __c43, 0)),
          lifecycleConfiguration: S.optional(__S(692, __c43, 4)),
          replicationConfiguration: S.optional(__S(693, __c43, 5)),
          createStatus: S.optional(S.String),
          updateStatus: S.optional(__S(695, __c43, 7)),
        }),
      ).annotate({ identifier: "DataLakeResource" });
    case 9:
      return S.Array(__S(696, __c43, 8));
    case 10:
      return S.suspend(() => S.Struct({ dataLakes: S.optional(__S(697, __c43, 9)) })).annotate({
        identifier: "CreateDataLakeResponse",
      });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          region: S.String,
          encryptionConfiguration: S.optional(__S(688, __c43, 0)),
          lifecycleConfiguration: S.optional(__S(692, __c43, 4)),
          replicationConfiguration: S.optional(__S(693, __c43, 5)),
        }),
      ).annotate({ identifier: "DataLakeConfiguration" });
    case 1:
      return S.Array(__S(704, __c44, 0));
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
