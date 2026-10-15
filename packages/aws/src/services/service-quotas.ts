import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Service Quotas",
  serviceShapeName: "ServiceQuotasV20190624",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "servicequotas" });
const ver = /*@__PURE__*/ T.ServiceVersion("2019-06-24");
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
              `https://servicequotas-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://servicequotas.${Region}.amazonaws.com`);
            }
            return e(
              `https://servicequotas-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://servicequotas.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://servicequotas.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://servicequotas.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class AWSServiceAccessNotEnabledException
  extends /*@__PURE__*/ S.TaggedError<AWSServiceAccessNotEnabledException>()(
    "AWSServiceAccessNotEnabledException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class DependencyAccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<DependencyAccessDeniedException>()(
    "DependencyAccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class IllegalArgumentException
  extends /*@__PURE__*/ S.TaggedError<IllegalArgumentException>()(
    "IllegalArgumentException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidPaginationTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidPaginationTokenException>()(
    "InvalidPaginationTokenException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidResourceStateException
  extends /*@__PURE__*/ S.TaggedError<InvalidResourceStateException>()(
    "InvalidResourceStateException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(405),
  ).pipe(C.withBadRequestError) {}
export class NoAvailableOrganizationException
  extends /*@__PURE__*/ S.TaggedError<NoAvailableOrganizationException>()(
    "NoAvailableOrganizationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class NoSuchResourceException
  extends /*@__PURE__*/ S.TaggedError<NoSuchResourceException>()(
    "NoSuchResourceException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class OrganizationNotInAllFeaturesModeException
  extends /*@__PURE__*/ S.TaggedError<OrganizationNotInAllFeaturesModeException>()(
    "OrganizationNotInAllFeaturesModeException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class QuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<QuotaExceededException>()(
    "QuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ResourceAlreadyExistsException>()(
    "ResourceAlreadyExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ServiceException
  extends /*@__PURE__*/ S.TaggedError<ServiceException>()(
    "ServiceException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ServiceQuotaTemplateNotInUseException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaTemplateNotInUseException>()(
    "ServiceQuotaTemplateNotInUseException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TagPolicyViolationException
  extends /*@__PURE__*/ S.TaggedError<TagPolicyViolationException>()(
    "TagPolicyViolationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class TemplatesNotAvailableInRegionException
  extends /*@__PURE__*/ S.TaggedError<TemplatesNotAvailableInRegionException>()(
    "TemplatesNotAvailableInRegionException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export interface AssociateServiceQuotaTemplateRequest {}
export interface AssociateServiceQuotaTemplateResponse {}
export type RequestId = string;
export interface CreateSupportCaseRequest {
  RequestId: string;
}
export interface CreateSupportCaseResponse {}
export type ServiceCode = string;
export type QuotaCode = string;
export type AwsRegion = string;
export interface DeleteServiceQuotaIncreaseRequestFromTemplateRequest {
  ServiceCode: string;
  QuotaCode: string;
  AwsRegion: string;
}
export interface DeleteServiceQuotaIncreaseRequestFromTemplateResponse {}
export interface DisassociateServiceQuotaTemplateRequest {}
export interface DisassociateServiceQuotaTemplateResponse {}
export interface GetAssociationForServiceQuotaTemplateRequest {}
export type ServiceQuotaTemplateAssociationStatus = "ASSOCIATED" | "DISASSOCIATED" | (string & {});
export interface GetAssociationForServiceQuotaTemplateResponse {
  ServiceQuotaTemplateAssociationStatus?: ServiceQuotaTemplateAssociationStatus;
}
export interface GetAutoManagementConfigurationRequest {}
export type OptInLevel = "ACCOUNT" | (string & {});
export type OptInType = "NotifyOnly" | "NotifyAndAdjust" | (string & {});
export type AmazonResourceName = string;
export type OptInStatus = "ENABLED" | "DISABLED" | (string & {});
export type ExcludedService = string;
export type QuotaName = string;
export interface QuotaInfo {
  QuotaCode?: string;
  QuotaName?: string;
}
export type QuotaInfoList = QuotaInfo[];
export type ExclusionQuotaList = { [key: string]: QuotaInfo[] | undefined };
export interface GetAutoManagementConfigurationResponse {
  OptInLevel?: OptInLevel;
  OptInType?: OptInType;
  NotificationArn?: string;
  OptInStatus?: OptInStatus;
  ExclusionList?: { [key: string]: QuotaInfo[] | undefined };
}
export interface GetAWSDefaultServiceQuotaRequest {
  ServiceCode: string;
  QuotaCode: string;
}
export type ServiceName = string;
export type QuotaArn = string;
export type QuotaValue = number;
export type QuotaUnit = string;
export type QuotaAdjustable = boolean;
export type GlobalQuota = boolean;
export type QuotaMetricNamespace = string;
export type QuotaMetricName = string;
export type MetricDimensionName = string;
export type MetricDimensionValue = string;
export type MetricDimensionsMapDefinition = { [key: string]: string | undefined };
export type Statistic = string;
export interface MetricInfo {
  MetricNamespace?: string;
  MetricName?: string;
  MetricDimensions?: { [key: string]: string | undefined };
  MetricStatisticRecommendation?: string;
}
export type PeriodValue = number;
export type PeriodUnit =
  | "MICROSECOND"
  | "MILLISECOND"
  | "SECOND"
  | "MINUTE"
  | "HOUR"
  | "DAY"
  | "WEEK"
  | (string & {});
export interface QuotaPeriod {
  PeriodValue?: number;
  PeriodUnit?: PeriodUnit;
}
export type ErrorCode =
  | "DEPENDENCY_ACCESS_DENIED_ERROR"
  | "DEPENDENCY_THROTTLING_ERROR"
  | "DEPENDENCY_SERVICE_ERROR"
  | "SERVICE_QUOTA_NOT_AVAILABLE_ERROR"
  | (string & {});
export type ErrorMessage = string;
export interface ErrorReason {
  ErrorCode?: ErrorCode;
  ErrorMessage?: string;
}
export type AppliedLevelEnum = "ACCOUNT" | "RESOURCE" | "ALL" | (string & {});
export type QuotaContextScope = "RESOURCE" | "ACCOUNT" | (string & {});
export type QuotaContextScopeType = string;
export type QuotaContextId = string;
export type AdjustableAtLevelEnum = "ACCOUNT" | "PER_RESOURCE" | "ALL" | (string & {});
export interface QuotaContextInfo {
  ContextScope?: QuotaContextScope;
  ContextScopeType?: string;
  ContextId?: string;
  AdjustableAtLevel?: AdjustableAtLevelEnum;
}
export type QuotaDescription = string;
export interface ServiceQuota {
  ServiceCode?: string;
  ServiceName?: string;
  QuotaArn?: string;
  QuotaCode?: string;
  QuotaName?: string;
  Value?: number;
  Unit?: string;
  Adjustable?: boolean;
  GlobalQuota?: boolean;
  UsageMetric?: MetricInfo;
  Period?: QuotaPeriod;
  ErrorReason?: ErrorReason;
  QuotaAppliedAtLevel?: AppliedLevelEnum;
  QuotaContext?: QuotaContextInfo;
  Description?: string;
}
export interface GetAWSDefaultServiceQuotaResponse {
  Quota?: ServiceQuota;
}
export type ReportId = string;
export type NextToken = string;
export type MaxResultsUtilization = number;
export interface GetQuotaUtilizationReportRequest {
  ReportId: string;
  NextToken?: string;
  MaxResults?: number;
}
export type ReportStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED" | (string & {});
export type TotalCount = number;
export type UtilizationPct = number;
export type DefaultValue = number;
export type AppliedValue = number;
export interface QuotaUtilizationInfo {
  QuotaCode?: string;
  ServiceCode?: string;
  QuotaName?: string;
  Namespace?: string;
  Utilization?: number;
  DefaultValue?: number;
  AppliedValue?: number;
  ServiceName?: string;
  Adjustable?: boolean;
}
export type QuotaUtilizationInfoList = QuotaUtilizationInfo[];
export type ReportErrorCode = string;
export type ReportErrorMessage = string;
export interface GetQuotaUtilizationReportResponse {
  ReportId?: string;
  Status?: ReportStatus;
  GeneratedAt?: Date;
  TotalCount?: number;
  Quotas?: QuotaUtilizationInfo[];
  NextToken?: string;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export interface GetRequestedServiceQuotaChangeRequest {
  RequestId: string;
}
export type RequestType = "AutomaticManagement" | (string & {});
export type CustomerServiceEngagementId = string;
export type RequestStatus =
  | "PENDING"
  | "CASE_OPENED"
  | "APPROVED"
  | "DENIED"
  | "CASE_CLOSED"
  | "NOT_APPROVED"
  | "INVALID_REQUEST"
  | (string & {});
export type Requester = string;
export interface RequestedServiceQuotaChange {
  Id?: string;
  RequestType?: RequestType;
  CaseId?: string;
  ServiceCode?: string;
  ServiceName?: string;
  QuotaCode?: string;
  QuotaName?: string;
  DesiredValue?: number;
  Status?: RequestStatus;
  Created?: Date;
  LastUpdated?: Date;
  Requester?: string;
  QuotaArn?: string;
  GlobalQuota?: boolean;
  Unit?: string;
  QuotaRequestedAtLevel?: AppliedLevelEnum;
  QuotaContext?: QuotaContextInfo;
}
export interface GetRequestedServiceQuotaChangeResponse {
  RequestedQuota?: RequestedServiceQuotaChange;
}
export interface GetServiceQuotaRequest {
  ServiceCode: string;
  QuotaCode: string;
  ContextId?: string;
}
export interface GetServiceQuotaResponse {
  Quota?: ServiceQuota;
}
export interface GetServiceQuotaIncreaseRequestFromTemplateRequest {
  ServiceCode: string;
  QuotaCode: string;
  AwsRegion: string;
}
export interface ServiceQuotaIncreaseRequestInTemplate {
  ServiceCode?: string;
  ServiceName?: string;
  QuotaCode?: string;
  QuotaName?: string;
  DesiredValue?: number;
  AwsRegion?: string;
  Unit?: string;
  GlobalQuota?: boolean;
}
export interface GetServiceQuotaIncreaseRequestFromTemplateResponse {
  ServiceQuotaIncreaseRequestInTemplate?: ServiceQuotaIncreaseRequestInTemplate;
}
export type MaxResults = number;
export interface ListAWSDefaultServiceQuotasRequest {
  ServiceCode: string;
  NextToken?: string;
  MaxResults?: number;
}
export type ServiceQuotaListDefinition = ServiceQuota[];
export interface ListAWSDefaultServiceQuotasResponse {
  NextToken?: string;
  Quotas?: ServiceQuota[];
}
export interface ListRequestedServiceQuotaChangeHistoryRequest {
  ServiceCode?: string;
  Status?: RequestStatus;
  NextToken?: string;
  MaxResults?: number;
  QuotaRequestedAtLevel?: AppliedLevelEnum;
}
export type RequestedServiceQuotaChangeHistoryListDefinition = RequestedServiceQuotaChange[];
export interface ListRequestedServiceQuotaChangeHistoryResponse {
  NextToken?: string;
  RequestedQuotas?: RequestedServiceQuotaChange[];
}
export interface ListRequestedServiceQuotaChangeHistoryByQuotaRequest {
  ServiceCode: string;
  QuotaCode: string;
  Status?: RequestStatus;
  NextToken?: string;
  MaxResults?: number;
  QuotaRequestedAtLevel?: AppliedLevelEnum;
}
export interface ListRequestedServiceQuotaChangeHistoryByQuotaResponse {
  NextToken?: string;
  RequestedQuotas?: RequestedServiceQuotaChange[];
}
export interface ListServiceQuotaIncreaseRequestsInTemplateRequest {
  ServiceCode?: string;
  AwsRegion?: string;
  NextToken?: string;
  MaxResults?: number;
}
export type ServiceQuotaIncreaseRequestInTemplateList = ServiceQuotaIncreaseRequestInTemplate[];
export interface ListServiceQuotaIncreaseRequestsInTemplateResponse {
  ServiceQuotaIncreaseRequestInTemplateList?: ServiceQuotaIncreaseRequestInTemplate[];
  NextToken?: string;
}
export interface ListServiceQuotasRequest {
  ServiceCode: string;
  NextToken?: string;
  MaxResults?: number;
  QuotaCode?: string;
  QuotaAppliedAtLevel?: AppliedLevelEnum;
}
export interface ListServiceQuotasResponse {
  NextToken?: string;
  Quotas?: ServiceQuota[];
}
export interface ListServicesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface ServiceInfo {
  ServiceCode?: string;
  ServiceName?: string;
}
export type ServiceInfoListDefinition = ServiceInfo[];
export interface ListServicesResponse {
  NextToken?: string;
  Services?: ServiceInfo[];
}
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type OutputTags = Tag[];
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export interface PutServiceQuotaIncreaseRequestIntoTemplateRequest {
  QuotaCode: string;
  ServiceCode: string;
  AwsRegion: string;
  DesiredValue: number;
}
export interface PutServiceQuotaIncreaseRequestIntoTemplateResponse {
  ServiceQuotaIncreaseRequestInTemplate?: ServiceQuotaIncreaseRequestInTemplate;
}
export type SupportCaseAllowed = boolean;
export interface RequestServiceQuotaIncreaseRequest {
  ServiceCode: string;
  QuotaCode: string;
  DesiredValue: number;
  ContextId?: string;
  SupportCaseAllowed?: boolean;
}
export interface RequestServiceQuotaIncreaseResponse {
  RequestedQuota?: RequestedServiceQuotaChange;
}
export type ExcludedLimit = string;
export type ExcludedQuotaList = string[];
export type ExclusionList = { [key: string]: string[] | undefined };
export interface StartAutoManagementRequest {
  OptInLevel: OptInLevel;
  OptInType: OptInType;
  NotificationArn?: string;
  ExclusionList?: { [key: string]: string[] | undefined };
}
export interface StartAutoManagementResponse {}
export interface StartQuotaUtilizationReportRequest {}
export type ReportMessage = string;
export interface StartQuotaUtilizationReportResponse {
  ReportId?: string;
  Status?: ReportStatus;
  Message?: string;
}
export interface StopAutoManagementRequest {}
export interface StopAutoManagementResponse {}
export type InputTags = Tag[];
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type InputTagKeys = string[];
export interface UntagResourceRequest {
  ResourceARN: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateAutoManagementRequest {
  OptInType?: OptInType;
  NotificationArn?: string;
  ExclusionList?: { [key: string]: string[] | undefined };
}
export interface UpdateAutoManagementResponse {}
export type ExceptionMessage = string;
export type AssociateServiceQuotaTemplateError =
  | AccessDeniedException
  | AWSServiceAccessNotEnabledException
  | DependencyAccessDeniedException
  | NoAvailableOrganizationException
  | OrganizationNotInAllFeaturesModeException
  | ServiceException
  | TemplatesNotAvailableInRegionException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Associates your quota request template with your organization. When a new
 * Amazon Web Services account is created in your organization, the quota increase requests in the
 * template are automatically applied to the account. You can add a quota increase request
 * for any adjustable quota to your template.
 */
export const associateServiceQuotaTemplate: API.OperationMethod<
  AssociateServiceQuotaTemplateRequest,
  AssociateServiceQuotaTemplateResponse,
  AssociateServiceQuotaTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<AssociateServiceQuotaTemplateRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<AssociateServiceQuotaTemplateResponse>,
  errors: [
    AccessDeniedException,
    AWSServiceAccessNotEnabledException,
    DependencyAccessDeniedException,
    NoAvailableOrganizationException,
    OrganizationNotInAllFeaturesModeException,
    ServiceException,
    TemplatesNotAvailableInRegionException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateServiceQuotaTemplate",
}));

export type CreateSupportCaseError =
  | AccessDeniedException
  | DependencyAccessDeniedException
  | IllegalArgumentException
  | InvalidResourceStateException
  | NoSuchResourceException
  | ResourceAlreadyExistsException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a Support case for an existing quota increase request. This call only creates
 * a Support case if the request has a `Pending` status.
 */
export const createSupportCase: API.OperationMethod<
  CreateSupportCaseRequest,
  CreateSupportCaseResponse,
  CreateSupportCaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c2, 0) as any as S.Schema<CreateSupportCaseRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<CreateSupportCaseResponse>,
  errors: [
    AccessDeniedException,
    DependencyAccessDeniedException,
    IllegalArgumentException,
    InvalidResourceStateException,
    NoSuchResourceException,
    ResourceAlreadyExistsException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSupportCase",
}));

export type DeleteServiceQuotaIncreaseRequestFromTemplateError =
  | AccessDeniedException
  | AWSServiceAccessNotEnabledException
  | DependencyAccessDeniedException
  | IllegalArgumentException
  | NoAvailableOrganizationException
  | NoSuchResourceException
  | ServiceException
  | TemplatesNotAvailableInRegionException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the quota increase request for the specified quota from your quota request
 * template.
 */
export const deleteServiceQuotaIncreaseRequestFromTemplate: API.OperationMethod<
  DeleteServiceQuotaIncreaseRequestFromTemplateRequest,
  DeleteServiceQuotaIncreaseRequestFromTemplateResponse,
  DeleteServiceQuotaIncreaseRequestFromTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(24, __c3, 0) as any as S.Schema<DeleteServiceQuotaIncreaseRequestFromTemplateRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteServiceQuotaIncreaseRequestFromTemplateResponse>,
  errors: [
    AccessDeniedException,
    AWSServiceAccessNotEnabledException,
    DependencyAccessDeniedException,
    IllegalArgumentException,
    NoAvailableOrganizationException,
    NoSuchResourceException,
    ServiceException,
    TemplatesNotAvailableInRegionException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteServiceQuotaIncreaseRequestFromTemplate",
}));

export type DisassociateServiceQuotaTemplateError =
  | AccessDeniedException
  | AWSServiceAccessNotEnabledException
  | DependencyAccessDeniedException
  | NoAvailableOrganizationException
  | ServiceException
  | ServiceQuotaTemplateNotInUseException
  | TemplatesNotAvailableInRegionException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Disables your quota request template. After a template is disabled, the quota increase
 * requests in the template are not applied to new Amazon Web Services accounts in your organization.
 * Disabling a quota request template does not apply its quota increase requests.
 */
export const disassociateServiceQuotaTemplate: API.OperationMethod<
  DisassociateServiceQuotaTemplateRequest,
  DisassociateServiceQuotaTemplateResponse,
  DisassociateServiceQuotaTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c4, 0) as any as S.Schema<DisassociateServiceQuotaTemplateRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<DisassociateServiceQuotaTemplateResponse>,
  errors: [
    AccessDeniedException,
    AWSServiceAccessNotEnabledException,
    DependencyAccessDeniedException,
    NoAvailableOrganizationException,
    ServiceException,
    ServiceQuotaTemplateNotInUseException,
    TemplatesNotAvailableInRegionException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateServiceQuotaTemplate",
}));

export type GetAssociationForServiceQuotaTemplateError =
  | AccessDeniedException
  | AWSServiceAccessNotEnabledException
  | DependencyAccessDeniedException
  | NoAvailableOrganizationException
  | ServiceException
  | ServiceQuotaTemplateNotInUseException
  | TemplatesNotAvailableInRegionException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the status of the association for the quota request template.
 */
export const getAssociationForServiceQuotaTemplate: API.OperationMethod<
  GetAssociationForServiceQuotaTemplateRequest,
  GetAssociationForServiceQuotaTemplateResponse,
  GetAssociationForServiceQuotaTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(40, __c5, 0) as any as S.Schema<GetAssociationForServiceQuotaTemplateRequest>,
  output: __S(41, __c5, 1) as any as S.Schema<GetAssociationForServiceQuotaTemplateResponse>,
  errors: [
    AccessDeniedException,
    AWSServiceAccessNotEnabledException,
    DependencyAccessDeniedException,
    NoAvailableOrganizationException,
    ServiceException,
    ServiceQuotaTemplateNotInUseException,
    TemplatesNotAvailableInRegionException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssociationForServiceQuotaTemplate",
}));

export type GetAutoManagementConfigurationError =
  | AccessDeniedException
  | IllegalArgumentException
  | NoSuchResourceException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about your Service Quotas Automatic Management configuration. Automatic Management monitors your Service Quotas utilization and notifies you before you
 * run out of your allocated quotas.
 */
export const getAutoManagementConfiguration: API.OperationMethod<
  GetAutoManagementConfigurationRequest,
  GetAutoManagementConfigurationResponse,
  GetAutoManagementConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c6, 0) as any as S.Schema<GetAutoManagementConfigurationRequest>,
  output: __S(52, __c6, 4) as any as S.Schema<GetAutoManagementConfigurationResponse>,
  errors: [
    AccessDeniedException,
    IllegalArgumentException,
    NoSuchResourceException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutoManagementConfiguration",
}));

export type GetAWSDefaultServiceQuotaError =
  | AccessDeniedException
  | IllegalArgumentException
  | NoSuchResourceException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the default value for the specified quota. The default value does not
 * reflect any quota increases.
 */
export const getAWSDefaultServiceQuota: API.OperationMethod<
  GetAWSDefaultServiceQuotaRequest,
  GetAWSDefaultServiceQuotaResponse,
  GetAWSDefaultServiceQuotaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(56, __c7, 0) as any as S.Schema<GetAWSDefaultServiceQuotaRequest>,
  output: __S(72, __c9, 0) as any as S.Schema<GetAWSDefaultServiceQuotaResponse>,
  errors: [
    AccessDeniedException,
    IllegalArgumentException,
    NoSuchResourceException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAWSDefaultServiceQuota",
}));

export type GetQuotaUtilizationReportError =
  | AccessDeniedException
  | IllegalArgumentException
  | InvalidPaginationTokenException
  | NoSuchResourceException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the quota utilization report for your Amazon Web Services account. This operation returns
 * paginated results showing your quota usage across all Amazon Web Services services, sorted by utilization
 * percentage in descending order (highest utilization first).
 *
 * You must first initiate a report using the `StartQuotaUtilizationReport`
 * operation. The report generation process is asynchronous and may take several seconds to
 * complete. Poll this operation periodically to check the status and retrieve results when
 * the report is ready.
 *
 * Each report contains up to 1,000 quota records per page. Use the `NextToken`
 * parameter to retrieve additional pages of results. Reports are automatically deleted after
 * 15 minutes.
 */
export const getQuotaUtilizationReport: API.OperationMethod<
  GetQuotaUtilizationReportRequest,
  GetQuotaUtilizationReportResponse,
  GetQuotaUtilizationReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(88, __c11, 0) as any as S.Schema<GetQuotaUtilizationReportRequest>,
  output: __S(91, __c11, 3) as any as S.Schema<GetQuotaUtilizationReportResponse>,
  errors: [
    AccessDeniedException,
    IllegalArgumentException,
    InvalidPaginationTokenException,
    NoSuchResourceException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQuotaUtilizationReport",
}));

export type GetRequestedServiceQuotaChangeError =
  | AccessDeniedException
  | IllegalArgumentException
  | NoSuchResourceException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the specified quota increase request.
 */
export const getRequestedServiceQuotaChange: API.OperationMethod<
  GetRequestedServiceQuotaChangeRequest,
  GetRequestedServiceQuotaChangeResponse,
  GetRequestedServiceQuotaChangeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<GetRequestedServiceQuotaChangeRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<GetRequestedServiceQuotaChangeResponse>,
  errors: [
    AccessDeniedException,
    IllegalArgumentException,
    NoSuchResourceException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRequestedServiceQuotaChange",
}));

export type GetServiceQuotaError =
  | AccessDeniedException
  | IllegalArgumentException
  | NoSuchResourceException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the applied quota value for the specified account-level or resource-level
 * quota. For some quotas, only the default values are available. If the applied quota
 * value is not available for a quota, the quota is not retrieved.
 */
export const getServiceQuota: API.OperationMethod<
  GetServiceQuotaRequest,
  GetServiceQuotaResponse,
  GetServiceQuotaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(120, __c15, 0) as any as S.Schema<GetServiceQuotaRequest>,
  output: __S(72, __c9, 0) as any as S.Schema<GetServiceQuotaResponse>,
  errors: [
    AccessDeniedException,
    IllegalArgumentException,
    NoSuchResourceException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceQuota",
}));

export type GetServiceQuotaIncreaseRequestFromTemplateError =
  | AccessDeniedException
  | AWSServiceAccessNotEnabledException
  | DependencyAccessDeniedException
  | IllegalArgumentException
  | NoAvailableOrganizationException
  | NoSuchResourceException
  | ServiceException
  | TemplatesNotAvailableInRegionException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the specified quota increase request in your quota request
 * template.
 */
export const getServiceQuotaIncreaseRequestFromTemplate: API.OperationMethod<
  GetServiceQuotaIncreaseRequestFromTemplateRequest,
  GetServiceQuotaIncreaseRequestFromTemplateResponse,
  GetServiceQuotaIncreaseRequestFromTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c16, 0) as any as S.Schema<GetServiceQuotaIncreaseRequestFromTemplateRequest>,
  output: __S(144, __c18, 0) as any as S.Schema<GetServiceQuotaIncreaseRequestFromTemplateResponse>,
  errors: [
    AccessDeniedException,
    AWSServiceAccessNotEnabledException,
    DependencyAccessDeniedException,
    IllegalArgumentException,
    NoAvailableOrganizationException,
    NoSuchResourceException,
    ServiceException,
    TemplatesNotAvailableInRegionException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceQuotaIncreaseRequestFromTemplate",
}));

export type ListAWSDefaultServiceQuotasError =
  | AccessDeniedException
  | IllegalArgumentException
  | InvalidPaginationTokenException
  | NoSuchResourceException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the default values for the quotas for the specified Amazon Web Services service. A default
 * value does not reflect any quota increases.
 */
export const listAWSDefaultServiceQuotas: API.PaginatedOperationMethod<
  ListAWSDefaultServiceQuotasRequest,
  ListAWSDefaultServiceQuotasResponse,
  ListAWSDefaultServiceQuotasError,
  Credentials | HttpClient.HttpClient,
  ServiceQuota
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(152, __c19, 0) as any as S.Schema<ListAWSDefaultServiceQuotasRequest>,
  output: __S(161, __c20, 1) as any as S.Schema<ListAWSDefaultServiceQuotasResponse>,
  errors: [
    AccessDeniedException,
    IllegalArgumentException,
    InvalidPaginationTokenException,
    NoSuchResourceException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAWSDefaultServiceQuotas",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Quotas",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRequestedServiceQuotaChangeHistoryError =
  | AccessDeniedException
  | IllegalArgumentException
  | InvalidPaginationTokenException
  | NoSuchResourceException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the quota increase requests for the specified Amazon Web Services service. Filter
 * responses to return quota requests at either the account level, resource level, or all
 * levels. Responses include any open or closed requests within 90 days.
 */
export const listRequestedServiceQuotaChangeHistory: API.PaginatedOperationMethod<
  ListRequestedServiceQuotaChangeHistoryRequest,
  ListRequestedServiceQuotaChangeHistoryResponse,
  ListRequestedServiceQuotaChangeHistoryError,
  Credentials | HttpClient.HttpClient,
  RequestedServiceQuotaChange
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(168, __c21, 0) as any as S.Schema<ListRequestedServiceQuotaChangeHistoryRequest>,
  output: __S(177, __c22, 1) as any as S.Schema<ListRequestedServiceQuotaChangeHistoryResponse>,
  errors: [
    AccessDeniedException,
    IllegalArgumentException,
    InvalidPaginationTokenException,
    NoSuchResourceException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRequestedServiceQuotaChangeHistory",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RequestedQuotas",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRequestedServiceQuotaChangeHistoryByQuotaError =
  | AccessDeniedException
  | IllegalArgumentException
  | InvalidPaginationTokenException
  | NoSuchResourceException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the quota increase requests for the specified quota. Filter responses to
 * return quota requests at either the account level, resource level, or all levels.
 */
export const listRequestedServiceQuotaChangeHistoryByQuota: API.PaginatedOperationMethod<
  ListRequestedServiceQuotaChangeHistoryByQuotaRequest,
  ListRequestedServiceQuotaChangeHistoryByQuotaResponse,
  ListRequestedServiceQuotaChangeHistoryByQuotaError,
  Credentials | HttpClient.HttpClient,
  RequestedServiceQuotaChange
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(
    184,
    __c23,
    0,
  ) as any as S.Schema<ListRequestedServiceQuotaChangeHistoryByQuotaRequest>,
  output: __S(
    177,
    __c22,
    1,
  ) as any as S.Schema<ListRequestedServiceQuotaChangeHistoryByQuotaResponse>,
  errors: [
    AccessDeniedException,
    IllegalArgumentException,
    InvalidPaginationTokenException,
    NoSuchResourceException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRequestedServiceQuotaChangeHistoryByQuota",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RequestedQuotas",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListServiceQuotaIncreaseRequestsInTemplateError =
  | AccessDeniedException
  | AWSServiceAccessNotEnabledException
  | DependencyAccessDeniedException
  | IllegalArgumentException
  | NoAvailableOrganizationException
  | ServiceException
  | TemplatesNotAvailableInRegionException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the quota increase requests in the specified quota request template.
 */
export const listServiceQuotaIncreaseRequestsInTemplate: API.PaginatedOperationMethod<
  ListServiceQuotaIncreaseRequestsInTemplateRequest,
  ListServiceQuotaIncreaseRequestsInTemplateResponse,
  ListServiceQuotaIncreaseRequestsInTemplateError,
  Credentials | HttpClient.HttpClient,
  ServiceQuotaIncreaseRequestInTemplate
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(192, __c24, 0) as any as S.Schema<ListServiceQuotaIncreaseRequestsInTemplateRequest>,
  output: __S(194, __c24, 2) as any as S.Schema<ListServiceQuotaIncreaseRequestsInTemplateResponse>,
  errors: [
    AccessDeniedException,
    AWSServiceAccessNotEnabledException,
    DependencyAccessDeniedException,
    IllegalArgumentException,
    NoAvailableOrganizationException,
    ServiceException,
    TemplatesNotAvailableInRegionException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceQuotaIncreaseRequestsInTemplate",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ServiceQuotaIncreaseRequestInTemplateList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListServiceQuotasError =
  | AccessDeniedException
  | IllegalArgumentException
  | InvalidPaginationTokenException
  | NoSuchResourceException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the applied quota values for the specified Amazon Web Services service. For some quotas, only
 * the default values are available. If the applied quota value is not available for a
 * quota, the quota is not retrieved. Filter responses to return applied quota values at
 * either the account level, resource level, or all levels.
 */
export const listServiceQuotas: API.PaginatedOperationMethod<
  ListServiceQuotasRequest,
  ListServiceQuotasResponse,
  ListServiceQuotasError,
  Credentials | HttpClient.HttpClient,
  ServiceQuota
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(200, __c25, 0) as any as S.Schema<ListServiceQuotasRequest>,
  output: __S(161, __c20, 1) as any as S.Schema<ListServiceQuotasResponse>,
  errors: [
    AccessDeniedException,
    IllegalArgumentException,
    InvalidPaginationTokenException,
    NoSuchResourceException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceQuotas",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Quotas",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListServicesError =
  | AccessDeniedException
  | IllegalArgumentException
  | InvalidPaginationTokenException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the names and codes for the Amazon Web Services services integrated with Service Quotas.
 */
export const listServices: API.PaginatedOperationMethod<
  ListServicesRequest,
  ListServicesResponse,
  ListServicesError,
  Credentials | HttpClient.HttpClient,
  ServiceInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(208, __c26, 0) as any as S.Schema<ListServicesRequest>,
  output: __S(211, __c26, 3) as any as S.Schema<ListServicesResponse>,
  errors: [
    AccessDeniedException,
    IllegalArgumentException,
    InvalidPaginationTokenException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServices",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Services",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | IllegalArgumentException
  | NoSuchResourceException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of the tags assigned to the specified applied quota.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(216, __c27, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(217, __c27, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    AccessDeniedException,
    IllegalArgumentException,
    NoSuchResourceException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PutServiceQuotaIncreaseRequestIntoTemplateError =
  | AccessDeniedException
  | AWSServiceAccessNotEnabledException
  | DependencyAccessDeniedException
  | IllegalArgumentException
  | NoAvailableOrganizationException
  | NoSuchResourceException
  | QuotaExceededException
  | ServiceException
  | TemplatesNotAvailableInRegionException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds a quota increase request to your quota request template.
 */
export const putServiceQuotaIncreaseRequestIntoTemplate: API.OperationMethod<
  PutServiceQuotaIncreaseRequestIntoTemplateRequest,
  PutServiceQuotaIncreaseRequestIntoTemplateResponse,
  PutServiceQuotaIncreaseRequestIntoTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(232, __c29, 0) as any as S.Schema<PutServiceQuotaIncreaseRequestIntoTemplateRequest>,
  output: __S(144, __c18, 0) as any as S.Schema<PutServiceQuotaIncreaseRequestIntoTemplateResponse>,
  errors: [
    AccessDeniedException,
    AWSServiceAccessNotEnabledException,
    DependencyAccessDeniedException,
    IllegalArgumentException,
    NoAvailableOrganizationException,
    NoSuchResourceException,
    QuotaExceededException,
    ServiceException,
    TemplatesNotAvailableInRegionException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutServiceQuotaIncreaseRequestIntoTemplate",
}));

export type RequestServiceQuotaIncreaseError =
  | AccessDeniedException
  | DependencyAccessDeniedException
  | IllegalArgumentException
  | InvalidResourceStateException
  | NoSuchResourceException
  | QuotaExceededException
  | ResourceAlreadyExistsException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Submits a quota increase request for the specified quota at the account or resource
 * level.
 */
export const requestServiceQuotaIncrease: API.OperationMethod<
  RequestServiceQuotaIncreaseRequest,
  RequestServiceQuotaIncreaseResponse,
  RequestServiceQuotaIncreaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c30, 0) as any as S.Schema<RequestServiceQuotaIncreaseRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<RequestServiceQuotaIncreaseResponse>,
  errors: [
    AccessDeniedException,
    DependencyAccessDeniedException,
    IllegalArgumentException,
    InvalidResourceStateException,
    NoSuchResourceException,
    QuotaExceededException,
    ResourceAlreadyExistsException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RequestServiceQuotaIncrease",
}));

export type StartAutoManagementError =
  | AccessDeniedException
  | IllegalArgumentException
  | NoSuchResourceException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Starts Service Quotas Automatic Management for an Amazon Web Services account, including notification preferences
 * and excluded quotas configurations. Automatic Management monitors your Service Quotas utilization and notifies you before you
 * run out of your allocated quotas.
 */
export const startAutoManagement: API.OperationMethod<
  StartAutoManagementRequest,
  StartAutoManagementResponse,
  StartAutoManagementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(248, __c31, 0) as any as S.Schema<StartAutoManagementRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<StartAutoManagementResponse>,
  errors: [
    AccessDeniedException,
    IllegalArgumentException,
    NoSuchResourceException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAutoManagement",
}));

export type StartQuotaUtilizationReportError =
  | AccessDeniedException
  | IllegalArgumentException
  | InvalidPaginationTokenException
  | NoSuchResourceException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Initiates the generation of a quota utilization report for your Amazon Web Services account. This
 * asynchronous operation analyzes your quota usage across all Amazon Web Services services and returns
 * a unique report identifier that you can use to retrieve the results.
 *
 * The report generation process may take several seconds to complete, depending on the
 * number of quotas in your account. Use the `GetQuotaUtilizationReport` operation
 * to check the status and retrieve the results when the report is ready.
 */
export const startQuotaUtilizationReport: API.OperationMethod<
  StartQuotaUtilizationReportRequest,
  StartQuotaUtilizationReportResponse,
  StartQuotaUtilizationReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c34, 0) as any as S.Schema<StartQuotaUtilizationReportRequest>,
  output: __S(273, __c34, 1) as any as S.Schema<StartQuotaUtilizationReportResponse>,
  errors: [
    AccessDeniedException,
    IllegalArgumentException,
    InvalidPaginationTokenException,
    NoSuchResourceException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartQuotaUtilizationReport",
}));

export type StopAutoManagementError =
  | AccessDeniedException
  | IllegalArgumentException
  | NoSuchResourceException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Stops Service Quotas Automatic Management for an Amazon Web Services account and removes all associated
 * configurations. Automatic Management monitors your Service Quotas utilization and notifies you before you
 * run out of your allocated quotas.
 */
export const stopAutoManagement: API.OperationMethod<
  StopAutoManagementRequest,
  StopAutoManagementResponse,
  StopAutoManagementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(280, __c35, 0) as any as S.Schema<StopAutoManagementRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<StopAutoManagementResponse>,
  errors: [
    AccessDeniedException,
    IllegalArgumentException,
    NoSuchResourceException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopAutoManagement",
}));

export type TagResourceError =
  | AccessDeniedException
  | IllegalArgumentException
  | NoSuchResourceException
  | ServiceException
  | TagPolicyViolationException
  | TooManyRequestsException
  | TooManyTagsException
  | CommonErrors;
/**
 * Adds tags to the specified applied quota. You can include one or more tags to add to
 * the quota.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c36, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    AccessDeniedException,
    IllegalArgumentException,
    NoSuchResourceException,
    ServiceException,
    TagPolicyViolationException,
    TooManyRequestsException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | IllegalArgumentException
  | NoSuchResourceException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes tags from the specified applied quota. You can specify one or more tags to
 * remove.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(296, __c37, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    AccessDeniedException,
    IllegalArgumentException,
    NoSuchResourceException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAutoManagementError =
  | AccessDeniedException
  | IllegalArgumentException
  | NoSuchResourceException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates your Service Quotas Automatic Management configuration, including notification preferences and
 * excluded quotas. Automatic Management monitors your Service Quotas utilization and notifies you before you
 * run out of your allocated quotas.
 */
export const updateAutoManagement: API.OperationMethod<
  UpdateAutoManagementRequest,
  UpdateAutoManagementResponse,
  UpdateAutoManagementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c38, 0) as any as S.Schema<UpdateAutoManagementRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<UpdateAutoManagementResponse>,
  errors: [
    AccessDeniedException,
    IllegalArgumentException,
    NoSuchResourceException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAutoManagement",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AssociateServiceQuotaTemplateRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "AssociateServiceQuotaTemplateResponse",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RequestId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateSupportCaseRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ServiceCode: S.String, QuotaCode: S.String, AwsRegion: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteServiceQuotaIncreaseRequestFromTemplateRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisassociateServiceQuotaTemplateRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAssociationForServiceQuotaTemplateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ServiceQuotaTemplateAssociationStatus: S.optional(S.String) }),
      ).annotate({ identifier: "GetAssociationForServiceQuotaTemplateResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAutoManagementConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ QuotaCode: S.optional(S.String), QuotaName: S.optional(S.String) }),
      ).annotate({ identifier: "QuotaInfo" });
    case 2:
      return S.Array(__S(49, __c6, 1));
    case 3:
      return S.Record(S.String, /*@__PURE__*/ __S(50, __c6, 2).pipe(S.optional));
    case 4:
      return S.suspend(() =>
        S.Struct({
          OptInLevel: S.optional(S.String),
          OptInType: S.optional(S.String),
          NotificationArn: S.optional(S.String),
          OptInStatus: S.optional(S.String),
          ExclusionList: S.optional(__S(51, __c6, 3)),
        }),
      ).annotate({ identifier: "GetAutoManagementConfigurationResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ServiceCode: S.String, QuotaCode: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAWSDefaultServiceQuotaRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ContextScope: S.optional(S.String),
          ContextScopeType: S.optional(S.String),
          ContextId: S.optional(S.String),
          AdjustableAtLevel: S.optional(S.String),
        }),
      ).annotate({ identifier: "QuotaContextInfo" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Quota: S.optional(__S(84, __c10, 4)) })).annotate({
        identifier: "GetAWSDefaultServiceQuotaResponse",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          MetricNamespace: S.optional(S.String),
          MetricName: S.optional(S.String),
          MetricDimensions: S.optional(__S(80, __c10, 0)),
          MetricStatisticRecommendation: S.optional(S.String),
        }),
      ).annotate({ identifier: "MetricInfo" });
    case 2:
      return S.suspend(() =>
        S.Struct({ PeriodValue: S.optional(S.Number), PeriodUnit: S.optional(S.String) }),
      ).annotate({ identifier: "QuotaPeriod" });
    case 3:
      return S.suspend(() =>
        S.Struct({ ErrorCode: S.optional(S.String), ErrorMessage: S.optional(S.String) }),
      ).annotate({ identifier: "ErrorReason" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          ServiceCode: S.optional(S.String),
          ServiceName: S.optional(S.String),
          QuotaArn: S.optional(S.String),
          QuotaCode: S.optional(S.String),
          QuotaName: S.optional(S.String),
          Value: S.optional(S.Number),
          Unit: S.optional(S.String),
          Adjustable: S.optional(S.Boolean),
          GlobalQuota: S.optional(S.Boolean),
          UsageMetric: S.optional(__S(81, __c10, 1)),
          Period: S.optional(__S(82, __c10, 2)),
          ErrorReason: S.optional(__S(83, __c10, 3)),
          QuotaAppliedAtLevel: S.optional(S.String),
          QuotaContext: S.optional(__S(64, __c8, 0)),
          Description: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServiceQuota" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReportId: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetQuotaUtilizationReportRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          QuotaCode: S.optional(S.String),
          ServiceCode: S.optional(S.String),
          QuotaName: S.optional(S.String),
          Namespace: S.optional(S.String),
          Utilization: S.optional(S.Number),
          DefaultValue: S.optional(S.Number),
          AppliedValue: S.optional(S.Number),
          ServiceName: S.optional(S.String),
          Adjustable: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "QuotaUtilizationInfo" });
    case 2:
      return S.Array(__S(89, __c11, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ReportId: S.optional(S.String),
          Status: S.optional(S.String),
          GeneratedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TotalCount: S.optional(S.Number),
          Quotas: S.optional(__S(90, __c11, 2)),
          NextToken: S.optional(S.String),
          ErrorCode: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetQuotaUtilizationReportResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RequestId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetRequestedServiceQuotaChangeRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          RequestType: S.optional(S.String),
          CaseId: S.optional(S.String),
          ServiceCode: S.optional(S.String),
          ServiceName: S.optional(S.String),
          QuotaCode: S.optional(S.String),
          QuotaName: S.optional(S.String),
          DesiredValue: S.optional(S.Number),
          Status: S.optional(S.String),
          Created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Requester: S.optional(S.String),
          QuotaArn: S.optional(S.String),
          GlobalQuota: S.optional(S.Boolean),
          Unit: S.optional(S.String),
          QuotaRequestedAtLevel: S.optional(S.String),
          QuotaContext: S.optional(__S(64, __c8, 0)),
        }),
      ).annotate({ identifier: "RequestedServiceQuotaChange" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ RequestedQuota: S.optional(__S(104, __c13, 0)) })).annotate(
        { identifier: "GetRequestedServiceQuotaChangeResponse" },
      );
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServiceCode: S.String,
          QuotaCode: S.String,
          ContextId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetServiceQuotaRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ServiceCode: S.String, QuotaCode: S.String, AwsRegion: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetServiceQuotaIncreaseRequestFromTemplateRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServiceCode: S.optional(S.String),
          ServiceName: S.optional(S.String),
          QuotaCode: S.optional(S.String),
          QuotaName: S.optional(S.String),
          DesiredValue: S.optional(S.Number),
          AwsRegion: S.optional(S.String),
          Unit: S.optional(S.String),
          GlobalQuota: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ServiceQuotaIncreaseRequestInTemplate" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ServiceQuotaIncreaseRequestInTemplate: S.optional(__S(136, __c17, 0)) }),
      ).annotate({ identifier: "GetServiceQuotaIncreaseRequestFromTemplateResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServiceCode: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAWSDefaultServiceQuotasRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(84, __c10, 4));
    case 1:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), Quotas: S.optional(__S(160, __c20, 0)) }),
      ).annotate({ identifier: "ListAWSDefaultServiceQuotasResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServiceCode: S.optional(S.String),
          Status: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          QuotaRequestedAtLevel: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListRequestedServiceQuotaChangeHistoryRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(104, __c13, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          RequestedQuotas: S.optional(__S(176, __c22, 0)),
        }),
      ).annotate({ identifier: "ListRequestedServiceQuotaChangeHistoryResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServiceCode: S.String,
          QuotaCode: S.String,
          Status: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          QuotaRequestedAtLevel: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListRequestedServiceQuotaChangeHistoryByQuotaRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServiceCode: S.optional(S.String),
          AwsRegion: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListServiceQuotaIncreaseRequestsInTemplateRequest" });
    case 1:
      return S.Array(__S(136, __c17, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ServiceQuotaIncreaseRequestInTemplateList: S.optional(__S(193, __c24, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListServiceQuotaIncreaseRequestsInTemplateResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServiceCode: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          QuotaCode: S.optional(S.String),
          QuotaAppliedAtLevel: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListServiceQuotasRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListServicesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ServiceCode: S.optional(S.String), ServiceName: S.optional(S.String) }),
      ).annotate({ identifier: "ServiceInfo" });
    case 2:
      return S.Array(__S(209, __c26, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), Services: S.optional(__S(210, __c26, 2)) }),
      ).annotate({ identifier: "ListServicesResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(225, __c28, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(224, __c28, 0));
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          QuotaCode: S.String,
          ServiceCode: S.String,
          AwsRegion: S.String,
          DesiredValue: S.Number,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutServiceQuotaIncreaseRequestIntoTemplateRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServiceCode: S.String,
          QuotaCode: S.String,
          DesiredValue: S.Number,
          ContextId: S.optional(S.String),
          SupportCaseAllowed: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RequestServiceQuotaIncreaseRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OptInLevel: S.String,
          OptInType: S.String,
          NotificationArn: S.optional(S.String),
          ExclusionList: S.optional(__S(264, __c33, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartAutoManagementRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ __S(256, __c32, 0).pipe(S.optional));
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartQuotaUtilizationReportRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ReportId: S.optional(S.String),
          Status: S.optional(S.String),
          Message: S.optional(S.String),
        }),
      ).annotate({ identifier: "StartQuotaUtilizationReportResponse" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopAutoManagementRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, Tags: __S(225, __c28, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, TagKeys: __S(256, __c32, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OptInType: S.optional(S.String),
          NotificationArn: S.optional(S.String),
          ExclusionList: S.optional(__S(264, __c33, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateAutoManagementRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
