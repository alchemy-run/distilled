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
  sdkId: "VerifiedPermissions",
  serviceShapeName: "VerifiedPermissions",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "verifiedpermissions" });
const ver = /*@__PURE__*/ T.ServiceVersion("2021-12-01");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_0();
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
              `https://verifiedpermissions-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://verifiedpermissions-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://verifiedpermissions.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(
          `https://verifiedpermissions.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://verifiedpermissions.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resources: /*@__PURE__*/ S.suspend(() => __S(1, __c0, 1)).annotate({
        identifier: "ResourceConflictList",
      }),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class InvalidStateException
  extends /*@__PURE__*/ S.TaggedError<InvalidStateException>()(
    "InvalidStateException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(406),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ResourceType",
      }),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ResourceType",
      }),
      serviceCode: /*@__PURE__*/ S.optional(S.String),
      quotaCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      serviceCode: /*@__PURE__*/ S.optional(S.String),
      quotaCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceName: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()("ValidationException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export type PolicyStoreId = string;
export type PolicyId = string;
export interface BatchGetPolicyInputItem {
  policyStoreId: string;
  policyId: string;
}
export type BatchGetPolicyInputList = BatchGetPolicyInputItem[];
export interface BatchGetPolicyInput {
  requests: BatchGetPolicyInputItem[];
}
export type PolicyType = "STATIC" | "TEMPLATE_LINKED" | (string & {});
export type StaticPolicyDescription = string | redacted.Redacted<string>;
export type PolicyStatement = string | redacted.Redacted<string>;
export interface StaticPolicyDefinitionDetail {
  description?: string | redacted.Redacted<string>;
  statement: string | redacted.Redacted<string>;
}
export type PolicyTemplateId = string;
export type EntityType = string | redacted.Redacted<string>;
export type EntityId = string | redacted.Redacted<string>;
export interface EntityIdentifier {
  entityType: string | redacted.Redacted<string>;
  entityId: string | redacted.Redacted<string>;
}
export interface TemplateLinkedPolicyDefinitionDetail {
  policyTemplateId: string;
  principal?: EntityIdentifier;
  resource?: EntityIdentifier;
}
export type PolicyDefinitionDetail =
  | { static: StaticPolicyDefinitionDetail; templateLinked?: never }
  | { static?: never; templateLinked: TemplateLinkedPolicyDefinitionDetail };
export type TimestampFormat = Date;
export type PolicyName = string;
export interface BatchGetPolicyOutputItem {
  policyStoreId: string;
  policyId: string;
  policyType: PolicyType;
  definition: PolicyDefinitionDetail;
  createdDate: Date;
  lastUpdatedDate: Date;
  name?: string;
}
export type BatchGetPolicyOutputList = BatchGetPolicyOutputItem[];
export type BatchGetPolicyErrorCode =
  | "POLICY_STORE_NOT_FOUND"
  | "POLICY_NOT_FOUND"
  | "POLICY_STORE_ALIAS_NOT_FOUND"
  | (string & {});
export interface BatchGetPolicyErrorItem {
  code: BatchGetPolicyErrorCode;
  policyStoreId: string;
  policyId: string;
  message: string;
}
export type BatchGetPolicyErrorList = BatchGetPolicyErrorItem[];
export interface BatchGetPolicyOutput {
  results: BatchGetPolicyOutputItem[];
  errors: BatchGetPolicyErrorItem[];
}
export type BooleanAttribute = boolean;
export type LongAttribute = number;
export type StringAttribute = string | redacted.Redacted<string>;
export type SetAttribute = AttributeValue[];
export type RecordAttribute = { [key: string]: AttributeValue | undefined };
export type IpAddr = string | redacted.Redacted<string>;
export type Decimal = string | redacted.Redacted<string>;
export type DatetimeAttribute = string | redacted.Redacted<string>;
export type Duration = string | redacted.Redacted<string>;
export type AttributeValue =
  | {
      boolean: boolean;
      entityIdentifier?: never;
      long?: never;
      string?: never;
      set?: never;
      record?: never;
      ipaddr?: never;
      decimal?: never;
      datetime?: never;
      duration?: never;
    }
  | {
      boolean?: never;
      entityIdentifier: EntityIdentifier;
      long?: never;
      string?: never;
      set?: never;
      record?: never;
      ipaddr?: never;
      decimal?: never;
      datetime?: never;
      duration?: never;
    }
  | {
      boolean?: never;
      entityIdentifier?: never;
      long: number;
      string?: never;
      set?: never;
      record?: never;
      ipaddr?: never;
      decimal?: never;
      datetime?: never;
      duration?: never;
    }
  | {
      boolean?: never;
      entityIdentifier?: never;
      long?: never;
      string: string | redacted.Redacted<string>;
      set?: never;
      record?: never;
      ipaddr?: never;
      decimal?: never;
      datetime?: never;
      duration?: never;
    }
  | {
      boolean?: never;
      entityIdentifier?: never;
      long?: never;
      string?: never;
      set: AttributeValue[];
      record?: never;
      ipaddr?: never;
      decimal?: never;
      datetime?: never;
      duration?: never;
    }
  | {
      boolean?: never;
      entityIdentifier?: never;
      long?: never;
      string?: never;
      set?: never;
      record: { [key: string]: AttributeValue | undefined };
      ipaddr?: never;
      decimal?: never;
      datetime?: never;
      duration?: never;
    }
  | {
      boolean?: never;
      entityIdentifier?: never;
      long?: never;
      string?: never;
      set?: never;
      record?: never;
      ipaddr: string | redacted.Redacted<string>;
      decimal?: never;
      datetime?: never;
      duration?: never;
    }
  | {
      boolean?: never;
      entityIdentifier?: never;
      long?: never;
      string?: never;
      set?: never;
      record?: never;
      ipaddr?: never;
      decimal: string | redacted.Redacted<string>;
      datetime?: never;
      duration?: never;
    }
  | {
      boolean?: never;
      entityIdentifier?: never;
      long?: never;
      string?: never;
      set?: never;
      record?: never;
      ipaddr?: never;
      decimal?: never;
      datetime: string | redacted.Redacted<string>;
      duration?: never;
    }
  | {
      boolean?: never;
      entityIdentifier?: never;
      long?: never;
      string?: never;
      set?: never;
      record?: never;
      ipaddr?: never;
      decimal?: never;
      datetime?: never;
      duration: string | redacted.Redacted<string>;
    };
export type EntityAttributes = { [key: string]: AttributeValue | undefined };
export type ParentList = EntityIdentifier[];
export type CedarTagSetAttribute = CedarTagValue[];
export type CedarTagRecordAttribute = { [key: string]: CedarTagValue | undefined };
export type CedarTagValue =
  | {
      boolean: boolean;
      entityIdentifier?: never;
      long?: never;
      string?: never;
      set?: never;
      record?: never;
      ipaddr?: never;
      decimal?: never;
      datetime?: never;
      duration?: never;
    }
  | {
      boolean?: never;
      entityIdentifier: EntityIdentifier;
      long?: never;
      string?: never;
      set?: never;
      record?: never;
      ipaddr?: never;
      decimal?: never;
      datetime?: never;
      duration?: never;
    }
  | {
      boolean?: never;
      entityIdentifier?: never;
      long: number;
      string?: never;
      set?: never;
      record?: never;
      ipaddr?: never;
      decimal?: never;
      datetime?: never;
      duration?: never;
    }
  | {
      boolean?: never;
      entityIdentifier?: never;
      long?: never;
      string: string | redacted.Redacted<string>;
      set?: never;
      record?: never;
      ipaddr?: never;
      decimal?: never;
      datetime?: never;
      duration?: never;
    }
  | {
      boolean?: never;
      entityIdentifier?: never;
      long?: never;
      string?: never;
      set: CedarTagValue[];
      record?: never;
      ipaddr?: never;
      decimal?: never;
      datetime?: never;
      duration?: never;
    }
  | {
      boolean?: never;
      entityIdentifier?: never;
      long?: never;
      string?: never;
      set?: never;
      record: { [key: string]: CedarTagValue | undefined };
      ipaddr?: never;
      decimal?: never;
      datetime?: never;
      duration?: never;
    }
  | {
      boolean?: never;
      entityIdentifier?: never;
      long?: never;
      string?: never;
      set?: never;
      record?: never;
      ipaddr: string | redacted.Redacted<string>;
      decimal?: never;
      datetime?: never;
      duration?: never;
    }
  | {
      boolean?: never;
      entityIdentifier?: never;
      long?: never;
      string?: never;
      set?: never;
      record?: never;
      ipaddr?: never;
      decimal: string | redacted.Redacted<string>;
      datetime?: never;
      duration?: never;
    }
  | {
      boolean?: never;
      entityIdentifier?: never;
      long?: never;
      string?: never;
      set?: never;
      record?: never;
      ipaddr?: never;
      decimal?: never;
      datetime: string | redacted.Redacted<string>;
      duration?: never;
    }
  | {
      boolean?: never;
      entityIdentifier?: never;
      long?: never;
      string?: never;
      set?: never;
      record?: never;
      ipaddr?: never;
      decimal?: never;
      datetime?: never;
      duration: string | redacted.Redacted<string>;
    };
export type EntityCedarTags = { [key: string]: CedarTagValue | undefined };
export interface EntityItem {
  identifier: EntityIdentifier;
  attributes?: { [key: string]: AttributeValue | undefined };
  parents?: EntityIdentifier[];
  tags?: { [key: string]: CedarTagValue | undefined };
}
export type EntityList = EntityItem[];
export type CedarJson = string | redacted.Redacted<string>;
export type EntitiesDefinition =
  | { entityList: EntityItem[]; cedarJson?: never }
  | { entityList?: never; cedarJson: string | redacted.Redacted<string> };
export type ActionType = string | redacted.Redacted<string>;
export type ActionId = string | redacted.Redacted<string>;
export interface ActionIdentifier {
  actionType: string | redacted.Redacted<string>;
  actionId: string | redacted.Redacted<string>;
}
export type ContextMap = { [key: string]: AttributeValue | undefined };
export type ContextDefinition =
  | { contextMap: { [key: string]: AttributeValue | undefined }; cedarJson?: never }
  | { contextMap?: never; cedarJson: string | redacted.Redacted<string> };
export interface BatchIsAuthorizedInputItem {
  principal?: EntityIdentifier;
  action?: ActionIdentifier;
  resource?: EntityIdentifier;
  context?: ContextDefinition;
}
export type BatchIsAuthorizedInputList = BatchIsAuthorizedInputItem[];
export interface BatchIsAuthorizedInput {
  policyStoreId: string;
  entities?: EntitiesDefinition;
  requests: BatchIsAuthorizedInputItem[];
}
export type Decision = "ALLOW" | "DENY" | (string & {});
export interface DeterminingPolicyItem {
  policyId: string;
}
export type DeterminingPolicyList = DeterminingPolicyItem[];
export interface EvaluationErrorItem {
  errorDescription: string;
}
export type EvaluationErrorList = EvaluationErrorItem[];
export interface BatchIsAuthorizedOutputItem {
  request: BatchIsAuthorizedInputItem;
  decision: Decision;
  determiningPolicies: DeterminingPolicyItem[];
  errors: EvaluationErrorItem[];
}
export type BatchIsAuthorizedOutputList = BatchIsAuthorizedOutputItem[];
export interface BatchIsAuthorizedOutput {
  results: BatchIsAuthorizedOutputItem[];
}
export type Token = string | redacted.Redacted<string>;
export interface BatchIsAuthorizedWithTokenInputItem {
  action?: ActionIdentifier;
  resource?: EntityIdentifier;
  context?: ContextDefinition;
}
export type BatchIsAuthorizedWithTokenInputList = BatchIsAuthorizedWithTokenInputItem[];
export interface BatchIsAuthorizedWithTokenInput {
  policyStoreId: string;
  identityToken?: string | redacted.Redacted<string>;
  accessToken?: string | redacted.Redacted<string>;
  entities?: EntitiesDefinition;
  requests: BatchIsAuthorizedWithTokenInputItem[];
}
export interface BatchIsAuthorizedWithTokenOutputItem {
  request: BatchIsAuthorizedWithTokenInputItem;
  decision: Decision;
  determiningPolicies: DeterminingPolicyItem[];
  errors: EvaluationErrorItem[];
}
export type BatchIsAuthorizedWithTokenOutputList = BatchIsAuthorizedWithTokenOutputItem[];
export interface BatchIsAuthorizedWithTokenOutput {
  principal?: EntityIdentifier;
  results: BatchIsAuthorizedWithTokenOutputItem[];
}
export type IdempotencyToken = string;
export type UserPoolArn = string;
export type ClientId = string | redacted.Redacted<string>;
export type ClientIds = (string | redacted.Redacted<string>)[];
export type GroupEntityType = string | redacted.Redacted<string>;
export interface CognitoGroupConfiguration {
  groupEntityType: string | redacted.Redacted<string>;
}
export interface CognitoUserPoolConfiguration {
  userPoolArn: string;
  clientIds?: (string | redacted.Redacted<string>)[];
  groupConfiguration?: CognitoGroupConfiguration;
}
export type Issuer = string;
export type EntityIdPrefix = string | redacted.Redacted<string>;
export type Claim = string | redacted.Redacted<string>;
export interface OpenIdConnectGroupConfiguration {
  groupClaim: string | redacted.Redacted<string>;
  groupEntityType: string | redacted.Redacted<string>;
}
export type Audience = string;
export type Audiences = string[];
export interface OpenIdConnectAccessTokenConfiguration {
  principalIdClaim?: string | redacted.Redacted<string>;
  audiences?: string[];
}
export interface OpenIdConnectIdentityTokenConfiguration {
  principalIdClaim?: string | redacted.Redacted<string>;
  clientIds?: (string | redacted.Redacted<string>)[];
}
export type OpenIdConnectTokenSelection =
  | { accessTokenOnly: OpenIdConnectAccessTokenConfiguration; identityTokenOnly?: never }
  | { accessTokenOnly?: never; identityTokenOnly: OpenIdConnectIdentityTokenConfiguration };
export interface OpenIdConnectConfiguration {
  issuer: string;
  entityIdPrefix?: string | redacted.Redacted<string>;
  groupConfiguration?: OpenIdConnectGroupConfiguration;
  tokenSelection: OpenIdConnectTokenSelection;
}
export type Configuration =
  | {
      cognitoUserPoolConfiguration: CognitoUserPoolConfiguration;
      openIdConnectConfiguration?: never;
    }
  | {
      cognitoUserPoolConfiguration?: never;
      openIdConnectConfiguration: OpenIdConnectConfiguration;
    };
export type PrincipalEntityType = string | redacted.Redacted<string>;
export interface CreateIdentitySourceInput {
  clientToken?: string;
  policyStoreId: string;
  configuration: Configuration;
  principalEntityType?: string | redacted.Redacted<string>;
}
export type IdentitySourceId = string;
export interface CreateIdentitySourceOutput {
  createdDate: Date;
  identitySourceId: string;
  lastUpdatedDate: Date;
  policyStoreId: string;
}
export interface StaticPolicyDefinition {
  description?: string | redacted.Redacted<string>;
  statement: string | redacted.Redacted<string>;
}
export interface TemplateLinkedPolicyDefinition {
  policyTemplateId: string;
  principal?: EntityIdentifier;
  resource?: EntityIdentifier;
}
export type PolicyDefinition =
  | { static: StaticPolicyDefinition; templateLinked?: never }
  | { static?: never; templateLinked: TemplateLinkedPolicyDefinition };
export interface CreatePolicyInput {
  clientToken?: string;
  policyStoreId: string;
  definition: PolicyDefinition;
  name?: string;
}
export type ActionIdentifierList = ActionIdentifier[];
export type PolicyEffect = "Permit" | "Forbid" | (string & {});
export interface CreatePolicyOutput {
  policyStoreId: string;
  policyId: string;
  policyType: PolicyType;
  principal?: EntityIdentifier;
  resource?: EntityIdentifier;
  actions?: ActionIdentifier[];
  createdDate: Date;
  lastUpdatedDate: Date;
  effect?: PolicyEffect;
}
export type ValidationMode = "OFF" | "STRICT" | (string & {});
export interface ValidationSettings {
  mode: ValidationMode;
}
export type PolicyStoreDescription = string | redacted.Redacted<string>;
export type DeletionProtection = "ENABLED" | "DISABLED" | (string & {});
export type KmsKey = string;
export type EncryptionContextKey = string;
export type EncryptionContextValue = string;
export type EncryptionContext = { [key: string]: string | undefined };
export interface KmsEncryptionSettings {
  key: string;
  encryptionContext?: { [key: string]: string | undefined };
}
export type EncryptionSettings =
  | { kmsEncryptionSettings: KmsEncryptionSettings; default?: never }
  | { kmsEncryptionSettings?: never; default: Record<string, never> };
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreatePolicyStoreInput {
  clientToken?: string;
  validationSettings: ValidationSettings;
  description?: string | redacted.Redacted<string>;
  deletionProtection?: DeletionProtection;
  encryptionSettings?: EncryptionSettings;
  tags?: { [key: string]: string | undefined };
}
export type ResourceArn = string;
export interface CreatePolicyStoreOutput {
  policyStoreId: string;
  arn: string;
  createdDate: Date;
  lastUpdatedDate: Date;
}
export type Alias = string;
export interface CreatePolicyStoreAliasInput {
  aliasName: string;
  policyStoreId: string;
}
export interface CreatePolicyStoreAliasOutput {
  aliasName: string;
  policyStoreId: string;
  aliasArn: string;
  createdAt: Date;
}
export type PolicyTemplateDescription = string | redacted.Redacted<string>;
export type PolicyTemplateName = string;
export interface CreatePolicyTemplateInput {
  clientToken?: string;
  policyStoreId: string;
  description?: string | redacted.Redacted<string>;
  statement: string | redacted.Redacted<string>;
  name?: string;
}
export interface CreatePolicyTemplateOutput {
  policyStoreId: string;
  policyTemplateId: string;
  createdDate: Date;
  lastUpdatedDate: Date;
}
export interface DeleteIdentitySourceInput {
  policyStoreId: string;
  identitySourceId: string;
}
export interface DeleteIdentitySourceOutput {}
export interface DeletePolicyInput {
  policyStoreId: string;
  policyId: string;
}
export interface DeletePolicyOutput {}
export interface DeletePolicyStoreInput {
  policyStoreId: string;
}
export interface DeletePolicyStoreOutput {}
export type DeletionMode = "SoftDelete" | "HardDelete" | (string & {});
export interface DeletePolicyStoreAliasInput {
  aliasName: string;
  deletionMode?: DeletionMode;
}
export interface DeletePolicyStoreAliasOutput {}
export interface DeletePolicyTemplateInput {
  policyStoreId: string;
  policyTemplateId: string;
}
export interface DeletePolicyTemplateOutput {}
export interface GetIdentitySourceInput {
  policyStoreId: string;
  identitySourceId: string;
}
export type DiscoveryUrl = string;
export type OpenIdIssuer = "COGNITO" | (string & {});
export interface IdentitySourceDetails {
  clientIds?: (string | redacted.Redacted<string>)[];
  userPoolArn?: string;
  discoveryUrl?: string;
  openIdIssuer?: OpenIdIssuer;
}
export interface CognitoGroupConfigurationDetail {
  groupEntityType?: string | redacted.Redacted<string>;
}
export interface CognitoUserPoolConfigurationDetail {
  userPoolArn: string;
  clientIds: (string | redacted.Redacted<string>)[];
  issuer: string;
  groupConfiguration?: CognitoGroupConfigurationDetail;
}
export interface OpenIdConnectGroupConfigurationDetail {
  groupClaim: string | redacted.Redacted<string>;
  groupEntityType: string | redacted.Redacted<string>;
}
export interface OpenIdConnectAccessTokenConfigurationDetail {
  principalIdClaim?: string | redacted.Redacted<string>;
  audiences?: string[];
}
export interface OpenIdConnectIdentityTokenConfigurationDetail {
  principalIdClaim?: string | redacted.Redacted<string>;
  clientIds?: (string | redacted.Redacted<string>)[];
}
export type OpenIdConnectTokenSelectionDetail =
  | { accessTokenOnly: OpenIdConnectAccessTokenConfigurationDetail; identityTokenOnly?: never }
  | { accessTokenOnly?: never; identityTokenOnly: OpenIdConnectIdentityTokenConfigurationDetail };
export interface OpenIdConnectConfigurationDetail {
  issuer: string;
  entityIdPrefix?: string | redacted.Redacted<string>;
  groupConfiguration?: OpenIdConnectGroupConfigurationDetail;
  tokenSelection: OpenIdConnectTokenSelectionDetail;
}
export type ConfigurationDetail =
  | {
      cognitoUserPoolConfiguration: CognitoUserPoolConfigurationDetail;
      openIdConnectConfiguration?: never;
    }
  | {
      cognitoUserPoolConfiguration?: never;
      openIdConnectConfiguration: OpenIdConnectConfigurationDetail;
    };
export interface GetIdentitySourceOutput {
  createdDate: Date;
  details?: IdentitySourceDetails;
  identitySourceId: string;
  lastUpdatedDate: Date;
  policyStoreId: string;
  principalEntityType: string | redacted.Redacted<string>;
  configuration?: ConfigurationDetail;
}
export interface GetPolicyInput {
  policyStoreId: string;
  policyId: string;
}
export interface GetPolicyOutput {
  policyStoreId: string;
  policyId: string;
  policyType: PolicyType;
  principal?: EntityIdentifier;
  resource?: EntityIdentifier;
  actions?: ActionIdentifier[];
  definition: PolicyDefinitionDetail;
  createdDate: Date;
  lastUpdatedDate: Date;
  effect?: PolicyEffect;
  name?: string;
}
export interface GetPolicyStoreInput {
  policyStoreId: string;
  tags?: boolean;
}
export interface KmsEncryptionState {
  key: string;
  encryptionContext: { [key: string]: string | undefined };
}
export type EncryptionState =
  | { kmsEncryptionState: KmsEncryptionState; default?: never }
  | { kmsEncryptionState?: never; default: Record<string, never> };
export type CedarVersion = "CEDAR_2" | "CEDAR_4" | (string & {});
export interface GetPolicyStoreOutput {
  policyStoreId: string;
  arn: string;
  validationSettings: ValidationSettings;
  createdDate: Date;
  lastUpdatedDate: Date;
  description?: string | redacted.Redacted<string>;
  deletionProtection?: DeletionProtection;
  encryptionState?: EncryptionState;
  cedarVersion?: CedarVersion;
  tags?: { [key: string]: string | undefined };
}
export interface GetPolicyStoreAliasInput {
  aliasName: string;
}
export type AliasState = "Active" | "PendingDeletion" | (string & {});
export interface GetPolicyStoreAliasOutput {
  aliasName: string;
  policyStoreId: string;
  aliasArn: string;
  createdAt: Date;
  state: AliasState;
}
export interface GetPolicyTemplateInput {
  policyStoreId: string;
  policyTemplateId: string;
}
export interface GetPolicyTemplateOutput {
  policyStoreId: string;
  policyTemplateId: string;
  description?: string | redacted.Redacted<string>;
  statement: string | redacted.Redacted<string>;
  createdDate: Date;
  lastUpdatedDate: Date;
  name?: string;
}
export interface GetSchemaInput {
  policyStoreId: string;
}
export type SchemaJson = string | redacted.Redacted<string>;
export type Namespace = string | redacted.Redacted<string>;
export type NamespaceList = (string | redacted.Redacted<string>)[];
export interface GetSchemaOutput {
  policyStoreId: string;
  schema: string | redacted.Redacted<string>;
  createdDate: Date;
  lastUpdatedDate: Date;
  namespaces?: (string | redacted.Redacted<string>)[];
}
export interface IsAuthorizedInput {
  policyStoreId: string;
  principal?: EntityIdentifier;
  action?: ActionIdentifier;
  resource?: EntityIdentifier;
  context?: ContextDefinition;
  entities?: EntitiesDefinition;
}
export interface IsAuthorizedOutput {
  decision: Decision;
  determiningPolicies: DeterminingPolicyItem[];
  errors: EvaluationErrorItem[];
}
export interface IsAuthorizedWithTokenInput {
  policyStoreId: string;
  identityToken?: string | redacted.Redacted<string>;
  accessToken?: string | redacted.Redacted<string>;
  action?: ActionIdentifier;
  resource?: EntityIdentifier;
  context?: ContextDefinition;
  entities?: EntitiesDefinition;
}
export interface IsAuthorizedWithTokenOutput {
  decision: Decision;
  determiningPolicies: DeterminingPolicyItem[];
  errors: EvaluationErrorItem[];
  principal?: EntityIdentifier;
}
export type NextToken = string;
export type ListIdentitySourcesMaxResults = number;
export interface IdentitySourceFilter {
  principalEntityType?: string | redacted.Redacted<string>;
}
export type IdentitySourceFilters = IdentitySourceFilter[];
export interface ListIdentitySourcesInput {
  policyStoreId: string;
  nextToken?: string;
  maxResults?: number;
  filters?: IdentitySourceFilter[];
}
export interface IdentitySourceItemDetails {
  clientIds?: (string | redacted.Redacted<string>)[];
  userPoolArn?: string;
  discoveryUrl?: string;
  openIdIssuer?: OpenIdIssuer;
}
export interface CognitoGroupConfigurationItem {
  groupEntityType?: string | redacted.Redacted<string>;
}
export interface CognitoUserPoolConfigurationItem {
  userPoolArn: string;
  clientIds: (string | redacted.Redacted<string>)[];
  issuer: string;
  groupConfiguration?: CognitoGroupConfigurationItem;
}
export interface OpenIdConnectGroupConfigurationItem {
  groupClaim: string | redacted.Redacted<string>;
  groupEntityType: string | redacted.Redacted<string>;
}
export interface OpenIdConnectAccessTokenConfigurationItem {
  principalIdClaim?: string | redacted.Redacted<string>;
  audiences?: string[];
}
export interface OpenIdConnectIdentityTokenConfigurationItem {
  principalIdClaim?: string | redacted.Redacted<string>;
  clientIds?: (string | redacted.Redacted<string>)[];
}
export type OpenIdConnectTokenSelectionItem =
  | { accessTokenOnly: OpenIdConnectAccessTokenConfigurationItem; identityTokenOnly?: never }
  | { accessTokenOnly?: never; identityTokenOnly: OpenIdConnectIdentityTokenConfigurationItem };
export interface OpenIdConnectConfigurationItem {
  issuer: string;
  entityIdPrefix?: string | redacted.Redacted<string>;
  groupConfiguration?: OpenIdConnectGroupConfigurationItem;
  tokenSelection: OpenIdConnectTokenSelectionItem;
}
export type ConfigurationItem =
  | {
      cognitoUserPoolConfiguration: CognitoUserPoolConfigurationItem;
      openIdConnectConfiguration?: never;
    }
  | {
      cognitoUserPoolConfiguration?: never;
      openIdConnectConfiguration: OpenIdConnectConfigurationItem;
    };
export interface IdentitySourceItem {
  createdDate: Date;
  details?: IdentitySourceItemDetails;
  identitySourceId: string;
  lastUpdatedDate: Date;
  policyStoreId: string;
  principalEntityType: string | redacted.Redacted<string>;
  configuration?: ConfigurationItem;
}
export type IdentitySources = IdentitySourceItem[];
export interface ListIdentitySourcesOutput {
  nextToken?: string;
  identitySources: IdentitySourceItem[];
}
export type MaxResults = number;
export type EntityReference =
  | { unspecified: boolean; identifier?: never }
  | { unspecified?: never; identifier: EntityIdentifier };
export interface PolicyFilter {
  principal?: EntityReference;
  resource?: EntityReference;
  policyType?: PolicyType;
  policyTemplateId?: string;
}
export interface ListPoliciesInput {
  policyStoreId: string;
  nextToken?: string;
  maxResults?: number;
  filter?: PolicyFilter;
}
export interface StaticPolicyDefinitionItem {
  description?: string | redacted.Redacted<string>;
}
export interface TemplateLinkedPolicyDefinitionItem {
  policyTemplateId: string;
  principal?: EntityIdentifier;
  resource?: EntityIdentifier;
}
export type PolicyDefinitionItem =
  | { static: StaticPolicyDefinitionItem; templateLinked?: never }
  | { static?: never; templateLinked: TemplateLinkedPolicyDefinitionItem };
export interface PolicyItem {
  policyStoreId: string;
  policyId: string;
  policyType: PolicyType;
  principal?: EntityIdentifier;
  resource?: EntityIdentifier;
  actions?: ActionIdentifier[];
  definition: PolicyDefinitionItem;
  createdDate: Date;
  lastUpdatedDate: Date;
  effect?: PolicyEffect;
  name?: string;
}
export type PolicyList = PolicyItem[];
export interface ListPoliciesOutput {
  nextToken?: string;
  policies: PolicyItem[];
}
export interface PolicyStoreAliasFilter {
  policyStoreId?: string;
}
export interface ListPolicyStoreAliasesInput {
  nextToken?: string;
  maxResults?: number;
  filter?: PolicyStoreAliasFilter;
}
export interface PolicyStoreAliasItem {
  aliasName: string;
  policyStoreId: string;
  aliasArn: string;
  createdAt: Date;
  state: AliasState;
}
export type PolicyStoreAliasList = PolicyStoreAliasItem[];
export interface ListPolicyStoreAliasesOutput {
  nextToken?: string;
  policyStoreAliases: PolicyStoreAliasItem[];
}
export interface ListPolicyStoresInput {
  nextToken?: string;
  maxResults?: number;
}
export interface PolicyStoreItem {
  policyStoreId: string;
  arn: string;
  createdDate: Date;
  lastUpdatedDate?: Date;
  description?: string | redacted.Redacted<string>;
}
export type PolicyStoreList = PolicyStoreItem[];
export interface ListPolicyStoresOutput {
  nextToken?: string;
  policyStores: PolicyStoreItem[];
}
export interface ListPolicyTemplatesInput {
  policyStoreId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface PolicyTemplateItem {
  policyStoreId: string;
  policyTemplateId: string;
  description?: string | redacted.Redacted<string>;
  createdDate: Date;
  lastUpdatedDate: Date;
  name?: string;
}
export type PolicyTemplatesList = PolicyTemplateItem[];
export interface ListPolicyTemplatesOutput {
  nextToken?: string;
  policyTemplates: PolicyTemplateItem[];
}
export type AmazonResourceName = string;
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export interface ListTagsForResourceOutput {
  tags?: { [key: string]: string | undefined };
}
export type SchemaDefinition = { cedarJson: string | redacted.Redacted<string> };
export interface PutSchemaInput {
  policyStoreId: string;
  definition: SchemaDefinition;
}
export interface PutSchemaOutput {
  policyStoreId: string;
  namespaces: (string | redacted.Redacted<string>)[];
  createdDate: Date;
  lastUpdatedDate: Date;
}
export interface TagResourceInput {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceOutput {}
export type TagKeyList = string[];
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceOutput {}
export interface UpdateCognitoGroupConfiguration {
  groupEntityType: string | redacted.Redacted<string>;
}
export interface UpdateCognitoUserPoolConfiguration {
  userPoolArn: string;
  clientIds?: (string | redacted.Redacted<string>)[];
  groupConfiguration?: UpdateCognitoGroupConfiguration;
}
export interface UpdateOpenIdConnectGroupConfiguration {
  groupClaim: string | redacted.Redacted<string>;
  groupEntityType: string | redacted.Redacted<string>;
}
export interface UpdateOpenIdConnectAccessTokenConfiguration {
  principalIdClaim?: string | redacted.Redacted<string>;
  audiences?: string[];
}
export interface UpdateOpenIdConnectIdentityTokenConfiguration {
  principalIdClaim?: string | redacted.Redacted<string>;
  clientIds?: (string | redacted.Redacted<string>)[];
}
export type UpdateOpenIdConnectTokenSelection =
  | { accessTokenOnly: UpdateOpenIdConnectAccessTokenConfiguration; identityTokenOnly?: never }
  | { accessTokenOnly?: never; identityTokenOnly: UpdateOpenIdConnectIdentityTokenConfiguration };
export interface UpdateOpenIdConnectConfiguration {
  issuer: string;
  entityIdPrefix?: string | redacted.Redacted<string>;
  groupConfiguration?: UpdateOpenIdConnectGroupConfiguration;
  tokenSelection: UpdateOpenIdConnectTokenSelection;
}
export type UpdateConfiguration =
  | {
      cognitoUserPoolConfiguration: UpdateCognitoUserPoolConfiguration;
      openIdConnectConfiguration?: never;
    }
  | {
      cognitoUserPoolConfiguration?: never;
      openIdConnectConfiguration: UpdateOpenIdConnectConfiguration;
    };
export interface UpdateIdentitySourceInput {
  policyStoreId: string;
  identitySourceId: string;
  updateConfiguration: UpdateConfiguration;
  principalEntityType?: string | redacted.Redacted<string>;
}
export interface UpdateIdentitySourceOutput {
  createdDate: Date;
  identitySourceId: string;
  lastUpdatedDate: Date;
  policyStoreId: string;
}
export interface UpdateStaticPolicyDefinition {
  description?: string | redacted.Redacted<string>;
  statement: string | redacted.Redacted<string>;
}
export type UpdatePolicyDefinition = { static: UpdateStaticPolicyDefinition };
export interface UpdatePolicyInput {
  policyStoreId: string;
  policyId: string;
  definition?: UpdatePolicyDefinition;
  name?: string;
}
export interface UpdatePolicyOutput {
  policyStoreId: string;
  policyId: string;
  policyType: PolicyType;
  principal?: EntityIdentifier;
  resource?: EntityIdentifier;
  actions?: ActionIdentifier[];
  createdDate: Date;
  lastUpdatedDate: Date;
  effect?: PolicyEffect;
}
export interface UpdatePolicyStoreInput {
  policyStoreId: string;
  validationSettings: ValidationSettings;
  deletionProtection?: DeletionProtection;
  description?: string | redacted.Redacted<string>;
}
export interface UpdatePolicyStoreOutput {
  policyStoreId: string;
  arn: string;
  createdDate: Date;
  lastUpdatedDate: Date;
}
export interface UpdatePolicyTemplateInput {
  policyStoreId: string;
  policyTemplateId: string;
  description?: string | redacted.Redacted<string>;
  statement: string | redacted.Redacted<string>;
  name?: string;
}
export interface UpdatePolicyTemplateOutput {
  policyStoreId: string;
  policyTemplateId: string;
  createdDate: Date;
  lastUpdatedDate: Date;
}
export type ResourceType =
  | "IDENTITY_SOURCE"
  | "POLICY_STORE"
  | "POLICY"
  | "POLICY_TEMPLATE"
  | "SCHEMA"
  | "POLICY_STORE_ALIAS"
  | (string & {});
export interface ResourceConflict {
  resourceId: string;
  resourceType: ResourceType;
}
export type ResourceConflictList = ResourceConflict[];
export type BatchGetPolicyError = ValidationException | CommonErrors;
/**
 * Retrieves information about a group (batch) of policies.
 *
 * The `BatchGetPolicy` operation doesn't have its own IAM permission. To authorize this operation for Amazon Web Services principals, include the permission `verifiedpermissions:GetPolicy` in their IAM policies.
 */
export const batchGetPolicy: API.OperationMethod<
  BatchGetPolicyInput,
  BatchGetPolicyOutput,
  BatchGetPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1570, __c49, 2) as any as S.Schema<BatchGetPolicyInput>,
  output: __S(1575, __c49, 7) as any as S.Schema<BatchGetPolicyOutput>,
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetPolicy",
}));

export type BatchIsAuthorizedError = ResourceNotFoundException | ValidationException | CommonErrors;
/**
 * Makes a series of decisions about multiple authorization requests for one principal or resource. Each request contains the equivalent content of an `IsAuthorized` request: principal, action, resource, and context. Either the `principal` or the `resource` parameter must be identical across all requests. For example, Verified Permissions won't evaluate a pair of requests where `bob` views `photo1` and `alice` views `photo2`. Authorization of `bob` to view `photo1` and `photo2`, or `bob` and `alice` to view `photo1`, are valid batches.
 *
 * The request is evaluated against all policies in the specified policy store that match the entities that you declare. The result of the decisions is a series of `Allow` or `Deny` responses, along with the IDs of the policies that produced each decision.
 *
 * The `entities` of a `BatchIsAuthorized` API request can contain up to 100 principals and up to 100 resources. The `requests` of a `BatchIsAuthorized` API request can contain up to 30 requests.
 *
 * The `BatchIsAuthorized` operation doesn't have its own IAM permission. To authorize this operation for Amazon Web Services principals, include the permission `verifiedpermissions:IsAuthorized` in their IAM policies.
 */
export const batchIsAuthorized: API.OperationMethod<
  BatchIsAuthorizedInput,
  BatchIsAuthorizedOutput,
  BatchIsAuthorizedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(34, __c1, 2) as any as S.Schema<BatchIsAuthorizedInput>,
  output: __S(37, __c1, 5) as any as S.Schema<BatchIsAuthorizedOutput>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchIsAuthorized",
}));

export type BatchIsAuthorizedWithTokenError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Makes a series of decisions about multiple authorization requests for one token. The principal in this request comes from an external identity source in the form of an identity or access token, formatted as a JSON web token (JWT). The information in the parameters can also define additional context that Verified Permissions can include in the evaluations.
 *
 * The request is evaluated against all policies in the specified policy store that match the entities that you provide in the entities declaration and in the token. The result of the decisions is a series of `Allow` or `Deny` responses, along with the IDs of the policies that produced each decision.
 *
 * The `entities` of a `BatchIsAuthorizedWithToken` API request can contain up to 100 resources and up to 99 user groups. The `requests` of a `BatchIsAuthorizedWithToken` API request can contain up to 30 requests.
 *
 * The `BatchIsAuthorizedWithToken` operation doesn't have its own IAM permission. To authorize this operation for Amazon Web Services principals, include the permission `verifiedpermissions:IsAuthorizedWithToken` in their IAM policies.
 */
export const batchIsAuthorizedWithToken: API.OperationMethod<
  BatchIsAuthorizedWithTokenInput,
  BatchIsAuthorizedWithTokenOutput,
  BatchIsAuthorizedWithTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(130, __c4, 2) as any as S.Schema<BatchIsAuthorizedWithTokenInput>,
  output: __S(133, __c4, 5) as any as S.Schema<BatchIsAuthorizedWithTokenOutput>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchIsAuthorizedWithToken",
}));

export type CreateIdentitySourceError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Adds an identity source to a policy store-an Amazon Cognito user pool or OpenID Connect (OIDC) identity provider (IdP).
 *
 * After you create an identity source, you can use the identities provided by the IdP as proxies for the principal in authorization queries that use the IsAuthorizedWithToken or BatchIsAuthorizedWithToken API operations. These identities take the form of tokens that contain claims about the user, such as IDs, attributes and group memberships. Identity sources provide identity (ID) tokens and access tokens. Verified Permissions derives information about your user and session from token claims. Access tokens provide action `context` to your policies, and ID tokens provide principal `Attributes`.
 *
 * Tokens from an identity source user continue to be usable until they expire. Token revocation and resource deletion have no effect on the validity of a token in your policy store
 *
 * To reference a user from this identity source in your Cedar policies, refer to the following syntax examples.
 *
 * - Amazon Cognito user pool: `Namespace::[Entity type]::[User pool ID]|[user principal attribute]`, for example `MyCorp::User::us-east-1_EXAMPLE|a1b2c3d4-5678-90ab-cdef-EXAMPLE11111`.
 *
 * - OpenID Connect (OIDC) provider: `Namespace::[Entity type]::[entityIdPrefix]|[user principal attribute]`, for example `MyCorp::User::MyOIDCProvider|a1b2c3d4-5678-90ab-cdef-EXAMPLE22222`.
 *
 * Verified Permissions is * eventually consistent *. It can take a few seconds for a new or changed element to propagate through the service and be visible in the results of other Verified Permissions operations.
 */
export const createIdentitySource: API.OperationMethod<
  CreateIdentitySourceInput,
  CreateIdentitySourceOutput,
  CreateIdentitySourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c5, 0) as any as S.Schema<CreateIdentitySourceInput>,
  output: __S(291, __c9, 3) as any as S.Schema<CreateIdentitySourceOutput>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIdentitySource",
}));

export type CreatePolicyError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a Cedar policy and saves it in the specified policy store. You can create either a static policy or a policy linked to a policy template.
 *
 * - To create a static policy, provide the Cedar policy text in the `StaticPolicy` section of the `PolicyDefinition`.
 *
 * - To create a policy that is dynamically linked to a policy template, specify the policy template ID and the principal and resource to associate with this policy in the `templateLinked` section of the `PolicyDefinition`. If the policy template is ever updated, any policies linked to the policy template automatically use the updated template.
 *
 * Creating a policy causes it to be validated against the schema in the policy store. If the policy doesn't pass validation, the operation fails and the policy isn't stored.
 *
 * Verified Permissions is * eventually consistent *. It can take a few seconds for a new or changed element to propagate through the service and be visible in the results of other Verified Permissions operations.
 */
export const createPolicy: API.OperationMethod<
  CreatePolicyInput,
  CreatePolicyOutput,
  CreatePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c10, 0) as any as S.Schema<CreatePolicyInput>,
  output: __S(384, __c12, 0) as any as S.Schema<CreatePolicyOutput>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePolicy",
}));

export type CreatePolicyStoreError =
  | ConflictException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a policy store. A policy store is a container for policy resources.
 *
 * As of May 2026, Verified Permissions has aligned with Cedar and now supports multiple namespaces.
 *
 * Verified Permissions is * eventually consistent *. It can take a few seconds for a new or changed element to propagate through the service and be visible in the results of other Verified Permissions operations.
 */
export const createPolicyStore: API.OperationMethod<
  CreatePolicyStoreInput,
  CreatePolicyStoreOutput,
  CreatePolicyStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(418, __c13, 2) as any as S.Schema<CreatePolicyStoreInput>,
  output: __S(512, __c16, 0) as any as S.Schema<CreatePolicyStoreOutput>,
  errors: [ConflictException, ServiceQuotaExceededException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePolicyStore",
}));

export type CreatePolicyStoreAliasError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a policy store alias for the specified policy store. A policy store alias is an alternative identifier that you can use to reference a policy store in API operations.
 *
 * This operation is idempotent. If multiple CreatePolicyStoreAlias requests are made where the `aliasName` and `policyStoreId` fields are the same between the requests, subsequent requests will be ignored. For each duplicate CreatePolicyStoreAlias request, a Success response will be returned and a new policy store alias will not be created.
 *
 * Verified Permissions is * eventually consistent *. It can take a few seconds for a new or changed element to propagate through the service and be visible in the results of other Verified Permissions operations.
 */
export const createPolicyStoreAlias: API.OperationMethod<
  CreatePolicyStoreAliasInput,
  CreatePolicyStoreAliasOutput,
  CreatePolicyStoreAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c17, 0) as any as S.Schema<CreatePolicyStoreAliasInput>,
  output: __S(545, __c17, 1) as any as S.Schema<CreatePolicyStoreAliasOutput>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePolicyStoreAlias",
}));

export type CreatePolicyTemplateError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a policy template. A template can use placeholders for the principal and resource. A template must be instantiated into a policy by associating it with specific principals and resources to use for the placeholders. That instantiated policy can then be considered in authorization decisions. The instantiated policy works identically to any other policy, except that it is dynamically linked to the template. If the template changes, then any policies that are linked to that template are immediately updated as well.
 *
 * Verified Permissions is * eventually consistent *. It can take a few seconds for a new or changed element to propagate through the service and be visible in the results of other Verified Permissions operations.
 */
export const createPolicyTemplate: API.OperationMethod<
  CreatePolicyTemplateInput,
  CreatePolicyTemplateOutput,
  CreatePolicyTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c18, 0) as any as S.Schema<CreatePolicyTemplateInput>,
  output: __S(608, __c19, 0) as any as S.Schema<CreatePolicyTemplateOutput>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePolicyTemplate",
}));

export type DeleteIdentitySourceError =
  | ConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an identity source that references an identity provider (IdP) such as Amazon Cognito. After you delete the identity source, you can no longer use tokens for identities from that identity source to represent principals in authorization queries made using IsAuthorizedWithToken. operations.
 */
export const deleteIdentitySource: API.OperationMethod<
  DeleteIdentitySourceInput,
  DeleteIdentitySourceOutput,
  DeleteIdentitySourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c20, 0) as any as S.Schema<DeleteIdentitySourceInput>,
  output: __S(672, __c21, 0) as any as S.Schema<DeleteIdentitySourceOutput>,
  errors: [ConflictException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIdentitySource",
}));

export type DeletePolicyError = ConflictException | ResourceNotFoundException | CommonErrors;
/**
 * Deletes the specified policy from the policy store.
 *
 * This operation is idempotent; if you specify a policy that doesn't exist, the request response returns a successful `HTTP 200` status code.
 */
export const deletePolicy: API.OperationMethod<
  DeletePolicyInput,
  DeletePolicyOutput,
  DeletePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c22, 0) as any as S.Schema<DeletePolicyInput>,
  output: __S(672, __c21, 0) as any as S.Schema<DeletePolicyOutput>,
  errors: [ConflictException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePolicy",
}));

export type DeletePolicyStoreError = InvalidStateException | CommonErrors;
/**
 * Deletes the specified policy store.
 *
 * This operation is idempotent. If you specify a policy store that does not exist, the request response will still return a successful HTTP 200 status code.
 */
export const deletePolicyStore: API.OperationMethod<
  DeletePolicyStoreInput,
  DeletePolicyStoreOutput,
  DeletePolicyStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c23, 0) as any as S.Schema<DeletePolicyStoreInput>,
  output: __S(672, __c21, 0) as any as S.Schema<DeletePolicyStoreOutput>,
  errors: [InvalidStateException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePolicyStore",
}));

export type DeletePolicyStoreAliasError =
  | InvalidStateException
  | ValidationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified policy store alias.
 *
 * This operation is idempotent. If you specify a policy store alias that does not exist, the request response will still return a successful HTTP 200 status code.
 *
 * By default, when a policy store alias is deleted, it enters the `PendingDeletion` state. When a policy store alias is in the `PendingDeletion` state, new policy store aliases cannot be created with the same name. If the policy store alias is used in an API that has a `policyStoreId` field, the operation will fail with a `ResourceNotFound` exception.
 *
 * To immediately delete a policy store alias and bypass the `PendingDeletion` state, set the `deletionMode` parameter to `HardDelete`.
 *
 * Verified Permissions is eventually consistent. If you hard delete a policy store alias and then immediately recreate it to be associated with a different policy store, requests that reference this alias may continue to be evaluated against the previously associated policy store for a short period of time.
 */
export const deletePolicyStoreAlias: API.OperationMethod<
  DeletePolicyStoreAliasInput,
  DeletePolicyStoreAliasOutput,
  DeletePolicyStoreAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c24, 0) as any as S.Schema<DeletePolicyStoreAliasInput>,
  output: __S(672, __c21, 0) as any as S.Schema<DeletePolicyStoreAliasOutput>,
  errors: [InvalidStateException, ValidationException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePolicyStoreAlias",
}));

export type DeletePolicyTemplateError =
  | ConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified policy template from the policy store.
 *
 * This operation also deletes any policies that were created from the specified policy template. Those policies are immediately removed from all future API responses, and are asynchronously deleted from the policy store.
 */
export const deletePolicyTemplate: API.OperationMethod<
  DeletePolicyTemplateInput,
  DeletePolicyTemplateOutput,
  DeletePolicyTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c25, 0) as any as S.Schema<DeletePolicyTemplateInput>,
  output: __S(672, __c21, 0) as any as S.Schema<DeletePolicyTemplateOutput>,
  errors: [ConflictException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePolicyTemplate",
}));

export type GetIdentitySourceError = ResourceNotFoundException | CommonErrors;
/**
 * Retrieves the details about the specified identity source.
 */
export const getIdentitySource: API.OperationMethod<
  GetIdentitySourceInput,
  GetIdentitySourceOutput,
  GetIdentitySourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c26, 0) as any as S.Schema<GetIdentitySourceInput>,
  output: __S(868, __c27, 4) as any as S.Schema<GetIdentitySourceOutput>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdentitySource",
}));

export type GetPolicyError = ResourceNotFoundException | ValidationException | CommonErrors;
/**
 * Retrieves information about the specified policy.
 */
export const getPolicy: API.OperationMethod<
  GetPolicyInput,
  GetPolicyOutput,
  GetPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(896, __c28, 0) as any as S.Schema<GetPolicyInput>,
  output: __S(897, __c28, 1) as any as S.Schema<GetPolicyOutput>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicy",
}));

export type GetPolicyStoreError = ResourceNotFoundException | ValidationException | CommonErrors;
/**
 * Retrieves details about a policy store.
 */
export const getPolicyStore: API.OperationMethod<
  GetPolicyStoreInput,
  GetPolicyStoreOutput,
  GetPolicyStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(928, __c29, 0) as any as S.Schema<GetPolicyStoreInput>,
  output: __S(931, __c29, 3) as any as S.Schema<GetPolicyStoreOutput>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicyStore",
}));

export type GetPolicyStoreAliasError = ResourceNotFoundException | CommonErrors;
/**
 * Retrieves details about the specified policy store alias.
 */
export const getPolicyStoreAlias: API.OperationMethod<
  GetPolicyStoreAliasInput,
  GetPolicyStoreAliasOutput,
  GetPolicyStoreAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(960, __c30, 0) as any as S.Schema<GetPolicyStoreAliasInput>,
  output: __S(992, __c31, 0) as any as S.Schema<GetPolicyStoreAliasOutput>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicyStoreAlias",
}));

export type GetPolicyTemplateError = ResourceNotFoundException | CommonErrors;
/**
 * Retrieve the details for the specified policy template in the specified policy store.
 */
export const getPolicyTemplate: API.OperationMethod<
  GetPolicyTemplateInput,
  GetPolicyTemplateOutput,
  GetPolicyTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1024, __c32, 0) as any as S.Schema<GetPolicyTemplateInput>,
  output: __S(1025, __c32, 1) as any as S.Schema<GetPolicyTemplateOutput>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicyTemplate",
}));

export type GetSchemaError = ResourceNotFoundException | ValidationException | CommonErrors;
/**
 * Retrieve the details for the specified schema in the specified policy store.
 */
export const getSchema: API.OperationMethod<
  GetSchemaInput,
  GetSchemaOutput,
  GetSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1056, __c33, 0) as any as S.Schema<GetSchemaInput>,
  output: __S(1057, __c33, 1) as any as S.Schema<GetSchemaOutput>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSchema",
}));

export type IsAuthorizedError = ResourceNotFoundException | ValidationException | CommonErrors;
/**
 * Makes an authorization decision about a service request described in the parameters. The information in the parameters can also define additional context that Verified Permissions can include in the evaluation. The request is evaluated against all matching policies in the specified policy store. The result of the decision is either `Allow` or `Deny`, along with a list of the policies that resulted in the decision.
 */
export const isAuthorized: API.OperationMethod<
  IsAuthorizedInput,
  IsAuthorizedOutput,
  IsAuthorizedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1088, __c34, 0) as any as S.Schema<IsAuthorizedInput>,
  output: __S(1089, __c34, 1) as any as S.Schema<IsAuthorizedOutput>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "IsAuthorized",
}));

export type IsAuthorizedWithTokenError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Makes an authorization decision about a service request described in the parameters. The principal in this request comes from an external identity source in the form of an identity token formatted as a JSON web token (JWT). The information in the parameters can also define additional context that Verified Permissions can include in the evaluation. The request is evaluated against all matching policies in the specified policy store. The result of the decision is either `Allow` or `Deny`, along with a list of the policies that resulted in the decision.
 *
 * Verified Permissions validates each token that is specified in a request by checking its expiration date and its signature.
 *
 * Tokens from an identity source user continue to be usable until they expire. Token revocation and resource deletion have no effect on the validity of a token in your policy store
 */
export const isAuthorizedWithToken: API.OperationMethod<
  IsAuthorizedWithTokenInput,
  IsAuthorizedWithTokenOutput,
  IsAuthorizedWithTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1120, __c35, 0) as any as S.Schema<IsAuthorizedWithTokenInput>,
  output: __S(1121, __c35, 1) as any as S.Schema<IsAuthorizedWithTokenOutput>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "IsAuthorizedWithToken",
}));

export type ListIdentitySourcesError = ResourceNotFoundException | CommonErrors;
/**
 * Returns a paginated list of all of the identity sources defined in the specified policy store.
 */
export const listIdentitySources: API.PaginatedOperationMethod<
  ListIdentitySourcesInput,
  ListIdentitySourcesOutput,
  ListIdentitySourcesError,
  Credentials | HttpClient.HttpClient,
  IdentitySourceItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1154, __c36, 2) as any as S.Schema<ListIdentitySourcesInput>,
  output: __S(1156, __c36, 4) as any as S.Schema<ListIdentitySourcesOutput>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIdentitySources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "identitySources",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPoliciesError = ResourceNotFoundException | CommonErrors;
/**
 * Returns a paginated list of all policies stored in the specified policy store.
 */
export const listPolicies: API.PaginatedOperationMethod<
  ListPoliciesInput,
  ListPoliciesOutput,
  ListPoliciesError,
  Credentials | HttpClient.HttpClient,
  PolicyItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1186, __c37, 2) as any as S.Schema<ListPoliciesInput>,
  output: __S(1191, __c37, 7) as any as S.Schema<ListPoliciesOutput>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicies",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "policies",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPolicyStoreAliasesError = CommonErrors;
/**
 * Returns a paginated list of all policy store aliases in the calling Amazon Web Services account.
 */
export const listPolicyStoreAliases: API.PaginatedOperationMethod<
  ListPolicyStoreAliasesInput,
  ListPolicyStoreAliasesOutput,
  ListPolicyStoreAliasesError,
  Credentials | HttpClient.HttpClient,
  PolicyStoreAliasItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1217, __c38, 1) as any as S.Schema<ListPolicyStoreAliasesInput>,
  output: __S(1219, __c38, 3) as any as S.Schema<ListPolicyStoreAliasesOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicyStoreAliases",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "policyStoreAliases",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPolicyStoresError = CommonErrors;
/**
 * Returns a paginated list of all policy stores in the calling Amazon Web Services account.
 */
export const listPolicyStores: API.PaginatedOperationMethod<
  ListPolicyStoresInput,
  ListPolicyStoresOutput,
  ListPolicyStoresError,
  Credentials | HttpClient.HttpClient,
  PolicyStoreItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1248, __c39, 0) as any as S.Schema<ListPolicyStoresInput>,
  output: __S(1251, __c39, 3) as any as S.Schema<ListPolicyStoresOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicyStores",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "policyStores",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPolicyTemplatesError = ResourceNotFoundException | CommonErrors;
/**
 * Returns a paginated list of all policy templates in the specified policy store.
 */
export const listPolicyTemplates: API.PaginatedOperationMethod<
  ListPolicyTemplatesInput,
  ListPolicyTemplatesOutput,
  ListPolicyTemplatesError,
  Credentials | HttpClient.HttpClient,
  PolicyTemplateItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1280, __c40, 0) as any as S.Schema<ListPolicyTemplatesInput>,
  output: __S(1283, __c40, 3) as any as S.Schema<ListPolicyTemplatesOutput>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicyTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "policyTemplates",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the tags associated with the specified Amazon Verified Permissions resource. In Verified Permissions, policy stores can be tagged.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1312, __c41, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(1313, __c41, 1) as any as S.Schema<ListTagsForResourceOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PutSchemaError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates the policy schema in the specified policy store. The schema is used to validate any Cedar policies and policy templates submitted to the policy store. Any changes to the schema validate only policies and templates submitted after the schema change. Existing policies and templates are not re-evaluated against the changed schema. If you later update a policy, then it is evaluated against the new schema at that time.
 *
 * Verified Permissions is * eventually consistent *. It can take a few seconds for a new or changed element to propagate through the service and be visible in the results of other Verified Permissions operations.
 */
export const putSchema: API.OperationMethod<
  PutSchemaInput,
  PutSchemaOutput,
  PutSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1345, __c42, 1) as any as S.Schema<PutSchemaInput>,
  output: __S(1346, __c42, 2) as any as S.Schema<PutSchemaOutput>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSchema",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyTagsException
  | CommonErrors;
/**
 * Assigns one or more tags (key-value pairs) to the specified Amazon Verified Permissions resource. Tags can help you organize and categorize your resources. You can also use them to scope user permissions by granting a user permission to access or change only resources with certain tag values. In Verified Permissions, policy stores can be tagged.
 *
 * Tags don't have any semantic meaning to Amazon Web Services and are interpreted strictly as strings of characters.
 *
 * You can use the TagResource action with a resource that already has tags. If you specify a new tag key, this tag is appended to the list of tags associated with the resource. If you specify a tag key that is already associated with the resource, the new tag value that you specify replaces the previous value for that tag.
 *
 * You can associate as many as 50 tags with a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1376, __c43, 0) as any as S.Schema<TagResourceInput>,
  output: __S(672, __c21, 0) as any as S.Schema<TagResourceOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes one or more tags from the specified Amazon Verified Permissions resource. In Verified Permissions, policy stores can be tagged.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1408, __c44, 0) as any as S.Schema<UntagResourceInput>,
  output: __S(672, __c21, 0) as any as S.Schema<UntagResourceOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateIdentitySourceError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified identity source to use a new identity provider (IdP), or to change the mapping of identities from the IdP to a different principal entity type.
 *
 * Verified Permissions is * eventually consistent *. It can take a few seconds for a new or changed element to propagate through the service and be visible in the results of other Verified Permissions operations.
 */
export const updateIdentitySource: API.OperationMethod<
  UpdateIdentitySourceInput,
  UpdateIdentitySourceOutput,
  UpdateIdentitySourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1440, __c45, 0) as any as S.Schema<UpdateIdentitySourceInput>,
  output: __S(291, __c9, 3) as any as S.Schema<UpdateIdentitySourceOutput>,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIdentitySource",
}));

export type UpdatePolicyError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Modifies a Cedar static policy in the specified policy store. You can change only certain elements of the UpdatePolicyDefinition parameter. You can directly update only static policies. To change a template-linked policy, you must update the template instead, using UpdatePolicyTemplate.
 *
 * - If policy validation is enabled in the policy store, then updating a static policy causes Verified Permissions to validate the policy against the schema in the policy store. If the updated static policy doesn't pass validation, the operation fails and the update isn't stored.
 *
 * - When you edit a static policy, you can change only certain elements of a static policy:
 *
 * - The action referenced by the policy.
 *
 * - A condition clause, such as when and unless.
 *
 * You can't change these elements of a static policy:
 *
 * - Changing a policy from a static policy to a template-linked policy.
 *
 * - Changing the effect of a static policy from permit or forbid.
 *
 * - The principal referenced by a static policy.
 *
 * - The resource referenced by a static policy.
 *
 * - To update a template-linked policy, you must update the template instead.
 *
 * Verified Permissions is * eventually consistent *. It can take a few seconds for a new or changed element to propagate through the service and be visible in the results of other Verified Permissions operations.
 */
export const updatePolicy: API.OperationMethod<
  UpdatePolicyInput,
  UpdatePolicyOutput,
  UpdatePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1473, __c46, 1) as any as S.Schema<UpdatePolicyInput>,
  output: __S(384, __c12, 0) as any as S.Schema<UpdatePolicyOutput>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePolicy",
}));

export type UpdatePolicyStoreError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Modifies the validation setting for a policy store.
 *
 * Verified Permissions is * eventually consistent *. It can take a few seconds for a new or changed element to propagate through the service and be visible in the results of other Verified Permissions operations.
 */
export const updatePolicyStore: API.OperationMethod<
  UpdatePolicyStoreInput,
  UpdatePolicyStoreOutput,
  UpdatePolicyStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1504, __c47, 0) as any as S.Schema<UpdatePolicyStoreInput>,
  output: __S(512, __c16, 0) as any as S.Schema<UpdatePolicyStoreOutput>,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePolicyStore",
}));

export type UpdatePolicyTemplateError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified policy template. You can update only the description and the some elements of the policyBody.
 *
 * Changes you make to the policy template content are immediately (within the constraints of eventual consistency) reflected in authorization decisions that involve all template-linked policies instantiated from this template.
 *
 * Verified Permissions is * eventually consistent *. It can take a few seconds for a new or changed element to propagate through the service and be visible in the results of other Verified Permissions operations.
 */
export const updatePolicyTemplate: API.OperationMethod<
  UpdatePolicyTemplateInput,
  UpdatePolicyTemplateOutput,
  UpdatePolicyTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1536, __c48, 0) as any as S.Schema<UpdatePolicyTemplateInput>,
  output: __S(608, __c19, 0) as any as S.Schema<UpdatePolicyTemplateOutput>,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePolicyTemplate",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ resourceId: S.String, resourceType: S.String })).annotate({
        identifier: "ResourceConflict",
      });
    case 1:
      return S.Array(__S(0, __c0, 0));
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          principal: S.optional(__S(1600, __c50, 0)),
          action: S.optional(__S(64, __c2, 0)),
          resource: S.optional(__S(1600, __c50, 0)),
          context: S.optional(__S(108, __c3, 12)),
        }),
      ).annotate({ identifier: "BatchIsAuthorizedInputItem" });
    case 1:
      return S.Array(__S(32, __c1, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          policyStoreId: S.String,
          entities: S.optional(__S(107, __c3, 11)),
          requests: __S(33, __c1, 1),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "BatchIsAuthorizedInput" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          request: __S(32, __c1, 0),
          decision: S.String,
          determiningPolicies: __S(110, __c3, 14),
          errors: __S(112, __c3, 16),
        }),
      ).annotate({ identifier: "BatchIsAuthorizedOutputItem" });
    case 4:
      return S.Array(__S(35, __c1, 3));
    case 5:
      return S.suspend(() => S.Struct({ results: __S(36, __c1, 4) })).annotate({
        identifier: "BatchIsAuthorizedOutput",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ actionType: SensitiveString, actionId: SensitiveString }),
      ).annotate({ identifier: "ActionIdentifier" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.Array(
        /*@__PURE__*/ S.suspend(() => __S(98, __c3, 2)).annotate({ identifier: "AttributeValue" }),
      );
    case 1:
      return S.Record(
        S.String,
        /*@__PURE__*/ S.suspend(() => __S(98, __c3, 2))
          .annotate({ identifier: "AttributeValue" })
          .pipe(S.optional),
      );
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ boolean: S.Boolean }),
        /*@__PURE__*/ S.Struct({ entityIdentifier: __S(1600, __c50, 0) }),
        /*@__PURE__*/ S.Struct({ long: S.Number }),
        /*@__PURE__*/ S.Struct({ string: SensitiveString }),
        /*@__PURE__*/ S.Struct({
          set: /*@__PURE__*/ S.suspend(() => __S(96, __c3, 0)).annotate({
            identifier: "SetAttribute",
          }),
        }),
        /*@__PURE__*/ S.Struct({
          record: /*@__PURE__*/ S.suspend(() => __S(97, __c3, 1)).annotate({
            identifier: "RecordAttribute",
          }),
        }),
        /*@__PURE__*/ S.Struct({ ipaddr: SensitiveString }),
        /*@__PURE__*/ S.Struct({ decimal: SensitiveString }),
        /*@__PURE__*/ S.Struct({ datetime: SensitiveString }),
        /*@__PURE__*/ S.Struct({ duration: SensitiveString }),
      ]);
    case 3:
      return S.Record(
        S.String,
        /*@__PURE__*/ S.suspend(() => __S(98, __c3, 2))
          .annotate({ identifier: "AttributeValue" })
          .pipe(S.optional),
      );
    case 4:
      return S.Array(__S(1600, __c50, 0));
    case 5:
      return S.Array(
        /*@__PURE__*/ S.suspend(() => __S(103, __c3, 7)).annotate({ identifier: "CedarTagValue" }),
      );
    case 6:
      return S.Record(
        S.String,
        /*@__PURE__*/ S.suspend(() => __S(103, __c3, 7))
          .annotate({ identifier: "CedarTagValue" })
          .pipe(S.optional),
      );
    case 7:
      return S.Union([
        /*@__PURE__*/ S.Struct({ boolean: S.Boolean }),
        /*@__PURE__*/ S.Struct({ entityIdentifier: __S(1600, __c50, 0) }),
        /*@__PURE__*/ S.Struct({ long: S.Number }),
        /*@__PURE__*/ S.Struct({ string: SensitiveString }),
        /*@__PURE__*/ S.Struct({
          set: /*@__PURE__*/ S.suspend(() => __S(101, __c3, 5)).annotate({
            identifier: "CedarTagSetAttribute",
          }),
        }),
        /*@__PURE__*/ S.Struct({
          record: /*@__PURE__*/ S.suspend(() => __S(102, __c3, 6)).annotate({
            identifier: "CedarTagRecordAttribute",
          }),
        }),
        /*@__PURE__*/ S.Struct({ ipaddr: SensitiveString }),
        /*@__PURE__*/ S.Struct({ decimal: SensitiveString }),
        /*@__PURE__*/ S.Struct({ datetime: SensitiveString }),
        /*@__PURE__*/ S.Struct({ duration: SensitiveString }),
      ]);
    case 8:
      return S.Record(
        S.String,
        /*@__PURE__*/ S.suspend(() => __S(103, __c3, 7))
          .annotate({ identifier: "CedarTagValue" })
          .pipe(S.optional),
      );
    case 9:
      return S.suspend(() =>
        S.Struct({
          identifier: __S(1600, __c50, 0),
          attributes: S.optional(__S(99, __c3, 3)),
          parents: S.optional(__S(100, __c3, 4)),
          tags: S.optional(__S(104, __c3, 8)),
        }),
      ).annotate({ identifier: "EntityItem" });
    case 10:
      return S.Array(__S(105, __c3, 9));
    case 11:
      return S.Union([
        /*@__PURE__*/ S.Struct({ entityList: __S(106, __c3, 10) }),
        /*@__PURE__*/ S.Struct({ cedarJson: SensitiveString }),
      ]);
    case 12:
      return S.Union([
        /*@__PURE__*/ S.Struct({ contextMap: __S(99, __c3, 3) }),
        /*@__PURE__*/ S.Struct({ cedarJson: SensitiveString }),
      ]);
    case 13:
      return S.suspend(() => S.Struct({ policyId: S.String })).annotate({
        identifier: "DeterminingPolicyItem",
      });
    case 14:
      return S.Array(__S(109, __c3, 13));
    case 15:
      return S.suspend(() => S.Struct({ errorDescription: S.String })).annotate({
        identifier: "EvaluationErrorItem",
      });
    case 16:
      return S.Array(__S(111, __c3, 15));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          action: S.optional(__S(64, __c2, 0)),
          resource: S.optional(__S(1600, __c50, 0)),
          context: S.optional(__S(108, __c3, 12)),
        }),
      ).annotate({ identifier: "BatchIsAuthorizedWithTokenInputItem" });
    case 1:
      return S.Array(__S(128, __c4, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          policyStoreId: S.String,
          identityToken: S.optional(SensitiveString),
          accessToken: S.optional(SensitiveString),
          entities: S.optional(__S(107, __c3, 11)),
          requests: __S(129, __c4, 1),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "BatchIsAuthorizedWithTokenInput" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          request: __S(128, __c4, 0),
          decision: S.String,
          determiningPolicies: __S(110, __c3, 14),
          errors: __S(112, __c3, 16),
        }),
      ).annotate({ identifier: "BatchIsAuthorizedWithTokenOutputItem" });
    case 4:
      return S.Array(__S(131, __c4, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ principal: S.optional(__S(1600, __c50, 0)), results: __S(132, __c4, 4) }),
      ).annotate({ identifier: "BatchIsAuthorizedWithTokenOutput" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          policyStoreId: S.String,
          configuration: __S(290, __c9, 2),
          principalEntityType: S.optional(SensitiveString),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateIdentitySourceInput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.Array(SensitiveString);
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ groupClaim: SensitiveString, groupEntityType: SensitiveString }),
      ).annotate({ identifier: "OpenIdConnectGroupConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          principalIdClaim: S.optional(SensitiveString),
          audiences: S.optional(__S(224, __c7, 0)),
        }),
      ).annotate({ identifier: "OpenIdConnectAccessTokenConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          principalIdClaim: S.optional(SensitiveString),
          clientIds: S.optional(__S(192, __c6, 0)),
        }),
      ).annotate({ identifier: "OpenIdConnectIdentityTokenConfiguration" });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ accessTokenOnly: __S(257, __c8, 1) }),
        /*@__PURE__*/ S.Struct({ identityTokenOnly: __S(258, __c8, 2) }),
      ]);
    case 4:
      return S.suspend(() =>
        S.Struct({
          issuer: S.String,
          entityIdPrefix: S.optional(SensitiveString),
          groupConfiguration: S.optional(__S(256, __c8, 0)),
          tokenSelection: __S(259, __c8, 3),
        }),
      ).annotate({ identifier: "OpenIdConnectConfiguration" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ groupEntityType: SensitiveString })).annotate({
        identifier: "CognitoGroupConfiguration",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          userPoolArn: S.String,
          clientIds: S.optional(__S(192, __c6, 0)),
          groupConfiguration: S.optional(__S(288, __c9, 0)),
        }),
      ).annotate({ identifier: "CognitoUserPoolConfiguration" });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ cognitoUserPoolConfiguration: __S(289, __c9, 1) }),
        /*@__PURE__*/ S.Struct({ openIdConnectConfiguration: __S(260, __c8, 4) }),
      ]);
    case 3:
      return S.suspend(() =>
        S.Struct({
          createdDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          identitySourceId: S.String,
          lastUpdatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          policyStoreId: S.String,
        }),
      ).annotate({ identifier: "CreateIdentitySourceOutput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          policyStoreId: S.String,
          definition: __S(1632, __c51, 0),
          name: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreatePolicyInput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(64, __c2, 0));
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyStoreId: S.String,
          policyId: S.String,
          policyType: S.String,
          principal: S.optional(__S(1600, __c50, 0)),
          resource: S.optional(__S(1600, __c50, 0)),
          actions: S.optional(__S(352, __c11, 0)),
          createdDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastUpdatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          effect: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreatePolicyOutput" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ key: S.String, encryptionContext: S.optional(__S(448, __c14, 0)) }),
      ).annotate({ identifier: "KmsEncryptionSettings" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ kmsEncryptionSettings: __S(416, __c13, 0) }),
        /*@__PURE__*/ S.Struct({ default: /*@__PURE__*/ S.Struct({}) }),
      ]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          validationSettings: __S(480, __c15, 0),
          description: S.optional(SensitiveString),
          deletionProtection: S.optional(S.String),
          encryptionSettings: S.optional(__S(417, __c13, 1)),
          tags: S.optional(__S(448, __c14, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreatePolicyStoreInput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ mode: S.String })).annotate({
        identifier: "ValidationSettings",
      });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyStoreId: S.String,
          arn: S.String,
          createdDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastUpdatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "CreatePolicyStoreOutput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ aliasName: S.String, policyStoreId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreatePolicyStoreAliasInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          aliasName: S.String,
          policyStoreId: S.String,
          aliasArn: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "CreatePolicyStoreAliasOutput" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          policyStoreId: S.String,
          description: S.optional(SensitiveString),
          statement: SensitiveString,
          name: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreatePolicyTemplateInput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyStoreId: S.String,
          policyTemplateId: S.String,
          createdDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastUpdatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "CreatePolicyTemplateOutput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ policyStoreId: S.String, identitySourceId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteIdentitySourceInput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteIdentitySourceOutput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ policyStoreId: S.String, policyId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeletePolicyInput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ policyStoreId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeletePolicyStoreInput" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ aliasName: S.String, deletionMode: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeletePolicyStoreAliasInput" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ policyStoreId: S.String, policyTemplateId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeletePolicyTemplateInput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ policyStoreId: S.String, identitySourceId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetIdentitySourceInput" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientIds: S.optional(__S(192, __c6, 0)),
          userPoolArn: S.optional(S.String),
          discoveryUrl: S.optional(S.String),
          openIdIssuer: S.optional(S.String),
        }),
      ).annotate({ identifier: "IdentitySourceDetails" });
    case 1:
      return S.suspend(() => S.Struct({ groupEntityType: S.optional(SensitiveString) })).annotate({
        identifier: "CognitoGroupConfigurationDetail",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          userPoolArn: S.String,
          clientIds: __S(192, __c6, 0),
          issuer: S.String,
          groupConfiguration: S.optional(__S(865, __c27, 1)),
        }),
      ).annotate({ identifier: "CognitoUserPoolConfigurationDetail" });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ cognitoUserPoolConfiguration: __S(866, __c27, 2) }),
        /*@__PURE__*/ S.Struct({ openIdConnectConfiguration: __S(260, __c8, 4) }),
      ]);
    case 4:
      return S.suspend(() =>
        S.Struct({
          createdDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          details: S.optional(__S(864, __c27, 0)),
          identitySourceId: S.String,
          lastUpdatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          policyStoreId: S.String,
          principalEntityType: SensitiveString,
          configuration: S.optional(__S(867, __c27, 3)),
        }),
      ).annotate({ identifier: "GetIdentitySourceOutput" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ policyStoreId: S.String, policyId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetPolicyInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          policyStoreId: S.String,
          policyId: S.String,
          policyType: S.String,
          principal: S.optional(__S(1600, __c50, 0)),
          resource: S.optional(__S(1600, __c50, 0)),
          actions: S.optional(__S(352, __c11, 0)),
          definition: __S(1632, __c51, 0),
          createdDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastUpdatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          effect: S.optional(S.String),
          name: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetPolicyOutput" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ policyStoreId: S.String, tags: S.optional(S.Boolean) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetPolicyStoreInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ key: S.String, encryptionContext: __S(448, __c14, 0) }),
      ).annotate({ identifier: "KmsEncryptionState" });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ kmsEncryptionState: __S(929, __c29, 1) }),
        /*@__PURE__*/ S.Struct({ default: /*@__PURE__*/ S.Struct({}) }),
      ]);
    case 3:
      return S.suspend(() =>
        S.Struct({
          policyStoreId: S.String,
          arn: S.String,
          validationSettings: __S(480, __c15, 0),
          createdDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastUpdatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          description: S.optional(SensitiveString),
          deletionProtection: S.optional(S.String),
          encryptionState: S.optional(__S(930, __c29, 2)),
          cedarVersion: S.optional(S.String),
          tags: S.optional(__S(448, __c14, 0)),
        }),
      ).annotate({ identifier: "GetPolicyStoreOutput" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ aliasName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetPolicyStoreAliasInput" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          aliasName: S.String,
          policyStoreId: S.String,
          aliasArn: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          state: S.String,
        }),
      ).annotate({ identifier: "GetPolicyStoreAliasOutput" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ policyStoreId: S.String, policyTemplateId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetPolicyTemplateInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          policyStoreId: S.String,
          policyTemplateId: S.String,
          description: S.optional(SensitiveString),
          statement: SensitiveString,
          createdDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastUpdatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          name: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetPolicyTemplateOutput" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ policyStoreId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSchemaInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          policyStoreId: S.String,
          schema: SensitiveString,
          createdDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastUpdatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          namespaces: S.optional(__S(192, __c6, 0)),
        }),
      ).annotate({ identifier: "GetSchemaOutput" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyStoreId: S.String,
          principal: S.optional(__S(1600, __c50, 0)),
          action: S.optional(__S(64, __c2, 0)),
          resource: S.optional(__S(1600, __c50, 0)),
          context: S.optional(__S(108, __c3, 12)),
          entities: S.optional(__S(107, __c3, 11)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "IsAuthorizedInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          decision: S.String,
          determiningPolicies: __S(110, __c3, 14),
          errors: __S(112, __c3, 16),
        }),
      ).annotate({ identifier: "IsAuthorizedOutput" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyStoreId: S.String,
          identityToken: S.optional(SensitiveString),
          accessToken: S.optional(SensitiveString),
          action: S.optional(__S(64, __c2, 0)),
          resource: S.optional(__S(1600, __c50, 0)),
          context: S.optional(__S(108, __c3, 12)),
          entities: S.optional(__S(107, __c3, 11)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "IsAuthorizedWithTokenInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          decision: S.String,
          determiningPolicies: __S(110, __c3, 14),
          errors: __S(112, __c3, 16),
          principal: S.optional(__S(1600, __c50, 0)),
        }),
      ).annotate({ identifier: "IsAuthorizedWithTokenOutput" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ principalEntityType: S.optional(SensitiveString) }),
      ).annotate({ identifier: "IdentitySourceFilter" });
    case 1:
      return S.Array(__S(1152, __c36, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          policyStoreId: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          filters: S.optional(__S(1153, __c36, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListIdentitySourcesInput" });
    case 3:
      return S.Array(__S(868, __c27, 4));
    case 4:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), identitySources: __S(1155, __c36, 3) }),
      ).annotate({ identifier: "ListIdentitySourcesOutput" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ unspecified: S.Boolean }),
        /*@__PURE__*/ S.Struct({ identifier: __S(1600, __c50, 0) }),
      ]);
    case 1:
      return S.suspend(() =>
        S.Struct({
          principal: S.optional(__S(1184, __c37, 0)),
          resource: S.optional(__S(1184, __c37, 0)),
          policyType: S.optional(S.String),
          policyTemplateId: S.optional(S.String),
        }),
      ).annotate({ identifier: "PolicyFilter" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          policyStoreId: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          filter: S.optional(__S(1185, __c37, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListPoliciesInput" });
    case 3:
      return S.suspend(() => S.Struct({ description: S.optional(SensitiveString) })).annotate({
        identifier: "StaticPolicyDefinitionItem",
      });
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ static: __S(1187, __c37, 3) }),
        /*@__PURE__*/ S.Struct({ templateLinked: __S(1664, __c52, 0) }),
      ]);
    case 5:
      return S.suspend(() =>
        S.Struct({
          policyStoreId: S.String,
          policyId: S.String,
          policyType: S.String,
          principal: S.optional(__S(1600, __c50, 0)),
          resource: S.optional(__S(1600, __c50, 0)),
          actions: S.optional(__S(352, __c11, 0)),
          definition: __S(1188, __c37, 4),
          createdDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastUpdatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          effect: S.optional(S.String),
          name: S.optional(S.String),
        }),
      ).annotate({ identifier: "PolicyItem" });
    case 6:
      return S.Array(__S(1189, __c37, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), policies: __S(1190, __c37, 6) }),
      ).annotate({ identifier: "ListPoliciesOutput" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ policyStoreId: S.optional(S.String) })).annotate({
        identifier: "PolicyStoreAliasFilter",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          filter: S.optional(__S(1216, __c38, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListPolicyStoreAliasesInput" });
    case 2:
      return S.Array(__S(992, __c31, 0));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), policyStoreAliases: __S(1218, __c38, 2) }),
      ).annotate({ identifier: "ListPolicyStoreAliasesOutput" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), maxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListPolicyStoresInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          policyStoreId: S.String,
          arn: S.String,
          createdDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastUpdatedDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          description: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "PolicyStoreItem" });
    case 2:
      return S.Array(__S(1249, __c39, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), policyStores: __S(1250, __c39, 2) }),
      ).annotate({ identifier: "ListPolicyStoresOutput" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyStoreId: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListPolicyTemplatesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          policyStoreId: S.String,
          policyTemplateId: S.String,
          description: S.optional(SensitiveString),
          createdDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastUpdatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          name: S.optional(S.String),
        }),
      ).annotate({ identifier: "PolicyTemplateItem" });
    case 2:
      return S.Array(__S(1281, __c40, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), policyTemplates: __S(1282, __c40, 2) }),
      ).annotate({ identifier: "ListPolicyTemplatesOutput" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceInput" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(448, __c14, 0)) })).annotate({
        identifier: "ListTagsForResourceOutput",
      });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ cedarJson: SensitiveString })]);
    case 1:
      return S.suspend(() =>
        S.Struct({ policyStoreId: S.String, definition: __S(1344, __c42, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutSchemaInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          policyStoreId: S.String,
          namespaces: __S(192, __c6, 0),
          createdDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastUpdatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "PutSchemaOutput" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tags: __S(448, __c14, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceInput" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tagKeys: __S(224, __c7, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceInput" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyStoreId: S.String,
          identitySourceId: S.String,
          updateConfiguration: __S(290, __c9, 2),
          principalEntityType: S.optional(SensitiveString),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateIdentitySourceInput" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ static: __S(1696, __c53, 0) })]);
    case 1:
      return S.suspend(() =>
        S.Struct({
          policyStoreId: S.String,
          policyId: S.String,
          definition: S.optional(__S(1472, __c46, 0)),
          name: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdatePolicyInput" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyStoreId: S.String,
          validationSettings: __S(480, __c15, 0),
          deletionProtection: S.optional(S.String),
          description: S.optional(SensitiveString),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdatePolicyStoreInput" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyStoreId: S.String,
          policyTemplateId: S.String,
          description: S.optional(SensitiveString),
          statement: SensitiveString,
          name: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdatePolicyTemplateInput" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ policyStoreId: S.String, policyId: S.String })).annotate({
        identifier: "BatchGetPolicyInputItem",
      });
    case 1:
      return S.Array(__S(1568, __c49, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ requests: __S(1569, __c49, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetPolicyInput" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          policyStoreId: S.String,
          policyId: S.String,
          policyType: S.String,
          definition: __S(1632, __c51, 0),
          createdDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastUpdatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          name: S.optional(S.String),
        }),
      ).annotate({ identifier: "BatchGetPolicyOutputItem" });
    case 4:
      return S.Array(__S(1571, __c49, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          code: S.String,
          policyStoreId: S.String,
          policyId: S.String,
          message: S.String,
        }),
      ).annotate({ identifier: "BatchGetPolicyErrorItem" });
    case 6:
      return S.Array(__S(1573, __c49, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ results: __S(1572, __c49, 4), errors: __S(1574, __c49, 6) }),
      ).annotate({ identifier: "BatchGetPolicyOutput" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ entityType: SensitiveString, entityId: SensitiveString }),
      ).annotate({ identifier: "EntityIdentifier" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ static: __S(1696, __c53, 0) }),
        /*@__PURE__*/ S.Struct({ templateLinked: __S(1664, __c52, 0) }),
      ]);
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyTemplateId: S.String,
          principal: S.optional(__S(1600, __c50, 0)),
          resource: S.optional(__S(1600, __c50, 0)),
        }),
      ).annotate({ identifier: "TemplateLinkedPolicyDefinitionDetail" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ description: S.optional(SensitiveString), statement: SensitiveString }),
      ).annotate({ identifier: "StaticPolicyDefinitionDetail" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
