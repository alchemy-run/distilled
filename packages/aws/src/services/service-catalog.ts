import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Service Catalog",
  serviceShapeName: "AWS242ServiceCatalogService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "servicecatalog" });
const ver = /*@__PURE__*/ T.ServiceVersion("2015-12-10");
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
              `https://servicecatalog-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://servicecatalog-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://servicecatalog.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://servicecatalog.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://servicecatalog.{R}.{D}","properties":{},"headers":{}}');

export class DuplicateResourceException
  extends /*@__PURE__*/ S.TaggedError<DuplicateResourceException>()("DuplicateResourceException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidParametersException
  extends /*@__PURE__*/ S.TaggedError<InvalidParametersException>()("InvalidParametersException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidStateException
  extends /*@__PURE__*/ S.TaggedError<InvalidStateException>()("InvalidStateException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()("LimitExceededException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class OperationNotSupportedException
  extends /*@__PURE__*/ S.TaggedError<OperationNotSupportedException>()(
    "OperationNotSupportedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ProvisionedProductNotFound
  extends /*@__PURE__*/ S.TaggedError<ProvisionedProductNotFound>()(
    "ProvisionedProductNotFound",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "ValidationException",
      message: { includes: "Provisioned product not found" },
    }),
  ) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()("ResourceInUseException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()("ResourceNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class TagOptionNotMigratedException
  extends /*@__PURE__*/ S.TaggedError<TagOptionNotMigratedException>()(
    "TagOptionNotMigratedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export type AcceptLanguage = string;
export type Id = string;
export type PortfolioShareType =
  | "IMPORTED"
  | "AWS_SERVICECATALOG"
  | "AWS_ORGANIZATIONS"
  | (string & {});
export interface AcceptPortfolioShareInput {
  AcceptLanguage?: string;
  PortfolioId: string;
  PortfolioShareType?: PortfolioShareType;
}
export interface AcceptPortfolioShareOutput {}
export type BudgetName = string;
export interface AssociateBudgetWithResourceInput {
  BudgetName: string;
  ResourceId: string;
}
export interface AssociateBudgetWithResourceOutput {}
export type PrincipalARN = string;
export type PrincipalType = "IAM" | "IAM_PATTERN" | (string & {});
export interface AssociatePrincipalWithPortfolioInput {
  AcceptLanguage?: string;
  PortfolioId: string;
  PrincipalARN: string;
  PrincipalType: PrincipalType;
}
export interface AssociatePrincipalWithPortfolioOutput {}
export interface AssociateProductWithPortfolioInput {
  AcceptLanguage?: string;
  ProductId: string;
  PortfolioId: string;
  SourcePortfolioId?: string;
}
export interface AssociateProductWithPortfolioOutput {}
export type IdempotencyToken = string;
export interface AssociateServiceActionWithProvisioningArtifactInput {
  ProductId: string;
  ProvisioningArtifactId: string;
  ServiceActionId: string;
  AcceptLanguage?: string;
  IdempotencyToken?: string;
}
export interface AssociateServiceActionWithProvisioningArtifactOutput {}
export type ResourceId = string;
export type TagOptionId = string;
export interface AssociateTagOptionWithResourceInput {
  ResourceId: string;
  TagOptionId: string;
}
export interface AssociateTagOptionWithResourceOutput {}
export interface ServiceActionAssociation {
  ServiceActionId: string;
  ProductId: string;
  ProvisioningArtifactId: string;
}
export type ServiceActionAssociations = ServiceActionAssociation[];
export interface BatchAssociateServiceActionWithProvisioningArtifactInput {
  ServiceActionAssociations: ServiceActionAssociation[];
  AcceptLanguage?: string;
}
export type ServiceActionAssociationErrorCode =
  | "DUPLICATE_RESOURCE"
  | "INTERNAL_FAILURE"
  | "LIMIT_EXCEEDED"
  | "RESOURCE_NOT_FOUND"
  | "THROTTLING"
  | "INVALID_PARAMETER"
  | (string & {});
export type ServiceActionAssociationErrorMessage = string;
export interface FailedServiceActionAssociation {
  ServiceActionId?: string;
  ProductId?: string;
  ProvisioningArtifactId?: string;
  ErrorCode?: ServiceActionAssociationErrorCode;
  ErrorMessage?: string;
}
export type FailedServiceActionAssociations = FailedServiceActionAssociation[];
export interface BatchAssociateServiceActionWithProvisioningArtifactOutput {
  FailedServiceActionAssociations?: FailedServiceActionAssociation[];
}
export interface BatchDisassociateServiceActionFromProvisioningArtifactInput {
  ServiceActionAssociations: ServiceActionAssociation[];
  AcceptLanguage?: string;
}
export interface BatchDisassociateServiceActionFromProvisioningArtifactOutput {
  FailedServiceActionAssociations?: FailedServiceActionAssociation[];
}
export type ProductArn = string;
export type ProductViewName = string;
export type ProvisioningArtifactPropertyName = "Id" | (string & {});
export type ProvisioningArtifactPropertyValue = string;
export type SourceProvisioningArtifactPropertiesMap = {
  [key in ProvisioningArtifactPropertyName]?: string;
};
export type SourceProvisioningArtifactProperties = { [key: string]: string | undefined }[];
export type CopyOption = "CopyTags" | (string & {});
export type CopyOptions = CopyOption[];
export interface CopyProductInput {
  AcceptLanguage?: string;
  SourceProductArn: string;
  TargetProductId?: string;
  TargetProductName?: string;
  SourceProvisioningArtifactIdentifiers?: { [key: string]: string | undefined }[];
  CopyOptions?: CopyOption[];
  IdempotencyToken: string;
}
export interface CopyProductOutput {
  CopyProductToken?: string;
}
export type ConstraintParameters = string;
export type ConstraintType = string;
export type ConstraintDescription = string;
export interface CreateConstraintInput {
  AcceptLanguage?: string;
  PortfolioId: string;
  ProductId: string;
  Parameters: string;
  Type: string;
  Description?: string;
  IdempotencyToken: string;
}
export type AccountId = string;
export interface ConstraintDetail {
  ConstraintId?: string;
  Type?: string;
  Description?: string;
  Owner?: string;
  ProductId?: string;
  PortfolioId?: string;
}
export type Status = "AVAILABLE" | "CREATING" | "FAILED" | (string & {});
export interface CreateConstraintOutput {
  ConstraintDetail?: ConstraintDetail;
  ConstraintParameters?: string;
  Status?: Status;
}
export type PortfolioDisplayName = string;
export type PortfolioDescription = string;
export type ProviderName = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type AddTags = Tag[];
export interface CreatePortfolioInput {
  AcceptLanguage?: string;
  DisplayName: string;
  Description?: string;
  ProviderName: string;
  Tags?: Tag[];
  IdempotencyToken: string;
}
export type ResourceARN = string;
export type CreationTime = Date;
export interface PortfolioDetail {
  Id?: string;
  ARN?: string;
  DisplayName?: string;
  Description?: string;
  CreatedTime?: Date;
  ProviderName?: string;
}
export type Tags = Tag[];
export interface CreatePortfolioOutput {
  PortfolioDetail?: PortfolioDetail;
  Tags?: Tag[];
}
export type OrganizationNodeType =
  | "ORGANIZATION"
  | "ORGANIZATIONAL_UNIT"
  | "ACCOUNT"
  | (string & {});
export type OrganizationNodeValue = string;
export interface OrganizationNode {
  Type?: OrganizationNodeType;
  Value?: string;
}
export interface CreatePortfolioShareInput {
  AcceptLanguage?: string;
  PortfolioId: string;
  AccountId?: string;
  OrganizationNode?: OrganizationNode;
  ShareTagOptions?: boolean;
  SharePrincipals?: boolean;
}
export interface CreatePortfolioShareOutput {
  PortfolioShareToken?: string;
}
export type ProductViewOwner = string;
export type ProductViewShortDescription = string;
export type SupportDescription = string;
export type SupportEmail = string;
export type SupportUrl = string;
export type ProductType =
  | "CLOUD_FORMATION_TEMPLATE"
  | "MARKETPLACE"
  | "TERRAFORM_OPEN_SOURCE"
  | "TERRAFORM_CLOUD"
  | "EXTERNAL"
  | (string & {});
export type ProvisioningArtifactName = string;
export type ProvisioningArtifactDescription = string;
export type ProvisioningArtifactInfoKey = string;
export type ProvisioningArtifactInfoValue = string;
export type ProvisioningArtifactInfo = { [key: string]: string | undefined };
export type ProvisioningArtifactType =
  | "CLOUD_FORMATION_TEMPLATE"
  | "MARKETPLACE_AMI"
  | "MARKETPLACE_CAR"
  | "TERRAFORM_OPEN_SOURCE"
  | "TERRAFORM_CLOUD"
  | "EXTERNAL"
  | (string & {});
export type DisableTemplateValidation = boolean;
export interface ProvisioningArtifactProperties {
  Name?: string;
  Description?: string;
  Info?: { [key: string]: string | undefined };
  Type?: ProvisioningArtifactType;
  DisableTemplateValidation?: boolean;
}
export type SourceType = "CODESTAR" | (string & {});
export type CodeStarConnectionArn = string;
export type Repository = string;
export type RepositoryBranch = string;
export type RepositoryArtifactPath = string;
export interface CodeStarParameters {
  ConnectionArn: string;
  Repository: string;
  Branch: string;
  ArtifactPath: string;
}
export interface SourceConnectionParameters {
  CodeStar?: CodeStarParameters;
}
export interface SourceConnection {
  Type?: SourceType;
  ConnectionParameters: SourceConnectionParameters;
}
export interface CreateProductInput {
  AcceptLanguage?: string;
  Name: string;
  Owner: string;
  Description?: string;
  Distributor?: string;
  SupportDescription?: string;
  SupportEmail?: string;
  SupportUrl?: string;
  ProductType: ProductType;
  Tags?: Tag[];
  ProvisioningArtifactParameters?: ProvisioningArtifactProperties;
  IdempotencyToken: string;
  SourceConnection?: SourceConnection;
}
export type ProductViewDistributor = string;
export type HasDefaultPath = boolean;
export interface ProductViewSummary {
  Id?: string;
  ProductId?: string;
  Name?: string;
  Owner?: string;
  ShortDescription?: string;
  Type?: ProductType;
  Distributor?: string;
  HasDefaultPath?: boolean;
  SupportEmail?: string;
  SupportDescription?: string;
  SupportUrl?: string;
}
export type CreatedTime = Date;
export type LastSyncTime = Date;
export type LastSyncStatus = "SUCCEEDED" | "FAILED" | (string & {});
export type LastSyncStatusMessage = string;
export type LastSuccessfulSyncTime = Date;
export interface LastSync {
  LastSyncTime?: Date;
  LastSyncStatus?: LastSyncStatus;
  LastSyncStatusMessage?: string;
  LastSuccessfulSyncTime?: Date;
  LastSuccessfulSyncProvisioningArtifactId?: string;
}
export interface SourceConnectionDetail {
  Type?: SourceType;
  ConnectionParameters?: SourceConnectionParameters;
  LastSync?: LastSync;
}
export interface ProductViewDetail {
  ProductViewSummary?: ProductViewSummary;
  Status?: Status;
  ProductARN?: string;
  CreatedTime?: Date;
  SourceConnection?: SourceConnectionDetail;
}
export type ProvisioningArtifactActive = boolean;
export type ProvisioningArtifactGuidance = "DEFAULT" | "DEPRECATED" | (string & {});
export type SourceRevision = string;
export interface ProvisioningArtifactDetail {
  Id?: string;
  Name?: string;
  Description?: string;
  Type?: ProvisioningArtifactType;
  CreatedTime?: Date;
  Active?: boolean;
  Guidance?: ProvisioningArtifactGuidance;
  SourceRevision?: string;
}
export interface CreateProductOutput {
  ProductViewDetail?: ProductViewDetail;
  ProvisioningArtifactDetail?: ProvisioningArtifactDetail;
  Tags?: Tag[];
}
export type ProvisionedProductPlanName = string;
export type ProvisionedProductPlanType = "CLOUDFORMATION" | (string & {});
export type NotificationArn = string;
export type NotificationArns = string[];
export type ProvisionedProductName = string;
export type ParameterKey = string;
export type ParameterValue = string;
export type UsePreviousValue = boolean;
export interface UpdateProvisioningParameter {
  Key?: string;
  Value?: string;
  UsePreviousValue?: boolean;
}
export type UpdateProvisioningParameters = UpdateProvisioningParameter[];
export interface CreateProvisionedProductPlanInput {
  AcceptLanguage?: string;
  PlanName: string;
  PlanType: ProvisionedProductPlanType;
  NotificationArns?: string[];
  PathId?: string;
  ProductId: string;
  ProvisionedProductName: string;
  ProvisioningArtifactId: string;
  ProvisioningParameters?: UpdateProvisioningParameter[];
  IdempotencyToken: string;
  Tags?: Tag[];
}
export interface CreateProvisionedProductPlanOutput {
  PlanName?: string;
  PlanId?: string;
  ProvisionProductId?: string;
  ProvisionedProductName?: string;
  ProvisioningArtifactId?: string;
}
export interface CreateProvisioningArtifactInput {
  AcceptLanguage?: string;
  ProductId: string;
  Parameters: ProvisioningArtifactProperties;
  IdempotencyToken: string;
}
export interface CreateProvisioningArtifactOutput {
  ProvisioningArtifactDetail?: ProvisioningArtifactDetail;
  Info?: { [key: string]: string | undefined };
  Status?: Status;
}
export type ServiceActionName = string;
export type ServiceActionDefinitionType = "SSM_AUTOMATION" | (string & {});
export type ServiceActionDefinitionKey =
  | "Name"
  | "Version"
  | "AssumeRole"
  | "Parameters"
  | (string & {});
export type ServiceActionDefinitionValue = string;
export type ServiceActionDefinitionMap = { [key in ServiceActionDefinitionKey]?: string };
export type ServiceActionDescription = string;
export interface CreateServiceActionInput {
  Name: string;
  DefinitionType: ServiceActionDefinitionType;
  Definition: { [key: string]: string | undefined };
  Description?: string;
  AcceptLanguage?: string;
  IdempotencyToken: string;
}
export interface ServiceActionSummary {
  Id?: string;
  Name?: string;
  Description?: string;
  DefinitionType?: ServiceActionDefinitionType;
}
export interface ServiceActionDetail {
  ServiceActionSummary?: ServiceActionSummary;
  Definition?: { [key: string]: string | undefined };
}
export interface CreateServiceActionOutput {
  ServiceActionDetail?: ServiceActionDetail;
}
export type TagOptionKey = string;
export type TagOptionValue = string;
export interface CreateTagOptionInput {
  Key: string;
  Value: string;
}
export type TagOptionActive = boolean;
export type Owner = string;
export interface TagOptionDetail {
  Key?: string;
  Value?: string;
  Active?: boolean;
  Id?: string;
  Owner?: string;
}
export interface CreateTagOptionOutput {
  TagOptionDetail?: TagOptionDetail;
}
export interface DeleteConstraintInput {
  AcceptLanguage?: string;
  Id: string;
}
export interface DeleteConstraintOutput {}
export interface DeletePortfolioInput {
  AcceptLanguage?: string;
  Id: string;
}
export interface DeletePortfolioOutput {}
export interface DeletePortfolioShareInput {
  AcceptLanguage?: string;
  PortfolioId: string;
  AccountId?: string;
  OrganizationNode?: OrganizationNode;
}
export interface DeletePortfolioShareOutput {
  PortfolioShareToken?: string;
}
export interface DeleteProductInput {
  AcceptLanguage?: string;
  Id: string;
}
export interface DeleteProductOutput {}
export type IgnoreErrors = boolean;
export interface DeleteProvisionedProductPlanInput {
  AcceptLanguage?: string;
  PlanId: string;
  IgnoreErrors?: boolean;
}
export interface DeleteProvisionedProductPlanOutput {}
export interface DeleteProvisioningArtifactInput {
  AcceptLanguage?: string;
  ProductId: string;
  ProvisioningArtifactId: string;
}
export interface DeleteProvisioningArtifactOutput {}
export interface DeleteServiceActionInput {
  Id: string;
  AcceptLanguage?: string;
  IdempotencyToken?: string;
}
export interface DeleteServiceActionOutput {}
export interface DeleteTagOptionInput {
  Id: string;
}
export interface DeleteTagOptionOutput {}
export interface DescribeConstraintInput {
  AcceptLanguage?: string;
  Id: string;
}
export interface DescribeConstraintOutput {
  ConstraintDetail?: ConstraintDetail;
  ConstraintParameters?: string;
  Status?: Status;
}
export interface DescribeCopyProductStatusInput {
  AcceptLanguage?: string;
  CopyProductToken: string;
}
export type CopyProductStatus = "SUCCEEDED" | "IN_PROGRESS" | "FAILED" | (string & {});
export type StatusDetail = string;
export interface DescribeCopyProductStatusOutput {
  CopyProductStatus?: CopyProductStatus;
  TargetProductId?: string;
  StatusDetail?: string;
}
export interface DescribePortfolioInput {
  AcceptLanguage?: string;
  Id: string;
}
export type TagOptionDetails = TagOptionDetail[];
export interface BudgetDetail {
  BudgetName?: string;
}
export type Budgets = BudgetDetail[];
export interface DescribePortfolioOutput {
  PortfolioDetail?: PortfolioDetail;
  Tags?: Tag[];
  TagOptions?: TagOptionDetail[];
  Budgets?: BudgetDetail[];
}
export type DescribePortfolioShareType =
  | "ACCOUNT"
  | "ORGANIZATION"
  | "ORGANIZATIONAL_UNIT"
  | "ORGANIZATION_MEMBER_ACCOUNT"
  | (string & {});
export type PageToken = string;
export type PageSizeMax100 = number;
export interface DescribePortfolioSharesInput {
  PortfolioId: string;
  Type: DescribePortfolioShareType;
  PageToken?: string;
  PageSize?: number;
}
export interface PortfolioShareDetail {
  PrincipalId?: string;
  Type?: DescribePortfolioShareType;
  Accepted?: boolean;
  ShareTagOptions?: boolean;
  SharePrincipals?: boolean;
}
export type PortfolioShareDetails = PortfolioShareDetail[];
export interface DescribePortfolioSharesOutput {
  NextPageToken?: string;
  PortfolioShareDetails?: PortfolioShareDetail[];
}
export interface DescribePortfolioShareStatusInput {
  PortfolioShareToken: string;
}
export type ShareStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "COMPLETED_WITH_ERRORS"
  | "ERROR"
  | (string & {});
export type SuccessfulShares = string[];
export type Namespaces = string[];
export type Message = string;
export interface ShareError {
  Accounts?: string[];
  Message?: string;
  Error?: string;
}
export type ShareErrors = ShareError[];
export interface ShareDetails {
  SuccessfulShares?: string[];
  ShareErrors?: ShareError[];
}
export interface DescribePortfolioShareStatusOutput {
  PortfolioShareToken?: string;
  PortfolioId?: string;
  OrganizationNodeValue?: string;
  Status?: ShareStatus;
  ShareDetails?: ShareDetails;
}
export interface DescribeProductInput {
  AcceptLanguage?: string;
  Id?: string;
  Name?: string;
}
export type ProvisioningArtifactCreatedTime = Date;
export interface ProvisioningArtifact {
  Id?: string;
  Name?: string;
  Description?: string;
  CreatedTime?: Date;
  Guidance?: ProvisioningArtifactGuidance;
}
export type ProvisioningArtifacts = ProvisioningArtifact[];
export type PortfolioName = string;
export interface LaunchPath {
  Id?: string;
  Name?: string;
}
export type LaunchPaths = LaunchPath[];
export interface DescribeProductOutput {
  ProductViewSummary?: ProductViewSummary;
  ProvisioningArtifacts?: ProvisioningArtifact[];
  Budgets?: BudgetDetail[];
  LaunchPaths?: LaunchPath[];
}
export interface DescribeProductAsAdminInput {
  AcceptLanguage?: string;
  Id?: string;
  Name?: string;
  SourcePortfolioId?: string;
}
export interface ProvisioningArtifactSummary {
  Id?: string;
  Name?: string;
  Description?: string;
  CreatedTime?: Date;
  ProvisioningArtifactMetadata?: { [key: string]: string | undefined };
}
export type ProvisioningArtifactSummaries = ProvisioningArtifactSummary[];
export interface DescribeProductAsAdminOutput {
  ProductViewDetail?: ProductViewDetail;
  ProvisioningArtifactSummaries?: ProvisioningArtifactSummary[];
  Tags?: Tag[];
  TagOptions?: TagOptionDetail[];
  Budgets?: BudgetDetail[];
}
export interface DescribeProductViewInput {
  AcceptLanguage?: string;
  Id: string;
}
export interface DescribeProductViewOutput {
  ProductViewSummary?: ProductViewSummary;
  ProvisioningArtifacts?: ProvisioningArtifact[];
}
export interface DescribeProvisionedProductInput {
  AcceptLanguage?: string;
  Id?: string;
  Name?: string;
}
export type ProvisionedProductNameOrArn = string;
export type ProvisionedProductType = string;
export type ProvisionedProductId = string;
export type ProvisionedProductStatus =
  | "AVAILABLE"
  | "UNDER_CHANGE"
  | "TAINTED"
  | "ERROR"
  | "PLAN_IN_PROGRESS"
  | (string & {});
export type ProvisionedProductStatusMessage = string;
export type LastRequestId = string;
export type RoleArn = string;
export interface ProvisionedProductDetail {
  Name?: string;
  Arn?: string;
  Type?: string;
  Id?: string;
  Status?: ProvisionedProductStatus;
  StatusMessage?: string;
  CreatedTime?: Date;
  IdempotencyToken?: string;
  LastRecordId?: string;
  LastProvisioningRecordId?: string;
  LastSuccessfulProvisioningRecordId?: string;
  ProductId?: string;
  ProvisioningArtifactId?: string;
  LaunchRoleArn?: string;
}
export type CloudWatchDashboardName = string;
export interface CloudWatchDashboard {
  Name?: string;
}
export type CloudWatchDashboards = CloudWatchDashboard[];
export interface DescribeProvisionedProductOutput {
  ProvisionedProductDetail?: ProvisionedProductDetail;
  CloudWatchDashboards?: CloudWatchDashboard[];
}
export type PageSize = number;
export interface DescribeProvisionedProductPlanInput {
  AcceptLanguage?: string;
  PlanId: string;
  PageSize?: number;
  PageToken?: string;
}
export type ProvisionedProductPlanStatus =
  | "CREATE_IN_PROGRESS"
  | "CREATE_SUCCESS"
  | "CREATE_FAILED"
  | "EXECUTE_IN_PROGRESS"
  | "EXECUTE_SUCCESS"
  | "EXECUTE_FAILED"
  | (string & {});
export type UpdatedTime = Date;
export type StatusMessage = string;
export interface ProvisionedProductPlanDetails {
  CreatedTime?: Date;
  PathId?: string;
  ProductId?: string;
  PlanName?: string;
  PlanId?: string;
  ProvisionProductId?: string;
  ProvisionProductName?: string;
  PlanType?: ProvisionedProductPlanType;
  ProvisioningArtifactId?: string;
  Status?: ProvisionedProductPlanStatus;
  UpdatedTime?: Date;
  NotificationArns?: string[];
  ProvisioningParameters?: UpdateProvisioningParameter[];
  Tags?: Tag[];
  StatusMessage?: string;
}
export type ChangeAction = "ADD" | "MODIFY" | "REMOVE" | (string & {});
export type LogicalResourceId = string;
export type PhysicalResourceId = string;
export type PlanResourceType = string;
export type Replacement = "TRUE" | "FALSE" | "CONDITIONAL" | (string & {});
export type ResourceAttribute =
  | "PROPERTIES"
  | "METADATA"
  | "CREATIONPOLICY"
  | "UPDATEPOLICY"
  | "DELETIONPOLICY"
  | "TAGS"
  | (string & {});
export type Scope = ResourceAttribute[];
export type PropertyName = string;
export type RequiresRecreation = "NEVER" | "CONDITIONALLY" | "ALWAYS" | (string & {});
export interface ResourceTargetDefinition {
  Attribute?: ResourceAttribute;
  Name?: string;
  RequiresRecreation?: RequiresRecreation;
}
export type EvaluationType = "STATIC" | "DYNAMIC" | (string & {});
export type CausingEntity = string;
export interface ResourceChangeDetail {
  Target?: ResourceTargetDefinition;
  Evaluation?: EvaluationType;
  CausingEntity?: string;
}
export type ResourceChangeDetails = ResourceChangeDetail[];
export interface ResourceChange {
  Action?: ChangeAction;
  LogicalResourceId?: string;
  PhysicalResourceId?: string;
  ResourceType?: string;
  Replacement?: Replacement;
  Scope?: ResourceAttribute[];
  Details?: ResourceChangeDetail[];
}
export type ResourceChanges = ResourceChange[];
export interface DescribeProvisionedProductPlanOutput {
  ProvisionedProductPlanDetails?: ProvisionedProductPlanDetails;
  ResourceChanges?: ResourceChange[];
  NextPageToken?: string;
}
export type Verbose = boolean;
export interface DescribeProvisioningArtifactInput {
  AcceptLanguage?: string;
  ProvisioningArtifactId?: string;
  ProductId?: string;
  ProvisioningArtifactName?: string;
  ProductName?: string;
  Verbose?: boolean;
  IncludeProvisioningArtifactParameters?: boolean;
}
export type DefaultValue = string;
export type ParameterType = string;
export type NoEcho = boolean;
export type Description = string;
export type AllowedValues = string[];
export interface ParameterConstraints {
  AllowedValues?: string[];
  AllowedPattern?: string;
  ConstraintDescription?: string;
  MaxLength?: string;
  MinLength?: string;
  MaxValue?: string;
  MinValue?: string;
}
export interface ProvisioningArtifactParameter {
  ParameterKey?: string;
  DefaultValue?: string;
  ParameterType?: string;
  IsNoEcho?: boolean;
  Description?: string;
  ParameterConstraints?: ParameterConstraints;
}
export type ProvisioningArtifactParameters = ProvisioningArtifactParameter[];
export interface DescribeProvisioningArtifactOutput {
  ProvisioningArtifactDetail?: ProvisioningArtifactDetail;
  Info?: { [key: string]: string | undefined };
  Status?: Status;
  ProvisioningArtifactParameters?: ProvisioningArtifactParameter[];
}
export interface DescribeProvisioningParametersInput {
  AcceptLanguage?: string;
  ProductId?: string;
  ProductName?: string;
  ProvisioningArtifactId?: string;
  ProvisioningArtifactName?: string;
  PathId?: string;
  PathName?: string;
}
export interface ConstraintSummary {
  Type?: string;
  Description?: string;
}
export type ConstraintSummaries = ConstraintSummary[];
export type InstructionType = string;
export type InstructionValue = string;
export interface UsageInstruction {
  Type?: string;
  Value?: string;
}
export type UsageInstructions = UsageInstruction[];
export type TagOptionValues = string[];
export interface TagOptionSummary {
  Key?: string;
  Values?: string[];
}
export type TagOptionSummaries = TagOptionSummary[];
export type StackSetAccounts = string[];
export type Region = string;
export type StackSetRegions = string[];
export interface ProvisioningArtifactPreferences {
  StackSetAccounts?: string[];
  StackSetRegions?: string[];
}
export type ProvisioningArtifactOutputKey = string;
export type OutputDescription = string;
export interface ProvisioningArtifactOutput {
  Key?: string;
  Description?: string;
}
export type ProvisioningArtifactOutputs = ProvisioningArtifactOutput[];
export interface DescribeProvisioningParametersOutput {
  ProvisioningArtifactParameters?: ProvisioningArtifactParameter[];
  ConstraintSummaries?: ConstraintSummary[];
  UsageInstructions?: UsageInstruction[];
  TagOptions?: TagOptionSummary[];
  ProvisioningArtifactPreferences?: ProvisioningArtifactPreferences;
  ProvisioningArtifactOutputs?: ProvisioningArtifactOutput[];
  ProvisioningArtifactOutputKeys?: ProvisioningArtifactOutput[];
}
export interface DescribeRecordInput {
  AcceptLanguage?: string;
  Id: string;
  PageToken?: string;
  PageSize?: number;
}
export type RecordStatus =
  | "CREATED"
  | "IN_PROGRESS"
  | "IN_PROGRESS_IN_ERROR"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export type RecordType = string;
export type ErrorCode = string;
export type ErrorDescription = string;
export interface RecordError {
  Code?: string;
  Description?: string;
}
export type RecordErrors = RecordError[];
export type RecordTagKey = string;
export type RecordTagValue = string;
export interface RecordTag {
  Key?: string;
  Value?: string;
}
export type RecordTags = RecordTag[];
export interface RecordDetail {
  RecordId?: string;
  ProvisionedProductName?: string;
  Status?: RecordStatus;
  CreatedTime?: Date;
  UpdatedTime?: Date;
  ProvisionedProductType?: string;
  RecordType?: string;
  ProvisionedProductId?: string;
  ProductId?: string;
  ProvisioningArtifactId?: string;
  PathId?: string;
  RecordErrors?: RecordError[];
  RecordTags?: RecordTag[];
  LaunchRoleArn?: string;
}
export type OutputKey = string;
export type OutputValue = string;
export interface RecordOutput {
  OutputKey?: string;
  OutputValue?: string;
  Description?: string;
}
export type RecordOutputs = RecordOutput[];
export interface DescribeRecordOutput {
  RecordDetail?: RecordDetail;
  RecordOutputs?: RecordOutput[];
  NextPageToken?: string;
}
export interface DescribeServiceActionInput {
  Id: string;
  AcceptLanguage?: string;
}
export interface DescribeServiceActionOutput {
  ServiceActionDetail?: ServiceActionDetail;
}
export interface DescribeServiceActionExecutionParametersInput {
  ProvisionedProductId: string;
  ServiceActionId: string;
  AcceptLanguage?: string;
}
export type ExecutionParameterKey = string;
export type ExecutionParameterType = string;
export type ExecutionParameterValue = string;
export type ExecutionParameterValueList = string[];
export interface ExecutionParameter {
  Name?: string;
  Type?: string;
  DefaultValues?: string[];
}
export type ExecutionParameters = ExecutionParameter[];
export interface DescribeServiceActionExecutionParametersOutput {
  ServiceActionParameters?: ExecutionParameter[];
}
export interface DescribeTagOptionInput {
  Id: string;
}
export interface DescribeTagOptionOutput {
  TagOptionDetail?: TagOptionDetail;
}
export interface DisableAWSOrganizationsAccessInput {}
export interface DisableAWSOrganizationsAccessOutput {}
export interface DisassociateBudgetFromResourceInput {
  BudgetName: string;
  ResourceId: string;
}
export interface DisassociateBudgetFromResourceOutput {}
export interface DisassociatePrincipalFromPortfolioInput {
  AcceptLanguage?: string;
  PortfolioId: string;
  PrincipalARN: string;
  PrincipalType?: PrincipalType;
}
export interface DisassociatePrincipalFromPortfolioOutput {}
export interface DisassociateProductFromPortfolioInput {
  AcceptLanguage?: string;
  ProductId: string;
  PortfolioId: string;
}
export interface DisassociateProductFromPortfolioOutput {}
export interface DisassociateServiceActionFromProvisioningArtifactInput {
  ProductId: string;
  ProvisioningArtifactId: string;
  ServiceActionId: string;
  AcceptLanguage?: string;
  IdempotencyToken?: string;
}
export interface DisassociateServiceActionFromProvisioningArtifactOutput {}
export interface DisassociateTagOptionFromResourceInput {
  ResourceId: string;
  TagOptionId: string;
}
export interface DisassociateTagOptionFromResourceOutput {}
export interface EnableAWSOrganizationsAccessInput {}
export interface EnableAWSOrganizationsAccessOutput {}
export interface ExecuteProvisionedProductPlanInput {
  AcceptLanguage?: string;
  PlanId: string;
  IdempotencyToken: string;
}
export interface ExecuteProvisionedProductPlanOutput {
  RecordDetail?: RecordDetail;
}
export type ExecutionParameterMap = { [key: string]: string[] | undefined };
export interface ExecuteProvisionedProductServiceActionInput {
  ProvisionedProductId: string;
  ServiceActionId: string;
  ExecuteToken: string;
  AcceptLanguage?: string;
  Parameters?: { [key: string]: string[] | undefined };
}
export interface ExecuteProvisionedProductServiceActionOutput {
  RecordDetail?: RecordDetail;
}
export interface GetAWSOrganizationsAccessStatusInput {}
export type AccessStatus = "ENABLED" | "UNDER_CHANGE" | "DISABLED" | (string & {});
export interface GetAWSOrganizationsAccessStatusOutput {
  AccessStatus?: AccessStatus;
}
export type OutputKeys = string[];
export interface GetProvisionedProductOutputsInput {
  AcceptLanguage?: string;
  ProvisionedProductId?: string;
  ProvisionedProductName?: string;
  OutputKeys?: string[];
  PageSize?: number;
  PageToken?: string;
}
export interface GetProvisionedProductOutputsOutput {
  Outputs?: RecordOutput[];
  NextPageToken?: string;
}
export type PhysicalId = string;
export interface ImportAsProvisionedProductInput {
  AcceptLanguage?: string;
  ProductId: string;
  ProvisioningArtifactId: string;
  ProvisionedProductName: string;
  PhysicalId: string;
  IdempotencyToken: string;
}
export interface ImportAsProvisionedProductOutput {
  RecordDetail?: RecordDetail;
}
export interface ListAcceptedPortfolioSharesInput {
  AcceptLanguage?: string;
  PageToken?: string;
  PageSize?: number;
  PortfolioShareType?: PortfolioShareType;
}
export type PortfolioDetails = PortfolioDetail[];
export interface ListAcceptedPortfolioSharesOutput {
  PortfolioDetails?: PortfolioDetail[];
  NextPageToken?: string;
}
export interface ListBudgetsForResourceInput {
  AcceptLanguage?: string;
  ResourceId: string;
  PageSize?: number;
  PageToken?: string;
}
export interface ListBudgetsForResourceOutput {
  Budgets?: BudgetDetail[];
  NextPageToken?: string;
}
export interface ListConstraintsForPortfolioInput {
  AcceptLanguage?: string;
  PortfolioId: string;
  ProductId?: string;
  PageSize?: number;
  PageToken?: string;
}
export type ConstraintDetails = ConstraintDetail[];
export interface ListConstraintsForPortfolioOutput {
  ConstraintDetails?: ConstraintDetail[];
  NextPageToken?: string;
}
export interface ListLaunchPathsInput {
  AcceptLanguage?: string;
  ProductId: string;
  PageSize?: number;
  PageToken?: string;
}
export interface LaunchPathSummary {
  Id?: string;
  ConstraintSummaries?: ConstraintSummary[];
  Tags?: Tag[];
  Name?: string;
}
export type LaunchPathSummaries = LaunchPathSummary[];
export interface ListLaunchPathsOutput {
  LaunchPathSummaries?: LaunchPathSummary[];
  NextPageToken?: string;
}
export interface ListOrganizationPortfolioAccessInput {
  AcceptLanguage?: string;
  PortfolioId: string;
  OrganizationNodeType: OrganizationNodeType;
  PageToken?: string;
  PageSize?: number;
}
export type OrganizationNodes = OrganizationNode[];
export interface ListOrganizationPortfolioAccessOutput {
  OrganizationNodes?: OrganizationNode[];
  NextPageToken?: string;
}
export interface ListPortfolioAccessInput {
  AcceptLanguage?: string;
  PortfolioId: string;
  OrganizationParentId?: string;
  PageToken?: string;
  PageSize?: number;
}
export type AccountIds = string[];
export interface ListPortfolioAccessOutput {
  AccountIds?: string[];
  NextPageToken?: string;
}
export interface ListPortfoliosInput {
  AcceptLanguage?: string;
  PageToken?: string;
  PageSize?: number;
}
export interface ListPortfoliosOutput {
  PortfolioDetails?: PortfolioDetail[];
  NextPageToken?: string;
}
export interface ListPortfoliosForProductInput {
  AcceptLanguage?: string;
  ProductId: string;
  PageToken?: string;
  PageSize?: number;
}
export interface ListPortfoliosForProductOutput {
  PortfolioDetails?: PortfolioDetail[];
  NextPageToken?: string;
}
export interface ListPrincipalsForPortfolioInput {
  AcceptLanguage?: string;
  PortfolioId: string;
  PageSize?: number;
  PageToken?: string;
}
export interface Principal {
  PrincipalARN?: string;
  PrincipalType?: PrincipalType;
}
export type Principals = Principal[];
export interface ListPrincipalsForPortfolioOutput {
  Principals?: Principal[];
  NextPageToken?: string;
}
export type AccessLevelFilterKey = "Account" | "Role" | "User" | (string & {});
export type AccessLevelFilterValue = string;
export interface AccessLevelFilter {
  Key?: AccessLevelFilterKey;
  Value?: string;
}
export interface ListProvisionedProductPlansInput {
  AcceptLanguage?: string;
  ProvisionProductId?: string;
  PageSize?: number;
  PageToken?: string;
  AccessLevelFilter?: AccessLevelFilter;
}
export interface ProvisionedProductPlanSummary {
  PlanName?: string;
  PlanId?: string;
  ProvisionProductId?: string;
  ProvisionProductName?: string;
  PlanType?: ProvisionedProductPlanType;
  ProvisioningArtifactId?: string;
}
export type ProvisionedProductPlans = ProvisionedProductPlanSummary[];
export interface ListProvisionedProductPlansOutput {
  ProvisionedProductPlans?: ProvisionedProductPlanSummary[];
  NextPageToken?: string;
}
export interface ListProvisioningArtifactsInput {
  AcceptLanguage?: string;
  ProductId: string;
}
export type ProvisioningArtifactDetails = ProvisioningArtifactDetail[];
export interface ListProvisioningArtifactsOutput {
  ProvisioningArtifactDetails?: ProvisioningArtifactDetail[];
  NextPageToken?: string;
}
export interface ListProvisioningArtifactsForServiceActionInput {
  ServiceActionId: string;
  PageSize?: number;
  PageToken?: string;
  AcceptLanguage?: string;
}
export interface ProvisioningArtifactView {
  ProductViewSummary?: ProductViewSummary;
  ProvisioningArtifact?: ProvisioningArtifact;
}
export type ProvisioningArtifactViews = ProvisioningArtifactView[];
export interface ListProvisioningArtifactsForServiceActionOutput {
  ProvisioningArtifactViews?: ProvisioningArtifactView[];
  NextPageToken?: string;
}
export type SearchFilterKey = string;
export type SearchFilterValue = string;
export interface ListRecordHistorySearchFilter {
  Key?: string;
  Value?: string;
}
export interface ListRecordHistoryInput {
  AcceptLanguage?: string;
  AccessLevelFilter?: AccessLevelFilter;
  SearchFilter?: ListRecordHistorySearchFilter;
  PageSize?: number;
  PageToken?: string;
}
export type RecordDetails = RecordDetail[];
export interface ListRecordHistoryOutput {
  RecordDetails?: RecordDetail[];
  NextPageToken?: string;
}
export type ResourceType = string;
export interface ListResourcesForTagOptionInput {
  TagOptionId: string;
  ResourceType?: string;
  PageSize?: number;
  PageToken?: string;
}
export type ResourceDetailId = string;
export type ResourceDetailARN = string;
export type ResourceDetailName = string;
export type ResourceDetailDescription = string;
export type ResourceDetailCreatedTime = Date;
export interface ResourceDetail {
  Id?: string;
  ARN?: string;
  Name?: string;
  Description?: string;
  CreatedTime?: Date;
}
export type ResourceDetails = ResourceDetail[];
export interface ListResourcesForTagOptionOutput {
  ResourceDetails?: ResourceDetail[];
  PageToken?: string;
}
export interface ListServiceActionsInput {
  AcceptLanguage?: string;
  PageSize?: number;
  PageToken?: string;
}
export type ServiceActionSummaries = ServiceActionSummary[];
export interface ListServiceActionsOutput {
  ServiceActionSummaries?: ServiceActionSummary[];
  NextPageToken?: string;
}
export interface ListServiceActionsForProvisioningArtifactInput {
  ProductId: string;
  ProvisioningArtifactId: string;
  PageSize?: number;
  PageToken?: string;
  AcceptLanguage?: string;
}
export interface ListServiceActionsForProvisioningArtifactOutput {
  ServiceActionSummaries?: ServiceActionSummary[];
  NextPageToken?: string;
}
export interface ListStackInstancesForProvisionedProductInput {
  AcceptLanguage?: string;
  ProvisionedProductId: string;
  PageToken?: string;
  PageSize?: number;
}
export type StackInstanceStatus = "CURRENT" | "OUTDATED" | "INOPERABLE" | (string & {});
export interface StackInstance {
  Account?: string;
  Region?: string;
  StackInstanceStatus?: StackInstanceStatus;
}
export type StackInstances = StackInstance[];
export interface ListStackInstancesForProvisionedProductOutput {
  StackInstances?: StackInstance[];
  NextPageToken?: string;
}
export interface ListTagOptionsFilters {
  Key?: string;
  Value?: string;
  Active?: boolean;
}
export interface ListTagOptionsInput {
  Filters?: ListTagOptionsFilters;
  PageSize?: number;
  PageToken?: string;
}
export interface ListTagOptionsOutput {
  TagOptionDetails?: TagOptionDetail[];
  PageToken?: string;
}
export type EngineWorkflowToken = string;
export type EngineWorkflowStatus = "SUCCEEDED" | "FAILED" | (string & {});
export type EngineWorkflowFailureReason = string;
export type UniqueTagKey = string;
export type UniqueTagValue = string;
export interface UniqueTagResourceIdentifier {
  Key?: string;
  Value?: string;
}
export interface EngineWorkflowResourceIdentifier {
  UniqueTag?: UniqueTagResourceIdentifier;
}
export interface NotifyProvisionProductEngineWorkflowResultInput {
  WorkflowToken: string;
  RecordId: string;
  Status: EngineWorkflowStatus;
  FailureReason?: string;
  ResourceIdentifier?: EngineWorkflowResourceIdentifier;
  Outputs?: RecordOutput[];
  IdempotencyToken: string;
}
export interface NotifyProvisionProductEngineWorkflowResultOutput {}
export interface NotifyTerminateProvisionedProductEngineWorkflowResultInput {
  WorkflowToken: string;
  RecordId: string;
  Status: EngineWorkflowStatus;
  FailureReason?: string;
  IdempotencyToken: string;
}
export interface NotifyTerminateProvisionedProductEngineWorkflowResultOutput {}
export interface NotifyUpdateProvisionedProductEngineWorkflowResultInput {
  WorkflowToken: string;
  RecordId: string;
  Status: EngineWorkflowStatus;
  FailureReason?: string;
  Outputs?: RecordOutput[];
  IdempotencyToken: string;
}
export interface NotifyUpdateProvisionedProductEngineWorkflowResultOutput {}
export interface ProvisioningParameter {
  Key?: string;
  Value?: string;
}
export type ProvisioningParameters = ProvisioningParameter[];
export type StackSetFailureToleranceCount = number;
export type StackSetFailureTolerancePercentage = number;
export type StackSetMaxConcurrencyCount = number;
export type StackSetMaxConcurrencyPercentage = number;
export interface ProvisioningPreferences {
  StackSetAccounts?: string[];
  StackSetRegions?: string[];
  StackSetFailureToleranceCount?: number;
  StackSetFailureTolerancePercentage?: number;
  StackSetMaxConcurrencyCount?: number;
  StackSetMaxConcurrencyPercentage?: number;
}
export interface ProvisionProductInput {
  AcceptLanguage?: string;
  ProductId?: string;
  ProductName?: string;
  ProvisioningArtifactId?: string;
  ProvisioningArtifactName?: string;
  PathId?: string;
  PathName?: string;
  ProvisionedProductName: string;
  ProvisioningParameters?: ProvisioningParameter[];
  ProvisioningPreferences?: ProvisioningPreferences;
  Tags?: Tag[];
  NotificationArns?: string[];
  ProvisionToken: string;
}
export interface ProvisionProductOutput {
  RecordDetail?: RecordDetail;
}
export interface RejectPortfolioShareInput {
  AcceptLanguage?: string;
  PortfolioId: string;
  PortfolioShareType?: PortfolioShareType;
}
export interface RejectPortfolioShareOutput {}
export interface ScanProvisionedProductsInput {
  AcceptLanguage?: string;
  AccessLevelFilter?: AccessLevelFilter;
  PageSize?: number;
  PageToken?: string;
}
export type ProvisionedProductDetails = ProvisionedProductDetail[];
export interface ScanProvisionedProductsOutput {
  ProvisionedProducts?: ProvisionedProductDetail[];
  NextPageToken?: string;
}
export type ProductViewFilterBy =
  | "FullTextSearch"
  | "Owner"
  | "ProductType"
  | "SourceProductId"
  | (string & {});
export type ProductViewFilterValue = string;
export type ProductViewFilterValues = string[];
export type ProductViewFilters = { [key in ProductViewFilterBy]?: string[] };
export type ProductViewSortBy = "Title" | "VersionCount" | "CreationDate" | (string & {});
export type SortOrder = "ASCENDING" | "DESCENDING" | (string & {});
export interface SearchProductsInput {
  AcceptLanguage?: string;
  Filters?: { [key: string]: string[] | undefined };
  PageSize?: number;
  SortBy?: ProductViewSortBy;
  SortOrder?: SortOrder;
  PageToken?: string;
}
export type ProductViewSummaries = ProductViewSummary[];
export type ProductViewAggregationType = string;
export type AttributeValue = string;
export type ApproximateCount = number;
export interface ProductViewAggregationValue {
  Value?: string;
  ApproximateCount?: number;
}
export type ProductViewAggregationValues = ProductViewAggregationValue[];
export type ProductViewAggregations = { [key: string]: ProductViewAggregationValue[] | undefined };
export interface SearchProductsOutput {
  ProductViewSummaries?: ProductViewSummary[];
  ProductViewAggregations?: { [key: string]: ProductViewAggregationValue[] | undefined };
  NextPageToken?: string;
}
export type ProductSource = "ACCOUNT" | (string & {});
export interface SearchProductsAsAdminInput {
  AcceptLanguage?: string;
  PortfolioId?: string;
  Filters?: { [key: string]: string[] | undefined };
  SortBy?: ProductViewSortBy;
  SortOrder?: SortOrder;
  PageToken?: string;
  PageSize?: number;
  ProductSource?: ProductSource;
}
export type ProductViewDetails = ProductViewDetail[];
export interface SearchProductsAsAdminOutput {
  ProductViewDetails?: ProductViewDetail[];
  NextPageToken?: string;
}
export type ProvisionedProductViewFilterBy = "SearchQuery" | (string & {});
export type ProvisionedProductViewFilterValue = string;
export type ProvisionedProductViewFilterValues = string[];
export type ProvisionedProductFilters = { [key in ProvisionedProductViewFilterBy]?: string[] };
export type SortField = string;
export type SearchProvisionedProductsPageSize = number;
export interface SearchProvisionedProductsInput {
  AcceptLanguage?: string;
  AccessLevelFilter?: AccessLevelFilter;
  Filters?: { [key: string]: string[] | undefined };
  SortBy?: string;
  SortOrder?: SortOrder;
  PageSize?: number;
  PageToken?: string;
}
export type UserArn = string;
export type UserArnSession = string;
export interface ProvisionedProductAttribute {
  Name?: string;
  Arn?: string;
  Type?: string;
  Id?: string;
  Status?: ProvisionedProductStatus;
  StatusMessage?: string;
  CreatedTime?: Date;
  IdempotencyToken?: string;
  LastRecordId?: string;
  LastProvisioningRecordId?: string;
  LastSuccessfulProvisioningRecordId?: string;
  Tags?: Tag[];
  PhysicalId?: string;
  ProductId?: string;
  ProductName?: string;
  ProvisioningArtifactId?: string;
  ProvisioningArtifactName?: string;
  UserArn?: string;
  UserArnSession?: string;
}
export type ProvisionedProductAttributes = ProvisionedProductAttribute[];
export type TotalResultsCount = number;
export interface SearchProvisionedProductsOutput {
  ProvisionedProducts?: ProvisionedProductAttribute[];
  TotalResultsCount?: number;
  NextPageToken?: string;
}
export type RetainPhysicalResources = boolean;
export interface TerminateProvisionedProductInput {
  ProvisionedProductName?: string;
  ProvisionedProductId?: string;
  TerminateToken: string;
  IgnoreErrors?: boolean;
  AcceptLanguage?: string;
  RetainPhysicalResources?: boolean;
}
export interface TerminateProvisionedProductOutput {
  RecordDetail?: RecordDetail;
}
export interface UpdateConstraintInput {
  AcceptLanguage?: string;
  Id: string;
  Description?: string;
  Parameters?: string;
}
export interface UpdateConstraintOutput {
  ConstraintDetail?: ConstraintDetail;
  ConstraintParameters?: string;
  Status?: Status;
}
export type TagKeys = string[];
export interface UpdatePortfolioInput {
  AcceptLanguage?: string;
  Id: string;
  DisplayName?: string;
  Description?: string;
  ProviderName?: string;
  AddTags?: Tag[];
  RemoveTags?: string[];
}
export interface UpdatePortfolioOutput {
  PortfolioDetail?: PortfolioDetail;
  Tags?: Tag[];
}
export interface UpdatePortfolioShareInput {
  AcceptLanguage?: string;
  PortfolioId: string;
  AccountId?: string;
  OrganizationNode?: OrganizationNode;
  ShareTagOptions?: boolean;
  SharePrincipals?: boolean;
}
export interface UpdatePortfolioShareOutput {
  PortfolioShareToken?: string;
  Status?: ShareStatus;
}
export interface UpdateProductInput {
  AcceptLanguage?: string;
  Id: string;
  Name?: string;
  Owner?: string;
  Description?: string;
  Distributor?: string;
  SupportDescription?: string;
  SupportEmail?: string;
  SupportUrl?: string;
  AddTags?: Tag[];
  RemoveTags?: string[];
  SourceConnection?: SourceConnection;
}
export interface UpdateProductOutput {
  ProductViewDetail?: ProductViewDetail;
  Tags?: Tag[];
}
export type StackSetOperationType = "CREATE" | "UPDATE" | "DELETE" | (string & {});
export interface UpdateProvisioningPreferences {
  StackSetAccounts?: string[];
  StackSetRegions?: string[];
  StackSetFailureToleranceCount?: number;
  StackSetFailureTolerancePercentage?: number;
  StackSetMaxConcurrencyCount?: number;
  StackSetMaxConcurrencyPercentage?: number;
  StackSetOperationType?: StackSetOperationType;
}
export interface UpdateProvisionedProductInput {
  AcceptLanguage?: string;
  ProvisionedProductName?: string;
  ProvisionedProductId?: string;
  ProductId?: string;
  ProductName?: string;
  ProvisioningArtifactId?: string;
  ProvisioningArtifactName?: string;
  PathId?: string;
  PathName?: string;
  ProvisioningParameters?: UpdateProvisioningParameter[];
  ProvisioningPreferences?: UpdateProvisioningPreferences;
  Tags?: Tag[];
  UpdateToken: string;
}
export interface UpdateProvisionedProductOutput {
  RecordDetail?: RecordDetail;
}
export type PropertyKey = "OWNER" | "LAUNCH_ROLE" | (string & {});
export type PropertyValue = string;
export type ProvisionedProductProperties = { [key in PropertyKey]?: string };
export interface UpdateProvisionedProductPropertiesInput {
  AcceptLanguage?: string;
  ProvisionedProductId: string;
  ProvisionedProductProperties: { [key: string]: string | undefined };
  IdempotencyToken: string;
}
export interface UpdateProvisionedProductPropertiesOutput {
  ProvisionedProductId?: string;
  ProvisionedProductProperties?: { [key: string]: string | undefined };
  RecordId?: string;
  Status?: RecordStatus;
}
export interface UpdateProvisioningArtifactInput {
  AcceptLanguage?: string;
  ProductId: string;
  ProvisioningArtifactId: string;
  Name?: string;
  Description?: string;
  Active?: boolean;
  Guidance?: ProvisioningArtifactGuidance;
}
export interface UpdateProvisioningArtifactOutput {
  ProvisioningArtifactDetail?: ProvisioningArtifactDetail;
  Info?: { [key: string]: string | undefined };
  Status?: Status;
}
export interface UpdateServiceActionInput {
  Id: string;
  Name?: string;
  Definition?: { [key: string]: string | undefined };
  Description?: string;
  AcceptLanguage?: string;
}
export interface UpdateServiceActionOutput {
  ServiceActionDetail?: ServiceActionDetail;
}
export interface UpdateTagOptionInput {
  Id: string;
  Value?: string;
  Active?: boolean;
}
export interface UpdateTagOptionOutput {
  TagOptionDetail?: TagOptionDetail;
}
export type ErrorMessage = string;
export type AcceptPortfolioShareError =
  | InvalidParametersException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Accepts an offer to share the specified portfolio.
 */
export const acceptPortfolioShare: API.OperationMethod<
  AcceptPortfolioShareInput,
  AcceptPortfolioShareOutput,
  AcceptPortfolioShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1888, __c118, 0) as any as S.Schema<AcceptPortfolioShareInput>,
  output: __S(1904, __c119, 0) as any as S.Schema<AcceptPortfolioShareOutput>,
  errors: [InvalidParametersException, LimitExceededException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptPortfolioShare",
}));

export type AssociateBudgetWithResourceError =
  | DuplicateResourceException
  | InvalidParametersException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Associates the specified budget with the specified resource.
 */
export const associateBudgetWithResource: API.OperationMethod<
  AssociateBudgetWithResourceInput,
  AssociateBudgetWithResourceOutput,
  AssociateBudgetWithResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<AssociateBudgetWithResourceInput>,
  output: __S(1904, __c119, 0) as any as S.Schema<AssociateBudgetWithResourceOutput>,
  errors: [
    DuplicateResourceException,
    InvalidParametersException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateBudgetWithResource",
}));

export type AssociatePrincipalWithPortfolioError =
  | InvalidParametersException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Associates the specified principal ARN with the specified portfolio.
 *
 * If you share the portfolio with principal name sharing enabled, the `PrincipalARN` association is
 * included in the share.
 *
 * The `PortfolioID`, `PrincipalARN`, and `PrincipalType` parameters are
 * required.
 *
 * You can associate a maximum of 10 Principals with a portfolio using `PrincipalType` as `IAM_PATTERN`.
 *
 * When you associate a principal with portfolio, a potential privilege escalation path may occur when that portfolio is
 * then shared with other accounts. For a user in a recipient account who is *not* an Service Catalog Admin,
 * but still has the ability to create Principals (Users/Groups/Roles), that user could create a role that matches a principal
 * name association for the portfolio. Although this user may not know which principal names are associated through
 * Service Catalog, they may be able to guess the user. If this potential escalation path is a concern, then
 * Service Catalog recommends using `PrincipalType` as `IAM`. With this configuration,
 * the `PrincipalARN` must already exist in the recipient account before it can be associated.
 */
export const associatePrincipalWithPortfolio: API.OperationMethod<
  AssociatePrincipalWithPortfolioInput,
  AssociatePrincipalWithPortfolioOutput,
  AssociatePrincipalWithPortfolioError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c1, 0) as any as S.Schema<AssociatePrincipalWithPortfolioInput>,
  output: __S(1904, __c119, 0) as any as S.Schema<AssociatePrincipalWithPortfolioOutput>,
  errors: [InvalidParametersException, LimitExceededException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociatePrincipalWithPortfolio",
}));

export type AssociateProductWithPortfolioError =
  | InvalidParametersException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Associates the specified product with the specified portfolio.
 *
 * A delegated admin is authorized to invoke this command.
 */
export const associateProductWithPortfolio: API.OperationMethod<
  AssociateProductWithPortfolioInput,
  AssociateProductWithPortfolioOutput,
  AssociateProductWithPortfolioError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c2, 0) as any as S.Schema<AssociateProductWithPortfolioInput>,
  output: __S(1904, __c119, 0) as any as S.Schema<AssociateProductWithPortfolioOutput>,
  errors: [InvalidParametersException, LimitExceededException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateProductWithPortfolio",
}));

export type AssociateServiceActionWithProvisioningArtifactError =
  | DuplicateResourceException
  | InvalidParametersException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Associates a self-service action with a provisioning artifact.
 */
export const associateServiceActionWithProvisioningArtifact: API.OperationMethod<
  AssociateServiceActionWithProvisioningArtifactInput,
  AssociateServiceActionWithProvisioningArtifactOutput,
  AssociateServiceActionWithProvisioningArtifactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c3, 0) as any as S.Schema<AssociateServiceActionWithProvisioningArtifactInput>,
  output: __S(
    1904,
    __c119,
    0,
  ) as any as S.Schema<AssociateServiceActionWithProvisioningArtifactOutput>,
  errors: [
    DuplicateResourceException,
    InvalidParametersException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateServiceActionWithProvisioningArtifact",
}));

export type AssociateTagOptionWithResourceError =
  | DuplicateResourceException
  | InvalidParametersException
  | InvalidStateException
  | LimitExceededException
  | ResourceNotFoundException
  | TagOptionNotMigratedException
  | CommonErrors;
/**
 * Associate the specified TagOption with the specified portfolio or product.
 */
export const associateTagOptionWithResource: API.OperationMethod<
  AssociateTagOptionWithResourceInput,
  AssociateTagOptionWithResourceOutput,
  AssociateTagOptionWithResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c4, 0) as any as S.Schema<AssociateTagOptionWithResourceInput>,
  output: __S(1904, __c119, 0) as any as S.Schema<AssociateTagOptionWithResourceOutput>,
  errors: [
    DuplicateResourceException,
    InvalidParametersException,
    InvalidStateException,
    LimitExceededException,
    ResourceNotFoundException,
    TagOptionNotMigratedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateTagOptionWithResource",
}));

export type BatchAssociateServiceActionWithProvisioningArtifactError =
  | InvalidParametersException
  | CommonErrors;
/**
 * Associates multiple self-service actions with provisioning artifacts.
 */
export const batchAssociateServiceActionWithProvisioningArtifact: API.OperationMethod<
  BatchAssociateServiceActionWithProvisioningArtifactInput,
  BatchAssociateServiceActionWithProvisioningArtifactOutput,
  BatchAssociateServiceActionWithProvisioningArtifactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(
    80,
    __c5,
    0,
  ) as any as S.Schema<BatchAssociateServiceActionWithProvisioningArtifactInput>,
  output: __S(
    100,
    __c6,
    4,
  ) as any as S.Schema<BatchAssociateServiceActionWithProvisioningArtifactOutput>,
  errors: [InvalidParametersException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchAssociateServiceActionWithProvisioningArtifact",
}));

export type BatchDisassociateServiceActionFromProvisioningArtifactError =
  | InvalidParametersException
  | CommonErrors;
/**
 * Disassociates a batch of self-service actions from the specified provisioning artifact.
 */
export const batchDisassociateServiceActionFromProvisioningArtifact: API.OperationMethod<
  BatchDisassociateServiceActionFromProvisioningArtifactInput,
  BatchDisassociateServiceActionFromProvisioningArtifactOutput,
  BatchDisassociateServiceActionFromProvisioningArtifactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(
    112,
    __c7,
    0,
  ) as any as S.Schema<BatchDisassociateServiceActionFromProvisioningArtifactInput>,
  output: __S(
    100,
    __c6,
    4,
  ) as any as S.Schema<BatchDisassociateServiceActionFromProvisioningArtifactOutput>,
  errors: [InvalidParametersException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDisassociateServiceActionFromProvisioningArtifact",
}));

export type CopyProductError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Copies the specified source product to the specified target product or a new
 * product.
 *
 * You can copy a product to the same account or another account. You can copy a product
 * to the same Region or another Region. If you copy a product to another account, you must
 * first share the product in a portfolio using CreatePortfolioShare.
 *
 * This operation is performed asynchronously. To track the progress of the
 * operation, use DescribeCopyProductStatus.
 */
export const copyProduct: API.OperationMethod<
  CopyProductInput,
  CopyProductOutput,
  CopyProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(129, __c8, 1) as any as S.Schema<CopyProductInput>,
  output: __S(130, __c8, 2) as any as S.Schema<CopyProductOutput>,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopyProduct",
}));

export type CreateConstraintError =
  | DuplicateResourceException
  | InvalidParametersException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a constraint.
 *
 * A delegated admin is authorized to invoke this command.
 */
export const createConstraint: API.OperationMethod<
  CreateConstraintInput,
  CreateConstraintOutput,
  CreateConstraintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<CreateConstraintInput>,
  output: __S(208, __c13, 0) as any as S.Schema<CreateConstraintOutput>,
  errors: [
    DuplicateResourceException,
    InvalidParametersException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConstraint",
}));

export type CreatePortfolioError =
  | InvalidParametersException
  | LimitExceededException
  | TagOptionNotMigratedException
  | CommonErrors;
/**
 * Creates a portfolio.
 *
 * A delegated admin is authorized to invoke this command.
 */
export const createPortfolio: API.OperationMethod<
  CreatePortfolioInput,
  CreatePortfolioOutput,
  CreatePortfolioError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<CreatePortfolioInput>,
  output: __S(272, __c17, 0) as any as S.Schema<CreatePortfolioOutput>,
  errors: [InvalidParametersException, LimitExceededException, TagOptionNotMigratedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePortfolio",
}));

export type CreatePortfolioShareError =
  | InvalidParametersException
  | InvalidStateException
  | LimitExceededException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Shares the specified portfolio with the specified account or organization node.
 * Shares to an organization node can only be created by the management account of an
 * organization or by a delegated administrator. You can share portfolios to an organization,
 * an organizational unit, or a specific account.
 *
 * Note that if a delegated admin is de-registered, they can no longer create portfolio shares.
 *
 * `AWSOrganizationsAccess` must be enabled in order to create a portfolio share to an organization node.
 *
 * You can't share a shared resource, including portfolios that contain a shared product.
 *
 * If the portfolio share with the specified account or organization node already exists, this action will have no effect
 * and will not return an error. To update an existing share, you must use the ` UpdatePortfolioShare` API instead.
 *
 * When you associate a principal with portfolio, a potential privilege escalation path may occur when that portfolio is
 * then shared with other accounts. For a user in a recipient account who is *not* an Service Catalog Admin,
 * but still has the ability to create Principals (Users/Groups/Roles), that user could create a role that matches a principal
 * name association for the portfolio. Although this user may not know which principal names are associated through
 * Service Catalog, they may be able to guess the user. If this potential escalation path is a concern, then
 * Service Catalog recommends using `PrincipalType` as `IAM`. With this configuration,
 * the `PrincipalARN` must already exist in the recipient account before it can be associated.
 */
export const createPortfolioShare: API.OperationMethod<
  CreatePortfolioShareInput,
  CreatePortfolioShareOutput,
  CreatePortfolioShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<CreatePortfolioShareInput>,
  output: __S(304, __c19, 0) as any as S.Schema<CreatePortfolioShareOutput>,
  errors: [
    InvalidParametersException,
    InvalidStateException,
    LimitExceededException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePortfolioShare",
}));

export type CreateProductError =
  | InvalidParametersException
  | LimitExceededException
  | TagOptionNotMigratedException
  | CommonErrors;
/**
 * Creates a product.
 *
 * A delegated admin is authorized to invoke this command.
 *
 * The user or role that performs this operation must have the
 * `cloudformation:GetTemplate` IAM policy permission. This policy permission is
 * required when using the `ImportFromPhysicalId` template source in the
 * information data section.
 */
export const createProduct: API.OperationMethod<
  CreateProductInput,
  CreateProductOutput,
  CreateProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<CreateProductInput>,
  output: __S(337, __c21, 1) as any as S.Schema<CreateProductOutput>,
  errors: [InvalidParametersException, LimitExceededException, TagOptionNotMigratedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProduct",
}));

export type CreateProvisionedProductPlanError =
  | InvalidParametersException
  | InvalidStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a plan.
 *
 * A plan includes the list of resources to be
 * created (when provisioning a new product) or modified (when updating a provisioned product)
 * when the plan is executed.
 *
 * You can create one plan for each provisioned product. To create a plan for an existing
 * provisioned product, the product status must be AVAILABLE or TAINTED.
 *
 * To view the resource changes in the change set, use DescribeProvisionedProductPlan.
 * To create or modify the provisioned product, use ExecuteProvisionedProductPlan.
 */
export const createProvisionedProductPlan: API.OperationMethod<
  CreateProvisionedProductPlanInput,
  CreateProvisionedProductPlanOutput,
  CreateProvisionedProductPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<CreateProvisionedProductPlanInput>,
  output: __S(449, __c28, 1) as any as S.Schema<CreateProvisionedProductPlanOutput>,
  errors: [InvalidParametersException, InvalidStateException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProvisionedProductPlan",
}));

export type CreateProvisioningArtifactError =
  | InvalidParametersException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a provisioning artifact (also known as a version) for the specified product.
 *
 * You cannot create a provisioning artifact for a product that was shared with you.
 *
 * The user or role that performs this operation must have the `cloudformation:GetTemplate`
 * IAM policy permission. This policy permission is required when using the
 * `ImportFromPhysicalId` template source in the information data section.
 */
export const createProvisioningArtifact: API.OperationMethod<
  CreateProvisioningArtifactInput,
  CreateProvisioningArtifactOutput,
  CreateProvisioningArtifactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<CreateProvisioningArtifactInput>,
  output: __S(512, __c32, 0) as any as S.Schema<CreateProvisioningArtifactOutput>,
  errors: [InvalidParametersException, LimitExceededException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProvisioningArtifact",
}));

export type CreateServiceActionError =
  | InvalidParametersException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates a self-service action.
 */
export const createServiceAction: API.OperationMethod<
  CreateServiceActionInput,
  CreateServiceActionOutput,
  CreateServiceActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(528, __c33, 0) as any as S.Schema<CreateServiceActionInput>,
  output: __S(561, __c35, 1) as any as S.Schema<CreateServiceActionOutput>,
  errors: [InvalidParametersException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateServiceAction",
}));

export type CreateTagOptionError =
  | DuplicateResourceException
  | LimitExceededException
  | TagOptionNotMigratedException
  | CommonErrors;
/**
 * Creates a TagOption.
 */
export const createTagOption: API.OperationMethod<
  CreateTagOptionInput,
  CreateTagOptionOutput,
  CreateTagOptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c36, 0) as any as S.Schema<CreateTagOptionInput>,
  output: __S(608, __c38, 0) as any as S.Schema<CreateTagOptionOutput>,
  errors: [DuplicateResourceException, LimitExceededException, TagOptionNotMigratedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTagOption",
}));

export type DeleteConstraintError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified constraint.
 *
 * A delegated admin is authorized to invoke this command.
 */
export const deleteConstraint: API.OperationMethod<
  DeleteConstraintInput,
  DeleteConstraintOutput,
  DeleteConstraintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(624, __c39, 0) as any as S.Schema<DeleteConstraintInput>,
  output: __S(1904, __c119, 0) as any as S.Schema<DeleteConstraintOutput>,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConstraint",
}));

export type DeletePortfolioError =
  | InvalidParametersException
  | ResourceInUseException
  | ResourceNotFoundException
  | TagOptionNotMigratedException
  | CommonErrors;
/**
 * Deletes the specified portfolio.
 *
 * You cannot delete a portfolio if it was shared with you or if it has associated
 * products, users, constraints, or shared accounts.
 *
 * A delegated admin is authorized to invoke this command.
 */
export const deletePortfolio: API.OperationMethod<
  DeletePortfolioInput,
  DeletePortfolioOutput,
  DeletePortfolioError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c40, 0) as any as S.Schema<DeletePortfolioInput>,
  output: __S(1904, __c119, 0) as any as S.Schema<DeletePortfolioOutput>,
  errors: [
    InvalidParametersException,
    ResourceInUseException,
    ResourceNotFoundException,
    TagOptionNotMigratedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePortfolio",
}));

export type DeletePortfolioShareError =
  | InvalidParametersException
  | InvalidStateException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Stops sharing the specified portfolio with the specified account or organization
 * node. Shares to an organization node can only be deleted by the management account of an
 * organization or by a delegated administrator.
 *
 * Note that if a delegated admin is de-registered, portfolio shares created from that account are removed.
 */
export const deletePortfolioShare: API.OperationMethod<
  DeletePortfolioShareInput,
  DeletePortfolioShareOutput,
  DeletePortfolioShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(656, __c41, 0) as any as S.Schema<DeletePortfolioShareInput>,
  output: __S(304, __c19, 0) as any as S.Schema<DeletePortfolioShareOutput>,
  errors: [
    InvalidParametersException,
    InvalidStateException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePortfolioShare",
}));

export type DeleteProductError =
  | InvalidParametersException
  | ResourceInUseException
  | ResourceNotFoundException
  | TagOptionNotMigratedException
  | CommonErrors;
/**
 * Deletes the specified product.
 *
 * You cannot delete a product if it was shared with you or is associated with a portfolio.
 *
 * A delegated admin is authorized to invoke this command.
 */
export const deleteProduct: API.OperationMethod<
  DeleteProductInput,
  DeleteProductOutput,
  DeleteProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c42, 0) as any as S.Schema<DeleteProductInput>,
  output: __S(1904, __c119, 0) as any as S.Schema<DeleteProductOutput>,
  errors: [
    InvalidParametersException,
    ResourceInUseException,
    ResourceNotFoundException,
    TagOptionNotMigratedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProduct",
}));

export type DeleteProvisionedProductPlanError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified plan.
 */
export const deleteProvisionedProductPlan: API.OperationMethod<
  DeleteProvisionedProductPlanInput,
  DeleteProvisionedProductPlanOutput,
  DeleteProvisionedProductPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(688, __c43, 0) as any as S.Schema<DeleteProvisionedProductPlanInput>,
  output: __S(1904, __c119, 0) as any as S.Schema<DeleteProvisionedProductPlanOutput>,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProvisionedProductPlan",
}));

export type DeleteProvisioningArtifactError =
  | InvalidParametersException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified provisioning artifact (also known as a version) for the specified product.
 *
 * You cannot delete a provisioning artifact associated with a product that was shared with you.
 * You cannot delete the last provisioning artifact for a product, because a product must have at
 * least one provisioning artifact.
 */
export const deleteProvisioningArtifact: API.OperationMethod<
  DeleteProvisioningArtifactInput,
  DeleteProvisioningArtifactOutput,
  DeleteProvisioningArtifactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c44, 0) as any as S.Schema<DeleteProvisioningArtifactInput>,
  output: __S(1904, __c119, 0) as any as S.Schema<DeleteProvisioningArtifactOutput>,
  errors: [InvalidParametersException, ResourceInUseException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProvisioningArtifact",
}));

export type DeleteServiceActionError =
  | InvalidParametersException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a self-service action.
 */
export const deleteServiceAction: API.OperationMethod<
  DeleteServiceActionInput,
  DeleteServiceActionOutput,
  DeleteServiceActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(720, __c45, 0) as any as S.Schema<DeleteServiceActionInput>,
  output: __S(1904, __c119, 0) as any as S.Schema<DeleteServiceActionOutput>,
  errors: [InvalidParametersException, ResourceInUseException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteServiceAction",
}));

export type DeleteTagOptionError =
  | ResourceInUseException
  | ResourceNotFoundException
  | TagOptionNotMigratedException
  | CommonErrors;
/**
 * Deletes the specified TagOption.
 *
 * You cannot delete a TagOption if it is associated with a product or portfolio.
 */
export const deleteTagOption: API.OperationMethod<
  DeleteTagOptionInput,
  DeleteTagOptionOutput,
  DeleteTagOptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c46, 0) as any as S.Schema<DeleteTagOptionInput>,
  output: __S(1904, __c119, 0) as any as S.Schema<DeleteTagOptionOutput>,
  errors: [ResourceInUseException, ResourceNotFoundException, TagOptionNotMigratedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTagOption",
}));

export type DescribeConstraintError = ResourceNotFoundException | CommonErrors;
/**
 * Gets information about the specified constraint.
 */
export const describeConstraint: API.OperationMethod<
  DescribeConstraintInput,
  DescribeConstraintOutput,
  DescribeConstraintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(752, __c47, 0) as any as S.Schema<DescribeConstraintInput>,
  output: __S(208, __c13, 0) as any as S.Schema<DescribeConstraintOutput>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConstraint",
}));

export type DescribeCopyProductStatusError = ResourceNotFoundException | CommonErrors;
/**
 * Gets the status of the specified copy product operation.
 */
export const describeCopyProductStatus: API.OperationMethod<
  DescribeCopyProductStatusInput,
  DescribeCopyProductStatusOutput,
  DescribeCopyProductStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c48, 0) as any as S.Schema<DescribeCopyProductStatusInput>,
  output: __S(769, __c48, 1) as any as S.Schema<DescribeCopyProductStatusOutput>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCopyProductStatus",
}));

export type DescribePortfolioError = ResourceNotFoundException | CommonErrors;
/**
 * Gets information about the specified portfolio.
 *
 * A delegated admin is authorized to invoke this command.
 */
export const describePortfolio: API.OperationMethod<
  DescribePortfolioInput,
  DescribePortfolioOutput,
  DescribePortfolioError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(784, __c49, 0) as any as S.Schema<DescribePortfolioInput>,
  output: __S(785, __c49, 1) as any as S.Schema<DescribePortfolioOutput>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePortfolio",
}));

export type DescribePortfolioSharesError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a summary of each of the portfolio shares that were created for the specified portfolio.
 *
 * You can use this API to determine which accounts or organizational nodes this
 * portfolio have been shared, whether the recipient entity has imported the share, and
 * whether TagOptions are included with the share.
 *
 * The `PortfolioId` and `Type` parameters are both required.
 */
export const describePortfolioShares: API.PaginatedOperationMethod<
  DescribePortfolioSharesInput,
  DescribePortfolioSharesOutput,
  DescribePortfolioSharesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(832, __c52, 0) as any as S.Schema<DescribePortfolioSharesInput>,
  output: __S(835, __c52, 3) as any as S.Schema<DescribePortfolioSharesOutput>,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePortfolioShares",
  pagination: {
    inputToken: "PageToken",
    outputToken: "NextPageToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type DescribePortfolioShareStatusError =
  | InvalidParametersException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the status of the specified portfolio share operation. This API can only be called
 * by the management account in the organization or by a delegated admin.
 */
export const describePortfolioShareStatus: API.OperationMethod<
  DescribePortfolioShareStatusInput,
  DescribePortfolioShareStatusOutput,
  DescribePortfolioShareStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(848, __c53, 0) as any as S.Schema<DescribePortfolioShareStatusInput>,
  output: __S(852, __c53, 4) as any as S.Schema<DescribePortfolioShareStatusOutput>,
  errors: [InvalidParametersException, OperationNotSupportedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePortfolioShareStatus",
}));

export type DescribeProductError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets information about the specified product.
 *
 * Running this operation
 * with administrator access
 * results
 * in a failure.
 * DescribeProductAsAdmin should be used instead.
 */
export const describeProduct: API.OperationMethod<
  DescribeProductInput,
  DescribeProductOutput,
  DescribeProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c54, 0) as any as S.Schema<DescribeProductInput>,
  output: __S(867, __c54, 3) as any as S.Schema<DescribeProductOutput>,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProduct",
}));

export type DescribeProductAsAdminError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets information about the specified product. This operation is run with administrator access.
 */
export const describeProductAsAdmin: API.OperationMethod<
  DescribeProductAsAdminInput,
  DescribeProductAsAdminOutput,
  DescribeProductAsAdminError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(912, __c57, 0) as any as S.Schema<DescribeProductAsAdminInput>,
  output: __S(915, __c57, 3) as any as S.Schema<DescribeProductAsAdminOutput>,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProductAsAdmin",
}));

export type DescribeProductViewError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets information about the specified product.
 */
export const describeProductView: API.OperationMethod<
  DescribeProductViewInput,
  DescribeProductViewOutput,
  DescribeProductViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(928, __c58, 0) as any as S.Schema<DescribeProductViewInput>,
  output: __S(929, __c58, 1) as any as S.Schema<DescribeProductViewOutput>,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProductView",
}));

export type DescribeProvisionedProductError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets information about the specified provisioned product.
 */
export const describeProvisionedProduct: API.OperationMethod<
  DescribeProvisionedProductInput,
  DescribeProvisionedProductOutput,
  DescribeProvisionedProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(944, __c59, 0) as any as S.Schema<DescribeProvisionedProductInput>,
  output: __S(947, __c59, 3) as any as S.Schema<DescribeProvisionedProductOutput>,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProvisionedProduct",
}));

export type DescribeProvisionedProductPlanError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets information about the resource changes for the specified plan.
 */
export const describeProvisionedProductPlan: API.OperationMethod<
  DescribeProvisionedProductPlanInput,
  DescribeProvisionedProductPlanOutput,
  DescribeProvisionedProductPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(976, __c61, 0) as any as S.Schema<DescribeProvisionedProductPlanInput>,
  output: __S(983, __c61, 7) as any as S.Schema<DescribeProvisionedProductPlanOutput>,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProvisionedProductPlan",
}));

export type DescribeProvisioningArtifactError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets information about the specified provisioning artifact (also known as a version) for the specified product.
 */
export const describeProvisioningArtifact: API.OperationMethod<
  DescribeProvisioningArtifactInput,
  DescribeProvisioningArtifactOutput,
  DescribeProvisioningArtifactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(992, __c62, 0) as any as S.Schema<DescribeProvisioningArtifactInput>,
  output: __S(993, __c62, 1) as any as S.Schema<DescribeProvisioningArtifactOutput>,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProvisioningArtifact",
}));

export type DescribeProvisioningParametersError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets information about the configuration required to provision the specified product using
 * the specified provisioning artifact.
 *
 * If the output contains a TagOption key with an empty list of values, there is a
 * TagOption conflict for that key. The end user cannot take action to fix the conflict, and
 * launch is not blocked. In subsequent calls to ProvisionProduct,
 * do not include conflicted TagOption keys as tags, or this causes the error
 * "Parameter validation failed: Missing required parameter in Tags[*N*]:*Value*".
 * Tag the provisioned product with the value `sc-tagoption-conflict-portfolioId-productId`.
 */
export const describeProvisioningParameters: API.OperationMethod<
  DescribeProvisioningParametersInput,
  DescribeProvisioningParametersOutput,
  DescribeProvisioningParametersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1024, __c64, 0) as any as S.Schema<DescribeProvisioningParametersInput>,
  output: __S(1032, __c64, 8) as any as S.Schema<DescribeProvisioningParametersOutput>,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProvisioningParameters",
}));

export type DescribeRecordError = ResourceNotFoundException | CommonErrors;
/**
 * Gets information about the specified request operation.
 *
 * Use this operation after calling a request operation (for example, ProvisionProduct,
 * TerminateProvisionedProduct, or UpdateProvisionedProduct).
 *
 * If a provisioned product was transferred to a new owner using UpdateProvisionedProductProperties, the new owner
 * will be able to describe all past records for that product. The previous owner will no longer be able to describe the records, but will be able to
 * use ListRecordHistory to see the product's history from when he was the owner.
 */
export const describeRecord: API.OperationMethod<
  DescribeRecordInput,
  DescribeRecordOutput,
  DescribeRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1056, __c66, 0) as any as S.Schema<DescribeRecordInput>,
  output: __S(1057, __c66, 1) as any as S.Schema<DescribeRecordOutput>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRecord",
}));

export type DescribeServiceActionError = ResourceNotFoundException | CommonErrors;
/**
 * Describes a self-service action.
 */
export const describeServiceAction: API.OperationMethod<
  DescribeServiceActionInput,
  DescribeServiceActionOutput,
  DescribeServiceActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1120, __c70, 0) as any as S.Schema<DescribeServiceActionInput>,
  output: __S(561, __c35, 1) as any as S.Schema<DescribeServiceActionOutput>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeServiceAction",
}));

export type DescribeServiceActionExecutionParametersError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Finds the default parameters for a specific self-service action on a specific provisioned product and returns a map of the results to the user.
 */
export const describeServiceActionExecutionParameters: API.OperationMethod<
  DescribeServiceActionExecutionParametersInput,
  DescribeServiceActionExecutionParametersOutput,
  DescribeServiceActionExecutionParametersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1136, __c71, 0) as any as S.Schema<DescribeServiceActionExecutionParametersInput>,
  output: __S(1139, __c71, 3) as any as S.Schema<DescribeServiceActionExecutionParametersOutput>,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeServiceActionExecutionParameters",
}));

export type DescribeTagOptionError =
  | ResourceNotFoundException
  | TagOptionNotMigratedException
  | CommonErrors;
/**
 * Gets information about the specified TagOption.
 */
export const describeTagOption: API.OperationMethod<
  DescribeTagOptionInput,
  DescribeTagOptionOutput,
  DescribeTagOptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1152, __c72, 0) as any as S.Schema<DescribeTagOptionInput>,
  output: __S(608, __c38, 0) as any as S.Schema<DescribeTagOptionOutput>,
  errors: [ResourceNotFoundException, TagOptionNotMigratedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTagOption",
}));

export type DisableAWSOrganizationsAccessError =
  | InvalidStateException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disable portfolio sharing through the Organizations service. This command will not
 * delete your current shares, but prevents you from creating new shares throughout your
 * organization. Current shares are not kept in sync with your organization structure if the structure
 * changes after calling this API. Only the management account in the organization can call this API.
 *
 * You cannot call this API if there are active delegated administrators in the organization.
 *
 * Note that a delegated administrator is not authorized to invoke `DisableAWSOrganizationsAccess`.
 *
 * If you share an Service Catalog portfolio in an organization within
 * Organizations, and then disable Organizations access for Service Catalog,
 * the portfolio access permissions will not sync with the latest changes to the organization
 * structure. Specifically, accounts that you removed from the organization after
 * disabling Service Catalog access will retain access to the previously shared portfolio.
 */
export const disableAWSOrganizationsAccess: API.OperationMethod<
  DisableAWSOrganizationsAccessInput,
  DisableAWSOrganizationsAccessOutput,
  DisableAWSOrganizationsAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1168, __c73, 0) as any as S.Schema<DisableAWSOrganizationsAccessInput>,
  output: __S(1904, __c119, 0) as any as S.Schema<DisableAWSOrganizationsAccessOutput>,
  errors: [InvalidStateException, OperationNotSupportedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableAWSOrganizationsAccess",
}));

export type DisassociateBudgetFromResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Disassociates the specified budget from the specified resource.
 */
export const disassociateBudgetFromResource: API.OperationMethod<
  DisassociateBudgetFromResourceInput,
  DisassociateBudgetFromResourceOutput,
  DisassociateBudgetFromResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1184, __c74, 0) as any as S.Schema<DisassociateBudgetFromResourceInput>,
  output: __S(1904, __c119, 0) as any as S.Schema<DisassociateBudgetFromResourceOutput>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateBudgetFromResource",
}));

export type DisassociatePrincipalFromPortfolioError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disassociates a previously associated principal ARN from a specified
 * portfolio.
 *
 * The `PrincipalType` and `PrincipalARN` must match the
 * `AssociatePrincipalWithPortfolio` call request details. For example,
 * to disassociate an association created with a `PrincipalARN` of `PrincipalType`
 * IAM you must use the `PrincipalType` IAM when calling `DisassociatePrincipalFromPortfolio`.
 *
 * For portfolios that have been shared with principal name sharing enabled: after disassociating a principal,
 * share recipient accounts will no longer be able to provision products in this portfolio using a role matching the name
 * of the associated principal.
 *
 * For more information, review associate-principal-with-portfolio
 * in the Amazon Web Services CLI Command Reference.
 *
 * If you disassociate a principal from a portfolio, with PrincipalType as `IAM`, the same principal will
 * still have access to the portfolio if it matches one of the associated principals of type `IAM_PATTERN`.
 * To fully remove access for a principal, verify all the associated Principals of type `IAM_PATTERN`,
 * and then ensure you disassociate any `IAM_PATTERN` principals that match the principal
 * whose access you are removing.
 */
export const disassociatePrincipalFromPortfolio: API.OperationMethod<
  DisassociatePrincipalFromPortfolioInput,
  DisassociatePrincipalFromPortfolioOutput,
  DisassociatePrincipalFromPortfolioError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1200, __c75, 0) as any as S.Schema<DisassociatePrincipalFromPortfolioInput>,
  output: __S(1904, __c119, 0) as any as S.Schema<DisassociatePrincipalFromPortfolioOutput>,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociatePrincipalFromPortfolio",
}));

export type DisassociateProductFromPortfolioError =
  | InvalidParametersException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disassociates the specified product from the specified portfolio.
 *
 * A delegated admin is authorized to invoke this command.
 */
export const disassociateProductFromPortfolio: API.OperationMethod<
  DisassociateProductFromPortfolioInput,
  DisassociateProductFromPortfolioOutput,
  DisassociateProductFromPortfolioError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1216, __c76, 0) as any as S.Schema<DisassociateProductFromPortfolioInput>,
  output: __S(1904, __c119, 0) as any as S.Schema<DisassociateProductFromPortfolioOutput>,
  errors: [InvalidParametersException, ResourceInUseException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateProductFromPortfolio",
}));

export type DisassociateServiceActionFromProvisioningArtifactError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disassociates the specified self-service action association from the specified provisioning artifact.
 */
export const disassociateServiceActionFromProvisioningArtifact: API.OperationMethod<
  DisassociateServiceActionFromProvisioningArtifactInput,
  DisassociateServiceActionFromProvisioningArtifactOutput,
  DisassociateServiceActionFromProvisioningArtifactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(
    1232,
    __c77,
    0,
  ) as any as S.Schema<DisassociateServiceActionFromProvisioningArtifactInput>,
  output: __S(
    1904,
    __c119,
    0,
  ) as any as S.Schema<DisassociateServiceActionFromProvisioningArtifactOutput>,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateServiceActionFromProvisioningArtifact",
}));

export type DisassociateTagOptionFromResourceError =
  | ResourceNotFoundException
  | TagOptionNotMigratedException
  | CommonErrors;
/**
 * Disassociates the specified TagOption from the specified resource.
 */
export const disassociateTagOptionFromResource: API.OperationMethod<
  DisassociateTagOptionFromResourceInput,
  DisassociateTagOptionFromResourceOutput,
  DisassociateTagOptionFromResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1248, __c78, 0) as any as S.Schema<DisassociateTagOptionFromResourceInput>,
  output: __S(1904, __c119, 0) as any as S.Schema<DisassociateTagOptionFromResourceOutput>,
  errors: [ResourceNotFoundException, TagOptionNotMigratedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateTagOptionFromResource",
}));

export type EnableAWSOrganizationsAccessError =
  | InvalidStateException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Enable portfolio sharing feature through Organizations. This API will allow Service Catalog to receive updates on your organization in order to sync your shares with the
 * current structure. This API can only be called by the management account in the organization.
 *
 * When you call this API, Service Catalog calls `organizations:EnableAWSServiceAccess` on your behalf so that your shares stay in sync with any changes in your Organizations structure.
 *
 * Note that a delegated administrator is not authorized to invoke `EnableAWSOrganizationsAccess`.
 *
 * If you have previously disabled Organizations access for Service Catalog, and then
 * enable access again, the portfolio access permissions might not sync with the latest changes to
 * the organization structure. Specifically, accounts that you removed from the organization after
 * disabling Service Catalog access, and before you enabled access again, can retain access to the
 * previously shared portfolio. As a result, an account that has been removed from the organization
 * might still be able to create or manage Amazon Web Services resources when it is no longer
 * authorized to do so. Amazon Web Services is working to resolve this issue.
 */
export const enableAWSOrganizationsAccess: API.OperationMethod<
  EnableAWSOrganizationsAccessInput,
  EnableAWSOrganizationsAccessOutput,
  EnableAWSOrganizationsAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1264, __c79, 0) as any as S.Schema<EnableAWSOrganizationsAccessInput>,
  output: __S(1904, __c119, 0) as any as S.Schema<EnableAWSOrganizationsAccessOutput>,
  errors: [InvalidStateException, OperationNotSupportedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableAWSOrganizationsAccess",
}));

export type ExecuteProvisionedProductPlanError =
  | InvalidParametersException
  | InvalidStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Provisions or modifies a product based on the resource changes for the specified plan.
 */
export const executeProvisionedProductPlan: API.OperationMethod<
  ExecuteProvisionedProductPlanInput,
  ExecuteProvisionedProductPlanOutput,
  ExecuteProvisionedProductPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1280, __c80, 0) as any as S.Schema<ExecuteProvisionedProductPlanInput>,
  output: __S(1296, __c81, 0) as any as S.Schema<ExecuteProvisionedProductPlanOutput>,
  errors: [InvalidParametersException, InvalidStateException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteProvisionedProductPlan",
}));

export type ExecuteProvisionedProductServiceActionError =
  | InvalidParametersException
  | InvalidStateException
  | ResourceNotFoundException
  | ProvisionedProductNotFound
  | CommonErrors;
/**
 * Executes a self-service action against a provisioned product.
 */
export const executeProvisionedProductServiceAction: API.OperationMethod<
  ExecuteProvisionedProductServiceActionInput,
  ExecuteProvisionedProductServiceActionOutput,
  ExecuteProvisionedProductServiceActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1313, __c82, 1) as any as S.Schema<ExecuteProvisionedProductServiceActionInput>,
  output: __S(1296, __c81, 0) as any as S.Schema<ExecuteProvisionedProductServiceActionOutput>,
  errors: [
    InvalidParametersException,
    InvalidStateException,
    ResourceNotFoundException,
    ProvisionedProductNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteProvisionedProductServiceAction",
}));

export type GetAWSOrganizationsAccessStatusError =
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Get the Access Status for Organizations portfolio share feature. This API can only be
 * called by the management account in the organization or by a delegated admin.
 */
export const getAWSOrganizationsAccessStatus: API.OperationMethod<
  GetAWSOrganizationsAccessStatusInput,
  GetAWSOrganizationsAccessStatusOutput,
  GetAWSOrganizationsAccessStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1328, __c83, 0) as any as S.Schema<GetAWSOrganizationsAccessStatusInput>,
  output: __S(1329, __c83, 1) as any as S.Schema<GetAWSOrganizationsAccessStatusOutput>,
  errors: [OperationNotSupportedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAWSOrganizationsAccessStatus",
}));

export type GetProvisionedProductOutputsError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * This API takes either a `ProvisonedProductId` or a `ProvisionedProductName`, along with a list of one or more output keys, and responds with the key/value pairs of those outputs.
 */
export const getProvisionedProductOutputs: API.PaginatedOperationMethod<
  GetProvisionedProductOutputsInput,
  GetProvisionedProductOutputsOutput,
  GetProvisionedProductOutputsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1344, __c84, 0) as any as S.Schema<GetProvisionedProductOutputsInput>,
  output: __S(1345, __c84, 1) as any as S.Schema<GetProvisionedProductOutputsOutput>,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProvisionedProductOutputs",
  pagination: {
    inputToken: "PageToken",
    outputToken: "NextPageToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ImportAsProvisionedProductError =
  | DuplicateResourceException
  | InvalidParametersException
  | InvalidStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Requests the import of a resource as an Service Catalog provisioned product
 * that is associated to an Service Catalog product and provisioning artifact.
 * Once imported, all supported governance actions are supported on the provisioned product.
 *
 * Resource import only supports CloudFormation stack ARNs. CloudFormation StackSets,
 * and non-root nested stacks, are not supported.
 *
 * The CloudFormation stack must have one
 * of the following statuses
 * to be imported: `CREATE_COMPLETE`, `UPDATE_COMPLETE`,
 * `UPDATE_ROLLBACK_COMPLETE`, `IMPORT_COMPLETE`, and
 * `IMPORT_ROLLBACK_COMPLETE`.
 *
 * Import of the resource requires that the CloudFormation stack template matches
 * the associated Service Catalog product provisioning artifact.
 *
 * When you import an existing CloudFormation stack
 * into a portfolio, Service Catalog does not apply the product's associated constraints
 * during the import process. Service Catalog applies the constraints
 * after you call `UpdateProvisionedProduct` for the provisioned product.
 *
 * The user or role that performs this operation must have the `cloudformation:GetTemplate`
 * and `cloudformation:DescribeStacks` IAM policy permissions.
 *
 * You can only import one provisioned product at a time. The product's CloudFormation stack must have the
 * `IMPORT_COMPLETE` status before you import another.
 */
export const importAsProvisionedProduct: API.OperationMethod<
  ImportAsProvisionedProductInput,
  ImportAsProvisionedProductOutput,
  ImportAsProvisionedProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1360, __c85, 0) as any as S.Schema<ImportAsProvisionedProductInput>,
  output: __S(1296, __c81, 0) as any as S.Schema<ImportAsProvisionedProductOutput>,
  errors: [
    DuplicateResourceException,
    InvalidParametersException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportAsProvisionedProduct",
}));

export type ListAcceptedPortfolioSharesError =
  | InvalidParametersException
  | OperationNotSupportedException
  | CommonErrors;
/**
 * Lists all imported portfolios for which account-to-account shares were accepted by
 * this account. By specifying the `PortfolioShareType`, you can list portfolios for which
 * organizational shares were accepted by this account.
 */
export const listAcceptedPortfolioShares: API.PaginatedOperationMethod<
  ListAcceptedPortfolioSharesInput,
  ListAcceptedPortfolioSharesOutput,
  ListAcceptedPortfolioSharesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1376, __c86, 0) as any as S.Schema<ListAcceptedPortfolioSharesInput>,
  output: __S(1393, __c87, 1) as any as S.Schema<ListAcceptedPortfolioSharesOutput>,
  errors: [InvalidParametersException, OperationNotSupportedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAcceptedPortfolioShares",
  pagination: {
    inputToken: "PageToken",
    outputToken: "NextPageToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListBudgetsForResourceError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists all the budgets associated to the specified resource.
 */
export const listBudgetsForResource: API.PaginatedOperationMethod<
  ListBudgetsForResourceInput,
  ListBudgetsForResourceOutput,
  ListBudgetsForResourceError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1408, __c88, 0) as any as S.Schema<ListBudgetsForResourceInput>,
  output: __S(1409, __c88, 1) as any as S.Schema<ListBudgetsForResourceOutput>,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBudgetsForResource",
  pagination: {
    inputToken: "PageToken",
    outputToken: "NextPageToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListConstraintsForPortfolioError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the constraints for the specified portfolio and product.
 */
export const listConstraintsForPortfolio: API.PaginatedOperationMethod<
  ListConstraintsForPortfolioInput,
  ListConstraintsForPortfolioOutput,
  ListConstraintsForPortfolioError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1424, __c89, 0) as any as S.Schema<ListConstraintsForPortfolioInput>,
  output: __S(1426, __c89, 2) as any as S.Schema<ListConstraintsForPortfolioOutput>,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConstraintsForPortfolio",
  pagination: {
    inputToken: "PageToken",
    outputToken: "NextPageToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListLaunchPathsError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the paths
 * to the specified product.
 * A path describes
 * how the user
 * gets access
 * to a specified product
 * and is necessary
 * when provisioning a product.
 * A path also determines the constraints
 * that are put on a product.
 * A path is dependent
 * on a specific product, porfolio, and principal.
 *
 * When provisioning a product
 * that's been added
 * to a portfolio,
 * you must grant your user, group, or role access
 * to the portfolio.
 * For more information,
 * see Granting users access
 * in the *Service Catalog User Guide*.
 */
export const listLaunchPaths: API.PaginatedOperationMethod<
  ListLaunchPathsInput,
  ListLaunchPathsOutput,
  ListLaunchPathsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1440, __c90, 0) as any as S.Schema<ListLaunchPathsInput>,
  output: __S(1443, __c90, 3) as any as S.Schema<ListLaunchPathsOutput>,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLaunchPaths",
  pagination: {
    inputToken: "PageToken",
    outputToken: "NextPageToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListOrganizationPortfolioAccessError =
  | InvalidParametersException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the organization nodes that have access to the specified portfolio. This API can
 * only be called by the management account in the organization or by a delegated
 * admin.
 *
 * If a delegated admin is de-registered, they can no longer perform this operation.
 */
export const listOrganizationPortfolioAccess: API.PaginatedOperationMethod<
  ListOrganizationPortfolioAccessInput,
  ListOrganizationPortfolioAccessOutput,
  ListOrganizationPortfolioAccessError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1456, __c91, 0) as any as S.Schema<ListOrganizationPortfolioAccessInput>,
  output: __S(1458, __c91, 2) as any as S.Schema<ListOrganizationPortfolioAccessOutput>,
  errors: [InvalidParametersException, OperationNotSupportedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOrganizationPortfolioAccess",
  pagination: {
    inputToken: "PageToken",
    outputToken: "NextPageToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListPortfolioAccessError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the account IDs that have access to the specified portfolio.
 *
 * A delegated admin can list the accounts that have access to the shared portfolio. Note that if a delegated admin is de-registered, they can no longer perform this operation.
 */
export const listPortfolioAccess: API.PaginatedOperationMethod<
  ListPortfolioAccessInput,
  ListPortfolioAccessOutput,
  ListPortfolioAccessError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1472, __c92, 0) as any as S.Schema<ListPortfolioAccessInput>,
  output: __S(1473, __c92, 1) as any as S.Schema<ListPortfolioAccessOutput>,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPortfolioAccess",
  pagination: {
    inputToken: "PageToken",
    outputToken: "NextPageToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListPortfoliosError = InvalidParametersException | CommonErrors;
/**
 * Lists all portfolios in the catalog.
 */
export const listPortfolios: API.PaginatedOperationMethod<
  ListPortfoliosInput,
  ListPortfoliosOutput,
  ListPortfoliosError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1488, __c93, 0) as any as S.Schema<ListPortfoliosInput>,
  output: __S(1393, __c87, 1) as any as S.Schema<ListPortfoliosOutput>,
  errors: [InvalidParametersException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPortfolios",
  pagination: {
    inputToken: "PageToken",
    outputToken: "NextPageToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListPortfoliosForProductError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists all portfolios that the specified product is associated with.
 */
export const listPortfoliosForProduct: API.PaginatedOperationMethod<
  ListPortfoliosForProductInput,
  ListPortfoliosForProductOutput,
  ListPortfoliosForProductError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1504, __c94, 0) as any as S.Schema<ListPortfoliosForProductInput>,
  output: __S(1393, __c87, 1) as any as S.Schema<ListPortfoliosForProductOutput>,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPortfoliosForProduct",
  pagination: {
    inputToken: "PageToken",
    outputToken: "NextPageToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListPrincipalsForPortfolioError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists all `PrincipalARN`s and corresponding `PrincipalType`s associated with the specified portfolio.
 */
export const listPrincipalsForPortfolio: API.PaginatedOperationMethod<
  ListPrincipalsForPortfolioInput,
  ListPrincipalsForPortfolioOutput,
  ListPrincipalsForPortfolioError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1520, __c95, 0) as any as S.Schema<ListPrincipalsForPortfolioInput>,
  output: __S(1523, __c95, 3) as any as S.Schema<ListPrincipalsForPortfolioOutput>,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPrincipalsForPortfolio",
  pagination: {
    inputToken: "PageToken",
    outputToken: "NextPageToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListProvisionedProductPlansError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the plans for the specified provisioned product or all plans to which the user has access.
 */
export const listProvisionedProductPlans: API.OperationMethod<
  ListProvisionedProductPlansInput,
  ListProvisionedProductPlansOutput,
  ListProvisionedProductPlansError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1536, __c96, 0) as any as S.Schema<ListProvisionedProductPlansInput>,
  output: __S(1539, __c96, 3) as any as S.Schema<ListProvisionedProductPlansOutput>,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProvisionedProductPlans",
}));

export type ListProvisioningArtifactsError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists all provisioning artifacts (also known as versions) for the specified product.
 */
export const listProvisioningArtifacts: API.OperationMethod<
  ListProvisioningArtifactsInput,
  ListProvisioningArtifactsOutput,
  ListProvisioningArtifactsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1568, __c98, 0) as any as S.Schema<ListProvisioningArtifactsInput>,
  output: __S(1570, __c98, 2) as any as S.Schema<ListProvisioningArtifactsOutput>,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProvisioningArtifacts",
}));

export type ListProvisioningArtifactsForServiceActionError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists all provisioning artifacts (also known as versions) for the specified self-service action.
 */
export const listProvisioningArtifactsForServiceAction: API.PaginatedOperationMethod<
  ListProvisioningArtifactsForServiceActionInput,
  ListProvisioningArtifactsForServiceActionOutput,
  ListProvisioningArtifactsForServiceActionError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1584, __c99, 0) as any as S.Schema<ListProvisioningArtifactsForServiceActionInput>,
  output: __S(1587, __c99, 3) as any as S.Schema<ListProvisioningArtifactsForServiceActionOutput>,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProvisioningArtifactsForServiceAction",
  pagination: {
    inputToken: "PageToken",
    outputToken: "NextPageToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListRecordHistoryError = InvalidParametersException | CommonErrors;
/**
 * Lists the specified requests or all performed requests.
 */
export const listRecordHistory: API.OperationMethod<
  ListRecordHistoryInput,
  ListRecordHistoryOutput,
  ListRecordHistoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1600, __c100, 0) as any as S.Schema<ListRecordHistoryInput>,
  output: __S(1602, __c100, 2) as any as S.Schema<ListRecordHistoryOutput>,
  errors: [InvalidParametersException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecordHistory",
}));

export type ListResourcesForTagOptionError =
  | InvalidParametersException
  | ResourceNotFoundException
  | TagOptionNotMigratedException
  | CommonErrors;
/**
 * Lists the resources associated with the specified TagOption.
 */
export const listResourcesForTagOption: API.PaginatedOperationMethod<
  ListResourcesForTagOptionInput,
  ListResourcesForTagOptionOutput,
  ListResourcesForTagOptionError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1616, __c101, 0) as any as S.Schema<ListResourcesForTagOptionInput>,
  output: __S(1619, __c101, 3) as any as S.Schema<ListResourcesForTagOptionOutput>,
  errors: [InvalidParametersException, ResourceNotFoundException, TagOptionNotMigratedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourcesForTagOption",
  pagination: { inputToken: "PageToken", outputToken: "PageToken", pageSize: "PageSize" } as const,
})) as any;

export type ListServiceActionsError = InvalidParametersException | CommonErrors;
/**
 * Lists all self-service actions.
 */
export const listServiceActions: API.PaginatedOperationMethod<
  ListServiceActionsInput,
  ListServiceActionsOutput,
  ListServiceActionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1632, __c102, 0) as any as S.Schema<ListServiceActionsInput>,
  output: __S(1649, __c103, 1) as any as S.Schema<ListServiceActionsOutput>,
  errors: [InvalidParametersException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceActions",
  pagination: {
    inputToken: "PageToken",
    outputToken: "NextPageToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListServiceActionsForProvisioningArtifactError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a paginated list of self-service actions associated with the specified Product ID and Provisioning Artifact ID.
 */
export const listServiceActionsForProvisioningArtifact: API.PaginatedOperationMethod<
  ListServiceActionsForProvisioningArtifactInput,
  ListServiceActionsForProvisioningArtifactOutput,
  ListServiceActionsForProvisioningArtifactError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1664, __c104, 0) as any as S.Schema<ListServiceActionsForProvisioningArtifactInput>,
  output: __S(1649, __c103, 1) as any as S.Schema<ListServiceActionsForProvisioningArtifactOutput>,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceActionsForProvisioningArtifact",
  pagination: {
    inputToken: "PageToken",
    outputToken: "NextPageToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListStackInstancesForProvisionedProductError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns summary information about stack instances that are associated with the specified `CFN_STACKSET` type provisioned product. You can filter for stack instances that are associated with a specific Amazon Web Services account name or Region.
 */
export const listStackInstancesForProvisionedProduct: API.OperationMethod<
  ListStackInstancesForProvisionedProductInput,
  ListStackInstancesForProvisionedProductOutput,
  ListStackInstancesForProvisionedProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1680, __c105, 0) as any as S.Schema<ListStackInstancesForProvisionedProductInput>,
  output: __S(1683, __c105, 3) as any as S.Schema<ListStackInstancesForProvisionedProductOutput>,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStackInstancesForProvisionedProduct",
}));

export type ListTagOptionsError =
  | InvalidParametersException
  | TagOptionNotMigratedException
  | CommonErrors;
/**
 * Lists the specified TagOptions or all TagOptions.
 */
export const listTagOptions: API.PaginatedOperationMethod<
  ListTagOptionsInput,
  ListTagOptionsOutput,
  ListTagOptionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1697, __c106, 1) as any as S.Schema<ListTagOptionsInput>,
  output: __S(1698, __c106, 2) as any as S.Schema<ListTagOptionsOutput>,
  errors: [InvalidParametersException, TagOptionNotMigratedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagOptions",
  pagination: { inputToken: "PageToken", outputToken: "PageToken", pageSize: "PageSize" } as const,
})) as any;

export type NotifyProvisionProductEngineWorkflowResultError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Notifies the result
 * of the provisioning engine execution.
 */
export const notifyProvisionProductEngineWorkflowResult: API.OperationMethod<
  NotifyProvisionProductEngineWorkflowResultInput,
  NotifyProvisionProductEngineWorkflowResultOutput,
  NotifyProvisionProductEngineWorkflowResultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1713, __c107, 1) as any as S.Schema<NotifyProvisionProductEngineWorkflowResultInput>,
  output: __S(1904, __c119, 0) as any as S.Schema<NotifyProvisionProductEngineWorkflowResultOutput>,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "NotifyProvisionProductEngineWorkflowResult",
}));

export type NotifyTerminateProvisionedProductEngineWorkflowResultError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Notifies the result
 * of the terminate engine execution.
 */
export const notifyTerminateProvisionedProductEngineWorkflowResult: API.OperationMethod<
  NotifyTerminateProvisionedProductEngineWorkflowResultInput,
  NotifyTerminateProvisionedProductEngineWorkflowResultOutput,
  NotifyTerminateProvisionedProductEngineWorkflowResultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(
    1728,
    __c108,
    0,
  ) as any as S.Schema<NotifyTerminateProvisionedProductEngineWorkflowResultInput>,
  output: __S(
    1904,
    __c119,
    0,
  ) as any as S.Schema<NotifyTerminateProvisionedProductEngineWorkflowResultOutput>,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "NotifyTerminateProvisionedProductEngineWorkflowResult",
}));

export type NotifyUpdateProvisionedProductEngineWorkflowResultError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Notifies the result
 * of the update engine execution.
 */
export const notifyUpdateProvisionedProductEngineWorkflowResult: API.OperationMethod<
  NotifyUpdateProvisionedProductEngineWorkflowResultInput,
  NotifyUpdateProvisionedProductEngineWorkflowResultOutput,
  NotifyUpdateProvisionedProductEngineWorkflowResultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(
    1744,
    __c109,
    0,
  ) as any as S.Schema<NotifyUpdateProvisionedProductEngineWorkflowResultInput>,
  output: __S(
    1904,
    __c119,
    0,
  ) as any as S.Schema<NotifyUpdateProvisionedProductEngineWorkflowResultOutput>,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "NotifyUpdateProvisionedProductEngineWorkflowResult",
}));

export type ProvisionProductError =
  | DuplicateResourceException
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Provisions the specified product.
 *
 * A provisioned product is a resourced instance
 * of a product.
 * For example,
 * provisioning a product
 * that's based
 * on an CloudFormation template
 * launches an CloudFormation stack and its underlying resources.
 * You can check the status
 * of this request
 * using DescribeRecord.
 *
 * If the request contains a tag key
 * with an empty list
 * of values,
 * there's a tag conflict
 * for that key.
 * Don't include conflicted keys
 * as tags,
 * or this will cause the error "Parameter validation failed: Missing required parameter in Tags[*N*]:*Value*".
 *
 * When provisioning a product
 * that's been added
 * to a portfolio,
 * you must grant your user, group, or role access
 * to the portfolio.
 * For more information,
 * see Granting users access
 * in the *Service Catalog User Guide*.
 */
export const provisionProduct: API.OperationMethod<
  ProvisionProductInput,
  ProvisionProductOutput,
  ProvisionProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1761, __c110, 1) as any as S.Schema<ProvisionProductInput>,
  output: __S(1296, __c81, 0) as any as S.Schema<ProvisionProductOutput>,
  errors: [DuplicateResourceException, InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ProvisionProduct",
}));

export type RejectPortfolioShareError = ResourceNotFoundException | CommonErrors;
/**
 * Rejects an offer to share the specified portfolio.
 */
export const rejectPortfolioShare: API.OperationMethod<
  RejectPortfolioShareInput,
  RejectPortfolioShareOutput,
  RejectPortfolioShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1776, __c111, 0) as any as S.Schema<RejectPortfolioShareInput>,
  output: __S(1904, __c119, 0) as any as S.Schema<RejectPortfolioShareOutput>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectPortfolioShare",
}));

export type ScanProvisionedProductsError = InvalidParametersException | CommonErrors;
/**
 * Lists the provisioned products that are available (not terminated).
 *
 * To use additional filtering, see SearchProvisionedProducts.
 */
export const scanProvisionedProducts: API.OperationMethod<
  ScanProvisionedProductsInput,
  ScanProvisionedProductsOutput,
  ScanProvisionedProductsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1792, __c112, 0) as any as S.Schema<ScanProvisionedProductsInput>,
  output: __S(1794, __c112, 2) as any as S.Schema<ScanProvisionedProductsOutput>,
  errors: [InvalidParametersException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ScanProvisionedProducts",
}));

export type SearchProductsError = InvalidParametersException | CommonErrors;
/**
 * Gets information about the products to which the caller has access.
 */
export const searchProducts: API.PaginatedOperationMethod<
  SearchProductsInput,
  SearchProductsOutput,
  SearchProductsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1808, __c113, 0) as any as S.Schema<SearchProductsInput>,
  output: __S(1813, __c113, 5) as any as S.Schema<SearchProductsOutput>,
  errors: [InvalidParametersException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchProducts",
  pagination: {
    inputToken: "PageToken",
    outputToken: "NextPageToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type SearchProductsAsAdminError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets information about the products for the specified portfolio or all products.
 */
export const searchProductsAsAdmin: API.PaginatedOperationMethod<
  SearchProductsAsAdminInput,
  SearchProductsAsAdminOutput,
  SearchProductsAsAdminError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1840, __c115, 0) as any as S.Schema<SearchProductsAsAdminInput>,
  output: __S(1842, __c115, 2) as any as S.Schema<SearchProductsAsAdminOutput>,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchProductsAsAdmin",
  pagination: {
    inputToken: "PageToken",
    outputToken: "NextPageToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type SearchProvisionedProductsError = InvalidParametersException | CommonErrors;
/**
 * Gets information about the provisioned products that meet the specified criteria.
 */
export const searchProvisionedProducts: API.PaginatedOperationMethod<
  SearchProvisionedProductsInput,
  SearchProvisionedProductsOutput,
  SearchProvisionedProductsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1856, __c116, 0) as any as S.Schema<SearchProvisionedProductsInput>,
  output: __S(1859, __c116, 3) as any as S.Schema<SearchProvisionedProductsOutput>,
  errors: [InvalidParametersException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchProvisionedProducts",
  pagination: {
    inputToken: "PageToken",
    outputToken: "NextPageToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type TerminateProvisionedProductError = ResourceNotFoundException | CommonErrors;
/**
 * Terminates the specified provisioned product.
 *
 * This operation does not delete any records associated with the provisioned product.
 *
 * You can check the status of this request using DescribeRecord.
 */
export const terminateProvisionedProduct: API.OperationMethod<
  TerminateProvisionedProductInput,
  TerminateProvisionedProductOutput,
  TerminateProvisionedProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1872, __c117, 0) as any as S.Schema<TerminateProvisionedProductInput>,
  output: __S(1296, __c81, 0) as any as S.Schema<TerminateProvisionedProductOutput>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateProvisionedProduct",
}));

export type UpdateConstraintError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the specified constraint.
 */
export const updateConstraint: API.OperationMethod<
  UpdateConstraintInput,
  UpdateConstraintOutput,
  UpdateConstraintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1920, __c120, 0) as any as S.Schema<UpdateConstraintInput>,
  output: __S(208, __c13, 0) as any as S.Schema<UpdateConstraintOutput>,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConstraint",
}));

export type UpdatePortfolioError =
  | InvalidParametersException
  | LimitExceededException
  | ResourceNotFoundException
  | TagOptionNotMigratedException
  | CommonErrors;
/**
 * Updates the specified portfolio.
 *
 * You cannot update a product that was shared with you.
 */
export const updatePortfolio: API.OperationMethod<
  UpdatePortfolioInput,
  UpdatePortfolioOutput,
  UpdatePortfolioError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1936, __c121, 0) as any as S.Schema<UpdatePortfolioInput>,
  output: __S(272, __c17, 0) as any as S.Schema<UpdatePortfolioOutput>,
  errors: [
    InvalidParametersException,
    LimitExceededException,
    ResourceNotFoundException,
    TagOptionNotMigratedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePortfolio",
}));

export type UpdatePortfolioShareError =
  | InvalidParametersException
  | InvalidStateException
  | OperationNotSupportedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the specified portfolio share. You can use this API to enable or disable `TagOptions` sharing
 * or Principal sharing for an existing portfolio share.
 *
 * The portfolio share cannot be updated if the `CreatePortfolioShare` operation is `IN_PROGRESS`, as the share is not available to recipient entities.
 * In this case, you must wait for the portfolio share to be completed.
 *
 * You must provide the `accountId` or organization node in the input, but not both.
 *
 * If the portfolio is shared to both an external account and an organization node, and both shares need to be updated, you must invoke `UpdatePortfolioShare` separately for each share type.
 *
 * This API cannot be used for removing the portfolio share. You must use `DeletePortfolioShare` API for that action.
 *
 * When you associate a principal with portfolio, a potential privilege escalation path may occur when that portfolio is
 * then shared with other accounts. For a user in a recipient account who is *not* an Service Catalog Admin,
 * but still has the ability to create Principals (Users/Groups/Roles), that user could create a role that matches a principal
 * name association for the portfolio. Although this user may not know which principal names are associated through
 * Service Catalog, they may be able to guess the user. If this potential escalation path is a concern, then
 * Service Catalog recommends using `PrincipalType` as `IAM`. With this configuration,
 * the `PrincipalARN` must already exist in the recipient account before it can be associated.
 */
export const updatePortfolioShare: API.OperationMethod<
  UpdatePortfolioShareInput,
  UpdatePortfolioShareOutput,
  UpdatePortfolioShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1952, __c122, 0) as any as S.Schema<UpdatePortfolioShareInput>,
  output: __S(1953, __c122, 1) as any as S.Schema<UpdatePortfolioShareOutput>,
  errors: [
    InvalidParametersException,
    InvalidStateException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePortfolioShare",
}));

export type UpdateProductError =
  | InvalidParametersException
  | ResourceNotFoundException
  | TagOptionNotMigratedException
  | CommonErrors;
/**
 * Updates the specified product.
 */
export const updateProduct: API.OperationMethod<
  UpdateProductInput,
  UpdateProductOutput,
  UpdateProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1968, __c123, 0) as any as S.Schema<UpdateProductInput>,
  output: __S(1969, __c123, 1) as any as S.Schema<UpdateProductOutput>,
  errors: [InvalidParametersException, ResourceNotFoundException, TagOptionNotMigratedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProduct",
}));

export type UpdateProvisionedProductError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Requests updates to the configuration of the specified provisioned product.
 *
 * If there are tags associated with the object, they cannot be updated or added.
 * Depending on the specific updates requested, this operation can update with no
 * interruption, with some interruption, or replace the provisioned product entirely.
 *
 * You can check the status of this request using DescribeRecord.
 */
export const updateProvisionedProduct: API.OperationMethod<
  UpdateProvisionedProductInput,
  UpdateProvisionedProductOutput,
  UpdateProvisionedProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1985, __c124, 1) as any as S.Schema<UpdateProvisionedProductInput>,
  output: __S(1296, __c81, 0) as any as S.Schema<UpdateProvisionedProductOutput>,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProvisionedProduct",
}));

export type UpdateProvisionedProductPropertiesError =
  | InvalidParametersException
  | InvalidStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Requests updates to the properties of the specified provisioned product.
 */
export const updateProvisionedProductProperties: API.OperationMethod<
  UpdateProvisionedProductPropertiesInput,
  UpdateProvisionedProductPropertiesOutput,
  UpdateProvisionedProductPropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2000, __c125, 0) as any as S.Schema<UpdateProvisionedProductPropertiesInput>,
  output: __S(2001, __c125, 1) as any as S.Schema<UpdateProvisionedProductPropertiesOutput>,
  errors: [InvalidParametersException, InvalidStateException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProvisionedProductProperties",
}));

export type UpdateProvisioningArtifactError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the specified provisioning artifact (also known as a version) for the specified product.
 *
 * You cannot update a provisioning artifact for a product that was shared with you.
 */
export const updateProvisioningArtifact: API.OperationMethod<
  UpdateProvisioningArtifactInput,
  UpdateProvisioningArtifactOutput,
  UpdateProvisioningArtifactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2016, __c126, 0) as any as S.Schema<UpdateProvisioningArtifactInput>,
  output: __S(512, __c32, 0) as any as S.Schema<UpdateProvisioningArtifactOutput>,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProvisioningArtifact",
}));

export type UpdateServiceActionError =
  | InvalidParametersException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates a self-service action.
 */
export const updateServiceAction: API.OperationMethod<
  UpdateServiceActionInput,
  UpdateServiceActionOutput,
  UpdateServiceActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2032, __c127, 0) as any as S.Schema<UpdateServiceActionInput>,
  output: __S(561, __c35, 1) as any as S.Schema<UpdateServiceActionOutput>,
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServiceAction",
}));

export type UpdateTagOptionError =
  | DuplicateResourceException
  | InvalidParametersException
  | ResourceNotFoundException
  | TagOptionNotMigratedException
  | CommonErrors;
/**
 * Updates the specified TagOption.
 */
export const updateTagOption: API.OperationMethod<
  UpdateTagOptionInput,
  UpdateTagOptionOutput,
  UpdateTagOptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2048, __c128, 0) as any as S.Schema<UpdateTagOptionInput>,
  output: __S(608, __c38, 0) as any as S.Schema<UpdateTagOptionOutput>,
  errors: [
    DuplicateResourceException,
    InvalidParametersException,
    ResourceNotFoundException,
    TagOptionNotMigratedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTagOption",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BudgetName: S.String, ResourceId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AssociateBudgetWithResourceInput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          PortfolioId: S.String,
          PrincipalARN: S.String,
          PrincipalType: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AssociatePrincipalWithPortfolioInput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          ProductId: S.String,
          PortfolioId: S.String,
          SourcePortfolioId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AssociateProductWithPortfolioInput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProductId: S.String,
          ProvisioningArtifactId: S.String,
          ServiceActionId: S.String,
          AcceptLanguage: S.optional(S.String),
          IdempotencyToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AssociateServiceActionWithProvisioningArtifactInput" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceId: S.String, TagOptionId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AssociateTagOptionWithResourceInput" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServiceActionAssociations: __S(97, __c6, 1),
          AcceptLanguage: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "BatchAssociateServiceActionWithProvisioningArtifactInput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServiceActionId: S.String,
          ProductId: S.String,
          ProvisioningArtifactId: S.String,
        }),
      ).annotate({ identifier: "ServiceActionAssociation" });
    case 1:
      return S.Array(__S(96, __c6, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ServiceActionId: S.optional(S.String),
          ProductId: S.optional(S.String),
          ProvisioningArtifactId: S.optional(S.String),
          ErrorCode: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "FailedServiceActionAssociation" });
    case 3:
      return S.Array(__S(98, __c6, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ FailedServiceActionAssociations: S.optional(__S(99, __c6, 3)) }),
      ).annotate({ identifier: "BatchAssociateServiceActionWithProvisioningArtifactOutput" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServiceActionAssociations: __S(97, __c6, 1),
          AcceptLanguage: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "BatchDisassociateServiceActionFromProvisioningArtifactInput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(144, __c9, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          SourceProductArn: S.String,
          TargetProductId: S.optional(S.String),
          TargetProductName: S.optional(S.String),
          SourceProvisioningArtifactIdentifiers: S.optional(__S(128, __c8, 0)),
          CopyOptions: S.optional(__S(160, __c10, 0)),
          IdempotencyToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CopyProductInput" });
    case 2:
      return S.suspend(() => S.Struct({ CopyProductToken: S.optional(S.String) })).annotate({
        identifier: "CopyProductOutput",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          PortfolioId: S.String,
          ProductId: S.String,
          Parameters: S.String,
          Type: S.String,
          Description: S.optional(S.String),
          IdempotencyToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateConstraintInput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConstraintId: S.optional(S.String),
          Type: S.optional(S.String),
          Description: S.optional(S.String),
          Owner: S.optional(S.String),
          ProductId: S.optional(S.String),
          PortfolioId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConstraintDetail" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConstraintDetail: S.optional(__S(192, __c12, 0)),
          ConstraintParameters: S.optional(S.String),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateConstraintOutput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          DisplayName: S.String,
          Description: S.optional(S.String),
          ProviderName: S.String,
          Tags: S.optional(__S(241, __c15, 1)),
          IdempotencyToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreatePortfolioInput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(240, __c15, 0));
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          ARN: S.optional(S.String),
          DisplayName: S.optional(S.String),
          Description: S.optional(S.String),
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ProviderName: S.optional(S.String),
        }),
      ).annotate({ identifier: "PortfolioDetail" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PortfolioDetail: S.optional(__S(256, __c16, 0)),
          Tags: S.optional(__S(241, __c15, 1)),
        }),
      ).annotate({ identifier: "CreatePortfolioOutput" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          PortfolioId: S.String,
          AccountId: S.optional(S.String),
          OrganizationNode: S.optional(__S(320, __c20, 0)),
          ShareTagOptions: S.optional(S.Boolean),
          SharePrincipals: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreatePortfolioShareInput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ PortfolioShareToken: S.optional(S.String) })).annotate({
        identifier: "CreatePortfolioShareOutput",
      });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Type: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "OrganizationNode" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          Name: S.String,
          Owner: S.String,
          Description: S.optional(S.String),
          Distributor: S.optional(S.String),
          SupportDescription: S.optional(S.String),
          SupportEmail: S.optional(S.String),
          SupportUrl: S.optional(S.String),
          ProductType: S.String,
          Tags: S.optional(__S(241, __c15, 1)),
          ProvisioningArtifactParameters: S.optional(__S(352, __c22, 0)),
          IdempotencyToken: S.String.pipe(T.IdempotencyToken()),
          SourceConnection: S.optional(__S(432, __c27, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateProductInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProductViewDetail: S.optional(__S(420, __c26, 4)),
          ProvisioningArtifactDetail: S.optional(__S(384, __c24, 0)),
          Tags: S.optional(__S(241, __c15, 1)),
        }),
      ).annotate({ identifier: "CreateProductOutput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Info: S.optional(__S(368, __c23, 0)),
          Type: S.optional(S.String),
          DisableTemplateValidation: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ProvisioningArtifactProperties" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Type: S.optional(S.String),
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Active: S.optional(S.Boolean),
          Guidance: S.optional(S.String),
          SourceRevision: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProvisioningArtifactDetail" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          ProductId: S.optional(S.String),
          Name: S.optional(S.String),
          Owner: S.optional(S.String),
          ShortDescription: S.optional(S.String),
          Type: S.optional(S.String),
          Distributor: S.optional(S.String),
          HasDefaultPath: S.optional(S.Boolean),
          SupportEmail: S.optional(S.String),
          SupportDescription: S.optional(S.String),
          SupportUrl: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProductViewSummary" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConnectionArn: S.String,
          Repository: S.String,
          Branch: S.String,
          ArtifactPath: S.String,
        }),
      ).annotate({ identifier: "CodeStarParameters" });
    case 1:
      return S.suspend(() => S.Struct({ CodeStar: S.optional(__S(416, __c26, 0)) })).annotate({
        identifier: "SourceConnectionParameters",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          LastSyncTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastSyncStatus: S.optional(S.String),
          LastSyncStatusMessage: S.optional(S.String),
          LastSuccessfulSyncTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastSuccessfulSyncProvisioningArtifactId: S.optional(S.String),
        }),
      ).annotate({ identifier: "LastSync" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          ConnectionParameters: S.optional(__S(417, __c26, 1)),
          LastSync: S.optional(__S(418, __c26, 2)),
        }),
      ).annotate({ identifier: "SourceConnectionDetail" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          ProductViewSummary: S.optional(__S(400, __c25, 0)),
          Status: S.optional(S.String),
          ProductARN: S.optional(S.String),
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SourceConnection: S.optional(__S(419, __c26, 3)),
        }),
      ).annotate({ identifier: "ProductViewDetail" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Type: S.optional(S.String), ConnectionParameters: __S(417, __c26, 1) }),
      ).annotate({ identifier: "SourceConnection" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          PlanName: S.String,
          PlanType: S.String,
          NotificationArns: S.optional(__S(464, __c29, 0)),
          PathId: S.optional(S.String),
          ProductId: S.String,
          ProvisionedProductName: S.String,
          ProvisioningArtifactId: S.String,
          ProvisioningParameters: S.optional(__S(481, __c30, 1)),
          IdempotencyToken: S.String.pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(241, __c15, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateProvisionedProductPlanInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PlanName: S.optional(S.String),
          PlanId: S.optional(S.String),
          ProvisionProductId: S.optional(S.String),
          ProvisionedProductName: S.optional(S.String),
          ProvisioningArtifactId: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateProvisionedProductPlanOutput" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Key: S.optional(S.String),
          Value: S.optional(S.String),
          UsePreviousValue: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "UpdateProvisioningParameter" });
    case 1:
      return S.Array(__S(480, __c30, 0));
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          ProductId: S.String,
          Parameters: __S(352, __c22, 0),
          IdempotencyToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateProvisioningArtifactInput" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProvisioningArtifactDetail: S.optional(__S(384, __c24, 0)),
          Info: S.optional(__S(368, __c23, 0)),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateProvisioningArtifactOutput" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          DefinitionType: S.String,
          Definition: __S(144, __c9, 0),
          Description: S.optional(S.String),
          AcceptLanguage: S.optional(S.String),
          IdempotencyToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateServiceActionInput" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          DefinitionType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServiceActionSummary" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServiceActionSummary: S.optional(__S(544, __c34, 0)),
          Definition: S.optional(__S(144, __c9, 0)),
        }),
      ).annotate({ identifier: "ServiceActionDetail" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ServiceActionDetail: S.optional(__S(560, __c35, 0)) }),
      ).annotate({ identifier: "CreateServiceActionOutput" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.String, Value: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateTagOptionInput" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Key: S.optional(S.String),
          Value: S.optional(S.String),
          Active: S.optional(S.Boolean),
          Id: S.optional(S.String),
          Owner: S.optional(S.String),
        }),
      ).annotate({ identifier: "TagOptionDetail" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TagOptionDetail: S.optional(__S(592, __c37, 0)) }),
      ).annotate({ identifier: "CreateTagOptionOutput" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AcceptLanguage: S.optional(S.String), Id: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteConstraintInput" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AcceptLanguage: S.optional(S.String), Id: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeletePortfolioInput" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          PortfolioId: S.String,
          AccountId: S.optional(S.String),
          OrganizationNode: S.optional(__S(320, __c20, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeletePortfolioShareInput" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AcceptLanguage: S.optional(S.String), Id: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteProductInput" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          PlanId: S.String,
          IgnoreErrors: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteProvisionedProductPlanInput" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          ProductId: S.String,
          ProvisioningArtifactId: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteProvisioningArtifactInput" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          AcceptLanguage: S.optional(S.String),
          IdempotencyToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteServiceActionInput" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpQuery("id")) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteTagOptionInput" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AcceptLanguage: S.optional(S.String), Id: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeConstraintInput" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AcceptLanguage: S.optional(S.String), CopyProductToken: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeCopyProductStatusInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CopyProductStatus: S.optional(S.String),
          TargetProductId: S.optional(S.String),
          StatusDetail: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeCopyProductStatusOutput" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AcceptLanguage: S.optional(S.String), Id: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribePortfolioInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PortfolioDetail: S.optional(__S(256, __c16, 0)),
          Tags: S.optional(__S(241, __c15, 1)),
          TagOptions: S.optional(__S(816, __c51, 0)),
          Budgets: S.optional(__S(801, __c50, 1)),
        }),
      ).annotate({ identifier: "DescribePortfolioOutput" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ BudgetName: S.optional(S.String) })).annotate({
        identifier: "BudgetDetail",
      });
    case 1:
      return S.Array(__S(800, __c50, 0));
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(592, __c37, 0));
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PortfolioId: S.String,
          Type: S.String,
          PageToken: S.optional(S.String),
          PageSize: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribePortfolioSharesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PrincipalId: S.optional(S.String),
          Type: S.optional(S.String),
          Accepted: S.optional(S.Boolean),
          ShareTagOptions: S.optional(S.Boolean),
          SharePrincipals: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "PortfolioShareDetail" });
    case 2:
      return S.Array(__S(833, __c52, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextPageToken: S.optional(S.String),
          PortfolioShareDetails: S.optional(__S(834, __c52, 2)),
        }),
      ).annotate({ identifier: "DescribePortfolioSharesOutput" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PortfolioShareToken: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribePortfolioShareStatusInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Accounts: S.optional(__S(464, __c29, 0)),
          Message: S.optional(S.String),
          Error: S.optional(S.String),
        }),
      ).annotate({ identifier: "ShareError" });
    case 2:
      return S.Array(__S(849, __c53, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          SuccessfulShares: S.optional(__S(464, __c29, 0)),
          ShareErrors: S.optional(__S(850, __c53, 2)),
        }),
      ).annotate({ identifier: "ShareDetails" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          PortfolioShareToken: S.optional(S.String),
          PortfolioId: S.optional(S.String),
          OrganizationNodeValue: S.optional(S.String),
          Status: S.optional(S.String),
          ShareDetails: S.optional(__S(851, __c53, 3)),
        }),
      ).annotate({ identifier: "DescribePortfolioShareStatusOutput" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          Id: S.optional(S.String),
          Name: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeProductInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Id: S.optional(S.String), Name: S.optional(S.String) }),
      ).annotate({ identifier: "LaunchPath" });
    case 2:
      return S.Array(__S(865, __c54, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ProductViewSummary: S.optional(__S(400, __c25, 0)),
          ProvisioningArtifacts: S.optional(__S(880, __c55, 0)),
          Budgets: S.optional(__S(801, __c50, 1)),
          LaunchPaths: S.optional(__S(866, __c54, 2)),
        }),
      ).annotate({ identifier: "DescribeProductOutput" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(896, __c56, 0));
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Guidance: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProvisioningArtifact" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          SourcePortfolioId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeProductAsAdminInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ProvisioningArtifactMetadata: S.optional(__S(368, __c23, 0)),
        }),
      ).annotate({ identifier: "ProvisioningArtifactSummary" });
    case 2:
      return S.Array(__S(913, __c57, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ProductViewDetail: S.optional(__S(420, __c26, 4)),
          ProvisioningArtifactSummaries: S.optional(__S(914, __c57, 2)),
          Tags: S.optional(__S(241, __c15, 1)),
          TagOptions: S.optional(__S(816, __c51, 0)),
          Budgets: S.optional(__S(801, __c50, 1)),
        }),
      ).annotate({ identifier: "DescribeProductAsAdminOutput" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AcceptLanguage: S.optional(S.String), Id: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeProductViewInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProductViewSummary: S.optional(__S(400, __c25, 0)),
          ProvisioningArtifacts: S.optional(__S(880, __c55, 0)),
        }),
      ).annotate({ identifier: "DescribeProductViewOutput" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          Id: S.optional(S.String),
          Name: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeProvisionedProductInput" });
    case 1:
      return S.suspend(() => S.Struct({ Name: S.optional(S.String) })).annotate({
        identifier: "CloudWatchDashboard",
      });
    case 2:
      return S.Array(__S(945, __c59, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ProvisionedProductDetail: S.optional(__S(960, __c60, 0)),
          CloudWatchDashboards: S.optional(__S(946, __c59, 2)),
        }),
      ).annotate({ identifier: "DescribeProvisionedProductOutput" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Arn: S.optional(S.String),
          Type: S.optional(S.String),
          Id: S.optional(S.String),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          IdempotencyToken: S.optional(S.String),
          LastRecordId: S.optional(S.String),
          LastProvisioningRecordId: S.optional(S.String),
          LastSuccessfulProvisioningRecordId: S.optional(S.String),
          ProductId: S.optional(S.String),
          ProvisioningArtifactId: S.optional(S.String),
          LaunchRoleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProvisionedProductDetail" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          PlanId: S.String,
          PageSize: S.optional(S.Number),
          PageToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeProvisionedProductPlanInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          PathId: S.optional(S.String),
          ProductId: S.optional(S.String),
          PlanName: S.optional(S.String),
          PlanId: S.optional(S.String),
          ProvisionProductId: S.optional(S.String),
          ProvisionProductName: S.optional(S.String),
          PlanType: S.optional(S.String),
          ProvisioningArtifactId: S.optional(S.String),
          Status: S.optional(S.String),
          UpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          NotificationArns: S.optional(__S(464, __c29, 0)),
          ProvisioningParameters: S.optional(__S(481, __c30, 1)),
          Tags: S.optional(__S(241, __c15, 1)),
          StatusMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProvisionedProductPlanDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Attribute: S.optional(S.String),
          Name: S.optional(S.String),
          RequiresRecreation: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResourceTargetDefinition" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Target: S.optional(__S(978, __c61, 2)),
          Evaluation: S.optional(S.String),
          CausingEntity: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResourceChangeDetail" });
    case 4:
      return S.Array(__S(979, __c61, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Action: S.optional(S.String),
          LogicalResourceId: S.optional(S.String),
          PhysicalResourceId: S.optional(S.String),
          ResourceType: S.optional(S.String),
          Replacement: S.optional(S.String),
          Scope: S.optional(__S(160, __c10, 0)),
          Details: S.optional(__S(980, __c61, 4)),
        }),
      ).annotate({ identifier: "ResourceChange" });
    case 6:
      return S.Array(__S(981, __c61, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          ProvisionedProductPlanDetails: S.optional(__S(977, __c61, 1)),
          ResourceChanges: S.optional(__S(982, __c61, 6)),
          NextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeProvisionedProductPlanOutput" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          ProvisioningArtifactId: S.optional(S.String),
          ProductId: S.optional(S.String),
          ProvisioningArtifactName: S.optional(S.String),
          ProductName: S.optional(S.String),
          Verbose: S.optional(S.Boolean),
          IncludeProvisioningArtifactParameters: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeProvisioningArtifactInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProvisioningArtifactDetail: S.optional(__S(384, __c24, 0)),
          Info: S.optional(__S(368, __c23, 0)),
          Status: S.optional(S.String),
          ProvisioningArtifactParameters: S.optional(__S(1010, __c63, 2)),
        }),
      ).annotate({ identifier: "DescribeProvisioningArtifactOutput" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AllowedValues: S.optional(__S(464, __c29, 0)),
          AllowedPattern: S.optional(S.String),
          ConstraintDescription: S.optional(S.String),
          MaxLength: S.optional(S.String),
          MinLength: S.optional(S.String),
          MaxValue: S.optional(S.String),
          MinValue: S.optional(S.String),
        }),
      ).annotate({ identifier: "ParameterConstraints" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ParameterKey: S.optional(S.String),
          DefaultValue: S.optional(S.String),
          ParameterType: S.optional(S.String),
          IsNoEcho: S.optional(S.Boolean),
          Description: S.optional(S.String),
          ParameterConstraints: S.optional(__S(1008, __c63, 0)),
        }),
      ).annotate({ identifier: "ProvisioningArtifactParameter" });
    case 2:
      return S.Array(__S(1009, __c63, 1));
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          ProductId: S.optional(S.String),
          ProductName: S.optional(S.String),
          ProvisioningArtifactId: S.optional(S.String),
          ProvisioningArtifactName: S.optional(S.String),
          PathId: S.optional(S.String),
          PathName: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeProvisioningParametersInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Type: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "UsageInstruction" });
    case 2:
      return S.Array(__S(1025, __c64, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Values: S.optional(__S(464, __c29, 0)) }),
      ).annotate({ identifier: "TagOptionSummary" });
    case 4:
      return S.Array(__S(1027, __c64, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          StackSetAccounts: S.optional(__S(464, __c29, 0)),
          StackSetRegions: S.optional(__S(464, __c29, 0)),
        }),
      ).annotate({ identifier: "ProvisioningArtifactPreferences" });
    case 6:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Description: S.optional(S.String) }),
      ).annotate({ identifier: "ProvisioningArtifactOutput" });
    case 7:
      return S.Array(__S(1030, __c64, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          ProvisioningArtifactParameters: S.optional(__S(1010, __c63, 2)),
          ConstraintSummaries: S.optional(__S(1041, __c65, 1)),
          UsageInstructions: S.optional(__S(1026, __c64, 2)),
          TagOptions: S.optional(__S(1028, __c64, 4)),
          ProvisioningArtifactPreferences: S.optional(__S(1029, __c64, 5)),
          ProvisioningArtifactOutputs: S.optional(__S(1031, __c64, 7)),
          ProvisioningArtifactOutputKeys: S.optional(__S(1031, __c64, 7)),
        }),
      ).annotate({ identifier: "DescribeProvisioningParametersOutput" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Type: S.optional(S.String), Description: S.optional(S.String) }),
      ).annotate({ identifier: "ConstraintSummary" });
    case 1:
      return S.Array(__S(1040, __c65, 0));
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          Id: S.String,
          PageToken: S.optional(S.String),
          PageSize: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeRecordInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RecordDetail: S.optional(__S(1091, __c68, 3)),
          RecordOutputs: S.optional(__S(1105, __c69, 1)),
          NextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeRecordOutput" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "RecordTag" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Code: S.optional(S.String), Description: S.optional(S.String) }),
      ).annotate({ identifier: "RecordError" });
    case 1:
      return S.Array(__S(1088, __c68, 0));
    case 2:
      return S.Array(__S(1072, __c67, 0));
    case 3:
      return S.suspend(() =>
        S.Struct({
          RecordId: S.optional(S.String),
          ProvisionedProductName: S.optional(S.String),
          Status: S.optional(S.String),
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ProvisionedProductType: S.optional(S.String),
          RecordType: S.optional(S.String),
          ProvisionedProductId: S.optional(S.String),
          ProductId: S.optional(S.String),
          ProvisioningArtifactId: S.optional(S.String),
          PathId: S.optional(S.String),
          RecordErrors: S.optional(__S(1089, __c68, 1)),
          RecordTags: S.optional(__S(1090, __c68, 2)),
          LaunchRoleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "RecordDetail" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OutputKey: S.optional(S.String),
          OutputValue: S.optional(S.String),
          Description: S.optional(S.String),
        }),
      ).annotate({ identifier: "RecordOutput" });
    case 1:
      return S.Array(__S(1104, __c69, 0));
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String, AcceptLanguage: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeServiceActionInput" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProvisionedProductId: S.String,
          ServiceActionId: S.String,
          AcceptLanguage: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeServiceActionExecutionParametersInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Type: S.optional(S.String),
          DefaultValues: S.optional(__S(464, __c29, 0)),
        }),
      ).annotate({ identifier: "ExecutionParameter" });
    case 2:
      return S.Array(__S(1137, __c71, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ ServiceActionParameters: S.optional(__S(1138, __c71, 2)) }),
      ).annotate({ identifier: "DescribeServiceActionExecutionParametersOutput" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpQuery("id")) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeTagOptionInput" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisableAWSOrganizationsAccessInput" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BudgetName: S.String, ResourceId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisassociateBudgetFromResourceInput" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          PortfolioId: S.String,
          PrincipalARN: S.String,
          PrincipalType: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DisassociatePrincipalFromPortfolioInput" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          ProductId: S.String,
          PortfolioId: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DisassociateProductFromPortfolioInput" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProductId: S.String,
          ProvisioningArtifactId: S.String,
          ServiceActionId: S.String,
          AcceptLanguage: S.optional(S.String),
          IdempotencyToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DisassociateServiceActionFromProvisioningArtifactInput" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceId: S.String.pipe(T.HttpQuery("resourceId")),
          TagOptionId: S.String.pipe(T.HttpQuery("tagOptionId")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DisassociateTagOptionFromResourceInput" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "EnableAWSOrganizationsAccessInput" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          PlanId: S.String,
          IdempotencyToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ExecuteProvisionedProductPlanInput" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ RecordDetail: S.optional(__S(1091, __c68, 3)) })).annotate({
        identifier: "ExecuteProvisionedProductPlanOutput",
      });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ __S(464, __c29, 0).pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProvisionedProductId: S.String,
          ServiceActionId: S.String,
          ExecuteToken: S.String.pipe(T.IdempotencyToken()),
          AcceptLanguage: S.optional(S.String),
          Parameters: S.optional(__S(1312, __c82, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ExecuteProvisionedProductServiceActionInput" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAWSOrganizationsAccessStatusInput" });
    case 1:
      return S.suspend(() => S.Struct({ AccessStatus: S.optional(S.String) })).annotate({
        identifier: "GetAWSOrganizationsAccessStatusOutput",
      });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          ProvisionedProductId: S.optional(S.String),
          ProvisionedProductName: S.optional(S.String),
          OutputKeys: S.optional(__S(464, __c29, 0)),
          PageSize: S.optional(S.Number),
          PageToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetProvisionedProductOutputsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Outputs: S.optional(__S(1105, __c69, 1)), NextPageToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetProvisionedProductOutputsOutput" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          ProductId: S.String,
          ProvisioningArtifactId: S.String,
          ProvisionedProductName: S.String,
          PhysicalId: S.String,
          IdempotencyToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ImportAsProvisionedProductInput" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          PageToken: S.optional(S.String),
          PageSize: S.optional(S.Number),
          PortfolioShareType: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAcceptedPortfolioSharesInput" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(256, __c16, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          PortfolioDetails: S.optional(__S(1392, __c87, 0)),
          NextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAcceptedPortfolioSharesOutput" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          ResourceId: S.String,
          PageSize: S.optional(S.Number),
          PageToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListBudgetsForResourceInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Budgets: S.optional(__S(801, __c50, 1)), NextPageToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListBudgetsForResourceOutput" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          PortfolioId: S.String,
          ProductId: S.optional(S.String),
          PageSize: S.optional(S.Number),
          PageToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListConstraintsForPortfolioInput" });
    case 1:
      return S.Array(__S(192, __c12, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ConstraintDetails: S.optional(__S(1425, __c89, 1)),
          NextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListConstraintsForPortfolioOutput" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          ProductId: S.String,
          PageSize: S.optional(S.Number),
          PageToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListLaunchPathsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          ConstraintSummaries: S.optional(__S(1041, __c65, 1)),
          Tags: S.optional(__S(241, __c15, 1)),
          Name: S.optional(S.String),
        }),
      ).annotate({ identifier: "LaunchPathSummary" });
    case 2:
      return S.Array(__S(1441, __c90, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          LaunchPathSummaries: S.optional(__S(1442, __c90, 2)),
          NextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListLaunchPathsOutput" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          PortfolioId: S.String,
          OrganizationNodeType: S.String,
          PageToken: S.optional(S.String),
          PageSize: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListOrganizationPortfolioAccessInput" });
    case 1:
      return S.Array(__S(320, __c20, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          OrganizationNodes: S.optional(__S(1457, __c91, 1)),
          NextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListOrganizationPortfolioAccessOutput" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          PortfolioId: S.String,
          OrganizationParentId: S.optional(S.String),
          PageToken: S.optional(S.String),
          PageSize: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListPortfolioAccessInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccountIds: S.optional(__S(464, __c29, 0)),
          NextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListPortfolioAccessOutput" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          PageToken: S.optional(S.String),
          PageSize: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListPortfoliosInput" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          ProductId: S.String,
          PageToken: S.optional(S.String),
          PageSize: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListPortfoliosForProductInput" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          PortfolioId: S.String,
          PageSize: S.optional(S.Number),
          PageToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListPrincipalsForPortfolioInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ PrincipalARN: S.optional(S.String), PrincipalType: S.optional(S.String) }),
      ).annotate({ identifier: "Principal" });
    case 2:
      return S.Array(__S(1521, __c95, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Principals: S.optional(__S(1522, __c95, 2)),
          NextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListPrincipalsForPortfolioOutput" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          ProvisionProductId: S.optional(S.String),
          PageSize: S.optional(S.Number),
          PageToken: S.optional(S.String),
          AccessLevelFilter: S.optional(__S(1552, __c97, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListProvisionedProductPlansInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PlanName: S.optional(S.String),
          PlanId: S.optional(S.String),
          ProvisionProductId: S.optional(S.String),
          ProvisionProductName: S.optional(S.String),
          PlanType: S.optional(S.String),
          ProvisioningArtifactId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProvisionedProductPlanSummary" });
    case 2:
      return S.Array(__S(1537, __c96, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ProvisionedProductPlans: S.optional(__S(1538, __c96, 2)),
          NextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListProvisionedProductPlansOutput" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "AccessLevelFilter" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AcceptLanguage: S.optional(S.String), ProductId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListProvisioningArtifactsInput" });
    case 1:
      return S.Array(__S(384, __c24, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ProvisioningArtifactDetails: S.optional(__S(1569, __c98, 1)),
          NextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListProvisioningArtifactsOutput" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServiceActionId: S.String,
          PageSize: S.optional(S.Number),
          PageToken: S.optional(S.String),
          AcceptLanguage: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListProvisioningArtifactsForServiceActionInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProductViewSummary: S.optional(__S(400, __c25, 0)),
          ProvisioningArtifact: S.optional(__S(896, __c56, 0)),
        }),
      ).annotate({ identifier: "ProvisioningArtifactView" });
    case 2:
      return S.Array(__S(1585, __c99, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ProvisioningArtifactViews: S.optional(__S(1586, __c99, 2)),
          NextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListProvisioningArtifactsForServiceActionOutput" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          AccessLevelFilter: S.optional(__S(1552, __c97, 0)),
          SearchFilter: S.optional(__S(1072, __c67, 0)),
          PageSize: S.optional(S.Number),
          PageToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListRecordHistoryInput" });
    case 1:
      return S.Array(__S(1091, __c68, 3));
    case 2:
      return S.suspend(() =>
        S.Struct({
          RecordDetails: S.optional(__S(1601, __c100, 1)),
          NextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListRecordHistoryOutput" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TagOptionId: S.String.pipe(T.HttpQuery("tagOptionId")),
          ResourceType: S.optional(S.String).pipe(T.HttpQuery("resourceType")),
          PageSize: S.optional(S.Number).pipe(T.HttpQuery("pageSize")),
          PageToken: S.optional(S.String).pipe(T.HttpQuery("pageToken")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListResourcesForTagOptionInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          ARN: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ResourceDetail" });
    case 2:
      return S.Array(__S(1617, __c101, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ResourceDetails: S.optional(__S(1618, __c101, 2)),
          PageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListResourcesForTagOptionOutput" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          PageSize: S.optional(S.Number),
          PageToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListServiceActionsInput" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(544, __c34, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          ServiceActionSummaries: S.optional(__S(1648, __c103, 0)),
          NextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListServiceActionsOutput" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProductId: S.String,
          ProvisioningArtifactId: S.String,
          PageSize: S.optional(S.Number),
          PageToken: S.optional(S.String),
          AcceptLanguage: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListServiceActionsForProvisioningArtifactInput" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          ProvisionedProductId: S.String,
          PageToken: S.optional(S.String),
          PageSize: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListStackInstancesForProvisionedProductInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Account: S.optional(S.String),
          Region: S.optional(S.String),
          StackInstanceStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "StackInstance" });
    case 2:
      return S.Array(__S(1681, __c105, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          StackInstances: S.optional(__S(1682, __c105, 2)),
          NextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListStackInstancesForProvisionedProductOutput" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Key: S.optional(S.String),
          Value: S.optional(S.String),
          Active: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ListTagOptionsFilters" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(1696, __c106, 0)),
          PageSize: S.optional(S.Number),
          PageToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTagOptionsInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          TagOptionDetails: S.optional(__S(816, __c51, 0)),
          PageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListTagOptionsOutput" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ UniqueTag: S.optional(__S(1072, __c67, 0)) })).annotate({
        identifier: "EngineWorkflowResourceIdentifier",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          WorkflowToken: S.String,
          RecordId: S.String,
          Status: S.String,
          FailureReason: S.optional(S.String),
          ResourceIdentifier: S.optional(__S(1712, __c107, 0)),
          Outputs: S.optional(__S(1105, __c69, 1)),
          IdempotencyToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "NotifyProvisionProductEngineWorkflowResultInput" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WorkflowToken: S.String,
          RecordId: S.String,
          Status: S.String,
          FailureReason: S.optional(S.String),
          IdempotencyToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "NotifyTerminateProvisionedProductEngineWorkflowResultInput" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WorkflowToken: S.String,
          RecordId: S.String,
          Status: S.String,
          FailureReason: S.optional(S.String),
          Outputs: S.optional(__S(1105, __c69, 1)),
          IdempotencyToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "NotifyUpdateProvisionedProductEngineWorkflowResultInput" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StackSetAccounts: S.optional(__S(464, __c29, 0)),
          StackSetRegions: S.optional(__S(464, __c29, 0)),
          StackSetFailureToleranceCount: S.optional(S.Number),
          StackSetFailureTolerancePercentage: S.optional(S.Number),
          StackSetMaxConcurrencyCount: S.optional(S.Number),
          StackSetMaxConcurrencyPercentage: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ProvisioningPreferences" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          ProductId: S.optional(S.String),
          ProductName: S.optional(S.String),
          ProvisioningArtifactId: S.optional(S.String),
          ProvisioningArtifactName: S.optional(S.String),
          PathId: S.optional(S.String),
          PathName: S.optional(S.String),
          ProvisionedProductName: S.String,
          ProvisioningParameters: S.optional(__S(1090, __c68, 2)),
          ProvisioningPreferences: S.optional(__S(1760, __c110, 0)),
          Tags: S.optional(__S(241, __c15, 1)),
          NotificationArns: S.optional(__S(464, __c29, 0)),
          ProvisionToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ProvisionProductInput" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          PortfolioId: S.String,
          PortfolioShareType: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RejectPortfolioShareInput" });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          AccessLevelFilter: S.optional(__S(1552, __c97, 0)),
          PageSize: S.optional(S.Number),
          PageToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ScanProvisionedProductsInput" });
    case 1:
      return S.Array(__S(960, __c60, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ProvisionedProducts: S.optional(__S(1793, __c112, 1)),
          NextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ScanProvisionedProductsOutput" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          Filters: S.optional(__S(1824, __c114, 0)),
          PageSize: S.optional(S.Number),
          SortBy: S.optional(S.String),
          SortOrder: S.optional(S.String),
          PageToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SearchProductsInput" });
    case 1:
      return S.Array(__S(400, __c25, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Value: S.optional(S.String), ApproximateCount: S.optional(S.Number) }),
      ).annotate({ identifier: "ProductViewAggregationValue" });
    case 3:
      return S.Array(__S(1810, __c113, 2));
    case 4:
      return S.Record(S.String, /*@__PURE__*/ __S(1811, __c113, 3).pipe(S.optional));
    case 5:
      return S.suspend(() =>
        S.Struct({
          ProductViewSummaries: S.optional(__S(1809, __c113, 1)),
          ProductViewAggregations: S.optional(__S(1812, __c113, 4)),
          NextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "SearchProductsOutput" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ __S(464, __c29, 0).pipe(S.optional));
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          PortfolioId: S.optional(S.String),
          Filters: S.optional(__S(1824, __c114, 0)),
          SortBy: S.optional(S.String),
          SortOrder: S.optional(S.String),
          PageToken: S.optional(S.String),
          PageSize: S.optional(S.Number),
          ProductSource: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SearchProductsAsAdminInput" });
    case 1:
      return S.Array(__S(420, __c26, 4));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ProductViewDetails: S.optional(__S(1841, __c115, 1)),
          NextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "SearchProductsAsAdminOutput" });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          AccessLevelFilter: S.optional(__S(1552, __c97, 0)),
          Filters: S.optional(__S(1824, __c114, 0)),
          SortBy: S.optional(S.String),
          SortOrder: S.optional(S.String),
          PageSize: S.optional(S.Number),
          PageToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SearchProvisionedProductsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Arn: S.optional(S.String),
          Type: S.optional(S.String),
          Id: S.optional(S.String),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          IdempotencyToken: S.optional(S.String),
          LastRecordId: S.optional(S.String),
          LastProvisioningRecordId: S.optional(S.String),
          LastSuccessfulProvisioningRecordId: S.optional(S.String),
          Tags: S.optional(__S(241, __c15, 1)),
          PhysicalId: S.optional(S.String),
          ProductId: S.optional(S.String),
          ProductName: S.optional(S.String),
          ProvisioningArtifactId: S.optional(S.String),
          ProvisioningArtifactName: S.optional(S.String),
          UserArn: S.optional(S.String),
          UserArnSession: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProvisionedProductAttribute" });
    case 2:
      return S.Array(__S(1857, __c116, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ProvisionedProducts: S.optional(__S(1858, __c116, 2)),
          TotalResultsCount: S.optional(S.Number),
          NextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "SearchProvisionedProductsOutput" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProvisionedProductName: S.optional(S.String),
          ProvisionedProductId: S.optional(S.String),
          TerminateToken: S.String.pipe(T.IdempotencyToken()),
          IgnoreErrors: S.optional(S.Boolean),
          AcceptLanguage: S.optional(S.String),
          RetainPhysicalResources: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "TerminateProvisionedProductInput" });
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          PortfolioId: S.String,
          PortfolioShareType: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AcceptPortfolioShareInput" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "AcceptPortfolioShareOutput" });
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          Id: S.String,
          Description: S.optional(S.String),
          Parameters: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateConstraintInput" });
  }
}
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          Id: S.String,
          DisplayName: S.optional(S.String),
          Description: S.optional(S.String),
          ProviderName: S.optional(S.String),
          AddTags: S.optional(__S(241, __c15, 1)),
          RemoveTags: S.optional(__S(464, __c29, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdatePortfolioInput" });
  }
}
function __c122(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          PortfolioId: S.String,
          AccountId: S.optional(S.String),
          OrganizationNode: S.optional(__S(320, __c20, 0)),
          ShareTagOptions: S.optional(S.Boolean),
          SharePrincipals: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdatePortfolioShareInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ PortfolioShareToken: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "UpdatePortfolioShareOutput" });
  }
}
function __c123(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          Id: S.String,
          Name: S.optional(S.String),
          Owner: S.optional(S.String),
          Description: S.optional(S.String),
          Distributor: S.optional(S.String),
          SupportDescription: S.optional(S.String),
          SupportEmail: S.optional(S.String),
          SupportUrl: S.optional(S.String),
          AddTags: S.optional(__S(241, __c15, 1)),
          RemoveTags: S.optional(__S(464, __c29, 0)),
          SourceConnection: S.optional(__S(432, __c27, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateProductInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProductViewDetail: S.optional(__S(420, __c26, 4)),
          Tags: S.optional(__S(241, __c15, 1)),
        }),
      ).annotate({ identifier: "UpdateProductOutput" });
  }
}
function __c124(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StackSetAccounts: S.optional(__S(464, __c29, 0)),
          StackSetRegions: S.optional(__S(464, __c29, 0)),
          StackSetFailureToleranceCount: S.optional(S.Number),
          StackSetFailureTolerancePercentage: S.optional(S.Number),
          StackSetMaxConcurrencyCount: S.optional(S.Number),
          StackSetMaxConcurrencyPercentage: S.optional(S.Number),
          StackSetOperationType: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateProvisioningPreferences" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          ProvisionedProductName: S.optional(S.String),
          ProvisionedProductId: S.optional(S.String),
          ProductId: S.optional(S.String),
          ProductName: S.optional(S.String),
          ProvisioningArtifactId: S.optional(S.String),
          ProvisioningArtifactName: S.optional(S.String),
          PathId: S.optional(S.String),
          PathName: S.optional(S.String),
          ProvisioningParameters: S.optional(__S(481, __c30, 1)),
          ProvisioningPreferences: S.optional(__S(1984, __c124, 0)),
          Tags: S.optional(__S(241, __c15, 1)),
          UpdateToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateProvisionedProductInput" });
  }
}
function __c125(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          ProvisionedProductId: S.String,
          ProvisionedProductProperties: __S(144, __c9, 0),
          IdempotencyToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateProvisionedProductPropertiesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProvisionedProductId: S.optional(S.String),
          ProvisionedProductProperties: S.optional(__S(144, __c9, 0)),
          RecordId: S.optional(S.String),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateProvisionedProductPropertiesOutput" });
  }
}
function __c126(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AcceptLanguage: S.optional(S.String),
          ProductId: S.String,
          ProvisioningArtifactId: S.String,
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Active: S.optional(S.Boolean),
          Guidance: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateProvisioningArtifactInput" });
  }
}
function __c127(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Name: S.optional(S.String),
          Definition: S.optional(__S(144, __c9, 0)),
          Description: S.optional(S.String),
          AcceptLanguage: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateServiceActionInput" });
  }
}
function __c128(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String, Value: S.optional(S.String), Active: S.optional(S.Boolean) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateTagOptionInput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
