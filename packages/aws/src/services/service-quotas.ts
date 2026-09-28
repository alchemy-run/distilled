import type * as HttpClient from "effect/unstable/http/HttpClient";
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
  sdkId: "Service Quotas",
  target: "ServiceQuotasV20190624",
  version: "2019-06-24",
  sigv4: "servicequotas",
  protocol: awsJson1_1Protocol,
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://servicequotas.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://servicequotas.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message?: string }> {}
export class AWSServiceAccessNotEnabledException
  extends /*@__PURE__*/ TE.TaggedError(
    "AWSServiceAccessNotEnabledException",
    ["AuthError"],
    { status: 403 },
  )<{ readonly message?: string }> {}
export class DependencyAccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError(
    "DependencyAccessDeniedException",
    ["AuthError"],
    { status: 403 },
  )<{ readonly message?: string }> {}
export class IllegalArgumentException
  extends /*@__PURE__*/ TE.TaggedError(
    "IllegalArgumentException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidPaginationTokenException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidPaginationTokenException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidResourceStateException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidResourceStateException",
    ["BadRequestError"],
    { status: 405 },
  )<{ readonly message?: string }> {}
export class NoAvailableOrganizationException
  extends /*@__PURE__*/ TE.TaggedError(
    "NoAvailableOrganizationException",
    ["AuthError"],
    { status: 403 },
  )<{ readonly message?: string }> {}
export class NoSuchResourceException
  extends /*@__PURE__*/ TE.TaggedError(
    "NoSuchResourceException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class OrganizationNotInAllFeaturesModeException
  extends /*@__PURE__*/ TE.TaggedError(
    "OrganizationNotInAllFeaturesModeException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class QuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "QuotaExceededException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceAlreadyExistsException",
    ["BadRequestError", "AlreadyExistsError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ServiceException
  extends /*@__PURE__*/ TE.TaggedError("ServiceException", ["ServerError"], {
    status: 500,
  })<{ readonly message?: string }> {}
export class ServiceQuotaTemplateNotInUseException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaTemplateNotInUseException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TagPolicyViolationException
  extends /*@__PURE__*/ TE.TaggedError(
    "TagPolicyViolationException",
    ["AuthError"],
    { status: 401 },
  )<{ readonly message?: string }> {}
export class TemplatesNotAvailableInRegionException
  extends /*@__PURE__*/ TE.TaggedError(
    "TemplatesNotAvailableInRegionException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRequestsException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTagsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
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
export type ServiceQuotaTemplateAssociationStatus =
  | "ASSOCIATED"
  | "DISASSOCIATED"
  | (string & {});
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
export type MetricDimensionsMapDefinition = {
  [key: string]: string | undefined;
};
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
export interface QuotaContextInfo {
  ContextScope?: QuotaContextScope;
  ContextScopeType?: string;
  ContextId?: string;
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
export type ReportStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
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
export type RequestedServiceQuotaChangeHistoryListDefinition =
  RequestedServiceQuotaChange[];
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
export type ServiceQuotaIncreaseRequestInTemplateList =
  ServiceQuotaIncreaseRequestInTemplate[];
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
  descriptor: { service: svc, input: {} },
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
})) as any;

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
  descriptor: { service: svc, input: { RequestId: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { ServiceCode: 0, QuotaCode: 0, AwsRegion: 0 },
  },
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
})) as any;

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
  descriptor: { service: svc, input: {} },
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
})) as any;

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
  descriptor: { service: svc, input: {} },
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
})) as any;

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
  descriptor: { service: svc, input: {} },
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
})) as any;

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
  descriptor: { service: svc, input: { ServiceCode: 0, QuotaCode: 0 } },
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
})) as any;

export type GetQuotaUtilizationReportError =
  | AccessDeniedException
  | IllegalArgumentException
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
  descriptor: {
    service: svc,
    input: { ReportId: 0, NextToken: 0, MaxResults: 0 },
    output: { GeneratedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    IllegalArgumentException,
    NoSuchResourceException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQuotaUtilizationReport",
})) as any;

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
  descriptor: {
    service: svc,
    input: { RequestId: 0 },
    output: { RequestedQuota: o_RequestedServiceQuotaChange },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { ServiceCode: 0, QuotaCode: 0, ContextId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { ServiceCode: 0, QuotaCode: 0, AwsRegion: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { ServiceCode: 0, NextToken: 0, MaxResults: 0 },
  },
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
  descriptor: {
    service: svc,
    input: {
      ServiceCode: 0,
      Status: 0,
      NextToken: 0,
      MaxResults: 0,
      QuotaRequestedAtLevel: 0,
    },
    output: { RequestedQuotas: D.list(o_RequestedServiceQuotaChange) },
  },
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
  descriptor: {
    service: svc,
    input: {
      ServiceCode: 0,
      QuotaCode: 0,
      Status: 0,
      NextToken: 0,
      MaxResults: 0,
      QuotaRequestedAtLevel: 0,
    },
    output: { RequestedQuotas: D.list(o_RequestedServiceQuotaChange) },
  },
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
  descriptor: {
    service: svc,
    input: { ServiceCode: 0, AwsRegion: 0, NextToken: 0, MaxResults: 0 },
  },
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
  descriptor: {
    service: svc,
    input: {
      ServiceCode: 0,
      NextToken: 0,
      MaxResults: 0,
      QuotaCode: 0,
      QuotaAppliedAtLevel: 0,
    },
  },
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
  descriptor: { service: svc, input: { NextToken: 0, MaxResults: 0 } },
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
  descriptor: { service: svc, input: { ResourceARN: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { QuotaCode: 0, ServiceCode: 0, AwsRegion: 0, DesiredValue: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ServiceCode: 0,
      QuotaCode: 0,
      DesiredValue: 0,
      ContextId: 0,
      SupportCaseAllowed: 0,
    },
    output: { RequestedQuota: o_RequestedServiceQuotaChange },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      OptInLevel: 0,
      OptInType: 0,
      NotificationArn: 0,
      ExclusionList: 0,
    },
  },
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
})) as any;

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
  descriptor: { service: svc, input: {} },
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
})) as any;

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
  descriptor: { service: svc, input: {} },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { ResourceARN: 0, Tags: D.list({ Key: 0, Value: 0 }) },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { ResourceARN: 0, TagKeys: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { OptInType: 0, NotificationArn: 0, ExclusionList: 0 },
  },
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
})) as any;

const o_RequestedServiceQuotaChange: D.LazyStruct = () => ({
  Created: D.ts,
  LastUpdated: D.ts,
});
