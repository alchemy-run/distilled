import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
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

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "DataZone",
  service: "DataZone",
  propagate: TxXray.propagate,
} as const;

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
export class EnvironmentBlueprintConfigurationInUse
  extends /*@__PURE__*/ S.TaggedError<EnvironmentBlueprintConfigurationInUse>()(
    "EnvironmentBlueprintConfigurationInUse",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "ValidationException",
      message: { includes: "still referenced by the following environments" },
    }),
  ).pipe(C.withDependencyViolationError) {}
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
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(401),
  ).pipe(C.withAuthError) {}
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
  rule?: AcceptRuleBehavior | undefined;
  threshold?: number | undefined;
}
export type EditedValue = string | redacted.Redacted<string>;
export interface AcceptChoice {
  predictionTarget?: string | undefined;
  predictionChoice?: number | undefined;
  editedValue?: string | redacted.Redacted<string> | undefined;
}
export type AcceptChoices = AcceptChoice[];
export type ClientToken = string;
export interface AcceptPredictionsInput {
  domainIdentifier: string;
  identifier: string;
  revision?: string | undefined;
  acceptRule?: AcceptRule | undefined;
  acceptChoices?: AcceptChoice[] | undefined;
  clientToken?: string | undefined;
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
  decisionComment?: string | redacted.Redacted<string> | undefined;
  assetScopes?: AcceptedAssetScope[] | undefined;
  assetPermissions?: AssetPermission[] | undefined;
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
  id?: string | undefined;
  name?: string | redacted.Redacted<string> | undefined;
}
export type UserProfileId = string;
export interface IamUserProfileDetails {
  arn?: string | undefined;
  principalId?: string | undefined;
  sessionName?: string | undefined;
  groupProfileId?: string | undefined;
}
export type UserProfileName = string | redacted.Redacted<string>;
export type FirstName = string | redacted.Redacted<string>;
export type LastName = string | redacted.Redacted<string>;
export interface SsoUserProfileDetails {
  username?: string | redacted.Redacted<string> | undefined;
  firstName?: string | redacted.Redacted<string> | undefined;
  lastName?: string | redacted.Redacted<string> | undefined;
}
export type UserProfileDetails =
  | { iam: IamUserProfileDetails; sso?: undefined }
  | { iam?: undefined; sso: SsoUserProfileDetails };
export interface SubscribedUser {
  id?: string | undefined;
  details?: UserProfileDetails | undefined;
}
export type GroupProfileId = string;
export type GroupProfileName = string | redacted.Redacted<string>;
export interface SubscribedGroup {
  id?: string | undefined;
  name?: string | redacted.Redacted<string> | undefined;
}
export type IamPrincipalArn = string;
export interface SubscribedIamPrincipal {
  principalArn?: string | undefined;
}
export type SubscribedPrincipal =
  | { project: SubscribedProject; user?: undefined; group?: undefined; iam?: undefined }
  | { project?: undefined; user: SubscribedUser; group?: undefined; iam?: undefined }
  | { project?: undefined; user?: undefined; group: SubscribedGroup; iam?: undefined }
  | { project?: undefined; user?: undefined; group?: undefined; iam: SubscribedIamPrincipal };
export type SubscribedPrincipals = SubscribedPrincipal[];
export type ListingId = string;
export type ListingName = string;
export type Description = string | redacted.Redacted<string>;
export type TypeName = string;
export type Forms = string;
export type GlossaryTermName = string | redacted.Redacted<string>;
export type ShortDescription = string | redacted.Redacted<string>;
export interface DetailedGlossaryTerm {
  name?: string | redacted.Redacted<string> | undefined;
  shortDescription?: string | redacted.Redacted<string> | undefined;
}
export type DetailedGlossaryTerms = DetailedGlossaryTerm[];
export interface AssetScope {
  assetId: string;
  filterIds: string[];
  status: string;
  scopeName?: string | undefined;
  errorMessage?: string | undefined;
}
export interface SubscribedAssetListing {
  entityId?: string | undefined;
  entityRevision?: string | undefined;
  entityType?: string | undefined;
  forms?: string | undefined;
  glossaryTerms?: DetailedGlossaryTerm[] | undefined;
  assetScope?: AssetScope | undefined;
  permissions?: Permissions | undefined;
}
export interface AssetInDataProductListingItem {
  entityId?: string | undefined;
  entityRevision?: string | undefined;
  entityType?: string | undefined;
}
export type AssetInDataProductListingItems = AssetInDataProductListingItem[];
export interface SubscribedProductListing {
  entityId?: string | undefined;
  entityRevision?: string | undefined;
  glossaryTerms?: DetailedGlossaryTerm[] | undefined;
  name?: string | undefined;
  description?: string | undefined;
  assetListings?: AssetInDataProductListingItem[] | undefined;
}
export type SubscribedListingItem =
  | { assetListing: SubscribedAssetListing; productListing?: undefined }
  | { assetListing?: undefined; productListing: SubscribedProductListing };
export interface SubscribedListing {
  id: string;
  revision?: string | undefined;
  name: string;
  description: string | redacted.Redacted<string>;
  item: SubscribedListingItem;
  ownerProjectId: string;
  ownerProjectName?: string | undefined;
}
export type SubscribedListings = SubscribedListing[];
export type SubscriptionId = string;
export type FormName = string;
export type FormTypeName = string | redacted.Redacted<string>;
export interface FormOutput {
  formName: string;
  typeName?: string | redacted.Redacted<string> | undefined;
  typeRevision?: string | undefined;
  content?: string | undefined;
}
export type MetadataForms = FormOutput[];
export interface AcceptSubscriptionRequestOutput {
  id: string;
  createdBy: string;
  updatedBy?: string | undefined;
  domainId: string;
  status: SubscriptionRequestStatus;
  createdAt: Date;
  updatedAt: Date;
  requestReason: string | redacted.Redacted<string>;
  subscribedPrincipals: SubscribedPrincipal[];
  subscribedListings: SubscribedListing[];
  reviewerId?: string | undefined;
  decisionComment?: string | redacted.Redacted<string> | undefined;
  existingSubscriptionId?: string | undefined;
  metadataForms?: FormOutput[] | undefined;
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
  | { user: OwnerUserProperties; group?: undefined }
  | { user?: undefined; group: OwnerGroupProperties };
export interface AddEntityOwnerInput {
  domainIdentifier: string;
  entityType: DataZoneEntityType;
  entityIdentifier: string;
  owner: OwnerProperties;
  clientToken?: string | undefined;
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
  | { userIdentifier: string; allUsersGrantFilter?: undefined }
  | { userIdentifier?: undefined; allUsersGrantFilter: AllUsersGrantFilter };
export type GroupPolicyGrantPrincipal = { groupIdentifier: string };
export type ProjectDesignation =
  | "OWNER"
  | "CONTRIBUTOR"
  | "PROJECT_CATALOG_STEWARD"
  | "USER_CREATED_DESIGNATION"
  | (string & {});
export type DesignationId = string;
export type DomainUnitId = string;
export interface DomainUnitFilterForProject {
  domainUnit: string;
  includeChildDomainUnits?: boolean | undefined;
}
export type ProjectGrantFilter = { domainUnitFilter: DomainUnitFilterForProject };
export interface ProjectPolicyGrantPrincipal {
  projectDesignation: ProjectDesignation;
  userCreatedDesignationId?: string | undefined;
  projectIdentifier?: string | undefined;
  projectGrantFilter?: ProjectGrantFilter | undefined;
}
export type DomainUnitDesignation = "OWNER" | (string & {});
export interface AllDomainUnitsGrantFilter {}
export type DomainUnitGrantFilter = { allDomainUnitsGrantFilter: AllDomainUnitsGrantFilter };
export interface DomainUnitPolicyGrantPrincipal {
  domainUnitDesignation: DomainUnitDesignation;
  domainUnitIdentifier?: string | undefined;
  domainUnitGrantFilter?: DomainUnitGrantFilter | undefined;
}
export type PolicyGrantPrincipal =
  | {
      user: UserPolicyGrantPrincipal;
      group?: undefined;
      project?: undefined;
      domainUnit?: undefined;
    }
  | {
      user?: undefined;
      group: GroupPolicyGrantPrincipal;
      project?: undefined;
      domainUnit?: undefined;
    }
  | {
      user?: undefined;
      group?: undefined;
      project: ProjectPolicyGrantPrincipal;
      domainUnit?: undefined;
    }
  | {
      user?: undefined;
      group?: undefined;
      project?: undefined;
      domainUnit: DomainUnitPolicyGrantPrincipal;
    };
export interface CreateDomainUnitPolicyGrantDetail {
  includeChildDomainUnits?: boolean | undefined;
}
export interface OverrideDomainUnitOwnersPolicyGrantDetail {
  includeChildDomainUnits?: boolean | undefined;
}
export interface AddToProjectMemberPoolPolicyGrantDetail {
  includeChildDomainUnits?: boolean | undefined;
}
export interface OverrideProjectOwnersPolicyGrantDetail {
  includeChildDomainUnits?: boolean | undefined;
}
export interface CreateGlossaryPolicyGrantDetail {
  includeChildDomainUnits?: boolean | undefined;
}
export interface CreateFormTypePolicyGrantDetail {
  includeChildDomainUnits?: boolean | undefined;
}
export interface CreateAssetTypePolicyGrantDetail {
  includeChildDomainUnits?: boolean | undefined;
}
export interface CreateProjectPolicyGrantDetail {
  includeChildDomainUnits?: boolean | undefined;
}
export interface CreateEnvironmentProfilePolicyGrantDetail {
  domainUnitId?: string | undefined;
}
export interface Unit {}
export type ProjectProfileList = string[];
export interface CreateProjectFromProjectProfilePolicyGrantDetail {
  includeChildDomainUnits?: boolean | undefined;
  projectProfiles?: string[] | undefined;
}
export interface UseAssetTypePolicyGrantDetail {
  domainUnitId?: string | undefined;
}
export type PolicyGrantDetail =
  | {
      createDomainUnit: CreateDomainUnitPolicyGrantDetail;
      overrideDomainUnitOwners?: undefined;
      addToProjectMemberPool?: undefined;
      overrideProjectOwners?: undefined;
      createGlossary?: undefined;
      createFormType?: undefined;
      createAssetType?: undefined;
      createProject?: undefined;
      createEnvironmentProfile?: undefined;
      delegateCreateEnvironmentProfile?: undefined;
      createEnvironment?: undefined;
      createEnvironmentFromBlueprint?: undefined;
      createProjectFromProjectProfile?: undefined;
      useAssetType?: undefined;
    }
  | {
      createDomainUnit?: undefined;
      overrideDomainUnitOwners: OverrideDomainUnitOwnersPolicyGrantDetail;
      addToProjectMemberPool?: undefined;
      overrideProjectOwners?: undefined;
      createGlossary?: undefined;
      createFormType?: undefined;
      createAssetType?: undefined;
      createProject?: undefined;
      createEnvironmentProfile?: undefined;
      delegateCreateEnvironmentProfile?: undefined;
      createEnvironment?: undefined;
      createEnvironmentFromBlueprint?: undefined;
      createProjectFromProjectProfile?: undefined;
      useAssetType?: undefined;
    }
  | {
      createDomainUnit?: undefined;
      overrideDomainUnitOwners?: undefined;
      addToProjectMemberPool: AddToProjectMemberPoolPolicyGrantDetail;
      overrideProjectOwners?: undefined;
      createGlossary?: undefined;
      createFormType?: undefined;
      createAssetType?: undefined;
      createProject?: undefined;
      createEnvironmentProfile?: undefined;
      delegateCreateEnvironmentProfile?: undefined;
      createEnvironment?: undefined;
      createEnvironmentFromBlueprint?: undefined;
      createProjectFromProjectProfile?: undefined;
      useAssetType?: undefined;
    }
  | {
      createDomainUnit?: undefined;
      overrideDomainUnitOwners?: undefined;
      addToProjectMemberPool?: undefined;
      overrideProjectOwners: OverrideProjectOwnersPolicyGrantDetail;
      createGlossary?: undefined;
      createFormType?: undefined;
      createAssetType?: undefined;
      createProject?: undefined;
      createEnvironmentProfile?: undefined;
      delegateCreateEnvironmentProfile?: undefined;
      createEnvironment?: undefined;
      createEnvironmentFromBlueprint?: undefined;
      createProjectFromProjectProfile?: undefined;
      useAssetType?: undefined;
    }
  | {
      createDomainUnit?: undefined;
      overrideDomainUnitOwners?: undefined;
      addToProjectMemberPool?: undefined;
      overrideProjectOwners?: undefined;
      createGlossary: CreateGlossaryPolicyGrantDetail;
      createFormType?: undefined;
      createAssetType?: undefined;
      createProject?: undefined;
      createEnvironmentProfile?: undefined;
      delegateCreateEnvironmentProfile?: undefined;
      createEnvironment?: undefined;
      createEnvironmentFromBlueprint?: undefined;
      createProjectFromProjectProfile?: undefined;
      useAssetType?: undefined;
    }
  | {
      createDomainUnit?: undefined;
      overrideDomainUnitOwners?: undefined;
      addToProjectMemberPool?: undefined;
      overrideProjectOwners?: undefined;
      createGlossary?: undefined;
      createFormType: CreateFormTypePolicyGrantDetail;
      createAssetType?: undefined;
      createProject?: undefined;
      createEnvironmentProfile?: undefined;
      delegateCreateEnvironmentProfile?: undefined;
      createEnvironment?: undefined;
      createEnvironmentFromBlueprint?: undefined;
      createProjectFromProjectProfile?: undefined;
      useAssetType?: undefined;
    }
  | {
      createDomainUnit?: undefined;
      overrideDomainUnitOwners?: undefined;
      addToProjectMemberPool?: undefined;
      overrideProjectOwners?: undefined;
      createGlossary?: undefined;
      createFormType?: undefined;
      createAssetType: CreateAssetTypePolicyGrantDetail;
      createProject?: undefined;
      createEnvironmentProfile?: undefined;
      delegateCreateEnvironmentProfile?: undefined;
      createEnvironment?: undefined;
      createEnvironmentFromBlueprint?: undefined;
      createProjectFromProjectProfile?: undefined;
      useAssetType?: undefined;
    }
  | {
      createDomainUnit?: undefined;
      overrideDomainUnitOwners?: undefined;
      addToProjectMemberPool?: undefined;
      overrideProjectOwners?: undefined;
      createGlossary?: undefined;
      createFormType?: undefined;
      createAssetType?: undefined;
      createProject: CreateProjectPolicyGrantDetail;
      createEnvironmentProfile?: undefined;
      delegateCreateEnvironmentProfile?: undefined;
      createEnvironment?: undefined;
      createEnvironmentFromBlueprint?: undefined;
      createProjectFromProjectProfile?: undefined;
      useAssetType?: undefined;
    }
  | {
      createDomainUnit?: undefined;
      overrideDomainUnitOwners?: undefined;
      addToProjectMemberPool?: undefined;
      overrideProjectOwners?: undefined;
      createGlossary?: undefined;
      createFormType?: undefined;
      createAssetType?: undefined;
      createProject?: undefined;
      createEnvironmentProfile: CreateEnvironmentProfilePolicyGrantDetail;
      delegateCreateEnvironmentProfile?: undefined;
      createEnvironment?: undefined;
      createEnvironmentFromBlueprint?: undefined;
      createProjectFromProjectProfile?: undefined;
      useAssetType?: undefined;
    }
  | {
      createDomainUnit?: undefined;
      overrideDomainUnitOwners?: undefined;
      addToProjectMemberPool?: undefined;
      overrideProjectOwners?: undefined;
      createGlossary?: undefined;
      createFormType?: undefined;
      createAssetType?: undefined;
      createProject?: undefined;
      createEnvironmentProfile?: undefined;
      delegateCreateEnvironmentProfile: Unit;
      createEnvironment?: undefined;
      createEnvironmentFromBlueprint?: undefined;
      createProjectFromProjectProfile?: undefined;
      useAssetType?: undefined;
    }
  | {
      createDomainUnit?: undefined;
      overrideDomainUnitOwners?: undefined;
      addToProjectMemberPool?: undefined;
      overrideProjectOwners?: undefined;
      createGlossary?: undefined;
      createFormType?: undefined;
      createAssetType?: undefined;
      createProject?: undefined;
      createEnvironmentProfile?: undefined;
      delegateCreateEnvironmentProfile?: undefined;
      createEnvironment: Unit;
      createEnvironmentFromBlueprint?: undefined;
      createProjectFromProjectProfile?: undefined;
      useAssetType?: undefined;
    }
  | {
      createDomainUnit?: undefined;
      overrideDomainUnitOwners?: undefined;
      addToProjectMemberPool?: undefined;
      overrideProjectOwners?: undefined;
      createGlossary?: undefined;
      createFormType?: undefined;
      createAssetType?: undefined;
      createProject?: undefined;
      createEnvironmentProfile?: undefined;
      delegateCreateEnvironmentProfile?: undefined;
      createEnvironment?: undefined;
      createEnvironmentFromBlueprint: Unit;
      createProjectFromProjectProfile?: undefined;
      useAssetType?: undefined;
    }
  | {
      createDomainUnit?: undefined;
      overrideDomainUnitOwners?: undefined;
      addToProjectMemberPool?: undefined;
      overrideProjectOwners?: undefined;
      createGlossary?: undefined;
      createFormType?: undefined;
      createAssetType?: undefined;
      createProject?: undefined;
      createEnvironmentProfile?: undefined;
      delegateCreateEnvironmentProfile?: undefined;
      createEnvironment?: undefined;
      createEnvironmentFromBlueprint?: undefined;
      createProjectFromProjectProfile: CreateProjectFromProjectProfilePolicyGrantDetail;
      useAssetType?: undefined;
    }
  | {
      createDomainUnit?: undefined;
      overrideDomainUnitOwners?: undefined;
      addToProjectMemberPool?: undefined;
      overrideProjectOwners?: undefined;
      createGlossary?: undefined;
      createFormType?: undefined;
      createAssetType?: undefined;
      createProject?: undefined;
      createEnvironmentProfile?: undefined;
      delegateCreateEnvironmentProfile?: undefined;
      createEnvironment?: undefined;
      createEnvironmentFromBlueprint?: undefined;
      createProjectFromProjectProfile?: undefined;
      useAssetType: UseAssetTypePolicyGrantDetail;
    };
export interface AddPolicyGrantInput {
  domainIdentifier: string;
  entityType: TargetEntityType;
  entityIdentifier: string;
  policyType: ManagedPolicyType;
  principal: PolicyGrantPrincipal;
  detail: PolicyGrantDetail;
  clientToken?: string | undefined;
}
export type GrantIdentifier = string;
export interface AddPolicyGrantOutput {
  grantId?: string | undefined;
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
  entityRevision?: string | undefined;
  attributeIdentifiers: string[];
}
export type FormOutputList = FormOutput[];
export interface BatchGetAttributeOutput {
  attributeIdentifier: string;
  forms?: FormOutput[] | undefined;
}
export type BatchGetAttributeItems = BatchGetAttributeOutput[];
export interface AttributeError {
  attributeIdentifier: string;
  code: string;
  message: string;
}
export type AttributesErrors = AttributeError[];
export interface BatchGetAttributesMetadataOutput {
  attributes?: BatchGetAttributeOutput[] | undefined;
  errors: AttributeError[];
}
export type FormTypeIdentifier = string;
export type RevisionInput = string;
export interface FormInput {
  formName: string;
  typeIdentifier?: string | undefined;
  typeRevision?: string | undefined;
  content?: string | undefined;
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
  clientToken?: string | undefined;
  attributes: AttributeInput[];
}
export interface BatchPutAttributeOutput {
  attributeIdentifier: string;
}
export type BatchPutAttributeItems = BatchPutAttributeOutput[];
export interface BatchPutAttributesMetadataOutput {
  errors?: AttributeError[] | undefined;
  attributes?: BatchPutAttributeOutput[] | undefined;
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
  updatedBy?: string | undefined;
  domainId: string;
  status: SubscriptionStatus;
  createdAt: Date;
  updatedAt: Date;
  subscribedPrincipal: SubscribedPrincipal;
  subscribedListing: SubscribedListing;
  subscriptionRequestId?: string | undefined;
  retainPermissions?: boolean | undefined;
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
  awsAccountName?: string | redacted.Redacted<string> | undefined;
}
export type AccountInfoList = AccountInfo[];
export type LambdaFunctionArn = string;
export type LambdaExecutionRoleArn = string;
export interface CustomAccountPoolHandler {
  lambdaFunctionArn: string;
  lambdaExecutionRoleArn?: string | undefined;
}
export type AccountSource =
  | { accounts: AccountInfo[]; customAccountPoolHandler?: undefined }
  | { accounts?: undefined; customAccountPoolHandler: CustomAccountPoolHandler };
export interface CreateAccountPoolInput {
  domainIdentifier: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string> | undefined;
  resolutionStrategy: ResolutionStrategy;
  accountSource: AccountSource;
}
export type AccountPoolId = string;
export interface CreateAccountPoolOutput {
  domainId?: string | undefined;
  name?: string | redacted.Redacted<string> | undefined;
  id?: string | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  resolutionStrategy?: ResolutionStrategy | undefined;
  accountSource: AccountSource;
  createdBy: string;
  createdAt?: Date | undefined;
  lastUpdatedAt?: Date | undefined;
  updatedBy?: string | undefined;
  domainUnitId?: string | undefined;
}
export type AssetName = string | redacted.Redacted<string>;
export type ExternalIdentifier = string;
export type AssetTypeIdentifier = string;
export type GlossaryTerms = string[];
export interface BusinessNameGenerationConfiguration {
  enabled?: boolean | undefined;
}
export interface PredictionConfiguration {
  businessNameGeneration?: BusinessNameGenerationConfiguration | undefined;
}
export interface CreateAssetInput {
  name: string | redacted.Redacted<string>;
  domainIdentifier: string;
  externalIdentifier?: string | undefined;
  typeIdentifier: string;
  typeRevision?: string | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  glossaryTerms?: string[] | undefined;
  formsInput?: FormInput[] | undefined;
  owningProjectIdentifier: string;
  predictionConfiguration?: PredictionConfiguration | undefined;
  clientToken?: string | undefined;
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
  typeRevision?: string | undefined;
  timestamp: Date;
  contentSummary?: string | undefined;
  id?: string | undefined;
}
export type TimeSeriesDataPointSummaryFormOutputList = TimeSeriesDataPointSummaryFormOutput[];
export interface CreateAssetOutput {
  id: string;
  name: string | redacted.Redacted<string>;
  typeIdentifier: string;
  typeRevision: string;
  externalIdentifier?: string | undefined;
  revision: string;
  description?: string | redacted.Redacted<string> | undefined;
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
  firstRevisionCreatedAt?: Date | undefined;
  firstRevisionCreatedBy?: string | undefined;
  glossaryTerms?: string[] | undefined;
  governedGlossaryTerms?: string[] | undefined;
  owningProjectId: string;
  domainId: string;
  listing?: AssetListingDetails | undefined;
  formsOutput: FormOutput[];
  readOnlyFormsOutput?: FormOutput[] | undefined;
  latestTimeSeriesDataPointFormsOutput?: TimeSeriesDataPointSummaryFormOutput[] | undefined;
  predictionConfiguration?: PredictionConfiguration | undefined;
}
export type FilterName = string | redacted.Redacted<string>;
export type ColumnNameList = string[];
export interface ColumnFilterConfiguration {
  includedColumnNames?: string[] | undefined;
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
      notEqualTo?: undefined;
      greaterThan?: undefined;
      lessThan?: undefined;
      greaterThanOrEqualTo?: undefined;
      lessThanOrEqualTo?: undefined;
      isNull?: undefined;
      isNotNull?: undefined;
      in?: undefined;
      notIn?: undefined;
      like?: undefined;
      notLike?: undefined;
    }
  | {
      equalTo?: undefined;
      notEqualTo: NotEqualToExpression;
      greaterThan?: undefined;
      lessThan?: undefined;
      greaterThanOrEqualTo?: undefined;
      lessThanOrEqualTo?: undefined;
      isNull?: undefined;
      isNotNull?: undefined;
      in?: undefined;
      notIn?: undefined;
      like?: undefined;
      notLike?: undefined;
    }
  | {
      equalTo?: undefined;
      notEqualTo?: undefined;
      greaterThan: GreaterThanExpression;
      lessThan?: undefined;
      greaterThanOrEqualTo?: undefined;
      lessThanOrEqualTo?: undefined;
      isNull?: undefined;
      isNotNull?: undefined;
      in?: undefined;
      notIn?: undefined;
      like?: undefined;
      notLike?: undefined;
    }
  | {
      equalTo?: undefined;
      notEqualTo?: undefined;
      greaterThan?: undefined;
      lessThan: LessThanExpression;
      greaterThanOrEqualTo?: undefined;
      lessThanOrEqualTo?: undefined;
      isNull?: undefined;
      isNotNull?: undefined;
      in?: undefined;
      notIn?: undefined;
      like?: undefined;
      notLike?: undefined;
    }
  | {
      equalTo?: undefined;
      notEqualTo?: undefined;
      greaterThan?: undefined;
      lessThan?: undefined;
      greaterThanOrEqualTo: GreaterThanOrEqualToExpression;
      lessThanOrEqualTo?: undefined;
      isNull?: undefined;
      isNotNull?: undefined;
      in?: undefined;
      notIn?: undefined;
      like?: undefined;
      notLike?: undefined;
    }
  | {
      equalTo?: undefined;
      notEqualTo?: undefined;
      greaterThan?: undefined;
      lessThan?: undefined;
      greaterThanOrEqualTo?: undefined;
      lessThanOrEqualTo: LessThanOrEqualToExpression;
      isNull?: undefined;
      isNotNull?: undefined;
      in?: undefined;
      notIn?: undefined;
      like?: undefined;
      notLike?: undefined;
    }
  | {
      equalTo?: undefined;
      notEqualTo?: undefined;
      greaterThan?: undefined;
      lessThan?: undefined;
      greaterThanOrEqualTo?: undefined;
      lessThanOrEqualTo?: undefined;
      isNull: IsNullExpression;
      isNotNull?: undefined;
      in?: undefined;
      notIn?: undefined;
      like?: undefined;
      notLike?: undefined;
    }
  | {
      equalTo?: undefined;
      notEqualTo?: undefined;
      greaterThan?: undefined;
      lessThan?: undefined;
      greaterThanOrEqualTo?: undefined;
      lessThanOrEqualTo?: undefined;
      isNull?: undefined;
      isNotNull: IsNotNullExpression;
      in?: undefined;
      notIn?: undefined;
      like?: undefined;
      notLike?: undefined;
    }
  | {
      equalTo?: undefined;
      notEqualTo?: undefined;
      greaterThan?: undefined;
      lessThan?: undefined;
      greaterThanOrEqualTo?: undefined;
      lessThanOrEqualTo?: undefined;
      isNull?: undefined;
      isNotNull?: undefined;
      in: InExpression;
      notIn?: undefined;
      like?: undefined;
      notLike?: undefined;
    }
  | {
      equalTo?: undefined;
      notEqualTo?: undefined;
      greaterThan?: undefined;
      lessThan?: undefined;
      greaterThanOrEqualTo?: undefined;
      lessThanOrEqualTo?: undefined;
      isNull?: undefined;
      isNotNull?: undefined;
      in?: undefined;
      notIn: NotInExpression;
      like?: undefined;
      notLike?: undefined;
    }
  | {
      equalTo?: undefined;
      notEqualTo?: undefined;
      greaterThan?: undefined;
      lessThan?: undefined;
      greaterThanOrEqualTo?: undefined;
      lessThanOrEqualTo?: undefined;
      isNull?: undefined;
      isNotNull?: undefined;
      in?: undefined;
      notIn?: undefined;
      like: LikeExpression;
      notLike?: undefined;
    }
  | {
      equalTo?: undefined;
      notEqualTo?: undefined;
      greaterThan?: undefined;
      lessThan?: undefined;
      greaterThanOrEqualTo?: undefined;
      lessThanOrEqualTo?: undefined;
      isNull?: undefined;
      isNotNull?: undefined;
      in?: undefined;
      notIn?: undefined;
      like?: undefined;
      notLike: NotLikeExpression;
    };
export type RowFilterList = RowFilter[];
export type RowFilter =
  | { expression: RowFilterExpression; and?: undefined; or?: undefined }
  | { expression?: undefined; and: RowFilter[]; or?: undefined }
  | { expression?: undefined; and?: undefined; or: RowFilter[] };
export interface RowFilterConfiguration {
  rowFilter: RowFilter;
  sensitive?: boolean | undefined;
}
export type AssetFilterConfiguration =
  | { columnConfiguration: ColumnFilterConfiguration; rowConfiguration?: undefined }
  | { columnConfiguration?: undefined; rowConfiguration: RowFilterConfiguration };
export interface CreateAssetFilterInput {
  domainIdentifier: string;
  assetIdentifier: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string> | undefined;
  configuration: AssetFilterConfiguration;
  clientToken?: string | undefined;
}
export type FilterStatus = "VALID" | "INVALID" | (string & {});
export interface CreateAssetFilterOutput {
  id: string;
  domainId: string;
  assetId: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string> | undefined;
  status?: FilterStatus | undefined;
  configuration: AssetFilterConfiguration;
  createdAt?: Date | undefined;
  errorMessage?: string | undefined;
  effectiveColumnNames?: string[] | undefined;
  effectiveRowFilter?: string | undefined;
}
export interface CreateAssetRevisionInput {
  name: string | redacted.Redacted<string>;
  domainIdentifier: string;
  identifier: string;
  typeRevision?: string | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  glossaryTerms?: string[] | undefined;
  formsInput?: FormInput[] | undefined;
  predictionConfiguration?: PredictionConfiguration | undefined;
  clientToken?: string | undefined;
}
export interface CreateAssetRevisionOutput {
  id: string;
  name: string | redacted.Redacted<string>;
  typeIdentifier: string;
  typeRevision: string;
  externalIdentifier?: string | undefined;
  revision: string;
  description?: string | redacted.Redacted<string> | undefined;
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
  firstRevisionCreatedAt?: Date | undefined;
  firstRevisionCreatedBy?: string | undefined;
  glossaryTerms?: string[] | undefined;
  governedGlossaryTerms?: string[] | undefined;
  owningProjectId: string;
  domainId: string;
  listing?: AssetListingDetails | undefined;
  formsOutput: FormOutput[];
  readOnlyFormsOutput?: FormOutput[] | undefined;
  latestTimeSeriesDataPointFormsOutput?: TimeSeriesDataPointSummaryFormOutput[] | undefined;
  predictionConfiguration?: PredictionConfiguration | undefined;
}
export interface FormEntryInput {
  typeIdentifier: string;
  typeRevision: string;
  required?: boolean | undefined;
}
export type FormsInputMap = { [key: string]: FormEntryInput | undefined };
export interface CreateAssetTypeInput {
  domainIdentifier: string;
  name: string;
  description?: string | redacted.Redacted<string> | undefined;
  formsInput: { [key: string]: FormEntryInput | undefined };
  owningProjectIdentifier: string;
}
export interface FormEntryOutput {
  typeName: string | redacted.Redacted<string>;
  typeRevision: string;
  required?: boolean | undefined;
}
export type FormsOutputMap = { [key: string]: FormEntryOutput | undefined };
export interface CreateAssetTypeOutput {
  domainId: string;
  name: string;
  revision: string;
  description?: string | redacted.Redacted<string> | undefined;
  formsOutput: { [key: string]: FormEntryOutput | undefined };
  owningProjectId?: string | undefined;
  originDomainId?: string | undefined;
  originProjectId?: string | undefined;
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
  updatedAt?: Date | undefined;
  updatedBy?: string | undefined;
}
export type ConnectionId = string;
export interface AwsLocation {
  accessRole?: string | undefined;
  awsAccountId?: string | undefined;
  awsRegion?: string | undefined;
  iamConnectionId?: string | undefined;
}
export type PropertyMap = { [key: string]: string | undefined };
export interface Configuration {
  classification?: string | undefined;
  properties?: { [key: string]: string | undefined } | undefined;
}
export type Configurations = Configuration[];
export type ConnectionName = string;
export interface AthenaPropertiesInput {
  workgroupName?: string | undefined;
}
export type ConnectionProperties = { [key: string]: string | undefined };
export type SubnetId = string;
export type SubnetIdList = string[];
export type SecurityGroupIdList = string[];
export interface PhysicalConnectionRequirements {
  subnetId?: string | undefined;
  subnetIdList?: string[] | undefined;
  securityGroupIdList?: string[] | undefined;
  availabilityZone?: string | undefined;
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
  | "ICEBERGRESTCATALOG"
  | "SNOWFLAKEICEBERGRESTCATALOG"
  | "DATABRICKSICEBERGRESTCATALOG"
  | "WORKDAYICEBERGRESTCATALOG"
  | "WORKDAYLDQ"
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
  userManagedClientApplicationClientId?: string | undefined;
  aWSManagedClientApplicationReference?: string | undefined;
}
export type TokenUrlParametersMap = { [key: string]: string | undefined };
export interface AuthorizationCodeProperties {
  authorizationCode?: string | undefined;
  redirectUri?: string | undefined;
}
export interface GlueOAuth2Credentials {
  userManagedClientApplicationClientSecret?: string | undefined;
  accessToken?: string | undefined;
  refreshToken?: string | undefined;
  jwtToken?: string | undefined;
}
export interface OAuth2Properties {
  oAuth2GrantType?: OAuth2GrantType | undefined;
  oAuth2ClientApplication?: OAuth2ClientApplication | undefined;
  tokenUrl?: string | undefined;
  tokenUrlParametersMap?: { [key: string]: string | undefined } | undefined;
  authorizationCodeProperties?: AuthorizationCodeProperties | undefined;
  oAuth2Credentials?: GlueOAuth2Credentials | undefined;
}
export interface BasicAuthenticationCredentials {
  userName?: string | undefined;
  password?: string | undefined;
}
export type CredentialMap = { [key: string]: string | undefined };
export interface AuthenticationConfigurationInput {
  authenticationType?: AuthenticationType | undefined;
  oAuth2Properties?: OAuth2Properties | undefined;
  secretArn?: string | undefined;
  kmsKeyArn?: string | undefined;
  basicAuthenticationCredentials?: BasicAuthenticationCredentials | undefined;
  customAuthenticationCredentials?: { [key: string]: string | undefined } | undefined;
}
export interface GlueConnectionInput {
  connectionProperties?: { [key: string]: string | undefined } | undefined;
  physicalConnectionRequirements?: PhysicalConnectionRequirements | undefined;
  name?: string | undefined;
  description?: string | undefined;
  connectionType?: GlueConnectionType | undefined;
  matchCriteria?: string | undefined;
  validateCredentials?: boolean | undefined;
  validateForComputeEnvironments?: ComputeEnvironments[] | undefined;
  sparkProperties?: { [key: string]: string | undefined } | undefined;
  athenaProperties?: { [key: string]: string | undefined } | undefined;
  pythonProperties?: { [key: string]: string | undefined } | undefined;
  authenticationConfiguration?: AuthenticationConfigurationInput | undefined;
}
export interface GluePropertiesInput {
  glueConnectionInput?: GlueConnectionInput | undefined;
}
export interface HyperPodPropertiesInput {
  clusterName: string;
}
export type RoleArn = string;
export interface IamPropertiesInput {
  glueLineageSyncEnabled?: boolean | undefined;
  roleArn?: string | undefined;
}
export type RedshiftStorageProperties =
  | { clusterName: string; workgroupName?: undefined }
  | { clusterName?: undefined; workgroupName: string };
export type Password = string | redacted.Redacted<string>;
export type Username = string;
export interface UsernamePassword {
  password: string | redacted.Redacted<string>;
  username: string;
}
export type RedshiftCredentials =
  | { secretArn: string; usernamePassword?: undefined }
  | { secretArn?: undefined; usernamePassword: UsernamePassword };
export interface LineageSyncSchedule {
  schedule?: string | undefined;
}
export interface RedshiftLineageSyncConfigurationInput {
  enabled?: boolean | undefined;
  schedule?: LineageSyncSchedule | undefined;
}
export interface RedshiftPropertiesInput {
  storage?: RedshiftStorageProperties | undefined;
  databaseName?: string | undefined;
  host?: string | undefined;
  port?: number | undefined;
  credentials?: RedshiftCredentials | undefined;
  lineageSync?: RedshiftLineageSyncConfigurationInput | undefined;
}
export interface SparkEmrPropertiesInput {
  computeArn?: string | undefined;
  instanceProfileArn?: string | undefined;
  javaVirtualEnv?: string | undefined;
  logUri?: string | undefined;
  pythonVirtualEnv?: string | undefined;
  runtimeRole?: string | undefined;
  trustedCertificatesS3Uri?: string | undefined;
  managedEndpointArn?: string | undefined;
}
export interface SparkGlueArgs {
  connection?: string | undefined;
}
export type GlueConnectionName = string;
export type GlueConnectionNames = string[];
export interface SparkGluePropertiesInput {
  additionalArgs?: SparkGlueArgs | undefined;
  glueConnectionName?: string | undefined;
  glueConnectionNames?: string[] | undefined;
  glueVersion?: string | undefined;
  idleTimeout?: number | undefined;
  javaVirtualEnv?: string | undefined;
  numberOfWorkers?: number | undefined;
  pythonVirtualEnv?: string | undefined;
  workerType?: string | undefined;
}
export type S3Uri = string;
export type S3AccessGrantLocationId = string;
export interface S3PropertiesInput {
  s3Uri: string;
  s3AccessGrantLocationId?: string | undefined;
  registerS3AccessGrantLocation?: boolean | undefined;
}
export interface ConnectivityProperties {
  connectionProperties?: { [key: string]: string | undefined } | undefined;
  physicalConnectionRequirements?: PhysicalConnectionRequirements | undefined;
  name?: string | undefined;
  description?: string | undefined;
  validateCredentials?: boolean | undefined;
  validateForComputeEnvironments?: ComputeEnvironments[] | undefined;
  sparkProperties?: { [key: string]: string | undefined } | undefined;
  athenaProperties?: { [key: string]: string | undefined } | undefined;
  pythonProperties?: { [key: string]: string | undefined } | undefined;
  authenticationConfiguration?: AuthenticationConfigurationInput | undefined;
}
export type SnowflakeRole = string;
export interface IdentityMapping {
  usernameAttribute: string;
  prefix?: string | undefined;
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
  timezone?: Timezone | undefined;
  enabled: boolean;
  schedule?: string | undefined;
}
export interface SnowflakePropertiesInput {
  connectivityProperties?: ConnectivityProperties | undefined;
  snowflakeRole: string;
  identityMapping: IdentityMapping;
  lineageSync?: LineageSyncInput | undefined;
}
export interface AmazonQPropertiesInput {
  isEnabled: boolean;
  profileArn?: string | undefined;
  authMode?: string | undefined;
}
export interface MlflowPropertiesInput {
  trackingServerArn?: string | undefined;
}
export interface WorkflowsMwaaPropertiesInput {
  mwaaEnvironmentName?: string | undefined;
}
export interface WorkflowsServerlessPropertiesInput {}
export interface LakehousePropertiesInput {
  glueLineageSyncEnabled?: boolean | undefined;
}
export type VpcId = string;
export type VpcConnectionSubnetIdList = string[];
export type SecurityGroupId = string;
export interface VpcPropertiesInput {
  vpcId: string;
  subnetIds: string[];
  securityGroupId?: string | undefined;
}
export interface GitPropertiesInput {
  codeConnectionArn: string;
  repositoryId: string;
  defaultBranch: string;
}
export type ConnectionPropertiesInput =
  | {
      athenaProperties: AthenaPropertiesInput;
      glueProperties?: undefined;
      hyperPodProperties?: undefined;
      iamProperties?: undefined;
      redshiftProperties?: undefined;
      sparkEmrProperties?: undefined;
      sparkGlueProperties?: undefined;
      s3Properties?: undefined;
      snowflakeProperties?: undefined;
      amazonQProperties?: undefined;
      mlflowProperties?: undefined;
      workflowsMwaaProperties?: undefined;
      workflowsServerlessProperties?: undefined;
      lakehouseProperties?: undefined;
      vpcProperties?: undefined;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties: GluePropertiesInput;
      hyperPodProperties?: undefined;
      iamProperties?: undefined;
      redshiftProperties?: undefined;
      sparkEmrProperties?: undefined;
      sparkGlueProperties?: undefined;
      s3Properties?: undefined;
      snowflakeProperties?: undefined;
      amazonQProperties?: undefined;
      mlflowProperties?: undefined;
      workflowsMwaaProperties?: undefined;
      workflowsServerlessProperties?: undefined;
      lakehouseProperties?: undefined;
      vpcProperties?: undefined;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties?: undefined;
      hyperPodProperties: HyperPodPropertiesInput;
      iamProperties?: undefined;
      redshiftProperties?: undefined;
      sparkEmrProperties?: undefined;
      sparkGlueProperties?: undefined;
      s3Properties?: undefined;
      snowflakeProperties?: undefined;
      amazonQProperties?: undefined;
      mlflowProperties?: undefined;
      workflowsMwaaProperties?: undefined;
      workflowsServerlessProperties?: undefined;
      lakehouseProperties?: undefined;
      vpcProperties?: undefined;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties?: undefined;
      hyperPodProperties?: undefined;
      iamProperties: IamPropertiesInput;
      redshiftProperties?: undefined;
      sparkEmrProperties?: undefined;
      sparkGlueProperties?: undefined;
      s3Properties?: undefined;
      snowflakeProperties?: undefined;
      amazonQProperties?: undefined;
      mlflowProperties?: undefined;
      workflowsMwaaProperties?: undefined;
      workflowsServerlessProperties?: undefined;
      lakehouseProperties?: undefined;
      vpcProperties?: undefined;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties?: undefined;
      hyperPodProperties?: undefined;
      iamProperties?: undefined;
      redshiftProperties: RedshiftPropertiesInput;
      sparkEmrProperties?: undefined;
      sparkGlueProperties?: undefined;
      s3Properties?: undefined;
      snowflakeProperties?: undefined;
      amazonQProperties?: undefined;
      mlflowProperties?: undefined;
      workflowsMwaaProperties?: undefined;
      workflowsServerlessProperties?: undefined;
      lakehouseProperties?: undefined;
      vpcProperties?: undefined;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties?: undefined;
      hyperPodProperties?: undefined;
      iamProperties?: undefined;
      redshiftProperties?: undefined;
      sparkEmrProperties: SparkEmrPropertiesInput;
      sparkGlueProperties?: undefined;
      s3Properties?: undefined;
      snowflakeProperties?: undefined;
      amazonQProperties?: undefined;
      mlflowProperties?: undefined;
      workflowsMwaaProperties?: undefined;
      workflowsServerlessProperties?: undefined;
      lakehouseProperties?: undefined;
      vpcProperties?: undefined;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties?: undefined;
      hyperPodProperties?: undefined;
      iamProperties?: undefined;
      redshiftProperties?: undefined;
      sparkEmrProperties?: undefined;
      sparkGlueProperties: SparkGluePropertiesInput;
      s3Properties?: undefined;
      snowflakeProperties?: undefined;
      amazonQProperties?: undefined;
      mlflowProperties?: undefined;
      workflowsMwaaProperties?: undefined;
      workflowsServerlessProperties?: undefined;
      lakehouseProperties?: undefined;
      vpcProperties?: undefined;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties?: undefined;
      hyperPodProperties?: undefined;
      iamProperties?: undefined;
      redshiftProperties?: undefined;
      sparkEmrProperties?: undefined;
      sparkGlueProperties?: undefined;
      s3Properties: S3PropertiesInput;
      snowflakeProperties?: undefined;
      amazonQProperties?: undefined;
      mlflowProperties?: undefined;
      workflowsMwaaProperties?: undefined;
      workflowsServerlessProperties?: undefined;
      lakehouseProperties?: undefined;
      vpcProperties?: undefined;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties?: undefined;
      hyperPodProperties?: undefined;
      iamProperties?: undefined;
      redshiftProperties?: undefined;
      sparkEmrProperties?: undefined;
      sparkGlueProperties?: undefined;
      s3Properties?: undefined;
      snowflakeProperties: SnowflakePropertiesInput;
      amazonQProperties?: undefined;
      mlflowProperties?: undefined;
      workflowsMwaaProperties?: undefined;
      workflowsServerlessProperties?: undefined;
      lakehouseProperties?: undefined;
      vpcProperties?: undefined;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties?: undefined;
      hyperPodProperties?: undefined;
      iamProperties?: undefined;
      redshiftProperties?: undefined;
      sparkEmrProperties?: undefined;
      sparkGlueProperties?: undefined;
      s3Properties?: undefined;
      snowflakeProperties?: undefined;
      amazonQProperties: AmazonQPropertiesInput;
      mlflowProperties?: undefined;
      workflowsMwaaProperties?: undefined;
      workflowsServerlessProperties?: undefined;
      lakehouseProperties?: undefined;
      vpcProperties?: undefined;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties?: undefined;
      hyperPodProperties?: undefined;
      iamProperties?: undefined;
      redshiftProperties?: undefined;
      sparkEmrProperties?: undefined;
      sparkGlueProperties?: undefined;
      s3Properties?: undefined;
      snowflakeProperties?: undefined;
      amazonQProperties?: undefined;
      mlflowProperties: MlflowPropertiesInput;
      workflowsMwaaProperties?: undefined;
      workflowsServerlessProperties?: undefined;
      lakehouseProperties?: undefined;
      vpcProperties?: undefined;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties?: undefined;
      hyperPodProperties?: undefined;
      iamProperties?: undefined;
      redshiftProperties?: undefined;
      sparkEmrProperties?: undefined;
      sparkGlueProperties?: undefined;
      s3Properties?: undefined;
      snowflakeProperties?: undefined;
      amazonQProperties?: undefined;
      mlflowProperties?: undefined;
      workflowsMwaaProperties: WorkflowsMwaaPropertiesInput;
      workflowsServerlessProperties?: undefined;
      lakehouseProperties?: undefined;
      vpcProperties?: undefined;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties?: undefined;
      hyperPodProperties?: undefined;
      iamProperties?: undefined;
      redshiftProperties?: undefined;
      sparkEmrProperties?: undefined;
      sparkGlueProperties?: undefined;
      s3Properties?: undefined;
      snowflakeProperties?: undefined;
      amazonQProperties?: undefined;
      mlflowProperties?: undefined;
      workflowsMwaaProperties?: undefined;
      workflowsServerlessProperties: WorkflowsServerlessPropertiesInput;
      lakehouseProperties?: undefined;
      vpcProperties?: undefined;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties?: undefined;
      hyperPodProperties?: undefined;
      iamProperties?: undefined;
      redshiftProperties?: undefined;
      sparkEmrProperties?: undefined;
      sparkGlueProperties?: undefined;
      s3Properties?: undefined;
      snowflakeProperties?: undefined;
      amazonQProperties?: undefined;
      mlflowProperties?: undefined;
      workflowsMwaaProperties?: undefined;
      workflowsServerlessProperties?: undefined;
      lakehouseProperties: LakehousePropertiesInput;
      vpcProperties?: undefined;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties?: undefined;
      hyperPodProperties?: undefined;
      iamProperties?: undefined;
      redshiftProperties?: undefined;
      sparkEmrProperties?: undefined;
      sparkGlueProperties?: undefined;
      s3Properties?: undefined;
      snowflakeProperties?: undefined;
      amazonQProperties?: undefined;
      mlflowProperties?: undefined;
      workflowsMwaaProperties?: undefined;
      workflowsServerlessProperties?: undefined;
      lakehouseProperties?: undefined;
      vpcProperties: VpcPropertiesInput;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties?: undefined;
      hyperPodProperties?: undefined;
      iamProperties?: undefined;
      redshiftProperties?: undefined;
      sparkEmrProperties?: undefined;
      sparkGlueProperties?: undefined;
      s3Properties?: undefined;
      snowflakeProperties?: undefined;
      amazonQProperties?: undefined;
      mlflowProperties?: undefined;
      workflowsMwaaProperties?: undefined;
      workflowsServerlessProperties?: undefined;
      lakehouseProperties?: undefined;
      vpcProperties?: undefined;
      gitProperties: GitPropertiesInput;
    };
export type ConnectionScope = "DOMAIN" | "PROJECT" | (string & {});
export interface CreateConnectionInput {
  awsLocation?: AwsLocation | undefined;
  clientToken?: string | undefined;
  configurations?: Configuration[] | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  domainIdentifier: string;
  environmentIdentifier?: string | undefined;
  name: string;
  props?: ConnectionPropertiesInput | undefined;
  enableTrustedIdentityPropagation?: boolean | undefined;
  scope?: ConnectionScope | undefined;
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
  | "ICEBERGRESTCATALOG"
  | "SNOWFLAKEICEBERGRESTCATALOG"
  | "DATABRICKSICEBERGRESTCATALOG"
  | "WORKDAYICEBERGRESTCATALOG"
  | "WORKDAYLDQ"
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
  authenticationType?: AuthenticationType | undefined;
  secretArn?: string | undefined;
  oAuth2Properties?: OAuth2Properties | undefined;
}
export interface GlueConnection {
  name?: string | undefined;
  description?: string | undefined;
  connectionType?: ConnectionType | undefined;
  matchCriteria?: string[] | undefined;
  connectionProperties?: { [key: string]: string | undefined } | undefined;
  sparkProperties?: { [key: string]: string | undefined } | undefined;
  athenaProperties?: { [key: string]: string | undefined } | undefined;
  pythonProperties?: { [key: string]: string | undefined } | undefined;
  physicalConnectionRequirements?: PhysicalConnectionRequirements | undefined;
  creationTime?: Date | undefined;
  lastUpdatedTime?: Date | undefined;
  lastUpdatedBy?: string | undefined;
  status?: ConnectionStatus | undefined;
  statusReason?: string | undefined;
  lastConnectionValidationTime?: Date | undefined;
  authenticationConfiguration?: AuthenticationConfiguration | undefined;
  connectionSchemaVersion?: number | undefined;
  compatibleComputeEnvironments?: ComputeEnvironments[] | undefined;
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
  awsLocation?: AwsLocation | undefined;
  glueConnectionName?: string | undefined;
  glueConnectionNames?: string[] | undefined;
  glueConnection?: GlueConnection | undefined;
  enableTrustedIdentityPropagation?: boolean | undefined;
  host?: string | undefined;
  port?: number | undefined;
  protocol?: Protocol | undefined;
  stage?: string | undefined;
}
export type PhysicalEndpoints = PhysicalEndpoint[];
export interface AthenaPropertiesOutput {
  workgroupName?: string | undefined;
}
export interface GluePropertiesOutput {
  status?: ConnectionStatus | undefined;
  errorMessage?: string | undefined;
}
export type HyperPodOrchestrator = "EKS" | "SLURM" | (string & {});
export interface HyperPodPropertiesOutput {
  clusterName: string;
  clusterArn?: string | undefined;
  orchestrator?: HyperPodOrchestrator | undefined;
}
export interface IamPropertiesOutput {
  environmentId?: string | undefined;
  glueLineageSyncEnabled?: boolean | undefined;
}
export interface RedshiftLineageSyncConfigurationOutput {
  lineageJobId?: string | undefined;
  enabled?: boolean | undefined;
  schedule?: LineageSyncSchedule | undefined;
}
export interface RedshiftPropertiesOutput {
  storage?: RedshiftStorageProperties | undefined;
  credentials?: RedshiftCredentials | undefined;
  isProvisionedSecret?: boolean | undefined;
  jdbcIamUrl?: string | undefined;
  jdbcUrl?: string | undefined;
  redshiftTempDir?: string | undefined;
  lineageSync?: RedshiftLineageSyncConfigurationOutput | undefined;
  status?: ConnectionStatus | undefined;
  databaseName?: string | undefined;
}
export type GovernanceType = "AWS_MANAGED" | "USER_MANAGED" | (string & {});
export interface ManagedEndpointCredentials {
  id?: string | undefined;
  token?: string | undefined;
}
export interface SparkEmrPropertiesOutput {
  computeArn?: string | undefined;
  credentials?: UsernamePassword | undefined;
  credentialsExpiration?: Date | undefined;
  governanceType?: GovernanceType | undefined;
  instanceProfileArn?: string | undefined;
  javaVirtualEnv?: string | undefined;
  livyEndpoint?: string | undefined;
  logUri?: string | undefined;
  pythonVirtualEnv?: string | undefined;
  runtimeRole?: string | undefined;
  trustedCertificatesS3Uri?: string | undefined;
  certificateData?: string | undefined;
  managedEndpointArn?: string | undefined;
  managedEndpointCredentials?: ManagedEndpointCredentials | undefined;
}
export interface SparkGluePropertiesOutput {
  additionalArgs?: SparkGlueArgs | undefined;
  glueConnectionName?: string | undefined;
  glueConnectionNames?: string[] | undefined;
  glueVersion?: string | undefined;
  idleTimeout?: number | undefined;
  javaVirtualEnv?: string | undefined;
  numberOfWorkers?: number | undefined;
  pythonVirtualEnv?: string | undefined;
  workerType?: string | undefined;
}
export interface S3PropertiesOutput {
  s3Uri: string;
  s3AccessGrantLocationId?: string | undefined;
  registerS3AccessGrantLocation?: boolean | undefined;
  status?: ConnectionStatus | undefined;
  errorMessage?: string | undefined;
}
export interface LineageSyncOutput {
  lineageJobId?: string | undefined;
  timezone?: Timezone | undefined;
  enabled?: boolean | undefined;
  schedule?: string | undefined;
}
export interface SnowflakePropertiesOutput {
  snowflakeRole: string;
  identityMapping: IdentityMapping;
  lineageSync: LineageSyncOutput;
  status: ConnectionStatus;
  errorMessage?: string | undefined;
}
export interface AmazonQPropertiesOutput {
  isEnabled: boolean;
  profileArn?: string | undefined;
  authMode?: string | undefined;
}
export interface MlflowPropertiesOutput {
  trackingServerArn?: string | undefined;
}
export interface WorkflowsMwaaPropertiesOutput {
  mwaaEnvironmentName?: string | undefined;
}
export interface WorkflowsServerlessPropertiesOutput {}
export interface LakehousePropertiesOutput {
  glueLineageSyncEnabled?: boolean | undefined;
}
export interface VpcPropertiesOutput {
  vpcId: string;
  subnetIds: string[];
  status: ConnectionStatus;
  securityGroupId?: string | undefined;
  glueConnectionNames?: string[] | undefined;
}
export interface GitPropertiesOutput {
  codeConnectionArn: string;
  repositoryId: string;
  defaultBranch: string;
  status?: ConnectionStatus | undefined;
  errorMessage?: string | undefined;
}
export type ConnectionPropertiesOutput =
  | {
      athenaProperties: AthenaPropertiesOutput;
      glueProperties?: undefined;
      hyperPodProperties?: undefined;
      iamProperties?: undefined;
      redshiftProperties?: undefined;
      sparkEmrProperties?: undefined;
      sparkGlueProperties?: undefined;
      s3Properties?: undefined;
      snowflakeProperties?: undefined;
      amazonQProperties?: undefined;
      mlflowProperties?: undefined;
      workflowsMwaaProperties?: undefined;
      workflowsServerlessProperties?: undefined;
      lakehouseProperties?: undefined;
      vpcProperties?: undefined;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties: GluePropertiesOutput;
      hyperPodProperties?: undefined;
      iamProperties?: undefined;
      redshiftProperties?: undefined;
      sparkEmrProperties?: undefined;
      sparkGlueProperties?: undefined;
      s3Properties?: undefined;
      snowflakeProperties?: undefined;
      amazonQProperties?: undefined;
      mlflowProperties?: undefined;
      workflowsMwaaProperties?: undefined;
      workflowsServerlessProperties?: undefined;
      lakehouseProperties?: undefined;
      vpcProperties?: undefined;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties?: undefined;
      hyperPodProperties: HyperPodPropertiesOutput;
      iamProperties?: undefined;
      redshiftProperties?: undefined;
      sparkEmrProperties?: undefined;
      sparkGlueProperties?: undefined;
      s3Properties?: undefined;
      snowflakeProperties?: undefined;
      amazonQProperties?: undefined;
      mlflowProperties?: undefined;
      workflowsMwaaProperties?: undefined;
      workflowsServerlessProperties?: undefined;
      lakehouseProperties?: undefined;
      vpcProperties?: undefined;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties?: undefined;
      hyperPodProperties?: undefined;
      iamProperties: IamPropertiesOutput;
      redshiftProperties?: undefined;
      sparkEmrProperties?: undefined;
      sparkGlueProperties?: undefined;
      s3Properties?: undefined;
      snowflakeProperties?: undefined;
      amazonQProperties?: undefined;
      mlflowProperties?: undefined;
      workflowsMwaaProperties?: undefined;
      workflowsServerlessProperties?: undefined;
      lakehouseProperties?: undefined;
      vpcProperties?: undefined;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties?: undefined;
      hyperPodProperties?: undefined;
      iamProperties?: undefined;
      redshiftProperties: RedshiftPropertiesOutput;
      sparkEmrProperties?: undefined;
      sparkGlueProperties?: undefined;
      s3Properties?: undefined;
      snowflakeProperties?: undefined;
      amazonQProperties?: undefined;
      mlflowProperties?: undefined;
      workflowsMwaaProperties?: undefined;
      workflowsServerlessProperties?: undefined;
      lakehouseProperties?: undefined;
      vpcProperties?: undefined;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties?: undefined;
      hyperPodProperties?: undefined;
      iamProperties?: undefined;
      redshiftProperties?: undefined;
      sparkEmrProperties: SparkEmrPropertiesOutput;
      sparkGlueProperties?: undefined;
      s3Properties?: undefined;
      snowflakeProperties?: undefined;
      amazonQProperties?: undefined;
      mlflowProperties?: undefined;
      workflowsMwaaProperties?: undefined;
      workflowsServerlessProperties?: undefined;
      lakehouseProperties?: undefined;
      vpcProperties?: undefined;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties?: undefined;
      hyperPodProperties?: undefined;
      iamProperties?: undefined;
      redshiftProperties?: undefined;
      sparkEmrProperties?: undefined;
      sparkGlueProperties: SparkGluePropertiesOutput;
      s3Properties?: undefined;
      snowflakeProperties?: undefined;
      amazonQProperties?: undefined;
      mlflowProperties?: undefined;
      workflowsMwaaProperties?: undefined;
      workflowsServerlessProperties?: undefined;
      lakehouseProperties?: undefined;
      vpcProperties?: undefined;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties?: undefined;
      hyperPodProperties?: undefined;
      iamProperties?: undefined;
      redshiftProperties?: undefined;
      sparkEmrProperties?: undefined;
      sparkGlueProperties?: undefined;
      s3Properties: S3PropertiesOutput;
      snowflakeProperties?: undefined;
      amazonQProperties?: undefined;
      mlflowProperties?: undefined;
      workflowsMwaaProperties?: undefined;
      workflowsServerlessProperties?: undefined;
      lakehouseProperties?: undefined;
      vpcProperties?: undefined;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties?: undefined;
      hyperPodProperties?: undefined;
      iamProperties?: undefined;
      redshiftProperties?: undefined;
      sparkEmrProperties?: undefined;
      sparkGlueProperties?: undefined;
      s3Properties?: undefined;
      snowflakeProperties: SnowflakePropertiesOutput;
      amazonQProperties?: undefined;
      mlflowProperties?: undefined;
      workflowsMwaaProperties?: undefined;
      workflowsServerlessProperties?: undefined;
      lakehouseProperties?: undefined;
      vpcProperties?: undefined;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties?: undefined;
      hyperPodProperties?: undefined;
      iamProperties?: undefined;
      redshiftProperties?: undefined;
      sparkEmrProperties?: undefined;
      sparkGlueProperties?: undefined;
      s3Properties?: undefined;
      snowflakeProperties?: undefined;
      amazonQProperties: AmazonQPropertiesOutput;
      mlflowProperties?: undefined;
      workflowsMwaaProperties?: undefined;
      workflowsServerlessProperties?: undefined;
      lakehouseProperties?: undefined;
      vpcProperties?: undefined;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties?: undefined;
      hyperPodProperties?: undefined;
      iamProperties?: undefined;
      redshiftProperties?: undefined;
      sparkEmrProperties?: undefined;
      sparkGlueProperties?: undefined;
      s3Properties?: undefined;
      snowflakeProperties?: undefined;
      amazonQProperties?: undefined;
      mlflowProperties: MlflowPropertiesOutput;
      workflowsMwaaProperties?: undefined;
      workflowsServerlessProperties?: undefined;
      lakehouseProperties?: undefined;
      vpcProperties?: undefined;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties?: undefined;
      hyperPodProperties?: undefined;
      iamProperties?: undefined;
      redshiftProperties?: undefined;
      sparkEmrProperties?: undefined;
      sparkGlueProperties?: undefined;
      s3Properties?: undefined;
      snowflakeProperties?: undefined;
      amazonQProperties?: undefined;
      mlflowProperties?: undefined;
      workflowsMwaaProperties: WorkflowsMwaaPropertiesOutput;
      workflowsServerlessProperties?: undefined;
      lakehouseProperties?: undefined;
      vpcProperties?: undefined;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties?: undefined;
      hyperPodProperties?: undefined;
      iamProperties?: undefined;
      redshiftProperties?: undefined;
      sparkEmrProperties?: undefined;
      sparkGlueProperties?: undefined;
      s3Properties?: undefined;
      snowflakeProperties?: undefined;
      amazonQProperties?: undefined;
      mlflowProperties?: undefined;
      workflowsMwaaProperties?: undefined;
      workflowsServerlessProperties: WorkflowsServerlessPropertiesOutput;
      lakehouseProperties?: undefined;
      vpcProperties?: undefined;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties?: undefined;
      hyperPodProperties?: undefined;
      iamProperties?: undefined;
      redshiftProperties?: undefined;
      sparkEmrProperties?: undefined;
      sparkGlueProperties?: undefined;
      s3Properties?: undefined;
      snowflakeProperties?: undefined;
      amazonQProperties?: undefined;
      mlflowProperties?: undefined;
      workflowsMwaaProperties?: undefined;
      workflowsServerlessProperties?: undefined;
      lakehouseProperties: LakehousePropertiesOutput;
      vpcProperties?: undefined;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties?: undefined;
      hyperPodProperties?: undefined;
      iamProperties?: undefined;
      redshiftProperties?: undefined;
      sparkEmrProperties?: undefined;
      sparkGlueProperties?: undefined;
      s3Properties?: undefined;
      snowflakeProperties?: undefined;
      amazonQProperties?: undefined;
      mlflowProperties?: undefined;
      workflowsMwaaProperties?: undefined;
      workflowsServerlessProperties?: undefined;
      lakehouseProperties?: undefined;
      vpcProperties: VpcPropertiesOutput;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties?: undefined;
      hyperPodProperties?: undefined;
      iamProperties?: undefined;
      redshiftProperties?: undefined;
      sparkEmrProperties?: undefined;
      sparkGlueProperties?: undefined;
      s3Properties?: undefined;
      snowflakeProperties?: undefined;
      amazonQProperties?: undefined;
      mlflowProperties?: undefined;
      workflowsMwaaProperties?: undefined;
      workflowsServerlessProperties?: undefined;
      lakehouseProperties?: undefined;
      vpcProperties?: undefined;
      gitProperties: GitPropertiesOutput;
    };
export interface CreateConnectionOutput {
  connectionId: string;
  configurations?: Configuration[] | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  domainId: string;
  domainUnitId: string;
  environmentId?: string | undefined;
  name: string;
  physicalEndpoints: PhysicalEndpoint[];
  projectId?: string | undefined;
  props?: ConnectionPropertiesOutput | undefined;
  type: ConnectionType;
  scope?: ConnectionScope | undefined;
}
export type DataProductName = string | redacted.Redacted<string>;
export type DataProductDescription = string | redacted.Redacted<string>;
export type DataProductItemType = "ASSET" | (string & {});
export type ItemGlossaryTerms = string[];
export interface DataProductItem {
  itemType: DataProductItemType;
  identifier: string;
  revision?: string | undefined;
  glossaryTerms?: string[] | undefined;
}
export type DataProductItems = DataProductItem[];
export interface CreateDataProductInput {
  domainIdentifier: string;
  name: string | redacted.Redacted<string>;
  owningProjectIdentifier: string;
  description?: string | redacted.Redacted<string> | undefined;
  glossaryTerms?: string[] | undefined;
  formsInput?: FormInput[] | undefined;
  items?: DataProductItem[] | undefined;
  clientToken?: string | undefined;
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
  description?: string | redacted.Redacted<string> | undefined;
  glossaryTerms?: string[] | undefined;
  items?: DataProductItem[] | undefined;
  formsOutput?: FormOutput[] | undefined;
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
  firstRevisionCreatedAt?: Date | undefined;
  firstRevisionCreatedBy?: string | undefined;
}
export interface CreateDataProductRevisionInput {
  domainIdentifier: string;
  identifier: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string> | undefined;
  glossaryTerms?: string[] | undefined;
  items?: DataProductItem[] | undefined;
  formsInput?: FormInput[] | undefined;
  clientToken?: string | undefined;
}
export interface CreateDataProductRevisionOutput {
  domainId: string;
  id: string;
  revision: string;
  owningProjectId: string;
  name: string | redacted.Redacted<string>;
  status: DataProductStatus;
  description?: string | redacted.Redacted<string> | undefined;
  glossaryTerms?: string[] | undefined;
  items?: DataProductItem[] | undefined;
  formsOutput?: FormOutput[] | undefined;
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
  firstRevisionCreatedAt?: Date | undefined;
  firstRevisionCreatedBy?: string | undefined;
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
  schemaName?: string | undefined;
  filterExpressions?: FilterExpression[] | undefined;
}
export type RelationalFilterConfigurations = RelationalFilterConfiguration[];
export interface GlueRunConfigurationInput {
  dataAccessRole?: string | undefined;
  relationalFilterConfigurations: RelationalFilterConfiguration[];
  autoImportDataQualityResult?: boolean | undefined;
  catalogName?: string | undefined;
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
  | { redshiftClusterSource: RedshiftClusterStorage; redshiftServerlessSource?: undefined }
  | { redshiftClusterSource?: undefined; redshiftServerlessSource: RedshiftServerlessStorage };
export interface RedshiftRunConfigurationInput {
  dataAccessRole?: string | undefined;
  relationalFilterConfigurations: RelationalFilterConfiguration[];
  redshiftCredentialConfiguration?: RedshiftCredentialConfiguration | undefined;
  redshiftStorage?: RedshiftStorage | undefined;
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
      redshiftRunConfiguration?: undefined;
      sageMakerRunConfiguration?: undefined;
    }
  | {
      glueRunConfiguration?: undefined;
      redshiftRunConfiguration: RedshiftRunConfigurationInput;
      sageMakerRunConfiguration?: undefined;
    }
  | {
      glueRunConfiguration?: undefined;
      redshiftRunConfiguration?: undefined;
      sageMakerRunConfiguration: SageMakerRunConfigurationInput;
    };
export interface RecommendationConfiguration {
  enableBusinessNameGeneration?: boolean | undefined;
}
export type EnableSetting = "ENABLED" | "DISABLED" | (string & {});
export type CronString = string;
export interface ScheduleConfiguration {
  timezone?: Timezone | undefined;
  schedule?: string | undefined;
}
export interface CreateDataSourceInput {
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string> | undefined;
  domainIdentifier: string;
  projectIdentifier: string;
  environmentIdentifier?: string | undefined;
  connectionIdentifier?: string | undefined;
  type: string;
  configuration?: DataSourceConfigurationInput | undefined;
  recommendation?: RecommendationConfiguration | undefined;
  enableSetting?: EnableSetting | undefined;
  schedule?: ScheduleConfiguration | undefined;
  publishOnImport?: boolean | undefined;
  assetFormsInput?: FormInput[] | undefined;
  clientToken?: string | undefined;
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
  accountId?: string | undefined;
  region?: string | undefined;
  dataAccessRole?: string | undefined;
  relationalFilterConfigurations: RelationalFilterConfiguration[];
  autoImportDataQualityResult?: boolean | undefined;
  catalogName?: string | undefined;
}
export interface RedshiftRunConfigurationOutput {
  accountId?: string | undefined;
  region?: string | undefined;
  dataAccessRole?: string | undefined;
  relationalFilterConfigurations: RelationalFilterConfiguration[];
  redshiftCredentialConfiguration?: RedshiftCredentialConfiguration | undefined;
  redshiftStorage: RedshiftStorage;
}
export interface SageMakerRunConfigurationOutput {
  accountId?: string | undefined;
  region?: string | undefined;
  trackingAssets: { [key: string]: string[] | undefined };
}
export type DataSourceConfigurationOutput =
  | {
      glueRunConfiguration: GlueRunConfigurationOutput;
      redshiftRunConfiguration?: undefined;
      sageMakerRunConfiguration?: undefined;
    }
  | {
      glueRunConfiguration?: undefined;
      redshiftRunConfiguration: RedshiftRunConfigurationOutput;
      sageMakerRunConfiguration?: undefined;
    }
  | {
      glueRunConfiguration?: undefined;
      redshiftRunConfiguration?: undefined;
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
  errorDetail?: string | undefined;
}
export interface CreateDataSourceOutput {
  id: string;
  status?: DataSourceStatus | undefined;
  type?: string | undefined;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string> | undefined;
  domainId: string;
  projectId: string;
  environmentId?: string | undefined;
  connectionId?: string | undefined;
  configuration?: DataSourceConfigurationOutput | undefined;
  recommendation?: RecommendationConfiguration | undefined;
  enableSetting?: EnableSetting | undefined;
  publishOnImport?: boolean | undefined;
  assetFormsOutput?: FormOutput[] | undefined;
  schedule?: ScheduleConfiguration | undefined;
  lastRunStatus?: DataSourceRunStatus | undefined;
  lastRunAt?: Date | undefined;
  lastRunErrorMessage?: DataSourceErrorMessage | undefined;
  errorMessage?: DataSourceErrorMessage | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
export type DesignationName = string;
export type CedarDesignationPolicy = string;
export interface CreateDesignationInput {
  domainIdentifier: string;
  name: string;
  description?: string | redacted.Redacted<string> | undefined;
  policy: string;
  deletionProtection?: boolean | undefined;
}
export type DesignationType = "MANAGED" | "USER_CREATED" | (string & {});
export interface CreateDesignationOutput {
  domainId: string;
  id: string;
  name: string;
  description?: string | redacted.Redacted<string> | undefined;
  designationType: DesignationType;
  policy: string;
  deletionProtection: boolean;
  createdBy: string;
  createdAt?: Date | undefined;
  lastUpdatedAt?: Date | undefined;
}
export type AuthType = "IAM_IDC" | "DISABLED" | (string & {});
export type UserAssignment = "AUTOMATIC" | "MANUAL" | (string & {});
export interface SingleSignOn {
  type?: AuthType | undefined;
  userAssignment?: UserAssignment | undefined;
  idcInstanceArn?: string | undefined;
}
export type KmsKeyArn = string;
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export type DomainVersion = "V1" | "V2" | (string & {});
export interface CreateDomainInput {
  name: string;
  description?: string | undefined;
  singleSignOn?: SingleSignOn | undefined;
  domainExecutionRole?: string | undefined;
  kmsKeyIdentifier?: string | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
  domainVersion?: DomainVersion | undefined;
  serviceRole?: string | undefined;
  clientToken?: string | undefined;
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
  rootDomainUnitId?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  singleSignOn?: SingleSignOn | undefined;
  domainExecutionRole?: string | undefined;
  arn?: string | undefined;
  kmsKeyIdentifier?: string | undefined;
  status?: DomainStatus | undefined;
  portalUrl?: string | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
  domainVersion?: DomainVersion | undefined;
  serviceRole?: string | undefined;
}
export type DomainUnitName = string | redacted.Redacted<string>;
export type DomainUnitDescription = string | redacted.Redacted<string>;
export interface CreateDomainUnitInput {
  domainIdentifier: string;
  name: string | redacted.Redacted<string>;
  parentDomainUnitIdentifier: string;
  description?: string | redacted.Redacted<string> | undefined;
  clientToken?: string | undefined;
}
export interface DomainUnitUserProperties {
  userId?: string | undefined;
}
export interface DomainUnitGroupProperties {
  groupId?: string | undefined;
}
export type DomainUnitOwnerProperties =
  | { user: DomainUnitUserProperties; group?: undefined }
  | { user?: undefined; group: DomainUnitGroupProperties };
export type DomainUnitOwners = DomainUnitOwnerProperties[];
export type DomainUnitIds = string[];
export interface CreateDomainUnitOutput {
  id: string;
  domainId: string;
  name: string | redacted.Redacted<string>;
  parentDomainUnitId?: string | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  owners: DomainUnitOwnerProperties[];
  ancestorDomainUnitIds: string[];
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
}
export type EnvironmentProfileId = string;
export interface EnvironmentParameter {
  name?: string | undefined;
  value?: string | undefined;
}
export type EnvironmentParametersList = EnvironmentParameter[];
export type EnvironmentConfigurationName = string | redacted.Redacted<string>;
export interface CreateEnvironmentInput {
  projectIdentifier: string;
  domainIdentifier: string;
  description?: string | undefined;
  name: string;
  environmentProfileIdentifier?: string | undefined;
  userParameters?: EnvironmentParameter[] | undefined;
  glossaryTerms?: string[] | undefined;
  environmentAccountIdentifier?: string | undefined;
  environmentAccountRegion?: string | undefined;
  environmentBlueprintIdentifier?: string | undefined;
  deploymentOrder?: number | undefined;
  environmentConfigurationId?: string | undefined;
  environmentConfigurationName?: string | redacted.Redacted<string> | undefined;
}
export type EnvironmentName = string | redacted.Redacted<string>;
export interface Resource {
  provider?: string | undefined;
  name?: string | undefined;
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
  key?: string | undefined;
  value?: string | undefined;
}
export type ConfigurableActionParameterList = ConfigurableActionParameter[];
export interface ConfigurableEnvironmentAction {
  type: string;
  auth?: ConfigurableActionTypeAuthorization | undefined;
  parameters: ConfigurableActionParameter[];
}
export type EnvironmentActionList = ConfigurableEnvironmentAction[];
export interface CustomParameter {
  keyName: string;
  description?: string | redacted.Redacted<string> | undefined;
  fieldType: string;
  defaultValue?: string | undefined;
  isEditable?: boolean | undefined;
  isOptional?: boolean | undefined;
  isUpdateSupported?: boolean | undefined;
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
  code?: string | undefined;
  message: string;
}
export type DeploymentMessage = string;
export type DeploymentMessagesList = string[];
export interface Deployment {
  deploymentId?: string | undefined;
  deploymentType?: DeploymentType | undefined;
  deploymentStatus?: DeploymentStatus | undefined;
  failureReason?: EnvironmentError | undefined;
  messages?: string[] | undefined;
  isDeploymentComplete?: boolean | undefined;
}
export interface CloudFormationProperties {
  templateUrl: string;
}
export type ProvisioningProperties =
  | { cloudFormation: CloudFormationProperties; manual?: undefined }
  | { cloudFormation?: undefined; manual: Record<string, never> };
export interface DeploymentProperties {
  startTimeoutMinutes?: number | undefined;
  endTimeoutMinutes?: number | undefined;
}
export type EnvironmentBlueprintId = string;
export type EnvironmentConfigurationId = string | redacted.Redacted<string>;
export interface CreateEnvironmentOutput {
  projectId: string;
  id?: string | undefined;
  domainId: string;
  createdBy: string;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string> | undefined;
  environmentProfileId?: string | undefined;
  awsAccountId?: string | undefined;
  awsAccountRegion?: string | undefined;
  provider: string;
  provisionedResources?: Resource[] | undefined;
  status?: EnvironmentStatus | undefined;
  environmentActions?: ConfigurableEnvironmentAction[] | undefined;
  glossaryTerms?: string[] | undefined;
  userParameters?: CustomParameter[] | undefined;
  lastDeployment?: Deployment | undefined;
  provisioningProperties?: ProvisioningProperties | undefined;
  deploymentProperties?: DeploymentProperties | undefined;
  environmentBlueprintId?: string | undefined;
  environmentConfigurationId?: string | redacted.Redacted<string> | undefined;
  environmentConfigurationName?: string | redacted.Redacted<string> | undefined;
}
export interface AwsConsoleLinkParameters {
  uri?: string | undefined;
}
export type ActionParameters = { awsConsoleLink: AwsConsoleLinkParameters };
export interface CreateEnvironmentActionInput {
  domainIdentifier: string;
  environmentIdentifier: string;
  name: string;
  parameters: ActionParameters;
  description?: string | undefined;
}
export type EnvironmentActionId = string;
export interface CreateEnvironmentActionOutput {
  domainId: string;
  environmentId: string;
  id: string;
  name: string;
  parameters: ActionParameters;
  description?: string | undefined;
}
export type EnvironmentBlueprintName = string;
export type BlueprintCategory = "TOOLING" | (string & {});
export interface CreateEnvironmentBlueprintInput {
  domainIdentifier: string;
  name: string;
  description?: string | redacted.Redacted<string> | undefined;
  provisioningProperties: ProvisioningProperties;
  userParameters?: CustomParameter[] | undefined;
  blueprintCategory?: BlueprintCategory | undefined;
}
export interface CreateEnvironmentBlueprintOutput {
  id: string;
  name: string;
  description?: string | redacted.Redacted<string> | undefined;
  provider: string;
  provisioningProperties: ProvisioningProperties;
  deploymentProperties?: DeploymentProperties | undefined;
  userParameters?: CustomParameter[] | undefined;
  glossaryTerms?: string[] | undefined;
  blueprintCategory?: BlueprintCategory | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
export type EnvironmentProfileName = string | redacted.Redacted<string>;
export interface CreateEnvironmentProfileInput {
  domainIdentifier: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string> | undefined;
  environmentBlueprintIdentifier: string;
  projectIdentifier: string;
  userParameters?: EnvironmentParameter[] | undefined;
  awsAccountId?: string | undefined;
  awsAccountRegion?: string | undefined;
}
export interface CreateEnvironmentProfileOutput {
  id: string;
  domainId: string;
  awsAccountId?: string | undefined;
  awsAccountRegion?: string | undefined;
  createdBy: string;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string> | undefined;
  environmentBlueprintId: string;
  projectId?: string | undefined;
  userParameters?: CustomParameter[] | undefined;
}
export type Smithy = string;
export type Model = { smithy: string };
export type FormTypeStatus = "ENABLED" | "DISABLED" | (string & {});
export interface CreateFormTypeInput {
  domainIdentifier: string;
  name: string | redacted.Redacted<string>;
  model: Model;
  owningProjectIdentifier: string;
  status?: FormTypeStatus | undefined;
  description?: string | redacted.Redacted<string> | undefined;
}
export interface CreateFormTypeOutput {
  domainId: string;
  name: string | redacted.Redacted<string>;
  revision: string;
  description?: string | redacted.Redacted<string> | undefined;
  owningProjectId?: string | undefined;
  originDomainId?: string | undefined;
  originProjectId?: string | undefined;
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
  description?: string | redacted.Redacted<string> | undefined;
  status?: GlossaryStatus | undefined;
  usageRestrictions?: GlossaryUsageRestriction[] | undefined;
  clientToken?: string | undefined;
}
export type GlossaryId = string;
export interface CreateGlossaryOutput {
  domainId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  owningProjectId: string;
  description?: string | redacted.Redacted<string> | undefined;
  status?: GlossaryStatus | undefined;
  usageRestrictions?: GlossaryUsageRestriction[] | undefined;
}
export type GlossaryTermStatus = "ENABLED" | "DISABLED" | (string & {});
export type LongDescription = string | redacted.Redacted<string>;
export interface TermRelations {
  isA?: string[] | undefined;
  classifies?: string[] | undefined;
}
export interface CreateGlossaryTermInput {
  domainIdentifier: string;
  glossaryIdentifier: string;
  name: string | redacted.Redacted<string>;
  status?: GlossaryTermStatus | undefined;
  shortDescription?: string | redacted.Redacted<string> | undefined;
  longDescription?: string | redacted.Redacted<string> | undefined;
  termRelations?: TermRelations | undefined;
  clientToken?: string | undefined;
}
export interface CreateGlossaryTermOutput {
  id: string;
  domainId: string;
  glossaryId: string;
  name: string | redacted.Redacted<string>;
  status: GlossaryTermStatus;
  shortDescription?: string | redacted.Redacted<string> | undefined;
  longDescription?: string | redacted.Redacted<string> | undefined;
  termRelations?: TermRelations | undefined;
  usageRestrictions?: GlossaryUsageRestriction[] | undefined;
}
export interface CreateGroupProfileInput {
  domainIdentifier: string;
  groupIdentifier?: string | undefined;
  rolePrincipalArn?: string | undefined;
  clientToken?: string | undefined;
}
export type GroupProfileStatus = "ASSIGNED" | "NOT_ASSIGNED" | (string & {});
export interface CreateGroupProfileOutput {
  domainId?: string | undefined;
  id?: string | undefined;
  status?: GroupProfileStatus | undefined;
  groupName?: string | redacted.Redacted<string> | undefined;
  rolePrincipalArn?: string | undefined;
  rolePrincipalId?: string | undefined;
}
export type EntityType = "ASSET" | "DATA_PRODUCT" | (string & {});
export type ChangeAction = "PUBLISH" | "UNPUBLISH" | (string & {});
export interface CreateListingChangeSetInput {
  domainIdentifier: string;
  entityIdentifier: string;
  entityType: EntityType;
  entityRevision?: string | undefined;
  action: ChangeAction;
  clientToken?: string | undefined;
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
  description?: string | redacted.Redacted<string> | undefined;
  type?: NotebookType | undefined;
  metadata?: { [key: string]: string | redacted.Redacted<string> | undefined } | undefined;
  parameters?: { [key: string]: string | undefined } | undefined;
  clientToken?: string | undefined;
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
  packageSpecification?: string | undefined;
}
export interface EnvironmentConfig {
  imageVersion?: string | undefined;
  packageConfig?: PackageConfig | undefined;
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
  fileName?: string | undefined;
  committedAt?: Date | undefined;
  commitMessage?: string | redacted.Redacted<string> | undefined;
}
export interface CreateNotebookOutput {
  id: string;
  name: string | redacted.Redacted<string>;
  owningProjectId: string;
  domainId: string;
  cellOrder: CellInformation[];
  status: NotebookStatus;
  type?: NotebookType | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
  updatedAt?: Date | undefined;
  updatedBy?: string | undefined;
  lockedBy?: string | undefined;
  lockedAt?: Date | undefined;
  lockExpiresAt?: Date | undefined;
  computeId?: string | undefined;
  metadata?: { [key: string]: string | redacted.Redacted<string> | undefined } | undefined;
  parameters?: { [key: string]: string | undefined } | undefined;
  environmentConfiguration?: EnvironmentConfig | undefined;
  error?: NotebookError | undefined;
  gitMetadata?: GitMetadata | undefined;
}
export type ProjectProfileId = string;
export interface EnvironmentResolvedAccount {
  awsAccountId: string;
  regionName: string;
  sourceAccountPoolId?: string | undefined;
}
export interface EnvironmentConfigurationUserParameter {
  environmentId?: string | undefined;
  environmentResolvedAccount?: EnvironmentResolvedAccount | undefined;
  environmentConfigurationName?: string | redacted.Redacted<string> | undefined;
  environmentParameters?: EnvironmentParameter[] | undefined;
}
export type EnvironmentConfigurationUserParametersList = EnvironmentConfigurationUserParameter[];
export type Member =
  | { userIdentifier: string; groupIdentifier?: undefined }
  | { userIdentifier?: undefined; groupIdentifier: string };
export type UserDesignation =
  | "PROJECT_OWNER"
  | "PROJECT_CONTRIBUTOR"
  | "PROJECT_CATALOG_VIEWER"
  | "PROJECT_CATALOG_CONSUMER"
  | "PROJECT_CATALOG_STEWARD"
  | "USER_CREATED_DESIGNATION"
  | (string & {});
export interface ProjectMembershipAssignment {
  member: Member;
  designation: UserDesignation;
  userCreatedDesignationId?: string | undefined;
}
export type ProjectMembershipAssignments = ProjectMembershipAssignment[];
export interface CreateProjectInput {
  domainIdentifier: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string> | undefined;
  resourceTags?: { [key: string]: string | undefined } | undefined;
  glossaryTerms?: string[] | undefined;
  domainUnitId?: string | undefined;
  projectProfileId?: string | undefined;
  userParameters?: EnvironmentConfigurationUserParameter[] | undefined;
  projectCategory?: string | undefined;
  projectExecutionRole?: string | undefined;
  membershipAssignments?: ProjectMembershipAssignment[] | undefined;
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
  code?: string | undefined;
  message?: string | undefined;
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
  overallDeploymentStatus?: OverallDeploymentStatus | undefined;
  environmentFailureReasons?: { [key: string]: EnvironmentError[] | undefined } | undefined;
}
export interface CreateProjectOutput {
  domainId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string> | undefined;
  projectStatus?: ProjectStatus | undefined;
  failureReasons?: ProjectDeletionError[] | undefined;
  createdBy: string;
  createdAt?: Date | undefined;
  lastUpdatedAt?: Date | undefined;
  resourceTags?: ResourceTag[] | undefined;
  glossaryTerms?: string[] | undefined;
  domainUnitId?: string | undefined;
  projectProfileId?: string | undefined;
  userParameters?: EnvironmentConfigurationUserParameter[] | undefined;
  environmentDeploymentDetails?: EnvironmentDeploymentDetails | undefined;
  projectCategory?: string | undefined;
}
export interface CreateProjectMembershipInput {
  domainIdentifier: string;
  projectIdentifier: string;
  member: Member;
  designation: UserDesignation;
  userCreatedDesignationId?: string | undefined;
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
  name?: string | undefined;
  value?: string | undefined;
  isEditable?: boolean | undefined;
}
export type EnvironmentConfigurationParametersList = EnvironmentConfigurationParameter[];
export interface EnvironmentConfigurationParametersDetails {
  ssmPath?: string | undefined;
  parameterOverrides?: EnvironmentConfigurationParameter[] | undefined;
  resolvedParameters?: EnvironmentConfigurationParameter[] | undefined;
}
export type AwsAccount =
  | { awsAccountId: string; awsAccountIdPath?: undefined }
  | { awsAccountId?: undefined; awsAccountIdPath: string };
export type AccountPoolList = string[];
export type RegionName = string;
export type Region =
  | { regionName: string; regionNamePath?: undefined }
  | { regionName?: undefined; regionNamePath: string };
const Region = /*@__PURE__*/ __L.at(__c265, 0);
export type DeploymentOrder = number;
export interface EnvironmentConfiguration {
  name: string | redacted.Redacted<string>;
  id?: string | redacted.Redacted<string> | undefined;
  environmentBlueprintId: string;
  description?: string | redacted.Redacted<string> | undefined;
  deploymentMode?: DeploymentMode | undefined;
  configurationParameters?: EnvironmentConfigurationParametersDetails | undefined;
  awsAccount?: AwsAccount | undefined;
  accountPools?: string[] | undefined;
  awsRegion?: Region | undefined;
  deploymentOrder?: number | undefined;
}
export type EnvironmentConfigurationsList = EnvironmentConfiguration[];
export interface CreateProjectProfileInput {
  domainIdentifier: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string> | undefined;
  status?: Status | undefined;
  projectResourceTags?: ResourceTagParameter[] | undefined;
  allowCustomProjectResourceTags?: boolean | undefined;
  projectResourceTagsDescription?: string | redacted.Redacted<string> | undefined;
  environmentConfigurations?: EnvironmentConfiguration[] | undefined;
  domainUnitIdentifier?: string | undefined;
}
export interface CreateProjectProfileOutput {
  domainId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string> | undefined;
  status?: Status | undefined;
  projectResourceTags?: ResourceTagParameter[] | undefined;
  allowCustomProjectResourceTags?: boolean | undefined;
  projectResourceTagsDescription?: string | redacted.Redacted<string> | undefined;
  environmentConfigurations?: EnvironmentConfiguration[] | undefined;
  createdBy: string;
  createdAt?: Date | undefined;
  lastUpdatedAt?: Date | undefined;
  domainUnitId?: string | undefined;
}
export type RuleName = string | redacted.Redacted<string>;
export interface DomainUnitTarget {
  domainUnitId: string;
  includeChildDomainUnits?: boolean | undefined;
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
  specificAssetTypes?: string[] | undefined;
}
export type RuleProjectIdentifierList = string[];
export interface ProjectsForRule {
  selectionMode: RuleScopeSelectionMode;
  specificProjects?: string[] | undefined;
}
export interface RuleScope {
  assetType?: AssetTypesForRule | undefined;
  dataProduct?: boolean | undefined;
  project?: ProjectsForRule | undefined;
}
export interface MetadataFormReference {
  typeIdentifier: string;
  typeRevision: string;
}
export type RequiredMetadataFormList = MetadataFormReference[];
export interface MetadataFormEnforcementDetail {
  requiredMetadataForms?: MetadataFormReference[] | undefined;
}
export type GlossaryTermIdentifiers = string[];
export interface GlossaryTermEnforcementDetail {
  requiredGlossaryTermIds?: string[] | undefined;
}
export type RuleDetail =
  | {
      metadataFormEnforcementDetail: MetadataFormEnforcementDetail;
      glossaryTermEnforcementDetail?: undefined;
    }
  | {
      metadataFormEnforcementDetail?: undefined;
      glossaryTermEnforcementDetail: GlossaryTermEnforcementDetail;
    };
export interface CreateRuleInput {
  domainIdentifier: string;
  name: string | redacted.Redacted<string>;
  target: RuleTarget;
  action: RuleAction;
  scope: RuleScope;
  detail: RuleDetail;
  description?: string | redacted.Redacted<string> | undefined;
  clientToken?: string | undefined;
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
  targetType?: RuleTargetType | undefined;
  description?: string | redacted.Redacted<string> | undefined;
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
  subscriptionTargetIdentifier?: string | undefined;
  grantedEntity: GrantedEntityInput;
  assetTargetNames?: AssetTargetNameMap[] | undefined;
  clientToken?: string | undefined;
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
  message?: string | undefined;
}
export interface SubscribedAsset {
  assetId: string;
  assetRevision: string;
  status: SubscriptionGrantStatus;
  targetName?: string | undefined;
  failureCause?: FailureCause | undefined;
  grantedTimestamp?: Date | undefined;
  failureTimestamp?: Date | undefined;
  assetScope?: AssetScope | undefined;
  permissions?: Permissions | undefined;
}
export type SubscribedAssets = SubscribedAsset[];
export interface CreateSubscriptionGrantOutput {
  id: string;
  createdBy: string;
  updatedBy?: string | undefined;
  domainId: string;
  createdAt: Date;
  updatedAt: Date;
  environmentId?: string | undefined;
  subscriptionTargetId: string;
  grantedEntity: GrantedEntity;
  status: SubscriptionGrantOverallStatus;
  assets?: SubscribedAsset[] | undefined;
  subscriptionId?: string | undefined;
}
export interface SubscribedProjectInput {
  identifier?: string | undefined;
}
export interface SubscribedUserInput {
  identifier?: string | undefined;
}
export interface SubscribedGroupInput {
  identifier?: string | undefined;
}
export interface SubscribedIamPrincipalInput {
  identifier?: string | undefined;
}
export type SubscribedPrincipalInput =
  | { project: SubscribedProjectInput; user?: undefined; group?: undefined; iam?: undefined }
  | { project?: undefined; user: SubscribedUserInput; group?: undefined; iam?: undefined }
  | { project?: undefined; user?: undefined; group: SubscribedGroupInput; iam?: undefined }
  | { project?: undefined; user?: undefined; group?: undefined; iam: SubscribedIamPrincipalInput };
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
  clientToken?: string | undefined;
  metadataForms?: FormInput[] | undefined;
  assetPermissions?: AssetPermission[] | undefined;
  assetScopes?: AcceptedAssetScope[] | undefined;
}
export interface CreateSubscriptionRequestOutput {
  id: string;
  createdBy: string;
  updatedBy?: string | undefined;
  domainId: string;
  status: SubscriptionRequestStatus;
  createdAt: Date;
  updatedAt: Date;
  requestReason: string | redacted.Redacted<string>;
  subscribedPrincipals: SubscribedPrincipal[];
  subscribedListings: SubscribedListing[];
  reviewerId?: string | undefined;
  decisionComment?: string | redacted.Redacted<string> | undefined;
  existingSubscriptionId?: string | undefined;
  metadataForms?: FormOutput[] | undefined;
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
  provider?: string | undefined;
  clientToken?: string | undefined;
  subscriptionGrantCreationMode?: SubscriptionGrantCreationMode | undefined;
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
  updatedBy?: string | undefined;
  createdAt: Date;
  updatedAt?: Date | undefined;
  manageAccessRole?: string | undefined;
  applicableAssetTypes: string[];
  subscriptionTargetConfig: SubscriptionTargetForm[];
  provider: string;
  subscriptionGrantCreationMode?: SubscriptionGrantCreationMode | undefined;
}
export type UserType = "IAM_USER" | "IAM_ROLE" | "SSO_USER" | "IAM_ROLE_SESSION" | (string & {});
export interface CreateUserProfileInput {
  domainIdentifier: string;
  userIdentifier: string;
  userType?: UserType | undefined;
  sessionName?: string | undefined;
  clientToken?: string | undefined;
}
export type UserProfileType = "IAM" | "SSO" | (string & {});
export type UserProfileStatus =
  | "ASSIGNED"
  | "NOT_ASSIGNED"
  | "ACTIVATED"
  | "DEACTIVATED"
  | (string & {});
export interface CreateUserProfileOutput {
  domainId?: string | undefined;
  id?: string | undefined;
  type?: UserProfileType | undefined;
  status?: UserProfileStatus | undefined;
  details?: UserProfileDetails | undefined;
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
  status?: string | undefined;
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
  clientToken?: string | undefined;
  retainPermissionsOnRevokeFailure?: boolean | undefined;
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
  schemaName?: string | undefined;
  status: SelfGrantStatus;
  failureCause?: string | undefined;
}
export type SelfGrantStatusDetails = SelfGrantStatusDetail[];
export interface GlueSelfGrantStatusOutput {
  selfGrantStatusDetails: SelfGrantStatusDetail[];
}
export interface RedshiftSelfGrantStatusOutput {
  selfGrantStatusDetails: SelfGrantStatusDetail[];
}
export type SelfGrantStatusOutput =
  | { glueSelfGrantStatus: GlueSelfGrantStatusOutput; redshiftSelfGrantStatus?: undefined }
  | { glueSelfGrantStatus?: undefined; redshiftSelfGrantStatus: RedshiftSelfGrantStatusOutput };
export interface DeleteDataSourceOutput {
  id: string;
  status?: DataSourceStatus | undefined;
  type?: string | undefined;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string> | undefined;
  domainId: string;
  projectId: string;
  environmentId?: string | undefined;
  connectionId?: string | undefined;
  configuration?: DataSourceConfigurationOutput | undefined;
  enableSetting?: EnableSetting | undefined;
  publishOnImport?: boolean | undefined;
  assetFormsOutput?: FormOutput[] | undefined;
  schedule?: ScheduleConfiguration | undefined;
  lastRunStatus?: DataSourceRunStatus | undefined;
  lastRunAt?: Date | undefined;
  lastRunErrorMessage?: DataSourceErrorMessage | undefined;
  errorMessage?: DataSourceErrorMessage | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  selfGrantStatus?: SelfGrantStatusOutput | undefined;
  retainPermissionsOnRevokeFailure?: boolean | undefined;
}
export interface DeleteDesignationInput {
  domainIdentifier: string;
  identifier: string;
}
export interface DeleteDesignationOutput {}
export interface DeleteDomainInput {
  identifier: string;
  clientToken?: string | undefined;
  skipDeletionCheck?: boolean | undefined;
  cascadeDelete?: boolean | undefined;
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
  id?: string | undefined;
  domainId?: string | undefined;
  processingStatus?: LineageEventProcessingStatus | undefined;
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
  skipDeletionCheck?: boolean | undefined;
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
  updatedBy?: string | undefined;
  domainId: string;
  createdAt: Date;
  updatedAt: Date;
  environmentId?: string | undefined;
  subscriptionTargetId: string;
  grantedEntity: GrantedEntity;
  status: SubscriptionGrantOverallStatus;
  assets?: SubscribedAsset[] | undefined;
  subscriptionId?: string | undefined;
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
  clientToken?: string | undefined;
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
  domainId?: string | undefined;
  name?: string | redacted.Redacted<string> | undefined;
  id?: string | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  resolutionStrategy?: ResolutionStrategy | undefined;
  accountSource: AccountSource;
  createdBy: string;
  createdAt?: Date | undefined;
  lastUpdatedAt?: Date | undefined;
  updatedBy?: string | undefined;
  domainUnitId?: string | undefined;
}
export interface GetAssetInput {
  domainIdentifier: string;
  identifier: string;
  revision?: string | undefined;
}
export interface GetAssetOutput {
  id: string;
  name: string | redacted.Redacted<string>;
  typeIdentifier: string;
  typeRevision: string;
  externalIdentifier?: string | undefined;
  revision: string;
  description?: string | redacted.Redacted<string> | undefined;
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
  firstRevisionCreatedAt?: Date | undefined;
  firstRevisionCreatedBy?: string | undefined;
  glossaryTerms?: string[] | undefined;
  governedGlossaryTerms?: string[] | undefined;
  owningProjectId: string;
  domainId: string;
  listing?: AssetListingDetails | undefined;
  formsOutput: FormOutput[];
  readOnlyFormsOutput?: FormOutput[] | undefined;
  latestTimeSeriesDataPointFormsOutput?: TimeSeriesDataPointSummaryFormOutput[] | undefined;
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
  description?: string | redacted.Redacted<string> | undefined;
  status?: FilterStatus | undefined;
  configuration: AssetFilterConfiguration;
  createdAt?: Date | undefined;
  errorMessage?: string | undefined;
  effectiveColumnNames?: string[] | undefined;
  effectiveRowFilter?: string | undefined;
}
export interface GetAssetTypeInput {
  domainIdentifier: string;
  identifier: string;
  revision?: string | undefined;
}
export interface GetAssetTypeOutput {
  domainId: string;
  name: string;
  revision: string;
  description?: string | redacted.Redacted<string> | undefined;
  formsOutput: { [key: string]: FormEntryOutput | undefined };
  owningProjectId: string;
  originDomainId?: string | undefined;
  originProjectId?: string | undefined;
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
  updatedAt?: Date | undefined;
  updatedBy?: string | undefined;
}
export interface GetConnectionInput {
  domainIdentifier: string;
  identifier: string;
  withSecret?: boolean | undefined;
}
export interface ConnectionCredentials {
  accessKeyId?: string | undefined;
  secretAccessKey?: string | redacted.Redacted<string> | undefined;
  sessionToken?: string | redacted.Redacted<string> | undefined;
  expiration?: Date | undefined;
}
export interface GetConnectionOutput {
  connectionCredentials?: ConnectionCredentials | undefined;
  configurations?: Configuration[] | undefined;
  connectionId: string;
  description?: string | redacted.Redacted<string> | undefined;
  domainId: string;
  domainUnitId: string;
  environmentId?: string | undefined;
  environmentUserRole?: string | undefined;
  name: string;
  physicalEndpoints: PhysicalEndpoint[];
  projectId?: string | undefined;
  props?: ConnectionPropertiesOutput | undefined;
  type: ConnectionType;
  scope?: ConnectionScope | undefined;
}
export interface GetDataExportConfigurationInput {
  domainIdentifier: string;
}
export type ConfigurationStatus = "COMPLETED" | "FAILED" | (string & {});
export interface EncryptionConfiguration {
  kmsKeyArn?: string | undefined;
  sseAlgorithm?: string | undefined;
}
export interface GetDataExportConfigurationOutput {
  isExportEnabled?: boolean | undefined;
  status?: ConfigurationStatus | undefined;
  encryptionConfiguration?: EncryptionConfiguration | undefined;
  s3TableBucketArn?: string | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
export interface GetDataProductInput {
  domainIdentifier: string;
  identifier: string;
  revision?: string | undefined;
}
export interface GetDataProductOutput {
  domainId: string;
  id: string;
  revision: string;
  owningProjectId: string;
  name: string | redacted.Redacted<string>;
  status: DataProductStatus;
  description?: string | redacted.Redacted<string> | undefined;
  glossaryTerms?: string[] | undefined;
  items?: DataProductItem[] | undefined;
  formsOutput?: FormOutput[] | undefined;
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
  firstRevisionCreatedAt?: Date | undefined;
  firstRevisionCreatedBy?: string | undefined;
}
export interface GetDataSourceInput {
  domainIdentifier: string;
  identifier: string;
}
export interface GetDataSourceOutput {
  id: string;
  status?: DataSourceStatus | undefined;
  type?: string | undefined;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string> | undefined;
  domainId: string;
  projectId: string;
  environmentId?: string | undefined;
  connectionId?: string | undefined;
  configuration?: DataSourceConfigurationOutput | undefined;
  recommendation?: RecommendationConfiguration | undefined;
  enableSetting?: EnableSetting | undefined;
  publishOnImport?: boolean | undefined;
  assetFormsOutput?: FormOutput[] | undefined;
  schedule?: ScheduleConfiguration | undefined;
  lastRunStatus?: DataSourceRunStatus | undefined;
  lastRunAt?: Date | undefined;
  lastRunErrorMessage?: DataSourceErrorMessage | undefined;
  lastRunAssetCount?: number | undefined;
  errorMessage?: DataSourceErrorMessage | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  selfGrantStatus?: SelfGrantStatusOutput | undefined;
}
export type DataSourceRunId = string;
export interface GetDataSourceRunInput {
  domainIdentifier: string;
  identifier: string;
}
export type DataSourceRunType = "PRIORITIZED" | "SCHEDULED" | (string & {});
export interface RunStatisticsForAssets {
  added?: number | undefined;
  updated?: number | undefined;
  unchanged?: number | undefined;
  skipped?: number | undefined;
  failed?: number | undefined;
}
export type LineageImportStatus =
  | "IN_PROGRESS"
  | "SUCCESS"
  | "FAILED"
  | "PARTIALLY_SUCCEEDED"
  | (string & {});
export interface DataSourceRunLineageSummary {
  importStatus?: LineageImportStatus | undefined;
}
export interface GetDataSourceRunOutput {
  domainId: string;
  dataSourceId: string;
  id: string;
  projectId: string;
  status: DataSourceRunStatus;
  type: DataSourceRunType;
  dataSourceConfigurationSnapshot?: string | undefined;
  runStatisticsForAssets?: RunStatisticsForAssets | undefined;
  lineageSummary?: DataSourceRunLineageSummary | undefined;
  errorMessage?: DataSourceErrorMessage | undefined;
  createdAt: Date;
  updatedAt: Date;
  startedAt?: Date | undefined;
  stoppedAt?: Date | undefined;
}
export interface GetDesignationInput {
  domainIdentifier: string;
  identifier: string;
}
export interface GetDesignationOutput {
  domainId: string;
  id: string;
  name: string;
  description?: string | redacted.Redacted<string> | undefined;
  designationType: DesignationType;
  policy: string;
  deletionProtection: boolean;
  createdBy: string;
  createdAt?: Date | undefined;
  lastUpdatedAt?: Date | undefined;
}
export interface GetDomainInput {
  identifier: string;
}
export interface FailureReason {
  id?: string | undefined;
  message?: string | undefined;
}
export type FailureReasonsList = FailureReason[];
export interface DeleteProgress {
  successfullyDeletedProjectCount?: number | undefined;
}
export interface GetDomainOutput {
  id: string;
  rootDomainUnitId?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  singleSignOn?: SingleSignOn | undefined;
  domainExecutionRole: string;
  arn?: string | undefined;
  kmsKeyIdentifier?: string | undefined;
  status: DomainStatus;
  portalUrl?: string | undefined;
  createdAt?: Date | undefined;
  lastUpdatedAt?: Date | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
  domainVersion?: DomainVersion | undefined;
  serviceRole?: string | undefined;
  failureReasons?: FailureReason[] | undefined;
  deleteProgress?: DeleteProgress | undefined;
}
export interface GetDomainUnitInput {
  domainIdentifier: string;
  identifier: string;
}
export interface GetDomainUnitOutput {
  id: string;
  domainId: string;
  name: string | redacted.Redacted<string>;
  parentDomainUnitId?: string | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  owners: DomainUnitOwnerProperties[];
  createdAt?: Date | undefined;
  lastUpdatedAt?: Date | undefined;
  createdBy?: string | undefined;
  lastUpdatedBy?: string | undefined;
}
export interface GetEnvironmentInput {
  domainIdentifier: string;
  identifier: string;
}
export interface GetEnvironmentOutput {
  projectId: string;
  id?: string | undefined;
  domainId: string;
  createdBy: string;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string> | undefined;
  environmentProfileId?: string | undefined;
  awsAccountId?: string | undefined;
  awsAccountRegion?: string | undefined;
  provider: string;
  provisionedResources?: Resource[] | undefined;
  status?: EnvironmentStatus | undefined;
  environmentActions?: ConfigurableEnvironmentAction[] | undefined;
  glossaryTerms?: string[] | undefined;
  userParameters?: CustomParameter[] | undefined;
  lastDeployment?: Deployment | undefined;
  provisioningProperties?: ProvisioningProperties | undefined;
  deploymentProperties?: DeploymentProperties | undefined;
  environmentBlueprintId?: string | undefined;
  environmentConfigurationId?: string | redacted.Redacted<string> | undefined;
  environmentConfigurationName?: string | redacted.Redacted<string> | undefined;
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
  description?: string | undefined;
}
export interface GetEnvironmentBlueprintInput {
  domainIdentifier: string;
  identifier: string;
}
export interface GetEnvironmentBlueprintOutput {
  id: string;
  name: string;
  description?: string | redacted.Redacted<string> | undefined;
  provider: string;
  provisioningProperties: ProvisioningProperties;
  deploymentProperties?: DeploymentProperties | undefined;
  userParameters?: CustomParameter[] | undefined;
  glossaryTerms?: string[] | undefined;
  blueprintCategory?: BlueprintCategory | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
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
  description?: string | undefined;
  region: string;
  parameters: { [key: string]: string | undefined };
}
export type ResourceConfigurations = ResourceConfiguration[];
export type S3Location = string;
export type S3LocationList = string[];
export interface LakeFormationConfiguration {
  locationRegistrationRole?: string | undefined;
  locationRegistrationExcludeS3Locations?: string[] | undefined;
}
export type ProvisioningConfiguration = { lakeFormationConfiguration: LakeFormationConfiguration };
export type ProvisioningConfigurationList = ProvisioningConfiguration[];
export interface GetEnvironmentBlueprintConfigurationOutput {
  domainId: string;
  environmentBlueprintId: string;
  provisioningRoleArn?: string | undefined;
  environmentRolePermissionBoundary?: string | undefined;
  manageAccessRoleArn?: string | undefined;
  enabledRegions?: string[] | undefined;
  regionalParameters?:
    | { [key: string]: { [key: string]: string | undefined } | undefined }
    | undefined;
  allowUserProvidedConfigurations?: boolean | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  resourceConfigurations?: ResourceConfiguration[] | undefined;
  provisioningConfigurations?: ProvisioningConfiguration[] | undefined;
}
export interface GetEnvironmentCredentialsInput {
  domainIdentifier: string;
  environmentIdentifier: string;
}
export interface GetEnvironmentCredentialsOutput {
  accessKeyId?: string | undefined;
  secretAccessKey?: string | redacted.Redacted<string> | undefined;
  sessionToken?: string | redacted.Redacted<string> | undefined;
  expiration?: Date | undefined;
}
export interface GetEnvironmentProfileInput {
  domainIdentifier: string;
  identifier: string;
}
export interface GetEnvironmentProfileOutput {
  id: string;
  domainId: string;
  awsAccountId?: string | undefined;
  awsAccountRegion?: string | undefined;
  createdBy: string;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string> | undefined;
  environmentBlueprintId: string;
  projectId?: string | undefined;
  userParameters?: CustomParameter[] | undefined;
}
export interface GetFormTypeInput {
  domainIdentifier: string;
  formTypeIdentifier: string;
  revision?: string | undefined;
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
  owningProjectId?: string | undefined;
  originDomainId?: string | undefined;
  originProjectId?: string | undefined;
  status?: FormTypeStatus | undefined;
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  imports?: Import[] | undefined;
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
  description?: string | redacted.Redacted<string> | undefined;
  status: GlossaryStatus;
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
  updatedAt?: Date | undefined;
  updatedBy?: string | undefined;
  usageRestrictions?: GlossaryUsageRestriction[] | undefined;
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
  shortDescription?: string | redacted.Redacted<string> | undefined;
  longDescription?: string | redacted.Redacted<string> | undefined;
  termRelations?: TermRelations | undefined;
  status: GlossaryTermStatus;
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
  updatedAt?: Date | undefined;
  updatedBy?: string | undefined;
  usageRestrictions?: GlossaryUsageRestriction[] | undefined;
}
export interface GetGroupProfileInput {
  domainIdentifier: string;
  groupIdentifier: string;
}
export interface GetGroupProfileOutput {
  domainId?: string | undefined;
  id?: string | undefined;
  status?: GroupProfileStatus | undefined;
  groupName?: string | redacted.Redacted<string> | undefined;
  rolePrincipalArn?: string | undefined;
  rolePrincipalId?: string | undefined;
}
export interface GetIamPortalLoginUrlInput {
  domainIdentifier: string;
}
export interface GetIamPortalLoginUrlOutput {
  authCodeUrl?: string | undefined;
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
  queryStartTime?: Date | undefined;
  queryEndTime?: Date | undefined;
  totalQueriesProcessed?: number | undefined;
  numQueriesFailed?: number | undefined;
  errorMessages?: string[] | undefined;
}
export interface LineageRunDetails {
  sqlQueryRunDetails?: LineageSqlQueryRunDetails | undefined;
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
  domainId?: string | undefined;
  id?: string | undefined;
  jobId?: string | undefined;
  jobType?: JobType | undefined;
  runMode?: JobRunMode | undefined;
  details?: JobRunDetails | undefined;
  status?: JobRunStatus | undefined;
  error?: JobRunError | undefined;
  createdBy?: string | undefined;
  createdAt?: Date | undefined;
  startTime?: Date | undefined;
  endTime?: Date | undefined;
}
export interface GetLineageEventInput {
  domainIdentifier: string;
  identifier: string;
}
export interface GetLineageEventOutput {
  domainId?: string | undefined;
  id?: string | undefined;
  event?: T.StreamingOutputBody | undefined;
  createdBy?: string | undefined;
  processingStatus?: LineageEventProcessingStatus | undefined;
  eventTime?: Date | undefined;
  createdAt?: Date | undefined;
}
export type LineageNodeIdentifier = string;
export interface GetLineageNodeInput {
  domainIdentifier: string;
  identifier: string;
  eventTimestamp?: Date | undefined;
}
export type LineageNodeId = string;
export interface LineageNodeReference {
  id?: string | undefined;
  eventTimestamp?: Date | undefined;
}
export type LineageNodeReferenceList = LineageNodeReference[];
export interface GetLineageNodeOutput {
  domainId: string;
  name?: string | undefined;
  description?: string | undefined;
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
  updatedAt?: Date | undefined;
  updatedBy?: string | undefined;
  id: string;
  typeName: string;
  typeRevision?: string | undefined;
  sourceIdentifier?: string | undefined;
  eventTimestamp?: Date | undefined;
  formsOutput?: FormOutput[] | undefined;
  upstreamNodes?: LineageNodeReference[] | undefined;
  downstreamNodes?: LineageNodeReference[] | undefined;
}
export interface GetListingInput {
  domainIdentifier: string;
  identifier: string;
  listingRevision?: string | undefined;
}
export interface AssetListing {
  assetId?: string | undefined;
  assetRevision?: string | undefined;
  assetType?: string | undefined;
  createdAt?: Date | undefined;
  forms?: string | undefined;
  latestTimeSeriesDataPointForms?: TimeSeriesDataPointSummaryFormOutput[] | undefined;
  glossaryTerms?: DetailedGlossaryTerm[] | undefined;
  governedGlossaryTerms?: DetailedGlossaryTerm[] | undefined;
  owningProjectId?: string | undefined;
}
export interface ListingSummary {
  listingId?: string | undefined;
  listingRevision?: string | undefined;
  glossaryTerms?: DetailedGlossaryTerm[] | undefined;
}
export type ListingSummaries = ListingSummary[];
export interface DataProductListing {
  dataProductId?: string | undefined;
  dataProductRevision?: string | undefined;
  createdAt?: Date | undefined;
  forms?: string | undefined;
  glossaryTerms?: DetailedGlossaryTerm[] | undefined;
  owningProjectId?: string | undefined;
  items?: ListingSummary[] | undefined;
}
export type ListingItem =
  | { assetListing: AssetListing; dataProductListing?: undefined }
  | { assetListing?: undefined; dataProductListing: DataProductListing };
export interface GetListingOutput {
  domainId: string;
  id: string;
  listingRevision: string;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  createdBy?: string | undefined;
  updatedBy?: string | undefined;
  item?: ListingItem | undefined;
  name?: string | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  status?: ListingStatus | undefined;
}
export type MetadataGenerationRunType =
  | "BUSINESS_DESCRIPTIONS"
  | "BUSINESS_NAMES"
  | "BUSINESS_GLOSSARY_ASSOCIATIONS"
  | (string & {});
export interface GetMetadataGenerationRunInput {
  domainIdentifier: string;
  identifier: string;
  type?: MetadataGenerationRunType | undefined;
}
export type MetadataGenerationTargetType = "ASSET" | (string & {});
export interface MetadataGenerationRunTarget {
  type: MetadataGenerationTargetType;
  identifier: string;
  revision?: string | undefined;
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
  errorMessage?: string | undefined;
}
export type MetadataGenerationRunTypeStats = MetadataGenerationRunTypeStat[];
export interface GetMetadataGenerationRunOutput {
  domainId: string;
  id: string;
  target?: MetadataGenerationRunTarget | undefined;
  status?: MetadataGenerationRunStatus | undefined;
  type?: MetadataGenerationRunType | undefined;
  types?: MetadataGenerationRunType[] | undefined;
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
  owningProjectId: string;
  typeStats?: MetadataGenerationRunTypeStat[] | undefined;
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
  type?: NotebookType | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
  updatedAt?: Date | undefined;
  updatedBy?: string | undefined;
  lockedBy?: string | undefined;
  lockedAt?: Date | undefined;
  lockExpiresAt?: Date | undefined;
  computeId?: string | undefined;
  metadata?: { [key: string]: string | redacted.Redacted<string> | undefined } | undefined;
  parameters?: { [key: string]: string | undefined } | undefined;
  environmentConfiguration?: EnvironmentConfig | undefined;
  error?: NotebookError | undefined;
  gitMetadata?: GitMetadata | undefined;
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
  uri?: string | redacted.Redacted<string> | undefined;
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
  outputLocation?: OutputLocation | undefined;
  error?: NotebookExportError | undefined;
  completedAt?: Date | undefined;
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
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
  instanceType?: string | undefined;
  environmentVersion?: string | undefined;
}
export type NetworkAccessType = "PUBLIC_INTERNET_ONLY" | "VPC_ONLY" | (string & {});
export type SubnetIds = string[];
export type SecurityGroupIds = string[];
export interface NetworkConfig {
  networkAccessType: NetworkAccessType;
  vpcId?: string | undefined;
  subnetIds?: string[] | undefined;
  securityGroupIds?: string[] | undefined;
}
export interface TimeoutConfig {
  runTimeoutInMinutes?: number | undefined;
}
export type S3Path = string;
export interface StorageConfig {
  projectS3Path?: string | undefined;
  kmsKeyArn?: string | undefined;
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
  type?: TriggerSourceType | undefined;
  name?: string | undefined;
}
export interface NotebookRunError {
  message: string;
}
export interface GetNotebookRunOutput {
  id: string;
  domainId: string;
  owningProjectId: string;
  notebookId: string;
  scheduleId?: string | undefined;
  status: NotebookRunStatus;
  cellOrder?: CellInformation[] | undefined;
  metadata?: { [key: string]: string | redacted.Redacted<string> | undefined } | undefined;
  parameters?: { [key: string]: string | undefined } | undefined;
  computeConfiguration?: ComputeConfig | undefined;
  networkConfiguration?: NetworkConfig | undefined;
  timeoutConfiguration?: TimeoutConfig | undefined;
  environmentConfiguration?: EnvironmentConfig | undefined;
  storageConfiguration?: StorageConfig | undefined;
  notificationConfiguration?: NotificationConfig | undefined;
  triggerSource?: TriggerSource | undefined;
  error?: NotebookRunError | undefined;
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
  updatedAt?: Date | undefined;
  updatedBy?: string | undefined;
  startedAt?: Date | undefined;
  completedAt?: Date | undefined;
}
export interface GetProjectInput {
  domainIdentifier: string;
  identifier: string;
}
export interface GetProjectOutput {
  domainId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string> | undefined;
  projectStatus?: ProjectStatus | undefined;
  failureReasons?: ProjectDeletionError[] | undefined;
  createdBy: string;
  createdAt?: Date | undefined;
  lastUpdatedAt?: Date | undefined;
  resourceTags?: ResourceTag[] | undefined;
  glossaryTerms?: string[] | undefined;
  domainUnitId?: string | undefined;
  projectProfileId?: string | undefined;
  userParameters?: EnvironmentConfigurationUserParameter[] | undefined;
  environmentDeploymentDetails?: EnvironmentDeploymentDetails | undefined;
  projectCategory?: string | undefined;
}
export interface GetProjectProfileInput {
  domainIdentifier: string;
  identifier: string;
}
export interface GetProjectProfileOutput {
  domainId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string> | undefined;
  status?: Status | undefined;
  projectResourceTags?: ResourceTagParameter[] | undefined;
  allowCustomProjectResourceTags?: boolean | undefined;
  projectResourceTagsDescription?: string | redacted.Redacted<string> | undefined;
  environmentConfigurations?: EnvironmentConfiguration[] | undefined;
  createdBy: string;
  createdAt?: Date | undefined;
  lastUpdatedAt?: Date | undefined;
  domainUnitId?: string | undefined;
}
export interface GetRuleInput {
  domainIdentifier: string;
  identifier: string;
  revision?: string | undefined;
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
  targetType?: RuleTargetType | undefined;
  description?: string | redacted.Redacted<string> | undefined;
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
  updatedBy?: string | undefined;
  domainId: string;
  status: SubscriptionStatus;
  createdAt: Date;
  updatedAt: Date;
  subscribedPrincipal: SubscribedPrincipal;
  subscribedListing: SubscribedListing;
  subscriptionRequestId?: string | undefined;
  retainPermissions?: boolean | undefined;
}
export interface GetSubscriptionGrantInput {
  domainIdentifier: string;
  identifier: string;
}
export interface GetSubscriptionGrantOutput {
  id: string;
  createdBy: string;
  updatedBy?: string | undefined;
  domainId: string;
  createdAt: Date;
  updatedAt: Date;
  environmentId?: string | undefined;
  subscriptionTargetId: string;
  grantedEntity: GrantedEntity;
  status: SubscriptionGrantOverallStatus;
  assets?: SubscribedAsset[] | undefined;
  subscriptionId?: string | undefined;
}
export interface GetSubscriptionRequestDetailsInput {
  domainIdentifier: string;
  identifier: string;
}
export interface GetSubscriptionRequestDetailsOutput {
  id: string;
  createdBy: string;
  updatedBy?: string | undefined;
  domainId: string;
  status: SubscriptionRequestStatus;
  createdAt: Date;
  updatedAt: Date;
  requestReason: string | redacted.Redacted<string>;
  subscribedPrincipals: SubscribedPrincipal[];
  subscribedListings: SubscribedListing[];
  reviewerId?: string | undefined;
  decisionComment?: string | redacted.Redacted<string> | undefined;
  existingSubscriptionId?: string | undefined;
  metadataForms?: FormOutput[] | undefined;
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
  updatedBy?: string | undefined;
  createdAt: Date;
  updatedAt?: Date | undefined;
  manageAccessRole?: string | undefined;
  applicableAssetTypes: string[];
  subscriptionTargetConfig: SubscriptionTargetForm[];
  provider: string;
  subscriptionGrantCreationMode?: SubscriptionGrantCreationMode | undefined;
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
  typeRevision?: string | undefined;
  timestamp: Date;
  content?: string | undefined;
  id?: string | undefined;
}
export interface GetTimeSeriesDataPointOutput {
  domainId?: string | undefined;
  entityId?: string | undefined;
  entityType?: TimeSeriesEntityType | undefined;
  formName?: string | undefined;
  form?: TimeSeriesDataPointFormOutput | undefined;
}
export interface GetUserProfileInput {
  domainIdentifier: string;
  userIdentifier: string;
  type?: UserProfileType | undefined;
  sessionName?: string | undefined;
}
export interface GetUserProfileOutput {
  domainId?: string | undefined;
  id?: string | undefined;
  type?: UserProfileType | undefined;
  status?: UserProfileStatus | undefined;
  details?: UserProfileDetails | undefined;
}
export type SortFieldAccountPool = "NAME" | (string & {});
export type SortOrder = "ASCENDING" | "DESCENDING" | (string & {});
export type PaginationToken = string;
export type MaxResults = number;
export interface ListAccountPoolsInput {
  domainIdentifier: string;
  name?: string | redacted.Redacted<string> | undefined;
  sortBy?: SortFieldAccountPool | undefined;
  sortOrder?: SortOrder | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface AccountPoolSummary {
  domainId?: string | undefined;
  id?: string | undefined;
  name?: string | redacted.Redacted<string> | undefined;
  resolutionStrategy?: ResolutionStrategy | undefined;
  domainUnitId?: string | undefined;
  createdBy?: string | undefined;
  updatedBy?: string | undefined;
}
export type AccountPoolSummaries = AccountPoolSummary[];
export interface ListAccountPoolsOutput {
  items?: AccountPoolSummary[] | undefined;
  nextToken?: string | undefined;
}
export interface ListAccountsInAccountPoolInput {
  domainIdentifier: string;
  identifier: string;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface ListAccountsInAccountPoolOutput {
  items?: AccountInfo[] | undefined;
  nextToken?: string | undefined;
}
export interface ListAssetFiltersInput {
  domainIdentifier: string;
  assetIdentifier: string;
  status?: FilterStatus | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface AssetFilterSummary {
  id: string;
  domainId: string;
  assetId: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string> | undefined;
  status?: FilterStatus | undefined;
  effectiveColumnNames?: string[] | undefined;
  effectiveRowFilter?: string | undefined;
  createdAt?: Date | undefined;
  errorMessage?: string | undefined;
}
export type AssetFilters = AssetFilterSummary[];
export interface ListAssetFiltersOutput {
  items: AssetFilterSummary[];
  nextToken?: string | undefined;
}
export interface ListAssetRevisionsInput {
  domainIdentifier: string;
  identifier: string;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface AssetRevision {
  domainId?: string | undefined;
  id?: string | undefined;
  revision?: string | undefined;
  createdBy?: string | undefined;
  createdAt?: Date | undefined;
}
export type AssetRevisions = AssetRevision[];
export interface ListAssetRevisionsOutput {
  items?: AssetRevision[] | undefined;
  nextToken?: string | undefined;
}
export type SortFieldConnection = "NAME" | (string & {});
export interface ListConnectionsInput {
  domainIdentifier: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
  sortBy?: SortFieldConnection | undefined;
  sortOrder?: SortOrder | undefined;
  name?: string | undefined;
  environmentIdentifier?: string | undefined;
  projectIdentifier?: string | undefined;
  type?: ConnectionType | undefined;
  scope?: ConnectionScope | undefined;
}
export interface ConnectionSummary {
  configurations?: Configuration[] | undefined;
  connectionId: string;
  domainId: string;
  domainUnitId: string;
  environmentId?: string | undefined;
  name: string;
  physicalEndpoints: PhysicalEndpoint[];
  projectId?: string | undefined;
  props?: ConnectionPropertiesOutput | undefined;
  type: ConnectionType;
  scope?: ConnectionScope | undefined;
}
export type ConnectionSummaries = ConnectionSummary[];
export interface ListConnectionsOutput {
  items: ConnectionSummary[];
  nextToken?: string | undefined;
}
export interface ListDataProductRevisionsInput {
  domainIdentifier: string;
  identifier: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface DataProductRevision {
  domainId?: string | undefined;
  id?: string | undefined;
  revision?: string | undefined;
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
}
export type DataProductRevisions = DataProductRevision[];
export interface ListDataProductRevisionsOutput {
  items: DataProductRevision[];
  nextToken?: string | undefined;
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
  status?: DataAssetActivityStatus | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export type LineageEventErrorMessage = string;
export interface LineageInfo {
  eventId?: string | undefined;
  eventStatus?: LineageEventProcessingStatus | undefined;
  errorMessage?: string | undefined;
}
export interface DataSourceRunActivity {
  database: string | redacted.Redacted<string>;
  dataSourceRunId: string;
  technicalName: string | redacted.Redacted<string>;
  dataAssetStatus: DataAssetActivityStatus;
  projectId: string;
  dataAssetId?: string | undefined;
  technicalDescription?: string | redacted.Redacted<string> | undefined;
  errorMessage?: DataSourceErrorMessage | undefined;
  lineageSummary?: LineageInfo | undefined;
  createdAt: Date;
  updatedAt: Date;
}
export type DataSourceRunActivities = DataSourceRunActivity[];
export interface ListDataSourceRunActivitiesOutput {
  items: DataSourceRunActivity[];
  nextToken?: string | undefined;
}
export interface ListDataSourceRunsInput {
  domainIdentifier: string;
  dataSourceIdentifier: string;
  status?: DataSourceRunStatus | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface DataSourceRunSummary {
  id: string;
  dataSourceId: string;
  type: DataSourceRunType;
  status: DataSourceRunStatus;
  projectId: string;
  runStatisticsForAssets?: RunStatisticsForAssets | undefined;
  errorMessage?: DataSourceErrorMessage | undefined;
  createdAt: Date;
  updatedAt: Date;
  startedAt?: Date | undefined;
  stoppedAt?: Date | undefined;
  lineageSummary?: DataSourceRunLineageSummary | undefined;
}
export type DataSourceRunSummaries = DataSourceRunSummary[];
export interface ListDataSourceRunsOutput {
  items: DataSourceRunSummary[];
  nextToken?: string | undefined;
}
export interface ListDataSourcesInput {
  domainIdentifier: string;
  projectIdentifier: string;
  environmentIdentifier?: string | undefined;
  connectionIdentifier?: string | undefined;
  type?: string | undefined;
  status?: DataSourceStatus | undefined;
  name?: string | redacted.Redacted<string> | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface DataSourceSummary {
  domainId: string;
  environmentId?: string | undefined;
  connectionId?: string | undefined;
  dataSourceId: string;
  name: string | redacted.Redacted<string>;
  type: string;
  status: DataSourceStatus;
  enableSetting?: EnableSetting | undefined;
  schedule?: ScheduleConfiguration | undefined;
  lastRunStatus?: DataSourceRunStatus | undefined;
  lastRunAt?: Date | undefined;
  lastRunErrorMessage?: DataSourceErrorMessage | undefined;
  lastRunAssetCount?: number | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  description?: string | redacted.Redacted<string> | undefined;
}
export type DataSourceSummaries = DataSourceSummary[];
export interface ListDataSourcesOutput {
  items: DataSourceSummary[];
  nextToken?: string | undefined;
}
export type ListDesignationsMaxResults = number;
export interface ListDesignationsInput {
  domainIdentifier: string;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface DesignationSummary {
  domainId: string;
  id: string;
  name: string;
  description?: string | redacted.Redacted<string> | undefined;
  designationType?: DesignationType | undefined;
  deletionProtection: boolean;
  createdBy: string;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
export type DesignationSummaries = DesignationSummary[];
export interface ListDesignationsOutput {
  items?: DesignationSummary[] | undefined;
  nextToken?: string | undefined;
}
export type MaxResultsForListDomains = number;
export interface ListDomainsInput {
  status?: DomainStatus | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export type DomainName = string | redacted.Redacted<string>;
export type DomainDescription = string | redacted.Redacted<string>;
export interface DomainSummary {
  id: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string> | undefined;
  arn: string;
  managedAccountId: string;
  status: DomainStatus;
  portalUrl?: string | undefined;
  createdAt: Date;
  lastUpdatedAt?: Date | undefined;
  domainVersion?: DomainVersion | undefined;
}
export type DomainSummaries = DomainSummary[];
export interface ListDomainsOutput {
  items: DomainSummary[];
  nextToken?: string | undefined;
}
export interface ListDomainUnitsForParentInput {
  domainIdentifier: string;
  parentDomainUnitIdentifier: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface DomainUnitSummary {
  name: string;
  id: string;
}
export type DomainUnitSummaries = DomainUnitSummary[];
export interface ListDomainUnitsForParentOutput {
  items: DomainUnitSummary[];
  nextToken?: string | undefined;
}
export interface ListEntityOwnersInput {
  domainIdentifier: string;
  entityType: DataZoneEntityType;
  entityIdentifier: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface OwnerUserPropertiesOutput {
  userId?: string | undefined;
}
export interface OwnerGroupPropertiesOutput {
  groupId?: string | undefined;
}
export type OwnerPropertiesOutput =
  | { user: OwnerUserPropertiesOutput; group?: undefined }
  | { user?: undefined; group: OwnerGroupPropertiesOutput };
export type EntityOwners = OwnerPropertiesOutput[];
export interface ListEntityOwnersOutput {
  owners: OwnerPropertiesOutput[];
  nextToken?: string | undefined;
}
export interface ListEnvironmentActionsInput {
  domainIdentifier: string;
  environmentIdentifier: string;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface EnvironmentActionSummary {
  domainId: string;
  environmentId: string;
  id: string;
  name: string;
  parameters: ActionParameters;
  description?: string | undefined;
}
export type ListEnvironmentActionSummaries = EnvironmentActionSummary[];
export interface ListEnvironmentActionsOutput {
  items?: EnvironmentActionSummary[] | undefined;
  nextToken?: string | undefined;
}
export interface ListEnvironmentBlueprintConfigurationsInput {
  domainIdentifier: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface EnvironmentBlueprintConfigurationItem {
  domainId: string;
  environmentBlueprintId: string;
  provisioningRoleArn?: string | undefined;
  environmentRolePermissionBoundary?: string | undefined;
  manageAccessRoleArn?: string | undefined;
  enabledRegions?: string[] | undefined;
  regionalParameters?:
    | { [key: string]: { [key: string]: string | undefined } | undefined }
    | undefined;
  allowUserProvidedConfigurations?: boolean | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  resourceConfigurations?: ResourceConfiguration[] | undefined;
  provisioningConfigurations?: ProvisioningConfiguration[] | undefined;
}
export type EnvironmentBlueprintConfigurations = EnvironmentBlueprintConfigurationItem[];
export interface ListEnvironmentBlueprintConfigurationsOutput {
  items?: EnvironmentBlueprintConfigurationItem[] | undefined;
  nextToken?: string | undefined;
}
export interface ListEnvironmentBlueprintsInput {
  domainIdentifier: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
  name?: string | undefined;
  managed?: boolean | undefined;
}
export interface EnvironmentBlueprintSummary {
  id: string;
  name: string;
  description?: string | redacted.Redacted<string> | undefined;
  provider: string;
  provisioningProperties: ProvisioningProperties;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  blueprintCategory?: BlueprintCategory | undefined;
}
export type EnvironmentBlueprintSummaries = EnvironmentBlueprintSummary[];
export interface ListEnvironmentBlueprintsOutput {
  items: EnvironmentBlueprintSummary[];
  nextToken?: string | undefined;
}
export interface ListEnvironmentProfilesInput {
  domainIdentifier: string;
  awsAccountId?: string | undefined;
  awsAccountRegion?: string | undefined;
  environmentBlueprintIdentifier?: string | undefined;
  projectIdentifier?: string | undefined;
  name?: string | redacted.Redacted<string> | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface EnvironmentProfileSummary {
  id: string;
  domainId: string;
  awsAccountId?: string | undefined;
  awsAccountRegion?: string | undefined;
  createdBy: string;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string> | undefined;
  environmentBlueprintId: string;
  projectId?: string | undefined;
}
export type EnvironmentProfileSummaries = EnvironmentProfileSummary[];
export interface ListEnvironmentProfilesOutput {
  items: EnvironmentProfileSummary[];
  nextToken?: string | undefined;
}
export interface ListEnvironmentsInput {
  domainIdentifier: string;
  awsAccountId?: string | undefined;
  status?: EnvironmentStatus | undefined;
  awsAccountRegion?: string | undefined;
  projectIdentifier: string;
  environmentProfileIdentifier?: string | undefined;
  environmentBlueprintIdentifier?: string | undefined;
  provider?: string | undefined;
  name?: string | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface EnvironmentSummary {
  projectId: string;
  id?: string | undefined;
  domainId: string;
  createdBy: string;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string> | undefined;
  environmentProfileId?: string | undefined;
  awsAccountId?: string | undefined;
  awsAccountRegion?: string | undefined;
  provider: string;
  status?: EnvironmentStatus | undefined;
  environmentConfigurationId?: string | redacted.Redacted<string> | undefined;
  environmentConfigurationName?: string | redacted.Redacted<string> | undefined;
}
export type EnvironmentSummaries = EnvironmentSummary[];
export interface ListEnvironmentsOutput {
  items: EnvironmentSummary[];
  nextToken?: string | undefined;
}
export interface ListJobRunsInput {
  domainIdentifier: string;
  jobIdentifier: string;
  status?: JobRunStatus | undefined;
  sortOrder?: SortOrder | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface JobRunSummary {
  domainId?: string | undefined;
  jobId?: string | undefined;
  jobType?: JobType | undefined;
  runId?: string | undefined;
  runMode?: JobRunMode | undefined;
  status?: JobRunStatus | undefined;
  error?: JobRunError | undefined;
  createdBy?: string | undefined;
  createdAt?: Date | undefined;
  startTime?: Date | undefined;
  endTime?: Date | undefined;
}
export type JobRunSummaries = JobRunSummary[];
export interface ListJobRunsOutput {
  items?: JobRunSummary[] | undefined;
  nextToken?: string | undefined;
}
export interface ListLineageEventsInput {
  domainIdentifier: string;
  maxResults?: number | undefined;
  timestampAfter?: Date | undefined;
  timestampBefore?: Date | undefined;
  processingStatus?: LineageEventProcessingStatus | undefined;
  sortOrder?: SortOrder | undefined;
  nextToken?: string | undefined;
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
  name?: string | undefined;
  namespace?: string | undefined;
}
export type NameIdentifiers = NameIdentifier[];
export interface OpenLineageRunEventSummary {
  eventType?: OpenLineageRunState | undefined;
  runId?: string | undefined;
  job?: NameIdentifier | undefined;
  inputs?: NameIdentifier[] | undefined;
  outputs?: NameIdentifier[] | undefined;
}
export type EventSummary = { openLineageRunEventSummary: OpenLineageRunEventSummary };
export interface LineageEventSummary {
  id?: string | undefined;
  domainId?: string | undefined;
  processingStatus?: LineageEventProcessingStatus | undefined;
  eventTime?: Date | undefined;
  eventSummary?: EventSummary | undefined;
  createdBy?: string | undefined;
  createdAt?: Date | undefined;
}
export type LineageEventSummaries = LineageEventSummary[];
export interface ListLineageEventsOutput {
  items?: LineageEventSummary[] | undefined;
  nextToken?: string | undefined;
}
export type EdgeDirection = "UPSTREAM" | "DOWNSTREAM" | (string & {});
export interface ListLineageNodeHistoryInput {
  domainIdentifier: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
  identifier: string;
  direction?: EdgeDirection | undefined;
  eventTimestampGTE?: Date | undefined;
  eventTimestampLTE?: Date | undefined;
  sortOrder?: SortOrder | undefined;
}
export interface LineageNodeSummary {
  domainId: string;
  name?: string | undefined;
  description?: string | undefined;
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
  updatedAt?: Date | undefined;
  updatedBy?: string | undefined;
  id: string;
  typeName: string;
  typeRevision?: string | undefined;
  sourceIdentifier?: string | undefined;
  eventTimestamp?: Date | undefined;
}
export type LineageNodeSummaries = LineageNodeSummary[];
export interface ListLineageNodeHistoryOutput {
  nodes?: LineageNodeSummary[] | undefined;
  nextToken?: string | undefined;
}
export interface ListMetadataGenerationRunsInput {
  domainIdentifier: string;
  status?: MetadataGenerationRunStatus | undefined;
  type?: MetadataGenerationRunType | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
  targetIdentifier?: string | undefined;
}
export interface MetadataGenerationRunItem {
  domainId: string;
  id: string;
  target?: MetadataGenerationRunTarget | undefined;
  status?: MetadataGenerationRunStatus | undefined;
  type?: MetadataGenerationRunType | undefined;
  types?: MetadataGenerationRunType[] | undefined;
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
  owningProjectId: string;
}
export type MetadataGenerationRuns = MetadataGenerationRunItem[];
export interface ListMetadataGenerationRunsOutput {
  items?: MetadataGenerationRunItem[] | undefined;
  nextToken?: string | undefined;
}
export interface ListNotebookRunsInput {
  domainIdentifier: string;
  owningProjectIdentifier: string;
  notebookIdentifier?: string | undefined;
  status?: NotebookRunStatus | undefined;
  scheduleIdentifier?: string | undefined;
  maxResults?: number | undefined;
  sortOrder?: SortOrder | undefined;
  nextToken?: string | undefined;
}
export interface NotebookRunSummary {
  id: string;
  domainId: string;
  owningProjectId: string;
  notebookId: string;
  scheduleId?: string | undefined;
  status: NotebookRunStatus;
  triggerSource?: TriggerSource | undefined;
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
  updatedAt?: Date | undefined;
  updatedBy?: string | undefined;
  startedAt?: Date | undefined;
  completedAt?: Date | undefined;
}
export type NotebookRunSummaryList = NotebookRunSummary[];
export interface ListNotebookRunsOutput {
  items?: NotebookRunSummary[] | undefined;
  nextToken?: string | undefined;
}
export type SortKey = "CREATED_AT" | "UPDATED_AT" | (string & {});
export interface ListNotebooksInput {
  domainIdentifier: string;
  owningProjectIdentifier: string;
  maxResults?: number | undefined;
  sortOrder?: SortOrder | undefined;
  sortBy?: SortKey | undefined;
  status?: NotebookStatus | undefined;
  type?: NotebookType | undefined;
  nextToken?: string | undefined;
}
export interface NotebookSummary {
  id: string;
  name: string | redacted.Redacted<string>;
  owningProjectId: string;
  domainId: string;
  status: NotebookStatus;
  type?: NotebookType | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
  updatedAt?: Date | undefined;
  updatedBy?: string | undefined;
}
export type NotebookSummaryList = NotebookSummary[];
export interface ListNotebooksOutput {
  items?: NotebookSummary[] | undefined;
  nextToken?: string | undefined;
}
export type NotificationType = "TASK" | "EVENT" | (string & {});
export type NotificationSubjects = string[];
export type TaskStatus = "ACTIVE" | "INACTIVE" | (string & {});
export interface ListNotificationsInput {
  domainIdentifier: string;
  type: NotificationType;
  afterTimestamp?: Date | undefined;
  beforeTimestamp?: Date | undefined;
  subjects?: string[] | undefined;
  taskStatus?: TaskStatus | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export type TaskId = string;
export type NotificationResourceType = "PROJECT" | (string & {});
export interface NotificationResource {
  type: NotificationResourceType;
  id: string;
  name?: string | undefined;
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
  status?: TaskStatus | undefined;
  actionLink: string | redacted.Redacted<string>;
  creationTimestamp: Date;
  lastUpdatedTimestamp: Date;
  metadata?: { [key: string]: string | undefined } | undefined;
}
export type NotificationsList = NotificationOutput[];
export interface ListNotificationsOutput {
  notifications?: NotificationOutput[] | undefined;
  nextToken?: string | undefined;
}
export interface ListPolicyGrantsInput {
  domainIdentifier: string;
  entityType: TargetEntityType;
  entityIdentifier: string;
  policyType: ManagedPolicyType;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface PolicyGrantMember {
  principal?: PolicyGrantPrincipal | undefined;
  detail?: PolicyGrantDetail | undefined;
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
  grantId?: string | undefined;
}
export type PolicyGrantList = PolicyGrantMember[];
export interface ListPolicyGrantsOutput {
  grantList: PolicyGrantMember[];
  nextToken?: string | undefined;
}
export type SortFieldProject = "NAME" | (string & {});
export interface ListProjectMembershipsInput {
  domainIdentifier: string;
  projectIdentifier: string;
  sortBy?: SortFieldProject | undefined;
  sortOrder?: SortOrder | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface UserDetails {
  userId: string;
}
export interface GroupDetails {
  groupId: string;
}
export type MemberDetails =
  | { user: UserDetails; group?: undefined }
  | { user?: undefined; group: GroupDetails };
export interface ProjectMember {
  memberDetails: MemberDetails;
  designation: UserDesignation;
  userCreatedDesignationId?: string | undefined;
}
export type ProjectMembers = ProjectMember[];
export interface ListProjectMembershipsOutput {
  members: ProjectMember[];
  nextToken?: string | undefined;
}
export interface ListProjectProfilesInput {
  domainIdentifier: string;
  name?: string | redacted.Redacted<string> | undefined;
  sortBy?: SortFieldProject | undefined;
  sortOrder?: SortOrder | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface ProjectProfileSummary {
  domainId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string> | undefined;
  status?: Status | undefined;
  createdBy: string;
  createdAt?: Date | undefined;
  lastUpdatedAt?: Date | undefined;
  domainUnitId?: string | undefined;
}
export type ProjectProfileSummaries = ProjectProfileSummary[];
export interface ListProjectProfilesOutput {
  items?: ProjectProfileSummary[] | undefined;
  nextToken?: string | undefined;
}
export interface ListProjectsInput {
  domainIdentifier: string;
  userIdentifier?: string | undefined;
  groupIdentifier?: string | undefined;
  name?: string | redacted.Redacted<string> | undefined;
  projectCategory?: string | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface ProjectSummary {
  domainId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string> | undefined;
  projectStatus?: ProjectStatus | undefined;
  failureReasons?: ProjectDeletionError[] | undefined;
  createdBy: string;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  domainUnitId?: string | undefined;
  projectCategory?: string | undefined;
}
export type ProjectSummaries = ProjectSummary[];
export interface ListProjectsOutput {
  items?: ProjectSummary[] | undefined;
  nextToken?: string | undefined;
}
export type ProjectIds = string[];
export type AssetTypeIdentifiers = string[];
export interface ListRulesInput {
  domainIdentifier: string;
  targetType: RuleTargetType;
  targetIdentifier: string;
  ruleType?: RuleType | undefined;
  action?: RuleAction | undefined;
  projectIds?: string[] | undefined;
  assetTypes?: string[] | undefined;
  dataProduct?: boolean | undefined;
  includeCascaded?: boolean | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface RuleSummary {
  identifier?: string | undefined;
  revision?: string | undefined;
  ruleType?: RuleType | undefined;
  name?: string | redacted.Redacted<string> | undefined;
  targetType?: RuleTargetType | undefined;
  target?: RuleTarget | undefined;
  action?: RuleAction | undefined;
  scope?: RuleScope | undefined;
  updatedAt?: Date | undefined;
  lastUpdatedBy?: string | undefined;
}
export type RuleSummaries = RuleSummary[];
export interface ListRulesOutput {
  items: RuleSummary[];
  nextToken?: string | undefined;
}
export interface ListSubscriptionGrantsInput {
  domainIdentifier: string;
  environmentId?: string | undefined;
  subscriptionTargetId?: string | undefined;
  subscribedListingId?: string | undefined;
  subscriptionId?: string | undefined;
  owningProjectId?: string | undefined;
  owningIamPrincipalArn?: string | undefined;
  owningUserId?: string | undefined;
  owningGroupId?: string | undefined;
  sortBy?: SortKey | undefined;
  sortOrder?: SortOrder | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface SubscriptionGrantSummary {
  id: string;
  createdBy: string;
  updatedBy?: string | undefined;
  domainId: string;
  createdAt: Date;
  updatedAt: Date;
  environmentId?: string | undefined;
  subscriptionTargetId: string;
  grantedEntity: GrantedEntity;
  status: SubscriptionGrantOverallStatus;
  assets?: SubscribedAsset[] | undefined;
  subscriptionId?: string | undefined;
}
export type SubscriptionGrants = SubscriptionGrantSummary[];
export interface ListSubscriptionGrantsOutput {
  items: SubscriptionGrantSummary[];
  nextToken?: string | undefined;
}
export interface ListSubscriptionRequestsInput {
  domainIdentifier: string;
  status?: SubscriptionRequestStatus | undefined;
  subscribedListingId?: string | undefined;
  owningProjectId?: string | undefined;
  owningIamPrincipalArn?: string | undefined;
  approverProjectId?: string | undefined;
  owningUserId?: string | undefined;
  owningGroupId?: string | undefined;
  sortBy?: SortKey | undefined;
  sortOrder?: SortOrder | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface MetadataFormSummary {
  formName?: string | undefined;
  typeName: string | redacted.Redacted<string>;
  typeRevision: string;
}
export type MetadataFormsSummary = MetadataFormSummary[];
export interface SubscriptionRequestSummary {
  id: string;
  createdBy: string;
  updatedBy?: string | undefined;
  domainId: string;
  status: SubscriptionRequestStatus;
  createdAt: Date;
  updatedAt: Date;
  requestReason: string | redacted.Redacted<string>;
  subscribedPrincipals: SubscribedPrincipal[];
  subscribedListings: SubscribedListing[];
  reviewerId?: string | undefined;
  decisionComment?: string | redacted.Redacted<string> | undefined;
  existingSubscriptionId?: string | undefined;
  metadataFormsSummary?: MetadataFormSummary[] | undefined;
}
export type SubscriptionRequests = SubscriptionRequestSummary[];
export interface ListSubscriptionRequestsOutput {
  items: SubscriptionRequestSummary[];
  nextToken?: string | undefined;
}
export interface ListSubscriptionsInput {
  domainIdentifier: string;
  subscriptionRequestIdentifier?: string | undefined;
  status?: SubscriptionStatus | undefined;
  subscribedListingId?: string | undefined;
  owningProjectId?: string | undefined;
  owningIamPrincipalArn?: string | undefined;
  owningUserId?: string | undefined;
  owningGroupId?: string | undefined;
  approverProjectId?: string | undefined;
  sortBy?: SortKey | undefined;
  sortOrder?: SortOrder | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface SubscriptionSummary {
  id: string;
  createdBy: string;
  updatedBy?: string | undefined;
  domainId: string;
  status: SubscriptionStatus;
  createdAt: Date;
  updatedAt: Date;
  subscribedPrincipal: SubscribedPrincipal;
  subscribedListing: SubscribedListing;
  subscriptionRequestId?: string | undefined;
  retainPermissions?: boolean | undefined;
}
export type Subscriptions = SubscriptionSummary[];
export interface ListSubscriptionsOutput {
  items: SubscriptionSummary[];
  nextToken?: string | undefined;
}
export interface ListSubscriptionTargetsInput {
  domainIdentifier: string;
  environmentIdentifier: string;
  sortBy?: SortKey | undefined;
  sortOrder?: SortOrder | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
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
  updatedBy?: string | undefined;
  createdAt: Date;
  updatedAt?: Date | undefined;
  manageAccessRole?: string | undefined;
  applicableAssetTypes: string[];
  subscriptionTargetConfig: SubscriptionTargetForm[];
  provider: string;
  subscriptionGrantCreationMode?: SubscriptionGrantCreationMode | undefined;
}
export type SubscriptionTargets = SubscriptionTargetSummary[];
export interface ListSubscriptionTargetsOutput {
  items: SubscriptionTargetSummary[];
  nextToken?: string | undefined;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface ListTimeSeriesDataPointsInput {
  domainIdentifier: string;
  entityIdentifier: string;
  entityType: TimeSeriesEntityType;
  formName: string;
  startedAt?: Date | undefined;
  endedAt?: Date | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface ListTimeSeriesDataPointsOutput {
  items?: TimeSeriesDataPointSummaryFormOutput[] | undefined;
  nextToken?: string | undefined;
}
export interface PostLineageEventInput {
  domainIdentifier: string;
  event: T.StreamingInputBody;
  clientToken?: string | undefined;
}
export interface PostLineageEventOutput {
  id?: string | undefined;
  domainId?: string | undefined;
}
export interface TimeSeriesDataPointFormInput {
  formName: string;
  typeIdentifier: string;
  typeRevision?: string | undefined;
  timestamp: Date;
  content?: string | undefined;
}
export type TimeSeriesDataPointFormInputList = TimeSeriesDataPointFormInput[];
export interface PostTimeSeriesDataPointsInput {
  domainIdentifier: string;
  entityIdentifier: string;
  entityType: TimeSeriesEntityType;
  forms: TimeSeriesDataPointFormInput[];
  clientToken?: string | undefined;
}
export type TimeSeriesDataPointFormOutputList = TimeSeriesDataPointFormOutput[];
export interface PostTimeSeriesDataPointsOutput {
  domainId?: string | undefined;
  entityId?: string | undefined;
  entityType?: TimeSeriesEntityType | undefined;
  forms?: TimeSeriesDataPointFormOutput[] | undefined;
}
export interface PutDataExportConfigurationInput {
  domainIdentifier: string;
  enableExport: boolean;
  encryptionConfiguration?: EncryptionConfiguration | undefined;
  clientToken?: string | undefined;
}
export interface PutDataExportConfigurationOutput {}
export interface PutResourceConfiguration {
  name: string;
  description?: string | undefined;
  region: string;
  parameters: { [key: string]: string | undefined };
}
export type PutResourceConfigurations = PutResourceConfiguration[];
export type GlobalParameterMap = { [key: string]: string | undefined };
export interface PutEnvironmentBlueprintConfigurationInput {
  domainIdentifier: string;
  environmentBlueprintIdentifier: string;
  provisioningRoleArn?: string | undefined;
  manageAccessRoleArn?: string | undefined;
  environmentRolePermissionBoundary?: string | undefined;
  enabledRegions: string[];
  regionalParameters?:
    | { [key: string]: { [key: string]: string | undefined } | undefined }
    | undefined;
  resourceConfigurations?: PutResourceConfiguration[] | undefined;
  allowUserProvidedConfigurations?: boolean | undefined;
  globalParameters?: { [key: string]: string | undefined } | undefined;
  provisioningConfigurations?: ProvisioningConfiguration[] | undefined;
}
export interface PutEnvironmentBlueprintConfigurationOutput {
  domainId: string;
  environmentBlueprintId: string;
  provisioningRoleArn?: string | undefined;
  environmentRolePermissionBoundary?: string | undefined;
  manageAccessRoleArn?: string | undefined;
  enabledRegions?: string[] | undefined;
  regionalParameters?:
    | { [key: string]: { [key: string]: string | undefined } | undefined }
    | undefined;
  allowUserProvidedConfigurations?: boolean | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  resourceConfigurations?: ResourceConfiguration[] | undefined;
  provisioningConfigurations?: ProvisioningConfiguration[] | undefined;
}
export type RelationType = "LINEAGE" | (string & {});
export type RelationDirection = "IN" | "OUT" | (string & {});
export interface RelationPattern {
  relationType: RelationType;
  relationDirection: RelationDirection;
  maxPathLength?: number | undefined;
}
export type GraphEntityType = "LINEAGE_NODE" | (string & {});
export type Attribute = string;
export type FilterOperator = "EQ" | "LE" | "LT" | "GE" | "GT" | "TEXT_SEARCH" | (string & {});
export interface Filter {
  attribute: string;
  value?: string | undefined;
  intValue?: number | undefined;
  operator?: FilterOperator | undefined;
}
export type FilterList = FilterClause[];
export type FilterClause =
  | { filter: Filter; and?: undefined; or?: undefined }
  | { filter?: undefined; and: FilterClause[]; or?: undefined }
  | { filter?: undefined; and?: undefined; or: FilterClause[] };
export interface EntityPattern {
  entityType: GraphEntityType;
  identifier: string;
  filters?: FilterClause | undefined;
}
export type MatchClause =
  | { relationPattern: RelationPattern; entityPattern?: undefined }
  | { relationPattern?: undefined; entityPattern: EntityPattern };
export type MatchClauses = MatchClause[];
export type FormNameList = string[];
export interface AdditionalAttributes {
  formNames?: string[] | undefined;
}
export interface QueryGraphInput {
  domainIdentifier: string;
  match: MatchClause[];
  maxResults?: number | undefined;
  nextToken?: string | undefined;
  additionalAttributes?: AdditionalAttributes | undefined;
}
export type LineageNodeIds = string[];
export interface LineageNodeItem {
  domainId: string;
  name?: string | undefined;
  description?: string | undefined;
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
  updatedAt?: Date | undefined;
  updatedBy?: string | undefined;
  id: string;
  typeName: string;
  typeRevision?: string | undefined;
  sourceIdentifier?: string | undefined;
  eventTimestamp?: Date | undefined;
  formsOutput?: FormOutput[] | undefined;
  upstreamLineageNodeIds?: string[] | undefined;
  downstreamLineageNodeIds?: string[] | undefined;
}
export type ResultItem = { lineageNode: LineageNodeItem };
export type ResultItemList = ResultItem[];
export interface QueryGraphOutput {
  items?: ResultItem[] | undefined;
  nextToken?: string | undefined;
}
export type RejectRuleBehavior = "ALL" | "NONE" | (string & {});
export interface RejectRule {
  rule?: RejectRuleBehavior | undefined;
  threshold?: number | undefined;
}
export type PredictionChoices = number[];
export interface RejectChoice {
  predictionTarget?: string | undefined;
  predictionChoices?: number[] | undefined;
}
export type RejectChoices = RejectChoice[];
export interface RejectPredictionsInput {
  domainIdentifier: string;
  identifier: string;
  revision?: string | undefined;
  rejectRule?: RejectRule | undefined;
  rejectChoices?: RejectChoice[] | undefined;
  clientToken?: string | undefined;
}
export interface RejectPredictionsOutput {
  domainId: string;
  assetId: string;
  assetRevision: string;
}
export interface RejectSubscriptionRequestInput {
  domainIdentifier: string;
  identifier: string;
  decisionComment?: string | redacted.Redacted<string> | undefined;
}
export interface RejectSubscriptionRequestOutput {
  id: string;
  createdBy: string;
  updatedBy?: string | undefined;
  domainId: string;
  status: SubscriptionRequestStatus;
  createdAt: Date;
  updatedAt: Date;
  requestReason: string | redacted.Redacted<string>;
  subscribedPrincipals: SubscribedPrincipal[];
  subscribedListings: SubscribedListing[];
  reviewerId?: string | undefined;
  decisionComment?: string | redacted.Redacted<string> | undefined;
  existingSubscriptionId?: string | undefined;
  metadataForms?: FormOutput[] | undefined;
}
export interface RemoveEntityOwnerInput {
  domainIdentifier: string;
  entityType: DataZoneEntityType;
  entityIdentifier: string;
  owner: OwnerProperties;
  clientToken?: string | undefined;
}
export interface RemoveEntityOwnerOutput {}
export interface RemovePolicyGrantInput {
  domainIdentifier: string;
  entityType: TargetEntityType;
  entityIdentifier: string;
  policyType: ManagedPolicyType;
  principal: PolicyGrantPrincipal;
  grantIdentifier?: string | undefined;
  clientToken?: string | undefined;
}
export interface RemovePolicyGrantOutput {}
export interface RevokeSubscriptionInput {
  domainIdentifier: string;
  identifier: string;
  retainPermissions?: boolean | undefined;
}
export interface RevokeSubscriptionOutput {
  id: string;
  createdBy: string;
  updatedBy?: string | undefined;
  domainId: string;
  status: SubscriptionStatus;
  createdAt: Date;
  updatedAt: Date;
  subscribedPrincipal: SubscribedPrincipal;
  subscribedListing: SubscribedListing;
  subscriptionRequestId?: string | undefined;
  retainPermissions?: boolean | undefined;
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
  order?: SortOrder | undefined;
}
export type SearchOutputAdditionalAttribute =
  | "FORMS"
  | "TIME_SERIES_DATA_POINT_FORMS"
  | "TEXT_MATCH_RATIONALE"
  | (string & {});
export type SearchOutputAdditionalAttributes = SearchOutputAdditionalAttribute[];
export interface SearchInput {
  domainIdentifier: string;
  owningProjectIdentifier?: string | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
  searchScope: InventorySearchScope;
  searchText?: string | undefined;
  searchIn?: SearchInItem[] | undefined;
  filters?: FilterClause | undefined;
  sort?: SearchSort | undefined;
  additionalAttributes?: SearchOutputAdditionalAttribute[] | undefined;
}
export interface MatchOffset {
  startOffset?: number | undefined;
  endOffset?: number | undefined;
}
export type MatchOffsets = MatchOffset[];
export interface TextMatchItem {
  attribute?: string | undefined;
  text?: string | undefined;
  matchOffsets?: MatchOffset[] | undefined;
}
export type TextMatches = TextMatchItem[];
export type MatchRationaleItem = { textMatches: TextMatchItem[] };
export type MatchRationale = MatchRationaleItem[];
export interface GlossaryItemAdditionalAttributes {
  matchRationale?: MatchRationaleItem[] | undefined;
}
export interface GlossaryItem {
  domainId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  owningProjectId: string;
  description?: string | redacted.Redacted<string> | undefined;
  status: GlossaryStatus;
  usageRestrictions?: GlossaryUsageRestriction[] | undefined;
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
  updatedAt?: Date | undefined;
  updatedBy?: string | undefined;
  additionalAttributes?: GlossaryItemAdditionalAttributes | undefined;
}
export interface GlossaryTermItemAdditionalAttributes {
  matchRationale?: MatchRationaleItem[] | undefined;
}
export interface GlossaryTermItem {
  domainId: string;
  glossaryId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  shortDescription?: string | redacted.Redacted<string> | undefined;
  usageRestrictions?: GlossaryUsageRestriction[] | undefined;
  longDescription?: string | redacted.Redacted<string> | undefined;
  termRelations?: TermRelations | undefined;
  status: GlossaryTermStatus;
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
  updatedAt?: Date | undefined;
  updatedBy?: string | undefined;
  additionalAttributes?: GlossaryTermItemAdditionalAttributes | undefined;
}
export interface AssetItemAdditionalAttributes {
  formsOutput?: FormOutput[] | undefined;
  readOnlyFormsOutput?: FormOutput[] | undefined;
  latestTimeSeriesDataPointFormsOutput?: TimeSeriesDataPointSummaryFormOutput[] | undefined;
  matchRationale?: MatchRationaleItem[] | undefined;
}
export interface AssetItem {
  domainId: string;
  identifier: string;
  name: string | redacted.Redacted<string>;
  typeIdentifier: string;
  typeRevision: string;
  externalIdentifier?: string | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
  firstRevisionCreatedAt?: Date | undefined;
  firstRevisionCreatedBy?: string | undefined;
  glossaryTerms?: string[] | undefined;
  owningProjectId: string;
  additionalAttributes?: AssetItemAdditionalAttributes | undefined;
  governedGlossaryTerms?: string[] | undefined;
}
export interface DataProductItemAdditionalAttributes {
  matchRationale?: MatchRationaleItem[] | undefined;
}
export interface DataProductResultItem {
  domainId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  owningProjectId: string;
  description?: string | redacted.Redacted<string> | undefined;
  glossaryTerms?: string[] | undefined;
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
  firstRevisionCreatedAt?: Date | undefined;
  firstRevisionCreatedBy?: string | undefined;
  additionalAttributes?: DataProductItemAdditionalAttributes | undefined;
}
export type SearchInventoryResultItem =
  | {
      glossaryItem: GlossaryItem;
      glossaryTermItem?: undefined;
      assetItem?: undefined;
      dataProductItem?: undefined;
    }
  | {
      glossaryItem?: undefined;
      glossaryTermItem: GlossaryTermItem;
      assetItem?: undefined;
      dataProductItem?: undefined;
    }
  | {
      glossaryItem?: undefined;
      glossaryTermItem?: undefined;
      assetItem: AssetItem;
      dataProductItem?: undefined;
    }
  | {
      glossaryItem?: undefined;
      glossaryTermItem?: undefined;
      assetItem?: undefined;
      dataProductItem: DataProductResultItem;
    };
export type SearchInventoryResultItems = SearchInventoryResultItem[];
export interface SearchOutput {
  items?: SearchInventoryResultItem[] | undefined;
  nextToken?: string | undefined;
  totalMatchCount?: number | undefined;
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
  searchText?: string | redacted.Redacted<string> | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface GroupProfileSummary {
  domainId?: string | undefined;
  id?: string | undefined;
  status?: GroupProfileStatus | undefined;
  groupName?: string | redacted.Redacted<string> | undefined;
  rolePrincipalArn?: string | undefined;
  rolePrincipalId?: string | undefined;
}
export type GroupProfileSummaries = GroupProfileSummary[];
export interface SearchGroupProfilesOutput {
  items?: GroupProfileSummary[] | undefined;
  nextToken?: string | undefined;
}
export type AggregationDisplayValue = string;
export interface AggregationListItem {
  attribute: string;
  displayValue?: string | undefined;
}
export type AggregationList = AggregationListItem[];
export interface SearchListingsInput {
  domainIdentifier: string;
  searchText?: string | undefined;
  searchIn?: SearchInItem[] | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
  filters?: FilterClause | undefined;
  aggregations?: AggregationListItem[] | undefined;
  sort?: SearchSort | undefined;
  additionalAttributes?: SearchOutputAdditionalAttribute[] | undefined;
}
export interface AssetListingItemAdditionalAttributes {
  forms?: string | undefined;
  matchRationale?: MatchRationaleItem[] | undefined;
  latestTimeSeriesDataPointForms?: TimeSeriesDataPointSummaryFormOutput[] | undefined;
}
export interface AssetListingItem {
  listingId?: string | undefined;
  listingRevision?: string | undefined;
  name?: string | redacted.Redacted<string> | undefined;
  entityId?: string | undefined;
  entityRevision?: string | undefined;
  entityType?: string | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  createdAt?: Date | undefined;
  listingCreatedBy?: string | undefined;
  listingUpdatedBy?: string | undefined;
  glossaryTerms?: DetailedGlossaryTerm[] | undefined;
  governedGlossaryTerms?: DetailedGlossaryTerm[] | undefined;
  owningProjectId?: string | undefined;
  additionalAttributes?: AssetListingItemAdditionalAttributes | undefined;
}
export interface DataProductListingItemAdditionalAttributes {
  forms?: string | undefined;
  matchRationale?: MatchRationaleItem[] | undefined;
}
export interface ListingSummaryItem {
  listingId?: string | undefined;
  listingRevision?: string | undefined;
  glossaryTerms?: DetailedGlossaryTerm[] | undefined;
}
export type ListingSummaryItems = ListingSummaryItem[];
export interface DataProductListingItem {
  listingId?: string | undefined;
  listingRevision?: string | undefined;
  name?: string | redacted.Redacted<string> | undefined;
  entityId?: string | undefined;
  entityRevision?: string | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  createdAt?: Date | undefined;
  listingCreatedBy?: string | undefined;
  listingUpdatedBy?: string | undefined;
  glossaryTerms?: DetailedGlossaryTerm[] | undefined;
  owningProjectId?: string | undefined;
  additionalAttributes?: DataProductListingItemAdditionalAttributes | undefined;
  items?: ListingSummaryItem[] | undefined;
}
export type SearchResultItem =
  | { assetListing: AssetListingItem; dataProductListing?: undefined }
  | { assetListing?: undefined; dataProductListing: DataProductListingItem };
export type SearchResultItems = SearchResultItem[];
export type AggregationAttributeValue = string;
export type AggregationAttributeDisplayValue = string;
export interface AggregationOutputItem {
  value?: string | undefined;
  count?: number | undefined;
  displayValue?: string | undefined;
}
export type AggregationOutputItems = AggregationOutputItem[];
export interface AggregationOutput {
  attribute?: string | undefined;
  displayValue?: string | undefined;
  items?: AggregationOutputItem[] | undefined;
}
export type AggregationOutputList = AggregationOutput[];
export interface SearchListingsOutput {
  items?: SearchResultItem[] | undefined;
  nextToken?: string | undefined;
  totalMatchCount?: number | undefined;
  aggregates?: AggregationOutput[] | undefined;
}
export type TypesSearchScope = "ASSET_TYPE" | "FORM_TYPE" | "LINEAGE_NODE_TYPE" | (string & {});
export interface SearchTypesInput {
  domainIdentifier: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
  searchScope: TypesSearchScope;
  searchText?: string | undefined;
  searchIn?: SearchInItem[] | undefined;
  filters?: FilterClause | undefined;
  sort?: SearchSort | undefined;
  managed: boolean;
}
export interface AssetTypeItem {
  domainId: string;
  name: string;
  revision: string;
  description?: string | redacted.Redacted<string> | undefined;
  formsOutput: { [key: string]: FormEntryOutput | undefined };
  owningProjectId: string;
  originDomainId?: string | undefined;
  originProjectId?: string | undefined;
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
  updatedAt?: Date | undefined;
  updatedBy?: string | undefined;
}
export interface FormTypeData {
  domainId: string;
  name: string | redacted.Redacted<string>;
  revision: string;
  model?: Model | undefined;
  status?: FormTypeStatus | undefined;
  owningProjectId?: string | undefined;
  originDomainId?: string | undefined;
  originProjectId?: string | undefined;
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  imports?: Import[] | undefined;
}
export interface LineageNodeTypeItem {
  domainId: string;
  name?: string | undefined;
  description?: string | undefined;
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
  updatedAt?: Date | undefined;
  updatedBy?: string | undefined;
  revision: string;
  formsOutput: { [key: string]: FormEntryOutput | undefined };
}
export type SearchTypesResultItem =
  | { assetTypeItem: AssetTypeItem; formTypeItem?: undefined; lineageNodeTypeItem?: undefined }
  | { assetTypeItem?: undefined; formTypeItem: FormTypeData; lineageNodeTypeItem?: undefined }
  | {
      assetTypeItem?: undefined;
      formTypeItem?: undefined;
      lineageNodeTypeItem: LineageNodeTypeItem;
    };
export type SearchTypesResultItems = SearchTypesResultItem[];
export interface SearchTypesOutput {
  items?: SearchTypesResultItem[] | undefined;
  nextToken?: string | undefined;
  totalMatchCount?: number | undefined;
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
  searchText?: string | redacted.Redacted<string> | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface UserProfileSummary {
  domainId?: string | undefined;
  id?: string | undefined;
  type?: UserProfileType | undefined;
  status?: UserProfileStatus | undefined;
  details?: UserProfileDetails | undefined;
}
export type UserProfileSummaries = UserProfileSummary[];
export interface SearchUserProfilesOutput {
  items?: UserProfileSummary[] | undefined;
  nextToken?: string | undefined;
}
export interface StartDataSourceRunInput {
  domainIdentifier: string;
  dataSourceIdentifier: string;
  clientToken?: string | undefined;
}
export interface StartDataSourceRunOutput {
  domainId: string;
  dataSourceId: string;
  id: string;
  projectId: string;
  status: DataSourceRunStatus;
  type: DataSourceRunType;
  dataSourceConfigurationSnapshot?: string | undefined;
  runStatisticsForAssets?: RunStatisticsForAssets | undefined;
  errorMessage?: DataSourceErrorMessage | undefined;
  createdAt: Date;
  updatedAt: Date;
  startedAt?: Date | undefined;
  stoppedAt?: Date | undefined;
}
export interface StartMetadataGenerationRunInput {
  domainIdentifier: string;
  type?: MetadataGenerationRunType | undefined;
  types?: MetadataGenerationRunType[] | undefined;
  target: MetadataGenerationRunTarget;
  clientToken?: string | undefined;
  owningProjectIdentifier: string;
}
export interface StartMetadataGenerationRunOutput {
  domainId: string;
  id: string;
  status?: MetadataGenerationRunStatus | undefined;
  type?: MetadataGenerationRunType | undefined;
  types?: MetadataGenerationRunType[] | undefined;
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
  owningProjectId?: string | undefined;
}
export interface StartNotebookExportInput {
  domainIdentifier: string;
  notebookIdentifier: string;
  owningProjectIdentifier: string;
  fileFormat: FileFormat;
  clientToken?: string | undefined;
}
export interface StartNotebookExportOutput {
  id: string;
  domainId: string;
  owningProjectId: string;
  notebookId: string;
  fileFormat: FileFormat;
  status: NotebookExportStatus;
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
}
export type S3SourceLocation = string | redacted.Redacted<string>;
export type S3BucketName = string | redacted.Redacted<string>;
export type S3ObjectKey = string | redacted.Redacted<string>;
export interface S3File {
  key: string | redacted.Redacted<string>;
}
export type S3FileList = S3File[];
export interface S3FilesLocation {
  bucket: string | redacted.Redacted<string>;
  fileList: S3File[];
}
export type SourceLocation =
  | { s3: string | redacted.Redacted<string>; s3Files?: undefined }
  | { s3?: undefined; s3Files: S3FilesLocation };
export interface StartNotebookImportInput {
  domainIdentifier: string;
  owningProjectIdentifier: string;
  sourceLocation: SourceLocation;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string> | undefined;
  type?: NotebookType | undefined;
  clientToken?: string | undefined;
}
export interface StartNotebookImportOutput {
  notebookId?: string | undefined;
  status?: NotebookStatus | undefined;
  domainId?: string | undefined;
  owningProjectId?: string | undefined;
  name?: string | redacted.Redacted<string> | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  type?: NotebookType | undefined;
  sourceLocation?: SourceLocation | undefined;
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
}
export interface StartNotebookRunInput {
  domainIdentifier: string;
  owningProjectIdentifier: string;
  notebookIdentifier: string;
  scheduleIdentifier?: string | undefined;
  computeConfiguration?: ComputeConfig | undefined;
  networkConfiguration?: NetworkConfig | undefined;
  timeoutConfiguration?: TimeoutConfig | undefined;
  notificationConfiguration?: NotificationConfig | undefined;
  triggerSource?: TriggerSource | undefined;
  metadata?: { [key: string]: string | redacted.Redacted<string> | undefined } | undefined;
  parameters?: { [key: string]: string | undefined } | undefined;
  clientToken?: string | undefined;
}
export interface StartNotebookRunOutput {
  id: string;
  domainId: string;
  owningProjectId: string;
  notebookId: string;
  scheduleId?: string | undefined;
  status: NotebookRunStatus;
  cellOrder?: CellInformation[] | undefined;
  metadata?: { [key: string]: string | redacted.Redacted<string> | undefined } | undefined;
  parameters?: { [key: string]: string | undefined } | undefined;
  computeConfiguration?: ComputeConfig | undefined;
  networkConfiguration?: NetworkConfig | undefined;
  timeoutConfiguration?: TimeoutConfig | undefined;
  environmentConfiguration?: EnvironmentConfig | undefined;
  storageConfiguration?: StorageConfig | undefined;
  notificationConfiguration?: NotificationConfig | undefined;
  triggerSource?: TriggerSource | undefined;
  error?: NotebookRunError | undefined;
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
  updatedAt?: Date | undefined;
  updatedBy?: string | undefined;
  startedAt?: Date | undefined;
  completedAt?: Date | undefined;
}
export interface StartNotebookSyncInput {
  domainIdentifier: string;
  owningProjectIdentifier: string;
  sourceLocation: SourceLocation;
  gitMetadata?: GitMetadata | undefined;
  notebookId?: string | undefined;
  name?: string | redacted.Redacted<string> | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  clientToken?: string | undefined;
}
export interface StartNotebookSyncOutput {
  notebookId?: string | undefined;
  status?: NotebookStatus | undefined;
  domainId?: string | undefined;
  owningProjectId?: string | undefined;
  sourceLocation?: SourceLocation | undefined;
  gitMetadata?: GitMetadata | undefined;
  name?: string | redacted.Redacted<string> | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
}
export interface StopNotebookRunInput {
  domainIdentifier: string;
  identifier: string;
  clientToken?: string | undefined;
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
  name?: string | redacted.Redacted<string> | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  resolutionStrategy?: ResolutionStrategy | undefined;
  accountSource?: AccountSource | undefined;
}
export interface UpdateAccountPoolOutput {
  domainId?: string | undefined;
  name?: string | redacted.Redacted<string> | undefined;
  id?: string | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  resolutionStrategy?: ResolutionStrategy | undefined;
  accountSource: AccountSource;
  createdBy: string;
  createdAt?: Date | undefined;
  lastUpdatedAt?: Date | undefined;
  updatedBy?: string | undefined;
  domainUnitId?: string | undefined;
}
export interface UpdateAssetFilterInput {
  domainIdentifier: string;
  assetIdentifier: string;
  identifier: string;
  name?: string | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  configuration?: AssetFilterConfiguration | undefined;
}
export interface UpdateAssetFilterOutput {
  id: string;
  domainId: string;
  assetId: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string> | undefined;
  status?: FilterStatus | undefined;
  configuration: AssetFilterConfiguration;
  createdAt?: Date | undefined;
  errorMessage?: string | undefined;
  effectiveColumnNames?: string[] | undefined;
  effectiveRowFilter?: string | undefined;
}
export interface AthenaPropertiesPatch {
  workgroupName?: string | undefined;
}
export interface OAuth2PropertiesPatch {
  oAuth2GrantType?: OAuth2GrantType | undefined;
  oAuth2ClientApplication?: OAuth2ClientApplication | undefined;
  tokenUrl?: string | undefined;
  tokenUrlParametersMap?: { [key: string]: string | undefined } | undefined;
}
export interface AuthenticationConfigurationPatch {
  secretArn?: string | undefined;
  basicAuthenticationCredentials?: BasicAuthenticationCredentials | undefined;
  oAuth2Properties?: OAuth2PropertiesPatch | undefined;
}
export interface GlueConnectionPatch {
  description?: string | undefined;
  connectionProperties?: { [key: string]: string | undefined } | undefined;
  authenticationConfiguration?: AuthenticationConfigurationPatch | undefined;
}
export interface GluePropertiesPatch {
  glueConnectionInput?: GlueConnectionPatch | undefined;
}
export interface IamPropertiesPatch {
  glueLineageSyncEnabled?: boolean | undefined;
}
export interface RedshiftPropertiesPatch {
  storage?: RedshiftStorageProperties | undefined;
  databaseName?: string | undefined;
  host?: string | undefined;
  port?: number | undefined;
  credentials?: RedshiftCredentials | undefined;
  lineageSync?: RedshiftLineageSyncConfigurationInput | undefined;
}
export interface SparkEmrPropertiesPatch {
  computeArn?: string | undefined;
  instanceProfileArn?: string | undefined;
  javaVirtualEnv?: string | undefined;
  logUri?: string | undefined;
  pythonVirtualEnv?: string | undefined;
  runtimeRole?: string | undefined;
  trustedCertificatesS3Uri?: string | undefined;
  managedEndpointArn?: string | undefined;
}
export interface S3PropertiesPatch {
  s3Uri: string;
  s3AccessGrantLocationId?: string | undefined;
  registerS3AccessGrantLocation?: boolean | undefined;
}
export interface ConnectivityPropertiesPatch {
  description?: string | undefined;
  connectionProperties?: { [key: string]: string | undefined } | undefined;
  authenticationConfiguration?: AuthenticationConfigurationPatch | undefined;
}
export interface SnowflakePropertiesPatch {
  connectivityPropertiesPatch?: ConnectivityPropertiesPatch | undefined;
  snowflakeRole?: string | undefined;
  lineageSync?: LineageSyncInput | undefined;
}
export interface AmazonQPropertiesPatch {
  isEnabled: boolean;
  profileArn?: string | undefined;
  authMode?: string | undefined;
}
export interface MlflowPropertiesPatch {
  trackingServerArn?: string | undefined;
}
export interface LakehousePropertiesPatch {
  glueLineageSyncEnabled?: boolean | undefined;
}
export interface VpcPropertiesPatch {
  vpcId?: string | undefined;
  subnetIds?: string[] | undefined;
  securityGroupId?: string | undefined;
}
export interface GitPropertiesPatch {
  codeConnectionArn?: string | undefined;
  defaultBranch?: string | undefined;
}
export type ConnectionPropertiesPatch =
  | {
      athenaProperties: AthenaPropertiesPatch;
      glueProperties?: undefined;
      iamProperties?: undefined;
      redshiftProperties?: undefined;
      sparkEmrProperties?: undefined;
      s3Properties?: undefined;
      snowflakeProperties?: undefined;
      amazonQProperties?: undefined;
      mlflowProperties?: undefined;
      lakehouseProperties?: undefined;
      vpcProperties?: undefined;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties: GluePropertiesPatch;
      iamProperties?: undefined;
      redshiftProperties?: undefined;
      sparkEmrProperties?: undefined;
      s3Properties?: undefined;
      snowflakeProperties?: undefined;
      amazonQProperties?: undefined;
      mlflowProperties?: undefined;
      lakehouseProperties?: undefined;
      vpcProperties?: undefined;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties?: undefined;
      iamProperties: IamPropertiesPatch;
      redshiftProperties?: undefined;
      sparkEmrProperties?: undefined;
      s3Properties?: undefined;
      snowflakeProperties?: undefined;
      amazonQProperties?: undefined;
      mlflowProperties?: undefined;
      lakehouseProperties?: undefined;
      vpcProperties?: undefined;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties?: undefined;
      iamProperties?: undefined;
      redshiftProperties: RedshiftPropertiesPatch;
      sparkEmrProperties?: undefined;
      s3Properties?: undefined;
      snowflakeProperties?: undefined;
      amazonQProperties?: undefined;
      mlflowProperties?: undefined;
      lakehouseProperties?: undefined;
      vpcProperties?: undefined;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties?: undefined;
      iamProperties?: undefined;
      redshiftProperties?: undefined;
      sparkEmrProperties: SparkEmrPropertiesPatch;
      s3Properties?: undefined;
      snowflakeProperties?: undefined;
      amazonQProperties?: undefined;
      mlflowProperties?: undefined;
      lakehouseProperties?: undefined;
      vpcProperties?: undefined;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties?: undefined;
      iamProperties?: undefined;
      redshiftProperties?: undefined;
      sparkEmrProperties?: undefined;
      s3Properties: S3PropertiesPatch;
      snowflakeProperties?: undefined;
      amazonQProperties?: undefined;
      mlflowProperties?: undefined;
      lakehouseProperties?: undefined;
      vpcProperties?: undefined;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties?: undefined;
      iamProperties?: undefined;
      redshiftProperties?: undefined;
      sparkEmrProperties?: undefined;
      s3Properties?: undefined;
      snowflakeProperties: SnowflakePropertiesPatch;
      amazonQProperties?: undefined;
      mlflowProperties?: undefined;
      lakehouseProperties?: undefined;
      vpcProperties?: undefined;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties?: undefined;
      iamProperties?: undefined;
      redshiftProperties?: undefined;
      sparkEmrProperties?: undefined;
      s3Properties?: undefined;
      snowflakeProperties?: undefined;
      amazonQProperties: AmazonQPropertiesPatch;
      mlflowProperties?: undefined;
      lakehouseProperties?: undefined;
      vpcProperties?: undefined;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties?: undefined;
      iamProperties?: undefined;
      redshiftProperties?: undefined;
      sparkEmrProperties?: undefined;
      s3Properties?: undefined;
      snowflakeProperties?: undefined;
      amazonQProperties?: undefined;
      mlflowProperties: MlflowPropertiesPatch;
      lakehouseProperties?: undefined;
      vpcProperties?: undefined;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties?: undefined;
      iamProperties?: undefined;
      redshiftProperties?: undefined;
      sparkEmrProperties?: undefined;
      s3Properties?: undefined;
      snowflakeProperties?: undefined;
      amazonQProperties?: undefined;
      mlflowProperties?: undefined;
      lakehouseProperties: LakehousePropertiesPatch;
      vpcProperties?: undefined;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties?: undefined;
      iamProperties?: undefined;
      redshiftProperties?: undefined;
      sparkEmrProperties?: undefined;
      s3Properties?: undefined;
      snowflakeProperties?: undefined;
      amazonQProperties?: undefined;
      mlflowProperties?: undefined;
      lakehouseProperties?: undefined;
      vpcProperties: VpcPropertiesPatch;
      gitProperties?: undefined;
    }
  | {
      athenaProperties?: undefined;
      glueProperties?: undefined;
      iamProperties?: undefined;
      redshiftProperties?: undefined;
      sparkEmrProperties?: undefined;
      s3Properties?: undefined;
      snowflakeProperties?: undefined;
      amazonQProperties?: undefined;
      mlflowProperties?: undefined;
      lakehouseProperties?: undefined;
      vpcProperties?: undefined;
      gitProperties: GitPropertiesPatch;
    };
export interface UpdateConnectionInput {
  configurations?: Configuration[] | undefined;
  domainIdentifier: string;
  identifier: string;
  description?: string | redacted.Redacted<string> | undefined;
  awsLocation?: AwsLocation | undefined;
  props?: ConnectionPropertiesPatch | undefined;
}
export interface UpdateConnectionOutput {
  configurations?: Configuration[] | undefined;
  connectionId: string;
  description?: string | redacted.Redacted<string> | undefined;
  domainId: string;
  domainUnitId: string;
  environmentId?: string | undefined;
  name: string;
  physicalEndpoints: PhysicalEndpoint[];
  projectId?: string | undefined;
  props?: ConnectionPropertiesOutput | undefined;
  type: ConnectionType;
  scope?: ConnectionScope | undefined;
}
export interface UpdateDataSourceInput {
  domainIdentifier: string;
  identifier: string;
  name?: string | redacted.Redacted<string> | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  enableSetting?: EnableSetting | undefined;
  publishOnImport?: boolean | undefined;
  assetFormsInput?: FormInput[] | undefined;
  schedule?: ScheduleConfiguration | undefined;
  configuration?: DataSourceConfigurationInput | undefined;
  recommendation?: RecommendationConfiguration | undefined;
  retainPermissionsOnRevokeFailure?: boolean | undefined;
}
export interface UpdateDataSourceOutput {
  id: string;
  status?: DataSourceStatus | undefined;
  type?: string | undefined;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string> | undefined;
  domainId: string;
  projectId: string;
  environmentId?: string | undefined;
  connectionId?: string | undefined;
  configuration?: DataSourceConfigurationOutput | undefined;
  recommendation?: RecommendationConfiguration | undefined;
  enableSetting?: EnableSetting | undefined;
  publishOnImport?: boolean | undefined;
  assetFormsOutput?: FormOutput[] | undefined;
  schedule?: ScheduleConfiguration | undefined;
  lastRunStatus?: DataSourceRunStatus | undefined;
  lastRunAt?: Date | undefined;
  lastRunErrorMessage?: DataSourceErrorMessage | undefined;
  errorMessage?: DataSourceErrorMessage | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  selfGrantStatus?: SelfGrantStatusOutput | undefined;
  retainPermissionsOnRevokeFailure?: boolean | undefined;
}
export interface UpdateDesignationInput {
  domainIdentifier: string;
  identifier: string;
  name?: string | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  policy?: string | undefined;
  deletionProtection?: boolean | undefined;
}
export interface UpdateDesignationOutput {
  domainId: string;
  id: string;
  name: string;
  description?: string | redacted.Redacted<string> | undefined;
  designationType: DesignationType;
  policy: string;
  deletionProtection: boolean;
  createdBy: string;
  createdAt?: Date | undefined;
  lastUpdatedAt?: Date | undefined;
}
export interface UpdateDomainInput {
  identifier: string;
  description?: string | undefined;
  singleSignOn?: SingleSignOn | undefined;
  domainExecutionRole?: string | undefined;
  serviceRole?: string | undefined;
  name?: string | undefined;
  clientToken?: string | undefined;
}
export interface UpdateDomainOutput {
  id: string;
  rootDomainUnitId?: string | undefined;
  description?: string | undefined;
  singleSignOn?: SingleSignOn | undefined;
  domainExecutionRole?: string | undefined;
  serviceRole?: string | undefined;
  name?: string | undefined;
  lastUpdatedAt?: Date | undefined;
}
export interface UpdateDomainUnitInput {
  domainIdentifier: string;
  identifier: string;
  description?: string | redacted.Redacted<string> | undefined;
  name?: string | redacted.Redacted<string> | undefined;
}
export interface UpdateDomainUnitOutput {
  id: string;
  domainId: string;
  name: string | redacted.Redacted<string>;
  owners: DomainUnitOwnerProperties[];
  description?: string | redacted.Redacted<string> | undefined;
  parentDomainUnitId?: string | undefined;
  createdAt?: Date | undefined;
  lastUpdatedAt?: Date | undefined;
  createdBy?: string | undefined;
  lastUpdatedBy?: string | undefined;
}
export interface UpdateEnvironmentInput {
  domainIdentifier: string;
  identifier: string;
  name?: string | undefined;
  description?: string | undefined;
  glossaryTerms?: string[] | undefined;
  blueprintVersion?: string | undefined;
  userParameters?: EnvironmentParameter[] | undefined;
  environmentConfigurationName?: string | redacted.Redacted<string> | undefined;
}
export interface UpdateEnvironmentOutput {
  projectId: string;
  id?: string | undefined;
  domainId: string;
  createdBy: string;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string> | undefined;
  environmentProfileId?: string | undefined;
  awsAccountId?: string | undefined;
  awsAccountRegion?: string | undefined;
  provider: string;
  provisionedResources?: Resource[] | undefined;
  status?: EnvironmentStatus | undefined;
  environmentActions?: ConfigurableEnvironmentAction[] | undefined;
  glossaryTerms?: string[] | undefined;
  userParameters?: CustomParameter[] | undefined;
  lastDeployment?: Deployment | undefined;
  provisioningProperties?: ProvisioningProperties | undefined;
  deploymentProperties?: DeploymentProperties | undefined;
  environmentBlueprintId?: string | undefined;
  environmentConfigurationId?: string | redacted.Redacted<string> | undefined;
  environmentConfigurationName?: string | redacted.Redacted<string> | undefined;
}
export interface UpdateEnvironmentActionInput {
  domainIdentifier: string;
  environmentIdentifier: string;
  identifier: string;
  parameters?: ActionParameters | undefined;
  name?: string | undefined;
  description?: string | undefined;
}
export interface UpdateEnvironmentActionOutput {
  domainId: string;
  environmentId: string;
  id: string;
  name: string;
  parameters: ActionParameters;
  description?: string | undefined;
}
export interface UpdateEnvironmentBlueprintInput {
  domainIdentifier: string;
  identifier: string;
  description?: string | undefined;
  provisioningProperties?: ProvisioningProperties | undefined;
  userParameters?: CustomParameter[] | undefined;
  blueprintCategory?: BlueprintCategory | undefined;
}
export interface UpdateEnvironmentBlueprintOutput {
  id: string;
  name: string;
  description?: string | redacted.Redacted<string> | undefined;
  provider: string;
  provisioningProperties: ProvisioningProperties;
  deploymentProperties?: DeploymentProperties | undefined;
  userParameters?: CustomParameter[] | undefined;
  glossaryTerms?: string[] | undefined;
  blueprintCategory?: BlueprintCategory | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
export interface UpdateEnvironmentProfileInput {
  domainIdentifier: string;
  identifier: string;
  name?: string | redacted.Redacted<string> | undefined;
  description?: string | undefined;
  userParameters?: EnvironmentParameter[] | undefined;
  awsAccountId?: string | undefined;
  awsAccountRegion?: string | undefined;
}
export interface UpdateEnvironmentProfileOutput {
  id: string;
  domainId: string;
  awsAccountId?: string | undefined;
  awsAccountRegion?: string | undefined;
  createdBy: string;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string> | undefined;
  environmentBlueprintId: string;
  projectId?: string | undefined;
  userParameters?: CustomParameter[] | undefined;
}
export interface UpdateGlossaryInput {
  domainIdentifier: string;
  identifier: string;
  name?: string | redacted.Redacted<string> | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  status?: GlossaryStatus | undefined;
  clientToken?: string | undefined;
}
export interface UpdateGlossaryOutput {
  domainId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  owningProjectId: string;
  description?: string | redacted.Redacted<string> | undefined;
  status?: GlossaryStatus | undefined;
  usageRestrictions?: GlossaryUsageRestriction[] | undefined;
}
export interface UpdateGlossaryTermInput {
  domainIdentifier: string;
  glossaryIdentifier?: string | undefined;
  identifier: string;
  name?: string | redacted.Redacted<string> | undefined;
  shortDescription?: string | redacted.Redacted<string> | undefined;
  longDescription?: string | redacted.Redacted<string> | undefined;
  termRelations?: TermRelations | undefined;
  status?: GlossaryTermStatus | undefined;
}
export interface UpdateGlossaryTermOutput {
  id: string;
  domainId: string;
  glossaryId: string;
  name: string | redacted.Redacted<string>;
  status: GlossaryTermStatus;
  shortDescription?: string | redacted.Redacted<string> | undefined;
  longDescription?: string | redacted.Redacted<string> | undefined;
  termRelations?: TermRelations | undefined;
  usageRestrictions?: GlossaryUsageRestriction[] | undefined;
}
export interface UpdateGroupProfileInput {
  domainIdentifier: string;
  groupIdentifier: string;
  status: GroupProfileStatus;
}
export interface UpdateGroupProfileOutput {
  domainId?: string | undefined;
  id?: string | undefined;
  status?: GroupProfileStatus | undefined;
  groupName?: string | redacted.Redacted<string> | undefined;
  rolePrincipalArn?: string | undefined;
  rolePrincipalId?: string | undefined;
}
export interface UpdateNotebookInput {
  domainIdentifier: string;
  identifier: string;
  description?: string | redacted.Redacted<string> | undefined;
  status?: NotebookStatus | undefined;
  name?: string | redacted.Redacted<string> | undefined;
  cellOrder?: CellInformation[] | undefined;
  type?: NotebookType | undefined;
  metadata?: { [key: string]: string | redacted.Redacted<string> | undefined } | undefined;
  parameters?: { [key: string]: string | undefined } | undefined;
  environmentConfiguration?: EnvironmentConfig | undefined;
  clientToken?: string | undefined;
}
export interface UpdateNotebookOutput {
  id: string;
  name: string | redacted.Redacted<string>;
  owningProjectId: string;
  domainId: string;
  cellOrder: CellInformation[];
  status: NotebookStatus;
  type?: NotebookType | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  createdAt?: Date | undefined;
  createdBy?: string | undefined;
  updatedAt?: Date | undefined;
  updatedBy?: string | undefined;
  lockedBy?: string | undefined;
  lockedAt?: Date | undefined;
  lockExpiresAt?: Date | undefined;
  computeId?: string | undefined;
  metadata?: { [key: string]: string | redacted.Redacted<string> | undefined } | undefined;
  parameters?: { [key: string]: string | undefined } | undefined;
  environmentConfiguration?: EnvironmentConfig | undefined;
  error?: NotebookError | undefined;
  gitMetadata?: GitMetadata | undefined;
}
export interface UpdateProjectInput {
  domainIdentifier: string;
  identifier: string;
  name?: string | redacted.Redacted<string> | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  resourceTags?: { [key: string]: string | undefined } | undefined;
  glossaryTerms?: string[] | undefined;
  domainUnitId?: string | undefined;
  environmentDeploymentDetails?: EnvironmentDeploymentDetails | undefined;
  userParameters?: EnvironmentConfigurationUserParameter[] | undefined;
  projectProfileVersion?: string | undefined;
}
export interface UpdateProjectOutput {
  domainId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string> | undefined;
  projectStatus?: ProjectStatus | undefined;
  failureReasons?: ProjectDeletionError[] | undefined;
  createdBy: string;
  createdAt?: Date | undefined;
  lastUpdatedAt?: Date | undefined;
  resourceTags?: ResourceTag[] | undefined;
  glossaryTerms?: string[] | undefined;
  domainUnitId?: string | undefined;
  projectProfileId?: string | undefined;
  userParameters?: EnvironmentConfigurationUserParameter[] | undefined;
  environmentDeploymentDetails?: EnvironmentDeploymentDetails | undefined;
  projectCategory?: string | undefined;
}
export interface UpdateProjectProfileInput {
  domainIdentifier: string;
  identifier: string;
  name?: string | redacted.Redacted<string> | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  status?: Status | undefined;
  projectResourceTags?: ResourceTagParameter[] | undefined;
  allowCustomProjectResourceTags?: boolean | undefined;
  projectResourceTagsDescription?: string | redacted.Redacted<string> | undefined;
  environmentConfigurations?: EnvironmentConfiguration[] | undefined;
  domainUnitIdentifier?: string | undefined;
}
export interface UpdateProjectProfileOutput {
  domainId: string;
  id: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string> | undefined;
  status?: Status | undefined;
  projectResourceTags?: ResourceTagParameter[] | undefined;
  allowCustomProjectResourceTags?: boolean | undefined;
  projectResourceTagsDescription?: string | redacted.Redacted<string> | undefined;
  environmentConfigurations?: EnvironmentConfiguration[] | undefined;
  createdBy: string;
  createdAt?: Date | undefined;
  lastUpdatedAt?: Date | undefined;
  domainUnitId?: string | undefined;
}
export interface UpdateRootDomainUnitOwnerInput {
  domainIdentifier: string;
  currentOwner: string;
  newOwner: string;
  clientToken?: string | undefined;
}
export interface UpdateRootDomainUnitOwnerOutput {}
export interface UpdateRuleInput {
  domainIdentifier: string;
  identifier: string;
  name?: string | redacted.Redacted<string> | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  scope?: RuleScope | undefined;
  detail?: RuleDetail | undefined;
  includeChildDomainUnits?: boolean | undefined;
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
  description?: string | redacted.Redacted<string> | undefined;
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
  failureCause?: FailureCause | undefined;
  targetName?: string | undefined;
}
export interface UpdateSubscriptionGrantStatusOutput {
  id: string;
  createdBy: string;
  updatedBy?: string | undefined;
  domainId: string;
  createdAt: Date;
  updatedAt: Date;
  environmentId?: string | undefined;
  subscriptionTargetId: string;
  grantedEntity: GrantedEntity;
  status: SubscriptionGrantOverallStatus;
  assets?: SubscribedAsset[] | undefined;
  subscriptionId?: string | undefined;
}
export interface UpdateSubscriptionRequestInput {
  domainIdentifier: string;
  identifier: string;
  requestReason: string | redacted.Redacted<string>;
}
export interface UpdateSubscriptionRequestOutput {
  id: string;
  createdBy: string;
  updatedBy?: string | undefined;
  domainId: string;
  status: SubscriptionRequestStatus;
  createdAt: Date;
  updatedAt: Date;
  requestReason: string | redacted.Redacted<string>;
  subscribedPrincipals: SubscribedPrincipal[];
  subscribedListings: SubscribedListing[];
  reviewerId?: string | undefined;
  decisionComment?: string | redacted.Redacted<string> | undefined;
  existingSubscriptionId?: string | undefined;
  metadataForms?: FormOutput[] | undefined;
}
export interface UpdateSubscriptionTargetInput {
  domainIdentifier: string;
  environmentIdentifier: string;
  identifier: string;
  name?: string | redacted.Redacted<string> | undefined;
  authorizedPrincipals?: string[] | undefined;
  applicableAssetTypes?: string[] | undefined;
  subscriptionTargetConfig?: SubscriptionTargetForm[] | undefined;
  manageAccessRole?: string | undefined;
  provider?: string | undefined;
  subscriptionGrantCreationMode?: SubscriptionGrantCreationMode | undefined;
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
  updatedBy?: string | undefined;
  createdAt: Date;
  updatedAt?: Date | undefined;
  manageAccessRole?: string | undefined;
  applicableAssetTypes: string[];
  subscriptionTargetConfig: SubscriptionTargetForm[];
  provider: string;
  subscriptionGrantCreationMode?: SubscriptionGrantCreationMode | undefined;
}
export interface UpdateUserProfileInput {
  domainIdentifier: string;
  userIdentifier: string;
  type?: UserProfileType | undefined;
  status: UserProfileStatus;
  sessionName?: string | undefined;
}
export interface UpdateUserProfileOutput {
  domainId?: string | undefined;
  id?: string | undefined;
  type?: UserProfileType | undefined;
  status?: UserProfileStatus | undefined;
  details?: UserProfileDetails | undefined;
}
export type ErrorMessage = string;
export type AcceptPredictionsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Accepts automatically generated business-friendly metadata for your Amazon DataZone assets.
 */
export const acceptPredictions: API.OperationMethod<
  AcceptPredictionsInput & RegionInput,
  AcceptPredictionsOutput,
  AcceptPredictionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8450, __c264, 2) as any as S.Schema<AcceptPredictionsInput>,
  output: __S(8451, __c264, 3) as any as S.Schema<AcceptPredictionsOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptPredictions",
  telemetry: TELEMETRY,
  span: "AcceptPredictions",
}));

export type AcceptSubscriptionRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Accepts a subscription request to a specific asset.
 */
export const acceptSubscriptionRequest: API.OperationMethod<
  AcceptSubscriptionRequestInput & RegionInput,
  AcceptSubscriptionRequestOutput,
  AcceptSubscriptionRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<AcceptSubscriptionRequestInput>,
  output: __S(320, __c10, 0) as any as S.Schema<AcceptSubscriptionRequestOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptSubscriptionRequest",
  telemetry: TELEMETRY,
  span: "AcceptSubscriptionRequest",
}));

export type AddEntityOwnerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Adds the owner of an entity (a domain unit).
 */
export const addEntityOwner: API.OperationMethod<
  AddEntityOwnerInput & RegionInput,
  AddEntityOwnerOutput,
  AddEntityOwnerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c23, 0) as any as S.Schema<AddEntityOwnerInput>,
  output: __S(768, __c24, 0) as any as S.Schema<AddEntityOwnerOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddEntityOwner",
  telemetry: TELEMETRY,
  span: "AddEntityOwner",
}));

export type AddPolicyGrantError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Adds a policy grant (an authorization policy) to a specified entity, including domain units, environment blueprint configurations, or environment profiles.
 */
export const addPolicyGrant: API.OperationMethod<
  AddPolicyGrantInput & RegionInput,
  AddPolicyGrantOutput,
  AddPolicyGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1248, __c39, 0) as any as S.Schema<AddPolicyGrantInput>,
  output: __S(1249, __c39, 1) as any as S.Schema<AddPolicyGrantOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddPolicyGrant",
  telemetry: TELEMETRY,
  span: "AddPolicyGrant",
}));

export type AssociateEnvironmentRoleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Associates the environment role in Amazon DataZone.
 */
export const associateEnvironmentRole: API.OperationMethod<
  AssociateEnvironmentRoleInput & RegionInput,
  AssociateEnvironmentRoleOutput,
  AssociateEnvironmentRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1664, __c52, 0) as any as S.Schema<AssociateEnvironmentRoleInput>,
  output: __S(768, __c24, 0) as any as S.Schema<AssociateEnvironmentRoleOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateEnvironmentRole",
  telemetry: TELEMETRY,
  span: "AssociateEnvironmentRole",
}));

export type AssociateGovernedTermsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Associates governed terms with an asset.
 */
export const associateGovernedTerms: API.OperationMethod<
  AssociateGovernedTermsInput & RegionInput,
  AssociateGovernedTermsOutput,
  AssociateGovernedTermsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2016, __c63, 0) as any as S.Schema<AssociateGovernedTermsInput>,
  output: __S(768, __c24, 0) as any as S.Schema<AssociateGovernedTermsOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateGovernedTerms",
  telemetry: TELEMETRY,
  span: "AssociateGovernedTerms",
}));

export type BatchGetAttributesMetadataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets the attribute metadata.
 */
export const batchGetAttributesMetadata: API.OperationMethod<
  BatchGetAttributesMetadataInput & RegionInput,
  BatchGetAttributesMetadataOutput,
  BatchGetAttributesMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2368, __c74, 0) as any as S.Schema<BatchGetAttributesMetadataInput>,
  output: __S(2371, __c74, 3) as any as S.Schema<BatchGetAttributesMetadataOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetAttributesMetadata",
  telemetry: TELEMETRY,
  span: "BatchGetAttributesMetadata",
}));

export type BatchPutAttributesMetadataError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Writes the attribute metadata.
 */
export const batchPutAttributesMetadata: API.OperationMethod<
  BatchPutAttributesMetadataInput & RegionInput,
  BatchPutAttributesMetadataOutput,
  BatchPutAttributesMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2754, __c86, 2) as any as S.Schema<BatchPutAttributesMetadataInput>,
  output: __S(2757, __c86, 5) as any as S.Schema<BatchPutAttributesMetadataOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchPutAttributesMetadata",
  telemetry: TELEMETRY,
  span: "BatchPutAttributesMetadata",
}));

export type CancelMetadataGenerationRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
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
  CancelMetadataGenerationRunInput & RegionInput,
  CancelMetadataGenerationRunOutput,
  CancelMetadataGenerationRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3232, __c101, 0) as any as S.Schema<CancelMetadataGenerationRunInput>,
  output: __S(768, __c24, 0) as any as S.Schema<CancelMetadataGenerationRunOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelMetadataGenerationRun",
  telemetry: TELEMETRY,
  span: "CancelMetadataGenerationRun",
}));

export type CancelSubscriptionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Cancels the subscription to the specified asset.
 */
export const cancelSubscription: API.OperationMethod<
  CancelSubscriptionInput & RegionInput,
  CancelSubscriptionOutput,
  CancelSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3616, __c113, 0) as any as S.Schema<CancelSubscriptionInput>,
  output: __S(3648, __c114, 0) as any as S.Schema<CancelSubscriptionOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelSubscription",
  telemetry: TELEMETRY,
  span: "CancelSubscription",
}));

export type CreateAccountPoolError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates an account pool.
 */
export const createAccountPool: API.OperationMethod<
  CreateAccountPoolInput & RegionInput,
  CreateAccountPoolOutput,
  CreateAccountPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4000, __c125, 0) as any as S.Schema<CreateAccountPoolInput>,
  output: __S(4066, __c127, 2) as any as S.Schema<CreateAccountPoolOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccountPool",
  telemetry: TELEMETRY,
  span: "CreateAccountPool",
}));

export type CreateAssetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
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
  CreateAssetInput & RegionInput,
  CreateAssetOutput,
  CreateAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4416, __c138, 0) as any as S.Schema<CreateAssetInput>,
  output: __S(4450, __c139, 2) as any as S.Schema<CreateAssetOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAsset",
  telemetry: TELEMETRY,
  span: "CreateAsset",
}));

export type CreateAssetFilterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
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
  CreateAssetFilterInput & RegionInput,
  CreateAssetFilterOutput,
  CreateAssetFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4672, __c146, 0) as any as S.Schema<CreateAssetFilterInput>,
  output: __S(4713, __c147, 9) as any as S.Schema<CreateAssetFilterOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAssetFilter",
  telemetry: TELEMETRY,
  span: "CreateAssetFilter",
}));

export type CreateAssetRevisionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
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
  CreateAssetRevisionInput & RegionInput,
  CreateAssetRevisionOutput,
  CreateAssetRevisionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4736, __c148, 0) as any as S.Schema<CreateAssetRevisionInput>,
  output: __S(4450, __c139, 2) as any as S.Schema<CreateAssetRevisionOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAssetRevision",
  telemetry: TELEMETRY,
  span: "CreateAssetRevision",
}));

export type CreateAssetTypeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
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
  CreateAssetTypeInput & RegionInput,
  CreateAssetTypeOutput,
  CreateAssetTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4770, __c149, 2) as any as S.Schema<CreateAssetTypeInput>,
  output: __S(4771, __c149, 3) as any as S.Schema<CreateAssetTypeOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAssetType",
  telemetry: TELEMETRY,
  span: "CreateAssetType",
}));

export type CreateConnectionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a new connection. In Amazon DataZone, a connection enables you to connect your resources (domains, projects, and environments) to external resources and services.
 */
export const createConnection: API.OperationMethod<
  CreateConnectionInput & RegionInput,
  CreateConnectionOutput,
  CreateConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4841, __c151, 9) as any as S.Schema<CreateConnectionInput>,
  output: __S(4842, __c151, 10) as any as S.Schema<CreateConnectionOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnection",
  telemetry: TELEMETRY,
  span: "CreateConnection",
}));

export type CreateDataProductError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
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
  CreateDataProductInput & RegionInput,
  CreateDataProductOutput,
  CreateDataProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5024, __c157, 0) as any as S.Schema<CreateDataProductInput>,
  output: __S(5058, __c158, 2) as any as S.Schema<CreateDataProductOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataProduct",
  telemetry: TELEMETRY,
  span: "CreateDataProduct",
}));

export type CreateDataProductRevisionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
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
  CreateDataProductRevisionInput & RegionInput,
  CreateDataProductRevisionOutput,
  CreateDataProductRevisionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5088, __c159, 0) as any as S.Schema<CreateDataProductRevisionInput>,
  output: __S(5058, __c158, 2) as any as S.Schema<CreateDataProductRevisionOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataProductRevision",
  telemetry: TELEMETRY,
  span: "CreateDataProductRevision",
}));

export type CreateDataSourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates an Amazon DataZone data source.
 */
export const createDataSource: API.OperationMethod<
  CreateDataSourceInput & RegionInput,
  CreateDataSourceOutput,
  CreateDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5120, __c160, 0) as any as S.Schema<CreateDataSourceInput>,
  output: __S(5121, __c160, 1) as any as S.Schema<CreateDataSourceOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataSource",
  telemetry: TELEMETRY,
  span: "CreateDataSource",
}));

export type CreateDesignationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a new user-defined designation with a Cedar permit policy. The designation defines a named role that can be assigned to project members through `CreateProjectMembership` or granted through `AddPolicyGrant`.
 */
export const createDesignation: API.OperationMethod<
  CreateDesignationInput & RegionInput,
  CreateDesignationOutput,
  CreateDesignationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5312, __c166, 0) as any as S.Schema<CreateDesignationInput>,
  output: __S(5344, __c167, 0) as any as S.Schema<CreateDesignationOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDesignation",
  telemetry: TELEMETRY,
  span: "CreateDesignation",
}));

export type CreateDomainError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates an Amazon DataZone domain.
 */
export const createDomain: API.OperationMethod<
  CreateDomainInput & RegionInput,
  CreateDomainOutput,
  CreateDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5376, __c168, 0) as any as S.Schema<CreateDomainInput>,
  output: __S(5377, __c168, 1) as any as S.Schema<CreateDomainOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDomain",
  telemetry: TELEMETRY,
  span: "CreateDomain",
}));

export type CreateDomainUnitError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a domain unit in Amazon DataZone.
 */
export const createDomainUnit: API.OperationMethod<
  CreateDomainUnitInput & RegionInput,
  CreateDomainUnitOutput,
  CreateDomainUnitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5440, __c170, 0) as any as S.Schema<CreateDomainUnitInput>,
  output: __S(5441, __c170, 1) as any as S.Schema<CreateDomainUnitOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDomainUnit",
  telemetry: TELEMETRY,
  span: "CreateDomainUnit",
}));

export type CreateEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Create an Amazon DataZone environment.
 */
export const createEnvironment: API.OperationMethod<
  CreateEnvironmentInput & RegionInput,
  CreateEnvironmentOutput,
  CreateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5504, __c172, 0) as any as S.Schema<CreateEnvironmentInput>,
  output: __S(5703, __c178, 7) as any as S.Schema<CreateEnvironmentOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEnvironment",
  telemetry: TELEMETRY,
  span: "CreateEnvironment",
}));

export type CreateEnvironmentActionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates an action for the environment, for example, creates a console link for an analytics tool that is available in this environment.
 */
export const createEnvironmentAction: API.OperationMethod<
  CreateEnvironmentActionInput & RegionInput,
  CreateEnvironmentActionOutput,
  CreateEnvironmentActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5728, __c179, 0) as any as S.Schema<CreateEnvironmentActionInput>,
  output: __S(5762, __c180, 2) as any as S.Schema<CreateEnvironmentActionOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEnvironmentAction",
  telemetry: TELEMETRY,
  span: "CreateEnvironmentAction",
}));

export type CreateEnvironmentBlueprintError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a Amazon DataZone blueprint.
 */
export const createEnvironmentBlueprint: API.OperationMethod<
  CreateEnvironmentBlueprintInput & RegionInput,
  CreateEnvironmentBlueprintOutput,
  CreateEnvironmentBlueprintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5792, __c181, 0) as any as S.Schema<CreateEnvironmentBlueprintInput>,
  output: __S(5824, __c182, 0) as any as S.Schema<CreateEnvironmentBlueprintOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEnvironmentBlueprint",
  telemetry: TELEMETRY,
  span: "CreateEnvironmentBlueprint",
}));

export type CreateEnvironmentProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates an Amazon DataZone environment profile.
 */
export const createEnvironmentProfile: API.OperationMethod<
  CreateEnvironmentProfileInput & RegionInput,
  CreateEnvironmentProfileOutput,
  CreateEnvironmentProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5856, __c183, 0) as any as S.Schema<CreateEnvironmentProfileInput>,
  output: __S(5888, __c184, 0) as any as S.Schema<CreateEnvironmentProfileOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEnvironmentProfile",
  telemetry: TELEMETRY,
  span: "CreateEnvironmentProfile",
}));

export type CreateFormTypeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
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
  CreateFormTypeInput & RegionInput,
  CreateFormTypeOutput,
  CreateFormTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5920, __c185, 0) as any as S.Schema<CreateFormTypeInput>,
  output: __S(5921, __c185, 1) as any as S.Schema<CreateFormTypeOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFormType",
  telemetry: TELEMETRY,
  span: "CreateFormType",
}));

export type CreateGlossaryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
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
  CreateGlossaryInput & RegionInput,
  CreateGlossaryOutput,
  CreateGlossaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(5984, __c187, 0) as any as S.Schema<CreateGlossaryInput>,
  output: __S(6016, __c188, 0) as any as S.Schema<CreateGlossaryOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGlossary",
  telemetry: TELEMETRY,
  span: "CreateGlossary",
}));

export type CreateGlossaryTermError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
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
  CreateGlossaryTermInput & RegionInput,
  CreateGlossaryTermOutput,
  CreateGlossaryTermError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6048, __c189, 0) as any as S.Schema<CreateGlossaryTermInput>,
  output: __S(6112, __c191, 0) as any as S.Schema<CreateGlossaryTermOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGlossaryTerm",
  telemetry: TELEMETRY,
  span: "CreateGlossaryTerm",
}));

export type CreateGroupProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a group profile in Amazon DataZone.
 */
export const createGroupProfile: API.OperationMethod<
  CreateGroupProfileInput & RegionInput,
  CreateGroupProfileOutput,
  CreateGroupProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6144, __c192, 0) as any as S.Schema<CreateGroupProfileInput>,
  output: __S(6176, __c193, 0) as any as S.Schema<CreateGroupProfileOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGroupProfile",
  telemetry: TELEMETRY,
  span: "CreateGroupProfile",
}));

export type CreateListingChangeSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Publishes a listing (a record of an asset at a given time) or removes a listing from the catalog.
 */
export const createListingChangeSet: API.OperationMethod<
  CreateListingChangeSetInput & RegionInput,
  CreateListingChangeSetOutput,
  CreateListingChangeSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6208, __c194, 0) as any as S.Schema<CreateListingChangeSetInput>,
  output: __S(6209, __c194, 1) as any as S.Schema<CreateListingChangeSetOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateListingChangeSet",
  telemetry: TELEMETRY,
  span: "CreateListingChangeSet",
}));

export type CreateNotebookError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a notebook in Amazon SageMaker Unified Studio. A notebook is a collaborative document within a project that contains code cells for interactive computing.
 */
export const createNotebook: API.OperationMethod<
  CreateNotebookInput & RegionInput,
  CreateNotebookOutput,
  CreateNotebookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6240, __c195, 0) as any as S.Schema<CreateNotebookInput>,
  output: __S(6368, __c199, 0) as any as S.Schema<CreateNotebookOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNotebook",
  telemetry: TELEMETRY,
  span: "CreateNotebook",
}));

export type CreateProjectError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates an Amazon DataZone project.
 */
export const createProject: API.OperationMethod<
  CreateProjectInput & RegionInput,
  CreateProjectOutput,
  CreateProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6402, __c200, 2) as any as S.Schema<CreateProjectInput>,
  output: __S(6472, __c202, 8) as any as S.Schema<CreateProjectOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProject",
  telemetry: TELEMETRY,
  span: "CreateProject",
}));

export type CreateProjectMembershipError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a project membership in Amazon DataZone.
 */
export const createProjectMembership: API.OperationMethod<
  CreateProjectMembershipInput & RegionInput,
  CreateProjectMembershipOutput,
  CreateProjectMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6528, __c204, 0) as any as S.Schema<CreateProjectMembershipInput>,
  output: __S(768, __c24, 0) as any as S.Schema<CreateProjectMembershipOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProjectMembership",
  telemetry: TELEMETRY,
  span: "CreateProjectMembership",
}));

export type CreateProjectProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a project profile.
 */
export const createProjectProfile: API.OperationMethod<
  CreateProjectProfileInput & RegionInput,
  CreateProjectProfileOutput,
  CreateProjectProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6560, __c205, 0) as any as S.Schema<CreateProjectProfileInput>,
  output: __S(6600, __c206, 8) as any as S.Schema<CreateProjectProfileOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProjectProfile",
  telemetry: TELEMETRY,
  span: "CreateProjectProfile",
}));

export type CreateRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a rule in Amazon DataZone. A rule is a formal agreement that enforces specific requirements across user workflows (e.g., publishing assets to the catalog, requesting subscriptions, creating projects) within the Amazon DataZone data portal. These rules help maintain consistency, ensure compliance, and uphold governance standards in data management processes. For instance, a metadata enforcement rule can specify the required information for creating a subscription request or publishing a data asset to the catalog, ensuring alignment with organizational standards.
 */
export const createRule: API.OperationMethod<
  CreateRuleInput & RegionInput,
  CreateRuleOutput,
  CreateRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6624, __c207, 0) as any as S.Schema<CreateRuleInput>,
  output: __S(6625, __c207, 1) as any as S.Schema<CreateRuleOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRule",
  telemetry: TELEMETRY,
  span: "CreateRule",
}));

export type CreateSubscriptionGrantError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a subsscription grant in Amazon DataZone.
 */
export const createSubscriptionGrant: API.OperationMethod<
  CreateSubscriptionGrantInput & RegionInput,
  CreateSubscriptionGrantOutput,
  CreateSubscriptionGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6724, __c210, 4) as any as S.Schema<CreateSubscriptionGrantInput>,
  output: __S(6757, __c211, 5) as any as S.Schema<CreateSubscriptionGrantOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSubscriptionGrant",
  telemetry: TELEMETRY,
  span: "CreateSubscriptionGrant",
}));

export type CreateSubscriptionRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a subscription request in Amazon DataZone.
 */
export const createSubscriptionRequest: API.OperationMethod<
  CreateSubscriptionRequestInput & RegionInput,
  CreateSubscriptionRequestOutput,
  CreateSubscriptionRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6789, __c212, 5) as any as S.Schema<CreateSubscriptionRequestInput>,
  output: __S(320, __c10, 0) as any as S.Schema<CreateSubscriptionRequestOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSubscriptionRequest",
  telemetry: TELEMETRY,
  span: "CreateSubscriptionRequest",
}));

export type CreateSubscriptionTargetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a subscription target in Amazon DataZone.
 */
export const createSubscriptionTarget: API.OperationMethod<
  CreateSubscriptionTargetInput & RegionInput,
  CreateSubscriptionTargetOutput,
  CreateSubscriptionTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6816, __c213, 0) as any as S.Schema<CreateSubscriptionTargetInput>,
  output: __S(6850, __c214, 2) as any as S.Schema<CreateSubscriptionTargetOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSubscriptionTarget",
  telemetry: TELEMETRY,
  span: "CreateSubscriptionTarget",
}));

export type CreateUserProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a user profile in Amazon DataZone.
 */
export const createUserProfile: API.OperationMethod<
  CreateUserProfileInput & RegionInput,
  CreateUserProfileOutput,
  CreateUserProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6880, __c215, 0) as any as S.Schema<CreateUserProfileInput>,
  output: __S(6912, __c216, 0) as any as S.Schema<CreateUserProfileOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUserProfile",
  telemetry: TELEMETRY,
  span: "CreateUserProfile",
}));

export type DeleteAccountPoolError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes an account pool.
 */
export const deleteAccountPool: API.OperationMethod<
  DeleteAccountPoolInput & RegionInput,
  DeleteAccountPoolOutput,
  DeleteAccountPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6944, __c217, 0) as any as S.Schema<DeleteAccountPoolInput>,
  output: __S(768, __c24, 0) as any as S.Schema<DeleteAccountPoolOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccountPool",
  telemetry: TELEMETRY,
  span: "DeleteAccountPool",
}));

export type DeleteAssetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
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
  DeleteAssetInput & RegionInput,
  DeleteAssetOutput,
  DeleteAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6976, __c218, 0) as any as S.Schema<DeleteAssetInput>,
  output: __S(768, __c24, 0) as any as S.Schema<DeleteAssetOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAsset",
  telemetry: TELEMETRY,
  span: "DeleteAsset",
}));

export type DeleteAssetFilterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
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
  DeleteAssetFilterInput & RegionInput,
  DeleteAssetFilterResponse,
  DeleteAssetFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7008, __c219, 0) as any as S.Schema<DeleteAssetFilterInput>,
  output: __S(768, __c24, 0) as any as S.Schema<DeleteAssetFilterResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAssetFilter",
  telemetry: TELEMETRY,
  span: "DeleteAssetFilter",
}));

export type DeleteAssetTypeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
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
  DeleteAssetTypeInput & RegionInput,
  DeleteAssetTypeOutput,
  DeleteAssetTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7040, __c220, 0) as any as S.Schema<DeleteAssetTypeInput>,
  output: __S(768, __c24, 0) as any as S.Schema<DeleteAssetTypeOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAssetType",
  telemetry: TELEMETRY,
  span: "DeleteAssetType",
}));

export type DeleteConnectionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes and connection. In Amazon DataZone, a connection enables you to connect your resources (domains, projects, and environments) to external resources and services.
 */
export const deleteConnection: API.OperationMethod<
  DeleteConnectionInput & RegionInput,
  DeleteConnectionOutput,
  DeleteConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7072, __c221, 0) as any as S.Schema<DeleteConnectionInput>,
  output: __S(7073, __c221, 1) as any as S.Schema<DeleteConnectionOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnection",
  telemetry: TELEMETRY,
  span: "DeleteConnection",
}));

export type DeleteDataExportConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes data export configuration for a domain.
 *
 * This operation does not delete the S3 table created by the PutDataExportConfiguration operation.
 *
 * To temporarily disable export without deleting the configuration, use the PutDataExportConfiguration operation with the `--no-enable-export` flag instead. This allows you to re-enable export for the same domain using the `--enable-export` flag without deleting S3 table.
 */
export const deleteDataExportConfiguration: API.OperationMethod<
  DeleteDataExportConfigurationInput & RegionInput,
  DeleteDataExportConfigurationOutput,
  DeleteDataExportConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7104, __c222, 0) as any as S.Schema<DeleteDataExportConfigurationInput>,
  output: __S(768, __c24, 0) as any as S.Schema<DeleteDataExportConfigurationOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataExportConfiguration",
  telemetry: TELEMETRY,
  span: "DeleteDataExportConfiguration",
}));

export type DeleteDataProductError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
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
  DeleteDataProductInput & RegionInput,
  DeleteDataProductOutput,
  DeleteDataProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7136, __c223, 0) as any as S.Schema<DeleteDataProductInput>,
  output: __S(768, __c24, 0) as any as S.Schema<DeleteDataProductOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataProduct",
  telemetry: TELEMETRY,
  span: "DeleteDataProduct",
}));

export type DeleteDataSourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a data source in Amazon DataZone.
 */
export const deleteDataSource: API.OperationMethod<
  DeleteDataSourceInput & RegionInput,
  DeleteDataSourceOutput,
  DeleteDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7168, __c224, 0) as any as S.Schema<DeleteDataSourceInput>,
  output: __S(7169, __c224, 1) as any as S.Schema<DeleteDataSourceOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataSource",
  telemetry: TELEMETRY,
  span: "DeleteDataSource",
}));

export type DeleteDesignationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a user-created designation. Managed designations cannot be deleted. The call fails if the designation has `deletionProtection` enabled or if any project member still holds it. This operation is idempotent.
 */
export const deleteDesignation: API.OperationMethod<
  DeleteDesignationInput & RegionInput,
  DeleteDesignationOutput,
  DeleteDesignationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7232, __c226, 0) as any as S.Schema<DeleteDesignationInput>,
  output: __S(768, __c24, 0) as any as S.Schema<DeleteDesignationOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDesignation",
  telemetry: TELEMETRY,
  span: "DeleteDesignation",
}));

export type DeleteDomainError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a Amazon DataZone domain.
 */
export const deleteDomain: API.OperationMethod<
  DeleteDomainInput & RegionInput,
  DeleteDomainOutput,
  DeleteDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7264, __c227, 0) as any as S.Schema<DeleteDomainInput>,
  output: __S(7265, __c227, 1) as any as S.Schema<DeleteDomainOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomain",
  telemetry: TELEMETRY,
  span: "DeleteDomain",
}));

export type DeleteDomainUnitError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a domain unit.
 */
export const deleteDomainUnit: API.OperationMethod<
  DeleteDomainUnitInput & RegionInput,
  DeleteDomainUnitOutput,
  DeleteDomainUnitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7296, __c228, 0) as any as S.Schema<DeleteDomainUnitInput>,
  output: __S(768, __c24, 0) as any as S.Schema<DeleteDomainUnitOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomainUnit",
  telemetry: TELEMETRY,
  span: "DeleteDomainUnit",
}));

export type DeleteEnvironmentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes an environment in Amazon DataZone.
 */
export const deleteEnvironment: API.OperationMethod<
  DeleteEnvironmentInput & RegionInput,
  DeleteEnvironmentResponse,
  DeleteEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7328, __c229, 0) as any as S.Schema<DeleteEnvironmentInput>,
  output: __S(768, __c24, 0) as any as S.Schema<DeleteEnvironmentResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEnvironment",
  telemetry: TELEMETRY,
  span: "DeleteEnvironment",
}));

export type DeleteEnvironmentActionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes an action for the environment, for example, deletes a console link for an analytics tool that is available in this environment.
 */
export const deleteEnvironmentAction: API.OperationMethod<
  DeleteEnvironmentActionInput & RegionInput,
  DeleteEnvironmentActionResponse,
  DeleteEnvironmentActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7360, __c230, 0) as any as S.Schema<DeleteEnvironmentActionInput>,
  output: __S(768, __c24, 0) as any as S.Schema<DeleteEnvironmentActionResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEnvironmentAction",
  telemetry: TELEMETRY,
  span: "DeleteEnvironmentAction",
}));

export type DeleteEnvironmentBlueprintError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a blueprint in Amazon DataZone.
 */
export const deleteEnvironmentBlueprint: API.OperationMethod<
  DeleteEnvironmentBlueprintInput & RegionInput,
  DeleteEnvironmentBlueprintResponse,
  DeleteEnvironmentBlueprintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7392, __c231, 0) as any as S.Schema<DeleteEnvironmentBlueprintInput>,
  output: __S(768, __c24, 0) as any as S.Schema<DeleteEnvironmentBlueprintResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEnvironmentBlueprint",
  telemetry: TELEMETRY,
  span: "DeleteEnvironmentBlueprint",
}));

export type DeleteEnvironmentBlueprintConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | ResourceNotFoundException
  | EnvironmentBlueprintConfigurationInUse
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes the blueprint configuration in Amazon DataZone.
 */
export const deleteEnvironmentBlueprintConfiguration: API.OperationMethod<
  DeleteEnvironmentBlueprintConfigurationInput & RegionInput,
  DeleteEnvironmentBlueprintConfigurationOutput,
  DeleteEnvironmentBlueprintConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7424, __c232, 0) as any as S.Schema<DeleteEnvironmentBlueprintConfigurationInput>,
  output: __S(768, __c24, 0) as any as S.Schema<DeleteEnvironmentBlueprintConfigurationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ValidationException,
    ResourceNotFoundException,
    EnvironmentBlueprintConfigurationInUse,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEnvironmentBlueprintConfiguration",
  telemetry: TELEMETRY,
  span: "DeleteEnvironmentBlueprintConfiguration",
}));

export type DeleteEnvironmentProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes an environment profile in Amazon DataZone.
 */
export const deleteEnvironmentProfile: API.OperationMethod<
  DeleteEnvironmentProfileInput & RegionInput,
  DeleteEnvironmentProfileResponse,
  DeleteEnvironmentProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7456, __c233, 0) as any as S.Schema<DeleteEnvironmentProfileInput>,
  output: __S(768, __c24, 0) as any as S.Schema<DeleteEnvironmentProfileResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEnvironmentProfile",
  telemetry: TELEMETRY,
  span: "DeleteEnvironmentProfile",
}));

export type DeleteFormTypeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
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
  DeleteFormTypeInput & RegionInput,
  DeleteFormTypeOutput,
  DeleteFormTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7488, __c234, 0) as any as S.Schema<DeleteFormTypeInput>,
  output: __S(768, __c24, 0) as any as S.Schema<DeleteFormTypeOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFormType",
  telemetry: TELEMETRY,
  span: "DeleteFormType",
}));

export type DeleteGlossaryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
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
  DeleteGlossaryInput & RegionInput,
  DeleteGlossaryOutput,
  DeleteGlossaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7520, __c235, 0) as any as S.Schema<DeleteGlossaryInput>,
  output: __S(768, __c24, 0) as any as S.Schema<DeleteGlossaryOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGlossary",
  telemetry: TELEMETRY,
  span: "DeleteGlossary",
}));

export type DeleteGlossaryTermError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
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
  DeleteGlossaryTermInput & RegionInput,
  DeleteGlossaryTermOutput,
  DeleteGlossaryTermError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7552, __c236, 0) as any as S.Schema<DeleteGlossaryTermInput>,
  output: __S(768, __c24, 0) as any as S.Schema<DeleteGlossaryTermOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGlossaryTerm",
  telemetry: TELEMETRY,
  span: "DeleteGlossaryTerm",
}));

export type DeleteLineageEventError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes the specified lineage event.
 */
export const deleteLineageEvent: API.OperationMethod<
  DeleteLineageEventInput & RegionInput,
  DeleteLineageEventOutput,
  DeleteLineageEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7584, __c237, 0) as any as S.Schema<DeleteLineageEventInput>,
  output: __S(7585, __c237, 1) as any as S.Schema<DeleteLineageEventOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLineageEvent",
  telemetry: TELEMETRY,
  span: "DeleteLineageEvent",
}));

export type DeleteListingError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a listing (a record of an asset at a given time).
 */
export const deleteListing: API.OperationMethod<
  DeleteListingInput & RegionInput,
  DeleteListingOutput,
  DeleteListingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7616, __c238, 0) as any as S.Schema<DeleteListingInput>,
  output: __S(768, __c24, 0) as any as S.Schema<DeleteListingOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteListing",
  telemetry: TELEMETRY,
  span: "DeleteListing",
}));

export type DeleteNotebookError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a notebook in Amazon SageMaker Unified Studio.
 */
export const deleteNotebook: API.OperationMethod<
  DeleteNotebookInput & RegionInput,
  DeleteNotebookOutput,
  DeleteNotebookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7648, __c239, 0) as any as S.Schema<DeleteNotebookInput>,
  output: __S(768, __c24, 0) as any as S.Schema<DeleteNotebookOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNotebook",
  telemetry: TELEMETRY,
  span: "DeleteNotebook",
}));

export type DeleteProjectError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a project in Amazon DataZone.
 */
export const deleteProject: API.OperationMethod<
  DeleteProjectInput & RegionInput,
  DeleteProjectOutput,
  DeleteProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7680, __c240, 0) as any as S.Schema<DeleteProjectInput>,
  output: __S(768, __c24, 0) as any as S.Schema<DeleteProjectOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProject",
  telemetry: TELEMETRY,
  span: "DeleteProject",
}));

export type DeleteProjectMembershipError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes project membership in Amazon DataZone.
 */
export const deleteProjectMembership: API.OperationMethod<
  DeleteProjectMembershipInput & RegionInput,
  DeleteProjectMembershipOutput,
  DeleteProjectMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7712, __c241, 0) as any as S.Schema<DeleteProjectMembershipInput>,
  output: __S(768, __c24, 0) as any as S.Schema<DeleteProjectMembershipOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProjectMembership",
  telemetry: TELEMETRY,
  span: "DeleteProjectMembership",
}));

export type DeleteProjectProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a project profile.
 */
export const deleteProjectProfile: API.OperationMethod<
  DeleteProjectProfileInput & RegionInput,
  DeleteProjectProfileOutput,
  DeleteProjectProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7744, __c242, 0) as any as S.Schema<DeleteProjectProfileInput>,
  output: __S(768, __c24, 0) as any as S.Schema<DeleteProjectProfileOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProjectProfile",
  telemetry: TELEMETRY,
  span: "DeleteProjectProfile",
}));

export type DeleteRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a rule in Amazon DataZone. A rule is a formal agreement that enforces specific requirements across user workflows (e.g., publishing assets to the catalog, requesting subscriptions, creating projects) within the Amazon DataZone data portal. These rules help maintain consistency, ensure compliance, and uphold governance standards in data management processes. For instance, a metadata enforcement rule can specify the required information for creating a subscription request or publishing a data asset to the catalog, ensuring alignment with organizational standards.
 */
export const deleteRule: API.OperationMethod<
  DeleteRuleInput & RegionInput,
  DeleteRuleOutput,
  DeleteRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7776, __c243, 0) as any as S.Schema<DeleteRuleInput>,
  output: __S(768, __c24, 0) as any as S.Schema<DeleteRuleOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRule",
  telemetry: TELEMETRY,
  span: "DeleteRule",
}));

export type DeleteSubscriptionGrantError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes and subscription grant in Amazon DataZone.
 */
export const deleteSubscriptionGrant: API.OperationMethod<
  DeleteSubscriptionGrantInput & RegionInput,
  DeleteSubscriptionGrantOutput,
  DeleteSubscriptionGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7808, __c244, 0) as any as S.Schema<DeleteSubscriptionGrantInput>,
  output: __S(6757, __c211, 5) as any as S.Schema<DeleteSubscriptionGrantOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSubscriptionGrant",
  telemetry: TELEMETRY,
  span: "DeleteSubscriptionGrant",
}));

export type DeleteSubscriptionRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a subscription request in Amazon DataZone.
 */
export const deleteSubscriptionRequest: API.OperationMethod<
  DeleteSubscriptionRequestInput & RegionInput,
  DeleteSubscriptionRequestResponse,
  DeleteSubscriptionRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7840, __c245, 0) as any as S.Schema<DeleteSubscriptionRequestInput>,
  output: __S(768, __c24, 0) as any as S.Schema<DeleteSubscriptionRequestResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSubscriptionRequest",
  telemetry: TELEMETRY,
  span: "DeleteSubscriptionRequest",
}));

export type DeleteSubscriptionTargetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a subscription target in Amazon DataZone.
 */
export const deleteSubscriptionTarget: API.OperationMethod<
  DeleteSubscriptionTargetInput & RegionInput,
  DeleteSubscriptionTargetResponse,
  DeleteSubscriptionTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7872, __c246, 0) as any as S.Schema<DeleteSubscriptionTargetInput>,
  output: __S(768, __c24, 0) as any as S.Schema<DeleteSubscriptionTargetResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSubscriptionTarget",
  telemetry: TELEMETRY,
  span: "DeleteSubscriptionTarget",
}));

export type DeleteTimeSeriesDataPointsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes the specified time series form for the specified asset.
 */
export const deleteTimeSeriesDataPoints: API.OperationMethod<
  DeleteTimeSeriesDataPointsInput & RegionInput,
  DeleteTimeSeriesDataPointsOutput,
  DeleteTimeSeriesDataPointsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7904, __c247, 0) as any as S.Schema<DeleteTimeSeriesDataPointsInput>,
  output: __S(768, __c24, 0) as any as S.Schema<DeleteTimeSeriesDataPointsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTimeSeriesDataPoints",
  telemetry: TELEMETRY,
  span: "DeleteTimeSeriesDataPoints",
}));

export type DisassociateEnvironmentRoleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Disassociates the environment role in Amazon DataZone.
 */
export const disassociateEnvironmentRole: API.OperationMethod<
  DisassociateEnvironmentRoleInput & RegionInput,
  DisassociateEnvironmentRoleOutput,
  DisassociateEnvironmentRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7936, __c248, 0) as any as S.Schema<DisassociateEnvironmentRoleInput>,
  output: __S(768, __c24, 0) as any as S.Schema<DisassociateEnvironmentRoleOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateEnvironmentRole",
  telemetry: TELEMETRY,
  span: "DisassociateEnvironmentRole",
}));

export type DisassociateGovernedTermsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Disassociates restricted terms from an asset.
 */
export const disassociateGovernedTerms: API.OperationMethod<
  DisassociateGovernedTermsInput & RegionInput,
  DisassociateGovernedTermsOutput,
  DisassociateGovernedTermsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(7968, __c249, 0) as any as S.Schema<DisassociateGovernedTermsInput>,
  output: __S(768, __c24, 0) as any as S.Schema<DisassociateGovernedTermsOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateGovernedTerms",
  telemetry: TELEMETRY,
  span: "DisassociateGovernedTerms",
}));

export type GetAccountPoolError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets the details of the account pool.
 */
export const getAccountPool: API.OperationMethod<
  GetAccountPoolInput & RegionInput,
  GetAccountPoolOutput,
  GetAccountPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8000, __c250, 0) as any as S.Schema<GetAccountPoolInput>,
  output: __S(4066, __c127, 2) as any as S.Schema<GetAccountPoolOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountPool",
  telemetry: TELEMETRY,
  span: "GetAccountPool",
}));

export type GetAssetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
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
  GetAssetInput & RegionInput,
  GetAssetOutput,
  GetAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8032, __c251, 0) as any as S.Schema<GetAssetInput>,
  output: __S(8033, __c251, 1) as any as S.Schema<GetAssetOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAsset",
  telemetry: TELEMETRY,
  span: "GetAsset",
}));

export type GetAssetFilterError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
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
  GetAssetFilterInput & RegionInput,
  GetAssetFilterOutput,
  GetAssetFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8064, __c252, 0) as any as S.Schema<GetAssetFilterInput>,
  output: __S(4713, __c147, 9) as any as S.Schema<GetAssetFilterOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssetFilter",
  telemetry: TELEMETRY,
  span: "GetAssetFilter",
}));

export type GetAssetTypeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
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
  GetAssetTypeInput & RegionInput,
  GetAssetTypeOutput,
  GetAssetTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8096, __c253, 0) as any as S.Schema<GetAssetTypeInput>,
  output: __S(8128, __c254, 0) as any as S.Schema<GetAssetTypeOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssetType",
  telemetry: TELEMETRY,
  span: "GetAssetType",
}));

export type GetConnectionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets a connection. In Amazon DataZone, a connection enables you to connect your resources (domains, projects, and environments) to external resources and services.
 */
export const getConnection: API.OperationMethod<
  GetConnectionInput & RegionInput,
  GetConnectionOutput,
  GetConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8160, __c255, 0) as any as S.Schema<GetConnectionInput>,
  output: __S(8161, __c255, 1) as any as S.Schema<GetConnectionOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnection",
  telemetry: TELEMETRY,
  span: "GetConnection",
}));

export type GetDataExportConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets data export configuration details.
 */
export const getDataExportConfiguration: API.OperationMethod<
  GetDataExportConfigurationInput & RegionInput,
  GetDataExportConfigurationOutput,
  GetDataExportConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8224, __c257, 0) as any as S.Schema<GetDataExportConfigurationInput>,
  output: __S(8225, __c257, 1) as any as S.Schema<GetDataExportConfigurationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataExportConfiguration",
  telemetry: TELEMETRY,
  span: "GetDataExportConfiguration",
}));

export type GetDataProductError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
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
  GetDataProductInput & RegionInput,
  GetDataProductOutput,
  GetDataProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8288, __c259, 0) as any as S.Schema<GetDataProductInput>,
  output: __S(5058, __c158, 2) as any as S.Schema<GetDataProductOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataProduct",
  telemetry: TELEMETRY,
  span: "GetDataProduct",
}));

export type GetDataSourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets an Amazon DataZone data source.
 */
export const getDataSource: API.OperationMethod<
  GetDataSourceInput & RegionInput,
  GetDataSourceOutput,
  GetDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8320, __c260, 0) as any as S.Schema<GetDataSourceInput>,
  output: __S(8321, __c260, 1) as any as S.Schema<GetDataSourceOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataSource",
  telemetry: TELEMETRY,
  span: "GetDataSource",
}));

export type GetDataSourceRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets an Amazon DataZone data source run.
 */
export const getDataSourceRun: API.OperationMethod<
  GetDataSourceRunInput & RegionInput,
  GetDataSourceRunOutput,
  GetDataSourceRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8352, __c261, 0) as any as S.Schema<GetDataSourceRunInput>,
  output: __S(8353, __c261, 1) as any as S.Schema<GetDataSourceRunOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataSourceRun",
  telemetry: TELEMETRY,
  span: "GetDataSourceRun",
}));

export type GetDesignationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets the details of a designation, including its Cedar permit policy. Returns the full designation record for both system-managed and user-created designations.
 */
export const getDesignation: API.OperationMethod<
  GetDesignationInput & RegionInput,
  GetDesignationOutput,
  GetDesignationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8544, __c267, 0) as any as S.Schema<GetDesignationInput>,
  output: __S(5344, __c167, 0) as any as S.Schema<GetDesignationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDesignation",
  telemetry: TELEMETRY,
  span: "GetDesignation",
}));

export type GetDomainError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets an Amazon DataZone domain.
 */
export const getDomain: API.OperationMethod<
  GetDomainInput & RegionInput,
  GetDomainOutput,
  GetDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8576, __c268, 0) as any as S.Schema<GetDomainInput>,
  output: __S(8580, __c268, 4) as any as S.Schema<GetDomainOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomain",
  telemetry: TELEMETRY,
  span: "GetDomain",
}));

export type GetDomainUnitError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets the details of the specified domain unit.
 */
export const getDomainUnit: API.OperationMethod<
  GetDomainUnitInput & RegionInput,
  GetDomainUnitOutput,
  GetDomainUnitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8608, __c269, 0) as any as S.Schema<GetDomainUnitInput>,
  output: __S(8609, __c269, 1) as any as S.Schema<GetDomainUnitOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainUnit",
  telemetry: TELEMETRY,
  span: "GetDomainUnit",
}));

export type GetEnvironmentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets an Amazon DataZone environment.
 */
export const getEnvironment: API.OperationMethod<
  GetEnvironmentInput & RegionInput,
  GetEnvironmentOutput,
  GetEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8640, __c270, 0) as any as S.Schema<GetEnvironmentInput>,
  output: __S(5703, __c178, 7) as any as S.Schema<GetEnvironmentOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironment",
  telemetry: TELEMETRY,
  span: "GetEnvironment",
}));

export type GetEnvironmentActionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets the specified environment action.
 */
export const getEnvironmentAction: API.OperationMethod<
  GetEnvironmentActionInput & RegionInput,
  GetEnvironmentActionOutput,
  GetEnvironmentActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8672, __c271, 0) as any as S.Schema<GetEnvironmentActionInput>,
  output: __S(5762, __c180, 2) as any as S.Schema<GetEnvironmentActionOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironmentAction",
  telemetry: TELEMETRY,
  span: "GetEnvironmentAction",
}));

export type GetEnvironmentBlueprintError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets an Amazon DataZone blueprint.
 */
export const getEnvironmentBlueprint: API.OperationMethod<
  GetEnvironmentBlueprintInput & RegionInput,
  GetEnvironmentBlueprintOutput,
  GetEnvironmentBlueprintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8704, __c272, 0) as any as S.Schema<GetEnvironmentBlueprintInput>,
  output: __S(5824, __c182, 0) as any as S.Schema<GetEnvironmentBlueprintOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironmentBlueprint",
  telemetry: TELEMETRY,
  span: "GetEnvironmentBlueprint",
}));

export type GetEnvironmentBlueprintConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets the blueprint configuration in Amazon DataZone.
 */
export const getEnvironmentBlueprintConfiguration: API.OperationMethod<
  GetEnvironmentBlueprintConfigurationInput & RegionInput,
  GetEnvironmentBlueprintConfigurationOutput,
  GetEnvironmentBlueprintConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8736, __c273, 0) as any as S.Schema<GetEnvironmentBlueprintConfigurationInput>,
  output: __S(8774, __c274, 6) as any as S.Schema<GetEnvironmentBlueprintConfigurationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironmentBlueprintConfiguration",
  telemetry: TELEMETRY,
  span: "GetEnvironmentBlueprintConfiguration",
}));

export type GetEnvironmentCredentialsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets the credentials of an environment in Amazon DataZone.
 */
export const getEnvironmentCredentials: API.OperationMethod<
  GetEnvironmentCredentialsInput & RegionInput,
  GetEnvironmentCredentialsOutput,
  GetEnvironmentCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8800, __c275, 0) as any as S.Schema<GetEnvironmentCredentialsInput>,
  output: __S(8192, __c256, 0) as any as S.Schema<GetEnvironmentCredentialsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironmentCredentials",
  telemetry: TELEMETRY,
  span: "GetEnvironmentCredentials",
}));

export type GetEnvironmentProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets an evinronment profile in Amazon DataZone.
 */
export const getEnvironmentProfile: API.OperationMethod<
  GetEnvironmentProfileInput & RegionInput,
  GetEnvironmentProfileOutput,
  GetEnvironmentProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8832, __c276, 0) as any as S.Schema<GetEnvironmentProfileInput>,
  output: __S(5888, __c184, 0) as any as S.Schema<GetEnvironmentProfileOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironmentProfile",
  telemetry: TELEMETRY,
  span: "GetEnvironmentProfile",
}));

export type GetFormTypeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
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
  GetFormTypeInput & RegionInput,
  GetFormTypeOutput,
  GetFormTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8864, __c277, 0) as any as S.Schema<GetFormTypeInput>,
  output: __S(8865, __c277, 1) as any as S.Schema<GetFormTypeOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFormType",
  telemetry: TELEMETRY,
  span: "GetFormType",
}));

export type GetGlossaryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
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
  GetGlossaryInput & RegionInput,
  GetGlossaryOutput,
  GetGlossaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c11, 0) as any as S.Schema<GetGlossaryInput>,
  output: __S(353, __c11, 1) as any as S.Schema<GetGlossaryOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGlossary",
  telemetry: TELEMETRY,
  span: "GetGlossary",
}));

export type GetGlossaryTermError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
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
  GetGlossaryTermInput & RegionInput,
  GetGlossaryTermOutput,
  GetGlossaryTermError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c12, 0) as any as S.Schema<GetGlossaryTermInput>,
  output: __S(385, __c12, 1) as any as S.Schema<GetGlossaryTermOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGlossaryTerm",
  telemetry: TELEMETRY,
  span: "GetGlossaryTerm",
}));

export type GetGroupProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets a group profile in Amazon DataZone.
 */
export const getGroupProfile: API.OperationMethod<
  GetGroupProfileInput & RegionInput,
  GetGroupProfileOutput,
  GetGroupProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c13, 0) as any as S.Schema<GetGroupProfileInput>,
  output: __S(6176, __c193, 0) as any as S.Schema<GetGroupProfileOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroupProfile",
  telemetry: TELEMETRY,
  span: "GetGroupProfile",
}));

export type GetIamPortalLoginUrlError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets the data portal URL for the specified Amazon DataZone domain.
 */
export const getIamPortalLoginUrl: API.OperationMethod<
  GetIamPortalLoginUrlInput & RegionInput,
  GetIamPortalLoginUrlOutput,
  GetIamPortalLoginUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c14, 0) as any as S.Schema<GetIamPortalLoginUrlInput>,
  output: __S(449, __c14, 1) as any as S.Schema<GetIamPortalLoginUrlOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIamPortalLoginUrl",
  telemetry: TELEMETRY,
  span: "GetIamPortalLoginUrl",
}));

export type GetJobRunError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * The details of the job run.
 */
export const getJobRun: API.OperationMethod<
  GetJobRunInput & RegionInput,
  GetJobRunOutput,
  GetJobRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c15, 0) as any as S.Schema<GetJobRunInput>,
  output: __S(484, __c15, 4) as any as S.Schema<GetJobRunOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJobRun",
  telemetry: TELEMETRY,
  span: "GetJobRun",
}));

export type GetLineageEventError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Describes the lineage event.
 */
export const getLineageEvent: API.OperationMethod<
  GetLineageEventInput & RegionInput,
  GetLineageEventOutput,
  GetLineageEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c16, 0) as any as S.Schema<GetLineageEventInput>,
  output: __S(513, __c16, 1) as any as S.Schema<GetLineageEventOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLineageEvent",
  telemetry: TELEMETRY,
  span: "GetLineageEvent",
}));

export type GetLineageNodeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets the data lineage node.
 */
export const getLineageNode: API.OperationMethod<
  GetLineageNodeInput & RegionInput,
  GetLineageNodeOutput,
  GetLineageNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c17, 0) as any as S.Schema<GetLineageNodeInput>,
  output: __S(547, __c17, 3) as any as S.Schema<GetLineageNodeOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLineageNode",
  telemetry: TELEMETRY,
  span: "GetLineageNode",
}));

export type GetListingError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets a listing (a record of an asset at a given time). If you specify a listing version, only details that are specific to that version are returned.
 */
export const getListing: API.OperationMethod<
  GetListingInput & RegionInput,
  GetListingOutput,
  GetListingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c18, 0) as any as S.Schema<GetListingInput>,
  output: __S(580, __c18, 4) as any as S.Schema<GetListingOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetListing",
  telemetry: TELEMETRY,
  span: "GetListing",
}));

export type GetMetadataGenerationRunError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
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
  GetMetadataGenerationRunInput & RegionInput,
  GetMetadataGenerationRunOutput,
  GetMetadataGenerationRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c20, 0) as any as S.Schema<GetMetadataGenerationRunInput>,
  output: __S(643, __c20, 3) as any as S.Schema<GetMetadataGenerationRunOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMetadataGenerationRun",
  telemetry: TELEMETRY,
  span: "GetMetadataGenerationRun",
}));

export type GetNotebookError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets the details of a notebook in Amazon SageMaker Unified Studio.
 */
export const getNotebook: API.OperationMethod<
  GetNotebookInput & RegionInput,
  GetNotebookOutput,
  GetNotebookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c22, 0) as any as S.Schema<GetNotebookInput>,
  output: __S(6368, __c199, 0) as any as S.Schema<GetNotebookOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNotebook",
  telemetry: TELEMETRY,
  span: "GetNotebook",
}));

export type GetNotebookExportError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets the details of a notebook export in Amazon SageMaker Unified Studio.
 */
export const getNotebookExport: API.OperationMethod<
  GetNotebookExportInput & RegionInput,
  GetNotebookExportOutput,
  GetNotebookExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c26, 0) as any as S.Schema<GetNotebookExportInput>,
  output: __S(835, __c26, 3) as any as S.Schema<GetNotebookExportOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNotebookExport",
  telemetry: TELEMETRY,
  span: "GetNotebookExport",
}));

export type GetNotebookRunError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets the details of a notebook run in Amazon SageMaker Unified Studio.
 */
export const getNotebookRun: API.OperationMethod<
  GetNotebookRunInput & RegionInput,
  GetNotebookRunOutput,
  GetNotebookRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c27, 0) as any as S.Schema<GetNotebookRunInput>,
  output: __S(933, __c29, 5) as any as S.Schema<GetNotebookRunOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNotebookRun",
  telemetry: TELEMETRY,
  span: "GetNotebookRun",
}));

export type GetProjectError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets a project in Amazon DataZone.
 */
export const getProject: API.OperationMethod<
  GetProjectInput & RegionInput,
  GetProjectOutput,
  GetProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(960, __c30, 0) as any as S.Schema<GetProjectInput>,
  output: __S(6472, __c202, 8) as any as S.Schema<GetProjectOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProject",
  telemetry: TELEMETRY,
  span: "GetProject",
}));

export type GetProjectProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * The details of the project profile.
 */
export const getProjectProfile: API.OperationMethod<
  GetProjectProfileInput & RegionInput,
  GetProjectProfileOutput,
  GetProjectProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(992, __c31, 0) as any as S.Schema<GetProjectProfileInput>,
  output: __S(6600, __c206, 8) as any as S.Schema<GetProjectProfileOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProjectProfile",
  telemetry: TELEMETRY,
  span: "GetProjectProfile",
}));

export type GetRuleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets the details of a rule in Amazon DataZone. A rule is a formal agreement that enforces specific requirements across user workflows (e.g., publishing assets to the catalog, requesting subscriptions, creating projects) within the Amazon DataZone data portal. These rules help maintain consistency, ensure compliance, and uphold governance standards in data management processes. For instance, a metadata enforcement rule can specify the required information for creating a subscription request or publishing a data asset to the catalog, ensuring alignment with organizational standards.
 */
export const getRule: API.OperationMethod<
  GetRuleInput & RegionInput,
  GetRuleOutput,
  GetRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1024, __c32, 0) as any as S.Schema<GetRuleInput>,
  output: __S(1025, __c32, 1) as any as S.Schema<GetRuleOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRule",
  telemetry: TELEMETRY,
  span: "GetRule",
}));

export type GetSubscriptionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets a subscription in Amazon DataZone.
 */
export const getSubscription: API.OperationMethod<
  GetSubscriptionInput & RegionInput,
  GetSubscriptionOutput,
  GetSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1056, __c33, 0) as any as S.Schema<GetSubscriptionInput>,
  output: __S(3648, __c114, 0) as any as S.Schema<GetSubscriptionOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSubscription",
  telemetry: TELEMETRY,
  span: "GetSubscription",
}));

export type GetSubscriptionGrantError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets the subscription grant in Amazon DataZone.
 */
export const getSubscriptionGrant: API.OperationMethod<
  GetSubscriptionGrantInput & RegionInput,
  GetSubscriptionGrantOutput,
  GetSubscriptionGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1088, __c34, 0) as any as S.Schema<GetSubscriptionGrantInput>,
  output: __S(6757, __c211, 5) as any as S.Schema<GetSubscriptionGrantOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSubscriptionGrant",
  telemetry: TELEMETRY,
  span: "GetSubscriptionGrant",
}));

export type GetSubscriptionRequestDetailsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets the details of the specified subscription request.
 */
export const getSubscriptionRequestDetails: API.OperationMethod<
  GetSubscriptionRequestDetailsInput & RegionInput,
  GetSubscriptionRequestDetailsOutput,
  GetSubscriptionRequestDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1120, __c35, 0) as any as S.Schema<GetSubscriptionRequestDetailsInput>,
  output: __S(320, __c10, 0) as any as S.Schema<GetSubscriptionRequestDetailsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSubscriptionRequestDetails",
  telemetry: TELEMETRY,
  span: "GetSubscriptionRequestDetails",
}));

export type GetSubscriptionTargetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets the subscription target in Amazon DataZone.
 */
export const getSubscriptionTarget: API.OperationMethod<
  GetSubscriptionTargetInput & RegionInput,
  GetSubscriptionTargetOutput,
  GetSubscriptionTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1152, __c36, 0) as any as S.Schema<GetSubscriptionTargetInput>,
  output: __S(6850, __c214, 2) as any as S.Schema<GetSubscriptionTargetOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSubscriptionTarget",
  telemetry: TELEMETRY,
  span: "GetSubscriptionTarget",
}));

export type GetTimeSeriesDataPointError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets the existing data point for the asset.
 */
export const getTimeSeriesDataPoint: API.OperationMethod<
  GetTimeSeriesDataPointInput & RegionInput,
  GetTimeSeriesDataPointOutput,
  GetTimeSeriesDataPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1184, __c37, 0) as any as S.Schema<GetTimeSeriesDataPointInput>,
  output: __S(1185, __c37, 1) as any as S.Schema<GetTimeSeriesDataPointOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTimeSeriesDataPoint",
  telemetry: TELEMETRY,
  span: "GetTimeSeriesDataPoint",
}));

export type GetUserProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets a user profile in Amazon DataZone.
 */
export const getUserProfile: API.OperationMethod<
  GetUserProfileInput & RegionInput,
  GetUserProfileOutput,
  GetUserProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1344, __c42, 0) as any as S.Schema<GetUserProfileInput>,
  output: __S(6912, __c216, 0) as any as S.Schema<GetUserProfileOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUserProfile",
  telemetry: TELEMETRY,
  span: "GetUserProfile",
}));

export type ListAccountPoolsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists existing account pools.
 */
export const listAccountPools: API.PaginatedOperationMethod<
  ListAccountPoolsInput & RegionInput,
  ListAccountPoolsOutput,
  ListAccountPoolsError,
  Credentials | HttpClient.HttpClient,
  AccountPoolSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1376, __c43, 0) as any as S.Schema<ListAccountPoolsInput>,
  output: __S(1379, __c43, 3) as any as S.Schema<ListAccountPoolsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "ListAccountPools",
})) as any;

export type ListAccountsInAccountPoolError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the accounts in the specified account pool.
 */
export const listAccountsInAccountPool: API.PaginatedOperationMethod<
  ListAccountsInAccountPoolInput & RegionInput,
  ListAccountsInAccountPoolOutput,
  ListAccountsInAccountPoolError,
  Credentials | HttpClient.HttpClient,
  AccountInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1408, __c44, 0) as any as S.Schema<ListAccountsInAccountPoolInput>,
  output: __S(1409, __c44, 1) as any as S.Schema<ListAccountsInAccountPoolOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "ListAccountsInAccountPool",
})) as any;

export type ListAssetFiltersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
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
  ListAssetFiltersInput & RegionInput,
  ListAssetFiltersOutput,
  ListAssetFiltersError,
  Credentials | HttpClient.HttpClient,
  AssetFilterSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1440, __c45, 0) as any as S.Schema<ListAssetFiltersInput>,
  output: __S(1443, __c45, 3) as any as S.Schema<ListAssetFiltersOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "ListAssetFilters",
})) as any;

export type ListAssetRevisionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
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
  ListAssetRevisionsInput & RegionInput,
  ListAssetRevisionsOutput,
  ListAssetRevisionsError,
  Credentials | HttpClient.HttpClient,
  AssetRevision
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1472, __c46, 0) as any as S.Schema<ListAssetRevisionsInput>,
  output: __S(1475, __c46, 3) as any as S.Schema<ListAssetRevisionsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "ListAssetRevisions",
})) as any;

export type ListConnectionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists connections. In Amazon DataZone, a connection enables you to connect your resources (domains, projects, and environments) to external resources and services.
 */
export const listConnections: API.PaginatedOperationMethod<
  ListConnectionsInput & RegionInput,
  ListConnectionsOutput,
  ListConnectionsError,
  Credentials | HttpClient.HttpClient,
  ConnectionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1504, __c47, 0) as any as S.Schema<ListConnectionsInput>,
  output: __S(1507, __c47, 3) as any as S.Schema<ListConnectionsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "ListConnections",
})) as any;

export type ListDataProductRevisionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
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
  ListDataProductRevisionsInput & RegionInput,
  ListDataProductRevisionsOutput,
  ListDataProductRevisionsError,
  Credentials | HttpClient.HttpClient,
  DataProductRevision
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1536, __c48, 0) as any as S.Schema<ListDataProductRevisionsInput>,
  output: __S(1539, __c48, 3) as any as S.Schema<ListDataProductRevisionsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "ListDataProductRevisions",
})) as any;

export type ListDataSourceRunActivitiesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists data source run activities.
 */
export const listDataSourceRunActivities: API.PaginatedOperationMethod<
  ListDataSourceRunActivitiesInput & RegionInput,
  ListDataSourceRunActivitiesOutput,
  ListDataSourceRunActivitiesError,
  Credentials | HttpClient.HttpClient,
  DataSourceRunActivity
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1568, __c49, 0) as any as S.Schema<ListDataSourceRunActivitiesInput>,
  output: __S(1572, __c49, 4) as any as S.Schema<ListDataSourceRunActivitiesOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "ListDataSourceRunActivities",
})) as any;

export type ListDataSourceRunsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists data source runs in Amazon DataZone.
 */
export const listDataSourceRuns: API.PaginatedOperationMethod<
  ListDataSourceRunsInput & RegionInput,
  ListDataSourceRunsOutput,
  ListDataSourceRunsError,
  Credentials | HttpClient.HttpClient,
  DataSourceRunSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1600, __c50, 0) as any as S.Schema<ListDataSourceRunsInput>,
  output: __S(1603, __c50, 3) as any as S.Schema<ListDataSourceRunsOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "ListDataSourceRuns",
})) as any;

export type ListDataSourcesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists data sources in Amazon DataZone.
 */
export const listDataSources: API.PaginatedOperationMethod<
  ListDataSourcesInput & RegionInput,
  ListDataSourcesOutput,
  ListDataSourcesError,
  Credentials | HttpClient.HttpClient,
  DataSourceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1632, __c51, 0) as any as S.Schema<ListDataSourcesInput>,
  output: __S(1635, __c51, 3) as any as S.Schema<ListDataSourcesOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "ListDataSources",
})) as any;

export type ListDesignationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the designations in a domain. The response returns system-managed designations first, followed by user-created designations in alphabetical order by name. Results are paginated. Use `nextToken` to retrieve additional pages of results.
 */
export const listDesignations: API.PaginatedOperationMethod<
  ListDesignationsInput & RegionInput,
  ListDesignationsOutput,
  ListDesignationsError,
  Credentials | HttpClient.HttpClient,
  DesignationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1696, __c53, 0) as any as S.Schema<ListDesignationsInput>,
  output: __S(1699, __c53, 3) as any as S.Schema<ListDesignationsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDesignations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListDesignations",
})) as any;

export type ListDomainsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists Amazon DataZone domains.
 */
export const listDomains: API.PaginatedOperationMethod<
  ListDomainsInput & RegionInput,
  ListDomainsOutput,
  ListDomainsError,
  Credentials | HttpClient.HttpClient,
  DomainSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1728, __c54, 0) as any as S.Schema<ListDomainsInput>,
  output: __S(1731, __c54, 3) as any as S.Schema<ListDomainsOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "ListDomains",
})) as any;

export type ListDomainUnitsForParentError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists child domain units for the specified parent domain unit.
 */
export const listDomainUnitsForParent: API.PaginatedOperationMethod<
  ListDomainUnitsForParentInput & RegionInput,
  ListDomainUnitsForParentOutput,
  ListDomainUnitsForParentError,
  Credentials | HttpClient.HttpClient,
  DomainUnitSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1760, __c55, 0) as any as S.Schema<ListDomainUnitsForParentInput>,
  output: __S(1763, __c55, 3) as any as S.Schema<ListDomainUnitsForParentOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "ListDomainUnitsForParent",
})) as any;

export type ListEntityOwnersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the entity (domain units) owners.
 */
export const listEntityOwners: API.PaginatedOperationMethod<
  ListEntityOwnersInput & RegionInput,
  ListEntityOwnersOutput,
  ListEntityOwnersError,
  Credentials | HttpClient.HttpClient,
  OwnerPropertiesOutput
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1792, __c56, 0) as any as S.Schema<ListEntityOwnersInput>,
  output: __S(1793, __c56, 1) as any as S.Schema<ListEntityOwnersOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "ListEntityOwners",
})) as any;

export type ListEnvironmentActionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists existing environment actions.
 */
export const listEnvironmentActions: API.PaginatedOperationMethod<
  ListEnvironmentActionsInput & RegionInput,
  ListEnvironmentActionsOutput,
  ListEnvironmentActionsError,
  Credentials | HttpClient.HttpClient,
  EnvironmentActionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1824, __c57, 0) as any as S.Schema<ListEnvironmentActionsInput>,
  output: __S(1826, __c57, 2) as any as S.Schema<ListEnvironmentActionsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "ListEnvironmentActions",
})) as any;

export type ListEnvironmentBlueprintConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists blueprint configurations for a Amazon DataZone environment.
 */
export const listEnvironmentBlueprintConfigurations: API.PaginatedOperationMethod<
  ListEnvironmentBlueprintConfigurationsInput & RegionInput,
  ListEnvironmentBlueprintConfigurationsOutput,
  ListEnvironmentBlueprintConfigurationsError,
  Credentials | HttpClient.HttpClient,
  EnvironmentBlueprintConfigurationItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1856, __c58, 0) as any as S.Schema<ListEnvironmentBlueprintConfigurationsInput>,
  output: __S(1858, __c58, 2) as any as S.Schema<ListEnvironmentBlueprintConfigurationsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "ListEnvironmentBlueprintConfigurations",
})) as any;

export type ListEnvironmentBlueprintsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists blueprints in an Amazon DataZone environment.
 */
export const listEnvironmentBlueprints: API.PaginatedOperationMethod<
  ListEnvironmentBlueprintsInput & RegionInput,
  ListEnvironmentBlueprintsOutput,
  ListEnvironmentBlueprintsError,
  Credentials | HttpClient.HttpClient,
  EnvironmentBlueprintSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1888, __c59, 0) as any as S.Schema<ListEnvironmentBlueprintsInput>,
  output: __S(1891, __c59, 3) as any as S.Schema<ListEnvironmentBlueprintsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "ListEnvironmentBlueprints",
})) as any;

export type ListEnvironmentProfilesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists Amazon DataZone environment profiles.
 */
export const listEnvironmentProfiles: API.PaginatedOperationMethod<
  ListEnvironmentProfilesInput & RegionInput,
  ListEnvironmentProfilesOutput,
  ListEnvironmentProfilesError,
  Credentials | HttpClient.HttpClient,
  EnvironmentProfileSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1920, __c60, 0) as any as S.Schema<ListEnvironmentProfilesInput>,
  output: __S(1923, __c60, 3) as any as S.Schema<ListEnvironmentProfilesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "ListEnvironmentProfiles",
})) as any;

export type ListEnvironmentsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | ResourceNotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists Amazon DataZone environments.
 */
export const listEnvironments: API.PaginatedOperationMethod<
  ListEnvironmentsInput & RegionInput,
  ListEnvironmentsOutput,
  ListEnvironmentsError,
  Credentials | HttpClient.HttpClient,
  EnvironmentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1952, __c61, 0) as any as S.Schema<ListEnvironmentsInput>,
  output: __S(1955, __c61, 3) as any as S.Schema<ListEnvironmentsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    ResourceNotFoundException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "ListEnvironments",
})) as any;

export type ListJobRunsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists job runs.
 */
export const listJobRuns: API.PaginatedOperationMethod<
  ListJobRunsInput & RegionInput,
  ListJobRunsOutput,
  ListJobRunsError,
  Credentials | HttpClient.HttpClient,
  JobRunSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1984, __c62, 0) as any as S.Schema<ListJobRunsInput>,
  output: __S(1987, __c62, 3) as any as S.Schema<ListJobRunsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "ListJobRuns",
})) as any;

export type ListLineageEventsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists lineage events.
 */
export const listLineageEvents: API.PaginatedOperationMethod<
  ListLineageEventsInput & RegionInput,
  ListLineageEventsOutput,
  ListLineageEventsError,
  Credentials | HttpClient.HttpClient,
  LineageEventSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2048, __c64, 0) as any as S.Schema<ListLineageEventsInput>,
  output: __S(2055, __c64, 7) as any as S.Schema<ListLineageEventsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "ListLineageEvents",
})) as any;

export type ListLineageNodeHistoryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the history of the specified data lineage node.
 */
export const listLineageNodeHistory: API.PaginatedOperationMethod<
  ListLineageNodeHistoryInput & RegionInput,
  ListLineageNodeHistoryOutput,
  ListLineageNodeHistoryError,
  Credentials | HttpClient.HttpClient,
  LineageNodeSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2080, __c65, 0) as any as S.Schema<ListLineageNodeHistoryInput>,
  output: __S(2083, __c65, 3) as any as S.Schema<ListLineageNodeHistoryOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "ListLineageNodeHistory",
})) as any;

export type ListMetadataGenerationRunsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
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
  ListMetadataGenerationRunsInput & RegionInput,
  ListMetadataGenerationRunsOutput,
  ListMetadataGenerationRunsError,
  Credentials | HttpClient.HttpClient,
  MetadataGenerationRunItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2112, __c66, 0) as any as S.Schema<ListMetadataGenerationRunsInput>,
  output: __S(2115, __c66, 3) as any as S.Schema<ListMetadataGenerationRunsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "ListMetadataGenerationRuns",
})) as any;

export type ListNotebookRunsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists notebook runs in Amazon SageMaker Unified Studio.
 */
export const listNotebookRuns: API.PaginatedOperationMethod<
  ListNotebookRunsInput & RegionInput,
  ListNotebookRunsOutput,
  ListNotebookRunsError,
  Credentials | HttpClient.HttpClient,
  NotebookRunSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2144, __c67, 0) as any as S.Schema<ListNotebookRunsInput>,
  output: __S(2147, __c67, 3) as any as S.Schema<ListNotebookRunsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "ListNotebookRuns",
})) as any;

export type ListNotebooksError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists notebooks in Amazon SageMaker Unified Studio.
 */
export const listNotebooks: API.PaginatedOperationMethod<
  ListNotebooksInput & RegionInput,
  ListNotebooksOutput,
  ListNotebooksError,
  Credentials | HttpClient.HttpClient,
  NotebookSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2176, __c68, 0) as any as S.Schema<ListNotebooksInput>,
  output: __S(2179, __c68, 3) as any as S.Schema<ListNotebooksOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "ListNotebooks",
})) as any;

export type ListNotificationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists all Amazon DataZone notifications.
 */
export const listNotifications: API.PaginatedOperationMethod<
  ListNotificationsInput & RegionInput,
  ListNotificationsOutput,
  ListNotificationsError,
  Credentials | HttpClient.HttpClient,
  NotificationOutput
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2208, __c69, 0) as any as S.Schema<ListNotificationsInput>,
  output: __S(2213, __c69, 5) as any as S.Schema<ListNotificationsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "ListNotifications",
})) as any;

export type ListPolicyGrantsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists policy grants.
 */
export const listPolicyGrants: API.PaginatedOperationMethod<
  ListPolicyGrantsInput & RegionInput,
  ListPolicyGrantsOutput,
  ListPolicyGrantsError,
  Credentials | HttpClient.HttpClient,
  PolicyGrantMember
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2240, __c70, 0) as any as S.Schema<ListPolicyGrantsInput>,
  output: __S(2243, __c70, 3) as any as S.Schema<ListPolicyGrantsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "ListPolicyGrants",
})) as any;

export type ListProjectMembershipsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists all members of the specified project.
 */
export const listProjectMemberships: API.PaginatedOperationMethod<
  ListProjectMembershipsInput & RegionInput,
  ListProjectMembershipsOutput,
  ListProjectMembershipsError,
  Credentials | HttpClient.HttpClient,
  ProjectMember
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2272, __c71, 0) as any as S.Schema<ListProjectMembershipsInput>,
  output: __S(2278, __c71, 6) as any as S.Schema<ListProjectMembershipsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "ListProjectMemberships",
})) as any;

export type ListProjectProfilesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists project profiles.
 */
export const listProjectProfiles: API.PaginatedOperationMethod<
  ListProjectProfilesInput & RegionInput,
  ListProjectProfilesOutput,
  ListProjectProfilesError,
  Credentials | HttpClient.HttpClient,
  ProjectProfileSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2304, __c72, 0) as any as S.Schema<ListProjectProfilesInput>,
  output: __S(2307, __c72, 3) as any as S.Schema<ListProjectProfilesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "ListProjectProfiles",
})) as any;

export type ListProjectsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | ResourceNotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists Amazon DataZone projects.
 */
export const listProjects: API.PaginatedOperationMethod<
  ListProjectsInput & RegionInput,
  ListProjectsOutput,
  ListProjectsError,
  Credentials | HttpClient.HttpClient,
  ProjectSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2336, __c73, 0) as any as S.Schema<ListProjectsInput>,
  output: __S(2339, __c73, 3) as any as S.Schema<ListProjectsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    ResourceNotFoundException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "ListProjects",
})) as any;

export type ListRulesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists existing rules. In Amazon DataZone, a rule is a formal agreement that enforces specific requirements across user workflows (e.g., publishing assets to the catalog, requesting subscriptions, creating projects) within the Amazon DataZone data portal. These rules help maintain consistency, ensure compliance, and uphold governance standards in data management processes. For instance, a metadata enforcement rule can specify the required information for creating a subscription request or publishing a data asset to the catalog, ensuring alignment with organizational standards.
 */
export const listRules: API.PaginatedOperationMethod<
  ListRulesInput & RegionInput,
  ListRulesOutput,
  ListRulesError,
  Credentials | HttpClient.HttpClient,
  RuleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2432, __c76, 0) as any as S.Schema<ListRulesInput>,
  output: __S(2435, __c76, 3) as any as S.Schema<ListRulesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "ListRules",
})) as any;

export type ListSubscriptionGrantsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists subscription grants.
 */
export const listSubscriptionGrants: API.PaginatedOperationMethod<
  ListSubscriptionGrantsInput & RegionInput,
  ListSubscriptionGrantsOutput,
  ListSubscriptionGrantsError,
  Credentials | HttpClient.HttpClient,
  SubscriptionGrantSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2464, __c77, 0) as any as S.Schema<ListSubscriptionGrantsInput>,
  output: __S(2466, __c77, 2) as any as S.Schema<ListSubscriptionGrantsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "ListSubscriptionGrants",
})) as any;

export type ListSubscriptionRequestsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists Amazon DataZone subscription requests.
 */
export const listSubscriptionRequests: API.PaginatedOperationMethod<
  ListSubscriptionRequestsInput & RegionInput,
  ListSubscriptionRequestsOutput,
  ListSubscriptionRequestsError,
  Credentials | HttpClient.HttpClient,
  SubscriptionRequestSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2496, __c78, 0) as any as S.Schema<ListSubscriptionRequestsInput>,
  output: __S(2501, __c78, 5) as any as S.Schema<ListSubscriptionRequestsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "ListSubscriptionRequests",
})) as any;

export type ListSubscriptionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists subscriptions in Amazon DataZone.
 */
export const listSubscriptions: API.PaginatedOperationMethod<
  ListSubscriptionsInput & RegionInput,
  ListSubscriptionsOutput,
  ListSubscriptionsError,
  Credentials | HttpClient.HttpClient,
  SubscriptionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2528, __c79, 0) as any as S.Schema<ListSubscriptionsInput>,
  output: __S(2530, __c79, 2) as any as S.Schema<ListSubscriptionsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "ListSubscriptions",
})) as any;

export type ListSubscriptionTargetsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists subscription targets in Amazon DataZone.
 */
export const listSubscriptionTargets: API.PaginatedOperationMethod<
  ListSubscriptionTargetsInput & RegionInput,
  ListSubscriptionTargetsOutput,
  ListSubscriptionTargetsError,
  Credentials | HttpClient.HttpClient,
  SubscriptionTargetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2560, __c80, 0) as any as S.Schema<ListSubscriptionTargetsInput>,
  output: __S(2562, __c80, 2) as any as S.Schema<ListSubscriptionTargetsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "ListSubscriptionTargets",
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | AccessDeniedException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists tags for the specified resource in Amazon DataZone.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest & RegionInput,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2592, __c81, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(2593, __c81, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    AccessDeniedException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  telemetry: TELEMETRY,
  span: "ListTagsForResource",
}));

export type ListTimeSeriesDataPointsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists time series data points.
 */
export const listTimeSeriesDataPoints: API.PaginatedOperationMethod<
  ListTimeSeriesDataPointsInput & RegionInput,
  ListTimeSeriesDataPointsOutput,
  ListTimeSeriesDataPointsError,
  Credentials | HttpClient.HttpClient,
  TimeSeriesDataPointSummaryFormOutput
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2624, __c82, 0) as any as S.Schema<ListTimeSeriesDataPointsInput>,
  output: __S(2625, __c82, 1) as any as S.Schema<ListTimeSeriesDataPointsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "ListTimeSeriesDataPoints",
})) as any;

export type PostLineageEventError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Posts a data lineage event.
 */
export const postLineageEvent: API.OperationMethod<
  PostLineageEventInput & RegionInput,
  PostLineageEventOutput,
  PostLineageEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2656, __c83, 0) as any as S.Schema<PostLineageEventInput>,
  output: __S(2657, __c83, 1) as any as S.Schema<PostLineageEventOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PostLineageEvent",
  telemetry: TELEMETRY,
  span: "PostLineageEvent",
}));

export type PostTimeSeriesDataPointsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Posts time series data points to Amazon DataZone for the specified asset.
 */
export const postTimeSeriesDataPoints: API.OperationMethod<
  PostTimeSeriesDataPointsInput & RegionInput,
  PostTimeSeriesDataPointsOutput,
  PostTimeSeriesDataPointsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2690, __c84, 2) as any as S.Schema<PostTimeSeriesDataPointsInput>,
  output: __S(2692, __c84, 4) as any as S.Schema<PostTimeSeriesDataPointsOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PostTimeSeriesDataPoints",
  telemetry: TELEMETRY,
  span: "PostTimeSeriesDataPoints",
}));

export type PutDataExportConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
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
  PutDataExportConfigurationInput & RegionInput,
  PutDataExportConfigurationOutput,
  PutDataExportConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2720, __c85, 0) as any as S.Schema<PutDataExportConfigurationInput>,
  output: __S(768, __c24, 0) as any as S.Schema<PutDataExportConfigurationOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDataExportConfiguration",
  telemetry: TELEMETRY,
  span: "PutDataExportConfiguration",
}));

export type PutEnvironmentBlueprintConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Writes the configuration for the specified environment blueprint in Amazon DataZone.
 */
export const putEnvironmentBlueprintConfiguration: API.OperationMethod<
  PutEnvironmentBlueprintConfigurationInput & RegionInput,
  PutEnvironmentBlueprintConfigurationOutput,
  PutEnvironmentBlueprintConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2818, __c88, 2) as any as S.Schema<PutEnvironmentBlueprintConfigurationInput>,
  output: __S(8774, __c274, 6) as any as S.Schema<PutEnvironmentBlueprintConfigurationOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEnvironmentBlueprintConfiguration",
  telemetry: TELEMETRY,
  span: "PutEnvironmentBlueprintConfiguration",
}));

export type QueryGraphError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Queries entities in the graph store.
 */
export const queryGraph: API.PaginatedOperationMethod<
  QueryGraphInput & RegionInput,
  QueryGraphOutput,
  QueryGraphError,
  Credentials | HttpClient.HttpClient,
  ResultItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2853, __c89, 5) as any as S.Schema<QueryGraphInput>,
  output: __S(2857, __c89, 9) as any as S.Schema<QueryGraphOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "QueryGraph",
})) as any;

export type RejectPredictionsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Rejects automatically generated business-friendly metadata for your Amazon DataZone assets.
 */
export const rejectPredictions: API.OperationMethod<
  RejectPredictionsInput & RegionInput,
  RejectPredictionsOutput,
  RejectPredictionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2915, __c91, 3) as any as S.Schema<RejectPredictionsInput>,
  output: __S(2916, __c91, 4) as any as S.Schema<RejectPredictionsOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectPredictions",
  telemetry: TELEMETRY,
  span: "RejectPredictions",
}));

export type RejectSubscriptionRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Rejects the specified subscription request.
 */
export const rejectSubscriptionRequest: API.OperationMethod<
  RejectSubscriptionRequestInput & RegionInput,
  RejectSubscriptionRequestOutput,
  RejectSubscriptionRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2944, __c92, 0) as any as S.Schema<RejectSubscriptionRequestInput>,
  output: __S(320, __c10, 0) as any as S.Schema<RejectSubscriptionRequestOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectSubscriptionRequest",
  telemetry: TELEMETRY,
  span: "RejectSubscriptionRequest",
}));

export type RemoveEntityOwnerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Removes an owner from an entity.
 */
export const removeEntityOwner: API.OperationMethod<
  RemoveEntityOwnerInput & RegionInput,
  RemoveEntityOwnerOutput,
  RemoveEntityOwnerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2976, __c93, 0) as any as S.Schema<RemoveEntityOwnerInput>,
  output: __S(768, __c24, 0) as any as S.Schema<RemoveEntityOwnerOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveEntityOwner",
  telemetry: TELEMETRY,
  span: "RemoveEntityOwner",
}));

export type RemovePolicyGrantError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Removes a policy grant.
 */
export const removePolicyGrant: API.OperationMethod<
  RemovePolicyGrantInput & RegionInput,
  RemovePolicyGrantOutput,
  RemovePolicyGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3008, __c94, 0) as any as S.Schema<RemovePolicyGrantInput>,
  output: __S(768, __c24, 0) as any as S.Schema<RemovePolicyGrantOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemovePolicyGrant",
  telemetry: TELEMETRY,
  span: "RemovePolicyGrant",
}));

export type RevokeSubscriptionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Revokes a specified subscription in Amazon DataZone.
 */
export const revokeSubscription: API.OperationMethod<
  RevokeSubscriptionInput & RegionInput,
  RevokeSubscriptionOutput,
  RevokeSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3040, __c95, 0) as any as S.Schema<RevokeSubscriptionInput>,
  output: __S(3648, __c114, 0) as any as S.Schema<RevokeSubscriptionOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokeSubscription",
  telemetry: TELEMETRY,
  span: "RevokeSubscription",
}));

export type SearchError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
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
  SearchInput & RegionInput,
  SearchOutput,
  SearchError,
  Credentials | HttpClient.HttpClient,
  SearchInventoryResultItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3072, __c96, 0) as any as S.Schema<SearchInput>,
  output: __S(3081, __c96, 9) as any as S.Schema<SearchOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "Search",
})) as any;

export type SearchGroupProfilesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Searches group profiles in Amazon DataZone.
 */
export const searchGroupProfiles: API.PaginatedOperationMethod<
  SearchGroupProfilesInput & RegionInput,
  SearchGroupProfilesOutput,
  SearchGroupProfilesError,
  Credentials | HttpClient.HttpClient,
  GroupProfileSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3168, __c99, 0) as any as S.Schema<SearchGroupProfilesInput>,
  output: __S(3170, __c99, 2) as any as S.Schema<SearchGroupProfilesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "SearchGroupProfiles",
})) as any;

export type SearchListingsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
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
  SearchListingsInput & RegionInput,
  SearchListingsOutput,
  SearchListingsError,
  Credentials | HttpClient.HttpClient,
  SearchResultItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3202, __c100, 2) as any as S.Schema<SearchListingsInput>,
  output: __S(3213, __c100, 13) as any as S.Schema<SearchListingsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "SearchListings",
})) as any;

export type SearchTypesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
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
  SearchTypesInput & RegionInput,
  SearchTypesOutput,
  SearchTypesError,
  Credentials | HttpClient.HttpClient,
  SearchTypesResultItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3264, __c102, 0) as any as S.Schema<SearchTypesInput>,
  output: __S(3269, __c102, 5) as any as S.Schema<SearchTypesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "SearchTypes",
})) as any;

export type SearchUserProfilesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Searches user profiles in Amazon DataZone.
 */
export const searchUserProfiles: API.PaginatedOperationMethod<
  SearchUserProfilesInput & RegionInput,
  SearchUserProfilesOutput,
  SearchUserProfilesError,
  Credentials | HttpClient.HttpClient,
  UserProfileSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3296, __c103, 0) as any as S.Schema<SearchUserProfilesInput>,
  output: __S(3298, __c103, 2) as any as S.Schema<SearchUserProfilesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
    UnauthorizedException,
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
  telemetry: TELEMETRY,
  span: "SearchUserProfiles",
})) as any;

export type StartDataSourceRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Start the run of the specified data source in Amazon DataZone.
 */
export const startDataSourceRun: API.OperationMethod<
  StartDataSourceRunInput & RegionInput,
  StartDataSourceRunOutput,
  StartDataSourceRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3328, __c104, 0) as any as S.Schema<StartDataSourceRunInput>,
  output: __S(3329, __c104, 1) as any as S.Schema<StartDataSourceRunOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDataSourceRun",
  telemetry: TELEMETRY,
  span: "StartDataSourceRun",
}));

export type StartMetadataGenerationRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
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
  StartMetadataGenerationRunInput & RegionInput,
  StartMetadataGenerationRunOutput,
  StartMetadataGenerationRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3360, __c105, 0) as any as S.Schema<StartMetadataGenerationRunInput>,
  output: __S(3361, __c105, 1) as any as S.Schema<StartMetadataGenerationRunOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMetadataGenerationRun",
  telemetry: TELEMETRY,
  span: "StartMetadataGenerationRun",
}));

export type StartNotebookExportError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Starts a notebook export in Amazon SageMaker Unified Studio. This operation exports a notebook to a specified file format and stores the output in Amazon Simple Storage Service.
 */
export const startNotebookExport: API.OperationMethod<
  StartNotebookExportInput & RegionInput,
  StartNotebookExportOutput,
  StartNotebookExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3392, __c106, 0) as any as S.Schema<StartNotebookExportInput>,
  output: __S(3393, __c106, 1) as any as S.Schema<StartNotebookExportOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartNotebookExport",
  telemetry: TELEMETRY,
  span: "StartNotebookExport",
}));

export type StartNotebookImportError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Starts a notebook import in Amazon SageMaker Unified Studio. This operation imports a notebook from an Amazon Simple Storage Service location into a project.
 */
export const startNotebookImport: API.OperationMethod<
  StartNotebookImportInput & RegionInput,
  StartNotebookImportOutput,
  StartNotebookImportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3424, __c107, 0) as any as S.Schema<StartNotebookImportInput>,
  output: __S(3425, __c107, 1) as any as S.Schema<StartNotebookImportOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartNotebookImport",
  telemetry: TELEMETRY,
  span: "StartNotebookImport",
}));

export type StartNotebookRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Starts a notebook run in Amazon SageMaker Unified Studio. A notebook run represents the execution of an Amazon SageMaker notebook within a project. You can configure compute, network, timeout, and environment settings for the run.
 */
export const startNotebookRun: API.OperationMethod<
  StartNotebookRunInput & RegionInput,
  StartNotebookRunOutput,
  StartNotebookRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3488, __c109, 0) as any as S.Schema<StartNotebookRunInput>,
  output: __S(933, __c29, 5) as any as S.Schema<StartNotebookRunOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartNotebookRun",
  telemetry: TELEMETRY,
  span: "StartNotebookRun",
}));

export type StartNotebookSyncError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Starts a notebook sync in Amazon SageMaker Unified Studio. This operation syncs a notebook from a Git repository into a project.
 */
export const startNotebookSync: API.OperationMethod<
  StartNotebookSyncInput & RegionInput,
  StartNotebookSyncOutput,
  StartNotebookSyncError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3520, __c110, 0) as any as S.Schema<StartNotebookSyncInput>,
  output: __S(3521, __c110, 1) as any as S.Schema<StartNotebookSyncOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartNotebookSync",
  telemetry: TELEMETRY,
  span: "StartNotebookSync",
}));

export type StopNotebookRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Stops a running notebook run in Amazon SageMaker Unified Studio.
 */
export const stopNotebookRun: API.OperationMethod<
  StopNotebookRunInput & RegionInput,
  StopNotebookRunOutput,
  StopNotebookRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3552, __c111, 0) as any as S.Schema<StopNotebookRunInput>,
  output: __S(3553, __c111, 1) as any as S.Schema<StopNotebookRunOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopNotebookRun",
  telemetry: TELEMETRY,
  span: "StopNotebookRun",
}));

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | AccessDeniedException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Tags a resource in Amazon DataZone.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest & RegionInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3584, __c112, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(768, __c24, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    AccessDeniedException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  telemetry: TELEMETRY,
  span: "TagResource",
}));

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | AccessDeniedException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Untags a resource in Amazon DataZone.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest & RegionInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3680, __c115, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(768, __c24, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    AccessDeniedException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  telemetry: TELEMETRY,
  span: "UntagResource",
}));

export type UpdateAccountPoolError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates the account pool.
 */
export const updateAccountPool: API.OperationMethod<
  UpdateAccountPoolInput & RegionInput,
  UpdateAccountPoolOutput,
  UpdateAccountPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3712, __c116, 0) as any as S.Schema<UpdateAccountPoolInput>,
  output: __S(4066, __c127, 2) as any as S.Schema<UpdateAccountPoolOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccountPool",
  telemetry: TELEMETRY,
  span: "UpdateAccountPool",
}));

export type UpdateAssetFilterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
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
  UpdateAssetFilterInput & RegionInput,
  UpdateAssetFilterOutput,
  UpdateAssetFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3744, __c117, 0) as any as S.Schema<UpdateAssetFilterInput>,
  output: __S(4713, __c147, 9) as any as S.Schema<UpdateAssetFilterOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAssetFilter",
  telemetry: TELEMETRY,
  span: "UpdateAssetFilter",
}));

export type UpdateConnectionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a connection. In Amazon DataZone, a connection enables you to connect your resources (domains, projects, and environments) to external resources and services.
 */
export const updateConnection: API.OperationMethod<
  UpdateConnectionInput & RegionInput,
  UpdateConnectionOutput,
  UpdateConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3784, __c118, 8) as any as S.Schema<UpdateConnectionInput>,
  output: __S(3785, __c118, 9) as any as S.Schema<UpdateConnectionOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnection",
  telemetry: TELEMETRY,
  span: "UpdateConnection",
}));

export type UpdateDataSourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates the specified data source in Amazon DataZone.
 */
export const updateDataSource: API.OperationMethod<
  UpdateDataSourceInput & RegionInput,
  UpdateDataSourceOutput,
  UpdateDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3808, __c119, 0) as any as S.Schema<UpdateDataSourceInput>,
  output: __S(3809, __c119, 1) as any as S.Schema<UpdateDataSourceOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataSource",
  telemetry: TELEMETRY,
  span: "UpdateDataSource",
}));

export type UpdateDesignationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates an existing user-created designation. Managed designations cannot be modified. Omit a field to leave its current value unchanged.
 */
export const updateDesignation: API.OperationMethod<
  UpdateDesignationInput & RegionInput,
  UpdateDesignationOutput,
  UpdateDesignationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3840, __c120, 0) as any as S.Schema<UpdateDesignationInput>,
  output: __S(5344, __c167, 0) as any as S.Schema<UpdateDesignationOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDesignation",
  telemetry: TELEMETRY,
  span: "UpdateDesignation",
}));

export type UpdateDomainError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a Amazon DataZone domain.
 */
export const updateDomain: API.OperationMethod<
  UpdateDomainInput & RegionInput,
  UpdateDomainOutput,
  UpdateDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3872, __c121, 0) as any as S.Schema<UpdateDomainInput>,
  output: __S(3873, __c121, 1) as any as S.Schema<UpdateDomainOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDomain",
  telemetry: TELEMETRY,
  span: "UpdateDomain",
}));

export type UpdateDomainUnitError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates the domain unit.
 */
export const updateDomainUnit: API.OperationMethod<
  UpdateDomainUnitInput & RegionInput,
  UpdateDomainUnitOutput,
  UpdateDomainUnitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3904, __c122, 0) as any as S.Schema<UpdateDomainUnitInput>,
  output: __S(3905, __c122, 1) as any as S.Schema<UpdateDomainUnitOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDomainUnit",
  telemetry: TELEMETRY,
  span: "UpdateDomainUnit",
}));

export type UpdateEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates the specified environment in Amazon DataZone.
 */
export const updateEnvironment: API.OperationMethod<
  UpdateEnvironmentInput & RegionInput,
  UpdateEnvironmentOutput,
  UpdateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3936, __c123, 0) as any as S.Schema<UpdateEnvironmentInput>,
  output: __S(5703, __c178, 7) as any as S.Schema<UpdateEnvironmentOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEnvironment",
  telemetry: TELEMETRY,
  span: "UpdateEnvironment",
}));

export type UpdateEnvironmentActionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates an environment action.
 */
export const updateEnvironmentAction: API.OperationMethod<
  UpdateEnvironmentActionInput & RegionInput,
  UpdateEnvironmentActionOutput,
  UpdateEnvironmentActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3968, __c124, 0) as any as S.Schema<UpdateEnvironmentActionInput>,
  output: __S(5762, __c180, 2) as any as S.Schema<UpdateEnvironmentActionOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEnvironmentAction",
  telemetry: TELEMETRY,
  span: "UpdateEnvironmentAction",
}));

export type UpdateEnvironmentBlueprintError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates an environment blueprint in Amazon DataZone.
 */
export const updateEnvironmentBlueprint: API.OperationMethod<
  UpdateEnvironmentBlueprintInput & RegionInput,
  UpdateEnvironmentBlueprintOutput,
  UpdateEnvironmentBlueprintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4096, __c128, 0) as any as S.Schema<UpdateEnvironmentBlueprintInput>,
  output: __S(5824, __c182, 0) as any as S.Schema<UpdateEnvironmentBlueprintOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEnvironmentBlueprint",
  telemetry: TELEMETRY,
  span: "UpdateEnvironmentBlueprint",
}));

export type UpdateEnvironmentProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates the specified environment profile in Amazon DataZone.
 */
export const updateEnvironmentProfile: API.OperationMethod<
  UpdateEnvironmentProfileInput & RegionInput,
  UpdateEnvironmentProfileOutput,
  UpdateEnvironmentProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4128, __c129, 0) as any as S.Schema<UpdateEnvironmentProfileInput>,
  output: __S(5888, __c184, 0) as any as S.Schema<UpdateEnvironmentProfileOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEnvironmentProfile",
  telemetry: TELEMETRY,
  span: "UpdateEnvironmentProfile",
}));

export type UpdateGlossaryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
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
  UpdateGlossaryInput & RegionInput,
  UpdateGlossaryOutput,
  UpdateGlossaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4160, __c130, 0) as any as S.Schema<UpdateGlossaryInput>,
  output: __S(6016, __c188, 0) as any as S.Schema<UpdateGlossaryOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGlossary",
  telemetry: TELEMETRY,
  span: "UpdateGlossary",
}));

export type UpdateGlossaryTermError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
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
  UpdateGlossaryTermInput & RegionInput,
  UpdateGlossaryTermOutput,
  UpdateGlossaryTermError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4192, __c131, 0) as any as S.Schema<UpdateGlossaryTermInput>,
  output: __S(6112, __c191, 0) as any as S.Schema<UpdateGlossaryTermOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGlossaryTerm",
  telemetry: TELEMETRY,
  span: "UpdateGlossaryTerm",
}));

export type UpdateGroupProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates the specified group profile in Amazon DataZone.
 */
export const updateGroupProfile: API.OperationMethod<
  UpdateGroupProfileInput & RegionInput,
  UpdateGroupProfileOutput,
  UpdateGroupProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4224, __c132, 0) as any as S.Schema<UpdateGroupProfileInput>,
  output: __S(6176, __c193, 0) as any as S.Schema<UpdateGroupProfileOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGroupProfile",
  telemetry: TELEMETRY,
  span: "UpdateGroupProfile",
}));

export type UpdateNotebookError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a notebook in Amazon SageMaker Unified Studio.
 */
export const updateNotebook: API.OperationMethod<
  UpdateNotebookInput & RegionInput,
  UpdateNotebookOutput,
  UpdateNotebookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4256, __c133, 0) as any as S.Schema<UpdateNotebookInput>,
  output: __S(6368, __c199, 0) as any as S.Schema<UpdateNotebookOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNotebook",
  telemetry: TELEMETRY,
  span: "UpdateNotebook",
}));

export type UpdateProjectError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates the specified project in Amazon DataZone.
 */
export const updateProject: API.OperationMethod<
  UpdateProjectInput & RegionInput,
  UpdateProjectOutput,
  UpdateProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4288, __c134, 0) as any as S.Schema<UpdateProjectInput>,
  output: __S(6472, __c202, 8) as any as S.Schema<UpdateProjectOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProject",
  telemetry: TELEMETRY,
  span: "UpdateProject",
}));

export type UpdateProjectProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a project profile.
 */
export const updateProjectProfile: API.OperationMethod<
  UpdateProjectProfileInput & RegionInput,
  UpdateProjectProfileOutput,
  UpdateProjectProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4320, __c135, 0) as any as S.Schema<UpdateProjectProfileInput>,
  output: __S(6600, __c206, 8) as any as S.Schema<UpdateProjectProfileOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProjectProfile",
  telemetry: TELEMETRY,
  span: "UpdateProjectProfile",
}));

export type UpdateRootDomainUnitOwnerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates the owner of the root domain unit.
 */
export const updateRootDomainUnitOwner: API.OperationMethod<
  UpdateRootDomainUnitOwnerInput & RegionInput,
  UpdateRootDomainUnitOwnerOutput,
  UpdateRootDomainUnitOwnerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4352, __c136, 0) as any as S.Schema<UpdateRootDomainUnitOwnerInput>,
  output: __S(768, __c24, 0) as any as S.Schema<UpdateRootDomainUnitOwnerOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRootDomainUnitOwner",
  telemetry: TELEMETRY,
  span: "UpdateRootDomainUnitOwner",
}));

export type UpdateRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a rule. In Amazon DataZone, a rule is a formal agreement that enforces specific requirements across user workflows (e.g., publishing assets to the catalog, requesting subscriptions, creating projects) within the Amazon DataZone data portal. These rules help maintain consistency, ensure compliance, and uphold governance standards in data management processes. For instance, a metadata enforcement rule can specify the required information for creating a subscription request or publishing a data asset to the catalog, ensuring alignment with organizational standards.
 */
export const updateRule: API.OperationMethod<
  UpdateRuleInput & RegionInput,
  UpdateRuleOutput,
  UpdateRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4384, __c137, 0) as any as S.Schema<UpdateRuleInput>,
  output: __S(4385, __c137, 1) as any as S.Schema<UpdateRuleOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRule",
  telemetry: TELEMETRY,
  span: "UpdateRule",
}));

export type UpdateSubscriptionGrantStatusError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates the status of the specified subscription grant status in Amazon DataZone.
 */
export const updateSubscriptionGrantStatus: API.OperationMethod<
  UpdateSubscriptionGrantStatusInput & RegionInput,
  UpdateSubscriptionGrantStatusOutput,
  UpdateSubscriptionGrantStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4544, __c142, 0) as any as S.Schema<UpdateSubscriptionGrantStatusInput>,
  output: __S(6757, __c211, 5) as any as S.Schema<UpdateSubscriptionGrantStatusOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSubscriptionGrantStatus",
  telemetry: TELEMETRY,
  span: "UpdateSubscriptionGrantStatus",
}));

export type UpdateSubscriptionRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a specified subscription request in Amazon DataZone.
 */
export const updateSubscriptionRequest: API.OperationMethod<
  UpdateSubscriptionRequestInput & RegionInput,
  UpdateSubscriptionRequestOutput,
  UpdateSubscriptionRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4576, __c143, 0) as any as S.Schema<UpdateSubscriptionRequestInput>,
  output: __S(320, __c10, 0) as any as S.Schema<UpdateSubscriptionRequestOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSubscriptionRequest",
  telemetry: TELEMETRY,
  span: "UpdateSubscriptionRequest",
}));

export type UpdateSubscriptionTargetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates the specified subscription target in Amazon DataZone.
 */
export const updateSubscriptionTarget: API.OperationMethod<
  UpdateSubscriptionTargetInput & RegionInput,
  UpdateSubscriptionTargetOutput,
  UpdateSubscriptionTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4608, __c144, 0) as any as S.Schema<UpdateSubscriptionTargetInput>,
  output: __S(6850, __c214, 2) as any as S.Schema<UpdateSubscriptionTargetOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSubscriptionTarget",
  telemetry: TELEMETRY,
  span: "UpdateSubscriptionTarget",
}));

export type UpdateUserProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates the specified user profile in Amazon DataZone.
 */
export const updateUserProfile: API.OperationMethod<
  UpdateUserProfileInput & RegionInput,
  UpdateUserProfileOutput,
  UpdateUserProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4640, __c145, 0) as any as S.Schema<UpdateUserProfileInput>,
  output: __S(6912, __c216, 0) as any as S.Schema<UpdateUserProfileOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUserProfile",
  telemetry: TELEMETRY,
  span: "UpdateUserProfile",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          decisionComment: S.optional(SensitiveString),
          assetScopes: S.optional(__S(257, __c8, 1)),
          assetPermissions: S.optional(__S(259, __c8, 3)),
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
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c2(j: number): any {
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
      return S.Array(__S(64, __c2, 0));
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ s3: __S(96, __c3, 0) })]);
    case 1:
      return S.suspend(() =>
        S.Struct({
          assetId: S.String,
          filterIds: __S(32, __c1, 0),
          status: S.String,
          scopeName: S.optional(S.String),
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "AssetScope" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(SensitiveString),
          shortDescription: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "DetailedGlossaryTerm" });
    case 1:
      return S.Array(__S(160, __c5, 0));
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.optional(S.String), name: S.optional(SensitiveString) }),
      ).annotate({ identifier: "SubscribedProject" });
    case 1:
      return S.suspend(() =>
        S.Struct({ id: S.optional(S.String), details: S.optional(__S(226, __c7, 2)) }),
      ).annotate({ identifier: "SubscribedUser" });
    case 2:
      return S.suspend(() => S.Struct({ principalArn: S.optional(S.String) })).annotate({
        identifier: "SubscribedIamPrincipal",
      });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ project: __S(192, __c6, 0) }),
        /*@__PURE__*/ S.Struct({ user: __S(193, __c6, 1) }),
        /*@__PURE__*/ S.Struct({ group: __S(192, __c6, 0) }),
        /*@__PURE__*/ S.Struct({ iam: __S(194, __c6, 2) }),
      ]);
    case 4:
      return S.suspend(() =>
        S.Struct({
          entityId: S.optional(S.String),
          entityRevision: S.optional(S.String),
          entityType: S.optional(S.String),
          forms: S.optional(S.String),
          glossaryTerms: S.optional(__S(161, __c5, 1)),
          assetScope: S.optional(__S(129, __c4, 1)),
          permissions: S.optional(__S(128, __c4, 0)),
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
      return S.Array(__S(197, __c6, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          entityId: S.optional(S.String),
          entityRevision: S.optional(S.String),
          glossaryTerms: S.optional(__S(161, __c5, 1)),
          name: S.optional(S.String),
          description: S.optional(S.String),
          assetListings: S.optional(__S(198, __c6, 6)),
        }),
      ).annotate({ identifier: "SubscribedProductListing" });
    case 8:
      return S.Union([
        /*@__PURE__*/ S.Struct({ assetListing: __S(196, __c6, 4) }),
        /*@__PURE__*/ S.Struct({ productListing: __S(199, __c6, 7) }),
      ]);
    case 9:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          revision: S.optional(S.String),
          name: S.String,
          description: SensitiveString,
          item: __S(200, __c6, 8),
          ownerProjectId: S.String,
          ownerProjectName: S.optional(S.String),
        }),
      ).annotate({ identifier: "SubscribedListing" });
  }
}
function __c7(j: number): any {
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
        /*@__PURE__*/ S.Struct({ iam: __S(224, __c7, 0) }),
        /*@__PURE__*/ S.Struct({ sso: __S(225, __c7, 1) }),
      ]);
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ assetId: S.String, filterIds: __S(32, __c1, 0) })).annotate(
        { identifier: "AcceptedAssetScope" },
      );
    case 1:
      return S.Array(__S(256, __c8, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ assetId: S.String, permissions: __S(128, __c4, 0) }),
      ).annotate({ identifier: "AssetPermission" });
    case 3:
      return S.Array(__S(258, __c8, 2));
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(195, __c6, 3));
    case 1:
      return S.Array(__S(201, __c6, 9));
  }
}
function __c10(j: number): any {
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
          subscribedPrincipals: __S(288, __c9, 0),
          subscribedListings: __S(289, __c9, 1),
          reviewerId: S.optional(S.String),
          decisionComment: S.optional(SensitiveString),
          existingSubscriptionId: S.optional(S.String),
          metadataForms: S.optional(__S(65, __c2, 1)),
        }),
      ).annotate({ identifier: "AcceptSubscriptionRequestOutput" });
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
          usageRestrictions: S.optional(__S(96, __c3, 0)),
        }),
      ).annotate({ identifier: "GetGlossaryOutput" });
  }
}
function __c12(j: number): any {
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
          termRelations: S.optional(__S(6080, __c190, 0)),
          status: S.String,
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedBy: S.optional(S.String),
          usageRestrictions: S.optional(__S(96, __c3, 0)),
        }),
      ).annotate({ identifier: "GetGlossaryTermOutput" });
  }
}
function __c13(j: number): any {
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
function __c14(j: number): any {
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
function __c15(j: number): any {
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
          errorMessages: S.optional(__S(32, __c1, 0)),
        }),
      ).annotate({ identifier: "LineageSqlQueryRunDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({ sqlQueryRunDetails: S.optional(__S(481, __c15, 1)) }),
      ).annotate({ identifier: "LineageRunDetails" });
    case 3:
      return S.Union([/*@__PURE__*/ S.Struct({ lineageRunDetails: __S(482, __c15, 2) })]);
    case 4:
      return S.suspend(() =>
        S.Struct({
          domainId: S.optional(S.String),
          id: S.optional(S.String),
          jobId: S.optional(S.String),
          jobType: S.optional(S.String),
          runMode: S.optional(S.String),
          details: S.optional(__S(483, __c15, 3)),
          status: S.optional(S.String),
          error: S.optional(__S(6272, __c196, 0)),
          createdBy: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetJobRunOutput" });
  }
}
function __c16(j: number): any {
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
function __c17(j: number): any {
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
      return S.Array(__S(545, __c17, 1));
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
          formsOutput: S.optional(__S(65, __c2, 1)),
          upstreamNodes: S.optional(__S(546, __c17, 2)),
          downstreamNodes: S.optional(__S(546, __c17, 2)),
        }),
      ).annotate({ identifier: "GetLineageNodeOutput" });
  }
}
function __c18(j: number): any {
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
          latestTimeSeriesDataPointForms: S.optional(__S(4513, __c141, 1)),
          glossaryTerms: S.optional(__S(161, __c5, 1)),
          governedGlossaryTerms: S.optional(__S(161, __c5, 1)),
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
          glossaryTerms: S.optional(__S(161, __c5, 1)),
          owningProjectId: S.optional(S.String),
          items: S.optional(__S(609, __c19, 1)),
        }),
      ).annotate({ identifier: "DataProductListing" });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ assetListing: __S(577, __c18, 1) }),
        /*@__PURE__*/ S.Struct({ dataProductListing: __S(578, __c18, 2) }),
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
          item: S.optional(__S(579, __c18, 3)),
          name: S.optional(S.String),
          description: S.optional(SensitiveString),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetListingOutput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          listingId: S.optional(S.String),
          listingRevision: S.optional(S.String),
          glossaryTerms: S.optional(__S(161, __c5, 1)),
        }),
      ).annotate({ identifier: "ListingSummary" });
    case 1:
      return S.Array(__S(608, __c19, 0));
  }
}
function __c20(j: number): any {
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
      return S.Array(__S(641, __c20, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          id: S.String,
          target: S.optional(__S(672, __c21, 0)),
          status: S.optional(S.String),
          type: S.optional(S.String),
          types: S.optional(__S(96, __c3, 0)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          owningProjectId: S.String,
          typeStats: S.optional(__S(642, __c20, 2)),
        }),
      ).annotate({ identifier: "GetMetadataGenerationRunOutput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ type: S.String, identifier: S.String, revision: S.optional(S.String) }),
      ).annotate({ identifier: "MetadataGenerationRunTarget" });
  }
}
function __c22(j: number): any {
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
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          entityType: S.String.pipe(T.HttpLabel("entityType")),
          entityIdentifier: S.String.pipe(T.HttpLabel("entityIdentifier")),
          owner: __S(802, __c25, 2),
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
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "AddEntityOwnerOutput" });
  }
}
function __c25(j: number): any {
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
        /*@__PURE__*/ S.Struct({ user: __S(800, __c25, 0) }),
        /*@__PURE__*/ S.Struct({ group: __S(801, __c25, 1) }),
      ]);
  }
}
function __c26(j: number): any {
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
      return S.Union([/*@__PURE__*/ S.Struct({ s3: __S(833, __c26, 1) })]);
    case 3:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          domainId: S.String,
          owningProjectId: S.String,
          notebookId: S.String,
          fileFormat: S.String,
          status: S.String,
          outputLocation: S.optional(__S(834, __c26, 2)),
          error: S.optional(__S(6272, __c196, 0)),
          completedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetNotebookExportOutput" });
  }
}
function __c27(j: number): any {
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
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ type: S.optional(S.String), name: S.optional(S.String) }),
      ).annotate({ identifier: "TriggerSource" });
  }
}
function __c29(j: number): any {
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
          subnetIds: S.optional(__S(32, __c1, 0)),
          securityGroupIds: S.optional(__S(32, __c1, 0)),
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
      return S.suspend(() => S.Struct({ notifyOn: __S(96, __c3, 0) })).annotate({
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
          cellOrder: S.optional(__S(6305, __c197, 1)),
          metadata: S.optional(__S(6304, __c197, 0)),
          parameters: S.optional(__S(4928, __c154, 0)),
          computeConfiguration: S.optional(__S(928, __c29, 0)),
          networkConfiguration: S.optional(__S(929, __c29, 1)),
          timeoutConfiguration: S.optional(__S(930, __c29, 2)),
          environmentConfiguration: S.optional(__S(6307, __c197, 3)),
          storageConfiguration: S.optional(__S(931, __c29, 3)),
          notificationConfiguration: S.optional(__S(932, __c29, 4)),
          triggerSource: S.optional(__S(896, __c28, 0)),
          error: S.optional(__S(6272, __c196, 0)),
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
function __c30(j: number): any {
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
function __c31(j: number): any {
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
function __c32(j: number): any {
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
          target: __S(6657, __c208, 1),
          action: S.String,
          scope: __S(6660, __c208, 4),
          detail: __S(6692, __c209, 4),
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
function __c33(j: number): any {
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
function __c34(j: number): any {
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
function __c35(j: number): any {
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
function __c36(j: number): any {
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
function __c37(j: number): any {
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
          form: S.optional(__S(1216, __c38, 0)),
        }),
      ).annotate({ identifier: "GetTimeSeriesDataPointOutput" });
  }
}
function __c38(j: number): any {
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
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          entityType: S.String.pipe(T.HttpLabel("entityType")),
          entityIdentifier: S.String.pipe(T.HttpLabel("entityIdentifier")),
          policyType: S.String,
          principal: __S(1319, __c41, 7),
          detail: __S(1283, __c40, 3),
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
function __c40(j: number): any {
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
          projectProfiles: S.optional(__S(32, __c1, 0)),
        }),
      ).annotate({ identifier: "CreateProjectFromProjectProfilePolicyGrantDetail" });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ createDomainUnit: __S(1280, __c40, 0) }),
        /*@__PURE__*/ S.Struct({ overrideDomainUnitOwners: __S(1280, __c40, 0) }),
        /*@__PURE__*/ S.Struct({ addToProjectMemberPool: __S(1280, __c40, 0) }),
        /*@__PURE__*/ S.Struct({ overrideProjectOwners: __S(1280, __c40, 0) }),
        /*@__PURE__*/ S.Struct({ createGlossary: __S(1280, __c40, 0) }),
        /*@__PURE__*/ S.Struct({ createFormType: __S(1280, __c40, 0) }),
        /*@__PURE__*/ S.Struct({ createAssetType: __S(1280, __c40, 0) }),
        /*@__PURE__*/ S.Struct({ createProject: __S(1280, __c40, 0) }),
        /*@__PURE__*/ S.Struct({ createEnvironmentProfile: __S(1281, __c40, 1) }),
        /*@__PURE__*/ S.Struct({ delegateCreateEnvironmentProfile: __S(768, __c24, 0) }),
        /*@__PURE__*/ S.Struct({ createEnvironment: __S(768, __c24, 0) }),
        /*@__PURE__*/ S.Struct({ createEnvironmentFromBlueprint: __S(768, __c24, 0) }),
        /*@__PURE__*/ S.Struct({ createProjectFromProjectProfile: __S(1282, __c40, 2) }),
        /*@__PURE__*/ S.Struct({ useAssetType: __S(1281, __c40, 1) }),
      ]);
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ userIdentifier: S.String }),
        /*@__PURE__*/ S.Struct({ allUsersGrantFilter: __S(768, __c24, 0) }),
      ]);
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ groupIdentifier: S.String })]);
    case 2:
      return S.suspend(() =>
        S.Struct({ domainUnit: S.String, includeChildDomainUnits: S.optional(S.Boolean) }),
      ).annotate({ identifier: "DomainUnitFilterForProject" });
    case 3:
      return S.Union([/*@__PURE__*/ S.Struct({ domainUnitFilter: __S(1314, __c41, 2) })]);
    case 4:
      return S.suspend(() =>
        S.Struct({
          projectDesignation: S.String,
          userCreatedDesignationId: S.optional(S.String),
          projectIdentifier: S.optional(S.String),
          projectGrantFilter: S.optional(__S(1315, __c41, 3)),
        }),
      ).annotate({ identifier: "ProjectPolicyGrantPrincipal" });
    case 5:
      return S.Union([/*@__PURE__*/ S.Struct({ allDomainUnitsGrantFilter: __S(768, __c24, 0) })]);
    case 6:
      return S.suspend(() =>
        S.Struct({
          domainUnitDesignation: S.String,
          domainUnitIdentifier: S.optional(S.String),
          domainUnitGrantFilter: S.optional(__S(1317, __c41, 5)),
        }),
      ).annotate({ identifier: "DomainUnitPolicyGrantPrincipal" });
    case 7:
      return S.Union([
        /*@__PURE__*/ S.Struct({ user: __S(1312, __c41, 0) }),
        /*@__PURE__*/ S.Struct({ group: __S(1313, __c41, 1) }),
        /*@__PURE__*/ S.Struct({ project: __S(1316, __c41, 4) }),
        /*@__PURE__*/ S.Struct({ domainUnit: __S(1318, __c41, 6) }),
      ]);
  }
}
function __c42(j: number): any {
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
function __c43(j: number): any {
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
      return S.Array(__S(1377, __c43, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(1378, __c43, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAccountPoolsOutput" });
  }
}
function __c44(j: number): any {
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
        S.Struct({ items: S.optional(__S(4033, __c126, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAccountsInAccountPoolOutput" });
  }
}
function __c45(j: number): any {
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
          effectiveColumnNames: S.optional(__S(32, __c1, 0)),
          effectiveRowFilter: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "AssetFilterSummary" });
    case 2:
      return S.Array(__S(1441, __c45, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(1442, __c45, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAssetFiltersOutput" });
  }
}
function __c46(j: number): any {
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
      return S.Array(__S(1473, __c46, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(1474, __c46, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAssetRevisionsOutput" });
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
          configurations: S.optional(__S(4962, __c155, 2)),
          connectionId: S.String,
          domainId: S.String,
          domainUnitId: S.String,
          environmentId: S.optional(S.String),
          name: S.String,
          physicalEndpoints: __S(4983, __c155, 23),
          projectId: S.optional(S.String),
          props: S.optional(__S(4996, __c156, 4)),
          type: S.String,
          scope: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConnectionSummary" });
    case 2:
      return S.Array(__S(1505, __c47, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(1506, __c47, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListConnectionsOutput" });
  }
}
function __c48(j: number): any {
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
      return S.Array(__S(1537, __c48, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(1538, __c48, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDataProductRevisionsOutput" });
  }
}
function __c49(j: number): any {
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
          errorMessage: S.optional(__S(5248, __c164, 0)),
          lineageSummary: S.optional(__S(1569, __c49, 1)),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "DataSourceRunActivity" });
    case 3:
      return S.Array(__S(1570, __c49, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ items: __S(1571, __c49, 3), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDataSourceRunActivitiesOutput" });
  }
}
function __c50(j: number): any {
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
          runStatisticsForAssets: S.optional(__S(8416, __c263, 0)),
          errorMessage: S.optional(__S(5248, __c164, 0)),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          startedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          stoppedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lineageSummary: S.optional(__S(8384, __c262, 0)),
        }),
      ).annotate({ identifier: "DataSourceRunSummary" });
    case 2:
      return S.Array(__S(1601, __c50, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(1602, __c50, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDataSourceRunsOutput" });
  }
}
function __c51(j: number): any {
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
          schedule: S.optional(__S(5184, __c162, 0)),
          lastRunStatus: S.optional(S.String),
          lastRunAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastRunErrorMessage: S.optional(__S(5248, __c164, 0)),
          lastRunAssetCount: S.optional(S.Number),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          description: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "DataSourceSummary" });
    case 2:
      return S.Array(__S(1633, __c51, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(1634, __c51, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDataSourcesOutput" });
  }
}
function __c52(j: number): any {
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
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/domains/{domainIdentifier}/designations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDesignationsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          id: S.String,
          name: S.String,
          description: S.optional(SensitiveString),
          designationType: S.optional(S.String),
          deletionProtection: S.Boolean,
          createdBy: S.String,
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "DesignationSummary" });
    case 2:
      return S.Array(__S(1697, __c53, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(1698, __c53, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDesignationsOutput" });
  }
}
function __c54(j: number): any {
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
      return S.Array(__S(1729, __c54, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(1730, __c54, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDomainsOutput" });
  }
}
function __c55(j: number): any {
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
      return S.Array(__S(1761, __c55, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(1762, __c55, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDomainUnitsForParentOutput" });
  }
}
function __c56(j: number): any {
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
        S.Struct({ owners: __S(5475, __c171, 3), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListEntityOwnersOutput" });
  }
}
function __c57(j: number): any {
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
      return S.Array(__S(5762, __c180, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(1825, __c57, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListEnvironmentActionsOutput" });
  }
}
function __c58(j: number): any {
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
      return S.Array(__S(8774, __c274, 6));
    case 2:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(1857, __c58, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListEnvironmentBlueprintConfigurationsOutput" });
  }
}
function __c59(j: number): any {
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
          provisioningProperties: __S(5569, __c174, 1),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          blueprintCategory: S.optional(S.String),
        }),
      ).annotate({ identifier: "EnvironmentBlueprintSummary" });
    case 2:
      return S.Array(__S(1889, __c59, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(1890, __c59, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListEnvironmentBlueprintsOutput" });
  }
}
function __c60(j: number): any {
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
      return S.Array(__S(1921, __c60, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(1922, __c60, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListEnvironmentProfilesOutput" });
  }
}
function __c61(j: number): any {
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
      return S.Array(__S(1953, __c61, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(1954, __c61, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListEnvironmentsOutput" });
  }
}
function __c62(j: number): any {
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
          error: S.optional(__S(6272, __c196, 0)),
          createdBy: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "JobRunSummary" });
    case 2:
      return S.Array(__S(1985, __c62, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(1986, __c62, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListJobRunsOutput" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          entityIdentifier: S.String.pipe(T.HttpLabel("entityIdentifier")),
          entityType: S.String.pipe(T.HttpLabel("entityType")),
          governedGlossaryTerms: __S(32, __c1, 0),
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
function __c64(j: number): any {
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
      return S.Array(__S(2049, __c64, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          eventType: S.optional(S.String),
          runId: S.optional(S.String),
          job: S.optional(__S(2049, __c64, 1)),
          inputs: S.optional(__S(2050, __c64, 2)),
          outputs: S.optional(__S(2050, __c64, 2)),
        }),
      ).annotate({ identifier: "OpenLineageRunEventSummary" });
    case 4:
      return S.Union([/*@__PURE__*/ S.Struct({ openLineageRunEventSummary: __S(2051, __c64, 3) })]);
    case 5:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          domainId: S.optional(S.String),
          processingStatus: S.optional(S.String),
          eventTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          eventSummary: S.optional(__S(2052, __c64, 4)),
          createdBy: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "LineageEventSummary" });
    case 6:
      return S.Array(__S(2053, __c64, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(2054, __c64, 6)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListLineageEventsOutput" });
  }
}
function __c65(j: number): any {
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
      return S.Array(__S(2081, __c65, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nodes: S.optional(__S(2082, __c65, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListLineageNodeHistoryOutput" });
  }
}
function __c66(j: number): any {
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
          target: S.optional(__S(672, __c21, 0)),
          status: S.optional(S.String),
          type: S.optional(S.String),
          types: S.optional(__S(96, __c3, 0)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          owningProjectId: S.String,
        }),
      ).annotate({ identifier: "MetadataGenerationRunItem" });
    case 2:
      return S.Array(__S(2113, __c66, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(2114, __c66, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListMetadataGenerationRunsOutput" });
  }
}
function __c67(j: number): any {
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
          triggerSource: S.optional(__S(896, __c28, 0)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedBy: S.optional(S.String),
          startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          completedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "NotebookRunSummary" });
    case 2:
      return S.Array(__S(2145, __c67, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(2146, __c67, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListNotebookRunsOutput" });
  }
}
function __c68(j: number): any {
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
      return S.Array(__S(2177, __c68, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(2178, __c68, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListNotebooksOutput" });
  }
}
function __c69(j: number): any {
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
          subjects: S.optional(__S(32, __c1, 0)).pipe(T.HttpQuery("subjects")),
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
        S.Struct({ subject: S.String, resource: __S(2209, __c69, 1), role: S.String }),
      ).annotate({ identifier: "Topic" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          identifier: S.String,
          domainIdentifier: S.String,
          type: S.String,
          topic: __S(2210, __c69, 2),
          title: SensitiveString,
          message: SensitiveString,
          status: S.optional(S.String),
          actionLink: SensitiveString,
          creationTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastUpdatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          metadata: S.optional(__S(4928, __c154, 0)),
        }),
      ).annotate({ identifier: "NotificationOutput" });
    case 4:
      return S.Array(__S(2211, __c69, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          notifications: S.optional(__S(2212, __c69, 4)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListNotificationsOutput" });
  }
}
function __c70(j: number): any {
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
          principal: S.optional(__S(1319, __c41, 7)),
          detail: S.optional(__S(1283, __c40, 3)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          grantId: S.optional(S.String),
        }),
      ).annotate({ identifier: "PolicyGrantMember" });
    case 2:
      return S.Array(__S(2241, __c70, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ grantList: __S(2242, __c70, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListPolicyGrantsOutput" });
  }
}
function __c71(j: number): any {
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
        /*@__PURE__*/ S.Struct({ user: __S(2273, __c71, 1) }),
        /*@__PURE__*/ S.Struct({ group: __S(2274, __c71, 2) }),
      ]);
    case 4:
      return S.suspend(() =>
        S.Struct({
          memberDetails: __S(2275, __c71, 3),
          designation: S.String,
          userCreatedDesignationId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProjectMember" });
    case 5:
      return S.Array(__S(2276, __c71, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ members: __S(2277, __c71, 5), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListProjectMembershipsOutput" });
  }
}
function __c72(j: number): any {
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
      return S.Array(__S(2305, __c72, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(2306, __c72, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListProjectProfilesOutput" });
  }
}
function __c73(j: number): any {
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
          failureReasons: S.optional(__S(6433, __c201, 1)),
          createdBy: S.String,
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          domainUnitId: S.optional(S.String),
          projectCategory: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProjectSummary" });
    case 2:
      return S.Array(__S(2337, __c73, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(2338, __c73, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListProjectsOutput" });
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
          entityRevision: S.optional(S.String).pipe(T.HttpQuery("entityRevision")),
          attributeIdentifiers: __S(32, __c1, 0).pipe(T.HttpQuery("attributeIdentifier")),
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
        S.Struct({ attributeIdentifier: S.String, forms: S.optional(__S(65, __c2, 1)) }),
      ).annotate({ identifier: "BatchGetAttributeOutput" });
    case 2:
      return S.Array(__S(2369, __c74, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ attributes: S.optional(__S(2370, __c74, 2)), errors: __S(2401, __c75, 1) }),
      ).annotate({ identifier: "BatchGetAttributesMetadataOutput" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ attributeIdentifier: S.String, code: S.String, message: S.String }),
      ).annotate({ identifier: "AttributeError" });
    case 1:
      return S.Array(__S(2400, __c75, 0));
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          targetType: S.String.pipe(T.HttpLabel("targetType")),
          targetIdentifier: S.String.pipe(T.HttpLabel("targetIdentifier")),
          ruleType: S.optional(S.String).pipe(T.HttpQuery("ruleType")),
          action: S.optional(S.String).pipe(T.HttpQuery("ruleAction")),
          projectIds: S.optional(__S(32, __c1, 0)).pipe(T.HttpQuery("projectIds")),
          assetTypes: S.optional(__S(32, __c1, 0)).pipe(T.HttpQuery("assetTypes")),
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
          target: S.optional(__S(6657, __c208, 1)),
          action: S.optional(S.String),
          scope: S.optional(__S(6660, __c208, 4)),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "RuleSummary" });
    case 2:
      return S.Array(__S(2433, __c76, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(2434, __c76, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRulesOutput" });
  }
}
function __c77(j: number): any {
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
      return S.Array(__S(6757, __c211, 5));
    case 2:
      return S.suspend(() =>
        S.Struct({ items: __S(2465, __c77, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSubscriptionGrantsOutput" });
  }
}
function __c78(j: number): any {
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
      return S.Array(__S(2497, __c78, 1));
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
          subscribedPrincipals: __S(288, __c9, 0),
          subscribedListings: __S(289, __c9, 1),
          reviewerId: S.optional(S.String),
          decisionComment: S.optional(SensitiveString),
          existingSubscriptionId: S.optional(S.String),
          metadataFormsSummary: S.optional(__S(2498, __c78, 2)),
        }),
      ).annotate({ identifier: "SubscriptionRequestSummary" });
    case 4:
      return S.Array(__S(2499, __c78, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ items: __S(2500, __c78, 4), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSubscriptionRequestsOutput" });
  }
}
function __c79(j: number): any {
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
      return S.Array(__S(3648, __c114, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ items: __S(2529, __c79, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSubscriptionsOutput" });
  }
}
function __c80(j: number): any {
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
      return S.Array(__S(6850, __c214, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({ items: __S(2561, __c80, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSubscriptionTargetsOutput" });
  }
}
function __c81(j: number): any {
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
      return S.suspend(() => S.Struct({ tags: S.optional(__S(4928, __c154, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c82(j: number): any {
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
        S.Struct({ items: S.optional(__S(4513, __c141, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTimeSeriesDataPointsOutput" });
  }
}
function __c83(j: number): any {
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
function __c84(j: number): any {
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
      return S.Array(__S(2688, __c84, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          entityIdentifier: S.String.pipe(T.HttpLabel("entityIdentifier")),
          entityType: S.String.pipe(T.HttpLabel("entityType")),
          forms: __S(2689, __c84, 1),
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
      return S.Array(__S(1216, __c38, 0));
    case 4:
      return S.suspend(() =>
        S.Struct({
          domainId: S.optional(S.String),
          entityId: S.optional(S.String),
          entityType: S.optional(S.String),
          forms: S.optional(__S(2691, __c84, 3)),
        }),
      ).annotate({ identifier: "PostTimeSeriesDataPointsOutput" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          enableExport: S.Boolean,
          encryptionConfiguration: S.optional(__S(8256, __c258, 0)),
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
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ attributeIdentifier: S.String, forms: __S(2785, __c87, 1) }),
      ).annotate({ identifier: "AttributeInput" });
    case 1:
      return S.Array(__S(2752, __c86, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          entityType: S.String.pipe(T.HttpLabel("entityType")),
          entityIdentifier: S.String.pipe(T.HttpLabel("entityIdentifier")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          attributes: __S(2753, __c86, 1),
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
      return S.Array(__S(2755, __c86, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          errors: S.optional(__S(2401, __c75, 1)),
          attributes: S.optional(__S(2756, __c86, 4)),
        }),
      ).annotate({ identifier: "BatchPutAttributesMetadataOutput" });
  }
}
function __c87(j: number): any {
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
      return S.Array(__S(2784, __c87, 0));
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          region: S.String,
          parameters: __S(4928, __c154, 0),
        }),
      ).annotate({ identifier: "PutResourceConfiguration" });
    case 1:
      return S.Array(__S(2816, __c88, 0));
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
          enabledRegions: __S(32, __c1, 0),
          regionalParameters: S.optional(__S(8768, __c274, 0)),
          resourceConfigurations: S.optional(__S(2817, __c88, 1)),
          allowUserProvidedConfigurations: S.optional(S.Boolean),
          globalParameters: S.optional(__S(4928, __c154, 0)),
          provisioningConfigurations: S.optional(__S(8773, __c274, 5)),
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
function __c89(j: number): any {
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
          filters: S.optional(__S(2882, __c90, 2)),
        }),
      ).annotate({ identifier: "EntityPattern" });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ relationPattern: __S(2848, __c89, 0) }),
        /*@__PURE__*/ S.Struct({ entityPattern: __S(2849, __c89, 1) }),
      ]);
    case 3:
      return S.Array(__S(2850, __c89, 2));
    case 4:
      return S.suspend(() => S.Struct({ formNames: S.optional(__S(32, __c1, 0)) })).annotate({
        identifier: "AdditionalAttributes",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          match: __S(2851, __c89, 3),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          additionalAttributes: S.optional(__S(2852, __c89, 4)),
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
          formsOutput: S.optional(__S(65, __c2, 1)),
          upstreamLineageNodeIds: S.optional(__S(32, __c1, 0)),
          downstreamLineageNodeIds: S.optional(__S(32, __c1, 0)),
        }),
      ).annotate({ identifier: "LineageNodeItem" });
    case 7:
      return S.Union([/*@__PURE__*/ S.Struct({ lineageNode: __S(2854, __c89, 6) })]);
    case 8:
      return S.Array(__S(2855, __c89, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(2856, __c89, 8)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "QueryGraphOutput" });
  }
}
function __c90(j: number): any {
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
        /*@__PURE__*/ S.suspend(() => __S(2882, __c90, 2)).annotate({ identifier: "FilterClause" }),
      );
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ filter: __S(2880, __c90, 0) }),
        /*@__PURE__*/ S.Struct({
          and: /*@__PURE__*/ S.suspend(() => __S(2881, __c90, 1)).annotate({
            identifier: "FilterList",
          }),
        }),
        /*@__PURE__*/ S.Struct({
          or: /*@__PURE__*/ S.suspend(() => __S(2881, __c90, 1)).annotate({
            identifier: "FilterList",
          }),
        }),
      ]);
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.Number);
    case 1:
      return S.suspend(() =>
        S.Struct({
          predictionTarget: S.optional(S.String),
          predictionChoices: S.optional(__S(2912, __c91, 0)),
        }),
      ).annotate({ identifier: "RejectChoice" });
    case 2:
      return S.Array(__S(2913, __c91, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          revision: S.optional(S.String).pipe(T.HttpQuery("revision")),
          rejectRule: S.optional(__S(8512, __c266, 0)),
          rejectChoices: S.optional(__S(2914, __c91, 2)),
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
function __c92(j: number): any {
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
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          entityType: S.String.pipe(T.HttpLabel("entityType")),
          entityIdentifier: S.String.pipe(T.HttpLabel("entityIdentifier")),
          owner: __S(802, __c25, 2),
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
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          entityType: S.String.pipe(T.HttpLabel("entityType")),
          entityIdentifier: S.String.pipe(T.HttpLabel("entityIdentifier")),
          policyType: S.String,
          principal: __S(1319, __c41, 7),
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
function __c95(j: number): any {
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
function __c96(j: number): any {
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
          searchIn: S.optional(__S(3137, __c98, 1)),
          filters: S.optional(__S(2882, __c90, 2)),
          sort: S.optional(__S(3138, __c98, 2)),
          additionalAttributes: S.optional(__S(96, __c3, 0)),
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
        S.Struct({ matchRationale: S.optional(__S(3109, __c97, 5)) }),
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
          usageRestrictions: S.optional(__S(96, __c3, 0)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedBy: S.optional(S.String),
          additionalAttributes: S.optional(__S(3073, __c96, 1)),
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
          usageRestrictions: S.optional(__S(96, __c3, 0)),
          longDescription: S.optional(SensitiveString),
          termRelations: S.optional(__S(6080, __c190, 0)),
          status: S.String,
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedBy: S.optional(S.String),
          additionalAttributes: S.optional(__S(3073, __c96, 1)),
        }),
      ).annotate({ identifier: "GlossaryTermItem" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          formsOutput: S.optional(__S(65, __c2, 1)),
          readOnlyFormsOutput: S.optional(__S(65, __c2, 1)),
          latestTimeSeriesDataPointFormsOutput: S.optional(__S(4513, __c141, 1)),
          matchRationale: S.optional(__S(3109, __c97, 5)),
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
          glossaryTerms: S.optional(__S(32, __c1, 0)),
          owningProjectId: S.String,
          additionalAttributes: S.optional(__S(3076, __c96, 4)),
          governedGlossaryTerms: S.optional(__S(32, __c1, 0)),
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
          glossaryTerms: S.optional(__S(32, __c1, 0)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          firstRevisionCreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          firstRevisionCreatedBy: S.optional(S.String),
          additionalAttributes: S.optional(__S(3073, __c96, 1)),
        }),
      ).annotate({ identifier: "DataProductResultItem" });
    case 7:
      return S.Union([
        /*@__PURE__*/ S.Struct({ glossaryItem: __S(3074, __c96, 2) }),
        /*@__PURE__*/ S.Struct({ glossaryTermItem: __S(3075, __c96, 3) }),
        /*@__PURE__*/ S.Struct({ assetItem: __S(3077, __c96, 5) }),
        /*@__PURE__*/ S.Struct({ dataProductItem: __S(3078, __c96, 6) }),
      ]);
    case 8:
      return S.Array(__S(3079, __c96, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          items: S.optional(__S(3080, __c96, 8)),
          nextToken: S.optional(S.String),
          totalMatchCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SearchOutput" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ startOffset: S.optional(S.Number), endOffset: S.optional(S.Number) }),
      ).annotate({ identifier: "MatchOffset" });
    case 1:
      return S.Array(__S(3104, __c97, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          attribute: S.optional(S.String),
          text: S.optional(S.String),
          matchOffsets: S.optional(__S(3105, __c97, 1)),
        }),
      ).annotate({ identifier: "TextMatchItem" });
    case 3:
      return S.Array(__S(3106, __c97, 2));
    case 4:
      return S.Union([/*@__PURE__*/ S.Struct({ textMatches: __S(3107, __c97, 3) })]);
    case 5:
      return S.Array(__S(3108, __c97, 4));
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ attribute: S.String })).annotate({
        identifier: "SearchInItem",
      });
    case 1:
      return S.Array(__S(3136, __c98, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ attribute: S.String, order: S.optional(S.String) }),
      ).annotate({ identifier: "SearchSort" });
  }
}
function __c99(j: number): any {
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
      return S.Array(__S(6176, __c193, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(3169, __c99, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "SearchGroupProfilesOutput" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ attribute: S.String, displayValue: S.optional(S.String) }),
      ).annotate({ identifier: "AggregationListItem" });
    case 1:
      return S.Array(__S(3200, __c100, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          searchText: S.optional(S.String),
          searchIn: S.optional(__S(3137, __c98, 1)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          filters: S.optional(__S(2882, __c90, 2)),
          aggregations: S.optional(__S(3201, __c100, 1)),
          sort: S.optional(__S(3138, __c98, 2)),
          additionalAttributes: S.optional(__S(96, __c3, 0)),
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
          matchRationale: S.optional(__S(3109, __c97, 5)),
          latestTimeSeriesDataPointForms: S.optional(__S(4513, __c141, 1)),
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
          glossaryTerms: S.optional(__S(161, __c5, 1)),
          governedGlossaryTerms: S.optional(__S(161, __c5, 1)),
          owningProjectId: S.optional(S.String),
          additionalAttributes: S.optional(__S(3203, __c100, 3)),
        }),
      ).annotate({ identifier: "AssetListingItem" });
    case 5:
      return S.suspend(() =>
        S.Struct({ forms: S.optional(S.String), matchRationale: S.optional(__S(3109, __c97, 5)) }),
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
          glossaryTerms: S.optional(__S(161, __c5, 1)),
          owningProjectId: S.optional(S.String),
          additionalAttributes: S.optional(__S(3205, __c100, 5)),
          items: S.optional(__S(609, __c19, 1)),
        }),
      ).annotate({ identifier: "DataProductListingItem" });
    case 7:
      return S.Union([
        /*@__PURE__*/ S.Struct({ assetListing: __S(3204, __c100, 4) }),
        /*@__PURE__*/ S.Struct({ dataProductListing: __S(3206, __c100, 6) }),
      ]);
    case 8:
      return S.Array(__S(3207, __c100, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          value: S.optional(S.String),
          count: S.optional(S.Number),
          displayValue: S.optional(S.String),
        }),
      ).annotate({ identifier: "AggregationOutputItem" });
    case 10:
      return S.Array(__S(3209, __c100, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({
          attribute: S.optional(S.String),
          displayValue: S.optional(S.String),
          items: S.optional(__S(3210, __c100, 10)),
        }),
      ).annotate({ identifier: "AggregationOutput" });
    case 12:
      return S.Array(__S(3211, __c100, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({
          items: S.optional(__S(3208, __c100, 8)),
          nextToken: S.optional(S.String),
          totalMatchCount: S.optional(S.Number),
          aggregates: S.optional(__S(3212, __c100, 12)),
        }),
      ).annotate({ identifier: "SearchListingsOutput" });
  }
}
function __c101(j: number): any {
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
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          searchScope: S.String,
          searchText: S.optional(S.String),
          searchIn: S.optional(__S(3137, __c98, 1)),
          filters: S.optional(__S(2882, __c90, 2)),
          sort: S.optional(__S(3138, __c98, 2)),
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
          model: S.optional(__S(5952, __c186, 0)),
          status: S.optional(S.String),
          owningProjectId: S.optional(S.String),
          originDomainId: S.optional(S.String),
          originProjectId: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          description: S.optional(SensitiveString),
          imports: S.optional(__S(8897, __c278, 1)),
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
          formsOutput: __S(4801, __c150, 1),
        }),
      ).annotate({ identifier: "LineageNodeTypeItem" });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ assetTypeItem: __S(8128, __c254, 0) }),
        /*@__PURE__*/ S.Struct({ formTypeItem: __S(3265, __c102, 1) }),
        /*@__PURE__*/ S.Struct({ lineageNodeTypeItem: __S(3266, __c102, 2) }),
      ]);
    case 4:
      return S.Array(__S(3267, __c102, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          items: S.optional(__S(3268, __c102, 4)),
          nextToken: S.optional(S.String),
          totalMatchCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SearchTypesOutput" });
  }
}
function __c103(j: number): any {
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
      return S.Array(__S(6912, __c216, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(3297, __c103, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "SearchUserProfilesOutput" });
  }
}
function __c104(j: number): any {
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
          runStatisticsForAssets: S.optional(__S(8416, __c263, 0)),
          errorMessage: S.optional(__S(5248, __c164, 0)),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          startedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          stoppedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "StartDataSourceRunOutput" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          type: S.optional(S.String),
          types: S.optional(__S(96, __c3, 0)),
          target: __S(672, __c21, 0),
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
          types: S.optional(__S(96, __c3, 0)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          owningProjectId: S.optional(S.String),
        }),
      ).annotate({ identifier: "StartMetadataGenerationRunOutput" });
  }
}
function __c106(j: number): any {
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
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          owningProjectIdentifier: S.String,
          sourceLocation: __S(3459, __c108, 3),
          name: SensitiveString,
          description: S.optional(SensitiveString),
          type: S.optional(S.String),
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
          type: S.optional(S.String),
          sourceLocation: S.optional(__S(3459, __c108, 3)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "StartNotebookImportOutput" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: SensitiveString })).annotate({ identifier: "S3File" });
    case 1:
      return S.Array(__S(3456, __c108, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ bucket: SensitiveString, fileList: __S(3457, __c108, 1) }),
      ).annotate({ identifier: "S3FilesLocation" });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ s3: SensitiveString }),
        /*@__PURE__*/ S.Struct({ s3Files: __S(3458, __c108, 2) }),
      ]);
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          owningProjectIdentifier: S.String,
          notebookIdentifier: S.String,
          scheduleIdentifier: S.optional(S.String),
          computeConfiguration: S.optional(__S(928, __c29, 0)),
          networkConfiguration: S.optional(__S(929, __c29, 1)),
          timeoutConfiguration: S.optional(__S(930, __c29, 2)),
          notificationConfiguration: S.optional(__S(932, __c29, 4)),
          triggerSource: S.optional(__S(896, __c28, 0)),
          metadata: S.optional(__S(6304, __c197, 0)),
          parameters: S.optional(__S(4928, __c154, 0)),
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
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          owningProjectIdentifier: S.String,
          sourceLocation: __S(3459, __c108, 3),
          gitMetadata: S.optional(__S(6336, __c198, 0)),
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
          sourceLocation: S.optional(__S(3459, __c108, 3)),
          gitMetadata: S.optional(__S(6336, __c198, 0)),
          name: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "StartNotebookSyncOutput" });
  }
}
function __c111(j: number): any {
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
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(4928, __c154, 0),
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
function __c113(j: number): any {
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
function __c114(j: number): any {
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
          subscribedPrincipal: __S(195, __c6, 3),
          subscribedListing: __S(201, __c6, 9),
          subscriptionRequestId: S.optional(S.String),
          retainPermissions: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "CancelSubscriptionOutput" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(32, __c1, 0).pipe(T.HttpQuery("tagKeys")),
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
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          name: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          resolutionStrategy: S.optional(S.String),
          accountSource: S.optional(__S(4065, __c127, 1)),
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
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          assetIdentifier: S.String.pipe(T.HttpLabel("assetIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          name: S.optional(S.String),
          description: S.optional(SensitiveString),
          configuration: S.optional(__S(4712, __c147, 8)),
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
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          oAuth2GrantType: S.optional(S.String),
          oAuth2ClientApplication: S.optional(__S(4965, __c155, 5)),
          tokenUrl: S.optional(S.String),
          tokenUrlParametersMap: S.optional(__S(4928, __c154, 0)),
        }),
      ).annotate({ identifier: "OAuth2PropertiesPatch" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          secretArn: S.optional(S.String),
          basicAuthenticationCredentials: S.optional(__S(4864, __c152, 0)),
          oAuth2Properties: S.optional(__S(3776, __c118, 0)),
        }),
      ).annotate({ identifier: "AuthenticationConfigurationPatch" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          description: S.optional(S.String),
          connectionProperties: S.optional(__S(4928, __c154, 0)),
          authenticationConfiguration: S.optional(__S(3777, __c118, 1)),
        }),
      ).annotate({ identifier: "GlueConnectionPatch" });
    case 3:
      return S.suspend(() =>
        S.Struct({ glueConnectionInput: S.optional(__S(3778, __c118, 2)) }),
      ).annotate({ identifier: "GluePropertiesPatch" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          connectivityPropertiesPatch: S.optional(__S(3778, __c118, 2)),
          snowflakeRole: S.optional(S.String),
          lineageSync: S.optional(__S(4869, __c152, 5)),
        }),
      ).annotate({ identifier: "SnowflakePropertiesPatch" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          vpcId: S.optional(S.String),
          subnetIds: S.optional(__S(32, __c1, 0)),
          securityGroupId: S.optional(S.String),
        }),
      ).annotate({ identifier: "VpcPropertiesPatch" });
    case 6:
      return S.suspend(() =>
        S.Struct({ codeConnectionArn: S.optional(S.String), defaultBranch: S.optional(S.String) }),
      ).annotate({ identifier: "GitPropertiesPatch" });
    case 7:
      return S.Union([
        /*@__PURE__*/ S.Struct({ athenaProperties: __S(4963, __c155, 3) }),
        /*@__PURE__*/ S.Struct({ glueProperties: __S(3779, __c118, 3) }),
        /*@__PURE__*/ S.Struct({ iamProperties: __S(4979, __c155, 19) }),
        /*@__PURE__*/ S.Struct({ redshiftProperties: __S(4866, __c152, 2) }),
        /*@__PURE__*/ S.Struct({ sparkEmrProperties: __S(4867, __c152, 3) }),
        /*@__PURE__*/ S.Struct({ s3Properties: __S(4868, __c152, 4) }),
        /*@__PURE__*/ S.Struct({ snowflakeProperties: __S(3780, __c118, 4) }),
        /*@__PURE__*/ S.Struct({ amazonQProperties: __S(4976, __c155, 16) }),
        /*@__PURE__*/ S.Struct({ mlflowProperties: __S(4977, __c155, 17) }),
        /*@__PURE__*/ S.Struct({ lakehouseProperties: __S(4979, __c155, 19) }),
        /*@__PURE__*/ S.Struct({ vpcProperties: __S(3781, __c118, 5) }),
        /*@__PURE__*/ S.Struct({ gitProperties: __S(3782, __c118, 6) }),
      ]);
    case 8:
      return S.suspend(() =>
        S.Struct({
          configurations: S.optional(__S(4962, __c155, 2)),
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          description: S.optional(SensitiveString),
          awsLocation: S.optional(__S(4960, __c155, 0)),
          props: S.optional(__S(3783, __c118, 7)),
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
    case 9:
      return S.suspend(() =>
        S.Struct({
          configurations: S.optional(__S(4962, __c155, 2)),
          connectionId: S.String,
          description: S.optional(SensitiveString),
          domainId: S.String,
          domainUnitId: S.String,
          environmentId: S.optional(S.String),
          name: S.String,
          physicalEndpoints: __S(4983, __c155, 23),
          projectId: S.optional(S.String),
          props: S.optional(__S(4996, __c156, 4)),
          type: S.String,
          scope: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateConnectionOutput" });
  }
}
function __c119(j: number): any {
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
          assetFormsInput: S.optional(__S(2785, __c87, 1)),
          schedule: S.optional(__S(5184, __c162, 0)),
          configuration: S.optional(__S(5155, __c161, 3)),
          recommendation: S.optional(__S(5280, __c165, 0)),
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
          configuration: S.optional(__S(5227, __c163, 11)),
          recommendation: S.optional(__S(5280, __c165, 0)),
          enableSetting: S.optional(S.String),
          publishOnImport: S.optional(S.Boolean),
          assetFormsOutput: S.optional(__S(65, __c2, 1)),
          schedule: S.optional(__S(5184, __c162, 0)),
          lastRunStatus: S.optional(S.String),
          lastRunAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastRunErrorMessage: S.optional(__S(5248, __c164, 0)),
          errorMessage: S.optional(__S(5248, __c164, 0)),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          selfGrantStatus: S.optional(__S(7203, __c225, 3)),
          retainPermissionsOnRevokeFailure: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "UpdateDataSourceOutput" });
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          name: S.optional(S.String),
          description: S.optional(SensitiveString),
          policy: S.optional(S.String),
          deletionProtection: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/v2/domains/{domainIdentifier}/designations/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDesignationInput" });
  }
}
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          description: S.optional(S.String),
          singleSignOn: S.optional(__S(5408, __c169, 0)),
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
          singleSignOn: S.optional(__S(5408, __c169, 0)),
          domainExecutionRole: S.optional(S.String),
          serviceRole: S.optional(S.String),
          name: S.optional(S.String),
          lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "UpdateDomainOutput" });
  }
}
function __c122(j: number): any {
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
          owners: __S(5475, __c171, 3),
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
function __c123(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          name: S.optional(S.String),
          description: S.optional(S.String),
          glossaryTerms: S.optional(__S(32, __c1, 0)),
          blueprintVersion: S.optional(S.String),
          userParameters: S.optional(__S(5633, __c176, 1)),
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
function __c124(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          environmentIdentifier: S.String.pipe(T.HttpLabel("environmentIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          parameters: S.optional(__S(5761, __c180, 1)),
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
function __c125(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          name: SensitiveString,
          description: S.optional(SensitiveString),
          resolutionStrategy: S.String,
          accountSource: __S(4065, __c127, 1),
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
function __c126(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          awsAccountId: S.String,
          supportedRegions: __S(32, __c1, 0),
          awsAccountName: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "AccountInfo" });
    case 1:
      return S.Array(__S(4032, __c126, 0));
  }
}
function __c127(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ lambdaFunctionArn: S.String, lambdaExecutionRoleArn: S.optional(S.String) }),
      ).annotate({ identifier: "CustomAccountPoolHandler" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ accounts: __S(4033, __c126, 1) }),
        /*@__PURE__*/ S.Struct({ customAccountPoolHandler: __S(4064, __c127, 0) }),
      ]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          domainId: S.optional(S.String),
          name: S.optional(SensitiveString),
          id: S.optional(S.String),
          description: S.optional(SensitiveString),
          resolutionStrategy: S.optional(S.String),
          accountSource: __S(4065, __c127, 1),
          createdBy: S.String,
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedBy: S.optional(S.String),
          domainUnitId: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateAccountPoolOutput" });
  }
}
function __c128(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          description: S.optional(S.String),
          provisioningProperties: S.optional(__S(5569, __c174, 1)),
          userParameters: S.optional(__S(5537, __c173, 1)),
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
function __c129(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          name: S.optional(SensitiveString),
          description: S.optional(S.String),
          userParameters: S.optional(__S(5633, __c176, 1)),
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
function __c130(j: number): any {
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
function __c131(j: number): any {
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
          termRelations: S.optional(__S(6080, __c190, 0)),
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
function __c132(j: number): any {
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
function __c133(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          description: S.optional(SensitiveString),
          status: S.optional(S.String),
          name: S.optional(SensitiveString),
          cellOrder: S.optional(__S(6305, __c197, 1)),
          type: S.optional(S.String),
          metadata: S.optional(__S(6304, __c197, 0)),
          parameters: S.optional(__S(4928, __c154, 0)),
          environmentConfiguration: S.optional(__S(6307, __c197, 3)),
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
function __c134(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          name: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          resourceTags: S.optional(__S(4928, __c154, 0)),
          glossaryTerms: S.optional(__S(32, __c1, 0)),
          domainUnitId: S.optional(S.String),
          environmentDeploymentDetails: S.optional(__S(6471, __c202, 7)),
          userParameters: S.optional(__S(6466, __c202, 2)),
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
function __c135(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          name: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          status: S.optional(S.String),
          projectResourceTags: S.optional(__S(6593, __c206, 1)),
          allowCustomProjectResourceTags: S.optional(S.Boolean),
          projectResourceTagsDescription: S.optional(SensitiveString),
          environmentConfigurations: S.optional(__S(6599, __c206, 7)),
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
function __c136(j: number): any {
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
function __c137(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          name: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          scope: S.optional(__S(6660, __c208, 4)),
          detail: S.optional(__S(6692, __c209, 4)),
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
          target: __S(6657, __c208, 1),
          action: S.String,
          scope: __S(6660, __c208, 4),
          detail: __S(6692, __c209, 4),
          description: S.optional(SensitiveString),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          createdBy: S.String,
          lastUpdatedBy: S.String,
        }),
      ).annotate({ identifier: "UpdateRuleOutput" });
  }
}
function __c138(j: number): any {
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
          glossaryTerms: S.optional(__S(32, __c1, 0)),
          formsInput: S.optional(__S(2785, __c87, 1)),
          owningProjectIdentifier: S.String,
          predictionConfiguration: S.optional(__S(4449, __c139, 1)),
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
function __c139(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ enabled: S.optional(S.Boolean) })).annotate({
        identifier: "BusinessNameGenerationConfiguration",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ businessNameGeneration: S.optional(__S(4448, __c139, 0)) }),
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
          glossaryTerms: S.optional(__S(32, __c1, 0)),
          governedGlossaryTerms: S.optional(__S(32, __c1, 0)),
          owningProjectId: S.String,
          domainId: S.String,
          listing: S.optional(__S(4480, __c140, 0)),
          formsOutput: __S(65, __c2, 1),
          readOnlyFormsOutput: S.optional(__S(65, __c2, 1)),
          latestTimeSeriesDataPointFormsOutput: S.optional(__S(4513, __c141, 1)),
          predictionConfiguration: S.optional(__S(4449, __c139, 1)),
        }),
      ).annotate({ identifier: "CreateAssetOutput" });
  }
}
function __c140(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ listingId: S.String, listingStatus: S.String })).annotate({
        identifier: "AssetListingDetails",
      });
  }
}
function __c141(j: number): any {
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
      return S.Array(__S(4512, __c141, 0));
  }
}
function __c142(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          assetIdentifier: S.String.pipe(T.HttpLabel("assetIdentifier")),
          status: S.String,
          failureCause: S.optional(__S(6754, __c211, 2)),
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
function __c143(j: number): any {
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
function __c144(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          environmentIdentifier: S.String.pipe(T.HttpLabel("environmentIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          name: S.optional(SensitiveString),
          authorizedPrincipals: S.optional(__S(32, __c1, 0)),
          applicableAssetTypes: S.optional(__S(32, __c1, 0)),
          subscriptionTargetConfig: S.optional(__S(6849, __c214, 1)),
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
function __c145(j: number): any {
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
function __c146(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          assetIdentifier: S.String.pipe(T.HttpLabel("assetIdentifier")),
          name: SensitiveString,
          description: S.optional(SensitiveString),
          configuration: __S(4712, __c147, 8),
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
function __c147(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ includedColumnNames: S.optional(__S(32, __c1, 0)) }),
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
      return S.suspend(() => S.Struct({ columnName: S.String, values: __S(32, __c1, 0) })).annotate(
        { identifier: "InExpression" },
      );
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ equalTo: __S(4705, __c147, 1) }),
        /*@__PURE__*/ S.Struct({ notEqualTo: __S(4705, __c147, 1) }),
        /*@__PURE__*/ S.Struct({ greaterThan: __S(4705, __c147, 1) }),
        /*@__PURE__*/ S.Struct({ lessThan: __S(4705, __c147, 1) }),
        /*@__PURE__*/ S.Struct({ greaterThanOrEqualTo: __S(4705, __c147, 1) }),
        /*@__PURE__*/ S.Struct({ lessThanOrEqualTo: __S(4705, __c147, 1) }),
        /*@__PURE__*/ S.Struct({ isNull: __S(4706, __c147, 2) }),
        /*@__PURE__*/ S.Struct({ isNotNull: __S(4706, __c147, 2) }),
        /*@__PURE__*/ S.Struct({ in: __S(4707, __c147, 3) }),
        /*@__PURE__*/ S.Struct({ notIn: __S(4707, __c147, 3) }),
        /*@__PURE__*/ S.Struct({ like: __S(4705, __c147, 1) }),
        /*@__PURE__*/ S.Struct({ notLike: __S(4705, __c147, 1) }),
      ]);
    case 5:
      return S.Array(
        /*@__PURE__*/ S.suspend(() => __S(4710, __c147, 6)).annotate({ identifier: "RowFilter" }),
      );
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({ expression: __S(4708, __c147, 4) }),
        /*@__PURE__*/ S.Struct({
          and: /*@__PURE__*/ S.suspend(() => __S(4709, __c147, 5)).annotate({
            identifier: "RowFilterList",
          }),
        }),
        /*@__PURE__*/ S.Struct({
          or: /*@__PURE__*/ S.suspend(() => __S(4709, __c147, 5)).annotate({
            identifier: "RowFilterList",
          }),
        }),
      ]);
    case 7:
      return S.suspend(() =>
        S.Struct({ rowFilter: __S(4710, __c147, 6), sensitive: S.optional(S.Boolean) }),
      ).annotate({ identifier: "RowFilterConfiguration" });
    case 8:
      return S.Union([
        /*@__PURE__*/ S.Struct({ columnConfiguration: __S(4704, __c147, 0) }),
        /*@__PURE__*/ S.Struct({ rowConfiguration: __S(4711, __c147, 7) }),
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
          configuration: __S(4712, __c147, 8),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          errorMessage: S.optional(S.String),
          effectiveColumnNames: S.optional(__S(32, __c1, 0)),
          effectiveRowFilter: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateAssetFilterOutput" });
  }
}
function __c148(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: SensitiveString,
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          typeRevision: S.optional(S.String),
          description: S.optional(SensitiveString),
          glossaryTerms: S.optional(__S(32, __c1, 0)),
          formsInput: S.optional(__S(2785, __c87, 1)),
          predictionConfiguration: S.optional(__S(4449, __c139, 1)),
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
function __c149(j: number): any {
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
      return S.Record(S.String, /*@__PURE__*/ __S(4768, __c149, 0).pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          name: S.String,
          description: S.optional(SensitiveString),
          formsInput: __S(4769, __c149, 1),
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
          formsOutput: __S(4801, __c150, 1),
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
function __c150(j: number): any {
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
      return S.Record(S.String, /*@__PURE__*/ __S(4800, __c150, 0).pipe(S.optional));
  }
}
function __c151(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          authenticationType: S.optional(S.String),
          oAuth2Properties: S.optional(__S(4968, __c155, 8)),
          secretArn: S.optional(S.String),
          kmsKeyArn: S.optional(S.String),
          basicAuthenticationCredentials: S.optional(__S(4864, __c152, 0)),
          customAuthenticationCredentials: S.optional(__S(4928, __c154, 0)),
        }),
      ).annotate({ identifier: "AuthenticationConfigurationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          connectionProperties: S.optional(__S(4928, __c154, 0)),
          physicalConnectionRequirements: S.optional(__S(4964, __c155, 4)),
          name: S.optional(S.String),
          description: S.optional(S.String),
          connectionType: S.optional(S.String),
          matchCriteria: S.optional(S.String),
          validateCredentials: S.optional(S.Boolean),
          validateForComputeEnvironments: S.optional(__S(96, __c3, 0)),
          sparkProperties: S.optional(__S(4928, __c154, 0)),
          athenaProperties: S.optional(__S(4928, __c154, 0)),
          pythonProperties: S.optional(__S(4928, __c154, 0)),
          authenticationConfiguration: S.optional(__S(4832, __c151, 0)),
        }),
      ).annotate({ identifier: "GlueConnectionInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({ glueConnectionInput: S.optional(__S(4833, __c151, 1)) }),
      ).annotate({ identifier: "GluePropertiesInput" });
    case 3:
      return S.suspend(() =>
        S.Struct({ glueLineageSyncEnabled: S.optional(S.Boolean), roleArn: S.optional(S.String) }),
      ).annotate({ identifier: "IamPropertiesInput" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          connectionProperties: S.optional(__S(4928, __c154, 0)),
          physicalConnectionRequirements: S.optional(__S(4964, __c155, 4)),
          name: S.optional(S.String),
          description: S.optional(S.String),
          validateCredentials: S.optional(S.Boolean),
          validateForComputeEnvironments: S.optional(__S(96, __c3, 0)),
          sparkProperties: S.optional(__S(4928, __c154, 0)),
          athenaProperties: S.optional(__S(4928, __c154, 0)),
          pythonProperties: S.optional(__S(4928, __c154, 0)),
          authenticationConfiguration: S.optional(__S(4832, __c151, 0)),
        }),
      ).annotate({ identifier: "ConnectivityProperties" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          connectivityProperties: S.optional(__S(4836, __c151, 4)),
          snowflakeRole: S.String,
          identityMapping: __S(4975, __c155, 15),
          lineageSync: S.optional(__S(4869, __c152, 5)),
        }),
      ).annotate({ identifier: "SnowflakePropertiesInput" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          vpcId: S.String,
          subnetIds: __S(32, __c1, 0),
          securityGroupId: S.optional(S.String),
        }),
      ).annotate({ identifier: "VpcPropertiesInput" });
    case 7:
      return S.suspend(() =>
        S.Struct({ codeConnectionArn: S.String, repositoryId: S.String, defaultBranch: S.String }),
      ).annotate({ identifier: "GitPropertiesInput" });
    case 8:
      return S.Union([
        /*@__PURE__*/ S.Struct({ athenaProperties: __S(4963, __c155, 3) }),
        /*@__PURE__*/ S.Struct({ glueProperties: __S(4834, __c151, 2) }),
        /*@__PURE__*/ S.Struct({ hyperPodProperties: __S(4896, __c153, 0) }),
        /*@__PURE__*/ S.Struct({ iamProperties: __S(4835, __c151, 3) }),
        /*@__PURE__*/ S.Struct({ redshiftProperties: __S(4866, __c152, 2) }),
        /*@__PURE__*/ S.Struct({ sparkEmrProperties: __S(4867, __c152, 3) }),
        /*@__PURE__*/ S.Struct({ sparkGlueProperties: __S(4974, __c155, 14) }),
        /*@__PURE__*/ S.Struct({ s3Properties: __S(4868, __c152, 4) }),
        /*@__PURE__*/ S.Struct({ snowflakeProperties: __S(4837, __c151, 5) }),
        /*@__PURE__*/ S.Struct({ amazonQProperties: __S(4976, __c155, 16) }),
        /*@__PURE__*/ S.Struct({ mlflowProperties: __S(4977, __c155, 17) }),
        /*@__PURE__*/ S.Struct({ workflowsMwaaProperties: __S(4978, __c155, 18) }),
        /*@__PURE__*/ S.Struct({ workflowsServerlessProperties: __S(768, __c24, 0) }),
        /*@__PURE__*/ S.Struct({ lakehouseProperties: __S(4979, __c155, 19) }),
        /*@__PURE__*/ S.Struct({ vpcProperties: __S(4838, __c151, 6) }),
        /*@__PURE__*/ S.Struct({ gitProperties: __S(4839, __c151, 7) }),
      ]);
    case 9:
      return S.suspend(() =>
        S.Struct({
          awsLocation: S.optional(__S(4960, __c155, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          configurations: S.optional(__S(4962, __c155, 2)),
          description: S.optional(SensitiveString),
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          environmentIdentifier: S.optional(S.String),
          name: S.String,
          props: S.optional(__S(4840, __c151, 8)),
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
          configurations: S.optional(__S(4962, __c155, 2)),
          description: S.optional(SensitiveString),
          domainId: S.String,
          domainUnitId: S.String,
          environmentId: S.optional(S.String),
          name: S.String,
          physicalEndpoints: __S(4983, __c155, 23),
          projectId: S.optional(S.String),
          props: S.optional(__S(4996, __c156, 4)),
          type: S.String,
          scope: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateConnectionOutput" });
  }
}
function __c152(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ userName: S.optional(S.String), password: S.optional(S.String) }),
      ).annotate({ identifier: "BasicAuthenticationCredentials" });
    case 1:
      return S.suspend(() =>
        S.Struct({ enabled: S.optional(S.Boolean), schedule: S.optional(__S(4972, __c155, 12)) }),
      ).annotate({ identifier: "RedshiftLineageSyncConfigurationInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          storage: S.optional(__S(4969, __c155, 9)),
          databaseName: S.optional(S.String),
          host: S.optional(S.String),
          port: S.optional(S.Number),
          credentials: S.optional(__S(4971, __c155, 11)),
          lineageSync: S.optional(__S(4865, __c152, 1)),
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
function __c153(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ clusterName: S.String })).annotate({
        identifier: "HyperPodPropertiesInput",
      });
  }
}
function __c154(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c155(j: number): any {
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
          properties: S.optional(__S(4928, __c154, 0)),
        }),
      ).annotate({ identifier: "Configuration" });
    case 2:
      return S.Array(__S(4961, __c155, 1));
    case 3:
      return S.suspend(() => S.Struct({ workgroupName: S.optional(S.String) })).annotate({
        identifier: "AthenaPropertiesInput",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          subnetId: S.optional(S.String),
          subnetIdList: S.optional(__S(32, __c1, 0)),
          securityGroupIdList: S.optional(__S(32, __c1, 0)),
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
          oAuth2ClientApplication: S.optional(__S(4965, __c155, 5)),
          tokenUrl: S.optional(S.String),
          tokenUrlParametersMap: S.optional(__S(4928, __c154, 0)),
          authorizationCodeProperties: S.optional(__S(4966, __c155, 6)),
          oAuth2Credentials: S.optional(__S(4967, __c155, 7)),
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
        /*@__PURE__*/ S.Struct({ usernamePassword: __S(4970, __c155, 10) }),
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
          additionalArgs: S.optional(__S(4973, __c155, 13)),
          glueConnectionName: S.optional(S.String),
          glueConnectionNames: S.optional(__S(32, __c1, 0)),
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
          oAuth2Properties: S.optional(__S(4968, __c155, 8)),
        }),
      ).annotate({ identifier: "AuthenticationConfiguration" });
    case 21:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          description: S.optional(S.String),
          connectionType: S.optional(S.String),
          matchCriteria: S.optional(__S(32, __c1, 0)),
          connectionProperties: S.optional(__S(4928, __c154, 0)),
          sparkProperties: S.optional(__S(4928, __c154, 0)),
          athenaProperties: S.optional(__S(4928, __c154, 0)),
          pythonProperties: S.optional(__S(4928, __c154, 0)),
          physicalConnectionRequirements: S.optional(__S(4964, __c155, 4)),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedBy: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          lastConnectionValidationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          authenticationConfiguration: S.optional(__S(4980, __c155, 20)),
          connectionSchemaVersion: S.optional(S.Number),
          compatibleComputeEnvironments: S.optional(__S(96, __c3, 0)),
        }),
      ).annotate({ identifier: "GlueConnection" });
    case 22:
      return S.suspend(() =>
        S.Struct({
          awsLocation: S.optional(__S(4960, __c155, 0)),
          glueConnectionName: S.optional(S.String),
          glueConnectionNames: S.optional(__S(32, __c1, 0)),
          glueConnection: S.optional(__S(4981, __c155, 21)),
          enableTrustedIdentityPropagation: S.optional(S.Boolean),
          host: S.optional(S.String),
          port: S.optional(S.Number),
          protocol: S.optional(S.String),
          stage: S.optional(S.String),
        }),
      ).annotate({ identifier: "PhysicalEndpoint" });
    case 23:
      return S.Array(__S(4982, __c155, 22));
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
          schedule: S.optional(__S(4972, __c155, 12)),
        }),
      ).annotate({ identifier: "RedshiftLineageSyncConfigurationOutput" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          storage: S.optional(__S(4969, __c155, 9)),
          credentials: S.optional(__S(4971, __c155, 11)),
          isProvisionedSecret: S.optional(S.Boolean),
          jdbcIamUrl: S.optional(S.String),
          jdbcUrl: S.optional(S.String),
          redshiftTempDir: S.optional(S.String),
          lineageSync: S.optional(__S(4987, __c155, 27)),
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
          credentials: S.optional(__S(4970, __c155, 10)),
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
          managedEndpointCredentials: S.optional(__S(4989, __c155, 29)),
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
function __c156(j: number): any {
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
          identityMapping: __S(4975, __c155, 15),
          lineageSync: __S(4992, __c156, 0),
          status: S.String,
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "SnowflakePropertiesOutput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          vpcId: S.String,
          subnetIds: __S(32, __c1, 0),
          status: S.String,
          securityGroupId: S.optional(S.String),
          glueConnectionNames: S.optional(__S(32, __c1, 0)),
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
        /*@__PURE__*/ S.Struct({ athenaProperties: __S(4963, __c155, 3) }),
        /*@__PURE__*/ S.Struct({ glueProperties: __S(4984, __c155, 24) }),
        /*@__PURE__*/ S.Struct({ hyperPodProperties: __S(4985, __c155, 25) }),
        /*@__PURE__*/ S.Struct({ iamProperties: __S(4986, __c155, 26) }),
        /*@__PURE__*/ S.Struct({ redshiftProperties: __S(4988, __c155, 28) }),
        /*@__PURE__*/ S.Struct({ sparkEmrProperties: __S(4990, __c155, 30) }),
        /*@__PURE__*/ S.Struct({ sparkGlueProperties: __S(4974, __c155, 14) }),
        /*@__PURE__*/ S.Struct({ s3Properties: __S(4991, __c155, 31) }),
        /*@__PURE__*/ S.Struct({ snowflakeProperties: __S(4993, __c156, 1) }),
        /*@__PURE__*/ S.Struct({ amazonQProperties: __S(4976, __c155, 16) }),
        /*@__PURE__*/ S.Struct({ mlflowProperties: __S(4977, __c155, 17) }),
        /*@__PURE__*/ S.Struct({ workflowsMwaaProperties: __S(4978, __c155, 18) }),
        /*@__PURE__*/ S.Struct({ workflowsServerlessProperties: __S(768, __c24, 0) }),
        /*@__PURE__*/ S.Struct({ lakehouseProperties: __S(4979, __c155, 19) }),
        /*@__PURE__*/ S.Struct({ vpcProperties: __S(4994, __c156, 2) }),
        /*@__PURE__*/ S.Struct({ gitProperties: __S(4995, __c156, 3) }),
      ]);
  }
}
function __c157(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          name: SensitiveString,
          owningProjectIdentifier: S.String,
          description: S.optional(SensitiveString),
          glossaryTerms: S.optional(__S(32, __c1, 0)),
          formsInput: S.optional(__S(2785, __c87, 1)),
          items: S.optional(__S(5057, __c158, 1)),
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
function __c158(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          itemType: S.String,
          identifier: S.String,
          revision: S.optional(S.String),
          glossaryTerms: S.optional(__S(32, __c1, 0)),
        }),
      ).annotate({ identifier: "DataProductItem" });
    case 1:
      return S.Array(__S(5056, __c158, 0));
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
          glossaryTerms: S.optional(__S(32, __c1, 0)),
          items: S.optional(__S(5057, __c158, 1)),
          formsOutput: S.optional(__S(65, __c2, 1)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          firstRevisionCreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          firstRevisionCreatedBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateDataProductOutput" });
  }
}
function __c159(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          name: SensitiveString,
          description: S.optional(SensitiveString),
          glossaryTerms: S.optional(__S(32, __c1, 0)),
          items: S.optional(__S(5057, __c158, 1)),
          formsInput: S.optional(__S(2785, __c87, 1)),
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
function __c160(j: number): any {
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
          configuration: S.optional(__S(5155, __c161, 3)),
          recommendation: S.optional(__S(5280, __c165, 0)),
          enableSetting: S.optional(S.String),
          schedule: S.optional(__S(5184, __c162, 0)),
          publishOnImport: S.optional(S.Boolean),
          assetFormsInput: S.optional(__S(2785, __c87, 1)),
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
          configuration: S.optional(__S(5227, __c163, 11)),
          recommendation: S.optional(__S(5280, __c165, 0)),
          enableSetting: S.optional(S.String),
          publishOnImport: S.optional(S.Boolean),
          assetFormsOutput: S.optional(__S(65, __c2, 1)),
          schedule: S.optional(__S(5184, __c162, 0)),
          lastRunStatus: S.optional(S.String),
          lastRunAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastRunErrorMessage: S.optional(__S(5248, __c164, 0)),
          errorMessage: S.optional(__S(5248, __c164, 0)),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "CreateDataSourceOutput" });
  }
}
function __c161(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          dataAccessRole: S.optional(S.String),
          relationalFilterConfigurations: __S(5219, __c163, 3),
          autoImportDataQualityResult: S.optional(S.Boolean),
          catalogName: S.optional(S.String),
        }),
      ).annotate({ identifier: "GlueRunConfigurationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          dataAccessRole: S.optional(S.String),
          relationalFilterConfigurations: __S(5219, __c163, 3),
          redshiftCredentialConfiguration: S.optional(__S(5220, __c163, 4)),
          redshiftStorage: S.optional(__S(5222, __c163, 6)),
        }),
      ).annotate({ identifier: "RedshiftRunConfigurationInput" });
    case 2:
      return S.suspend(() => S.Struct({ trackingAssets: __S(5223, __c163, 7) })).annotate({
        identifier: "SageMakerRunConfigurationInput",
      });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ glueRunConfiguration: __S(5152, __c161, 0) }),
        /*@__PURE__*/ S.Struct({ redshiftRunConfiguration: __S(5153, __c161, 1) }),
        /*@__PURE__*/ S.Struct({ sageMakerRunConfiguration: __S(5154, __c161, 2) }),
      ]);
  }
}
function __c162(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ timezone: S.optional(S.String), schedule: S.optional(S.String) }),
      ).annotate({ identifier: "ScheduleConfiguration" });
  }
}
function __c163(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ type: S.String, expression: S.String })).annotate({
        identifier: "FilterExpression",
      });
    case 1:
      return S.Array(__S(5216, __c163, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          databaseName: S.String,
          schemaName: S.optional(S.String),
          filterExpressions: S.optional(__S(5217, __c163, 1)),
        }),
      ).annotate({ identifier: "RelationalFilterConfiguration" });
    case 3:
      return S.Array(__S(5218, __c163, 2));
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
        /*@__PURE__*/ S.Struct({ redshiftClusterSource: __S(4896, __c153, 0) }),
        /*@__PURE__*/ S.Struct({ redshiftServerlessSource: __S(5221, __c163, 5) }),
      ]);
    case 7:
      return S.Record(S.String, /*@__PURE__*/ __S(32, __c1, 0).pipe(S.optional));
    case 8:
      return S.suspend(() =>
        S.Struct({
          accountId: S.optional(S.String),
          region: S.optional(S.String),
          dataAccessRole: S.optional(S.String),
          relationalFilterConfigurations: __S(5219, __c163, 3),
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
          relationalFilterConfigurations: __S(5219, __c163, 3),
          redshiftCredentialConfiguration: S.optional(__S(5220, __c163, 4)),
          redshiftStorage: __S(5222, __c163, 6),
        }),
      ).annotate({ identifier: "RedshiftRunConfigurationOutput" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          accountId: S.optional(S.String),
          region: S.optional(S.String),
          trackingAssets: __S(5223, __c163, 7),
        }),
      ).annotate({ identifier: "SageMakerRunConfigurationOutput" });
    case 11:
      return S.Union([
        /*@__PURE__*/ S.Struct({ glueRunConfiguration: __S(5224, __c163, 8) }),
        /*@__PURE__*/ S.Struct({ redshiftRunConfiguration: __S(5225, __c163, 9) }),
        /*@__PURE__*/ S.Struct({ sageMakerRunConfiguration: __S(5226, __c163, 10) }),
      ]);
  }
}
function __c164(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ errorType: S.String, errorDetail: S.optional(S.String) }),
      ).annotate({ identifier: "DataSourceErrorMessage" });
  }
}
function __c165(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ enableBusinessNameGeneration: S.optional(S.Boolean) }),
      ).annotate({ identifier: "RecommendationConfiguration" });
  }
}
function __c166(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          name: S.String,
          description: S.optional(SensitiveString),
          policy: S.String,
          deletionProtection: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/domains/{domainIdentifier}/designations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDesignationInput" });
  }
}
function __c167(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          id: S.String,
          name: S.String,
          description: S.optional(SensitiveString),
          designationType: S.String,
          policy: S.String,
          deletionProtection: S.Boolean,
          createdBy: S.String,
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "CreateDesignationOutput" });
  }
}
function __c168(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          singleSignOn: S.optional(__S(5408, __c169, 0)),
          domainExecutionRole: S.optional(S.String),
          kmsKeyIdentifier: S.optional(S.String),
          tags: S.optional(__S(4928, __c154, 0)),
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
          singleSignOn: S.optional(__S(5408, __c169, 0)),
          domainExecutionRole: S.optional(S.String),
          arn: S.optional(S.String),
          kmsKeyIdentifier: S.optional(S.String),
          status: S.optional(S.String),
          portalUrl: S.optional(S.String),
          tags: S.optional(__S(4928, __c154, 0)),
          domainVersion: S.optional(S.String),
          serviceRole: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateDomainOutput" });
  }
}
function __c169(j: number): any {
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
function __c170(j: number): any {
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
          owners: __S(5475, __c171, 3),
          ancestorDomainUnitIds: __S(32, __c1, 0),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateDomainUnitOutput" });
  }
}
function __c171(j: number): any {
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
        /*@__PURE__*/ S.Struct({ user: __S(5472, __c171, 0) }),
        /*@__PURE__*/ S.Struct({ group: __S(5473, __c171, 1) }),
      ]);
    case 3:
      return S.Array(__S(5474, __c171, 2));
  }
}
function __c172(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          projectIdentifier: S.String,
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          description: S.optional(S.String),
          name: S.String,
          environmentProfileIdentifier: S.optional(S.String),
          userParameters: S.optional(__S(5633, __c176, 1)),
          glossaryTerms: S.optional(__S(32, __c1, 0)),
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
function __c173(j: number): any {
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
      return S.Array(__S(5536, __c173, 0));
  }
}
function __c174(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ templateUrl: S.String })).annotate({
        identifier: "CloudFormationProperties",
      });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ cloudFormation: __S(5568, __c174, 0) }),
        /*@__PURE__*/ S.Struct({ manual: /*@__PURE__*/ S.Struct({}) }),
      ]);
  }
}
function __c175(j: number): any {
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
function __c176(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), value: S.optional(S.String) }),
      ).annotate({ identifier: "EnvironmentParameter" });
    case 1:
      return S.Array(__S(5632, __c176, 0));
  }
}
function __c177(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ code: S.optional(S.String), message: S.String })).annotate({
        identifier: "EnvironmentError",
      });
  }
}
function __c178(j: number): any {
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
      return S.Array(__S(5696, __c178, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ key: S.optional(S.String), value: S.optional(S.String) }),
      ).annotate({ identifier: "ConfigurableActionParameter" });
    case 3:
      return S.Array(__S(5698, __c178, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ type: S.String, auth: S.optional(S.String), parameters: __S(5699, __c178, 3) }),
      ).annotate({ identifier: "ConfigurableEnvironmentAction" });
    case 5:
      return S.Array(__S(5700, __c178, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          deploymentId: S.optional(S.String),
          deploymentType: S.optional(S.String),
          deploymentStatus: S.optional(S.String),
          failureReason: S.optional(__S(5664, __c177, 0)),
          messages: S.optional(__S(32, __c1, 0)),
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
          provisionedResources: S.optional(__S(5697, __c178, 1)),
          status: S.optional(S.String),
          environmentActions: S.optional(__S(5701, __c178, 5)),
          glossaryTerms: S.optional(__S(32, __c1, 0)),
          userParameters: S.optional(__S(5537, __c173, 1)),
          lastDeployment: S.optional(__S(5702, __c178, 6)),
          provisioningProperties: S.optional(__S(5569, __c174, 1)),
          deploymentProperties: S.optional(__S(5600, __c175, 0)),
          environmentBlueprintId: S.optional(S.String),
          environmentConfigurationId: S.optional(SensitiveString),
          environmentConfigurationName: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "CreateEnvironmentOutput" });
  }
}
function __c179(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          environmentIdentifier: S.String.pipe(T.HttpLabel("environmentIdentifier")),
          name: S.String,
          parameters: __S(5761, __c180, 1),
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
function __c180(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ uri: S.optional(S.String) })).annotate({
        identifier: "AwsConsoleLinkParameters",
      });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ awsConsoleLink: __S(5760, __c180, 0) })]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          environmentId: S.String,
          id: S.String,
          name: S.String,
          parameters: __S(5761, __c180, 1),
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateEnvironmentActionOutput" });
  }
}
function __c181(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          name: S.String,
          description: S.optional(SensitiveString),
          provisioningProperties: __S(5569, __c174, 1),
          userParameters: S.optional(__S(5537, __c173, 1)),
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
function __c182(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          name: S.String,
          description: S.optional(SensitiveString),
          provider: S.String,
          provisioningProperties: __S(5569, __c174, 1),
          deploymentProperties: S.optional(__S(5600, __c175, 0)),
          userParameters: S.optional(__S(5537, __c173, 1)),
          glossaryTerms: S.optional(__S(32, __c1, 0)),
          blueprintCategory: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "CreateEnvironmentBlueprintOutput" });
  }
}
function __c183(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          name: SensitiveString,
          description: S.optional(SensitiveString),
          environmentBlueprintIdentifier: S.String,
          projectIdentifier: S.String,
          userParameters: S.optional(__S(5633, __c176, 1)),
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
function __c184(j: number): any {
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
          userParameters: S.optional(__S(5537, __c173, 1)),
        }),
      ).annotate({ identifier: "CreateEnvironmentProfileOutput" });
  }
}
function __c185(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          name: SensitiveString,
          model: __S(5952, __c186, 0),
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
function __c186(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ smithy: S.String })]);
  }
}
function __c187(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          name: SensitiveString,
          owningProjectIdentifier: S.String,
          description: S.optional(SensitiveString),
          status: S.optional(S.String),
          usageRestrictions: S.optional(__S(96, __c3, 0)),
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
function __c188(j: number): any {
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
          usageRestrictions: S.optional(__S(96, __c3, 0)),
        }),
      ).annotate({ identifier: "CreateGlossaryOutput" });
  }
}
function __c189(j: number): any {
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
          termRelations: S.optional(__S(6080, __c190, 0)),
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
function __c190(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ isA: S.optional(__S(32, __c1, 0)), classifies: S.optional(__S(32, __c1, 0)) }),
      ).annotate({ identifier: "TermRelations" });
  }
}
function __c191(j: number): any {
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
          termRelations: S.optional(__S(6080, __c190, 0)),
          usageRestrictions: S.optional(__S(96, __c3, 0)),
        }),
      ).annotate({ identifier: "CreateGlossaryTermOutput" });
  }
}
function __c192(j: number): any {
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
function __c193(j: number): any {
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
function __c194(j: number): any {
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
function __c195(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          owningProjectIdentifier: S.String,
          name: SensitiveString,
          description: S.optional(SensitiveString),
          type: S.optional(S.String),
          metadata: S.optional(__S(6304, __c197, 0)),
          parameters: S.optional(__S(4928, __c154, 0)),
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
function __c196(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ message: S.String })).annotate({
        identifier: "NotebookError",
      });
  }
}
function __c197(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ SensitiveString.pipe(S.optional));
    case 1:
      return S.Array(__S(768, __c24, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ packageManager: S.String, packageSpecification: S.optional(S.String) }),
      ).annotate({ identifier: "PackageConfig" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          imageVersion: S.optional(S.String),
          packageConfig: S.optional(__S(6306, __c197, 2)),
        }),
      ).annotate({ identifier: "EnvironmentConfig" });
  }
}
function __c198(j: number): any {
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
function __c199(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          name: SensitiveString,
          owningProjectId: S.String,
          domainId: S.String,
          cellOrder: __S(6305, __c197, 1),
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
          metadata: S.optional(__S(6304, __c197, 0)),
          parameters: S.optional(__S(4928, __c154, 0)),
          environmentConfiguration: S.optional(__S(6307, __c197, 3)),
          error: S.optional(__S(6272, __c196, 0)),
          gitMetadata: S.optional(__S(6336, __c198, 0)),
        }),
      ).annotate({ identifier: "CreateNotebookOutput" });
  }
}
function __c200(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          member: __S(6496, __c203, 0),
          designation: S.String,
          userCreatedDesignationId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProjectMembershipAssignment" });
    case 1:
      return S.Array(__S(6400, __c200, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          name: SensitiveString,
          description: S.optional(SensitiveString),
          resourceTags: S.optional(__S(4928, __c154, 0)),
          glossaryTerms: S.optional(__S(32, __c1, 0)),
          domainUnitId: S.optional(S.String),
          projectProfileId: S.optional(S.String),
          userParameters: S.optional(__S(6466, __c202, 2)),
          projectCategory: S.optional(S.String),
          projectExecutionRole: S.optional(S.String),
          membershipAssignments: S.optional(__S(6401, __c200, 1)),
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
function __c201(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ code: S.optional(S.String), message: S.optional(S.String) }),
      ).annotate({ identifier: "ProjectDeletionError" });
    case 1:
      return S.Array(__S(6432, __c201, 0));
  }
}
function __c202(j: number): any {
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
          environmentResolvedAccount: S.optional(__S(6464, __c202, 0)),
          environmentConfigurationName: S.optional(SensitiveString),
          environmentParameters: S.optional(__S(5633, __c176, 1)),
        }),
      ).annotate({ identifier: "EnvironmentConfigurationUserParameter" });
    case 2:
      return S.Array(__S(6465, __c202, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ key: S.String, value: S.String, source: S.String }),
      ).annotate({ identifier: "ResourceTag" });
    case 4:
      return S.Array(__S(6467, __c202, 3));
    case 5:
      return S.Array(__S(5664, __c177, 0));
    case 6:
      return S.Record(S.String, /*@__PURE__*/ __S(6469, __c202, 5).pipe(S.optional));
    case 7:
      return S.suspend(() =>
        S.Struct({
          overallDeploymentStatus: S.optional(S.String),
          environmentFailureReasons: S.optional(__S(6470, __c202, 6)),
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
          failureReasons: S.optional(__S(6433, __c201, 1)),
          createdBy: S.String,
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          resourceTags: S.optional(__S(6468, __c202, 4)),
          glossaryTerms: S.optional(__S(32, __c1, 0)),
          domainUnitId: S.optional(S.String),
          projectProfileId: S.optional(S.String),
          userParameters: S.optional(__S(6466, __c202, 2)),
          environmentDeploymentDetails: S.optional(__S(6471, __c202, 7)),
          projectCategory: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateProjectOutput" });
  }
}
function __c203(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ userIdentifier: S.String }),
        /*@__PURE__*/ S.Struct({ groupIdentifier: S.String }),
      ]);
  }
}
function __c204(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          projectIdentifier: S.String.pipe(T.HttpLabel("projectIdentifier")),
          member: __S(6496, __c203, 0),
          designation: S.String,
          userCreatedDesignationId: S.optional(S.String),
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
function __c205(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          name: SensitiveString,
          description: S.optional(SensitiveString),
          status: S.optional(S.String),
          projectResourceTags: S.optional(__S(6593, __c206, 1)),
          allowCustomProjectResourceTags: S.optional(S.Boolean),
          projectResourceTagsDescription: S.optional(SensitiveString),
          environmentConfigurations: S.optional(__S(6599, __c206, 7)),
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
function __c206(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ key: S.String, value: S.String, isValueEditable: S.Boolean }),
      ).annotate({ identifier: "ResourceTagParameter" });
    case 1:
      return S.Array(__S(6592, __c206, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          value: S.optional(S.String),
          isEditable: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "EnvironmentConfigurationParameter" });
    case 3:
      return S.Array(__S(6594, __c206, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          ssmPath: S.optional(S.String),
          parameterOverrides: S.optional(__S(6595, __c206, 3)),
          resolvedParameters: S.optional(__S(6595, __c206, 3)),
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
          configurationParameters: S.optional(__S(6596, __c206, 4)),
          awsAccount: S.optional(__S(6597, __c206, 5)),
          accountPools: S.optional(__S(32, __c1, 0)),
          awsRegion: S.optional(Region),
          deploymentOrder: S.optional(S.Number),
        }),
      ).annotate({ identifier: "EnvironmentConfiguration" });
    case 7:
      return S.Array(__S(6598, __c206, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          id: S.String,
          name: SensitiveString,
          description: S.optional(SensitiveString),
          status: S.optional(S.String),
          projectResourceTags: S.optional(__S(6593, __c206, 1)),
          allowCustomProjectResourceTags: S.optional(S.Boolean),
          projectResourceTagsDescription: S.optional(SensitiveString),
          environmentConfigurations: S.optional(__S(6599, __c206, 7)),
          createdBy: S.String,
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          domainUnitId: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateProjectProfileOutput" });
  }
}
function __c207(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          name: SensitiveString,
          target: __S(6657, __c208, 1),
          action: S.String,
          scope: __S(6660, __c208, 4),
          detail: __S(6692, __c209, 4),
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
          target: __S(6657, __c208, 1),
          action: S.String,
          scope: __S(6660, __c208, 4),
          detail: __S(6692, __c209, 4),
          targetType: S.optional(S.String),
          description: S.optional(SensitiveString),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          createdBy: S.String,
        }),
      ).annotate({ identifier: "CreateRuleOutput" });
  }
}
function __c208(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ domainUnitId: S.String, includeChildDomainUnits: S.optional(S.Boolean) }),
      ).annotate({ identifier: "DomainUnitTarget" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ domainUnitTarget: __S(6656, __c208, 0) })]);
    case 2:
      return S.suspend(() =>
        S.Struct({ selectionMode: S.String, specificAssetTypes: S.optional(__S(32, __c1, 0)) }),
      ).annotate({ identifier: "AssetTypesForRule" });
    case 3:
      return S.suspend(() =>
        S.Struct({ selectionMode: S.String, specificProjects: S.optional(__S(32, __c1, 0)) }),
      ).annotate({ identifier: "ProjectsForRule" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          assetType: S.optional(__S(6658, __c208, 2)),
          dataProduct: S.optional(S.Boolean),
          project: S.optional(__S(6659, __c208, 3)),
        }),
      ).annotate({ identifier: "RuleScope" });
  }
}
function __c209(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ typeIdentifier: S.String, typeRevision: S.String }),
      ).annotate({ identifier: "MetadataFormReference" });
    case 1:
      return S.Array(__S(6688, __c209, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ requiredMetadataForms: S.optional(__S(6689, __c209, 1)) }),
      ).annotate({ identifier: "MetadataFormEnforcementDetail" });
    case 3:
      return S.suspend(() =>
        S.Struct({ requiredGlossaryTermIds: S.optional(__S(32, __c1, 0)) }),
      ).annotate({ identifier: "GlossaryTermEnforcementDetail" });
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ metadataFormEnforcementDetail: __S(6690, __c209, 2) }),
        /*@__PURE__*/ S.Struct({ glossaryTermEnforcementDetail: __S(6691, __c209, 3) }),
      ]);
  }
}
function __c210(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ identifier: S.String, revision: S.String })).annotate({
        identifier: "ListingRevisionInput",
      });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ listing: __S(6720, __c210, 0) })]);
    case 2:
      return S.suspend(() => S.Struct({ assetId: S.String, targetName: S.String })).annotate({
        identifier: "AssetTargetNameMap",
      });
    case 3:
      return S.Array(__S(6722, __c210, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          environmentIdentifier: S.String,
          subscriptionTargetIdentifier: S.optional(S.String),
          grantedEntity: __S(6721, __c210, 1),
          assetTargetNames: S.optional(__S(6723, __c210, 3)),
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
function __c211(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ id: S.String, revision: S.String })).annotate({
        identifier: "ListingRevision",
      });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ listing: __S(6752, __c211, 0) })]);
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
          failureCause: S.optional(__S(6754, __c211, 2)),
          grantedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          failureTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          assetScope: S.optional(__S(129, __c4, 1)),
          permissions: S.optional(__S(128, __c4, 0)),
        }),
      ).annotate({ identifier: "SubscribedAsset" });
    case 4:
      return S.Array(__S(6755, __c211, 3));
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
          grantedEntity: __S(6753, __c211, 1),
          status: S.String,
          assets: S.optional(__S(6756, __c211, 4)),
          subscriptionId: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateSubscriptionGrantOutput" });
  }
}
function __c212(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ identifier: S.optional(S.String) })).annotate({
        identifier: "SubscribedProjectInput",
      });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ project: __S(6784, __c212, 0) }),
        /*@__PURE__*/ S.Struct({ user: __S(6784, __c212, 0) }),
        /*@__PURE__*/ S.Struct({ group: __S(6784, __c212, 0) }),
        /*@__PURE__*/ S.Struct({ iam: __S(6784, __c212, 0) }),
      ]);
    case 2:
      return S.Array(__S(6785, __c212, 1));
    case 3:
      return S.suspend(() => S.Struct({ identifier: S.String })).annotate({
        identifier: "SubscribedListingInput",
      });
    case 4:
      return S.Array(__S(6787, __c212, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          subscribedPrincipals: __S(6786, __c212, 2),
          subscribedListings: __S(6788, __c212, 4),
          requestReason: SensitiveString,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          metadataForms: S.optional(__S(2785, __c87, 1)),
          assetPermissions: S.optional(__S(259, __c8, 3)),
          assetScopes: S.optional(__S(257, __c8, 1)),
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
function __c213(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          environmentIdentifier: S.String.pipe(T.HttpLabel("environmentIdentifier")),
          name: SensitiveString,
          type: S.String,
          subscriptionTargetConfig: __S(6849, __c214, 1),
          authorizedPrincipals: __S(32, __c1, 0),
          manageAccessRole: S.String,
          applicableAssetTypes: __S(32, __c1, 0),
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
function __c214(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ formName: S.String, content: S.String })).annotate({
        identifier: "SubscriptionTargetForm",
      });
    case 1:
      return S.Array(__S(6848, __c214, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          authorizedPrincipals: __S(32, __c1, 0),
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
          applicableAssetTypes: __S(32, __c1, 0),
          subscriptionTargetConfig: __S(6849, __c214, 1),
          provider: S.String,
          subscriptionGrantCreationMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateSubscriptionTargetOutput" });
  }
}
function __c215(j: number): any {
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
function __c216(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.optional(S.String),
          id: S.optional(S.String),
          type: S.optional(S.String),
          status: S.optional(S.String),
          details: S.optional(__S(226, __c7, 2)),
        }),
      ).annotate({ identifier: "CreateUserProfileOutput" });
  }
}
function __c217(j: number): any {
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
function __c218(j: number): any {
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
function __c219(j: number): any {
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
function __c220(j: number): any {
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
function __c221(j: number): any {
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
function __c222(j: number): any {
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
function __c224(j: number): any {
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
          configuration: S.optional(__S(5227, __c163, 11)),
          enableSetting: S.optional(S.String),
          publishOnImport: S.optional(S.Boolean),
          assetFormsOutput: S.optional(__S(65, __c2, 1)),
          schedule: S.optional(__S(5184, __c162, 0)),
          lastRunStatus: S.optional(S.String),
          lastRunAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastRunErrorMessage: S.optional(__S(5248, __c164, 0)),
          errorMessage: S.optional(__S(5248, __c164, 0)),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          selfGrantStatus: S.optional(__S(7203, __c225, 3)),
          retainPermissionsOnRevokeFailure: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DeleteDataSourceOutput" });
  }
}
function __c225(j: number): any {
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
      return S.Array(__S(7200, __c225, 0));
    case 2:
      return S.suspend(() => S.Struct({ selfGrantStatusDetails: __S(7201, __c225, 1) })).annotate({
        identifier: "GlueSelfGrantStatusOutput",
      });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ glueSelfGrantStatus: __S(7202, __c225, 2) }),
        /*@__PURE__*/ S.Struct({ redshiftSelfGrantStatus: __S(7202, __c225, 2) }),
      ]);
  }
}
function __c226(j: number): any {
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
              uri: "/v2/domains/{domainIdentifier}/designations/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDesignationInput" });
  }
}
function __c227(j: number): any {
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
function __c228(j: number): any {
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
function __c230(j: number): any {
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
function __c231(j: number): any {
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
function __c232(j: number): any {
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
function __c233(j: number): any {
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
function __c234(j: number): any {
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
function __c235(j: number): any {
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
function __c236(j: number): any {
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
function __c237(j: number): any {
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
function __c238(j: number): any {
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
function __c239(j: number): any {
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
function __c240(j: number): any {
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
function __c241(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          projectIdentifier: S.String.pipe(T.HttpLabel("projectIdentifier")),
          member: __S(6496, __c203, 0),
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
function __c242(j: number): any {
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
function __c243(j: number): any {
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
function __c244(j: number): any {
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
function __c245(j: number): any {
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
function __c246(j: number): any {
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
function __c247(j: number): any {
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
function __c248(j: number): any {
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
function __c249(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          entityIdentifier: S.String.pipe(T.HttpLabel("entityIdentifier")),
          entityType: S.String.pipe(T.HttpLabel("entityType")),
          governedGlossaryTerms: __S(32, __c1, 0),
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
function __c251(j: number): any {
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
          glossaryTerms: S.optional(__S(32, __c1, 0)),
          governedGlossaryTerms: S.optional(__S(32, __c1, 0)),
          owningProjectId: S.String,
          domainId: S.String,
          listing: S.optional(__S(4480, __c140, 0)),
          formsOutput: __S(65, __c2, 1),
          readOnlyFormsOutput: S.optional(__S(65, __c2, 1)),
          latestTimeSeriesDataPointFormsOutput: S.optional(__S(4513, __c141, 1)),
        }),
      ).annotate({ identifier: "GetAssetOutput" });
  }
}
function __c252(j: number): any {
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
function __c253(j: number): any {
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
function __c254(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          name: S.String,
          revision: S.String,
          description: S.optional(SensitiveString),
          formsOutput: __S(4801, __c150, 1),
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
function __c255(j: number): any {
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
          connectionCredentials: S.optional(__S(8192, __c256, 0)),
          configurations: S.optional(__S(4962, __c155, 2)),
          connectionId: S.String,
          description: S.optional(SensitiveString),
          domainId: S.String,
          domainUnitId: S.String,
          environmentId: S.optional(S.String),
          environmentUserRole: S.optional(S.String),
          name: S.String,
          physicalEndpoints: __S(4983, __c155, 23),
          projectId: S.optional(S.String),
          props: S.optional(__S(4996, __c156, 4)),
          type: S.String,
          scope: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetConnectionOutput" });
  }
}
function __c256(j: number): any {
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
function __c257(j: number): any {
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
          encryptionConfiguration: S.optional(__S(8256, __c258, 0)),
          s3TableBucketArn: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetDataExportConfigurationOutput" });
  }
}
function __c258(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ kmsKeyArn: S.optional(S.String), sseAlgorithm: S.optional(S.String) }),
      ).annotate({ identifier: "EncryptionConfiguration" });
  }
}
function __c259(j: number): any {
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
function __c260(j: number): any {
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
          configuration: S.optional(__S(5227, __c163, 11)),
          recommendation: S.optional(__S(5280, __c165, 0)),
          enableSetting: S.optional(S.String),
          publishOnImport: S.optional(S.Boolean),
          assetFormsOutput: S.optional(__S(65, __c2, 1)),
          schedule: S.optional(__S(5184, __c162, 0)),
          lastRunStatus: S.optional(S.String),
          lastRunAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastRunErrorMessage: S.optional(__S(5248, __c164, 0)),
          lastRunAssetCount: S.optional(S.Number),
          errorMessage: S.optional(__S(5248, __c164, 0)),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          selfGrantStatus: S.optional(__S(7203, __c225, 3)),
        }),
      ).annotate({ identifier: "GetDataSourceOutput" });
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
          runStatisticsForAssets: S.optional(__S(8416, __c263, 0)),
          lineageSummary: S.optional(__S(8384, __c262, 0)),
          errorMessage: S.optional(__S(5248, __c164, 0)),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          startedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          stoppedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "GetDataSourceRunOutput" });
  }
}
function __c262(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ importStatus: S.optional(S.String) })).annotate({
        identifier: "DataSourceRunLineageSummary",
      });
  }
}
function __c263(j: number): any {
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
function __c264(j: number): any {
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
      return S.Array(__S(8448, __c264, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          domainIdentifier: S.String.pipe(T.HttpLabel("domainIdentifier")),
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          revision: S.optional(S.String).pipe(T.HttpQuery("revision")),
          acceptRule: S.optional(__S(8512, __c266, 0)),
          acceptChoices: S.optional(__S(8449, __c264, 1)),
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
function __c265(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ regionName: S.String }),
        /*@__PURE__*/ S.Struct({ regionNamePath: S.String }),
      ]);
  }
}
function __c266(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ rule: S.optional(S.String), threshold: S.optional(S.Number) }),
      ).annotate({ identifier: "AcceptRule" });
  }
}
function __c267(j: number): any {
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
              uri: "/v2/domains/{domainIdentifier}/designations/{identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDesignationInput" });
  }
}
function __c268(j: number): any {
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
      return S.Array(__S(8577, __c268, 1));
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
          singleSignOn: S.optional(__S(5408, __c169, 0)),
          domainExecutionRole: S.String,
          arn: S.optional(S.String),
          kmsKeyIdentifier: S.optional(S.String),
          status: S.String,
          portalUrl: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          tags: S.optional(__S(4928, __c154, 0)),
          domainVersion: S.optional(S.String),
          serviceRole: S.optional(S.String),
          failureReasons: S.optional(__S(8578, __c268, 2)),
          deleteProgress: S.optional(__S(8579, __c268, 3)),
        }),
      ).annotate({ identifier: "GetDomainOutput" });
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
          owners: __S(5475, __c171, 3),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          lastUpdatedBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetDomainUnitOutput" });
  }
}
function __c270(j: number): any {
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
function __c271(j: number): any {
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
function __c272(j: number): any {
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
function __c273(j: number): any {
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
function __c274(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ __S(4928, __c154, 0).pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          identifier: S.String,
          name: S.String,
          description: S.optional(S.String),
          region: S.String,
          parameters: __S(4928, __c154, 0),
        }),
      ).annotate({ identifier: "ResourceConfiguration" });
    case 2:
      return S.Array(__S(8769, __c274, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          locationRegistrationRole: S.optional(S.String),
          locationRegistrationExcludeS3Locations: S.optional(__S(32, __c1, 0)),
        }),
      ).annotate({ identifier: "LakeFormationConfiguration" });
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ lakeFormationConfiguration: __S(8771, __c274, 3) }),
      ]);
    case 5:
      return S.Array(__S(8772, __c274, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          environmentBlueprintId: S.String,
          provisioningRoleArn: S.optional(S.String),
          environmentRolePermissionBoundary: S.optional(S.String),
          manageAccessRoleArn: S.optional(S.String),
          enabledRegions: S.optional(__S(32, __c1, 0)),
          regionalParameters: S.optional(__S(8768, __c274, 0)),
          allowUserProvidedConfigurations: S.optional(S.Boolean),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          resourceConfigurations: S.optional(__S(8770, __c274, 2)),
          provisioningConfigurations: S.optional(__S(8773, __c274, 5)),
        }),
      ).annotate({ identifier: "GetEnvironmentBlueprintConfigurationOutput" });
  }
}
function __c275(j: number): any {
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
function __c276(j: number): any {
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
function __c277(j: number): any {
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
          model: __S(5952, __c186, 0),
          owningProjectId: S.optional(S.String),
          originDomainId: S.optional(S.String),
          originProjectId: S.optional(S.String),
          status: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBy: S.optional(S.String),
          description: S.optional(SensitiveString),
          imports: S.optional(__S(8897, __c278, 1)),
        }),
      ).annotate({ identifier: "GetFormTypeOutput" });
  }
}
function __c278(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: SensitiveString, revision: S.String })).annotate({
        identifier: "Import",
      });
    case 1:
      return S.Array(__S(8896, __c278, 0));
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
