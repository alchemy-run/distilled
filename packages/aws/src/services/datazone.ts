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
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "DataZone", serviceShapeName: "DataZone" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "datazone" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-05-10");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
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
        return err("Invalid Configuration: FIPS and custom endpoint are not supported");
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
              return err("FIPS is enabled but this partition does not support FIPS");
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
            return err("FIPS is enabled but this partition does not support FIPS");
          }
          return e(`https://datazone.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://datazone.{R}.api.aws","properties":{},"headers":{}}',
  [
    "cn-north-1",
    "cn-northwest-1",
    "aws-cn-global",
    "us-iso-east-1",
    "us-iso-west-1",
    "aws-iso-global",
    "us-isob-east-1",
    "aws-iso-b-global",
    "aws-iso-f-global",
    "us-isof-east-1",
    "us-isof-south-1",
    "eusc-de-east-1",
  ],
);

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(429), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type SubscriptionRequestStatus = "PENDING" | "ACCEPTED" | "REJECTED" | (string & {});
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
  | { project?: never; user?: never; group?: never; iam: SubscribedIamPrincipal };
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
export type ProjectGrantFilter = { domainUnitFilter: DomainUnitFilterForProject };
export interface ProjectPolicyGrantPrincipal {
  projectDesignation: ProjectDesignation;
  projectIdentifier?: string;
  projectGrantFilter?: ProjectGrantFilter;
}
export type DomainUnitDesignation = "OWNER" | (string & {});
export interface AllDomainUnitsGrantFilter {}
export type DomainUnitGrantFilter = { allDomainUnitsGrantFilter: AllDomainUnitsGrantFilter };
export interface DomainUnitPolicyGrantPrincipal {
  domainUnitDesignation: DomainUnitDesignation;
  domainUnitIdentifier?: string;
  domainUnitGrantFilter?: DomainUnitGrantFilter;
}
export type PolicyGrantPrincipal =
  | { user: UserPolicyGrantPrincipal; group?: never; project?: never; domainUnit?: never }
  | { user?: never; group: GroupPolicyGrantPrincipal; project?: never; domainUnit?: never }
  | { user?: never; group?: never; project: ProjectPolicyGrantPrincipal; domainUnit?: never }
  | { user?: never; group?: never; project?: never; domainUnit: DomainUnitPolicyGrantPrincipal };
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
export type SubscriptionStatus = "APPROVED" | "REVOKED" | "CANCELLED" | (string & {});
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
export type TimeSeriesDataPointSummaryFormOutputList = TimeSeriesDataPointSummaryFormOutput[];
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
export type RoleArn = string;
export interface IamPropertiesInput {
  glueLineageSyncEnabled?: boolean;
  roleArn?: string;
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
export type DataProductStatus = "CREATED" | "CREATING" | "CREATE_FAILED" | (string & {});
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
  | { redshiftClusterSource: RedshiftClusterStorage; redshiftServerlessSource?: never }
  | { redshiftClusterSource?: never; redshiftServerlessSource: RedshiftServerlessStorage };
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
export type ConfigurableActionTypeAuthorization = "IAM" | "HTTPS" | (string & {});
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
export type BlueprintCategory = "TOOLING" | (string & {});
export interface CreateEnvironmentBlueprintInput {
  domainIdentifier: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  provisioningProperties: ProvisioningProperties;
  userParameters?: CustomParameter[];
  blueprintCategory?: BlueprintCategory;
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
  blueprintCategory?: BlueprintCategory;
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
export type NotebookType = "DATA" | "SQL" | (string & {});
export type MetadataKey = string;
export type MetadataValue = string | redacted.Redacted<string>;
export type Metadata = { [key: string]: string | redacted.Redacted<string> | undefined };
export type ParameterKey = string;
export type ParameterValue = string;
export type Parameters = { [key: string]: string | undefined };
export interface CreateNotebookInput {
  domainIdentifier: string;
  owningProjectIdentifier: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  type?: NotebookType;
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
  type?: NotebookType;
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
export type EnvironmentConfigurationUserParametersList = EnvironmentConfigurationUserParameter[];
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
export type EnvironmentFailureReasons = { [key: string]: EnvironmentError[] | undefined };
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
export type EnvironmentConfigurationParametersList = EnvironmentConfigurationParameter[];
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
const Region = /*@__PURE__*/ __L.at(__c221, 0);
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
export type RuleType = "METADATA_FORM_ENFORCEMENT" | "GLOSSARY_TERM_ENFORCEMENT" | (string & {});
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
  | { project: SubscribedProjectInput; user?: never; group?: never; iam?: never }
  | { project?: never; user: SubscribedUserInput; group?: never; iam?: never }
  | { project?: never; user?: never; group: SubscribedGroupInput; iam?: never }
  | { project?: never; user?: never; group?: never; iam: SubscribedIamPrincipalInput };
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
export type SubscriptionGrantCreationMode = "AUTOMATIC" | "MANUAL" | (string & {});
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
export type UserType = "IAM_USER" | "IAM_ROLE" | "SSO_USER" | "IAM_ROLE_SESSION" | (string & {});
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
  | { glueSelfGrantStatus: GlueSelfGrantStatusOutput; redshiftSelfGrantStatus?: never }
  | { glueSelfGrantStatus?: never; redshiftSelfGrantStatus: RedshiftSelfGrantStatusOutput };
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
  blueprintCategory?: BlueprintCategory;
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
export type ResourceConfigurationParameterMap = { [key: string]: string | undefined };
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
export type ProvisioningConfiguration = { lakeFormationConfiguration: LakeFormationConfiguration };
export type ProvisioningConfigurationList = ProvisioningConfiguration[];
export interface GetEnvironmentBlueprintConfigurationOutput {
  domainId: string;
  environmentBlueprintId: string;
  provisioningRoleArn?: string;
  environmentRolePermissionBoundary?: string;
  manageAccessRoleArn?: string;
  enabledRegions?: string[];
  regionalParameters?: { [key: string]: { [key: string]: string | undefined } | undefined };
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
  type?: NotebookType;
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
export type NotebookExportStatus = "IN_PROGRESS" | "SUCCEEDED" | "FAILED" | (string & {});
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
export type NetworkAccessType = "PUBLIC_INTERNET_ONLY" | "VPC_ONLY" | (string & {});
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
export type NotifyOnState =
  | "SUCCEEDED"
  | "FAILED"
  | "STOPPED"
  | "QUEUED"
  | "STARTING"
  | "RUNNING"
  | "STOPPING"
  | (string & {});
export type NotifyOnStates = NotifyOnState[];
export interface NotificationConfig {
  notifyOn: NotifyOnState[];
}
export type TriggerSourceType = "MANUAL" | "SCHEDULED" | "WORKFLOW" | (string & {});
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
  notificationConfiguration?: NotificationConfig;
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
  regionalParameters?: { [key: string]: { [key: string]: string | undefined } | undefined };
  allowUserProvidedConfigurations?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  resourceConfigurations?: ResourceConfiguration[];
  provisioningConfigurations?: ProvisioningConfiguration[];
}
export type EnvironmentBlueprintConfigurations = EnvironmentBlueprintConfigurationItem[];
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
  blueprintCategory?: BlueprintCategory;
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
export type EventSummary = { openLineageRunEventSummary: OpenLineageRunEventSummary };
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
  type?: NotebookType;
  nextToken?: string;
}
export interface NotebookSummary {
  id: string;
  name: string | redacted.Redacted<string>;
  owningProjectId: string;
  domainId: string;
  status: NotebookStatus;
  type?: NotebookType;
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
  regionalParameters?: { [key: string]: { [key: string]: string | undefined } | undefined };
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
  regionalParameters?: { [key: string]: { [key: string]: string | undefined } | undefined };
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
export type FilterOperator = "EQ" | "LE" | "LT" | "GE" | "GT" | "TEXT_SEARCH" | (string & {});
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
export type SearchOutputAdditionalAttributes = SearchOutputAdditionalAttribute[];
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
export type TypesSearchScope = "ASSET_TYPE" | "FORM_TYPE" | "LINEAGE_NODE_TYPE" | (string & {});
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
  | { assetTypeItem: AssetTypeItem; formTypeItem?: never; lineageNodeTypeItem?: never }
  | { assetTypeItem?: never; formTypeItem: FormTypeData; lineageNodeTypeItem?: never }
  | { assetTypeItem?: never; formTypeItem?: never; lineageNodeTypeItem: LineageNodeTypeItem };
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
  notificationConfiguration?: NotificationConfig;
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
  notificationConfiguration?: NotificationConfig;
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
  blueprintCategory?: BlueprintCategory;
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
  blueprintCategory?: BlueprintCategory;
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
  type?: NotebookType;
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
  type?: NotebookType;
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
  input: __S(7010, __c219, 2) as any as S.Schema<AcceptPredictionsInput>,
  output: __S(7011, __c219, 3) as any as S.Schema<AcceptPredictionsOutput>,
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
}));

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
  input: __S(7424, __c232, 0) as any as S.Schema<AcceptSubscriptionRequestInput>,
  output: __S(7744, __c242, 0) as any as S.Schema<AcceptSubscriptionRequestOutput>,
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
}));

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
  input: __S(8256, __c258, 0) as any as S.Schema<AddEntityOwnerInput>,
  output: __S(8288, __c259, 0) as any as S.Schema<AddEntityOwnerOutput>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<AddPolicyGrantInput>,
  output: __S(1, __c0, 1) as any as S.Schema<AddPolicyGrantOutput>,
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
}));

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
  input: __S(544, __c17, 0) as any as S.Schema<AssociateEnvironmentRoleInput>,
  output: __S(8288, __c259, 0) as any as S.Schema<AssociateEnvironmentRoleOutput>,
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
}));

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
  input: __S(928, __c29, 0) as any as S.Schema<AssociateGovernedTermsInput>,
  output: __S(8288, __c259, 0) as any as S.Schema<AssociateGovernedTermsOutput>,
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
}));

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
  input: __S(1280, __c40, 0) as any as S.Schema<BatchGetAttributesMetadataInput>,
  output: __S(1283, __c40, 3) as any as S.Schema<BatchGetAttributesMetadataOutput>,
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
}));

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
  input: __S(1666, __c52, 2) as any as S.Schema<BatchPutAttributesMetadataInput>,
  output: __S(1669, __c52, 5) as any as S.Schema<BatchPutAttributesMetadataOutput>,
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
}));

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
  input: __S(2048, __c64, 0) as any as S.Schema<CancelMetadataGenerationRunInput>,
  output: __S(8288, __c259, 0) as any as S.Schema<CancelMetadataGenerationRunOutput>,
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
}));

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
  input: __S(2432, __c76, 0) as any as S.Schema<CancelSubscriptionInput>,
  output: __S(2464, __c77, 0) as any as S.Schema<CancelSubscriptionOutput>,
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
}));

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
  input: __S(2912, __c91, 0) as any as S.Schema<CreateAccountPoolInput>,
  output: __S(2978, __c93, 2) as any as S.Schema<CreateAccountPoolOutput>,
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
}));

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
  input: __S(3328, __c104, 0) as any as S.Schema<CreateAssetInput>,
  output: __S(3362, __c105, 2) as any as S.Schema<CreateAssetOutput>,
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
}));

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
  input: __S(3776, __c118, 0) as any as S.Schema<CreateAssetFilterInput>,
  output: __S(3817, __c119, 9) as any as S.Schema<CreateAssetFilterOutput>,
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
}));

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
  input: __S(4064, __c127, 0) as any as S.Schema<CreateAssetRevisionInput>,
  output: __S(3362, __c105, 2) as any as S.Schema<CreateAssetRevisionOutput>,
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
}));

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
 * - The name of the asset type must be unique within the domain -- duplicate names will cause failure.
 *
 * - JSON input must be valid -- incorrect formatting causes Invalid JSON errors.
 */
export const createAssetType: API.OperationMethod<
  CreateAssetTypeInput,
  CreateAssetTypeOutput,
  CreateAssetTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4098, __c128, 2) as any as S.Schema<CreateAssetTypeInput>,
  output: __S(4099, __c128, 3) as any as S.Schema<CreateAssetTypeOutput>,
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
}));

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
  input: __S(4169, __c130, 9) as any as S.Schema<CreateConnectionInput>,
  output: __S(4170, __c130, 10) as any as S.Schema<CreateConnectionOutput>,
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
}));

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
  input: __S(4352, __c136, 0) as any as S.Schema<CreateDataProductInput>,
  output: __S(4386, __c137, 2) as any as S.Schema<CreateDataProductOutput>,
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
}));

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
  input: __S(4416, __c138, 0) as any as S.Schema<CreateDataProductRevisionInput>,
  output: __S(4386, __c137, 2) as any as S.Schema<CreateDataProductRevisionOutput>,
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
}));

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
  input: __S(4448, __c139, 0) as any as S.Schema<CreateDataSourceInput>,
  output: __S(4449, __c139, 1) as any as S.Schema<CreateDataSourceOutput>,
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
}));

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
  input: __S(4640, __c145, 0) as any as S.Schema<CreateDomainInput>,
  output: __S(4641, __c145, 1) as any as S.Schema<CreateDomainOutput>,
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
}));

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
  input: __S(4704, __c147, 0) as any as S.Schema<CreateDomainUnitInput>,
  output: __S(4705, __c147, 1) as any as S.Schema<CreateDomainUnitOutput>,
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
}));

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
  input: __S(4768, __c149, 0) as any as S.Schema<CreateEnvironmentInput>,
  output: __S(4967, __c155, 7) as any as S.Schema<CreateEnvironmentOutput>,
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
}));

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
  input: __S(4992, __c156, 0) as any as S.Schema<CreateEnvironmentActionInput>,
  output: __S(5026, __c157, 2) as any as S.Schema<CreateEnvironmentActionOutput>,
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
}));

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
  input: __S(5056, __c158, 0) as any as S.Schema<CreateEnvironmentBlueprintInput>,
  output: __S(5088, __c159, 0) as any as S.Schema<CreateEnvironmentBlueprintOutput>,
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
}));

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
  input: __S(5120, __c160, 0) as any as S.Schema<CreateEnvironmentProfileInput>,
  output: __S(5152, __c161, 0) as any as S.Schema<CreateEnvironmentProfileOutput>,
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
}));

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
  input: __S(5184, __c162, 0) as any as S.Schema<CreateFormTypeInput>,
  output: __S(5185, __c162, 1) as any as S.Schema<CreateFormTypeOutput>,
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
}));

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
  input: __S(5248, __c164, 0) as any as S.Schema<CreateGlossaryInput>,
  output: __S(5280, __c165, 0) as any as S.Schema<CreateGlossaryOutput>,
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
}));

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
  input: __S(5312, __c166, 0) as any as S.Schema<CreateGlossaryTermInput>,
  output: __S(5344, __c167, 0) as any as S.Schema<CreateGlossaryTermOutput>,
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
}));

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
  input: __S(5408, __c169, 0) as any as S.Schema<CreateGroupProfileInput>,
  output: __S(5440, __c170, 0) as any as S.Schema<CreateGroupProfileOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGroupProfile",
}));

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
  input: __S(5472, __c171, 0) as any as S.Schema<CreateListingChangeSetInput>,
  output: __S(5473, __c171, 1) as any as S.Schema<CreateListingChangeSetOutput>,
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
}));

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
  input: __S(5504, __c172, 0) as any as S.Schema<CreateNotebookInput>,
  output: __S(5600, __c175, 0) as any as S.Schema<CreateNotebookOutput>,
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
}));

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
  input: __S(5666, __c177, 2) as any as S.Schema<CreateProjectInput>,
  output: __S(5736, __c179, 8) as any as S.Schema<CreateProjectOutput>,
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
}));

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
  input: __S(5792, __c181, 0) as any as S.Schema<CreateProjectMembershipInput>,
  output: __S(8288, __c259, 0) as any as S.Schema<CreateProjectMembershipOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProjectMembership",
}));

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
  input: __S(5824, __c182, 0) as any as S.Schema<CreateProjectProfileInput>,
  output: __S(5864, __c183, 8) as any as S.Schema<CreateProjectProfileOutput>,
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
}));

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
  input: __S(5888, __c184, 0) as any as S.Schema<CreateRuleInput>,
  output: __S(5889, __c184, 1) as any as S.Schema<CreateRuleOutput>,
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
}));

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
  input: __S(5988, __c187, 4) as any as S.Schema<CreateSubscriptionGrantInput>,
  output: __S(6021, __c188, 5) as any as S.Schema<CreateSubscriptionGrantOutput>,
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
}));

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
  input: __S(6053, __c189, 5) as any as S.Schema<CreateSubscriptionRequestInput>,
  output: __S(7744, __c242, 0) as any as S.Schema<CreateSubscriptionRequestOutput>,
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
}));

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
  input: __S(6080, __c190, 0) as any as S.Schema<CreateSubscriptionTargetInput>,
  output: __S(6114, __c191, 2) as any as S.Schema<CreateSubscriptionTargetOutput>,
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
}));

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
  input: __S(6144, __c192, 0) as any as S.Schema<CreateUserProfileInput>,
  output: __S(6176, __c193, 0) as any as S.Schema<CreateUserProfileOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUserProfile",
}));

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
  input: __S(6208, __c194, 0) as any as S.Schema<DeleteAccountPoolInput>,
  output: __S(8288, __c259, 0) as any as S.Schema<DeleteAccountPoolOutput>,
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
}));

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
  input: __S(6240, __c195, 0) as any as S.Schema<DeleteAssetInput>,
  output: __S(8288, __c259, 0) as any as S.Schema<DeleteAssetOutput>,
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
}));

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
  input: __S(6272, __c196, 0) as any as S.Schema<DeleteAssetFilterInput>,
  output: __S(8288, __c259, 0) as any as S.Schema<DeleteAssetFilterResponse>,
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
}));

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
  input: __S(6304, __c197, 0) as any as S.Schema<DeleteAssetTypeInput>,
  output: __S(8288, __c259, 0) as any as S.Schema<DeleteAssetTypeOutput>,
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
}));

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
  input: __S(6336, __c198, 0) as any as S.Schema<DeleteConnectionInput>,
  output: __S(6337, __c198, 1) as any as S.Schema<DeleteConnectionOutput>,
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
}));

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
  input: __S(6368, __c199, 0) as any as S.Schema<DeleteDataExportConfigurationInput>,
  output: __S(8288, __c259, 0) as any as S.Schema<DeleteDataExportConfigurationOutput>,
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
}));

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
  input: __S(6400, __c200, 0) as any as S.Schema<DeleteDataProductInput>,
  output: __S(8288, __c259, 0) as any as S.Schema<DeleteDataProductOutput>,
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
}));

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
  input: __S(6432, __c201, 0) as any as S.Schema<DeleteDataSourceInput>,
  output: __S(6433, __c201, 1) as any as S.Schema<DeleteDataSourceOutput>,
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
}));

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
  input: __S(6496, __c203, 0) as any as S.Schema<DeleteDomainInput>,
  output: __S(6497, __c203, 1) as any as S.Schema<DeleteDomainOutput>,
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
}));

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
  input: __S(6528, __c204, 0) as any as S.Schema<DeleteDomainUnitInput>,
  output: __S(8288, __c259, 0) as any as S.Schema<DeleteDomainUnitOutput>,
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
}));

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
  input: __S(6560, __c205, 0) as any as S.Schema<DeleteEnvironmentInput>,
  output: __S(8288, __c259, 0) as any as S.Schema<DeleteEnvironmentResponse>,
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
}));

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
  input: __S(6592, __c206, 0) as any as S.Schema<DeleteEnvironmentActionInput>,
  output: __S(8288, __c259, 0) as any as S.Schema<DeleteEnvironmentActionResponse>,
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
}));

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
  input: __S(6624, __c207, 0) as any as S.Schema<DeleteEnvironmentBlueprintInput>,
  output: __S(8288, __c259, 0) as any as S.Schema<DeleteEnvironmentBlueprintResponse>,
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
}));

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
  input: __S(6656, __c208, 0) as any as S.Schema<DeleteEnvironmentBlueprintConfigurationInput>,
  output: __S(8288, __c259, 0) as any as S.Schema<DeleteEnvironmentBlueprintConfigurationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ValidationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEnvironmentBlueprintConfiguration",
}));

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
  input: __S(6688, __c209, 0) as any as S.Schema<DeleteEnvironmentProfileInput>,
  output: __S(8288, __c259, 0) as any as S.Schema<DeleteEnvironmentProfileResponse>,
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
}));

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
  input: __S(6720, __c210, 0) as any as S.Schema<DeleteFormTypeInput>,
  output: __S(8288, __c259, 0) as any as S.Schema<DeleteFormTypeOutput>,
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
}));

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
  input: __S(6752, __c211, 0) as any as S.Schema<DeleteGlossaryInput>,
  output: __S(8288, __c259, 0) as any as S.Schema<DeleteGlossaryOutput>,
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
}));

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
  input: __S(6784, __c212, 0) as any as S.Schema<DeleteGlossaryTermInput>,
  output: __S(8288, __c259, 0) as any as S.Schema<DeleteGlossaryTermOutput>,
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
}));

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
  input: __S(6816, __c213, 0) as any as S.Schema<DeleteLineageEventInput>,
  output: __S(6817, __c213, 1) as any as S.Schema<DeleteLineageEventOutput>,
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
}));

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
  input: __S(6848, __c214, 0) as any as S.Schema<DeleteListingInput>,
  output: __S(8288, __c259, 0) as any as S.Schema<DeleteListingOutput>,
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
}));

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
  input: __S(6880, __c215, 0) as any as S.Schema<DeleteNotebookInput>,
  output: __S(8288, __c259, 0) as any as S.Schema<DeleteNotebookOutput>,
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
}));

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
  input: __S(6912, __c216, 0) as any as S.Schema<DeleteProjectInput>,
  output: __S(8288, __c259, 0) as any as S.Schema<DeleteProjectOutput>,
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
}));

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
  input: __S(6944, __c217, 0) as any as S.Schema<DeleteProjectMembershipInput>,
  output: __S(8288, __c259, 0) as any as S.Schema<DeleteProjectMembershipOutput>,
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
}));

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
  input: __S(6976, __c218, 0) as any as S.Schema<DeleteProjectProfileInput>,
  output: __S(8288, __c259, 0) as any as S.Schema<DeleteProjectProfileOutput>,
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
}));

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
  input: __S(7104, __c222, 0) as any as S.Schema<DeleteRuleInput>,
  output: __S(8288, __c259, 0) as any as S.Schema<DeleteRuleOutput>,
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
}));

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
  input: __S(7136, __c223, 0) as any as S.Schema<DeleteSubscriptionGrantInput>,
  output: __S(6021, __c188, 5) as any as S.Schema<DeleteSubscriptionGrantOutput>,
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
}));

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
  input: __S(7168, __c224, 0) as any as S.Schema<DeleteSubscriptionRequestInput>,
  output: __S(8288, __c259, 0) as any as S.Schema<DeleteSubscriptionRequestResponse>,
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
}));

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
  input: __S(7200, __c225, 0) as any as S.Schema<DeleteSubscriptionTargetInput>,
  output: __S(8288, __c259, 0) as any as S.Schema<DeleteSubscriptionTargetResponse>,
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
}));

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
  input: __S(7232, __c226, 0) as any as S.Schema<DeleteTimeSeriesDataPointsInput>,
  output: __S(8288, __c259, 0) as any as S.Schema<DeleteTimeSeriesDataPointsOutput>,
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
}));

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
  input: __S(7264, __c227, 0) as any as S.Schema<DisassociateEnvironmentRoleInput>,
  output: __S(8288, __c259, 0) as any as S.Schema<DisassociateEnvironmentRoleOutput>,
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
}));

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
  input: __S(7296, __c228, 0) as any as S.Schema<DisassociateGovernedTermsInput>,
  output: __S(8288, __c259, 0) as any as S.Schema<DisassociateGovernedTermsOutput>,
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
}));

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
  input: __S(7328, __c229, 0) as any as S.Schema<GetAccountPoolInput>,
  output: __S(2978, __c93, 2) as any as S.Schema<GetAccountPoolOutput>,
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
}));

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
  input: __S(7360, __c230, 0) as any as S.Schema<GetAssetInput>,
  output: __S(7361, __c230, 1) as any as S.Schema<GetAssetOutput>,
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
}));

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
  input: __S(7392, __c231, 0) as any as S.Schema<GetAssetFilterInput>,
  output: __S(3817, __c119, 9) as any as S.Schema<GetAssetFilterOutput>,
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
}));

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
  input: __S(7776, __c243, 0) as any as S.Schema<GetAssetTypeInput>,
  output: __S(7808, __c244, 0) as any as S.Schema<GetAssetTypeOutput>,
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
}));

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
  input: __S(7840, __c245, 0) as any as S.Schema<GetConnectionInput>,
  output: __S(7841, __c245, 1) as any as S.Schema<GetConnectionOutput>,
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
}));

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
  input: __S(7904, __c247, 0) as any as S.Schema<GetDataExportConfigurationInput>,
  output: __S(7905, __c247, 1) as any as S.Schema<GetDataExportConfigurationOutput>,
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
}));

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
  input: __S(7968, __c249, 0) as any as S.Schema<GetDataProductInput>,
  output: __S(4386, __c137, 2) as any as S.Schema<GetDataProductOutput>,
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
}));

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
  input: __S(8000, __c250, 0) as any as S.Schema<GetDataSourceInput>,
  output: __S(8001, __c250, 1) as any as S.Schema<GetDataSourceOutput>,
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
}));

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
  input: __S(8032, __c251, 0) as any as S.Schema<GetDataSourceRunInput>,
  output: __S(8033, __c251, 1) as any as S.Schema<GetDataSourceRunOutput>,
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
}));

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
  input: __S(8128, __c254, 0) as any as S.Schema<GetDomainInput>,
  output: __S(8132, __c254, 4) as any as S.Schema<GetDomainOutput>,
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
}));

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
  input: __S(8160, __c255, 0) as any as S.Schema<GetDomainUnitInput>,
  output: __S(8161, __c255, 1) as any as S.Schema<GetDomainUnitOutput>,
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
}));

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
  input: __S(8192, __c256, 0) as any as S.Schema<GetEnvironmentInput>,
  output: __S(4967, __c155, 7) as any as S.Schema<GetEnvironmentOutput>,
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
}));

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
  input: __S(8224, __c257, 0) as any as S.Schema<GetEnvironmentActionInput>,
  output: __S(5026, __c157, 2) as any as S.Schema<GetEnvironmentActionOutput>,
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
}));

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
  input: __S(8352, __c261, 0) as any as S.Schema<GetEnvironmentBlueprintInput>,
  output: __S(5088, __c159, 0) as any as S.Schema<GetEnvironmentBlueprintOutput>,
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
}));

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
  input: __S(8384, __c262, 0) as any as S.Schema<GetEnvironmentBlueprintConfigurationInput>,
  output: __S(8422, __c263, 6) as any as S.Schema<GetEnvironmentBlueprintConfigurationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironmentBlueprintConfiguration",
}));

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
  input: __S(8448, __c264, 0) as any as S.Schema<GetEnvironmentCredentialsInput>,
  output: __S(7872, __c246, 0) as any as S.Schema<GetEnvironmentCredentialsOutput>,
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
}));

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
  input: __S(8480, __c265, 0) as any as S.Schema<GetEnvironmentProfileInput>,
  output: __S(5152, __c161, 0) as any as S.Schema<GetEnvironmentProfileOutput>,
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
}));

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
  input: __S(8512, __c266, 0) as any as S.Schema<GetFormTypeInput>,
  output: __S(8513, __c266, 1) as any as S.Schema<GetFormTypeOutput>,
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
}));

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
  input: __S(8576, __c268, 0) as any as S.Schema<GetGlossaryInput>,
  output: __S(8577, __c268, 1) as any as S.Schema<GetGlossaryOutput>,
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
}));

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
  input: __S(8608, __c269, 0) as any as S.Schema<GetGlossaryTermInput>,
  output: __S(8609, __c269, 1) as any as S.Schema<GetGlossaryTermOutput>,
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
}));

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
  input: __S(8640, __c270, 0) as any as S.Schema<GetGroupProfileInput>,
  output: __S(5440, __c170, 0) as any as S.Schema<GetGroupProfileOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroupProfile",
}));

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
  input: __S(8672, __c271, 0) as any as S.Schema<GetIamPortalLoginUrlInput>,
  output: __S(8673, __c271, 1) as any as S.Schema<GetIamPortalLoginUrlOutput>,
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
}));

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
  input: __S(8704, __c272, 0) as any as S.Schema<GetJobRunInput>,
  output: __S(8708, __c272, 4) as any as S.Schema<GetJobRunOutput>,
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
}));

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
  input: __S(96, __c3, 0) as any as S.Schema<GetLineageEventInput>,
  output: __S(97, __c3, 1) as any as S.Schema<GetLineageEventOutput>,
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
}));

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
  input: __S(128, __c4, 0) as any as S.Schema<GetLineageNodeInput>,
  output: __S(131, __c4, 3) as any as S.Schema<GetLineageNodeOutput>,
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
}));

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
  input: __S(160, __c5, 0) as any as S.Schema<GetListingInput>,
  output: __S(164, __c5, 4) as any as S.Schema<GetListingOutput>,
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
}));

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
  input: __S(224, __c7, 0) as any as S.Schema<GetMetadataGenerationRunInput>,
  output: __S(227, __c7, 3) as any as S.Schema<GetMetadataGenerationRunOutput>,
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
}));

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
  input: __S(288, __c9, 0) as any as S.Schema<GetNotebookInput>,
  output: __S(5600, __c175, 0) as any as S.Schema<GetNotebookOutput>,
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
}));

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
  input: __S(320, __c10, 0) as any as S.Schema<GetNotebookExportInput>,
  output: __S(323, __c10, 3) as any as S.Schema<GetNotebookExportOutput>,
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
}));

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
  input: __S(352, __c11, 0) as any as S.Schema<GetNotebookRunInput>,
  output: __S(421, __c13, 5) as any as S.Schema<GetNotebookRunOutput>,
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
}));

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
  input: __S(448, __c14, 0) as any as S.Schema<GetProjectInput>,
  output: __S(5736, __c179, 8) as any as S.Schema<GetProjectOutput>,
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
}));

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
  input: __S(480, __c15, 0) as any as S.Schema<GetProjectProfileInput>,
  output: __S(5864, __c183, 8) as any as S.Schema<GetProjectProfileOutput>,
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
}));

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
  input: __S(512, __c16, 0) as any as S.Schema<GetRuleInput>,
  output: __S(513, __c16, 1) as any as S.Schema<GetRuleOutput>,
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
}));

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
  input: __S(576, __c18, 0) as any as S.Schema<GetSubscriptionInput>,
  output: __S(2464, __c77, 0) as any as S.Schema<GetSubscriptionOutput>,
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
}));

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
  input: __S(608, __c19, 0) as any as S.Schema<GetSubscriptionGrantInput>,
  output: __S(6021, __c188, 5) as any as S.Schema<GetSubscriptionGrantOutput>,
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
}));

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
  input: __S(640, __c20, 0) as any as S.Schema<GetSubscriptionRequestDetailsInput>,
  output: __S(7744, __c242, 0) as any as S.Schema<GetSubscriptionRequestDetailsOutput>,
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
}));

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
  input: __S(672, __c21, 0) as any as S.Schema<GetSubscriptionTargetInput>,
  output: __S(6114, __c191, 2) as any as S.Schema<GetSubscriptionTargetOutput>,
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
}));

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
  input: __S(704, __c22, 0) as any as S.Schema<GetTimeSeriesDataPointInput>,
  output: __S(705, __c22, 1) as any as S.Schema<GetTimeSeriesDataPointOutput>,
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
}));

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
  input: __S(768, __c24, 0) as any as S.Schema<GetUserProfileInput>,
  output: __S(6176, __c193, 0) as any as S.Schema<GetUserProfileOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUserProfile",
}));

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
  input: __S(800, __c25, 0) as any as S.Schema<ListAccountPoolsInput>,
  output: __S(803, __c25, 3) as any as S.Schema<ListAccountPoolsOutput>,
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
  input: __S(832, __c26, 0) as any as S.Schema<ListAccountsInAccountPoolInput>,
  output: __S(833, __c26, 1) as any as S.Schema<ListAccountsInAccountPoolOutput>,
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
  input: __S(864, __c27, 0) as any as S.Schema<ListAssetFiltersInput>,
  output: __S(867, __c27, 3) as any as S.Schema<ListAssetFiltersOutput>,
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
  input: __S(896, __c28, 0) as any as S.Schema<ListAssetRevisionsInput>,
  output: __S(899, __c28, 3) as any as S.Schema<ListAssetRevisionsOutput>,
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
  input: __S(960, __c30, 0) as any as S.Schema<ListConnectionsInput>,
  output: __S(963, __c30, 3) as any as S.Schema<ListConnectionsOutput>,
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
  input: __S(992, __c31, 0) as any as S.Schema<ListDataProductRevisionsInput>,
  output: __S(995, __c31, 3) as any as S.Schema<ListDataProductRevisionsOutput>,
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
  input: __S(1024, __c32, 0) as any as S.Schema<ListDataSourceRunActivitiesInput>,
  output: __S(1028, __c32, 4) as any as S.Schema<ListDataSourceRunActivitiesOutput>,
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
  input: __S(1056, __c33, 0) as any as S.Schema<ListDataSourceRunsInput>,
  output: __S(1059, __c33, 3) as any as S.Schema<ListDataSourceRunsOutput>,
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
  input: __S(1088, __c34, 0) as any as S.Schema<ListDataSourcesInput>,
  output: __S(1091, __c34, 3) as any as S.Schema<ListDataSourcesOutput>,
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
  input: __S(1120, __c35, 0) as any as S.Schema<ListDomainsInput>,
  output: __S(1123, __c35, 3) as any as S.Schema<ListDomainsOutput>,
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
  input: __S(1152, __c36, 0) as any as S.Schema<ListDomainUnitsForParentInput>,
  output: __S(1155, __c36, 3) as any as S.Schema<ListDomainUnitsForParentOutput>,
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
  input: __S(1184, __c37, 0) as any as S.Schema<ListEntityOwnersInput>,
  output: __S(1185, __c37, 1) as any as S.Schema<ListEntityOwnersOutput>,
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
  input: __S(1216, __c38, 0) as any as S.Schema<ListEnvironmentActionsInput>,
  output: __S(1218, __c38, 2) as any as S.Schema<ListEnvironmentActionsOutput>,
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
  input: __S(1248, __c39, 0) as any as S.Schema<ListEnvironmentBlueprintConfigurationsInput>,
  output: __S(1250, __c39, 2) as any as S.Schema<ListEnvironmentBlueprintConfigurationsOutput>,
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
  input: __S(1344, __c42, 0) as any as S.Schema<ListEnvironmentBlueprintsInput>,
  output: __S(1347, __c42, 3) as any as S.Schema<ListEnvironmentBlueprintsOutput>,
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
  input: __S(1376, __c43, 0) as any as S.Schema<ListEnvironmentProfilesInput>,
  output: __S(1379, __c43, 3) as any as S.Schema<ListEnvironmentProfilesOutput>,
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
  input: __S(1408, __c44, 0) as any as S.Schema<ListEnvironmentsInput>,
  output: __S(1411, __c44, 3) as any as S.Schema<ListEnvironmentsOutput>,
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
  input: __S(1440, __c45, 0) as any as S.Schema<ListJobRunsInput>,
  output: __S(1443, __c45, 3) as any as S.Schema<ListJobRunsOutput>,
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
  input: __S(1472, __c46, 0) as any as S.Schema<ListLineageEventsInput>,
  output: __S(1479, __c46, 7) as any as S.Schema<ListLineageEventsOutput>,
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
  input: __S(1504, __c47, 0) as any as S.Schema<ListLineageNodeHistoryInput>,
  output: __S(1507, __c47, 3) as any as S.Schema<ListLineageNodeHistoryOutput>,
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
  input: __S(1536, __c48, 0) as any as S.Schema<ListMetadataGenerationRunsInput>,
  output: __S(1539, __c48, 3) as any as S.Schema<ListMetadataGenerationRunsOutput>,
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
  input: __S(1568, __c49, 0) as any as S.Schema<ListNotebookRunsInput>,
  output: __S(1571, __c49, 3) as any as S.Schema<ListNotebookRunsOutput>,
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
  input: __S(1600, __c50, 0) as any as S.Schema<ListNotebooksInput>,
  output: __S(1603, __c50, 3) as any as S.Schema<ListNotebooksOutput>,
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
  input: __S(1632, __c51, 0) as any as S.Schema<ListNotificationsInput>,
  output: __S(1637, __c51, 5) as any as S.Schema<ListNotificationsOutput>,
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
  input: __S(1728, __c54, 0) as any as S.Schema<ListPolicyGrantsInput>,
  output: __S(1731, __c54, 3) as any as S.Schema<ListPolicyGrantsOutput>,
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
  input: __S(1760, __c55, 0) as any as S.Schema<ListProjectMembershipsInput>,
  output: __S(1766, __c55, 6) as any as S.Schema<ListProjectMembershipsOutput>,
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
  input: __S(1792, __c56, 0) as any as S.Schema<ListProjectProfilesInput>,
  output: __S(1795, __c56, 3) as any as S.Schema<ListProjectProfilesOutput>,
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
  input: __S(1824, __c57, 0) as any as S.Schema<ListProjectsInput>,
  output: __S(1827, __c57, 3) as any as S.Schema<ListProjectsOutput>,
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
  input: __S(1856, __c58, 0) as any as S.Schema<ListRulesInput>,
  output: __S(1859, __c58, 3) as any as S.Schema<ListRulesOutput>,
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
  input: __S(1888, __c59, 0) as any as S.Schema<ListSubscriptionGrantsInput>,
  output: __S(1890, __c59, 2) as any as S.Schema<ListSubscriptionGrantsOutput>,
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
  input: __S(1920, __c60, 0) as any as S.Schema<ListSubscriptionRequestsInput>,
  output: __S(1925, __c60, 5) as any as S.Schema<ListSubscriptionRequestsOutput>,
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
  input: __S(1952, __c61, 0) as any as S.Schema<ListSubscriptionsInput>,
  output: __S(1954, __c61, 2) as any as S.Schema<ListSubscriptionsOutput>,
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
  input: __S(1984, __c62, 0) as any as S.Schema<ListSubscriptionTargetsInput>,
  output: __S(1986, __c62, 2) as any as S.Schema<ListSubscriptionTargetsOutput>,
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
  input: __S(2016, __c63, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(2017, __c63, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(2080, __c65, 0) as any as S.Schema<ListTimeSeriesDataPointsInput>,
  output: __S(2081, __c65, 1) as any as S.Schema<ListTimeSeriesDataPointsOutput>,
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
  input: __S(2112, __c66, 0) as any as S.Schema<PostLineageEventInput>,
  output: __S(2113, __c66, 1) as any as S.Schema<PostLineageEventOutput>,
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
}));

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
  input: __S(2146, __c67, 2) as any as S.Schema<PostTimeSeriesDataPointsInput>,
  output: __S(2148, __c67, 4) as any as S.Schema<PostTimeSeriesDataPointsOutput>,
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
}));

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
  input: __S(2176, __c68, 0) as any as S.Schema<PutDataExportConfigurationInput>,
  output: __S(8288, __c259, 0) as any as S.Schema<PutDataExportConfigurationOutput>,
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
}));

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
  input: __S(2210, __c69, 2) as any as S.Schema<PutEnvironmentBlueprintConfigurationInput>,
  output: __S(8422, __c263, 6) as any as S.Schema<PutEnvironmentBlueprintConfigurationOutput>,
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
}));

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
  input: __S(2245, __c70, 5) as any as S.Schema<QueryGraphInput>,
  output: __S(2249, __c70, 9) as any as S.Schema<QueryGraphOutput>,
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
  input: __S(2307, __c72, 3) as any as S.Schema<RejectPredictionsInput>,
  output: __S(2308, __c72, 4) as any as S.Schema<RejectPredictionsOutput>,
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
}));

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
  input: __S(2336, __c73, 0) as any as S.Schema<RejectSubscriptionRequestInput>,
  output: __S(7744, __c242, 0) as any as S.Schema<RejectSubscriptionRequestOutput>,
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
}));

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
  input: __S(2368, __c74, 0) as any as S.Schema<RemoveEntityOwnerInput>,
  output: __S(8288, __c259, 0) as any as S.Schema<RemoveEntityOwnerOutput>,
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
}));

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
  input: __S(2400, __c75, 0) as any as S.Schema<RemovePolicyGrantInput>,
  output: __S(8288, __c259, 0) as any as S.Schema<RemovePolicyGrantOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemovePolicyGrant",
}));

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
  input: __S(2496, __c78, 0) as any as S.Schema<RevokeSubscriptionInput>,
  output: __S(2464, __c77, 0) as any as S.Schema<RevokeSubscriptionOutput>,
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
}));

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
  input: __S(2528, __c79, 0) as any as S.Schema<SearchInput>,
  output: __S(2537, __c79, 9) as any as S.Schema<SearchOutput>,
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
  input: __S(2624, __c82, 0) as any as S.Schema<SearchGroupProfilesInput>,
  output: __S(2626, __c82, 2) as any as S.Schema<SearchGroupProfilesOutput>,
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
  input: __S(2658, __c83, 2) as any as S.Schema<SearchListingsInput>,
  output: __S(2669, __c83, 13) as any as S.Schema<SearchListingsOutput>,
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
  input: __S(2688, __c84, 0) as any as S.Schema<SearchTypesInput>,
  output: __S(2693, __c84, 5) as any as S.Schema<SearchTypesOutput>,
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
  input: __S(2720, __c85, 0) as any as S.Schema<SearchUserProfilesInput>,
  output: __S(2722, __c85, 2) as any as S.Schema<SearchUserProfilesOutput>,
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
  input: __S(2752, __c86, 0) as any as S.Schema<StartDataSourceRunInput>,
  output: __S(2753, __c86, 1) as any as S.Schema<StartDataSourceRunOutput>,
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
}));

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
  input: __S(2784, __c87, 0) as any as S.Schema<StartMetadataGenerationRunInput>,
  output: __S(2785, __c87, 1) as any as S.Schema<StartMetadataGenerationRunOutput>,
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
}));

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
  input: __S(2816, __c88, 0) as any as S.Schema<StartNotebookExportInput>,
  output: __S(2817, __c88, 1) as any as S.Schema<StartNotebookExportOutput>,
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
}));

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
  input: __S(2848, __c89, 0) as any as S.Schema<StartNotebookImportInput>,
  output: __S(2849, __c89, 1) as any as S.Schema<StartNotebookImportOutput>,
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
}));

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
  input: __S(3008, __c94, 0) as any as S.Schema<StartNotebookRunInput>,
  output: __S(421, __c13, 5) as any as S.Schema<StartNotebookRunOutput>,
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
}));

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
  input: __S(3040, __c95, 0) as any as S.Schema<StartNotebookSyncInput>,
  output: __S(3041, __c95, 1) as any as S.Schema<StartNotebookSyncOutput>,
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
}));

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
  input: __S(3072, __c96, 0) as any as S.Schema<StopNotebookRunInput>,
  output: __S(3073, __c96, 1) as any as S.Schema<StopNotebookRunOutput>,
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
}));

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
  input: __S(3104, __c97, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(8288, __c259, 0) as any as S.Schema<TagResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = InternalServerException | ResourceNotFoundException | CommonErrors;
/**
 * Untags a resource in Amazon DataZone.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3136, __c98, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(8288, __c259, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(3168, __c99, 0) as any as S.Schema<UpdateAccountPoolInput>,
  output: __S(2978, __c93, 2) as any as S.Schema<UpdateAccountPoolOutput>,
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
}));

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
  input: __S(3200, __c100, 0) as any as S.Schema<UpdateAssetFilterInput>,
  output: __S(3817, __c119, 9) as any as S.Schema<UpdateAssetFilterOutput>,
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
}));

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
  input: __S(3239, __c101, 7) as any as S.Schema<UpdateConnectionInput>,
  output: __S(3240, __c101, 8) as any as S.Schema<UpdateConnectionOutput>,
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
}));

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
  input: __S(3264, __c102, 0) as any as S.Schema<UpdateDataSourceInput>,
  output: __S(3265, __c102, 1) as any as S.Schema<UpdateDataSourceOutput>,
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
}));

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
  input: __S(3296, __c103, 0) as any as S.Schema<UpdateDomainInput>,
  output: __S(3297, __c103, 1) as any as S.Schema<UpdateDomainOutput>,
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
}));

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
  input: __S(3456, __c108, 0) as any as S.Schema<UpdateDomainUnitInput>,
  output: __S(3457, __c108, 1) as any as S.Schema<UpdateDomainUnitOutput>,
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
}));

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
  input: __S(3488, __c109, 0) as any as S.Schema<UpdateEnvironmentInput>,
  output: __S(4967, __c155, 7) as any as S.Schema<UpdateEnvironmentOutput>,
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
}));

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
  input: __S(3520, __c110, 0) as any as S.Schema<UpdateEnvironmentActionInput>,
  output: __S(5026, __c157, 2) as any as S.Schema<UpdateEnvironmentActionOutput>,
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
}));

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
  input: __S(3552, __c111, 0) as any as S.Schema<UpdateEnvironmentBlueprintInput>,
  output: __S(5088, __c159, 0) as any as S.Schema<UpdateEnvironmentBlueprintOutput>,
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
}));

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
  input: __S(3584, __c112, 0) as any as S.Schema<UpdateEnvironmentProfileInput>,
  output: __S(5152, __c161, 0) as any as S.Schema<UpdateEnvironmentProfileOutput>,
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
}));

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
  input: __S(3616, __c113, 0) as any as S.Schema<UpdateGlossaryInput>,
  output: __S(5280, __c165, 0) as any as S.Schema<UpdateGlossaryOutput>,
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
}));

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
  input: __S(3648, __c114, 0) as any as S.Schema<UpdateGlossaryTermInput>,
  output: __S(5344, __c167, 0) as any as S.Schema<UpdateGlossaryTermOutput>,
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
}));

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
  input: __S(3680, __c115, 0) as any as S.Schema<UpdateGroupProfileInput>,
  output: __S(5440, __c170, 0) as any as S.Schema<UpdateGroupProfileOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGroupProfile",
}));

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
  input: __S(3712, __c116, 0) as any as S.Schema<UpdateNotebookInput>,
  output: __S(5600, __c175, 0) as any as S.Schema<UpdateNotebookOutput>,
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
}));

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
  input: __S(3744, __c117, 0) as any as S.Schema<UpdateProjectInput>,
  output: __S(5736, __c179, 8) as any as S.Schema<UpdateProjectOutput>,
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
}));

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
  input: __S(3840, __c120, 0) as any as S.Schema<UpdateProjectProfileInput>,
  output: __S(5864, __c183, 8) as any as S.Schema<UpdateProjectProfileOutput>,
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
}));

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
  input: __S(3872, __c121, 0) as any as S.Schema<UpdateRootDomainUnitOwnerInput>,
  output: __S(8288, __c259, 0) as any as S.Schema<UpdateRootDomainUnitOwnerOutput>,
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
}));

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
  input: __S(3904, __c122, 0) as any as S.Schema<UpdateRuleInput>,
  output: __S(3905, __c122, 1) as any as S.Schema<UpdateRuleOutput>,
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
}));

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
  input: __S(3936, __c123, 0) as any as S.Schema<UpdateSubscriptionGrantStatusInput>,
  output: __S(6021, __c188, 5) as any as S.Schema<UpdateSubscriptionGrantStatusOutput>,
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
}));

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
  input: __S(3968, __c124, 0) as any as S.Schema<UpdateSubscriptionRequestInput>,
  output: __S(7744, __c242, 0) as any as S.Schema<UpdateSubscriptionRequestOutput>,
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
}));

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
  input: __S(4000, __c125, 0) as any as S.Schema<UpdateSubscriptionTargetInput>,
  output: __S(6114, __c191, 2) as any as S.Schema<UpdateSubscriptionTargetOutput>,
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
}));

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
  input: __S(4032, __c126, 0) as any as S.Schema<UpdateUserProfileInput>,
  output: __S(6176, __c193, 0) as any as S.Schema<UpdateUserProfileOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUserProfile",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          entityType: S.String.pipe(T.HttpLabel("entityType")),
          entityIdentifier: S.String.pipe(T.HttpLabel("entityIdentifier")),
          policyType: S.String,
          principal: __S(71, __c2, 7),
          detail: __S(35, __c1, 3),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/v2/domains/{domainIdentifier}/policies/managed/{entityType}/{entityIdentifier}/addGrant",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AddPolicyGrantInput" });
    case 1:
      return S.suspend(() => S.Struct({ grantId: S.optional(S.String) })).annotate({
        identifier: "AddPolicyGrantOutput",
      });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ includeChildDomainUnits: S.optional(S.Boolean) })).annotate(
        { identifier: "CreateDomainUnitPolicyGrantDetail" },
      );
    case 1:
      return S.suspend(() => S.Struct({ domainUnitId: S.optional(S.String) })).annotate({
        identifier: "CreateEnvironmentProfilePolicyGrantDetail",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          includeChildDomainUnits: S.optional(S.Boolean),
          projectProfiles: S.optional(__S(7456, __c233, 0)),
        }),
      ).annotate({ identifier: "CreateProjectFromProjectProfilePolicyGrantDetail" });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ createDomainUnit: __S(32, __c1, 0) }),
        /*@__PURE__*/ S.Struct({ overrideDomainUnitOwners: __S(32, __c1, 0) }),
        /*@__PURE__*/ S.Struct({ addToProjectMemberPool: __S(32, __c1, 0) }),
        /*@__PURE__*/ S.Struct({ overrideProjectOwners: __S(32, __c1, 0) }),
        /*@__PURE__*/ S.Struct({ createGlossary: __S(32, __c1, 0) }),
        /*@__PURE__*/ S.Struct({ createFormType: __S(32, __c1, 0) }),
        /*@__PURE__*/ S.Struct({ createAssetType: __S(32, __c1, 0) }),
        /*@__PURE__*/ S.Struct({ createProject: __S(32, __c1, 0) }),
        /*@__PURE__*/ S.Struct({ createEnvironmentProfile: __S(33, __c1, 1) }),
        /*@__PURE__*/ S.Struct({ delegateCreateEnvironmentProfile: __S(8288, __c259, 0) }),
        /*@__PURE__*/ S.Struct({ createEnvironment: __S(8288, __c259, 0) }),
        /*@__PURE__*/ S.Struct({ createEnvironmentFromBlueprint: __S(8288, __c259, 0) }),
        /*@__PURE__*/ S.Struct({ createProjectFromProjectProfile: __S(34, __c1, 2) }),
        /*@__PURE__*/ S.Struct({ useAssetType: __S(33, __c1, 1) }),
      ]);
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ userIdentifier: S.String }),
        /*@__PURE__*/ S.Struct({ allUsersGrantFilter: __S(8288, __c259, 0) }),
      ]);
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ groupIdentifier: S.String })]);
    case 2:
      return S.suspend(() =>
        S.Struct({ domainUnit: S.String, includeChildDomainUnits: S.optional(S.Boolean) }),
      ).annotate({ identifier: "DomainUnitFilterForProject" });
    case 3:
      return S.Union([/*@__PURE__*/ S.Struct({ domainUnitFilter: __S(66, __c2, 2) })]);
    case 4:
      return S.suspend(() =>
        S.Struct({
          projectDesignation: S.String,
          projectIdentifier: S.optional(S.String),
          projectGrantFilter: S.optional(__S(67, __c2, 3)),
        }),
      ).annotate({ identifier: "ProjectPolicyGrantPrincipal" });
    case 5:
      return S.Union([/*@__PURE__*/ S.Struct({ allDomainUnitsGrantFilter: __S(8288, __c259, 0) })]);
    case 6:
      return S.suspend(() =>
        S.Struct({
          domainUnitDesignation: S.String,
          domainUnitIdentifier: S.optional(S.String),
          domainUnitGrantFilter: S.optional(__S(69, __c2, 5)),
        }),
      ).annotate({ identifier: "DomainUnitPolicyGrantPrincipal" });
    case 7:
      return S.Union([
        /*@__PURE__*/ S.Struct({ user: __S(64, __c2, 0) }),
        /*@__PURE__*/ S.Struct({ group: __S(65, __c2, 1) }),
        /*@__PURE__*/ S.Struct({ project: __S(68, __c2, 4) }),
        /*@__PURE__*/ S.Struct({ domainUnit: __S(70, __c2, 6) }),
      ]);
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/lineage/events/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetLineageEventInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          domainId: S.optional(S.String).pipe(T.HttpHeader("Domain-Id")),
          id: S.optional(S.String).pipe(T.HttpHeader("Id")),
          event: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
          createdBy: S.optional(S.String).pipe(T.HttpHeader("Created-By")),
          processingStatus: S.optional(S.String).pipe(T.HttpHeader("Processing-Status")),
          eventTime: S.optional(S.Date.pipe(T.TimestampFormat("http-date"))).pipe(
            T.HttpHeader("Event-Time"),
          ),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("http-date"))).pipe(
            T.HttpHeader("Created-At"),
          ),
        }),
      ).annotate({ identifier: "GetLineageEventOutput" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          eventTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("timestamp"),
          ),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/lineage/nodes/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetLineageNodeInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          eventTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "LineageNodeReference" });
    case 2:
      return S.Array(__S(129, __c4, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          name: S.optional(S.String),
          description: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedBy: S.optional(S.String),
          id: S.String,
          typeName: S.String,
          typeRevision: S.optional(S.String),
          sourceIdentifier: S.optional(S.String),
          eventTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          formsOutput: S.optional(__S(7489, __c234, 1)),
          upstreamNodes: S.optional(__S(130, __c4, 2)),
          downstreamNodes: S.optional(__S(130, __c4, 2)),
        }),
      ).annotate({ identifier: "GetLineageNodeOutput" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          listingRevision: S.optional(S.String).pipe(T.HttpQuery("listingRevision")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/domains/{domainIdentifier}/listings/{identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetListingInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          assetId: S.optional(S.String),
          assetRevision: S.optional(S.String),
          assetType: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          forms: S.optional(S.String),
          latestTimeSeriesDataPointForms: S.optional(__S(3425, __c107, 1)),
          glossaryTerms: S.optional(__S(7585, __c237, 1)),
          governedGlossaryTerms: S.optional(__S(7585, __c237, 1)),
          owningProjectId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AssetListing" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          dataProductId: S.optional(S.String),
          dataProductRevision: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          forms: S.optional(S.String),
          glossaryTerms: S.optional(__S(7585, __c237, 1)),
          owningProjectId: S.optional(S.String),
          items: S.optional(__S(193, __c6, 1)),
        }),
      ).annotate({ identifier: "DataProductListing" });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ assetListing: __S(161, __c5, 1) }),
        /*@__PURE__*/ S.Struct({ dataProductListing: __S(162, __c5, 2) }),
      ]);
    case 4:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          id: S.String,
          listingRevision: S.String,
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          updatedBy: S.optional(S.String),
          item: S.optional(__S(163, __c5, 3)),
          name: S.optional(S.String),
          description: S.optional(SensitiveString),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetListingOutput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          listingId: S.optional(S.String),
          listingRevision: S.optional(S.String),
          glossaryTerms: S.optional(__S(7585, __c237, 1)),
        }),
      ).annotate({ identifier: "ListingSummary" });
    case 1:
      return S.Array(__S(192, __c6, 0));
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          type: S.optional(S.String).pipe(T.HttpQuery("type")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/metadata-generation-runs/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMetadataGenerationRunInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ type: S.String, status: S.String, errorMessage: S.optional(S.String) }),
      ).annotate({ identifier: "MetadataGenerationRunTypeStat" });
    case 2:
      return S.Array(__S(225, __c7, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          id: S.String,
          target: S.optional(__S(256, __c8, 0)),
          status: S.optional(S.String),
          type: S.optional(S.String),
          types: S.optional(__S(7520, __c235, 0)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          owningProjectId: S.String,
          typeStats: S.optional(__S(226, __c7, 2)),
        }),
      ).annotate({ identifier: "GetMetadataGenerationRunOutput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ type: S.String, identifier: S.String, revision: S.optional(S.String) }),
      ).annotate({ identifier: "MetadataGenerationRunTarget" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/domains/{domainIdentifier}/notebooks/{identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetNotebookInput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/notebook-exports/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetNotebookExportInput" });
    case 1:
      return S.suspend(() => S.Struct({ uri: S.optional(SensitiveString) })).annotate({
        identifier: "S3Destination",
      });
    case 2:
      return S.Union([/*@__PURE__*/ S.Struct({ s3: __S(321, __c10, 1) })]);
    case 3:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          domainId: S.String,
          owningProjectId: S.String,
          notebookId: S.String,
          fileFormat: S.String,
          status: S.String,
          outputLocation: S.optional(__S(322, __c10, 2)),
          error: S.optional(__S(5632, __c176, 0)),
          completedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetNotebookExportOutput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/notebook-runs/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetNotebookRunInput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ type: S.optional(S.String), name: S.optional(S.String) }),
      ).annotate({ identifier: "TriggerSource" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ instanceType: S.optional(S.String), environmentVersion: S.optional(S.String) }),
      ).annotate({ identifier: "ComputeConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          networkAccessType: S.String,
          vpcId: S.optional(S.String),
          subnetIds: S.optional(__S(7456, __c233, 0)),
          securityGroupIds: S.optional(__S(7456, __c233, 0)),
        }),
      ).annotate({ identifier: "NetworkConfig" });
    case 2:
      return S.suspend(() => S.Struct({ runTimeoutInMinutes: S.optional(S.Number) })).annotate({
        identifier: "TimeoutConfig",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({ projectS3Path: S.optional(S.String), kmsKeyArn: S.optional(S.String) }),
      ).annotate({ identifier: "StorageConfig" });
    case 4:
      return S.suspend(() => S.Struct({ notifyOn: __S(7520, __c235, 0) })).annotate({
        identifier: "NotificationConfig",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          domainId: S.String,
          owningProjectId: S.String,
          notebookId: S.String,
          scheduleId: S.optional(S.String),
          status: S.String,
          cellOrder: S.optional(__S(5537, __c173, 1)),
          metadata: S.optional(__S(5536, __c173, 0)),
          parameters: S.optional(__S(4256, __c133, 0)),
          computeConfiguration: S.optional(__S(416, __c13, 0)),
          networkConfiguration: S.optional(__S(417, __c13, 1)),
          timeoutConfiguration: S.optional(__S(418, __c13, 2)),
          environmentConfiguration: S.optional(__S(5539, __c173, 3)),
          storageConfiguration: S.optional(__S(419, __c13, 3)),
          notificationConfiguration: S.optional(__S(420, __c13, 4)),
          triggerSource: S.optional(__S(384, __c12, 0)),
          error: S.optional(__S(5632, __c176, 0)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedBy: S.optional(S.String),
          startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          completedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetNotebookRunOutput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/domains/{domainIdentifier}/projects/{identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetProjectInput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/project-profiles/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetProjectProfileInput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          revision: S.optional(S.String).pipe(T.HttpQuery("revision")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/domains/{domainIdentifier}/rules/{identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRuleInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          identifier: S.String,
          revision: S.String,
          name: SensitiveString,
          ruleType: S.String,
          target: __S(5921, __c185, 1),
          action: S.String,
          scope: __S(5924, __c185, 4),
          detail: __S(5956, __c186, 4),
          targetType: S.optional(S.String),
          description: S.optional(SensitiveString),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          createdBy: S.String,
          lastUpdatedBy: S.String,
        }),
      ).annotate({ identifier: "GetRuleOutput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          environmentIdentifier: S.String.pipe(T.HttpLabel("environmentIdentifier")),
          environmentRoleArn: S.String.pipe(T.HttpLabel("environmentRoleArn")),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/roles/{environmentRoleArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateEnvironmentRoleInput" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/subscriptions/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSubscriptionInput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/subscription-grants/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSubscriptionGrantInput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/subscription-requests/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSubscriptionRequestDetailsInput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          environmentIdentifier: S.String.pipe(T.HttpLabel("environmentIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/subscription-targets/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSubscriptionTargetInput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          entityIdentifier: S.String.pipe(T.HttpLabel("entityIdentifier")),
          entityType: S.String.pipe(T.HttpLabel("entityType")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          formName: S.String.pipe(T.HttpQuery("formName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/entities/{entityType}/{entityIdentifier}/time-series-data-points/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTimeSeriesDataPointInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          domainId: S.optional(S.String),
          entityId: S.optional(S.String),
          entityType: S.optional(S.String),
          formName: S.optional(S.String),
          form: S.optional(__S(736, __c23, 0)),
        }),
      ).annotate({ identifier: "GetTimeSeriesDataPointOutput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          formName: S.String,
          typeIdentifier: S.String,
          typeRevision: S.optional(S.String),
          timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          content: S.optional(S.String),
          id: S.optional(S.String),
        }),
      ).annotate({ identifier: "TimeSeriesDataPointFormOutput" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          userIdentifier: S.String.pipe(T.HttpLabel("userIdentifier")),
          type: S.optional(S.String).pipe(T.HttpQuery("type")),
          sessionName: S.optional(S.String).pipe(T.HttpQuery("sessionName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/user-profiles/{userIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetUserProfileInput" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          name: S.optional(SensitiveString).pipe(T.HttpQuery("name")),
          sortBy: S.optional(S.String).pipe(T.HttpQuery("sortBy")),
          sortOrder: S.optional(S.String).pipe(T.HttpQuery("sortOrder")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/domains/{domainIdentifier}/account-pools" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAccountPoolsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          domainId: S.optional(S.String),
          id: S.optional(S.String),
          name: S.optional(SensitiveString),
          resolutionStrategy: S.optional(S.String),
          domainUnitId: S.optional(S.String),
          createdBy: S.optional(S.String),
          updatedBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "AccountPoolSummary" });
    case 2:
      return S.Array(__S(801, __c25, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(802, __c25, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAccountPoolsOutput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/account-pools/{identifier}/accounts",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAccountsInAccountPoolInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(2945, __c92, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAccountsInAccountPoolOutput" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          assetIdentifier: S.String.pipe(T.HttpLabel("assetIdentifier")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/assets/{assetIdentifier}/filters",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAssetFiltersInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          domainId: S.String,
          assetId: S.String,
          name: SensitiveString,
          description: S.optional(SensitiveString),
          status: S.optional(S.String),
          effectiveColumnNames: S.optional(__S(7456, __c233, 0)),
          effectiveRowFilter: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "AssetFilterSummary" });
    case 2:
      return S.Array(__S(865, __c27, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(866, __c27, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAssetFiltersOutput" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/assets/{identifier}/revisions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAssetRevisionsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          domainId: S.optional(S.String),
          id: S.optional(S.String),
          revision: S.optional(S.String),
          createdBy: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "AssetRevision" });
    case 2:
      return S.Array(__S(897, __c28, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(898, __c28, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAssetRevisionsOutput" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          entityIdentifier: S.String.pipe(T.HttpLabel("entityIdentifier")),
          entityType: S.String.pipe(T.HttpLabel("entityType")),
          governedGlossaryTerms: __S(7456, __c233, 0),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/v2/domains/{domainIdentifier}/entities/{entityType}/{entityIdentifier}/associate-governed-terms",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateGovernedTermsInput" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          sortBy: S.optional(S.String).pipe(T.HttpQuery("sortBy")),
          sortOrder: S.optional(S.String).pipe(T.HttpQuery("sortOrder")),
          name: S.optional(S.String).pipe(T.HttpQuery("name")),
          environmentIdentifier: S.optional(S.String).pipe(T.HttpQuery("environmentIdentifier")),
          projectIdentifier: S.optional(S.String).pipe(T.HttpQuery("projectIdentifier")),
          type: S.optional(S.String).pipe(T.HttpQuery("type")),
          scope: S.optional(S.String).pipe(T.HttpQuery("scope")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/domains/{domainIdentifier}/connections" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListConnectionsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          configurations: S.optional(__S(4290, __c134, 2)),
          connectionId: S.String,
          domainId: S.String,
          domainUnitId: S.String,
          environmentId: S.optional(S.String),
          name: S.String,
          physicalEndpoints: __S(4311, __c134, 23),
          projectId: S.optional(S.String),
          props: S.optional(__S(4324, __c135, 4)),
          type: S.String,
          scope: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConnectionSummary" });
    case 2:
      return S.Array(__S(961, __c30, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(962, __c30, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListConnectionsOutput" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/data-products/{identifier}/revisions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDataProductRevisionsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          domainId: S.optional(S.String),
          id: S.optional(S.String),
          revision: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "DataProductRevision" });
    case 2:
      return S.Array(__S(993, __c31, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(994, __c31, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDataProductRevisionsOutput" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/data-source-runs/{identifier}/activities",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDataSourceRunActivitiesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          eventId: S.optional(S.String),
          eventStatus: S.optional(S.String),
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "LineageInfo" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          database: SensitiveString,
          dataSourceRunId: S.String,
          technicalName: SensitiveString,
          dataAssetStatus: S.String,
          projectId: S.String,
          dataAssetId: S.optional(S.String),
          technicalDescription: S.optional(SensitiveString),
          errorMessage: S.optional(__S(4576, __c143, 0)),
          lineageSummary: S.optional(__S(1025, __c32, 1)),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "DataSourceRunActivity" });
    case 3:
      return S.Array(__S(1026, __c32, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ items: __S(1027, __c32, 3), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDataSourceRunActivitiesOutput" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          dataSourceIdentifier: S.String.pipe(T.HttpLabel("dataSourceIdentifier")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/data-sources/{dataSourceIdentifier}/runs",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDataSourceRunsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          dataSourceId: S.String,
          type: S.String,
          status: S.String,
          projectId: S.String,
          runStatisticsForAssets: S.optional(__S(8096, __c253, 0)),
          errorMessage: S.optional(__S(4576, __c143, 0)),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          startedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          stoppedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lineageSummary: S.optional(__S(8064, __c252, 0)),
        }),
      ).annotate({ identifier: "DataSourceRunSummary" });
    case 2:
      return S.Array(__S(1057, __c33, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(1058, __c33, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDataSourceRunsOutput" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          projectIdentifier: S.String.pipe(T.HttpQuery("projectIdentifier")),
          environmentIdentifier: S.optional(S.String).pipe(T.HttpQuery("environmentIdentifier")),
          connectionIdentifier: S.optional(S.String).pipe(T.HttpQuery("connectionIdentifier")),
          type: S.optional(S.String).pipe(T.HttpQuery("type")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          name: S.optional(SensitiveString).pipe(T.HttpQuery("name")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/domains/{domainIdentifier}/data-sources" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDataSourcesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          environmentId: S.optional(S.String),
          connectionId: S.optional(S.String),
          dataSourceId: S.String,
          name: SensitiveString,
          type: S.String,
          status: S.String,
          enableSetting: S.optional(S.String),
          schedule: S.optional(__S(4512, __c141, 0)),
          lastRunStatus: S.optional(S.String),
          lastRunAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastRunErrorMessage: S.optional(__S(4576, __c143, 0)),
          lastRunAssetCount: S.optional(S.Number),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          description: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "DataSourceSummary" });
    case 2:
      return S.Array(__S(1089, __c34, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(1090, __c34, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDataSourcesOutput" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/v2/domains" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDomainsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          name: SensitiveString,
          description: S.optional(SensitiveString),
          arn: S.String,
          managedAccountId: S.String,
          status: S.String,
          portalUrl: S.optional(S.String),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          domainVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "DomainSummary" });
    case 2:
      return S.Array(__S(1121, __c35, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(1122, __c35, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDomainsOutput" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          parentDomainUnitIdentifier: S.String.pipe(T.HttpQuery("parentDomainUnitIdentifier")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/domains/{domainIdentifier}/domain-units" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDomainUnitsForParentInput" });
    case 1:
      return S.suspend(() => S.Struct({ name: S.String, id: S.String })).annotate({
        identifier: "DomainUnitSummary",
      });
    case 2:
      return S.Array(__S(1153, __c36, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(1154, __c36, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDomainUnitsForParentOutput" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          entityType: S.String.pipe(T.HttpLabel("entityType")),
          entityIdentifier: S.String.pipe(T.HttpLabel("entityIdentifier")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/entities/{entityType}/{entityIdentifier}/owners",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListEntityOwnersInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ owners: __S(4739, __c148, 3), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListEntityOwnersOutput" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          environmentIdentifier: S.String.pipe(T.HttpLabel("environmentIdentifier")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/actions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListEnvironmentActionsInput" });
    case 1:
      return S.Array(__S(5026, __c157, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(1217, __c38, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListEnvironmentActionsOutput" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/environment-blueprint-configurations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListEnvironmentBlueprintConfigurationsInput" });
    case 1:
      return S.Array(__S(8422, __c263, 6));
    case 2:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(1249, __c39, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListEnvironmentBlueprintConfigurationsOutput" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          entityType: S.String.pipe(T.HttpLabel("entityType")),
          entityIdentifier: S.String.pipe(T.HttpLabel("entityIdentifier")),
          entityRevision: S.optional(S.String).pipe(T.HttpQuery("entityRevision")),
          attributeIdentifiers: __S(7456, __c233, 0).pipe(T.HttpQuery("attributeIdentifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/entities/{entityType}/{entityIdentifier}/attributes-metadata",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetAttributesMetadataInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ attributeIdentifier: S.String, forms: S.optional(__S(7489, __c234, 1)) }),
      ).annotate({ identifier: "BatchGetAttributeOutput" });
    case 2:
      return S.Array(__S(1281, __c40, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ attributes: S.optional(__S(1282, __c40, 2)), errors: __S(1313, __c41, 1) }),
      ).annotate({ identifier: "BatchGetAttributesMetadataOutput" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ attributeIdentifier: S.String, code: S.String, message: S.String }),
      ).annotate({ identifier: "AttributeError" });
    case 1:
      return S.Array(__S(1312, __c41, 0));
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          name: S.optional(S.String).pipe(T.HttpQuery("name")),
          managed: S.optional(S.Boolean).pipe(T.HttpQuery("managed")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/domains/{domainIdentifier}/environment-blueprints" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListEnvironmentBlueprintsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          name: S.String,
          description: S.optional(SensitiveString),
          provider: S.String,
          provisioningProperties: __S(4833, __c151, 1),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          blueprintCategory: S.optional(S.String),
        }),
      ).annotate({ identifier: "EnvironmentBlueprintSummary" });
    case 2:
      return S.Array(__S(1345, __c42, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(1346, __c42, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListEnvironmentBlueprintsOutput" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          awsAccountId: S.optional(S.String).pipe(T.HttpQuery("awsAccountId")),
          awsAccountRegion: S.optional(S.String).pipe(T.HttpQuery("awsAccountRegion")),
          environmentBlueprintIdentifier: S.optional(S.String).pipe(
            T.HttpQuery("environmentBlueprintIdentifier"),
          ),
          projectIdentifier: S.optional(S.String).pipe(T.HttpQuery("projectIdentifier")),
          name: S.optional(SensitiveString).pipe(T.HttpQuery("name")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/domains/{domainIdentifier}/environment-profiles" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListEnvironmentProfilesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          domainId: S.String,
          awsAccountId: S.optional(S.String),
          awsAccountRegion: S.optional(S.String),
          createdBy: S.String,
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          name: SensitiveString,
          description: S.optional(SensitiveString),
          environmentBlueprintId: S.String,
          projectId: S.optional(S.String),
        }),
      ).annotate({ identifier: "EnvironmentProfileSummary" });
    case 2:
      return S.Array(__S(1377, __c43, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(1378, __c43, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListEnvironmentProfilesOutput" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          awsAccountId: S.optional(S.String).pipe(T.HttpQuery("awsAccountId")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          awsAccountRegion: S.optional(S.String).pipe(T.HttpQuery("awsAccountRegion")),
          projectIdentifier: S.String.pipe(T.HttpQuery("projectIdentifier")),
          environmentProfileIdentifier: S.optional(S.String).pipe(
            T.HttpQuery("environmentProfileIdentifier"),
          ),
          environmentBlueprintIdentifier: S.optional(S.String).pipe(
            T.HttpQuery("environmentBlueprintIdentifier"),
          ),
          provider: S.optional(S.String).pipe(T.HttpQuery("provider")),
          name: S.optional(S.String).pipe(T.HttpQuery("name")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/domains/{domainIdentifier}/environments" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListEnvironmentsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          projectId: S.String,
          id: S.optional(S.String),
          domainId: S.String,
          createdBy: S.String,
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          name: SensitiveString,
          description: S.optional(SensitiveString),
          environmentProfileId: S.optional(S.String),
          awsAccountId: S.optional(S.String),
          awsAccountRegion: S.optional(S.String),
          provider: S.String,
          status: S.optional(S.String),
          environmentConfigurationId: S.optional(SensitiveString),
          environmentConfigurationName: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "EnvironmentSummary" });
    case 2:
      return S.Array(__S(1409, __c44, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(1410, __c44, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListEnvironmentsOutput" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          jobIdentifier: S.String.pipe(T.HttpLabel("jobIdentifier")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          sortOrder: S.optional(S.String).pipe(T.HttpQuery("sortOrder")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/jobs/{jobIdentifier}/runs",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListJobRunsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          domainId: S.optional(S.String),
          jobId: S.optional(S.String),
          jobType: S.optional(S.String),
          runId: S.optional(S.String),
          runMode: S.optional(S.String),
          status: S.optional(S.String),
          error: S.optional(__S(5632, __c176, 0)),
          createdBy: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "JobRunSummary" });
    case 2:
      return S.Array(__S(1441, __c45, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(1442, __c45, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListJobRunsOutput" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          timestampAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("timestampAfter"),
          ),
          timestampBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("timestampBefore"),
          ),
          processingStatus: S.optional(S.String).pipe(T.HttpQuery("processingStatus")),
          sortOrder: S.optional(S.String).pipe(T.HttpQuery("sortOrder")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/domains/{domainIdentifier}/lineage/events" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListLineageEventsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), namespace: S.optional(S.String) }),
      ).annotate({ identifier: "NameIdentifier" });
    case 2:
      return S.Array(__S(1473, __c46, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          eventType: S.optional(S.String),
          runId: S.optional(S.String),
          job: S.optional(__S(1473, __c46, 1)),
          inputs: S.optional(__S(1474, __c46, 2)),
          outputs: S.optional(__S(1474, __c46, 2)),
        }),
      ).annotate({ identifier: "OpenLineageRunEventSummary" });
    case 4:
      return S.Union([/*@__PURE__*/ S.Struct({ openLineageRunEventSummary: __S(1475, __c46, 3) })]);
    case 5:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          domainId: S.optional(S.String),
          processingStatus: S.optional(S.String),
          eventTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          eventSummary: S.optional(__S(1476, __c46, 4)),
          createdBy: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "LineageEventSummary" });
    case 6:
      return S.Array(__S(1477, __c46, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(1478, __c46, 6)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListLineageEventsOutput" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          direction: S.optional(S.String).pipe(T.HttpQuery("direction")),
          eventTimestampGTE: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("timestampGTE"),
          ),
          eventTimestampLTE: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("timestampLTE"),
          ),
          sortOrder: S.optional(S.String).pipe(T.HttpQuery("sortOrder")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/lineage/nodes/{identifier}/history",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListLineageNodeHistoryInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          name: S.optional(S.String),
          description: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedBy: S.optional(S.String),
          id: S.String,
          typeName: S.String,
          typeRevision: S.optional(S.String),
          sourceIdentifier: S.optional(S.String),
          eventTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "LineageNodeSummary" });
    case 2:
      return S.Array(__S(1505, __c47, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nodes: S.optional(__S(1506, __c47, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListLineageNodeHistoryOutput" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          type: S.optional(S.String).pipe(T.HttpQuery("type")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          targetIdentifier: S.optional(S.String).pipe(T.HttpQuery("targetIdentifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/metadata-generation-runs",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMetadataGenerationRunsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          id: S.String,
          target: S.optional(__S(256, __c8, 0)),
          status: S.optional(S.String),
          type: S.optional(S.String),
          types: S.optional(__S(7520, __c235, 0)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          owningProjectId: S.String,
        }),
      ).annotate({ identifier: "MetadataGenerationRunItem" });
    case 2:
      return S.Array(__S(1537, __c48, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(1538, __c48, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListMetadataGenerationRunsOutput" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          owningProjectIdentifier: S.String.pipe(T.HttpQuery("owningProjectIdentifier")),
          notebookIdentifier: S.optional(S.String).pipe(T.HttpQuery("notebookIdentifier")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          scheduleIdentifier: S.optional(S.String).pipe(T.HttpQuery("scheduleIdentifier")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          sortOrder: S.optional(S.String).pipe(T.HttpQuery("sortOrder")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/domains/{domainIdentifier}/notebook-runs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListNotebookRunsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          domainId: S.String,
          owningProjectId: S.String,
          notebookId: S.String,
          scheduleId: S.optional(S.String),
          status: S.String,
          triggerSource: S.optional(__S(384, __c12, 0)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedBy: S.optional(S.String),
          startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          completedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "NotebookRunSummary" });
    case 2:
      return S.Array(__S(1569, __c49, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(1570, __c49, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListNotebookRunsOutput" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          owningProjectIdentifier: S.String.pipe(T.HttpQuery("owningProjectIdentifier")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          sortOrder: S.optional(S.String).pipe(T.HttpQuery("sortOrder")),
          sortBy: S.optional(S.String).pipe(T.HttpQuery("sortBy")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          type: S.optional(S.String).pipe(T.HttpQuery("type")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/domains/{domainIdentifier}/notebooks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListNotebooksInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          name: SensitiveString,
          owningProjectId: S.String,
          domainId: S.String,
          status: S.String,
          type: S.optional(S.String),
          description: S.optional(SensitiveString),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "NotebookSummary" });
    case 2:
      return S.Array(__S(1601, __c50, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(1602, __c50, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListNotebooksOutput" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          type: S.String.pipe(T.HttpQuery("type")),
          afterTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("afterTimestamp"),
          ),
          beforeTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("beforeTimestamp"),
          ),
          subjects: S.optional(__S(7456, __c233, 0)).pipe(T.HttpQuery("subjects")),
          taskStatus: S.optional(S.String).pipe(T.HttpQuery("taskStatus")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/domains/{domainIdentifier}/notifications" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListNotificationsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ type: S.String, id: S.String, name: S.optional(S.String) }),
      ).annotate({ identifier: "NotificationResource" });
    case 2:
      return S.suspend(() =>
        S.Struct({ subject: S.String, resource: __S(1633, __c51, 1), role: S.String }),
      ).annotate({ identifier: "Topic" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          identifier: S.String,
          domainIdentifier: S.String,
          type: S.String,
          topic: __S(1634, __c51, 2),
          title: SensitiveString,
          message: SensitiveString,
          status: S.optional(S.String),
          actionLink: SensitiveString,
          creationTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastUpdatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          metadata: S.optional(__S(4256, __c133, 0)),
        }),
      ).annotate({ identifier: "NotificationOutput" });
    case 4:
      return S.Array(__S(1635, __c51, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          notifications: S.optional(__S(1636, __c51, 4)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListNotificationsOutput" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ attributeIdentifier: S.String, forms: __S(1697, __c53, 1) }),
      ).annotate({ identifier: "AttributeInput" });
    case 1:
      return S.Array(__S(1664, __c52, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          entityType: S.String.pipe(T.HttpLabel("entityType")),
          entityIdentifier: S.String.pipe(T.HttpLabel("entityIdentifier")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          attributes: __S(1665, __c52, 1),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v2/domains/{domainIdentifier}/entities/{entityType}/{entityIdentifier}/attributes-metadata",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchPutAttributesMetadataInput" });
    case 3:
      return S.suspend(() => S.Struct({ attributeIdentifier: S.String })).annotate({
        identifier: "BatchPutAttributeOutput",
      });
    case 4:
      return S.Array(__S(1667, __c52, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          errors: S.optional(__S(1313, __c41, 1)),
          attributes: S.optional(__S(1668, __c52, 4)),
        }),
      ).annotate({ identifier: "BatchPutAttributesMetadataOutput" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          formName: S.String,
          typeIdentifier: S.optional(S.String),
          typeRevision: S.optional(S.String),
          content: S.optional(S.String),
        }),
      ).annotate({ identifier: "FormInput" });
    case 1:
      return S.Array(__S(1696, __c53, 0));
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          entityType: S.String.pipe(T.HttpLabel("entityType")),
          entityIdentifier: S.String.pipe(T.HttpLabel("entityIdentifier")),
          policyType: S.String.pipe(T.HttpQuery("policyType")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/policies/managed/{entityType}/{entityIdentifier}/grants",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPolicyGrantsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          principal: S.optional(__S(71, __c2, 7)),
          detail: S.optional(__S(35, __c1, 3)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          grantId: S.optional(S.String),
        }),
      ).annotate({ identifier: "PolicyGrantMember" });
    case 2:
      return S.Array(__S(1729, __c54, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ grantList: __S(1730, __c54, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListPolicyGrantsOutput" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          projectIdentifier: S.String.pipe(T.HttpLabel("projectIdentifier")),
          sortBy: S.optional(S.String).pipe(T.HttpQuery("sortBy")),
          sortOrder: S.optional(S.String).pipe(T.HttpQuery("sortOrder")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/projects/{projectIdentifier}/memberships",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListProjectMembershipsInput" });
    case 1:
      return S.suspend(() => S.Struct({ userId: S.String })).annotate({
        identifier: "UserDetails",
      });
    case 2:
      return S.suspend(() => S.Struct({ groupId: S.String })).annotate({
        identifier: "GroupDetails",
      });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ user: __S(1761, __c55, 1) }),
        /*@__PURE__*/ S.Struct({ group: __S(1762, __c55, 2) }),
      ]);
    case 4:
      return S.suspend(() =>
        S.Struct({ memberDetails: __S(1763, __c55, 3), designation: S.String }),
      ).annotate({ identifier: "ProjectMember" });
    case 5:
      return S.Array(__S(1764, __c55, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ members: __S(1765, __c55, 5), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListProjectMembershipsOutput" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          name: S.optional(SensitiveString).pipe(T.HttpQuery("name")),
          sortBy: S.optional(S.String).pipe(T.HttpQuery("sortBy")),
          sortOrder: S.optional(S.String).pipe(T.HttpQuery("sortOrder")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/domains/{domainIdentifier}/project-profiles" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListProjectProfilesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          id: S.String,
          name: SensitiveString,
          description: S.optional(SensitiveString),
          status: S.optional(S.String),
          createdBy: S.String,
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          domainUnitId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProjectProfileSummary" });
    case 2:
      return S.Array(__S(1793, __c56, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(1794, __c56, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListProjectProfilesOutput" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          userIdentifier: S.optional(S.String).pipe(T.HttpQuery("userIdentifier")),
          groupIdentifier: S.optional(S.String).pipe(T.HttpQuery("groupIdentifier")),
          name: S.optional(SensitiveString).pipe(T.HttpQuery("name")),
          projectCategory: S.optional(S.String).pipe(T.HttpQuery("projectCategory")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/domains/{domainIdentifier}/projects" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListProjectsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          id: S.String,
          name: SensitiveString,
          description: S.optional(SensitiveString),
          projectStatus: S.optional(S.String),
          failureReasons: S.optional(__S(5697, __c178, 1)),
          createdBy: S.String,
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          domainUnitId: S.optional(S.String),
          projectCategory: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProjectSummary" });
    case 2:
      return S.Array(__S(1825, __c57, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(1826, __c57, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListProjectsOutput" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          targetType: S.String.pipe(T.HttpLabel("targetType")),
          targetIdentifier: S.String.pipe(T.HttpLabel("targetIdentifier")),
          ruleType: S.optional(S.String).pipe(T.HttpQuery("ruleType")),
          action: S.optional(S.String).pipe(T.HttpQuery("ruleAction")),
          projectIds: S.optional(__S(7456, __c233, 0)).pipe(T.HttpQuery("projectIds")),
          assetTypes: S.optional(__S(7456, __c233, 0)).pipe(T.HttpQuery("assetTypes")),
          dataProduct: S.optional(S.Boolean).pipe(T.HttpQuery("dataProduct")),
          includeCascaded: S.optional(S.Boolean).pipe(T.HttpQuery("includeCascaded")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/list-rules/{targetType}/{targetIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRulesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          identifier: S.optional(S.String),
          revision: S.optional(S.String),
          ruleType: S.optional(S.String),
          name: S.optional(SensitiveString),
          targetType: S.optional(S.String),
          target: S.optional(__S(5921, __c185, 1)),
          action: S.optional(S.String),
          scope: S.optional(__S(5924, __c185, 4)),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "RuleSummary" });
    case 2:
      return S.Array(__S(1857, __c58, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(1858, __c58, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRulesOutput" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          environmentId: S.optional(S.String).pipe(T.HttpQuery("environmentId")),
          subscriptionTargetId: S.optional(S.String).pipe(T.HttpQuery("subscriptionTargetId")),
          subscribedListingId: S.optional(S.String).pipe(T.HttpQuery("subscribedListingId")),
          subscriptionId: S.optional(S.String).pipe(T.HttpQuery("subscriptionId")),
          owningProjectId: S.optional(S.String).pipe(T.HttpQuery("owningProjectId")),
          owningIamPrincipalArn: S.optional(S.String).pipe(T.HttpQuery("owningIamPrincipalArn")),
          owningUserId: S.optional(S.String).pipe(T.HttpQuery("owningUserId")),
          owningGroupId: S.optional(S.String).pipe(T.HttpQuery("owningGroupId")),
          sortBy: S.optional(S.String).pipe(T.HttpQuery("sortBy")),
          sortOrder: S.optional(S.String).pipe(T.HttpQuery("sortOrder")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/domains/{domainIdentifier}/subscription-grants" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSubscriptionGrantsInput" });
    case 1:
      return S.Array(__S(6021, __c188, 5));
    case 2:
      return S.suspend(() =>
        S.Struct({ items: __S(1889, __c59, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSubscriptionGrantsOutput" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          subscribedListingId: S.optional(S.String).pipe(T.HttpQuery("subscribedListingId")),
          owningProjectId: S.optional(S.String).pipe(T.HttpQuery("owningProjectId")),
          owningIamPrincipalArn: S.optional(S.String).pipe(T.HttpQuery("owningIamPrincipalArn")),
          approverProjectId: S.optional(S.String).pipe(T.HttpQuery("approverProjectId")),
          owningUserId: S.optional(S.String).pipe(T.HttpQuery("owningUserId")),
          owningGroupId: S.optional(S.String).pipe(T.HttpQuery("owningGroupId")),
          sortBy: S.optional(S.String).pipe(T.HttpQuery("sortBy")),
          sortOrder: S.optional(S.String).pipe(T.HttpQuery("sortOrder")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/domains/{domainIdentifier}/subscription-requests" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSubscriptionRequestsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          formName: S.optional(S.String),
          typeName: SensitiveString,
          typeRevision: S.String,
        }),
      ).annotate({ identifier: "MetadataFormSummary" });
    case 2:
      return S.Array(__S(1921, __c60, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          createdBy: S.String,
          updatedBy: S.optional(S.String),
          domainId: S.String,
          status: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          requestReason: SensitiveString,
          subscribedPrincipals: __S(7712, __c241, 0),
          subscribedListings: __S(7713, __c241, 1),
          reviewerId: S.optional(S.String),
          decisionComment: S.optional(SensitiveString),
          existingSubscriptionId: S.optional(S.String),
          metadataFormsSummary: S.optional(__S(1922, __c60, 2)),
        }),
      ).annotate({ identifier: "SubscriptionRequestSummary" });
    case 4:
      return S.Array(__S(1923, __c60, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ items: __S(1924, __c60, 4), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSubscriptionRequestsOutput" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          subscriptionRequestIdentifier: S.optional(S.String).pipe(
            T.HttpQuery("subscriptionRequestIdentifier"),
          ),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          subscribedListingId: S.optional(S.String).pipe(T.HttpQuery("subscribedListingId")),
          owningProjectId: S.optional(S.String).pipe(T.HttpQuery("owningProjectId")),
          owningIamPrincipalArn: S.optional(S.String).pipe(T.HttpQuery("owningIamPrincipalArn")),
          owningUserId: S.optional(S.String).pipe(T.HttpQuery("owningUserId")),
          owningGroupId: S.optional(S.String).pipe(T.HttpQuery("owningGroupId")),
          approverProjectId: S.optional(S.String).pipe(T.HttpQuery("approverProjectId")),
          sortBy: S.optional(S.String).pipe(T.HttpQuery("sortBy")),
          sortOrder: S.optional(S.String).pipe(T.HttpQuery("sortOrder")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/domains/{domainIdentifier}/subscriptions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSubscriptionsInput" });
    case 1:
      return S.Array(__S(2464, __c77, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ items: __S(1953, __c61, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSubscriptionsOutput" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          environmentIdentifier: S.String.pipe(T.HttpLabel("environmentIdentifier")),
          sortBy: S.optional(S.String).pipe(T.HttpQuery("sortBy")),
          sortOrder: S.optional(S.String).pipe(T.HttpQuery("sortOrder")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/subscription-targets",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSubscriptionTargetsInput" });
    case 1:
      return S.Array(__S(6114, __c191, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({ items: __S(1985, __c62, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSubscriptionTargetsOutput" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(4256, __c133, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/v2/domains/{domainIdentifier}/metadata-generation-runs/{identifier}/cancel",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelMetadataGenerationRunInput" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          entityIdentifier: S.String.pipe(T.HttpLabel("entityIdentifier")),
          entityType: S.String.pipe(T.HttpLabel("entityType")),
          formName: S.String.pipe(T.HttpQuery("formName")),
          startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("startedAt"),
          ),
          endedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("endedAt"),
          ),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/entities/{entityType}/{entityIdentifier}/time-series-data-points",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTimeSeriesDataPointsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(3425, __c107, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTimeSeriesDataPointsOutput" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          event: T.StreamingInput.pipe(T.HttpPayload()),
          clientToken: S.optional(S.String).pipe(
            T.HttpHeader("Client-Token"),
            T.IdempotencyToken(),
          ),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/domains/{domainIdentifier}/lineage/events" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PostLineageEventInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ id: S.optional(S.String), domainId: S.optional(S.String) }),
      ).annotate({ identifier: "PostLineageEventOutput" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          formName: S.String,
          typeIdentifier: S.String,
          typeRevision: S.optional(S.String),
          timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          content: S.optional(S.String),
        }),
      ).annotate({ identifier: "TimeSeriesDataPointFormInput" });
    case 1:
      return S.Array(__S(2144, __c67, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          entityIdentifier: S.String.pipe(T.HttpLabel("entityIdentifier")),
          entityType: S.String.pipe(T.HttpLabel("entityType")),
          forms: __S(2145, __c67, 1),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/v2/domains/{domainIdentifier}/entities/{entityType}/{entityIdentifier}/time-series-data-points",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PostTimeSeriesDataPointsInput" });
    case 3:
      return S.Array(__S(736, __c23, 0));
    case 4:
      return S.suspend(() =>
        S.Struct({
          domainId: S.optional(S.String),
          entityId: S.optional(S.String),
          entityType: S.optional(S.String),
          forms: S.optional(__S(2147, __c67, 3)),
        }),
      ).annotate({ identifier: "PostTimeSeriesDataPointsOutput" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          enableExport: S.Boolean,
          encryptionConfiguration: S.optional(__S(7936, __c248, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v2/domains/{domainIdentifier}/data-export-configuration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutDataExportConfigurationInput" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          region: S.String,
          parameters: __S(4256, __c133, 0),
        }),
      ).annotate({ identifier: "PutResourceConfiguration" });
    case 1:
      return S.Array(__S(2208, __c69, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          environmentBlueprintIdentifier: S.String.pipe(
            T.HttpLabel("environmentBlueprintIdentifier"),
          ),
          provisioningRoleArn: S.optional(S.String),
          manageAccessRoleArn: S.optional(S.String),
          environmentRolePermissionBoundary: S.optional(S.String),
          enabledRegions: __S(7456, __c233, 0),
          regionalParameters: S.optional(__S(8416, __c263, 0)),
          resourceConfigurations: S.optional(__S(2209, __c69, 1)),
          allowUserProvidedConfigurations: S.optional(S.Boolean),
          globalParameters: S.optional(__S(4256, __c133, 0)),
          provisioningConfigurations: S.optional(__S(8421, __c263, 5)),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v2/domains/{domainIdentifier}/environment-blueprint-configurations/{environmentBlueprintIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutEnvironmentBlueprintConfigurationInput" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          relationType: S.String,
          relationDirection: S.String,
          maxPathLength: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RelationPattern" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          entityType: S.String,
          identifier: S.String,
          filters: S.optional(__S(2274, __c71, 2)),
        }),
      ).annotate({ identifier: "EntityPattern" });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ relationPattern: __S(2240, __c70, 0) }),
        /*@__PURE__*/ S.Struct({ entityPattern: __S(2241, __c70, 1) }),
      ]);
    case 3:
      return S.Array(__S(2242, __c70, 2));
    case 4:
      return S.suspend(() => S.Struct({ formNames: S.optional(__S(7456, __c233, 0)) })).annotate({
        identifier: "AdditionalAttributes",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          match: __S(2243, __c70, 3),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          additionalAttributes: S.optional(__S(2244, __c70, 4)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/domains/{domainIdentifier}/graph/query" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "QueryGraphInput" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          name: S.optional(S.String),
          description: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedBy: S.optional(S.String),
          id: S.String,
          typeName: S.String,
          typeRevision: S.optional(S.String),
          sourceIdentifier: S.optional(S.String),
          eventTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          formsOutput: S.optional(__S(7489, __c234, 1)),
          upstreamLineageNodeIds: S.optional(__S(7456, __c233, 0)),
          downstreamLineageNodeIds: S.optional(__S(7456, __c233, 0)),
        }),
      ).annotate({ identifier: "LineageNodeItem" });
    case 7:
      return S.Union([/*@__PURE__*/ S.Struct({ lineageNode: __S(2246, __c70, 6) })]);
    case 8:
      return S.Array(__S(2247, __c70, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(2248, __c70, 8)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "QueryGraphOutput" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          attribute: S.String,
          value: S.optional(S.String),
          intValue: S.optional(S.Number),
          operator: S.optional(S.String),
        }),
      ).annotate({ identifier: "Filter" });
    case 1:
      return S.Array(
        /*@__PURE__*/ S.suspend(() => __S(2274, __c71, 2)).annotate({ identifier: "FilterClause" }),
      );
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ filter: __S(2272, __c71, 0) }),
        /*@__PURE__*/ S.Struct({
          and: /*@__PURE__*/ S.suspend(() => __S(2273, __c71, 1)).annotate({
            identifier: "FilterList",
          }),
        }),
        /*@__PURE__*/ S.Struct({
          or: /*@__PURE__*/ S.suspend(() => __S(2273, __c71, 1)).annotate({
            identifier: "FilterList",
          }),
        }),
      ]);
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.Number);
    case 1:
      return S.suspend(() =>
        S.Struct({
          predictionTarget: S.optional(S.String),
          predictionChoices: S.optional(__S(2304, __c72, 0)),
        }),
      ).annotate({ identifier: "RejectChoice" });
    case 2:
      return S.Array(__S(2305, __c72, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          revision: S.optional(S.String).pipe(T.HttpQuery("revision")),
          rejectRule: S.optional(__S(7040, __c220, 0)),
          rejectChoices: S.optional(__S(2306, __c72, 2)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v2/domains/{domainIdentifier}/assets/{identifier}/reject-predictions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RejectPredictionsInput" });
    case 4:
      return S.suspend(() =>
        S.Struct({ domainId: S.String, assetId: S.String, assetRevision: S.String }),
      ).annotate({ identifier: "RejectPredictionsOutput" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          decisionComment: S.optional(SensitiveString),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v2/domains/{domainIdentifier}/subscription-requests/{identifier}/reject",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RejectSubscriptionRequestInput" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          entityType: S.String.pipe(T.HttpLabel("entityType")),
          entityIdentifier: S.String.pipe(T.HttpLabel("entityIdentifier")),
          owner: __S(8322, __c260, 2),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/v2/domains/{domainIdentifier}/entities/{entityType}/{entityIdentifier}/removeOwner",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RemoveEntityOwnerInput" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          entityType: S.String.pipe(T.HttpLabel("entityType")),
          entityIdentifier: S.String.pipe(T.HttpLabel("entityIdentifier")),
          policyType: S.String,
          principal: __S(71, __c2, 7),
          grantIdentifier: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/v2/domains/{domainIdentifier}/policies/managed/{entityType}/{entityIdentifier}/removeGrant",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RemovePolicyGrantInput" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v2/domains/{domainIdentifier}/subscriptions/{identifier}/cancel",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelSubscriptionInput" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          createdBy: S.String,
          updatedBy: S.optional(S.String),
          domainId: S.String,
          status: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          subscribedPrincipal: __S(7619, __c238, 3),
          subscribedListing: __S(7625, __c238, 9),
          subscriptionRequestId: S.optional(S.String),
          retainPermissions: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "CancelSubscriptionOutput" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          retainPermissions: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v2/domains/{domainIdentifier}/subscriptions/{identifier}/revoke",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RevokeSubscriptionInput" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          owningProjectIdentifier: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          searchScope: S.String,
          searchText: S.optional(S.String),
          searchIn: S.optional(__S(2593, __c81, 1)),
          filters: S.optional(__S(2274, __c71, 2)),
          sort: S.optional(__S(2594, __c81, 2)),
          additionalAttributes: S.optional(__S(7520, __c235, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/domains/{domainIdentifier}/search" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ matchRationale: S.optional(__S(2565, __c80, 5)) }),
      ).annotate({ identifier: "GlossaryItemAdditionalAttributes" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          id: S.String,
          name: SensitiveString,
          owningProjectId: S.String,
          description: S.optional(SensitiveString),
          status: S.String,
          usageRestrictions: S.optional(__S(7520, __c235, 0)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedBy: S.optional(S.String),
          additionalAttributes: S.optional(__S(2529, __c79, 1)),
        }),
      ).annotate({ identifier: "GlossaryItem" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          glossaryId: S.String,
          id: S.String,
          name: SensitiveString,
          shortDescription: S.optional(SensitiveString),
          usageRestrictions: S.optional(__S(7520, __c235, 0)),
          longDescription: S.optional(SensitiveString),
          termRelations: S.optional(__S(5376, __c168, 0)),
          status: S.String,
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedBy: S.optional(S.String),
          additionalAttributes: S.optional(__S(2529, __c79, 1)),
        }),
      ).annotate({ identifier: "GlossaryTermItem" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          formsOutput: S.optional(__S(7489, __c234, 1)),
          readOnlyFormsOutput: S.optional(__S(7489, __c234, 1)),
          latestTimeSeriesDataPointFormsOutput: S.optional(__S(3425, __c107, 1)),
          matchRationale: S.optional(__S(2565, __c80, 5)),
        }),
      ).annotate({ identifier: "AssetItemAdditionalAttributes" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          identifier: S.String,
          name: SensitiveString,
          typeIdentifier: S.String,
          typeRevision: S.String,
          externalIdentifier: S.optional(S.String),
          description: S.optional(SensitiveString),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          firstRevisionCreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          firstRevisionCreatedBy: S.optional(S.String),
          glossaryTerms: S.optional(__S(7456, __c233, 0)),
          owningProjectId: S.String,
          additionalAttributes: S.optional(__S(2532, __c79, 4)),
          governedGlossaryTerms: S.optional(__S(7456, __c233, 0)),
        }),
      ).annotate({ identifier: "AssetItem" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          id: S.String,
          name: SensitiveString,
          owningProjectId: S.String,
          description: S.optional(SensitiveString),
          glossaryTerms: S.optional(__S(7456, __c233, 0)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          firstRevisionCreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          firstRevisionCreatedBy: S.optional(S.String),
          additionalAttributes: S.optional(__S(2529, __c79, 1)),
        }),
      ).annotate({ identifier: "DataProductResultItem" });
    case 7:
      return S.Union([
        /*@__PURE__*/ S.Struct({ glossaryItem: __S(2530, __c79, 2) }),
        /*@__PURE__*/ S.Struct({ glossaryTermItem: __S(2531, __c79, 3) }),
        /*@__PURE__*/ S.Struct({ assetItem: __S(2533, __c79, 5) }),
        /*@__PURE__*/ S.Struct({ dataProductItem: __S(2534, __c79, 6) }),
      ]);
    case 8:
      return S.Array(__S(2535, __c79, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          items: S.optional(__S(2536, __c79, 8)),
          nextToken: S.optional(S.String),
          totalMatchCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SearchOutput" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ startOffset: S.optional(S.Number), endOffset: S.optional(S.Number) }),
      ).annotate({ identifier: "MatchOffset" });
    case 1:
      return S.Array(__S(2560, __c80, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          attribute: S.optional(S.String),
          text: S.optional(S.String),
          matchOffsets: S.optional(__S(2561, __c80, 1)),
        }),
      ).annotate({ identifier: "TextMatchItem" });
    case 3:
      return S.Array(__S(2562, __c80, 2));
    case 4:
      return S.Union([/*@__PURE__*/ S.Struct({ textMatches: __S(2563, __c80, 3) })]);
    case 5:
      return S.Array(__S(2564, __c80, 4));
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ attribute: S.String })).annotate({
        identifier: "SearchInItem",
      });
    case 1:
      return S.Array(__S(2592, __c81, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ attribute: S.String, order: S.optional(S.String) }),
      ).annotate({ identifier: "SearchSort" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          groupType: S.String,
          searchText: S.optional(SensitiveString),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/domains/{domainIdentifier}/search-group-profiles" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchGroupProfilesInput" });
    case 1:
      return S.Array(__S(5440, __c170, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(2625, __c82, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "SearchGroupProfilesOutput" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ attribute: S.String, displayValue: S.optional(S.String) }),
      ).annotate({ identifier: "AggregationListItem" });
    case 1:
      return S.Array(__S(2656, __c83, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          searchText: S.optional(S.String),
          searchIn: S.optional(__S(2593, __c81, 1)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          filters: S.optional(__S(2274, __c71, 2)),
          aggregations: S.optional(__S(2657, __c83, 1)),
          sort: S.optional(__S(2594, __c81, 2)),
          additionalAttributes: S.optional(__S(7520, __c235, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/domains/{domainIdentifier}/listings/search" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchListingsInput" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          forms: S.optional(S.String),
          matchRationale: S.optional(__S(2565, __c80, 5)),
          latestTimeSeriesDataPointForms: S.optional(__S(3425, __c107, 1)),
        }),
      ).annotate({ identifier: "AssetListingItemAdditionalAttributes" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          listingId: S.optional(S.String),
          listingRevision: S.optional(S.String),
          name: S.optional(SensitiveString),
          entityId: S.optional(S.String),
          entityRevision: S.optional(S.String),
          entityType: S.optional(S.String),
          description: S.optional(SensitiveString),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          listingCreatedBy: S.optional(S.String),
          listingUpdatedBy: S.optional(S.String),
          glossaryTerms: S.optional(__S(7585, __c237, 1)),
          governedGlossaryTerms: S.optional(__S(7585, __c237, 1)),
          owningProjectId: S.optional(S.String),
          additionalAttributes: S.optional(__S(2659, __c83, 3)),
        }),
      ).annotate({ identifier: "AssetListingItem" });
    case 5:
      return S.suspend(() =>
        S.Struct({ forms: S.optional(S.String), matchRationale: S.optional(__S(2565, __c80, 5)) }),
      ).annotate({ identifier: "DataProductListingItemAdditionalAttributes" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          listingId: S.optional(S.String),
          listingRevision: S.optional(S.String),
          name: S.optional(SensitiveString),
          entityId: S.optional(S.String),
          entityRevision: S.optional(S.String),
          description: S.optional(SensitiveString),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          listingCreatedBy: S.optional(S.String),
          listingUpdatedBy: S.optional(S.String),
          glossaryTerms: S.optional(__S(7585, __c237, 1)),
          owningProjectId: S.optional(S.String),
          additionalAttributes: S.optional(__S(2661, __c83, 5)),
          items: S.optional(__S(193, __c6, 1)),
        }),
      ).annotate({ identifier: "DataProductListingItem" });
    case 7:
      return S.Union([
        /*@__PURE__*/ S.Struct({ assetListing: __S(2660, __c83, 4) }),
        /*@__PURE__*/ S.Struct({ dataProductListing: __S(2662, __c83, 6) }),
      ]);
    case 8:
      return S.Array(__S(2663, __c83, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          value: S.optional(S.String),
          count: S.optional(S.Number),
          displayValue: S.optional(S.String),
        }),
      ).annotate({ identifier: "AggregationOutputItem" });
    case 10:
      return S.Array(__S(2665, __c83, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({
          attribute: S.optional(S.String),
          displayValue: S.optional(S.String),
          items: S.optional(__S(2666, __c83, 10)),
        }),
      ).annotate({ identifier: "AggregationOutput" });
    case 12:
      return S.Array(__S(2667, __c83, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({
          items: S.optional(__S(2664, __c83, 8)),
          nextToken: S.optional(S.String),
          totalMatchCount: S.optional(S.Number),
          aggregates: S.optional(__S(2668, __c83, 12)),
        }),
      ).annotate({ identifier: "SearchListingsOutput" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          searchScope: S.String,
          searchText: S.optional(S.String),
          searchIn: S.optional(__S(2593, __c81, 1)),
          filters: S.optional(__S(2274, __c71, 2)),
          sort: S.optional(__S(2594, __c81, 2)),
          managed: S.Boolean,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/domains/{domainIdentifier}/types-search" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchTypesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          name: SensitiveString,
          revision: S.String,
          model: S.optional(__S(5216, __c163, 0)),
          status: S.optional(S.String),
          owningProjectId: S.optional(S.String),
          originDomainId: S.optional(S.String),
          originProjectId: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          description: S.optional(SensitiveString),
          imports: S.optional(__S(8545, __c267, 1)),
        }),
      ).annotate({ identifier: "FormTypeData" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          name: S.optional(S.String),
          description: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedBy: S.optional(S.String),
          revision: S.String,
          formsOutput: __S(4129, __c129, 1),
        }),
      ).annotate({ identifier: "LineageNodeTypeItem" });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ assetTypeItem: __S(7808, __c244, 0) }),
        /*@__PURE__*/ S.Struct({ formTypeItem: __S(2689, __c84, 1) }),
        /*@__PURE__*/ S.Struct({ lineageNodeTypeItem: __S(2690, __c84, 2) }),
      ]);
    case 4:
      return S.Array(__S(2691, __c84, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          items: S.optional(__S(2692, __c84, 4)),
          nextToken: S.optional(S.String),
          totalMatchCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SearchTypesOutput" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          userType: S.String,
          searchText: S.optional(SensitiveString),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/domains/{domainIdentifier}/search-user-profiles" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchUserProfilesInput" });
    case 1:
      return S.Array(__S(6176, __c193, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(2721, __c85, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "SearchUserProfilesOutput" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          dataSourceIdentifier: S.String.pipe(T.HttpLabel("dataSourceIdentifier")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/v2/domains/{domainIdentifier}/data-sources/{dataSourceIdentifier}/runs",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartDataSourceRunInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          dataSourceId: S.String,
          id: S.String,
          projectId: S.String,
          status: S.String,
          type: S.String,
          dataSourceConfigurationSnapshot: S.optional(S.String),
          runStatisticsForAssets: S.optional(__S(8096, __c253, 0)),
          errorMessage: S.optional(__S(4576, __c143, 0)),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          startedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          stoppedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "StartDataSourceRunOutput" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          type: S.optional(S.String),
          types: S.optional(__S(7520, __c235, 0)),
          target: __S(256, __c8, 0),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          owningProjectIdentifier: S.String,
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/v2/domains/{domainIdentifier}/metadata-generation-runs",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartMetadataGenerationRunInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          id: S.String,
          status: S.optional(S.String),
          type: S.optional(S.String),
          types: S.optional(__S(7520, __c235, 0)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          owningProjectId: S.optional(S.String),
        }),
      ).annotate({ identifier: "StartMetadataGenerationRunOutput" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          notebookIdentifier: S.String,
          owningProjectIdentifier: S.String,
          fileFormat: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/domains/{domainIdentifier}/notebook-exports" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartNotebookExportInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          domainId: S.String,
          owningProjectId: S.String,
          notebookId: S.String,
          fileFormat: S.String,
          status: S.String,
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "StartNotebookExportOutput" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          owningProjectIdentifier: S.String,
          sourceLocation: __S(2880, __c90, 0),
          name: SensitiveString,
          description: S.optional(SensitiveString),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/domains/{domainIdentifier}/notebook-imports" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartNotebookImportInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          notebookId: S.optional(S.String),
          status: S.optional(S.String),
          domainId: S.optional(S.String),
          owningProjectId: S.optional(S.String),
          name: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          sourceLocation: S.optional(__S(2880, __c90, 0)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "StartNotebookImportOutput" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ s3: SensitiveString })]);
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          name: SensitiveString,
          description: S.optional(SensitiveString),
          resolutionStrategy: S.String,
          accountSource: __S(2977, __c93, 1),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/domains/{domainIdentifier}/account-pools" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAccountPoolInput" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          awsAccountId: S.String,
          supportedRegions: __S(7456, __c233, 0),
          awsAccountName: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "AccountInfo" });
    case 1:
      return S.Array(__S(2944, __c92, 0));
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ lambdaFunctionArn: S.String, lambdaExecutionRoleArn: S.optional(S.String) }),
      ).annotate({ identifier: "CustomAccountPoolHandler" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ accounts: __S(2945, __c92, 1) }),
        /*@__PURE__*/ S.Struct({ customAccountPoolHandler: __S(2976, __c93, 0) }),
      ]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          domainId: S.optional(S.String),
          name: S.optional(SensitiveString),
          id: S.optional(S.String),
          description: S.optional(SensitiveString),
          resolutionStrategy: S.optional(S.String),
          accountSource: __S(2977, __c93, 1),
          createdBy: S.String,
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedBy: S.optional(S.String),
          domainUnitId: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateAccountPoolOutput" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          owningProjectIdentifier: S.String,
          notebookIdentifier: S.String,
          scheduleIdentifier: S.optional(S.String),
          computeConfiguration: S.optional(__S(416, __c13, 0)),
          networkConfiguration: S.optional(__S(417, __c13, 1)),
          timeoutConfiguration: S.optional(__S(418, __c13, 2)),
          notificationConfiguration: S.optional(__S(420, __c13, 4)),
          triggerSource: S.optional(__S(384, __c12, 0)),
          metadata: S.optional(__S(5536, __c173, 0)),
          parameters: S.optional(__S(4256, __c133, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/domains/{domainIdentifier}/notebook-runs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartNotebookRunInput" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          owningProjectIdentifier: S.String,
          sourceLocation: __S(2880, __c90, 0),
          gitMetadata: S.optional(__S(5568, __c174, 0)),
          notebookId: S.optional(S.String),
          name: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/domains/{domainIdentifier}/notebook-syncs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartNotebookSyncInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          notebookId: S.optional(S.String),
          status: S.optional(S.String),
          domainId: S.optional(S.String),
          owningProjectId: S.optional(S.String),
          sourceLocation: S.optional(__S(2880, __c90, 0)),
          gitMetadata: S.optional(__S(5568, __c174, 0)),
          name: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "StartNotebookSyncOutput" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v2/domains/{domainIdentifier}/notebook-runs/{identifier}/stop",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopNotebookRunInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ id: S.String, domainId: S.String, owningProjectId: S.String, status: S.String }),
      ).annotate({ identifier: "StopNotebookRunOutput" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(4256, __c133, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(7456, __c233, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          name: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          resolutionStrategy: S.optional(S.String),
          accountSource: S.optional(__S(2977, __c93, 1)),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/v2/domains/{domainIdentifier}/account-pools/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAccountPoolInput" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          assetIdentifier: S.String.pipe(T.HttpLabel("assetIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          name: S.optional(S.String),
          description: S.optional(SensitiveString),
          configuration: S.optional(__S(3816, __c119, 8)),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/v2/domains/{domainIdentifier}/assets/{assetIdentifier}/filters/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAssetFilterInput" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          secretArn: S.optional(S.String),
          basicAuthenticationCredentials: S.optional(__S(4192, __c131, 0)),
        }),
      ).annotate({ identifier: "AuthenticationConfigurationPatch" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          description: S.optional(S.String),
          connectionProperties: S.optional(__S(4256, __c133, 0)),
          authenticationConfiguration: S.optional(__S(3232, __c101, 0)),
        }),
      ).annotate({ identifier: "GlueConnectionPatch" });
    case 2:
      return S.suspend(() =>
        S.Struct({ glueConnectionInput: S.optional(__S(3233, __c101, 1)) }),
      ).annotate({ identifier: "GluePropertiesPatch" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          connectivityPropertiesPatch: S.optional(__S(3233, __c101, 1)),
          snowflakeRole: S.optional(S.String),
          lineageSync: S.optional(__S(4197, __c131, 5)),
        }),
      ).annotate({ identifier: "SnowflakePropertiesPatch" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          vpcId: S.optional(S.String),
          subnetIds: S.optional(__S(7456, __c233, 0)),
          securityGroupId: S.optional(S.String),
        }),
      ).annotate({ identifier: "VpcPropertiesPatch" });
    case 5:
      return S.suspend(() =>
        S.Struct({ codeConnectionArn: S.optional(S.String), defaultBranch: S.optional(S.String) }),
      ).annotate({ identifier: "GitPropertiesPatch" });
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({ athenaProperties: __S(4291, __c134, 3) }),
        /*@__PURE__*/ S.Struct({ glueProperties: __S(3234, __c101, 2) }),
        /*@__PURE__*/ S.Struct({ iamProperties: __S(4307, __c134, 19) }),
        /*@__PURE__*/ S.Struct({ redshiftProperties: __S(4194, __c131, 2) }),
        /*@__PURE__*/ S.Struct({ sparkEmrProperties: __S(4195, __c131, 3) }),
        /*@__PURE__*/ S.Struct({ s3Properties: __S(4196, __c131, 4) }),
        /*@__PURE__*/ S.Struct({ snowflakeProperties: __S(3235, __c101, 3) }),
        /*@__PURE__*/ S.Struct({ amazonQProperties: __S(4304, __c134, 16) }),
        /*@__PURE__*/ S.Struct({ mlflowProperties: __S(4305, __c134, 17) }),
        /*@__PURE__*/ S.Struct({ lakehouseProperties: __S(4307, __c134, 19) }),
        /*@__PURE__*/ S.Struct({ vpcProperties: __S(3236, __c101, 4) }),
        /*@__PURE__*/ S.Struct({ gitProperties: __S(3237, __c101, 5) }),
      ]);
    case 7:
      return S.suspend(() =>
        S.Struct({
          configurations: S.optional(__S(4290, __c134, 2)),
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          description: S.optional(SensitiveString),
          awsLocation: S.optional(__S(4288, __c134, 0)),
          props: S.optional(__S(3238, __c101, 6)),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/v2/domains/{domainIdentifier}/connections/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateConnectionInput" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          configurations: S.optional(__S(4290, __c134, 2)),
          connectionId: S.String,
          description: S.optional(SensitiveString),
          domainId: S.String,
          domainUnitId: S.String,
          environmentId: S.optional(S.String),
          name: S.String,
          physicalEndpoints: __S(4311, __c134, 23),
          projectId: S.optional(S.String),
          props: S.optional(__S(4324, __c135, 4)),
          type: S.String,
          scope: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateConnectionOutput" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          name: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          enableSetting: S.optional(S.String),
          publishOnImport: S.optional(S.Boolean),
          assetFormsInput: S.optional(__S(1697, __c53, 1)),
          schedule: S.optional(__S(4512, __c141, 0)),
          configuration: S.optional(__S(4483, __c140, 3)),
          recommendation: S.optional(__S(4608, __c144, 0)),
          retainPermissionsOnRevokeFailure: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/v2/domains/{domainIdentifier}/data-sources/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDataSourceInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          status: S.optional(S.String),
          type: S.optional(S.String),
          name: SensitiveString,
          description: S.optional(SensitiveString),
          domainId: S.String,
          projectId: S.String,
          environmentId: S.optional(S.String),
          connectionId: S.optional(S.String),
          configuration: S.optional(__S(4555, __c142, 11)),
          recommendation: S.optional(__S(4608, __c144, 0)),
          enableSetting: S.optional(S.String),
          publishOnImport: S.optional(S.Boolean),
          assetFormsOutput: S.optional(__S(7489, __c234, 1)),
          schedule: S.optional(__S(4512, __c141, 0)),
          lastRunStatus: S.optional(S.String),
          lastRunAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastRunErrorMessage: S.optional(__S(4576, __c143, 0)),
          errorMessage: S.optional(__S(4576, __c143, 0)),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          selfGrantStatus: S.optional(__S(6467, __c202, 3)),
          retainPermissionsOnRevokeFailure: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "UpdateDataSourceOutput" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          description: S.optional(S.String),
          singleSignOn: S.optional(__S(4672, __c146, 0)),
          domainExecutionRole: S.optional(S.String),
          serviceRole: S.optional(S.String),
          name: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v2/domains/{identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDomainInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          rootDomainUnitId: S.optional(S.String),
          description: S.optional(S.String),
          singleSignOn: S.optional(__S(4672, __c146, 0)),
          domainExecutionRole: S.optional(S.String),
          serviceRole: S.optional(S.String),
          name: S.optional(S.String),
          lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "UpdateDomainOutput" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: SensitiveString,
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          externalIdentifier: S.optional(S.String),
          typeIdentifier: S.String,
          typeRevision: S.optional(S.String),
          description: S.optional(SensitiveString),
          glossaryTerms: S.optional(__S(7456, __c233, 0)),
          formsInput: S.optional(__S(1697, __c53, 1)),
          owningProjectIdentifier: S.String,
          predictionConfiguration: S.optional(__S(3361, __c105, 1)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/domains/{domainIdentifier}/assets" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAssetInput" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ enabled: S.optional(S.Boolean) })).annotate({
        identifier: "BusinessNameGenerationConfiguration",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ businessNameGeneration: S.optional(__S(3360, __c105, 0)) }),
      ).annotate({ identifier: "PredictionConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          name: SensitiveString,
          typeIdentifier: S.String,
          typeRevision: S.String,
          externalIdentifier: S.optional(S.String),
          revision: S.String,
          description: S.optional(SensitiveString),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          firstRevisionCreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          firstRevisionCreatedBy: S.optional(S.String),
          glossaryTerms: S.optional(__S(7456, __c233, 0)),
          governedGlossaryTerms: S.optional(__S(7456, __c233, 0)),
          owningProjectId: S.String,
          domainId: S.String,
          listing: S.optional(__S(3392, __c106, 0)),
          formsOutput: __S(7489, __c234, 1),
          readOnlyFormsOutput: S.optional(__S(7489, __c234, 1)),
          latestTimeSeriesDataPointFormsOutput: S.optional(__S(3425, __c107, 1)),
          predictionConfiguration: S.optional(__S(3361, __c105, 1)),
        }),
      ).annotate({ identifier: "CreateAssetOutput" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ listingId: S.String, listingStatus: S.String })).annotate({
        identifier: "AssetListingDetails",
      });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          formName: S.String,
          typeIdentifier: S.String,
          typeRevision: S.optional(S.String),
          timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          contentSummary: S.optional(S.String),
          id: S.optional(S.String),
        }),
      ).annotate({ identifier: "TimeSeriesDataPointSummaryFormOutput" });
    case 1:
      return S.Array(__S(3424, __c107, 0));
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          description: S.optional(SensitiveString),
          name: S.optional(SensitiveString),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v2/domains/{domainIdentifier}/domain-units/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDomainUnitInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          domainId: S.String,
          name: SensitiveString,
          owners: __S(4739, __c148, 3),
          description: S.optional(SensitiveString),
          parentDomainUnitId: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          lastUpdatedBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateDomainUnitOutput" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          name: S.optional(S.String),
          description: S.optional(S.String),
          glossaryTerms: S.optional(__S(7456, __c233, 0)),
          blueprintVersion: S.optional(S.String),
          userParameters: S.optional(__S(4897, __c153, 1)),
          environmentConfigurationName: S.optional(SensitiveString),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/v2/domains/{domainIdentifier}/environments/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateEnvironmentInput" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          environmentIdentifier: S.String.pipe(T.HttpLabel("environmentIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          parameters: S.optional(__S(5025, __c157, 1)),
          name: S.optional(S.String),
          description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/actions/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateEnvironmentActionInput" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          description: S.optional(S.String),
          provisioningProperties: S.optional(__S(4833, __c151, 1)),
          userParameters: S.optional(__S(4801, __c150, 1)),
          blueprintCategory: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/v2/domains/{domainIdentifier}/environment-blueprints/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateEnvironmentBlueprintInput" });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          name: S.optional(SensitiveString),
          description: S.optional(S.String),
          userParameters: S.optional(__S(4897, __c153, 1)),
          awsAccountId: S.optional(S.String),
          awsAccountRegion: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/v2/domains/{domainIdentifier}/environment-profiles/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateEnvironmentProfileInput" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          name: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          status: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/v2/domains/{domainIdentifier}/glossaries/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateGlossaryInput" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          glossaryIdentifier: S.optional(S.String),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          name: S.optional(SensitiveString),
          shortDescription: S.optional(SensitiveString),
          longDescription: S.optional(SensitiveString),
          termRelations: S.optional(__S(5376, __c168, 0)),
          status: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/v2/domains/{domainIdentifier}/glossary-terms/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateGlossaryTermInput" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          groupIdentifier: S.String.pipe(T.HttpLabel("groupIdentifier")),
          status: S.String,
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v2/domains/{domainIdentifier}/group-profiles/{groupIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateGroupProfileInput" });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          description: S.optional(SensitiveString),
          status: S.optional(S.String),
          name: S.optional(SensitiveString),
          cellOrder: S.optional(__S(5537, __c173, 1)),
          type: S.optional(S.String),
          metadata: S.optional(__S(5536, __c173, 0)),
          parameters: S.optional(__S(4256, __c133, 0)),
          environmentConfiguration: S.optional(__S(5539, __c173, 3)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/v2/domains/{domainIdentifier}/notebooks/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateNotebookInput" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          name: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          resourceTags: S.optional(__S(4256, __c133, 0)),
          glossaryTerms: S.optional(__S(7456, __c233, 0)),
          domainUnitId: S.optional(S.String),
          environmentDeploymentDetails: S.optional(__S(5735, __c179, 7)),
          userParameters: S.optional(__S(5730, __c179, 2)),
          projectProfileVersion: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/v2/domains/{domainIdentifier}/projects/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateProjectInput" });
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          assetIdentifier: S.String.pipe(T.HttpLabel("assetIdentifier")),
          name: SensitiveString,
          description: S.optional(SensitiveString),
          configuration: __S(3816, __c119, 8),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/v2/domains/{domainIdentifier}/assets/{assetIdentifier}/filters",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAssetFilterInput" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ includedColumnNames: S.optional(__S(7456, __c233, 0)) }),
      ).annotate({ identifier: "ColumnFilterConfiguration" });
    case 1:
      return S.suspend(() => S.Struct({ columnName: S.String, value: S.String })).annotate({
        identifier: "EqualToExpression",
      });
    case 2:
      return S.suspend(() => S.Struct({ columnName: S.String })).annotate({
        identifier: "IsNullExpression",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({ columnName: S.String, values: __S(7456, __c233, 0) }),
      ).annotate({ identifier: "InExpression" });
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ equalTo: __S(3809, __c119, 1) }),
        /*@__PURE__*/ S.Struct({ notEqualTo: __S(3809, __c119, 1) }),
        /*@__PURE__*/ S.Struct({ greaterThan: __S(3809, __c119, 1) }),
        /*@__PURE__*/ S.Struct({ lessThan: __S(3809, __c119, 1) }),
        /*@__PURE__*/ S.Struct({ greaterThanOrEqualTo: __S(3809, __c119, 1) }),
        /*@__PURE__*/ S.Struct({ lessThanOrEqualTo: __S(3809, __c119, 1) }),
        /*@__PURE__*/ S.Struct({ isNull: __S(3810, __c119, 2) }),
        /*@__PURE__*/ S.Struct({ isNotNull: __S(3810, __c119, 2) }),
        /*@__PURE__*/ S.Struct({ in: __S(3811, __c119, 3) }),
        /*@__PURE__*/ S.Struct({ notIn: __S(3811, __c119, 3) }),
        /*@__PURE__*/ S.Struct({ like: __S(3809, __c119, 1) }),
        /*@__PURE__*/ S.Struct({ notLike: __S(3809, __c119, 1) }),
      ]);
    case 5:
      return S.Array(
        /*@__PURE__*/ S.suspend(() => __S(3814, __c119, 6)).annotate({ identifier: "RowFilter" }),
      );
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({ expression: __S(3812, __c119, 4) }),
        /*@__PURE__*/ S.Struct({
          and: /*@__PURE__*/ S.suspend(() => __S(3813, __c119, 5)).annotate({
            identifier: "RowFilterList",
          }),
        }),
        /*@__PURE__*/ S.Struct({
          or: /*@__PURE__*/ S.suspend(() => __S(3813, __c119, 5)).annotate({
            identifier: "RowFilterList",
          }),
        }),
      ]);
    case 7:
      return S.suspend(() =>
        S.Struct({ rowFilter: __S(3814, __c119, 6), sensitive: S.optional(S.Boolean) }),
      ).annotate({ identifier: "RowFilterConfiguration" });
    case 8:
      return S.Union([
        /*@__PURE__*/ S.Struct({ columnConfiguration: __S(3808, __c119, 0) }),
        /*@__PURE__*/ S.Struct({ rowConfiguration: __S(3815, __c119, 7) }),
      ]);
    case 9:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          domainId: S.String,
          assetId: S.String,
          name: SensitiveString,
          description: S.optional(SensitiveString),
          status: S.optional(S.String),
          configuration: __S(3816, __c119, 8),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          errorMessage: S.optional(S.String),
          effectiveColumnNames: S.optional(__S(7456, __c233, 0)),
          effectiveRowFilter: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateAssetFilterOutput" });
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          name: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          status: S.optional(S.String),
          projectResourceTags: S.optional(__S(5857, __c183, 1)),
          allowCustomProjectResourceTags: S.optional(S.Boolean),
          projectResourceTagsDescription: S.optional(SensitiveString),
          environmentConfigurations: S.optional(__S(5863, __c183, 7)),
          domainUnitIdentifier: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/v2/domains/{domainIdentifier}/project-profiles/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateProjectProfileInput" });
  }
}
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          currentOwner: S.String,
          newOwner: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/v2/domains/{domainIdentifier}/root-domain-unit-owner",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRootDomainUnitOwnerInput" });
  }
}
function __c122(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          name: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          scope: S.optional(__S(5924, __c185, 4)),
          detail: S.optional(__S(5956, __c186, 4)),
          includeChildDomainUnits: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/v2/domains/{domainIdentifier}/rules/{identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRuleInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          identifier: S.String,
          revision: S.String,
          name: SensitiveString,
          ruleType: S.String,
          target: __S(5921, __c185, 1),
          action: S.String,
          scope: __S(5924, __c185, 4),
          detail: __S(5956, __c186, 4),
          description: S.optional(SensitiveString),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          createdBy: S.String,
          lastUpdatedBy: S.String,
        }),
      ).annotate({ identifier: "UpdateRuleOutput" });
  }
}
function __c123(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          assetIdentifier: S.String.pipe(T.HttpLabel("assetIdentifier")),
          status: S.String,
          failureCause: S.optional(__S(6018, __c188, 2)),
          targetName: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/v2/domains/{domainIdentifier}/subscription-grants/{identifier}/status/{assetIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateSubscriptionGrantStatusInput" });
  }
}
function __c124(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          requestReason: SensitiveString,
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/v2/domains/{domainIdentifier}/subscription-requests/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateSubscriptionRequestInput" });
  }
}
function __c125(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          environmentIdentifier: S.String.pipe(T.HttpLabel("environmentIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          name: S.optional(SensitiveString),
          authorizedPrincipals: S.optional(__S(7456, __c233, 0)),
          applicableAssetTypes: S.optional(__S(7456, __c233, 0)),
          subscriptionTargetConfig: S.optional(__S(6113, __c191, 1)),
          manageAccessRole: S.optional(S.String),
          provider: S.optional(S.String),
          subscriptionGrantCreationMode: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/subscription-targets/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateSubscriptionTargetInput" });
  }
}
function __c126(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          userIdentifier: S.String.pipe(T.HttpLabel("userIdentifier")),
          type: S.optional(S.String),
          status: S.String,
          sessionName: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v2/domains/{domainIdentifier}/user-profiles/{userIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateUserProfileInput" });
  }
}
function __c127(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: SensitiveString,
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          typeRevision: S.optional(S.String),
          description: S.optional(SensitiveString),
          glossaryTerms: S.optional(__S(7456, __c233, 0)),
          formsInput: S.optional(__S(1697, __c53, 1)),
          predictionConfiguration: S.optional(__S(3361, __c105, 1)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/v2/domains/{domainIdentifier}/assets/{identifier}/revisions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAssetRevisionInput" });
  }
}
function __c128(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          typeIdentifier: S.String,
          typeRevision: S.String,
          required: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "FormEntryInput" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(4096, __c128, 0).pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          name: S.String,
          description: S.optional(SensitiveString),
          formsInput: __S(4097, __c128, 1),
          owningProjectIdentifier: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/domains/{domainIdentifier}/asset-types" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAssetTypeInput" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          name: S.String,
          revision: S.String,
          description: S.optional(SensitiveString),
          formsOutput: __S(4129, __c129, 1),
          owningProjectId: S.optional(S.String),
          originDomainId: S.optional(S.String),
          originProjectId: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateAssetTypeOutput" });
  }
}
function __c129(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          typeName: SensitiveString,
          typeRevision: S.String,
          required: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "FormEntryOutput" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(4128, __c129, 0).pipe(S.optional));
  }
}
function __c130(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          authenticationType: S.optional(S.String),
          oAuth2Properties: S.optional(__S(4296, __c134, 8)),
          secretArn: S.optional(S.String),
          kmsKeyArn: S.optional(S.String),
          basicAuthenticationCredentials: S.optional(__S(4192, __c131, 0)),
          customAuthenticationCredentials: S.optional(__S(4256, __c133, 0)),
        }),
      ).annotate({ identifier: "AuthenticationConfigurationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          connectionProperties: S.optional(__S(4256, __c133, 0)),
          physicalConnectionRequirements: S.optional(__S(4292, __c134, 4)),
          name: S.optional(S.String),
          description: S.optional(S.String),
          connectionType: S.optional(S.String),
          matchCriteria: S.optional(S.String),
          validateCredentials: S.optional(S.Boolean),
          validateForComputeEnvironments: S.optional(__S(7520, __c235, 0)),
          sparkProperties: S.optional(__S(4256, __c133, 0)),
          athenaProperties: S.optional(__S(4256, __c133, 0)),
          pythonProperties: S.optional(__S(4256, __c133, 0)),
          authenticationConfiguration: S.optional(__S(4160, __c130, 0)),
        }),
      ).annotate({ identifier: "GlueConnectionInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({ glueConnectionInput: S.optional(__S(4161, __c130, 1)) }),
      ).annotate({ identifier: "GluePropertiesInput" });
    case 3:
      return S.suspend(() =>
        S.Struct({ glueLineageSyncEnabled: S.optional(S.Boolean), roleArn: S.optional(S.String) }),
      ).annotate({ identifier: "IamPropertiesInput" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          connectionProperties: S.optional(__S(4256, __c133, 0)),
          physicalConnectionRequirements: S.optional(__S(4292, __c134, 4)),
          name: S.optional(S.String),
          description: S.optional(S.String),
          validateCredentials: S.optional(S.Boolean),
          validateForComputeEnvironments: S.optional(__S(7520, __c235, 0)),
          sparkProperties: S.optional(__S(4256, __c133, 0)),
          athenaProperties: S.optional(__S(4256, __c133, 0)),
          pythonProperties: S.optional(__S(4256, __c133, 0)),
          authenticationConfiguration: S.optional(__S(4160, __c130, 0)),
        }),
      ).annotate({ identifier: "ConnectivityProperties" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          connectivityProperties: S.optional(__S(4164, __c130, 4)),
          snowflakeRole: S.String,
          identityMapping: __S(4303, __c134, 15),
          lineageSync: S.optional(__S(4197, __c131, 5)),
        }),
      ).annotate({ identifier: "SnowflakePropertiesInput" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          vpcId: S.String,
          subnetIds: __S(7456, __c233, 0),
          securityGroupId: S.optional(S.String),
        }),
      ).annotate({ identifier: "VpcPropertiesInput" });
    case 7:
      return S.suspend(() =>
        S.Struct({ codeConnectionArn: S.String, repositoryId: S.String, defaultBranch: S.String }),
      ).annotate({ identifier: "GitPropertiesInput" });
    case 8:
      return S.Union([
        /*@__PURE__*/ S.Struct({ athenaProperties: __S(4291, __c134, 3) }),
        /*@__PURE__*/ S.Struct({ glueProperties: __S(4162, __c130, 2) }),
        /*@__PURE__*/ S.Struct({ hyperPodProperties: __S(4224, __c132, 0) }),
        /*@__PURE__*/ S.Struct({ iamProperties: __S(4163, __c130, 3) }),
        /*@__PURE__*/ S.Struct({ redshiftProperties: __S(4194, __c131, 2) }),
        /*@__PURE__*/ S.Struct({ sparkEmrProperties: __S(4195, __c131, 3) }),
        /*@__PURE__*/ S.Struct({ sparkGlueProperties: __S(4302, __c134, 14) }),
        /*@__PURE__*/ S.Struct({ s3Properties: __S(4196, __c131, 4) }),
        /*@__PURE__*/ S.Struct({ snowflakeProperties: __S(4165, __c130, 5) }),
        /*@__PURE__*/ S.Struct({ amazonQProperties: __S(4304, __c134, 16) }),
        /*@__PURE__*/ S.Struct({ mlflowProperties: __S(4305, __c134, 17) }),
        /*@__PURE__*/ S.Struct({ workflowsMwaaProperties: __S(4306, __c134, 18) }),
        /*@__PURE__*/ S.Struct({ workflowsServerlessProperties: __S(8288, __c259, 0) }),
        /*@__PURE__*/ S.Struct({ lakehouseProperties: __S(4307, __c134, 19) }),
        /*@__PURE__*/ S.Struct({ vpcProperties: __S(4166, __c130, 6) }),
        /*@__PURE__*/ S.Struct({ gitProperties: __S(4167, __c130, 7) }),
      ]);
    case 9:
      return S.suspend(() =>
        S.Struct({
          awsLocation: S.optional(__S(4288, __c134, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          configurations: S.optional(__S(4290, __c134, 2)),
          description: S.optional(SensitiveString),
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          environmentIdentifier: S.optional(S.String),
          name: S.String,
          props: S.optional(__S(4168, __c130, 8)),
          enableTrustedIdentityPropagation: S.optional(S.Boolean),
          scope: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/domains/{domainIdentifier}/connections" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateConnectionInput" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          connectionId: S.String,
          configurations: S.optional(__S(4290, __c134, 2)),
          description: S.optional(SensitiveString),
          domainId: S.String,
          domainUnitId: S.String,
          environmentId: S.optional(S.String),
          name: S.String,
          physicalEndpoints: __S(4311, __c134, 23),
          projectId: S.optional(S.String),
          props: S.optional(__S(4324, __c135, 4)),
          type: S.String,
          scope: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateConnectionOutput" });
  }
}
function __c131(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ userName: S.optional(S.String), password: S.optional(S.String) }),
      ).annotate({ identifier: "BasicAuthenticationCredentials" });
    case 1:
      return S.suspend(() =>
        S.Struct({ enabled: S.optional(S.Boolean), schedule: S.optional(__S(4300, __c134, 12)) }),
      ).annotate({ identifier: "RedshiftLineageSyncConfigurationInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          storage: S.optional(__S(4297, __c134, 9)),
          databaseName: S.optional(S.String),
          host: S.optional(S.String),
          port: S.optional(S.Number),
          credentials: S.optional(__S(4299, __c134, 11)),
          lineageSync: S.optional(__S(4193, __c131, 1)),
        }),
      ).annotate({ identifier: "RedshiftPropertiesInput" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          computeArn: S.optional(S.String),
          instanceProfileArn: S.optional(S.String),
          javaVirtualEnv: S.optional(S.String),
          logUri: S.optional(S.String),
          pythonVirtualEnv: S.optional(S.String),
          runtimeRole: S.optional(S.String),
          trustedCertificatesS3Uri: S.optional(S.String),
          managedEndpointArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "SparkEmrPropertiesInput" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          s3Uri: S.String,
          s3AccessGrantLocationId: S.optional(S.String),
          registerS3AccessGrantLocation: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "S3PropertiesInput" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          timezone: S.optional(S.String),
          enabled: S.Boolean,
          schedule: S.optional(S.String),
        }),
      ).annotate({ identifier: "LineageSyncInput" });
  }
}
function __c132(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ clusterName: S.String })).annotate({
        identifier: "HyperPodPropertiesInput",
      });
  }
}
function __c133(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c134(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accessRole: S.optional(S.String),
          awsAccountId: S.optional(S.String),
          awsRegion: S.optional(S.String),
          iamConnectionId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsLocation" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          classification: S.optional(S.String),
          properties: S.optional(__S(4256, __c133, 0)),
        }),
      ).annotate({ identifier: "Configuration" });
    case 2:
      return S.Array(__S(4289, __c134, 1));
    case 3:
      return S.suspend(() => S.Struct({ workgroupName: S.optional(S.String) })).annotate({
        identifier: "AthenaPropertiesInput",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          subnetId: S.optional(S.String),
          subnetIdList: S.optional(__S(7456, __c233, 0)),
          securityGroupIdList: S.optional(__S(7456, __c233, 0)),
          availabilityZone: S.optional(S.String),
        }),
      ).annotate({ identifier: "PhysicalConnectionRequirements" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          userManagedClientApplicationClientId: S.optional(S.String),
          aWSManagedClientApplicationReference: S.optional(S.String),
        }),
      ).annotate({ identifier: "OAuth2ClientApplication" });
    case 6:
      return S.suspend(() =>
        S.Struct({ authorizationCode: S.optional(S.String), redirectUri: S.optional(S.String) }),
      ).annotate({ identifier: "AuthorizationCodeProperties" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          userManagedClientApplicationClientSecret: S.optional(S.String),
          accessToken: S.optional(S.String),
          refreshToken: S.optional(S.String),
          jwtToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GlueOAuth2Credentials" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          oAuth2GrantType: S.optional(S.String),
          oAuth2ClientApplication: S.optional(__S(4293, __c134, 5)),
          tokenUrl: S.optional(S.String),
          tokenUrlParametersMap: S.optional(__S(4256, __c133, 0)),
          authorizationCodeProperties: S.optional(__S(4294, __c134, 6)),
          oAuth2Credentials: S.optional(__S(4295, __c134, 7)),
        }),
      ).annotate({ identifier: "OAuth2Properties" });
    case 9:
      return S.Union([
        /*@__PURE__*/ S.Struct({ clusterName: S.String }),
        /*@__PURE__*/ S.Struct({ workgroupName: S.String }),
      ]);
    case 10:
      return S.suspend(() => S.Struct({ password: SensitiveString, username: S.String })).annotate({
        identifier: "UsernamePassword",
      });
    case 11:
      return S.Union([
        /*@__PURE__*/ S.Struct({ secretArn: S.String }),
        /*@__PURE__*/ S.Struct({ usernamePassword: __S(4298, __c134, 10) }),
      ]);
    case 12:
      return S.suspend(() => S.Struct({ schedule: S.optional(S.String) })).annotate({
        identifier: "LineageSyncSchedule",
      });
    case 13:
      return S.suspend(() => S.Struct({ connection: S.optional(S.String) })).annotate({
        identifier: "SparkGlueArgs",
      });
    case 14:
      return S.suspend(() =>
        S.Struct({
          additionalArgs: S.optional(__S(4301, __c134, 13)),
          glueConnectionName: S.optional(S.String),
          glueConnectionNames: S.optional(__S(7456, __c233, 0)),
          glueVersion: S.optional(S.String),
          idleTimeout: S.optional(S.Number),
          javaVirtualEnv: S.optional(S.String),
          numberOfWorkers: S.optional(S.Number),
          pythonVirtualEnv: S.optional(S.String),
          workerType: S.optional(S.String),
        }),
      ).annotate({ identifier: "SparkGluePropertiesInput" });
    case 15:
      return S.suspend(() =>
        S.Struct({ usernameAttribute: S.String, prefix: S.optional(S.String) }),
      ).annotate({ identifier: "IdentityMapping" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          isEnabled: S.Boolean,
          profileArn: S.optional(S.String),
          authMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "AmazonQPropertiesInput" });
    case 17:
      return S.suspend(() => S.Struct({ trackingServerArn: S.optional(S.String) })).annotate({
        identifier: "MlflowPropertiesInput",
      });
    case 18:
      return S.suspend(() => S.Struct({ mwaaEnvironmentName: S.optional(S.String) })).annotate({
        identifier: "WorkflowsMwaaPropertiesInput",
      });
    case 19:
      return S.suspend(() => S.Struct({ glueLineageSyncEnabled: S.optional(S.Boolean) })).annotate({
        identifier: "LakehousePropertiesInput",
      });
    case 20:
      return S.suspend(() =>
        S.Struct({
          authenticationType: S.optional(S.String),
          secretArn: S.optional(S.String),
          oAuth2Properties: S.optional(__S(4296, __c134, 8)),
        }),
      ).annotate({ identifier: "AuthenticationConfiguration" });
    case 21:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          description: S.optional(S.String),
          connectionType: S.optional(S.String),
          matchCriteria: S.optional(__S(7456, __c233, 0)),
          connectionProperties: S.optional(__S(4256, __c133, 0)),
          sparkProperties: S.optional(__S(4256, __c133, 0)),
          athenaProperties: S.optional(__S(4256, __c133, 0)),
          pythonProperties: S.optional(__S(4256, __c133, 0)),
          physicalConnectionRequirements: S.optional(__S(4292, __c134, 4)),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedBy: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          lastConnectionValidationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          authenticationConfiguration: S.optional(__S(4308, __c134, 20)),
          connectionSchemaVersion: S.optional(S.Number),
          compatibleComputeEnvironments: S.optional(__S(7520, __c235, 0)),
        }),
      ).annotate({ identifier: "GlueConnection" });
    case 22:
      return S.suspend(() =>
        S.Struct({
          awsLocation: S.optional(__S(4288, __c134, 0)),
          glueConnectionName: S.optional(S.String),
          glueConnectionNames: S.optional(__S(7456, __c233, 0)),
          glueConnection: S.optional(__S(4309, __c134, 21)),
          enableTrustedIdentityPropagation: S.optional(S.Boolean),
          host: S.optional(S.String),
          port: S.optional(S.Number),
          protocol: S.optional(S.String),
          stage: S.optional(S.String),
        }),
      ).annotate({ identifier: "PhysicalEndpoint" });
    case 23:
      return S.Array(__S(4310, __c134, 22));
    case 24:
      return S.suspend(() =>
        S.Struct({ status: S.optional(S.String), errorMessage: S.optional(S.String) }),
      ).annotate({ identifier: "GluePropertiesOutput" });
    case 25:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.String,
          clusterArn: S.optional(S.String),
          orchestrator: S.optional(S.String),
        }),
      ).annotate({ identifier: "HyperPodPropertiesOutput" });
    case 26:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.optional(S.String),
          glueLineageSyncEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "IamPropertiesOutput" });
    case 27:
      return S.suspend(() =>
        S.Struct({
          lineageJobId: S.optional(S.String),
          enabled: S.optional(S.Boolean),
          schedule: S.optional(__S(4300, __c134, 12)),
        }),
      ).annotate({ identifier: "RedshiftLineageSyncConfigurationOutput" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          storage: S.optional(__S(4297, __c134, 9)),
          credentials: S.optional(__S(4299, __c134, 11)),
          isProvisionedSecret: S.optional(S.Boolean),
          jdbcIamUrl: S.optional(S.String),
          jdbcUrl: S.optional(S.String),
          redshiftTempDir: S.optional(S.String),
          lineageSync: S.optional(__S(4315, __c134, 27)),
          status: S.optional(S.String),
          databaseName: S.optional(S.String),
        }),
      ).annotate({ identifier: "RedshiftPropertiesOutput" });
    case 29:
      return S.suspend(() =>
        S.Struct({ id: S.optional(S.String), token: S.optional(S.String) }),
      ).annotate({ identifier: "ManagedEndpointCredentials" });
    case 30:
      return S.suspend(() =>
        S.Struct({
          computeArn: S.optional(S.String),
          credentials: S.optional(__S(4298, __c134, 10)),
          credentialsExpiration: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          governanceType: S.optional(S.String),
          instanceProfileArn: S.optional(S.String),
          javaVirtualEnv: S.optional(S.String),
          livyEndpoint: S.optional(S.String),
          logUri: S.optional(S.String),
          pythonVirtualEnv: S.optional(S.String),
          runtimeRole: S.optional(S.String),
          trustedCertificatesS3Uri: S.optional(S.String),
          certificateData: S.optional(S.String),
          managedEndpointArn: S.optional(S.String),
          managedEndpointCredentials: S.optional(__S(4317, __c134, 29)),
        }),
      ).annotate({ identifier: "SparkEmrPropertiesOutput" });
    case 31:
      return S.suspend(() =>
        S.Struct({
          s3Uri: S.String,
          s3AccessGrantLocationId: S.optional(S.String),
          registerS3AccessGrantLocation: S.optional(S.Boolean),
          status: S.optional(S.String),
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3PropertiesOutput" });
  }
}
function __c135(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          lineageJobId: S.optional(S.String),
          timezone: S.optional(S.String),
          enabled: S.optional(S.Boolean),
          schedule: S.optional(S.String),
        }),
      ).annotate({ identifier: "LineageSyncOutput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          snowflakeRole: S.String,
          identityMapping: __S(4303, __c134, 15),
          lineageSync: __S(4320, __c135, 0),
          status: S.String,
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "SnowflakePropertiesOutput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          vpcId: S.String,
          subnetIds: __S(7456, __c233, 0),
          status: S.String,
          securityGroupId: S.optional(S.String),
          glueConnectionNames: S.optional(__S(7456, __c233, 0)),
        }),
      ).annotate({ identifier: "VpcPropertiesOutput" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          codeConnectionArn: S.String,
          repositoryId: S.String,
          defaultBranch: S.String,
          status: S.optional(S.String),
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "GitPropertiesOutput" });
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ athenaProperties: __S(4291, __c134, 3) }),
        /*@__PURE__*/ S.Struct({ glueProperties: __S(4312, __c134, 24) }),
        /*@__PURE__*/ S.Struct({ hyperPodProperties: __S(4313, __c134, 25) }),
        /*@__PURE__*/ S.Struct({ iamProperties: __S(4314, __c134, 26) }),
        /*@__PURE__*/ S.Struct({ redshiftProperties: __S(4316, __c134, 28) }),
        /*@__PURE__*/ S.Struct({ sparkEmrProperties: __S(4318, __c134, 30) }),
        /*@__PURE__*/ S.Struct({ sparkGlueProperties: __S(4302, __c134, 14) }),
        /*@__PURE__*/ S.Struct({ s3Properties: __S(4319, __c134, 31) }),
        /*@__PURE__*/ S.Struct({ snowflakeProperties: __S(4321, __c135, 1) }),
        /*@__PURE__*/ S.Struct({ amazonQProperties: __S(4304, __c134, 16) }),
        /*@__PURE__*/ S.Struct({ mlflowProperties: __S(4305, __c134, 17) }),
        /*@__PURE__*/ S.Struct({ workflowsMwaaProperties: __S(4306, __c134, 18) }),
        /*@__PURE__*/ S.Struct({ workflowsServerlessProperties: __S(8288, __c259, 0) }),
        /*@__PURE__*/ S.Struct({ lakehouseProperties: __S(4307, __c134, 19) }),
        /*@__PURE__*/ S.Struct({ vpcProperties: __S(4322, __c135, 2) }),
        /*@__PURE__*/ S.Struct({ gitProperties: __S(4323, __c135, 3) }),
      ]);
  }
}
function __c136(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          name: SensitiveString,
          owningProjectIdentifier: S.String,
          description: S.optional(SensitiveString),
          glossaryTerms: S.optional(__S(7456, __c233, 0)),
          formsInput: S.optional(__S(1697, __c53, 1)),
          items: S.optional(__S(4385, __c137, 1)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/domains/{domainIdentifier}/data-products" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDataProductInput" });
  }
}
function __c137(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          itemType: S.String,
          identifier: S.String,
          revision: S.optional(S.String),
          glossaryTerms: S.optional(__S(7456, __c233, 0)),
        }),
      ).annotate({ identifier: "DataProductItem" });
    case 1:
      return S.Array(__S(4384, __c137, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          id: S.String,
          revision: S.String,
          owningProjectId: S.String,
          name: SensitiveString,
          status: S.String,
          description: S.optional(SensitiveString),
          glossaryTerms: S.optional(__S(7456, __c233, 0)),
          items: S.optional(__S(4385, __c137, 1)),
          formsOutput: S.optional(__S(7489, __c234, 1)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          firstRevisionCreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          firstRevisionCreatedBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateDataProductOutput" });
  }
}
function __c138(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          name: SensitiveString,
          description: S.optional(SensitiveString),
          glossaryTerms: S.optional(__S(7456, __c233, 0)),
          items: S.optional(__S(4385, __c137, 1)),
          formsInput: S.optional(__S(1697, __c53, 1)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/v2/domains/{domainIdentifier}/data-products/{identifier}/revisions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDataProductRevisionInput" });
  }
}
function __c139(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: SensitiveString,
          description: S.optional(SensitiveString),
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          projectIdentifier: S.String,
          environmentIdentifier: S.optional(S.String),
          connectionIdentifier: S.optional(S.String),
          type: S.String,
          configuration: S.optional(__S(4483, __c140, 3)),
          recommendation: S.optional(__S(4608, __c144, 0)),
          enableSetting: S.optional(S.String),
          schedule: S.optional(__S(4512, __c141, 0)),
          publishOnImport: S.optional(S.Boolean),
          assetFormsInput: S.optional(__S(1697, __c53, 1)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/domains/{domainIdentifier}/data-sources" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDataSourceInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          status: S.optional(S.String),
          type: S.optional(S.String),
          name: SensitiveString,
          description: S.optional(SensitiveString),
          domainId: S.String,
          projectId: S.String,
          environmentId: S.optional(S.String),
          connectionId: S.optional(S.String),
          configuration: S.optional(__S(4555, __c142, 11)),
          recommendation: S.optional(__S(4608, __c144, 0)),
          enableSetting: S.optional(S.String),
          publishOnImport: S.optional(S.Boolean),
          assetFormsOutput: S.optional(__S(7489, __c234, 1)),
          schedule: S.optional(__S(4512, __c141, 0)),
          lastRunStatus: S.optional(S.String),
          lastRunAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastRunErrorMessage: S.optional(__S(4576, __c143, 0)),
          errorMessage: S.optional(__S(4576, __c143, 0)),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "CreateDataSourceOutput" });
  }
}
function __c140(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          dataAccessRole: S.optional(S.String),
          relationalFilterConfigurations: __S(4547, __c142, 3),
          autoImportDataQualityResult: S.optional(S.Boolean),
          catalogName: S.optional(S.String),
        }),
      ).annotate({ identifier: "GlueRunConfigurationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          dataAccessRole: S.optional(S.String),
          relationalFilterConfigurations: __S(4547, __c142, 3),
          redshiftCredentialConfiguration: S.optional(__S(4548, __c142, 4)),
          redshiftStorage: S.optional(__S(4550, __c142, 6)),
        }),
      ).annotate({ identifier: "RedshiftRunConfigurationInput" });
    case 2:
      return S.suspend(() => S.Struct({ trackingAssets: __S(4551, __c142, 7) })).annotate({
        identifier: "SageMakerRunConfigurationInput",
      });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ glueRunConfiguration: __S(4480, __c140, 0) }),
        /*@__PURE__*/ S.Struct({ redshiftRunConfiguration: __S(4481, __c140, 1) }),
        /*@__PURE__*/ S.Struct({ sageMakerRunConfiguration: __S(4482, __c140, 2) }),
      ]);
  }
}
function __c141(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ timezone: S.optional(S.String), schedule: S.optional(S.String) }),
      ).annotate({ identifier: "ScheduleConfiguration" });
  }
}
function __c142(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ type: S.String, expression: S.String })).annotate({
        identifier: "FilterExpression",
      });
    case 1:
      return S.Array(__S(4544, __c142, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          databaseName: S.String,
          schemaName: S.optional(S.String),
          filterExpressions: S.optional(__S(4545, __c142, 1)),
        }),
      ).annotate({ identifier: "RelationalFilterConfiguration" });
    case 3:
      return S.Array(__S(4546, __c142, 2));
    case 4:
      return S.suspend(() => S.Struct({ secretManagerArn: S.String })).annotate({
        identifier: "RedshiftCredentialConfiguration",
      });
    case 5:
      return S.suspend(() => S.Struct({ workgroupName: S.String })).annotate({
        identifier: "RedshiftServerlessStorage",
      });
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({ redshiftClusterSource: __S(4224, __c132, 0) }),
        /*@__PURE__*/ S.Struct({ redshiftServerlessSource: __S(4549, __c142, 5) }),
      ]);
    case 7:
      return S.Record(S.String, /*@__PURE__*/ __S(7456, __c233, 0).pipe(S.optional));
    case 8:
      return S.suspend(() =>
        S.Struct({
          accountId: S.optional(S.String),
          region: S.optional(S.String),
          dataAccessRole: S.optional(S.String),
          relationalFilterConfigurations: __S(4547, __c142, 3),
          autoImportDataQualityResult: S.optional(S.Boolean),
          catalogName: S.optional(S.String),
        }),
      ).annotate({ identifier: "GlueRunConfigurationOutput" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          accountId: S.optional(S.String),
          region: S.optional(S.String),
          dataAccessRole: S.optional(S.String),
          relationalFilterConfigurations: __S(4547, __c142, 3),
          redshiftCredentialConfiguration: S.optional(__S(4548, __c142, 4)),
          redshiftStorage: __S(4550, __c142, 6),
        }),
      ).annotate({ identifier: "RedshiftRunConfigurationOutput" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          accountId: S.optional(S.String),
          region: S.optional(S.String),
          trackingAssets: __S(4551, __c142, 7),
        }),
      ).annotate({ identifier: "SageMakerRunConfigurationOutput" });
    case 11:
      return S.Union([
        /*@__PURE__*/ S.Struct({ glueRunConfiguration: __S(4552, __c142, 8) }),
        /*@__PURE__*/ S.Struct({ redshiftRunConfiguration: __S(4553, __c142, 9) }),
        /*@__PURE__*/ S.Struct({ sageMakerRunConfiguration: __S(4554, __c142, 10) }),
      ]);
  }
}
function __c143(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ errorType: S.String, errorDetail: S.optional(S.String) }),
      ).annotate({ identifier: "DataSourceErrorMessage" });
  }
}
function __c144(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ enableBusinessNameGeneration: S.optional(S.Boolean) }),
      ).annotate({ identifier: "RecommendationConfiguration" });
  }
}
function __c145(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          singleSignOn: S.optional(__S(4672, __c146, 0)),
          domainExecutionRole: S.optional(S.String),
          kmsKeyIdentifier: S.optional(S.String),
          tags: S.optional(__S(4256, __c133, 0)),
          domainVersion: S.optional(S.String),
          serviceRole: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v2/domains" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateDomainInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          rootDomainUnitId: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          singleSignOn: S.optional(__S(4672, __c146, 0)),
          domainExecutionRole: S.optional(S.String),
          arn: S.optional(S.String),
          kmsKeyIdentifier: S.optional(S.String),
          status: S.optional(S.String),
          portalUrl: S.optional(S.String),
          tags: S.optional(__S(4256, __c133, 0)),
          domainVersion: S.optional(S.String),
          serviceRole: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateDomainOutput" });
  }
}
function __c146(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          userAssignment: S.optional(S.String),
          idcInstanceArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "SingleSignOn" });
  }
}
function __c147(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          name: SensitiveString,
          parentDomainUnitIdentifier: S.String,
          description: S.optional(SensitiveString),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/domains/{domainIdentifier}/domain-units" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDomainUnitInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          domainId: S.String,
          name: SensitiveString,
          parentDomainUnitId: S.optional(S.String),
          description: S.optional(SensitiveString),
          owners: __S(4739, __c148, 3),
          ancestorDomainUnitIds: __S(7456, __c233, 0),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateDomainUnitOutput" });
  }
}
function __c148(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ userId: S.optional(S.String) })).annotate({
        identifier: "DomainUnitUserProperties",
      });
    case 1:
      return S.suspend(() => S.Struct({ groupId: S.optional(S.String) })).annotate({
        identifier: "DomainUnitGroupProperties",
      });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ user: __S(4736, __c148, 0) }),
        /*@__PURE__*/ S.Struct({ group: __S(4737, __c148, 1) }),
      ]);
    case 3:
      return S.Array(__S(4738, __c148, 2));
  }
}
function __c149(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          projectIdentifier: S.String,
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          description: S.optional(S.String),
          name: S.String,
          environmentProfileIdentifier: S.optional(S.String),
          userParameters: S.optional(__S(4897, __c153, 1)),
          glossaryTerms: S.optional(__S(7456, __c233, 0)),
          environmentAccountIdentifier: S.optional(S.String),
          environmentAccountRegion: S.optional(S.String),
          environmentBlueprintIdentifier: S.optional(S.String),
          deploymentOrder: S.optional(S.Number),
          environmentConfigurationId: S.optional(S.String),
          environmentConfigurationName: S.optional(SensitiveString),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/domains/{domainIdentifier}/environments" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateEnvironmentInput" });
  }
}
function __c150(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          keyName: S.String,
          description: S.optional(SensitiveString),
          fieldType: S.String,
          defaultValue: S.optional(S.String),
          isEditable: S.optional(S.Boolean),
          isOptional: S.optional(S.Boolean),
          isUpdateSupported: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "CustomParameter" });
    case 1:
      return S.Array(__S(4800, __c150, 0));
  }
}
function __c151(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ templateUrl: S.String })).annotate({
        identifier: "CloudFormationProperties",
      });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ cloudFormation: __S(4832, __c151, 0) }),
        /*@__PURE__*/ S.Struct({ manual: /*@__PURE__*/ S.Struct({}) }),
      ]);
  }
}
function __c152(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          startTimeoutMinutes: S.optional(S.Number),
          endTimeoutMinutes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DeploymentProperties" });
  }
}
function __c153(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), value: S.optional(S.String) }),
      ).annotate({ identifier: "EnvironmentParameter" });
    case 1:
      return S.Array(__S(4896, __c153, 0));
  }
}
function __c154(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ code: S.optional(S.String), message: S.String })).annotate({
        identifier: "EnvironmentError",
      });
  }
}
function __c155(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          provider: S.optional(S.String),
          name: S.optional(S.String),
          value: S.String,
          type: S.String,
        }),
      ).annotate({ identifier: "Resource" });
    case 1:
      return S.Array(__S(4960, __c155, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ key: S.optional(S.String), value: S.optional(S.String) }),
      ).annotate({ identifier: "ConfigurableActionParameter" });
    case 3:
      return S.Array(__S(4962, __c155, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ type: S.String, auth: S.optional(S.String), parameters: __S(4963, __c155, 3) }),
      ).annotate({ identifier: "ConfigurableEnvironmentAction" });
    case 5:
      return S.Array(__S(4964, __c155, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          deploymentId: S.optional(S.String),
          deploymentType: S.optional(S.String),
          deploymentStatus: S.optional(S.String),
          failureReason: S.optional(__S(4928, __c154, 0)),
          messages: S.optional(__S(7456, __c233, 0)),
          isDeploymentComplete: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "Deployment" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          projectId: S.String,
          id: S.optional(S.String),
          domainId: S.String,
          createdBy: S.String,
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          name: SensitiveString,
          description: S.optional(SensitiveString),
          environmentProfileId: S.optional(S.String),
          awsAccountId: S.optional(S.String),
          awsAccountRegion: S.optional(S.String),
          provider: S.String,
          provisionedResources: S.optional(__S(4961, __c155, 1)),
          status: S.optional(S.String),
          environmentActions: S.optional(__S(4965, __c155, 5)),
          glossaryTerms: S.optional(__S(7456, __c233, 0)),
          userParameters: S.optional(__S(4801, __c150, 1)),
          lastDeployment: S.optional(__S(4966, __c155, 6)),
          provisioningProperties: S.optional(__S(4833, __c151, 1)),
          deploymentProperties: S.optional(__S(4864, __c152, 0)),
          environmentBlueprintId: S.optional(S.String),
          environmentConfigurationId: S.optional(SensitiveString),
          environmentConfigurationName: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "CreateEnvironmentOutput" });
  }
}
function __c156(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          environmentIdentifier: S.String.pipe(T.HttpLabel("environmentIdentifier")),
          name: S.String,
          parameters: __S(5025, __c157, 1),
          description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/actions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateEnvironmentActionInput" });
  }
}
function __c157(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ uri: S.optional(S.String) })).annotate({
        identifier: "AwsConsoleLinkParameters",
      });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ awsConsoleLink: __S(5024, __c157, 0) })]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          environmentId: S.String,
          id: S.String,
          name: S.String,
          parameters: __S(5025, __c157, 1),
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateEnvironmentActionOutput" });
  }
}
function __c158(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          name: S.String,
          description: S.optional(SensitiveString),
          provisioningProperties: __S(4833, __c151, 1),
          userParameters: S.optional(__S(4801, __c150, 1)),
          blueprintCategory: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/v2/domains/{domainIdentifier}/environment-blueprints",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateEnvironmentBlueprintInput" });
  }
}
function __c159(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          name: S.String,
          description: S.optional(SensitiveString),
          provider: S.String,
          provisioningProperties: __S(4833, __c151, 1),
          deploymentProperties: S.optional(__S(4864, __c152, 0)),
          userParameters: S.optional(__S(4801, __c150, 1)),
          glossaryTerms: S.optional(__S(7456, __c233, 0)),
          blueprintCategory: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "CreateEnvironmentBlueprintOutput" });
  }
}
function __c160(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          name: SensitiveString,
          description: S.optional(SensitiveString),
          environmentBlueprintIdentifier: S.String,
          projectIdentifier: S.String,
          userParameters: S.optional(__S(4897, __c153, 1)),
          awsAccountId: S.optional(S.String),
          awsAccountRegion: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/domains/{domainIdentifier}/environment-profiles" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateEnvironmentProfileInput" });
  }
}
function __c161(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          domainId: S.String,
          awsAccountId: S.optional(S.String),
          awsAccountRegion: S.optional(S.String),
          createdBy: S.String,
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          name: SensitiveString,
          description: S.optional(SensitiveString),
          environmentBlueprintId: S.String,
          projectId: S.optional(S.String),
          userParameters: S.optional(__S(4801, __c150, 1)),
        }),
      ).annotate({ identifier: "CreateEnvironmentProfileOutput" });
  }
}
function __c162(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          name: SensitiveString,
          model: __S(5216, __c163, 0),
          owningProjectIdentifier: S.String,
          status: S.optional(S.String),
          description: S.optional(SensitiveString),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/domains/{domainIdentifier}/form-types" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateFormTypeInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          name: SensitiveString,
          revision: S.String,
          description: S.optional(SensitiveString),
          owningProjectId: S.optional(S.String),
          originDomainId: S.optional(S.String),
          originProjectId: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateFormTypeOutput" });
  }
}
function __c163(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ smithy: S.String })]);
  }
}
function __c164(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          name: SensitiveString,
          owningProjectIdentifier: S.String,
          description: S.optional(SensitiveString),
          status: S.optional(S.String),
          usageRestrictions: S.optional(__S(7520, __c235, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/domains/{domainIdentifier}/glossaries" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateGlossaryInput" });
  }
}
function __c165(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          id: S.String,
          name: SensitiveString,
          owningProjectId: S.String,
          description: S.optional(SensitiveString),
          status: S.optional(S.String),
          usageRestrictions: S.optional(__S(7520, __c235, 0)),
        }),
      ).annotate({ identifier: "CreateGlossaryOutput" });
  }
}
function __c166(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          glossaryIdentifier: S.String,
          name: SensitiveString,
          status: S.optional(S.String),
          shortDescription: S.optional(SensitiveString),
          longDescription: S.optional(SensitiveString),
          termRelations: S.optional(__S(5376, __c168, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/domains/{domainIdentifier}/glossary-terms" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateGlossaryTermInput" });
  }
}
function __c167(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          domainId: S.String,
          glossaryId: S.String,
          name: SensitiveString,
          status: S.String,
          shortDescription: S.optional(SensitiveString),
          longDescription: S.optional(SensitiveString),
          termRelations: S.optional(__S(5376, __c168, 0)),
          usageRestrictions: S.optional(__S(7520, __c235, 0)),
        }),
      ).annotate({ identifier: "CreateGlossaryTermOutput" });
  }
}
function __c168(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          isA: S.optional(__S(7456, __c233, 0)),
          classifies: S.optional(__S(7456, __c233, 0)),
        }),
      ).annotate({ identifier: "TermRelations" });
  }
}
function __c169(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          groupIdentifier: S.optional(S.String),
          rolePrincipalArn: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/domains/{domainIdentifier}/group-profiles" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateGroupProfileInput" });
  }
}
function __c170(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.optional(S.String),
          id: S.optional(S.String),
          status: S.optional(S.String),
          groupName: S.optional(SensitiveString),
          rolePrincipalArn: S.optional(S.String),
          rolePrincipalId: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateGroupProfileOutput" });
  }
}
function __c171(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          entityIdentifier: S.String,
          entityType: S.String,
          entityRevision: S.optional(S.String),
          action: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/domains/{domainIdentifier}/listings/change-set" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateListingChangeSetInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ listingId: S.String, listingRevision: S.String, status: S.String }),
      ).annotate({ identifier: "CreateListingChangeSetOutput" });
  }
}
function __c172(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          owningProjectIdentifier: S.String,
          name: SensitiveString,
          description: S.optional(SensitiveString),
          type: S.optional(S.String),
          metadata: S.optional(__S(5536, __c173, 0)),
          parameters: S.optional(__S(4256, __c133, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/domains/{domainIdentifier}/notebooks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateNotebookInput" });
  }
}
function __c173(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ SensitiveString.pipe(S.optional));
    case 1:
      return S.Array(__S(8288, __c259, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ packageManager: S.String, packageSpecification: S.optional(S.String) }),
      ).annotate({ identifier: "PackageConfig" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          imageVersion: S.optional(S.String),
          packageConfig: S.optional(__S(5538, __c173, 2)),
        }),
      ).annotate({ identifier: "EnvironmentConfig" });
  }
}
function __c174(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          connectionId: S.String,
          repository: SensitiveString,
          branch: SensitiveString,
          commitHash: S.String,
          fileName: S.optional(S.String),
          committedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          commitMessage: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "GitMetadata" });
  }
}
function __c175(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          name: SensitiveString,
          owningProjectId: S.String,
          domainId: S.String,
          cellOrder: __S(5537, __c173, 1),
          status: S.String,
          type: S.optional(S.String),
          description: S.optional(SensitiveString),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedBy: S.optional(S.String),
          lockedBy: S.optional(S.String),
          lockedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lockExpiresAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          computeId: S.optional(S.String),
          metadata: S.optional(__S(5536, __c173, 0)),
          parameters: S.optional(__S(4256, __c133, 0)),
          environmentConfiguration: S.optional(__S(5539, __c173, 3)),
          error: S.optional(__S(5632, __c176, 0)),
          gitMetadata: S.optional(__S(5568, __c174, 0)),
        }),
      ).annotate({ identifier: "CreateNotebookOutput" });
  }
}
function __c176(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ message: S.String })).annotate({
        identifier: "NotebookError",
      });
  }
}
function __c177(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ member: __S(5760, __c180, 0), designation: S.String }),
      ).annotate({ identifier: "ProjectMembershipAssignment" });
    case 1:
      return S.Array(__S(5664, __c177, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          name: SensitiveString,
          description: S.optional(SensitiveString),
          resourceTags: S.optional(__S(4256, __c133, 0)),
          glossaryTerms: S.optional(__S(7456, __c233, 0)),
          domainUnitId: S.optional(S.String),
          projectProfileId: S.optional(S.String),
          userParameters: S.optional(__S(5730, __c179, 2)),
          projectCategory: S.optional(S.String),
          projectExecutionRole: S.optional(S.String),
          membershipAssignments: S.optional(__S(5665, __c177, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/domains/{domainIdentifier}/projects" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateProjectInput" });
  }
}
function __c178(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ code: S.optional(S.String), message: S.optional(S.String) }),
      ).annotate({ identifier: "ProjectDeletionError" });
    case 1:
      return S.Array(__S(5696, __c178, 0));
  }
}
function __c179(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          awsAccountId: S.String,
          regionName: S.String,
          sourceAccountPoolId: S.optional(S.String),
        }),
      ).annotate({ identifier: "EnvironmentResolvedAccount" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.optional(S.String),
          environmentResolvedAccount: S.optional(__S(5728, __c179, 0)),
          environmentConfigurationName: S.optional(SensitiveString),
          environmentParameters: S.optional(__S(4897, __c153, 1)),
        }),
      ).annotate({ identifier: "EnvironmentConfigurationUserParameter" });
    case 2:
      return S.Array(__S(5729, __c179, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ key: S.String, value: S.String, source: S.String }),
      ).annotate({ identifier: "ResourceTag" });
    case 4:
      return S.Array(__S(5731, __c179, 3));
    case 5:
      return S.Array(__S(4928, __c154, 0));
    case 6:
      return S.Record(S.String, /*@__PURE__*/ __S(5733, __c179, 5).pipe(S.optional));
    case 7:
      return S.suspend(() =>
        S.Struct({
          overallDeploymentStatus: S.optional(S.String),
          environmentFailureReasons: S.optional(__S(5734, __c179, 6)),
        }),
      ).annotate({ identifier: "EnvironmentDeploymentDetails" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          id: S.String,
          name: SensitiveString,
          description: S.optional(SensitiveString),
          projectStatus: S.optional(S.String),
          failureReasons: S.optional(__S(5697, __c178, 1)),
          createdBy: S.String,
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          resourceTags: S.optional(__S(5732, __c179, 4)),
          glossaryTerms: S.optional(__S(7456, __c233, 0)),
          domainUnitId: S.optional(S.String),
          projectProfileId: S.optional(S.String),
          userParameters: S.optional(__S(5730, __c179, 2)),
          environmentDeploymentDetails: S.optional(__S(5735, __c179, 7)),
          projectCategory: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateProjectOutput" });
  }
}
function __c180(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ userIdentifier: S.String }),
        /*@__PURE__*/ S.Struct({ groupIdentifier: S.String }),
      ]);
  }
}
function __c181(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          projectIdentifier: S.String.pipe(T.HttpLabel("projectIdentifier")),
          member: __S(5760, __c180, 0),
          designation: S.String,
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/v2/domains/{domainIdentifier}/projects/{projectIdentifier}/createMembership",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateProjectMembershipInput" });
  }
}
function __c182(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          name: SensitiveString,
          description: S.optional(SensitiveString),
          status: S.optional(S.String),
          projectResourceTags: S.optional(__S(5857, __c183, 1)),
          allowCustomProjectResourceTags: S.optional(S.Boolean),
          projectResourceTagsDescription: S.optional(SensitiveString),
          environmentConfigurations: S.optional(__S(5863, __c183, 7)),
          domainUnitIdentifier: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/domains/{domainIdentifier}/project-profiles" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateProjectProfileInput" });
  }
}
function __c183(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ key: S.String, value: S.String, isValueEditable: S.Boolean }),
      ).annotate({ identifier: "ResourceTagParameter" });
    case 1:
      return S.Array(__S(5856, __c183, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          value: S.optional(S.String),
          isEditable: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "EnvironmentConfigurationParameter" });
    case 3:
      return S.Array(__S(5858, __c183, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          ssmPath: S.optional(S.String),
          parameterOverrides: S.optional(__S(5859, __c183, 3)),
          resolvedParameters: S.optional(__S(5859, __c183, 3)),
        }),
      ).annotate({ identifier: "EnvironmentConfigurationParametersDetails" });
    case 5:
      return S.Union([
        /*@__PURE__*/ S.Struct({ awsAccountId: S.String }),
        /*@__PURE__*/ S.Struct({ awsAccountIdPath: S.String }),
      ]);
    case 6:
      return S.suspend(() =>
        S.Struct({
          name: SensitiveString,
          id: S.optional(SensitiveString),
          environmentBlueprintId: S.String,
          description: S.optional(SensitiveString),
          deploymentMode: S.optional(S.String),
          configurationParameters: S.optional(__S(5860, __c183, 4)),
          awsAccount: S.optional(__S(5861, __c183, 5)),
          accountPools: S.optional(__S(7456, __c233, 0)),
          awsRegion: S.optional(Region),
          deploymentOrder: S.optional(S.Number),
        }),
      ).annotate({ identifier: "EnvironmentConfiguration" });
    case 7:
      return S.Array(__S(5862, __c183, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          id: S.String,
          name: SensitiveString,
          description: S.optional(SensitiveString),
          status: S.optional(S.String),
          projectResourceTags: S.optional(__S(5857, __c183, 1)),
          allowCustomProjectResourceTags: S.optional(S.Boolean),
          projectResourceTagsDescription: S.optional(SensitiveString),
          environmentConfigurations: S.optional(__S(5863, __c183, 7)),
          createdBy: S.String,
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          domainUnitId: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateProjectProfileOutput" });
  }
}
function __c184(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          name: SensitiveString,
          target: __S(5921, __c185, 1),
          action: S.String,
          scope: __S(5924, __c185, 4),
          detail: __S(5956, __c186, 4),
          description: S.optional(SensitiveString),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/domains/{domainIdentifier}/rules" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateRuleInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          identifier: S.String,
          name: SensitiveString,
          ruleType: S.String,
          target: __S(5921, __c185, 1),
          action: S.String,
          scope: __S(5924, __c185, 4),
          detail: __S(5956, __c186, 4),
          targetType: S.optional(S.String),
          description: S.optional(SensitiveString),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          createdBy: S.String,
        }),
      ).annotate({ identifier: "CreateRuleOutput" });
  }
}
function __c185(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ domainUnitId: S.String, includeChildDomainUnits: S.optional(S.Boolean) }),
      ).annotate({ identifier: "DomainUnitTarget" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ domainUnitTarget: __S(5920, __c185, 0) })]);
    case 2:
      return S.suspend(() =>
        S.Struct({ selectionMode: S.String, specificAssetTypes: S.optional(__S(7456, __c233, 0)) }),
      ).annotate({ identifier: "AssetTypesForRule" });
    case 3:
      return S.suspend(() =>
        S.Struct({ selectionMode: S.String, specificProjects: S.optional(__S(7456, __c233, 0)) }),
      ).annotate({ identifier: "ProjectsForRule" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          assetType: S.optional(__S(5922, __c185, 2)),
          dataProduct: S.optional(S.Boolean),
          project: S.optional(__S(5923, __c185, 3)),
        }),
      ).annotate({ identifier: "RuleScope" });
  }
}
function __c186(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ typeIdentifier: S.String, typeRevision: S.String }),
      ).annotate({ identifier: "MetadataFormReference" });
    case 1:
      return S.Array(__S(5952, __c186, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ requiredMetadataForms: S.optional(__S(5953, __c186, 1)) }),
      ).annotate({ identifier: "MetadataFormEnforcementDetail" });
    case 3:
      return S.suspend(() =>
        S.Struct({ requiredGlossaryTermIds: S.optional(__S(7456, __c233, 0)) }),
      ).annotate({ identifier: "GlossaryTermEnforcementDetail" });
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ metadataFormEnforcementDetail: __S(5954, __c186, 2) }),
        /*@__PURE__*/ S.Struct({ glossaryTermEnforcementDetail: __S(5955, __c186, 3) }),
      ]);
  }
}
function __c187(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ identifier: S.String, revision: S.String })).annotate({
        identifier: "ListingRevisionInput",
      });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ listing: __S(5984, __c187, 0) })]);
    case 2:
      return S.suspend(() => S.Struct({ assetId: S.String, targetName: S.String })).annotate({
        identifier: "AssetTargetNameMap",
      });
    case 3:
      return S.Array(__S(5986, __c187, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          environmentIdentifier: S.String,
          subscriptionTargetIdentifier: S.optional(S.String),
          grantedEntity: __S(5985, __c187, 1),
          assetTargetNames: S.optional(__S(5987, __c187, 3)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/domains/{domainIdentifier}/subscription-grants" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateSubscriptionGrantInput" });
  }
}
function __c188(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ id: S.String, revision: S.String })).annotate({
        identifier: "ListingRevision",
      });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ listing: __S(6016, __c188, 0) })]);
    case 2:
      return S.suspend(() => S.Struct({ message: S.optional(S.String) })).annotate({
        identifier: "FailureCause",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          assetId: S.String,
          assetRevision: S.String,
          status: S.String,
          targetName: S.optional(S.String),
          failureCause: S.optional(__S(6018, __c188, 2)),
          grantedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          failureTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          assetScope: S.optional(__S(7553, __c236, 1)),
          permissions: S.optional(__S(7552, __c236, 0)),
        }),
      ).annotate({ identifier: "SubscribedAsset" });
    case 4:
      return S.Array(__S(6019, __c188, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          createdBy: S.String,
          updatedBy: S.optional(S.String),
          domainId: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          environmentId: S.optional(S.String),
          subscriptionTargetId: S.String,
          grantedEntity: __S(6017, __c188, 1),
          status: S.String,
          assets: S.optional(__S(6020, __c188, 4)),
          subscriptionId: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateSubscriptionGrantOutput" });
  }
}
function __c189(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ identifier: S.optional(S.String) })).annotate({
        identifier: "SubscribedProjectInput",
      });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ project: __S(6048, __c189, 0) }),
        /*@__PURE__*/ S.Struct({ user: __S(6048, __c189, 0) }),
        /*@__PURE__*/ S.Struct({ group: __S(6048, __c189, 0) }),
        /*@__PURE__*/ S.Struct({ iam: __S(6048, __c189, 0) }),
      ]);
    case 2:
      return S.Array(__S(6049, __c189, 1));
    case 3:
      return S.suspend(() => S.Struct({ identifier: S.String })).annotate({
        identifier: "SubscribedListingInput",
      });
    case 4:
      return S.Array(__S(6051, __c189, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          subscribedPrincipals: __S(6050, __c189, 2),
          subscribedListings: __S(6052, __c189, 4),
          requestReason: SensitiveString,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          metadataForms: S.optional(__S(1697, __c53, 1)),
          assetPermissions: S.optional(__S(7683, __c240, 3)),
          assetScopes: S.optional(__S(7681, __c240, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/domains/{domainIdentifier}/subscription-requests" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateSubscriptionRequestInput" });
  }
}
function __c190(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          environmentIdentifier: S.String.pipe(T.HttpLabel("environmentIdentifier")),
          name: SensitiveString,
          type: S.String,
          subscriptionTargetConfig: __S(6113, __c191, 1),
          authorizedPrincipals: __S(7456, __c233, 0),
          manageAccessRole: S.String,
          applicableAssetTypes: __S(7456, __c233, 0),
          provider: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          subscriptionGrantCreationMode: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/subscription-targets",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateSubscriptionTargetInput" });
  }
}
function __c191(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ formName: S.String, content: S.String })).annotate({
        identifier: "SubscriptionTargetForm",
      });
    case 1:
      return S.Array(__S(6112, __c191, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          authorizedPrincipals: __S(7456, __c233, 0),
          domainId: S.String,
          projectId: S.String,
          environmentId: S.String,
          name: SensitiveString,
          type: S.String,
          createdBy: S.String,
          updatedBy: S.optional(S.String),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          manageAccessRole: S.optional(S.String),
          applicableAssetTypes: __S(7456, __c233, 0),
          subscriptionTargetConfig: __S(6113, __c191, 1),
          provider: S.String,
          subscriptionGrantCreationMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateSubscriptionTargetOutput" });
  }
}
function __c192(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          userIdentifier: S.String,
          userType: S.optional(S.String),
          sessionName: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/domains/{domainIdentifier}/user-profiles" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateUserProfileInput" });
  }
}
function __c193(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.optional(S.String),
          id: S.optional(S.String),
          type: S.optional(S.String),
          status: S.optional(S.String),
          details: S.optional(__S(7650, __c239, 2)),
        }),
      ).annotate({ identifier: "CreateUserProfileOutput" });
  }
}
function __c194(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/domains/{domainIdentifier}/account-pools/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAccountPoolInput" });
  }
}
function __c195(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v2/domains/{domainIdentifier}/assets/{identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAssetInput" });
  }
}
function __c196(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          assetIdentifier: S.String.pipe(T.HttpLabel("assetIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/domains/{domainIdentifier}/assets/{assetIdentifier}/filters/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAssetFilterInput" });
  }
}
function __c197(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/domains/{domainIdentifier}/asset-types/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAssetTypeInput" });
  }
}
function __c198(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/domains/{domainIdentifier}/connections/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteConnectionInput" });
    case 1:
      return S.suspend(() => S.Struct({ status: S.optional(S.String) })).annotate({
        identifier: "DeleteConnectionOutput",
      });
  }
}
function __c199(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")) }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/domains/{domainIdentifier}/data-export-configuration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDataExportConfigurationInput" });
  }
}
function __c200(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/domains/{domainIdentifier}/data-products/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDataProductInput" });
  }
}
function __c201(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
          retainPermissionsOnRevokeFailure: S.optional(S.Boolean).pipe(
            T.HttpQuery("retainPermissionsOnRevokeFailure"),
          ),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/domains/{domainIdentifier}/data-sources/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDataSourceInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          status: S.optional(S.String),
          type: S.optional(S.String),
          name: SensitiveString,
          description: S.optional(SensitiveString),
          domainId: S.String,
          projectId: S.String,
          environmentId: S.optional(S.String),
          connectionId: S.optional(S.String),
          configuration: S.optional(__S(4555, __c142, 11)),
          enableSetting: S.optional(S.String),
          publishOnImport: S.optional(S.Boolean),
          assetFormsOutput: S.optional(__S(7489, __c234, 1)),
          schedule: S.optional(__S(4512, __c141, 0)),
          lastRunStatus: S.optional(S.String),
          lastRunAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastRunErrorMessage: S.optional(__S(4576, __c143, 0)),
          errorMessage: S.optional(__S(4576, __c143, 0)),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          selfGrantStatus: S.optional(__S(6467, __c202, 3)),
          retainPermissionsOnRevokeFailure: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DeleteDataSourceOutput" });
  }
}
function __c202(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          databaseName: S.String,
          schemaName: S.optional(S.String),
          status: S.String,
          failureCause: S.optional(S.String),
        }),
      ).annotate({ identifier: "SelfGrantStatusDetail" });
    case 1:
      return S.Array(__S(6464, __c202, 0));
    case 2:
      return S.suspend(() => S.Struct({ selfGrantStatusDetails: __S(6465, __c202, 1) })).annotate({
        identifier: "GlueSelfGrantStatusOutput",
      });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ glueSelfGrantStatus: __S(6466, __c202, 2) }),
        /*@__PURE__*/ S.Struct({ redshiftSelfGrantStatus: __S(6466, __c202, 2) }),
      ]);
  }
}
function __c203(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
          skipDeletionCheck: S.optional(S.Boolean).pipe(T.HttpQuery("skipDeletionCheck")),
          cascadeDelete: S.optional(S.Boolean).pipe(T.HttpQuery("cascadeDelete")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v2/domains/{identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDomainInput" });
    case 1:
      return S.suspend(() => S.Struct({ status: S.String })).annotate({
        identifier: "DeleteDomainOutput",
      });
  }
}
function __c204(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/domains/{domainIdentifier}/domain-units/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDomainUnitInput" });
  }
}
function __c205(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/domains/{domainIdentifier}/environments/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteEnvironmentInput" });
  }
}
function __c206(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          environmentIdentifier: S.String.pipe(T.HttpLabel("environmentIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/actions/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteEnvironmentActionInput" });
  }
}
function __c207(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/domains/{domainIdentifier}/environment-blueprints/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteEnvironmentBlueprintInput" });
  }
}
function __c208(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          environmentBlueprintIdentifier: S.String.pipe(
            T.HttpLabel("environmentBlueprintIdentifier"),
          ),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/domains/{domainIdentifier}/environment-blueprint-configurations/{environmentBlueprintIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteEnvironmentBlueprintConfigurationInput" });
  }
}
function __c209(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/domains/{domainIdentifier}/environment-profiles/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteEnvironmentProfileInput" });
  }
}
function __c210(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          formTypeIdentifier: S.String.pipe(T.HttpLabel("formTypeIdentifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/domains/{domainIdentifier}/form-types/{formTypeIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteFormTypeInput" });
  }
}
function __c211(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/domains/{domainIdentifier}/glossaries/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteGlossaryInput" });
  }
}
function __c212(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/domains/{domainIdentifier}/glossary-terms/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteGlossaryTermInput" });
  }
}
function __c213(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/domains/{domainIdentifier}/lineage/events/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteLineageEventInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          domainId: S.optional(S.String),
          processingStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeleteLineageEventOutput" });
  }
}
function __c214(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/domains/{domainIdentifier}/listings/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteListingInput" });
  }
}
function __c215(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/domains/{domainIdentifier}/notebooks/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteNotebookInput" });
  }
}
function __c216(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          skipDeletionCheck: S.optional(S.Boolean).pipe(T.HttpQuery("skipDeletionCheck")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/domains/{domainIdentifier}/projects/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteProjectInput" });
  }
}
function __c217(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          projectIdentifier: S.String.pipe(T.HttpLabel("projectIdentifier")),
          member: __S(5760, __c180, 0),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/v2/domains/{domainIdentifier}/projects/{projectIdentifier}/deleteMembership",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteProjectMembershipInput" });
  }
}
function __c218(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/domains/{domainIdentifier}/project-profiles/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteProjectProfileInput" });
  }
}
function __c219(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          predictionTarget: S.optional(S.String),
          predictionChoice: S.optional(S.Number),
          editedValue: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "AcceptChoice" });
    case 1:
      return S.Array(__S(7008, __c219, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          revision: S.optional(S.String).pipe(T.HttpQuery("revision")),
          acceptRule: S.optional(__S(7040, __c220, 0)),
          acceptChoices: S.optional(__S(7009, __c219, 1)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v2/domains/{domainIdentifier}/assets/{identifier}/accept-predictions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AcceptPredictionsInput" });
    case 3:
      return S.suspend(() =>
        S.Struct({ domainId: S.String, assetId: S.String, revision: S.String }),
      ).annotate({ identifier: "AcceptPredictionsOutput" });
  }
}
function __c220(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ rule: S.optional(S.String), threshold: S.optional(S.Number) }),
      ).annotate({ identifier: "AcceptRule" });
  }
}
function __c221(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ regionName: S.String }),
        /*@__PURE__*/ S.Struct({ regionNamePath: S.String }),
      ]);
  }
}
function __c222(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v2/domains/{domainIdentifier}/rules/{identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRuleInput" });
  }
}
function __c223(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/domains/{domainIdentifier}/subscription-grants/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSubscriptionGrantInput" });
  }
}
function __c224(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/domains/{domainIdentifier}/subscription-requests/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSubscriptionRequestInput" });
  }
}
function __c225(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          environmentIdentifier: S.String.pipe(T.HttpLabel("environmentIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/subscription-targets/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSubscriptionTargetInput" });
  }
}
function __c226(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          entityIdentifier: S.String.pipe(T.HttpLabel("entityIdentifier")),
          entityType: S.String.pipe(T.HttpLabel("entityType")),
          formName: S.String.pipe(T.HttpQuery("formName")),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/domains/{domainIdentifier}/entities/{entityType}/{entityIdentifier}/time-series-data-points",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTimeSeriesDataPointsInput" });
  }
}
function __c227(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          environmentIdentifier: S.String.pipe(T.HttpLabel("environmentIdentifier")),
          environmentRoleArn: S.String.pipe(T.HttpLabel("environmentRoleArn")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/roles/{environmentRoleArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateEnvironmentRoleInput" });
  }
}
function __c228(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          entityIdentifier: S.String.pipe(T.HttpLabel("entityIdentifier")),
          entityType: S.String.pipe(T.HttpLabel("entityType")),
          governedGlossaryTerms: __S(7456, __c233, 0),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/v2/domains/{domainIdentifier}/entities/{entityType}/{entityIdentifier}/disassociate-governed-terms",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateGovernedTermsInput" });
  }
}
function __c229(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/account-pools/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAccountPoolInput" });
  }
}
function __c230(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          revision: S.optional(S.String).pipe(T.HttpQuery("revision")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/domains/{domainIdentifier}/assets/{identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAssetInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          name: SensitiveString,
          typeIdentifier: S.String,
          typeRevision: S.String,
          externalIdentifier: S.optional(S.String),
          revision: S.String,
          description: S.optional(SensitiveString),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          firstRevisionCreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          firstRevisionCreatedBy: S.optional(S.String),
          glossaryTerms: S.optional(__S(7456, __c233, 0)),
          governedGlossaryTerms: S.optional(__S(7456, __c233, 0)),
          owningProjectId: S.String,
          domainId: S.String,
          listing: S.optional(__S(3392, __c106, 0)),
          formsOutput: __S(7489, __c234, 1),
          readOnlyFormsOutput: S.optional(__S(7489, __c234, 1)),
          latestTimeSeriesDataPointFormsOutput: S.optional(__S(3425, __c107, 1)),
        }),
      ).annotate({ identifier: "GetAssetOutput" });
  }
}
function __c231(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          assetIdentifier: S.String.pipe(T.HttpLabel("assetIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/assets/{assetIdentifier}/filters/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAssetFilterInput" });
  }
}
function __c232(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          decisionComment: S.optional(SensitiveString),
          assetScopes: S.optional(__S(7681, __c240, 1)),
          assetPermissions: S.optional(__S(7683, __c240, 3)),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v2/domains/{domainIdentifier}/subscription-requests/{identifier}/accept",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AcceptSubscriptionRequestInput" });
  }
}
function __c233(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c234(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          formName: S.String,
          typeName: S.optional(SensitiveString),
          typeRevision: S.optional(S.String),
          content: S.optional(S.String),
        }),
      ).annotate({ identifier: "FormOutput" });
    case 1:
      return S.Array(__S(7488, __c234, 0));
  }
}
function __c235(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c236(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ s3: __S(7520, __c235, 0) })]);
    case 1:
      return S.suspend(() =>
        S.Struct({
          assetId: S.String,
          filterIds: __S(7456, __c233, 0),
          status: S.String,
          scopeName: S.optional(S.String),
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "AssetScope" });
  }
}
function __c237(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(SensitiveString),
          shortDescription: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "DetailedGlossaryTerm" });
    case 1:
      return S.Array(__S(7584, __c237, 0));
  }
}
function __c238(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.optional(S.String), name: S.optional(SensitiveString) }),
      ).annotate({ identifier: "SubscribedProject" });
    case 1:
      return S.suspend(() =>
        S.Struct({ id: S.optional(S.String), details: S.optional(__S(7650, __c239, 2)) }),
      ).annotate({ identifier: "SubscribedUser" });
    case 2:
      return S.suspend(() => S.Struct({ principalArn: S.optional(S.String) })).annotate({
        identifier: "SubscribedIamPrincipal",
      });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ project: __S(7616, __c238, 0) }),
        /*@__PURE__*/ S.Struct({ user: __S(7617, __c238, 1) }),
        /*@__PURE__*/ S.Struct({ group: __S(7616, __c238, 0) }),
        /*@__PURE__*/ S.Struct({ iam: __S(7618, __c238, 2) }),
      ]);
    case 4:
      return S.suspend(() =>
        S.Struct({
          entityId: S.optional(S.String),
          entityRevision: S.optional(S.String),
          entityType: S.optional(S.String),
          forms: S.optional(S.String),
          glossaryTerms: S.optional(__S(7585, __c237, 1)),
          assetScope: S.optional(__S(7553, __c236, 1)),
          permissions: S.optional(__S(7552, __c236, 0)),
        }),
      ).annotate({ identifier: "SubscribedAssetListing" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          entityId: S.optional(S.String),
          entityRevision: S.optional(S.String),
          entityType: S.optional(S.String),
        }),
      ).annotate({ identifier: "AssetInDataProductListingItem" });
    case 6:
      return S.Array(__S(7621, __c238, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          entityId: S.optional(S.String),
          entityRevision: S.optional(S.String),
          glossaryTerms: S.optional(__S(7585, __c237, 1)),
          name: S.optional(S.String),
          description: S.optional(S.String),
          assetListings: S.optional(__S(7622, __c238, 6)),
        }),
      ).annotate({ identifier: "SubscribedProductListing" });
    case 8:
      return S.Union([
        /*@__PURE__*/ S.Struct({ assetListing: __S(7620, __c238, 4) }),
        /*@__PURE__*/ S.Struct({ productListing: __S(7623, __c238, 7) }),
      ]);
    case 9:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          revision: S.optional(S.String),
          name: S.String,
          description: SensitiveString,
          item: __S(7624, __c238, 8),
          ownerProjectId: S.String,
          ownerProjectName: S.optional(S.String),
        }),
      ).annotate({ identifier: "SubscribedListing" });
  }
}
function __c239(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          principalId: S.optional(S.String),
          sessionName: S.optional(S.String),
          groupProfileId: S.optional(S.String),
        }),
      ).annotate({ identifier: "IamUserProfileDetails" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          username: S.optional(SensitiveString),
          firstName: S.optional(SensitiveString),
          lastName: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "SsoUserProfileDetails" });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ iam: __S(7648, __c239, 0) }),
        /*@__PURE__*/ S.Struct({ sso: __S(7649, __c239, 1) }),
      ]);
  }
}
function __c240(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ assetId: S.String, filterIds: __S(7456, __c233, 0) }),
      ).annotate({ identifier: "AcceptedAssetScope" });
    case 1:
      return S.Array(__S(7680, __c240, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ assetId: S.String, permissions: __S(7552, __c236, 0) }),
      ).annotate({ identifier: "AssetPermission" });
    case 3:
      return S.Array(__S(7682, __c240, 2));
  }
}
function __c241(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(7619, __c238, 3));
    case 1:
      return S.Array(__S(7625, __c238, 9));
  }
}
function __c242(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          createdBy: S.String,
          updatedBy: S.optional(S.String),
          domainId: S.String,
          status: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          requestReason: SensitiveString,
          subscribedPrincipals: __S(7712, __c241, 0),
          subscribedListings: __S(7713, __c241, 1),
          reviewerId: S.optional(S.String),
          decisionComment: S.optional(SensitiveString),
          existingSubscriptionId: S.optional(S.String),
          metadataForms: S.optional(__S(7489, __c234, 1)),
        }),
      ).annotate({ identifier: "AcceptSubscriptionRequestOutput" });
  }
}
function __c243(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          revision: S.optional(S.String).pipe(T.HttpQuery("revision")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/asset-types/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAssetTypeInput" });
  }
}
function __c244(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          name: S.String,
          revision: S.String,
          description: S.optional(SensitiveString),
          formsOutput: __S(4129, __c129, 1),
          owningProjectId: S.String,
          originDomainId: S.optional(S.String),
          originProjectId: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetAssetTypeOutput" });
  }
}
function __c245(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          withSecret: S.optional(S.Boolean).pipe(T.HttpQuery("withSecret")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/connections/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConnectionInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          connectionCredentials: S.optional(__S(7872, __c246, 0)),
          configurations: S.optional(__S(4290, __c134, 2)),
          connectionId: S.String,
          description: S.optional(SensitiveString),
          domainId: S.String,
          domainUnitId: S.String,
          environmentId: S.optional(S.String),
          environmentUserRole: S.optional(S.String),
          name: S.String,
          physicalEndpoints: __S(4311, __c134, 23),
          projectId: S.optional(S.String),
          props: S.optional(__S(4324, __c135, 4)),
          type: S.String,
          scope: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetConnectionOutput" });
  }
}
function __c246(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accessKeyId: S.optional(S.String),
          secretAccessKey: S.optional(SensitiveString),
          sessionToken: S.optional(SensitiveString),
          expiration: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "ConnectionCredentials" });
  }
}
function __c247(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")) }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/data-export-configuration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDataExportConfigurationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          isExportEnabled: S.optional(S.Boolean),
          status: S.optional(S.String),
          encryptionConfiguration: S.optional(__S(7936, __c248, 0)),
          s3TableBucketArn: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetDataExportConfigurationOutput" });
  }
}
function __c248(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ kmsKeyArn: S.optional(S.String), sseAlgorithm: S.optional(S.String) }),
      ).annotate({ identifier: "EncryptionConfiguration" });
  }
}
function __c249(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          revision: S.optional(S.String).pipe(T.HttpQuery("revision")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/data-products/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDataProductInput" });
  }
}
function __c250(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/data-sources/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDataSourceInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          status: S.optional(S.String),
          type: S.optional(S.String),
          name: SensitiveString,
          description: S.optional(SensitiveString),
          domainId: S.String,
          projectId: S.String,
          environmentId: S.optional(S.String),
          connectionId: S.optional(S.String),
          configuration: S.optional(__S(4555, __c142, 11)),
          recommendation: S.optional(__S(4608, __c144, 0)),
          enableSetting: S.optional(S.String),
          publishOnImport: S.optional(S.Boolean),
          assetFormsOutput: S.optional(__S(7489, __c234, 1)),
          schedule: S.optional(__S(4512, __c141, 0)),
          lastRunStatus: S.optional(S.String),
          lastRunAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastRunErrorMessage: S.optional(__S(4576, __c143, 0)),
          lastRunAssetCount: S.optional(S.Number),
          errorMessage: S.optional(__S(4576, __c143, 0)),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          selfGrantStatus: S.optional(__S(6467, __c202, 3)),
        }),
      ).annotate({ identifier: "GetDataSourceOutput" });
  }
}
function __c251(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/data-source-runs/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDataSourceRunInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          dataSourceId: S.String,
          id: S.String,
          projectId: S.String,
          status: S.String,
          type: S.String,
          dataSourceConfigurationSnapshot: S.optional(S.String),
          runStatisticsForAssets: S.optional(__S(8096, __c253, 0)),
          lineageSummary: S.optional(__S(8064, __c252, 0)),
          errorMessage: S.optional(__S(4576, __c143, 0)),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          startedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          stoppedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "GetDataSourceRunOutput" });
  }
}
function __c252(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ importStatus: S.optional(S.String) })).annotate({
        identifier: "DataSourceRunLineageSummary",
      });
  }
}
function __c253(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          added: S.optional(S.Number),
          updated: S.optional(S.Number),
          unchanged: S.optional(S.Number),
          skipped: S.optional(S.Number),
          failed: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RunStatisticsForAssets" });
  }
}
function __c254(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ identifier: S.String.pipe(T.HttpLabel("identifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/domains/{identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDomainInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ id: S.optional(S.String), message: S.optional(S.String) }),
      ).annotate({ identifier: "FailureReason" });
    case 2:
      return S.Array(__S(8129, __c254, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ successfullyDeletedProjectCount: S.optional(S.Number) }),
      ).annotate({ identifier: "DeleteProgress" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          rootDomainUnitId: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          singleSignOn: S.optional(__S(4672, __c146, 0)),
          domainExecutionRole: S.String,
          arn: S.optional(S.String),
          kmsKeyIdentifier: S.optional(S.String),
          status: S.String,
          portalUrl: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          tags: S.optional(__S(4256, __c133, 0)),
          domainVersion: S.optional(S.String),
          serviceRole: S.optional(S.String),
          failureReasons: S.optional(__S(8130, __c254, 2)),
          deleteProgress: S.optional(__S(8131, __c254, 3)),
        }),
      ).annotate({ identifier: "GetDomainOutput" });
  }
}
function __c255(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/domain-units/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDomainUnitInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          domainId: S.String,
          name: SensitiveString,
          parentDomainUnitId: S.optional(S.String),
          description: S.optional(SensitiveString),
          owners: __S(4739, __c148, 3),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          lastUpdatedBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetDomainUnitOutput" });
  }
}
function __c256(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/environments/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEnvironmentInput" });
  }
}
function __c257(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          environmentIdentifier: S.String.pipe(T.HttpLabel("environmentIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/actions/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEnvironmentActionInput" });
  }
}
function __c258(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          entityType: S.String.pipe(T.HttpLabel("entityType")),
          entityIdentifier: S.String.pipe(T.HttpLabel("entityIdentifier")),
          owner: __S(8322, __c260, 2),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/v2/domains/{domainIdentifier}/entities/{entityType}/{entityIdentifier}/addOwner",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AddEntityOwnerInput" });
  }
}
function __c259(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "AddEntityOwnerOutput" });
  }
}
function __c260(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ userIdentifier: S.String })).annotate({
        identifier: "OwnerUserProperties",
      });
    case 1:
      return S.suspend(() => S.Struct({ groupIdentifier: S.String })).annotate({
        identifier: "OwnerGroupProperties",
      });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ user: __S(8320, __c260, 0) }),
        /*@__PURE__*/ S.Struct({ group: __S(8321, __c260, 1) }),
      ]);
  }
}
function __c261(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/environment-blueprints/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEnvironmentBlueprintInput" });
  }
}
function __c262(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          environmentBlueprintIdentifier: S.String.pipe(
            T.HttpLabel("environmentBlueprintIdentifier"),
          ),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/environment-blueprint-configurations/{environmentBlueprintIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEnvironmentBlueprintConfigurationInput" });
  }
}
function __c263(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ __S(4256, __c133, 0).pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          identifier: S.String,
          name: S.String,
          description: S.optional(S.String),
          region: S.String,
          parameters: __S(4256, __c133, 0),
        }),
      ).annotate({ identifier: "ResourceConfiguration" });
    case 2:
      return S.Array(__S(8417, __c263, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          locationRegistrationRole: S.optional(S.String),
          locationRegistrationExcludeS3Locations: S.optional(__S(7456, __c233, 0)),
        }),
      ).annotate({ identifier: "LakeFormationConfiguration" });
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ lakeFormationConfiguration: __S(8419, __c263, 3) }),
      ]);
    case 5:
      return S.Array(__S(8420, __c263, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          environmentBlueprintId: S.String,
          provisioningRoleArn: S.optional(S.String),
          environmentRolePermissionBoundary: S.optional(S.String),
          manageAccessRoleArn: S.optional(S.String),
          enabledRegions: S.optional(__S(7456, __c233, 0)),
          regionalParameters: S.optional(__S(8416, __c263, 0)),
          allowUserProvidedConfigurations: S.optional(S.Boolean),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          resourceConfigurations: S.optional(__S(8418, __c263, 2)),
          provisioningConfigurations: S.optional(__S(8421, __c263, 5)),
        }),
      ).annotate({ identifier: "GetEnvironmentBlueprintConfigurationOutput" });
  }
}
function __c264(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          environmentIdentifier: S.String.pipe(T.HttpLabel("environmentIdentifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/environments/{environmentIdentifier}/credentials",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEnvironmentCredentialsInput" });
  }
}
function __c265(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/environment-profiles/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEnvironmentProfileInput" });
  }
}
function __c266(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          formTypeIdentifier: S.String.pipe(T.HttpLabel("formTypeIdentifier")),
          revision: S.optional(S.String).pipe(T.HttpQuery("revision")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/form-types/{formTypeIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFormTypeInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          name: SensitiveString,
          revision: S.String,
          model: __S(5216, __c163, 0),
          owningProjectId: S.optional(S.String),
          originDomainId: S.optional(S.String),
          originProjectId: S.optional(S.String),
          status: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          description: S.optional(SensitiveString),
          imports: S.optional(__S(8545, __c267, 1)),
        }),
      ).annotate({ identifier: "GetFormTypeOutput" });
  }
}
function __c267(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: SensitiveString, revision: S.String })).annotate({
        identifier: "Import",
      });
    case 1:
      return S.Array(__S(8544, __c267, 0));
  }
}
function __c268(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/glossaries/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetGlossaryInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          id: S.String,
          owningProjectId: S.String,
          name: SensitiveString,
          description: S.optional(SensitiveString),
          status: S.String,
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedBy: S.optional(S.String),
          usageRestrictions: S.optional(__S(7520, __c235, 0)),
        }),
      ).annotate({ identifier: "GetGlossaryOutput" });
  }
}
function __c269(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/glossary-terms/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetGlossaryTermInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          glossaryId: S.String,
          id: S.String,
          name: SensitiveString,
          shortDescription: S.optional(SensitiveString),
          longDescription: S.optional(SensitiveString),
          termRelations: S.optional(__S(5376, __c168, 0)),
          status: S.String,
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedBy: S.optional(S.String),
          usageRestrictions: S.optional(__S(7520, __c235, 0)),
        }),
      ).annotate({ identifier: "GetGlossaryTermOutput" });
  }
}
function __c270(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          groupIdentifier: S.String.pipe(T.HttpLabel("groupIdentifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domains/{domainIdentifier}/group-profiles/{groupIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetGroupProfileInput" });
  }
}
function __c271(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/domains/{domainIdentifier}/get-portal-login-url" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetIamPortalLoginUrlInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ authCodeUrl: S.optional(S.String), userProfileId: S.String }),
      ).annotate({ identifier: "GetIamPortalLoginUrlOutput" });
  }
}
function __c272(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/domains/{domainIdentifier}/jobRuns/{identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetJobRunInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          queryStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          queryEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          totalQueriesProcessed: S.optional(S.Number),
          numQueriesFailed: S.optional(S.Number),
          errorMessages: S.optional(__S(7456, __c233, 0)),
        }),
      ).annotate({ identifier: "LineageSqlQueryRunDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({ sqlQueryRunDetails: S.optional(__S(8705, __c272, 1)) }),
      ).annotate({ identifier: "LineageRunDetails" });
    case 3:
      return S.Union([/*@__PURE__*/ S.Struct({ lineageRunDetails: __S(8706, __c272, 2) })]);
    case 4:
      return S.suspend(() =>
        S.Struct({
          domainId: S.optional(S.String),
          id: S.optional(S.String),
          jobId: S.optional(S.String),
          jobType: S.optional(S.String),
          runMode: S.optional(S.String),
          details: S.optional(__S(8707, __c272, 3)),
          status: S.optional(S.String),
          error: S.optional(__S(5632, __c176, 0)),
          createdBy: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetJobRunOutput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
