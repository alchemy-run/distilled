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
  sdkId: "billingconductor",
  target: "AWSBillingConductor",
  version: "2021-07-30",
  sigv4: "billingconductor",
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
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              "https://billingconductor.us-east-1.amazonaws.com",
              {
                authSchemes: [
                  {
                    name: "sigv4",
                    signingName: "billingconductor",
                    signingRegion: "us-east-1",
                  },
                ],
              },
              {},
            );
          }
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              return e(
                `https://billingconductor-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://billingconductor-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://billingconductor.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://billingconductor.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{
    readonly message: string;
    readonly ResourceId: string;
    readonly ResourceType: string;
    readonly Reason?: ConflictExceptionReason;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500, headers: { RetryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly RetryAfterSeconds?: number }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message: string;
    readonly ResourceId: string;
    readonly ResourceType: string;
  }> {}
export class ServiceLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceLimitExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message: string;
    readonly ResourceId?: string;
    readonly ResourceType?: string;
    readonly LimitCode: string;
    readonly ServiceCode: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429, headers: { RetryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly RetryAfterSeconds?: number }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly Reason?: ValidationExceptionReason;
    readonly Fields?: ValidationExceptionField[];
  }> {}
export type BillingGroupArn = string;
export type AccountId = string;
export type AccountIdList = string[];
export interface AssociateAccountsInput {
  Arn: string;
  AccountIds: string[];
}
export interface AssociateAccountsOutput {
  Arn?: string;
}
export type PricingPlanArn = string;
export type PricingRuleArn = string;
export type PricingRuleArnsNonEmptyInput = string[];
export interface AssociatePricingRulesInput {
  Arn: string;
  PricingRuleArns: string[];
}
export interface AssociatePricingRulesOutput {
  Arn?: string;
}
export type CustomLineItemArn = string;
export type CustomLineItemAssociationElement = string;
export type CustomLineItemBatchAssociationsList = string[];
export type BillingPeriod = string;
export interface CustomLineItemBillingPeriodRange {
  InclusiveStartBillingPeriod: string;
  ExclusiveEndBillingPeriod?: string;
}
export interface BatchAssociateResourcesToCustomLineItemInput {
  TargetArn: string;
  ResourceArns: string[];
  BillingPeriodRange?: CustomLineItemBillingPeriodRange;
}
export type AssociateResourceErrorReason =
  | "INVALID_ARN"
  | "SERVICE_LIMIT_EXCEEDED"
  | "ILLEGAL_CUSTOMLINEITEM"
  | "INTERNAL_SERVER_EXCEPTION"
  | "INVALID_BILLING_PERIOD_RANGE"
  | (string & {});
export interface AssociateResourceError {
  Message?: string;
  Reason?: AssociateResourceErrorReason;
}
export interface AssociateResourceResponseElement {
  Arn?: string;
  Error?: AssociateResourceError;
}
export type AssociateResourcesResponseList = AssociateResourceResponseElement[];
export interface BatchAssociateResourcesToCustomLineItemOutput {
  SuccessfullyAssociatedResources?: AssociateResourceResponseElement[];
  FailedAssociatedResources?: AssociateResourceResponseElement[];
}
export type CustomLineItemBatchDisassociationsList = string[];
export interface BatchDisassociateResourcesFromCustomLineItemInput {
  TargetArn: string;
  ResourceArns: string[];
  BillingPeriodRange?: CustomLineItemBillingPeriodRange;
}
export interface DisassociateResourceResponseElement {
  Arn?: string;
  Error?: AssociateResourceError;
}
export type DisassociateResourcesResponseList =
  DisassociateResourceResponseElement[];
export interface BatchDisassociateResourcesFromCustomLineItemOutput {
  SuccessfullyDisassociatedResources?: DisassociateResourceResponseElement[];
  FailedDisassociatedResources?: DisassociateResourceResponseElement[];
}
export type ClientToken = string;
export type BillingGroupName = string | redacted.Redacted<string>;
export type ResponsibilityTransferArn = string;
export interface AccountGrouping {
  LinkedAccountIds?: string[];
  AutoAssociate?: boolean;
  ResponsibilityTransferArn?: string;
}
export type PricingPlanFullArn = string;
export interface ComputationPreference {
  PricingPlanArn: string;
}
export type BillingGroupDescription = string | redacted.Redacted<string>;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreateBillingGroupInput {
  ClientToken?: string;
  Name: string | redacted.Redacted<string>;
  AccountGrouping: AccountGrouping;
  ComputationPreference: ComputationPreference;
  PrimaryAccountId?: string;
  Description?: string | redacted.Redacted<string>;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateBillingGroupOutput {
  Arn?: string;
}
export type CustomLineItemName = string | redacted.Redacted<string>;
export type CustomLineItemDescription = string | redacted.Redacted<string>;
export type CustomLineItemChargeValue = number;
export interface CustomLineItemFlatChargeDetails {
  ChargeValue: number;
}
export type CustomLineItemPercentageChargeValue = number;
export type CustomLineItemAssociationsList = string[];
export interface CustomLineItemPercentageChargeDetails {
  PercentageValue: number;
  AssociatedValues?: string[];
}
export type CustomLineItemType = "CREDIT" | "FEE" | (string & {});
export type LineItemFilterAttributeName =
  | "LINE_ITEM_TYPE"
  | "SERVICE"
  | (string & {});
export type MatchOption = "NOT_EQUAL" | "EQUAL" | (string & {});
export type LineItemFilterValue = "SAVINGS_PLAN_NEGATION" | (string & {});
export type LineItemFilterValuesList = LineItemFilterValue[];
export type AttributeValue = string;
export type AttributeValueList = string[];
export interface LineItemFilter {
  Attribute: LineItemFilterAttributeName;
  MatchOption: MatchOption;
  Values?: LineItemFilterValue[];
  AttributeValues?: string[];
}
export type LineItemFiltersList = LineItemFilter[];
export interface CustomLineItemChargeDetails {
  Flat?: CustomLineItemFlatChargeDetails;
  Percentage?: CustomLineItemPercentageChargeDetails;
  Type: CustomLineItemType;
  LineItemFilters?: LineItemFilter[];
}
export type ComputationRuleEnum = "ITEMIZED" | "CONSOLIDATED" | (string & {});
export type Service = string;
export interface PresentationObject {
  Service: string;
}
export interface CreateCustomLineItemInput {
  ClientToken?: string;
  Name: string | redacted.Redacted<string>;
  Description: string | redacted.Redacted<string>;
  BillingGroupArn: string;
  BillingPeriodRange?: CustomLineItemBillingPeriodRange;
  Tags?: { [key: string]: string | undefined };
  ChargeDetails: CustomLineItemChargeDetails;
  AccountId?: string;
  ComputationRule?: ComputationRuleEnum;
  PresentationDetails?: PresentationObject;
}
export interface CreateCustomLineItemOutput {
  Arn?: string;
}
export type PricingPlanName = string | redacted.Redacted<string>;
export type PricingPlanDescription = string | redacted.Redacted<string>;
export type PricingRuleArnsInput = string[];
export interface CreatePricingPlanInput {
  ClientToken?: string;
  Name: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  PricingRuleArns?: string[];
  Tags?: { [key: string]: string | undefined };
}
export interface CreatePricingPlanOutput {
  Arn?: string;
}
export type PricingRuleName = string | redacted.Redacted<string>;
export type PricingRuleDescription = string | redacted.Redacted<string>;
export type PricingRuleScope =
  | "GLOBAL"
  | "SERVICE"
  | "BILLING_ENTITY"
  | "SKU"
  | (string & {});
export type PricingRuleType = "MARKUP" | "DISCOUNT" | "TIERING" | (string & {});
export type ModifierPercentage = number;
export type BillingEntity = string;
export type TieringActivated = boolean;
export interface CreateFreeTierConfig {
  Activated: boolean;
}
export interface CreateTieringInput {
  FreeTier: CreateFreeTierConfig;
}
export type UsageType = string;
export type Operation = string;
export interface CreatePricingRuleInput {
  ClientToken?: string;
  Name: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  Scope: PricingRuleScope;
  Type: PricingRuleType;
  ModifierPercentage?: number;
  Service?: string;
  Tags?: { [key: string]: string | undefined };
  BillingEntity?: string;
  Tiering?: CreateTieringInput;
  UsageType?: string;
  Operation?: string;
}
export interface CreatePricingRuleOutput {
  Arn?: string;
}
export interface DeleteBillingGroupInput {
  Arn: string;
}
export interface DeleteBillingGroupOutput {
  Arn?: string;
}
export interface DeleteCustomLineItemInput {
  Arn: string;
  BillingPeriodRange?: CustomLineItemBillingPeriodRange;
}
export interface DeleteCustomLineItemOutput {
  Arn?: string;
}
export interface DeletePricingPlanInput {
  Arn: string;
}
export interface DeletePricingPlanOutput {
  Arn?: string;
}
export interface DeletePricingRuleInput {
  Arn: string;
}
export interface DeletePricingRuleOutput {
  Arn?: string;
}
export interface DisassociateAccountsInput {
  Arn: string;
  AccountIds: string[];
}
export interface DisassociateAccountsOutput {
  Arn?: string;
}
export interface DisassociatePricingRulesInput {
  Arn: string;
  PricingRuleArns: string[];
}
export interface DisassociatePricingRulesOutput {
  Arn?: string;
}
export interface BillingPeriodRange {
  InclusiveStartBillingPeriod: string;
  ExclusiveEndBillingPeriod: string;
}
export type GroupByAttributeName =
  | "PRODUCT_NAME"
  | "BILLING_PERIOD"
  | (string & {});
export type GroupByAttributesList = GroupByAttributeName[];
export type MaxBillingGroupCostReportResults = number;
export type Token = string;
export interface GetBillingGroupCostReportInput {
  Arn: string;
  BillingPeriodRange?: BillingPeriodRange;
  GroupBy?: GroupByAttributeName[];
  MaxResults?: number;
  NextToken?: string;
}
export type AWSCost = string;
export type ProformaCost = string;
export type Margin = string;
export type MarginPercentage = string;
export type Currency = string;
export interface Attribute {
  Key?: string;
  Value?: string;
}
export type AttributesList = Attribute[];
export interface BillingGroupCostReportResultElement {
  Arn?: string;
  AWSCost?: string;
  ProformaCost?: string;
  Margin?: string;
  MarginPercentage?: string;
  Currency?: string;
  Attributes?: Attribute[];
}
export type BillingGroupCostReportResultsList =
  BillingGroupCostReportResultElement[];
export interface GetBillingGroupCostReportOutput {
  BillingGroupCostReportResults?: BillingGroupCostReportResultElement[];
  NextToken?: string;
}
export type Association = string;
export type AccountIdFilterList = string[];
export interface ListAccountAssociationsFilter {
  Association?: string;
  AccountId?: string;
  AccountIds?: string[];
}
export interface ListAccountAssociationsInput {
  BillingPeriod?: string;
  Filters?: ListAccountAssociationsFilter;
  NextToken?: string;
}
export type AccountName = string | redacted.Redacted<string>;
export type AccountEmail = string | redacted.Redacted<string>;
export interface AccountAssociationsListElement {
  AccountId?: string;
  BillingGroupArn?: string;
  AccountName?: string | redacted.Redacted<string>;
  AccountEmail?: string | redacted.Redacted<string>;
}
export type AccountAssociationsList = AccountAssociationsListElement[];
export interface ListAccountAssociationsOutput {
  LinkedAccounts?: AccountAssociationsListElement[];
  NextToken?: string;
}
export type MaxBillingGroupResults = number;
export type BillingGroupArnList = string[];
export interface ListBillingGroupCostReportsFilter {
  BillingGroupArns?: string[];
}
export interface ListBillingGroupCostReportsInput {
  BillingPeriod?: string;
  MaxResults?: number;
  NextToken?: string;
  Filters?: ListBillingGroupCostReportsFilter;
}
export interface BillingGroupCostReportElement {
  Arn?: string;
  AWSCost?: string;
  ProformaCost?: string;
  Margin?: string;
  MarginPercentage?: string;
  Currency?: string;
}
export type BillingGroupCostReportList = BillingGroupCostReportElement[];
export interface ListBillingGroupCostReportsOutput {
  BillingGroupCostReports?: BillingGroupCostReportElement[];
  NextToken?: string;
}
export type BillingGroupStatus =
  | "ACTIVE"
  | "PRIMARY_ACCOUNT_MISSING"
  | "PENDING"
  | (string & {});
export type BillingGroupStatusList = BillingGroupStatus[];
export type PrimaryAccountIdList = string[];
export type BillingGroupType = "STANDARD" | "TRANSFER_BILLING" | (string & {});
export type BillingGroupTypeList = BillingGroupType[];
export type SearchOption = "STARTS_WITH" | (string & {});
export type SearchValue = string;
export interface StringSearch {
  SearchOption: SearchOption;
  SearchValue: string;
}
export type StringSearches = StringSearch[];
export type ResponsibilityTransferArnsList = string[];
export interface ListBillingGroupsFilter {
  Arns?: string[];
  PricingPlan?: string;
  Statuses?: BillingGroupStatus[];
  AutoAssociate?: boolean;
  PrimaryAccountIds?: string[];
  BillingGroupTypes?: BillingGroupType[];
  Names?: StringSearch[];
  ResponsibilityTransferArns?: string[];
}
export interface ListBillingGroupsInput {
  BillingPeriod?: string;
  MaxResults?: number;
  NextToken?: string;
  Filters?: ListBillingGroupsFilter;
}
export type NumberOfAccounts = number;
export type Instant = number;
export type BillingGroupStatusReason = string;
export interface ListBillingGroupAccountGrouping {
  AutoAssociate?: boolean;
  ResponsibilityTransferArn?: string;
}
export interface BillingGroupListElement {
  Name?: string | redacted.Redacted<string>;
  Arn?: string;
  Description?: string | redacted.Redacted<string>;
  PrimaryAccountId?: string;
  ComputationPreference?: ComputationPreference;
  Size?: number;
  CreationTime?: number;
  LastModifiedTime?: number;
  Status?: BillingGroupStatus;
  StatusReason?: string;
  AccountGrouping?: ListBillingGroupAccountGrouping;
  BillingGroupType?: BillingGroupType;
}
export type BillingGroupList = BillingGroupListElement[];
export interface ListBillingGroupsOutput {
  BillingGroups?: BillingGroupListElement[];
  NextToken?: string;
}
export type MaxCustomLineItemResults = number;
export type CustomLineItemNameList = (string | redacted.Redacted<string>)[];
export type CustomLineItemArns = string[];
export interface ListCustomLineItemsFilter {
  Names?: (string | redacted.Redacted<string>)[];
  BillingGroups?: string[];
  Arns?: string[];
  AccountIds?: string[];
}
export interface ListCustomLineItemsInput {
  BillingPeriod?: string;
  MaxResults?: number;
  NextToken?: string;
  Filters?: ListCustomLineItemsFilter;
}
export interface ListCustomLineItemFlatChargeDetails {
  ChargeValue: number;
}
export interface ListCustomLineItemPercentageChargeDetails {
  PercentageValue: number;
}
export interface ListCustomLineItemChargeDetails {
  Flat?: ListCustomLineItemFlatChargeDetails;
  Percentage?: ListCustomLineItemPercentageChargeDetails;
  Type: CustomLineItemType;
  LineItemFilters?: LineItemFilter[];
}
export type CurrencyCode = "USD" | "CNY" | (string & {});
export type CustomLineItemProductCode = string;
export type NumberOfAssociations = number;
export interface CustomLineItemListElement {
  Arn?: string;
  Name?: string | redacted.Redacted<string>;
  ChargeDetails?: ListCustomLineItemChargeDetails;
  CurrencyCode?: CurrencyCode;
  Description?: string | redacted.Redacted<string>;
  ProductCode?: string;
  BillingGroupArn?: string;
  CreationTime?: number;
  LastModifiedTime?: number;
  AssociationSize?: number;
  AccountId?: string;
  ComputationRule?: ComputationRuleEnum;
  PresentationDetails?: PresentationObject;
}
export type CustomLineItemList = CustomLineItemListElement[];
export interface ListCustomLineItemsOutput {
  CustomLineItems?: CustomLineItemListElement[];
  NextToken?: string;
}
export interface ListCustomLineItemVersionsBillingPeriodRangeFilter {
  StartBillingPeriod?: string;
  EndBillingPeriod?: string;
}
export interface ListCustomLineItemVersionsFilter {
  BillingPeriodRange?: ListCustomLineItemVersionsBillingPeriodRangeFilter;
}
export interface ListCustomLineItemVersionsInput {
  Arn: string;
  MaxResults?: number;
  NextToken?: string;
  Filters?: ListCustomLineItemVersionsFilter;
}
export interface CustomLineItemVersionListElement {
  Name?: string | redacted.Redacted<string>;
  ChargeDetails?: ListCustomLineItemChargeDetails;
  CurrencyCode?: CurrencyCode;
  Description?: string | redacted.Redacted<string>;
  ProductCode?: string;
  BillingGroupArn?: string;
  CreationTime?: number;
  LastModifiedTime?: number;
  AssociationSize?: number;
  StartBillingPeriod?: string;
  EndBillingPeriod?: string;
  Arn?: string;
  StartTime?: number;
  AccountId?: string;
  ComputationRule?: ComputationRuleEnum;
  PresentationDetails?: PresentationObject;
}
export type CustomLineItemVersionList = CustomLineItemVersionListElement[];
export interface ListCustomLineItemVersionsOutput {
  CustomLineItemVersions?: CustomLineItemVersionListElement[];
  NextToken?: string;
}
export type PricingPlanArns = string[];
export interface ListPricingPlansFilter {
  Arns?: string[];
}
export type MaxPricingPlanResults = number;
export interface ListPricingPlansInput {
  BillingPeriod?: string;
  Filters?: ListPricingPlansFilter;
  MaxResults?: number;
  NextToken?: string;
}
export type NumberOfAssociatedPricingRules = number;
export interface PricingPlanListElement {
  Name?: string | redacted.Redacted<string>;
  Arn?: string;
  Description?: string | redacted.Redacted<string>;
  Size?: number;
  CreationTime?: number;
  LastModifiedTime?: number;
}
export type PricingPlanList = PricingPlanListElement[];
export interface ListPricingPlansOutput {
  BillingPeriod?: string;
  PricingPlans?: PricingPlanListElement[];
  NextToken?: string;
}
export type MaxPricingRuleResults = number;
export interface ListPricingPlansAssociatedWithPricingRuleInput {
  BillingPeriod?: string;
  PricingRuleArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface ListPricingPlansAssociatedWithPricingRuleOutput {
  BillingPeriod?: string;
  PricingRuleArn?: string;
  PricingPlanArns?: string[];
  NextToken?: string;
}
export type PricingRuleArns = string[];
export interface ListPricingRulesFilter {
  Arns?: string[];
}
export interface ListPricingRulesInput {
  BillingPeriod?: string;
  Filters?: ListPricingRulesFilter;
  MaxResults?: number;
  NextToken?: string;
}
export type NumberOfPricingPlansAssociatedWith = number;
export interface FreeTierConfig {
  Activated: boolean;
}
export interface Tiering {
  FreeTier: FreeTierConfig;
}
export interface PricingRuleListElement {
  Name?: string | redacted.Redacted<string>;
  Arn?: string;
  Description?: string | redacted.Redacted<string>;
  Scope?: PricingRuleScope;
  Type?: PricingRuleType;
  ModifierPercentage?: number;
  Service?: string;
  AssociatedPricingPlanCount?: number;
  CreationTime?: number;
  LastModifiedTime?: number;
  BillingEntity?: string;
  Tiering?: Tiering;
  UsageType?: string;
  Operation?: string;
}
export type PricingRuleList = PricingRuleListElement[];
export interface ListPricingRulesOutput {
  BillingPeriod?: string;
  PricingRules?: PricingRuleListElement[];
  NextToken?: string;
}
export interface ListPricingRulesAssociatedToPricingPlanInput {
  BillingPeriod?: string;
  PricingPlanArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface ListPricingRulesAssociatedToPricingPlanOutput {
  BillingPeriod?: string;
  PricingPlanArn?: string;
  PricingRuleArns?: string[];
  NextToken?: string;
}
export type CustomLineItemRelationship = "PARENT" | "CHILD" | (string & {});
export interface ListResourcesAssociatedToCustomLineItemFilter {
  Relationship?: CustomLineItemRelationship;
}
export interface ListResourcesAssociatedToCustomLineItemInput {
  BillingPeriod?: string;
  Arn: string;
  MaxResults?: number;
  NextToken?: string;
  Filters?: ListResourcesAssociatedToCustomLineItemFilter;
}
export interface ListResourcesAssociatedToCustomLineItemResponseElement {
  Arn?: string;
  Relationship?: CustomLineItemRelationship;
  EndBillingPeriod?: string;
}
export type ListResourcesAssociatedToCustomLineItemResponseList =
  ListResourcesAssociatedToCustomLineItemResponseElement[];
export interface ListResourcesAssociatedToCustomLineItemOutput {
  Arn?: string;
  AssociatedResources?: ListResourcesAssociatedToCustomLineItemResponseElement[];
  NextToken?: string;
}
export type Arn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
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
export interface UpdateBillingGroupAccountGrouping {
  AutoAssociate?: boolean;
  ResponsibilityTransferArn?: string;
}
export interface UpdateBillingGroupInput {
  Arn: string;
  Name?: string | redacted.Redacted<string>;
  Status?: BillingGroupStatus;
  ComputationPreference?: ComputationPreference;
  Description?: string | redacted.Redacted<string>;
  AccountGrouping?: UpdateBillingGroupAccountGrouping;
}
export interface UpdateBillingGroupOutput {
  Arn?: string;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  PrimaryAccountId?: string;
  PricingPlanArn?: string;
  Size?: number;
  LastModifiedTime?: number;
  Status?: BillingGroupStatus;
  StatusReason?: string;
  AccountGrouping?: UpdateBillingGroupAccountGrouping;
}
export interface UpdateCustomLineItemFlatChargeDetails {
  ChargeValue: number;
}
export interface UpdateCustomLineItemPercentageChargeDetails {
  PercentageValue: number;
}
export interface UpdateCustomLineItemChargeDetails {
  Flat?: UpdateCustomLineItemFlatChargeDetails;
  Percentage?: UpdateCustomLineItemPercentageChargeDetails;
  LineItemFilters?: LineItemFilter[];
}
export interface UpdateCustomLineItemInput {
  Arn: string;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  ChargeDetails?: UpdateCustomLineItemChargeDetails;
  BillingPeriodRange?: CustomLineItemBillingPeriodRange;
}
export type BillingGroupFullArn = string;
export interface UpdateCustomLineItemOutput {
  Arn?: string;
  BillingGroupArn?: string;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  ChargeDetails?: ListCustomLineItemChargeDetails;
  LastModifiedTime?: number;
  AssociationSize?: number;
}
export interface UpdatePricingPlanInput {
  Arn: string;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
}
export interface UpdatePricingPlanOutput {
  Arn?: string;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  Size?: number;
  LastModifiedTime?: number;
}
export interface UpdateFreeTierConfig {
  Activated: boolean;
}
export interface UpdateTieringInput {
  FreeTier: UpdateFreeTierConfig;
}
export interface UpdatePricingRuleInput {
  Arn: string;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  Type?: PricingRuleType;
  ModifierPercentage?: number;
  Tiering?: UpdateTieringInput;
}
export interface UpdatePricingRuleOutput {
  Arn?: string;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  Scope?: PricingRuleScope;
  Type?: PricingRuleType;
  ModifierPercentage?: number;
  Service?: string;
  AssociatedPricingPlanCount?: number;
  LastModifiedTime?: number;
  BillingEntity?: string;
  Tiering?: UpdateTieringInput;
  UsageType?: string;
  Operation?: string;
}
export type ConflictExceptionReason =
  | "RESOURCE_NAME_CONFLICT"
  | "PRICING_RULE_IN_PRICING_PLAN_CONFLICT"
  | "PRICING_PLAN_ATTACHED_TO_BILLING_GROUP_DELETE_CONFLICT"
  | "PRICING_RULE_ATTACHED_TO_PRICING_PLAN_DELETE_CONFLICT"
  | "WRITE_CONFLICT_RETRY"
  | (string & {});
export type RetryAfterSeconds = number;
export type ValidationExceptionReason =
  | "UNKNOWN_OPERATION"
  | "CANNOT_PARSE"
  | "FIELD_VALIDATION_FAILED"
  | "OTHER"
  | "PRIMARY_NOT_ASSOCIATED"
  | "PRIMARY_CANNOT_DISASSOCIATE"
  | "ACCOUNTS_NOT_ASSOCIATED"
  | "ACCOUNTS_ALREADY_ASSOCIATED"
  | "ILLEGAL_PRIMARY_ACCOUNT"
  | "ILLEGAL_ACCOUNTS"
  | "MISMATCHED_BILLINGGROUP_ARN"
  | "MISSING_BILLINGGROUP"
  | "MISMATCHED_CUSTOMLINEITEM_ARN"
  | "ILLEGAL_BILLING_PERIOD"
  | "ILLEGAL_BILLING_PERIOD_RANGE"
  | "TOO_MANY_ACCOUNTS_IN_REQUEST"
  | "DUPLICATE_ACCOUNT"
  | "INVALID_BILLING_GROUP_STATUS"
  | "MISMATCHED_PRICINGPLAN_ARN"
  | "MISSING_PRICINGPLAN"
  | "MISMATCHED_PRICINGRULE_ARN"
  | "DUPLICATE_PRICINGRULE_ARNS"
  | "MISSING_COSTCATEGORY"
  | "ILLEGAL_EXPRESSION"
  | "ILLEGAL_SCOPE"
  | "ILLEGAL_SERVICE"
  | "PRICINGRULES_NOT_EXIST"
  | "PRICINGRULES_ALREADY_ASSOCIATED"
  | "PRICINGRULES_NOT_ASSOCIATED"
  | "INVALID_TIME_RANGE"
  | "INVALID_BILLINGVIEW_ARN"
  | "MISMATCHED_BILLINGVIEW_ARN"
  | "ILLEGAL_CUSTOMLINEITEM"
  | "MISSING_CUSTOMLINEITEM"
  | "ILLEGAL_CUSTOMLINEITEM_UPDATE"
  | "TOO_MANY_CUSTOMLINEITEMS_IN_REQUEST"
  | "ILLEGAL_CHARGE_DETAILS"
  | "ILLEGAL_UPDATE_CHARGE_DETAILS"
  | "INVALID_ARN"
  | "ILLEGAL_RESOURCE_ARNS"
  | "ILLEGAL_CUSTOMLINEITEM_MODIFICATION"
  | "MISSING_LINKED_ACCOUNT_IDS"
  | "MULTIPLE_LINKED_ACCOUNT_IDS"
  | "MISSING_PRICING_PLAN_ARN"
  | "MULTIPLE_PRICING_PLAN_ARN"
  | "ILLEGAL_CHILD_ASSOCIATE_RESOURCE"
  | "CUSTOM_LINE_ITEM_ASSOCIATION_EXISTS"
  | "INVALID_BILLING_GROUP"
  | "INVALID_BILLING_PERIOD_FOR_OPERATION"
  | "ILLEGAL_BILLING_ENTITY"
  | "ILLEGAL_MODIFIER_PERCENTAGE"
  | "ILLEGAL_TYPE"
  | "ILLEGAL_BILLING_GROUP_TYPE"
  | "ILLEGAL_BILLING_GROUP_PRICING_PLAN"
  | "ILLEGAL_ENDED_BILLINGGROUP"
  | "ILLEGAL_TIERING_INPUT"
  | "ILLEGAL_OPERATION"
  | "ILLEGAL_USAGE_TYPE"
  | "INVALID_SKU_COMBO"
  | "INVALID_FILTER"
  | "TOO_MANY_AUTO_ASSOCIATE_BILLING_GROUPS"
  | "CANNOT_DELETE_AUTO_ASSOCIATE_BILLING_GROUP"
  | "ILLEGAL_ACCOUNT_ID"
  | "BILLING_GROUP_ALREADY_EXIST_IN_CURRENT_BILLING_PERIOD"
  | "ILLEGAL_COMPUTATION_RULE"
  | "ILLEGAL_LINE_ITEM_FILTER"
  | (string & {});
export interface ValidationExceptionField {
  Name: string;
  Message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type AssociateAccountsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceLimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Connects an array of account IDs in a consolidated billing family to a predefined billing group. The account IDs must be a part of the consolidated billing family during the current month, and not already associated with another billing group. The maximum number of accounts that can be associated in one call is 30.
 */
export const associateAccounts: API.OperationMethod<
  AssociateAccountsInput,
  AssociateAccountsOutput,
  AssociateAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /associate-accounts",
    input: { Arn: 0, AccountIds: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceLimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateAccounts",
})) as any;

export type AssociatePricingRulesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceLimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Connects an array of `PricingRuleArns` to a defined `PricingPlan`. The maximum number `PricingRuleArn` that can be associated in one call is 30.
 */
export const associatePricingRules: API.OperationMethod<
  AssociatePricingRulesInput,
  AssociatePricingRulesOutput,
  AssociatePricingRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /associate-pricing-rules",
    input: { Arn: 0, PricingRuleArns: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceLimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociatePricingRules",
})) as any;

export type BatchAssociateResourcesToCustomLineItemError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceLimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a batch of resources to a percentage custom line item.
 */
export const batchAssociateResourcesToCustomLineItem: API.OperationMethod<
  BatchAssociateResourcesToCustomLineItemInput,
  BatchAssociateResourcesToCustomLineItemOutput,
  BatchAssociateResourcesToCustomLineItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /batch-associate-resources-to-custom-line-item",
    input: {
      TargetArn: 0,
      ResourceArns: 0,
      BillingPeriodRange: i_CustomLineItemBillingPeriodRange,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceLimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchAssociateResourcesToCustomLineItem",
})) as any;

export type BatchDisassociateResourcesFromCustomLineItemError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a batch of resources from a percentage custom line item.
 */
export const batchDisassociateResourcesFromCustomLineItem: API.OperationMethod<
  BatchDisassociateResourcesFromCustomLineItemInput,
  BatchDisassociateResourcesFromCustomLineItemOutput,
  BatchDisassociateResourcesFromCustomLineItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /batch-disassociate-resources-from-custom-line-item",
    input: {
      TargetArn: 0,
      ResourceArns: 0,
      BillingPeriodRange: i_CustomLineItemBillingPeriodRange,
    },
    body: true,
  },
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
  operationName: "BatchDisassociateResourcesFromCustomLineItem",
})) as any;

export type CreateBillingGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceLimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a billing group that resembles a consolidated billing family that Amazon Web Services charges, based off of the predefined pricing plan computation.
 */
export const createBillingGroup: API.OperationMethod<
  CreateBillingGroupInput,
  CreateBillingGroupOutput,
  CreateBillingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /create-billing-group",
    input: {
      ClientToken: D.m({ header: "X-Amzn-Client-Token", idempotency: true }),
      Name: 0,
      AccountGrouping: {
        LinkedAccountIds: 0,
        AutoAssociate: 0,
        ResponsibilityTransferArn: 0,
      },
      ComputationPreference: i_ComputationPreference,
      PrimaryAccountId: 0,
      Description: 0,
      Tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceLimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBillingGroup",
})) as any;

export type CreateCustomLineItemError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceLimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a custom line item that can be used to create a one-time fixed charge that can be applied to a single billing group for the current or previous billing period. The one-time fixed charge is either a fee or discount.
 */
export const createCustomLineItem: API.OperationMethod<
  CreateCustomLineItemInput,
  CreateCustomLineItemOutput,
  CreateCustomLineItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /create-custom-line-item",
    input: {
      ClientToken: D.m({ header: "X-Amzn-Client-Token", idempotency: true }),
      Name: 0,
      Description: 0,
      BillingGroupArn: 0,
      BillingPeriodRange: i_CustomLineItemBillingPeriodRange,
      Tags: 0,
      ChargeDetails: {
        Flat: { ChargeValue: 0 },
        Percentage: { PercentageValue: 0, AssociatedValues: 0 },
        Type: 0,
        LineItemFilters: D.list(i_LineItemFilter),
      },
      AccountId: 0,
      ComputationRule: 0,
      PresentationDetails: { Service: 0 },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceLimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomLineItem",
})) as any;

export type CreatePricingPlanError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceLimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a pricing plan that is used for computing Amazon Web Services charges for billing groups.
 */
export const createPricingPlan: API.OperationMethod<
  CreatePricingPlanInput,
  CreatePricingPlanOutput,
  CreatePricingPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /create-pricing-plan",
    input: {
      ClientToken: D.m({ header: "X-Amzn-Client-Token", idempotency: true }),
      Name: 0,
      Description: 0,
      PricingRuleArns: 0,
      Tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceLimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePricingPlan",
})) as any;

export type CreatePricingRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceLimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a pricing rule can be associated to a pricing plan, or a set of pricing plans.
 */
export const createPricingRule: API.OperationMethod<
  CreatePricingRuleInput,
  CreatePricingRuleOutput,
  CreatePricingRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /create-pricing-rule",
    input: {
      ClientToken: D.m({ header: "X-Amzn-Client-Token", idempotency: true }),
      Name: 0,
      Description: 0,
      Scope: 0,
      Type: 0,
      ModifierPercentage: 0,
      Service: 0,
      Tags: 0,
      BillingEntity: 0,
      Tiering: { FreeTier: { Activated: 0 } },
      UsageType: 0,
      Operation: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceLimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePricingRule",
})) as any;

export type DeleteBillingGroupError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a billing group.
 */
export const deleteBillingGroup: API.OperationMethod<
  DeleteBillingGroupInput,
  DeleteBillingGroupOutput,
  DeleteBillingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /delete-billing-group",
    input: { Arn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBillingGroup",
})) as any;

export type DeleteCustomLineItemError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the custom line item identified by the given ARN in the current, or previous billing period.
 */
export const deleteCustomLineItem: API.OperationMethod<
  DeleteCustomLineItemInput,
  DeleteCustomLineItemOutput,
  DeleteCustomLineItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /delete-custom-line-item",
    input: { Arn: 0, BillingPeriodRange: i_CustomLineItemBillingPeriodRange },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomLineItem",
})) as any;

export type DeletePricingPlanError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a pricing plan. The pricing plan must not be associated with any billing groups to delete successfully.
 */
export const deletePricingPlan: API.OperationMethod<
  DeletePricingPlanInput,
  DeletePricingPlanOutput,
  DeletePricingPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /delete-pricing-plan",
    input: { Arn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePricingPlan",
})) as any;

export type DeletePricingRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the pricing rule that's identified by the input Amazon Resource Name (ARN).
 */
export const deletePricingRule: API.OperationMethod<
  DeletePricingRuleInput,
  DeletePricingRuleOutput,
  DeletePricingRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /delete-pricing-rule",
    input: { Arn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePricingRule",
})) as any;

export type DisassociateAccountsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified list of account IDs from the given billing group.
 */
export const disassociateAccounts: API.OperationMethod<
  DisassociateAccountsInput,
  DisassociateAccountsOutput,
  DisassociateAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /disassociate-accounts",
    input: { Arn: 0, AccountIds: 0 },
    body: true,
  },
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
  operationName: "DisassociateAccounts",
})) as any;

export type DisassociatePricingRulesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a list of pricing rules from a pricing plan.
 */
export const disassociatePricingRules: API.OperationMethod<
  DisassociatePricingRulesInput,
  DisassociatePricingRulesOutput,
  DisassociatePricingRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /disassociate-pricing-rules",
    input: { Arn: 0, PricingRuleArns: 0 },
    body: true,
  },
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
  operationName: "DisassociatePricingRules",
})) as any;

export type GetBillingGroupCostReportError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the margin summary report, which includes the Amazon Web Services cost and charged amount (pro forma cost) by Amazon Web Services service for a specific billing group.
 */
export const getBillingGroupCostReport: API.PaginatedOperationMethod<
  GetBillingGroupCostReportInput,
  GetBillingGroupCostReportOutput,
  GetBillingGroupCostReportError,
  Credentials | HttpClient.HttpClient,
  BillingGroupCostReportResultElement
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /get-billing-group-cost-report",
    input: {
      Arn: 0,
      BillingPeriodRange: {
        InclusiveStartBillingPeriod: 0,
        ExclusiveEndBillingPeriod: 0,
      },
      GroupBy: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBillingGroupCostReport",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BillingGroupCostReportResults",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAccountAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This is a paginated call to list linked accounts that are linked to the payer account for the specified time period. If no information is provided, the current billing period is used. The response will optionally include the billing group that's associated with the linked account.
 */
export const listAccountAssociations: API.PaginatedOperationMethod<
  ListAccountAssociationsInput,
  ListAccountAssociationsOutput,
  ListAccountAssociationsError,
  Credentials | HttpClient.HttpClient,
  AccountAssociationsListElement
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /list-account-associations",
    input: {
      BillingPeriod: 0,
      Filters: { Association: 0, AccountId: 0, AccountIds: 0 },
      NextToken: 0,
    },
    output: {
      LinkedAccounts: D.list({ AccountName: D.secret, AccountEmail: D.secret }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccountAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "LinkedAccounts",
  } as const,
})) as any;

export type ListBillingGroupCostReportsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * A paginated call to retrieve a summary report of actual Amazon Web Services charges and the calculated Amazon Web Services charges based on the associated pricing plan of a billing group.
 */
export const listBillingGroupCostReports: API.PaginatedOperationMethod<
  ListBillingGroupCostReportsInput,
  ListBillingGroupCostReportsOutput,
  ListBillingGroupCostReportsError,
  Credentials | HttpClient.HttpClient,
  BillingGroupCostReportElement
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /list-billing-group-cost-reports",
    input: {
      BillingPeriod: 0,
      MaxResults: 0,
      NextToken: 0,
      Filters: { BillingGroupArns: 0 },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBillingGroupCostReports",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BillingGroupCostReports",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListBillingGroupsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * A paginated call to retrieve a list of billing groups for the given billing period. If you don't provide a billing group, the current billing period is used.
 */
export const listBillingGroups: API.PaginatedOperationMethod<
  ListBillingGroupsInput,
  ListBillingGroupsOutput,
  ListBillingGroupsError,
  Credentials | HttpClient.HttpClient,
  BillingGroupListElement
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /list-billing-groups",
    input: {
      BillingPeriod: 0,
      MaxResults: 0,
      NextToken: 0,
      Filters: {
        Arns: 0,
        PricingPlan: 0,
        Statuses: 0,
        AutoAssociate: 0,
        PrimaryAccountIds: 0,
        BillingGroupTypes: 0,
        Names: D.list({ SearchOption: 0, SearchValue: 0 }),
        ResponsibilityTransferArns: 0,
      },
    },
    output: {
      BillingGroups: D.list({ Name: D.secret, Description: D.secret }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBillingGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BillingGroups",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCustomLineItemsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * A paginated call to get a list of all custom line items (FFLIs) for the given billing period. If you don't provide a billing period, the current billing period is used.
 */
export const listCustomLineItems: API.PaginatedOperationMethod<
  ListCustomLineItemsInput,
  ListCustomLineItemsOutput,
  ListCustomLineItemsError,
  Credentials | HttpClient.HttpClient,
  CustomLineItemListElement
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /list-custom-line-items",
    input: {
      BillingPeriod: 0,
      MaxResults: 0,
      NextToken: 0,
      Filters: { Names: 0, BillingGroups: 0, Arns: 0, AccountIds: 0 },
    },
    output: {
      CustomLineItems: D.list({ Name: D.secret, Description: D.secret }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomLineItems",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CustomLineItems",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCustomLineItemVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * A paginated call to get a list of all custom line item versions.
 */
export const listCustomLineItemVersions: API.PaginatedOperationMethod<
  ListCustomLineItemVersionsInput,
  ListCustomLineItemVersionsOutput,
  ListCustomLineItemVersionsError,
  Credentials | HttpClient.HttpClient,
  CustomLineItemVersionListElement
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /list-custom-line-item-versions",
    input: {
      Arn: 0,
      MaxResults: 0,
      NextToken: 0,
      Filters: {
        BillingPeriodRange: { StartBillingPeriod: 0, EndBillingPeriod: 0 },
      },
    },
    output: {
      CustomLineItemVersions: D.list({ Name: D.secret, Description: D.secret }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomLineItemVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CustomLineItemVersions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPricingPlansError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * A paginated call to get pricing plans for the given billing period. If you don't provide a billing period, the current billing period is used.
 */
export const listPricingPlans: API.PaginatedOperationMethod<
  ListPricingPlansInput,
  ListPricingPlansOutput,
  ListPricingPlansError,
  Credentials | HttpClient.HttpClient,
  PricingPlanListElement
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /list-pricing-plans",
    input: {
      BillingPeriod: 0,
      Filters: { Arns: 0 },
      MaxResults: 0,
      NextToken: 0,
    },
    output: { PricingPlans: D.list({ Name: D.secret, Description: D.secret }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPricingPlans",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PricingPlans",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPricingPlansAssociatedWithPricingRuleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * A list of the pricing plans that are associated with a pricing rule.
 */
export const listPricingPlansAssociatedWithPricingRule: API.PaginatedOperationMethod<
  ListPricingPlansAssociatedWithPricingRuleInput,
  ListPricingPlansAssociatedWithPricingRuleOutput,
  ListPricingPlansAssociatedWithPricingRuleError,
  Credentials | HttpClient.HttpClient,
  PricingPlanArn
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /list-pricing-plans-associated-with-pricing-rule",
    input: { BillingPeriod: 0, PricingRuleArn: 0, MaxResults: 0, NextToken: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPricingPlansAssociatedWithPricingRule",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PricingPlanArns",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPricingRulesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes a pricing rule that can be associated to a pricing plan, or set of pricing plans.
 */
export const listPricingRules: API.PaginatedOperationMethod<
  ListPricingRulesInput,
  ListPricingRulesOutput,
  ListPricingRulesError,
  Credentials | HttpClient.HttpClient,
  PricingRuleListElement
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /list-pricing-rules",
    input: {
      BillingPeriod: 0,
      Filters: { Arns: 0 },
      MaxResults: 0,
      NextToken: 0,
    },
    output: { PricingRules: D.list({ Name: D.secret, Description: D.secret }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPricingRules",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PricingRules",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPricingRulesAssociatedToPricingPlanError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the pricing rules that are associated with a pricing plan.
 */
export const listPricingRulesAssociatedToPricingPlan: API.PaginatedOperationMethod<
  ListPricingRulesAssociatedToPricingPlanInput,
  ListPricingRulesAssociatedToPricingPlanOutput,
  ListPricingRulesAssociatedToPricingPlanError,
  Credentials | HttpClient.HttpClient,
  PricingRuleArn
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /list-pricing-rules-associated-to-pricing-plan",
    input: { BillingPeriod: 0, PricingPlanArn: 0, MaxResults: 0, NextToken: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPricingRulesAssociatedToPricingPlan",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PricingRuleArns",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResourcesAssociatedToCustomLineItemError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List the resources that are associated to a custom line item.
 */
export const listResourcesAssociatedToCustomLineItem: API.PaginatedOperationMethod<
  ListResourcesAssociatedToCustomLineItemInput,
  ListResourcesAssociatedToCustomLineItemOutput,
  ListResourcesAssociatedToCustomLineItemError,
  Credentials | HttpClient.HttpClient,
  ListResourcesAssociatedToCustomLineItemResponseElement
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /list-resources-associated-to-custom-line-item",
    input: {
      BillingPeriod: 0,
      Arn: 0,
      MaxResults: 0,
      NextToken: 0,
      Filters: { Relationship: 0 },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourcesAssociatedToCustomLineItem",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AssociatedResources",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * A list the tags for a resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{ResourceArn}",
    input: { ResourceArn: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates the specified tags to a resource with the specified `resourceArn`. If existing tags on a resource are not specified in the request parameters, they are not changed.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{ResourceArn}",
    input: { ResourceArn: 0, Tags: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
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
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes specified tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{ResourceArn}",
    input: { ResourceArn: 0, TagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateBillingGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This updates an existing billing group.
 */
export const updateBillingGroup: API.OperationMethod<
  UpdateBillingGroupInput,
  UpdateBillingGroupOutput,
  UpdateBillingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /update-billing-group",
    input: {
      Arn: 0,
      Name: 0,
      Status: 0,
      ComputationPreference: i_ComputationPreference,
      Description: 0,
      AccountGrouping: { AutoAssociate: 0, ResponsibilityTransferArn: 0 },
    },
    output: { Name: D.secret, Description: D.secret },
    body: true,
  },
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
  operationName: "UpdateBillingGroup",
})) as any;

export type UpdateCustomLineItemError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update an existing custom line item in the current or previous billing period.
 */
export const updateCustomLineItem: API.OperationMethod<
  UpdateCustomLineItemInput,
  UpdateCustomLineItemOutput,
  UpdateCustomLineItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /update-custom-line-item",
    input: {
      Arn: 0,
      Name: 0,
      Description: 0,
      ChargeDetails: {
        Flat: { ChargeValue: 0 },
        Percentage: { PercentageValue: 0 },
        LineItemFilters: D.list(i_LineItemFilter),
      },
      BillingPeriodRange: i_CustomLineItemBillingPeriodRange,
    },
    output: { Name: D.secret, Description: D.secret },
    body: true,
  },
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
  operationName: "UpdateCustomLineItem",
})) as any;

export type UpdatePricingPlanError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This updates an existing pricing plan.
 */
export const updatePricingPlan: API.OperationMethod<
  UpdatePricingPlanInput,
  UpdatePricingPlanOutput,
  UpdatePricingPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /update-pricing-plan",
    input: { Arn: 0, Name: 0, Description: 0 },
    output: { Name: D.secret, Description: D.secret },
    body: true,
  },
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
  operationName: "UpdatePricingPlan",
})) as any;

export type UpdatePricingRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing pricing rule.
 */
export const updatePricingRule: API.OperationMethod<
  UpdatePricingRuleInput,
  UpdatePricingRuleOutput,
  UpdatePricingRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /update-pricing-rule",
    input: {
      Arn: 0,
      Name: 0,
      Description: 0,
      Type: 0,
      ModifierPercentage: 0,
      Tiering: { FreeTier: { Activated: 0 } },
    },
    output: { Name: D.secret, Description: D.secret },
    body: true,
  },
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
  operationName: "UpdatePricingRule",
})) as any;

const i_ComputationPreference: D.LazyStruct = () => ({ PricingPlanArn: 0 });
const i_CustomLineItemBillingPeriodRange: D.LazyStruct = () => ({
  InclusiveStartBillingPeriod: 0,
  ExclusiveEndBillingPeriod: 0,
});
const i_LineItemFilter: D.LazyStruct = () => ({
  Attribute: 0,
  MatchOption: 0,
  Values: 0,
  AttributeValues: 0,
});
