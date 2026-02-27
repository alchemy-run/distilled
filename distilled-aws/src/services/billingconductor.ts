import * as HttpClient from "effect/unstable/http/HttpClient";
import * as effect from "effect/Effect";
import * as redacted from "effect/Redacted";
import * as S from "effect/Schema";
import * as stream from "effect/Stream";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import type { Region } from "../region.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "billingconductor",
  serviceShapeName: "AWSBillingConductor",
});
const auth = T.AwsAuthSigv4({ name: "billingconductor" });
const ver = T.ServiceVersion("2021-07-30");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
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
});

//# Newtypes
export type BillingGroupArn = string;
export type BillingPeriod = string;
export type MaxBillingGroupCostReportResults = number;
export type Token = string;
export type AWSCost = string;
export type ProformaCost = string;
export type Margin = string;
export type MarginPercentage = string;
export type Currency = string;
export type RetryAfterSeconds = number;
export type Association = string;
export type AccountId = string;
export type AccountName = string | redacted.Redacted<string>;
export type AccountEmail = string | redacted.Redacted<string>;
export type MaxBillingGroupResults = number;
export type Arn = string;
export type TagKey = string;
export type TagValue = string;
export type ClientToken = string;
export type BillingGroupName = string | redacted.Redacted<string>;
export type ResponsibilityTransferArn = string;
export type PricingPlanFullArn = string;
export type BillingGroupDescription = string | redacted.Redacted<string>;
export type PricingPlanArn = string;
export type NumberOfAccounts = number;
export type Instant = number;
export type BillingGroupStatusReason = string;
export type SearchValue = string;
export type CustomLineItemName = string | redacted.Redacted<string>;
export type CustomLineItemDescription = string | redacted.Redacted<string>;
export type CustomLineItemChargeValue = number;
export type CustomLineItemPercentageChargeValue = number;
export type CustomLineItemAssociationElement = string;
export type AttributeValue = string;
export type Service = string;
export type CustomLineItemArn = string;
export type BillingGroupFullArn = string;
export type NumberOfAssociations = number;
export type MaxCustomLineItemResults = number;
export type CustomLineItemProductCode = string;
export type PricingPlanName = string | redacted.Redacted<string>;
export type PricingPlanDescription = string | redacted.Redacted<string>;
export type PricingRuleArn = string;
export type NumberOfAssociatedPricingRules = number;
export type MaxPricingPlanResults = number;
export type MaxPricingRuleResults = number;
export type PricingRuleName = string | redacted.Redacted<string>;
export type PricingRuleDescription = string | redacted.Redacted<string>;
export type ModifierPercentage = number;
export type BillingEntity = string;
export type TieringActivated = boolean;
export type UsageType = string;
export type Operation = string;
export type NumberOfPricingPlansAssociatedWith = number;

//# Schemas
export interface BillingPeriodRange {
  InclusiveStartBillingPeriod: string;
  ExclusiveEndBillingPeriod: string;
}
export const BillingPeriodRange = S.suspend(() =>
  S.Struct({
    InclusiveStartBillingPeriod: S.String,
    ExclusiveEndBillingPeriod: S.String,
  }),
).annotate({
  identifier: "BillingPeriodRange",
}) as any as S.Schema<BillingPeriodRange>;
export type GroupByAttributeName =
  | "PRODUCT_NAME"
  | "BILLING_PERIOD"
  | (string & {});
export const GroupByAttributeName = S.String;
export type GroupByAttributesList = GroupByAttributeName[];
export const GroupByAttributesList = S.Array(GroupByAttributeName);
export interface GetBillingGroupCostReportInput {
  Arn: string;
  BillingPeriodRange?: BillingPeriodRange;
  GroupBy?: GroupByAttributeName[];
  MaxResults?: number;
  NextToken?: string;
}
export const GetBillingGroupCostReportInput = S.suspend(() =>
  S.Struct({
    Arn: S.String,
    BillingPeriodRange: S.optional(BillingPeriodRange),
    GroupBy: S.optional(GroupByAttributesList),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/get-billing-group-cost-report" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBillingGroupCostReportInput",
}) as any as S.Schema<GetBillingGroupCostReportInput>;
export interface Attribute {
  Key?: string;
  Value?: string;
}
export const Attribute = S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({ identifier: "Attribute" }) as any as S.Schema<Attribute>;
export type AttributesList = Attribute[];
export const AttributesList = S.Array(Attribute);
export interface BillingGroupCostReportResultElement {
  Arn?: string;
  AWSCost?: string;
  ProformaCost?: string;
  Margin?: string;
  MarginPercentage?: string;
  Currency?: string;
  Attributes?: Attribute[];
}
export const BillingGroupCostReportResultElement = S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    AWSCost: S.optional(S.String),
    ProformaCost: S.optional(S.String),
    Margin: S.optional(S.String),
    MarginPercentage: S.optional(S.String),
    Currency: S.optional(S.String),
    Attributes: S.optional(AttributesList),
  }),
).annotate({
  identifier: "BillingGroupCostReportResultElement",
}) as any as S.Schema<BillingGroupCostReportResultElement>;
export type BillingGroupCostReportResultsList =
  BillingGroupCostReportResultElement[];
export const BillingGroupCostReportResultsList = S.Array(
  BillingGroupCostReportResultElement,
);
export interface GetBillingGroupCostReportOutput {
  BillingGroupCostReportResults?: BillingGroupCostReportResultElement[];
  NextToken?: string;
}
export const GetBillingGroupCostReportOutput = S.suspend(() =>
  S.Struct({
    BillingGroupCostReportResults: S.optional(
      BillingGroupCostReportResultsList,
    ),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetBillingGroupCostReportOutput",
}) as any as S.Schema<GetBillingGroupCostReportOutput>;
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
export const ValidationExceptionReason = S.String;
export interface ValidationExceptionField {
  Name: string;
  Message: string;
}
export const ValidationExceptionField = S.suspend(() =>
  S.Struct({ Name: S.String, Message: S.String }),
).annotate({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFieldList = ValidationExceptionField[];
export const ValidationExceptionFieldList = S.Array(ValidationExceptionField);
export type AccountIdFilterList = string[];
export const AccountIdFilterList = S.Array(S.String);
export interface ListAccountAssociationsFilter {
  Association?: string;
  AccountId?: string;
  AccountIds?: string[];
}
export const ListAccountAssociationsFilter = S.suspend(() =>
  S.Struct({
    Association: S.optional(S.String),
    AccountId: S.optional(S.String),
    AccountIds: S.optional(AccountIdFilterList),
  }),
).annotate({
  identifier: "ListAccountAssociationsFilter",
}) as any as S.Schema<ListAccountAssociationsFilter>;
export interface ListAccountAssociationsInput {
  BillingPeriod?: string;
  Filters?: ListAccountAssociationsFilter;
  NextToken?: string;
}
export const ListAccountAssociationsInput = S.suspend(() =>
  S.Struct({
    BillingPeriod: S.optional(S.String),
    Filters: S.optional(ListAccountAssociationsFilter),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-account-associations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAccountAssociationsInput",
}) as any as S.Schema<ListAccountAssociationsInput>;
export interface AccountAssociationsListElement {
  AccountId?: string;
  BillingGroupArn?: string;
  AccountName?: string | redacted.Redacted<string>;
  AccountEmail?: string | redacted.Redacted<string>;
}
export const AccountAssociationsListElement = S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    BillingGroupArn: S.optional(S.String),
    AccountName: S.optional(SensitiveString),
    AccountEmail: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "AccountAssociationsListElement",
}) as any as S.Schema<AccountAssociationsListElement>;
export type AccountAssociationsList = AccountAssociationsListElement[];
export const AccountAssociationsList = S.Array(AccountAssociationsListElement);
export interface ListAccountAssociationsOutput {
  LinkedAccounts?: AccountAssociationsListElement[];
  NextToken?: string;
}
export const ListAccountAssociationsOutput = S.suspend(() =>
  S.Struct({
    LinkedAccounts: S.optional(AccountAssociationsList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAccountAssociationsOutput",
}) as any as S.Schema<ListAccountAssociationsOutput>;
export type BillingGroupArnList = string[];
export const BillingGroupArnList = S.Array(S.String);
export interface ListBillingGroupCostReportsFilter {
  BillingGroupArns?: string[];
}
export const ListBillingGroupCostReportsFilter = S.suspend(() =>
  S.Struct({ BillingGroupArns: S.optional(BillingGroupArnList) }),
).annotate({
  identifier: "ListBillingGroupCostReportsFilter",
}) as any as S.Schema<ListBillingGroupCostReportsFilter>;
export interface ListBillingGroupCostReportsInput {
  BillingPeriod?: string;
  MaxResults?: number;
  NextToken?: string;
  Filters?: ListBillingGroupCostReportsFilter;
}
export const ListBillingGroupCostReportsInput = S.suspend(() =>
  S.Struct({
    BillingPeriod: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filters: S.optional(ListBillingGroupCostReportsFilter),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-billing-group-cost-reports" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBillingGroupCostReportsInput",
}) as any as S.Schema<ListBillingGroupCostReportsInput>;
export interface BillingGroupCostReportElement {
  Arn?: string;
  AWSCost?: string;
  ProformaCost?: string;
  Margin?: string;
  MarginPercentage?: string;
  Currency?: string;
}
export const BillingGroupCostReportElement = S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    AWSCost: S.optional(S.String),
    ProformaCost: S.optional(S.String),
    Margin: S.optional(S.String),
    MarginPercentage: S.optional(S.String),
    Currency: S.optional(S.String),
  }),
).annotate({
  identifier: "BillingGroupCostReportElement",
}) as any as S.Schema<BillingGroupCostReportElement>;
export type BillingGroupCostReportList = BillingGroupCostReportElement[];
export const BillingGroupCostReportList = S.Array(
  BillingGroupCostReportElement,
);
export interface ListBillingGroupCostReportsOutput {
  BillingGroupCostReports?: BillingGroupCostReportElement[];
  NextToken?: string;
}
export const ListBillingGroupCostReportsOutput = S.suspend(() =>
  S.Struct({
    BillingGroupCostReports: S.optional(BillingGroupCostReportList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListBillingGroupCostReportsOutput",
}) as any as S.Schema<ListBillingGroupCostReportsOutput>;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = S.suspend(() =>
  S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/{ResourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = S.Record(S.String, S.String.pipe(S.optional));
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = S.suspend(() =>
  S.Struct({ Tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    Tags: TagMap,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags/{ResourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {}
export const TagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type TagKeyList = string[];
export const TagKeyList = S.Array(S.String);
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceRequest = S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    TagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tags/{ResourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export type AccountIdList = string[];
export const AccountIdList = S.Array(S.String);
export interface AccountGrouping {
  LinkedAccountIds?: string[];
  AutoAssociate?: boolean;
  ResponsibilityTransferArn?: string;
}
export const AccountGrouping = S.suspend(() =>
  S.Struct({
    LinkedAccountIds: S.optional(AccountIdList),
    AutoAssociate: S.optional(S.Boolean),
    ResponsibilityTransferArn: S.optional(S.String),
  }),
).annotate({
  identifier: "AccountGrouping",
}) as any as S.Schema<AccountGrouping>;
export interface ComputationPreference {
  PricingPlanArn: string;
}
export const ComputationPreference = S.suspend(() =>
  S.Struct({ PricingPlanArn: S.String }),
).annotate({
  identifier: "ComputationPreference",
}) as any as S.Schema<ComputationPreference>;
export interface CreateBillingGroupInput {
  ClientToken?: string;
  Name: string | redacted.Redacted<string>;
  AccountGrouping: AccountGrouping;
  ComputationPreference: ComputationPreference;
  PrimaryAccountId?: string;
  Description?: string | redacted.Redacted<string>;
  Tags?: { [key: string]: string | undefined };
}
export const CreateBillingGroupInput = S.suspend(() =>
  S.Struct({
    ClientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Client-Token"),
      T.IdempotencyToken(),
    ),
    Name: SensitiveString,
    AccountGrouping: AccountGrouping,
    ComputationPreference: ComputationPreference,
    PrimaryAccountId: S.optional(S.String),
    Description: S.optional(SensitiveString),
    Tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/create-billing-group" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateBillingGroupInput",
}) as any as S.Schema<CreateBillingGroupInput>;
export interface CreateBillingGroupOutput {
  Arn?: string;
}
export const CreateBillingGroupOutput = S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }),
).annotate({
  identifier: "CreateBillingGroupOutput",
}) as any as S.Schema<CreateBillingGroupOutput>;
export type ConflictExceptionReason =
  | "RESOURCE_NAME_CONFLICT"
  | "PRICING_RULE_IN_PRICING_PLAN_CONFLICT"
  | "PRICING_PLAN_ATTACHED_TO_BILLING_GROUP_DELETE_CONFLICT"
  | "PRICING_RULE_ATTACHED_TO_PRICING_PLAN_DELETE_CONFLICT"
  | "WRITE_CONFLICT_RETRY"
  | (string & {});
export const ConflictExceptionReason = S.String;
export type BillingGroupStatus =
  | "ACTIVE"
  | "PRIMARY_ACCOUNT_MISSING"
  | "PENDING"
  | (string & {});
export const BillingGroupStatus = S.String;
export interface UpdateBillingGroupAccountGrouping {
  AutoAssociate?: boolean;
  ResponsibilityTransferArn?: string;
}
export const UpdateBillingGroupAccountGrouping = S.suspend(() =>
  S.Struct({
    AutoAssociate: S.optional(S.Boolean),
    ResponsibilityTransferArn: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateBillingGroupAccountGrouping",
}) as any as S.Schema<UpdateBillingGroupAccountGrouping>;
export interface UpdateBillingGroupInput {
  Arn: string;
  Name?: string | redacted.Redacted<string>;
  Status?: BillingGroupStatus;
  ComputationPreference?: ComputationPreference;
  Description?: string | redacted.Redacted<string>;
  AccountGrouping?: UpdateBillingGroupAccountGrouping;
}
export const UpdateBillingGroupInput = S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Name: S.optional(SensitiveString),
    Status: S.optional(BillingGroupStatus),
    ComputationPreference: S.optional(ComputationPreference),
    Description: S.optional(SensitiveString),
    AccountGrouping: S.optional(UpdateBillingGroupAccountGrouping),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/update-billing-group" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateBillingGroupInput",
}) as any as S.Schema<UpdateBillingGroupInput>;
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
export const UpdateBillingGroupOutput = S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Name: S.optional(SensitiveString),
    Description: S.optional(SensitiveString),
    PrimaryAccountId: S.optional(S.String),
    PricingPlanArn: S.optional(S.String),
    Size: S.optional(S.Number),
    LastModifiedTime: S.optional(S.Number),
    Status: S.optional(BillingGroupStatus),
    StatusReason: S.optional(S.String),
    AccountGrouping: S.optional(UpdateBillingGroupAccountGrouping),
  }),
).annotate({
  identifier: "UpdateBillingGroupOutput",
}) as any as S.Schema<UpdateBillingGroupOutput>;
export interface DeleteBillingGroupInput {
  Arn: string;
}
export const DeleteBillingGroupInput = S.suspend(() =>
  S.Struct({ Arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/delete-billing-group" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteBillingGroupInput",
}) as any as S.Schema<DeleteBillingGroupInput>;
export interface DeleteBillingGroupOutput {
  Arn?: string;
}
export const DeleteBillingGroupOutput = S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }),
).annotate({
  identifier: "DeleteBillingGroupOutput",
}) as any as S.Schema<DeleteBillingGroupOutput>;
export type BillingGroupStatusList = BillingGroupStatus[];
export const BillingGroupStatusList = S.Array(BillingGroupStatus);
export type PrimaryAccountIdList = string[];
export const PrimaryAccountIdList = S.Array(S.String);
export type BillingGroupType = "STANDARD" | "TRANSFER_BILLING" | (string & {});
export const BillingGroupType = S.String;
export type BillingGroupTypeList = BillingGroupType[];
export const BillingGroupTypeList = S.Array(BillingGroupType);
export type SearchOption = "STARTS_WITH" | (string & {});
export const SearchOption = S.String;
export interface StringSearch {
  SearchOption: SearchOption;
  SearchValue: string;
}
export const StringSearch = S.suspend(() =>
  S.Struct({ SearchOption: SearchOption, SearchValue: S.String }),
).annotate({ identifier: "StringSearch" }) as any as S.Schema<StringSearch>;
export type StringSearches = StringSearch[];
export const StringSearches = S.Array(StringSearch);
export type ResponsibilityTransferArnsList = string[];
export const ResponsibilityTransferArnsList = S.Array(S.String);
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
export const ListBillingGroupsFilter = S.suspend(() =>
  S.Struct({
    Arns: S.optional(BillingGroupArnList),
    PricingPlan: S.optional(S.String),
    Statuses: S.optional(BillingGroupStatusList),
    AutoAssociate: S.optional(S.Boolean),
    PrimaryAccountIds: S.optional(PrimaryAccountIdList),
    BillingGroupTypes: S.optional(BillingGroupTypeList),
    Names: S.optional(StringSearches),
    ResponsibilityTransferArns: S.optional(ResponsibilityTransferArnsList),
  }),
).annotate({
  identifier: "ListBillingGroupsFilter",
}) as any as S.Schema<ListBillingGroupsFilter>;
export interface ListBillingGroupsInput {
  BillingPeriod?: string;
  MaxResults?: number;
  NextToken?: string;
  Filters?: ListBillingGroupsFilter;
}
export const ListBillingGroupsInput = S.suspend(() =>
  S.Struct({
    BillingPeriod: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filters: S.optional(ListBillingGroupsFilter),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-billing-groups" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBillingGroupsInput",
}) as any as S.Schema<ListBillingGroupsInput>;
export interface ListBillingGroupAccountGrouping {
  AutoAssociate?: boolean;
  ResponsibilityTransferArn?: string;
}
export const ListBillingGroupAccountGrouping = S.suspend(() =>
  S.Struct({
    AutoAssociate: S.optional(S.Boolean),
    ResponsibilityTransferArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ListBillingGroupAccountGrouping",
}) as any as S.Schema<ListBillingGroupAccountGrouping>;
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
export const BillingGroupListElement = S.suspend(() =>
  S.Struct({
    Name: S.optional(SensitiveString),
    Arn: S.optional(S.String),
    Description: S.optional(SensitiveString),
    PrimaryAccountId: S.optional(S.String),
    ComputationPreference: S.optional(ComputationPreference),
    Size: S.optional(S.Number),
    CreationTime: S.optional(S.Number),
    LastModifiedTime: S.optional(S.Number),
    Status: S.optional(BillingGroupStatus),
    StatusReason: S.optional(S.String),
    AccountGrouping: S.optional(ListBillingGroupAccountGrouping),
    BillingGroupType: S.optional(BillingGroupType),
  }),
).annotate({
  identifier: "BillingGroupListElement",
}) as any as S.Schema<BillingGroupListElement>;
export type BillingGroupList = BillingGroupListElement[];
export const BillingGroupList = S.Array(BillingGroupListElement);
export interface ListBillingGroupsOutput {
  BillingGroups?: BillingGroupListElement[];
  NextToken?: string;
}
export const ListBillingGroupsOutput = S.suspend(() =>
  S.Struct({
    BillingGroups: S.optional(BillingGroupList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListBillingGroupsOutput",
}) as any as S.Schema<ListBillingGroupsOutput>;
export interface AssociateAccountsInput {
  Arn: string;
  AccountIds: string[];
}
export const AssociateAccountsInput = S.suspend(() =>
  S.Struct({ Arn: S.String, AccountIds: AccountIdList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/associate-accounts" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateAccountsInput",
}) as any as S.Schema<AssociateAccountsInput>;
export interface AssociateAccountsOutput {
  Arn?: string;
}
export const AssociateAccountsOutput = S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }),
).annotate({
  identifier: "AssociateAccountsOutput",
}) as any as S.Schema<AssociateAccountsOutput>;
export interface DisassociateAccountsInput {
  Arn: string;
  AccountIds: string[];
}
export const DisassociateAccountsInput = S.suspend(() =>
  S.Struct({ Arn: S.String, AccountIds: AccountIdList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/disassociate-accounts" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateAccountsInput",
}) as any as S.Schema<DisassociateAccountsInput>;
export interface DisassociateAccountsOutput {
  Arn?: string;
}
export const DisassociateAccountsOutput = S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }),
).annotate({
  identifier: "DisassociateAccountsOutput",
}) as any as S.Schema<DisassociateAccountsOutput>;
export interface CustomLineItemBillingPeriodRange {
  InclusiveStartBillingPeriod: string;
  ExclusiveEndBillingPeriod?: string;
}
export const CustomLineItemBillingPeriodRange = S.suspend(() =>
  S.Struct({
    InclusiveStartBillingPeriod: S.String,
    ExclusiveEndBillingPeriod: S.optional(S.String),
  }),
).annotate({
  identifier: "CustomLineItemBillingPeriodRange",
}) as any as S.Schema<CustomLineItemBillingPeriodRange>;
export interface CustomLineItemFlatChargeDetails {
  ChargeValue: number;
}
export const CustomLineItemFlatChargeDetails = S.suspend(() =>
  S.Struct({ ChargeValue: S.Number }),
).annotate({
  identifier: "CustomLineItemFlatChargeDetails",
}) as any as S.Schema<CustomLineItemFlatChargeDetails>;
export type CustomLineItemAssociationsList = string[];
export const CustomLineItemAssociationsList = S.Array(S.String);
export interface CustomLineItemPercentageChargeDetails {
  PercentageValue: number;
  AssociatedValues?: string[];
}
export const CustomLineItemPercentageChargeDetails = S.suspend(() =>
  S.Struct({
    PercentageValue: S.Number,
    AssociatedValues: S.optional(CustomLineItemAssociationsList),
  }),
).annotate({
  identifier: "CustomLineItemPercentageChargeDetails",
}) as any as S.Schema<CustomLineItemPercentageChargeDetails>;
export type CustomLineItemType = "CREDIT" | "FEE" | (string & {});
export const CustomLineItemType = S.String;
export type LineItemFilterAttributeName =
  | "LINE_ITEM_TYPE"
  | "SERVICE"
  | (string & {});
export const LineItemFilterAttributeName = S.String;
export type MatchOption = "NOT_EQUAL" | "EQUAL" | (string & {});
export const MatchOption = S.String;
export type LineItemFilterValue = "SAVINGS_PLAN_NEGATION" | (string & {});
export const LineItemFilterValue = S.String;
export type LineItemFilterValuesList = LineItemFilterValue[];
export const LineItemFilterValuesList = S.Array(LineItemFilterValue);
export type AttributeValueList = string[];
export const AttributeValueList = S.Array(S.String);
export interface LineItemFilter {
  Attribute: LineItemFilterAttributeName;
  MatchOption: MatchOption;
  Values?: LineItemFilterValue[];
  AttributeValues?: string[];
}
export const LineItemFilter = S.suspend(() =>
  S.Struct({
    Attribute: LineItemFilterAttributeName,
    MatchOption: MatchOption,
    Values: S.optional(LineItemFilterValuesList),
    AttributeValues: S.optional(AttributeValueList),
  }),
).annotate({ identifier: "LineItemFilter" }) as any as S.Schema<LineItemFilter>;
export type LineItemFiltersList = LineItemFilter[];
export const LineItemFiltersList = S.Array(LineItemFilter);
export interface CustomLineItemChargeDetails {
  Flat?: CustomLineItemFlatChargeDetails;
  Percentage?: CustomLineItemPercentageChargeDetails;
  Type: CustomLineItemType;
  LineItemFilters?: LineItemFilter[];
}
export const CustomLineItemChargeDetails = S.suspend(() =>
  S.Struct({
    Flat: S.optional(CustomLineItemFlatChargeDetails),
    Percentage: S.optional(CustomLineItemPercentageChargeDetails),
    Type: CustomLineItemType,
    LineItemFilters: S.optional(LineItemFiltersList),
  }),
).annotate({
  identifier: "CustomLineItemChargeDetails",
}) as any as S.Schema<CustomLineItemChargeDetails>;
export type ComputationRuleEnum = "ITEMIZED" | "CONSOLIDATED" | (string & {});
export const ComputationRuleEnum = S.String;
export interface PresentationObject {
  Service: string;
}
export const PresentationObject = S.suspend(() =>
  S.Struct({ Service: S.String }),
).annotate({
  identifier: "PresentationObject",
}) as any as S.Schema<PresentationObject>;
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
export const CreateCustomLineItemInput = S.suspend(() =>
  S.Struct({
    ClientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Client-Token"),
      T.IdempotencyToken(),
    ),
    Name: SensitiveString,
    Description: SensitiveString,
    BillingGroupArn: S.String,
    BillingPeriodRange: S.optional(CustomLineItemBillingPeriodRange),
    Tags: S.optional(TagMap),
    ChargeDetails: CustomLineItemChargeDetails,
    AccountId: S.optional(S.String),
    ComputationRule: S.optional(ComputationRuleEnum),
    PresentationDetails: S.optional(PresentationObject),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/create-custom-line-item" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCustomLineItemInput",
}) as any as S.Schema<CreateCustomLineItemInput>;
export interface CreateCustomLineItemOutput {
  Arn?: string;
}
export const CreateCustomLineItemOutput = S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }),
).annotate({
  identifier: "CreateCustomLineItemOutput",
}) as any as S.Schema<CreateCustomLineItemOutput>;
export interface UpdateCustomLineItemFlatChargeDetails {
  ChargeValue: number;
}
export const UpdateCustomLineItemFlatChargeDetails = S.suspend(() =>
  S.Struct({ ChargeValue: S.Number }),
).annotate({
  identifier: "UpdateCustomLineItemFlatChargeDetails",
}) as any as S.Schema<UpdateCustomLineItemFlatChargeDetails>;
export interface UpdateCustomLineItemPercentageChargeDetails {
  PercentageValue: number;
}
export const UpdateCustomLineItemPercentageChargeDetails = S.suspend(() =>
  S.Struct({ PercentageValue: S.Number }),
).annotate({
  identifier: "UpdateCustomLineItemPercentageChargeDetails",
}) as any as S.Schema<UpdateCustomLineItemPercentageChargeDetails>;
export interface UpdateCustomLineItemChargeDetails {
  Flat?: UpdateCustomLineItemFlatChargeDetails;
  Percentage?: UpdateCustomLineItemPercentageChargeDetails;
  LineItemFilters?: LineItemFilter[];
}
export const UpdateCustomLineItemChargeDetails = S.suspend(() =>
  S.Struct({
    Flat: S.optional(UpdateCustomLineItemFlatChargeDetails),
    Percentage: S.optional(UpdateCustomLineItemPercentageChargeDetails),
    LineItemFilters: S.optional(LineItemFiltersList),
  }),
).annotate({
  identifier: "UpdateCustomLineItemChargeDetails",
}) as any as S.Schema<UpdateCustomLineItemChargeDetails>;
export interface UpdateCustomLineItemInput {
  Arn: string;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  ChargeDetails?: UpdateCustomLineItemChargeDetails;
  BillingPeriodRange?: CustomLineItemBillingPeriodRange;
}
export const UpdateCustomLineItemInput = S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Name: S.optional(SensitiveString),
    Description: S.optional(SensitiveString),
    ChargeDetails: S.optional(UpdateCustomLineItemChargeDetails),
    BillingPeriodRange: S.optional(CustomLineItemBillingPeriodRange),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/update-custom-line-item" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateCustomLineItemInput",
}) as any as S.Schema<UpdateCustomLineItemInput>;
export interface ListCustomLineItemFlatChargeDetails {
  ChargeValue: number;
}
export const ListCustomLineItemFlatChargeDetails = S.suspend(() =>
  S.Struct({ ChargeValue: S.Number }),
).annotate({
  identifier: "ListCustomLineItemFlatChargeDetails",
}) as any as S.Schema<ListCustomLineItemFlatChargeDetails>;
export interface ListCustomLineItemPercentageChargeDetails {
  PercentageValue: number;
}
export const ListCustomLineItemPercentageChargeDetails = S.suspend(() =>
  S.Struct({ PercentageValue: S.Number }),
).annotate({
  identifier: "ListCustomLineItemPercentageChargeDetails",
}) as any as S.Schema<ListCustomLineItemPercentageChargeDetails>;
export interface ListCustomLineItemChargeDetails {
  Flat?: ListCustomLineItemFlatChargeDetails;
  Percentage?: ListCustomLineItemPercentageChargeDetails;
  Type: CustomLineItemType;
  LineItemFilters?: LineItemFilter[];
}
export const ListCustomLineItemChargeDetails = S.suspend(() =>
  S.Struct({
    Flat: S.optional(ListCustomLineItemFlatChargeDetails),
    Percentage: S.optional(ListCustomLineItemPercentageChargeDetails),
    Type: CustomLineItemType,
    LineItemFilters: S.optional(LineItemFiltersList),
  }),
).annotate({
  identifier: "ListCustomLineItemChargeDetails",
}) as any as S.Schema<ListCustomLineItemChargeDetails>;
export interface UpdateCustomLineItemOutput {
  Arn?: string;
  BillingGroupArn?: string;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  ChargeDetails?: ListCustomLineItemChargeDetails;
  LastModifiedTime?: number;
  AssociationSize?: number;
}
export const UpdateCustomLineItemOutput = S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    BillingGroupArn: S.optional(S.String),
    Name: S.optional(SensitiveString),
    Description: S.optional(SensitiveString),
    ChargeDetails: S.optional(ListCustomLineItemChargeDetails),
    LastModifiedTime: S.optional(S.Number),
    AssociationSize: S.optional(S.Number),
  }),
).annotate({
  identifier: "UpdateCustomLineItemOutput",
}) as any as S.Schema<UpdateCustomLineItemOutput>;
export interface DeleteCustomLineItemInput {
  Arn: string;
  BillingPeriodRange?: CustomLineItemBillingPeriodRange;
}
export const DeleteCustomLineItemInput = S.suspend(() =>
  S.Struct({
    Arn: S.String,
    BillingPeriodRange: S.optional(CustomLineItemBillingPeriodRange),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/delete-custom-line-item" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCustomLineItemInput",
}) as any as S.Schema<DeleteCustomLineItemInput>;
export interface DeleteCustomLineItemOutput {
  Arn?: string;
}
export const DeleteCustomLineItemOutput = S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }),
).annotate({
  identifier: "DeleteCustomLineItemOutput",
}) as any as S.Schema<DeleteCustomLineItemOutput>;
export type CustomLineItemNameList = string | redacted.Redacted<string>[];
export const CustomLineItemNameList = S.Array(SensitiveString);
export type CustomLineItemArns = string[];
export const CustomLineItemArns = S.Array(S.String);
export interface ListCustomLineItemsFilter {
  Names?: string | redacted.Redacted<string>[];
  BillingGroups?: string[];
  Arns?: string[];
  AccountIds?: string[];
}
export const ListCustomLineItemsFilter = S.suspend(() =>
  S.Struct({
    Names: S.optional(CustomLineItemNameList),
    BillingGroups: S.optional(BillingGroupArnList),
    Arns: S.optional(CustomLineItemArns),
    AccountIds: S.optional(AccountIdList),
  }),
).annotate({
  identifier: "ListCustomLineItemsFilter",
}) as any as S.Schema<ListCustomLineItemsFilter>;
export interface ListCustomLineItemsInput {
  BillingPeriod?: string;
  MaxResults?: number;
  NextToken?: string;
  Filters?: ListCustomLineItemsFilter;
}
export const ListCustomLineItemsInput = S.suspend(() =>
  S.Struct({
    BillingPeriod: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filters: S.optional(ListCustomLineItemsFilter),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-custom-line-items" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCustomLineItemsInput",
}) as any as S.Schema<ListCustomLineItemsInput>;
export type CurrencyCode = "USD" | "CNY" | (string & {});
export const CurrencyCode = S.String;
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
export const CustomLineItemListElement = S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Name: S.optional(SensitiveString),
    ChargeDetails: S.optional(ListCustomLineItemChargeDetails),
    CurrencyCode: S.optional(CurrencyCode),
    Description: S.optional(SensitiveString),
    ProductCode: S.optional(S.String),
    BillingGroupArn: S.optional(S.String),
    CreationTime: S.optional(S.Number),
    LastModifiedTime: S.optional(S.Number),
    AssociationSize: S.optional(S.Number),
    AccountId: S.optional(S.String),
    ComputationRule: S.optional(ComputationRuleEnum),
    PresentationDetails: S.optional(PresentationObject),
  }),
).annotate({
  identifier: "CustomLineItemListElement",
}) as any as S.Schema<CustomLineItemListElement>;
export type CustomLineItemList = CustomLineItemListElement[];
export const CustomLineItemList = S.Array(CustomLineItemListElement);
export interface ListCustomLineItemsOutput {
  CustomLineItems?: CustomLineItemListElement[];
  NextToken?: string;
}
export const ListCustomLineItemsOutput = S.suspend(() =>
  S.Struct({
    CustomLineItems: S.optional(CustomLineItemList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCustomLineItemsOutput",
}) as any as S.Schema<ListCustomLineItemsOutput>;
export type CustomLineItemBatchAssociationsList = string[];
export const CustomLineItemBatchAssociationsList = S.Array(S.String);
export interface BatchAssociateResourcesToCustomLineItemInput {
  TargetArn: string;
  ResourceArns: string[];
  BillingPeriodRange?: CustomLineItemBillingPeriodRange;
}
export const BatchAssociateResourcesToCustomLineItemInput = S.suspend(() =>
  S.Struct({
    TargetArn: S.String,
    ResourceArns: CustomLineItemBatchAssociationsList,
    BillingPeriodRange: S.optional(CustomLineItemBillingPeriodRange),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/batch-associate-resources-to-custom-line-item",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchAssociateResourcesToCustomLineItemInput",
}) as any as S.Schema<BatchAssociateResourcesToCustomLineItemInput>;
export type AssociateResourceErrorReason =
  | "INVALID_ARN"
  | "SERVICE_LIMIT_EXCEEDED"
  | "ILLEGAL_CUSTOMLINEITEM"
  | "INTERNAL_SERVER_EXCEPTION"
  | "INVALID_BILLING_PERIOD_RANGE"
  | (string & {});
export const AssociateResourceErrorReason = S.String;
export interface AssociateResourceError {
  Message?: string;
  Reason?: AssociateResourceErrorReason;
}
export const AssociateResourceError = S.suspend(() =>
  S.Struct({
    Message: S.optional(S.String),
    Reason: S.optional(AssociateResourceErrorReason),
  }),
).annotate({
  identifier: "AssociateResourceError",
}) as any as S.Schema<AssociateResourceError>;
export interface AssociateResourceResponseElement {
  Arn?: string;
  Error?: AssociateResourceError;
}
export const AssociateResourceResponseElement = S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Error: S.optional(AssociateResourceError),
  }),
).annotate({
  identifier: "AssociateResourceResponseElement",
}) as any as S.Schema<AssociateResourceResponseElement>;
export type AssociateResourcesResponseList = AssociateResourceResponseElement[];
export const AssociateResourcesResponseList = S.Array(
  AssociateResourceResponseElement,
);
export interface BatchAssociateResourcesToCustomLineItemOutput {
  SuccessfullyAssociatedResources?: AssociateResourceResponseElement[];
  FailedAssociatedResources?: AssociateResourceResponseElement[];
}
export const BatchAssociateResourcesToCustomLineItemOutput = S.suspend(() =>
  S.Struct({
    SuccessfullyAssociatedResources: S.optional(AssociateResourcesResponseList),
    FailedAssociatedResources: S.optional(AssociateResourcesResponseList),
  }),
).annotate({
  identifier: "BatchAssociateResourcesToCustomLineItemOutput",
}) as any as S.Schema<BatchAssociateResourcesToCustomLineItemOutput>;
export type CustomLineItemBatchDisassociationsList = string[];
export const CustomLineItemBatchDisassociationsList = S.Array(S.String);
export interface BatchDisassociateResourcesFromCustomLineItemInput {
  TargetArn: string;
  ResourceArns: string[];
  BillingPeriodRange?: CustomLineItemBillingPeriodRange;
}
export const BatchDisassociateResourcesFromCustomLineItemInput = S.suspend(() =>
  S.Struct({
    TargetArn: S.String,
    ResourceArns: CustomLineItemBatchDisassociationsList,
    BillingPeriodRange: S.optional(CustomLineItemBillingPeriodRange),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/batch-disassociate-resources-from-custom-line-item",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchDisassociateResourcesFromCustomLineItemInput",
}) as any as S.Schema<BatchDisassociateResourcesFromCustomLineItemInput>;
export interface DisassociateResourceResponseElement {
  Arn?: string;
  Error?: AssociateResourceError;
}
export const DisassociateResourceResponseElement = S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Error: S.optional(AssociateResourceError),
  }),
).annotate({
  identifier: "DisassociateResourceResponseElement",
}) as any as S.Schema<DisassociateResourceResponseElement>;
export type DisassociateResourcesResponseList =
  DisassociateResourceResponseElement[];
export const DisassociateResourcesResponseList = S.Array(
  DisassociateResourceResponseElement,
);
export interface BatchDisassociateResourcesFromCustomLineItemOutput {
  SuccessfullyDisassociatedResources?: DisassociateResourceResponseElement[];
  FailedDisassociatedResources?: DisassociateResourceResponseElement[];
}
export const BatchDisassociateResourcesFromCustomLineItemOutput = S.suspend(
  () =>
    S.Struct({
      SuccessfullyDisassociatedResources: S.optional(
        DisassociateResourcesResponseList,
      ),
      FailedDisassociatedResources: S.optional(
        DisassociateResourcesResponseList,
      ),
    }),
).annotate({
  identifier: "BatchDisassociateResourcesFromCustomLineItemOutput",
}) as any as S.Schema<BatchDisassociateResourcesFromCustomLineItemOutput>;
export interface ListCustomLineItemVersionsBillingPeriodRangeFilter {
  StartBillingPeriod?: string;
  EndBillingPeriod?: string;
}
export const ListCustomLineItemVersionsBillingPeriodRangeFilter = S.suspend(
  () =>
    S.Struct({
      StartBillingPeriod: S.optional(S.String),
      EndBillingPeriod: S.optional(S.String),
    }),
).annotate({
  identifier: "ListCustomLineItemVersionsBillingPeriodRangeFilter",
}) as any as S.Schema<ListCustomLineItemVersionsBillingPeriodRangeFilter>;
export interface ListCustomLineItemVersionsFilter {
  BillingPeriodRange?: ListCustomLineItemVersionsBillingPeriodRangeFilter;
}
export const ListCustomLineItemVersionsFilter = S.suspend(() =>
  S.Struct({
    BillingPeriodRange: S.optional(
      ListCustomLineItemVersionsBillingPeriodRangeFilter,
    ),
  }),
).annotate({
  identifier: "ListCustomLineItemVersionsFilter",
}) as any as S.Schema<ListCustomLineItemVersionsFilter>;
export interface ListCustomLineItemVersionsInput {
  Arn: string;
  MaxResults?: number;
  NextToken?: string;
  Filters?: ListCustomLineItemVersionsFilter;
}
export const ListCustomLineItemVersionsInput = S.suspend(() =>
  S.Struct({
    Arn: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filters: S.optional(ListCustomLineItemVersionsFilter),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-custom-line-item-versions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCustomLineItemVersionsInput",
}) as any as S.Schema<ListCustomLineItemVersionsInput>;
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
export const CustomLineItemVersionListElement = S.suspend(() =>
  S.Struct({
    Name: S.optional(SensitiveString),
    ChargeDetails: S.optional(ListCustomLineItemChargeDetails),
    CurrencyCode: S.optional(CurrencyCode),
    Description: S.optional(SensitiveString),
    ProductCode: S.optional(S.String),
    BillingGroupArn: S.optional(S.String),
    CreationTime: S.optional(S.Number),
    LastModifiedTime: S.optional(S.Number),
    AssociationSize: S.optional(S.Number),
    StartBillingPeriod: S.optional(S.String),
    EndBillingPeriod: S.optional(S.String),
    Arn: S.optional(S.String),
    StartTime: S.optional(S.Number),
    AccountId: S.optional(S.String),
    ComputationRule: S.optional(ComputationRuleEnum),
    PresentationDetails: S.optional(PresentationObject),
  }),
).annotate({
  identifier: "CustomLineItemVersionListElement",
}) as any as S.Schema<CustomLineItemVersionListElement>;
export type CustomLineItemVersionList = CustomLineItemVersionListElement[];
export const CustomLineItemVersionList = S.Array(
  CustomLineItemVersionListElement,
);
export interface ListCustomLineItemVersionsOutput {
  CustomLineItemVersions?: CustomLineItemVersionListElement[];
  NextToken?: string;
}
export const ListCustomLineItemVersionsOutput = S.suspend(() =>
  S.Struct({
    CustomLineItemVersions: S.optional(CustomLineItemVersionList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCustomLineItemVersionsOutput",
}) as any as S.Schema<ListCustomLineItemVersionsOutput>;
export type CustomLineItemRelationship = "PARENT" | "CHILD" | (string & {});
export const CustomLineItemRelationship = S.String;
export interface ListResourcesAssociatedToCustomLineItemFilter {
  Relationship?: CustomLineItemRelationship;
}
export const ListResourcesAssociatedToCustomLineItemFilter = S.suspend(() =>
  S.Struct({ Relationship: S.optional(CustomLineItemRelationship) }),
).annotate({
  identifier: "ListResourcesAssociatedToCustomLineItemFilter",
}) as any as S.Schema<ListResourcesAssociatedToCustomLineItemFilter>;
export interface ListResourcesAssociatedToCustomLineItemInput {
  BillingPeriod?: string;
  Arn: string;
  MaxResults?: number;
  NextToken?: string;
  Filters?: ListResourcesAssociatedToCustomLineItemFilter;
}
export const ListResourcesAssociatedToCustomLineItemInput = S.suspend(() =>
  S.Struct({
    BillingPeriod: S.optional(S.String),
    Arn: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filters: S.optional(ListResourcesAssociatedToCustomLineItemFilter),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/list-resources-associated-to-custom-line-item",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListResourcesAssociatedToCustomLineItemInput",
}) as any as S.Schema<ListResourcesAssociatedToCustomLineItemInput>;
export interface ListResourcesAssociatedToCustomLineItemResponseElement {
  Arn?: string;
  Relationship?: CustomLineItemRelationship;
  EndBillingPeriod?: string;
}
export const ListResourcesAssociatedToCustomLineItemResponseElement = S.suspend(
  () =>
    S.Struct({
      Arn: S.optional(S.String),
      Relationship: S.optional(CustomLineItemRelationship),
      EndBillingPeriod: S.optional(S.String),
    }),
).annotate({
  identifier: "ListResourcesAssociatedToCustomLineItemResponseElement",
}) as any as S.Schema<ListResourcesAssociatedToCustomLineItemResponseElement>;
export type ListResourcesAssociatedToCustomLineItemResponseList =
  ListResourcesAssociatedToCustomLineItemResponseElement[];
export const ListResourcesAssociatedToCustomLineItemResponseList = S.Array(
  ListResourcesAssociatedToCustomLineItemResponseElement,
);
export interface ListResourcesAssociatedToCustomLineItemOutput {
  Arn?: string;
  AssociatedResources?: ListResourcesAssociatedToCustomLineItemResponseElement[];
  NextToken?: string;
}
export const ListResourcesAssociatedToCustomLineItemOutput = S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    AssociatedResources: S.optional(
      ListResourcesAssociatedToCustomLineItemResponseList,
    ),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListResourcesAssociatedToCustomLineItemOutput",
}) as any as S.Schema<ListResourcesAssociatedToCustomLineItemOutput>;
export type PricingRuleArnsInput = string[];
export const PricingRuleArnsInput = S.Array(S.String);
export interface CreatePricingPlanInput {
  ClientToken?: string;
  Name: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  PricingRuleArns?: string[];
  Tags?: { [key: string]: string | undefined };
}
export const CreatePricingPlanInput = S.suspend(() =>
  S.Struct({
    ClientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Client-Token"),
      T.IdempotencyToken(),
    ),
    Name: SensitiveString,
    Description: S.optional(SensitiveString),
    PricingRuleArns: S.optional(PricingRuleArnsInput),
    Tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/create-pricing-plan" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePricingPlanInput",
}) as any as S.Schema<CreatePricingPlanInput>;
export interface CreatePricingPlanOutput {
  Arn?: string;
}
export const CreatePricingPlanOutput = S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }),
).annotate({
  identifier: "CreatePricingPlanOutput",
}) as any as S.Schema<CreatePricingPlanOutput>;
export interface UpdatePricingPlanInput {
  Arn: string;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
}
export const UpdatePricingPlanInput = S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Name: S.optional(SensitiveString),
    Description: S.optional(SensitiveString),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/update-pricing-plan" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdatePricingPlanInput",
}) as any as S.Schema<UpdatePricingPlanInput>;
export interface UpdatePricingPlanOutput {
  Arn?: string;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  Size?: number;
  LastModifiedTime?: number;
}
export const UpdatePricingPlanOutput = S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Name: S.optional(SensitiveString),
    Description: S.optional(SensitiveString),
    Size: S.optional(S.Number),
    LastModifiedTime: S.optional(S.Number),
  }),
).annotate({
  identifier: "UpdatePricingPlanOutput",
}) as any as S.Schema<UpdatePricingPlanOutput>;
export interface DeletePricingPlanInput {
  Arn: string;
}
export const DeletePricingPlanInput = S.suspend(() =>
  S.Struct({ Arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/delete-pricing-plan" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePricingPlanInput",
}) as any as S.Schema<DeletePricingPlanInput>;
export interface DeletePricingPlanOutput {
  Arn?: string;
}
export const DeletePricingPlanOutput = S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }),
).annotate({
  identifier: "DeletePricingPlanOutput",
}) as any as S.Schema<DeletePricingPlanOutput>;
export type PricingPlanArns = string[];
export const PricingPlanArns = S.Array(S.String);
export interface ListPricingPlansFilter {
  Arns?: string[];
}
export const ListPricingPlansFilter = S.suspend(() =>
  S.Struct({ Arns: S.optional(PricingPlanArns) }),
).annotate({
  identifier: "ListPricingPlansFilter",
}) as any as S.Schema<ListPricingPlansFilter>;
export interface ListPricingPlansInput {
  BillingPeriod?: string;
  Filters?: ListPricingPlansFilter;
  MaxResults?: number;
  NextToken?: string;
}
export const ListPricingPlansInput = S.suspend(() =>
  S.Struct({
    BillingPeriod: S.optional(S.String),
    Filters: S.optional(ListPricingPlansFilter),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-pricing-plans" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPricingPlansInput",
}) as any as S.Schema<ListPricingPlansInput>;
export interface PricingPlanListElement {
  Name?: string | redacted.Redacted<string>;
  Arn?: string;
  Description?: string | redacted.Redacted<string>;
  Size?: number;
  CreationTime?: number;
  LastModifiedTime?: number;
}
export const PricingPlanListElement = S.suspend(() =>
  S.Struct({
    Name: S.optional(SensitiveString),
    Arn: S.optional(S.String),
    Description: S.optional(SensitiveString),
    Size: S.optional(S.Number),
    CreationTime: S.optional(S.Number),
    LastModifiedTime: S.optional(S.Number),
  }),
).annotate({
  identifier: "PricingPlanListElement",
}) as any as S.Schema<PricingPlanListElement>;
export type PricingPlanList = PricingPlanListElement[];
export const PricingPlanList = S.Array(PricingPlanListElement);
export interface ListPricingPlansOutput {
  BillingPeriod?: string;
  PricingPlans?: PricingPlanListElement[];
  NextToken?: string;
}
export const ListPricingPlansOutput = S.suspend(() =>
  S.Struct({
    BillingPeriod: S.optional(S.String),
    PricingPlans: S.optional(PricingPlanList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPricingPlansOutput",
}) as any as S.Schema<ListPricingPlansOutput>;
export type PricingRuleArnsNonEmptyInput = string[];
export const PricingRuleArnsNonEmptyInput = S.Array(S.String);
export interface AssociatePricingRulesInput {
  Arn: string;
  PricingRuleArns: string[];
}
export const AssociatePricingRulesInput = S.suspend(() =>
  S.Struct({
    Arn: S.String,
    PricingRuleArns: PricingRuleArnsNonEmptyInput,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/associate-pricing-rules" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociatePricingRulesInput",
}) as any as S.Schema<AssociatePricingRulesInput>;
export interface AssociatePricingRulesOutput {
  Arn?: string;
}
export const AssociatePricingRulesOutput = S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }),
).annotate({
  identifier: "AssociatePricingRulesOutput",
}) as any as S.Schema<AssociatePricingRulesOutput>;
export interface DisassociatePricingRulesInput {
  Arn: string;
  PricingRuleArns: string[];
}
export const DisassociatePricingRulesInput = S.suspend(() =>
  S.Struct({
    Arn: S.String,
    PricingRuleArns: PricingRuleArnsNonEmptyInput,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/disassociate-pricing-rules" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociatePricingRulesInput",
}) as any as S.Schema<DisassociatePricingRulesInput>;
export interface DisassociatePricingRulesOutput {
  Arn?: string;
}
export const DisassociatePricingRulesOutput = S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }),
).annotate({
  identifier: "DisassociatePricingRulesOutput",
}) as any as S.Schema<DisassociatePricingRulesOutput>;
export interface ListPricingPlansAssociatedWithPricingRuleInput {
  BillingPeriod?: string;
  PricingRuleArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListPricingPlansAssociatedWithPricingRuleInput = S.suspend(() =>
  S.Struct({
    BillingPeriod: S.optional(S.String),
    PricingRuleArn: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/list-pricing-plans-associated-with-pricing-rule",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPricingPlansAssociatedWithPricingRuleInput",
}) as any as S.Schema<ListPricingPlansAssociatedWithPricingRuleInput>;
export interface ListPricingPlansAssociatedWithPricingRuleOutput {
  BillingPeriod?: string;
  PricingRuleArn?: string;
  PricingPlanArns?: string[];
  NextToken?: string;
}
export const ListPricingPlansAssociatedWithPricingRuleOutput = S.suspend(() =>
  S.Struct({
    BillingPeriod: S.optional(S.String),
    PricingRuleArn: S.optional(S.String),
    PricingPlanArns: S.optional(PricingPlanArns),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPricingPlansAssociatedWithPricingRuleOutput",
}) as any as S.Schema<ListPricingPlansAssociatedWithPricingRuleOutput>;
export type PricingRuleScope =
  | "GLOBAL"
  | "SERVICE"
  | "BILLING_ENTITY"
  | "SKU"
  | (string & {});
export const PricingRuleScope = S.String;
export type PricingRuleType = "MARKUP" | "DISCOUNT" | "TIERING" | (string & {});
export const PricingRuleType = S.String;
export interface CreateFreeTierConfig {
  Activated: boolean;
}
export const CreateFreeTierConfig = S.suspend(() =>
  S.Struct({ Activated: S.Boolean }),
).annotate({
  identifier: "CreateFreeTierConfig",
}) as any as S.Schema<CreateFreeTierConfig>;
export interface CreateTieringInput {
  FreeTier: CreateFreeTierConfig;
}
export const CreateTieringInput = S.suspend(() =>
  S.Struct({ FreeTier: CreateFreeTierConfig }),
).annotate({
  identifier: "CreateTieringInput",
}) as any as S.Schema<CreateTieringInput>;
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
export const CreatePricingRuleInput = S.suspend(() =>
  S.Struct({
    ClientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Client-Token"),
      T.IdempotencyToken(),
    ),
    Name: SensitiveString,
    Description: S.optional(SensitiveString),
    Scope: PricingRuleScope,
    Type: PricingRuleType,
    ModifierPercentage: S.optional(S.Number),
    Service: S.optional(S.String),
    Tags: S.optional(TagMap),
    BillingEntity: S.optional(S.String),
    Tiering: S.optional(CreateTieringInput),
    UsageType: S.optional(S.String),
    Operation: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/create-pricing-rule" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePricingRuleInput",
}) as any as S.Schema<CreatePricingRuleInput>;
export interface CreatePricingRuleOutput {
  Arn?: string;
}
export const CreatePricingRuleOutput = S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }),
).annotate({
  identifier: "CreatePricingRuleOutput",
}) as any as S.Schema<CreatePricingRuleOutput>;
export interface UpdateFreeTierConfig {
  Activated: boolean;
}
export const UpdateFreeTierConfig = S.suspend(() =>
  S.Struct({ Activated: S.Boolean }),
).annotate({
  identifier: "UpdateFreeTierConfig",
}) as any as S.Schema<UpdateFreeTierConfig>;
export interface UpdateTieringInput {
  FreeTier: UpdateFreeTierConfig;
}
export const UpdateTieringInput = S.suspend(() =>
  S.Struct({ FreeTier: UpdateFreeTierConfig }),
).annotate({
  identifier: "UpdateTieringInput",
}) as any as S.Schema<UpdateTieringInput>;
export interface UpdatePricingRuleInput {
  Arn: string;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  Type?: PricingRuleType;
  ModifierPercentage?: number;
  Tiering?: UpdateTieringInput;
}
export const UpdatePricingRuleInput = S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Name: S.optional(SensitiveString),
    Description: S.optional(SensitiveString),
    Type: S.optional(PricingRuleType),
    ModifierPercentage: S.optional(S.Number),
    Tiering: S.optional(UpdateTieringInput),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/update-pricing-rule" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdatePricingRuleInput",
}) as any as S.Schema<UpdatePricingRuleInput>;
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
export const UpdatePricingRuleOutput = S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Name: S.optional(SensitiveString),
    Description: S.optional(SensitiveString),
    Scope: S.optional(PricingRuleScope),
    Type: S.optional(PricingRuleType),
    ModifierPercentage: S.optional(S.Number),
    Service: S.optional(S.String),
    AssociatedPricingPlanCount: S.optional(S.Number),
    LastModifiedTime: S.optional(S.Number),
    BillingEntity: S.optional(S.String),
    Tiering: S.optional(UpdateTieringInput),
    UsageType: S.optional(S.String),
    Operation: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdatePricingRuleOutput",
}) as any as S.Schema<UpdatePricingRuleOutput>;
export interface DeletePricingRuleInput {
  Arn: string;
}
export const DeletePricingRuleInput = S.suspend(() =>
  S.Struct({ Arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/delete-pricing-rule" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePricingRuleInput",
}) as any as S.Schema<DeletePricingRuleInput>;
export interface DeletePricingRuleOutput {
  Arn?: string;
}
export const DeletePricingRuleOutput = S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }),
).annotate({
  identifier: "DeletePricingRuleOutput",
}) as any as S.Schema<DeletePricingRuleOutput>;
export type PricingRuleArns = string[];
export const PricingRuleArns = S.Array(S.String);
export interface ListPricingRulesFilter {
  Arns?: string[];
}
export const ListPricingRulesFilter = S.suspend(() =>
  S.Struct({ Arns: S.optional(PricingRuleArns) }),
).annotate({
  identifier: "ListPricingRulesFilter",
}) as any as S.Schema<ListPricingRulesFilter>;
export interface ListPricingRulesInput {
  BillingPeriod?: string;
  Filters?: ListPricingRulesFilter;
  MaxResults?: number;
  NextToken?: string;
}
export const ListPricingRulesInput = S.suspend(() =>
  S.Struct({
    BillingPeriod: S.optional(S.String),
    Filters: S.optional(ListPricingRulesFilter),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-pricing-rules" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPricingRulesInput",
}) as any as S.Schema<ListPricingRulesInput>;
export interface FreeTierConfig {
  Activated: boolean;
}
export const FreeTierConfig = S.suspend(() =>
  S.Struct({ Activated: S.Boolean }),
).annotate({ identifier: "FreeTierConfig" }) as any as S.Schema<FreeTierConfig>;
export interface Tiering {
  FreeTier: FreeTierConfig;
}
export const Tiering = S.suspend(() =>
  S.Struct({ FreeTier: FreeTierConfig }),
).annotate({ identifier: "Tiering" }) as any as S.Schema<Tiering>;
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
export const PricingRuleListElement = S.suspend(() =>
  S.Struct({
    Name: S.optional(SensitiveString),
    Arn: S.optional(S.String),
    Description: S.optional(SensitiveString),
    Scope: S.optional(PricingRuleScope),
    Type: S.optional(PricingRuleType),
    ModifierPercentage: S.optional(S.Number),
    Service: S.optional(S.String),
    AssociatedPricingPlanCount: S.optional(S.Number),
    CreationTime: S.optional(S.Number),
    LastModifiedTime: S.optional(S.Number),
    BillingEntity: S.optional(S.String),
    Tiering: S.optional(Tiering),
    UsageType: S.optional(S.String),
    Operation: S.optional(S.String),
  }),
).annotate({
  identifier: "PricingRuleListElement",
}) as any as S.Schema<PricingRuleListElement>;
export type PricingRuleList = PricingRuleListElement[];
export const PricingRuleList = S.Array(PricingRuleListElement);
export interface ListPricingRulesOutput {
  BillingPeriod?: string;
  PricingRules?: PricingRuleListElement[];
  NextToken?: string;
}
export const ListPricingRulesOutput = S.suspend(() =>
  S.Struct({
    BillingPeriod: S.optional(S.String),
    PricingRules: S.optional(PricingRuleList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPricingRulesOutput",
}) as any as S.Schema<ListPricingRulesOutput>;
export interface ListPricingRulesAssociatedToPricingPlanInput {
  BillingPeriod?: string;
  PricingPlanArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListPricingRulesAssociatedToPricingPlanInput = S.suspend(() =>
  S.Struct({
    BillingPeriod: S.optional(S.String),
    PricingPlanArn: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/list-pricing-rules-associated-to-pricing-plan",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPricingRulesAssociatedToPricingPlanInput",
}) as any as S.Schema<ListPricingRulesAssociatedToPricingPlanInput>;
export interface ListPricingRulesAssociatedToPricingPlanOutput {
  BillingPeriod?: string;
  PricingPlanArn?: string;
  PricingRuleArns?: string[];
  NextToken?: string;
}
export const ListPricingRulesAssociatedToPricingPlanOutput = S.suspend(() =>
  S.Struct({
    BillingPeriod: S.optional(S.String),
    PricingPlanArn: S.optional(S.String),
    PricingRuleArns: S.optional(PricingRuleArns),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPricingRulesAssociatedToPricingPlanOutput",
}) as any as S.Schema<ListPricingRulesAssociatedToPricingPlanOutput>;

//# Errors
export class AccessDeniedException extends S.TaggedErrorClass<AccessDeniedException>()(
  "AccessDeniedException",
  { Message: S.String },
).pipe(C.withAuthError) {}
export class InternalServerException extends S.TaggedErrorClass<InternalServerException>()(
  "InternalServerException",
  {
    Message: S.String,
    RetryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
  },
).pipe(C.withServerError) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { Message: S.String, ResourceId: S.String, ResourceType: S.String },
).pipe(C.withBadRequestError) {}
export class ThrottlingException extends S.TaggedErrorClass<ThrottlingException>()(
  "ThrottlingException",
  {
    Message: S.String,
    RetryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
  },
).pipe(C.withThrottlingError) {}
export class ValidationException extends S.TaggedErrorClass<ValidationException>()(
  "ValidationException",
  {
    Message: S.String,
    Reason: S.optional(ValidationExceptionReason),
    Fields: S.optional(ValidationExceptionFieldList),
  },
).pipe(C.withBadRequestError) {}
export class ConflictException extends S.TaggedErrorClass<ConflictException>()(
  "ConflictException",
  {
    Message: S.String,
    ResourceId: S.String,
    ResourceType: S.String,
    Reason: S.optional(ConflictExceptionReason),
  },
).pipe(C.withConflictError) {}
export class ServiceLimitExceededException extends S.TaggedErrorClass<ServiceLimitExceededException>()(
  "ServiceLimitExceededException",
  {
    Message: S.String,
    ResourceId: S.optional(S.String),
    ResourceType: S.optional(S.String),
    LimitCode: S.String,
    ServiceCode: S.String,
  },
).pipe(C.withQuotaError) {}

//# Operations
/**
 * Retrieves the margin summary report, which includes the Amazon Web Services cost and charged amount (pro forma cost) by Amazon Web Services service for a specific billing group.
 */
export const getBillingGroupCostReport: API.OperationMethod<
  GetBillingGroupCostReportInput,
  GetBillingGroupCostReportOutput,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: GetBillingGroupCostReportInput,
  ) => stream.Stream<
    GetBillingGroupCostReportOutput,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: GetBillingGroupCostReportInput,
  ) => stream.Stream<
    BillingGroupCostReportResultElement,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: GetBillingGroupCostReportInput,
  output: GetBillingGroupCostReportOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BillingGroupCostReportResults",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * This is a paginated call to list linked accounts that are linked to the payer account for the specified time period. If no information is provided, the current billing period is used. The response will optionally include the billing group that's associated with the linked account.
 */
export const listAccountAssociations: API.OperationMethod<
  ListAccountAssociationsInput,
  ListAccountAssociationsOutput,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListAccountAssociationsInput,
  ) => stream.Stream<
    ListAccountAssociationsOutput,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListAccountAssociationsInput,
  ) => stream.Stream<
    AccountAssociationsListElement,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAccountAssociationsInput,
  output: ListAccountAssociationsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "LinkedAccounts",
  } as const,
}));
/**
 * A paginated call to retrieve a summary report of actual Amazon Web Services charges and the calculated Amazon Web Services charges based on the associated pricing plan of a billing group.
 */
export const listBillingGroupCostReports: API.OperationMethod<
  ListBillingGroupCostReportsInput,
  ListBillingGroupCostReportsOutput,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListBillingGroupCostReportsInput,
  ) => stream.Stream<
    ListBillingGroupCostReportsOutput,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListBillingGroupCostReportsInput,
  ) => stream.Stream<
    BillingGroupCostReportElement,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListBillingGroupCostReportsInput,
  output: ListBillingGroupCostReportsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BillingGroupCostReports",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * A list the tags for a resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Associates the specified tags to a resource with the specified `resourceArn`. If existing tags on a resource are not specified in the request parameters, they are not changed.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes specified tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Creates a billing group that resembles a consolidated billing family that Amazon Web Services charges, based off of the predefined pricing plan computation.
 */
export const createBillingGroup: API.OperationMethod<
  CreateBillingGroupInput,
  CreateBillingGroupOutput,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceLimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateBillingGroupInput,
  output: CreateBillingGroupOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceLimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * This updates an existing billing group.
 */
export const updateBillingGroup: API.OperationMethod<
  UpdateBillingGroupInput,
  UpdateBillingGroupOutput,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateBillingGroupInput,
  output: UpdateBillingGroupOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes a billing group.
 */
export const deleteBillingGroup: API.OperationMethod<
  DeleteBillingGroupInput,
  DeleteBillingGroupOutput,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteBillingGroupInput,
  output: DeleteBillingGroupOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * A paginated call to retrieve a list of billing groups for the given billing period. If you don't provide a billing group, the current billing period is used.
 */
export const listBillingGroups: API.OperationMethod<
  ListBillingGroupsInput,
  ListBillingGroupsOutput,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListBillingGroupsInput,
  ) => stream.Stream<
    ListBillingGroupsOutput,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListBillingGroupsInput,
  ) => stream.Stream<
    BillingGroupListElement,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListBillingGroupsInput,
  output: ListBillingGroupsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BillingGroups",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Connects an array of account IDs in a consolidated billing family to a predefined billing group. The account IDs must be a part of the consolidated billing family during the current month, and not already associated with another billing group. The maximum number of accounts that can be associated in one call is 30.
 */
export const associateAccounts: API.OperationMethod<
  AssociateAccountsInput,
  AssociateAccountsOutput,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceLimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AssociateAccountsInput,
  output: AssociateAccountsOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceLimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Removes the specified list of account IDs from the given billing group.
 */
export const disassociateAccounts: API.OperationMethod<
  DisassociateAccountsInput,
  DisassociateAccountsOutput,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisassociateAccountsInput,
  output: DisassociateAccountsOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Creates a custom line item that can be used to create a one-time fixed charge that can be applied to a single billing group for the current or previous billing period. The one-time fixed charge is either a fee or discount.
 */
export const createCustomLineItem: API.OperationMethod<
  CreateCustomLineItemInput,
  CreateCustomLineItemOutput,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceLimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCustomLineItemInput,
  output: CreateCustomLineItemOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceLimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Update an existing custom line item in the current or previous billing period.
 */
export const updateCustomLineItem: API.OperationMethod<
  UpdateCustomLineItemInput,
  UpdateCustomLineItemOutput,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateCustomLineItemInput,
  output: UpdateCustomLineItemOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes the custom line item identified by the given ARN in the current, or previous billing period.
 */
export const deleteCustomLineItem: API.OperationMethod<
  DeleteCustomLineItemInput,
  DeleteCustomLineItemOutput,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteCustomLineItemInput,
  output: DeleteCustomLineItemOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * A paginated call to get a list of all custom line items (FFLIs) for the given billing period. If you don't provide a billing period, the current billing period is used.
 */
export const listCustomLineItems: API.OperationMethod<
  ListCustomLineItemsInput,
  ListCustomLineItemsOutput,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListCustomLineItemsInput,
  ) => stream.Stream<
    ListCustomLineItemsOutput,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListCustomLineItemsInput,
  ) => stream.Stream<
    CustomLineItemListElement,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCustomLineItemsInput,
  output: ListCustomLineItemsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CustomLineItems",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Associates a batch of resources to a percentage custom line item.
 */
export const batchAssociateResourcesToCustomLineItem: API.OperationMethod<
  BatchAssociateResourcesToCustomLineItemInput,
  BatchAssociateResourcesToCustomLineItemOutput,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceLimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchAssociateResourcesToCustomLineItemInput,
  output: BatchAssociateResourcesToCustomLineItemOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceLimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Disassociates a batch of resources from a percentage custom line item.
 */
export const batchDisassociateResourcesFromCustomLineItem: API.OperationMethod<
  BatchDisassociateResourcesFromCustomLineItemInput,
  BatchDisassociateResourcesFromCustomLineItemOutput,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchDisassociateResourcesFromCustomLineItemInput,
  output: BatchDisassociateResourcesFromCustomLineItemOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * A paginated call to get a list of all custom line item versions.
 */
export const listCustomLineItemVersions: API.OperationMethod<
  ListCustomLineItemVersionsInput,
  ListCustomLineItemVersionsOutput,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListCustomLineItemVersionsInput,
  ) => stream.Stream<
    ListCustomLineItemVersionsOutput,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListCustomLineItemVersionsInput,
  ) => stream.Stream<
    CustomLineItemVersionListElement,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCustomLineItemVersionsInput,
  output: ListCustomLineItemVersionsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CustomLineItemVersions",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * List the resources that are associated to a custom line item.
 */
export const listResourcesAssociatedToCustomLineItem: API.OperationMethod<
  ListResourcesAssociatedToCustomLineItemInput,
  ListResourcesAssociatedToCustomLineItemOutput,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListResourcesAssociatedToCustomLineItemInput,
  ) => stream.Stream<
    ListResourcesAssociatedToCustomLineItemOutput,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListResourcesAssociatedToCustomLineItemInput,
  ) => stream.Stream<
    ListResourcesAssociatedToCustomLineItemResponseElement,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListResourcesAssociatedToCustomLineItemInput,
  output: ListResourcesAssociatedToCustomLineItemOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AssociatedResources",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Creates a pricing plan that is used for computing Amazon Web Services charges for billing groups.
 */
export const createPricingPlan: API.OperationMethod<
  CreatePricingPlanInput,
  CreatePricingPlanOutput,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceLimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreatePricingPlanInput,
  output: CreatePricingPlanOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceLimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * This updates an existing pricing plan.
 */
export const updatePricingPlan: API.OperationMethod<
  UpdatePricingPlanInput,
  UpdatePricingPlanOutput,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdatePricingPlanInput,
  output: UpdatePricingPlanOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes a pricing plan. The pricing plan must not be associated with any billing groups to delete successfully.
 */
export const deletePricingPlan: API.OperationMethod<
  DeletePricingPlanInput,
  DeletePricingPlanOutput,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeletePricingPlanInput,
  output: DeletePricingPlanOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * A paginated call to get pricing plans for the given billing period. If you don't provide a billing period, the current billing period is used.
 */
export const listPricingPlans: API.OperationMethod<
  ListPricingPlansInput,
  ListPricingPlansOutput,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListPricingPlansInput,
  ) => stream.Stream<
    ListPricingPlansOutput,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListPricingPlansInput,
  ) => stream.Stream<
    PricingPlanListElement,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPricingPlansInput,
  output: ListPricingPlansOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PricingPlans",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Connects an array of `PricingRuleArns` to a defined `PricingPlan`. The maximum number `PricingRuleArn` that can be associated in one call is 30.
 */
export const associatePricingRules: API.OperationMethod<
  AssociatePricingRulesInput,
  AssociatePricingRulesOutput,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceLimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AssociatePricingRulesInput,
  output: AssociatePricingRulesOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceLimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Disassociates a list of pricing rules from a pricing plan.
 */
export const disassociatePricingRules: API.OperationMethod<
  DisassociatePricingRulesInput,
  DisassociatePricingRulesOutput,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisassociatePricingRulesInput,
  output: DisassociatePricingRulesOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * A list of the pricing plans that are associated with a pricing rule.
 */
export const listPricingPlansAssociatedWithPricingRule: API.OperationMethod<
  ListPricingPlansAssociatedWithPricingRuleInput,
  ListPricingPlansAssociatedWithPricingRuleOutput,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListPricingPlansAssociatedWithPricingRuleInput,
  ) => stream.Stream<
    ListPricingPlansAssociatedWithPricingRuleOutput,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListPricingPlansAssociatedWithPricingRuleInput,
  ) => stream.Stream<
    PricingPlanArn,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPricingPlansAssociatedWithPricingRuleInput,
  output: ListPricingPlansAssociatedWithPricingRuleOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PricingPlanArns",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Creates a pricing rule can be associated to a pricing plan, or a set of pricing plans.
 */
export const createPricingRule: API.OperationMethod<
  CreatePricingRuleInput,
  CreatePricingRuleOutput,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceLimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreatePricingRuleInput,
  output: CreatePricingRuleOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceLimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Updates an existing pricing rule.
 */
export const updatePricingRule: API.OperationMethod<
  UpdatePricingRuleInput,
  UpdatePricingRuleOutput,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdatePricingRuleInput,
  output: UpdatePricingRuleOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes the pricing rule that's identified by the input Amazon Resource Name (ARN).
 */
export const deletePricingRule: API.OperationMethod<
  DeletePricingRuleInput,
  DeletePricingRuleOutput,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeletePricingRuleInput,
  output: DeletePricingRuleOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Describes a pricing rule that can be associated to a pricing plan, or set of pricing plans.
 */
export const listPricingRules: API.OperationMethod<
  ListPricingRulesInput,
  ListPricingRulesOutput,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListPricingRulesInput,
  ) => stream.Stream<
    ListPricingRulesOutput,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListPricingRulesInput,
  ) => stream.Stream<
    PricingRuleListElement,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPricingRulesInput,
  output: ListPricingRulesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PricingRules",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Lists the pricing rules that are associated with a pricing plan.
 */
export const listPricingRulesAssociatedToPricingPlan: API.OperationMethod<
  ListPricingRulesAssociatedToPricingPlanInput,
  ListPricingRulesAssociatedToPricingPlanOutput,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListPricingRulesAssociatedToPricingPlanInput,
  ) => stream.Stream<
    ListPricingRulesAssociatedToPricingPlanOutput,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListPricingRulesAssociatedToPricingPlanInput,
  ) => stream.Stream<
    PricingRuleArn,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPricingRulesAssociatedToPricingPlanInput,
  output: ListPricingRulesAssociatedToPricingPlanOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PricingRuleArns",
    pageSize: "MaxResults",
  } as const,
}));
