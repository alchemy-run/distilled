// ==========================================================================
// Cloud Storage JSON API (storage v1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { GCPAuth } from "../auth.ts";
import type { CommonErrors } from "../errors.ts";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "storage",
  version: "v1",
  rootUrl: "https://storage.googleapis.com/",
  servicePath: "storage/v1/",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface BucketAccessControl {
  /** The name of the bucket. */
  bucket?: string;
  /** The domain associated with the entity, if any. */
  domain?: string;
  /** The email address associated with the entity, if any. */
  email?: string;
  /** The entity holding the permission, in one of the following forms: - user-userId - user-email - group-groupId - group-email - domain-domain - project-team-projectId - allUsers - allAuthenticatedUsers Examples: - The user liz@example.com would be user-liz@example.com. - The group example@googlegroups.com would be group-example@googlegroups.com. - To refer to all members of the Google Apps for Business domain example.com, the entity would be domain-example.com. */
  entity?: string;
  /** The ID for the entity, if any. */
  entityId?: string;
  /** HTTP 1.1 Entity tag for the access-control entry. */
  etag?: string;
  /** The ID of the access-control entry. */
  id?: string;
  /** The kind of item this is. For bucket access control entries, this is always storage#bucketAccessControl. */
  kind?: string;
  /** The project team associated with the entity, if any. */
  projectTeam?: { projectNumber?: string; team?: string };
  /** The access permission for the entity. */
  role?: string;
  /** The link to this access-control entry. */
  selfLink?: string;
}

export const BucketAccessControl: Schema.Schema<BucketAccessControl> = Schema.suspend(() => Schema.Struct({
  bucket: Schema.optional(Schema.String),
  domain: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  entity: Schema.optional(Schema.String),
  entityId: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  projectTeam: Schema.optional(Schema.Struct({ projectNumber: Schema.optional(Schema.String), team: Schema.optional(Schema.String) })),
  role: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
})).annotate({ identifier: "BucketAccessControl" }) as any as Schema.Schema<BucketAccessControl>;

export interface ObjectAccessControl {
  /** The name of the bucket. */
  bucket?: string;
  /** The domain associated with the entity, if any. */
  domain?: string;
  /** The email address associated with the entity, if any. */
  email?: string;
  /** The entity holding the permission, in one of the following forms: - user-userId - user-email - group-groupId - group-email - domain-domain - project-team-projectId - allUsers - allAuthenticatedUsers Examples: - The user liz@example.com would be user-liz@example.com. - The group example@googlegroups.com would be group-example@googlegroups.com. - To refer to all members of the Google Apps for Business domain example.com, the entity would be domain-example.com. */
  entity?: string;
  /** The ID for the entity, if any. */
  entityId?: string;
  /** HTTP 1.1 Entity tag for the access-control entry. */
  etag?: string;
  /** The content generation of the object, if applied to an object. */
  generation?: string;
  /** The ID of the access-control entry. */
  id?: string;
  /** The kind of item this is. For object access control entries, this is always storage#objectAccessControl. */
  kind?: string;
  /** The name of the object, if applied to an object. */
  object?: string;
  /** The project team associated with the entity, if any. */
  projectTeam?: { projectNumber?: string; team?: string };
  /** The access permission for the entity. */
  role?: string;
  /** The link to this access-control entry. */
  selfLink?: string;
}

export const ObjectAccessControl: Schema.Schema<ObjectAccessControl> = Schema.suspend(() => Schema.Struct({
  bucket: Schema.optional(Schema.String),
  domain: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  entity: Schema.optional(Schema.String),
  entityId: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  generation: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  object: Schema.optional(Schema.String),
  projectTeam: Schema.optional(Schema.Struct({ projectNumber: Schema.optional(Schema.String), team: Schema.optional(Schema.String) })),
  role: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
})).annotate({ identifier: "ObjectAccessControl" }) as any as Schema.Schema<ObjectAccessControl>;

export interface Bucket {
  /** Access controls on the bucket. */
  acl?: Array<BucketAccessControl>;
  /** The bucket's billing configuration. */
  billing?: { requesterPays?: boolean };
  /** The bucket's Cross-Origin Resource Sharing (CORS) configuration. */
  cors?: Array<{ maxAgeSeconds?: number; method?: Array<string>; origin?: Array<string>; responseHeader?: Array<string> }>;
  /** The bucket's custom placement configuration for Custom Dual Regions. */
  customPlacementConfig?: { dataLocations?: Array<string> };
  /** The default value for event-based hold on newly created objects in this bucket. Event-based hold is a way to retain objects indefinitely until an event occurs, signified by the hold's release. After being released, such objects will be subject to bucket-level retention (if any). One sample use case of this flag is for banks to hold loan documents for at least 3 years after loan is paid in full. Here, bucket-level retention is 3 years and the event is loan being paid in full. In this example, these objects will be held intact for any number of years until the event has occurred (event-based hold on the object is released) and then 3 more years after that. That means retention duration of the objects begins from the moment event-based hold transitioned from true to false. Objects under event-based hold cannot be deleted, overwritten or archived until the hold is removed. */
  defaultEventBasedHold?: boolean;
  /** Default access controls to apply to new objects when no ACL is provided. */
  defaultObjectAcl?: Array<ObjectAccessControl>;
  /** Encryption configuration for a bucket. */
  encryption?: { defaultKmsKeyName?: string; googleManagedEncryptionEnforcementConfig?: { restrictionMode?: "NotRestricted" | "FullyRestricted" | (string & {}); effectiveTime?: string }; customerManagedEncryptionEnforcementConfig?: { restrictionMode?: "NotRestricted" | "FullyRestricted" | (string & {}); effectiveTime?: string }; customerSuppliedEncryptionEnforcementConfig?: { restrictionMode?: "NotRestricted" | "FullyRestricted" | (string & {}); effectiveTime?: string } };
  /** HTTP 1.1 Entity tag for the bucket. */
  etag?: string;
  /** The bucket's hierarchical namespace configuration. */
  hierarchicalNamespace?: { enabled?: boolean };
  /** The bucket's IAM configuration. */
  iamConfiguration?: { bucketPolicyOnly?: { enabled?: boolean; lockedTime?: string }; uniformBucketLevelAccess?: { enabled?: boolean; lockedTime?: string }; publicAccessPrevention?: string };
  /** The ID of the bucket. For buckets, the id and name properties are the same. */
  id?: string;
  /** The bucket's IP filter configuration. Specifies the network sources that are allowed to access the operations on the bucket, as well as its underlying objects. Only enforced when the mode is set to 'Enabled'. */
  ipFilter?: { mode?: string; publicNetworkSource?: { allowedIpCidrRanges?: Array<string> }; vpcNetworkSources?: Array<{ network?: string; allowedIpCidrRanges?: Array<string> }>; allowCrossOrgVpcs?: boolean; allowAllServiceAgentAccess?: boolean };
  /** The kind of item this is. For buckets, this is always storage#bucket. */
  kind?: string;
  /** User-provided labels, in key/value pairs. */
  labels?: Record<string, string>;
  /** The bucket's lifecycle configuration. See [Lifecycle Management](https://cloud.google.com/storage/docs/lifecycle) for more information. */
  lifecycle?: { rule?: Array<{ action?: { storageClass?: string; type?: string }; condition?: { age?: number; createdBefore?: string; customTimeBefore?: string; daysSinceCustomTime?: number; daysSinceNoncurrentTime?: number; isLive?: boolean; matchesPattern?: string; matchesPrefix?: Array<string>; matchesSuffix?: Array<string>; matchesStorageClass?: Array<string>; noncurrentTimeBefore?: string; numNewerVersions?: number } }> };
  /** The bucket's Autoclass configuration. */
  autoclass?: { enabled?: boolean; toggleTime?: string; terminalStorageClass?: string; terminalStorageClassUpdateTime?: string };
  /** The location of the bucket. Object data for objects in the bucket resides in physical storage within this region. Defaults to US. See the [Developer's Guide](https://cloud.google.com/storage/docs/locations) for the authoritative list. */
  location?: string;
  /** The type of the bucket location. */
  locationType?: string;
  /** The bucket's logging configuration, which defines the destination bucket and optional name prefix for the current bucket's logs. */
  logging?: { logBucket?: string; logObjectPrefix?: string };
  /** The generation of this bucket. */
  generation?: string;
  /** The metadata generation of this bucket. */
  metageneration?: string;
  /** The name of the bucket. */
  name?: string;
  /** The owner of the bucket. This is always the project team's owner group. */
  owner?: { entity?: string; entityId?: string };
  /** The project number of the project the bucket belongs to. */
  projectNumber?: string;
  /** The bucket's retention policy. The retention policy enforces a minimum retention time for all objects contained in the bucket, based on their creation time. Any attempt to overwrite or delete objects younger than the retention period will result in a PERMISSION_DENIED error. An unlocked retention policy can be modified or removed from the bucket via a storage.buckets.update operation. A locked retention policy cannot be removed or shortened in duration for the lifetime of the bucket. Attempting to remove or decrease period of a locked retention policy will result in a PERMISSION_DENIED error. */
  retentionPolicy?: { effectiveTime?: string; isLocked?: boolean; retentionPeriod?: string };
  /** The bucket's object retention config. */
  objectRetention?: { mode?: string };
  /** The Recovery Point Objective (RPO) of this bucket. Set to ASYNC_TURBO to turn on Turbo Replication on a bucket. */
  rpo?: string;
  /** The URI of this bucket. */
  selfLink?: string;
  /** The bucket's soft delete policy, which defines the period of time that soft-deleted objects will be retained, and cannot be permanently deleted. */
  softDeletePolicy?: { retentionDurationSeconds?: string; effectiveTime?: string };
  /** The bucket's default storage class, used whenever no storageClass is specified for a newly-created object. This defines how objects in the bucket are stored and determines the SLA and the cost of storage. Values include MULTI_REGIONAL, REGIONAL, STANDARD, NEARLINE, COLDLINE, ARCHIVE, and DURABLE_REDUCED_AVAILABILITY. If this value is not specified when the bucket is created, it will default to STANDARD. For more information, see [Storage Classes](https://cloud.google.com/storage/docs/storage-classes). */
  storageClass?: string;
  /** The creation time of the bucket in RFC 3339 format. */
  timeCreated?: string;
  /** The modification time of the bucket in RFC 3339 format. */
  updated?: string;
  /** The soft delete time of the bucket in RFC 3339 format. */
  softDeleteTime?: string;
  /** The hard delete time of the bucket in RFC 3339 format. */
  hardDeleteTime?: string;
  /** The bucket's versioning configuration. */
  versioning?: { enabled?: boolean };
  /** The bucket's website configuration, controlling how the service behaves when accessing bucket contents as a web site. See the [Static Website Examples](https://cloud.google.com/storage/docs/static-website) for more information. */
  website?: { mainPageSuffix?: string; notFoundPage?: string };
  /** Reserved for future use. */
  satisfiesPZS?: boolean;
  /** Reserved for future use. */
  satisfiesPZI?: boolean;
}

export const Bucket: Schema.Schema<Bucket> = Schema.suspend(() => Schema.Struct({
  acl: Schema.optional(Schema.Array(BucketAccessControl)),
  billing: Schema.optional(Schema.Struct({ requesterPays: Schema.optional(Schema.Boolean) })),
  cors: Schema.optional(Schema.Array(Schema.Struct({ maxAgeSeconds: Schema.optional(Schema.Number), method: Schema.optional(Schema.Array(Schema.String)), origin: Schema.optional(Schema.Array(Schema.String)), responseHeader: Schema.optional(Schema.Array(Schema.String)) }))),
  customPlacementConfig: Schema.optional(Schema.Struct({ dataLocations: Schema.optional(Schema.Array(Schema.String)) })),
  defaultEventBasedHold: Schema.optional(Schema.Boolean),
  defaultObjectAcl: Schema.optional(Schema.Array(ObjectAccessControl)),
  encryption: Schema.optional(Schema.Struct({ defaultKmsKeyName: Schema.optional(Schema.String), googleManagedEncryptionEnforcementConfig: Schema.optional(Schema.Struct({ restrictionMode: Schema.optional(Schema.String), effectiveTime: Schema.optional(Schema.String) })), customerManagedEncryptionEnforcementConfig: Schema.optional(Schema.Struct({ restrictionMode: Schema.optional(Schema.String), effectiveTime: Schema.optional(Schema.String) })), customerSuppliedEncryptionEnforcementConfig: Schema.optional(Schema.Struct({ restrictionMode: Schema.optional(Schema.String), effectiveTime: Schema.optional(Schema.String) })) })),
  etag: Schema.optional(Schema.String),
  hierarchicalNamespace: Schema.optional(Schema.Struct({ enabled: Schema.optional(Schema.Boolean) })),
  iamConfiguration: Schema.optional(Schema.Struct({ bucketPolicyOnly: Schema.optional(Schema.Struct({ enabled: Schema.optional(Schema.Boolean), lockedTime: Schema.optional(Schema.String) })), uniformBucketLevelAccess: Schema.optional(Schema.Struct({ enabled: Schema.optional(Schema.Boolean), lockedTime: Schema.optional(Schema.String) })), publicAccessPrevention: Schema.optional(Schema.String) })),
  id: Schema.optional(Schema.String),
  ipFilter: Schema.optional(Schema.Struct({ mode: Schema.optional(Schema.String), publicNetworkSource: Schema.optional(Schema.Struct({ allowedIpCidrRanges: Schema.optional(Schema.Array(Schema.String)) })), vpcNetworkSources: Schema.optional(Schema.Array(Schema.Struct({ network: Schema.optional(Schema.String), allowedIpCidrRanges: Schema.optional(Schema.Array(Schema.String)) }))), allowCrossOrgVpcs: Schema.optional(Schema.Boolean), allowAllServiceAgentAccess: Schema.optional(Schema.Boolean) })),
  kind: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  lifecycle: Schema.optional(Schema.Struct({ rule: Schema.optional(Schema.Array(Schema.Struct({ action: Schema.optional(Schema.Struct({ storageClass: Schema.optional(Schema.String), type: Schema.optional(Schema.String) })), condition: Schema.optional(Schema.Struct({ age: Schema.optional(Schema.Number), createdBefore: Schema.optional(Schema.String), customTimeBefore: Schema.optional(Schema.String), daysSinceCustomTime: Schema.optional(Schema.Number), daysSinceNoncurrentTime: Schema.optional(Schema.Number), isLive: Schema.optional(Schema.Boolean), matchesPattern: Schema.optional(Schema.String), matchesPrefix: Schema.optional(Schema.Array(Schema.String)), matchesSuffix: Schema.optional(Schema.Array(Schema.String)), matchesStorageClass: Schema.optional(Schema.Array(Schema.String)), noncurrentTimeBefore: Schema.optional(Schema.String), numNewerVersions: Schema.optional(Schema.Number) })) }))) })),
  autoclass: Schema.optional(Schema.Struct({ enabled: Schema.optional(Schema.Boolean), toggleTime: Schema.optional(Schema.String), terminalStorageClass: Schema.optional(Schema.String), terminalStorageClassUpdateTime: Schema.optional(Schema.String) })),
  location: Schema.optional(Schema.String),
  locationType: Schema.optional(Schema.String),
  logging: Schema.optional(Schema.Struct({ logBucket: Schema.optional(Schema.String), logObjectPrefix: Schema.optional(Schema.String) })),
  generation: Schema.optional(Schema.String),
  metageneration: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  owner: Schema.optional(Schema.Struct({ entity: Schema.optional(Schema.String), entityId: Schema.optional(Schema.String) })),
  projectNumber: Schema.optional(Schema.String),
  retentionPolicy: Schema.optional(Schema.Struct({ effectiveTime: Schema.optional(Schema.String), isLocked: Schema.optional(Schema.Boolean), retentionPeriod: Schema.optional(Schema.String) })),
  objectRetention: Schema.optional(Schema.Struct({ mode: Schema.optional(Schema.String) })),
  rpo: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  softDeletePolicy: Schema.optional(Schema.Struct({ retentionDurationSeconds: Schema.optional(Schema.String), effectiveTime: Schema.optional(Schema.String) })),
  storageClass: Schema.optional(Schema.String),
  timeCreated: Schema.optional(Schema.String),
  updated: Schema.optional(Schema.String),
  softDeleteTime: Schema.optional(Schema.String),
  hardDeleteTime: Schema.optional(Schema.String),
  versioning: Schema.optional(Schema.Struct({ enabled: Schema.optional(Schema.Boolean) })),
  website: Schema.optional(Schema.Struct({ mainPageSuffix: Schema.optional(Schema.String), notFoundPage: Schema.optional(Schema.String) })),
  satisfiesPZS: Schema.optional(Schema.Boolean),
  satisfiesPZI: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Bucket" }) as any as Schema.Schema<Bucket>;

export interface AdvanceRelocateBucketOperationRequest {
  /** Specifies the duration after which the relocation will revert to the sync stage if the relocation hasn't succeeded. Optional, if not supplied, a default value of 12h will be used. */
  ttl?: string;
  /** Specifies the time when the relocation will revert to the sync stage if the relocation hasn't succeeded. */
  expireTime?: string;
}

export const AdvanceRelocateBucketOperationRequest: Schema.Schema<AdvanceRelocateBucketOperationRequest> = Schema.suspend(() => Schema.Struct({
  ttl: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
})).annotate({ identifier: "AdvanceRelocateBucketOperationRequest" }) as any as Schema.Schema<AdvanceRelocateBucketOperationRequest>;

export interface AnywhereCache {
  /** The kind of item this is. For Anywhere Cache, this is always storage#anywhereCache. */
  kind?: string;
  /** The ID of the resource, including the project number, bucket name and anywhere cache ID. */
  id?: string;
  /** The link to this cache instance. */
  selfLink?: string;
  /** The name of the bucket containing this cache instance. */
  bucket?: string;
  /** The ID of the Anywhere cache instance. */
  anywhereCacheId?: string;
  /** The zone in which the cache instance is running. For example, us-central1-a. */
  zone?: string;
  /** The current state of the cache instance. */
  state?: string;
  /** The creation time of the cache instance in RFC 3339 format. */
  createTime?: string;
  /** The modification time of the cache instance metadata in RFC 3339 format. */
  updateTime?: string;
  /** The TTL of all cache entries in whole seconds. e.g., "7200s". */
  ttl?: string;
  /** The cache-level entry admission policy. */
  admissionPolicy?: string;
  /** True if the cache instance has an active Update long-running operation. */
  pendingUpdate?: boolean;
}

export const AnywhereCache: Schema.Schema<AnywhereCache> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  bucket: Schema.optional(Schema.String),
  anywhereCacheId: Schema.optional(Schema.String),
  zone: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  ttl: Schema.optional(Schema.String),
  admissionPolicy: Schema.optional(Schema.String),
  pendingUpdate: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AnywhereCache" }) as any as Schema.Schema<AnywhereCache>;

export interface AnywhereCaches {
  /** The kind of item this is. For lists of Anywhere Caches, this is always storage#anywhereCaches. */
  kind?: string;
  /** The continuation token, used to page through large result sets. Provide this value in a subsequent request to return the next page of results. */
  nextPageToken?: string;
  /** The list of items. */
  items?: Array<AnywhereCache>;
}

export const AnywhereCaches: Schema.Schema<AnywhereCaches> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(AnywhereCache)),
})).annotate({ identifier: "AnywhereCaches" }) as any as Schema.Schema<AnywhereCaches>;

export interface BucketAccessControls {
  /** The list of items. */
  items?: Array<BucketAccessControl>;
  /** The kind of item this is. For lists of bucket access control entries, this is always storage#bucketAccessControls. */
  kind?: string;
}

export const BucketAccessControls: Schema.Schema<BucketAccessControls> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(BucketAccessControl)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "BucketAccessControls" }) as any as Schema.Schema<BucketAccessControls>;

export interface BucketStorageLayout {
  /** The name of the bucket. */
  bucket?: string;
  /** The bucket's custom placement configuration for Custom Dual Regions. */
  customPlacementConfig?: { dataLocations?: Array<string> };
  /** The bucket's hierarchical namespace configuration. */
  hierarchicalNamespace?: { enabled?: boolean };
  /** The kind of item this is. For storage layout, this is always storage#storageLayout. */
  kind?: string;
  /** The location of the bucket. */
  location?: string;
  /** The type of the bucket location. */
  locationType?: string;
}

export const BucketStorageLayout: Schema.Schema<BucketStorageLayout> = Schema.suspend(() => Schema.Struct({
  bucket: Schema.optional(Schema.String),
  customPlacementConfig: Schema.optional(Schema.Struct({ dataLocations: Schema.optional(Schema.Array(Schema.String)) })),
  hierarchicalNamespace: Schema.optional(Schema.Struct({ enabled: Schema.optional(Schema.Boolean) })),
  kind: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  locationType: Schema.optional(Schema.String),
})).annotate({ identifier: "BucketStorageLayout" }) as any as Schema.Schema<BucketStorageLayout>;

export interface Buckets {
  /** The list of items. */
  items?: Array<Bucket>;
  /** The kind of item this is. For lists of buckets, this is always storage#buckets. */
  kind?: string;
  /** The continuation token, used to page through large result sets. Provide this value in a subsequent request to return the next page of results. */
  nextPageToken?: string;
  /** The list of bucket resource names that could not be reached during the listing operation. */
  unreachable?: Array<string>;
}

export const Buckets: Schema.Schema<Buckets> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(Bucket)),
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Buckets" }) as any as Schema.Schema<Buckets>;

export interface Channel {
  /** The address where notifications are delivered for this channel. */
  address?: string;
  /** Date and time of notification channel expiration, expressed as a Unix timestamp, in milliseconds. Optional. */
  expiration?: string;
  /** A UUID or similar unique string that identifies this channel. */
  id?: string;
  /** Identifies this as a notification channel used to watch for changes to a resource, which is "api#channel". */
  kind?: string;
  /** Additional parameters controlling delivery channel behavior. Optional. */
  params?: Record<string, string>;
  /** A Boolean value to indicate whether payload is wanted. Optional. */
  payload?: boolean;
  /** An opaque ID that identifies the resource being watched on this channel. Stable across different API versions. */
  resourceId?: string;
  /** A version-specific identifier for the watched resource. */
  resourceUri?: string;
  /** An arbitrary string delivered to the target address with each notification delivered over this channel. Optional. */
  token?: string;
  /** The type of delivery mechanism used for this channel. */
  type?: string;
}

export const Channel: Schema.Schema<Channel> = Schema.suspend(() => Schema.Struct({
  address: Schema.optional(Schema.String),
  expiration: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  params: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  payload: Schema.optional(Schema.Boolean),
  resourceId: Schema.optional(Schema.String),
  resourceUri: Schema.optional(Schema.String),
  token: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "Channel" }) as any as Schema.Schema<Channel>;

export interface ObjectCustomContextPayload {
  /** The value of the object context. */
  value?: string;
  /** The time at which the object context was created in RFC 3339 format. */
  createTime?: string;
  /** The time at which the object context was last updated in RFC 3339 format. */
  updateTime?: string;
}

export const ObjectCustomContextPayload: Schema.Schema<ObjectCustomContextPayload> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ObjectCustomContextPayload" }) as any as Schema.Schema<ObjectCustomContextPayload>;

export interface Storage_Object {
  /** Access controls on the object. */
  acl?: Array<ObjectAccessControl>;
  /** The name of the bucket containing this object. */
  bucket?: string;
  /** Cache-Control directive for the object data. If omitted, and the object is accessible to all anonymous users, the default will be public, max-age=3600. */
  cacheControl?: string;
  /** Number of underlying components that make up this object. Components are accumulated by compose operations. */
  componentCount?: number;
  /** Content-Disposition of the object data. */
  contentDisposition?: string;
  /** Content-Encoding of the object data. */
  contentEncoding?: string;
  /** Content-Language of the object data. */
  contentLanguage?: string;
  /** Content-Type of the object data. If an object is stored without a Content-Type, it is served as application/octet-stream. */
  contentType?: string;
  /** CRC32c checksum, as described in RFC 4960, Appendix B; encoded using base64 in big-endian byte order. For more information about using the CRC32c checksum, see [Data Validation and Change Detection](https://cloud.google.com/storage/docs/data-validation). */
  crc32c?: string;
  /** A timestamp in RFC 3339 format specified by the user for an object. */
  customTime?: string;
  /** Metadata of customer-supplied encryption key, if the object is encrypted by such a key. */
  customerEncryption?: { encryptionAlgorithm?: string; keySha256?: string };
  /** HTTP 1.1 Entity tag for the object. */
  etag?: string;
  /** Whether an object is under event-based hold. Event-based hold is a way to retain objects until an event occurs, which is signified by the hold's release (i.e. this value is set to false). After being released (set to false), such objects will be subject to bucket-level retention (if any). One sample use case of this flag is for banks to hold loan documents for at least 3 years after loan is paid in full. Here, bucket-level retention is 3 years and the event is the loan being paid in full. In this example, these objects will be held intact for any number of years until the event has occurred (event-based hold on the object is released) and then 3 more years after that. That means retention duration of the objects begins from the moment event-based hold transitioned from true to false. */
  eventBasedHold?: boolean;
  /** The content generation of this object. Used for object versioning. */
  generation?: string;
  /** The ID of the object, including the bucket name, object name, and generation number. */
  id?: string;
  /** The kind of item this is. For objects, this is always storage#object. */
  kind?: string;
  /** Not currently supported. Specifying the parameter causes the request to fail with status code 400 - Bad Request. */
  kmsKeyName?: string;
  /** MD5 hash of the data; encoded using base64. For more information about using the MD5 hash, see [Data Validation and Change Detection](https://cloud.google.com/storage/docs/data-validation). */
  md5Hash?: string;
  /** Media download link. */
  mediaLink?: string;
  /** User-provided metadata, in key/value pairs. */
  metadata?: Record<string, string>;
  /** User-defined or system-defined object contexts. Each object context is a key-payload pair, where the key provides the identification and the payload holds the associated value and additional metadata. */
  contexts?: { custom?: Record<string, ObjectCustomContextPayload> };
  /** Restore token used to differentiate deleted objects with the same name and generation. This field is only returned for deleted objects in hierarchical namespace buckets. */
  restoreToken?: string;
  /** The version of the metadata for this object at this generation. Used for preconditions and for detecting changes in metadata. A metageneration number is only meaningful in the context of a particular generation of a particular object. */
  metageneration?: string;
  /** The name of the object. Required if not specified by URL parameter. */
  name?: string;
  /** The owner of the object. This will always be the uploader of the object. */
  owner?: { entity?: string; entityId?: string };
  /** A server-determined value that specifies the earliest time that the object's retention period expires. This value is in RFC 3339 format. Note 1: This field is not provided for objects with an active event-based hold, since retention expiration is unknown until the hold is removed. Note 2: This value can be provided even when temporary hold is set (so that the user can reason about policy without having to first unset the temporary hold). */
  retentionExpirationTime?: string;
  /** A collection of object level retention parameters. */
  retention?: { retainUntilTime?: string; mode?: string };
  /** The link to this object. */
  selfLink?: string;
  /** Content-Length of the data in bytes. */
  size?: string;
  /** Storage class of the object. */
  storageClass?: string;
  /** Whether an object is under temporary hold. While this flag is set to true, the object is protected against deletion and overwrites. A common use case of this flag is regulatory investigations where objects need to be retained while the investigation is ongoing. Note that unlike event-based hold, temporary hold does not impact retention expiration time of an object. */
  temporaryHold?: boolean;
  /** The creation time of the object in RFC 3339 format. */
  timeCreated?: string;
  /** The time at which the object became noncurrent in RFC 3339 format. Will be returned if and only if this version of the object has been deleted. */
  timeDeleted?: string;
  /** The time when the object was finalized. */
  timeFinalized?: string;
  /** The time at which the object became soft-deleted in RFC 3339 format. */
  softDeleteTime?: string;
  /** This is the time (in the future) when the soft-deleted object will no longer be restorable. It is equal to the soft delete time plus the current soft delete retention duration of the bucket. */
  hardDeleteTime?: string;
  /** The time at which the object's storage class was last changed. When the object is initially created, it will be set to timeCreated. */
  timeStorageClassUpdated?: string;
  /** The modification time of the object metadata in RFC 3339 format. Set initially to object creation time and then updated whenever any metadata of the object changes. This includes changes made by a requester, such as modifying custom metadata, as well as changes made by Cloud Storage on behalf of a requester, such as changing the storage class based on an Object Lifecycle Configuration. */
  updated?: string;
}

export const Storage_Object: Schema.Schema<Storage_Object> = Schema.suspend(() => Schema.Struct({
  acl: Schema.optional(Schema.Array(ObjectAccessControl)),
  bucket: Schema.optional(Schema.String),
  cacheControl: Schema.optional(Schema.String),
  componentCount: Schema.optional(Schema.Number),
  contentDisposition: Schema.optional(Schema.String),
  contentEncoding: Schema.optional(Schema.String),
  contentLanguage: Schema.optional(Schema.String),
  contentType: Schema.optional(Schema.String),
  crc32c: Schema.optional(Schema.String),
  customTime: Schema.optional(Schema.String),
  customerEncryption: Schema.optional(Schema.Struct({ encryptionAlgorithm: Schema.optional(Schema.String), keySha256: Schema.optional(Schema.String) })),
  etag: Schema.optional(Schema.String),
  eventBasedHold: Schema.optional(Schema.Boolean),
  generation: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  kmsKeyName: Schema.optional(Schema.String),
  md5Hash: Schema.optional(Schema.String),
  mediaLink: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  contexts: Schema.optional(Schema.Struct({ custom: Schema.optional(Schema.Record(Schema.String, ObjectCustomContextPayload)) })),
  restoreToken: Schema.optional(Schema.String),
  metageneration: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  owner: Schema.optional(Schema.Struct({ entity: Schema.optional(Schema.String), entityId: Schema.optional(Schema.String) })),
  retentionExpirationTime: Schema.optional(Schema.String),
  retention: Schema.optional(Schema.Struct({ retainUntilTime: Schema.optional(Schema.String), mode: Schema.optional(Schema.String) })),
  selfLink: Schema.optional(Schema.String),
  size: Schema.optional(Schema.String),
  storageClass: Schema.optional(Schema.String),
  temporaryHold: Schema.optional(Schema.Boolean),
  timeCreated: Schema.optional(Schema.String),
  timeDeleted: Schema.optional(Schema.String),
  timeFinalized: Schema.optional(Schema.String),
  softDeleteTime: Schema.optional(Schema.String),
  hardDeleteTime: Schema.optional(Schema.String),
  timeStorageClassUpdated: Schema.optional(Schema.String),
  updated: Schema.optional(Schema.String),
})).annotate({ identifier: "Storage_Object" }) as any as Schema.Schema<Storage_Object>;

export interface ComposeRequest {
  /** Properties of the resulting object. */
  destination?: Storage_Object;
  /** The kind of item this is. */
  kind?: string;
  /** The list of source objects that will be concatenated into a single object. */
  sourceObjects?: Array<{ generation?: string; name?: string; objectPreconditions?: { ifGenerationMatch?: string } }>;
  /** If true, the source objects will be deleted. */
  deleteSourceObjects?: boolean;
}

export const ComposeRequest: Schema.Schema<ComposeRequest> = Schema.suspend(() => Schema.Struct({
  destination: Schema.optional(Storage_Object),
  kind: Schema.optional(Schema.String),
  sourceObjects: Schema.optional(Schema.Array(Schema.Struct({ generation: Schema.optional(Schema.String), name: Schema.optional(Schema.String), objectPreconditions: Schema.optional(Schema.Struct({ ifGenerationMatch: Schema.optional(Schema.String) })) }))),
  deleteSourceObjects: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ComposeRequest" }) as any as Schema.Schema<ComposeRequest>;

export interface Folder {
  /** The name of the bucket containing this folder. */
  bucket?: string;
  /** The ID of the folder, including the bucket name, folder name. */
  id?: string;
  /** The kind of item this is. For folders, this is always storage#folder. */
  kind?: string;
  /** The version of the metadata for this folder. Used for preconditions and for detecting changes in metadata. */
  metageneration?: string;
  /** The name of the folder. Required if not specified by URL parameter. */
  name?: string;
  /** The link to this folder. */
  selfLink?: string;
  /** The creation time of the folder in RFC 3339 format. */
  createTime?: string;
  /** The modification time of the folder metadata in RFC 3339 format. */
  updateTime?: string;
  /** Only present if the folder is part of an ongoing rename folder operation. Contains information which can be used to query the operation status. */
  pendingRenameInfo?: { operationId?: string };
}

export const Folder: Schema.Schema<Folder> = Schema.suspend(() => Schema.Struct({
  bucket: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  metageneration: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  pendingRenameInfo: Schema.optional(Schema.Struct({ operationId: Schema.optional(Schema.String) })),
})).annotate({ identifier: "Folder" }) as any as Schema.Schema<Folder>;

export interface Folders {
  /** The list of items. */
  items?: Array<Folder>;
  /** The kind of item this is. For lists of folders, this is always storage#folders. */
  kind?: string;
  /** The continuation token, used to page through large result sets. Provide this value in a subsequent request to return the next page of results. */
  nextPageToken?: string;
}

export const Folders: Schema.Schema<Folders> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(Folder)),
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "Folders" }) as any as Schema.Schema<Folders>;

export interface Expr {
  /** An optional description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
  /** Textual representation of an expression in Common Expression Language syntax. The application context of the containing message determines which well-known feature set of CEL is supported. */
  expression?: string;
  /** An optional string indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
  /** An optional title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
}

export const Expr: Schema.Schema<Expr> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  expression: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
})).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface GoogleRpcStatus {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** A developer-facing error message, which should be in English. */
  message?: string;
}

export const GoogleRpcStatus: Schema.Schema<GoogleRpcStatus> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleRpcStatus" }) as any as Schema.Schema<GoogleRpcStatus>;

export interface GoogleLongrunningOperation {
  /** If the value is "false", it means the operation is still in progress. If "true", the operation is completed, and either "error" or "response" is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: GoogleRpcStatus;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the "name" should be a resource name ending with "operations/{operationId}". */
  name?: string;
  /** The normal response of the operation in case of success. If the original method returns no data on success, such as "Delete", the response is google.protobuf.Empty. If the original method is standard Get/Create/Update, the response should be the resource. For other methods, the response should have the type "XxxResponse", where "Xxx" is the original method name. For example, if the original method name is "TakeSnapshot()", the inferred response type is "TakeSnapshotResponse". */
  response?: Record<string, unknown>;
  /** The link to this long running operation. */
  selfLink?: string;
  /** The kind of item this is. For operations, this is always storage#operation. */
  kind?: string;
}

export const GoogleLongrunningOperation: Schema.Schema<GoogleLongrunningOperation> = Schema.suspend(() => Schema.Struct({
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(GoogleRpcStatus),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  name: Schema.optional(Schema.String),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  selfLink: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleLongrunningOperation" }) as any as Schema.Schema<GoogleLongrunningOperation>;

export interface GoogleLongrunningListOperationsResponse {
  /** The continuation token, used to page through large result sets. Provide this value in a subsequent request to return the next page of results. */
  nextPageToken?: string;
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<GoogleLongrunningOperation>;
  /** The kind of item this is. For lists of operations, this is always storage#operations. */
  kind?: string;
}

export const GoogleLongrunningListOperationsResponse: Schema.Schema<GoogleLongrunningListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  operations: Schema.optional(Schema.Array(GoogleLongrunningOperation)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleLongrunningListOperationsResponse" }) as any as Schema.Schema<GoogleLongrunningListOperationsResponse>;

export interface HmacKeyMetadata {
  /** The ID of the HMAC Key. */
  accessId?: string;
  /** HTTP 1.1 Entity tag for the HMAC key. */
  etag?: string;
  /** The ID of the HMAC key, including the Project ID and the Access ID. */
  id?: string;
  /** The kind of item this is. For HMAC Key metadata, this is always storage#hmacKeyMetadata. */
  kind?: string;
  /** Project ID owning the service account to which the key authenticates. */
  projectId?: string;
  /** The link to this resource. */
  selfLink?: string;
  /** The email address of the key's associated service account. */
  serviceAccountEmail?: string;
  /** The state of the key. Can be one of ACTIVE, INACTIVE, or DELETED. */
  state?: string;
  /** The creation time of the HMAC key in RFC 3339 format. */
  timeCreated?: string;
  /** The last modification time of the HMAC key metadata in RFC 3339 format. */
  updated?: string;
}

export const HmacKeyMetadata: Schema.Schema<HmacKeyMetadata> = Schema.suspend(() => Schema.Struct({
  accessId: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  serviceAccountEmail: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  timeCreated: Schema.optional(Schema.String),
  updated: Schema.optional(Schema.String),
})).annotate({ identifier: "HmacKeyMetadata" }) as any as Schema.Schema<HmacKeyMetadata>;

export interface HmacKey {
  /** The kind of item this is. For HMAC keys, this is always storage#hmacKey. */
  kind?: string;
  /** Key metadata. */
  metadata?: HmacKeyMetadata;
  /** HMAC secret key material. */
  secret?: string;
}

export const HmacKey: Schema.Schema<HmacKey> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  metadata: Schema.optional(HmacKeyMetadata),
  secret: Schema.optional(Schema.String),
})).annotate({ identifier: "HmacKey" }) as any as Schema.Schema<HmacKey>;

export interface HmacKeysMetadata {
  /** The list of items. */
  items?: Array<HmacKeyMetadata>;
  /** The kind of item this is. For lists of hmacKeys, this is always storage#hmacKeysMetadata. */
  kind?: string;
  /** The continuation token, used to page through large result sets. Provide this value in a subsequent request to return the next page of results. */
  nextPageToken?: string;
}

export const HmacKeysMetadata: Schema.Schema<HmacKeysMetadata> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(HmacKeyMetadata)),
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "HmacKeysMetadata" }) as any as Schema.Schema<HmacKeysMetadata>;

export interface ManagedFolder {
  /** The name of the bucket containing this managed folder. */
  bucket?: string;
  /** The ID of the managed folder, including the bucket name and managed folder name. */
  id?: string;
  /** The kind of item this is. For managed folders, this is always storage#managedFolder. */
  kind?: string;
  /** The version of the metadata for this managed folder. Used for preconditions and for detecting changes in metadata. */
  metageneration?: string;
  /** The name of the managed folder. Required if not specified by URL parameter. */
  name?: string;
  /** The link to this managed folder. */
  selfLink?: string;
  /** The creation time of the managed folder in RFC 3339 format. */
  createTime?: string;
  /** The last update time of the managed folder metadata in RFC 3339 format. */
  updateTime?: string;
}

export const ManagedFolder: Schema.Schema<ManagedFolder> = Schema.suspend(() => Schema.Struct({
  bucket: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  metageneration: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ManagedFolder" }) as any as Schema.Schema<ManagedFolder>;

export interface ManagedFolders {
  /** The list of items. */
  items?: Array<ManagedFolder>;
  /** The kind of item this is. For lists of managed folders, this is always storage#managedFolders. */
  kind?: string;
  /** The continuation token, used to page through large result sets. Provide this value in a subsequent request to return the next page of results. */
  nextPageToken?: string;
}

export const ManagedFolders: Schema.Schema<ManagedFolders> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(ManagedFolder)),
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ManagedFolders" }) as any as Schema.Schema<ManagedFolders>;

export interface Notification {
  /** An optional list of additional attributes to attach to each Cloud PubSub message published for this notification subscription. */
  custom_attributes?: Record<string, string>;
  /** HTTP 1.1 Entity tag for this subscription notification. */
  etag?: string;
  /** If present, only send notifications about listed event types. If empty, sent notifications for all event types. */
  event_types?: Array<string>;
  /** The ID of the notification. */
  id?: string;
  /** The kind of item this is. For notifications, this is always storage#notification. */
  kind?: string;
  /** If present, only apply this notification configuration to object names that begin with this prefix. */
  object_name_prefix?: string;
  /** The desired content of the Payload. */
  payload_format?: string;
  /** The canonical URL of this notification. */
  selfLink?: string;
  /** The Cloud PubSub topic to which this subscription publishes. Formatted as: '//pubsub.googleapis.com/projects/{project-identifier}/topics/{my-topic}' */
  topic?: string;
}

export const Notification: Schema.Schema<Notification> = Schema.suspend(() => Schema.Struct({
  custom_attributes: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  etag: Schema.optional(Schema.String),
  event_types: Schema.optional(Schema.Array(Schema.String)),
  id: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  object_name_prefix: Schema.optional(Schema.String),
  payload_format: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  topic: Schema.optional(Schema.String),
})).annotate({ identifier: "Notification" }) as any as Schema.Schema<Notification>;

export interface Notifications {
  /** The list of items. */
  items?: Array<Notification>;
  /** The kind of item this is. For lists of notifications, this is always storage#notifications. */
  kind?: string;
}

export const Notifications: Schema.Schema<Notifications> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(Notification)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "Notifications" }) as any as Schema.Schema<Notifications>;

export interface ObjectAccessControls {
  /** The list of items. */
  items?: Array<ObjectAccessControl>;
  /** The kind of item this is. For lists of object access control entries, this is always storage#objectAccessControls. */
  kind?: string;
}

export const ObjectAccessControls: Schema.Schema<ObjectAccessControls> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(ObjectAccessControl)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ObjectAccessControls" }) as any as Schema.Schema<ObjectAccessControls>;

export interface Objects {
  /** The list of items. */
  items?: Array<Storage_Object>;
  /** The kind of item this is. For lists of objects, this is always storage#objects. */
  kind?: string;
  /** The continuation token, used to page through large result sets. Provide this value in a subsequent request to return the next page of results. */
  nextPageToken?: string;
  /** The list of prefixes of objects matching-but-not-listed up to and including the requested delimiter. */
  prefixes?: Array<string>;
}

export const Objects: Schema.Schema<Objects> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(Storage_Object)),
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  prefixes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Objects" }) as any as Schema.Schema<Objects>;

export interface Policy {
  /** An association between a role, which comes with a set of permissions, and members who may assume that role. */
  bindings?: Array<{ condition?: Expr; members?: Array<string>; role?: string }>;
  /** HTTP 1.1 Entity tag for the policy. */
  etag?: string;
  /** The kind of item this is. For policies, this is always storage#policy. This field is ignored on input. */
  kind?: string;
  /** The ID of the resource to which this policy belongs. Will be of the form projects/_/buckets/bucket for buckets, projects/_/buckets/bucket/objects/object for objects, and projects/_/buckets/bucket/managedFolders/managedFolder. A specific generation may be specified by appending #generationNumber to the end of the object name, e.g. projects/_/buckets/my-bucket/objects/data.txt#17. The current generation can be denoted with #0. This field is ignored on input. */
  resourceId?: string;
  /** The IAM policy format version. */
  version?: number;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  bindings: Schema.optional(Schema.Array(Schema.Struct({ condition: Schema.optional(Expr), members: Schema.optional(Schema.Array(Schema.String)), role: Schema.optional(Schema.String) }))),
  etag: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  resourceId: Schema.optional(Schema.String),
  version: Schema.optional(Schema.Number),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface RelocateBucketRequest {
  /** The new location the bucket will be relocated to. */
  destinationLocation?: string;
  /** The bucket's new custom placement configuration if relocating to a Custom Dual Region. */
  destinationCustomPlacementConfig?: { dataLocations?: Array<string> };
  /** If true, validate the operation, but do not actually relocate the bucket. */
  validateOnly?: boolean;
  /** Resource name of a Cloud KMS key, of the form projects/my-project/locations/global/keyRings/my-kr/cryptoKeys/my-key. If set, is used to encrypt all objects in the destination bucket. */
  destinationKmsKeyName?: string;
}

export const RelocateBucketRequest: Schema.Schema<RelocateBucketRequest> = Schema.suspend(() => Schema.Struct({
  destinationLocation: Schema.optional(Schema.String),
  destinationCustomPlacementConfig: Schema.optional(Schema.Struct({ dataLocations: Schema.optional(Schema.Array(Schema.String)) })),
  validateOnly: Schema.optional(Schema.Boolean),
  destinationKmsKeyName: Schema.optional(Schema.String),
})).annotate({ identifier: "RelocateBucketRequest" }) as any as Schema.Schema<RelocateBucketRequest>;

export interface RewriteResponse {
  /** true if the copy is finished; otherwise, false if the copy is in progress. This property is always present in the response. */
  done?: boolean;
  /** The kind of item this is. */
  kind?: string;
  /** The total size of the object being copied in bytes. This property is always present in the response. */
  objectSize?: string;
  /** A resource containing the metadata for the copied-to object. This property is present in the response only when copying completes. */
  resource?: Storage_Object;
  /** A token to use in subsequent requests to continue copying data. This token is present in the response only when there is more data to copy. */
  rewriteToken?: string;
  /** The total bytes written so far, which can be used to provide a waiting user with a progress indicator. This property is always present in the response. */
  totalBytesRewritten?: string;
}

export const RewriteResponse: Schema.Schema<RewriteResponse> = Schema.suspend(() => Schema.Struct({
  done: Schema.optional(Schema.Boolean),
  kind: Schema.optional(Schema.String),
  objectSize: Schema.optional(Schema.String),
  resource: Schema.optional(Storage_Object),
  rewriteToken: Schema.optional(Schema.String),
  totalBytesRewritten: Schema.optional(Schema.String),
})).annotate({ identifier: "RewriteResponse" }) as any as Schema.Schema<RewriteResponse>;

export interface ServiceAccount {
  /** The ID of the notification. */
  email_address?: string;
  /** The kind of item this is. For notifications, this is always storage#notification. */
  kind?: string;
}

export const ServiceAccount: Schema.Schema<ServiceAccount> = Schema.suspend(() => Schema.Struct({
  email_address: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ServiceAccount" }) as any as Schema.Schema<ServiceAccount>;

export interface TestIamPermissionsResponse {
  /** The kind of item this is. */
  kind?: string;
  /** The permissions held by the caller. Permissions are always of the format storage.resource.capability, where resource is one of buckets, objects, or managedFolders. The supported permissions are as follows: - storage.buckets.delete - Delete bucket. - storage.buckets.get - Read bucket metadata. - storage.buckets.getIamPolicy - Read bucket IAM policy. - storage.buckets.create - Create bucket. - storage.buckets.list - List buckets. - storage.buckets.setIamPolicy - Update bucket IAM policy. - storage.buckets.update - Update bucket metadata. - storage.objects.delete - Delete object. - storage.objects.get - Read object data and metadata. - storage.objects.getIamPolicy - Read object IAM policy. - storage.objects.create - Create object. - storage.objects.list - List objects. - storage.objects.setIamPolicy - Update object IAM policy. - storage.objects.update - Update object metadata. - storage.managedFolders.delete - Delete managed folder. - storage.managedFolders.get - Read managed folder metadata. - storage.managedFolders.getIamPolicy - Read managed folder IAM policy. - storage.managedFolders.create - Create managed folder. - storage.managedFolders.list - List managed folders. - storage.managedFolders.setIamPolicy - Update managed folder IAM policy. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsResponse" }) as any as Schema.Schema<TestIamPermissionsResponse>;

export interface BulkRestoreObjectsRequest {
  /** If false (default), the restore will not overwrite live objects with the same name at the destination. This means some deleted objects may be skipped. If true, live objects will be overwritten resulting in a noncurrent object (if versioning is enabled). If versioning is not enabled, overwriting the object will result in a soft-deleted object. In either case, if a noncurrent object already exists with the same name, a live version can be written without issue. */
  allowOverwrite?: boolean;
  /** Restores only the objects that were soft-deleted after this time. */
  softDeletedAfterTime?: string;
  /** Restores only the objects that were soft-deleted before this time. */
  softDeletedBeforeTime?: string;
  /** Restores only the objects matching any of the specified glob(s). If this parameter is not specified, all objects will be restored within the specified time range. */
  matchGlobs?: Array<string>;
  /** If true, copies the source object's ACL; otherwise, uses the bucket's default object ACL. The default is false. */
  copySourceAcl?: boolean;
  /** Restores only the objects that were created after this time. */
  createdAfterTime?: string;
  /** Restores only the objects that were created before this time. */
  createdBeforeTime?: string;
}

export const BulkRestoreObjectsRequest: Schema.Schema<BulkRestoreObjectsRequest> = Schema.suspend(() => Schema.Struct({
  allowOverwrite: Schema.optional(Schema.Boolean),
  softDeletedAfterTime: Schema.optional(Schema.String),
  softDeletedBeforeTime: Schema.optional(Schema.String),
  matchGlobs: Schema.optional(Schema.Array(Schema.String)),
  copySourceAcl: Schema.optional(Schema.Boolean),
  createdAfterTime: Schema.optional(Schema.String),
  createdBeforeTime: Schema.optional(Schema.String),
})).annotate({ identifier: "BulkRestoreObjectsRequest" }) as any as Schema.Schema<BulkRestoreObjectsRequest>;

// ==========================================================================
// Operations
// ==========================================================================

/** Creates an Anywhere Cache instance. */
export interface InsertAnywhereCachesRequest {
  /** Name of the parent bucket. */
  bucket: string;
  /** Request body */
  body?: AnywhereCache;
}

export const InsertAnywhereCachesRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  body: Schema.optional(AnywhereCache).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "b/{bucket}/anywhereCaches", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertAnywhereCachesRequest>;

export type InsertAnywhereCachesResponse = GoogleLongrunningOperation;
export const InsertAnywhereCachesResponse = GoogleLongrunningOperation;

export type InsertAnywhereCachesError = CommonErrors;

export const insertAnywhereCaches: API.OperationMethod<InsertAnywhereCachesRequest, InsertAnywhereCachesResponse, InsertAnywhereCachesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertAnywhereCachesRequest,
  output: InsertAnywhereCachesResponse,
  errors: [],
}));

/** Updates the config(ttl and admissionPolicy) of an Anywhere Cache instance. */
export interface UpdateAnywhereCachesRequest {
  /** Name of the parent bucket. */
  bucket: string;
  /** The ID of requested Anywhere Cache instance. */
  anywhereCacheId: string;
  /** Request body */
  body?: AnywhereCache;
}

export const UpdateAnywhereCachesRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  anywhereCacheId: Schema.String.pipe(T.HttpPath("anywhereCacheId")),
  body: Schema.optional(AnywhereCache).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "b/{bucket}/anywhereCaches/{anywhereCacheId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAnywhereCachesRequest>;

export type UpdateAnywhereCachesResponse = GoogleLongrunningOperation;
export const UpdateAnywhereCachesResponse = GoogleLongrunningOperation;

export type UpdateAnywhereCachesError = CommonErrors;

export const updateAnywhereCaches: API.OperationMethod<UpdateAnywhereCachesRequest, UpdateAnywhereCachesResponse, UpdateAnywhereCachesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAnywhereCachesRequest,
  output: UpdateAnywhereCachesResponse,
  errors: [],
}));

/** Returns the metadata of an Anywhere Cache instance. */
export interface GetAnywhereCachesRequest {
  /** Name of the parent bucket. */
  bucket: string;
  /** The ID of requested Anywhere Cache instance. */
  anywhereCacheId: string;
}

export const GetAnywhereCachesRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  anywhereCacheId: Schema.String.pipe(T.HttpPath("anywhereCacheId")),
}).pipe(
  T.Http({ method: "GET", path: "b/{bucket}/anywhereCaches/{anywhereCacheId}" }),
  svc,
) as unknown as Schema.Schema<GetAnywhereCachesRequest>;

export type GetAnywhereCachesResponse = AnywhereCache;
export const GetAnywhereCachesResponse = AnywhereCache;

export type GetAnywhereCachesError = CommonErrors;

export const getAnywhereCaches: API.OperationMethod<GetAnywhereCachesRequest, GetAnywhereCachesResponse, GetAnywhereCachesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAnywhereCachesRequest,
  output: GetAnywhereCachesResponse,
  errors: [],
}));

/** Returns a list of Anywhere Cache instances of the bucket matching the criteria. */
export interface ListAnywhereCachesRequest {
  /** Name of the parent bucket. */
  bucket: string;
  /** Maximum number of items to return in a single page of responses. Maximum 1000. */
  pageSize?: number;
  /** A previously-returned page token representing part of the larger set of results to view. */
  pageToken?: string;
}

export const ListAnywhereCachesRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "b/{bucket}/anywhereCaches" }),
  svc,
) as unknown as Schema.Schema<ListAnywhereCachesRequest>;

export type ListAnywhereCachesResponse = AnywhereCaches;
export const ListAnywhereCachesResponse = AnywhereCaches;

export type ListAnywhereCachesError = CommonErrors;

export const listAnywhereCaches = API.makePaginated(() => ({
  input: ListAnywhereCachesRequest,
  output: ListAnywhereCachesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

/** Pauses an Anywhere Cache instance. */
export interface PauseAnywhereCachesRequest {
  /** Name of the parent bucket. */
  bucket: string;
  /** The ID of requested Anywhere Cache instance. */
  anywhereCacheId: string;
}

export const PauseAnywhereCachesRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  anywhereCacheId: Schema.String.pipe(T.HttpPath("anywhereCacheId")),
}).pipe(
  T.Http({ method: "POST", path: "b/{bucket}/anywhereCaches/{anywhereCacheId}/pause", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PauseAnywhereCachesRequest>;

export type PauseAnywhereCachesResponse = AnywhereCache;
export const PauseAnywhereCachesResponse = AnywhereCache;

export type PauseAnywhereCachesError = CommonErrors;

export const pauseAnywhereCaches: API.OperationMethod<PauseAnywhereCachesRequest, PauseAnywhereCachesResponse, PauseAnywhereCachesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PauseAnywhereCachesRequest,
  output: PauseAnywhereCachesResponse,
  errors: [],
}));

/** Resumes a paused or disabled Anywhere Cache instance. */
export interface ResumeAnywhereCachesRequest {
  /** Name of the parent bucket. */
  bucket: string;
  /** The ID of requested Anywhere Cache instance. */
  anywhereCacheId: string;
}

export const ResumeAnywhereCachesRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  anywhereCacheId: Schema.String.pipe(T.HttpPath("anywhereCacheId")),
}).pipe(
  T.Http({ method: "POST", path: "b/{bucket}/anywhereCaches/{anywhereCacheId}/resume", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResumeAnywhereCachesRequest>;

export type ResumeAnywhereCachesResponse = AnywhereCache;
export const ResumeAnywhereCachesResponse = AnywhereCache;

export type ResumeAnywhereCachesError = CommonErrors;

export const resumeAnywhereCaches: API.OperationMethod<ResumeAnywhereCachesRequest, ResumeAnywhereCachesResponse, ResumeAnywhereCachesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResumeAnywhereCachesRequest,
  output: ResumeAnywhereCachesResponse,
  errors: [],
}));

/** Disables an Anywhere Cache instance. */
export interface DisableAnywhereCachesRequest {
  /** Name of the parent bucket. */
  bucket: string;
  /** The ID of requested Anywhere Cache instance. */
  anywhereCacheId: string;
}

export const DisableAnywhereCachesRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  anywhereCacheId: Schema.String.pipe(T.HttpPath("anywhereCacheId")),
}).pipe(
  T.Http({ method: "POST", path: "b/{bucket}/anywhereCaches/{anywhereCacheId}/disable", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DisableAnywhereCachesRequest>;

export type DisableAnywhereCachesResponse = AnywhereCache;
export const DisableAnywhereCachesResponse = AnywhereCache;

export type DisableAnywhereCachesError = CommonErrors;

export const disableAnywhereCaches: API.OperationMethod<DisableAnywhereCachesRequest, DisableAnywhereCachesResponse, DisableAnywhereCachesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DisableAnywhereCachesRequest,
  output: DisableAnywhereCachesResponse,
  errors: [],
}));

/** Permanently deletes the ACL entry for the specified entity on the specified bucket. */
export interface DeleteBucketAccessControlsRequest {
  /** Name of a bucket. */
  bucket: string;
  /** The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers. */
  entity: string;
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
}

export const DeleteBucketAccessControlsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  entity: Schema.String.pipe(T.HttpPath("entity")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
}).pipe(
  T.Http({ method: "DELETE", path: "b/{bucket}/acl/{entity}" }),
  svc,
) as unknown as Schema.Schema<DeleteBucketAccessControlsRequest>;

export interface DeleteBucketAccessControlsResponse {}
export const DeleteBucketAccessControlsResponse: Schema.Schema<DeleteBucketAccessControlsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteBucketAccessControlsResponse>;

export type DeleteBucketAccessControlsError = CommonErrors;

export const deleteBucketAccessControls: API.OperationMethod<DeleteBucketAccessControlsRequest, DeleteBucketAccessControlsResponse, DeleteBucketAccessControlsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteBucketAccessControlsRequest,
  output: DeleteBucketAccessControlsResponse,
  errors: [],
}));

/** Returns the ACL entry for the specified entity on the specified bucket. */
export interface GetBucketAccessControlsRequest {
  /** Name of a bucket. */
  bucket: string;
  /** The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers. */
  entity: string;
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
}

export const GetBucketAccessControlsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  entity: Schema.String.pipe(T.HttpPath("entity")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
}).pipe(
  T.Http({ method: "GET", path: "b/{bucket}/acl/{entity}" }),
  svc,
) as unknown as Schema.Schema<GetBucketAccessControlsRequest>;

export type GetBucketAccessControlsResponse = BucketAccessControl;
export const GetBucketAccessControlsResponse = BucketAccessControl;

export type GetBucketAccessControlsError = CommonErrors;

export const getBucketAccessControls: API.OperationMethod<GetBucketAccessControlsRequest, GetBucketAccessControlsResponse, GetBucketAccessControlsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBucketAccessControlsRequest,
  output: GetBucketAccessControlsResponse,
  errors: [],
}));

/** Creates a new ACL entry on the specified bucket. */
export interface InsertBucketAccessControlsRequest {
  /** Name of a bucket. */
  bucket: string;
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
  /** Request body */
  body?: BucketAccessControl;
}

export const InsertBucketAccessControlsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
  body: Schema.optional(BucketAccessControl).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "b/{bucket}/acl", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertBucketAccessControlsRequest>;

export type InsertBucketAccessControlsResponse = BucketAccessControl;
export const InsertBucketAccessControlsResponse = BucketAccessControl;

export type InsertBucketAccessControlsError = CommonErrors;

export const insertBucketAccessControls: API.OperationMethod<InsertBucketAccessControlsRequest, InsertBucketAccessControlsResponse, InsertBucketAccessControlsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertBucketAccessControlsRequest,
  output: InsertBucketAccessControlsResponse,
  errors: [],
}));

/** Retrieves ACL entries on the specified bucket. */
export interface ListBucketAccessControlsRequest {
  /** Name of a bucket. */
  bucket: string;
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
}

export const ListBucketAccessControlsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
}).pipe(
  T.Http({ method: "GET", path: "b/{bucket}/acl" }),
  svc,
) as unknown as Schema.Schema<ListBucketAccessControlsRequest>;

export type ListBucketAccessControlsResponse = BucketAccessControls;
export const ListBucketAccessControlsResponse = BucketAccessControls;

export type ListBucketAccessControlsError = CommonErrors;

export const listBucketAccessControls: API.OperationMethod<ListBucketAccessControlsRequest, ListBucketAccessControlsResponse, ListBucketAccessControlsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListBucketAccessControlsRequest,
  output: ListBucketAccessControlsResponse,
  errors: [],
}));

/** Patches an ACL entry on the specified bucket. */
export interface PatchBucketAccessControlsRequest {
  /** Name of a bucket. */
  bucket: string;
  /** The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers. */
  entity: string;
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
  /** Request body */
  body?: BucketAccessControl;
}

export const PatchBucketAccessControlsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  entity: Schema.String.pipe(T.HttpPath("entity")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
  body: Schema.optional(BucketAccessControl).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "b/{bucket}/acl/{entity}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchBucketAccessControlsRequest>;

export type PatchBucketAccessControlsResponse = BucketAccessControl;
export const PatchBucketAccessControlsResponse = BucketAccessControl;

export type PatchBucketAccessControlsError = CommonErrors;

export const patchBucketAccessControls: API.OperationMethod<PatchBucketAccessControlsRequest, PatchBucketAccessControlsResponse, PatchBucketAccessControlsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchBucketAccessControlsRequest,
  output: PatchBucketAccessControlsResponse,
  errors: [],
}));

/** Updates an ACL entry on the specified bucket. */
export interface UpdateBucketAccessControlsRequest {
  /** Name of a bucket. */
  bucket: string;
  /** The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers. */
  entity: string;
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
  /** Request body */
  body?: BucketAccessControl;
}

export const UpdateBucketAccessControlsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  entity: Schema.String.pipe(T.HttpPath("entity")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
  body: Schema.optional(BucketAccessControl).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "b/{bucket}/acl/{entity}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateBucketAccessControlsRequest>;

export type UpdateBucketAccessControlsResponse = BucketAccessControl;
export const UpdateBucketAccessControlsResponse = BucketAccessControl;

export type UpdateBucketAccessControlsError = CommonErrors;

export const updateBucketAccessControls: API.OperationMethod<UpdateBucketAccessControlsRequest, UpdateBucketAccessControlsResponse, UpdateBucketAccessControlsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateBucketAccessControlsRequest,
  output: UpdateBucketAccessControlsResponse,
  errors: [],
}));

/** Deletes an empty bucket. Deletions are permanent unless soft delete is enabled on the bucket. */
export interface DeleteBucketsRequest {
  /** Name of a bucket. */
  bucket: string;
  /** If set, only deletes the bucket if its metageneration matches this value. */
  ifMetagenerationMatch?: string;
  /** If set, only deletes the bucket if its metageneration does not match this value. */
  ifMetagenerationNotMatch?: string;
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
}

export const DeleteBucketsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  ifMetagenerationMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationMatch")),
  ifMetagenerationNotMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationNotMatch")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
}).pipe(
  T.Http({ method: "DELETE", path: "b/{bucket}" }),
  svc,
) as unknown as Schema.Schema<DeleteBucketsRequest>;

export interface DeleteBucketsResponse {}
export const DeleteBucketsResponse: Schema.Schema<DeleteBucketsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteBucketsResponse>;

export type DeleteBucketsError = CommonErrors;

export const deleteBuckets: API.OperationMethod<DeleteBucketsRequest, DeleteBucketsResponse, DeleteBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteBucketsRequest,
  output: DeleteBucketsResponse,
  errors: [],
}));

/** Restores a soft-deleted bucket. */
export interface RestoreBucketsRequest {
  /** Name of a bucket. */
  bucket: string;
  /** Generation of a bucket. */
  generation: string;
  /** Set of properties to return. Defaults to full. */
  projection?: "full" | "noAcl" | (string & {});
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
}

export const RestoreBucketsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  generation: Schema.String.pipe(T.HttpQuery("generation")),
  projection: Schema.optional(Schema.String).pipe(T.HttpQuery("projection")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
}).pipe(
  T.Http({ method: "POST", path: "b/{bucket}/restore", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RestoreBucketsRequest>;

export type RestoreBucketsResponse = Bucket;
export const RestoreBucketsResponse = Bucket;

export type RestoreBucketsError = CommonErrors;

export const restoreBuckets: API.OperationMethod<RestoreBucketsRequest, RestoreBucketsResponse, RestoreBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RestoreBucketsRequest,
  output: RestoreBucketsResponse,
  errors: [],
}));

/** Initiates a long-running Relocate Bucket operation on the specified bucket. */
export interface RelocateBucketsRequest {
  /** Name of the bucket to be moved. */
  bucket: string;
  /** Request body */
  body?: RelocateBucketRequest;
}

export const RelocateBucketsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  body: Schema.optional(RelocateBucketRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "b/{bucket}/relocate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RelocateBucketsRequest>;

export type RelocateBucketsResponse = GoogleLongrunningOperation;
export const RelocateBucketsResponse = GoogleLongrunningOperation;

export type RelocateBucketsError = CommonErrors;

export const relocateBuckets: API.OperationMethod<RelocateBucketsRequest, RelocateBucketsResponse, RelocateBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RelocateBucketsRequest,
  output: RelocateBucketsResponse,
  errors: [],
}));

/** Returns metadata for the specified bucket. */
export interface GetBucketsRequest {
  /** Name of a bucket. */
  bucket: string;
  /** If present, specifies the generation of the bucket. This is required if softDeleted is true. */
  generation?: string;
  /** If true, return the soft-deleted version of this bucket. The default is false. For more information, see [Soft Delete](https://cloud.google.com/storage/docs/soft-delete). */
  softDeleted?: boolean;
  /** Makes the return of the bucket metadata conditional on whether the bucket's current metageneration matches the given value. */
  ifMetagenerationMatch?: string;
  /** Makes the return of the bucket metadata conditional on whether the bucket's current metageneration does not match the given value. */
  ifMetagenerationNotMatch?: string;
  /** Set of properties to return. Defaults to noAcl. */
  projection?: "full" | "noAcl" | (string & {});
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
}

export const GetBucketsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  generation: Schema.optional(Schema.String).pipe(T.HttpQuery("generation")),
  softDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("softDeleted")),
  ifMetagenerationMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationMatch")),
  ifMetagenerationNotMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationNotMatch")),
  projection: Schema.optional(Schema.String).pipe(T.HttpQuery("projection")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
}).pipe(
  T.Http({ method: "GET", path: "b/{bucket}" }),
  svc,
) as unknown as Schema.Schema<GetBucketsRequest>;

export type GetBucketsResponse = Bucket;
export const GetBucketsResponse = Bucket;

export type GetBucketsError = CommonErrors;

export const getBuckets: API.OperationMethod<GetBucketsRequest, GetBucketsResponse, GetBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBucketsRequest,
  output: GetBucketsResponse,
  errors: [],
}));

/** Returns an IAM policy for the specified bucket. */
export interface GetIamPolicyBucketsRequest {
  /** Name of a bucket. */
  bucket: string;
  /** The IAM policy format version to be returned. If the optionsRequestedPolicyVersion is for an older version that doesn't support part of the requested IAM policy, the request fails. */
  optionsRequestedPolicyVersion?: number;
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
}

export const GetIamPolicyBucketsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  optionsRequestedPolicyVersion: Schema.optional(Schema.Number).pipe(T.HttpQuery("optionsRequestedPolicyVersion")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
}).pipe(
  T.Http({ method: "GET", path: "b/{bucket}/iam" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyBucketsRequest>;

export type GetIamPolicyBucketsResponse = Policy;
export const GetIamPolicyBucketsResponse = Policy;

export type GetIamPolicyBucketsError = CommonErrors;

export const getIamPolicyBuckets: API.OperationMethod<GetIamPolicyBucketsRequest, GetIamPolicyBucketsResponse, GetIamPolicyBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyBucketsRequest,
  output: GetIamPolicyBucketsResponse,
  errors: [],
}));

/** Returns the storage layout configuration for the specified bucket. Note that this operation requires storage.objects.list permission. */
export interface GetStorageLayoutBucketsRequest {
  /** Name of a bucket. */
  bucket: string;
  /** An optional prefix used for permission check. It is useful when the caller only has storage.objects.list permission under a specific prefix. */
  prefix?: string;
}

export const GetStorageLayoutBucketsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  prefix: Schema.optional(Schema.String).pipe(T.HttpQuery("prefix")),
}).pipe(
  T.Http({ method: "GET", path: "b/{bucket}/storageLayout" }),
  svc,
) as unknown as Schema.Schema<GetStorageLayoutBucketsRequest>;

export type GetStorageLayoutBucketsResponse = BucketStorageLayout;
export const GetStorageLayoutBucketsResponse = BucketStorageLayout;

export type GetStorageLayoutBucketsError = CommonErrors;

export const getStorageLayoutBuckets: API.OperationMethod<GetStorageLayoutBucketsRequest, GetStorageLayoutBucketsResponse, GetStorageLayoutBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetStorageLayoutBucketsRequest,
  output: GetStorageLayoutBucketsResponse,
  errors: [],
}));

/** Creates a new bucket. */
export interface InsertBucketsRequest {
  /** Apply a predefined set of access controls to this bucket. */
  predefinedAcl?: "authenticatedRead" | "private" | "projectPrivate" | "publicRead" | "publicReadWrite" | (string & {});
  /** Apply a predefined set of default object access controls to this bucket. */
  predefinedDefaultObjectAcl?: "authenticatedRead" | "bucketOwnerFullControl" | "bucketOwnerRead" | "private" | "projectPrivate" | "publicRead" | (string & {});
  /** A valid API project identifier. */
  project: string;
  /** Set of properties to return. Defaults to noAcl, unless the bucket resource specifies acl or defaultObjectAcl properties, when it defaults to full. */
  projection?: "full" | "noAcl" | (string & {});
  /** The project to be billed for this request. */
  userProject?: string;
  /** When set to true, object retention is enabled for this bucket. */
  enableObjectRetention?: boolean;
  /** Request body */
  body?: Bucket;
}

export const InsertBucketsRequest = Schema.Struct({
  predefinedAcl: Schema.optional(Schema.String).pipe(T.HttpQuery("predefinedAcl")),
  predefinedDefaultObjectAcl: Schema.optional(Schema.String).pipe(T.HttpQuery("predefinedDefaultObjectAcl")),
  project: Schema.String.pipe(T.HttpQuery("project")),
  projection: Schema.optional(Schema.String).pipe(T.HttpQuery("projection")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
  enableObjectRetention: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("enableObjectRetention")),
  body: Schema.optional(Bucket).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "b", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertBucketsRequest>;

export type InsertBucketsResponse = Bucket;
export const InsertBucketsResponse = Bucket;

export type InsertBucketsError = CommonErrors;

export const insertBuckets: API.OperationMethod<InsertBucketsRequest, InsertBucketsResponse, InsertBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertBucketsRequest,
  output: InsertBucketsResponse,
  errors: [],
}));

/** Retrieves a list of buckets for a given project. */
export interface ListBucketsRequest {
  /** Maximum number of buckets to return in a single response. The service will use this parameter or 1,000 items, whichever is smaller. */
  maxResults?: number;
  /** A previously-returned page token representing part of the larger set of results to view. */
  pageToken?: string;
  /** Filter results to buckets whose names begin with this prefix. */
  prefix?: string;
  /** If true, only soft-deleted bucket versions will be returned. The default is false. For more information, see [Soft Delete](https://cloud.google.com/storage/docs/soft-delete). */
  softDeleted?: boolean;
  /** A valid API project identifier. */
  project: string;
  /** Set of properties to return. Defaults to noAcl. */
  projection?: "full" | "noAcl" | (string & {});
  /** The project to be billed for this request. */
  userProject?: string;
  /** If true, return a list of bucket resource names for buckets that are in unreachable locations. */
  returnPartialSuccess?: boolean;
}

export const ListBucketsRequest = Schema.Struct({
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  prefix: Schema.optional(Schema.String).pipe(T.HttpQuery("prefix")),
  softDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("softDeleted")),
  project: Schema.String.pipe(T.HttpQuery("project")),
  projection: Schema.optional(Schema.String).pipe(T.HttpQuery("projection")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "b" }),
  svc,
) as unknown as Schema.Schema<ListBucketsRequest>;

export type ListBucketsResponse = Buckets;
export const ListBucketsResponse = Buckets;

export type ListBucketsError = CommonErrors;

export const listBuckets = API.makePaginated(() => ({
  input: ListBucketsRequest,
  output: ListBucketsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

/** Locks retention policy on a bucket. */
export interface LockRetentionPolicyBucketsRequest {
  /** Name of a bucket. */
  bucket: string;
  /** Makes the operation conditional on whether bucket's current metageneration matches the given value. */
  ifMetagenerationMatch: string;
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
}

export const LockRetentionPolicyBucketsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  ifMetagenerationMatch: Schema.String.pipe(T.HttpQuery("ifMetagenerationMatch")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
}).pipe(
  T.Http({ method: "POST", path: "b/{bucket}/lockRetentionPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<LockRetentionPolicyBucketsRequest>;

export type LockRetentionPolicyBucketsResponse = Bucket;
export const LockRetentionPolicyBucketsResponse = Bucket;

export type LockRetentionPolicyBucketsError = CommonErrors;

export const lockRetentionPolicyBuckets: API.OperationMethod<LockRetentionPolicyBucketsRequest, LockRetentionPolicyBucketsResponse, LockRetentionPolicyBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LockRetentionPolicyBucketsRequest,
  output: LockRetentionPolicyBucketsResponse,
  errors: [],
}));

/** Patches a bucket. Changes to the bucket will be readable immediately after writing, but configuration changes may take time to propagate. */
export interface PatchBucketsRequest {
  /** Name of a bucket. */
  bucket: string;
  /** Makes the return of the bucket metadata conditional on whether the bucket's current metageneration matches the given value. */
  ifMetagenerationMatch?: string;
  /** Makes the return of the bucket metadata conditional on whether the bucket's current metageneration does not match the given value. */
  ifMetagenerationNotMatch?: string;
  /** Apply a predefined set of access controls to this bucket. */
  predefinedAcl?: "authenticatedRead" | "private" | "projectPrivate" | "publicRead" | "publicReadWrite" | (string & {});
  /** Apply a predefined set of default object access controls to this bucket. */
  predefinedDefaultObjectAcl?: "authenticatedRead" | "bucketOwnerFullControl" | "bucketOwnerRead" | "private" | "projectPrivate" | "publicRead" | (string & {});
  /** Set of properties to return. Defaults to full. */
  projection?: "full" | "noAcl" | (string & {});
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
  /** Request body */
  body?: Bucket;
}

export const PatchBucketsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  ifMetagenerationMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationMatch")),
  ifMetagenerationNotMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationNotMatch")),
  predefinedAcl: Schema.optional(Schema.String).pipe(T.HttpQuery("predefinedAcl")),
  predefinedDefaultObjectAcl: Schema.optional(Schema.String).pipe(T.HttpQuery("predefinedDefaultObjectAcl")),
  projection: Schema.optional(Schema.String).pipe(T.HttpQuery("projection")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
  body: Schema.optional(Bucket).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "b/{bucket}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchBucketsRequest>;

export type PatchBucketsResponse = Bucket;
export const PatchBucketsResponse = Bucket;

export type PatchBucketsError = CommonErrors;

export const patchBuckets: API.OperationMethod<PatchBucketsRequest, PatchBucketsResponse, PatchBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchBucketsRequest,
  output: PatchBucketsResponse,
  errors: [],
}));

/** Updates an IAM policy for the specified bucket. */
export interface SetIamPolicyBucketsRequest {
  /** Name of a bucket. */
  bucket: string;
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
  /** Request body */
  body?: Policy;
}

export const SetIamPolicyBucketsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
  body: Schema.optional(Policy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "b/{bucket}/iam", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyBucketsRequest>;

export type SetIamPolicyBucketsResponse = Policy;
export const SetIamPolicyBucketsResponse = Policy;

export type SetIamPolicyBucketsError = CommonErrors;

export const setIamPolicyBuckets: API.OperationMethod<SetIamPolicyBucketsRequest, SetIamPolicyBucketsResponse, SetIamPolicyBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyBucketsRequest,
  output: SetIamPolicyBucketsResponse,
  errors: [],
}));

/** Tests a set of permissions on the given bucket to see which, if any, are held by the caller. */
export interface TestIamPermissionsBucketsRequest {
  /** Name of a bucket. */
  bucket: string;
  /** Permissions to test. */
  permissions: string[];
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
}

export const TestIamPermissionsBucketsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  permissions: Schema.Array(Schema.String).pipe(T.HttpQuery("permissions")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
}).pipe(
  T.Http({ method: "GET", path: "b/{bucket}/iam/testPermissions" }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsBucketsRequest>;

export type TestIamPermissionsBucketsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsBucketsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsBucketsError = CommonErrors;

export const testIamPermissionsBuckets: API.OperationMethod<TestIamPermissionsBucketsRequest, TestIamPermissionsBucketsResponse, TestIamPermissionsBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsBucketsRequest,
  output: TestIamPermissionsBucketsResponse,
  errors: [],
}));

/** Updates a bucket. Changes to the bucket will be readable immediately after writing, but configuration changes may take time to propagate. */
export interface UpdateBucketsRequest {
  /** Name of a bucket. */
  bucket: string;
  /** Makes the return of the bucket metadata conditional on whether the bucket's current metageneration matches the given value. */
  ifMetagenerationMatch?: string;
  /** Makes the return of the bucket metadata conditional on whether the bucket's current metageneration does not match the given value. */
  ifMetagenerationNotMatch?: string;
  /** Apply a predefined set of access controls to this bucket. */
  predefinedAcl?: "authenticatedRead" | "private" | "projectPrivate" | "publicRead" | "publicReadWrite" | (string & {});
  /** Apply a predefined set of default object access controls to this bucket. */
  predefinedDefaultObjectAcl?: "authenticatedRead" | "bucketOwnerFullControl" | "bucketOwnerRead" | "private" | "projectPrivate" | "publicRead" | (string & {});
  /** Set of properties to return. Defaults to full. */
  projection?: "full" | "noAcl" | (string & {});
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
  /** Request body */
  body?: Bucket;
}

export const UpdateBucketsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  ifMetagenerationMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationMatch")),
  ifMetagenerationNotMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationNotMatch")),
  predefinedAcl: Schema.optional(Schema.String).pipe(T.HttpQuery("predefinedAcl")),
  predefinedDefaultObjectAcl: Schema.optional(Schema.String).pipe(T.HttpQuery("predefinedDefaultObjectAcl")),
  projection: Schema.optional(Schema.String).pipe(T.HttpQuery("projection")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
  body: Schema.optional(Bucket).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "b/{bucket}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateBucketsRequest>;

export type UpdateBucketsResponse = Bucket;
export const UpdateBucketsResponse = Bucket;

export type UpdateBucketsError = CommonErrors;

export const updateBuckets: API.OperationMethod<UpdateBucketsRequest, UpdateBucketsResponse, UpdateBucketsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateBucketsRequest,
  output: UpdateBucketsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. */
export interface CancelOperationsRequest {
  /** The parent bucket of the operation resource. */
  bucket: string;
  /** The ID of the operation resource. */
  operationId: string;
}

export const CancelOperationsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  operationId: Schema.String.pipe(T.HttpPath("operationId")),
}).pipe(
  T.Http({ method: "POST", path: "b/{bucket}/operations/{operationId}/cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelOperationsRequest>;

export interface CancelOperationsResponse {}
export const CancelOperationsResponse: Schema.Schema<CancelOperationsResponse> = Schema.Struct({}) as any as Schema.Schema<CancelOperationsResponse>;

export type CancelOperationsError = CommonErrors;

export const cancelOperations: API.OperationMethod<CancelOperationsRequest, CancelOperationsResponse, CancelOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelOperationsRequest,
  output: CancelOperationsResponse,
  errors: [],
}));

/** Gets the latest state of a long-running operation. */
export interface GetOperationsRequest {
  /** The parent bucket of the operation resource. */
  bucket: string;
  /** The ID of the operation resource. */
  operationId: string;
}

export const GetOperationsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  operationId: Schema.String.pipe(T.HttpPath("operationId")),
}).pipe(
  T.Http({ method: "GET", path: "b/{bucket}/operations/{operationId}" }),
  svc,
) as unknown as Schema.Schema<GetOperationsRequest>;

export type GetOperationsResponse = GoogleLongrunningOperation;
export const GetOperationsResponse = GoogleLongrunningOperation;

export type GetOperationsError = CommonErrors;

export const getOperations: API.OperationMethod<GetOperationsRequest, GetOperationsResponse, GetOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOperationsRequest,
  output: GetOperationsResponse,
  errors: [],
}));

/** Starts asynchronous advancement of the relocate bucket operation in the case of required write downtime, to allow it to lock the bucket at the source location, and proceed with the bucket location swap. The server makes a best effort to advance the relocate bucket operation, but success is not guaranteed. */
export interface AdvanceRelocateBucketOperationsRequest {
  /** Name of the bucket to advance the relocate for. */
  bucket: string;
  /** ID of the operation resource. */
  operationId: string;
  /** Request body */
  body?: AdvanceRelocateBucketOperationRequest;
}

export const AdvanceRelocateBucketOperationsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  operationId: Schema.String.pipe(T.HttpPath("operationId")),
  body: Schema.optional(AdvanceRelocateBucketOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "b/{bucket}/operations/{operationId}/advanceRelocateBucket", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AdvanceRelocateBucketOperationsRequest>;

export interface AdvanceRelocateBucketOperationsResponse {}
export const AdvanceRelocateBucketOperationsResponse: Schema.Schema<AdvanceRelocateBucketOperationsResponse> = Schema.Struct({}) as any as Schema.Schema<AdvanceRelocateBucketOperationsResponse>;

export type AdvanceRelocateBucketOperationsError = CommonErrors;

export const advanceRelocateBucketOperations: API.OperationMethod<AdvanceRelocateBucketOperationsRequest, AdvanceRelocateBucketOperationsResponse, AdvanceRelocateBucketOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AdvanceRelocateBucketOperationsRequest,
  output: AdvanceRelocateBucketOperationsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. */
export interface ListOperationsRequest {
  /** A filter to narrow down results to a preferred subset. The filtering language is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** Name of the bucket in which to look for operations. */
  bucket: string;
  /** Maximum number of items to return in a single page of responses. Fewer total results may be returned than requested. The service uses this parameter or 100 items, whichever is smaller. */
  pageSize?: number;
  /** A previously-returned page token representing part of the larger set of results to view. */
  pageToken?: string;
}

export const ListOperationsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "b/{bucket}/operations" }),
  svc,
) as unknown as Schema.Schema<ListOperationsRequest>;

export type ListOperationsResponse = GoogleLongrunningListOperationsResponse;
export const ListOperationsResponse = GoogleLongrunningListOperationsResponse;

export type ListOperationsError = CommonErrors;

export const listOperations = API.makePaginated(() => ({
  input: ListOperationsRequest,
  output: ListOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Stop watching resources through this channel */
export interface StopChannelsRequest {
  /** Request body */
  body?: Channel;
}

export const StopChannelsRequest = Schema.Struct({
  body: Schema.optional(Channel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "channels/stop", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StopChannelsRequest>;

export interface StopChannelsResponse {}
export const StopChannelsResponse: Schema.Schema<StopChannelsResponse> = Schema.Struct({}) as any as Schema.Schema<StopChannelsResponse>;

export type StopChannelsError = CommonErrors;

export const stopChannels: API.OperationMethod<StopChannelsRequest, StopChannelsResponse, StopChannelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: StopChannelsRequest,
  output: StopChannelsResponse,
  errors: [],
}));

/** Permanently deletes the default object ACL entry for the specified entity on the specified bucket. */
export interface DeleteDefaultObjectAccessControlsRequest {
  /** Name of a bucket. */
  bucket: string;
  /** The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers. */
  entity: string;
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
}

export const DeleteDefaultObjectAccessControlsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  entity: Schema.String.pipe(T.HttpPath("entity")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
}).pipe(
  T.Http({ method: "DELETE", path: "b/{bucket}/defaultObjectAcl/{entity}" }),
  svc,
) as unknown as Schema.Schema<DeleteDefaultObjectAccessControlsRequest>;

export interface DeleteDefaultObjectAccessControlsResponse {}
export const DeleteDefaultObjectAccessControlsResponse: Schema.Schema<DeleteDefaultObjectAccessControlsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteDefaultObjectAccessControlsResponse>;

export type DeleteDefaultObjectAccessControlsError = CommonErrors;

export const deleteDefaultObjectAccessControls: API.OperationMethod<DeleteDefaultObjectAccessControlsRequest, DeleteDefaultObjectAccessControlsResponse, DeleteDefaultObjectAccessControlsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteDefaultObjectAccessControlsRequest,
  output: DeleteDefaultObjectAccessControlsResponse,
  errors: [],
}));

/** Returns the default object ACL entry for the specified entity on the specified bucket. */
export interface GetDefaultObjectAccessControlsRequest {
  /** Name of a bucket. */
  bucket: string;
  /** The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers. */
  entity: string;
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
}

export const GetDefaultObjectAccessControlsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  entity: Schema.String.pipe(T.HttpPath("entity")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
}).pipe(
  T.Http({ method: "GET", path: "b/{bucket}/defaultObjectAcl/{entity}" }),
  svc,
) as unknown as Schema.Schema<GetDefaultObjectAccessControlsRequest>;

export type GetDefaultObjectAccessControlsResponse = ObjectAccessControl;
export const GetDefaultObjectAccessControlsResponse = ObjectAccessControl;

export type GetDefaultObjectAccessControlsError = CommonErrors;

export const getDefaultObjectAccessControls: API.OperationMethod<GetDefaultObjectAccessControlsRequest, GetDefaultObjectAccessControlsResponse, GetDefaultObjectAccessControlsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetDefaultObjectAccessControlsRequest,
  output: GetDefaultObjectAccessControlsResponse,
  errors: [],
}));

/** Creates a new default object ACL entry on the specified bucket. */
export interface InsertDefaultObjectAccessControlsRequest {
  /** Name of a bucket. */
  bucket: string;
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
  /** Request body */
  body?: ObjectAccessControl;
}

export const InsertDefaultObjectAccessControlsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
  body: Schema.optional(ObjectAccessControl).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "b/{bucket}/defaultObjectAcl", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertDefaultObjectAccessControlsRequest>;

export type InsertDefaultObjectAccessControlsResponse = ObjectAccessControl;
export const InsertDefaultObjectAccessControlsResponse = ObjectAccessControl;

export type InsertDefaultObjectAccessControlsError = CommonErrors;

export const insertDefaultObjectAccessControls: API.OperationMethod<InsertDefaultObjectAccessControlsRequest, InsertDefaultObjectAccessControlsResponse, InsertDefaultObjectAccessControlsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertDefaultObjectAccessControlsRequest,
  output: InsertDefaultObjectAccessControlsResponse,
  errors: [],
}));

/** Retrieves default object ACL entries on the specified bucket. */
export interface ListDefaultObjectAccessControlsRequest {
  /** Name of a bucket. */
  bucket: string;
  /** If present, only return default ACL listing if the bucket's current metageneration matches this value. */
  ifMetagenerationMatch?: string;
  /** If present, only return default ACL listing if the bucket's current metageneration does not match the given value. */
  ifMetagenerationNotMatch?: string;
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
}

export const ListDefaultObjectAccessControlsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  ifMetagenerationMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationMatch")),
  ifMetagenerationNotMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationNotMatch")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
}).pipe(
  T.Http({ method: "GET", path: "b/{bucket}/defaultObjectAcl" }),
  svc,
) as unknown as Schema.Schema<ListDefaultObjectAccessControlsRequest>;

export type ListDefaultObjectAccessControlsResponse = ObjectAccessControls;
export const ListDefaultObjectAccessControlsResponse = ObjectAccessControls;

export type ListDefaultObjectAccessControlsError = CommonErrors;

export const listDefaultObjectAccessControls: API.OperationMethod<ListDefaultObjectAccessControlsRequest, ListDefaultObjectAccessControlsResponse, ListDefaultObjectAccessControlsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListDefaultObjectAccessControlsRequest,
  output: ListDefaultObjectAccessControlsResponse,
  errors: [],
}));

/** Patches a default object ACL entry on the specified bucket. */
export interface PatchDefaultObjectAccessControlsRequest {
  /** Name of a bucket. */
  bucket: string;
  /** The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers. */
  entity: string;
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
  /** Request body */
  body?: ObjectAccessControl;
}

export const PatchDefaultObjectAccessControlsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  entity: Schema.String.pipe(T.HttpPath("entity")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
  body: Schema.optional(ObjectAccessControl).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "b/{bucket}/defaultObjectAcl/{entity}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchDefaultObjectAccessControlsRequest>;

export type PatchDefaultObjectAccessControlsResponse = ObjectAccessControl;
export const PatchDefaultObjectAccessControlsResponse = ObjectAccessControl;

export type PatchDefaultObjectAccessControlsError = CommonErrors;

export const patchDefaultObjectAccessControls: API.OperationMethod<PatchDefaultObjectAccessControlsRequest, PatchDefaultObjectAccessControlsResponse, PatchDefaultObjectAccessControlsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchDefaultObjectAccessControlsRequest,
  output: PatchDefaultObjectAccessControlsResponse,
  errors: [],
}));

/** Updates a default object ACL entry on the specified bucket. */
export interface UpdateDefaultObjectAccessControlsRequest {
  /** Name of a bucket. */
  bucket: string;
  /** The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers. */
  entity: string;
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
  /** Request body */
  body?: ObjectAccessControl;
}

export const UpdateDefaultObjectAccessControlsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  entity: Schema.String.pipe(T.HttpPath("entity")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
  body: Schema.optional(ObjectAccessControl).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "b/{bucket}/defaultObjectAcl/{entity}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateDefaultObjectAccessControlsRequest>;

export type UpdateDefaultObjectAccessControlsResponse = ObjectAccessControl;
export const UpdateDefaultObjectAccessControlsResponse = ObjectAccessControl;

export type UpdateDefaultObjectAccessControlsError = CommonErrors;

export const updateDefaultObjectAccessControls: API.OperationMethod<UpdateDefaultObjectAccessControlsRequest, UpdateDefaultObjectAccessControlsResponse, UpdateDefaultObjectAccessControlsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateDefaultObjectAccessControlsRequest,
  output: UpdateDefaultObjectAccessControlsResponse,
  errors: [],
}));

/** Permanently deletes a folder. Only applicable to buckets with hierarchical namespace enabled. */
export interface DeleteFoldersRequest {
  /** Name of the bucket in which the folder resides. */
  bucket: string;
  /** Name of a folder. */
  folder: string;
  /** If set, only deletes the folder if its metageneration matches this value. */
  ifMetagenerationMatch?: string;
  /** If set, only deletes the folder if its metageneration does not match this value. */
  ifMetagenerationNotMatch?: string;
}

export const DeleteFoldersRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  folder: Schema.String.pipe(T.HttpPath("folder")),
  ifMetagenerationMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationMatch")),
  ifMetagenerationNotMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationNotMatch")),
}).pipe(
  T.Http({ method: "DELETE", path: "b/{bucket}/folders/{folder}" }),
  svc,
) as unknown as Schema.Schema<DeleteFoldersRequest>;

export interface DeleteFoldersResponse {}
export const DeleteFoldersResponse: Schema.Schema<DeleteFoldersResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteFoldersResponse>;

export type DeleteFoldersError = CommonErrors;

export const deleteFolders: API.OperationMethod<DeleteFoldersRequest, DeleteFoldersResponse, DeleteFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteFoldersRequest,
  output: DeleteFoldersResponse,
  errors: [],
}));

/** Deletes a folder recursively. Only applicable to buckets with hierarchical namespace enabled. */
export interface DeleteRecursiveFoldersRequest {
  /** Name of the bucket in which the folder resides. */
  bucket: string;
  /** Name of a folder. */
  folder: string;
  /** If set, only deletes the folder if its metageneration matches this value. */
  ifMetagenerationMatch?: string;
  /** If set, only deletes the folder if its metageneration does not match this value. */
  ifMetagenerationNotMatch?: string;
}

export const DeleteRecursiveFoldersRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  folder: Schema.String.pipe(T.HttpPath("folder")),
  ifMetagenerationMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationMatch")),
  ifMetagenerationNotMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationNotMatch")),
}).pipe(
  T.Http({ method: "POST", path: "b/{bucket}/folders/{folder}/deleteRecursive", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DeleteRecursiveFoldersRequest>;

export type DeleteRecursiveFoldersResponse = GoogleLongrunningOperation;
export const DeleteRecursiveFoldersResponse = GoogleLongrunningOperation;

export type DeleteRecursiveFoldersError = CommonErrors;

export const deleteRecursiveFolders: API.OperationMethod<DeleteRecursiveFoldersRequest, DeleteRecursiveFoldersResponse, DeleteRecursiveFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteRecursiveFoldersRequest,
  output: DeleteRecursiveFoldersResponse,
  errors: [],
}));

/** Returns metadata for the specified folder. Only applicable to buckets with hierarchical namespace enabled. */
export interface GetFoldersRequest {
  /** Name of the bucket in which the folder resides. */
  bucket: string;
  /** Name of a folder. */
  folder: string;
  /** Makes the return of the folder metadata conditional on whether the folder's current metageneration matches the given value. */
  ifMetagenerationMatch?: string;
  /** Makes the return of the folder metadata conditional on whether the folder's current metageneration does not match the given value. */
  ifMetagenerationNotMatch?: string;
}

export const GetFoldersRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  folder: Schema.String.pipe(T.HttpPath("folder")),
  ifMetagenerationMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationMatch")),
  ifMetagenerationNotMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationNotMatch")),
}).pipe(
  T.Http({ method: "GET", path: "b/{bucket}/folders/{folder}" }),
  svc,
) as unknown as Schema.Schema<GetFoldersRequest>;

export type GetFoldersResponse = Folder;
export const GetFoldersResponse = Folder;

export type GetFoldersError = CommonErrors;

export const getFolders: API.OperationMethod<GetFoldersRequest, GetFoldersResponse, GetFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFoldersRequest,
  output: GetFoldersResponse,
  errors: [],
}));

/** Creates a new folder. Only applicable to buckets with hierarchical namespace enabled. */
export interface InsertFoldersRequest {
  /** Name of the bucket in which the folder resides. */
  bucket: string;
  /** If true, any parent folder which doesn't exist will be created automatically. */
  recursive?: boolean;
  /** Request body */
  body?: Folder;
}

export const InsertFoldersRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  recursive: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("recursive")),
  body: Schema.optional(Folder).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "b/{bucket}/folders", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertFoldersRequest>;

export type InsertFoldersResponse = Folder;
export const InsertFoldersResponse = Folder;

export type InsertFoldersError = CommonErrors;

export const insertFolders: API.OperationMethod<InsertFoldersRequest, InsertFoldersResponse, InsertFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertFoldersRequest,
  output: InsertFoldersResponse,
  errors: [],
}));

/** Retrieves a list of folders matching the criteria. Only applicable to buckets with hierarchical namespace enabled. */
export interface ListFoldersRequest {
  /** Name of the bucket in which to look for folders. */
  bucket: string;
  /** Returns results in a directory-like mode. The only supported value is '/'. If set, items will only contain folders that either exactly match the prefix, or are one level below the prefix. */
  delimiter?: string;
  /** Filter results to folders whose names are lexicographically before endOffset. If startOffset is also set, the folders listed will have names between startOffset (inclusive) and endOffset (exclusive). */
  endOffset?: string;
  /** Maximum number of items to return in a single page of responses. */
  pageSize?: number;
  /** A previously-returned page token representing part of the larger set of results to view. */
  pageToken?: string;
  /** Filter results to folders whose paths begin with this prefix. If set, the value must either be an empty string or end with a '/'. */
  prefix?: string;
  /** Filter results to folders whose names are lexicographically equal to or after startOffset. If endOffset is also set, the folders listed will have names between startOffset (inclusive) and endOffset (exclusive). */
  startOffset?: string;
}

export const ListFoldersRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  delimiter: Schema.optional(Schema.String).pipe(T.HttpQuery("delimiter")),
  endOffset: Schema.optional(Schema.String).pipe(T.HttpQuery("endOffset")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  prefix: Schema.optional(Schema.String).pipe(T.HttpQuery("prefix")),
  startOffset: Schema.optional(Schema.String).pipe(T.HttpQuery("startOffset")),
}).pipe(
  T.Http({ method: "GET", path: "b/{bucket}/folders" }),
  svc,
) as unknown as Schema.Schema<ListFoldersRequest>;

export type ListFoldersResponse = Folders;
export const ListFoldersResponse = Folders;

export type ListFoldersError = CommonErrors;

export const listFolders = API.makePaginated(() => ({
  input: ListFoldersRequest,
  output: ListFoldersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

/** Renames a source folder to a destination folder. Only applicable to buckets with hierarchical namespace enabled. */
export interface RenameFoldersRequest {
  /** Name of the bucket in which the folders are in. */
  bucket: string;
  /** Name of the destination folder. */
  destinationFolder: string;
  /** Makes the operation conditional on whether the source object's current metageneration matches the given value. */
  ifSourceMetagenerationMatch?: string;
  /** Makes the operation conditional on whether the source object's current metageneration does not match the given value. */
  ifSourceMetagenerationNotMatch?: string;
  /** Name of the source folder. */
  sourceFolder: string;
}

export const RenameFoldersRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  destinationFolder: Schema.String.pipe(T.HttpPath("destinationFolder")),
  ifSourceMetagenerationMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifSourceMetagenerationMatch")),
  ifSourceMetagenerationNotMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifSourceMetagenerationNotMatch")),
  sourceFolder: Schema.String.pipe(T.HttpPath("sourceFolder")),
}).pipe(
  T.Http({ method: "POST", path: "b/{bucket}/folders/{sourceFolder}/renameTo/folders/{destinationFolder}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RenameFoldersRequest>;

export type RenameFoldersResponse = GoogleLongrunningOperation;
export const RenameFoldersResponse = GoogleLongrunningOperation;

export type RenameFoldersError = CommonErrors;

export const renameFolders: API.OperationMethod<RenameFoldersRequest, RenameFoldersResponse, RenameFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RenameFoldersRequest,
  output: RenameFoldersResponse,
  errors: [],
}));

/** Permanently deletes a managed folder. */
export interface DeleteManagedFoldersRequest {
  /** Name of the bucket containing the managed folder. */
  bucket: string;
  /** The managed folder name/path. */
  managedFolder: string;
  /** If set, only deletes the managed folder if its metageneration matches this value. */
  ifMetagenerationMatch?: string;
  /** If set, only deletes the managed folder if its metageneration does not match this value. */
  ifMetagenerationNotMatch?: string;
  /** Allows the deletion of a managed folder even if it is not empty. A managed folder is empty if there are no objects or managed folders that it applies to. Callers must have storage.managedFolders.setIamPolicy permission. */
  allowNonEmpty?: boolean;
}

export const DeleteManagedFoldersRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  managedFolder: Schema.String.pipe(T.HttpPath("managedFolder")),
  ifMetagenerationMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationMatch")),
  ifMetagenerationNotMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationNotMatch")),
  allowNonEmpty: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowNonEmpty")),
}).pipe(
  T.Http({ method: "DELETE", path: "b/{bucket}/managedFolders/{managedFolder}" }),
  svc,
) as unknown as Schema.Schema<DeleteManagedFoldersRequest>;

export interface DeleteManagedFoldersResponse {}
export const DeleteManagedFoldersResponse: Schema.Schema<DeleteManagedFoldersResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteManagedFoldersResponse>;

export type DeleteManagedFoldersError = CommonErrors;

export const deleteManagedFolders: API.OperationMethod<DeleteManagedFoldersRequest, DeleteManagedFoldersResponse, DeleteManagedFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteManagedFoldersRequest,
  output: DeleteManagedFoldersResponse,
  errors: [],
}));

/** Returns metadata of the specified managed folder. */
export interface GetManagedFoldersRequest {
  /** Name of the bucket containing the managed folder. */
  bucket: string;
  /** The managed folder name/path. */
  managedFolder: string;
  /** Makes the return of the managed folder metadata conditional on whether the managed folder's current metageneration matches the given value. */
  ifMetagenerationMatch?: string;
  /** Makes the return of the managed folder metadata conditional on whether the managed folder's current metageneration does not match the given value. */
  ifMetagenerationNotMatch?: string;
}

export const GetManagedFoldersRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  managedFolder: Schema.String.pipe(T.HttpPath("managedFolder")),
  ifMetagenerationMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationMatch")),
  ifMetagenerationNotMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationNotMatch")),
}).pipe(
  T.Http({ method: "GET", path: "b/{bucket}/managedFolders/{managedFolder}" }),
  svc,
) as unknown as Schema.Schema<GetManagedFoldersRequest>;

export type GetManagedFoldersResponse = ManagedFolder;
export const GetManagedFoldersResponse = ManagedFolder;

export type GetManagedFoldersError = CommonErrors;

export const getManagedFolders: API.OperationMethod<GetManagedFoldersRequest, GetManagedFoldersResponse, GetManagedFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetManagedFoldersRequest,
  output: GetManagedFoldersResponse,
  errors: [],
}));

/** Returns an IAM policy for the specified managed folder. */
export interface GetIamPolicyManagedFoldersRequest {
  /** Name of the bucket containing the managed folder. */
  bucket: string;
  /** The IAM policy format version to be returned. If the optionsRequestedPolicyVersion is for an older version that doesn't support part of the requested IAM policy, the request fails. */
  optionsRequestedPolicyVersion?: number;
  /** The managed folder name/path. */
  managedFolder: string;
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
}

export const GetIamPolicyManagedFoldersRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  optionsRequestedPolicyVersion: Schema.optional(Schema.Number).pipe(T.HttpQuery("optionsRequestedPolicyVersion")),
  managedFolder: Schema.String.pipe(T.HttpPath("managedFolder")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
}).pipe(
  T.Http({ method: "GET", path: "b/{bucket}/managedFolders/{managedFolder}/iam" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyManagedFoldersRequest>;

export type GetIamPolicyManagedFoldersResponse = Policy;
export const GetIamPolicyManagedFoldersResponse = Policy;

export type GetIamPolicyManagedFoldersError = CommonErrors;

export const getIamPolicyManagedFolders: API.OperationMethod<GetIamPolicyManagedFoldersRequest, GetIamPolicyManagedFoldersResponse, GetIamPolicyManagedFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyManagedFoldersRequest,
  output: GetIamPolicyManagedFoldersResponse,
  errors: [],
}));

/** Creates a new managed folder. */
export interface InsertManagedFoldersRequest {
  /** Name of the bucket containing the managed folder. */
  bucket: string;
  /** Request body */
  body?: ManagedFolder;
}

export const InsertManagedFoldersRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  body: Schema.optional(ManagedFolder).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "b/{bucket}/managedFolders", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertManagedFoldersRequest>;

export type InsertManagedFoldersResponse = ManagedFolder;
export const InsertManagedFoldersResponse = ManagedFolder;

export type InsertManagedFoldersError = CommonErrors;

export const insertManagedFolders: API.OperationMethod<InsertManagedFoldersRequest, InsertManagedFoldersResponse, InsertManagedFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertManagedFoldersRequest,
  output: InsertManagedFoldersResponse,
  errors: [],
}));

/** Lists managed folders in the given bucket. */
export interface ListManagedFoldersRequest {
  /** Name of the bucket containing the managed folder. */
  bucket: string;
  /** Maximum number of items to return in a single page of responses. */
  pageSize?: number;
  /** A previously-returned page token representing part of the larger set of results to view. */
  pageToken?: string;
  /** The managed folder name/path prefix to filter the output list of results. */
  prefix?: string;
}

export const ListManagedFoldersRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  prefix: Schema.optional(Schema.String).pipe(T.HttpQuery("prefix")),
}).pipe(
  T.Http({ method: "GET", path: "b/{bucket}/managedFolders" }),
  svc,
) as unknown as Schema.Schema<ListManagedFoldersRequest>;

export type ListManagedFoldersResponse = ManagedFolders;
export const ListManagedFoldersResponse = ManagedFolders;

export type ListManagedFoldersError = CommonErrors;

export const listManagedFolders = API.makePaginated(() => ({
  input: ListManagedFoldersRequest,
  output: ListManagedFoldersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

/** Updates an IAM policy for the specified managed folder. */
export interface SetIamPolicyManagedFoldersRequest {
  /** Name of the bucket containing the managed folder. */
  bucket: string;
  /** The managed folder name/path. */
  managedFolder: string;
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
  /** Request body */
  body?: Policy;
}

export const SetIamPolicyManagedFoldersRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  managedFolder: Schema.String.pipe(T.HttpPath("managedFolder")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
  body: Schema.optional(Policy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "b/{bucket}/managedFolders/{managedFolder}/iam", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyManagedFoldersRequest>;

export type SetIamPolicyManagedFoldersResponse = Policy;
export const SetIamPolicyManagedFoldersResponse = Policy;

export type SetIamPolicyManagedFoldersError = CommonErrors;

export const setIamPolicyManagedFolders: API.OperationMethod<SetIamPolicyManagedFoldersRequest, SetIamPolicyManagedFoldersResponse, SetIamPolicyManagedFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyManagedFoldersRequest,
  output: SetIamPolicyManagedFoldersResponse,
  errors: [],
}));

/** Tests a set of permissions on the given managed folder to see which, if any, are held by the caller. */
export interface TestIamPermissionsManagedFoldersRequest {
  /** Name of the bucket containing the managed folder. */
  bucket: string;
  /** The managed folder name/path. */
  managedFolder: string;
  /** Permissions to test. */
  permissions: string[];
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
}

export const TestIamPermissionsManagedFoldersRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  managedFolder: Schema.String.pipe(T.HttpPath("managedFolder")),
  permissions: Schema.Array(Schema.String).pipe(T.HttpQuery("permissions")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
}).pipe(
  T.Http({ method: "GET", path: "b/{bucket}/managedFolders/{managedFolder}/iam/testPermissions" }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsManagedFoldersRequest>;

export type TestIamPermissionsManagedFoldersResponse = TestIamPermissionsResponse;
export const TestIamPermissionsManagedFoldersResponse = TestIamPermissionsResponse;

export type TestIamPermissionsManagedFoldersError = CommonErrors;

export const testIamPermissionsManagedFolders: API.OperationMethod<TestIamPermissionsManagedFoldersRequest, TestIamPermissionsManagedFoldersResponse, TestIamPermissionsManagedFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsManagedFoldersRequest,
  output: TestIamPermissionsManagedFoldersResponse,
  errors: [],
}));

/** Permanently deletes a notification subscription. */
export interface DeleteNotificationsRequest {
  /** The parent bucket of the notification. */
  bucket: string;
  /** ID of the notification to delete. */
  notification: string;
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
}

export const DeleteNotificationsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  notification: Schema.String.pipe(T.HttpPath("notification")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
}).pipe(
  T.Http({ method: "DELETE", path: "b/{bucket}/notificationConfigs/{notification}" }),
  svc,
) as unknown as Schema.Schema<DeleteNotificationsRequest>;

export interface DeleteNotificationsResponse {}
export const DeleteNotificationsResponse: Schema.Schema<DeleteNotificationsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteNotificationsResponse>;

export type DeleteNotificationsError = CommonErrors;

export const deleteNotifications: API.OperationMethod<DeleteNotificationsRequest, DeleteNotificationsResponse, DeleteNotificationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteNotificationsRequest,
  output: DeleteNotificationsResponse,
  errors: [],
}));

/** View a notification configuration. */
export interface GetNotificationsRequest {
  /** The parent bucket of the notification. */
  bucket: string;
  /** Notification ID */
  notification: string;
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
}

export const GetNotificationsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  notification: Schema.String.pipe(T.HttpPath("notification")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
}).pipe(
  T.Http({ method: "GET", path: "b/{bucket}/notificationConfigs/{notification}" }),
  svc,
) as unknown as Schema.Schema<GetNotificationsRequest>;

export type GetNotificationsResponse = Notification;
export const GetNotificationsResponse = Notification;

export type GetNotificationsError = CommonErrors;

export const getNotifications: API.OperationMethod<GetNotificationsRequest, GetNotificationsResponse, GetNotificationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetNotificationsRequest,
  output: GetNotificationsResponse,
  errors: [],
}));

/** Creates a notification subscription for a given bucket. */
export interface InsertNotificationsRequest {
  /** The parent bucket of the notification. */
  bucket: string;
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
  /** Request body */
  body?: Notification;
}

export const InsertNotificationsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
  body: Schema.optional(Notification).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "b/{bucket}/notificationConfigs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertNotificationsRequest>;

export type InsertNotificationsResponse = Notification;
export const InsertNotificationsResponse = Notification;

export type InsertNotificationsError = CommonErrors;

export const insertNotifications: API.OperationMethod<InsertNotificationsRequest, InsertNotificationsResponse, InsertNotificationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertNotificationsRequest,
  output: InsertNotificationsResponse,
  errors: [],
}));

/** Retrieves a list of notification subscriptions for a given bucket. */
export interface ListNotificationsRequest {
  /** Name of a Google Cloud Storage bucket. */
  bucket: string;
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
}

export const ListNotificationsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
}).pipe(
  T.Http({ method: "GET", path: "b/{bucket}/notificationConfigs" }),
  svc,
) as unknown as Schema.Schema<ListNotificationsRequest>;

export type ListNotificationsResponse = Notifications;
export const ListNotificationsResponse = Notifications;

export type ListNotificationsError = CommonErrors;

export const listNotifications: API.OperationMethod<ListNotificationsRequest, ListNotificationsResponse, ListNotificationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListNotificationsRequest,
  output: ListNotificationsResponse,
  errors: [],
}));

/** Permanently deletes the ACL entry for the specified entity on the specified object. */
export interface DeleteObjectAccessControlsRequest {
  /** Name of a bucket. */
  bucket: string;
  /** The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers. */
  entity: string;
  /** If present, selects a specific revision of this object (as opposed to the latest version, the default). */
  generation?: string;
  /** Name of the object. For information about how to URL encode object names to be path safe, see [Encoding URI Path Parts](https://cloud.google.com/storage/docs/request-endpoints#encoding). */
  object: string;
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
}

export const DeleteObjectAccessControlsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  entity: Schema.String.pipe(T.HttpPath("entity")),
  generation: Schema.optional(Schema.String).pipe(T.HttpQuery("generation")),
  object: Schema.String.pipe(T.HttpPath("object")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
}).pipe(
  T.Http({ method: "DELETE", path: "b/{bucket}/o/{object}/acl/{entity}" }),
  svc,
) as unknown as Schema.Schema<DeleteObjectAccessControlsRequest>;

export interface DeleteObjectAccessControlsResponse {}
export const DeleteObjectAccessControlsResponse: Schema.Schema<DeleteObjectAccessControlsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteObjectAccessControlsResponse>;

export type DeleteObjectAccessControlsError = CommonErrors;

export const deleteObjectAccessControls: API.OperationMethod<DeleteObjectAccessControlsRequest, DeleteObjectAccessControlsResponse, DeleteObjectAccessControlsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteObjectAccessControlsRequest,
  output: DeleteObjectAccessControlsResponse,
  errors: [],
}));

/** Returns the ACL entry for the specified entity on the specified object. */
export interface GetObjectAccessControlsRequest {
  /** Name of a bucket. */
  bucket: string;
  /** The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers. */
  entity: string;
  /** If present, selects a specific revision of this object (as opposed to the latest version, the default). */
  generation?: string;
  /** Name of the object. For information about how to URL encode object names to be path safe, see [Encoding URI Path Parts](https://cloud.google.com/storage/docs/request-endpoints#encoding). */
  object: string;
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
}

export const GetObjectAccessControlsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  entity: Schema.String.pipe(T.HttpPath("entity")),
  generation: Schema.optional(Schema.String).pipe(T.HttpQuery("generation")),
  object: Schema.String.pipe(T.HttpPath("object")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
}).pipe(
  T.Http({ method: "GET", path: "b/{bucket}/o/{object}/acl/{entity}" }),
  svc,
) as unknown as Schema.Schema<GetObjectAccessControlsRequest>;

export type GetObjectAccessControlsResponse = ObjectAccessControl;
export const GetObjectAccessControlsResponse = ObjectAccessControl;

export type GetObjectAccessControlsError = CommonErrors;

export const getObjectAccessControls: API.OperationMethod<GetObjectAccessControlsRequest, GetObjectAccessControlsResponse, GetObjectAccessControlsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetObjectAccessControlsRequest,
  output: GetObjectAccessControlsResponse,
  errors: [],
}));

/** Creates a new ACL entry on the specified object. */
export interface InsertObjectAccessControlsRequest {
  /** Name of a bucket. */
  bucket: string;
  /** If present, selects a specific revision of this object (as opposed to the latest version, the default). */
  generation?: string;
  /** Name of the object. For information about how to URL encode object names to be path safe, see [Encoding URI Path Parts](https://cloud.google.com/storage/docs/request-endpoints#encoding). */
  object: string;
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
  /** Request body */
  body?: ObjectAccessControl;
}

export const InsertObjectAccessControlsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  generation: Schema.optional(Schema.String).pipe(T.HttpQuery("generation")),
  object: Schema.String.pipe(T.HttpPath("object")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
  body: Schema.optional(ObjectAccessControl).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "b/{bucket}/o/{object}/acl", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertObjectAccessControlsRequest>;

export type InsertObjectAccessControlsResponse = ObjectAccessControl;
export const InsertObjectAccessControlsResponse = ObjectAccessControl;

export type InsertObjectAccessControlsError = CommonErrors;

export const insertObjectAccessControls: API.OperationMethod<InsertObjectAccessControlsRequest, InsertObjectAccessControlsResponse, InsertObjectAccessControlsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertObjectAccessControlsRequest,
  output: InsertObjectAccessControlsResponse,
  errors: [],
}));

/** Retrieves ACL entries on the specified object. */
export interface ListObjectAccessControlsRequest {
  /** Name of a bucket. */
  bucket: string;
  /** If present, selects a specific revision of this object (as opposed to the latest version, the default). */
  generation?: string;
  /** Name of the object. For information about how to URL encode object names to be path safe, see [Encoding URI Path Parts](https://cloud.google.com/storage/docs/request-endpoints#encoding). */
  object: string;
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
}

export const ListObjectAccessControlsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  generation: Schema.optional(Schema.String).pipe(T.HttpQuery("generation")),
  object: Schema.String.pipe(T.HttpPath("object")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
}).pipe(
  T.Http({ method: "GET", path: "b/{bucket}/o/{object}/acl" }),
  svc,
) as unknown as Schema.Schema<ListObjectAccessControlsRequest>;

export type ListObjectAccessControlsResponse = ObjectAccessControls;
export const ListObjectAccessControlsResponse = ObjectAccessControls;

export type ListObjectAccessControlsError = CommonErrors;

export const listObjectAccessControls: API.OperationMethod<ListObjectAccessControlsRequest, ListObjectAccessControlsResponse, ListObjectAccessControlsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListObjectAccessControlsRequest,
  output: ListObjectAccessControlsResponse,
  errors: [],
}));

/** Patches an ACL entry on the specified object. */
export interface PatchObjectAccessControlsRequest {
  /** Name of a bucket. */
  bucket: string;
  /** The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers. */
  entity: string;
  /** If present, selects a specific revision of this object (as opposed to the latest version, the default). */
  generation?: string;
  /** Name of the object. For information about how to URL encode object names to be path safe, see [Encoding URI Path Parts](https://cloud.google.com/storage/docs/request-endpoints#encoding). */
  object: string;
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
  /** Request body */
  body?: ObjectAccessControl;
}

export const PatchObjectAccessControlsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  entity: Schema.String.pipe(T.HttpPath("entity")),
  generation: Schema.optional(Schema.String).pipe(T.HttpQuery("generation")),
  object: Schema.String.pipe(T.HttpPath("object")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
  body: Schema.optional(ObjectAccessControl).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "b/{bucket}/o/{object}/acl/{entity}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchObjectAccessControlsRequest>;

export type PatchObjectAccessControlsResponse = ObjectAccessControl;
export const PatchObjectAccessControlsResponse = ObjectAccessControl;

export type PatchObjectAccessControlsError = CommonErrors;

export const patchObjectAccessControls: API.OperationMethod<PatchObjectAccessControlsRequest, PatchObjectAccessControlsResponse, PatchObjectAccessControlsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchObjectAccessControlsRequest,
  output: PatchObjectAccessControlsResponse,
  errors: [],
}));

/** Updates an ACL entry on the specified object. */
export interface UpdateObjectAccessControlsRequest {
  /** Name of a bucket. */
  bucket: string;
  /** The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers. */
  entity: string;
  /** If present, selects a specific revision of this object (as opposed to the latest version, the default). */
  generation?: string;
  /** Name of the object. For information about how to URL encode object names to be path safe, see [Encoding URI Path Parts](https://cloud.google.com/storage/docs/request-endpoints#encoding). */
  object: string;
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
  /** Request body */
  body?: ObjectAccessControl;
}

export const UpdateObjectAccessControlsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  entity: Schema.String.pipe(T.HttpPath("entity")),
  generation: Schema.optional(Schema.String).pipe(T.HttpQuery("generation")),
  object: Schema.String.pipe(T.HttpPath("object")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
  body: Schema.optional(ObjectAccessControl).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "b/{bucket}/o/{object}/acl/{entity}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateObjectAccessControlsRequest>;

export type UpdateObjectAccessControlsResponse = ObjectAccessControl;
export const UpdateObjectAccessControlsResponse = ObjectAccessControl;

export type UpdateObjectAccessControlsError = CommonErrors;

export const updateObjectAccessControls: API.OperationMethod<UpdateObjectAccessControlsRequest, UpdateObjectAccessControlsResponse, UpdateObjectAccessControlsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateObjectAccessControlsRequest,
  output: UpdateObjectAccessControlsResponse,
  errors: [],
}));

/** Concatenates a list of existing objects into a new object in the same bucket. */
export interface ComposeObjectsRequest {
  /** Name of the bucket containing the source objects. The destination object is stored in this bucket. */
  destinationBucket: string;
  /** Name of the new object. For information about how to URL encode object names to be path safe, see [Encoding URI Path Parts](https://cloud.google.com/storage/docs/request-endpoints#encoding). */
  destinationObject: string;
  /** Apply a predefined set of access controls to the destination object. */
  destinationPredefinedAcl?: "authenticatedRead" | "bucketOwnerFullControl" | "bucketOwnerRead" | "private" | "projectPrivate" | "publicRead" | (string & {});
  /** Specifies which groups of Object Contexts from the source object(s) should be dropped from the destination object. */
  dropContextGroups?: string[];
  /** Makes the operation conditional on whether the object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object. */
  ifGenerationMatch?: string;
  /** Makes the operation conditional on whether the object's current metageneration matches the given value. */
  ifMetagenerationMatch?: string;
  /** Resource name of the Cloud KMS key, of the form projects/my-project/locations/global/keyRings/my-kr/cryptoKeys/my-key, that will be used to encrypt the object. Overrides the object metadata's kms_key_name value, if any. */
  kmsKeyName?: string;
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
  /** Request body */
  body?: ComposeRequest;
}

export const ComposeObjectsRequest = Schema.Struct({
  destinationBucket: Schema.String.pipe(T.HttpPath("destinationBucket")),
  destinationObject: Schema.String.pipe(T.HttpPath("destinationObject")),
  destinationPredefinedAcl: Schema.optional(Schema.String).pipe(T.HttpQuery("destinationPredefinedAcl")),
  dropContextGroups: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("dropContextGroups")),
  ifGenerationMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifGenerationMatch")),
  ifMetagenerationMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationMatch")),
  kmsKeyName: Schema.optional(Schema.String).pipe(T.HttpQuery("kmsKeyName")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
  body: Schema.optional(ComposeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "b/{destinationBucket}/o/{destinationObject}/compose", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ComposeObjectsRequest>;

export type ComposeObjectsResponse = Storage_Object;
export const ComposeObjectsResponse = Storage_Object;

export type ComposeObjectsError = CommonErrors;

export const composeObjects: API.OperationMethod<ComposeObjectsRequest, ComposeObjectsResponse, ComposeObjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ComposeObjectsRequest,
  output: ComposeObjectsResponse,
  errors: [],
}));

/** Copies a source object to a destination object. Optionally overrides metadata. */
export interface CopyObjectsRequest {
  /** Name of the bucket in which to store the new object. Overrides the provided object metadata's bucket value, if any.For information about how to URL encode object names to be path safe, see [Encoding URI Path Parts](https://cloud.google.com/storage/docs/request-endpoints#encoding). */
  destinationBucket: string;
  /** Resource name of the Cloud KMS key, of the form projects/my-project/locations/global/keyRings/my-kr/cryptoKeys/my-key, that will be used to encrypt the object. Overrides the object metadata's kms_key_name value, if any. */
  destinationKmsKeyName?: string;
  /** Name of the new object. Required when the object metadata is not otherwise provided. Overrides the object metadata's name value, if any. */
  destinationObject: string;
  /** Apply a predefined set of access controls to the destination object. */
  destinationPredefinedAcl?: "authenticatedRead" | "bucketOwnerFullControl" | "bucketOwnerRead" | "private" | "projectPrivate" | "publicRead" | (string & {});
  /** Makes the operation conditional on whether the destination object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object. */
  ifGenerationMatch?: string;
  /** Makes the operation conditional on whether the destination object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object. */
  ifGenerationNotMatch?: string;
  /** Makes the operation conditional on whether the destination object's current metageneration matches the given value. */
  ifMetagenerationMatch?: string;
  /** Makes the operation conditional on whether the destination object's current metageneration does not match the given value. */
  ifMetagenerationNotMatch?: string;
  /** Makes the operation conditional on whether the source object's current generation matches the given value. */
  ifSourceGenerationMatch?: string;
  /** Makes the operation conditional on whether the source object's current generation does not match the given value. */
  ifSourceGenerationNotMatch?: string;
  /** Makes the operation conditional on whether the source object's current metageneration matches the given value. */
  ifSourceMetagenerationMatch?: string;
  /** Makes the operation conditional on whether the source object's current metageneration does not match the given value. */
  ifSourceMetagenerationNotMatch?: string;
  /** Set of properties to return. Defaults to noAcl, unless the object resource specifies the acl property, when it defaults to full. */
  projection?: "full" | "noAcl" | (string & {});
  /** Name of the bucket in which to find the source object. */
  sourceBucket: string;
  /** If present, selects a specific revision of the source object (as opposed to the latest version, the default). */
  sourceGeneration?: string;
  /** Name of the source object. For information about how to URL encode object names to be path safe, see [Encoding URI Path Parts](https://cloud.google.com/storage/docs/request-endpoints#encoding). */
  sourceObject: string;
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
  /** Request body */
  body?: Storage_Object;
}

export const CopyObjectsRequest = Schema.Struct({
  destinationBucket: Schema.String.pipe(T.HttpPath("destinationBucket")),
  destinationKmsKeyName: Schema.optional(Schema.String).pipe(T.HttpQuery("destinationKmsKeyName")),
  destinationObject: Schema.String.pipe(T.HttpPath("destinationObject")),
  destinationPredefinedAcl: Schema.optional(Schema.String).pipe(T.HttpQuery("destinationPredefinedAcl")),
  ifGenerationMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifGenerationMatch")),
  ifGenerationNotMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifGenerationNotMatch")),
  ifMetagenerationMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationMatch")),
  ifMetagenerationNotMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationNotMatch")),
  ifSourceGenerationMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifSourceGenerationMatch")),
  ifSourceGenerationNotMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifSourceGenerationNotMatch")),
  ifSourceMetagenerationMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifSourceMetagenerationMatch")),
  ifSourceMetagenerationNotMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifSourceMetagenerationNotMatch")),
  projection: Schema.optional(Schema.String).pipe(T.HttpQuery("projection")),
  sourceBucket: Schema.String.pipe(T.HttpPath("sourceBucket")),
  sourceGeneration: Schema.optional(Schema.String).pipe(T.HttpQuery("sourceGeneration")),
  sourceObject: Schema.String.pipe(T.HttpPath("sourceObject")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
  body: Schema.optional(Storage_Object).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "b/{sourceBucket}/o/{sourceObject}/copyTo/b/{destinationBucket}/o/{destinationObject}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CopyObjectsRequest>;

export type CopyObjectsResponse = Storage_Object;
export const CopyObjectsResponse = Storage_Object;

export type CopyObjectsError = CommonErrors;

export const copyObjects: API.OperationMethod<CopyObjectsRequest, CopyObjectsResponse, CopyObjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CopyObjectsRequest,
  output: CopyObjectsResponse,
  errors: [],
}));

/** Deletes an object and its metadata. Deletions are permanent if versioning is not enabled for the bucket, or if the generation parameter is used. */
export interface DeleteObjectsRequest {
  /** Name of the bucket in which the object resides. */
  bucket: string;
  /** If present, permanently deletes a specific revision of this object (as opposed to the latest version, the default). */
  generation?: string;
  /** Makes the operation conditional on whether the object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object. */
  ifGenerationMatch?: string;
  /** Makes the operation conditional on whether the object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object. */
  ifGenerationNotMatch?: string;
  /** Makes the operation conditional on whether the object's current metageneration matches the given value. */
  ifMetagenerationMatch?: string;
  /** Makes the operation conditional on whether the object's current metageneration does not match the given value. */
  ifMetagenerationNotMatch?: string;
  /** Name of the object. For information about how to URL encode object names to be path safe, see [Encoding URI Path Parts](https://cloud.google.com/storage/docs/request-endpoints#encoding). */
  object: string;
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
}

export const DeleteObjectsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  generation: Schema.optional(Schema.String).pipe(T.HttpQuery("generation")),
  ifGenerationMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifGenerationMatch")),
  ifGenerationNotMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifGenerationNotMatch")),
  ifMetagenerationMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationMatch")),
  ifMetagenerationNotMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationNotMatch")),
  object: Schema.String.pipe(T.HttpPath("object")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
}).pipe(
  T.Http({ method: "DELETE", path: "b/{bucket}/o/{object}" }),
  svc,
) as unknown as Schema.Schema<DeleteObjectsRequest>;

export interface DeleteObjectsResponse {}
export const DeleteObjectsResponse: Schema.Schema<DeleteObjectsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteObjectsResponse>;

export type DeleteObjectsError = CommonErrors;

export const deleteObjects: API.OperationMethod<DeleteObjectsRequest, DeleteObjectsResponse, DeleteObjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteObjectsRequest,
  output: DeleteObjectsResponse,
  errors: [],
}));

/** Retrieves an object or its metadata. */
export interface GetObjectsRequest {
  /** Name of the bucket in which the object resides. */
  bucket: string;
  /** If present, selects a specific revision of this object (as opposed to the latest version, the default). */
  generation?: string;
  /** Makes the operation conditional on whether the object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object. */
  ifGenerationMatch?: string;
  /** Makes the operation conditional on whether the object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object. */
  ifGenerationNotMatch?: string;
  /** Makes the operation conditional on whether the object's current metageneration matches the given value. */
  ifMetagenerationMatch?: string;
  /** Makes the operation conditional on whether the object's current metageneration does not match the given value. */
  ifMetagenerationNotMatch?: string;
  /** Name of the object. For information about how to URL encode object names to be path safe, see [Encoding URI Path Parts](https://cloud.google.com/storage/docs/request-endpoints#encoding). */
  object: string;
  /** Set of properties to return. Defaults to noAcl. */
  projection?: "full" | "noAcl" | (string & {});
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
  /** If true, only soft-deleted object versions will be listed. The default is false. For more information, see [Soft Delete](https://cloud.google.com/storage/docs/soft-delete). */
  softDeleted?: boolean;
  /** Restore token used to differentiate soft-deleted objects with the same name and generation. Only applicable for hierarchical namespace buckets and if softDeleted is set to true. This parameter is optional, and is only required in the rare case when there are multiple soft-deleted objects with the same name and generation. */
  restoreToken?: string;
}

export const GetObjectsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  generation: Schema.optional(Schema.String).pipe(T.HttpQuery("generation")),
  ifGenerationMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifGenerationMatch")),
  ifGenerationNotMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifGenerationNotMatch")),
  ifMetagenerationMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationMatch")),
  ifMetagenerationNotMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationNotMatch")),
  object: Schema.String.pipe(T.HttpPath("object")),
  projection: Schema.optional(Schema.String).pipe(T.HttpQuery("projection")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
  softDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("softDeleted")),
  restoreToken: Schema.optional(Schema.String).pipe(T.HttpQuery("restoreToken")),
}).pipe(
  T.Http({ method: "GET", path: "b/{bucket}/o/{object}" }),
  svc,
) as unknown as Schema.Schema<GetObjectsRequest>;

export type GetObjectsResponse = Storage_Object;
export const GetObjectsResponse = Storage_Object;

export type GetObjectsError = CommonErrors;

export const getObjects: API.OperationMethod<GetObjectsRequest, GetObjectsResponse, GetObjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetObjectsRequest,
  output: GetObjectsResponse,
  errors: [],
}));

/** Returns an IAM policy for the specified object. */
export interface GetIamPolicyObjectsRequest {
  /** Name of the bucket in which the object resides. */
  bucket: string;
  /** If present, selects a specific revision of this object (as opposed to the latest version, the default). */
  generation?: string;
  /** Name of the object. For information about how to URL encode object names to be path safe, see [Encoding URI Path Parts](https://cloud.google.com/storage/docs/request-endpoints#encoding). */
  object: string;
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
}

export const GetIamPolicyObjectsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  generation: Schema.optional(Schema.String).pipe(T.HttpQuery("generation")),
  object: Schema.String.pipe(T.HttpPath("object")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
}).pipe(
  T.Http({ method: "GET", path: "b/{bucket}/o/{object}/iam" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyObjectsRequest>;

export type GetIamPolicyObjectsResponse = Policy;
export const GetIamPolicyObjectsResponse = Policy;

export type GetIamPolicyObjectsError = CommonErrors;

export const getIamPolicyObjects: API.OperationMethod<GetIamPolicyObjectsRequest, GetIamPolicyObjectsResponse, GetIamPolicyObjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyObjectsRequest,
  output: GetIamPolicyObjectsResponse,
  errors: [],
}));

/** Stores a new object and metadata. */
export interface InsertObjectsRequest {
  /** Name of the bucket in which to store the new object. Overrides the provided object metadata's bucket value, if any. */
  bucket: string;
  /** If set, sets the contentEncoding property of the final object to this value. Setting this parameter is equivalent to setting the contentEncoding metadata property. This can be useful when uploading an object with uploadType=media to indicate the encoding of the content being uploaded. */
  contentEncoding?: string;
  /** Makes the operation conditional on whether the object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object. */
  ifGenerationMatch?: string;
  /** Makes the operation conditional on whether the object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object. */
  ifGenerationNotMatch?: string;
  /** Makes the operation conditional on whether the object's current metageneration matches the given value. */
  ifMetagenerationMatch?: string;
  /** Makes the operation conditional on whether the object's current metageneration does not match the given value. */
  ifMetagenerationNotMatch?: string;
  /** Resource name of the Cloud KMS key, of the form projects/my-project/locations/global/keyRings/my-kr/cryptoKeys/my-key, that will be used to encrypt the object. Overrides the object metadata's kms_key_name value, if any. */
  kmsKeyName?: string;
  /** Name of the object. Required when the object metadata is not otherwise provided. Overrides the object metadata's name value, if any. For information about how to URL encode object names to be path safe, see [Encoding URI Path Parts](https://cloud.google.com/storage/docs/request-endpoints#encoding). */
  name?: string;
  /** Apply a predefined set of access controls to this object. */
  predefinedAcl?: "authenticatedRead" | "bucketOwnerFullControl" | "bucketOwnerRead" | "private" | "projectPrivate" | "publicRead" | (string & {});
  /** Set of properties to return. Defaults to noAcl, unless the object resource specifies the acl property, when it defaults to full. */
  projection?: "full" | "noAcl" | (string & {});
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
  /** Request body */
  body?: Storage_Object;
}

export const InsertObjectsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  contentEncoding: Schema.optional(Schema.String).pipe(T.HttpQuery("contentEncoding")),
  ifGenerationMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifGenerationMatch")),
  ifGenerationNotMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifGenerationNotMatch")),
  ifMetagenerationMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationMatch")),
  ifMetagenerationNotMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationNotMatch")),
  kmsKeyName: Schema.optional(Schema.String).pipe(T.HttpQuery("kmsKeyName")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  predefinedAcl: Schema.optional(Schema.String).pipe(T.HttpQuery("predefinedAcl")),
  projection: Schema.optional(Schema.String).pipe(T.HttpQuery("projection")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
  body: Schema.optional(Storage_Object).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "b/{bucket}/o", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertObjectsRequest>;

export type InsertObjectsResponse = Storage_Object;
export const InsertObjectsResponse = Storage_Object;

export type InsertObjectsError = CommonErrors;

export const insertObjects: API.OperationMethod<InsertObjectsRequest, InsertObjectsResponse, InsertObjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertObjectsRequest,
  output: InsertObjectsResponse,
  errors: [],
}));

/** Retrieves a list of objects matching the criteria. */
export interface ListObjectsRequest {
  /** Name of the bucket in which to look for objects. */
  bucket: string;
  /** Returns results in a directory-like mode. items will contain only objects whose names, aside from the prefix, do not contain delimiter. Objects whose names, aside from the prefix, contain delimiter will have their name, truncated after the delimiter, returned in prefixes. Duplicate prefixes are omitted. */
  delimiter?: string;
  /** Filter results to objects whose names are lexicographically before endOffset. If startOffset is also set, the objects listed will have names between startOffset (inclusive) and endOffset (exclusive). */
  endOffset?: string;
  /** If true, objects that end in exactly one instance of delimiter will have their metadata included in items in addition to prefixes. */
  includeTrailingDelimiter?: boolean;
  /** Maximum number of items plus prefixes to return in a single page of responses. As duplicate prefixes are omitted, fewer total results may be returned than requested. The service will use this parameter or 1,000 items, whichever is smaller. */
  maxResults?: number;
  /** A previously-returned page token representing part of the larger set of results to view. */
  pageToken?: string;
  /** Filter results to objects whose names begin with this prefix. */
  prefix?: string;
  /** Set of properties to return. Defaults to noAcl. */
  projection?: "full" | "noAcl" | (string & {});
  /** Filter results to objects whose names are lexicographically equal to or after startOffset. If endOffset is also set, the objects listed will have names between startOffset (inclusive) and endOffset (exclusive). */
  startOffset?: string;
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
  /** If true, lists all versions of an object as distinct results. The default is false. For more information, see [Object Versioning](https://cloud.google.com/storage/docs/object-versioning). */
  versions?: boolean;
  /** Filter results to objects and prefixes that match this glob pattern. */
  matchGlob?: string;
  /** Filter the returned objects. Currently only supported for the contexts field. If delimiter is set, the returned prefixes are exempt from this filter. */
  filter?: string;
  /** If true, only soft-deleted object versions will be listed. The default is false. For more information, see [Soft Delete](https://cloud.google.com/storage/docs/soft-delete). */
  softDeleted?: boolean;
  /** Only applicable if delimiter is set to '/'. If true, will also include folders and managed folders (besides objects) in the returned prefixes. */
  includeFoldersAsPrefixes?: boolean;
}

export const ListObjectsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  delimiter: Schema.optional(Schema.String).pipe(T.HttpQuery("delimiter")),
  endOffset: Schema.optional(Schema.String).pipe(T.HttpQuery("endOffset")),
  includeTrailingDelimiter: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeTrailingDelimiter")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  prefix: Schema.optional(Schema.String).pipe(T.HttpQuery("prefix")),
  projection: Schema.optional(Schema.String).pipe(T.HttpQuery("projection")),
  startOffset: Schema.optional(Schema.String).pipe(T.HttpQuery("startOffset")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
  versions: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("versions")),
  matchGlob: Schema.optional(Schema.String).pipe(T.HttpQuery("matchGlob")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  softDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("softDeleted")),
  includeFoldersAsPrefixes: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeFoldersAsPrefixes")),
}).pipe(
  T.Http({ method: "GET", path: "b/{bucket}/o" }),
  svc,
) as unknown as Schema.Schema<ListObjectsRequest>;

export type ListObjectsResponse = Objects;
export const ListObjectsResponse = Objects;

export type ListObjectsError = CommonErrors;

export const listObjects = API.makePaginated(() => ({
  input: ListObjectsRequest,
  output: ListObjectsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

/** Patches an object's metadata. */
export interface PatchObjectsRequest {
  /** Name of the bucket in which the object resides. */
  bucket: string;
  /** If present, selects a specific revision of this object (as opposed to the latest version, the default). */
  generation?: string;
  /** Makes the operation conditional on whether the object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object. */
  ifGenerationMatch?: string;
  /** Makes the operation conditional on whether the object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object. */
  ifGenerationNotMatch?: string;
  /** Makes the operation conditional on whether the object's current metageneration matches the given value. */
  ifMetagenerationMatch?: string;
  /** Makes the operation conditional on whether the object's current metageneration does not match the given value. */
  ifMetagenerationNotMatch?: string;
  /** Must be true to remove the retention configuration, reduce its unlocked retention period, or change its mode from unlocked to locked. */
  overrideUnlockedRetention?: boolean;
  /** Name of the object. For information about how to URL encode object names to be path safe, see [Encoding URI Path Parts](https://cloud.google.com/storage/docs/request-endpoints#encoding). */
  object: string;
  /** Apply a predefined set of access controls to this object. */
  predefinedAcl?: "authenticatedRead" | "bucketOwnerFullControl" | "bucketOwnerRead" | "private" | "projectPrivate" | "publicRead" | (string & {});
  /** Set of properties to return. Defaults to full. */
  projection?: "full" | "noAcl" | (string & {});
  /** The project to be billed for this request, for Requester Pays buckets. */
  userProject?: string;
  /** Request body */
  body?: Storage_Object;
}

export const PatchObjectsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  generation: Schema.optional(Schema.String).pipe(T.HttpQuery("generation")),
  ifGenerationMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifGenerationMatch")),
  ifGenerationNotMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifGenerationNotMatch")),
  ifMetagenerationMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationMatch")),
  ifMetagenerationNotMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationNotMatch")),
  overrideUnlockedRetention: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("overrideUnlockedRetention")),
  object: Schema.String.pipe(T.HttpPath("object")),
  predefinedAcl: Schema.optional(Schema.String).pipe(T.HttpQuery("predefinedAcl")),
  projection: Schema.optional(Schema.String).pipe(T.HttpQuery("projection")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
  body: Schema.optional(Storage_Object).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "b/{bucket}/o/{object}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchObjectsRequest>;

export type PatchObjectsResponse = Storage_Object;
export const PatchObjectsResponse = Storage_Object;

export type PatchObjectsError = CommonErrors;

export const patchObjects: API.OperationMethod<PatchObjectsRequest, PatchObjectsResponse, PatchObjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchObjectsRequest,
  output: PatchObjectsResponse,
  errors: [],
}));

/** Rewrites a source object to a destination object. Optionally overrides metadata. */
export interface RewriteObjectsRequest {
  /** Name of the bucket in which to store the new object. Overrides the provided object metadata's bucket value, if any. */
  destinationBucket: string;
  /** Resource name of the Cloud KMS key, of the form projects/my-project/locations/global/keyRings/my-kr/cryptoKeys/my-key, that will be used to encrypt the object. Overrides the object metadata's kms_key_name value, if any. */
  destinationKmsKeyName?: string;
  /** Name of the new object. Required when the object metadata is not otherwise provided. Overrides the object metadata's name value, if any. For information about how to URL encode object names to be path safe, see [Encoding URI Path Parts](https://cloud.google.com/storage/docs/request-endpoints#encoding). */
  destinationObject: string;
  /** Apply a predefined set of access controls to the destination object. */
  destinationPredefinedAcl?: "authenticatedRead" | "bucketOwnerFullControl" | "bucketOwnerRead" | "private" | "projectPrivate" | "publicRead" | (string & {});
  /** Specifies which groups of Object Contexts from the source object should be dropped from the destination object. */
  dropContextGroups?: string[];
  /** Makes the operation conditional on whether the object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object. */
  ifGenerationMatch?: string;
  /** Makes the operation conditional on whether the object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object. */
  ifGenerationNotMatch?: string;
  /** Makes the operation conditional on whether the destination object's current metageneration matches the given value. */
  ifMetagenerationMatch?: string;
  /** Makes the operation conditional on whether the destination object's current metageneration does not match the given value. */
  ifMetagenerationNotMatch?: string;
  /** Makes the operation conditional on whether the source object's current generation matches the given value. */
  ifSourceGenerationMatch?: string;
  /** Makes the operation conditional on whether the source object's current generation does not match the given value. */
  ifSourceGenerationNotMatch?: string;
  /** Makes the operation conditional on whether the source object's current metageneration matches the given value. */
  ifSourceMetagenerationMatch?: string;
  /** Makes the operation conditional on whether the source object's current metageneration does not match the given value. */
  ifSourceMetagenerationNotMatch?: string;
  /** The maximum number of bytes that will be rewritten per rewrite request. Most callers shouldn't need to specify this parameter - it is primarily in place to support testing. If specified the value must be an integral multiple of 1 MiB (1048576). Also, this only applies to requests where the source and destination span locations and/or storage classes. Finally, this value must not change across rewrite calls else you'll get an error that the rewriteToken is invalid. */
  maxBytesRewrittenPerCall?: string;
  /** Set of properties to return. Defaults to noAcl, unless the object resource specifies the acl property, when it defaults to full. */
  projection?: "full" | "noAcl" | (string & {});
  /** Include this field (from the previous rewrite response) on each rewrite request after the first one, until the rewrite response 'done' flag is true. Calls that provide a rewriteToken can omit all other request fields, but if included those fields must match the values provided in the first rewrite request. */
  rewriteToken?: string;
  /** Name of the bucket in which to find the source object. */
  sourceBucket: string;
  /** If present, selects a specific revision of the source object (as opposed to the latest version, the default). */
  sourceGeneration?: string;
  /** Name of the source object. For information about how to URL encode object names to be path safe, see [Encoding URI Path Parts](https://cloud.google.com/storage/docs/request-endpoints#encoding). */
  sourceObject: string;
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
  /** Request body */
  body?: Storage_Object;
}

export const RewriteObjectsRequest = Schema.Struct({
  destinationBucket: Schema.String.pipe(T.HttpPath("destinationBucket")),
  destinationKmsKeyName: Schema.optional(Schema.String).pipe(T.HttpQuery("destinationKmsKeyName")),
  destinationObject: Schema.String.pipe(T.HttpPath("destinationObject")),
  destinationPredefinedAcl: Schema.optional(Schema.String).pipe(T.HttpQuery("destinationPredefinedAcl")),
  dropContextGroups: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("dropContextGroups")),
  ifGenerationMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifGenerationMatch")),
  ifGenerationNotMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifGenerationNotMatch")),
  ifMetagenerationMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationMatch")),
  ifMetagenerationNotMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationNotMatch")),
  ifSourceGenerationMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifSourceGenerationMatch")),
  ifSourceGenerationNotMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifSourceGenerationNotMatch")),
  ifSourceMetagenerationMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifSourceMetagenerationMatch")),
  ifSourceMetagenerationNotMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifSourceMetagenerationNotMatch")),
  maxBytesRewrittenPerCall: Schema.optional(Schema.String).pipe(T.HttpQuery("maxBytesRewrittenPerCall")),
  projection: Schema.optional(Schema.String).pipe(T.HttpQuery("projection")),
  rewriteToken: Schema.optional(Schema.String).pipe(T.HttpQuery("rewriteToken")),
  sourceBucket: Schema.String.pipe(T.HttpPath("sourceBucket")),
  sourceGeneration: Schema.optional(Schema.String).pipe(T.HttpQuery("sourceGeneration")),
  sourceObject: Schema.String.pipe(T.HttpPath("sourceObject")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
  body: Schema.optional(Storage_Object).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "b/{sourceBucket}/o/{sourceObject}/rewriteTo/b/{destinationBucket}/o/{destinationObject}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RewriteObjectsRequest>;

export type RewriteObjectsResponse = RewriteResponse;
export const RewriteObjectsResponse = RewriteResponse;

export type RewriteObjectsError = CommonErrors;

export const rewriteObjects: API.OperationMethod<RewriteObjectsRequest, RewriteObjectsResponse, RewriteObjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RewriteObjectsRequest,
  output: RewriteObjectsResponse,
  errors: [],
}));

/** Moves the source object to the destination object in the same bucket. */
export interface MoveObjectsRequest {
  /** Name of the bucket in which the object resides. */
  bucket: string;
  /** Name of the source object. For information about how to URL encode object names to be path safe, see [Encoding URI Path Parts](https://cloud.google.com/storage/docs/request-endpoints#encoding). */
  sourceObject: string;
  /** Name of the destination object. For information about how to URL encode object names to be path safe, see [Encoding URI Path Parts](https://cloud.google.com/storage/docs/request-endpoints#encoding). */
  destinationObject: string;
  /** Makes the operation conditional on whether the source object's current generation matches the given value. `ifSourceGenerationMatch` and `ifSourceGenerationNotMatch` conditions are mutually exclusive: it's an error for both of them to be set in the request. */
  ifSourceGenerationMatch?: string;
  /** Makes the operation conditional on whether the source object's current generation does not match the given value. `ifSourceGenerationMatch` and `ifSourceGenerationNotMatch` conditions are mutually exclusive: it's an error for both of them to be set in the request. */
  ifSourceGenerationNotMatch?: string;
  /** Makes the operation conditional on whether the source object's current metageneration matches the given value. `ifSourceMetagenerationMatch` and `ifSourceMetagenerationNotMatch` conditions are mutually exclusive: it's an error for both of them to be set in the request. */
  ifSourceMetagenerationMatch?: string;
  /** Makes the operation conditional on whether the source object's current metageneration does not match the given value. `ifSourceMetagenerationMatch` and `ifSourceMetagenerationNotMatch` conditions are mutually exclusive: it's an error for both of them to be set in the request. */
  ifSourceMetagenerationNotMatch?: string;
  /** Makes the operation conditional on whether the destination object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object. `ifGenerationMatch` and `ifGenerationNotMatch` conditions are mutually exclusive: it's an error for both of them to be set in the request. */
  ifGenerationMatch?: string;
  /** Makes the operation conditional on whether the destination object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object.`ifGenerationMatch` and `ifGenerationNotMatch` conditions are mutually exclusive: it's an error for both of them to be set in the request. */
  ifGenerationNotMatch?: string;
  /** Makes the operation conditional on whether the destination object's current metageneration matches the given value. `ifMetagenerationMatch` and `ifMetagenerationNotMatch` conditions are mutually exclusive: it's an error for both of them to be set in the request. */
  ifMetagenerationMatch?: string;
  /** Makes the operation conditional on whether the destination object's current metageneration does not match the given value. `ifMetagenerationMatch` and `ifMetagenerationNotMatch` conditions are mutually exclusive: it's an error for both of them to be set in the request. */
  ifMetagenerationNotMatch?: string;
  /** Set of properties to return. Defaults to noAcl. */
  projection?: "full" | "noAcl" | (string & {});
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
}

export const MoveObjectsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  sourceObject: Schema.String.pipe(T.HttpPath("sourceObject")),
  destinationObject: Schema.String.pipe(T.HttpPath("destinationObject")),
  ifSourceGenerationMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifSourceGenerationMatch")),
  ifSourceGenerationNotMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifSourceGenerationNotMatch")),
  ifSourceMetagenerationMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifSourceMetagenerationMatch")),
  ifSourceMetagenerationNotMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifSourceMetagenerationNotMatch")),
  ifGenerationMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifGenerationMatch")),
  ifGenerationNotMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifGenerationNotMatch")),
  ifMetagenerationMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationMatch")),
  ifMetagenerationNotMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationNotMatch")),
  projection: Schema.optional(Schema.String).pipe(T.HttpQuery("projection")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
}).pipe(
  T.Http({ method: "POST", path: "b/{bucket}/o/{sourceObject}/moveTo/o/{destinationObject}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MoveObjectsRequest>;

export type MoveObjectsResponse = Storage_Object;
export const MoveObjectsResponse = Storage_Object;

export type MoveObjectsError = CommonErrors;

export const moveObjects: API.OperationMethod<MoveObjectsRequest, MoveObjectsResponse, MoveObjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MoveObjectsRequest,
  output: MoveObjectsResponse,
  errors: [],
}));

/** Updates an IAM policy for the specified object. */
export interface SetIamPolicyObjectsRequest {
  /** Name of the bucket in which the object resides. */
  bucket: string;
  /** If present, selects a specific revision of this object (as opposed to the latest version, the default). */
  generation?: string;
  /** Name of the object. For information about how to URL encode object names to be path safe, see [Encoding URI Path Parts](https://cloud.google.com/storage/docs/request-endpoints#encoding). */
  object: string;
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
  /** Request body */
  body?: Policy;
}

export const SetIamPolicyObjectsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  generation: Schema.optional(Schema.String).pipe(T.HttpQuery("generation")),
  object: Schema.String.pipe(T.HttpPath("object")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
  body: Schema.optional(Policy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "b/{bucket}/o/{object}/iam", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyObjectsRequest>;

export type SetIamPolicyObjectsResponse = Policy;
export const SetIamPolicyObjectsResponse = Policy;

export type SetIamPolicyObjectsError = CommonErrors;

export const setIamPolicyObjects: API.OperationMethod<SetIamPolicyObjectsRequest, SetIamPolicyObjectsResponse, SetIamPolicyObjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyObjectsRequest,
  output: SetIamPolicyObjectsResponse,
  errors: [],
}));

/** Tests a set of permissions on the given object to see which, if any, are held by the caller. */
export interface TestIamPermissionsObjectsRequest {
  /** Name of the bucket in which the object resides. */
  bucket: string;
  /** If present, selects a specific revision of this object (as opposed to the latest version, the default). */
  generation?: string;
  /** Name of the object. For information about how to URL encode object names to be path safe, see [Encoding URI Path Parts](https://cloud.google.com/storage/docs/request-endpoints#encoding). */
  object: string;
  /** Permissions to test. */
  permissions: string[];
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
}

export const TestIamPermissionsObjectsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  generation: Schema.optional(Schema.String).pipe(T.HttpQuery("generation")),
  object: Schema.String.pipe(T.HttpPath("object")),
  permissions: Schema.Array(Schema.String).pipe(T.HttpQuery("permissions")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
}).pipe(
  T.Http({ method: "GET", path: "b/{bucket}/o/{object}/iam/testPermissions" }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsObjectsRequest>;

export type TestIamPermissionsObjectsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsObjectsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsObjectsError = CommonErrors;

export const testIamPermissionsObjects: API.OperationMethod<TestIamPermissionsObjectsRequest, TestIamPermissionsObjectsResponse, TestIamPermissionsObjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsObjectsRequest,
  output: TestIamPermissionsObjectsResponse,
  errors: [],
}));

/** Updates an object's metadata. */
export interface UpdateObjectsRequest {
  /** Name of the bucket in which the object resides. */
  bucket: string;
  /** If present, selects a specific revision of this object (as opposed to the latest version, the default). */
  generation?: string;
  /** Makes the operation conditional on whether the object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object. */
  ifGenerationMatch?: string;
  /** Makes the operation conditional on whether the object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object. */
  ifGenerationNotMatch?: string;
  /** Makes the operation conditional on whether the object's current metageneration matches the given value. */
  ifMetagenerationMatch?: string;
  /** Makes the operation conditional on whether the object's current metageneration does not match the given value. */
  ifMetagenerationNotMatch?: string;
  /** Must be true to remove the retention configuration, reduce its unlocked retention period, or change its mode from unlocked to locked. */
  overrideUnlockedRetention?: boolean;
  /** Name of the object. For information about how to URL encode object names to be path safe, see [Encoding URI Path Parts](https://cloud.google.com/storage/docs/request-endpoints#encoding). */
  object: string;
  /** Apply a predefined set of access controls to this object. */
  predefinedAcl?: "authenticatedRead" | "bucketOwnerFullControl" | "bucketOwnerRead" | "private" | "projectPrivate" | "publicRead" | (string & {});
  /** Set of properties to return. Defaults to full. */
  projection?: "full" | "noAcl" | (string & {});
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
  /** Request body */
  body?: Storage_Object;
}

export const UpdateObjectsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  generation: Schema.optional(Schema.String).pipe(T.HttpQuery("generation")),
  ifGenerationMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifGenerationMatch")),
  ifGenerationNotMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifGenerationNotMatch")),
  ifMetagenerationMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationMatch")),
  ifMetagenerationNotMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationNotMatch")),
  overrideUnlockedRetention: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("overrideUnlockedRetention")),
  object: Schema.String.pipe(T.HttpPath("object")),
  predefinedAcl: Schema.optional(Schema.String).pipe(T.HttpQuery("predefinedAcl")),
  projection: Schema.optional(Schema.String).pipe(T.HttpQuery("projection")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
  body: Schema.optional(Storage_Object).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "b/{bucket}/o/{object}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateObjectsRequest>;

export type UpdateObjectsResponse = Storage_Object;
export const UpdateObjectsResponse = Storage_Object;

export type UpdateObjectsError = CommonErrors;

export const updateObjects: API.OperationMethod<UpdateObjectsRequest, UpdateObjectsResponse, UpdateObjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateObjectsRequest,
  output: UpdateObjectsResponse,
  errors: [],
}));

/** Watch for changes on all objects in a bucket. */
export interface WatchAllObjectsRequest {
  /** Name of the bucket in which to look for objects. */
  bucket: string;
  /** Returns results in a directory-like mode. items will contain only objects whose names, aside from the prefix, do not contain delimiter. Objects whose names, aside from the prefix, contain delimiter will have their name, truncated after the delimiter, returned in prefixes. Duplicate prefixes are omitted. */
  delimiter?: string;
  /** Filter results to objects whose names are lexicographically before endOffset. If startOffset is also set, the objects listed will have names between startOffset (inclusive) and endOffset (exclusive). */
  endOffset?: string;
  /** If true, objects that end in exactly one instance of delimiter will have their metadata included in items in addition to prefixes. */
  includeTrailingDelimiter?: boolean;
  /** Maximum number of items plus prefixes to return in a single page of responses. As duplicate prefixes are omitted, fewer total results may be returned than requested. The service will use this parameter or 1,000 items, whichever is smaller. */
  maxResults?: number;
  /** A previously-returned page token representing part of the larger set of results to view. */
  pageToken?: string;
  /** Filter results to objects whose names begin with this prefix. */
  prefix?: string;
  /** Set of properties to return. Defaults to noAcl. */
  projection?: "full" | "noAcl" | (string & {});
  /** Filter results to objects whose names are lexicographically equal to or after startOffset. If endOffset is also set, the objects listed will have names between startOffset (inclusive) and endOffset (exclusive). */
  startOffset?: string;
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
  /** If true, lists all versions of an object as distinct results. The default is false. For more information, see [Object Versioning](https://cloud.google.com/storage/docs/object-versioning). */
  versions?: boolean;
  /** Request body */
  body?: Channel;
}

export const WatchAllObjectsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  delimiter: Schema.optional(Schema.String).pipe(T.HttpQuery("delimiter")),
  endOffset: Schema.optional(Schema.String).pipe(T.HttpQuery("endOffset")),
  includeTrailingDelimiter: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeTrailingDelimiter")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  prefix: Schema.optional(Schema.String).pipe(T.HttpQuery("prefix")),
  projection: Schema.optional(Schema.String).pipe(T.HttpQuery("projection")),
  startOffset: Schema.optional(Schema.String).pipe(T.HttpQuery("startOffset")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
  versions: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("versions")),
  body: Schema.optional(Channel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "b/{bucket}/o/watch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<WatchAllObjectsRequest>;

export type WatchAllObjectsResponse = Channel;
export const WatchAllObjectsResponse = Channel;

export type WatchAllObjectsError = CommonErrors;

export const watchAllObjects: API.OperationMethod<WatchAllObjectsRequest, WatchAllObjectsResponse, WatchAllObjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: WatchAllObjectsRequest,
  output: WatchAllObjectsResponse,
  errors: [],
}));

/** Restores a soft-deleted object. */
export interface RestoreObjectsRequest {
  /** Name of the bucket in which the object resides. */
  bucket: string;
  /** Selects a specific revision of this object. */
  generation: string;
  /** Name of the object. For information about how to URL encode object names to be path safe, see [Encoding URI Path Parts](https://cloud.google.com/storage/docs/request-endpoints#encoding). */
  object: string;
  /** Makes the operation conditional on whether the object's one live generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object. */
  ifGenerationMatch?: string;
  /** Makes the operation conditional on whether none of the object's live generations match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object. */
  ifGenerationNotMatch?: string;
  /** Makes the operation conditional on whether the object's one live metageneration matches the given value. */
  ifMetagenerationMatch?: string;
  /** Makes the operation conditional on whether none of the object's live metagenerations match the given value. */
  ifMetagenerationNotMatch?: string;
  /** If true, copies the source object's ACL; otherwise, uses the bucket's default object ACL. The default is false. */
  copySourceAcl?: boolean;
  /** Set of properties to return. Defaults to full. */
  projection?: "full" | "noAcl" | (string & {});
  /** The project to be billed for this request. Required for Requester Pays buckets. */
  userProject?: string;
  /** Restore token used to differentiate sof-deleted objects with the same name and generation. Only applicable for hierarchical namespace buckets. This parameter is optional, and is only required in the rare case when there are multiple soft-deleted objects with the same name and generation. */
  restoreToken?: string;
}

export const RestoreObjectsRequest = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  generation: Schema.String.pipe(T.HttpQuery("generation")),
  object: Schema.String.pipe(T.HttpPath("object")),
  ifGenerationMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifGenerationMatch")),
  ifGenerationNotMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifGenerationNotMatch")),
  ifMetagenerationMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationMatch")),
  ifMetagenerationNotMatch: Schema.optional(Schema.String).pipe(T.HttpQuery("ifMetagenerationNotMatch")),
  copySourceAcl: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("copySourceAcl")),
  projection: Schema.optional(Schema.String).pipe(T.HttpQuery("projection")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
  restoreToken: Schema.optional(Schema.String).pipe(T.HttpQuery("restoreToken")),
}).pipe(
  T.Http({ method: "POST", path: "b/{bucket}/o/{object}/restore", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RestoreObjectsRequest>;

export type RestoreObjectsResponse = Storage_Object;
export const RestoreObjectsResponse = Storage_Object;

export type RestoreObjectsError = CommonErrors;

export const restoreObjects: API.OperationMethod<RestoreObjectsRequest, RestoreObjectsResponse, RestoreObjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RestoreObjectsRequest,
  output: RestoreObjectsResponse,
  errors: [],
}));

/** Initiates a long-running bulk restore operation on the specified bucket. */
export interface BulkRestoreObjectsRequest_Op {
  /** Name of the bucket in which the object resides. */
  bucket: string;
  /** Request body */
  body?: BulkRestoreObjectsRequest;
}

export const BulkRestoreObjectsRequest_Op = Schema.Struct({
  bucket: Schema.String.pipe(T.HttpPath("bucket")),
  body: Schema.optional(BulkRestoreObjectsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "b/{bucket}/o/bulkRestore", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BulkRestoreObjectsRequest_Op>;

export type BulkRestoreObjectsResponse = GoogleLongrunningOperation;
export const BulkRestoreObjectsResponse = GoogleLongrunningOperation;

export type BulkRestoreObjectsError = CommonErrors;

export const bulkRestoreObjects: API.OperationMethod<BulkRestoreObjectsRequest_Op, BulkRestoreObjectsResponse, BulkRestoreObjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BulkRestoreObjectsRequest_Op,
  output: BulkRestoreObjectsResponse,
  errors: [],
}));

/** Creates a new HMAC key for the specified service account. */
export interface CreateProjectsHmacKeysRequest {
  /** Project ID owning the service account. */
  projectId: string;
  /** Email address of the service account. */
  serviceAccountEmail: string;
  /** The project to be billed for this request. */
  userProject?: string;
}

export const CreateProjectsHmacKeysRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  serviceAccountEmail: Schema.String.pipe(T.HttpQuery("serviceAccountEmail")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
}).pipe(
  T.Http({ method: "POST", path: "projects/{projectId}/hmacKeys", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsHmacKeysRequest>;

export type CreateProjectsHmacKeysResponse = HmacKey;
export const CreateProjectsHmacKeysResponse = HmacKey;

export type CreateProjectsHmacKeysError = CommonErrors;

export const createProjectsHmacKeys: API.OperationMethod<CreateProjectsHmacKeysRequest, CreateProjectsHmacKeysResponse, CreateProjectsHmacKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsHmacKeysRequest,
  output: CreateProjectsHmacKeysResponse,
  errors: [],
}));

/** Deletes an HMAC key. */
export interface DeleteProjectsHmacKeysRequest {
  /** Name of the HMAC key to be deleted. */
  accessId: string;
  /** Project ID owning the requested key */
  projectId: string;
  /** The project to be billed for this request. */
  userProject?: string;
}

export const DeleteProjectsHmacKeysRequest = Schema.Struct({
  accessId: Schema.String.pipe(T.HttpPath("accessId")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
}).pipe(
  T.Http({ method: "DELETE", path: "projects/{projectId}/hmacKeys/{accessId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsHmacKeysRequest>;

export interface DeleteProjectsHmacKeysResponse {}
export const DeleteProjectsHmacKeysResponse: Schema.Schema<DeleteProjectsHmacKeysResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteProjectsHmacKeysResponse>;

export type DeleteProjectsHmacKeysError = CommonErrors;

export const deleteProjectsHmacKeys: API.OperationMethod<DeleteProjectsHmacKeysRequest, DeleteProjectsHmacKeysResponse, DeleteProjectsHmacKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsHmacKeysRequest,
  output: DeleteProjectsHmacKeysResponse,
  errors: [],
}));

/** Retrieves an HMAC key's metadata */
export interface GetProjectsHmacKeysRequest {
  /** Name of the HMAC key. */
  accessId: string;
  /** Project ID owning the service account of the requested key. */
  projectId: string;
  /** The project to be billed for this request. */
  userProject?: string;
}

export const GetProjectsHmacKeysRequest = Schema.Struct({
  accessId: Schema.String.pipe(T.HttpPath("accessId")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
}).pipe(
  T.Http({ method: "GET", path: "projects/{projectId}/hmacKeys/{accessId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsHmacKeysRequest>;

export type GetProjectsHmacKeysResponse = HmacKeyMetadata;
export const GetProjectsHmacKeysResponse = HmacKeyMetadata;

export type GetProjectsHmacKeysError = CommonErrors;

export const getProjectsHmacKeys: API.OperationMethod<GetProjectsHmacKeysRequest, GetProjectsHmacKeysResponse, GetProjectsHmacKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsHmacKeysRequest,
  output: GetProjectsHmacKeysResponse,
  errors: [],
}));

/** Retrieves a list of HMAC keys matching the criteria. */
export interface ListProjectsHmacKeysRequest {
  /** Maximum number of items to return in a single page of responses. The service uses this parameter or 250 items, whichever is smaller. The max number of items per page will also be limited by the number of distinct service accounts in the response. If the number of service accounts in a single response is too high, the page will truncated and a next page token will be returned. */
  maxResults?: number;
  /** A previously-returned page token representing part of the larger set of results to view. */
  pageToken?: string;
  /** Name of the project in which to look for HMAC keys. */
  projectId: string;
  /** If present, only keys for the given service account are returned. */
  serviceAccountEmail?: string;
  /** Whether or not to show keys in the DELETED state. */
  showDeletedKeys?: boolean;
  /** The project to be billed for this request. */
  userProject?: string;
}

export const ListProjectsHmacKeysRequest = Schema.Struct({
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  serviceAccountEmail: Schema.optional(Schema.String).pipe(T.HttpQuery("serviceAccountEmail")),
  showDeletedKeys: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeletedKeys")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
}).pipe(
  T.Http({ method: "GET", path: "projects/{projectId}/hmacKeys" }),
  svc,
) as unknown as Schema.Schema<ListProjectsHmacKeysRequest>;

export type ListProjectsHmacKeysResponse = HmacKeysMetadata;
export const ListProjectsHmacKeysResponse = HmacKeysMetadata;

export type ListProjectsHmacKeysError = CommonErrors;

export const listProjectsHmacKeys = API.makePaginated(() => ({
  input: ListProjectsHmacKeysRequest,
  output: ListProjectsHmacKeysResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

/** Updates the state of an HMAC key. See the [HMAC Key resource descriptor](https://cloud.google.com/storage/docs/json_api/v1/projects/hmacKeys/update#request-body) for valid states. */
export interface UpdateProjectsHmacKeysRequest {
  /** Name of the HMAC key being updated. */
  accessId: string;
  /** Project ID owning the service account of the updated key. */
  projectId: string;
  /** The project to be billed for this request. */
  userProject?: string;
  /** Request body */
  body?: HmacKeyMetadata;
}

export const UpdateProjectsHmacKeysRequest = Schema.Struct({
  accessId: Schema.String.pipe(T.HttpPath("accessId")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
  body: Schema.optional(HmacKeyMetadata).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "projects/{projectId}/hmacKeys/{accessId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateProjectsHmacKeysRequest>;

export type UpdateProjectsHmacKeysResponse = HmacKeyMetadata;
export const UpdateProjectsHmacKeysResponse = HmacKeyMetadata;

export type UpdateProjectsHmacKeysError = CommonErrors;

export const updateProjectsHmacKeys: API.OperationMethod<UpdateProjectsHmacKeysRequest, UpdateProjectsHmacKeysResponse, UpdateProjectsHmacKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateProjectsHmacKeysRequest,
  output: UpdateProjectsHmacKeysResponse,
  errors: [],
}));

/** Get the email address of this project's Google Cloud Storage service account. */
export interface GetProjectsServiceAccountRequest {
  /** Project ID */
  projectId: string;
  /** The project to be billed for this request. */
  userProject?: string;
}

export const GetProjectsServiceAccountRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  userProject: Schema.optional(Schema.String).pipe(T.HttpQuery("userProject")),
}).pipe(
  T.Http({ method: "GET", path: "projects/{projectId}/serviceAccount" }),
  svc,
) as unknown as Schema.Schema<GetProjectsServiceAccountRequest>;

export type GetProjectsServiceAccountResponse = ServiceAccount;
export const GetProjectsServiceAccountResponse = ServiceAccount;

export type GetProjectsServiceAccountError = CommonErrors;

export const getProjectsServiceAccount: API.OperationMethod<GetProjectsServiceAccountRequest, GetProjectsServiceAccountResponse, GetProjectsServiceAccountError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsServiceAccountRequest,
  output: GetProjectsServiceAccountResponse,
  errors: [],
}));

