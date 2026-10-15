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
  sdkId: "Route53 Recovery Cluster",
  serviceShapeName: "ToggleCustomerAPI",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "route53-recovery-cluster" });
const ver = /*@__PURE__*/ T.ServiceVersion("2019-12-02");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_0();
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
              `https://route53-recovery-cluster-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://route53-recovery-cluster-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://route53-recovery-cluster.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(
          `https://route53-recovery-cluster.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://route53-recovery-cluster.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class EndpointTemporarilyUnavailableException
  extends /*@__PURE__*/ S.TaggedError<EndpointTemporarilyUnavailableException>()(
    "EndpointTemporarilyUnavailableException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(503),
  ).pipe(C.withServerError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceLimitExceededException>()(
    "ServiceLimitExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
      limitCode: S.String,
      serviceCode: S.String,
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
      fields: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(13, __c3, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type Arn = string;
export interface GetRoutingControlStateRequest {
  RoutingControlArn: string;
}
export type RoutingControlState = "On" | "Off" | (string & {});
export type RoutingControlName = string;
export interface GetRoutingControlStateResponse {
  RoutingControlArn: string;
  RoutingControlState: RoutingControlState;
  RoutingControlName?: string;
}
export type PageToken = string;
export type MaxResults = number;
export interface ListRoutingControlsRequest {
  ControlPanelArn?: string;
  NextToken?: string;
  MaxResults?: number;
}
export type ControlPanelName = string;
export type Owner = string;
export interface RoutingControl {
  ControlPanelArn?: string;
  ControlPanelName?: string;
  RoutingControlArn?: string;
  RoutingControlName?: string;
  RoutingControlState?: RoutingControlState;
  Owner?: string;
}
export type RoutingControls = RoutingControl[];
export interface ListRoutingControlsResponse {
  RoutingControls: RoutingControl[];
  NextToken?: string;
}
export type Arns = string[];
export interface UpdateRoutingControlStateRequest {
  RoutingControlArn: string;
  RoutingControlState: RoutingControlState;
  SafetyRulesToOverride?: string[];
}
export interface UpdateRoutingControlStateResponse {}
export interface UpdateRoutingControlStateEntry {
  RoutingControlArn: string;
  RoutingControlState: RoutingControlState;
}
export type UpdateRoutingControlStateEntries = UpdateRoutingControlStateEntry[];
export interface UpdateRoutingControlStatesRequest {
  UpdateRoutingControlStateEntries: UpdateRoutingControlStateEntry[];
  SafetyRulesToOverride?: string[];
}
export interface UpdateRoutingControlStatesResponse {}
export type RetryAfterSeconds = number;
export type ValidationExceptionReason =
  | "unknownOperation"
  | "cannotParse"
  | "fieldValidationFailed"
  | "other"
  | (string & {});
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type GetRoutingControlStateError =
  | AccessDeniedException
  | EndpointTemporarilyUnavailableException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the state for a routing control. A routing control is a simple on/off switch that you
 * can use to route traffic to cells. When a routing control state is set to ON, traffic flows to a cell. When
 * the state is set to OFF, traffic does not flow.
 *
 * Before you can create a routing control, you must first create a cluster, and then host the control
 * in a control panel on the cluster. For more information, see
 * Create routing control structures in the Amazon Route 53 Application Recovery Controller Developer Guide.
 * You access one of the endpoints for the cluster to get or update the routing control state to
 * redirect traffic for your application.
 *
 * You must specify Regional endpoints when you work with API cluster operations
 * to get or update routing control states in Route 53 ARC.
 *
 * To see a code example for getting a routing control state, including accessing Regional cluster endpoints
 * in sequence, see API examples
 * in the Amazon Route 53 Application Recovery Controller Developer Guide.
 *
 * Learn more about working with routing controls in the following topics in the
 * Amazon Route 53 Application Recovery Controller Developer Guide:
 *
 * -
 * Viewing and updating routing control states
 *
 * - Working with
 * routing controls in Route 53 ARC
 */
export const getRoutingControlState: API.OperationMethod<
  GetRoutingControlStateRequest,
  GetRoutingControlStateResponse,
  GetRoutingControlStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c4, 0) as any as S.Schema<GetRoutingControlStateRequest>,
  output: __S(17, __c4, 1) as any as S.Schema<GetRoutingControlStateResponse>,
  errors: [
    AccessDeniedException,
    EndpointTemporarilyUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRoutingControlState",
}));

export type ListRoutingControlsError =
  | AccessDeniedException
  | EndpointTemporarilyUnavailableException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List routing control names and Amazon Resource Names (ARNs), as well as the routing control
 * state for each routing control, along with the control panel name and control panel ARN for the routing controls.
 * If you specify a control panel ARN, this call lists the routing controls in the control panel. Otherwise, it lists
 * all the routing controls in the cluster.
 *
 * A routing control is a simple on/off switch in Route 53 ARC that you
 * can use to route traffic to cells. When a routing control state is set to ON, traffic flows to a cell. When
 * the state is set to OFF, traffic does not flow.
 *
 * Before you can create a routing control, you must first create a cluster, and then host the control
 * in a control panel on the cluster. For more information, see
 * Create routing control structures in the Amazon Route 53 Application Recovery Controller Developer Guide.
 * You access one of the endpoints for the cluster to get or update the routing control state to
 * redirect traffic for your application.
 *
 * You must specify Regional endpoints when you work with API cluster operations
 * to use this API operation to list routing controls in Route 53 ARC.
 *
 * Learn more about working with routing controls in the following topics in the
 * Amazon Route 53 Application Recovery Controller Developer Guide:
 *
 * -
 * Viewing and updating routing control states
 *
 * - Working with
 * routing controls in Route 53 ARC
 */
export const listRoutingControls: API.PaginatedOperationMethod<
  ListRoutingControlsRequest,
  ListRoutingControlsResponse,
  ListRoutingControlsError,
  Credentials | HttpClient.HttpClient,
  RoutingControl
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(20, __c5, 0) as any as S.Schema<ListRoutingControlsRequest>,
  output: __S(23, __c5, 3) as any as S.Schema<ListRoutingControlsResponse>,
  errors: [
    AccessDeniedException,
    EndpointTemporarilyUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRoutingControls",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RoutingControls",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type UpdateRoutingControlStateError =
  | AccessDeniedException
  | ConflictException
  | EndpointTemporarilyUnavailableException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Set the state of the routing control to reroute traffic. You can set the value to ON or
 * OFF. When the state is ON, traffic flows to a cell. When the state is OFF, traffic does not
 * flow.
 *
 * With Route 53 ARC, you can add safety rules for routing controls, which are safeguards for routing
 * control state updates that help prevent unexpected outcomes, like fail open traffic routing. However,
 * there are scenarios when you might want to bypass the routing control safeguards that are enforced with
 * safety rules that you've configured. For example, you might want to fail over quickly for disaster recovery,
 * and one or more safety rules might be unexpectedly preventing you from updating a routing control state to
 * reroute traffic. In a "break glass" scenario like this, you can override one or more safety rules to change
 * a routing control state and fail over your application.
 *
 * The `SafetyRulesToOverride` property enables you override one or more safety rules and
 * update routing control states. For more information, see
 *
 * Override safety rules to reroute traffic in the Amazon Route 53 Application Recovery Controller Developer Guide.
 *
 * You must specify Regional endpoints when you work with API cluster operations
 * to get or update routing control states in Route 53 ARC.
 *
 * To see a code example for getting a routing control state, including accessing Regional cluster endpoints
 * in sequence, see API examples
 * in the Amazon Route 53 Application Recovery Controller Developer Guide.
 *
 * -
 * Viewing and updating routing control states
 *
 * - Working with routing controls overall
 */
export const updateRoutingControlState: API.OperationMethod<
  UpdateRoutingControlStateRequest,
  UpdateRoutingControlStateResponse,
  UpdateRoutingControlStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<UpdateRoutingControlStateRequest>,
  output: __S(5, __c1, 1) as any as S.Schema<UpdateRoutingControlStateResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    EndpointTemporarilyUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRoutingControlState",
}));

export type UpdateRoutingControlStatesError =
  | AccessDeniedException
  | ConflictException
  | EndpointTemporarilyUnavailableException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceLimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Set multiple routing control states. You can set the value for each state to be ON or OFF.
 * When the state is ON, traffic flows to a cell. When it's OFF, traffic does not
 * flow.
 *
 * With Route 53 ARC, you can add safety rules for routing controls, which are safeguards for routing
 * control state updates that help prevent unexpected outcomes, like fail open traffic routing. However,
 * there are scenarios when you might want to bypass the routing control safeguards that are enforced with
 * safety rules that you've configured. For example, you might want to fail over quickly for disaster recovery,
 * and one or more safety rules might be unexpectedly preventing you from updating a routing control state to
 * reroute traffic. In a "break glass" scenario like this, you can override one or more safety rules to change
 * a routing control state and fail over your application.
 *
 * The `SafetyRulesToOverride` property enables you override one or more safety rules and
 * update routing control states. For more information, see
 *
 * Override safety rules to reroute traffic in the Amazon Route 53 Application Recovery Controller Developer Guide.
 *
 * You must specify Regional endpoints when you work with API cluster operations
 * to get or update routing control states in Route 53 ARC.
 *
 * To see a code example for getting a routing control state, including accessing Regional cluster endpoints
 * in sequence, see API examples
 * in the Amazon Route 53 Application Recovery Controller Developer Guide.
 *
 * -
 * Viewing and updating routing control states
 *
 * - Working with routing controls overall
 */
export const updateRoutingControlStates: API.OperationMethod<
  UpdateRoutingControlStatesRequest,
  UpdateRoutingControlStatesResponse,
  UpdateRoutingControlStatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(10, __c2, 2) as any as S.Schema<UpdateRoutingControlStatesRequest>,
  output: __S(5, __c1, 1) as any as S.Schema<UpdateRoutingControlStatesResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    EndpointTemporarilyUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceLimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRoutingControlStates",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RoutingControlArn: S.String,
          RoutingControlState: S.String,
          SafetyRulesToOverride: S.optional(__S(4, __c1, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateRoutingControlStateRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "UpdateRoutingControlStateResponse",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RoutingControlArn: S.String, RoutingControlState: S.String }),
      ).annotate({ identifier: "UpdateRoutingControlStateEntry" });
    case 1:
      return S.Array(__S(8, __c2, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          UpdateRoutingControlStateEntries: __S(9, __c2, 1),
          SafetyRulesToOverride: S.optional(__S(4, __c1, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateRoutingControlStatesRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(12, __c3, 0));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RoutingControlArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetRoutingControlStateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RoutingControlArn: S.String,
          RoutingControlState: S.String,
          RoutingControlName: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetRoutingControlStateResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ControlPanelArn: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListRoutingControlsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ControlPanelArn: S.optional(S.String),
          ControlPanelName: S.optional(S.String),
          RoutingControlArn: S.optional(S.String),
          RoutingControlName: S.optional(S.String),
          RoutingControlState: S.optional(S.String),
          Owner: S.optional(S.String),
        }),
      ).annotate({ identifier: "RoutingControl" });
    case 2:
      return S.Array(__S(21, __c5, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ RoutingControls: __S(22, __c5, 2), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRoutingControlsResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
