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
  sdkId: "ControlCatalog",
  target: "ControlCatalog",
  version: "2018-05-10",
  sigv4: "controlcatalog",
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
                `https://controlcatalog-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://controlcatalog-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://controlcatalog.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://controlcatalog.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type ControlArn = string;
export interface GetControlRequest {
  ControlArn: string;
}
export type ControlAlias = string;
export type ControlAliases = string[];
export type ControlBehavior =
  | "PREVENTIVE"
  | "PROACTIVE"
  | "DETECTIVE"
  | (string & {});
export type ControlSeverity =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL"
  | (string & {});
export type ControlScope = "GLOBAL" | "REGIONAL" | (string & {});
export type RegionCode = string;
export type DeployableRegions = string[];
export interface RegionConfiguration {
  Scope: ControlScope;
  DeployableRegions?: string[];
}
export type ImplementationType = string;
export type ImplementationIdentifier = string;
export interface ImplementationDetails {
  Type: string;
  Identifier?: string;
}
export type ParameterRequirementSummary =
  | "REQUIRED"
  | "OPTIONAL"
  | "NONE"
  | (string & {});
export type ControlParameterRequirement =
  | "REQUIRED"
  | "OPTIONAL"
  | (string & {});
export interface ControlParameter {
  Name: string;
  Requirement?: ControlParameterRequirement;
}
export type ControlParameters = ControlParameter[];
export type GovernedResource = string;
export type GovernedResources = string[];
export type GovernedProvider = string;
export type GovernedProviders = string[];
export interface GetControlResponse {
  Arn: string;
  Aliases?: string[];
  Name: string;
  Description: string;
  Behavior: ControlBehavior;
  Severity?: ControlSeverity;
  RegionConfiguration: RegionConfiguration;
  Implementation?: ImplementationDetails;
  ParameterRequirementSummary?: ParameterRequirementSummary;
  Parameters?: ControlParameter[];
  CreateTime?: Date;
  GovernedResources?: string[];
  GovernedProviders?: string[];
}
export type MaxListCommonControlsResults = number;
export type PaginationToken = string;
export type ObjectiveArn = string;
export interface ObjectiveResourceFilter {
  Arn?: string;
}
export type ObjectiveResourceFilterList = ObjectiveResourceFilter[];
export interface CommonControlFilter {
  Objectives?: ObjectiveResourceFilter[];
}
export interface ListCommonControlsRequest {
  MaxResults?: number;
  NextToken?: string;
  CommonControlFilter?: CommonControlFilter;
}
export type CommonControlArn = string;
export type DomainArn = string;
export interface AssociatedDomainSummary {
  Arn?: string;
  Name?: string;
}
export interface AssociatedObjectiveSummary {
  Arn?: string;
  Name?: string;
}
export interface CommonControlSummary {
  Arn: string;
  Name: string;
  Description: string;
  Domain: AssociatedDomainSummary;
  Objective: AssociatedObjectiveSummary;
  CreateTime: Date;
  LastUpdateTime: Date;
}
export type CommonControlSummaryList = CommonControlSummary[];
export interface ListCommonControlsResponse {
  CommonControls: CommonControlSummary[];
  NextToken?: string;
}
export type MaxListControlMappingsResults = number;
export type ControlArnFilterList = string[];
export type CommonControlArnFilterList = string[];
export type MappingType =
  | "FRAMEWORK"
  | "COMMON_CONTROL"
  | "RELATED_CONTROL"
  | (string & {});
export type MappingTypeFilterList = MappingType[];
export interface ControlMappingFilter {
  ControlArns?: string[];
  CommonControlArns?: string[];
  MappingTypes?: MappingType[];
}
export interface ListControlMappingsRequest {
  NextToken?: string;
  MaxResults?: number;
  Filter?: ControlMappingFilter;
}
export type FrameworkName = string;
export type FrameworkItem = string;
export interface FrameworkMappingDetails {
  Name: string;
  Item: string;
}
export interface CommonControlMappingDetails {
  CommonControlArn: string;
}
export type ControlRelationType =
  | "COMPLEMENTARY"
  | "ALTERNATIVE"
  | "MUTUALLY_EXCLUSIVE"
  | (string & {});
export interface RelatedControlMappingDetails {
  ControlArn?: string;
  RelationType: ControlRelationType;
}
export type Mapping =
  | {
      Framework: FrameworkMappingDetails;
      CommonControl?: never;
      RelatedControl?: never;
    }
  | {
      Framework?: never;
      CommonControl: CommonControlMappingDetails;
      RelatedControl?: never;
    }
  | {
      Framework?: never;
      CommonControl?: never;
      RelatedControl: RelatedControlMappingDetails;
    };
export interface ControlMapping {
  ControlArn: string;
  MappingType: MappingType;
  Mapping: Mapping;
}
export type ControlMappings = ControlMapping[];
export interface ListControlMappingsResponse {
  ControlMappings: ControlMapping[];
  NextToken?: string;
}
export type MaxListControlsResults = number;
export type ImplementationTypeFilterList = string[];
export type ImplementationIdentifierFilterList = string[];
export interface ImplementationFilter {
  Types?: string[];
  Identifiers?: string[];
}
export type GovernedProviderFilterList = string[];
export interface ControlFilter {
  Implementations?: ImplementationFilter;
  GovernedProviders?: string[];
}
export interface ListControlsRequest {
  NextToken?: string;
  MaxResults?: number;
  Filter?: ControlFilter;
}
export interface ImplementationSummary {
  Type: string;
  Identifier?: string;
}
export interface ControlSummary {
  Arn: string;
  Aliases?: string[];
  Name: string;
  Description: string;
  Behavior?: ControlBehavior;
  Severity?: ControlSeverity;
  ParameterRequirementSummary?: ParameterRequirementSummary;
  Implementation?: ImplementationSummary;
  CreateTime?: Date;
  GovernedResources?: string[];
  GovernedProviders?: string[];
}
export type Controls = ControlSummary[];
export interface ListControlsResponse {
  Controls: ControlSummary[];
  NextToken?: string;
}
export type MaxListDomainsResults = number;
export interface ListDomainsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface DomainSummary {
  Arn: string;
  Name: string;
  Description: string;
  CreateTime: Date;
  LastUpdateTime: Date;
}
export type DomainSummaryList = DomainSummary[];
export interface ListDomainsResponse {
  Domains: DomainSummary[];
  NextToken?: string;
}
export type MaxListObjectivesResults = number;
export interface DomainResourceFilter {
  Arn?: string;
}
export type DomainResourceFilterList = DomainResourceFilter[];
export interface ObjectiveFilter {
  Domains?: DomainResourceFilter[];
}
export interface ListObjectivesRequest {
  MaxResults?: number;
  NextToken?: string;
  ObjectiveFilter?: ObjectiveFilter;
}
export interface ObjectiveSummary {
  Arn: string;
  Name: string;
  Description: string;
  Domain: AssociatedDomainSummary;
  CreateTime: Date;
  LastUpdateTime: Date;
}
export type ObjectiveSummaryList = ObjectiveSummary[];
export interface ListObjectivesResponse {
  Objectives: ObjectiveSummary[];
  NextToken?: string;
}
export type GetControlError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns details about a specific control, most notably a list of Amazon Web Services Regions where this control is supported. Input a value for the *ControlArn* parameter, in ARN form. `GetControl` accepts *controltower* or *controlcatalog* control ARNs as input. Returns a *controlcatalog* ARN format.
 *
 * In the API response, controls that have the value `GLOBAL` in the `Scope` field do not show the `DeployableRegions` field, because it does not apply. Controls that have the value `REGIONAL` in the `Scope` field return a value for the `DeployableRegions` field, as shown in the example.
 */
export const getControl: API.OperationMethod<
  GetControlRequest,
  GetControlResponse,
  GetControlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /get-control",
    input: { ControlArn: 0 },
    output: { CreateTime: D.ts },
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
  operationName: "GetControl",
})) as any;

export type ListCommonControlsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a paginated list of common controls from the Amazon Web Services Control Catalog.
 *
 * You can apply an optional filter to see common controls that have a specific objective. If you don’t provide a filter, the operation returns all common controls.
 */
export const listCommonControls: API.PaginatedOperationMethod<
  ListCommonControlsRequest,
  ListCommonControlsResponse,
  ListCommonControlsError,
  Credentials | HttpClient.HttpClient,
  CommonControlSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /common-controls",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      CommonControlFilter: { Objectives: D.list({ Arn: 0 }) },
    },
    output: {
      CommonControls: D.list({ CreateTime: D.ts, LastUpdateTime: D.ts }),
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
  operationName: "ListCommonControls",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CommonControls",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListControlMappingsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a paginated list of control mappings from the Control Catalog. Control mappings show relationships between controls and other entities, such as common controls or compliance frameworks.
 */
export const listControlMappings: API.PaginatedOperationMethod<
  ListControlMappingsRequest,
  ListControlMappingsResponse,
  ListControlMappingsError,
  Credentials | HttpClient.HttpClient,
  ControlMapping
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /list-control-mappings",
    input: {
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
      Filter: { ControlArns: 0, CommonControlArns: 0, MappingTypes: 0 },
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
  operationName: "ListControlMappings",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ControlMappings",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListControlsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a paginated list of all available controls in the Control Catalog library. Allows you to discover available controls. The list of controls is given as structures of type *controlSummary*. The ARN is returned in the global *controlcatalog* format, as shown in the examples.
 */
export const listControls: API.PaginatedOperationMethod<
  ListControlsRequest,
  ListControlsResponse,
  ListControlsError,
  Credentials | HttpClient.HttpClient,
  ControlSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /list-controls",
    input: {
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
      Filter: {
        Implementations: { Types: 0, Identifiers: 0 },
        GovernedProviders: 0,
      },
    },
    output: { Controls: D.list({ CreateTime: D.ts }) },
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
  operationName: "ListControls",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Controls",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDomainsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a paginated list of domains from the Control Catalog.
 */
export const listDomains: API.PaginatedOperationMethod<
  ListDomainsRequest,
  ListDomainsResponse,
  ListDomainsError,
  Credentials | HttpClient.HttpClient,
  DomainSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /domains",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: { Domains: D.list({ CreateTime: D.ts, LastUpdateTime: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomains",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Domains",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListObjectivesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a paginated list of objectives from the Control Catalog.
 *
 * You can apply an optional filter to see the objectives that belong to a specific domain. If you don’t provide a filter, the operation returns all objectives.
 */
export const listObjectives: API.PaginatedOperationMethod<
  ListObjectivesRequest,
  ListObjectivesResponse,
  ListObjectivesError,
  Credentials | HttpClient.HttpClient,
  ObjectiveSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /objectives",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      ObjectiveFilter: { Domains: D.list({ Arn: 0 }) },
    },
    output: { Objectives: D.list({ CreateTime: D.ts, LastUpdateTime: D.ts }) },
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
  operationName: "ListObjectives",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Objectives",
    pageSize: "MaxResults",
  } as const,
})) as any;
