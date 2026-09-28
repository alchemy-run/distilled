import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_0Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "VerifiedPermissions",
  target: "VerifiedPermissions",
  version: "2021-12-01",
  sigv4: "verifiedpermissions",
  protocol: awsJson1_0Protocol,
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://verifiedpermissions.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://verifiedpermissions.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message: string; readonly resources: ResourceConflict[] }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class InvalidStateException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidStateException",
    ["BadRequestError"],
    { status: 406 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: ResourceType;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message: string;
    readonly resourceId?: string;
    readonly resourceType: ResourceType;
    readonly serviceCode?: string;
    readonly quotaCode?: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429 },
  )<{
    readonly message: string;
    readonly serviceCode?: string;
    readonly quotaCode?: string;
  }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTagsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly resourceName?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError("ValidationException")<{
    readonly message?: string;
  }> {}
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
export type CedarTagRecordAttribute = {
  [key: string]: CedarTagValue | undefined;
};
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
  | {
      contextMap: { [key: string]: AttributeValue | undefined };
      cedarJson?: never;
    }
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
export type BatchIsAuthorizedWithTokenInputList =
  BatchIsAuthorizedWithTokenInputItem[];
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
export type BatchIsAuthorizedWithTokenOutputList =
  BatchIsAuthorizedWithTokenOutputItem[];
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
  | {
      accessTokenOnly: OpenIdConnectAccessTokenConfiguration;
      identityTokenOnly?: never;
    }
  | {
      accessTokenOnly?: never;
      identityTokenOnly: OpenIdConnectIdentityTokenConfiguration;
    };
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
  | {
      accessTokenOnly: OpenIdConnectAccessTokenConfigurationDetail;
      identityTokenOnly?: never;
    }
  | {
      accessTokenOnly?: never;
      identityTokenOnly: OpenIdConnectIdentityTokenConfigurationDetail;
    };
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
  | {
      accessTokenOnly: OpenIdConnectAccessTokenConfigurationItem;
      identityTokenOnly?: never;
    }
  | {
      accessTokenOnly?: never;
      identityTokenOnly: OpenIdConnectIdentityTokenConfigurationItem;
    };
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
export type SchemaDefinition = {
  cedarJson: string | redacted.Redacted<string>;
};
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
  | {
      accessTokenOnly: UpdateOpenIdConnectAccessTokenConfiguration;
      identityTokenOnly?: never;
    }
  | {
      accessTokenOnly?: never;
      identityTokenOnly: UpdateOpenIdConnectIdentityTokenConfiguration;
    };
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
  descriptor: {
    service: svc,
    input: { requests: D.list({ policyStoreId: 0, policyId: 0 }) },
    output: {
      results: D.list({
        definition: o_PolicyDefinitionDetail,
        createdDate: D.ts,
        lastUpdatedDate: D.ts,
      }),
    },
  },
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetPolicy",
})) as any;

export type BatchIsAuthorizedError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: {
      policyStoreId: 0,
      entities: i_EntitiesDefinition,
      requests: D.list({
        principal: i_EntityIdentifier,
        action: i_ActionIdentifier,
        resource: i_EntityIdentifier,
        context: i_ContextDefinition,
      }),
    },
    output: {
      results: D.list({
        request: {
          principal: o_EntityIdentifier,
          action: o_ActionIdentifier,
          resource: o_EntityIdentifier,
          context: o_ContextDefinition,
        },
      }),
    },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchIsAuthorized",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      policyStoreId: 0,
      identityToken: 0,
      accessToken: 0,
      entities: i_EntitiesDefinition,
      requests: D.list({
        action: i_ActionIdentifier,
        resource: i_EntityIdentifier,
        context: i_ContextDefinition,
      }),
    },
    output: {
      principal: o_EntityIdentifier,
      results: D.list({
        request: {
          action: o_ActionIdentifier,
          resource: o_EntityIdentifier,
          context: o_ContextDefinition,
        },
      }),
    },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchIsAuthorizedWithToken",
})) as any;

export type CreateIdentitySourceError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Adds an identity source to a policy store–an Amazon Cognito user pool or OpenID Connect (OIDC) identity provider (IdP).
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
  descriptor: {
    service: svc,
    input: {
      clientToken: D.m({ idempotency: true }),
      policyStoreId: 0,
      configuration: {
        cognitoUserPoolConfiguration: {
          userPoolArn: 0,
          clientIds: 0,
          groupConfiguration: { groupEntityType: 0 },
        },
        openIdConnectConfiguration: {
          issuer: 0,
          entityIdPrefix: 0,
          groupConfiguration: { groupClaim: 0, groupEntityType: 0 },
          tokenSelection: {
            accessTokenOnly: { principalIdClaim: 0, audiences: 0 },
            identityTokenOnly: { principalIdClaim: 0, clientIds: 0 },
          },
        },
      },
      principalEntityType: 0,
    },
    output: { createdDate: D.ts, lastUpdatedDate: D.ts },
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIdentitySource",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      clientToken: D.m({ idempotency: true }),
      policyStoreId: 0,
      definition: {
        static: { description: 0, statement: 0 },
        templateLinked: {
          policyTemplateId: 0,
          principal: i_EntityIdentifier,
          resource: i_EntityIdentifier,
        },
      },
      name: 0,
    },
    output: {
      principal: o_EntityIdentifier,
      resource: o_EntityIdentifier,
      actions: D.list(o_ActionIdentifier),
      createdDate: D.ts,
      lastUpdatedDate: D.ts,
    },
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePolicy",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      clientToken: D.m({ idempotency: true }),
      validationSettings: i_ValidationSettings,
      description: 0,
      deletionProtection: 0,
      encryptionSettings: {
        kmsEncryptionSettings: { key: 0, encryptionContext: 0 },
        default: {},
      },
      tags: 0,
    },
    output: { createdDate: D.ts, lastUpdatedDate: D.ts },
  },
  errors: [
    ConflictException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePolicyStore",
})) as any;

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
  descriptor: {
    service: svc,
    input: { aliasName: 0, policyStoreId: 0 },
    output: { createdAt: D.ts },
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePolicyStoreAlias",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      clientToken: D.m({ idempotency: true }),
      policyStoreId: 0,
      description: 0,
      statement: 0,
      name: 0,
    },
    output: { createdDate: D.ts, lastUpdatedDate: D.ts },
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePolicyTemplate",
})) as any;

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
  descriptor: {
    service: svc,
    input: { policyStoreId: 0, identitySourceId: 0 },
  },
  errors: [ConflictException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIdentitySource",
})) as any;

export type DeletePolicyError =
  | ConflictException
  | ResourceNotFoundException
  | CommonErrors;
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
  descriptor: { service: svc, input: { policyStoreId: 0, policyId: 0 } },
  errors: [ConflictException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePolicy",
})) as any;

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
  descriptor: { service: svc, input: { policyStoreId: 0 } },
  errors: [InvalidStateException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePolicyStore",
})) as any;

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
  descriptor: { service: svc, input: { aliasName: 0, deletionMode: 0 } },
  errors: [
    InvalidStateException,
    ValidationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePolicyStoreAlias",
})) as any;

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
  descriptor: {
    service: svc,
    input: { policyStoreId: 0, policyTemplateId: 0 },
  },
  errors: [ConflictException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePolicyTemplate",
})) as any;

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
  descriptor: {
    service: svc,
    input: { policyStoreId: 0, identitySourceId: 0 },
    output: {
      createdDate: D.ts,
      details: { clientIds: D.list(D.secret) },
      lastUpdatedDate: D.ts,
      principalEntityType: D.secret,
      configuration: {
        cognitoUserPoolConfiguration: {
          clientIds: D.list(D.secret),
          groupConfiguration: { groupEntityType: D.secret },
        },
        openIdConnectConfiguration: {
          entityIdPrefix: D.secret,
          groupConfiguration: {
            groupClaim: D.secret,
            groupEntityType: D.secret,
          },
          tokenSelection: {
            accessTokenOnly: { principalIdClaim: D.secret },
            identityTokenOnly: {
              principalIdClaim: D.secret,
              clientIds: D.list(D.secret),
            },
          },
        },
      },
    },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdentitySource",
})) as any;

export type GetPolicyError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the specified policy.
 */
export const getPolicy: API.OperationMethod<
  GetPolicyInput,
  GetPolicyOutput,
  GetPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { policyStoreId: 0, policyId: 0 },
    output: {
      principal: o_EntityIdentifier,
      resource: o_EntityIdentifier,
      actions: D.list(o_ActionIdentifier),
      definition: o_PolicyDefinitionDetail,
      createdDate: D.ts,
      lastUpdatedDate: D.ts,
    },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicy",
})) as any;

export type GetPolicyStoreError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about a policy store.
 */
export const getPolicyStore: API.OperationMethod<
  GetPolicyStoreInput,
  GetPolicyStoreOutput,
  GetPolicyStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { policyStoreId: 0, tags: 0 },
    output: { createdDate: D.ts, lastUpdatedDate: D.ts, description: D.secret },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicyStore",
})) as any;

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
  descriptor: {
    service: svc,
    input: { aliasName: 0 },
    output: { createdAt: D.ts },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicyStoreAlias",
})) as any;

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
  descriptor: {
    service: svc,
    input: { policyStoreId: 0, policyTemplateId: 0 },
    output: {
      description: D.secret,
      statement: D.secret,
      createdDate: D.ts,
      lastUpdatedDate: D.ts,
    },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicyTemplate",
})) as any;

export type GetSchemaError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieve the details for the specified schema in the specified policy store.
 */
export const getSchema: API.OperationMethod<
  GetSchemaInput,
  GetSchemaOutput,
  GetSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { policyStoreId: 0 },
    output: {
      schema: D.secret,
      createdDate: D.ts,
      lastUpdatedDate: D.ts,
      namespaces: D.list(D.secret),
    },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSchema",
})) as any;

export type IsAuthorizedError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Makes an authorization decision about a service request described in the parameters. The information in the parameters can also define additional context that Verified Permissions can include in the evaluation. The request is evaluated against all matching policies in the specified policy store. The result of the decision is either `Allow` or `Deny`, along with a list of the policies that resulted in the decision.
 */
export const isAuthorized: API.OperationMethod<
  IsAuthorizedInput,
  IsAuthorizedOutput,
  IsAuthorizedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      policyStoreId: 0,
      principal: i_EntityIdentifier,
      action: i_ActionIdentifier,
      resource: i_EntityIdentifier,
      context: i_ContextDefinition,
      entities: i_EntitiesDefinition,
    },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "IsAuthorized",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      policyStoreId: 0,
      identityToken: 0,
      accessToken: 0,
      action: i_ActionIdentifier,
      resource: i_EntityIdentifier,
      context: i_ContextDefinition,
      entities: i_EntitiesDefinition,
    },
    output: { principal: o_EntityIdentifier },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "IsAuthorizedWithToken",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      policyStoreId: 0,
      nextToken: 0,
      maxResults: 0,
      filters: D.list({ principalEntityType: 0 }),
    },
    output: {
      identitySources: D.list({
        createdDate: D.ts,
        details: { clientIds: D.list(D.secret) },
        lastUpdatedDate: D.ts,
        principalEntityType: D.secret,
        configuration: {
          cognitoUserPoolConfiguration: {
            clientIds: D.list(D.secret),
            groupConfiguration: { groupEntityType: D.secret },
          },
          openIdConnectConfiguration: {
            entityIdPrefix: D.secret,
            groupConfiguration: {
              groupClaim: D.secret,
              groupEntityType: D.secret,
            },
            tokenSelection: {
              accessTokenOnly: { principalIdClaim: D.secret },
              identityTokenOnly: {
                principalIdClaim: D.secret,
                clientIds: D.list(D.secret),
              },
            },
          },
        },
      }),
    },
  },
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
  descriptor: {
    service: svc,
    input: {
      policyStoreId: 0,
      nextToken: 0,
      maxResults: 0,
      filter: {
        principal: i_EntityReference,
        resource: i_EntityReference,
        policyType: 0,
        policyTemplateId: 0,
      },
    },
    output: {
      policies: D.list({
        principal: o_EntityIdentifier,
        resource: o_EntityIdentifier,
        actions: D.list(o_ActionIdentifier),
        definition: {
          static: { description: D.secret },
          templateLinked: {
            principal: o_EntityIdentifier,
            resource: o_EntityIdentifier,
          },
        },
        createdDate: D.ts,
        lastUpdatedDate: D.ts,
      }),
    },
  },
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
  descriptor: {
    service: svc,
    input: { nextToken: 0, maxResults: 0, filter: { policyStoreId: 0 } },
    output: { policyStoreAliases: D.list({ createdAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    input: { nextToken: 0, maxResults: 0 },
    output: {
      policyStores: D.list({
        createdDate: D.ts,
        lastUpdatedDate: D.ts,
        description: D.secret,
      }),
    },
  },
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
  descriptor: {
    service: svc,
    input: { policyStoreId: 0, nextToken: 0, maxResults: 0 },
    output: {
      policyTemplates: D.list({
        description: D.secret,
        createdDate: D.ts,
        lastUpdatedDate: D.ts,
      }),
    },
  },
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
  descriptor: { service: svc, input: { resourceArn: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    input: { policyStoreId: 0, definition: { cedarJson: 0 } },
    output: {
      namespaces: D.list(D.secret),
      createdDate: D.ts,
      lastUpdatedDate: D.ts,
    },
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSchema",
})) as any;

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
  descriptor: { service: svc, input: { resourceArn: 0, tags: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { resourceArn: 0, tagKeys: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      policyStoreId: 0,
      identitySourceId: 0,
      updateConfiguration: {
        cognitoUserPoolConfiguration: {
          userPoolArn: 0,
          clientIds: 0,
          groupConfiguration: { groupEntityType: 0 },
        },
        openIdConnectConfiguration: {
          issuer: 0,
          entityIdPrefix: 0,
          groupConfiguration: { groupClaim: 0, groupEntityType: 0 },
          tokenSelection: {
            accessTokenOnly: { principalIdClaim: 0, audiences: 0 },
            identityTokenOnly: { principalIdClaim: 0, clientIds: 0 },
          },
        },
      },
      principalEntityType: 0,
    },
    output: { createdDate: D.ts, lastUpdatedDate: D.ts },
  },
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIdentitySource",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      policyStoreId: 0,
      policyId: 0,
      definition: { static: { description: 0, statement: 0 } },
      name: 0,
    },
    output: {
      principal: o_EntityIdentifier,
      resource: o_EntityIdentifier,
      actions: D.list(o_ActionIdentifier),
      createdDate: D.ts,
      lastUpdatedDate: D.ts,
    },
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePolicy",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      policyStoreId: 0,
      validationSettings: i_ValidationSettings,
      deletionProtection: 0,
      description: 0,
    },
    output: { createdDate: D.ts, lastUpdatedDate: D.ts },
  },
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePolicyStore",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      policyStoreId: 0,
      policyTemplateId: 0,
      description: 0,
      statement: 0,
      name: 0,
    },
    output: { createdDate: D.ts, lastUpdatedDate: D.ts },
  },
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePolicyTemplate",
})) as any;

const i_ActionIdentifier: D.LazyStruct = () => ({ actionType: 0, actionId: 0 });
const i_ContextDefinition: D.LazyStruct = () => ({
  contextMap: D.map(i_AttributeValue),
  cedarJson: 0,
});
const i_EntitiesDefinition: D.LazyStruct = () => ({
  entityList: D.list({
    identifier: i_EntityIdentifier,
    attributes: D.map(i_AttributeValue),
    parents: D.list(i_EntityIdentifier),
    tags: D.map(i_CedarTagValue),
  }),
  cedarJson: 0,
});
const i_EntityIdentifier: D.LazyStruct = () => ({ entityType: 0, entityId: 0 });
const i_EntityReference: D.LazyStruct = () => ({
  unspecified: 0,
  identifier: i_EntityIdentifier,
});
const i_ValidationSettings: D.LazyStruct = () => ({ mode: 0 });
const o_ActionIdentifier: D.LazyStruct = () => ({
  actionType: D.secret,
  actionId: D.secret,
});
const o_ContextDefinition: D.LazyStruct = () => ({
  contextMap: D.map(o_AttributeValue),
  cedarJson: D.secret,
});
const o_EntityIdentifier: D.LazyStruct = () => ({
  entityType: D.secret,
  entityId: D.secret,
});
const o_PolicyDefinitionDetail: D.LazyStruct = () => ({
  static: { description: D.secret, statement: D.secret },
  templateLinked: {
    principal: o_EntityIdentifier,
    resource: o_EntityIdentifier,
  },
});
const i_AttributeValue: D.LazyStruct = () => ({
  boolean: 0,
  entityIdentifier: i_EntityIdentifier,
  long: 0,
  string: 0,
  set: D.list(i_AttributeValue),
  record: D.map(i_AttributeValue),
  ipaddr: 0,
  decimal: 0,
  datetime: 0,
  duration: 0,
});
const i_CedarTagValue: D.LazyStruct = () => ({
  boolean: 0,
  entityIdentifier: i_EntityIdentifier,
  long: 0,
  string: 0,
  set: D.list(i_CedarTagValue),
  record: D.map(i_CedarTagValue),
  ipaddr: 0,
  decimal: 0,
  datetime: 0,
  duration: 0,
});
const o_AttributeValue: D.LazyStruct = () => ({
  entityIdentifier: o_EntityIdentifier,
  string: D.secret,
  set: D.list(o_AttributeValue),
  record: D.map(o_AttributeValue),
  ipaddr: D.secret,
  decimal: D.secret,
  datetime: D.secret,
  duration: D.secret,
});
