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
 * Returned by Microsoft.Search when deleting a shared private link resource
 * that is still provisioning. Azure error code: `BadRequest` (HTTP 400,
 * "...as it is still being provisioned. Try again later.").
 */
export class SearchSharedPrivateLinkBusy extends Schema.TaggedError<SearchSharedPrivateLinkBusy>()(
  "SearchSharedPrivateLinkBusy",
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
 * Returned by Microsoft.CognitiveServices when encryption scopes are not
 * available for the account's kind or region. Azure error code:
 * `BadRequest` with "Encryption scope is not supported" (matched by
 * message).
 */
export class CognitiveServicesEncryptionScopeNotSupported extends Schema.TaggedError<CognitiveServicesEncryptionScopeNotSupported>()(
  "CognitiveServicesEncryptionScopeNotSupported",
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
    AuthorizationPermissionMismatch: SchemaRegistryStorageAccessDenied,

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
    RoleDefinitionDoesNotExist: RoleDefinitionNotFound,
    RoleDefinitionWithSameNameExists: RoleDefinitionWithSameNameExists,
    RoleDefinitionHasAssignments: RoleDefinitionHasAssignments,
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
    ResourceRestriction: NetAppCreationRestricted,
    ServiceNotFound: ApiManagementServiceNotFound,
    ApplicationGroupInvalidSku: EventHubApplicationGroupNotSupported,
    RequestConflict: CognitiveServicesRequestConflict,
    RSVaultUpdateErrorConflictingOperationInProgress:
      RecoveryServicesVaultOperationInProgress,
    BMSUserErrorSoftDeleteUseVaultApi: BackupConfigManagedByVaultApi,
    BMSUserErrorRedundancySettingsUseVaultApi: BackupConfigManagedByVaultApi,
    SkuNotAvailable: SkuNotAvailable,
    TasksOperationsNotAllowed: TasksOperationsNotAllowed,
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
 * Returned by Microsoft.HybridNetwork (Azure Operator Service Manager) when
 * a write arrives while the previous asynchronous operation on the same
 * resource is still running (GET may already report `Succeeded`). Azure
 * returns HTTP 409 `InvalidResourceOperation` with "Another 'PUT'
 * operation ... is active/in-progress" or "... is being provisioned with
 * state" (matched by message); retry until it settles.
 */
export class HybridNetworkOperationInProgress extends Schema.TaggedError<HybridNetworkOperationInProgress>()(
  "HybridNetworkOperationInProgress",
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
 * Returned by Microsoft.Sql when a server key name is not
 * `<vault>_<key>_<version>` (HTTP 400 "An invalid value was given for the
 * server key name", matched by message). Such a key cannot exist.
 */
export class SqlServerKeyNameInvalid extends Schema.TaggedError<SqlServerKeyNameInvalid>()(
  "SqlServerKeyNameInvalid",
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
    includes: "is transitioning at this time",
    error: ApiManagementServiceTransitioning,
  },
  {
    includes: "Anomalies are not supported for workspace",
    error: SentinelAnomaliesNotSupported,
  },
  {
    includes: "Rules Actions API has been deprecated",
    error: SentinelRuleActionsDeprecated,
  },
  {
    includes: "Unauthorized access due to bad credentials",
    error: SentinelRepositoryAccessDenied,
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
    code: "BadRequest",
    includes: "as it is still being provisioned",
    error: SearchSharedPrivateLinkBusy,
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
    includes: "Encryption scope is not supported",
    error: CognitiveServicesEncryptionScopeNotSupported,
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
  // Microsoft.Sql: "Set server security alert policy is already in
  // progress. Use Azure-AsyncOperation request to track your operation".
  {
    includes: "already in progress. Use Azure-AsyncOperation",
    error: SqlOperationInProgress,
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
  // Microsoft.AzureStackHCI (Arc VM instances): "The custom location '...'
  // does not exist or returned an invalid response."
  {
    code: "InvalidExtendedLocation",
    includes: "does not exist",
    error: CustomLocationNotFound,
  },
  {
    includes: "Arc Machine id is null cannot validate OS Sku",
    error: AzureLocalArcMachineRequired,
  },
  {
    includes: "which is not supported for deployment.Supported SKUs",
    error: AzureLocalArcMachineRequired,
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
  | NetAppCreationRestricted
  | SubscriptionFeatureNotRegistered
  | NetworkFeatureNotSupported
  | ApiManagementServiceNotFound
  | ApiManagementServiceTransitioning
  | AppServicePlanCreateThrottled
  | HostNameVerificationFailed
  | WebAppSlotsNotSupported
  | EventHubApplicationGroupNotSupported
  | SentinelAnomaliesNotSupported
  | SentinelRuleActionsDeprecated
  | SentinelRepositoryAccessDenied
  | AvdServicePrincipalAccessDenied
  | AutomationAccountRegionLimit
  | AutomationLocationNotAllowed
  | AutomationSourceControlTokenInvalid
  | CognitiveServicesRequestConflict
  | CognitiveServicesEncryptionScopeNotSupported
  | RecoveryServicesVaultOperationInProgress
  | BackupConfigManagedByVaultApi
  | MachineLearningWorkspaceMissingDependencies
  | MachineLearningHubHasProjects
  | MachineLearningModelNotAvailable
  | SkuNotAvailable
  | SearchSharedPrivateLinkBusy
  | TasksOperationsNotAllowed
  | MetricsContainerNotReady
  | CustomLocationNotFound
  | EdgeSiteScopeTaken
  | EdgeContextAlreadyExists
  | EdgeContextCapabilityMissing
  | AgentSpaceNotAllowed
  | FrontDoorFreeTrialForbidden
  | MigrateAssessmentTypeNotSupported
  | MigrateVcenterNotFound
  | MigrateRunAsAccountInvalid
  | AzureLocalArcMachineRequired
  | SqlOperationInProgress
  | HybridNetworkOperationInProgress
  | SqlServerKeyNameInvalid
  | LinkedStorageAccountFaulted;
