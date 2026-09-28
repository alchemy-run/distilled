import type * as HttpClient from "effect/unstable/http/HttpClient";
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
  sdkId: "Service Catalog",
  target: "AWS242ServiceCatalogService",
  version: "2015-12-10",
  sigv4: "servicecatalog",
  protocol: awsJson1_1Protocol,
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://servicecatalog.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://servicecatalog.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class DuplicateResourceException
  extends /*@__PURE__*/ TE.TaggedError("DuplicateResourceException")<{
    readonly message?: string;
  }> {}
export class InvalidParametersException
  extends /*@__PURE__*/ TE.TaggedError("InvalidParametersException")<{
    readonly message?: string;
  }> {}
export class InvalidStateException
  extends /*@__PURE__*/ TE.TaggedError("InvalidStateException")<{
    readonly message?: string;
  }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("LimitExceededException")<{
    readonly message?: string;
  }> {}
export class OperationNotSupportedException
  extends /*@__PURE__*/ TE.TaggedError("OperationNotSupportedException")<{
    readonly message?: string;
  }> {}
export class ProvisionedProductNotFound
  extends /*@__PURE__*/ TE.TaggedError("ProvisionedProductNotFound", [], {
    synthetic: {
      from: "ValidationException",
      message: { includes: "Provisioned product not found" },
    },
  })<{ readonly message?: string }> {}
export class ResourceInUseException
  extends /*@__PURE__*/ TE.TaggedError("ResourceInUseException")<{
    readonly message?: string;
  }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ResourceNotFoundException")<{
    readonly message?: string;
  }> {}
export class TagOptionNotMigratedException
  extends /*@__PURE__*/ TE.TaggedError("TagOptionNotMigratedException")<{
    readonly message?: string;
  }> {}
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
export type SourceProvisioningArtifactProperties = {
  [key: string]: string | undefined;
}[];
export type CopyOption = "CopyTags" | (string & {});
export type CopyOptions = CopyOption[];
export interface CopyProductInput {
  AcceptLanguage?: string;
  SourceProductArn: string;
  TargetProductId?: string;
  TargetProductName?: string;
  SourceProvisioningArtifactIdentifiers?: {
    [key: string]: string | undefined;
  }[];
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
export type ProvisioningArtifactGuidance =
  | "DEFAULT"
  | "DEPRECATED"
  | (string & {});
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
export type ServiceActionDefinitionMap = {
  [key in ServiceActionDefinitionKey]?: string;
};
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
export type CopyProductStatus =
  | "SUCCEEDED"
  | "IN_PROGRESS"
  | "FAILED"
  | (string & {});
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
export type RequiresRecreation =
  | "NEVER"
  | "CONDITIONALLY"
  | "ALWAYS"
  | (string & {});
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
export type AccessStatus =
  | "ENABLED"
  | "UNDER_CHANGE"
  | "DISABLED"
  | (string & {});
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
export type StackInstanceStatus =
  | "CURRENT"
  | "OUTDATED"
  | "INOPERABLE"
  | (string & {});
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
export type ProductViewSortBy =
  | "Title"
  | "VersionCount"
  | "CreationDate"
  | (string & {});
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
export type ProductViewAggregations = {
  [key: string]: ProductViewAggregationValue[] | undefined;
};
export interface SearchProductsOutput {
  ProductViewSummaries?: ProductViewSummary[];
  ProductViewAggregations?: {
    [key: string]: ProductViewAggregationValue[] | undefined;
  };
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
export type ProvisionedProductFilters = {
  [key in ProvisionedProductViewFilterBy]?: string[];
};
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
export type StackSetOperationType =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | (string & {});
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
  descriptor: {
    service: svc,
    input: { AcceptLanguage: 0, PortfolioId: 0, PortfolioShareType: 0 },
  },
  errors: [
    InvalidParametersException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptPortfolioShare",
})) as any;

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
  descriptor: { service: svc, input: { BudgetName: 0, ResourceId: 0 } },
  errors: [
    DuplicateResourceException,
    InvalidParametersException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateBudgetWithResource",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AcceptLanguage: 0,
      PortfolioId: 0,
      PrincipalARN: 0,
      PrincipalType: 0,
    },
  },
  errors: [
    InvalidParametersException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociatePrincipalWithPortfolio",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AcceptLanguage: 0,
      ProductId: 0,
      PortfolioId: 0,
      SourcePortfolioId: 0,
    },
  },
  errors: [
    InvalidParametersException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateProductWithPortfolio",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ProductId: 0,
      ProvisioningArtifactId: 0,
      ServiceActionId: 0,
      AcceptLanguage: 0,
      IdempotencyToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    DuplicateResourceException,
    InvalidParametersException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateServiceActionWithProvisioningArtifact",
})) as any;

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
  descriptor: { service: svc, input: { ResourceId: 0, TagOptionId: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ServiceActionAssociations: D.list(i_ServiceActionAssociation),
      AcceptLanguage: 0,
    },
  },
  errors: [InvalidParametersException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchAssociateServiceActionWithProvisioningArtifact",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ServiceActionAssociations: D.list(i_ServiceActionAssociation),
      AcceptLanguage: 0,
    },
  },
  errors: [InvalidParametersException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDisassociateServiceActionFromProvisioningArtifact",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AcceptLanguage: 0,
      SourceProductArn: 0,
      TargetProductId: 0,
      TargetProductName: 0,
      SourceProvisioningArtifactIdentifiers: 0,
      CopyOptions: 0,
      IdempotencyToken: D.m({ idempotency: true }),
    },
  },
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopyProduct",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AcceptLanguage: 0,
      PortfolioId: 0,
      ProductId: 0,
      Parameters: 0,
      Type: 0,
      Description: 0,
      IdempotencyToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    DuplicateResourceException,
    InvalidParametersException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConstraint",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AcceptLanguage: 0,
      DisplayName: 0,
      Description: 0,
      ProviderName: 0,
      Tags: D.list(i_Tag),
      IdempotencyToken: D.m({ idempotency: true }),
    },
    output: { PortfolioDetail: o_PortfolioDetail },
  },
  errors: [
    InvalidParametersException,
    LimitExceededException,
    TagOptionNotMigratedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePortfolio",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AcceptLanguage: 0,
      PortfolioId: 0,
      AccountId: 0,
      OrganizationNode: i_OrganizationNode,
      ShareTagOptions: 0,
      SharePrincipals: 0,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AcceptLanguage: 0,
      Name: 0,
      Owner: 0,
      Description: 0,
      Distributor: 0,
      SupportDescription: 0,
      SupportEmail: 0,
      SupportUrl: 0,
      ProductType: 0,
      Tags: D.list(i_Tag),
      ProvisioningArtifactParameters: i_ProvisioningArtifactProperties,
      IdempotencyToken: D.m({ idempotency: true }),
      SourceConnection: i_SourceConnection,
    },
    output: {
      ProductViewDetail: o_ProductViewDetail,
      ProvisioningArtifactDetail: o_ProvisioningArtifactDetail,
    },
  },
  errors: [
    InvalidParametersException,
    LimitExceededException,
    TagOptionNotMigratedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProduct",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AcceptLanguage: 0,
      PlanName: 0,
      PlanType: 0,
      NotificationArns: 0,
      PathId: 0,
      ProductId: 0,
      ProvisionedProductName: 0,
      ProvisioningArtifactId: 0,
      ProvisioningParameters: D.list(i_UpdateProvisioningParameter),
      IdempotencyToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    InvalidParametersException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProvisionedProductPlan",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AcceptLanguage: 0,
      ProductId: 0,
      Parameters: i_ProvisioningArtifactProperties,
      IdempotencyToken: D.m({ idempotency: true }),
    },
    output: { ProvisioningArtifactDetail: o_ProvisioningArtifactDetail },
  },
  errors: [
    InvalidParametersException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProvisioningArtifact",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      DefinitionType: 0,
      Definition: 0,
      Description: 0,
      AcceptLanguage: 0,
      IdempotencyToken: D.m({ idempotency: true }),
    },
  },
  errors: [InvalidParametersException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateServiceAction",
})) as any;

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
  descriptor: { service: svc, input: { Key: 0, Value: 0 } },
  errors: [
    DuplicateResourceException,
    LimitExceededException,
    TagOptionNotMigratedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTagOption",
})) as any;

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
  descriptor: { service: svc, input: { AcceptLanguage: 0, Id: 0 } },
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConstraint",
})) as any;

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
  descriptor: { service: svc, input: { AcceptLanguage: 0, Id: 0 } },
  errors: [
    InvalidParametersException,
    ResourceInUseException,
    ResourceNotFoundException,
    TagOptionNotMigratedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePortfolio",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AcceptLanguage: 0,
      PortfolioId: 0,
      AccountId: 0,
      OrganizationNode: i_OrganizationNode,
    },
  },
  errors: [
    InvalidParametersException,
    InvalidStateException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePortfolioShare",
})) as any;

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
  descriptor: { service: svc, input: { AcceptLanguage: 0, Id: 0 } },
  errors: [
    InvalidParametersException,
    ResourceInUseException,
    ResourceNotFoundException,
    TagOptionNotMigratedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProduct",
})) as any;

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
  descriptor: {
    service: svc,
    input: { AcceptLanguage: 0, PlanId: 0, IgnoreErrors: 0 },
  },
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProvisionedProductPlan",
})) as any;

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
  descriptor: {
    service: svc,
    input: { AcceptLanguage: 0, ProductId: 0, ProvisioningArtifactId: 0 },
  },
  errors: [
    InvalidParametersException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProvisioningArtifact",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Id: 0,
      AcceptLanguage: 0,
      IdempotencyToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    InvalidParametersException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteServiceAction",
})) as any;

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
  descriptor: { service: svc, input: { Id: 0 } },
  errors: [
    ResourceInUseException,
    ResourceNotFoundException,
    TagOptionNotMigratedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTagOption",
})) as any;

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
  descriptor: { service: svc, input: { AcceptLanguage: 0, Id: 0 } },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConstraint",
})) as any;

export type DescribeCopyProductStatusError =
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the status of the specified copy product operation.
 */
export const describeCopyProductStatus: API.OperationMethod<
  DescribeCopyProductStatusInput,
  DescribeCopyProductStatusOutput,
  DescribeCopyProductStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AcceptLanguage: 0, CopyProductToken: 0 },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCopyProductStatus",
})) as any;

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
  descriptor: {
    service: svc,
    input: { AcceptLanguage: 0, Id: 0 },
    output: { PortfolioDetail: o_PortfolioDetail },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePortfolio",
})) as any;

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
  descriptor: {
    service: svc,
    input: { PortfolioId: 0, Type: 0, PageToken: 0, PageSize: 0 },
  },
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
  descriptor: { service: svc, input: { PortfolioShareToken: 0 } },
  errors: [
    InvalidParametersException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePortfolioShareStatus",
})) as any;

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
  descriptor: {
    service: svc,
    input: { AcceptLanguage: 0, Id: 0, Name: 0 },
    output: { ProvisioningArtifacts: D.list(o_ProvisioningArtifact) },
  },
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProduct",
})) as any;

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
  descriptor: {
    service: svc,
    input: { AcceptLanguage: 0, Id: 0, Name: 0, SourcePortfolioId: 0 },
    output: {
      ProductViewDetail: o_ProductViewDetail,
      ProvisioningArtifactSummaries: D.list({ CreatedTime: D.ts }),
    },
  },
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProductAsAdmin",
})) as any;

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
  descriptor: {
    service: svc,
    input: { AcceptLanguage: 0, Id: 0 },
    output: { ProvisioningArtifacts: D.list(o_ProvisioningArtifact) },
  },
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProductView",
})) as any;

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
  descriptor: {
    service: svc,
    input: { AcceptLanguage: 0, Id: 0, Name: 0 },
    output: { ProvisionedProductDetail: o_ProvisionedProductDetail },
  },
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProvisionedProduct",
})) as any;

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
  descriptor: {
    service: svc,
    input: { AcceptLanguage: 0, PlanId: 0, PageSize: 0, PageToken: 0 },
    output: {
      ProvisionedProductPlanDetails: { CreatedTime: D.ts, UpdatedTime: D.ts },
    },
  },
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProvisionedProductPlan",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AcceptLanguage: 0,
      ProvisioningArtifactId: 0,
      ProductId: 0,
      ProvisioningArtifactName: 0,
      ProductName: 0,
      Verbose: 0,
      IncludeProvisioningArtifactParameters: 0,
    },
    output: { ProvisioningArtifactDetail: o_ProvisioningArtifactDetail },
  },
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProvisioningArtifact",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AcceptLanguage: 0,
      ProductId: 0,
      ProductName: 0,
      ProvisioningArtifactId: 0,
      ProvisioningArtifactName: 0,
      PathId: 0,
      PathName: 0,
    },
  },
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProvisioningParameters",
})) as any;

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
  descriptor: {
    service: svc,
    input: { AcceptLanguage: 0, Id: 0, PageToken: 0, PageSize: 0 },
    output: { RecordDetail: o_RecordDetail },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRecord",
})) as any;

export type DescribeServiceActionError =
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes a self-service action.
 */
export const describeServiceAction: API.OperationMethod<
  DescribeServiceActionInput,
  DescribeServiceActionOutput,
  DescribeServiceActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Id: 0, AcceptLanguage: 0 } },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeServiceAction",
})) as any;

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
  descriptor: {
    service: svc,
    input: { ProvisionedProductId: 0, ServiceActionId: 0, AcceptLanguage: 0 },
  },
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeServiceActionExecutionParameters",
})) as any;

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
  descriptor: { service: svc, input: { Id: 0 } },
  errors: [ResourceNotFoundException, TagOptionNotMigratedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTagOption",
})) as any;

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
  descriptor: { service: svc, input: {} },
  errors: [
    InvalidStateException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableAWSOrganizationsAccess",
})) as any;

export type DisassociateBudgetFromResourceError =
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disassociates the specified budget from the specified resource.
 */
export const disassociateBudgetFromResource: API.OperationMethod<
  DisassociateBudgetFromResourceInput,
  DisassociateBudgetFromResourceOutput,
  DisassociateBudgetFromResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { BudgetName: 0, ResourceId: 0 } },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateBudgetFromResource",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AcceptLanguage: 0,
      PortfolioId: 0,
      PrincipalARN: 0,
      PrincipalType: 0,
    },
  },
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociatePrincipalFromPortfolio",
})) as any;

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
  descriptor: {
    service: svc,
    input: { AcceptLanguage: 0, ProductId: 0, PortfolioId: 0 },
  },
  errors: [
    InvalidParametersException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateProductFromPortfolio",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ProductId: 0,
      ProvisioningArtifactId: 0,
      ServiceActionId: 0,
      AcceptLanguage: 0,
      IdempotencyToken: D.m({ idempotency: true }),
    },
  },
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateServiceActionFromProvisioningArtifact",
})) as any;

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
  descriptor: { service: svc, input: { ResourceId: 0, TagOptionId: 0 } },
  errors: [ResourceNotFoundException, TagOptionNotMigratedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateTagOptionFromResource",
})) as any;

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
  descriptor: { service: svc, input: {} },
  errors: [
    InvalidStateException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableAWSOrganizationsAccess",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AcceptLanguage: 0,
      PlanId: 0,
      IdempotencyToken: D.m({ idempotency: true }),
    },
    output: { RecordDetail: o_RecordDetail },
  },
  errors: [
    InvalidParametersException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteProvisionedProductPlan",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ProvisionedProductId: 0,
      ServiceActionId: 0,
      ExecuteToken: D.m({ idempotency: true }),
      AcceptLanguage: 0,
      Parameters: 0,
    },
    output: { RecordDetail: o_RecordDetail },
  },
  errors: [
    InvalidParametersException,
    InvalidStateException,
    ResourceNotFoundException,
    ProvisionedProductNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteProvisionedProductServiceAction",
})) as any;

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
  descriptor: { service: svc, input: {} },
  errors: [OperationNotSupportedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAWSOrganizationsAccessStatus",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AcceptLanguage: 0,
      ProvisionedProductId: 0,
      ProvisionedProductName: 0,
      OutputKeys: 0,
      PageSize: 0,
      PageToken: 0,
    },
  },
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
  descriptor: {
    service: svc,
    input: {
      AcceptLanguage: 0,
      ProductId: 0,
      ProvisioningArtifactId: 0,
      ProvisionedProductName: 0,
      PhysicalId: 0,
      IdempotencyToken: D.m({ idempotency: true }),
    },
    output: { RecordDetail: o_RecordDetail },
  },
  errors: [
    DuplicateResourceException,
    InvalidParametersException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportAsProvisionedProduct",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AcceptLanguage: 0,
      PageToken: 0,
      PageSize: 0,
      PortfolioShareType: 0,
    },
    output: { PortfolioDetails: D.list(o_PortfolioDetail) },
  },
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
  descriptor: {
    service: svc,
    input: { AcceptLanguage: 0, ResourceId: 0, PageSize: 0, PageToken: 0 },
  },
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
  descriptor: {
    service: svc,
    input: {
      AcceptLanguage: 0,
      PortfolioId: 0,
      ProductId: 0,
      PageSize: 0,
      PageToken: 0,
    },
  },
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
  descriptor: {
    service: svc,
    input: { AcceptLanguage: 0, ProductId: 0, PageSize: 0, PageToken: 0 },
  },
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
  descriptor: {
    service: svc,
    input: {
      AcceptLanguage: 0,
      PortfolioId: 0,
      OrganizationNodeType: 0,
      PageToken: 0,
      PageSize: 0,
    },
  },
  errors: [
    InvalidParametersException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
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
  descriptor: {
    service: svc,
    input: {
      AcceptLanguage: 0,
      PortfolioId: 0,
      OrganizationParentId: 0,
      PageToken: 0,
      PageSize: 0,
    },
  },
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
  descriptor: {
    service: svc,
    input: { AcceptLanguage: 0, PageToken: 0, PageSize: 0 },
    output: { PortfolioDetails: D.list(o_PortfolioDetail) },
  },
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
  descriptor: {
    service: svc,
    input: { AcceptLanguage: 0, ProductId: 0, PageToken: 0, PageSize: 0 },
    output: { PortfolioDetails: D.list(o_PortfolioDetail) },
  },
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
  descriptor: {
    service: svc,
    input: { AcceptLanguage: 0, PortfolioId: 0, PageSize: 0, PageToken: 0 },
  },
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
  descriptor: {
    service: svc,
    input: {
      AcceptLanguage: 0,
      ProvisionProductId: 0,
      PageSize: 0,
      PageToken: 0,
      AccessLevelFilter: i_AccessLevelFilter,
    },
  },
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProvisionedProductPlans",
})) as any;

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
  descriptor: {
    service: svc,
    input: { AcceptLanguage: 0, ProductId: 0 },
    output: {
      ProvisioningArtifactDetails: D.list(o_ProvisioningArtifactDetail),
    },
  },
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProvisioningArtifacts",
})) as any;

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
  descriptor: {
    service: svc,
    input: { ServiceActionId: 0, PageSize: 0, PageToken: 0, AcceptLanguage: 0 },
    output: {
      ProvisioningArtifactViews: D.list({
        ProvisioningArtifact: o_ProvisioningArtifact,
      }),
    },
  },
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
  descriptor: {
    service: svc,
    input: {
      AcceptLanguage: 0,
      AccessLevelFilter: i_AccessLevelFilter,
      SearchFilter: { Key: 0, Value: 0 },
      PageSize: 0,
      PageToken: 0,
    },
    output: { RecordDetails: D.list(o_RecordDetail) },
  },
  errors: [InvalidParametersException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecordHistory",
})) as any;

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
  descriptor: {
    service: svc,
    input: { TagOptionId: 0, ResourceType: 0, PageSize: 0, PageToken: 0 },
    output: { ResourceDetails: D.list({ CreatedTime: D.ts }) },
  },
  errors: [
    InvalidParametersException,
    ResourceNotFoundException,
    TagOptionNotMigratedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourcesForTagOption",
  pagination: {
    inputToken: "PageToken",
    outputToken: "PageToken",
    pageSize: "PageSize",
  } as const,
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
  descriptor: {
    service: svc,
    input: { AcceptLanguage: 0, PageSize: 0, PageToken: 0 },
  },
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
  descriptor: {
    service: svc,
    input: {
      ProductId: 0,
      ProvisioningArtifactId: 0,
      PageSize: 0,
      PageToken: 0,
      AcceptLanguage: 0,
    },
  },
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
  descriptor: {
    service: svc,
    input: {
      AcceptLanguage: 0,
      ProvisionedProductId: 0,
      PageToken: 0,
      PageSize: 0,
    },
  },
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStackInstancesForProvisionedProduct",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Filters: { Key: 0, Value: 0, Active: 0 },
      PageSize: 0,
      PageToken: 0,
    },
  },
  errors: [InvalidParametersException, TagOptionNotMigratedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagOptions",
  pagination: {
    inputToken: "PageToken",
    outputToken: "PageToken",
    pageSize: "PageSize",
  } as const,
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
  descriptor: {
    service: svc,
    input: {
      WorkflowToken: 0,
      RecordId: 0,
      Status: 0,
      FailureReason: 0,
      ResourceIdentifier: { UniqueTag: { Key: 0, Value: 0 } },
      Outputs: D.list(i_RecordOutput),
      IdempotencyToken: D.m({ idempotency: true }),
    },
  },
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "NotifyProvisionProductEngineWorkflowResult",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      WorkflowToken: 0,
      RecordId: 0,
      Status: 0,
      FailureReason: 0,
      IdempotencyToken: D.m({ idempotency: true }),
    },
  },
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "NotifyTerminateProvisionedProductEngineWorkflowResult",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      WorkflowToken: 0,
      RecordId: 0,
      Status: 0,
      FailureReason: 0,
      Outputs: D.list(i_RecordOutput),
      IdempotencyToken: D.m({ idempotency: true }),
    },
  },
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "NotifyUpdateProvisionedProductEngineWorkflowResult",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AcceptLanguage: 0,
      ProductId: 0,
      ProductName: 0,
      ProvisioningArtifactId: 0,
      ProvisioningArtifactName: 0,
      PathId: 0,
      PathName: 0,
      ProvisionedProductName: 0,
      ProvisioningParameters: D.list({ Key: 0, Value: 0 }),
      ProvisioningPreferences: {
        StackSetAccounts: 0,
        StackSetRegions: 0,
        StackSetFailureToleranceCount: 0,
        StackSetFailureTolerancePercentage: 0,
        StackSetMaxConcurrencyCount: 0,
        StackSetMaxConcurrencyPercentage: 0,
      },
      Tags: D.list(i_Tag),
      NotificationArns: 0,
      ProvisionToken: D.m({ idempotency: true }),
    },
    output: { RecordDetail: o_RecordDetail },
  },
  errors: [
    DuplicateResourceException,
    InvalidParametersException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ProvisionProduct",
})) as any;

export type RejectPortfolioShareError =
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Rejects an offer to share the specified portfolio.
 */
export const rejectPortfolioShare: API.OperationMethod<
  RejectPortfolioShareInput,
  RejectPortfolioShareOutput,
  RejectPortfolioShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AcceptLanguage: 0, PortfolioId: 0, PortfolioShareType: 0 },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectPortfolioShare",
})) as any;

export type ScanProvisionedProductsError =
  | InvalidParametersException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: {
      AcceptLanguage: 0,
      AccessLevelFilter: i_AccessLevelFilter,
      PageSize: 0,
      PageToken: 0,
    },
    output: { ProvisionedProducts: D.list(o_ProvisionedProductDetail) },
  },
  errors: [InvalidParametersException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ScanProvisionedProducts",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AcceptLanguage: 0,
      Filters: 0,
      PageSize: 0,
      SortBy: 0,
      SortOrder: 0,
      PageToken: 0,
    },
  },
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
  descriptor: {
    service: svc,
    input: {
      AcceptLanguage: 0,
      PortfolioId: 0,
      Filters: 0,
      SortBy: 0,
      SortOrder: 0,
      PageToken: 0,
      PageSize: 0,
      ProductSource: 0,
    },
    output: { ProductViewDetails: D.list(o_ProductViewDetail) },
  },
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

export type SearchProvisionedProductsError =
  | InvalidParametersException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: {
      AcceptLanguage: 0,
      AccessLevelFilter: i_AccessLevelFilter,
      Filters: 0,
      SortBy: 0,
      SortOrder: 0,
      PageSize: 0,
      PageToken: 0,
    },
    output: { ProvisionedProducts: D.list({ CreatedTime: D.ts }) },
  },
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

export type TerminateProvisionedProductError =
  | ResourceNotFoundException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: {
      ProvisionedProductName: 0,
      ProvisionedProductId: 0,
      TerminateToken: D.m({ idempotency: true }),
      IgnoreErrors: 0,
      AcceptLanguage: 0,
      RetainPhysicalResources: 0,
    },
    output: { RecordDetail: o_RecordDetail },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateProvisionedProduct",
})) as any;

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
  descriptor: {
    service: svc,
    input: { AcceptLanguage: 0, Id: 0, Description: 0, Parameters: 0 },
  },
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConstraint",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AcceptLanguage: 0,
      Id: 0,
      DisplayName: 0,
      Description: 0,
      ProviderName: 0,
      AddTags: D.list(i_Tag),
      RemoveTags: 0,
    },
    output: { PortfolioDetail: o_PortfolioDetail },
  },
  errors: [
    InvalidParametersException,
    LimitExceededException,
    ResourceNotFoundException,
    TagOptionNotMigratedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePortfolio",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AcceptLanguage: 0,
      PortfolioId: 0,
      AccountId: 0,
      OrganizationNode: i_OrganizationNode,
      ShareTagOptions: 0,
      SharePrincipals: 0,
    },
  },
  errors: [
    InvalidParametersException,
    InvalidStateException,
    OperationNotSupportedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePortfolioShare",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AcceptLanguage: 0,
      Id: 0,
      Name: 0,
      Owner: 0,
      Description: 0,
      Distributor: 0,
      SupportDescription: 0,
      SupportEmail: 0,
      SupportUrl: 0,
      AddTags: D.list(i_Tag),
      RemoveTags: 0,
      SourceConnection: i_SourceConnection,
    },
    output: { ProductViewDetail: o_ProductViewDetail },
  },
  errors: [
    InvalidParametersException,
    ResourceNotFoundException,
    TagOptionNotMigratedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProduct",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AcceptLanguage: 0,
      ProvisionedProductName: 0,
      ProvisionedProductId: 0,
      ProductId: 0,
      ProductName: 0,
      ProvisioningArtifactId: 0,
      ProvisioningArtifactName: 0,
      PathId: 0,
      PathName: 0,
      ProvisioningParameters: D.list(i_UpdateProvisioningParameter),
      ProvisioningPreferences: {
        StackSetAccounts: 0,
        StackSetRegions: 0,
        StackSetFailureToleranceCount: 0,
        StackSetFailureTolerancePercentage: 0,
        StackSetMaxConcurrencyCount: 0,
        StackSetMaxConcurrencyPercentage: 0,
        StackSetOperationType: 0,
      },
      Tags: D.list(i_Tag),
      UpdateToken: D.m({ idempotency: true }),
    },
    output: { RecordDetail: o_RecordDetail },
  },
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProvisionedProduct",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AcceptLanguage: 0,
      ProvisionedProductId: 0,
      ProvisionedProductProperties: 0,
      IdempotencyToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    InvalidParametersException,
    InvalidStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProvisionedProductProperties",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AcceptLanguage: 0,
      ProductId: 0,
      ProvisioningArtifactId: 0,
      Name: 0,
      Description: 0,
      Active: 0,
      Guidance: 0,
    },
    output: { ProvisioningArtifactDetail: o_ProvisioningArtifactDetail },
  },
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProvisioningArtifact",
})) as any;

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
  descriptor: {
    service: svc,
    input: { Id: 0, Name: 0, Definition: 0, Description: 0, AcceptLanguage: 0 },
  },
  errors: [InvalidParametersException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServiceAction",
})) as any;

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
  descriptor: { service: svc, input: { Id: 0, Value: 0, Active: 0 } },
  errors: [
    DuplicateResourceException,
    InvalidParametersException,
    ResourceNotFoundException,
    TagOptionNotMigratedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTagOption",
})) as any;

const i_AccessLevelFilter: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_OrganizationNode: D.LazyStruct = () => ({ Type: 0, Value: 0 });
const i_ProvisioningArtifactProperties: D.LazyStruct = () => ({
  Name: 0,
  Description: 0,
  Info: 0,
  Type: 0,
  DisableTemplateValidation: 0,
});
const i_RecordOutput: D.LazyStruct = () => ({
  OutputKey: 0,
  OutputValue: 0,
  Description: 0,
});
const i_ServiceActionAssociation: D.LazyStruct = () => ({
  ServiceActionId: 0,
  ProductId: 0,
  ProvisioningArtifactId: 0,
});
const i_SourceConnection: D.LazyStruct = () => ({
  Type: 0,
  ConnectionParameters: {
    CodeStar: { ConnectionArn: 0, Repository: 0, Branch: 0, ArtifactPath: 0 },
  },
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_UpdateProvisioningParameter: D.LazyStruct = () => ({
  Key: 0,
  Value: 0,
  UsePreviousValue: 0,
});
const o_PortfolioDetail: D.LazyStruct = () => ({ CreatedTime: D.ts });
const o_ProductViewDetail: D.LazyStruct = () => ({
  CreatedTime: D.ts,
  SourceConnection: {
    LastSync: { LastSyncTime: D.ts, LastSuccessfulSyncTime: D.ts },
  },
});
const o_ProvisionedProductDetail: D.LazyStruct = () => ({ CreatedTime: D.ts });
const o_ProvisioningArtifact: D.LazyStruct = () => ({ CreatedTime: D.ts });
const o_ProvisioningArtifactDetail: D.LazyStruct = () => ({
  CreatedTime: D.ts,
});
const o_RecordDetail: D.LazyStruct = () => ({
  CreatedTime: D.ts,
  UpdatedTime: D.ts,
});
