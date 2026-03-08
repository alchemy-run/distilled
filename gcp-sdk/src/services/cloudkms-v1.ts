// ==========================================================================
// Cloud Key Management Service (KMS) API (cloudkms v1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import * as C from "../category";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "cloudkms",
  version: "v1",
  rootUrl: "https://cloudkms.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface AutokeyConfig {
  /** Identifier. Name of the AutokeyConfig resource, e.g. `folders/{FOLDER_NUMBER}/autokeyConfig` or `projects/{PROJECT_NUMBER}/autokeyConfig`. */
  name?: string;
  /** Optional. Name of the key project, e.g. `projects/{PROJECT_ID}` or `projects/{PROJECT_NUMBER}`, where Cloud KMS Autokey will provision a new CryptoKey when a KeyHandle is created. On UpdateAutokeyConfig, the caller will require `cloudkms.cryptoKeys.setIamPolicy` permission on this key project. Once configured, for Cloud KMS Autokey to function properly, this key project must have the Cloud KMS API activated and the Cloud KMS Service Agent for this key project must be granted the `cloudkms.admin` role (or pertinent permissions). A request with an empty key project field will clear the configuration. */
  keyProject?: string;
  /** Output only. The state for the AutokeyConfig. */
  state?:
    | "STATE_UNSPECIFIED"
    | "ACTIVE"
    | "KEY_PROJECT_DELETED"
    | "UNINITIALIZED"
    | (string & {});
  /** Optional. A checksum computed by the server based on the value of other fields. This may be sent on update requests to ensure that the client has an up-to-date value before proceeding. The request will be rejected with an ABORTED error on a mismatched etag. */
  etag?: string;
  /** Optional. KeyProjectResolutionMode for the AutokeyConfig. Valid values are `DEDICATED_KEY_PROJECT`, `RESOURCE_PROJECT`, or `DISABLED`. */
  keyProjectResolutionMode?:
    | "KEY_PROJECT_RESOLUTION_MODE_UNSPECIFIED"
    | "DEDICATED_KEY_PROJECT"
    | "RESOURCE_PROJECT"
    | "DISABLED"
    | (string & {});
}

export const AutokeyConfig: Schema.Schema<AutokeyConfig> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    keyProject: Schema.optional(Schema.String),
    state: Schema.optional(Schema.String),
    etag: Schema.optional(Schema.String),
    keyProjectResolutionMode: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "AutokeyConfig",
}) as any as Schema.Schema<AutokeyConfig>;

export interface ShowEffectiveAutokeyConfigResponse {
  /** Name of the key project configured in the resource project's folder ancestry. */
  keyProject?: string;
}

export const ShowEffectiveAutokeyConfigResponse: Schema.Schema<ShowEffectiveAutokeyConfigResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      keyProject: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ShowEffectiveAutokeyConfigResponse",
  }) as any as Schema.Schema<ShowEffectiveAutokeyConfigResponse>;

export interface Status {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() =>
  Schema.Struct({
    code: Schema.optional(Schema.Number),
    message: Schema.optional(Schema.String),
    details: Schema.optional(
      Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
    ),
  }),
).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface Operation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    done: Schema.optional(Schema.Boolean),
    error: Schema.optional(Status),
    response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  }),
).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface KeyHandle {
  /** Identifier. Name of the KeyHandle resource, e.g. `projects/{PROJECT_ID}/locations/{LOCATION}/keyHandles/{KEY_HANDLE_ID}`. */
  name?: string;
  /** Output only. Name of a CryptoKey that has been provisioned for Customer Managed Encryption Key (CMEK) use in the KeyHandle project and location for the requested resource type. The CryptoKey project will reflect the value configured in the AutokeyConfig on the resource project's ancestor folder at the time of the KeyHandle creation. If more than one ancestor folder has a configured AutokeyConfig, the nearest of these configurations is used. */
  kmsKey?: string;
  /** Required. Indicates the resource type that the resulting CryptoKey is meant to protect, e.g. `{SERVICE}.googleapis.com/{TYPE}`. See documentation for supported resource types. */
  resourceTypeSelector?: string;
}

export const KeyHandle: Schema.Schema<KeyHandle> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    kmsKey: Schema.optional(Schema.String),
    resourceTypeSelector: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "KeyHandle" }) as any as Schema.Schema<KeyHandle>;

export interface ListKeyHandlesResponse {
  /** Resulting KeyHandles. */
  keyHandles?: Array<KeyHandle>;
  /** A token to retrieve next page of results. Pass this value in ListKeyHandlesRequest.page_token to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListKeyHandlesResponse: Schema.Schema<ListKeyHandlesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      keyHandles: Schema.optional(Schema.Array(KeyHandle)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListKeyHandlesResponse",
  }) as any as Schema.Schema<ListKeyHandlesResponse>;

export interface Certificate {
  /** Required. The raw certificate bytes in DER format. */
  rawDer?: string;
  /** Output only. True if the certificate was parsed successfully. */
  parsed?: boolean;
  /** Output only. The issuer distinguished name in RFC 2253 format. Only present if parsed is true. */
  issuer?: string;
  /** Output only. The subject distinguished name in RFC 2253 format. Only present if parsed is true. */
  subject?: string;
  /** Output only. The subject Alternative DNS names. Only present if parsed is true. */
  subjectAlternativeDnsNames?: Array<string>;
  /** Output only. The certificate is not valid before this time. Only present if parsed is true. */
  notBeforeTime?: string;
  /** Output only. The certificate is not valid after this time. Only present if parsed is true. */
  notAfterTime?: string;
  /** Output only. The certificate serial number as a hex string. Only present if parsed is true. */
  serialNumber?: string;
  /** Output only. The SHA-256 certificate fingerprint as a hex string. Only present if parsed is true. */
  sha256Fingerprint?: string;
}

export const Certificate: Schema.Schema<Certificate> = Schema.suspend(() =>
  Schema.Struct({
    rawDer: Schema.optional(Schema.String),
    parsed: Schema.optional(Schema.Boolean),
    issuer: Schema.optional(Schema.String),
    subject: Schema.optional(Schema.String),
    subjectAlternativeDnsNames: Schema.optional(Schema.Array(Schema.String)),
    notBeforeTime: Schema.optional(Schema.String),
    notAfterTime: Schema.optional(Schema.String),
    serialNumber: Schema.optional(Schema.String),
    sha256Fingerprint: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Certificate" }) as any as Schema.Schema<Certificate>;

export interface ServiceResolver {
  /** Required. The resource name of the Service Directory service pointing to an EKM replica, in the format `projects/* /locations/* /namespaces/* /services/*`. */
  serviceDirectoryService?: string;
  /** Optional. The filter applied to the endpoints of the resolved service. If no filter is specified, all endpoints will be considered. An endpoint will be chosen arbitrarily from the filtered list for each request. For endpoint filter syntax and examples, see https://cloud.google.com/service-directory/docs/reference/rpc/google.cloud.servicedirectory.v1#resolveservicerequest. */
  endpointFilter?: string;
  /** Required. The hostname of the EKM replica used at TLS and HTTP layers. */
  hostname?: string;
  /** Required. A list of leaf server certificates used to authenticate HTTPS connections to the EKM replica. Currently, a maximum of 10 Certificate is supported. */
  serverCertificates?: Array<Certificate>;
}

export const ServiceResolver: Schema.Schema<ServiceResolver> = Schema.suspend(
  () =>
    Schema.Struct({
      serviceDirectoryService: Schema.optional(Schema.String),
      endpointFilter: Schema.optional(Schema.String),
      hostname: Schema.optional(Schema.String),
      serverCertificates: Schema.optional(Schema.Array(Certificate)),
    }),
).annotate({
  identifier: "ServiceResolver",
}) as any as Schema.Schema<ServiceResolver>;

export interface EkmConnection {
  /** Output only. The resource name for the EkmConnection in the format `projects/* /locations/* /ekmConnections/*`. */
  name?: string;
  /** Output only. The time at which the EkmConnection was created. */
  createTime?: string;
  /** Optional. A list of ServiceResolvers where the EKM can be reached. There should be one ServiceResolver per EKM replica. Currently, only a single ServiceResolver is supported. */
  serviceResolvers?: Array<ServiceResolver>;
  /** Optional. Etag of the currently stored EkmConnection. */
  etag?: string;
  /** Optional. Describes who can perform control plane operations on the EKM. If unset, this defaults to MANUAL. */
  keyManagementMode?:
    | "KEY_MANAGEMENT_MODE_UNSPECIFIED"
    | "MANUAL"
    | "CLOUD_KMS"
    | (string & {});
  /** Optional. Identifies the EKM Crypto Space that this EkmConnection maps to. Note: This field is required if KeyManagementMode is CLOUD_KMS. */
  cryptoSpacePath?: string;
}

export const EkmConnection: Schema.Schema<EkmConnection> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    createTime: Schema.optional(Schema.String),
    serviceResolvers: Schema.optional(Schema.Array(ServiceResolver)),
    etag: Schema.optional(Schema.String),
    keyManagementMode: Schema.optional(Schema.String),
    cryptoSpacePath: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "EkmConnection",
}) as any as Schema.Schema<EkmConnection>;

export interface ListEkmConnectionsResponse {
  /** The list of EkmConnections. */
  ekmConnections?: Array<EkmConnection>;
  /** A token to retrieve next page of results. Pass this value in ListEkmConnectionsRequest.page_token to retrieve the next page of results. */
  nextPageToken?: string;
  /** The total number of EkmConnections that matched the query. This field is not populated if ListEkmConnectionsRequest.filter is applied. */
  totalSize?: number;
}

export const ListEkmConnectionsResponse: Schema.Schema<ListEkmConnectionsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      ekmConnections: Schema.optional(Schema.Array(EkmConnection)),
      nextPageToken: Schema.optional(Schema.String),
      totalSize: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "ListEkmConnectionsResponse",
  }) as any as Schema.Schema<ListEkmConnectionsResponse>;

export interface EkmConfig {
  /** Output only. The resource name for the EkmConfig in the format `projects/* /locations/* /ekmConfig`. */
  name?: string;
  /** Optional. Resource name of the default EkmConnection. Setting this field to the empty string removes the default. */
  defaultEkmConnection?: string;
}

export const EkmConfig: Schema.Schema<EkmConfig> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    defaultEkmConnection: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "EkmConfig" }) as any as Schema.Schema<EkmConfig>;

export interface VerifyConnectivityResponse {}

export const VerifyConnectivityResponse: Schema.Schema<VerifyConnectivityResponse> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "VerifyConnectivityResponse",
  }) as any as Schema.Schema<VerifyConnectivityResponse>;

export interface QuorumAuth {
  /** Required. The total number of approvers. This is the N value used for M of N quorum auth. Must be greater than or equal to 3 and less than or equal to 16. */
  totalApproverCount?: number;
  /** Output only. The required numbers of approvers. The M value used for M of N quorum auth. Must be greater than or equal to 2 and less than or equal to total_approver_count - 1. */
  requiredApproverCount?: number;
  /** Output only. The public keys associated with the 2FA keys for M of N quorum auth. */
  twoFactorPublicKeyPems?: Array<string>;
}

export const QuorumAuth: Schema.Schema<QuorumAuth> = Schema.suspend(() =>
  Schema.Struct({
    totalApproverCount: Schema.optional(Schema.Number),
    requiredApproverCount: Schema.optional(Schema.Number),
    twoFactorPublicKeyPems: Schema.optional(Schema.Array(Schema.String)),
  }),
).annotate({ identifier: "QuorumAuth" }) as any as Schema.Schema<QuorumAuth>;

export interface SingleTenantHsmInstance {
  /** Identifier. The resource name for this SingleTenantHsmInstance in the format `projects/* /locations/* /singleTenantHsmInstances/*`. */
  name?: string;
  /** Output only. The time at which the SingleTenantHsmInstance was created. */
  createTime?: string;
  /** Output only. The state of the SingleTenantHsmInstance. */
  state?:
    | "STATE_UNSPECIFIED"
    | "CREATING"
    | "PENDING_TWO_FACTOR_AUTH_REGISTRATION"
    | "ACTIVE"
    | "DISABLING"
    | "DISABLED"
    | "DELETING"
    | "DELETED"
    | "FAILED"
    | (string & {});
  /** Required. The quorum auth configuration for the SingleTenantHsmInstance. */
  quorumAuth?: QuorumAuth;
  /** Output only. The time at which the SingleTenantHsmInstance was deleted. */
  deleteTime?: string;
  /** Output only. The system-defined duration that an instance can remain unrefreshed until it is automatically disabled. This will have a value of 120 days. */
  unrefreshedDurationUntilDisable?: string;
  /** Output only. The time at which the instance will be automatically disabled if not refreshed. This field is updated upon creation and after each successful refresh operation and enable. A RefreshSingleTenantHsmInstance operation must be made via a SingleTenantHsmInstanceProposal before this time otherwise the SingleTenantHsmInstance will become disabled. */
  disableTime?: string;
}

export const SingleTenantHsmInstance: Schema.Schema<SingleTenantHsmInstance> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      quorumAuth: Schema.optional(QuorumAuth),
      deleteTime: Schema.optional(Schema.String),
      unrefreshedDurationUntilDisable: Schema.optional(Schema.String),
      disableTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SingleTenantHsmInstance",
  }) as any as Schema.Schema<SingleTenantHsmInstance>;

export interface ListSingleTenantHsmInstancesResponse {
  /** The list of SingleTenantHsmInstances. */
  singleTenantHsmInstances?: Array<SingleTenantHsmInstance>;
  /** A token to retrieve next page of results. Pass this value in ListSingleTenantHsmInstancesRequest.page_token to retrieve the next page of results. */
  nextPageToken?: string;
  /** The total number of SingleTenantHsmInstances that matched the query. This field is not populated if ListSingleTenantHsmInstancesRequest.filter is applied. */
  totalSize?: number;
}

export const ListSingleTenantHsmInstancesResponse: Schema.Schema<ListSingleTenantHsmInstancesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      singleTenantHsmInstances: Schema.optional(
        Schema.Array(SingleTenantHsmInstance),
      ),
      nextPageToken: Schema.optional(Schema.String),
      totalSize: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "ListSingleTenantHsmInstancesResponse",
  }) as any as Schema.Schema<ListSingleTenantHsmInstancesResponse>;

export interface Challenge {
  /** Output only. The challenge to be signed by the 2FA key indicated by the public key. */
  challenge?: string;
  /** Output only. The public key associated with the 2FA key that should sign the challenge. */
  publicKeyPem?: string;
}

export const Challenge: Schema.Schema<Challenge> = Schema.suspend(() =>
  Schema.Struct({
    challenge: Schema.optional(Schema.String),
    publicKeyPem: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Challenge" }) as any as Schema.Schema<Challenge>;

export interface QuorumParameters {
  /** Output only. The required numbers of approvers. This is the M value used for M of N quorum auth. It is less than the number of public keys. */
  requiredApproverCount?: number;
  /** Output only. The challenges to be signed by 2FA keys for quorum auth. M of N of these challenges are required to be signed to approve the operation. */
  challenges?: Array<Challenge>;
  /** Output only. The public keys associated with the 2FA keys that have already approved the SingleTenantHsmInstanceProposal by signing the challenge. */
  approvedTwoFactorPublicKeyPems?: Array<string>;
}

export const QuorumParameters: Schema.Schema<QuorumParameters> = Schema.suspend(
  () =>
    Schema.Struct({
      requiredApproverCount: Schema.optional(Schema.Number),
      challenges: Schema.optional(Schema.Array(Challenge)),
      approvedTwoFactorPublicKeyPems: Schema.optional(
        Schema.Array(Schema.String),
      ),
    }),
).annotate({
  identifier: "QuorumParameters",
}) as any as Schema.Schema<QuorumParameters>;

export interface RequiredActionQuorumParameters {
  /** Output only. A list of specific challenges that must be signed. For some operations, this will contain a single challenge. */
  requiredChallenges?: Array<Challenge>;
  /** Output only. The required number of quorum approvers. This is the M value used for M of N quorum auth. It is less than the number of public keys. */
  requiredApproverCount?: number;
  /** Output only. The challenges to be signed by 2FA keys for quorum auth. M of N of these challenges are required to be signed to approve the operation. */
  quorumChallenges?: Array<Challenge>;
  /** Output only. The public keys associated with the 2FA keys that have already approved the SingleTenantHsmInstanceProposal by signing the challenge. */
  approvedTwoFactorPublicKeyPems?: Array<string>;
}

export const RequiredActionQuorumParameters: Schema.Schema<RequiredActionQuorumParameters> =
  Schema.suspend(() =>
    Schema.Struct({
      requiredChallenges: Schema.optional(Schema.Array(Challenge)),
      requiredApproverCount: Schema.optional(Schema.Number),
      quorumChallenges: Schema.optional(Schema.Array(Challenge)),
      approvedTwoFactorPublicKeyPems: Schema.optional(
        Schema.Array(Schema.String),
      ),
    }),
  ).annotate({
    identifier: "RequiredActionQuorumParameters",
  }) as any as Schema.Schema<RequiredActionQuorumParameters>;

export interface RegisterTwoFactorAuthKeys {
  /** Required. The required numbers of approvers to set for the SingleTenantHsmInstance. This is the M value used for M of N quorum auth. Must be greater than or equal to 2 and less than or equal to total_approver_count - 1. */
  requiredApproverCount?: number;
  /** Required. The public keys associated with the 2FA keys for M of N quorum auth. Public keys must be associated with RSA 2048 keys. */
  twoFactorPublicKeyPems?: Array<string>;
}

export const RegisterTwoFactorAuthKeys: Schema.Schema<RegisterTwoFactorAuthKeys> =
  Schema.suspend(() =>
    Schema.Struct({
      requiredApproverCount: Schema.optional(Schema.Number),
      twoFactorPublicKeyPems: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "RegisterTwoFactorAuthKeys",
  }) as any as Schema.Schema<RegisterTwoFactorAuthKeys>;

export interface DisableSingleTenantHsmInstance {}

export const DisableSingleTenantHsmInstance: Schema.Schema<DisableSingleTenantHsmInstance> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "DisableSingleTenantHsmInstance",
  }) as any as Schema.Schema<DisableSingleTenantHsmInstance>;

export interface EnableSingleTenantHsmInstance {}

export const EnableSingleTenantHsmInstance: Schema.Schema<EnableSingleTenantHsmInstance> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "EnableSingleTenantHsmInstance",
  }) as any as Schema.Schema<EnableSingleTenantHsmInstance>;

export interface DeleteSingleTenantHsmInstance {}

export const DeleteSingleTenantHsmInstance: Schema.Schema<DeleteSingleTenantHsmInstance> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "DeleteSingleTenantHsmInstance",
  }) as any as Schema.Schema<DeleteSingleTenantHsmInstance>;

export interface AddQuorumMember {
  /** Required. The public key associated with the 2FA key for the new quorum member to add. Public keys must be associated with RSA 2048 keys. */
  twoFactorPublicKeyPem?: string;
}

export const AddQuorumMember: Schema.Schema<AddQuorumMember> = Schema.suspend(
  () =>
    Schema.Struct({
      twoFactorPublicKeyPem: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "AddQuorumMember",
}) as any as Schema.Schema<AddQuorumMember>;

export interface RemoveQuorumMember {
  /** Required. The public key associated with the 2FA key for the quorum member to remove. Public keys must be associated with RSA 2048 keys. */
  twoFactorPublicKeyPem?: string;
}

export const RemoveQuorumMember: Schema.Schema<RemoveQuorumMember> =
  Schema.suspend(() =>
    Schema.Struct({
      twoFactorPublicKeyPem: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RemoveQuorumMember",
  }) as any as Schema.Schema<RemoveQuorumMember>;

export interface RefreshSingleTenantHsmInstance {}

export const RefreshSingleTenantHsmInstance: Schema.Schema<RefreshSingleTenantHsmInstance> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "RefreshSingleTenantHsmInstance",
  }) as any as Schema.Schema<RefreshSingleTenantHsmInstance>;

export interface SingleTenantHsmInstanceProposal {
  /** Identifier. The resource name for this SingleTenantHsmInstance in the format `projects/* /locations/* /singleTenantHsmInstances/* /proposals/*`. */
  name?: string;
  /** Output only. The time at which the SingleTenantHsmInstanceProposal was created. */
  createTime?: string;
  /** Output only. The state of the SingleTenantHsmInstanceProposal. */
  state?:
    | "STATE_UNSPECIFIED"
    | "CREATING"
    | "PENDING"
    | "APPROVED"
    | "RUNNING"
    | "SUCCEEDED"
    | "FAILED"
    | "DELETED"
    | (string & {});
  /** Output only. The root cause of the most recent failure. Only present if state is FAILED. */
  failureReason?: string;
  /** Output only. The quorum approval parameters for the SingleTenantHsmInstanceProposal. */
  quorumParameters?: QuorumParameters;
  /** Output only. Parameters for an approval of a SingleTenantHsmInstanceProposal that has both required challenges and a quorum. */
  requiredActionQuorumParameters?: RequiredActionQuorumParameters;
  /** The time at which the SingleTenantHsmInstanceProposal will expire if not approved and executed. */
  expireTime?: string;
  /** Input only. The TTL for the SingleTenantHsmInstanceProposal. Proposals will expire after this duration. */
  ttl?: string;
  /** Output only. The time at which the SingleTenantHsmInstanceProposal was deleted. */
  deleteTime?: string;
  /** Output only. The time at which the soft-deleted SingleTenantHsmInstanceProposal will be permanently purged. This field is only populated when the state is DELETED and will be set a time after expiration of the proposal, i.e. >= expire_time or (create_time + ttl). */
  purgeTime?: string;
  /** Register 2FA keys for the SingleTenantHsmInstance. This operation requires all N Challenges to be signed by 2FA keys. The SingleTenantHsmInstance must be in the PENDING_TWO_FACTOR_AUTH_REGISTRATION state to perform this operation. */
  registerTwoFactorAuthKeys?: RegisterTwoFactorAuthKeys;
  /** Disable the SingleTenantHsmInstance. The SingleTenantHsmInstance must be in the ACTIVE state to perform this operation. */
  disableSingleTenantHsmInstance?: DisableSingleTenantHsmInstance;
  /** Enable the SingleTenantHsmInstance. The SingleTenantHsmInstance must be in the DISABLED state to perform this operation. */
  enableSingleTenantHsmInstance?: EnableSingleTenantHsmInstance;
  /** Delete the SingleTenantHsmInstance. Deleting a SingleTenantHsmInstance will make all CryptoKeys attached to the SingleTenantHsmInstance unusable. The SingleTenantHsmInstance must be in the DISABLED or PENDING_TWO_FACTOR_AUTH_REGISTRATION state to perform this operation. */
  deleteSingleTenantHsmInstance?: DeleteSingleTenantHsmInstance;
  /** Add a quorum member to the SingleTenantHsmInstance. This will increase the total_approver_count by 1. The SingleTenantHsmInstance must be in the ACTIVE state to perform this operation. */
  addQuorumMember?: AddQuorumMember;
  /** Remove a quorum member from the SingleTenantHsmInstance. This will reduce total_approver_count by 1. The SingleTenantHsmInstance must be in the ACTIVE state to perform this operation. */
  removeQuorumMember?: RemoveQuorumMember;
  /** Refreshes the SingleTenantHsmInstance. This operation must be performed periodically to keep the SingleTenantHsmInstance active. This operation must be performed before unrefreshed_duration_until_disable has passed. The SingleTenantHsmInstance must be in the ACTIVE state to perform this operation. */
  refreshSingleTenantHsmInstance?: RefreshSingleTenantHsmInstance;
}

export const SingleTenantHsmInstanceProposal: Schema.Schema<SingleTenantHsmInstanceProposal> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      failureReason: Schema.optional(Schema.String),
      quorumParameters: Schema.optional(QuorumParameters),
      requiredActionQuorumParameters: Schema.optional(
        RequiredActionQuorumParameters,
      ),
      expireTime: Schema.optional(Schema.String),
      ttl: Schema.optional(Schema.String),
      deleteTime: Schema.optional(Schema.String),
      purgeTime: Schema.optional(Schema.String),
      registerTwoFactorAuthKeys: Schema.optional(RegisterTwoFactorAuthKeys),
      disableSingleTenantHsmInstance: Schema.optional(
        DisableSingleTenantHsmInstance,
      ),
      enableSingleTenantHsmInstance: Schema.optional(
        EnableSingleTenantHsmInstance,
      ),
      deleteSingleTenantHsmInstance: Schema.optional(
        DeleteSingleTenantHsmInstance,
      ),
      addQuorumMember: Schema.optional(AddQuorumMember),
      removeQuorumMember: Schema.optional(RemoveQuorumMember),
      refreshSingleTenantHsmInstance: Schema.optional(
        RefreshSingleTenantHsmInstance,
      ),
    }),
  ).annotate({
    identifier: "SingleTenantHsmInstanceProposal",
  }) as any as Schema.Schema<SingleTenantHsmInstanceProposal>;

export interface ChallengeReply {
  /** Required. The signed challenge associated with the 2FA key. The signature must be RSASSA-PKCS1 v1.5 with a SHA256 digest. */
  signedChallenge?: string;
  /** Required. The public key associated with the 2FA key. */
  publicKeyPem?: string;
}

export const ChallengeReply: Schema.Schema<ChallengeReply> = Schema.suspend(
  () =>
    Schema.Struct({
      signedChallenge: Schema.optional(Schema.String),
      publicKeyPem: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "ChallengeReply",
}) as any as Schema.Schema<ChallengeReply>;

export interface QuorumReply {
  /** Required. The challenge replies to approve the proposal. Challenge replies can be sent across multiple requests. The proposal will be approved when required_approver_count challenge replies are provided. */
  challengeReplies?: Array<ChallengeReply>;
}

export const QuorumReply: Schema.Schema<QuorumReply> = Schema.suspend(() =>
  Schema.Struct({
    challengeReplies: Schema.optional(Schema.Array(ChallengeReply)),
  }),
).annotate({ identifier: "QuorumReply" }) as any as Schema.Schema<QuorumReply>;

export interface RequiredActionQuorumReply {
  /** Required. All required challenges must be signed for the proposal to be approved. These can be sent across multiple requests. */
  requiredChallengeReplies?: Array<ChallengeReply>;
  /** Required. Quorum members' signed challenge replies. These can be provided across multiple requests. The proposal will be approved when required_approver_count quorum_challenge_replies are provided and when all required_challenge_replies are provided. */
  quorumChallengeReplies?: Array<ChallengeReply>;
}

export const RequiredActionQuorumReply: Schema.Schema<RequiredActionQuorumReply> =
  Schema.suspend(() =>
    Schema.Struct({
      requiredChallengeReplies: Schema.optional(Schema.Array(ChallengeReply)),
      quorumChallengeReplies: Schema.optional(Schema.Array(ChallengeReply)),
    }),
  ).annotate({
    identifier: "RequiredActionQuorumReply",
  }) as any as Schema.Schema<RequiredActionQuorumReply>;

export interface ApproveSingleTenantHsmInstanceProposalRequest {
  /** Required. The reply to QuorumParameters for approving the proposal. */
  quorumReply?: QuorumReply;
  /** Required. The reply to RequiredActionQuorumParameters for approving the proposal. */
  requiredActionQuorumReply?: RequiredActionQuorumReply;
}

export const ApproveSingleTenantHsmInstanceProposalRequest: Schema.Schema<ApproveSingleTenantHsmInstanceProposalRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      quorumReply: Schema.optional(QuorumReply),
      requiredActionQuorumReply: Schema.optional(RequiredActionQuorumReply),
    }),
  ).annotate({
    identifier: "ApproveSingleTenantHsmInstanceProposalRequest",
  }) as any as Schema.Schema<ApproveSingleTenantHsmInstanceProposalRequest>;

export interface ApproveSingleTenantHsmInstanceProposalResponse {}

export const ApproveSingleTenantHsmInstanceProposalResponse: Schema.Schema<ApproveSingleTenantHsmInstanceProposalResponse> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "ApproveSingleTenantHsmInstanceProposalResponse",
  }) as any as Schema.Schema<ApproveSingleTenantHsmInstanceProposalResponse>;

export interface ExecuteSingleTenantHsmInstanceProposalRequest {}

export const ExecuteSingleTenantHsmInstanceProposalRequest: Schema.Schema<ExecuteSingleTenantHsmInstanceProposalRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "ExecuteSingleTenantHsmInstanceProposalRequest",
  }) as any as Schema.Schema<ExecuteSingleTenantHsmInstanceProposalRequest>;

export interface ListSingleTenantHsmInstanceProposalsResponse {
  /** The list of SingleTenantHsmInstanceProposals. */
  singleTenantHsmInstanceProposals?: Array<SingleTenantHsmInstanceProposal>;
  /** A token to retrieve next page of results. Pass this value in ListSingleTenantHsmInstanceProposalsRequest.page_token to retrieve the next page of results. */
  nextPageToken?: string;
  /** The total number of SingleTenantHsmInstanceProposals that matched the query. This field is not populated if ListSingleTenantHsmInstanceProposalsRequest.filter is applied. */
  totalSize?: number;
}

export const ListSingleTenantHsmInstanceProposalsResponse: Schema.Schema<ListSingleTenantHsmInstanceProposalsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      singleTenantHsmInstanceProposals: Schema.optional(
        Schema.Array(SingleTenantHsmInstanceProposal),
      ),
      nextPageToken: Schema.optional(Schema.String),
      totalSize: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "ListSingleTenantHsmInstanceProposalsResponse",
  }) as any as Schema.Schema<ListSingleTenantHsmInstanceProposalsResponse>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() =>
  Schema.Struct({}),
).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface KeyAccessJustificationsPolicy {
  /** The list of allowed reasons for access to a CryptoKey. Zero allowed access reasons means all encrypt, decrypt, and sign operations for the CryptoKey associated with this policy will fail. */
  allowedAccessReasons?: Array<
    | "REASON_UNSPECIFIED"
    | "CUSTOMER_INITIATED_SUPPORT"
    | "GOOGLE_INITIATED_SERVICE"
    | "THIRD_PARTY_DATA_REQUEST"
    | "GOOGLE_INITIATED_REVIEW"
    | "CUSTOMER_INITIATED_ACCESS"
    | "GOOGLE_INITIATED_SYSTEM_OPERATION"
    | "REASON_NOT_EXPECTED"
    | "MODIFIED_CUSTOMER_INITIATED_ACCESS"
    | "MODIFIED_GOOGLE_INITIATED_SYSTEM_OPERATION"
    | "GOOGLE_RESPONSE_TO_PRODUCTION_ALERT"
    | "CUSTOMER_AUTHORIZED_WORKFLOW_SERVICING"
    | (string & {})
  >;
}

export const KeyAccessJustificationsPolicy: Schema.Schema<KeyAccessJustificationsPolicy> =
  Schema.suspend(() =>
    Schema.Struct({
      allowedAccessReasons: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "KeyAccessJustificationsPolicy",
  }) as any as Schema.Schema<KeyAccessJustificationsPolicy>;

export interface KeyAccessJustificationsPolicyConfig {
  /** Identifier. The resource name for this KeyAccessJustificationsPolicyConfig in the format of "{organizations|folders|projects}/* /kajPolicyConfig". */
  name?: string;
  /** Optional. The default key access justification policy used when a CryptoKey is created in this folder. This is only used when a Key Access Justifications policy is not provided in the CreateCryptoKeyRequest. This overrides any default policies in its ancestry. */
  defaultKeyAccessJustificationPolicy?: KeyAccessJustificationsPolicy;
}

export const KeyAccessJustificationsPolicyConfig: Schema.Schema<KeyAccessJustificationsPolicyConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      defaultKeyAccessJustificationPolicy: Schema.optional(
        KeyAccessJustificationsPolicy,
      ),
    }),
  ).annotate({
    identifier: "KeyAccessJustificationsPolicyConfig",
  }) as any as Schema.Schema<KeyAccessJustificationsPolicyConfig>;

export interface ShowEffectiveKeyAccessJustificationsPolicyConfigResponse {
  /** The effective KeyAccessJustificationsPolicyConfig. */
  effectiveKajPolicy?: KeyAccessJustificationsPolicyConfig;
}

export const ShowEffectiveKeyAccessJustificationsPolicyConfigResponse: Schema.Schema<ShowEffectiveKeyAccessJustificationsPolicyConfigResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      effectiveKajPolicy: Schema.optional(KeyAccessJustificationsPolicyConfig),
    }),
  ).annotate({
    identifier: "ShowEffectiveKeyAccessJustificationsPolicyConfigResponse",
  }) as any as Schema.Schema<ShowEffectiveKeyAccessJustificationsPolicyConfigResponse>;

export interface KeyAccessJustificationsEnrollmentConfig {
  /** Whether the project has KAJ logging enabled. */
  auditLogging?: boolean;
  /** Whether the project is enrolled in KAJ policy enforcement. */
  policyEnforcement?: boolean;
}

export const KeyAccessJustificationsEnrollmentConfig: Schema.Schema<KeyAccessJustificationsEnrollmentConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      auditLogging: Schema.optional(Schema.Boolean),
      policyEnforcement: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "KeyAccessJustificationsEnrollmentConfig",
  }) as any as Schema.Schema<KeyAccessJustificationsEnrollmentConfig>;

export interface ShowEffectiveKeyAccessJustificationsEnrollmentConfigResponse {
  /** The effective KeyAccessJustificationsEnrollmentConfig for hardware keys. */
  hardwareConfig?: KeyAccessJustificationsEnrollmentConfig;
  /** The effective KeyAccessJustificationsEnrollmentConfig for software keys. */
  softwareConfig?: KeyAccessJustificationsEnrollmentConfig;
  /** The effective KeyAccessJustificationsEnrollmentConfig for external keys. */
  externalConfig?: KeyAccessJustificationsEnrollmentConfig;
}

export const ShowEffectiveKeyAccessJustificationsEnrollmentConfigResponse: Schema.Schema<ShowEffectiveKeyAccessJustificationsEnrollmentConfigResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      hardwareConfig: Schema.optional(KeyAccessJustificationsEnrollmentConfig),
      softwareConfig: Schema.optional(KeyAccessJustificationsEnrollmentConfig),
      externalConfig: Schema.optional(KeyAccessJustificationsEnrollmentConfig),
    }),
  ).annotate({
    identifier: "ShowEffectiveKeyAccessJustificationsEnrollmentConfigResponse",
  }) as any as Schema.Schema<ShowEffectiveKeyAccessJustificationsEnrollmentConfigResponse>;

export interface KeyRing {
  /** Output only. The resource name for the KeyRing in the format `projects/* /locations/* /keyRings/*`. */
  name?: string;
  /** Output only. The time at which this KeyRing was created. */
  createTime?: string;
}

export const KeyRing: Schema.Schema<KeyRing> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    createTime: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "KeyRing" }) as any as Schema.Schema<KeyRing>;

export interface ListKeyRingsResponse {
  /** The list of KeyRings. */
  keyRings?: Array<KeyRing>;
  /** A token to retrieve next page of results. Pass this value in ListKeyRingsRequest.page_token to retrieve the next page of results. */
  nextPageToken?: string;
  /** The total number of KeyRings that matched the query. This field is not populated if ListKeyRingsRequest.filter is applied. */
  totalSize?: number;
}

export const ListKeyRingsResponse: Schema.Schema<ListKeyRingsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      keyRings: Schema.optional(Schema.Array(KeyRing)),
      nextPageToken: Schema.optional(Schema.String),
      totalSize: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "ListKeyRingsResponse",
  }) as any as Schema.Schema<ListKeyRingsResponse>;

export interface CertificateChains {
  /** Cavium certificate chain corresponding to the attestation. */
  caviumCerts?: Array<string>;
  /** Google card certificate chain corresponding to the attestation. */
  googleCardCerts?: Array<string>;
  /** Google partition certificate chain corresponding to the attestation. */
  googlePartitionCerts?: Array<string>;
}

export const CertificateChains: Schema.Schema<CertificateChains> =
  Schema.suspend(() =>
    Schema.Struct({
      caviumCerts: Schema.optional(Schema.Array(Schema.String)),
      googleCardCerts: Schema.optional(Schema.Array(Schema.String)),
      googlePartitionCerts: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "CertificateChains",
  }) as any as Schema.Schema<CertificateChains>;

export interface KeyOperationAttestation {
  /** Output only. The format of the attestation data. */
  format?:
    | "ATTESTATION_FORMAT_UNSPECIFIED"
    | "CAVIUM_V1_COMPRESSED"
    | "CAVIUM_V2_COMPRESSED"
    | (string & {});
  /** Output only. The attestation data provided by the HSM when the key operation was performed. */
  content?: string;
  /** Output only. The certificate chains needed to validate the attestation */
  certChains?: CertificateChains;
}

export const KeyOperationAttestation: Schema.Schema<KeyOperationAttestation> =
  Schema.suspend(() =>
    Schema.Struct({
      format: Schema.optional(Schema.String),
      content: Schema.optional(Schema.String),
      certChains: Schema.optional(CertificateChains),
    }),
  ).annotate({
    identifier: "KeyOperationAttestation",
  }) as any as Schema.Schema<KeyOperationAttestation>;

export interface ExternalProtectionLevelOptions {
  /** The URI for an external resource that this CryptoKeyVersion represents. */
  externalKeyUri?: string;
  /** The path to the external key material on the EKM when using EkmConnection e.g., "v0/my/key". Set this field instead of external_key_uri when using an EkmConnection. */
  ekmConnectionKeyPath?: string;
}

export const ExternalProtectionLevelOptions: Schema.Schema<ExternalProtectionLevelOptions> =
  Schema.suspend(() =>
    Schema.Struct({
      externalKeyUri: Schema.optional(Schema.String),
      ekmConnectionKeyPath: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ExternalProtectionLevelOptions",
  }) as any as Schema.Schema<ExternalProtectionLevelOptions>;

export interface CryptoKeyVersion {
  /** Output only. The resource name for this CryptoKeyVersion in the format `projects/* /locations/* /keyRings/* /cryptoKeys/* /cryptoKeyVersions/*`. */
  name?: string;
  /** The current state of the CryptoKeyVersion. */
  state?:
    | "CRYPTO_KEY_VERSION_STATE_UNSPECIFIED"
    | "PENDING_GENERATION"
    | "ENABLED"
    | "DISABLED"
    | "DESTROYED"
    | "DESTROY_SCHEDULED"
    | "PENDING_IMPORT"
    | "IMPORT_FAILED"
    | "GENERATION_FAILED"
    | "PENDING_EXTERNAL_DESTRUCTION"
    | "EXTERNAL_DESTRUCTION_FAILED"
    | (string & {});
  /** Output only. The ProtectionLevel describing how crypto operations are performed with this CryptoKeyVersion. */
  protectionLevel?:
    | "PROTECTION_LEVEL_UNSPECIFIED"
    | "SOFTWARE"
    | "HSM"
    | "EXTERNAL"
    | "EXTERNAL_VPC"
    | "HSM_SINGLE_TENANT"
    | (string & {});
  /** Output only. The CryptoKeyVersionAlgorithm that this CryptoKeyVersion supports. */
  algorithm?:
    | "CRYPTO_KEY_VERSION_ALGORITHM_UNSPECIFIED"
    | "GOOGLE_SYMMETRIC_ENCRYPTION"
    | "AES_128_GCM"
    | "AES_256_GCM"
    | "AES_128_CBC"
    | "AES_256_CBC"
    | "AES_128_CTR"
    | "AES_256_CTR"
    | "RSA_SIGN_PSS_2048_SHA256"
    | "RSA_SIGN_PSS_3072_SHA256"
    | "RSA_SIGN_PSS_4096_SHA256"
    | "RSA_SIGN_PSS_4096_SHA512"
    | "RSA_SIGN_PKCS1_2048_SHA256"
    | "RSA_SIGN_PKCS1_3072_SHA256"
    | "RSA_SIGN_PKCS1_4096_SHA256"
    | "RSA_SIGN_PKCS1_4096_SHA512"
    | "RSA_SIGN_RAW_PKCS1_2048"
    | "RSA_SIGN_RAW_PKCS1_3072"
    | "RSA_SIGN_RAW_PKCS1_4096"
    | "RSA_DECRYPT_OAEP_2048_SHA256"
    | "RSA_DECRYPT_OAEP_3072_SHA256"
    | "RSA_DECRYPT_OAEP_4096_SHA256"
    | "RSA_DECRYPT_OAEP_4096_SHA512"
    | "RSA_DECRYPT_OAEP_2048_SHA1"
    | "RSA_DECRYPT_OAEP_3072_SHA1"
    | "RSA_DECRYPT_OAEP_4096_SHA1"
    | "EC_SIGN_P256_SHA256"
    | "EC_SIGN_P384_SHA384"
    | "EC_SIGN_SECP256K1_SHA256"
    | "EC_SIGN_ED25519"
    | "HMAC_SHA256"
    | "HMAC_SHA1"
    | "HMAC_SHA384"
    | "HMAC_SHA512"
    | "HMAC_SHA224"
    | "EXTERNAL_SYMMETRIC_ENCRYPTION"
    | "ML_KEM_768"
    | "ML_KEM_1024"
    | "KEM_XWING"
    | "PQ_SIGN_ML_DSA_44"
    | "PQ_SIGN_ML_DSA_65"
    | "PQ_SIGN_ML_DSA_87"
    | "PQ_SIGN_SLH_DSA_SHA2_128S"
    | "PQ_SIGN_HASH_SLH_DSA_SHA2_128S_SHA256"
    | "PQ_SIGN_ML_DSA_44_EXTERNAL_MU"
    | "PQ_SIGN_ML_DSA_65_EXTERNAL_MU"
    | "PQ_SIGN_ML_DSA_87_EXTERNAL_MU"
    | (string & {});
  /** Output only. Statement that was generated and signed by the HSM at key creation time. Use this statement to verify attributes of the key as stored on the HSM, independently of Google. Only provided for key versions with protection_level HSM. */
  attestation?: KeyOperationAttestation;
  /** Output only. The time at which this CryptoKeyVersion was created. */
  createTime?: string;
  /** Output only. The time this CryptoKeyVersion's key material was generated. */
  generateTime?: string;
  /** Output only. The time this CryptoKeyVersion's key material is scheduled for destruction. Only present if state is DESTROY_SCHEDULED. */
  destroyTime?: string;
  /** Output only. The time this CryptoKeyVersion's key material was destroyed. Only present if state is DESTROYED. */
  destroyEventTime?: string;
  /** Output only. The name of the ImportJob used in the most recent import of this CryptoKeyVersion. Only present if the underlying key material was imported. */
  importJob?: string;
  /** Output only. The time at which this CryptoKeyVersion's key material was most recently imported. */
  importTime?: string;
  /** Output only. The root cause of the most recent import failure. Only present if state is IMPORT_FAILED. */
  importFailureReason?: string;
  /** Output only. The root cause of the most recent generation failure. Only present if state is GENERATION_FAILED. */
  generationFailureReason?: string;
  /** Output only. The root cause of the most recent external destruction failure. Only present if state is EXTERNAL_DESTRUCTION_FAILED. */
  externalDestructionFailureReason?: string;
  /** ExternalProtectionLevelOptions stores a group of additional fields for configuring a CryptoKeyVersion that are specific to the EXTERNAL protection level and EXTERNAL_VPC protection levels. */
  externalProtectionLevelOptions?: ExternalProtectionLevelOptions;
  /** Output only. Whether or not this key version is eligible for reimport, by being specified as a target in ImportCryptoKeyVersionRequest.crypto_key_version. */
  reimportEligible?: boolean;
}

export const CryptoKeyVersion: Schema.Schema<CryptoKeyVersion> = Schema.suspend(
  () =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      protectionLevel: Schema.optional(Schema.String),
      algorithm: Schema.optional(Schema.String),
      attestation: Schema.optional(KeyOperationAttestation),
      createTime: Schema.optional(Schema.String),
      generateTime: Schema.optional(Schema.String),
      destroyTime: Schema.optional(Schema.String),
      destroyEventTime: Schema.optional(Schema.String),
      importJob: Schema.optional(Schema.String),
      importTime: Schema.optional(Schema.String),
      importFailureReason: Schema.optional(Schema.String),
      generationFailureReason: Schema.optional(Schema.String),
      externalDestructionFailureReason: Schema.optional(Schema.String),
      externalProtectionLevelOptions: Schema.optional(
        ExternalProtectionLevelOptions,
      ),
      reimportEligible: Schema.optional(Schema.Boolean),
    }),
).annotate({
  identifier: "CryptoKeyVersion",
}) as any as Schema.Schema<CryptoKeyVersion>;

export interface CryptoKeyVersionTemplate {
  /** ProtectionLevel to use when creating a CryptoKeyVersion based on this template. Immutable. Defaults to SOFTWARE. */
  protectionLevel?:
    | "PROTECTION_LEVEL_UNSPECIFIED"
    | "SOFTWARE"
    | "HSM"
    | "EXTERNAL"
    | "EXTERNAL_VPC"
    | "HSM_SINGLE_TENANT"
    | (string & {});
  /** Required. Algorithm to use when creating a CryptoKeyVersion based on this template. For backwards compatibility, GOOGLE_SYMMETRIC_ENCRYPTION is implied if both this field is omitted and CryptoKey.purpose is ENCRYPT_DECRYPT. */
  algorithm?:
    | "CRYPTO_KEY_VERSION_ALGORITHM_UNSPECIFIED"
    | "GOOGLE_SYMMETRIC_ENCRYPTION"
    | "AES_128_GCM"
    | "AES_256_GCM"
    | "AES_128_CBC"
    | "AES_256_CBC"
    | "AES_128_CTR"
    | "AES_256_CTR"
    | "RSA_SIGN_PSS_2048_SHA256"
    | "RSA_SIGN_PSS_3072_SHA256"
    | "RSA_SIGN_PSS_4096_SHA256"
    | "RSA_SIGN_PSS_4096_SHA512"
    | "RSA_SIGN_PKCS1_2048_SHA256"
    | "RSA_SIGN_PKCS1_3072_SHA256"
    | "RSA_SIGN_PKCS1_4096_SHA256"
    | "RSA_SIGN_PKCS1_4096_SHA512"
    | "RSA_SIGN_RAW_PKCS1_2048"
    | "RSA_SIGN_RAW_PKCS1_3072"
    | "RSA_SIGN_RAW_PKCS1_4096"
    | "RSA_DECRYPT_OAEP_2048_SHA256"
    | "RSA_DECRYPT_OAEP_3072_SHA256"
    | "RSA_DECRYPT_OAEP_4096_SHA256"
    | "RSA_DECRYPT_OAEP_4096_SHA512"
    | "RSA_DECRYPT_OAEP_2048_SHA1"
    | "RSA_DECRYPT_OAEP_3072_SHA1"
    | "RSA_DECRYPT_OAEP_4096_SHA1"
    | "EC_SIGN_P256_SHA256"
    | "EC_SIGN_P384_SHA384"
    | "EC_SIGN_SECP256K1_SHA256"
    | "EC_SIGN_ED25519"
    | "HMAC_SHA256"
    | "HMAC_SHA1"
    | "HMAC_SHA384"
    | "HMAC_SHA512"
    | "HMAC_SHA224"
    | "EXTERNAL_SYMMETRIC_ENCRYPTION"
    | "ML_KEM_768"
    | "ML_KEM_1024"
    | "KEM_XWING"
    | "PQ_SIGN_ML_DSA_44"
    | "PQ_SIGN_ML_DSA_65"
    | "PQ_SIGN_ML_DSA_87"
    | "PQ_SIGN_SLH_DSA_SHA2_128S"
    | "PQ_SIGN_HASH_SLH_DSA_SHA2_128S_SHA256"
    | "PQ_SIGN_ML_DSA_44_EXTERNAL_MU"
    | "PQ_SIGN_ML_DSA_65_EXTERNAL_MU"
    | "PQ_SIGN_ML_DSA_87_EXTERNAL_MU"
    | (string & {});
}

export const CryptoKeyVersionTemplate: Schema.Schema<CryptoKeyVersionTemplate> =
  Schema.suspend(() =>
    Schema.Struct({
      protectionLevel: Schema.optional(Schema.String),
      algorithm: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CryptoKeyVersionTemplate",
  }) as any as Schema.Schema<CryptoKeyVersionTemplate>;

export interface CryptoKey {
  /** Output only. The resource name for this CryptoKey in the format `projects/* /locations/* /keyRings/* /cryptoKeys/*`. */
  name?: string;
  /** Output only. A copy of the "primary" CryptoKeyVersion that will be used by Encrypt when this CryptoKey is given in EncryptRequest.name. The CryptoKey's primary version can be updated via UpdateCryptoKeyPrimaryVersion. Keys with purpose ENCRYPT_DECRYPT may have a primary. For other keys, this field will be omitted. */
  primary?: CryptoKeyVersion;
  /** Immutable. The immutable purpose of this CryptoKey. */
  purpose?:
    | "CRYPTO_KEY_PURPOSE_UNSPECIFIED"
    | "ENCRYPT_DECRYPT"
    | "ASYMMETRIC_SIGN"
    | "ASYMMETRIC_DECRYPT"
    | "RAW_ENCRYPT_DECRYPT"
    | "MAC"
    | "KEY_ENCAPSULATION"
    | (string & {});
  /** Output only. The time at which this CryptoKey was created. */
  createTime?: string;
  /** At next_rotation_time, the Key Management Service will automatically: 1. Create a new version of this CryptoKey. 2. Mark the new version as primary. Key rotations performed manually via CreateCryptoKeyVersion and UpdateCryptoKeyPrimaryVersion do not affect next_rotation_time. Keys with purpose ENCRYPT_DECRYPT support automatic rotation. For other keys, this field must be omitted. */
  nextRotationTime?: string;
  /** next_rotation_time will be advanced by this period when the service automatically rotates a key. Must be at least 24 hours and at most 876,000 hours. If rotation_period is set, next_rotation_time must also be set. Keys with purpose ENCRYPT_DECRYPT support automatic rotation. For other keys, this field must be omitted. */
  rotationPeriod?: string;
  /** A template describing settings for new CryptoKeyVersion instances. The properties of new CryptoKeyVersion instances created by either CreateCryptoKeyVersion or auto-rotation are controlled by this template. */
  versionTemplate?: CryptoKeyVersionTemplate;
  /** Labels with user-defined metadata. For more information, see [Labeling Keys](https://cloud.google.com/kms/docs/labeling-keys). */
  labels?: Record<string, string>;
  /** Immutable. Whether this key may contain imported versions only. */
  importOnly?: boolean;
  /** Immutable. The period of time that versions of this key spend in the DESTROY_SCHEDULED state before transitioning to DESTROYED. If not specified at creation time, the default duration is 30 days. */
  destroyScheduledDuration?: string;
  /** Immutable. The resource name of the backend environment where the key material for all CryptoKeyVersions associated with this CryptoKey reside and where all related cryptographic operations are performed. Only applicable if CryptoKeyVersions have a ProtectionLevel of EXTERNAL_VPC, with the resource name in the format `projects/* /locations/* /ekmConnections/*`. Only applicable if CryptoKeyVersions have a ProtectionLevel of HSM_SINGLE_TENANT, with the resource name in the format `projects/* /locations/* /singleTenantHsmInstances/*`. Note, this list is non-exhaustive and may apply to additional ProtectionLevels in the future. */
  cryptoKeyBackend?: string;
  /** Optional. The policy used for Key Access Justifications Policy Enforcement. If this field is present and this key is enrolled in Key Access Justifications Policy Enforcement, the policy will be evaluated in encrypt, decrypt, and sign operations, and the operation will fail if rejected by the policy. The policy is defined by specifying zero or more allowed justification codes. https://cloud.google.com/assured-workloads/key-access-justifications/docs/justification-codes By default, this field is absent, and all justification codes are allowed. */
  keyAccessJustificationsPolicy?: KeyAccessJustificationsPolicy;
}

export const CryptoKey: Schema.Schema<CryptoKey> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    primary: Schema.optional(CryptoKeyVersion),
    purpose: Schema.optional(Schema.String),
    createTime: Schema.optional(Schema.String),
    nextRotationTime: Schema.optional(Schema.String),
    rotationPeriod: Schema.optional(Schema.String),
    versionTemplate: Schema.optional(CryptoKeyVersionTemplate),
    labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    importOnly: Schema.optional(Schema.Boolean),
    destroyScheduledDuration: Schema.optional(Schema.String),
    cryptoKeyBackend: Schema.optional(Schema.String),
    keyAccessJustificationsPolicy: Schema.optional(
      KeyAccessJustificationsPolicy,
    ),
  }),
).annotate({ identifier: "CryptoKey" }) as any as Schema.Schema<CryptoKey>;

export interface ListCryptoKeysResponse {
  /** The list of CryptoKeys. */
  cryptoKeys?: Array<CryptoKey>;
  /** A token to retrieve next page of results. Pass this value in ListCryptoKeysRequest.page_token to retrieve the next page of results. */
  nextPageToken?: string;
  /** The total number of CryptoKeys that matched the query. This field is not populated if ListCryptoKeysRequest.filter is applied. */
  totalSize?: number;
}

export const ListCryptoKeysResponse: Schema.Schema<ListCryptoKeysResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      cryptoKeys: Schema.optional(Schema.Array(CryptoKey)),
      nextPageToken: Schema.optional(Schema.String),
      totalSize: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "ListCryptoKeysResponse",
  }) as any as Schema.Schema<ListCryptoKeysResponse>;

export interface ListCryptoKeyVersionsResponse {
  /** The list of CryptoKeyVersions. */
  cryptoKeyVersions?: Array<CryptoKeyVersion>;
  /** A token to retrieve next page of results. Pass this value in ListCryptoKeyVersionsRequest.page_token to retrieve the next page of results. */
  nextPageToken?: string;
  /** The total number of CryptoKeyVersions that matched the query. This field is not populated if ListCryptoKeyVersionsRequest.filter is applied. */
  totalSize?: number;
}

export const ListCryptoKeyVersionsResponse: Schema.Schema<ListCryptoKeyVersionsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      cryptoKeyVersions: Schema.optional(Schema.Array(CryptoKeyVersion)),
      nextPageToken: Schema.optional(Schema.String),
      totalSize: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "ListCryptoKeyVersionsResponse",
  }) as any as Schema.Schema<ListCryptoKeyVersionsResponse>;

export interface WrappingPublicKey {
  /** The public key, encoded in PEM format. For more information, see the [RFC 7468](https://tools.ietf.org/html/rfc7468) sections for [General Considerations](https://tools.ietf.org/html/rfc7468#section-2) and [Textual Encoding of Subject Public Key Info] (https://tools.ietf.org/html/rfc7468#section-13). */
  pem?: string;
}

export const WrappingPublicKey: Schema.Schema<WrappingPublicKey> =
  Schema.suspend(() =>
    Schema.Struct({
      pem: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "WrappingPublicKey",
  }) as any as Schema.Schema<WrappingPublicKey>;

export interface ImportJob {
  /** Output only. The resource name for this ImportJob in the format `projects/* /locations/* /keyRings/* /importJobs/*`. */
  name?: string;
  /** Required. Immutable. The wrapping method to be used for incoming key material. */
  importMethod?:
    | "IMPORT_METHOD_UNSPECIFIED"
    | "RSA_OAEP_3072_SHA1_AES_256"
    | "RSA_OAEP_4096_SHA1_AES_256"
    | "RSA_OAEP_3072_SHA256_AES_256"
    | "RSA_OAEP_4096_SHA256_AES_256"
    | "RSA_OAEP_3072_SHA256"
    | "RSA_OAEP_4096_SHA256"
    | (string & {});
  /** Required. Immutable. The protection level of the ImportJob. This must match the protection_level of the version_template on the CryptoKey you attempt to import into. */
  protectionLevel?:
    | "PROTECTION_LEVEL_UNSPECIFIED"
    | "SOFTWARE"
    | "HSM"
    | "EXTERNAL"
    | "EXTERNAL_VPC"
    | "HSM_SINGLE_TENANT"
    | (string & {});
  /** Output only. The time at which this ImportJob was created. */
  createTime?: string;
  /** Output only. The time this ImportJob's key material was generated. */
  generateTime?: string;
  /** Output only. The time at which this ImportJob is scheduled for expiration and can no longer be used to import key material. */
  expireTime?: string;
  /** Output only. The time this ImportJob expired. Only present if state is EXPIRED. */
  expireEventTime?: string;
  /** Output only. The current state of the ImportJob, indicating if it can be used. */
  state?:
    | "IMPORT_JOB_STATE_UNSPECIFIED"
    | "PENDING_GENERATION"
    | "ACTIVE"
    | "EXPIRED"
    | (string & {});
  /** Output only. The public key with which to wrap key material prior to import. Only returned if state is ACTIVE. */
  publicKey?: WrappingPublicKey;
  /** Output only. Statement that was generated and signed by the key creator (for example, an HSM) at key creation time. Use this statement to verify attributes of the key as stored on the HSM, independently of Google. Only present if the chosen ImportMethod is one with a protection level of HSM. */
  attestation?: KeyOperationAttestation;
  /** Immutable. The resource name of the backend environment where the key material for the wrapping key resides and where all related cryptographic operations are performed. Currently, this field is only populated for keys stored in HSM_SINGLE_TENANT. Note, this list is non-exhaustive and may apply to additional ProtectionLevels in the future. Supported resources: * `"projects/* /locations/* /singleTenantHsmInstances/*"` */
  cryptoKeyBackend?: string;
}

export const ImportJob: Schema.Schema<ImportJob> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    importMethod: Schema.optional(Schema.String),
    protectionLevel: Schema.optional(Schema.String),
    createTime: Schema.optional(Schema.String),
    generateTime: Schema.optional(Schema.String),
    expireTime: Schema.optional(Schema.String),
    expireEventTime: Schema.optional(Schema.String),
    state: Schema.optional(Schema.String),
    publicKey: Schema.optional(WrappingPublicKey),
    attestation: Schema.optional(KeyOperationAttestation),
    cryptoKeyBackend: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "ImportJob" }) as any as Schema.Schema<ImportJob>;

export interface ListImportJobsResponse {
  /** The list of ImportJobs. */
  importJobs?: Array<ImportJob>;
  /** A token to retrieve next page of results. Pass this value in ListImportJobsRequest.page_token to retrieve the next page of results. */
  nextPageToken?: string;
  /** The total number of ImportJobs that matched the query. This field is not populated if ListImportJobsRequest.filter is applied. */
  totalSize?: number;
}

export const ListImportJobsResponse: Schema.Schema<ListImportJobsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      importJobs: Schema.optional(Schema.Array(ImportJob)),
      nextPageToken: Schema.optional(Schema.String),
      totalSize: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "ListImportJobsResponse",
  }) as any as Schema.Schema<ListImportJobsResponse>;

export interface RetiredResource {
  /** Output only. Identifier. The resource name for this RetiredResource in the format `projects/* /locations/* /retiredResources/*`. */
  name?: string;
  /** Output only. The full resource name of the original CryptoKey that was deleted in the format `projects/* /locations/* /keyRings/* /cryptoKeys/*`. */
  originalResource?: string;
  /** Output only. The resource type of the original deleted resource. */
  resourceType?: string;
  /** Output only. The time at which the original resource was deleted and this RetiredResource record was created. */
  deleteTime?: string;
}

export const RetiredResource: Schema.Schema<RetiredResource> = Schema.suspend(
  () =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      originalResource: Schema.optional(Schema.String),
      resourceType: Schema.optional(Schema.String),
      deleteTime: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "RetiredResource",
}) as any as Schema.Schema<RetiredResource>;

export interface ListRetiredResourcesResponse {
  /** The list of RetiredResources. */
  retiredResources?: Array<RetiredResource>;
  /** A token to retrieve the next page of results. Pass this value in ListRetiredResourcesRequest.page_token to retrieve the next page of results. */
  nextPageToken?: string;
  /** The total number of RetiredResources that matched the query. */
  totalSize?: string;
}

export const ListRetiredResourcesResponse: Schema.Schema<ListRetiredResourcesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      retiredResources: Schema.optional(Schema.Array(RetiredResource)),
      nextPageToken: Schema.optional(Schema.String),
      totalSize: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListRetiredResourcesResponse",
  }) as any as Schema.Schema<ListRetiredResourcesResponse>;

export interface ChecksummedData {
  /** Raw Data. */
  data?: string;
  /** Integrity verification field. A CRC32C checksum of the returned ChecksummedData.data. An integrity check of ChecksummedData.data can be performed by computing the CRC32C checksum of ChecksummedData.data and comparing your results to this field. Discard the response in case of non-matching checksum values, and perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed `2^32-1`, and can be safely downconverted to uint32 in languages that support this type. */
  crc32cChecksum?: string;
}

export const ChecksummedData: Schema.Schema<ChecksummedData> = Schema.suspend(
  () =>
    Schema.Struct({
      data: Schema.optional(Schema.String),
      crc32cChecksum: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "ChecksummedData",
}) as any as Schema.Schema<ChecksummedData>;

export interface PublicKey {
  /** The public key, encoded in PEM format. For more information, see the [RFC 7468](https://tools.ietf.org/html/rfc7468) sections for [General Considerations](https://tools.ietf.org/html/rfc7468#section-2) and [Textual Encoding of Subject Public Key Info] (https://tools.ietf.org/html/rfc7468#section-13). */
  pem?: string;
  /** The Algorithm associated with this key. */
  algorithm?:
    | "CRYPTO_KEY_VERSION_ALGORITHM_UNSPECIFIED"
    | "GOOGLE_SYMMETRIC_ENCRYPTION"
    | "AES_128_GCM"
    | "AES_256_GCM"
    | "AES_128_CBC"
    | "AES_256_CBC"
    | "AES_128_CTR"
    | "AES_256_CTR"
    | "RSA_SIGN_PSS_2048_SHA256"
    | "RSA_SIGN_PSS_3072_SHA256"
    | "RSA_SIGN_PSS_4096_SHA256"
    | "RSA_SIGN_PSS_4096_SHA512"
    | "RSA_SIGN_PKCS1_2048_SHA256"
    | "RSA_SIGN_PKCS1_3072_SHA256"
    | "RSA_SIGN_PKCS1_4096_SHA256"
    | "RSA_SIGN_PKCS1_4096_SHA512"
    | "RSA_SIGN_RAW_PKCS1_2048"
    | "RSA_SIGN_RAW_PKCS1_3072"
    | "RSA_SIGN_RAW_PKCS1_4096"
    | "RSA_DECRYPT_OAEP_2048_SHA256"
    | "RSA_DECRYPT_OAEP_3072_SHA256"
    | "RSA_DECRYPT_OAEP_4096_SHA256"
    | "RSA_DECRYPT_OAEP_4096_SHA512"
    | "RSA_DECRYPT_OAEP_2048_SHA1"
    | "RSA_DECRYPT_OAEP_3072_SHA1"
    | "RSA_DECRYPT_OAEP_4096_SHA1"
    | "EC_SIGN_P256_SHA256"
    | "EC_SIGN_P384_SHA384"
    | "EC_SIGN_SECP256K1_SHA256"
    | "EC_SIGN_ED25519"
    | "HMAC_SHA256"
    | "HMAC_SHA1"
    | "HMAC_SHA384"
    | "HMAC_SHA512"
    | "HMAC_SHA224"
    | "EXTERNAL_SYMMETRIC_ENCRYPTION"
    | "ML_KEM_768"
    | "ML_KEM_1024"
    | "KEM_XWING"
    | "PQ_SIGN_ML_DSA_44"
    | "PQ_SIGN_ML_DSA_65"
    | "PQ_SIGN_ML_DSA_87"
    | "PQ_SIGN_SLH_DSA_SHA2_128S"
    | "PQ_SIGN_HASH_SLH_DSA_SHA2_128S_SHA256"
    | "PQ_SIGN_ML_DSA_44_EXTERNAL_MU"
    | "PQ_SIGN_ML_DSA_65_EXTERNAL_MU"
    | "PQ_SIGN_ML_DSA_87_EXTERNAL_MU"
    | (string & {});
  /** Integrity verification field. A CRC32C checksum of the returned PublicKey.pem. An integrity check of PublicKey.pem can be performed by computing the CRC32C checksum of PublicKey.pem and comparing your results to this field. Discard the response in case of non-matching checksum values, and perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed `2^32-1`, and can be safely downconverted to uint32 in languages that support this type. NOTE: This field is in Beta. */
  pemCrc32c?: string;
  /** The name of the CryptoKeyVersion public key. Provided here for verification. NOTE: This field is in Beta. */
  name?: string;
  /** The ProtectionLevel of the CryptoKeyVersion public key. */
  protectionLevel?:
    | "PROTECTION_LEVEL_UNSPECIFIED"
    | "SOFTWARE"
    | "HSM"
    | "EXTERNAL"
    | "EXTERNAL_VPC"
    | "HSM_SINGLE_TENANT"
    | (string & {});
  /** The PublicKey format specified by the customer through the public_key_format field. */
  publicKeyFormat?:
    | "PUBLIC_KEY_FORMAT_UNSPECIFIED"
    | "PEM"
    | "DER"
    | "NIST_PQC"
    | "XWING_RAW_BYTES"
    | (string & {});
  /** This field contains the public key (with integrity verification), formatted according to the public_key_format field. */
  publicKey?: ChecksummedData;
}

export const PublicKey: Schema.Schema<PublicKey> = Schema.suspend(() =>
  Schema.Struct({
    pem: Schema.optional(Schema.String),
    algorithm: Schema.optional(Schema.String),
    pemCrc32c: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    protectionLevel: Schema.optional(Schema.String),
    publicKeyFormat: Schema.optional(Schema.String),
    publicKey: Schema.optional(ChecksummedData),
  }),
).annotate({ identifier: "PublicKey" }) as any as Schema.Schema<PublicKey>;

export interface ImportCryptoKeyVersionRequest {
  /** Optional. The optional name of an existing CryptoKeyVersion to target for an import operation. If this field is not present, a new CryptoKeyVersion containing the supplied key material is created. If this field is present, the supplied key material is imported into the existing CryptoKeyVersion. To import into an existing CryptoKeyVersion, the CryptoKeyVersion must be a child of ImportCryptoKeyVersionRequest.parent, have been previously created via ImportCryptoKeyVersion, and be in DESTROYED or IMPORT_FAILED state. The key material and algorithm must match the previous CryptoKeyVersion exactly if the CryptoKeyVersion has ever contained key material. */
  cryptoKeyVersion?: string;
  /** Required. The algorithm of the key being imported. This does not need to match the version_template of the CryptoKey this version imports into. */
  algorithm?:
    | "CRYPTO_KEY_VERSION_ALGORITHM_UNSPECIFIED"
    | "GOOGLE_SYMMETRIC_ENCRYPTION"
    | "AES_128_GCM"
    | "AES_256_GCM"
    | "AES_128_CBC"
    | "AES_256_CBC"
    | "AES_128_CTR"
    | "AES_256_CTR"
    | "RSA_SIGN_PSS_2048_SHA256"
    | "RSA_SIGN_PSS_3072_SHA256"
    | "RSA_SIGN_PSS_4096_SHA256"
    | "RSA_SIGN_PSS_4096_SHA512"
    | "RSA_SIGN_PKCS1_2048_SHA256"
    | "RSA_SIGN_PKCS1_3072_SHA256"
    | "RSA_SIGN_PKCS1_4096_SHA256"
    | "RSA_SIGN_PKCS1_4096_SHA512"
    | "RSA_SIGN_RAW_PKCS1_2048"
    | "RSA_SIGN_RAW_PKCS1_3072"
    | "RSA_SIGN_RAW_PKCS1_4096"
    | "RSA_DECRYPT_OAEP_2048_SHA256"
    | "RSA_DECRYPT_OAEP_3072_SHA256"
    | "RSA_DECRYPT_OAEP_4096_SHA256"
    | "RSA_DECRYPT_OAEP_4096_SHA512"
    | "RSA_DECRYPT_OAEP_2048_SHA1"
    | "RSA_DECRYPT_OAEP_3072_SHA1"
    | "RSA_DECRYPT_OAEP_4096_SHA1"
    | "EC_SIGN_P256_SHA256"
    | "EC_SIGN_P384_SHA384"
    | "EC_SIGN_SECP256K1_SHA256"
    | "EC_SIGN_ED25519"
    | "HMAC_SHA256"
    | "HMAC_SHA1"
    | "HMAC_SHA384"
    | "HMAC_SHA512"
    | "HMAC_SHA224"
    | "EXTERNAL_SYMMETRIC_ENCRYPTION"
    | "ML_KEM_768"
    | "ML_KEM_1024"
    | "KEM_XWING"
    | "PQ_SIGN_ML_DSA_44"
    | "PQ_SIGN_ML_DSA_65"
    | "PQ_SIGN_ML_DSA_87"
    | "PQ_SIGN_SLH_DSA_SHA2_128S"
    | "PQ_SIGN_HASH_SLH_DSA_SHA2_128S_SHA256"
    | "PQ_SIGN_ML_DSA_44_EXTERNAL_MU"
    | "PQ_SIGN_ML_DSA_65_EXTERNAL_MU"
    | "PQ_SIGN_ML_DSA_87_EXTERNAL_MU"
    | (string & {});
  /** Required. The name of the ImportJob that was used to wrap this key material. */
  importJob?: string;
  /** Optional. The wrapped key material to import. Before wrapping, key material must be formatted. If importing symmetric key material, the expected key material format is plain bytes. If importing asymmetric key material, the expected key material format is PKCS#8-encoded DER (the PrivateKeyInfo structure from RFC 5208). When wrapping with import methods (RSA_OAEP_3072_SHA1_AES_256 or RSA_OAEP_4096_SHA1_AES_256 or RSA_OAEP_3072_SHA256_AES_256 or RSA_OAEP_4096_SHA256_AES_256), this field must contain the concatenation of: 1. An ephemeral AES-256 wrapping key wrapped with the public_key using RSAES-OAEP with SHA-1/SHA-256, MGF1 with SHA-1/SHA-256, and an empty label. 2. The formatted key to be imported, wrapped with the ephemeral AES-256 key using AES-KWP (RFC 5649). This format is the same as the format produced by PKCS#11 mechanism CKM_RSA_AES_KEY_WRAP. When wrapping with import methods (RSA_OAEP_3072_SHA256 or RSA_OAEP_4096_SHA256), this field must contain the formatted key to be imported, wrapped with the public_key using RSAES-OAEP with SHA-256, MGF1 with SHA-256, and an empty label. */
  wrappedKey?: string;
  /** Optional. This field has the same meaning as wrapped_key. Prefer to use that field in new work. Either that field or this field (but not both) must be specified. */
  rsaAesWrappedKey?: string;
}

export const ImportCryptoKeyVersionRequest: Schema.Schema<ImportCryptoKeyVersionRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      cryptoKeyVersion: Schema.optional(Schema.String),
      algorithm: Schema.optional(Schema.String),
      importJob: Schema.optional(Schema.String),
      wrappedKey: Schema.optional(Schema.String),
      rsaAesWrappedKey: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ImportCryptoKeyVersionRequest",
  }) as any as Schema.Schema<ImportCryptoKeyVersionRequest>;

export interface UpdateCryptoKeyPrimaryVersionRequest {
  /** Required. The id of the child CryptoKeyVersion to use as primary. */
  cryptoKeyVersionId?: string;
}

export const UpdateCryptoKeyPrimaryVersionRequest: Schema.Schema<UpdateCryptoKeyPrimaryVersionRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      cryptoKeyVersionId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UpdateCryptoKeyPrimaryVersionRequest",
  }) as any as Schema.Schema<UpdateCryptoKeyPrimaryVersionRequest>;

export interface DestroyCryptoKeyVersionRequest {}

export const DestroyCryptoKeyVersionRequest: Schema.Schema<DestroyCryptoKeyVersionRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "DestroyCryptoKeyVersionRequest",
  }) as any as Schema.Schema<DestroyCryptoKeyVersionRequest>;

export interface RestoreCryptoKeyVersionRequest {}

export const RestoreCryptoKeyVersionRequest: Schema.Schema<RestoreCryptoKeyVersionRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "RestoreCryptoKeyVersionRequest",
  }) as any as Schema.Schema<RestoreCryptoKeyVersionRequest>;

export interface EncryptRequest {
  /** Required. The data to encrypt. Must be no larger than 64KiB. The maximum size depends on the key version's protection_level. For SOFTWARE, EXTERNAL, and EXTERNAL_VPC keys, the plaintext must be no larger than 64KiB. For HSM keys, the combined length of the plaintext and additional_authenticated_data fields must be no larger than 8KiB. */
  plaintext?: string;
  /** Optional. Optional data that, if specified, must also be provided during decryption through DecryptRequest.additional_authenticated_data. The maximum size depends on the key version's protection_level. For SOFTWARE, EXTERNAL, and EXTERNAL_VPC keys the AAD must be no larger than 64KiB. For HSM keys, the combined length of the plaintext and additional_authenticated_data fields must be no larger than 8KiB. */
  additionalAuthenticatedData?: string;
  /** Optional. An optional CRC32C checksum of the EncryptRequest.plaintext. If specified, KeyManagementService will verify the integrity of the received EncryptRequest.plaintext using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(EncryptRequest.plaintext) is equal to EncryptRequest.plaintext_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. */
  plaintextCrc32c?: string;
  /** Optional. An optional CRC32C checksum of the EncryptRequest.additional_authenticated_data. If specified, KeyManagementService will verify the integrity of the received EncryptRequest.additional_authenticated_data using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(EncryptRequest.additional_authenticated_data) is equal to EncryptRequest.additional_authenticated_data_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. */
  additionalAuthenticatedDataCrc32c?: string;
}

export const EncryptRequest: Schema.Schema<EncryptRequest> = Schema.suspend(
  () =>
    Schema.Struct({
      plaintext: Schema.optional(Schema.String),
      additionalAuthenticatedData: Schema.optional(Schema.String),
      plaintextCrc32c: Schema.optional(Schema.String),
      additionalAuthenticatedDataCrc32c: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "EncryptRequest",
}) as any as Schema.Schema<EncryptRequest>;

export interface EncryptResponse {
  /** The resource name of the CryptoKeyVersion used in encryption. Check this field to verify that the intended resource was used for encryption. */
  name?: string;
  /** The encrypted data. */
  ciphertext?: string;
  /** Integrity verification field. A CRC32C checksum of the returned EncryptResponse.ciphertext. An integrity check of EncryptResponse.ciphertext can be performed by computing the CRC32C checksum of EncryptResponse.ciphertext and comparing your results to this field. Discard the response in case of non-matching checksum values, and perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. */
  ciphertextCrc32c?: string;
  /** Integrity verification field. A flag indicating whether EncryptRequest.plaintext_crc32c was received by KeyManagementService and used for the integrity verification of the plaintext. A false value of this field indicates either that EncryptRequest.plaintext_crc32c was left unset or that it was not delivered to KeyManagementService. If you've set EncryptRequest.plaintext_crc32c but this field is still false, discard the response and perform a limited number of retries. */
  verifiedPlaintextCrc32c?: boolean;
  /** Integrity verification field. A flag indicating whether EncryptRequest.additional_authenticated_data_crc32c was received by KeyManagementService and used for the integrity verification of the AAD. A false value of this field indicates either that EncryptRequest.additional_authenticated_data_crc32c was left unset or that it was not delivered to KeyManagementService. If you've set EncryptRequest.additional_authenticated_data_crc32c but this field is still false, discard the response and perform a limited number of retries. */
  verifiedAdditionalAuthenticatedDataCrc32c?: boolean;
  /** The ProtectionLevel of the CryptoKeyVersion used in encryption. */
  protectionLevel?:
    | "PROTECTION_LEVEL_UNSPECIFIED"
    | "SOFTWARE"
    | "HSM"
    | "EXTERNAL"
    | "EXTERNAL_VPC"
    | "HSM_SINGLE_TENANT"
    | (string & {});
}

export const EncryptResponse: Schema.Schema<EncryptResponse> = Schema.suspend(
  () =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      ciphertext: Schema.optional(Schema.String),
      ciphertextCrc32c: Schema.optional(Schema.String),
      verifiedPlaintextCrc32c: Schema.optional(Schema.Boolean),
      verifiedAdditionalAuthenticatedDataCrc32c: Schema.optional(
        Schema.Boolean,
      ),
      protectionLevel: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "EncryptResponse",
}) as any as Schema.Schema<EncryptResponse>;

export interface DecryptRequest {
  /** Required. The encrypted data originally returned in EncryptResponse.ciphertext. */
  ciphertext?: string;
  /** Optional. Optional data that must match the data originally supplied in EncryptRequest.additional_authenticated_data. */
  additionalAuthenticatedData?: string;
  /** Optional. An optional CRC32C checksum of the DecryptRequest.ciphertext. If specified, KeyManagementService will verify the integrity of the received DecryptRequest.ciphertext using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(DecryptRequest.ciphertext) is equal to DecryptRequest.ciphertext_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. */
  ciphertextCrc32c?: string;
  /** Optional. An optional CRC32C checksum of the DecryptRequest.additional_authenticated_data. If specified, KeyManagementService will verify the integrity of the received DecryptRequest.additional_authenticated_data using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(DecryptRequest.additional_authenticated_data) is equal to DecryptRequest.additional_authenticated_data_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. */
  additionalAuthenticatedDataCrc32c?: string;
}

export const DecryptRequest: Schema.Schema<DecryptRequest> = Schema.suspend(
  () =>
    Schema.Struct({
      ciphertext: Schema.optional(Schema.String),
      additionalAuthenticatedData: Schema.optional(Schema.String),
      ciphertextCrc32c: Schema.optional(Schema.String),
      additionalAuthenticatedDataCrc32c: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "DecryptRequest",
}) as any as Schema.Schema<DecryptRequest>;

export interface DecryptResponse {
  /** The decrypted data originally supplied in EncryptRequest.plaintext. */
  plaintext?: string;
  /** Integrity verification field. A CRC32C checksum of the returned DecryptResponse.plaintext. An integrity check of DecryptResponse.plaintext can be performed by computing the CRC32C checksum of DecryptResponse.plaintext and comparing your results to this field. Discard the response in case of non-matching checksum values, and perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: receiving this response message indicates that KeyManagementService is able to successfully decrypt the ciphertext. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. */
  plaintextCrc32c?: string;
  /** Whether the Decryption was performed using the primary key version. */
  usedPrimary?: boolean;
  /** The ProtectionLevel of the CryptoKeyVersion used in decryption. */
  protectionLevel?:
    | "PROTECTION_LEVEL_UNSPECIFIED"
    | "SOFTWARE"
    | "HSM"
    | "EXTERNAL"
    | "EXTERNAL_VPC"
    | "HSM_SINGLE_TENANT"
    | (string & {});
}

export const DecryptResponse: Schema.Schema<DecryptResponse> = Schema.suspend(
  () =>
    Schema.Struct({
      plaintext: Schema.optional(Schema.String),
      plaintextCrc32c: Schema.optional(Schema.String),
      usedPrimary: Schema.optional(Schema.Boolean),
      protectionLevel: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "DecryptResponse",
}) as any as Schema.Schema<DecryptResponse>;

export interface RawEncryptRequest {
  /** Required. The data to encrypt. Must be no larger than 64KiB. The maximum size depends on the key version's protection_level. For SOFTWARE keys, the plaintext must be no larger than 64KiB. For HSM keys, the combined length of the plaintext and additional_authenticated_data fields must be no larger than 8KiB. */
  plaintext?: string;
  /** Optional. Optional data that, if specified, must also be provided during decryption through RawDecryptRequest.additional_authenticated_data. This field may only be used in conjunction with an algorithm that accepts additional authenticated data (for example, AES-GCM). The maximum size depends on the key version's protection_level. For SOFTWARE keys, the plaintext must be no larger than 64KiB. For HSM keys, the combined length of the plaintext and additional_authenticated_data fields must be no larger than 8KiB. */
  additionalAuthenticatedData?: string;
  /** Optional. An optional CRC32C checksum of the RawEncryptRequest.plaintext. If specified, KeyManagementService will verify the integrity of the received plaintext using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(plaintext) is equal to plaintext_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. */
  plaintextCrc32c?: string;
  /** Optional. An optional CRC32C checksum of the RawEncryptRequest.additional_authenticated_data. If specified, KeyManagementService will verify the integrity of the received additional_authenticated_data using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(additional_authenticated_data) is equal to additional_authenticated_data_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. */
  additionalAuthenticatedDataCrc32c?: string;
  /** Optional. A customer-supplied initialization vector that will be used for encryption. If it is not provided for AES-CBC and AES-CTR, one will be generated. It will be returned in RawEncryptResponse.initialization_vector. */
  initializationVector?: string;
  /** Optional. An optional CRC32C checksum of the RawEncryptRequest.initialization_vector. If specified, KeyManagementService will verify the integrity of the received initialization_vector using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(initialization_vector) is equal to initialization_vector_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. */
  initializationVectorCrc32c?: string;
}

export const RawEncryptRequest: Schema.Schema<RawEncryptRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      plaintext: Schema.optional(Schema.String),
      additionalAuthenticatedData: Schema.optional(Schema.String),
      plaintextCrc32c: Schema.optional(Schema.String),
      additionalAuthenticatedDataCrc32c: Schema.optional(Schema.String),
      initializationVector: Schema.optional(Schema.String),
      initializationVectorCrc32c: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RawEncryptRequest",
  }) as any as Schema.Schema<RawEncryptRequest>;

export interface RawEncryptResponse {
  /** The encrypted data. In the case of AES-GCM, the authentication tag is the tag_length bytes at the end of this field. */
  ciphertext?: string;
  /** The initialization vector (IV) generated by the service during encryption. This value must be stored and provided in RawDecryptRequest.initialization_vector at decryption time. */
  initializationVector?: string;
  /** The length of the authentication tag that is appended to the end of the ciphertext. */
  tagLength?: number;
  /** Integrity verification field. A CRC32C checksum of the returned RawEncryptResponse.ciphertext. An integrity check of ciphertext can be performed by computing the CRC32C checksum of ciphertext and comparing your results to this field. Discard the response in case of non-matching checksum values, and perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. */
  ciphertextCrc32c?: string;
  /** Integrity verification field. A CRC32C checksum of the returned RawEncryptResponse.initialization_vector. An integrity check of initialization_vector can be performed by computing the CRC32C checksum of initialization_vector and comparing your results to this field. Discard the response in case of non-matching checksum values, and perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. */
  initializationVectorCrc32c?: string;
  /** Integrity verification field. A flag indicating whether RawEncryptRequest.plaintext_crc32c was received by KeyManagementService and used for the integrity verification of the plaintext. A false value of this field indicates either that RawEncryptRequest.plaintext_crc32c was left unset or that it was not delivered to KeyManagementService. If you've set RawEncryptRequest.plaintext_crc32c but this field is still false, discard the response and perform a limited number of retries. */
  verifiedPlaintextCrc32c?: boolean;
  /** Integrity verification field. A flag indicating whether RawEncryptRequest.additional_authenticated_data_crc32c was received by KeyManagementService and used for the integrity verification of additional_authenticated_data. A false value of this field indicates either that // RawEncryptRequest.additional_authenticated_data_crc32c was left unset or that it was not delivered to KeyManagementService. If you've set RawEncryptRequest.additional_authenticated_data_crc32c but this field is still false, discard the response and perform a limited number of retries. */
  verifiedAdditionalAuthenticatedDataCrc32c?: boolean;
  /** Integrity verification field. A flag indicating whether RawEncryptRequest.initialization_vector_crc32c was received by KeyManagementService and used for the integrity verification of initialization_vector. A false value of this field indicates either that RawEncryptRequest.initialization_vector_crc32c was left unset or that it was not delivered to KeyManagementService. If you've set RawEncryptRequest.initialization_vector_crc32c but this field is still false, discard the response and perform a limited number of retries. */
  verifiedInitializationVectorCrc32c?: boolean;
  /** The resource name of the CryptoKeyVersion used in encryption. Check this field to verify that the intended resource was used for encryption. */
  name?: string;
  /** The ProtectionLevel of the CryptoKeyVersion used in encryption. */
  protectionLevel?:
    | "PROTECTION_LEVEL_UNSPECIFIED"
    | "SOFTWARE"
    | "HSM"
    | "EXTERNAL"
    | "EXTERNAL_VPC"
    | "HSM_SINGLE_TENANT"
    | (string & {});
}

export const RawEncryptResponse: Schema.Schema<RawEncryptResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      ciphertext: Schema.optional(Schema.String),
      initializationVector: Schema.optional(Schema.String),
      tagLength: Schema.optional(Schema.Number),
      ciphertextCrc32c: Schema.optional(Schema.String),
      initializationVectorCrc32c: Schema.optional(Schema.String),
      verifiedPlaintextCrc32c: Schema.optional(Schema.Boolean),
      verifiedAdditionalAuthenticatedDataCrc32c: Schema.optional(
        Schema.Boolean,
      ),
      verifiedInitializationVectorCrc32c: Schema.optional(Schema.Boolean),
      name: Schema.optional(Schema.String),
      protectionLevel: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RawEncryptResponse",
  }) as any as Schema.Schema<RawEncryptResponse>;

export interface RawDecryptRequest {
  /** Required. The encrypted data originally returned in RawEncryptResponse.ciphertext. */
  ciphertext?: string;
  /** Optional. Optional data that must match the data originally supplied in RawEncryptRequest.additional_authenticated_data. */
  additionalAuthenticatedData?: string;
  /** Required. The initialization vector (IV) used during encryption, which must match the data originally provided in RawEncryptResponse.initialization_vector. */
  initializationVector?: string;
  /** The length of the authentication tag that is appended to the end of the ciphertext. If unspecified (0), the default value for the key's algorithm will be used (for AES-GCM, the default value is 16). */
  tagLength?: number;
  /** Optional. An optional CRC32C checksum of the RawDecryptRequest.ciphertext. If specified, KeyManagementService will verify the integrity of the received ciphertext using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(ciphertext) is equal to ciphertext_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. */
  ciphertextCrc32c?: string;
  /** Optional. An optional CRC32C checksum of the RawDecryptRequest.additional_authenticated_data. If specified, KeyManagementService will verify the integrity of the received additional_authenticated_data using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(additional_authenticated_data) is equal to additional_authenticated_data_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. */
  additionalAuthenticatedDataCrc32c?: string;
  /** Optional. An optional CRC32C checksum of the RawDecryptRequest.initialization_vector. If specified, KeyManagementService will verify the integrity of the received initialization_vector using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(initialization_vector) is equal to initialization_vector_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. */
  initializationVectorCrc32c?: string;
}

export const RawDecryptRequest: Schema.Schema<RawDecryptRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      ciphertext: Schema.optional(Schema.String),
      additionalAuthenticatedData: Schema.optional(Schema.String),
      initializationVector: Schema.optional(Schema.String),
      tagLength: Schema.optional(Schema.Number),
      ciphertextCrc32c: Schema.optional(Schema.String),
      additionalAuthenticatedDataCrc32c: Schema.optional(Schema.String),
      initializationVectorCrc32c: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RawDecryptRequest",
  }) as any as Schema.Schema<RawDecryptRequest>;

export interface RawDecryptResponse {
  /** The decrypted data. */
  plaintext?: string;
  /** Integrity verification field. A CRC32C checksum of the returned RawDecryptResponse.plaintext. An integrity check of plaintext can be performed by computing the CRC32C checksum of plaintext and comparing your results to this field. Discard the response in case of non-matching checksum values, and perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: receiving this response message indicates that KeyManagementService is able to successfully decrypt the ciphertext. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. */
  plaintextCrc32c?: string;
  /** The ProtectionLevel of the CryptoKeyVersion used in decryption. */
  protectionLevel?:
    | "PROTECTION_LEVEL_UNSPECIFIED"
    | "SOFTWARE"
    | "HSM"
    | "EXTERNAL"
    | "EXTERNAL_VPC"
    | "HSM_SINGLE_TENANT"
    | (string & {});
  /** Integrity verification field. A flag indicating whether RawDecryptRequest.ciphertext_crc32c was received by KeyManagementService and used for the integrity verification of the ciphertext. A false value of this field indicates either that RawDecryptRequest.ciphertext_crc32c was left unset or that it was not delivered to KeyManagementService. If you've set RawDecryptRequest.ciphertext_crc32c but this field is still false, discard the response and perform a limited number of retries. */
  verifiedCiphertextCrc32c?: boolean;
  /** Integrity verification field. A flag indicating whether RawDecryptRequest.additional_authenticated_data_crc32c was received by KeyManagementService and used for the integrity verification of additional_authenticated_data. A false value of this field indicates either that // RawDecryptRequest.additional_authenticated_data_crc32c was left unset or that it was not delivered to KeyManagementService. If you've set RawDecryptRequest.additional_authenticated_data_crc32c but this field is still false, discard the response and perform a limited number of retries. */
  verifiedAdditionalAuthenticatedDataCrc32c?: boolean;
  /** Integrity verification field. A flag indicating whether RawDecryptRequest.initialization_vector_crc32c was received by KeyManagementService and used for the integrity verification of initialization_vector. A false value of this field indicates either that RawDecryptRequest.initialization_vector_crc32c was left unset or that it was not delivered to KeyManagementService. If you've set RawDecryptRequest.initialization_vector_crc32c but this field is still false, discard the response and perform a limited number of retries. */
  verifiedInitializationVectorCrc32c?: boolean;
}

export const RawDecryptResponse: Schema.Schema<RawDecryptResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      plaintext: Schema.optional(Schema.String),
      plaintextCrc32c: Schema.optional(Schema.String),
      protectionLevel: Schema.optional(Schema.String),
      verifiedCiphertextCrc32c: Schema.optional(Schema.Boolean),
      verifiedAdditionalAuthenticatedDataCrc32c: Schema.optional(
        Schema.Boolean,
      ),
      verifiedInitializationVectorCrc32c: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "RawDecryptResponse",
  }) as any as Schema.Schema<RawDecryptResponse>;

export interface Digest {
  /** A message digest produced with the SHA-256 algorithm. */
  sha256?: string;
  /** A message digest produced with the SHA-384 algorithm. */
  sha384?: string;
  /** A message digest produced with the SHA-512 algorithm. */
  sha512?: string;
  /** A message digest produced with SHAKE-256, to be used with ML-DSA external-μ algorithms only. See "message representative" note in section 6.2, algorithm 7 of the FIPS-204 standard: https://doi.org/10.6028/nist.fips.204 */
  externalMu?: string;
}

export const Digest: Schema.Schema<Digest> = Schema.suspend(() =>
  Schema.Struct({
    sha256: Schema.optional(Schema.String),
    sha384: Schema.optional(Schema.String),
    sha512: Schema.optional(Schema.String),
    externalMu: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Digest" }) as any as Schema.Schema<Digest>;

export interface AsymmetricSignRequest {
  /** Optional. The digest of the data to sign. The digest must be produced with the same digest algorithm as specified by the key version's algorithm. This field may not be supplied if AsymmetricSignRequest.data is supplied. */
  digest?: Digest;
  /** Optional. An optional CRC32C checksum of the AsymmetricSignRequest.digest. If specified, KeyManagementService will verify the integrity of the received AsymmetricSignRequest.digest using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(AsymmetricSignRequest.digest) is equal to AsymmetricSignRequest.digest_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. */
  digestCrc32c?: string;
  /** Optional. The data to sign. It can't be supplied if AsymmetricSignRequest.digest is supplied. */
  data?: string;
  /** Optional. An optional CRC32C checksum of the AsymmetricSignRequest.data. If specified, KeyManagementService will verify the integrity of the received AsymmetricSignRequest.data using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(AsymmetricSignRequest.data) is equal to AsymmetricSignRequest.data_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. */
  dataCrc32c?: string;
}

export const AsymmetricSignRequest: Schema.Schema<AsymmetricSignRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      digest: Schema.optional(Digest),
      digestCrc32c: Schema.optional(Schema.String),
      data: Schema.optional(Schema.String),
      dataCrc32c: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AsymmetricSignRequest",
  }) as any as Schema.Schema<AsymmetricSignRequest>;

export interface AsymmetricSignResponse {
  /** The created signature. */
  signature?: string;
  /** Integrity verification field. A CRC32C checksum of the returned AsymmetricSignResponse.signature. An integrity check of AsymmetricSignResponse.signature can be performed by computing the CRC32C checksum of AsymmetricSignResponse.signature and comparing your results to this field. Discard the response in case of non-matching checksum values, and perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. */
  signatureCrc32c?: string;
  /** Integrity verification field. A flag indicating whether AsymmetricSignRequest.digest_crc32c was received by KeyManagementService and used for the integrity verification of the digest. A false value of this field indicates either that AsymmetricSignRequest.digest_crc32c was left unset or that it was not delivered to KeyManagementService. If you've set AsymmetricSignRequest.digest_crc32c but this field is still false, discard the response and perform a limited number of retries. */
  verifiedDigestCrc32c?: boolean;
  /** The resource name of the CryptoKeyVersion used for signing. Check this field to verify that the intended resource was used for signing. */
  name?: string;
  /** Integrity verification field. A flag indicating whether AsymmetricSignRequest.data_crc32c was received by KeyManagementService and used for the integrity verification of the data. A false value of this field indicates either that AsymmetricSignRequest.data_crc32c was left unset or that it was not delivered to KeyManagementService. If you've set AsymmetricSignRequest.data_crc32c but this field is still false, discard the response and perform a limited number of retries. */
  verifiedDataCrc32c?: boolean;
  /** The ProtectionLevel of the CryptoKeyVersion used for signing. */
  protectionLevel?:
    | "PROTECTION_LEVEL_UNSPECIFIED"
    | "SOFTWARE"
    | "HSM"
    | "EXTERNAL"
    | "EXTERNAL_VPC"
    | "HSM_SINGLE_TENANT"
    | (string & {});
}

export const AsymmetricSignResponse: Schema.Schema<AsymmetricSignResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      signature: Schema.optional(Schema.String),
      signatureCrc32c: Schema.optional(Schema.String),
      verifiedDigestCrc32c: Schema.optional(Schema.Boolean),
      name: Schema.optional(Schema.String),
      verifiedDataCrc32c: Schema.optional(Schema.Boolean),
      protectionLevel: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AsymmetricSignResponse",
  }) as any as Schema.Schema<AsymmetricSignResponse>;

export interface AsymmetricDecryptRequest {
  /** Required. The data encrypted with the named CryptoKeyVersion's public key using OAEP. */
  ciphertext?: string;
  /** Optional. An optional CRC32C checksum of the AsymmetricDecryptRequest.ciphertext. If specified, KeyManagementService will verify the integrity of the received AsymmetricDecryptRequest.ciphertext using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(AsymmetricDecryptRequest.ciphertext) is equal to AsymmetricDecryptRequest.ciphertext_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. */
  ciphertextCrc32c?: string;
}

export const AsymmetricDecryptRequest: Schema.Schema<AsymmetricDecryptRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      ciphertext: Schema.optional(Schema.String),
      ciphertextCrc32c: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AsymmetricDecryptRequest",
  }) as any as Schema.Schema<AsymmetricDecryptRequest>;

export interface AsymmetricDecryptResponse {
  /** The decrypted data originally encrypted with the matching public key. */
  plaintext?: string;
  /** Integrity verification field. A CRC32C checksum of the returned AsymmetricDecryptResponse.plaintext. An integrity check of AsymmetricDecryptResponse.plaintext can be performed by computing the CRC32C checksum of AsymmetricDecryptResponse.plaintext and comparing your results to this field. Discard the response in case of non-matching checksum values, and perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. */
  plaintextCrc32c?: string;
  /** Integrity verification field. A flag indicating whether AsymmetricDecryptRequest.ciphertext_crc32c was received by KeyManagementService and used for the integrity verification of the ciphertext. A false value of this field indicates either that AsymmetricDecryptRequest.ciphertext_crc32c was left unset or that it was not delivered to KeyManagementService. If you've set AsymmetricDecryptRequest.ciphertext_crc32c but this field is still false, discard the response and perform a limited number of retries. */
  verifiedCiphertextCrc32c?: boolean;
  /** The ProtectionLevel of the CryptoKeyVersion used in decryption. */
  protectionLevel?:
    | "PROTECTION_LEVEL_UNSPECIFIED"
    | "SOFTWARE"
    | "HSM"
    | "EXTERNAL"
    | "EXTERNAL_VPC"
    | "HSM_SINGLE_TENANT"
    | (string & {});
}

export const AsymmetricDecryptResponse: Schema.Schema<AsymmetricDecryptResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      plaintext: Schema.optional(Schema.String),
      plaintextCrc32c: Schema.optional(Schema.String),
      verifiedCiphertextCrc32c: Schema.optional(Schema.Boolean),
      protectionLevel: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AsymmetricDecryptResponse",
  }) as any as Schema.Schema<AsymmetricDecryptResponse>;

export interface MacSignRequest {
  /** Required. The data to sign. The MAC tag is computed over this data field based on the specific algorithm. */
  data?: string;
  /** Optional. An optional CRC32C checksum of the MacSignRequest.data. If specified, KeyManagementService will verify the integrity of the received MacSignRequest.data using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(MacSignRequest.data) is equal to MacSignRequest.data_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. */
  dataCrc32c?: string;
}

export const MacSignRequest: Schema.Schema<MacSignRequest> = Schema.suspend(
  () =>
    Schema.Struct({
      data: Schema.optional(Schema.String),
      dataCrc32c: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "MacSignRequest",
}) as any as Schema.Schema<MacSignRequest>;

export interface MacSignResponse {
  /** The resource name of the CryptoKeyVersion used for signing. Check this field to verify that the intended resource was used for signing. */
  name?: string;
  /** The created signature. */
  mac?: string;
  /** Integrity verification field. A CRC32C checksum of the returned MacSignResponse.mac. An integrity check of MacSignResponse.mac can be performed by computing the CRC32C checksum of MacSignResponse.mac and comparing your results to this field. Discard the response in case of non-matching checksum values, and perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. */
  macCrc32c?: string;
  /** Integrity verification field. A flag indicating whether MacSignRequest.data_crc32c was received by KeyManagementService and used for the integrity verification of the data. A false value of this field indicates either that MacSignRequest.data_crc32c was left unset or that it was not delivered to KeyManagementService. If you've set MacSignRequest.data_crc32c but this field is still false, discard the response and perform a limited number of retries. */
  verifiedDataCrc32c?: boolean;
  /** The ProtectionLevel of the CryptoKeyVersion used for signing. */
  protectionLevel?:
    | "PROTECTION_LEVEL_UNSPECIFIED"
    | "SOFTWARE"
    | "HSM"
    | "EXTERNAL"
    | "EXTERNAL_VPC"
    | "HSM_SINGLE_TENANT"
    | (string & {});
}

export const MacSignResponse: Schema.Schema<MacSignResponse> = Schema.suspend(
  () =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      mac: Schema.optional(Schema.String),
      macCrc32c: Schema.optional(Schema.String),
      verifiedDataCrc32c: Schema.optional(Schema.Boolean),
      protectionLevel: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "MacSignResponse",
}) as any as Schema.Schema<MacSignResponse>;

export interface MacVerifyRequest {
  /** Required. The data used previously as a MacSignRequest.data to generate the MAC tag. */
  data?: string;
  /** Optional. An optional CRC32C checksum of the MacVerifyRequest.data. If specified, KeyManagementService will verify the integrity of the received MacVerifyRequest.data using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(MacVerifyRequest.data) is equal to MacVerifyRequest.data_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. */
  dataCrc32c?: string;
  /** Required. The signature to verify. */
  mac?: string;
  /** Optional. An optional CRC32C checksum of the MacVerifyRequest.mac. If specified, KeyManagementService will verify the integrity of the received MacVerifyRequest.mac using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(MacVerifyRequest.mac) is equal to MacVerifyRequest.mac_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. */
  macCrc32c?: string;
}

export const MacVerifyRequest: Schema.Schema<MacVerifyRequest> = Schema.suspend(
  () =>
    Schema.Struct({
      data: Schema.optional(Schema.String),
      dataCrc32c: Schema.optional(Schema.String),
      mac: Schema.optional(Schema.String),
      macCrc32c: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "MacVerifyRequest",
}) as any as Schema.Schema<MacVerifyRequest>;

export interface MacVerifyResponse {
  /** The resource name of the CryptoKeyVersion used for verification. Check this field to verify that the intended resource was used for verification. */
  name?: string;
  /** This field indicates whether or not the verification operation for MacVerifyRequest.mac over MacVerifyRequest.data was successful. */
  success?: boolean;
  /** Integrity verification field. A flag indicating whether MacVerifyRequest.data_crc32c was received by KeyManagementService and used for the integrity verification of the data. A false value of this field indicates either that MacVerifyRequest.data_crc32c was left unset or that it was not delivered to KeyManagementService. If you've set MacVerifyRequest.data_crc32c but this field is still false, discard the response and perform a limited number of retries. */
  verifiedDataCrc32c?: boolean;
  /** Integrity verification field. A flag indicating whether MacVerifyRequest.mac_crc32c was received by KeyManagementService and used for the integrity verification of the data. A false value of this field indicates either that MacVerifyRequest.mac_crc32c was left unset or that it was not delivered to KeyManagementService. If you've set MacVerifyRequest.mac_crc32c but this field is still false, discard the response and perform a limited number of retries. */
  verifiedMacCrc32c?: boolean;
  /** Integrity verification field. This value is used for the integrity verification of [MacVerifyResponse.success]. If the value of this field contradicts the value of [MacVerifyResponse.success], discard the response and perform a limited number of retries. */
  verifiedSuccessIntegrity?: boolean;
  /** The ProtectionLevel of the CryptoKeyVersion used for verification. */
  protectionLevel?:
    | "PROTECTION_LEVEL_UNSPECIFIED"
    | "SOFTWARE"
    | "HSM"
    | "EXTERNAL"
    | "EXTERNAL_VPC"
    | "HSM_SINGLE_TENANT"
    | (string & {});
}

export const MacVerifyResponse: Schema.Schema<MacVerifyResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      success: Schema.optional(Schema.Boolean),
      verifiedDataCrc32c: Schema.optional(Schema.Boolean),
      verifiedMacCrc32c: Schema.optional(Schema.Boolean),
      verifiedSuccessIntegrity: Schema.optional(Schema.Boolean),
      protectionLevel: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "MacVerifyResponse",
  }) as any as Schema.Schema<MacVerifyResponse>;

export interface DecapsulateRequest {
  /** Required. The ciphertext produced from encapsulation with the named CryptoKeyVersion public key(s). */
  ciphertext?: string;
  /** Optional. A CRC32C checksum of the DecapsulateRequest.ciphertext. If specified, KeyManagementService will verify the integrity of the received DecapsulateRequest.ciphertext using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(DecapsulateRequest.ciphertext) is equal to DecapsulateRequest.ciphertext_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. */
  ciphertextCrc32c?: string;
}

export const DecapsulateRequest: Schema.Schema<DecapsulateRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      ciphertext: Schema.optional(Schema.String),
      ciphertextCrc32c: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DecapsulateRequest",
  }) as any as Schema.Schema<DecapsulateRequest>;

export interface DecapsulateResponse {
  /** The resource name of the CryptoKeyVersion used for decapsulation. Check this field to verify that the intended resource was used for decapsulation. */
  name?: string;
  /** The decapsulated shared_secret originally encapsulated with the matching public key. */
  sharedSecret?: string;
  /** Integrity verification field. A CRC32C checksum of the returned DecapsulateResponse.shared_secret. An integrity check of DecapsulateResponse.shared_secret can be performed by computing the CRC32C checksum of DecapsulateResponse.shared_secret and comparing your results to this field. Discard the response in case of non-matching checksum values, and perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: receiving this response message indicates that KeyManagementService is able to successfully decrypt the ciphertext. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. */
  sharedSecretCrc32c?: string;
  /** Integrity verification field. A flag indicating whether DecapsulateRequest.ciphertext_crc32c was received by KeyManagementService and used for the integrity verification of the ciphertext. A false value of this field indicates either that DecapsulateRequest.ciphertext_crc32c was left unset or that it was not delivered to KeyManagementService. If you've set DecapsulateRequest.ciphertext_crc32c but this field is still false, discard the response and perform a limited number of retries. */
  verifiedCiphertextCrc32c?: boolean;
  /** The ProtectionLevel of the CryptoKeyVersion used in decapsulation. */
  protectionLevel?:
    | "PROTECTION_LEVEL_UNSPECIFIED"
    | "SOFTWARE"
    | "HSM"
    | "EXTERNAL"
    | "EXTERNAL_VPC"
    | "HSM_SINGLE_TENANT"
    | (string & {});
}

export const DecapsulateResponse: Schema.Schema<DecapsulateResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      sharedSecret: Schema.optional(Schema.String),
      sharedSecretCrc32c: Schema.optional(Schema.String),
      verifiedCiphertextCrc32c: Schema.optional(Schema.Boolean),
      protectionLevel: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DecapsulateResponse",
  }) as any as Schema.Schema<DecapsulateResponse>;

export interface GenerateRandomBytesRequest {
  /** The length in bytes of the amount of randomness to retrieve. Minimum 8 bytes, maximum 1024 bytes. */
  lengthBytes?: number;
  /** The ProtectionLevel to use when generating the random data. Currently, only HSM protection level is supported. */
  protectionLevel?:
    | "PROTECTION_LEVEL_UNSPECIFIED"
    | "SOFTWARE"
    | "HSM"
    | "EXTERNAL"
    | "EXTERNAL_VPC"
    | "HSM_SINGLE_TENANT"
    | (string & {});
}

export const GenerateRandomBytesRequest: Schema.Schema<GenerateRandomBytesRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      lengthBytes: Schema.optional(Schema.Number),
      protectionLevel: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GenerateRandomBytesRequest",
  }) as any as Schema.Schema<GenerateRandomBytesRequest>;

export interface GenerateRandomBytesResponse {
  /** The generated data. */
  data?: string;
  /** Integrity verification field. A CRC32C checksum of the returned GenerateRandomBytesResponse.data. An integrity check of GenerateRandomBytesResponse.data can be performed by computing the CRC32C checksum of GenerateRandomBytesResponse.data and comparing your results to this field. Discard the response in case of non-matching checksum values, and perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type. */
  dataCrc32c?: string;
}

export const GenerateRandomBytesResponse: Schema.Schema<GenerateRandomBytesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      data: Schema.optional(Schema.String),
      dataCrc32c: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GenerateRandomBytesResponse",
  }) as any as Schema.Schema<GenerateRandomBytesResponse>;

export interface Location {
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    locationId: Schema.optional(Schema.String),
    displayName: Schema.optional(Schema.String),
    labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  }),
).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface ListLocationsResponse {
  /** A list of locations that matches the specified filter in the request. */
  locations?: Array<Location>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const ListLocationsResponse: Schema.Schema<ListLocationsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      locations: Schema.optional(Schema.Array(Location)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListLocationsResponse",
  }) as any as Schema.Schema<ListLocationsResponse>;

export interface Expr {
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
}

export const Expr: Schema.Schema<Expr> = Schema.suspend(() =>
  Schema.Struct({
    expression: Schema.optional(Schema.String),
    title: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface Binding {
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: Expr;
}

export const Binding: Schema.Schema<Binding> = Schema.suspend(() =>
  Schema.Struct({
    role: Schema.optional(Schema.String),
    members: Schema.optional(Schema.Array(Schema.String)),
    condition: Schema.optional(Expr),
  }),
).annotate({ identifier: "Binding" }) as any as Schema.Schema<Binding>;

export interface AuditLogConfig {
  /** The log type that this config enables. */
  logType?:
    | "LOG_TYPE_UNSPECIFIED"
    | "ADMIN_READ"
    | "DATA_WRITE"
    | "DATA_READ"
    | (string & {});
  /** Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. */
  exemptedMembers?: Array<string>;
}

export const AuditLogConfig: Schema.Schema<AuditLogConfig> = Schema.suspend(
  () =>
    Schema.Struct({
      logType: Schema.optional(Schema.String),
      exemptedMembers: Schema.optional(Schema.Array(Schema.String)),
    }),
).annotate({
  identifier: "AuditLogConfig",
}) as any as Schema.Schema<AuditLogConfig>;

export interface AuditConfig {
  /** Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. */
  service?: string;
  /** The configuration for logging of each type of permission. */
  auditLogConfigs?: Array<AuditLogConfig>;
}

export const AuditConfig: Schema.Schema<AuditConfig> = Schema.suspend(() =>
  Schema.Struct({
    service: Schema.optional(Schema.String),
    auditLogConfigs: Schema.optional(Schema.Array(AuditLogConfig)),
  }),
).annotate({ identifier: "AuditConfig" }) as any as Schema.Schema<AuditConfig>;

export interface Policy {
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<AuditConfig>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() =>
  Schema.Struct({
    version: Schema.optional(Schema.Number),
    bindings: Schema.optional(Schema.Array(Binding)),
    auditConfigs: Schema.optional(Schema.Array(AuditConfig)),
    etag: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
  /** OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` */
  updateMask?: string;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      policy: Schema.optional(Policy),
      updateMask: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SetIamPolicyRequest",
  }) as any as Schema.Schema<SetIamPolicyRequest>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      permissions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "TestIamPermissionsRequest",
  }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      permissions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "TestIamPermissionsResponse",
  }) as any as Schema.Schema<TestIamPermissionsResponse>;

export interface LocationMetadata {
  /** Indicates whether CryptoKeys with protection_level HSM can be created in this location. */
  hsmAvailable?: boolean;
  /** Indicates whether CryptoKeys with protection_level EXTERNAL can be created in this location. */
  ekmAvailable?: boolean;
  /** Indicates whether CryptoKeys with protection_level HSM_SINGLE_TENANT can be created in this location. */
  hsmSingleTenantAvailable?: boolean;
}

export const LocationMetadata: Schema.Schema<LocationMetadata> = Schema.suspend(
  () =>
    Schema.Struct({
      hsmAvailable: Schema.optional(Schema.Boolean),
      ekmAvailable: Schema.optional(Schema.Boolean),
      hsmSingleTenantAvailable: Schema.optional(Schema.Boolean),
    }),
).annotate({
  identifier: "LocationMetadata",
}) as any as Schema.Schema<LocationMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

export interface UpdateAutokeyConfigFoldersRequest {
  /** Identifier. Name of the AutokeyConfig resource, e.g. `folders/{FOLDER_NUMBER}/autokeyConfig` or `projects/{PROJECT_NUMBER}/autokeyConfig`. */
  name: string;
  /** Required. Masks which fields of the AutokeyConfig to update, e.g. `keyProject`. */
  updateMask?: string;
  /** Request body */
  body?: AutokeyConfig;
}

export const UpdateAutokeyConfigFoldersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(AutokeyConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1/folders/{foldersId}/autokeyConfig",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateAutokeyConfigFoldersRequest>;

export type UpdateAutokeyConfigFoldersResponse = AutokeyConfig;
export const UpdateAutokeyConfigFoldersResponse = AutokeyConfig;

export type UpdateAutokeyConfigFoldersError = DefaultErrors;

/** Updates the AutokeyConfig for a folder or a project. The caller must have both `cloudkms.autokeyConfigs.update` permission on the parent folder and `cloudkms.cryptoKeys.setIamPolicy` permission on the provided key project. A KeyHandle creation in the folder's descendant projects will use this configuration to determine where to create the resulting CryptoKey. */
export const updateAutokeyConfigFolders: API.OperationMethod<
  UpdateAutokeyConfigFoldersRequest,
  UpdateAutokeyConfigFoldersResponse,
  UpdateAutokeyConfigFoldersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateAutokeyConfigFoldersRequest,
  output: UpdateAutokeyConfigFoldersResponse,
  errors: [],
}));

export interface GetAutokeyConfigFoldersRequest {
  /** Required. Name of the AutokeyConfig resource, e.g. `folders/{FOLDER_NUMBER}/autokeyConfig` or `projects/{PROJECT_NUMBER}/autokeyConfig`. */
  name: string;
}

export const GetAutokeyConfigFoldersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/autokeyConfig" }),
  svc,
) as unknown as Schema.Schema<GetAutokeyConfigFoldersRequest>;

export type GetAutokeyConfigFoldersResponse = AutokeyConfig;
export const GetAutokeyConfigFoldersResponse = AutokeyConfig;

export type GetAutokeyConfigFoldersError = DefaultErrors;

/** Returns the AutokeyConfig for a folder or project. */
export const getAutokeyConfigFolders: API.OperationMethod<
  GetAutokeyConfigFoldersRequest,
  GetAutokeyConfigFoldersResponse,
  GetAutokeyConfigFoldersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAutokeyConfigFoldersRequest,
  output: GetAutokeyConfigFoldersResponse,
  errors: [],
}));

export interface GetKajPolicyConfigFoldersRequest {
  /** Required. The name of the KeyAccessJustificationsPolicyConfig to get. */
  name: string;
}

export const GetKajPolicyConfigFoldersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/kajPolicyConfig" }),
  svc,
) as unknown as Schema.Schema<GetKajPolicyConfigFoldersRequest>;

export type GetKajPolicyConfigFoldersResponse =
  KeyAccessJustificationsPolicyConfig;
export const GetKajPolicyConfigFoldersResponse =
  KeyAccessJustificationsPolicyConfig;

export type GetKajPolicyConfigFoldersError = DefaultErrors;

/** Gets the KeyAccessJustificationsPolicyConfig for a given organization, folder, or project. */
export const getKajPolicyConfigFolders: API.OperationMethod<
  GetKajPolicyConfigFoldersRequest,
  GetKajPolicyConfigFoldersResponse,
  GetKajPolicyConfigFoldersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetKajPolicyConfigFoldersRequest,
  output: GetKajPolicyConfigFoldersResponse,
  errors: [],
}));

export interface UpdateKajPolicyConfigFoldersRequest {
  /** Identifier. The resource name for this KeyAccessJustificationsPolicyConfig in the format of "{organizations|folders|projects}/* /kajPolicyConfig". */
  name: string;
  /** Optional. The list of fields to update. */
  updateMask?: string;
  /** Request body */
  body?: KeyAccessJustificationsPolicyConfig;
}

export const UpdateKajPolicyConfigFoldersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(KeyAccessJustificationsPolicyConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1/folders/{foldersId}/kajPolicyConfig",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateKajPolicyConfigFoldersRequest>;

export type UpdateKajPolicyConfigFoldersResponse =
  KeyAccessJustificationsPolicyConfig;
export const UpdateKajPolicyConfigFoldersResponse =
  KeyAccessJustificationsPolicyConfig;

export type UpdateKajPolicyConfigFoldersError = DefaultErrors;

/** Updates the KeyAccessJustificationsPolicyConfig for a given organization, folder, or project. */
export const updateKajPolicyConfigFolders: API.OperationMethod<
  UpdateKajPolicyConfigFoldersRequest,
  UpdateKajPolicyConfigFoldersResponse,
  UpdateKajPolicyConfigFoldersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateKajPolicyConfigFoldersRequest,
  output: UpdateKajPolicyConfigFoldersResponse,
  errors: [],
}));

export interface UpdateAutokeyConfigProjectsRequest {
  /** Identifier. Name of the AutokeyConfig resource, e.g. `folders/{FOLDER_NUMBER}/autokeyConfig` or `projects/{PROJECT_NUMBER}/autokeyConfig`. */
  name: string;
  /** Required. Masks which fields of the AutokeyConfig to update, e.g. `keyProject`. */
  updateMask?: string;
  /** Request body */
  body?: AutokeyConfig;
}

export const UpdateAutokeyConfigProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(AutokeyConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1/projects/{projectsId}/autokeyConfig",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateAutokeyConfigProjectsRequest>;

export type UpdateAutokeyConfigProjectsResponse = AutokeyConfig;
export const UpdateAutokeyConfigProjectsResponse = AutokeyConfig;

export type UpdateAutokeyConfigProjectsError = DefaultErrors;

/** Updates the AutokeyConfig for a folder or a project. The caller must have both `cloudkms.autokeyConfigs.update` permission on the parent folder and `cloudkms.cryptoKeys.setIamPolicy` permission on the provided key project. A KeyHandle creation in the folder's descendant projects will use this configuration to determine where to create the resulting CryptoKey. */
export const updateAutokeyConfigProjects: API.OperationMethod<
  UpdateAutokeyConfigProjectsRequest,
  UpdateAutokeyConfigProjectsResponse,
  UpdateAutokeyConfigProjectsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateAutokeyConfigProjectsRequest,
  output: UpdateAutokeyConfigProjectsResponse,
  errors: [],
}));

export interface GetAutokeyConfigProjectsRequest {
  /** Required. Name of the AutokeyConfig resource, e.g. `folders/{FOLDER_NUMBER}/autokeyConfig` or `projects/{PROJECT_NUMBER}/autokeyConfig`. */
  name: string;
}

export const GetAutokeyConfigProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/autokeyConfig" }),
  svc,
) as unknown as Schema.Schema<GetAutokeyConfigProjectsRequest>;

export type GetAutokeyConfigProjectsResponse = AutokeyConfig;
export const GetAutokeyConfigProjectsResponse = AutokeyConfig;

export type GetAutokeyConfigProjectsError = DefaultErrors;

/** Returns the AutokeyConfig for a folder or project. */
export const getAutokeyConfigProjects: API.OperationMethod<
  GetAutokeyConfigProjectsRequest,
  GetAutokeyConfigProjectsResponse,
  GetAutokeyConfigProjectsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAutokeyConfigProjectsRequest,
  output: GetAutokeyConfigProjectsResponse,
  errors: [],
}));

export interface ShowEffectiveAutokeyConfigProjectsRequest {
  /** Required. Name of the resource project to the show effective Cloud KMS Autokey configuration for. This may be helpful for interrogating the effect of nested folder configurations on a given resource project. */
  parent: string;
}

export const ShowEffectiveAutokeyConfigProjectsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}:showEffectiveAutokeyConfig",
  }),
  svc,
) as unknown as Schema.Schema<ShowEffectiveAutokeyConfigProjectsRequest>;

export type ShowEffectiveAutokeyConfigProjectsResponse =
  ShowEffectiveAutokeyConfigResponse;
export const ShowEffectiveAutokeyConfigProjectsResponse =
  ShowEffectiveAutokeyConfigResponse;

export type ShowEffectiveAutokeyConfigProjectsError = DefaultErrors;

/** Returns the effective Cloud KMS Autokey configuration for a given project. */
export const showEffectiveAutokeyConfigProjects: API.OperationMethod<
  ShowEffectiveAutokeyConfigProjectsRequest,
  ShowEffectiveAutokeyConfigProjectsResponse,
  ShowEffectiveAutokeyConfigProjectsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ShowEffectiveAutokeyConfigProjectsRequest,
  output: ShowEffectiveAutokeyConfigProjectsResponse,
  errors: [],
}));

export interface GetKajPolicyConfigProjectsRequest {
  /** Required. The name of the KeyAccessJustificationsPolicyConfig to get. */
  name: string;
}

export const GetKajPolicyConfigProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/kajPolicyConfig" }),
  svc,
) as unknown as Schema.Schema<GetKajPolicyConfigProjectsRequest>;

export type GetKajPolicyConfigProjectsResponse =
  KeyAccessJustificationsPolicyConfig;
export const GetKajPolicyConfigProjectsResponse =
  KeyAccessJustificationsPolicyConfig;

export type GetKajPolicyConfigProjectsError = DefaultErrors;

/** Gets the KeyAccessJustificationsPolicyConfig for a given organization, folder, or project. */
export const getKajPolicyConfigProjects: API.OperationMethod<
  GetKajPolicyConfigProjectsRequest,
  GetKajPolicyConfigProjectsResponse,
  GetKajPolicyConfigProjectsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetKajPolicyConfigProjectsRequest,
  output: GetKajPolicyConfigProjectsResponse,
  errors: [],
}));

export interface UpdateKajPolicyConfigProjectsRequest {
  /** Identifier. The resource name for this KeyAccessJustificationsPolicyConfig in the format of "{organizations|folders|projects}/* /kajPolicyConfig". */
  name: string;
  /** Optional. The list of fields to update. */
  updateMask?: string;
  /** Request body */
  body?: KeyAccessJustificationsPolicyConfig;
}

export const UpdateKajPolicyConfigProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(KeyAccessJustificationsPolicyConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1/projects/{projectsId}/kajPolicyConfig",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateKajPolicyConfigProjectsRequest>;

export type UpdateKajPolicyConfigProjectsResponse =
  KeyAccessJustificationsPolicyConfig;
export const UpdateKajPolicyConfigProjectsResponse =
  KeyAccessJustificationsPolicyConfig;

export type UpdateKajPolicyConfigProjectsError = DefaultErrors;

/** Updates the KeyAccessJustificationsPolicyConfig for a given organization, folder, or project. */
export const updateKajPolicyConfigProjects: API.OperationMethod<
  UpdateKajPolicyConfigProjectsRequest,
  UpdateKajPolicyConfigProjectsResponse,
  UpdateKajPolicyConfigProjectsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateKajPolicyConfigProjectsRequest,
  output: UpdateKajPolicyConfigProjectsResponse,
  errors: [],
}));

export interface ShowEffectiveKeyAccessJustificationsPolicyConfigProjectsRequest {
  /** Required. The number or id of the project to get the effective KeyAccessJustificationsPolicyConfig. In the format of "projects/{|}" */
  project: string;
}

export const ShowEffectiveKeyAccessJustificationsPolicyConfigProjectsRequest =
  Schema.Struct({
    project: Schema.String.pipe(T.HttpPath("project")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}:showEffectiveKeyAccessJustificationsPolicyConfig",
    }),
    svc,
  ) as unknown as Schema.Schema<ShowEffectiveKeyAccessJustificationsPolicyConfigProjectsRequest>;

export type ShowEffectiveKeyAccessJustificationsPolicyConfigProjectsResponse =
  ShowEffectiveKeyAccessJustificationsPolicyConfigResponse;
export const ShowEffectiveKeyAccessJustificationsPolicyConfigProjectsResponse =
  ShowEffectiveKeyAccessJustificationsPolicyConfigResponse;

export type ShowEffectiveKeyAccessJustificationsPolicyConfigProjectsError =
  DefaultErrors;

/** Returns the KeyAccessJustificationsPolicyConfig of the resource closest to the given project in hierarchy. */
export const showEffectiveKeyAccessJustificationsPolicyConfigProjects: API.OperationMethod<
  ShowEffectiveKeyAccessJustificationsPolicyConfigProjectsRequest,
  ShowEffectiveKeyAccessJustificationsPolicyConfigProjectsResponse,
  ShowEffectiveKeyAccessJustificationsPolicyConfigProjectsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ShowEffectiveKeyAccessJustificationsPolicyConfigProjectsRequest,
  output: ShowEffectiveKeyAccessJustificationsPolicyConfigProjectsResponse,
  errors: [],
}));

export interface ShowEffectiveKeyAccessJustificationsEnrollmentConfigProjectsRequest {
  /** Required. The number or id of the project to get the effective KeyAccessJustificationsEnrollmentConfig for. */
  project: string;
}

export const ShowEffectiveKeyAccessJustificationsEnrollmentConfigProjectsRequest =
  Schema.Struct({
    project: Schema.String.pipe(T.HttpPath("project")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}:showEffectiveKeyAccessJustificationsEnrollmentConfig",
    }),
    svc,
  ) as unknown as Schema.Schema<ShowEffectiveKeyAccessJustificationsEnrollmentConfigProjectsRequest>;

export type ShowEffectiveKeyAccessJustificationsEnrollmentConfigProjectsResponse =
  ShowEffectiveKeyAccessJustificationsEnrollmentConfigResponse;
export const ShowEffectiveKeyAccessJustificationsEnrollmentConfigProjectsResponse =
  ShowEffectiveKeyAccessJustificationsEnrollmentConfigResponse;

export type ShowEffectiveKeyAccessJustificationsEnrollmentConfigProjectsError =
  DefaultErrors;

/** Returns the KeyAccessJustificationsEnrollmentConfig of the resource closest to the given project in hierarchy. */
export const showEffectiveKeyAccessJustificationsEnrollmentConfigProjects: API.OperationMethod<
  ShowEffectiveKeyAccessJustificationsEnrollmentConfigProjectsRequest,
  ShowEffectiveKeyAccessJustificationsEnrollmentConfigProjectsResponse,
  ShowEffectiveKeyAccessJustificationsEnrollmentConfigProjectsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ShowEffectiveKeyAccessJustificationsEnrollmentConfigProjectsRequest,
  output: ShowEffectiveKeyAccessJustificationsEnrollmentConfigProjectsResponse,
  errors: [],
}));

export interface GetEkmConfigProjectsLocationsRequest {
  /** Required. The name of the EkmConfig to get. */
  name: string;
}

export const GetEkmConfigProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/ekmConfig",
  }),
  svc,
) as unknown as Schema.Schema<GetEkmConfigProjectsLocationsRequest>;

export type GetEkmConfigProjectsLocationsResponse = EkmConfig;
export const GetEkmConfigProjectsLocationsResponse = EkmConfig;

export type GetEkmConfigProjectsLocationsError = DefaultErrors;

/** Returns the EkmConfig singleton resource for a given project and location. */
export const getEkmConfigProjectsLocations: API.OperationMethod<
  GetEkmConfigProjectsLocationsRequest,
  GetEkmConfigProjectsLocationsResponse,
  GetEkmConfigProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetEkmConfigProjectsLocationsRequest,
  output: GetEkmConfigProjectsLocationsResponse,
  errors: [],
}));

export interface UpdateEkmConfigProjectsLocationsRequest {
  /** Output only. The resource name for the EkmConfig in the format `projects/* /locations/* /ekmConfig`. */
  name: string;
  /** Required. List of fields to be updated in this request. */
  updateMask?: string;
  /** Request body */
  body?: EkmConfig;
}

export const UpdateEkmConfigProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(EkmConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1/projects/{projectsId}/locations/{locationsId}/ekmConfig",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateEkmConfigProjectsLocationsRequest>;

export type UpdateEkmConfigProjectsLocationsResponse = EkmConfig;
export const UpdateEkmConfigProjectsLocationsResponse = EkmConfig;

export type UpdateEkmConfigProjectsLocationsError = DefaultErrors;

/** Updates the EkmConfig singleton resource for a given project and location. */
export const updateEkmConfigProjectsLocations: API.OperationMethod<
  UpdateEkmConfigProjectsLocationsRequest,
  UpdateEkmConfigProjectsLocationsResponse,
  UpdateEkmConfigProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateEkmConfigProjectsLocationsRequest,
  output: UpdateEkmConfigProjectsLocationsResponse,
  errors: [],
}));

export interface GenerateRandomBytesProjectsLocationsRequest {
  /** The project-specific location in which to generate random bytes. For example, "projects/my-project/locations/us-central1". */
  location: string;
  /** Request body */
  body?: GenerateRandomBytesRequest;
}

export const GenerateRandomBytesProjectsLocationsRequest = Schema.Struct({
  location: Schema.String.pipe(T.HttpPath("location")),
  body: Schema.optional(GenerateRandomBytesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}:generateRandomBytes",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<GenerateRandomBytesProjectsLocationsRequest>;

export type GenerateRandomBytesProjectsLocationsResponse =
  GenerateRandomBytesResponse;
export const GenerateRandomBytesProjectsLocationsResponse =
  GenerateRandomBytesResponse;

export type GenerateRandomBytesProjectsLocationsError = DefaultErrors;

/** Generate random bytes using the Cloud KMS randomness source in the provided location. */
export const generateRandomBytesProjectsLocations: API.OperationMethod<
  GenerateRandomBytesProjectsLocationsRequest,
  GenerateRandomBytesProjectsLocationsResponse,
  GenerateRandomBytesProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GenerateRandomBytesProjectsLocationsRequest,
  output: GenerateRandomBytesProjectsLocationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsRequest {
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
}

export const ListProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("extraLocationTypes"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = ListLocationsResponse;
export const ListProjectsLocationsResponse = ListLocationsResponse;

export type ListProjectsLocationsError = DefaultErrors;

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export const listProjectsLocations: API.PaginatedOperationMethod<
  ListProjectsLocationsRequest,
  ListProjectsLocationsResponse,
  ListProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsRequest,
  output: ListProjectsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsRequest {
  /** Resource name for the location. */
  name: string;
}

export const GetProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRequest>;

export type GetProjectsLocationsResponse = Location;
export const GetProjectsLocationsResponse = Location;

export type GetProjectsLocationsError = DefaultErrors;

/** Gets information about a location. */
export const getProjectsLocations: API.OperationMethod<
  GetProjectsLocationsRequest,
  GetProjectsLocationsResponse,
  GetProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsRequest,
  output: GetProjectsLocationsResponse,
  errors: [],
}));

export interface GetProjectsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = Operation;
export const GetProjectsLocationsOperationsResponse = Operation;

export type GetProjectsLocationsOperationsError = DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsLocationsOperations: API.OperationMethod<
  GetProjectsLocationsOperationsRequest,
  GetProjectsLocationsOperationsResponse,
  GetProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsKeyHandlesRequest {
  /** Required. Name of the resource project and location to create the KeyHandle in, e.g. `projects/{PROJECT_ID}/locations/{LOCATION}`. */
  parent: string;
  /** Optional. Id of the KeyHandle. Must be unique to the resource project and location. If not provided by the caller, a new UUID is used. */
  keyHandleId?: string;
  /** Request body */
  body?: KeyHandle;
}

export const CreateProjectsLocationsKeyHandlesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  keyHandleId: Schema.optional(Schema.String).pipe(T.HttpQuery("keyHandleId")),
  body: Schema.optional(KeyHandle).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/keyHandles",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsKeyHandlesRequest>;

export type CreateProjectsLocationsKeyHandlesResponse = Operation;
export const CreateProjectsLocationsKeyHandlesResponse = Operation;

export type CreateProjectsLocationsKeyHandlesError = DefaultErrors;

/** Creates a new KeyHandle, triggering the provisioning of a new CryptoKey for CMEK use with the given resource type in the configured key project and the same location. GetOperation should be used to resolve the resulting long-running operation and get the resulting KeyHandle and CryptoKey. */
export const createProjectsLocationsKeyHandles: API.OperationMethod<
  CreateProjectsLocationsKeyHandlesRequest,
  CreateProjectsLocationsKeyHandlesResponse,
  CreateProjectsLocationsKeyHandlesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsKeyHandlesRequest,
  output: CreateProjectsLocationsKeyHandlesResponse,
  errors: [],
}));

export interface GetProjectsLocationsKeyHandlesRequest {
  /** Required. Name of the KeyHandle resource, e.g. `projects/{PROJECT_ID}/locations/{LOCATION}/keyHandles/{KEY_HANDLE_ID}`. */
  name: string;
}

export const GetProjectsLocationsKeyHandlesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/keyHandles/{keyHandlesId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsKeyHandlesRequest>;

export type GetProjectsLocationsKeyHandlesResponse = KeyHandle;
export const GetProjectsLocationsKeyHandlesResponse = KeyHandle;

export type GetProjectsLocationsKeyHandlesError = DefaultErrors;

/** Returns the KeyHandle. */
export const getProjectsLocationsKeyHandles: API.OperationMethod<
  GetProjectsLocationsKeyHandlesRequest,
  GetProjectsLocationsKeyHandlesResponse,
  GetProjectsLocationsKeyHandlesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsKeyHandlesRequest,
  output: GetProjectsLocationsKeyHandlesResponse,
  errors: [],
}));

export interface ListProjectsLocationsKeyHandlesRequest {
  /** Required. Name of the resource project and location from which to list KeyHandles, e.g. `projects/{PROJECT_ID}/locations/{LOCATION}`. */
  parent: string;
  /** Optional. Optional limit on the number of KeyHandles to include in the response. The service may return fewer than this value. Further KeyHandles can subsequently be obtained by including the ListKeyHandlesResponse.next_page_token in a subsequent request. If unspecified, at most 100 KeyHandles will be returned. */
  pageSize?: number;
  /** Optional. Optional pagination token, returned earlier via ListKeyHandlesResponse.next_page_token. */
  pageToken?: string;
  /** Optional. Filter to apply when listing KeyHandles, e.g. `resource_type_selector="{SERVICE}.googleapis.com/{TYPE}"`. */
  filter?: string;
}

export const ListProjectsLocationsKeyHandlesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/keyHandles",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsKeyHandlesRequest>;

export type ListProjectsLocationsKeyHandlesResponse = ListKeyHandlesResponse;
export const ListProjectsLocationsKeyHandlesResponse = ListKeyHandlesResponse;

export type ListProjectsLocationsKeyHandlesError = DefaultErrors;

/** Lists KeyHandles. */
export const listProjectsLocationsKeyHandles: API.PaginatedOperationMethod<
  ListProjectsLocationsKeyHandlesRequest,
  ListProjectsLocationsKeyHandlesResponse,
  ListProjectsLocationsKeyHandlesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsKeyHandlesRequest,
  output: ListProjectsLocationsKeyHandlesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListProjectsLocationsEkmConnectionsRequest {
  /** Required. The resource name of the location associated with the EkmConnections to list, in the format `projects/* /locations/*`. */
  parent: string;
  /** Optional. Optional limit on the number of EkmConnections to include in the response. Further EkmConnections can subsequently be obtained by including the ListEkmConnectionsResponse.next_page_token in a subsequent request. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. Optional pagination token, returned earlier via ListEkmConnectionsResponse.next_page_token. */
  pageToken?: string;
  /** Optional. Only include resources that match the filter in the response. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering). */
  filter?: string;
  /** Optional. Specify how the results should be sorted. If not specified, the results will be sorted in the default order. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering). */
  orderBy?: string;
}

export const ListProjectsLocationsEkmConnectionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/ekmConnections",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsEkmConnectionsRequest>;

export type ListProjectsLocationsEkmConnectionsResponse =
  ListEkmConnectionsResponse;
export const ListProjectsLocationsEkmConnectionsResponse =
  ListEkmConnectionsResponse;

export type ListProjectsLocationsEkmConnectionsError = DefaultErrors;

/** Lists EkmConnections. */
export const listProjectsLocationsEkmConnections: API.PaginatedOperationMethod<
  ListProjectsLocationsEkmConnectionsRequest,
  ListProjectsLocationsEkmConnectionsResponse,
  ListProjectsLocationsEkmConnectionsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsEkmConnectionsRequest,
  output: ListProjectsLocationsEkmConnectionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsEkmConnectionsRequest {
  /** Required. The name of the EkmConnection to get. */
  name: string;
}

export const GetProjectsLocationsEkmConnectionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/ekmConnections/{ekmConnectionsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsEkmConnectionsRequest>;

export type GetProjectsLocationsEkmConnectionsResponse = EkmConnection;
export const GetProjectsLocationsEkmConnectionsResponse = EkmConnection;

export type GetProjectsLocationsEkmConnectionsError = DefaultErrors;

/** Returns metadata for a given EkmConnection. */
export const getProjectsLocationsEkmConnections: API.OperationMethod<
  GetProjectsLocationsEkmConnectionsRequest,
  GetProjectsLocationsEkmConnectionsResponse,
  GetProjectsLocationsEkmConnectionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsEkmConnectionsRequest,
  output: GetProjectsLocationsEkmConnectionsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsEkmConnectionsRequest {
  /** Required. The resource name of the location associated with the EkmConnection, in the format `projects/* /locations/*`. */
  parent: string;
  /** Required. It must be unique within a location and match the regular expression `[a-zA-Z0-9_-]{1,63}`. */
  ekmConnectionId?: string;
  /** Request body */
  body?: EkmConnection;
}

export const CreateProjectsLocationsEkmConnectionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  ekmConnectionId: Schema.optional(Schema.String).pipe(
    T.HttpQuery("ekmConnectionId"),
  ),
  body: Schema.optional(EkmConnection).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/ekmConnections",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsEkmConnectionsRequest>;

export type CreateProjectsLocationsEkmConnectionsResponse = EkmConnection;
export const CreateProjectsLocationsEkmConnectionsResponse = EkmConnection;

export type CreateProjectsLocationsEkmConnectionsError = DefaultErrors;

/** Creates a new EkmConnection in a given Project and Location. */
export const createProjectsLocationsEkmConnections: API.OperationMethod<
  CreateProjectsLocationsEkmConnectionsRequest,
  CreateProjectsLocationsEkmConnectionsResponse,
  CreateProjectsLocationsEkmConnectionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsEkmConnectionsRequest,
  output: CreateProjectsLocationsEkmConnectionsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsEkmConnectionsRequest {
  /** Output only. The resource name for the EkmConnection in the format `projects/* /locations/* /ekmConnections/*`. */
  name: string;
  /** Required. List of fields to be updated in this request. */
  updateMask?: string;
  /** Request body */
  body?: EkmConnection;
}

export const PatchProjectsLocationsEkmConnectionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(EkmConnection).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1/projects/{projectsId}/locations/{locationsId}/ekmConnections/{ekmConnectionsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsEkmConnectionsRequest>;

export type PatchProjectsLocationsEkmConnectionsResponse = EkmConnection;
export const PatchProjectsLocationsEkmConnectionsResponse = EkmConnection;

export type PatchProjectsLocationsEkmConnectionsError = DefaultErrors;

/** Updates an EkmConnection's metadata. */
export const patchProjectsLocationsEkmConnections: API.OperationMethod<
  PatchProjectsLocationsEkmConnectionsRequest,
  PatchProjectsLocationsEkmConnectionsResponse,
  PatchProjectsLocationsEkmConnectionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsEkmConnectionsRequest,
  output: PatchProjectsLocationsEkmConnectionsResponse,
  errors: [],
}));

export interface VerifyConnectivityProjectsLocationsEkmConnectionsRequest {
  /** Required. The name of the EkmConnection to verify. */
  name: string;
}

export const VerifyConnectivityProjectsLocationsEkmConnectionsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/ekmConnections/{ekmConnectionsId}:verifyConnectivity",
    }),
    svc,
  ) as unknown as Schema.Schema<VerifyConnectivityProjectsLocationsEkmConnectionsRequest>;

export type VerifyConnectivityProjectsLocationsEkmConnectionsResponse =
  VerifyConnectivityResponse;
export const VerifyConnectivityProjectsLocationsEkmConnectionsResponse =
  VerifyConnectivityResponse;

export type VerifyConnectivityProjectsLocationsEkmConnectionsError =
  DefaultErrors;

/** Verifies that Cloud KMS can successfully connect to the external key manager specified by an EkmConnection. If there is an error connecting to the EKM, this method returns a FAILED_PRECONDITION status containing structured information as described at https://cloud.google.com/kms/docs/reference/ekm_errors. */
export const verifyConnectivityProjectsLocationsEkmConnections: API.OperationMethod<
  VerifyConnectivityProjectsLocationsEkmConnectionsRequest,
  VerifyConnectivityProjectsLocationsEkmConnectionsResponse,
  VerifyConnectivityProjectsLocationsEkmConnectionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: VerifyConnectivityProjectsLocationsEkmConnectionsRequest,
  output: VerifyConnectivityProjectsLocationsEkmConnectionsResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsEkmConnectionsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsEkmConnectionsRequest = Schema.Struct(
  {
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
  },
).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/ekmConnections/{ekmConnectionsId}:setIamPolicy",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsEkmConnectionsRequest>;

export type SetIamPolicyProjectsLocationsEkmConnectionsResponse = Policy;
export const SetIamPolicyProjectsLocationsEkmConnectionsResponse = Policy;

export type SetIamPolicyProjectsLocationsEkmConnectionsError = DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsEkmConnections: API.OperationMethod<
  SetIamPolicyProjectsLocationsEkmConnectionsRequest,
  SetIamPolicyProjectsLocationsEkmConnectionsResponse,
  SetIamPolicyProjectsLocationsEkmConnectionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsEkmConnectionsRequest,
  output: SetIamPolicyProjectsLocationsEkmConnectionsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsEkmConnectionsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsEkmConnectionsRequest = Schema.Struct(
  {
    resource: Schema.String.pipe(T.HttpPath("resource")),
    "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(
      T.HttpQuery("options.requestedPolicyVersion"),
    ),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/ekmConnections/{ekmConnectionsId}:getIamPolicy",
  }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsEkmConnectionsRequest>;

export type GetIamPolicyProjectsLocationsEkmConnectionsResponse = Policy;
export const GetIamPolicyProjectsLocationsEkmConnectionsResponse = Policy;

export type GetIamPolicyProjectsLocationsEkmConnectionsError = DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsEkmConnections: API.OperationMethod<
  GetIamPolicyProjectsLocationsEkmConnectionsRequest,
  GetIamPolicyProjectsLocationsEkmConnectionsResponse,
  GetIamPolicyProjectsLocationsEkmConnectionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsEkmConnectionsRequest,
  output: GetIamPolicyProjectsLocationsEkmConnectionsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsEkmConnectionsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsEkmConnectionsRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/ekmConnections/{ekmConnectionsId}:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsEkmConnectionsRequest>;

export type TestIamPermissionsProjectsLocationsEkmConnectionsResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsEkmConnectionsResponse =
  TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsEkmConnectionsError =
  DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsEkmConnections: API.OperationMethod<
  TestIamPermissionsProjectsLocationsEkmConnectionsRequest,
  TestIamPermissionsProjectsLocationsEkmConnectionsResponse,
  TestIamPermissionsProjectsLocationsEkmConnectionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsEkmConnectionsRequest,
  output: TestIamPermissionsProjectsLocationsEkmConnectionsResponse,
  errors: [],
}));

export interface ListProjectsLocationsSingleTenantHsmInstancesRequest {
  /** Required. The resource name of the location associated with the SingleTenantHsmInstances to list, in the format `projects/* /locations/*`. */
  parent: string;
  /** Optional. Optional limit on the number of SingleTenantHsmInstances to include in the response. Further SingleTenantHsmInstances can subsequently be obtained by including the ListSingleTenantHsmInstancesResponse.next_page_token in a subsequent request. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. Optional pagination token, returned earlier via ListSingleTenantHsmInstancesResponse.next_page_token. */
  pageToken?: string;
  /** Optional. Only include resources that match the filter in the response. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering). */
  filter?: string;
  /** Optional. Specify how the results should be sorted. If not specified, the results will be sorted in the default order. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering). */
  orderBy?: string;
  /** Optional. If set to true, HsmManagement.ListSingleTenantHsmInstances will also return SingleTenantHsmInstances in DELETED state. */
  showDeleted?: boolean;
}

export const ListProjectsLocationsSingleTenantHsmInstancesRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    showDeleted: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("showDeleted"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/singleTenantHsmInstances",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsSingleTenantHsmInstancesRequest>;

export type ListProjectsLocationsSingleTenantHsmInstancesResponse =
  ListSingleTenantHsmInstancesResponse;
export const ListProjectsLocationsSingleTenantHsmInstancesResponse =
  ListSingleTenantHsmInstancesResponse;

export type ListProjectsLocationsSingleTenantHsmInstancesError = DefaultErrors;

/** Lists SingleTenantHsmInstances. */
export const listProjectsLocationsSingleTenantHsmInstances: API.PaginatedOperationMethod<
  ListProjectsLocationsSingleTenantHsmInstancesRequest,
  ListProjectsLocationsSingleTenantHsmInstancesResponse,
  ListProjectsLocationsSingleTenantHsmInstancesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsSingleTenantHsmInstancesRequest,
  output: ListProjectsLocationsSingleTenantHsmInstancesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsSingleTenantHsmInstancesRequest {
  /** Required. The name of the SingleTenantHsmInstance to get. */
  name: string;
}

export const GetProjectsLocationsSingleTenantHsmInstancesRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/singleTenantHsmInstances/{singleTenantHsmInstancesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsSingleTenantHsmInstancesRequest>;

export type GetProjectsLocationsSingleTenantHsmInstancesResponse =
  SingleTenantHsmInstance;
export const GetProjectsLocationsSingleTenantHsmInstancesResponse =
  SingleTenantHsmInstance;

export type GetProjectsLocationsSingleTenantHsmInstancesError = DefaultErrors;

/** Returns metadata for a given SingleTenantHsmInstance. */
export const getProjectsLocationsSingleTenantHsmInstances: API.OperationMethod<
  GetProjectsLocationsSingleTenantHsmInstancesRequest,
  GetProjectsLocationsSingleTenantHsmInstancesResponse,
  GetProjectsLocationsSingleTenantHsmInstancesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsSingleTenantHsmInstancesRequest,
  output: GetProjectsLocationsSingleTenantHsmInstancesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsSingleTenantHsmInstancesRequest {
  /** Required. The resource name of the location associated with the SingleTenantHsmInstance, in the format `projects/* /locations/*`. */
  parent: string;
  /** Optional. It must be unique within a location and match the regular expression `[a-zA-Z0-9_-]{1,63}`. */
  singleTenantHsmInstanceId?: string;
  /** Request body */
  body?: SingleTenantHsmInstance;
}

export const CreateProjectsLocationsSingleTenantHsmInstancesRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    singleTenantHsmInstanceId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("singleTenantHsmInstanceId"),
    ),
    body: Schema.optional(SingleTenantHsmInstance).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/singleTenantHsmInstances",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsSingleTenantHsmInstancesRequest>;

export type CreateProjectsLocationsSingleTenantHsmInstancesResponse = Operation;
export const CreateProjectsLocationsSingleTenantHsmInstancesResponse =
  Operation;

export type CreateProjectsLocationsSingleTenantHsmInstancesError =
  DefaultErrors;

/** Creates a new SingleTenantHsmInstance in a given Project and Location. User must create a RegisterTwoFactorAuthKeys proposal with this single-tenant HSM instance to finish setup of the instance. */
export const createProjectsLocationsSingleTenantHsmInstances: API.OperationMethod<
  CreateProjectsLocationsSingleTenantHsmInstancesRequest,
  CreateProjectsLocationsSingleTenantHsmInstancesResponse,
  CreateProjectsLocationsSingleTenantHsmInstancesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsSingleTenantHsmInstancesRequest,
  output: CreateProjectsLocationsSingleTenantHsmInstancesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsSingleTenantHsmInstancesProposalsRequest {
  /** Required. The name of the SingleTenantHsmInstance associated with the SingleTenantHsmInstanceProposals. */
  parent: string;
  /** Optional. It must be unique within a location and match the regular expression `[a-zA-Z0-9_-]{1,63}`. */
  singleTenantHsmInstanceProposalId?: string;
  /** Request body */
  body?: SingleTenantHsmInstanceProposal;
}

export const CreateProjectsLocationsSingleTenantHsmInstancesProposalsRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    singleTenantHsmInstanceProposalId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("singleTenantHsmInstanceProposalId"),
    ),
    body: Schema.optional(SingleTenantHsmInstanceProposal).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/singleTenantHsmInstances/{singleTenantHsmInstancesId}/proposals",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsSingleTenantHsmInstancesProposalsRequest>;

export type CreateProjectsLocationsSingleTenantHsmInstancesProposalsResponse =
  Operation;
export const CreateProjectsLocationsSingleTenantHsmInstancesProposalsResponse =
  Operation;

export type CreateProjectsLocationsSingleTenantHsmInstancesProposalsError =
  DefaultErrors;

/** Creates a new SingleTenantHsmInstanceProposal for a given SingleTenantHsmInstance. */
export const createProjectsLocationsSingleTenantHsmInstancesProposals: API.OperationMethod<
  CreateProjectsLocationsSingleTenantHsmInstancesProposalsRequest,
  CreateProjectsLocationsSingleTenantHsmInstancesProposalsResponse,
  CreateProjectsLocationsSingleTenantHsmInstancesProposalsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsSingleTenantHsmInstancesProposalsRequest,
  output: CreateProjectsLocationsSingleTenantHsmInstancesProposalsResponse,
  errors: [],
}));

export interface ApproveProjectsLocationsSingleTenantHsmInstancesProposalsRequest {
  /** Required. The name of the SingleTenantHsmInstanceProposal to approve. */
  name: string;
  /** Request body */
  body?: ApproveSingleTenantHsmInstanceProposalRequest;
}

export const ApproveProjectsLocationsSingleTenantHsmInstancesProposalsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(ApproveSingleTenantHsmInstanceProposalRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/singleTenantHsmInstances/{singleTenantHsmInstancesId}/proposals/{proposalsId}:approve",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ApproveProjectsLocationsSingleTenantHsmInstancesProposalsRequest>;

export type ApproveProjectsLocationsSingleTenantHsmInstancesProposalsResponse =
  ApproveSingleTenantHsmInstanceProposalResponse;
export const ApproveProjectsLocationsSingleTenantHsmInstancesProposalsResponse =
  ApproveSingleTenantHsmInstanceProposalResponse;

export type ApproveProjectsLocationsSingleTenantHsmInstancesProposalsError =
  DefaultErrors;

/** Approves a SingleTenantHsmInstanceProposal for a given SingleTenantHsmInstance. The proposal must be in the PENDING state. */
export const approveProjectsLocationsSingleTenantHsmInstancesProposals: API.OperationMethod<
  ApproveProjectsLocationsSingleTenantHsmInstancesProposalsRequest,
  ApproveProjectsLocationsSingleTenantHsmInstancesProposalsResponse,
  ApproveProjectsLocationsSingleTenantHsmInstancesProposalsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ApproveProjectsLocationsSingleTenantHsmInstancesProposalsRequest,
  output: ApproveProjectsLocationsSingleTenantHsmInstancesProposalsResponse,
  errors: [],
}));

export interface ExecuteProjectsLocationsSingleTenantHsmInstancesProposalsRequest {
  /** Required. The name of the SingleTenantHsmInstanceProposal to execute. */
  name: string;
  /** Request body */
  body?: ExecuteSingleTenantHsmInstanceProposalRequest;
}

export const ExecuteProjectsLocationsSingleTenantHsmInstancesProposalsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(ExecuteSingleTenantHsmInstanceProposalRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/singleTenantHsmInstances/{singleTenantHsmInstancesId}/proposals/{proposalsId}:execute",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ExecuteProjectsLocationsSingleTenantHsmInstancesProposalsRequest>;

export type ExecuteProjectsLocationsSingleTenantHsmInstancesProposalsResponse =
  Operation;
export const ExecuteProjectsLocationsSingleTenantHsmInstancesProposalsResponse =
  Operation;

export type ExecuteProjectsLocationsSingleTenantHsmInstancesProposalsError =
  DefaultErrors;

/** Executes a SingleTenantHsmInstanceProposal for a given SingleTenantHsmInstance. The proposal must be in the APPROVED state. */
export const executeProjectsLocationsSingleTenantHsmInstancesProposals: API.OperationMethod<
  ExecuteProjectsLocationsSingleTenantHsmInstancesProposalsRequest,
  ExecuteProjectsLocationsSingleTenantHsmInstancesProposalsResponse,
  ExecuteProjectsLocationsSingleTenantHsmInstancesProposalsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ExecuteProjectsLocationsSingleTenantHsmInstancesProposalsRequest,
  output: ExecuteProjectsLocationsSingleTenantHsmInstancesProposalsResponse,
  errors: [],
}));

export interface GetProjectsLocationsSingleTenantHsmInstancesProposalsRequest {
  /** Required. The name of the SingleTenantHsmInstanceProposal to get. */
  name: string;
}

export const GetProjectsLocationsSingleTenantHsmInstancesProposalsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/singleTenantHsmInstances/{singleTenantHsmInstancesId}/proposals/{proposalsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsSingleTenantHsmInstancesProposalsRequest>;

export type GetProjectsLocationsSingleTenantHsmInstancesProposalsResponse =
  SingleTenantHsmInstanceProposal;
export const GetProjectsLocationsSingleTenantHsmInstancesProposalsResponse =
  SingleTenantHsmInstanceProposal;

export type GetProjectsLocationsSingleTenantHsmInstancesProposalsError =
  DefaultErrors;

/** Returns metadata for a given SingleTenantHsmInstanceProposal. */
export const getProjectsLocationsSingleTenantHsmInstancesProposals: API.OperationMethod<
  GetProjectsLocationsSingleTenantHsmInstancesProposalsRequest,
  GetProjectsLocationsSingleTenantHsmInstancesProposalsResponse,
  GetProjectsLocationsSingleTenantHsmInstancesProposalsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsSingleTenantHsmInstancesProposalsRequest,
  output: GetProjectsLocationsSingleTenantHsmInstancesProposalsResponse,
  errors: [],
}));

export interface ListProjectsLocationsSingleTenantHsmInstancesProposalsRequest {
  /** Required. The resource name of the single tenant HSM instance associated with the SingleTenantHsmInstanceProposals to list, in the format `projects/* /locations/* /singleTenantHsmInstances/*`. */
  parent: string;
  /** Optional. Optional limit on the number of SingleTenantHsmInstanceProposals to include in the response. Further SingleTenantHsmInstanceProposals can subsequently be obtained by including the ListSingleTenantHsmInstanceProposalsResponse.next_page_token in a subsequent request. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. Optional pagination token, returned earlier via ListSingleTenantHsmInstanceProposalsResponse.next_page_token. */
  pageToken?: string;
  /** Optional. Only include resources that match the filter in the response. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering). */
  filter?: string;
  /** Optional. Specify how the results should be sorted. If not specified, the results will be sorted in the default order. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering). */
  orderBy?: string;
  /** Optional. If set to true, HsmManagement.ListSingleTenantHsmInstanceProposals will also return SingleTenantHsmInstanceProposals in DELETED state. */
  showDeleted?: boolean;
}

export const ListProjectsLocationsSingleTenantHsmInstancesProposalsRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    showDeleted: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("showDeleted"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/singleTenantHsmInstances/{singleTenantHsmInstancesId}/proposals",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsSingleTenantHsmInstancesProposalsRequest>;

export type ListProjectsLocationsSingleTenantHsmInstancesProposalsResponse =
  ListSingleTenantHsmInstanceProposalsResponse;
export const ListProjectsLocationsSingleTenantHsmInstancesProposalsResponse =
  ListSingleTenantHsmInstanceProposalsResponse;

export type ListProjectsLocationsSingleTenantHsmInstancesProposalsError =
  DefaultErrors;

/** Lists SingleTenantHsmInstanceProposals. */
export const listProjectsLocationsSingleTenantHsmInstancesProposals: API.PaginatedOperationMethod<
  ListProjectsLocationsSingleTenantHsmInstancesProposalsRequest,
  ListProjectsLocationsSingleTenantHsmInstancesProposalsResponse,
  ListProjectsLocationsSingleTenantHsmInstancesProposalsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsSingleTenantHsmInstancesProposalsRequest,
  output: ListProjectsLocationsSingleTenantHsmInstancesProposalsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsSingleTenantHsmInstancesProposalsRequest {
  /** Required. The name of the SingleTenantHsmInstanceProposal to delete. */
  name: string;
}

export const DeleteProjectsLocationsSingleTenantHsmInstancesProposalsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/singleTenantHsmInstances/{singleTenantHsmInstancesId}/proposals/{proposalsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsSingleTenantHsmInstancesProposalsRequest>;

export type DeleteProjectsLocationsSingleTenantHsmInstancesProposalsResponse =
  Empty;
export const DeleteProjectsLocationsSingleTenantHsmInstancesProposalsResponse =
  Empty;

export type DeleteProjectsLocationsSingleTenantHsmInstancesProposalsError =
  DefaultErrors;

/** Deletes a SingleTenantHsmInstanceProposal. */
export const deleteProjectsLocationsSingleTenantHsmInstancesProposals: API.OperationMethod<
  DeleteProjectsLocationsSingleTenantHsmInstancesProposalsRequest,
  DeleteProjectsLocationsSingleTenantHsmInstancesProposalsResponse,
  DeleteProjectsLocationsSingleTenantHsmInstancesProposalsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsSingleTenantHsmInstancesProposalsRequest,
  output: DeleteProjectsLocationsSingleTenantHsmInstancesProposalsResponse,
  errors: [],
}));

export interface ListProjectsLocationsKeyRingsRequest {
  /** Required. The resource name of the location associated with the KeyRings, in the format `projects/* /locations/*`. */
  parent: string;
  /** Optional. Optional limit on the number of KeyRings to include in the response. Further KeyRings can subsequently be obtained by including the ListKeyRingsResponse.next_page_token in a subsequent request. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. Optional pagination token, returned earlier via ListKeyRingsResponse.next_page_token. */
  pageToken?: string;
  /** Optional. Only include resources that match the filter in the response. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering). */
  filter?: string;
  /** Optional. Specify how the results should be sorted. If not specified, the results will be sorted in the default order. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering). */
  orderBy?: string;
}

export const ListProjectsLocationsKeyRingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsKeyRingsRequest>;

export type ListProjectsLocationsKeyRingsResponse = ListKeyRingsResponse;
export const ListProjectsLocationsKeyRingsResponse = ListKeyRingsResponse;

export type ListProjectsLocationsKeyRingsError = DefaultErrors;

/** Lists KeyRings. */
export const listProjectsLocationsKeyRings: API.PaginatedOperationMethod<
  ListProjectsLocationsKeyRingsRequest,
  ListProjectsLocationsKeyRingsResponse,
  ListProjectsLocationsKeyRingsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsKeyRingsRequest,
  output: ListProjectsLocationsKeyRingsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsKeyRingsRequest {
  /** Required. The name of the KeyRing to get. */
  name: string;
}

export const GetProjectsLocationsKeyRingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings/{keyRingsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsKeyRingsRequest>;

export type GetProjectsLocationsKeyRingsResponse = KeyRing;
export const GetProjectsLocationsKeyRingsResponse = KeyRing;

export type GetProjectsLocationsKeyRingsError = DefaultErrors;

/** Returns metadata for a given KeyRing. */
export const getProjectsLocationsKeyRings: API.OperationMethod<
  GetProjectsLocationsKeyRingsRequest,
  GetProjectsLocationsKeyRingsResponse,
  GetProjectsLocationsKeyRingsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsKeyRingsRequest,
  output: GetProjectsLocationsKeyRingsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsKeyRingsRequest {
  /** Required. The resource name of the location associated with the KeyRings, in the format `projects/* /locations/*`. */
  parent: string;
  /** Required. It must be unique within a location and match the regular expression `[a-zA-Z0-9_-]{1,63}` */
  keyRingId?: string;
  /** Request body */
  body?: KeyRing;
}

export const CreateProjectsLocationsKeyRingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  keyRingId: Schema.optional(Schema.String).pipe(T.HttpQuery("keyRingId")),
  body: Schema.optional(KeyRing).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsKeyRingsRequest>;

export type CreateProjectsLocationsKeyRingsResponse = KeyRing;
export const CreateProjectsLocationsKeyRingsResponse = KeyRing;

export type CreateProjectsLocationsKeyRingsError = DefaultErrors;

/** Create a new KeyRing in a given Project and Location. */
export const createProjectsLocationsKeyRings: API.OperationMethod<
  CreateProjectsLocationsKeyRingsRequest,
  CreateProjectsLocationsKeyRingsResponse,
  CreateProjectsLocationsKeyRingsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsKeyRingsRequest,
  output: CreateProjectsLocationsKeyRingsResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsKeyRingsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsKeyRingsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings/{keyRingsId}:setIamPolicy",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsKeyRingsRequest>;

export type SetIamPolicyProjectsLocationsKeyRingsResponse = Policy;
export const SetIamPolicyProjectsLocationsKeyRingsResponse = Policy;

export type SetIamPolicyProjectsLocationsKeyRingsError = DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsKeyRings: API.OperationMethod<
  SetIamPolicyProjectsLocationsKeyRingsRequest,
  SetIamPolicyProjectsLocationsKeyRingsResponse,
  SetIamPolicyProjectsLocationsKeyRingsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsKeyRingsRequest,
  output: SetIamPolicyProjectsLocationsKeyRingsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsKeyRingsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsKeyRingsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("options.requestedPolicyVersion"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings/{keyRingsId}:getIamPolicy",
  }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsKeyRingsRequest>;

export type GetIamPolicyProjectsLocationsKeyRingsResponse = Policy;
export const GetIamPolicyProjectsLocationsKeyRingsResponse = Policy;

export type GetIamPolicyProjectsLocationsKeyRingsError = DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsKeyRings: API.OperationMethod<
  GetIamPolicyProjectsLocationsKeyRingsRequest,
  GetIamPolicyProjectsLocationsKeyRingsResponse,
  GetIamPolicyProjectsLocationsKeyRingsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsKeyRingsRequest,
  output: GetIamPolicyProjectsLocationsKeyRingsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsKeyRingsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsKeyRingsRequest = Schema.Struct(
  {
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  },
).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings/{keyRingsId}:testIamPermissions",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsKeyRingsRequest>;

export type TestIamPermissionsProjectsLocationsKeyRingsResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsKeyRingsResponse =
  TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsKeyRingsError = DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsKeyRings: API.OperationMethod<
  TestIamPermissionsProjectsLocationsKeyRingsRequest,
  TestIamPermissionsProjectsLocationsKeyRingsResponse,
  TestIamPermissionsProjectsLocationsKeyRingsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsKeyRingsRequest,
  output: TestIamPermissionsProjectsLocationsKeyRingsResponse,
  errors: [],
}));

export interface ListProjectsLocationsKeyRingsCryptoKeysRequest {
  /** Required. The resource name of the KeyRing to list, in the format `projects/* /locations/* /keyRings/*`. */
  parent: string;
  /** Optional. Optional limit on the number of CryptoKeys to include in the response. Further CryptoKeys can subsequently be obtained by including the ListCryptoKeysResponse.next_page_token in a subsequent request. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. Optional pagination token, returned earlier via ListCryptoKeysResponse.next_page_token. */
  pageToken?: string;
  /** The fields of the primary version to include in the response. */
  versionView?: "CRYPTO_KEY_VERSION_VIEW_UNSPECIFIED" | "FULL" | (string & {});
  /** Optional. Only include resources that match the filter in the response. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering). */
  filter?: string;
  /** Optional. Specify how the results should be sorted. If not specified, the results will be sorted in the default order. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering). */
  orderBy?: string;
}

export const ListProjectsLocationsKeyRingsCryptoKeysRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  versionView: Schema.optional(Schema.String).pipe(T.HttpQuery("versionView")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings/{keyRingsId}/cryptoKeys",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsKeyRingsCryptoKeysRequest>;

export type ListProjectsLocationsKeyRingsCryptoKeysResponse =
  ListCryptoKeysResponse;
export const ListProjectsLocationsKeyRingsCryptoKeysResponse =
  ListCryptoKeysResponse;

export type ListProjectsLocationsKeyRingsCryptoKeysError = DefaultErrors;

/** Lists CryptoKeys. */
export const listProjectsLocationsKeyRingsCryptoKeys: API.PaginatedOperationMethod<
  ListProjectsLocationsKeyRingsCryptoKeysRequest,
  ListProjectsLocationsKeyRingsCryptoKeysResponse,
  ListProjectsLocationsKeyRingsCryptoKeysError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsKeyRingsCryptoKeysRequest,
  output: ListProjectsLocationsKeyRingsCryptoKeysResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsKeyRingsCryptoKeysRequest {
  /** Required. The name of the CryptoKey to get. */
  name: string;
}

export const GetProjectsLocationsKeyRingsCryptoKeysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings/{keyRingsId}/cryptoKeys/{cryptoKeysId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsKeyRingsCryptoKeysRequest>;

export type GetProjectsLocationsKeyRingsCryptoKeysResponse = CryptoKey;
export const GetProjectsLocationsKeyRingsCryptoKeysResponse = CryptoKey;

export type GetProjectsLocationsKeyRingsCryptoKeysError = DefaultErrors;

/** Returns metadata for a given CryptoKey, as well as its primary CryptoKeyVersion. */
export const getProjectsLocationsKeyRingsCryptoKeys: API.OperationMethod<
  GetProjectsLocationsKeyRingsCryptoKeysRequest,
  GetProjectsLocationsKeyRingsCryptoKeysResponse,
  GetProjectsLocationsKeyRingsCryptoKeysError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsKeyRingsCryptoKeysRequest,
  output: GetProjectsLocationsKeyRingsCryptoKeysResponse,
  errors: [],
}));

export interface CreateProjectsLocationsKeyRingsCryptoKeysRequest {
  /** Required. The name of the KeyRing associated with the CryptoKeys. */
  parent: string;
  /** Required. It must be unique within a KeyRing and match the regular expression `[a-zA-Z0-9_-]{1,63}` */
  cryptoKeyId?: string;
  /** If set to true, the request will create a CryptoKey without any CryptoKeyVersions. You must manually call CreateCryptoKeyVersion or ImportCryptoKeyVersion before you can use this CryptoKey. */
  skipInitialVersionCreation?: boolean;
  /** Request body */
  body?: CryptoKey;
}

export const CreateProjectsLocationsKeyRingsCryptoKeysRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  cryptoKeyId: Schema.optional(Schema.String).pipe(T.HttpQuery("cryptoKeyId")),
  skipInitialVersionCreation: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("skipInitialVersionCreation"),
  ),
  body: Schema.optional(CryptoKey).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings/{keyRingsId}/cryptoKeys",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsKeyRingsCryptoKeysRequest>;

export type CreateProjectsLocationsKeyRingsCryptoKeysResponse = CryptoKey;
export const CreateProjectsLocationsKeyRingsCryptoKeysResponse = CryptoKey;

export type CreateProjectsLocationsKeyRingsCryptoKeysError = DefaultErrors;

/** Create a new CryptoKey within a KeyRing. CryptoKey.purpose and CryptoKey.version_template.algorithm are required. */
export const createProjectsLocationsKeyRingsCryptoKeys: API.OperationMethod<
  CreateProjectsLocationsKeyRingsCryptoKeysRequest,
  CreateProjectsLocationsKeyRingsCryptoKeysResponse,
  CreateProjectsLocationsKeyRingsCryptoKeysError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsKeyRingsCryptoKeysRequest,
  output: CreateProjectsLocationsKeyRingsCryptoKeysResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsKeyRingsCryptoKeysRequest {
  /** Required. The name of the CryptoKey to delete. */
  name: string;
}

export const DeleteProjectsLocationsKeyRingsCryptoKeysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings/{keyRingsId}/cryptoKeys/{cryptoKeysId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsKeyRingsCryptoKeysRequest>;

export type DeleteProjectsLocationsKeyRingsCryptoKeysResponse = Operation;
export const DeleteProjectsLocationsKeyRingsCryptoKeysResponse = Operation;

export type DeleteProjectsLocationsKeyRingsCryptoKeysError = DefaultErrors;

/** Permanently deletes the given CryptoKey. All child CryptoKeyVersions must have been previously deleted using KeyManagementService.DeleteCryptoKeyVersion. The specified crypto key will be immediately and permanently deleted upon calling this method. This action cannot be undone. */
export const deleteProjectsLocationsKeyRingsCryptoKeys: API.OperationMethod<
  DeleteProjectsLocationsKeyRingsCryptoKeysRequest,
  DeleteProjectsLocationsKeyRingsCryptoKeysResponse,
  DeleteProjectsLocationsKeyRingsCryptoKeysError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsKeyRingsCryptoKeysRequest,
  output: DeleteProjectsLocationsKeyRingsCryptoKeysResponse,
  errors: [],
}));

export interface PatchProjectsLocationsKeyRingsCryptoKeysRequest {
  /** Output only. The resource name for this CryptoKey in the format `projects/* /locations/* /keyRings/* /cryptoKeys/*`. */
  name: string;
  /** Required. List of fields to be updated in this request. */
  updateMask?: string;
  /** Request body */
  body?: CryptoKey;
}

export const PatchProjectsLocationsKeyRingsCryptoKeysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(CryptoKey).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings/{keyRingsId}/cryptoKeys/{cryptoKeysId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsKeyRingsCryptoKeysRequest>;

export type PatchProjectsLocationsKeyRingsCryptoKeysResponse = CryptoKey;
export const PatchProjectsLocationsKeyRingsCryptoKeysResponse = CryptoKey;

export type PatchProjectsLocationsKeyRingsCryptoKeysError = DefaultErrors;

/** Update a CryptoKey. */
export const patchProjectsLocationsKeyRingsCryptoKeys: API.OperationMethod<
  PatchProjectsLocationsKeyRingsCryptoKeysRequest,
  PatchProjectsLocationsKeyRingsCryptoKeysResponse,
  PatchProjectsLocationsKeyRingsCryptoKeysError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsKeyRingsCryptoKeysRequest,
  output: PatchProjectsLocationsKeyRingsCryptoKeysResponse,
  errors: [],
}));

export interface UpdatePrimaryVersionProjectsLocationsKeyRingsCryptoKeysRequest {
  /** Required. The resource name of the CryptoKey to update. */
  name: string;
  /** Request body */
  body?: UpdateCryptoKeyPrimaryVersionRequest;
}

export const UpdatePrimaryVersionProjectsLocationsKeyRingsCryptoKeysRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(UpdateCryptoKeyPrimaryVersionRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings/{keyRingsId}/cryptoKeys/{cryptoKeysId}:updatePrimaryVersion",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdatePrimaryVersionProjectsLocationsKeyRingsCryptoKeysRequest>;

export type UpdatePrimaryVersionProjectsLocationsKeyRingsCryptoKeysResponse =
  CryptoKey;
export const UpdatePrimaryVersionProjectsLocationsKeyRingsCryptoKeysResponse =
  CryptoKey;

export type UpdatePrimaryVersionProjectsLocationsKeyRingsCryptoKeysError =
  DefaultErrors;

/** Update the version of a CryptoKey that will be used in Encrypt. Returns an error if called on a key whose purpose is not ENCRYPT_DECRYPT. */
export const updatePrimaryVersionProjectsLocationsKeyRingsCryptoKeys: API.OperationMethod<
  UpdatePrimaryVersionProjectsLocationsKeyRingsCryptoKeysRequest,
  UpdatePrimaryVersionProjectsLocationsKeyRingsCryptoKeysResponse,
  UpdatePrimaryVersionProjectsLocationsKeyRingsCryptoKeysError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdatePrimaryVersionProjectsLocationsKeyRingsCryptoKeysRequest,
  output: UpdatePrimaryVersionProjectsLocationsKeyRingsCryptoKeysResponse,
  errors: [],
}));

export interface EncryptProjectsLocationsKeyRingsCryptoKeysRequest {
  /** Required. The resource name of the CryptoKey or CryptoKeyVersion to use for encryption. If a CryptoKey is specified, the server will use its primary version. */
  name: string;
  /** Request body */
  body?: EncryptRequest;
}

export const EncryptProjectsLocationsKeyRingsCryptoKeysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(EncryptRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings/{keyRingsId}/cryptoKeys/{cryptoKeysId}:encrypt",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<EncryptProjectsLocationsKeyRingsCryptoKeysRequest>;

export type EncryptProjectsLocationsKeyRingsCryptoKeysResponse =
  EncryptResponse;
export const EncryptProjectsLocationsKeyRingsCryptoKeysResponse =
  EncryptResponse;

export type EncryptProjectsLocationsKeyRingsCryptoKeysError = DefaultErrors;

/** Encrypts data, so that it can only be recovered by a call to Decrypt. The CryptoKey.purpose must be ENCRYPT_DECRYPT. */
export const encryptProjectsLocationsKeyRingsCryptoKeys: API.OperationMethod<
  EncryptProjectsLocationsKeyRingsCryptoKeysRequest,
  EncryptProjectsLocationsKeyRingsCryptoKeysResponse,
  EncryptProjectsLocationsKeyRingsCryptoKeysError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: EncryptProjectsLocationsKeyRingsCryptoKeysRequest,
  output: EncryptProjectsLocationsKeyRingsCryptoKeysResponse,
  errors: [],
}));

export interface DecryptProjectsLocationsKeyRingsCryptoKeysRequest {
  /** Required. The resource name of the CryptoKey to use for decryption. The server will choose the appropriate version. */
  name: string;
  /** Request body */
  body?: DecryptRequest;
}

export const DecryptProjectsLocationsKeyRingsCryptoKeysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(DecryptRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings/{keyRingsId}/cryptoKeys/{cryptoKeysId}:decrypt",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<DecryptProjectsLocationsKeyRingsCryptoKeysRequest>;

export type DecryptProjectsLocationsKeyRingsCryptoKeysResponse =
  DecryptResponse;
export const DecryptProjectsLocationsKeyRingsCryptoKeysResponse =
  DecryptResponse;

export type DecryptProjectsLocationsKeyRingsCryptoKeysError = DefaultErrors;

/** Decrypts data that was protected by Encrypt. The CryptoKey.purpose must be ENCRYPT_DECRYPT. */
export const decryptProjectsLocationsKeyRingsCryptoKeys: API.OperationMethod<
  DecryptProjectsLocationsKeyRingsCryptoKeysRequest,
  DecryptProjectsLocationsKeyRingsCryptoKeysResponse,
  DecryptProjectsLocationsKeyRingsCryptoKeysError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DecryptProjectsLocationsKeyRingsCryptoKeysRequest,
  output: DecryptProjectsLocationsKeyRingsCryptoKeysResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsKeyRingsCryptoKeysRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsKeyRingsCryptoKeysRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings/{keyRingsId}/cryptoKeys/{cryptoKeysId}:setIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsKeyRingsCryptoKeysRequest>;

export type SetIamPolicyProjectsLocationsKeyRingsCryptoKeysResponse = Policy;
export const SetIamPolicyProjectsLocationsKeyRingsCryptoKeysResponse = Policy;

export type SetIamPolicyProjectsLocationsKeyRingsCryptoKeysError =
  DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsKeyRingsCryptoKeys: API.OperationMethod<
  SetIamPolicyProjectsLocationsKeyRingsCryptoKeysRequest,
  SetIamPolicyProjectsLocationsKeyRingsCryptoKeysResponse,
  SetIamPolicyProjectsLocationsKeyRingsCryptoKeysError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsKeyRingsCryptoKeysRequest,
  output: SetIamPolicyProjectsLocationsKeyRingsCryptoKeysResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsKeyRingsCryptoKeysRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsKeyRingsCryptoKeysRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(
      T.HttpQuery("options.requestedPolicyVersion"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings/{keyRingsId}/cryptoKeys/{cryptoKeysId}:getIamPolicy",
    }),
    svc,
  ) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsKeyRingsCryptoKeysRequest>;

export type GetIamPolicyProjectsLocationsKeyRingsCryptoKeysResponse = Policy;
export const GetIamPolicyProjectsLocationsKeyRingsCryptoKeysResponse = Policy;

export type GetIamPolicyProjectsLocationsKeyRingsCryptoKeysError =
  DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsKeyRingsCryptoKeys: API.OperationMethod<
  GetIamPolicyProjectsLocationsKeyRingsCryptoKeysRequest,
  GetIamPolicyProjectsLocationsKeyRingsCryptoKeysResponse,
  GetIamPolicyProjectsLocationsKeyRingsCryptoKeysError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsKeyRingsCryptoKeysRequest,
  output: GetIamPolicyProjectsLocationsKeyRingsCryptoKeysResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsKeyRingsCryptoKeysRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsKeyRingsCryptoKeysRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings/{keyRingsId}/cryptoKeys/{cryptoKeysId}:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsKeyRingsCryptoKeysRequest>;

export type TestIamPermissionsProjectsLocationsKeyRingsCryptoKeysResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsKeyRingsCryptoKeysResponse =
  TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsKeyRingsCryptoKeysError =
  DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsKeyRingsCryptoKeys: API.OperationMethod<
  TestIamPermissionsProjectsLocationsKeyRingsCryptoKeysRequest,
  TestIamPermissionsProjectsLocationsKeyRingsCryptoKeysResponse,
  TestIamPermissionsProjectsLocationsKeyRingsCryptoKeysError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsKeyRingsCryptoKeysRequest,
  output: TestIamPermissionsProjectsLocationsKeyRingsCryptoKeysResponse,
  errors: [],
}));

export interface ListProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest {
  /** Required. The resource name of the CryptoKey to list, in the format `projects/* /locations/* /keyRings/* /cryptoKeys/*`. */
  parent: string;
  /** Optional. Optional limit on the number of CryptoKeyVersions to include in the response. Further CryptoKeyVersions can subsequently be obtained by including the ListCryptoKeyVersionsResponse.next_page_token in a subsequent request. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. Optional pagination token, returned earlier via ListCryptoKeyVersionsResponse.next_page_token. */
  pageToken?: string;
  /** The fields to include in the response. */
  view?: "CRYPTO_KEY_VERSION_VIEW_UNSPECIFIED" | "FULL" | (string & {});
  /** Optional. Only include resources that match the filter in the response. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering). */
  filter?: string;
  /** Optional. Specify how the results should be sorted. If not specified, the results will be sorted in the default order. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering). */
  orderBy?: string;
}

export const ListProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings/{keyRingsId}/cryptoKeys/{cryptoKeysId}/cryptoKeyVersions",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest>;

export type ListProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse =
  ListCryptoKeyVersionsResponse;
export const ListProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse =
  ListCryptoKeyVersionsResponse;

export type ListProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsError =
  DefaultErrors;

/** Lists CryptoKeyVersions. */
export const listProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersions: API.PaginatedOperationMethod<
  ListProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest,
  ListProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse,
  ListProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest,
  output: ListProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest {
  /** Required. The name of the CryptoKeyVersion to get. */
  name: string;
}

export const GetProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings/{keyRingsId}/cryptoKeys/{cryptoKeysId}/cryptoKeyVersions/{cryptoKeyVersionsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest>;

export type GetProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse =
  CryptoKeyVersion;
export const GetProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse =
  CryptoKeyVersion;

export type GetProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsError =
  DefaultErrors;

/** Returns metadata for a given CryptoKeyVersion. */
export const getProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersions: API.OperationMethod<
  GetProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest,
  GetProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse,
  GetProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest,
  output: GetProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse,
  errors: [],
}));

export interface GetPublicKeyProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest {
  /** Required. The name of the CryptoKeyVersion public key to get. */
  name: string;
  /** Optional. The PublicKey format specified by the user. This field is required for PQC algorithms. If specified, the public key will be exported through the public_key field in the requested format. Otherwise, the pem field will be populated for non-PQC algorithms, and an error will be returned for PQC algorithms. */
  publicKeyFormat?:
    | "PUBLIC_KEY_FORMAT_UNSPECIFIED"
    | "PEM"
    | "DER"
    | "NIST_PQC"
    | "XWING_RAW_BYTES"
    | (string & {});
}

export const GetPublicKeyProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    publicKeyFormat: Schema.optional(Schema.String).pipe(
      T.HttpQuery("publicKeyFormat"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings/{keyRingsId}/cryptoKeys/{cryptoKeysId}/cryptoKeyVersions/{cryptoKeyVersionsId}/publicKey",
    }),
    svc,
  ) as unknown as Schema.Schema<GetPublicKeyProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest>;

export type GetPublicKeyProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse =
  PublicKey;
export const GetPublicKeyProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse =
  PublicKey;

export type GetPublicKeyProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsError =
  DefaultErrors;

/** Returns the public key for the given CryptoKeyVersion. The CryptoKey.purpose must be ASYMMETRIC_SIGN or ASYMMETRIC_DECRYPT. */
export const getPublicKeyProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersions: API.OperationMethod<
  GetPublicKeyProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest,
  GetPublicKeyProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse,
  GetPublicKeyProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input:
    GetPublicKeyProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest,
  output:
    GetPublicKeyProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest {
  /** Required. The name of the CryptoKey associated with the CryptoKeyVersions. */
  parent: string;
  /** Request body */
  body?: CryptoKeyVersion;
}

export const CreateProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(CryptoKeyVersion).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings/{keyRingsId}/cryptoKeys/{cryptoKeysId}/cryptoKeyVersions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest>;

export type CreateProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse =
  CryptoKeyVersion;
export const CreateProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse =
  CryptoKeyVersion;

export type CreateProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsError =
  DefaultErrors;

/** Create a new CryptoKeyVersion in a CryptoKey. The server will assign the next sequential id. If unset, state will be set to ENABLED. */
export const createProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersions: API.OperationMethod<
  CreateProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest,
  CreateProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse,
  CreateProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest,
  output: CreateProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest {
  /** Required. The name of the CryptoKeyVersion to delete. */
  name: string;
}

export const DeleteProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings/{keyRingsId}/cryptoKeys/{cryptoKeysId}/cryptoKeyVersions/{cryptoKeyVersionsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest>;

export type DeleteProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse =
  Operation;
export const DeleteProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse =
  Operation;

export type DeleteProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsError =
  DefaultErrors;

/** Permanently deletes the given CryptoKeyVersion. Only possible if the version has not been previously imported and if its state is one of DESTROYED, IMPORT_FAILED, or GENERATION_FAILED. Successfully imported CryptoKeyVersions cannot be deleted at this time. The specified version will be immediately and permanently deleted upon calling this method. This action cannot be undone. */
export const deleteProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersions: API.OperationMethod<
  DeleteProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest,
  DeleteProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse,
  DeleteProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest,
  output: DeleteProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse,
  errors: [],
}));

export interface ImportProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest {
  /** Required. The name of the CryptoKey to be imported into. The create permission is only required on this key when creating a new CryptoKeyVersion. */
  parent: string;
  /** Request body */
  body?: ImportCryptoKeyVersionRequest;
}

export const ImportProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(ImportCryptoKeyVersionRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings/{keyRingsId}/cryptoKeys/{cryptoKeysId}/cryptoKeyVersions:import",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ImportProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest>;

export type ImportProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse =
  CryptoKeyVersion;
export const ImportProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse =
  CryptoKeyVersion;

export type ImportProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsError =
  DefaultErrors;

/** Import wrapped key material into a CryptoKeyVersion. All requests must specify a CryptoKey. If a CryptoKeyVersion is additionally specified in the request, key material will be reimported into that version. Otherwise, a new version will be created, and will be assigned the next sequential id within the CryptoKey. */
export const importProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersions: API.OperationMethod<
  ImportProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest,
  ImportProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse,
  ImportProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ImportProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest,
  output: ImportProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest {
  /** Output only. The resource name for this CryptoKeyVersion in the format `projects/* /locations/* /keyRings/* /cryptoKeys/* /cryptoKeyVersions/*`. */
  name: string;
  /** Required. List of fields to be updated in this request. */
  updateMask?: string;
  /** Request body */
  body?: CryptoKeyVersion;
}

export const PatchProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(CryptoKeyVersion).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings/{keyRingsId}/cryptoKeys/{cryptoKeysId}/cryptoKeyVersions/{cryptoKeyVersionsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest>;

export type PatchProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse =
  CryptoKeyVersion;
export const PatchProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse =
  CryptoKeyVersion;

export type PatchProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsError =
  DefaultErrors;

/** Update a CryptoKeyVersion's metadata. state may be changed between ENABLED and DISABLED using this method. See DestroyCryptoKeyVersion and RestoreCryptoKeyVersion to move between other states. */
export const patchProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersions: API.OperationMethod<
  PatchProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest,
  PatchProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse,
  PatchProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest,
  output: PatchProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse,
  errors: [],
}));

export interface DestroyProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest {
  /** Required. The resource name of the CryptoKeyVersion to destroy. */
  name: string;
  /** Request body */
  body?: DestroyCryptoKeyVersionRequest;
}

export const DestroyProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(DestroyCryptoKeyVersionRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings/{keyRingsId}/cryptoKeys/{cryptoKeysId}/cryptoKeyVersions/{cryptoKeyVersionsId}:destroy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<DestroyProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest>;

export type DestroyProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse =
  CryptoKeyVersion;
export const DestroyProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse =
  CryptoKeyVersion;

export type DestroyProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsError =
  DefaultErrors;

/** Schedule a CryptoKeyVersion for destruction. Upon calling this method, CryptoKeyVersion.state will be set to DESTROY_SCHEDULED, and destroy_time will be set to the time destroy_scheduled_duration in the future. At that time, the state will automatically change to DESTROYED, and the key material will be irrevocably destroyed. Before the destroy_time is reached, RestoreCryptoKeyVersion may be called to reverse the process. */
export const destroyProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersions: API.OperationMethod<
  DestroyProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest,
  DestroyProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse,
  DestroyProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DestroyProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest,
  output: DestroyProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse,
  errors: [],
}));

export interface RestoreProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest {
  /** Required. The resource name of the CryptoKeyVersion to restore. */
  name: string;
  /** Request body */
  body?: RestoreCryptoKeyVersionRequest;
}

export const RestoreProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(RestoreCryptoKeyVersionRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings/{keyRingsId}/cryptoKeys/{cryptoKeysId}/cryptoKeyVersions/{cryptoKeyVersionsId}:restore",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RestoreProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest>;

export type RestoreProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse =
  CryptoKeyVersion;
export const RestoreProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse =
  CryptoKeyVersion;

export type RestoreProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsError =
  DefaultErrors;

/** Restore a CryptoKeyVersion in the DESTROY_SCHEDULED state. Upon restoration of the CryptoKeyVersion, state will be set to DISABLED, and destroy_time will be cleared. */
export const restoreProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersions: API.OperationMethod<
  RestoreProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest,
  RestoreProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse,
  RestoreProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: RestoreProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest,
  output: RestoreProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse,
  errors: [],
}));

export interface RawEncryptProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest {
  /** Required. The resource name of the CryptoKeyVersion to use for encryption. */
  name: string;
  /** Request body */
  body?: RawEncryptRequest;
}

export const RawEncryptProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(RawEncryptRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings/{keyRingsId}/cryptoKeys/{cryptoKeysId}/cryptoKeyVersions/{cryptoKeyVersionsId}:rawEncrypt",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RawEncryptProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest>;

export type RawEncryptProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse =
  RawEncryptResponse;
export const RawEncryptProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse =
  RawEncryptResponse;

export type RawEncryptProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsError =
  DefaultErrors;

/** Encrypts data using portable cryptographic primitives. Most users should choose Encrypt and Decrypt rather than their raw counterparts. The CryptoKey.purpose must be RAW_ENCRYPT_DECRYPT. */
export const rawEncryptProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersions: API.OperationMethod<
  RawEncryptProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest,
  RawEncryptProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse,
  RawEncryptProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: RawEncryptProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest,
  output:
    RawEncryptProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse,
  errors: [],
}));

export interface RawDecryptProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest {
  /** Required. The resource name of the CryptoKeyVersion to use for decryption. */
  name: string;
  /** Request body */
  body?: RawDecryptRequest;
}

export const RawDecryptProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(RawDecryptRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings/{keyRingsId}/cryptoKeys/{cryptoKeysId}/cryptoKeyVersions/{cryptoKeyVersionsId}:rawDecrypt",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RawDecryptProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest>;

export type RawDecryptProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse =
  RawDecryptResponse;
export const RawDecryptProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse =
  RawDecryptResponse;

export type RawDecryptProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsError =
  DefaultErrors;

/** Decrypts data that was originally encrypted using a raw cryptographic mechanism. The CryptoKey.purpose must be RAW_ENCRYPT_DECRYPT. */
export const rawDecryptProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersions: API.OperationMethod<
  RawDecryptProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest,
  RawDecryptProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse,
  RawDecryptProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: RawDecryptProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest,
  output:
    RawDecryptProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse,
  errors: [],
}));

export interface AsymmetricSignProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest {
  /** Required. The resource name of the CryptoKeyVersion to use for signing. */
  name: string;
  /** Request body */
  body?: AsymmetricSignRequest;
}

export const AsymmetricSignProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(AsymmetricSignRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings/{keyRingsId}/cryptoKeys/{cryptoKeysId}/cryptoKeyVersions/{cryptoKeyVersionsId}:asymmetricSign",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<AsymmetricSignProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest>;

export type AsymmetricSignProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse =
  AsymmetricSignResponse;
export const AsymmetricSignProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse =
  AsymmetricSignResponse;

export type AsymmetricSignProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsError =
  DefaultErrors;

/** Signs data using a CryptoKeyVersion with CryptoKey.purpose ASYMMETRIC_SIGN, producing a signature that can be verified with the public key retrieved from GetPublicKey. */
export const asymmetricSignProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersions: API.OperationMethod<
  AsymmetricSignProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest,
  AsymmetricSignProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse,
  AsymmetricSignProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input:
    AsymmetricSignProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest,
  output:
    AsymmetricSignProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse,
  errors: [],
}));

export interface AsymmetricDecryptProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest {
  /** Required. The resource name of the CryptoKeyVersion to use for decryption. */
  name: string;
  /** Request body */
  body?: AsymmetricDecryptRequest;
}

export const AsymmetricDecryptProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(AsymmetricDecryptRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings/{keyRingsId}/cryptoKeys/{cryptoKeysId}/cryptoKeyVersions/{cryptoKeyVersionsId}:asymmetricDecrypt",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<AsymmetricDecryptProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest>;

export type AsymmetricDecryptProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse =
  AsymmetricDecryptResponse;
export const AsymmetricDecryptProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse =
  AsymmetricDecryptResponse;

export type AsymmetricDecryptProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsError =
  DefaultErrors;

/** Decrypts data that was encrypted with a public key retrieved from GetPublicKey corresponding to a CryptoKeyVersion with CryptoKey.purpose ASYMMETRIC_DECRYPT. */
export const asymmetricDecryptProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersions: API.OperationMethod<
  AsymmetricDecryptProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest,
  AsymmetricDecryptProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse,
  AsymmetricDecryptProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input:
    AsymmetricDecryptProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest,
  output:
    AsymmetricDecryptProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse,
  errors: [],
}));

export interface MacSignProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest {
  /** Required. The resource name of the CryptoKeyVersion to use for signing. */
  name: string;
  /** Request body */
  body?: MacSignRequest;
}

export const MacSignProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(MacSignRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings/{keyRingsId}/cryptoKeys/{cryptoKeysId}/cryptoKeyVersions/{cryptoKeyVersionsId}:macSign",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<MacSignProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest>;

export type MacSignProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse =
  MacSignResponse;
export const MacSignProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse =
  MacSignResponse;

export type MacSignProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsError =
  DefaultErrors;

/** Signs data using a CryptoKeyVersion with CryptoKey.purpose MAC, producing a tag that can be verified by another source with the same key. */
export const macSignProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersions: API.OperationMethod<
  MacSignProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest,
  MacSignProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse,
  MacSignProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: MacSignProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest,
  output: MacSignProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse,
  errors: [],
}));

export interface MacVerifyProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest {
  /** Required. The resource name of the CryptoKeyVersion to use for verification. */
  name: string;
  /** Request body */
  body?: MacVerifyRequest;
}

export const MacVerifyProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(MacVerifyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings/{keyRingsId}/cryptoKeys/{cryptoKeysId}/cryptoKeyVersions/{cryptoKeyVersionsId}:macVerify",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<MacVerifyProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest>;

export type MacVerifyProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse =
  MacVerifyResponse;
export const MacVerifyProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse =
  MacVerifyResponse;

export type MacVerifyProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsError =
  DefaultErrors;

/** Verifies MAC tag using a CryptoKeyVersion with CryptoKey.purpose MAC, and returns a response that indicates whether or not the verification was successful. */
export const macVerifyProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersions: API.OperationMethod<
  MacVerifyProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest,
  MacVerifyProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse,
  MacVerifyProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: MacVerifyProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest,
  output: MacVerifyProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse,
  errors: [],
}));

export interface DecapsulateProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest {
  /** Required. The resource name of the CryptoKeyVersion to use for decapsulation. */
  name: string;
  /** Request body */
  body?: DecapsulateRequest;
}

export const DecapsulateProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(DecapsulateRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings/{keyRingsId}/cryptoKeys/{cryptoKeysId}/cryptoKeyVersions/{cryptoKeyVersionsId}:decapsulate",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<DecapsulateProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest>;

export type DecapsulateProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse =
  DecapsulateResponse;
export const DecapsulateProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse =
  DecapsulateResponse;

export type DecapsulateProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsError =
  DefaultErrors;

/** Decapsulates data that was encapsulated with a public key retrieved from GetPublicKey corresponding to a CryptoKeyVersion with CryptoKey.purpose KEY_ENCAPSULATION. */
export const decapsulateProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersions: API.OperationMethod<
  DecapsulateProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest,
  DecapsulateProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse,
  DecapsulateProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DecapsulateProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRequest,
  output:
    DecapsulateProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsResponse,
  errors: [],
}));

export interface ListProjectsLocationsKeyRingsImportJobsRequest {
  /** Required. The resource name of the KeyRing to list, in the format `projects/* /locations/* /keyRings/*`. */
  parent: string;
  /** Optional. Optional limit on the number of ImportJobs to include in the response. Further ImportJobs can subsequently be obtained by including the ListImportJobsResponse.next_page_token in a subsequent request. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. Optional pagination token, returned earlier via ListImportJobsResponse.next_page_token. */
  pageToken?: string;
  /** Optional. Only include resources that match the filter in the response. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering). */
  filter?: string;
  /** Optional. Specify how the results should be sorted. If not specified, the results will be sorted in the default order. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering). */
  orderBy?: string;
}

export const ListProjectsLocationsKeyRingsImportJobsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings/{keyRingsId}/importJobs",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsKeyRingsImportJobsRequest>;

export type ListProjectsLocationsKeyRingsImportJobsResponse =
  ListImportJobsResponse;
export const ListProjectsLocationsKeyRingsImportJobsResponse =
  ListImportJobsResponse;

export type ListProjectsLocationsKeyRingsImportJobsError = DefaultErrors;

/** Lists ImportJobs. */
export const listProjectsLocationsKeyRingsImportJobs: API.PaginatedOperationMethod<
  ListProjectsLocationsKeyRingsImportJobsRequest,
  ListProjectsLocationsKeyRingsImportJobsResponse,
  ListProjectsLocationsKeyRingsImportJobsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsKeyRingsImportJobsRequest,
  output: ListProjectsLocationsKeyRingsImportJobsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsKeyRingsImportJobsRequest {
  /** Required. The name of the ImportJob to get. */
  name: string;
}

export const GetProjectsLocationsKeyRingsImportJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings/{keyRingsId}/importJobs/{importJobsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsKeyRingsImportJobsRequest>;

export type GetProjectsLocationsKeyRingsImportJobsResponse = ImportJob;
export const GetProjectsLocationsKeyRingsImportJobsResponse = ImportJob;

export type GetProjectsLocationsKeyRingsImportJobsError = DefaultErrors;

/** Returns metadata for a given ImportJob. */
export const getProjectsLocationsKeyRingsImportJobs: API.OperationMethod<
  GetProjectsLocationsKeyRingsImportJobsRequest,
  GetProjectsLocationsKeyRingsImportJobsResponse,
  GetProjectsLocationsKeyRingsImportJobsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsKeyRingsImportJobsRequest,
  output: GetProjectsLocationsKeyRingsImportJobsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsKeyRingsImportJobsRequest {
  /** Required. The name of the KeyRing associated with the ImportJobs. */
  parent: string;
  /** Required. It must be unique within a KeyRing and match the regular expression `[a-zA-Z0-9_-]{1,63}` */
  importJobId?: string;
  /** Request body */
  body?: ImportJob;
}

export const CreateProjectsLocationsKeyRingsImportJobsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  importJobId: Schema.optional(Schema.String).pipe(T.HttpQuery("importJobId")),
  body: Schema.optional(ImportJob).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings/{keyRingsId}/importJobs",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsKeyRingsImportJobsRequest>;

export type CreateProjectsLocationsKeyRingsImportJobsResponse = ImportJob;
export const CreateProjectsLocationsKeyRingsImportJobsResponse = ImportJob;

export type CreateProjectsLocationsKeyRingsImportJobsError = DefaultErrors;

/** Create a new ImportJob within a KeyRing. ImportJob.import_method is required. */
export const createProjectsLocationsKeyRingsImportJobs: API.OperationMethod<
  CreateProjectsLocationsKeyRingsImportJobsRequest,
  CreateProjectsLocationsKeyRingsImportJobsResponse,
  CreateProjectsLocationsKeyRingsImportJobsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsKeyRingsImportJobsRequest,
  output: CreateProjectsLocationsKeyRingsImportJobsResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsKeyRingsImportJobsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsKeyRingsImportJobsRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings/{keyRingsId}/importJobs/{importJobsId}:setIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsKeyRingsImportJobsRequest>;

export type SetIamPolicyProjectsLocationsKeyRingsImportJobsResponse = Policy;
export const SetIamPolicyProjectsLocationsKeyRingsImportJobsResponse = Policy;

export type SetIamPolicyProjectsLocationsKeyRingsImportJobsError =
  DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsKeyRingsImportJobs: API.OperationMethod<
  SetIamPolicyProjectsLocationsKeyRingsImportJobsRequest,
  SetIamPolicyProjectsLocationsKeyRingsImportJobsResponse,
  SetIamPolicyProjectsLocationsKeyRingsImportJobsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsKeyRingsImportJobsRequest,
  output: SetIamPolicyProjectsLocationsKeyRingsImportJobsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsKeyRingsImportJobsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsKeyRingsImportJobsRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(
      T.HttpQuery("options.requestedPolicyVersion"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings/{keyRingsId}/importJobs/{importJobsId}:getIamPolicy",
    }),
    svc,
  ) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsKeyRingsImportJobsRequest>;

export type GetIamPolicyProjectsLocationsKeyRingsImportJobsResponse = Policy;
export const GetIamPolicyProjectsLocationsKeyRingsImportJobsResponse = Policy;

export type GetIamPolicyProjectsLocationsKeyRingsImportJobsError =
  DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsKeyRingsImportJobs: API.OperationMethod<
  GetIamPolicyProjectsLocationsKeyRingsImportJobsRequest,
  GetIamPolicyProjectsLocationsKeyRingsImportJobsResponse,
  GetIamPolicyProjectsLocationsKeyRingsImportJobsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsKeyRingsImportJobsRequest,
  output: GetIamPolicyProjectsLocationsKeyRingsImportJobsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsKeyRingsImportJobsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsKeyRingsImportJobsRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/keyRings/{keyRingsId}/importJobs/{importJobsId}:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsKeyRingsImportJobsRequest>;

export type TestIamPermissionsProjectsLocationsKeyRingsImportJobsResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsKeyRingsImportJobsResponse =
  TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsKeyRingsImportJobsError =
  DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsKeyRingsImportJobs: API.OperationMethod<
  TestIamPermissionsProjectsLocationsKeyRingsImportJobsRequest,
  TestIamPermissionsProjectsLocationsKeyRingsImportJobsResponse,
  TestIamPermissionsProjectsLocationsKeyRingsImportJobsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsKeyRingsImportJobsRequest,
  output: TestIamPermissionsProjectsLocationsKeyRingsImportJobsResponse,
  errors: [],
}));

export interface ListProjectsLocationsRetiredResourcesRequest {
  /** Required. The project-specific location holding the RetiredResources, in the format `projects/* /locations/*`. */
  parent: string;
  /** Optional. Optional limit on the number of RetiredResources to be included in the response. Further RetiredResources can subsequently be obtained by including the ListRetiredResourcesResponse.next_page_token in a subsequent request. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. Optional pagination token, returned earlier via ListRetiredResourcesResponse.next_page_token. */
  pageToken?: string;
}

export const ListProjectsLocationsRetiredResourcesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/retiredResources",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRetiredResourcesRequest>;

export type ListProjectsLocationsRetiredResourcesResponse =
  ListRetiredResourcesResponse;
export const ListProjectsLocationsRetiredResourcesResponse =
  ListRetiredResourcesResponse;

export type ListProjectsLocationsRetiredResourcesError = DefaultErrors;

/** Lists the RetiredResources which are the records of deleted CryptoKeys. RetiredResources prevent the reuse of these resource names after deletion. */
export const listProjectsLocationsRetiredResources: API.PaginatedOperationMethod<
  ListProjectsLocationsRetiredResourcesRequest,
  ListProjectsLocationsRetiredResourcesResponse,
  ListProjectsLocationsRetiredResourcesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsRetiredResourcesRequest,
  output: ListProjectsLocationsRetiredResourcesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsRetiredResourcesRequest {
  /** Required. The name of the RetiredResource to get. */
  name: string;
}

export const GetProjectsLocationsRetiredResourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/retiredResources/{retiredResourcesId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRetiredResourcesRequest>;

export type GetProjectsLocationsRetiredResourcesResponse = RetiredResource;
export const GetProjectsLocationsRetiredResourcesResponse = RetiredResource;

export type GetProjectsLocationsRetiredResourcesError = DefaultErrors;

/** Retrieves a specific RetiredResource resource, which represents the record of a deleted CryptoKey. */
export const getProjectsLocationsRetiredResources: API.OperationMethod<
  GetProjectsLocationsRetiredResourcesRequest,
  GetProjectsLocationsRetiredResourcesResponse,
  GetProjectsLocationsRetiredResourcesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsRetiredResourcesRequest,
  output: GetProjectsLocationsRetiredResourcesResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsEkmConfigRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsEkmConfigRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/ekmConfig:setIamPolicy",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsEkmConfigRequest>;

export type SetIamPolicyProjectsLocationsEkmConfigResponse = Policy;
export const SetIamPolicyProjectsLocationsEkmConfigResponse = Policy;

export type SetIamPolicyProjectsLocationsEkmConfigError = DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsEkmConfig: API.OperationMethod<
  SetIamPolicyProjectsLocationsEkmConfigRequest,
  SetIamPolicyProjectsLocationsEkmConfigResponse,
  SetIamPolicyProjectsLocationsEkmConfigError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsEkmConfigRequest,
  output: SetIamPolicyProjectsLocationsEkmConfigResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsEkmConfigRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsEkmConfigRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("options.requestedPolicyVersion"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/ekmConfig:getIamPolicy",
  }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsEkmConfigRequest>;

export type GetIamPolicyProjectsLocationsEkmConfigResponse = Policy;
export const GetIamPolicyProjectsLocationsEkmConfigResponse = Policy;

export type GetIamPolicyProjectsLocationsEkmConfigError = DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsEkmConfig: API.OperationMethod<
  GetIamPolicyProjectsLocationsEkmConfigRequest,
  GetIamPolicyProjectsLocationsEkmConfigResponse,
  GetIamPolicyProjectsLocationsEkmConfigError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsEkmConfigRequest,
  output: GetIamPolicyProjectsLocationsEkmConfigResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsEkmConfigRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsEkmConfigRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/ekmConfig:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsEkmConfigRequest>;

export type TestIamPermissionsProjectsLocationsEkmConfigResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsEkmConfigResponse =
  TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsEkmConfigError = DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsEkmConfig: API.OperationMethod<
  TestIamPermissionsProjectsLocationsEkmConfigRequest,
  TestIamPermissionsProjectsLocationsEkmConfigResponse,
  TestIamPermissionsProjectsLocationsEkmConfigError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsEkmConfigRequest,
  output: TestIamPermissionsProjectsLocationsEkmConfigResponse,
  errors: [],
}));

export interface GetKajPolicyConfigOrganizationsRequest {
  /** Required. The name of the KeyAccessJustificationsPolicyConfig to get. */
  name: string;
}

export const GetKajPolicyConfigOrganizationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/organizations/{organizationsId}/kajPolicyConfig",
  }),
  svc,
) as unknown as Schema.Schema<GetKajPolicyConfigOrganizationsRequest>;

export type GetKajPolicyConfigOrganizationsResponse =
  KeyAccessJustificationsPolicyConfig;
export const GetKajPolicyConfigOrganizationsResponse =
  KeyAccessJustificationsPolicyConfig;

export type GetKajPolicyConfigOrganizationsError = DefaultErrors;

/** Gets the KeyAccessJustificationsPolicyConfig for a given organization, folder, or project. */
export const getKajPolicyConfigOrganizations: API.OperationMethod<
  GetKajPolicyConfigOrganizationsRequest,
  GetKajPolicyConfigOrganizationsResponse,
  GetKajPolicyConfigOrganizationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetKajPolicyConfigOrganizationsRequest,
  output: GetKajPolicyConfigOrganizationsResponse,
  errors: [],
}));

export interface UpdateKajPolicyConfigOrganizationsRequest {
  /** Identifier. The resource name for this KeyAccessJustificationsPolicyConfig in the format of "{organizations|folders|projects}/* /kajPolicyConfig". */
  name: string;
  /** Optional. The list of fields to update. */
  updateMask?: string;
  /** Request body */
  body?: KeyAccessJustificationsPolicyConfig;
}

export const UpdateKajPolicyConfigOrganizationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(KeyAccessJustificationsPolicyConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1/organizations/{organizationsId}/kajPolicyConfig",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateKajPolicyConfigOrganizationsRequest>;

export type UpdateKajPolicyConfigOrganizationsResponse =
  KeyAccessJustificationsPolicyConfig;
export const UpdateKajPolicyConfigOrganizationsResponse =
  KeyAccessJustificationsPolicyConfig;

export type UpdateKajPolicyConfigOrganizationsError = DefaultErrors;

/** Updates the KeyAccessJustificationsPolicyConfig for a given organization, folder, or project. */
export const updateKajPolicyConfigOrganizations: API.OperationMethod<
  UpdateKajPolicyConfigOrganizationsRequest,
  UpdateKajPolicyConfigOrganizationsResponse,
  UpdateKajPolicyConfigOrganizationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateKajPolicyConfigOrganizationsRequest,
  output: UpdateKajPolicyConfigOrganizationsResponse,
  errors: [],
}));
