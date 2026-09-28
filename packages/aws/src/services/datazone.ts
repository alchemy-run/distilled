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
  sdkId: "DataZone",
  target: "DataZone",
  version: "2018-05-10",
  sigv4: "datazone",
  protocol: restJson1Protocol,
  rules: (p, _) => {
    const { Region, UseFIPS = false, Endpoint } = p;
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
      return e(Endpoint);
    }
    if (Region != null) {
      {
        const PartitionResult = _.partition(Region);
        if (PartitionResult != null && PartitionResult !== false) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            if (UseFIPS === true) {
              if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
                return e(
                  `https://datazone-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                );
              }
              return err(
                "FIPS is enabled but this partition does not support FIPS",
              );
            }
            return e(
              `https://datazone.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://datazone-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          return e(
            `https://datazone.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429 },
  )<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export type DomainId = string;
export type AssetIdentifier = string;
export type Revision = string;
export type AcceptRuleBehavior = "ALL" | "NONE" | (string & {});
export interface AcceptRule {
  rule?: AcceptRuleBehavior;
  threshold?: number;
}
export type EditedValue = string | redacted.Redacted<string>;
export interface AcceptChoice {
  predictionTarget?: string;
  predictionChoice?: number;
  editedValue?: string | redacted.Redacted<string>;
}
export type AcceptChoices = AcceptChoice[];
export type ClientToken = string;
export interface AcceptPredictionsInput {
  domainIdentifier: string;
  identifier: string;
  revision?: string;
  acceptRule?: AcceptRule;
  acceptChoices?: AcceptChoice[];
  clientToken?: string;
}
export type AssetId = string;
export interface AcceptPredictionsOutput {
  domainId: string;
  assetId: string;
  revision: string;
}
export type SubscriptionRequestId = string;
export type DecisionComment = string | redacted.Redacted<string>;
export type FilterId = string;
export type FilterIds = string[];
export interface AcceptedAssetScope {
  assetId: string;
  filterIds: string[];
}
export type AcceptedAssetScopes = AcceptedAssetScope[];
export type S3Permission = "READ" | "WRITE" | (string & {});
export type S3Permissions = S3Permission[];
export type Permissions = { s3: S3Permission[] };
export interface AssetPermission {
  assetId: string;
  permissions: Permissions;
}
export type AssetPermissions = AssetPermission[];
export interface AcceptSubscriptionRequestInput {
  domainIdentifier: string;
  identifier: string;
  decisionComment?: string | redacted.Redacted<string>;
  assetScopes?: AcceptedAssetScope[];
  assetPermissions?: AssetPermission[];
}
export type CreatedBy = string;
export type UpdatedBy = string;
export type SubscriptionRequestStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | (string & {});
export type CreatedAt = Date;
export type UpdatedAt = Date;
export type RequestReason = string | redacted.Redacted<string>;
export type ProjectId = string;
export type ProjectName = string | redacted.Redacted<string>;
export interface SubscribedProject {
  id?: string;
  name?: string | redacted.Redacted<string>;
}
export type UserProfileId = string;
export interface IamUserProfileDetails {
  arn?: string;
  principalId?: string;
  sessionName?: string;
  groupProfileId?: string;
}
export type UserProfileName = string | redacted.Redacted<string>;
export type FirstName = string | redacted.Redacted<string>;
export type LastName = string | redacted.Redacted<string>;
export interface SsoUserProfileDetails {
  username?: string | redacted.Redacted<string>;
  firstName?: string | redacted.Redacted<string>;
  lastName?: string | redacted.Redacted<string>;
}
export type UserProfileDetails =
  | { iam: IamUserProfileDetails; sso?: never }
  | { iam?: never; sso: SsoUserProfileDetails };
export interface SubscribedUser {
  id?: string;
  details?: UserProfileDetails;
}
export type GroupProfileId = string;
export type GroupProfileName = string | redacted.Redacted<string>;
export interface SubscribedGroup {
  id?: string;
  name?: string | redacted.Redacted<string>;
}
export type IamPrincipalArn = string;
export interface SubscribedIamPrincipal {
  principalArn?: string;
}
export type SubscribedPrincipal =
  | { project: SubscribedProject; user?: never; group?: never; iam?: never }
  | { project?: never; user: SubscribedUser; group?: never; iam?: never }
  | { project?: never; user?: never; group: SubscribedGroup; iam?: never }
  | {
      project?: never;
      user?: never;
      group?: never;
      iam: SubscribedIamPrincipal;
    };
export type SubscribedPrincipals = SubscribedPrincipal[];
export type ListingId = string;
export type ListingName = string;
export type Description = string | redacted.Redacted<string>;
export type TypeName = string;
export type Forms = string;
export type GlossaryTermName = string | redacted.Redacted<string>;
export type ShortDescription = string | redacted.Redacted<string>;
export interface DetailedGlossaryTerm {
  name?: string | redacted.Redacted<string>;
  shortDescription?: string | redacted.Redacted<string>;
}
export type DetailedGlossaryTerms = DetailedGlossaryTerm[];
export interface AssetScope {
  assetId: string;
  filterIds: string[];
  status: string;
  scopeName?: string;
  errorMessage?: string;
}
export interface SubscribedAssetListing {
  entityId?: string;
  entityRevision?: string;
  entityType?: string;
  forms?: string;
  glossaryTerms?: DetailedGlossaryTerm[];
  assetScope?: AssetScope;
  permissions?: Permissions;
}
export interface AssetInDataProductListingItem {
  entityId?: string;
  entityRevision?: string;
  entityType?: string;
}
export type AssetInDataProductListingItems = AssetInDataProductListingItem[];
export interface SubscribedProductListing {
  entityId?: string;
  entityRevision?: string;
  glossaryTerms?: DetailedGlossaryTerm[];
  name?: string;
  description?: string;
  assetListings?: AssetInDataProductListingItem[];
}
export type SubscribedListingItem =
  | { assetListing: SubscribedAssetListing; productListing?: never }
  | { assetListing?: never; productListing: SubscribedProductListing };
export interface SubscribedListing {
  id: string;
  revision?: string;
  name: string;
  description: string | redacted.Redacted<string>;
  item: SubscribedListingItem;
  ownerProjectId: string;
  ownerProjectName?: string;
}
export type SubscribedListings = SubscribedListing[];
export type SubscriptionId = string;
export type FormName = string;
export type FormTypeName = string | redacted.Redacted<string>;
export interface FormOutput {
  formName: string;
  typeName?: string | redacted.Redacted<string>;
  typeRevision?: string;
  content?: string;
}
export type MetadataForms = FormOutput[];
export interface AcceptSubscriptionRequestOutput {
  id: string;
  createdBy: string;
  updatedBy?: string;
  domainId: string;
  status: SubscriptionRequestStatus;
  createdAt: Date;
  updatedAt: Date;
  requestReason: string | redacted.Redacted<string>;
  subscribedPrincipals: SubscribedPrincipal[];
  subscribedListings: SubscribedListing[];
  reviewerId?: string;
  decisionComment?: string | redacted.Redacted<string>;
  existingSubscriptionId?: string;
  metadataForms?: FormOutput[];
}
export type DataZoneEntityType = "DOMAIN_UNIT" | (string & {});
export type UserIdentifier = string;
export interface OwnerUserProperties {
  userIdentifier: string;
}
export type GroupIdentifier = string;
export interface OwnerGroupProperties {
  groupIdentifier: string;
}
export type OwnerProperties =
  | { user: OwnerUserProperties; group?: never }
  | { user?: never; group: OwnerGroupProperties };
export interface AddEntityOwnerInput {
  domainIdentifier: string;
  entityType: DataZoneEntityType;
  entityIdentifier: string;
  owner: OwnerProperties;
  clientToken?: string;
}
export interface AddEntityOwnerOutput {}
export type TargetEntityType =
  | "DOMAIN_UNIT"
  | "ENVIRONMENT_BLUEPRINT_CONFIGURATION"
  | "ENVIRONMENT_PROFILE"
  | "ASSET_TYPE"
  | (string & {});
export type ManagedPolicyType =
  | "CREATE_DOMAIN_UNIT"
  | "OVERRIDE_DOMAIN_UNIT_OWNERS"
  | "ADD_TO_PROJECT_MEMBER_POOL"
  | "OVERRIDE_PROJECT_OWNERS"
  | "CREATE_GLOSSARY"
  | "CREATE_FORM_TYPE"
  | "CREATE_ASSET_TYPE"
  | "CREATE_PROJECT"
  | "CREATE_ENVIRONMENT_PROFILE"
  | "DELEGATE_CREATE_ENVIRONMENT_PROFILE"
  | "CREATE_ENVIRONMENT"
  | "CREATE_ENVIRONMENT_FROM_BLUEPRINT"
  | "CREATE_PROJECT_FROM_PROJECT_PROFILE"
  | "USE_ASSET_TYPE"
  | (string & {});
export interface AllUsersGrantFilter {}
export type UserPolicyGrantPrincipal =
  | { userIdentifier: string; allUsersGrantFilter?: never }
  | { userIdentifier?: never; allUsersGrantFilter: AllUsersGrantFilter };
export type GroupPolicyGrantPrincipal = { groupIdentifier: string };
export type ProjectDesignation =
  | "OWNER"
  | "CONTRIBUTOR"
  | "PROJECT_CATALOG_STEWARD"
  | (string & {});
export type DomainUnitId = string;
export interface DomainUnitFilterForProject {
  domainUnit: string;
  includeChildDomainUnits?: boolean;
}
export type ProjectGrantFilter = {
  domainUnitFilter: DomainUnitFilterForProject;
};
export interface ProjectPolicyGrantPrincipal {
  projectDesignation: ProjectDesignation;
  projectIdentifier?: string;
  projectGrantFilter?: ProjectGrantFilter;
}
export type DomainUnitDesignation = "OWNER" | (string & {});
export interface AllDomainUnitsGrantFilter {}
export type DomainUnitGrantFilter = {
  allDomainUnitsGrantFilter: AllDomainUnitsGrantFilter;
};
export interface DomainUnitPolicyGrantPrincipal {
  domainUnitDesignation: DomainUnitDesignation;
  domainUnitIdentifier?: string;
  domainUnitGrantFilter?: DomainUnitGrantFilter;
}
export type PolicyGrantPrincipal =
  | {
      user: UserPolicyGrantPrincipal;
      group?: never;
      project?: never;
      domainUnit?: never;
    }
  | {
      user?: never;
      group: GroupPolicyGrantPrincipal;
      project?: never;
      domainUnit?: never;
    }
  | {
      user?: never;
      group?: never;
      project: ProjectPolicyGrantPrincipal;
      domainUnit?: never;
    }
  | {
      user?: never;
      group?: never;
      project?: never;
      domainUnit: DomainUnitPolicyGrantPrincipal;
    };
export interface CreateDomainUnitPolicyGrantDetail {
  includeChildDomainUnits?: boolean;
}
export interface OverrideDomainUnitOwnersPolicyGrantDetail {
  includeChildDomainUnits?: boolean;
}
export interface AddToProjectMemberPoolPolicyGrantDetail {
  includeChildDomainUnits?: boolean;
}
export interface OverrideProjectOwnersPolicyGrantDetail {
  includeChildDomainUnits?: boolean;
}
export interface CreateGlossaryPolicyGrantDetail {
  includeChildDomainUnits?: boolean;
}
export interface CreateFormTypePolicyGrantDetail {
  includeChildDomainUnits?: boolean;
}
export interface CreateAssetTypePolicyGrantDetail {
  includeChildDomainUnits?: boolean;
}
export interface CreateProjectPolicyGrantDetail {
  includeChildDomainUnits?: boolean;
}
export interface CreateEnvironmentProfilePolicyGrantDetail {
  domainUnitId?: string;
}
export interface Unit {}
export type ProjectProfileList = string[];
export interface CreateProjectFromProjectProfilePolicyGrantDetail {
  includeChildDomainUnits?: boolean;
  projectProfiles?: string[];
}
export interface UseAssetTypePolicyGrantDetail {
  domainUnitId?: string;
}
export type PolicyGrantDetail =
  | {
      createDomainUnit: CreateDomainUnitPolicyGrantDetail;
      overrideDomainUnitOwners?: never;
      addToProjectMemberPool?: never;
      overrideProjectOwners?: never;
      createGlossary?: never;
      createFormType?: never;
      createAssetType?: never;
      createProject?: never;
      createEnvironmentProfile?: never;
      delegateCreateEnvironmentProfile?: never;
      createEnvironment?: never;
      createEnvironmentFromBlueprint?: never;
      createProjectFromProjectProfile?: never;
      useAssetType?: never;
    }
  | {
      createDomainUnit?: never;
      overrideDomainUnitOwners: OverrideDomainUnitOwnersPolicyGrantDetail;
      addToProjectMemberPool?: never;
      overrideProjectOwners?: never;
      createGlossary?: never;
      createFormType?: never;
      createAssetType?: never;
      createProject?: never;
      createEnvironmentProfile?: never;
      delegateCreateEnvironmentProfile?: never;
      createEnvironment?: never;
      createEnvironmentFromBlueprint?: never;
      createProjectFromProjectProfile?: never;
      useAssetType?: never;
    }
  | {
      createDomainUnit?: never;
      overrideDomainUnitOwners?: never;
      addToProjectMemberPool: AddToProjectMemberPoolPolicyGrantDetail;
      overrideProjectOwners?: never;
      createGlossary?: never;
      createFormType?: never;
      createAssetType?: never;
      createProject?: never;
      createEnvironmentProfile?: never;
      delegateCreateEnvironmentProfile?: never;
      createEnvironment?: never;
      createEnvironmentFromBlueprint?: never;
      createProjectFromProjectProfile?: never;
      useAssetType?: never;
    }
  | {
      createDomainUnit?: never;
      overrideDomainUnitOwners?: never;
      addToProjectMemberPool?: never;
      overrideProjectOwners: OverrideProjectOwnersPolicyGrantDetail;
      createGlossary?: never;
      createFormType?: never;
      createAssetType?: never;
      createProject?: never;
      createEnvironmentProfile?: never;
      delegateCreateEnvironmentProfile?: never;
      createEnvironment?: never;
      createEnvironmentFromBlueprint?: never;
      createProjectFromProjectProfile?: never;
      useAssetType?: never;
    }
  | {
      createDomainUnit?: never;
      overrideDomainUnitOwners?: never;
      addToProjectMemberPool?: never;
      overrideProjectOwners?: never;
      createGlossary: CreateGlossaryPolicyGrantDetail;
      createFormType?: never;
      createAssetType?: never;
      createProject?: never;
      createEnvironmentProfile?: never;
      delegateCreateEnvironmentProfile?: never;
      createEnvironment?: never;
      createEnvironmentFromBlueprint?: never;
      createProjectFromProjectProfile?: never;
      useAssetType?: never;
    }
  | {
      createDomainUnit?: never;
      overrideDomainUnitOwners?: never;
      addToProjectMemberPool?: never;
      overrideProjectOwners?: never;
      createGlossary?: never;
      createFormType: CreateFormTypePolicyGrantDetail;
      createAssetType?: never;
      createProject?: never;
      createEnvironmentProfile?: never;
      delegateCreateEnvironmentProfile?: never;
      createEnvironment?: never;
      createEnvironmentFromBlueprint?: never;
      createProjectFromProjectProfile?: never;
      useAssetType?: never;
    }
  | {
      createDomainUnit?: never;
      overrideDomainUnitOwners?: never;
      addToProjectMemberPool?: never;
      overrideProjectOwners?: never;
      createGlossary?: never;
      createFormType?: never;
      createAssetType: CreateAssetTypePolicyGrantDetail;
      createProject?: never;
      createEnvironmentProfile?: never;
      delegateCreateEnvironmentProfile?: never;
      createEnvironment?: never;
      createEnvironmentFromBlueprint?: never;
      createProjectFromProjectProfile?: never;
      useAssetType?: never;
    }
  | {
      createDomainUnit?: never;
      overrideDomainUnitOwners?: never;
      addToProjectMemberPool?: never;
      overrideProjectOwners?: never;
      createGlossary?: never;
      createFormType?: never;
      createAssetType?: never;
      createProject: CreateProjectPolicyGrantDetail;
      createEnvironmentProfile?: never;
      delegateCreateEnvironmentProfile?: never;
      createEnvironment?: never;
      createEnvironmentFromBlueprint?: never;
      createProjectFromProjectProfile?: never;
      useAssetType?: never;
    }
  | {
      createDomainUnit?: never;
      overrideDomainUnitOwners?: never;
      addToProjectMemberPool?: never;
      overrideProjectOwners?: never;
      createGlossary?: never;
      createFormType?: never;
      createAssetType?: never;
      createProject?: never;
      createEnvironmentProfile: CreateEnvironmentProfilePolicyGrantDetail;
      delegateCreateEnvironmentProfile?: never;
      createEnvironment?: never;
      createEnvironmentFromBlueprint?: never;
      createProjectFromProjectProfile?: never;
      useAssetType?: never;
    }
  | {
      createDomainUnit?: never;
      overrideDomainUnitOwners?: never;
      addToProjectMemberPool?: never;
      overrideProjectOwners?: never;
      createGlossary?: never;
      createFormType?: never;
      createAssetType?: never;
      createProject?: never;
      createEnvironmentProfile?: never;
      delegateCreateEnvironmentProfile: Unit;
      createEnvironment?: never;
      createEnvironmentFromBlueprint?: never;
      createProjectFromProjectProfile?: never;
      useAssetType?: never;
    }
  | {
      createDomainUnit?: never;
      overrideDomainUnitOwners?: never;
      addToProjectMemberPool?: never;
      overrideProjectOwners?: never;
      createGlossary?: never;
      createFormType?: never;
      createAssetType?: never;
      createProject?: never;
      createEnvironmentProfile?: never;
      delegateCreateEnvironmentProfile?: never;
      createEnvironment: Unit;
      createEnvironmentFromBlueprint?: never;
      createProjectFromProjectProfile?: never;
      useAssetType?: never;
    }
  | {
      createDomainUnit?: never;
      overrideDomainUnitOwners?: never;
      addToProjectMemberPool?: never;
      overrideProjectOwners?: never;
      createGlossary?: never;
      createFormType?: never;
      createAssetType?: never;
      createProject?: never;
      createEnvironmentProfile?: never;
      delegateCreateEnvironmentProfile?: never;
      createEnvironment?: never;
      createEnvironmentFromBlueprint: Unit;
      createProjectFromProjectProfile?: never;
      useAssetType?: never;
    }
  | {
      createDomainUnit?: never;
      overrideDomainUnitOwners?: never;
      addToProjectMemberPool?: never;
      overrideProjectOwners?: never;
      createGlossary?: never;
      createFormType?: never;
      createAssetType?: never;
      createProject?: never;
      createEnvironmentProfile?: never;
      delegateCreateEnvironmentProfile?: never;
      createEnvironment?: never;
      createEnvironmentFromBlueprint?: never;
      createProjectFromProjectProfile: CreateProjectFromProjectProfilePolicyGrantDetail;
      useAssetType?: never;
    }
  | {
      createDomainUnit?: never;
      overrideDomainUnitOwners?: never;
      addToProjectMemberPool?: never;
      overrideProjectOwners?: never;
      createGlossary?: never;
      createFormType?: never;
      createAssetType?: never;
      createProject?: never;
      createEnvironmentProfile?: never;
      delegateCreateEnvironmentProfile?: never;
      createEnvironment?: never;
      createEnvironmentFromBlueprint?: never;
      createProjectFromProjectProfile?: never;
      useAssetType: UseAssetTypePolicyGrantDetail;
    };
export interface AddPolicyGrantInput {
  domainIdentifier: string;
  entityType: TargetEntityType;
  entityIdentifier: string;
  policyType: ManagedPolicyType;
  principal: PolicyGrantPrincipal;
  detail: PolicyGrantDetail;
  clientToken?: string;
}
export type GrantIdentifier = string;
export interface AddPolicyGrantOutput {
  grantId?: string;
}
export type EnvironmentId = string;
export interface AssociateEnvironmentRoleInput {
  domainIdentifier: string;
  environmentIdentifier: string;
  environmentRoleArn: string;
}
export interface AssociateEnvironmentRoleOutput {}
export type EntityIdentifier = string;
export type GovernedEntityType = "ASSET" | (string & {});
export type GlossaryTermId = string;
export type GovernedGlossaryTerms = string[];
export interface AssociateGovernedTermsInput {
  domainIdentifier: string;
  entityIdentifier: string;
  entityType: GovernedEntityType;
  governedGlossaryTerms: string[];
}
export interface AssociateGovernedTermsOutput {}
export type AttributeEntityType = "ASSET" | "LISTING" | (string & {});
export type EntityId = string;
export type AttributeIdentifier = string;
export type AttributesList = string[];
export interface BatchGetAttributesMetadataInput {
  domainIdentifier: string;
  entityType: AttributeEntityType;
  entityIdentifier: string;
  entityRevision?: string;
  attributeIdentifiers: string[];
}
export type FormOutputList = FormOutput[];
export interface BatchGetAttributeOutput {
  attributeIdentifier: string;
  forms?: FormOutput[];
}
export type BatchGetAttributeItems = BatchGetAttributeOutput[];
export interface AttributeError {
  attributeIdentifier: string;
  code: string;
  message: string;
}
export type AttributesErrors = AttributeError[];
export interface BatchGetAttributesMetadataOutput {
  attributes?: BatchGetAttributeOutput[];
  errors: AttributeError[];
}
export type FormTypeIdentifier = string;
export type RevisionInput = string;
export interface FormInput {
  formName: string;
  typeIdentifier?: string;
  typeRevision?: string;
  content?: string;
}
export type FormInputList = FormInput[];
export interface AttributeInput {
  attributeIdentifier: string;
  forms: FormInput[];
}
export type Attributes = AttributeInput[];
export interface BatchPutAttributesMetadataInput {
  domainIdentifier: string;
  entityType: AttributeEntityType;
  entityIdentifier: string;
  clientToken?: string;
  attributes: AttributeInput[];
}
export interface BatchPutAttributeOutput {
  attributeIdentifier: string;
}
export type BatchPutAttributeItems = BatchPutAttributeOutput[];
export interface BatchPutAttributesMetadataOutput {
  errors?: AttributeError[];
  attributes?: BatchPutAttributeOutput[];
}
export type MetadataGenerationRunIdentifier = string;
export interface CancelMetadataGenerationRunInput {
  domainIdentifier: string;
  identifier: string;
}
export interface CancelMetadataGenerationRunOutput {}
export interface CancelSubscriptionInput {
  domainIdentifier: string;
  identifier: string;
}
export type SubscriptionStatus =
  | "APPROVED"
  | "REVOKED"
  | "CANCELLED"
  | (string & {});
export interface CancelSubscriptionOutput {
  id: string;
  createdBy: string;
  updatedBy?: string;
  domainId: string;
  status: SubscriptionStatus;
  createdAt: Date;
  updatedAt: Date;
  subscribedPrincipal: SubscribedPrincipal;
  subscribedListing: SubscribedListing;
  subscriptionRequestId?: string;
  retainPermissions?: boolean;
}
export type AccountPoolName = string | redacted.Redacted<string>;
export type ResolutionStrategy = "MANUAL" | (string & {});
export type AwsAccountId = string;
export type AwsRegion = string;
export type AwsRegionList = string[];
export type AwsAccountName = string | redacted.Redacted<string>;
export interface AccountInfo {
  awsAccountId: string;
  supportedRegions: string[];
  awsAccountName?: string | redacted.Redacted<string>;
}
export type AccountInfoList = AccountInfo[];
export type LambdaFunctionArn = string;
export type LambdaExecutionRoleArn = string;
export interface CustomAccountPoolHandler {
  lambdaFunctionArn: string;
  lambdaExecutionRoleArn?: string;
}
export type AccountSource =
  | { accounts: AccountInfo[]; customAccountPoolHandler?: never }
  | { accounts?: never; customAccountPoolHandler: CustomAccountPoolHandler };
export interface CreateAccountPoolInput {
  domainIdentifier: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  resolutionStrategy: ResolutionStrategy;
  accountSource: AccountSource;
}
export type AccountPoolId = string;
export interface CreateAccountPoolOutput {
  domainId?: string;
  name?: string | redacted.Redacted<string>;
  id?: string;
  description?: string | redacted.Redacted<string>;
  resolutionStrategy?: ResolutionStrategy;
  accountSource: AccountSource;
  createdBy: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  updatedBy?: string;
  domainUnitId?: string;
}
export type AssetName = string | redacted.Redacted<string>;
export type ExternalIdentifier = string;
export type AssetTypeIdentifier = string;
export type GlossaryTerms = string[];
export interface BusinessNameGenerationConfiguration {
  enabled?: boolean;
}
export interface PredictionConfiguration {
  businessNameGeneration?: BusinessNameGenerationConfiguration;
}
export interface CreateAssetInput {
  name: string | redacted.Redacted<string>;
  domainIdentifier: string;
  externalIdentifier?: string;
  typeIdentifier: string;
  typeRevision?: string;
  description?: string | redacted.Redacted<string>;
  glossaryTerms?: string[];
  formsInput?: FormInput[];
  owningProjectIdentifier: string;
  predictionConfiguration?: PredictionConfiguration;
  clientToken?: string;
}
export type ListingStatus = "CREATING" | "ACTIVE" | "INACTIVE" | (string & {});
export interface AssetListingDetails {
  listingId: string;
  listingStatus: ListingStatus;
}
export type TimeSeriesFormName = string;
export type DataPointIdentifier = string;
export interface TimeSeriesDataPointSummaryFormOutput {
  formName: string;
  typeIdentifier: string;
  typeRevision?: string;
  timestamp: Date;
  contentSummary?: string;
  id?: string;
}
export type TimeSeriesDataPointSummaryFormOutputList =
  TimeSeriesDataPointSummaryFormOutput[];
export interface CreateAssetOutput {
  id: string;
  name: string | redacted.Redacted<string>;
  typeIdentifier: string;
  typeRevision: string;
  externalIdentifier?: string;
  revision: string;
  description?: string | redacted.Redacted<string>;
  createdAt?: Date;
  createdBy?: string;
  firstRevisionCreatedAt?: Date;
  firstRevisionCreatedBy?: string;
  glossaryTerms?: string[];
  governedGlossaryTerms?: string[];
  owningProjectId: string;
  domainId: string;
  listing?: AssetListingDetails;
  formsOutput: FormOutput[];
  readOnlyFormsOutput?: FormOutput[];
  latestTimeSeriesDataPointFormsOutput?: TimeSeriesDataPointSummaryFormOutput[];
  predictionConfiguration?: PredictionConfiguration;
}
export type FilterName = string | redacted.Redacted<string>;
export type ColumnNameList = string[];
export interface ColumnFilterConfiguration {
  includedColumnNames?: string[];
}
export interface EqualToExpression {
  columnName: string;
  value: string;
}
export interface NotEqualToExpression {
  columnName: string;
  value: string;
}
export interface GreaterThanExpression {
  columnName: string;
  value: string;
}
export interface LessThanExpression {
  columnName: string;
  value: string;
}
export interface GreaterThanOrEqualToExpression {
  columnName: string;
  value: string;
}
export interface LessThanOrEqualToExpression {
  columnName: string;
  value: string;
}
export interface IsNullExpression {
  columnName: string;
}
export interface IsNotNullExpression {
  columnName: string;
}
export type StringList = string[];
export interface InExpression {
  columnName: string;
  values: string[];
}
export interface NotInExpression {
  columnName: string;
  values: string[];
}
export interface LikeExpression {
  columnName: string;
  value: string;
}
export interface NotLikeExpression {
  columnName: string;
  value: string;
}
export type RowFilterExpression =
  | {
      equalTo: EqualToExpression;
      notEqualTo?: never;
      greaterThan?: never;
      lessThan?: never;
      greaterThanOrEqualTo?: never;
      lessThanOrEqualTo?: never;
      isNull?: never;
      isNotNull?: never;
      in?: never;
      notIn?: never;
      like?: never;
      notLike?: never;
    }
  | {
      equalTo?: never;
      notEqualTo: NotEqualToExpression;
      greaterThan?: never;
      lessThan?: never;
      greaterThanOrEqualTo?: never;
      lessThanOrEqualTo?: never;
      isNull?: never;
      isNotNull?: never;
      in?: never;
      notIn?: never;
      like?: never;
      notLike?: never;
    }
  | {
      equalTo?: never;
      notEqualTo?: never;
      greaterThan: GreaterThanExpression;
      lessThan?: never;
      greaterThanOrEqualTo?: never;
      lessThanOrEqualTo?: never;
      isNull?: never;
      isNotNull?: never;
      in?: never;
      notIn?: never;
      like?: never;
      notLike?: never;
    }
  | {
      equalTo?: never;
      notEqualTo?: never;
      greaterThan?: never;
      lessThan: LessThanExpression;
      greaterThanOrEqualTo?: never;
      lessThanOrEqualTo?: never;
      isNull?: never;
      isNotNull?: never;
      in?: never;
      notIn?: never;
      like?: never;
      notLike?: never;
    }
  | {
      equalTo?: never;
      notEqualTo?: never;
      greaterThan?: never;
      lessThan?: never;
      greaterThanOrEqualTo: GreaterThanOrEqualToExpression;
      lessThanOrEqualTo?: never;
      isNull?: never;
      isNotNull?: never;
      in?: never;
      notIn?: never;
      like?: never;
      notLike?: never;
    }
  | {
      equalTo?: never;
      notEqualTo?: never;
      greaterThan?: never;
      lessThan?: never;
      greaterThanOrEqualTo?: never;
      lessThanOrEqualTo: LessThanOrEqualToExpression;
      isNull?: never;
      isNotNull?: never;
      in?: never;
      notIn?: never;
      like?: never;
      notLike?: never;
    }
  | {
      equalTo?: never;
      notEqualTo?: never;
      greaterThan?: never;
      lessThan?: never;
      greaterThanOrEqualTo?: never;
      lessThanOrEqualTo?: never;
      isNull: IsNullExpression;
      isNotNull?: never;
      in?: never;
      notIn?: never;
      like?: never;
      notLike?: never;
    }
  | {
      equalTo?: never;
      notEqualTo?: never;
      greaterThan?: never;
      lessThan?: never;
      greaterThanOrEqualTo?: never;
      lessThanOrEqualTo?: never;
      isNull?: never;
      isNotNull: IsNotNullExpression;
      in?: never;
      notIn?: never;
      like?: never;
      notLike?: never;
    }
  | {
      equalTo?: never;
      notEqualTo?: never;
      greaterThan?: never;
      lessThan?: never;
      greaterThanOrEqualTo?: never;
      lessThanOrEqualTo?: never;
      isNull?: never;
      isNotNull?: never;
      in: InExpression;
      notIn?: never;
      like?: never;
      notLike?: never;
    }
  | {
      equalTo?: never;
      notEqualTo?: never;
      greaterThan?: never;
      lessThan?: never;
      greaterThanOrEqualTo?: never;
      lessThanOrEqualTo?: never;
      isNull?: never;
      isNotNull?: never;
      in?: never;
      notIn: NotInExpression;
      like?: never;
      notLike?: never;
    }
  | {
      equalTo?: never;
      notEqualTo?: never;
      greaterThan?: never;
      lessThan?: never;
      greaterThanOrEqualTo?: never;
      lessThanOrEqualTo?: never;
      isNull?: never;
      isNotNull?: never;
      in?: never;
      notIn?: never;
      like: LikeExpression;
      notLike?: never;
    }
  | {
      equalTo?: never;
      notEqualTo?: never;
      greaterThan?: never;
      lessThan?: never;
      greaterThanOrEqualTo?: never;
      lessThanOrEqualTo?: never;
      isNull?: never;
      isNotNull?: never;
      in?: never;
      notIn?: never;
      like?: never;
      notLike: NotLikeExpression;
    };
export type RowFilterList = RowFilter[];
export type RowFilter =
  | { expression: RowFilterExpression; and?: never; or?: never }
  | { expression?: never; and: RowFilter[]; or?: never }
  | { expression?: never; and?: never; or: RowFilter[] };
export interface RowFilterConfiguration {
  rowFilter: RowFilter;
  sensitive?: boolean;
}
export type AssetFilterConfiguration =
  | { columnConfiguration: ColumnFilterConfiguration; rowConfiguration?: never }
  | { columnConfiguration?: never; rowConfiguration: RowFilterConfiguration };
export interface CreateAssetFilterInput {
  domainIdentifier: string;
  assetIdentifier: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  configuration: AssetFilterConfiguration;
  clientToken?: string;
}
export type FilterStatus = "VALID" | "INVALID" | (string & {});
export interface CreateAssetFilterOutput {
  id: string;
  domainId: string;
  assetId: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  status?: FilterStatus;
  configuration: AssetFilterConfiguration;
  createdAt?: Date;
  errorMessage?: string;
  effectiveColumnNames?: string[];
  effectiveRowFilter?: string;
}
export interface CreateAssetRevisionInput {
  name: string | redacted.Redacted<string>;
  domainIdentifier: string;
  identifier: string;
  typeRevision?: string;
  description?: string | redacted.Redacted<string>;
  glossaryTerms?: string[];
  formsInput?: FormInput[];
  predictionConfiguration?: PredictionConfiguration;
  clientToken?: string;
}
export interface CreateAssetRevisionOutput {
  id: string;
  name: string | redacted.Redacted<string>;
  typeIdentifier: string;
  typeRevision: string;
  externalIdentifier?: string;
  revision: string;
  description?: string | redacted.Redacted<string>;
  createdAt?: Date;
  createdBy?: string;
  firstRevisionCreatedAt?: Date;
  firstRevisionCreatedBy?: string;
  glossaryTerms?: string[];
  governedGlossaryTerms?: string[];
  owningProjectId: string;
  domainId: string;
  listing?: AssetListingDetails;
  formsOutput: FormOutput[];
  readOnlyFormsOutput?: FormOutput[];
  latestTimeSeriesDataPointFormsOutput?: TimeSeriesDataPointSummaryFormOutput[];
  predictionConfiguration?: PredictionConfiguration;
}
export interface FormEntryInput {
  typeIdentifier: string;
  typeRevision: string;
  required?: boolean;
}
export type FormsInputMap = { [key: string]: FormEntryInput | undefined };
export interface CreateAssetTypeInput {
  domainIdentifier: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  formsInput: { [key: string]: FormEntryInput | undefined };
  owningProjectIdentifier: string;
}
export interface FormEntryOutput {
  typeName: string | redacted.Redacted<string>;
  typeRevision: string;
  required?: boolean;
}
export type FormsOutputMap = { [key: string]: FormEntryOutput | undefined };
export interface CreateAssetTypeOutput {
  domainId: string;
  name: string;
  revision: string;
  description?: string | redacted.Redacted<string>;
  formsOutput: { [key: string]: FormEntryOutput | undefined };
  owningProjectId?: string;
  originDomainId?: string;
  originProjectId?: string;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export type ConnectionId = string;
export interface AwsLocation {
  accessRole?: string;
  awsAccountId?: string;
  awsRegion?: string;
  iamConnectionId?: string;
}
export type PropertyMap = { [key: string]: string | undefined };
export interface Configuration {
  classification?: string;
  properties?: { [key: string]: string | undefined };
}
export type Configurations = Configuration[];
export type ConnectionName = string;
export interface AthenaPropertiesInput {
  workgroupName?: string;
}
export type ConnectionProperties = { [key: string]: string | undefined };
export type SubnetId = string;
export type SubnetIdList = string[];
export type SecurityGroupIdList = string[];
export interface PhysicalConnectionRequirements {
  subnetId?: string;
  subnetIdList?: string[];
  securityGroupIdList?: string[];
  availabilityZone?: string;
}
export type GlueConnectionType =
  | "SNOWFLAKE"
  | "BIGQUERY"
  | "DOCUMENTDB"
  | "DYNAMODB"
  | "MYSQL"
  | "OPENSEARCH"
  | "ORACLE"
  | "POSTGRESQL"
  | "REDSHIFT"
  | "SAPHANA"
  | "SQLSERVER"
  | "TERADATA"
  | "VERTICA"
  | (string & {});
export type ComputeEnvironments = "SPARK" | "ATHENA" | "PYTHON" | (string & {});
export type ComputeEnvironmentsList = ComputeEnvironments[];
export type AuthenticationType = "BASIC" | "OAUTH2" | "CUSTOM" | (string & {});
export type OAuth2GrantType =
  | "AUTHORIZATION_CODE"
  | "CLIENT_CREDENTIALS"
  | "JWT_BEARER"
  | (string & {});
export interface OAuth2ClientApplication {
  userManagedClientApplicationClientId?: string;
  aWSManagedClientApplicationReference?: string;
}
export type TokenUrlParametersMap = { [key: string]: string | undefined };
export interface AuthorizationCodeProperties {
  authorizationCode?: string;
  redirectUri?: string;
}
export interface GlueOAuth2Credentials {
  userManagedClientApplicationClientSecret?: string;
  accessToken?: string;
  refreshToken?: string;
  jwtToken?: string;
}
export interface OAuth2Properties {
  oAuth2GrantType?: OAuth2GrantType;
  oAuth2ClientApplication?: OAuth2ClientApplication;
  tokenUrl?: string;
  tokenUrlParametersMap?: { [key: string]: string | undefined };
  authorizationCodeProperties?: AuthorizationCodeProperties;
  oAuth2Credentials?: GlueOAuth2Credentials;
}
export interface BasicAuthenticationCredentials {
  userName?: string;
  password?: string;
}
export type CredentialMap = { [key: string]: string | undefined };
export interface AuthenticationConfigurationInput {
  authenticationType?: AuthenticationType;
  oAuth2Properties?: OAuth2Properties;
  secretArn?: string;
  kmsKeyArn?: string;
  basicAuthenticationCredentials?: BasicAuthenticationCredentials;
  customAuthenticationCredentials?: { [key: string]: string | undefined };
}
export interface GlueConnectionInput {
  connectionProperties?: { [key: string]: string | undefined };
  physicalConnectionRequirements?: PhysicalConnectionRequirements;
  name?: string;
  description?: string;
  connectionType?: GlueConnectionType;
  matchCriteria?: string;
  validateCredentials?: boolean;
  validateForComputeEnvironments?: ComputeEnvironments[];
  sparkProperties?: { [key: string]: string | undefined };
  athenaProperties?: { [key: string]: string | undefined };
  pythonProperties?: { [key: string]: string | undefined };
  authenticationConfiguration?: AuthenticationConfigurationInput;
}
export interface GluePropertiesInput {
  glueConnectionInput?: GlueConnectionInput;
}
export interface HyperPodPropertiesInput {
  clusterName: string;
}
export interface IamPropertiesInput {
  glueLineageSyncEnabled?: boolean;
}
export type RedshiftStorageProperties =
  | { clusterName: string; workgroupName?: never }
  | { clusterName?: never; workgroupName: string };
export type Password = string | redacted.Redacted<string>;
export type Username = string;
export interface UsernamePassword {
  password: string | redacted.Redacted<string>;
  username: string;
}
export type RedshiftCredentials =
  | { secretArn: string; usernamePassword?: never }
  | { secretArn?: never; usernamePassword: UsernamePassword };
export interface LineageSyncSchedule {
  schedule?: string;
}
export interface RedshiftLineageSyncConfigurationInput {
  enabled?: boolean;
  schedule?: LineageSyncSchedule;
}
export interface RedshiftPropertiesInput {
  storage?: RedshiftStorageProperties;
  databaseName?: string;
  host?: string;
  port?: number;
  credentials?: RedshiftCredentials;
  lineageSync?: RedshiftLineageSyncConfigurationInput;
}
export interface SparkEmrPropertiesInput {
  computeArn?: string;
  instanceProfileArn?: string;
  javaVirtualEnv?: string;
  logUri?: string;
  pythonVirtualEnv?: string;
  runtimeRole?: string;
  trustedCertificatesS3Uri?: string;
  managedEndpointArn?: string;
}
export interface SparkGlueArgs {
  connection?: string;
}
export type GlueConnectionName = string;
export type GlueConnectionNames = string[];
export interface SparkGluePropertiesInput {
  additionalArgs?: SparkGlueArgs;
  glueConnectionName?: string;
  glueConnectionNames?: string[];
  glueVersion?: string;
  idleTimeout?: number;
  javaVirtualEnv?: string;
  numberOfWorkers?: number;
  pythonVirtualEnv?: string;
  workerType?: string;
}
export type S3Uri = string;
export type S3AccessGrantLocationId = string;
export interface S3PropertiesInput {
  s3Uri: string;
  s3AccessGrantLocationId?: string;
  registerS3AccessGrantLocation?: boolean;
}
export interface ConnectivityProperties {
  connectionProperties?: { [key: string]: string | undefined };
  physicalConnectionRequirements?: PhysicalConnectionRequirements;
  name?: string;
  description?: string;
  validateCredentials?: boolean;
  validateForComputeEnvironments?: ComputeEnvironments[];
  sparkProperties?: { [key: string]: string | undefined };
  athenaProperties?: { [key: string]: string | undefined };
  pythonProperties?: { [key: string]: string | undefined };
  authenticationConfiguration?: AuthenticationConfigurationInput;
}
export type SnowflakeRole = string;
export interface IdentityMapping {
  usernameAttribute: string;
  prefix?: string;
}
export type Timezone =
  | "UTC"
  | "AFRICA_JOHANNESBURG"
  | "AMERICA_MONTREAL"
  | "AMERICA_SAO_PAULO"
  | "ASIA_BAHRAIN"
  | "ASIA_BANGKOK"
  | "ASIA_CALCUTTA"
  | "ASIA_DUBAI"
  | "ASIA_HONG_KONG"
  | "ASIA_JAKARTA"
  | "ASIA_KUALA_LUMPUR"
  | "ASIA_SEOUL"
  | "ASIA_SHANGHAI"
  | "ASIA_SINGAPORE"
  | "ASIA_TAIPEI"
  | "ASIA_TOKYO"
  | "AUSTRALIA_MELBOURNE"
  | "AUSTRALIA_SYDNEY"
  | "CANADA_CENTRAL"
  | "CET"
  | "CST6CDT"
  | "ETC_GMT"
  | "ETC_GMT0"
  | "ETC_GMT_ADD_0"
  | "ETC_GMT_ADD_1"
  | "ETC_GMT_ADD_10"
  | "ETC_GMT_ADD_11"
  | "ETC_GMT_ADD_12"
  | "ETC_GMT_ADD_2"
  | "ETC_GMT_ADD_3"
  | "ETC_GMT_ADD_4"
  | "ETC_GMT_ADD_5"
  | "ETC_GMT_ADD_6"
  | "ETC_GMT_ADD_7"
  | "ETC_GMT_ADD_8"
  | "ETC_GMT_ADD_9"
  | "ETC_GMT_NEG_0"
  | "ETC_GMT_NEG_1"
  | "ETC_GMT_NEG_10"
  | "ETC_GMT_NEG_11"
  | "ETC_GMT_NEG_12"
  | "ETC_GMT_NEG_13"
  | "ETC_GMT_NEG_14"
  | "ETC_GMT_NEG_2"
  | "ETC_GMT_NEG_3"
  | "ETC_GMT_NEG_4"
  | "ETC_GMT_NEG_5"
  | "ETC_GMT_NEG_6"
  | "ETC_GMT_NEG_7"
  | "ETC_GMT_NEG_8"
  | "ETC_GMT_NEG_9"
  | "EUROPE_DUBLIN"
  | "EUROPE_LONDON"
  | "EUROPE_PARIS"
  | "EUROPE_STOCKHOLM"
  | "EUROPE_ZURICH"
  | "ISRAEL"
  | "MEXICO_GENERAL"
  | "MST7MDT"
  | "PACIFIC_AUCKLAND"
  | "US_CENTRAL"
  | "US_EASTERN"
  | "US_MOUNTAIN"
  | "US_PACIFIC"
  | (string & {});
export type LineageSyncScheduleCronString = string;
export interface LineageSyncInput {
  timezone?: Timezone;
  enabled: boolean;
  schedule?: string;
}
export interface SnowflakePropertiesInput {
  connectivityProperties?: ConnectivityProperties;
  snowflakeRole: string;
  identityMapping: IdentityMapping;
  lineageSync?: LineageSyncInput;
}
export interface AmazonQPropertiesInput {
  isEnabled: boolean;
  profileArn?: string;
  authMode?: string;
}
export interface MlflowPropertiesInput {
  trackingServerArn?: string;
}
export interface WorkflowsMwaaPropertiesInput {
  mwaaEnvironmentName?: string;
}
export interface WorkflowsServerlessPropertiesInput {}
export interface LakehousePropertiesInput {
  glueLineageSyncEnabled?: boolean;
}
export type VpcId = string;
export type VpcConnectionSubnetIdList = string[];
export type SecurityGroupId = string;
export interface VpcPropertiesInput {
  vpcId: string;
  subnetIds: string[];
  securityGroupId?: string;
}
export interface GitPropertiesInput {
  codeConnectionArn: string;
  repositoryId: string;
  defaultBranch: string;
}
export type ConnectionPropertiesInput =
  | {
      athenaProperties: AthenaPropertiesInput;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      snowflakeProperties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties: GluePropertiesInput;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      snowflakeProperties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties: HyperPodPropertiesInput;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      snowflakeProperties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties: IamPropertiesInput;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      snowflakeProperties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties: RedshiftPropertiesInput;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      snowflakeProperties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties: SparkEmrPropertiesInput;
      sparkGlueProperties?: never;
      s3Properties?: never;
      snowflakeProperties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties: SparkGluePropertiesInput;
      s3Properties?: never;
      snowflakeProperties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties: S3PropertiesInput;
      snowflakeProperties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      snowflakeProperties: SnowflakePropertiesInput;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      snowflakeProperties?: never;
      amazonQProperties: AmazonQPropertiesInput;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      snowflakeProperties?: never;
      amazonQProperties?: never;
      mlflowProperties: MlflowPropertiesInput;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      snowflakeProperties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties: WorkflowsMwaaPropertiesInput;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      snowflakeProperties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties: WorkflowsServerlessPropertiesInput;
      lakehouseProperties?: never;
      vpcProperties?: never;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      snowflakeProperties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties: LakehousePropertiesInput;
      vpcProperties?: never;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      snowflakeProperties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties: VpcPropertiesInput;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      snowflakeProperties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
      gitProperties: GitPropertiesInput;
    };
export type ConnectionScope = "DOMAIN" | "PROJECT" | (string & {});
export interface CreateConnectionInput {
  awsLocation?: AwsLocation;
  clientToken?: string;
  configurations?: Configuration[];
  description?: string | redacted.Redacted<string>;
  domainIdentifier: string;
  environmentIdentifier?: string;
  name: string;
  props?: ConnectionPropertiesInput;
  enableTrustedIdentityPropagation?: boolean;
  scope?: ConnectionScope;
}
export type ConnectionType =
  | "ATHENA"
  | "BIGQUERY"
  | "DATABRICKS"
  | "DOCUMENTDB"
  | "DYNAMODB"
  | "HYPERPOD"
  | "IAM"
  | "MYSQL"
  | "OPENSEARCH"
  | "ORACLE"
  | "POSTGRESQL"
  | "REDSHIFT"
  | "S3"
  | "SAPHANA"
  | "SNOWFLAKE"
  | "SPARK"
  | "SQLSERVER"
  | "TERADATA"
  | "VERTICA"
  | "WORKFLOWS_MWAA"
  | "AMAZON_Q"
  | "MLFLOW"
  | "VPC"
  | "GIT"
  | (string & {});
export type MatchCriteria = string[];
export type ConnectionStatus =
  | "CREATING"
  | "CREATE_FAILED"
  | "DELETING"
  | "DELETE_FAILED"
  | "READY"
  | "UPDATING"
  | "UPDATE_FAILED"
  | "DELETED"
  | (string & {});
export interface AuthenticationConfiguration {
  authenticationType?: AuthenticationType;
  secretArn?: string;
  oAuth2Properties?: OAuth2Properties;
}
export interface GlueConnection {
  name?: string;
  description?: string;
  connectionType?: ConnectionType;
  matchCriteria?: string[];
  connectionProperties?: { [key: string]: string | undefined };
  sparkProperties?: { [key: string]: string | undefined };
  athenaProperties?: { [key: string]: string | undefined };
  pythonProperties?: { [key: string]: string | undefined };
  physicalConnectionRequirements?: PhysicalConnectionRequirements;
  creationTime?: Date;
  lastUpdatedTime?: Date;
  lastUpdatedBy?: string;
  status?: ConnectionStatus;
  statusReason?: string;
  lastConnectionValidationTime?: Date;
  authenticationConfiguration?: AuthenticationConfiguration;
  connectionSchemaVersion?: number;
  compatibleComputeEnvironments?: ComputeEnvironments[];
}
export type Protocol =
  | "ATHENA"
  | "GLUE_INTERACTIVE_SESSION"
  | "HTTPS"
  | "JDBC"
  | "LIVY"
  | "ODBC"
  | "PRISM"
  | (string & {});
export interface PhysicalEndpoint {
  awsLocation?: AwsLocation;
  glueConnectionName?: string;
  glueConnectionNames?: string[];
  glueConnection?: GlueConnection;
  enableTrustedIdentityPropagation?: boolean;
  host?: string;
  port?: number;
  protocol?: Protocol;
  stage?: string;
}
export type PhysicalEndpoints = PhysicalEndpoint[];
export interface AthenaPropertiesOutput {
  workgroupName?: string;
}
export interface GluePropertiesOutput {
  status?: ConnectionStatus;
  errorMessage?: string;
}
export type HyperPodOrchestrator = "EKS" | "SLURM" | (string & {});
export interface HyperPodPropertiesOutput {
  clusterName: string;
  clusterArn?: string;
  orchestrator?: HyperPodOrchestrator;
}
export interface IamPropertiesOutput {
  environmentId?: string;
  glueLineageSyncEnabled?: boolean;
}
export interface RedshiftLineageSyncConfigurationOutput {
  lineageJobId?: string;
  enabled?: boolean;
  schedule?: LineageSyncSchedule;
}
export interface RedshiftPropertiesOutput {
  storage?: RedshiftStorageProperties;
  credentials?: RedshiftCredentials;
  isProvisionedSecret?: boolean;
  jdbcIamUrl?: string;
  jdbcUrl?: string;
  redshiftTempDir?: string;
  lineageSync?: RedshiftLineageSyncConfigurationOutput;
  status?: ConnectionStatus;
  databaseName?: string;
}
export type GovernanceType = "AWS_MANAGED" | "USER_MANAGED" | (string & {});
export interface ManagedEndpointCredentials {
  id?: string;
  token?: string;
}
export interface SparkEmrPropertiesOutput {
  computeArn?: string;
  credentials?: UsernamePassword;
  credentialsExpiration?: Date;
  governanceType?: GovernanceType;
  instanceProfileArn?: string;
  javaVirtualEnv?: string;
  livyEndpoint?: string;
  logUri?: string;
  pythonVirtualEnv?: string;
  runtimeRole?: string;
  trustedCertificatesS3Uri?: string;
  certificateData?: string;
  managedEndpointArn?: string;
  managedEndpointCredentials?: ManagedEndpointCredentials;
}
export interface SparkGluePropertiesOutput {
  additionalArgs?: SparkGlueArgs;
  glueConnectionName?: string;
  glueConnectionNames?: string[];
  glueVersion?: string;
  idleTimeout?: number;
  javaVirtualEnv?: string;
  numberOfWorkers?: number;
  pythonVirtualEnv?: string;
  workerType?: string;
}
export interface S3PropertiesOutput {
  s3Uri: string;
  s3AccessGrantLocationId?: string;
  registerS3AccessGrantLocation?: boolean;
  status?: ConnectionStatus;
  errorMessage?: string;
}
export interface LineageSyncOutput {
  lineageJobId?: string;
  timezone?: Timezone;
  enabled?: boolean;
  schedule?: string;
}
export interface SnowflakePropertiesOutput {
  snowflakeRole: string;
  identityMapping: IdentityMapping;
  lineageSync: LineageSyncOutput;
  status: ConnectionStatus;
  errorMessage?: string;
}
export interface AmazonQPropertiesOutput {
  isEnabled: boolean;
  profileArn?: string;
  authMode?: string;
}
export interface MlflowPropertiesOutput {
  trackingServerArn?: string;
}
export interface WorkflowsMwaaPropertiesOutput {
  mwaaEnvironmentName?: string;
}
export interface WorkflowsServerlessPropertiesOutput {}
export interface LakehousePropertiesOutput {
  glueLineageSyncEnabled?: boolean;
}
export interface VpcPropertiesOutput {
  vpcId: string;
  subnetIds: string[];
  status: ConnectionStatus;
  securityGroupId?: string;
  glueConnectionNames?: string[];
}
export interface GitPropertiesOutput {
  codeConnectionArn: string;
  repositoryId: string;
  defaultBranch: string;
  status?: ConnectionStatus;
  errorMessage?: string;
}
export type ConnectionPropertiesOutput =
  | {
      athenaProperties: AthenaPropertiesOutput;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      snowflakeProperties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties: GluePropertiesOutput;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      snowflakeProperties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties: HyperPodPropertiesOutput;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      snowflakeProperties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties: IamPropertiesOutput;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      snowflakeProperties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties: RedshiftPropertiesOutput;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      snowflakeProperties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties: SparkEmrPropertiesOutput;
      sparkGlueProperties?: never;
      s3Properties?: never;
      snowflakeProperties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties: SparkGluePropertiesOutput;
      s3Properties?: never;
      snowflakeProperties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties: S3PropertiesOutput;
      snowflakeProperties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      snowflakeProperties: SnowflakePropertiesOutput;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      snowflakeProperties?: never;
      amazonQProperties: AmazonQPropertiesOutput;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      snowflakeProperties?: never;
      amazonQProperties?: never;
      mlflowProperties: MlflowPropertiesOutput;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      snowflakeProperties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties: WorkflowsMwaaPropertiesOutput;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      snowflakeProperties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties: WorkflowsServerlessPropertiesOutput;
      lakehouseProperties?: never;
      vpcProperties?: never;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      snowflakeProperties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties: LakehousePropertiesOutput;
      vpcProperties?: never;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      snowflakeProperties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties: VpcPropertiesOutput;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      hyperPodProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      sparkGlueProperties?: never;
      s3Properties?: never;
      snowflakeProperties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      workflowsMwaaProperties?: never;
      workflowsServerlessProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
      gitProperties: GitPropertiesOutput;
    };
export interface CreateConnectionOutput {
  connectionId: string;
  configurations?: Configuration[];
  description?: string | redacted.Redacted<string>;
  domainId: string;
  domainUnitId: string;
  environmentId?: string;
  name: string;
  physicalEndpoints: PhysicalEndpoint[];
  projectId?: string;
  props?: ConnectionPropertiesOutput;
  type: ConnectionType;
  scope?: ConnectionScope;
}
export type DataProductName = string | redacted.Redacted<string>;
export type DataProductDescription = string | redacted.Redacted<string>;
export type DataProductItemType = "ASSET" | (string & {});
export type ItemGlossaryTerms = string[];
export interface DataProductItem {
  itemType: DataProductItemType;
  identifier: string;
  revision?: string;
  glossaryTerms?: string[];
}
export type DataProductItems = DataProductItem[];
export interface CreateDataProductInput {
  domainIdentifier: string;
  name: string | redacted.Redacted<string>;
  owningProjectIdentifier: string;
  description?: string | redacted.Redacted<string>;
  glossaryTerms?: string[];
  formsInput?: FormInput[];
  items?: DataProductItem[];
  clientToken?: string;
}
export type DataProductId = string;
export type DataProductStatus =
  | "CREATED"
  | "CREATING"
  | "CREATE_FAILED"
  | (string & {});
export interface CreateDataProductOutput {
  domainId: string;
  id: string;
  revision: string;
  owningProjectId: string;
  name: string | redacted.Redacted<string>;
  status: DataProductStatus;
  description?: string | redacted.Redacted<string>;
  glossaryTerms?: string[];
  items?: DataProductItem[];
  formsOutput?: FormOutput[];
  createdAt?: Date;
  createdBy?: string;
  firstRevisionCreatedAt?: Date;
  firstRevisionCreatedBy?: string;
}
export interface CreateDataProductRevisionInput {
  domainIdentifier: string;
  identifier: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  glossaryTerms?: string[];
  items?: DataProductItem[];
  formsInput?: FormInput[];
  clientToken?: string;
}
export interface CreateDataProductRevisionOutput {
  domainId: string;
  id: string;
  revision: string;
  owningProjectId: string;
  name: string | redacted.Redacted<string>;
  status: DataProductStatus;
  description?: string | redacted.Redacted<string>;
  glossaryTerms?: string[];
  items?: DataProductItem[];
  formsOutput?: FormOutput[];
  createdAt?: Date;
  createdBy?: string;
  firstRevisionCreatedAt?: Date;
  firstRevisionCreatedBy?: string;
}
export type Name = string | redacted.Redacted<string>;
export type DataSourceType = string;
export type FilterExpressionType = "INCLUDE" | "EXCLUDE" | (string & {});
export interface FilterExpression {
  type: FilterExpressionType;
  expression: string;
}
export type FilterExpressions = FilterExpression[];
export interface RelationalFilterConfiguration {
  databaseName: string;
  schemaName?: string;
  filterExpressions?: FilterExpression[];
}
export type RelationalFilterConfigurations = RelationalFilterConfiguration[];
export interface GlueRunConfigurationInput {
  dataAccessRole?: string;
  relationalFilterConfigurations: RelationalFilterConfiguration[];
  autoImportDataQualityResult?: boolean;
  catalogName?: string;
}
export interface RedshiftCredentialConfiguration {
  secretManagerArn: string;
}
export interface RedshiftClusterStorage {
  clusterName: string;
}
export interface RedshiftServerlessStorage {
  workgroupName: string;
}
export type RedshiftStorage =
  | {
      redshiftClusterSource: RedshiftClusterStorage;
      redshiftServerlessSource?: never;
    }
  | {
      redshiftClusterSource?: never;
      redshiftServerlessSource: RedshiftServerlessStorage;
    };
export interface RedshiftRunConfigurationInput {
  dataAccessRole?: string;
  relationalFilterConfigurations: RelationalFilterConfiguration[];
  redshiftCredentialConfiguration?: RedshiftCredentialConfiguration;
  redshiftStorage?: RedshiftStorage;
}
export type SageMakerAssetType = string;
export type SageMakerResourceArn = string;
export type TrackingAssetArns = string[];
export type TrackingAssets = { [key: string]: string[] | undefined };
export interface SageMakerRunConfigurationInput {
  trackingAssets: { [key: string]: string[] | undefined };
}
export type DataSourceConfigurationInput =
  | {
      glueRunConfiguration: GlueRunConfigurationInput;
      redshiftRunConfiguration?: never;
      sageMakerRunConfiguration?: never;
    }
  | {
      glueRunConfiguration?: never;
      redshiftRunConfiguration: RedshiftRunConfigurationInput;
      sageMakerRunConfiguration?: never;
    }
  | {
      glueRunConfiguration?: never;
      redshiftRunConfiguration?: never;
      sageMakerRunConfiguration: SageMakerRunConfigurationInput;
    };
export interface RecommendationConfiguration {
  enableBusinessNameGeneration?: boolean;
}
export type EnableSetting = "ENABLED" | "DISABLED" | (string & {});
export type CronString = string;
export interface ScheduleConfiguration {
  timezone?: Timezone;
  schedule?: string;
}
export interface CreateDataSourceInput {
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  domainIdentifier: string;
  projectIdentifier: string;
  environmentIdentifier?: string;
  connectionIdentifier?: string;
  type: string;
  configuration?: DataSourceConfigurationInput;
  recommendation?: RecommendationConfiguration;
  enableSetting?: EnableSetting;
  schedule?: ScheduleConfiguration;
  publishOnImport?: boolean;
  assetFormsInput?: FormInput[];
  clientToken?: string;
}
export type DataSourceId = string;
export type DataSourceStatus =
  | "CREATING"
  | "FAILED_CREATION"
  | "READY"
  | "UPDATING"
  | "FAILED_UPDATE"
  | "RUNNING"
  | "DELETING"
  | "FAILED_DELETION"
  | (string & {});
export interface GlueRunConfigurationOutput {
  accountId?: string;
  region?: string;
  dataAccessRole?: string;
  relationalFilterConfigurations: RelationalFilterConfiguration[];
  autoImportDataQualityResult?: boolean;
  catalogName?: string;
}
export interface RedshiftRunConfigurationOutput {
  accountId?: string;
  region?: string;
  dataAccessRole?: string;
  relationalFilterConfigurations: RelationalFilterConfiguration[];
  redshiftCredentialConfiguration?: RedshiftCredentialConfiguration;
  redshiftStorage: RedshiftStorage;
}
export interface SageMakerRunConfigurationOutput {
  accountId?: string;
  region?: string;
  trackingAssets: { [key: string]: string[] | undefined };
}
export type DataSourceConfigurationOutput =
  | {
      glueRunConfiguration: GlueRunConfigurationOutput;
      redshiftRunConfiguration?: never;
      sageMakerRunConfiguration?: never;
    }
  | {
      glueRunConfiguration?: never;
      redshiftRunConfiguration: RedshiftRunConfigurationOutput;
      sageMakerRunConfiguration?: never;
    }
  | {
      glueRunConfiguration?: never;
      redshiftRunConfiguration?: never;
      sageMakerRunConfiguration: SageMakerRunConfigurationOutput;
    };
export type DataSourceRunStatus =
  | "REQUESTED"
  | "RUNNING"
  | "FAILED"
  | "PARTIALLY_SUCCEEDED"
  | "SUCCESS"
  | (string & {});
export type DataSourceErrorType =
  | "ACCESS_DENIED_EXCEPTION"
  | "CONFLICT_EXCEPTION"
  | "INTERNAL_SERVER_EXCEPTION"
  | "RESOURCE_NOT_FOUND_EXCEPTION"
  | "SERVICE_QUOTA_EXCEEDED_EXCEPTION"
  | "THROTTLING_EXCEPTION"
  | "VALIDATION_EXCEPTION"
  | (string & {});
export interface DataSourceErrorMessage {
  errorType: DataSourceErrorType;
  errorDetail?: string;
}
export interface CreateDataSourceOutput {
  id: string;
  status?: DataSourceStatus;
  type?: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  domainId: string;
  projectId: string;
  environmentId?: string;
  connectionId?: string;
  configuration?: DataSourceConfigurationOutput;
  recommendation?: RecommendationConfiguration;
  enableSetting?: EnableSetting;
  publishOnImport?: boolean;
  assetFormsOutput?: FormOutput[];
  schedule?: ScheduleConfiguration;
  lastRunStatus?: DataSourceRunStatus;
  lastRunAt?: Date;
  lastRunErrorMessage?: DataSourceErrorMessage;
  errorMessage?: DataSourceErrorMessage;
  createdAt?: Date;
  updatedAt?: Date;
}
export type AuthType = "IAM_IDC" | "DISABLED" | (string & {});
export type UserAssignment = "AUTOMATIC" | "MANUAL" | (string & {});
export interface SingleSignOn {
  type?: AuthType;
  userAssignment?: UserAssignment;
  idcInstanceArn?: string;
}
export type RoleArn = string;
export type KmsKeyArn = string;
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export type DomainVersion = "V1" | "V2" | (string & {});
export interface CreateDomainInput {
  name: string;
  description?: string;
  singleSignOn?: SingleSignOn;
  domainExecutionRole?: string;
  kmsKeyIdentifier?: string;
  tags?: { [key: string]: string | undefined };
  domainVersion?: DomainVersion;
  serviceRole?: string;
  clientToken?: string;
}
export type DomainStatus =
  | "CREATING"
  | "AVAILABLE"
  | "CREATION_FAILED"
  | "DELETING"
  | "DELETED"
  | "DELETION_FAILED"
  | (string & {});
export interface CreateDomainOutput {
  id: string;
  rootDomainUnitId?: string;
  name?: string;
  description?: string;
  singleSignOn?: SingleSignOn;
  domainExecutionRole?: string;
  arn?: string;
  kmsKeyIdentifier?: string;
  status?: DomainStatus;
  portalUrl?: string;
  tags?: { [key: string]: string | undefined };
  domainVersion?: DomainVersion;
  serviceRole?: string;
}
export type DomainUnitName = string | redacted.Redacted<string>;
export type DomainUnitDescription = string | redacted.Redacted<string>;
export interface CreateDomainUnitInput {
  domainIdentifier: string;
  name: string | redacted.Redacted<string>;
  parentDomainUnitIdentifier: string;
  description?: string | redacted.Redacted<string>;
  clientToken?: string;
}
export interface DomainUnitUserProperties {
  userId?: string;
}
export interface DomainUnitGroupProperties {
  groupId?: string;
}
export type DomainUnitOwnerProperties =
  | { user: DomainUnitUserProperties; group?: never }
  | { user?: never; group: DomainUnitGroupProperties };
export type DomainUnitOwners = DomainUnitOwnerProperties[];
export type DomainUnitIds = string[];
export interface CreateDomainUnitOutput {
  id: string;
  domainId: string;
  name: string | redacted.Redacted<string>;
  parentDomainUnitId?: string;
  description?: string | redacted.Redacted<string>;
  owners: DomainUnitOwnerProperties[];
  ancestorDomainUnitIds: string[];
  createdAt?: Date;
  createdBy?: string;
}
export type EnvironmentProfileId = string;
export interface EnvironmentParameter {
  name?: string;
  value?: string;
}
export type EnvironmentParametersList = EnvironmentParameter[];
export type EnvironmentConfigurationName = string | redacted.Redacted<string>;
export interface CreateEnvironmentInput {
  projectIdentifier: string;
  domainIdentifier: string;
  description?: string;
  name: string;
  environmentProfileIdentifier?: string;
  userParameters?: EnvironmentParameter[];
  glossaryTerms?: string[];
  environmentAccountIdentifier?: string;
  environmentAccountRegion?: string;
  environmentBlueprintIdentifier?: string;
  deploymentOrder?: number;
  environmentConfigurationId?: string;
  environmentConfigurationName?: string | redacted.Redacted<string>;
}
export type EnvironmentName = string | redacted.Redacted<string>;
export interface Resource {
  provider?: string;
  name?: string;
  value: string;
  type: string;
}
export type ResourceList = Resource[];
export type EnvironmentStatus =
  | "ACTIVE"
  | "CREATING"
  | "UPDATING"
  | "DELETING"
  | "CREATE_FAILED"
  | "UPDATE_FAILED"
  | "DELETE_FAILED"
  | "VALIDATION_FAILED"
  | "SUSPENDED"
  | "DISABLED"
  | "EXPIRED"
  | "DELETED"
  | "INACCESSIBLE"
  | (string & {});
export type ConfigurableActionTypeAuthorization =
  | "IAM"
  | "HTTPS"
  | (string & {});
export interface ConfigurableActionParameter {
  key?: string;
  value?: string;
}
export type ConfigurableActionParameterList = ConfigurableActionParameter[];
export interface ConfigurableEnvironmentAction {
  type: string;
  auth?: ConfigurableActionTypeAuthorization;
  parameters: ConfigurableActionParameter[];
}
export type EnvironmentActionList = ConfigurableEnvironmentAction[];
export interface CustomParameter {
  keyName: string;
  description?: string | redacted.Redacted<string>;
  fieldType: string;
  defaultValue?: string;
  isEditable?: boolean;
  isOptional?: boolean;
  isUpdateSupported?: boolean;
}
export type CustomParameterList = CustomParameter[];
export type DeploymentType = "CREATE" | "UPDATE" | "DELETE" | (string & {});
export type DeploymentStatus =
  | "IN_PROGRESS"
  | "SUCCESSFUL"
  | "FAILED"
  | "PENDING_DEPLOYMENT"
  | (string & {});
export interface EnvironmentError {
  code?: string;
  message: string;
}
export type DeploymentMessage = string;
export type DeploymentMessagesList = string[];
export interface Deployment {
  deploymentId?: string;
  deploymentType?: DeploymentType;
  deploymentStatus?: DeploymentStatus;
  failureReason?: EnvironmentError;
  messages?: string[];
  isDeploymentComplete?: boolean;
}
export interface CloudFormationProperties {
  templateUrl: string;
}
export type ProvisioningProperties =
  | { cloudFormation: CloudFormationProperties; manual?: never }
  | { cloudFormation?: never; manual: Record<string, never> };
export interface DeploymentProperties {
  startTimeoutMinutes?: number;
  endTimeoutMinutes?: number;
}
export type EnvironmentBlueprintId = string;
export type EnvironmentConfigurationId = string | redacted.Redacted<string>;
export interface CreateEnvironmentOutput {
  projectId: string;
  id?: string;
  domainId: string;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  environmentProfileId?: string;
  awsAccountId?: string;
  awsAccountRegion?: string;
  provider: string;
  provisionedResources?: Resource[];
  status?: EnvironmentStatus;
  environmentActions?: ConfigurableEnvironmentAction[];
  glossaryTerms?: string[];
  userParameters?: CustomParameter[];
  lastDeployment?: Deployment;
  provisioningProperties?: ProvisioningProperties;
  deploymentProperties?: DeploymentProperties;
  environmentBlueprintId?: string;
  environmentConfigurationId?: string | redacted.Redacted<string>;
  environmentConfigurationName?: string | redacted.Redacted<string>;
}
export interface AwsConsoleLinkParameters {
  uri?: string;
}
export type ActionParameters = { awsConsoleLink: AwsConsoleLinkParameters };
export interface CreateEnvironmentActionInput {
  domainIdentifier: string;
  environmentIdentifier: string;
  name: string;
  parameters: ActionParameters;
  description?: string;
}
export type EnvironmentActionId = string;
export interface CreateEnvironmentActionOutput {
  domainId: string;
  environmentId: string;
  id: string;
  name: string;
  parameters: ActionParameters;
  description?: string;
}
export type EnvironmentBlueprintName = string;
export interface CreateEnvironmentBlueprintInput {
  domainIdentifier: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  provisioningProperties: ProvisioningProperties;
  userParameters?: CustomParameter[];
}
export interface CreateEnvironmentBlueprintOutput {
  id: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  provider: string;
  provisioningProperties: ProvisioningProperties;
  deploymentProperties?: DeploymentProperties;
  userParameters?: CustomParameter[];
  glossaryTerms?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
export type EnvironmentProfileName = string | redacted.Redacted<string>;
export interface CreateEnvironmentProfileInput {
  domainIdentifier: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  environmentBlueprintIdentifier: string;
  projectIdentifier: string;
  userParameters?: EnvironmentParameter[];
  awsAccountId?: string;
  awsAccountRegion?: string;
}
export interface CreateEnvironmentProfileOutput {
  id: string;
  domainId: string;
  awsAccountId?: string;
  awsAccountRegion?: string;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  environmentBlueprintId: string;
  projectId?: string;
  userParameters?: CustomParameter[];
}
export type Smithy = string;
export type Model = { smithy: string };
export type FormTypeStatus = "ENABLED" | "DISABLED" | (string & {});
export interface CreateFormTypeInput {
  domainIdentifier: string;
  name: string | redacted.Redacted<string>;
  model: Model;
  owningProjectIdentifier: string;
  status?: FormTypeStatus;
  description?: string | redacted.Redacted<string>;
}
export interface CreateFormTypeOutput {
  domainId: string;
  name: string | redacted.Redacted<string>;
  revision: string;
  description?: string | redacted.Redacted<string>;
  owningProjectId?: string;
  originDomainId?: string;
  originProjectId?: string;
}
export type GlossaryName = string | redacted.Redacted<string>;
export type GlossaryDescription = string | redacted.Redacted<string>;
export type GlossaryStatus = "DISABLED" | "ENABLED" | (string & {});
export type GlossaryUsageRestriction = "ASSET_GOVERNED_TERMS" | (string & {});
export type GlossaryUsageRestrictions = GlossaryUsageRestriction[];
export interface CreateGlossaryInput {
  domainIdentifier: string;
  name: string | redacted.Redacted<string>;
  owningProjectIdentifier: string;
  description?: string | redacted.Redacted<string>;
  status?: GlossaryStatus;
  usageRestrictions?: GlossaryUsageRestriction[];
  clientToken?: string;
}
export type GlossaryId = string;
export interface CreateGlossaryOutput {
  domainId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  owningProjectId: string;
  description?: string | redacted.Redacted<string>;
  status?: GlossaryStatus;
  usageRestrictions?: GlossaryUsageRestriction[];
}
export type GlossaryTermStatus = "ENABLED" | "DISABLED" | (string & {});
export type LongDescription = string | redacted.Redacted<string>;
export interface TermRelations {
  isA?: string[];
  classifies?: string[];
}
export interface CreateGlossaryTermInput {
  domainIdentifier: string;
  glossaryIdentifier: string;
  name: string | redacted.Redacted<string>;
  status?: GlossaryTermStatus;
  shortDescription?: string | redacted.Redacted<string>;
  longDescription?: string | redacted.Redacted<string>;
  termRelations?: TermRelations;
  clientToken?: string;
}
export interface CreateGlossaryTermOutput {
  id: string;
  domainId: string;
  glossaryId: string;
  name: string | redacted.Redacted<string>;
  status: GlossaryTermStatus;
  shortDescription?: string | redacted.Redacted<string>;
  longDescription?: string | redacted.Redacted<string>;
  termRelations?: TermRelations;
  usageRestrictions?: GlossaryUsageRestriction[];
}
export interface CreateGroupProfileInput {
  domainIdentifier: string;
  groupIdentifier?: string;
  rolePrincipalArn?: string;
  clientToken?: string;
}
export type GroupProfileStatus = "ASSIGNED" | "NOT_ASSIGNED" | (string & {});
export interface CreateGroupProfileOutput {
  domainId?: string;
  id?: string;
  status?: GroupProfileStatus;
  groupName?: string | redacted.Redacted<string>;
  rolePrincipalArn?: string;
  rolePrincipalId?: string;
}
export type EntityType = "ASSET" | "DATA_PRODUCT" | (string & {});
export type ChangeAction = "PUBLISH" | "UNPUBLISH" | (string & {});
export interface CreateListingChangeSetInput {
  domainIdentifier: string;
  entityIdentifier: string;
  entityType: EntityType;
  entityRevision?: string;
  action: ChangeAction;
  clientToken?: string;
}
export interface CreateListingChangeSetOutput {
  listingId: string;
  listingRevision: string;
  status: ListingStatus;
}
export type NotebookName = string | redacted.Redacted<string>;
export type MetadataKey = string;
export type MetadataValue = string | redacted.Redacted<string>;
export type Metadata = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export type ParameterKey = string;
export type ParameterValue = string;
export type Parameters = { [key: string]: string | undefined };
export interface CreateNotebookInput {
  domainIdentifier: string;
  owningProjectIdentifier: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  metadata?: { [key: string]: string | redacted.Redacted<string> | undefined };
  parameters?: { [key: string]: string | undefined };
  clientToken?: string;
}
export type NotebookId = string;
export interface CellInformation {}
export type CellOrder = CellInformation[];
export type NotebookStatus =
  | "ACTIVE"
  | "ARCHIVED"
  | "SYNC_IN_PROGRESS"
  | "SYNC_FAILED"
  | (string & {});
export type ComputeId = string;
export type PackageManager = "UV" | (string & {});
export interface PackageConfig {
  packageManager: PackageManager;
  packageSpecification?: string;
}
export interface EnvironmentConfig {
  imageVersion?: string;
  packageConfig?: PackageConfig;
}
export interface NotebookError {
  message: string;
}
export type GitConnectionId = string;
export type GitRepository = string | redacted.Redacted<string>;
export type GitBranch = string | redacted.Redacted<string>;
export type CommitHash = string;
export type FileName = string;
export type CommitMessage = string | redacted.Redacted<string>;
export interface GitMetadata {
  connectionId: string;
  repository: string | redacted.Redacted<string>;
  branch: string | redacted.Redacted<string>;
  commitHash: string;
  fileName?: string;
  committedAt?: Date;
  commitMessage?: string | redacted.Redacted<string>;
}
export interface CreateNotebookOutput {
  id: string;
  name: string | redacted.Redacted<string>;
  owningProjectId: string;
  domainId: string;
  cellOrder: CellInformation[];
  status: NotebookStatus;
  description?: string | redacted.Redacted<string>;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  lockedBy?: string;
  lockedAt?: Date;
  lockExpiresAt?: Date;
  computeId?: string;
  metadata?: { [key: string]: string | redacted.Redacted<string> | undefined };
  parameters?: { [key: string]: string | undefined };
  environmentConfiguration?: EnvironmentConfig;
  error?: NotebookError;
  gitMetadata?: GitMetadata;
}
export type ProjectProfileId = string;
export interface EnvironmentResolvedAccount {
  awsAccountId: string;
  regionName: string;
  sourceAccountPoolId?: string;
}
export interface EnvironmentConfigurationUserParameter {
  environmentId?: string;
  environmentResolvedAccount?: EnvironmentResolvedAccount;
  environmentConfigurationName?: string | redacted.Redacted<string>;
  environmentParameters?: EnvironmentParameter[];
}
export type EnvironmentConfigurationUserParametersList =
  EnvironmentConfigurationUserParameter[];
export type Member =
  | { userIdentifier: string; groupIdentifier?: never }
  | { userIdentifier?: never; groupIdentifier: string };
export type UserDesignation =
  | "PROJECT_OWNER"
  | "PROJECT_CONTRIBUTOR"
  | "PROJECT_CATALOG_VIEWER"
  | "PROJECT_CATALOG_CONSUMER"
  | "PROJECT_CATALOG_STEWARD"
  | (string & {});
export interface ProjectMembershipAssignment {
  member: Member;
  designation: UserDesignation;
}
export type ProjectMembershipAssignments = ProjectMembershipAssignment[];
export interface CreateProjectInput {
  domainIdentifier: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  resourceTags?: { [key: string]: string | undefined };
  glossaryTerms?: string[];
  domainUnitId?: string;
  projectProfileId?: string;
  userParameters?: EnvironmentConfigurationUserParameter[];
  projectCategory?: string;
  projectExecutionRole?: string;
  membershipAssignments?: ProjectMembershipAssignment[];
}
export type ProjectStatus =
  | "ACTIVE"
  | "DELETING"
  | "DELETE_FAILED"
  | "UPDATING"
  | "UPDATE_FAILED"
  | "MOVING"
  | (string & {});
export interface ProjectDeletionError {
  code?: string;
  message?: string;
}
export type FailureReasons = ProjectDeletionError[];
export type ResourceTagSource = "PROJECT" | "PROJECT_PROFILE" | (string & {});
export interface ResourceTag {
  key: string;
  value: string;
  source: ResourceTagSource;
}
export type ResourceTags = ResourceTag[];
export type OverallDeploymentStatus =
  | "PENDING_DEPLOYMENT"
  | "IN_PROGRESS"
  | "SUCCESSFUL"
  | "FAILED_VALIDATION"
  | "FAILED_DEPLOYMENT"
  | (string & {});
export type EnvironmentFailureReasonsList = EnvironmentError[];
export type EnvironmentFailureReasons = {
  [key: string]: EnvironmentError[] | undefined;
};
export interface EnvironmentDeploymentDetails {
  overallDeploymentStatus?: OverallDeploymentStatus;
  environmentFailureReasons?: { [key: string]: EnvironmentError[] | undefined };
}
export interface CreateProjectOutput {
  domainId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  projectStatus?: ProjectStatus;
  failureReasons?: ProjectDeletionError[];
  createdBy: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  resourceTags?: ResourceTag[];
  glossaryTerms?: string[];
  domainUnitId?: string;
  projectProfileId?: string;
  userParameters?: EnvironmentConfigurationUserParameter[];
  environmentDeploymentDetails?: EnvironmentDeploymentDetails;
  projectCategory?: string;
}
export interface CreateProjectMembershipInput {
  domainIdentifier: string;
  projectIdentifier: string;
  member: Member;
  designation: UserDesignation;
}
export interface CreateProjectMembershipOutput {}
export type ProjectProfileName = string | redacted.Redacted<string>;
export type Status = "ENABLED" | "DISABLED" | (string & {});
export interface ResourceTagParameter {
  key: string;
  value: string;
  isValueEditable: boolean;
}
export type ProjectResourceTagParameters = ResourceTagParameter[];
export type DeploymentMode = "ON_CREATE" | "ON_DEMAND" | (string & {});
export type ParameterStorePath = string;
export type EnvironmentConfigurationParameterName = string;
export interface EnvironmentConfigurationParameter {
  name?: string;
  value?: string;
  isEditable?: boolean;
}
export type EnvironmentConfigurationParametersList =
  EnvironmentConfigurationParameter[];
export interface EnvironmentConfigurationParametersDetails {
  ssmPath?: string;
  parameterOverrides?: EnvironmentConfigurationParameter[];
  resolvedParameters?: EnvironmentConfigurationParameter[];
}
export type AwsAccount =
  | { awsAccountId: string; awsAccountIdPath?: never }
  | { awsAccountId?: never; awsAccountIdPath: string };
export type AccountPoolList = string[];
export type RegionName = string;
export type Region =
  | { regionName: string; regionNamePath?: never }
  | { regionName?: never; regionNamePath: string };
export type DeploymentOrder = number;
export interface EnvironmentConfiguration {
  name: string | redacted.Redacted<string>;
  id?: string | redacted.Redacted<string>;
  environmentBlueprintId: string;
  description?: string | redacted.Redacted<string>;
  deploymentMode?: DeploymentMode;
  configurationParameters?: EnvironmentConfigurationParametersDetails;
  awsAccount?: AwsAccount;
  accountPools?: string[];
  awsRegion?: Region;
  deploymentOrder?: number;
}
export type EnvironmentConfigurationsList = EnvironmentConfiguration[];
export interface CreateProjectProfileInput {
  domainIdentifier: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  status?: Status;
  projectResourceTags?: ResourceTagParameter[];
  allowCustomProjectResourceTags?: boolean;
  projectResourceTagsDescription?: string | redacted.Redacted<string>;
  environmentConfigurations?: EnvironmentConfiguration[];
  domainUnitIdentifier?: string;
}
export interface CreateProjectProfileOutput {
  domainId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  status?: Status;
  projectResourceTags?: ResourceTagParameter[];
  allowCustomProjectResourceTags?: boolean;
  projectResourceTagsDescription?: string | redacted.Redacted<string>;
  environmentConfigurations?: EnvironmentConfiguration[];
  createdBy: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  domainUnitId?: string;
}
export type RuleName = string | redacted.Redacted<string>;
export interface DomainUnitTarget {
  domainUnitId: string;
  includeChildDomainUnits?: boolean;
}
export type RuleTarget = { domainUnitTarget: DomainUnitTarget };
export type RuleAction =
  | "CREATE_LISTING_CHANGE_SET"
  | "CREATE_SUBSCRIPTION_REQUEST"
  | (string & {});
export type RuleScopeSelectionMode = "ALL" | "SPECIFIC" | (string & {});
export type RuleAssetTypeList = string[];
export interface AssetTypesForRule {
  selectionMode: RuleScopeSelectionMode;
  specificAssetTypes?: string[];
}
export type RuleProjectIdentifierList = string[];
export interface ProjectsForRule {
  selectionMode: RuleScopeSelectionMode;
  specificProjects?: string[];
}
export interface RuleScope {
  assetType?: AssetTypesForRule;
  dataProduct?: boolean;
  project?: ProjectsForRule;
}
export interface MetadataFormReference {
  typeIdentifier: string;
  typeRevision: string;
}
export type RequiredMetadataFormList = MetadataFormReference[];
export interface MetadataFormEnforcementDetail {
  requiredMetadataForms?: MetadataFormReference[];
}
export type GlossaryTermIdentifiers = string[];
export interface GlossaryTermEnforcementDetail {
  requiredGlossaryTermIds?: string[];
}
export type RuleDetail =
  | {
      metadataFormEnforcementDetail: MetadataFormEnforcementDetail;
      glossaryTermEnforcementDetail?: never;
    }
  | {
      metadataFormEnforcementDetail?: never;
      glossaryTermEnforcementDetail: GlossaryTermEnforcementDetail;
    };
export interface CreateRuleInput {
  domainIdentifier: string;
  name: string | redacted.Redacted<string>;
  target: RuleTarget;
  action: RuleAction;
  scope: RuleScope;
  detail: RuleDetail;
  description?: string | redacted.Redacted<string>;
  clientToken?: string;
}
export type RuleId = string;
export type RuleType =
  | "METADATA_FORM_ENFORCEMENT"
  | "GLOSSARY_TERM_ENFORCEMENT"
  | (string & {});
export type RuleTargetType = "DOMAIN_UNIT" | (string & {});
export interface CreateRuleOutput {
  identifier: string;
  name: string | redacted.Redacted<string>;
  ruleType: RuleType;
  target: RuleTarget;
  action: RuleAction;
  scope: RuleScope;
  detail: RuleDetail;
  targetType?: RuleTargetType;
  description?: string | redacted.Redacted<string>;
  createdAt: Date;
  createdBy: string;
}
export type SubscriptionTargetId = string;
export interface ListingRevisionInput {
  identifier: string;
  revision: string;
}
export type GrantedEntityInput = { listing: ListingRevisionInput };
export interface AssetTargetNameMap {
  assetId: string;
  targetName: string;
}
export type AssetTargetNames = AssetTargetNameMap[];
export interface CreateSubscriptionGrantInput {
  domainIdentifier: string;
  environmentIdentifier: string;
  subscriptionTargetIdentifier?: string;
  grantedEntity: GrantedEntityInput;
  assetTargetNames?: AssetTargetNameMap[];
  clientToken?: string;
}
export type SubscriptionGrantId = string;
export interface ListingRevision {
  id: string;
  revision: string;
}
export type GrantedEntity = { listing: ListingRevision };
export type SubscriptionGrantOverallStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "GRANT_FAILED"
  | "REVOKE_FAILED"
  | "GRANT_AND_REVOKE_FAILED"
  | "COMPLETED"
  | "INACCESSIBLE"
  | (string & {});
export type SubscriptionGrantStatus =
  | "GRANT_PENDING"
  | "REVOKE_PENDING"
  | "GRANT_IN_PROGRESS"
  | "REVOKE_IN_PROGRESS"
  | "GRANTED"
  | "REVOKED"
  | "GRANT_FAILED"
  | "REVOKE_FAILED"
  | (string & {});
export interface FailureCause {
  message?: string;
}
export interface SubscribedAsset {
  assetId: string;
  assetRevision: string;
  status: SubscriptionGrantStatus;
  targetName?: string;
  failureCause?: FailureCause;
  grantedTimestamp?: Date;
  failureTimestamp?: Date;
  assetScope?: AssetScope;
  permissions?: Permissions;
}
export type SubscribedAssets = SubscribedAsset[];
export interface CreateSubscriptionGrantOutput {
  id: string;
  createdBy: string;
  updatedBy?: string;
  domainId: string;
  createdAt: Date;
  updatedAt: Date;
  environmentId?: string;
  subscriptionTargetId: string;
  grantedEntity: GrantedEntity;
  status: SubscriptionGrantOverallStatus;
  assets?: SubscribedAsset[];
  subscriptionId?: string;
}
export interface SubscribedProjectInput {
  identifier?: string;
}
export interface SubscribedUserInput {
  identifier?: string;
}
export interface SubscribedGroupInput {
  identifier?: string;
}
export interface SubscribedIamPrincipalInput {
  identifier?: string;
}
export type SubscribedPrincipalInput =
  | {
      project: SubscribedProjectInput;
      user?: never;
      group?: never;
      iam?: never;
    }
  | { project?: never; user: SubscribedUserInput; group?: never; iam?: never }
  | { project?: never; user?: never; group: SubscribedGroupInput; iam?: never }
  | {
      project?: never;
      user?: never;
      group?: never;
      iam: SubscribedIamPrincipalInput;
    };
export type SubscribedPrincipalInputs = SubscribedPrincipalInput[];
export interface SubscribedListingInput {
  identifier: string;
}
export type SubscribedListingInputs = SubscribedListingInput[];
export type MetadataFormInputs = FormInput[];
export interface CreateSubscriptionRequestInput {
  domainIdentifier: string;
  subscribedPrincipals: SubscribedPrincipalInput[];
  subscribedListings: SubscribedListingInput[];
  requestReason: string | redacted.Redacted<string>;
  clientToken?: string;
  metadataForms?: FormInput[];
  assetPermissions?: AssetPermission[];
  assetScopes?: AcceptedAssetScope[];
}
export interface CreateSubscriptionRequestOutput {
  id: string;
  createdBy: string;
  updatedBy?: string;
  domainId: string;
  status: SubscriptionRequestStatus;
  createdAt: Date;
  updatedAt: Date;
  requestReason: string | redacted.Redacted<string>;
  subscribedPrincipals: SubscribedPrincipal[];
  subscribedListings: SubscribedListing[];
  reviewerId?: string;
  decisionComment?: string | redacted.Redacted<string>;
  existingSubscriptionId?: string;
  metadataForms?: FormOutput[];
}
export type SubscriptionTargetName = string | redacted.Redacted<string>;
export interface SubscriptionTargetForm {
  formName: string;
  content: string;
}
export type SubscriptionTargetForms = SubscriptionTargetForm[];
export type AuthorizedPrincipalIdentifier = string;
export type AuthorizedPrincipalIdentifiers = string[];
export type IamRoleArn = string;
export type ApplicableAssetTypes = string[];
export type SubscriptionGrantCreationMode =
  | "AUTOMATIC"
  | "MANUAL"
  | (string & {});
export interface CreateSubscriptionTargetInput {
  domainIdentifier: string;
  environmentIdentifier: string;
  name: string | redacted.Redacted<string>;
  type: string;
  subscriptionTargetConfig: SubscriptionTargetForm[];
  authorizedPrincipals: string[];
  manageAccessRole: string;
  applicableAssetTypes: string[];
  provider?: string;
  clientToken?: string;
  subscriptionGrantCreationMode?: SubscriptionGrantCreationMode;
}
export interface CreateSubscriptionTargetOutput {
  id: string;
  authorizedPrincipals: string[];
  domainId: string;
  projectId: string;
  environmentId: string;
  name: string | redacted.Redacted<string>;
  type: string;
  createdBy: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt?: Date;
  manageAccessRole?: string;
  applicableAssetTypes: string[];
  subscriptionTargetConfig: SubscriptionTargetForm[];
  provider: string;
  subscriptionGrantCreationMode?: SubscriptionGrantCreationMode;
}
export type UserType =
  | "IAM_USER"
  | "IAM_ROLE"
  | "SSO_USER"
  | "IAM_ROLE_SESSION"
  | (string & {});
export interface CreateUserProfileInput {
  domainIdentifier: string;
  userIdentifier: string;
  userType?: UserType;
  sessionName?: string;
  clientToken?: string;
}
export type UserProfileType = "IAM" | "SSO" | (string & {});
export type UserProfileStatus =
  | "ASSIGNED"
  | "NOT_ASSIGNED"
  | "ACTIVATED"
  | "DEACTIVATED"
  | (string & {});
export interface CreateUserProfileOutput {
  domainId?: string;
  id?: string;
  type?: UserProfileType;
  status?: UserProfileStatus;
  details?: UserProfileDetails;
}
export interface DeleteAccountPoolInput {
  domainIdentifier: string;
  identifier: string;
}
export interface DeleteAccountPoolOutput {}
export interface DeleteAssetInput {
  domainIdentifier: string;
  identifier: string;
}
export interface DeleteAssetOutput {}
export interface DeleteAssetFilterInput {
  domainIdentifier: string;
  assetIdentifier: string;
  identifier: string;
}
export interface DeleteAssetFilterResponse {}
export interface DeleteAssetTypeInput {
  domainIdentifier: string;
  identifier: string;
}
export interface DeleteAssetTypeOutput {}
export interface DeleteConnectionInput {
  domainIdentifier: string;
  identifier: string;
}
export interface DeleteConnectionOutput {
  status?: string;
}
export interface DeleteDataExportConfigurationInput {
  domainIdentifier: string;
}
export interface DeleteDataExportConfigurationOutput {}
export interface DeleteDataProductInput {
  domainIdentifier: string;
  identifier: string;
}
export interface DeleteDataProductOutput {}
export interface DeleteDataSourceInput {
  domainIdentifier: string;
  identifier: string;
  clientToken?: string;
  retainPermissionsOnRevokeFailure?: boolean;
}
export type SelfGrantStatus =
  | "GRANT_PENDING"
  | "REVOKE_PENDING"
  | "GRANT_IN_PROGRESS"
  | "REVOKE_IN_PROGRESS"
  | "GRANTED"
  | "GRANT_FAILED"
  | "REVOKE_FAILED"
  | (string & {});
export interface SelfGrantStatusDetail {
  databaseName: string;
  schemaName?: string;
  status: SelfGrantStatus;
  failureCause?: string;
}
export type SelfGrantStatusDetails = SelfGrantStatusDetail[];
export interface GlueSelfGrantStatusOutput {
  selfGrantStatusDetails: SelfGrantStatusDetail[];
}
export interface RedshiftSelfGrantStatusOutput {
  selfGrantStatusDetails: SelfGrantStatusDetail[];
}
export type SelfGrantStatusOutput =
  | {
      glueSelfGrantStatus: GlueSelfGrantStatusOutput;
      redshiftSelfGrantStatus?: never;
    }
  | {
      glueSelfGrantStatus?: never;
      redshiftSelfGrantStatus: RedshiftSelfGrantStatusOutput;
    };
export interface DeleteDataSourceOutput {
  id: string;
  status?: DataSourceStatus;
  type?: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  domainId: string;
  projectId: string;
  environmentId?: string;
  connectionId?: string;
  configuration?: DataSourceConfigurationOutput;
  enableSetting?: EnableSetting;
  publishOnImport?: boolean;
  assetFormsOutput?: FormOutput[];
  schedule?: ScheduleConfiguration;
  lastRunStatus?: DataSourceRunStatus;
  lastRunAt?: Date;
  lastRunErrorMessage?: DataSourceErrorMessage;
  errorMessage?: DataSourceErrorMessage;
  createdAt?: Date;
  updatedAt?: Date;
  selfGrantStatus?: SelfGrantStatusOutput;
  retainPermissionsOnRevokeFailure?: boolean;
}
export interface DeleteDomainInput {
  identifier: string;
  clientToken?: string;
  skipDeletionCheck?: boolean;
  cascadeDelete?: boolean;
}
export interface DeleteDomainOutput {
  status: DomainStatus;
}
export interface DeleteDomainUnitInput {
  domainIdentifier: string;
  identifier: string;
}
export interface DeleteDomainUnitOutput {}
export interface DeleteEnvironmentInput {
  domainIdentifier: string;
  identifier: string;
}
export interface DeleteEnvironmentResponse {}
export interface DeleteEnvironmentActionInput {
  domainIdentifier: string;
  environmentIdentifier: string;
  identifier: string;
}
export interface DeleteEnvironmentActionResponse {}
export interface DeleteEnvironmentBlueprintInput {
  domainIdentifier: string;
  identifier: string;
}
export interface DeleteEnvironmentBlueprintResponse {}
export interface DeleteEnvironmentBlueprintConfigurationInput {
  domainIdentifier: string;
  environmentBlueprintIdentifier: string;
}
export interface DeleteEnvironmentBlueprintConfigurationOutput {}
export interface DeleteEnvironmentProfileInput {
  domainIdentifier: string;
  identifier: string;
}
export interface DeleteEnvironmentProfileResponse {}
export interface DeleteFormTypeInput {
  domainIdentifier: string;
  formTypeIdentifier: string;
}
export interface DeleteFormTypeOutput {}
export interface DeleteGlossaryInput {
  domainIdentifier: string;
  identifier: string;
}
export interface DeleteGlossaryOutput {}
export interface DeleteGlossaryTermInput {
  domainIdentifier: string;
  identifier: string;
}
export interface DeleteGlossaryTermOutput {}
export type LineageEventIdentifier = string;
export interface DeleteLineageEventInput {
  domainIdentifier: string;
  identifier: string;
}
export type LineageEventProcessingStatus =
  | "REQUESTED"
  | "PROCESSING"
  | "SUCCESS"
  | "FAILED"
  | (string & {});
export interface DeleteLineageEventOutput {
  id?: string;
  domainId?: string;
  processingStatus?: LineageEventProcessingStatus;
}
export interface DeleteListingInput {
  domainIdentifier: string;
  identifier: string;
}
export interface DeleteListingOutput {}
export interface DeleteNotebookInput {
  domainIdentifier: string;
  identifier: string;
}
export interface DeleteNotebookOutput {}
export interface DeleteProjectInput {
  domainIdentifier: string;
  identifier: string;
  skipDeletionCheck?: boolean;
}
export interface DeleteProjectOutput {}
export interface DeleteProjectMembershipInput {
  domainIdentifier: string;
  projectIdentifier: string;
  member: Member;
}
export interface DeleteProjectMembershipOutput {}
export interface DeleteProjectProfileInput {
  domainIdentifier: string;
  identifier: string;
}
export interface DeleteProjectProfileOutput {}
export interface DeleteRuleInput {
  domainIdentifier: string;
  identifier: string;
}
export interface DeleteRuleOutput {}
export interface DeleteSubscriptionGrantInput {
  domainIdentifier: string;
  identifier: string;
}
export interface DeleteSubscriptionGrantOutput {
  id: string;
  createdBy: string;
  updatedBy?: string;
  domainId: string;
  createdAt: Date;
  updatedAt: Date;
  environmentId?: string;
  subscriptionTargetId: string;
  grantedEntity: GrantedEntity;
  status: SubscriptionGrantOverallStatus;
  assets?: SubscribedAsset[];
  subscriptionId?: string;
}
export interface DeleteSubscriptionRequestInput {
  domainIdentifier: string;
  identifier: string;
}
export interface DeleteSubscriptionRequestResponse {}
export interface DeleteSubscriptionTargetInput {
  domainIdentifier: string;
  environmentIdentifier: string;
  identifier: string;
}
export interface DeleteSubscriptionTargetResponse {}
export type TimeSeriesEntityType = "ASSET" | "LISTING" | (string & {});
export interface DeleteTimeSeriesDataPointsInput {
  domainIdentifier: string;
  entityIdentifier: string;
  entityType: TimeSeriesEntityType;
  formName: string;
  clientToken?: string;
}
export interface DeleteTimeSeriesDataPointsOutput {}
export interface DisassociateEnvironmentRoleInput {
  domainIdentifier: string;
  environmentIdentifier: string;
  environmentRoleArn: string;
}
export interface DisassociateEnvironmentRoleOutput {}
export interface DisassociateGovernedTermsInput {
  domainIdentifier: string;
  entityIdentifier: string;
  entityType: GovernedEntityType;
  governedGlossaryTerms: string[];
}
export interface DisassociateGovernedTermsOutput {}
export interface GetAccountPoolInput {
  domainIdentifier: string;
  identifier: string;
}
export interface GetAccountPoolOutput {
  domainId?: string;
  name?: string | redacted.Redacted<string>;
  id?: string;
  description?: string | redacted.Redacted<string>;
  resolutionStrategy?: ResolutionStrategy;
  accountSource: AccountSource;
  createdBy: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  updatedBy?: string;
  domainUnitId?: string;
}
export interface GetAssetInput {
  domainIdentifier: string;
  identifier: string;
  revision?: string;
}
export interface GetAssetOutput {
  id: string;
  name: string | redacted.Redacted<string>;
  typeIdentifier: string;
  typeRevision: string;
  externalIdentifier?: string;
  revision: string;
  description?: string | redacted.Redacted<string>;
  createdAt?: Date;
  createdBy?: string;
  firstRevisionCreatedAt?: Date;
  firstRevisionCreatedBy?: string;
  glossaryTerms?: string[];
  governedGlossaryTerms?: string[];
  owningProjectId: string;
  domainId: string;
  listing?: AssetListingDetails;
  formsOutput: FormOutput[];
  readOnlyFormsOutput?: FormOutput[];
  latestTimeSeriesDataPointFormsOutput?: TimeSeriesDataPointSummaryFormOutput[];
}
export interface GetAssetFilterInput {
  domainIdentifier: string;
  assetIdentifier: string;
  identifier: string;
}
export interface GetAssetFilterOutput {
  id: string;
  domainId: string;
  assetId: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  status?: FilterStatus;
  configuration: AssetFilterConfiguration;
  createdAt?: Date;
  errorMessage?: string;
  effectiveColumnNames?: string[];
  effectiveRowFilter?: string;
}
export interface GetAssetTypeInput {
  domainIdentifier: string;
  identifier: string;
  revision?: string;
}
export interface GetAssetTypeOutput {
  domainId: string;
  name: string;
  revision: string;
  description?: string | redacted.Redacted<string>;
  formsOutput: { [key: string]: FormEntryOutput | undefined };
  owningProjectId: string;
  originDomainId?: string;
  originProjectId?: string;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export interface GetConnectionInput {
  domainIdentifier: string;
  identifier: string;
  withSecret?: boolean;
}
export interface ConnectionCredentials {
  accessKeyId?: string;
  secretAccessKey?: string | redacted.Redacted<string>;
  sessionToken?: string | redacted.Redacted<string>;
  expiration?: Date;
}
export interface GetConnectionOutput {
  connectionCredentials?: ConnectionCredentials;
  configurations?: Configuration[];
  connectionId: string;
  description?: string | redacted.Redacted<string>;
  domainId: string;
  domainUnitId: string;
  environmentId?: string;
  environmentUserRole?: string;
  name: string;
  physicalEndpoints: PhysicalEndpoint[];
  projectId?: string;
  props?: ConnectionPropertiesOutput;
  type: ConnectionType;
  scope?: ConnectionScope;
}
export interface GetDataExportConfigurationInput {
  domainIdentifier: string;
}
export type ConfigurationStatus = "COMPLETED" | "FAILED" | (string & {});
export interface EncryptionConfiguration {
  kmsKeyArn?: string;
  sseAlgorithm?: string;
}
export interface GetDataExportConfigurationOutput {
  isExportEnabled?: boolean;
  status?: ConfigurationStatus;
  encryptionConfiguration?: EncryptionConfiguration;
  s3TableBucketArn?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface GetDataProductInput {
  domainIdentifier: string;
  identifier: string;
  revision?: string;
}
export interface GetDataProductOutput {
  domainId: string;
  id: string;
  revision: string;
  owningProjectId: string;
  name: string | redacted.Redacted<string>;
  status: DataProductStatus;
  description?: string | redacted.Redacted<string>;
  glossaryTerms?: string[];
  items?: DataProductItem[];
  formsOutput?: FormOutput[];
  createdAt?: Date;
  createdBy?: string;
  firstRevisionCreatedAt?: Date;
  firstRevisionCreatedBy?: string;
}
export interface GetDataSourceInput {
  domainIdentifier: string;
  identifier: string;
}
export interface GetDataSourceOutput {
  id: string;
  status?: DataSourceStatus;
  type?: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  domainId: string;
  projectId: string;
  environmentId?: string;
  connectionId?: string;
  configuration?: DataSourceConfigurationOutput;
  recommendation?: RecommendationConfiguration;
  enableSetting?: EnableSetting;
  publishOnImport?: boolean;
  assetFormsOutput?: FormOutput[];
  schedule?: ScheduleConfiguration;
  lastRunStatus?: DataSourceRunStatus;
  lastRunAt?: Date;
  lastRunErrorMessage?: DataSourceErrorMessage;
  lastRunAssetCount?: number;
  errorMessage?: DataSourceErrorMessage;
  createdAt?: Date;
  updatedAt?: Date;
  selfGrantStatus?: SelfGrantStatusOutput;
}
export type DataSourceRunId = string;
export interface GetDataSourceRunInput {
  domainIdentifier: string;
  identifier: string;
}
export type DataSourceRunType = "PRIORITIZED" | "SCHEDULED" | (string & {});
export interface RunStatisticsForAssets {
  added?: number;
  updated?: number;
  unchanged?: number;
  skipped?: number;
  failed?: number;
}
export type LineageImportStatus =
  | "IN_PROGRESS"
  | "SUCCESS"
  | "FAILED"
  | "PARTIALLY_SUCCEEDED"
  | (string & {});
export interface DataSourceRunLineageSummary {
  importStatus?: LineageImportStatus;
}
export interface GetDataSourceRunOutput {
  domainId: string;
  dataSourceId: string;
  id: string;
  projectId: string;
  status: DataSourceRunStatus;
  type: DataSourceRunType;
  dataSourceConfigurationSnapshot?: string;
  runStatisticsForAssets?: RunStatisticsForAssets;
  lineageSummary?: DataSourceRunLineageSummary;
  errorMessage?: DataSourceErrorMessage;
  createdAt: Date;
  updatedAt: Date;
  startedAt?: Date;
  stoppedAt?: Date;
}
export interface GetDomainInput {
  identifier: string;
}
export interface FailureReason {
  id?: string;
  message?: string;
}
export type FailureReasonsList = FailureReason[];
export interface DeleteProgress {
  successfullyDeletedProjectCount?: number;
}
export interface GetDomainOutput {
  id: string;
  rootDomainUnitId?: string;
  name?: string;
  description?: string;
  singleSignOn?: SingleSignOn;
  domainExecutionRole: string;
  arn?: string;
  kmsKeyIdentifier?: string;
  status: DomainStatus;
  portalUrl?: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  tags?: { [key: string]: string | undefined };
  domainVersion?: DomainVersion;
  serviceRole?: string;
  failureReasons?: FailureReason[];
  deleteProgress?: DeleteProgress;
}
export interface GetDomainUnitInput {
  domainIdentifier: string;
  identifier: string;
}
export interface GetDomainUnitOutput {
  id: string;
  domainId: string;
  name: string | redacted.Redacted<string>;
  parentDomainUnitId?: string;
  description?: string | redacted.Redacted<string>;
  owners: DomainUnitOwnerProperties[];
  createdAt?: Date;
  lastUpdatedAt?: Date;
  createdBy?: string;
  lastUpdatedBy?: string;
}
export interface GetEnvironmentInput {
  domainIdentifier: string;
  identifier: string;
}
export interface GetEnvironmentOutput {
  projectId: string;
  id?: string;
  domainId: string;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  environmentProfileId?: string;
  awsAccountId?: string;
  awsAccountRegion?: string;
  provider: string;
  provisionedResources?: Resource[];
  status?: EnvironmentStatus;
  environmentActions?: ConfigurableEnvironmentAction[];
  glossaryTerms?: string[];
  userParameters?: CustomParameter[];
  lastDeployment?: Deployment;
  provisioningProperties?: ProvisioningProperties;
  deploymentProperties?: DeploymentProperties;
  environmentBlueprintId?: string;
  environmentConfigurationId?: string | redacted.Redacted<string>;
  environmentConfigurationName?: string | redacted.Redacted<string>;
}
export interface GetEnvironmentActionInput {
  domainIdentifier: string;
  environmentIdentifier: string;
  identifier: string;
}
export interface GetEnvironmentActionOutput {
  domainId: string;
  environmentId: string;
  id: string;
  name: string;
  parameters: ActionParameters;
  description?: string;
}
export interface GetEnvironmentBlueprintInput {
  domainIdentifier: string;
  identifier: string;
}
export interface GetEnvironmentBlueprintOutput {
  id: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  provider: string;
  provisioningProperties: ProvisioningProperties;
  deploymentProperties?: DeploymentProperties;
  userParameters?: CustomParameter[];
  glossaryTerms?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
export interface GetEnvironmentBlueprintConfigurationInput {
  domainIdentifier: string;
  environmentBlueprintIdentifier: string;
}
export type PolicyArn = string;
export type EnabledRegionList = string[];
export type RegionalParameter = { [key: string]: string | undefined };
export type RegionalParameterMap = {
  [key: string]: { [key: string]: string | undefined } | undefined;
};
export type ResourceConfigurationParameterMap = {
  [key: string]: string | undefined;
};
export interface ResourceConfiguration {
  identifier: string;
  name: string;
  description?: string;
  region: string;
  parameters: { [key: string]: string | undefined };
}
export type ResourceConfigurations = ResourceConfiguration[];
export type S3Location = string;
export type S3LocationList = string[];
export interface LakeFormationConfiguration {
  locationRegistrationRole?: string;
  locationRegistrationExcludeS3Locations?: string[];
}
export type ProvisioningConfiguration = {
  lakeFormationConfiguration: LakeFormationConfiguration;
};
export type ProvisioningConfigurationList = ProvisioningConfiguration[];
export interface GetEnvironmentBlueprintConfigurationOutput {
  domainId: string;
  environmentBlueprintId: string;
  provisioningRoleArn?: string;
  environmentRolePermissionBoundary?: string;
  manageAccessRoleArn?: string;
  enabledRegions?: string[];
  regionalParameters?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
  allowUserProvidedConfigurations?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  resourceConfigurations?: ResourceConfiguration[];
  provisioningConfigurations?: ProvisioningConfiguration[];
}
export interface GetEnvironmentCredentialsInput {
  domainIdentifier: string;
  environmentIdentifier: string;
}
export interface GetEnvironmentCredentialsOutput {
  accessKeyId?: string;
  secretAccessKey?: string | redacted.Redacted<string>;
  sessionToken?: string | redacted.Redacted<string>;
  expiration?: Date;
}
export interface GetEnvironmentProfileInput {
  domainIdentifier: string;
  identifier: string;
}
export interface GetEnvironmentProfileOutput {
  id: string;
  domainId: string;
  awsAccountId?: string;
  awsAccountRegion?: string;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  environmentBlueprintId: string;
  projectId?: string;
  userParameters?: CustomParameter[];
}
export interface GetFormTypeInput {
  domainIdentifier: string;
  formTypeIdentifier: string;
  revision?: string;
}
export interface Import {
  name: string | redacted.Redacted<string>;
  revision: string;
}
export type ImportList = Import[];
export interface GetFormTypeOutput {
  domainId: string;
  name: string | redacted.Redacted<string>;
  revision: string;
  model: Model;
  owningProjectId?: string;
  originDomainId?: string;
  originProjectId?: string;
  status?: FormTypeStatus;
  createdAt?: Date;
  createdBy?: string;
  description?: string | redacted.Redacted<string>;
  imports?: Import[];
}
export interface GetGlossaryInput {
  domainIdentifier: string;
  identifier: string;
}
export interface GetGlossaryOutput {
  domainId: string;
  id: string;
  owningProjectId: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  status: GlossaryStatus;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  usageRestrictions?: GlossaryUsageRestriction[];
}
export interface GetGlossaryTermInput {
  domainIdentifier: string;
  identifier: string;
}
export interface GetGlossaryTermOutput {
  domainId: string;
  glossaryId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  shortDescription?: string | redacted.Redacted<string>;
  longDescription?: string | redacted.Redacted<string>;
  termRelations?: TermRelations;
  status: GlossaryTermStatus;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  usageRestrictions?: GlossaryUsageRestriction[];
}
export interface GetGroupProfileInput {
  domainIdentifier: string;
  groupIdentifier: string;
}
export interface GetGroupProfileOutput {
  domainId?: string;
  id?: string;
  status?: GroupProfileStatus;
  groupName?: string | redacted.Redacted<string>;
  rolePrincipalArn?: string;
  rolePrincipalId?: string;
}
export interface GetIamPortalLoginUrlInput {
  domainIdentifier: string;
}
export interface GetIamPortalLoginUrlOutput {
  authCodeUrl?: string;
  userProfileId: string;
}
export type RunIdentifier = string;
export interface GetJobRunInput {
  domainIdentifier: string;
  identifier: string;
}
export type JobType = "LINEAGE" | (string & {});
export type JobRunMode = "SCHEDULED" | "ON_DEMAND" | (string & {});
export type FailedQueryProcessingErrorMessages = string[];
export interface LineageSqlQueryRunDetails {
  queryStartTime?: Date;
  queryEndTime?: Date;
  totalQueriesProcessed?: number;
  numQueriesFailed?: number;
  errorMessages?: string[];
}
export interface LineageRunDetails {
  sqlQueryRunDetails?: LineageSqlQueryRunDetails;
}
export type JobRunDetails = { lineageRunDetails: LineageRunDetails };
export type JobRunStatus =
  | "SCHEDULED"
  | "IN_PROGRESS"
  | "SUCCESS"
  | "PARTIALLY_SUCCEEDED"
  | "FAILED"
  | "ABORTED"
  | "TIMED_OUT"
  | "CANCELED"
  | (string & {});
export interface JobRunError {
  message: string;
}
export interface GetJobRunOutput {
  domainId?: string;
  id?: string;
  jobId?: string;
  jobType?: JobType;
  runMode?: JobRunMode;
  details?: JobRunDetails;
  status?: JobRunStatus;
  error?: JobRunError;
  createdBy?: string;
  createdAt?: Date;
  startTime?: Date;
  endTime?: Date;
}
export interface GetLineageEventInput {
  domainIdentifier: string;
  identifier: string;
}
export interface GetLineageEventOutput {
  domainId?: string;
  id?: string;
  event?: T.StreamingOutputBody;
  createdBy?: string;
  processingStatus?: LineageEventProcessingStatus;
  eventTime?: Date;
  createdAt?: Date;
}
export type LineageNodeIdentifier = string;
export interface GetLineageNodeInput {
  domainIdentifier: string;
  identifier: string;
  eventTimestamp?: Date;
}
export type LineageNodeId = string;
export interface LineageNodeReference {
  id?: string;
  eventTimestamp?: Date;
}
export type LineageNodeReferenceList = LineageNodeReference[];
export interface GetLineageNodeOutput {
  domainId: string;
  name?: string;
  description?: string;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  id: string;
  typeName: string;
  typeRevision?: string;
  sourceIdentifier?: string;
  eventTimestamp?: Date;
  formsOutput?: FormOutput[];
  upstreamNodes?: LineageNodeReference[];
  downstreamNodes?: LineageNodeReference[];
}
export interface GetListingInput {
  domainIdentifier: string;
  identifier: string;
  listingRevision?: string;
}
export interface AssetListing {
  assetId?: string;
  assetRevision?: string;
  assetType?: string;
  createdAt?: Date;
  forms?: string;
  latestTimeSeriesDataPointForms?: TimeSeriesDataPointSummaryFormOutput[];
  glossaryTerms?: DetailedGlossaryTerm[];
  governedGlossaryTerms?: DetailedGlossaryTerm[];
  owningProjectId?: string;
}
export interface ListingSummary {
  listingId?: string;
  listingRevision?: string;
  glossaryTerms?: DetailedGlossaryTerm[];
}
export type ListingSummaries = ListingSummary[];
export interface DataProductListing {
  dataProductId?: string;
  dataProductRevision?: string;
  createdAt?: Date;
  forms?: string;
  glossaryTerms?: DetailedGlossaryTerm[];
  owningProjectId?: string;
  items?: ListingSummary[];
}
export type ListingItem =
  | { assetListing: AssetListing; dataProductListing?: never }
  | { assetListing?: never; dataProductListing: DataProductListing };
export interface GetListingOutput {
  domainId: string;
  id: string;
  listingRevision: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  item?: ListingItem;
  name?: string;
  description?: string | redacted.Redacted<string>;
  status?: ListingStatus;
}
export type MetadataGenerationRunType =
  | "BUSINESS_DESCRIPTIONS"
  | "BUSINESS_NAMES"
  | "BUSINESS_GLOSSARY_ASSOCIATIONS"
  | (string & {});
export interface GetMetadataGenerationRunInput {
  domainIdentifier: string;
  identifier: string;
  type?: MetadataGenerationRunType;
}
export type MetadataGenerationTargetType = "ASSET" | (string & {});
export interface MetadataGenerationRunTarget {
  type: MetadataGenerationTargetType;
  identifier: string;
  revision?: string;
}
export type MetadataGenerationRunStatus =
  | "SUBMITTED"
  | "IN_PROGRESS"
  | "CANCELED"
  | "SUCCEEDED"
  | "FAILED"
  | "PARTIALLY_SUCCEEDED"
  | (string & {});
export type MetadataGenerationRunTypes = MetadataGenerationRunType[];
export interface MetadataGenerationRunTypeStat {
  type: MetadataGenerationRunType;
  status: MetadataGenerationRunStatus;
  errorMessage?: string;
}
export type MetadataGenerationRunTypeStats = MetadataGenerationRunTypeStat[];
export interface GetMetadataGenerationRunOutput {
  domainId: string;
  id: string;
  target?: MetadataGenerationRunTarget;
  status?: MetadataGenerationRunStatus;
  type?: MetadataGenerationRunType;
  types?: MetadataGenerationRunType[];
  createdAt?: Date;
  createdBy?: string;
  owningProjectId: string;
  typeStats?: MetadataGenerationRunTypeStat[];
}
export interface GetNotebookInput {
  domainIdentifier: string;
  identifier: string;
}
export interface GetNotebookOutput {
  id: string;
  name: string | redacted.Redacted<string>;
  owningProjectId: string;
  domainId: string;
  cellOrder: CellInformation[];
  status: NotebookStatus;
  description?: string | redacted.Redacted<string>;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  lockedBy?: string;
  lockedAt?: Date;
  lockExpiresAt?: Date;
  computeId?: string;
  metadata?: { [key: string]: string | redacted.Redacted<string> | undefined };
  parameters?: { [key: string]: string | undefined };
  environmentConfiguration?: EnvironmentConfig;
  error?: NotebookError;
  gitMetadata?: GitMetadata;
}
export type ExportId = string;
export interface GetNotebookExportInput {
  domainIdentifier: string;
  identifier: string;
}
export type FileFormat = "PDF" | "IPYNB" | (string & {});
export type NotebookExportStatus =
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export type NotebookS3Uri = string | redacted.Redacted<string>;
export interface S3Destination {
  uri?: string | redacted.Redacted<string>;
}
export type OutputLocation = { s3: S3Destination };
export interface NotebookExportError {
  message: string;
}
export type CompletedAt = Date;
export interface GetNotebookExportOutput {
  id: string;
  domainId: string;
  owningProjectId: string;
  notebookId: string;
  fileFormat: FileFormat;
  status: NotebookExportStatus;
  outputLocation?: OutputLocation;
  error?: NotebookExportError;
  completedAt?: Date;
  createdAt?: Date;
  createdBy?: string;
}
export type NotebookRunId = string;
export interface GetNotebookRunInput {
  domainIdentifier: string;
  identifier: string;
}
export type ScheduleId = string;
export type NotebookRunStatus =
  | "QUEUED"
  | "STARTING"
  | "RUNNING"
  | "STOPPING"
  | "STOPPED"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export type InstanceType = string;
export interface ComputeConfig {
  instanceType?: string;
  environmentVersion?: string;
}
export type NetworkAccessType =
  | "PUBLIC_INTERNET_ONLY"
  | "VPC_ONLY"
  | (string & {});
export type SubnetIds = string[];
export type SecurityGroupIds = string[];
export interface NetworkConfig {
  networkAccessType: NetworkAccessType;
  vpcId?: string;
  subnetIds?: string[];
  securityGroupIds?: string[];
}
export interface TimeoutConfig {
  runTimeoutInMinutes?: number;
}
export type S3Path = string;
export interface StorageConfig {
  projectS3Path?: string;
  kmsKeyArn?: string;
}
export type TriggerSourceType =
  | "MANUAL"
  | "SCHEDULED"
  | "WORKFLOW"
  | (string & {});
export interface TriggerSource {
  type?: TriggerSourceType;
  name?: string;
}
export interface NotebookRunError {
  message: string;
}
export interface GetNotebookRunOutput {
  id: string;
  domainId: string;
  owningProjectId: string;
  notebookId: string;
  scheduleId?: string;
  status: NotebookRunStatus;
  cellOrder?: CellInformation[];
  metadata?: { [key: string]: string | redacted.Redacted<string> | undefined };
  parameters?: { [key: string]: string | undefined };
  computeConfiguration?: ComputeConfig;
  networkConfiguration?: NetworkConfig;
  timeoutConfiguration?: TimeoutConfig;
  environmentConfiguration?: EnvironmentConfig;
  storageConfiguration?: StorageConfig;
  triggerSource?: TriggerSource;
  error?: NotebookRunError;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  startedAt?: Date;
  completedAt?: Date;
}
export interface GetProjectInput {
  domainIdentifier: string;
  identifier: string;
}
export interface GetProjectOutput {
  domainId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  projectStatus?: ProjectStatus;
  failureReasons?: ProjectDeletionError[];
  createdBy: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  resourceTags?: ResourceTag[];
  glossaryTerms?: string[];
  domainUnitId?: string;
  projectProfileId?: string;
  userParameters?: EnvironmentConfigurationUserParameter[];
  environmentDeploymentDetails?: EnvironmentDeploymentDetails;
  projectCategory?: string;
}
export interface GetProjectProfileInput {
  domainIdentifier: string;
  identifier: string;
}
export interface GetProjectProfileOutput {
  domainId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  status?: Status;
  projectResourceTags?: ResourceTagParameter[];
  allowCustomProjectResourceTags?: boolean;
  projectResourceTagsDescription?: string | redacted.Redacted<string>;
  environmentConfigurations?: EnvironmentConfiguration[];
  createdBy: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  domainUnitId?: string;
}
export interface GetRuleInput {
  domainIdentifier: string;
  identifier: string;
  revision?: string;
}
export interface GetRuleOutput {
  identifier: string;
  revision: string;
  name: string | redacted.Redacted<string>;
  ruleType: RuleType;
  target: RuleTarget;
  action: RuleAction;
  scope: RuleScope;
  detail: RuleDetail;
  targetType?: RuleTargetType;
  description?: string | redacted.Redacted<string>;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  lastUpdatedBy: string;
}
export interface GetSubscriptionInput {
  domainIdentifier: string;
  identifier: string;
}
export interface GetSubscriptionOutput {
  id: string;
  createdBy: string;
  updatedBy?: string;
  domainId: string;
  status: SubscriptionStatus;
  createdAt: Date;
  updatedAt: Date;
  subscribedPrincipal: SubscribedPrincipal;
  subscribedListing: SubscribedListing;
  subscriptionRequestId?: string;
  retainPermissions?: boolean;
}
export interface GetSubscriptionGrantInput {
  domainIdentifier: string;
  identifier: string;
}
export interface GetSubscriptionGrantOutput {
  id: string;
  createdBy: string;
  updatedBy?: string;
  domainId: string;
  createdAt: Date;
  updatedAt: Date;
  environmentId?: string;
  subscriptionTargetId: string;
  grantedEntity: GrantedEntity;
  status: SubscriptionGrantOverallStatus;
  assets?: SubscribedAsset[];
  subscriptionId?: string;
}
export interface GetSubscriptionRequestDetailsInput {
  domainIdentifier: string;
  identifier: string;
}
export interface GetSubscriptionRequestDetailsOutput {
  id: string;
  createdBy: string;
  updatedBy?: string;
  domainId: string;
  status: SubscriptionRequestStatus;
  createdAt: Date;
  updatedAt: Date;
  requestReason: string | redacted.Redacted<string>;
  subscribedPrincipals: SubscribedPrincipal[];
  subscribedListings: SubscribedListing[];
  reviewerId?: string;
  decisionComment?: string | redacted.Redacted<string>;
  existingSubscriptionId?: string;
  metadataForms?: FormOutput[];
}
export interface GetSubscriptionTargetInput {
  domainIdentifier: string;
  environmentIdentifier: string;
  identifier: string;
}
export interface GetSubscriptionTargetOutput {
  id: string;
  authorizedPrincipals: string[];
  domainId: string;
  projectId: string;
  environmentId: string;
  name: string | redacted.Redacted<string>;
  type: string;
  createdBy: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt?: Date;
  manageAccessRole?: string;
  applicableAssetTypes: string[];
  subscriptionTargetConfig: SubscriptionTargetForm[];
  provider: string;
  subscriptionGrantCreationMode?: SubscriptionGrantCreationMode;
}
export type TimeSeriesDataPointIdentifier = string;
export interface GetTimeSeriesDataPointInput {
  domainIdentifier: string;
  entityIdentifier: string;
  entityType: TimeSeriesEntityType;
  identifier: string;
  formName: string;
}
export interface TimeSeriesDataPointFormOutput {
  formName: string;
  typeIdentifier: string;
  typeRevision?: string;
  timestamp: Date;
  content?: string;
  id?: string;
}
export interface GetTimeSeriesDataPointOutput {
  domainId?: string;
  entityId?: string;
  entityType?: TimeSeriesEntityType;
  formName?: string;
  form?: TimeSeriesDataPointFormOutput;
}
export interface GetUserProfileInput {
  domainIdentifier: string;
  userIdentifier: string;
  type?: UserProfileType;
  sessionName?: string;
}
export interface GetUserProfileOutput {
  domainId?: string;
  id?: string;
  type?: UserProfileType;
  status?: UserProfileStatus;
  details?: UserProfileDetails;
}
export type SortFieldAccountPool = "NAME" | (string & {});
export type SortOrder = "ASCENDING" | "DESCENDING" | (string & {});
export type PaginationToken = string;
export type MaxResults = number;
export interface ListAccountPoolsInput {
  domainIdentifier: string;
  name?: string | redacted.Redacted<string>;
  sortBy?: SortFieldAccountPool;
  sortOrder?: SortOrder;
  nextToken?: string;
  maxResults?: number;
}
export interface AccountPoolSummary {
  domainId?: string;
  id?: string;
  name?: string | redacted.Redacted<string>;
  resolutionStrategy?: ResolutionStrategy;
  domainUnitId?: string;
  createdBy?: string;
  updatedBy?: string;
}
export type AccountPoolSummaries = AccountPoolSummary[];
export interface ListAccountPoolsOutput {
  items?: AccountPoolSummary[];
  nextToken?: string;
}
export interface ListAccountsInAccountPoolInput {
  domainIdentifier: string;
  identifier: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ListAccountsInAccountPoolOutput {
  items?: AccountInfo[];
  nextToken?: string;
}
export interface ListAssetFiltersInput {
  domainIdentifier: string;
  assetIdentifier: string;
  status?: FilterStatus;
  nextToken?: string;
  maxResults?: number;
}
export interface AssetFilterSummary {
  id: string;
  domainId: string;
  assetId: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  status?: FilterStatus;
  effectiveColumnNames?: string[];
  effectiveRowFilter?: string;
  createdAt?: Date;
  errorMessage?: string;
}
export type AssetFilters = AssetFilterSummary[];
export interface ListAssetFiltersOutput {
  items: AssetFilterSummary[];
  nextToken?: string;
}
export interface ListAssetRevisionsInput {
  domainIdentifier: string;
  identifier: string;
  nextToken?: string;
  maxResults?: number;
}
export interface AssetRevision {
  domainId?: string;
  id?: string;
  revision?: string;
  createdBy?: string;
  createdAt?: Date;
}
export type AssetRevisions = AssetRevision[];
export interface ListAssetRevisionsOutput {
  items?: AssetRevision[];
  nextToken?: string;
}
export type SortFieldConnection = "NAME" | (string & {});
export interface ListConnectionsInput {
  domainIdentifier: string;
  maxResults?: number;
  nextToken?: string;
  sortBy?: SortFieldConnection;
  sortOrder?: SortOrder;
  name?: string;
  environmentIdentifier?: string;
  projectIdentifier?: string;
  type?: ConnectionType;
  scope?: ConnectionScope;
}
export interface ConnectionSummary {
  configurations?: Configuration[];
  connectionId: string;
  domainId: string;
  domainUnitId: string;
  environmentId?: string;
  name: string;
  physicalEndpoints: PhysicalEndpoint[];
  projectId?: string;
  props?: ConnectionPropertiesOutput;
  type: ConnectionType;
  scope?: ConnectionScope;
}
export type ConnectionSummaries = ConnectionSummary[];
export interface ListConnectionsOutput {
  items: ConnectionSummary[];
  nextToken?: string;
}
export interface ListDataProductRevisionsInput {
  domainIdentifier: string;
  identifier: string;
  maxResults?: number;
  nextToken?: string;
}
export interface DataProductRevision {
  domainId?: string;
  id?: string;
  revision?: string;
  createdAt?: Date;
  createdBy?: string;
}
export type DataProductRevisions = DataProductRevision[];
export interface ListDataProductRevisionsOutput {
  items: DataProductRevision[];
  nextToken?: string;
}
export type DataAssetActivityStatus =
  | "FAILED"
  | "PUBLISHING_FAILED"
  | "SUCCEEDED_CREATED"
  | "SUCCEEDED_UPDATED"
  | "SKIPPED_ALREADY_IMPORTED"
  | "SKIPPED_ARCHIVED"
  | "SKIPPED_NO_ACCESS"
  | "UNCHANGED"
  | (string & {});
export interface ListDataSourceRunActivitiesInput {
  domainIdentifier: string;
  identifier: string;
  status?: DataAssetActivityStatus;
  nextToken?: string;
  maxResults?: number;
}
export type LineageEventErrorMessage = string;
export interface LineageInfo {
  eventId?: string;
  eventStatus?: LineageEventProcessingStatus;
  errorMessage?: string;
}
export interface DataSourceRunActivity {
  database: string | redacted.Redacted<string>;
  dataSourceRunId: string;
  technicalName: string | redacted.Redacted<string>;
  dataAssetStatus: DataAssetActivityStatus;
  projectId: string;
  dataAssetId?: string;
  technicalDescription?: string | redacted.Redacted<string>;
  errorMessage?: DataSourceErrorMessage;
  lineageSummary?: LineageInfo;
  createdAt: Date;
  updatedAt: Date;
}
export type DataSourceRunActivities = DataSourceRunActivity[];
export interface ListDataSourceRunActivitiesOutput {
  items: DataSourceRunActivity[];
  nextToken?: string;
}
export interface ListDataSourceRunsInput {
  domainIdentifier: string;
  dataSourceIdentifier: string;
  status?: DataSourceRunStatus;
  nextToken?: string;
  maxResults?: number;
}
export interface DataSourceRunSummary {
  id: string;
  dataSourceId: string;
  type: DataSourceRunType;
  status: DataSourceRunStatus;
  projectId: string;
  runStatisticsForAssets?: RunStatisticsForAssets;
  errorMessage?: DataSourceErrorMessage;
  createdAt: Date;
  updatedAt: Date;
  startedAt?: Date;
  stoppedAt?: Date;
  lineageSummary?: DataSourceRunLineageSummary;
}
export type DataSourceRunSummaries = DataSourceRunSummary[];
export interface ListDataSourceRunsOutput {
  items: DataSourceRunSummary[];
  nextToken?: string;
}
export interface ListDataSourcesInput {
  domainIdentifier: string;
  projectIdentifier: string;
  environmentIdentifier?: string;
  connectionIdentifier?: string;
  type?: string;
  status?: DataSourceStatus;
  name?: string | redacted.Redacted<string>;
  nextToken?: string;
  maxResults?: number;
}
export interface DataSourceSummary {
  domainId: string;
  environmentId?: string;
  connectionId?: string;
  dataSourceId: string;
  name: string | redacted.Redacted<string>;
  type: string;
  status: DataSourceStatus;
  enableSetting?: EnableSetting;
  schedule?: ScheduleConfiguration;
  lastRunStatus?: DataSourceRunStatus;
  lastRunAt?: Date;
  lastRunErrorMessage?: DataSourceErrorMessage;
  lastRunAssetCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
  description?: string | redacted.Redacted<string>;
}
export type DataSourceSummaries = DataSourceSummary[];
export interface ListDataSourcesOutput {
  items: DataSourceSummary[];
  nextToken?: string;
}
export type MaxResultsForListDomains = number;
export interface ListDomainsInput {
  status?: DomainStatus;
  maxResults?: number;
  nextToken?: string;
}
export type DomainName = string | redacted.Redacted<string>;
export type DomainDescription = string | redacted.Redacted<string>;
export interface DomainSummary {
  id: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  arn: string;
  managedAccountId: string;
  status: DomainStatus;
  portalUrl?: string;
  createdAt: Date;
  lastUpdatedAt?: Date;
  domainVersion?: DomainVersion;
}
export type DomainSummaries = DomainSummary[];
export interface ListDomainsOutput {
  items: DomainSummary[];
  nextToken?: string;
}
export interface ListDomainUnitsForParentInput {
  domainIdentifier: string;
  parentDomainUnitIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export interface DomainUnitSummary {
  name: string;
  id: string;
}
export type DomainUnitSummaries = DomainUnitSummary[];
export interface ListDomainUnitsForParentOutput {
  items: DomainUnitSummary[];
  nextToken?: string;
}
export interface ListEntityOwnersInput {
  domainIdentifier: string;
  entityType: DataZoneEntityType;
  entityIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export interface OwnerUserPropertiesOutput {
  userId?: string;
}
export interface OwnerGroupPropertiesOutput {
  groupId?: string;
}
export type OwnerPropertiesOutput =
  | { user: OwnerUserPropertiesOutput; group?: never }
  | { user?: never; group: OwnerGroupPropertiesOutput };
export type EntityOwners = OwnerPropertiesOutput[];
export interface ListEntityOwnersOutput {
  owners: OwnerPropertiesOutput[];
  nextToken?: string;
}
export interface ListEnvironmentActionsInput {
  domainIdentifier: string;
  environmentIdentifier: string;
  nextToken?: string;
  maxResults?: number;
}
export interface EnvironmentActionSummary {
  domainId: string;
  environmentId: string;
  id: string;
  name: string;
  parameters: ActionParameters;
  description?: string;
}
export type ListEnvironmentActionSummaries = EnvironmentActionSummary[];
export interface ListEnvironmentActionsOutput {
  items?: EnvironmentActionSummary[];
  nextToken?: string;
}
export interface ListEnvironmentBlueprintConfigurationsInput {
  domainIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export interface EnvironmentBlueprintConfigurationItem {
  domainId: string;
  environmentBlueprintId: string;
  provisioningRoleArn?: string;
  environmentRolePermissionBoundary?: string;
  manageAccessRoleArn?: string;
  enabledRegions?: string[];
  regionalParameters?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
  allowUserProvidedConfigurations?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  resourceConfigurations?: ResourceConfiguration[];
  provisioningConfigurations?: ProvisioningConfiguration[];
}
export type EnvironmentBlueprintConfigurations =
  EnvironmentBlueprintConfigurationItem[];
export interface ListEnvironmentBlueprintConfigurationsOutput {
  items?: EnvironmentBlueprintConfigurationItem[];
  nextToken?: string;
}
export interface ListEnvironmentBlueprintsInput {
  domainIdentifier: string;
  maxResults?: number;
  nextToken?: string;
  name?: string;
  managed?: boolean;
}
export interface EnvironmentBlueprintSummary {
  id: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  provider: string;
  provisioningProperties: ProvisioningProperties;
  createdAt?: Date;
  updatedAt?: Date;
}
export type EnvironmentBlueprintSummaries = EnvironmentBlueprintSummary[];
export interface ListEnvironmentBlueprintsOutput {
  items: EnvironmentBlueprintSummary[];
  nextToken?: string;
}
export interface ListEnvironmentProfilesInput {
  domainIdentifier: string;
  awsAccountId?: string;
  awsAccountRegion?: string;
  environmentBlueprintIdentifier?: string;
  projectIdentifier?: string;
  name?: string | redacted.Redacted<string>;
  nextToken?: string;
  maxResults?: number;
}
export interface EnvironmentProfileSummary {
  id: string;
  domainId: string;
  awsAccountId?: string;
  awsAccountRegion?: string;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  environmentBlueprintId: string;
  projectId?: string;
}
export type EnvironmentProfileSummaries = EnvironmentProfileSummary[];
export interface ListEnvironmentProfilesOutput {
  items: EnvironmentProfileSummary[];
  nextToken?: string;
}
export interface ListEnvironmentsInput {
  domainIdentifier: string;
  awsAccountId?: string;
  status?: EnvironmentStatus;
  awsAccountRegion?: string;
  projectIdentifier: string;
  environmentProfileIdentifier?: string;
  environmentBlueprintIdentifier?: string;
  provider?: string;
  name?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface EnvironmentSummary {
  projectId: string;
  id?: string;
  domainId: string;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  environmentProfileId?: string;
  awsAccountId?: string;
  awsAccountRegion?: string;
  provider: string;
  status?: EnvironmentStatus;
  environmentConfigurationId?: string | redacted.Redacted<string>;
  environmentConfigurationName?: string | redacted.Redacted<string>;
}
export type EnvironmentSummaries = EnvironmentSummary[];
export interface ListEnvironmentsOutput {
  items: EnvironmentSummary[];
  nextToken?: string;
}
export interface ListJobRunsInput {
  domainIdentifier: string;
  jobIdentifier: string;
  status?: JobRunStatus;
  sortOrder?: SortOrder;
  nextToken?: string;
  maxResults?: number;
}
export interface JobRunSummary {
  domainId?: string;
  jobId?: string;
  jobType?: JobType;
  runId?: string;
  runMode?: JobRunMode;
  status?: JobRunStatus;
  error?: JobRunError;
  createdBy?: string;
  createdAt?: Date;
  startTime?: Date;
  endTime?: Date;
}
export type JobRunSummaries = JobRunSummary[];
export interface ListJobRunsOutput {
  items?: JobRunSummary[];
  nextToken?: string;
}
export interface ListLineageEventsInput {
  domainIdentifier: string;
  maxResults?: number;
  timestampAfter?: Date;
  timestampBefore?: Date;
  processingStatus?: LineageEventProcessingStatus;
  sortOrder?: SortOrder;
  nextToken?: string;
}
export type OpenLineageRunState =
  | "START"
  | "RUNNING"
  | "COMPLETE"
  | "ABORT"
  | "FAIL"
  | "OTHER"
  | (string & {});
export interface NameIdentifier {
  name?: string;
  namespace?: string;
}
export type NameIdentifiers = NameIdentifier[];
export interface OpenLineageRunEventSummary {
  eventType?: OpenLineageRunState;
  runId?: string;
  job?: NameIdentifier;
  inputs?: NameIdentifier[];
  outputs?: NameIdentifier[];
}
export type EventSummary = {
  openLineageRunEventSummary: OpenLineageRunEventSummary;
};
export interface LineageEventSummary {
  id?: string;
  domainId?: string;
  processingStatus?: LineageEventProcessingStatus;
  eventTime?: Date;
  eventSummary?: EventSummary;
  createdBy?: string;
  createdAt?: Date;
}
export type LineageEventSummaries = LineageEventSummary[];
export interface ListLineageEventsOutput {
  items?: LineageEventSummary[];
  nextToken?: string;
}
export type EdgeDirection = "UPSTREAM" | "DOWNSTREAM" | (string & {});
export interface ListLineageNodeHistoryInput {
  domainIdentifier: string;
  maxResults?: number;
  nextToken?: string;
  identifier: string;
  direction?: EdgeDirection;
  eventTimestampGTE?: Date;
  eventTimestampLTE?: Date;
  sortOrder?: SortOrder;
}
export interface LineageNodeSummary {
  domainId: string;
  name?: string;
  description?: string;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  id: string;
  typeName: string;
  typeRevision?: string;
  sourceIdentifier?: string;
  eventTimestamp?: Date;
}
export type LineageNodeSummaries = LineageNodeSummary[];
export interface ListLineageNodeHistoryOutput {
  nodes?: LineageNodeSummary[];
  nextToken?: string;
}
export interface ListMetadataGenerationRunsInput {
  domainIdentifier: string;
  status?: MetadataGenerationRunStatus;
  type?: MetadataGenerationRunType;
  nextToken?: string;
  maxResults?: number;
  targetIdentifier?: string;
}
export interface MetadataGenerationRunItem {
  domainId: string;
  id: string;
  target?: MetadataGenerationRunTarget;
  status?: MetadataGenerationRunStatus;
  type?: MetadataGenerationRunType;
  types?: MetadataGenerationRunType[];
  createdAt?: Date;
  createdBy?: string;
  owningProjectId: string;
}
export type MetadataGenerationRuns = MetadataGenerationRunItem[];
export interface ListMetadataGenerationRunsOutput {
  items?: MetadataGenerationRunItem[];
  nextToken?: string;
}
export interface ListNotebookRunsInput {
  domainIdentifier: string;
  owningProjectIdentifier: string;
  notebookIdentifier?: string;
  status?: NotebookRunStatus;
  scheduleIdentifier?: string;
  maxResults?: number;
  sortOrder?: SortOrder;
  nextToken?: string;
}
export interface NotebookRunSummary {
  id: string;
  domainId: string;
  owningProjectId: string;
  notebookId: string;
  scheduleId?: string;
  status: NotebookRunStatus;
  triggerSource?: TriggerSource;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  startedAt?: Date;
  completedAt?: Date;
}
export type NotebookRunSummaryList = NotebookRunSummary[];
export interface ListNotebookRunsOutput {
  items?: NotebookRunSummary[];
  nextToken?: string;
}
export type SortKey = "CREATED_AT" | "UPDATED_AT" | (string & {});
export interface ListNotebooksInput {
  domainIdentifier: string;
  owningProjectIdentifier: string;
  maxResults?: number;
  sortOrder?: SortOrder;
  sortBy?: SortKey;
  status?: NotebookStatus;
  nextToken?: string;
}
export interface NotebookSummary {
  id: string;
  name: string | redacted.Redacted<string>;
  owningProjectId: string;
  domainId: string;
  status: NotebookStatus;
  description?: string | redacted.Redacted<string>;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export type NotebookSummaryList = NotebookSummary[];
export interface ListNotebooksOutput {
  items?: NotebookSummary[];
  nextToken?: string;
}
export type NotificationType = "TASK" | "EVENT" | (string & {});
export type NotificationSubjects = string[];
export type TaskStatus = "ACTIVE" | "INACTIVE" | (string & {});
export interface ListNotificationsInput {
  domainIdentifier: string;
  type: NotificationType;
  afterTimestamp?: Date;
  beforeTimestamp?: Date;
  subjects?: string[];
  taskStatus?: TaskStatus;
  maxResults?: number;
  nextToken?: string;
}
export type TaskId = string;
export type NotificationResourceType = "PROJECT" | (string & {});
export interface NotificationResource {
  type: NotificationResourceType;
  id: string;
  name?: string;
}
export type NotificationRole =
  | "PROJECT_OWNER"
  | "PROJECT_CONTRIBUTOR"
  | "PROJECT_VIEWER"
  | "DOMAIN_OWNER"
  | "PROJECT_SUBSCRIBER"
  | (string & {});
export interface Topic {
  subject: string;
  resource: NotificationResource;
  role: NotificationRole;
}
export type Title = string | redacted.Redacted<string>;
export type Message = string | redacted.Redacted<string>;
export type ActionLink = string | redacted.Redacted<string>;
export type MetadataMap = { [key: string]: string | undefined };
export interface NotificationOutput {
  identifier: string;
  domainIdentifier: string;
  type: NotificationType;
  topic: Topic;
  title: string | redacted.Redacted<string>;
  message: string | redacted.Redacted<string>;
  status?: TaskStatus;
  actionLink: string | redacted.Redacted<string>;
  creationTimestamp: Date;
  lastUpdatedTimestamp: Date;
  metadata?: { [key: string]: string | undefined };
}
export type NotificationsList = NotificationOutput[];
export interface ListNotificationsOutput {
  notifications?: NotificationOutput[];
  nextToken?: string;
}
export interface ListPolicyGrantsInput {
  domainIdentifier: string;
  entityType: TargetEntityType;
  entityIdentifier: string;
  policyType: ManagedPolicyType;
  maxResults?: number;
  nextToken?: string;
}
export interface PolicyGrantMember {
  principal?: PolicyGrantPrincipal;
  detail?: PolicyGrantDetail;
  createdAt?: Date;
  createdBy?: string;
  grantId?: string;
}
export type PolicyGrantList = PolicyGrantMember[];
export interface ListPolicyGrantsOutput {
  grantList: PolicyGrantMember[];
  nextToken?: string;
}
export type SortFieldProject = "NAME" | (string & {});
export interface ListProjectMembershipsInput {
  domainIdentifier: string;
  projectIdentifier: string;
  sortBy?: SortFieldProject;
  sortOrder?: SortOrder;
  nextToken?: string;
  maxResults?: number;
}
export interface UserDetails {
  userId: string;
}
export interface GroupDetails {
  groupId: string;
}
export type MemberDetails =
  | { user: UserDetails; group?: never }
  | { user?: never; group: GroupDetails };
export interface ProjectMember {
  memberDetails: MemberDetails;
  designation: UserDesignation;
}
export type ProjectMembers = ProjectMember[];
export interface ListProjectMembershipsOutput {
  members: ProjectMember[];
  nextToken?: string;
}
export interface ListProjectProfilesInput {
  domainIdentifier: string;
  name?: string | redacted.Redacted<string>;
  sortBy?: SortFieldProject;
  sortOrder?: SortOrder;
  nextToken?: string;
  maxResults?: number;
}
export interface ProjectProfileSummary {
  domainId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  status?: Status;
  createdBy: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  domainUnitId?: string;
}
export type ProjectProfileSummaries = ProjectProfileSummary[];
export interface ListProjectProfilesOutput {
  items?: ProjectProfileSummary[];
  nextToken?: string;
}
export interface ListProjectsInput {
  domainIdentifier: string;
  userIdentifier?: string;
  groupIdentifier?: string;
  name?: string | redacted.Redacted<string>;
  projectCategory?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ProjectSummary {
  domainId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  projectStatus?: ProjectStatus;
  failureReasons?: ProjectDeletionError[];
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
  domainUnitId?: string;
  projectCategory?: string;
}
export type ProjectSummaries = ProjectSummary[];
export interface ListProjectsOutput {
  items?: ProjectSummary[];
  nextToken?: string;
}
export type ProjectIds = string[];
export type AssetTypeIdentifiers = string[];
export interface ListRulesInput {
  domainIdentifier: string;
  targetType: RuleTargetType;
  targetIdentifier: string;
  ruleType?: RuleType;
  action?: RuleAction;
  projectIds?: string[];
  assetTypes?: string[];
  dataProduct?: boolean;
  includeCascaded?: boolean;
  maxResults?: number;
  nextToken?: string;
}
export interface RuleSummary {
  identifier?: string;
  revision?: string;
  ruleType?: RuleType;
  name?: string | redacted.Redacted<string>;
  targetType?: RuleTargetType;
  target?: RuleTarget;
  action?: RuleAction;
  scope?: RuleScope;
  updatedAt?: Date;
  lastUpdatedBy?: string;
}
export type RuleSummaries = RuleSummary[];
export interface ListRulesOutput {
  items: RuleSummary[];
  nextToken?: string;
}
export interface ListSubscriptionGrantsInput {
  domainIdentifier: string;
  environmentId?: string;
  subscriptionTargetId?: string;
  subscribedListingId?: string;
  subscriptionId?: string;
  owningProjectId?: string;
  owningIamPrincipalArn?: string;
  owningUserId?: string;
  owningGroupId?: string;
  sortBy?: SortKey;
  sortOrder?: SortOrder;
  maxResults?: number;
  nextToken?: string;
}
export interface SubscriptionGrantSummary {
  id: string;
  createdBy: string;
  updatedBy?: string;
  domainId: string;
  createdAt: Date;
  updatedAt: Date;
  environmentId?: string;
  subscriptionTargetId: string;
  grantedEntity: GrantedEntity;
  status: SubscriptionGrantOverallStatus;
  assets?: SubscribedAsset[];
  subscriptionId?: string;
}
export type SubscriptionGrants = SubscriptionGrantSummary[];
export interface ListSubscriptionGrantsOutput {
  items: SubscriptionGrantSummary[];
  nextToken?: string;
}
export interface ListSubscriptionRequestsInput {
  domainIdentifier: string;
  status?: SubscriptionRequestStatus;
  subscribedListingId?: string;
  owningProjectId?: string;
  owningIamPrincipalArn?: string;
  approverProjectId?: string;
  owningUserId?: string;
  owningGroupId?: string;
  sortBy?: SortKey;
  sortOrder?: SortOrder;
  maxResults?: number;
  nextToken?: string;
}
export interface MetadataFormSummary {
  formName?: string;
  typeName: string | redacted.Redacted<string>;
  typeRevision: string;
}
export type MetadataFormsSummary = MetadataFormSummary[];
export interface SubscriptionRequestSummary {
  id: string;
  createdBy: string;
  updatedBy?: string;
  domainId: string;
  status: SubscriptionRequestStatus;
  createdAt: Date;
  updatedAt: Date;
  requestReason: string | redacted.Redacted<string>;
  subscribedPrincipals: SubscribedPrincipal[];
  subscribedListings: SubscribedListing[];
  reviewerId?: string;
  decisionComment?: string | redacted.Redacted<string>;
  existingSubscriptionId?: string;
  metadataFormsSummary?: MetadataFormSummary[];
}
export type SubscriptionRequests = SubscriptionRequestSummary[];
export interface ListSubscriptionRequestsOutput {
  items: SubscriptionRequestSummary[];
  nextToken?: string;
}
export interface ListSubscriptionsInput {
  domainIdentifier: string;
  subscriptionRequestIdentifier?: string;
  status?: SubscriptionStatus;
  subscribedListingId?: string;
  owningProjectId?: string;
  owningIamPrincipalArn?: string;
  owningUserId?: string;
  owningGroupId?: string;
  approverProjectId?: string;
  sortBy?: SortKey;
  sortOrder?: SortOrder;
  maxResults?: number;
  nextToken?: string;
}
export interface SubscriptionSummary {
  id: string;
  createdBy: string;
  updatedBy?: string;
  domainId: string;
  status: SubscriptionStatus;
  createdAt: Date;
  updatedAt: Date;
  subscribedPrincipal: SubscribedPrincipal;
  subscribedListing: SubscribedListing;
  subscriptionRequestId?: string;
  retainPermissions?: boolean;
}
export type Subscriptions = SubscriptionSummary[];
export interface ListSubscriptionsOutput {
  items: SubscriptionSummary[];
  nextToken?: string;
}
export interface ListSubscriptionTargetsInput {
  domainIdentifier: string;
  environmentIdentifier: string;
  sortBy?: SortKey;
  sortOrder?: SortOrder;
  maxResults?: number;
  nextToken?: string;
}
export interface SubscriptionTargetSummary {
  id: string;
  authorizedPrincipals: string[];
  domainId: string;
  projectId: string;
  environmentId: string;
  name: string | redacted.Redacted<string>;
  type: string;
  createdBy: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt?: Date;
  manageAccessRole?: string;
  applicableAssetTypes: string[];
  subscriptionTargetConfig: SubscriptionTargetForm[];
  provider: string;
  subscriptionGrantCreationMode?: SubscriptionGrantCreationMode;
}
export type SubscriptionTargets = SubscriptionTargetSummary[];
export interface ListSubscriptionTargetsOutput {
  items: SubscriptionTargetSummary[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface ListTimeSeriesDataPointsInput {
  domainIdentifier: string;
  entityIdentifier: string;
  entityType: TimeSeriesEntityType;
  formName: string;
  startedAt?: Date;
  endedAt?: Date;
  nextToken?: string;
  maxResults?: number;
}
export interface ListTimeSeriesDataPointsOutput {
  items?: TimeSeriesDataPointSummaryFormOutput[];
  nextToken?: string;
}
export interface PostLineageEventInput {
  domainIdentifier: string;
  event: T.StreamingInputBody;
  clientToken?: string;
}
export interface PostLineageEventOutput {
  id?: string;
  domainId?: string;
}
export interface TimeSeriesDataPointFormInput {
  formName: string;
  typeIdentifier: string;
  typeRevision?: string;
  timestamp: Date;
  content?: string;
}
export type TimeSeriesDataPointFormInputList = TimeSeriesDataPointFormInput[];
export interface PostTimeSeriesDataPointsInput {
  domainIdentifier: string;
  entityIdentifier: string;
  entityType: TimeSeriesEntityType;
  forms: TimeSeriesDataPointFormInput[];
  clientToken?: string;
}
export type TimeSeriesDataPointFormOutputList = TimeSeriesDataPointFormOutput[];
export interface PostTimeSeriesDataPointsOutput {
  domainId?: string;
  entityId?: string;
  entityType?: TimeSeriesEntityType;
  forms?: TimeSeriesDataPointFormOutput[];
}
export interface PutDataExportConfigurationInput {
  domainIdentifier: string;
  enableExport: boolean;
  encryptionConfiguration?: EncryptionConfiguration;
  clientToken?: string;
}
export interface PutDataExportConfigurationOutput {}
export interface PutResourceConfiguration {
  name: string;
  description?: string;
  region: string;
  parameters: { [key: string]: string | undefined };
}
export type PutResourceConfigurations = PutResourceConfiguration[];
export type GlobalParameterMap = { [key: string]: string | undefined };
export interface PutEnvironmentBlueprintConfigurationInput {
  domainIdentifier: string;
  environmentBlueprintIdentifier: string;
  provisioningRoleArn?: string;
  manageAccessRoleArn?: string;
  environmentRolePermissionBoundary?: string;
  enabledRegions: string[];
  regionalParameters?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
  resourceConfigurations?: PutResourceConfiguration[];
  allowUserProvidedConfigurations?: boolean;
  globalParameters?: { [key: string]: string | undefined };
  provisioningConfigurations?: ProvisioningConfiguration[];
}
export interface PutEnvironmentBlueprintConfigurationOutput {
  domainId: string;
  environmentBlueprintId: string;
  provisioningRoleArn?: string;
  environmentRolePermissionBoundary?: string;
  manageAccessRoleArn?: string;
  enabledRegions?: string[];
  regionalParameters?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
  allowUserProvidedConfigurations?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  resourceConfigurations?: ResourceConfiguration[];
  provisioningConfigurations?: ProvisioningConfiguration[];
}
export type RelationType = "LINEAGE" | (string & {});
export type RelationDirection = "IN" | "OUT" | (string & {});
export interface RelationPattern {
  relationType: RelationType;
  relationDirection: RelationDirection;
  maxPathLength?: number;
}
export type GraphEntityType = "LINEAGE_NODE" | (string & {});
export type Attribute = string;
export type FilterOperator =
  | "EQ"
  | "LE"
  | "LT"
  | "GE"
  | "GT"
  | "TEXT_SEARCH"
  | (string & {});
export interface Filter {
  attribute: string;
  value?: string;
  intValue?: number;
  operator?: FilterOperator;
}
export type FilterList = FilterClause[];
export type FilterClause =
  | { filter: Filter; and?: never; or?: never }
  | { filter?: never; and: FilterClause[]; or?: never }
  | { filter?: never; and?: never; or: FilterClause[] };
export interface EntityPattern {
  entityType: GraphEntityType;
  identifier: string;
  filters?: FilterClause;
}
export type MatchClause =
  | { relationPattern: RelationPattern; entityPattern?: never }
  | { relationPattern?: never; entityPattern: EntityPattern };
export type MatchClauses = MatchClause[];
export type FormNameList = string[];
export interface AdditionalAttributes {
  formNames?: string[];
}
export interface QueryGraphInput {
  domainIdentifier: string;
  match: MatchClause[];
  maxResults?: number;
  nextToken?: string;
  additionalAttributes?: AdditionalAttributes;
}
export type LineageNodeIds = string[];
export interface LineageNodeItem {
  domainId: string;
  name?: string;
  description?: string;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  id: string;
  typeName: string;
  typeRevision?: string;
  sourceIdentifier?: string;
  eventTimestamp?: Date;
  formsOutput?: FormOutput[];
  upstreamLineageNodeIds?: string[];
  downstreamLineageNodeIds?: string[];
}
export type ResultItem = { lineageNode: LineageNodeItem };
export type ResultItemList = ResultItem[];
export interface QueryGraphOutput {
  items?: ResultItem[];
  nextToken?: string;
}
export type RejectRuleBehavior = "ALL" | "NONE" | (string & {});
export interface RejectRule {
  rule?: RejectRuleBehavior;
  threshold?: number;
}
export type PredictionChoices = number[];
export interface RejectChoice {
  predictionTarget?: string;
  predictionChoices?: number[];
}
export type RejectChoices = RejectChoice[];
export interface RejectPredictionsInput {
  domainIdentifier: string;
  identifier: string;
  revision?: string;
  rejectRule?: RejectRule;
  rejectChoices?: RejectChoice[];
  clientToken?: string;
}
export interface RejectPredictionsOutput {
  domainId: string;
  assetId: string;
  assetRevision: string;
}
export interface RejectSubscriptionRequestInput {
  domainIdentifier: string;
  identifier: string;
  decisionComment?: string | redacted.Redacted<string>;
}
export interface RejectSubscriptionRequestOutput {
  id: string;
  createdBy: string;
  updatedBy?: string;
  domainId: string;
  status: SubscriptionRequestStatus;
  createdAt: Date;
  updatedAt: Date;
  requestReason: string | redacted.Redacted<string>;
  subscribedPrincipals: SubscribedPrincipal[];
  subscribedListings: SubscribedListing[];
  reviewerId?: string;
  decisionComment?: string | redacted.Redacted<string>;
  existingSubscriptionId?: string;
  metadataForms?: FormOutput[];
}
export interface RemoveEntityOwnerInput {
  domainIdentifier: string;
  entityType: DataZoneEntityType;
  entityIdentifier: string;
  owner: OwnerProperties;
  clientToken?: string;
}
export interface RemoveEntityOwnerOutput {}
export interface RemovePolicyGrantInput {
  domainIdentifier: string;
  entityType: TargetEntityType;
  entityIdentifier: string;
  policyType: ManagedPolicyType;
  principal: PolicyGrantPrincipal;
  grantIdentifier?: string;
  clientToken?: string;
}
export interface RemovePolicyGrantOutput {}
export interface RevokeSubscriptionInput {
  domainIdentifier: string;
  identifier: string;
  retainPermissions?: boolean;
}
export interface RevokeSubscriptionOutput {
  id: string;
  createdBy: string;
  updatedBy?: string;
  domainId: string;
  status: SubscriptionStatus;
  createdAt: Date;
  updatedAt: Date;
  subscribedPrincipal: SubscribedPrincipal;
  subscribedListing: SubscribedListing;
  subscriptionRequestId?: string;
  retainPermissions?: boolean;
}
export type InventorySearchScope =
  | "ASSET"
  | "GLOSSARY"
  | "GLOSSARY_TERM"
  | "DATA_PRODUCT"
  | (string & {});
export type SearchText = string;
export interface SearchInItem {
  attribute: string;
}
export type SearchInList = SearchInItem[];
export interface SearchSort {
  attribute: string;
  order?: SortOrder;
}
export type SearchOutputAdditionalAttribute =
  | "FORMS"
  | "TIME_SERIES_DATA_POINT_FORMS"
  | "TEXT_MATCH_RATIONALE"
  | (string & {});
export type SearchOutputAdditionalAttributes =
  SearchOutputAdditionalAttribute[];
export interface SearchInput {
  domainIdentifier: string;
  owningProjectIdentifier?: string;
  maxResults?: number;
  nextToken?: string;
  searchScope: InventorySearchScope;
  searchText?: string;
  searchIn?: SearchInItem[];
  filters?: FilterClause;
  sort?: SearchSort;
  additionalAttributes?: SearchOutputAdditionalAttribute[];
}
export interface MatchOffset {
  startOffset?: number;
  endOffset?: number;
}
export type MatchOffsets = MatchOffset[];
export interface TextMatchItem {
  attribute?: string;
  text?: string;
  matchOffsets?: MatchOffset[];
}
export type TextMatches = TextMatchItem[];
export type MatchRationaleItem = { textMatches: TextMatchItem[] };
export type MatchRationale = MatchRationaleItem[];
export interface GlossaryItemAdditionalAttributes {
  matchRationale?: MatchRationaleItem[];
}
export interface GlossaryItem {
  domainId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  owningProjectId: string;
  description?: string | redacted.Redacted<string>;
  status: GlossaryStatus;
  usageRestrictions?: GlossaryUsageRestriction[];
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  additionalAttributes?: GlossaryItemAdditionalAttributes;
}
export interface GlossaryTermItemAdditionalAttributes {
  matchRationale?: MatchRationaleItem[];
}
export interface GlossaryTermItem {
  domainId: string;
  glossaryId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  shortDescription?: string | redacted.Redacted<string>;
  usageRestrictions?: GlossaryUsageRestriction[];
  longDescription?: string | redacted.Redacted<string>;
  termRelations?: TermRelations;
  status: GlossaryTermStatus;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  additionalAttributes?: GlossaryTermItemAdditionalAttributes;
}
export interface AssetItemAdditionalAttributes {
  formsOutput?: FormOutput[];
  readOnlyFormsOutput?: FormOutput[];
  latestTimeSeriesDataPointFormsOutput?: TimeSeriesDataPointSummaryFormOutput[];
  matchRationale?: MatchRationaleItem[];
}
export interface AssetItem {
  domainId: string;
  identifier: string;
  name: string | redacted.Redacted<string>;
  typeIdentifier: string;
  typeRevision: string;
  externalIdentifier?: string;
  description?: string | redacted.Redacted<string>;
  createdAt?: Date;
  createdBy?: string;
  firstRevisionCreatedAt?: Date;
  firstRevisionCreatedBy?: string;
  glossaryTerms?: string[];
  owningProjectId: string;
  additionalAttributes?: AssetItemAdditionalAttributes;
  governedGlossaryTerms?: string[];
}
export interface DataProductItemAdditionalAttributes {
  matchRationale?: MatchRationaleItem[];
}
export interface DataProductResultItem {
  domainId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  owningProjectId: string;
  description?: string | redacted.Redacted<string>;
  glossaryTerms?: string[];
  createdAt?: Date;
  createdBy?: string;
  firstRevisionCreatedAt?: Date;
  firstRevisionCreatedBy?: string;
  additionalAttributes?: DataProductItemAdditionalAttributes;
}
export type SearchInventoryResultItem =
  | {
      glossaryItem: GlossaryItem;
      glossaryTermItem?: never;
      assetItem?: never;
      dataProductItem?: never;
    }
  | {
      glossaryItem?: never;
      glossaryTermItem: GlossaryTermItem;
      assetItem?: never;
      dataProductItem?: never;
    }
  | {
      glossaryItem?: never;
      glossaryTermItem?: never;
      assetItem: AssetItem;
      dataProductItem?: never;
    }
  | {
      glossaryItem?: never;
      glossaryTermItem?: never;
      assetItem?: never;
      dataProductItem: DataProductResultItem;
    };
export type SearchInventoryResultItems = SearchInventoryResultItem[];
export interface SearchOutput {
  items?: SearchInventoryResultItem[];
  nextToken?: string;
  totalMatchCount?: number;
}
export type GroupSearchType =
  | "SSO_GROUP"
  | "DATAZONE_SSO_GROUP"
  | "IAM_ROLE_SESSION_GROUP"
  | (string & {});
export type GroupSearchText = string | redacted.Redacted<string>;
export interface SearchGroupProfilesInput {
  domainIdentifier: string;
  groupType: GroupSearchType;
  searchText?: string | redacted.Redacted<string>;
  maxResults?: number;
  nextToken?: string;
}
export interface GroupProfileSummary {
  domainId?: string;
  id?: string;
  status?: GroupProfileStatus;
  groupName?: string | redacted.Redacted<string>;
  rolePrincipalArn?: string;
  rolePrincipalId?: string;
}
export type GroupProfileSummaries = GroupProfileSummary[];
export interface SearchGroupProfilesOutput {
  items?: GroupProfileSummary[];
  nextToken?: string;
}
export type AggregationDisplayValue = string;
export interface AggregationListItem {
  attribute: string;
  displayValue?: string;
}
export type AggregationList = AggregationListItem[];
export interface SearchListingsInput {
  domainIdentifier: string;
  searchText?: string;
  searchIn?: SearchInItem[];
  maxResults?: number;
  nextToken?: string;
  filters?: FilterClause;
  aggregations?: AggregationListItem[];
  sort?: SearchSort;
  additionalAttributes?: SearchOutputAdditionalAttribute[];
}
export interface AssetListingItemAdditionalAttributes {
  forms?: string;
  matchRationale?: MatchRationaleItem[];
  latestTimeSeriesDataPointForms?: TimeSeriesDataPointSummaryFormOutput[];
}
export interface AssetListingItem {
  listingId?: string;
  listingRevision?: string;
  name?: string | redacted.Redacted<string>;
  entityId?: string;
  entityRevision?: string;
  entityType?: string;
  description?: string | redacted.Redacted<string>;
  createdAt?: Date;
  listingCreatedBy?: string;
  listingUpdatedBy?: string;
  glossaryTerms?: DetailedGlossaryTerm[];
  governedGlossaryTerms?: DetailedGlossaryTerm[];
  owningProjectId?: string;
  additionalAttributes?: AssetListingItemAdditionalAttributes;
}
export interface DataProductListingItemAdditionalAttributes {
  forms?: string;
  matchRationale?: MatchRationaleItem[];
}
export interface ListingSummaryItem {
  listingId?: string;
  listingRevision?: string;
  glossaryTerms?: DetailedGlossaryTerm[];
}
export type ListingSummaryItems = ListingSummaryItem[];
export interface DataProductListingItem {
  listingId?: string;
  listingRevision?: string;
  name?: string | redacted.Redacted<string>;
  entityId?: string;
  entityRevision?: string;
  description?: string | redacted.Redacted<string>;
  createdAt?: Date;
  listingCreatedBy?: string;
  listingUpdatedBy?: string;
  glossaryTerms?: DetailedGlossaryTerm[];
  owningProjectId?: string;
  additionalAttributes?: DataProductListingItemAdditionalAttributes;
  items?: ListingSummaryItem[];
}
export type SearchResultItem =
  | { assetListing: AssetListingItem; dataProductListing?: never }
  | { assetListing?: never; dataProductListing: DataProductListingItem };
export type SearchResultItems = SearchResultItem[];
export type AggregationAttributeValue = string;
export type AggregationAttributeDisplayValue = string;
export interface AggregationOutputItem {
  value?: string;
  count?: number;
  displayValue?: string;
}
export type AggregationOutputItems = AggregationOutputItem[];
export interface AggregationOutput {
  attribute?: string;
  displayValue?: string;
  items?: AggregationOutputItem[];
}
export type AggregationOutputList = AggregationOutput[];
export interface SearchListingsOutput {
  items?: SearchResultItem[];
  nextToken?: string;
  totalMatchCount?: number;
  aggregates?: AggregationOutput[];
}
export type TypesSearchScope =
  | "ASSET_TYPE"
  | "FORM_TYPE"
  | "LINEAGE_NODE_TYPE"
  | (string & {});
export interface SearchTypesInput {
  domainIdentifier: string;
  maxResults?: number;
  nextToken?: string;
  searchScope: TypesSearchScope;
  searchText?: string;
  searchIn?: SearchInItem[];
  filters?: FilterClause;
  sort?: SearchSort;
  managed: boolean;
}
export interface AssetTypeItem {
  domainId: string;
  name: string;
  revision: string;
  description?: string | redacted.Redacted<string>;
  formsOutput: { [key: string]: FormEntryOutput | undefined };
  owningProjectId: string;
  originDomainId?: string;
  originProjectId?: string;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export interface FormTypeData {
  domainId: string;
  name: string | redacted.Redacted<string>;
  revision: string;
  model?: Model;
  status?: FormTypeStatus;
  owningProjectId?: string;
  originDomainId?: string;
  originProjectId?: string;
  createdAt?: Date;
  createdBy?: string;
  description?: string | redacted.Redacted<string>;
  imports?: Import[];
}
export interface LineageNodeTypeItem {
  domainId: string;
  name?: string;
  description?: string;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  revision: string;
  formsOutput: { [key: string]: FormEntryOutput | undefined };
}
export type SearchTypesResultItem =
  | {
      assetTypeItem: AssetTypeItem;
      formTypeItem?: never;
      lineageNodeTypeItem?: never;
    }
  | {
      assetTypeItem?: never;
      formTypeItem: FormTypeData;
      lineageNodeTypeItem?: never;
    }
  | {
      assetTypeItem?: never;
      formTypeItem?: never;
      lineageNodeTypeItem: LineageNodeTypeItem;
    };
export type SearchTypesResultItems = SearchTypesResultItem[];
export interface SearchTypesOutput {
  items?: SearchTypesResultItem[];
  nextToken?: string;
  totalMatchCount?: number;
}
export type UserSearchType =
  | "SSO_USER"
  | "DATAZONE_USER"
  | "DATAZONE_SSO_USER"
  | "DATAZONE_IAM_USER"
  | (string & {});
export type UserSearchText = string | redacted.Redacted<string>;
export interface SearchUserProfilesInput {
  domainIdentifier: string;
  userType: UserSearchType;
  searchText?: string | redacted.Redacted<string>;
  maxResults?: number;
  nextToken?: string;
}
export interface UserProfileSummary {
  domainId?: string;
  id?: string;
  type?: UserProfileType;
  status?: UserProfileStatus;
  details?: UserProfileDetails;
}
export type UserProfileSummaries = UserProfileSummary[];
export interface SearchUserProfilesOutput {
  items?: UserProfileSummary[];
  nextToken?: string;
}
export interface StartDataSourceRunInput {
  domainIdentifier: string;
  dataSourceIdentifier: string;
  clientToken?: string;
}
export interface StartDataSourceRunOutput {
  domainId: string;
  dataSourceId: string;
  id: string;
  projectId: string;
  status: DataSourceRunStatus;
  type: DataSourceRunType;
  dataSourceConfigurationSnapshot?: string;
  runStatisticsForAssets?: RunStatisticsForAssets;
  errorMessage?: DataSourceErrorMessage;
  createdAt: Date;
  updatedAt: Date;
  startedAt?: Date;
  stoppedAt?: Date;
}
export interface StartMetadataGenerationRunInput {
  domainIdentifier: string;
  type?: MetadataGenerationRunType;
  types?: MetadataGenerationRunType[];
  target: MetadataGenerationRunTarget;
  clientToken?: string;
  owningProjectIdentifier: string;
}
export interface StartMetadataGenerationRunOutput {
  domainId: string;
  id: string;
  status?: MetadataGenerationRunStatus;
  type?: MetadataGenerationRunType;
  types?: MetadataGenerationRunType[];
  createdAt?: Date;
  createdBy?: string;
  owningProjectId?: string;
}
export interface StartNotebookExportInput {
  domainIdentifier: string;
  notebookIdentifier: string;
  owningProjectIdentifier: string;
  fileFormat: FileFormat;
  clientToken?: string;
}
export interface StartNotebookExportOutput {
  id: string;
  domainId: string;
  owningProjectId: string;
  notebookId: string;
  fileFormat: FileFormat;
  status: NotebookExportStatus;
  createdAt?: Date;
  createdBy?: string;
}
export type S3SourceLocation = string | redacted.Redacted<string>;
export type SourceLocation = { s3: string | redacted.Redacted<string> };
export interface StartNotebookImportInput {
  domainIdentifier: string;
  owningProjectIdentifier: string;
  sourceLocation: SourceLocation;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  clientToken?: string;
}
export interface StartNotebookImportOutput {
  notebookId?: string;
  status?: NotebookStatus;
  domainId?: string;
  owningProjectId?: string;
  name?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  sourceLocation?: SourceLocation;
  createdAt?: Date;
  createdBy?: string;
}
export interface StartNotebookRunInput {
  domainIdentifier: string;
  owningProjectIdentifier: string;
  notebookIdentifier: string;
  scheduleIdentifier?: string;
  computeConfiguration?: ComputeConfig;
  networkConfiguration?: NetworkConfig;
  timeoutConfiguration?: TimeoutConfig;
  triggerSource?: TriggerSource;
  metadata?: { [key: string]: string | redacted.Redacted<string> | undefined };
  parameters?: { [key: string]: string | undefined };
  clientToken?: string;
}
export interface StartNotebookRunOutput {
  id: string;
  domainId: string;
  owningProjectId: string;
  notebookId: string;
  scheduleId?: string;
  status: NotebookRunStatus;
  cellOrder?: CellInformation[];
  metadata?: { [key: string]: string | redacted.Redacted<string> | undefined };
  parameters?: { [key: string]: string | undefined };
  computeConfiguration?: ComputeConfig;
  networkConfiguration?: NetworkConfig;
  timeoutConfiguration?: TimeoutConfig;
  environmentConfiguration?: EnvironmentConfig;
  storageConfiguration?: StorageConfig;
  triggerSource?: TriggerSource;
  error?: NotebookRunError;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  startedAt?: Date;
  completedAt?: Date;
}
export interface StartNotebookSyncInput {
  domainIdentifier: string;
  owningProjectIdentifier: string;
  sourceLocation: SourceLocation;
  gitMetadata?: GitMetadata;
  notebookId?: string;
  name?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  clientToken?: string;
}
export interface StartNotebookSyncOutput {
  notebookId?: string;
  status?: NotebookStatus;
  domainId?: string;
  owningProjectId?: string;
  sourceLocation?: SourceLocation;
  gitMetadata?: GitMetadata;
  name?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  createdAt?: Date;
  createdBy?: string;
}
export interface StopNotebookRunInput {
  domainIdentifier: string;
  identifier: string;
  clientToken?: string;
}
export interface StopNotebookRunOutput {
  id: string;
  domainId: string;
  owningProjectId: string;
  status: NotebookRunStatus;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateAccountPoolInput {
  domainIdentifier: string;
  identifier: string;
  name?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  resolutionStrategy?: ResolutionStrategy;
  accountSource?: AccountSource;
}
export interface UpdateAccountPoolOutput {
  domainId?: string;
  name?: string | redacted.Redacted<string>;
  id?: string;
  description?: string | redacted.Redacted<string>;
  resolutionStrategy?: ResolutionStrategy;
  accountSource: AccountSource;
  createdBy: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  updatedBy?: string;
  domainUnitId?: string;
}
export interface UpdateAssetFilterInput {
  domainIdentifier: string;
  assetIdentifier: string;
  identifier: string;
  name?: string;
  description?: string | redacted.Redacted<string>;
  configuration?: AssetFilterConfiguration;
}
export interface UpdateAssetFilterOutput {
  id: string;
  domainId: string;
  assetId: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  status?: FilterStatus;
  configuration: AssetFilterConfiguration;
  createdAt?: Date;
  errorMessage?: string;
  effectiveColumnNames?: string[];
  effectiveRowFilter?: string;
}
export interface AthenaPropertiesPatch {
  workgroupName?: string;
}
export interface AuthenticationConfigurationPatch {
  secretArn?: string;
  basicAuthenticationCredentials?: BasicAuthenticationCredentials;
}
export interface GlueConnectionPatch {
  description?: string;
  connectionProperties?: { [key: string]: string | undefined };
  authenticationConfiguration?: AuthenticationConfigurationPatch;
}
export interface GluePropertiesPatch {
  glueConnectionInput?: GlueConnectionPatch;
}
export interface IamPropertiesPatch {
  glueLineageSyncEnabled?: boolean;
}
export interface RedshiftPropertiesPatch {
  storage?: RedshiftStorageProperties;
  databaseName?: string;
  host?: string;
  port?: number;
  credentials?: RedshiftCredentials;
  lineageSync?: RedshiftLineageSyncConfigurationInput;
}
export interface SparkEmrPropertiesPatch {
  computeArn?: string;
  instanceProfileArn?: string;
  javaVirtualEnv?: string;
  logUri?: string;
  pythonVirtualEnv?: string;
  runtimeRole?: string;
  trustedCertificatesS3Uri?: string;
  managedEndpointArn?: string;
}
export interface S3PropertiesPatch {
  s3Uri: string;
  s3AccessGrantLocationId?: string;
  registerS3AccessGrantLocation?: boolean;
}
export interface ConnectivityPropertiesPatch {
  description?: string;
  connectionProperties?: { [key: string]: string | undefined };
  authenticationConfiguration?: AuthenticationConfigurationPatch;
}
export interface SnowflakePropertiesPatch {
  connectivityPropertiesPatch?: ConnectivityPropertiesPatch;
  snowflakeRole?: string;
  lineageSync?: LineageSyncInput;
}
export interface AmazonQPropertiesPatch {
  isEnabled: boolean;
  profileArn?: string;
  authMode?: string;
}
export interface MlflowPropertiesPatch {
  trackingServerArn?: string;
}
export interface LakehousePropertiesPatch {
  glueLineageSyncEnabled?: boolean;
}
export interface VpcPropertiesPatch {
  vpcId?: string;
  subnetIds?: string[];
  securityGroupId?: string;
}
export interface GitPropertiesPatch {
  codeConnectionArn?: string;
  defaultBranch?: string;
}
export type ConnectionPropertiesPatch =
  | {
      athenaProperties: AthenaPropertiesPatch;
      glueProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      s3Properties?: never;
      snowflakeProperties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties: GluePropertiesPatch;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      s3Properties?: never;
      snowflakeProperties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      iamProperties: IamPropertiesPatch;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      s3Properties?: never;
      snowflakeProperties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      iamProperties?: never;
      redshiftProperties: RedshiftPropertiesPatch;
      sparkEmrProperties?: never;
      s3Properties?: never;
      snowflakeProperties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties: SparkEmrPropertiesPatch;
      s3Properties?: never;
      snowflakeProperties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      s3Properties: S3PropertiesPatch;
      snowflakeProperties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      s3Properties?: never;
      snowflakeProperties: SnowflakePropertiesPatch;
      amazonQProperties?: never;
      mlflowProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      s3Properties?: never;
      snowflakeProperties?: never;
      amazonQProperties: AmazonQPropertiesPatch;
      mlflowProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      s3Properties?: never;
      snowflakeProperties?: never;
      amazonQProperties?: never;
      mlflowProperties: MlflowPropertiesPatch;
      lakehouseProperties?: never;
      vpcProperties?: never;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      s3Properties?: never;
      snowflakeProperties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      lakehouseProperties: LakehousePropertiesPatch;
      vpcProperties?: never;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      s3Properties?: never;
      snowflakeProperties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      lakehouseProperties?: never;
      vpcProperties: VpcPropertiesPatch;
      gitProperties?: never;
    }
  | {
      athenaProperties?: never;
      glueProperties?: never;
      iamProperties?: never;
      redshiftProperties?: never;
      sparkEmrProperties?: never;
      s3Properties?: never;
      snowflakeProperties?: never;
      amazonQProperties?: never;
      mlflowProperties?: never;
      lakehouseProperties?: never;
      vpcProperties?: never;
      gitProperties: GitPropertiesPatch;
    };
export interface UpdateConnectionInput {
  configurations?: Configuration[];
  domainIdentifier: string;
  identifier: string;
  description?: string | redacted.Redacted<string>;
  awsLocation?: AwsLocation;
  props?: ConnectionPropertiesPatch;
}
export interface UpdateConnectionOutput {
  configurations?: Configuration[];
  connectionId: string;
  description?: string | redacted.Redacted<string>;
  domainId: string;
  domainUnitId: string;
  environmentId?: string;
  name: string;
  physicalEndpoints: PhysicalEndpoint[];
  projectId?: string;
  props?: ConnectionPropertiesOutput;
  type: ConnectionType;
  scope?: ConnectionScope;
}
export interface UpdateDataSourceInput {
  domainIdentifier: string;
  identifier: string;
  name?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  enableSetting?: EnableSetting;
  publishOnImport?: boolean;
  assetFormsInput?: FormInput[];
  schedule?: ScheduleConfiguration;
  configuration?: DataSourceConfigurationInput;
  recommendation?: RecommendationConfiguration;
  retainPermissionsOnRevokeFailure?: boolean;
}
export interface UpdateDataSourceOutput {
  id: string;
  status?: DataSourceStatus;
  type?: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  domainId: string;
  projectId: string;
  environmentId?: string;
  connectionId?: string;
  configuration?: DataSourceConfigurationOutput;
  recommendation?: RecommendationConfiguration;
  enableSetting?: EnableSetting;
  publishOnImport?: boolean;
  assetFormsOutput?: FormOutput[];
  schedule?: ScheduleConfiguration;
  lastRunStatus?: DataSourceRunStatus;
  lastRunAt?: Date;
  lastRunErrorMessage?: DataSourceErrorMessage;
  errorMessage?: DataSourceErrorMessage;
  createdAt?: Date;
  updatedAt?: Date;
  selfGrantStatus?: SelfGrantStatusOutput;
  retainPermissionsOnRevokeFailure?: boolean;
}
export interface UpdateDomainInput {
  identifier: string;
  description?: string;
  singleSignOn?: SingleSignOn;
  domainExecutionRole?: string;
  serviceRole?: string;
  name?: string;
  clientToken?: string;
}
export interface UpdateDomainOutput {
  id: string;
  rootDomainUnitId?: string;
  description?: string;
  singleSignOn?: SingleSignOn;
  domainExecutionRole?: string;
  serviceRole?: string;
  name?: string;
  lastUpdatedAt?: Date;
}
export interface UpdateDomainUnitInput {
  domainIdentifier: string;
  identifier: string;
  description?: string | redacted.Redacted<string>;
  name?: string | redacted.Redacted<string>;
}
export interface UpdateDomainUnitOutput {
  id: string;
  domainId: string;
  name: string | redacted.Redacted<string>;
  owners: DomainUnitOwnerProperties[];
  description?: string | redacted.Redacted<string>;
  parentDomainUnitId?: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  createdBy?: string;
  lastUpdatedBy?: string;
}
export interface UpdateEnvironmentInput {
  domainIdentifier: string;
  identifier: string;
  name?: string;
  description?: string;
  glossaryTerms?: string[];
  blueprintVersion?: string;
  userParameters?: EnvironmentParameter[];
  environmentConfigurationName?: string | redacted.Redacted<string>;
}
export interface UpdateEnvironmentOutput {
  projectId: string;
  id?: string;
  domainId: string;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  environmentProfileId?: string;
  awsAccountId?: string;
  awsAccountRegion?: string;
  provider: string;
  provisionedResources?: Resource[];
  status?: EnvironmentStatus;
  environmentActions?: ConfigurableEnvironmentAction[];
  glossaryTerms?: string[];
  userParameters?: CustomParameter[];
  lastDeployment?: Deployment;
  provisioningProperties?: ProvisioningProperties;
  deploymentProperties?: DeploymentProperties;
  environmentBlueprintId?: string;
  environmentConfigurationId?: string | redacted.Redacted<string>;
  environmentConfigurationName?: string | redacted.Redacted<string>;
}
export interface UpdateEnvironmentActionInput {
  domainIdentifier: string;
  environmentIdentifier: string;
  identifier: string;
  parameters?: ActionParameters;
  name?: string;
  description?: string;
}
export interface UpdateEnvironmentActionOutput {
  domainId: string;
  environmentId: string;
  id: string;
  name: string;
  parameters: ActionParameters;
  description?: string;
}
export interface UpdateEnvironmentBlueprintInput {
  domainIdentifier: string;
  identifier: string;
  description?: string;
  provisioningProperties?: ProvisioningProperties;
  userParameters?: CustomParameter[];
}
export interface UpdateEnvironmentBlueprintOutput {
  id: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  provider: string;
  provisioningProperties: ProvisioningProperties;
  deploymentProperties?: DeploymentProperties;
  userParameters?: CustomParameter[];
  glossaryTerms?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
export interface UpdateEnvironmentProfileInput {
  domainIdentifier: string;
  identifier: string;
  name?: string | redacted.Redacted<string>;
  description?: string;
  userParameters?: EnvironmentParameter[];
  awsAccountId?: string;
  awsAccountRegion?: string;
}
export interface UpdateEnvironmentProfileOutput {
  id: string;
  domainId: string;
  awsAccountId?: string;
  awsAccountRegion?: string;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  environmentBlueprintId: string;
  projectId?: string;
  userParameters?: CustomParameter[];
}
export interface UpdateGlossaryInput {
  domainIdentifier: string;
  identifier: string;
  name?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  status?: GlossaryStatus;
  clientToken?: string;
}
export interface UpdateGlossaryOutput {
  domainId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  owningProjectId: string;
  description?: string | redacted.Redacted<string>;
  status?: GlossaryStatus;
  usageRestrictions?: GlossaryUsageRestriction[];
}
export interface UpdateGlossaryTermInput {
  domainIdentifier: string;
  glossaryIdentifier?: string;
  identifier: string;
  name?: string | redacted.Redacted<string>;
  shortDescription?: string | redacted.Redacted<string>;
  longDescription?: string | redacted.Redacted<string>;
  termRelations?: TermRelations;
  status?: GlossaryTermStatus;
}
export interface UpdateGlossaryTermOutput {
  id: string;
  domainId: string;
  glossaryId: string;
  name: string | redacted.Redacted<string>;
  status: GlossaryTermStatus;
  shortDescription?: string | redacted.Redacted<string>;
  longDescription?: string | redacted.Redacted<string>;
  termRelations?: TermRelations;
  usageRestrictions?: GlossaryUsageRestriction[];
}
export interface UpdateGroupProfileInput {
  domainIdentifier: string;
  groupIdentifier: string;
  status: GroupProfileStatus;
}
export interface UpdateGroupProfileOutput {
  domainId?: string;
  id?: string;
  status?: GroupProfileStatus;
  groupName?: string | redacted.Redacted<string>;
  rolePrincipalArn?: string;
  rolePrincipalId?: string;
}
export interface UpdateNotebookInput {
  domainIdentifier: string;
  identifier: string;
  description?: string | redacted.Redacted<string>;
  status?: NotebookStatus;
  name?: string | redacted.Redacted<string>;
  cellOrder?: CellInformation[];
  metadata?: { [key: string]: string | redacted.Redacted<string> | undefined };
  parameters?: { [key: string]: string | undefined };
  environmentConfiguration?: EnvironmentConfig;
  clientToken?: string;
}
export interface UpdateNotebookOutput {
  id: string;
  name: string | redacted.Redacted<string>;
  owningProjectId: string;
  domainId: string;
  cellOrder: CellInformation[];
  status: NotebookStatus;
  description?: string | redacted.Redacted<string>;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  lockedBy?: string;
  lockedAt?: Date;
  lockExpiresAt?: Date;
  computeId?: string;
  metadata?: { [key: string]: string | redacted.Redacted<string> | undefined };
  parameters?: { [key: string]: string | undefined };
  environmentConfiguration?: EnvironmentConfig;
  error?: NotebookError;
  gitMetadata?: GitMetadata;
}
export interface UpdateProjectInput {
  domainIdentifier: string;
  identifier: string;
  name?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  resourceTags?: { [key: string]: string | undefined };
  glossaryTerms?: string[];
  domainUnitId?: string;
  environmentDeploymentDetails?: EnvironmentDeploymentDetails;
  userParameters?: EnvironmentConfigurationUserParameter[];
  projectProfileVersion?: string;
}
export interface UpdateProjectOutput {
  domainId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  projectStatus?: ProjectStatus;
  failureReasons?: ProjectDeletionError[];
  createdBy: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  resourceTags?: ResourceTag[];
  glossaryTerms?: string[];
  domainUnitId?: string;
  projectProfileId?: string;
  userParameters?: EnvironmentConfigurationUserParameter[];
  environmentDeploymentDetails?: EnvironmentDeploymentDetails;
  projectCategory?: string;
}
export interface UpdateProjectProfileInput {
  domainIdentifier: string;
  identifier: string;
  name?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  status?: Status;
  projectResourceTags?: ResourceTagParameter[];
  allowCustomProjectResourceTags?: boolean;
  projectResourceTagsDescription?: string | redacted.Redacted<string>;
  environmentConfigurations?: EnvironmentConfiguration[];
  domainUnitIdentifier?: string;
}
export interface UpdateProjectProfileOutput {
  domainId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  status?: Status;
  projectResourceTags?: ResourceTagParameter[];
  allowCustomProjectResourceTags?: boolean;
  projectResourceTagsDescription?: string | redacted.Redacted<string>;
  environmentConfigurations?: EnvironmentConfiguration[];
  createdBy: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  domainUnitId?: string;
}
export interface UpdateRootDomainUnitOwnerInput {
  domainIdentifier: string;
  currentOwner: string;
  newOwner: string;
  clientToken?: string;
}
export interface UpdateRootDomainUnitOwnerOutput {}
export interface UpdateRuleInput {
  domainIdentifier: string;
  identifier: string;
  name?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  scope?: RuleScope;
  detail?: RuleDetail;
  includeChildDomainUnits?: boolean;
}
export interface UpdateRuleOutput {
  identifier: string;
  revision: string;
  name: string | redacted.Redacted<string>;
  ruleType: RuleType;
  target: RuleTarget;
  action: RuleAction;
  scope: RuleScope;
  detail: RuleDetail;
  description?: string | redacted.Redacted<string>;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  lastUpdatedBy: string;
}
export interface UpdateSubscriptionGrantStatusInput {
  domainIdentifier: string;
  identifier: string;
  assetIdentifier: string;
  status: SubscriptionGrantStatus;
  failureCause?: FailureCause;
  targetName?: string;
}
export interface UpdateSubscriptionGrantStatusOutput {
  id: string;
  createdBy: string;
  updatedBy?: string;
  domainId: string;
  createdAt: Date;
  updatedAt: Date;
  environmentId?: string;
  subscriptionTargetId: string;
  grantedEntity: GrantedEntity;
  status: SubscriptionGrantOverallStatus;
  assets?: SubscribedAsset[];
  subscriptionId?: string;
}
export interface UpdateSubscriptionRequestInput {
  domainIdentifier: string;
  identifier: string;
  requestReason: string | redacted.Redacted<string>;
}
export interface UpdateSubscriptionRequestOutput {
  id: string;
  createdBy: string;
  updatedBy?: string;
  domainId: string;
  status: SubscriptionRequestStatus;
  createdAt: Date;
  updatedAt: Date;
  requestReason: string | redacted.Redacted<string>;
  subscribedPrincipals: SubscribedPrincipal[];
  subscribedListings: SubscribedListing[];
  reviewerId?: string;
  decisionComment?: string | redacted.Redacted<string>;
  existingSubscriptionId?: string;
  metadataForms?: FormOutput[];
}
export interface UpdateSubscriptionTargetInput {
  domainIdentifier: string;
  environmentIdentifier: string;
  identifier: string;
  name?: string | redacted.Redacted<string>;
  authorizedPrincipals?: string[];
  applicableAssetTypes?: string[];
  subscriptionTargetConfig?: SubscriptionTargetForm[];
  manageAccessRole?: string;
  provider?: string;
  subscriptionGrantCreationMode?: SubscriptionGrantCreationMode;
}
export interface UpdateSubscriptionTargetOutput {
  id: string;
  authorizedPrincipals: string[];
  domainId: string;
  projectId: string;
  environmentId: string;
  name: string | redacted.Redacted<string>;
  type: string;
  createdBy: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt?: Date;
  manageAccessRole?: string;
  applicableAssetTypes: string[];
  subscriptionTargetConfig: SubscriptionTargetForm[];
  provider: string;
  subscriptionGrantCreationMode?: SubscriptionGrantCreationMode;
}
export interface UpdateUserProfileInput {
  domainIdentifier: string;
  userIdentifier: string;
  type?: UserProfileType;
  status: UserProfileStatus;
  sessionName?: string;
}
export interface UpdateUserProfileOutput {
  domainId?: string;
  id?: string;
  type?: UserProfileType;
  status?: UserProfileStatus;
  details?: UserProfileDetails;
}
export type ErrorMessage = string;
export type AcceptPredictionsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Accepts automatically generated business-friendly metadata for your Amazon DataZone assets.
 */
export const acceptPredictions: API.OperationMethod<
  AcceptPredictionsInput,
  AcceptPredictionsOutput,
  AcceptPredictionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/domains/{domainIdentifier}/assets/{identifier}/accept-predictions",
    input: {
      domainIdentifier: 0,
      identifier: 0,
      revision: D.m({ query: "revision" }),
      acceptRule: { rule: 0, threshold: 0 },
      acceptChoices: D.list({
        predictionTarget: 0,
        predictionChoice: 0,
        editedValue: 0,
      }),
      clientToken: D.m({ idempotency: true }),
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
  operationName: "AcceptPredictions",
})) as any;

export type AcceptSubscriptionRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Accepts a subscription request to a specific asset.
 */
export const acceptSubscriptionRequest: API.OperationMethod<
  AcceptSubscriptionRequestInput,
  AcceptSubscriptionRequestOutput,
  AcceptSubscriptionRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/domains/{domainIdentifier}/subscription-requests/{identifier}/accept",
    input: {
      domainIdentifier: 0,
      identifier: 0,
      decisionComment: 0,
      assetScopes: D.list(i_AcceptedAssetScope),
      assetPermissions: D.list(i_AssetPermission),
    },
    output: {
      createdAt: D.ts,
      updatedAt: D.ts,
      requestReason: D.secret,
      subscribedPrincipals: D.list(o_SubscribedPrincipal),
      subscribedListings: D.list(o_SubscribedListing),
      decisionComment: D.secret,
      metadataForms: D.list(o_FormOutput),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptSubscriptionRequest",
})) as any;

export type AddEntityOwnerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds the owner of an entity (a domain unit).
 */
export const addEntityOwner: API.OperationMethod<
  AddEntityOwnerInput,
  AddEntityOwnerOutput,
  AddEntityOwnerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/entities/{entityType}/{entityIdentifier}/addOwner",
    input: {
      domainIdentifier: 0,
      entityType: 0,
      entityIdentifier: 0,
      owner: i_OwnerProperties,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddEntityOwner",
})) as any;

export type AddPolicyGrantError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds a policy grant (an authorization policy) to a specified entity, including domain units, environment blueprint configurations, or environment profiles.
 */
export const addPolicyGrant: API.OperationMethod<
  AddPolicyGrantInput,
  AddPolicyGrantOutput,
  AddPolicyGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/policies/managed/{entityType}/{entityIdentifier}/addGrant",
    input: {
      domainIdentifier: 0,
      entityType: 0,
      entityIdentifier: 0,
      policyType: 0,
      principal: i_PolicyGrantPrincipal,
      detail: {
        createDomainUnit: { includeChildDomainUnits: 0 },
        overrideDomainUnitOwners: { includeChildDomainUnits: 0 },
        addToProjectMemberPool: { includeChildDomainUnits: 0 },
        overrideProjectOwners: { includeChildDomainUnits: 0 },
        createGlossary: { includeChildDomainUnits: 0 },
        createFormType: { includeChildDomainUnits: 0 },
        createAssetType: { includeChildDomainUnits: 0 },
        createProject: { includeChildDomainUnits: 0 },
        createEnvironmentProfile: { domainUnitId: 0 },
        delegateCreateEnvironmentProfile: i_Unit,
        createEnvironment: i_Unit,
        createEnvironmentFromBlueprint: i_Unit,
        createProjectFromProjectProfile: {
          includeChildDomainUnits: 0,
          projectProfiles: 0,
        },
        useAssetType: { domainUnitId: 0 },
      },
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddPolicyGrant",
})) as any;

export type AssociateEnvironmentRoleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates the environment role in Amazon DataZone.
 */
export const associateEnvironmentRole: API.OperationMethod<
  AssociateEnvironmentRoleInput,
  AssociateEnvironmentRoleOutput,
  AssociateEnvironmentRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/roles/{environmentRoleArn}",
    input: {
      domainIdentifier: 0,
      environmentIdentifier: 0,
      environmentRoleArn: 0,
    },
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
  operationName: "AssociateEnvironmentRole",
})) as any;

export type AssociateGovernedTermsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates governed terms with an asset.
 */
export const associateGovernedTerms: API.OperationMethod<
  AssociateGovernedTermsInput,
  AssociateGovernedTermsOutput,
  AssociateGovernedTermsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /v2/domains/{domainIdentifier}/entities/{entityType}/{entityIdentifier}/associate-governed-terms",
    input: {
      domainIdentifier: 0,
      entityIdentifier: 0,
      entityType: 0,
      governedGlossaryTerms: 0,
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
  operationName: "AssociateGovernedTerms",
})) as any;

export type BatchGetAttributesMetadataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the attribute metadata.
 */
export const batchGetAttributesMetadata: API.OperationMethod<
  BatchGetAttributesMetadataInput,
  BatchGetAttributesMetadataOutput,
  BatchGetAttributesMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/entities/{entityType}/{entityIdentifier}/attributes-metadata",
    input: {
      domainIdentifier: 0,
      entityType: 0,
      entityIdentifier: 0,
      entityRevision: D.m({ query: "entityRevision" }),
      attributeIdentifiers: D.m({ query: "attributeIdentifier" }),
    },
    output: { attributes: D.list({ forms: D.list(o_FormOutput) }) },
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
  operationName: "BatchGetAttributesMetadata",
})) as any;

export type BatchPutAttributesMetadataError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Writes the attribute metadata.
 */
export const batchPutAttributesMetadata: API.OperationMethod<
  BatchPutAttributesMetadataInput,
  BatchPutAttributesMetadataOutput,
  BatchPutAttributesMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/domains/{domainIdentifier}/entities/{entityType}/{entityIdentifier}/attributes-metadata",
    input: {
      domainIdentifier: 0,
      entityType: 0,
      entityIdentifier: 0,
      clientToken: D.m({ idempotency: true }),
      attributes: D.list({
        attributeIdentifier: 0,
        forms: D.list(i_FormInput),
      }),
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
  operationName: "BatchPutAttributesMetadata",
})) as any;

export type CancelMetadataGenerationRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels the metadata generation run.
 *
 * Prerequisites:
 *
 * - The run must exist and be in a cancelable status (e.g., SUBMITTED, IN_PROGRESS).
 *
 * - Runs in SUCCEEDED status cannot be cancelled.
 *
 * - User must have access to the run and cancel permissions.
 */
export const cancelMetadataGenerationRun: API.OperationMethod<
  CancelMetadataGenerationRunInput,
  CancelMetadataGenerationRunOutput,
  CancelMetadataGenerationRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/metadata-generation-runs/{identifier}/cancel",
    input: { domainIdentifier: 0, identifier: 0 },
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
  operationName: "CancelMetadataGenerationRun",
})) as any;

export type CancelSubscriptionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels the subscription to the specified asset.
 */
export const cancelSubscription: API.OperationMethod<
  CancelSubscriptionInput,
  CancelSubscriptionOutput,
  CancelSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/domains/{domainIdentifier}/subscriptions/{identifier}/cancel",
    input: { domainIdentifier: 0, identifier: 0 },
    output: {
      createdAt: D.ts,
      updatedAt: D.ts,
      subscribedPrincipal: o_SubscribedPrincipal,
      subscribedListing: o_SubscribedListing,
    },
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
  operationName: "CancelSubscription",
})) as any;

export type CreateAccountPoolError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an account pool.
 */
export const createAccountPool: API.OperationMethod<
  CreateAccountPoolInput,
  CreateAccountPoolOutput,
  CreateAccountPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/account-pools",
    input: {
      domainIdentifier: 0,
      name: 0,
      description: 0,
      resolutionStrategy: 0,
      accountSource: i_AccountSource,
    },
    output: {
      name: D.secret,
      description: D.secret,
      accountSource: o_AccountSource,
      createdAt: D.ts,
      lastUpdatedAt: D.ts,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccountPool",
})) as any;

export type CreateAssetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an asset in Amazon DataZone catalog.
 *
 * Before creating assets, make sure that the following requirements are met:
 *
 * - `--domain-identifier` must refer to an existing domain.
 *
 * - `--owning-project-identifier` must be a valid project within the domain.
 *
 * - Asset type must be created beforehand using `create-asset-type`, or be a supported system-defined type. For more information, see create-asset-type.
 *
 * - `--type-revision` (if used) must match a valid revision of the asset type.
 *
 * - `formsInput` is required when it is associated as required in the `asset-type`. For more information, see create-form-type.
 *
 * - Form content must include all required fields as per the form schema (e.g., `bucketArn`).
 *
 * You must invoke the following pre-requisite commands before invoking this API:
 *
 * - CreateFormType
 *
 * - CreateAssetType
 */
export const createAsset: API.OperationMethod<
  CreateAssetInput,
  CreateAssetOutput,
  CreateAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/assets",
    input: {
      name: 0,
      domainIdentifier: 0,
      externalIdentifier: 0,
      typeIdentifier: 0,
      typeRevision: 0,
      description: 0,
      glossaryTerms: 0,
      formsInput: D.list(i_FormInput),
      owningProjectIdentifier: 0,
      predictionConfiguration: i_PredictionConfiguration,
      clientToken: D.m({ idempotency: true }),
    },
    output: {
      name: D.secret,
      description: D.secret,
      createdAt: D.ts,
      firstRevisionCreatedAt: D.ts,
      formsOutput: D.list(o_FormOutput),
      readOnlyFormsOutput: D.list(o_FormOutput),
      latestTimeSeriesDataPointFormsOutput: D.list(
        o_TimeSeriesDataPointSummaryFormOutput,
      ),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAsset",
})) as any;

export type CreateAssetFilterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a data asset filter.
 *
 * Asset filters provide a sophisticated way to create controlled views of data assets by selecting specific columns or applying row-level filters. This capability is crucial for organizations that need to share data while maintaining security and privacy controls. For example, your database might be filtered to show only non-PII fields to certain users, or sales data might be filtered by region for different regional teams. Asset filters enable fine-grained access control while maintaining a single source of truth.
 *
 * Prerequisites:
 *
 * - A valid domain (`--domain-identifier`) must exist.
 *
 * - A data asset (`--asset-identifier`) must already be created under that domain.
 *
 * - The asset must have the referenced columns available in its schema for column-based filtering.
 *
 * - You cannot specify both (`columnConfiguration`, `rowConfiguration`)at the same time.
 */
export const createAssetFilter: API.OperationMethod<
  CreateAssetFilterInput,
  CreateAssetFilterOutput,
  CreateAssetFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/assets/{assetIdentifier}/filters",
    input: {
      domainIdentifier: 0,
      assetIdentifier: 0,
      name: 0,
      description: 0,
      configuration: i_AssetFilterConfiguration,
      clientToken: D.m({ idempotency: true }),
    },
    output: { name: D.secret, description: D.secret, createdAt: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAssetFilter",
})) as any;

export type CreateAssetRevisionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a revision of the asset.
 *
 * Asset revisions represent new versions of existing assets, capturing changes to either the underlying data or its metadata. They maintain a historical record of how assets evolve over time, who made changes, and when those changes occurred. This versioning capability is crucial for governance and compliance, allowing organizations to track changes, understand their impact, and roll back if necessary.
 *
 * Prerequisites:
 *
 * - Asset must already exist in the domain with identifier.
 *
 * - `formsInput` is required when asset has the form type. `typeRevision` should be the latest version of form type.
 *
 * - The form content must include all required fields (e.g., `bucketArn` for `S3ObjectCollectionForm`).
 *
 * - The owning project of the original asset must still exist and be active.
 *
 * - User must have write access to the project and domain.
 */
export const createAssetRevision: API.OperationMethod<
  CreateAssetRevisionInput,
  CreateAssetRevisionOutput,
  CreateAssetRevisionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/assets/{identifier}/revisions",
    input: {
      name: 0,
      domainIdentifier: 0,
      identifier: 0,
      typeRevision: 0,
      description: 0,
      glossaryTerms: 0,
      formsInput: D.list(i_FormInput),
      predictionConfiguration: i_PredictionConfiguration,
      clientToken: D.m({ idempotency: true }),
    },
    output: {
      name: D.secret,
      description: D.secret,
      createdAt: D.ts,
      firstRevisionCreatedAt: D.ts,
      formsOutput: D.list(o_FormOutput),
      readOnlyFormsOutput: D.list(o_FormOutput),
      latestTimeSeriesDataPointFormsOutput: D.list(
        o_TimeSeriesDataPointSummaryFormOutput,
      ),
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
  operationName: "CreateAssetRevision",
})) as any;

export type CreateAssetTypeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a custom asset type.
 *
 * Prerequisites:
 *
 * - The `formsInput` field is required, however, can be passed as empty (e.g. `-forms-input {})`.
 *
 * - You must have `CreateAssetType` permissions.
 *
 * - The domain-identifier and owning-project-identifier must be valid and active.
 *
 * - The name of the asset type must be unique within the domain — duplicate names will cause failure.
 *
 * - JSON input must be valid — incorrect formatting causes Invalid JSON errors.
 */
export const createAssetType: API.OperationMethod<
  CreateAssetTypeInput,
  CreateAssetTypeOutput,
  CreateAssetTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/asset-types",
    input: {
      domainIdentifier: 0,
      name: 0,
      description: 0,
      formsInput: D.map({ typeIdentifier: 0, typeRevision: 0, required: 0 }),
      owningProjectIdentifier: 0,
    },
    output: {
      description: D.secret,
      formsOutput: D.map(o_FormEntryOutput),
      createdAt: D.ts,
      updatedAt: D.ts,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAssetType",
})) as any;

export type CreateConnectionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new connection. In Amazon DataZone, a connection enables you to connect your resources (domains, projects, and environments) to external resources and services.
 */
export const createConnection: API.OperationMethod<
  CreateConnectionInput,
  CreateConnectionOutput,
  CreateConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/connections",
    input: {
      awsLocation: i_AwsLocation,
      clientToken: D.m({ idempotency: true }),
      configurations: D.list(i_Configuration),
      description: 0,
      domainIdentifier: 0,
      environmentIdentifier: 0,
      name: 0,
      props: {
        athenaProperties: { workgroupName: 0 },
        glueProperties: {
          glueConnectionInput: {
            connectionProperties: 0,
            physicalConnectionRequirements: i_PhysicalConnectionRequirements,
            name: 0,
            description: 0,
            connectionType: 0,
            matchCriteria: 0,
            validateCredentials: 0,
            validateForComputeEnvironments: 0,
            sparkProperties: 0,
            athenaProperties: 0,
            pythonProperties: 0,
            authenticationConfiguration: i_AuthenticationConfigurationInput,
          },
        },
        hyperPodProperties: { clusterName: 0 },
        iamProperties: { glueLineageSyncEnabled: 0 },
        redshiftProperties: {
          storage: i_RedshiftStorageProperties,
          databaseName: 0,
          host: 0,
          port: 0,
          credentials: i_RedshiftCredentials,
          lineageSync: i_RedshiftLineageSyncConfigurationInput,
        },
        sparkEmrProperties: {
          computeArn: 0,
          instanceProfileArn: 0,
          javaVirtualEnv: 0,
          logUri: 0,
          pythonVirtualEnv: 0,
          runtimeRole: 0,
          trustedCertificatesS3Uri: 0,
          managedEndpointArn: 0,
        },
        sparkGlueProperties: {
          additionalArgs: { connection: 0 },
          glueConnectionName: 0,
          glueConnectionNames: 0,
          glueVersion: 0,
          idleTimeout: 0,
          javaVirtualEnv: 0,
          numberOfWorkers: 0,
          pythonVirtualEnv: 0,
          workerType: 0,
        },
        s3Properties: {
          s3Uri: 0,
          s3AccessGrantLocationId: 0,
          registerS3AccessGrantLocation: 0,
        },
        snowflakeProperties: {
          connectivityProperties: {
            connectionProperties: 0,
            physicalConnectionRequirements: i_PhysicalConnectionRequirements,
            name: 0,
            description: 0,
            validateCredentials: 0,
            validateForComputeEnvironments: 0,
            sparkProperties: 0,
            athenaProperties: 0,
            pythonProperties: 0,
            authenticationConfiguration: i_AuthenticationConfigurationInput,
          },
          snowflakeRole: 0,
          identityMapping: { usernameAttribute: 0, prefix: 0 },
          lineageSync: i_LineageSyncInput,
        },
        amazonQProperties: { isEnabled: 0, profileArn: 0, authMode: 0 },
        mlflowProperties: { trackingServerArn: 0 },
        workflowsMwaaProperties: { mwaaEnvironmentName: 0 },
        workflowsServerlessProperties: {},
        lakehouseProperties: { glueLineageSyncEnabled: 0 },
        vpcProperties: { vpcId: 0, subnetIds: 0, securityGroupId: 0 },
        gitProperties: {
          codeConnectionArn: 0,
          repositoryId: 0,
          defaultBranch: 0,
        },
      },
      enableTrustedIdentityPropagation: 0,
      scope: 0,
    },
    output: {
      description: D.secret,
      physicalEndpoints: D.list(o_PhysicalEndpoint),
      props: o_ConnectionPropertiesOutput,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnection",
})) as any;

export type CreateDataProductError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a data product.
 *
 * A data product is a comprehensive package that combines data assets with their associated metadata, documentation, and access controls. It's designed to serve specific business needs or use cases, making it easier for users to find and consume data appropriately. Data products include important information about data quality, freshness, and usage guidelines, effectively bridging the gap between data producers and consumers while ensuring proper governance.
 *
 * Prerequisites:
 *
 * - The domain must exist and be accessible.
 *
 * - The owning project must be valid and active.
 *
 * - The name must be unique within the domain (no existing data product with the same name).
 *
 * - User must have create permissions for data products in the project.
 */
export const createDataProduct: API.OperationMethod<
  CreateDataProductInput,
  CreateDataProductOutput,
  CreateDataProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/data-products",
    input: {
      domainIdentifier: 0,
      name: 0,
      owningProjectIdentifier: 0,
      description: 0,
      glossaryTerms: 0,
      formsInput: D.list(i_FormInput),
      items: D.list(i_DataProductItem),
      clientToken: D.m({ idempotency: true }),
    },
    output: {
      name: D.secret,
      description: D.secret,
      formsOutput: D.list(o_FormOutput),
      createdAt: D.ts,
      firstRevisionCreatedAt: D.ts,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataProduct",
})) as any;

export type CreateDataProductRevisionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a data product revision.
 *
 * Prerequisites:
 *
 * - The original data product must exist in the given domain.
 *
 * - User must have permissions on the data product.
 *
 * - The domain must be valid and accessible.
 *
 * - The new revision name must comply with naming constraints (if required).
 */
export const createDataProductRevision: API.OperationMethod<
  CreateDataProductRevisionInput,
  CreateDataProductRevisionOutput,
  CreateDataProductRevisionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/data-products/{identifier}/revisions",
    input: {
      domainIdentifier: 0,
      identifier: 0,
      name: 0,
      description: 0,
      glossaryTerms: 0,
      items: D.list(i_DataProductItem),
      formsInput: D.list(i_FormInput),
      clientToken: D.m({ idempotency: true }),
    },
    output: {
      name: D.secret,
      description: D.secret,
      formsOutput: D.list(o_FormOutput),
      createdAt: D.ts,
      firstRevisionCreatedAt: D.ts,
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
  operationName: "CreateDataProductRevision",
})) as any;

export type CreateDataSourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon DataZone data source.
 */
export const createDataSource: API.OperationMethod<
  CreateDataSourceInput,
  CreateDataSourceOutput,
  CreateDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/data-sources",
    input: {
      name: 0,
      description: 0,
      domainIdentifier: 0,
      projectIdentifier: 0,
      environmentIdentifier: 0,
      connectionIdentifier: 0,
      type: 0,
      configuration: i_DataSourceConfigurationInput,
      recommendation: i_RecommendationConfiguration,
      enableSetting: 0,
      schedule: i_ScheduleConfiguration,
      publishOnImport: 0,
      assetFormsInput: D.list(i_FormInput),
      clientToken: D.m({ idempotency: true }),
    },
    output: {
      name: D.secret,
      description: D.secret,
      assetFormsOutput: D.list(o_FormOutput),
      lastRunAt: D.ts,
      createdAt: D.ts,
      updatedAt: D.ts,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataSource",
})) as any;

export type CreateDomainError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon DataZone domain.
 */
export const createDomain: API.OperationMethod<
  CreateDomainInput,
  CreateDomainOutput,
  CreateDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains",
    input: {
      name: 0,
      description: 0,
      singleSignOn: i_SingleSignOn,
      domainExecutionRole: 0,
      kmsKeyIdentifier: 0,
      tags: 0,
      domainVersion: 0,
      serviceRole: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDomain",
})) as any;

export type CreateDomainUnitError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a domain unit in Amazon DataZone.
 */
export const createDomainUnit: API.OperationMethod<
  CreateDomainUnitInput,
  CreateDomainUnitOutput,
  CreateDomainUnitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/domain-units",
    input: {
      domainIdentifier: 0,
      name: 0,
      parentDomainUnitIdentifier: 0,
      description: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { name: D.secret, description: D.secret, createdAt: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDomainUnit",
})) as any;

export type CreateEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create an Amazon DataZone environment.
 */
export const createEnvironment: API.OperationMethod<
  CreateEnvironmentInput,
  CreateEnvironmentOutput,
  CreateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/environments",
    input: {
      projectIdentifier: 0,
      domainIdentifier: 0,
      description: 0,
      name: 0,
      environmentProfileIdentifier: 0,
      userParameters: D.list(i_EnvironmentParameter),
      glossaryTerms: 0,
      environmentAccountIdentifier: 0,
      environmentAccountRegion: 0,
      environmentBlueprintIdentifier: 0,
      deploymentOrder: 0,
      environmentConfigurationId: 0,
      environmentConfigurationName: 0,
    },
    output: {
      createdAt: D.ts,
      updatedAt: D.ts,
      name: D.secret,
      description: D.secret,
      userParameters: D.list(o_CustomParameter),
      environmentConfigurationId: D.secret,
      environmentConfigurationName: D.secret,
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
  operationName: "CreateEnvironment",
})) as any;

export type CreateEnvironmentActionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an action for the environment, for example, creates a console link for an analytics tool that is available in this environment.
 */
export const createEnvironmentAction: API.OperationMethod<
  CreateEnvironmentActionInput,
  CreateEnvironmentActionOutput,
  CreateEnvironmentActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/actions",
    input: {
      domainIdentifier: 0,
      environmentIdentifier: 0,
      name: 0,
      parameters: i_ActionParameters,
      description: 0,
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
  operationName: "CreateEnvironmentAction",
})) as any;

export type CreateEnvironmentBlueprintError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a Amazon DataZone blueprint.
 */
export const createEnvironmentBlueprint: API.OperationMethod<
  CreateEnvironmentBlueprintInput,
  CreateEnvironmentBlueprintOutput,
  CreateEnvironmentBlueprintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/environment-blueprints",
    input: {
      domainIdentifier: 0,
      name: 0,
      description: 0,
      provisioningProperties: i_ProvisioningProperties,
      userParameters: D.list(i_CustomParameter),
    },
    output: {
      description: D.secret,
      userParameters: D.list(o_CustomParameter),
      createdAt: D.ts,
      updatedAt: D.ts,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEnvironmentBlueprint",
})) as any;

export type CreateEnvironmentProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon DataZone environment profile.
 */
export const createEnvironmentProfile: API.OperationMethod<
  CreateEnvironmentProfileInput,
  CreateEnvironmentProfileOutput,
  CreateEnvironmentProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/environment-profiles",
    input: {
      domainIdentifier: 0,
      name: 0,
      description: 0,
      environmentBlueprintIdentifier: 0,
      projectIdentifier: 0,
      userParameters: D.list(i_EnvironmentParameter),
      awsAccountId: 0,
      awsAccountRegion: 0,
    },
    output: {
      createdAt: D.ts,
      updatedAt: D.ts,
      name: D.secret,
      description: D.secret,
      userParameters: D.list(o_CustomParameter),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEnvironmentProfile",
})) as any;

export type CreateFormTypeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a metadata form type.
 *
 * Prerequisites:
 *
 * - The domain must exist and be in an `ENABLED` state.
 *
 * - The owning project must exist and be accessible.
 *
 * - The name must be unique within the domain.
 *
 * For custom form types, to indicate that a field should be searchable, annotate it with `@amazon.datazone#searchable`. By default, searchable fields are indexed for semantic search, where related query terms will match the attribute value even if they are not stemmed or keyword matches. To indicate that a field should be indexed for lexical search (which disables semantic search but supports stemmed and partial matches), annotate it with `@amazon.datazone#searchable(modes:["LEXICAL"])`. To indicate that a field should be indexed for technical identifier search (for more information on technical identifier search, see: https://aws.amazon.com/blogs/big-data/streamline-data-discovery-with-precise-technical-identifier-search-in-amazon-sagemaker-unified-studio/), annotate it with `@amazon.datazone#searchable(modes:["TECHNICAL"])`.
 *
 * To denote that a field will store glossary term ids (which are filterable via the Search/SearchListings APIs), annotate it with `@amazon.datazone#glossaryterm("${GLOSSARY_ID}")`, where `${GLOSSARY_ID}` is the id of the glossary that the glossary terms stored in the field belong to.
 */
export const createFormType: API.OperationMethod<
  CreateFormTypeInput,
  CreateFormTypeOutput,
  CreateFormTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/form-types",
    input: {
      domainIdentifier: 0,
      name: 0,
      model: { smithy: 0 },
      owningProjectIdentifier: 0,
      status: 0,
      description: 0,
    },
    output: { name: D.secret, description: D.secret },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFormType",
})) as any;

export type CreateGlossaryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon DataZone business glossary.
 *
 * Specifies that this is a create glossary policy.
 *
 * A glossary serves as the central repository for business terminology and definitions within an organization. It helps establish and maintain a common language across different departments and teams, reducing miscommunication and ensuring consistent interpretation of business concepts. Glossaries can include hierarchical relationships between terms, cross-references, and links to actual data assets, making them invaluable for both business users and technical teams trying to understand and use data correctly.
 *
 * Prerequisites:
 *
 * - Domain must exist and be in an active state.
 *
 * - Owning project must exist and be accessible by the caller.
 *
 * - The glossary name must be unique within the domain.
 */
export const createGlossary: API.OperationMethod<
  CreateGlossaryInput,
  CreateGlossaryOutput,
  CreateGlossaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/glossaries",
    input: {
      domainIdentifier: 0,
      name: 0,
      owningProjectIdentifier: 0,
      description: 0,
      status: 0,
      usageRestrictions: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { name: D.secret, description: D.secret },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGlossary",
})) as any;

export type CreateGlossaryTermError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a business glossary term.
 *
 * A glossary term represents an individual entry within the Amazon DataZone glossary, serving as a standardized definition for a specific business concept or data element. Each term can include rich metadata such as detailed definitions, synonyms, related terms, and usage examples. Glossary terms can be linked directly to data assets, providing business context to technical data elements. This linking capability helps users understand the business meaning of data fields and ensures consistent interpretation across different systems and teams. Terms can also have relationships with other terms, creating a semantic network that reflects the complexity of business concepts.
 *
 * Prerequisites:
 *
 * - Domain must exist.
 *
 * - Glossary must exist.
 *
 * - The term name must be unique within the glossary.
 *
 * - Ensure term does not conflict with existing terms in hierarchy.
 */
export const createGlossaryTerm: API.OperationMethod<
  CreateGlossaryTermInput,
  CreateGlossaryTermOutput,
  CreateGlossaryTermError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/glossary-terms",
    input: {
      domainIdentifier: 0,
      glossaryIdentifier: 0,
      name: 0,
      status: 0,
      shortDescription: 0,
      longDescription: 0,
      termRelations: i_TermRelations,
      clientToken: D.m({ idempotency: true }),
    },
    output: {
      name: D.secret,
      shortDescription: D.secret,
      longDescription: D.secret,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGlossaryTerm",
})) as any;

export type CreateGroupProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates a group profile in Amazon DataZone.
 */
export const createGroupProfile: API.OperationMethod<
  CreateGroupProfileInput,
  CreateGroupProfileOutput,
  CreateGroupProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/group-profiles",
    input: {
      domainIdentifier: 0,
      groupIdentifier: 0,
      rolePrincipalArn: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { groupName: D.secret },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGroupProfile",
})) as any;

export type CreateListingChangeSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Publishes a listing (a record of an asset at a given time) or removes a listing from the catalog.
 */
export const createListingChangeSet: API.OperationMethod<
  CreateListingChangeSetInput,
  CreateListingChangeSetOutput,
  CreateListingChangeSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/listings/change-set",
    input: {
      domainIdentifier: 0,
      entityIdentifier: 0,
      entityType: 0,
      entityRevision: 0,
      action: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateListingChangeSet",
})) as any;

export type CreateNotebookError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a notebook in Amazon SageMaker Unified Studio. A notebook is a collaborative document within a project that contains code cells for interactive computing.
 */
export const createNotebook: API.OperationMethod<
  CreateNotebookInput,
  CreateNotebookOutput,
  CreateNotebookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/notebooks",
    input: {
      domainIdentifier: 0,
      owningProjectIdentifier: 0,
      name: 0,
      description: 0,
      metadata: 0,
      parameters: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: {
      name: D.secret,
      description: D.secret,
      createdAt: D.ts,
      updatedAt: D.ts,
      lockedAt: D.ts,
      lockExpiresAt: D.ts,
      metadata: D.map(D.secret),
      gitMetadata: o_GitMetadata,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNotebook",
})) as any;

export type CreateProjectError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon DataZone project.
 */
export const createProject: API.OperationMethod<
  CreateProjectInput,
  CreateProjectOutput,
  CreateProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/projects",
    input: {
      domainIdentifier: 0,
      name: 0,
      description: 0,
      resourceTags: 0,
      glossaryTerms: 0,
      domainUnitId: 0,
      projectProfileId: 0,
      userParameters: D.list(i_EnvironmentConfigurationUserParameter),
      projectCategory: 0,
      projectExecutionRole: 0,
      membershipAssignments: D.list({ member: i_Member, designation: 0 }),
    },
    output: {
      name: D.secret,
      description: D.secret,
      createdAt: D.ts,
      lastUpdatedAt: D.ts,
      userParameters: D.list(o_EnvironmentConfigurationUserParameter),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProject",
})) as any;

export type CreateProjectMembershipError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates a project membership in Amazon DataZone.
 */
export const createProjectMembership: API.OperationMethod<
  CreateProjectMembershipInput,
  CreateProjectMembershipOutput,
  CreateProjectMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/projects/{projectIdentifier}/createMembership",
    input: {
      domainIdentifier: 0,
      projectIdentifier: 0,
      member: i_Member,
      designation: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProjectMembership",
})) as any;

export type CreateProjectProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a project profile.
 */
export const createProjectProfile: API.OperationMethod<
  CreateProjectProfileInput,
  CreateProjectProfileOutput,
  CreateProjectProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/project-profiles",
    input: {
      domainIdentifier: 0,
      name: 0,
      description: 0,
      status: 0,
      projectResourceTags: D.list(i_ResourceTagParameter),
      allowCustomProjectResourceTags: 0,
      projectResourceTagsDescription: 0,
      environmentConfigurations: D.list(i_EnvironmentConfiguration),
      domainUnitIdentifier: 0,
    },
    output: {
      name: D.secret,
      description: D.secret,
      projectResourceTagsDescription: D.secret,
      environmentConfigurations: D.list(o_EnvironmentConfiguration),
      createdAt: D.ts,
      lastUpdatedAt: D.ts,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProjectProfile",
})) as any;

export type CreateRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a rule in Amazon DataZone. A rule is a formal agreement that enforces specific requirements across user workflows (e.g., publishing assets to the catalog, requesting subscriptions, creating projects) within the Amazon DataZone data portal. These rules help maintain consistency, ensure compliance, and uphold governance standards in data management processes. For instance, a metadata enforcement rule can specify the required information for creating a subscription request or publishing a data asset to the catalog, ensuring alignment with organizational standards.
 */
export const createRule: API.OperationMethod<
  CreateRuleInput,
  CreateRuleOutput,
  CreateRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/rules",
    input: {
      domainIdentifier: 0,
      name: 0,
      target: {
        domainUnitTarget: { domainUnitId: 0, includeChildDomainUnits: 0 },
      },
      action: 0,
      scope: i_RuleScope,
      detail: i_RuleDetail,
      description: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { name: D.secret, description: D.secret, createdAt: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRule",
})) as any;

export type CreateSubscriptionGrantError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a subsscription grant in Amazon DataZone.
 */
export const createSubscriptionGrant: API.OperationMethod<
  CreateSubscriptionGrantInput,
  CreateSubscriptionGrantOutput,
  CreateSubscriptionGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/subscription-grants",
    input: {
      domainIdentifier: 0,
      environmentIdentifier: 0,
      subscriptionTargetIdentifier: 0,
      grantedEntity: { listing: { identifier: 0, revision: 0 } },
      assetTargetNames: D.list({ assetId: 0, targetName: 0 }),
      clientToken: D.m({ idempotency: true }),
    },
    output: {
      createdAt: D.ts,
      updatedAt: D.ts,
      assets: D.list(o_SubscribedAsset),
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
  operationName: "CreateSubscriptionGrant",
})) as any;

export type CreateSubscriptionRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a subscription request in Amazon DataZone.
 */
export const createSubscriptionRequest: API.OperationMethod<
  CreateSubscriptionRequestInput,
  CreateSubscriptionRequestOutput,
  CreateSubscriptionRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/subscription-requests",
    input: {
      domainIdentifier: 0,
      subscribedPrincipals: D.list({
        project: { identifier: 0 },
        user: { identifier: 0 },
        group: { identifier: 0 },
        iam: { identifier: 0 },
      }),
      subscribedListings: D.list({ identifier: 0 }),
      requestReason: 0,
      clientToken: D.m({ idempotency: true }),
      metadataForms: D.list(i_FormInput),
      assetPermissions: D.list(i_AssetPermission),
      assetScopes: D.list(i_AcceptedAssetScope),
    },
    output: {
      createdAt: D.ts,
      updatedAt: D.ts,
      requestReason: D.secret,
      subscribedPrincipals: D.list(o_SubscribedPrincipal),
      subscribedListings: D.list(o_SubscribedListing),
      decisionComment: D.secret,
      metadataForms: D.list(o_FormOutput),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSubscriptionRequest",
})) as any;

export type CreateSubscriptionTargetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a subscription target in Amazon DataZone.
 */
export const createSubscriptionTarget: API.OperationMethod<
  CreateSubscriptionTargetInput,
  CreateSubscriptionTargetOutput,
  CreateSubscriptionTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/subscription-targets",
    input: {
      domainIdentifier: 0,
      environmentIdentifier: 0,
      name: 0,
      type: 0,
      subscriptionTargetConfig: D.list(i_SubscriptionTargetForm),
      authorizedPrincipals: 0,
      manageAccessRole: 0,
      applicableAssetTypes: 0,
      provider: 0,
      clientToken: D.m({ idempotency: true }),
      subscriptionGrantCreationMode: 0,
    },
    output: { name: D.secret, createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "CreateSubscriptionTarget",
})) as any;

export type CreateUserProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates a user profile in Amazon DataZone.
 */
export const createUserProfile: API.OperationMethod<
  CreateUserProfileInput,
  CreateUserProfileOutput,
  CreateUserProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/user-profiles",
    input: {
      domainIdentifier: 0,
      userIdentifier: 0,
      userType: 0,
      sessionName: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { details: o_UserProfileDetails },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUserProfile",
})) as any;

export type DeleteAccountPoolError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an account pool.
 */
export const deleteAccountPool: API.OperationMethod<
  DeleteAccountPoolInput,
  DeleteAccountPoolOutput,
  DeleteAccountPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/domains/{domainIdentifier}/account-pools/{identifier}",
    input: { domainIdentifier: 0, identifier: 0 },
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
  operationName: "DeleteAccountPool",
})) as any;

export type DeleteAssetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an asset in Amazon DataZone.
 *
 * - --domain-identifier must refer to a valid and existing domain.
 *
 * - --identifier must refer to an existing asset in the specified domain.
 *
 * - Asset must not be referenced in any existing asset filters.
 *
 * - Asset must not be linked to any draft or published data product.
 *
 * - User must have delete permissions for the domain and project.
 */
export const deleteAsset: API.OperationMethod<
  DeleteAssetInput,
  DeleteAssetOutput,
  DeleteAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/domains/{domainIdentifier}/assets/{identifier}",
    input: { domainIdentifier: 0, identifier: 0 },
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
  operationName: "DeleteAsset",
})) as any;

export type DeleteAssetFilterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an asset filter.
 *
 * Prerequisites:
 *
 * - The asset filter must exist.
 *
 * - The domain and asset must not have been deleted.
 *
 * - Ensure the --identifier refers to a valid filter ID.
 */
export const deleteAssetFilter: API.OperationMethod<
  DeleteAssetFilterInput,
  DeleteAssetFilterResponse,
  DeleteAssetFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/domains/{domainIdentifier}/assets/{assetIdentifier}/filters/{identifier}",
    input: { domainIdentifier: 0, assetIdentifier: 0, identifier: 0 },
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
  operationName: "DeleteAssetFilter",
})) as any;

export type DeleteAssetTypeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an asset type in Amazon DataZone.
 *
 * Prerequisites:
 *
 * - The asset type must exist in the domain.
 *
 * - You must have DeleteAssetType permission.
 *
 * - The asset type must not be in use (e.g., assigned to any asset). If used, deletion will fail.
 *
 * - You should retrieve the asset type using get-asset-type to confirm its presence before deletion.
 */
export const deleteAssetType: API.OperationMethod<
  DeleteAssetTypeInput,
  DeleteAssetTypeOutput,
  DeleteAssetTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/domains/{domainIdentifier}/asset-types/{identifier}",
    input: { domainIdentifier: 0, identifier: 0 },
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
  operationName: "DeleteAssetType",
})) as any;

export type DeleteConnectionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes and connection. In Amazon DataZone, a connection enables you to connect your resources (domains, projects, and environments) to external resources and services.
 */
export const deleteConnection: API.OperationMethod<
  DeleteConnectionInput,
  DeleteConnectionOutput,
  DeleteConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/domains/{domainIdentifier}/connections/{identifier}",
    input: { domainIdentifier: 0, identifier: 0 },
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
  operationName: "DeleteConnection",
})) as any;

export type DeleteDataExportConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes data export configuration for a domain.
 *
 * This operation does not delete the S3 table created by the PutDataExportConfiguration operation.
 *
 * To temporarily disable export without deleting the configuration, use the PutDataExportConfiguration operation with the `--no-enable-export` flag instead. This allows you to re-enable export for the same domain using the `--enable-export` flag without deleting S3 table.
 */
export const deleteDataExportConfiguration: API.OperationMethod<
  DeleteDataExportConfigurationInput,
  DeleteDataExportConfigurationOutput,
  DeleteDataExportConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/domains/{domainIdentifier}/data-export-configuration",
    input: { domainIdentifier: 0 },
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
  operationName: "DeleteDataExportConfiguration",
})) as any;

export type DeleteDataProductError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a data product in Amazon DataZone.
 *
 * Prerequisites:
 *
 * - The data product must exist and not be deleted or archived.
 *
 * - The user must have delete permissions for the data product.
 *
 * - Domain and project must be active.
 */
export const deleteDataProduct: API.OperationMethod<
  DeleteDataProductInput,
  DeleteDataProductOutput,
  DeleteDataProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/domains/{domainIdentifier}/data-products/{identifier}",
    input: { domainIdentifier: 0, identifier: 0 },
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
  operationName: "DeleteDataProduct",
})) as any;

export type DeleteDataSourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a data source in Amazon DataZone.
 */
export const deleteDataSource: API.OperationMethod<
  DeleteDataSourceInput,
  DeleteDataSourceOutput,
  DeleteDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/domains/{domainIdentifier}/data-sources/{identifier}",
    input: {
      domainIdentifier: 0,
      identifier: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
      retainPermissionsOnRevokeFailure: D.m({
        query: "retainPermissionsOnRevokeFailure",
      }),
    },
    output: {
      name: D.secret,
      description: D.secret,
      assetFormsOutput: D.list(o_FormOutput),
      lastRunAt: D.ts,
      createdAt: D.ts,
      updatedAt: D.ts,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataSource",
})) as any;

export type DeleteDomainError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a Amazon DataZone domain.
 */
export const deleteDomain: API.OperationMethod<
  DeleteDomainInput,
  DeleteDomainOutput,
  DeleteDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/domains/{identifier}",
    input: {
      identifier: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
      skipDeletionCheck: D.m({ query: "skipDeletionCheck" }),
      cascadeDelete: D.m({ query: "cascadeDelete" }),
    },
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
  operationName: "DeleteDomain",
})) as any;

export type DeleteDomainUnitError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a domain unit.
 */
export const deleteDomainUnit: API.OperationMethod<
  DeleteDomainUnitInput,
  DeleteDomainUnitOutput,
  DeleteDomainUnitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/domains/{domainIdentifier}/domain-units/{identifier}",
    input: { domainIdentifier: 0, identifier: 0 },
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
  operationName: "DeleteDomainUnit",
})) as any;

export type DeleteEnvironmentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an environment in Amazon DataZone.
 */
export const deleteEnvironment: API.OperationMethod<
  DeleteEnvironmentInput,
  DeleteEnvironmentResponse,
  DeleteEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/domains/{domainIdentifier}/environments/{identifier}",
    input: { domainIdentifier: 0, identifier: 0 },
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
  operationName: "DeleteEnvironment",
})) as any;

export type DeleteEnvironmentActionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an action for the environment, for example, deletes a console link for an analytics tool that is available in this environment.
 */
export const deleteEnvironmentAction: API.OperationMethod<
  DeleteEnvironmentActionInput,
  DeleteEnvironmentActionResponse,
  DeleteEnvironmentActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/actions/{identifier}",
    input: { domainIdentifier: 0, environmentIdentifier: 0, identifier: 0 },
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
  operationName: "DeleteEnvironmentAction",
})) as any;

export type DeleteEnvironmentBlueprintError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a blueprint in Amazon DataZone.
 */
export const deleteEnvironmentBlueprint: API.OperationMethod<
  DeleteEnvironmentBlueprintInput,
  DeleteEnvironmentBlueprintResponse,
  DeleteEnvironmentBlueprintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/domains/{domainIdentifier}/environment-blueprints/{identifier}",
    input: { domainIdentifier: 0, identifier: 0 },
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
  operationName: "DeleteEnvironmentBlueprint",
})) as any;

export type DeleteEnvironmentBlueprintConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the blueprint configuration in Amazon DataZone.
 */
export const deleteEnvironmentBlueprintConfiguration: API.OperationMethod<
  DeleteEnvironmentBlueprintConfigurationInput,
  DeleteEnvironmentBlueprintConfigurationOutput,
  DeleteEnvironmentBlueprintConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/domains/{domainIdentifier}/environment-blueprint-configurations/{environmentBlueprintIdentifier}",
    input: { domainIdentifier: 0, environmentBlueprintIdentifier: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ValidationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEnvironmentBlueprintConfiguration",
})) as any;

export type DeleteEnvironmentProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an environment profile in Amazon DataZone.
 */
export const deleteEnvironmentProfile: API.OperationMethod<
  DeleteEnvironmentProfileInput,
  DeleteEnvironmentProfileResponse,
  DeleteEnvironmentProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/domains/{domainIdentifier}/environment-profiles/{identifier}",
    input: { domainIdentifier: 0, identifier: 0 },
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
  operationName: "DeleteEnvironmentProfile",
})) as any;

export type DeleteFormTypeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes and metadata form type in Amazon DataZone.
 *
 * Prerequisites:
 *
 * - The form type must exist in the domain.
 *
 * - The form type must not be in use by any asset types or assets.
 *
 * - The domain must be valid and accessible.
 *
 * - User must have delete permissions on the form type.
 *
 * - Any dependencies (such as linked asset types) must be removed first.
 */
export const deleteFormType: API.OperationMethod<
  DeleteFormTypeInput,
  DeleteFormTypeOutput,
  DeleteFormTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/domains/{domainIdentifier}/form-types/{formTypeIdentifier}",
    input: { domainIdentifier: 0, formTypeIdentifier: 0 },
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
  operationName: "DeleteFormType",
})) as any;

export type DeleteGlossaryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a business glossary in Amazon DataZone.
 *
 * Prerequisites:
 *
 * - The glossary must be in DISABLED state.
 *
 * - The glossary must not have any glossary terms associated with it.
 *
 * - The glossary must exist in the specified domain.
 *
 * - The caller must have the `datazone:DeleteGlossary` permission in the domain and glossary.
 *
 * - Glossary should not be linked to any active metadata forms.
 */
export const deleteGlossary: API.OperationMethod<
  DeleteGlossaryInput,
  DeleteGlossaryOutput,
  DeleteGlossaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/domains/{domainIdentifier}/glossaries/{identifier}",
    input: { domainIdentifier: 0, identifier: 0 },
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
  operationName: "DeleteGlossary",
})) as any;

export type DeleteGlossaryTermError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a business glossary term in Amazon DataZone.
 *
 * Prerequisites:
 *
 * - Glossary term must exist and be active.
 *
 * - The term must not be linked to other assets or child terms.
 *
 * - Caller must have delete permissions in the domain/glossary.
 *
 * - Ensure all associations (such as to assets or parent terms) are removed before deletion.
 */
export const deleteGlossaryTerm: API.OperationMethod<
  DeleteGlossaryTermInput,
  DeleteGlossaryTermOutput,
  DeleteGlossaryTermError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/domains/{domainIdentifier}/glossary-terms/{identifier}",
    input: { domainIdentifier: 0, identifier: 0 },
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
  operationName: "DeleteGlossaryTerm",
})) as any;

export type DeleteLineageEventError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified lineage event.
 */
export const deleteLineageEvent: API.OperationMethod<
  DeleteLineageEventInput,
  DeleteLineageEventOutput,
  DeleteLineageEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/domains/{domainIdentifier}/lineage/events/{identifier}",
    input: { domainIdentifier: 0, identifier: 0 },
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
  operationName: "DeleteLineageEvent",
})) as any;

export type DeleteListingError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a listing (a record of an asset at a given time).
 */
export const deleteListing: API.OperationMethod<
  DeleteListingInput,
  DeleteListingOutput,
  DeleteListingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/domains/{domainIdentifier}/listings/{identifier}",
    input: { domainIdentifier: 0, identifier: 0 },
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
  operationName: "DeleteListing",
})) as any;

export type DeleteNotebookError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a notebook in Amazon SageMaker Unified Studio.
 */
export const deleteNotebook: API.OperationMethod<
  DeleteNotebookInput,
  DeleteNotebookOutput,
  DeleteNotebookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/domains/{domainIdentifier}/notebooks/{identifier}",
    input: { domainIdentifier: 0, identifier: 0 },
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
  operationName: "DeleteNotebook",
})) as any;

export type DeleteProjectError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a project in Amazon DataZone.
 */
export const deleteProject: API.OperationMethod<
  DeleteProjectInput,
  DeleteProjectOutput,
  DeleteProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/domains/{domainIdentifier}/projects/{identifier}",
    input: {
      domainIdentifier: 0,
      identifier: 0,
      skipDeletionCheck: D.m({ query: "skipDeletionCheck" }),
    },
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
  operationName: "DeleteProject",
})) as any;

export type DeleteProjectMembershipError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes project membership in Amazon DataZone.
 */
export const deleteProjectMembership: API.OperationMethod<
  DeleteProjectMembershipInput,
  DeleteProjectMembershipOutput,
  DeleteProjectMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/projects/{projectIdentifier}/deleteMembership",
    input: { domainIdentifier: 0, projectIdentifier: 0, member: i_Member },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProjectMembership",
})) as any;

export type DeleteProjectProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a project profile.
 */
export const deleteProjectProfile: API.OperationMethod<
  DeleteProjectProfileInput,
  DeleteProjectProfileOutput,
  DeleteProjectProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/domains/{domainIdentifier}/project-profiles/{identifier}",
    input: { domainIdentifier: 0, identifier: 0 },
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
  operationName: "DeleteProjectProfile",
})) as any;

export type DeleteRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a rule in Amazon DataZone. A rule is a formal agreement that enforces specific requirements across user workflows (e.g., publishing assets to the catalog, requesting subscriptions, creating projects) within the Amazon DataZone data portal. These rules help maintain consistency, ensure compliance, and uphold governance standards in data management processes. For instance, a metadata enforcement rule can specify the required information for creating a subscription request or publishing a data asset to the catalog, ensuring alignment with organizational standards.
 */
export const deleteRule: API.OperationMethod<
  DeleteRuleInput,
  DeleteRuleOutput,
  DeleteRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/domains/{domainIdentifier}/rules/{identifier}",
    input: { domainIdentifier: 0, identifier: 0 },
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
  operationName: "DeleteRule",
})) as any;

export type DeleteSubscriptionGrantError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes and subscription grant in Amazon DataZone.
 */
export const deleteSubscriptionGrant: API.OperationMethod<
  DeleteSubscriptionGrantInput,
  DeleteSubscriptionGrantOutput,
  DeleteSubscriptionGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/domains/{domainIdentifier}/subscription-grants/{identifier}",
    input: { domainIdentifier: 0, identifier: 0 },
    output: {
      createdAt: D.ts,
      updatedAt: D.ts,
      assets: D.list(o_SubscribedAsset),
    },
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
  operationName: "DeleteSubscriptionGrant",
})) as any;

export type DeleteSubscriptionRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a subscription request in Amazon DataZone.
 */
export const deleteSubscriptionRequest: API.OperationMethod<
  DeleteSubscriptionRequestInput,
  DeleteSubscriptionRequestResponse,
  DeleteSubscriptionRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/domains/{domainIdentifier}/subscription-requests/{identifier}",
    input: { domainIdentifier: 0, identifier: 0 },
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
  operationName: "DeleteSubscriptionRequest",
})) as any;

export type DeleteSubscriptionTargetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a subscription target in Amazon DataZone.
 */
export const deleteSubscriptionTarget: API.OperationMethod<
  DeleteSubscriptionTargetInput,
  DeleteSubscriptionTargetResponse,
  DeleteSubscriptionTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/subscription-targets/{identifier}",
    input: { domainIdentifier: 0, environmentIdentifier: 0, identifier: 0 },
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
  operationName: "DeleteSubscriptionTarget",
})) as any;

export type DeleteTimeSeriesDataPointsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified time series form for the specified asset.
 */
export const deleteTimeSeriesDataPoints: API.OperationMethod<
  DeleteTimeSeriesDataPointsInput,
  DeleteTimeSeriesDataPointsOutput,
  DeleteTimeSeriesDataPointsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/domains/{domainIdentifier}/entities/{entityType}/{entityIdentifier}/time-series-data-points",
    input: {
      domainIdentifier: 0,
      entityIdentifier: 0,
      entityType: 0,
      formName: D.m({ query: "formName" }),
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
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
  operationName: "DeleteTimeSeriesDataPoints",
})) as any;

export type DisassociateEnvironmentRoleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates the environment role in Amazon DataZone.
 */
export const disassociateEnvironmentRole: API.OperationMethod<
  DisassociateEnvironmentRoleInput,
  DisassociateEnvironmentRoleOutput,
  DisassociateEnvironmentRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/roles/{environmentRoleArn}",
    input: {
      domainIdentifier: 0,
      environmentIdentifier: 0,
      environmentRoleArn: 0,
    },
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
  operationName: "DisassociateEnvironmentRole",
})) as any;

export type DisassociateGovernedTermsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates restricted terms from an asset.
 */
export const disassociateGovernedTerms: API.OperationMethod<
  DisassociateGovernedTermsInput,
  DisassociateGovernedTermsOutput,
  DisassociateGovernedTermsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /v2/domains/{domainIdentifier}/entities/{entityType}/{entityIdentifier}/disassociate-governed-terms",
    input: {
      domainIdentifier: 0,
      entityIdentifier: 0,
      entityType: 0,
      governedGlossaryTerms: 0,
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
  operationName: "DisassociateGovernedTerms",
})) as any;

export type GetAccountPoolError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of the account pool.
 */
export const getAccountPool: API.OperationMethod<
  GetAccountPoolInput,
  GetAccountPoolOutput,
  GetAccountPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/account-pools/{identifier}",
    input: { domainIdentifier: 0, identifier: 0 },
    output: {
      name: D.secret,
      description: D.secret,
      accountSource: o_AccountSource,
      createdAt: D.ts,
      lastUpdatedAt: D.ts,
    },
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
  operationName: "GetAccountPool",
})) as any;

export type GetAssetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets an Amazon DataZone asset.
 *
 * An asset is the fundamental building block in Amazon DataZone, representing any data resource that needs to be cataloged and managed. It can take many forms, from Amazon S3 buckets and database tables to dashboards and machine learning models. Each asset contains comprehensive metadata about the resource, including its location, schema, ownership, and lineage information. Assets are essential for organizing and managing data resources across an organization, making them discoverable and usable while maintaining proper governance.
 *
 * Before using the Amazon DataZone GetAsset command, ensure the following prerequisites are met:
 *
 * - Domain identifier must exist and be valid
 *
 * - Asset identifier must exist
 *
 * - User must have the required permissions to perform the action
 */
export const getAsset: API.OperationMethod<
  GetAssetInput,
  GetAssetOutput,
  GetAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/assets/{identifier}",
    input: {
      domainIdentifier: 0,
      identifier: 0,
      revision: D.m({ query: "revision" }),
    },
    output: {
      name: D.secret,
      description: D.secret,
      createdAt: D.ts,
      firstRevisionCreatedAt: D.ts,
      formsOutput: D.list(o_FormOutput),
      readOnlyFormsOutput: D.list(o_FormOutput),
      latestTimeSeriesDataPointFormsOutput: D.list(
        o_TimeSeriesDataPointSummaryFormOutput,
      ),
    },
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
  operationName: "GetAsset",
})) as any;

export type GetAssetFilterError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets an asset filter.
 *
 * Prerequisites:
 *
 * - Domain (`--domain-identifier`), asset (`--asset-identifier`), and filter (`--identifier`) must all exist.
 *
 * - The asset filter should not have been deleted.
 *
 * - The asset must still exist (since the filter is linked to it).
 */
export const getAssetFilter: API.OperationMethod<
  GetAssetFilterInput,
  GetAssetFilterOutput,
  GetAssetFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/assets/{assetIdentifier}/filters/{identifier}",
    input: { domainIdentifier: 0, assetIdentifier: 0, identifier: 0 },
    output: { name: D.secret, description: D.secret, createdAt: D.ts },
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
  operationName: "GetAssetFilter",
})) as any;

export type GetAssetTypeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets an Amazon DataZone asset type.
 *
 * Asset types define the categories and characteristics of different kinds of data assets within Amazon DataZone.. They determine what metadata fields are required, what operations are possible, and how the asset integrates with other Amazon Web Services services. Asset types can range from built-in types like Amazon S3 buckets and Amazon Web Services Glue tables to custom types defined for specific organizational needs. Understanding asset types is crucial for properly organizing and managing different kinds of data resources.
 *
 * Prerequisites:
 *
 * - The asset type with identifier must exist in the domain. ResourceNotFoundException.
 *
 * - You must have the GetAssetType permission.
 *
 * - Ensure the domain-identifier value is correct and accessible.
 */
export const getAssetType: API.OperationMethod<
  GetAssetTypeInput,
  GetAssetTypeOutput,
  GetAssetTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/asset-types/{identifier}",
    input: {
      domainIdentifier: 0,
      identifier: 0,
      revision: D.m({ query: "revision" }),
    },
    output: {
      description: D.secret,
      formsOutput: D.map(o_FormEntryOutput),
      createdAt: D.ts,
      updatedAt: D.ts,
    },
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
  operationName: "GetAssetType",
})) as any;

export type GetConnectionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a connection. In Amazon DataZone, a connection enables you to connect your resources (domains, projects, and environments) to external resources and services.
 */
export const getConnection: API.OperationMethod<
  GetConnectionInput,
  GetConnectionOutput,
  GetConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/connections/{identifier}",
    input: {
      domainIdentifier: 0,
      identifier: 0,
      withSecret: D.m({ query: "withSecret" }),
    },
    output: {
      connectionCredentials: {
        secretAccessKey: D.secret,
        sessionToken: D.secret,
        expiration: D.ts,
      },
      description: D.secret,
      physicalEndpoints: D.list(o_PhysicalEndpoint),
      props: o_ConnectionPropertiesOutput,
    },
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
  operationName: "GetConnection",
})) as any;

export type GetDataExportConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets data export configuration details.
 */
export const getDataExportConfiguration: API.OperationMethod<
  GetDataExportConfigurationInput,
  GetDataExportConfigurationOutput,
  GetDataExportConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/data-export-configuration",
    input: { domainIdentifier: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetDataExportConfiguration",
})) as any;

export type GetDataProductError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the data product.
 *
 * Prerequisites:
 *
 * - The data product ID must exist.
 *
 * - The domain must be valid and accessible.
 *
 * - User must have read or discovery permissions for the data product.
 */
export const getDataProduct: API.OperationMethod<
  GetDataProductInput,
  GetDataProductOutput,
  GetDataProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/data-products/{identifier}",
    input: {
      domainIdentifier: 0,
      identifier: 0,
      revision: D.m({ query: "revision" }),
    },
    output: {
      name: D.secret,
      description: D.secret,
      formsOutput: D.list(o_FormOutput),
      createdAt: D.ts,
      firstRevisionCreatedAt: D.ts,
    },
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
  operationName: "GetDataProduct",
})) as any;

export type GetDataSourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets an Amazon DataZone data source.
 */
export const getDataSource: API.OperationMethod<
  GetDataSourceInput,
  GetDataSourceOutput,
  GetDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/data-sources/{identifier}",
    input: { domainIdentifier: 0, identifier: 0 },
    output: {
      name: D.secret,
      description: D.secret,
      assetFormsOutput: D.list(o_FormOutput),
      lastRunAt: D.ts,
      createdAt: D.ts,
      updatedAt: D.ts,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataSource",
})) as any;

export type GetDataSourceRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets an Amazon DataZone data source run.
 */
export const getDataSourceRun: API.OperationMethod<
  GetDataSourceRunInput,
  GetDataSourceRunOutput,
  GetDataSourceRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/data-source-runs/{identifier}",
    input: { domainIdentifier: 0, identifier: 0 },
    output: {
      createdAt: D.ts,
      updatedAt: D.ts,
      startedAt: D.ts,
      stoppedAt: D.ts,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataSourceRun",
})) as any;

export type GetDomainError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets an Amazon DataZone domain.
 */
export const getDomain: API.OperationMethod<
  GetDomainInput,
  GetDomainOutput,
  GetDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{identifier}",
    input: { identifier: 0 },
    output: { createdAt: D.ts, lastUpdatedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomain",
})) as any;

export type GetDomainUnitError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of the specified domain unit.
 */
export const getDomainUnit: API.OperationMethod<
  GetDomainUnitInput,
  GetDomainUnitOutput,
  GetDomainUnitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/domain-units/{identifier}",
    input: { domainIdentifier: 0, identifier: 0 },
    output: {
      name: D.secret,
      description: D.secret,
      createdAt: D.ts,
      lastUpdatedAt: D.ts,
    },
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
  operationName: "GetDomainUnit",
})) as any;

export type GetEnvironmentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets an Amazon DataZone environment.
 */
export const getEnvironment: API.OperationMethod<
  GetEnvironmentInput,
  GetEnvironmentOutput,
  GetEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/environments/{identifier}",
    input: { domainIdentifier: 0, identifier: 0 },
    output: {
      createdAt: D.ts,
      updatedAt: D.ts,
      name: D.secret,
      description: D.secret,
      userParameters: D.list(o_CustomParameter),
      environmentConfigurationId: D.secret,
      environmentConfigurationName: D.secret,
    },
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
  operationName: "GetEnvironment",
})) as any;

export type GetEnvironmentActionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the specified environment action.
 */
export const getEnvironmentAction: API.OperationMethod<
  GetEnvironmentActionInput,
  GetEnvironmentActionOutput,
  GetEnvironmentActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/actions/{identifier}",
    input: { domainIdentifier: 0, environmentIdentifier: 0, identifier: 0 },
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
  operationName: "GetEnvironmentAction",
})) as any;

export type GetEnvironmentBlueprintError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets an Amazon DataZone blueprint.
 */
export const getEnvironmentBlueprint: API.OperationMethod<
  GetEnvironmentBlueprintInput,
  GetEnvironmentBlueprintOutput,
  GetEnvironmentBlueprintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/environment-blueprints/{identifier}",
    input: { domainIdentifier: 0, identifier: 0 },
    output: {
      description: D.secret,
      userParameters: D.list(o_CustomParameter),
      createdAt: D.ts,
      updatedAt: D.ts,
    },
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
  operationName: "GetEnvironmentBlueprint",
})) as any;

export type GetEnvironmentBlueprintConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets the blueprint configuration in Amazon DataZone.
 */
export const getEnvironmentBlueprintConfiguration: API.OperationMethod<
  GetEnvironmentBlueprintConfigurationInput,
  GetEnvironmentBlueprintConfigurationOutput,
  GetEnvironmentBlueprintConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/environment-blueprint-configurations/{environmentBlueprintIdentifier}",
    input: { domainIdentifier: 0, environmentBlueprintIdentifier: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironmentBlueprintConfiguration",
})) as any;

export type GetEnvironmentCredentialsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the credentials of an environment in Amazon DataZone.
 */
export const getEnvironmentCredentials: API.OperationMethod<
  GetEnvironmentCredentialsInput,
  GetEnvironmentCredentialsOutput,
  GetEnvironmentCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/credentials",
    input: { domainIdentifier: 0, environmentIdentifier: 0 },
    output: {
      secretAccessKey: D.secret,
      sessionToken: D.secret,
      expiration: D.ts,
    },
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
  operationName: "GetEnvironmentCredentials",
})) as any;

export type GetEnvironmentProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets an evinronment profile in Amazon DataZone.
 */
export const getEnvironmentProfile: API.OperationMethod<
  GetEnvironmentProfileInput,
  GetEnvironmentProfileOutput,
  GetEnvironmentProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/environment-profiles/{identifier}",
    input: { domainIdentifier: 0, identifier: 0 },
    output: {
      createdAt: D.ts,
      updatedAt: D.ts,
      name: D.secret,
      description: D.secret,
      userParameters: D.list(o_CustomParameter),
    },
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
  operationName: "GetEnvironmentProfile",
})) as any;

export type GetFormTypeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a metadata form type in Amazon DataZone.
 *
 * Form types define the structure and validation rules for collecting metadata about assets in Amazon DataZone. They act as templates that ensure consistent metadata capture across similar types of assets, while allowing for customization to meet specific organizational needs. Form types can include required fields, validation rules, and dependencies, helping maintain high-quality metadata that makes data assets more discoverable and usable.
 *
 * - The form type with the specified identifier must exist in the given domain.
 *
 * - The domain must be valid and active.
 *
 * - User must have permission on the form type.
 *
 * - The form type should not be deleted or in an invalid state.
 *
 * One use case for this API is to determine whether a form field is indexed for search.
 *
 * A searchable field will be annotated with `@amazon.datazone#searchable`. By default, searchable fields are indexed for semantic search, where related query terms will match the attribute value even if they are not stemmed or keyword matches. If a field is indexed technical identifier search, it will be annotated with `@amazon.datazone#searchable(modes:["TECHNICAL"])`. If a field is indexed for lexical search (supports stemmed and prefix matches but not semantic matches), it will be annotated with `@amazon.datazone#searchable(modes:["LEXICAL"])`.
 *
 * A field storing glossary term IDs (which is filterable) will be annotated with `@amazon.datazone#glossaryterm("${glossaryId}")`.
 */
export const getFormType: API.OperationMethod<
  GetFormTypeInput,
  GetFormTypeOutput,
  GetFormTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/form-types/{formTypeIdentifier}",
    input: {
      domainIdentifier: 0,
      formTypeIdentifier: 0,
      revision: D.m({ query: "revision" }),
    },
    output: {
      name: D.secret,
      createdAt: D.ts,
      description: D.secret,
      imports: D.list(o_Import),
    },
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
  operationName: "GetFormType",
})) as any;

export type GetGlossaryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a business glossary in Amazon DataZone.
 *
 * Prerequisites:
 *
 * - The specified glossary ID must exist and be associated with the given domain.
 *
 * - The caller must have the `datazone:GetGlossary` permission on the domain.
 */
export const getGlossary: API.OperationMethod<
  GetGlossaryInput,
  GetGlossaryOutput,
  GetGlossaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/glossaries/{identifier}",
    input: { domainIdentifier: 0, identifier: 0 },
    output: {
      name: D.secret,
      description: D.secret,
      createdAt: D.ts,
      updatedAt: D.ts,
    },
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
  operationName: "GetGlossary",
})) as any;

export type GetGlossaryTermError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a business glossary term in Amazon DataZone.
 *
 * Prerequisites:
 *
 * - Glossary term with identifier must exist in the domain.
 *
 * - User must have permission on the glossary term.
 *
 * - Domain must be accessible and active.
 */
export const getGlossaryTerm: API.OperationMethod<
  GetGlossaryTermInput,
  GetGlossaryTermOutput,
  GetGlossaryTermError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/glossary-terms/{identifier}",
    input: { domainIdentifier: 0, identifier: 0 },
    output: {
      name: D.secret,
      shortDescription: D.secret,
      longDescription: D.secret,
      createdAt: D.ts,
      updatedAt: D.ts,
    },
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
  operationName: "GetGlossaryTerm",
})) as any;

export type GetGroupProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets a group profile in Amazon DataZone.
 */
export const getGroupProfile: API.OperationMethod<
  GetGroupProfileInput,
  GetGroupProfileOutput,
  GetGroupProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/group-profiles/{groupIdentifier}",
    input: { domainIdentifier: 0, groupIdentifier: 0 },
    output: { groupName: D.secret },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroupProfile",
})) as any;

export type GetIamPortalLoginUrlError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the data portal URL for the specified Amazon DataZone domain.
 */
export const getIamPortalLoginUrl: API.OperationMethod<
  GetIamPortalLoginUrlInput,
  GetIamPortalLoginUrlOutput,
  GetIamPortalLoginUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/get-portal-login-url",
    input: { domainIdentifier: 0 },
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
  operationName: "GetIamPortalLoginUrl",
})) as any;

export type GetJobRunError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The details of the job run.
 */
export const getJobRun: API.OperationMethod<
  GetJobRunInput,
  GetJobRunOutput,
  GetJobRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/jobRuns/{identifier}",
    input: { domainIdentifier: 0, identifier: 0 },
    output: {
      details: {
        lineageRunDetails: {
          sqlQueryRunDetails: { queryStartTime: D.ts, queryEndTime: D.ts },
        },
      },
      createdAt: D.ts,
      startTime: D.ts,
      endTime: D.ts,
    },
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
  operationName: "GetJobRun",
})) as any;

export type GetLineageEventError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the lineage event.
 */
export const getLineageEvent: API.OperationMethod<
  GetLineageEventInput,
  GetLineageEventOutput,
  GetLineageEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/lineage/events/{identifier}",
    input: { domainIdentifier: 0, identifier: 0 },
    output: {
      domainId: D.m({ header: "Domain-Id" }),
      id: D.m({ header: "Id" }),
      event: D.m({ payload: true, shape: D.stream }),
      createdBy: D.m({ header: "Created-By" }),
      processingStatus: D.m({ header: "Processing-Status" }),
      eventTime: D.m({ header: "Event-Time", shape: D.ts }),
      createdAt: D.m({ header: "Created-At", shape: D.ts }),
    },
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
  operationName: "GetLineageEvent",
})) as any;

export type GetLineageNodeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the data lineage node.
 */
export const getLineageNode: API.OperationMethod<
  GetLineageNodeInput,
  GetLineageNodeOutput,
  GetLineageNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/lineage/nodes/{identifier}",
    input: {
      domainIdentifier: 0,
      identifier: 0,
      eventTimestamp: D.m({
        query: "timestamp",
        shape: D.tsAs("epoch-seconds"),
      }),
    },
    output: {
      createdAt: D.ts,
      updatedAt: D.ts,
      eventTimestamp: D.ts,
      formsOutput: D.list(o_FormOutput),
      upstreamNodes: D.list(o_LineageNodeReference),
      downstreamNodes: D.list(o_LineageNodeReference),
    },
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
  operationName: "GetLineageNode",
})) as any;

export type GetListingError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a listing (a record of an asset at a given time). If you specify a listing version, only details that are specific to that version are returned.
 */
export const getListing: API.OperationMethod<
  GetListingInput,
  GetListingOutput,
  GetListingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/listings/{identifier}",
    input: {
      domainIdentifier: 0,
      identifier: 0,
      listingRevision: D.m({ query: "listingRevision" }),
    },
    output: {
      createdAt: D.ts,
      updatedAt: D.ts,
      item: {
        assetListing: {
          createdAt: D.ts,
          latestTimeSeriesDataPointForms: D.list(
            o_TimeSeriesDataPointSummaryFormOutput,
          ),
          glossaryTerms: D.list(o_DetailedGlossaryTerm),
          governedGlossaryTerms: D.list(o_DetailedGlossaryTerm),
        },
        dataProductListing: {
          createdAt: D.ts,
          glossaryTerms: D.list(o_DetailedGlossaryTerm),
          items: D.list({ glossaryTerms: D.list(o_DetailedGlossaryTerm) }),
        },
      },
      description: D.secret,
    },
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
  operationName: "GetListing",
})) as any;

export type GetMetadataGenerationRunError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a metadata generation run in Amazon DataZone.
 *
 * Prerequisites:
 *
 * - Valid domain and run identifier.
 *
 * - The metadata generation run must exist.
 *
 * - User must have read access to the metadata run.
 */
export const getMetadataGenerationRun: API.OperationMethod<
  GetMetadataGenerationRunInput,
  GetMetadataGenerationRunOutput,
  GetMetadataGenerationRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/metadata-generation-runs/{identifier}",
    input: { domainIdentifier: 0, identifier: 0, type: D.m({ query: "type" }) },
    output: { createdAt: D.ts },
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
  operationName: "GetMetadataGenerationRun",
})) as any;

export type GetNotebookError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of a notebook in Amazon SageMaker Unified Studio.
 */
export const getNotebook: API.OperationMethod<
  GetNotebookInput,
  GetNotebookOutput,
  GetNotebookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/notebooks/{identifier}",
    input: { domainIdentifier: 0, identifier: 0 },
    output: {
      name: D.secret,
      description: D.secret,
      createdAt: D.ts,
      updatedAt: D.ts,
      lockedAt: D.ts,
      lockExpiresAt: D.ts,
      metadata: D.map(D.secret),
      gitMetadata: o_GitMetadata,
    },
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
  operationName: "GetNotebook",
})) as any;

export type GetNotebookExportError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of a notebook export in Amazon SageMaker Unified Studio.
 */
export const getNotebookExport: API.OperationMethod<
  GetNotebookExportInput,
  GetNotebookExportOutput,
  GetNotebookExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/notebook-exports/{identifier}",
    input: { domainIdentifier: 0, identifier: 0 },
    output: {
      outputLocation: { s3: { uri: D.secret } },
      completedAt: D.ts,
      createdAt: D.ts,
    },
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
  operationName: "GetNotebookExport",
})) as any;

export type GetNotebookRunError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of a notebook run in Amazon SageMaker Unified Studio.
 */
export const getNotebookRun: API.OperationMethod<
  GetNotebookRunInput,
  GetNotebookRunOutput,
  GetNotebookRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/notebook-runs/{identifier}",
    input: { domainIdentifier: 0, identifier: 0 },
    output: {
      metadata: D.map(D.secret),
      createdAt: D.ts,
      updatedAt: D.ts,
      startedAt: D.ts,
      completedAt: D.ts,
    },
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
  operationName: "GetNotebookRun",
})) as any;

export type GetProjectError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a project in Amazon DataZone.
 */
export const getProject: API.OperationMethod<
  GetProjectInput,
  GetProjectOutput,
  GetProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/projects/{identifier}",
    input: { domainIdentifier: 0, identifier: 0 },
    output: {
      name: D.secret,
      description: D.secret,
      createdAt: D.ts,
      lastUpdatedAt: D.ts,
      userParameters: D.list(o_EnvironmentConfigurationUserParameter),
    },
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
  operationName: "GetProject",
})) as any;

export type GetProjectProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The details of the project profile.
 */
export const getProjectProfile: API.OperationMethod<
  GetProjectProfileInput,
  GetProjectProfileOutput,
  GetProjectProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/project-profiles/{identifier}",
    input: { domainIdentifier: 0, identifier: 0 },
    output: {
      name: D.secret,
      description: D.secret,
      projectResourceTagsDescription: D.secret,
      environmentConfigurations: D.list(o_EnvironmentConfiguration),
      createdAt: D.ts,
      lastUpdatedAt: D.ts,
    },
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
  operationName: "GetProjectProfile",
})) as any;

export type GetRuleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of a rule in Amazon DataZone. A rule is a formal agreement that enforces specific requirements across user workflows (e.g., publishing assets to the catalog, requesting subscriptions, creating projects) within the Amazon DataZone data portal. These rules help maintain consistency, ensure compliance, and uphold governance standards in data management processes. For instance, a metadata enforcement rule can specify the required information for creating a subscription request or publishing a data asset to the catalog, ensuring alignment with organizational standards.
 */
export const getRule: API.OperationMethod<
  GetRuleInput,
  GetRuleOutput,
  GetRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/rules/{identifier}",
    input: {
      domainIdentifier: 0,
      identifier: 0,
      revision: D.m({ query: "revision" }),
    },
    output: {
      name: D.secret,
      description: D.secret,
      createdAt: D.ts,
      updatedAt: D.ts,
    },
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
  operationName: "GetRule",
})) as any;

export type GetSubscriptionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a subscription in Amazon DataZone.
 */
export const getSubscription: API.OperationMethod<
  GetSubscriptionInput,
  GetSubscriptionOutput,
  GetSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/subscriptions/{identifier}",
    input: { domainIdentifier: 0, identifier: 0 },
    output: {
      createdAt: D.ts,
      updatedAt: D.ts,
      subscribedPrincipal: o_SubscribedPrincipal,
      subscribedListing: o_SubscribedListing,
    },
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
  operationName: "GetSubscription",
})) as any;

export type GetSubscriptionGrantError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the subscription grant in Amazon DataZone.
 */
export const getSubscriptionGrant: API.OperationMethod<
  GetSubscriptionGrantInput,
  GetSubscriptionGrantOutput,
  GetSubscriptionGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/subscription-grants/{identifier}",
    input: { domainIdentifier: 0, identifier: 0 },
    output: {
      createdAt: D.ts,
      updatedAt: D.ts,
      assets: D.list(o_SubscribedAsset),
    },
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
  operationName: "GetSubscriptionGrant",
})) as any;

export type GetSubscriptionRequestDetailsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of the specified subscription request.
 */
export const getSubscriptionRequestDetails: API.OperationMethod<
  GetSubscriptionRequestDetailsInput,
  GetSubscriptionRequestDetailsOutput,
  GetSubscriptionRequestDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/subscription-requests/{identifier}",
    input: { domainIdentifier: 0, identifier: 0 },
    output: {
      createdAt: D.ts,
      updatedAt: D.ts,
      requestReason: D.secret,
      subscribedPrincipals: D.list(o_SubscribedPrincipal),
      subscribedListings: D.list(o_SubscribedListing),
      decisionComment: D.secret,
      metadataForms: D.list(o_FormOutput),
    },
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
  operationName: "GetSubscriptionRequestDetails",
})) as any;

export type GetSubscriptionTargetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the subscription target in Amazon DataZone.
 */
export const getSubscriptionTarget: API.OperationMethod<
  GetSubscriptionTargetInput,
  GetSubscriptionTargetOutput,
  GetSubscriptionTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/subscription-targets/{identifier}",
    input: { domainIdentifier: 0, environmentIdentifier: 0, identifier: 0 },
    output: { name: D.secret, createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetSubscriptionTarget",
})) as any;

export type GetTimeSeriesDataPointError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the existing data point for the asset.
 */
export const getTimeSeriesDataPoint: API.OperationMethod<
  GetTimeSeriesDataPointInput,
  GetTimeSeriesDataPointOutput,
  GetTimeSeriesDataPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/entities/{entityType}/{entityIdentifier}/time-series-data-points/{identifier}",
    input: {
      domainIdentifier: 0,
      entityIdentifier: 0,
      entityType: 0,
      identifier: 0,
      formName: D.m({ query: "formName" }),
    },
    output: { form: o_TimeSeriesDataPointFormOutput },
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
  operationName: "GetTimeSeriesDataPoint",
})) as any;

export type GetUserProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets a user profile in Amazon DataZone.
 */
export const getUserProfile: API.OperationMethod<
  GetUserProfileInput,
  GetUserProfileOutput,
  GetUserProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/user-profiles/{userIdentifier}",
    input: {
      domainIdentifier: 0,
      userIdentifier: 0,
      type: D.m({ query: "type" }),
      sessionName: D.m({ query: "sessionName" }),
    },
    output: { details: o_UserProfileDetails },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUserProfile",
})) as any;

export type ListAccountPoolsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists existing account pools.
 */
export const listAccountPools: API.PaginatedOperationMethod<
  ListAccountPoolsInput,
  ListAccountPoolsOutput,
  ListAccountPoolsError,
  Credentials | HttpClient.HttpClient,
  AccountPoolSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/account-pools",
    input: {
      domainIdentifier: 0,
      name: D.m({ query: "name" }),
      sortBy: D.m({ query: "sortBy" }),
      sortOrder: D.m({ query: "sortOrder" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { items: D.list({ name: D.secret }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccountPools",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAccountsInAccountPoolError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the accounts in the specified account pool.
 */
export const listAccountsInAccountPool: API.PaginatedOperationMethod<
  ListAccountsInAccountPoolInput,
  ListAccountsInAccountPoolOutput,
  ListAccountsInAccountPoolError,
  Credentials | HttpClient.HttpClient,
  AccountInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/account-pools/{identifier}/accounts",
    input: {
      domainIdentifier: 0,
      identifier: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { items: D.list(o_AccountInfo) },
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
  operationName: "ListAccountsInAccountPool",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssetFiltersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists asset filters.
 *
 * Prerequisites:
 *
 * - A valid domain and asset must exist.
 *
 * - The asset must have at least one filter created to return results.
 */
export const listAssetFilters: API.PaginatedOperationMethod<
  ListAssetFiltersInput,
  ListAssetFiltersOutput,
  ListAssetFiltersError,
  Credentials | HttpClient.HttpClient,
  AssetFilterSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/assets/{assetIdentifier}/filters",
    input: {
      domainIdentifier: 0,
      assetIdentifier: 0,
      status: D.m({ query: "status" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      items: D.list({ name: D.secret, description: D.secret, createdAt: D.ts }),
    },
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
  operationName: "ListAssetFilters",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssetRevisionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the revisions for the asset.
 *
 * Prerequisites:
 *
 * - The asset must exist in the domain.
 *
 * - There must be at least one revision of the asset (which happens automatically after creation).
 *
 * - The domain must be valid and active.
 *
 * - User must have permissions on the asset and domain.
 */
export const listAssetRevisions: API.PaginatedOperationMethod<
  ListAssetRevisionsInput,
  ListAssetRevisionsOutput,
  ListAssetRevisionsError,
  Credentials | HttpClient.HttpClient,
  AssetRevision
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/assets/{identifier}/revisions",
    input: {
      domainIdentifier: 0,
      identifier: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { items: D.list({ createdAt: D.ts }) },
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
  operationName: "ListAssetRevisions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListConnectionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists connections. In Amazon DataZone, a connection enables you to connect your resources (domains, projects, and environments) to external resources and services.
 */
export const listConnections: API.PaginatedOperationMethod<
  ListConnectionsInput,
  ListConnectionsOutput,
  ListConnectionsError,
  Credentials | HttpClient.HttpClient,
  ConnectionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/connections",
    input: {
      domainIdentifier: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      sortBy: D.m({ query: "sortBy" }),
      sortOrder: D.m({ query: "sortOrder" }),
      name: D.m({ query: "name" }),
      environmentIdentifier: D.m({ query: "environmentIdentifier" }),
      projectIdentifier: D.m({ query: "projectIdentifier" }),
      type: D.m({ query: "type" }),
      scope: D.m({ query: "scope" }),
    },
    output: {
      items: D.list({
        physicalEndpoints: D.list(o_PhysicalEndpoint),
        props: o_ConnectionPropertiesOutput,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnections",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataProductRevisionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists data product revisions.
 *
 * Prerequisites:
 *
 * - The data product ID must exist within the domain.
 *
 * - User must have view permissions on the data product.
 *
 * - The domain must be in a valid and accessible state.
 */
export const listDataProductRevisions: API.PaginatedOperationMethod<
  ListDataProductRevisionsInput,
  ListDataProductRevisionsOutput,
  ListDataProductRevisionsError,
  Credentials | HttpClient.HttpClient,
  DataProductRevision
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/data-products/{identifier}/revisions",
    input: {
      domainIdentifier: 0,
      identifier: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { items: D.list({ createdAt: D.ts }) },
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
  operationName: "ListDataProductRevisions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataSourceRunActivitiesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists data source run activities.
 */
export const listDataSourceRunActivities: API.PaginatedOperationMethod<
  ListDataSourceRunActivitiesInput,
  ListDataSourceRunActivitiesOutput,
  ListDataSourceRunActivitiesError,
  Credentials | HttpClient.HttpClient,
  DataSourceRunActivity
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/data-source-runs/{identifier}/activities",
    input: {
      domainIdentifier: 0,
      identifier: 0,
      status: D.m({ query: "status" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      items: D.list({
        database: D.secret,
        technicalName: D.secret,
        technicalDescription: D.secret,
        createdAt: D.ts,
        updatedAt: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataSourceRunActivities",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataSourceRunsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists data source runs in Amazon DataZone.
 */
export const listDataSourceRuns: API.PaginatedOperationMethod<
  ListDataSourceRunsInput,
  ListDataSourceRunsOutput,
  ListDataSourceRunsError,
  Credentials | HttpClient.HttpClient,
  DataSourceRunSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/data-sources/{dataSourceIdentifier}/runs",
    input: {
      domainIdentifier: 0,
      dataSourceIdentifier: 0,
      status: D.m({ query: "status" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      items: D.list({
        createdAt: D.ts,
        updatedAt: D.ts,
        startedAt: D.ts,
        stoppedAt: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataSourceRuns",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataSourcesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists data sources in Amazon DataZone.
 */
export const listDataSources: API.PaginatedOperationMethod<
  ListDataSourcesInput,
  ListDataSourcesOutput,
  ListDataSourcesError,
  Credentials | HttpClient.HttpClient,
  DataSourceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/data-sources",
    input: {
      domainIdentifier: 0,
      projectIdentifier: D.m({ query: "projectIdentifier" }),
      environmentIdentifier: D.m({ query: "environmentIdentifier" }),
      connectionIdentifier: D.m({ query: "connectionIdentifier" }),
      type: D.m({ query: "type" }),
      status: D.m({ query: "status" }),
      name: D.m({ query: "name" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      items: D.list({
        name: D.secret,
        lastRunAt: D.ts,
        createdAt: D.ts,
        updatedAt: D.ts,
        description: D.secret,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataSources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDomainsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists Amazon DataZone domains.
 */
export const listDomains: API.PaginatedOperationMethod<
  ListDomainsInput,
  ListDomainsOutput,
  ListDomainsError,
  Credentials | HttpClient.HttpClient,
  DomainSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains",
    input: {
      status: D.m({ query: "status" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      items: D.list({
        name: D.secret,
        description: D.secret,
        createdAt: D.ts,
        lastUpdatedAt: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomains",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDomainUnitsForParentError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists child domain units for the specified parent domain unit.
 */
export const listDomainUnitsForParent: API.PaginatedOperationMethod<
  ListDomainUnitsForParentInput,
  ListDomainUnitsForParentOutput,
  ListDomainUnitsForParentError,
  Credentials | HttpClient.HttpClient,
  DomainUnitSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/domain-units",
    input: {
      domainIdentifier: 0,
      parentDomainUnitIdentifier: D.m({ query: "parentDomainUnitIdentifier" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomainUnitsForParent",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEntityOwnersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the entity (domain units) owners.
 */
export const listEntityOwners: API.PaginatedOperationMethod<
  ListEntityOwnersInput,
  ListEntityOwnersOutput,
  ListEntityOwnersError,
  Credentials | HttpClient.HttpClient,
  OwnerPropertiesOutput
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/entities/{entityType}/{entityIdentifier}/owners",
    input: {
      domainIdentifier: 0,
      entityType: 0,
      entityIdentifier: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEntityOwners",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "owners",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnvironmentActionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists existing environment actions.
 */
export const listEnvironmentActions: API.PaginatedOperationMethod<
  ListEnvironmentActionsInput,
  ListEnvironmentActionsOutput,
  ListEnvironmentActionsError,
  Credentials | HttpClient.HttpClient,
  EnvironmentActionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/actions",
    input: {
      domainIdentifier: 0,
      environmentIdentifier: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironmentActions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnvironmentBlueprintConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists blueprint configurations for a Amazon DataZone environment.
 */
export const listEnvironmentBlueprintConfigurations: API.PaginatedOperationMethod<
  ListEnvironmentBlueprintConfigurationsInput,
  ListEnvironmentBlueprintConfigurationsOutput,
  ListEnvironmentBlueprintConfigurationsError,
  Credentials | HttpClient.HttpClient,
  EnvironmentBlueprintConfigurationItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/environment-blueprint-configurations",
    input: {
      domainIdentifier: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { items: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironmentBlueprintConfigurations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnvironmentBlueprintsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists blueprints in an Amazon DataZone environment.
 */
export const listEnvironmentBlueprints: API.PaginatedOperationMethod<
  ListEnvironmentBlueprintsInput,
  ListEnvironmentBlueprintsOutput,
  ListEnvironmentBlueprintsError,
  Credentials | HttpClient.HttpClient,
  EnvironmentBlueprintSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/environment-blueprints",
    input: {
      domainIdentifier: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      name: D.m({ query: "name" }),
      managed: D.m({ query: "managed" }),
    },
    output: {
      items: D.list({
        description: D.secret,
        createdAt: D.ts,
        updatedAt: D.ts,
      }),
    },
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
  operationName: "ListEnvironmentBlueprints",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnvironmentProfilesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists Amazon DataZone environment profiles.
 */
export const listEnvironmentProfiles: API.PaginatedOperationMethod<
  ListEnvironmentProfilesInput,
  ListEnvironmentProfilesOutput,
  ListEnvironmentProfilesError,
  Credentials | HttpClient.HttpClient,
  EnvironmentProfileSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/environment-profiles",
    input: {
      domainIdentifier: 0,
      awsAccountId: D.m({ query: "awsAccountId" }),
      awsAccountRegion: D.m({ query: "awsAccountRegion" }),
      environmentBlueprintIdentifier: D.m({
        query: "environmentBlueprintIdentifier",
      }),
      projectIdentifier: D.m({ query: "projectIdentifier" }),
      name: D.m({ query: "name" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      items: D.list({
        createdAt: D.ts,
        updatedAt: D.ts,
        name: D.secret,
        description: D.secret,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironmentProfiles",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnvironmentsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists Amazon DataZone environments.
 */
export const listEnvironments: API.PaginatedOperationMethod<
  ListEnvironmentsInput,
  ListEnvironmentsOutput,
  ListEnvironmentsError,
  Credentials | HttpClient.HttpClient,
  EnvironmentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/environments",
    input: {
      domainIdentifier: 0,
      awsAccountId: D.m({ query: "awsAccountId" }),
      status: D.m({ query: "status" }),
      awsAccountRegion: D.m({ query: "awsAccountRegion" }),
      projectIdentifier: D.m({ query: "projectIdentifier" }),
      environmentProfileIdentifier: D.m({
        query: "environmentProfileIdentifier",
      }),
      environmentBlueprintIdentifier: D.m({
        query: "environmentBlueprintIdentifier",
      }),
      provider: D.m({ query: "provider" }),
      name: D.m({ query: "name" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      items: D.list({
        createdAt: D.ts,
        updatedAt: D.ts,
        name: D.secret,
        description: D.secret,
        environmentConfigurationId: D.secret,
        environmentConfigurationName: D.secret,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListJobRunsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists job runs.
 */
export const listJobRuns: API.PaginatedOperationMethod<
  ListJobRunsInput,
  ListJobRunsOutput,
  ListJobRunsError,
  Credentials | HttpClient.HttpClient,
  JobRunSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/jobs/{jobIdentifier}/runs",
    input: {
      domainIdentifier: 0,
      jobIdentifier: 0,
      status: D.m({ query: "status" }),
      sortOrder: D.m({ query: "sortOrder" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      items: D.list({ createdAt: D.ts, startTime: D.ts, endTime: D.ts }),
    },
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
  operationName: "ListJobRuns",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListLineageEventsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists lineage events.
 */
export const listLineageEvents: API.PaginatedOperationMethod<
  ListLineageEventsInput,
  ListLineageEventsOutput,
  ListLineageEventsError,
  Credentials | HttpClient.HttpClient,
  LineageEventSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/lineage/events",
    input: {
      domainIdentifier: 0,
      maxResults: D.m({ query: "maxResults" }),
      timestampAfter: D.m({
        query: "timestampAfter",
        shape: D.tsAs("epoch-seconds"),
      }),
      timestampBefore: D.m({
        query: "timestampBefore",
        shape: D.tsAs("epoch-seconds"),
      }),
      processingStatus: D.m({ query: "processingStatus" }),
      sortOrder: D.m({ query: "sortOrder" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { items: D.list({ eventTime: D.ts, createdAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLineageEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListLineageNodeHistoryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the history of the specified data lineage node.
 */
export const listLineageNodeHistory: API.PaginatedOperationMethod<
  ListLineageNodeHistoryInput,
  ListLineageNodeHistoryOutput,
  ListLineageNodeHistoryError,
  Credentials | HttpClient.HttpClient,
  LineageNodeSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/lineage/nodes/{identifier}/history",
    input: {
      domainIdentifier: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      identifier: 0,
      direction: D.m({ query: "direction" }),
      eventTimestampGTE: D.m({
        query: "timestampGTE",
        shape: D.tsAs("epoch-seconds"),
      }),
      eventTimestampLTE: D.m({
        query: "timestampLTE",
        shape: D.tsAs("epoch-seconds"),
      }),
      sortOrder: D.m({ query: "sortOrder" }),
    },
    output: {
      nodes: D.list({ createdAt: D.ts, updatedAt: D.ts, eventTimestamp: D.ts }),
    },
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
  operationName: "ListLineageNodeHistory",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "nodes",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMetadataGenerationRunsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all metadata generation runs.
 *
 * Metadata generation runs represent automated processes that leverage AI/ML capabilities to create or enhance asset metadata at scale. This feature helps organizations maintain comprehensive and consistent metadata across large numbers of assets without manual intervention. It can automatically generate business descriptions, tags, and other metadata elements, significantly reducing the time and effort required for metadata management while improving consistency and completeness.
 *
 * Prerequisites:
 *
 * - Valid domain identifier.
 *
 * - User must have access to metadata generation runs in the domain.
 */
export const listMetadataGenerationRuns: API.PaginatedOperationMethod<
  ListMetadataGenerationRunsInput,
  ListMetadataGenerationRunsOutput,
  ListMetadataGenerationRunsError,
  Credentials | HttpClient.HttpClient,
  MetadataGenerationRunItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/metadata-generation-runs",
    input: {
      domainIdentifier: 0,
      status: D.m({ query: "status" }),
      type: D.m({ query: "type" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      targetIdentifier: D.m({ query: "targetIdentifier" }),
    },
    output: { items: D.list({ createdAt: D.ts }) },
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
  operationName: "ListMetadataGenerationRuns",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNotebookRunsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists notebook runs in Amazon SageMaker Unified Studio.
 */
export const listNotebookRuns: API.PaginatedOperationMethod<
  ListNotebookRunsInput,
  ListNotebookRunsOutput,
  ListNotebookRunsError,
  Credentials | HttpClient.HttpClient,
  NotebookRunSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/notebook-runs",
    input: {
      domainIdentifier: 0,
      owningProjectIdentifier: D.m({ query: "owningProjectIdentifier" }),
      notebookIdentifier: D.m({ query: "notebookIdentifier" }),
      status: D.m({ query: "status" }),
      scheduleIdentifier: D.m({ query: "scheduleIdentifier" }),
      maxResults: D.m({ query: "maxResults" }),
      sortOrder: D.m({ query: "sortOrder" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      items: D.list({
        createdAt: D.ts,
        updatedAt: D.ts,
        startedAt: D.ts,
        completedAt: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNotebookRuns",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNotebooksError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists notebooks in Amazon SageMaker Unified Studio.
 */
export const listNotebooks: API.PaginatedOperationMethod<
  ListNotebooksInput,
  ListNotebooksOutput,
  ListNotebooksError,
  Credentials | HttpClient.HttpClient,
  NotebookSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/notebooks",
    input: {
      domainIdentifier: 0,
      owningProjectIdentifier: D.m({ query: "owningProjectIdentifier" }),
      maxResults: D.m({ query: "maxResults" }),
      sortOrder: D.m({ query: "sortOrder" }),
      sortBy: D.m({ query: "sortBy" }),
      status: D.m({ query: "status" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      items: D.list({
        name: D.secret,
        description: D.secret,
        createdAt: D.ts,
        updatedAt: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNotebooks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNotificationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all Amazon DataZone notifications.
 */
export const listNotifications: API.PaginatedOperationMethod<
  ListNotificationsInput,
  ListNotificationsOutput,
  ListNotificationsError,
  Credentials | HttpClient.HttpClient,
  NotificationOutput
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/notifications",
    input: {
      domainIdentifier: 0,
      type: D.m({ query: "type" }),
      afterTimestamp: D.m({
        query: "afterTimestamp",
        shape: D.tsAs("epoch-seconds"),
      }),
      beforeTimestamp: D.m({
        query: "beforeTimestamp",
        shape: D.tsAs("epoch-seconds"),
      }),
      subjects: D.m({ query: "subjects" }),
      taskStatus: D.m({ query: "taskStatus" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      notifications: D.list({
        title: D.secret,
        message: D.secret,
        actionLink: D.secret,
        creationTimestamp: D.ts,
        lastUpdatedTimestamp: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNotifications",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "notifications",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPolicyGrantsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists policy grants.
 */
export const listPolicyGrants: API.PaginatedOperationMethod<
  ListPolicyGrantsInput,
  ListPolicyGrantsOutput,
  ListPolicyGrantsError,
  Credentials | HttpClient.HttpClient,
  PolicyGrantMember
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/policies/managed/{entityType}/{entityIdentifier}/grants",
    input: {
      domainIdentifier: 0,
      entityType: 0,
      entityIdentifier: 0,
      policyType: D.m({ query: "policyType" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { grantList: D.list({ createdAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicyGrants",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "grantList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListProjectMembershipsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all members of the specified project.
 */
export const listProjectMemberships: API.PaginatedOperationMethod<
  ListProjectMembershipsInput,
  ListProjectMembershipsOutput,
  ListProjectMembershipsError,
  Credentials | HttpClient.HttpClient,
  ProjectMember
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/projects/{projectIdentifier}/memberships",
    input: {
      domainIdentifier: 0,
      projectIdentifier: 0,
      sortBy: D.m({ query: "sortBy" }),
      sortOrder: D.m({ query: "sortOrder" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
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
  operationName: "ListProjectMemberships",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "members",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListProjectProfilesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists project profiles.
 */
export const listProjectProfiles: API.PaginatedOperationMethod<
  ListProjectProfilesInput,
  ListProjectProfilesOutput,
  ListProjectProfilesError,
  Credentials | HttpClient.HttpClient,
  ProjectProfileSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/project-profiles",
    input: {
      domainIdentifier: 0,
      name: D.m({ query: "name" }),
      sortBy: D.m({ query: "sortBy" }),
      sortOrder: D.m({ query: "sortOrder" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      items: D.list({
        name: D.secret,
        description: D.secret,
        createdAt: D.ts,
        lastUpdatedAt: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProjectProfiles",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListProjectsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists Amazon DataZone projects.
 */
export const listProjects: API.PaginatedOperationMethod<
  ListProjectsInput,
  ListProjectsOutput,
  ListProjectsError,
  Credentials | HttpClient.HttpClient,
  ProjectSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/projects",
    input: {
      domainIdentifier: 0,
      userIdentifier: D.m({ query: "userIdentifier" }),
      groupIdentifier: D.m({ query: "groupIdentifier" }),
      name: D.m({ query: "name" }),
      projectCategory: D.m({ query: "projectCategory" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      items: D.list({
        name: D.secret,
        description: D.secret,
        createdAt: D.ts,
        updatedAt: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProjects",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRulesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists existing rules. In Amazon DataZone, a rule is a formal agreement that enforces specific requirements across user workflows (e.g., publishing assets to the catalog, requesting subscriptions, creating projects) within the Amazon DataZone data portal. These rules help maintain consistency, ensure compliance, and uphold governance standards in data management processes. For instance, a metadata enforcement rule can specify the required information for creating a subscription request or publishing a data asset to the catalog, ensuring alignment with organizational standards.
 */
export const listRules: API.PaginatedOperationMethod<
  ListRulesInput,
  ListRulesOutput,
  ListRulesError,
  Credentials | HttpClient.HttpClient,
  RuleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/list-rules/{targetType}/{targetIdentifier}",
    input: {
      domainIdentifier: 0,
      targetType: 0,
      targetIdentifier: 0,
      ruleType: D.m({ query: "ruleType" }),
      action: D.m({ query: "ruleAction" }),
      projectIds: D.m({ query: "projectIds" }),
      assetTypes: D.m({ query: "assetTypes" }),
      dataProduct: D.m({ query: "dataProduct" }),
      includeCascaded: D.m({ query: "includeCascaded" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { items: D.list({ name: D.secret, updatedAt: D.ts }) },
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
  operationName: "ListRules",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSubscriptionGrantsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists subscription grants.
 */
export const listSubscriptionGrants: API.PaginatedOperationMethod<
  ListSubscriptionGrantsInput,
  ListSubscriptionGrantsOutput,
  ListSubscriptionGrantsError,
  Credentials | HttpClient.HttpClient,
  SubscriptionGrantSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/subscription-grants",
    input: {
      domainIdentifier: 0,
      environmentId: D.m({ query: "environmentId" }),
      subscriptionTargetId: D.m({ query: "subscriptionTargetId" }),
      subscribedListingId: D.m({ query: "subscribedListingId" }),
      subscriptionId: D.m({ query: "subscriptionId" }),
      owningProjectId: D.m({ query: "owningProjectId" }),
      owningIamPrincipalArn: D.m({ query: "owningIamPrincipalArn" }),
      owningUserId: D.m({ query: "owningUserId" }),
      owningGroupId: D.m({ query: "owningGroupId" }),
      sortBy: D.m({ query: "sortBy" }),
      sortOrder: D.m({ query: "sortOrder" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      items: D.list({
        createdAt: D.ts,
        updatedAt: D.ts,
        assets: D.list(o_SubscribedAsset),
      }),
    },
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
  operationName: "ListSubscriptionGrants",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSubscriptionRequestsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists Amazon DataZone subscription requests.
 */
export const listSubscriptionRequests: API.PaginatedOperationMethod<
  ListSubscriptionRequestsInput,
  ListSubscriptionRequestsOutput,
  ListSubscriptionRequestsError,
  Credentials | HttpClient.HttpClient,
  SubscriptionRequestSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/subscription-requests",
    input: {
      domainIdentifier: 0,
      status: D.m({ query: "status" }),
      subscribedListingId: D.m({ query: "subscribedListingId" }),
      owningProjectId: D.m({ query: "owningProjectId" }),
      owningIamPrincipalArn: D.m({ query: "owningIamPrincipalArn" }),
      approverProjectId: D.m({ query: "approverProjectId" }),
      owningUserId: D.m({ query: "owningUserId" }),
      owningGroupId: D.m({ query: "owningGroupId" }),
      sortBy: D.m({ query: "sortBy" }),
      sortOrder: D.m({ query: "sortOrder" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      items: D.list({
        createdAt: D.ts,
        updatedAt: D.ts,
        requestReason: D.secret,
        subscribedPrincipals: D.list(o_SubscribedPrincipal),
        subscribedListings: D.list(o_SubscribedListing),
        decisionComment: D.secret,
        metadataFormsSummary: D.list({ typeName: D.secret }),
      }),
    },
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
  operationName: "ListSubscriptionRequests",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSubscriptionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists subscriptions in Amazon DataZone.
 */
export const listSubscriptions: API.PaginatedOperationMethod<
  ListSubscriptionsInput,
  ListSubscriptionsOutput,
  ListSubscriptionsError,
  Credentials | HttpClient.HttpClient,
  SubscriptionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/subscriptions",
    input: {
      domainIdentifier: 0,
      subscriptionRequestIdentifier: D.m({
        query: "subscriptionRequestIdentifier",
      }),
      status: D.m({ query: "status" }),
      subscribedListingId: D.m({ query: "subscribedListingId" }),
      owningProjectId: D.m({ query: "owningProjectId" }),
      owningIamPrincipalArn: D.m({ query: "owningIamPrincipalArn" }),
      owningUserId: D.m({ query: "owningUserId" }),
      owningGroupId: D.m({ query: "owningGroupId" }),
      approverProjectId: D.m({ query: "approverProjectId" }),
      sortBy: D.m({ query: "sortBy" }),
      sortOrder: D.m({ query: "sortOrder" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      items: D.list({
        createdAt: D.ts,
        updatedAt: D.ts,
        subscribedPrincipal: o_SubscribedPrincipal,
        subscribedListing: o_SubscribedListing,
      }),
    },
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
  operationName: "ListSubscriptions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSubscriptionTargetsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists subscription targets in Amazon DataZone.
 */
export const listSubscriptionTargets: API.PaginatedOperationMethod<
  ListSubscriptionTargetsInput,
  ListSubscriptionTargetsOutput,
  ListSubscriptionTargetsError,
  Credentials | HttpClient.HttpClient,
  SubscriptionTargetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/subscription-targets",
    input: {
      domainIdentifier: 0,
      environmentIdentifier: 0,
      sortBy: D.m({ query: "sortBy" }),
      sortOrder: D.m({ query: "sortOrder" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      items: D.list({ name: D.secret, createdAt: D.ts, updatedAt: D.ts }),
    },
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
  operationName: "ListSubscriptionTargets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists tags for the specified resource in Amazon DataZone.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListTimeSeriesDataPointsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists time series data points.
 */
export const listTimeSeriesDataPoints: API.PaginatedOperationMethod<
  ListTimeSeriesDataPointsInput,
  ListTimeSeriesDataPointsOutput,
  ListTimeSeriesDataPointsError,
  Credentials | HttpClient.HttpClient,
  TimeSeriesDataPointSummaryFormOutput
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domains/{domainIdentifier}/entities/{entityType}/{entityIdentifier}/time-series-data-points",
    input: {
      domainIdentifier: 0,
      entityIdentifier: 0,
      entityType: 0,
      formName: D.m({ query: "formName" }),
      startedAt: D.m({ query: "startedAt", shape: D.tsAs("epoch-seconds") }),
      endedAt: D.m({ query: "endedAt", shape: D.tsAs("epoch-seconds") }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { items: D.list(o_TimeSeriesDataPointSummaryFormOutput) },
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
  operationName: "ListTimeSeriesDataPoints",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PostLineageEventError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Posts a data lineage event.
 */
export const postLineageEvent: API.OperationMethod<
  PostLineageEventInput,
  PostLineageEventOutput,
  PostLineageEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/lineage/events",
    input: {
      domainIdentifier: 0,
      event: D.m({ payload: true, shape: D.stream }),
      clientToken: D.m({ header: "Client-Token", idempotency: true }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PostLineageEvent",
})) as any;

export type PostTimeSeriesDataPointsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Posts time series data points to Amazon DataZone for the specified asset.
 */
export const postTimeSeriesDataPoints: API.OperationMethod<
  PostTimeSeriesDataPointsInput,
  PostTimeSeriesDataPointsOutput,
  PostTimeSeriesDataPointsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/entities/{entityType}/{entityIdentifier}/time-series-data-points",
    input: {
      domainIdentifier: 0,
      entityIdentifier: 0,
      entityType: 0,
      forms: D.list({
        formName: 0,
        typeIdentifier: 0,
        typeRevision: 0,
        timestamp: 0,
        content: 0,
      }),
      clientToken: D.m({ idempotency: true }),
    },
    output: { forms: D.list(o_TimeSeriesDataPointFormOutput) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PostTimeSeriesDataPoints",
})) as any;

export type PutDataExportConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates data export configuration details.
 *
 * If you want to temporarily disable export and later re-enable it for the same domain, use the `--no-enable-export` flag to disable and the `--enable-export` flag to re-enable. This preserves the configuration and allows you to re-enable export without deleting S3 table.
 *
 * You can enable asset metadata export for only one domain per account per Region. To enable export for a different domain, complete the following steps:
 *
 * - Delete the export configuration for the currently enabled domain using the DeleteDataExportConfiguration operation.
 *
 * - Delete the asset S3 table under the aws-sagemaker-catalog S3 table bucket. We recommend backing up the S3 table before deletion.
 *
 * - Call the PutDataExportConfiguration API to enable export for the new domain.
 */
export const putDataExportConfiguration: API.OperationMethod<
  PutDataExportConfigurationInput,
  PutDataExportConfigurationOutput,
  PutDataExportConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/domains/{domainIdentifier}/data-export-configuration",
    input: {
      domainIdentifier: 0,
      enableExport: 0,
      encryptionConfiguration: { kmsKeyArn: 0, sseAlgorithm: 0 },
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDataExportConfiguration",
})) as any;

export type PutEnvironmentBlueprintConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Writes the configuration for the specified environment blueprint in Amazon DataZone.
 */
export const putEnvironmentBlueprintConfiguration: API.OperationMethod<
  PutEnvironmentBlueprintConfigurationInput,
  PutEnvironmentBlueprintConfigurationOutput,
  PutEnvironmentBlueprintConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/domains/{domainIdentifier}/environment-blueprint-configurations/{environmentBlueprintIdentifier}",
    input: {
      domainIdentifier: 0,
      environmentBlueprintIdentifier: 0,
      provisioningRoleArn: 0,
      manageAccessRoleArn: 0,
      environmentRolePermissionBoundary: 0,
      enabledRegions: 0,
      regionalParameters: 0,
      resourceConfigurations: D.list({
        name: 0,
        description: 0,
        region: 0,
        parameters: 0,
      }),
      allowUserProvidedConfigurations: 0,
      globalParameters: 0,
      provisioningConfigurations: D.list({
        lakeFormationConfiguration: {
          locationRegistrationRole: 0,
          locationRegistrationExcludeS3Locations: 0,
        },
      }),
    },
    output: { createdAt: D.ts, updatedAt: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEnvironmentBlueprintConfiguration",
})) as any;

export type QueryGraphError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Queries entities in the graph store.
 */
export const queryGraph: API.PaginatedOperationMethod<
  QueryGraphInput,
  QueryGraphOutput,
  QueryGraphError,
  Credentials | HttpClient.HttpClient,
  ResultItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/graph/query",
    input: {
      domainIdentifier: 0,
      match: D.list({
        relationPattern: {
          relationType: 0,
          relationDirection: 0,
          maxPathLength: 0,
        },
        entityPattern: {
          entityType: 0,
          identifier: 0,
          filters: i_FilterClause,
        },
      }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      additionalAttributes: { formNames: 0 },
    },
    output: {
      items: D.list({
        lineageNode: {
          createdAt: D.ts,
          updatedAt: D.ts,
          eventTimestamp: D.ts,
          formsOutput: D.list(o_FormOutput),
        },
      }),
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
  operationName: "QueryGraph",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type RejectPredictionsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Rejects automatically generated business-friendly metadata for your Amazon DataZone assets.
 */
export const rejectPredictions: API.OperationMethod<
  RejectPredictionsInput,
  RejectPredictionsOutput,
  RejectPredictionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/domains/{domainIdentifier}/assets/{identifier}/reject-predictions",
    input: {
      domainIdentifier: 0,
      identifier: 0,
      revision: D.m({ query: "revision" }),
      rejectRule: { rule: 0, threshold: 0 },
      rejectChoices: D.list({ predictionTarget: 0, predictionChoices: 0 }),
      clientToken: D.m({ idempotency: true }),
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
  operationName: "RejectPredictions",
})) as any;

export type RejectSubscriptionRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Rejects the specified subscription request.
 */
export const rejectSubscriptionRequest: API.OperationMethod<
  RejectSubscriptionRequestInput,
  RejectSubscriptionRequestOutput,
  RejectSubscriptionRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/domains/{domainIdentifier}/subscription-requests/{identifier}/reject",
    input: { domainIdentifier: 0, identifier: 0, decisionComment: 0 },
    output: {
      createdAt: D.ts,
      updatedAt: D.ts,
      requestReason: D.secret,
      subscribedPrincipals: D.list(o_SubscribedPrincipal),
      subscribedListings: D.list(o_SubscribedListing),
      decisionComment: D.secret,
      metadataForms: D.list(o_FormOutput),
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
  operationName: "RejectSubscriptionRequest",
})) as any;

export type RemoveEntityOwnerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes an owner from an entity.
 */
export const removeEntityOwner: API.OperationMethod<
  RemoveEntityOwnerInput,
  RemoveEntityOwnerOutput,
  RemoveEntityOwnerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/entities/{entityType}/{entityIdentifier}/removeOwner",
    input: {
      domainIdentifier: 0,
      entityType: 0,
      entityIdentifier: 0,
      owner: i_OwnerProperties,
      clientToken: D.m({ idempotency: true }),
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
  operationName: "RemoveEntityOwner",
})) as any;

export type RemovePolicyGrantError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a policy grant.
 */
export const removePolicyGrant: API.OperationMethod<
  RemovePolicyGrantInput,
  RemovePolicyGrantOutput,
  RemovePolicyGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/policies/managed/{entityType}/{entityIdentifier}/removeGrant",
    input: {
      domainIdentifier: 0,
      entityType: 0,
      entityIdentifier: 0,
      policyType: 0,
      principal: i_PolicyGrantPrincipal,
      grantIdentifier: 0,
      clientToken: D.m({ idempotency: true }),
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
  operationName: "RemovePolicyGrant",
})) as any;

export type RevokeSubscriptionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Revokes a specified subscription in Amazon DataZone.
 */
export const revokeSubscription: API.OperationMethod<
  RevokeSubscriptionInput,
  RevokeSubscriptionOutput,
  RevokeSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/domains/{domainIdentifier}/subscriptions/{identifier}/revoke",
    input: { domainIdentifier: 0, identifier: 0, retainPermissions: 0 },
    output: {
      createdAt: D.ts,
      updatedAt: D.ts,
      subscribedPrincipal: o_SubscribedPrincipal,
      subscribedListing: o_SubscribedListing,
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
  operationName: "RevokeSubscription",
})) as any;

export type SearchError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches for assets in Amazon DataZone.
 *
 * Search in Amazon DataZone is a powerful capability that enables users to discover and explore data assets, glossary terms, and data products across their organization. It provides both basic and advanced search functionality, allowing users to find resources based on names, descriptions, metadata, and other attributes. Search can be scoped to specific types of resources (like assets, glossary terms, or data products) and can be filtered using various criteria such as creation date, owner, or status. The search functionality is essential for making the wealth of data resources in an organization discoverable and usable, helping users find the right data for their needs quickly and efficiently.
 *
 * Many search commands in Amazon DataZone are paginated, including `search` and `search-types`. When the result set is large, Amazon DataZone returns a `nextToken` in the response. This token can be used to retrieve the next page of results.
 *
 * Prerequisites:
 *
 * - The --domain-identifier must refer to an existing Amazon DataZone domain.
 *
 * - --search-scope must be one of: ASSET, GLOSSARY_TERM, DATA_PRODUCT, or GLOSSARY.
 *
 * - The user must have search permissions in the specified domain.
 *
 * - If using --filters, ensure that the JSON is well-formed and that each filter includes valid attribute and value keys.
 *
 * - For paginated results, be prepared to use --next-token to fetch additional pages.
 *
 * To run a standard free-text search, the `searchText` parameter must be supplied. By default, all searchable fields are indexed for semantic search and will return semantic matches for SearchListings queries. To prevent semantic search indexing for a custom form attribute, see the CreateFormType API documentation. To run a lexical search query, enclose the query with double quotes (""). This will disable semantic search even for fields that have semantic search enabled and will only return results that contain the keywords wrapped by double quotes (order of tokens in the query is not enforced). Free-text search is supported for all attributes annotated with @amazon.datazone#searchable.
 *
 * To run a filtered search, provide filter clause using the `filters` parameter. To filter on glossary terms, use the special attribute `__DataZoneGlossaryTerms`. To filter on an indexed numeric attribute (i.e., a numeric attribute annotated with `@amazon.datazone#sortable`), provide a filter using the `intValue` parameter. The filters parameter can also be used to run more advanced free-text searches that target specific attributes (attributes must be annotated with `@amazon.datazone#searchable` for free-text search). Create/update timestamp filtering is supported using the special `creationTime`/`lastUpdatedTime` attributes. Filter types can be mixed and matched to power complex queries.
 *
 * To find out whether an attribute has been annotated and indexed for a given search type, use the GetFormType API to retrieve the form containing the attribute.
 */
export const search: API.PaginatedOperationMethod<
  SearchInput,
  SearchOutput,
  SearchError,
  Credentials | HttpClient.HttpClient,
  SearchInventoryResultItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/search",
    input: {
      domainIdentifier: 0,
      owningProjectIdentifier: 0,
      maxResults: 0,
      nextToken: 0,
      searchScope: 0,
      searchText: 0,
      searchIn: D.list(i_SearchInItem),
      filters: i_FilterClause,
      sort: i_SearchSort,
      additionalAttributes: 0,
    },
    output: {
      items: D.list({
        glossaryItem: {
          name: D.secret,
          description: D.secret,
          createdAt: D.ts,
          updatedAt: D.ts,
        },
        glossaryTermItem: {
          name: D.secret,
          shortDescription: D.secret,
          longDescription: D.secret,
          createdAt: D.ts,
          updatedAt: D.ts,
        },
        assetItem: {
          name: D.secret,
          description: D.secret,
          createdAt: D.ts,
          firstRevisionCreatedAt: D.ts,
          additionalAttributes: {
            formsOutput: D.list(o_FormOutput),
            readOnlyFormsOutput: D.list(o_FormOutput),
            latestTimeSeriesDataPointFormsOutput: D.list(
              o_TimeSeriesDataPointSummaryFormOutput,
            ),
          },
        },
        dataProductItem: {
          name: D.secret,
          description: D.secret,
          createdAt: D.ts,
          firstRevisionCreatedAt: D.ts,
        },
      }),
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
  operationName: "Search",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type SearchGroupProfilesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Searches group profiles in Amazon DataZone.
 */
export const searchGroupProfiles: API.PaginatedOperationMethod<
  SearchGroupProfilesInput,
  SearchGroupProfilesOutput,
  SearchGroupProfilesError,
  Credentials | HttpClient.HttpClient,
  GroupProfileSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/search-group-profiles",
    input: {
      domainIdentifier: 0,
      groupType: 0,
      searchText: 0,
      maxResults: 0,
      nextToken: 0,
    },
    output: { items: D.list({ groupName: D.secret }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchGroupProfiles",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type SearchListingsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches listings in Amazon DataZone.
 *
 * SearchListings is a powerful capability that enables users to discover and explore published assets and data products across their organization. It provides both basic and advanced search functionality, allowing users to find resources based on names, descriptions, metadata, and other attributes. SearchListings also supports filtering using various criteria such as creation date, owner, or status. This API is essential for making the wealth of data resources in an organization discoverable and usable, helping users find the right data for their needs quickly and efficiently.
 *
 * SearchListings returns results in a paginated format. When the result set is large, the response will include a nextToken, which can be used to retrieve the next page of results.
 *
 * The SearchListings API gives users flexibility in specifying what kind of search is run.
 *
 * To run a standard free-text search, the `searchText` parameter must be supplied. By default, all searchable fields are indexed for semantic search and will return semantic matches for SearchListings queries. To prevent semantic search indexing for a custom form attribute, see the CreateFormType API documentation. To run a lexical search query, enclose the query with double quotes (""). This will disable semantic search even for fields that have semantic search enabled and will only return results that contain the keywords wrapped by double quotes (order of tokens in the query is not enforced). Free-text search is supported for all attributes annotated with @amazon.datazone#searchable.
 *
 * To run a filtered search, provide filter clause using the `filters` parameter. To filter on glossary terms, use the special attribute `__DataZoneGlossaryTerms`. To filter on an indexed numeric attribute (i.e., a numeric attribute annotated with `@amazon.datazone#sortable`), provide a filter using the `intValue` parameter. The filters parameter can also be used to run more advanced free-text searches that target specific attributes (attributes must be annotated with `@amazon.datazone#searchable` for free-text search). Create/update timestamp filtering is supported using the special `creationTime`/`lastUpdatedTime` attributes. Filter types can be mixed and matched to power complex queries.
 *
 * To find out whether an attribute has been annotated and indexed for a given search type, use the GetFormType API to retrieve the form containing the attribute.
 */
export const searchListings: API.PaginatedOperationMethod<
  SearchListingsInput,
  SearchListingsOutput,
  SearchListingsError,
  Credentials | HttpClient.HttpClient,
  SearchResultItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/listings/search",
    input: {
      domainIdentifier: 0,
      searchText: 0,
      searchIn: D.list(i_SearchInItem),
      maxResults: 0,
      nextToken: 0,
      filters: i_FilterClause,
      aggregations: D.list({ attribute: 0, displayValue: 0 }),
      sort: i_SearchSort,
      additionalAttributes: 0,
    },
    output: {
      items: D.list({
        assetListing: {
          name: D.secret,
          description: D.secret,
          createdAt: D.ts,
          glossaryTerms: D.list(o_DetailedGlossaryTerm),
          governedGlossaryTerms: D.list(o_DetailedGlossaryTerm),
          additionalAttributes: {
            latestTimeSeriesDataPointForms: D.list(
              o_TimeSeriesDataPointSummaryFormOutput,
            ),
          },
        },
        dataProductListing: {
          name: D.secret,
          description: D.secret,
          createdAt: D.ts,
          glossaryTerms: D.list(o_DetailedGlossaryTerm),
          items: D.list({ glossaryTerms: D.list(o_DetailedGlossaryTerm) }),
        },
      }),
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
  operationName: "SearchListings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type SearchTypesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches for types in Amazon DataZone.
 *
 * Prerequisites:
 *
 * - The --domain-identifier must refer to an existing Amazon DataZone domain.
 *
 * - --search-scope must be one of the valid values including: ASSET_TYPE, GLOSSARY_TERM_TYPE, DATA_PRODUCT_TYPE.
 *
 * - The --managed flag must be present without a value.
 *
 * - The user must have permissions for form or asset types in the domain.
 *
 * - If using --filters, ensure that the JSON is valid.
 *
 * - Filters contain correct structure (attribute, value, operator).
 */
export const searchTypes: API.PaginatedOperationMethod<
  SearchTypesInput,
  SearchTypesOutput,
  SearchTypesError,
  Credentials | HttpClient.HttpClient,
  SearchTypesResultItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/types-search",
    input: {
      domainIdentifier: 0,
      maxResults: 0,
      nextToken: 0,
      searchScope: 0,
      searchText: 0,
      searchIn: D.list(i_SearchInItem),
      filters: i_FilterClause,
      sort: i_SearchSort,
      managed: 0,
    },
    output: {
      items: D.list({
        assetTypeItem: {
          description: D.secret,
          formsOutput: D.map(o_FormEntryOutput),
          createdAt: D.ts,
          updatedAt: D.ts,
        },
        formTypeItem: {
          name: D.secret,
          createdAt: D.ts,
          description: D.secret,
          imports: D.list(o_Import),
        },
        lineageNodeTypeItem: {
          createdAt: D.ts,
          updatedAt: D.ts,
          formsOutput: D.map(o_FormEntryOutput),
        },
      }),
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
  operationName: "SearchTypes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type SearchUserProfilesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Searches user profiles in Amazon DataZone.
 */
export const searchUserProfiles: API.PaginatedOperationMethod<
  SearchUserProfilesInput,
  SearchUserProfilesOutput,
  SearchUserProfilesError,
  Credentials | HttpClient.HttpClient,
  UserProfileSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/search-user-profiles",
    input: {
      domainIdentifier: 0,
      userType: 0,
      searchText: 0,
      maxResults: 0,
      nextToken: 0,
    },
    output: { items: D.list({ details: o_UserProfileDetails }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchUserProfiles",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type StartDataSourceRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Start the run of the specified data source in Amazon DataZone.
 */
export const startDataSourceRun: API.OperationMethod<
  StartDataSourceRunInput,
  StartDataSourceRunOutput,
  StartDataSourceRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/data-sources/{dataSourceIdentifier}/runs",
    input: {
      domainIdentifier: 0,
      dataSourceIdentifier: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: {
      createdAt: D.ts,
      updatedAt: D.ts,
      startedAt: D.ts,
      stoppedAt: D.ts,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDataSourceRun",
})) as any;

export type StartMetadataGenerationRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts the metadata generation run.
 *
 * Prerequisites:
 *
 * - Asset must be created and belong to the specified domain and project.
 *
 * - Asset type must be supported for metadata generation (e.g., Amazon Web Services Glue table).
 *
 * - Asset must have a structured schema with valid rows and columns.
 *
 * - Valid values for --type: BUSINESS_DESCRIPTIONS, BUSINESS_NAMES, BUSINESS_GLOSSARY_ASSOCIATIONS.
 *
 * - The user must have permission to run metadata generation in the domain/project.
 */
export const startMetadataGenerationRun: API.OperationMethod<
  StartMetadataGenerationRunInput,
  StartMetadataGenerationRunOutput,
  StartMetadataGenerationRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/metadata-generation-runs",
    input: {
      domainIdentifier: 0,
      type: 0,
      types: 0,
      target: { type: 0, identifier: 0, revision: 0 },
      clientToken: D.m({ idempotency: true }),
      owningProjectIdentifier: 0,
    },
    output: { createdAt: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMetadataGenerationRun",
})) as any;

export type StartNotebookExportError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a notebook export in Amazon SageMaker Unified Studio. This operation exports a notebook to a specified file format and stores the output in Amazon Simple Storage Service.
 */
export const startNotebookExport: API.OperationMethod<
  StartNotebookExportInput,
  StartNotebookExportOutput,
  StartNotebookExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/notebook-exports",
    input: {
      domainIdentifier: 0,
      notebookIdentifier: 0,
      owningProjectIdentifier: 0,
      fileFormat: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { createdAt: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartNotebookExport",
})) as any;

export type StartNotebookImportError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a notebook import in Amazon SageMaker Unified Studio. This operation imports a notebook from an Amazon Simple Storage Service location into a project.
 */
export const startNotebookImport: API.OperationMethod<
  StartNotebookImportInput,
  StartNotebookImportOutput,
  StartNotebookImportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/notebook-imports",
    input: {
      domainIdentifier: 0,
      owningProjectIdentifier: 0,
      sourceLocation: i_SourceLocation,
      name: 0,
      description: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: {
      name: D.secret,
      description: D.secret,
      sourceLocation: o_SourceLocation,
      createdAt: D.ts,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartNotebookImport",
})) as any;

export type StartNotebookRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a notebook run in Amazon SageMaker Unified Studio. A notebook run represents the execution of an Amazon SageMaker notebook within a project. You can configure compute, network, timeout, and environment settings for the run.
 */
export const startNotebookRun: API.OperationMethod<
  StartNotebookRunInput,
  StartNotebookRunOutput,
  StartNotebookRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/notebook-runs",
    input: {
      domainIdentifier: 0,
      owningProjectIdentifier: 0,
      notebookIdentifier: 0,
      scheduleIdentifier: 0,
      computeConfiguration: { instanceType: 0, environmentVersion: 0 },
      networkConfiguration: {
        networkAccessType: 0,
        vpcId: 0,
        subnetIds: 0,
        securityGroupIds: 0,
      },
      timeoutConfiguration: { runTimeoutInMinutes: 0 },
      triggerSource: { type: 0, name: 0 },
      metadata: 0,
      parameters: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: {
      metadata: D.map(D.secret),
      createdAt: D.ts,
      updatedAt: D.ts,
      startedAt: D.ts,
      completedAt: D.ts,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartNotebookRun",
})) as any;

export type StartNotebookSyncError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a notebook sync in Amazon SageMaker Unified Studio. This operation syncs a notebook from a Git repository into a project.
 */
export const startNotebookSync: API.OperationMethod<
  StartNotebookSyncInput,
  StartNotebookSyncOutput,
  StartNotebookSyncError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/domains/{domainIdentifier}/notebook-syncs",
    input: {
      domainIdentifier: 0,
      owningProjectIdentifier: 0,
      sourceLocation: i_SourceLocation,
      gitMetadata: {
        connectionId: 0,
        repository: 0,
        branch: 0,
        commitHash: 0,
        fileName: 0,
        committedAt: 0,
        commitMessage: 0,
      },
      notebookId: 0,
      name: 0,
      description: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: {
      sourceLocation: o_SourceLocation,
      gitMetadata: o_GitMetadata,
      name: D.secret,
      description: D.secret,
      createdAt: D.ts,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartNotebookSync",
})) as any;

export type StopNotebookRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops a running notebook run in Amazon SageMaker Unified Studio.
 */
export const stopNotebookRun: API.OperationMethod<
  StopNotebookRunInput,
  StopNotebookRunOutput,
  StopNotebookRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/domains/{domainIdentifier}/notebook-runs/{identifier}/stop",
    input: {
      domainIdentifier: 0,
      identifier: 0,
      clientToken: D.m({ idempotency: true }),
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
  operationName: "StopNotebookRun",
})) as any;

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Tags a resource in Amazon DataZone.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Untags a resource in Amazon DataZone.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateAccountPoolError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the account pool.
 */
export const updateAccountPool: API.OperationMethod<
  UpdateAccountPoolInput,
  UpdateAccountPoolOutput,
  UpdateAccountPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /v2/domains/{domainIdentifier}/account-pools/{identifier}",
    input: {
      domainIdentifier: 0,
      identifier: 0,
      name: 0,
      description: 0,
      resolutionStrategy: 0,
      accountSource: i_AccountSource,
    },
    output: {
      name: D.secret,
      description: D.secret,
      accountSource: o_AccountSource,
      createdAt: D.ts,
      lastUpdatedAt: D.ts,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccountPool",
})) as any;

export type UpdateAssetFilterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an asset filter.
 *
 * Prerequisites:
 *
 * - The domain, asset, and asset filter identifier must all exist.
 *
 * - The asset must contain the columns being referenced in the update.
 *
 * - If applying a row filter, ensure the column referenced in the expression exists in the asset schema.
 */
export const updateAssetFilter: API.OperationMethod<
  UpdateAssetFilterInput,
  UpdateAssetFilterOutput,
  UpdateAssetFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /v2/domains/{domainIdentifier}/assets/{assetIdentifier}/filters/{identifier}",
    input: {
      domainIdentifier: 0,
      assetIdentifier: 0,
      identifier: 0,
      name: 0,
      description: 0,
      configuration: i_AssetFilterConfiguration,
    },
    output: { name: D.secret, description: D.secret, createdAt: D.ts },
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
  operationName: "UpdateAssetFilter",
})) as any;

export type UpdateConnectionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a connection. In Amazon DataZone, a connection enables you to connect your resources (domains, projects, and environments) to external resources and services.
 */
export const updateConnection: API.OperationMethod<
  UpdateConnectionInput,
  UpdateConnectionOutput,
  UpdateConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /v2/domains/{domainIdentifier}/connections/{identifier}",
    input: {
      configurations: D.list(i_Configuration),
      domainIdentifier: 0,
      identifier: 0,
      description: 0,
      awsLocation: i_AwsLocation,
      props: {
        athenaProperties: { workgroupName: 0 },
        glueProperties: {
          glueConnectionInput: {
            description: 0,
            connectionProperties: 0,
            authenticationConfiguration: i_AuthenticationConfigurationPatch,
          },
        },
        iamProperties: { glueLineageSyncEnabled: 0 },
        redshiftProperties: {
          storage: i_RedshiftStorageProperties,
          databaseName: 0,
          host: 0,
          port: 0,
          credentials: i_RedshiftCredentials,
          lineageSync: i_RedshiftLineageSyncConfigurationInput,
        },
        sparkEmrProperties: {
          computeArn: 0,
          instanceProfileArn: 0,
          javaVirtualEnv: 0,
          logUri: 0,
          pythonVirtualEnv: 0,
          runtimeRole: 0,
          trustedCertificatesS3Uri: 0,
          managedEndpointArn: 0,
        },
        s3Properties: {
          s3Uri: 0,
          s3AccessGrantLocationId: 0,
          registerS3AccessGrantLocation: 0,
        },
        snowflakeProperties: {
          connectivityPropertiesPatch: {
            description: 0,
            connectionProperties: 0,
            authenticationConfiguration: i_AuthenticationConfigurationPatch,
          },
          snowflakeRole: 0,
          lineageSync: i_LineageSyncInput,
        },
        amazonQProperties: { isEnabled: 0, profileArn: 0, authMode: 0 },
        mlflowProperties: { trackingServerArn: 0 },
        lakehouseProperties: { glueLineageSyncEnabled: 0 },
        vpcProperties: { vpcId: 0, subnetIds: 0, securityGroupId: 0 },
        gitProperties: { codeConnectionArn: 0, defaultBranch: 0 },
      },
    },
    output: {
      description: D.secret,
      physicalEndpoints: D.list(o_PhysicalEndpoint),
      props: o_ConnectionPropertiesOutput,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnection",
})) as any;

export type UpdateDataSourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified data source in Amazon DataZone.
 */
export const updateDataSource: API.OperationMethod<
  UpdateDataSourceInput,
  UpdateDataSourceOutput,
  UpdateDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /v2/domains/{domainIdentifier}/data-sources/{identifier}",
    input: {
      domainIdentifier: 0,
      identifier: 0,
      name: 0,
      description: 0,
      enableSetting: 0,
      publishOnImport: 0,
      assetFormsInput: D.list(i_FormInput),
      schedule: i_ScheduleConfiguration,
      configuration: i_DataSourceConfigurationInput,
      recommendation: i_RecommendationConfiguration,
      retainPermissionsOnRevokeFailure: 0,
    },
    output: {
      name: D.secret,
      description: D.secret,
      assetFormsOutput: D.list(o_FormOutput),
      lastRunAt: D.ts,
      createdAt: D.ts,
      updatedAt: D.ts,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataSource",
})) as any;

export type UpdateDomainError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a Amazon DataZone domain.
 */
export const updateDomain: API.OperationMethod<
  UpdateDomainInput,
  UpdateDomainOutput,
  UpdateDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/domains/{identifier}",
    input: {
      identifier: 0,
      description: 0,
      singleSignOn: i_SingleSignOn,
      domainExecutionRole: 0,
      serviceRole: 0,
      name: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
    output: { lastUpdatedAt: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDomain",
})) as any;

export type UpdateDomainUnitError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the domain unit.
 */
export const updateDomainUnit: API.OperationMethod<
  UpdateDomainUnitInput,
  UpdateDomainUnitOutput,
  UpdateDomainUnitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/domains/{domainIdentifier}/domain-units/{identifier}",
    input: { domainIdentifier: 0, identifier: 0, description: 0, name: 0 },
    output: {
      name: D.secret,
      description: D.secret,
      createdAt: D.ts,
      lastUpdatedAt: D.ts,
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
  operationName: "UpdateDomainUnit",
})) as any;

export type UpdateEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified environment in Amazon DataZone.
 */
export const updateEnvironment: API.OperationMethod<
  UpdateEnvironmentInput,
  UpdateEnvironmentOutput,
  UpdateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /v2/domains/{domainIdentifier}/environments/{identifier}",
    input: {
      domainIdentifier: 0,
      identifier: 0,
      name: 0,
      description: 0,
      glossaryTerms: 0,
      blueprintVersion: 0,
      userParameters: D.list(i_EnvironmentParameter),
      environmentConfigurationName: 0,
    },
    output: {
      createdAt: D.ts,
      updatedAt: D.ts,
      name: D.secret,
      description: D.secret,
      userParameters: D.list(o_CustomParameter),
      environmentConfigurationId: D.secret,
      environmentConfigurationName: D.secret,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEnvironment",
})) as any;

export type UpdateEnvironmentActionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an environment action.
 */
export const updateEnvironmentAction: API.OperationMethod<
  UpdateEnvironmentActionInput,
  UpdateEnvironmentActionOutput,
  UpdateEnvironmentActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/actions/{identifier}",
    input: {
      domainIdentifier: 0,
      environmentIdentifier: 0,
      identifier: 0,
      parameters: i_ActionParameters,
      name: 0,
      description: 0,
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
  operationName: "UpdateEnvironmentAction",
})) as any;

export type UpdateEnvironmentBlueprintError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an environment blueprint in Amazon DataZone.
 */
export const updateEnvironmentBlueprint: API.OperationMethod<
  UpdateEnvironmentBlueprintInput,
  UpdateEnvironmentBlueprintOutput,
  UpdateEnvironmentBlueprintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /v2/domains/{domainIdentifier}/environment-blueprints/{identifier}",
    input: {
      domainIdentifier: 0,
      identifier: 0,
      description: 0,
      provisioningProperties: i_ProvisioningProperties,
      userParameters: D.list(i_CustomParameter),
    },
    output: {
      description: D.secret,
      userParameters: D.list(o_CustomParameter),
      createdAt: D.ts,
      updatedAt: D.ts,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEnvironmentBlueprint",
})) as any;

export type UpdateEnvironmentProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified environment profile in Amazon DataZone.
 */
export const updateEnvironmentProfile: API.OperationMethod<
  UpdateEnvironmentProfileInput,
  UpdateEnvironmentProfileOutput,
  UpdateEnvironmentProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /v2/domains/{domainIdentifier}/environment-profiles/{identifier}",
    input: {
      domainIdentifier: 0,
      identifier: 0,
      name: 0,
      description: 0,
      userParameters: D.list(i_EnvironmentParameter),
      awsAccountId: 0,
      awsAccountRegion: 0,
    },
    output: {
      createdAt: D.ts,
      updatedAt: D.ts,
      name: D.secret,
      description: D.secret,
      userParameters: D.list(o_CustomParameter),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEnvironmentProfile",
})) as any;

export type UpdateGlossaryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the business glossary in Amazon DataZone.
 *
 * Prerequisites:
 *
 * - The glossary must exist in the given domain.
 *
 * - The caller must have the `datazone:UpdateGlossary` permission to update it.
 *
 * - When updating the name, the new name must be unique within the domain.
 *
 * - The glossary must not be deleted or in a terminal state.
 */
export const updateGlossary: API.OperationMethod<
  UpdateGlossaryInput,
  UpdateGlossaryOutput,
  UpdateGlossaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /v2/domains/{domainIdentifier}/glossaries/{identifier}",
    input: {
      domainIdentifier: 0,
      identifier: 0,
      name: 0,
      description: 0,
      status: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { name: D.secret, description: D.secret },
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
  operationName: "UpdateGlossary",
})) as any;

export type UpdateGlossaryTermError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a business glossary term in Amazon DataZone.
 *
 * Prerequisites:
 *
 * - Glossary term must exist in the specified domain.
 *
 * - New name must not conflict with existing terms in the same glossary.
 *
 * - User must have permissions on the term.
 *
 * - The term must not be in DELETED status.
 */
export const updateGlossaryTerm: API.OperationMethod<
  UpdateGlossaryTermInput,
  UpdateGlossaryTermOutput,
  UpdateGlossaryTermError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /v2/domains/{domainIdentifier}/glossary-terms/{identifier}",
    input: {
      domainIdentifier: 0,
      glossaryIdentifier: 0,
      identifier: 0,
      name: 0,
      shortDescription: 0,
      longDescription: 0,
      termRelations: i_TermRelations,
      status: 0,
    },
    output: {
      name: D.secret,
      shortDescription: D.secret,
      longDescription: D.secret,
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
  operationName: "UpdateGlossaryTerm",
})) as any;

export type UpdateGroupProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified group profile in Amazon DataZone.
 */
export const updateGroupProfile: API.OperationMethod<
  UpdateGroupProfileInput,
  UpdateGroupProfileOutput,
  UpdateGroupProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/domains/{domainIdentifier}/group-profiles/{groupIdentifier}",
    input: { domainIdentifier: 0, groupIdentifier: 0, status: 0 },
    output: { groupName: D.secret },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGroupProfile",
})) as any;

export type UpdateNotebookError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a notebook in Amazon SageMaker Unified Studio.
 */
export const updateNotebook: API.OperationMethod<
  UpdateNotebookInput,
  UpdateNotebookOutput,
  UpdateNotebookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /v2/domains/{domainIdentifier}/notebooks/{identifier}",
    input: {
      domainIdentifier: 0,
      identifier: 0,
      description: 0,
      status: 0,
      name: 0,
      cellOrder: D.list({}),
      metadata: 0,
      parameters: 0,
      environmentConfiguration: {
        imageVersion: 0,
        packageConfig: { packageManager: 0, packageSpecification: 0 },
      },
      clientToken: D.m({ idempotency: true }),
    },
    output: {
      name: D.secret,
      description: D.secret,
      createdAt: D.ts,
      updatedAt: D.ts,
      lockedAt: D.ts,
      lockExpiresAt: D.ts,
      metadata: D.map(D.secret),
      gitMetadata: o_GitMetadata,
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
  operationName: "UpdateNotebook",
})) as any;

export type UpdateProjectError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified project in Amazon DataZone.
 */
export const updateProject: API.OperationMethod<
  UpdateProjectInput,
  UpdateProjectOutput,
  UpdateProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /v2/domains/{domainIdentifier}/projects/{identifier}",
    input: {
      domainIdentifier: 0,
      identifier: 0,
      name: 0,
      description: 0,
      resourceTags: 0,
      glossaryTerms: 0,
      domainUnitId: 0,
      environmentDeploymentDetails: {
        overallDeploymentStatus: 0,
        environmentFailureReasons: D.map(D.list({ code: 0, message: 0 })),
      },
      userParameters: D.list(i_EnvironmentConfigurationUserParameter),
      projectProfileVersion: 0,
    },
    output: {
      name: D.secret,
      description: D.secret,
      createdAt: D.ts,
      lastUpdatedAt: D.ts,
      userParameters: D.list(o_EnvironmentConfigurationUserParameter),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProject",
})) as any;

export type UpdateProjectProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a project profile.
 */
export const updateProjectProfile: API.OperationMethod<
  UpdateProjectProfileInput,
  UpdateProjectProfileOutput,
  UpdateProjectProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /v2/domains/{domainIdentifier}/project-profiles/{identifier}",
    input: {
      domainIdentifier: 0,
      identifier: 0,
      name: 0,
      description: 0,
      status: 0,
      projectResourceTags: D.list(i_ResourceTagParameter),
      allowCustomProjectResourceTags: 0,
      projectResourceTagsDescription: 0,
      environmentConfigurations: D.list(i_EnvironmentConfiguration),
      domainUnitIdentifier: 0,
    },
    output: {
      name: D.secret,
      description: D.secret,
      projectResourceTagsDescription: D.secret,
      environmentConfigurations: D.list(o_EnvironmentConfiguration),
      createdAt: D.ts,
      lastUpdatedAt: D.ts,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProjectProfile",
})) as any;

export type UpdateRootDomainUnitOwnerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the owner of the root domain unit.
 */
export const updateRootDomainUnitOwner: API.OperationMethod<
  UpdateRootDomainUnitOwnerInput,
  UpdateRootDomainUnitOwnerOutput,
  UpdateRootDomainUnitOwnerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /v2/domains/{domainIdentifier}/root-domain-unit-owner",
    input: {
      domainIdentifier: 0,
      currentOwner: 0,
      newOwner: 0,
      clientToken: D.m({ idempotency: true }),
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
  operationName: "UpdateRootDomainUnitOwner",
})) as any;

export type UpdateRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a rule. In Amazon DataZone, a rule is a formal agreement that enforces specific requirements across user workflows (e.g., publishing assets to the catalog, requesting subscriptions, creating projects) within the Amazon DataZone data portal. These rules help maintain consistency, ensure compliance, and uphold governance standards in data management processes. For instance, a metadata enforcement rule can specify the required information for creating a subscription request or publishing a data asset to the catalog, ensuring alignment with organizational standards.
 */
export const updateRule: API.OperationMethod<
  UpdateRuleInput,
  UpdateRuleOutput,
  UpdateRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /v2/domains/{domainIdentifier}/rules/{identifier}",
    input: {
      domainIdentifier: 0,
      identifier: 0,
      name: 0,
      description: 0,
      scope: i_RuleScope,
      detail: i_RuleDetail,
      includeChildDomainUnits: 0,
    },
    output: {
      name: D.secret,
      description: D.secret,
      createdAt: D.ts,
      updatedAt: D.ts,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRule",
})) as any;

export type UpdateSubscriptionGrantStatusError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the status of the specified subscription grant status in Amazon DataZone.
 */
export const updateSubscriptionGrantStatus: API.OperationMethod<
  UpdateSubscriptionGrantStatusInput,
  UpdateSubscriptionGrantStatusOutput,
  UpdateSubscriptionGrantStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /v2/domains/{domainIdentifier}/subscription-grants/{identifier}/status/{assetIdentifier}",
    input: {
      domainIdentifier: 0,
      identifier: 0,
      assetIdentifier: 0,
      status: 0,
      failureCause: { message: 0 },
      targetName: 0,
    },
    output: {
      createdAt: D.ts,
      updatedAt: D.ts,
      assets: D.list(o_SubscribedAsset),
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
  operationName: "UpdateSubscriptionGrantStatus",
})) as any;

export type UpdateSubscriptionRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a specified subscription request in Amazon DataZone.
 */
export const updateSubscriptionRequest: API.OperationMethod<
  UpdateSubscriptionRequestInput,
  UpdateSubscriptionRequestOutput,
  UpdateSubscriptionRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /v2/domains/{domainIdentifier}/subscription-requests/{identifier}",
    input: { domainIdentifier: 0, identifier: 0, requestReason: 0 },
    output: {
      createdAt: D.ts,
      updatedAt: D.ts,
      requestReason: D.secret,
      subscribedPrincipals: D.list(o_SubscribedPrincipal),
      subscribedListings: D.list(o_SubscribedListing),
      decisionComment: D.secret,
      metadataForms: D.list(o_FormOutput),
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
  operationName: "UpdateSubscriptionRequest",
})) as any;

export type UpdateSubscriptionTargetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified subscription target in Amazon DataZone.
 */
export const updateSubscriptionTarget: API.OperationMethod<
  UpdateSubscriptionTargetInput,
  UpdateSubscriptionTargetOutput,
  UpdateSubscriptionTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/subscription-targets/{identifier}",
    input: {
      domainIdentifier: 0,
      environmentIdentifier: 0,
      identifier: 0,
      name: 0,
      authorizedPrincipals: 0,
      applicableAssetTypes: 0,
      subscriptionTargetConfig: D.list(i_SubscriptionTargetForm),
      manageAccessRole: 0,
      provider: 0,
      subscriptionGrantCreationMode: 0,
    },
    output: { name: D.secret, createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "UpdateSubscriptionTarget",
})) as any;

export type UpdateUserProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified user profile in Amazon DataZone.
 */
export const updateUserProfile: API.OperationMethod<
  UpdateUserProfileInput,
  UpdateUserProfileOutput,
  UpdateUserProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v2/domains/{domainIdentifier}/user-profiles/{userIdentifier}",
    input: {
      domainIdentifier: 0,
      userIdentifier: 0,
      type: 0,
      status: 0,
      sessionName: 0,
    },
    output: { details: o_UserProfileDetails },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUserProfile",
})) as any;

const i_AcceptedAssetScope: D.LazyStruct = () => ({ assetId: 0, filterIds: 0 });
const i_AccountSource: D.LazyStruct = () => ({
  accounts: D.list({ awsAccountId: 0, supportedRegions: 0, awsAccountName: 0 }),
  customAccountPoolHandler: { lambdaFunctionArn: 0, lambdaExecutionRoleArn: 0 },
});
const i_ActionParameters: D.LazyStruct = () => ({ awsConsoleLink: { uri: 0 } });
const i_AssetFilterConfiguration: D.LazyStruct = () => ({
  columnConfiguration: { includedColumnNames: 0 },
  rowConfiguration: { rowFilter: i_RowFilter, sensitive: 0 },
});
const i_AssetPermission: D.LazyStruct = () => ({
  assetId: 0,
  permissions: { s3: 0 },
});
const i_AuthenticationConfigurationInput: D.LazyStruct = () => ({
  authenticationType: 0,
  oAuth2Properties: {
    oAuth2GrantType: 0,
    oAuth2ClientApplication: {
      userManagedClientApplicationClientId: 0,
      aWSManagedClientApplicationReference: 0,
    },
    tokenUrl: 0,
    tokenUrlParametersMap: 0,
    authorizationCodeProperties: { authorizationCode: 0, redirectUri: 0 },
    oAuth2Credentials: {
      userManagedClientApplicationClientSecret: 0,
      accessToken: 0,
      refreshToken: 0,
      jwtToken: 0,
    },
  },
  secretArn: 0,
  kmsKeyArn: 0,
  basicAuthenticationCredentials: i_BasicAuthenticationCredentials,
  customAuthenticationCredentials: 0,
});
const i_AuthenticationConfigurationPatch: D.LazyStruct = () => ({
  secretArn: 0,
  basicAuthenticationCredentials: i_BasicAuthenticationCredentials,
});
const i_AwsLocation: D.LazyStruct = () => ({
  accessRole: 0,
  awsAccountId: 0,
  awsRegion: 0,
  iamConnectionId: 0,
});
const i_Configuration: D.LazyStruct = () => ({
  classification: 0,
  properties: 0,
});
const i_CustomParameter: D.LazyStruct = () => ({
  keyName: 0,
  description: 0,
  fieldType: 0,
  defaultValue: 0,
  isEditable: 0,
  isOptional: 0,
  isUpdateSupported: 0,
});
const i_DataProductItem: D.LazyStruct = () => ({
  itemType: 0,
  identifier: 0,
  revision: 0,
  glossaryTerms: 0,
});
const i_DataSourceConfigurationInput: D.LazyStruct = () => ({
  glueRunConfiguration: {
    dataAccessRole: 0,
    relationalFilterConfigurations: D.list(i_RelationalFilterConfiguration),
    autoImportDataQualityResult: 0,
    catalogName: 0,
  },
  redshiftRunConfiguration: {
    dataAccessRole: 0,
    relationalFilterConfigurations: D.list(i_RelationalFilterConfiguration),
    redshiftCredentialConfiguration: { secretManagerArn: 0 },
    redshiftStorage: {
      redshiftClusterSource: { clusterName: 0 },
      redshiftServerlessSource: { workgroupName: 0 },
    },
  },
  sageMakerRunConfiguration: { trackingAssets: 0 },
});
const i_EnvironmentConfiguration: D.LazyStruct = () => ({
  name: 0,
  id: 0,
  environmentBlueprintId: 0,
  description: 0,
  deploymentMode: 0,
  configurationParameters: {
    ssmPath: 0,
    parameterOverrides: D.list(i_EnvironmentConfigurationParameter),
    resolvedParameters: D.list(i_EnvironmentConfigurationParameter),
  },
  awsAccount: { awsAccountId: 0, awsAccountIdPath: 0 },
  accountPools: 0,
  awsRegion: { regionName: 0, regionNamePath: 0 },
  deploymentOrder: 0,
});
const i_EnvironmentConfigurationUserParameter: D.LazyStruct = () => ({
  environmentId: 0,
  environmentResolvedAccount: {
    awsAccountId: 0,
    regionName: 0,
    sourceAccountPoolId: 0,
  },
  environmentConfigurationName: 0,
  environmentParameters: D.list(i_EnvironmentParameter),
});
const i_EnvironmentParameter: D.LazyStruct = () => ({ name: 0, value: 0 });
const i_FilterClause: D.LazyStruct = () => ({
  filter: { attribute: 0, value: 0, intValue: 0, operator: 0 },
  and: D.list(i_FilterClause),
  or: D.list(i_FilterClause),
});
const i_FormInput: D.LazyStruct = () => ({
  formName: 0,
  typeIdentifier: 0,
  typeRevision: 0,
  content: 0,
});
const i_LineageSyncInput: D.LazyStruct = () => ({
  timezone: 0,
  enabled: 0,
  schedule: 0,
});
const i_Member: D.LazyStruct = () => ({
  userIdentifier: 0,
  groupIdentifier: 0,
});
const i_OwnerProperties: D.LazyStruct = () => ({
  user: { userIdentifier: 0 },
  group: { groupIdentifier: 0 },
});
const i_PhysicalConnectionRequirements: D.LazyStruct = () => ({
  subnetId: 0,
  subnetIdList: 0,
  securityGroupIdList: 0,
  availabilityZone: 0,
});
const i_PolicyGrantPrincipal: D.LazyStruct = () => ({
  user: { userIdentifier: 0, allUsersGrantFilter: {} },
  group: { groupIdentifier: 0 },
  project: {
    projectDesignation: 0,
    projectIdentifier: 0,
    projectGrantFilter: {
      domainUnitFilter: { domainUnit: 0, includeChildDomainUnits: 0 },
    },
  },
  domainUnit: {
    domainUnitDesignation: 0,
    domainUnitIdentifier: 0,
    domainUnitGrantFilter: { allDomainUnitsGrantFilter: {} },
  },
});
const i_PredictionConfiguration: D.LazyStruct = () => ({
  businessNameGeneration: { enabled: 0 },
});
const i_ProvisioningProperties: D.LazyStruct = () => ({
  cloudFormation: { templateUrl: 0 },
  manual: {},
});
const i_RecommendationConfiguration: D.LazyStruct = () => ({
  enableBusinessNameGeneration: 0,
});
const i_RedshiftCredentials: D.LazyStruct = () => ({
  secretArn: 0,
  usernamePassword: { password: 0, username: 0 },
});
const i_RedshiftLineageSyncConfigurationInput: D.LazyStruct = () => ({
  enabled: 0,
  schedule: { schedule: 0 },
});
const i_RedshiftStorageProperties: D.LazyStruct = () => ({
  clusterName: 0,
  workgroupName: 0,
});
const i_ResourceTagParameter: D.LazyStruct = () => ({
  key: 0,
  value: 0,
  isValueEditable: 0,
});
const i_RuleDetail: D.LazyStruct = () => ({
  metadataFormEnforcementDetail: {
    requiredMetadataForms: D.list({ typeIdentifier: 0, typeRevision: 0 }),
  },
  glossaryTermEnforcementDetail: { requiredGlossaryTermIds: 0 },
});
const i_RuleScope: D.LazyStruct = () => ({
  assetType: { selectionMode: 0, specificAssetTypes: 0 },
  dataProduct: 0,
  project: { selectionMode: 0, specificProjects: 0 },
});
const i_ScheduleConfiguration: D.LazyStruct = () => ({
  timezone: 0,
  schedule: 0,
});
const i_SearchInItem: D.LazyStruct = () => ({ attribute: 0 });
const i_SearchSort: D.LazyStruct = () => ({ attribute: 0, order: 0 });
const i_SingleSignOn: D.LazyStruct = () => ({
  type: 0,
  userAssignment: 0,
  idcInstanceArn: 0,
});
const i_SourceLocation: D.LazyStruct = () => ({ s3: 0 });
const i_SubscriptionTargetForm: D.LazyStruct = () => ({
  formName: 0,
  content: 0,
});
const i_TermRelations: D.LazyStruct = () => ({ isA: 0, classifies: 0 });
const i_Unit: D.LazyStruct = () => ({});
const o_AccountInfo: D.LazyStruct = () => ({ awsAccountName: D.secret });
const o_AccountSource: D.LazyStruct = () => ({
  accounts: D.list(o_AccountInfo),
});
const o_ConnectionPropertiesOutput: D.LazyStruct = () => ({
  redshiftProperties: { credentials: { usernamePassword: o_UsernamePassword } },
  sparkEmrProperties: {
    credentials: o_UsernamePassword,
    credentialsExpiration: D.ts,
  },
});
const o_CustomParameter: D.LazyStruct = () => ({ description: D.secret });
const o_DetailedGlossaryTerm: D.LazyStruct = () => ({
  name: D.secret,
  shortDescription: D.secret,
});
const o_EnvironmentConfiguration: D.LazyStruct = () => ({
  name: D.secret,
  id: D.secret,
  description: D.secret,
});
const o_EnvironmentConfigurationUserParameter: D.LazyStruct = () => ({
  environmentConfigurationName: D.secret,
});
const o_FormEntryOutput: D.LazyStruct = () => ({ typeName: D.secret });
const o_FormOutput: D.LazyStruct = () => ({ typeName: D.secret });
const o_GitMetadata: D.LazyStruct = () => ({
  repository: D.secret,
  branch: D.secret,
  committedAt: D.ts,
  commitMessage: D.secret,
});
const o_Import: D.LazyStruct = () => ({ name: D.secret });
const o_LineageNodeReference: D.LazyStruct = () => ({ eventTimestamp: D.ts });
const o_PhysicalEndpoint: D.LazyStruct = () => ({
  glueConnection: {
    creationTime: D.ts,
    lastUpdatedTime: D.ts,
    lastConnectionValidationTime: D.ts,
  },
});
const o_SourceLocation: D.LazyStruct = () => ({ s3: D.secret });
const o_SubscribedAsset: D.LazyStruct = () => ({
  grantedTimestamp: D.ts,
  failureTimestamp: D.ts,
});
const o_SubscribedListing: D.LazyStruct = () => ({
  description: D.secret,
  item: {
    assetListing: { glossaryTerms: D.list(o_DetailedGlossaryTerm) },
    productListing: { glossaryTerms: D.list(o_DetailedGlossaryTerm) },
  },
});
const o_SubscribedPrincipal: D.LazyStruct = () => ({
  project: { name: D.secret },
  user: { details: o_UserProfileDetails },
  group: { name: D.secret },
});
const o_TimeSeriesDataPointFormOutput: D.LazyStruct = () => ({
  timestamp: D.ts,
});
const o_TimeSeriesDataPointSummaryFormOutput: D.LazyStruct = () => ({
  timestamp: D.ts,
});
const o_UserProfileDetails: D.LazyStruct = () => ({
  sso: { username: D.secret, firstName: D.secret, lastName: D.secret },
});
const i_BasicAuthenticationCredentials: D.LazyStruct = () => ({
  userName: 0,
  password: 0,
});
const i_EnvironmentConfigurationParameter: D.LazyStruct = () => ({
  name: 0,
  value: 0,
  isEditable: 0,
});
const i_RelationalFilterConfiguration: D.LazyStruct = () => ({
  databaseName: 0,
  schemaName: 0,
  filterExpressions: D.list({ type: 0, expression: 0 }),
});
const i_RowFilter: D.LazyStruct = () => ({
  expression: {
    equalTo: { columnName: 0, value: 0 },
    notEqualTo: { columnName: 0, value: 0 },
    greaterThan: { columnName: 0, value: 0 },
    lessThan: { columnName: 0, value: 0 },
    greaterThanOrEqualTo: { columnName: 0, value: 0 },
    lessThanOrEqualTo: { columnName: 0, value: 0 },
    isNull: { columnName: 0 },
    isNotNull: { columnName: 0 },
    in: { columnName: 0, values: 0 },
    notIn: { columnName: 0, values: 0 },
    like: { columnName: 0, value: 0 },
    notLike: { columnName: 0, value: 0 },
  },
  and: D.list(i_RowFilter),
  or: D.list(i_RowFilter),
});
const o_UsernamePassword: D.LazyStruct = () => ({ password: D.secret });
