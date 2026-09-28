import type * as HttpClient from "effect/unstable/http/HttpClient";
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
  sdkId: "ServerlessApplicationRepository",
  target: "ServerlessApplicationRepository",
  version: "2017-09-08",
  sigv4: "serverlessrepo",
  protocol: restJson1Protocol,
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://serverlessrepo.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://serverlessrepo.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "BadRequestException",
    ["BadRequestError"],
    { status: 400, renames: { ErrorCode: "errorCode", Message: "message" } },
  )<{ readonly ErrorCode?: string; readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
    renames: { ErrorCode: "errorCode", Message: "message" },
  })<{ readonly ErrorCode?: string; readonly message?: string }> {}
export class ForbiddenException
  extends /*@__PURE__*/ TE.TaggedError("ForbiddenException", ["AuthError"], {
    status: 403,
    renames: { ErrorCode: "errorCode", Message: "message" },
  })<{ readonly ErrorCode?: string; readonly message?: string }> {}
export class InternalServerErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerErrorException",
    ["ServerError"],
    { status: 500, renames: { ErrorCode: "errorCode", Message: "message" } },
  )<{ readonly ErrorCode?: string; readonly message?: string }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    { status: 404, renames: { ErrorCode: "errorCode", Message: "message" } },
  )<{ readonly ErrorCode?: string; readonly message?: string }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRequestsException",
    ["ThrottlingError"],
    { status: 429, renames: { ErrorCode: "errorCode", Message: "message" } },
  )<{ readonly ErrorCode?: string; readonly message?: string }> {}
export type __listOf__string = string[];
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
export type Capability =
  | "CAPABILITY_IAM"
  | "CAPABILITY_NAMED_IAM"
  | "CAPABILITY_AUTO_EXPAND"
  | "CAPABILITY_RESOURCE_POLICY"
  | (string & {});
export type __listOfCapability = Capability[];
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
export interface RollbackTrigger {
  Arn?: string;
  Type?: string;
}
export type __listOfRollbackTrigger = RollbackTrigger[];
export interface RollbackConfiguration {
  MonitoringTimeInMinutes?: number;
  RollbackTriggers?: RollbackTrigger[];
}
export interface Tag {
  Key?: string;
  Value?: string;
}
export type __listOfTag = Tag[];
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
export type __listOfApplicationDependencySummary =
  ApplicationDependencySummary[];
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
  descriptor: {
    service: svc,
    http: "POST /applications",
    input: {
      Author: D.m({ wire: "author" }),
      Description: D.m({ wire: "description" }),
      HomePageUrl: D.m({ wire: "homePageUrl" }),
      Labels: D.m({ wire: "labels" }),
      LicenseBody: D.m({ wire: "licenseBody" }),
      LicenseUrl: D.m({ wire: "licenseUrl" }),
      Name: D.m({ wire: "name" }),
      ReadmeBody: D.m({ wire: "readmeBody" }),
      ReadmeUrl: D.m({ wire: "readmeUrl" }),
      SemanticVersion: D.m({ wire: "semanticVersion" }),
      SourceCodeArchiveUrl: D.m({ wire: "sourceCodeArchiveUrl" }),
      SourceCodeUrl: D.m({ wire: "sourceCodeUrl" }),
      SpdxLicenseId: D.m({ wire: "spdxLicenseId" }),
      TemplateBody: D.m({ wire: "templateBody" }),
      TemplateUrl: D.m({ wire: "templateUrl" }),
    },
    output: {
      ApplicationId: D.m({ wire: "applicationId" }),
      Author: D.m({ wire: "author" }),
      CreationTime: D.m({ wire: "creationTime" }),
      Description: D.m({ wire: "description" }),
      HomePageUrl: D.m({ wire: "homePageUrl" }),
      IsVerifiedAuthor: D.m({ wire: "isVerifiedAuthor" }),
      Labels: D.m({ wire: "labels" }),
      LicenseUrl: D.m({ wire: "licenseUrl" }),
      Name: D.m({ wire: "name" }),
      ReadmeUrl: D.m({ wire: "readmeUrl" }),
      SpdxLicenseId: D.m({ wire: "spdxLicenseId" }),
      VerifiedAuthorUrl: D.m({ wire: "verifiedAuthorUrl" }),
      Version: D.m({ wire: "version", shape: o_Version }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /applications/{ApplicationId}/versions/{SemanticVersion}",
    input: {
      ApplicationId: 0,
      SemanticVersion: 0,
      SourceCodeArchiveUrl: D.m({ wire: "sourceCodeArchiveUrl" }),
      SourceCodeUrl: D.m({ wire: "sourceCodeUrl" }),
      TemplateBody: D.m({ wire: "templateBody" }),
      TemplateUrl: D.m({ wire: "templateUrl" }),
    },
    output: {
      ApplicationId: D.m({ wire: "applicationId" }),
      CreationTime: D.m({ wire: "creationTime" }),
      ParameterDefinitions: D.m({
        wire: "parameterDefinitions",
        shape: D.list(o_ParameterDefinition),
      }),
      RequiredCapabilities: D.m({ wire: "requiredCapabilities" }),
      ResourcesSupported: D.m({ wire: "resourcesSupported" }),
      SemanticVersion: D.m({ wire: "semanticVersion" }),
      SourceCodeArchiveUrl: D.m({ wire: "sourceCodeArchiveUrl" }),
      SourceCodeUrl: D.m({ wire: "sourceCodeUrl" }),
      TemplateUrl: D.m({ wire: "templateUrl" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /applications/{ApplicationId}/changesets",
    input: {
      ApplicationId: 0,
      Capabilities: D.m({ wire: "capabilities" }),
      ChangeSetName: D.m({ wire: "changeSetName" }),
      ClientToken: D.m({ wire: "clientToken" }),
      Description: D.m({ wire: "description" }),
      NotificationArns: D.m({ wire: "notificationArns" }),
      ParameterOverrides: D.m({
        wire: "parameterOverrides",
        shape: D.list({
          Name: D.m({ wire: "name" }),
          Value: D.m({ wire: "value" }),
        }),
      }),
      ResourceTypes: D.m({ wire: "resourceTypes" }),
      RollbackConfiguration: D.m({
        wire: "rollbackConfiguration",
        shape: {
          MonitoringTimeInMinutes: D.m({ wire: "monitoringTimeInMinutes" }),
          RollbackTriggers: D.m({
            wire: "rollbackTriggers",
            shape: D.list({
              Arn: D.m({ wire: "arn" }),
              Type: D.m({ wire: "type" }),
            }),
          }),
        },
      }),
      SemanticVersion: D.m({ wire: "semanticVersion" }),
      StackName: D.m({ wire: "stackName" }),
      Tags: D.m({
        wire: "tags",
        shape: D.list({
          Key: D.m({ wire: "key" }),
          Value: D.m({ wire: "value" }),
        }),
      }),
      TemplateId: D.m({ wire: "templateId" }),
    },
    output: {
      ApplicationId: D.m({ wire: "applicationId" }),
      ChangeSetId: D.m({ wire: "changeSetId" }),
      SemanticVersion: D.m({ wire: "semanticVersion" }),
      StackId: D.m({ wire: "stackId" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCloudFormationChangeSet",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /applications/{ApplicationId}/templates",
    input: {
      ApplicationId: 0,
      SemanticVersion: D.m({ wire: "semanticVersion" }),
    },
    output: {
      ApplicationId: D.m({ wire: "applicationId" }),
      CreationTime: D.m({ wire: "creationTime" }),
      ExpirationTime: D.m({ wire: "expirationTime" }),
      SemanticVersion: D.m({ wire: "semanticVersion" }),
      Status: D.m({ wire: "status" }),
      TemplateId: D.m({ wire: "templateId" }),
      TemplateUrl: D.m({ wire: "templateUrl" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /applications/{ApplicationId}",
    input: { ApplicationId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /applications/{ApplicationId}",
    input: {
      ApplicationId: 0,
      SemanticVersion: D.m({ query: "semanticVersion" }),
    },
    output: {
      ApplicationId: D.m({ wire: "applicationId" }),
      Author: D.m({ wire: "author" }),
      CreationTime: D.m({ wire: "creationTime" }),
      Description: D.m({ wire: "description" }),
      HomePageUrl: D.m({ wire: "homePageUrl" }),
      IsVerifiedAuthor: D.m({ wire: "isVerifiedAuthor" }),
      Labels: D.m({ wire: "labels" }),
      LicenseUrl: D.m({ wire: "licenseUrl" }),
      Name: D.m({ wire: "name" }),
      ReadmeUrl: D.m({ wire: "readmeUrl" }),
      SpdxLicenseId: D.m({ wire: "spdxLicenseId" }),
      VerifiedAuthorUrl: D.m({ wire: "verifiedAuthorUrl" }),
      Version: D.m({ wire: "version", shape: o_Version }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /applications/{ApplicationId}/policy",
    input: { ApplicationId: 0 },
    output: {
      Statements: D.m({
        wire: "statements",
        shape: D.list(o_ApplicationPolicyStatement),
      }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /applications/{ApplicationId}/templates/{TemplateId}",
    input: { ApplicationId: 0, TemplateId: 0 },
    output: {
      ApplicationId: D.m({ wire: "applicationId" }),
      CreationTime: D.m({ wire: "creationTime" }),
      ExpirationTime: D.m({ wire: "expirationTime" }),
      SemanticVersion: D.m({ wire: "semanticVersion" }),
      Status: D.m({ wire: "status" }),
      TemplateId: D.m({ wire: "templateId" }),
      TemplateUrl: D.m({ wire: "templateUrl" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /applications/{ApplicationId}/dependencies",
    input: {
      ApplicationId: 0,
      MaxItems: D.m({ query: "maxItems" }),
      NextToken: D.m({ query: "nextToken" }),
      SemanticVersion: D.m({ query: "semanticVersion" }),
    },
    output: {
      Dependencies: D.m({
        wire: "dependencies",
        shape: D.list({
          ApplicationId: D.m({ wire: "applicationId" }),
          SemanticVersion: D.m({ wire: "semanticVersion" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
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
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxItems",
  } as const,
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
  descriptor: {
    service: svc,
    http: "GET /applications",
    input: {
      MaxItems: D.m({ query: "maxItems" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      Applications: D.m({
        wire: "applications",
        shape: D.list({
          ApplicationId: D.m({ wire: "applicationId" }),
          Author: D.m({ wire: "author" }),
          CreationTime: D.m({ wire: "creationTime" }),
          Description: D.m({ wire: "description" }),
          HomePageUrl: D.m({ wire: "homePageUrl" }),
          Labels: D.m({ wire: "labels" }),
          Name: D.m({ wire: "name" }),
          SpdxLicenseId: D.m({ wire: "spdxLicenseId" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplications",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxItems",
  } as const,
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
  descriptor: {
    service: svc,
    http: "GET /applications/{ApplicationId}/versions",
    input: {
      ApplicationId: 0,
      MaxItems: D.m({ query: "maxItems" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      NextToken: D.m({ wire: "nextToken" }),
      Versions: D.m({
        wire: "versions",
        shape: D.list({
          ApplicationId: D.m({ wire: "applicationId" }),
          CreationTime: D.m({ wire: "creationTime" }),
          SemanticVersion: D.m({ wire: "semanticVersion" }),
          SourceCodeUrl: D.m({ wire: "sourceCodeUrl" }),
        }),
      }),
    },
  },
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
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxItems",
  } as const,
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
  descriptor: {
    service: svc,
    http: "PUT /applications/{ApplicationId}/policy",
    input: {
      ApplicationId: 0,
      Statements: D.m({
        wire: "statements",
        shape: D.list({
          Actions: D.m({ wire: "actions" }),
          PrincipalOrgIDs: D.m({ wire: "principalOrgIDs" }),
          Principals: D.m({ wire: "principals" }),
          StatementId: D.m({ wire: "statementId" }),
        }),
      }),
    },
    output: {
      Statements: D.m({
        wire: "statements",
        shape: D.list(o_ApplicationPolicyStatement),
      }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /applications/{ApplicationId}/unshare",
    input: {
      ApplicationId: 0,
      OrganizationId: D.m({ wire: "organizationId" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /applications/{ApplicationId}",
    input: {
      ApplicationId: 0,
      Author: D.m({ wire: "author" }),
      Description: D.m({ wire: "description" }),
      HomePageUrl: D.m({ wire: "homePageUrl" }),
      Labels: D.m({ wire: "labels" }),
      ReadmeBody: D.m({ wire: "readmeBody" }),
      ReadmeUrl: D.m({ wire: "readmeUrl" }),
    },
    output: {
      ApplicationId: D.m({ wire: "applicationId" }),
      Author: D.m({ wire: "author" }),
      CreationTime: D.m({ wire: "creationTime" }),
      Description: D.m({ wire: "description" }),
      HomePageUrl: D.m({ wire: "homePageUrl" }),
      IsVerifiedAuthor: D.m({ wire: "isVerifiedAuthor" }),
      Labels: D.m({ wire: "labels" }),
      LicenseUrl: D.m({ wire: "licenseUrl" }),
      Name: D.m({ wire: "name" }),
      ReadmeUrl: D.m({ wire: "readmeUrl" }),
      SpdxLicenseId: D.m({ wire: "spdxLicenseId" }),
      VerifiedAuthorUrl: D.m({ wire: "verifiedAuthorUrl" }),
      Version: D.m({ wire: "version", shape: o_Version }),
    },
    body: true,
  },
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
})) as any;

const o_ApplicationPolicyStatement: D.LazyStruct = () => ({
  Actions: D.m({ wire: "actions" }),
  PrincipalOrgIDs: D.m({ wire: "principalOrgIDs" }),
  Principals: D.m({ wire: "principals" }),
  StatementId: D.m({ wire: "statementId" }),
});
const o_ParameterDefinition: D.LazyStruct = () => ({
  AllowedPattern: D.m({ wire: "allowedPattern" }),
  AllowedValues: D.m({ wire: "allowedValues" }),
  ConstraintDescription: D.m({ wire: "constraintDescription" }),
  DefaultValue: D.m({ wire: "defaultValue" }),
  Description: D.m({ wire: "description" }),
  MaxLength: D.m({ wire: "maxLength" }),
  MaxValue: D.m({ wire: "maxValue" }),
  MinLength: D.m({ wire: "minLength" }),
  MinValue: D.m({ wire: "minValue" }),
  Name: D.m({ wire: "name" }),
  NoEcho: D.m({ wire: "noEcho" }),
  ReferencedByResources: D.m({ wire: "referencedByResources" }),
  Type: D.m({ wire: "type" }),
});
const o_Version: D.LazyStruct = () => ({
  ApplicationId: D.m({ wire: "applicationId" }),
  CreationTime: D.m({ wire: "creationTime" }),
  ParameterDefinitions: D.m({
    wire: "parameterDefinitions",
    shape: D.list(o_ParameterDefinition),
  }),
  RequiredCapabilities: D.m({ wire: "requiredCapabilities" }),
  ResourcesSupported: D.m({ wire: "resourcesSupported" }),
  SemanticVersion: D.m({ wire: "semanticVersion" }),
  SourceCodeArchiveUrl: D.m({ wire: "sourceCodeArchiveUrl" }),
  SourceCodeUrl: D.m({ wire: "sourceCodeUrl" }),
  TemplateUrl: D.m({ wire: "templateUrl" }),
});
