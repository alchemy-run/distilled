---
title: R2
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# R2

#### R2Buckets

##### [List Buckets](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/methods/list)

GET/accounts/{account\_id}/r2/buckets

##### [Get Bucket](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/methods/get)

GET/accounts/{account\_id}/r2/buckets/{bucket\_name}

##### [Create Bucket](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/methods/create)

POST/accounts/{account\_id}/r2/buckets

##### [Patch Bucket](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/methods/edit)

PATCH/accounts/{account\_id}/r2/buckets/{bucket\_name}

##### [Delete Bucket](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/methods/delete)

DELETE/accounts/{account\_id}/r2/buckets/{bucket\_name}

##### ModelsExpand Collapse

<details>

<summary>

Bucket object {creation\_date, jurisdiction, location, 2 more }

A single R2 bucket.

</summary>

creation\_date: optional string

Creation timestamp.

<a href="#">Link to this property</a>

<details>

<summary>

jurisdiction: optional "default"or "eu"or "us"or 2 more

Jurisdiction where objects in this bucket are guaranteed to be stored.

</summary>

One of the following:

"default"

<a href="#">Link to this property</a>

"eu"

<a href="#">Link to this property</a>

"us"

<a href="#">Link to this property</a>

"fedramp"

<a href="#">Link to this property</a>

"fedramp-high"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

location: optional "apac"or "eeur"or "enam"or 3 more

Location of the bucket.

</summary>

One of the following:

"apac"

<a href="#">Link to this property</a>

"eeur"

<a href="#">Link to this property</a>

"enam"

<a href="#">Link to this property</a>

"weur"

<a href="#">Link to this property</a>

"wnam"

<a href="#">Link to this property</a>

"oc"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

Name of the bucket.

maxLength64

minLength3

<a href="#">Link to this property</a>

<details>

<summary>

storage\_class: optional "Standard"or "InfrequentAccess"

Storage class for newly uploaded objects, unless specified otherwise.

</summary>

One of the following:

"Standard"

<a href="#">Link to this property</a>

"InfrequentAccess"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets%20%3E%20(model)%20bucket%20%3E%20(schema)>)

<details>

<summary>

BucketListResponse object {buckets }

</summary>

<details>

<summary>

buckets: optional array of <a href="https://developers.cloudflare.com/api/resources/r2#(resource)%20r2.buckets%20%3E%20(model)%20bucket%20%3E%20(schema)">Bucket</a> { creation\_date, jurisdiction, location, 2 more }

</summary>

creation\_date: optional string

Creation timestamp.

<a href="#">Link to this property</a>

<details>

<summary>

jurisdiction: optional "default"or "eu"or "us"or 2 more

Jurisdiction where objects in this bucket are guaranteed to be stored.

</summary>

One of the following:

"default"

<a href="#">Link to this property</a>

"eu"

<a href="#">Link to this property</a>

"us"

<a href="#">Link to this property</a>

"fedramp"

<a href="#">Link to this property</a>

"fedramp-high"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

location: optional "apac"or "eeur"or "enam"or 3 more

Location of the bucket.

</summary>

One of the following:

"apac"

<a href="#">Link to this property</a>

"eeur"

<a href="#">Link to this property</a>

"enam"

<a href="#">Link to this property</a>

"weur"

<a href="#">Link to this property</a>

"wnam"

<a href="#">Link to this property</a>

"oc"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

Name of the bucket.

maxLength64

minLength3

<a href="#">Link to this property</a>

<details>

<summary>

storage\_class: optional "Standard"or "InfrequentAccess"

Storage class for newly uploaded objects, unless specified otherwise.

</summary>

One of the following:

"Standard"

<a href="#">Link to this property</a>

"InfrequentAccess"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets%20%3E%20(model)%20bucket_list_response%20%3E%20(schema)>)

BucketDeleteResponse = unknown

[Link to this property](#)%20r2.buckets%20%3E%20(model)%20bucket_delete_response%20%3E%20(schema)>)

#### R2BucketsLifecycle

##### [Get Object Lifecycle Rules](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/lifecycle/methods/get)

GET/accounts/{account\_id}/r2/buckets/{bucket\_name}/lifecycle

##### [Put Object Lifecycle Rules](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/lifecycle/methods/update)

PUT/accounts/{account\_id}/r2/buckets/{bucket\_name}/lifecycle

##### ModelsExpand Collapse

<details>

<summary>

LifecycleGetResponse object {rules }

</summary>

<details>

<summary>

rules: optional array of object {id, conditions, enabled, 3 more }

</summary>

id: string

Unique identifier for this rule.

<a href="#">Link to this property</a>

<details>

<summary>

conditions: object {prefix }

Conditions that apply to all transitions of this rule.

</summary>

prefix: string

Transitions will only apply to objects/uploads in the bucket that start with the given prefix, an empty prefix can be provided to scope rule to all objects/uploads.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: boolean

Whether or not this rule is in effect.

<a href="#">Link to this property</a>

<details>

<summary>

abortMultipartUploadsTransition: optional object {condition }

Transition to abort ongoing multipart uploads.

</summary>

<details>

<summary>

condition: optional object {maxAge, type }

Condition for lifecycle transitions to apply after an object reaches an age in seconds.

</summary>

maxAge: number

<a href="#">Link to this property</a>

type: "Age"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

deleteObjectsTransition: optional object {condition }

Transition to delete objects.

</summary>

<details>

<summary>

condition: optional object {maxAge, type } or object {date, type }

Condition for lifecycle transitions to apply after an object reaches an age in seconds.

</summary>

One of the following:

<details>

<summary>

R2LifecycleAgeCondition object {maxAge, type }

Condition for lifecycle transitions to apply after an object reaches an age in seconds.

</summary>

maxAge: number

<a href="#">Link to this property</a>

type: "Age"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

R2LifecycleDateCondition object {date, type }

Condition for lifecycle transitions to apply on a specific date.

</summary>

date: string

formatdate-time

<a href="#">Link to this property</a>

type: "Date"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

storageClassTransitions: optional array of object {condition, storageClass }

Transitions to change the storage class of objects.

</summary>

<details>

<summary>

condition: object {maxAge, type } or object {date, type }

Condition for lifecycle transitions to apply after an object reaches an age in seconds.

</summary>

One of the following:

<details>

<summary>

R2LifecycleAgeCondition object {maxAge, type }

Condition for lifecycle transitions to apply after an object reaches an age in seconds.

</summary>

maxAge: number

<a href="#">Link to this property</a>

type: "Age"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

R2LifecycleDateCondition object {date, type }

Condition for lifecycle transitions to apply on a specific date.

</summary>

date: string

formatdate-time

<a href="#">Link to this property</a>

type: "Date"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

storageClass: "InfrequentAccess"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.lifecycle%20%3E%20(model)%20lifecycle_get_response%20%3E%20(schema)>)

LifecycleUpdateResponse = unknown

[Link to this property](#)%20r2.buckets.lifecycle%20%3E%20(model)%20lifecycle_update_response%20%3E%20(schema)>)

#### R2BucketsCORS

##### [Get Bucket CORS Policy](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/cors/methods/get)

GET/accounts/{account\_id}/r2/buckets/{bucket\_name}/cors

##### [Put Bucket CORS Policy](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/cors/methods/update)

PUT/accounts/{account\_id}/r2/buckets/{bucket\_name}/cors

##### [Delete Bucket CORS Policy](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/cors/methods/delete)

DELETE/accounts/{account\_id}/r2/buckets/{bucket\_name}/cors

##### ModelsExpand Collapse

<details>

<summary>

CORSGetResponse object {rules }

</summary>

<details>

<summary>

rules: optional array of object {allowed, id, exposeHeaders, maxAgeSeconds }

</summary>

<details>

<summary>

allowed: object {methods, origins, headers }

Object specifying allowed origins, methods and headers for this CORS rule.

</summary>

<details>

<summary>

methods: array of "GET"or "PUT"or "POST"or 2 more

Specifies the value for the Access-Control-Allow-Methods header R2 sets when requesting objects in a bucket from a browser.

</summary>

One of the following:

"GET"

<a href="#">Link to this property</a>

"PUT"

<a href="#">Link to this property</a>

"POST"

<a href="#">Link to this property</a>

"DELETE"

<a href="#">Link to this property</a>

"HEAD"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

origins: array of string

Specifies the value for the Access-Control-Allow-Origin header R2 sets when requesting objects in a bucket from a browser.

<a href="#">Link to this property</a>

headers: optional array of string

Specifies the value for the Access-Control-Allow-Headers header R2 sets when requesting objects in this bucket from a browser. Cross-origin requests that include custom headers (e.g. x-user-id) should specify these headers as AllowedHeaders.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

id: optional string

Identifier for this rule.

<a href="#">Link to this property</a>

exposeHeaders: optional array of string

Specifies the headers that can be exposed back, and accessed by, the JavaScript making the cross-origin request. If you need to access headers beyond the safelisted response headers, such as Content-Encoding or cf-cache-status, you must specify it here.

<a href="#">Link to this property</a>

maxAgeSeconds: optional number

Specifies the amount of time (in seconds) browsers are allowed to cache CORS preflight responses. Browsers may limit this to 2 hours or less, even if the maximum value (86400) is specified.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.cors%20%3E%20(model)%20cors_get_response%20%3E%20(schema)>)

CORSUpdateResponse = unknown

[Link to this property](#)%20r2.buckets.cors%20%3E%20(model)%20cors_update_response%20%3E%20(schema)>)

CORSDeleteResponse = unknown

[Link to this property](#)%20r2.buckets.cors%20%3E%20(model)%20cors_delete_response%20%3E%20(schema)>)

#### R2BucketsDomains

#### R2BucketsDomainsCustom

##### [List Custom Domains of Bucket](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/domains/subresources/custom/methods/list)

GET/accounts/{account\_id}/r2/buckets/{bucket\_name}/domains/custom

##### [Get Custom Domain Settings](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/domains/subresources/custom/methods/get)

GET/accounts/{account\_id}/r2/buckets/{bucket\_name}/domains/custom/{domain}

##### [Attach Custom Domain To Bucket](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/domains/subresources/custom/methods/create)

POST/accounts/{account\_id}/r2/buckets/{bucket\_name}/domains/custom

##### [Configure Custom Domain Settings](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/domains/subresources/custom/methods/update)

PUT/accounts/{account\_id}/r2/buckets/{bucket\_name}/domains/custom/{domain}

##### [Remove Custom Domain From Bucket](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/domains/subresources/custom/methods/delete)

DELETE/accounts/{account\_id}/r2/buckets/{bucket\_name}/domains/custom/{domain}

##### ModelsExpand Collapse

<details>

<summary>

CustomListResponse object {domains }

</summary>

<details>

<summary>

domains: array of object {domain, enabled, status, 4 more }

</summary>

domain: string

Domain name of the custom domain to be added.

<a href="#">Link to this property</a>

enabled: boolean

Whether this bucket is publicly accessible at the specified custom domain.

<a href="#">Link to this property</a>

<details>

<summary>

status: object {ownership, ssl }

</summary>

<details>

<summary>

ownership: "pending"or "active"or "deactivated"or 3 more

Ownership status of the domain.

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deactivated"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

"unknown"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ssl: "initializing"or "pending"or "active"or 3 more

SSL certificate status.

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deactivated"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

"unknown"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ciphers: optional array of string

An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

<a href="#">Link to this property</a>

<details>

<summary>

minTLS: optional "1.0"or "1.1"or "1.2"or "1.3"

Minimum TLS Version the custom domain will accept for incoming connections. If not set, defaults to 1.0.

</summary>

One of the following:

"1.0"

<a href="#">Link to this property</a>

"1.1"

<a href="#">Link to this property</a>

"1.2"

<a href="#">Link to this property</a>

"1.3"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

zoneId: optional string

Zone ID of the custom domain resides in.

<a href="#">Link to this property</a>

zoneName: optional string

Zone that the custom domain resides in.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.domains.custom%20%3E%20(model)%20custom_list_response%20%3E%20(schema)>)

<details>

<summary>

CustomGetResponse object {domain, enabled, status, 4 more }

</summary>

domain: string

Domain name of the custom domain to be added.

<a href="#">Link to this property</a>

enabled: boolean

Whether this bucket is publicly accessible at the specified custom domain.

<a href="#">Link to this property</a>

<details>

<summary>

status: object {ownership, ssl }

</summary>

<details>

<summary>

ownership: "pending"or "active"or "deactivated"or 3 more

Ownership status of the domain.

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deactivated"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

"unknown"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ssl: "initializing"or "pending"or "active"or 3 more

SSL certificate status.

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deactivated"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

"unknown"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ciphers: optional array of string

An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

<a href="#">Link to this property</a>

<details>

<summary>

minTLS: optional "1.0"or "1.1"or "1.2"or "1.3"

Minimum TLS Version the custom domain will accept for incoming connections. If not set, defaults to 1.0.

</summary>

One of the following:

"1.0"

<a href="#">Link to this property</a>

"1.1"

<a href="#">Link to this property</a>

"1.2"

<a href="#">Link to this property</a>

"1.3"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

zoneId: optional string

Zone ID of the custom domain resides in.

<a href="#">Link to this property</a>

zoneName: optional string

Zone that the custom domain resides in.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.domains.custom%20%3E%20(model)%20custom_get_response%20%3E%20(schema)>)

<details>

<summary>

CustomCreateResponse object {domain, enabled, zoneId, 2 more }

</summary>

domain: string

Domain name of the affected custom domain.

<a href="#">Link to this property</a>

enabled: boolean

Whether this bucket is publicly accessible at the specified custom domain.

<a href="#">Link to this property</a>

zoneId: string

Zone ID of the custom domain.

<a href="#">Link to this property</a>

ciphers: optional array of string

An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

<a href="#">Link to this property</a>

<details>

<summary>

minTLS: optional "1.0"or "1.1"or "1.2"or "1.3"

Minimum TLS Version the custom domain will accept for incoming connections. If not set, defaults to 1.0.

</summary>

One of the following:

"1.0"

<a href="#">Link to this property</a>

"1.1"

<a href="#">Link to this property</a>

"1.2"

<a href="#">Link to this property</a>

"1.3"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.domains.custom%20%3E%20(model)%20custom_create_response%20%3E%20(schema)>)

<details>

<summary>

CustomUpdateResponse object {domain, ciphers, enabled, minTLS }

</summary>

domain: string

Domain name of the affected custom domain.

<a href="#">Link to this property</a>

ciphers: optional array of string

An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

<a href="#">Link to this property</a>

enabled: optional boolean

Whether this bucket is publicly accessible at the specified custom domain.

<a href="#">Link to this property</a>

<details>

<summary>

minTLS: optional "1.0"or "1.1"or "1.2"or "1.3"

Minimum TLS Version the custom domain will accept for incoming connections. If not set, defaults to 1.0.

</summary>

One of the following:

"1.0"

<a href="#">Link to this property</a>

"1.1"

<a href="#">Link to this property</a>

"1.2"

<a href="#">Link to this property</a>

"1.3"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.domains.custom%20%3E%20(model)%20custom_update_response%20%3E%20(schema)>)

<details>

<summary>

CustomDeleteResponse object {domain }

</summary>

domain: string

Name of the removed custom domain.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.domains.custom%20%3E%20(model)%20custom_delete_response%20%3E%20(schema)>)

#### R2BucketsDomainsManaged

##### [Get r2.dev Domain of Bucket](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/domains/subresources/managed/methods/list)

GET/accounts/{account\_id}/r2/buckets/{bucket\_name}/domains/managed

##### [Update r2.dev Domain of Bucket](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/domains/subresources/managed/methods/update)

PUT/accounts/{account\_id}/r2/buckets/{bucket\_name}/domains/managed

##### ModelsExpand Collapse

<details>

<summary>

ManagedListResponse object {bucketId, domain, enabled }

</summary>

bucketId: string

Bucket ID.

maxLength32

<a href="#">Link to this property</a>

domain: string

Domain name of the bucket’s r2.dev domain.

<a href="#">Link to this property</a>

enabled: boolean

Whether this bucket is publicly accessible at the r2.dev domain.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.domains.managed%20%3E%20(model)%20managed_list_response%20%3E%20(schema)>)

<details>

<summary>

ManagedUpdateResponse object {bucketId, domain, enabled }

</summary>

bucketId: string

Bucket ID.

maxLength32

<a href="#">Link to this property</a>

domain: string

Domain name of the bucket’s r2.dev domain.

<a href="#">Link to this property</a>

enabled: boolean

Whether this bucket is publicly accessible at the r2.dev domain.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.domains.managed%20%3E%20(model)%20managed_update_response%20%3E%20(schema)>)

#### R2BucketsEvent Notifications

##### [List Event Notification Rules](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/event_notifications/methods/list)

GET/accounts/{account\_id}/event\_notifications/r2/{bucket\_name}/configuration

##### [Get Event Notification Rule](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/event_notifications/methods/get)

GET/accounts/{account\_id}/event\_notifications/r2/{bucket\_name}/configuration/queues/{queue\_id}

##### [Create Event Notification Rule](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/event_notifications/methods/update)

PUT/accounts/{account\_id}/event\_notifications/r2/{bucket\_name}/configuration/queues/{queue\_id}

##### [Delete Event Notification Rules](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/event_notifications/methods/delete)

DELETE/accounts/{account\_id}/event\_notifications/r2/{bucket\_name}/configuration/queues/{queue\_id}

##### ModelsExpand Collapse

<details>

<summary>

EventNotificationListResponse object {bucketName, queues }

</summary>

bucketName: optional string

Name of the bucket.

<a href="#">Link to this property</a>

<details>

<summary>

queues: optional array of object {queueId, queueName, rules }

List of queues associated with the bucket.

</summary>

queueId: optional string

Queue ID.

<a href="#">Link to this property</a>

queueName: optional string

Name of the queue.

<a href="#">Link to this property</a>

<details>

<summary>

rules: optional array of object {actions, createdAt, description, 3 more }

</summary>

<details>

<summary>

actions: array of "PutObject"or "CopyObject"or "DeleteObject"or 2 more

Array of R2 object actions that will trigger notifications.

</summary>

One of the following:

"PutObject"

<a href="#">Link to this property</a>

"CopyObject"

<a href="#">Link to this property</a>

"DeleteObject"

<a href="#">Link to this property</a>

"CompleteMultipartUpload"

<a href="#">Link to this property</a>

"LifecycleDeletion"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

createdAt: optional string

Timestamp when the rule was created.

<a href="#">Link to this property</a>

description: optional string

A description that can be used to identify the event notification rule after creation.

<a href="#">Link to this property</a>

prefix: optional string

Notifications will be sent only for objects with this prefix.

<a href="#">Link to this property</a>

ruleId: optional string

Rule ID.

<a href="#">Link to this property</a>

suffix: optional string

Notifications will be sent only for objects with this suffix.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.event_notifications%20%3E%20(model)%20event_notification_list_response%20%3E%20(schema)>)

<details>

<summary>

EventNotificationGetResponse object {queueId, queueName, rules }

</summary>

queueId: optional string

Queue ID.

<a href="#">Link to this property</a>

queueName: optional string

Name of the queue.

<a href="#">Link to this property</a>

<details>

<summary>

rules: optional array of object {actions, createdAt, description, 3 more }

</summary>

<details>

<summary>

actions: array of "PutObject"or "CopyObject"or "DeleteObject"or 2 more

Array of R2 object actions that will trigger notifications.

</summary>

One of the following:

"PutObject"

<a href="#">Link to this property</a>

"CopyObject"

<a href="#">Link to this property</a>

"DeleteObject"

<a href="#">Link to this property</a>

"CompleteMultipartUpload"

<a href="#">Link to this property</a>

"LifecycleDeletion"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

createdAt: optional string

Timestamp when the rule was created.

<a href="#">Link to this property</a>

description: optional string

A description that can be used to identify the event notification rule after creation.

<a href="#">Link to this property</a>

prefix: optional string

Notifications will be sent only for objects with this prefix.

<a href="#">Link to this property</a>

ruleId: optional string

Rule ID.

<a href="#">Link to this property</a>

suffix: optional string

Notifications will be sent only for objects with this suffix.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.event_notifications%20%3E%20(model)%20event_notification_get_response%20%3E%20(schema)>)

EventNotificationUpdateResponse = unknown

[Link to this property](#)%20r2.buckets.event_notifications%20%3E%20(model)%20event_notification_update_response%20%3E%20(schema)>)

EventNotificationDeleteResponse = unknown

[Link to this property](#)%20r2.buckets.event_notifications%20%3E%20(model)%20event_notification_delete_response%20%3E%20(schema)>)

#### R2BucketsLocks

##### [Get Bucket Lock Rules](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/locks/methods/get)

GET/accounts/{account\_id}/r2/buckets/{bucket\_name}/lock

##### [Put Bucket Lock Rules](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/locks/methods/update)

PUT/accounts/{account\_id}/r2/buckets/{bucket\_name}/lock

##### ModelsExpand Collapse

<details>

<summary>

LockGetResponse object {rules }

</summary>

<details>

<summary>

rules: optional array of object {id, condition, enabled, prefix }

</summary>

id: string

Unique identifier for this rule.

<a href="#">Link to this property</a>

<details>

<summary>

condition: object {maxAgeSeconds, type } or object {date, type } or object {type }

Condition to apply a lock rule to an object for how long in seconds.

</summary>

One of the following:

<details>

<summary>

R2LockRuleAgeCondition object {maxAgeSeconds, type }

Condition to apply a lock rule to an object for how long in seconds.

</summary>

maxAgeSeconds: number

<a href="#">Link to this property</a>

type: "Age"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

R2LockRuleDateCondition object {date, type }

Condition to apply a lock rule to an object until a specific date.

</summary>

date: string

formatdate-time

<a href="#">Link to this property</a>

type: "Date"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

R2LockRuleIndefiniteCondition object {type }

Condition to apply a lock rule indefinitely.

</summary>

type: "Indefinite"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: boolean

Whether or not this rule is in effect.

<a href="#">Link to this property</a>

prefix: optional string

Rule will only apply to objects/uploads in the bucket that start with the given prefix, an empty prefix can be provided to scope rule to all objects/uploads.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.locks%20%3E%20(model)%20lock_get_response%20%3E%20(schema)>)

LockUpdateResponse = unknown

[Link to this property](#)%20r2.buckets.locks%20%3E%20(model)%20lock_update_response%20%3E%20(schema)>)

#### R2BucketsMetrics

##### [Get Account-Level Metrics](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/metrics/methods/list)

GET/accounts/{account\_id}/r2/metrics

##### ModelsExpand Collapse

<details>

<summary>

MetricListResponse object {infrequentAccess, standard }

Metrics based on the class they belong to.

</summary>

<details>

<summary>

infrequentAccess: optional object {published, uploaded }

Metrics based on what state they are in(uploaded or published).

</summary>

<details>

<summary>

published: optional object {metadataSize, objects, payloadSize }

Metrics on number of objects/amount of storage used.

</summary>

metadataSize: optional number

Amount of.

<a href="#">Link to this property</a>

objects: optional number

Number of objects stored.

<a href="#">Link to this property</a>

payloadSize: optional number

Amount of storage used by object data.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

uploaded: optional object {metadataSize, objects, payloadSize }

Metrics on number of objects/amount of storage used.

</summary>

metadataSize: optional number

Amount of.

<a href="#">Link to this property</a>

objects: optional number

Number of objects stored.

<a href="#">Link to this property</a>

payloadSize: optional number

Amount of storage used by object data.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

standard: optional object {published, uploaded }

Metrics based on what state they are in(uploaded or published).

</summary>

<details>

<summary>

published: optional object {metadataSize, objects, payloadSize }

Metrics on number of objects/amount of storage used.

</summary>

metadataSize: optional number

Amount of.

<a href="#">Link to this property</a>

objects: optional number

Number of objects stored.

<a href="#">Link to this property</a>

payloadSize: optional number

Amount of storage used by object data.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

uploaded: optional object {metadataSize, objects, payloadSize }

Metrics on number of objects/amount of storage used.

</summary>

metadataSize: optional number

Amount of.

<a href="#">Link to this property</a>

objects: optional number

Number of objects stored.

<a href="#">Link to this property</a>

payloadSize: optional number

Amount of storage used by object data.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.metrics%20%3E%20(model)%20metric_list_response%20%3E%20(schema)>)

#### R2BucketsSippy

##### [Get Sippy Configuration](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/sippy/methods/get)

GET/accounts/{account\_id}/r2/buckets/{bucket\_name}/sippy

##### [Enable Sippy](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/sippy/methods/update)

PUT/accounts/{account\_id}/r2/buckets/{bucket\_name}/sippy

##### [Disable Sippy](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/sippy/methods/delete)

DELETE/accounts/{account\_id}/r2/buckets/{bucket\_name}/sippy

##### ModelsExpand Collapse

Provider = "r2"

[Link to this property](#)%20r2.buckets.sippy%20%3E%20(model)%20provider%20%3E%20(schema)>)

<details>

<summary>

Sippy object {destination, enabled, source }

</summary>

<details>

<summary>

destination: optional object {accessKeyId, account, bucket, provider }

Details about the configured destination bucket.

</summary>

accessKeyId: optional string

ID of the Cloudflare API token used when writing objects to this bucket.

<a href="#">Link to this property</a>

account: optional string

<a href="#">Link to this property</a>

bucket: optional string

Name of the bucket on the provider.

<a href="#">Link to this property</a>

provider: optional <a href="https://developers.cloudflare.com/api/resources/r2#(resource)%20r2.buckets.sippy%20%3E%20(model)%20provider%20%3E%20(schema)">Provider</a>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: optional boolean

State of Sippy for this bucket.

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {bucket, bucketUrl, container, 2 more }

Details about the configured source bucket.

</summary>

bucket: optional string

Name of the bucket on the provider (AWS, GCS only).

<a href="#">Link to this property</a>

bucketUrl: optional string

S3-compatible URL (Generic S3-compatible providers only).

<a href="#">Link to this property</a>

container: optional string

Name of the Azure Blob Storage container (Azure only).

<a href="#">Link to this property</a>

<details>

<summary>

provider: optional "aws"or "gcs"or "s3"or "azure"

</summary>

One of the following:

"aws"

<a href="#">Link to this property</a>

"gcs"

<a href="#">Link to this property</a>

"s3"

<a href="#">Link to this property</a>

"azure"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

region: optional string

Region where the bucket resides (AWS only).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.sippy%20%3E%20(model)%20sippy%20%3E%20(schema)>)

<details>

<summary>

SippyDeleteResponse object {enabled }

</summary>

enabled: optional false

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.sippy%20%3E%20(model)%20sippy_delete_response%20%3E%20(schema)>)

#### R2BucketsObjects

##### [List Objects](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/objects/methods/list)

GET/accounts/{account\_id}/r2/buckets/{bucket\_name}/objects

##### [Get Object](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/objects/methods/get)

GET/accounts/{account\_id}/r2/buckets/{bucket\_name}/objects/{object\_key}

##### [Upload Object](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/objects/methods/upload)

PUT/accounts/{account\_id}/r2/buckets/{bucket\_name}/objects/{object\_key}

##### [Delete Object](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/objects/methods/delete)

DELETE/accounts/{account\_id}/r2/buckets/{bucket\_name}/objects/{object\_key}

##### ModelsExpand Collapse

<details>

<summary>

ObjectListResponse object {custom\_metadata, etag, http\_metadata, 5 more }

Metadata for an R2 object.

</summary>

custom\_metadata: optional map\[string]

Custom metadata key-value pairs associated with the object.

<a href="#">Link to this property</a>

etag: optional string

The entity tag for the object. In JSON list/get responses this is the raw hex digest (without surrounding quotes). The HTTP <code>ETag</code> response header on Get Object follows RFC 7232 and IS wrapped in surrounding double-quotes.

<a href="#">Link to this property</a>

<details>

<summary>

http\_metadata: optional object {cacheControl, cacheExpiry, contentDisposition, 3 more }

HTTP metadata associated with an R2 object.

</summary>

cacheControl: optional string

Specifies caching behavior for the object.

<a href="#">Link to this property</a>

cacheExpiry: optional string

The date and time at which the object’s cache entry expires.

formatdate-time

<a href="#">Link to this property</a>

contentDisposition: optional string

Specifies presentational information for the object.

<a href="#">Link to this property</a>

contentEncoding: optional string

Specifies the content encoding applied to the object.

<a href="#">Link to this property</a>

contentLanguage: optional string

The language of the object content.

<a href="#">Link to this property</a>

contentType: optional string

The MIME type of the object.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

key: optional string

The object key (name).

<a href="#">Link to this property</a>

last\_modified: optional string

The date and time the object was last modified.

formatdate-time

<a href="#">Link to this property</a>

size: optional number

The size of the object in bytes.

<a href="#">Link to this property</a>

ssec: optional boolean

Whether the object is encrypted with a customer-supplied encryption key.

<a href="#">Link to this property</a>

<details>

<summary>

storage\_class: optional "Standard"or "InfrequentAccess"

Storage class for newly uploaded objects, unless specified otherwise.

</summary>

One of the following:

"Standard"

<a href="#">Link to this property</a>

"InfrequentAccess"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.objects%20%3E%20(model)%20object_list_response%20%3E%20(schema)>)

<details>

<summary>

ObjectUploadResponse object {etag, key, size, 3 more }

Result of a successful object upload.

</summary>

etag: optional string

The entity tag for the uploaded object.

<a href="#">Link to this property</a>

key: optional string

The key (name) of the uploaded object.

<a href="#">Link to this property</a>

size: optional string

The size of the uploaded object in bytes (as a string).

<a href="#">Link to this property</a>

<details>

<summary>

storage\_class: optional "Standard"or "InfrequentAccess"

Storage class for newly uploaded objects, unless specified otherwise.

</summary>

One of the following:

"Standard"

<a href="#">Link to this property</a>

"InfrequentAccess"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

uploaded: optional string

The date and time the object was uploaded.

formatdate-time

<a href="#">Link to this property</a>

version: optional string

The version UUID of the uploaded object.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.objects%20%3E%20(model)%20object_upload_response%20%3E%20(schema)>)

<details>

<summary>

ObjectDeleteResponse object {key }

Result of a successful object deletion.

</summary>

key: optional string

The key (name) of the deleted object.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.objects%20%3E%20(model)%20object_delete_response%20%3E%20(schema)>)

#### R2Temporary Credentials

##### [Create Temporary Access Credentials](https://developers.cloudflare.com/api/resources/r2/subresources/temporary_credentials/methods/create)

POST/accounts/{account\_id}/r2/temp-access-credentials

##### ModelsExpand Collapse

<details>

<summary>

TemporaryCredential object {bucket, parentAccessKeyId, permission, 3 more }

</summary>

bucket: string

Name of the R2 bucket.

<a href="#">Link to this property</a>

parentAccessKeyId: string

The parent access key id to use for signing.

<a href="#">Link to this property</a>

<details>

<summary>

permission: "admin-read-write"or "admin-read-only"or "object-read-write"or "object-read-only"

Permissions allowed on the credentials.

</summary>

One of the following:

"admin-read-write"

<a href="#">Link to this property</a>

"admin-read-only"

<a href="#">Link to this property</a>

"object-read-write"

<a href="#">Link to this property</a>

"object-read-only"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ttlSeconds: number

How long the credentials will live for in seconds.

maximum604800

<a href="#">Link to this property</a>

objects: optional array of string

Optional object paths to scope the credentials to.

<a href="#">Link to this property</a>

prefixes: optional array of string

Optional prefix paths to scope the credentials to.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.temporary_credentials%20%3E%20(model)%20temporary_credential%20%3E%20(schema)>)

<details>

<summary>

TemporaryCredentialCreateResponse object {accessKeyId, secretAccessKey, sessionToken }

</summary>

accessKeyId: optional string

ID for new access key.

<a href="#">Link to this property</a>

secretAccessKey: optional string

Secret access key.

<a href="#">Link to this property</a>

sessionToken: optional string

Security token.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.temporary_credentials%20%3E%20(model)%20temporary_credential_create_response%20%3E%20(schema)>)

#### R2Super Slurper

#### R2Super SlurperJobs

##### [List jobs](https://developers.cloudflare.com/api/resources/r2/subresources/super_slurper/subresources/jobs/methods/list)

GET/accounts/{account\_id}/slurper/jobs

##### [Get job details](https://developers.cloudflare.com/api/resources/r2/subresources/super_slurper/subresources/jobs/methods/get)

GET/accounts/{account\_id}/slurper/jobs/{job\_id}

##### [Create a job](https://developers.cloudflare.com/api/resources/r2/subresources/super_slurper/subresources/jobs/methods/create)

POST/accounts/{account\_id}/slurper/jobs

##### [Abort all jobs](https://developers.cloudflare.com/api/resources/r2/subresources/super_slurper/subresources/jobs/methods/abort_all)

PUT/accounts/{account\_id}/slurper/jobs/abortAll

##### [Abort a job](https://developers.cloudflare.com/api/resources/r2/subresources/super_slurper/subresources/jobs/methods/abort)

PUT/accounts/{account\_id}/slurper/jobs/{job\_id}/abort

##### [Pause a job](https://developers.cloudflare.com/api/resources/r2/subresources/super_slurper/subresources/jobs/methods/pause)

PUT/accounts/{account\_id}/slurper/jobs/{job\_id}/pause

##### [Get job progress](https://developers.cloudflare.com/api/resources/r2/subresources/super_slurper/subresources/jobs/methods/progress)

GET/accounts/{account\_id}/slurper/jobs/{job\_id}/progress

##### [Resume a job](https://developers.cloudflare.com/api/resources/r2/subresources/super_slurper/subresources/jobs/methods/resume)

PUT/accounts/{account\_id}/slurper/jobs/{job\_id}/resume

##### ModelsExpand Collapse

<details>

<summary>

JobListResponse object {id, createdAt, finishedAt, 4 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

createdAt: optional string

<a href="#">Link to this property</a>

finishedAt: optional string

<a href="#">Link to this property</a>

overwrite: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {bucket, endpoint, keys, 2 more } or object {bucket, keys, pathPrefix, vendor } or object {bucket, jurisdiction, keys, 2 more }

</summary>

One of the following:

<details>

<summary>

S3SourceResponseSchema object {bucket, endpoint, keys, 2 more }

</summary>

bucket: optional string

<a href="#">Link to this property</a>

endpoint: optional string

formaturi

<a href="#">Link to this property</a>

keys: optional array of string

<a href="#">Link to this property</a>

pathPrefix: optional string

<a href="#">Link to this property</a>

vendor: optional "s3"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

GcsSourceResponseSchema object {bucket, keys, pathPrefix, vendor }

</summary>

bucket: optional string

<a href="#">Link to this property</a>

keys: optional array of string

<a href="#">Link to this property</a>

pathPrefix: optional string

<a href="#">Link to this property</a>

vendor: optional "gcs"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

R2SourceResponseSchema object {bucket, jurisdiction, keys, 2 more }

</summary>

bucket: optional string

<a href="#">Link to this property</a>

<details>

<summary>

jurisdiction: optional "default"or "eu"or "us"or "fedramp"

</summary>

One of the following:

"default"

<a href="#">Link to this property</a>

"eu"

<a href="#">Link to this property</a>

"us"

<a href="#">Link to this property</a>

"fedramp"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

keys: optional array of string

<a href="#">Link to this property</a>

pathPrefix: optional string

<a href="#">Link to this property</a>

vendor: optional <a href="https://developers.cloudflare.com/api/resources/r2#(resource)%20r2.buckets.sippy%20%3E%20(model)%20provider%20%3E%20(schema)">Provider</a>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "running"or "paused"or "aborted"or "completed"

</summary>

One of the following:

"running"

<a href="#">Link to this property</a>

"paused"

<a href="#">Link to this property</a>

"aborted"

<a href="#">Link to this property</a>

"completed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

target: optional object {bucket, jurisdiction, vendor }

</summary>

bucket: optional string

<a href="#">Link to this property</a>

<details>

<summary>

jurisdiction: optional "default"or "eu"or "us"or "fedramp"

</summary>

One of the following:

"default"

<a href="#">Link to this property</a>

"eu"

<a href="#">Link to this property</a>

"us"

<a href="#">Link to this property</a>

"fedramp"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

vendor: optional <a href="https://developers.cloudflare.com/api/resources/r2#(resource)%20r2.buckets.sippy%20%3E%20(model)%20provider%20%3E%20(schema)">Provider</a>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.super_slurper.jobs%20%3E%20(model)%20job_list_response%20%3E%20(schema)>)

<details>

<summary>

JobGetResponse object {id, createdAt, finishedAt, 4 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

createdAt: optional string

<a href="#">Link to this property</a>

finishedAt: optional string

<a href="#">Link to this property</a>

overwrite: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {bucket, endpoint, keys, 2 more } or object {bucket, keys, pathPrefix, vendor } or object {bucket, jurisdiction, keys, 2 more }

</summary>

One of the following:

<details>

<summary>

S3SourceResponseSchema object {bucket, endpoint, keys, 2 more }

</summary>

bucket: optional string

<a href="#">Link to this property</a>

endpoint: optional string

formaturi

<a href="#">Link to this property</a>

keys: optional array of string

<a href="#">Link to this property</a>

pathPrefix: optional string

<a href="#">Link to this property</a>

vendor: optional "s3"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

GcsSourceResponseSchema object {bucket, keys, pathPrefix, vendor }

</summary>

bucket: optional string

<a href="#">Link to this property</a>

keys: optional array of string

<a href="#">Link to this property</a>

pathPrefix: optional string

<a href="#">Link to this property</a>

vendor: optional "gcs"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

R2SourceResponseSchema object {bucket, jurisdiction, keys, 2 more }

</summary>

bucket: optional string

<a href="#">Link to this property</a>

<details>

<summary>

jurisdiction: optional "default"or "eu"or "us"or "fedramp"

</summary>

One of the following:

"default"

<a href="#">Link to this property</a>

"eu"

<a href="#">Link to this property</a>

"us"

<a href="#">Link to this property</a>

"fedramp"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

keys: optional array of string

<a href="#">Link to this property</a>

pathPrefix: optional string

<a href="#">Link to this property</a>

vendor: optional <a href="https://developers.cloudflare.com/api/resources/r2#(resource)%20r2.buckets.sippy%20%3E%20(model)%20provider%20%3E%20(schema)">Provider</a>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "running"or "paused"or "aborted"or "completed"

</summary>

One of the following:

"running"

<a href="#">Link to this property</a>

"paused"

<a href="#">Link to this property</a>

"aborted"

<a href="#">Link to this property</a>

"completed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

target: optional object {bucket, jurisdiction, vendor }

</summary>

bucket: optional string

<a href="#">Link to this property</a>

<details>

<summary>

jurisdiction: optional "default"or "eu"or "us"or "fedramp"

</summary>

One of the following:

"default"

<a href="#">Link to this property</a>

"eu"

<a href="#">Link to this property</a>

"us"

<a href="#">Link to this property</a>

"fedramp"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

vendor: optional <a href="https://developers.cloudflare.com/api/resources/r2#(resource)%20r2.buckets.sippy%20%3E%20(model)%20provider%20%3E%20(schema)">Provider</a>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.super_slurper.jobs%20%3E%20(model)%20job_get_response%20%3E%20(schema)>)

<details>

<summary>

JobCreateResponse object {id }

</summary>

id: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.super_slurper.jobs%20%3E%20(model)%20job_create_response%20%3E%20(schema)>)

JobAbortAllResponse = string

[Link to this property](#)%20r2.super_slurper.jobs%20%3E%20(model)%20job_abort_all_response%20%3E%20(schema)>)

JobAbortResponse = string

[Link to this property](#)%20r2.super_slurper.jobs%20%3E%20(model)%20job_abort_response%20%3E%20(schema)>)

JobPauseResponse = string

[Link to this property](#)%20r2.super_slurper.jobs%20%3E%20(model)%20job_pause_response%20%3E%20(schema)>)

<details>

<summary>

JobProgressResponse object {id, createdAt, failedObjects, 4 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

createdAt: optional string

<a href="#">Link to this property</a>

failedObjects: optional number

<a href="#">Link to this property</a>

objects: optional number

<a href="#">Link to this property</a>

skippedObjects: optional number

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "running"or "paused"or "aborted"or "completed"

</summary>

One of the following:

"running"

<a href="#">Link to this property</a>

"paused"

<a href="#">Link to this property</a>

"aborted"

<a href="#">Link to this property</a>

"completed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

transferredObjects: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.super_slurper.jobs%20%3E%20(model)%20job_progress_response%20%3E%20(schema)>)

JobResumeResponse = string

[Link to this property](#)%20r2.super_slurper.jobs%20%3E%20(model)%20job_resume_response%20%3E%20(schema)>)

#### R2Super SlurperJobsLogs

##### [Get job logs](https://developers.cloudflare.com/api/resources/r2/subresources/super_slurper/subresources/jobs/subresources/logs/methods/list)

GET/accounts/{account\_id}/slurper/jobs/{job\_id}/logs

##### ModelsExpand Collapse

<details>

<summary>

LogListResponse object {createdAt, job, logType, 2 more }

</summary>

createdAt: optional string

<a href="#">Link to this property</a>

job: optional string

<a href="#">Link to this property</a>

<details>

<summary>

logType: optional "migrationStart"or "migrationComplete"or "migrationAbort"or 12 more

</summary>

One of the following:

"migrationStart"

<a href="#">Link to this property</a>

"migrationComplete"

<a href="#">Link to this property</a>

"migrationAbort"

<a href="#">Link to this property</a>

"migrationError"

<a href="#">Link to this property</a>

"migrationPause"

<a href="#">Link to this property</a>

"migrationResume"

<a href="#">Link to this property</a>

"migrationErrorFailedContinuation"

<a href="#">Link to this property</a>

"importErrorRetryExhaustion"

<a href="#">Link to this property</a>

"importSkippedStorageClass"

<a href="#">Link to this property</a>

"importSkippedOversized"

<a href="#">Link to this property</a>

"importSkippedEmptyObject"

<a href="#">Link to this property</a>

"importSkippedUnsupportedContentType"

<a href="#">Link to this property</a>

"importSkippedExcludedContentType"

<a href="#">Link to this property</a>

"importSkippedInvalidMedia"

<a href="#">Link to this property</a>

"importSkippedRequiresRetrieval"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

objectKey: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.super_slurper.jobs.logs%20%3E%20(model)%20log_list_response%20%3E%20(schema)>)

#### R2Super SlurperConnectivity Precheck

##### [Check source connectivity](https://developers.cloudflare.com/api/resources/r2/subresources/super_slurper/subresources/connectivity_precheck/methods/source)

PUT/accounts/{account\_id}/slurper/source/connectivity-precheck

##### [Check target connectivity](https://developers.cloudflare.com/api/resources/r2/subresources/super_slurper/subresources/connectivity_precheck/methods/target)

PUT/accounts/{account\_id}/slurper/target/connectivity-precheck

##### ModelsExpand Collapse

<details>

<summary>

ConnectivityPrecheckSourceResponse object {connectivityStatus }

</summary>

<details>

<summary>

connectivityStatus: optional "success"or "error"

</summary>

One of the following:

"success"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.super_slurper.connectivity_precheck%20%3E%20(model)%20connectivity_precheck_source_response%20%3E%20(schema)>)

<details>

<summary>

ConnectivityPrecheckTargetResponse object {connectivityStatus }

</summary>

<details>

<summary>

connectivityStatus: optional "success"or "error"

</summary>

One of the following:

"success"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.super_slurper.connectivity_precheck%20%3E%20(model)%20connectivity_precheck_target_response%20%3E%20(schema)>)