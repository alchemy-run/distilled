import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
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
  sdkId: "SecurityLake",
  target: "SecurityLake",
  version: "2018-05-10",
  sigv4: "securitylake",
  protocol: restJson1Protocol,
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://securitylake.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://securitylake.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message?: string; readonly errorCode?: string }> {}
export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "BadRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{
    readonly message?: string;
    readonly resourceName?: string;
    readonly resourceType?: string;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message?: string;
    readonly resourceName?: string;
    readonly resourceType?: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{
    readonly message?: string;
    readonly serviceCode?: string;
    readonly quotaCode?: string;
    readonly retryAfterSeconds?: number;
  }> {}
export class UnauthorizedException
  extends /*@__PURE__*/ TE.TaggedError("UnauthorizedException", ["AuthError"])<{
    readonly message?: string;
  }> {}
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
export type DataLakeStatus =
  | "INITIALIZED"
  | "PENDING"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
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
export type SubscriberStatus =
  | "ACTIVE"
  | "DEACTIVATED"
  | "PENDING"
  | "READY"
  | (string & {});
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
  descriptor: {
    service: svc,
    http: "POST /v1/datalake/logsources/aws",
    input: { sources: D.list(i_AwsLogSourceConfiguration) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/datalake/logsources/custom",
    input: {
      sourceName: 0,
      sourceVersion: 0,
      eventClasses: 0,
      configuration: {
        crawlerConfiguration: { roleArn: 0 },
        providerIdentity: i_AwsIdentity,
      },
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/datalake",
    input: {
      configurations: D.list(i_DataLakeConfiguration),
      metaStoreManagerRoleArn: 0,
      tags: D.list(i_Tag),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/datalake/exceptions/subscription",
    input: {
      subscriptionProtocol: 0,
      notificationEndpoint: 0,
      exceptionTimeToLive: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/datalake/organization/configuration",
    input: {
      autoEnableNewAccount: D.list(i_DataLakeAutoEnableNewAccountConfiguration),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/subscribers",
    input: {
      subscriberIdentity: i_AwsIdentity,
      subscriberName: 0,
      subscriberDescription: 0,
      sources: D.list(i_LogSourceResource),
      accessTypes: 0,
      tags: D.list(i_Tag),
    },
    output: { subscriber: o_SubscriberResource },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/subscribers/{subscriberId}/notification",
    input: { subscriberId: 0, configuration: i_NotificationConfiguration },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/datalake/logsources/aws/delete",
    input: { sources: D.list(i_AwsLogSourceConfiguration) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v1/datalake/logsources/custom/{sourceName}",
    input: { sourceName: 0, sourceVersion: D.m({ query: "sourceVersion" }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/datalake/delete",
    input: { regions: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v1/datalake/exceptions/subscription",
    input: {},
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/datalake/organization/configuration/delete",
    input: {
      autoEnableNewAccount: D.list(i_DataLakeAutoEnableNewAccountConfiguration),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v1/subscribers/{subscriberId}",
    input: { subscriberId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v1/subscribers/{subscriberId}/notification",
    input: { subscriberId: 0 },
  },
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
})) as any;

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
  descriptor: { service: svc, http: "DELETE /v1/datalake/delegate", input: {} },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/datalake/exceptions/subscription",
    input: {},
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/datalake/organization/configuration",
    input: {},
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/datalake/sources",
    input: { accounts: 0, maxResults: 0, nextToken: 0 },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "GET /v1/subscribers/{subscriberId}",
    input: { subscriberId: 0 },
    output: { subscriber: o_SubscriberResource },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/datalake/exceptions",
    input: { regions: 0, maxResults: 0, nextToken: 0 },
    output: { exceptions: D.list({ timestamp: D.ts }) },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "GET /v1/datalakes",
    input: { regions: D.m({ query: "regions" }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/datalake/logsources/list",
    input: {
      accounts: 0,
      regions: 0,
      sources: D.list(i_LogSourceResource),
      maxResults: 0,
      nextToken: 0,
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "GET /v1/subscribers",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { subscribers: D.list(o_SubscriberResource) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v1/tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/datalake/delegate",
    input: { accountId: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/tags/{resourceArn}",
    input: { resourceArn: 0, tags: D.list(i_Tag) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v1/tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v1/datalake",
    input: {
      configurations: D.list(i_DataLakeConfiguration),
      metaStoreManagerRoleArn: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v1/datalake/exceptions/subscription",
    input: {
      subscriptionProtocol: 0,
      notificationEndpoint: 0,
      exceptionTimeToLive: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v1/subscribers/{subscriberId}",
    input: {
      subscriberId: 0,
      subscriberIdentity: i_AwsIdentity,
      subscriberName: 0,
      subscriberDescription: 0,
      sources: D.list(i_LogSourceResource),
    },
    output: { subscriber: o_SubscriberResource },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v1/subscribers/{subscriberId}/notification",
    input: { subscriberId: 0, configuration: i_NotificationConfiguration },
    body: true,
  },
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
})) as any;

const i_AwsIdentity: D.LazyStruct = () => ({ principal: 0, externalId: 0 });
const i_AwsLogSourceConfiguration: D.LazyStruct = () => ({
  accounts: 0,
  regions: 0,
  sourceName: 0,
  sourceVersion: 0,
});
const i_DataLakeAutoEnableNewAccountConfiguration: D.LazyStruct = () => ({
  region: 0,
  sources: D.list(i_AwsLogSourceResource),
});
const i_DataLakeConfiguration: D.LazyStruct = () => ({
  region: 0,
  encryptionConfiguration: { kmsKeyId: 0 },
  lifecycleConfiguration: {
    expiration: { days: 0 },
    transitions: D.list({ storageClass: 0, days: 0 }),
  },
  replicationConfiguration: { regions: 0, roleArn: 0 },
});
const i_LogSourceResource: D.LazyStruct = () => ({
  awsLogSource: i_AwsLogSourceResource,
  customLogSource: {
    sourceName: 0,
    sourceVersion: 0,
    provider: { roleArn: 0, location: 0 },
    attributes: { crawlerArn: 0, databaseArn: 0, tableArn: 0 },
  },
});
const i_NotificationConfiguration: D.LazyStruct = () => ({
  sqsNotificationConfiguration: {},
  httpsNotificationConfiguration: {
    endpoint: 0,
    authorizationApiKeyName: 0,
    authorizationApiKeyValue: 0,
    httpMethod: 0,
    targetRoleArn: 0,
  },
});
const i_Tag: D.LazyStruct = () => ({ key: 0, value: 0 });
const o_SubscriberResource: D.LazyStruct = () => ({
  createdAt: D.ts,
  updatedAt: D.ts,
});
const i_AwsLogSourceResource: D.LazyStruct = () => ({
  sourceName: 0,
  sourceVersion: 0,
});
