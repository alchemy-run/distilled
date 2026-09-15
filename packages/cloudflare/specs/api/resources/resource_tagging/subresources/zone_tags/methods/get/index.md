---
title: Get tags for a zone-level resource
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Resource Tagging](https://developers.cloudflare.com/api/resources/resource_tagging)

[Zone Tags](https://developers.cloudflare.com/api/resources/resource_tagging/subresources/zone_tags)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get tags for a zone-level resource

GET/zones/{zone\_id}/tags

Retrieves tags for a specific zone-level resource.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### P ath ParametersExpand Collapse

zone\_id: string

Zone ID is required only for zone-level resources

maxLength32

minLength32

[Link to this property](#)%20resource_tagging.zone_tags%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

resource\_id: string

The ID of the resource to retrieve tags for.

[Link to this property](#)%20resource_tagging.zone_tags%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20resource_id%20%3E%20(schema)>)

<details>

<summary>

resource\_type: "access\_application\_policy"or "api\_gateway\_operation"or "custom\_certificate"or 8 more

The type of the resource.

</summary>

One of the following:

"access\_application\_policy"

<a href="#">Link to this property</a>

"api\_gateway\_operation"

<a href="#">Link to this property</a>

"custom\_certificate"

<a href="#">Link to this property</a>

"custom\_hostname"

<a href="#">Link to this property</a>

"dns\_record"

<a href="#">Link to this property</a>

"healthcheck"

<a href="#">Link to this property</a>

"load\_balancer"

<a href="#">Link to this property</a>

"managed\_client\_certificate"

<a href="#">Link to this property</a>

"worker\_route"

<a href="#">Link to this property</a>

"zone"

<a href="#">Link to this property</a>

"zone\_ruleset"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20resource_tagging.zone_tags%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20resource_type%20%3E%20(schema)>)

access\_application\_id: optional string

Access application ID identifier. Required for access\_application\_policy resources.

formatuuid

[Link to this property](#)%20resource_tagging.zone_tags%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20access_application_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20resource_tagging.zone_tags%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20resource_tagging.zone_tags%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20resource_tagging.zone_tags%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, etag, name, 3 more } or object {id, access\_application\_id, etag, 5 more } or object {id, etag, name, 3 more } or 38 more

Response for access\_application resources

</summary>

One of the following:

<details>

<summary>

AccessApplication object {id, etag, name, 3 more }

Response for access\_application resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "access\_application"

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessApplicationPolicy object {id, access\_application\_id, etag, 5 more }

Response for access\_application\_policy resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

access\_application\_id: string

Access application ID is required only for access\_application\_policy resources

formatuuid

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "access\_application\_policy"

<a href="#">Link to this property</a>

zone\_id: string

Zone ID is required only for zone-level resources

maxLength32

minLength32

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessGroup object {id, etag, name, 3 more }

Response for access\_group resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "access\_group"

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Account object {id, etag, name, 3 more }

Response for account resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "account"

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccountRuleset object {id, etag, name, 3 more }

Response for account\_ruleset resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "account\_ruleset"

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AIGateway object {id, etag, name, 3 more }

Response for ai\_gateway resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "ai\_gateway"

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AlertingPolicy object {id, etag, name, 3 more }

Response for alerting\_policy resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "alerting\_policy"

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AlertingWebhook object {id, etag, name, 3 more }

Response for alerting\_webhook resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "alerting\_webhook"

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

APIGatewayOperation object {id, etag, name, 4 more }

Response for api\_gateway\_operation resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "api\_gateway\_operation"

<a href="#">Link to this property</a>

zone\_id: string

Zone ID is required only for zone-level resources

maxLength32

minLength32

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CloudflaredTunnel object {id, etag, name, 3 more }

Response for cloudflared\_tunnel resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "cloudflared\_tunnel"

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CustomCertificate object {id, etag, name, 4 more }

Response for custom\_certificate resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "custom\_certificate"

<a href="#">Link to this property</a>

zone\_id: string

Zone ID is required only for zone-level resources

maxLength32

minLength32

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CustomHostname object {id, etag, name, 4 more }

Response for custom\_hostname resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "custom\_hostname"

<a href="#">Link to this property</a>

zone\_id: string

Zone ID is required only for zone-level resources

maxLength32

minLength32

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CwsDeployment object {id, etag, name, 3 more }

Response for cws\_deployment resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "cws\_deployment"

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CwsPolicy object {id, etag, name, 3 more }

Response for cws\_policy resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "cws\_policy"

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CwsPolicySet object {id, etag, name, 3 more }

Response for cws\_policy\_set resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "cws\_policy\_set"

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CwsWorkload object {id, etag, name, 3 more }

Response for cws\_workload resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "cws\_workload"

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

D1Database object {id, etag, name, 3 more }

Response for d1\_database resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "d1\_database"

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DNSRecord object {id, etag, name, 4 more }

Response for dns\_record resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "dns\_record"

<a href="#">Link to this property</a>

zone\_id: string

Zone ID is required only for zone-level resources

maxLength32

minLength32

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DurableObjectNamespace object {id, etag, name, 3 more }

Response for durable\_object\_namespace resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "durable\_object\_namespace"

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

GatewayList object {id, etag, name, 3 more }

Response for gateway\_list resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "gateway\_list"

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

GatewayRule object {id, etag, name, 3 more }

Response for gateway\_rule resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "gateway\_rule"

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Healthcheck object {id, etag, name, 4 more }

Response for healthcheck resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "healthcheck"

<a href="#">Link to this property</a>

zone\_id: string

Zone ID is required only for zone-level resources

maxLength32

minLength32

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Image object {id, etag, name, 3 more }

Response for image resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "image"

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

InfrastructureTarget object {id, etag, name, 3 more }

Response for infrastructure\_target resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "infrastructure\_target"

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

KVNamespace object {id, etag, name, 3 more }

Response for kv\_namespace resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "kv\_namespace"

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

LoadBalancer object {id, etag, name, 4 more }

Response for load\_balancer resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "load\_balancer"

<a href="#">Link to this property</a>

zone\_id: string

Zone ID is required only for zone-level resources

maxLength32

minLength32

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

LoadBalancerMonitor object {id, etag, name, 3 more }

Response for load\_balancer\_monitor resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "load\_balancer\_monitor"

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

LoadBalancerPool object {id, etag, name, 3 more }

Response for load\_balancer\_pool resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "load\_balancer\_pool"

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ManagedClientCertificate object {id, etag, name, 4 more }

Response for managed\_client\_certificate resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "managed\_client\_certificate"

<a href="#">Link to this property</a>

zone\_id: string

Zone ID is required only for zone-level resources

maxLength32

minLength32

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

PagesProject object {id, etag, name, 3 more }

Response for pages\_project resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "pages\_project"

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Queue object {id, etag, name, 3 more }

Response for queue resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "queue"

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

R2Bucket object {id, etag, name, 3 more }

Response for r2\_bucket resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "r2\_bucket"

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ResourceShare object {id, etag, name, 3 more }

Response for resource\_share resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "resource\_share"

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

StreamLiveInput object {id, etag, name, 3 more }

Response for stream\_live\_input resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "stream\_live\_input"

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

StreamVideo object {id, etag, name, 3 more }

Response for stream\_video resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "stream\_video"

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

VectorizeIndex object {id, etag, name, 3 more }

Response for vectorize\_index resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "vectorize\_index"

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Worker object {id, etag, name, 3 more }

Response for worker resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "worker"

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

WorkerRoute object {id, etag, name, 4 more }

Response for worker\_route resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "worker\_route"

<a href="#">Link to this property</a>

zone\_id: string

Zone ID is required only for zone-level resources

maxLength32

minLength32

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

WorkerVersion object {id, etag, name, 4 more }

Response for worker\_version resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "worker\_version"

<a href="#">Link to this property</a>

worker\_id: string

Worker ID is required only for worker\_version resources

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Zone object {id, etag, name, 4 more }

Response for zone resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "zone"

<a href="#">Link to this property</a>

zone\_id: string

Zone ID is required only for zone-level resources

maxLength32

minLength32

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZoneRuleset object {id, etag, name, 4 more }

Response for zone\_ruleset resources

</summary>

id: string

Identifies the unique resource.

<a href="#">Link to this property</a>

etag: string

ETag identifier for optimistic concurrency control. Formatted as “v1:” where the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat ETags as opaque strings and pass them back via the If-Match header on write operations.

<a href="#">Link to this property</a>

name: string

Human-readable name of the resource.

<a href="#">Link to this property</a>

tags: map\[string]

Contains key-value pairs of tags. Keys may contain at most 256 characters. Values may contain at most 1024 characters and may be empty for key-only tags.

<a href="#">Link to this property</a>

type: "zone\_ruleset"

<a href="#">Link to this property</a>

zone\_id: string

Zone ID is required only for zone-level resources

maxLength32

minLength32

<a href="#">Link to this property</a>

tags\_updated\_at: optional string

Monotonic version of the resource’s tags: the timestamp assigned when the tags were last written. Returned by read endpoints, by 2PC prepare (the version that will be assigned on commit, unless a concurrent write lands first, in which case a newer version is assigned), and by 2PC commit (the authoritative committed version). Omitted for untagged resources and delete commits: a deleted resource has no current version, and deletions are ordered by event order rather than by version.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20resource_tagging.zone_tags%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get tags for a zone-level resource

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/tags \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "etag": "v1:RBNvo1WzZ4oRRq0W9-hkng",
    "name": "my-worker-script",
    "tags": {
      "environment": "production",
      "team": "engineering"
    },
    "type": "access_application",
    "tags_updated_at": "2024-01-15T10:30:00Z"
  }
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "etag": "v1:RBNvo1WzZ4oRRq0W9-hkng",
    "name": "my-worker-script",
    "tags": {
      "environment": "production",
      "team": "engineering"
    },
    "type": "access_application",
    "tags_updated_at": "2024-01-15T10:30:00Z"
  }
}
```