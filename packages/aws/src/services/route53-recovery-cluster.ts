import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_0Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Route53 Recovery Cluster",
  target: "ToggleCustomerAPI",
  version: "2019-12-02",
  sigv4: "route53-recovery-cluster",
  protocol: awsJson1_0Protocol,
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://route53-recovery-cluster.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://route53-recovery-cluster.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
  }> {}
export class EndpointTemporarilyUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "EndpointTemporarilyUnavailableException",
    ["ServerError"],
    { status: 503 },
  )<{ readonly message: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly retryAfterSeconds?: number }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
  }> {}
export class ServiceLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceLimitExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message: string;
    readonly resourceId?: string;
    readonly resourceType?: string;
    readonly limitCode: string;
    readonly serviceCode: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly retryAfterSeconds?: number }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly reason?: ValidationExceptionReason;
    readonly fields?: ValidationExceptionField[];
  }> {}
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
  descriptor: { service: svc, input: { RoutingControlArn: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { ControlPanelArn: 0, NextToken: 0, MaxResults: 0 },
  },
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
  descriptor: {
    service: svc,
    input: {
      RoutingControlArn: 0,
      RoutingControlState: 0,
      SafetyRulesToOverride: 0,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      UpdateRoutingControlStateEntries: D.list({
        RoutingControlArn: 0,
        RoutingControlState: 0,
      }),
      SafetyRulesToOverride: 0,
    },
  },
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
})) as any;
