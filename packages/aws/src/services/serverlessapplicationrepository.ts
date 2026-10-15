import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "ServerlessApplicationRepository",
  serviceShapeName: "ServerlessApplicationRepository",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "serverlessrepo" });
const ver = /*@__PURE__*/ T.ServiceVersion("2017-09-08");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
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
              `https://serverlessrepo-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://serverlessrepo.${Region}.amazonaws.com`);
            }
            return e(
              `https://serverlessrepo-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://serverlessrepo.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://serverlessrepo.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://serverlessrepo.{R}.{D}","properties":{},"headers":{}}');

export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    {
      ErrorCode: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      ErrorCode: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ForbiddenException
  extends /*@__PURE__*/ S.TaggedError<ForbiddenException>()(
    "ForbiddenException",
    {
      ErrorCode: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class InternalServerErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServerErrorException>()(
    "InternalServerErrorException",
    {
      ErrorCode: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    {
      ErrorCode: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    {
      ErrorCode: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export type __listOf__string = string[];
const __listOf__string = /*@__PURE__*/ __L.at(__c15, 0);
export interface CreateApplicationRequest {
  Author?: string;
  Description?: string;
  HomePageUrl?: string;
  Labels?: string[];
  LicenseBody?: string;
  LicenseUrl?: string;
  Name?: string;
  ReadmeBody?: string;
  ReadmeUrl?: string;
  SemanticVersion?: string;
  SourceCodeArchiveUrl?: string;
  SourceCodeUrl?: string;
  SpdxLicenseId?: string;
  TemplateBody?: string;
  TemplateUrl?: string;
}
export interface ParameterDefinition {
  AllowedPattern?: string;
  AllowedValues?: string[];
  ConstraintDescription?: string;
  DefaultValue?: string;
  Description?: string;
  MaxLength?: number;
  MaxValue?: number;
  MinLength?: number;
  MinValue?: number;
  Name?: string;
  NoEcho?: boolean;
  ReferencedByResources?: string[];
  Type?: string;
}
export type __listOfParameterDefinition = ParameterDefinition[];
const __listOfParameterDefinition = /*@__PURE__*/ __L.at(__c14, 1);
export type Capability =
  | "CAPABILITY_IAM"
  | "CAPABILITY_NAMED_IAM"
  | "CAPABILITY_AUTO_EXPAND"
  | "CAPABILITY_RESOURCE_POLICY"
  | (string & {});
export type __listOfCapability = Capability[];
const __listOfCapability = /*@__PURE__*/ __L.at(__c14, 2);
export interface Version {
  ApplicationId?: string;
  CreationTime?: string;
  ParameterDefinitions?: ParameterDefinition[];
  RequiredCapabilities?: Capability[];
  ResourcesSupported?: boolean;
  SemanticVersion?: string;
  SourceCodeArchiveUrl?: string;
  SourceCodeUrl?: string;
  TemplateUrl?: string;
}
export interface CreateApplicationResponse {
  ApplicationId?: string;
  Author?: string;
  CreationTime?: string;
  Description?: string;
  HomePageUrl?: string;
  IsVerifiedAuthor?: boolean;
  Labels?: string[];
  LicenseUrl?: string;
  Name?: string;
  ReadmeUrl?: string;
  SpdxLicenseId?: string;
  VerifiedAuthorUrl?: string;
  Version?: Version & {
    ApplicationId: string;
    CreationTime: string;
    ParameterDefinitions: (ParameterDefinition & {
      Name: string;
      ReferencedByResources: __listOf__string;
    })[];
    RequiredCapabilities: __listOfCapability;
    ResourcesSupported: boolean;
    SemanticVersion: string;
    TemplateUrl: string;
  };
}
export interface CreateApplicationVersionRequest {
  ApplicationId: string;
  SemanticVersion: string;
  SourceCodeArchiveUrl?: string;
  SourceCodeUrl?: string;
  TemplateBody?: string;
  TemplateUrl?: string;
}
export interface CreateApplicationVersionResponse {
  ApplicationId?: string;
  CreationTime?: string;
  ParameterDefinitions?: (ParameterDefinition & {
    Name: string;
    ReferencedByResources: __listOf__string;
  })[];
  RequiredCapabilities?: Capability[];
  ResourcesSupported?: boolean;
  SemanticVersion?: string;
  SourceCodeArchiveUrl?: string;
  SourceCodeUrl?: string;
  TemplateUrl?: string;
}
export interface ParameterValue {
  Name?: string;
  Value?: string;
}
export type __listOfParameterValue = ParameterValue[];
const __listOfParameterValue = /*@__PURE__*/ __L.at(__c17, 1);
export interface RollbackTrigger {
  Arn?: string;
  Type?: string;
}
export type __listOfRollbackTrigger = RollbackTrigger[];
const __listOfRollbackTrigger = /*@__PURE__*/ __L.at(__c17, 3);
export interface RollbackConfiguration {
  MonitoringTimeInMinutes?: number;
  RollbackTriggers?: RollbackTrigger[];
}
export interface Tag {
  Key?: string;
  Value?: string;
}
export type __listOfTag = Tag[];
const __listOfTag = /*@__PURE__*/ __L.at(__c17, 6);
export interface CreateCloudFormationChangeSetRequest {
  ApplicationId: string;
  Capabilities?: string[];
  ChangeSetName?: string;
  ClientToken?: string;
  Description?: string;
  NotificationArns?: string[];
  ParameterOverrides?: ParameterValue[];
  ResourceTypes?: string[];
  RollbackConfiguration?: RollbackConfiguration;
  SemanticVersion?: string;
  StackName?: string;
  Tags?: Tag[];
  TemplateId?: string;
}
export interface CreateCloudFormationChangeSetResponse {
  ApplicationId?: string;
  ChangeSetId?: string;
  SemanticVersion?: string;
  StackId?: string;
}
export interface CreateCloudFormationTemplateRequest {
  ApplicationId: string;
  SemanticVersion?: string;
}
export type Status = "PREPARING" | "ACTIVE" | "EXPIRED" | (string & {});
export interface CreateCloudFormationTemplateResponse {
  ApplicationId?: string;
  CreationTime?: string;
  ExpirationTime?: string;
  SemanticVersion?: string;
  Status?: Status;
  TemplateId?: string;
  TemplateUrl?: string;
}
export interface DeleteApplicationRequest {
  ApplicationId: string;
}
export interface DeleteApplicationResponse {}
export interface GetApplicationRequest {
  ApplicationId: string;
  SemanticVersion?: string;
}
export interface GetApplicationResponse {
  ApplicationId?: string;
  Author?: string;
  CreationTime?: string;
  Description?: string;
  HomePageUrl?: string;
  IsVerifiedAuthor?: boolean;
  Labels?: string[];
  LicenseUrl?: string;
  Name?: string;
  ReadmeUrl?: string;
  SpdxLicenseId?: string;
  VerifiedAuthorUrl?: string;
  Version?: Version & {
    ApplicationId: string;
    CreationTime: string;
    ParameterDefinitions: (ParameterDefinition & {
      Name: string;
      ReferencedByResources: __listOf__string;
    })[];
    RequiredCapabilities: __listOfCapability;
    ResourcesSupported: boolean;
    SemanticVersion: string;
    TemplateUrl: string;
  };
}
export interface GetApplicationPolicyRequest {
  ApplicationId: string;
}
export interface ApplicationPolicyStatement {
  Actions?: string[];
  PrincipalOrgIDs?: string[];
  Principals?: string[];
  StatementId?: string;
}
export type __listOfApplicationPolicyStatement = ApplicationPolicyStatement[];
const __listOfApplicationPolicyStatement = /*@__PURE__*/ __L.at(__c4, 1);
export interface GetApplicationPolicyResponse {
  Statements?: (ApplicationPolicyStatement & {
    Actions: __listOf__string;
    Principals: __listOf__string;
  })[];
}
export interface GetCloudFormationTemplateRequest {
  ApplicationId: string;
  TemplateId: string;
}
export interface GetCloudFormationTemplateResponse {
  ApplicationId?: string;
  CreationTime?: string;
  ExpirationTime?: string;
  SemanticVersion?: string;
  Status?: Status;
  TemplateId?: string;
  TemplateUrl?: string;
}
export type MaxItems = number;
export interface ListApplicationDependenciesRequest {
  ApplicationId: string;
  MaxItems?: number;
  NextToken?: string;
  SemanticVersion?: string;
}
export interface ApplicationDependencySummary {
  ApplicationId?: string;
  SemanticVersion?: string;
}
export type __listOfApplicationDependencySummary = ApplicationDependencySummary[];
const __listOfApplicationDependencySummary = /*@__PURE__*/ __L.at(__c6, 2);
export interface ListApplicationDependenciesResponse {
  Dependencies?: (ApplicationDependencySummary & {
    ApplicationId: string;
    SemanticVersion: string;
  })[];
  NextToken?: string;
}
export interface ListApplicationsRequest {
  MaxItems?: number;
  NextToken?: string;
}
export interface ApplicationSummary {
  ApplicationId?: string;
  Author?: string;
  CreationTime?: string;
  Description?: string;
  HomePageUrl?: string;
  Labels?: string[];
  Name?: string;
  SpdxLicenseId?: string;
}
export type __listOfApplicationSummary = ApplicationSummary[];
const __listOfApplicationSummary = /*@__PURE__*/ __L.at(__c7, 2);
export interface ListApplicationsResponse {
  Applications?: (ApplicationSummary & {
    ApplicationId: string;
    Author: string;
    Description: string;
    Name: string;
  })[];
  NextToken?: string;
}
export interface ListApplicationVersionsRequest {
  ApplicationId: string;
  MaxItems?: number;
  NextToken?: string;
}
export interface VersionSummary {
  ApplicationId?: string;
  CreationTime?: string;
  SemanticVersion?: string;
  SourceCodeUrl?: string;
}
export type __listOfVersionSummary = VersionSummary[];
const __listOfVersionSummary = /*@__PURE__*/ __L.at(__c8, 2);
export interface ListApplicationVersionsResponse {
  NextToken?: string;
  Versions?: (VersionSummary & {
    ApplicationId: string;
    CreationTime: string;
    SemanticVersion: string;
  })[];
}
export interface PutApplicationPolicyRequest {
  ApplicationId: string;
  Statements?: ApplicationPolicyStatement[];
}
export interface PutApplicationPolicyResponse {
  Statements?: (ApplicationPolicyStatement & {
    Actions: __listOf__string;
    Principals: __listOf__string;
  })[];
}
export interface UnshareApplicationRequest {
  ApplicationId: string;
  OrganizationId?: string;
}
export interface UnshareApplicationResponse {}
export interface UpdateApplicationRequest {
  ApplicationId: string;
  Author?: string;
  Description?: string;
  HomePageUrl?: string;
  Labels?: string[];
  ReadmeBody?: string;
  ReadmeUrl?: string;
}
export interface UpdateApplicationResponse {
  ApplicationId?: string;
  Author?: string;
  CreationTime?: string;
  Description?: string;
  HomePageUrl?: string;
  IsVerifiedAuthor?: boolean;
  Labels?: string[];
  LicenseUrl?: string;
  Name?: string;
  ReadmeUrl?: string;
  SpdxLicenseId?: string;
  VerifiedAuthorUrl?: string;
  Version?: Version & {
    ApplicationId: string;
    CreationTime: string;
    ParameterDefinitions: (ParameterDefinition & {
      Name: string;
      ReferencedByResources: __listOf__string;
    })[];
    RequiredCapabilities: __listOfCapability;
    ResourcesSupported: boolean;
    SemanticVersion: string;
    TemplateUrl: string;
  };
}
export type CreateApplicationError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an application, optionally including an AWS SAM file to create the first application version in the same call.
 */
export const createApplication: API.OperationMethod<
  CreateApplicationRequest,
  CreateApplicationResponse,
  CreateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<CreateApplicationRequest>,
  output: __S(208, __c13, 0) as any as S.Schema<CreateApplicationResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
}));

export type CreateApplicationVersionError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an application version.
 */
export const createApplicationVersion: API.OperationMethod<
  CreateApplicationVersionRequest,
  CreateApplicationVersionResponse,
  CreateApplicationVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<CreateApplicationVersionRequest>,
  output: __S(227, __c14, 3) as any as S.Schema<CreateApplicationVersionResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplicationVersion",
}));

export type CreateCloudFormationChangeSetError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an AWS CloudFormation change set for the given application.
 */
export const createCloudFormationChangeSet: API.OperationMethod<
  CreateCloudFormationChangeSetRequest,
  CreateCloudFormationChangeSetResponse,
  CreateCloudFormationChangeSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(279, __c17, 7) as any as S.Schema<CreateCloudFormationChangeSetRequest>,
  output: __S(280, __c17, 8) as any as S.Schema<CreateCloudFormationChangeSetResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCloudFormationChangeSet",
}));

export type CreateCloudFormationTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an AWS CloudFormation template.
 */
export const createCloudFormationTemplate: API.OperationMethod<
  CreateCloudFormationTemplateRequest,
  CreateCloudFormationTemplateResponse,
  CreateCloudFormationTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<CreateCloudFormationTemplateRequest>,
  output: __S(304, __c19, 0) as any as S.Schema<CreateCloudFormationTemplateResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCloudFormationTemplate",
}));

export type DeleteApplicationError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the specified application.
 */
export const deleteApplication: API.OperationMethod<
  DeleteApplicationRequest,
  DeleteApplicationResponse,
  DeleteApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<DeleteApplicationRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteApplicationResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
}));

export type GetApplicationError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the specified application.
 */
export const getApplication: API.OperationMethod<
  GetApplicationRequest,
  GetApplicationResponse,
  GetApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c2, 0) as any as S.Schema<GetApplicationRequest>,
  output: __S(208, __c13, 0) as any as S.Schema<GetApplicationResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplication",
}));

export type GetApplicationPolicyError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the policy for the application.
 */
export const getApplicationPolicy: API.OperationMethod<
  GetApplicationPolicyRequest,
  GetApplicationPolicyResponse,
  GetApplicationPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c3, 0) as any as S.Schema<GetApplicationPolicyRequest>,
  output: __S(66, __c4, 2) as any as S.Schema<GetApplicationPolicyResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplicationPolicy",
}));

export type GetCloudFormationTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the specified AWS CloudFormation template.
 */
export const getCloudFormationTemplate: API.OperationMethod<
  GetCloudFormationTemplateRequest,
  GetCloudFormationTemplateResponse,
  GetCloudFormationTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<GetCloudFormationTemplateRequest>,
  output: __S(304, __c19, 0) as any as S.Schema<GetCloudFormationTemplateResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCloudFormationTemplate",
}));

export type ListApplicationDependenciesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the list of applications nested in the containing application.
 */
export const listApplicationDependencies: API.PaginatedOperationMethod<
  ListApplicationDependenciesRequest,
  ListApplicationDependenciesResponse,
  ListApplicationDependenciesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<ListApplicationDependenciesRequest>,
  output: __S(99, __c6, 3) as any as S.Schema<ListApplicationDependenciesResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplicationDependencies",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", pageSize: "MaxItems" } as const,
})) as any;

export type ListApplicationsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Lists applications owned by the requester.
 */
export const listApplications: API.PaginatedOperationMethod<
  ListApplicationsRequest,
  ListApplicationsResponse,
  ListApplicationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<ListApplicationsRequest>,
  output: __S(115, __c7, 3) as any as S.Schema<ListApplicationsResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplications",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", pageSize: "MaxItems" } as const,
})) as any;

export type ListApplicationVersionsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists versions for the specified application.
 */
export const listApplicationVersions: API.PaginatedOperationMethod<
  ListApplicationVersionsRequest,
  ListApplicationVersionsResponse,
  ListApplicationVersionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(128, __c8, 0) as any as S.Schema<ListApplicationVersionsRequest>,
  output: __S(131, __c8, 3) as any as S.Schema<ListApplicationVersionsResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplicationVersions",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", pageSize: "MaxItems" } as const,
})) as any;

export type PutApplicationPolicyError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Sets the permission policy for an application. For the list of actions supported for this operation, see
 * Application
 * Permissions
 * .
 */
export const putApplicationPolicy: API.OperationMethod<
  PutApplicationPolicyRequest,
  PutApplicationPolicyResponse,
  PutApplicationPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<PutApplicationPolicyRequest>,
  output: __S(66, __c4, 2) as any as S.Schema<PutApplicationPolicyResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutApplicationPolicy",
}));

export type UnshareApplicationError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Unshares an application from an AWS Organization.
 *
 * This operation can be called only from the organization's master account.
 */
export const unshareApplication: API.OperationMethod<
  UnshareApplicationRequest,
  UnshareApplicationResponse,
  UnshareApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<UnshareApplicationRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<UnshareApplicationResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UnshareApplication",
}));

export type UpdateApplicationError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the specified application.
 */
export const updateApplication: API.OperationMethod<
  UpdateApplicationRequest,
  UpdateApplicationResponse,
  UpdateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<UpdateApplicationRequest>,
  output: __S(208, __c13, 0) as any as S.Schema<UpdateApplicationResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplication",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/applications/{ApplicationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteApplicationRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteApplicationResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
          SemanticVersion: S.optional(S.String).pipe(T.HttpQuery("semanticVersion")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{ApplicationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetApplicationRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{ApplicationId}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetApplicationPolicyRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Actions: S.optional(__listOf__string),
          PrincipalOrgIDs: S.optional(__listOf__string),
          Principals: S.optional(__listOf__string),
          StatementId: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Actions: "actions",
            PrincipalOrgIDs: "principalOrgIDs",
            Principals: "principals",
            StatementId: "statementId",
          }),
        ),
      ).annotate({ identifier: "ApplicationPolicyStatement" });
    case 1:
      return S.Array(__S(64, __c4, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Statements: S.optional(__listOfApplicationPolicyStatement) }).pipe(
          S.encodeKeys({ Statements: "statements" }),
        ),
      ).annotate({ identifier: "GetApplicationPolicyResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
          TemplateId: S.String.pipe(T.HttpLabel("TemplateId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{ApplicationId}/templates/{TemplateId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCloudFormationTemplateRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("maxItems")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          SemanticVersion: S.optional(S.String).pipe(T.HttpQuery("semanticVersion")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{ApplicationId}/dependencies" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListApplicationDependenciesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.optional(S.String),
          SemanticVersion: S.optional(S.String),
        }).pipe(
          S.encodeKeys({ ApplicationId: "applicationId", SemanticVersion: "semanticVersion" }),
        ),
      ).annotate({ identifier: "ApplicationDependencySummary" });
    case 2:
      return S.Array(__S(97, __c6, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Dependencies: S.optional(__listOfApplicationDependencySummary),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ Dependencies: "dependencies", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListApplicationDependenciesResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("maxItems")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/applications" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListApplicationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.optional(S.String),
          Author: S.optional(S.String),
          CreationTime: S.optional(S.String),
          Description: S.optional(S.String),
          HomePageUrl: S.optional(S.String),
          Labels: S.optional(__listOf__string),
          Name: S.optional(S.String),
          SpdxLicenseId: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ApplicationId: "applicationId",
            Author: "author",
            CreationTime: "creationTime",
            Description: "description",
            HomePageUrl: "homePageUrl",
            Labels: "labels",
            Name: "name",
            SpdxLicenseId: "spdxLicenseId",
          }),
        ),
      ).annotate({ identifier: "ApplicationSummary" });
    case 2:
      return S.Array(__S(113, __c7, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Applications: S.optional(__listOfApplicationSummary),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ Applications: "applications", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListApplicationsResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("maxItems")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/applications/{ApplicationId}/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListApplicationVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.optional(S.String),
          CreationTime: S.optional(S.String),
          SemanticVersion: S.optional(S.String),
          SourceCodeUrl: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ApplicationId: "applicationId",
            CreationTime: "creationTime",
            SemanticVersion: "semanticVersion",
            SourceCodeUrl: "sourceCodeUrl",
          }),
        ),
      ).annotate({ identifier: "VersionSummary" });
    case 2:
      return S.Array(__S(129, __c8, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          Versions: S.optional(__listOfVersionSummary),
        }).pipe(S.encodeKeys({ NextToken: "nextToken", Versions: "versions" })),
      ).annotate({ identifier: "ListApplicationVersionsResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
          Statements: S.optional(__listOfApplicationPolicyStatement),
        })
          .pipe(S.encodeKeys({ Statements: "statements" }))
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/applications/{ApplicationId}/policy" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "PutApplicationPolicyRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
          OrganizationId: S.optional(S.String),
        })
          .pipe(S.encodeKeys({ OrganizationId: "organizationId" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/applications/{ApplicationId}/unshare" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UnshareApplicationRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
          Author: S.optional(S.String),
          Description: S.optional(S.String),
          HomePageUrl: S.optional(S.String),
          Labels: S.optional(__listOf__string),
          ReadmeBody: S.optional(S.String),
          ReadmeUrl: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              Author: "author",
              Description: "description",
              HomePageUrl: "homePageUrl",
              Labels: "labels",
              ReadmeBody: "readmeBody",
              ReadmeUrl: "readmeUrl",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "PATCH", uri: "/applications/{ApplicationId}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateApplicationRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Author: S.optional(S.String),
          Description: S.optional(S.String),
          HomePageUrl: S.optional(S.String),
          Labels: S.optional(__listOf__string),
          LicenseBody: S.optional(S.String),
          LicenseUrl: S.optional(S.String),
          Name: S.optional(S.String),
          ReadmeBody: S.optional(S.String),
          ReadmeUrl: S.optional(S.String),
          SemanticVersion: S.optional(S.String),
          SourceCodeArchiveUrl: S.optional(S.String),
          SourceCodeUrl: S.optional(S.String),
          SpdxLicenseId: S.optional(S.String),
          TemplateBody: S.optional(S.String),
          TemplateUrl: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              Author: "author",
              Description: "description",
              HomePageUrl: "homePageUrl",
              Labels: "labels",
              LicenseBody: "licenseBody",
              LicenseUrl: "licenseUrl",
              Name: "name",
              ReadmeBody: "readmeBody",
              ReadmeUrl: "readmeUrl",
              SemanticVersion: "semanticVersion",
              SourceCodeArchiveUrl: "sourceCodeArchiveUrl",
              SourceCodeUrl: "sourceCodeUrl",
              SpdxLicenseId: "spdxLicenseId",
              TemplateBody: "templateBody",
              TemplateUrl: "templateUrl",
            }),
          )
          .pipe(
            T.all(T.Http({ method: "POST", uri: "/applications" }), svc, auth, proto, ver, rules),
          ),
      ).annotate({ identifier: "CreateApplicationRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.optional(S.String),
          Author: S.optional(S.String),
          CreationTime: S.optional(S.String),
          Description: S.optional(S.String),
          HomePageUrl: S.optional(S.String),
          IsVerifiedAuthor: S.optional(S.Boolean),
          Labels: S.optional(__listOf__string),
          LicenseUrl: S.optional(S.String),
          Name: S.optional(S.String),
          ReadmeUrl: S.optional(S.String),
          SpdxLicenseId: S.optional(S.String),
          VerifiedAuthorUrl: S.optional(S.String),
          Version: S.optional(__S(227, __c14, 3)),
        }).pipe(
          S.encodeKeys({
            ApplicationId: "applicationId",
            Author: "author",
            CreationTime: "creationTime",
            Description: "description",
            HomePageUrl: "homePageUrl",
            IsVerifiedAuthor: "isVerifiedAuthor",
            Labels: "labels",
            LicenseUrl: "licenseUrl",
            Name: "name",
            ReadmeUrl: "readmeUrl",
            SpdxLicenseId: "spdxLicenseId",
            VerifiedAuthorUrl: "verifiedAuthorUrl",
            Version: "version",
          }),
        ),
      ).annotate({ identifier: "CreateApplicationResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AllowedPattern: S.optional(S.String),
          AllowedValues: S.optional(__listOf__string),
          ConstraintDescription: S.optional(S.String),
          DefaultValue: S.optional(S.String),
          Description: S.optional(S.String),
          MaxLength: S.optional(S.Number),
          MaxValue: S.optional(S.Number),
          MinLength: S.optional(S.Number),
          MinValue: S.optional(S.Number),
          Name: S.optional(S.String),
          NoEcho: S.optional(S.Boolean),
          ReferencedByResources: S.optional(__listOf__string),
          Type: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AllowedPattern: "allowedPattern",
            AllowedValues: "allowedValues",
            ConstraintDescription: "constraintDescription",
            DefaultValue: "defaultValue",
            Description: "description",
            MaxLength: "maxLength",
            MaxValue: "maxValue",
            MinLength: "minLength",
            MinValue: "minValue",
            Name: "name",
            NoEcho: "noEcho",
            ReferencedByResources: "referencedByResources",
            Type: "type",
          }),
        ),
      ).annotate({ identifier: "ParameterDefinition" });
    case 1:
      return S.Array(__S(224, __c14, 0));
    case 2:
      return S.Array(S.String);
    case 3:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.optional(S.String),
          CreationTime: S.optional(S.String),
          ParameterDefinitions: S.optional(__listOfParameterDefinition),
          RequiredCapabilities: S.optional(__listOfCapability),
          ResourcesSupported: S.optional(S.Boolean),
          SemanticVersion: S.optional(S.String),
          SourceCodeArchiveUrl: S.optional(S.String),
          SourceCodeUrl: S.optional(S.String),
          TemplateUrl: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ApplicationId: "applicationId",
            CreationTime: "creationTime",
            ParameterDefinitions: "parameterDefinitions",
            RequiredCapabilities: "requiredCapabilities",
            ResourcesSupported: "resourcesSupported",
            SemanticVersion: "semanticVersion",
            SourceCodeArchiveUrl: "sourceCodeArchiveUrl",
            SourceCodeUrl: "sourceCodeUrl",
            TemplateUrl: "templateUrl",
          }),
        ),
      ).annotate({ identifier: "Version" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
          SemanticVersion: S.String.pipe(T.HttpLabel("SemanticVersion")),
          SourceCodeArchiveUrl: S.optional(S.String),
          SourceCodeUrl: S.optional(S.String),
          TemplateBody: S.optional(S.String),
          TemplateUrl: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              SourceCodeArchiveUrl: "sourceCodeArchiveUrl",
              SourceCodeUrl: "sourceCodeUrl",
              TemplateBody: "templateBody",
              TemplateUrl: "templateUrl",
            }),
          )
          .pipe(
            T.all(
              T.Http({
                method: "PUT",
                uri: "/applications/{ApplicationId}/versions/{SemanticVersion}",
              }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateApplicationVersionRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Value: S.optional(S.String) }).pipe(
          S.encodeKeys({ Name: "name", Value: "value" }),
        ),
      ).annotate({ identifier: "ParameterValue" });
    case 1:
      return S.Array(__S(272, __c17, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Arn: S.optional(S.String), Type: S.optional(S.String) }).pipe(
          S.encodeKeys({ Arn: "arn", Type: "type" }),
        ),
      ).annotate({ identifier: "RollbackTrigger" });
    case 3:
      return S.Array(__S(274, __c17, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          MonitoringTimeInMinutes: S.optional(S.Number),
          RollbackTriggers: S.optional(__listOfRollbackTrigger),
        }).pipe(
          S.encodeKeys({
            MonitoringTimeInMinutes: "monitoringTimeInMinutes",
            RollbackTriggers: "rollbackTriggers",
          }),
        ),
      ).annotate({ identifier: "RollbackConfiguration" });
    case 5:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }).pipe(
          S.encodeKeys({ Key: "key", Value: "value" }),
        ),
      ).annotate({ identifier: "Tag" });
    case 6:
      return S.Array(__S(277, __c17, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
          Capabilities: S.optional(__listOf__string),
          ChangeSetName: S.optional(S.String),
          ClientToken: S.optional(S.String),
          Description: S.optional(S.String),
          NotificationArns: S.optional(__listOf__string),
          ParameterOverrides: S.optional(__listOfParameterValue),
          ResourceTypes: S.optional(__listOf__string),
          RollbackConfiguration: S.optional(__S(276, __c17, 4)),
          SemanticVersion: S.optional(S.String),
          StackName: S.optional(S.String),
          Tags: S.optional(__listOfTag),
          TemplateId: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              Capabilities: "capabilities",
              ChangeSetName: "changeSetName",
              ClientToken: "clientToken",
              Description: "description",
              NotificationArns: "notificationArns",
              ParameterOverrides: "parameterOverrides",
              ResourceTypes: "resourceTypes",
              RollbackConfiguration: "rollbackConfiguration",
              SemanticVersion: "semanticVersion",
              StackName: "stackName",
              Tags: "tags",
              TemplateId: "templateId",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/applications/{ApplicationId}/changesets" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateCloudFormationChangeSetRequest" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.optional(S.String),
          ChangeSetId: S.optional(S.String),
          SemanticVersion: S.optional(S.String),
          StackId: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ApplicationId: "applicationId",
            ChangeSetId: "changeSetId",
            SemanticVersion: "semanticVersion",
            StackId: "stackId",
          }),
        ),
      ).annotate({ identifier: "CreateCloudFormationChangeSetResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
          SemanticVersion: S.optional(S.String),
        })
          .pipe(S.encodeKeys({ SemanticVersion: "semanticVersion" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/applications/{ApplicationId}/templates" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateCloudFormationTemplateRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.optional(S.String),
          CreationTime: S.optional(S.String),
          ExpirationTime: S.optional(S.String),
          SemanticVersion: S.optional(S.String),
          Status: S.optional(S.String),
          TemplateId: S.optional(S.String),
          TemplateUrl: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ApplicationId: "applicationId",
            CreationTime: "creationTime",
            ExpirationTime: "expirationTime",
            SemanticVersion: "semanticVersion",
            Status: "status",
            TemplateId: "templateId",
            TemplateUrl: "templateUrl",
          }),
        ),
      ).annotate({ identifier: "CreateCloudFormationTemplateResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
