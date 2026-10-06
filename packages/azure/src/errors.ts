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

import * as Category from "@distilled.cloud/core/category";
import * as Schema from "effect/Schema";

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
 * Returned by Microsoft.DeviceRegistry when a schema registry's managed
 * identity lacks a storage data role (e.g. `Storage Blob Data Contributor`)
 * on its blob container, or the role assignment has not propagated yet.
 * Azure error code: `AuthorizationPermissionMismatch`
 */
export class SchemaRegistryStorageAccessDenied extends Schema.TaggedError<SchemaRegistryStorageAccessDenied>()(
  "SchemaRegistryStorageAccessDenied",
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
 * Azure error code: `InvalidParameter`, `InvalidParameterValue` or
 * `ParameterOutOfRange`
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

/**
 * Returned (HTTP 404) when the resource provider namespace is not available
 * to the subscription at all, e.g. a preview/allow-listed provider such as
 * `Microsoft.ManufacturingPlatform`. It is not a resource not-found.
 * Azure error code: `InvalidResourceNamespace`
 */
export class InvalidResourceNamespace extends Schema.TaggedError<InvalidResourceNamespace>()(
  "InvalidResourceNamespace",
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
 * Azure error code: `LocationNotAvailableForResourceType` or
 * `LocationNotAvailableForResourceGroup`
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
 * Returned when a role definition does not exist at the scope.
 * Azure error code: `RoleDefinitionDoesNotExist`
 */
export class RoleDefinitionNotFound extends Schema.TaggedError<RoleDefinitionNotFound>()(
  "RoleDefinitionNotFound",
  AzureErrorFields,
).pipe(Category.withNotFoundError) {}

/**
 * Returned when a built-in or custom role with the same `roleName` already
 * exists in the directory (role names are tenant-unique).
 * Azure error code: `RoleDefinitionWithSameNameExists`
 */
export class RoleDefinitionWithSameNameExists extends Schema.TaggedError<RoleDefinitionWithSameNameExists>()(
  "RoleDefinitionWithSameNameExists",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

/**
 * Returned when deleting a custom role that still has role assignments.
 * Azure error code: `RoleDefinitionHasAssignments`
 */
export class RoleDefinitionHasAssignments extends Schema.TaggedError<RoleDefinitionHasAssignments>()(
  "RoleDefinitionHasAssignments",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

/**
 * Returned when a blob container does not exist.
 * Azure error code: `ContainerNotFound`
 */
export class ContainerNotFound extends Schema.TaggedError<ContainerNotFound>()(
  "ContainerNotFound",
  AzureErrorFields,
).pipe(Category.withNotFoundError) {}

/**
 * Returned when a management group does not exist.
 * Azure error code: `ManagementGroupNotFound`
 */
export class ManagementGroupNotFound extends Schema.TaggedError<ManagementGroupNotFound>()(
  "ManagementGroupNotFound",
  AzureErrorFields,
).pipe(Category.withNotFoundError) {}

/**
 * Returned (as 404 on read, 400 on delete) when a service group was just
 * deleted or does not exist.
 * Azure error code: `ServiceGroupNameNotFound`
 */
export class ServiceGroupNameNotFound extends Schema.TaggedError<ServiceGroupNameNotFound>()(
  "ServiceGroupNameNotFound",
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
 * Returned when a MySQL flexible server firewall rule does not exist.
 * Azure error code: `FirewallRuleNotExist`
 */
export class FirewallRuleNotExist extends Schema.TaggedError<FirewallRuleNotExist>()(
  "FirewallRuleNotExist",
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
 * Returned by Microsoft.DeviceUpdate when an account or instance is written
 * or deleted while a previous long-running operation on it is still
 * running. HTTP 400 `{"code":"OperationInProgress","message":"ValidationException"}`;
 * retry until it settles.
 * Azure error code: `OperationInProgress`
 */
export class DeviceUpdateOperationInProgress extends Schema.TaggedError<DeviceUpdateOperationInProgress>()(
  "DeviceUpdateOperationInProgress",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

/**
 * Returned by Microsoft.DeviceUpdate when an account is written or deleted
 * while one of its instances is still being created or deleted. HTTP 400
 * `AccountValidationFailed` with nested detail `InstanceIsNotInTerminalState`;
 * retry once the instance settles.
 * Azure error code: `InstanceIsNotInTerminalState`
 */
export class DeviceUpdateInstanceNotTerminal extends Schema.TaggedError<DeviceUpdateInstanceNotTerminal>()(
  "DeviceUpdateInstanceNotTerminal",
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
 * Returned by Microsoft.ConnectedCache when deleting an enterprise MCC
 * customer whose cache nodes still exist, including shortly after they
 * were deleted. Azure error code: `FailedCustomerCacheNodesExist` (HTTP 400).
 */
export class ConnectedCacheCustomerCacheNodesExist extends Schema.TaggedError<ConnectedCacheCustomerCacheNodesExist>()(
  "ConnectedCacheCustomerCacheNodesExist",
  AzureErrorFields,
).pipe(Category.withDependencyViolationError) {}

/**
 * Returned by Microsoft.NetApp when the subscription may not create NetApp
 * accounts in the region (e.g. free-trial subscriptions, or regions closed
 * to new Azure NetApp Files customers). Azure error code:
 * `ResourceRestriction` (HTTP 409, "Creation of 'netAppAccounts' has been
 * restricted in this region").
 */
export class NetAppCreationRestricted extends Schema.TaggedError<NetAppCreationRestricted>()(
  "NetAppCreationRestricted",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

/**
 * Returned (HTTP 500) by Microsoft.NetApp `GET volumeGroups/{name}` while
 * the group's volumes are still being provisioned: "Sequence contains no
 * matching element". Transient; poll again.
 */
export class NetAppVolumeGroupNotReadable extends Schema.TaggedError<NetAppVolumeGroupNotReadable>()(
  "NetAppVolumeGroupNotReadable",
  AzureErrorFields,
).pipe(Category.withServerError) {}

/**
 * Returned when an operation needs a subscription preview feature that is
 * not registered (e.g. Azure Virtual Network Manager security user rules:
 * "The subscription: X is not registered for feature: AllowAVNMPreviewJuly2022").
 */
export class SubscriptionFeatureNotRegistered extends Schema.TaggedError<SubscriptionFeatureNotRegistered>()(
  "SubscriptionFeatureNotRegistered",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned when a Microsoft.Network feature is not available to the
 * subscription (e.g. "DSCP Configuration is currently not supported", or
 * an application security group allowing "more than 0 address prefix sets").
 */
export class NetworkFeatureNotSupported extends Schema.TaggedError<NetworkFeatureNotSupported>()(
  "NetworkFeatureNotSupported",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned when deleting the `defaultConnection` Azure creates implicitly
 * with a hub network virtual appliance ("The default NVA connection created
 * implicitly cannot be deleted"); it goes away with the appliance.
 */
export class NvaDefaultConnectionUndeletable extends Schema.TaggedError<NvaDefaultConnectionUndeletable>()(
  "NvaDefaultConnectionUndeletable",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

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
 * Returned while an API Management service is activating, updating, or
 * being deleted: "The API Service {name} is transitioning at this time.
 * Please try the request again later." Retry after a delay.
 */
export class ApiManagementServiceTransitioning extends Schema.TaggedError<ApiManagementServiceTransitioning>()(
  "ApiManagementServiceTransitioning",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

/**
 * Returned by Microsoft.ApiManagement email template writes on
 * Pay-As-You-Go and MSDN subscriptions: "Operation disallowed by throttling
 * policy 'PerSubEmailTemplateWrites' for QuotaId ...". Not a transient
 * throttle: these subscription offers cannot customize notification
 * templates at all.
 */
export class ApiManagementEmailTemplateWritesNotAllowed extends Schema.TaggedError<ApiManagementEmailTemplateWritesNotAllowed>()(
  "ApiManagementEmailTemplateWritesNotAllowed",
  AzureErrorFields,
).pipe(Category.withAuthError) {}

/**
 * Returned by Microsoft.ApiManagement for child routes the service does not
 * serve (e.g. `apis/{id}/wikis`, `products/{id}/wikis`): HTTP 404
 * `ResourceNotFound` "The request did not have proper uri path format".
 * Not a missing entity: the endpoint is unavailable.
 */
export class ApiManagementRouteNotSupported extends Schema.TaggedError<ApiManagementRouteNotSupported>()(
  "ApiManagementRouteNotSupported",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.SecurityInsights alert rule action operations
 * (`alertRules/{id}/actions`): HTTP 400 "Rules Actions API has been
 * deprecated and is no longer available" (matched by message). Use an
 * automation rule with a `RunPlaybook` action instead.
 */
export class SentinelRuleActionsDeprecated extends Schema.TaggedError<SentinelRuleActionsDeprecated>()(
  "SentinelRuleActionsDeprecated",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.SecurityInsights source control (repositories)
 * operations when the repository credentials are rejected: HTTP 400
 * "Unauthorized access due to bad credentials. Please make sure to have a
 * valid PAT token." (matched by message).
 */
export class SentinelRepositoryAccessDenied extends Schema.TaggedError<SentinelRepositoryAccessDenied>()(
  "SentinelRepositoryAccessDenied",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.DevHub workflow create/update when the subscription
 * has not authorized the Developer Hub GitHub app (no stored GitHub OAuth
 * token): HTTP 401 `{"code":"401","message":"unauthorized request"}`
 * (matched by code + message).
 */
export class DevHubGitHubNotAuthorized extends Schema.TaggedError<DevHubGitHubNotAuthorized>()(
  "DevHubGitHubNotAuthorized",
  AzureErrorFields,
).pipe(Category.withAuthError) {}

/**
 * Returned by Microsoft.SecurityInsights when creating ML analytics
 * (anomaly) settings in a workspace or region where Sentinel anomalies are
 * not enabled. HTTP 404 "Anomalies are not supported for workspace ... and
 * hence anomaly analytics settings cannot be created" (matched by message).
 */
export class SentinelAnomaliesNotSupported extends Schema.TaggedError<SentinelAnomaliesNotSupported>()(
  "SentinelAnomaliesNotSupported",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned intermittently by Microsoft.GuestConfiguration assignment
 * GET/PUT/DELETE on Azure Arc machines: HTTP 400 with a bare JSON string
 * "Failed to pull machine information from provider with a
 * HttpRequestException exception" (matched by message). Transient; retry.
 */
export class GuestConfigurationMachineInfoUnavailable extends Schema.TaggedError<GuestConfigurationMachineInfoUnavailable>()(
  "GuestConfigurationMachineInfoUnavailable",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned intermittently by Microsoft.GuestConfiguration assignment
 * GET/PUT/DELETE on Azure VMs and scale sets for several minutes after the
 * host is created: HTTP 400 with a bare JSON string "Failed to pull machine
 * information from provider with a CloudException exception" (matched by
 * message). Transient; retry.
 */
export class GuestConfigurationMachineLookupFailed extends Schema.TaggedError<GuestConfigurationMachineLookupFailed>()(
  "GuestConfigurationMachineLookupFailed",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.GuestConfiguration assignment PUTs the service
 * rejects, e.g. with configuration parameters the package does not define:
 * HTTP 400 with a bare JSON string "Request to the agent service failed"
 * (matched by message). Retrying does not help.
 */
export class GuestConfigurationAgentServiceFailed extends Schema.TaggedError<GuestConfigurationAgentServiceFailed>()(
  "GuestConfigurationAgentServiceFailed",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

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

/**
 * Returned by Microsoft.EventHub when a dedicated cluster is deleted less
 * than 4 hours after it was created. HTTP 400 `BadRequest` "Cluster 'x'
 * cannot be deleted until at least 4 hours after its created time"
 * (matched by message). Retry once the 4-hour minimum has elapsed.
 */
export class EventHubClusterDeleteTooSoon extends Schema.TaggedError<EventHubClusterDeleteTooSoon>()(
  "EventHubClusterDeleteTooSoon",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.NetworkFunction when an Azure Traffic Collector is
 * written or deleted while a previous operation on it is still running.
 * HTTP 400 `BadRequest` "AzureTrafficCollector x cannot be updated/deleted
 * because another operation or internal maintenance is in progress"
 * (matched by message). Transient; retry.
 */
export class TrafficCollectorOperationInProgress extends Schema.TaggedError<TrafficCollectorOperationInProgress>()(
  "TrafficCollectorOperationInProgress",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.DesktopVirtualization when a scaling plan references
 * a host pool the Azure Virtual Desktop service principal cannot access (it
 * lacks the "Desktop Virtualization Power On Off Contributor" role). HTTP
 * 400 `BadRequest` "...please make sure that you have given the Azure
 * Virtual Desktop service permissions to access your resource" (matched by
 * message).
 */
export class AvdServicePrincipalAccessDenied extends Schema.TaggedError<AvdServicePrincipalAccessDenied>()(
  "AvdServicePrincipalAccessDenied",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.Automation when the subscription already holds its
 * one Automation account in the region — free-trial subscriptions allow one
 * per region and count soft-deleted accounts for 30 days. HTTP 400
 * `BadRequest` "Only one account is allowed for your subscription per
 * Region" (matched by message).
 */
export class AutomationAccountRegionLimit extends Schema.TaggedError<AutomationAccountRegionLimit>()(
  "AutomationAccountRegionLimit",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.DocumentDB mongo (vCore) cluster user PUTs when the
 * Entra ID principal cannot be resolved yet (a freshly created identity
 * that has not replicated). HTTP 400 "Could not validate
 * Microsoft Entra ID role ... with OID ..." (matched by message).
 * Transient for new principals; retry.
 */
export class MongoClusterPrincipalNotFound extends Schema.TaggedError<MongoClusterPrincipalNotFound>()(
  "MongoClusterPrincipalNotFound",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.Automation when a free-trial or student subscription
 * creates an account outside the allowed regions. HTTP 400 `BadRequest`
 * "Free Trial and Student subscriptions cannot create accounts in this
 * location" (matched by message).
 */
export class AutomationLocationNotAllowed extends Schema.TaggedError<AutomationLocationNotAllowed>()(
  "AutomationLocationNotAllowed",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.Automation when a source control's security token
 * cannot read the repository. HTTP 400 `BadRequest` "SourceControl
 * securityToken is invalid." (matched by message).
 */
export class AutomationSourceControlTokenInvalid extends Schema.TaggedError<AutomationSourceControlTokenInvalid>()(
  "AutomationSourceControlTokenInvalid",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.DevTestLab when a lab service runner is created:
 * service runners are deprecated in favour of lab identities. HTTP 400
 * `ServiceRunnerIsDeprecatedEnvironment` / `ServiceRunnerIsDeprecatedVirtualMachine`.
 */
export class DevTestLabsServiceRunnerDeprecated extends Schema.TaggedError<DevTestLabsServiceRunnerDeprecated>()(
  "DevTestLabsServiceRunnerDeprecated",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.ContainerRegistry when ACR Tasks are disabled for
 * the subscription (free-trial / free-credit subscriptions). Azure error
 * code: `TasksOperationsNotAllowed` (HTTP 400).
 */
export class TasksOperationsNotAllowed extends Schema.TaggedError<TasksOperationsNotAllowed>()(
  "TasksOperationsNotAllowed",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.Compute when the requested VM size has no capacity
 * (or is restricted for the subscription) in the location/zone. Azure
 * error code: `SkuNotAvailable` (HTTP 409, "...see
 * https://aka.ms/azureskunotavailable").
 */
export class SkuNotAvailable extends Schema.TaggedError<SkuNotAvailable>()(
  "SkuNotAvailable",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

/**
 * Returned by Microsoft.ServiceNetworking (Application Gateway for
 * Containers) when an `ipAccessRules` security policy is created on a
 * subscription without the preview feature enabled. HTTP 400, matched by
 * message ("...IP Access Rules security policy feature is not enabled.").
 */
export class AgcIpAccessRulesNotEnabled extends Schema.TaggedError<AgcIpAccessRulesNotEnabled>()(
  "AgcIpAccessRulesNotEnabled",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.Synapse when changing the geo-backup policy of a
 * dedicated SQL pool whose storage is locally redundant (`LRS`). HTTP 400
 * "Datawarehouse storage configuration does not allow changes to GeoBackup
 * policy." (matched by message).
 */
export class SynapseGeoBackupNotAllowed extends Schema.TaggedError<SynapseGeoBackupNotAllowed>()(
  "SynapseGeoBackupNotAllowed",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.Search when deleting a shared private link resource
 * that is still provisioning. Azure error code: `BadRequest` (HTTP 400,
 * "...as it is still being provisioned. Try again later.").
 */
export class SearchSharedPrivateLinkBusy extends Schema.TaggedError<SearchSharedPrivateLinkBusy>()(
  "SearchSharedPrivateLinkBusy",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

/**
 * Returned by Microsoft.Batch for application and application-package
 * operations on an account without a linked auto-storage account (an
 * application cannot exist there). Azure error code:
 * `AccountNotEnabledForAutoStorage` (HTTP 409).
 */
export class BatchAccountNotEnabledForAutoStorage extends Schema.TaggedError<BatchAccountNotEnabledForAutoStorage>()(
  "BatchAccountNotEnabledForAutoStorage",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

/**
 * Returned by Microsoft.ManagedIdentity when two federated identity
 * credential writes target the same identity at once. Retryable. Azure
 * error code: `ConcurrentFederatedIdentityCredentialsWritesForSingleManagedIdentity`
 * (HTTP 409).
 */
export class FederatedIdentityCredentialWriteConflict extends Schema.TaggedError<FederatedIdentityCredentialWriteConflict>()(
  "FederatedIdentityCredentialWriteConflict",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

/**
 * Returned by Microsoft.CognitiveServices when another write to the parent
 * account (or its projects, RAI policies, blocklists, ...) is still in
 * progress; retry once it finishes.
 * Azure error code: `RequestConflict`
 */
export class CognitiveServicesRequestConflict extends Schema.TaggedError<CognitiveServicesRequestConflict>()(
  "CognitiveServicesRequestConflict",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

/**
 * Returned by Microsoft.RecoveryServices (Azure Backup) when the vault's
 * soft delete or storage redundancy settings were set through the vault
 * API (every vault created with current API versions) and can no longer be
 * changed through the legacy `backupconfig` / `backupstorageconfig` APIs.
 * Azure error codes: `BMSUserErrorSoftDeleteUseVaultApi`,
 * `BMSUserErrorRedundancySettingsUseVaultApi`
 */
export class BackupConfigManagedByVaultApi extends Schema.TaggedError<BackupConfigManagedByVaultApi>()(
  "BackupConfigManagedByVaultApi",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.RecoveryServices (Azure Backup) when a workload
 * (VMAppContainer) registration is requested while the previous one is
 * still installing the backup extension. Azure returns HTTP 400
 * `BadRequest` "Registration is already in progress." (matched by
 * message); keep waiting for the running registration.
 */
export class BackupContainerRegistrationInProgress extends Schema.TaggedError<BackupContainerRegistrationInProgress>()(
  "BackupContainerRegistrationInProgress",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

/**
 * Returned by Microsoft.RecoveryServices while a vault is still applying
 * another update (e.g. an identity or network change); retry once it
 * finishes.
 * Azure error code: `RSVaultUpdateErrorConflictingOperationInProgress`
 */
export class RecoveryServicesVaultOperationInProgress extends Schema.TaggedError<RecoveryServicesVaultOperationInProgress>()(
  "RecoveryServicesVaultOperationInProgress",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

/**
 * Returned by Microsoft.RecoveryServices (Azure Backup) when a protection
 * change (protected item, auto-protection intent) arrives while the
 * previous configure-protection operation on the same item is still
 * running; retry once it finishes.
 * Azure error code: `BMSUserErrorConflictingProtectionOperation`
 */
export class BackupProtectionOperationInProgress extends Schema.TaggedError<BackupProtectionOperationInProgress>()(
  "BackupProtectionOperationInProgress",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

/**
 * Returned by Microsoft.CognitiveServices when encryption scopes are not
 * available for the account's kind or region. Azure error code:
 * `BadRequest` with "Encryption scope is not supported" (matched by
 * message).
 */
export class CognitiveServicesEncryptionScopeNotSupported extends Schema.TaggedError<CognitiveServicesEncryptionScopeNotSupported>()(
  "CognitiveServicesEncryptionScopeNotSupported",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.CognitiveServices when a managed-network outbound
 * rule targets a resource on which the Foundry account's managed identity
 * cannot approve private endpoint connections (it needs e.g. the "Azure AI
 * Enterprise Network Connection Approver" role). Also returned while a
 * fresh role assignment is still propagating. HTTP 400 `BadRequest`
 * (matched by message).
 */
export class CognitiveServicesPrivateEndpointApprovalForbidden extends Schema.TaggedError<CognitiveServicesPrivateEndpointApprovalForbidden>()(
  "CognitiveServicesPrivateEndpointApprovalForbidden",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.CognitiveServices managed networks when an outbound
 * rule is written or deleted while it (or its managed private endpoint) is
 * still being provisioned. HTTP 409, Azure error code `UserError` with
 * "is in conflicting state" (matched by message); retry once it settles.
 */
export class CognitiveServicesOutboundRuleConflictingState extends Schema.TaggedError<CognitiveServicesOutboundRuleConflictingState>()(
  "CognitiveServicesOutboundRuleConflictingState",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

/**
 * Returned by Microsoft.SignalRService when a feature (custom certificates,
 * custom domains, replicas, ...) is written to a service whose tier lacks
 * it. Azure returns HTTP 409 `Conflict` "The resource SKU does not support
 * ..." (matched by message).
 */
export class SignalRSkuFeatureNotSupported extends Schema.TaggedError<SignalRSkuFeatureNotSupported>()(
  "SignalRSkuFeatureNotSupported",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.SqlVirtualMachine when a SQL virtual machine is
 * deleted while the RP is still uninstalling the SQL IaaS extension from a
 * previous delete: HTTP 409 "Underlying virtual machine ... does not exist
 * or does not have SQL IaaS extension installed" (matched by message).
 */
export class SqlVirtualMachineExtensionMissing extends Schema.TaggedError<SqlVirtualMachineExtensionMissing>()(
  "SqlVirtualMachineExtensionMissing",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

/**
 * Returned by Microsoft.SignalRService when a shared private link resource
 * is written to a replica before the primary's link of the same name has
 * replicated to it. Azure returns HTTP 409 `Conflict` "Cannot create a new
 * shared private link resource for replicas directly" (matched by message).
 */
export class SignalRReplicaLinkNotReplicated extends Schema.TaggedError<SignalRReplicaLinkNotReplicated>()(
  "SignalRReplicaLinkNotReplicated",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

/**
 * Returned by Microsoft.StorageCache when an AML file system's blob
 * integration (HSM) container cannot be reached yet, typically while the
 * HPC Cache resource provider's fresh role assignments propagate: HTTP 400
 * `InvalidParameter` "Storage Container ... is not found or is
 * inaccessible." (matched by code + message). Transient; retry.
 */
export class AmlFilesystemContainerInaccessible extends Schema.TaggedError<AmlFilesystemContainerInaccessible>()(
  "AmlFilesystemContainerInaccessible",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.SignalRService (SignalR and Web PubSub) when a
 * custom domain references a custom certificate that does not exist on the
 * service: HTTP 400 "Referenced custom certificate \"x\" does not exist."
 * (matched by message).
 */
export class SignalRCustomCertificateNotFound extends Schema.TaggedError<SignalRCustomCertificateNotFound>()(
  "SignalRCustomCertificateNotFound",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.Datadog when the Datadog Marketplace SaaS purchase
 * behind a monitor cannot be validated, e.g. on a Free Trial subscription
 * or before the Datadog Marketplace terms are accepted. HTTP 400
 * `ResourceCreationValidateFailed` "The resource validation failed."
 */
export class DatadogMonitorCreationValidateFailed extends Schema.TaggedError<DatadogMonitorCreationValidateFailed>()(
  "DatadogMonitorCreationValidateFailed",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.BotService when deleting an OAuth connection
 * setting that is already gone (eventual consistency after a delete).
 * HTTP 400 "connection resource with id ... is not found" (matched by
 * message).
 */
export class BotConnectionNotFound extends Schema.TaggedError<BotConnectionNotFound>()(
  "BotConnectionNotFound",
  AzureErrorFields,
).pipe(Category.withNotFoundError) {}

/**
 * Returned by Microsoft.BotService when deleting an OAuth connection
 * setting whose previous delete is still propagating. HTTP 500 "Object
 * reference not set to an instance of an object" from
 * `ConnectionSettingConverters` (matched by message).
 */
export class BotConnectionDeleteInProgress extends Schema.TaggedError<BotConnectionDeleteInProgress>()(
  "BotConnectionDeleteInProgress",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

// ---------------------------------------------------------------------------
// Azure error code → typed error class mapping
// ---------------------------------------------------------------------------

/**
 * Azure error code to typed error class mapping.
 * Used by the protocol's error matching to dispatch by ARM error code.
 */
/**
 * Microsoft.DevCenter: the subscription has no Dev Box network connection
 * quota in the region. HTTP 409 `ResourceQuotaExceeded` "networkConnections
 * cannot be created in the eastus region at this time, because the resource
 * quota has been exceeded in that region." (matched by message).
 */
export class DevCenterNetworkConnectionQuotaExceeded extends Schema.TaggedError<DevCenterNetworkConnectionQuotaExceeded>()(
  "DevCenterNetworkConnectionQuotaExceeded",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Microsoft.DevCenter: the dev center's managed identity cannot (yet) read
 * the Azure Compute Gallery being attached — missing role assignment or
 * RBAC propagation delay. HTTP 400 `ValidationError` whose `details[].code`
 * is `DevCenterIsNotAuthorizedToGallery`.
 */
export class DevCenterNotAuthorizedToGallery extends Schema.TaggedError<DevCenterNotAuthorizedToGallery>()(
  "DevCenterNotAuthorizedToGallery",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Microsoft.DevCenter: Dev Box stopped accepting new customers on
 * 2025-11-01, so a tenant not already onboarded cannot create dev box
 * definitions, pools, or schedules. HTTP 400 `ValidationError` "The request
 * is not valid." whose `details[].code` is `TenantNotOnboardedToLegacy`.
 */
export class DevBoxTenantNotOnboarded extends Schema.TaggedError<DevBoxTenantNotOnboarded>()(
  "DevBoxTenantNotOnboarded",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Microsoft.AzureDataTransfer rejects pipeline creation for subscriptions
 * that are not onboarded to Azure Data Transfer. HTTP 400 "You are not
 * allowed to create a pipeline in this location or you are missing the
 * appropriate permissions." (matched by message).
 */
export class DataTransferPipelineNotAllowed extends Schema.TaggedError<DataTransferPipelineNotAllowed>()(
  "DataTransferPipelineNotAllowed",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Microsoft.AzureDataTransfer rejects a PUT on an existing connection (its
 * PUT is create-only). HTTP 400 "A connection with ID '...' already exists.
 * Please choose a different name." (matched by message).
 */
export class DataTransferConnectionAlreadyExists extends Schema.TaggedError<DataTransferConnectionAlreadyExists>()(
  "DataTransferConnectionAlreadyExists",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Microsoft.AzureDataTransfer rejects creating a flow on a connection the
 * pipeline owner has not approved. HTTP 400 "Connection has not been
 * approved yet." (matched by message).
 */
export class DataTransferConnectionNotApproved extends Schema.TaggedError<DataTransferConnectionNotApproved>()(
  "DataTransferConnectionNotApproved",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Microsoft.Devices (Device Provisioning Service) rejects writes while the
 * service is still applying a previous change: HTTP 409 with numeric code
 * 409301 "Invalid IotDpsState i.e. should be active/suspended, IotDpsState:
 * Transitioning" (matched by message).
 */
export class IotDpsStateTransitioning extends Schema.TaggedError<IotDpsStateTransitioning>()(
  "IotDpsStateTransitioning",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

/**
 * Microsoft.RecoveryServices (Site Recovery) rejects an ASR call with
 * `BadRequest` "The resource with ID ... isn't registered with the service."
 * while a freshly created vault is still being registered with ASR
 * (transient; matched by message).
 */
export class SiteRecoveryVaultNotRegistered extends Schema.TaggedError<SiteRecoveryVaultNotRegistered>()(
  "SiteRecoveryVaultNotRegistered",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

/**
 * Microsoft.RecoveryServices (Site Recovery) rejects vault-level settings
 * (e.g. alert settings) with `BadRequest` "There are no servers registered
 * to the Azure Site Recovery vault." until a fabric/server is registered
 * (matched by message).
 */
export class SiteRecoveryNoRegisteredServers extends Schema.TaggedError<SiteRecoveryNoRegisteredServers>()(
  "SiteRecoveryNoRegisteredServers",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Microsoft.ServiceFabric (managed clusters) refuses to delete a cluster's
 * last primary node type: `InvalidParameter` "Cluster must have at least
 * one active primary node type." (matched by message). The node type goes
 * away with its cluster.
 */
export class ServiceFabricPrimaryNodeTypeRequired extends Schema.TaggedError<ServiceFabricPrimaryNodeTypeRequired>()(
  "ServiceFabricPrimaryNodeTypeRequired",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Microsoft.DocumentDB rejects a database-account PUT with `BadRequest`
 * "...is in the process of being created" while an earlier create of the
 * same account is still running (matched by message).
 */
export class CosmosAccountBeingCreated extends Schema.TaggedError<CosmosAccountBeingCreated>()(
  "CosmosAccountBeingCreated",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

/**
 * Power BI Embedded rejects capacity creation when the tenant has never
 * signed up for Microsoft Fabric / Power BI (matched by message).
 */
export class PowerBITenantNotSignedUp extends Schema.TaggedError<PowerBITenantNotSignedUp>()(
  "PowerBITenantNotSignedUp",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Microsoft.Fabric rejects a capacity whose administrators are not (yet)
 * visible Entra users or service principals — e.g. a managed identity
 * created moments ago that has not replicated (matched by message).
 */
export class FabricCapacityPrincipalNotFound extends Schema.TaggedError<FabricCapacityPrincipalNotFound>()(
  "FabricCapacityPrincipalNotFound",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Microsoft.Fabric rejects a capacity whose capacity units would exceed the
 * subscription's regional Fabric CU quota (matched by message).
 */
export class FabricCapacityQuotaExceeded extends Schema.TaggedError<FabricCapacityQuotaExceeded>()(
  "FabricCapacityQuotaExceeded",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * ARM rejected a resource provider's response because the payload did not
 * match the provider's own API spec (e.g. Microsoft.VideoIndexer answers a
 * PUT on an existing private endpoint connection with a malformed `id`).
 * The request was not applied.
 * Azure error code: `HttpResponsePayloadAPISpecValidationFailed`
 */
export class HttpResponsePayloadAPISpecValidationFailed extends Schema.TaggedError<HttpResponsePayloadAPISpecValidationFailed>()(
  "HttpResponsePayloadAPISpecValidationFailed",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.App when creating a managed environment would exceed
 * the subscription's environment quota. HTTP 409
 * `MaxNumberOfGlobalEnvironmentsInSubExceeded` ("The subscription '...'
 * cannot have more than 1 Container App Environments.") or
 * `MaxNumberOfRegionalEnvironmentsInSubExceeded` (per-region limit).
 */
export class ContainerAppsEnvironmentQuotaExceeded extends Schema.TaggedError<ContainerAppsEnvironmentQuotaExceeded>()(
  "ContainerAppsEnvironmentQuotaExceeded",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

export const AZURE_ERROR_CODE_MAP: Record<string, new (props: any) => unknown> = {
  TenantNotOnboardedToLegacy: DevBoxTenantNotOnboarded,
  MaxNumberOfGlobalEnvironmentsInSubExceeded: ContainerAppsEnvironmentQuotaExceeded,
  MaxNumberOfRegionalEnvironmentsInSubExceeded: ContainerAppsEnvironmentQuotaExceeded,
  DevCenterIsNotAuthorizedToGallery: DevCenterNotAuthorizedToGallery,
  // Not-found
  ResourceNotFound: ResourceNotFound,
  HttpResponsePayloadAPISpecValidationFailed: HttpResponsePayloadAPISpecValidationFailed,
  ResourceGroupNotFound: ResourceGroupNotFound,
  MissingSubscription: SubscriptionNotFound,
  SubscriptionNotFound: SubscriptionNotFound,

  // Auth
  AuthorizationFailed: AuthorizationFailed,
  InvalidAuthenticationToken: InvalidAuthenticationToken,
  InvalidAuthenticationTokenAudience: InvalidAuthenticationTokenAudience,
  InvalidAuthenticationTokenTenant: InvalidAuthenticationTokenTenant,
  LinkedAuthorizationFailed: LinkedAuthorizationFailed,
  AuthorizationPermissionMismatch: SchemaRegistryStorageAccessDenied,

  // Bad request / validation
  InvalidParameter: InvalidParameter,
  InvalidParameterValue: InvalidParameter,
  ParameterOutOfRange: InvalidParameter,
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
  InvalidResourceNamespace: InvalidResourceNamespace,

  // Throttling / quota
  QuotaExceeded: QuotaExceeded,
  ExceededMaxAccountCount: QuotaExceeded,
  RequestRateLimitExceeded: RequestRateLimitExceeded,
  TooManyRequests: RequestRateLimitExceeded,

  // Location / scope
  LocationNotAvailableForResourceType: LocationNotAvailable,
  LocationNotAvailableForResourceGroup: LocationNotAvailable,
  InvalidResourceScope: InvalidScope,
  ScopeNotValid: InvalidScope,

  // Resource providers
  RoleAssignmentNotFound: RoleAssignmentNotFound,
  RoleAssignmentExists: RoleAssignmentExists,
  PrincipalNotFound: PrincipalNotFound,
  RoleDefinitionDoesNotExist: RoleDefinitionNotFound,
  RoleDefinitionWithSameNameExists: RoleDefinitionWithSameNameExists,
  RoleDefinitionHasAssignments: RoleDefinitionHasAssignments,
  ContainerNotFound: ContainerNotFound,
  ManagementGroupNotFound: ManagementGroupNotFound,
  ServiceGroupNameNotFound: ServiceGroupNameNotFound,
  ShareNotFound: ShareNotFound,
  FirewallRuleNotExist: FirewallRuleNotExist,
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
  OperationInProgress: DeviceUpdateOperationInProgress,
  InstanceIsNotInTerminalState: DeviceUpdateInstanceNotTerminal,
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
  FailedCustomerCacheNodesExist: ConnectedCacheCustomerCacheNodesExist,
  ResourceRestriction: NetAppCreationRestricted,
  ServiceNotFound: ApiManagementServiceNotFound,
  // Microsoft.ApiManagement gateways/configConnections GET of a missing connection.
  GatewayConfigConnectionNotFound: ResourceNotFound,
  ApplicationGroupInvalidSku: EventHubApplicationGroupNotSupported,
  RequestConflict: CognitiveServicesRequestConflict,
  RSVaultUpdateErrorConflictingOperationInProgress: RecoveryServicesVaultOperationInProgress,
  BMSUserErrorConflictingProtectionOperation: BackupProtectionOperationInProgress,
  BMSUserErrorSoftDeleteUseVaultApi: BackupConfigManagedByVaultApi,
  BMSUserErrorRedundancySettingsUseVaultApi: BackupConfigManagedByVaultApi,
  SkuNotAvailable: SkuNotAvailable,
  TasksOperationsNotAllowed: TasksOperationsNotAllowed,
  ServiceRunnerIsDeprecatedEnvironment: DevTestLabsServiceRunnerDeprecated,
  ServiceRunnerIsDeprecatedVirtualMachine: DevTestLabsServiceRunnerDeprecated,
  AccountNotEnabledForAutoStorage: BatchAccountNotEnabledForAutoStorage,
  ResourceCreationValidateFailed: DatadogMonitorCreationValidateFailed,
  ConcurrentFederatedIdentityCredentialsWritesForSingleManagedIdentity:
    FederatedIdentityCredentialWriteConflict,
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
 * Returned by Microsoft.Web when a public certificate is uploaded to an app
 * on a Free (F1) plan: "Adding a Public Certificate failed because it would
 * exceed the allowed amount of Free connections." Error code: `Conflict`
 * (matched by message).
 */
export class WebPublicCertificateNotAllowedOnTier extends Schema.TaggedError<WebPublicCertificateNotAllowedOnTier>()(
  "WebPublicCertificateNotAllowedOnTier",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.Web (HTTP 500) for an operation the service no
 * longer implements, e.g. creating a Static Web Apps database connection
 * (the retired database connections preview): "The requested method is not
 * implemented." Not retryable (matched by message).
 */
export class WebMethodNotImplemented extends Schema.TaggedError<WebMethodNotImplemented>()(
  "WebMethodNotImplemented",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.Web (HTTP 502) when the subscription is barred from
 * creating a plan type, e.g. Flex Consumption (FC1) on a restricted free
 * trial: "The subscription '<id>' is not allowed to create or update the
 * serverfarm." Not retryable (matched by message).
 */
export class ServerFarmCreateNotAllowed extends Schema.TaggedError<ServerFarmCreateNotAllowed>()(
  "ServerFarmCreateNotAllowed",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.OperationalInsights when a linked storage account is
 * rejected as "faulted" — right after the account is created, before the
 * service can see it, or when its region differs from the workspace's.
 * Error code: `InvalidParameter` with "might be considered faulted"
 * (matched by message).
 */
export class LinkedStorageAccountFaulted extends Schema.TaggedError<LinkedStorageAccountFaulted>()(
  "LinkedStorageAccountFaulted",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.MachineLearningServices when a `Default` workspace
 * is created without one of its required dependent resources (storage
 * account, Key Vault, or Application Insights). Azure returns HTTP 400
 * with "Missing dependent resources in workspace json" (matched by
 * message).
 */
export class MachineLearningWorkspaceMissingDependencies extends Schema.TaggedError<MachineLearningWorkspaceMissingDependencies>()(
  "MachineLearningWorkspaceMissingDependencies",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.MachineLearningServices when deleting an AI hub
 * workspace that still has project workspaces (including projects whose
 * deletion is still in progress). Azure returns HTTP 400 with "AI hub
 * still has associated AI projects" (matched by message).
 */
export class MachineLearningHubHasProjects extends Schema.TaggedError<MachineLearningHubHasProjects>()(
  "MachineLearningHubHasProjects",
  AzureErrorFields,
).pipe(Category.withDependencyViolationError) {}

/**
 * Returned by Microsoft.Monitor for an Azure Monitor workspace's metrics
 * container while the workspace's backing metrics account is still being
 * wired up after creation (HTTP 500 "Unauthorized to access Geneva Metrics
 * account", matched by message); retry until it settles.
 */
export class MetricsContainerNotReady extends Schema.TaggedError<MetricsContainerNotReady>()(
  "MetricsContainerNotReady",
  AzureErrorFields,
).pipe(Category.withServerError) {}

/**
 * Returned when a resource's `extendedLocation` names an Arc custom
 * location that does not exist (e.g. Microsoft.Monitor pipeline groups).
 * Azure returns HTTP 400 with "The custom location was not found"
 * (matched by message).
 */
export class CustomLocationNotFound extends Schema.TaggedError<CustomLocationNotFound>()(
  "CustomLocationNotFound",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.ScVmm when a guest agent is created on an Arc
 * machine that has no SCVMM VM instance: the agent inherits the instance's
 * extended location, so Azure reports "has an invalid extended location
 * '<null>'" (matched by message).
 */
export class ScVmmVmInstanceMissing extends Schema.TaggedError<ScVmmVmInstanceMissing>()(
  "ScVmmVmInstanceMissing",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.AzureStackHCI when an edge machine or edge device
 * references no Arc-enabled server, or one whose agent has not reported a
 * supported Azure Local OS SKU (only real, connected Azure Local nodes
 * qualify). Azure returns HTTP 400 without an error code (matched by
 * message).
 */
export class AzureLocalArcMachineRequired extends Schema.TaggedError<AzureLocalArcMachineRequired>()(
  "AzureLocalArcMachineRequired",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.Peering when a peering references a peer ASN that
 * Microsoft has not approved for the subscription. HTTP 400 without an
 * error code (matched by message).
 */
export class PeeringPeerAsnNotApproved extends Schema.TaggedError<PeeringPeerAsnNotApproved>()(
  "PeeringPeerAsnNotApproved",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.Peering when a peering service prefix carries no
 * or an unknown provider prefix key. HTTP 400 without an error code
 * (matched by message).
 */
export class PeeringServicePrefixKeyInvalid extends Schema.TaggedError<PeeringServicePrefixKeyInvalid>()(
  "PeeringServicePrefixKeyInvalid",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.Peering when the provider cannot validate a
 * peering service prefix ("Prefix validation failed. ErrorCode=...").
 * Azure uses HTTP 404 without an error code, so it must not be read as
 * "resource not found" (matched by message).
 */
export class PeeringServicePrefixValidationFailed extends Schema.TaggedError<PeeringServicePrefixValidationFailed>()(
  "PeeringServicePrefixValidationFailed",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.DBforPostgreSQL/serverGroupsv2 when creating a new
 * Cosmos DB for PostgreSQL cluster: the service is retiring and no longer
 * provisions new clusters (existing clusters, restores and read replicas
 * still work). HTTP 400 "Provisioning new Azure Cosmos DB for PostgreSQL
 * clusters is no longer supported" (matched by message).
 */
export class CosmosPostgresProvisioningRetired extends Schema.TaggedError<CosmosPostgresProvisioningRetired>()(
  "CosmosPostgresProvisioningRetired",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.HDInsight when creating or resizing a cluster
 * exceeds the subscription's regional HDInsight cores quota (0 on free
 * trials). HTTP 400 "User SubscriptionId '...' does not have cores left to
 * create resource '...'. Required: N, Available: M." without an error code
 * (matched by message).
 */
export class HDInsightCoresQuotaExceeded extends Schema.TaggedError<HDInsightCoresQuotaExceeded>()(
  "HDInsightCoresQuotaExceeded",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.RedHatOpenShift when a cluster's control-plane or
 * worker VM size is not offered to the subscription in the region (e.g.
 * every D-series v5 size on free trials). HTTP 400 `InvalidParameter`
 * "The selected SKU '...' is restricted in region '...' for selected
 * subscription" (matched by message).
 */
export class RedHatOpenShiftVmSkuRestricted extends Schema.TaggedError<RedHatOpenShiftVmSkuRestricted>()(
  "RedHatOpenShiftVmSkuRestricted",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.RedHatOpenShift when the cluster's control-plane,
 * worker and bootstrap VMs (44 vCPUs minimum) exceed the subscription's
 * regional cores quota. HTTP 400 "Resource quota of cores exceeded.
 * Maximum allowed: N, Current in use: M, Additional requested: K." without
 * an error code (matched by message).
 */
export class RedHatOpenShiftCoresQuotaExceeded extends Schema.TaggedError<RedHatOpenShiftCoresQuotaExceeded>()(
  "RedHatOpenShiftCoresQuotaExceeded",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.Storage when a storage task assignment is written
 * while its previous asynchronous PUT is still running (GET may already
 * report `Succeeded`). HTTP 409 `InvalidResourceOperation` with "Another
 * 'PUT' operation ... is active/in-progress ... storageTaskAssignments";
 * retry until it settles.
 */
export class StorageTaskAssignmentOperationInProgress extends Schema.TaggedError<StorageTaskAssignmentOperationInProgress>()(
  "StorageTaskAssignmentOperationInProgress",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

/**
 * Returned by Microsoft.Kubernetes (Azure Arc connected clusters) when a
 * write arrives while the previous asynchronous PUT is still running. HTTP
 * 409 `InvalidResourceOperation` with "... connectedClusters/{name}' is
 * invalid as it is being provisioned with state: 'Accepted'"; retry until
 * it settles.
 */
export class ConnectedClusterOperationInProgress extends Schema.TaggedError<ConnectedClusterOperationInProgress>()(
  "ConnectedClusterOperationInProgress",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

/**
 * Returned by Microsoft.ExtendedLocation when a custom location references
 * a cluster extension that does not exist or cannot be read (e.g. on a
 * cluster whose Arc agents are not connected). HTTP 400 with no code and
 * "combined getting extension config errors ... error in trying to get
 * cluster extension config" (matched by message).
 */
export class CustomLocationClusterExtensionNotFound extends Schema.TaggedError<CustomLocationClusterExtensionNotFound>()(
  "CustomLocationClusterExtensionNotFound",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.HybridNetwork (Azure Operator Service Manager) when
 * a write arrives while the previous asynchronous operation on the same
 * resource is still running (GET may already report `Succeeded`). Azure
 * returns HTTP 409 `InvalidResourceOperation` with "Another 'PUT'
 * operation ... is active/in-progress" or "... is being provisioned with
 * state" (matched by message); retry until it settles. Microsoft.Mission
 * (Virtual Enclaves) hubs return the same error.
 */
export class HybridNetworkOperationInProgress extends Schema.TaggedError<HybridNetworkOperationInProgress>()(
  "HybridNetworkOperationInProgress",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

/**
 * Returned by Microsoft.HybridCompute when an Arc gateway is written or
 * deleted while it is still provisioning. HTTP 409 without an error code
 * ("Gateway operation not allowed. The Gateway is a transitioning state.",
 * matched by message); retry until it settles.
 */
export class HybridComputeGatewayTransitioning extends Schema.TaggedError<HybridComputeGatewayTransitioning>()(
  "HybridComputeGatewayTransitioning",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

/**
 * Returned by Microsoft.HybridCompute when a license profile is written to
 * an Arc machine whose Connected Machine agent has not connected. HTTP 400
 * without an error code (matched by message).
 */
export class ArcMachineNotConnected extends Schema.TaggedError<ArcMachineNotConnected>()(
  "ArcMachineNotConnected",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.Databricks when a write or delete reaches a
 * workspace ("appliance") that is still being provisioned, updated, or
 * deleted. Azure returns HTTP 409 "The operation cannot be performed on the
 * appliance '<name>' because it is being deleted" (matched by message);
 * retry until it settles.
 */
export class DatabricksApplianceBusy extends Schema.TaggedError<DatabricksApplianceBusy>()(
  "DatabricksApplianceBusy",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

/**
 * Returned by Microsoft.Sql when a write to a server/database setting
 * (security alert policy, auditing, threat protection, ...) arrives while
 * the previous asynchronous write is still running. Azure returns HTTP 409
 * "... is already in progress. Use Azure-AsyncOperation request to track
 * your operation" (matched by message); retry until it settles.
 */
export class SqlOperationInProgress extends Schema.TaggedError<SqlOperationInProgress>()(
  "SqlOperationInProgress",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

/**
 * Returned by Microsoft.App when the tenant or subscription is not enrolled
 * in the Azure SRE Agent preview (agent spaces). Azure returns HTTP 400
 * with "Operations on Agent Space are not allowed for tenant" (matched by
 * message).
 */
export class AgentSpaceNotAllowed extends Schema.TaggedError<AgentSpaceNotAllowed>()(
  "AgentSpaceNotAllowed",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.Edge when a site is created on a scope (resource
 * group or subscription) that already holds one; also briefly after the
 * previous site was deleted. Azure returns HTTP 400 "Site already present
 * on the same scope" without an error code (matched by message).
 */
export class EdgeSiteScopeTaken extends Schema.TaggedError<EdgeSiteScopeTaken>()(
  "EdgeSiteScopeTaken",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.MachineLearningServices when a serverless endpoint
 * names a catalog model that is not offered to the subscription in the
 * workspace's region. Azure returns HTTP 400 with "The requested model
 * ... is not available." (matched by message).
 */
export class MachineLearningModelNotAvailable extends Schema.TaggedError<MachineLearningModelNotAvailable>()(
  "MachineLearningModelNotAvailable",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.MachineLearningServices when a request targets a
 * workspace child (e.g. a marketplace subscription) while another operation
 * on it is still running. Azure returns HTTP 409 "Another operation with ID
 * [...] is already running on ..." (matched by message). Retryable.
 */
export class MachineLearningOperationInProgress extends Schema.TaggedError<MachineLearningOperationInProgress>()(
  "MachineLearningOperationInProgress",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

/**
 * Returned by Microsoft.Sql when a server key name is not
 * `<vault>_<key>_<version>` (HTTP 400 "An invalid value was given for the
 * server key name", matched by message). Such a key cannot exist.
 */
export class SqlServerKeyNameInvalid extends Schema.TaggedError<SqlServerKeyNameInvalid>()(
  "SqlServerKeyNameInvalid",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.Sql when a database's custom maintenance windows
 * are written but the database does not accept the selection (custom
 * time ranges are not offered to the subscription). Azure returns HTTP 400
 * code `InvalidMaintenanceWindowSelection` "Invalid maintenance window
 * selection.".
 */
export class SqlMaintenanceWindowInvalid extends Schema.TaggedError<SqlMaintenanceWindowInvalid>()(
  "SqlMaintenanceWindowInvalid",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.Sql when Microsoft Entra-only authentication is
 * set on a managed instance that has no Microsoft Entra administrator.
 * Azure returns HTTP 400 code
 * `InvalidManagedServerAADOnlyAuthNoAADAdminPropertyName` "AAD Admin is
 * not configured, AAD Admin must be set before enabling/disabling AAD Only
 * Authentication.".
 */
export class SqlManagedInstanceEntraAdminRequired extends Schema.TaggedError<SqlManagedInstanceEntraAdminRequired>()(
  "SqlManagedInstanceEntraAdminRequired",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.Edge when a workload orchestration context is
 * created while the subscription already holds one (one context per
 * subscription); also briefly after the previous context was deleted.
 * Azure returns HTTP 400 "Validation failed: Context ... already exists."
 * without an error code (matched by message).
 */
export class EdgeContextAlreadyExists extends Schema.TaggedError<EdgeContextAlreadyExists>()(
  "EdgeContextAlreadyExists",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.Edge when a solution template names capabilities
 * the subscription's context does not declare; also briefly after the
 * context gained them. Azure returns HTTP 400 "Validation failed :
 * Capabilities ... are missing in context resource" without an error code
 * (matched by message).
 */
export class EdgeContextCapabilityMissing extends Schema.TaggedError<EdgeContextCapabilityMissing>()(
  "EdgeContextCapabilityMissing",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.Migrate when an assessment is created in a group
 * whose machines do not support that assessment type (an empty group
 * supports none). HTTP 400 "Assessment Type: ... is not supported in this
 * group." without an error code (matched by message).
 */
export class MigrateAssessmentTypeNotSupported extends Schema.TaggedError<MigrateAssessmentTypeNotSupported>()(
  "MigrateAssessmentTypeNotSupported",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.OffAzure for a vCenter that does not exist in a
 * VMware site: HTTP 400 "VCenter name '...' is invalid." without an error
 * code (matched by message).
 */
export class MigrateVcenterNotFound extends Schema.TaggedError<MigrateVcenterNotFound>()(
  "MigrateVcenterNotFound",
  AzureErrorFields,
).pipe(Category.withNotFoundError) {}

/**
 * Returned by Microsoft.OffAzure when a vCenter, Hyper-V host, or cluster
 * names a run-as account the site's appliance has not registered: HTTP 400
 * "Run as account Id '...' is invalid." (matched by message).
 */
export class MigrateRunAsAccountInvalid extends Schema.TaggedError<MigrateRunAsAccountInvalid>()(
  "MigrateRunAsAccountInvalid",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.Cdn when an Azure Front Door Standard/Premium
 * profile is created on a Free Trial or Azure for Students subscription.
 * Azure returns HTTP 400 "Free Trial and Student account is forbidden for
 * Azure Frontdoor resources." without an error code (matched by message).
 */
export class FrontDoorFreeTrialForbidden extends Schema.TaggedError<FrontDoorFreeTrialForbidden>()(
  "FrontDoorFreeTrialForbidden",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.Cdn when creating an Azure Front Door Standard/Premium
 * profile beyond the subscription's profile-creation quota: HTTP 400 code
 * `BadRequest` "The number of profiles created exceeds quota. Please contact
 * support to increase quota." (matched by message). Raising it needs a
 * support request; retrying does not help.
 */
export class FrontDoorProfileQuotaExceeded extends Schema.TaggedError<FrontDoorProfileQuotaExceeded>()(
  "FrontDoorProfileQuotaExceeded",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.Cdn when a Front Door route is written before its
 * origin group has finished provisioning an enabled origin: HTTP 400 code
 * `BadRequest` "Please make sure that the originGroup is created
 * successfully and at least one enabled origin is created under the origin
 * group." (matched by message). Transient while a sibling origin deploys.
 */
export class AfdOriginGroupNotReady extends Schema.TaggedError<AfdOriginGroupNotReady>()(
  "AfdOriginGroupNotReady",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.Cdn when the last origin of a Front Door origin
 * group is deleted or disabled while a route or rule still references the
 * group: HTTP 400 code `BadRequest` "Cannot disable or delete the last origin
 * when the origin group is still associated with a route or a rule."
 * (matched by message). Transient while the route is being deleted.
 */
export class AfdLastOriginInUse extends Schema.TaggedError<AfdLastOriginInUse>()(
  "AfdLastOriginInUse",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.CodeSigning (Artifact Signing) account PUTs on a
 * free-trial, free, or sponsored subscription: HTTP 400 "Artifact Signing is
 * not available for free, trial or sponsored subscriptions" (matched by
 * message). Retrying does not help.
 */
export class CodeSigningSubscriptionNotSupported extends Schema.TaggedError<CodeSigningSubscriptionNotSupported>()(
  "CodeSigningSubscriptionNotSupported",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Azure Native ISV (Marketplace SaaS) resource providers such as
 * Microsoft.Confluent when the subscription cannot purchase the offer's
 * plan, e.g. "SaaS Purchase Payment Check Failed as validationResponse was
 * {isEligible: false, errorMessage: The plan '...' can't be purchased using
 * a free subscription}". HTTP 400 without a specific code (matched by
 * message).
 */
export class MarketplacePurchaseNotEligible extends Schema.TaggedError<MarketplacePurchaseNotEligible>()(
  "MarketplacePurchaseNotEligible",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.Confluent when the organization's first user email
 * already belongs to a Confluent Cloud account: HTTP 400
 * `ResourceCreationValidateFailed` "Cannot complete signup. Reason: Email
 * already exists." (Confluent error code 40025, matched by message).
 */
export class ConfluentEmailAlreadyExists extends Schema.TaggedError<ConfluentEmailAlreadyExists>()(
  "ConfluentEmailAlreadyExists",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.Confluent environment/cluster/topic/connector
 * operations when the caller is a service principal: HTTP 400
 * `ResourceCreationValidateFailed` "Both UPN and Email claims are missing in
 * the ARM signed token. Service principal or app-only tokens are not
 * supported for this operation." (matched by message).
 */
export class ConfluentUserTokenRequired extends Schema.TaggedError<ConfluentUserTokenRequired>()(
  "ConfluentUserTokenRequired",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.Datadog when Datadog rejects creating the
 * organization behind a new monitor, e.g. when the caller is a service
 * principal (the Marketplace SaaS purchase needs a user token): HTTP 400
 * `ResourceCreationFailed` "ResourceCreationFailed: Bad Request" (matched by
 * code + message).
 */
export class DatadogMonitorCreationFailed extends Schema.TaggedError<DatadogMonitorCreationFailed>()(
  "DatadogMonitorCreationFailed",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.Communication when deleting the last sender
 * username of an email domain: HTTP 400 "Cannot remove all
 * SenderUsernames." (matched by message). The sender goes with its domain.
 */
export class SenderUsernameLastRemaining extends Schema.TaggedError<SenderUsernameLastRemaining>()(
  "SenderUsernameLastRemaining",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.Cache when a subscription may no longer create
 * Azure Cache for Redis (Basic/Standard/Premium) caches — new customers, or
 * regions where the subscription never had a cache, since the 2028
 * retirement was announced. HTTP 400 `BadRequest` "Azure Cache for Redis is
 * retiring, create Azure Managed Redis instance instead" (matched by
 * message).
 */
export class RedisCacheRetiring extends Schema.TaggedError<RedisCacheRetiring>()(
  "RedisCacheRetiring",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.Automanage when the subscription may not create
 * configuration profiles or assignments (e.g. free-trial subscriptions,
 * Automanage Machine Best Practices onboarding closed). HTTP 400 "The
 * operation was not allowed because the subscription is not in a state to
 * support it. Subscription state: -1" (matched by message).
 */
export class AutomanageSubscriptionNotSupported extends Schema.TaggedError<AutomanageSubscriptionNotSupported>()(
  "AutomanageSubscriptionNotSupported",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.Relationships `serviceGroupMember` writes in a
 * tenant without Azure Service Groups enabled. HTTP 400 "Relationship
 * lifecycle callbacks are not enabled for tenant '...'" (matched by
 * message).
 */
export class RelationshipCallbacksNotEnabled extends Schema.TaggedError<RelationshipCallbacksNotEnabled>()(
  "RelationshipCallbacksNotEnabled",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Azure Lighthouse rejects a registration definition whose
 * `managedByTenantId` is the subscription's own tenant: "not allowed to use
 * the '...' as ManagedByTenantId" (400, matched by message).
 */
export class LighthouseManagedByTenantNotAllowed extends Schema.TaggedError<LighthouseManagedByTenantNotAllowed>()(
  "LighthouseManagedByTenantNotAllowed",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Azure Lighthouse rejects a `managedByTenantId` that is not an existing
 * Entra tenant: "with given Managedby TenantId '...' is not valid tenant"
 * (400, matched by message).
 */
export class LighthouseManagedByTenantInvalid extends Schema.TaggedError<LighthouseManagedByTenantInvalid>()(
  "LighthouseManagedByTenantInvalid",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Azure Lighthouse rejects authorizations whose `principalId` is not an
 * object in the managing tenant: "The resource contains invalid principal
 * object identifiers" (400, matched by message).
 */
export class LighthouseInvalidPrincipal extends Schema.TaggedError<LighthouseInvalidPrincipal>()(
  "LighthouseInvalidPrincipal",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Microsoft.PolicyInsights refuses an attestation until a compliance scan has
 * produced state for the scope under a `manual`-effect assignment:
 * "No compliance data was found for resource" (400
 * `InvalidCreateAttestationRequest`, matched by message).
 */
export class AttestationComplianceDataNotFound extends Schema.TaggedError<AttestationComplianceDataNotFound>()(
  "AttestationComplianceDataNotFound",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned by Microsoft.KeyVault while a managed HSM pool is still applying
 * a previous change (e.g. a tag update or a private endpoint connection
 * approval), for updates, connection changes, and soft delete alike; retry
 * once it finishes. Matched by message: the ARM code is the bare `409`.
 */
export class ManagedHsmPoolUpdating extends Schema.TaggedError<ManagedHsmPoolUpdating>()(
  "ManagedHsmPoolUpdating",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

/**
 * Returned by Microsoft.KeyVault when purging a deleted managed HSM whose
 * purge is already running. Matched by message: the ARM code is the bare
 * `409`.
 */
export class ManagedHsmAlreadyBeingDeleted extends Schema.TaggedError<ManagedHsmAlreadyBeingDeleted>()(
  "ManagedHsmAlreadyBeingDeleted",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

/**
 * Returned by Microsoft.KeyVault for managed HSM key operations through
 * ARM until an HSM administrator enables the data-plane setting
 * `AllowKeyManagementOperationsThroughARM`. Matched by message.
 */
export class ManagedHsmArmKeyManagementDisabled extends Schema.TaggedError<ManagedHsmArmKeyManagementDisabled>()(
  "ManagedHsmArmKeyManagementDisabled",
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
  {
    code: "409",
    includes: "is still updating its spec",
    error: ManagedHsmPoolUpdating,
  },
  {
    code: "409",
    includes: "Pools with ongoing updates cannot be",
    error: ManagedHsmPoolUpdating,
  },
  {
    code: "409",
    includes: "The version of update object should be",
    error: ManagedHsmPoolUpdating,
  },
  {
    code: "409",
    includes: "requested to be deleted is already being deleted",
    error: ManagedHsmAlreadyBeingDeleted,
  },
  {
    includes: "enable the setting 'AllowKeyManagementOperationsThroughARM'",
    error: ManagedHsmArmKeyManagementDisabled,
  },
  {
    includes: "Sequence contains no matching element",
    error: NetAppVolumeGroupNotReadable,
  },
  {
    code: "ResourceQuotaExceeded",
    includes: "networkConnections cannot be created",
    error: DevCenterNetworkConnectionQuotaExceeded,
  },
  {
    code: "InvalidCreateAttestationRequest",
    includes: "No compliance data was found",
    error: AttestationComplianceDataNotFound,
  },
  {
    includes: "wasn't recognized by Microsoft Fabric",
    error: PowerBITenantNotSignedUp,
  },
  {
    includes: "All provided principals must be existing, user or service principals",
    error: FabricCapacityPrincipalNotFound,
  },
  {
    includes: "must not exceed the regional quota for the subscription",
    error: FabricCapacityQuotaExceeded,
  },
  {
    code: "InvalidRequest",
    includes: "ServiceGroup name not found",
    error: ServiceGroupNameNotFound,
  },
  {
    includes: "Cannot remove all SenderUsernames",
    error: SenderUsernameLastRemaining,
  },
  {
    code: "Conflict",
    includes: "Cannot create a new shared private link resource for replicas",
    error: SignalRReplicaLinkNotReplicated,
  },
  {
    code: "InvalidParameter",
    includes: "is not found or is inaccessible",
    error: AmlFilesystemContainerInaccessible,
  },
  {
    includes: "Referenced custom certificate",
    error: SignalRCustomCertificateNotFound,
  },
  {
    code: "Conflict",
    includes: "The resource SKU does not support",
    error: SignalRSkuFeatureNotSupported,
  },
  {
    includes: "is transitioning at this time",
    error: ApiManagementServiceTransitioning,
  },
  {
    includes: "Anomalies are not supported for workspace",
    error: SentinelAnomaliesNotSupported,
  },
  {
    includes: "Failed to pull machine information from provider with a HttpRequestException",
    error: GuestConfigurationMachineInfoUnavailable,
  },
  {
    includes: "Failed to pull machine information from provider",
    error: GuestConfigurationMachineLookupFailed,
  },
  {
    includes: "Request to the agent service failed",
    error: GuestConfigurationAgentServiceFailed,
  },
  {
    includes: "Rules Actions API has been deprecated",
    error: SentinelRuleActionsDeprecated,
  },
  {
    includes: "Unauthorized access due to bad credentials",
    error: SentinelRepositoryAccessDenied,
  },
  {
    code: "401",
    includes: "unauthorized request",
    error: DevHubGitHubNotAuthorized,
  },
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
    code: "ResourceNotFound",
    includes: "did not have proper uri path format",
    error: ApiManagementRouteNotSupported,
  },
  // Microsoft.ApiManagement (HTTP 502): email template writes are disabled
  // for Pay-As-You-Go/MSDN offers; not a transient throttle.
  {
    includes: "throttling policy 'PerSubEmailTemplateWrites'",
    error: ApiManagementEmailTemplateWritesNotAllowed,
  },
  // Generic ARM throttling policies: retry after a delay.
  {
    includes: "Operation disallowed by throttling policy",
    error: RequestRateLimitExceeded,
  },
  // Microsoft.Network: "Rule Collection Group X can not be updated because
  // Parent Firewall Policy Y is in Updating state from previous operation".
  {
    includes: "DSCP Configuration is currently not supported",
    error: NetworkFeatureNotSupported,
  },
  {
    includes: "cannot contain more than 0 address prefix sets",
    error: NetworkFeatureNotSupported,
  },
  {
    includes: "is not registered for feature:",
    error: SubscriptionFeatureNotRegistered,
  },
  // Microsoft.Network previews: "Subscription X is not registered for
  // feature Microsoft.Network/AllowServiceGateways required to ...".
  {
    includes: "is not registered for feature Microsoft.",
    error: SubscriptionFeatureNotRegistered,
  },
  // Microsoft.Network perimeter logging: "... tenant is not whitelisted and
  // EnableServiceTagsInNsp AFEC flag is not registered for the subscription."
  {
    includes: "AFEC flag is not registered",
    error: SubscriptionFeatureNotRegistered,
  },
  {
    includes: "in Updating state from previous operation",
    error: NetworkOperationInProgress,
  },
  // Microsoft.Network NVA children (inbound security rules) while the NVA
  // is still applying an earlier request: "Previous request in-progress.
  // Try again later."
  {
    includes: "Previous request in-progress",
    error: NetworkOperationInProgress,
  },
  {
    includes: "default NVA connection created implicitly cannot be deleted",
    error: NvaDefaultConnectionUndeletable,
  },
  // Microsoft.Network: "Cannot create more than 3 public IP addresses for
  // this subscription in this region." (also returned for IPv4 prefixes).
  {
    includes: "public IP addresses for this subscription in this region",
    error: QuotaExceeded,
  },
  {
    includes: "Application Group available only for Dedicated and Premium",
    error: EventHubApplicationGroupNotSupported,
  },
  {
    includes: "cannot be deleted until at least 4 hours after its created time",
    error: EventHubClusterDeleteTooSoon,
  },
  {
    includes: "because another operation or internal maintenance is in progress",
    error: TrafficCollectorOperationInProgress,
  },
  {
    includes: "given the Azure Virtual Desktop service permissions",
    error: AvdServicePrincipalAccessDenied,
  },
  {
    includes: "Only one account is allowed for your subscription per Region",
    error: AutomationAccountRegionLimit,
  },
  {
    includes: "subscriptions cannot create accounts in this location",
    error: AutomationLocationNotAllowed,
  },
  {
    includes: "SourceControl securityToken is invalid",
    error: AutomationSourceControlTokenInvalid,
  },
  {
    includes: "does not allow changes to GeoBackup policy",
    error: SynapseGeoBackupNotAllowed,
  },
  {
    code: "BadRequest",
    includes: "as it is still being provisioned",
    error: SearchSharedPrivateLinkBusy,
  },
  {
    includes: "IP Access Rules security policy feature is not enabled",
    error: AgcIpAccessRulesNotEnabled,
  },
  {
    includes: "record pointing from",
    error: HostNameVerificationFailed,
  },
  {
    includes: "does not support slots",
    error: WebAppSlotsNotSupported,
  },
  {
    includes: "Adding a Public Certificate failed because it would exceed",
    error: WebPublicCertificateNotAllowedOnTier,
  },
  {
    includes: "The requested method is not implemented.",
    error: WebMethodNotImplemented,
  },
  {
    includes: "is not allowed to create or update the serverfarm",
    error: ServerFarmCreateNotAllowed,
  },
  {
    includes: "Encryption scope is not supported",
    error: CognitiveServicesEncryptionScopeNotSupported,
  },
  {
    includes: "required permissions to read and approve private endpoint connections",
    error: CognitiveServicesPrivateEndpointApprovalForbidden,
  },
  {
    code: "UserError",
    includes: "is in conflicting state",
    error: CognitiveServicesOutboundRuleConflictingState,
  },
  {
    includes: "Missing dependent resources in workspace json",
    error: MachineLearningWorkspaceMissingDependencies,
  },
  {
    includes: "AI hub still has associated AI projects",
    error: MachineLearningHubHasProjects,
  },
  {
    includes: "The requested model azureml://",
    error: MachineLearningModelNotAvailable,
  },
  {
    includes: "is already running on marketplace subscription",
    error: MachineLearningOperationInProgress,
  },
  // Microsoft.Sql: "Set server security alert policy is already in
  // progress. Use Azure-AsyncOperation request to track your operation".
  {
    includes: "already in progress. Use Azure-AsyncOperation",
    error: SqlOperationInProgress,
  },
  {
    code: "BadRequest",
    includes: "Registration is already in progress",
    error: BackupContainerRegistrationInProgress,
  },
  {
    includes: "The operation cannot be performed on the appliance",
    error: DatabricksApplianceBusy,
  },
  {
    code: "InvalidResourceOperation",
    includes: "storageAccounts/storageTaskAssignments",
    error: StorageTaskAssignmentOperationInProgress,
  },
  {
    code: "InvalidResourceOperation",
    includes: "Microsoft.Kubernetes/connectedClusters/",
    error: ConnectedClusterOperationInProgress,
  },
  {
    includes: "error in trying to get cluster extension config",
    error: CustomLocationClusterExtensionNotFound,
  },
  {
    code: "InvalidResourceOperation",
    includes: "is active/in-progress",
    error: HybridNetworkOperationInProgress,
  },
  {
    code: "InvalidResourceOperation",
    includes: "is being provisioned with state",
    error: HybridNetworkOperationInProgress,
  },
  {
    includes: "An invalid value was given for the server key name",
    error: SqlServerKeyNameInvalid,
  },
  {
    code: "InvalidMaintenanceWindowSelection",
    includes: "maintenance window",
    error: SqlMaintenanceWindowInvalid,
  },
  {
    code: "InvalidManagedServerAADOnlyAuthNoAADAdminPropertyName",
    includes: "AAD Admin",
    error: SqlManagedInstanceEntraAdminRequired,
  },
  {
    includes: "aka.ms/azureskunotavailable",
    error: SkuNotAvailable,
  },
  // Microsoft.Compute: "Operation could not be completed as it results in
  // exceeding approved {family} quota" (vCPU, dedicated host, ...).
  {
    code: "OperationNotAllowed",
    includes: "exceeding approved",
    error: QuotaExceeded,
  },
  {
    code: "InvalidParameter",
    includes: "might be considered faulted",
    error: LinkedStorageAccountFaulted,
  },
  {
    includes: "Unauthorized to access Geneva Metrics account",
    error: MetricsContainerNotReady,
  },
  {
    includes: "The custom location was not found",
    error: CustomLocationNotFound,
  },
  {
    includes: "Site already present on the same scope",
    error: EdgeSiteScopeTaken,
  },
  {
    includes: "Validation failed: Context /subscriptions/",
    error: EdgeContextAlreadyExists,
  },
  {
    includes: "are missing in context resource",
    error: EdgeContextCapabilityMissing,
  },
  {
    includes: "Operations on Agent Space are not allowed for tenant",
    error: AgentSpaceNotAllowed,
  },
  {
    includes: "Free Trial and Student account is forbidden for Azure Frontdoor",
    error: FrontDoorFreeTrialForbidden,
  },
  {
    includes: "The number of profiles created exceeds quota",
    error: FrontDoorProfileQuotaExceeded,
  },
  {
    includes: "at least one enabled origin is created under the origin group",
    error: AfdOriginGroupNotReady,
  },
  {
    includes: "Cannot disable or delete the last origin when the origin group",
    error: AfdLastOriginInUse,
  },
  {
    includes: "Artifact Signing is not available for free, trial or sponsored",
    error: CodeSigningSubscriptionNotSupported,
  },
  {
    includes: "SaaS Purchase Payment Check Failed",
    error: MarketplacePurchaseNotEligible,
  },
  {
    includes: "Cannot complete signup. Reason: Email already exists",
    error: ConfluentEmailAlreadyExists,
  },
  {
    includes: "Both UPN and Email claims are missing in the ARM signed token",
    error: ConfluentUserTokenRequired,
  },
  {
    code: "ResourceCreationFailed",
    includes: "ResourceCreationFailed: Bad Request",
    error: DatadogMonitorCreationFailed,
  },
  {
    includes: "is not supported in this group",
    error: MigrateAssessmentTypeNotSupported,
  },
  {
    includes: "VCenter name '",
    error: MigrateVcenterNotFound,
  },
  {
    includes: "Run as account Id '",
    error: MigrateRunAsAccountInvalid,
  },
  {
    includes: "The Gateway is a transitioning state",
    error: HybridComputeGatewayTransitioning,
  },
  {
    includes: "The Hybrid Compute machine is not connected to Azure",
    error: ArcMachineNotConnected,
  },
  // Microsoft.AzureStackHCI (Arc VM instances): "The custom location '...'
  // does not exist or returned an invalid response."
  {
    code: "InvalidExtendedLocation",
    includes: "does not exist",
    error: CustomLocationNotFound,
  },
  // Microsoft.ScVmm: a missing custom location surfaces as the RP's app
  // lacking "Microsoft.ExtendedLocation/customLocation/read" on its ID.
  {
    includes: "does not have 'Microsoft.ExtendedLocation/customLocation/read'",
    error: CustomLocationNotFound,
  },
  {
    includes: "has an invalid extended location '<null>'",
    error: ScVmmVmInstanceMissing,
  },
  {
    includes: "Arc Machine id is null cannot validate OS Sku",
    error: AzureLocalArcMachineRequired,
  },
  {
    includes: "which is not supported for deployment.Supported SKUs",
    error: AzureLocalArcMachineRequired,
  },
  {
    includes: "PeerAsn is not approved for the subscription",
    error: PeeringPeerAsnNotApproved,
  },
  {
    includes: "Prefix key is invalid",
    error: PeeringServicePrefixKeyInvalid,
  },
  {
    includes: "Prefix validation failed",
    error: PeeringServicePrefixValidationFailed,
  },
  {
    includes: "Provisioning new Azure Cosmos DB for PostgreSQL clusters is no longer supported",
    error: CosmosPostgresProvisioningRetired,
  },
  {
    includes: "does not have cores left to create resource",
    error: HDInsightCoresQuotaExceeded,
  },
  {
    code: "InvalidParameter",
    includes: "is restricted in region",
    error: RedHatOpenShiftVmSkuRestricted,
  },
  {
    includes: "Resource quota of cores exceeded",
    error: RedHatOpenShiftCoresQuotaExceeded,
  },
  {
    includes: "Azure Cache for Redis is retiring",
    error: RedisCacheRetiring,
  },
  {
    includes:
      "The operation was not allowed because the subscription is not in a state to support it",
    error: AutomanageSubscriptionNotSupported,
  },
  {
    includes: "Relationship lifecycle callbacks are not enabled",
    error: RelationshipCallbacksNotEnabled,
  },
  {
    includes: "connection resource with id",
    error: BotConnectionNotFound,
  },
  {
    includes: "ConnectionSettingConverters",
    error: BotConnectionDeleteInProgress,
  },
  {
    includes: "You are not allowed to create a pipeline",
    error: DataTransferPipelineNotAllowed,
  },
  {
    includes: "A connection with ID",
    error: DataTransferConnectionAlreadyExists,
  },
  {
    includes: "Connection has not been approved yet",
    error: DataTransferConnectionNotApproved,
  },
  {
    includes: "IotDpsState: Transitioning",
    error: IotDpsStateTransitioning,
  },
  {
    code: "BadRequest",
    includes: "is in the process of being created",
    error: CosmosAccountBeingCreated,
  },
  {
    includes: "isn't registered with the service",
    error: SiteRecoveryVaultNotRegistered,
  },
  {
    includes: "There are no servers registered to the Azure Site Recovery vault",
    error: SiteRecoveryNoRegisteredServers,
  },
  {
    code: "InvalidParameter",
    includes: "Cluster must have at least one active primary node type",
    error: ServiceFabricPrimaryNodeTypeRequired,
  },
  {
    includes: "as ManagedByTenantId",
    error: LighthouseManagedByTenantNotAllowed,
  },
  {
    includes: "is not valid tenant",
    error: LighthouseManagedByTenantInvalid,
  },
  {
    includes: "contains invalid principal object identifiers",
    error: LighthouseInvalidPrincipal,
  },
  {
    includes: "Could not validate Microsoft Entra ID role",
    error: MongoClusterPrincipalNotFound,
  },
  {
    includes: "does not have SQL IaaS extension installed",
    error: SqlVirtualMachineExtensionMissing,
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
export class AzureParseError extends Schema.TaggedError<AzureParseError>()("AzureParseError", {
  body: Schema.Unknown,
  cause: Schema.Unknown,
}).pipe(Category.withParseError) {}

/** Union of every ARM-code-mapped typed error class. */
export type AzureApiError =
  | AttestationComplianceDataNotFound
  | PowerBITenantNotSignedUp
  | FabricCapacityPrincipalNotFound
  | FabricCapacityQuotaExceeded
  | AutomanageSubscriptionNotSupported
  | LighthouseManagedByTenantNotAllowed
  | LighthouseManagedByTenantInvalid
  | LighthouseInvalidPrincipal
  | RelationshipCallbacksNotEnabled
  | FederatedIdentityCredentialWriteConflict
  | ResourceNotFound
  | ResourceGroupNotFound
  | SubscriptionNotFound
  | AuthorizationFailed
  | SchemaRegistryStorageAccessDenied
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
  | InvalidResourceNamespace
  | QuotaExceeded
  | RequestRateLimitExceeded
  | LocationNotAvailable
  | InvalidScope
  | RoleAssignmentNotFound
  | RoleAssignmentExists
  | PrincipalNotFound
  | RoleDefinitionNotFound
  | RoleDefinitionWithSameNameExists
  | RoleDefinitionHasAssignments
  | ContainerNotFound
  | ManagementGroupNotFound
  | ServiceGroupNameNotFound
  | ShareNotFound
  | FirewallRuleNotExist
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
  | ConnectedCacheCustomerCacheNodesExist
  | NetAppCreationRestricted
  | NetAppVolumeGroupNotReadable
  | SubscriptionFeatureNotRegistered
  | NetworkFeatureNotSupported
  | NvaDefaultConnectionUndeletable
  | ApiManagementServiceNotFound
  | ApiManagementServiceTransitioning
  | ApiManagementEmailTemplateWritesNotAllowed
  | ApiManagementRouteNotSupported
  | AppServicePlanCreateThrottled
  | HostNameVerificationFailed
  | WebAppSlotsNotSupported
  | WebPublicCertificateNotAllowedOnTier
  | WebMethodNotImplemented
  | ServerFarmCreateNotAllowed
  | EventHubApplicationGroupNotSupported
  | EventHubClusterDeleteTooSoon
  | TrafficCollectorOperationInProgress
  | SentinelAnomaliesNotSupported
  | GuestConfigurationMachineInfoUnavailable
  | GuestConfigurationMachineLookupFailed
  | GuestConfigurationAgentServiceFailed
  | SentinelRuleActionsDeprecated
  | SentinelRepositoryAccessDenied
  | DevHubGitHubNotAuthorized
  | AvdServicePrincipalAccessDenied
  | AutomationAccountRegionLimit
  | RedisCacheRetiring
  | AutomationLocationNotAllowed
  | MongoClusterPrincipalNotFound
  | AutomationSourceControlTokenInvalid
  | CognitiveServicesRequestConflict
  | CognitiveServicesEncryptionScopeNotSupported
  | CognitiveServicesPrivateEndpointApprovalForbidden
  | CognitiveServicesOutboundRuleConflictingState
  | RecoveryServicesVaultOperationInProgress
  | BackupProtectionOperationInProgress
  | BackupConfigManagedByVaultApi
  | BackupContainerRegistrationInProgress
  | MachineLearningWorkspaceMissingDependencies
  | MachineLearningHubHasProjects
  | MachineLearningModelNotAvailable
  | MachineLearningOperationInProgress
  | SkuNotAvailable
  | SearchSharedPrivateLinkBusy
  | SynapseGeoBackupNotAllowed
  | AgcIpAccessRulesNotEnabled
  | TasksOperationsNotAllowed
  | DevTestLabsServiceRunnerDeprecated
  | BatchAccountNotEnabledForAutoStorage
  | MetricsContainerNotReady
  | CustomLocationNotFound
  | ScVmmVmInstanceMissing
  | EdgeSiteScopeTaken
  | EdgeContextAlreadyExists
  | EdgeContextCapabilityMissing
  | AgentSpaceNotAllowed
  | FrontDoorFreeTrialForbidden
  | FrontDoorProfileQuotaExceeded
  | AfdOriginGroupNotReady
  | AfdLastOriginInUse
  | CodeSigningSubscriptionNotSupported
  | SenderUsernameLastRemaining
  | MarketplacePurchaseNotEligible
  | ConfluentEmailAlreadyExists
  | ConfluentUserTokenRequired
  | DatadogMonitorCreationFailed
  | DatadogMonitorCreationValidateFailed
  | MigrateAssessmentTypeNotSupported
  | MigrateVcenterNotFound
  | MigrateRunAsAccountInvalid
  | AzureLocalArcMachineRequired
  | PeeringPeerAsnNotApproved
  | PeeringServicePrefixKeyInvalid
  | PeeringServicePrefixValidationFailed
  | CosmosPostgresProvisioningRetired
  | DevBoxTenantNotOnboarded
  | DevCenterNetworkConnectionQuotaExceeded
  | DevCenterNotAuthorizedToGallery
  | HDInsightCoresQuotaExceeded
  | ContainerAppsEnvironmentQuotaExceeded
  | RedHatOpenShiftVmSkuRestricted
  | RedHatOpenShiftCoresQuotaExceeded
  | SqlOperationInProgress
  | DatabricksApplianceBusy
  | SignalRSkuFeatureNotSupported
  | SqlVirtualMachineExtensionMissing
  | SignalRReplicaLinkNotReplicated
  | AmlFilesystemContainerInaccessible
  | SignalRCustomCertificateNotFound
  | HybridNetworkOperationInProgress
  | ConnectedClusterOperationInProgress
  | CustomLocationClusterExtensionNotFound
  | StorageTaskAssignmentOperationInProgress
  | SqlServerKeyNameInvalid
  | SqlMaintenanceWindowInvalid
  | SqlManagedInstanceEntraAdminRequired
  | LinkedStorageAccountFaulted
  | HybridComputeGatewayTransitioning
  | DeviceUpdateOperationInProgress
  | DeviceUpdateInstanceNotTerminal
  | ArcMachineNotConnected
  | BotConnectionNotFound
  | BotConnectionDeleteInProgress
  | DataTransferPipelineNotAllowed
  | DataTransferConnectionAlreadyExists
  | DataTransferConnectionNotApproved
  | IotDpsStateTransitioning
  | CosmosAccountBeingCreated
  | SiteRecoveryVaultNotRegistered
  | SiteRecoveryNoRegisteredServers
  | ServiceFabricPrimaryNodeTypeRequired
  | ManagedHsmPoolUpdating
  | ManagedHsmAlreadyBeingDeleted
  | ManagedHsmArmKeyManagementDisabled
  | HttpResponsePayloadAPISpecValidationFailed;
