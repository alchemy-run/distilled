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
const ns = /*@__PURE__*/ T.XmlNamespace("https://license-manager.amazonaws.com/doc/2018_08_01");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "License Manager",
  serviceShapeName: "AWSLicenseManager",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "license-manager" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-08-01");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://license-manager.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://license-manager.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://license-manager.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ServiceAccessDenied", httpResponseCode: 401 }),
      /*@__PURE__*/ T.HttpError(401),
    ),
  ).pipe(C.withAuthError) {}
export class AuthorizationException
  extends /*@__PURE__*/ S.TaggedError<AuthorizationException>()(
    "AuthorizationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "AuthorizationFailure", httpResponseCode: 403 }),
      /*@__PURE__*/ T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ConflictException", httpResponseCode: 409 }),
      /*@__PURE__*/ T.HttpError(409),
    ),
  ).pipe(C.withConflictError) {}
export class EntitlementNotAllowedException
  extends /*@__PURE__*/ S.TaggedError<EntitlementNotAllowedException>()(
    "EntitlementNotAllowedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class FailedDependencyException
  extends /*@__PURE__*/ S.TaggedError<FailedDependencyException>()(
    "FailedDependencyException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ErrorCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "FailedDependency", httpResponseCode: 424 }),
      /*@__PURE__*/ T.HttpError(424),
    ),
  ) {}
export class FilterLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<FilterLimitExceededException>()(
    "FilterLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "FilterLimitExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterValueException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterValueException>()(
    "InvalidParameterValueException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidParameterValueProvided",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidResourceStateException
  extends /*@__PURE__*/ S.TaggedError<InvalidResourceStateException>()(
    "InvalidResourceStateException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidResourceState", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class LicenseConfigurationNotFound
  extends /*@__PURE__*/ S.TaggedError<LicenseConfigurationNotFound>()(
    "LicenseConfigurationNotFound",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "InvalidParameterValueException",
      message: { includes: "Invalid license configuration ARN" },
    }),
  ).pipe(C.withNotFoundError) {}
export class LicenseUsageException
  extends /*@__PURE__*/ S.TaggedError<LicenseUsageException>()(
    "LicenseUsageException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "LicenseUsageFailure", httpResponseCode: 412 }),
      /*@__PURE__*/ T.HttpError(412),
    ),
  ) {}
export class NoEntitlementsAllowedException
  extends /*@__PURE__*/ S.TaggedError<NoEntitlementsAllowedException>()(
    "NoEntitlementsAllowedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class RateLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<RateLimitExceededException>()(
    "RateLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "RateLimitExceeded", httpResponseCode: 429 }),
      /*@__PURE__*/ T.HttpError(429),
    ),
  ).pipe(C.withThrottlingError) {}
export class RedirectException
  extends /*@__PURE__*/ S.TaggedError<RedirectException>()(
    "RedirectException",
    {
      Location: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.HttpHeader("Location")),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(308),
  ) {}
export class ResourceLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ResourceLimitExceededException>()(
    "ResourceLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ResourceLimitExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidResource.NotFound", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ServerInternalException
  extends /*@__PURE__*/ S.TaggedError<ServerInternalException>()(
    "ServerInternalException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InternalError", httpResponseCode: 500 }),
      /*@__PURE__*/ T.HttpError(500),
    ),
  ).pipe(C.withServerError) {}
export class UnsupportedDigitalSignatureMethodException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedDigitalSignatureMethodException>()(
    "UnsupportedDigitalSignatureMethodException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type LicenseAssetGroupConfigurationList = LicenseAssetGroupConfiguration[];
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
export type LicenseCountingType = "vCPU" | "Instance" | "Core" | "Socket" | (string & {});
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
export type ReportFrequencyType = "DAY" | "WEEK" | "MONTH" | "ONE_TIME" | (string & {});
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
export type LicenseDeletionStatus = "PENDING_DELETE" | "DELETED" | (string & {});
export interface DeleteLicenseResponse {
  Status?: LicenseDeletionStatus;
  DeletionDate?: string;
}
export interface DeleteLicenseAssetGroupRequest {
  LicenseAssetGroupArn: string;
}
export type LicenseAssetGroupStatus = "ACTIVE" | "DISABLED" | "DELETED" | (string & {});
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
export type LicenseConversionTaskStatus = "IN_PROGRESS" | "SUCCEEDED" | "FAILED" | (string & {});
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
export type LicenseConfigurationAssociations = LicenseConfigurationAssociation[];
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
export type LicenseConfigurationStatus = "AVAILABLE" | "DISABLED" | (string & {});
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
  input: __S(0, __c0, 0) as any as S.Schema<AcceptGrantRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<AcceptGrantResponse>,
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
}));

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
  input: __S(32, __c2, 0) as any as S.Schema<CheckInLicenseRequest>,
  output: __S(48, __c3, 0) as any as S.Schema<CheckInLicenseResponse>,
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
}));

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
  input: __S(64, __c4, 0) as any as S.Schema<CheckoutBorrowLicenseRequest>,
  output: __S(65, __c4, 1) as any as S.Schema<CheckoutBorrowLicenseResponse>,
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
}));

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
  input: __S(112, __c7, 0) as any as S.Schema<CheckoutLicenseRequest>,
  output: __S(113, __c7, 1) as any as S.Schema<CheckoutLicenseResponse>,
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
}));

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
  input: __S(128, __c8, 0) as any as S.Schema<CreateGrantRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<CreateGrantResponse>,
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
}));

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
  input: __S(192, __c12, 0) as any as S.Schema<CreateGrantVersionRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<CreateGrantVersionResponse>,
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
}));

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
  input: __S(224, __c14, 0) as any as S.Schema<CreateLicenseRequest>,
  output: __S(225, __c14, 1) as any as S.Schema<CreateLicenseResponse>,
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
}));

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
  input: __S(272, __c17, 0) as any as S.Schema<CreateLicenseAssetGroupRequest>,
  output: __S(304, __c19, 0) as any as S.Schema<CreateLicenseAssetGroupResponse>,
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
}));

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
  input: __S(320, __c20, 0) as any as S.Schema<CreateLicenseAssetRulesetRequest>,
  output: __S(352, __c22, 0) as any as S.Schema<CreateLicenseAssetRulesetResponse>,
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
}));

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
  input: __S(368, __c23, 0) as any as S.Schema<CreateLicenseConfigurationRequest>,
  output: __S(369, __c23, 1) as any as S.Schema<CreateLicenseConfigurationResponse>,
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
}));

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
  input: __S(400, __c25, 0) as any as S.Schema<CreateLicenseConversionTaskForResourceRequest>,
  output: __S(401, __c25, 1) as any as S.Schema<CreateLicenseConversionTaskForResourceResponse>,
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
}));

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
  input: __S(432, __c27, 0) as any as S.Schema<CreateLicenseManagerReportGeneratorRequest>,
  output: __S(433, __c27, 1) as any as S.Schema<CreateLicenseManagerReportGeneratorResponse>,
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
}));

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
  input: __S(464, __c29, 0) as any as S.Schema<CreateLicenseVersionRequest>,
  output: __S(465, __c29, 1) as any as S.Schema<CreateLicenseVersionResponse>,
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
}));

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
  input: __S(480, __c30, 0) as any as S.Schema<CreateTokenRequest>,
  output: __S(481, __c30, 1) as any as S.Schema<CreateTokenResponse>,
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
}));

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
  input: __S(496, __c31, 0) as any as S.Schema<DeleteGrantRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteGrantResponse>,
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
}));

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
  input: __S(512, __c32, 0) as any as S.Schema<DeleteLicenseRequest>,
  output: __S(513, __c32, 1) as any as S.Schema<DeleteLicenseResponse>,
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
}));

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
  input: __S(528, __c33, 0) as any as S.Schema<DeleteLicenseAssetGroupRequest>,
  output: __S(529, __c33, 1) as any as S.Schema<DeleteLicenseAssetGroupResponse>,
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
}));

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
  input: __S(544, __c34, 0) as any as S.Schema<DeleteLicenseAssetRulesetRequest>,
  output: __S(48, __c3, 0) as any as S.Schema<DeleteLicenseAssetRulesetResponse>,
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
}));

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
  input: __S(560, __c35, 0) as any as S.Schema<DeleteLicenseConfigurationRequest>,
  output: __S(48, __c3, 0) as any as S.Schema<DeleteLicenseConfigurationResponse>,
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
}));

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
  input: __S(576, __c36, 0) as any as S.Schema<DeleteLicenseManagerReportGeneratorRequest>,
  output: __S(48, __c3, 0) as any as S.Schema<DeleteLicenseManagerReportGeneratorResponse>,
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
}));

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
  input: __S(592, __c37, 0) as any as S.Schema<DeleteTokenRequest>,
  output: __S(48, __c3, 0) as any as S.Schema<DeleteTokenResponse>,
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
}));

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
  input: __S(608, __c38, 0) as any as S.Schema<ExtendLicenseConsumptionRequest>,
  output: __S(609, __c38, 1) as any as S.Schema<ExtendLicenseConsumptionResponse>,
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
}));

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
  input: __S(624, __c39, 0) as any as S.Schema<GetAccessTokenRequest>,
  output: __S(625, __c39, 1) as any as S.Schema<GetAccessTokenResponse>,
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
}));

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
  input: __S(640, __c40, 0) as any as S.Schema<GetGrantRequest>,
  output: __S(641, __c40, 1) as any as S.Schema<GetGrantResponse>,
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
}));

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
  input: __S(672, __c42, 0) as any as S.Schema<GetLicenseRequest>,
  output: __S(673, __c42, 1) as any as S.Schema<GetLicenseResponse>,
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
}));

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
  input: __S(720, __c45, 0) as any as S.Schema<GetLicenseAssetGroupRequest>,
  output: __S(721, __c45, 1) as any as S.Schema<GetLicenseAssetGroupResponse>,
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
}));

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
  input: __S(752, __c47, 0) as any as S.Schema<GetLicenseAssetRulesetRequest>,
  output: __S(753, __c47, 1) as any as S.Schema<GetLicenseAssetRulesetResponse>,
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
}));

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
  input: __S(784, __c49, 0) as any as S.Schema<GetLicenseConfigurationRequest>,
  output: __S(785, __c49, 1) as any as S.Schema<GetLicenseConfigurationResponse>,
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
}));

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
  input: __S(816, __c51, 0) as any as S.Schema<GetLicenseConversionTaskRequest>,
  output: __S(817, __c51, 1) as any as S.Schema<GetLicenseConversionTaskResponse>,
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
}));

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
  input: __S(832, __c52, 0) as any as S.Schema<GetLicenseManagerReportGeneratorRequest>,
  output: __S(833, __c52, 1) as any as S.Schema<GetLicenseManagerReportGeneratorResponse>,
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
}));

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
  input: __S(864, __c54, 0) as any as S.Schema<GetLicenseUsageRequest>,
  output: __S(868, __c54, 4) as any as S.Schema<GetLicenseUsageResponse>,
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
}));

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
  input: __S(880, __c55, 0) as any as S.Schema<GetServiceSettingsRequest>,
  output: __S(886, __c55, 6) as any as S.Schema<GetServiceSettingsResponse>,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    RateLimitExceededException,
    ServerInternalException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceSettings",
}));

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
  input: __S(912, __c57, 0) as any as S.Schema<ListAssetsForLicenseAssetGroupRequest>,
  output: __S(915, __c57, 3) as any as S.Schema<ListAssetsForLicenseAssetGroupResponse>,
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
}));

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
  input: __S(928, __c58, 0) as any as S.Schema<ListAssociationsForLicenseConfigurationRequest>,
  output: __S(931, __c58, 3) as any as S.Schema<ListAssociationsForLicenseConfigurationResponse>,
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
}));

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
  input: __S(944, __c59, 0) as any as S.Schema<ListDistributedGrantsRequest>,
  output: __S(993, __c62, 1) as any as S.Schema<ListDistributedGrantsResponse>,
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
}));

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
  input: __S(
    1008,
    __c63,
    0,
  ) as any as S.Schema<ListFailuresForLicenseConfigurationOperationsRequest>,
  output: __S(
    1011,
    __c63,
    3,
  ) as any as S.Schema<ListFailuresForLicenseConfigurationOperationsResponse>,
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
}));

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
  input: __S(1024, __c64, 0) as any as S.Schema<ListLicenseAssetGroupsRequest>,
  output: __S(1026, __c64, 2) as any as S.Schema<ListLicenseAssetGroupsResponse>,
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
}));

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
  input: __S(1056, __c66, 0) as any as S.Schema<ListLicenseAssetRulesetsRequest>,
  output: __S(1058, __c66, 2) as any as S.Schema<ListLicenseAssetRulesetsResponse>,
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
}));

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
  input: __S(1072, __c67, 0) as any as S.Schema<ListLicenseConfigurationsRequest>,
  output: __S(1090, __c68, 2) as any as S.Schema<ListLicenseConfigurationsResponse>,
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
}));

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
  input: __S(1104, __c69, 0) as any as S.Schema<ListLicenseConfigurationsForOrganizationRequest>,
  output: __S(1090, __c68, 2) as any as S.Schema<ListLicenseConfigurationsForOrganizationResponse>,
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
}));

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
  input: __S(1120, __c70, 0) as any as S.Schema<ListLicenseConversionTasksRequest>,
  output: __S(1123, __c70, 3) as any as S.Schema<ListLicenseConversionTasksResponse>,
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
}));

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
  input: __S(1136, __c71, 0) as any as S.Schema<ListLicenseManagerReportGeneratorsRequest>,
  output: __S(1138, __c71, 2) as any as S.Schema<ListLicenseManagerReportGeneratorsResponse>,
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
}));

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
  input: __S(1152, __c72, 0) as any as S.Schema<ListLicensesRequest>,
  output: __S(1169, __c73, 1) as any as S.Schema<ListLicensesResponse>,
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
}));

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
  input: __S(1184, __c74, 0) as any as S.Schema<ListLicenseSpecificationsForResourceRequest>,
  output: __S(1185, __c74, 1) as any as S.Schema<ListLicenseSpecificationsForResourceResponse>,
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
}));

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
  input: __S(1216, __c76, 0) as any as S.Schema<ListLicenseVersionsRequest>,
  output: __S(1169, __c73, 1) as any as S.Schema<ListLicenseVersionsResponse>,
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
}));

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
  input: __S(1232, __c77, 0) as any as S.Schema<ListReceivedGrantsRequest>,
  output: __S(993, __c62, 1) as any as S.Schema<ListReceivedGrantsResponse>,
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
}));

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
  input: __S(1248, __c78, 0) as any as S.Schema<ListReceivedGrantsForOrganizationRequest>,
  output: __S(993, __c62, 1) as any as S.Schema<ListReceivedGrantsForOrganizationResponse>,
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
}));

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
  input: __S(1264, __c79, 0) as any as S.Schema<ListReceivedLicensesRequest>,
  output: __S(1283, __c80, 3) as any as S.Schema<ListReceivedLicensesResponse>,
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
}));

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
  input: __S(1296, __c81, 0) as any as S.Schema<ListReceivedLicensesForOrganizationRequest>,
  output: __S(1283, __c80, 3) as any as S.Schema<ListReceivedLicensesForOrganizationResponse>,
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
}));

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
  input: __S(1314, __c82, 2) as any as S.Schema<ListResourceInventoryRequest>,
  output: __S(1317, __c82, 5) as any as S.Schema<ListResourceInventoryResponse>,
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
}));

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
  input: __S(1328, __c83, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(1329, __c83, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
}));

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
  input: __S(1344, __c84, 0) as any as S.Schema<ListTokensRequest>,
  output: __S(1347, __c84, 3) as any as S.Schema<ListTokensResponse>,
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
}));

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
  input: __S(1360, __c85, 0) as any as S.Schema<ListUsageForLicenseConfigurationRequest>,
  output: __S(1363, __c85, 3) as any as S.Schema<ListUsageForLicenseConfigurationResponse>,
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
}));

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
  input: __S(1376, __c86, 0) as any as S.Schema<RejectGrantRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<RejectGrantResponse>,
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
}));

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
  input: __S(1392, __c87, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(48, __c3, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(1408, __c88, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(48, __c3, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

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
  input: __S(1424, __c89, 0) as any as S.Schema<UpdateLicenseAssetGroupRequest>,
  output: __S(304, __c19, 0) as any as S.Schema<UpdateLicenseAssetGroupResponse>,
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
}));

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
  input: __S(1440, __c90, 0) as any as S.Schema<UpdateLicenseAssetRulesetRequest>,
  output: __S(352, __c22, 0) as any as S.Schema<UpdateLicenseAssetRulesetResponse>,
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
}));

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
  input: __S(1456, __c91, 0) as any as S.Schema<UpdateLicenseConfigurationRequest>,
  output: __S(48, __c3, 0) as any as S.Schema<UpdateLicenseConfigurationResponse>,
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
}));

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
  input: __S(1472, __c92, 0) as any as S.Schema<UpdateLicenseManagerReportGeneratorRequest>,
  output: __S(48, __c3, 0) as any as S.Schema<UpdateLicenseManagerReportGeneratorResponse>,
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
}));

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
  input: __S(1488, __c93, 0) as any as S.Schema<UpdateLicenseSpecificationsForResourceRequest>,
  output: __S(48, __c3, 0) as any as S.Schema<UpdateLicenseSpecificationsForResourceResponse>,
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
}));

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
  input: __S(1504, __c94, 0) as any as S.Schema<UpdateServiceSettingsRequest>,
  output: __S(48, __c3, 0) as any as S.Schema<UpdateServiceSettingsResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GrantArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AcceptGrantRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GrantArn: S.optional(S.String),
          Status: S.optional(S.String),
          Version: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "AcceptGrantResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LicenseConsumptionToken: S.String, Beneficiary: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CheckInLicenseRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "CheckInLicenseResponse",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LicenseArn: S.String,
          Entitlements: __S(81, __c5, 1),
          DigitalSignatureMethod: S.String,
          NodeId: S.optional(S.String),
          CheckoutMetadata: S.optional(__S(97, __c6, 1)),
          ClientToken: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CheckoutBorrowLicenseRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LicenseArn: S.optional(S.String),
          LicenseConsumptionToken: S.optional(S.String),
          EntitlementsAllowed: S.optional(__S(81, __c5, 1)),
          NodeId: S.optional(S.String),
          SignedToken: S.optional(S.String),
          IssuedAt: S.optional(S.String),
          Expiration: S.optional(S.String),
          CheckoutMetadata: S.optional(__S(97, __c6, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "CheckoutBorrowLicenseResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Value: S.optional(S.String), Unit: S.String }),
      ).annotate({ identifier: "EntitlementData" });
    case 1:
      return S.Array(__S(80, __c5, 0));
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "Metadata" });
    case 1:
      return S.Array(__S(96, __c6, 0));
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProductSKU: S.String,
          CheckoutType: S.String,
          KeyFingerprint: S.String,
          Entitlements: __S(81, __c5, 1),
          ClientToken: S.String,
          Beneficiary: S.optional(S.String),
          NodeId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CheckoutLicenseRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CheckoutType: S.optional(S.String),
          LicenseConsumptionToken: S.optional(S.String),
          EntitlementsAllowed: S.optional(__S(81, __c5, 1)),
          SignedToken: S.optional(S.String),
          NodeId: S.optional(S.String),
          IssuedAt: S.optional(S.String),
          Expiration: S.optional(S.String),
          LicenseArn: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CheckoutLicenseResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientToken: S.String,
          GrantName: S.String,
          LicenseArn: S.String,
          Principals: __S(176, __c11, 0),
          HomeRegion: S.String,
          AllowedOperations: __S(144, __c9, 0),
          Tags: S.optional(__S(161, __c10, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateGrantRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "Tag" });
    case 1:
      return S.Array(__S(160, __c10, 0));
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientToken: S.String,
          GrantArn: S.String,
          GrantName: S.optional(S.String),
          AllowedOperations: S.optional(__S(144, __c9, 0)),
          Status: S.optional(S.String),
          StatusReason: S.optional(S.String),
          SourceVersion: S.optional(S.String),
          Options: S.optional(__S(208, __c13, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateGrantVersionRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ActivationOverrideBehavior: S.optional(S.String) }),
      ).annotate({ identifier: "Options" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LicenseName: S.String,
          ProductName: S.String,
          ProductSKU: S.String,
          Issuer: __S(240, __c15, 0),
          HomeRegion: S.String,
          Validity: __S(256, __c16, 0),
          Entitlements: __S(258, __c16, 2),
          Beneficiary: S.String,
          ConsumptionConfiguration: __S(261, __c16, 5),
          LicenseMetadata: S.optional(__S(97, __c6, 1)),
          ClientToken: S.String,
          Tags: S.optional(__S(161, __c10, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateLicenseRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LicenseArn: S.optional(S.String),
          Status: S.optional(S.String),
          Version: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CreateLicenseResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.String, SignKey: S.optional(S.String) })).annotate({
        identifier: "Issuer",
      });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Begin: S.String, End: S.optional(S.String) })).annotate({
        identifier: "DatetimeRange",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Value: S.optional(S.String),
          MaxCount: S.optional(S.Number),
          Overage: S.optional(S.Boolean),
          Unit: S.String,
          AllowCheckIn: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "Entitlement" });
    case 2:
      return S.Array(__S(257, __c16, 1));
    case 3:
      return S.suspend(() => S.Struct({ MaxTimeToLiveInMinutes: S.Number })).annotate({
        identifier: "ProvisionalConfiguration",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({ AllowEarlyCheckIn: S.Boolean, MaxTimeToLiveInMinutes: S.Number }),
      ).annotate({ identifier: "BorrowConfiguration" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          RenewType: S.optional(S.String),
          ProvisionalConfiguration: S.optional(__S(259, __c16, 3)),
          BorrowConfiguration: S.optional(__S(260, __c16, 4)),
        }),
      ).annotate({ identifier: "ConsumptionConfiguration" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          LicenseAssetGroupConfigurations: __S(289, __c18, 1),
          AssociatedLicenseAssetRulesetARNs: __S(176, __c11, 0),
          Properties: S.optional(__S(291, __c18, 3)),
          Tags: S.optional(__S(161, __c10, 1)),
          ClientToken: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateLicenseAssetGroupRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ UsageDimension: S.optional(S.String) })).annotate({
        identifier: "LicenseAssetGroupConfiguration",
      });
    case 1:
      return S.Array(__S(288, __c18, 0));
    case 2:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "LicenseAssetGroupProperty",
      });
    case 3:
      return S.Array(__S(290, __c18, 2));
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LicenseAssetGroupArn: S.String, Status: S.String }).pipe(ns),
      ).annotate({ identifier: "CreateLicenseAssetGroupResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          Rules: __S(345, __c21, 9),
          Tags: S.optional(__S(161, __c10, 1)),
          ClientToken: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateLicenseAssetRulesetRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ KeyToMatch: S.String, Constraint: S.String, ValueToMatch: __S(176, __c11, 0) }),
      ).annotate({ identifier: "MatchingRuleStatement" });
    case 1:
      return S.Array(__S(336, __c21, 0));
    case 2:
      return S.suspend(() => S.Struct({ KeyToMatch: S.String, Script: S.String })).annotate({
        identifier: "ScriptRuleStatement",
      });
    case 3:
      return S.Array(__S(338, __c21, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          MatchingRuleStatements: S.optional(__S(337, __c21, 1)),
          ScriptRuleStatements: S.optional(__S(339, __c21, 3)),
        }),
      ).annotate({ identifier: "AndRuleStatement" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          AndRuleStatement: S.optional(__S(340, __c21, 4)),
          OrRuleStatement: S.optional(__S(340, __c21, 4)),
          MatchingRuleStatement: S.optional(__S(336, __c21, 0)),
        }),
      ).annotate({ identifier: "LicenseConfigurationRuleStatement" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          AndRuleStatement: S.optional(__S(340, __c21, 4)),
          OrRuleStatement: S.optional(__S(340, __c21, 4)),
          MatchingRuleStatement: S.optional(__S(336, __c21, 0)),
          ScriptRuleStatement: S.optional(__S(338, __c21, 2)),
        }),
      ).annotate({ identifier: "InstanceRuleStatement" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          LicenseConfigurationRuleStatement: S.optional(__S(341, __c21, 5)),
          LicenseRuleStatement: S.optional(__S(341, __c21, 5)),
          InstanceRuleStatement: S.optional(__S(342, __c21, 6)),
        }),
      ).annotate({ identifier: "RuleStatement" });
    case 8:
      return S.suspend(() => S.Struct({ RuleStatement: __S(343, __c21, 7) })).annotate({
        identifier: "LicenseAssetRule",
      });
    case 9:
      return S.Array(__S(344, __c21, 8));
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ LicenseAssetRulesetArn: S.String }).pipe(ns)).annotate({
        identifier: "CreateLicenseAssetRulesetResponse",
      });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          LicenseCountingType: S.String,
          LicenseCount: S.optional(S.Number),
          LicenseCountHardLimit: S.optional(S.Boolean),
          LicenseRules: S.optional(__S(176, __c11, 0)),
          Tags: S.optional(__S(161, __c10, 1)),
          DisassociateWhenNotFound: S.optional(S.Boolean),
          ProductInformationList: S.optional(__S(387, __c24, 3)),
          LicenseExpiry: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateLicenseConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ LicenseConfigurationArn: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "CreateLicenseConfigurationResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProductInformationFilterName: S.String,
          ProductInformationFilterValue: S.optional(__S(176, __c11, 0)),
          ProductInformationFilterComparator: S.String,
        }),
      ).annotate({ identifier: "ProductInformationFilter" });
    case 1:
      return S.Array(__S(384, __c24, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ ResourceType: S.String, ProductInformationFilterList: __S(385, __c24, 1) }),
      ).annotate({ identifier: "ProductInformation" });
    case 3:
      return S.Array(__S(386, __c24, 2));
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String,
          SourceLicenseContext: __S(418, __c26, 2),
          DestinationLicenseContext: __S(418, __c26, 2),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateLicenseConversionTaskForResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ LicenseConversionTaskId: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "CreateLicenseConversionTaskForResourceResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProductCodeId: S.String, ProductCodeType: S.String }),
      ).annotate({ identifier: "ProductCodeListItem" });
    case 1:
      return S.Array(__S(416, __c26, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          UsageOperation: S.optional(S.String),
          ProductCodes: S.optional(__S(417, __c26, 1)),
        }),
      ).annotate({ identifier: "LicenseConversionContext" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReportGeneratorName: S.String,
          Type: __S(144, __c9, 0),
          ReportContext: __S(448, __c28, 0),
          ReportFrequency: __S(449, __c28, 1),
          ClientToken: S.String,
          Description: S.optional(S.String),
          Tags: S.optional(__S(161, __c10, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateLicenseManagerReportGeneratorRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ LicenseManagerReportGeneratorArn: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "CreateLicenseManagerReportGeneratorResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          licenseConfigurationArns: S.optional(__S(176, __c11, 0)),
          licenseAssetGroupArns: S.optional(__S(176, __c11, 0)),
          reportStartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          reportEndDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ReportContext" });
    case 1:
      return S.suspend(() =>
        S.Struct({ value: S.optional(S.Number), period: S.optional(S.String) }),
      ).annotate({ identifier: "ReportFrequency" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LicenseArn: S.String,
          LicenseName: S.String,
          ProductName: S.String,
          Issuer: __S(240, __c15, 0),
          HomeRegion: S.String,
          Validity: __S(256, __c16, 0),
          LicenseMetadata: S.optional(__S(97, __c6, 1)),
          Entitlements: __S(258, __c16, 2),
          ConsumptionConfiguration: __S(261, __c16, 5),
          Status: S.String,
          ClientToken: S.String,
          SourceVersion: S.optional(S.String),
          ResetUsage: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateLicenseVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LicenseArn: S.optional(S.String),
          Version: S.optional(S.String),
          Status: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CreateLicenseVersionResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LicenseArn: S.String,
          RoleArns: S.optional(__S(176, __c11, 0)),
          ExpirationInDays: S.optional(S.Number),
          TokenProperties: S.optional(__S(176, __c11, 0)),
          ClientToken: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateTokenRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TokenId: S.optional(S.String),
          TokenType: S.optional(S.String),
          Token: S.optional(SensitiveString),
        }).pipe(ns),
      ).annotate({ identifier: "CreateTokenResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GrantArn: S.String,
          StatusReason: S.optional(S.String),
          Version: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteGrantRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LicenseArn: S.String, SourceVersion: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteLicenseRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Status: S.optional(S.String), DeletionDate: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "DeleteLicenseResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LicenseAssetGroupArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteLicenseAssetGroupRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Status: S.String }).pipe(ns)).annotate({
        identifier: "DeleteLicenseAssetGroupResponse",
      });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LicenseAssetRulesetArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteLicenseAssetRulesetRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LicenseConfigurationArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteLicenseConfigurationRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LicenseManagerReportGeneratorArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteLicenseManagerReportGeneratorRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TokenId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteTokenRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LicenseConsumptionToken: S.String, DryRun: S.optional(S.Boolean) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ExtendLicenseConsumptionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LicenseConsumptionToken: S.optional(S.String),
          Expiration: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ExtendLicenseConsumptionResponse" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Token: SensitiveString, TokenProperties: S.optional(__S(176, __c11, 0)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAccessTokenRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AccessToken: S.optional(SensitiveString) }).pipe(ns),
      ).annotate({ identifier: "GetAccessTokenResponse" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GrantArn: S.String, Version: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetGrantRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Grant: S.optional(__S(656, __c41, 0)) }).pipe(ns)).annotate(
        { identifier: "GetGrantResponse" },
      );
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GrantArn: S.String,
          GrantName: S.String,
          ParentArn: S.String,
          LicenseArn: S.String,
          GranteePrincipalArn: S.String,
          HomeRegion: S.String,
          GrantStatus: S.String,
          StatusReason: S.optional(S.String),
          Version: S.String,
          GrantedOperations: __S(144, __c9, 0),
          Options: S.optional(__S(208, __c13, 0)),
        }),
      ).annotate({ identifier: "Grant" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LicenseArn: S.String, Version: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetLicenseRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ License: S.optional(__S(688, __c43, 0)) }).pipe(ns),
      ).annotate({ identifier: "GetLicenseResponse" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LicenseArn: S.optional(S.String),
          LicenseName: S.optional(S.String),
          ProductName: S.optional(S.String),
          ProductSKU: S.optional(S.String),
          Issuer: S.optional(__S(704, __c44, 0)),
          HomeRegion: S.optional(S.String),
          Status: S.optional(S.String),
          Validity: S.optional(__S(256, __c16, 0)),
          Beneficiary: S.optional(S.String),
          Entitlements: S.optional(__S(258, __c16, 2)),
          ConsumptionConfiguration: S.optional(__S(261, __c16, 5)),
          LicenseMetadata: S.optional(__S(97, __c6, 1)),
          CreateTime: S.optional(S.String),
          Version: S.optional(S.String),
        }),
      ).annotate({ identifier: "License" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          SignKey: S.optional(S.String),
          KeyFingerprint: S.optional(S.String),
        }),
      ).annotate({ identifier: "IssuerDetails" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LicenseAssetGroupArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetLicenseAssetGroupRequest" });
    case 1:
      return S.suspend(() => S.Struct({ LicenseAssetGroup: __S(736, __c46, 0) }).pipe(ns)).annotate(
        { identifier: "GetLicenseAssetGroupResponse" },
      );
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          LicenseAssetGroupConfigurations: S.optional(__S(289, __c18, 1)),
          AssociatedLicenseAssetRulesetARNs: __S(176, __c11, 0),
          Properties: S.optional(__S(291, __c18, 3)),
          LicenseAssetGroupArn: S.String,
          Status: S.String,
          StatusMessage: S.optional(S.String),
          LatestUsageAnalysisTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LatestResourceDiscoveryTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "LicenseAssetGroup" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LicenseAssetRulesetArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetLicenseAssetRulesetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ LicenseAssetRuleset: __S(768, __c48, 0) }).pipe(ns),
      ).annotate({ identifier: "GetLicenseAssetRulesetResponse" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          Rules: __S(345, __c21, 9),
          LicenseAssetRulesetArn: S.String,
        }),
      ).annotate({ identifier: "LicenseAssetRuleset" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LicenseConfigurationArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetLicenseConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LicenseConfigurationId: S.optional(S.String),
          LicenseConfigurationArn: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          LicenseCountingType: S.optional(S.String),
          LicenseRules: S.optional(__S(176, __c11, 0)),
          LicenseCount: S.optional(S.Number),
          LicenseCountHardLimit: S.optional(S.Boolean),
          ConsumedLicenses: S.optional(S.Number),
          Status: S.optional(S.String),
          OwnerAccountId: S.optional(S.String),
          ConsumedLicenseSummaryList: S.optional(__S(801, __c50, 1)),
          ManagedResourceSummaryList: S.optional(__S(803, __c50, 3)),
          Tags: S.optional(__S(161, __c10, 1)),
          ProductInformationList: S.optional(__S(387, __c24, 3)),
          AutomatedDiscoveryInformation: S.optional(__S(804, __c50, 4)),
          DisassociateWhenNotFound: S.optional(S.Boolean),
          LicenseExpiry: S.optional(S.Number),
        }).pipe(ns),
      ).annotate({ identifier: "GetLicenseConfigurationResponse" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceType: S.optional(S.String), ConsumedLicenses: S.optional(S.Number) }),
      ).annotate({ identifier: "ConsumedLicenseSummary" });
    case 1:
      return S.Array(__S(800, __c50, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ ResourceType: S.optional(S.String), AssociationCount: S.optional(S.Number) }),
      ).annotate({ identifier: "ManagedResourceSummary" });
    case 3:
      return S.Array(__S(802, __c50, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ LastRunTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))) }),
      ).annotate({ identifier: "AutomatedDiscoveryInformation" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LicenseConversionTaskId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetLicenseConversionTaskRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LicenseConversionTaskId: S.optional(S.String),
          ResourceArn: S.optional(S.String),
          SourceLicenseContext: S.optional(__S(418, __c26, 2)),
          DestinationLicenseContext: S.optional(__S(418, __c26, 2)),
          StatusMessage: S.optional(S.String),
          Status: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LicenseConversionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(ns),
      ).annotate({ identifier: "GetLicenseConversionTaskResponse" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LicenseManagerReportGeneratorArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetLicenseManagerReportGeneratorRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ReportGenerator: S.optional(__S(849, __c53, 1)) }).pipe(ns),
      ).annotate({ identifier: "GetLicenseManagerReportGeneratorResponse" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ bucket: S.optional(S.String), keyPrefix: S.optional(S.String) }),
      ).annotate({ identifier: "S3Location" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ReportGeneratorName: S.optional(S.String),
          ReportType: S.optional(__S(144, __c9, 0)),
          ReportContext: S.optional(__S(448, __c28, 0)),
          ReportFrequency: S.optional(__S(449, __c28, 1)),
          LicenseManagerReportGeneratorArn: S.optional(S.String),
          LastRunStatus: S.optional(S.String),
          LastRunFailureReason: S.optional(S.String),
          LastReportGenerationTime: S.optional(S.String),
          ReportCreatorAccount: S.optional(S.String),
          Description: S.optional(S.String),
          S3Location: S.optional(__S(848, __c53, 0)),
          CreateTime: S.optional(S.String),
          Tags: S.optional(__S(161, __c10, 1)),
        }),
      ).annotate({ identifier: "ReportGenerator" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LicenseArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetLicenseUsageRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          ConsumedValue: S.String,
          MaxCount: S.optional(S.String),
          Unit: S.String,
        }),
      ).annotate({ identifier: "EntitlementUsage" });
    case 2:
      return S.Array(__S(865, __c54, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ EntitlementUsages: S.optional(__S(866, __c54, 2)) }),
      ).annotate({ identifier: "LicenseUsage" });
    case 4:
      return S.suspend(() =>
        S.Struct({ LicenseUsage: S.optional(__S(867, __c54, 3)) }).pipe(ns),
      ).annotate({ identifier: "GetLicenseUsageResponse" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetServiceSettingsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Message: S.optional(S.String) })).annotate({
        identifier: "CrossAccountDiscoveryServiceStatus",
      });
    case 2:
      return S.suspend(() => S.Struct({ Status: S.optional(S.String) })).annotate({
        identifier: "RegionStatus",
      });
    case 3:
      return S.Record(S.String, /*@__PURE__*/ __S(882, __c55, 2).pipe(S.optional));
    case 4:
      return S.suspend(() => S.Struct({ Message: S.optional(__S(883, __c55, 3)) })).annotate({
        identifier: "CrossRegionDiscoveryStatus",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          CrossAccountDiscovery: S.optional(__S(881, __c55, 1)),
          CrossRegionDiscovery: S.optional(__S(884, __c55, 4)),
        }),
      ).annotate({ identifier: "ServiceStatus" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          S3BucketArn: S.optional(S.String),
          SnsTopicArn: S.optional(S.String),
          OrganizationConfiguration: S.optional(__S(896, __c56, 0)),
          EnableCrossAccountsDiscovery: S.optional(S.Boolean),
          LicenseManagerResourceShareArn: S.optional(S.String),
          CrossRegionDiscoveryHomeRegion: S.optional(S.String),
          CrossRegionDiscoverySourceRegions: S.optional(__S(176, __c11, 0)),
          ServiceStatus: S.optional(__S(885, __c55, 5)),
        }).pipe(ns),
      ).annotate({ identifier: "GetServiceSettingsResponse" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ EnableIntegration: S.Boolean })).annotate({
        identifier: "OrganizationConfiguration",
      });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LicenseAssetGroupArn: S.String,
          AssetType: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAssetsForLicenseAssetGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AssetArn: S.optional(S.String),
          LatestAssetDiscoveryTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Asset" });
    case 2:
      return S.Array(__S(913, __c57, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Assets: S.optional(__S(914, __c57, 2)), NextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListAssetsForLicenseAssetGroupResponse" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LicenseConfigurationArn: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAssociationsForLicenseConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.optional(S.String),
          ResourceType: S.optional(S.String),
          ResourceOwnerId: S.optional(S.String),
          AssociationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AmiAssociationScope: S.optional(S.String),
        }),
      ).annotate({ identifier: "LicenseConfigurationAssociation" });
    case 2:
      return S.Array(__S(929, __c58, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          LicenseConfigurationAssociations: S.optional(__S(930, __c58, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListAssociationsForLicenseConfigurationResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GrantArns: S.optional(__S(176, __c11, 0)),
          Filters: S.optional(__S(976, __c61, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDistributedGrantsRequest" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("item")));
    case 1:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Values: S.optional(__S(960, __c60, 0)) }),
      ).annotate({ identifier: "Filter" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(961, __c60, 1));
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(656, __c41, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({ Grants: S.optional(__S(992, __c62, 0)), NextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListDistributedGrantsResponse" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LicenseConfigurationArn: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListFailuresForLicenseConfigurationOperationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.optional(S.String),
          ResourceType: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
          FailureTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          OperationName: S.optional(S.String),
          ResourceOwnerId: S.optional(S.String),
          OperationRequestedBy: S.optional(S.String),
          MetadataList: S.optional(__S(97, __c6, 1)),
        }),
      ).annotate({ identifier: "LicenseOperationFailure" });
    case 2:
      return S.Array(__S(1009, __c63, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          LicenseOperationFailureList: S.optional(__S(1010, __c63, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListFailuresForLicenseConfigurationOperationsResponse" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(1040, __c65, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListLicenseAssetGroupsRequest" });
    case 1:
      return S.Array(__S(736, __c46, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          LicenseAssetGroups: S.optional(__S(1025, __c64, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListLicenseAssetGroupsResponse" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.Array(
        /*@__PURE__*/ __S(961, __c60, 1)
          .pipe(/*@__PURE__*/ T.XmlName("item"))
          .annotate({ identifier: "Filter" }),
      );
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(1040, __c65, 0)),
          ShowAWSManagedLicenseAssetRulesets: S.optional(S.Boolean),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListLicenseAssetRulesetsRequest" });
    case 1:
      return S.Array(__S(768, __c48, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          LicenseAssetRulesets: S.optional(__S(1057, __c66, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListLicenseAssetRulesetsResponse" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LicenseConfigurationArns: S.optional(__S(176, __c11, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Filters: S.optional(__S(1040, __c65, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListLicenseConfigurationsRequest" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LicenseConfigurationId: S.optional(S.String),
          LicenseConfigurationArn: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          LicenseCountingType: S.optional(S.String),
          LicenseRules: S.optional(__S(176, __c11, 0)),
          LicenseCount: S.optional(S.Number),
          LicenseCountHardLimit: S.optional(S.Boolean),
          DisassociateWhenNotFound: S.optional(S.Boolean),
          ConsumedLicenses: S.optional(S.Number),
          Status: S.optional(S.String),
          OwnerAccountId: S.optional(S.String),
          ConsumedLicenseSummaryList: S.optional(__S(801, __c50, 1)),
          ManagedResourceSummaryList: S.optional(__S(803, __c50, 3)),
          ProductInformationList: S.optional(__S(387, __c24, 3)),
          AutomatedDiscoveryInformation: S.optional(__S(804, __c50, 4)),
          LicenseExpiry: S.optional(S.Number),
        }),
      ).annotate({ identifier: "LicenseConfiguration" });
    case 1:
      return S.Array(__S(1088, __c68, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          LicenseConfigurations: S.optional(__S(1089, __c68, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListLicenseConfigurationsResponse" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LicenseConfigurationArns: S.optional(__S(176, __c11, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Filters: S.optional(__S(1040, __c65, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListLicenseConfigurationsForOrganizationRequest" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          Filters: S.optional(__S(1040, __c65, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListLicenseConversionTasksRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LicenseConversionTaskId: S.optional(S.String),
          ResourceArn: S.optional(S.String),
          SourceLicenseContext: S.optional(__S(418, __c26, 2)),
          DestinationLicenseContext: S.optional(__S(418, __c26, 2)),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LicenseConversionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "LicenseConversionTask" });
    case 2:
      return S.Array(__S(1121, __c70, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          LicenseConversionTasks: S.optional(__S(1122, __c70, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListLicenseConversionTasksResponse" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(976, __c61, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListLicenseManagerReportGeneratorsRequest" });
    case 1:
      return S.Array(__S(849, __c53, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ReportGenerators: S.optional(__S(1137, __c71, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListLicenseManagerReportGeneratorsResponse" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LicenseArns: S.optional(__S(176, __c11, 0)),
          Filters: S.optional(__S(976, __c61, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListLicensesRequest" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(688, __c43, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          Licenses: S.optional(__S(1168, __c73, 0)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListLicensesResponse" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListLicenseSpecificationsForResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LicenseSpecifications: S.optional(__S(1201, __c75, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListLicenseSpecificationsForResourceResponse" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LicenseConfigurationArn: S.String, AmiAssociationScope: S.optional(S.String) }),
      ).annotate({ identifier: "LicenseSpecification" });
    case 1:
      return S.Array(__S(1200, __c75, 0));
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LicenseArn: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListLicenseVersionsRequest" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GrantArns: S.optional(__S(176, __c11, 0)),
          Filters: S.optional(__S(976, __c61, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListReceivedGrantsRequest" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LicenseArn: S.String,
          Filters: S.optional(__S(976, __c61, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListReceivedGrantsForOrganizationRequest" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LicenseArns: S.optional(__S(176, __c11, 0)),
          Filters: S.optional(__S(976, __c61, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListReceivedLicensesRequest" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReceivedStatus: S.optional(S.String),
          ReceivedStatusReason: S.optional(S.String),
          AllowedOperations: S.optional(__S(144, __c9, 0)),
        }),
      ).annotate({ identifier: "ReceivedMetadata" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LicenseArn: S.optional(S.String),
          LicenseName: S.optional(S.String),
          ProductName: S.optional(S.String),
          ProductSKU: S.optional(S.String),
          Issuer: S.optional(__S(704, __c44, 0)),
          HomeRegion: S.optional(S.String),
          Status: S.optional(S.String),
          Validity: S.optional(__S(256, __c16, 0)),
          Beneficiary: S.optional(S.String),
          Entitlements: S.optional(__S(258, __c16, 2)),
          ConsumptionConfiguration: S.optional(__S(261, __c16, 5)),
          LicenseMetadata: S.optional(__S(97, __c6, 1)),
          CreateTime: S.optional(S.String),
          Version: S.optional(S.String),
          ReceivedMetadata: S.optional(__S(1280, __c80, 0)),
        }),
      ).annotate({ identifier: "GrantedLicense" });
    case 2:
      return S.Array(__S(1281, __c80, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Licenses: S.optional(__S(1282, __c80, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListReceivedLicensesResponse" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(976, __c61, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListReceivedLicensesForOrganizationRequest" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Condition: S.String, Value: S.optional(S.String) }),
      ).annotate({ identifier: "InventoryFilter" });
    case 1:
      return S.Array(__S(1312, __c82, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Filters: S.optional(__S(1313, __c82, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListResourceInventoryRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ResourceId: S.optional(S.String),
          ResourceType: S.optional(S.String),
          ResourceArn: S.optional(S.String),
          Platform: S.optional(S.String),
          PlatformVersion: S.optional(S.String),
          ResourceOwningAccountId: S.optional(S.String),
          MarketplaceProductCodes: S.optional(__S(176, __c11, 0)),
          UsageOperation: S.optional(S.String),
          AmiId: S.optional(S.String),
          HostId: S.optional(S.String),
          Region: S.optional(S.String),
          InstanceType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResourceInventory" });
    case 4:
      return S.Array(__S(1315, __c82, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          ResourceInventoryList: S.optional(__S(1316, __c82, 4)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListResourceInventoryResponse" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(161, __c10, 1)) }).pipe(ns)).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TokenIds: S.optional(__S(176, __c11, 0)),
          Filters: S.optional(__S(976, __c61, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTokensRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TokenId: S.optional(S.String),
          TokenType: S.optional(S.String),
          LicenseArn: S.optional(S.String),
          ExpirationTime: S.optional(S.String),
          TokenProperties: S.optional(__S(176, __c11, 0)),
          RoleArns: S.optional(__S(176, __c11, 0)),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "TokenData" });
    case 2:
      return S.Array(__S(1345, __c84, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Tokens: S.optional(__S(1346, __c84, 2)), NextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListTokensResponse" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LicenseConfigurationArn: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Filters: S.optional(__S(1040, __c65, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListUsageForLicenseConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.optional(S.String),
          ResourceType: S.optional(S.String),
          ResourceStatus: S.optional(S.String),
          ResourceOwnerId: S.optional(S.String),
          AssociationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ConsumedLicenses: S.optional(S.Number),
        }),
      ).annotate({ identifier: "LicenseConfigurationUsage" });
    case 2:
      return S.Array(__S(1361, __c85, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          LicenseConfigurationUsageList: S.optional(__S(1362, __c85, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListUsageForLicenseConfigurationResponse" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GrantArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RejectGrantRequest" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, Tags: __S(161, __c10, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, TagKeys: __S(176, __c11, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          LicenseAssetGroupConfigurations: S.optional(__S(289, __c18, 1)),
          AssociatedLicenseAssetRulesetARNs: __S(176, __c11, 0),
          Properties: S.optional(__S(291, __c18, 3)),
          LicenseAssetGroupArn: S.String,
          Status: S.optional(S.String),
          ClientToken: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateLicenseAssetGroupRequest" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Rules: __S(345, __c21, 9),
          LicenseAssetRulesetArn: S.String,
          ClientToken: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateLicenseAssetRulesetRequest" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LicenseConfigurationArn: S.String,
          LicenseConfigurationStatus: S.optional(S.String),
          LicenseRules: S.optional(__S(176, __c11, 0)),
          LicenseCount: S.optional(S.Number),
          LicenseCountHardLimit: S.optional(S.Boolean),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          ProductInformationList: S.optional(__S(387, __c24, 3)),
          DisassociateWhenNotFound: S.optional(S.Boolean),
          LicenseExpiry: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateLicenseConfigurationRequest" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LicenseManagerReportGeneratorArn: S.String,
          ReportGeneratorName: S.String,
          Type: __S(144, __c9, 0),
          ReportContext: __S(448, __c28, 0),
          ReportFrequency: __S(449, __c28, 1),
          ClientToken: S.String,
          Description: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateLicenseManagerReportGeneratorRequest" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String,
          AddLicenseSpecifications: S.optional(__S(1201, __c75, 1)),
          RemoveLicenseSpecifications: S.optional(__S(1201, __c75, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateLicenseSpecificationsForResourceRequest" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          S3BucketArn: S.optional(S.String),
          SnsTopicArn: S.optional(S.String),
          OrganizationConfiguration: S.optional(__S(896, __c56, 0)),
          EnableCrossAccountsDiscovery: S.optional(S.Boolean),
          EnabledDiscoverySourceRegions: S.optional(__S(176, __c11, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateServiceSettingsRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
