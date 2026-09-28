import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
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
  sdkId: "License Manager",
  target: "AWSLicenseManager",
  version: "2018-08-01",
  sigv4: "license-manager",
  protocol: awsJson1_1Protocol,
  xmlns: "https://license-manager.amazonaws.com/doc/2018_08_01",
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
                `https://license-manager-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://license-manager-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://license-manager.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://license-manager.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    code: "ServiceAccessDenied",
    status: 401,
  })<{ readonly message?: string }> {}
export class AuthorizationException
  extends /*@__PURE__*/ TE.TaggedError(
    "AuthorizationException",
    ["AuthError"],
    { code: "AuthorizationFailure", status: 403 },
  )<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class EntitlementNotAllowedException
  extends /*@__PURE__*/ TE.TaggedError(
    "EntitlementNotAllowedException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class FailedDependencyException
  extends /*@__PURE__*/ TE.TaggedError("FailedDependencyException", [], {
    code: "FailedDependency",
    status: 424,
  })<{ readonly message?: string; readonly ErrorCode?: string }> {}
export class FilterLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "FilterLimitExceededException",
    ["BadRequestError"],
    { code: "FilterLimitExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidParameterValueException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterValueException",
    ["BadRequestError"],
    { code: "InvalidParameterValueProvided", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidResourceStateException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidResourceStateException",
    ["BadRequestError"],
    { code: "InvalidResourceState", status: 400 },
  )<{ readonly message?: string }> {}
export class LicenseConfigurationNotFound
  extends /*@__PURE__*/ TE.TaggedError(
    "LicenseConfigurationNotFound",
    ["NotFoundError"],
    {
      synthetic: {
        from: "InvalidParameterValueException",
        message: { includes: "Invalid license configuration ARN" },
      },
    },
  )<{ readonly message?: string }> {}
export class LicenseUsageException
  extends /*@__PURE__*/ TE.TaggedError("LicenseUsageException", [], {
    code: "LicenseUsageFailure",
    status: 412,
  })<{ readonly message?: string }> {}
export class NoEntitlementsAllowedException
  extends /*@__PURE__*/ TE.TaggedError(
    "NoEntitlementsAllowedException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class RateLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "RateLimitExceededException",
    ["ThrottlingError"],
    { code: "RateLimitExceeded", status: 429 },
  )<{ readonly message?: string }> {}
export class RedirectException
  extends /*@__PURE__*/ TE.TaggedError("RedirectException", [], {
    status: 308,
    headers: { Location: "Location" },
  })<{ readonly Location?: string; readonly message?: string }> {}
export class ResourceLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceLimitExceededException",
    ["BadRequestError"],
    { code: "ResourceLimitExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { code: "InvalidResource.NotFound", status: 400 },
  )<{ readonly message?: string }> {}
export class ServerInternalException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServerInternalException",
    ["ServerError"],
    { code: "InternalError", status: 500 },
  )<{ readonly message?: string }> {}
export class UnsupportedDigitalSignatureMethodException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedDigitalSignatureMethodException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type Arn = string;
export interface AcceptGrantRequest {
  GrantArn: string;
}
export type GrantStatus =
  | "PENDING_WORKFLOW"
  | "PENDING_ACCEPT"
  | "REJECTED"
  | "ACTIVE"
  | "FAILED_WORKFLOW"
  | "DELETED"
  | "PENDING_DELETE"
  | "DISABLED"
  | "WORKFLOW_COMPLETED"
  | (string & {});
export interface AcceptGrantResponse {
  GrantArn?: string;
  Status?: GrantStatus;
  Version?: string;
}
export interface CheckInLicenseRequest {
  LicenseConsumptionToken: string;
  Beneficiary?: string;
}
export interface CheckInLicenseResponse {}
export type EntitlementDataUnit =
  | "Count"
  | "None"
  | "Seconds"
  | "Microseconds"
  | "Milliseconds"
  | "Bytes"
  | "Kilobytes"
  | "Megabytes"
  | "Gigabytes"
  | "Terabytes"
  | "Bits"
  | "Kilobits"
  | "Megabits"
  | "Gigabits"
  | "Terabits"
  | "Percent"
  | "Bytes/Second"
  | "Kilobytes/Second"
  | "Megabytes/Second"
  | "Gigabytes/Second"
  | "Terabytes/Second"
  | "Bits/Second"
  | "Kilobits/Second"
  | "Megabits/Second"
  | "Gigabits/Second"
  | "Terabits/Second"
  | "Count/Second"
  | (string & {});
export interface EntitlementData {
  Name: string;
  Value?: string;
  Unit: EntitlementDataUnit;
}
export type EntitlementDataList = EntitlementData[];
export type DigitalSignatureMethod = "JWT_PS384" | (string & {});
export interface Metadata {
  Name?: string;
  Value?: string;
}
export type MetadataList = Metadata[];
export type ClientToken = string;
export interface CheckoutBorrowLicenseRequest {
  LicenseArn: string;
  Entitlements: EntitlementData[];
  DigitalSignatureMethod: DigitalSignatureMethod;
  NodeId?: string;
  CheckoutMetadata?: Metadata[];
  ClientToken: string;
}
export type SignedToken = string;
export type ISO8601DateTime = string;
export interface CheckoutBorrowLicenseResponse {
  LicenseArn?: string;
  LicenseConsumptionToken?: string;
  EntitlementsAllowed?: EntitlementData[];
  NodeId?: string;
  SignedToken?: string;
  IssuedAt?: string;
  Expiration?: string;
  CheckoutMetadata?: Metadata[];
}
export type CheckoutType = "PROVISIONAL" | "PERPETUAL" | (string & {});
export interface CheckoutLicenseRequest {
  ProductSKU: string;
  CheckoutType: CheckoutType;
  KeyFingerprint: string;
  Entitlements: EntitlementData[];
  ClientToken: string;
  Beneficiary?: string;
  NodeId?: string;
}
export interface CheckoutLicenseResponse {
  CheckoutType?: CheckoutType;
  LicenseConsumptionToken?: string;
  EntitlementsAllowed?: EntitlementData[];
  SignedToken?: string;
  NodeId?: string;
  IssuedAt?: string;
  Expiration?: string;
  LicenseArn?: string;
}
export type PrincipalArnList = string[];
export type AllowedOperation =
  | "CreateGrant"
  | "CheckoutLicense"
  | "CheckoutBorrowLicense"
  | "CheckInLicense"
  | "ExtendConsumptionLicense"
  | "ListPurchasedLicenses"
  | "CreateToken"
  | (string & {});
export type AllowedOperationList = AllowedOperation[];
export interface Tag {
  Key?: string;
  Value?: string;
}
export type TagList = Tag[];
export interface CreateGrantRequest {
  ClientToken: string;
  GrantName: string;
  LicenseArn: string;
  Principals: string[];
  HomeRegion: string;
  AllowedOperations: AllowedOperation[];
  Tags?: Tag[];
}
export interface CreateGrantResponse {
  GrantArn?: string;
  Status?: GrantStatus;
  Version?: string;
}
export type StatusReasonMessage = string;
export type ActivationOverrideBehavior =
  | "DISTRIBUTED_GRANTS_ONLY"
  | "ALL_GRANTS_PERMITTED_BY_ISSUER"
  | (string & {});
export interface Options {
  ActivationOverrideBehavior?: ActivationOverrideBehavior;
}
export interface CreateGrantVersionRequest {
  ClientToken: string;
  GrantArn: string;
  GrantName?: string;
  AllowedOperations?: AllowedOperation[];
  Status?: GrantStatus;
  StatusReason?: string;
  SourceVersion?: string;
  Options?: Options;
}
export interface CreateGrantVersionResponse {
  GrantArn?: string;
  Status?: GrantStatus;
  Version?: string;
}
export interface Issuer {
  Name: string;
  SignKey?: string;
}
export interface DatetimeRange {
  Begin: string;
  End?: string;
}
export type BoxBoolean = boolean;
export type EntitlementUnit =
  | "Count"
  | "None"
  | "Seconds"
  | "Microseconds"
  | "Milliseconds"
  | "Bytes"
  | "Kilobytes"
  | "Megabytes"
  | "Gigabytes"
  | "Terabytes"
  | "Bits"
  | "Kilobits"
  | "Megabits"
  | "Gigabits"
  | "Terabits"
  | "Percent"
  | "Bytes/Second"
  | "Kilobytes/Second"
  | "Megabytes/Second"
  | "Gigabytes/Second"
  | "Terabytes/Second"
  | "Bits/Second"
  | "Kilobits/Second"
  | "Megabits/Second"
  | "Gigabits/Second"
  | "Terabits/Second"
  | "Count/Second"
  | (string & {});
export interface Entitlement {
  Name: string;
  Value?: string;
  MaxCount?: number;
  Overage?: boolean;
  Unit: EntitlementUnit;
  AllowCheckIn?: boolean;
}
export type EntitlementList = Entitlement[];
export type RenewType = "None" | "Weekly" | "Monthly" | (string & {});
export type BoxInteger = number;
export interface ProvisionalConfiguration {
  MaxTimeToLiveInMinutes: number;
}
export interface BorrowConfiguration {
  AllowEarlyCheckIn: boolean;
  MaxTimeToLiveInMinutes: number;
}
export interface ConsumptionConfiguration {
  RenewType?: RenewType;
  ProvisionalConfiguration?: ProvisionalConfiguration;
  BorrowConfiguration?: BorrowConfiguration;
}
export interface CreateLicenseRequest {
  LicenseName: string;
  ProductName: string;
  ProductSKU: string;
  Issuer: Issuer;
  HomeRegion: string;
  Validity: DatetimeRange;
  Entitlements: Entitlement[];
  Beneficiary: string;
  ConsumptionConfiguration: ConsumptionConfiguration;
  LicenseMetadata?: Metadata[];
  ClientToken: string;
  Tags?: Tag[];
}
export type LicenseStatus =
  | "AVAILABLE"
  | "PENDING_AVAILABLE"
  | "DEACTIVATED"
  | "SUSPENDED"
  | "EXPIRED"
  | "PENDING_DELETE"
  | "DELETED"
  | (string & {});
export interface CreateLicenseResponse {
  LicenseArn?: string;
  Status?: LicenseStatus;
  Version?: string;
}
export type LicenseAssetResourceName = string;
export type LicenseAssetResourceDescription = string;
export interface LicenseAssetGroupConfiguration {
  UsageDimension?: string;
}
export type LicenseAssetGroupConfigurationList =
  LicenseAssetGroupConfiguration[];
export type LicenseAssetRulesetArnList = string[];
export interface LicenseAssetGroupProperty {
  Key: string;
  Value: string;
}
export type LicenseAssetGroupPropertyList = LicenseAssetGroupProperty[];
export interface CreateLicenseAssetGroupRequest {
  Name: string;
  Description?: string;
  LicenseAssetGroupConfigurations: LicenseAssetGroupConfiguration[];
  AssociatedLicenseAssetRulesetARNs: string[];
  Properties?: LicenseAssetGroupProperty[];
  Tags?: Tag[];
  ClientToken: string;
}
export interface CreateLicenseAssetGroupResponse {
  LicenseAssetGroupArn: string;
  Status: string;
}
export type StringList = string[];
export interface MatchingRuleStatement {
  KeyToMatch: string;
  Constraint: string;
  ValueToMatch: string[];
}
export type MatchingRuleStatementList = MatchingRuleStatement[];
export interface ScriptRuleStatement {
  KeyToMatch: string;
  Script: string;
}
export type ScriptRuleStatementList = ScriptRuleStatement[];
export interface AndRuleStatement {
  MatchingRuleStatements?: MatchingRuleStatement[];
  ScriptRuleStatements?: ScriptRuleStatement[];
}
export interface OrRuleStatement {
  MatchingRuleStatements?: MatchingRuleStatement[];
  ScriptRuleStatements?: ScriptRuleStatement[];
}
export interface LicenseConfigurationRuleStatement {
  AndRuleStatement?: AndRuleStatement;
  OrRuleStatement?: OrRuleStatement;
  MatchingRuleStatement?: MatchingRuleStatement;
}
export interface LicenseRuleStatement {
  AndRuleStatement?: AndRuleStatement;
  OrRuleStatement?: OrRuleStatement;
  MatchingRuleStatement?: MatchingRuleStatement;
}
export interface InstanceRuleStatement {
  AndRuleStatement?: AndRuleStatement;
  OrRuleStatement?: OrRuleStatement;
  MatchingRuleStatement?: MatchingRuleStatement;
  ScriptRuleStatement?: ScriptRuleStatement;
}
export interface RuleStatement {
  LicenseConfigurationRuleStatement?: LicenseConfigurationRuleStatement;
  LicenseRuleStatement?: LicenseRuleStatement;
  InstanceRuleStatement?: InstanceRuleStatement;
}
export interface LicenseAssetRule {
  RuleStatement: RuleStatement;
}
export type LicenseAssetRuleList = LicenseAssetRule[];
export interface CreateLicenseAssetRulesetRequest {
  Name: string;
  Description?: string;
  Rules: LicenseAssetRule[];
  Tags?: Tag[];
  ClientToken: string;
}
export interface CreateLicenseAssetRulesetResponse {
  LicenseAssetRulesetArn: string;
}
export type LicenseCountingType =
  | "vCPU"
  | "Instance"
  | "Core"
  | "Socket"
  | (string & {});
export type BoxLong = number;
export interface ProductInformationFilter {
  ProductInformationFilterName: string;
  ProductInformationFilterValue?: string[];
  ProductInformationFilterComparator: string;
}
export type ProductInformationFilterList = ProductInformationFilter[];
export interface ProductInformation {
  ResourceType: string;
  ProductInformationFilterList: ProductInformationFilter[];
}
export type ProductInformationList = ProductInformation[];
export interface CreateLicenseConfigurationRequest {
  Name: string;
  Description?: string;
  LicenseCountingType: LicenseCountingType;
  LicenseCount?: number;
  LicenseCountHardLimit?: boolean;
  LicenseRules?: string[];
  Tags?: Tag[];
  DisassociateWhenNotFound?: boolean;
  ProductInformationList?: ProductInformation[];
  LicenseExpiry?: number;
}
export interface CreateLicenseConfigurationResponse {
  LicenseConfigurationArn?: string;
}
export type UsageOperation = string;
export type ProductCodeId = string;
export type ProductCodeType = "marketplace" | (string & {});
export interface ProductCodeListItem {
  ProductCodeId: string;
  ProductCodeType: ProductCodeType;
}
export type ProductCodeList = ProductCodeListItem[];
export interface LicenseConversionContext {
  UsageOperation?: string;
  ProductCodes?: ProductCodeListItem[];
}
export interface CreateLicenseConversionTaskForResourceRequest {
  ResourceArn: string;
  SourceLicenseContext: LicenseConversionContext;
  DestinationLicenseContext: LicenseConversionContext;
}
export type LicenseConversionTaskId = string;
export interface CreateLicenseConversionTaskForResourceResponse {
  LicenseConversionTaskId?: string;
}
export type ReportGeneratorName = string;
export type ReportType =
  | "LicenseConfigurationSummaryReport"
  | "LicenseConfigurationUsageReport"
  | "LicenseAssetGroupUsageReport"
  | (string & {});
export type ReportTypeList = ReportType[];
export type ArnList = string[];
export interface ReportContext {
  licenseConfigurationArns?: string[];
  licenseAssetGroupArns?: string[];
  reportStartDate?: Date;
  reportEndDate?: Date;
}
export type ReportFrequencyType =
  | "DAY"
  | "WEEK"
  | "MONTH"
  | "ONE_TIME"
  | (string & {});
export interface ReportFrequency {
  value?: number;
  period?: ReportFrequencyType;
}
export type ClientRequestToken = string;
export interface CreateLicenseManagerReportGeneratorRequest {
  ReportGeneratorName: string;
  Type: ReportType[];
  ReportContext: ReportContext;
  ReportFrequency: ReportFrequency;
  ClientToken: string;
  Description?: string;
  Tags?: Tag[];
}
export interface CreateLicenseManagerReportGeneratorResponse {
  LicenseManagerReportGeneratorArn?: string;
}
export interface CreateLicenseVersionRequest {
  LicenseArn: string;
  LicenseName: string;
  ProductName: string;
  Issuer: Issuer;
  HomeRegion: string;
  Validity: DatetimeRange;
  LicenseMetadata?: Metadata[];
  Entitlements: Entitlement[];
  ConsumptionConfiguration: ConsumptionConfiguration;
  Status: LicenseStatus;
  ClientToken: string;
  SourceVersion?: string;
  ResetUsage?: boolean;
}
export interface CreateLicenseVersionResponse {
  LicenseArn?: string;
  Version?: string;
  Status?: LicenseStatus;
}
export type MaxSize3StringList = string[];
export interface CreateTokenRequest {
  LicenseArn: string;
  RoleArns?: string[];
  ExpirationInDays?: number;
  TokenProperties?: string[];
  ClientToken: string;
}
export type TokenType = "REFRESH_TOKEN" | (string & {});
export type TokenString = string;
export interface CreateTokenResponse {
  TokenId?: string;
  TokenType?: TokenType;
  Token?: string | redacted.Redacted<string>;
}
export interface DeleteGrantRequest {
  GrantArn: string;
  StatusReason?: string;
  Version: string;
}
export interface DeleteGrantResponse {
  GrantArn?: string;
  Status?: GrantStatus;
  Version?: string;
}
export interface DeleteLicenseRequest {
  LicenseArn: string;
  SourceVersion: string;
}
export type LicenseDeletionStatus =
  | "PENDING_DELETE"
  | "DELETED"
  | (string & {});
export interface DeleteLicenseResponse {
  Status?: LicenseDeletionStatus;
  DeletionDate?: string;
}
export interface DeleteLicenseAssetGroupRequest {
  LicenseAssetGroupArn: string;
}
export type LicenseAssetGroupStatus =
  | "ACTIVE"
  | "DISABLED"
  | "DELETED"
  | (string & {});
export interface DeleteLicenseAssetGroupResponse {
  Status: LicenseAssetGroupStatus;
}
export interface DeleteLicenseAssetRulesetRequest {
  LicenseAssetRulesetArn: string;
}
export interface DeleteLicenseAssetRulesetResponse {}
export interface DeleteLicenseConfigurationRequest {
  LicenseConfigurationArn: string;
}
export interface DeleteLicenseConfigurationResponse {}
export interface DeleteLicenseManagerReportGeneratorRequest {
  LicenseManagerReportGeneratorArn: string;
}
export interface DeleteLicenseManagerReportGeneratorResponse {}
export interface DeleteTokenRequest {
  TokenId: string;
}
export interface DeleteTokenResponse {}
export interface ExtendLicenseConsumptionRequest {
  LicenseConsumptionToken: string;
  DryRun?: boolean;
}
export interface ExtendLicenseConsumptionResponse {
  LicenseConsumptionToken?: string;
  Expiration?: string;
}
export interface GetAccessTokenRequest {
  Token: string | redacted.Redacted<string>;
  TokenProperties?: string[];
}
export interface GetAccessTokenResponse {
  AccessToken?: string | redacted.Redacted<string>;
}
export interface GetGrantRequest {
  GrantArn: string;
  Version?: string;
}
export interface Grant {
  GrantArn: string;
  GrantName: string;
  ParentArn: string;
  LicenseArn: string;
  GranteePrincipalArn: string;
  HomeRegion: string;
  GrantStatus: GrantStatus;
  StatusReason?: string;
  Version: string;
  GrantedOperations: AllowedOperation[];
  Options?: Options;
}
export interface GetGrantResponse {
  Grant?: Grant;
}
export interface GetLicenseRequest {
  LicenseArn: string;
  Version?: string;
}
export interface IssuerDetails {
  Name?: string;
  SignKey?: string;
  KeyFingerprint?: string;
}
export interface License {
  LicenseArn?: string;
  LicenseName?: string;
  ProductName?: string;
  ProductSKU?: string;
  Issuer?: IssuerDetails;
  HomeRegion?: string;
  Status?: LicenseStatus;
  Validity?: DatetimeRange;
  Beneficiary?: string;
  Entitlements?: Entitlement[];
  ConsumptionConfiguration?: ConsumptionConfiguration;
  LicenseMetadata?: Metadata[];
  CreateTime?: string;
  Version?: string;
}
export interface GetLicenseResponse {
  License?: License;
}
export interface GetLicenseAssetGroupRequest {
  LicenseAssetGroupArn: string;
}
export interface LicenseAssetGroup {
  Name: string;
  Description?: string;
  LicenseAssetGroupConfigurations?: LicenseAssetGroupConfiguration[];
  AssociatedLicenseAssetRulesetARNs: string[];
  Properties?: LicenseAssetGroupProperty[];
  LicenseAssetGroupArn: string;
  Status: LicenseAssetGroupStatus;
  StatusMessage?: string;
  LatestUsageAnalysisTime?: Date;
  LatestResourceDiscoveryTime?: Date;
}
export interface GetLicenseAssetGroupResponse {
  LicenseAssetGroup: LicenseAssetGroup;
}
export interface GetLicenseAssetRulesetRequest {
  LicenseAssetRulesetArn: string;
}
export interface LicenseAssetRuleset {
  Name: string;
  Description?: string;
  Rules: LicenseAssetRule[];
  LicenseAssetRulesetArn: string;
}
export interface GetLicenseAssetRulesetResponse {
  LicenseAssetRuleset: LicenseAssetRuleset;
}
export interface GetLicenseConfigurationRequest {
  LicenseConfigurationArn: string;
}
export type ResourceType =
  | "EC2_INSTANCE"
  | "EC2_HOST"
  | "EC2_AMI"
  | "RDS"
  | "SYSTEMS_MANAGER_MANAGED_INSTANCE"
  | (string & {});
export interface ConsumedLicenseSummary {
  ResourceType?: ResourceType;
  ConsumedLicenses?: number;
}
export type ConsumedLicenseSummaryList = ConsumedLicenseSummary[];
export interface ManagedResourceSummary {
  ResourceType?: ResourceType;
  AssociationCount?: number;
}
export type ManagedResourceSummaryList = ManagedResourceSummary[];
export interface AutomatedDiscoveryInformation {
  LastRunTime?: Date;
}
export interface GetLicenseConfigurationResponse {
  LicenseConfigurationId?: string;
  LicenseConfigurationArn?: string;
  Name?: string;
  Description?: string;
  LicenseCountingType?: LicenseCountingType;
  LicenseRules?: string[];
  LicenseCount?: number;
  LicenseCountHardLimit?: boolean;
  ConsumedLicenses?: number;
  Status?: string;
  OwnerAccountId?: string;
  ConsumedLicenseSummaryList?: ConsumedLicenseSummary[];
  ManagedResourceSummaryList?: ManagedResourceSummary[];
  Tags?: Tag[];
  ProductInformationList?: ProductInformation[];
  AutomatedDiscoveryInformation?: AutomatedDiscoveryInformation;
  DisassociateWhenNotFound?: boolean;
  LicenseExpiry?: number;
}
export interface GetLicenseConversionTaskRequest {
  LicenseConversionTaskId: string;
}
export type LicenseConversionTaskStatus =
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export interface GetLicenseConversionTaskResponse {
  LicenseConversionTaskId?: string;
  ResourceArn?: string;
  SourceLicenseContext?: LicenseConversionContext;
  DestinationLicenseContext?: LicenseConversionContext;
  StatusMessage?: string;
  Status?: LicenseConversionTaskStatus;
  StartTime?: Date;
  LicenseConversionTime?: Date;
  EndTime?: Date;
}
export interface GetLicenseManagerReportGeneratorRequest {
  LicenseManagerReportGeneratorArn: string;
}
export interface S3Location {
  bucket?: string;
  keyPrefix?: string;
}
export interface ReportGenerator {
  ReportGeneratorName?: string;
  ReportType?: ReportType[];
  ReportContext?: ReportContext;
  ReportFrequency?: ReportFrequency;
  LicenseManagerReportGeneratorArn?: string;
  LastRunStatus?: string;
  LastRunFailureReason?: string;
  LastReportGenerationTime?: string;
  ReportCreatorAccount?: string;
  Description?: string;
  S3Location?: S3Location;
  CreateTime?: string;
  Tags?: Tag[];
}
export interface GetLicenseManagerReportGeneratorResponse {
  ReportGenerator?: ReportGenerator;
}
export interface GetLicenseUsageRequest {
  LicenseArn: string;
}
export interface EntitlementUsage {
  Name: string;
  ConsumedValue: string;
  MaxCount?: string;
  Unit: EntitlementDataUnit;
}
export type EntitlementUsageList = EntitlementUsage[];
export interface LicenseUsage {
  EntitlementUsages?: EntitlementUsage[];
}
export interface GetLicenseUsageResponse {
  LicenseUsage?: LicenseUsage;
}
export interface GetServiceSettingsRequest {}
export interface OrganizationConfiguration {
  EnableIntegration: boolean;
}
export interface CrossAccountDiscoveryServiceStatus {
  Message?: string;
}
export interface RegionStatus {
  Status?: string;
}
export type RegionStatusMap = { [key: string]: RegionStatus | undefined };
export interface CrossRegionDiscoveryStatus {
  Message?: { [key: string]: RegionStatus | undefined };
}
export interface ServiceStatus {
  CrossAccountDiscovery?: CrossAccountDiscoveryServiceStatus;
  CrossRegionDiscovery?: CrossRegionDiscoveryStatus;
}
export interface GetServiceSettingsResponse {
  S3BucketArn?: string;
  SnsTopicArn?: string;
  OrganizationConfiguration?: OrganizationConfiguration;
  EnableCrossAccountsDiscovery?: boolean;
  LicenseManagerResourceShareArn?: string;
  CrossRegionDiscoveryHomeRegion?: string;
  CrossRegionDiscoverySourceRegions?: string[];
  ServiceStatus?: ServiceStatus;
}
export interface ListAssetsForLicenseAssetGroupRequest {
  LicenseAssetGroupArn: string;
  AssetType: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface Asset {
  AssetArn?: string;
  LatestAssetDiscoveryTime?: Date;
}
export type AssetList = Asset[];
export interface ListAssetsForLicenseAssetGroupResponse {
  Assets?: Asset[];
  NextToken?: string;
}
export interface ListAssociationsForLicenseConfigurationRequest {
  LicenseConfigurationArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface LicenseConfigurationAssociation {
  ResourceArn?: string;
  ResourceType?: ResourceType;
  ResourceOwnerId?: string;
  AssociationTime?: Date;
  AmiAssociationScope?: string;
}
export type LicenseConfigurationAssociations =
  LicenseConfigurationAssociation[];
export interface ListAssociationsForLicenseConfigurationResponse {
  LicenseConfigurationAssociations?: LicenseConfigurationAssociation[];
  NextToken?: string;
}
export type FilterName = string;
export type FilterValue = string;
export type FilterValues = string[];
export interface Filter {
  Name?: string;
  Values?: string[];
}
export type FilterList = Filter[];
export type MaxSize100 = number;
export interface ListDistributedGrantsRequest {
  GrantArns?: string[];
  Filters?: Filter[];
  NextToken?: string;
  MaxResults?: number;
}
export type GrantList = Grant[];
export interface ListDistributedGrantsResponse {
  Grants?: Grant[];
  NextToken?: string;
}
export interface ListFailuresForLicenseConfigurationOperationsRequest {
  LicenseConfigurationArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface LicenseOperationFailure {
  ResourceArn?: string;
  ResourceType?: ResourceType;
  ErrorMessage?: string;
  FailureTime?: Date;
  OperationName?: string;
  ResourceOwnerId?: string;
  OperationRequestedBy?: string;
  MetadataList?: Metadata[];
}
export type LicenseOperationFailureList = LicenseOperationFailure[];
export interface ListFailuresForLicenseConfigurationOperationsResponse {
  LicenseOperationFailureList?: LicenseOperationFailure[];
  NextToken?: string;
}
export type Filters = Filter[];
export interface ListLicenseAssetGroupsRequest {
  Filters?: Filter[];
  MaxResults?: number;
  NextToken?: string;
}
export type LicenseAssetGroupList = LicenseAssetGroup[];
export interface ListLicenseAssetGroupsResponse {
  LicenseAssetGroups?: LicenseAssetGroup[];
  NextToken?: string;
}
export interface ListLicenseAssetRulesetsRequest {
  Filters?: Filter[];
  ShowAWSManagedLicenseAssetRulesets?: boolean;
  MaxResults?: number;
  NextToken?: string;
}
export type LicenseAssetRulesetList = LicenseAssetRuleset[];
export interface ListLicenseAssetRulesetsResponse {
  LicenseAssetRulesets?: LicenseAssetRuleset[];
  NextToken?: string;
}
export interface ListLicenseConfigurationsRequest {
  LicenseConfigurationArns?: string[];
  MaxResults?: number;
  NextToken?: string;
  Filters?: Filter[];
}
export interface LicenseConfiguration {
  LicenseConfigurationId?: string;
  LicenseConfigurationArn?: string;
  Name?: string;
  Description?: string;
  LicenseCountingType?: LicenseCountingType;
  LicenseRules?: string[];
  LicenseCount?: number;
  LicenseCountHardLimit?: boolean;
  DisassociateWhenNotFound?: boolean;
  ConsumedLicenses?: number;
  Status?: string;
  OwnerAccountId?: string;
  ConsumedLicenseSummaryList?: ConsumedLicenseSummary[];
  ManagedResourceSummaryList?: ManagedResourceSummary[];
  ProductInformationList?: ProductInformation[];
  AutomatedDiscoveryInformation?: AutomatedDiscoveryInformation;
  LicenseExpiry?: number;
}
export type LicenseConfigurations = LicenseConfiguration[];
export interface ListLicenseConfigurationsResponse {
  LicenseConfigurations?: LicenseConfiguration[];
  NextToken?: string;
}
export interface ListLicenseConfigurationsForOrganizationRequest {
  LicenseConfigurationArns?: string[];
  MaxResults?: number;
  NextToken?: string;
  Filters?: Filter[];
}
export interface ListLicenseConfigurationsForOrganizationResponse {
  LicenseConfigurations?: LicenseConfiguration[];
  NextToken?: string;
}
export interface ListLicenseConversionTasksRequest {
  NextToken?: string;
  MaxResults?: number;
  Filters?: Filter[];
}
export interface LicenseConversionTask {
  LicenseConversionTaskId?: string;
  ResourceArn?: string;
  SourceLicenseContext?: LicenseConversionContext;
  DestinationLicenseContext?: LicenseConversionContext;
  Status?: LicenseConversionTaskStatus;
  StatusMessage?: string;
  StartTime?: Date;
  LicenseConversionTime?: Date;
  EndTime?: Date;
}
export type LicenseConversionTasks = LicenseConversionTask[];
export interface ListLicenseConversionTasksResponse {
  LicenseConversionTasks?: LicenseConversionTask[];
  NextToken?: string;
}
export interface ListLicenseManagerReportGeneratorsRequest {
  Filters?: Filter[];
  NextToken?: string;
  MaxResults?: number;
}
export type ReportGeneratorList = ReportGenerator[];
export interface ListLicenseManagerReportGeneratorsResponse {
  ReportGenerators?: ReportGenerator[];
  NextToken?: string;
}
export interface ListLicensesRequest {
  LicenseArns?: string[];
  Filters?: Filter[];
  NextToken?: string;
  MaxResults?: number;
}
export type LicenseList = License[];
export interface ListLicensesResponse {
  Licenses?: License[];
  NextToken?: string;
}
export interface ListLicenseSpecificationsForResourceRequest {
  ResourceArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface LicenseSpecification {
  LicenseConfigurationArn: string;
  AmiAssociationScope?: string;
}
export type LicenseSpecifications = LicenseSpecification[];
export interface ListLicenseSpecificationsForResourceResponse {
  LicenseSpecifications?: LicenseSpecification[];
  NextToken?: string;
}
export interface ListLicenseVersionsRequest {
  LicenseArn: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListLicenseVersionsResponse {
  Licenses?: License[];
  NextToken?: string;
}
export interface ListReceivedGrantsRequest {
  GrantArns?: string[];
  Filters?: Filter[];
  NextToken?: string;
  MaxResults?: number;
}
export interface ListReceivedGrantsResponse {
  Grants?: Grant[];
  NextToken?: string;
}
export interface ListReceivedGrantsForOrganizationRequest {
  LicenseArn: string;
  Filters?: Filter[];
  NextToken?: string;
  MaxResults?: number;
}
export interface ListReceivedGrantsForOrganizationResponse {
  Grants?: Grant[];
  NextToken?: string;
}
export interface ListReceivedLicensesRequest {
  LicenseArns?: string[];
  Filters?: Filter[];
  NextToken?: string;
  MaxResults?: number;
}
export type ReceivedStatus =
  | "PENDING_WORKFLOW"
  | "PENDING_ACCEPT"
  | "REJECTED"
  | "ACTIVE"
  | "FAILED_WORKFLOW"
  | "DELETED"
  | "DISABLED"
  | "WORKFLOW_COMPLETED"
  | (string & {});
export interface ReceivedMetadata {
  ReceivedStatus?: ReceivedStatus;
  ReceivedStatusReason?: string;
  AllowedOperations?: AllowedOperation[];
}
export interface GrantedLicense {
  LicenseArn?: string;
  LicenseName?: string;
  ProductName?: string;
  ProductSKU?: string;
  Issuer?: IssuerDetails;
  HomeRegion?: string;
  Status?: LicenseStatus;
  Validity?: DatetimeRange;
  Beneficiary?: string;
  Entitlements?: Entitlement[];
  ConsumptionConfiguration?: ConsumptionConfiguration;
  LicenseMetadata?: Metadata[];
  CreateTime?: string;
  Version?: string;
  ReceivedMetadata?: ReceivedMetadata;
}
export type GrantedLicenseList = GrantedLicense[];
export interface ListReceivedLicensesResponse {
  Licenses?: GrantedLicense[];
  NextToken?: string;
}
export interface ListReceivedLicensesForOrganizationRequest {
  Filters?: Filter[];
  NextToken?: string;
  MaxResults?: number;
}
export interface ListReceivedLicensesForOrganizationResponse {
  Licenses?: GrantedLicense[];
  NextToken?: string;
}
export type InventoryFilterCondition =
  | "EQUALS"
  | "NOT_EQUALS"
  | "BEGINS_WITH"
  | "CONTAINS"
  | (string & {});
export interface InventoryFilter {
  Name: string;
  Condition: InventoryFilterCondition;
  Value?: string;
}
export type InventoryFilterList = InventoryFilter[];
export interface ListResourceInventoryRequest {
  MaxResults?: number;
  NextToken?: string;
  Filters?: InventoryFilter[];
}
export interface ResourceInventory {
  ResourceId?: string;
  ResourceType?: ResourceType;
  ResourceArn?: string;
  Platform?: string;
  PlatformVersion?: string;
  ResourceOwningAccountId?: string;
  MarketplaceProductCodes?: string[];
  UsageOperation?: string;
  AmiId?: string;
  HostId?: string;
  Region?: string;
  InstanceType?: string;
}
export type ResourceInventoryList = ResourceInventory[];
export interface ListResourceInventoryResponse {
  ResourceInventoryList?: ResourceInventory[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export interface ListTokensRequest {
  TokenIds?: string[];
  Filters?: Filter[];
  NextToken?: string;
  MaxResults?: number;
}
export interface TokenData {
  TokenId?: string;
  TokenType?: string;
  LicenseArn?: string;
  ExpirationTime?: string;
  TokenProperties?: string[];
  RoleArns?: string[];
  Status?: string;
}
export type TokenList = TokenData[];
export interface ListTokensResponse {
  Tokens?: TokenData[];
  NextToken?: string;
}
export interface ListUsageForLicenseConfigurationRequest {
  LicenseConfigurationArn: string;
  MaxResults?: number;
  NextToken?: string;
  Filters?: Filter[];
}
export interface LicenseConfigurationUsage {
  ResourceArn?: string;
  ResourceType?: ResourceType;
  ResourceStatus?: string;
  ResourceOwnerId?: string;
  AssociationTime?: Date;
  ConsumedLicenses?: number;
}
export type LicenseConfigurationUsageList = LicenseConfigurationUsage[];
export interface ListUsageForLicenseConfigurationResponse {
  LicenseConfigurationUsageList?: LicenseConfigurationUsage[];
  NextToken?: string;
}
export interface RejectGrantRequest {
  GrantArn: string;
}
export interface RejectGrantResponse {
  GrantArn?: string;
  Status?: GrantStatus;
  Version?: string;
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
export interface UpdateLicenseAssetGroupRequest {
  Name?: string;
  Description?: string;
  LicenseAssetGroupConfigurations?: LicenseAssetGroupConfiguration[];
  AssociatedLicenseAssetRulesetARNs: string[];
  Properties?: LicenseAssetGroupProperty[];
  LicenseAssetGroupArn: string;
  Status?: LicenseAssetGroupStatus;
  ClientToken: string;
}
export interface UpdateLicenseAssetGroupResponse {
  LicenseAssetGroupArn: string;
  Status: string;
}
export interface UpdateLicenseAssetRulesetRequest {
  Name?: string;
  Description?: string;
  Rules: LicenseAssetRule[];
  LicenseAssetRulesetArn: string;
  ClientToken: string;
}
export interface UpdateLicenseAssetRulesetResponse {
  LicenseAssetRulesetArn: string;
}
export type LicenseConfigurationStatus =
  | "AVAILABLE"
  | "DISABLED"
  | (string & {});
export interface UpdateLicenseConfigurationRequest {
  LicenseConfigurationArn: string;
  LicenseConfigurationStatus?: LicenseConfigurationStatus;
  LicenseRules?: string[];
  LicenseCount?: number;
  LicenseCountHardLimit?: boolean;
  Name?: string;
  Description?: string;
  ProductInformationList?: ProductInformation[];
  DisassociateWhenNotFound?: boolean;
  LicenseExpiry?: number;
}
export interface UpdateLicenseConfigurationResponse {}
export interface UpdateLicenseManagerReportGeneratorRequest {
  LicenseManagerReportGeneratorArn: string;
  ReportGeneratorName: string;
  Type: ReportType[];
  ReportContext: ReportContext;
  ReportFrequency: ReportFrequency;
  ClientToken: string;
  Description?: string;
}
export interface UpdateLicenseManagerReportGeneratorResponse {}
export interface UpdateLicenseSpecificationsForResourceRequest {
  ResourceArn: string;
  AddLicenseSpecifications?: LicenseSpecification[];
  RemoveLicenseSpecifications?: LicenseSpecification[];
}
export interface UpdateLicenseSpecificationsForResourceResponse {}
export interface UpdateServiceSettingsRequest {
  S3BucketArn?: string;
  SnsTopicArn?: string;
  OrganizationConfiguration?: OrganizationConfiguration;
  EnableCrossAccountsDiscovery?: boolean;
  EnabledDiscoverySourceRegions?: string[];
}
export interface UpdateServiceSettingsResponse {}
export type Message = string;
export type Location = string;
export type AcceptGrantError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Accepts the specified grant.
 */
export const acceptGrant: API.OperationMethod<
  AcceptGrantRequest,
  AcceptGrantResponse,
  AcceptGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { GrantArn: 0 } },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptGrant",
})) as any;

export type CheckInLicenseError =
  | AccessDeniedException
  | AuthorizationException
  | ConflictException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceNotFoundException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Checks in the specified license. Check in a license when it is no longer in use.
 */
export const checkInLicense: API.OperationMethod<
  CheckInLicenseRequest,
  CheckInLicenseResponse,
  CheckInLicenseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { LicenseConsumptionToken: 0, Beneficiary: 0 },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    ConflictException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceNotFoundException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CheckInLicense",
})) as any;

export type CheckoutBorrowLicenseError =
  | AccessDeniedException
  | AuthorizationException
  | EntitlementNotAllowedException
  | InvalidParameterValueException
  | NoEntitlementsAllowedException
  | RateLimitExceededException
  | RedirectException
  | ResourceNotFoundException
  | ServerInternalException
  | UnsupportedDigitalSignatureMethodException
  | ValidationException
  | CommonErrors;
/**
 * Checks out the specified license for offline use.
 */
export const checkoutBorrowLicense: API.OperationMethod<
  CheckoutBorrowLicenseRequest,
  CheckoutBorrowLicenseResponse,
  CheckoutBorrowLicenseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      LicenseArn: 0,
      Entitlements: D.list(i_EntitlementData),
      DigitalSignatureMethod: 0,
      NodeId: 0,
      CheckoutMetadata: D.list(i_Metadata),
      ClientToken: 0,
    },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    EntitlementNotAllowedException,
    InvalidParameterValueException,
    NoEntitlementsAllowedException,
    RateLimitExceededException,
    RedirectException,
    ResourceNotFoundException,
    ServerInternalException,
    UnsupportedDigitalSignatureMethodException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CheckoutBorrowLicense",
})) as any;

export type CheckoutLicenseError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | NoEntitlementsAllowedException
  | RateLimitExceededException
  | RedirectException
  | ResourceNotFoundException
  | ServerInternalException
  | UnsupportedDigitalSignatureMethodException
  | ValidationException
  | CommonErrors;
/**
 * Checks out the specified license.
 *
 * If the account that created the license is the same that is performing the check out, you must
 * specify the account as the beneficiary.
 */
export const checkoutLicense: API.OperationMethod<
  CheckoutLicenseRequest,
  CheckoutLicenseResponse,
  CheckoutLicenseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ProductSKU: 0,
      CheckoutType: 0,
      KeyFingerprint: 0,
      Entitlements: D.list(i_EntitlementData),
      ClientToken: 0,
      Beneficiary: 0,
      NodeId: 0,
    },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    NoEntitlementsAllowedException,
    RateLimitExceededException,
    RedirectException,
    ResourceNotFoundException,
    ServerInternalException,
    UnsupportedDigitalSignatureMethodException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CheckoutLicense",
})) as any;

export type CreateGrantError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Creates a grant for the specified license. A grant shares the use of license
 * entitlements with a specific Amazon Web Services account, an organization, or an
 * organizational unit (OU). For more information, see Granted licenses in License Manager in the *License Manager User Guide*.
 */
export const createGrant: API.OperationMethod<
  CreateGrantRequest,
  CreateGrantResponse,
  CreateGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientToken: 0,
      GrantName: 0,
      LicenseArn: 0,
      Principals: 0,
      HomeRegion: 0,
      AllowedOperations: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGrant",
})) as any;

export type CreateGrantVersionError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new version of the specified grant. For more information, see
 * Granted licenses in License Manager in the *License Manager User Guide*.
 */
export const createGrantVersion: API.OperationMethod<
  CreateGrantVersionRequest,
  CreateGrantVersionResponse,
  CreateGrantVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientToken: 0,
      GrantArn: 0,
      GrantName: 0,
      AllowedOperations: 0,
      Status: 0,
      StatusReason: 0,
      SourceVersion: 0,
      Options: { ActivationOverrideBehavior: 0 },
    },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGrantVersion",
})) as any;

export type CreateLicenseError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | RedirectException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Creates a license.
 */
export const createLicense: API.OperationMethod<
  CreateLicenseRequest,
  CreateLicenseResponse,
  CreateLicenseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      LicenseName: 0,
      ProductName: 0,
      ProductSKU: 0,
      Issuer: i_Issuer,
      HomeRegion: 0,
      Validity: i_DatetimeRange,
      Entitlements: D.list(i_Entitlement),
      Beneficiary: 0,
      ConsumptionConfiguration: i_ConsumptionConfiguration,
      LicenseMetadata: D.list(i_Metadata),
      ClientToken: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    RedirectException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLicense",
})) as any;

export type CreateLicenseAssetGroupError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Creates a license asset group.
 */
export const createLicenseAssetGroup: API.OperationMethod<
  CreateLicenseAssetGroupRequest,
  CreateLicenseAssetGroupResponse,
  CreateLicenseAssetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Description: 0,
      LicenseAssetGroupConfigurations: D.list(i_LicenseAssetGroupConfiguration),
      AssociatedLicenseAssetRulesetARNs: 0,
      Properties: D.list(i_LicenseAssetGroupProperty),
      Tags: D.list(i_Tag),
      ClientToken: 0,
    },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLicenseAssetGroup",
})) as any;

export type CreateLicenseAssetRulesetError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Creates a license asset ruleset.
 */
export const createLicenseAssetRuleset: API.OperationMethod<
  CreateLicenseAssetRulesetRequest,
  CreateLicenseAssetRulesetResponse,
  CreateLicenseAssetRulesetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Description: 0,
      Rules: D.list(i_LicenseAssetRule),
      Tags: D.list(i_Tag),
      ClientToken: 0,
    },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLicenseAssetRuleset",
})) as any;

export type CreateLicenseConfigurationError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceLimitExceededException
  | ServerInternalException
  | CommonErrors;
/**
 * Creates a license configuration.
 *
 * A license configuration is an abstraction of a customer license agreement that can be
 * consumed and enforced by License Manager. Components include specifications for the license
 * type (licensing by instance, socket, CPU, or vCPU), allowed tenancy (shared tenancy,
 * Dedicated Instance, Dedicated Host, or all of these), license affinity to host (how long a
 * license must be associated with a host), and the number of licenses purchased and used.
 */
export const createLicenseConfiguration: API.OperationMethod<
  CreateLicenseConfigurationRequest,
  CreateLicenseConfigurationResponse,
  CreateLicenseConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Description: 0,
      LicenseCountingType: 0,
      LicenseCount: 0,
      LicenseCountHardLimit: 0,
      LicenseRules: 0,
      Tags: D.list(i_Tag),
      DisassociateWhenNotFound: 0,
      ProductInformationList: D.list(i_ProductInformation),
      LicenseExpiry: 0,
    },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceLimitExceededException,
    ServerInternalException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLicenseConfiguration",
})) as any;

export type CreateLicenseConversionTaskForResourceError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new license conversion task.
 */
export const createLicenseConversionTaskForResource: API.OperationMethod<
  CreateLicenseConversionTaskForResourceRequest,
  CreateLicenseConversionTaskForResourceResponse,
  CreateLicenseConversionTaskForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceArn: 0,
      SourceLicenseContext: i_LicenseConversionContext,
      DestinationLicenseContext: i_LicenseConversionContext,
    },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLicenseConversionTaskForResource",
})) as any;

export type CreateLicenseManagerReportGeneratorError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Creates a report generator.
 */
export const createLicenseManagerReportGenerator: API.OperationMethod<
  CreateLicenseManagerReportGeneratorRequest,
  CreateLicenseManagerReportGeneratorResponse,
  CreateLicenseManagerReportGeneratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ReportGeneratorName: 0,
      Type: 0,
      ReportContext: i_ReportContext,
      ReportFrequency: i_ReportFrequency,
      ClientToken: 0,
      Description: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLicenseManagerReportGenerator",
})) as any;

export type CreateLicenseVersionError =
  | AccessDeniedException
  | AuthorizationException
  | ConflictException
  | RateLimitExceededException
  | RedirectException
  | ResourceNotFoundException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new version of the specified license.
 */
export const createLicenseVersion: API.OperationMethod<
  CreateLicenseVersionRequest,
  CreateLicenseVersionResponse,
  CreateLicenseVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      LicenseArn: 0,
      LicenseName: 0,
      ProductName: 0,
      Issuer: i_Issuer,
      HomeRegion: 0,
      Validity: i_DatetimeRange,
      LicenseMetadata: D.list(i_Metadata),
      Entitlements: D.list(i_Entitlement),
      ConsumptionConfiguration: i_ConsumptionConfiguration,
      Status: 0,
      ClientToken: 0,
      SourceVersion: 0,
      ResetUsage: 0,
    },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    ConflictException,
    RateLimitExceededException,
    RedirectException,
    ResourceNotFoundException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLicenseVersion",
})) as any;

export type CreateTokenError =
  | AccessDeniedException
  | AuthorizationException
  | RateLimitExceededException
  | RedirectException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Creates a long-lived token.
 *
 * A refresh token is a JWT token used to get an access token. With an access token,
 * you can call AssumeRoleWithWebIdentity to get role credentials that you can use to
 * call License Manager to manage the specified license.
 */
export const createToken: API.OperationMethod<
  CreateTokenRequest,
  CreateTokenResponse,
  CreateTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      LicenseArn: 0,
      RoleArns: 0,
      ExpirationInDays: 0,
      TokenProperties: 0,
      ClientToken: 0,
    },
    output: { Token: D.secret },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    RateLimitExceededException,
    RedirectException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateToken",
})) as any;

export type DeleteGrantError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified grant.
 */
export const deleteGrant: API.OperationMethod<
  DeleteGrantRequest,
  DeleteGrantResponse,
  DeleteGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { GrantArn: 0, StatusReason: 0, Version: 0 },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGrant",
})) as any;

export type DeleteLicenseError =
  | AccessDeniedException
  | AuthorizationException
  | ConflictException
  | InvalidParameterValueException
  | RateLimitExceededException
  | RedirectException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified license.
 */
export const deleteLicense: API.OperationMethod<
  DeleteLicenseRequest,
  DeleteLicenseResponse,
  DeleteLicenseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { LicenseArn: 0, SourceVersion: 0 } },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    ConflictException,
    InvalidParameterValueException,
    RateLimitExceededException,
    RedirectException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLicense",
})) as any;

export type DeleteLicenseAssetGroupError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a license asset group.
 */
export const deleteLicenseAssetGroup: API.OperationMethod<
  DeleteLicenseAssetGroupRequest,
  DeleteLicenseAssetGroupResponse,
  DeleteLicenseAssetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { LicenseAssetGroupArn: 0 } },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLicenseAssetGroup",
})) as any;

export type DeleteLicenseAssetRulesetError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a license asset ruleset.
 */
export const deleteLicenseAssetRuleset: API.OperationMethod<
  DeleteLicenseAssetRulesetRequest,
  DeleteLicenseAssetRulesetResponse,
  DeleteLicenseAssetRulesetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { LicenseAssetRulesetArn: 0 } },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLicenseAssetRuleset",
})) as any;

export type DeleteLicenseConfigurationError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | LicenseConfigurationNotFound
  | CommonErrors;
/**
 * Deletes the specified license configuration.
 *
 * You cannot delete a license configuration that is in use.
 */
export const deleteLicenseConfiguration: API.OperationMethod<
  DeleteLicenseConfigurationRequest,
  DeleteLicenseConfigurationResponse,
  DeleteLicenseConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { LicenseConfigurationArn: 0 } },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    LicenseConfigurationNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLicenseConfiguration",
})) as any;

export type DeleteLicenseManagerReportGeneratorError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified report generator.
 *
 * This action deletes the report generator, which stops it from generating future reports.
 * The action cannot be reversed. It has no effect on the previous reports from this generator.
 */
export const deleteLicenseManagerReportGenerator: API.OperationMethod<
  DeleteLicenseManagerReportGeneratorRequest,
  DeleteLicenseManagerReportGeneratorResponse,
  DeleteLicenseManagerReportGeneratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { LicenseManagerReportGeneratorArn: 0 } },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLicenseManagerReportGenerator",
})) as any;

export type DeleteTokenError =
  | AccessDeniedException
  | AuthorizationException
  | RateLimitExceededException
  | RedirectException
  | ResourceNotFoundException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified token. Must be called in the license home Region.
 */
export const deleteToken: API.OperationMethod<
  DeleteTokenRequest,
  DeleteTokenResponse,
  DeleteTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TokenId: 0 } },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    RateLimitExceededException,
    RedirectException,
    ResourceNotFoundException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteToken",
})) as any;

export type ExtendLicenseConsumptionError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceNotFoundException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Extends the expiration date for license consumption.
 */
export const extendLicenseConsumption: API.OperationMethod<
  ExtendLicenseConsumptionRequest,
  ExtendLicenseConsumptionResponse,
  ExtendLicenseConsumptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { LicenseConsumptionToken: 0, DryRun: 0 },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceNotFoundException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExtendLicenseConsumption",
})) as any;

export type GetAccessTokenError =
  | AccessDeniedException
  | AuthorizationException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Gets a temporary access token to use with AssumeRoleWithWebIdentity. Access tokens
 * are valid for one hour.
 */
export const getAccessToken: API.OperationMethod<
  GetAccessTokenRequest,
  GetAccessTokenResponse,
  GetAccessTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Token: 0, TokenProperties: 0 },
    output: { AccessToken: D.secret },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessToken",
})) as any;

export type GetGrantError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceLimitExceededException
  | ServerInternalException
  | ValidationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets detailed information about the specified grant.
 */
export const getGrant: API.OperationMethod<
  GetGrantRequest,
  GetGrantResponse,
  GetGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { GrantArn: 0, Version: 0 } },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceLimitExceededException,
    ServerInternalException,
    ValidationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGrant",
})) as any;

export type GetLicenseError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets detailed information about the specified license.
 */
export const getLicense: API.OperationMethod<
  GetLicenseRequest,
  GetLicenseResponse,
  GetLicenseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { LicenseArn: 0, Version: 0 } },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLicense",
})) as any;

export type GetLicenseAssetGroupError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Gets a license asset group.
 */
export const getLicenseAssetGroup: API.OperationMethod<
  GetLicenseAssetGroupRequest,
  GetLicenseAssetGroupResponse,
  GetLicenseAssetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { LicenseAssetGroupArn: 0 },
    output: { LicenseAssetGroup: o_LicenseAssetGroup },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLicenseAssetGroup",
})) as any;

export type GetLicenseAssetRulesetError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Gets a license asset ruleset.
 */
export const getLicenseAssetRuleset: API.OperationMethod<
  GetLicenseAssetRulesetRequest,
  GetLicenseAssetRulesetResponse,
  GetLicenseAssetRulesetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { LicenseAssetRulesetArn: 0 } },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLicenseAssetRuleset",
})) as any;

export type GetLicenseConfigurationError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | LicenseConfigurationNotFound
  | CommonErrors;
/**
 * Gets detailed information about the specified license configuration.
 */
export const getLicenseConfiguration: API.OperationMethod<
  GetLicenseConfigurationRequest,
  GetLicenseConfigurationResponse,
  GetLicenseConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { LicenseConfigurationArn: 0 },
    output: { AutomatedDiscoveryInformation: o_AutomatedDiscoveryInformation },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    LicenseConfigurationNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLicenseConfiguration",
})) as any;

export type GetLicenseConversionTaskError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | CommonErrors;
/**
 * Gets information about the specified license type conversion task.
 */
export const getLicenseConversionTask: API.OperationMethod<
  GetLicenseConversionTaskRequest,
  GetLicenseConversionTaskResponse,
  GetLicenseConversionTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { LicenseConversionTaskId: 0 },
    output: { StartTime: D.ts, LicenseConversionTime: D.ts, EndTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLicenseConversionTask",
})) as any;

export type GetLicenseManagerReportGeneratorError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the specified report generator.
 */
export const getLicenseManagerReportGenerator: API.OperationMethod<
  GetLicenseManagerReportGeneratorRequest,
  GetLicenseManagerReportGeneratorResponse,
  GetLicenseManagerReportGeneratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { LicenseManagerReportGeneratorArn: 0 },
    output: { ReportGenerator: o_ReportGenerator },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLicenseManagerReportGenerator",
})) as any;

export type GetLicenseUsageError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Gets detailed information about the usage of the specified license.
 */
export const getLicenseUsage: API.OperationMethod<
  GetLicenseUsageRequest,
  GetLicenseUsageResponse,
  GetLicenseUsageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { LicenseArn: 0 } },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLicenseUsage",
})) as any;

export type GetServiceSettingsError =
  | AccessDeniedException
  | AuthorizationException
  | RateLimitExceededException
  | ServerInternalException
  | CommonErrors;
/**
 * Gets the License Manager settings for the current Region.
 */
export const getServiceSettings: API.OperationMethod<
  GetServiceSettingsRequest,
  GetServiceSettingsResponse,
  GetServiceSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    RateLimitExceededException,
    ServerInternalException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceSettings",
})) as any;

export type ListAssetsForLicenseAssetGroupError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Lists assets for a license asset group.
 */
export const listAssetsForLicenseAssetGroup: API.OperationMethod<
  ListAssetsForLicenseAssetGroupRequest,
  ListAssetsForLicenseAssetGroupResponse,
  ListAssetsForLicenseAssetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      LicenseAssetGroupArn: 0,
      AssetType: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: { Assets: D.list({ LatestAssetDiscoveryTime: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssetsForLicenseAssetGroup",
})) as any;

export type ListAssociationsForLicenseConfigurationError =
  | AccessDeniedException
  | AuthorizationException
  | FilterLimitExceededException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | CommonErrors;
/**
 * Lists the resource associations for the specified license configuration.
 *
 * Resource associations need not consume licenses from a license configuration.
 * For example, an AMI or a stopped instance might not consume a license (depending on
 * the license rules).
 */
export const listAssociationsForLicenseConfiguration: API.OperationMethod<
  ListAssociationsForLicenseConfigurationRequest,
  ListAssociationsForLicenseConfigurationResponse,
  ListAssociationsForLicenseConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { LicenseConfigurationArn: 0, MaxResults: 0, NextToken: 0 },
    output: {
      LicenseConfigurationAssociations: D.list({ AssociationTime: D.ts }),
    },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    FilterLimitExceededException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssociationsForLicenseConfiguration",
})) as any;

export type ListDistributedGrantsError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Lists the grants distributed for the specified license.
 */
export const listDistributedGrants: API.OperationMethod<
  ListDistributedGrantsRequest,
  ListDistributedGrantsResponse,
  ListDistributedGrantsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      GrantArns: 0,
      Filters: D.list(i_Filter),
      NextToken: 0,
      MaxResults: 0,
    },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDistributedGrants",
})) as any;

export type ListFailuresForLicenseConfigurationOperationsError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | CommonErrors;
/**
 * Lists the license configuration operations that failed.
 */
export const listFailuresForLicenseConfigurationOperations: API.OperationMethod<
  ListFailuresForLicenseConfigurationOperationsRequest,
  ListFailuresForLicenseConfigurationOperationsResponse,
  ListFailuresForLicenseConfigurationOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { LicenseConfigurationArn: 0, MaxResults: 0, NextToken: 0 },
    output: { LicenseOperationFailureList: D.list({ FailureTime: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFailuresForLicenseConfigurationOperations",
})) as any;

export type ListLicenseAssetGroupsError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Lists license asset groups.
 */
export const listLicenseAssetGroups: API.OperationMethod<
  ListLicenseAssetGroupsRequest,
  ListLicenseAssetGroupsResponse,
  ListLicenseAssetGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Filters: D.list(i_Filter), MaxResults: 0, NextToken: 0 },
    output: { LicenseAssetGroups: D.list(o_LicenseAssetGroup) },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLicenseAssetGroups",
})) as any;

export type ListLicenseAssetRulesetsError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Lists license asset rulesets.
 */
export const listLicenseAssetRulesets: API.OperationMethod<
  ListLicenseAssetRulesetsRequest,
  ListLicenseAssetRulesetsResponse,
  ListLicenseAssetRulesetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Filters: D.list(i_Filter),
      ShowAWSManagedLicenseAssetRulesets: 0,
      MaxResults: 0,
      NextToken: 0,
    },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLicenseAssetRulesets",
})) as any;

export type ListLicenseConfigurationsError =
  | AccessDeniedException
  | AuthorizationException
  | FilterLimitExceededException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | CommonErrors;
/**
 * Lists the license configurations for your account.
 */
export const listLicenseConfigurations: API.OperationMethod<
  ListLicenseConfigurationsRequest,
  ListLicenseConfigurationsResponse,
  ListLicenseConfigurationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      LicenseConfigurationArns: 0,
      MaxResults: 0,
      NextToken: 0,
      Filters: D.list(i_Filter),
    },
    output: { LicenseConfigurations: D.list(o_LicenseConfiguration) },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    FilterLimitExceededException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLicenseConfigurations",
})) as any;

export type ListLicenseConfigurationsForOrganizationError =
  | AccessDeniedException
  | AuthorizationException
  | FilterLimitExceededException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | CommonErrors;
/**
 * Lists license configurations for an organization.
 */
export const listLicenseConfigurationsForOrganization: API.OperationMethod<
  ListLicenseConfigurationsForOrganizationRequest,
  ListLicenseConfigurationsForOrganizationResponse,
  ListLicenseConfigurationsForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      LicenseConfigurationArns: 0,
      MaxResults: 0,
      NextToken: 0,
      Filters: D.list(i_Filter),
    },
    output: { LicenseConfigurations: D.list(o_LicenseConfiguration) },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    FilterLimitExceededException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLicenseConfigurationsForOrganization",
})) as any;

export type ListLicenseConversionTasksError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | CommonErrors;
/**
 * Lists the license type conversion tasks for your account.
 */
export const listLicenseConversionTasks: API.OperationMethod<
  ListLicenseConversionTasksRequest,
  ListLicenseConversionTasksResponse,
  ListLicenseConversionTasksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0, Filters: D.list(i_Filter) },
    output: {
      LicenseConversionTasks: D.list({
        StartTime: D.ts,
        LicenseConversionTime: D.ts,
        EndTime: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLicenseConversionTasks",
})) as any;

export type ListLicenseManagerReportGeneratorsError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Lists the report generators for your account.
 */
export const listLicenseManagerReportGenerators: API.OperationMethod<
  ListLicenseManagerReportGeneratorsRequest,
  ListLicenseManagerReportGeneratorsResponse,
  ListLicenseManagerReportGeneratorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Filters: D.list(i_Filter), NextToken: 0, MaxResults: 0 },
    output: { ReportGenerators: D.list(o_ReportGenerator) },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLicenseManagerReportGenerators",
})) as any;

export type ListLicensesError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Lists the licenses for your account.
 */
export const listLicenses: API.OperationMethod<
  ListLicensesRequest,
  ListLicensesResponse,
  ListLicensesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      LicenseArns: 0,
      Filters: D.list(i_Filter),
      NextToken: 0,
      MaxResults: 0,
    },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLicenses",
})) as any;

export type ListLicenseSpecificationsForResourceError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | CommonErrors;
/**
 * Describes the license configurations for the specified resource.
 */
export const listLicenseSpecificationsForResource: API.OperationMethod<
  ListLicenseSpecificationsForResourceRequest,
  ListLicenseSpecificationsForResourceResponse,
  ListLicenseSpecificationsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceArn: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLicenseSpecificationsForResource",
})) as any;

export type ListLicenseVersionsError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | CommonErrors;
/**
 * Lists all versions of the specified license.
 */
export const listLicenseVersions: API.OperationMethod<
  ListLicenseVersionsRequest,
  ListLicenseVersionsResponse,
  ListLicenseVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { LicenseArn: 0, NextToken: 0, MaxResults: 0 },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLicenseVersions",
})) as any;

export type ListReceivedGrantsError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Lists grants that are received. Received grants are grants created while specifying the
 * recipient as this Amazon Web Services account, your organization, or an organizational unit
 * (OU) to which this member account belongs.
 */
export const listReceivedGrants: API.OperationMethod<
  ListReceivedGrantsRequest,
  ListReceivedGrantsResponse,
  ListReceivedGrantsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      GrantArns: 0,
      Filters: D.list(i_Filter),
      NextToken: 0,
      MaxResults: 0,
    },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReceivedGrants",
})) as any;

export type ListReceivedGrantsForOrganizationError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Lists the grants received for all accounts in the organization.
 */
export const listReceivedGrantsForOrganization: API.OperationMethod<
  ListReceivedGrantsForOrganizationRequest,
  ListReceivedGrantsForOrganizationResponse,
  ListReceivedGrantsForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      LicenseArn: 0,
      Filters: D.list(i_Filter),
      NextToken: 0,
      MaxResults: 0,
    },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReceivedGrantsForOrganization",
})) as any;

export type ListReceivedLicensesError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Lists received licenses.
 */
export const listReceivedLicenses: API.OperationMethod<
  ListReceivedLicensesRequest,
  ListReceivedLicensesResponse,
  ListReceivedLicensesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      LicenseArns: 0,
      Filters: D.list(i_Filter),
      NextToken: 0,
      MaxResults: 0,
    },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReceivedLicenses",
})) as any;

export type ListReceivedLicensesForOrganizationError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Lists the licenses received for all accounts in the organization.
 */
export const listReceivedLicensesForOrganization: API.OperationMethod<
  ListReceivedLicensesForOrganizationRequest,
  ListReceivedLicensesForOrganizationResponse,
  ListReceivedLicensesForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Filters: D.list(i_Filter), NextToken: 0, MaxResults: 0 },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReceivedLicensesForOrganization",
})) as any;

export type ListResourceInventoryError =
  | AccessDeniedException
  | AuthorizationException
  | FailedDependencyException
  | FilterLimitExceededException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | CommonErrors;
/**
 * Lists resources managed using Systems Manager inventory.
 */
export const listResourceInventory: API.OperationMethod<
  ListResourceInventoryRequest,
  ListResourceInventoryResponse,
  ListResourceInventoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      MaxResults: 0,
      NextToken: 0,
      Filters: D.list({ Name: 0, Condition: 0, Value: 0 }),
    },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    FailedDependencyException,
    FilterLimitExceededException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceInventory",
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags for the specified resource. For more information about tagging support in
 * License Manager, see the TagResource operation.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0 } },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListTokensError =
  | AccessDeniedException
  | AuthorizationException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Lists your tokens.
 */
export const listTokens: API.OperationMethod<
  ListTokensRequest,
  ListTokensResponse,
  ListTokensError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TokenIds: 0,
      Filters: D.list(i_Filter),
      NextToken: 0,
      MaxResults: 0,
    },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTokens",
})) as any;

export type ListUsageForLicenseConfigurationError =
  | AccessDeniedException
  | AuthorizationException
  | FilterLimitExceededException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | CommonErrors;
/**
 * Lists all license usage records for a license configuration, displaying license
 * consumption details by resource at a selected point in time. Use this action to audit the
 * current license consumption for any license inventory and configuration.
 */
export const listUsageForLicenseConfiguration: API.OperationMethod<
  ListUsageForLicenseConfigurationRequest,
  ListUsageForLicenseConfigurationResponse,
  ListUsageForLicenseConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      LicenseConfigurationArn: 0,
      MaxResults: 0,
      NextToken: 0,
      Filters: D.list(i_Filter),
    },
    output: {
      LicenseConfigurationUsageList: D.list({ AssociationTime: D.ts }),
    },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    FilterLimitExceededException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUsageForLicenseConfiguration",
})) as any;

export type RejectGrantError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Rejects the specified grant.
 */
export const rejectGrant: API.OperationMethod<
  RejectGrantRequest,
  RejectGrantResponse,
  RejectGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { GrantArn: 0 } },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectGrant",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Adds the specified tags to the specified resource. The following resources support
 * tagging in License Manager:
 *
 * - Licenses
 *
 * - Grants
 *
 * - License configurations
 *
 * - Report generators
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, Tags: D.list(i_Tag) } },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, TagKeys: 0 } },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateLicenseAssetGroupError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Updates a license asset group.
 */
export const updateLicenseAssetGroup: API.OperationMethod<
  UpdateLicenseAssetGroupRequest,
  UpdateLicenseAssetGroupResponse,
  UpdateLicenseAssetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Description: 0,
      LicenseAssetGroupConfigurations: D.list(i_LicenseAssetGroupConfiguration),
      AssociatedLicenseAssetRulesetARNs: 0,
      Properties: D.list(i_LicenseAssetGroupProperty),
      LicenseAssetGroupArn: 0,
      Status: 0,
      ClientToken: 0,
    },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLicenseAssetGroup",
})) as any;

export type UpdateLicenseAssetRulesetError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Updates a license asset ruleset.
 */
export const updateLicenseAssetRuleset: API.OperationMethod<
  UpdateLicenseAssetRulesetRequest,
  UpdateLicenseAssetRulesetResponse,
  UpdateLicenseAssetRulesetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Description: 0,
      Rules: D.list(i_LicenseAssetRule),
      LicenseAssetRulesetArn: 0,
      ClientToken: 0,
    },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLicenseAssetRuleset",
})) as any;

export type UpdateLicenseConfigurationError =
  | AccessDeniedException
  | AuthorizationException
  | ConflictException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceLimitExceededException
  | ServerInternalException
  | LicenseConfigurationNotFound
  | CommonErrors;
/**
 * Modifies the attributes of an existing license configuration.
 */
export const updateLicenseConfiguration: API.OperationMethod<
  UpdateLicenseConfigurationRequest,
  UpdateLicenseConfigurationResponse,
  UpdateLicenseConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      LicenseConfigurationArn: 0,
      LicenseConfigurationStatus: 0,
      LicenseRules: 0,
      LicenseCount: 0,
      LicenseCountHardLimit: 0,
      Name: 0,
      Description: 0,
      ProductInformationList: D.list(i_ProductInformation),
      DisassociateWhenNotFound: 0,
      LicenseExpiry: 0,
    },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    ConflictException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceLimitExceededException,
    ServerInternalException,
    LicenseConfigurationNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLicenseConfiguration",
})) as any;

export type UpdateLicenseManagerReportGeneratorError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Updates a report generator.
 *
 * After you make changes to a report generator, it starts generating new reports within 60 minutes of being updated.
 */
export const updateLicenseManagerReportGenerator: API.OperationMethod<
  UpdateLicenseManagerReportGeneratorRequest,
  UpdateLicenseManagerReportGeneratorResponse,
  UpdateLicenseManagerReportGeneratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      LicenseManagerReportGeneratorArn: 0,
      ReportGeneratorName: 0,
      Type: 0,
      ReportContext: i_ReportContext,
      ReportFrequency: i_ReportFrequency,
      ClientToken: 0,
      Description: 0,
    },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLicenseManagerReportGenerator",
})) as any;

export type UpdateLicenseSpecificationsForResourceError =
  | AccessDeniedException
  | AuthorizationException
  | ConflictException
  | InvalidParameterValueException
  | InvalidResourceStateException
  | LicenseUsageException
  | RateLimitExceededException
  | ServerInternalException
  | CommonErrors;
/**
 * Adds or removes the specified license configurations for the specified Amazon Web Services resource.
 *
 * You can update the license specifications of AMIs, instances, and hosts.
 * You cannot update the license specifications for launch templates and CloudFormation templates,
 * as they send license configurations to the operation that creates the resource.
 */
export const updateLicenseSpecificationsForResource: API.OperationMethod<
  UpdateLicenseSpecificationsForResourceRequest,
  UpdateLicenseSpecificationsForResourceResponse,
  UpdateLicenseSpecificationsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceArn: 0,
      AddLicenseSpecifications: D.list(i_LicenseSpecification),
      RemoveLicenseSpecifications: D.list(i_LicenseSpecification),
    },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    ConflictException,
    InvalidParameterValueException,
    InvalidResourceStateException,
    LicenseUsageException,
    RateLimitExceededException,
    ServerInternalException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLicenseSpecificationsForResource",
})) as any;

export type UpdateServiceSettingsError =
  | AccessDeniedException
  | AuthorizationException
  | ConflictException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Updates License Manager settings for the current Region.
 */
export const updateServiceSettings: API.OperationMethod<
  UpdateServiceSettingsRequest,
  UpdateServiceSettingsResponse,
  UpdateServiceSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      S3BucketArn: 0,
      SnsTopicArn: 0,
      OrganizationConfiguration: { EnableIntegration: 0 },
      EnableCrossAccountsDiscovery: 0,
      EnabledDiscoverySourceRegions: 0,
    },
  },
  errors: [
    AccessDeniedException,
    AuthorizationException,
    ConflictException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServiceSettings",
})) as any;

const i_ConsumptionConfiguration: D.LazyStruct = () => ({
  RenewType: 0,
  ProvisionalConfiguration: { MaxTimeToLiveInMinutes: 0 },
  BorrowConfiguration: { AllowEarlyCheckIn: 0, MaxTimeToLiveInMinutes: 0 },
});
const i_DatetimeRange: D.LazyStruct = () => ({ Begin: 0, End: 0 });
const i_Entitlement: D.LazyStruct = () => ({
  Name: 0,
  Value: 0,
  MaxCount: 0,
  Overage: 0,
  Unit: 0,
  AllowCheckIn: 0,
});
const i_EntitlementData: D.LazyStruct = () => ({ Name: 0, Value: 0, Unit: 0 });
const i_Filter: D.LazyStruct = () => ({ Name: 0, Values: 0 });
const i_Issuer: D.LazyStruct = () => ({ Name: 0, SignKey: 0 });
const i_LicenseAssetGroupConfiguration: D.LazyStruct = () => ({
  UsageDimension: 0,
});
const i_LicenseAssetGroupProperty: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_LicenseAssetRule: D.LazyStruct = () => ({
  RuleStatement: {
    LicenseConfigurationRuleStatement: {
      AndRuleStatement: i_AndRuleStatement,
      OrRuleStatement: i_OrRuleStatement,
      MatchingRuleStatement: i_MatchingRuleStatement,
    },
    LicenseRuleStatement: {
      AndRuleStatement: i_AndRuleStatement,
      OrRuleStatement: i_OrRuleStatement,
      MatchingRuleStatement: i_MatchingRuleStatement,
    },
    InstanceRuleStatement: {
      AndRuleStatement: i_AndRuleStatement,
      OrRuleStatement: i_OrRuleStatement,
      MatchingRuleStatement: i_MatchingRuleStatement,
      ScriptRuleStatement: i_ScriptRuleStatement,
    },
  },
});
const i_LicenseConversionContext: D.LazyStruct = () => ({
  UsageOperation: 0,
  ProductCodes: D.list({ ProductCodeId: 0, ProductCodeType: 0 }),
});
const i_LicenseSpecification: D.LazyStruct = () => ({
  LicenseConfigurationArn: 0,
  AmiAssociationScope: 0,
});
const i_Metadata: D.LazyStruct = () => ({ Name: 0, Value: 0 });
const i_ProductInformation: D.LazyStruct = () => ({
  ResourceType: 0,
  ProductInformationFilterList: D.list({
    ProductInformationFilterName: 0,
    ProductInformationFilterValue: 0,
    ProductInformationFilterComparator: 0,
  }),
});
const i_ReportContext: D.LazyStruct = () => ({
  licenseConfigurationArns: 0,
  licenseAssetGroupArns: 0,
  reportStartDate: 0,
  reportEndDate: 0,
});
const i_ReportFrequency: D.LazyStruct = () => ({ value: 0, period: 0 });
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_AutomatedDiscoveryInformation: D.LazyStruct = () => ({
  LastRunTime: D.ts,
});
const o_LicenseAssetGroup: D.LazyStruct = () => ({
  LatestUsageAnalysisTime: D.ts,
  LatestResourceDiscoveryTime: D.ts,
});
const o_LicenseConfiguration: D.LazyStruct = () => ({
  AutomatedDiscoveryInformation: o_AutomatedDiscoveryInformation,
});
const o_ReportGenerator: D.LazyStruct = () => ({
  ReportContext: { reportStartDate: D.ts, reportEndDate: D.ts },
});
const i_AndRuleStatement: D.LazyStruct = () => ({
  MatchingRuleStatements: D.list(i_MatchingRuleStatement),
  ScriptRuleStatements: D.list(i_ScriptRuleStatement),
});
const i_MatchingRuleStatement: D.LazyStruct = () => ({
  KeyToMatch: 0,
  Constraint: 0,
  ValueToMatch: 0,
});
const i_OrRuleStatement: D.LazyStruct = () => ({
  MatchingRuleStatements: D.list(i_MatchingRuleStatement),
  ScriptRuleStatements: D.list(i_ScriptRuleStatement),
});
const i_ScriptRuleStatement: D.LazyStruct = () => ({
  KeyToMatch: 0,
  Script: 0,
});
