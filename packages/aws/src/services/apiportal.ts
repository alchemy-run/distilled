import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsServiceErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "APIPortal",
  serviceShapeName: "APIPortalControlService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "apiportal" });
const ver = /*@__PURE__*/ T.ServiceVersion("2026-04-30");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
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
                `https://apiportal-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
                return e(
                  `https://apiportal-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                );
              }
              return e(
                `https://apiportal-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err("FIPS is enabled but this partition does not support FIPS");
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://apiportal.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err("DualStack is enabled but this partition does not support DualStack");
          }
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://apiportal.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return e(`https://apiportal.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://apiportal.{R}.api.aws","properties":{},"headers":{}}',
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

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "APIPortal",
  service: "APIPortal",
  propagate: TxXray.propagate,
} as const;

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export type ProductId = string;
export type ManagedApiId = string;
export type ManagedApiIdList = string[];
export interface AssociateManagedApisRequest {
  productId: string;
  managedApiIds: string[];
}
export type FailedItemErrorCode = "MANAGED_API_NOT_FOUND" | "INTERNAL_ERROR" | (string & {});
export interface FailedManagedApiItem {
  managedApiId: string;
  errorCode: FailedItemErrorCode;
  errorMessage: string;
}
export type FailedManagedApiItemList = FailedManagedApiItem[];
export interface AssociateManagedApisResponse {
  failedItems: FailedManagedApiItem[];
}
export type ResourceArn = string;
export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "ANY"
  | "HEAD"
  | "OPTIONS"
  | (string & {});
export interface ApiSignature {
  resourceArn: string;
  method: HttpMethod;
  hostname: string;
  port: number;
  path: string;
}
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export interface CreateManagedApiRequest {
  apiSignature: ApiSignature;
  tags?: { [key: string]: string | undefined } | undefined;
}
export type ManagedApiArn = string;
export interface CreateManagedApiResponse {
  managedApiId: string;
  managedApiArn: string;
  apiSignature: ApiSignature;
  createdAt: Date;
  updatedAt: Date;
  tags?: { [key: string]: string | undefined } | undefined;
}
export type PortalName = string;
export type PortalDescription = string;
export type Color = string;
export interface CustomColors {
  backgroundColor: string;
  navigationColor: string;
  headerColor: string;
  textColor: string;
  accentColor: string;
  errorValidationColor: string;
}
export interface PortalTheme {
  customColors: CustomColors;
  logoUploadedAt?: Date | undefined;
}
export interface PortalContent {
  displayName: string;
  description?: string | undefined;
  theme: PortalTheme;
}
export interface None {}
export type PortalDomainName = string;
export type CertificateArn = string;
export interface ACMManaged {
  domainName: string;
  certificateArn: string;
}
export type EndpointConfigurationRequest =
  | { none: None; acmManaged?: undefined }
  | { none?: undefined; acmManaged: ACMManaged };
export type UserPoolArn = string;
export type AppClientId = string;
export type UserPoolDomain = string;
export type IdentityPoolId = string;
export interface CognitoConfig {
  userPoolArn: string;
  appClientId: string;
  userPoolDomain: string;
  identityPoolId?: string | undefined;
}
export type AuthorizationConfig =
  | { none: None; cognitoConfig?: undefined }
  | { none?: undefined; cognitoConfig: CognitoConfig };
export type FineGrainedAccessControl = "ENABLED" | "DISABLED" | (string & {});
export interface Authorization {
  authorizationConfig: AuthorizationConfig;
  fineGrainedAccessControl: FineGrainedAccessControl;
}
export type ProductArn = string;
export type IncludedProductArns = string[];
export type LogoUri = string;
export type RUMAppMonitorName = string;
export interface CreatePortalRequest {
  portalContent: PortalContent;
  endpointConfiguration: EndpointConfigurationRequest;
  authorization: Authorization;
  includedProductArns?: string[] | undefined;
  logoUri?: string | undefined;
  rumAppMonitorName?: string | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
export type PortalId = string;
export type PortalArn = string;
export type HostedZoneId = string;
export interface EndpointConfigurationResponse {
  domainName?: string | undefined;
  certificateArn?: string | undefined;
  portalDomainHostedZoneId: string;
  portalDefaultDomainName: string;
}
export type PublishStatus =
  | "PUBLISHED"
  | "PUBLISH_IN_PROGRESS"
  | "PUBLISH_FAILED"
  | "DISABLE_IN_PROGRESS"
  | "DISABLE_FAILED"
  | "DISABLED"
  | (string & {});
export type PortalStatusExceptionType =
  | "INTERNAL_FAILURE"
  | "UNSHARED_PRODUCT_EXCEPTION"
  | "CLOUDFRONT_DOMAIN_IN_USE"
  | "MISSING_CLOUDFRONT_PERMISSIONS"
  | (string & {});
export type Message = string;
export interface PortalStatusException {
  exception?: PortalStatusExceptionType | undefined;
  message?: string | undefined;
}
export type PublishDescription = string;
export interface CreatePortalResponse {
  portalId: string;
  portalArn: string;
  endpointConfiguration: EndpointConfigurationResponse;
  authorization: Authorization;
  portalContent: PortalContent;
  includedProductArns: string[];
  publishStatus?: PublishStatus | undefined;
  statusException?: PortalStatusException | undefined;
  updatedAt: Date;
  publishedAt?: Date | undefined;
  publishDescription?: string | undefined;
  rumAppMonitorName?: string | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface CreatePortalPreviewRequest {
  portalId: string;
}
export interface CreatePortalPreviewResponse {}
export type ProductName = string;
export type ProductDescription = string;
export type ApiSelectionMode = "CUSTOM" | "RULE_BASED" | (string & {});
export type RuleFilterKey =
  | "RESOURCE_ARN"
  | "HOST"
  | "METHOD"
  | "PATH"
  | "PORT"
  | "ACCOUNT"
  | (string & {});
export type RuleFilterValue = string;
export type RuleFilterValueList = string[];
export interface RuleFilter {
  key: RuleFilterKey;
  values: string[];
}
export type RuleFilterList = RuleFilter[];
export interface ApiSelectionConfiguration {
  apiSelectionMode: ApiSelectionMode;
  ruleFilters?: RuleFilter[] | undefined;
}
export interface CreateProductRequest {
  displayName: string;
  description?: string | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
  apiSelectionConfiguration?: ApiSelectionConfiguration | undefined;
}
export type ProductPageArn = string;
export type ProductPageArnList = string[];
export type ProductApiPageArn = string;
export type ProductApiPageArnList = string[];
export interface Section {
  sectionName?: string | undefined;
  productApiPageArns?: string[] | undefined;
}
export type Contents = Section[];
export interface DisplayOrder {
  overviewPageArn?: string | undefined;
  productPageArns?: string[] | undefined;
  contents?: Section[] | undefined;
}
export type ProductStatus = "ACTIVE" | "IN_PROGRESS" | "FAILED" | (string & {});
export type ProductFailureReason = "API_PAGE_ATTACHED" | "EVALUATION_ERROR" | (string & {});
export interface CreateProductResponse {
  productId: string;
  productArn: string;
  displayName: string;
  displayOrder?: DisplayOrder | undefined;
  description?: string | undefined;
  updatedAt: Date;
  tags?: { [key: string]: string | undefined } | undefined;
  apiSelectionConfiguration?: ApiSelectionConfiguration | undefined;
  status?: ProductStatus | undefined;
  failureReason?: ProductFailureReason | undefined;
}
export type OperationName = string;
export type ApiEndpoint = string;
export type ApiPageBody = string;
export interface DisplayContentOverrides {
  operationName?: string | undefined;
  apiUrl?: string | undefined;
  body?: string | undefined;
}
export type ApiPageDisplayContent =
  | { none: None; overrides?: undefined }
  | { none?: undefined; overrides: DisplayContentOverrides };
export type TryItState = "ENABLED" | "DISABLED" | (string & {});
export interface CreateProductApiPageRequest {
  productId: string;
  managedApiId: string;
  displayContent?: ApiPageDisplayContent | undefined;
  tryItState?: TryItState | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
export type ProductApiPageId = string;
export type Path = string;
export type Method = string;
export interface IdentifierParts {
  path: string;
  method: string;
  resourceArn: string;
}
export interface ApiId {
  identifierParts?: IdentifierParts | undefined;
}
export interface ApiPageDisplayContentResponse {
  operationName?: string | undefined;
  apiUrl: string;
  body?: string | undefined;
}
export type Status = "AVAILABLE" | "IN_PROGRESS" | "FAILED" | (string & {});
export type ProductApiPageStatusExceptionType =
  | "INTERNAL_FAILURE"
  | "RESOURCE_DELETED"
  | "MEMBER_LEFT_ORG"
  | (string & {});
export interface ProductApiPageStatusException {
  exception?: ProductApiPageStatusExceptionType | undefined;
  message?: string | undefined;
}
export interface CreateProductApiPageResponse {
  productApiPageId: string;
  productApiPageArn: string;
  apiId: ApiId;
  displayContent: ApiPageDisplayContentResponse;
  tryItState: TryItState;
  updatedAt: Date;
  status: Status;
  statusException?: ProductApiPageStatusException | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
export type PageTitle = string;
export type PageBody = string;
export interface DisplayContent {
  title: string;
  body: string;
}
export interface CreateProductPageRequest {
  productId: string;
  displayContent: DisplayContent;
  tags?: { [key: string]: string | undefined } | undefined;
}
export type ProductPageId = string;
export interface CreateProductPageResponse {
  productPageId: string;
  productPageArn: string;
  displayContent?: DisplayContent | undefined;
  updatedAt: Date;
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface DeleteDiscoveryConfigurationRequest {}
export interface DeleteDiscoveryConfigurationResponse {}
export interface DeleteManagedApiRequest {
  managedApiId: string;
}
export interface DeleteManagedApiResponse {}
export interface DeleteOrganizationDiscoveryConfigurationRequest {}
export interface DeleteOrganizationDiscoveryConfigurationResponse {}
export interface DeletePortalRequest {
  portalId: string;
}
export interface DeletePortalResponse {}
export interface DeleteProductRequest {
  productId: string;
}
export interface DeleteProductResponse {}
export interface DeleteProductApiPageRequest {
  productId: string;
  productApiPageId: string;
}
export interface DeleteProductApiPageResponse {}
export interface DeleteProductPageRequest {
  productId: string;
  productPageId: string;
}
export interface DeleteProductPageResponse {}
export interface DeleteProductSharingPolicyRequest {
  productId: string;
}
export interface DeleteProductSharingPolicyResponse {}
export interface DisassociateManagedApisRequest {
  productId: string;
  managedApiIds: string[];
}
export interface DisassociateManagedApisResponse {
  failedItems: FailedManagedApiItem[];
}
export type Host = string;
export interface GetApiInventoryItemRequest {
  method: HttpMethod;
  host: string;
  port: number;
  path: string;
  resourceArn: string;
}
export type AccountId = string;
export type DiscoverySource = "API_GATEWAY" | "ELB" | "CLOUDFRONT" | (string & {});
export type Visibility = "PUBLIC" | "PRIVATE" | (string & {});
export type WafStatus = "ENABLED" | "DISABLED" | (string & {});
export type Classification =
  | "SHADOW"
  | "MANAGED"
  | "MANAGED_ZOMBIE"
  | "MANAGED_ORPHANED"
  | (string & {});
export type ManagedBy = "SELF" | "ORGANIZATION" | (string & {});
export type Workload = "MCP" | "LLM" | "A2A" | (string & {});
export type WorkloadList = Workload[];
export interface ApiInventoryItemDetail {
  method: HttpMethod;
  host: string;
  port: number;
  path: string;
  accountId: string;
  resourceArn: string;
  region: string;
  discoverySource: DiscoverySource;
  visibility?: Visibility | undefined;
  wafStatus?: WafStatus | undefined;
  classification?: Classification | undefined;
  managedBy?: ManagedBy | undefined;
  workloads?: Workload[] | undefined;
  managedApiId?: string | undefined;
}
export interface GetApiInventoryItemResponse {
  item: ApiInventoryItemDetail;
}
export interface GetDiscoveryConfigurationRequest {}
export type DiscoveryConfigurationArn = string;
export type DiscoveryConfigurationStatus = "DISABLED" | "ENABLED" | "UPDATING" | (string & {});
export type DiscoverySourceList = DiscoverySource[];
export type ResourceArnList = string[];
export type DiscoveryFeature = "AI_DISCOVERY" | (string & {});
export type DiscoveryFeatureList = DiscoveryFeature[];
export interface DiscoveryConfigurationData {
  arn: string;
  status?: DiscoveryConfigurationStatus | undefined;
  discoverySources?: DiscoverySource[] | undefined;
  excludedResources?: string[] | undefined;
  features?: DiscoveryFeature[] | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
export interface GetDiscoveryConfigurationResponse {
  discoveryConfiguration: DiscoveryConfigurationData;
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface GetManagedApiRequest {
  managedApiId: string;
}
export type PostureStatus =
  | "TRUE"
  | "FALSE"
  | "NOT_APPLICABLE"
  | "INSUFFICIENT_DATA"
  | (string & {});
export type FindingReason =
  | "AUTHENTICATION_NOT_CONFIGURED"
  | "REQUEST_VALIDATION_NOT_ENABLED"
  | "API_KEY_NOT_CONFIGURED"
  | "THROTTLING_NOT_ENABLED"
  | "THROTTLING_RATE_LIMIT_NOT_SET"
  | "THROTTLING_BURST_LIMIT_NOT_SET"
  | "RESPONSE_CACHING_NOT_ENABLED"
  | "STAGE_WAF_NOT_ASSOCIATED"
  | "STAGE_ACCESS_LOGGING_NOT_ENABLED"
  | "PRIVATE_API_RESOURCE_POLICY_MISSING"
  | "REST_API_TLS_BELOW_1_2"
  | "LOAD_BALANCER_WAF_NOT_ASSOCIATED"
  | "LISTENER_TLS_BELOW_1_2"
  | "DISTRIBUTION_TLS_BELOW_1_2"
  | "DISTRIBUTION_WAF_NOT_ASSOCIATED"
  | "DISTRIBUTION_SERVES_PLAINTEXT_HTTP"
  | "DISTRIBUTION_ACCESS_LOGGING_NOT_ENABLED"
  | "GEO_RESTRICTION_NOT_CONFIGURED"
  | "UNKNOWN"
  | (string & {});
export interface ManagedApiFinding {
  postureId?: string | undefined;
  postureStatus?: PostureStatus | undefined;
  reason?: FindingReason | undefined;
  updatedAt?: Date | undefined;
}
export type ManagedApiFindingList = ManagedApiFinding[];
export interface GetManagedApiResponse {
  managedApiId: string;
  managedApiArn: string;
  apiSignature: ApiSignature;
  createdAt: Date;
  updatedAt: Date;
  findings?: ManagedApiFinding[] | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface GetOrganizationDiscoveryConfigurationRequest {}
export type OrgDiscoveryConfigurationArn = string;
export type OrganizationalUnitId = string;
export type OrganizationalUnitIdList = string[];
export type AccountIdList = string[];
export interface DiscoveryExclusionFilters {
  organizationalUnitIds?: string[] | undefined;
  accountIds?: string[] | undefined;
  resourceArns?: string[] | undefined;
}
export interface DiscoveryInclusionFilters {
  organizationalUnitIds?: string[] | undefined;
  accountIds?: string[] | undefined;
}
export type OrganizationDiscoveryFilters =
  | { exclusionFilters: DiscoveryExclusionFilters; inclusionFilters?: undefined }
  | { exclusionFilters?: undefined; inclusionFilters: DiscoveryInclusionFilters };
export interface OrganizationDiscoveryConfigurationData {
  arn: string;
  status?: DiscoveryConfigurationStatus | undefined;
  discoverySources?: DiscoverySource[] | undefined;
  exclusionFilters?: DiscoveryExclusionFilters | undefined;
  discoveryFilters?: OrganizationDiscoveryFilters | undefined;
  features?: DiscoveryFeature[] | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
export interface GetOrganizationDiscoveryConfigurationResponse {
  discoveryConfiguration: OrganizationDiscoveryConfigurationData;
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface GetPortalRequest {
  portalId: string;
}
export type PreviewStatus =
  | "PREVIEW_IN_PROGRESS"
  | "PREVIEW_FAILED"
  | "PREVIEW_READY"
  | (string & {});
export interface Preview {
  previewStatus: PreviewStatus;
  statusException?: PortalStatusException | undefined;
  previewUrl?: string | undefined;
}
export interface GetPortalResponse {
  portalId: string;
  portalArn: string;
  endpointConfiguration: EndpointConfigurationResponse;
  authorization: Authorization;
  portalContent: PortalContent;
  includedProductArns: string[];
  publishStatus?: PublishStatus | undefined;
  statusException?: PortalStatusException | undefined;
  updatedAt: Date;
  publishedAt?: Date | undefined;
  publishDescription?: string | undefined;
  rumAppMonitorName?: string | undefined;
  preview?: Preview | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface GetProductRequest {
  productId: string;
  resourceOwnerAccountId?: string | undefined;
}
export interface GetProductResponse {
  productId: string;
  productArn: string;
  displayName: string;
  displayOrder: DisplayOrder;
  description: string;
  updatedAt: Date;
  tags?: { [key: string]: string | undefined } | undefined;
  apiSelectionConfiguration?: ApiSelectionConfiguration | undefined;
  status?: ProductStatus | undefined;
  failureReason?: ProductFailureReason | undefined;
}
export interface GetProductApiPageRequest {
  productId: string;
  productApiPageId: string;
  resourceOwnerAccountId?: string | undefined;
  includeRawDisplayContent?: boolean | undefined;
}
export interface GetProductApiPageResponse {
  productApiPageId: string;
  productApiPageArn: string;
  apiId: ApiId;
  displayContent: ApiPageDisplayContentResponse;
  tryItState: TryItState;
  updatedAt: Date;
  status: Status;
  rawDisplayContent?: string | undefined;
  statusException?: ProductApiPageStatusException | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface GetProductPageRequest {
  productId: string;
  productPageId: string;
  resourceOwnerAccountId?: string | undefined;
}
export interface GetProductPageResponse {
  productPageId: string;
  productPageArn: string;
  displayContent: DisplayContent;
  updatedAt: Date;
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface GetProductSharingPolicyRequest {
  productId: string;
}
export type PolicyDocument = string;
export interface GetProductSharingPolicyResponse {
  productId: string;
  policyDocument: string;
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface ApiInventoryFilters {
  discoverySource?: DiscoverySource | undefined;
  resourceArn?: string | undefined;
}
export type MaxResults = number;
export type NextToken = string;
export interface ListApiInventoryItemsRequest {
  filters?: ApiInventoryFilters | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface ApiInventoryItem {
  method: HttpMethod;
  host: string;
  port: number;
  path: string;
  accountId: string;
  resourceArn: string;
  region: string;
  discoverySource: DiscoverySource;
  firstSeen?: Date | undefined;
  lastSeen?: Date | undefined;
  visibility?: Visibility | undefined;
  wafStatus?: WafStatus | undefined;
  classification?: Classification | undefined;
  managedBy?: ManagedBy | undefined;
  workloads?: Workload[] | undefined;
}
export type ApiInventoryItemList = ApiInventoryItem[];
export interface ListApiInventoryItemsResponse {
  items: ApiInventoryItem[];
  nextToken?: string | undefined;
}
export interface ListDiscoveryStatusesRequest {
  discoverySource?: DiscoverySource | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export type DiscoveryStatusValue =
  | "STOPPED"
  | "PROVISIONING"
  | "RUNNING"
  | "FAILED"
  | (string & {});
export type DiscoveryFailureReason =
  | "ACCESS_DENIED"
  | "DEPENDENCY_ERROR"
  | "THROTTLED"
  | "INVALID_CONFIGURATION"
  | "INTERNAL_ERROR"
  | (string & {});
export interface DiscoveryStatus {
  accountId?: string | undefined;
  discoverySource: DiscoverySource;
  status: DiscoveryStatusValue;
  failureReason?: DiscoveryFailureReason | undefined;
}
export type DiscoveryStatusList = DiscoveryStatus[];
export interface ListDiscoveryStatusesResponse {
  items: DiscoveryStatus[];
  nextToken?: string | undefined;
}
export type ManagedApiEventMaxResults = number;
export interface ListManagedApiEventsRequest {
  managedApiId: string;
  startedAfter?: Date | undefined;
  startedBefore?: Date | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export type EventId = string;
export type EventType = "WAF_API_SECURITY" | (string & {});
export type EventStatus = "EVENT_STARTED" | "EVENT_IN_PROGRESS" | "EVENT_ENDED" | (string & {});
export type ThreatLabel = string;
export type ThreatCategory = string;
export type Confidence = "LOW" | "MEDIUM" | "HIGH" | (string & {});
export type WebAclArn = string;
export interface WafApiSecurityEventDetail {
  label?: string | undefined;
  category?: string | undefined;
  confidence?: Confidence | undefined;
  webAclArn?: string | undefined;
}
export interface ManagedApiEventSummary {
  eventId: string;
  eventType?: EventType | undefined;
  status?: EventStatus | undefined;
  wafApiSecurityEventDetail?: WafApiSecurityEventDetail | undefined;
  startedAt?: Date | undefined;
  endedAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
export type ManagedApiEventSummaryList = ManagedApiEventSummary[];
export interface ListManagedApiEventsResponse {
  items: ManagedApiEventSummary[];
  nextToken?: string | undefined;
}
export interface ListManagedApisRequest {
  maxResults?: number | undefined;
  nextToken?: string | undefined;
  productId?: string | undefined;
}
export interface ManagedApiSummary {
  managedApiId: string;
  managedApiArn: string;
  apiSignature: ApiSignature;
  createdAt: Date;
  updatedAt: Date;
}
export type ManagedApiList = ManagedApiSummary[];
export interface ListManagedApisResponse {
  nextToken?: string | undefined;
  items: ManagedApiSummary[];
}
export interface ListPortalsRequest {
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface PortalSummary {
  portalId: string;
  portalArn: string;
  endpointConfiguration: EndpointConfigurationResponse;
  authorization: Authorization;
  portalContent: PortalContent;
  includedProductArns: string[];
  publishStatus?: PublishStatus | undefined;
  statusException?: PortalStatusException | undefined;
  updatedAt: Date;
  publishedAt?: Date | undefined;
  publishDescription?: string | undefined;
  rumAppMonitorName?: string | undefined;
  preview?: Preview | undefined;
}
export type PortalList = PortalSummary[];
export interface ListPortalsResponse {
  items?: PortalSummary[] | undefined;
  nextToken?: string | undefined;
}
export interface ListProductApiPagesRequest {
  productId: string;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
  resourceOwnerAccountId?: string | undefined;
}
export interface ProductApiPageSummaryNoBody {
  productApiPageId: string;
  productApiPageArn: string;
  apiId: ApiId;
  operationName?: string | undefined;
  apiUrl: string;
  tryItState: TryItState;
  updatedAt: Date;
  status: Status;
  statusException?: ProductApiPageStatusException | undefined;
}
export type ProductApiPageList = ProductApiPageSummaryNoBody[];
export interface ListProductApiPagesResponse {
  nextToken?: string | undefined;
  items: ProductApiPageSummaryNoBody[];
}
export interface ListProductPagesRequest {
  productId: string;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
  resourceOwnerAccountId?: string | undefined;
}
export interface ProductPageSummaryNoBody {
  productPageId: string;
  productPageArn: string;
  pageTitle: string;
  updatedAt: Date;
}
export type ProductPageList = ProductPageSummaryNoBody[];
export interface ListProductPagesResponse {
  nextToken?: string | undefined;
  items: ProductPageSummaryNoBody[];
}
export type ResourceOwner = "ALL" | "SELF" | "OTHER_ACCOUNTS" | (string & {});
export interface ListProductsRequest {
  maxResults?: number | undefined;
  nextToken?: string | undefined;
  resourceOwner?: ResourceOwner | undefined;
  managedApiId?: string | undefined;
}
export interface ProductSummary {
  productId: string;
  productArn: string;
  displayName: string;
  description: string;
  updatedAt: Date;
  apiSelectionConfiguration?: ApiSelectionConfiguration | undefined;
  status?: ProductStatus | undefined;
  failureReason?: ProductFailureReason | undefined;
}
export type ProductList = ProductSummary[];
export interface ListProductsResponse {
  nextToken?: string | undefined;
  items?: ProductSummary[] | undefined;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined } | undefined;
}
export type NonEmptyDiscoverySourceList = DiscoverySource[];
export interface PutDiscoveryConfigurationRequest {
  discoverySources?: DiscoverySource[] | undefined;
  excludedResources?: string[] | undefined;
  features?: DiscoveryFeature[] | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface PutDiscoveryConfigurationResponse {
  discoveryConfiguration: DiscoveryConfigurationData;
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface PutOrganizationDiscoveryConfigurationRequest {
  discoverySources?: DiscoverySource[] | undefined;
  exclusionFilters?: DiscoveryExclusionFilters | undefined;
  discoveryFilters?: OrganizationDiscoveryFilters | undefined;
  features?: DiscoveryFeature[] | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface PutOrganizationDiscoveryConfigurationResponse {
  discoveryConfiguration: OrganizationDiscoveryConfigurationData;
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface PutProductSharingPolicyRequest {
  productId: string;
  policyDocument: string;
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface PutProductSharingPolicyResponse {}
export type StringWithLengthBetween1And1600 = string;
export interface StartDiscoveryRequest {
  id: string;
}
export interface StartDiscoveryResponse {}
export interface StopDiscoveryRequest {
  id: string;
}
export interface StopDiscoveryResponse {}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeys = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdatePortalRequest {
  portalId: string;
  portalContent?: PortalContent | undefined;
  endpointConfiguration?: EndpointConfigurationRequest | undefined;
  authorization?: Authorization | undefined;
  rumAppMonitorName?: string | undefined;
  includedProductArns?: string[] | undefined;
  logoUri?: string | undefined;
}
export interface UpdatePortalResponse {
  portalId: string;
  portalArn: string;
  endpointConfiguration: EndpointConfigurationResponse;
  authorization: Authorization;
  portalContent: PortalContent;
  includedProductArns: string[];
  publishStatus?: PublishStatus | undefined;
  statusException?: PortalStatusException | undefined;
  updatedAt: Date;
  publishedAt?: Date | undefined;
  publishDescription?: string | undefined;
  rumAppMonitorName?: string | undefined;
  preview?: Preview | undefined;
}
export type DesiredPublishStatus = "PUBLISHED" | "DISABLED" | (string & {});
export interface UpdatePortalPublishStatusRequest {
  portalId: string;
  status: DesiredPublishStatus;
  description?: string | undefined;
}
export interface UpdatePortalPublishStatusResponse {}
export interface UpdateProductRequest {
  productId: string;
  displayName?: string | undefined;
  description?: string | undefined;
  displayOrder?: DisplayOrder | undefined;
  apiSelectionConfiguration?: ApiSelectionConfiguration | undefined;
}
export interface UpdateProductResponse {
  productId: string;
  productArn: string;
  displayName: string;
  displayOrder?: DisplayOrder | undefined;
  description?: string | undefined;
  updatedAt: Date;
  apiSelectionConfiguration?: ApiSelectionConfiguration | undefined;
  status?: ProductStatus | undefined;
  failureReason?: ProductFailureReason | undefined;
}
export interface UpdateProductApiPageRequest {
  productId: string;
  productApiPageId: string;
  displayContent?: ApiPageDisplayContent | undefined;
  tryItState?: TryItState | undefined;
}
export interface UpdateProductApiPageResponse {
  productApiPageId: string;
  productApiPageArn: string;
  apiId: ApiId;
  displayContent: ApiPageDisplayContentResponse;
  tryItState: TryItState;
  updatedAt: Date;
  status: Status;
  statusException?: ProductApiPageStatusException | undefined;
}
export interface UpdateProductPageRequest {
  productId: string;
  productPageId: string;
  displayContent?: DisplayContent | undefined;
}
export interface UpdateProductPageResponse {
  productPageId: string;
  productPageArn: string;
  displayContent?: DisplayContent | undefined;
  updatedAt: Date;
}
export type AssociateManagedApisError =
  | AccessDeniedException
  | BadRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Associate one or more Managed APIs with a product. Best-effort -- IDs that fail are returned in
 * {@link AssociateManagedApisResponse#failedItems}; IDs that succeed are omitted. Associating an
 * already-associated Managed API is a no-op (not reported as failure).
 */
export const associateManagedApis: API.OperationMethod<
  AssociateManagedApisRequest & RegionInput,
  AssociateManagedApisResponse,
  AssociateManagedApisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(424, __c53, 0) as any as S.Schema<AssociateManagedApisRequest>,
  output: __S(434, __c54, 2) as any as S.Schema<AssociateManagedApisResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateManagedApis",
  telemetry: TELEMETRY,
  span: "AssociateManagedApis",
}));

export type CreateManagedApiError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | CommonErrors;
/**
 * Promote a discovered API in the API inventory into the managed API list.
 */
export const createManagedApi: API.OperationMethod<
  CreateManagedApiRequest & RegionInput,
  CreateManagedApiResponse,
  CreateManagedApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c56, 0) as any as S.Schema<CreateManagedApiRequest>,
  output: __S(449, __c56, 1) as any as S.Schema<CreateManagedApiResponse>,
  errors: [AccessDeniedException, BadRequestException, ConflictException, LimitExceededException],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateManagedApi",
  telemetry: TELEMETRY,
  span: "CreateManagedApi",
}));

export type CreatePortalError =
  | AccessDeniedException
  | BadRequestException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates a portal that publishes documentation for the products it includes. Use UpdatePortalPublishStatus to publish it.
 */
export const createPortal: API.OperationMethod<
  CreatePortalRequest & RegionInput,
  CreatePortalResponse,
  CreatePortalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(472, __c59, 0) as any as S.Schema<CreatePortalRequest>,
  output: __S(473, __c59, 1) as any as S.Schema<CreatePortalResponse>,
  errors: [AccessDeniedException, BadRequestException, LimitExceededException],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePortal",
  telemetry: TELEMETRY,
  span: "CreatePortal",
}));

export type CreatePortalPreviewError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Starts building a preview of the portal's current content. Use GetPortal to check the preview status and get the preview URL.
 */
export const createPortalPreview: API.OperationMethod<
  CreatePortalPreviewRequest & RegionInput,
  CreatePortalPreviewResponse,
  CreatePortalPreviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c64, 0) as any as S.Schema<CreatePortalPreviewRequest>,
  output: __S(504, __c63, 0) as any as S.Schema<CreatePortalPreviewResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePortalPreview",
  telemetry: TELEMETRY,
  span: "CreatePortalPreview",
}));

export type CreateProductError =
  | AccessDeniedException
  | BadRequestException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates a product. A product groups Managed APIs with their API pages and product pages so a portal can publish them together.
 */
export const createProduct: API.OperationMethod<
  CreateProductRequest & RegionInput,
  CreateProductResponse,
  CreateProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateProductRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<CreateProductResponse>,
  errors: [AccessDeniedException, BadRequestException, LimitExceededException],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProduct",
  telemetry: TELEMETRY,
  span: "CreateProduct",
}));

export type CreateProductApiPageError =
  | AccessDeniedException
  | BadRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates an API page that documents a Managed API in a product. The page content is generated asynchronously. Use `status` to track it.
 */
export const createProductApiPage: API.OperationMethod<
  CreateProductApiPageRequest & RegionInput,
  CreateProductApiPageResponse,
  CreateProductApiPageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(24, __c3, 0) as any as S.Schema<CreateProductApiPageRequest>,
  output: __S(25, __c3, 1) as any as S.Schema<CreateProductApiPageResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProductApiPage",
  telemetry: TELEMETRY,
  span: "CreateProductApiPage",
}));

export type CreateProductPageError =
  | AccessDeniedException
  | BadRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a product page with free-form documentation. A product can have up to 40 pages.
 */
export const createProductPage: API.OperationMethod<
  CreateProductPageRequest & RegionInput,
  CreateProductPageResponse,
  CreateProductPageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(56, __c7, 0) as any as S.Schema<CreateProductPageRequest>,
  output: __S(57, __c7, 1) as any as S.Schema<CreateProductPageResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProductPage",
  telemetry: TELEMETRY,
  span: "CreateProductPage",
}));

export type DeleteDiscoveryConfigurationError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the discovery configuration and stops any running discovery.
 */
export const deleteDiscoveryConfiguration: API.OperationMethod<
  DeleteDiscoveryConfigurationRequest & RegionInput,
  DeleteDiscoveryConfigurationResponse,
  DeleteDiscoveryConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(72, __c9, 0) as any as S.Schema<DeleteDiscoveryConfigurationRequest>,
  output: __S(504, __c63, 0) as any as S.Schema<DeleteDiscoveryConfigurationResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDiscoveryConfiguration",
  telemetry: TELEMETRY,
  span: "DeleteDiscoveryConfiguration",
}));

export type DeleteManagedApiError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a Managed API.
 */
export const deleteManagedApi: API.OperationMethod<
  DeleteManagedApiRequest & RegionInput,
  DeleteManagedApiResponse,
  DeleteManagedApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c10, 0) as any as S.Schema<DeleteManagedApiRequest>,
  output: __S(504, __c63, 0) as any as S.Schema<DeleteManagedApiResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteManagedApi",
  telemetry: TELEMETRY,
  span: "DeleteManagedApi",
}));

export type DeleteOrganizationDiscoveryConfigurationError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the organization-wide discovery configuration and stops any running discovery across
 * the organization. Only the organization management account may call this operation.
 */
export const deleteOrganizationDiscoveryConfiguration: API.OperationMethod<
  DeleteOrganizationDiscoveryConfigurationRequest & RegionInput,
  DeleteOrganizationDiscoveryConfigurationResponse,
  DeleteOrganizationDiscoveryConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(88, __c11, 0) as any as S.Schema<DeleteOrganizationDiscoveryConfigurationRequest>,
  output: __S(504, __c63, 0) as any as S.Schema<DeleteOrganizationDiscoveryConfigurationResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOrganizationDiscoveryConfiguration",
  telemetry: TELEMETRY,
  span: "DeleteOrganizationDiscoveryConfiguration",
}));

export type DeletePortalError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a portal.
 */
export const deletePortal: API.OperationMethod<
  DeletePortalRequest & RegionInput,
  DeletePortalResponse,
  DeletePortalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<DeletePortalRequest>,
  output: __S(504, __c63, 0) as any as S.Schema<DeletePortalResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePortal",
  telemetry: TELEMETRY,
  span: "DeletePortal",
}));

export type DeleteProductError =
  | AccessDeniedException
  | BadRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a product.
 */
export const deleteProduct: API.OperationMethod<
  DeleteProductRequest & RegionInput,
  DeleteProductResponse,
  DeleteProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<DeleteProductRequest>,
  output: __S(504, __c63, 0) as any as S.Schema<DeleteProductResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProduct",
  telemetry: TELEMETRY,
  span: "DeleteProduct",
}));

export type DeleteProductApiPageError =
  | AccessDeniedException
  | BadRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an API page.
 */
export const deleteProductApiPage: API.OperationMethod<
  DeleteProductApiPageRequest & RegionInput,
  DeleteProductApiPageResponse,
  DeleteProductApiPageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c14, 0) as any as S.Schema<DeleteProductApiPageRequest>,
  output: __S(504, __c63, 0) as any as S.Schema<DeleteProductApiPageResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProductApiPage",
  telemetry: TELEMETRY,
  span: "DeleteProductApiPage",
}));

export type DeleteProductPageError =
  | AccessDeniedException
  | BadRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a product page.
 */
export const deleteProductPage: API.OperationMethod<
  DeleteProductPageRequest & RegionInput,
  DeleteProductPageResponse,
  DeleteProductPageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(120, __c15, 0) as any as S.Schema<DeleteProductPageRequest>,
  output: __S(504, __c63, 0) as any as S.Schema<DeleteProductPageResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProductPage",
  telemetry: TELEMETRY,
  span: "DeleteProductPage",
}));

export type DeleteProductSharingPolicyError =
  | AccessDeniedException
  | BadRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the sharing policy of a product. The product is no longer shared.
 */
export const deleteProductSharingPolicy: API.OperationMethod<
  DeleteProductSharingPolicyRequest & RegionInput,
  DeleteProductSharingPolicyResponse,
  DeleteProductSharingPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c16, 0) as any as S.Schema<DeleteProductSharingPolicyRequest>,
  output: __S(504, __c63, 0) as any as S.Schema<DeleteProductSharingPolicyResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProductSharingPolicy",
  telemetry: TELEMETRY,
  span: "DeleteProductSharingPolicy",
}));

export type DisassociateManagedApisError =
  | AccessDeniedException
  | BadRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disassociate one or more Managed APIs from a product. Best-effort -- IDs that fail are returned
 * in {@link DisassociateManagedApisResponse#failedItems}; IDs that succeed are omitted.
 * Disassociating an unmapped Managed API is a no-op (not reported as failure).
 */
export const disassociateManagedApis: API.OperationMethod<
  DisassociateManagedApisRequest & RegionInput,
  DisassociateManagedApisResponse,
  DisassociateManagedApisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(136, __c17, 0) as any as S.Schema<DisassociateManagedApisRequest>,
  output: __S(434, __c54, 2) as any as S.Schema<DisassociateManagedApisResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateManagedApis",
  telemetry: TELEMETRY,
  span: "DisassociateManagedApis",
}));

export type GetApiInventoryItemError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets full details of a single API inventory item.
 */
export const getApiInventoryItem: API.OperationMethod<
  GetApiInventoryItemRequest & RegionInput,
  GetApiInventoryItemResponse,
  GetApiInventoryItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c18, 0) as any as S.Schema<GetApiInventoryItemRequest>,
  output: __S(146, __c18, 2) as any as S.Schema<GetApiInventoryItemResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApiInventoryItem",
  telemetry: TELEMETRY,
  span: "GetApiInventoryItem",
}));

export type GetDiscoveryConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the discovery configuration for the account and region.
 */
export const getDiscoveryConfiguration: API.OperationMethod<
  GetDiscoveryConfigurationRequest & RegionInput,
  GetDiscoveryConfigurationResponse,
  GetDiscoveryConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c20, 0) as any as S.Schema<GetDiscoveryConfigurationRequest>,
  output: __S(169, __c21, 1) as any as S.Schema<GetDiscoveryConfigurationResponse>,
  errors: [AccessDeniedException, InternalServerException, ResourceNotFoundException],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDiscoveryConfiguration",
  telemetry: TELEMETRY,
  span: "GetDiscoveryConfiguration",
}));

export type GetManagedApiError =
  | AccessDeniedException
  | BadRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a Managed API, including its security posture findings.
 */
export const getManagedApi: API.OperationMethod<
  GetManagedApiRequest & RegionInput,
  GetManagedApiResponse,
  GetManagedApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c22, 0) as any as S.Schema<GetManagedApiRequest>,
  output: __S(179, __c22, 3) as any as S.Schema<GetManagedApiResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetManagedApi",
  telemetry: TELEMETRY,
  span: "GetManagedApi",
}));

export type GetOrganizationDiscoveryConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the organization-wide discovery configuration. Only the organization management
 * account and registered delegated administrators may call this operation.
 */
export const getOrganizationDiscoveryConfiguration: API.OperationMethod<
  GetOrganizationDiscoveryConfigurationRequest & RegionInput,
  GetOrganizationDiscoveryConfigurationResponse,
  GetOrganizationDiscoveryConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(184, __c23, 0) as any as S.Schema<GetOrganizationDiscoveryConfigurationRequest>,
  output: __S(196, __c24, 4) as any as S.Schema<GetOrganizationDiscoveryConfigurationResponse>,
  errors: [AccessDeniedException, InternalServerException, ResourceNotFoundException],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOrganizationDiscoveryConfiguration",
  telemetry: TELEMETRY,
  span: "GetOrganizationDiscoveryConfiguration",
}));

export type GetPortalError =
  | AccessDeniedException
  | BadRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns the configuration, publish status, and preview status of a portal.
 */
export const getPortal: API.OperationMethod<
  GetPortalRequest & RegionInput,
  GetPortalResponse,
  GetPortalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(200, __c25, 0) as any as S.Schema<GetPortalRequest>,
  output: __S(201, __c25, 1) as any as S.Schema<GetPortalResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPortal",
  telemetry: TELEMETRY,
  span: "GetPortal",
}));

export type GetProductError =
  | AccessDeniedException
  | BadRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a product. To read a product shared with you by another account, supply `resourceOwnerAccountId`.
 */
export const getProduct: API.OperationMethod<
  GetProductRequest & RegionInput,
  GetProductResponse,
  GetProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(216, __c27, 0) as any as S.Schema<GetProductRequest>,
  output: __S(217, __c27, 1) as any as S.Schema<GetProductResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProduct",
  telemetry: TELEMETRY,
  span: "GetProduct",
}));

export type GetProductApiPageError =
  | AccessDeniedException
  | BadRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns an API page, including its body.
 */
export const getProductApiPage: API.OperationMethod<
  GetProductApiPageRequest & RegionInput,
  GetProductApiPageResponse,
  GetProductApiPageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c28, 0) as any as S.Schema<GetProductApiPageRequest>,
  output: __S(225, __c28, 1) as any as S.Schema<GetProductApiPageResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProductApiPage",
  telemetry: TELEMETRY,
  span: "GetProductApiPage",
}));

export type GetProductPageError =
  | AccessDeniedException
  | BadRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a product page, including its body.
 */
export const getProductPage: API.OperationMethod<
  GetProductPageRequest & RegionInput,
  GetProductPageResponse,
  GetProductPageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(232, __c29, 0) as any as S.Schema<GetProductPageRequest>,
  output: __S(233, __c29, 1) as any as S.Schema<GetProductPageResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProductPage",
  telemetry: TELEMETRY,
  span: "GetProductPage",
}));

export type GetProductSharingPolicyError =
  | AccessDeniedException
  | BadRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns the sharing policy of a product.
 */
export const getProductSharingPolicy: API.OperationMethod<
  GetProductSharingPolicyRequest & RegionInput,
  GetProductSharingPolicyResponse,
  GetProductSharingPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c30, 0) as any as S.Schema<GetProductSharingPolicyRequest>,
  output: __S(241, __c30, 1) as any as S.Schema<GetProductSharingPolicyResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProductSharingPolicy",
  telemetry: TELEMETRY,
  span: "GetProductSharingPolicy",
}));

export type ListApiInventoryItemsError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | CommonErrors;
/**
 * Lists discovered API inventory items with filtering and pagination.
 */
export const listApiInventoryItems: API.PaginatedOperationMethod<
  ListApiInventoryItemsRequest & RegionInput,
  ListApiInventoryItemsResponse,
  ListApiInventoryItemsError,
  Credentials | HttpClient.HttpClient,
  ApiInventoryItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(249, __c31, 1) as any as S.Schema<ListApiInventoryItemsRequest>,
  output: __S(252, __c31, 4) as any as S.Schema<ListApiInventoryItemsResponse>,
  errors: [AccessDeniedException, BadRequestException, InternalServerException],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApiInventoryItems",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListApiInventoryItems",
})) as any;

export type ListDiscoveryStatusesError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists discovery statuses for services.
 */
export const listDiscoveryStatuses: API.PaginatedOperationMethod<
  ListDiscoveryStatusesRequest & RegionInput,
  ListDiscoveryStatusesResponse,
  ListDiscoveryStatusesError,
  Credentials | HttpClient.HttpClient,
  DiscoveryStatus
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(256, __c32, 0) as any as S.Schema<ListDiscoveryStatusesRequest>,
  output: __S(259, __c32, 3) as any as S.Schema<ListDiscoveryStatusesResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDiscoveryStatuses",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListDiscoveryStatuses",
})) as any;

export type ListManagedApiEventsError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists API-security events for a single managed API, most recent first. Returns up to 20 of the
 * most recent events (not paginated).
 */
export const listManagedApiEvents: API.PaginatedOperationMethod<
  ListManagedApiEventsRequest & RegionInput,
  ListManagedApiEventsResponse,
  ListManagedApiEventsError,
  Credentials | HttpClient.HttpClient,
  ManagedApiEventSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(264, __c33, 0) as any as S.Schema<ListManagedApiEventsRequest>,
  output: __S(268, __c33, 4) as any as S.Schema<ListManagedApiEventsResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListManagedApiEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListManagedApiEvents",
})) as any;

export type ListManagedApisError =
  | AccessDeniedException
  | BadRequestException
  | LimitExceededException
  | CommonErrors;
/**
 * Lists the Managed APIs in your account.
 */
export const listManagedApis: API.PaginatedOperationMethod<
  ListManagedApisRequest & RegionInput,
  ListManagedApisResponse,
  ListManagedApisError,
  Credentials | HttpClient.HttpClient,
  ManagedApiSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(272, __c34, 0) as any as S.Schema<ListManagedApisRequest>,
  output: __S(275, __c34, 3) as any as S.Schema<ListManagedApisResponse>,
  errors: [AccessDeniedException, BadRequestException, LimitExceededException],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListManagedApis",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListManagedApis",
})) as any;

export type ListPortalsError =
  | AccessDeniedException
  | BadRequestException
  | LimitExceededException
  | CommonErrors;
/**
 * Lists the portals in your account.
 */
export const listPortals: API.PaginatedOperationMethod<
  ListPortalsRequest & RegionInput,
  ListPortalsResponse,
  ListPortalsError,
  Credentials | HttpClient.HttpClient,
  PortalSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(280, __c35, 0) as any as S.Schema<ListPortalsRequest>,
  output: __S(282, __c35, 2) as any as S.Schema<ListPortalsResponse>,
  errors: [AccessDeniedException, BadRequestException, LimitExceededException],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPortals",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListPortals",
})) as any;

export type ListProductApiPagesError =
  | AccessDeniedException
  | BadRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the API pages in a product. The results do not include page bodies.
 */
export const listProductApiPages: API.PaginatedOperationMethod<
  ListProductApiPagesRequest & RegionInput,
  ListProductApiPagesResponse,
  ListProductApiPagesError,
  Credentials | HttpClient.HttpClient,
  ProductApiPageSummaryNoBody
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(296, __c37, 0) as any as S.Schema<ListProductApiPagesRequest>,
  output: __S(299, __c37, 3) as any as S.Schema<ListProductApiPagesResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProductApiPages",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListProductApiPages",
})) as any;

export type ListProductPagesError =
  | AccessDeniedException
  | BadRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the product pages in a product. The results do not include page bodies.
 */
export const listProductPages: API.PaginatedOperationMethod<
  ListProductPagesRequest & RegionInput,
  ListProductPagesResponse,
  ListProductPagesError,
  Credentials | HttpClient.HttpClient,
  ProductPageSummaryNoBody
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(304, __c38, 0) as any as S.Schema<ListProductPagesRequest>,
  output: __S(307, __c38, 3) as any as S.Schema<ListProductPagesResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProductPages",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListProductPages",
})) as any;

export type ListProductsError =
  | AccessDeniedException
  | BadRequestException
  | LimitExceededException
  | CommonErrors;
/**
 * Lists products you own, products shared with you, or both.
 */
export const listProducts: API.PaginatedOperationMethod<
  ListProductsRequest & RegionInput,
  ListProductsResponse,
  ListProductsError,
  Credentials | HttpClient.HttpClient,
  ProductSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(312, __c39, 0) as any as S.Schema<ListProductsRequest>,
  output: __S(315, __c39, 3) as any as S.Schema<ListProductsResponse>,
  errors: [AccessDeniedException, BadRequestException, LimitExceededException],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProducts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListProducts",
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | BadRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the tags for an API Portal resource. One of the three basic tagging operations generated
 * for Tagris integration (ListTagsForResource / TagResource / UntagResource).
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest & RegionInput,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c40, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(321, __c40, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  telemetry: TELEMETRY,
  span: "ListTagsForResource",
}));

export type PutDiscoveryConfigurationError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates or updates the discovery configuration
 */
export const putDiscoveryConfiguration: API.OperationMethod<
  PutDiscoveryConfigurationRequest & RegionInput,
  PutDiscoveryConfigurationResponse,
  PutDiscoveryConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(328, __c41, 0) as any as S.Schema<PutDiscoveryConfigurationRequest>,
  output: __S(169, __c21, 1) as any as S.Schema<PutDiscoveryConfigurationResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    LimitExceededException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDiscoveryConfiguration",
  telemetry: TELEMETRY,
  span: "PutDiscoveryConfiguration",
}));

export type PutOrganizationDiscoveryConfigurationError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates or updates the organization-wide discovery configuration. This is a singleton
 * per organization. Only the organization management account and registered delegated
 * administrators may call this operation.
 */
export const putOrganizationDiscoveryConfiguration: API.OperationMethod<
  PutOrganizationDiscoveryConfigurationRequest & RegionInput,
  PutOrganizationDiscoveryConfigurationResponse,
  PutOrganizationDiscoveryConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c42, 0) as any as S.Schema<PutOrganizationDiscoveryConfigurationRequest>,
  output: __S(196, __c24, 4) as any as S.Schema<PutOrganizationDiscoveryConfigurationResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutOrganizationDiscoveryConfiguration",
  telemetry: TELEMETRY,
  span: "PutOrganizationDiscoveryConfiguration",
}));

export type PutProductSharingPolicyError =
  | AccessDeniedException
  | BadRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates or replaces the sharing policy of a product. The policy controls which other accounts can read the product.
 */
export const putProductSharingPolicy: API.OperationMethod<
  PutProductSharingPolicyRequest & RegionInput,
  PutProductSharingPolicyResponse,
  PutProductSharingPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(344, __c43, 0) as any as S.Schema<PutProductSharingPolicyRequest>,
  output: __S(504, __c63, 0) as any as S.Schema<PutProductSharingPolicyResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutProductSharingPolicy",
  telemetry: TELEMETRY,
  span: "PutProductSharingPolicy",
}));

export type StartDiscoveryError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Starts the API discovery process.
 */
export const startDiscovery: API.OperationMethod<
  StartDiscoveryRequest & RegionInput,
  StartDiscoveryResponse,
  StartDiscoveryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c44, 0) as any as S.Schema<StartDiscoveryRequest>,
  output: __S(504, __c63, 0) as any as S.Schema<StartDiscoveryResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDiscovery",
  telemetry: TELEMETRY,
  span: "StartDiscovery",
}));

export type StopDiscoveryError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Stops the running API discovery process.
 */
export const stopDiscovery: API.OperationMethod<
  StopDiscoveryRequest & RegionInput,
  StopDiscoveryResponse,
  StopDiscoveryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(360, __c45, 0) as any as S.Schema<StopDiscoveryRequest>,
  output: __S(504, __c63, 0) as any as S.Schema<StopDiscoveryResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopDiscovery",
  telemetry: TELEMETRY,
  span: "StopDiscovery",
}));

export type TagResourceError =
  | AccessDeniedException
  | BadRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds or updates tags on an API Portal resource. One of the three basic tagging operations
 * generated for Tagris integration (ListTagsForResource / TagResource / UntagResource).
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest & RegionInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c46, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(504, __c63, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  telemetry: TELEMETRY,
  span: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | BadRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes tags from an API Portal resource. One of the three basic tagging operations generated
 * for Tagris integration (ListTagsForResource / TagResource / UntagResource).
 *
 * tagKeys is a query string parameter: for tag-based access control (TBAC/ABAC) to work correctly,
 * API Gateway requires the keys to be removed to be passed as a query string parameter.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest & RegionInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(376, __c47, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(504, __c63, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  telemetry: TELEMETRY,
  span: "UntagResource",
}));

export type UpdatePortalError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates a portal. Only the fields supplied in the request are changed.
 */
export const updatePortal: API.OperationMethod<
  UpdatePortalRequest & RegionInput,
  UpdatePortalResponse,
  UpdatePortalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c48, 0) as any as S.Schema<UpdatePortalRequest>,
  output: __S(288, __c36, 0) as any as S.Schema<UpdatePortalResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePortal",
  telemetry: TELEMETRY,
  span: "UpdatePortal",
}));

export type UpdatePortalPublishStatusError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Publishes or disables a portal. The change runs asynchronously. Use GetPortal to track `publishStatus`.
 */
export const updatePortalPublishStatus: API.OperationMethod<
  UpdatePortalPublishStatusRequest & RegionInput,
  UpdatePortalPublishStatusResponse,
  UpdatePortalPublishStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(392, __c49, 0) as any as S.Schema<UpdatePortalPublishStatusRequest>,
  output: __S(504, __c63, 0) as any as S.Schema<UpdatePortalPublishStatusResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePortalPublishStatus",
  telemetry: TELEMETRY,
  span: "UpdatePortalPublishStatus",
}));

export type UpdateProductError =
  | AccessDeniedException
  | BadRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates a product. Only the fields supplied in the request are changed.
 */
export const updateProduct: API.OperationMethod<
  UpdateProductRequest & RegionInput,
  UpdateProductResponse,
  UpdateProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c50, 0) as any as S.Schema<UpdateProductRequest>,
  output: __S(401, __c50, 1) as any as S.Schema<UpdateProductResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProduct",
  telemetry: TELEMETRY,
  span: "UpdateProduct",
}));

export type UpdateProductApiPageError =
  | AccessDeniedException
  | BadRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates an API page. Only the fields supplied in the request are changed.
 */
export const updateProductApiPage: API.OperationMethod<
  UpdateProductApiPageRequest & RegionInput,
  UpdateProductApiPageResponse,
  UpdateProductApiPageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(408, __c51, 0) as any as S.Schema<UpdateProductApiPageRequest>,
  output: __S(409, __c51, 1) as any as S.Schema<UpdateProductApiPageResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProductApiPage",
  telemetry: TELEMETRY,
  span: "UpdateProductApiPage",
}));

export type UpdateProductPageError =
  | AccessDeniedException
  | BadRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates a product page.
 */
export const updateProductPage: API.OperationMethod<
  UpdateProductPageRequest & RegionInput,
  UpdateProductPageResponse,
  UpdateProductPageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c52, 0) as any as S.Schema<UpdateProductPageRequest>,
  output: __S(417, __c52, 1) as any as S.Schema<UpdateProductPageResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProductPage",
  telemetry: TELEMETRY,
  span: "UpdateProductPage",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          displayName: S.String,
          description: S.optional(S.String),
          tags: S.optional(__S(464, __c58, 0)),
          apiSelectionConfiguration: S.optional(__S(10, __c1, 2)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/products" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateProductRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          productId: S.String,
          productArn: S.String,
          displayName: S.String,
          displayOrder: S.optional(__S(18, __c2, 2)),
          description: S.optional(S.String),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          tags: S.optional(__S(464, __c58, 0)),
          apiSelectionConfiguration: S.optional(__S(10, __c1, 2)),
          status: S.optional(S.String),
          failureReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateProductResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, values: __S(440, __c55, 0) })).annotate({
        identifier: "RuleFilter",
      });
    case 1:
      return S.Array(__S(8, __c1, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ apiSelectionMode: S.String, ruleFilters: S.optional(__S(9, __c1, 1)) }),
      ).annotate({ identifier: "ApiSelectionConfiguration" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sectionName: S.optional(S.String),
          productApiPageArns: S.optional(__S(440, __c55, 0)),
        }),
      ).annotate({ identifier: "Section" });
    case 1:
      return S.Array(__S(16, __c2, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          overviewPageArn: S.optional(S.String),
          productPageArns: S.optional(__S(440, __c55, 0)),
          contents: S.optional(__S(17, __c2, 1)),
        }),
      ).annotate({ identifier: "DisplayOrder" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          productId: S.String.pipe(T.HttpLabel("productId")),
          managedApiId: S.String,
          displayContent: S.optional(__S(49, __c6, 1)),
          tryItState: S.optional(S.String),
          tags: S.optional(__S(464, __c58, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/products/{productId}/apipages" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateProductApiPageRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          productApiPageId: S.String,
          productApiPageArn: S.String,
          apiId: __S(33, __c4, 1),
          displayContent: __S(40, __c5, 0),
          tryItState: S.String,
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          status: S.String,
          statusException: S.optional(__S(480, __c60, 0)),
          tags: S.optional(__S(464, __c58, 0)),
        }),
      ).annotate({ identifier: "CreateProductApiPageResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ path: S.String, method: S.String, resourceArn: S.String }),
      ).annotate({ identifier: "IdentifierParts" });
    case 1:
      return S.suspend(() => S.Struct({ identifierParts: S.optional(__S(32, __c4, 0)) })).annotate({
        identifier: "ApiId",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          operationName: S.optional(S.String),
          apiUrl: S.String,
          body: S.optional(S.String),
        }),
      ).annotate({ identifier: "ApiPageDisplayContentResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          operationName: S.optional(S.String),
          apiUrl: S.optional(S.String),
          body: S.optional(S.String),
        }),
      ).annotate({ identifier: "DisplayContentOverrides" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ none: __S(504, __c63, 0) }),
        /*@__PURE__*/ S.Struct({ overrides: __S(48, __c6, 0) }),
      ]);
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          productId: S.String.pipe(T.HttpLabel("productId")),
          displayContent: __S(64, __c8, 0),
          tags: S.optional(__S(464, __c58, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/products/{productId}/productpages" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateProductPageRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          productPageId: S.String,
          productPageArn: S.String,
          displayContent: S.optional(__S(64, __c8, 0)),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          tags: S.optional(__S(464, __c58, 0)),
        }),
      ).annotate({ identifier: "CreateProductPageResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ title: S.String, body: S.String })).annotate({
        identifier: "DisplayContent",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/discovery-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDiscoveryConfigurationRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ managedApiId: S.String.pipe(T.HttpLabel("managedApiId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/managedapis/{managedApiId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteManagedApiRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/org-discovery-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteOrganizationDiscoveryConfigurationRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ portalId: S.String.pipe(T.HttpLabel("portalId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/portals/{portalId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePortalRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ productId: S.String.pipe(T.HttpLabel("productId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/products/{productId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteProductRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          productId: S.String.pipe(T.HttpLabel("productId")),
          productApiPageId: S.String.pipe(T.HttpLabel("productApiPageId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/products/{productId}/apipages/{productApiPageId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteProductApiPageRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          productId: S.String.pipe(T.HttpLabel("productId")),
          productPageId: S.String.pipe(T.HttpLabel("productPageId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/products/{productId}/productpages/{productPageId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteProductPageRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ productId: S.String.pipe(T.HttpLabel("productId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/products/{productId}/sharingpolicy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteProductSharingPolicyRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          productId: S.String.pipe(T.HttpLabel("productId")),
          managedApiIds: __S(440, __c55, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/products/{productId}/disassociate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateManagedApisRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          method: S.String.pipe(T.HttpQuery("method")),
          host: S.String.pipe(T.HttpQuery("host")),
          port: S.Number.pipe(T.HttpQuery("port")),
          path: S.String.pipe(T.HttpQuery("path")),
          resourceArn: S.String.pipe(T.HttpQuery("resourceArn")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/api-inventory/item" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetApiInventoryItemRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          method: S.String,
          host: S.String,
          port: S.Number,
          path: S.String,
          accountId: S.String,
          resourceArn: S.String,
          region: S.String,
          discoverySource: S.String,
          visibility: S.optional(S.String),
          wafStatus: S.optional(S.String),
          classification: S.optional(S.String),
          managedBy: S.optional(S.String),
          workloads: S.optional(__S(152, __c19, 0)),
          managedApiId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ApiInventoryItemDetail" });
    case 2:
      return S.suspend(() => S.Struct({ item: __S(145, __c18, 1) })).annotate({
        identifier: "GetApiInventoryItemResponse",
      });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/discovery-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDiscoveryConfigurationRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          status: S.optional(S.String),
          discoverySources: S.optional(__S(152, __c19, 0)),
          excludedResources: S.optional(__S(440, __c55, 0)),
          features: S.optional(__S(152, __c19, 0)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DiscoveryConfigurationData" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          discoveryConfiguration: __S(168, __c21, 0),
          tags: S.optional(__S(464, __c58, 0)),
        }),
      ).annotate({ identifier: "GetDiscoveryConfigurationResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ managedApiId: S.String.pipe(T.HttpLabel("managedApiId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/managedapis/{managedApiId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetManagedApiRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          postureId: S.optional(S.String),
          postureStatus: S.optional(S.String),
          reason: S.optional(S.String),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ManagedApiFinding" });
    case 2:
      return S.Array(__S(177, __c22, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          managedApiId: S.String,
          managedApiArn: S.String,
          apiSignature: __S(456, __c57, 0),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          findings: S.optional(__S(178, __c22, 2)),
          tags: S.optional(__S(464, __c58, 0)),
        }),
      ).annotate({ identifier: "GetManagedApiResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/org-discovery-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetOrganizationDiscoveryConfigurationRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          organizationalUnitIds: S.optional(__S(440, __c55, 0)),
          accountIds: S.optional(__S(440, __c55, 0)),
          resourceArns: S.optional(__S(440, __c55, 0)),
        }),
      ).annotate({ identifier: "DiscoveryExclusionFilters" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          organizationalUnitIds: S.optional(__S(440, __c55, 0)),
          accountIds: S.optional(__S(440, __c55, 0)),
        }),
      ).annotate({ identifier: "DiscoveryInclusionFilters" });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ exclusionFilters: __S(192, __c24, 0) }),
        /*@__PURE__*/ S.Struct({ inclusionFilters: __S(193, __c24, 1) }),
      ]);
    case 3:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          status: S.optional(S.String),
          discoverySources: S.optional(__S(152, __c19, 0)),
          exclusionFilters: S.optional(__S(192, __c24, 0)),
          discoveryFilters: S.optional(__S(194, __c24, 2)),
          features: S.optional(__S(152, __c19, 0)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "OrganizationDiscoveryConfigurationData" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          discoveryConfiguration: __S(195, __c24, 3),
          tags: S.optional(__S(464, __c58, 0)),
        }),
      ).annotate({ identifier: "GetOrganizationDiscoveryConfigurationResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ portalId: S.String.pipe(T.HttpLabel("portalId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/portals/{portalId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPortalRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          portalId: S.String,
          portalArn: S.String,
          endpointConfiguration: __S(494, __c61, 6),
          authorization: __S(493, __c61, 5),
          portalContent: __S(490, __c61, 2),
          includedProductArns: __S(440, __c55, 0),
          publishStatus: S.optional(S.String),
          statusException: S.optional(__S(480, __c60, 0)),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          publishedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          publishDescription: S.optional(S.String),
          rumAppMonitorName: S.optional(S.String),
          preview: S.optional(__S(208, __c26, 0)),
          tags: S.optional(__S(464, __c58, 0)),
        }),
      ).annotate({ identifier: "GetPortalResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          previewStatus: S.String,
          statusException: S.optional(__S(480, __c60, 0)),
          previewUrl: S.optional(S.String),
        }),
      ).annotate({ identifier: "Preview" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          productId: S.String.pipe(T.HttpLabel("productId")),
          resourceOwnerAccountId: S.optional(S.String).pipe(T.HttpQuery("resourceOwnerAccountId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/products/{productId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetProductRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          productId: S.String,
          productArn: S.String,
          displayName: S.String,
          displayOrder: __S(18, __c2, 2),
          description: S.String,
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          tags: S.optional(__S(464, __c58, 0)),
          apiSelectionConfiguration: S.optional(__S(10, __c1, 2)),
          status: S.optional(S.String),
          failureReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetProductResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          productId: S.String.pipe(T.HttpLabel("productId")),
          productApiPageId: S.String.pipe(T.HttpLabel("productApiPageId")),
          resourceOwnerAccountId: S.optional(S.String).pipe(T.HttpQuery("resourceOwnerAccountId")),
          includeRawDisplayContent: S.optional(S.Boolean).pipe(
            T.HttpQuery("includeRawDisplayContent"),
          ),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/products/{productId}/apipages/{productApiPageId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetProductApiPageRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          productApiPageId: S.String,
          productApiPageArn: S.String,
          apiId: __S(33, __c4, 1),
          displayContent: __S(40, __c5, 0),
          tryItState: S.String,
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          status: S.String,
          rawDisplayContent: S.optional(S.String),
          statusException: S.optional(__S(480, __c60, 0)),
          tags: S.optional(__S(464, __c58, 0)),
        }),
      ).annotate({ identifier: "GetProductApiPageResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          productId: S.String.pipe(T.HttpLabel("productId")),
          productPageId: S.String.pipe(T.HttpLabel("productPageId")),
          resourceOwnerAccountId: S.optional(S.String).pipe(T.HttpQuery("resourceOwnerAccountId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/products/{productId}/productpages/{productPageId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetProductPageRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          productPageId: S.String,
          productPageArn: S.String,
          displayContent: __S(64, __c8, 0),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          tags: S.optional(__S(464, __c58, 0)),
        }),
      ).annotate({ identifier: "GetProductPageResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ productId: S.String.pipe(T.HttpLabel("productId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/products/{productId}/sharingpolicy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetProductSharingPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          productId: S.String,
          policyDocument: S.String,
          tags: S.optional(__S(464, __c58, 0)),
        }),
      ).annotate({ identifier: "GetProductSharingPolicyResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ discoverySource: S.optional(S.String), resourceArn: S.optional(S.String) }),
      ).annotate({ identifier: "ApiInventoryFilters" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          filters: S.optional(__S(248, __c31, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/api-inventory" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListApiInventoryItemsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          method: S.String,
          host: S.String,
          port: S.Number,
          path: S.String,
          accountId: S.String,
          resourceArn: S.String,
          region: S.String,
          discoverySource: S.String,
          firstSeen: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastSeen: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          visibility: S.optional(S.String),
          wafStatus: S.optional(S.String),
          classification: S.optional(S.String),
          managedBy: S.optional(S.String),
          workloads: S.optional(__S(152, __c19, 0)),
        }),
      ).annotate({ identifier: "ApiInventoryItem" });
    case 3:
      return S.Array(__S(250, __c31, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ items: __S(251, __c31, 3), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListApiInventoryItemsResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          discoverySource: S.optional(S.String).pipe(T.HttpQuery("discoverySource")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/discovery/statuses" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDiscoveryStatusesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          accountId: S.optional(S.String),
          discoverySource: S.String,
          status: S.String,
          failureReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "DiscoveryStatus" });
    case 2:
      return S.Array(__S(257, __c32, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(258, __c32, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDiscoveryStatusesResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          managedApiId: S.String.pipe(T.HttpLabel("managedApiId")),
          startedAfter: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("startedAfter"),
          ),
          startedBefore: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("startedBefore"),
          ),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/managedapis/{managedApiId}/events" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListManagedApiEventsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          label: S.optional(S.String),
          category: S.optional(S.String),
          confidence: S.optional(S.String),
          webAclArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "WafApiSecurityEventDetail" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          eventId: S.String,
          eventType: S.optional(S.String),
          status: S.optional(S.String),
          wafApiSecurityEventDetail: S.optional(__S(265, __c33, 1)),
          startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ManagedApiEventSummary" });
    case 3:
      return S.Array(__S(266, __c33, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ items: __S(267, __c33, 3), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListManagedApiEventsResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          productId: S.optional(S.String).pipe(T.HttpQuery("productId")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/managedapis" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListManagedApisRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          managedApiId: S.String,
          managedApiArn: S.String,
          apiSignature: __S(456, __c57, 0),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "ManagedApiSummary" });
    case 2:
      return S.Array(__S(273, __c34, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), items: __S(274, __c34, 2) }),
      ).annotate({ identifier: "ListManagedApisResponse" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/portals" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListPortalsRequest" });
    case 1:
      return S.Array(__S(288, __c36, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(281, __c35, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListPortalsResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          portalId: S.String,
          portalArn: S.String,
          endpointConfiguration: __S(494, __c61, 6),
          authorization: __S(493, __c61, 5),
          portalContent: __S(490, __c61, 2),
          includedProductArns: __S(440, __c55, 0),
          publishStatus: S.optional(S.String),
          statusException: S.optional(__S(480, __c60, 0)),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          publishedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          publishDescription: S.optional(S.String),
          rumAppMonitorName: S.optional(S.String),
          preview: S.optional(__S(208, __c26, 0)),
        }),
      ).annotate({ identifier: "PortalSummary" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          productId: S.String.pipe(T.HttpLabel("productId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          resourceOwnerAccountId: S.optional(S.String).pipe(T.HttpQuery("resourceOwnerAccountId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/products/{productId}/apipages" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListProductApiPagesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          productApiPageId: S.String,
          productApiPageArn: S.String,
          apiId: __S(33, __c4, 1),
          operationName: S.optional(S.String),
          apiUrl: S.String,
          tryItState: S.String,
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          status: S.String,
          statusException: S.optional(__S(480, __c60, 0)),
        }),
      ).annotate({ identifier: "ProductApiPageSummaryNoBody" });
    case 2:
      return S.Array(__S(297, __c37, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), items: __S(298, __c37, 2) }),
      ).annotate({ identifier: "ListProductApiPagesResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          productId: S.String.pipe(T.HttpLabel("productId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          resourceOwnerAccountId: S.optional(S.String).pipe(T.HttpQuery("resourceOwnerAccountId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/products/{productId}/productpages" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListProductPagesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          productPageId: S.String,
          productPageArn: S.String,
          pageTitle: S.String,
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "ProductPageSummaryNoBody" });
    case 2:
      return S.Array(__S(305, __c38, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), items: __S(306, __c38, 2) }),
      ).annotate({ identifier: "ListProductPagesResponse" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          resourceOwner: S.optional(S.String).pipe(T.HttpQuery("resourceOwner")),
          managedApiId: S.optional(S.String).pipe(T.HttpQuery("managedApiId")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/products" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListProductsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          productId: S.String,
          productArn: S.String,
          displayName: S.String,
          description: S.String,
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          apiSelectionConfiguration: S.optional(__S(10, __c1, 2)),
          status: S.optional(S.String),
          failureReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProductSummary" });
    case 2:
      return S.Array(__S(313, __c39, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), items: S.optional(__S(314, __c39, 2)) }),
      ).annotate({ identifier: "ListProductsResponse" });
  }
}
function __c40(j: number): any {
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
      return S.suspend(() => S.Struct({ tags: S.optional(__S(464, __c58, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          discoverySources: S.optional(__S(152, __c19, 0)),
          excludedResources: S.optional(__S(440, __c55, 0)),
          features: S.optional(__S(152, __c19, 0)),
          tags: S.optional(__S(464, __c58, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/discovery-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutDiscoveryConfigurationRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          discoverySources: S.optional(__S(152, __c19, 0)),
          exclusionFilters: S.optional(__S(192, __c24, 0)),
          discoveryFilters: S.optional(__S(194, __c24, 2)),
          features: S.optional(__S(152, __c19, 0)),
          tags: S.optional(__S(464, __c58, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/org-discovery-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutOrganizationDiscoveryConfigurationRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          productId: S.String.pipe(T.HttpLabel("productId")),
          policyDocument: S.String,
          tags: S.optional(__S(464, __c58, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/products/{productId}/sharingpolicy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutProductSharingPolicyRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpQuery("id")) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/discovery/start" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartDiscoveryRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpQuery("id")) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/discovery/stop" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopDiscoveryRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(464, __c58, 0),
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
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(440, __c55, 0).pipe(T.HttpQuery("tagKeys")),
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
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          portalId: S.String.pipe(T.HttpLabel("portalId")),
          portalContent: S.optional(__S(490, __c61, 2)),
          endpointConfiguration: S.optional(__S(497, __c62, 1)),
          authorization: S.optional(__S(493, __c61, 5)),
          rumAppMonitorName: S.optional(S.String),
          includedProductArns: S.optional(__S(440, __c55, 0)),
          logoUri: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/portals/{portalId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdatePortalRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          portalId: S.String.pipe(T.HttpLabel("portalId")),
          status: S.String,
          description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/portals/{portalId}/publish" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdatePortalPublishStatusRequest" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          productId: S.String.pipe(T.HttpLabel("productId")),
          displayName: S.optional(S.String),
          description: S.optional(S.String),
          displayOrder: S.optional(__S(18, __c2, 2)),
          apiSelectionConfiguration: S.optional(__S(10, __c1, 2)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/products/{productId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateProductRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          productId: S.String,
          productArn: S.String,
          displayName: S.String,
          displayOrder: S.optional(__S(18, __c2, 2)),
          description: S.optional(S.String),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          apiSelectionConfiguration: S.optional(__S(10, __c1, 2)),
          status: S.optional(S.String),
          failureReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateProductResponse" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          productId: S.String.pipe(T.HttpLabel("productId")),
          productApiPageId: S.String.pipe(T.HttpLabel("productApiPageId")),
          displayContent: S.optional(__S(49, __c6, 1)),
          tryItState: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/products/{productId}/apipages/{productApiPageId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateProductApiPageRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          productApiPageId: S.String,
          productApiPageArn: S.String,
          apiId: __S(33, __c4, 1),
          displayContent: __S(40, __c5, 0),
          tryItState: S.String,
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          status: S.String,
          statusException: S.optional(__S(480, __c60, 0)),
        }),
      ).annotate({ identifier: "UpdateProductApiPageResponse" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          productId: S.String.pipe(T.HttpLabel("productId")),
          productPageId: S.String.pipe(T.HttpLabel("productPageId")),
          displayContent: S.optional(__S(64, __c8, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/products/{productId}/productpages/{productPageId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateProductPageRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          productPageId: S.String,
          productPageArn: S.String,
          displayContent: S.optional(__S(64, __c8, 0)),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "UpdateProductPageResponse" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          productId: S.String.pipe(T.HttpLabel("productId")),
          managedApiIds: __S(440, __c55, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/products/{productId}/associate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateManagedApisRequest" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ managedApiId: S.String, errorCode: S.String, errorMessage: S.String }),
      ).annotate({ identifier: "FailedManagedApiItem" });
    case 1:
      return S.Array(__S(432, __c54, 0));
    case 2:
      return S.suspend(() => S.Struct({ failedItems: __S(433, __c54, 1) })).annotate({
        identifier: "AssociateManagedApisResponse",
      });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ apiSignature: __S(456, __c57, 0), tags: S.optional(__S(464, __c58, 0)) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/managedapis" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateManagedApiRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          managedApiId: S.String,
          managedApiArn: S.String,
          apiSignature: __S(456, __c57, 0),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          tags: S.optional(__S(464, __c58, 0)),
        }),
      ).annotate({ identifier: "CreateManagedApiResponse" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String,
          method: S.String,
          hostname: S.String,
          port: S.Number,
          path: S.String,
        }),
      ).annotate({ identifier: "ApiSignature" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          portalContent: __S(490, __c61, 2),
          endpointConfiguration: __S(497, __c62, 1),
          authorization: __S(493, __c61, 5),
          includedProductArns: S.optional(__S(440, __c55, 0)),
          logoUri: S.optional(S.String),
          rumAppMonitorName: S.optional(S.String),
          tags: S.optional(__S(464, __c58, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/portals" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreatePortalRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          portalId: S.String,
          portalArn: S.String,
          endpointConfiguration: __S(494, __c61, 6),
          authorization: __S(493, __c61, 5),
          portalContent: __S(490, __c61, 2),
          includedProductArns: __S(440, __c55, 0),
          publishStatus: S.optional(S.String),
          statusException: S.optional(__S(480, __c60, 0)),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          publishedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          publishDescription: S.optional(S.String),
          rumAppMonitorName: S.optional(S.String),
          tags: S.optional(__S(464, __c58, 0)),
        }),
      ).annotate({ identifier: "CreatePortalResponse" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ exception: S.optional(S.String), message: S.optional(S.String) }),
      ).annotate({ identifier: "PortalStatusException" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          backgroundColor: S.String,
          navigationColor: S.String,
          headerColor: S.String,
          textColor: S.String,
          accentColor: S.String,
          errorValidationColor: S.String,
        }),
      ).annotate({ identifier: "CustomColors" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          customColors: __S(488, __c61, 0),
          logoUploadedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "PortalTheme" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          displayName: S.String,
          description: S.optional(S.String),
          theme: __S(489, __c61, 1),
        }),
      ).annotate({ identifier: "PortalContent" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          userPoolArn: S.String,
          appClientId: S.String,
          userPoolDomain: S.String,
          identityPoolId: S.optional(S.String),
        }),
      ).annotate({ identifier: "CognitoConfig" });
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ none: __S(504, __c63, 0) }),
        /*@__PURE__*/ S.Struct({ cognitoConfig: __S(491, __c61, 3) }),
      ]);
    case 5:
      return S.suspend(() =>
        S.Struct({ authorizationConfig: __S(492, __c61, 4), fineGrainedAccessControl: S.String }),
      ).annotate({ identifier: "Authorization" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          domainName: S.optional(S.String),
          certificateArn: S.optional(S.String),
          portalDomainHostedZoneId: S.String,
          portalDefaultDomainName: S.String,
        }),
      ).annotate({ identifier: "EndpointConfigurationResponse" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ domainName: S.String, certificateArn: S.String })).annotate(
        { identifier: "ACMManaged" },
      );
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ none: __S(504, __c63, 0) }),
        /*@__PURE__*/ S.Struct({ acmManaged: __S(496, __c62, 0) }),
      ]);
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "None" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ portalId: S.String.pipe(T.HttpLabel("portalId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/portals/{portalId}/preview" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreatePortalPreviewRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
