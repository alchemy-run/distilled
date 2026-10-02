/**
 * Azure-specific error types — hand-written (ported verbatim from
 * distilled v0's `packages/azure/src/errors.ts`).
 *
 * Re-exports common HTTP errors from core and adds Azure-specific
 * error matching and API error types.
 *
 * Azure Resource Manager (ARM) returns errors in the format:
 * ```json
 * { "error": { "code": "ResourceNotFound", "message": "..." } }
 * ```
 *
 * The `code` field contains a machine-readable error code that can be
 * matched to typed error classes for precise error handling.
 */
export {
  BadGateway,
  BadRequest,
  Conflict,
  ConfigError,
  Forbidden,
  GatewayTimeout,
  InternalServerError,
  Locked,
  NotFound,
  ServiceUnavailable,
  TooManyRequests,
  Unauthorized,
  UnprocessableEntity,
  HTTP_STATUS_MAP,
  DEFAULT_ERRORS,
  API_ERRORS,
} from "@distilled.cloud/core/errors";
export type { DefaultErrors } from "@distilled.cloud/core/errors";

import * as Schema from "effect/Schema";
import * as Category from "@distilled.cloud/core/category";

// ---------------------------------------------------------------------------
// Azure ARM error field schemas (shared by all Azure-specific errors)
// ---------------------------------------------------------------------------

const AzureErrorFields = {
  message: Schema.optional(Schema.String),
  code: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
};

const AzureAuthErrorFields = {
  message: Schema.optional(Schema.String),
  code: Schema.optional(Schema.String),
};

// ---------------------------------------------------------------------------
// Not-found errors
// ---------------------------------------------------------------------------

/**
 * Returned when the specified resource does not exist.
 * Azure error code: `ResourceNotFound`
 */
export class ResourceNotFound extends Schema.TaggedError<ResourceNotFound>()(
  "ResourceNotFound",
  AzureErrorFields,
).pipe(Category.withNotFoundError) {}

/**
 * Returned when the specified resource group does not exist.
 * Azure error code: `ResourceGroupNotFound`
 */
export class ResourceGroupNotFound extends Schema.TaggedError<ResourceGroupNotFound>()(
  "ResourceGroupNotFound",
  AzureErrorFields,
).pipe(Category.withNotFoundError) {}

/**
 * Returned when the subscription ID is missing or invalid.
 * Azure error code: `MissingSubscription` or `SubscriptionNotFound`
 */
export class SubscriptionNotFound extends Schema.TaggedError<SubscriptionNotFound>()(
  "SubscriptionNotFound",
  AzureAuthErrorFields,
).pipe(Category.withNotFoundError) {}

// ---------------------------------------------------------------------------
// Auth errors
// ---------------------------------------------------------------------------

/**
 * Returned when the caller does not have permission to perform the operation.
 * Azure error code: `AuthorizationFailed`
 */
export class AuthorizationFailed extends Schema.TaggedError<AuthorizationFailed>()(
  "AuthorizationFailed",
  AzureAuthErrorFields,
).pipe(Category.withAuthError) {}

/**
 * Returned when the bearer token is invalid, expired, or missing required claims.
 * Azure error code: `InvalidAuthenticationToken`
 */
export class InvalidAuthenticationToken extends Schema.TaggedError<InvalidAuthenticationToken>()(
  "InvalidAuthenticationToken",
  AzureAuthErrorFields,
).pipe(Category.withAuthError) {}

/**
 * Returned when the token audience does not match the expected audience for
 * the resource being accessed.
 * Azure error code: `InvalidAuthenticationTokenAudience`
 */
export class InvalidAuthenticationTokenAudience extends Schema.TaggedError<InvalidAuthenticationTokenAudience>()(
  "InvalidAuthenticationTokenAudience",
  AzureAuthErrorFields,
).pipe(Category.withAuthError) {}

/**
 * Returned when the token tenant does not match the subscription tenant.
 * Azure error code: `InvalidAuthenticationTokenTenant`
 */
export class InvalidAuthenticationTokenTenant extends Schema.TaggedError<InvalidAuthenticationTokenTenant>()(
  "InvalidAuthenticationTokenTenant",
  AzureAuthErrorFields,
).pipe(Category.withAuthError) {}

/**
 * Returned when linked authorization for the request has failed.
 * Azure error code: `LinkedAuthorizationFailed`
 */
export class LinkedAuthorizationFailed extends Schema.TaggedError<LinkedAuthorizationFailed>()(
  "LinkedAuthorizationFailed",
  AzureAuthErrorFields,
).pipe(Category.withAuthError) {}

// ---------------------------------------------------------------------------
// Bad request / validation errors
// ---------------------------------------------------------------------------

/**
 * Returned when a request parameter is invalid.
 * Azure error code: `InvalidParameter`
 */
export class InvalidParameter extends Schema.TaggedError<InvalidParameter>()(
  "InvalidParameter",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned when the resource type in the request is not valid.
 * Azure error code: `InvalidResourceType`
 */
export class InvalidResourceType extends Schema.TaggedError<InvalidResourceType>()(
  "InvalidResourceType",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned when the resource name in the request is not valid.
 * Azure error code: `InvalidResourceName` or `InvalidResourceNameFormat`
 */
export class InvalidResourceName extends Schema.TaggedError<InvalidResourceName>()(
  "InvalidResourceName",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned when the request template is not valid.
 * Azure error code: `InvalidRequestContent`
 */
export class InvalidRequestContent extends Schema.TaggedError<InvalidRequestContent>()(
  "InvalidRequestContent",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned when a required property is missing from the request body.
 * Azure error code: `MissingRequiredProperty` or `PropertyRequired`
 */
export class MissingRequiredProperty extends Schema.TaggedError<MissingRequiredProperty>()(
  "MissingRequiredProperty",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned when a request property value exceeds the allowed maximum.
 * Azure error code: `PropertyValueExceedsMaxLength` or similar
 */
export class InvalidPropertyValue extends Schema.TaggedError<InvalidPropertyValue>()(
  "InvalidPropertyValue",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

// ---------------------------------------------------------------------------
// Conflict errors
// ---------------------------------------------------------------------------

/**
 * Returned when a resource with the same name already exists and the operation
 * would conflict.
 * Azure error code: `Conflict`
 */
export class ResourceConflict extends Schema.TaggedError<ResourceConflict>()(
  "ResourceConflict",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

/**
 * Returned when a resource is being updated and a concurrent update conflicts.
 * Azure error code: `PreconditionFailed` or `ConditionNotMet`
 */
export class PreconditionFailed extends Schema.TaggedError<PreconditionFailed>()(
  "PreconditionFailed",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

// ---------------------------------------------------------------------------
// Operation errors
// ---------------------------------------------------------------------------

/**
 * Returned when the requested operation is not allowed in the current state.
 * Azure error code: `OperationNotAllowed`
 */
export class OperationNotAllowed extends Schema.TaggedError<OperationNotAllowed>()(
  "OperationNotAllowed",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned when the resource provider is not registered for the subscription.
 * Azure error code: `MissingRegistrationForType` or `MissingSubscriptionRegistration`
 */
export class MissingRegistration extends Schema.TaggedError<MissingRegistration>()(
  "MissingRegistration",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

// ---------------------------------------------------------------------------
// Throttling / quota errors
// ---------------------------------------------------------------------------

/**
 * Returned when a quota has been exceeded for the subscription.
 * Azure error code: `QuotaExceeded` or `ExceededMaxAccountCount`
 */
export class QuotaExceeded extends Schema.TaggedError<QuotaExceeded>()(
  "QuotaExceeded",
  AzureErrorFields,
).pipe(Category.withThrottlingError) {}

/**
 * Returned when the request has been throttled due to too many operations.
 * Azure error code: `RequestRateLimitExceeded` or `TooManyRequests`
 */
export class RequestRateLimitExceeded extends Schema.TaggedError<RequestRateLimitExceeded>()(
  "RequestRateLimitExceeded",
  AzureErrorFields,
).pipe(Category.withThrottlingError) {}

// ---------------------------------------------------------------------------
// Scope / location errors
// ---------------------------------------------------------------------------

/**
 * Returned when the requested location is not available for the resource type.
 * Azure error code: `LocationNotAvailableForResourceType`
 */
export class LocationNotAvailable extends Schema.TaggedError<LocationNotAvailable>()(
  "LocationNotAvailable",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned when the targeted scope is invalid for the operation.
 * Azure error code: `InvalidResourceScope` or `ScopeNotValid`
 */
export class InvalidScope extends Schema.TaggedError<InvalidScope>()(
  "InvalidScope",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

// ---------------------------------------------------------------------------
// Resource-provider errors (Microsoft.Authorization, Microsoft.Storage, ARM)
// ---------------------------------------------------------------------------

/**
 * Returned when a role assignment does not exist.
 * Azure error code: `RoleAssignmentNotFound`
 */
export class RoleAssignmentNotFound extends Schema.TaggedError<RoleAssignmentNotFound>()(
  "RoleAssignmentNotFound",
  AzureErrorFields,
).pipe(Category.withNotFoundError) {}

/**
 * Returned when the same principal already holds the same role at the same
 * scope under a different role-assignment name.
 * Azure error code: `RoleAssignmentExists`
 */
export class RoleAssignmentExists extends Schema.TaggedError<RoleAssignmentExists>()(
  "RoleAssignmentExists",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

/**
 * Returned when a role assignment names a principal Microsoft Entra ID has
 * not replicated yet (common right after creating a managed identity).
 * Azure error code: `PrincipalNotFound`
 */
export class PrincipalNotFound extends Schema.TaggedError<PrincipalNotFound>()(
  "PrincipalNotFound",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned when a blob container does not exist.
 * Azure error code: `ContainerNotFound`
 */
export class ContainerNotFound extends Schema.TaggedError<ContainerNotFound>()(
  "ContainerNotFound",
  AzureErrorFields,
).pipe(Category.withNotFoundError) {}

/**
 * Returned when an Azure Files share does not exist.
 * Azure error code: `ShareNotFound`
 */
export class ShareNotFound extends Schema.TaggedError<ShareNotFound>()(
  "ShareNotFound",
  AzureErrorFields,
).pipe(Category.withNotFoundError) {}

/**
 * Returned when a storage queue does not exist.
 * Azure error code: `QueueNotFound`
 */
export class QueueNotFound extends Schema.TaggedError<QueueNotFound>()(
  "QueueNotFound",
  AzureErrorFields,
).pipe(Category.withNotFoundError) {}

/**
 * Returned when a storage account has no lifecycle management policy.
 * Azure error code: `ManagementPolicyNotFound`
 */
export class ManagementPolicyNotFound extends Schema.TaggedError<ManagementPolicyNotFound>()(
  "ManagementPolicyNotFound",
  AzureErrorFields,
).pipe(Category.withNotFoundError) {}

/**
 * Returned when a storage account has no blob inventory policy.
 * Azure error code: `BlobInventoryPolicyNotFound`
 */
export class BlobInventoryPolicyNotFound extends Schema.TaggedError<BlobInventoryPolicyNotFound>()(
  "BlobInventoryPolicyNotFound",
  AzureErrorFields,
).pipe(Category.withNotFoundError) {}

/**
 * Returned when a storage account has no advanced platform metrics rule of
 * the requested type.
 * Azure error code: `AdvancedPlatformMetricsRuleNotFound`
 */
export class AdvancedPlatformMetricsRuleNotFound extends Schema.TaggedError<AdvancedPlatformMetricsRuleNotFound>()(
  "AdvancedPlatformMetricsRuleNotFound",
  AzureErrorFields,
).pipe(Category.withNotFoundError) {}

/**
 * Returned when a storage account has no object replication policy with
 * the requested ID.
 * Azure error code: `ObjectReplicationPolicyNotFound`
 */
export class ObjectReplicationPolicyNotFound extends Schema.TaggedError<ObjectReplicationPolicyNotFound>()(
  "ObjectReplicationPolicyNotFound",
  AzureErrorFields,
).pipe(Category.withNotFoundError) {}

/**
 * Returned when a storage account name is already used, in this or another
 * subscription (names are globally unique).
 * Azure error code: `StorageAccountAlreadyTaken` or `StorageAccountAlreadyExists`
 */
export class StorageAccountAlreadyTaken extends Schema.TaggedError<StorageAccountAlreadyTaken>()(
  "StorageAccountAlreadyTaken",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

/**
 * Returned when a storage account still has a background geo-replication
 * change in flight (e.g. right after a `Standard_LRS` → `Standard_GRS` SKU
 * change) and cannot be updated or deleted until it finishes.
 * Azure error code: `PendingTransactionAlreadyExists`
 */
export class PendingTransactionAlreadyExists extends Schema.TaggedError<PendingTransactionAlreadyExists>()(
  "PendingTransactionAlreadyExists",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

/**
 * Returned when another operation (e.g. a geo-replication conversion) holds
 * exclusive access to a storage account; retry once it finishes.
 * Azure error code: `StorageAccountOperationInProgress`
 */
export class StorageAccountOperationInProgress extends Schema.TaggedError<StorageAccountOperationInProgress>()(
  "StorageAccountOperationInProgress",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

/**
 * Returned when an Azure SQL elastic job agent is still processing another
 * request (e.g. its creation); retry once it finishes.
 * Azure error code: `ElasticJobAgentIsBusy`
 */
export class ElasticJobAgentIsBusy extends Schema.TaggedError<ElasticJobAgentIsBusy>()(
  "ElasticJobAgentIsBusy",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

/**
 * Returned when creating or updating a resource in a resource group that is
 * being deleted.
 * Azure error code: `ResourceGroupBeingDeleted`
 */
export class ResourceGroupBeingDeleted extends Schema.TaggedError<ResourceGroupBeingDeleted>()(
  "ResourceGroupBeingDeleted",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

// ---------------------------------------------------------------------------
// Microsoft.Network
// ---------------------------------------------------------------------------

/**
 * Returned when the Network resource provider is still applying another
 * write to the same resource (VNet, NSG, load balancer, ...); retry.
 * Azure error codes: `AnotherOperationInProgress`, `RetryableError`
 */
export class NetworkOperationInProgress extends Schema.TaggedError<NetworkOperationInProgress>()(
  "NetworkOperationInProgress",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

/**
 * Returned when deleting or updating a subnet that still has IP
 * configurations (NICs, private endpoints) or service links in it.
 * Azure error codes: `InUseSubnetCannotBeDeleted`, `InUseSubnetCannotBeUpdated`
 */
export class SubnetInUse extends Schema.TaggedError<SubnetInUse>()(
  "SubnetInUse",
  AzureErrorFields,
).pipe(Category.withDependencyViolationError) {}

/**
 * Returned when deleting a network security group still associated with a
 * subnet or network interface.
 * Azure error code: `InUseNetworkSecurityGroupCannotBeDeleted`
 */
export class NetworkSecurityGroupInUse extends Schema.TaggedError<NetworkSecurityGroupInUse>()(
  "NetworkSecurityGroupInUse",
  AzureErrorFields,
).pipe(Category.withDependencyViolationError) {}

/**
 * Returned when deleting a route table still associated with a subnet.
 * Azure error code: `InUseRouteTableCannotBeDeleted`
 */
export class RouteTableInUse extends Schema.TaggedError<RouteTableInUse>()(
  "RouteTableInUse",
  AzureErrorFields,
).pipe(Category.withDependencyViolationError) {}

/**
 * Returned when deleting a public IP address still referenced by a NIC,
 * load balancer, or NAT gateway.
 * Azure error code: `PublicIPAddressCannotBeDeleted`
 */
export class PublicIPAddressInUse extends Schema.TaggedError<PublicIPAddressInUse>()(
  "PublicIPAddressInUse",
  AzureErrorFields,
).pipe(Category.withDependencyViolationError) {}

/**
 * Returned when deleting a NAT gateway still associated with a subnet.
 * Azure error code: `InUseNatGatewayCannotBeDeleted`
 */
export class NatGatewayInUse extends Schema.TaggedError<NatGatewayInUse>()(
  "NatGatewayInUse",
  AzureErrorFields,
).pipe(Category.withDependencyViolationError) {}

/**
 * Returned when deleting a network interface attached to a virtual machine.
 * Azure error code: `NicInUse`
 */
export class NetworkInterfaceInUse extends Schema.TaggedError<NetworkInterfaceInUse>()(
  "NetworkInterfaceInUse",
  AzureErrorFields,
).pipe(Category.withDependencyViolationError) {}

/**
 * Returned when deleting a parent resource (e.g. a DNS Private Resolver)
 * while nested child resources (e.g. its endpoints) still exist, including
 * right after the children were deleted.
 * Azure error code: `CannotDeleteResource`
 */
export class CannotDeleteResource extends Schema.TaggedError<CannotDeleteResource>()(
  "CannotDeleteResource",
  AzureErrorFields,
).pipe(Category.withDependencyViolationError) {}

/**
 * Returned when an API Management service (e.g. a soft-deleted service
 * under `locations/{location}/deletedservices`) does not exist.
 * Azure error code: `ServiceNotFound`
 */
export class ApiManagementServiceNotFound extends Schema.TaggedError<ApiManagementServiceNotFound>()(
  "ApiManagementServiceNotFound",
  AzureErrorFields,
).pipe(Category.withNotFoundError) {}

/**
 * Returned by Microsoft.EventHub application-group operations on a Basic or
 * Standard namespace: application groups exist only on Premium and
 * Dedicated tiers. Azure error code: `ApplicationGroupInvalidSku` (PUT);
 * GET/DELETE return HTTP 400 with "Application Group available only for
 * Dedicated and Premium" (matched by message).
 */
export class EventHubApplicationGroupNotSupported extends Schema.TaggedError<EventHubApplicationGroupNotSupported>()(
  "EventHubApplicationGroupNotSupported",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

// ---------------------------------------------------------------------------
// Azure error code → typed error class mapping
// ---------------------------------------------------------------------------

/**
 * Azure error code to typed error class mapping.
 * Used by the protocol's error matching to dispatch by ARM error code.
 */
export const AZURE_ERROR_CODE_MAP: Record<string, new (props: any) => unknown> =
  {
    // Not-found
    ResourceNotFound: ResourceNotFound,
    ResourceGroupNotFound: ResourceGroupNotFound,
    MissingSubscription: SubscriptionNotFound,
    SubscriptionNotFound: SubscriptionNotFound,

    // Auth
    AuthorizationFailed: AuthorizationFailed,
    InvalidAuthenticationToken: InvalidAuthenticationToken,
    InvalidAuthenticationTokenAudience: InvalidAuthenticationTokenAudience,
    InvalidAuthenticationTokenTenant: InvalidAuthenticationTokenTenant,
    LinkedAuthorizationFailed: LinkedAuthorizationFailed,

    // Bad request / validation
    InvalidParameter: InvalidParameter,
    InvalidParameterValue: InvalidParameter,
    InvalidResourceType: InvalidResourceType,
    InvalidResourceName: InvalidResourceName,
    InvalidResourceNameFormat: InvalidResourceName,
    InvalidRequestContent: InvalidRequestContent,
    MissingRequiredProperty: MissingRequiredProperty,
    PropertyRequired: MissingRequiredProperty,
    InvalidPropertyValue: InvalidPropertyValue,
    PropertyValueExceedsMaxLength: InvalidPropertyValue,

    // Conflict
    Conflict: ResourceConflict,
    PreconditionFailed: PreconditionFailed,
    ConditionNotMet: PreconditionFailed,

    // Operation / registration
    OperationNotAllowed: OperationNotAllowed,
    MissingRegistrationForType: MissingRegistration,
    MissingSubscriptionRegistration: MissingRegistration,

    // Throttling / quota
    QuotaExceeded: QuotaExceeded,
    ExceededMaxAccountCount: QuotaExceeded,
    RequestRateLimitExceeded: RequestRateLimitExceeded,
    TooManyRequests: RequestRateLimitExceeded,

    // Location / scope
    LocationNotAvailableForResourceType: LocationNotAvailable,
    InvalidResourceScope: InvalidScope,
    ScopeNotValid: InvalidScope,

    // Resource providers
    RoleAssignmentNotFound: RoleAssignmentNotFound,
    RoleAssignmentExists: RoleAssignmentExists,
    PrincipalNotFound: PrincipalNotFound,
    ContainerNotFound: ContainerNotFound,
    ShareNotFound: ShareNotFound,
    QueueNotFound: QueueNotFound,
    ManagementPolicyNotFound: ManagementPolicyNotFound,
    BlobInventoryPolicyNotFound: BlobInventoryPolicyNotFound,
    AdvancedPlatformMetricsRuleNotFound: AdvancedPlatformMetricsRuleNotFound,
    ObjectReplicationPolicyNotFound: ObjectReplicationPolicyNotFound,
    StorageAccountAlreadyTaken: StorageAccountAlreadyTaken,
    StorageAccountAlreadyExists: StorageAccountAlreadyTaken,
    ResourceGroupBeingDeleted: ResourceGroupBeingDeleted,
    PendingTransactionAlreadyExists: PendingTransactionAlreadyExists,
    StorageAccountOperationInProgress: StorageAccountOperationInProgress,
    ElasticJobAgentIsBusy: ElasticJobAgentIsBusy,
    AnotherOperationInProgress: NetworkOperationInProgress,
    RetryableError: NetworkOperationInProgress,
    InUseSubnetCannotBeDeleted: SubnetInUse,
    InUseSubnetCannotBeUpdated: SubnetInUse,
    InUseNetworkSecurityGroupCannotBeDeleted: NetworkSecurityGroupInUse,
    InUseRouteTableCannotBeDeleted: RouteTableInUse,
    PublicIPAddressCannotBeDeleted: PublicIPAddressInUse,
    InUseNatGatewayCannotBeDeleted: NatGatewayInUse,
    NicInUse: NetworkInterfaceInUse,
    CannotDeleteResource: CannotDeleteResource,
    ServiceNotFound: ApiManagementServiceNotFound,
    ApplicationGroupInvalidSku: EventHubApplicationGroupNotSupported,
  };

/**
 * Returned when Microsoft.Web throttles App Service plan creation for the
 * subscription (a per-subscription create budget); retry after a delay.
 * Microsoft.Web error code: `429` with "App Service Plan Create operation
 * is throttled".
 */
export class AppServicePlanCreateThrottled extends Schema.TaggedError<AppServicePlanCreateThrottled>()(
  "AppServicePlanCreateThrottled",
  AzureErrorFields,
).pipe(Category.withThrottlingError) {}

/**
 * Returned by Microsoft.Web when a custom hostname binding fails domain
 * verification: the `asuid.{host}` TXT record or the CNAME/A record to the
 * app is missing. Microsoft.Web error code: `BadRequest` with "A TXT record
 * pointing from asuid..." / "A CNAME record pointing from ..." (matched by
 * message).
 */
export class HostNameVerificationFailed extends Schema.TaggedError<HostNameVerificationFailed>()(
  "HostNameVerificationFailed",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.Web when a deployment slot is created on a plan
 * that has no slots (Free, Basic, Consumption, Flex Consumption).
 * Microsoft.Web error code: `BadRequest` with "does not support slots"
 * (matched by message).
 */
export class WebAppSlotsNotSupported extends Schema.TaggedError<WebAppSlotsNotSupported>()(
  "WebAppSlotsNotSupported",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Errors whose ARM `code` is too generic to type on its own (e.g.
 * Microsoft.Web reports exhausted SKU quota as `Unauthorized`). Checked
 * before {@link AZURE_ERROR_CODE_MAP}; the first matcher whose code (if
 * set) and message substring match wins.
 */
export const AZURE_ERROR_MESSAGE_MATCHERS: ReadonlyArray<{
  readonly code?: string;
  readonly includes: string;
  readonly error: new (props: any) => unknown;
}> = [
  // Microsoft.Web: "Operation cannot be completed without additional quota.
  // Current Limit (F1 VMs): 0" — the plan SKU has no quota in the region.
  {
    code: "Unauthorized",
    includes: "without additional quota",
    error: QuotaExceeded,
  },
  {
    code: "429",
    includes: "App Service Plan Create operation is throttled",
    error: AppServicePlanCreateThrottled,
  },
  {
    includes: "Application Group available only for Dedicated and Premium",
    error: EventHubApplicationGroupNotSupported,
  },
  {
    includes: "record pointing from",
    error: HostNameVerificationFailed,
  },
  {
    includes: "does not support slots",
    error: WebAppSlotsNotSupported,
  },
];

export const matchAzureErrorMessage = (arm: {
  readonly code?: string;
  readonly message?: string;
}) =>
  AZURE_ERROR_MESSAGE_MATCHERS.find(
    (matcher) =>
      (matcher.code === undefined || matcher.code === arm.code) &&
      arm.message?.includes(matcher.includes) === true,
  )?.error;

// ---------------------------------------------------------------------------
// Catch-all error classes
// ---------------------------------------------------------------------------

/** Unknown Azure error — returned when an error code is not recognized. */
export class UnknownAzureError extends Schema.TaggedError<UnknownAzureError>()(
  "UnknownAzureError",
  {
    code: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    target: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

/** Schema parse error wrapper for Azure responses. */
export class AzureParseError extends Schema.TaggedError<AzureParseError>()(
  "AzureParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}

/** Union of every ARM-code-mapped typed error class. */
export type AzureApiError =
  | ResourceNotFound
  | ResourceGroupNotFound
  | SubscriptionNotFound
  | AuthorizationFailed
  | InvalidAuthenticationToken
  | InvalidAuthenticationTokenAudience
  | InvalidAuthenticationTokenTenant
  | LinkedAuthorizationFailed
  | InvalidParameter
  | InvalidResourceType
  | InvalidResourceName
  | InvalidRequestContent
  | MissingRequiredProperty
  | InvalidPropertyValue
  | ResourceConflict
  | PreconditionFailed
  | OperationNotAllowed
  | MissingRegistration
  | QuotaExceeded
  | RequestRateLimitExceeded
  | LocationNotAvailable
  | InvalidScope
  | RoleAssignmentNotFound
  | RoleAssignmentExists
  | PrincipalNotFound
  | ContainerNotFound
  | ShareNotFound
  | QueueNotFound
  | ManagementPolicyNotFound
  | BlobInventoryPolicyNotFound
  | AdvancedPlatformMetricsRuleNotFound
  | ObjectReplicationPolicyNotFound
  | StorageAccountAlreadyTaken
  | ResourceGroupBeingDeleted
  | PendingTransactionAlreadyExists
  | StorageAccountOperationInProgress
  | ElasticJobAgentIsBusy
  | NetworkOperationInProgress
  | SubnetInUse
  | NetworkSecurityGroupInUse
  | RouteTableInUse
  | PublicIPAddressInUse
  | NatGatewayInUse
  | NetworkInterfaceInUse
  | CannotDeleteResource
  | ApiManagementServiceNotFound
  | AppServicePlanCreateThrottled
  | HostNameVerificationFailed
  | WebAppSlotsNotSupported
  | EventHubApplicationGroupNotSupported;
