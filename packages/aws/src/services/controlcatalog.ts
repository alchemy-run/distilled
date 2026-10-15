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
  sdkId: "ControlCatalog",
  serviceShapeName: "ControlCatalog",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "controlcatalog" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-05-10");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://controlcatalog.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://controlcatalog.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://controlcatalog.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ControlArn = string;
export interface GetControlRequest {
  ControlArn: string;
}
export type ControlAlias = string;
export type ControlAliases = string[];
export type ControlBehavior = "PREVENTIVE" | "PROACTIVE" | "DETECTIVE" | (string & {});
export type ControlSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | (string & {});
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
export type ParameterRequirementSummary = "REQUIRED" | "OPTIONAL" | "NONE" | (string & {});
export type ControlParameterRequirement = "REQUIRED" | "OPTIONAL" | (string & {});
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
export type MappingType = "FRAMEWORK" | "COMMON_CONTROL" | "RELATED_CONTROL" | (string & {});
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
  | { Framework: FrameworkMappingDetails; CommonControl?: never; RelatedControl?: never }
  | { Framework?: never; CommonControl: CommonControlMappingDetails; RelatedControl?: never }
  | { Framework?: never; CommonControl?: never; RelatedControl: RelatedControlMappingDetails };
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
  input: __S(16, __c1, 0) as any as S.Schema<GetControlRequest>,
  output: __S(20, __c1, 4) as any as S.Schema<GetControlResponse>,
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
}));

export type ListCommonControlsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a paginated list of common controls from the Amazon Web Services Control Catalog.
 *
 * You can apply an optional filter to see common controls that have a specific objective. If you don't provide a filter, the operation returns all common controls.
 */
export const listCommonControls: API.PaginatedOperationMethod<
  ListCommonControlsRequest,
  ListCommonControlsResponse,
  ListCommonControlsError,
  Credentials | HttpClient.HttpClient,
  CommonControlSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(65, __c4, 1) as any as S.Schema<ListCommonControlsRequest>,
  output: __S(68, __c4, 4) as any as S.Schema<ListCommonControlsResponse>,
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
  input: __S(98, __c6, 2) as any as S.Schema<ListControlMappingsRequest>,
  output: __S(105, __c6, 9) as any as S.Schema<ListControlMappingsResponse>,
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
  input: __S(114, __c7, 2) as any as S.Schema<ListControlsRequest>,
  output: __S(117, __c7, 5) as any as S.Schema<ListControlsResponse>,
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
  input: __S(128, __c8, 0) as any as S.Schema<ListDomainsRequest>,
  output: __S(131, __c8, 3) as any as S.Schema<ListDomainsResponse>,
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
 * You can apply an optional filter to see the objectives that belong to a specific domain. If you don't provide a filter, the operation returns all objectives.
 */
export const listObjectives: API.PaginatedOperationMethod<
  ListObjectivesRequest,
  ListObjectivesResponse,
  ListObjectivesError,
  Credentials | HttpClient.HttpClient,
  ObjectiveSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1, __c0, 1) as any as S.Schema<ListObjectivesRequest>,
  output: __S(4, __c0, 4) as any as S.Schema<ListObjectivesResponse>,
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

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Domains: S.optional(__S(81, __c5, 1)) })).annotate({
        identifier: "ObjectiveFilter",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          ObjectiveFilter: S.optional(__S(0, __c0, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/objectives" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListObjectivesRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Name: S.String,
          Description: S.String,
          Domain: __S(82, __c5, 2),
          CreateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          LastUpdateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "ObjectiveSummary" });
    case 3:
      return S.Array(__S(2, __c0, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ Objectives: __S(3, __c0, 3), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListObjectivesResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ControlArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/get-control" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetControlRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Scope: S.String, DeployableRegions: S.optional(__S(32, __c2, 0)) }),
      ).annotate({ identifier: "RegionConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Requirement: S.optional(S.String) }),
      ).annotate({ identifier: "ControlParameter" });
    case 3:
      return S.Array(__S(18, __c1, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Aliases: S.optional(__S(32, __c2, 0)),
          Name: S.String,
          Description: S.String,
          Behavior: S.String,
          Severity: S.optional(S.String),
          RegionConfiguration: __S(17, __c1, 1),
          Implementation: S.optional(__S(48, __c3, 0)),
          ParameterRequirementSummary: S.optional(S.String),
          Parameters: S.optional(__S(19, __c1, 3)),
          CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          GovernedResources: S.optional(__S(32, __c2, 0)),
          GovernedProviders: S.optional(__S(32, __c2, 0)),
        }),
      ).annotate({ identifier: "GetControlResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Type: S.String, Identifier: S.optional(S.String) }),
      ).annotate({ identifier: "ImplementationDetails" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Objectives: S.optional(__S(81, __c5, 1)) })).annotate({
        identifier: "CommonControlFilter",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          CommonControlFilter: S.optional(__S(64, __c4, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/common-controls" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListCommonControlsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Name: S.String,
          Description: S.String,
          Domain: __S(82, __c5, 2),
          Objective: __S(82, __c5, 2),
          CreateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          LastUpdateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "CommonControlSummary" });
    case 3:
      return S.Array(__S(66, __c4, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ CommonControls: __S(67, __c4, 3), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListCommonControlsResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Arn: S.optional(S.String) })).annotate({
        identifier: "ObjectiveResourceFilter",
      });
    case 1:
      return S.Array(__S(80, __c5, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Arn: S.optional(S.String), Name: S.optional(S.String) }),
      ).annotate({ identifier: "AssociatedDomainSummary" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          ControlArns: S.optional(__S(32, __c2, 0)),
          CommonControlArns: S.optional(__S(32, __c2, 0)),
          MappingTypes: S.optional(__S(96, __c6, 0)),
        }),
      ).annotate({ identifier: "ControlMappingFilter" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          Filter: S.optional(__S(97, __c6, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-control-mappings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListControlMappingsRequest" });
    case 3:
      return S.suspend(() => S.Struct({ Name: S.String, Item: S.String })).annotate({
        identifier: "FrameworkMappingDetails",
      });
    case 4:
      return S.suspend(() => S.Struct({ CommonControlArn: S.String })).annotate({
        identifier: "CommonControlMappingDetails",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({ ControlArn: S.optional(S.String), RelationType: S.String }),
      ).annotate({ identifier: "RelatedControlMappingDetails" });
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({ Framework: __S(99, __c6, 3) }),
        /*@__PURE__*/ S.Struct({ CommonControl: __S(100, __c6, 4) }),
        /*@__PURE__*/ S.Struct({ RelatedControl: __S(101, __c6, 5) }),
      ]);
    case 7:
      return S.suspend(() =>
        S.Struct({ ControlArn: S.String, MappingType: S.String, Mapping: __S(102, __c6, 6) }),
      ).annotate({ identifier: "ControlMapping" });
    case 8:
      return S.Array(__S(103, __c6, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({ ControlMappings: __S(104, __c6, 8), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListControlMappingsResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Types: S.optional(__S(32, __c2, 0)),
          Identifiers: S.optional(__S(32, __c2, 0)),
        }),
      ).annotate({ identifier: "ImplementationFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Implementations: S.optional(__S(112, __c7, 0)),
          GovernedProviders: S.optional(__S(32, __c2, 0)),
        }),
      ).annotate({ identifier: "ControlFilter" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          Filter: S.optional(__S(113, __c7, 1)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/list-controls" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListControlsRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Aliases: S.optional(__S(32, __c2, 0)),
          Name: S.String,
          Description: S.String,
          Behavior: S.optional(S.String),
          Severity: S.optional(S.String),
          ParameterRequirementSummary: S.optional(S.String),
          Implementation: S.optional(__S(48, __c3, 0)),
          CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          GovernedResources: S.optional(__S(32, __c2, 0)),
          GovernedProviders: S.optional(__S(32, __c2, 0)),
        }),
      ).annotate({ identifier: "ControlSummary" });
    case 4:
      return S.Array(__S(115, __c7, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ Controls: __S(116, __c7, 4), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListControlsResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/domains" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDomainsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Name: S.String,
          Description: S.String,
          CreateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          LastUpdateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "DomainSummary" });
    case 2:
      return S.Array(__S(129, __c8, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Domains: __S(130, __c8, 2), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDomainsResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
