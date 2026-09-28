import type * as HttpClient from "effect/unstable/http/HttpClient";
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
  sdkId: "Marketplace Catalog",
  target: "AWSMPSeymour",
  version: "2018-09-17",
  sigv4: "aws-marketplace",
  protocol: restJson1Protocol,
  rules: (p, _) => {
    const { UseDualStack = false, UseFIPS = false, Endpoint, Region } = p;
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
          if (
            Region === "us-east-1" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e(
              `https://catalog-marketplace.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              return e(
                `https://catalog.marketplace-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true && UseDualStack === false) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://catalog.marketplace-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://catalog.marketplace.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://catalog.marketplace.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class InternalServiceException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServiceException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ResourceInUseException
  extends /*@__PURE__*/ TE.TaggedError("ResourceInUseException", [], {
    status: 423,
  })<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ResourceNotSupportedException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotSupportedException",
    ["BadRequestError"],
    { status: 415 },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 422 },
  )<{
    readonly message?: string;
    readonly ValidationExceptionFieldList?: ValidationExceptionField[];
  }> {}
export type Catalog = string;
export type EntityId = string;
export interface EntityRequest {
  Catalog: string;
  EntityId: string;
}
export type EntityRequestList = EntityRequest[];
export interface BatchDescribeEntitiesRequest {
  EntityRequestList: EntityRequest[];
}
export type EntityType = string;
export type ARN = string;
export type Identifier = string;
export type DateTimeISO8601 = string;
export type JsonDocumentType = unknown;
export interface EntityDetail {
  EntityType?: string;
  EntityArn?: string;
  EntityIdentifier?: string;
  LastModifiedDate?: string;
  DetailsDocument?: any;
}
export type EntityDetails = { [key: string]: EntityDetail | undefined };
export type BatchDescribeErrorCodeString = string;
export type BatchDescribeErrorMessageContent = string;
export interface BatchDescribeErrorDetail {
  ErrorCode?: string;
  ErrorMessage?: string;
}
export type Errors = { [key: string]: BatchDescribeErrorDetail | undefined };
export interface BatchDescribeEntitiesResponse {
  EntityDetails?: { [key: string]: EntityDetail | undefined };
  Errors?: { [key: string]: BatchDescribeErrorDetail | undefined };
}
export type ResourceId = string;
export interface CancelChangeSetRequest {
  Catalog: string;
  ChangeSetId: string;
}
export interface CancelChangeSetResponse {
  ChangeSetId?: string;
  ChangeSetArn?: string;
}
export type ResourceARN = string;
export interface DeleteResourcePolicyRequest {
  ResourceArn: string;
}
export interface DeleteResourcePolicyResponse {}
export type AssessmentIdentifier = string;
export type DescribeAssessmentMaxResultInteger = number;
export type NextToken = string;
export interface DescribeAssessmentRequest {
  Catalog: string;
  AssessmentIdentifier: string;
  MaxResults?: number;
  NextToken?: string;
}
export type VersionedFrameworkId = string;
export interface AssessmentTargetSummary {
  EntityId?: string;
  ChangeSetId?: string;
}
export interface AMISecuritySummary {
  DeliveryOptionId?: string;
}
export interface ContainerSecuritySummary {
  DeliveryOptionId?: string;
}
export type FrameworkSummary =
  | { AMISecuritySummary: AMISecuritySummary; ContainerSecuritySummary?: never }
  | {
      AMISecuritySummary?: never;
      ContainerSecuritySummary: ContainerSecuritySummary;
    };
export type AssessmentResult = "PASS" | "FAIL" | (string & {});
export type ControlAssessmentResult =
  | "PASS"
  | "FAIL"
  | "NOT_EXECUTED"
  | "EXEMPTION_PASS"
  | (string & {});
export type ErrorCode = string;
export type ErrorMessage = string;
export type ScopeName = string;
export type ScopeValue = string;
export interface ErrorScope {
  Name?: string;
  Value?: string;
}
export type ErrorScopeList = ErrorScope[];
export interface ControlError {
  Code?: string;
  Message?: string;
  Scope?: ErrorScope[];
}
export type ControlErrorList = ControlError[];
export interface ControlAssessment {
  ControlId?: string;
  ControlAssessmentResult?: ControlAssessmentResult;
  Errors?: ControlError[];
}
export type ControlAssessmentList = ControlAssessment[];
export interface DescribeAssessmentResponse {
  AssessmentArn?: string;
  AssessmentId?: string;
  FrameworkId?: string;
  AssessmentTargetSummary?: AssessmentTargetSummary;
  FrameworkSummary?: FrameworkSummary;
  AssessmentResult?: AssessmentResult;
  CreatedAt?: string;
  ExpiresAt?: string;
  ControlAssessments?: ControlAssessment[];
  NextToken?: string;
}
export interface DescribeChangeSetRequest {
  Catalog: string;
  ChangeSetId: string;
}
export type ChangeSetName = string;
export type Intent = "VALIDATE" | "APPLY" | (string & {});
export type ChangeStatus =
  | "PREPARING"
  | "APPLYING"
  | "SUCCEEDED"
  | "CANCELLED"
  | "FAILED"
  | (string & {});
export type FailureCode = "CLIENT_ERROR" | "SERVER_FAULT" | (string & {});
export type ExceptionMessageContent = string;
export type ChangeType = string;
export interface Entity {
  Type: string;
  Identifier?: string;
}
export type Json = string;
export type ErrorCodeString = string;
export interface ErrorDetail {
  ErrorCode?: string;
  ErrorMessage?: string;
}
export type ErrorDetailList = ErrorDetail[];
export type ChangeName = string;
export interface ChangeSummary {
  ChangeType?: string;
  Entity?: Entity;
  Details?: string;
  DetailsDocument?: any;
  ErrorDetailList?: ErrorDetail[];
  ChangeName?: string;
}
export type ChangeSetDescription = ChangeSummary[];
export interface DescribeChangeSetResponse {
  ChangeSetId?: string;
  ChangeSetArn?: string;
  ChangeSetName?: string;
  Intent?: Intent;
  StartTime?: string;
  EndTime?: string;
  Status?: ChangeStatus;
  FailureCode?: FailureCode;
  FailureDescription?: string;
  ChangeSet?: ChangeSummary[];
}
export interface DescribeEntityRequest {
  Catalog: string;
  EntityId: string;
}
export interface DescribeEntityResponse {
  EntityType?: string;
  EntityIdentifier?: string;
  EntityArn?: string;
  LastModifiedDate?: string;
  Details?: string;
  DetailsDocument?: any;
}
export interface GetResourcePolicyRequest {
  ResourceArn: string;
}
export type ResourcePolicyJson = string;
export interface GetResourcePolicyResponse {
  Policy?: string;
}
export type FrameworkId = string;
export interface AssessmentTargetFilter {
  EntityId?: string;
  ChangeSetId?: string;
}
export interface AMISecurityFilters {
  DeliveryOptionId?: string;
}
export interface ContainerSecurityFilters {
  DeliveryOptionId?: string;
}
export type FrameworkFilters =
  | { AMISecurityFilters: AMISecurityFilters; ContainerSecurityFilters?: never }
  | {
      AMISecurityFilters?: never;
      ContainerSecurityFilters: ContainerSecurityFilters;
    };
export type ListAssessmentsMaxResultInteger = number;
export interface ListAssessmentsRequest {
  Catalog: string;
  FrameworkId?: string;
  AssessmentTargetFilter?: AssessmentTargetFilter;
  FrameworkFilters?: FrameworkFilters;
  MaxResults?: number;
  NextToken?: string;
}
export interface AssessmentSummary {
  AssessmentArn?: string;
  AssessmentId?: string;
  FrameworkId?: string;
  AssessmentTargetSummary?: AssessmentTargetSummary;
  FrameworkSummary?: FrameworkSummary;
  AssessmentResult?: AssessmentResult;
  CreatedAt?: string;
  ExpiresAt?: string;
}
export type AssessmentSummaryList = AssessmentSummary[];
export interface ListAssessmentsResponse {
  AssessmentSummaryList?: AssessmentSummary[];
  NextToken?: string;
}
export type FilterName = string;
export type FilterValueContent = string;
export type ValueList = string[];
export interface Filter {
  Name?: string;
  ValueList?: string[];
}
export type FilterList = Filter[];
export type SortBy = string;
export type SortOrder = "ASCENDING" | "DESCENDING" | (string & {});
export interface Sort {
  SortBy?: string;
  SortOrder?: SortOrder;
}
export type ListChangeSetsMaxResultInteger = number;
export interface ListChangeSetsRequest {
  Catalog: string;
  FilterList?: Filter[];
  Sort?: Sort;
  MaxResults?: number;
  NextToken?: string;
}
export type ResourceIdList = string[];
export interface ChangeSetSummaryListItem {
  ChangeSetId?: string;
  ChangeSetArn?: string;
  ChangeSetName?: string;
  StartTime?: string;
  EndTime?: string;
  Status?: ChangeStatus;
  EntityIdList?: string[];
  FailureCode?: FailureCode;
}
export type ChangeSetSummaryList = ChangeSetSummaryListItem[];
export interface ListChangeSetsResponse {
  ChangeSetSummaryList?: ChangeSetSummaryListItem[];
  NextToken?: string;
}
export type ListEntitiesMaxResultInteger = number;
export type OwnershipType = "SELF" | "SHARED" | (string & {});
export type DataProductEntityIdString = string;
export type DataProductEntityIdFilterValueList = string[];
export interface DataProductEntityIdFilter {
  ValueList?: string[];
}
export type DataProductTitleString = string;
export type DataProductTitleFilterValueList = string[];
export interface DataProductTitleFilter {
  ValueList?: string[];
  WildCardValue?: string;
}
export type DataProductVisibilityString =
  | "Limited"
  | "Public"
  | "Restricted"
  | "Unavailable"
  | "Draft"
  | (string & {});
export type DataProductVisibilityFilterValueList =
  DataProductVisibilityString[];
export interface DataProductVisibilityFilter {
  ValueList?: DataProductVisibilityString[];
}
export interface DataProductLastModifiedDateFilterDateRange {
  AfterValue?: string;
  BeforeValue?: string;
}
export interface DataProductLastModifiedDateFilter {
  DateRange?: DataProductLastModifiedDateFilterDateRange;
}
export interface DataProductFilters {
  EntityId?: DataProductEntityIdFilter;
  ProductTitle?: DataProductTitleFilter;
  Visibility?: DataProductVisibilityFilter;
  LastModifiedDate?: DataProductLastModifiedDateFilter;
}
export type SaaSProductEntityIdString = string;
export type SaaSProductEntityIdFilterValueList = string[];
export interface SaaSProductEntityIdFilter {
  ValueList?: string[];
}
export type SaaSProductTitleString = string;
export type SaaSProductTitleFilterValueList = string[];
export interface SaaSProductTitleFilter {
  ValueList?: string[];
  WildCardValue?: string;
}
export type SaaSProductVisibilityString =
  | "Limited"
  | "Public"
  | "Restricted"
  | "Draft"
  | (string & {});
export type SaaSProductVisibilityFilterValueList =
  SaaSProductVisibilityString[];
export interface SaaSProductVisibilityFilter {
  ValueList?: SaaSProductVisibilityString[];
}
export interface SaaSProductLastModifiedDateFilterDateRange {
  AfterValue?: string;
  BeforeValue?: string;
}
export interface SaaSProductLastModifiedDateFilter {
  DateRange?: SaaSProductLastModifiedDateFilterDateRange;
}
export interface SaaSProductFilters {
  EntityId?: SaaSProductEntityIdFilter;
  ProductTitle?: SaaSProductTitleFilter;
  Visibility?: SaaSProductVisibilityFilter;
  LastModifiedDate?: SaaSProductLastModifiedDateFilter;
}
export type AmiProductEntityIdString = string;
export type AmiProductEntityIdFilterValueList = string[];
export interface AmiProductEntityIdFilter {
  ValueList?: string[];
}
export interface AmiProductLastModifiedDateFilterDateRange {
  AfterValue?: string;
  BeforeValue?: string;
}
export interface AmiProductLastModifiedDateFilter {
  DateRange?: AmiProductLastModifiedDateFilterDateRange;
}
export type AmiProductTitleString = string;
export type AmiProductTitleFilterValueList = string[];
export interface AmiProductTitleFilter {
  ValueList?: string[];
  WildCardValue?: string;
}
export type AmiProductVisibilityString =
  | "Limited"
  | "Public"
  | "Restricted"
  | "Draft"
  | (string & {});
export type AmiProductVisibilityFilterValueList = AmiProductVisibilityString[];
export interface AmiProductVisibilityFilter {
  ValueList?: AmiProductVisibilityString[];
}
export interface AmiProductFilters {
  EntityId?: AmiProductEntityIdFilter;
  LastModifiedDate?: AmiProductLastModifiedDateFilter;
  ProductTitle?: AmiProductTitleFilter;
  Visibility?: AmiProductVisibilityFilter;
}
export type OfferEntityIdString = string;
export type OfferEntityIdFilterValueList = string[];
export interface OfferEntityIdFilter {
  ValueList?: string[];
}
export type OfferNameString = string;
export type OfferNameFilterValueList = string[];
export interface OfferNameFilter {
  ValueList?: string[];
  WildCardValue?: string;
}
export type OfferProductIdString = string;
export type OfferProductIdFilterValueList = string[];
export interface OfferProductIdFilter {
  ValueList?: string[];
}
export type OfferResaleAuthorizationIdString = string;
export type OfferResaleAuthorizationIdFilterValueList = string[];
export interface OfferResaleAuthorizationIdFilter {
  ValueList?: string[];
}
export interface OfferReleaseDateFilterDateRange {
  AfterValue?: string;
  BeforeValue?: string;
}
export interface OfferReleaseDateFilter {
  DateRange?: OfferReleaseDateFilterDateRange;
}
export interface OfferAvailabilityEndDateFilterDateRange {
  AfterValue?: string;
  BeforeValue?: string;
}
export interface OfferAvailabilityEndDateFilter {
  DateRange?: OfferAvailabilityEndDateFilterDateRange;
}
export type OfferBuyerAccountsFilterWildcard = string;
export interface OfferBuyerAccountsFilter {
  WildCardValue?: string;
}
export type OfferStateString = "Draft" | "Released" | (string & {});
export type OfferStateFilterValueList = OfferStateString[];
export interface OfferStateFilter {
  ValueList?: OfferStateString[];
}
export type OfferTargetingString =
  | "BuyerAccounts"
  | "ParticipatingPrograms"
  | "CountryCodes"
  | "None"
  | (string & {});
export type OfferTargetingFilterValueList = OfferTargetingString[];
export interface OfferTargetingFilter {
  ValueList?: OfferTargetingString[];
}
export interface OfferLastModifiedDateFilterDateRange {
  AfterValue?: string;
  BeforeValue?: string;
}
export interface OfferLastModifiedDateFilter {
  DateRange?: OfferLastModifiedDateFilterDateRange;
}
export type OfferSetIdString = string;
export type OfferSetIdFilterValueList = string[];
export interface OfferSetIdFilter {
  ValueList?: string[];
}
export type OfferTargetAgreementIdString = string;
export type OfferTargetAgreementIdFilterValueList = string[];
export interface OfferTargetAgreementIdFilter {
  ValueList?: string[];
}
export type OfferTargetAgreementIntentString = "Renew" | (string & {});
export type OfferTargetAgreementIntentFilterValueList =
  OfferTargetAgreementIntentString[];
export interface OfferTargetAgreementIntentFilter {
  ValueList?: OfferTargetAgreementIntentString[];
}
export type OfferCreatedBySourceString =
  | "Seller"
  | "AwsMarketplace"
  | (string & {});
export type OfferCreatedBySourceFilterValueList = OfferCreatedBySourceString[];
export interface OfferCreatedBySourceFilter {
  ValueList?: OfferCreatedBySourceString[];
}
export interface OfferFilters {
  EntityId?: OfferEntityIdFilter;
  Name?: OfferNameFilter;
  ProductId?: OfferProductIdFilter;
  ResaleAuthorizationId?: OfferResaleAuthorizationIdFilter;
  ReleaseDate?: OfferReleaseDateFilter;
  AvailabilityEndDate?: OfferAvailabilityEndDateFilter;
  BuyerAccounts?: OfferBuyerAccountsFilter;
  State?: OfferStateFilter;
  Targeting?: OfferTargetingFilter;
  LastModifiedDate?: OfferLastModifiedDateFilter;
  OfferSetId?: OfferSetIdFilter;
  TargetAgreementId?: OfferTargetAgreementIdFilter;
  TargetAgreementIntent?: OfferTargetAgreementIntentFilter;
  CreatedBySource?: OfferCreatedBySourceFilter;
}
export type ContainerProductEntityIdString = string;
export type ContainerProductEntityIdFilterValueList = string[];
export interface ContainerProductEntityIdFilter {
  ValueList?: string[];
}
export interface ContainerProductLastModifiedDateFilterDateRange {
  AfterValue?: string;
  BeforeValue?: string;
}
export interface ContainerProductLastModifiedDateFilter {
  DateRange?: ContainerProductLastModifiedDateFilterDateRange;
}
export type ContainerProductTitleString = string;
export type ContainerProductTitleFilterValueList = string[];
export interface ContainerProductTitleFilter {
  ValueList?: string[];
  WildCardValue?: string;
}
export type ContainerProductVisibilityString =
  | "Limited"
  | "Public"
  | "Restricted"
  | "Draft"
  | (string & {});
export type ContainerProductVisibilityFilterValueList =
  ContainerProductVisibilityString[];
export interface ContainerProductVisibilityFilter {
  ValueList?: ContainerProductVisibilityString[];
}
export interface ContainerProductFilters {
  EntityId?: ContainerProductEntityIdFilter;
  LastModifiedDate?: ContainerProductLastModifiedDateFilter;
  ProductTitle?: ContainerProductTitleFilter;
  Visibility?: ContainerProductVisibilityFilter;
}
export type ResaleAuthorizationEntityIdString = string;
export type ResaleAuthorizationEntityIdFilterValueList = string[];
export interface ResaleAuthorizationEntityIdFilter {
  ValueList?: string[];
}
export type ResaleAuthorizationNameString = string;
export type ResaleAuthorizationNameFilterValueList = string[];
export type ResaleAuthorizationNameFilterWildcard = string;
export interface ResaleAuthorizationNameFilter {
  ValueList?: string[];
  WildCardValue?: string;
}
export type ResaleAuthorizationProductIdString = string;
export type ResaleAuthorizationProductIdFilterValueList = string[];
export type ResaleAuthorizationProductIdFilterWildcard = string;
export interface ResaleAuthorizationProductIdFilter {
  ValueList?: string[];
  WildCardValue?: string;
}
export interface ResaleAuthorizationCreatedDateFilterDateRange {
  AfterValue?: string;
  BeforeValue?: string;
}
export type ResaleAuthorizationCreatedDateFilterValueList = string[];
export interface ResaleAuthorizationCreatedDateFilter {
  DateRange?: ResaleAuthorizationCreatedDateFilterDateRange;
  ValueList?: string[];
}
export interface ResaleAuthorizationAvailabilityEndDateFilterDateRange {
  AfterValue?: string;
  BeforeValue?: string;
}
export type ResaleAuthorizationAvailabilityEndDateFilterValueList = string[];
export interface ResaleAuthorizationAvailabilityEndDateFilter {
  DateRange?: ResaleAuthorizationAvailabilityEndDateFilterDateRange;
  ValueList?: string[];
}
export type ResaleAuthorizationManufacturerAccountIdString = string;
export type ResaleAuthorizationManufacturerAccountIdFilterValueList = string[];
export type ResaleAuthorizationManufacturerAccountIdFilterWildcard = string;
export interface ResaleAuthorizationManufacturerAccountIdFilter {
  ValueList?: string[];
  WildCardValue?: string;
}
export type ResaleAuthorizationProductNameString = string;
export type ResaleAuthorizationProductNameFilterValueList = string[];
export type ResaleAuthorizationProductNameFilterWildcard = string;
export interface ResaleAuthorizationProductNameFilter {
  ValueList?: string[];
  WildCardValue?: string;
}
export type ResaleAuthorizationManufacturerLegalNameString = string;
export type ResaleAuthorizationManufacturerLegalNameFilterValueList = string[];
export type ResaleAuthorizationManufacturerLegalNameFilterWildcard = string;
export interface ResaleAuthorizationManufacturerLegalNameFilter {
  ValueList?: string[];
  WildCardValue?: string;
}
export type ResaleAuthorizationResellerAccountIDString = string;
export type ResaleAuthorizationResellerAccountIDFilterValueList = string[];
export type ResaleAuthorizationResellerAccountIDFilterWildcard = string;
export interface ResaleAuthorizationResellerAccountIDFilter {
  ValueList?: string[];
  WildCardValue?: string;
}
export type ResaleAuthorizationResellerLegalNameString = string;
export type ResaleAuthorizationResellerLegalNameFilterValueList = string[];
export type ResaleAuthorizationResellerLegalNameFilterWildcard = string;
export interface ResaleAuthorizationResellerLegalNameFilter {
  ValueList?: string[];
  WildCardValue?: string;
}
export type ResaleAuthorizationStatusString =
  | "Draft"
  | "Active"
  | "Restricted"
  | (string & {});
export type ResaleAuthorizationStatusFilterValueList =
  ResaleAuthorizationStatusString[];
export interface ResaleAuthorizationStatusFilter {
  ValueList?: ResaleAuthorizationStatusString[];
}
export type ResaleAuthorizationOfferExtendedStatusString = string;
export type ResaleAuthorizationOfferExtendedStatusFilterValueList = string[];
export interface ResaleAuthorizationOfferExtendedStatusFilter {
  ValueList?: string[];
}
export interface ResaleAuthorizationLastModifiedDateFilterDateRange {
  AfterValue?: string;
  BeforeValue?: string;
}
export interface ResaleAuthorizationLastModifiedDateFilter {
  DateRange?: ResaleAuthorizationLastModifiedDateFilterDateRange;
}
export type ResaleAuthorizationResellerRoleString =
  | "ChannelPartner"
  | "Distributor"
  | (string & {});
export type ResaleAuthorizationResellerRoleFilterValueList =
  ResaleAuthorizationResellerRoleString[];
export interface ResaleAuthorizationResellerRoleFilter {
  ValueList?: ResaleAuthorizationResellerRoleString[];
}
export interface ResaleAuthorizationFilters {
  EntityId?: ResaleAuthorizationEntityIdFilter;
  Name?: ResaleAuthorizationNameFilter;
  ProductId?: ResaleAuthorizationProductIdFilter;
  CreatedDate?: ResaleAuthorizationCreatedDateFilter;
  AvailabilityEndDate?: ResaleAuthorizationAvailabilityEndDateFilter;
  ManufacturerAccountId?: ResaleAuthorizationManufacturerAccountIdFilter;
  ProductName?: ResaleAuthorizationProductNameFilter;
  ManufacturerLegalName?: ResaleAuthorizationManufacturerLegalNameFilter;
  ResellerAccountID?: ResaleAuthorizationResellerAccountIDFilter;
  ResellerLegalName?: ResaleAuthorizationResellerLegalNameFilter;
  Status?: ResaleAuthorizationStatusFilter;
  OfferExtendedStatus?: ResaleAuthorizationOfferExtendedStatusFilter;
  LastModifiedDate?: ResaleAuthorizationLastModifiedDateFilter;
  ResellerRole?: ResaleAuthorizationResellerRoleFilter;
}
export type MachineLearningProductEntityIdString = string;
export type MachineLearningProductEntityIdFilterValueList = string[];
export interface MachineLearningProductEntityIdFilter {
  ValueList?: string[];
}
export interface MachineLearningProductLastModifiedDateFilterDateRange {
  AfterValue?: string;
  BeforeValue?: string;
}
export interface MachineLearningProductLastModifiedDateFilter {
  DateRange?: MachineLearningProductLastModifiedDateFilterDateRange;
}
export type MachineLearningProductTitleString = string;
export type MachineLearningProductTitleFilterValueList = string[];
export interface MachineLearningProductTitleFilter {
  ValueList?: string[];
  WildCardValue?: string;
}
export type MachineLearningProductVisibilityString =
  | "Limited"
  | "Public"
  | "Restricted"
  | "Draft"
  | (string & {});
export type MachineLearningProductVisibilityFilterValueList =
  MachineLearningProductVisibilityString[];
export interface MachineLearningProductVisibilityFilter {
  ValueList?: MachineLearningProductVisibilityString[];
}
export interface MachineLearningProductFilters {
  EntityId?: MachineLearningProductEntityIdFilter;
  LastModifiedDate?: MachineLearningProductLastModifiedDateFilter;
  ProductTitle?: MachineLearningProductTitleFilter;
  Visibility?: MachineLearningProductVisibilityFilter;
}
export type OfferSetEntityIdString = string;
export type OfferSetEntityIdFilterValueList = string[];
export interface OfferSetEntityIdFilter {
  ValueList?: string[];
}
export type OfferSetNameString = string;
export type OfferSetNameFilterValueList = string[];
export interface OfferSetNameFilter {
  ValueList?: string[];
}
export type OfferSetStateString = "Draft" | "Released" | (string & {});
export type OfferSetStateFilterValueList = OfferSetStateString[];
export interface OfferSetStateFilter {
  ValueList?: OfferSetStateString[];
}
export interface OfferSetReleaseDateFilterDateRange {
  AfterValue?: string;
  BeforeValue?: string;
}
export interface OfferSetReleaseDateFilter {
  DateRange?: OfferSetReleaseDateFilterDateRange;
}
export type OfferSetAssociatedOfferIdsString = string;
export type OfferSetAssociatedOfferIdsFilterValueList = string[];
export interface OfferSetAssociatedOfferIdsFilter {
  ValueList?: string[];
}
export type OfferSetSolutionIdString = string;
export type OfferSetSolutionIdFilterValueList = string[];
export interface OfferSetSolutionIdFilter {
  ValueList?: string[];
}
export interface OfferSetLastModifiedDateFilterDateRange {
  AfterValue?: string;
  BeforeValue?: string;
}
export interface OfferSetLastModifiedDateFilter {
  DateRange?: OfferSetLastModifiedDateFilterDateRange;
}
export interface OfferSetFilters {
  EntityId?: OfferSetEntityIdFilter;
  Name?: OfferSetNameFilter;
  State?: OfferSetStateFilter;
  ReleaseDate?: OfferSetReleaseDateFilter;
  AssociatedOfferIds?: OfferSetAssociatedOfferIdsFilter;
  SolutionId?: OfferSetSolutionIdFilter;
  LastModifiedDate?: OfferSetLastModifiedDateFilter;
}
export type EntityTypeFilters =
  | {
      DataProductFilters: DataProductFilters;
      SaaSProductFilters?: never;
      AmiProductFilters?: never;
      OfferFilters?: never;
      ContainerProductFilters?: never;
      ResaleAuthorizationFilters?: never;
      MachineLearningProductFilters?: never;
      OfferSetFilters?: never;
    }
  | {
      DataProductFilters?: never;
      SaaSProductFilters: SaaSProductFilters;
      AmiProductFilters?: never;
      OfferFilters?: never;
      ContainerProductFilters?: never;
      ResaleAuthorizationFilters?: never;
      MachineLearningProductFilters?: never;
      OfferSetFilters?: never;
    }
  | {
      DataProductFilters?: never;
      SaaSProductFilters?: never;
      AmiProductFilters: AmiProductFilters;
      OfferFilters?: never;
      ContainerProductFilters?: never;
      ResaleAuthorizationFilters?: never;
      MachineLearningProductFilters?: never;
      OfferSetFilters?: never;
    }
  | {
      DataProductFilters?: never;
      SaaSProductFilters?: never;
      AmiProductFilters?: never;
      OfferFilters: OfferFilters;
      ContainerProductFilters?: never;
      ResaleAuthorizationFilters?: never;
      MachineLearningProductFilters?: never;
      OfferSetFilters?: never;
    }
  | {
      DataProductFilters?: never;
      SaaSProductFilters?: never;
      AmiProductFilters?: never;
      OfferFilters?: never;
      ContainerProductFilters: ContainerProductFilters;
      ResaleAuthorizationFilters?: never;
      MachineLearningProductFilters?: never;
      OfferSetFilters?: never;
    }
  | {
      DataProductFilters?: never;
      SaaSProductFilters?: never;
      AmiProductFilters?: never;
      OfferFilters?: never;
      ContainerProductFilters?: never;
      ResaleAuthorizationFilters: ResaleAuthorizationFilters;
      MachineLearningProductFilters?: never;
      OfferSetFilters?: never;
    }
  | {
      DataProductFilters?: never;
      SaaSProductFilters?: never;
      AmiProductFilters?: never;
      OfferFilters?: never;
      ContainerProductFilters?: never;
      ResaleAuthorizationFilters?: never;
      MachineLearningProductFilters: MachineLearningProductFilters;
      OfferSetFilters?: never;
    }
  | {
      DataProductFilters?: never;
      SaaSProductFilters?: never;
      AmiProductFilters?: never;
      OfferFilters?: never;
      ContainerProductFilters?: never;
      ResaleAuthorizationFilters?: never;
      MachineLearningProductFilters?: never;
      OfferSetFilters: OfferSetFilters;
    };
export type DataProductSortBy =
  | "EntityId"
  | "ProductTitle"
  | "Visibility"
  | "LastModifiedDate"
  | (string & {});
export interface DataProductSort {
  SortBy?: DataProductSortBy;
  SortOrder?: SortOrder;
}
export type SaaSProductSortBy =
  | "EntityId"
  | "ProductTitle"
  | "Visibility"
  | "LastModifiedDate"
  | "DeliveryOptionTypes"
  | (string & {});
export interface SaaSProductSort {
  SortBy?: SaaSProductSortBy;
  SortOrder?: SortOrder;
}
export type AmiProductSortBy =
  | "EntityId"
  | "LastModifiedDate"
  | "ProductTitle"
  | "Visibility"
  | (string & {});
export interface AmiProductSort {
  SortBy?: AmiProductSortBy;
  SortOrder?: SortOrder;
}
export type OfferSortBy =
  | "EntityId"
  | "Name"
  | "ProductId"
  | "ResaleAuthorizationId"
  | "ReleaseDate"
  | "AvailabilityEndDate"
  | "BuyerAccounts"
  | "State"
  | "Targeting"
  | "LastModifiedDate"
  | "OfferSetId"
  | "TargetAgreementId"
  | "TargetAgreementIntent"
  | "CreatedBySource"
  | (string & {});
export interface OfferSort {
  SortBy?: OfferSortBy;
  SortOrder?: SortOrder;
}
export type ContainerProductSortBy =
  | "EntityId"
  | "LastModifiedDate"
  | "ProductTitle"
  | "Visibility"
  | "CompatibleAWSServices"
  | (string & {});
export interface ContainerProductSort {
  SortBy?: ContainerProductSortBy;
  SortOrder?: SortOrder;
}
export type ResaleAuthorizationSortBy =
  | "EntityId"
  | "Name"
  | "ProductId"
  | "ProductName"
  | "ManufacturerAccountId"
  | "ManufacturerLegalName"
  | "ResellerAccountID"
  | "ResellerLegalName"
  | "Status"
  | "OfferExtendedStatus"
  | "CreatedDate"
  | "AvailabilityEndDate"
  | "LastModifiedDate"
  | (string & {});
export interface ResaleAuthorizationSort {
  SortBy?: ResaleAuthorizationSortBy;
  SortOrder?: SortOrder;
}
export type MachineLearningProductSortBy =
  | "EntityId"
  | "LastModifiedDate"
  | "ProductTitle"
  | "Visibility"
  | (string & {});
export interface MachineLearningProductSort {
  SortBy?: MachineLearningProductSortBy;
  SortOrder?: SortOrder;
}
export type OfferSetSortBy =
  | "Name"
  | "State"
  | "ReleaseDate"
  | "SolutionId"
  | "EntityId"
  | "LastModifiedDate"
  | (string & {});
export interface OfferSetSort {
  SortBy?: OfferSetSortBy;
  SortOrder?: SortOrder;
}
export type EntityTypeSort =
  | {
      DataProductSort: DataProductSort;
      SaaSProductSort?: never;
      AmiProductSort?: never;
      OfferSort?: never;
      ContainerProductSort?: never;
      ResaleAuthorizationSort?: never;
      MachineLearningProductSort?: never;
      OfferSetSort?: never;
    }
  | {
      DataProductSort?: never;
      SaaSProductSort: SaaSProductSort;
      AmiProductSort?: never;
      OfferSort?: never;
      ContainerProductSort?: never;
      ResaleAuthorizationSort?: never;
      MachineLearningProductSort?: never;
      OfferSetSort?: never;
    }
  | {
      DataProductSort?: never;
      SaaSProductSort?: never;
      AmiProductSort: AmiProductSort;
      OfferSort?: never;
      ContainerProductSort?: never;
      ResaleAuthorizationSort?: never;
      MachineLearningProductSort?: never;
      OfferSetSort?: never;
    }
  | {
      DataProductSort?: never;
      SaaSProductSort?: never;
      AmiProductSort?: never;
      OfferSort: OfferSort;
      ContainerProductSort?: never;
      ResaleAuthorizationSort?: never;
      MachineLearningProductSort?: never;
      OfferSetSort?: never;
    }
  | {
      DataProductSort?: never;
      SaaSProductSort?: never;
      AmiProductSort?: never;
      OfferSort?: never;
      ContainerProductSort: ContainerProductSort;
      ResaleAuthorizationSort?: never;
      MachineLearningProductSort?: never;
      OfferSetSort?: never;
    }
  | {
      DataProductSort?: never;
      SaaSProductSort?: never;
      AmiProductSort?: never;
      OfferSort?: never;
      ContainerProductSort?: never;
      ResaleAuthorizationSort: ResaleAuthorizationSort;
      MachineLearningProductSort?: never;
      OfferSetSort?: never;
    }
  | {
      DataProductSort?: never;
      SaaSProductSort?: never;
      AmiProductSort?: never;
      OfferSort?: never;
      ContainerProductSort?: never;
      ResaleAuthorizationSort?: never;
      MachineLearningProductSort: MachineLearningProductSort;
      OfferSetSort?: never;
    }
  | {
      DataProductSort?: never;
      SaaSProductSort?: never;
      AmiProductSort?: never;
      OfferSort?: never;
      ContainerProductSort?: never;
      ResaleAuthorizationSort?: never;
      MachineLearningProductSort?: never;
      OfferSetSort: OfferSetSort;
    };
export interface ListEntitiesRequest {
  Catalog: string;
  EntityType: string;
  FilterList?: Filter[];
  Sort?: Sort;
  NextToken?: string;
  MaxResults?: number;
  OwnershipType?: OwnershipType;
  EntityTypeFilters?: EntityTypeFilters;
  EntityTypeSort?: EntityTypeSort;
}
export type EntityNameString = string;
export type VisibilityValue = string;
export interface AmiProductSummary {
  ProductTitle?: string;
  Visibility?: AmiProductVisibilityString;
}
export interface ContainerProductSummary {
  ProductTitle?: string;
  Visibility?: ContainerProductVisibilityString;
}
export interface DataProductSummary {
  ProductTitle?: string;
  Visibility?: DataProductVisibilityString;
}
export interface SaaSProductSummary {
  ProductTitle?: string;
  Visibility?: SaaSProductVisibilityString;
}
export type OfferBuyerAccountsString = string;
export type OfferBuyerAccountsList = string[];
export type OfferTargetingList = OfferTargetingString[];
export interface OfferSummary {
  Name?: string;
  ProductId?: string;
  ResaleAuthorizationId?: string;
  ReleaseDate?: string;
  AvailabilityEndDate?: string;
  BuyerAccounts?: string[];
  State?: OfferStateString;
  Targeting?: OfferTargetingString[];
  OfferSetId?: string;
  TargetAgreementId?: string;
  TargetAgreementIntent?: OfferTargetAgreementIntentString;
  CreatedBySource?: OfferCreatedBySourceString;
}
export interface ResaleAuthorizationSummary {
  Name?: string;
  ProductId?: string;
  ProductName?: string;
  ManufacturerAccountId?: string;
  ManufacturerLegalName?: string;
  ResellerAccountID?: string;
  ResellerLegalName?: string;
  Status?: ResaleAuthorizationStatusString;
  OfferExtendedStatus?: string;
  CreatedDate?: string;
  AvailabilityEndDate?: string;
  ResellerRole?: ResaleAuthorizationResellerRoleString;
}
export interface MachineLearningProductSummary {
  ProductTitle?: string;
  Visibility?: MachineLearningProductVisibilityString;
}
export type OfferSetAssociatedOfferIdsList = string[];
export interface OfferSetSummary {
  Name?: string;
  State?: OfferSetStateString;
  ReleaseDate?: string;
  AssociatedOfferIds?: string[];
  SolutionId?: string;
}
export interface EntitySummary {
  Name?: string;
  EntityType?: string;
  EntityId?: string;
  EntityArn?: string;
  LastModifiedDate?: string;
  Visibility?: string;
  AmiProductSummary?: AmiProductSummary;
  ContainerProductSummary?: ContainerProductSummary;
  DataProductSummary?: DataProductSummary;
  SaaSProductSummary?: SaaSProductSummary;
  OfferSummary?: OfferSummary;
  ResaleAuthorizationSummary?: ResaleAuthorizationSummary;
  MachineLearningProductSummary?: MachineLearningProductSummary;
  OfferSetSummary?: OfferSetSummary;
}
export type EntitySummaryList = EntitySummary[];
export interface ListEntitiesResponse {
  EntitySummaryList?: EntitySummary[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface ListTagsForResourceResponse {
  ResourceArn?: string;
  Tags?: Tag[];
}
export interface PutResourcePolicyRequest {
  ResourceArn: string;
  Policy: string;
}
export interface PutResourcePolicyResponse {}
export interface Change {
  ChangeType: string;
  Entity: Entity;
  EntityTags?: Tag[];
  Details?: string;
  DetailsDocument?: any;
  ChangeName?: string;
}
export type RequestedChangeList = Change[];
export type ClientRequestToken = string;
export interface StartChangeSetRequest {
  Catalog: string;
  ChangeSet: Change[];
  ChangeSetName?: string;
  ClientRequestToken?: string;
  ChangeSetTags?: Tag[];
  Intent?: Intent;
}
export interface StartChangeSetResponse {
  ChangeSetId?: string;
  ChangeSetArn?: string;
}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export type ValidationExceptionReason =
  | "UnknownOperation"
  | "CannotParse"
  | "FieldValidationFailed"
  | "Other"
  | (string & {});
export type FieldName = string;
export interface ValidationExceptionField {
  Reason?: ValidationExceptionReason;
  EntityType?: string;
  EntityId?: string;
  ChangeType?: string;
  Field?: string;
  Message?: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type BatchDescribeEntitiesError =
  | AccessDeniedException
  | InternalServiceException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns metadata and content for multiple entities. This is the Batch version of the `DescribeEntity` API and uses the same IAM permission action as `DescribeEntity` API.
 */
export const batchDescribeEntities: API.OperationMethod<
  BatchDescribeEntitiesRequest,
  BatchDescribeEntitiesResponse,
  BatchDescribeEntitiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /BatchDescribeEntities",
    input: { EntityRequestList: D.list({ Catalog: 0, EntityId: 0 }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDescribeEntities",
})) as any;

export type CancelChangeSetError =
  | AccessDeniedException
  | InternalServiceException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Used to cancel an open change request. Must be sent before the status of the request
 * changes to `APPLYING`, the final stage of completing your change request. You
 * can describe a change during the 60-day request history retention period for API
 * calls.
 */
export const cancelChangeSet: API.OperationMethod<
  CancelChangeSetRequest,
  CancelChangeSetResponse,
  CancelChangeSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /CancelChangeSet",
    input: {
      Catalog: D.m({ query: "catalog" }),
      ChangeSetId: D.m({ query: "changeSetId" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelChangeSet",
})) as any;

export type DeleteResourcePolicyError =
  | AccessDeniedException
  | InternalServiceException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a resource-based policy on an entity that is identified by its resource
 * ARN.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /DeleteResourcePolicy",
    input: { ResourceArn: D.m({ query: "resourceArn" }) },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
})) as any;

export type DescribeAssessmentError =
  | AccessDeniedException
  | InternalServiceException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the metadata and detailed results of a single assessment, including the
 * framework that was evaluated, the overall assessment result, and a paginated list of
 * individual control evaluation results.
 *
 * To list available assessments before describing one, use the
 * `ListAssessments` action.
 */
export const describeAssessment: API.PaginatedOperationMethod<
  DescribeAssessmentRequest,
  DescribeAssessmentResponse,
  DescribeAssessmentError,
  Credentials | HttpClient.HttpClient,
  ControlAssessment
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /DescribeAssessment",
    input: { Catalog: 0, AssessmentIdentifier: 0, MaxResults: 0, NextToken: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAssessment",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ControlAssessments",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeChangeSetError =
  | AccessDeniedException
  | InternalServiceException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides information about a given change set.
 */
export const describeChangeSet: API.OperationMethod<
  DescribeChangeSetRequest,
  DescribeChangeSetResponse,
  DescribeChangeSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /DescribeChangeSet",
    input: {
      Catalog: D.m({ query: "catalog" }),
      ChangeSetId: D.m({ query: "changeSetId" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeChangeSet",
})) as any;

export type DescribeEntityError =
  | AccessDeniedException
  | InternalServiceException
  | ResourceNotFoundException
  | ResourceNotSupportedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the metadata and content of the entity.
 */
export const describeEntity: API.OperationMethod<
  DescribeEntityRequest,
  DescribeEntityResponse,
  DescribeEntityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /DescribeEntity",
    input: {
      Catalog: D.m({ query: "catalog" }),
      EntityId: D.m({ query: "entityId" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ResourceNotFoundException,
    ResourceNotSupportedException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEntity",
})) as any;

export type GetResourcePolicyError =
  | AccessDeniedException
  | InternalServiceException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a resource-based policy of an entity that is identified by its resource
 * ARN.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyRequest,
  GetResourcePolicyResponse,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /GetResourcePolicy",
    input: { ResourceArn: D.m({ query: "resourceArn" }) },
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
})) as any;

export type ListAssessmentsError =
  | AccessDeniedException
  | InternalServiceException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a paginated list of assessments associated with an entity or change set in
 * AWS Marketplace. An *assessment* is the result of evaluating a
 * product or change set against a framework, such as AMI Security or Container
 * Security.
 *
 * Use the `AssessmentTargetFilter` to scope results to a specific entity or
 * change set, and use `FrameworkFilters` to scope results to a single
 * framework. To retrieve detailed control-level results for an individual assessment, use
 * the `DescribeAssessment` action.
 *
 * Results are sorted by assessment creation time in descending order.
 */
export const listAssessments: API.PaginatedOperationMethod<
  ListAssessmentsRequest,
  ListAssessmentsResponse,
  ListAssessmentsError,
  Credentials | HttpClient.HttpClient,
  AssessmentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListAssessments",
    input: {
      Catalog: 0,
      FrameworkId: 0,
      AssessmentTargetFilter: { EntityId: 0, ChangeSetId: 0 },
      FrameworkFilters: {
        AMISecurityFilters: { DeliveryOptionId: 0 },
        ContainerSecurityFilters: { DeliveryOptionId: 0 },
      },
      MaxResults: 0,
      NextToken: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssessments",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AssessmentSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListChangeSetsError =
  | AccessDeniedException
  | InternalServiceException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the list of change sets owned by the account being used to make the call. You
 * can filter this list by providing any combination of `entityId`,
 * `ChangeSetName`, and status. If you provide more than one filter, the API
 * operation applies a logical AND between the filters.
 *
 * You can describe a change during the 60-day request history retention period for API
 * calls.
 */
export const listChangeSets: API.PaginatedOperationMethod<
  ListChangeSetsRequest,
  ListChangeSetsResponse,
  ListChangeSetsError,
  Credentials | HttpClient.HttpClient,
  ChangeSetSummaryListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListChangeSets",
    input: {
      Catalog: 0,
      FilterList: D.list(i_Filter),
      Sort: i_Sort,
      MaxResults: 0,
      NextToken: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListChangeSets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ChangeSetSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEntitiesError =
  | AccessDeniedException
  | InternalServiceException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides the list of entities of a given type.
 */
export const listEntities: API.PaginatedOperationMethod<
  ListEntitiesRequest,
  ListEntitiesResponse,
  ListEntitiesError,
  Credentials | HttpClient.HttpClient,
  EntitySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListEntities",
    input: {
      Catalog: 0,
      EntityType: 0,
      FilterList: D.list(i_Filter),
      Sort: i_Sort,
      NextToken: 0,
      MaxResults: 0,
      OwnershipType: 0,
      EntityTypeFilters: {
        DataProductFilters: {
          EntityId: { ValueList: 0 },
          ProductTitle: { ValueList: 0, WildCardValue: 0 },
          Visibility: { ValueList: 0 },
          LastModifiedDate: { DateRange: { AfterValue: 0, BeforeValue: 0 } },
        },
        SaaSProductFilters: {
          EntityId: { ValueList: 0 },
          ProductTitle: { ValueList: 0, WildCardValue: 0 },
          Visibility: { ValueList: 0 },
          LastModifiedDate: { DateRange: { AfterValue: 0, BeforeValue: 0 } },
        },
        AmiProductFilters: {
          EntityId: { ValueList: 0 },
          LastModifiedDate: { DateRange: { AfterValue: 0, BeforeValue: 0 } },
          ProductTitle: { ValueList: 0, WildCardValue: 0 },
          Visibility: { ValueList: 0 },
        },
        OfferFilters: {
          EntityId: { ValueList: 0 },
          Name: { ValueList: 0, WildCardValue: 0 },
          ProductId: { ValueList: 0 },
          ResaleAuthorizationId: { ValueList: 0 },
          ReleaseDate: { DateRange: { AfterValue: 0, BeforeValue: 0 } },
          AvailabilityEndDate: { DateRange: { AfterValue: 0, BeforeValue: 0 } },
          BuyerAccounts: { WildCardValue: 0 },
          State: { ValueList: 0 },
          Targeting: { ValueList: 0 },
          LastModifiedDate: { DateRange: { AfterValue: 0, BeforeValue: 0 } },
          OfferSetId: { ValueList: 0 },
          TargetAgreementId: { ValueList: 0 },
          TargetAgreementIntent: { ValueList: 0 },
          CreatedBySource: { ValueList: 0 },
        },
        ContainerProductFilters: {
          EntityId: { ValueList: 0 },
          LastModifiedDate: { DateRange: { AfterValue: 0, BeforeValue: 0 } },
          ProductTitle: { ValueList: 0, WildCardValue: 0 },
          Visibility: { ValueList: 0 },
        },
        ResaleAuthorizationFilters: {
          EntityId: { ValueList: 0 },
          Name: { ValueList: 0, WildCardValue: 0 },
          ProductId: { ValueList: 0, WildCardValue: 0 },
          CreatedDate: {
            DateRange: { AfterValue: 0, BeforeValue: 0 },
            ValueList: 0,
          },
          AvailabilityEndDate: {
            DateRange: { AfterValue: 0, BeforeValue: 0 },
            ValueList: 0,
          },
          ManufacturerAccountId: { ValueList: 0, WildCardValue: 0 },
          ProductName: { ValueList: 0, WildCardValue: 0 },
          ManufacturerLegalName: { ValueList: 0, WildCardValue: 0 },
          ResellerAccountID: { ValueList: 0, WildCardValue: 0 },
          ResellerLegalName: { ValueList: 0, WildCardValue: 0 },
          Status: { ValueList: 0 },
          OfferExtendedStatus: { ValueList: 0 },
          LastModifiedDate: { DateRange: { AfterValue: 0, BeforeValue: 0 } },
          ResellerRole: { ValueList: 0 },
        },
        MachineLearningProductFilters: {
          EntityId: { ValueList: 0 },
          LastModifiedDate: { DateRange: { AfterValue: 0, BeforeValue: 0 } },
          ProductTitle: { ValueList: 0, WildCardValue: 0 },
          Visibility: { ValueList: 0 },
        },
        OfferSetFilters: {
          EntityId: { ValueList: 0 },
          Name: { ValueList: 0 },
          State: { ValueList: 0 },
          ReleaseDate: { DateRange: { AfterValue: 0, BeforeValue: 0 } },
          AssociatedOfferIds: { ValueList: 0 },
          SolutionId: { ValueList: 0 },
          LastModifiedDate: { DateRange: { AfterValue: 0, BeforeValue: 0 } },
        },
      },
      EntityTypeSort: {
        DataProductSort: { SortBy: 0, SortOrder: 0 },
        SaaSProductSort: { SortBy: 0, SortOrder: 0 },
        AmiProductSort: { SortBy: 0, SortOrder: 0 },
        OfferSort: { SortBy: 0, SortOrder: 0 },
        ContainerProductSort: { SortBy: 0, SortOrder: 0 },
        ResaleAuthorizationSort: { SortBy: 0, SortOrder: 0 },
        MachineLearningProductSort: { SortBy: 0, SortOrder: 0 },
        OfferSetSort: { SortBy: 0, SortOrder: 0 },
      },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEntities",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EntitySummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServiceException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all tags that have been added to a resource (either an entity or change set).
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListTagsForResource",
    input: { ResourceArn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type PutResourcePolicyError =
  | AccessDeniedException
  | InternalServiceException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Attaches a resource-based policy to an entity. Examples of an entity include:
 * `AmiProduct` and `ContainerProduct`.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /PutResourcePolicy",
    input: { ResourceArn: 0, Policy: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
})) as any;

export type StartChangeSetError =
  | AccessDeniedException
  | InternalServiceException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows you to request changes for your entities. Within a single
 * `ChangeSet`, you can't start the same change type against the same entity
 * multiple times. Additionally, when a `ChangeSet` is running, all the entities
 * targeted by the different changes are locked until the change set has completed (either
 * succeeded, cancelled, or failed). If you try to start a change set containing a change
 * against an entity that is already locked, you will receive a
 * `ResourceInUseException` error.
 *
 * For example, you can't start the `ChangeSet` described in the example later in this topic because it contains two changes to run the same
 * change type (`AddRevisions`) against the same entity
 * (`entity-id@1`).
 *
 * For more information about working with change sets, see Working with change sets. For information about change types for
 * single-AMI products, see Working with single-AMI products. Also, for more information about change
 * types available for container-based products, see Working with container products.
 *
 * To download "DetailsDocument" shapes, see Python
 * and Java shapes on GitHub.
 */
export const startChangeSet: API.OperationMethod<
  StartChangeSetRequest,
  StartChangeSetResponse,
  StartChangeSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /StartChangeSet",
    input: {
      Catalog: 0,
      ChangeSet: D.list({
        ChangeType: 0,
        Entity: { Type: 0, Identifier: 0 },
        EntityTags: D.list(i_Tag),
        Details: 0,
        DetailsDocument: 0,
        ChangeName: 0,
      }),
      ChangeSetName: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      ChangeSetTags: D.list(i_Tag),
      Intent: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartChangeSet",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalServiceException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Tags a resource (either an entity or change set).
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /TagResource",
    input: { ResourceArn: 0, Tags: D.list(i_Tag) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | InternalServiceException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a tag or list of tags from a resource (either an entity or change set).
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UntagResource",
    input: { ResourceArn: 0, TagKeys: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServiceException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

const i_Filter: D.LazyStruct = () => ({ Name: 0, ValueList: 0 });
const i_Sort: D.LazyStruct = () => ({ SortBy: 0, SortOrder: 0 });
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
